<template>
  <a-modal class="form-modal" width="1130px" :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }"
           :visible="isOpenModalCreate" title="급여변경신고 신규 등록" centered @cancel="closePopup" :footer="null"
           :mask-closable="false">
    <standard-form ref="formRef">
      <a-row :gutter="[20, 0]" class="px-10">
        <a-col span="8">
          <a-form-item label="직원유행">
            <a-radio-group v-model:value="employeeWageType" class="d-flex items-center">
              <a-radio :value="EmployeeWageType.WAGE" @change="handleRadioChange"
                       v-model="stateSelectQuery.selectedRadioValue">
                사원
              </a-radio>
              <a-radio :value="EmployeeWageType.WAGEDaily" @change="handleRadioChange"
                       v-model="stateSelectQuery.selectedRadioValue">
                일용직사원
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="직원유행" class="label-custom">
            <employ-select required :arrayValue="employeeWages" v-model:valueEmploy="employeeWageSelected"
                           placeholder="선택"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="[20, 0]" class="item-group mb-10">
        <a-col span="8">
          <a-form-item label="업체명">
            <default-text-box :value="infoCompany.name" placeholder="업체명" disabled/>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="전화번호" class="label-custom">
            <default-text-box :value="infoCompany.phone" placeholder="전화번호" disabled/>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="팩스번호" class="label-custom">
            <default-text-box :value="infoCompany.extendInfo.detail.fax" placeholder="팩스번호" disabled/>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="사업장관리번호">
            <ManageIdTextBox :value="infoMajorInsuranceConsignStatus.manageId" disabled placeholder=""/>
          </a-form-item>
        </a-col>
        <a-col span="16">
          <a-form-item label="주소" class="label-custom">
            <default-text-box :value="infoCompany.address" placeholder="주소" disabled/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="[20, 0]" class="item-group mb-10">
        <a-col span="8">
          <a-form-item label="성명">
            <default-text-box :value="employee?.name" placeholder="성명" disabled/>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="주민등록번호" class="label-custom">
            <id-number-text-box :valueInput="employee?.residentId" placeholder="주민등록번호" disabled/>
          </a-form-item>
        </a-col>

      </a-row>
      <a-row :gutter="[20, 0]" class="item-group mb-10">
        <a-col span="24">
          <a-form-item label="취득대상보험선택">
            <div class="d-flex gap-20">
              <checkbox-basic disabled label="연금" v-model:valueCheckbox="formData.nationalPensionReport"/>
              <checkbox-basic label="건강" v-model:valueCheckbox="formData.healthInsuranceReport"/>
              <checkbox-basic label="고용산재"
                              v-model:valueCheckbox="formData.employeementAndIndustrialAccidentInsuranceReport"/>
            </div>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="변경전급여">
            <number-box-money v-model:valueInput="formData.beforeSalary" :min="1"/>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="변경후급여" class="label-custom">
            <number-box-money v-model:valueInput="formData.afterSalary" :min="1"/>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="변경년월" class="label-custom">
            <month-picker-box v-model:valueDate="formData.changeYearmonth" :teleport="true"/>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="일자리안정자금 지원 신청여부" >
            <div class="d-flex gap-20">
              <a-radio-group v-model:value="formData.jobStabilitySupport" class="d-flex items-center">
                <a-radio :value="true">예</a-radio>
                <a-radio :value="false">아니요</a-radio>
              </a-radio-group>
            </div>
          </a-form-item>
        </a-col>
        <a-col span="16">
          <a-form-item label="변경사유" class="label-custom">
            <div class="d-flex gap-20">
              <a-radio-group v-model:value="formData.changeReason" class="d-flex items-center">
                <a-radio :value="1">보수 인상</a-radio>
                <a-radio :value="2">보수 인하</a-radio>
                <a-radio :value="3">착오 정정</a-radio>
              </a-radio-group>
            </div>
          </a-form-item>
        </a-col>

      </a-row>
      <div class="d-flex justify-center mt-20">
        <button-basic :width="90" id="btn-save"
                      :disabled="formData.afterSalary && (formData.afterSalary === formData.beforeSalary)"
                      @onClick="onSubmit($event)" style="margin: auto" mode="contained"
                      type="default" text="저장"/>
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts" setup>
import queriesGetEmployeeDailies from "@/graphql/queries/common/getEmployeeWageDailies";
import queriesGetEmployeeWages from "@/graphql/queries/common/getEmployeeWages";
import mutations from '@/graphql/mutations/PA/PA8/PA830'
import { companyId } from "@/helpers/commonFunction";
import { useCompanyInfo } from "@/utils/useCompanyInfo";
import useGetMajorInsuranceConsignStatus from "@/utils/usegetMajorInsuranceConsignStatus";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import { useMutation, useQuery } from "@vue/apollo-composable";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import { computed, reactive, ref, watch } from 'vue';
import notification from "@/utils/notification";
import { Message } from "@/configs/enum";


