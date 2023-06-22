<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer="" :width="500">
    <a-spin :spinning="loading">
      <div class="title">소득자료 생성</div>
      <div style="padding-left: 70px;">
        <a-form-item label="귀속/지급연월" label-align="right" class="mt-20">
          <div class="d-flex-center gap-10">
            <month-picker-box-custom v-model:valueDate="attributionMonth" text="귀" disabled bgColor="#A6A6A6"/>
            <month-picker-box-custom v-model:valueDate="paymentYearMonthChoose" text="지" disabled/>
          </div>
        </a-form-item>
        <a-form-item label="지급일" label-align="right" class="label-required">
          <date-time-box-custom width="150px" :required="true" :startDate="startDate" :finishDate="finishDate" :clearable="false"
                                v-model:valueDate="paymentDayConfig"/>
        </a-form-item>
      </div>
      <div class="text-align-center mt-30">
        <button-basic class="button-form-modal" text="새로 입력" :width="140" type="default" mode="contained"
                      @onClick="onSubmit"/>
      </div>
    </a-spin>
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


interface Props {
  modalStatus: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['closePopup', 'dataAddIncomeProcess'])


const store = useStore();
const selectMonthColumnOld = computed(() => store.getters['common/getSelectMonthColumnOld'])
const paYear = computed(() => Number(sessionStorage.getItem("paYear")) || dayjs().year())
const startDate = ref(dayjs(`${paYear.value}-${selectMonthColumnOld.value.imputedMonth}`).startOf('month').toDate());
const finishDate = ref(dayjs(`${paYear.value}-${selectMonthColumnOld.value.imputedMonth}`).endOf('month').toDate());

const attributionMonth: any = ref(0)
const paymentYearMonthChoose: any = ref(null)
const dataQuery = ref({companyId: companyId, imputedYear: paYear.value});
const paymentDayConfig = ref()

watchEffect(() => {
  attributionMonth.value = Number(`${paYear.value}${filters.formatMonth(selectMonthColumnOld.value.imputedMonth)}`)
  paymentYearMonthChoose.value = Number(`${paYear.value}${filters.formatMonth(selectMonthColumnOld.value.paymentMonth)}`)
})

const setModalVisible = () => {
  emit("closePopup", false)
};
let trigger = ref(false)

const {result: resultConfig, refetch, loading} = useQuery(
  queries.getWithholdingConfig,
  dataQuery,
  () => ({
    enabled: trigger.value,
    fetchPolicy: "no-cache",
  })
);
watch(resultConfig, (value) => {
  if (value) {
    const start_date = dayjs(`${paYear.value}-${selectMonthColumnOld.value.imputedMonth}`).startOf('month').toDate()
    let month = selectMonthColumnOld.value.paymentMonth
    let payment_day = 0;
    let payment_month = month;
    let payment_year = 0;
    if(value.getWithholdingConfig.paymentType !== 1 && month < 12){
      payment_month = month + 1
    }
    if (value.getWithholdingConfig.paymentType !== 1 && month === 12) {
      payment_year = paYear.value + 1
      payment_month = 1
    }
    payment_year = paYear.value
    if(value.getWithholdingConfig.paymentDay === 0 || value.getWithholdingConfig.paymentDay && value.getWithholdingConfig.paymentDay > +dayjs(start_date).endOf('month').format('DD')) {
      payment_day = +dayjs(`${payment_year}-${payment_month}`).endOf('month').format('DD')
    } else {
      payment_day = value.getWithholdingConfig.paymentDay
    }
    startDate.value = start_date
    finishDate.value = dayjs(`${payment_year}-${payment_month.toString().padStart(2, '0')}`).endOf('month').toDate()
    paymentYearMonthChoose.value = Number(`${payment_year}${payment_month.toString().padStart(2, '0')}`)
    paymentDayConfig.value = dayjs(`${payment_year}-${payment_month.toString().padStart(2, '0')}-${payment_day.toString().padStart(2, '0')}`)
    store.commit('common/setPaymentDay', payment_day)
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
  emit("dataAddIncomeProcess", {
    imputedYear: paYear.value,
    imputedMonth: attributionMonth.value,
    paymentYear: parseInt(paymentYearMonthChoose.value.toString().slice(0, 4)),
    paymentMonth: parseInt(paymentYearMonthChoose.value.toString().slice(4, 6)),
  })
  emit("closePopup", false)
  store.commit('common/setPaymentDay', +dayjs(paymentDayConfig.value.toString()).format('DD'))
  store.commit('common/setSelectMonthColumn', {
    ...selectMonthColumnOld.value,
    paymentYear: parseInt(paymentYearMonthChoose.value.toString().slice(0, 4)),
    paymentMonth: parseInt(paymentYearMonthChoose.value.toString().slice(4, 6)),
  })
  store.commit('common/sethasIncProcRetirements', true)
};

</script>
<style lang="scss" scoped>
.text-align-center {
  text-align: center;
}
.button-form-modal {
  margin: 0px 5px;
}
:deep(label) {
  width: 100px;
}
:deep.label-required {
  label {
    color: red;
  }
}
.title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>
