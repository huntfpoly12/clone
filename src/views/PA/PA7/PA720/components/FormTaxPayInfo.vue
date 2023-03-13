<template>
  <a-spin :spinning="newDateLoading || loadingIncomeExtra" size="large">
    <!-- {{ formPA720.input}} formPA720 <br/>
    {{ formEditPA720.input }} formEditPA720 <br/> -->
    <!-- {{ getEmployeeExtrasParams }} getEmployeeExtrasParams <br/>
    {{ incomeExtraParam }} incomeExtraParam <br/> -->
    <standard-form formName="pa-720-form" ref="pa720FormRef">
      <a-row>
        <a-col :span="24">
          <a-form-item label="기타소득자" label-align="right" class="red">
            <employ-type-select :disabled="isEdit || !isColumnData || isExpiredStatus" :arrayValue="arrayEmploySelect"
              v-model:valueEmploy="formPA720.input.employeeId" width="350px" :required="true"
              @incomeTypeCode="changeIncomeTypeCode" />
          </a-form-item>
        </a-col>
        <a-col span="24">
          <div class="header-text-1 mb-10">소득내역</div>
        </a-col>
        <a-col :span="12" class="input-group-4" style="padding-right: 5px">
          <a-form-item label="귀속/지급연월" style="display: flex">
            <div class="d-flex-center">
              <DxButton :text="'귀 ' + inputDateTax"
                :style="{ color: 'white', backgroundColor: 'gray', height: $config_styles.HeightInput }"
                class="btn-date" />
              <DxButton :text="'지 ' + paymentDateTax"
                :style="{ color: 'white', backgroundColor: 'black', height: $config_styles.HeightInput }"
                class="btn-date" />
            </div>
          </a-form-item>
          <a-form-item label="지급일" class="red mt-15">
            <number-box :max="31" :min="1" :disabled="isEdit || !isColumnData || isExpiredStatus" width="150px"
              class="mr-5" v-model:valueInput="formPA720.input.paymentDay" :required="true" :isFormat="true" />
          </a-form-item>
          <div class="input-text">
            <a-form-item label="지급액" class="red mt-10">
              <number-box-money width="150px" :min="0" :max="2147483647" @changeInput="onChangeInput"
                v-model:valueInput="formPA720.input.paymentAmount" :required="true"
                :disabled="!isColumnData || isExpiredStatus"></number-box-money>
              <span class="ml-3">원</span>
            </a-form-item>
          </div>
          <div class="input-text">
            <a-form-item label="필요경비" class="red">
              <number-box-money width="150px" :min="0" max="2147483647" :required="true" @changeInput="onChangeInput"
                v-model:valueInput="formPA720.input.requiredExpenses" :disabled="!isColumnData || isExpiredStatus"
                class="red"></number-box-money>
              <span class="ml-3">원</span>
            </a-form-item>
          </div>
          <a-form-item label="세율" class="red">
            <DxSelectBox width="200px" valueExpr="value" :data-source="taxRateOptions" v-model="formPA720.input.taxRate"
              placeholder="선택" item-template="item" display-expr="label" :height="$config_styles.HeightInput"
               :required="true" :disabled="!isColumnData || isExpiredStatus" >
              <template #item="{ data }">
                <a-tooltip placement="top" zIndex="9999">
                  <template #title v-if="data?.tooltip">
                    <span>{{ data.tooltip }}</span>
                  </template>
                  <span>{{ data.label }}</span>
                </a-tooltip>
              </template>
              <DxValidator>
                <DxRequiredRule :message="messageRequired" />
              </DxValidator>
            </DxSelectBox>
          </a-form-item>
        </a-col>
        <a-col class="input-group-4" :span="12" style="padding-left: 5px">
          <div class="header-text-2 mb-10">
            공제합계
            <b>{{
              $filters.formatCurrency(formPA720.input.withholdingIncomeTax +
                formPA720.input.withholdingLocalIncomeTax)
            }}</b>원
          </div>
          <div class="input-text">
            <a-form-item label="소득세(공제)">
              <number-box-money :disabled="true" style="margin-left: 20px; width: 150px"
                v-model:valueInput="formPA720.input.withholdingIncomeTax" />
              <span class="ml-3">원</span>
            </a-form-item>
          </div>
          <div class="input-text">
            <a-form-item label="지방소득세(공제)">
              <number-box-money :disabled="true" style="margin-left: 20px; width: 150px"
                v-model:valueInput="formPA720.input.withholdingLocalIncomeTax" />
              <span class="ml-3">원</span>
            </a-form-item>
          </div>
          <div class="top-con">
            <div class="header-text-2 mb-10">
              차인지급액
              <b>{{
                $filters.formatCurrency(
                  formPA720.input.paymentAmount -
                  formPA720.input.withholdingIncomeTax -
                  formPA720.input.withholdingLocalIncomeTax
                )
              }}</b>
              원
              <img src="@/assets/images/iconInfo.png" style="width: 16px" />
              <span style="font-size: 10px; color: #7f7f7f; margin-left: 5px">지급액 - 공제합계</span>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row justify="center" class="my-10 mt-20">
        <button-basic text="저장" type="default" mode="contained" :width="90" @onClick="onSubmitForm($event)"
          id="pa720-save-js" :disabled="!isColumnData || isExpiredStatus">
        </button-basic>
      </a-row>
    </standard-form>
  </a-spin>
