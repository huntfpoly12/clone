<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    :width="750">
    <standard-form action="" name="email-single-430">
      <div class="custom-modal-send-email">
        <img src="@/assets/images/email.svg" alt="" /><span>퇴직금 시뮬레이션 결과를</span>
        <div class="mail-input">
          <mail-text-box width="250px" :required="true" v-model:valueInput="emailAddress" />
          <span>로 메일을 발송하시겠습니까?</span>
        </div>
      </div>
      <div class="text-center mt-50">
        <button-basic class="mr-5" :text="'아니요'" :type="'default'" :mode="'outlined'"
          @onClick="setModalVisible()" />
        <button-basic class="ml-5" :text="'네. 발송합니다'" :width="140" :type="'default'" :mode="'contained'"
          @onClick="onSubmit" />
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref, reactive } from "vue";
import { useStore } from "vuex";
import { companyId } from "@/helpers/commonFunction";
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA4/PA410/index";
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
    store.dispatch("auth/getUserInfor", sessionStorage.getItem("token"));
    const userInfor = reactive(store.state.auth.userInfor);
    const empployeeDetail = reactive(
      store.state.common.arrayEmployeePA410.filter(function (item: any) {
        return item.employeeId_Type == store.state.common.employeeIdPA410;
      })
    );
    let emailAddress = ref(userInfor.email);
    const setModalVisible = () => {
      emit("closePopup", false);
    };
    const {
      mutate: sendEmail,
      onDone: onDoneAdd,
      onError: errorSendEmail,
      error,
    } = useMutation(mutations.sendCalculateIncomeRetirementEmail);

    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        let variables = {
          companyId: companyId,
          input: props.data,
          emailInput: {
            senderName: userInfor.username,
            receiverName: empployeeDetail[0].name,
            receiverAddress: emailAddress.value,
          },
        };
        // variables.employeeInputs.receiverAddress = emailAddress.value
        sendEmail(variables);
      }
    };
    onDoneAdd(() => {
      notification("success", Message.getCommonMessage("801").message);
      emit("closePopup", false);
    });
    errorSendEmail((e: any) => {
      //notification('error', e.message)
    });
    watch(
      () => props.modalStatus,
      (value) => { }
    );

    return {
      setModalVisible,
      onSubmit,
      emailAddress,
      empployeeDetail,
      userInfor,
      Message,
    };
  },
});
</script>

<style lang="scss">
.mail-input {
  display: flex;
  align-items: center;
  margin-left: 5px;
}
</style>
