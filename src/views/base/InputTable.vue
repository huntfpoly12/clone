<template>
  <div >
    <div v-show="isShowInput == false">
      <div @click="showInput(name)">
        <label >&nbsp;&nbsp;&nbsp;&nbsp;{{ $filters.formatCurrency(parseInt(valueInput)) }} </label>
      </div>
    </div>
    <input
      :name="name"
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
    name: {
      type: String,
      default: '',
    },
  },
  setup(props,{emit}) {
    const isShowInput = ref(false);
    const inputValue = ref(props.valueInput);
    const inputName = ref(props.name);
    const showInput = (e: any) => {
      isShowInput.value = true;
      setTimeout(() => {
        document.getElementsByName(e)[0].focus();
      }, 50);
    }
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

    watch(
      () => props.name,
      (newValue) => {
        inputName.value = newValue;
      }
    );

    return {
      isShowInput,
      inputValue,
      updateValue,
      showInput
    };
  },
});
</script>

<style lang="scss" scoped src="./styles/GridPrototype.scss"></style>
