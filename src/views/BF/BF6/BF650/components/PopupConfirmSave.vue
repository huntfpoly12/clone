<template>
  <a-modal
    :visible="modalStatus"
    footer=""
    :mask-closable="false"
    title=""
    okText="네. 발송합니다"
    cancelText="아니요"
    width="400px"
    @cancel="setModalVisible"
  >
    <standard-form>
      <div class="mt-25">
        <div class="">
          <div class="mb-5">선택된 내역들의 전자신고파일 제작요청하시겠습니까?</div>
          <div class="mb-5">결과를 이메일로 받으시려면 이메일 주소를 입력하세요.</div>
          <mail-text-box
            width="250"
            v-model:valueInput="mailAction"
            required="true"
            />
        </div>
      </div>
      <div class="d-flex-center mt-10" style="justify-content: center">
        <button-basic
          :text="'아니요'"
          :type="'default'"
          :mode="'outlined'"
          @onClick="setModalVisible()"
        />
        <button-basic
          class="ml-5"
          :text="'네. 제작요청합니다'"
          :width="150"
          :type="'default'"
          :mode="'contained'"
          @onClick="onSubmit"
        />
      </div>
    </standard-form>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/BF/BF6/BF650/index";
import notification from "@/utils/notification";
import { useStore } from "vuex";
import { computed } from "vue";
export default defineComponent({
  props: {
    modalStatus: Boolean,
    data: Object,
  },
  setup(props, { emit }) {
    const store = useStore();
    const userInfo = computed(() => store.state.auth.userInfor);
    let mailAction = ref(userInfo.value.email);
    let dataCallApi = ref();
    const {
      mutate: sendRequestFile,
      onDone: onDone,
      onError: onError,
    } = useMutation(
      mutations.requestCreationIncomeWageDailyPaymentStatementElectronicFilingFile
    );
    onDone(() => {
      notification("success", `업데이트 완료!`);
      emit("closePopup", false);
      emit("refresh", true);
    });
    onError((e) => {
      //notification('error', e.message)
    });
    const setModalVisible = () => {
      emit("closePopup", true);
    };
    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        dataCallApi.value = {
          ...props.data,
        };
        dataCallApi.value.emailInput.receiverAddress = mailAction.value;
        if (dataCallApi) {
          sendRequestFile(dataCallApi.value);
        }
      }
    };
    return {
      mailAction,
      onSubmit,
      setModalVisible,
    };
  },
});
</script>
