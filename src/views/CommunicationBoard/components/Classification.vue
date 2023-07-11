<template>
  <DxSelectBox v-if="isSelect" :noDataText="Message.getMessage('COMMON', '901').message" :width="width"
    :search-enabled="false" :data-source="listStatus" placeholder="선택" value-expr="id" display-expr="value"
    v-model:value="valueBind" :disabled="disabled" :read-only="readOnly" @value-changed="updateValue(valueSelect)">
  </DxSelectBox>
</template>
<script setup lang="ts">
import DxSelectBox from "devextreme-vue/select-box";
import { ClassificationEnum } from "@/views/CommunicationBoard/type";
import { Message } from "@/configs/enum";
import { ref } from "vue";

const props = defineProps({
  required: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '120px',
  },
  disabled: Boolean,
  valueSelect: {
    type: [Number, String],
    default: null,
  },
  readOnly: Boolean,
  isSelect: {
    type: Boolean,
    default: true,
  }
});
const emit = defineEmits(['update:valueSelect']);
const valueBind = ref(props.valueSelect)
const listStatus = [
  { id: ClassificationEnum.COMMON, value: ClassificationEnum.COMMON },
  { id: ClassificationEnum.ACCOUNTING, value: ClassificationEnum.ACCOUNTING },
  { id: ClassificationEnum.SOURCE, value: ClassificationEnum.SOURCE },
  {
    id: ClassificationEnum.MAJOR_INSURANCE, value: ClassificationEnum.MAJOR_INSURANCE
  },
]
const updateValue = (value: string | number) => {
  emit("update:valueSelect", value);
}
</script>
