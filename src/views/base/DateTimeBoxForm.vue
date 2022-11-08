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
            <div class="dx-field-label">Rank date time box</div>
            <div class="dx-field-value">
              <rank-date-time-box>
                width="300px" dateFormat="YYYY-MM-DD" ></rank-date-time-box
              >
            </div>
          </div>
        </td>
        <td>
          <ul>
            <li>
              <strong>dateFormat:</strong> { default: "YYYY-MM-DD", type:
              String,} (option)
            </li>
            <li>
              <strong>width:</strong> {default: "100%", type: String, } (option)
            </li>
            <li>
              <strong>valueDate:</strong> { type: String, default: nowDate,}
            </li>
            <li><strong>id:</strong> { type: String, default: "",}</li>
            <li><strong>className:</strong>{type: String,} (option)</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
              &lt; rank-date-time-box width="300px" dateFormat="YYYY-MM-DD" / &gt;
            </pre
          >
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">Date time box</div>
            <div class="dx-field-value">
              <date-time-box
                width="300px"
                dateFormat="YYYY-MM-DD"
              ></date-time-box>
            </div>
          </div>
        </td>
        <td>
          <ul>
            <li>
              <strong>dateFormat:</strong> { default: "YYYY-MM-DD", type:
              String,} (option)
            </li>
            <li>
              <strong>width:</strong> {default: "100%", type: String, } (option)
            </li>
            <li>
              <strong>valueDate:</strong> { type: String, default: nowDate,}
            </li>
            <li><strong>id:</strong> { type: String, default: "",}</li>
            <li><strong>className:</strong>{type: String,} (option)</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
              &lt; date-time-box width="300px" dateFormat="YYYY-MM-DD" / &gt;
            </pre
          >
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">Month picker box</div>
            <div class="dx-field-value">
              <month-picker-box width="300px"></month-picker-box>
            </div>
          </div>
        </td>
        <td>
          <ul>
            <li>
              <strong>width:</strong> {default: "100%", type: String, } (option)
            </li>
            <li>
              <strong>valueDate:</strong> { type: String, default: nowDate,}
            </li>
            <li><strong>id:</strong> { type: String, default: "",}</li>
            <li><strong>className:</strong>{type: String,} (option)</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
              &lt; month-picker-box width="300px"  / &gt;
            </pre
          >
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">Year picker box</div>
            <div class="dx-field-value">
              <year-picker-box width="300px"></year-picker-box>
            </div>
          </div>
        </td>
        <td>
          <ul>
            <li>
              <strong>width:</strong> {default: "100%", type: String, } (option)
            </li>
            <li>
              <strong>valueDate:</strong> { type: String, default: nowDate,}
            </li>
            <li><strong>id:</strong> { type: String, default: "",}</li>
            <li><strong>className:</strong>{type: String,} (option)</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
              &lt; year-picker-box width="300px"  / &gt;
            </pre
          >
        </td>
      </tr>
      <tr>
        <td>
          <div class="dx-field">
            <div class="dx-field-label">Birth day box</div>
            <div class="dx-field-value">
              <birth-day-box
                width="300px"
                :required="true"
                label="Birth day box"
              ></birth-day-box>
            </div>
          </div>
        </td>
        <td>
          <ul>
            <li>
              <strong>label:</strong> label: {type: String,required: true}
              (required)
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
            <li><strong>valueInput:</strong> {type: String,default: "",}</li>
            <li><strong>readOnly:</strong> Boolean (option)</li>
          </ul>
        </td>
        <td>
          <pre class="mycode">
              &lt; birth-day-box width="300px" :required="true" / &gt;
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
    DxButton,
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
    function onFormSubmit(e) {}

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
