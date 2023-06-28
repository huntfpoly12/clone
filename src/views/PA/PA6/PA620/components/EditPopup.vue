<template>
  <a-modal v-if="modalStatus" :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md"
    footer="">
    <standard-form action="" name="edit-510">
      <div class="custom-modal-edit">
        <img src="@/assets/images/icon_edit.png" alt="" style="width: 30px;">
        <span class="mt-5">선택된 내역 지급일을</span>
        <div>
          <date-time-box-custom width="150px" :required="true" :startDate="startDate" :finishDate="finishDate"
            v-model:valueDate="paymentDayPA620" :clearable="false" />
          <div v-if="errorDate" class="error-group" style="max-width: 150px;">동일 소득자의 동일 지급일로 중복 등록 불가합니다.</div>
        </div>
        <span class="mt-5">일로 변경하시겠습니까?</span>
      </div>
      <div class="text-align-center mt-30">
        <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
          @onClick="setModalVisible" />
        <button-basic class="button-form-modal" :text="'네. 변경합니다'" :width="140" :type="'default'" :mode="'contained'"
          @onClick="onSubmit" />
      </div>
    </standard-form>
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
import notification from '@/utils/notification';
import { Message } from '@/configs/enum';
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
    },
    dayArr: {
      type: Array,
      default: []
    }
  },
  components: {
  },
  setup(props, { emit }) {
    const setModalVisible = () => {
      emit("closePopup", [])
    };
    const store = useStore()
    let newDay = computed(() => store.state.common.paymentDayPA620);
    const daysInMonth = ref(+dayjs(`${props.processKey?.paymentMonth}`).daysInMonth());
    let daySelected: any = computed(() =>  newDay.value > daysInMonth.value || newDay.value == 0 ? daysInMonth.value : newDay.value);
    let dayDefaultPA620 = computed(() => store.state.common.paymentDayDefaultPA620);
    const paymentDayPA620 = computed({
      get() {
        let date = `${props.processKey?.paymentYear}${filters.formatMonth(props.processKey?.paymentMonth)}${daySelected.value}`;
        return date;
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
    const dataUpdateLen = ref(props?.data?.length);
    const incomeIdRender = ref<any>([]);
    const succesState = ref<any>([]);
    const errorState = ref<any>([]);
    const updateStatus = ref(false);
    const errTitle = ref('');
    const messageUpdate = Message.getMessage("COMMON", "106").message;
    const checkDuplicateDay = computed(() => {
      return props.dayArr.indexOf(daySelected.value) > -1;
    });
    const errorDate = computed(() => checkDuplicateID(props.data) || checkDuplicateDay.value)

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
        notification('success', messageUpdate);
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
    onError((e) => {
      dataUpdateLen.value--;
      errTitle.value = e.message;
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
      if(errorDate.value){
        return;
      }
      const reversedArr = props.data.reverse();
      reversedArr.forEach(async (val: any) => {
        await mutate({
          companyId: companyId,
          processKey: props.processKey,
          incomeId: val.param.incomeId,
          day: daySelected.value,
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
      } else {
        store.commit('common/paymentDayPA620', dayDefaultPA620.value);
      }
    }, { deep: true })
    function checkDuplicateID(arr: any) {
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
      updateStatus, incomeIdRender, errorState, errTitle,
      dataUpdateLen, succesState, daysInMonth,
      startDate, finishDate, paymentDayPA620,
      errorDate,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './../style/style.scss';

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
  color: red;
}
</style>
