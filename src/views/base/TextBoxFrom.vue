<template>
  <div style="padding: 10px">
    <a-row :gutter="[0, 4]">
      <a-col :span="14">
        <form ref="formTest" action="your-action">
          <div class="form">
            <div class="dx-fieldset">
              <div class="dx-field">
                <div class="dx-field-label">Month Picker</div>
                <div class="dx-field-value">
                  <MonthPickerBox width="300px"></MonthPickerBox>
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Year Picker</div>
                <div class="dx-field-value">
                  <YearPickerBox width="300px"></YearPickerBox>
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Text Box</div>
                <div class="dx-field-value">
                  <default-text-box />
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Text number box</div>
                <div class="dx-field-value">
                  <text-number-box :required="true" />
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Sale status select box</div>
                <div class="dx-field-value">
                  <sale-status-select-box :required="true" placeholder="전체" />
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Sale grade select box</div>
                <div class="dx-field-value">
                  <sale-grade-select-box
                    width="120px"
                    :required="true"
                    placeholder="전체"
                  />
                </div>
              </div>
            </div>
          </div>
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
      
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import notify from "devextreme/ui/notify";
import DxValidationSummary from "devextreme-vue/validation-summary";
import DxButton from "devextreme-vue/button";

export default defineComponent({
  components: {
    DxButton,
    DxValidationSummary,
  },
  mounted() {
    
  },
  setup() {
    
    const bday = ref("");
    const text1 = ref("text example.....");
    function  submit(){
      console.log('ffffff');
      this.$refs['formTest'].onsubmit = onFormSubmit()
    }
    function onFormSubmit(e) {
      
      console.log('sdfsdfsdfsdfsdf');
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
