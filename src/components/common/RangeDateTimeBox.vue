<template>
  <Datepicker v-model="date" textInput locale="ko" autoApply format="yyyy-MM-dd" :format-locale="ko"
              :min-date="minDate"
              :max-date="maxDate"
              @update:modelValue="updateValue" :style="{ height: $config_styles.HeightInput, width: width }"
              :placeholder="placeholder" :range="true"
              :multi-calendars="multiCalendars"
              :teleport="teleport"
              :enable-time-picker="false"
              @internal-model-change="handleInternal"
              v-bind="$props"
  >
  </Datepicker>
</template>
<script lang="ts">
import {defineComponent, ref, watch} from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {ko} from "date-fns/locale";
import filters from "@/helpers/filters";
import dayjs from 'dayjs';

export default defineComponent({
  props: {
    width: {
      default: "100%",
      type: String,
    },
    valueDate: {
      type: Array,
      default: parseInt(dayjs().format("YYYYMMDD")),
    },
    placeholder: {
      type: String,
      default: ''
    },
    multiCalendars: {
      type: Boolean,
      default: false
    },
    maxRange: {
      type: [Number, String],
      default: 365,
    },
    teleport: {
      default: false,
      type: [Boolean, String]
    }
  },
  components: {
    Datepicker,
  },
  setup(props, {emit}) {
    const date: any = ref([filters.formatDate(props.valueDate[0]), filters.formatDate(props.valueDate[1])])
    const minDate = ref(dayjs().subtract(1, "year").toDate());
    const maxDate = ref(dayjs().add(1, "year").toDate());
    watch(
      () => props.valueDate,
      (newValue) => {
        if (newValue) {
          date.value = [filters.formatDate(newValue[0]), filters.formatDate(newValue[1])];
        } else {
          date.value = null;
        }
      }
    );
    const updateValue = () => {
      if (date.value) {
        let newDate = date.value.map((item: any) => {
          return +dayjs(item).format('YYYYMMDD')
        });
        emit("update:valueDate", newDate);
      } else {
        emit("update:valueDate", date.value);
      }
    };
    const handleInternal = (date: any) => {
      if (!date) return
      minDate.value = dayjs(date[0]).subtract(1, "year").toDate();
      maxDate.value = dayjs(date[0]).add(1, "year").add(1, "day").toDate();
    }
    return {
      updateValue,
      date,
      ko,
      dayjs,
      handleInternal,
      minDate,
      maxDate
    };
  },
});
</script>


<style lang="scss">
.dp__disabled {
  background: #fff;
  border: 1px solid #ddd;
  opacity: .5
}
</style>
