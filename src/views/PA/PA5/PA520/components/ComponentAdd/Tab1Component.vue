<template>
  <a-spin :spinning="loadingCreated">
    <standard-form
      action=""
      formName="add-page-PA520"
      ref="formRefPa520Add"
      :disabled="true"
    >
      <a-form-item label="사번(코드)" label-align="right">
        <div class="d-flex-center">
          <text-number-box
            width="200px"
            v-model:valueInput="dataCreated.employeeId"
            disabled="true"
          />
        </div>
      </a-form-item>
      <a-form-item label="성명" label-align="right" class="label-red">
        <default-text-box
          width="200px"
          v-model:valueInput="dataCreated.name"
          :required="true"
          placeholder="한글,영문(대문자) 입력 가능"
        />
      </a-form-item>
      <a-form-item label="퇴직급여대상 여부" label-align="right">
        <a-radio-group v-model:value="dataCreated.retirementIncome">
          <a-radio :value="true">
            <div
              class="custom-checkbox-group"
              style="background-color: #77933c"
            >
              O
            </div>
          </a-radio>
          <a-radio :value="false">
            <div class="custom-checkbox-group" style="background-color: red">
              X
            </div>
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="입사년월일" label-align="right" class="joinedAt">
        <date-time-box
          className="joinedAt"
          width="150px"
          v-model:valueDate="dataCreated.joinedAt"
        />
      </a-form-item>
      <a-form-item label="퇴사년월일" label-align="right" class="leavedAt">
        <div class="input-text">
          <date-time-box
            width="150px"
            className="leavedAt"
            v-model:valueDate="dataCreated.leavedAt"
          />
          <info-tool-tip> 마지막 근무한 날 </info-tool-tip>
        </div>
      </a-form-item>
      <a-form-item
        label="내/외국인"
        label-align="right"
        class="label-custom-width"
      >
        <radio-group
          :arrayValue="radioCheckForeigner"
          v-model:valueRadioCheck="dataCreated.foreigner"
          layoutCustom="horizontal"
        />
      </a-form-item>
      <div class="d-flex">
        <a-form-item
          label="외국인 국적"
          label-align="right"
          :class="{ 'label-red': activeLabel, 'label-custom-width': true }"
        >
          <country-code-select-box
            v-model:valueCountry="dataCreated.nationalityCode"
            :hiddenOptionKR="dataCreated.foreigner"
            @textCountry="(res: any) => { dataCreated.nationality = res }"
            :disabled="disabledSelectBox"
            width="180px"
            :required="!disabledSelectBox"
          />
        </a-form-item>
        <a-form-item
          label="외국인 체류자격"
          label-align="right"
          :class="{
            'label-red': activeLabel,
            'label-custom-width': true,
            'pl-10': true,
          }"
        >
          <stay-qualification-select-box
            v-model:valueStayQualifiction="dataCreated.stayQualification"
            width="180px"
            :disabled="disabledSelectBox"
            :required="!disabledSelectBox"
          />
        </a-form-item>
      </div>
      <a-form-item :label="labelResident" label-align="right" class="label-red">
        <id-number-text-box
          width="150px"
          v-model:valueInput="dataCreated.residentId"
          :required="true"
          :foreigner="dataCreated.foreigner"
        />
      </a-form-item>
      <a-form-item label="주소정근무시간" label-align="right" class="label-red">
        <div class="input-text">
          <number-box
            :required="true"
            :spinButtons="true"
            v-model:valueInput="dataCreated.weeklyWorkingHours"
            width="150px"
            :min="1"
            :max="52"
          ></number-box>
          <info-tool-tip>
            급여명세서 및 4대보험 취득신고시 이용됩니다.
          </info-tool-tip>
        </div>
      </a-form-item>
      <a-form-item label="주소" class="clr" label-align="left">
        <a-row>
          <a-col :span="12">
            <!-- <default-text-box width="100%" :disabled="true" v-model:valueInput="dataCreated.zipcode" /> -->
            <default-text-box
              width="100%"
              :disabled="true"
              placeholder="도로명 주소"
              v-model:valueInput="dataCreated.roadAddress"
            />
          </a-col>
          <a-col :span="10">
            <div style="margin-left: 5px">
              <post-code-button @dataAddress="funcAddress" text="주소검색" />
            </div>
          </a-col>
        </a-row>
        <a-row class="d-flex mt-5">
          <div style="width: 50%">
            <default-text-box
              placeholder="상세 주소 입력"
              v-model:valueInput="dataCreated.addressExtend"
            />
          </div>
        </a-row>
      </a-form-item>
      <a-form-item label="이메일" label-align="right">
        <div class="input-text">
          <mail-text-box
            width="200px"
            v-model:valueInput="dataCreated.email"
            placeholder="abc@example.com"
          >
          </mail-text-box>
          <info-tool-tip>
            원천징수영수증 등 주요 서류를 메일로 전달 가능합니다.
          </info-tool-tip>
        </div>
      </a-form-item>
      <a-form-item label="부서" label-align="right">
        <select-search-edit
          v-model:valueInput="dataCreated.department"
          v-model:data="selectBoxData1"
          width="200px"
        />
      </a-form-item>
      <a-form-item label="직위" label-align="right">
        <select-search-edit
          v-model:valueInput="dataCreated.responsibility"
          v-model:data="selectBoxData2"
          width="200px"
        />
      </a-form-item>
      <div class="wf-100 text-center mt-10">
        <button-basic
          text="저장"
          type="default"
          mode="contained"
          @onClick="actionCreated(true)"
          id="action-save"
          :disabled="isError"
        />
      </div>
    </standard-form>
  </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "vue";
