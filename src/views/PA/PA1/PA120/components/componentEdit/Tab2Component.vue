<template>
  <div id="tab2-pa120">
    <!-- {{ initFormTab2PA120.deductionItems }} -->
    <!-- {{ initFormTab2PA120.payItems }} -->
    <!-- {{ editRowTab2PA120.payItems }}<br />
    {{ initFormTab2PA120.payItems }} -->
    <div class="header-text-1">공제 / 감면 / 소득세 적용율</div>
    <a-spin :spinning="loadingEmployeeWage" size="large">
      <a-row class="mb-7">
        <a-col span="24" style="display: flex; flex-wrap: wrap">
          <a-form-item label="4대보험 공제 여부" label-align="right" class="ins-dedu input-text empl-ins">
            <span class="check-box-tab1">
              <checkbox-basic label="국민연금"
                v-model:valueCheckbox="initFormTab2PA120.nationalPensionDeduction"></checkbox-basic>
            </span>
            <span class="check-box-tab1">
              <checkbox-basic label="건강보험" class="check-box-tab1"
                v-model:valueCheckbox="initFormTab2PA120.healthInsuranceDeduction"></checkbox-basic>
            </span>
            <span class="check-box-tab1 mb-4 ml-15">
              <checkbox-basic class="" size="18px" label="고용보험"
                v-model:valueCheckbox="initFormTab2PA120.employeementInsuranceDeduction"
                :disabled="presidentEditPA120"></checkbox-basic>
            </span>
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title>
                본 항목은 공제 계산을 위한 설정으로 실제 4대보험 신고 여부와는 무관합니다.
              </template>
              <div style="text-align: center;">
                <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px" class="mb-3 ml-10" />
              </div>
            </a-tooltip>
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <div class="header-text-4 d-flex" style="justify-content: space-around">
            <a-col :span="12"> 두루누리사회보험 공제 </a-col>
            <a-col :span="12" class="switch-bg">
              공제 여부:
              <switch-basic switch-basic textCheck="Y" textUnCheck="N" class="switch-insurance"
                :disabled="!isDisableInsuranceSupport" v-model:valueSwitch="initFormTab2PA120.insuranceSupport"
                @onChange="onChangeSwitch1"></switch-basic>
            </a-col>
          </div>
          <a-row :gutter="[0, 10]">
            <a-col span="7"> 국민연금 적용율: </a-col>
            <a-col span="12">
              <radio-group :arrayValue="radioCheckPersenPension"
                v-model:valueRadioCheck="initFormTab2PA120.nationalPensionSupportPercent" layoutCustom="horizontal"
                :disabled="!initFormTab2PA120.insuranceSupport || !isDisableInsuranceSupport || !initFormTab2PA120.nationalPensionDeduction"></radio-group>
            </a-col>
            <a-col span="7"> 고용보험 적용율: </a-col>
            <a-col span="12">
              <radio-group :arrayValue="radioCheckPersenPension"
                v-model:valueRadioCheck="initFormTab2PA120.employeementInsuranceSupportPercent" layoutCustom="horizontal"
                :disabled="!initFormTab2PA120.insuranceSupport || !isDisableInsuranceSupport || !initFormTab2PA120.employeementInsuranceDeduction"></radio-group>
            </a-col>
            <a-col span="7"><span class="header-text-4"> 소득세 적용율: </span></a-col>
            <a-col span="17" class="income-tax-app-rate">
              <radio-group :arrayValue="IncomeTaxAppRate"
                v-model:valueRadioCheck="initFormTab2PA120.incomeTaxMagnification"
                layoutCustom="horizontal"></radio-group>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="13">
          <div class="header-text-4 d-flex" style="justify-content: space-around">
            <a-col :span="13"> 중소기업취업 감면
              <a-tooltip placement="top" class="custom-tooltip">
                <template #title>
                  15세~34세 이하 청년, 60세 이상인 사람, 장애인, 경력단절여성이 중소기업에 취업하는 경우 취업일로 부터 3년간(청년 5년간) 근로소득세
                  70%(청년 90%, 150만원 한도) 감면
                </template>
                <div style="text-align: center;">
                  <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px" class="mb-3 ml-10" />
                </div>
              </a-tooltip>
            </a-col>
            <a-col :span="10" class="switch-bg">
              감면 여부:
              <switch-basic switch-basic textCheck="Y" textUnCheck="N" class="switch-insurance"
                v-model:valueSwitch="initFormTab2PA120.employeementReduction" @onChange="onChangeSwitch2"></switch-basic>
            </a-col>
          </div>
          <a-row :gutter="[5, 10]">
            <a-col span="7"> 감면기간: </a-col>
            <a-col span="15">
              <date-time-box width="250px" :range="true" :multi-calendars="true" v-model:valueDate="rangeDate"
                :disabled="!initFormTab2PA120.employeementReduction"> </date-time-box>
            </a-col>
            <a-col span="7"> 감면율: </a-col>
            <a-col span="15">
              <radio-group :arrayValue="radioCheckReductioRate"
                v-model:valueRadioCheck="initFormTab2PA120.employeementReductionRatePercent" layoutCustom="horizontal"
                :disabled="!initFormTab2PA120.employeementReduction"></radio-group>
            </a-col>
            <a-col span="7"> 감면입력: </a-col>
            <a-col span="15">
              <radio-group :arrayValue="radioCheckReductionInput"
                v-model:valueRadioCheck="initFormTab2PA120.employeementReductionInput" layoutCustom="horizontal"
                :disabled="!initFormTab2PA120.employeementReduction"></radio-group>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <div class="header-text-3">
        급여 (기본값)
        <a-tooltip placement="top" class="custom-tooltip">
          <template #title>
            급여소득자료 입력시 본 급여 기본값을 불러옵니다.
          </template>
          <div style="text-align: center;">
            <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px" class="mb-5 ml-10" />
          </div>
        </a-tooltip>
      </div>
      <a-row gutter="5">
        <a-col style="flex: 1 1 28%">
          <div class="header-text-2">요약</div>
          <div class="summary">
            <a-col :span="13">소득수당 합계
              <a-tooltip placement="top" class="custom-tooltip">
                <template #title>
                  수당 합계 = 수당 과세 + 수당 비과세
                </template>
                <div style="text-align: center;">
                  <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px" class="mb-3 ml-10" />
                </div>
              </a-tooltip> :
            </a-col>
            <a-col style="display: inline-flex; justify-content: flex-end"><span>{{
              $filters.formatCurrency(calculateVariables.totalTaxPay)
            }}</span> 원</a-col>
            <a-col class="ml-15" :span="12">수당 과세 합계:</a-col>
            <a-col style="display: inline-flex; justify-content: flex-end"><span>{{
              $filters.formatCurrency(totalPayItemTaxAll) }}</span> 원</a-col>
            <a-col class="ml-15" :span="12">수당 비과세 합계:</a-col>
            <a-col style="display: inline-flex; justify-content: flex-end"><span>{{
              $filters.formatCurrency(totalPayItemTaxFree) }}</span> 원</a-col>
            <a-col :span="13">공제 합계:</a-col>
            <a-col style="display: inline-flex; justify-content: flex-end"><span>{{
              $filters.formatCurrency(totalDeduction) }}</span> 원</a-col>
            <a-col :span="13" style="font-weight: 600;">차인지급액
              <a-tooltip placement="top" class="custom-tooltip">
                <template #title>
                  차인지급액 = 수당 합계 - 공제 합계 + 감면 합계
                </template>
                <div style="text-align: center;">
                  <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px" class="mb-3 ml-10" />
                </div>
              </a-tooltip> :
            </a-col>
            <a-col style="display: inline-flex; justify-content: flex-end; font-weight: 600"><span>{{
              $filters.formatCurrency(subPayment) }}</span> 원</a-col>
          </div>
        </a-col>
        <a-col class="col-2" style="display: flex; flex-direction: column">
          <div class="header-text-2">
            급여 {{ $filters.formatCurrency(totalPayItemTaxAll) }} 원 =
            과세 {{ $filters.formatCurrency(calculateVariables.totalTaxPay) }} 원 + 비과세
            {{ $filters.formatCurrency(totalPayItemTaxFree) }} 원
          </div>
          <a-spin :spinning="loading1" size="large" style="height: 100%">
            <div class="deduction-main">
              <div v-for="item in initFormTab2PA120.payItems" :key="item.name" class="custom-deduction">
                <span>
                  <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2" :name="item.name" :type="1"
                    subName="과세" />
                  <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2" :name="item.name" :type="2"
                    subName="상여(과세)" />
                  <deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode" :name="item.name" :type="3"
                    :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + (item.taxFreeIncludeSubmission ? 'O' : 'X')" />
                  <deduction-items v-if="item.taxPayItemCode == null && item.taxfreePayItemCode == null" :name="item.name"
                    :type="4" subName="과세" />
                </span>
                <div>
                  <number-box-money width="130px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="item.value"
                    :min="0" @changeInput="onCalcSum"> </number-box-money>
                  <span class="pl-5">원</span>
                </div>
              </div>
            </div>
          </a-spin>
        </a-col>
        <a-col class="col-3">
          <div class="header-text-2">
            공제 <span style="float: right">{{ $filters.formatCurrency(totalDeduction) }} 원</span>
          </div>
          <a-spin :spinning="loading1 || loading3" size="large">
            <div class="deduction-main">
              <div v-for="item in initFormTab2PA120.deductionItems" :key="item.name" class="custom-deduction">
                <span>
                  <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2" :name="item.name" :type="1"
                    subName="공제" />
                  <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2" :name="item.name" :type="2"
                    subName="공제" />
                  <deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode" :name="item.name" :type="3"
                    :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + item.taxFreeIncludeSubmission" />
                  <deduction-items v-if="item.taxPayItemCode == null && item.taxfreePayItemCode == null" :name="item.name"
                    :type="4" subName="공제" />
                </span>
                <div>
                  <number-box-money width="130px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="item.value"
                    :min="0" @changeInput="onCalcSum" :disabled="disabledDeduction(item.itemCode)" />
                  <span class="pl-5">원</span>
                </div>
              </div>
            </div>
          </a-spin>
        </a-col>
      </a-row>
      <a-row style="margin-top: 20px" justify="center">
        <button-tooltip-error :statusChange="isBtnYellow" :showError="isAddFormErrorPA120" @onClick="calculateTax"
          text="공제계산" />
        <button-basic text="저장" type="default" mode="contained" :width="90" id="btn-save-edit-tab2"
          @onClick="updateDeduction" />
      </a-row>
    </a-spin>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch, computed, watchEffect, onMounted } from 'vue';
