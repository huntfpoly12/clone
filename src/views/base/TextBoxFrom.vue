<template>
  <form ref="formTest" action="your-action">
    <table id="customers">
      <tr>
        <th style="width: 550px">Example</th>
        <th style="width: 550px">Props</th>
        <th>Code Example</th>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">character cleanup</div>
            <div class="dx-field-value">
              <DxTextBox width="250px" value-change-event="input" :show-clear-button="clearButton" mode="text"
                 v-model:value="textclear" >
              </DxTextBox> <button @click="makeCleanText">Clean text</button>
            </div>
            <div class="dx-field-value">
              <textarea name="" id="" cols="30" rows="3" >{{ textclean }}</textarea>
            </div>
          </div>
        </td>
        <td>
          
        </td>
        <td>
         
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">Default text box</div>
            <div class="dx-field-value">
              <default-text-box
                width="150px"
                :required="true"
                placeholder="Default text box"
                :minCharacter="3"
              ></default-text-box>
            </div>
          </div>
        </td>
        <td>
          <ul>
            <li>
              <strong>required:</strong> {type: Boolean,default: false,}
              (option)
            </li>
            <li>
              <strong>messRequired:</strong> { type: String, default: "Input is
              required!",} (option)
            </li>
            <li><strong>width:</strong> String (option)</li>
            <li><strong>maxCharacter:</strong> Number (option)</li>
            <li>
              <strong>minCharacter:</strong> { type: Number,default: 0,}
              (option)
            </li>
            <li><strong>clearButton:</strong> Boolean (option)</li>
            <li><strong>disabled:</strong> Boolean (option)</li>
            <li><strong>valueInput:</strong> {type: String,default: "",}</li>
            <li><strong>placeholder:</strong> String (option)</li>
            <li><strong>readOnly:</strong> Boolean (option)</li>
            <li><strong>select:</strong> {type: Boolean,default: true}</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
            &lt; default-text-box width="150px" :required="true" &gt;&lt;/ default-text-box &gt;
          </pre>
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">Text number box</div>
            <div class="dx-field-value">
              <text-number-box
                width="150px"
                :required="true"
                placeholder="Text number box"
              ></text-number-box>
            </div>
          </div>
        </td>
        <td>
          <ul>
            <li>
              <strong>required:</strong> {type: Boolean,default: false,}
              (option)
            </li>
            <li>
              <strong>messRequired:</strong> { type: String, default: "Input is
              required!",} (option)
            </li>
            <li><strong>width:</strong> String (option)</li>
            <li><strong>clearButton:</strong> Boolean (option)</li>
            <li><strong>disabled:</strong> Boolean (option)</li>
            <li><strong>valueInput:</strong> {type: String,default: "",}</li>
            <li><strong>placeholder:</strong> String (option)</li>
            <li><strong>readOnly:</strong> Boolean (option)</li>
            <li><strong>select:</strong> {type: Boolean,default: true}</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
            &lt; text-number-box width="150px" :required="true" &gt;&lt;/ text-number-box &gt;
          </pre>
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">Mail text box</div>
            <div class="dx-field-value">
              <mail-text-box
                width="150px"
                :required="true"
                placeholder="Mail text box"
              ></mail-text-box>
            </div>
          </div>
        </td>
        <td>
          <ul>
            <li>
              <strong>required:</strong> {type: Boolean,default: false,}
              (option)
            </li>
            <li>
              <strong>messRequired:</strong> { type: String, default: "Input is
              required!",} (option)
            </li>
            <li><strong>width:</strong> String (option)</li>
            <li><strong>clearButton:</strong> Boolean (option)</li>
            <li><strong>disabled:</strong> Boolean (option)</li>
            <li><strong>valueInput:</strong> {type: String,default: "",}</li>
            <li><strong>placeholder:</strong> String (option)</li>
            <li><strong>readOnly:</strong> Boolean (option)</li>
            <li><strong>select:</strong> {type: Boolean,default: true}</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
            &lt; mail-text-box width="150px" :required="true" &gt;&lt;/ mail-text-box &gt;
          </pre>
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">Id Number text box</div>
            <div class="dx-field-value">
              <id-number-text-box :required="true" />
            </div>
          </div>
        </td>
        <td>
          <ul>
            <li>
              <strong>required:</strong> {type: Boolean,default: false,}
              (option)
            </li>
            <li>
              <strong>messRequired:</strong> { type: String, default: "Input is
              required!",} (option)
            </li>
            <li><strong>width:</strong> String (option)</li>
            <li><strong>clearButton:</strong> Boolean (option)</li>
            <li><strong>disabled:</strong> Boolean (option)</li>
            <li><strong>valueInput:</strong> {type: String,default: "",}</li>
            <li><strong>readOnly:</strong> Boolean (option)</li>
            <li><strong>select:</strong> {type: Boolean,default: true}</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
            &lt; id-number-text-box width="150px" :required="true" &gt;&lt;/ id-number-text-box &gt;
          </pre>
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">
              Telephone Text Box
            </div>
            <div class="dx-field-value">
              <tel-text-box :required="true" placeholder="Telephone Text Box"/>
            </div>
          </div>
        </td>
        <td>
          <ul>
            <li>
              <strong>required:</strong> {type: Boolean,default: false,}
              (option)
            </li>
            <li>
              <strong>messRequired:</strong> { type: String, default: "Input is
              required!",} (option)
            </li>
            <li><strong>width:</strong> String (option)</li>
            <li><strong>clearButton:</strong> Boolean (option)</li>
            <li><strong>disabled:</strong> Boolean (option)</li>
            <li><strong>valueInput:</strong> {type: String,default: "",}</li>
            <li><strong>placeholder:</strong> String (option)</li>
            <li><strong>readOnly:</strong> Boolean (option)</li>
            <li><strong>select:</strong> {type: Boolean,default: true}</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
            &lt; tel-text-box width="150px" :required="true" /&gt;
          </pre>
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">
              Biz number text box
            </div>
            <div class="dx-field-value">
              <biz-number-text-box :required="true" />
            </div>
          </div>
        </td>
        <td>
          <ul>
            <li>
              <strong>required:</strong> {type: Boolean,default: false,}
              (option)
            </li>
            <li>
              <strong>messRequired:</strong> { type: String, default: "Input is
              required!",} (option)
            </li>
            <li><strong>width:</strong> String (option)</li>
            <li><strong>clearButton:</strong> Boolean (option)</li>
            <li><strong>disabled:</strong> Boolean (option)</li>
            <li><strong>valueInput:</strong> {type: String,default: "",}</li>
            <li><strong>readOnly:</strong> Boolean (option)</li>
            <li><strong>select:</strong> {type: Boolean,default: true}</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
            &lt; biz-number-text-box width="150px" :required="true" /&gt;
          </pre>
        </td>
      </tr>
    </table>
    <div class="dx-fieldset">
      <DxButton
        id="button"
        :use-submit-behavior="true"
        text="Register"
        type="success"
        @click="submit()"
      />
    </div>
  </form>
</template>

<script>
import { defineComponent, ref } from "vue";
import notify from "devextreme/ui/notify";
import DxValidationSummary from "devextreme-vue/validation-summary";
import DxButton from "devextreme-vue/button";
import DxTextBox from "devextreme-vue/text-box";
export default defineComponent({
  components: {
    DxButton,
    DxValidationSummary,DxTextBox
  },
  data() {
    return {
      styles: {
        main: this.$config_styles.Main,
      },
    };
  },
  setup() {
    const bday = ref("");
    const textclean = ref("");
    const textclear = ref("( 급여 100000 *30명 ) * 12Month + 고정비 3000000");
    const text1 = ref("text example.....");
    function submit() {
      this.$refs["formTest"].onsubmit = onFormSubmit();
    }
    function onFormSubmit(e) {

    }

    const makeCleanText = (e) => {
      e.preventDefault();  
      console.log(textclear.value);
      textclean.value = textclear.value.replace(/[^\d+\-*/().]/g, "");
    }
    return {
      text1,
      bday,
      submit,
      onFormSubmit,textclear,textclean,makeCleanText
    };
  },
});
</script>
<style scoped lang="scss">
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: v-bind("styles.main");
  color: white;
}

.mycode {
  display: block;
  padding: 3px 3px 2px;
  font-size: 14px;
  line-height: 20px;
  width: 100%;
  background-color: #333;
  font-family: arial;
  color: #f7f7f7;
  font-weight: bold;
}
</style>
