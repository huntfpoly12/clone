<template>
  <div>
    <a-modal :visible="modalStatus" title="사원등록" centered @cancel="setModalVisible()" :mask-closable="false"
      :width="750" :footer="null" :bodyStyle="{ padding: '0px', height: '478px' }">
      <a-spin :spinning="loading" size="large">
        <div class="page-content" id="add-new-dependent-pa-120">
          <a-row>
            <a-col :span="12">
              <a-form-item label="연말관계" label-align="right" class="red">
                <dependants-relation-select-box width="200px" v-model:valueInput="formState.relation"
                  :required="true"></dependants-relation-select-box>
              </a-form-item>
              <a-form-item label="성명" label-align="right" class="red">
                <default-text-box placeholder="한글,영문(대문자) 입력 가능" width="200px" :required="true"
                  v-model:valueInput="formState.name"></default-text-box>
              </a-form-item>
              <a-form-item label="내/외국인" label-align="right" class="switchForeigner">
                <switch-basic textCheck="외국인" textUnCheck="내국인" v-model:valueSwitch="formState.foreigner" />
              </a-form-item>
              <a-form-item :label="labelResidebId" label-align="right" class="red">
                <id-number-text-box :required="true" width="150px" v-model:valueInput="residentId"></id-number-text-box>
              </a-form-item>
              <a-form-item label="나이" label-align="right">
                <default-text-box width="200px" :readOnly="true" v-model:valueInput="ageCount"></default-text-box>
              </a-form-item>
              <a-form-item label="기본공제" label-align="right" class="red">
                <basic-deduction-select-box width="200px" v-model:valueInput="formState.basicDeduction"
                  :required="true" />
              </a-form-item>
              <a-form-item label="부녀자" label-align="right">
                <switch-basic textCheck="O" textUnCheck="X" v-model:valueSwitch="formState.women" />
              </a-form-item>
              <a-form-item label="한부모" label-align="right">
                <switch-basic textCheck="O" textUnCheck="X" v-model:valueSwitch="formState.singleParent" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="경로우대" label-align="right">
                <switch-basic textCheck="O" textUnCheck="X" v-model:valueSwitch="senior" />
              </a-form-item>
              <a-form-item label="장애인" label-align="right">
                <disabled-type-radio-group v-model:valueRadioCheck="formState.disabled"></disabled-type-radio-group>
              </a-form-item>
              <a-form-item label="출산입양" label-align="right">
                <maternity-adoption-radio-box
                  v-model:valueRadioCheck="formState.maternityAdoption"></maternity-adoption-radio-box>
              </a-form-item>
              <a-form-item label="자녀세액공제" label-align="right">
                <switch-basic textCheck="O" textUnCheck="X" v-model:valueSwitch="descendant" />
              </a-form-item>
              <a-form-item label="위탁관계" label-align="right">
                <default-text-box placeholder="최대 20자" width="200px" :maxCharacter="20"
                  v-model:valueInput="formState.consignmentRelationship"></default-text-box>
              </a-form-item>
              <!-- <a-form-item label="세대주여부" label-align="right">
                <switch-basic textCheck="O" textUnCheck="X" v-model:valueSwitch="householder" />
              </a-form-item> -->
            </a-col>
          </a-row>
        </div>
        <a-row style="margin-top: 40px">
          <a-col :span="8" :offset="8" style="text-align: center">
            <button-basic text="저장" type="default" mode="contained" :width="90"
              @onClick="createNewEmployeeWageDependent($event)" />
          </a-col>
        </a-row>
      </a-spin>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed, watch } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { useStore } from 'vuex';
