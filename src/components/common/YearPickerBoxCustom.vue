<template>
    <div class="month-custom-1 d-flex-center">
        <span class="mr-5">{{ text }}</span>
        <Datepicker v-model="newDate" auto-apply year-picker
            :style="{ height: $config_styles.HeightInput, width: width }" @update:modelValue="handleDate" />
    </div>
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
        text: {
            type: String,
            default: "귀",
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
