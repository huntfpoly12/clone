<template>
  <div id="tab2-pa120">
    <div class="header-text-1">공제 / 감면 / 소득세 적용율</div>
    <a-spin :spinning="loading" size="large">
      <a-row :gutter="16">
        <a-col span="24" style="display: flex">
          <a-form-item label="4대보험 공제 여부" label-align="right" class="ins-dedu">
            <checkbox-basic size="18px" label="국민연금" class="check-box-tab1" v-model:valueCheckbox="formStateTab2.nationalPensionDeduction"></checkbox-basic>
            <checkbox-basic size="18px" label="건강보험" class="check-box-tab1" v-model:valueCheckbox="formStateTab2.healthInsuranceDeduction"></checkbox-basic>
          </a-form-item>
          <div class="input-text empl-ins">
            <checkbox-basic size="18px" label="고용보험" v-model:valueCheckbox="formStateTab2.employeementInsuranceDeduction"></checkbox-basic>
            <span>
              <img src="@/assets/images/iconInfo.png" style="width: 14px" />
              <p>본 항목은 공제 계산을 위한 설정으로 실제 4대보험 신고 여부와는 무관합니다.</p>
            </span>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="header-text-2">두루누리사회보험 공제</div>
          <a-row :gutter="[0, 10]">
            <a-col span="10"> 두루누리사회보험 공제 여부: </a-col>
            <a-col span="12">
              <switch-basic
                switch-basic
                textCheck="Y"
                textUnCheck="N"
                class="switch-insurance"
                v-model:valueSwitch="formStateTab2.longTermCareInsuranceDeduction"
                @onChange="onChangeSwitch1"
              ></switch-basic>
            </a-col>
            <a-col span="10"> 국민연금 적용율: </a-col>
            <a-col span="12">
              <radio-group
                :arrayValue="radioCheckPersenPension"
                v-model:valueRadioCheck="formStateTab2.nationalPensionSupportPercent"
                layoutCustom="horizontal"
                :disabled="!formStateTab2.longTermCareInsuranceDeduction"
              ></radio-group>
            </a-col>
            <a-col span="10"> 고용보험 적용율: </a-col>
            <a-col span="12">
              <radio-group
                :arrayValue="radioCheckPersenPension"
                v-model:valueRadioCheck="formStateTab2.employeementInsuranceSupportPercent"
                layoutCustom="horizontal"
                :disabled="!formStateTab2.longTermCareInsuranceDeduction"
              ></radio-group>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="12">
          <div class="header-text-2">중소기업취업 감면</div>
          <a-row :gutter="[0, 10]">
            <a-col span="10"> 중소기업취업 감면 여부: </a-col>
            <a-col span="12">
              <switch-basic switch-basic textCheck="Y" textUnCheck="N" class="switch-insurance" v-model:valueSwitch="formStateTab2.employeementReduction" @onChange="onChangeSwitch2"></switch-basic>
            </a-col>
            <a-col span="10"> 감면기간: </a-col>
            <a-col span="12">
              <a-range-picker v-model:value="rangeDate" :placeholder="['Start', 'End']" :disabled="!formStateTab2.employeementReduction" />
            </a-col>
            <a-col span="10"> 감면율: </a-col>
            <a-col span="12">
              <radio-group
                :arrayValue="radioCheckReductioRate"
                v-model:valueRadioCheck="formStateTab2.employeementReductionRatePercent"
                layoutCustom="horizontal"
                :disabled="!formStateTab2.employeementReduction"
              ></radio-group>
            </a-col>
            <a-col span="10"> 감면입력: </a-col>
            <a-col span="12">
              <radio-group
                :arrayValue="radioCheckReductionInput"
                v-model:valueRadioCheck="formStateTab2.employeementReductionInput"
                layoutCustom="horizontal"
                :disabled="!formStateTab2.employeementReduction"
              ></radio-group>
            </a-col>
          </a-row>
        </a-col>
        <a-col span="24">
          <a-row>
            <a-col span="5"> 소득세 적용율: </a-col>
            <a-col span="19" class="income-tax-app-rate">
              <radio-group :arrayValue="IncomeTaxAppRate" v-model:valueRadioCheck="formStateTab2.incomeTaxMagnification" layoutCustom="horizontal"></radio-group>
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
        <a-col :span="8">
          <div class="header-text-2">요약</div>
          <div class="summary">
            <div class="text0">소득수당 합계 <span>{{ $filters.formatCurrency(totalPayItem) }}</span>원</div>
            <div class="text1">수당 과세 합계 <span>{{ $filters.formatCurrency(totalPayItemTax) }} </span>원</div>
            <div class="text2">수당 비과세 합계 <span>{{ $filters.formatCurrency(totalPayItemTaxFree) }}</span>원</div>
            <div class="text3">공제 합계 <span>{{ $filters.formatCurrency(totalDeduction) }}</span>원</div>
            <div class="text4">차인지급액 <span>{{ $filters.formatCurrency(subPayment) }}</span>원</div>
            <div class="text5">
              <span>
                <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px" />
                <p>차인지급액 = 수당 합계 - 공제 합계</p>
              </span>
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="header-text-2">수당 항목 {{ $filters.formatCurrency(totalPayItem) }} 원 = 과세 + 비과세</div>
          <a-spin :spinning="loading1" size="large">
            <div class="deduction-main">
                {{ datagConfigPayItems }}
              <div v-for="item in datagConfigPayItems" :key="item.name" class="custom-deduction">
                <span>
                  <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2" :name="item.name" :type="1" subName="과세" />
                  <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2" :name="item.name" :type="2" subName="상여(과세)" />
                  <deduction-items
                    v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
                    :name="item.name"
                    :type="3"
                    :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + (item.taxFreeIncludeSubmission?'O':'X')"
                  />
                  <deduction-items v-if="item.taxPayItemCode == null && item.taxfreePayItemCode == null" :name="item.name" :type="4" subName="과세" />
                </span>
                <div>
                  <number-box-money width="130px" :spinButtons="false" :rtlEnabled="false" v-model:valueInput="item.value" :min="0"> </number-box-money>
                  <span class="pl-5">원</span>
                </div>
              </div>
            </div>
          </a-spin>
        </a-col>
        <a-col :span="8">
          <div class="header-text-2">공제 항목 {{ $filters.formatCurrency(totalDeduction) }}원</div>
          <a-spin :spinning="loading1 || loading3" size="large">
            <div class="deduction-main">
              <div v-for="item in dataConfigDeduction" :key="item.name" class="custom-deduction">
                <span>
                  <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2" :name="item.name" :type="1" subName="과세" />
                  <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2" :name="item.name" :type="2" subName="상여(과세)" />
                  <deduction-items
                    v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
                    :name="item.name"
                    :type="3"
                    :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + item.taxFreeIncludeSubmission"
                  />
                  <deduction-items v-if="item.taxPayItemCode == null && item.taxfreePayItemCode == null" :name="item.name" :type="4" subName="과세" />
                </span>
                <div>
                  <number-box-money width="130px" :spinButtons="false" :rtlEnabled="false" v-model:valueInput="item.value" :readOnly="true" :min="0"> </number-box-money>
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
          <button-basic text="저장" type="default" mode="contained" :width="90" @onClick="updateDeduction" />
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
import { companyId, calculateNationalPensionEmployee, calculateHealthInsuranceEmployee, calculateLongTermCareInsurance, calculateEmployeementInsuranceEmployee } from '@/helpers/commonFunction';
import mutations from '@/graphql/mutations/PA/PA1/PA120/index';
import queries from '@/graphql/queries/PA/PA1/PA120/index';
import notification from '@/utils/notification';
import dayjs, { Dayjs } from 'dayjs';
type RangeValue = [Dayjs, Dayjs];
export default defineComponent({
  components: {},
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
    const dependentCount = ref(0);
    const totalDeduction = ref(0);
    const subPayment = computed(() => totalPayItem.value - totalDeduction.value);

    const rangeDate = ref<RangeValue>();
    const store = useStore();
    const datagConfigPayItems = ref();
    const dataConfigDeduction = ref();
    const triggerDetail = ref<boolean>(false);

    const globalYear = computed(() => store.state.settings.globalYear);
    const formStateTab2 = reactive<any>({
      ...initFormStateTab2,
    });
    const triggerCalcIncome = ref<boolean>(false);
    const calculateVariables = {
      companyId: companyId,
      imputedYear: globalYear.value,
      totalTaxPay: totalPayItem.value,
      dependentCount: 1,
    };
    // get Withholding Config PayItems
    const originDataDetail = ref({
      companyId: companyId,
      imputedYear: globalYear.value,
    });

    watch(
      () => props.idRowEdit,
      () => {
        refetchConfigPayItems();
        refetchConfigDeduction();
      }
    );

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
        datagConfigPayItems.value = value.getWithholdingConfigPayItems.map((item: any) => {
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
        dataConfigDeduction.value = value.getWithholdingConfigDeductionItems.map((item: any) => {
          return { itemCode: item.itemCode, name: item.name, value: 0 };
        });
      }
    });
    /**
     * get Employee Wage
     */
    const {
      refetch: refetchValueDetail,
      result,
      loading,
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
    watch(result, (value) => {
      if (value) {
        formStateTab2.nationalPensionDeduction = value.getEmployeeWage.nationalPensionDeduction;
        formStateTab2.healthInsuranceDeduction = value.getEmployeeWage.healthInsuranceDeduction;
        formStateTab2.longTermCareInsuranceDeduction = value.getEmployeeWage.longTermCareInsuranceDeduction;
        formStateTab2.employeementInsuranceDeduction = value.getEmployeeWage.employeementInsuranceDeduction;
        formStateTab2.insuranceSupport = value.getEmployeeWage.insuranceSupport;
        if (value.getEmployeeWage?.nationalPensionSupportPercent >= 0 && formStateTab2.longTermCareInsuranceDeduction) {
          formStateTab2.nationalPensionSupportPercent = value.getEmployeeWage.nationalPensionSupportPercent ?? 0;
        }
        if (value.getEmployeeWage?.employeementInsuranceSupportPercent >= 0 && formStateTab2.longTermCareInsuranceDeduction) {
          formStateTab2.employeementInsuranceSupportPercent = value.getEmployeeWage.employeementInsuranceSupportPercent ?? 0;
        }
        if (value.getEmployeeWage?.employeementReductionStartDate) {
          formStateTab2.employeementReductionStartDate = value.getEmployeeWage.employeementReductionStartDate;
        }
        if (value.getEmployeeWage?.employeementReductionFinishDate) {
          formStateTab2.employeementReductionFinishDate = value.getEmployeeWage.employeementReductionFinishDate;
          let ReductionStartDate = convertToDate(value.getEmployeeWage.employeementReductionStartDate);
          let ReductionFinishDate = convertToDate(value.getEmployeeWage.employeementReductionFinishDate);
          rangeDate.value = [ReductionStartDate, ReductionFinishDate];
        }
        if (value.getEmployeeWage?.employeementReductionRatePercent) {
          formStateTab2.employeementReductionRatePercent = value.getEmployeeWage.employeementReductionRatePercent;
        }
        if (value.getEmployeeWage?.employeementReductionInput) {
          formStateTab2.employeementReductionInput = value.getEmployeeWage.employeementReductionInput;
        }
        formStateTab2.employeementReduction = value.getEmployeeWage.employeementReduction;
        formStateTab2.incomeTaxMagnification = value.getEmployeeWage.incomeTaxMagnification;
        if (value.getEmployeeWage.payItems) {
          value.getEmployeeWage.payItems.map((item: any) => {
            datagConfigPayItems.value.find((Obj: any) => {
              if (item.itemCode == Obj.itemCode) {
                Obj.value = item.amount;
              }
            });
          });
        }
        if (value.getEmployeeWage.deductionItems) {
          value.getEmployeeWage.deductionItems.map((item: any) => {
            dataConfigDeduction.value.find((Obj: any) => {
              if (item.itemCode == Obj.itemCode) {
                Obj.value = item.amount;
              }
            });
          });
        }
        dependentCount.value = value.getEmployeeWage.dependents.length > 0 ? value.getEmployeeWage.dependents.length : 0;
        // calculateTax();
      }
    });

    /**
     * Calculate Pension Employee
     * */
    const calculateTax = () => {
      dataConfigDeduction.value?.map((item: any) => {
        if (item.itemCode == 1001) {
          let total1 = formStateTab2.nationalPensionDeduction ? calculateNationalPensionEmployee(totalPayItem.value, formStateTab2.nationalPensionSupportPercent) : 0;
          item.value = total1;
          formStateTab2.deductionItems[0] = {
            itemCode: 1001,
            amount: total1,
          };
        }
        if (item.itemCode == 1002) {
          let total2 = calculateHealthInsuranceEmployee(totalPayItem.value);
          item.value = total2;
          formStateTab2.deductionItems[1] = {
            itemCode: 1002,
            amount: total2,
          };
        }
        if (item.itemCode == 1003) {
          let total3 = calculateLongTermCareInsurance(totalPayItem.value);
          item.value = total3;
          formStateTab2.deductionItems[2] = {
            itemCode: 1003,
            amount: total3,
          };
        }
        if (item.itemCode == 1004) {
          let total4 = formStateTab2.longTermCareInsuranceDeduction == true ? calculateEmployeementInsuranceEmployee(totalPayItem.value, formStateTab2.employeementInsuranceSupportPercent) : 0;
          item.value = total4;
          formStateTab2.deductionItems[3] = {
            itemCode: 1004,
            amount: total4,
          };
        }
      });
      formStateTab2.payItems = datagConfigPayItems.value?.map((item: any) => {
        return {
          itemCode: item.itemCode,
          amount: item.value,
        };
      });
      totalPayItem.value = datagConfigPayItems.value.reduce((accumulator: any, object: any) => {
        return accumulator + object.value;
      }, 0);
      totalPayItemTax.value = datagConfigPayItems.value.reduce((accumulator: any, object: any) => {
        if (object.tax) {
          accumulator += object.value;
        }
        return accumulator;
      }, 0);
      totalPayItemTaxFree.value = datagConfigPayItems.value.reduce((accumulator: any, object: any) => {
        if (!object.tax) {
          accumulator += object.value;
        }
        return accumulator;
      }, 0);
      totalDeduction.value = dataConfigDeduction.value.reduce((accumulator: any, object: any) => {
        return accumulator + object.value;
      }, 0);
    };

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
     * Calculate Income Wage Tax API
     */
    const {
      result: resCalcIncomeWageTax,
      loading: loading3,
      refetch: refetchCalcIncomeWageTax,
      onError: onIncomeWageTaxError,
    } = useQuery(queries.calculateIncomeWageTax, calculateVariables, () => ({
      enabled: false,
      fetchPolicy: 'no-cache',
    }));
    onIncomeWageTaxError((e) => {
      notification('error', e.message);
    });

    watch(resCalcIncomeWageTax, (value) => {
      if (value) {
        dataConfigDeduction.value?.map((item: any) => {
          if (item.itemCode == 1011) {
            item.value = value.calculateIncomeWageTax;
            formStateTab2.deductionItems[4] = {
              itemCode: 1001,
              amount: value.calculateIncomeWageTax,
            };
          }
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
        formStateTab2.employeementReductionStartDate = +rangeDate.value[0].format('YYYYMMDD');
        formStateTab2.employeementReductionFinishDate = +rangeDate.value[1].format('YYYYMMDD');
      }
      const variables = {
        companyId: companyId,
        imputedYear: globalYear.value,
        employeeId: employeeId.value,
        input: {
          ...formStateTab2,
        },
      };
      mutate(variables);
    };

    const onChangeSwitch1 = (e: any) => {
      if (e) {
        formStateTab2.nationalPensionSupportPercent = 0;
        formStateTab2.employeementInsuranceSupportPercent = 0;
      } else {
        delete formStateTab2.nationalPensionSupportPercent;
        delete formStateTab2.employeementInsuranceSupportPercent;
      }
    };
    const onChangeSwitch2 = (e: any) => {
      if (e) {
        formStateTab2.employeementReductionRatePercent = 50;
        formStateTab2.employeementReductionInput = 1;
        rangeDate.value = [dayjs(), dayjs()];
      } else {
        delete formStateTab2.employeementReductionRatePercent;
        delete formStateTab2.employeementReductionInput;
        delete formStateTab2.employeementReductionStartDate;
        delete formStateTab2.employeementReductionFinishDate;
        rangeDate.value = undefined;
      }
    };
    return {
      formStateTab2,
      loading1,
      loading2,
      loading,
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
      datagConfigPayItems,
      dataConfigDeduction,
      onChangeSwitch1,
      onChangeSwitch2,
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
      margin-left: 35px;
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
  }

  .empl-ins {
    margin-left: 37px;
    > div {
      width: fit-content;
    }
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
      margin-right: 40px;
      margin-left: -2px;
    }
  }

  .deduction-main {
    max-height: 200px;
    overflow: scroll;
    border: 1px solid #ddd;
    padding-left: 5px;
    padding-top: 5px;
  }

  .custom-deduction {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > span {
      margin-right: 10px;
      min-width: 117px;
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
    div {
      margin-bottom: 5px;
      span{
        font-weight: bold;
      }
    }
    .text5 {
      span {
        display: flex;

        p {
          margin-left: 10px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
