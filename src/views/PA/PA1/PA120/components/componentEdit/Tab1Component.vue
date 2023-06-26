<template>
  <div id="tab1-pa120">
    <a-spin :spinning="loading" size="large">
      <!-- {{ getEmployeeParam }} getEmployeeParam <br />
      {{ employeeIdPA120 }} employeeIdPA120 <br /> -->
      <standard-form formName="tab1-pa120">
        <a-form-item label="사번(코드)" label-align="right" class="red">
          <div class="input-text">
            <text-number-box
              width="200px"
              :required="true"
              v-model:valueInput="formStateTab1PA120.employeeId"
              placeholder="숫자만 입력 가능"
              :disabled="true"
            />
          </div>
        </a-form-item>
        <a-form-item label="대표자 여부" label-align="right">
          <div class="input-text">
            <switch-basic
              v-model:valueSwitch="formStateTab1PA120.president"
              textCheck="O"
              textUnCheck="X"
              @onChange="onChangePresident"
              style="width: 80px"
            ></switch-basic>
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title> 대표자인 경우 고용보험 제외됩니</template>
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
            v-model:valueInput="formStateTab1PA120.name"
            :required="true"
            @onChange="onChange"
            placeholder="한글,영문(대문자) 입력 가능"
          />
        </a-form-item>
        <a-form-item label="입사년월일" label-align="right">
          <date-time-box
            width="150px"
            v-model:valueDate="formStateTab1PA120.joinedAt"
          >
          </date-time-box>
        </a-form-item>
        <a-form-item label="퇴사년월일" label-align="right">
          <div class="input-text">
            <date-time-box
              width="150px"
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
            v-model:valueRadioCheck="formStateTab1PA120.foreigner"
            layoutCustom="horizontal"
            :disabled="!formStateTab1PA120.deletable"
          >
          </radio-group>
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
              :disabled="!formStateTab1PA120.foreigner"
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
              :disabled="!formStateTab1PA120.foreigner"
              :required="formStateTab1PA120.foreigner"
            />
          </a-form-item>
        </a-row>

        <a-form-item :label="labelResidebId" label-align="right" class="red">
          <id-number-text-box
            :required="true"
            v-model:valueInput="formStateTab1PA120.residentId"
            width="150px"
            :foreigner="formStateTab1PA120.foreigner"
            :disabled="!formStateTab1PA120.deletable"
          >
          </id-number-text-box>
        </a-form-item>

        <a-form-item label="주소정근무시간" label-align="right" class="red">
          <div class="input-text">
            <number-box
              :required="true"
              :spinButtons="true"
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
              :disabled="true"
              class="roadAddress"
              placeholder="도로명주소"
            />
            <div style="margin-left: 5px">
              <post-code-button @dataAddress="funcAddress" text="주소검색" />
            </div>
          </div>

          <default-text-box
            v-model:valueInput="formStateTab1PA120.addressExtend"
            width="300px"
            placeholder="상세 주소 입력"
          />
        </a-form-item>
        <a-form-item label="이메일" label-align="right">
          <div class="input-text">
            <mail-text-box
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
              id="btn-save-edit"
              @onClick="actionUpdated"
            />
          </a-col>
        </a-row>
      </standard-form>
    </a-spin>
    <PopupMessage
      :modalStatus="presidenStatus"
      @closePopup="presidenStatus = false"
      :typeModal="'info'"
      :title="presidentWaring"
      :content="''"
      :okText="'확인'"
      :isConfirmIcon="false"
      @checkConfirm="presidenStatus = false"
      :width="400"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA1/PA120/index";