enum EmployeeWageType {
  WAGE = 10,
  WAGEDaily = 20,
}

const getQuery = (type: EmployeeWageType) => {
  switch (type) {
    case EmployeeWageType.WAGE:
      return queriesGetEmployeeWages;
    case EmployeeWageType.WAGEDaily:
      return queriesGetEmployeeDailies;
  }
}

const props = defineProps({
  isOpenModalCreate: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["closeModal", "createDone"]);
const { infoCompany } = useCompanyInfo(companyId)
const { infoMajorInsuranceConsignStatus } = useGetMajorInsuranceConsignStatus(companyId)
const globalYear = computed(() => parseInt(sessionStorage.getItem("paYear") ?? '0'));
const employeeWages = ref();
const employeeWageSelected = ref();
const employee = ref();
const employeeWageType = ref<EmployeeWageType>(EmployeeWageType.WAGE);
const stateSelectQuery = reactive({
  selectedRadioValue: EmployeeWageType.WAGE,
  query: queriesGetEmployeeWages,
});
const query = ref(queriesGetEmployeeWages);
const InitialFormValue = {
  afterSalary: null,
  beforeSalary: null,
  changeReason: 0,
  changeYearmonth: parseInt(dayjs().format('YYYYMM')),
  employeementAndIndustrialAccidentInsuranceReport: true,
  healthInsuranceReport: true,
  jobStabilitySupport: false,
  nationalPensionReport: false
}
type InitialFormValueType = Partial<typeof InitialFormValue> & { beforeSalary?: null | number };

const formData = reactive<InitialFormValueType>({ ...InitialFormValue })

const variables = reactive({
  companyId: companyId,
  imputedYear: globalYear.value,
});
const { onResult: onResultEmployeeWages, refetch: refetchDataEmployeeWages } = useQuery(query, variables, () => ({
  fetchPolicy: "no-cache",
}));
onResultEmployeeWages(({ data }) => {
  if (data) {
    if (stateSelectQuery.selectedRadioValue === EmployeeWageType.WAGE) {
      employeeWages.value = data.getEmployeeWages.filter((item: any) => !item.leavedAt);
    } else {
      employeeWages.value = data.getEmployeeWageDailies.filter((item: any) => !item.leavedAt);
    }
  }
})

const isFormChanged = computed(() => {
  return !isEqual(formData, InitialFormValue)
      || Boolean(employeeWageSelected.value)
});

// Mutation
const {
  mutate,
  onDone: onDoneCreateMajor,
  loading: loadingCreateMajor,
  onError: errorCreateMajor,
} = useMutation(
    mutations.createMajorInsuranceCompanyEmployeeSalaryChange,
    () => ({
      fetchPolicy: "no-cache",
    })
);

onDoneCreateMajor(() => {
  notification("success", Message.getCommonMessage('101').message);
  resetForm();
  emit("createDone");
});
errorCreateMajor((error) => {
  console.log("error", error);
  notification("error", error.message);
});

const resetForm = () => {
  Object.assign(formData, cloneDeep(InitialFormValue))
  employeeWageSelected.value = null
};

const closePopup = () => {
  if (isFormChanged.value) {
    comfirmClosePopup(() => {
      emit('closeModal')
    })
  } else {
    emit('closeModal')
  }
}

watch(
    employeeWageSelected,
    (value) => {
      if (value) {
        let emp = employeeWages.value.find((item: any) => item.employeeId === value)
        employee.value = cloneDeep(emp);
      }
    },
    { deep: true }
);
// watch listen props.isOpenModalCreate
watch(() => props.isOpenModalCreate, (val) => {
  if (!val) {
    resetForm();
  }
})
const onSubmit = async (e: any) => {
  const res = e.validationGroup.validate();
  // !res.isValid
  if (!res.isValid) {
    res.brokenRules[0].validator.focus();
  } else {
    const result = {
      ...formData,
      employeeType: stateSelectQuery.selectedRadioValue,
      employeeId: employee.value.employeeId,
    }
    if (!result.beforeSalary) delete result.beforeSalary
    if (!result.changeReason) delete result.changeReason
    mutate({
      ...variables,
      input: result,
    })
  }
}

const handleRadioChange = (event: Event) => {
  stateSelectQuery.selectedRadioValue = +(event.target as HTMLInputElement).value;
  query.value = getQuery(+(event.target as HTMLInputElement).value);
  employeeWageSelected.value = null;
};
</script>

<style lang="scss" scoped>

.gap-20 {
  gap: 20px;
}

.item-group {
  margin-top: 10px;
  border: 1px solid #a3a2a277;
  padding: 10px;
}
.label-custom {
  :deep(.ant-form-item-label ) {
    label {
      min-width: 100px;
    }
  }
}
:deep(.ant-form-item-label ) {
  label {
    min-width: 140px;
  }
}
</style>
