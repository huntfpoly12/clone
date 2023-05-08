<template>
  <div class="d-flex resident-ctn">
    <DxTextBox id="resident-id" ref="residentRef" :width="widthCustom" value-change-event="input"
      :show-clear-button="clearButton" v-model:value="value" :disabled="disabled" :readOnly="readOnly"
      @input="updateValue(value)" :mask="mask" :height="$config_styles.HeightInput" :name="nameInput" @focusIn="onFocusIn"
      :style="{ width: widthCustom }">
      <DxValidator ref="validatorRef" :name="nameInput">
        <DxRequiredRule v-if="required" :message="messageRequired" />
        <DxCustomRule v-if="isResidentId"
          :validation-callback="checkAllResidentId ? checkAllID : (foreigner ? checkID : checkIdNotForeigner)" />
      </DxValidator>
    </DxTextBox>
    <div class="custom-tooltip">
      <span v-if="errorCurrentType == 1" class="error-1">x</span>
      <a-tooltip placement="top" v-if="errorCurrentType == 2">
        <template #title>
          <b>잘못된 주민등록번호</b><br/>
          입력하신 번호는 주민등록번호 생성규칙에 맞지 않습니다.
        </template>
        <WarningOutlined :style="{ fontSize: '19px', color: 'orange' }"/>
      </a-tooltip>
    </div>
  </div>

  <!-- <DxTextBox value="password" styling-mode="filled" placeholder="password">
    <DxButton :options="passwordButton" name="password" location="after" />
  </DxTextBox> -->
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
      if (typeof +props.width == 'string') {
        return props.width
      } else if (typeof +props.width == 'number') {
        return props.width + 'px';
      }
      return '200px';
    })
    if (props.messRequired != "") {
      messageRequired.value = props.messRequired;
    }
    const convertValue = (val: string) => {
      if (val.length === 14 && val.includes("-")) return val.split("-").join("")
      return val;
    };
    const value = ref(props.valueInput);

    const updateValue = (value: any) => {
      let isValid = validatorRef.value?.instance._validationInfo.result;
      if (isValid.brokenRule?.type == 'custom') {
        errorCurrentType.value = 2;
        residentRef.value.instance._$validationMessage[0].style.display = 'none';
        residentRef.value.instance._$textEditorInputContainer[0].classList.add('error-other');
      } else if (isValid.brokenRule?.editorSpecific) {
        errorCurrentType.value = 1;
        residentRef.value.instance._$validationMessage[0].style.display = 'none';
        residentRef.value.instance._$textEditorInputContainer[0].classList.add('error-other');
      } else {
        errorCurrentType.value = 0;
        residentRef.value.instance._$validationMessage[0].style.display = 'block';
        residentRef.value.instance._$textEditorInputContainer[0].classList.remove('error-other');
      }
      emit("update:valueInput", value);
    };
    watch(
      () => props.valueInput,
      (newValue) => {
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
    const checkAllID = (options: any) => {
      if (!value.value) return true
      return validResidentId(value.value);
    }

    const checkIdNotForeigner = (options: any) => {
      errorCurrentType.value = 2;
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
      const input = e.event.target;
      setTimeout(() => {
        input.selectionStart = input.selectionEnd = 0;
      }, 50);
    }
    onMounted(() => {
      let ele: any = document.getElementsByClassName('resident-ctn')[0];
      ele.style.width = widthCustom.value;
    })
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

  #resident-id.dx-invalid.dx-texteditor {

    :deep .dx-texteditor-input-container.error-other {
      &::after {
        display: none;
      }

    }

  }
  #resident-id .dx-datagrid-validator.dx-validator.dx-datagrid-invalid::after {
    border-color: unset;
  }

  .custom-tooltip {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    .error-1 {
      font-size: 16px;
      line-height: 16px;
      height: 19px;
      border-radius: 100%;
      width: 18px;
      font-weight: 700;
      background: red;
      color: white;
    }
  }
}
</style>
