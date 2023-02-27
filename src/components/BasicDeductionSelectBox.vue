<template>
    <div>
      <DxSelectBox
        :width="width"
        :data-source="basicDeductionData"
        placeholder="선택"
        :show-clear-button="clearButton"
        v-model:value="value"
        :read-only="readOnly"
        display-expr="label"
        value-expr="value"
        @value-changed="updateValue(value)"
        :height="$config_styles.HeightInput"
        :name="nameInput"
      >
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
  import {
    BasicDeduction,
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
      selectAll :{
        type: Boolean,
        default: false,
      },
      readOnly: Boolean,
      nameInput: {
        type: String,
        default: '',
      },
      ageCount: {
        type: [String, Number],
        default: 0,
      }
    },
    components: {
      DxSelectBox,
      DxValidator,
      DxRequiredRule,
    },
    setup(props, { emit }) {
  
      var  basicDeduction : any  = computed(() => {
          let bsDeduction : any =  enum2Entries(BasicDeduction).map((value) => ({
          value: value[1],
          label: value[0],
        }));
        if(props.selectAll){
          bsDeduction.unshift({ value: null , label: '전체'});
        }
        return bsDeduction;
      }) ;
      let basicDeductionData = ref(basicDeduction.value);
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
      watch(()=> props.ageCount,(newVal)=> {
        if(newVal <= 20) {
          value.value = 3;
          basicDeductionData.value = basicDeductionData.value.map((item:any)=> {
            return item.value != 3 ? {...item,disabled: true} : {...item};
          })
          return;
        }
        if(newVal >= 60) {
          value.value = 4;
          let newArr = basicDeductionData.value.map((item:any)=> {
            return item.value != 4 ? {...item,disabled: true} : {...item};
          })
          basicDeductionData.value = [...newArr]
          return;
        }
        basicDeductionData.value = basicDeductionData.value.map((item:any)=> {
          return (item.value == 3) || (item.value ==4) ? {...item,disabled: true} : {...item};
        })
      }, {immediate: true})
      return {
        updateValue,
        basicDeductionData,
        value,
        messageRequired
      };
    },
  });
  </script>
  <style scoped></style>
  