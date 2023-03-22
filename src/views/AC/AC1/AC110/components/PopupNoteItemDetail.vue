<template>
  <a-modal :visible="isModalNoteItemDetail" @cancel="cancel" :mask-closable="false" class="confirm-md ac-110-popup-detail"
    footer="" :width="1000">
    <text-area-box placeholder="Note....." height="300" style="margin-top: 20px;"/>
    <div class="ac-110-popup-detail-btn">
      <button-basic text="초기화" type="default" :mode="'contained'" @onClick="submit" />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import { useStore } from 'vuex';
export default defineComponent({
  props: {
    isModalNoteItemDetail: {
      type: Boolean,
      default: false,
    },
  },
  components: {
  },

  setup(props, { emit }) {
    const store = useStore();

    const cancel = () => {
      emit("closePopup", false)
    };
    const submit = () => {
      emit("submit")
    }
  
    return {
      submit,
      cancel,
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
