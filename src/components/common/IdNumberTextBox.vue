<template>
  <div class="d-flex">
    <DxTextBox id="resident-id" ref="residentRef" :width="width" value-change-event="input"
      :show-clear-button="clearButton" v-model:value="value" :disabled="disabled" :readOnly="readOnly"
      @input="updateValue(value)" :mask="mask" :height="$config_styles.HeightInput"
      :name="nameInput" @focusIn="onFocusIn">
      <!-- <DxButton v-if="errorCurrentType == 1" :options="requiredButton" name="nextDate" location="after">
      12312
    </DxButton>
    <DxButton v-if="errorCurrentType == 2" name="hihi" location="after">
      12312
    </DxButton> -->
      <DxValidator ref="validatorRef" :name="nameInput">
        <DxRequiredRule v-if="required" :message="messageRequired" />
        <DxCustomRule v-if="isResidentId"
          :validation-callback="checkAllResidentId ? checkAllID : (foreigner ? checkID : checkIdNotForeigner)" />
      </DxValidator>
    </DxTextBox>
    <div v-if="errorCurrentType == 1" class="custom-tooltip">x</div>
    <a-tooltip placement="top" v-if="errorCurrentType == 2">
      <template #title>
        본 항목은 공제 계산을 위한 설정으로 실제 4대보험 신고 여부와는 무관합니다.
      </template>
      <img class="custom-tooltip" src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px" />
    </a-tooltip>
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
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import { DxTextBox, DxButton } from 'devextreme-vue/text-box';
import { validResidentId } from "@bankda/jangbuda-common";
import { Message } from '@/configs/enum';
import { reactive } from "vue";
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
      console.log(`output->isValid.value.brokenRule`, isValid)
      if (isValid.brokenRule?.type == 'custom') {
        errorCurrentType.value = 2;
      } else if (isValid.brokenRule?.editorSpecific) {
        errorCurrentType.value = 1;
      } else {
        errorCurrentType.value = 0;
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
      console.log(`output->options`, options,)
      if (!value.value) return true
      return validResidentId(value.value);
    }

    const checkIdNotForeigner = (options: any) => {
      errorCurrentType.value = 2;
      if (!value.value) {
        return true
      }
      const fNumber = value.value ? parseInt(value.value.charAt(6)) : 0;
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
    };
  },
});
</script>
<style lang="scss" scoped>
:deep div.dx-overlay-content.dx-resizable {
  visibility: hidden;
}

#resident-id.dx-invalid.dx-texteditor {
  // background-color: red !important;

  :deep .dx-texteditor-input-container {
    &::after {
      // display: none;
    }

    // padding-right: 160px;
  }

  :deep .dx-invalid-message.dx-overlay {
    position: relative;
    // display: none;
  }

}

#resident-id .dx-datagrid-validator.dx-validator.dx-datagrid-invalid::after {
  border-color: unset;
}

.custom-tooltip {
  position: absolute;
  right: 18px;
  top: 12px;
}
</style>
