<template>
    <input
      :name="name"
     
      v-model="inputValue"
      v-on:blur="updateValue(inputValue)"
      @keyup.enter="enterSubling($event)"
    />
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
    const showInput = (nameInput: any) => {
      isShowInput.value = true;
      setTimeout(() => {
        document.getElementsByName(nameInput)[0].focus();
      }, 50);
    }

    const updateValue = (value: any) => {
      isShowInput.value = false;
      emit("update:valueInput", value);
    };

    // const oneClick = (nameLabel: any) => {
    //   setTimeout(() => {
    //    const input = document.querySelector('.label-'+nameLabel) as HTMLInputElement;
    //     //input.select()
    //     console.log( input,'dgdfgdf',nameLabel);
        
    //   }, 50);
    // }

    const enterSubling = (event  : any)=>{
      document.getElementsByName('A02C01')[0].focus();
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
      //oneClick,
      enterSubling
    };
  },
});
</script>

<style lang="scss" scoped src="./styles/GridPrototype.scss"></style>