</template>

<script lang="ts">

import { ref, defineComponent, watch, reactive, computed, getCurrentInstance } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import queries from '@/graphql/queries/PA/PA7/PA720/index';
import mutations from '@/graphql/mutations/PA/PA7/PA720/index';
import dayjs from 'dayjs';
import DxSelectBox from 'devextreme-vue/select-box';
import notification from '@/utils/notification';
import { companyId } from '@/helpers/commonFunction';
import { Formula } from '@bankda/jangbuda-common';
import { useStore } from 'vuex';
import DxButton from 'devextreme-vue/button';
import DxValidator, { DxRequiredRule } from 'devextreme-vue/validator';
import { formatMonth } from '../utils/index';


const taxRateOptions = [
  {
    label: '20% (일반적인 기타소득)',
    value: 20,
  },
  {
    label: '15% (연금외수령)',
    tooltip: '세액공제를 받은 연금납입액, 연금계좌의 운용실적에 따라 증가된 금액',
    value: 15,
  },
  {
    label: '30% (복권 등 당첨금)',
    value: 30,
  },
];
export default defineComponent({
  components: {
    DxSelectBox,
    DxButton,
    DxValidator,
    DxRequiredRule,
  },
  props: {
    editTax: {
      required: true,
      type: Object,
    },
    addNewIncomeExtra: {
      type: Object,
    },
    isLoadNewForm: {
      type: Boolean,
    },
    isColumnData: {
      type: Boolean,
      default: false,
    },
    isExpiredStatus: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const incomeExtraParam = ref<any>({
      ...props.editTax,
    });
    const incomeExtraData = ref<any>([]);
    const triggerIncomeExtra = ref<boolean>(false);
    let month1: any = ref(dayjs().format('YYYY-MM'));
    let month2: any = ref(dayjs().format('YYYY-MM'));
    let disabledInput = ref(false);
    let formPA720: any = computed(() => store.state.common.formPA720);
    let formEditPA720: any = computed(() => store.state.common.formEditPA720);
    let processKeyPA720: any = computed(() => store.getters['common/processKeyPA720']);
    const isEdit = ref(false);
    const getEmployeeExtrasTrigger = ref<boolean>(true);
    const newDateLoading = ref<boolean>(false);
    const inputDateTax = computed(() => {
      if (props.isColumnData) {
        return processKeyPA720.value.processKey.imputedYear + '-' + formatMonth(processKeyPA720.value.processKey.imputedMonth);
      }
      return '';
    });
    const paymentDateTax = computed(() => {
      if (props.isColumnData) {
        return processKeyPA720.value.processKey.paymentYear + '-' + formatMonth(processKeyPA720.value.processKey.paymentMonth);
      }
      return '';
    });
    // common
    let incomeAmount = ref(0);
    let incomeTax = ref(0);
    let localIncomeTax = ref(0);
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(messages.getCommonMessage('102').message);
    const messageUpdate = messages.getCommonMessage('106').message;
    const pa720FormRef = ref();
    //store
    const actionSavePA720 = computed(() => store.getters['common/actionSavePA720']);

    //-------------------------get incom extra detail ------------------------

    watch(
      () => props.editTax,
      (newValue) => {
        if (newValue?.incomeId) {
          incomeExtraParam.value = newValue;
          isEdit.value = true;
          triggerIncomeExtra.value = true;
        }
      },
      { deep: true }
    );
    const {
      loading: loadingIncomeExtra,
      onError: onErrorIncomeExtra,
      result: resultIncomeExtra,
    } = useQuery(queries.getIncomeExtra, incomeExtraParam, () => ({
      enabled: triggerIncomeExtra.value,
      fetchPolicy: 'no-cache',
    }));
    watch(resultIncomeExtra, (newVal: any) => {
      let data = newVal.getIncomeExtra;
      if(data){
        store.commit('common/selectedRowKeysPA720',data.incomeId);
      }
      incomeExtraData.value = data;
      triggerIncomeExtra.value = false;
      let editRowData: any = {};
      editRowData.input = {
        paymentDay: data.paymentDay,
        employeeId: data.employeeId,
        incomeTypeCode: data.incomeTypeCode,
        paymentAmount: data.paymentAmount,
        requiredExpenses: data.requiredExpenses,
        taxRate: data.taxRate,
        withholdingIncomeTax: data.withholdingIncomeTax,
        withholdingLocalIncomeTax: data.withholdingLocalIncomeTax,
        incomeId: data.incomeId,
      };
      store.commit('common/formPA720', editRowData)
      store.commit('common/formEditPA720', editRowData);
      newDateLoading.value = loadingIncomeExtra.value;
    });
    onErrorIncomeExtra((res: any) => {
      newDateLoading.value = loadingIncomeExtra.value;
    });

    //----------------------------get employee extras --------------------------------
    const globalYear = computed(() => store.state.settings.globalYear);
    const savePA710 = computed(()=>store.state.common.savePA710);
    const getEmployeeExtrasParams = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
    });
    const arrayEmploySelect = ref<any>([]);
    const { result: resultEmployeeExtras, refetch: refetchEmployeeExtras } = useQuery(queries.getEmployeeExtras, getEmployeeExtrasParams, () => ({
      fetchPolicy: 'no-cache',
    }));
    watch(resultEmployeeExtras, (newValue: any) => {
      arrayEmploySelect.value = newValue.getEmployeeExtras;
    });
    
    watch(savePA710, ()=> {
      refetchEmployeeExtras();
    })
    //change year
    // watch(globalYear, (newVal, oldY) => {
    //   getEmployeeExtrasParams.imputedYear = newVal;
    // });

    //-------------------------- mutation create and edit income SUBMIT FORM ------------------------

    const { mutate: createIncomeExtra, onDone: createIncomeExtraDone, onError: createIncomeExtraError } = useMutation(mutations.createIncomeExtra);
    const { mutate: updateIncomeExtra, onDone: updateIncomeExtraDone, onError: updateIncomeExtraError } = useMutation(mutations.updateIncomeExtra);
    //submit
    const onSubmitForm = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        emit('subValidate');
        res.brokenRules[0].validator.focus();
        store.state.common.isErrorFormPA720 = true;

      } else {
        let params = JSON.parse(JSON.stringify(formPA720.value));
        delete params.input.incomeId;
        delete params.input.employee;
        delete params.input.actualPayment;
        delete params.input.incomePayment;
        if (isEdit.value === true) {
          delete params.input.paymentDay;
          delete params.input.employeeId;
          delete params.input.incomeTypeCode;
          params.incomeId = incomeExtraParam.value.incomeId;
          let updateData = { ...processKeyPA720.value, input: { ...params.input }, incomeId: incomeExtraParam.value.incomeId }
          updateIncomeExtra(updateData);
          return;
        }
        let updateData = { ...processKeyPA720.value, input: { ...params.input } };
        createIncomeExtra(updateData);
      }
    };
    // AFTER ACTION FORM
    createIncomeExtraDone((res) => {
      notification('success', `업데이트 완료!`);
      store.state.common.isNewRowPA720 = false;
      store.state.common.isErrorFormPA720 = false;
      formPA720.value.input.incomeId = res.data.createIncomeExtra.incomeId;
      formEditPA720.value.input.incomeId = res.data.createIncomeExtra.incomeId;
      store.commit('common/formEditPA720', formPA720.value);
      emit('onFormDone', true);
    });
    updateIncomeExtraDone((res) => {
      notification('success', messageUpdate);
      store.state.common.isNewRowPA720 = false;
      store.state.common.isErrorFormPA720 = false;
      store.commit('common/formEditPA720', formPA720.value);
      emit('onFormDone', true);
    });
    createIncomeExtraError((res: any) => {
      store.state.common.isErrorFormPA720 = true;
      notification('error', res.message);
      emit('onFormDone', false);
    });
    updateIncomeExtraError((res: any) => {
      store.state.common.isErrorFormPA720 = true;
      notification('error', res.message);
      emit('onFormDone', false);
    })

    // ------------------------------calculate form fn--------------------------

    const caclInput = () => {
      let objIncomeAmount: any = Formula.getExtraEmployeeIncomeAmount(formPA720.value.input.paymentAmount, formPA720.value.input.requiredExpenses);
      let objIncomeTax: any = Formula.getIncomeTax(objIncomeAmount, formPA720.value.input.taxRate);
      incomeAmount.value = objIncomeAmount;
      formPA720.value.input.withholdingIncomeTax = objIncomeTax.incomeTax;
      formPA720.value.input.withholdingLocalIncomeTax = objIncomeTax.localIncomeTax;
      formPA720.value.input.incomePayment = formPA720.value.input.paymentAmount - formPA720.value.input.requiredExpenses;
      formPA720.value.input.actualPayment = formPA720.value.input.paymentAmount - formPA720.value.input.withholdingIncomeTax - formPA720.value.input.withholdingLocalIncomeTax;
    };
    const updateValue = (value: any) => {
      formPA720.value.input.taxRate = value.value;
      caclInput();
    };
    const onChangeInput = () => {
      caclInput();
    };
    const checkLen = (text: String) => {
      if (text.length > 10) {
        return text.substring(0, 10) + '...';
      }
      return text;
    };
    const changeIncomeTypeCode = (res: string, id: any) => {
      formPA720.value.input.incomeTypeCode = res;
      formPA720.value.input.employee = arrayEmploySelect.value.filter((val: any) => val.employeeId == id)[0];
    };
    const resetForm = (e: any) => {
      e.validationGroup.reset();
    }
    return {
      checkLen,
      month1,
      month2,
      incomeExtraData,
      incomeExtraParam,
      disabledInput,
      formPA720,
      changeIncomeTypeCode,
      taxRateOptions,
      updateValue,
      isEdit,
      arrayEmploySelect,
      newDateLoading,
      incomeAmount,
      incomeTax,
      localIncomeTax,
      resultIncomeExtra,
      onChangeInput,
      actionSavePA720,
      messageRequired,
      inputDateTax,
      paymentDateTax,
      loadingIncomeExtra,
      getEmployeeExtrasTrigger,
      formEditPA720,
      pa720FormRef,
      getEmployeeExtrasParams,
      onSubmitForm,
      resetForm,
      triggerIncomeExtra,
    };
  },
});
</script>

<style lang="scss" scoped src="../style/style.scss" ></style>>
