<template>
  <a-modal :visible="visible" width="900px"  @ok="handleOk" @cancel="closePopup" :mask-closable="false" :footer="null">
    <a-row >
      <a-col span="9">
        <dx-field label="산출내역">
          <a-radio-group
            v-model:value="typeCal"
            class="d-flex-center"
            required
          >
            <a-radio :value="1" @click="changeType">제목</a-radio>
            <a-radio :value="2">계산식</a-radio>
          </a-radio-group>
        </dx-field>
      </a-col>

      <a-col span="15" class="custom-content">
        <standard-form ref="formRef">
          <div v-for="(data, index) in details" :key="index" class="mb-10">
            <div class="d-flex-center gap-10">
              <default-text-box v-model="data.detail" placeholder="한글, 영문, 숫자, 괄호(), 사칙연산(+, -, *, /)"/>
              <number-box-money v-model="data.calculationResult" placeholder="계산결과"/>
              <div class="wrap-action">
                <DxButton @click="removeRow(index)" icon="minus" v-if="index > 0 || details.length > 1 " />
                <DxButton @click="addRow" icon="plus" v-if="+index === details.length - 1 || details.length === 0  " />
              </div>
            </div>
          </div>
        </standard-form>
      </a-col>
      <div class="wf-100 text-center">
        <DxButton type="default" :disabled="typeCal === 1" @click="handleCalculate" text="계산" class="mr-10"/>
        <DxButton type="default" @click="handleSubmit" text="산출내역 저장"/>
      </div>
    </a-row>
  </a-modal>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue'

import {ModalProps} from "ant-design-vue";
import DxButton from 'devextreme-vue/button'
import {cloneDeep, isEqual} from "lodash";
import {Modal} from "ant-design-vue/es";
import {Message} from "@/configs/enum";

interface Props extends ModalProps {
  data: Description[];
  visible: boolean
}

interface Description {
  detail: string;
  calculationResult: string | null;
  type: number
}

const newDescription = {
  detail: '',
  calculationResult: null,
  type: 2
}

const props = defineProps<Props>()
// watch visible
watch(() => props.visible, (val) => {
  if (val) {
    details.value =  props.data && props.data.length > 0 ? cloneDeep(props.data) : [{...newDescription}];
    valueOld.value =  props.data && props.data.length > 0 ? cloneDeep(props.data) : [{...newDescription}];
    typeCal.value = props.data?.[0]?.type ?? 2; 
  }
}, {deep: true})
const emit = defineEmits(['closePopup', 'ok'])
const typeCal = ref(2);
const details = ref<Description[]>([]);
const formRef = ref();
const valueOld = ref();

const isFormChange = computed(() => {

  return !isEqual(details.value, valueOld.value)
})
function addRow() {
  details.value.push({...newDescription});
}

const handleSubmit = () => {
    emit('ok', details.value.map((item: any) => ({
      ...item,
      type: typeCal.value,
      calculationResult: item.calculationResult ? item.calculationResult.toString() : '',
    })))
    return;
}

function removeRow(index: number) {
  details.value.splice(index, 1);
}

const handleOk = () => {

}
const closePopup = () => {
  if (isFormChange.value) {
    Modal.confirm({
      title: '',
      content: Message.getCommonMessage('301').message,
      onOk() {
        emit('closePopup', false)
      },
      onCancel() {},
      width: 450,
      okText: '네',
      cancelText: '아니요',
    });
  } else {
    emit('closePopup', false)
    return;
  }
}
const handleCalculate = () => {
  if(typeCal.value === 2) {
    details.value = details.value.map((item: any) => {
      if(!item.detail) return item;
      return {
        ...item,
        calculationResult: item.detail ? (eval(item.detail.replace(/[^\d+\-*/().]/g, ""))?.toString() || '') : item.calculationResult.toString(),
      }
    })
  }
}
const changeType = (e: any) => {
  if(e.target.value == '1' && e.target.value != typeCal.value) {
    details.value = details.value.map((item: any) => ({
      ...item,
      calculationResult: '',
    }))
  }
}
</script>

<style scoped lang="scss">
.gap-10 {
  gap: 10px;
}

:deep(.dx-button-has-icon) {
  border-radius: 50%;

  .dx-button-content {
    padding: 4px;
  }

}
.dx-button-default {
  padding: 5px;
}
// grid cols 2
.wrap-action {
  width: 65px;
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
}

.custom-content {
  padding: 0px 25px 0 0;
  min-height: 100px;
  max-height: 500px !important;
  overflow-y: scroll;
}
</style>
