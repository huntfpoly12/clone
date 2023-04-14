<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
           :width="500">
    <a-form-item label="귀속/지급연월" label-align="right" class="mt-40">
      <div class="d-flex-center">
        <div class="month-custom-1 d-flex-center">
          귀 {{ store.state.settings.globalYear }}-{{ $filters.formatMonth(attributionMonth) }}
        </div>
        <month-picker-box-custom v-model:valueDate="paymentYearMonthChoose" text="지"/>
      </div>
    </a-form-item>
    <a-form-item label="지급일" label-align="right" class="label-required">
      <number-box :max="31" :min="1" width="150px" class="mr-5" v-model:valueInput="paymentDayConfig" :required="true"
                  is-format/>
    </a-form-item>
    <div class="text-align-center mt-30">
      <button-basic class="button-form-modal" text="새로 입력" :width="140" type="default" mode="contained"
                    @onClick="onSubmit"/>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import {defineComponent, ref, watch, computed, watchEffect} from 'vue'
import notification from "@/utils/notification";
import dayjs from "dayjs";
import queries from "@/graphql/queries/CM/CM130/index"
import {useQuery, useMutation} from "@vue/apollo-composable";
import {companyId} from "@/helpers/commonFunction";
import {useStore} from 'vuex';
import filters from "@/helpers/filters";

function convertToDate({day, month, year}: { day: number, month: number, year: number }): number {
  // Tính số ngày của tháng đó
  const daysInMonth = new Date(year, month, 0).getDate();
  // Nếu ngày nhập vào lớn hơn số ngày của tháng đó thì chuyển thành ngày cuối cùng của tháng
  if (day > daysInMonth) {
    day = daysInMonth;
  }
  // Định dạng ngày theo dạng DD
  const formattedDay = String(day).padStart(2, '0');
  // // Định dạng tháng theo dạng MM
  // const formattedMonth = String(month).padStart(2, '0');
  // Kết hợp ngày và tháng thành chuỗi dạng DD/MM
  return day;
}

interface Props {
  modalStatus: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['closePopup', 'dataAddIncomeProcess'])

const store = useStore();
const selectMonthColumn = computed(() => store.getters['common/getSelectMonthColumn'])
const paymentDate = computed(() => store.getters['common/getPaymentDay'])
const globalYear = computed(() => store.state.settings.globalYear)
const attributionMonth: any = ref(0)
const paymentYearMonthChoose = ref(0)

const dataQuery = ref({companyId: companyId, imputedYear: globalYear.value});

 watchEffect(() => {
   paymentYearMonthChoose.value = Number(`${globalYear.value}${filters.formatMonth(selectMonthColumn.value.paymentMonth)}`)
   attributionMonth.value = selectMonthColumn.value.imputedMonth
 })
const paymentDayConfig = ref()
// const maxDay = computed(() => convertToDate({day: 31, month: paymentYearMonthChoose.value.toString().slice(-2), year: globalYear.value}))
const setModalVisible = () => {
  emit("closePopup", false)
};
let trigger = ref(false)

const {result: resultConfig, refetch} = useQuery(
  queries.getWithholdingConfig,
  dataQuery,
  () => ({
    enabled: trigger.value,
    fetchPolicy: "no-cache",
  })
);
watch(resultConfig, (value) => {
  if (value) {
    // const day = convertToDate({
    //   day: value.getWithholdingConfig.paymentDay,
    //   month: attributionMonth.value,
    //   year: globalYear.value
    // })
    paymentDayConfig.value = value.getWithholdingConfig.paymentDay
    store.commit('common/setPaymentDay', value.getWithholdingConfig.paymentDay)
  }
  trigger.value = false;
});

watch(() => props.modalStatus, (val) => {
  if (val) {
    trigger.value = true
    refetch()
  }
});

const onSubmit = (e: any) => {
  const res = e.validationGroup.validate();
  if (!res.isValid) {
    res.brokenRules[0].validator.focus();
  } else {
    emit("dataAddIncomeProcess", {
      imputedYear: globalYear.value,
      imputedMonth: attributionMonth.value,
      paymentYear: parseInt(paymentYearMonthChoose.value.toString().slice(0, 4)),
      paymentMonth: parseInt(paymentYearMonthChoose.value.toString().slice(4, 6)),
    })
    emit("closePopup", false)
    store.commit('common/setPaymentDay', paymentDayConfig.value)
    store.commit('common/setSelectMonthColumn', {
      paymentYear: parseInt(paymentYearMonthChoose.value.toString().slice(0, 4)),
      paymentMonth: parseInt(paymentYearMonthChoose.value.toString().slice(4, 6)),
    })
    store.commit('common/sethasIncProcRetirements', true)
    notification('success', `완료!`)
  }
};

</script>
<style lang="scss" scoped>
.mt-30 {
  margin-top: 30px;
}

.text-align-center {
  text-align: center;
}

.button-form-modal {
  margin: 0px 5px;
}

::v-deep label {
  width: 100px;
}

::v-deep .month-custom-1 {
  background-color: #A6A6A6;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: white;

  .dp__input {
    color: white;
    padding: 0px;
    border: none;
    background-color: #A6A6A6;
  }

  .dp__icon {
    display: none;
  }
}

:deep.label-required {
  label {
    color: red;
  }
}

::v-deep .month-custom-2 {
  background-color: black;
  padding-left: 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: white;

  .dp__input {
    color: white;
    padding: 0px;
    border: none;
    background-color: black;
    font-size: 14px;
  }

  .dp__icon {
    display: none;
  }
}
</style>
