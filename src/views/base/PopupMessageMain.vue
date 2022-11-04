<template>
  <div style="padding: 10px">
    <a-row :gutter="[0, 4]">
      <a-col :span="4">
        <div>Modal Notification</div>
      </a-col>
      <a-col :span="8">
        <DxButton :width="100" text="info" type="normal" styling-mode="outlined" @click="openStatus('info')" /> -
        <DxButton :width="100" text="success" type="success" styling-mode="outlined" @click="openStatus('success')" /> -
        <DxButton :width="100" text="error" type="danger" styling-mode="outlined" @click="openStatus('error')" /> -
        <DxButton :width="100" text="warning" type="default" styling-mode="outlined" @click="openStatus('warning')" /> -
        <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" :typeModal="typeModal"
          :title="'Title Notification'" :content="'Content notification'" />
      </a-col>
      <a-col :span="6">
        <b> typeModal</b> : info/success/error/warning <br>
        <b> title</b> : Title notification <br>
        <b> content</b> : content notification
      </a-col>
      <a-col :span="6">
        <b> Return</b> : Status modal = false<br>

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
  setup() {

    const bday = ref("");
    const text1 = ref("text example.....");
    function submit() {
      console.log('ffffff');
      this.$refs['formTest'].onsubmit = onFormSubmit()
    }
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
    }

    const typeModal = ref()
    const modalStatus = ref(false)
    const openStatus = (type) => {
      modalStatus.value = true
      typeModal.value = type
    }

    return {
      typeModal,
      modalStatus,
      openStatus,
      text1,
      bday,
      submit,
      onFormSubmit,
    };
  },
});
</script>
<style scoped>
::v-deep .dx-field-value {
  display: flex;
}
</style>