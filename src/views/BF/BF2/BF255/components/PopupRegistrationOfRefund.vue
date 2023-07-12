<template>
  <a-modal :visible="isModalRegistrationOfRefund" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="500">
    <standard-form action="">
      <div class="bf-255-popup-registrationOfRefund text-align-center mt-10">
        <div class="bf-255-popup-registrationOfRefund-text">
          <span class="bf-255-popup-registrationOfRefund-text-label mr-10">사업자코드(상호)</span>
          <a-form-item class="mr-10">
            <default-text-box :width="100" height="25"  />
          </a-form-item>
          <span>환급신청 등록하시겠습니까?</span>
        </div>
        <div class="mt-10">
          <button-basic class="button-form-modal" :text="'아니요'" :width="80" :type="'default'" :mode="'outlined'"
            @onClick="cancel" />
          <button-basic class="button-form-modal" :text="'네. 환급신청 등록합니다'" :width="180" :type="'default'" :mode="'contained'"
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
    isModalRegistrationOfRefund: {
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
.bf-255-popup-registrationOfRefund {
  &-text {
    display: flex;
    align-items: center;
    justify-content: center;
    &-label {
      color: red;
    }
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
