<template>
  <div >
    <div v-show="isShowInput == false">
      <div @dblclick="isShowInput = true">
        <label >&nbsp;{{ $filters.formatCurrency(parseInt(valueInput)) }} </label>
      </div>
    </div>
    <input
      name="name"
      v-show="isShowInput == true"
      v-model="inputValue"
      v-on:blur="updateValue(inputValue)"
      
      style="width: 100px"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  props: {
    valueInput: {
      type: String,
      default: '',
    },
  },
  setup(props,{emit}) {
    const isShowInput = ref(false);
    const inputValue = ref(props.valueInput);
    const updateValue = (value: any) => {
      isShowInput.value = false;
      emit("update:valueInput", value);
    };

    watch(
      () => props.valueInput,
      (newValue) => {
        inputValue.value = newValue;
      }
    );

    return {
      isShowInput,
      inputValue,
      updateValue
    };
  },
});
</script>

<style lang="scss" scoped src="./styles/GridPrototype.scss"></style>
