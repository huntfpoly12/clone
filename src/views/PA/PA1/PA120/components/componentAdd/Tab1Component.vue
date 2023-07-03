<template>
  <div id="tab1-pa120">
      <standard-form formName="tab1-pa120" :disabled="true">
        <a-form-item label="사번(코드)" label-align="right">
          <div class="input-text">
            <number-box
              width="200px"
              :min="1"
              :max="9999999999"
              :disabled="true"
              v-model:valueInput="formStateTab1PA120.employeeId"
            />
          </div>
        </a-form-item>

        <a-form-item label="대표자 여부 " label-align="right">
          <div class="input-text">
            <switch-basic
              :disabled="notDatasourcePA120"
              v-model:valueSwitch="formStateTab1PA120.president"
              textCheck="O"
              textUnCheck="X"
              style="width: 80px"
            ></switch-basic>
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title> 대표자인 경우 고용보험 제외됩니다. </template>
              <div style="text-align: center">
                <img
                  src="@/assets/images/iconInfo.png"
                  style="width: 14px; height: 14px"
                  class="mb-3 ml-10"
                />
              </div>
            </a-tooltip>
          </div>
        </a-form-item>

        <a-form-item label="성명" label-align="right" class="red">
          <default-text-box
            width="200px"
            :disabled="notDatasourcePA120"
            v-model:valueInput="formStateTab1PA120.name"
            @onChange="onChange"
            :required="true"
            placeholder="한글,영문(대문자) 입력 가능"
          />
        </a-form-item>
        <a-form-item label="입사년월일" label-align="right">
          <date-time-box
            width="150px"
            :disabled="notDatasourcePA120"
            v-model:valueDate="formStateTab1PA120.joinedAt"
          >
          </date-time-box>
        </a-form-item>
        <a-form-item label="퇴사년월일" label-align="right">
          <div class="input-text">
            <date-time-box
              width="150px"
              :disabled="notDatasourcePA120"
              v-model:valueDate="formStateTab1PA120.leavedAt"
            >
            </date-time-box>
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title> 마지막 근무한 날</template>
              <div style="text-align: center">
                <img
                  src="@/assets/images/iconInfo.png"
                  style="width: 14px; height: 14px"
                  class="mb-3 ml-10"
                />
              </div>
            </a-tooltip>
          </div>
        </a-form-item>

        <a-form-item label="내/외국인" label-align="right">
          <radio-group
            :arrayValue="radioCheckForeigner"
            :disabled="notDatasourcePA120"
            v-model:valueRadioCheck="formStateTab1PA120.foreigner"
            layoutCustom="horizontal"
            class="mt-1"
          ></radio-group>
        </a-form-item>
        <a-row>
          <a-form-item
            label="외국인 국적"
            label-align="right"
            :class="{ red: formStateTab1PA120.foreigner }"
          >
            <country-code-select-box
              style="width: 200px"
              v-model:valueCountry="formStateTab1PA120.nationalityCode"
              @textCountry="changeTextCountry"
              :required="formStateTab1PA120.foreigner"
              :disabled="!formStateTab1PA120.foreigner || notDatasourcePA120"
              :hiddenOptionKR="formStateTab1PA120.foreigner"
            />
          </a-form-item>
          <a-form-item
            label="외국인 체류자격"
            label-align="right"
            :class="{ red: formStateTab1PA120.foreigner }"
          >
            <stay-qualification-select-box
              v-model:valueStayQualifiction="
                formStateTab1PA120.stayQualification
              "
              :disabled="!formStateTab1PA120.foreigner || notDatasourcePA120"
              :required="formStateTab1PA120.foreigner"
            />
          </a-form-item>
        </a-row>

        <a-form-item :label="labelResidebId" label-align="right" class="red">
          <id-number-text-box
            :required="true"
            :disabled="notDatasourcePA120"
            v-model:valueInput="formStateTab1PA120.residentId"
            width="150px"
            :foreigner="formStateTab1PA120.foreigner"
          ></id-number-text-box>
        </a-form-item>

        <a-form-item label="주소정근무시간" label-align="right" class="red">
          <div class="input-text">
            <number-box
              :required="true"
              :spinButtons="true"
              :disabled="notDatasourcePA120"
              v-model:valueInput="formStateTab1PA120.weeklyWorkingHours"
              width="150px"
              :min="1"
              :max="52"
            ></number-box>
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title>
                급여명세서 및 4대보험 취득신고시 이용됩니다.
              </template>
              <div style="text-align: center">
                <img
                  src="@/assets/images/iconInfo.png"
                  style="width: 14px; height: 14px"
                  class="mb-3 ml-10"
                />
              </div>
            </a-tooltip>
          </div>
        </a-form-item>

        <a-form-item label="세대주여부" label-align="right">
          <switch-basic
            :disabled="notDatasourcePA120"
            v-model:valueSwitch="formStateTab1PA120.householder"
            textCheck="O"
            textUnCheck="X"
            style="width: 80px"
          ></switch-basic>
        </a-form-item>

        <a-form-item label="주소" class="clr" label-align="left">
          <div class="zip-code">
            <default-text-box
              v-model:valueInput="formStateTab1PA120.roadAddress"
              width="300px"
              :disabled="true || notDatasourcePA120"
              class="roadAddress"
              placeholder="도로명주소"
            />
            <div style="margin-left: 5px">
              <post-code-button @dataAddress="funcAddress" text="주소검색" />
            </div>
          </div>
          <default-text-box
            :disabled="notDatasourcePA120"
            v-model:valueInput="formStateTab1PA120.addressExtend"
            width="300px"
            placeholder="상세 주소 입력"
          />
        </a-form-item>
        <a-form-item label="이메일" label-align="right">
          <div class="input-text">
            <mail-text-box
              :disabled="notDatasourcePA120"
              v-model:valueInput="formStateTab1PA120.email"
              width="200px"
              placeholder="abc@example.com"
            >
            </mail-text-box>
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title>
                원천징수영수증 등 주요 서류를 메일로 전달 가능합니다.
              </template>
              <div style="text-align: center">
                <img
                  src="@/assets/images/iconInfo.png"
                  style="width: 14px; height: 14px"
                  class="mb-3 ml-10"
                />
              </div>
            </a-tooltip>
          </div>
        </a-form-item>
        <a-form-item label="부서" label-align="right">
          <SelectSearchEdit
            v-model:valueInput="formStateTab1PA120.department"
            :data="arrDepartments"
            @updateArrSelect="(value: any) => arrDepartments = [...value]"
            width="200px"
          />
        </a-form-item>
        <a-form-item label="직위" label-align="right">
          <SelectSearchEdit
            v-model:valueInput="formStateTab1PA120.responsibility"
            :data="arrResponsibility"
            @updateArrSelect="(value: any) => arrResponsibility = [...value]"
            width="200px"
          />
        </a-form-item>
        <a-row class="mt-15">
          <a-col :span="8" :offset="8" style="text-align: center">
            <button-basic
              text="저장"
              type="default"
              mode="contained"
              :width="90"
              id="btn-save"
              @onClick="createNewEmployeeWage($event)"
              :disabled="notDatasourcePA120"
            />
          </a-col>
        </a-row>
      </standard-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA1/PA120/index";
