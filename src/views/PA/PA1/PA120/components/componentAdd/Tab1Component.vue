<template>
  <div id="tab1-pa120">
    <a-spin :spinning="loading" size="large">
      <standard-form formName="tab1-pa120">
          <a-form-item label="사번(코드)" label-align="right" class="red">
            <text-number-box width="200px" :required="true" v-model:valueInput="employeeId" placeholder="숫자만 입력 가능" />
          </a-form-item>
      
          <a-form-item label="대표자 여부 " label-align="right">
            <div class="input-text">
              <switch-basic v-model:valueSwitch="formStateTab1.president" textCheck="O" textUnCheck="X"
                style="width: 80px"></switch-basic>
              <span style="color: #888888; font-size:12px">
                <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 대표자인 경우 고용보험 제외됩니다.
              </span>
            </div>
          </a-form-item>

          <a-form-item label="성명" label-align="right" class="red">
            <default-text-box width="200px" v-model:valueInput="formStateTab1.name" :required="true"
              placeholder="한글,영문(대문자) 입력 가능" />
          </a-form-item>
          <a-form-item label="입사년월일" label-align="right">
            <date-time-box width="150px" v-model:valueDate="formStateTab1.joinedAt">
            </date-time-box>
          </a-form-item>
          <a-form-item label="퇴사년월일" label-align="right">
            <div class="input-text">
              <date-time-box width="150px" v-model:valueDate="formStateTab1.leavedAt">
              </date-time-box>
              <span style="color: #888888; font-size:12px">
                <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 마지막 근무한 날
              </span>
            </div>
          </a-form-item>
    
          <a-form-item label="내/외국인" label-align="right">
            <radio-group :arrayValue="radioCheckForeigner" v-model:valueRadioCheck="foreigner"
              layoutCustom="horizontal"></radio-group>
          </a-form-item>
          <a-form-item label="외국인 국적" label-align="right" :class="{red: foreigner==1}">
            <country-code-select-box v-if="formStateTab1.foreigner" style="width: 200px"
                v-model:valueCountry="formStateTab1.nationalityCode" @textCountry="changeTextCountry"
                :required="formStateTab1.foreigner" :disabled="!formStateTab1.foreigner"
                :hiddenOptionKR="true" />
            <country-code-select-box v-else style="width: 200px"
                v-model:valueCountry="formStateTab1.nationalityCode" @textCountry="changeTextCountry"
                :required="formStateTab1.foreigner" :disabled="!formStateTab1.foreigner" />
          </a-form-item>
  
          <a-form-item label="외국인 체류자격" label-align="right" :class="{red: foreigner==1}">
            <stay-qualification-select-box v-model:valueStayQualifiction="formStateTab1.stayQualification" :disabled="foreigner == 0" />
          </a-form-item>
      
          <a-form-item :label="labelResidebId" label-align="right" class="red">
            <id-number-text-box :required="true" v-model:valueInput="residentId" width="150px"></id-number-text-box>
          </a-form-item>
        <a-form-item label="주소" class="clr" label-align="left">
            <div class="zip-code">
              <default-text-box v-model:valueInput="postCode" width="120px" :disabled="true" />
              <div style="margin-left: 5px">
                <post-code-button @dataAddress="funcAddress" />
              </div>
            </div>
            <default-text-box v-model:valueInput="formStateTab1.roadAddress" width="300px" :disabled="true" class="roadAddress"
              placeholder="도로명주소" />

            <default-text-box v-model:valueInput="formStateTab1.addressExtend" width="300px" placeholder="상세 주소 입력" />
        </a-form-item>
        <a-form-item label="이메일" label-align="right">
          <div class="input-text">
            <mail-text-box v-model:valueInput="formStateTab1.email" width="200px" placeholder="abc@example.com">
            </mail-text-box>
            <span style="color: #888888; font-size:12px">
              <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 원천징수영수증 등 주요 서류를 메일로 전달
              가능합니다.
            </span>
          </div>
        </a-form-item>
        <a-form-item label="부서" label-align="right">
          <custom-item-select-box width="200px" v-model:valueInput="formStateTab1.department"
            :arrSelect="arrDepartments"></custom-item-select-box>
        </a-form-item>
        <a-form-item label="직위" label-align="right">
          <custom-item-select-box width="200px" v-model:valueInput="formStateTab1.responsibility" :id="'pa-120-2'"
            :arrSelect="arrResponsibility"></custom-item-select-box>
        </a-form-item>
        <a-row class="mt-15">
          <a-col :span="8" :offset="8" style="text-align: center;">
            <button-basic text="저장" type="default" mode="contained" :width="90"
              @onClick="createNewEmployeeWage($event)" />
          </a-col>
        </a-row>
      </standard-form>
    </a-spin>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch, computed, onUnmounted } from "vue";
