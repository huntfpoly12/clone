<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
           :width="500">
    <standard-form action="" name="edit-510">
      <div class="custom-modal-edit">
        <EditOutlined class="fz-18"/>
        <span>선택된 내역 지급일을</span>
        <number-box width="70px" :required="true" :min="1" :max="31" v-model:valueInput="dayValue" :spinButtons="true"/>
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
    <p class="d-flex-center"><img src="@/assets/images/changeDaySuccess.svg" alt="" class="mr-5"/>처리건수: {{ successes.length }}건
    </p>
    <p class="d-flex-center"><img src="@/assets/images/changeDayErr.svg" alt="" class="mr-5"/>
      미처리건수 및 내역: {{ errors.length }} 건 </p>
    <ul v-if="errorsMessage.length > 0">
      <li v-for="(error) in errors"> {{ error.name }} {{ error.incomeId }} {{ error.message }}</li>
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
import {useMutation} from "@vue/apollo-composable";
import {defineComponent, ref, watch} from 'vue';

interface Props {
  modalStatus: boolean,
  data: any,
  processKey: Object
}

const props = defineProps<Props>()
const emit = defineEmits(['closePopup'])
const errorsMessage = ref<string[]>([])
const errors:any = ref([])
const successes:any = ref([])
const modalResponseDelete = ref(false)
const dayValue = ref(1)
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
  console.log(data)
  if (data) {
    successes.value.push(data.changeIncomeRetirementPaymentDay.incomeId)
  }
})
onError((err) => {
  console.log(!!err)
  if (err )
    errorsMessage.value.push(err.message)
})
// watch loaded
watch(loading, (val) => {
  if (!val) {
    emit("closePopup", false)
    modalResponseDelete.value = true
    if (errorsMessage.value.length > 0) {
      let result:any = [];
      for (let i = 0; i < props.data.length; i++) {
        if (!successes.value.includes(props.data[i])) {
          result.push(props.data[i]);
        }
      }
      errors.value = errorsMessage.value.map((val:any, index) => ({
        message: val,
        incomeId: result[index]?.incomeId,
        name: result[index]?.name
      }));
    }
  }
})
watch(modalResponseDelete, (val) =>{
  if (!val) {
    errorsMessage.value = []
    errors.value = []
  }
  console.log('errorsMessage', errorsMessage.value)

})
const onSubmit = () => {
  props.data.forEach(async (val: any) => {
    await mutate({
      companyId: companyId,
      processKey: props.processKey,
      incomeId: val.incomeId,
      day: dayValue.value
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
