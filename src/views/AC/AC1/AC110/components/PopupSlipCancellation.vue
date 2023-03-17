<template>
  <a-modal :visible="isModalSlipCancellation" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="644">
    <standard-form action="">
      <div class="ac-110-popup-cancellation text-align-center mt-10">
        <div class="ac-110-popup-cancellation-text">
          <span class="mr-10">대상 거래내역</span>
          <a-form-item>
            <default-text-box :width="150" />
          </a-form-item>
          <span class="mr-10">건</span>
          <span>상기와 같이 전표취소하시겠습니까? </span>
        </div>
        <div class="mt-10">
          <button-basic class="button-form-modal" :text="'아니요'" :width="140" :type="'default'" :mode="'outlined'"
            @onClick="cancel" />
          <button-basic class="button-form-modal" :text="'네. 취소합니다'" :width="140" :type="'default'" :mode="'contained'"
            @onClick="submit" />
        </div>
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
export default defineComponent({
  props: {
    isModalSlipCancellation: {
      type: Boolean,
      default: false,
    },
  },
  components: {
  },

  setup(props, { emit }) {
    const cancel = () => {
      emit("closePopup", false)
    };
    const submit = () => {
      emit("submit")
    }
    return {
      submit,
      cancel
    }
  },
})
</script>

<style lang="scss" scoped>
.ac-110-popup-cancellation {
  &-text {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.text-align-center {
  text-align: center;
}

.button-form-modal {
  margin: 0px 5px;
}

.mr-10 {
  margin-right: 10px;
}
.mt-10 {
  margin-top: 10px;
}
</style>
