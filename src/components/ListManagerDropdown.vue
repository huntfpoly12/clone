<template>
  <div>
    <DxSelectBox :search-enabled="true" :width="width"
      :data-source="result?.searchUsers?.datas.length > 0 ? result.searchUsers.datas.filter((item: any) => item.managerGrade == 3) : []"
      :show-clear-button="clearButton" v-model:value="value" :read-only="readOnly" display-expr="name" value-expr="id"
      :disabled="disabled" @value-changed="updateValue(value)" :height="$config_styles.HeightInput" placeholder="선택"
      :name="nameInput" field-template="field" item-template="item">
      <template #field="{ data }">
        <!-- :name="nameInput"> -->
        <div v-if="data" class="text-overflow" style="padding: 4px;display: flex; align-items: center;">
          <span class="mr-3" style="min-width: 15px;">{{ data?.id }}</span>
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
          <span class="mr-3" style="min-width: 15px; text-align: center;">{{ data?.id }}</span>
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
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance, reactive } from "vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxSelectBox from "devextreme-vue/select-box";
import queries from "@/graphql/queries/common/index";
import { useQuery } from "@vue/apollo-composable";
import DxTextBox from "devextreme-vue/text-box";
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
      default: '',
    },
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
    const dataSource = ref([])

    const value = ref(props.valueInput);
    const { result } = useQuery(
      queries.searchUsers, {
      filter: {
        rows: 10000,
        type: 'm'
      }
    }
    );
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
      result,
      value,
      updateValue, dataSource,
      messageRequired
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
