<template>
  <a-modal
    :visible="modalStatus"
    @cancel="setModalVisible"
    :mask-closable="false"
    class="confirm-md"
    footer=""
    :width="521"
  >
    <standard-form action="" name="email-group-730">
      <img
        src="../../../../../assets/images/emailGroup.png"
        alt=""
        style="width: 35px; margin-right: 3px"
      />
      <div class="text-align-center mt-20">
        <span
          >개별 메일이 발송되며, 개별 메일이 등록되지 않은 경우에 한해서
        </span>

        <div class="email-group-content">
          <mail-text-box
            class="mail-group-input"
            width="200px"
            :required="true"
            v-model:valueInput="emailAddress"
            placeholder="abc@example.com"
          ></mail-text-box>
          <span>로 메일을 발송하시겠습니까?</span>
        </div>
      </div>
      <div class="text-align-center mt-20">
        <button-basic
          class="button-form-modal"
          :text="'그냥 나가기'"
          :type="'default'"
          :mode="'outlined'"
          @onClick="setModalVisible()"
        />
        <button-basic
          class="button-form-modal"
          :text="'저장하고 나가기'"
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
import { companyId } from "../../../../../helpers/commonFunction";
import dayjs, { Dayjs } from "dayjs";
import { useMutation } from "@vue/apollo-composable";
import mutations from "../../../../../graphql/mutations/PA/PA7/PA730/index";
export default defineComponent({
  props: {
    modalStatus: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
    },
  },
  components: {},
  setup(props, { emit }) {
    let emailAddress = ref();
    const setModalVisible = () => {
      emit("closePopup", false);
    };
    const {
      mutate: sendIncomeExtraWithholdingReceiptReportEmail,
      onDone: onDoneAdd,
      onError: errorSendEmail,
      error,
    } = useMutation(mutations.sendIncomeExtraWithholdingReceiptReportEmail);
    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        let variables = {
          companyId: companyId,
          input: {
            imputedYear: parseInt(dayjs().format("YYYY")),
            type: 1,
            receiptDate: "sgs",
          },
          employeeInputs: {
            senderName: "",
            receiverName: "",
            receiverAddress: "",
            employeeId: 1,
            incomeTypeCode: "",
          },
        };
        sendIncomeExtraWithholdingReceiptReportEmail(variables);
      }
    };
    onDoneAdd(() => {
      emit("closePopup", false);
    });
    watch(
      () => props.modalStatus,
      (value) => {}
    );

    return {
      setModalVisible,
      onSubmit,
      emailAddress,
    };
  },
});
</script>

<style lang="scss">
.mt-20 {
  margin-top: 10px;
}

.text-align-center {
  text-align: center;
}

.button-form-modal {
  margin: 0px 5px;
}
.email-group-content {
  display: flex;
  margin: 20px;
  align-items: center;
  justify-content: center;
  .mail-group-input {
    margin: 0px 10px;
  }
}
</style>
