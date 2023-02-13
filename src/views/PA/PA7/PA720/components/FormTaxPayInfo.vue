<template>
  <a-spin :spinning="newDateLoading" size="large">
    {{ formPA720 }}{{ isEdit }}
    <a-row>
      <a-col :span="24">
        <a-form-item label="사업소득자" label-align="right" class="red">
          <employ-type-select
            :disabled="isEdit || !isColumnData"
            :arrayValue="isEdit ? incomeArr : arrayEmploySelect"
            v-model:valueEmploy="formPA720.input.employeeId"
            width="350px"
            :required="true"
            @incomeTypeCode="changeIncomeTypeCode"
          />
          <!-- <div v-if="validations.employeeId" class="validate">this must be filled</div> -->
        </a-form-item>
      </a-col>
      <a-col span="24">
        <div class="header-text-1 mb-10">소득내역</div>
      </a-col>
      <a-col :span="12" style="padding-right: 5px">
        <a-form-item label="귀속/지급연월" style="display: flex">
          <div class="d-flex-center">
            <DxButton :text="'귀' + inputDateTax" :style="{ color: 'white', backgroundColor: 'gray',height: $config_styles.HeightInput }"  />
            <DxButton :text="'지' + paymentDateTax" :style="{ color: 'white', backgroundColor: 'black',height: $config_styles.HeightInput }" />
          </div>
        </a-form-item>
        <a-form-item label="지급일" class="red">
          <number-box :max="31" :min="1" :disabled="isEdit || !isColumnData" width="150px" class="mr-5" v-model:valueInput="formPA720.input.paymentDay" :required="true" />
          <!-- <div v-if="validations.paymentDay" class="validate">this must be filled</div> -->
        </a-form-item>
        <a-form-item label="지급액" class="red">
          <number-box-money
            width="150px"
            :min="0"
            :max="2147483647"
            @changeInput="onChangeInput"
            v-model:valueInput="formPA720.input.paymentAmount"
            :required="true"
            :disabled="!isColumnData"
          ></number-box-money>
          <!-- <div v-if="validations.paymentAmount" class="validate">this must be filled</div> -->
        </a-form-item>
        <a-form-item label="필요경비" class="red">
          <number-box-money
            width="150px"
            :min="0"
            max="2147483647"
            :required="true"
            @changeInput="onChangeInput"
            v-model:valueInput="formPA720.input.requiredExpenses"
            :disabled="!isColumnData"
            class="red"
          ></number-box-money>
          <!-- <div v-if="validations.requiredExpenses" class="validate">this must be filled</div> -->
        </a-form-item>
        <a-form-item label="세율" class="red">
          <DxSelectBox
            width="200px"
            valueExpr="value"
            :data-source="taxRateOptions"
            :value="formPA720.input.taxRate"
            placeholder="선택"
            item-template="item"
            display-expr="label"
            :height="$config_styles.HeightInput"
            @value-changed="updateValue"
            :required="true"
          >
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
          <!-- <div v-if="validations.taxRate" class="validate">this must be filled</div> -->
        </a-form-item>
      </a-col>
      <a-col class="input-group-4" :span="12" style="padding-left: 5px">
        <div class="">
          <div class="header-text-2 mb-10">
            공제합계원
            <b>{{ $filters.formatCurrency(formPA720.input.withholdingIncomeTax + formPA720.input.withholdingLocalIncomeTax) }}</b
            >원
          </div>
        </div>
        <div class="input-text">
          <a-form-item label="소득세(공제)">
            <number-box-money :disabled="true" style="margin-left: 20px; width: 150px" v-model:valueInput="formPA720.input.withholdingIncomeTax" />
            <span>원</span>
          </a-form-item>
        </div>
        <div class="input-text">
          <a-form-item label="지방소득세(공제)">
            <number-box-money :disabled="true" style="margin-left: 20px; width: 150px" v-model:valueInput="formPA720.input.withholdingLocalIncomeTax" />
            <span>원</span>
          </a-form-item>
        </div>
        <div class="top-con">
          <div class="header-text-2 mb-10">
            차인지급액
            <b>{{
              $filters.formatCurrency(formPA720.input.paymentAmount - formPA720.input.requiredExpenses - formPA720.input.withholdingIncomeTax - formPA720.input.withholdingLocalIncomeTax)
            }}</b>
            원
            <img src="@/assets/images/iconInfo.png" style="width: 16px" />
            <span style="font-size: 10px; color: #7f7f7f; margin-left: 5px">지급액 - 필요경비 - 공제합계</span>
          </div>
        </div>
      </a-col>
    </a-row>
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
    // let formPA720: any = computed(() => store.state.common.formPA720);
    const formPA720 = computed(() => store.getters['common/formPA720'])
    const formEditPA720 = computed(() => store.getters['common/formEditPA720'])
    const isEdit = ref(false);
    const getEmployeeExtrasTrigger = ref<boolean>(false);
    const getEmployeeExtrasParams = reactive({
      companyId: companyId,
      imputedYear: parseInt(dayjs().format('YYYY')),
    });
    const arrayEmploySelect = ref<any>([]);
    const newDateLoading = ref<boolean>(false);
    const isResetComponent = ref<boolean>(true);
      const inputDateTax = computed(() => {
      if (props.isColumnData) {
        return month1.value;
      }
      return '';
    });
    const paymentDateTax = computed(() => {
      if (props.isColumnData) {
        return month2.value;
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

    //store
    const actionSavePA720 = computed(() => store.getters['common/actionSavePA720']);
    //watch for changes
    watch(
      () => props.editTax,
      async (newValue) => {
        if (newValue.incomeId) {
          incomeExtraParam.value = newValue;
          // formPA720.companyId = newValue.companyId;
          isEdit.value = true;
          await refetchIncomeExtra();
          triggerIncomeExtra.value = true;
          getEmployeeExtrasTrigger.value = true;
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
      onError: onErrorIncomeExtra,
      result: resultIncomeExtra,
    } = useQuery(queries.getIncomeExtra, incomeExtraParam, () => ({
      enabled: triggerIncomeExtra.value,
      fetchPolicy: 'no-cache',
    }));
    const { result: resultEmployeeExtras, refetch: refetchEmployeeExtras } = useQuery(queries.getEmployeeExtras, getEmployeeExtrasParams, () => ({
      fetchPolicy: 'no-cache',
      enabled: getEmployeeExtrasTrigger.value,
    }));
    // mutation
    const { mutate: createIncomeExtra, onDone: createIncomeExtraDone, onError: createIncomeExtraError } = useMutation(mutations.createIncomeExtra);
    const { mutate: updateIncomeExtra, onDone: updateIncomeExtraDone, onError: updateIncomeExtraError } = useMutation(mutations.updateIncomeExtra);

    // get data

    watch(resultIncomeExtra,(newVal: any) => {
      let data = newVal.getIncomeExtra;
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
      };
      formPA720.value.processKey = incomeExtraParam.value.processKey;
      formEditPA720.value.processKey = incomeExtraParam.value.processKey;
      store.commit('common/formPA720',editRowData);
      store.commit('common/formEditPA720',editRowData);
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
      () => formPA720.value.input,
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

    watch(actionSavePA720, () => {
        // store.commit('pending');
        if (!formPA720.value.input.employeeId) {
        validations.employeeId = true;
      }
      if (!formPA720.value.input.paymentDay) {
        validations.paymentDay = true;
      }
      if (!formPA720.value.input.paymentAmount) {
        validations.paymentAmount = true;
        }
        if (!formPA720.value.input.requiredExpenses) {
            validations.requiredExpenses = true;
        }
      if (!formPA720.value.input.taxRate) {
        validations.taxRate = true;
      }
      if (validations.employeeId || validations.paymentAmount || validations.paymentDay || validations.requiredExpenses || validations.taxRate) {
          store.commit('common/isErrorFormPA720', true);
          store.commit('common/keyActivePA720', formPA720.value.input.employeeId);
          return;
        }
      store.commit('common/isErrorFormPA720', false);
      formPA720.value.processKey.imputedMonth = parseInt(month1.value.split('-')[1]);
      formPA720.value.processKey.imputedYear = parseInt(month1.value.split('-')[0]);
      formPA720.value.processKey.paymentMonth = parseInt(month2.value.split('-')[1]);
      formPA720.value.processKey.paymentYear = parseInt(month2.value.split('-')[0]);
      if (isEdit.value === true) {
        let incomeExtraUpdateData = JSON.parse(JSON.stringify(formPA720.value));
        delete incomeExtraUpdateData.input.paymentDay;
        delete incomeExtraUpdateData.input.employeeId;
        delete incomeExtraUpdateData.input.incomeTypeCode;
        incomeExtraUpdateData.incomeId = incomeExtraParam.value.incomeId;
        updateIncomeExtra(incomeExtraUpdateData);
        return;
      }
      createIncomeExtra(formPA720.value);
      let formPA720Fake = JSON.parse(JSON.stringify(formPA720.value.input));
      store.state.common.formInputInit = formPA720Fake;
    });
    // GET FORM
    watch(resultEmployeeExtras, (newValue: any) => {
      arrayEmploySelect.value = newValue.getEmployeeExtras;
    });

    const checkLen = (text: String) => {
      if (text.length > 10) {
        return text.substring(0, 10) + '...';
      }
      return text;
    };
    // GET INCOMETYPECODE
    const changeIncomeTypeCode = (res: string) => {
      formPA720.value.input.incomeTypeCode = res;
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
      let objIncomeAmount: any = Formula.getExtraEmployeeIncomeAmount(formPA720.value.input.paymentAmount, formPA720.value.input.requiredExpenses);
      let objIncomeTax: any = Formula.getIncomeTax(objIncomeAmount, formPA720.value.input.taxRate);
      incomeAmount.value = objIncomeAmount;
      formPA720.value.input.withholdingIncomeTax = objIncomeTax.incomeTax;
      formPA720.value.input.withholdingLocalIncomeTax = objIncomeTax.localIncomeTax;
    };
    const updateValue = (value: any) => {
      formPA720.value.input.taxRate = value.value;
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
      isResetComponent,
      validations,
      resultIncomeExtra,
      onChangeInput,
      actionSavePA720,
      messageRequired,
      inputDateTax,
      paymentDateTax
    };
  },
});
</script>

<style lang="scss" scoped src="../style/style.scss" >
</style>>
