<template>
  <a-modal
    class="form-modal"
    width="50%"
    :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }"
    :visible="isOpenModalCreate"
    title="급여변경신고"
    centered
    @cancel="$emit('closeModal')"
    :footer="null"
  >
    <standard-form ref="formRef">
      <div class="mb-10">
        <DxField label="직원선택">
          <employ-select
            :arrayValue="employeeWages"
            width="300px"
          />
        </DxField>
      </div>
      <a-row :gutter="[0, 0]" class="item-group mb-10">
        <a-col span="8">
          <DxField label="업체명">
            <default-text-box
              v-model:valueInput="formData.company_name"
              placeholder="업체명"
            />
          </DxField>
        </a-col>
        <a-col span="8">
          <DxField label="전화번호">
            <default-text-box
              v-model:valueInput="formData.phone"
              placeholder="전화번호"
            />
          </DxField>
        </a-col>
        <a-col span="8">
          <DxField label="팩스번호">
            <default-text-box
              v-model:valueInput="formData.fax"
              placeholder="팩스번호"
            />
          </DxField>
        </a-col>
        <a-col span="8">
          <DxField label="사업장관리번호">
            <default-text-box
              v-model:valueInput="formData.adding"
              placeholder="사업장관리번호"
            />
          </DxField>
        </a-col>
        <a-col span="16">
          <DxField label="팩스번호">
            <default-text-box
              v-model:valueInput="formData.address"
              placeholder="팩스번호"
            />
          </DxField>
        </a-col>
      </a-row>
      <a-row :gutter="[0, 0]" class="item-group mb-10">
        <!-- row 1 -->
        <a-col :span="col.left">
          <DxField label="성명">
            <default-text-box
              v-model:valueInput="formData.company_name"
              placeholder="성명"
              width="200px"
            />
          </DxField>
        </a-col>
        <a-col :span="col.right">
          <DxField label="주민등록번호" class="field-custom">
            <default-text-box
              v-model:valueInput="formData.fax"
              placeholder="주민등록번호"
              width="200px"
            />
          </DxField>
        </a-col>

        <!-- row 2 -->
        <a-col :span="col.left">
          <DxField label="휴직/복직">
            <div class="d-flex gap-20">
              <a-radio-group
                v-model:value="formData.employmentStatus"
                class="d-flex items-center"
              >
                <a-radio :value="EmploymentStatus.LeaveOfAbsence">휴직</a-radio>
                <a-radio :value="EmploymentStatus.ReturnToWork">복직</a-radio>
              </a-radio-group>
            </div>
          </DxField>
        </a-col>
        <a-col :span="col.right">
          <DxField label="납부재개 예정일" class="field-custom">
            <date-time-box
              dateFormat="YYYY-MM-DD"
              v-model="formData.contractExpiredDate"
              width="200px"
            />
          </DxField>
        </a-col>

        <!-- row 3 -->
        <a-col :span="col.left">
          <DxField label="휴직종류">
            <DxSelectBox
              :search-enabled="true"
              :data-source="INITIAL_FORM.LeaveOfAbsenceDocument"
              display-expr="name"
              value-expr="id"
              name="type"
              placeholder="선택"
              width="200px"
            >
            </DxSelectBox>
          </DxField>
        </a-col>
        <a-col :span="col.right">
          <DxField label="복귀후 급여(납부재개)" class="field-custom">
            <number-box-money :disabled="true" width="200px" v-model:valueInput="formData.money" />
          </DxField>

        </a-col>

        <!-- row 4 -->
        <a-col :span="col.left">
          <DxField label="휴직계파일">
            <div class="fileuploader-container">
              <UploadFile label="파일 선택" @response-fileId="getFileId" :isFileList="false"/>
            </div>
          </DxField>
        </a-col>
        <a-col :span="col.right">
          <DxField label="재개월 납부 희망 여부" class="field-custom">
            <a-radio-group
              v-model:value="formData.paymentDesire"
              class="d-flex items-center"
            >
              <a-radio :value="PaymentDesire.No">{{ PaymentDesire.No }}</a-radio>
              <a-radio :value="PaymentDesire.Yes">{{ PaymentDesire.Yes }}</a-radio>
            </a-radio-group>
          </DxField>
        </a-col>

        <!-- row 5 -->
        <a-col :span="col.left">
          <DxField label="휴직시작일">
            <date-time-box
              dateFormat="YYYY-MM-DD"
              v-model="formData.leaveStartDate"
              width="200px"
            />
          </DxField>
        </a-col>
        <a-col :span="col.right">
          <div class="px-10">(건강) 유예기간중 지급받은 보수</div>
        </a-col>

        <!-- row 6 -->
        <a-col :span="col.left">
          <DxField label="휴직종료(예정)">
            <date-time-box
              dateFormat="YYYY-MM-DD"
              v-model="formData.leaveOfAbsence"
              width="200px"
            />
          </DxField>
        </a-col>
        <a-col :span="col.right">
          <DxField label="연도" class="field-custom">
            <year-picker-box-custom v-model:valueDate="formData.year" color="#a6a6a6" />
          </DxField>
        </a-col>

        <!-- row 7 -->
        <a-col :span="col.left">
          <DxField label="국민연금납부예외 사유부호" class="field-custom-2">
            <DxSelectBox
              :search-enabled="true"
              :data-source="INITIAL_FORM.NationalPensionPaymentExemptionCode"
              display-expr="name"
              value-expr="id"
              name="type"
              placeholder="선택"
              width="200px"
            />
          </DxField>
        </a-col>
        <a-col :span="col.right">
          <DxField label="보수총액" class="field-custom">
            <number-box-money
              width="200px"
              v-model:valueInput="formData.totalRemuneration"
              placeholder="원"
            />
          </DxField>
        </a-col>

        <!-- row 8 -->
        <a-col :span="col.left">
          <DxField label="국민연금납부예외 사유부호" class="field-custom-2">
            <DxSelectBox
              :search-enabled="true"
              :data-source="INITIAL_FORM.ReasonForDeferringHealthInsurancePayments"
              display-expr="name"
              value-expr="id"
              name="type"
              placeholder="선택"
              width="200px"
            />
          </DxField>
        </a-col>
        <a-col :span="col.right">
          <DxField label="분할납부횟수" class="field-custom">

            <text-number-box
              :value="formData.totalRemuneration"
              placeholder="원"
              width="200px"
            />
          </DxField>
        </a-col>

        <!-- row 9 -->
        <a-col :span="col.left">
          <DxField label="고용산재 보험구분" class="field-custom-2">
            <DxSelectBox
              :search-enabled="true"
              :data-source="INITIAL_FORM.TypeOfWorkersCompensationInsurance"
              display-expr="name"
              value-expr="id"
              name="type"
              placeholder="선택"
              width="200px"
            />
          </DxField>
        </a-col>
        <a-col :span="col.right" />

        <!-- row 10 -->
        <a-col :span="col.left">
          <DxField label="고용산재 보험구분" class="field-custom-2">
            <DxSelectBox
              :search-enabled="true"
              :data-source="INITIAL_FORM.EmploymentInjuryLeaveReasonCode"
              display-expr="name"
              value-expr="id"
              name="type"
              placeholder="선택"
              width="200px"
            />
          </DxField>
        </a-col>
        <a-col :span="col.right" />
      </a-row>
      <div class="d-flex justify-center mt-20">
        <button-basic
          :width="90"
          id="btn-save"
          @onClick="onSubmit()"
          style="margin: auto"
          mode="contained"
          type="default"
          text="저장"
        />
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref} from 'vue'
import UploadFile from "@/components/UploadFile.vue";
import StandardForm from "@/components/common/StandardForm.vue";
import DxField from "@/views/PA/PA8/components/DxField.vue";
import {useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA8/PA810/index";
import {companyId} from "@/helpers/commonFunction";
import {useStore} from "vuex";
import {EmploymentStatus, FormCreatePA830, PaymentDesire} from "@/views/PA/PA8/const";
import INITIAL_FORM from "@/views/PA/PA8/const"
import DxSelectBox from 'devextreme-vue/select-box';


export default defineComponent({
  components: {
    UploadFile,
    StandardForm,
    DxField,
    DxSelectBox
  },
  props: {
    isOpenModalCreate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();
    const globalYear = computed(() => store.getters['settings/currentYear']);
    const employeeWages = ref();
    const formData = ref({...INITIAL_FORM.INITIAL_FORM_PA840})
    const variables = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
    });
    const {result: dataEmployeeWages, onResult: onResultEmployeeWages, refetch: refetchDataEmployeeWages} = useQuery(queries.getEmployeeWages, variables, () => ({
        fetchPolicy: "no-cache",
      }));
    onResultEmployeeWages((res) => {
      const data = res.data.getEmployeeWages;
      if (data?.length) {
        employeeWages.value = data;
      }
    })
    const onSubmit = async () => {
      console.log(formData.value)
    }
    const getFileId = (fileId: { id: number }) => {
      formData.value.dependentsEvidenceFileStorageId = fileId.id;
    };
    return {
      employeeWages,
      formData,
      onSubmit,
      EmploymentStatus,
      PaymentDesire,
      INITIAL_FORM,
      getFileId,
      col: {
        left: 13,
        right: 9,
        space: 3,
      },
    }
  },
})
</script>

<style scoped>
@import "@/views/PA/PA8/styles/index.scss";
.gap-20 {
  gap: 20px;
}
</style>
