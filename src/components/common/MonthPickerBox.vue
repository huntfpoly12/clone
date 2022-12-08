<template>
  <Datepicker
    v-model="date"
    autoApply
    monthPicker
    locale="ko"
    :format-locale="ko"
    :style="{height: $config_styles.HeightInput, width: width }"
    :format="format"
    :uid="id"
    @update:modelValue="handleDate"
  />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ko } from "date-fns/locale";
import { Dayjs } from "dayjs";

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
    Datepicker,
  },
  setup(props, { emit }) {
    var value = new Date(props.valueDate);
    const date = ref({
          month: value.getMonth(),
          year: value.getFullYear(),
        });
    watch(
      () => props.valueDate,
      (newValue) => {
        value = new Date(newValue);
        date.value = {
          month: value.getMonth(),
          year: value.getFullYear(),
        };
      }
    );

    // format date
    const format = (date: any) => {
      let day = date.month + 1;
      day = day > 9 ? day : "0" + day.toString();
      return `${date.year}-${day}`;
    };

    const handleDate = (modelData: any) => {
      let day = modelData.month + 1;
      day = day > 9 ? day : "0" + day.toString();
      emit("update:valueDate", `${modelData.year}-${day}`);
    };

    return {
      value,
      handleDate,
      date,
      format,
      ko,
    };
  },
});
</script> 
