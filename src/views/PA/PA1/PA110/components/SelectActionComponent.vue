<template>

    <DxButton class="ml-3" @click="deleteItem">
        <img style="width: 17px;" src="@/assets/images/icon_delete.png" alt="">
    </DxButton>
    <DxButton class="ml-3" icon="plus" />
    <DxButton class="ml-3" icon="edit" @click="editItem" />

    <DxDropDownButton class="ml-3" :items="arrDropDownPayrollRegister" text="급여대장" @item-click="onItemClick"
        item-template="item-field">
        <template #item-field="{ data }">
            <div style="text-align: center;"><img :src="'../../../../../../src/assets/images/' + data.img" alt=""
                    style="width: 25px; height: 25px;" /></div>
        </template>
    </DxDropDownButton>
    <DxDropDownButton class="ml-3" :items="arrDropDownSalaryStatement" text="급여명세서" @item-click="onItemClick"
        item-template="item-field">
        <template #item-field="{ data }">
            <div style="text-align: center;"><img :src="'../../../../../../src/assets/images/' + data.img" alt=""
                    style="width: 25px; height: 25px;" /></div>
        </template>
    </DxDropDownButton>
    <DxDropDownButton class="ml-3" :items="arrDropDown" text="선택" style="width: 120px;" @item-click="onItemClick"
        item-template="item-field">
        <template #item-field="{ data }">
            <div style="text-align: center;">
                <HistoryOutlined v-if="data.function == 'History'" class="mr-5" style="font-size: 18px" />
                <div v-if="data.function == 'StatusHistory'" style="text-align: center;"><img
                        :src="'../../../../../../../src/assets/images/icon_status_history.png'" alt=""
                        style="width: 20px; height: 20px;" /></div>
                <button v-else-if="data.url" class="button-open-tab">일용직사원등록</button>
            </div>
        </template>
    </DxDropDownButton>

    <DeletePopup :modalStatus="modalDelete" @closePopup="modalDelete = false" :data="popupDataDelete" />
    <EditPopup :modalStatus="modalEdit" @closePopup="modalEdit = false" :data="popupDataEdit" />
    <PrintPayrollRegisterPopup :modalStatus="modalPrintPayrollRegister" @closePopup="modalPrintPayrollRegister = false"
        :data="popupDataPayrollRegister" />
    <PrintSalaryStatementPopup :modalStatus="modalPrintSalaryStatement" @closePopup="modalPrintSalaryStatement = false"
        :data="popupDataSalaryStatement" />
    <EmailMultiPopup :modalStatus="modalEmailMulti" @closePopup="modalEmailMulti = false" :data="popupDataEmailMulti" />
    <EmailSinglePayrollRegisterPopup :modalStatus="modalEmailSinglePayrollRegister"
        @closePopup="modalEmailSinglePayrollRegister = false" :data="popupDataEmailSinglePayrollRegister" />
    <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="modalEmailSingle = false"
        :data="popupDataEmailSingle" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" title="변경이력"
        typeHistory="pa-510" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" title="변경이력"
        typeHistory="pa-510" />
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "vue";
import DxButton from "devextreme-vue/button"
import DxDropDownButton from 'devextreme-vue/drop-down-button';
import PrintPayrollRegisterPopup from "./Popup/PrintPayrollRegisterPopup.vue"
import DeletePopup from "./Popup/DeletePopup.vue"
import EditPopup from "./Popup/EditPopup.vue"
import EmailSinglePayrollRegisterPopup from "./Popup/EmailSinglePayrollRegisterPopup.vue"
import EmailMultiPopup from "./Popup/EmailMultiPopup.vue"
import EmailSinglePopup from "./Popup/EmailSinglePopup.vue"
import PrintSalaryStatementPopup from "./Popup/PrintSalaryStatementPopup.vue"
import { HistoryOutlined } from "@ant-design/icons-vue"
export default defineComponent({
    components: {
        DxButton,
        DxDropDownButton,
        PrintPayrollRegisterPopup,
        PrintSalaryStatementPopup,
        DeletePopup,
        EditPopup,
        EmailSinglePayrollRegisterPopup,
        EmailMultiPopup,
        EmailSinglePopup,
        HistoryOutlined
    },
    props: {
        modalStatus: {
            type: Boolean
        },
    },
    setup(props, { emit }) {
        const modalPrintPayrollRegister = ref<boolean>(false)
        const modalPrintSalaryStatement = ref<boolean>(false)
        const modalDelete = ref<boolean>(false)
        const modalEdit = ref<boolean>(false)
        const modalHistoryStatus = ref<boolean>(false)
        const modalEmailSingle = ref(false)
        const modalEmailSinglePayrollRegister = ref(false)
        const modalEmailMulti = ref(false)
        const popupDataDelete = ref({})
        const popupDataEdit = ref({})
        const popupDataPayrollRegister = ref({})
        const popupDataSalaryStatement = ref({})

        const popupDataEmailSingle = ref({})
        const popupDataEmailSinglePayrollRegister = ref({})
        const popupDataEmailMulti = ref({})

        const deleteItem = (value: any) => {
            modalDelete.value = true;
            popupDataDelete.value = value
        };
        const editItem = (value: any) => {
            modalEdit.value = true;
            popupDataEdit.value = value
        };
        const arrDropDownPayrollRegister = [
            { id: 1, img: 'print.svg', event: 'PrintPayrollRegister' },
            { id: 2, img: 'email.png', event: 'EmailPayrollRegister' },
        ];
        const arrDropDownSalaryStatement = [
            { id: 1, img: 'print.svg', event: 'PrintSalaryStatement' },
            { id: 2, img: 'email.png', event: 'EmailSalaryStatement' },
            { id: 3, img: 'group_email.png', event: 'EmailMultiSalaryStatement' },
        ];
        const arrDropDown = [
            { id: 1, url: '110', event: '110' },
            { id: 2, function: 'History', event: 'History' },
            { id: 2, function: 'StatusHistory', event: 'StatusHistory' },
        ]
        const onItemClick = (value: any) => {
            switch (value.itemData.event) {
                case 'PrintPayrollRegister':
                    modalPrintPayrollRegister.value = true;
                    // popupDataPayrollRegister.value = value
                    break;
                case 'EmailPayrollRegister':
                    modalEmailSinglePayrollRegister.value = true;
                    // popupDataPayrollRegister.value = value
                    break;
                case 'PrintSalaryStatement':
                    modalPrintSalaryStatement.value = true;
                    // popupDataPayrollRegister.value = value
                    break;
                case 'EmailSalaryStatement':
                    modalEmailSingle.value = true;
                    // popupDataPayrollRegister.value = value
                    break;
                case 'EmailMultiSalaryStatement':
                    modalEmailMulti.value = true;
                    // popupDataPayrollRegister.value = value
                    break;
                case 'EmailPayrollRegister':
                    modalPrintPayrollRegister.value = true;
                    // popupDataPayrollRegister.value = value
                    break;
                case 'History':
                    modalHistoryStatus.value = true;
                    // popupDataPayrollRegister.value = value
                    break;
            }
        }
        return {
            deleteItem,
            editItem,
            modalDelete,
            modalEdit,
            modalEmailSingle,
            modalEmailSinglePayrollRegister,
            modalEmailMulti,
            popupDataEmailSingle,
            popupDataEmailSinglePayrollRegister,
            popupDataEmailMulti,
            modalPrintPayrollRegister,
            modalPrintSalaryStatement,
            modalHistoryStatus,
            onItemClick,
            arrDropDownPayrollRegister,
            arrDropDownSalaryStatement,
            arrDropDown,

            popupDataPayrollRegister,
            popupDataSalaryStatement,

            popupDataDelete,

            popupDataEdit,
        };
    },
});
</script>
<style lang="scss" scoped  src="../style/style.scss" >

</style>