import queries from "@/graphql/queries/PA/PA1/PA120/index";
import notification from "@/utils/notification";
import { radioCheckForeigner } from "../../utils/index";
import { companyId, makeDataClean } from "@/helpers/commonFunction";
import { Message } from "@/configs/enum";
export default defineComponent({
  setup(props, { emit }) {
    const store = useStore();
    const globalYear = ref<number>(
      parseInt(sessionStorage.getItem("paYear") || "0")
    );
    const messageUpdate = Message.getMessage("COMMON", "106").message;
    const formStateTab1PA120 = computed(
      () => store.state.common.formStateTab1PA120
    );
    const formOriginTab1PA120 = computed(
      () => store.state.common.formOriginTab1PA120
    );
    // check xem khi lưu president có bị thay đổi ko ?
    const presidentOriginPA120 = computed(
      () => store.state.common.presidentOriginPA120
    );
    const companyParam = ref({
      companyId: companyId,
    });
    const employeeIdPA120 = computed(() => store.state.common.employeeIdPA120);

    // ---------------------------get employee DATA FORM ------------------------

    const getEmployeeParam = ref<any>({
      companyId: companyId,
      imputedYear: globalYear.value,
      employeeId: employeeIdPA120.value,
    });
    const getEmployeeWageTrigger = ref(getEmployeeParam.value.employeeId !== null);
    const {
      result: getValueDefault,
      loading,
      onError: onErrorEmployee,
    } = useQuery(queries.getEmployeeWage, getEmployeeParam, () => ({
      enabled: getEmployeeWageTrigger.value,
      fetchPolicy: "no-cache",
    }));
    onErrorEmployee(() => {
      // console.log(`output->err tab1`,)
    });
    watch(getValueDefault, (value: any) => {
      let data = value.getEmployeeWage;
      let editRowData: any = {};
      store.state.common.deductionDependentCountPA120 =
        data?.deductionDependentCount || 1;
      editRowData.name = data.name.toUpperCase();
      editRowData.foreigner = data.foreigner;
      store.state.common.presidentOriginPA120 = data.president;
      editRowData.president = data.president;
      editRowData.nationality = data.nationality;
      editRowData.nationalityCode = data.nationalityCode;
      editRowData.stayQualification = data.stayQualification;
      editRowData.residentId = data.residentId.replace("-", "");
      editRowData.roadAddress = data.roadAddress;
      editRowData.addressExtend = data.addressExtend;
      editRowData.email = data.email;
      editRowData.employeeId = data.employeeId;
      editRowData.joinedAt = data.joinedAt || NaN;
      editRowData.leavedAt = data.leavedAt || NaN;
      editRowData.retirementIncome = data.retirementIncome;
      editRowData.weeklyWorkingHours = data.weeklyWorkingHours;
      editRowData.householder = data.householder;
      editRowData.department = data.department;
      editRowData.responsibility = data.responsibility;
      editRowData.deletable = data.deletable;
      store.commit("common/formOriginTab1PA120", editRowData);
      store.commit("common/formStateTab1PA120", editRowData);
      getEmployeeWageTrigger.value = false;
    });

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
    //NOTIFY PRESIDENT CHANGE
    const presidentWaring =
      "대표자는 고용보험, 두루누리사회보험에서 제외됩니(기존에 선택되어있는 경우 강제로 해지됩니다)";
    const presidenStatus = ref(false);
    const onChangePresident = (emit: any) => {
      if (emit) {
        presidenStatus.value = true;
      }
    };
    //track foreigners
    const labelResidebId = ref("주민(외국인)번호 ");
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

    const { mutate, onError, onDone } = useMutation(
      mutations.updateEmployeeWage
    );
    const actionUpdated = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
        store.commit("common/actionFormErrorPA120");
      } else {
        makeDataClean(formStateTab1PA120.value);
        let editData = JSON.parse(JSON.stringify(formStateTab1PA120.value));
        delete editData.employeeId;
        delete editData.key;
        delete editData.deletable;
        let dataCallCreat = {
          ...getEmployeeParam.value,
          input: {
            ...editData,
          },
        };
        mutate(dataCallCreat);
      }
    };
    onError((_e) => {
      //notification('error', e.message);
      store.commit("common/actionFormErrorPA120");
    });
    onDone((_res) => {
      notification("success", messageUpdate);
      store.state.common.isNewRowPA120 = false;
      store.commit("common/formOriginTab1PA120", formStateTab1PA120.value);
      // check president difference to save in tab 2 [if true]
      if (presidentOriginPA120.value !== formStateTab1PA120.value.president) {
        store.state.common.presidentEditPA120 =
          formStateTab1PA120.value.president;
      } else {
        store.commit("common/actionFormDonePA120");
        store.state.common.presidentEditPA120 = false;
      }
      setTimeout(() => {
        //RESET origin president
        store.state.common.presidentOriginPA120 =
          formStateTab1PA120.value.president;
      }, 0);
    });

    //reset state when change employee id

    watch(employeeIdPA120, async (newVal: any) => {
      if (+newVal !== 0) {
        presidenStatus.value = false;
        getEmployeeParam.value.employeeId = newVal;
        getEmployeeWageTrigger.value = true;
      }
    });
    return {
      loading,
      labelResidebId,
      funcAddress,
      radioCheckForeigner,
      arrDepartments,
      arrResponsibility,
      actionUpdated,
      changeTextCountry,
      formStateTab1PA120,
      presidenStatus,
      presidentWaring,
      onChangePresident,
      getEmployeeParam,
      onChange,
      employeeIdPA120,
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
