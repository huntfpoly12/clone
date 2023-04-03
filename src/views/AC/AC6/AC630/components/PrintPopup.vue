<template>
  <a-modal :visible="true" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer="" :width="562">
    <standard-form action="" name="email-single-630">
      <div class="custom-modal-send-email">
        <a-form-item>
          <radio-group :arrayValue="printRadio" v-model:valueRadioCheck="emailAddress"
            layoutCustom="horizontal" class="mt-1"></radio-group>
        </a-form-item>
        <div class="text-center">
          출력하시겠습니까?
        </div>
      </div>
      <div class="text-align-center mt-30">
        <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
          @onClick="setModalVisible" />
        <button-basic class="button-form-modal" :text="'네. 출력합니다'" :width="140" :type="'default'" :mode="'contained'"
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
import {printRadio} from '../utils/index';
export default defineComponent({
  props: {
    printData: {
      type: Number,
      default: '',
    }
  },
  components: {},
  setup(props, { emit }) {
    const emailAddress = ref(props.printData);
    const setModalVisible = () => {
      emit("onPrintModal", false);
    };
    watch(emailAddress, (newVal: any) => {
      emit("update:printData", emailAddress.value);
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
        emit("onPrintModal", true);
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
      printRadio
    };
  },
});
</script>

<style lang="scss" scoped>
.custom-modal-send-email {
  display: flex;
  flex-direction: column;
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

.mt-50 {
  margin-top: 50px;
}

.text-align-center {
  text-align: center;
}

.button-form-modal {
  margin: 0px 5px;
}
</style>
