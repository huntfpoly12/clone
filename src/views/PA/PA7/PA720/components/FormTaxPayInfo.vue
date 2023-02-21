<template>
  <a-spin :spinning="newDateLoading || loadingIncomeExtra" size="large">
    {{ formPA720 }} formPA720 <br/>
    {{ formEditPA720 }} formEditPA720 <br/>
    <a-row>
      <a-col :span="24">
        <a-form-item label="사업소득자" label-align="right" class="red">
          <employ-type-select :disabled="isEdit || !isColumnData" :arrayValue="arrayEmploySelect"
            v-model:valueEmploy="formPA720.input.employeeId" width="350px" :required="true"
            @incomeTypeCode="changeIncomeTypeCode" />
        </a-form-item>
      </a-col>
      <a-col span="24">
        <div class="header-text-1 mb-10">소득내역</div>
      </a-col>
      <a-col :span="12" style="padding-right: 5px">
        <a-form-item label="귀속/지급연월" style="display: flex">
          <div class="d-flex-center">
            <DxButton :text="'귀 ' + inputDateTax"
              :style="{ color: 'white', backgroundColor: 'gray', height: $config_styles.HeightInput }" class="btn-date"/>
            <DxButton :text="'지 ' + paymentDateTax"
              :style="{ color: 'white', backgroundColor: 'black', height: $config_styles.HeightInput }" class="btn-date" />
          </div>
        </a-form-item>
        <a-form-item label="지급일" class="red">
          <number-box :max="31" :min="1" :disabled="isEdit || !isColumnData" width="150px" class="mr-5"
            v-model:valueInput="formPA720.input.paymentDay" :required="true" />
        </a-form-item>
        <a-form-item label="지급액" class="red">
          <number-box-money width="150px" :min="0" :max="2147483647" @changeInput="onChangeInput"
            v-model:valueInput="formPA720.input.paymentAmount" :required="true"
            :disabled="!isColumnData"></number-box-money>
        </a-form-item>
        <a-form-item label="필요경비" class="red">
          <number-box-money width="150px" :min="0" max="2147483647" :required="true" @changeInput="onChangeInput"
            v-model:valueInput="formPA720.input.requiredExpenses" :disabled="!isColumnData"
            class="red"></number-box-money>
        </a-form-item>
        <a-form-item label="세율" class="red">
          <DxSelectBox width="200px" valueExpr="value" :data-source="taxRateOptions" :value="formPA720.input.taxRate"
            placeholder="선택" item-template="item" display-expr="label" :height="$config_styles.HeightInput"
            @value-changed="updateValue" :required="true" :disabled="!isColumnData">
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
        <div class="">
          <div class="header-text-2 mb-10">
            공제합계원
            <b>{{
              $filters.formatCurrency(formPA720.input.withholdingIncomeTax +
                formPA720.input.withholdingLocalIncomeTax)
            }}</b>원
          </div>
        </div>
        <div class="input-text">
          <a-form-item label="소득세(공제)">
            <number-box-money :disabled="true" style="margin-left: 20px; width: 150px"
              v-model:valueInput="formPA720.input.withholdingIncomeTax" />
            <span class="ml-1">원</span>
          </a-form-item>
        </div>
        <div class="input-text">
          <a-form-item label="지방소득세(공제)">
            <number-box-money :disabled="true" style="margin-left: 20px; width: 150px"
              v-model:valueInput="formPA720.input.withholdingLocalIncomeTax" />
            <span class="ml-1">원</span>
          </a-form-item>
        </div>
        <div class="top-con">
          <div class="header-text-2 mb-10">
            차인지급액
            <b>{{
              $filters.formatCurrency(
                formPA720.input.paymentAmount -
                formPA720.input.requiredExpenses -
                formPA720.input.withholdingIncomeTax -
                formPA720.input.withholdingLocalIncomeTax
              )
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
import {formatMonth} from '../utils/index';
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
    let month1: any = ref(dayjs().format('YYYY-MM'));
    let month2: any = ref(dayjs().format('YYYY-MM'));
    let disabledInput = ref(false);
    let formPA720: any = computed(() => store.state.common.formPA720);
    let formEditPA720: any = computed(() => store.state.common.formEditPA720);
    let processKeyPA720: any = computed(() => store.getters['common/processKeyPA720']);
    const isEdit = ref(false);
    const getEmployeeExtrasTrigger = ref<boolean>(true);
    const getEmployeeExtrasParams = reactive({
      companyId: companyId,
      imputedYear: parseInt(dayjs().format('YYYY')),
    });
    const arrayEmploySelect = ref<any>([]);
    const newDateLoading = ref<boolean>(false);
    const inputDateTax = computed(() => {
      if (props.isColumnData) {
        return processKeyPA720.value.processKey.imputedYear+'-'+formatMonth(processKeyPA720.value.processKey.imputedMonth);
      }
      return '';
    });
    const paymentDateTax = computed(() => {
      if (props.isColumnData) {
        return processKeyPA720.value.processKey.paymentYear+'-'+formatMonth(processKeyPA720.value.processKey.paymentMonth);
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
       (newValue) => {
        if (newValue?.incomeId) {
          incomeExtraParam.value = newValue;
          isEdit.value = true;
          setTimeout(()=>{
            triggerIncomeExtra.value = true;
          },10)
        }
      },
      { deep: true }
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
    const { result: resultEmployeeExtras} = useQuery(queries.getEmployeeExtras, getEmployeeExtrasParams, () => ({
      fetchPolicy: 'no-cache',
    }));
    // mutation
    const { mutate: createIncomeExtra, onDone: createIncomeExtraDone, onError: createIncomeExtraError } = useMutation(mutations.createIncomeExtra);
    const { mutate: updateIncomeExtra, onDone: updateIncomeExtraDone, onError: updateIncomeExtraError } = useMutation(mutations.updateIncomeExtra);

    // get data

    watch(resultIncomeExtra, (newVal: any) => {
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
        incomeId: data.incomeId,
      };
      store.commit('common/formPA720', editRowData)
      store.commit('common/formEditPA720', editRowData);
      newDateLoading.value = loadingIncomeExtra.value;
    });
    // SUBMIT FORM

    watch(actionSavePA720, () => {
      if (isEdit.value === true) {
        let incomeExtraUpdateData = JSON.parse(JSON.stringify(formPA720.value));
        delete incomeExtraUpdateData.input.incomeId;
        delete incomeExtraUpdateData.input.paymentDay;
        delete incomeExtraUpdateData.input.employeeId;
        delete incomeExtraUpdateData.input.incomeTypeCode;
        incomeExtraUpdateData.incomeId = incomeExtraParam.value.incomeId;
        let updateData = {...processKeyPA720.value,input:{...incomeExtraUpdateData.input},incomeId:props.editTax.incomeId}
        updateIncomeExtra(updateData);
        return;
      }
      let createData = JSON.parse(JSON.stringify(formPA720.value));
      delete createData.input.incomeId;
      let updateData = {...processKeyPA720.value,input:{...createData.input}};
      createIncomeExtra(updateData);
    });
    // GET ARRAY FORM
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
      store.state.common.isNewRowPA720 = false;
      store.state.common.isErrorFormPA720 = false;
      formPA720.value.input.incomeId = res.data.createIncomeExtra.incomeId;
      store.commit('common/formEditPA720', formPA720.value);
    });
    updateIncomeExtraDone((res) => {
      emit('changeFommDone');
      notification('success', `업데이트 완료!`);
      store.state.common.isNewRowPA720 = false;
      store.state.common.isErrorFormPA720 = false;
      store.commit('common/formEditPA720', formPA720.value);
    });
    //error message
    onErrorIncomeExtra((res: any) => {
      newDateLoading.value = loadingIncomeExtra.value;
    });
    createIncomeExtraError((res: any) => {
      notification('error', res.message);
      store.state.common.isErrorFormPA720 = true;
    });
    updateIncomeExtraError((res: any) => {
      notification('error', res.message);
      store.state.common.isErrorFormPA720 = true;
    })
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
      formEditPA720
    };
  },
});
</script>

<style lang="scss" scoped src="../style/style.scss" ></style>>
