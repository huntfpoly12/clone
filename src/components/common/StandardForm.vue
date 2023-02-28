<template>
  <form :action="formAction" :name="formName">
    <DxValidationGroup :name="formName"  ref="textBoxRefKey"> 
        <slot></slot>
    </DxValidationGroup>
  </form>
</template>
<script lang="ts">
import { computed, defineComponent,ref, watch} from "vue";
import DxValidationGroup from "devextreme-vue/validation-group";
export default defineComponent({
  props: {
    formName: {
      type: String,
    },
    formAction: {
      type: String,
      default: '',
    }
  },
  components: {
    DxValidationGroup,
  },

  setup() {
    let textBoxRefKey: any = ref(null);
    const $this = computed(()=> textBoxRefKey.value);
    const resetValidate = ()=>{
      $this.value?.instance.reset();
    }
    const validate = () => {
      return $this.value?.instance.validate();
    }
    // test 
    // watch(textBoxRefKey, (newValue, oldValue) => {
    //   if (newValue !== null) {
    //     console.log("Text box reference set to:", textBoxRefKey.value);
    //   }
    // });
    return{
      resetValidate,
      validate,
      textBoxRefKey
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
