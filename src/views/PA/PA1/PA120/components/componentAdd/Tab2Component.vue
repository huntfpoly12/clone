<template>
  <div id="tab2-pa120">
    <!-- {{ editRowTab2PA120.deductionItems }}w<br />
    {{ initFormTab2PA120.deductionItems }}w -->
    <div class="header-text-1">공제 / 감면 / 소득세 적용율</div>
    <a-row class="mb-7">
      <a-col span="24" style="display: flex; flex-wrap: wrap">
        <a-form-item
          label="4대보험 공제 여부"
          label-align="right"
          class="ins-dedu input-text empl-ins"
        >
          <span class="check-box-tab1">
            <checkbox-basic
              label="국민연금"
              v-model:valueCheckbox="initFormTab2PA120.nationalPensionDeduction"
            ></checkbox-basic>
          </span>
          <span class="check-box-tab1">
            <checkbox-basic
              label="건강보험"
              v-model:valueCheckbox="initFormTab2PA120.healthInsuranceDeduction"
            ></checkbox-basic>
          </span>
          <span class="check-box-tab1">
            <checkbox-basic
              size="18px"
              label="고용보험"
              v-model:valueCheckbox="
                initFormTab2PA120.employeementInsuranceDeduction
              "
              :disabled="presidentPA120"
            ></checkbox-basic>
          </span>
          <a-tooltip placement="top" class="custom-tooltip">
            <template #title>
              본 항목은 공제 계산을 위한 설정으로 실제 4대보험 신고 여부와는
              무관합니다.
            </template>
            <div style="text-align: center">
              <img
                src="@/assets/images/iconInfo.png"
                style="width: 14px; height: 14px"
                class="mb-3 ml-10"
              />
            </div>
          </a-tooltip>
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <div class="header-text-4 d-flex" style="justify-content: space-around">
          <a-col :span="12"> 두루누리사회보험 공제 </a-col>
          <a-col :span="12" class="switch-bg">
            공제 여부:
            <switch-basic
              class="switch-insurance"
              switch-basic
              textCheck="Y"
              textUnCheck="N"
              v-model:valueSwitch="initFormTab2PA120.insuranceSupport"
              :disabled="!isDisableInsuranceSupport"
            ></switch-basic>
          </a-col>
        </div>

        <a-row :gutter="[0, 10]">
          <a-col span="7"> 국민연금 적용율: </a-col>
          <a-col span="12">
            <radio-group
              :arrayValue="radioCheckPersenPension"
              v-model:valueRadioCheck="
                initFormTab2PA120.nationalPensionSupportPercent
              "
              layoutCustom="horizontal"
              :disabled="
                !initFormTab2PA120.insuranceSupport ||
                !isDisableInsuranceSupport ||
                !initFormTab2PA120.nationalPensionDeduction
              "
            ></radio-group>
          </a-col>
          <a-col span="7"> 고용보험 적용율: </a-col>
          <a-col span="12">
            <radio-group
              :arrayValue="radioCheckPersenPension"
              v-model:valueRadioCheck="
                initFormTab2PA120.employeementInsuranceSupportPercent
              "
              layoutCustom="horizontal"
              :disabled="
                !initFormTab2PA120.insuranceSupport ||
                !isDisableInsuranceSupport ||
                !initFormTab2PA120.employeementInsuranceDeduction
              "
            ></radio-group>
          </a-col>
          <a-col span="7"
            ><span class="header-text-4"> 소득세 적용율: </span></a-col
          >
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
        <div class="header-text-4 d-flex">
          <a-col :span="13">
            중소기업취업 감면
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title>
                15세~34세 이하 청년, 60세 이상인 사람, 장애인, 경력단절여성이
                중소기업에 취업하는 경우 취업일로 부터 3년간(청년 5년간)
                근로소득세 70%(청년 90%, 150만원 한도) 감면
              </template>
              <div style="text-align: center">
                <img
                  src="@/assets/images/iconInfo.png"
                  style="width: 14px; height: 14px"
                  class="mb-3 ml-10"
                />
              </div>
            </a-tooltip>
          </a-col>
          <a-col :span="10" class="switch-bg">
            감면 여부:
            <switch-basic
              switch-basic
              textCheck="Y"
              textUnCheck="N"
              class="switch-insurance"
              v-model:valueSwitch="initFormTab2PA120.employeementReduction"
            ></switch-basic>
          </a-col>
        </div>
        <a-row :gutter="[0, 10]">
          <a-col span="7"> 감면기간: </a-col>
          <a-col span="15">
            <date-time-box
              width="250px"
              :range="true"
              :multi-calendars="true"
              v-model:valueDate="rangeDate"
              :disabled="!initFormTab2PA120.employeementReduction"
            >
            </date-time-box>
          </a-col>
          <a-col span="7"> 감면율: </a-col>
          <a-col span="15">
            <radio-group
              :arrayValue="radioCheckReductioRate"
              v-model:valueRadioCheck="
                initFormTab2PA120.employeementReductionRatePercent
              "
              layoutCustom="horizontal"
              :disabled="!initFormTab2PA120.employeementReduction"
            ></radio-group>
          </a-col>
          <a-col span="7"> 감면입력: </a-col>
          <a-col span="15">
            <radio-group
              :arrayValue="radioCheckReductionInput"
              v-model:valueRadioCheck="
                initFormTab2PA120.employeementReductionInput
              "
              layoutCustom="horizontal"
              :disabled="!initFormTab2PA120.employeementReduction"
            ></radio-group>
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
        <div style="text-align: center">
          <img
            src="@/assets/images/iconInfo.png"
            style="width: 14px; height: 14px"
            class="mb-5 ml-10"
          />
        </div>
      </a-tooltip>
    </div>
    <a-row gutter="5">
      <a-col style="flex: 0 0 28%">
        <div class="header-text-2">요약</div>
        <div class="summary">
          <a-col :span="13"
            >소득수당 합계
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title> 수당 합계 = 수당 과세 + 수당 비과세 </template>
              <div style="text-align: center">
                <img
                  src="@/assets/images/iconInfo.png"
                  style="width: 14px; height: 14px"
                  class="mb-3 ml-10"
                />
              </div>
            </a-tooltip>
            :
          </a-col>
          <a-col style="display: inline-flex; justify-content: flex-end">
            <span>{{ $filters.formatCurrency(totalPayItem) }}</span> 원</a-col
          >
          <a-col class="ml-15" :span="12">수당 과세 합계:</a-col>
          <a-col style="display: inline-flex; justify-content: flex-end"
            ><span>{{ $filters.formatCurrency(totalPayItemTax) }}</span>
            원</a-col
          >
          <a-col class="ml-15" :span="12">수당 비과세 합계:</a-col>
          <a-col style="display: inline-flex; justify-content: flex-end"
            ><span>{{ $filters.formatCurrency(totalPayItemTaxFree) }}</span>
            원</a-col
          >
          <a-col :span="13">공제 합계:</a-col>
          <a-col style="display: inline-flex; justify-content: flex-end"
            ><span>{{ $filters.formatCurrency(totalDeduction) }}</span>
            원</a-col
          >
          <a-col :span="13" style="font-weight: 600"
            >차인지급액
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title>
                차인지급액 = 수당 합계 - 공제 합계 + 감면 합계
              </template>
              <div style="text-align: center">
                <img
                  src="@/assets/images/iconInfo.png"
                  style="width: 14px; height: 14px"
                  class="mb-3 ml-10"
                />
              </div>
            </a-tooltip>
            :
          </a-col>
          <a-col
            style="
              display: inline-flex;
              justify-content: flex-end;
              font-weight: 600;
            "
            ><span>{{ $filters.formatCurrency(subPayment) }}</span> 원</a-col
          >
        </div>
      </a-col>
      <a-col class="col-2">
        <div class="header-text-2">
          급여 {{ $filters.formatCurrency(totalPayItem) }} 원 = 과세
          {{ $filters.formatCurrency(totalPayItemTax) }} 원 + 비과세
          {{ $filters.formatCurrency(totalPayItemTaxFree) }} 원
        </div>
        <a-spin :spinning="loading1" size="large" style="height: 100%">
          <div class="deduction-main">
            <div
              v-for="item in initFormTab2PA120.payItems"
              :key="item.name"
              class="custom-deduction"
            >
              <span>
                <deduction-items
                  v-if="item.taxPayItemCode && item.taxPayItemCode != 2"
                  :name="item.name"
                  :type="1"
                  subName="과세"
                />
                <deduction-items
                  v-if="item.taxPayItemCode && item.taxPayItemCode == 2"
                  :name="item.name"
                  :type="2"
                  subName="상여(과세)"
                />
                <deduction-items
                  v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
                  :name="item.name"
                  :type="3"
                  :subName="
                    item.taxfreePayItemCode +
                    ' ' +
                    item.taxfreePayItemName +
                    ' ' +
                    (item.taxFreeIncludeSubmission ? 'O' : 'X')
                  "
                />
                <deduction-items
                  v-if="
                    item.taxPayItemCode == null &&
                    item.taxfreePayItemCode == null
                  "
                  :name="item.name"
                  :type="4"
                  subName="과세"
                />
              </span>
              <div>
                <number-box-money
                  width="130px"
                  :spinButtons="false"
                  :rtlEnabled="true"
                  v-model:valueInput="item.value"
                  :min="0"
                  @changeInput="onCalcSum"
                  format="#0,###"
                >
                </number-box-money>
                <span class="pl-5">원</span>
              </div>
            </div>
          </div>
        </a-spin>
        <!-- <a-spin :spinning="loading1" size="large">
          <div class="deduction-main">
            <div v-for="item in dataConfigPayItems" :key="item.name" class="custom-deduction">
              <span>
                <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2" :name="item.name" :type="1"
                                 subName="과세" />
                <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2" :name="item.name" :type="2"
                                 subName="상여(과세)" />
                <deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode" :name="item.name" :type="3"
                                 :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + item.taxFreeIncludeSubmission" />
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
        </a-spin> -->
      </a-col>
      <a-col class="col-3">
        <div class="header-text-2">
          공제
          <span style="float: right"
            >{{ $filters.formatCurrency(totalDeduction) }} 원</span
          >
        </div>
        <a-spin :spinning="loading1 || loading3" size="large">
          <div class="deduction-main">
            <div
              v-for="item in initFormTab2PA120.deductionItems"
              :key="item.name"
              class="custom-deduction"
            >
              <span>
                <deduction-items
                  v-if="item.taxPayItemCode && item.taxPayItemCode != 2"
                  :name="item.name"
                  :type="1"
                  subName="공제"
                />
                <deduction-items
                  v-if="item.taxPayItemCode && item.taxPayItemCode == 2"
                  :name="item.name"
                  :type="2"
                  subName="공제"
                />
                <deduction-items
                  v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
                  :name="item.name"
                  :type="3"
                  :subName="
                    item.taxfreePayItemCode +
                    ' ' +
                    item.taxfreePayItemName +
                    ' ' +
                    item.taxFreeIncludeSubmission
                  "
                />
                <deduction-items
                  v-if="
                    item.taxPayItemCode == null &&
                    item.taxfreePayItemCode == null
                  "
                  :name="item.name"
                  :type="4"
                  subName="공제"
                />
              </span>
              <div>
                  <a-tooltip
                    color="black"
                    placement="top"
                    v-if="item.itemCode == 1012 && localIncomeBoo"
                    zIndex="9999"
                  >
                    <template #title>
                      소액징수부면제 적용 {{ localReal }}
                    </template>
                    <span>
                      <number-box-money
                        :textColor="
                          localIncomeBoo && item.itemCode == 1012 ? 'red' : ''
                        " 
                        width="130px"
                        :spinButtons="false"
                        :rtlEnabled="true"
                        v-model:valueInput="item.value"
                        :min="1000"
                        @changeInput="onCalcSum"
                        :disabled="disabledDeduction(item.itemCode)"
                        format="#0,###"
                      />
                    </span>
                  </a-tooltip>
                  <number-box-money
                    v-else
                    :textColor="
                      item.value < 1000 && item.itemCode == 1012 ? 'red' : ''
                    "
                    width="130px"
                    :spinButtons="false"
                    :rtlEnabled="true"
                    v-model:valueInput="item.value"
                    :min="0"
                    @changeInput="onCalcSum"
                    :disabled="disabledDeduction(item.itemCode)"
                    format="#0,###"
                    @onFocusOut="(e: any) => handleFocusOut(e, item.itemCode)"
                  />
                  <span class="pl-5">원</span>
                </div>
            </div>
          </div>
        </a-spin>
      </a-col>
    </a-row>
    <a-row style="margin-top: 20px" justify="center">
      <button-tooltip-error
        :statusChange="isBtnYellow"
        @onClick="modalCalc = true"
        text="공제계산"
      />
      <button-basic
        id="btn-save-add-tab2"
        text="저장"
        type="default"
        mode="contained"
        :width="90"
        @onClick="createDeduction"
      />
    </a-row>
    <a-row style="margin-top: 20px" justify="center">
      ※ {입력값 수정} → [공제 계산] 클릭 → {결과 확인} → [저장] 클릭 <br />
      ※ 현재 등록되어 있는 부양가족 기준으로 세액 적용됩니다.
    </a-row>
    <PopupMessage
      :modalStatus="modalCalc"
      @closePopup="modalCalc = false"
      :typeModal="'confirm'"
      title=""
      :content="() => vnode"
      :keyAccept="'1234'"
      :okText="msgCalc.yes"
      :cancelText="msgCalc.no"
      @checkConfirm="calculateTax"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  watch,
  computed,
  watchEffect,
  h,
} from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import {
  radioCheckPersenPension,
  radioCheckReductioRate,
  radioCheckReductionInput,
  IncomeTaxAppRate,
} from "../../utils/index";
import { useStore } from "vuex";
import {
  companyId,
  calculateNationalPensionEmployee,
  calculateHealthInsuranceEmployee,
  calculateLongTermCareInsurance,
  calculateEmployeementInsuranceEmployee,
} from "@/helpers/commonFunction";
import filters from "@/helpers/filters";
import mutations from "@/graphql/mutations/PA/PA1/PA120/index";
import queries from "@/graphql/queries/PA/PA1/PA120/index";
import notification from "@/utils/notification";
import dayjs, { Dayjs } from "dayjs";
import Datepicker from "@vuepic/vue-datepicker";
import { Message } from "@/configs/enum";