import { useMutation, useQuery, useLazyQuery } from '@vue/apollo-composable';
import { radioCheckPersenPension, radioCheckReductioRate, radioCheckReductionInput, IncomeTaxAppRate, initFormStateTab2 } from '../../utils/index';
import { useStore } from 'vuex';
import { companyId, calculateNationalPensionEmployee, calculateHealthInsuranceEmployee, calculateLongTermCareInsurance, calculateEmployeementInsuranceEmployee } from '@/helpers/commonFunction';
import mutations from '@/graphql/mutations/PA/PA1/PA120/index';
import queries from '@/graphql/queries/PA/PA1/PA120/index';
import notification from '@/utils/notification';
import dayjs, { Dayjs } from 'dayjs';
import Datepicker from '@vuepic/vue-datepicker';
import filters from '@/helpers/filters';
import DxButton from 'devextreme-vue/button';
import { Message } from '@/configs/enum';

type RangeValue = [Dayjs | null, Dayjs | null];
export default defineComponent({
  components: { Datepicker, DxButton },
  props: {
    idRowEdit: {
      type: Number,
    },
    isTabchange: {
      type: Boolean,
    },
    modalStatus: Boolean,
  },
  setup(props, { emit }) {
    const employeeId = ref(props.idRowEdit);
    const totalPayItemTaxFree = ref(0);
    const totalPayItemTaxAll = ref(0);
    const totalDeduction = ref(0);
    const subPayment = computed(() => totalPayItemTaxAll.value - totalDeduction.value);

    const rangeDate = ref<RangeValue>([null, null]);
    const store = useStore();
    const dataConfigPayItems = ref<any>([]);
    const dataConfigDeduction = ref<any>([]);
    const triggerDetail = ref<boolean>(false);
    const presidentEditPA120 = computed(() => store.state.common.presidentEditPA120);

    const globalYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'));
    const initFormTab2PA120 = computed(() => store.state.common.initFormTab2PA120);
    const editRowTab2PA120 = computed(() => store.state.common.editRowTab2PA120);
    const employeeWageParam = ref({
      companyId: companyId,
      imputedYear: globalYear.value,
      employeeId: employeeId.value,
    })
    const isDisableInsuranceSupport = computed(() => store.state.common.isDisableInsuranceSupport);
    const messageUpdate = Message.getMessage('COMMON', '106').message;
    let countConfigPayItems = ref(0);
    let countRestFirstRun = ref(-1);
    // fn common
    const convertToDate = (date: number | null) => {
      if (date === null) {
        return dayjs();
      }
      let dateStr = date.toString();
      let dateData = dateStr.slice(0, 4) + '/' + dateStr.slice(4, 6) + '/' + dateStr.slice(6, 8);
      return dayjs(dateData, 'YYYY/MM/DD');
    };

    // get WithouthouldingConfigdeduction
    const configDeductionTrigger = ref(false);
    const configdeductionParam = ref({
      companyId: companyId,
      imputedYear: globalYear.value,
      useOnly: true,
    });
    const {
      result: resConfigDeduction,
      loading: loading2,
      refetch: refetchConfigDeduction,
    } = useQuery(queries.getWithholdingConfigDeductionItems, configdeductionParam, () => ({
      enabled: configDeductionTrigger.value,
      fetchPolicy: 'no-cache',
    }));
    watch(resConfigDeduction, (value) => {
      if (value) {
        dataConfigDeduction.value = value.getWithholdingConfigDeductionItems.filter((item: any) => {
          if (item.itemCode == 1001) {
            return { itemCode: item.itemCode, name: item.name, value: 0 };
          }
          if (item.itemCode == 1002) {
            return { itemCode: item.itemCode, name: item.name, value: 0 };
          }
          if (item.itemCode == 1003) {
            return { itemCode: item.itemCode, name: item.name, value: 0 };
          }
          if (item.itemCode == 1004) {
            return { itemCode: item.itemCode, name: item.name, value: 0 };
          }
          if (item.itemCode == 1011) {
            return { itemCode: item.itemCode, name: item.name, value: 0 };
          }
          if (item.itemCode == 1012) {
            return { itemCode: item.itemCode, name: item.name, value: 0 };
          }
        });
        configDeductionTrigger.value = false;
      }
    });
    const onCalcSum = () => {
      totalPayItemTaxAll.value = initFormTab2PA120.value.payItems.reduce((accumulator: any, object: any) => {
        return accumulator + object.value;
      }, 0);
      calculateVariables.totalTaxPay = initFormTab2PA120.value.payItems.reduce((accumulator: any, object: any) => {
        if (object.tax) {
          accumulator += object.value;
        }
        return accumulator;
      }, 0);
      totalPayItemTaxFree.value = initFormTab2PA120.value.payItems.reduce((accumulator: any, object: any) => {
        if (!object.tax) {
          accumulator += object.value;
        }
        return accumulator;
      }, 0);
      totalDeduction.value = initFormTab2PA120.value.deductionItems.reduce((accumulator: any, object: any) => {
        if (!accumulator) {
          accumulator = 0;
        }
        if (!object.value) {
          object.value = 0;
        }
        return accumulator + object.value;
      }, 0);
    }

    /**
     * get Withholding Config PayItems
     */
    const configPayItemsParam = ref({
      companyId: companyId,
      imputedYear: globalYear.value,
      useOnly: true,
    });
    const configPayItemTrigger = ref(false);
    const {
      refetch: refetchConfigPayItems,
      result: resConfigPayItems,
      loading: loading1,
    } = useQuery(queries.getWithholdingConfigPayItems, configPayItemsParam, () => ({
      enabled: configPayItemTrigger.value,
      fetchPolicy: 'no-cache',
    }));
    watch(resConfigPayItems, async (value) => {
      if (value) {
        dataConfigPayItems.value = value.getWithholdingConfigPayItems.map((item: any) => {
          return {
            itemCode: item.itemCode,
            name: item.name,
            tax: item.tax,
            taxPayItemCode: item.taxPayItemCode,
            taxfreePayItemCode: item.taxfreePayItemCode,
            taxfreePayItemName: item.taxfreePayItemName,
            taxFreeIncludeSubmission: item.taxFreeIncludeSubmission,
            value: 0,
          };
        });
        employeeWageParam.value.employeeId = props.idRowEdit;
        triggerDetail.value = true;
        configPayItemTrigger.value = false;
      }
    });

    /**
     * get Employee Wage
     */
    const {
      result: resultGetEmployeeWage,
      loading: loadingEmployeeWage,
    } = useQuery(
      queries.getEmployeeWage,
      employeeWageParam,
      () => ({
        enabled: triggerDetail.value,
        fetchPolicy: 'no-cache',
      })
    );
    watch(resultGetEmployeeWage, async (value) => {
      if (value) {
        let data = value.getEmployeeWage;
        store.state.common.presidentEditPA120 = data.president;
        let editRowData: any = {};
        editRowData.nationalPensionDeduction = data.nationalPensionDeduction;
        editRowData.healthInsuranceDeduction = data.healthInsuranceDeduction;
        editRowData.longTermCareInsuranceDeduction = data.longTermCareInsuranceDeduction;
        editRowData.employeementInsuranceDeduction = presidentEditPA120.value ? false : data.employeementInsuranceDeduction;
        editRowData.insuranceSupport = data.length == 0 ? isDisableInsuranceSupport.value : data.insuranceSupport;
        if (data?.nationalPensionSupportPercent >= 0 && editRowData.insuranceSupport) {
          editRowData.nationalPensionSupportPercent = data.nationalPensionSupportPercent ?? 0;
        }
        if (data?.employeementInsuranceSupportPercent >= 0 && editRowData.insuranceSupport) {
          editRowData.employeementInsuranceSupportPercent = data.employeementInsuranceSupportPercent ?? 0;
        }
        if (data?.employeementReductionStartDate) {
          editRowData.employeementReductionStartDate = data.employeementReductionStartDate;
        }
        if (data?.employeementReductionFinishDate) {
          editRowData.employeementReductionFinishDate = data.employeementReductionFinishDate;
          let ReductionStartDate = convertToDate(data.employeementReductionStartDate);
          let ReductionFinishDate = convertToDate(data.employeementReductionFinishDate);
          rangeDate.value = [ReductionStartDate, ReductionFinishDate];
        }else {
          rangeDate.value = [null, null];
        }
        if (data?.employeementReductionRatePercent) {
          editRowData.employeementReductionRatePercent = data.employeementReductionRatePercent;
        }
        if (data?.employeementReductionInput) {
          editRowData.employeementReductionInput = data.employeementReductionInput;
        }
        editRowData.payItems = [];
        editRowData.deductionItems = [];
        editRowData.employeementReduction = data.employeementReduction;
        editRowData.incomeTaxMagnification = data.incomeTaxMagnification;
        store.state.common.rowKeyTab2PA120 = data.employeeId;
        store.state.common.initFormTab2PA120 = editRowData;
        store.state.common.editRowTab2PA120 = { ...editRowData };
        if (data.payItems && dataConfigPayItems.value.length > 0) {
          dataConfigPayItems.value.forEach((item1: any, key: number) => {
            const item2Value = data.payItems.find((item2: any) => item2.itemCode == item1.itemCode);
            let value = item2Value?.amount ? item2Value.amount : 0;
            initFormTab2PA120.value.payItems[key] = { ...item1, value };
          })
        }
        if (data.deductionItems && dataConfigDeduction.value.length > 0) {
          dataConfigDeduction.value.forEach((item1: any, key: number) => {
            let item2Value = data.deductionItems.find((item2: any) => item2.itemCode == item1.itemCode);
            let value = item2Value?.amount ? item2Value.amount : 0;
            initFormTab2PA120.value.deductionItems[key] = { ...item1, value };
          });
        }
        calculateVariables.dependentCount = data.dependents.length > 0 ? data.dependents.length : 1;
        calculateVariables.totalTaxPay = initFormTab2PA120.value.payItems.reduce((accumulator: any, object: any) => {
          if (object.tax) {
            accumulator += object.value;
          }
          return accumulator;
        }, 0);
        isBtnYellow.value = false;
        triggerDetail.value = false;
        onCalcSum();
      }
    });

    /**
     * Calculate Income Wage Tax API
     */

    const calculateVariables = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
      totalTaxPay: -1,
      dependentCount: 1,
    })
    const triggerCalcIncomeWageTax = ref(false);
    const {
      result: resCalcIncomeWageTax,
      loading: loading3,
      refetch: refetchCalcIncomeWageTax,
      onError: onIncomeWageTaxError,
      // onDone: onDoneCalcIncomeWageTax,

    } = useQuery(queries.calculateIncomeWageTax, calculateVariables, () => ({
      enabled: triggerCalcIncomeWageTax.value,
      fetchPolicy: 'no-cache',
    }));
    onIncomeWageTaxError((e) => {
      notification('error', e.message);
    });

    watch(resCalcIncomeWageTax, (value) => {
      if (value) {
        let itemValue11 = Math.floor(value.calculateIncomeWageTax * initFormTab2PA120.value.incomeTaxMagnification / 100);
        let itemValue12 = itemValue11 ? Math.floor(+itemValue11 / 100) * 10 : 0;
        initFormTab2PA120.value.deductionItems.map((item: any) => {
          if (item.itemCode == 1011) {
            item.value = itemValue11;
            return {
              itemCode: 1011,
              amount: itemValue11,
            };
          }
          if (item.itemCode == 1012) {
            item.value = itemValue11 ? Math.floor(+itemValue11 / 100) * 10 : 0;
            return {
              itemCode: 1012,
              amount: itemValue12,
            };
          }
        });
      }
      triggerCalcIncomeWageTax.value = false;
      onCalcSum()
      // calcPension();
    });

    /**
     * Calculate Pension Employee
     * */

    const calcPension = () => {
      initFormTab2PA120.value.deductionItems?.map((item: any) => {
        if (item.itemCode == 1001) {
          let total1 = initFormTab2PA120.value.nationalPensionDeduction ? calculateNationalPensionEmployee(calculateVariables.totalTaxPay, initFormTab2PA120.value.nationalPensionSupportPercent) : 0;
          item.value = total1;
          return {
            itemCode: 1001,
            amount: total1,
          };
        }
        if (item.itemCode == 1002) {
          let total2 = initFormTab2PA120.value.healthInsuranceDeduction ? calculateHealthInsuranceEmployee(calculateVariables.totalTaxPay) : 0;
          item.value = total2;
          return {
            itemCode: 1002,
            amount: total2,
          };
        }
        if (item.itemCode == 1003) {
          let total3 = initFormTab2PA120.value.healthInsuranceDeduction ? calculateLongTermCareInsurance(calculateVariables.totalTaxPay) : 0;
          item.value = total3;
          return {
            itemCode: 1003,
            amount: total3,
          };
        }
        if (item.itemCode == 1004) {
          let total4 = initFormTab2PA120.value.employeementInsuranceDeduction == true ? calculateEmployeementInsuranceEmployee(calculateVariables.totalTaxPay, initFormTab2PA120.value.employeementInsuranceSupportPercent) : 0;
          item.value = total4;
          return {
            itemCode: 1004,
            amount: total4,
          };
        }
      });
      store.state.common.isAddFormErrorPA120 = false;
      isBtnYellow.value = false;
      if (!initFormTab2PA120.value?.employeementReductionStartDate) {
        rangeDate.value = [null, null];
      }
    }
    const calculateTax = () => {
      calcPension();
      // countRestFirstRun.value = 1;
      triggerCalcIncomeWageTax.value = true;
      store.state.common.editRowTab2PA120 = { ...initFormTab2PA120.value };
    };
    // custom data with logical
    const onChangeSwitch1 = (e: any) => {
      if (e) {
        if (initFormTab2PA120.value.nationalPensionDeduction) {
          initFormTab2PA120.value.nationalPensionSupportPercent = 0;
        }
        if (initFormTab2PA120.value.employeementInsuranceDeduction) {
          initFormTab2PA120.value.employeementInsuranceSupportPercent = 0;
        }
      } else {
        delete initFormTab2PA120.value.nationalPensionSupportPercent;
        delete initFormTab2PA120.value.employeementInsuranceSupportPercent;
      }
    };
    watch(() => initFormTab2PA120.value.nationalPensionDeduction, (newVal) => {
      if (newVal && initFormTab2PA120.value.insuranceSupport) {
        initFormTab2PA120.value.nationalPensionSupportPercent = 0;
      } else {
        delete initFormTab2PA120.value.nationalPensionSupportPercent;
      }
    }, { deep: true })
    watch(() => initFormTab2PA120.value.employeementInsuranceDeduction, (newVal) => {
      if (newVal && initFormTab2PA120.value.insuranceSupport) {
        initFormTab2PA120.value.employeementInsuranceSupportPercent = 0;
      } else {
        delete initFormTab2PA120.value.employeementInsuranceSupportPercent;
      }
    }, { deep: true })
    const onChangeSwitch2 = (e: any) => {
      if (e) {
        initFormTab2PA120.value.employeementReductionRatePercent = 50;
        initFormTab2PA120.value.employeementReductionInput = 1;
        rangeDate.value = [dayjs(), dayjs()];
        initFormTab2PA120.value.employeementReductionStartDate = filters.formatDateToInterger(rangeDate.value[0]);
        initFormTab2PA120.value.employeementReductionFinishDate = filters.formatDateToInterger(rangeDate.value[1]);
      } else {
        delete initFormTab2PA120.value.employeementReductionRatePercent;
        delete initFormTab2PA120.value.employeementReductionInput;
        delete initFormTab2PA120.value.employeementReductionStartDate;
        delete initFormTab2PA120.value.employeementReductionFinishDate;
        rangeDate.value = [null, null];
      }
    };

    // watch president to disable employeementInsuranceDeduction

    watch(
      () => presidentEditPA120.value,
      (newValue) => {
        if (newValue) {
          initFormTab2PA120.value.employeementInsuranceDeduction = false;
        }
      },
      { deep: true }
    );
    //  // watch initFormTab2PA120 to check calculate button
    const isAddFormErrorPA120 = computed(() => store.state.common.isAddFormErrorPA120);
    watch(
      () => initFormTab2PA120.value.payItems,
      (newVal) => {
        if (countConfigPayItems.value < 1) {
          countConfigPayItems.value++;
          return;
        } else {
          store.state.common.isCalculateEditPA120 = false;
          isBtnYellow.value = true;
        }
      },
      { deep: true }
    );
    const isCalculateEditPA120 = computed(() => store.state.common.isCalculateEditPA120);
    const isBtnYellow = ref(false);
    const compareForm = () => {
      const { deductionItems, payItems, ...rest } = initFormTab2PA120.value;
      const { deductionItems: de2, payItems: pa2, ...rest2 } = editRowTab2PA120.value;
      return JSON.stringify(rest) == JSON.stringify(rest2);
    }
    watchEffect(() => {
      const { deductionItems, payItems, ...rest } = initFormTab2PA120.value;
      if (countRestFirstRun.value < 1) {
        countRestFirstRun.value++;
        return;
      }
      if (initFormTab2PA120.value) {
        if (!compareForm()) {
          store.state.common.isCalculateEditPA120 = false;
          isBtnYellow.value = true;
        } else {
          isBtnYellow.value = false;
          store.state.common.isCalculateEditPA120 = true;
        }
      }
    }
    );
    /**
     *  Save form
     */
    const { mutate, onError, onDone } = useMutation(mutations.saveEmployeeWagePayDeductionReduction);
    const updateDeduction = () => {
      if (isBtnYellow.value) {
        store.state.common.isAddFormErrorPA120 = true;
        store.commit('common/actionFormErrorPA120');
        return;
      }
      let formFake = { ...initFormTab2PA120.value };
      let payLoadData = formFake;
      payLoadData.payItems = formFake.payItems.map((item: any) => {
        return {
          itemCode: item.itemCode,
          amount: item.value,
        };
      });
      payLoadData.deductionItems = formFake.deductionItems.map((item: any) => {
        return {
          itemCode: item.itemCode,
          amount: item.value,
        };
      });

      const variables = {
        companyId: companyId,
        imputedYear: globalYear.value,
        employeeId: employeeId.value,
        input: {
          ...payLoadData,
        },
      };
      mutate(variables);
    };
    onError((e) => {
      notification('error', e.message);
      store.state.common.isCalculateEditPA120 = false;
      store.commit('common/actionFormErrorPA120');
    });
    onDone((res) => {
      emit('closePopup', false);
      notification('success', messageUpdate);
      store.commit('common/actionFormDonePA120');
      store.state.common.isCalculateEditPA120 = true;
      store.state.common.isAddFormErrorPA120 = false;
    });
    // change row data  globalYear.value
    watch(() => props.idRowEdit, async () => {
      configDeductionTrigger.value = true;
      await refetchConfigDeduction();
      configPayItemTrigger.value = true;
      await refetchConfigPayItems();
      store.state.common.isCalculateEditPA120 = true;
    }, { immediate: true })
    watch(() => props.idRowEdit, async () => {
      countRestFirstRun.value = -1;
      countConfigPayItems.value = 0;
    }, { deep: true })

    //--------------------------------disabledDeduction---------------------------------------

    const disabledDeduction = (e: any) => {
      if (!initFormTab2PA120.value.nationalPensionDeduction && e == 1001) {
        initFormTab2PA120.value.deductionItems[0].value = 0;
        return true;
      }
      if (!initFormTab2PA120.value.healthInsuranceDeduction && (e == 1002 || e == 1003)) {
        initFormTab2PA120.value.deductionItems[1].value = 0;
        initFormTab2PA120.value.deductionItems[2].value = 0;

        return true;
      }
      if (!initFormTab2PA120.value.employeementInsuranceDeduction && e == 1004) {
        initFormTab2PA120.value.deductionItems[3].value = 0;
        return true;
      }
      return false;
    }
    return {
      loading1,
      loading2,
      loadingEmployeeWage,
      rangeDate,
      totalPayItemTaxFree,
      totalPayItemTaxAll,
      totalDeduction,
      subPayment,
      calculateTax,
      loading3,
      updateDeduction,
      radioCheckPersenPension,
      radioCheckReductioRate,
      radioCheckReductionInput,
      IncomeTaxAppRate,
      companyId,
      dataConfigPayItems,
      dataConfigDeduction,
      onChangeSwitch1,
      onChangeSwitch2,
      editRowTab2PA120,
      initFormTab2PA120,
      isChangeConfigPayItemsPA120: computed(() => store.state.common.isChangeConfigPayItemsPA120),
      isCalculateEditPA120,
      presidentEditPA120,
      calculateVariables,
      isAddFormErrorPA120,
      isBtnYellow,
      triggerDetail,
      isDisableInsuranceSupport,
      countRestFirstRun,
      compareForm,
      onCalcSum,
      disabledDeduction,
    };
  },
});
</script>
<style lang="scss" scoped >
@import '../../style/style.scss';
</style>
