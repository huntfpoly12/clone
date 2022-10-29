<template>
  <div style="padding: 10px">
    <a-row :gutter="[0, 4]">
      <a-col :span="14">
        <form action="your-action" @submit.prevent="onFormSubmit($event)">
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
                  <DevTextBoxVue
                    width="500px"
                    placeholder="This is placeholder"
                    :validator="true"
                    :required="true"
                  ></DevTextBoxVue>
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Type Email</div>
                <div class="dx-field-value">
                  <DevTextBoxVue
                    width="500px"
                    placeholder="This is placeholder"
                    modeInput="email"
                    :validator="true"
                    :required="true"
                  ></DevTextBoxVue>
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Type search</div>
                <div class="dx-field-value">
                  <DevTextBoxVue
                    width="500px"
                    placeholder="This is placeholder"
                    modeInput="search"
                  ></DevTextBoxVue>
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Type tel</div>
                <div class="dx-field-value">
                  <DevTextBoxVue
                    width="500px"
                    placeholder="This is placeholder"
                    :clearButton="true"
                    :validator="true"
                    :required="true"
                    validateType="telNo"
                  ></DevTextBoxVue>
                </div>
              </div>

              <div class="dx-field">
                <div class="dx-field-label">With clear button</div>
                <div class="dx-field-value">
                  <DevTextBoxVue
                    width="500px"
                    placeholder="This is placeholder"
                    :clearButton="true"
                    :valueInput="text1"
                  ></DevTextBoxVue>
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Password mode</div>
                <div class="dx-field-value">
                  <DevTextBoxVue
                    width="500px"
                    placeholder="This is placeholder"
                    :clearButton="true"
                    :valueInput="text1"
                    modeInput="password"
                  ></DevTextBoxVue>
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Text mask</div>
                <div class="dx-field-value">
                  <DevTextBoxVue
                    width="500px"
                    placeholder="This is placeholder"
                    :clearButton="true"
                    :validator="true"
                    :required="true"
                    validateType="telNo"
                  ></DevTextBoxVue>
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Disabled</div>
                <div class="dx-field-value">
                  <DevTextBoxVue
                    width="500px"
                    placeholder="This is placeholder"
                    :clearButton="true"
                    :valueInput="text1"
                    :disabled="true"
                  ></DevTextBoxVue>
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Read Only</div>
                <div class="dx-field-value">
                  <DevTextBoxVue
                    width="500px"
                    placeholder="This is placeholder"
                    :clearButton="true"
                    :valueInput="text1"
                    :readOnly="true"
                  ></DevTextBoxVue>
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Birth Day</div>
                <div class="dx-field-value">
                  <DevTextBoxVue
                    width="500px"
                    placeholder="This is placeholder"
                    :clearButton="true"
                    :validator="true"
                    :required="true"
                    v-model:valueInput="bday"
                    validateType="birthDay"
                  ></DevTextBoxVue>
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Min Character</div>
                <div class="dx-field-value">
                  <DevTextBoxVue
                    width="500px"
                    placeholder="This is placeholder"
                    :clearButton="true"
                    :validator="true"
                    :required="true"
                    :minCharacter="10"
                  ></DevTextBoxVue>
                </div>
              </div>
              <div class="dx-fieldset">
                <DxButton
                  id="button"
                  :use-submit-behavior="true"
                  text="Register"
                  type="success"
                />
              </div>
            </div>
          </div>
        </form>
      </a-col>
      <a-col :span="10">
        <div>
          <p><strong> List Props Text Box:</strong></p>
          <ol>
            <li>
              <p>validator : Allow validate input or not?</p>
              <ul>
                <li>Type : Boolean</li>
                <li>Default : false</li>
              </ul>
            </li>
            <li>
              <p>validateType : select the validation type from the following validation types ("bisinessId", "corperateId", "personalId", "email", "telNo", "birthDay") ( this prop needs
                validator = true )</p>
              <ul>
                <li>Type : String</li>
                <li>Default : ""</li>
              </ul>
            </li>
            <li>
              <p>
                required : Requires a value to be entered ( this prop needs
                validator = true )
              </p>
              <ul>
                <li>Type : Boolean</li>
                <li>Default : false</li>
              </ul>
            </li>
            <li>
              <p>
                maxCharacter : Maximum number of characters that can be input
              </p>
              <ul>
                <li>Type : Number</li>
              </ul>
            </li>
            <li>
              <p>
                minCharacter : Minimum number of characters that can be input
              </p>
              <ul>
                <li>Type : Number</li>
                <li>Default : 0</li>
              </ul>
            </li>
            <li>
              <p>disabled : disable input</p>
              <ul>
                <li>Type : Boolean</li>
                <li>Default : false</li>
              </ul>
            </li>
            <li>
              <p>clearButton : Hide or show clear button</p>
              <ul>
                <li>Type : Boolean</li>
                <li>Default : false</li>
              </ul>
            </li>
            <li>
              <p>
                valueInput : Transmit and get data from input (use v-model for
                bidirectional data transfer and retrieval)
              </p>
              <ul>
                <li>Type : String</li>
                <li>Default : ""</li>
              </ul>
            </li>
            <li>
              <p>placeholder : Set placeholder</p>
              <ul>
                <li>Type : String</li>
                <li>Default : ""</li>
              </ul>
            </li>
            <li>
              <p>readOnly : Set read-only state for input</p>
              <ul>
                <li>Type : Boolean</li>
                <li>Default : false</li>
              </ul>
            </li>
            <li>
              <p>modeInput : Select the input type to use from the following values ("email", "password", "search", "text", "url")</p>
              <ul>
                <li>Type : String</li>
                <li>Default : "text"</li>
              </ul>
            </li>
          </ol>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import DxValidationSummary from "devextreme-vue/validation-summary";
import DxButton from "devextreme-vue/button";
import DevTextBoxVue from "../../components/DevTextBox.vue";
import { defineComponent, ref } from "vue";
import notify from "devextreme/ui/notify";
export default defineComponent({
  components: {
    DevTextBoxVue,
    DxButton,
    DxValidationSummary,
  },
  setup() {
    const bday = ref("");
    const text1 = ref("text example.....");
    function onFormSubmit(e) {
      console.log("dsdfsfsdf");
      notify(
        {
          message: "You have submitted the form",
          position: {
            my: "center top",
            at: "center top",
          },
        },
        "success",
        3000
      );

      e.preventDefault();
    }

    return {
      text1,
      bday,
      onFormSubmit,
    };
  },
});
</script>
