<template>
  <div id="tab1-pa120">
    <a-spin :spinning="loading" size="large">
      <standard-form formName="tab1-pa120">
        <a-row class="dflex-first">
          <a-col :span="12">
            <a-form-item label="사번(코드)" label-align="right" class="red">
              <text-number-box width="200px" :required="true" v-model:valueInput="formStateTab1.employeeId"
                :disabled="true" placeholder="숫자만 입력 가능" />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="영업자코드" label-align="right">
              <div class="input-text">
                <switch-basic v-model:valueSwitch="formStateTab1.president" textCheck="O" textUnCheck="X"
                  style="width: 80px"></switch-basic>
                <span>
                  <InfoCircleFilled /> 대표자인 경우 고용보험 제외됩니다.
                </span>
              </div>
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item label="성명" label-align="right" class="red">
          <text-number-box width="200px" v-model:valueInput="formStateTab1.name" :required="true"
            placeholder="한글,영문(대문자) 입력 가능" />
        </a-form-item>
        <a-form-item label="입사년월일" label-align="right">
          <date-time-box width="150px" v-model:valueDate="formStateTab1.joinedAt" dateFormat="YYYY-MM-DD">
          </date-time-box>
        </a-form-item>
        <a-form-item label="퇴사년월일" label-align="right">
          <div class="input-text">
            <date-time-box width="150px" v-model:valueDate="formStateTab1.leavedAt" dateFormat="YYYY-MM-DD">
            </date-time-box>
            <span>
              <InfoCircleFilled /> 마지막 근무한 날
            </span>
          </div>
        </a-form-item>
        <a-row>
          <a-col :span="7">
            <a-form-item label="내/외국인" label-align="right">
              <radio-group :arrayValue="radioCheckForeigner" v-model:valueRadioCheck="foreigner"
                layoutCustom="horizontal"></radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="외국인 국적" label-align="right" class="red">
              <country-code-select-box v-model:valueCountry="formStateTab1.nationalityCode" :disabled="isForeigner" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="외국인 체류자격" label-align="right" class="red">
              <stay-qualification-select-box v-model:valueStayQualifiction="formStateTab1.stayQualification" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item :label="labelResidebId" label-align="right" class="red">
          <id-number-text-box :required="true" v-model:valueInput="formStateTab1.residentId" width="150px">
          </id-number-text-box>
        </a-form-item>
        <a-form-item label="주소" class="clr" label-align="left">
          <a-row :gutter="[0, 4]">
            <a-col :span="24">
              <a-row>
                <a-col :span="6">
                  <default-text-box v-model:valueInput="formStateTab1.roadAddress" width="100%" :disabled="true" />
                </a-col>
                <a-col :span="18">
                  <div style="margin-left: 5px">
                    <post-code-button @dataAddress="funcAddress" />
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="24">
              <a-row>
                <a-col :span="12">
                  <default-text-box v-model:valueInput="formStateTab1.roadAddress" width="100%" :disabled="true"
                    placeholder="주소1" />
                </a-col>
                <a-col :span="12" style="padding-left: 9px">
                  <default-text-box v-model:valueInput="formStateTab1.addressExtend" width="100%" placeholder="주소2" />
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item label="이메일" label-align="right">
          <div class="input-text">
            <mail-text-box v-model:valueInput="formStateTab1.email" width="200px" placeholder="abc@example.com">
            </mail-text-box>
            <span>
              <InfoCircleFilled /> 원천징수영수증 등 주요 서류를 메일로 전달
              가능합니다.
            </span>
          </div>
        </a-form-item>
        <a-form-item label="부서" label-align="right">
          <custom-item-select-box width="200px" v-model:valueInput="formStateTab1.department"
            :arrSelect="arrDepartments"></custom-item-select-box>
        </a-form-item>
        <a-form-item label="직위" label-align="right">
          <custom-item-select-box width="200px" v-model:valueInput="formStateTab1.responsibility"
            :arrSelect="arrResponsibility"></custom-item-select-box>
        </a-form-item>
        <a-row style="margin-top: 40px">
          <a-col :span="8" :offset="8" style="text-align: center;">
            <button-basic text="저장" type="default" mode="contained" :width="90" @onClick="actionUpdated($event)" />
          </a-col>
        </a-row>
      </standard-form>
    </a-spin>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch, computed } from "vue";
