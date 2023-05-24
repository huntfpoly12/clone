<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
           :width="650">
    <standard-form action="" name="edit-510">
      <div class="custom-modal-edit">
        <EditOutlined class="fz-18"/>
        <span>선택된 내역 지급일을</span>
        <date-time-box-custom ref="requiredDayValue" width="150px" :required="true" :startDate="startDate"
                              :finishDate="finishDate" v-model:valueDate="dayValue" :clearable="false"/>
        <span>일로 변경하시겠습니까?</span>
      </div>
      <div class="text-align-center mt-30">
        <button-basic class="button-form-modal" text="아니요" type="default" mode="outlined" @onClick="setModalVisible"/>
        <button-basic class="button-form-modal" text="네. 변경합니다" :width="140" type="default" mode="contained"
                      @onClick="onSubmit"/>
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts" setup>
import mutations from "@/graphql/mutations/PA/PA4/PA420/index";
import {companyId} from '@/helpers/commonFunction';
import {EditOutlined} from "@ant-design/icons-vue";
import {useApolloClient, useQuery} from "@vue/apollo-composable";
import {computed, ref, watch} from 'vue';
import {useStore} from "vuex";
import dayjs from "dayjs";
import queries from "@/graphql/queries/CM/CM130";
import notification from "@/utils/notification";
import {Message} from "@/configs/enum";

interface Props {
  modalStatus: boolean,
  data: any,
  processKey: any
}

const props = defineProps<Props>()
const emit = defineEmits(['closePopup'])
const store = useStore();

const dayValue: any = ref(dayjs().toDate())
const errors: any = ref([])
const startDate = computed(() => (dayjs(`${props.processKey.paymentYear}-${props.processKey.paymentMonth}`).startOf('month').toDate()));
const finishDate = computed(() => (dayjs(`${props.processKey.paymentYear}-${props.processKey.paymentMonth}`).endOf('month').toDate()));
const dataQuery = ref({companyId: companyId, imputedYear: props.processKey.paymentYear});
const {result: resultConfig, refetch} = useQuery(
  queries.getWithholdingConfig,
  dataQuery,
  () => ({
    fetchPolicy: "no-cache",
  })
);
watch(() => [resultConfig.value, props.processKey, props.modalStatus], ([valConfig, processKey, status]) => {
  if (valConfig && status) {
    const payment_day = valConfig.getWithholdingConfig.paymentDay
    if (payment_day === 0 || payment_day > +dayjs(finishDate.value).format('DD')) {
      dayValue.value = dayjs(`${processKey.paymentYear}-${processKey.paymentMonth.toString().padStart(2, '0')}-${dayjs(finishDate.value).format('DD').toString().padStart(2, '0')}`).toDate()
    } else {
      dayValue.value = dayjs(`${processKey.paymentYear}-${processKey.paymentMonth.toString().padStart(2, '0')}-${payment_day.toString().padStart(2, '0')}`).toDate()
    }
  }
});
const setModalVisible = () => {
  emit("closePopup", false)
};
const {client} = useApolloClient();
const onSubmit = () => {
  Promise.all(props.data.map((val: any) => {
    return client.mutate({
      mutation: mutations.changeIncomeRetirementPaymentDay,
      variables: {
        companyId: companyId,
        processKey: props.processKey,
        incomeId: val.incomeId,
        day: +dayValue.value.toString().slice(6)
      }
    })
  })).then(() => {
    notification('success', Message.getCommonMessage('106').message)
    emit("closePopup", true)
  }).catch((e) => {
    // notification('error', e.message)
  }).finally(() => {
    emit("closePopup", false)
  })
};

</script>

<style lang="scss" scoped>
.custom-modal-edit {
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
    padding: 0px 5px;
  }
}

.mt-30 {
  margin-top: 30px;
}

.text-align-center {
  text-align: center;
}

.button-form-modal {
  margin: 0px 5px;
}
</style>