import { useStore } from "vuex";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA1/PA120/index";
import queries from "@/graphql/queries/common/index";
import notification from "@/utils/notification";
import {
  radioCheckForeigner,
  radioCheckHouseholder,
  initFormStateTab1,
} from "../../utils/index";
import { companyId } from "@/helpers/commonFunction";
export default defineComponent({
  components: {
  },
  props: {
    popupStatus: {
      type: Boolean,
      default: false,
    },
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
      joinedAt: dayjs().format("YYYYMMDD"),
      leavedAt: "",
    });

    const oldFormState = { ...formStateTab1 };
    const postCode = ref();
    const funcAddress = (data: any) => {
      postCode.value = data.zonecode;
      formStateTab1.roadAddress = data.roadAddress;
    };

    watch(() => props.popupStatus, (newValue) => {
      Object.assign(formStateTab1, initFormStateTab1);
      employeeId.value = null;
      residentId.value = '';
      foreigner.value = 0;
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

    /**
     *  
     */
    const residentId = ref("");
    watch(residentId, (newValue: any) => {
      formStateTab1.residentId =
        newValue.slice(0, 6) + "-" + newValue.slice(6, 13);
    });
    const employeeId = ref(null);
    watch(employeeId, (newValue: any, oldvalue) => {
      formStateTab1.employeeId = parseInt(newValue);
    });


    // getDepartments
    const {
      onError: errorDepartments,
      result: resDepartments,
    } = useQuery(queries.getDepartments, { companyId: companyId }, () => ({
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
    } = useQuery(queries.getResponsibilities, { companyId: companyId }, () => ({
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


    // createEmployeeWage
    const {
      mutate: createEmployeeWage,
      loading: loading,
      onDone: onDoneAdd,
      onError,
    } = useMutation(mutations.createEmployeeWage);

    onDoneAdd(() => {
       emit('setTabsStatus', false);
       notification("success", `사원등록이 완료되었습니다! `);
       store.commit('common/actionFormDonePA120')
       store.commit('common/keyActivePA120', employeeId.value);
    });

    onError((error) => {
      notification("error", error.message);
    });

    const createNewEmployeeWage = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        emit('employeeId', employeeId.value);
        let dataNew = {
          companyId: companyId,
          imputedYear: globalYear.value,
          input: {
            ...formStateTab1,
            joinedAt: +dayjs(formStateTab1.joinedAt).format("YYYYMMDD"),
            leavedAt: +dayjs(formStateTab1.leavedAt).format("YYYYMMDD"),
          },
        };
        console.log(`output->dataNew`,dataNew)
        createEmployeeWage(dataNew);
      }
    };
// compare data
    const compareData = () => {
      var formStateTab1Copy = reactive(formStateTab1);
      initFormStateTab1.joinedAt = dayjs().format("YYYY-MM-DD");
      if(JSON.stringify(formStateTab1Copy)!==JSON.stringify(initFormStateTab1)){
          return false;
        }
      if(residentId.value !== ''){
          return false;
        }
      if(employeeId.value == false){
        return false;
      }
      return true;
    }
    const actionFormDonePA120 = computed(() => store.getters['common/actionFormDonePA120']);
// convert formStateTab1.name to uppercase
    watch(()=> formStateTab1.name,(newVal)=> {
        formStateTab1.name = newVal.toUpperCase();
    },{deep: true})
    const changeTextCountry = (text: any) => {
        formStateTab1.nationality = text
    }
    watch(() => formStateTab1.foreigner, (newValue) => {
        if (!newValue) {
            formStateTab1.nationalityCode = 'KR'
            formStateTab1.stayQualification = null
        } else {
            // resetFormNum.value++;
            formStateTab1.nationalityCode = formStateTab1.nationalityCode == 'KR' ? null : formStateTab1.nationalityCode
        }
    });
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
      createNewEmployeeWage,
      arrDepartments,
      arrResponsibility,
      compareData,
      actionFormDonePA120,
      changeTextCountry
    };
  },
});
</script>
<style lang="scss" scoped>
#tab1-pa120 {
  ::v-deep .ant-form-item-label>label {
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

  .zip-code{
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  .roadAddress{
    margin-bottom: 5px;
  }
}
</style>
