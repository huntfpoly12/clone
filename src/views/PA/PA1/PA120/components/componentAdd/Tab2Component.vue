<template>
  <div id="tab2-pa120">
    <div class="header-text-1">공제 / 감면 / 소득세 적용율</div>
    <a-row :gutter="16" class="mb-7">
      <a-col span="24" style="display: flex; flex-wrap: wrap;">
        <a-form-item label="4대보험 공제 여부" label-align="right" class="ins-dedu input-text empl-ins">
            <span class="check-box-tab1">
            <checkbox-basic  label="국민연금" v-model:valueCheckbox="formStateTab2.nationalPensionDeduction"></checkbox-basic>
            </span>
            <span class="check-box-tab1">
            <checkbox-basic  label="건강보험" v-model:valueCheckbox="formStateTab2.healthInsuranceDeduction"></checkbox-basic>
            </span>
            <span class="check-box-tab1">
            <checkbox-basic size="18px" label="고용보험" v-model:valueCheckbox="formStateTab2.employeementInsuranceDeduction" :disabled="presidentPA120"></checkbox-basic>
            </span>
            <p class="text-note mt-7 ml-7">
                <img class="mt-2 mr-3" src="@/assets/images/iconInfo.png" style="width: 14px" />
                본 항목은 공제 계산을 위한 설정으로 실제 4대보험 신고 여부와는 무관합니다.</p>
        </a-form-item>
      </a-col>
      <a-col :span="11">
          <div class="header-text-4 d-flex" style="justify-content: space-around;">
            <a-col :span="12">
                두루누리사회보험 공제
            </a-col>
            <a-col :span="12" class="switch-bg">
                공제 여부: 
                <switch-basic
                class="switch-insurance"
                switch-basic textCheck="Y" textUnCheck="N" v-model:valueSwitch="formStateTab2.insuranceSupport"
                ></switch-basic>
            </a-col>
        </div>

        <a-row :gutter="[0,10]">
           <a-col span="7">
            국민연금 적용율:
           </a-col> 
           <a-col span="12">
               <radio-group :arrayValue="radioCheckPersenPension" v-model:valueRadioCheck="formStateTab2.nationalPensionSupportPercent" layoutCustom="horizontal" :disabled="!formStateTab2.insuranceSupport"></radio-group>
           </a-col>
           <a-col span="7">
            고용보험 적용율:
           </a-col> 
           <a-col span="12">
               <radio-group :arrayValue="radioCheckPersenPension" v-model:valueRadioCheck="formStateTab2.employeementInsuranceSupportPercent" layoutCustom="horizontal" :disabled="!formStateTab2.insuranceSupport"></radio-group>
           </a-col>
           <a-col span="7"><span class="header-text-4"> 소득세 적용율: </span></a-col>
            <a-col span="17" class="income-tax-app-rate">
              <radio-group :arrayValue="IncomeTaxAppRate" v-model:valueRadioCheck="formStateTab2.incomeTaxMagnification"
                layoutCustom="horizontal"></radio-group>
            </a-col>
        </a-row>
      </a-col>
      <a-col :span="13">
        <div class="header-text-4 d-flex">
            <a-col :span="13">
                중소기업취업 감면
            </a-col>
            <a-col :span="10" class="switch-bg">
                감면 여부: 
                <switch-basic
                    switch-basic textCheck="Y" textUnCheck="N" class="switch-insurance" v-model:valueSwitch="formStateTab2.employeementReduction"
                ></switch-basic>
                
            </a-col>
        </div>
        <a-row :gutter="[0,10]">
            <a-col :span="24">
                <img src="@/assets/images/iconInfo.png" style="width: 14px" class="mr-5"/>
            <span class="text-note">15세~34세 이하 청년, 60세 이상인 사람, 장애인, 경력단절여성이 중소기업에 취업하는 경우 취업일로 부터 3년간(청년 5년간) 근로소득세 70%(청년 90%, 150만원 한도) 감면</span>
            </a-col>
           <a-col span="7">
            감면기간:
           </a-col> 
           <a-col span="15">
             <date-time-box width="250px" :range="true" :multi-calendars="true" :disabled="!formStateTab2.employeementReduction"> </date-time-box>
           </a-col>
           <a-col span="7">
            감면율:
           </a-col> 
           <a-col span="15">
               <radio-group :arrayValue="radioCheckReductioRate" v-model:valueRadioCheck="formStateTab2.employeementReductionRatePercent" layoutCustom="horizontal" :disabled="!formStateTab2.employeementReduction"></radio-group>
           </a-col>
           <a-col span="7">
            감면입력:
           </a-col> 
           <a-col span="15">
               <radio-group :arrayValue="radioCheckReductionInput" v-model:valueRadioCheck="formStateTab2.employeementReductionInput" layoutCustom="horizontal" :disabled="!formStateTab2.employeementReduction"></radio-group>
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
      <a-col style="flex: 0 0 28%;">
        <div class="header-text-2">요약</div>
        <div class="summary">
            <a-col :span="13">소득수당 합계:</a-col>
            <a-col style="display: inline-flex; justify-content: flex-end;"><span>{{ $filters.formatCurrency(totalPayItem) }}</span> 원</a-col>
            <a-col :span="13">수당 과세 합계:</a-col>
            <a-col style="display: inline-flex; justify-content: flex-end;"><span>{{ $filters.formatCurrency(totalPayItemTax) }}</span> 원</a-col>
            <a-col :span="13">수당 비과세 합계:</a-col>
            <a-col style="display: inline-flex; justify-content: flex-end;"><span>{{ $filters.formatCurrency(totalPayItemTaxFree) }}</span> 원</a-col>
            <a-col :span="13">공제 합계:</a-col>
            <a-col style="display: inline-flex; justify-content: flex-end;"><span>{{ $filters.formatCurrency(totalDeduction) }}</span> 원</a-col>
            <a-col :span="13">차인지급액:</a-col>
            <a-col style="display: inline-flex; justify-content: flex-end;"><span>{{ $filters.formatCurrency(subPayment) }}</span> 원</a-col>
          <div class="text5">
            <span>
              <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px" />
              <p>차인지급액 = 수당 합계 - 공제 합계</p>
            </span>
          </div>
        </div>
      </a-col>
      <a-col class="col-2">
        <div class="header-text-2">수당 항목 {{ $filters.formatCurrency(totalPayItem) }} 원 = 과세 + 비과세</div>
        <a-spin :spinning="loading1" size="large">
          <div class="deduction-main">
            <div v-for="item in dataConfigPayItems" :key="item.name" class="custom-deduction">
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
                <number-box-money width="130px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="item.value" :min="0"> </number-box-money>
                <span class="pl-5">원</span>
              </div>
            </div>
          </div>
        </a-spin>
      </a-col>
      <a-col class="col-3">
        <div class="header-text-2">공제 항목 {{ $filters.formatCurrency(totalDeduction) }}원</div>
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
                <number-box-money width="130px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="item.value" :disabled="true" :min="0"> </number-box-money>
                <span class="pl-5">원</span>
              </div>
            </div>
          </div>
        </a-spin>
      </a-col>
    </a-row>
    {{ isBtnYellow }} isBtnYellow <br/>
    {{ formStateTab2 }} formStateTab2 <br/>
    {{ rangeDate }} rangeDate <br/>
    <a-row style="margin-top: 20px">
      <a-col :span="8" :offset="8" style="text-align: center">
        <button-tooltip-error :statusChange="isBtnYellow" :showError="isAddFormErrorPA120" @onClick="calculateTax" text="공제계산"/>
        <button-basic id="btn-save-add-tab2" text="저장" type="default" mode="contained" :width="90" @onClick="createDeduction" />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch, computed, watchEffect } from 'vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { radioCheckPersenPension, radioCheckReductioRate, radioCheckReductionInput, IncomeTaxAppRate, initFormStateTab2 } from '../../utils/index';
