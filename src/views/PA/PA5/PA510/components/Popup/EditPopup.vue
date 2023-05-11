<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
           :width="500">
    <a-spin :spinning="loading" size="large">
      <standard-form action="" name="edit-510">
        <div class="custom-modal-edit">
          <img src="@/assets/images/icon_edit.png" alt="" style="width: 30px;">
          <span>선택된 내역 지급일을</span>
          <number-box :key="resetInput" width="70px" :required="true" :min="0" :max="maxDayMonth" v-model:valueInput="dayValue"
                      :spinButtons="true" />
          <span>일로 변경하시겠습니까?</span>
        </div>
        <div class="text-align-center mt-30">
          <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
                        @onClick="setModalVisible" />
          <button-basic class="button-form-modal" :text="'네. 변경합니다'" :width="140" :type="'default'"
                        :mode="'contained'" @onClick="onSubmit" />
        </div>
      </standard-form>
    </a-spin>
  </a-modal>
  <a-modal v-model:visible="statusOnCallApiChange" okText="확인" :closable="false" :footer="null">
    <h3 style="text-align: center;">지급일변경 결과</h3>
    <p class="d-flex-center"><img src="@/assets/images/changeDay1.svg" alt="" class="mr-5" />요청건수: {{ data.length }}건</p>
    <p class="d-flex-center"><img src="@/assets/images/changeDaySuccess.svg" alt="" class="mr-5" />처리건수: {{ sumSuccessCallApi }}건</p>
    <p class="d-flex-center"><img src="@/assets/images/changeDayErr.svg" alt="" class="mr-5" />미처리건수 및 내역: {{ sumErrorCallApi }} 건 </p>
    <ul>
      <li v-for="(item) in arrDataError" :key="item.employeeId" style="margin: 5px 0;">
        <employee-info :idEmployee="item.employee.employeeId" :name="item.employee.name"
                       :idCardNumber="item.employee.residentId" :status="item.employee.status"
                       :foreigner="item.employee.foreigner" :checkStatus="false" />
      </li>
    </ul>
    <a-row justify="center">
      <button-basic class="button-form-modal" :text="'확인'" :width="60" :type="'default'" :mode="'contained'"
                    @onClick="closePupop" />
    </a-row>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from 'vue'
import notification from "@/utils/notification";
import { companyId } from '@/helpers/commonFunction';
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA5/PA510/index"
import { useStore } from 'vuex'
import { Message } from "@/configs/enum";
import dayjs from "dayjs";
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
    const processKey = computed(() => store.state.common.pa510.processKeyPA510)
    const dayValue = ref(1)
    const statusOnCallApiChange = ref<boolean>(false);
    const arrData = ref<any[]>([])
    const arrDataError = ref<any[]>([])
    let sumSuccessCallApi = ref<number>(0)
    let sumErrorCallApi = ref<number>(0)
    const loading = ref<boolean>(false)
    const paYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'))
    const maxDayMonth = ref<number>(dayjs(`${paYear.value}-${store.state.common.pa510.processKeyPA510.paymentMonth}`).daysInMonth())
    const resetInput = ref(1)
    const setModalVisible = () => {
      emit("closePopup", false)
    };
    const {
      mutate,
      onDone,
      onError,
    } = useMutation(mutations.changeIncomeWageDailyPaymentDay);
    onDone(() => {
      sumSuccessCallApi.value++
      arrData.value.shift()
      if (arrData.value?.length) {
        callOneApiChange();
      } else {
        loading.value = false
        statusOnCallApiChange.value = true;
        store.state.common.pa510.onDoneEdit = true;
        store.state.common.pa510.loadingTableInfo++
      }
      // notification('success', Message.getMessage('COMMON', '106').message)
      // emit("closePopup", false)
      // store.state.common.pa510.onDoneEdit = true;
      // store.state.common.pa510.loadingTableInfo++
      // store.state.common.pa510.loadingFormData++
    })
    onError((e: any) => {
      sumErrorCallApi.value++
      arrDataError.value.push(arrData.value[0])
      arrData.value.shift()
      if (arrData.value?.length) {
        callOneApiChange();
      } else {
        loading.value = false
        statusOnCallApiChange.value = true;
        store.state.common.pa510.onDoneEdit = true;
        store.state.common.pa510.loadingTableInfo++
      }
      // notification('error', e.message)
    })
    const onSubmit = (e: any) => {
      sumSuccessCallApi.value = 0
      sumErrorCallApi.value = 0
      arrDataError.value = []
      arrData.value = JSON.parse(JSON.stringify(props.data))
      // arrData.value.forEach((data: any) => {
      if (arrData.value?.length) {
        loading.value = true
        callOneApiChange();
      }
      // })

    };
    const callOneApiChange = () => {
      mutate({
        companyId: companyId,
        processKey: processKey.value,
        incomeId: arrData.value[0].incomeId,
        day: dayValue.value == 0 ? maxDayMonth.value : dayValue.value
      })
    }
    const closePupop = () => {
      statusOnCallApiChange.value = false
      emit("closePopup", false)
    }
    watch(() => props.modalStatus, (value) => {
      if (value) {
        dayValue.value = 1
        maxDayMonth.value = dayjs(`${paYear.value}-${store.state.common.pa510.processKeyPA510.paymentMonth}`).daysInMonth()
        resetInput.value++
      }
    })

    return {
      setModalVisible,
      onSubmit,
      dayValue,
      statusOnCallApiChange,
      arrDataError, sumSuccessCallApi, sumErrorCallApi,
      closePupop, loading, maxDayMonth, resetInput,
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
