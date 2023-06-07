<template>
  <a-modal
    :visible="modalStatus"
    @cancel="setModalVisible"
    :mask-closable="false"
    class="confirm-md"
    footer=""
    :width="562"
  >
    <standard-form action="" name="email-single-630" :key="resetForm">
      <div class="custom-modal-send-email">
        <img src="@/assets/images/email.svg" alt="" />
        <mail-text-box
          width="250px"
          :required="true"
          v-model:valueInput="emailAddress"/>
        <span>로 메일을 발송하시겠습니까?</span>
      </div>
      <div class="text-center mt-50">
        <button-basic
          class="mr-5"
          :text="'아니요'"
          :type="'default'"
          :mode="'outlined'"
          @onClick="setModalVisible()"
        />
        <button-basic
          class="ml-5"
          :text="'네. 발송합니다'"
          :width="140"
          :type="'default'"
          :mode="'contained'"
          @onClick="onSubmit"
        />
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA6/PA630/index";
import { Message } from "@/configs/enum";
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
  },
  components: {},
  setup(props, { emit }) {
    let emailAddress = ref("");
    let resetForm = ref<number>(0);
    watch(
      () => props.data,
      (val) => {
        emailAddress.value = val?.employeeInputs.receiverAddress;
      }
    );

    const setModalVisible = () => {
      emit("closePopup", false);
    };
    const {
      mutate: sendEmail,
      onDone: onDoneAdd,
      onError: errorSendEmail,
    } = useMutation(mutations.sendIncomeBusinessWithholdingReceiptReportEmail);
    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        let variables = props.data;
        variables.employeeInputs.receiverAddress = emailAddress.value;
        sendEmail(variables);
      }
    };
    onDoneAdd(() => {
      notification("success", Message.getMessage("COMMON", "801").message);
      emit("closePopup", false);
    });
    errorSendEmail((e: any) => {
      //notification('error', e.message)
    });
    watch(() => props.modalStatus, (value) => {
        if (value) {
          resetForm.value++
        }
      }
    );

    return {
      setModalVisible,
      onSubmit,
      emailAddress,
      resetForm,
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
</style>
