<template>
  <a-modal :visible="isModalSendMail" @cancel="closePopup" width="562px" footer="" :mask-closable="false">
    <standard-form :key="keyRefreshForm">
      <div class="custom-modal-send-email">
        <img src="@/assets/images/email.svg" alt="" style="width: 40px;">
        <mail-text-box :required="true" v-model:valueInput="email" width="250px" placeholder="abc@example.com" />
        <span>로 메일을 발송하시겠습니까?</span>
      </div>
      <a-row style="margin-top: 30px;">
        <a-col :span="24" class="text-center">
          <button-basic text="아니요" type="default" mode="outlined" @onClick="closePopup()" :width="100"
            style="margin-right: 10px;" />
          <button-basic text="네. 발송합니다" :type="'default'" mode="'contained'" @onClick="sendEmail($event)" :width="150" />
        </a-col>
      </a-row>
    </standard-form>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    isModalSendMail: {
      type: Boolean
    },
    dataPopup: {
      type: Object
    }
  },
  setup(props, { emit }) {
    const email = ref()
    let keyRefreshForm = ref(0)
    const closePopup = () => {
      email.value = ''
      keyRefreshForm.value++
      emit('closePopup')
    }
    const sendEmail = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
        return
      }
      email.value = ''
      keyRefreshForm.value++
      emit('closePopup')
    }
    return {
      email,
      sendEmail,
      closePopup,
      keyRefreshForm
    }
  }
})
</script>
<style lang="scss" scoped>
.custom-modal-send-email {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: 20px;

  img {
    margin-right: 5px;
  }

  span {
    padding-left: 5px;
  }
}
</style>
