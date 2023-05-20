<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
           :width="650">
    <standard-form action="" name="edit-510">
      <div class="custom-modal-edit">
        <EditOutlined class="fz-18"/>
        <span>선택된 내역 지급일을</span>
        <date-time-box-custom ref="requiredDayValue" width="150px" :required="true" :startDate="startDate"
                              :finishDate="finishDate" v-model:valueDate="dayValue" :clearable="false" />
        <span>일로 변경하시겠습니까?</span>
      </div>
      <div class="text-align-center mt-30">
        <button-basic class="button-form-modal" text="아니요" type="default" mode="outlined" @onClick="setModalVisible"/>
        <button-basic class="button-form-modal" text="네. 변경합니다" :width="140" type="default" mode="contained"
                      @onClick="onSubmit"/>
      </div>
    </standard-form>
  </a-modal>
  <a-modal v-model:visible="modalResponseDelete" okText="확인" :closable="false" :footer="null" width="350px">
    <p class="d-flex-center"><img src="@/assets/images/changeDay1.svg" alt="" class="mr-5"/>
      요청건수: {{ errors.length + successes }}건</p>
    <p class="d-flex-center"><img src="@/assets/images/changeDaySuccess.svg" alt="" class="mr-5"/>처리건수: {{ successes }}건
    </p>
    <p class="d-flex-center"><img src="@/assets/images/changeDayErr.svg" alt="" class="mr-5"/>
      미처리건수 및 내역: {{ errors.length }} 건 </p>
    <ul v-if="errorsMessage.length > 0">
      <li v-for="(error) in errors"> {{ error.employeeId }} {{ error.name }} {{ error.message }}</li>
    </ul>
    <a-row justify="center">
      <button-basic class="button-form-modal" :text="'확인'" :width="60" :type="'default'" :mode="'contained'"
                    @onClick="modalResponseDelete = false"/>
    </a-row>
  </a-modal>
</template>

<script lang="ts" setup>
import mutations from "@/graphql/mutations/PA/PA4/PA420/index";
import {companyId} from '@/helpers/commonFunction';
import {EditOutlined} from "@ant-design/icons-vue";
import {useMutation, useQuery} from "@vue/apollo-composable";
import {computed, ref, watch} from 'vue';
import {useStore} from "vuex";
import dayjs from "dayjs";
import queries from "@/graphql/queries/CM/CM130";

interface Props {
  modalStatus: boolean,
  data: any,
  processKey: any
}

const props = defineProps<Props>()
const emit = defineEmits(['closePopup'])
const store = useStore();

const errorsMessage = ref<string[]>([])
const successes:any = ref(0)
const modalResponseDelete = ref(false)
const dayValue: any = ref(dayjs().toDate())
const errors:any = ref([])
const err :any = ref([])
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
watch(() => [resultConfig.value, props.processKey], ([valConfig, processKey]) => {
  if (valConfig) {
    const payment_day = valConfig.getWithholdingConfig.paymentDay
    if(payment_day === 0 || payment_day > +dayjs(finishDate.value).format('DD')) {
      dayValue.value = dayjs(`${processKey.paymentYear}-${processKey.paymentMonth.toString().padStart(2, '0')}-${dayjs(finishDate.value).format('DD').toString().padStart(2, '0')}`).toDate()
    } else {
      dayValue.value = dayjs(`${processKey.paymentYear}-${processKey.paymentMonth.toString().padStart(2, '0')}-${payment_day.toString().padStart(2, '0')}`).toDate()
    }
  }
});

watch(() => props.data, (val) => {
  err.value = val
})
const setModalVisible = () => {
  emit("closePopup", false)
};
const {
  mutate,
  onDone,
  onError,
  loading,
} = useMutation(mutations.changeIncomeRetirementPaymentDay);
onDone(({data}) => {
  if (!data) return
  successes.value++
  err.value = err.value.filter((err: any) => err.incomeId !== data.changeIncomeRetirementPaymentDay.incomeId)
  errors.value = err.value.filter((err: any) => err.incomeId !== data.changeIncomeRetirementPaymentDay.incomeId)
})
onError((error) => {
  if (error )
    errorsMessage.value.push(error.message)
})
// watch loaded
watch(loading, (val) => {
  if (!val) {
    modalResponseDelete.value = true
    if (!errors.value.length) {
      errors.value = err.value.map((val:any, index: number) => ({
        message: errorsMessage.value[0],
        employeeId: val.employee.employeeId,
        name: val.employee.name
      }));
    } else {
      errors.value = errors.value.map((val:any, index: number) => ({
        message: errorsMessage.value[0],
        employeeId: val.employee.employeeId,
        name: val.employee.name
      }));
    }
    emit("closePopup", true)
  }
})
watch(modalResponseDelete, (val) =>{
  if (!val) {
    errorsMessage.value = []
    errors.value = []
    successes.value = 0
    err.value = []
  }
})
const onSubmit = () => {
  props.data.forEach(async (val: any) => {
    await mutate({
      companyId: companyId,
      processKey: props.processKey,
      incomeId: val.incomeId,
      day: dayjs(dayValue.value).day()
    })
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