import { useStore } from 'vuex';
import { companyId, calculateNationalPensionEmployee, calculateHealthInsuranceEmployee, calculateLongTermCareInsurance, calculateEmployeementInsuranceEmployee } from '@/helpers/commonFunction';
import filters from '@/helpers/filters';
import mutations from '@/graphql/mutations/PA/PA1/PA120/index';
import queries from '@/graphql/queries/PA/PA1/PA120/index';
import notification from '@/utils/notification';
import dayjs, { Dayjs } from 'dayjs';
import Datepicker from "@vuepic/vue-datepicker";
import queryCM130 from "@/graphql/queries/CM/CM130/index";

type RangeValue = [Dayjs | null, Dayjs | null];
export default defineComponent({
  components: {Datepicker},
  props: {
    employeeId: {
      type: String,
      default: 0,
    },
    modalStatus: Boolean,
  },
  setup(props, { emit }) {
    const totalPayItemTaxFree = ref(0);
    const totalPayItemTax = ref(0);
    const totalPayItem = ref(0);
    const totalDeduction = ref(0);
    const subPayment = computed(() => totalPayItem.value - totalDeduction.value);

    const rangeDate =  ref<RangeValue>();
    const store = useStore();
    const dataConfigPayItems = ref();
    const dataConfigDeduction = ref();
    const globalYear = computed(() => store.state.settings.globalYear);
    const formStateTab2 = reactive<any>({
      ...initFormStateTab2,
    });
    const triggerCalcIncome = ref<boolean>(false);
    const calculateVariables = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
      totalTaxPay: totalPayItem.value,
      dependentCount: 1,
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
      enabled: triggerCalcIncome.value,
      fetchPolicy: 'no-cache',
    }));
    onIncomeWageTaxError((e) => {
      notification('error', e.message);
    });

    watch(resCalcIncomeWageTax, (value) => {
      if (value) {
        let itemValue11: Number ;
        dataConfigDeduction.value?.forEach((item: any) => {
          if (item.itemCode == 1011) {
            item.value = value.calculateIncomeWageTax;
            itemValue11 = value.calculateIncomeWageTax
            formStateTab2.deductionItems[4] = {
              itemCode: 1011,
              amount: value.calculateIncomeWageTax,
            };
          }
          if (item.itemCode == 1012) {
            item.value = itemValue11? Math.floor(+itemValue11 / 10) * 10 : 0;
            formStateTab2.deductionItems[4] = {
              itemCode: 1012,
              amount: value.calculateIncomeWageTax,
            };
          }
        });
      }
    });

    /**
     * get WithholdingConfigPayItems
     */
    const originDataDetail = ref({
      companyId: companyId,
      imputedYear: globalYear.value,
      useOnly: true,
    });
    const { result: resConfigPayItems, loading: loading1 } = useQuery(queries.getWithholdingConfigPayItems, originDataDetail, () => ({
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
      }
      store.state.common.isCalculateEditPA120 = true;
    });

    /**
     *  get Withouthoulding Config deduction
     */
    const { result: resConfigDeduction, loading: loading2 } = useQuery(queries.getWithholdingConfigDeductionItems, originDataDetail, () => ({
      fetchPolicy: 'no-cache',
    }));
    watch(resConfigDeduction, (value) => {
      if (value) {
        dataConfigDeduction.value = value.getWithholdingConfigDeductionItems.filter((item: any) => {
            if(item.itemCode == 1001){
                return { itemCode: item.itemCode, name: item.name, value: 0 };
            }
            if(item.itemCode == 1002){
                return { itemCode: item.itemCode, name: item.name, value: 0 };
            }
            if(item.itemCode == 1003){
                return { itemCode: item.itemCode, name: item.name, value: 0 };
            }
            if(item.itemCode == 1004){
                return { itemCode: item.itemCode, name: item.name, value: 0 };
            }
            if(item.itemCode == 1011){
                return { itemCode: item.itemCode, name: item.name, value: 0 };
            }
            if(item.itemCode == 1012){
                return { itemCode: item.itemCode, name: item.name, value: 0 };
            }
        });
      }
      store.state.common.isCalculateEditPA120 = true;
    });

    /**
     * Calculate Pension Employee
     * */
    const calculateTax = () => {
      totalPayItem.value = dataConfigPayItems.value.reduce((accumulator: any, object: any) => {
        return accumulator + object.value;
      }, 0);
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
          let total2 = formStateTab2.healthInsuranceDeduction ?calculateHealthInsuranceEmployee(totalPayItem.value):0;
          item.value = total2;
          formStateTab2.deductionItems[1] = {
            itemCode: 1002,
            amount: total2,
          };
        }
        if (item.itemCode == 1003) {
          let total3 = formStateTab2.healthInsuranceDeduction ?calculateLongTermCareInsurance(totalPayItem.value):0;
          item.value = total3;
          formStateTab2.deductionItems[2] = {
            itemCode: 1003,
            amount: total3,
          };
        }
        if (item.itemCode == 1004) {
          let total4 = formStateTab2.employeementInsuranceDeduction? calculateEmployeementInsuranceEmployee(totalPayItem.value, formStateTab2.employeementInsuranceSupportPercent) : 0;
          item.value = total4;
          formStateTab2.deductionItems[3] = {
            itemCode: 1004,
            amount: total4,
          };
        }
      });
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
        return accumulator + object.value;
      }, 0);
    //   refetchCalcIncomeWageTax();
      // triggerCalcIncome.value = true;
      store.state.common.isAddFormErrorPA120 = false;
      isBtnYellow.value = false;
      if(!formStateTab2.value?.employeementReductionStartDate){
        rangeDate.value = [null, null];
      }
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
          dependentCount: 1,
        });
      }
    });
    watch(()=>formStateTab2.insuranceSupport,(newVal)=> {
        if(newVal) {
            formStateTab2.nationalPensionSupportPercent = 0;
            formStateTab2.employeementInsuranceSupportPercent=0
        }else {
            delete formStateTab2.nationalPensionSupportPercent;
            delete formStateTab2.employeementInsuranceSupportPercent
        }
    },{deep:true})
    watch(()=>formStateTab2.employeementReduction,(newVal)=> {
        if(newVal) {
            formStateTab2.employeementReductionRatePercent = 50;
            formStateTab2.employeementReductionInput= 1;
            rangeDate.value = [dayjs(), dayjs()];
            formStateTab2.employeementReductionStartDate= filters.formatDateToInterger(rangeDate.value[0]);
            formStateTab2.employeementReductionFinishDate= filters.formatDateToInterger(rangeDate.value[1]);
        }else {
            delete formStateTab2.employeementReductionRatePercent;
            delete formStateTab2.employeementReductionInput;
            delete formStateTab2.employeementReductionStartDate;
            delete formStateTab2.employeementReductionFinishDate;
            rangeDate.value = undefined;
        }
    },{deep:true})

    // watch president to disable employeementInsuranceDeduction
    const presidentPA120 = computed(() => store.state.common.presidentPA120);
    watch(
      () => presidentPA120.value,
      (newValue) => {
        if (newValue) {
          formStateTab2.employeementInsuranceDeduction = false;
        }
      },
      { deep: true }
    );
    //  // watch initFormTab2PA120 to check calculate button
    const isAddFormErrorPA120 = computed(()=> store.state.common.isAddFormErrorPA120);
    watch(
      () => dataConfigPayItems,
      (newVal) => {
        if (newVal) {
          store.state.common.isCalculateEditPA120 = false;
          isBtnYellow.value = true;
        }
      },
      { deep: true }
    );
    const isCalculateEditPA120 = computed(() => store.state.common.isCalculateEditPA120);
    const isBtnYellow = ref(false);
    let stopTrack = watchEffect(() => {
      const { deductionItems, payItems, ...rest } = formStateTab2;
      if (rest) {
        store.state.common.isCalculateEditPA120 = false;
        isBtnYellow.value = true;
      }
    });
    setTimeout(() => {
      store.state.common.isCalculateEditPA120 = true;
    }, 1000);
    

    /**
     *  Save form
     */
    const { mutate, onError, onDone } = useMutation(mutations.saveEmployeeWagePayDeductionReduction);
    const createDeduction = () => {
      if(!isCalculateEditPA120.value) {
        store.state.common.isAddFormErrorPA120 = true;
        return;
      }
      // if (rangeDate.value) {
      //   formStateTab2.employeementReductionStartDate = filters.formatDateToInterger(rangeDate.value[0]);
      //   formStateTab2.employeementReductionFinishDate = filters.formatDateToInterger(rangeDate.value[1]);
      // }
        
      formStateTab2.payItems = dataConfigPayItems.value?.map((item: any) => {
        return {
          itemCode: item.itemCode,
          amount: item.value,
        };
      });
      const variables = {
        companyId: companyId,
        imputedYear: globalYear.value,
        employeeId: props.employeeId,
        input: {
            ...formStateTab2,
        }
      };
      mutate(variables);
    };
    onError((e) => {
      notification('error', e.message);
      store.state.common.isCalculateEditPA120 = false;
    });

    onDone((res) => {
      stopTrack = watchEffect(() => {
        const { deductionItems, payItems, ...rest } = formStateTab2;
        if (rest) {
          console.log(`output -track 2`)
          store.state.common.isCalculateEditPA120 = false;
          isBtnYellow.value = true;
        }
      });
      emit('closePopup', false);
      notification('success', '업데이트 완료!');
      store.commit('common/actionFormDonePA120');
      store.commit('common/keyActivePA120', props.employeeId);
      store.state.common.isCalculateEditPA120 = true;
      store.state.common.isAddFormErrorPA120 = false;
    });

    // get config
    const withholdingTrigger = ref(true);
    const dataQuery = ref({ companyId: companyId, imputedYear: globalYear.value });
    const { result: resultConfig} = useQuery(
        queryCM130.getWithholdingConfig,
        dataQuery,
        () => ({
          enabled: withholdingTrigger.value,
          fetchPolicy: "no-cache",
        })
    );
    watch(resultConfig,(newVal)=> {
      if(newVal){
        formStateTab2.insuranceSupport = newVal.getWithholdingConfig.insuranceSupport;
        withholdingTrigger.value=false;
      }
    })
    return {
      formStateTab2,
      loading1,
      loading2,
      rangeDate,
      totalPayItem,
      totalPayItemTaxFree,
      totalPayItemTax,
      totalDeduction,
      subPayment,
      calculateTax,
      loading3,
      createDeduction,
      radioCheckPersenPension,
      radioCheckReductioRate,
      radioCheckReductionInput,
      IncomeTaxAppRate,
      companyId,
      dataConfigPayItems,
      dataConfigDeduction,
      presidentPA120,
      isCalculateEditPA120,
      isAddFormErrorPA120,
      isBtnYellow
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
    :deep .col-2 {
        flex: 1 1 30%;
        .dx-numberbox {
            width: 111px !important;
        }
        .deducation-name {
            width: 50px !important;
        }
    }
    :deep .col-3{
        flex: 1 1 35%;
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

  .deduction-main {
    // max-height: 200px;
    // overflow: scroll;
    border: 1px solid #ddd;
    padding-left: 5px;
    padding-top: 5px;
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
    :deep .ant-col{
        padding: 0 !important;
    }
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
          margin-left: 3px;
          font-size: 12px;
        }
      }
    }
}
.text-note {
        font-size: 11px;
        display: inline;
    // margin-left: 5px;
    // margin-bottom: 0px;
    }
.header-text-4{
    background-color: #c6d9f1;
    padding: 5px;
    font-size: 14px;
    margin-bottom: 10px;
    .switch-bg {
        background-color: white;
    }
}    
</style>
