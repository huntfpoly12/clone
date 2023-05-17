<template>
  <a-modal :visible="isModalNoteItemDetail" @cancel="cancel" :mask-closable="false" class="confirm-md ac-110-popup-detail"
    footer="" :width="1000">
    <text-area-box v-model="valueInput" :placeholder="placeholder" height="300" style="margin-top: 20px;" :readOnly="disabled" />
    <div class="ac-110-popup-detail-btn">
      <button-basic text="반영" type="default" :mode="'contained'" @onClick="submit" :disabled="disabled" />
    </div>
    <PopupMessage :modalStatus="isModalConfirmChange" @closePopup="isModalConfirmChange = false"
    :typeModal="'confirm'" title="정보가 저장되지 않았습니다. 닫으시겠습니까?" content="" :okText="Message.getMessage('COMMON', '501').yes"
    :cancelText="Message.getMessage('COMMON', '501').no" @checkConfirm="handleConfirmChange" />
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch,  } from 'vue'
import { Message } from "@/configs/enum"
import { cloneDeep, isEqual } from "lodash"
import notification from '@/utils/notification';
export default defineComponent({
  props: {
    isModalNoteItemDetail: {
      type: Boolean,
      default: false,
    },
    transactionSelected: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  components: {
  },

  setup(props, { emit }) {
    const valueInput =  ref(props.transactionSelected?.noteValue);
    const valueInputOrigin: any = ref(null)
    let isModalConfirmChange = ref(false)
    watch(() => props.transactionSelected?.noteValue, (value) => {
      valueInput.value = value
      valueInputOrigin.value = cloneDeep(valueInput.value)
    },{
      deep: true
    })
    const cancel = () => {
      if(isEqual(valueInput.value, valueInputOrigin.value)) {
        valueInput.value = props.transactionSelected?.noteValue
        emit("closePopup", false)
      }else {
        isModalConfirmChange.value = true
      }
    };
    const submit = () => {
      notification('success', '반영되었습니다.')
      emit("submit", {...props.transactionSelected, noteValue: valueInput.value})
    }
    const handleConfirmChange = (status: boolean) => {
      if(status) {
        valueInput.value = props.transactionSelected?.noteValue
        emit("closePopup", false)
      }else {
        isModalConfirmChange.value = false
      }
    }
    return {
      submit,
      cancel,
      valueInput,
      handleConfirmChange,
      isModalConfirmChange,
      Message
    }
  },
})
</script>

<style lang="scss" scoped>
.ac-110-popup-detail {
  &-btn {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
