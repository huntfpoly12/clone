<template>
    <Datepicker v-model="date" textInput locale="ko" monthPicker autoApply format="yyyy-MM" :format-locale="ko"
        :min-date="minDate" :max-date="maxDate" :max-range="maxRange" @update:modelValue="updateValue"
        :style="{ height: $config_styles.HeightInput, width: width }" :placeholder="placeholder" :range="true"
        :multi-calendars="multiCalendars" :teleport="teleport">
    </Datepicker>
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
            type: Array,
            // default: parseInt(dayjs().format("YYYYMM")),
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
            type: [Date, String],
            default: null,
        },
        maxDate: {
            type: [Date, String],
            default: null,
        },
        maxRange: {
            type: [Number, String],
            default: null,
        },
        teleport: {
            default: false,
            type: [Boolean, String]
        }
    },
    components: {
        Datepicker,
    },
    setup(props, { emit }) {
        const date: any = ref(props.valueDate)

        watch(
            () => props.valueDate,
            (newValue) => {
                date.value = newValue;
            }
        );
        const updateValue = () => {
            //   let newDate = date.value.map((item: any) => {
            //       return +dayjs(item).format('YYYYMM')
            //   });
            emit("update:valueDate", date.value);
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
