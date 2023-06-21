<template>
  <div id="tab2-pa520">
    <a-spin :spinning="loadingEmployeeWageDaily" size="large">
      <div class="header-text-1">공제</div>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item
            label="4대보험 공제 여부"
            label-align="right"
            class="ins-dedu"
          >
            <div class="d-flex-center">
              <checkbox-basic
                size="14px"
                label="국민연금"
                class="check-box-tab1"
                v-model:valueCheckbox="
                  originDataUpdate.input.nationalPensionDeduction
                "
                :disabled="true"
              />
              <checkbox-basic
                size="14px"
                label="건강보험"
                class="check-box-tab1"
                v-model:valueCheckbox="
                  originDataUpdate.input.healthInsuranceDeduction
                "
                :disabled="true"
              />
              <checkbox-basic
                size="14px"
                label="고용보험"
                class="check-box-tab1"
                v-model:valueCheckbox="
                  originDataUpdate.input.employeementInsuranceDeduction
                "
              />
              <info-tool-tip width="310px">
                본 항목은 공제 계산을 위한 설정으로 실제 4대보험
                신고 여부와는 무관합니다.
              </info-tool-tip>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <div class="header-text-2">
            <a-row>
              <a-col :span="14"> 두루누리사회보험 공제 </a-col>
              <a-col :span="10" class="switch-bg">
                <span>두루누리사회보험 공제 여부 :</span>
                <switch-basic
                  textCheck="Y"
                  textUnCheck="N"
                  v-model:valueSwitch="originDataUpdate.input.insuranceSupport"
                  class="switch-insurance"
                />
              </a-col>
            </a-row>
          </div>

          <a-form-item
            label="국민연금 적용율"
            label-align="right"
            class="custom-style-label"
          >
            <radio-group
              :arrayValue="radioCheckPersenPension"
              v-model:valueRadioCheck="
                originDataUpdate.input.nationalPensionSupportPercent
              "
              layoutCustom="horizontal"
              :disabled="true"
            />
          </a-form-item>
          <a-form-item
            label="고용보험 적용율"
            label-align="right"
            class="custom-style-label"
          >
            <radio-group
              :arrayValue="radioCheckPersenPension"
              v-model:valueRadioCheck="
                originDataUpdate.input.employeementInsuranceSupportPercent
              "
              layoutCustom="horizontal"
              :disabled="
                !originDataUpdate.input.employeementInsuranceDeduction ||
                !originDataUpdate.input.insuranceSupport
              "
            />
          </a-form-item>
        </a-col>
      </a-row>
      <div class="header-text-3">
        급여 (기본값)
        <span>
          <info-tool-tip
            >급여소득자료 입력시 본 급여 기본값을 불러옵니다</info-tool-tip
          >
          <!-- <img src="@/assets/images/iconInfoWrite.png" style="width: 16px;">
                <p style="font-size: 10px; font-weight: 400;">급여소득자료 입력시 본 급여 기본값을 불러옵니다</p> -->
        </span>
      </div>
      <a-row :gutter="16">
        <a-col :span="24"
          ><b>차인지급액 </b>
           <b
            >{{
              $filters.formatCurrency(
                originDataUpdate.input.monthlyWage - totalDeduction
              )
            }}
            원</b
          >
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="10">
          <div class="header-text-0">
            <span>
              월급여
              {{
                $filters.formatCurrency(originDataUpdate.input.monthlyWage)
              }}
              원
            </span>
          </div>
          <div>
            <a-form-item label="일급/월급">
              <div class="d-flex-center">
                <switch-basic
                  textCheck="일급"
                  textUnCheck="월급"
                  class="mr-10 custom-switch"
                  v-model:valueSwitch="originDataUpdate.input.monthlyPaycheck"
                />
                <number-box-money
                  :min="0"
                  width="100px"
                  class="mr-5"
                  v-if="!originDataUpdate.input.monthlyPaycheck"
                  v-model:valueInput="originDataUpdate.input.monthlyWage"
                  placeholder="월급여"
                  @changeInput="onChangeMonthlyWage"
                />
                <number-box-money
                  :min="0"
                  width="100px"
                  class="mr-5"
                  v-else
                  v-model:valueInput="originDataUpdate.input.dailyWage"
                  placeholder="일급여"
                  @changeInput="onChangeDailyWage"
                />
                <info-tool-tip>
                  {{
                    originDataUpdate.input.monthlyPaycheck
                      ? messageMonthlySalary
                      : messageDaylySalary
                  }}</info-tool-tip
                >
              </div>
            </a-form-item>
            <!-- <div class="mb-5">
                        <img src="@/assets/images/iconInfo.png" style="width: 16px;">
                        <span class="pl-5 fz-11" style="font-size: 10px; color: #888888">
                            {{ originDataUpdate.input.monthlyPaycheck ? messageMonthlySalary : messageDaylySalary }}
                        </span>
                    </div> -->
            <a-form-item label="근무일수">
              <div class="d-flex-center">
                <standard-form ref="workingDayInput">
                  <number-box
                    width="170px"
                    class="mr-3"
                    v-model:valueInput="originDataUpdate.input.workingDays"
                    @changeInput="onChangeWorkingDays"   
                    :max="31"
                    :required="true"
                  />
                </standard-form>
                <span class="ml-2">일</span>
              </div>
            </a-form-item>
            <div>
              일급여:
              <b>
                {{
                  $filters.formatCurrency(originDataUpdate.input.dailyWage)
                }}
                원</b
              >
            </div>
            <div>
              월급여:
              <b>
                {{
                  $filters.formatCurrency(originDataUpdate.input.monthlyWage)
                }}
                원</b
              >
            </div>
          </div>
        </a-col>
        <a-col :span="14">
          <div class="header-text-0">
            <span
              >공제 항목 {{ $filters.formatCurrency(totalDeduction) }} 원</span
            >
          </div>
          <a-spin :spinning="loading" size="large">
            <div class="deduction-main">
              <div
                v-for="(item, index) in arrDeduction"
                class="custom-deduction"
                :key="index"
              >
                <span>
                  <deduction-items
                    :name="item.name"
                    :type="4"
                    subName="공제"
                    width="100px"
                    :showTooltip="false"
                  />
                </span>
                <div>
                  <number-box-money
                    :min="0"
                    width="150px"
                    :spinButtons="false"
                    v-model:valueInput="item.price"
                    :disabled="isDisableDeduction(item.itemCode)"
                  />
                  <span class="pl-5">원</span>
                </div>
              </div>
            </div>
          </a-spin>
        </a-col>
      </a-row>
      <div class="button-action">
        <button-tooltip-error
          :statusChange="isBtnYellow"
          v-model:showError="validateCalculate"
          @onClick="modalCalc = true"
          text="공제계산"
        />
        <button-basic
          text="저장"
          type="default"
          mode="contained"
          class="ml-5"
          @onClick="actionUpdated"
          id="action-update"
        />
      </div>
      <div style="text-align: center; margin-top: 15px">
        <span>
          ※ {입력값 수정} → [공제 계산] 클릭 → {결과 확인} → [저장] 클릭
        </span>
      </div>
    </a-spin>
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
import { defineComponent, ref, computed, watch, h } from "vue";
import {
  radioCheckPersenPension,
  originDataInputUpdate,
} from "../../utils/index";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useStore } from "vuex";
import queries from "@/graphql/queries/PA/PA5/PA520/index";
import {
  companyId,
  calculateNationalPensionEmployee,
  calculateHealthInsuranceEmployee,
  calculateLongTermCareInsurance,
  calculateEmployeementInsuranceEmployee,
} from "@/helpers/commonFunction";
import mutations from "@/graphql/mutations/PA/PA5/PA520/index";
import notification from "@/utils/notification";
import { Formula } from "@bankda/jangbuda-common";
import { ClickYearStatus, FormStatus } from "@/store/settingModule/types";
import { Message } from "@/configs/enum";
const vnode = h("div", [
  h("div", "입력된 수당으로 공제를 계산하여, 새로운 공제 금액이 입력됩니다. "),
  h("div", " 그래도 계산하시겠습니까?"),
]);
export default defineComponent({
  props: {
    modalStatus: Boolean,
  },
  setup(props, { emit }) {
    let dataReturn = ref();
    const workingDayInput = ref();
    const messageMonthlySalary = ref("일급 선택시, 월급 = 일급 x 근무일수");
    const messageDaylySalary = ref("월급 선택시, 일급 = 월급 / 근무일수");
    const store = useStore();
    const globalYear: any = computed(() =>
      parseInt(sessionStorage.getItem("paYear") ?? "0")
    );
    const clickYearStatus = computed(
      () => store.getters["settings/clickYearStatus"]
    );
    const idRowEdit = computed(
      () => store.getters["common/idRowCurrentEditPA520"]
    );
    //const tab2IsChange = computed(() => store.getters['common/checkChangeValueEditTab2PA520']);
    const totalDeduction = ref(0);
    const arrDeduction: any = ref();
    const isBtnYellow = ref(false);
    const modalCalc = ref(false);
    const validateCalculate = ref(false);
    const caculateDone = ref(false);
    const msgCalc = Message.getMessage("PA120", "004");
    const originData = ref({
      companyId: companyId,
      imputedYear: globalYear,
    });
    const originDataDetail = ref({
      companyId: companyId,
      imputedYear: globalYear,
      employeeId: idRowEdit,
    });
    let originDataUpdate: any = ref({
      companyId: companyId,
      imputedYear: globalYear.value,
      employeeId: idRowEdit.value,
      input: {
        ... JSON.parse(JSON.stringify(originDataInputUpdate)),
      },
    });
    let trigger = ref(false);
    let dataDefaultGet = ref();
    // ================== GRAPQL ====================================

    const { loading: loading, onResult: resWithholdingConfigPayItems } =
      useQuery(queries.getWithholdingConfigDeductionItems, originData, () => ({
        fetchPolicy: "no-cache",
      }));
    resWithholdingConfigPayItems((res) => {
      arrDeduction.value = [];
      res.data.getWithholdingConfigDeductionItems.map((val: any) => {
        if ([1001, 1002, 1003, 1004, 1011, 1012].includes(val.itemCode)) {
          let price = funcCheckPrice(val.itemCode);
          arrDeduction.value.push({
            ...val,
            price: price,
          });
        }
      });
    });

    const {
      loading: loadingEmployeeWageDaily,
      refetch: refectchDetail,
      onResult: resApiGetEmployeeWageDaily,
    } = useQuery(queries.getEmployeeWageDaily, originDataDetail, () => ({
      enabled: trigger.value,
      fetchPolicy: "no-cache",
    }));

    resApiGetEmployeeWageDaily((dtValue: any) => {
      trigger.value = false;
      validateCalculate.value = false;
      isBtnYellow.value = false;
      if (dtValue.data) {
        let res = dtValue.data.getEmployeeWageDaily;

        originDataUpdate.value.employeeId = res.employeeId;
        originDataUpdate.value.input.nationalPensionDeduction =
          res.nationalPensionDeduction;
        originDataUpdate.value.input.healthInsuranceDeduction =
          res.healthInsuranceDeduction;
        originDataUpdate.value.input.longTermCareInsuranceDeduction =
          res.longTermCareInsuranceDeduction;
        originDataUpdate.value.input.employeementInsuranceDeduction =
          res.employeementInsuranceDeduction;
        originDataUpdate.value.input.insuranceSupport = res.insuranceSupport;

        originDataUpdate.value.input.nationalPensionSupportPercent =
          res.nationalPensionSupportPercent == null
            ? 0
            : res.nationalPensionSupportPercent;
        originDataUpdate.value.input.employeementInsuranceSupportPercent =
          res.employeementInsuranceSupportPercent == null
            ? 0
            : res.employeementInsuranceSupportPercent;
        originDataUpdate.value.input.monthlyPaycheck = res.monthlyPaycheck;
        originDataUpdate.value.input.workingDays = res.workingDays;
        originDataUpdate.value.input.dailyWage = res.dailyWage;
        originDataUpdate.value.input.monthlyWage = res.monthlyWage;
        dataReturn.value = res.deductionItems;
        // delay push data to form caculate
        let dataAddDedution: any = [];
        arrDeduction.value?.map((val: any) => {
          let arrReturn = addDedution(val.itemCode);
          if (arrReturn.itemCode) {
            val.price = arrReturn.amount;
            dataAddDedution.push({
              itemCode: arrReturn.itemCode,
              amount: arrReturn.amount,
            });
          } else {
            val.price = 0;
            dataAddDedution.push({ itemCode: val.itemCode, amount: 0 });
          }
        });
        if (dataAddDedution)
          originDataUpdate.value.input.deductionItems = dataAddDedution;
        dataDefaultGet.value = JSON.stringify(originDataUpdate.value);
      }
    });
    const { mutate, onError, onDone } = useMutation(
      mutations.saveEmployeeWageDailyPayDeduction
    );
    onError((e) => {
      //notification('error', e.message)
    });
    onDone((result) => {
      store.state.common.rowIdSaveDonePa520 = result.data.employeeId;
      store.commit("common/setCheckEditTab2PA520", false);
      trigger.value = true;
      refectchDetail();
      emit("closePopup", false);
      notification("success", Message.getCommonMessage("106").message);
      if (clickYearStatus.value !== ClickYearStatus.none)
        store.commit("settings/setCurrentYear");
    });
    // ================== WATCH ====================================
    watch(
      () => originDataUpdate.value,
      (newVal) => {
        let valueConvert = JSON.parse(dataDefaultGet.value);
        if (JSON.stringify(newVal) === JSON.stringify(valueConvert)) {
          store.commit("common/setCheckEditTab2PA520", false);
          store.commit("settings/setFormStatus", FormStatus.none);
        } else {
          store.commit("common/setCheckEditTab2PA520", true);
          store.commit("settings/setFormStatus", FormStatus.editing);
        }
      },
      { deep: true }
    );

    //call api on tab 2 for the first time
    if (store.state.common.idRowChangePa520 != 0) {
      trigger.value = true;
      refectchDetail();
    }

    // call api on tab 2 next time
    watch(
      idRowEdit,
      (res) => {
        //if (!tab2IsChange.value && !isBtnYellow.value && idRowEdit.value) {
        trigger.value = true;
        refectchDetail();
        //}
        store.commit("common/setCheckEditTab2PA520", false);
      },
      { deep: true }
    );
    watch(
      () => arrDeduction,
      (res) => {
        let total = 0;
        res.value.map((val: any) => {
          total += val.price;
        });
        totalDeduction.value = total;
        let arrCallApi: any = [];
        arrDeduction.value?.map((val: any) => {
          arrCallApi.push({
            itemCode: val.deductionItemCode,
            amount: val.price,
          });
        });
        originDataUpdate.value.input.deductionItems = arrCallApi;
      },
      { deep: true }
    );

    watch(
      () => store.state.common.actionUpdateTab2PA520,
      () => {
        //if (!isBtnYellow.value) {
          store.commit("common/setTab2ValidateEditPA520", false);
          actionUpdated();
          originDataDetail.value.employeeId = idRowEdit;
          trigger.value = true;
          refectchDetail();
        //} else {
          // If you are filling out the form and haven't calculated it,
          // but click on the add button,
          // then reset the state of clicking on the add button with false
          if (store.state.common.addBtOnclickPA520)
            store.state.common.addBtOnclickPA520 = false;
          // store.commit("common/setTab2ValidateEditPA520", true);
          // validateCalculate.value = true;
        //}
      }
    );

    // if any change in tab 2 color button is change color orage
    watch(
      [
        () => originDataUpdate.value.input.nationalPensionDeduction,
        () => originDataUpdate.value.input.healthInsuranceDeduction,
        () => originDataUpdate.value.input.employeementInsuranceDeduction,
        () => originDataUpdate.value.input.monthlyWage,
        () => originDataUpdate.value.input.workingDays,
        () => originDataUpdate.value.input.nationalPensionSupportPercent,
        () => originDataUpdate.value.input.employeementInsuranceSupportPercent,
        () => originDataUpdate.value.input.insuranceSupport,
      ],
      () => {

        // delete item  no need in object , Just compare item watching
        let defValue = cleanObject(JSON.parse(dataDefaultGet.value).input);
        let originValue = cleanObject(
          JSON.parse(JSON.stringify(originDataUpdate.value.input))
        );
        // Compare two object if different change button color to orange
        if (JSON.stringify(defValue) !== JSON.stringify(originValue)) {
          console.log(defValue);
          console.log(originValue);
          isBtnYellow.value = true;
        } else {
          isBtnYellow.value = false;
          validateCalculate.value = false;
        }
      }
    );
    // clean but the field is not needed when comparing object
    const cleanObject = (object: any) => {
      delete object.longTermCareInsuranceDeduction;
      //delete object.insuranceSupport
      delete object.monthlyPaycheck;
      delete object.dailyWage;
      delete object.deductionItems;
      return object;
    };
    // ================== FUNCTION ==================================
    const actionUpdated = () => {
      // if (isBtnYellow.value) {
      //   validateCalculate.value = true
      //   store.commit('common/setTab2ValidateEditPA520', true)
      //   store.commit('settings/setFormStatus',FormStatus.editing)
      // } else {
      mutate(originDataUpdate.value);
      store.commit("common/setCheckEditTab2PA520", false);
      // }
    };
    const calculateTax = () => {
      callFuncCalculate();
    };
    const callFuncCalculate = async () => {
      let dataDefault = originDataUpdate.value.input;
      var res = workingDayInput.value.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
        return;
      } else {
        let total1 =
          dataDefault.nationalPensionDeduction == true
            ? calculateNationalPensionEmployee(
                dataDefault.monthlyWage,
                dataDefault.nationalPensionSupportPercent
              )
            : 0;
        let total2 =
          dataDefault.healthInsuranceDeduction == true
            ? calculateHealthInsuranceEmployee(dataDefault.monthlyWage)
            : 0;
        let total3 =
          dataDefault.healthInsuranceDeduction == true
            ? calculateLongTermCareInsurance(dataDefault.monthlyWage)
            : 0;
        let total4 =
          dataDefault.employeementInsuranceDeduction == true
            ? calculateEmployeementInsuranceEmployee(
                dataDefault.monthlyWage,
                dataDefault.employeementInsuranceSupportPercent
              )
            : 0;
        let total5 = await Formula.getDailyEmployeeTax(
          202210,
          dataDefault.workingDays,
          dataDefault.dailyWage,
          dataDefault.monthlyWage
        ).incomeTax;

        let total6 = await Formula.getDailyEmployeeTax(
          202210,
          dataDefault.workingDays,
          dataDefault.dailyWage,
          dataDefault.monthlyWage
        ).localIncomeTax;
        let arrCallApi: any = [];
        arrDeduction.value?.map((val: any) => {
          delete val.__typename;
          if (val.deductionItemCode == 1001) val.price = total1;
          if (val.deductionItemCode == 1002) val.price = total2;
          if (val.deductionItemCode == 1003) val.price = total3;
          if (val.deductionItemCode == 1004) val.price = total4;
          if (val.deductionItemCode == 1011) val.price = total5;
          if (val.deductionItemCode == 1012) val.price = total6;
          arrCallApi.push({
            itemCode: val.deductionItemCode,
            amount: val.price,
          });
        });
        originDataUpdate.value.input.deductionItems = arrCallApi;
        isBtnYellow.value = false;
        validateCalculate.value = false;
        store.state.common.isTab2ValidateEditPA520 = false;
      }
    };
    const funcCheckPrice = (id: any) => {
      let price = 0;
      originDataUpdate.value.input.deductionItems.map((val: any) => {
        if (val.itemCode == id) price = val.amount;
      });
      return price;
    };
    const addDedution = (id: any) => {
      let arrReturn: any = [];
      dataReturn.value.map((val: any) => {
        if (id == val.itemCode) {
          arrReturn = val;
          delete val.__typename;
        }
      });
      return arrReturn;
    };
    // LOGIC FORM
    const onChangeDailyWage = () => {
      let monthlyWage = Math.floor(
        originDataUpdate.value.input.dailyWage *
          (originDataUpdate.value.input.workingDays > 0
            ? originDataUpdate.value.input.workingDays
            : 0)
      );
      originDataUpdate.value.input.monthlyWage = monthlyWage;
    };
    const onChangeMonthlyWage = () => {
      let dailyWage = Math.floor(
        originDataUpdate.value.input.workingDays > 0
          ? originDataUpdate.value.input.monthlyWage /
              originDataUpdate.value.input.workingDays
          : 0
      );
      originDataUpdate.value.input.dailyWage = dailyWage;
    };
    const onChangeWorkingDays = () => {
      if (originDataUpdate.value.input.monthlyPaycheck) {
        let monthlyWage = Math.floor(
          originDataUpdate.value.input.dailyWage *
            (originDataUpdate.value.input.workingDays > 0
              ? originDataUpdate.value.input.workingDays
              : 0)
        );
        originDataUpdate.value.input.monthlyWage = monthlyWage;
      } else {
        let dailyWage = Math.floor(
          originDataUpdate.value.input.workingDays > 0
            ? originDataUpdate.value.input.monthlyWage /
                originDataUpdate.value.input.workingDays
            : 0
        );
        originDataUpdate.value.input.dailyWage = dailyWage;
      }
    };

    const isDisableDeduction = (itemCode: number) => {
      if (itemCode == 1011 || itemCode == 1012) {
        return false;
      }

      if (itemCode == 1001 || itemCode == 1002 || itemCode == 1003) {
        return true;
      }

      if (originDataUpdate.value.input.employeementInsuranceDeduction) {
        return false;
      } else {
        return true;
      }
    };
    return {
      dataDefaultGet,
      originDataDetail,
      store,
      originDataUpdate,
      messageMonthlySalary,
      totalDeduction,
      arrDeduction,
      radioCheckPersenPension,
      loading,
      loadingEmployeeWageDaily,
      messageDaylySalary,
      callFuncCalculate,
      actionUpdated,
      onChangeDailyWage,
      onChangeMonthlyWage,
      onChangeWorkingDays,
      caculateDone,
      isBtnYellow,
      validateCalculate,
      globalYear,
      idRowEdit,
      workingDayInput,
      isDisableDeduction,
      modalCalc,
      msgCalc,
      calculateTax,
      vnode,
    };
  },
});
</script>
<style lang="scss" scoped src="../../style/tab2.scss"></style>