import queries from "@/graphql/queries/common/index";
import notification from "@/utils/notification";
import {
  radioCheckForeigner,
  radioCheckHouseholder,
  initFormStateTab1,
  initFormStateTab2,
} from "../../utils/index";
import { companyId, makeDataClean } from "@/helpers/commonFunction";
import { Message } from "@/configs/enum";
import queriesPA120 from "@/graphql/queries/PA/PA1/PA120/index";
export default defineComponent({
  setup(props, { emit }) {
    const store = useStore();
    const globalYear = ref<number>(
      parseInt(sessionStorage.getItem("paYear") ?? "0")
    );
    const formStateTab1PA120 = computed(
      () => store.state.common.formStateTab1PA120
    );
    const formOriginTab1PA120 = computed(
      () => store.state.common.formOriginTab1PA120
    );
    const isNewRowPA120 = computed(() => store.state.common.isNewRowPA120);
    const notDatasourcePA120 = computed(
      //disabled all form
      () => store.state.common.notDatasourcePA120
    );
    const messageCreate = Message.getMessage("COMMON", "101").message;
    const companyParam = ref({
      companyId,
    });
    store.commit("common/createSucessTab1PA120", false);

    // --------------------------get Data Departments--------------------------

    const arrDepartments = ref<any>([]);
    const { onError: errorDepartments, result: resDepartments } = useQuery(
      queries.getDepartments,
      companyParam,
      () => ({
        enabled: companyId !== null,
        fetchPolicy: "no-cache",
      })
    );
    errorDepartments((_error) => {
      //notification('error', error.message);
    });

    watch(resDepartments, (value: any) => {
      if (value) {
        arrDepartments.value = value.getDepartments.map((item: any) => ({
          value: item.department,
        }));
      }
    });

    // --------------------------get Data Responsibilities--------------------------

    const arrResponsibility = ref<any[]>([]);
    const { onError: errorResponsibility, result: resResponsibility } =
      useQuery(queries.getResponsibilities, companyParam, () => ({
        fetchPolicy: "no-cache",
      }));

    errorResponsibility((_error) => {
      //notification('error', error.message);
    });

    watch(resResponsibility, (value: any) => {
      if (value) {
        arrResponsibility.value = value.getResponsibilities.map(
          (item: any) => ({ value: item.responsibility })
        );
      }
    });

    // ------------------------------- HANDEL DATA IN FORM--------------------------------

    const funcAddress = (data: any) => {
      formStateTab1PA120.value.roadAddress = data.roadAddress;
    };
    const onChange = (emitVal: any) => {
      formStateTab1PA120.value.name = emitVal.toUpperCase();
    };
    const changeTextCountry = (text: any) => {
      formStateTab1PA120.value.nationality = text;
    };
    //track foreigners
    const labelResidebId = ref("주민등록번호");
    watch(
      () => formStateTab1PA120.value.foreigner,
      (newValue: any) => {
        if (!newValue) {
          formStateTab1PA120.value.nationalityCode = "KR";
          formStateTab1PA120.value.stayQualification = null;
          formOriginTab1PA120.value.stayQualification = null;
          labelResidebId.value = "주민등록번호";
        } else {
          formStateTab1PA120.value.nationalityCode =
            formStateTab1PA120.value.nationalityCode == "KR"
              ? null
              : formStateTab1PA120.value.nationalityCode;
          labelResidebId.value = "외국인번호 유효성";
        }
        store.state.common.isForeignerPA120 =
          formStateTab1PA120.value.foreigner;
      },
      { deep: true }
    );

    //-------------------------------ACTION FORM -----------------------------
    let dataDefaultTab2: any = ref({ ...initFormStateTab2 }); // dataForm của tab 2
    // createEmployeeWage tab 1 api
    const {
      mutate: createEmployeeWage,
      onDone: onDoneAdd,
      onError,
    } = useMutation(mutations.createEmployeeWage);
    onDoneAdd((res: any) => {
      let { employeeId, deductionDependentCount } = res.data.createEmployeeWage;
      store.state.common.deductionDependentCountPA120 = deductionDependentCount;
      if (formStateTab1PA120.value.president) {
        dataDefaultTab2.value.nationalPensionDeduction = true;
        dataDefaultTab2.value.healthInsuranceDeduction = true;
        dataDefaultTab2.value.employeementInsuranceDeduction = false;
      } else {
        dataDefaultTab2.value.nationalPensionDeduction = true;
        dataDefaultTab2.value.healthInsuranceDeduction = true;
        dataDefaultTab2.value.employeementInsuranceDeduction = true;
      }
      
      dataDefaultTab2.value.payItems = store.state.common.payItemsPA120.map((item: any) => {
          return {
            itemCode: item.itemCode,
            amount: 0,
          };
        });
      dataDefaultTab2.value.deductionItems = store.state.common.deductionItemsPA120.map((item: any) => {
          return {
            itemCode: item.itemCode,
            amount: 0,
          };
        });
      mutate({
        companyId,
        imputedYear: globalYear.value,
        employeeId,
        input: { ...dataDefaultTab2.value },
      });
      emit("setTabsStatus", false);
      notification("success", messageCreate);
      store.state.common.isNewRowPA120 = false;
      store.commit("common/formOriginTab1PA120", formStateTab1PA120.value);
      formStateTab1PA120.value.employeeId = employeeId;
    });

    onError((error) => {
      notification("error", error.message);
      store.commit("common/actionFormErrorPA120");
    });

    // gọi thêm api ở tab 2 để save khi president == true
    // const originDataDetail = ref({
    //   companyId: companyId,
    //   imputedYear: globalYear.value,
    //   useOnly: true,
    // });
    // const payItemTrigger = ref(true);
    // const { result: resConfigPayItems } = useQuery(
    //   queriesPA120.getWithholdingConfigPayItems,
    //   originDataDetail,
    //   () => ({
    //     fetchPolicy: "no-cache",
    //     enabled: payItemTrigger.value,
    //   })
    // );
    // watch(resConfigPayItems, (value) => {
    //   console.log(11111223223);
      
    //   if (value) {
    //     let data = value.getWithholdingConfigPayItems;
    //     let dataConfigPayItem = data.map((item: any) => {
    //       return {
    //         itemCode: item.itemCode,
    //         amount: 0,
    //       };
    //     });
    //     dataDefaultTab2.value.payItems = JSON.parse(
    //       JSON.stringify(dataConfigPayItem)
    //     );
    //     payItemTrigger.value = false;
    //   }
    // });

    /**
     *  get Withouthoulding Config deduction
     */
    // const deductionTrigger = ref(true);
    // const { result: resConfigDeduction } = useQuery(
    //   queriesPA120.getWithholdingConfigDeductionItems,
    //   originDataDetail,
    //   () => ({
    //     fetchPolicy: "no-cache",
    //     enabled: deductionTrigger.value,
    //   })
    // );
    // watch(resConfigDeduction, (value) => {
    //   if (value) {
    //     let data = value.getWithholdingConfigDeductionItems;
    //     for (var i = 0; i < data.length; i++) {
    //       var item = data[i];
    //       if (item.itemCode == 1001) {
    //         dataDefaultTab2.value.deductionItems.push({
    //           itemCode: item.itemCode,
    //           amount: 0,
    //         });
    //       }
    //       if (item.itemCode == 1002) {
    //         dataDefaultTab2.value.deductionItems.push({
    //           itemCode: item.itemCode,
    //           amount: 0,
    //         });
    //       }
    //       if (item.itemCode == 1003) {
    //         dataDefaultTab2.value.deductionItems.push({
    //           itemCode: item.itemCode,
    //           amount: 0,
    //         });
    //       }
    //       if (item.itemCode == 1004) {
    //         dataDefaultTab2.value.deductionItems.push({
    //           itemCode: item.itemCode,
    //           amount: 0,
    //         });
    //       }
    //       if (item.itemCode == 1011) {
    //         dataDefaultTab2.value.deductionItems.push({
    //           itemCode: item.itemCode,
    //           amount: 0,
    //         });
    //       }
    //       if (item.itemCode == 1012) {
    //         dataDefaultTab2.value.deductionItems.push({
    //           itemCode: item.itemCode,
    //           amount: 0,
    //         });
    //       }
    //     }
    //     deductionTrigger.value = false;
    //   }
    // });
    //api save tab 2
    const { mutate, onDone: onDoneSaveEmployee } = useMutation(
      mutations.saveEmployeeWagePayDeductionReduction
    );
    onDoneSaveEmployee(() => {
      store.state.common.employeeIdPA120 = formStateTab1PA120.value.employeeId;
      store.commit("common/createSucessTab1PA120", true);
      store.commit("common/actionFormDonePA120");
    });
    const formParam = reactive({
      companyId,
      imputedYear: globalYear,
    });
    const createNewEmployeeWage = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
        store.state.common.isNewRowPA120 = true;
        store.commit("common/actionFormErrorPA120");
      } else {
        let formData = {
          ...formStateTab1PA120.value,
          employeeId: +formStateTab1PA120.value.employeeId,
        };
        delete formData.key;
        delete formData.deletable;
        delete formData.employeeId;
        makeDataClean(formData);
        let dataNew: any = {
          ...formParam,
          input: {
            ...formData,
            joinedAt: +formStateTab1PA120.value.joinedAt,
            leavedAt: formStateTab1PA120.value.leavedAt,
          },
        };
        createEmployeeWage(dataNew);
      }
    };
    return {
      companyId,
      formStateTab1PA120,
      labelResidebId,
      funcAddress,
      radioCheckForeigner,
      radioCheckHouseholder,
      initFormStateTab1,
      createNewEmployeeWage,
      arrDepartments,
      arrResponsibility,
      changeTextCountry,
      onChange,
      isNewRowPA120,
      notDatasourcePA120,
    };
  },
});
</script>
<style lang="scss" scoped>
#tab1-pa120 {
  ::v-deep .ant-form-item-label > label {
    width: 135px;
    padding-left: 10px;
  }

  .input-text {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }
  }

  ::v-deep .red {
    label {
      color: red;
    }
  }

  .zip-code {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
}
</style>
