<template>
  <div id="tab1-pa120">
    <a-spin :spinning="loading" size="large">
      <standard-form formName="tab1-pa120">
        <a-form-item label="사번(코드)" label-align="right" class="red">
          <text-number-box width="200px" :required="true" v-model:valueInput="formStateTab1.employeeId"
            placeholder="숫자만 입력 가능" :disabled="true"/>
        </a-form-item>

        <a-form-item label="대표자 여부" label-align="right">
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
          <radio-group :arrayValue="radioCheckForeigner" v-model:valueRadioCheck="foreigner" layoutCustom="horizontal">
          </radio-group>
        </a-form-item>

        <a-form-item label="외국인 국적" label-align="right" :class="{red: foreigner==1}">
          <country-code-select-box v-model:valueCountry="formStateTab1.nationalityCode" :disabled="foreigner == 0" />
        </a-form-item>

        <a-form-item label="외국인 체류자격" label-align="right" :class="{red: foreigner==1}">
          <stay-qualification-select-box v-model:valueStayQualifiction="formStateTab1.stayQualification" :disabled="foreigner == 0"  />
        </a-form-item>

        <a-form-item :label="labelResidebId" label-align="right" class="red">
          <id-number-text-box :required="true" v-model:valueInput="formStateTab1.residentId" width="150px">
          </id-number-text-box>
        </a-form-item>
        <a-form-item label="주소" class="clr" label-align="left">
          <div class="zip-code">
            <default-text-box v-model:valueInput="formStateTab1.postCode" width="120px" :disabled="true" />
            <div style="margin-left: 5px">
              <post-code-button @dataAddress="funcAddress" />
            </div>
          </div>
          <default-text-box v-model:valueInput="formStateTab1.roadAddress" width="300px" :disabled="true"
            class="roadAddress" placeholder="주소1" />

          <default-text-box v-model:valueInput="formStateTab1.addressExtend" width="300px" placeholder="주소2" />
        </a-form-item>
        <a-form-item label="이메일" label-align="right">
          <div class="input-text">
            <mail-text-box v-model:valueInput="formStateTab1.email" width="200px" placeholder="abc@example.com">
            </mail-text-box>
            <span style="color: #888888; font-size:12px">
              <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 원천징수영수증 등 주요 서류를 메일로 전달 가능합니다.
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
import { useStore } from "vuex";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA1/PA120/index";
import queries from "@/graphql/queries/PA/PA1/PA120/index";
import notification from "@/utils/notification";
import {
  radioCheckForeigner,
  initFormStateTab1,
} from "../../utils/index";
import { companyId } from "@/helpers/commonFunction";
import _ from "lodash";
export default defineComponent({
  components: {

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

    let arrDataEdit = Array();
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    let isForeigner = ref(false);
    const triggerDepartments = ref(true);
    const arrDepartments = ref([]);
    const arrResponsibility = ref([]);
    const labelResidebId = ref("주민(외국인)번호 ");
    let formStateTab1 = reactive<any>({
      ...initFormStateTab1,
      joinedAt: dayjs().format("YYYY-MM-DD"),
      leavedAt: '',
    });

    let oldFormStateTab1 = {};
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
      result: getValueDefault,
      loading
    } = useQuery(queries.getEmployeeWage, originDataDetail, () => ({
      fetchPolicy: "no-cache",
    }))
    watch(getValueDefault,value => {
      let rowData = arrDataEdit.find(item => item.employeeId === props.idRowEdit);
      //If it already exists in arrDataEdit, fill it out in the form
      if (rowData) {
          formStateTab1.name = rowData.name
          formStateTab1.foreigner = rowData.foreigner
          formStateTab1.nationality = rowData.nationality
          formStateTab1.nationalityCode = rowData.nationalityCode
          formStateTab1.stayQualification = rowData.stayQualification
          formStateTab1.residentId = rowData.residentId.replace("-", "")
          formStateTab1.roadAddress = rowData.roadAddress
          formStateTab1.addressExtend = rowData.addressExtend
          formStateTab1.email = rowData.email
          formStateTab1.employeeId = rowData.employeeId
          formStateTab1.joinedAt = rowData.joinedAt
          formStateTab1.leavedAt = rowData.leavedAt
          formStateTab1.retirementIncome = rowData.retirementIncome
          formStateTab1.weeklyWorkingHours = rowData.weeklyWorkingHours
          formStateTab1.department = rowData.department
          formStateTab1.responsibility = rowData.responsibility
      }else{
        if(value){
          formStateTab1.name = value.getEmployeeWage.name
          formStateTab1.foreigner = value.getEmployeeWage.foreigner
          formStateTab1.nationality = value.getEmployeeWage.nationality
          formStateTab1.nationalityCode = value.getEmployeeWage.nationalityCode
          formStateTab1.stayQualification = value.getEmployeeWage.stayQualification
          formStateTab1.residentId = value.getEmployeeWage.residentId.replace("-", "")
          formStateTab1.roadAddress = value.getEmployeeWage.roadAddress
          formStateTab1.addressExtend = value.getEmployeeWage.addressExtend
          formStateTab1.email = value.getEmployeeWage.email
          formStateTab1.employeeId = value.getEmployeeWage.employeeId
          formStateTab1.joinedAt = value.getEmployeeWage.joinedAt ? dayjs(value.getEmployeeWage.joinedAt).format('YYYY-MM-DD') : ''
          formStateTab1.leavedAt = value.getEmployeeWage.leavedAt ? dayjs(value.getEmployeeWage.leavedAt).format('YYYY-MM-DD') : ''
          formStateTab1.retirementIncome = value.getEmployeeWage.retirementIncome
          formStateTab1.weeklyWorkingHours = value.getEmployeeWage.weeklyWorkingHours
          formStateTab1.department = value.getEmployeeWage.department
          formStateTab1.responsibility = value.getEmployeeWage.responsibility
          oldFormStateTab1 = {...formStateTab1}
        }

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
      store.state.common.reloadEmployeeList = !store.state.common.reloadEmployeeList
      notification('success', '업데이트 완료!')
    })

    watch(() => props.idRowEdit, (value) => {
      originDataDetail.value.employeeId = value
    })
    watch(() => props.openPopup, (value) => {
      refetchValueDetail()
    })
 
    //Compare the data after editing, if there is a difference, add it to the array arrEdit
    watch(() => JSON.parse(JSON.stringify(formStateTab1)), (newValue) => {   
      if (JSON.stringify(oldFormStateTab1) !== JSON.stringify(newValue)) {
        
        arrDataEdit = arrDataEdit.filter(function(item) { 
          return item.employeeId !== newValue.employeeId; 
        });
        arrDataEdit.push(newValue)

        //push the imployeeID into the arrayRoweditedPA120 array to identify the changed row 
        let arrEmployeeRowEdited = store.state.common.arrayRoweditedPA120.filter(function(item : any) {
            return item !== newValue.employeeId;
        })
        arrEmployeeRowEdited.push(newValue.employeeId)
        store.state.common.arrayRoweditedPA120 = arrEmployeeRowEdited;
      }
    },{deep:true})

    const actionUpdated = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        arrDataEdit.forEach(rowData => {
          let newValDataEdit = {
              ...rowData,
              joinedAt: rowData.joinedAt,
              leavedAt: rowData.leavedAt,
              residentId: rowData.residentId.slice(0, 6) + '-' + rowData.residentId.slice(6, 14)
            };
            delete newValDataEdit.employeeId;
            let dataCallCreat = {
              companyId: companyId,
              imputedYear: globalYear.value,
              employeeId: rowData.employeeId,
              input: newValDataEdit
            };
            mutate(dataCallCreat)
        })

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

  .roadAddress {
    margin-bottom: 5px;
  }
}
</style>