type RangeValue = [Dayjs | null, Dayjs | null];
const vnode = h("div", [
  h("div", "입력된 수당으로 공제를 계산하여, 새로운 공제 금액이 입력됩니다. "),
  h("div", " 그래도 계산하시겠습니까?"),
]);
export default defineComponent({
  components: { Datepicker },
  props: {
    employeeId: {
      type: String,
      default: 0,
    },
    modalStatus: Boolean,
  },
  setup(props, { emit }) {
    const store = useStore();
    const totalPayItemTaxFree = ref(0);
    const totalPayItemTax = ref(0);
    const totalPayItem = ref(0);
    const totalDeduction = ref(0);
    const subPayment = computed(
      () => totalPayItem.value - totalDeduction.value
    );
    const deductionDependentCountPA120 = computed(()=>store.state.common.deductionDependentCountPA120);
    const rangeDate = ref<RangeValue>([null, null]);
    const globalYear = ref<number>(
      parseInt(sessionStorage.getItem("paYear") ?? "0")
    );
    const isDisableInsuranceSupport = computed(
      () => store.state.common.isDisableInsuranceSupport
    );
    const initFormTab2PA120 = computed(
      () => store.state.common.initFormTab2PA120
    );
    const editRowTab2PA120 = computed(
      () => store.state.common.editRowTab2PA120
    );
    const initFormStateTabPA120 = computed(
      () => store.state.common.initFormStateTabPA120
    );
    const triggerCalcIncome = ref<boolean>(false);
    const calculateVariables = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
      totalTaxPay: totalPayItemTax,
      dependentCount: deductionDependentCountPA120.value,
    });
    const modalCalc = ref(false);
    const msgCalc = Message.getMessage("PA120", "004");
    const trigger = ref(true);
    /**
     * get WithholdingConfigPayItems
     */
    const originDataDetail = ref({
      companyId: companyId,
      imputedYear: globalYear.value,
      useOnly: true,
    });
    const { result: resConfigPayItems, loading: loading1 } = useQuery(
      queries.getWithholdingConfigPayItems,
      originDataDetail,
      () => ({
        fetchPolicy: "no-cache",
      })
    );
    watch(resConfigPayItems, (value) => {
      if (value) {
        let data = value.getWithholdingConfigPayItems;
        let dataConfigPayItem = data.map((item: any) => {
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
        initFormTab2PA120.value.payItems = JSON.parse(
          JSON.stringify(dataConfigPayItem)
        );
        editRowTab2PA120.value.payItems = JSON.parse(
          JSON.stringify(dataConfigPayItem)
        );
        trigger.value = false;
      }
    });

    /**
     *  get Withouthoulding Config deduction
     */
    const { result: resConfigDeduction, loading: loading2 } = useQuery(
      queries.getWithholdingConfigDeductionItems,
      originDataDetail,
      () => ({
        fetchPolicy: "no-cache",
      })
    );
    watch(resConfigDeduction, (value) => {
      if (value) {
        let data = value.getWithholdingConfigDeductionItems;
        let dataConfigDeduction: any[] = [];
        for (var i = 0; i < data.length; i++) {
          var item = data[i];
          if (item.itemCode == 1001) {
            dataConfigDeduction.push({
              itemCode: item.itemCode,
              name: item.name,
              value: 0,
            });
          }
          if (item.itemCode == 1002) {
            dataConfigDeduction.push({
              itemCode: item.itemCode,
              name: item.name,
              value: 0,
            });
          }
          if (item.itemCode == 1003) {
            dataConfigDeduction.push({
              itemCode: item.itemCode,
              name: item.name,
              value: 0,
            });
          }
          if (item.itemCode == 1004) {
            dataConfigDeduction.push({
              itemCode: item.itemCode,
              name: item.name,
              value: 0,
            });
          }
          if (item.itemCode == 1011) {
            dataConfigDeduction.push({
              itemCode: item.itemCode,
              name: item.name,
              value: 0,
            });
          }
          if (item.itemCode == 1012) {
            dataConfigDeduction.push({
              itemCode: item.itemCode,
              name: item.name,
              value: 0,
            });
          }
        }
        initFormTab2PA120.value.deductionItems = [...dataConfigDeduction];
        editRowTab2PA120.value.deductionItems = [...dataConfigDeduction];
        trigger.value = false;
      }
    });
    const onCalcSum = () => {
      totalPayItem.value = initFormTab2PA120.value.payItems.reduce(
        (accumulator: any, object: any) => {
          return accumulator + object.value;
        },
        0
      );
      totalPayItemTax.value = initFormTab2PA120.value.payItems.reduce(
        (accumulator: any, object: any) => {
          if (object.tax) {
            accumulator += object.value;
          }
          return accumulator;
        },
        0
      );
      totalPayItemTaxFree.value = initFormTab2PA120.value.payItems.reduce(
        (accumulator: any, object: any) => {
          if (!object.tax) {
            accumulator += object.value;
          }
          return accumulator;
        },
        0
      );
      totalDeduction.value = initFormTab2PA120.value.deductionItems.reduce(
        (accumulator: any, object: any) => {
          if (!accumulator) {
            accumulator = 0;
          }
          if (!object.value) {
            object.value = 0;
          }
          return accumulator + object.value;
        },
        0
      );
    };

    /**
     * Calculate Income Wage Tax API
     */
    const localIncomeBoo = ref(false);
    const localReal = ref(0);
    const {
      result: resCalcIncomeWageTax,
      loading: loading3,
      onError: onIncomeWageTaxError,
    } = useQuery(queries.calculateIncomeWageTax, calculateVariables, () => ({
      enabled: triggerCalcIncome.value,
      fetchPolicy: "no-cache",
    }));
    onIncomeWageTaxError((e) => {
      //notification('error', e.message);
    });
    watch(resCalcIncomeWageTax, (value) => {
      if (value) {
        let itemValue11 = Math.floor(
          (value.calculateIncomeWageTax *
            initFormTab2PA120.value.incomeTaxMagnification) /
            100
        );
        let itemValue12 = itemValue11 ? Math.floor(+itemValue11 / 100) * 10 : 0;
        localIncomeBoo.value = (itemValue12 < 1000);
        localReal.value = itemValue12;
        initFormTab2PA120.value.deductionItems.map((item: any) => {
          if (item.itemCode == 1011) {
            item.value = itemValue11;
          }
          if (item.itemCode == 1012) {
            item.value = itemValue12 < 1000 ? 0 : itemValue12;
          }
        });
      }
      triggerCalcIncome.value = false;
      onCalcSum();
    });
    /**
     * Calculate Pension Employee
     * */
    const calcPension = () => {
      initFormTab2PA120.value.deductionItems?.map((item: any) => {
        if (item.itemCode == 1001) {
          let total1 = initFormTab2PA120.value.nationalPensionDeduction
            ? calculateNationalPensionEmployee(
                calculateVariables.totalTaxPay,
                initFormTab2PA120.value.nationalPensionSupportPercent
              )
            : 0;
          item.value = total1;
          return {
            itemCode: 1001,
            amount: total1,
          };
        }
        if (item.itemCode == 1002) {
          let total2 = initFormTab2PA120.value.healthInsuranceDeduction
            ? calculateHealthInsuranceEmployee(calculateVariables.totalTaxPay)
            : 0;
          item.value = total2;
          return {
            itemCode: 1002,
            amount: total2,
          };
        }
        if (item.itemCode == 1003) {
          let total3 = initFormTab2PA120.value.healthInsuranceDeduction
            ? calculateLongTermCareInsurance(calculateVariables.totalTaxPay)
            : 0;
          item.value = total3;
          return {
            itemCode: 1003,
            amount: total3,
          };
        }
        if (item.itemCode == 1004) {
          let total4 =
            initFormTab2PA120.value.employeementInsuranceDeduction == true
              ? calculateEmployeementInsuranceEmployee(
                  calculateVariables.totalTaxPay,
                  initFormTab2PA120.value.employeementInsuranceSupportPercent
                )
              : 0;
          item.value = total4;
          return {
            itemCode: 1004,
            amount: total4,
          };
        }
      });
      isBtnYellow.value = false;
      if (!initFormTab2PA120.value?.employeementReductionStartDate) {
        rangeDate.value = [null, null];
      }
    };

    const calculateTax = () => {
      calcPension();
      triggerCalcIncome.value = true;
    };
    watch(
      () => initFormTab2PA120.value.insuranceSupport,
      (newVal) => {
        if (newVal) {
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
      },
      { immediate: true }
    );
    watch(
      () => initFormTab2PA120.value.nationalPensionDeduction,
      (newVal) => {
        if (newVal && initFormTab2PA120.value.insuranceSupport) {
          initFormTab2PA120.value.nationalPensionSupportPercent = 0;
        } else {
          delete initFormTab2PA120.value.nationalPensionSupportPercent;
        }
      },
      { immediate: true }
    );
    watch(
      () => initFormTab2PA120.value.employeementInsuranceDeduction,
      (newVal) => {
        if (newVal && initFormTab2PA120.value.insuranceSupport) {
          initFormTab2PA120.value.employeementInsuranceSupportPercent = 0;
        } else {
          delete initFormTab2PA120.value.employeementInsuranceSupportPercent;
        }
      },
      { immediate: true }
    );
    watch(
      () => initFormTab2PA120.value.employeementReduction,
      (newVal) => {
        if (newVal) {
          initFormTab2PA120.value.employeementReductionRatePercent = 50;
          initFormTab2PA120.value.employeementReductionInput = 1;
          rangeDate.value = [dayjs(), dayjs()];
          initFormTab2PA120.value.employeementReductionStartDate =
            filters.formatDateToInterger(rangeDate.value[0]);
          initFormTab2PA120.value.employeementReductionFinishDate =
            filters.formatDateToInterger(rangeDate.value[1]);
        } else {
          delete initFormTab2PA120.value.employeementReductionRatePercent;
          delete initFormTab2PA120.value.employeementReductionInput;
          delete initFormTab2PA120.value.employeementReductionStartDate;
          delete initFormTab2PA120.value.employeementReductionFinishDate;
          rangeDate.value = [null, null];
        }
      },
      { immediate: true }
    );

    // watch president to disable employeementInsuranceDeduction
    const presidentPA120 = computed(() => store.state.common.presidentPA120);
    watch(
      () => presidentPA120.value,
      (newValue) => {
        if (newValue) {
          initFormTab2PA120.value.nationalPensionDeduction = true;
          initFormTab2PA120.value.healthInsuranceDeduction = true;
          initFormTab2PA120.value.employeementInsuranceDeduction = false;
        } else {
          initFormTab2PA120.value.nationalPensionDeduction = true;
          initFormTab2PA120.value.healthInsuranceDeduction = true;
          initFormTab2PA120.value.employeementInsuranceDeduction = true;
        }
        store.state.common.editRowTab2PA120 = { ...initFormTab2PA120.value };
      },
      { immediate: true }
    ); //  // watch initFormTab2PA120 to check calculate button
    let countConfigPayItems = ref(0);
    watch(
      () => initFormTab2PA120.value.payItems,
      (newVal) => {
        if (countConfigPayItems.value < 1) {
          countConfigPayItems.value++;
          return;
        } else {
          isBtnYellow.value = true;
        }
      },
      { deep: true }
    );

    //  // watch initFormTab2PA120.value to check calculate button

    const isBtnYellow = ref(false);
    const compareForm = () => {
      const { deductionItems, payItems, ...rest } = initFormTab2PA120.value;
      const {
        deductionItems: de2,
        payItems: pa2,
        ...rest2
      } = editRowTab2PA120.value;
      return JSON.stringify(rest) == JSON.stringify(rest2);
    };
    let countRestFirstRun = ref(0);
    watchEffect(() => {
      const { deductionItems, payItems, ...rest } = initFormTab2PA120.value;
      if (countRestFirstRun.value < 2) {
        countRestFirstRun.value++;
        return;
      }
      if (initFormTab2PA120.value) {
        if (!compareForm()) {
          isBtnYellow.value = true;
        } else {
          isBtnYellow.value = false;
        }
      }
    });

    /**
     *  Save form
     */
    const { mutate, onError, onDone } = useMutation(
      mutations.saveEmployeeWagePayDeductionReduction
    );
    const createDeduction = () => {
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
        employeeId: +initFormStateTabPA120.value.employeeId,
        input: {
          ...payLoadData,
        },
      };
      mutate(variables);
    };
    onError((e) => {
      //notification('error', e.message);
      store.commit("common/actionFormErrorPA120");
    });

    onDone((res) => {
      countRestFirstRun.value = 1;
      isBtnYellow.value = false;
      emit("closePopup", false);
      notification("success", Message.getMessage("COMMON", "106").message);
      store.commit("common/actionFormDonePA120");
      store.state.common.editRowTab2PA120 = { ...initFormTab2PA120.value };
    });

    //--------------------------------disabledDeduction---------------------------------------

    const disabledDeduction = (e: any) => {
      if (!initFormTab2PA120.value.nationalPensionDeduction && e == 1001) {
        initFormTab2PA120.value.deductionItems[0].value = 0;
        return true;
      }
      if (
        !initFormTab2PA120.value.healthInsuranceDeduction &&
        (e == 1002 || e == 1003)
      ) {
        initFormTab2PA120.value.deductionItems[1].value = 0;
        initFormTab2PA120.value.deductionItems[2].value = 0;

        return true;
      }
      if (
        !initFormTab2PA120.value.employeementInsuranceDeduction &&
        e == 1004
      ) {
        initFormTab2PA120.value.deductionItems[3].value = 0;
        return true;
      }
      return false;
    };
    const handleFocusOut = (e: any, item: any) => {
      let valueInput = e.event.target.value;
      if (item === 1012 && valueInput < 1000) {
        initFormTab2PA120.value.deductionItems[5].value = 0;
      }
    };

    return {
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
      presidentPA120,
      isBtnYellow,
      isDisableInsuranceSupport,
      onCalcSum,
      disabledDeduction,
      modalCalc,
      msgCalc,
      vnode,
      initFormTab2PA120,
      editRowTab2PA120,
      localIncomeBoo,
      localReal,
      handleFocusOut,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../style/style.scss";
</style>
