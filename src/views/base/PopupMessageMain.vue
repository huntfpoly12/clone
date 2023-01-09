<template>
    <div style="padding: 10px">
        <a-row>
            <a-col :span="2">
                <div>Modal Notification</div>
            </a-col>
            <a-col :span="8">
                <DxButton :width="100" text="info" type="normal" styling-mode="outlined" @click="openStatus('info')"
                    :okText="'확인'" />-
                <DxButton :width="100" text="success" type="success" styling-mode="outlined" :okText="'확인'"
                    @click="openStatus('success')" /> -
                <DxButton :width="100" text="error" type="danger" styling-mode="outlined" :okText="'확인'"
                    @click="openStatus('error')" /> -
                <DxButton :width="100" text="warning" type="default" styling-mode="outlined" :okText="'확인'"
                    @click="openStatus('warning')" />
            </a-col>
            <a-col :span="8">
                <b> typeModal</b> : info/success/error/warning <br>
                <b> title</b> : Title notification <br>
                <b> content</b> : content notification<br>
                <b> okText</b> : Text button comfirm
            </a-col>
            <a-col :span="6">
                <b> Return</b> : Status modal = false<br>
            </a-col>
        </a-row>
        <a-row style="margin-top: 20px;">
            <a-col :span="2">
                <div>Modal Accept</div>
            </a-col>
            <a-col :span="8">
                <DxButton :width="150" text="Accept Input" type="success" styling-mode="outlined"
                    @click="openStatus('acceptInput')" />
            <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" :typeModal="typeModal"
                    :title="'Title Notification'" :content="'Content notification'" :keyAccept="'1234'" :okText="'확인'"
                    @checkConfirm="statusComfirm" />
            </a-col>
            <a-col :span="8">
                <b> typeModal</b> : acceptInput <br>
                <b> keyAccept</b> : Key needs to be confirmed when the user enters data <br>
                <b> title</b> : Title notification <br>
                <b> content</b> : content notification<br>
                <b> okText</b> : Text button comfirm
            </a-col>
            <a-col :span="6">
                <b> Return</b> :
                <br> Status modal = false ,
                <br> checkConfirm : true / false<br>
            </a-col>
        </a-row>
        <a-row style="margin-top: 20px;">
            <a-col :span="2">
                <div>Modal Comfirm</div>
            </a-col>
            <a-col :span="8">
                <DxButton :width="150" text="Comfirm" type="danger" styling-mode="outlined"
                    @click="openStatus('confirm')" />
                <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" :typeModal="typeModal"
                    title="Title Notification" content="Content notification" okText="확인" cancelText="DDes"
                    @checkConfirm="statusComfirm" />
            </a-col>
            <a-col :span="8">
                <b> typeModal</b> : confirm <br> 
                <b> title</b> : Title notification <br>
                <b> content</b> : content notification<br>
                <b> okText</b> : Text button comfirm
            </a-col>
            <a-col :span="6">
                <b> Return</b> :
                <br> Status modal = false ,
                <br> checkConfirm : true / false<br>
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

        const statusComfirm = (val) => { 
            
        }

        return {
            statusComfirm,
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