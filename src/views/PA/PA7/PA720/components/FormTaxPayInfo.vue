<template>
  <standard-form name="add-page-210" style="border: 1px solid #d7d7d7; padding: 10px">
    <a-spin :spinning="newDateLoading" size="large">
      {{ dataAction }}
      <a-row>
        <a-col :span="24">
          <a-form-item label="사업소득자" label-align="right">
            <employ-type-select
              :disabled="disabledInput"
              :arrayValue="isEdit ? incomeArr : arrayEmploySelect"
              v-model:valueEmploy="dataAction.input.employeeId"
              width="350px"
              :required="true"
              @incomeTypeCode="changeIncomeTypeCode"
              :readOnly="isEdit"
            />
            <div v-if="validations.employeeId" class="validate">this must be filled</div>
          </a-form-item>
        </a-col>
        <a-col span="24">
          <div class="header-text-1 mb-10">소득내역</div>
        </a-col>
        <a-col :span="12" style="padding-right: 5px">
          <a-form-item label="귀속/지급연월" style="display: flex">
            <div class="d-flex-center">
              <div class="month-custom-1 d-flex-center">
                귀
                <month-picker-box v-model:valueDate="month1" width="65px" class="mr-5 ml-5" :readonly="true" />
              </div>
              <div class="month-custom-2 d-flex-center">
                지
                <month-picker-box v-model:valueDate="month2" class="ml-5" width="65px" :readonly="true" />
              </div>
            </div>
          </a-form-item>
          <a-form-item label="지급일">
            <number-box :max="31" :min="1" :readOnly="isEdit" width="150px" class="mr-5" v-model:valueInput="dataAction.input.paymentDay" :disabled="disabledInput" />
            <div v-if="validations.paymentDay" class="validate">this must be filled</div>
          </a-form-item>
          <a-form-item label="지급액">
            <number-box-money width="150px" :min="0" :max="2147483647" @changeInput="onChangeInput" v-model:valueInput="dataAction.input.paymentAmount" :required="true"></number-box-money>
            <div v-if="validations.paymentAmount" class="validate">this must be filled</div>
          </a-form-item>
          <a-form-item label="필요경비">
            <number-box-money width="150px" :min="0" max="2147483647" :required="true" @changeInput="onChangeInput" v-model:valueInput="dataAction.input.requiredExpenses"></number-box-money>
            <div v-if="validations.requiredExpenses" class="validate">this must be filled</div>
          </a-form-item>
          <a-form-item label="세율">
            <DxSelectBox
              width="200px"
              valueExpr="value"
              :data-source="taxRateOptions"
              :value="dataAction.input.taxRate"
              placeholder="선택"
              item-template="item"
              display-expr="label"
              :height="$config_styles.HeightInput"
              @value-changed="updateValue"
            >
              <template #item="{ data }">
                <a-tooltip placement="top" zIndex="9999">
                  <template #title v-if="data?.tooltip">
                    <span>{{ data.tooltip }}</span>
                  </template>
                  <span>{{ data.label }}</span>
                </a-tooltip>
              </template>
            </DxSelectBox>
            <div v-if="validations.taxRate" class="validate">this must be filled</div>
          </a-form-item>
        </a-col>
        <a-col class="input-group-4" :span="12" style="padding-left: 5px">
          <div class="">
            <div class="header-text-2 mb-10">
              공제합계원
              <b>{{ $filters.formatCurrency(dataAction.input.withholdingIncomeTax + dataAction.input.withholdingLocalIncomeTax) }}</b
              >원
            </div>
          </div>
          <div class="input-text">
            <a-form-item label="소득세(공제)">
              <number-box-money :readOnly="true" style="margin-left: 20px; width: 150px" :required="true" v-model:valueInput="dataAction.input.withholdingIncomeTax" />
              <span>원</span>
            </a-form-item>
          </div>
          <div class="input-text">
            <a-form-item label="지방소득세(공제)">
              <number-box-money :readOnly="true" style="margin-left: 20px; width: 150px" :required="true" v-model:valueInput="dataAction.input.withholdingLocalIncomeTax" />
              <span>원</span>
            </a-form-item>
          </div>
          <div class="top-con">
            <div class="header-text-2 mb-10">
              차인지급액
              <b>{{
                $filters.formatCurrency(dataAction.input.paymentAmount - dataAction.input.requiredExpenses - dataAction.input.withholdingIncomeTax - dataAction.input.withholdingLocalIncomeTax)
              }}</b>
              원
              <img src="@/assets/images/iconInfo.png" style="width: 16px" />
              <span style="font-size: 10px; color: #7f7f7f; margin-left: 5px">지급액 - 필요경비 - 공제합계</span>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-spin>
  </standard-form>
</template>

