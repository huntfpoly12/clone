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
            <div class="dx-field-label">Bank select box</div>
            <div class="dx-field-value">
              <bank-select-box width="150px" :required="true"></bank-select-box>
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
            <li><strong>clearButton:</strong> Boolean (option)</li>
            <li><strong>disabled:</strong> Boolean (option)</li>
            <li>
              <strong>valueInput:</strong> {type: [String, Number],default: "",}
            </li>
            <li><strong>readOnly:</strong> Boolean (option)</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
                &lt; bank-select-box width="150px" :required="true" / &gt;
              </pre
          >
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">Biz type select box</div>
            <div class="dx-field-value">
              <biz-type-select-box
                width="150px"
                :required="true"
              ></biz-type-select-box>
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
            <li><strong>clearButton:</strong> Boolean (option)</li>
            <li><strong>disabled:</strong> Boolean (option)</li>
            <li>
              <strong>valueInput:</strong> {type: [String, Number],default: "",}
            </li>
            <li><strong>readOnly:</strong> Boolean (option)</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
                &lt; biz-type-select-box width="150px" :required="true" / &gt;
              </pre
          >
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">Sale grade select box</div>
            <div class="dx-field-value">
              <sale-grade-select-box
                width="150px"
                :required="true"
              ></sale-grade-select-box>
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
            <li><strong>clearButton:</strong> Boolean (option)</li>
            <li><strong>disabled:</strong> Boolean (option)</li>
            <li><strong>valueInput:</strong> {type: Number,}</li>
            <li><strong>readOnly:</strong> Boolean (option)</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
                &lt; sale-grade-select-box width="150px" :required="true" / &gt;
              </pre
          >
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">Sale status select box</div>
            <div class="dx-field-value">
              <sale-status-select-box
                width="150px"
                :confirmStatus="true"
              ></sale-status-select-box>
            </div>
          </div>
        </td>
        <td>
          <ul>
            <li><strong>width:</strong> String (option)</li>
            <li><strong>placeholder:</strong> String,</li>
            <li><strong>disabled:</strong> Boolean (option)</li>
            <li><strong>valueInput:</strong> {type: Number,}</li>
            <li><strong>readOnly:</strong> Boolean (option)</li>
            <li>
              <strong>confirmStatus:</strong> { type: Boolean,default: false,}
            </li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
                &lt; sale-status-select-box width="150px" :confirmStatus="true" / &gt;
              </pre
          >
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">List sale select box</div>
            <div class="dx-field-value">
              <list-sales-dropdown
                width="150px"
                :required="true"
              ></list-sales-dropdown>
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
            <li><strong>clearButton:</strong> Boolean (option)</li>
            <li><strong>disabled:</strong> Boolean (option)</li>
            <li><strong>valueInput:</strong> {type: Number,}</li>
            <li><strong>readOnly:</strong> Boolean (option)</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
                &lt; list-sales-dropdown width="150px" :required="true" / &gt;
              </pre
          >
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">List manager select box</div>
            <div class="dx-field-value">
              <list-manager-dropdown
                width="150px"
                :required="true"
              ></list-manager-dropdown>
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
            <li><strong>clearButton:</strong> Boolean (option)</li>
            <li><strong>disabled:</strong> Boolean (option)</li>
            <li><strong>valueInput:</strong> {type: Number,}</li>
            <li><strong>readOnly:</strong> Boolean (option)</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
                &lt; list-manager-dropdown width="150px" :required="true" / &gt;
              </pre
          >
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">List partner select box</div>
            <div class="dx-field-value">
              <list-partner
                width="150px"
                :required="true"
              ></list-partner>
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
            <li><strong>clearButton:</strong> Boolean (option)</li>
            <li><strong>disabled:</strong> Boolean (option)</li>
            <li><strong>valueInput:</strong> {type: Number,}</li>
            <li><strong>readOnly:</strong> Boolean (option)</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
                &lt; list-partner width="150px" :required="true" / &gt;
              </pre
          >
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">Service subscription application status</div>
            <div class="dx-field-value">
              <subs-req-status-select-box
                width="150px"
                :required="true"
              ></subs-req-status-select-box>
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
            <li><strong>clearButton:</strong> Boolean (option)</li>
            <li><strong>disabled:</strong> Boolean (option)</li>
            <li><strong>valueInput:</strong> {type: Number,}</li>
            <li><strong>readOnly:</strong> Boolean (option)</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
                &lt; subs-req-status-select-box width="150px" :required="true" / &gt;
              </pre
          >
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">Service subscription application status process bar</div>
            <div class="dx-field-value">
              Value return : {{saleStatus}}
             <subs-req-status-process-bar v-model:valueInput="saleStatus"></subs-req-status-process-bar>
            </div>
          </div>
        </td>
        <td>
          <ul>
            <li><strong>disabled:</strong> Boolean (option)</li>
            <li><strong>valueInput:</strong> {type: Number,}</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
                &lt; subs-req-status-select-box width="150px" :required="true" / &gt;
              </pre
          >
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
    const saleStatus = ref(10);
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
      saleStatus
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
