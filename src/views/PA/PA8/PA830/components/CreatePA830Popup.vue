<template>
  <a-modal
    class="form-modal"
    width="60%"
    :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }"
    :visible="isOpenModalCreate"
    title="급여변경신고 신규 등록"
    centered
    @cancel="closePopup"
    :footer="null"
    :mask-closable="false"
  >
    <standard-form ref="formRef">
      <div class="mb-10">
        <DxField label="직원선택">
          <employ-select
            :arrayValue="employeeWages"
            v-model:valueEmploy="employeeWageSelected"
            width="300px"
            placeholder="선택"
          />
        </DxField>
      </div>
      <a-row :gutter="[0, 0]" class="item-group mb-10">
        <a-col span="8">
          <DxField label="업체명">
            <default-text-box
              v-model:valueInput="formData.company_name"
              placeholder="업체명"
              disabled
            />
          </DxField>
        </a-col>
        <a-col span="8">
          <DxField label="전화번호">
            <default-text-box
              v-model:valueInput="formData.phone"
              placeholder="전화번호"
              disabled
            />
          </DxField>
        </a-col>
        <a-col span="8">
          <DxField label="팩스번호">
            <default-text-box
              v-model:valueInput="formData.fax"
              placeholder="팩스번호"
              disabled
            />
          </DxField>
        </a-col>
        <a-col span="8">
          <DxField label="사업장관리번호">
            <default-text-box
              v-model:valueInput="infoCompany.address"
              placeholder="사업장관리번호"
              disabled
            />
          </DxField>
        </a-col>
        <a-col span="16">
          <DxField label="주소">
            <default-text-box
              v-model:valueInput="infoCompany.address"
              placeholder="주소"
              disabled
            />
          </DxField>
        </a-col>
      </a-row>
      <a-row :gutter="[0, 0]" class="item-group mb-10">
        <a-col span="8">
          <DxField label="성명">
            <default-text-box
              v-model:valueInput="formData.company_name"
              placeholder="성명"
              disabled
            />
          </DxField>
        </a-col>
        <a-col span="4"></a-col>
        <a-col span="8">
          <DxField label="주민등록번호" class="field-custom">
            <default-text-box
              v-model:valueInput="formData.fax"
              placeholder="주민등록번호"
              disabled
            />
          </DxField>
        </a-col>
        <a-col span="8">
          <DxField label="보수변경 년월">
            <default-text-box
              v-model:valueInput="formData.fax"
              placeholder="보수변경 년월"
              disabled
            />
          </DxField>
        </a-col>
        <a-col span="4"></a-col>
        <a-col span="8">
          <DxField label="변경된 보수월액" class="field-custom">
            <default-text-box
              v-model:valueInput="formData.address"
              placeholder="변경된 보수월액"
              disabled
            />
          </DxField>
        </a-col>
      </a-row>
      <a-row :gutter="[0, 0]" class="item-group mb-10">
        <a-col span="12">
          <DxField label="취득대상보험선택" class="field-custom">
            <div class="d-flex gap-20">
              <checkbox-basic
                disabled
                label="국민연금"
                v-model:valueCheckbox="formData.boolean"
              />
              <checkbox-basic
                label="건강보험"
                v-model:valueCheckbox="formData.boolean1"
              />
              <checkbox-basic
                label="고용보험"
                v-model:valueCheckbox="formData.boolean2"
              />
            </div>
          </DxField>
        </a-col>
        <a-col span="12">
          <DxField label="일자리안정자금 지원 신청여부" class="field-custom-2" >
            <div class="d-flex gap-20">
              <a-radio-group
                v-model:value="formData.radio"
                class="d-flex items-center"
              >
                <a-radio :value="1">예</a-radio>
                <a-radio :value="2">아니요</a-radio>
              </a-radio-group>
            </div>
          </DxField>
        </a-col>
        <a-col span="12">
          <DxField label="변경사유" >
            <div class="d-flex gap-20">
              <a-radio-group
                v-model:value="formData.radio1"
                class="d-flex items-center"
              >
                <a-radio :value="1">보수 인상</a-radio>
                <a-radio :value="2">보수 인하</a-radio>
                <a-radio :value="3">착오 정정</a-radio>
              </a-radio-group>
            </div>
          </DxField>
        </a-col>
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
import queries from "@/graphql/queries/PA/PA8/PA810/index";
import { companyId } from "@/helpers/commonFunction";
import { useCompanyInfo } from "@/helpers/useCompanyInfo";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import { useQuery } from "@vue/apollo-composable";
import { cloneDeep, isEqual } from "lodash";
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import { useStore } from "vuex";
import { INITIAL_FORM_PA830 } from '../utils';

export default defineComponent({
  components: {},
  props: {
    isOpenModalCreate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const store = useStore();
    const { infoCompany } = useCompanyInfo(companyId)
    const globalYear = computed(() => parseInt(sessionStorage.getItem("paYear") ?? '0'));
    const employeeWages = ref();
    const employeeWageSelected = ref();
    const formData = ref({...INITIAL_FORM_PA830})
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
    const isFormChange = computed(() => {
      return !isEqual(cloneDeep(INITIAL_FORM_PA830), cloneDeep(formData.value))
        || Boolean(employeeWageSelected.value)
    });
    const resetForm = () => {
      formData.value = cloneDeep(INITIAL_FORM_PA830)
      employeeWageSelected.value = null
    };

    const closePopup = () => {
      if (isFormChange.value) {
        comfirmClosePopup(() => {
          emit('closeModal')
        })
      } else {
        emit('closeModal')
      }
    }
    // watch listen props.isOpenModalCreate
    watch(() => props.isOpenModalCreate, (val) => {
      if (!val) {
        resetForm();
      }
    })
    const onSubmit = async () => {
      console.log(formData.value)
    }
    return {
      employeeWages,
      formData,
      onSubmit,
      employeeWageSelected,
      infoCompany,
      closePopup
    }
  },
})
</script>

<style scoped>
.gap-20 {
  gap: 20px;
}
</style>
