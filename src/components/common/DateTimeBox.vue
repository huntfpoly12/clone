<template>
    {{ dayjs(startDate) }}
    <Datepicker v-model="date" textInput locale="ko" autoApply format="yyyy-MM-dd"
        :format-locale="ko" @update:modelValue="updateValue"
        :style="{ height: $config_styles.HeightInput, width: width }" :max-date="birthDay ? new Date() : ''"
        :placeholder="placeholder">
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
            type: [Number, String],
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
        startDate: Number,
        finishDate: Number,
    },
    components: {
        Datepicker,
    },
    setup(props, { emit }) {
        const date: any = ref(props.valueDate ? filters.formatDate(props.valueDate.toString()) : filters.formatDate(props.valueDate))
        watch(
            () => props.valueDate,
            (newValue) => {
                if (newValue)
                    date.value = filters.formatDate(newValue?.toString());
                else
                    date.value = newValue;
            }
        );
        const updateValue = () => {
            if (date.value)
                emit("update:valueDate", filters.formatDateToInterger(date.value));
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
input.dp__input.dp__input_icon_pad {
    height: 34px;
}

.dp__disabled {
    background: #fff;
    border: 1px solid #ddd;
    opacity: .5
}
</style>
