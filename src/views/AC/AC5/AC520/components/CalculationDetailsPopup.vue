<template>
  <a-modal wrapClassName="custom-modal" width="50%" v-bind="$props" @ok="handleOk" @cancel="closePopup"
           :mask-closable="false">
    <a-row >
      <a-col span="9">
        <dx-field-custom label="산출내역">
          <a-radio-group
            :value="typeCal"
            class="d-flex-center"
            required
          >
            <a-radio :value="1">제목</a-radio>
            <a-radio :value="2">계산식</a-radio>
          </a-radio-group>
        </dx-field-custom>
      </a-col>

      <a-col span="15" class="custom-content">
        <standard-form ref="formRef">
          <div v-for="(data, index) in dataSource" :key="index" class="mb-10">
            <div class="d-flex-center gap-10">
              <default-text-box required v-model="data.detail" placeholder="한글, 영문, 숫자, 괄호(), 사칙연산(+, -, *, /)"/>
              <number-box-money required v-model.number="data.amount" placeholder="계산결과"/>
              <div class="wrap-action">
                <DxButton @click="removeRow(index)" icon="minus" v-if="index > 0 || dataSource.length > 1 " />
                <DxButton @click="addRow" icon="plus" v-if="+index === dataSource.length - 1 || dataSource.length === 0  " />
              </div>
            </div>
          </div>
        </standard-form>
      </a-col>
      <div class="wf-100 text-center">
        <DxButton type="default" @click="handleSubmit" text="산출내역 저장"/>
      </div>

    </a-row>
  </a-modal>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue'

import DxFieldCustom from "@/components/common/DxFieldCustom.vue";
import {ModalProps} from "ant-design-vue";
import DefaultTextBox from "@/components/common/DefaultTextBox.vue";
import NumberBoxMoney from "@/components/common/NumberBoxMoney.vue";
import DxButton from 'devextreme-vue/button'
import StandardForm from "@/components/common/StandardForm.vue";
import {cloneDeep, isEqual} from "lodash";
import {Modal} from "ant-design-vue/es";
import {Message} from "@/configs/enum";

interface Props extends ModalProps {
  data: Description[];
  visible: boolean
}

interface Description {
  detail: string;
  amount: number | null;
}

const newDescription = {
  detail: '',
  amount: null
}

const props = defineProps<Props>()
// watch visible
watch(() => props.visible, (val) => {
  if (val) {
    dataSource.value =  props.data && props.data.length > 0 ? cloneDeep(props.data) : [{...newDescription}];
    valueOld.value =  props.data && props.data.length > 0 ? cloneDeep(props.data) : [{...newDescription}];
  }
}, {deep: true})
const emit = defineEmits(['closePopup', 'ok'])

const typeCal = ref(2);
const dataSource = ref<Description[]>([]);
const formRef = ref();
const valueOld = ref();

const isFormChange = computed(() => {
  return !isEqual(dataSource.value, valueOld.value)
})
function addRow() {
  dataSource.value.push({...newDescription});
}

const handleSubmit = () => {
  const res = formRef.value?.validate();
  if (!res.isValid) {
    res.brokenRules[0].validator.focus();
  } else {
    if (isFormChange.value) {
      emit('ok', dataSource.value)
      return;
    }

  }
}

function removeRow(index: number) {
  dataSource.value.splice(index, 1);
}

const handleOk = () => {

}
const closePopup = () => {
  if (isFormChange.value) {
    Modal.confirm({
      title: '',
      content: Message.getCommonMessage('501').message,
      onOk() {
        handleSubmit();
      },
      onCancel() {
        emit('closePopup', false)
      },
    });
  } else {
    emit('closePopup', false)
    return;
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
