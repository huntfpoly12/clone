<template>
  <div class="d-flex resident-ctn" :style="{ width: widthCustom }">
    <DxTextBox ref="residentRef" :width="widthCustom" value-change-event="input"
               :show-clear-button="clearButton" v-model:value="value" :disabled="disabled" :readOnly="readOnly"
               @input="updateValue(value)" :mask="mask" :mask-invalid-message="maskMess" :height="$config_styles.HeightInput"
               :name="nameInput" @focusIn="onFocusIn" :style="{ width: widthCustom }">
      <DxValidator ref="validatorRef" :name="nameInput" :validation-summary="true">
        <DxRequiredRule v-if="required" :message="messageRequired" />
        <!-- <DxCustomRule v-if="isResidentId"
          :validation-callback="checkAllResidentId ? checkAllID : (foreigner ? checkID : checkIdNotForeigner)" /> -->
      </DxValidator>
    </DxTextBox>
    <div class="resident-tooltip">
      <span v-if="errorCurrentType == 1" class="error-1">x</span>
      <a-tooltip placement="top" v-if="errorCurrentType == 2">
        <template #title>
          <b>잘못된 주민등록번호</b><br />
          입력하신 번호는 주민등록번호 생성규칙에 맞지 않습니다.
        </template>
        <WarningOutlined :style="{ fontSize: '17px', color: 'orange' }" />
      </a-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import {
  DxValidator,
  DxRequiredRule,
  DxCustomRule,
} from "devextreme-vue/validator";
import { defineComponent, ref, watch, getCurrentInstance, onMounted } from "vue";
import { DxTextBox, DxButton } from 'devextreme-vue/text-box';
import { validResidentId } from "@bankda/jangbuda-common";
import { Message } from '@/configs/enum';
import { WarningOutlined } from "@ant-design/icons-vue";
import { computed } from "vue";
export default defineComponent({
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    messRequired: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "100%",
    },
    clearButton: Boolean,
    disabled: Boolean,
    valueInput: {
      type: String,
      default: "",
    },
    readOnly: Boolean,
    nameInput: {
      type: String,
      default: '',
    },
    foreigner: {
      type: Boolean,
      default: false,
    },
    isResidentId: {
      type: Boolean,
      default: true,
    },
    mask: {
      type: String,
      default: "000000-0000000",
    },
    checkAllResidentId: {
      type: Boolean,
      default: false,
    },
    select: {
      type: Boolean,
      default: true,
    }
  },
  components: {
    DxTextBox,
    DxValidator,
    DxRequiredRule,
    DxCustomRule,
    DxButton,
    WarningOutlined,
  },
  setup(props, { emit }) {
    const app: any = getCurrentInstance()
    const messages = app.appContext.config.globalProperties.$messages;
    // const mask = ref("000000-0000000");
    const maskMess = ref(messages.getCommonMessage('105').message);
    const messageRequired = ref(messages.getCommonMessage('102').message);
    const msgError = Message.getMessage('COMMON', '701').message;
    const residentRef = ref();
    const errorCurrentType = ref(0);
    const validatorRef = ref();
    const widthCustom = computed(() => {
      if (props.width == '100%') {
        return props.width;
      }
      if (props.width.toString().includes("%")){
        return props.width;
      }
      if (typeof +props.width == 'number' && +props.width > 0) {
        return props.width + 'px';
      }
      return props.width;
    })
    if (props.messRequired != "") {
      messageRequired.value = props.messRequired;
    }
    const alert = ref<boolean>(true);
    const convertValue = (val: string) => {
      if (val.length === 14 && val.includes("-")) return val.split("-").join("")
      return val;
    };
    const value = ref(props.valueInput);
    const validateId = () => {
      let isValid = validatorRef.value?.instance._validationInfo.result;
      let msgDefault = residentRef.value.instance._$validationMessage;
      if (props.isResidentId) {
        alert.value = props.checkAllResidentId ? checkAllID() : (props.foreigner ? checkID() : checkIdNotForeigner());
      }else{
        alert.value = true;
      }
      if (!alert.value) {
        errorCurrentType.value = 2;
        residentRef.value.instance._$textEditorInputContainer[0].classList.add('error-other');
      }
      if (isValid?.brokenRule?.editorSpecific) {
        errorCurrentType.value = 1;
        if (msgDefault) {
          msgDefault[0].style.display = 'none';
        }
        residentRef.value.instance._$textEditorInputContainer[0].classList.add('error-other');
      }
      if (alert.value && !isValid?.brokenRule?.editorSpecific) {
        errorCurrentType.value = 0;
        if (msgDefault) {
          msgDefault[0].style.display = 'block';
        }
        residentRef.value.instance._$textEditorInputContainer[0].classList.remove('error-other');
      }
    }
    watch(() => props.isResidentId, (newVal: any) => {
      validateId();
    }, { deep: true });
    const updateValue = (value: any) => {
      validateId();
      emit("update:valueInput", value);
    };
    watch(
      () => props.valueInput,
      (newValue) => {
        let isValid = validatorRef.value?.instance._validationInfo.result;
        let msgDefault = residentRef.value.instance._$validationMessage;
        if (isValid?.brokenRule?.type == 'custom') {
          errorCurrentType.value = 2;
          msgDefault[0].style.display = 'none';
          residentRef.value.instance._$textEditorInputContainer[0].classList.add('error-other');
        }
        value.value = convertValue(newValue || "");
      }
    );
    const checkID = () => {
      if (!value.value) {
        return true
      }
      const fNumber = value.value ? parseInt(value.value.charAt(6)) : 0;
      if (fNumber > 4 && fNumber < 9) {
        return validResidentId(value.value);
      } else {
        return false
      };
    }
    const checkAllID = () => {
      if (!value.value) return true
      return validResidentId(value.value);
    }

    const checkIdNotForeigner = () => {
      if (!value.value) {
        return true
      }
      const fNumber = value.value ? parseInt(value.value?.charAt(6)) : 0;
      if (fNumber <= 4 || fNumber >= 9) {
        return validResidentId(value.value);
      } else {
        return false
      }
    }
    const onFocusIn = (e: any) => {
      let isValid = validatorRef.value?.instance._validationInfo.result;
      let msgDefault = residentRef.value.instance._$validationMessage;
      if (isValid?.brokenRule?.type == 'custom') {
        errorCurrentType.value = 2;
        msgDefault[0].style.display = 'none';
        residentRef.value.instance._$textEditorInputContainer[0].classList.add('error-other');
      }
      const input = e.event.target;
      setTimeout(() => {
        input.selectionStart = input.selectionEnd = 0;
      }, 50);
    }
    return {
      updateValue,
      value,
      // mask,
      maskMess,
      messageRequired,
      msgError,
      validResidentId,
      checkID,
      checkIdNotForeigner,
      checkAllID,
      onFocusIn,
      residentRef,
      // requiredButton, formatButton,
      validatorRef,
      errorCurrentType,
      widthCustom,
    };
  },
});
</script>
<style lang="scss" scoped>
.resident-ctn {
  position: relative;

  :deep div.dx-overlay-content.dx-resizable {
    visibility: hidden;
  }

  .dx-invalid.dx-texteditor {

    :deep .dx-texteditor-input-container.error-other {
      &::after {
        display: none;
      }

    }

  }

  .dx-datagrid-validator.dx-validator.dx-datagrid-invalid::after {
    border-color: unset;
  }

  .resident-tooltip {
    position: absolute;
    right: 0;
    top: 0;
    width: 28px;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    .error-1 {
      font-size: 16px;
      line-height: 14px;
      height: 17px;
      border-radius: 100%;
      width: 18px;
      font-weight: 700;
      background: red;
      color: white;
      text-align: center;
    }
  }
}
</style>
