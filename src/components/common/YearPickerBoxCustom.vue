<template>
  <Datepicker
    autoApply
    yearPicker 
    v-model="date"
    locale="ko"
    :style="{height: $config_styles.HeightInput, width: width }"
    :format-locale="ko"
    @update:modelValue="handleDate"
  >
      <template #trigger>
          <div class="text-box-1">{{ text }} {{date}}</div>
      </template>
  </Datepicker>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ko } from "date-fns/locale";
import dayjs , { Dayjs }  from "dayjs";
export default defineComponent({
  props: {
    width: {
      default: "100%",
      type: String,
    },
    valueDate: {
      type: [String,Number],
      default: dayjs().year() ,
    },
    id: {
      type: String,
      default: "",
    },

    text: {
      type: String,
      default: "귀",
    },
  },
  components: {
    Datepicker,
  },
  setup(props, { emit }) {
    var date = ref(props.valueDate);
    watch(
      () => props.valueDate,
      (currentValue, oldValue) => {
        date.value = currentValue;
      }
    );
    const handleDate = (data: any) => {
      if (data) {
        emit("update:valueDate", data);
      } else {
        emit("update:valueDate", null);
      }
    };
    return {
      date,
      handleDate,
      ko
    };
  },
});
</script> 

<style lang="scss" scoped>
.month-custom-1 {
    padding-left: 30px;
    border-radius: 5px;
    margin-right: 10px;
    color: white;
    background-color: black;
    width: 120px;

    ::v-deep .dp__input {
        color: white;
        padding: 0px;
        border: none;
        height: 30px;
    }

    ::v-deep .dp__icon {
        display: none;
    }

    ::v-deep .dp__input {
        background-color: black;
    }
}
</style>
