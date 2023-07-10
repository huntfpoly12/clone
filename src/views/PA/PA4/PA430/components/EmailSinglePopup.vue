<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    :width="562">
    <standard-form action="" name="email-single-430" :key="resetForm">
      <div class="custom-modal-send-email">
        <img src="@/assets/images/email.svg" alt="" />
        <mail-text-box width="250px" :required="true" v-model:valueInput="emailAddress"></mail-text-box>
        <span>로 메일을 발송하시겠습니까?</span>
      </div>
      <div class="text-center mt-50">
        <button-basic class="mr-5" :text="'아니요'" :type="'default'" :mode="'outlined'" @onClick="setModalVisible()" />
        <button-basic class="ml-5" :text="'네. 발송합니다'" :width="140" :type="'default'" :mode="'contained'"
          @onClick="onSubmit" />
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from "vue";
import { useStore } from "vuex";
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA4/PA430/index";
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
    const store = useStore();
    const token = computed(() => sessionStorage.getItem("token"));
    store.dispatch("auth/getUserInfor", token.value);
    const userInfor = computed(() => store.state.auth.userInfor);
    let emailAddress = ref("");
    let resetForm = ref<number>(0);
    watch(
      () => props.data,
      (val) => {
        emailAddress.value = userInfor.value?.email;
      }
    );

    const setModalVisible = () => {
      emit("closePopup", false);
    };
    const {
      mutate: sendEmail,
      onDone: onDoneAdd,
      onError: errorSendEmail,
    } = useMutation(mutations.sendIncomeRetirementWithholdingReceiptReportEmail);
    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        let variables = props.data;
        variables.incomeInputs.receiverAddress = emailAddress.value;
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

<style lang="scss"></style>
