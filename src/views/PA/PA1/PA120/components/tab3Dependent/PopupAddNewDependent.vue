<template>
  <div>
    <a-modal
      :visible="modalStatus"
      title="부양가족 등록"
      centered
      @cancel="setModalVisible()"
      :mask-closable="false"
      :width="750"
      :footer="null"
      :bodyStyle="{ padding: '0px', height: '478px' }"
    >
      <a-spin :spinning="loading" size="large">
        <StandardForm >
          <div class="page-content" id="add-new-dependent-pa-120">
            <a-row>
              <a-col :span="12">
                <a-form-item label="연말관계" label-align="right" class="red">
                  <dependants-relation-select-box
                    width="200px"
                    v-model:valueInput="formState.relation"
                    :required="true"
                    :itemSelected="dependantSelected"
                  ></dependants-relation-select-box>
                </a-form-item>
                <a-form-item label="성명" label-align="right" class="red">
                  <default-text-box
                    placeholder="한글,영문(대문자) 입력 가능"
                    width="200px"
                    :required="true"
                    @onChange="onChange"
                    v-model:valueInput="formState.name"
                  ></default-text-box>
                </a-form-item>
                <a-form-item
                  label="내/외국인"
                  label-align="right"
                  class="switchForeigner"
                >
                  <switch-basic
                    textCheck="외국인"
                    textUnCheck="내국인"
                    v-model:valueSwitch="formState.foreigner"
                  />
                </a-form-item>
                <a-form-item
                  :label="labelResidebId"
                  label-align="right"
                  class="red"
                >
                  <id-number-text-box
                    :required="true"
                    width="150px"
                    :foreigner="formState.foreigner"
                    v-model:valueInput="formState.residentId"
                  ></id-number-text-box>
                </a-form-item>
                <a-form-item label="나이" label-align="right">
                  <default-text-box
                    width="200px"
                    :disabled="true"
                    v-model:valueInput="ageCount"
                  ></default-text-box>
                </a-form-item>
                <a-form-item label="기본공제" label-align="right" class="red">
                  <basic-deduction-select-box
                    width="200px"
                    v-model:valueInput="formState.basicDeduction"
                    :ageCount="ageCount"
                    :required="true"
                    :itemSelected="deductionSelected"
                  />
                </a-form-item>
                <a-form-item label="부녀자" label-align="right">
                  <switch-basic
                    textCheck="O"
                    textUnCheck="X"
                    v-model:valueSwitch="formState.women"
                  />
                </a-form-item>
                <a-form-item label="한부모" label-align="right">
                  <div class="input-text">
                    <switch-basic
                      textCheck="O"
                      textUnCheck="X"
                      v-model:valueSwitch="formState.singleParent"
                    />
                    <a-tooltip placement="top" class="custom-tooltip">
                      <template #title> 부녀자 공제와 중복 공제 불가</template>
                      <div style="text-align: center">
                        <img
                          src="@/assets/images/iconInfo.png"
                          style="width: 14px; height: 14px"
                          class="mb-5 ml-10"
                        />
                      </div>
                    </a-tooltip>
                  </div>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="경로우대" label-align="right">
                  <div class="input-text">
                    <switch-basic
                      textCheck="O"
                      textUnCheck="X"
                      v-model:valueSwitch="senior"
                      :disabled="isDisabledSenior"
                    />
                    <a-tooltip placement="top" class="custom-tooltip">
                      <template #title> 만 70세 이상 </template>
                      <div style="text-align: center">
                        <img
                          src="@/assets/images/iconInfo.png"
                          style="width: 14px; height: 14px"
                          class="mb-5 ml-10"
                        />
                      </div>
                    </a-tooltip>
                  </div>
                </a-form-item>
                <a-form-item label="장애인" label-align="right">
                  <disabled-type-radio-group
                    v-model:valueRadioCheck="formState.disabled"
                  ></disabled-type-radio-group>
                </a-form-item>
                <a-form-item label="출산입양" label-align="right">
                  <maternity-adoption-radio-box
                    v-model:valueRadioCheck="formState.maternityAdoption"
                  ></maternity-adoption-radio-box>
                </a-form-item>
                <a-form-item
                  label="자녀세액공제"
                  label-align="right"
                  class="d-flex-nowrap"
                >
                  <div class="input-text long-text">
                    <switch-basic
                      textCheck="O"
                      textUnCheck="X"
                      v-model:valueSwitch="formState.descendant"
                      :disabled="consignDisabled"
                    />
                    <a-tooltip placement="top" class="custom-tooltip">
                      <template #title>
                        7세 이상 20세 이하의 자녀인 경우 공제 대상
                      </template>
                      <div style="text-align: center">
                        <img
                          src="@/assets/images/iconInfo.png"
                          style="width: 14px; height: 14px"
                          class="mb-5 ml-10"
                        />
                      </div>
                    </a-tooltip>
                  </div>
                </a-form-item>
                <a-form-item label="위탁관계" label-align="right">
                  <default-text-box
                    placeholder="최대 20자"
                    width="200px"
                    :maxCharacter="20"
                    v-model:valueInput="formState.consignmentRelationship"
                  ></default-text-box>
                </a-form-item>
                <!-- <a-form-item label="세대주여부" label-align="right">
                  <switch-basic textCheck="O" textUnCheck="X" v-model:valueSwitch="householder" />
                </a-form-item> -->
              </a-col>
            </a-row>
          </div>
          <a-row style="margin-top: 40px">
            <a-col :span="8" :offset="8" style="text-align: center">
              <button-basic
                text="저장"
                type="default"
                mode="contained"
                :width="90"
                @onClick="createNewEmployeeWageDependent($event)"
              />
            </a-col>
          </a-row>
        </StandardForm>
      </a-spin>
    </a-modal>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  watch,
  watchEffect,
} from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useStore } from "vuex";
import mutations from "@/graphql/mutations/PA/PA1/PA120";
import notification from "@/utils/notification";
import { companyId, convertAge } from "@/helpers/commonFunction";
import { taxWaring } from "../../utils";
import { Message } from "@/configs/enum";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
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
    relationAll: {
      type: Array,
      default: [],
    },
    deductionAll: {
      type: Array,
      default: [],
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const globalYear = ref<number>(
      parseInt(sessionStorage.getItem("paYear") ?? "0")
    );
    const isForeignerPA120 = computed(
      () => store.state.common.isForeignerPA120
    );
    const ageCount = ref();
    const dependantSelected = ref<any>([...props.relationAll]);
    const deductionSelected = ref<any>([...props.deductionAll]);
    const initialFormState = {
      relation: 1,
      name: "",
      residentId: "",
      basicDeduction: 0,
      women: false,
      singleParent: false,
      senior: false,
      disabled: 0,
      maternityAdoption: 0,
      descendant: false,
      consignmentRelationship: null,
      index: dependantSelected.value.length + 1,
    };
    const formState = reactive<any>({
      ...initialFormState,
      foreigner: isForeignerPA120.value,
    });
    let formStateToCompare = {
      ...initialFormState,
      foreigner: isForeignerPA120.value,
    };
    const messageSave = Message.getMessage("COMMON", "106").message;
    const isDisabledSenior = ref(ageCount.value < 70 ? true : false);
    const labelResidebId = ref(
      formState.foreigner ? "외국인번호 유효성" : "주민등록번호"
    );
    const formStateTab1PA120 = computed(
      () => store.state.common.formStateTab1PA120
    );

    const setModalVisible = () => {
      if (JSON.stringify(formStateToCompare) == JSON.stringify(formState)) {
        emit("closePopup", false);
      } else {
        comfirmClosePopup(() => emit("closePopup", false));
      }
    };
    const notifcationTax = () => {
      notification("warning", taxWaring);
      setTimeout(() => {
        formState.women = false;
      }, 200);
    };
    watch(
      () => formState.women,
      (newValue) => {
        if (newValue == true && formState.singleParent == true) {
          notifcationTax();
        }
      },
      { deep: true }
    );
    watch(
      () => formState.singleParent,
      (newValue) => {
        if (newValue == true && formState.women == true) {
          notifcationTax();
        }
      },
      { deep: true }
    );
    const senior = ref(formState.senior == true ? 1 : 0);
    watch(senior, (newValue) => {
      if (newValue == 1) {
        formState.senior = true;
      } else {
        formState.senior = false;
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
    watch(
      () => formState.foreigner,
      (newValue) => {
        if (newValue) {
          formState.foreigner = true;
          labelResidebId.value = "외국인번호 유효성";
        } else {
          formState.foreigner = false;
          labelResidebId.value = "주민등록번호";
        }
      },
      { deep: true }
    );
    //residenId
    const residentId = ref("");
    // watch(residentId, (newValue: any) => {
    //   formState.residentId = newValue.slice(0, 6) + '-' + newValue.slice(6, 13);
    //   if (newValue.length >= 7) {
    //     ageCount.value = convertAge(formState.residentId);
    //   }
    // });

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
      notification("success", messageSave);
      emit("upDateData");
      emit("closePopup", false);
    });

    onError((error) => {
      //notification('error', error.message);
    });

    const createNewEmployeeWageDependent = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        let dataNew = {
          companyId: companyId,
          employeeId: formStateTab1PA120.value.employeeId,
          imputedYear: globalYear.value,
          input: {
            ...formState,
            index: ref(props.dataSourceLen).value + 1,
          },
        };
        createEmployeeWageDependent(dataNew);
      }
    };
    watch(
      () => formState.residentId,
      (newVal) => {
        let count;
        if (newVal.length == 13) {
          count = newVal.slice(0, 6) + "-" + newVal.slice(6, 13);
          ageCount.value = convertAge(count);
        } else if (newVal.length < 13) {
          count = newVal.toString();
          ageCount.value = convertAge(count);
        }
        isDisabledSenior.value = ageCount.value < 70 ? true : false;
      },
      { deep: true }
    );
    watch(isForeignerPA120, (newVal: any) => {
      formState.foreigner = newVal;
    });
    const consignDisabled = ref(true);
    watchEffect(() => {
      if (
        (formState.relation == 4 || formState.relation == 8) &&
        ageCount.value > 7 &&
        ageCount.value < 20
      ) {
        consignDisabled.value = false;
      } else {
        consignDisabled.value = true;
      }
    });
    const onChange = (emitVal: any) => {
      formState.name = emitVal.toUpperCase();
    };
    return {
      loading,
      householder,
      senior,
      formState,
      ageCount,
      //   foreigner,
      residentId,
      setModalVisible,
      labelResidebId,
      createNewEmployeeWageDependent,
      isDisabledSenior,
      dependantSelected,
      consignDisabled,
      onChange,
      formStateTab1PA120,
      deductionSelected,
    };
  },
});
</script>
<style lang="scss" scoped>
#add-new-dependent-pa-120 {
  :deep .ant-form-item-label > label {
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

  :deep .red {
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

  :deep .ant-row.ant-form-item.d-flex-nowrap {
    display: flex !important;
    flex-wrap: nowrap;

    .long-text {
      align-items: start;
      padding-top: 3px;
    }
  }
}
</style>
