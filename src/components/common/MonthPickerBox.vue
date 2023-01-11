<template>
  <Datepicker v-model="date" autoApply monthPicker locale="ko" :format-locale="ko"
    :style="{ height: $config_styles.HeightInput, width: width }" format="yyyy-MM" :uid="id"
    @update:modelValue="handleDate" :readonly="readonly" />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ko } from "date-fns/locale";
import dayjs from 'dayjs';

export default defineComponent({
  props: {
    width: {
      default: "100%",
      type: String,
    },
    valueDate: {
      type: [Number, String],
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
    const date: any = ref()
    if (props.valueDate) {
      date.value = {
        month: props.valueDate ? parseInt(dayjs(props.valueDate.toString()).format('MM')) - 1 : 0,
        year: props.valueDate ? parseInt(dayjs(props.valueDate.toString()).format('YYYY')) : 0,
      }
    }
    watch(
      () => props.valueDate,
      (newValue) => {

        if (newValue) {
          date.value = {
            month: parseInt(dayjs(newValue.toString()).format('MM')) - 1,
            year: parseInt(dayjs(newValue.toString()).format('YYYY')),
          };
        } else {
          date.value = null;
        }
      }
    );
    const handleDate = (modelData: any) => {
      if (modelData) {
        let day = modelData.month + 1;
        day = day > 9 ? day : "0" + day.toString();
        emit("update:valueDate", parseInt(`${modelData.year}${day}`));
      } else {
        emit("update:valueDate", null);
      }

    };

    return {
      handleDate,
      date,
      ko,
    };
  },
});
</script> 
