<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    :width="562">
    <standard-form action="" name="email-single-730">
      <img src="@/assets/images/emailGroup.png" alt="" style="width: 40px" />
      <div class="custom-modal-send-email">
        <div>
          <span>개별 메일이 발송되며, 개별 메일이 등록되지 않은 경우에 한해서
          </span>
          <div style="display: flex; align-items: center">
            <mail-text-box width="250px" :required="true" v-model:valueInput="emailAddress"
              placeholder="abc@example.com"></mail-text-box>
            <span>로 메일을 발송하시겠습니까?</span>
          </div>
        </div>
      </div>
      <div class="text-align-center mt-50">
        <button-basic class="button-form-modal" :text="'그냥 나가기'" :type="'default'" :mode="'outlined'"
          @onClick="setModalVisible()" />
        <button-basic class="button-form-modal" :text="'네. 발송합니다'" :width="140" :type="'default'" :mode="'contained'"
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
export default defineComponent({
  props: {
    modalStatus: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: {},
    },
    emailUserLogin: {
      type: String,
      default: "",
    },
  },
  components: {},
  setup(props, { emit }) {
    let emailAddress = ref("");
    watch(
      () => props.data,
      (val) => {
        emailAddress.value = props.emailUserLogin;
      }
    );

    const setModalVisible = () => {
      emit("closePopup", false);
    };

    const {
      mutate: sendEmail,
      onDone: onDoneAdd,
      onError: errorSendEmail,
      error,
    } = useMutation(mutations.sendIncomeExtraWithholdingReceiptReportEmail);
    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        props.data.employeeInputs.map((value: any) => {
          if (value.receiverAddress == "") {
            value.receiverAddress = emailAddress.value;
          }
        });
        let variables = props.data;
        sendEmail(variables);
      }
    };
    onDoneAdd(() => {
      notification("success", `이메일을 발송했습니다`);
      emit("closePopup", false);
    });
    errorSendEmail((e: any) => {
      notification("error", e.message);
    });

    return {
      setModalVisible,
      onSubmit,
      emailAddress,
    };
  },
});
</script>

<style lang="scss">
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
