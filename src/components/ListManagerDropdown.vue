<template>
  <div>
    <DxSelectBox :noDataText="Message.getMessage('COMMON', '901').message" :search-enabled="searchEnabled" :width="width"
      :data-source="dataSource"
      :show-clear-button="clearButton" v-model:value="value" :read-only="readOnly" display-expr="name" value-expr="id"
      :disabled="disabled" @value-changed="updateValue(value)" :height="height" placeholder="선택"
      :name="nameInput" field-template="field" item-template="item">
      <template #field="{ data }">
        <DxTextBox v-if="data" :value="data && `${data?.username} ${data.name}`" :read-only="!searchEnabled"/>
        <DxTextBox v-else value="선택" :read-only="!searchEnabled"/>
      </template>
      <template #item="{ data }">
        <div style="display: flex; align-items: center;">
          <span class="mr-3" style="min-width: 15px; text-align: center;">{{ data?.username }}</span>
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
import { Message } from "@/configs/enum"
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
    clearButton: {
      type: Boolean,
      default: false,
    },
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
    isExample: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 28,
    },
    filterData: {
      type: Boolean,
      default: false,
    },
    searchEnabled: {
      type: Boolean,
      default: true,
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
    const trigger = ref<boolean>(!props.isExample); // trigger for call api
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
      },
    },() => ({
            fetchPolicy: "no-cache",
            enabled: trigger.value,
        })
    );
    watch(
      () => props.valueInput,
      (newValue) => {
        value.value = newValue;
      }
    );
    watch(result, (newValue: any) => {
      if(!props.filterData){
        dataSource.value = newValue?.searchUsers?.datas.length > 0 ? newValue.searchUsers.datas.filter((item: any) => item.managerGrade == 3) : [];
      } else {
        dataSource.value = newValue?.searchUsers?.datas;
      }
    })
    const updateValue = (value: any) => {
      emit("update:valueInput", value);
    };
    return {
      result,
      value,
      updateValue, dataSource,
      messageRequired,
      Message
    };
  },
});
</script>
<style lang="scss" scoped>
.text-overflow {
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