import { InfoCircleFilled } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@vue/apollo-composable";

import mutations from "../../../../../../graphql/mutations/PA/PA1/PA120/index";
import queries from "../../../../../../graphql/queries/PA/PA1/PA120/index";
import notification from "../../../../../../utils/notification";
import {
  radioCheckForeigner,
  radioCheckHouseholder,
  initFormStateTab1,
} from "../../utils/index";
import { companyId } from "../../../../../../helpers/commonFunction";

export default defineComponent({
  components: {
    InfoCircleFilled

  },
  props: {
    popupStatus: {
      type: Boolean,
      default: false,
    },
    idRowEdit: {
      type: Number
    },
    openPopup: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    let isForeigner = ref(false);
    const triggerDepartments = ref(true);
    const arrDepartments = ref([]);
    const arrResponsibility = ref([]);
    const labelResidebId = ref("주민(외국인)번호 ");
    const formStateTab1 = reactive<any>({
      ...initFormStateTab1,
      joinedAt: dayjs().format("YYYY-MM-DD"),
      leavedAt: dayjs().format("YYYY-MM-DD"),
    });

    const oldFormState = { ...formStateTab1 };
    const postCode = ref();
    const funcAddress = (data: any) => {
      postCode.value = data.zonecode;
      formStateTab1.roadAddress = data.roadAddress;
    };

    watch(() => props.popupStatus, (newValue) => {
      if (!newValue) {
        employeeId.value = null;
        residentId.value = '';
        foreigner.value = 0;
        Object.assign(formStateTab1, initFormStateTab1);
      }
    })
    const foreigner = ref(formStateTab1.foreigner == true ? 1 : 0);
    watch(foreigner, (newValue) => {
      if (newValue == 1) {
        formStateTab1.foreigner = true;
        isForeigner.value = true;
        labelResidebId.value = "외국인번호 유효성";
      } else {
        formStateTab1.foreigner = false;
        isForeigner.value = false;
        labelResidebId.value = "주민등록번호";
      }
    });
    const residentId = ref("");
    watch(residentId, (newValue: any) => {
      formStateTab1.residentId =
        newValue.slice(0, 6) + "-" + newValue.slice(6, 13);
    });
    const employeeId = ref(null);
    watch(employeeId, (newValue: any) => {
      formStateTab1.employeeId = parseInt(newValue);
    });

    const originData = ref({
      companyId: companyId,
    })
    // getDepartments
    const {
      onError: errorDepartments,
      result: resDepartments,
    } = useQuery(queries.getDepartments, originData, () => ({
      enabled: triggerDepartments.value,
      fetchPolicy: "no-cache",
    }));
    errorDepartments((error) => {
      notification("error", error.message);
    });

    watch(resDepartments, (value) => {
      if (value) {
        arrDepartments.value = value.getDepartments.map((val: any, index: any) => {
          return { id: index, value: val.department }
        });
      }
    });

    // getResponsibilities
    const {
      onError: errorResponsibility,
      result: resResponsibility,
    } = useQuery(queries.getResponsibilities, originData, () => ({
      enabled: triggerDepartments.value,
      fetchPolicy: "no-cache",
    }));

    errorResponsibility((error) => {
      notification("error", error.message);
    });

    watch(resResponsibility, (value) => {
      if (value) {
        arrResponsibility.value = value.getResponsibilities.map((val: any, index: any) => {
          return { id: index, value: val.responsibility }
        });
      }
    });
    // get employee Information

    const originDataDetail = ref({
      companyId: companyId,
      imputedYear: globalYear.value,
      employeeId: props.idRowEdit
    })
    const {
      refetch: refetchValueDetail,
      onResult: getValueDefault,
      loading
    } = useQuery(queries.getEmployeeWage, originDataDetail, () => ({
      fetchPolicy: "no-cache",
    }))
    getValueDefault(res => {
      if (res.data.getEmployeeWage) {
        formStateTab1.name = res.data.getEmployeeWage.name
        formStateTab1.foreigner = res.data.getEmployeeWage.foreigner
        formStateTab1.nationality = res.data.getEmployeeWage.nationality
        formStateTab1.nationalityCode = res.data.getEmployeeWage.nationalityCode
        formStateTab1.stayQualification = res.data.getEmployeeWage.stayQualification
        formStateTab1.residentId = res.data.getEmployeeWage.residentId.replace("-", "")
        formStateTab1.zipcode = ''
        formStateTab1.roadAddress = res.data.getEmployeeWage.roadAddress
        formStateTab1.addressExtend = res.data.getEmployeeWage.addressExtend
        formStateTab1.email = res.data.getEmployeeWage.email
        formStateTab1.employeeId = res.data.getEmployeeWage.employeeId
        formStateTab1.joinedAt = res.data.getEmployeeWage.joinedAt ? dayjs(res.data.getEmployeeWage.joinedAt.toString()).format('YYYY-MM-DD') : ''
        formStateTab1.leavedAt = res.data.getEmployeeWage.leavedAt ? dayjs(res.data.getEmployeeWage.leavedAt.toString()).format('YYYY-MM-DD') : ''
        formStateTab1.retirementIncome = res.data.getEmployeeWage.retirementIncome
        formStateTab1.weeklyWorkingHours = res.data.getEmployeeWage.weeklyWorkingHours
        formStateTab1.department = res.data.getEmployeeWage.department
        formStateTab1.responsibility = res.data.getEmployeeWage.responsibility
      }
    })
    const {
      mutate,
      onError,
      onDone,
    } = useMutation(mutations.updateEmployeeWage);
    onError(e => {
      notification('error', e.message)
    })
    onDone(res => {
      emit('closePopup', false)
      notification('success', '업데이트 완료!')
    })

    watch(() => props.idRowEdit, (value) => {
      originDataDetail.value.employeeId = value
    })
    watch(() => props.openPopup, (value) => {
      refetchValueDetail()
    })
    // ============ WATCH ================================
    watch(() => props.idRowEdit, (value) => {
      originDataDetail.value.employeeId = value
    })
    const actionUpdated = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        let newValDataEdit = {
          ...formStateTab1,
          joinedAt: typeof formStateTab1.joinedAt == "string" ? parseInt(formStateTab1.joinedAt.replaceAll('-', '')) : formStateTab1.joinedAt,
          leavedAt: typeof formStateTab1.leavedAt == "string" ? parseInt(formStateTab1.leavedAt.replaceAll('-', '')) : formStateTab1.leavedAt,
          residentId: formStateTab1.residentId.slice(0, 6) + '-' + formStateTab1.residentId.slice(6, 14)
        };
        delete newValDataEdit.employeeId;
        delete newValDataEdit.zipcode;
        let dataCallCreat = {
          companyId: companyId,
          imputedYear: globalYear.value,
          employeeId: props.idRowEdit,
          input: newValDataEdit
        };
        mutate(dataCallCreat)
      }
    }
    return {
      companyId,
      loading,
      formStateTab1,
      isForeigner,
      labelResidebId,
      foreigner,
      funcAddress,
      residentId,
      employeeId,
      postCode,
      radioCheckForeigner,
      radioCheckHouseholder,
      initFormStateTab1,
      activeKey: ref("1"),
      arrDepartments,
      arrResponsibility, actionUpdated
    };
  },
});
</script>
<style lang="scss" scoped>
#tab1-pa120 {
  ::v-deep .ant-form-item-label>label {
    width: 100px;
    padding-left: 10px;
  }

  .dflex-first {
    display: flex;

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
}
</style>
