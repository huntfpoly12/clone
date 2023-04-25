<template>
  <a-modal :visible="isModalNoteItemDetail" @cancel="cancel" :mask-closable="false" class="confirm-md ac-110-popup-detail"
    footer="" :width="1000">
    <text-area-box v-model="valueInput" placeholder="Note....." height="300" style="margin-top: 20px;" :readOnly="disabled" />
    <div class="ac-110-popup-detail-btn">
      <button-basic text="저장" type="default" :mode="'contained'" @onClick="submit" :disabled="disabled" />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch,  } from 'vue'
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
    }
  },
  components: {
  },

  setup(props, { emit }) {
    const valueInput =  ref(props.transactionSelected?.noteValue);
    watch(() => props.transactionSelected?.noteValue, (value) => {
      valueInput.value = value
    },{
      deep: true
    })
    const cancel = () => {
      valueInput.value = props.transactionSelected?.noteValue
      emit("closePopup", false)
    };
    const submit = () => {
      emit("submit", {...props.transactionSelected, noteValue: valueInput.value})
    }
    return {
      submit,
      cancel,
      valueInput,
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