import mutations from '@/graphql/mutations/PA/PA1/PA120';
import notification from '@/utils/notification';
import {
  companyId,
  convertAge,
} from '@/helpers/commonFunction';
import { taxWaring } from '../../utils';
import { Message } from '@/configs/enum';
export default defineComponent({
  components: {},
  props: {
    employeeId: {
      type: Number,
      default: 0,
    },
    modalStatus: Boolean,
    dataSourceLen: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const isForeignerPA120 = computed(() => store.state.common.isForeignerPA120)
    const ageCount = ref();
    const labelResidebId = ref('주민등록번호');
    const initialFormState = {
      relation: null,
      name: '',
    //   foreigner: false,
      residentId: '',
      basicDeduction: null,
      women: false,
      singleParent: false,
      senior: false,
      disabled: 0,
      maternityAdoption: 0,
      descendant: true,
      consignmentRelationship: '',
      index: 2,
    };
    const formState = reactive<any>({ ...initialFormState, foreigner: isForeignerPA120.value });
    const messageSave = Message.getMessage('COMMON', '106').message

    const setModalVisible = () => {
      emit('closePopup', false);
    };
    const notifcationTax = () => {
      notification('warning', taxWaring);
      setTimeout(()=> {
          formState.women = false;
      }, 200)
    }
    watch(()=>formState.women, (newValue) => {
        if (newValue == true  && formState.singleParent == true) {
            notifcationTax();
        }
    },{deep:true});
    watch(()=>formState.singleParent, (newValue) => {
        if (newValue == true  && formState.women == true) {
            notifcationTax();
        }
    },{deep:true});
    const senior = ref(formState.senior == true ? 1 : 0);
    watch(senior, (newValue) => {
      if (newValue == 1) {
        formState.senior = true;
      } else {
        formState.senior = false;
      }
    });
    const descendant = ref(formState.descendant == true ? 1 : 0);
    watch(descendant, (newValue) => {
      if (newValue == 1) {
        formState.descendant = true;
      } else {
        formState.descendant = false;
      }
    });
    const householder = ref(formState.householder == true ? 1 : 0);
    watch(householder, (newValue) => {
    if (newValue == 1) {
        formState.householder = true;
    } else {
        formState.householder = false;
    }
    });
    // const foreigner = ref<Number|Boolean>(formState.foreigner == true ? 1 : 0);
    watch(formState.foreigner, (newValue) => {
      if (newValue) {
        formState.foreigner = true;
        labelResidebId.value = '주민등록번호';
    } else {
        formState.foreigner = false;
        labelResidebId.value = '외국인번호 유효성';
      }
    });
    const residentId = ref('');
    watch(residentId, (newValue: any) => {
      formState.residentId = newValue.slice(0, 6) + '-' + newValue.slice(6, 13);
      if (newValue.length >= 7) {
        ageCount.value = convertAge(formState.residentId);
      }
    });

    watch(
      () => props.modalStatus,
      (newValue: any) => {
        if (newValue) {
          Object.assign(formState, initialFormState);
        }
      }
    );
    // createEmployeeWage
    const {
      mutate: createEmployeeWageDependent,
      loading: loading,
      onDone: onDoneAdd,
      onError,
    } = useMutation(mutations.createEmployeeWageDependent);

    onDoneAdd((res) => {
      notification('success', messageSave);
      emit('upDateData');
    });

    onError((error) => {
      notification('error', error.message);
    });

    const createNewEmployeeWageDependent = (e: any) => {
      var res = e.validationGroup.validate();
      if (props.employeeId) {
        if (!res.isValid) {
          res.brokenRules[0].validator.focus();
        } else {
          let dataNew = {
            companyId: companyId,
            employeeId: ref(props.employeeId).value,
            imputedYear: globalYear.value,
            input: {
              ...formState,
              index: ref(props.dataSourceLen).value + 1,
            },
          };
          createEmployeeWageDependent(dataNew);
          setModalVisible();
        }
      }
    };
    watch(()=>formState.residentId,(newVal)=> {
            let count;
            if(newVal.length==13){
                count = newVal.slice(0, 6) + "-" + newVal.slice(6, 13);
                ageCount.value = convertAge(count);
            }else if(newVal.length<13){
                count  = newVal.toString();
                ageCount.value = convertAge(count);
            }
    },{deep: true})
    watch(isForeignerPA120,(newVal: any)=>{
        formState.foreigner = newVal;
    })
    return {
      loading,
      householder,
      senior,
      descendant,
      formState,
      ageCount,
    //   foreigner,
      residentId,
      setModalVisible,
      labelResidebId,
      createNewEmployeeWageDependent,
    };
  },
});
</script>
<style lang="scss" scoped>
#add-new-dependent-pa-120 {
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
  .switchForeigner {
        :deep .ant-switch {
            background-color: #1890ff;
        }
    }
}
</style>
