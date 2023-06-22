<template>
  <a-popover v-model:visible="visible" trigger="click" color="#e6e6e6">
    <template #content>
      <div class="mytext">
        <div>
          <radio-group :arrayValue="arrayRadioManagerChoose" v-model:valueRadioCheck="status"
            :layoutCustom="'horizontal'" />
          <span>으로 변경하시겠습니까?</span>
        </div>
        <div class="mt-20">
          <button-basic class="button-form-modal" :text="'아니오'" :type="'normal'" :mode="'contained'" @onClick="hide" />
          <button-basic class="button-form-modal" :text="'네, 변경합니다'" :width="140" :type="'default'" :mode="'contained'"
            @onClick="submitChangeStatus" :disabled="status === 1" />
        </div>
      </div>
    </template>
    <div>
      <button-basic :width="100" :text="textBtn" :class="classBtn" class="buttonModal" />
    </div>
  </a-popover>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { userType } from "@/helpers/commonFunction";
import { useMutation } from "@vue/apollo-composable";
import changeAccountingProcessStatus from "@/graphql/mutations/BF/BF5/BF510/changeAccountingProcessStatus";
interface Props {
  data: {
    status: number,
    companyId: string,
    facilityBusinessId: number
    year: number,
    month: number,
  }
}
const { data } = defineProps<Props>()
const emit = defineEmits(['closePopup'])
console.log('data', data.status)
const status = ref(data.status);
const visible = ref<boolean>(false);
const arrayRadioUser = ref([
  { id: 10, text: '입력중', class: 'entering' },
  { id: 20, text: '입력마감', class: 'input' },
])
const arrayRadioManagerChoose = ref([
  { id: 10, text: '입력중', class: 'entering' },
  { id: 20, text: '입력마감', class: 'input' },
  { id: 30, text: '조정중', class: 'adjusting' },
  { id: 40, text: '조정마감', class: 'adjusted' },
])
const arrayRadioManager = ref([
  { id: 1, text: '미입력', class: 'noInput' },
  { id: 10, text: '입력중', class: 'entering' },
  { id: 20, text: '입력마감', class: 'input' },
  { id: 30, text: '조정중', class: 'adjusting' },
  { id: 40, text: '조정마감', class: 'adjusted' },
])
const textBtn = computed(() => {
  if (userType === 'm') {
    return arrayRadioManager.value.find(item => item.id === data.status)?.text
  } else {
    return arrayRadioUser.value.find(item => item.id === data.status)?.text
  }
})
const classBtn = computed(() => {
  if (userType === 'm') {
    return arrayRadioManager.value.find(item => item.id === data.status)?.class
  } else {
    return arrayRadioUser.value.find(item => item.id === data.status)?.class
  }
})

const query = reactive({
  companyId: data.companyId,
  fiscalYear: data.year,// acYear.value
  facilityBusinessId: data.facilityBusinessId,
  year: data.year,
  month: data.month,
  status: data.status,
})
const { mutate, onDone, onError } = useMutation(changeAccountingProcessStatus)
onDone(({ data }) => {
  if (data) {
    emit("closePopup", true);
  }
})
onError((error) => {
  console.log('error', error)
})
const hide = () => {
  visible.value = false;
};

const submitChangeStatus = () => {
  const statusType = userType === 'm' ? status.value : 20
  mutate({
    ...query,
    status: statusType
  })
}
</script>
<style lang="scss" scoped>
.noInput {
  background-color: #7F7F7F !important;
  box-shadow: rgba(0, 0, 0, 0.384) 0px 0px 10px 4px;
  border: 1px solid #7F7F7F;
}
.entering {
  background-color: #376092 !important;
  box-shadow: rgba(0, 0, 0, 0.384) 0px 0px 10px 4px;
  border: 1px solid #4A7EBB;
}

.input {
  background-color: #376092 !important;
  border: 3px solid #558ED5 !important;
}

.adjusting {
  background-color: #BB3835 !important;
  box-shadow: rgba(0, 0, 0, 0.384) 0px 0px 10px 4px;
  border: 1px solid #BE4B48 !important;
}

.adjusted {
  background-color: #C00000 !important;
  border: 3px solid #953735 !important;
}

.mytext {
  min-width: 300px;
  text-align: center;
  padding: 5px;
}

.button-form-modal {
  margin: 0px 5px;
}

:deep .dx-widget.dx-collection {
  justify-content: center;
}

.buttonModal {
  color: white;
  border: none;
  border-radius: 6px;
}

.disabled {
  cursor: no-drop;
}

:deep .dx-button-text {
  line-height: inherit;
}
</style>

