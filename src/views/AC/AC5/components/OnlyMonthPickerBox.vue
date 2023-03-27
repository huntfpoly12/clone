<template>
  <div class="picker-only-month">
    <Datepicker v-model="date" autoApply monthPicker locale="ko" :format-locale="ko" format="yyyy-MM" :uid="id"
      @update:modelValue="handleDate" :disabled="disabled">
      <template #trigger>
        <img class="picker-only-month-icon" src="@/assets/images/icon_date_picker.svg" />
        <span class="picker-only-month-text">{{ date.month !== null && date.month < 9 ? '0' + (date.month + 1) : date.month +
          1 }}</span>
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
    valueMonth: {
      type: [Number, String],
    },
    id: {
      type: String,
      default: "",
    },
    bgColor: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Datepicker,
  },
  setup(props, { emit }) {
    const date: any = ref()
    date.value = {
      month: props.valueMonth ? parseInt(dayjs(props.valueMonth.toString()).format('MM')) - 1 : 0,
      year: new Date().getFullYear()
    }
    watch(
      () => props.valueMonth,
      (newValue) => {

        if (newValue) {
          date.value = {
            month: parseInt(dayjs(newValue.toString()).format('MM')) - 1,
            year: new Date().getFullYear()
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
        emit("update:valueMonth", parseInt(month));
      } else {
        emit("update:valueMonth", null);
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
.picker-only-month {
  width: 70px;
  border: 1px solid #5F5F5F;

  &-icon {
    height: 20px;
    width: auto;
    margin: 0px 5px 5px 5px;
  }

  &-text {
    font-size: 16px;
    color: #5F5F5F;
  }

  :deep(.dp__selection_grid_header) {
    display: none !important;
  }
}</style>
