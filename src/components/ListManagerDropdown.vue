<template>
  <div>
    <DxSelectBox :search-enabled="true" :width="width"
      :data-source="result?.searchUsers?.datas.length > 0 ? result.searchUsers.datas.filter((item: any) => item.managerGrade == 3) : []"
      :show-clear-button="clearButton" v-model:value="value" :read-only="readOnly" display-expr="name" value-expr="id"
      :disabled="disabled" @value-changed="updateValue(value)" :height="$config_styles.HeightInput" placeholder="선택"
      :name="nameInput">
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
    // watch(result, (valueData) => {
    //   // console.log(valueData.searchUsers.datas);

    //   dataSource.value = valueData.searchUsers.datas.filter((item : any)=> item.managerGrade == 3);
    // })
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
