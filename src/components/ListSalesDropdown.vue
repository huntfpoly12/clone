<template>
  <DxSelectBox
    :noDataText="Message.getMessage('COMMON', '901').message"
    :search-enabled="true"
    :width="width"
    :data-source="dataSource"
    :show-clear-button="clearButton"
    v-model="value"
    :read-only="readOnly"
    display-expr="name"
    value-expr="id"
    :disabled="disabled"
    @value-changed="updateValue(value)"
    :height="$config_styles.HeightInput"
    placeholder="선택"
    :name="nameInput"
    field-template="field" item-template="item">
  <!-- > -->
    <template #field="{ data }">
      <div v-if="data" class="text-overflow" style="padding: 4px;display: flex; align-items: center;">
        <span class="mr-3" style="min-width: 15px;">{{ data?.code }}</span>
        <div>
          {{ data.name }}
          <DxTextBox style="display: none;" />
        </div>
      </div>
      <div v-else class="pt-5 pl-5">
        <span>선택</span>
        <DxTextBox style="display: none;" />
      </div>
    </template>
    <template #item="{ data }">
      <div style="display: flex; align-items: center;">
        <span class="mr-3" style="min-width: 15px; text-align: center;">{{ data?.code }}</span>
        <div>
          {{ data?.name }}
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
import DxSelectBox, { DxItem } from "devextreme-vue/select-box";
import queries from "../graphql/queries/common/index";
import { useQuery } from "@vue/apollo-composable";
import DxTextBox from "devextreme-vue/text-box";
import { Message } from "@/configs/enum";
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
      type: Number,
      default: "",
    },
    readOnly: Boolean,
    nameInput: {
      type: String,
      default: "",
    },
    isExample: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DxSelectBox,
    DxValidator,
    DxRequiredRule,
    DxTextBox,
    DxItem,
  },
  setup(props, { emit }) {
    const value = ref(props.valueInput);
    watch(
      () => props.valueInput,
      (newValue) => {
        value.value = newValue;
        console.log(`output->newValue`, newValue);
      }
    );
    const app: any = getCurrentInstance();
    const trigger = ref<boolean>(!props.isExample); // trigger for call api
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(messages.getCommonMessage("102").message);
    if (props.messRequired != "") {
      messageRequired.value = props.messRequired;
    }
    const dataSource = ref([]);
    const { result } = useQuery(queries.getListSale, {}, () => ({
      fetchPolicy: "no-cache",
      enabled: trigger.value,
    }));
    watch(result, (newVal: any) => {
      dataSource.value = newVal.findSalesRepresentatives;
    });
    console.log(`output->newValue1`, 1111);

    const updateValue = (value: any) => {
      emit("update:valueInput", value);
    };
    return {
      result,
      value,
      updateValue,
      messageRequired,
      Message,
      dataSource,
    };
  },
});
</script>
<style lang="scss" scoped>
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
