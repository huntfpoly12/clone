<template>
  <a-row :gutter="16">
    <a-col :span="6"></a-col>
    <a-col :span="12" class="custom-label">
      <standard-form formName="pa-420" ref="formRef">
        <div class="header-text-2 mb-10">급여/상여/수당</div>
        <a-form-item label="퇴직전 3개월 임금 총액 (세전)">
          <div class="d-flex-center">
            <number-box-money required width="200px" disabled v-model:valueInput="dataFormIncomeCalculation.totalPay3Month"
                              format="#0,###"/>
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="연간 상여금 총액">
          <div class="d-flex-center">
            <number-box-money required width="200px" disabled v-model:valueInput="dataFormIncomeCalculation.totalAnualBonus"
                              format="#0,###"/>
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
        <a-form-item label="연차수당">
          <div class="d-flex-center">
            <number-box-money required width="200px" disabled v-model:valueInput="dataFormIncomeCalculation.annualLeaveAllowance"
                              format="#0,###"/>
            <span class="pl-5">원</span>
          </div>
        </a-form-item>
      </standard-form>
      <div class="header-text-2 mb-10">퇴직급여</div>
      <div class="retire-benefit">
        <a-form-item label="퇴직급여(예상)">
          <div class="d-flex-center">
            <number-box-money v-model:valueInput="dataIncomeRetirement" :required="false" width="200px" :disabled="true" format="#0,###"/>
            <span class="pl-5 mr-5">원</span>
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title>
                상기 급여(수당)으로 계산된 퇴직금으로 실제 지급된 퇴직금과는 상이할 수 있습니다.
              </template>
              <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
            </a-tooltip>
          </div>

        </a-form-item>
        <a-form-item label="퇴직급여(확정)">
          <div class="d-flex-center"
               :class="definedRetirementBenefits != Number(dataIncomeRetirement) ? 'custom-input-number' : ''">
            <number-box-money :required="false" width="200px" disabled
                              v-model:valueInput="definedRetirementBenefits" format="#0,###"/>
            <span class="pl-5 mr-5">원</span>
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title>
                실제 지급된 퇴직급여를 입력합니다.
              </template>
              <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
            </a-tooltip>
          </div>

        </a-form-item>
      </div>
    </a-col>
  </a-row>
</template>


<script lang="ts" setup>
import { IncomeRetirement } from "@/views/PA/PA4/PA420/types";
import { reactive, ref, watchEffect } from 'vue';

interface DataFormIncomeCalculation {
  additionalDays?: number;
  annualLeaveAllowance: number;
  exclusionDays?: number;
  settlementFinishDate?: number;
  settlementStartDate?: number;
  totalAnualBonus: number;
  totalPay3Month: number;
}

const props = defineProps<{ dataDetail: IncomeRetirement }>()
// const emit = defineEmits(['closePopup', 'nextPage'])

const dataFormIncomeCalculation = reactive<DataFormIncomeCalculation>({
  annualLeaveAllowance: props.dataDetail.specification?.annualLeaveAllowance || 0,
  totalAnualBonus:props.dataDetail.specification?.totalAnualBonus || 0,
  totalPay3Month:props.dataDetail.specification?.totalPay3Month || 0,
})
const dataIncomeRetirement = ref(0)
const definedRetirementBenefits = ref(0) // 5. 퇴직급여(확정)

watchEffect(() => {
  dataIncomeRetirement.value = props.dataDetail.specification?.expectedRetirementBenefits || 0
  definedRetirementBenefits.value= props.dataDetail.specification?.definedRetirementBenefits || 0
})
// watch definedRetirementBenefits to set value to store
</script>


<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>
<style scoped lang="scss">
::v-deep label {
  min-width: 250px !important;
}
::v-deep .custom-input-number .dx-texteditor-input {
  color: red;
}
.absolute {
  position: absolute;
  left: 60%;
}
</style>
