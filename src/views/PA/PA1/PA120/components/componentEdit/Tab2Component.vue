<template>
  <div id="tab2-pa120">
    <div class="header-text-1">공제 / 감면 / 소득세 적용율</div>
    <a-spin :spinning="loadingEmployeeWage" size="large">
      <a-row :gutter="16" class="mb-7">
        <a-col span="24" style="display: flex; flex-wrap: wrap">
          <a-form-item label="4대보험 공제 여부" label-align="right" class="ins-dedu input-text empl-ins">
            <span class="check-box-tab1">
              <checkbox-basic label="국민연금" v-model:valueCheckbox="initFormTab2PA120.nationalPensionDeduction"></checkbox-basic>
            </span>
            <span class="check-box-tab1">
              <checkbox-basic label="건강보험" class="check-box-tab1" v-model:valueCheckbox="initFormTab2PA120.healthInsuranceDeduction"></checkbox-basic>
            </span>
            <span class="check-box-tab1 mb-4 ml-15">
              <checkbox-basic
                class=""
                size="18px"
                label="고용보험"
                v-model:valueCheckbox="initFormTab2PA120.employeementInsuranceDeduction"
                :disabled="presidentEditPA120"
              ></checkbox-basic>
            </span>

            <p class="text-note mt-7 ml-7">
              <img class="mr-3" src="@/assets/images/iconInfo.png" style="width: 14px" />
              본 항목은 공제 계산을 위한 설정으로 실제 4대보험 신고 여부와는 무관합니다.
            </p>
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <div class="header-text-4 d-flex" style="justify-content: space-around">
            <a-col :span="12"> 두루누리사회보험 공제 </a-col>
            <a-col :span="12" class="switch-bg">
              공제 여부:
              <switch-basic
                switch-basic
                textCheck="Y"
                textUnCheck="N"
                class="switch-insurance"
                v-model:valueSwitch="initFormTab2PA120.insuranceSupport"
                @onChange="onChangeSwitch1"
              ></switch-basic>
            </a-col>
          </div>
          <a-row :gutter="[0, 10]">
            <a-col span="7"> 국민연금 적용율: </a-col>
            <a-col span="12">
              <radio-group
                :arrayValue="radioCheckPersenPension"
                v-model:valueRadioCheck="initFormTab2PA120.nationalPensionSupportPercent"
                layoutCustom="horizontal"
                :disabled="!initFormTab2PA120.insuranceSupport"
              ></radio-group>
            </a-col>
            <a-col span="7"> 고용보험 적용율: </a-col>
            <a-col span="12">
              <radio-group
                :arrayValue="radioCheckPersenPension"
                v-model:valueRadioCheck="initFormTab2PA120.employeementInsuranceSupportPercent"
                layoutCustom="horizontal"
                :disabled="!initFormTab2PA120.insuranceSupport"
              ></radio-group>
            </a-col>
            <a-col span="7"><span class="header-text-4"> 소득세 적용율: </span></a-col>
            <a-col span="17" class="income-tax-app-rate">
              <radio-group
                :arrayValue="IncomeTaxAppRate"
                v-model:valueRadioCheck="initFormTab2PA120.incomeTaxMagnification"
                layoutCustom="horizontal"
              ></radio-group>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="13">
          <div class="header-text-4 d-flex" style="justify-content: space-around">
            <a-col :span="13"> 중소기업취업 감면 </a-col>
            <a-col :span="10" class="switch-bg">
              감면 여부:
              <switch-basic
                switch-basic
                textCheck="Y"
                textUnCheck="N"
                class="switch-insurance"
                v-model:valueSwitch="initFormTab2PA120.employeementReduction"
                @onChange="onChangeSwitch2"
              ></switch-basic>
            </a-col>
          </div>
          <a-row :gutter="[5, 10]">
            <a-col :span="24">
              <img src="@/assets/images/iconInfo.png" style="width: 14px" class="mr-5" />
              <span class="text-note"
                >15세~34세 이하 청년, 60세 이상인 사람, 장애인, 경력단절여성이 중소기업에 취업하는 경우 취업일로 부터 3년간(청년 5년간) 근로소득세 70%(청년 90%,
                150만원 한도) 감면</span
              >
            </a-col>
            <a-col span="7"> 감면기간: </a-col>
            <a-col span="15">
              <date-time-box width="250px" :range="true" :multi-calendars="true" v-model:valueDate="rangeDate" :disabled="!initFormTab2PA120.employeementReduction">
              </date-time-box>
            </a-col>
            <a-col span="7"> 감면율: </a-col>
            <a-col span="15">
              <radio-group
                :arrayValue="radioCheckReductioRate"
                v-model:valueRadioCheck="initFormTab2PA120.employeementReductionRatePercent"
                layoutCustom="horizontal"
                :disabled="!initFormTab2PA120.employeementReduction"
              ></radio-group>
            </a-col>
            <a-col span="7"> 감면입력: </a-col>
            <a-col span="15">
              <radio-group
                :arrayValue="radioCheckReductionInput"
                v-model:valueRadioCheck="initFormTab2PA120.employeementReductionInput"
                layoutCustom="horizontal"
                :disabled="!initFormTab2PA120.employeementReduction"
              ></radio-group>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <div class="header-text-3">
        급여 (기본값)
        <span>
          <img src="@/assets/images/iconInfo.png" style="width: 14px" />
          <p>급여소득자료 입력시 본 급여 기본값을 불러옵니다</p>
        </span>
      </div>
      <a-row :gutter="16">
        <a-col style="flex: 0 0 28%">
          <div class="header-text-2">요약</div>
          <div class="summary">
            <a-col :span="13">소득수당 합계:</a-col>
            <a-col style="display: inline-flex; justify-content: flex-end"
              ><span>{{ $filters.formatCurrency(totalPayItem) }}</span> 원</a-col
            >
            <a-col :span="13">수당 과세 합계:</a-col>
            <a-col style="display: inline-flex; justify-content: flex-end"
              ><span>{{ $filters.formatCurrency(totalPayItemTax) }}</span> 원</a-col
            >
            <a-col :span="13">수당 비과세 합계:</a-col>
            <a-col style="display: inline-flex; justify-content: flex-end"
              ><span>{{ $filters.formatCurrency(totalPayItemTaxFree) }}</span> 원</a-col
            >
            <a-col :span="13">공제 합계:</a-col>
            <a-col style="display: inline-flex; justify-content: flex-end"
              ><span>{{ $filters.formatCurrency(totalDeduction) }}</span> 원</a-col
            >
            <a-col :span="13">차인지급액:</a-col>
            <a-col style="display: inline-flex; justify-content: flex-end"
              ><span>{{ $filters.formatCurrency(subPayment) }}</span> 원</a-col
            >
            <div class="text5">
              <span>
                <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px" />
                <p>차인지급액 = 수당 합계 - 공제 합계</p>
              </span>
            </div>
          </div>
        </a-col>
        <a-col class="col-2" style="display: flex; flex-direction: column">
          <div class="header-text-2">수당 항목 {{ $filters.formatCurrency(totalPayItem) }} 원 = 과세 + 비과세</div>
          <a-spin :spinning="loading1" size="large" style="height: 100%">
            <div class="deduction-main">
              <div v-for="item in dataConfigPayItems" :key="item.name" class="custom-deduction">
                <span>
                  <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2" :name="item.name" :type="1" subName="과세" />
                  <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2" :name="item.name" :type="2" subName="상여(과세)" />
                  <deduction-items
                    v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
                    :name="item.name"
                    :type="3"
                    :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + (item.taxFreeIncludeSubmission ? 'O' : 'X')"
                  />
                  <deduction-items v-if="item.taxPayItemCode == null && item.taxfreePayItemCode == null" :name="item.name" :type="4" subName="과세" />
                </span>
                <div>
                  <number-box-money width="130px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="item.value" :min="0"> </number-box-money>
                  <span class="pl-5">원</span>
                </div>
              </div>
            </div>
          </a-spin>
        </a-col>
        <a-col class="col-3">
          <div class="header-text-2">
            공제 항목 <span style="float: right">{{ $filters.formatCurrency(totalDeduction) }} 원</span>
          </div>
          <a-spin :spinning="loading1 || loading3" size="large">
            <div class="deduction-main">
              <div v-for="item in dataConfigDeduction" :key="item.name" class="custom-deduction">
                <span>
                  <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2" :name="item.name" :type="1" subName="공제" />
                  <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2" :name="item.name" :type="2" subName="공제" />
                  <deduction-items
                    v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
                    :name="item.name"
                    :type="3"
                    :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + item.taxFreeIncludeSubmission"
                  />
                  <deduction-items v-if="item.taxPayItemCode == null && item.taxfreePayItemCode == null" :name="item.name" :type="4" subName="공제" />
                </span>
                <div>
                  <number-box-money width="130px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="item.value" :disabled="true" :min="0">
                  </number-box-money>
                  <span class="pl-5">원</span>
                </div>
              </div>
            </div>
          </a-spin>
        </a-col>
      </a-row>
      <a-row style="margin-top: 20px">
        <a-col :span="8" :offset="8" style="text-align: center">
          <button-basic style="margin-right: 20px" text="공제계산" type="default" mode="contained" :width="120" @onClick="calculateTax" />
          <button-basic text="저장" type="default" mode="contained" :width="90" id="btn-save-edit-tab2" @onClick="updateDeduction" />
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch, computed } from 'vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { radioCheckPersenPension, radioCheckReductioRate, radioCheckReductionInput, IncomeTaxAppRate, initFormStateTab2 } from '../../utils/index';
import { useStore } from 'vuex';
import {
  companyId,
  calculateNationalPensionEmployee,
  calculateHealthInsuranceEmployee,
  calculateLongTermCareInsurance,
  calculateEmployeementInsuranceEmployee,
} from '@/helpers/commonFunction';
import mutations from '@/graphql/mutations/PA/PA1/PA120/index';
import queries from '@/graphql/queries/PA/PA1/PA120/index';
import notification from '@/utils/notification';
import dayjs, { Dayjs } from 'dayjs';
import Datepicker from '@vuepic/vue-datepicker';
import filters from '@/helpers/filters';
import { isCallExpression } from '@babel/types';

