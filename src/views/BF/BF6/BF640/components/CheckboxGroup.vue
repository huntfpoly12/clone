<template>
  <div v-for="option in options" :key="option.id" class="check-box-group">
    <DxCheckBox :disabled="disabled" :value="valueCheckbox.includes(option.id)" @valueChanged="onValueChanged($event, option.id)" :icon-size="size" :text="option.text"> </DxCheckBox>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue';
import DxCheckBox from 'devextreme-vue/check-box';

export default defineComponent({
  props: {
    valueCheckbox: {
      type: Array,
      required: true,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    size: {
      type: String,
      default: '12',
    },
    label: String,
    options: {
      type: Object,
      default: () => [],
    },
  },
  components: {
    DxCheckBox,
  },

  setup(props, { emit }) {
    const app: any = getCurrentInstance();
    const styleCheckBox = app.appContext.config.globalProperties.$config_styles;
    const valueChecked = ref(props.valueCheckbox);
    const onValueChanged = (e: any, id: Number) => {
      let valueCheck: any = [];
      valueCheck = valueCheck.concat(props.valueCheckbox.filter((item) => valueCheck.indexOf(item) < 0));
      //   let valueCheck: any = [...props.valueCheckbox];
      if (e.value) {
        if (valueCheck.indexOf(id) > -1) {
          return;
        }
        valueCheck.push(id);
      } else {
        valueCheck.splice(valueCheck.indexOf(id), 1);
      }
      emit('update:valueCheckbox', valueCheck);
    };
    return {
      styleCheckBox,
      onValueChanged,
      valueChecked,
    };
  },
});
</script>

<style lang="scss">
:deep .dx-checkbox-text {
  margin-left: 10px;
  background-color: #93cddd;
  border-radius: 5px;
  color: white;
  text-align: center;
  width: 90px;
}
.check-box-group {
  :deep .dx-checkbox-container {
    margin-left: 10px;
    .dx-checkbox-text {
      margin-left: 10px;
      background-color: #93cddd;
      border-radius: 5px;
      color: white;
      text-align: center;
      width: 90px;
    }
  }
}
</style>
