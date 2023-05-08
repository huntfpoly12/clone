<template>
  <DxSelectBox 
  :noDataText="Message.getMessage('COMMON', '901').message"
    v-model:value="valueBinding" 
    :data-source="arrData" 
    :search-enabled="searchEnabled" 
    :placeholder="placeholder"
    search-mode="contains" 
    search-expr="value" 
    :search-timeout="100" 
    :min-search-length="0"
    :show-data-before-search="false" 
    :display-expr="displayExpr" 
    :value-expr="valueExpr" 
    :disabled="disabled"
    :read-only="readOnly"
    :width="width"
    :height="$config_styles.HeightInput"
    @input="inputChange" 
    @enter-key="eventEnter"
    @focus-in="focusInput"
    >
    <DxValidator name="규격">
      <DxRequiredRule v-if="required" :message="messRequired" />
    </DxValidator>
  </DxSelectBox>
</template>
<script lang="ts">
import { ref, watch, nextTick } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import { Message } from "@/configs/enum"
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    required: {
      type: Boolean,
      default: false,
    },
    messRequired: {
      type: String,
      default: "",
    },
    width: String,
    disabled: Boolean,
    valueInput: {
      type: [Number, String],
      default: "",
    },
    readOnly: Boolean,
    placeholder: {
      type: String,
      default: '선택 또는 직접입력'
    },
    searchEnabled: {
      type: Boolean,
      default: true
    },
    displayExpr: {
      type: String,
      default: 'value'
    },
    valueExpr: {
      type: String,
      default: 'value'
    }
  },
  components: {
    DxSelectBox,
    DxValidator,
    DxRequiredRule
  },
  setup(props, { emit }) {
    let valueBinding: any = ref(props.valueInput)
    let arrData: any = ref([])
    let keywordSlect: any = ref('')

    watch(() => props.data, (value) => {
      if (!!value && value.length) {
        arrData.value = [...value]
      }
    }, {
      deep: true,
      immediate: true,
    })

    watch(() => valueBinding.value, (value) => {
      if(value !== null && value.toString().length){
        emit("update:valueInput", value);
      }
    })
    const focusInput = (e: any) => {
      e.event.target.select()
      keywordSlect.value = e.event.target.value
    }

    const inputChange = (e: any) => {
      keywordSlect.value = e.event.target.value
    }

    const eventEnter = (e: any) => {
      const el = e.component.instance()
      if(!arrData.value.some((item: any) => item.value.includes(keywordSlect.value.trim()))) {
        el.close()
        arrData.value.push({value: keywordSlect.value.trim()})
        el.reset()
        valueBinding.value = keywordSlect.value.trim()
        emit("update:valueInput", keywordSlect.value.trim());
        emit("updateArrSelect", [...arrData.value]);
      }
      nextTick(() => {
        el.focus()
      })
    }
    return {
      valueBinding,
      arrData,
      inputChange,
      eventEnter,
      focusInput,
      Message
    };
  },
};
</script>
  
<style scoped></style>
  