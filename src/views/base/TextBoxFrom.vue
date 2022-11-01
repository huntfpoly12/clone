<template>
  <div style="padding: 10px">
    <a-row :gutter="[0, 4]">
      <a-col :span="14">
        <form action="your-action" @submit.prevent="onFormSubmit($event)">
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
                  <YearPickerBox
                    width="300px"
                  ></YearPickerBox>
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Year Pfffficker</div>
                <div class="dx-field-value">
                  <default-text-box />
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Text number</div>
                <div class="dx-field-value">
                  <text-number-box :required="true"/>
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
    DxValidationSummary
    ,

  },
  setup() {
    const bday = ref("");
    const text1 = ref("text example.....");
    function onFormSubmit(e) {
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
