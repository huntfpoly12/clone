<template>
  <DxSelectBox :search-enabled="searchEnabled" :width="width" :data-source="dataSource" :show-clear-button="clearButton"
    v-model="value" :read-only="readOnly" :display-expr="displayeExpr" :value-expr="valueExpr" :disabled="disabled"
    @value-changed="updateValue(value)" :height="$config_styles.HeightInput" placeholder="선택" :name="nameInput"
    field-template="field" item-template="item">
    <template #field="{ data }: any">
      <div v-if="data" class="text-overflow" style="padding: 4px;display: flex; align-items: center;">
        <div>
          {{ data[displayeExpr] }}
          <DxTextBox style="display: none;" />
        </div>
      </div>
      <div v-else class="pt-5 pl-5">
        <span>선택</span>
        <DxTextBox style="display: none;" />
      </div>
    </template>
    <template #item="{ data }: any">
      <div style="display: flex; align-items: center;">
        <div>
          {{ data[displayeExpr] }}
          <DxTextBox style="display: none;" />
        </div>
      </div>
    </template>
    <DxValidator :name="nameInput">
      <DxRequiredRule v-if="required" :message="messageRequired" />
    </DxValidator>
  </DxSelectBox>
</template>
<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxSelectBox from "devextreme-vue/select-box";
import { DxTextBox } from "devextreme-vue";
export default defineComponent({
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    messRequired: {
      type: String,
      default: "",
    },
    width: String,
    clearButton: Boolean,
    disabled: Boolean,
    valueInput: {
      type: Object as () => string | number | null,
      default: "",
    },
    readOnly: Boolean,
    dataSource: Array,
    nameInput: {
      type: String,
      default: '',
    },
    displayeExpr: {
      type: String,
      default: 'name',
    },
    valueExpr: {
      type: String,
      default: 'id',
    },
    searchEnabled: {
      type: Boolean,
      default: true
    }
  },
  components: {
    DxSelectBox,
    DxValidator,
    DxRequiredRule,
    DxTextBox
},
  setup(props, { emit }) {
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(messages.getCommonMessage('102').message);
    if (props.messRequired != "") {
      messageRequired.value = props.messRequired;
    }
    const value = ref(props.valueInput);

    watch(
      () => props.valueInput,
      (newValue) => {
        value.value = newValue;
      }
    );
    const updateValue = (value: any) => {
      emit("update:valueInput", value);
    };
    return {
      value,
      updateValue,
      messageRequired
    };
  },
});
</script>
