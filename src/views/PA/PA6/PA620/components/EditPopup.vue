<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    >
    <standard-form action="" name="edit-510">
      <div class="custom-modal-edit">
        <img src="@/assets/images/icon_edit.png" alt="" style="width: 30px;">
        <span>선택된 내역 지급일을</span>
        <date-time-box-custom width="150px" :required="true" :startDate="startDate" :finishDate="finishDate"
          v-model:valueDate="paymentDayPA620" :clearable="false"/>
        <span>일로 변경하시겠습니까?</span>
      </div>
      <div class="text-align-center mt-30">
        <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
          @onClick="setModalVisible" />
        <button-basic class="button-form-modal" :text="'네. 변경합니다'" :width="140" :type="'default'" :mode="'contained'"
          @onClick="onSubmit" />
      </div>
    </standard-form>
  </a-modal>
  <a-modal v-model:visible="updateStatus" okText="확인" :closable="false" :footer="null" width="350px">
    <p class="d-flex-center"><img src="@/assets/images/changeDay1.svg" alt="" class="mr-5" />요청건수: {{
      incomeIdRender.length + errorState.length }}건</p>
    <p class="d-flex-center"><img src="@/assets/images/changeDaySuccess.svg" alt="" class="mr-5" />처리건수: {{
      incomeIdRender.length }}건</p>
    <p class="d-flex-center"><img src="@/assets/images/changeDayErr.svg" alt="" class="mr-5" />미처리건수 및 내역: {{
      errorState.length }} 건 </p>
    <ul>
      <li v-for="(item) in errorState">{{ item.errorInfo.employeeId }} {{ item.errorInfo.name }} {{
        item.errorInfo.incomeTypeName }}</li>
    </ul>
    <a-row justify="center">
      <button-basic class="button-form-modal" :text="'확인'" :width="60" :type="'default'" :mode="'contained'"
        @onClick="updateStatus = false" />
    </a-row>
  </a-modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { companyId } from '@/helpers/commonFunction';
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA6/PA620/index"
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import filters from '@/helpers/filters';
export default defineComponent({
  props: {
    modalStatus: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: []
    },
    processKey: {
      type: Object,
      default: {},
    },
    dataUpdate: {
      type: Object,
      required: true,
    }
  },
  components: {
  },
  setup(props, { emit }) {
    const setModalVisible = () => {
      emit("closePopup", [])
    };
    const store = useStore()
    let day = computed(() => store.getters['common/paymentDayPA620']);
    const paymentDayPA620 = computed({
      get() {
        const daysInMonth = dayjs(`${props.processKey?.paymentMonth}`).daysInMonth();
        let newDay = day.value > daysInMonth || day.value == 0 ? daysInMonth : day.value;
        let date = `${props.processKey?.paymentYear}${filters.formatMonth(props.processKey?.paymentMonth)}${newDay}`;
        return dayjs(date);
      },
      set(value) {
        let day = +value.toString().slice(-2);
        store.commit('common/paymentDayPA620', day);
      },
    });
    const startDate = computed(() => {
      let day = dayjs(`${props.processKey?.paymentYear}${props.processKey?.paymentMonth}`).startOf('month').toDate();
      return day;
    });
    const finishDate = computed(() => {
      let day = dayjs(`${props.processKey?.paymentYear}${props.processKey?.paymentMonth}`).endOf('month').toDate();
      return day;
    });
    const daysInMonth = ref(+dayjs(`${props.processKey?.paymentMonth}`).daysInMonth());
    const dataUpdateLen = ref(props?.data?.length);
    const incomeIdRender = ref<any>([]);
    const succesState = ref<any>([]);
    const errorState = ref<any>([]);
    const updateStatus = ref(false);
    const {
      mutate,
      onDone,
      onError,
    } = useMutation(mutations.changeIncomeBusinessPaymentDay);
    onDone((res: any) => {
      dataUpdateLen.value--;
      let resData = res.data.changeIncomeBusinessPaymentDay;
      incomeIdRender.value.push(resData.incomeId);
      succesState.value.push({
        employeeId: resData.employeeId,
      });
      if (dataUpdateLen.value == 0) {
        let allData = props.data;
        allData = allData.filter((item: any, index) => {
          const firstIndex = allData.findIndex((elem: any) =>
            elem.errorInfo.employeeId === item.errorInfo.employeeId
          );
          if (index == firstIndex) {
            return true
          } else {
            errorState.value.push(item);
            return false;
          }
        });
        let arr = allData.filter((item1: any) => {
          return !succesState.value.some((item2: any) => {
            return (
              item2.employeeId === item1.errorInfo.employeeId
            )
          }
          );
        });
        errorState.value = [...errorState.value, ...arr];
        updateStatus.value = true;
        emit("closePopup", props.data.map((item: any) => item.param.incomeId));
      }
    })
    onError(() => {
      dataUpdateLen.value--;
      if (dataUpdateLen.value == 0) {
        let allData = props.data;
        allData = allData.filter((item: any, index) => {
          const firstIndex = allData.findIndex((elem: any) =>
            elem.errorInfo.employeeId === item.errorInfo.employeeId
          );
          if (index == firstIndex) {
            return true
          } else {
            errorState.value.push(item);
            return false;
          }
        });
        let arr = allData.filter((item1: any) => {
          return !succesState.value.some((item2: any) => {
            return (
              item2.employeeId === item1.errorInfo.employeeId
            )
          }
          );
        });
        errorState.value = [...errorState.value, ...arr];
        updateStatus.value = true;
        emit("closePopup", props.data.map((item: any) => item.param.incomeId));
      }
    })

    const onSubmit = () => {
      let day = +paymentDayPA620.value.format('YYYYMMDD').toString().slice(-2);
      const reversedArr = props.data.reverse();
      reversedArr.forEach(async (val: any) => {
        await mutate({
          companyId: companyId,
          processKey: props.processKey,
          incomeId: val.param.incomeId,
          day: day,
        })
      })
    };
    watch(() => props.modalStatus, (newVal: any) => {
      if (newVal) {
        dataUpdateLen.value = props?.data.length;
        incomeIdRender.value = [];
        succesState.value = [];
        errorState.value = [];
        daysInMonth.value = +dayjs(`${props.processKey?.paymentMonth}`).daysInMonth();
      }
    }, { deep: true })

    return {
      setModalVisible,
      onSubmit,
      updateStatus, incomeIdRender, errorState,
      dataUpdateLen, succesState, daysInMonth,
      startDate, finishDate,paymentDayPA620,
    }
  },
})
</script>

<style lang="scss" scoped>
.custom-modal-edit {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: 20px;

  img {
    width: 40px;
    margin-right: 5px;
  }

  span {
    padding: 0px 5px;
  }
}

.mt-30 {
  margin-top: 30px;
}

.text-align-center {
  text-align: center;
}

.button-form-modal {
  margin: 0px 5px;
}
</style>
