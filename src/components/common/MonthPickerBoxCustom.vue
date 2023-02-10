<template>
    <div class="month-custom-1" :style="{height: $config_styles.HeightInput ,backgroundColor: bgColor}">
      <Datepicker
      v-model="date" autoApply monthPicker locale="ko" :format-locale="ko"
      format="yyyy-MM" :uid="id"
      @update:modelValue="handleDate"
      >
          <template #trigger>
              <div class="text-box-1">{{ text }} {{date.year}}-{{  date.month > 9 ? date.month : "0" + date.month.toString() }}</div>
          </template>
      </Datepicker>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ko } from "date-fns/locale";
import dayjs from 'dayjs';

export default defineComponent({
  props: {
    text: {
      type: String,
      default: "귀",
    },
    valueDate: {
      type: [Number, String],
    },
    id: {
      type: String,
      default: "",
    },
    bgColor: {
      type: String,
      default: 'black',
    },

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
        let month = modelData.month + 1;
        month = month > 9 ? month : "0" + month.toString();
        emit("update:valueDate", parseInt(`${modelData.year}${month}`));
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
<style lang="scss" scoped>
.month-custom-1 {
    border-radius: 5px;
    color: white;
    background-color: black;
    width: 100px;
    padding: 3px 16px;
}
</style>
