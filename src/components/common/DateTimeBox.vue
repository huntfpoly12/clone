<template>
    <!-- check a birthday not later than the current date (if any) -->
    <Datepicker v-model="date" textInput locale="ko" autoApply format="yyyy-MM-dd" :format-locale="ko"
        @update:modelValue="updateValue" :style="{ height: $config_styles.HeightInput, width: width }"
        :max-date="birthDay ? new Date() : ''" :placeholder="placeholder" :range="range"
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
            type: [Number, String, Array],
            default: parseInt(dayjs().format("YYYYMMDD")),
        },
        id: {
            type: String,
            default: "",
        },
        className: {
            type: String,
        },
        birthDay: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        range: {
            type: Boolean,
            default: false
        },
        multiCalendars: {
            type: Boolean,
            default: false
        },
    },
    components: {
        Datepicker,
    },
    setup(props, { emit }) {
        const date: any = ref(filters.formatDate(props.valueDate))
        watch(
            () => props.valueDate,
            (newValue) => {
                if (!props.range) {
                    if (newValue) {
                        date.value = filters.formatDate(newValue?.toString());
                    }
                    else
                        date.value = newValue;
                } else {
                    if (newValue.constructor == Array) {
                        date.value = newValue.map((item: any) => {

                            return filters.formatDate(item);
                        });
                    } else {
                        date.value = []
                    }
                }
            }
        );
        const updateValue = () => {
            if (date.value) {
                if (props.range) {
                    let newDate = date.value.map((item: any) => {
                        return +dayjs(item).format('YYYYMMDD')
                    });
                    emit("update:valueDate", newDate);
                    console.log(`output->newDate`,newDate, date.value)
                    return;
                }
                let newDate = typeof date.value == 'object' ? +dayjs(date.value).format('YYYYMMDD') : filters.formatDateToInterger(date.value);
                emit("update:valueDate", newDate);
            }
            else
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
