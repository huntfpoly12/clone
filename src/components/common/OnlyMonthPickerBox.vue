<template>
  <div class="picker-only-month">
    <Datepicker v-model="date" autoApply monthPicker locale="ko" :format-locale="ko" format="yyyy-MM" :uid="id"
      @update:modelValue="handleDate" :disabled="disabled" :min-date="monthMinMax.min" :max-date="monthMinMax.max">
      <template #trigger>
        <div class="picker-only-month-box">
          <img class="picker-only-month-box-icon" src="@/assets/images/icon_date_picker.svg" />
          <span class="picker-only-month-box-text">{{ date.month !== null && date.month < 9 ? '0' + (date.month + 1) :
            date.month + 1 }}</span>
        </div>
      </template>
    </Datepicker>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, PropType } from "vue";
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
    min: {
      type: null as unknown as PropType<string | number | null>,
      default: null
    },
    max: {
      type: null as unknown as PropType<string | number | null>,
      default: null
    }
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

    const monthMinMax = computed(() => {
      const year = new Date().getFullYear()
      let resultMin: string | Date = ''
      let resultMax: string | Date = ''
      if (!!props.min && parseInt(props.min.toString()) >= 1 && parseInt(props.min.toString()) <= 12) {
        resultMin = new Date(`${year}-${props.min.toString().length === 2 ? props.min.toString() : '0' + props.min.toString()}-15`)
      }
      if (!!props.max && parseInt(props.max.toString()) >= 1 && parseInt(props.max.toString()) <= 12) {
        resultMax = new Date(`${year}-${props.max.toString().length === 2 ? props.max.toString() : '0' + props.max.toString()}-15`)
      }
      return {
        min: resultMin,
        max: resultMax,
      }
    })

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
      monthMinMax
    };
  },
});
</script> 
<style lang="scss" scoped>
.picker-only-month {
  width: 70px;
  border: 1px solid #ddd;
  height: 28px;
  border-radius: 3px;
  cursor: pointer;

  &-box {
    display: flex;
    align-items: center;

    &-icon {
      height: 15px;
      margin: 0 6px;
      width: auto;
      opacity: .5;
    }

    &-text {
      font-size: 16px;
      color: #5F5F5F;
    }
  }

  :deep(.dp__selection_grid_header) {
    display: none !important;
  }
}</style>
