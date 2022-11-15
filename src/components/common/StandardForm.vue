<template>
  <form :action="formAction" :name="formName">
    <DxValidationGroup :name="formName"> 
        <slot></slot>
    </DxValidationGroup>
  </form>
</template>
<script lang="ts">
import { defineComponent} from "vue";
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
  setup() {}
});
</script>

<style lang="scss" scoped>
</style>
