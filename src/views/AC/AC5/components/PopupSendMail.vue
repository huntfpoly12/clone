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
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import mutations530 from "@/graphql/mutations/AC/AC5/AC530";
import mutations540 from "@/graphql/mutations/AC/AC5/AC540";
import mutations550 from "@/graphql/mutations/AC/AC5/AC550";
import { useMutation } from "@vue/apollo-composable";
import { Message } from "@/configs/enum";
import notification from "@/utils/notification";

export default defineComponent({
  props: {
    isModalSendMail: {
      type: Boolean
    },
    dataPopup: {
      type: Object
    },
    type: {
      type: String,
      default: '',
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const userInfo = computed(() => store.state.auth.userInfor);
    const email = ref('')
    
    watch(() => userInfo.value, (value) => {
      email.value = value?.email || ''
    },{
      deep: true,
    })

    let keyRefreshForm = ref(0)
    const closePopup = () => {
      email.value = ''
      keyRefreshForm.value++
      emit('closePopup')
    }

    /////// mutations
    ///// api 530
    const {
      mutate: sendStatementOfGoverbmentSubsidiesReportEmail,
      onDone: doneSendStatementOfGoverbmentSubsidiesReportEmail,
      onError: errorSendStatementOfGoverbmentSubsidiesReportEmail,
      loading: loadingsendStatementOfGoverbmentSubsidiesReportEmail,
    } = useMutation(mutations530.sendStatementOfGoverbmentSubsidiesReportEmail);
    doneSendStatementOfGoverbmentSubsidiesReportEmail((data) => {
      notification("success", Message.getCommonMessage("801").message);
      email.value = ''
      keyRefreshForm.value++
      emit('closePopup')
    })
    errorSendStatementOfGoverbmentSubsidiesReportEmail(e => {
      console.log('errorsendStatementOfGoverbmentSubsidiesReportEmail', e);
    })

    ///// api 540
    const {
      mutate: sendPreliminaryStatementOfUseReportEmail,
      onDone: doneSendPreliminaryStatementOfUseReportEmail,
      onError: errorSendPreliminaryStatementOfUseReportEmail,
      loading: loadingsendPreliminaryStatementOfUseReportEmail,
    } = useMutation(mutations540.sendPreliminaryStatementOfUseReportEmail);
    doneSendPreliminaryStatementOfUseReportEmail((data) => {
      notification("success", Message.getCommonMessage("801").message);
      email.value = ''
      keyRefreshForm.value++
      emit('closePopup')
    })
    errorSendPreliminaryStatementOfUseReportEmail(e => {
      console.log('errorsendPreliminaryStatementOfUseReportEmail', e);
    })

    ///// api 550, 560
    const {
      mutate: sendCostStatementReportEmail,
      onDone: doneSendCostStatementReportEmail,
      onError: errorSendCostStatementReportEmail,
      loading: loadingSendCostStatementReportEmail,
    } = useMutation(mutations550.sendCostStatementReportEmail);
    doneSendCostStatementReportEmail((data) => {
      notification("success", Message.getCommonMessage("801").message);
      email.value = ''
      keyRefreshForm.value++
      emit('closePopup')
    })
    errorSendCostStatementReportEmail(e => {
      console.log('errorSendCostStatementReportEmail', e);
    })


    const sendEmail = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
        return
      }
      const payloadCommon = {
        ...props.dataPopup,
        emailInput: {
          receiverName: userInfo?.value?.name,
          receiverAddress: userInfo?.value?.email,
          senderName: email.value
        }
      }
      if (props.type === 'AC530') {
        sendStatementOfGoverbmentSubsidiesReportEmail(payloadCommon)
      }
      if (props.type === 'AC540') {
        sendPreliminaryStatementOfUseReportEmail(payloadCommon)
      }
      if(props.type === 'AC550' || props.type === 'AC560') {
        sendCostStatementReportEmail(payloadCommon)
      }
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
