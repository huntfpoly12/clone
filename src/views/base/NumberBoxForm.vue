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
              <div class="dx-field-label">Number box</div>
              <div class="dx-field-value">
                <number-box
                  width="150px"
                  :required="true"
                  placeholder="Number box"
                  :min="5"
                  :max="50"
                  :spinButtons="true"
                ></number-box>
              </div>
            </div>
          </td>
          <td>
            <ul>
              <li>
              <strong>label:</strong> label: {type: String,required: true} (required)
            </li>
              <li>
                <strong>required:</strong> {type: Boolean,default: false,}
                (option)
              </li>
              <li>
                <strong>messRequired:</strong> { type: String, default: "Input is
                required!",} (option)
              </li>
              <li><strong>width:</strong> String (option)</li>
              <li><strong>spinButtons:</strong> Boolean (option)</li>
              <li><strong>maxCharacter:</strong> Number (option)</li>
              <li>
                <strong>minCharacter:</strong> { type: Number,default: 0,}
                (option)
              </li>
              <li><strong>min:</strong> Number (option)</li>
              <li><strong>max:</strong> Number (option)</li>
              <li><strong>rtlEnabled:</strong> {type: Boolean,default: false,},</li>
              <li><strong>clearButton:</strong> Boolean (option)</li>
              <li><strong>disabled:</strong> Boolean (option)</li>
              <li><strong>valueInput:</strong> {type: [String, Number],default: "",}</li>
              <li><strong>placeholder:</strong> String (option)</li>
              <li><strong>readOnly:</strong> Boolean (option)</li>
              <li><strong>mode:</strong> String (option)</li>
            </ul>
          </td>
          <td>
            <pre class="mycode">
              &lt; number-box width="150px" width="150px"
                  :required="true"
                  placeholder="Number box"
                  :min="5"
                  :max="50"
                  :spinButtons="true"" &gt;&lt;/ number-box &gt;
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
  import DxButton from "devextreme-vue/button";
  
  export default defineComponent({
    components: {
      DxButton
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
      const text1 = ref("text example.....");
      function submit() {
        this.$refs["formTest"].onsubmit = onFormSubmit();
      }
      function onFormSubmit(e) {
      }
  
      return {
        text1,
        bday,
        submit,
        onFormSubmit,
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
  