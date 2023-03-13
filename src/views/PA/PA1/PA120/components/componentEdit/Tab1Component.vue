<template>
  <div id="tab1-pa120">
    <a-spin :spinning="loading" size="large">
      <!-- {{ originDataDetail }} originDataDetail <br />
      {{ initFormStateTabPA120 }} initFormStateTabPA120 <br /> -->
      <standard-form formName="tab1-pa120">
        <a-form-item label="사번(코드)" label-align="right" class="red">
          <div class="input-text">
            <text-number-box width="200px" :required="true" v-model:valueInput="employeeId" placeholder="숫자만 입력 가능"
              :disabled="true" />
            <span style="color: #888888; font-size:12px">
              <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 최초 저장된 이후 수정 불가.
            </span>
          </div>
        </a-form-item>
        <a-form-item label="대표자 여부" label-align="right">
          <div class="input-text">
            <switch-basic v-model:valueSwitch="initFormStateTabPA120.president" textCheck="O" textUnCheck="X" @onChange="onChangePresident"
              style="width: 80px"></switch-basic>
            <span style="color: #888888; font-size: 12px"> <img src="@/assets/images/iconInfo.png" style="width: 14px" />
              대표자인 경우 고용보험 제외됩니다. </span>
          </div>
        </a-form-item>

        <a-form-item label="성명" label-align="right" class="red">
          <default-text-box width="200px" v-model:valueInput="initFormStateTabPA120.name" :required="true"
            placeholder="한글,영문(대문자) 입력 가능" />
        </a-form-item>
        <a-form-item label="입사년월일" label-align="right">
          <date-time-box width="150px" v-model:valueDate="initFormStateTabPA120.joinedAt"> </date-time-box>
        </a-form-item>
        <a-form-item label="퇴사년월일" label-align="right">
          <div class="input-text">
            <date-time-box width="150px" v-model:valueDate="initFormStateTabPA120.leavedAt"> </date-time-box>
            <span style="color: #888888; font-size: 12px"> <img src="@/assets/images/iconInfo.png" style="width: 14px" />
              마지막 근무한 날 </span>
          </div>
        </a-form-item>
        <a-form-item label="내/외국인" label-align="right">
          <radio-group :arrayValue="radioCheckForeigner" v-model:valueRadioCheck="foreigner" layoutCustom="horizontal">
          </radio-group>
        </a-form-item>

        <a-form-item label="외국인 국적" label-align="right" :class="{ red: foreigner == 1 }">
          <country-code-select-box v-if="initFormStateTabPA120.foreigner" style="width: 200px"
            v-model:valueCountry="initFormStateTabPA120.nationalityCode" @textCountry="changeTextCountry"
            :required="initFormStateTabPA120.foreigner" :disabled="!initFormStateTabPA120.foreigner"
            :hiddenOptionKR="true" />
          <country-code-select-box v-else style="width: 200px"
            v-model:valueCountry="initFormStateTabPA120.nationalityCode" @textCountry="changeTextCountry"
            :required="initFormStateTabPA120.foreigner" :disabled="!initFormStateTabPA120.foreigner" />
        </a-form-item>

        <a-form-item label="외국인 체류자격" label-align="right" :class="{ red: foreigner == 1 }">
          <stay-qualification-select-box v-model:valueStayQualifiction="initFormStateTabPA120.stayQualification"
            :disabled="foreigner == 0" />
        </a-form-item>

        <a-form-item :label="labelResidebId" label-align="right" class="red">
          <id-number-text-box :required="true" v-model:valueInput="initFormStateTabPA120.residentId" width="150px">
          </id-number-text-box>
        </a-form-item>

        <a-form-item label="주소정근무시간" label-align="right" class="red">
          <div class="input-text">
            <number-box :required="true" :spinButtons="true" v-model:valueInput="initFormStateTabPA120.weeklyWorkingHours"
              width="150px" :min="1" :max="52"></number-box>
            <span style="color: #888888; font-size:12px">
              <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 급여명세서 및 4대보험 취득신고시 이용됩니다.
            </span>
          </div>
        </a-form-item>

        <a-form-item label="세대주여부" label-align="right">
          <switch-basic v-model:valueSwitch="initFormStateTabPA120.householder" textCheck="O" textUnCheck="X"
            style="width: 80px"></switch-basic>
        </a-form-item>

        <a-form-item label="주소" class="clr" label-align="left">
          <div class="zip-code">
            <default-text-box v-model:valueInput="initFormStateTabPA120.roadAddress" width="300px" :disabled="true"
              class="roadAddress" placeholder="도로명주소" />
            <div style="margin-left: 5px">
              <post-code-button @dataAddress="funcAddress" text="주소검색" />
            </div>
          </div>

          <default-text-box v-model:valueInput="initFormStateTabPA120.addressExtend" width="300px"
            placeholder="상세 주소 입력" />
        </a-form-item>
        <a-form-item label="이메일" label-align="right">
          <div class="input-text">
            <mail-text-box v-model:valueInput="initFormStateTabPA120.email" width="200px" placeholder="abc@example.com">
            </mail-text-box>
            <span style="color: #888888; font-size: 12px"> <img src="@/assets/images/iconInfo.png" style="width: 14px" />
              원천징수영수증 등 주요 서류를 메일로 전달 가능합니다. </span>
          </div>
        </a-form-item>
        <a-form-item label="부서" label-align="right">
          <custom-item-select-box width="200px" v-model:valueInput="initFormStateTabPA120.department"
            :arrSelect="arrDepartments"></custom-item-select-box>
        </a-form-item>
        <a-form-item label="직위" label-align="right">
          <custom-item-select-box width="200px" v-model:valueInput="initFormStateTabPA120.responsibility"
            :arrSelect="arrResponsibility"></custom-item-select-box>
        </a-form-item>
        <a-row class="mt-15">
          <a-col :span="8" :offset="8" style="text-align: center">
            <button-basic text="저장" type="default" mode="contained" :width="90" id="btn-save-edit"
              @onClick="actionUpdated" />
          </a-col>
        </a-row>
      </standard-form>
    </a-spin>
    <PopupMessage :modalStatus="presidenStatus" @closePopup="presidenStatus = false" :typeModal="'info'"
      :title="presidentWaring" :content="''" :okText="'확인'" :isConfirmIcon="false"
      @checkConfirm="presidenStatus = false" />
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive, ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import { useMutation, useQuery } from '@vue/apollo-composable';
import mutations from '@/graphql/mutations/PA/PA1/PA120/index';
import queries from '@/graphql/queries/PA/PA1/PA120/index';
import notification from '@/utils/notification';
import { radioCheckForeigner, initFormStateTab1 } from '../../utils/index';
import { companyId } from '@/helpers/commonFunction';
// import _ from 'lodash';
export default defineComponent({
  components: {},
  props: {
    popupStatus: {
      type: Boolean,
      default: false,
    },
    idRowEdit: {
      type: Number,
      default: 0,
    },
    openPopup: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    console.log(`output-1`,)
    const store = useStore();
    const yearPA120 = computed(() => store.state.common.yearPA120);
    let isForeigner = ref(false);
    const triggerDepartments = ref(true);
    const arrDepartments = ref([]);
    const arrResponsibility = ref([]);
    const labelResidebId = ref('주민(외국인)번호 ');
    let formStateTab1 = reactive<any>({
      ...initFormStateTab1,
      joinedAt: dayjs().format('YYYY-MM-DD'),
      leavedAt: '',
    });
    const initFormStateTabPA120 = computed(() => store.state.common.initFormStateTabPA120)
    const editRowPA120 = computed(() => store.state.common.editRowPA120);
    const postCode = ref();
    const funcAddress = (data: any) => {
      postCode.value = data.zonecode;
      initFormStateTabPA120.value.roadAddress = data.roadAddress;
    };

    watch(() => props.popupStatus, (newValue: any) => {
      if (!newValue) {
        employeeId.value = null;
        residentId.value = '';
        foreigner.value = 0;
        Object.assign(initFormStateTabPA120.value, initFormStateTab1);
      }
    });
    const foreigner = ref(initFormStateTabPA120.value.foreigner == true ? 1 : 0);
    watch(foreigner, (newValue: any) => {
      if (newValue == 1) {
        initFormStateTabPA120.value.foreigner = true;
        isForeigner.value = true;
        labelResidebId.value = '외국인번호 유효성';
      } else {
        initFormStateTabPA120.value.foreigner = false;
        isForeigner.value = false;
        labelResidebId.value = '주민등록번호';
      }
    });
    const residentId = ref('');
    watch(residentId, (newValue: any) => {
      initFormStateTabPA120.value.residentId = newValue.slice(0, 6) + '-' + newValue.slice(6, 13);
    });
    const employeeId = ref(null);
    // watch(employeeId, (newValue: any) => {
    //   formStateTab1.employeeId = parseInt(newValue);
    // });

    const originData = ref({
      companyId: companyId,
    });
    // getDepartments
    const { onError: errorDepartments, result: resDepartments } = useQuery(queries.getDepartments, originData, () => ({
      enabled: triggerDepartments.value,
      fetchPolicy: 'no-cache',
    }));
    errorDepartments((error) => {
      notification('error', error.message);
    });

    watch(resDepartments, (value: any) => {
      if (value) {
        arrDepartments.value = value.getDepartments.map((val: any, index: any) => {
          return { id: index, value: val.department };
        });
      }
    });

    // getResponsibilities
    const { onError: errorResponsibility, result: resResponsibility } = useQuery(queries.getResponsibilities, originData, () => ({
      enabled: triggerDepartments.value,
      fetchPolicy: 'no-cache',
    }));

    errorResponsibility((error) => {
      notification('error', error.message);
    });

    watch(resResponsibility, (value: any) => {
      if (value) {
        arrResponsibility.value = value.getResponsibilities.map((val: any, index: any) => {
          return { id: index, value: val.responsibility };
        });
      }
    });
    // get employee Information
    const originDataDetail = ref<any>({
      companyId: companyId,
      imputedYear: yearPA120.value,
      employeeId: props.idRowEdit,
    });
    const getEmployeeWageTrigger = ref(false);
    const {
      result: getValueDefault,
      loading,
<<<<<<< HEAD
    } = useQuery(queries.getEmployeeWage, originDataDetail, () => ({
      enabled: getEmployeeWageTrigger.value,
=======
    } = useQuery(queries.getEmployeeWage, originDataDetail.value, () => ({
      // enabled: getEmployeeWageTrigger.value,
>>>>>>> eb398f6b9cb6f63e8541c5501950384402ccb18a
      fetchPolicy: 'no-cache',
    }));
    watch(getValueDefault, (value: any) => {
      let data = value.getEmployeeWage;
      let editRowData: any = {};
      editRowData.name = data.name.toUpperCase();
      editRowData.foreigner = data.foreigner;
      editRowData.president = data.president;
      editRowData.nationality = data.nationality;
      editRowData.nationalityCode = data.nationalityCode;
      editRowData.stayQualification = data.stayQualification;
      editRowData.residentId = data.residentId.replace('-', '');
      editRowData.roadAddress = data.roadAddress;
      editRowData.addressExtend = data.addressExtend;
      editRowData.email = data.email;
      editRowData.employeeId = data.employeeId;
      editRowData.joinedAt = data.joinedAt ?? NaN;
      editRowData.leavedAt = data.leavedAt ?? NaN;
      editRowData.retirementIncome = data.retirementIncome;
      editRowData.weeklyWorkingHours = data.weeklyWorkingHours;
      editRowData.householder = data.householder;
      editRowData.department = data.department;
      editRowData.responsibility = data.responsibility;
      store.commit('common/editRowPA120', editRowData);
      store.commit('common/initFormStateTabPA120', editRowData);
      employeeId.value = data.employeeId;
      getEmployeeWageTrigger.value = false
      // }
    });
    const { mutate, onError, onDone } = useMutation(mutations.updateEmployeeWage);
    const actionUpdated = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
        store.commit('common/actionFormErrorPA120');
      } else {
        let editData = JSON.parse(JSON.stringify(initFormStateTabPA120.value));
        delete editData.employeeId
        let dataCallCreat = {
          ...originDataDetail.value,
          input: {
            ...editData,
            residentId: initFormStateTabPA120.value.residentId.slice(0, 6) + '-' + initFormStateTabPA120.value.residentId.slice(6, 14),
          },
        };
        mutate(dataCallCreat);
        store.state.common.isAddFormErrorPA120 = false;
      }
    };
    onError((e) => {
      notification('error', e.message);
      store.commit('common/actionFormErrorPA120');
    });
    onDone((res) => {
      store.state.common.reloadEmployeeList = !store.state.common.reloadEmployeeList;
      notification('success', '업데이트 완료!');
      store.commit('common/actionFormDonePA120');
      store.state.common.isNewRowPA120 = false;
      store.commit('common/editRowPA120', initFormStateTabPA120.value);
    });
    watch(() => props.idRowEdit,(value: any) => {
<<<<<<< HEAD
      originDataDetail.value = { ...originDataDetail.value, employeeId: value, imputedYear: yearPA120.value };
      getEmployeeWageTrigger.value = true;
=======
      console.log(`output->value`,value)
      originDataDetail.value = { ...originDataDetail.value, employeeId: value, imputedYear: yearPA120.value };
      // getEmployeeWageTrigger.value = true;
>>>>>>> eb398f6b9cb6f63e8541c5501950384402ccb18a
    }, {deep: true});
    // convert initFormStateTabPA120.value.name to uppercase
    watch(() => initFormStateTabPA120.value.name, (newVal: any) => {
      initFormStateTabPA120.value.name = newVal.toUpperCase();
    }, { deep: true })
    const changeTextCountry = (text: any) => {
      initFormStateTabPA120.value.nationality = text
    }
    watch(() => initFormStateTabPA120.value.foreigner, (newValue: any) => {
      if (!newValue) {
        initFormStateTabPA120.value.nationalityCode = 'KR';
        initFormStateTabPA120.value.stayQualification = null;
        editRowPA120.value.stayQualification = null;
        foreigner.value = 0;
      } else {
        foreigner.value = 1;
        // resetFormNum.value++;
        initFormStateTabPA120.value.nationalityCode = initFormStateTabPA120.value.nationalityCode == 'KR' ? null : initFormStateTabPA120.value.nationalityCode
      }
      store.state.common.isForeignerPA120 = initFormStateTabPA120.value.foreigner;
    }, { deep: true });
    watch(() => initFormStateTabPA120.value.president, (newValue) => {
      store.state.common.presidentEditPA120 = newValue;
    }, { deep: true });

    //----------------------NOTIFY PRESIDENT CHANGE--------------------

    const presidentWaring = "대표자는 고용보험에서 제외됩니다. ( 기존에 선택되어있는 경우 강제로 해지됩니다";
    const presidenStatus = ref(false);
    const onChangePresident = (emit: any)=> {
      if (emit) {
        presidenStatus.value = true;
      }
    }
    return {
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
      arrDepartments,
      arrResponsibility,
      actionUpdated,
      changeTextCountry,
      initFormStateTabPA120,
      presidenStatus,
      presidentWaring,
      onChangePresident,
      originDataDetail
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

  .zip-code {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
}
</style>
