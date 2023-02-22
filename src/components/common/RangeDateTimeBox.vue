<template>
    <Datepicker v-model="date" textInput locale="ko" autoApply format="yyyy-MM-dd" :format-locale="ko"
        :min-date="minDate"
        :max-range="maxRange"
        @update:modelValue="updateValue" :style="{ height: $config_styles.HeightInput, width: width }"
        :placeholder="placeholder" :range="true"
        :multi-calendars="multiCalendars">
    </Datepicker>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ko } from "date-fns/locale";
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
        minDate: {
            type: [Date,String],
            default: null,
        },
        maxRange: {
            type: [Number,String],
            default: null,
        },
    },
    components: {
        Datepicker,
    },
  setup(props, { emit }) {
        const date: any = ref([filters.formatDate(props.valueDate[0]),filters.formatDate(props.valueDate[1])])
        watch(
            () => props.valueDate,
          (newValue) => {
                date.value = [filters.formatDate(newValue[0]),filters.formatDate(newValue[1])];
            }
        );
        const updateValue = () => {
              let newDate = date.value.map((item: any) => {
                  return +dayjs(item).format('YYYYMMDD')
              });
              emit("update:valueDate", newDate);
        };

        return {
            updateValue,
            date,
            ko,
            dayjs,
        };
    },
});
</script> 


<style lang="scss" >
.dp__disabled {
    background: #fff;
    border: 1px solid #ddd;
    opacity: .5
}
</style>
