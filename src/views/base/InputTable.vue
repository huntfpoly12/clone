<template>
    <input
      :name="name"
      v-model="inputValue"
      v-on:blur="updateValue(inputValue)"
      @keyup.enter="enterSubling(nextInput)"
      @input="onInput"
      style="text-align:right;"
    />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import filters from "@/helpers/filters";
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
    nextInput: {
      type: String,
      default: '',
    }
    
  },
  setup(props,{emit}) {
    const isShowInput = ref(false);
    const inputValue = ref(props.valueInput);
    const showInput = (nameInput: any) => {
      isShowInput.value = true;
      setTimeout(() => {
        document.getElementsByName(nameInput)[0].focus();
      }, 50);
    }

    const updateValue = (value: any) => {
      isShowInput.value = false;
      value.replaceAll(/\D/g, '')
      emit("update:valueInput", value);
    };

    const onInput = (event: any) => {
      inputValue.value = filters.formatCurrency(parseInt(event.target.value.replaceAll(/\D/g, '')));
    }

    const enterSubling = (nameIput  : any)=>{
      document.getElementsByName(nameIput)[0].focus();
    }
    watch(
      () => props.valueInput,
      (newValue) => {
        inputValue.value = newValue;
      }
    );


    return {
      isShowInput,
      inputValue,
      updateValue,
      showInput,
      enterSubling,
      onInput
    };
  },
});
</script>

<style lang="scss" scoped src="./styles/GridPrototype.scss"></style>
