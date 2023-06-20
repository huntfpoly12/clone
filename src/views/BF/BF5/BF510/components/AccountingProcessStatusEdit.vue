<template>
  <a-popover v-model:visible="visible" trigger="click" color="#e6e6e6">
    <template #content>
      <div class="mytext">
        <div v-if="status == 30 || status == 40">
          <radio-group :arrayValue="userType == 'm' ? arrayRadioManager : arrayRadioUser" v-model:valueRadioCheck="status"
            :layoutCustom="'horizontal'" />
          <span>으로 변경하시겠습니까?</span>
        </div>
        <div v-else>
          <span>입력마감시 더이상 수정불가합니다. 그래도 변경하시겠습니까?</span>
        </div>
        <div class="mt-20">
          <button-basic class="button-form-modal" :text="'아니오'" :type="'normal'" :mode="'contained'" @onClick="hide" />
          <button-basic class="button-form-modal" :text="'네, 변경합니다'" :width="140" :type="'default'" :mode="'contained'"
            @onClick="submitChangeStatus" />
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
import changeBudgetStatus from "@/graphql/mutations/AC/AC5/AC520/changeBudgetStatus";
interface Props {
  data: {
    index: number | string,
    status: number,
    companyId: string,
    facilityBusinessId: number
    year: number,
    month: number,
  }
}
const { data } = defineProps<Props>()
const emit = defineEmits(['closePopup'])
const status = ref(data.status);
const visible = ref<boolean>(false);
const showModal = ref(false)
const arrayRadioUser = ref([
  { id: 10, text: '입력중', class: 'entering' },
  { id: 20, text: '입력마감', class: 'input' },
])
const arrayRadioManager = ref([
  { id: 10, text: '입력중', class: 'entering' },
  { id: 20, text: '입력마감', class: 'input' },
  { id: 30, text: '조정중', class: 'adjusting' },
  { id: 40, text: '조정마감', class: 'adjusted' },
])
const textBtn = computed(() => {
  if (userType === 'm') {
    return arrayRadioManager.value.find(item => item.id === status.value)?.text
  } else {
    return arrayRadioUser.value.find(item => item.id === status.value)?.text
  }
})
const classBtn = computed(() => {
  if (userType === 'm') {
    return arrayRadioManager.value.find(item => item.id === status.value)?.class
  } else {
    return arrayRadioUser.value.find(item => item.id === status.value)?.class
  }
})
const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))

const query = reactive({
  companyId: data.companyId,
  fiscalYear: acYear.value,// acYear.value
  facilityBusinessId: data.facilityBusinessId,
  index: data.index,
  year: data.year,
  month: data.month,
})
const { mutate, onDone, onError } = useMutation(changeBudgetStatus)
onDone(({ data }) => {
  if (data) {
    showModal.value = false;
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
.entering {
  background-color: #346CB0 !important;
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

