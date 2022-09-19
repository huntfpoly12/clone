<template>
    <input ref="inputRef" class="inputNumber" type="text" style="width: 120px"/>
</template>
  
<script>
import { useCurrencyInput } from "vue-currency-input";
import { watchDebounced } from "@vueuse/core";

export default {
    name: "DebouncedCurrencyInput",
    props: {
        modelValue: Number,
        options: Object,
    },
    setup(props, { emit }) {
        const { inputRef, numberValue } = useCurrencyInput(props.options, false);
        watchDebounced(numberValue, (value) => emit("update:modelValue", value), {
            debounce: 1000,
        });
        return { inputRef };
    },
};
</script>

<style lang="scss" scoped>
.inputNumber {
    border: 1px solid #d9d9d9;
    padding: 4px 10px;
}

.inputNumber:focus-visible {
    outline: 1px solid #40a9ff;
    border-color: #40a9ff;
    border-radius: 1px; 
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
    border-right-width: 1px !important;
    outline: 0;
}
</style>