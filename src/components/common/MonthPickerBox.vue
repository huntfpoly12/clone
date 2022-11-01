<template>
  <Datepicker
    v-model="date"
    autoApply
    monthPicker
    :format-locale="ko"
    :style="{ width: width }"
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
    value: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    className: {
      type: String,
    },
    styleDate: {
      type: String,
    },
  },
  components: {
    Datepicker,
  },
  setup(props, { emit }) {
    var valueDate = new Date(props.value);
    const date = ref({
          month: valueDate.getMonth(),
          year: valueDate.getFullYear(),
        });
    watch(
      () => props.value,
      (newValue) => {
        valueDate = new Date(newValue);
        date.value = {
          month: valueDate.getMonth(),
          year: valueDate.getFullYear(),
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
      emit("update:value", `${modelData.year}-${day}`);
    };

    return {
      valueDate,
      handleDate,
      date,
      format,
      ko,
    };
  },
});
</script> 
