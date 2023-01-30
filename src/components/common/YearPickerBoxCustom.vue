<template>
    <Datepicker v-model="newDate" auto-apply year-picker :style="{ height: $config_styles.HeightInput, width: width }"
        @update:modelValue="handleDate" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default defineComponent({
    props: {
        width: {
            default: "100%",
            type: String,
        },
        valueDate: {
            type: [Number, String],
        },
    },
    components: {
        Datepicker,
    },
    setup(props, { emit }) {
        let newDate = ref(props.valueDate)
        const handleDate = (val: any) => {
            emit("update:valueDate", val)
        }
        return {
            newDate,
            handleDate
        };
    },
});
</script> 
