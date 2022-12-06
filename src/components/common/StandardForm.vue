<template>
  <form :action="formAction" :name="formName">
    <DxValidationGroup :name="formName"  ref="textBoxRefKey"> 
        <slot></slot>
    </DxValidationGroup>
  </form>
</template>
<script lang="ts">
import { computed, defineComponent,ref} from "vue";
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
    return{
      resetValidate,
      textBoxRefKey
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
