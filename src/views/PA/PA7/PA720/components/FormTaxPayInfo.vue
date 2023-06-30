<template>
  <a-spin :spinning="loadingIncomeExtra" size="large">
    <standard-form formName="pa-720-form" ref="pa720FormRef">
      <a-row>
        <a-col :span="24">
          <a-form-item label="기타소득자" label-align="right" class="red">
            <employ-type-select :width="500" :disabled="isEdit || !hasDataSource || isExpiredStatus || idDisableInput"
              :arrayValue="employSelect" v-model:valueEmploy="formPA720.input.employeeId" :required="true"
              :newLoadKey="formPA720.input.employee.key" @incomeTypeCode="changeIncomeTypeCode" />
          </a-form-item>
        </a-col>
        <a-col span="24">
          <div class="header-text-1 mb-10 mt-10">소득내역</div>
        </a-col>
        <a-col :span="13" class="input-group-left">
          <a-form-item label="귀속/지급연월">
            <div class="d-flex-center">
              <DxButton :text="'귀 ' + inputDateTax"
                :style="{ color: 'white', backgroundColor: 'gray', height: $config_styles.HeightInput }"
                class="btn-date" />
              <DxButton :text="'지 ' + paymentDateTax"
                :style="{ color: 'white', backgroundColor: 'black', height: $config_styles.HeightInput }"
                class="btn-date" />
            </div>
          </a-form-item>
          <a-form-item label="지급일" class="red mt-10">
            <date-time-box-custom width="148px" :required="true" :startDate="startDate" :finishDate="finishDate"
              v-model:valueDate="dayDate" :clearable="false"
              :disabled="isEdit || !hasDataSource || isExpiredStatus || idDisableInput" />
            <div v-if="isLoopDayPA720" class="error-group" style="max-width: 150px;">동일 소득자의 동일 지급일로 중복 등록 불가합니다.</div>
          </a-form-item>
          <a-form-item label="지급액" class="red mt-10">
            <div class="d-flex-center">
              <number-box-money width="150px" :min="0" :max="2147483647" @changeInput="onChangeInput"
                v-model:valueInput="formPA720.input.paymentAmount" :required="true" :disabled="idDisableInput"
                format="0,###" />
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="필요경비" class="red mt-10">
            <div class="d-flex-center">
              <number-box-money width="150px" :min="0" max="2147483647" :required="true" @changeInput="onChangeInput"
                v-model:valueInput="formPA720.input.requiredExpenses" :disabled="idDisableInput" class="red"
                format="0,###" />
              <span class="pl-5">원</span>
            </div>
          </a-form-item>
          <a-form-item label="소득금액" class="mt-10">
            <div class="d-flex-center">
              <number-box-money width="150px" :min="0" max="2147483647" :required="true" v-model:valueInput="incomeAmount"
                :disabled="true" format="0,###" />
              <span class="pl-5">원</span>
            </div>

          </a-form-item>
          <a-form-item label="세율" class="red mt-10">
            <DxSelectBox width="200px" valueExpr="value" :data-source="taxRateOptions" v-model="formPA720.input.taxRate"
              placeholder="선택" item-template="item" display-expr="label" :height="$config_styles.HeightInput"
              :required="true" :disabled="idDisableInput">
              <template #item="{ data } : any">
                <a-tooltip placement="top" zIndex="9999">
                  <template #title v-if=" data?.tooltip ">
                    <span>{{ data.tooltip }}</span>
                  </template>
                  <span>{{ data.label }}</span>
                </a-tooltip>
              </template>
              <DxValidator>
                <DxRequiredRule :message=" messageRequired " />
              </DxValidator>
            </DxSelectBox>
          </a-form-item>
        </a-col>
        <a-col :span="11" class="input-group-right">
          <div class="header-text-2 mb-10">
            공제합계
            <b>{{
              $filters.formatCurrency(formPA720.input.withholdingIncomeTax +
              formPA720.input.withholdingLocalIncomeTax)
              }}</b>원
          </div>
          <!-- <div class="input-text"> -->
            <a-form-item label="소득세(공제)" class="mb-10">
              <div class="d-flex-center">
                <number-box-money :disabled=" idDisableInput " v-model:valueInput=" formPA720.input.withholdingIncomeTax "
                format="0,###" :min=" 0" :width="140"/>
              <span class="ml-5">원</span>
              </div>
              
            </a-form-item>
          <!-- </div> -->
          <!-- <div class="input-text"> -->
            <a-form-item label="지방소득세(공제)" class="mb-10">
              <div class="d-flex-center">
                <number-box-money :disabled=" idDisableInput " :width="140"
                v-model:valueInput=" formPA720.input.withholdingLocalIncomeTax " format="0,###" :min=" 0 " />
              <span class="ml-5">원</span>
              </div>
              
            </a-form-item>
          <!-- </div> -->
          <div class="top-con">
            <div class="header-text-2 mb-10 d-flex">
              차인지급액
              <b class="mx-3">{{
                $filters.formatCurrency(
                formPA720.input.paymentAmount -
                formPA720.input.withholdingIncomeTax -
                formPA720.input.withholdingLocalIncomeTax
                )
                }}</b>
              원
              <a-tooltip placement="top" class="custom-tooltip">
                <template #title>
                  지급액 - 공제합계
                </template>
                <div style="text-align: center;">
                  <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px" class="mb-3 ml-10" />
                </div>
              </a-tooltip>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row justify="center" class="my-10 mt-30">
        <button-basic text="저장" type="default" mode="contained" :width=" 90 " @onClick="onSubmitForm($event)"
          id="pa720-save-js" :disabled=" idDisableInput ">
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
import filters from '@/helpers/filters';


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
    hasDataSource: {
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
    // let paymentDayPA720 = computed(() => {
    //   let day = store.state.common.paymentDayPA720;
    //   const daysInMonth = +dayjs(`${processKeyPA720.value.processKey.paymentMonth}`).daysInMonth();
    //   let newDay = day > daysInMonth || day == 0 ? daysInMonth : day;
    //   return newDay;
    // });
    const isEdit = ref(false);
    const getEmployeeExtrasTrigger = ref<boolean>(true);
    const inputDateTax = computed(() => {
      if (props.hasDataSource) {
        return processKeyPA720.value.processKey.imputedYear + '-' + formatMonth(processKeyPA720.value.processKey.imputedMonth);
      }
      return '';
    });
    const paymentDateTax = computed(() => {
      if (props.hasDataSource) {
        return processKeyPA720.value.processKey.paymentYear + '-' + formatMonth(processKeyPA720.value.processKey.paymentMonth);
      }
      return '';
    });
    const isLoopDayPA720 = computed(() => store.state.common.isLoopDayPA720);
    // common
    let incomeAmount = computed(() => formPA720.value.input.paymentAmount - formPA720.value.input.requiredExpenses);
    let incomeTax = ref(0);
    let localIncomeTax = ref(0);
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(messages.getCommonMessage('102').message);
    const messageUpdate = messages.getCommonMessage('106').message;
    const messageCreate = messages.getCommonMessage('101').message;
    const pa720FormRef = ref();
    //store
    const isNewRowPA720 = computed(() => store.state.common.isNewRowPA720);
    const isClickEditDiffPA720 = computed(() => store.state.common.isClickEditDiffPA720);
    const idDisableInput = computed(() => {
      if (props.hasDataSource && !isEdit.value && !isNewRowPA720.value) {
        return true;
      }
      if (!props.hasDataSource || props.isExpiredStatus) {
        return true
      }
      return false;
    })
    const dayDate = ref<any>(null);
    watch(() => dayDate.value, (newVal1: any) => {
      if (newVal1) {
        formPA720.value.input.paymentDay = +newVal1.toString().slice(-2);
        formEditPA720.value.input.paymentDay = +newVal1.toString().slice(-2);
      }
    }, { deep: true });
    watch(() => formPA720.value.input.employeeId, (newVal1: any) => {
      dayDate.value = `${processKeyPA720.value.processKey.paymentYear}${filters.formatMonth(
        processKeyPA720.value.processKey.paymentMonth
      )}${formPA720.value.input.paymentDay}`;
    }, { immediate: true });
    const startDate = computed(() => {
      let day = dayjs(`${processKeyPA720.value.processKey.paymentYear}${processKeyPA720.value.processKey.paymentMonth}`).startOf('month').toDate();
      return day;
    });
    const finishDate = computed(() => {
      let day = dayjs(`${processKeyPA720.value.processKey.paymentYear}${processKeyPA720.value.processKey.paymentMonth}`).endOf('month').toDate();
      return day;
    });
    // employee arr
    const employSelect = computed(() => store.state.common.employSelect);
    //-------------------------get incom extra detail ------------------------

    watch(
      () => props.editTax,
      (newValue) => {
        if (+newValue?.incomeId > 0) {
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
      if (isClickEditDiffPA720.value) {
        store.state.common.isClickEditDiffPA720 = false;
      } else {
        store.commit('common/selectedRowKeysPA720', data.incomeId);
      }
      incomeExtraData.value = data;
      triggerIncomeExtra.value = false;
      let editRowData: any = {};
      editRowData.input = {
        paymentDay: data.paymentDay,
        employeeId: data.employeeId,
        paymentAmount: data.paymentAmount,
        requiredExpenses: data.requiredExpenses,
        taxRate: data.taxRate,
        withholdingIncomeTax: data.withholdingIncomeTax,
        withholdingLocalIncomeTax: data.withholdingLocalIncomeTax,
        incomeId: data.incomeId,
        employee: {
          key: data.employeeId
        }
      };
      dayDate.value = `${processKeyPA720.value.processKey.paymentYear}${filters.formatMonth(
        processKeyPA720.value.processKey.paymentMonth
      )}${data.paymentDay}`;
      store.commit('common/formPA720', editRowData)
      store.commit('common/formEditPA720', editRowData);
    });
    onErrorIncomeExtra((res: any) => {
    });

    //-------------------------- mutation create and edit income SUBMIT FORM ------------------------

    const { mutate: createIncomeExtra, onDone: createIncomeExtraDone, onError: createIncomeExtraError } = useMutation(mutations.createIncomeExtra);
    const { mutate: updateIncomeExtra, onDone: updateIncomeExtraDone, onError: updateIncomeExtraError } = useMutation(mutations.updateIncomeExtra);
    //submit
    const onSubmitForm = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid || isLoopDayPA720.value) {
        emit('subValidate');
        res.brokenRules[0]?.validator?.focus();
        store.state.common.isErrorFormPA720 = true;

      } else {
        let params = JSON.parse(JSON.stringify(formPA720.value));
        delete params.input.incomeId;
        delete params.input.employee;
        delete params.input.actualPayment;
        delete params.input.incomePayment;
        params.input.paymentDay = +dayDate.value.toString().slice(-2);
        if (isEdit.value === true) {
          delete params.input.paymentDay;
          delete params.input.employeeId;
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
      notification('success', messageCreate);
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
      formPA720.value.input.incomeId = res.data.updateIncomeExtra.incomeId;
      formEditPA720.value.input.incomeId = res.data.updateIncomeExtra.incomeId;
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
      let objIncomeTax: any = Formula.getIncomeTax(objIncomeAmount, formPA720.value.input.taxRate * 100);
      formPA720.value.input.withholdingIncomeTax = objIncomeTax.incomeTax;
      formPA720.value.input.withholdingLocalIncomeTax = objIncomeTax.localIncomeTax;
      formPA720.value.input.incomePayment = formPA720.value.input.paymentAmount - formPA720.value.input.requiredExpenses;
      formPA720.value.input.actualPayment = formPA720.value.input.paymentAmount - formPA720.value.input.withholdingIncomeTax - formPA720.value.input.withholdingLocalIncomeTax;
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

    const changeIncomeTypeCode = (emitVal: any) => {
      formPA720.value.input.employee = emitVal;
    };
    watch(() => formPA720.value.input.taxRate, () => {
      caclInput();
    }, { deep: true });
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
      isEdit,
      employSelect,
      incomeAmount,
      incomeTax,
      localIncomeTax,
      resultIncomeExtra,
      onChangeInput,
      messageRequired,
      inputDateTax,
      paymentDateTax,
      loadingIncomeExtra,
      getEmployeeExtrasTrigger,
      formEditPA720,
      pa720FormRef,
      onSubmitForm,
      resetForm,
      triggerIncomeExtra,
      idDisableInput,
      isClickEditDiffPA720,
      startDate, finishDate, dayDate,
      processKeyPA720, isLoopDayPA720,
    };
  },
});
</script>

<style></style>
