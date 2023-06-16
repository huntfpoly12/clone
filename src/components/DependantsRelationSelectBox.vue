<template>
    <div>
      <DxSelectBox
      :noDataText="Message.getMessage('COMMON', '901').message"
        :width="width"
        :data-source="dependantsRelation"
        placeholder="선택"
        :show-clear-button="clearButton"
        v-model:value="value"
        :read-only="readOnly"
        display-expr="label"
        value-expr="value"
        @value-changed="updateValue(value)"
        :height="$config_styles.HeightInput"
        :name="nameInput"
        :disabled="disabled"
        item-template="item"
      >
        <template #item=" { data } : any ">
            <a-tooltip zIndex="9999" placement="top" color="black">
            <template #title>
              <div>{{ data.label }}</div>
            </template>
            <div class="text-overflow">
              {{ data.label }}
            </div>
          </a-tooltip>
        <DxTextBox style="display: none;" />
        </template>
        <DxValidator :name="nameInput">
          <DxRequiredRule v-if="required" :message="messageRequired" />
        </DxValidator>
      </DxSelectBox>
    </div>
  </template>
  <script lang="ts">
  import { defineComponent, ref, watch , computed,getCurrentInstance} from "vue";
  import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
  import DxSelectBox from "devextreme-vue/select-box";
  import { Message } from "@/configs/enum"
  import {
    DependantsRelation,
    enum2Entries,
  } from "@bankda/jangbuda-common";
  import {  DxTextBox } from 'devextreme-vue';
  
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
      selectAll :{
        type: Boolean,
        default: false,
      },
      readOnly: Boolean,
      nameInput: {
        type: String,
        default: '',
      },
      itemSelected: {
        type: Array,
        default: [],
      }
    },
    components: {
      DxSelectBox,
      DxValidator,
      DxRequiredRule,
      DxTextBox,
    },
    setup(props, { emit }) {
      var dependantsRelation : any  = computed(() => {
          let dpRelation : any =  enum2Entries(DependantsRelation).map((value) => {
            const item1 = props.itemSelected.find(
              (item2: any)=> item2.value == value[1] && value[1] == 3
              ) || value[1] == 0;
            return item1 ? {value: value[1], label: value[0], disabled: true} : { value: value[1], label: value[0]};
        });
        if(props.selectAll){
            dpRelation.unshift({ value: null , label: '전체'});
        }
        return dpRelation;
      }) ;
      const app: any = getCurrentInstance();
      const messages = app.appContext.config.globalProperties.$messages;
      const messageRequired = ref(messages.getCommonMessage('102').message);
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
        dependantsRelation,
        value,
        messageRequired,
        Message
      };
    },
  });
  </script>
  <style scoped></style>
  