<template>
  <div>
    <DxSelectBox
      :search-enabled="true"
      :width="width"
      :data-source="result?.findParters?.length > 0 ? result?.findParters : []"
      :show-clear-button="clearButton"
      v-model:value="value"
      :read-only="readOnly"
      display-expr="name"
      value-expr="id"
      :disabled="disabled"
      @value-changed="updateValue(value)"
      :height="$config_styles.HeightInput"
    >
      <DxValidator>
        <DxRequiredRule v-if="required" :message="messageRequired" />
      </DxValidator>
    </DxSelectBox>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch ,getCurrentInstance} from "vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxSelectBox from "devextreme-vue/select-box";
import queries from "../graphql/queries/common/index";
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
    label: {
      type: String,
      required: true,
    },
    readOnly: Boolean,
  },
  components: {
    DxSelectBox,
    DxValidator,
    DxRequiredRule,
  },
  setup(props, { emit }) {
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(
      messages.getCommonMessage(props.label, "102").message
    );
    if (props.messRequired != "") {
      messageRequired.value = props.messRequired;
    }
    const value = ref(props.valueInput);
    const { result, loading, error, onResult, refetch } = useQuery(
      queries.getListPartner
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
      updateValue,
      messageRequired
    };
  },
});
</script>
