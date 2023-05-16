<template>
  <a-modal v-if="modalStatus" :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md"
    footer="">
    <standard-form action="" name="edit-510">
      <div class="custom-modal-edit" v-if="data.length">
        <img class="mt-1" src="@/assets/images/icon_edit.png" alt="" style="width: 30px;">
        <span class="mt-5">선택된 내역 지급일을</span>
        <div>
          <date-time-box-custom width="150px" :required="true" :startDate="startDate" :finishDate="finishDate"
            v-model:valueDate="paymentDayPA720" :clearable="false" />
          <div v-if="checkDuplicate(data)" class="error-date">동일 소득자의 동일 지급일로 중복 등록 불가합니다.</div>
        </div>
        <span class="mt-5">일로 변경하시겠습니까?</span>
      </div>
      <div v-else class="text-center">항목을 하나 선택해야합니다</div>
      <div class="text-align-center mt-30">
        <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
          @onClick="setModalVisible" />
        <button-basic class="button-form-modal" :text="'네. 변경합니다'" :width="140" :type="'default'" :mode="'contained'"
          @onClick="onSubmit" />
      </div>
    </standard-form>
  </a-modal>
  <a-modal v-model:visible="updateStatus" okText="확인" :closable="false" :footer="null">
    <p class="d-flex-center"><img src="@/assets/images/changeDay1.svg" alt="" class="mr-5" />요청건수: {{ data.length }}건</p>
    <p class="d-flex-center"><img src="@/assets/images/changeDaySuccess.svg" alt="" class="mr-5" />처리건수: {{
      incomeIdRender.length }}건</p>
    <p class="d-flex-center"><img src="@/assets/images/changeDayErr.svg" alt="" class="mr-5" />미처리건수 및 내역: {{
      errorState.length }} 건 </p>
    <ul>
      <li v-for="(item) in errorState">{{ item.errorInfo.employeeId }} {{ item.errorInfo.name }} {{
        item.errorInfo.incomeTypeName }} <span class="red ml-10">{{ errTitle }}</span></li>
    </ul>
    <a-row justify="center">
      <button-basic class="button-form-modal" :text="'확인'" :width="60" :type="'default'" :mode="'contained'"
        @onClick="updateStatus = false" />
    </a-row>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA7/PA720/index"
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
    }
  },
  components: {
  },
  setup(props, { emit }) {
    const store = useStore()
    let day = computed(() => store.state.common.paymentDayDefaultPA720);
    let daySelected = computed(() => store.getters['common/paymentDayPA720']);
    let processKeyPA720 = computed(() => store.getters['common/processKeyPA720']);
    const paymentDayPA720 = computed({
      get() {
        const daysInMonth = dayjs(`${processKeyPA720.value.processKey?.paymentMonth}`).daysInMonth();
        let newDay = day.value > daysInMonth || day.value == 0 ? daysInMonth : day.value;
        let date = `${processKeyPA720.value.processKey?.paymentYear}${filters.formatMonth(processKeyPA720.value.processKey?.paymentMonth)}${newDay}`;
        return dayjs(date);
      },
      set(value) {
        let day = value.toString().slice(-2);
        store.commit('common/paymentDayPA720', day);
      },
    });
    const startDate = computed(() => {
      let day = dayjs(`${processKeyPA720.value.processKey?.paymentYear}${processKeyPA720.value.processKey?.paymentMonth}`).startOf('month').toDate();
      return day;
    });
    const finishDate = computed(() => {
      let day = dayjs(`${processKeyPA720.value.processKey?.paymentYear}${processKeyPA720.value.processKey?.paymentMonth}`).endOf('month').toDate();
      return day;
    });
    const changeDayDataPA720 = computed(() => store.state.common.changeDayDataPA720);;
    const updateStatus = ref(false);
    const daysInMonth = ref(+dayjs(`${processKeyPA720.value.processKey?.paymentMonth}`).daysInMonth());
    const setModalVisible = () => {
      emit("closePopup", '')
    };
    const {
      mutate,
      onDone,
      onError,
    } = useMutation(mutations.changeIncomeExtraPaymentDay);
    const dataUpdateLen = ref(props?.data?.length);
    const incomeIdRender = ref<any>([]);
    const succesState = ref<any>([]);
    const errorState = ref<any>([]);
    const errTitle = ref('');
    watch(() => props.modalStatus, (newVal: any) => {
      if (newVal) {
        dataUpdateLen.value = props?.data?.length;
        incomeIdRender.value = [];
        succesState.value = [];
        errorState.value = [];
        daysInMonth.value = +dayjs(`${processKeyPA720.value.processKey?.paymentMonth}`).daysInMonth();
      }
    }, { deep: true })
    onDone((res: any) => {
      dataUpdateLen.value--;
      let resData = res.data.changeIncomeExtraPaymentDay;
      incomeIdRender.value.push(resData.incomeId);
      succesState.value.push({
        employeeId: resData.employeeId,
      });
      if (dataUpdateLen.value == 0) {
        let allData = props.data;
        allData = allData.filter((item: any, index) => {
          const firstIndex = allData.findIndex((elem: any) =>
            elem.errorInfo.employeeId.toString() === item.errorInfo.employeeId.toString()
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
        emit("closePopup", incomeIdRender.value);
      }
    })
    onError((e: any) => {
      dataUpdateLen.value--;
      errTitle.value = e.message;
      if (dataUpdateLen.value == 0) {
        let allData = props.data;
        allData = allData.filter((item: any, index) => {
          const firstIndex = allData.findIndex((elem: any) =>
            elem.errorInfo.employeeId.toString() === item.errorInfo.employeeId.toString()
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
        emit("closePopup", incomeIdRender.value)
      }
    })
    const onSubmit = (e: any) => {
      const reversedArr: any = props.data.reverse();
      reversedArr.forEach((item: any) => {
        mutate({
          processKey: item.param.processKey,
          incomeId: item.param.incomeId,
          companyId: item.param.companyId,
          day: +daySelected.value,
        })
      })
    };
    function checkDuplicate(arr: any) {
      const count: any = {};
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i].errorInfo.employeeId;
        if (count[element]) {
          return true;
        } else {
          count[element] = 1;
        }
      }
      return false;
    }
    return {
      setModalVisible,
      onSubmit,
      changeDayDataPA720,
      updateStatus, incomeIdRender, errorState, errTitle,
      dataUpdateLen, succesState,
      daysInMonth,
      processKeyPA720,
      startDate, finishDate, paymentDayPA720,
      checkDuplicate,
    }
  },
})
</script>

<style lang="scss" scoped>
.custom-modal-edit {
  display: flex;
  align-items: flex-start;
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

.red {
  color: red
}

;
</style>
