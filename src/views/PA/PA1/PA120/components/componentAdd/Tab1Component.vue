<template>
  <div id="tab1-pa120">
    <a-spin :spinning="loading" size="large">
      <standard-form formName="tab1-pa120">
          <a-form-item label="사번(코드)" label-align="right" class="red">
            <div class="input-text">
              <text-number-box width="200px" :required="true" v-model:valueInput="employeeId" placeholder="숫자만 입력 가능" />
              <span style="color: #888888; font-size:12px">
                <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 최초 저장된 이후 수정 불가.
              </span>
            </div>
          </a-form-item>
      
          <a-form-item label="대표자 여부 " label-align="right">
            <div class="input-text">
              <switch-basic v-model:valueSwitch="initFormStateTabPA120.president" textCheck="O" textUnCheck="X"
                style="width: 80px"></switch-basic>
              <span style="color: #888888; font-size:12px">
                <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 대표자인 경우 고용보험 제외됩니다.
              </span>
            </div>
          </a-form-item>

          <a-form-item label="성명" label-align="right" class="red">
            <default-text-box width="200px" v-model:valueInput="initFormStateTabPA120.name" :required="true"
              placeholder="한글,영문(대문자) 입력 가능" />
          </a-form-item>
          <a-form-item label="입사년월일" label-align="right">
            <date-time-box width="150px" v-model:valueDate="initFormStateTabPA120.joinedAt">
            </date-time-box>
          </a-form-item>
          <a-form-item label="퇴사년월일" label-align="right">
            <div class="input-text">
              <date-time-box width="150px" v-model:valueDate="initFormStateTabPA120.leavedAt">
              </date-time-box>
              <span style="color: #888888; font-size:12px">
                <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 마지막 근무한 날
              </span>
            </div>
          </a-form-item>
    
          <a-form-item label="내/외국인" label-align="right">
            <radio-group :arrayValue="radioCheckForeigner" v-model:valueRadioCheck="foreigner"
              layoutCustom="horizontal" class="mt-1"></radio-group>
          </a-form-item>
          <a-row>
              <a-form-item label="외국인 국적" label-align="right" :class="{red: foreigner==1}">
                <country-code-select-box v-if="initFormStateTabPA120.foreigner" style="width: 200px"
                v-model:valueCountry="initFormStateTabPA120.nationalityCode" @textCountry="changeTextCountry"
                :required="initFormStateTabPA120.foreigner" :disabled="!initFormStateTabPA120.foreigner"
                :hiddenOptionKR="true" />
                <country-code-select-box v-else style="width: 200px"
                v-model:valueCountry="initFormStateTabPA120.nationalityCode" @textCountry="changeTextCountry"
                :required="initFormStateTabPA120.foreigner" :disabled="!initFormStateTabPA120.foreigner" />
            </a-form-item>
            
            <a-form-item label="외국인 체류자격" label-align="right" :class="{red: foreigner==1}">
                <stay-qualification-select-box v-model:valueStayQualifiction="initFormStateTabPA120.stayQualification" :disabled="foreigner == 0" />
            </a-form-item>
          </a-row>
      
          <a-form-item :label="labelResidebId" label-align="right" class="red">
            <id-number-text-box :required="true" v-model:valueInput="residentId" width="150px"></id-number-text-box>
          </a-form-item>


        <a-form-item label="주소정근무시간" label-align="right" class="red">
          <div class="input-text">
              <number-box :required="true" :spinButtons="true" v-model:valueInput="initFormStateTabPA120.weeklyWorkingHours" width="150px" :min="1" :max="52"></number-box>
              <span style="color: #888888; font-size:12px">
                  <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 급여명세서 및 4대보험 취득신고시 이용됩니다.
              </span>
          </div>
        </a-form-item>

        <a-form-item label="세대주여부" label-align="right">
            <switch-basic v-model:valueSwitch="initFormStateTabPA120.householder " textCheck="O" textUnCheck="X"
              style="width: 80px"></switch-basic>
        </a-form-item>


        <a-form-item label="주소" class="clr" label-align="left">
            <div class="zip-code">
                <default-text-box v-model:valueInput="initFormStateTabPA120.roadAddress" width="300px" :disabled="true" class="roadAddress"
                placeholder="도로명주소" />
                <div style="margin-left: 5px">
                    <post-code-button @dataAddress="funcAddress" text="주소검색"/>
                </div>
            </div>
            <default-text-box v-model:valueInput="initFormStateTabPA120.addressExtend" width="300px" placeholder="상세 주소 입력" />
        </a-form-item>
        <a-form-item label="이메일" label-align="right">
          <div class="input-text">
            <mail-text-box v-model:valueInput="initFormStateTabPA120.email" width="200px" placeholder="abc@example.com">
            </mail-text-box>
            <span style="color: #888888; font-size:12px">
              <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 원천징수영수증 등 주요 서류를 메일로 전달
              가능합니다.
            </span>
          </div>
        </a-form-item>
        <a-form-item label="부서" label-align="right">
          <custom-item-select-box width="200px" v-model:valueInput="initFormStateTabPA120.department"
            :arrSelect="arrDepartments"></custom-item-select-box>
        </a-form-item>
        <a-form-item label="직위" label-align="right">
          <custom-item-select-box width="200px" v-model:valueInput="initFormStateTabPA120.responsibility" :id="'pa-120-2'"
            :arrSelect="arrResponsibility"></custom-item-select-box>
        </a-form-item>
        <a-row class="mt-15">
          <a-col :span="8" :offset="8" style="text-align: center;">
            <button-basic text="저장" type="default" mode="contained" :width="90" id="btn-save"
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
    const initFormStateTabPA120 = computed(() => store.state.common.initFormStateTabPA120)

    const postCode = ref();
    const funcAddress = (data: any) => {
      postCode.value = data.zonecode;
      initFormStateTabPA120.value.roadAddress = data.roadAddress;
    };

    watch(() => props.popupStatus, (newValue) => {
      Object.assign(initFormStateTabPA120, initFormStateTab1);
      employeeId.value = null;
      residentId.value = '';
      foreigner.value = 0;
    })
    const foreigner = ref(initFormStateTabPA120.value.foreigner == true ? 1 : 0);
    watch(foreigner, (newValue) => {
      if (newValue == 1) {
        initFormStateTabPA120.value.foreigner = true;
        isForeigner.value = true;
        labelResidebId.value = "외국인번호 유효성";
      } else {
        initFormStateTabPA120.value.foreigner = false;
        isForeigner.value = false;
        labelResidebId.value = "주민등록번호";
      }
      store.state.common.isForeignerPA120 = initFormStateTabPA120.value.foreigner;
    });

    /**
     *  
     */
    const residentId = ref("");
    watch(residentId, (newValue: any) => {
      initFormStateTabPA120.value.residentId =
        newValue.slice(0, 6) + "-" + newValue.slice(6, 13);
    });
    const employeeId = ref(null);

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
       store.state.common.isCompareEditPA120 = false;
       store.state.common.isNewRowPA120 = false;
       store.state.common.isAddFormErrorPA120 = false;
       store.commit('common/editRowPA120', initFormStateTabPA120.value);
       store.state.common.rowKeyTab2PA120 = initFormStateTabPA120.value.employeeId;
    //    store.state.common.isNewRowPA120
    });

    onError((error) => {
      notification("error", error.message);
    });

    const createNewEmployeeWage = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
        store.state.common.isAddFormErrorPA120 = true;
        store.state.common.isNewRowPA120 = true;
      } else {
        emit('employeeId', employeeId.value);
        let dataNew = {
          companyId: companyId,
          imputedYear: globalYear.value,
          input: {
            ...initFormStateTabPA120.value,
            employeeId: employeeId.value,
            joinedAt: +dayjs(initFormStateTabPA120.value.joinedAt).format("YYYYMMDD"),
            leavedAt: +dayjs(initFormStateTabPA120.value.leavedAt).format("YYYYMMDD"),
          },
        };
        createEmployeeWage(dataNew);
      }
    };
    const actionFormDonePA120 = computed(() => store.getters['common/actionFormDonePA120']);
// convert initFormStateTabPA120.value.name to uppercase
    watch(()=> initFormStateTabPA120.value.name,(newVal)=> {
        initFormStateTabPA120.value.name = newVal.toUpperCase();
    },{deep: true})
    const changeTextCountry = (text: any) => {
        initFormStateTabPA120.value.nationality = text
    }
    watch(() => initFormStateTabPA120.value.foreigner, (newValue) => {
        if (!newValue) {
            initFormStateTabPA120.value.nationalityCode = 'KR'
            initFormStateTabPA120.value.stayQualification = null
        } else {
            // resetFormNum.value++;
            initFormStateTabPA120.value.nationalityCode = initFormStateTabPA120.value.nationalityCode == 'KR' ? null : initFormStateTabPA120.value.nationalityCode
        }
    });
    watch(()=> initFormStateTabPA120.value.president, (newValue) => {
        store.commit('common/presidentPA120', newValue);
    })
    return {
      companyId,
      loading,
      initFormStateTabPA120,
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
}
</style>
