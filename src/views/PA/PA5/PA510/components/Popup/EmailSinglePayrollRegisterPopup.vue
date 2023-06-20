<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    :width="562">
    <standard-form action="" name="email-single-register-510">
      <div class="custom-modal-send-email">
        <img src="@/assets/images/email.svg" alt="" />
        <span>급여대장을</span>
        <DxSelectBox :data-source="dataSelect" :style="{ width: '100px', display: 'inline-block' }"
          v-model:value="valueSelect" value-expr="value" display-expr="name" :required="true">
        </DxSelectBox>
      </div>
      <!-- <div class="custom-modal-send-email">개별 메일이 발송되며, 개별 메일이 등록되지 않은 경우에 한해서</div> -->
      <div class="custom-modal-send-email">
        <mail-text-box width="150px" :required="true" v-model:valueInput="emailAddress" placeholder="abc@example.com" />
        <span>로 메일을 발송하시겠습니까?</span>
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
import { defineComponent, watch, ref, computed } from "vue";
import { useStore } from "vuex";
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA//PA5/PA510/index";
import { companyId } from "@/helpers/commonFunction";
import DxSelectBox from "devextreme-vue/select-box";
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
    // emailAddress: String,
  },
  components: {
    DxSelectBox,
  },
  setup(props, { emit }) {
    const store = useStore();
    const processKey = computed(() => store.state.common.pa510.processKeyPA510);
    const token = computed(() => sessionStorage.getItem("token"));
    store.dispatch("auth/getUserInfor", token.value);
    const userInfor = computed(() => store.state.auth.userInfor);
    let emailAddress: any = ref("");
    const dataSelect = ref([
      { name: "사번순", value: "사번" },
      { name: "부서순", value: "부서" },
      { name: "직위순", value: "직위" },
    ]);
    const valueSelect = ref("사번");
    watch(
      () => props.modalStatus,
      (val) => {
        valueSelect.value = "사번";
      }
    );
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
      error,
    } = useMutation(mutations.sendIncomeWageDailyPayrollRegisterReportEmail);
    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        sendEmail({
          companyId: companyId,
          input: {
            imputedYear: processKey.value.imputedYear,
            imputedMonth: processKey.value.imputedMonth,
            paymentYear: processKey.value.paymentYear,
            paymentMonth: processKey.value.paymentMonth,
            sortType: valueSelect.value,
          },
          emailInput: {
            senderName: sessionStorage.getItem("username"),
            receiverName: props.data.employee.name,
            receiverAddress: emailAddress.value,
          },
        });
      }
    };
    onDoneAdd(() => {
      notification("success", Message.getMessage("COMMON", "801").message);
      emit("closePopup", false);
    });
    errorSendEmail((e: any) => {
      //notification('error', e.message)
    });

    return {
      setModalVisible,
      onSubmit,
      emailAddress,
      dataSelect,
      valueSelect,
    };
  },
});
</script>

<style lang="scss" scoped></style>
