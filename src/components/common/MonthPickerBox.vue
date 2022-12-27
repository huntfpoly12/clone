<template>
  <Datepicker v-model="date" autoApply monthPicker locale="ko" :format-locale="ko"
    :style="{ height: $config_styles.HeightInput, width: width }" :format="format" :uid="id"
    @update:modelValue="handleDate" :readonly="readonly" />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ko } from "date-fns/locale";
// import { Dayjs } from "dayjs";

export default defineComponent({
  props: {
    width: {
      default: "100%",
      type: String,
    },
    valueDate: {
      type: String,
      // default: new Date(),
    },
    id: {
      type: String,
      default: "",
    },
    className: {
      type: String,
    },
    readonly: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    Datepicker,
  },
  setup(props, { emit }) {
    let date = ref()
    let valueDate = ref()
    if (props.valueDate) {
      valueDate.value = new Date(props.valueDate);
      date.value = {
        month: valueDate.value.getMonth(),
        year: valueDate.value.getFullYear(),
      }
    }
    watch(
      () => props.valueDate,
      (newValue) => {
        if (newValue) {
          valueDate.value = new Date(newValue);
          date.value = {
            month: valueDate.value.getMonth(),
            year: valueDate.value.getFullYear(),
          };
        } else {
          date.value = null;
        }
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
      handleDate,
      date,
      format,
      ko,
    };
  },
});
</script> 
