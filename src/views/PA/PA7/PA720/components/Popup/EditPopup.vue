<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    :width="500">
    <standard-form action="" name="edit-510">
      <div class="custom-modal-edit" v-if="data.length">
        <img src="@/assets/images/icon_edit.png" alt="" style="width: 30px;">
        <span>선택된 내역 지급일을</span>
        <number-box width="70px" :required="true" :min="1" :max="daysInMonth" v-model:valueInput="dayValue" :spinButtons="true"
          :isFormat="true" />
        <span>일로 변경하시겠습니까?</span>
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
  <a-modal v-model:visible="updateStatus" okText="확인" :closable="false" :footer="null" width="350px">
    <p class="d-flex-center"><img src="@/assets/images/changeDay1.svg" alt="" class="mr-5" />요청건수: {{ data.length }}건</p>
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
import { defineComponent, ref, computed, watch } from 'vue'
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA7/PA720/index"
import { Message } from '@/configs/enum';
import { useStore } from 'vuex';
import dayjs from 'dayjs';
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
    const dayValue = ref(1)
    const messageUpdate = Message.getMessage('COMMON', '106').message;
    const store = useStore();
    const changeDayDataPA720 = computed(() => store.state.common.changeDayDataPA720);;
    const updateStatus = ref(false);
    const processKeyPA720 = computed(() => store.getters['common/processKeyPA720']);
    const daysInMonth = ref(+dayjs(`${processKeyPA720.value.processKey?.paymentMonth}`).daysInMonth());
    // watch(() => props.processKey, (newVal: any) => {
    //   daysInMonth.value = +dayjs(`${newVal?.paymentMonth}`).daysInMonth()
    // }, { deep: true })
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
    watch(() => props.modalStatus, (newVal: any) => {
      if (newVal) {
        dataUpdateLen.value = props?.data?.length;
        incomeIdRender.value = [];
        succesState.value = [];
        errorState.value = [];
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
          day: dayValue.value,
        })
      })
    };

    return {
      setModalVisible,
      onSubmit,
      dayValue,
      changeDayDataPA720,
      updateStatus, incomeIdRender, errorState,
      dataUpdateLen, succesState,
      daysInMonth,
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