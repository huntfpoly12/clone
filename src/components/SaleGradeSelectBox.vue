<template>
  <div>
    <DxSelectBox
      :width="width"
      :data-source="saleGrade"
      :placeholder="placeholder"
      :show-clear-button="clearButton"
      v-model:value="value"
      :read-only="readOnly"
      display-expr="label"
      value-expr="value"
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
import { defineComponent, ref, watch , computed,getCurrentInstance} from "vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxSelectBox from "devextreme-vue/select-box";
import {
  SalesRepresentativeGrade,
  enum2Entries,
} from "@bankda/jangbuda-common";

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
      default: 0,
    },
    label: {
      type: String,
      required: true,
    },
    selectAll :{
      type: Boolean,
      default: false,
    },
    placeholder: String,
    readOnly: Boolean,
  },
  components: {
    DxSelectBox,
    DxValidator,
    DxRequiredRule,
  },
  setup(props, { emit }) {

    var  saleGrade : any  = computed(() => {
        let slGrade : any =  enum2Entries(SalesRepresentativeGrade).map((value) => ({
        value: value[1],
        label: value[0],
      }));
      if(props.selectAll){
        slGrade.push({ value: 0 , label: '전체'});
      }
      return slGrade;
    }) ;
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(messages.getCommonMessage('102').message.replaceAll('{object}', props.label));
    if (props.messRequired != "") {
      messageRequired.value = props.messRequired;
    }
    const value = ref(props.valueInput);

    const updateValue = (value: any) => {
      emit("update:valueInput", value);
    };
    watch(
      () => props.valueInput,
      (newValue) => {
        value.value = newValue;
      }
    );
    return {
      updateValue,
      saleGrade,
      value,
      messageRequired
    };
  },
});
</script>
<style scoped></style>
