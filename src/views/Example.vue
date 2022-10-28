<template>
  <div style="padding: 50px">
    
    <div class="form">
      <div class="dx-fieldset">
        <div class="dx-field">
          <div class="dx-field-label">Default mode</div>
          <div class="dx-field-value">
            <DevTextBoxVue width="500px"></DevTextBoxVue>
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">With placeholder</div>
          <div class="dx-field-value">
            <DevTextBoxVue width="500px" placeholder="This is placeholder"></DevTextBoxVue>
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Type Email</div>
          <div class="dx-field-value">
            <DevTextBoxVue width="500px" placeholder="This is placeholder" modeInput="email"></DevTextBoxVue>
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Type search</div>
          <div class="dx-field-value">
            <DevTextBoxVue width="500px" placeholder="This is placeholder" modeInput="search"></DevTextBoxVue>
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Type tel</div>
          <div class="dx-field-value">
            <DevTextBoxVue width="500px" placeholder="This is placeholder" modeInput="tel"></DevTextBoxVue>
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Type url</div>
          <div class="dx-field-value">
            <DevTextBoxVue width="500px" placeholder="This is placeholder" modeInput="url"></DevTextBoxVue>
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">With clear button</div>
          <div class="dx-field-value">
            <DevTextBoxVue width="500px" placeholder="This is placeholder" :clearButton="true" :valueInput="text1"></DevTextBoxVue>
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Password mode</div>
          <div class="dx-field-value">
            <DevTextBoxVue width="500px" placeholder="This is placeholder" :clearButton="true" :valueInput="text1" modeInput="password"></DevTextBoxVue>
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Text mask</div>
          <div class="dx-field-value">
            <DevTextBoxVue width="500px" placeholder="This is placeholder" :clearButton="true" :valueInput="text1"  validateType="birthDay"></DevTextBoxVue>
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Disabled</div>
          <div class="dx-field-value">
            <DevTextBoxVue width="500px" placeholder="This is placeholder" :clearButton="true" :valueInput="text1" :disabled="true"></DevTextBoxVue>
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">Read Only</div>
          <div class="dx-field-value">
            <DevTextBoxVue width="500px" placeholder="This is placeholder" :clearButton="true" :valueInput="text1" :readOnly="true"></DevTextBoxVue>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DevTextBoxVue from "../components/DevTextBox.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    DevTextBoxVue,
  },
  setup() {
    const text1 = ref("text example.....");
    return {
      text1,
    };
  },
});
</script>

<style></style>
