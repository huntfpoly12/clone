<template>
  <a-modal :visible="true" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer="" :width="562">
    <standard-form action="" name="email-single-630">
      <div class="custom-modal-send-email">
        <img src="@/assets/images/email.svg" alt="" />
        <mail-text-box width="250px" :required="true" v-model:valueInput="emailAddress" placeholder="abc@example.com" />
        <span>로 메일을 발송하시겠습니까?</span>
      </div>
      <div class="text-center mt-50">
        <button-basic class="mr-5" :text="'아니요'" :type="'default'" :mode="'outlined'"
          @onClick="setModalVisible" />
        <button-basic class="ml-5" :text="'네. 발송합니다'" :width="140" :type="'default'" :mode="'contained'"
          @onClick="onSubmit" />
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA7/PA730/index";
import { Message } from "@/configs/enum";
export default defineComponent({
  props: {
    mailData: {
      type: String,
      default: '',
    }
  },
  components: {},
  setup(props, { emit }) {
    const emailAddress = ref(props.mailData);
    const setModalVisible = () => {
      emit("onMailModal", false);
    };
    watch(emailAddress, (newVal: any) => {
      emit("update:mailData", emailAddress.value);
    })
    // const {
    //   mutate: sendEmail,
    //   onDone: onDoneAdd,
    //   onError: errorSendEmail,
    //   error,
    // } = useMutation(mutations.sendIncomeExtraWithholdingReceiptReportEmail);
    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        emit("onMailModal", true);
      }
    };
    // onDoneAdd(() => {
    //   notification("success", Message.getMessage('COMMON', '801').message);
    //   emit("closePopup", false);
    // });
    // errorSendEmail((e: any) => {
    //   notification("error", e.message);
    // });

    return {
      setModalVisible,
      onSubmit,
      emailAddress,
    };
  },
});
</script>

<style lang="scss" scoped>
.custom-modal-send-email {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: 20px;

  img {
    width: 40px;
    margin-right: 5px;
  }

  span {
    padding-left: 5px;
  }
}
</style>
