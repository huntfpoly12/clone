<script setup lang="ts">
import { Message } from '@/configs/enum';
import { DxSelectBox, DxTextBox, DxValidator } from 'devextreme-vue';
import { DxRequiredRule } from 'devextreme-vue/validator';
import { computed } from 'vue';
export interface Props {
  dataSource?: any[],
  disabled?: boolean,
  placeholder: string,
  width: string | number,
  valueExpr: string,
  displayeExpr: string,
  required: boolean,
  valueInput: string | number,
  // ?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  placeholder: "선택",
  width: 200,
  valueExpr: 'id',
  displayeExpr: 'name',
  required: false,
  // labels: () => ['one', 'two']
})
const emit = defineEmits(['update:valueInput']);
const selectedValue = computed<any>({
  get() {
    return props.valueInput;
  },
  set(value: String) {
    emit('update:valueInput', value)
  }
})
const widthCustom = computed<string>(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px';
  }
  return props.width;
})
const messageRequired = Message.getCommonMessage('102').message;
</script>
<template>
  <DxSelectBox :search-enabled="false" :width="widthCustom" :data-source="props.dataSource"
    :display-expr="props.displayeExpr" :value-expr="props.valueExpr" :disabled="props.disabled" v-model="selectedValue"
    :placeholder="props.placeholder" field-template="field" item-template="item" validation-message-position="bottom">
    <template #field=" { data } : any ">
      <div v-if=" data " class="text-overflow" style="padding: 2px;display: flex; align-items: center;">
        <a-tag>{{ data[props.valueExpr] }}</a-tag>
        <a-tooltip zIndex="9999" placement="top" color="black">
          <template #title v-if=" data.name.length > 10 ">
            <div>{{data[props.displayeExpr]}}</div>
          </template>
          <div class="text-overflow" :style=" { width: `calc(${widthCustom} - 75px)` } ">
            {{ data[props.displayeExpr] }}
            <DxTextBox style="display: none;" />
          </div>
        </a-tooltip>
      </div>
      <div v-else class="pt-5 pl-5">
        <span>선택</span>
        <DxTextBox style="display: none;" />
      </div>
    </template>
    <template #item=" { data } : any ">
      <div style="display: flex; align-items: center;">
        <a-tag>{{ data[props.valueExpr] }}</a-tag>
        <a-tooltip zIndex="9999" placement="top" color="black">
          <template #title v-if=" data.name.length > 10 ">
            <div>{{ data[props.displayeExpr] }}</div>
          </template>
          <div class="text-overflow">
            {{ data[props.displayeExpr] }}
            <DxTextBox style="display: none;" />
          </div>
        </a-tooltip>
      </div>
    </template>
    <DxValidator>
      <DxRequiredRule v-if=" required " :message=" messageRequired " />
    </DxValidator>
  </DxSelectBox>
</template>
<style lang="scss"></style>