<script lang="ts">
import { ref, defineComponent, watch, reactive, computed } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import queries from '@/graphql/queries/PA/PA7/PA720/index';
import mutations from '@/graphql/mutations/PA/PA7/PA720/index';
import dayjs from 'dayjs';
import DxSelectBox from 'devextreme-vue/select-box';
import notification from '@/utils/notification';
import { companyId } from '@/helpers/commonFunction';
import { Formula } from '@bankda/jangbuda-common';
import { useStore } from 'vuex';
export default defineComponent({
  components: {
    DxSelectBox,
  },
  props: {
    actionSave: {
      type: Number,
    },
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
  },
  setup(props, { emit }) {
    const store = useStore();
    const incomeExtraParam = ref<any>({
      ...props.editTax,
    });
    const incomeExtraData = ref<any>([]);
    const triggerIncomeExtra = ref<boolean>(false);
    const incomeArr = ref<any>([]);
    let month1: any = ref(dayjs().format('YYYY-MM'));
    let month2: any = ref(dayjs().format('YYYY-MM'));
    let disabledInput = ref(false);
    let dataAction: any = reactive({
      companyId: companyId,
      processKey: {
        imputedYear: null,
        imputedMonth: null,
        paymentYear: null,
        paymentMonth: null,
      },
      input: {
        paymentDay: null,
        employeeId: null,
        incomeTypeCode: '',
        paymentAmount: null,
        requiredExpenses: null,
        taxRate: null,
        withholdingIncomeTax: null,
        withholdingLocalIncomeTax: null,
      },
    });
    const isEdit = ref(false);
    const getEmployeeExtrasTrigger = ref<boolean>(true);
    const getEmployeeExtrasParams = reactive({
      companyId: companyId,
      imputedYear: parseInt(dayjs().format('YYYY')),
    });
    const arrayEmploySelect = ref<any>([]);
    const newDateLoading = ref<boolean>(false);
    const isResetComponent = ref<boolean>(true);
    // common
    let incomeAmount = ref(0);
    let incomeTax = ref(0);
    let localIncomeTax = ref(0);
    //watch for changes
    watch(
      [() => props.editTax, () => props.isLoadNewForm],
      ([newValue, newValue2]: [any, boolean]) => {
        if (newValue2) {
          newDateLoading.value = true;
          if (newValue.incomeId) {
            incomeExtraParam.value = newValue;
            dataAction.companyId = newValue.companyId;
            triggerIncomeExtra.value = true;
            let date1 = newValue.processKey.imputedYear + '-' + newValue.processKey.imputedMonth;
            let date2 = newValue.processKey.paymentYear + '-' + newValue.processKey.paymentMonth;
            month1.value = dayjs(date1).format('YYYY-MM');
            month2.value = dayjs(date2).format('YYYY-MM');
            incomeArr.value = [];
            isEdit.value = true;
            refetchIncomeExtra();
          } else {
            newDateLoading.value = false;
          }
        }
      },
      { deep: true }
    );
    watch(
      () => [props.addNewIncomeExtra, isResetComponent.value],
      async ([newValue]: any) => {
        let date1 = newValue.imputedYear + '-' + newValue.imputedMonth;
        let date2 = newValue.paymentYear + '-' + newValue.paymentMonth;
        month1.value = dayjs(date1).format('YYYY-MM');
        month2.value = dayjs(date2).format('YYYY-MM');
      }
    );
    //query
    const {
      refetch: refetchIncomeExtra,
      loading: loadingIncomeExtra,
      onResult: onResultIncomeExtra,
      onError: onErrorIncomeExtra,
      result: resultIncomeExtra,
    } = useQuery(queries.getIncomeExtra, incomeExtraParam, () => ({
      enabled: triggerIncomeExtra.value,
      fetchPolicy: 'no-cache',
    }));
    const { result: resultEmployeeExtras } = useQuery(queries.getEmployeeExtras, getEmployeeExtrasParams, () => ({
      fetchPolicy: 'no-cache',
      enabled: getEmployeeExtrasTrigger.value,
    }));
    // mutation
    const { mutate: createIncomeExtra, onDone: createIncomeExtraDone, onError: createIncomeExtraError } = useMutation(mutations.createIncomeExtra);
    const { mutate: updateIncomeExtra, onDone: updateIncomeExtraDone, onError: updateIncomeExtraError } = useMutation(mutations.updateIncomeExtra);

    // get data

    onResultIncomeExtra((res) => {
      let data = res.data.getIncomeExtra;
      incomeExtraData.value = data;
      triggerIncomeExtra.value = false;
      dataAction.input = {
        paymentDay: data.paymentDay,
        employeeId: data.employeeId,
        incomeTypeCode: data.incomeTypeCode,
        paymentAmount: data.paymentAmount,
        requiredExpenses: data.requiredExpenses,
        taxRate: data.taxRate,
        withholdingIncomeTax: data.withholdingIncomeTax,
        withholdingLocalIncomeTax: data.withholdingLocalIncomeTax,
      };
      dataAction.processKey = incomeExtraParam.value.processKey;
      incomeArr.value.push({
        employeeId: data.employee.employeeId,
        incomeTypeCode: data.incomeTypeCode,
        name: data.employee.name,
        incomeTypeName: data.employee.incomeTypeName,
      });
      newDateLoading.value = loadingIncomeExtra.value;
      validations.employeeId = false;
      validations.taxRate = false;
      validations.paymentDay = false;
      validations.paymentAmount = false;
      validations.requiredExpenses = false;
    });
    // validate
    const validations = reactive({
      employeeId: false,
      taxRate: false,
      paymentDay: false,
      paymentAmount: false,
      requiredExpenses: false,
    });
    watch(
      dataAction.input,
      (newVal) => {
        if (newVal.employeeId) {
          validations.employeeId = false;
        }
        if (newVal.paymentDay) {
          validations.paymentDay = false;
        }
        if (newVal.paymentAmount) {
          validations.paymentAmount = false;
        }
        if (newVal.requiredExpenses) {
          validations.requiredExpenses = false;
        }
        if (newVal.taxRate) {
          validations.taxRate = false;
        }
      },
      { deep: true }
    );
    // SUBMIT FORM
    watch(
      () => props.actionSave,
      () => {
        store.commit('changeKeyActive', dataAction.input.employeeId);
        store.commit('pending');
        if (!dataAction.input.employeeId) {
          validations.employeeId = true;
        }
        if (!dataAction.input.paymentDay) {
          validations.paymentDay = true;
        }
        if (!dataAction.input.paymentAmount) {
          validations.paymentAmount = true;
        }
        if (!dataAction.input.requiredExpenses) {
          validations.requiredExpenses = true;
        }
        if (!dataAction.input.taxRate) {
          validations.taxRate = true;
        }
        if (validations.employeeId || validations.paymentAmount || validations.paymentDay || validations.requiredExpenses || validations.taxRate) {
          store.commit('hasError', true);
          console.log(`output-`);
          return;
        }
        store.commit('hasError', false);
        dataAction.processKey.imputedMonth = parseInt(month1.value.split('-')[1]);
        dataAction.processKey.imputedYear = parseInt(month1.value.split('-')[0]);
        dataAction.processKey.paymentMonth = parseInt(month2.value.split('-')[1]);
        dataAction.processKey.paymentYear = parseInt(month2.value.split('-')[0]);
        if (isEdit.value === true) {
          let incomeExtraUpdateData = JSON.parse(JSON.stringify(dataAction));
          delete incomeExtraUpdateData.input.paymentDay;
          delete incomeExtraUpdateData.input.employeeId;
          delete incomeExtraUpdateData.input.incomeTypeCode;
          incomeExtraUpdateData.incomeId = incomeExtraParam.value.incomeId;
          updateIncomeExtra(incomeExtraUpdateData);
          return;
        }
        createIncomeExtra(dataAction);
      }
    );
    // GET FORM
    watch(resultEmployeeExtras, (newValue: any) => {
      arrayEmploySelect.value = newValue.getEmployeeExtras;
      getEmployeeExtrasTrigger.value = false;
    });

    const checkLen = (text: String) => {
      if (text.length > 10) {
        return text.substring(0, 10) + '...';
      }
      return text;
    };
    // GET INCOMETYPECODE
    const changeIncomeTypeCode = (res: string) => {
      dataAction.input.incomeTypeCode = res;
    };

    // AFTER ACTION FORM
    createIncomeExtraDone((res) => {
      emit('changeFommDone');
      notification('success', `업데이트 완료!`);
    });
    updateIncomeExtraDone((res) => {
      emit('changeFommDone');
      notification('success', `업데이트 완료!`);
    });
    //error message
    onErrorIncomeExtra((res: any) => {
      newDateLoading.value = loadingIncomeExtra.value;
    });
    createIncomeExtraError((res: any) => {
      notification('error', res.message);
    });
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
    const caclInput = () => {
      let objIncomeAmount: any = Formula.getExtraEmployeeIncomeAmount(dataAction.input.paymentAmount, dataAction.input.requiredExpenses);
      let objIncomeTax: any = Formula.getIncomeTax(objIncomeAmount, dataAction.input.taxRate);
      incomeAmount.value = objIncomeAmount;
      dataAction.input.withholdingIncomeTax = objIncomeTax.incomeTax;
      dataAction.input.withholdingLocalIncomeTax = objIncomeTax.localIncomeTax;
    };
    const updateValue = (value: any) => {
      dataAction.input.taxRate = value.value;
      caclInput();
    };
    const onChangeInput = () => {
      caclInput();
    };
    return {
      checkLen,
      month1,
      month2,
      incomeExtraData,
      incomeExtraParam,
      incomeArr,
      disabledInput,
      dataAction,
      changeIncomeTypeCode,
      taxRateOptions,
      updateValue,
      isEdit,
      arrayEmploySelect,
      newDateLoading,
      incomeAmount,
      incomeTax,
      localIncomeTax,
      isResetComponent,
      validations,
      resultIncomeExtra,
      onChangeInput,
    };
  },
});
</script>

<style lang="scss" scoped src="../style/style.scss" >
</style>>