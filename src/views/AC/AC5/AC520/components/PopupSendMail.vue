<template>
  <a-modal :visible="isModalSendMail" @cancel="closePopup" width="562px" footer="" :mask-closable="false">
    <standard-form>
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
import {computed, defineComponent, ref} from "vue";
import {useStore} from "vuex";
import {useMutation} from "@vue/apollo-composable";
import notification from "@/utils/notification";
import {Message} from "@/configs/enum";
import sendEmployeePayTableReportEmail from "@/graphql/mutations/AC/AC5/AC520/sendEmployeePayTableReportEmail"
import sendBudgetReportEmail from "@/graphql/mutations/AC/AC5/AC520/sendBudgetReportEmail"
import sendBudgetSummaryTableReportEmail from "@/graphql/mutations/AC/AC5/AC520/sendBudgetSummaryTableReportEmail"
import { TypeMail } from "../type";

export default defineComponent({
  props: {
    isModalSendMail: {
      type: Boolean
    },
    dataPopup: {
      type: Object
    },
    variable: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    typeMail: {
      type: Object as () => TypeMail,
      required: true
    },
    type: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const email = ref()
    const store = useStore();
    const userInfo = computed(() => store.state.auth.userInfor);
    const getType = computed(() => {
      switch (props.typeMail) {
        case TypeMail.BudgetSummaryTable: // E2
          return sendBudgetSummaryTableReportEmail
        case TypeMail.Budget: // E1
          return sendBudgetReportEmail
        case TypeMail.EmployeePayTable: // E3
          return sendEmployeePayTableReportEmail
        default:
          return sendBudgetSummaryTableReportEmail
      }
    })
    console.log('getType', getType.value)
    const {mutate, onError, onDone} = useMutation(getType.value)
    onDone(() => {
      notification('success', Message.getCommonMessage('801').message)
      emit('closePopup', true)
      email.value = ''
    })
    onError(({message}) => {
      notification('error', message)
      emit('closePopup', false)
    })
    const closePopup = () => {
      email.value = ''
      emit('closePopup', true)
    }
    const sendEmail = (e: any) => {
      const res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
        return
      }
      console.log(props)
      const input: any = {
        ...props.variable,
        index: props.index,
        emailInput: {
          receiverName: userInfo.value?.name || '',
          receiverAddress: email.value,
          senderName: userInfo.value?.username || '',
        }
      }
      if(props.typeMail === TypeMail.Budget) {
        input.type = props.type
        input.displayCode = true
      }
      mutate(input)
    }
    return {
      email,
      sendEmail,
      closePopup,
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