import { radioCheckForeigner, DataCreated, originDataInputUpdate } from "../../utils/index";
import queries from "@/graphql/queries/PA/PA5/PA520/index";
import mutations from "@/graphql/mutations/PA/PA5/PA520/index";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { companyId, makeDataClean } from "@/helpers/commonFunction";
import notification from "@/utils/notification";
import { useStore } from "vuex";
import { Message } from "@/configs/enum";
import { ClickYearStatus, FormStatus } from "@/store/settingModule/types";
export default defineComponent({
  setup(props, { emit }) {
    const formRefPa520Add = ref();
    const labelResident = ref("주민등록번호");
    const clickYearStatus = computed(
      () => store.getters["settings/clickYearStatus"]
    );
    const globalYear: any = computed(() =>
      parseInt(sessionStorage.getItem("paYear") ?? "0")
    );
    const isError = computed(() => store.getters["common/isErrorPA520"]);
    const activeLabel = ref(false);
    const disabledSelectBox = ref(true);
    const selectBoxData1 = ref([]);
    const selectBoxData2 = ref([]);
    let dataCreated: any = reactive({
      ...DataCreated,
    });
    const originData = ref({
      companyId: companyId,
    });

    let originDataInitTab2: any = ref({
      companyId: companyId,
      imputedYear: globalYear.value,
      employeeId: 0,
      input: {
        ...originDataInputUpdate,
      },
    });
    const store = useStore();
    // ============ GRAPQL ===============================
    const { onResult: resGetDepartments } = useQuery(
      queries.getDepartments,
      originData,
      () => ({
        fetchPolicy: "no-cache",
      })
    );
    resGetDepartments((res) => {
      // selectBoxData.value = res.data.getDepartments
      let valArr: any = [];
      res.data.getDepartments.map((v: any) => {
        // filter empty value
        if (v.department != "") {
          valArr.push({
            id: v.department,
            value: v.department,
          });
        }
      });
      selectBoxData1.value = valArr;
    });
    const { onResult: resGetResponsibilities } = useQuery(
      queries.getResponsibilities,
      originData,
      () => ({
        fetchPolicy: "no-cache",
      })
    );
    resGetResponsibilities((res) => {
      let valArr: any = [];
      res.data.getResponsibilities.map((v: any) => {
        // filter empty value
        if (v.responsibility != "") {
          valArr.push({
            id: v.responsibility,
            value: v.responsibility,
          });
        }
      });
      selectBoxData2.value = valArr;
    });
    const {
      mutate,
      onError,
      onDone,
      loading: loadingCreated,
    } = useMutation(mutations.createEmployeeWageDaily);
    onError((e) => {
      store.dispatch("common/resetActionStatus");
      //notification('error', e.message)
    });
    onDone(async (result) => {
      //store.state.common.addRowBtOnclickPA520 = false
      //store.state.common.activeAddRowPA520 = false
      //store.commit('common/setAddBtOnclickPA520',false)
      originDataInitTab2.value.employeeId = result.data.createEmployeeWageDaily.employeeId
      originDataInitTab2.value.input.employeementInsuranceDeduction = true
      originDataInitTab2.value.input.deductionItems = [
        {itemCode: 1001, amount: 0},
        {itemCode: 1002, amount: 0},
        {itemCode: 1003, amount: 0},
        {itemCode: 1004, amount: 0},
        {itemCode: 1011, amount: 0},
        {itemCode: 1012, amount: 0}
      ]
      mutateTab2(originDataInitTab2.value)
      store.commit("common/setCheckChangeValueAddPA520", false);
      notification("success", Message.getCommonMessage("101").message);
      if (clickYearStatus.value !== ClickYearStatus.none)
        await store.commit("settings/setCurrentYear");
      await store.dispatch("settings/resetYearStatus");
    });

    const { mutate:mutateTab2 , onDone : onDoneTab2 } = useMutation(
      mutations.saveEmployeeWageDailyPayDeduction
    );
    onDoneTab2(async (result) => { 
      store.commit(
        "common/setIdRowSaveDonePA520",
        result.data.saveEmployeeWageDailyPayDeduction.employeeId
      );
    })

    //============ WATCH =================================

    //check if the year is changed, then confirm first if you are adding or editing data
    watch(
      () => globalYear.value,
      (newYear, oldYear) => {
        if (
          store.state.common.isChangeYearPA520 &&
          store.state.common.checkChangeValueAddPA520
        ) {
          store.state.settings.globalYear = oldYear;
        }
      }
    );

    watch(
      () => dataCreated.foreigner,
      (value: any) => {
        if (value == true) {
          disabledSelectBox.value = false;
          labelResident.value = "외국인번호 유효성";
          activeLabel.value = true;
          dataCreated.stayQualification = null;
          dataCreated.nationalityCode = null;
        } else {
          activeLabel.value = false;
          labelResident.value = "주민등록번호";
          disabledSelectBox.value = true;
          dataCreated.nationality = "대한민국";
          dataCreated.nationalityCode = "KR";
          dataCreated.stayQualification = null;
        }
      }
    );
    watch(
      () => dataCreated,
      (value) => {
        // if (store.state.common.activeAddRowPA520 == true) {
        let dataTable = {
          employeeId: value.employeeId,
          name: value.name,
          foreigner: value.foreigner,
          status: dataCreated.leavedAt ? false : true,
          residentId: value.residentId,
        };

        store.state.common.dataSourcePA520 = dataTable;
        if (JSON.stringify(DataCreated) !== JSON.stringify(value)) {
          store.commit("common/setCheckChangeValueAddPA520", true);
          store.commit("settings/setFormStatus", FormStatus.adding);
        } else {
          store.commit("common/setCheckChangeValueAddPA520", false);
          store.commit("settings/setFormStatus", FormStatus.none);
        }
      },
      { deep: true }
    );
    watch(
      () => store.state.common.actionSaveAddPA520,
      (value) => {
        actionCreated();
      },
      { deep: true }
    );

    // convert dataCreated.name to uppercase
    watch(
      () => dataCreated.name,
      (newVal) => {
        dataCreated.name = newVal.toUpperCase();
      },
      { deep: true }
    );

    // ============ FUNCTION =============================
    const funcAddress = (data: any) => {
      dataCreated.zipcode = data.zonecode;
      dataCreated.roadAddress = data.roadAddress;
    };
    const actionCreated = async (isclickbtn = false) => {
      store.commit("common/setIsClickBtnSavePA520", isclickbtn);
      var res = formRefPa520Add.value.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
        store.commit("settings/setFormStatus", FormStatus.adding);
        store.commit("common/setValidateAddPA520", true);
        return;
      } else {
        let newValDataCreat = {
          ...dataCreated,
          employeeId: parseInt(dataCreated.employeeId),
          weeklyWorkingHours: parseInt(dataCreated.weeklyWorkingHours),
          joinedAt: dataCreated.joinedAt,
          leavedAt: dataCreated.leavedAt,
          residentId: dataCreated.residentId,
        };

        delete newValDataCreat.zipcode;
        delete newValDataCreat.employeeId;
        let dataCallCreat = {
          companyId: companyId,
          imputedYear: globalYear.value,
          input: newValDataCreat,
        };
        dataCallCreat = await makeDataClean(dataCallCreat);
        mutate(dataCallCreat);
      }
    };
    return {
      loadingCreated,
      activeLabel,
      labelResident,
      disabledSelectBox,
      dataCreated,
      radioCheckForeigner,
      selectBoxData1,
      selectBoxData2,
      actionCreated,
      funcAddress,
      formRefPa520Add,
      store,
      isError,
    };
  },
});
</script>
<style lang="scss" scoped src="../../style/popupAddNew.scss"></style>
