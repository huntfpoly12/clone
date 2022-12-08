<template>
  <Datepicker v-model="date"  textInput locale="ko" autoApply format="yyyy-MM-dd"
     :format-locale="ko"  @update:modelValue="updateValue"
    :style="{ height: $config_styles.HeightInput, width: width }">
  </Datepicker>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import DxDateBox from "devextreme-vue/date-box";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ko } from "date-fns/locale";
import filters from "@/helpers/filters";
export default defineComponent({
  props: {
    width: {
      default: "100%",
      type: String,
    },
    valueDate: {
      type: String,
      default: new Date(),
    },
    id: {
      type: String,
      default: "",
    },
    className: {
      type: String,
    }
  },
  components: {
    DxDateBox,
    Datepicker,
  },
  setup(props, { emit }) {
    const date = ref(filters.formatDate(props.valueDate))
    watch(
            () => props.valueDate,
            (newValue) => {
              date.value = filters.formatDate(newValue);
            }
    );
    const updateValue = (value: any) => {
            emit("update:valueDate", filters.formatDate(value));
    };
    return {
      updateValue,
      date,
      ko,
    };
  },
});
</script> 


<style lang="scss">
input.dp__input.dp__input_icon_pad {
  height: 34px;
}
</style>