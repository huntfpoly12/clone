<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
           :width="500">
    <a-form-item label="귀속/지급연월" label-align="right" class="mt-40">
      <div class="d-flex-center">
        <div class="month-custom-1 d-flex-center">
          귀 {{ paYear }}-{{ $filters.formatMonth(attributionMonth) }}
        </div>
        <month-picker-box-custom v-model:valueDate="paymentYearMonthChoose" text="지" disabled/>
      </div>
    </a-form-item>
    <a-form-item label="지급일" label-align="right" class="label-required">
      <date-time-box-custom width="150px" :required="true" :startDate="startDate" :finishDate="finishDate"
                            v-model:valueDate="paymentDayConfig"/>
    </a-form-item>
    <div class="text-align-center mt-30">
      <button-basic class="button-form-modal" text="새로 입력" :width="140" type="default" mode="contained"
                    @onClick="onSubmit"/>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import {computed, ref, watch, watchEffect} from 'vue'
import queries from "@/graphql/queries/CM/CM130/index"
import {useQuery} from "@vue/apollo-composable";
import {companyId} from "@/helpers/commonFunction";
import {useStore} from 'vuex';
import filters from "@/helpers/filters";
import dayjs from "dayjs";
import DateTimeBoxCustom from "@/components/common/DateTimeBoxCustom.vue";

function convertToDate({month, year}: { month: number, year: number }) {
  const daysInMonth = new Date(year, month, 0).getDate();
  return String(daysInMonth).padStart(2, '0');
}

interface Props {
  modalStatus: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['closePopup', 'dataAddIncomeProcess'])


const store = useStore();
const selectMonthColumn = computed(() => store.getters['common/getSelectMonthColumn'])
const selectMonthColumnOld = computed(() => store.getters['common/getSelectMonthColumnOld'])
const paYear = computed(() => Number(sessionStorage.getItem("paYear")) || dayjs().year())
const startDate = ref(dayjs(`${paYear.value}-${selectMonthColumnOld.value.imputedMonth}`).startOf('month').toDate());
const finishDate = ref(dayjs(`${paYear.value}-${selectMonthColumnOld.value.imputedMonth}`).endOf('month').toDate());

const attributionMonth: any = ref(0)
const paymentYearMonthChoose = ref(0)
const dataQuery = ref({companyId: companyId, imputedYear: paYear.value});
const paymentDate = ref(0)
const paymentDayConfig = ref()

watchEffect(() => {
  attributionMonth.value = selectMonthColumnOld.value.imputedMonth
  paymentYearMonthChoose.value = Number(`${paYear.value}${filters.formatMonth(selectMonthColumnOld.value.paymentMonth)}`)
})
watch(paymentYearMonthChoose, (val, oldValue) => {
  if (val === oldValue) return;
  paymentDayConfig.value = dayjs(`${val}${paymentDate.value}`).toDate()
})
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
    if (value.getWithholdingConfig.paymentType === 1) {
      paymentYearMonthChoose.value = Number(`${paYear.value}${filters.formatMonth(selectMonthColumnOld.value.paymentMonth)}`)
      startDate.value = dayjs(`${paYear.value}-${selectMonthColumnOld.value.imputedMonth}`).startOf('month').toDate()
      finishDate.value = dayjs(`${paYear.value}-${selectMonthColumnOld.value.imputedMonth}`).endOf('month').toDate()
    } else {
      startDate.value = dayjs(`${paYear.value}-${selectMonthColumnOld.value.imputedMonth + 1}`).startOf('month').toDate()
      finishDate.value = dayjs(`${paYear.value}-${selectMonthColumnOld.value.imputedMonth + 1}`).endOf('month').toDate()
      if (filters.formatMonth(selectMonthColumnOld.value.paymentMonth) !== 12) {
        paymentYearMonthChoose.value = Number(`${paYear.value}${filters.formatMonth(selectMonthColumnOld.value.paymentMonth + 1)}`)
        paymentDate.value = value.getWithholdingConfig.paymentDay || Number(dayjs(`${paymentYearMonthChoose.value}`).endOf('month').format('DD'))
        return
      }
      paymentYearMonthChoose.value = Number(`${paYear.value + 1}01`)
    }
    paymentDate.value = value.getWithholdingConfig.paymentDay || Number(dayjs(`${paymentYearMonthChoose.value}`).endOf('month').format('DD'))
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
      imputedYear: paYear.value,
      imputedMonth: attributionMonth.value,
      paymentYear: parseInt(paymentYearMonthChoose.value.toString().slice(0, 4)),
      paymentMonth: parseInt(paymentYearMonthChoose.value.toString().slice(4, 6)),
    })
    emit("closePopup", false)
    store.commit('common/setPaymentDay', dayjs(paymentDayConfig.value).format('DD'))
    store.commit('common/setSelectMonthColumn', {
      ...selectMonthColumnOld.value,
      paymentYear: parseInt(paymentYearMonthChoose.value.toString().slice(0, 4)),
      paymentMonth: parseInt(paymentYearMonthChoose.value.toString().slice(4, 6)),
    })
    store.commit('common/sethasIncProcRetirements', true)
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
