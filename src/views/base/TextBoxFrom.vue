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
              <p><strong>validator </strong>: Allow validate input or not?</p>
              <ul>
                <li>Type : Boolean</li>
                <li>Default : false</li>
              </ul>
            </li>
            <li>
              <p><strong>validateType</strong> : select the validation type from the following validation types ( <i>"bisinessId", "corperateId", "personalId", "email", "telNo", "birthDay"</i>) ( <i>this prop needs
                validator = true </i>)</p>
              <ul>
                <li>Type : String</li>
                <li>Default : ""</li>
              </ul>
            </li>
            <li>
              <p>
                <strong>required</strong> : Requires a value to be entered ( <i>this prop needs
                validator = true </i>)
              </p>
              <ul>
                <li>Type : Boolean</li>
                <li>Default : false</li>
              </ul>
            </li>
            <li>
              <p>
                <strong>maxCharacter</strong> : Maximum number of characters that can be input
              </p>
              <ul>
                <li>Type : Number</li>
              </ul>
            </li>
            <li>
              <p>
                <strong>minCharacter</strong> : Minimum number of characters that can be input
              </p>
              <ul>
                <li>Type : Number</li>
                <li>Default : 0</li>
              </ul>
            </li>
            <li>
              <p><strong>disabled</strong> : disable input</p>
              <ul>
                <li>Type : Boolean</li>
                <li>Default : false</li>
              </ul>
            </li>
            <li>
              <p><strong>clearButton</strong> : Hide or show clear button</p>
              <ul>
                <li>Type : Boolean</li>
                <li>Default : false</li>
              </ul>
            </li>
            <li>
              <p>
                <strong>valueInput</strong> : Transmit and get data from input (use v-model for
                bidirectional data transfer and retrieval)
              </p>
              <ul>
                <li>Type : String</li>
                <li>Default : ""</li>
              </ul>
            </li>
            <li>
              <p><strong>placeholder</strong> : Set placeholder</p>
              <ul>
                <li>Type : String</li>
                <li>Default : ""</li>
              </ul>
            </li>
            <li>
              <p><strong>readOnly</strong> : Set read-only state for input</p>
              <ul>
                <li>Type : Boolean</li>
                <li>Default : false</li>
              </ul>
            </li>
            <li>
              <p><strong>modeInput</strong> : Select the input type to use from the following values (<i>"email", "password", "search", "text", "url"</i>)</p>
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
