<template>
  <div>
    <dx-form :formData="formData" :validation-group="validationGroup">
      <dx-form-item
        v-for="item in formItems"
        :key="item.dataField"
        :data-field="item.dataField"
        :label="item.label"
      >
      </dx-form-item>
    </dx-form>
    <dx-validation-summary
      v-if="showValidationSummary"
      :validation-group="validationGroup"
      :item-template="itemTemplate"/>
  </div>
</template>

<script>
import { ref, watchEffect, computed, defineComponent } from 'vue';
import { DxForm, DxFormItem, DxValidationSummary } from 'devextreme-vue';

export default defineComponent({
  name: 'FormWrapper',
  components: {
    DxForm,
    DxFormItem,
    DxValidationSummary,
  },
  props: {
    formData: {
      type: Object,
      default: () => ({}),
    },
    formItems: {
      type: Array,
      default: () => [],
    },
    showValidationSummary: {
      type: Boolean,
      default: true,
    },
    validationGroup: {
      type: String,
      default: 'form',
    },
    itemTemplate: Function,
  },
  setup(props) {
    const validationRules = ref([]);

    function addRule(rule) {
      validationRules.value.push(rule);
      console.log(props.$refs)
      // props.$refs.form.instance.validate();
    }

    function removeRule(rule) {
      const index = validationRules.value.indexOf(rule);
      if (index !== -1) {
        validationRules.value.splice(index, 1);
        // props.$refs.form.instance.validate();
      }
    }

    watchEffect(() => {
      // props.$refs.form.instance.option('validationRules', validationRules.value);
    });

    const validationRulesComputed = computed(() => validationRules.value);

    return {
      validationRules,
      addRule,
      removeRule,
      validationRulesComputed,
    };
  },
  mounted() {
    console.log(this.$refs)
    // this.$refs.form.instance.validate();
  },
});
</script>
