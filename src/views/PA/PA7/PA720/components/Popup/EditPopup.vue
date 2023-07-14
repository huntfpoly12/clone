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
          <div v-if="errorDate" class="error-group" style="max-width: 150px;">동일 소득자의 동일 지급일로 중복 등록 불가합니다.</div>
        </div>
        <span class="mt-5">일로 변경하시겠습니까?</span>
      </div>
      <div v-else class="text-center">항목을 하나 선택해야합니다</div>
      <div class="text-center mt-30">
        <button-basic class="mr-5" :text="'아니요'" :type="'default'" :mode="'outlined'"
          @onClick="setModalVisible" />
        <button-basic class="ml-5" :text="'네. 변경합니다'" :width="140" :type="'default'" :mode="'contained'"
          @onClick="onSubmit" />
      </div>
    </standard-form>
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
    const store = useStore();
    // The day is being set in cm-130 but can change.
    let dayCm130 = computed(() => store.state.common.paymentDayPA720);
    // convert to day when daycm130 = 0.
    let dayConvert: any = computed(() =>  dayCm130.value > daysInMonth.value || dayCm130.value == 0 ? daysInMonth.value : dayCm130.value);
    // day default in cm-130 and be not changed.
    let dayDefaultPA720 = computed(() => store.state.common.paymentDayDefaultPA720);
    let processKeyPA720 = computed(() => store.getters['common/processKeyPA720']);
    const daysInMonth = ref(+dayjs(`${processKeyPA720.value.processKey?.paymentMonth}`).daysInMonth());
    const paymentDayPA720 = computed({
      get() {
        let date = `${processKeyPA720.value.processKey?.paymentYear}${filters.formatMonth(processKeyPA720.value.processKey?.paymentMonth)}${dayConvert.value}`;
        return date;
      },
      set(value) {
        let day = +value.toString().slice(-2);
        store.commit('common/paymentDayPA720', day);
      },
    });
    // day collection is selected
    const dayArrPA720 = computed(() => store.state.common.dayArrPA720)
    const startDate = computed(() => {
      let day = dayjs(`${processKeyPA720.value.processKey?.paymentYear}${processKeyPA720.value.processKey?.paymentMonth}`).startOf('month').toDate();
      return day;
    });
    const finishDate = computed(() => {
      let day = dayjs(`${processKeyPA720.value.processKey?.paymentYear}${processKeyPA720.value.processKey?.paymentMonth}`).endOf('month').toDate();
      return day;
    });
    // data employee is selected. include the employee information to check day or id loop.
    const changeDayDataPA720 = computed(() => store.state.common.changeDayDataPA720);;
    const setModalVisible = () => {
      emit("closePopup", '')
    };

    // if id is duplicated then it is invalid
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

    const checkDuplicateDay = computed(() => {
      return dayArrPA720.value.indexOf(dayConvert.value) > -1;
    });

    const dataUpdateLen = ref(props?.data?.length);
    const incomeIdRender = ref<any>([]);
    const succesState = ref<any>([]);
    const errorState = ref<any>([]);

    const {
      mutate,
      onDone,
      onError,
    } = useMutation(mutations.changeIncomeExtraPaymentDay);

    
    const errorDate = computed(() => checkDuplicateID(props.data) || checkDuplicateDay.value)

    watch(() => props.modalStatus, (newVal: any) => {
      if (newVal) {
        dataUpdateLen.value = props?.data?.length;
        incomeIdRender.value = [];
        succesState.value = [];
        errorState.value = [];
        daysInMonth.value = +dayjs(`${processKeyPA720.value.processKey?.paymentMonth}`).daysInMonth();
      } else {
        store.state.common.paymentDayPA720 = dayDefaultPA720.value;
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
        emit("closePopup", incomeIdRender.value);
      }
    })
    onError((e: any) => {
      dataUpdateLen.value--;
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
        emit("closePopup", incomeIdRender.value)
      }
    })
    const onSubmit = (e: any) => {
      if (errorDate.value) {
        return;
      }
      const reversedArr: any = props.data.reverse();
      reversedArr.forEach((item: any) => {
        mutate({
          processKey: item.param.processKey,
          incomeId: item.param.incomeId,
          companyId: item.param.companyId,
          day: +dayConvert.value,
        })
      })
    };
    return {
      setModalVisible,
      onSubmit,
      changeDayDataPA720,
      incomeIdRender,
      dataUpdateLen, succesState,
      processKeyPA720,
      startDate, finishDate, paymentDayPA720,
      errorDate,
      dayArrPA720
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

.red {
  color: red
}

;
</style>