type RangeValue = [Dayjs, Dayjs];
export default defineComponent({
  components: { Datepicker },
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
    watch(
      () => props.idRowEdit,
      (newValue) => {
        employeeId.value = newValue;
      }
    );
    const totalPayItemTaxFree = ref(0);
    const totalPayItemTax = ref(0);
    const totalPayItem = ref(0);
    const dependentCount = ref(1);
    const totalDeduction = ref(0);
    const subPayment = computed(() => totalPayItem.value - totalDeduction.value);

    const rangeDate = ref<RangeValue>();
    const store = useStore();
    const dataConfigPayItems = ref();
    const dataConfigDeduction = ref();
    const triggerDetail = ref<boolean>(false);
    const presidentEditPA120 = computed(()=>store.state.common.presidentEditPA120);

    const globalYear = computed(() => store.state.settings.globalYear);
    // const initFormTab2PA120 = reactive<any>({
    //   ...initFormStateTab2,
    // });
    const triggerCalcIncome = ref<boolean>(false);
    const calculateVariables = {
      companyId: companyId,
      imputedYear: globalYear.value,
      totalTaxPay: totalPayItem.value,
      dependentCount: dependentCount.value,
    };
    // get Withholding Config PayItems
    const originDataDetail = ref({
      companyId: companyId,
      imputedYear: globalYear.value,
      useOnly: true,
    });
    const initFormTab2PA120 = computed(() => store.state.common.initFormTab2PA120)
    const editRowTab2PA120 = computed(() => store.state.common.editRowTab2PA120);
    watch(
      () => props.idRowEdit,
      () => {
        refetchConfigPayItems();
        refetchConfigDeduction();
      }
    );

    /**
     * Calculate Income Wage Tax API
     */
    const {
      result: resCalcIncomeWageTax,
      loading: loading3,
      refetch: refetchCalcIncomeWageTax,
      onError: onIncomeWageTaxError,
    } = useQuery(queries.calculateIncomeWageTax, calculateVariables, () => ({
      //   enabled: false,
      fetchPolicy: 'no-cache',
    }));
    onIncomeWageTaxError((e) => {
      notification('error', e.message);
    });

    watch(resCalcIncomeWageTax, (value) => {
      if (value) {
        let itemValue11: Number;
        dataConfigDeduction.value?.forEach((item: any) => {
          if (item.itemCode == 1011) {
            item.value = value.calculateIncomeWageTax;
            itemValue11 = value.calculateIncomeWageTax;
            initFormTab2PA120.value.deductionItems[4] = {
              itemCode: 1011,
              amount: value.calculateIncomeWageTax,
            };
          }
          if (item.itemCode == 1012) {
            item.value = itemValue11 ? Math.floor(+itemValue11 / 10) * 10 : 0;
            initFormTab2PA120.value.deductionItems[4] = {
              itemCode: 1012,
              amount: value.calculateIncomeWageTax,
            };
          }
        });
      }
    });

    /**
     * get Employee Wage
     */

    const {
      refetch: refetchValueDetail,
      result: resultGetEmployeeWage,
      loading: loadingEmployeeWage,
    } = useQuery(
      queries.getEmployeeWage,
      {
        companyId: companyId,
        imputedYear: globalYear.value,
        employeeId: employeeId.value,
      },
      () => ({
        fetchPolicy: 'no-cache',
        enabled: triggerDetail.value,
      })
    );
    const convertToDate = (date: number | null) => {
      if (date === null) {
        return dayjs();
      }
      let dateStr = date.toString();
      let dateData = dateStr.slice(0, 4) + '/' + dateStr.slice(4, 6) + '/' + dateStr.slice(6, 8);
      return dayjs(dateData, 'YYYY/MM/DD');
    };
    watch(resultGetEmployeeWage, (value) => {
      if (value) {
        let data = value.getEmployeeWage;
        store.state.common.presidentEditPA120 = data.president;
        let editRowData: any = {};
        editRowData.nationalPensionDeduction = data.nationalPensionDeduction;
        editRowData.healthInsuranceDeduction = data.healthInsuranceDeduction;
        editRowData.longTermCareInsuranceDeduction = data.longTermCareInsuranceDeduction;
        editRowData.employeementInsuranceDeduction = presidentEditPA120.value?false:data.employeementInsuranceDeduction;
        editRowData.insuranceSupport = data.insuranceSupport;
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
        }
        if (data?.employeementReductionRatePercent) {
          editRowData.employeementReductionRatePercent = data.employeementReductionRatePercent;
        }
        if (data?.employeementReductionInput) {
          editRowData.employeementReductionInput = data.employeementReductionInput;
        }
        editRowData.employeementReduction = data.employeementReduction;
        editRowData.incomeTaxMagnification = data.incomeTaxMagnification;
        store.commit('common/editRowTab2PA120', editRowData);
        store.commit('common/initFormTab2PA120', editRowData);
        if (data.payItems) {
          data.payItems.map((item: any) => {
            dataConfigPayItems.value.find((Obj: any) => {
              if (item.itemCode == Obj.itemCode) {
                Obj.value = item.amount;
              }
            });
          });
        }
        if (data.deductionItems) {
          data.deductionItems.map((item: any) => {
            dataConfigDeduction.value.find((Obj: any) => {
              if (item.itemCode == Obj.itemCode) {
                Obj.value = item.amount;
              }
            });
          });
        }
        dependentCount.value = data.dependents.length > 0 ? data.dependents.length : 1;
        // setTimeOut(()=> calculateTax(), 100);
        setTimeout(() => calculateTax(), 200);
        setTimeout(() => calculateTax(), 500);
      }
    });

    /**
     * get Withholding Config PayItems
     */
    const {
      refetch: refetchConfigPayItems,
      result: resConfigPayItems,
      loading: loading1,
    } = useQuery(queries.getWithholdingConfigPayItems, originDataDetail, () => ({
      fetchPolicy: 'no-cache',
    }));
    watch(resConfigPayItems, (value) => {
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
        triggerDetail.value = true;
        refetchValueDetail({
          companyId: companyId,
          imputedYear: globalYear.value,
          employeeId: employeeId.value,
        });
      }
    });

    // get WithouthouldingConfigdeduction

    const {
      result: resConfigDeduction,
      loading: loading2,
      refetch: refetchConfigDeduction,
    } = useQuery(queries.getWithholdingConfigDeductionItems, originDataDetail, () => ({
      fetchPolicy: 'no-cache',
    }));
    watch(resConfigDeduction, (value) => {
      if (value) {
        dataConfigDeduction.value = value.getWithholdingConfigDeductionItems.filter((item: any) => {
          if (item.itemCode == 1001) {
            return { itemCode: item.itemCode, name: item.name, value: item.value };
          }
          if (item.itemCode == 1002) {
            return { itemCode: item.itemCode, name: item.name, value: item.value };
          }
          if (item.itemCode == 1003) {
            return { itemCode: item.itemCode, name: item.name, value: item.value };
          }
          if (item.itemCode == 1004) {
            return { itemCode: item.itemCode, name: item.name, value: item.value };
          }
          if (item.itemCode == 1011) {
            return { itemCode: item.itemCode, name: item.name, value: item.value };
          }
          if (item.itemCode == 1012) {
            return { itemCode: item.itemCode, name: item.name, value: item.value };
          }
        });
      }
    });

    /**
     * Calculate Income Wage Tax if totalPayItem != 0
     */
    watch(totalPayItem, (newValue) => {
      if (newValue != 0) {
        triggerCalcIncome.value = true;
        refetchCalcIncomeWageTax({
          companyId: companyId,
          imputedYear: globalYear.value,
          totalTaxPay: newValue,
          dependentCount: dependentCount.value,
        });
      }
    });

    /**
     *  Save form
     */
    const { mutate, onError, onDone } = useMutation(mutations.saveEmployeeWagePayDeductionReduction);

    onError((e) => {
      notification('error', e.message);
    });

    onDone((res) => {
      emit('closePopup', false);
      notification('success', '업데이트 완료!');
      store.commit('common/actionFormDonePA120');
      store.commit('common/keyActivePA120', 3);
    });

    const updateDeduction = () => {
      if (rangeDate.value) {
        initFormTab2PA120.value.employeementReductionStartDate = filters.formatDateToInterger(rangeDate.value[0]);
        initFormTab2PA120.value.employeementReductionFinishDate = filters.formatDateToInterger(rangeDate.value[1]);
      }
      const variables = {
        companyId: companyId,
        imputedYear: globalYear.value,
        employeeId: employeeId.value,
        input: {
          ...initFormTab2PA120.value,
        },
      };
      mutate(variables);
    };

    const onChangeSwitch1 = (e: any) => {
      if (e) {
        initFormTab2PA120.value.nationalPensionSupportPercent = 0;
        initFormTab2PA120.value.employeementInsuranceSupportPercent = 0;
      } else {
        delete initFormTab2PA120.value.nationalPensionSupportPercent;
        delete initFormTab2PA120.value.employeementInsuranceSupportPercent;
      }
    };
    const onChangeSwitch2 = (e: any) => {
      if (e) {
        initFormTab2PA120.value.employeementReductionRatePercent = 50;
        initFormTab2PA120.value.employeementReductionInput = 1;
        rangeDate.value = [dayjs(), dayjs()];
      } else {
        delete initFormTab2PA120.value.employeementReductionRatePercent;
        delete initFormTab2PA120.value.employeementReductionInput;
        delete initFormTab2PA120.value.employeementReductionStartDate;
        delete initFormTab2PA120.value.employeementReductionFinishDate;
        rangeDate.value = undefined;
      }
    };

    /**
     * Calculate Pension Employee
     * */
    const calculateTax = () => {
      dataConfigDeduction.value?.map((item: any) => {
        if (item.itemCode == 1001) {
          let total1 = initFormTab2PA120.value.nationalPensionDeduction
            ? calculateNationalPensionEmployee(totalPayItem.value, initFormTab2PA120.value.nationalPensionSupportPercent)
            : 0;
          item.value = total1;
          initFormTab2PA120.value.deductionItems[0] = {
            itemCode: 1001,
            amount: total1,
          };
        }
        if (item.itemCode == 1002) {
          let total2 = calculateHealthInsuranceEmployee(totalPayItem.value);
          item.value = total2;
          initFormTab2PA120.value.deductionItems[1] = {
            itemCode: 1002,
            amount: total2,
          };
        }
        if (item.itemCode == 1003) {
          let total3 = calculateLongTermCareInsurance(totalPayItem.value);
          item.value = total3;
          initFormTab2PA120.value.deductionItems[2] = {
            itemCode: 1003,
            amount: total3,
          };
        }
        if (item.itemCode == 1004) {
          let total4 =
            initFormTab2PA120.value.insuranceSupport == true
              ? calculateEmployeementInsuranceEmployee(totalPayItem.value, initFormTab2PA120.value.employeementInsuranceSupportPercent)
              : 0;
          item.value = total4;
          initFormTab2PA120.value.deductionItems[3] = {
            itemCode: 1004,
            amount: total4,
          };
        }
      });
      initFormTab2PA120.value.payItems = dataConfigPayItems.value?.map((item: any) => {
        return {
          itemCode: item.itemCode,
          amount: item.value,
        };
      });
      totalPayItem.value = dataConfigPayItems.value.reduce((accumulator: any, object: any) => {
        return accumulator + object.value;
      }, 0);
      totalPayItemTax.value = dataConfigPayItems.value.reduce((accumulator: any, object: any) => {
        if (object.tax) {
          accumulator += object.value;
        }
        return accumulator;
      }, 0);
      totalPayItemTaxFree.value = dataConfigPayItems.value.reduce((accumulator: any, object: any) => {
        if (!object.tax) {
          accumulator += object.value;
        }
        return accumulator;
      }, 0);
      totalDeduction.value = dataConfigDeduction.value.reduce((accumulator: any, object: any) => {
        if (!accumulator) {
          accumulator = 0;
        }
        if (!object.value) {
          object.value = 0;
        }
        return accumulator + object.value;
      }, 0);
      refetchCalcIncomeWageTax();
      store.state.common.isChangeConfigPayItemsPA120 = false;
      console.log(`output-`)
      store.state.common.isCalculateEditPA120 = true;
    };
    

    // watch dataConfigPayItems to check change row
     watch(()=>dataConfigPayItems, (newVal)=> {
      if(newVal) {
        store.state.common.isChangeConfigPayItemsPA120 = true;
      }
     },{deep: true})
     // watch initFormTab2PA120 to check calculate button
     const isCalculateEditPA120 = computed(()=> store.state.common.isCalculateEditPA120);
     const formState = reactive({...initFormTab2PA120.value});
     const objectB = ref(Object.assign({}, initFormTab2PA120.value));
    //  const formState = reactive({...initFormTab2PA120.value});
    //  delete(formState.deductionItems)
    //  watch(formState,(newVal: any)=> {
    //   if(newVal) {
    //     console.log(`output-`,newVal)
    //     store.state.common.isCalculateEditPA120 = false;
    //   }
    //  },{deep: true})
    // watch(formState, (newValue, oldValue) => {
    //   console.log('object B thay đổi', newValue);
    // });
    watch(
      () => initFormTab2PA120.value.payItems,
      (newVal) => {
        // Clone object A
        console.log(`output->newVal pay items`,newVal)
        // console.log(`output->objectB`,objectB)
        // console.log('object B thay đổi', newVal);
      },
      { deep: true }
    );
    watch(objectB, (newVal, oldVal) => {
      store.state.common.isCalculateEditPA120 = false;
      console.log(`output->newVal`,JSON.stringify(newVal) == JSON.stringify(oldVal) )
      console.log(`output->newVal`,JSON.stringify(newVal), JSON.stringify(oldVal))
    })
    return {
      loading1,
      loading2,
      loadingEmployeeWage,
      rangeDate,
      totalPayItem,
      totalPayItemTaxFree,
      totalPayItemTax,
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
      dependentCount,
      editRowTab2PA120,
      initFormTab2PA120,
      isChangeConfigPayItemsPA120: computed(()=>store.state.common.isChangeConfigPayItemsPA120),
      isCalculateEditPA120,
      formState,
      presidentEditPA120,
    };
  },
});
</script>
<style lang="scss" scoped >
#tab2-pa120 {
  ::v-deep .ant-form-item-label > label {
    width: 130px;
    padding-left: 10px;
  }

  .input-text {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }
  }

  .header-text-1 {
    background-color: #558ed5;
    padding: 5px;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .header-text-2 {
    background-color: #c6d9f1;
    padding: 5px;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
    flex-wrap: nowrap;
  }

  .header-text-4 {
    background-color: #c6d9f1;
    padding: 5px;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .switch-bg {
    background-color: white;
  }

  .header-text-3 {
    background-color: #558ed5;
    padding: 5px;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;

    span {
      display: flex;
      align-items: center;
      font-size: 13px;
      color: white;
      float: right;

      p {
        margin: 5px 0px 3px 10px;
      }
    }
  }

  .ins-dedu {
    display: flex;

    .check-box-tab1 {
      display: inline;
      margin-left: 10px;
    }
  }

  .durunuri-insurance {
    ::v-deep .ant-form-item-label > label {
      width: 200px;
      padding-left: 10px;
    }
  }

  .switch-insurance {
    width: 100px;
    float: right;
  }

  .empl-ins {
    span {
      display: flex;
      align-items: center;

      p {
        font-size: 11px;
        margin-left: 5px;
        margin-bottom: 0px;
      }
    }
  }

  .pension {
    ::v-deep .dx-radiobutton {
      margin: 0px 0px 0px 76px;
    }
  }

  .income-tax-app-rate {
    ::v-deep .dx-radiobutton {
      margin-right: 12%;
    }
  }

  :deep .ant-spin-nested-loading {
    flex: 1 1 100%;

    .ant-spin-container {
      height: 100%;
    }
  }

  .deduction-main {
    // max-height: 209px;
    // overflow: scroll;
    border: 1px solid #ddd;
    padding-left: 5px;
    padding-top: 5px;
    height: 100%;
  }

  .custom-deduction {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 97%;

    > span {
      margin-right: 10px;
      min-width: 100px;
    }

    > div {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
    }
  }

  .salary-item {
    .sal-item {
      display: flex;
      align-items: center;

      p {
        margin: 0px;
      }
    }

    ::v-deep .ant-form-item-label > label {
      width: 100px;
      padding-left: 10px;
    }
  }

  .summary {
    display: flex;
    flex-wrap: wrap;
    row-gap: 4px;
    justify-content: space-between;
    :deep .ant-col {
      padding: 0 !important;
    }

    div {
      margin-bottom: 5px;

      span {
        font-weight: bold;
      }
    }

    .text5 {
      span {
        display: flex;

        p {
          margin-left: 3px;
          font-size: 12px;
        }
      }
    }
  }

  .text-note {
    font-size: 11px;
    display: inline;
    &p {
      margin-bottom: 0;
      margin-top: 7px;
    }

    // margin-left: 5px;
    // margin-bottom: 0px;
  }
  :deep .col-2 {
    flex: 1 1 30%;
    .dx-numberbox {
      width: 111px !important;
    }
    .deducation-name {
      width: 50px !important;
    }
  }
  :deep .col-3 {
    flex: 1 1 35%;
  }
}
</style>
