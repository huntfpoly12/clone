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
      <div class="page-content" id="add-new-dependent-pa-120">
        <a-row>
          <a-col :span="12">
            <a-form-item label="연말관계" label-align="right" class="red">
              <dependants-relation-select-box
                width="200px"
                v-model:valueInput="formState.relation"
                :disabled="formState.relation == 0"
                :required="true"
                :itemSelected="dependantSelected"
              ></dependants-relation-select-box>
            </a-form-item>
            <a-form-item
              label="성명"
              label-align="right"
              class="red"
              @onChange="onChange"
            >
              <default-text-box
                placeholder="한글,영문(대문자) 입력 가능"
                width="200px"
                :required="true"
                :disabled="disabledButton || formState.relation == 0"
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
                :disabled="disabledButton || formState.relation == 0"
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
                :disabled="disabledButton || formState.relation == 0"
                v-model:valueInput="formState.residentId"
                :foreigner="formState.foreigner"
              >
              </id-number-text-box>
            </a-form-item>
            <a-form-item label="나이" label-align="right">
              <default-text-box
                width="200px"
                :disabled="true || formState.relation == 0"
                v-model:valueInput="ageCount"
              >
              </default-text-box>
            </a-form-item>
            <a-form-item label="기본공제" label-align="right" class="red">
              <basic-deduction-select-box
                width="200px"
                v-model:valueInput="formState.basicDeduction"
                :required="true"
                :disabled="disabledButton || formState.relation == 0"
                :ageCount="ageCount"
                :itemSelected="deductionSelected"
                :alllSelected="formState.relation == 0 ? true : false"
              />
            </a-form-item>
            <a-form-item label="부녀자" label-align="right">
              <switch-basic
                textCheck="O"
                textUnCheck="X"
                v-model:valueSwitch="formState.women"
                :disabled="formState.relation == 0"
              />
            </a-form-item>
            <a-form-item label="한부모" label-align="right">
              <div class="input-text">
                <switch-basic
                  textCheck="O"
                  textUnCheck="X"
                  v-model:valueSwitch="formState.singleParent"
                  :disabled="formState.relation == 0"
                />
                <a-tooltip placement="top" class="custom-tooltip">
                  <template #title> 부녀자 공제와 중복 공제 불가 </template>
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
                  v-model:valueSwitch="formState.senior"
                  :disabled="isDisabledSenior || formState.relation == 0"
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
                :disabled="formState.relation == 0"
              >
              </disabled-type-radio-group>
            </a-form-item>
            <a-form-item label="출산입양" label-align="right">
              <maternity-adoption-radio-box
                v-model:valueRadioCheck="formState.maternityAdoption"
                :disabled="formState.relation == 0"
              >
              </maternity-adoption-radio-box>
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
                  :disabled="consignDisabled || formState.relation == 0"
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
                :disabled="formState.relation == 0"
                v-model:valueInput="formState.consignmentRelationship"
              ></default-text-box>
            </a-form-item>
            <!-- <a-form-item label="세대주여부" label-align="right">
                                <switch-basic textCheck="O" textUnCheck="X" v-model:valueSwitch="householder" />
                            </a-form-item> -->
          </a-col>
        </a-row>
      </div>
      <a-row style="margin-top: 40px" justify="center">
        <button-basic
          style="margin-right: 20px"
          text="삭제"
          mode="contained"
          :width="90"
          :disabled="disabledButton || formState.relation == 0"
          @onClick="actionDeleteFuc($event)"
        />
        <button-basic
          text="저장"
          type="default"
          mode="contained"
          :width="90"
          @onClick="actionUpdated($event)"
          :disabled="disabledButton || formState.relation == 0"
        />
      </a-row>

      <!-- <PopupMessage :modalStatus="modalStatusDelete" @closePopup="modalStatusDelete = false" typeModal="confirm"
        :content="() => vnode" okText="네. 삭제합니다" cancelText="아니요" @checkConfirm="statusComfirm" /> -->
      <a-modal
        :visible="modalStatusDelete"
        @cancel="modalStatusDelete = false"
        :mask-closable="false"
        class="confirm-md"
        footer=""
        :width="500"
      >
        <standard-form action="" name="delete-510">
          <div class="custom-modal-delete">
            <img
              src="@/assets/images/icon_delete.png"
              alt=""
              style="width: 30px"
            />
            <div>
              <div>
                연말정산에 이미 반영된 경우, 삭제 후 연말정산 재정산해야
              </div>
              <div>합니다. 그래도 삭제하시겠습니까?</div>
            </div>
          </div>
          <div class="text-center mt-20">
            <button-basic
              class="mr-5"
              :text="'아니요'"
              :type="'default'"
              :mode="'outlined'"
              @onClick="modalStatusDelete = false"
            />
            <button-basic
              class="ml-5"
              :text="'네. 삭제합니다'"
              :width="140"
              :type="'default'"
              :mode="'contained'"
              @onClick="statusComfirm"
            />
          </div>
        </standard-form>
      </a-modal>
      <!-- </a-spin> -->
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
import { taxWaring } from "../../utils/index";
import { h } from "vue";
import { Message } from "@/configs/enum";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
const messageDelete = Message.getMessage("COMMON", "402").message;
const vnode = h("div", [
  h("div", "연말정산에 이미 반영된 경우, 삭제 후 연말정산 재정산해야 "),
  h("div", "합니다. 그래도 삭제하시겠습니까?"),
]);
export default defineComponent({
  components: {},
  props: {
    modalStatus: Boolean,
    idRowEdit: {
      type: Number,
    },
    dependentItem: Object,
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
    const trigger = ref<boolean>(true);
    const globalYear = ref<number>(
      parseInt(sessionStorage.getItem("paYear") ?? "0")
    );
    const modalStatusDelete = ref(false);
    const idAction = ref();
    let disabledButton = ref<boolean>(false);
    let formState = reactive<any>({ ...props.dependentItem });
    let formStateToCompare = { ...props.dependentItem };
    const labelResidebId = ref(
      formState.foreigner ? "외국인번호 유효성" : "주민등록번호"
    );
    const ageCount = ref<any>(convertAge(props.dependentItem?.residentId));
    const isDisabledSenior = ref(ageCount.value < 70 ? true : false);
    const dependantSelected = ref<any>([...props.relationAll]);
    const deductionSelected = ref<any>([...props.deductionAll]);
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
    const householder = ref(formState.householder == true ? 1 : 0);
    watch(householder, (newValue) => {
      if (newValue == 1) {
        formState.householder = true;
      } else {
        formState.householder = false;
      }
    });
    // foreigner
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
    // get employer dependent
    watch(
      () => props.dependentItem,
      (newVal: any) => {
        dependantSelected.value = dependantSelected.value.filter(
          (item: any) => item.value !== newVal.relation
        );
        deductionSelected.value = deductionSelected.value.filter(
          (item: any) => item.value !== newVal.basicDeduction
        );
        formState.relation = newVal.relation;
        formState.foreigner = newVal.foreigner;
        formState.residentId = newVal.residentId.replace("-", "");
        formState.basicDeduction = newVal.basicDeduction;
        formState.women = newVal.women;
        formState.singleParent = newVal.singleParent;
        formState.senior = newVal.senior;
        formState.disabled = newVal.disabled;
        formState.maternityAdoption = newVal.maternityAdoption;
        formState.descendant = newVal.descendant;
        formState.consignmentRelationship = newVal.consignmentRelationship;
        ageCount.value = convertAge(formState.residentId);
      },
      { deep: true }
    );
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
        formState.senior =
          ageCount.value < 70 ? false : props.dependentItem?.senior;
      },
      { deep: true }
    );
    const { mutate, onError, onDone } = useMutation(
      mutations.updateEmployeeWageDependent
    );
    onError((e) => {
      //notification('error', e.message)
    });
    onDone(() => {
      emit("closePopup", false);
      notification("success", Message.getMessage("COMMON", "106").message);
      emit("upDateData");
    });
    const actionUpdated = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        let newValDataEdit = {
          ...formState,
        };
        // newValDataEdit.residentId = formState.residentId.slice(0, 6) + "-" + formState.residentId.slice(6, 13);
        delete newValDataEdit?.employeeId;
        delete newValDataEdit?.incomeTypeCode;
        delete newValDataEdit?.index;
        delete newValDataEdit?.residentIdValidity;
        delete newValDataEdit?.__typename;
        delete newValDataEdit?.householder;

        let dataCallUpdate = {
          companyId: companyId,
          imputedYear: globalYear.value,
          employeeId: ref(props.idRowEdit).value,
          index: formState.index,
          input: newValDataEdit,
        };
        mutate(dataCallUpdate);
      }
    };
    watch(
      () => formState.relation,
      (value) => {
        if (value == 0) {
          disabledButton.value = true;
        } else disabledButton.value = false;
      },
      { deep: true }
    );
    const {
      mutate: actionDelete,
      onError: errorDelete,
      onDone: successDelete,
    } = useMutation(mutations.deleteEmployeeWageDependent);
    errorDelete((e) => {
      //notification('error', e.message)
    });
    successDelete((e) => {
      notification("success", messageDelete);
      trigger.value = true;
      emit("closePopup", false);
      emit("upDateData");
    });
    const actionDeleteFuc = (data: any) => {
      idAction.value = data;
      modalStatusDelete.value = true;
    };
    const statusComfirm = () => {
      if (formState.relation != 0)
        actionDelete({
          companyId: companyId,
          imputedYear: globalYear.value,
          employeeId: ref(props.idRowEdit).value,
          index: formState.index,
        });
    };
    // check consignment
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
    dependantSelected.value = dependantSelected.value.filter(
      (item: any) => item.value !== formState.relation
    );
    deductionSelected.value = deductionSelected.value.filter(
      (item: any) => item.value !== formState.basicDeduction
    );
    const onChange = (emitVal: any) => {
      formState.name = emitVal.toUpperCase();
    };
    return {
      // women,
      // singleParent,
      // loading,
      householder,
      // senior,
      formState,
      ageCount,
      disabledButton,
      convertAge,
      setModalVisible,
      actionUpdated,
      statusComfirm,
      labelResidebId,
      actionDeleteFuc,
      modalStatusDelete,
      isDisabledSenior,
      dependantSelected,
      consignDisabled,
      vnode,
      onChange,
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
