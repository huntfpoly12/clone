<template>
    <DxButton @click="deleteItem"
        :disabled="store.state.common.pa110.statusDisabledStatus || (store.state.common.pa110.statusChangeFormAdd && store.state.common.pa110.statusFormAdd) || store.state.common.pa110.statusMidTermSettlement2">
        <img style="width: 17px;" src="@/assets/images/icon_delete.png" alt="">
    </DxButton>
    <DxButton class="ml-4" icon="plus" @click="onActionAddItem" :disabled="store.state.common.pa110.statusDisabledStatus" />
    <a-tooltip placement="top" title="근로소득자료 변경이력">
        <span>
            <DxButton class="ml-4" @click="showHistory">
                <HistoryOutlined style="font-size: 18px" />
            </DxButton>
        </span>
    </a-tooltip>
    <a-tooltip placement="top" title="근로소득 마감상태 변경이력">
        <span>
            <DxButton class="ml-4" @click="showHistoryStatus">
                <img src="@/assets/images/icon_status_history.png" alt="" class="icon_status_history-custom" />
            </DxButton>
        </span>
    </a-tooltip>
    <DxButton @click="editItem" class="ml-4"
        :disabled="store.state.common.pa110.statusDisabledStatus || (store.state.common.pa110.statusChangeFormAdd && store.state.common.pa110.statusFormAdd)">
        <div class="d-flex-center">
            <checkbox-basic :valueCheckbox="true" disabled="true" />
            <span class="fz-12 pl-5">지급일변경</span>
        </div>
    </DxButton>
    <DxButton class="button-open-tab ml-4" style="pointer-events: all; opacity: 1;"
        @click="openTab({ name: '사원등록', url: '/pa-120', id: 'pa-120' })">사원등록</DxButton>
    <DxDropDownButton :useItemTextAsTitle="false" class="ml-4" :items="arrDropDownPayrollRegister" text="급여대장"
        @item-click="onItemClick" item-template="item-field">
        <template #item-field="{ data }">
            <div style="text-align: center;"><img :src="$filters.useImage(data.img)" alt="" style="width: 25px;" /></div>
        </template>
    </DxDropDownButton>
    <DxDropDownButton :useItemTextAsTitle="false" class="ml-4" :items="arrDropDownSalaryStatement" text="급여명세서"
        @item-click="onItemClick" item-template="item-field">
        <template #item-field="{ data }">
            <div style="text-align: center;"><img :src="$filters.useImage(data.img)" alt="" style="width: 25px;" /></div>
        </template>
    </DxDropDownButton>
    <PopupMessage :modalStatus="modalStatusAdd" @closePopup="modalStatusAdd = false" :typeModal="'confirm'"
        :title="Message.getMessage('COMMON', '501').message" content="" :okText="Message.getMessage('COMMON', '501').yes"
        :cancelText="Message.getMessage('COMMON', '501').no" @checkConfirm="statusComfirmAdd" />
    <PopupMessage :modalStatus="modalChangeRow" @closePopup="modalChangeRow = false" typeModal="confirm"
        :title="Message.getMessage('COMMON', '501').message" content="" :okText="Message.getMessage('COMMON', '501').yes"
        :cancelText="Message.getMessage('COMMON', '501').no" @checkConfirm="statusComfirmChange" />

    <DeletePopupIncomeWages :modalStatus="modalDelete" @closePopup="modalDelete = false" :data="popupDataDelete" />
    <EditPopup :modalStatus="modalEdit" @closePopup="modalEdit = false" :data="popupDataEdit" />
    <PrintPayrollRegisterPopup :modalStatus="modalPrintPayrollRegister" @closePopup="modalPrintPayrollRegister = false" />
    <EmailMultiPopup :modalStatus="modalEmailMulti" @closePopup="modalEmailMulti = false" :data="popupDataEmailMulti" />
    <EmailSinglePayrollRegisterPopup :modalStatus="modalEmailSinglePayrollRegister"
        @closePopup="modalEmailSinglePayrollRegister = false" :data="popupDataEmailSinglePayrollRegister" />
    <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="modalEmailSingle = false" :data="popupDataEmailSingle" />
    <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="popupDataHistory" title="변경이력"
        typeHistory="pa-110" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupDataHistoryStatus"
        title="업무상태 변경이력" typeHistory="pa-status-110" />
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive, getCurrentInstance } from "vue";
import DxButton from "devextreme-vue/button"
import DxDropDownButton from 'devextreme-vue/drop-down-button';
import PrintPayrollRegisterPopup from "./Popup/PrintPayrollRegisterPopup.vue"
import DeletePopupIncomeWages from "./Popup/DeletePopupIncomeWages.vue"
import EditPopup from "./Popup/EditPopup.vue"
import EmailSinglePayrollRegisterPopup from "./Popup/EmailSinglePayrollRegisterPopup.vue"
import EmailMultiPopup from "./Popup/EmailMultiPopup.vue"
import EmailSinglePopup from "./Popup/EmailSinglePopup.vue"
import { HistoryOutlined, SaveOutlined } from "@ant-design/icons-vue"
import { companyId, openTab } from "@/helpers/commonFunction"
import { useStore } from 'vuex'
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA1/PA110/index";
import notification from "@/utils/notification";
import { Message } from '@/configs/enum';

export default defineComponent({
    components: {
        DxButton,
        DxDropDownButton,
        PrintPayrollRegisterPopup,
        DeletePopupIncomeWages,
        EditPopup,
        EmailSinglePayrollRegisterPopup,
        EmailMultiPopup,
        EmailSinglePopup,
        HistoryOutlined,
        SaveOutlined
    },
    props: {
        // modalStatus: {
        //     type: Boolean
        // },
        dataRows: {
            type: Array,
            default: []
        },
        // actionAddItem: Boolean,
    },
    setup(props, { emit }) {
        const app: any = getCurrentInstance();
        const messages = app.appContext.config.globalProperties.$messages;
        const store = useStore()
        const paYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'))
        const processKey = computed(() => store.state.common.pa110.processKeyPA110)
        const trigger = ref<boolean>(false)

        const popupDataHistory: any = ref({})
        const popupDataHistoryStatus: any = ref({})
        const popupDataEdit: any = ref({})
        const popupDataDelete: any = ref([])

        const modalPrintPayrollRegister = ref<boolean>(false)
        const modalDelete = ref<boolean>(false)

        const modalEdit = ref<boolean>(false)
        const modalHistory = ref<boolean>(false)
        const modalHistoryStatus = ref<boolean>(false)
        const modalEmailSingle = ref(false)
        const modalEmailSinglePayrollRegister = ref(false)
        const modalEmailMulti = ref(false)
        let modalChangeRow = ref<boolean>(false)

        const modalStatusAdd = ref(false)

        const originData: any = ref({
            companyId: companyId,
            imputedYear: paYear.value,
            incomeIds: [],
        })
        const popupDataEmailSingle: any = ref({})
        const popupDataEmailSinglePayrollRegister: any = ref({})
        const popupDataEmailMulti: any = ref({})
        watch(() => props.dataRows, (value) => {
            if (value) {
                popupDataDelete.value = value
            }
        })
        const deleteItem = (value: any) => {
            if (props.dataRows.length) {
                modalDelete.value = true;
                popupDataDelete.value = props.dataRows
            } else {
                notification('error', messages.getCommonMessage('404').message)
            }
        };
        const onActionAddItem = (value: any) => {
            if (store.state.common.pa110.statusChangeFormEdit) {
                modalStatusAdd.value = true
                store.state.common.pa110.statusClickButtonAdd = true;
            } else {
                if (store.state.common.pa110.statusRowAdd) {
                    store.state.common.pa110.addRow++ // add row
                    store.state.common.pa110.statusRowAdd = false;
                    store.state.common.pa110.statusFormAdd = true;
                }
                else {
                    if (store.state.common.pa110.statusChangeFormAdd) {
                        modalStatusAdd.value = true
                        store.state.common.pa110.statusClickButtonAdd = true;
                    }
                }
            }
        }
        const editItem = () => {
            if (props.dataRows.length) {
                if (store.state.common.pa110.statusChangeFormEdit) {
                    modalChangeRow.value = true
                } else {
                    modalEdit.value = true;
                    popupDataEdit.value = props.dataRows
                }
            } else {
                notification('error', messages.getCommonMessage('404').message)
            }
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
        const onItemClick = (value: any) => {
            switch (value.itemData.event) {
                case 'PrintPayrollRegister':
                    modalPrintPayrollRegister.value = true;
                    break;
                case 'EmailPayrollRegister':
                    if (props.dataRows.length == 1) {
                        popupDataEmailSinglePayrollRegister.value = props.dataRows[0]
                        modalEmailSinglePayrollRegister.value = true;
                    } else {
                        notification('error', Message.getCommonMessage('601').message)
                    }
                    break;
                case 'PrintSalaryStatement':
                    if (props.dataRows.length) {
                        originData.value.incomeIds = []
                        props.dataRows?.forEach((row: any) => {
                            originData.value.incomeIds.push(row.incomeId);
                        })
                        trigger.value = true;
                    } else {
                        notification('error', Message.getCommonMessage('404').message)
                    }
                    break;
                case 'EmailSalaryStatement':
                    if (props.dataRows.length == 1) {
                        popupDataEmailSingle.value = props.dataRows[0]
                        modalEmailSingle.value = true;
                    } else {
                        notification('error', Message.getCommonMessage('601').message)
                    }
                    break;
                case 'EmailMultiSalaryStatement':
                    if (props.dataRows.length) {
                        popupDataEmailMulti.value = props.dataRows
                        modalEmailMulti.value = true;
                    } else {
                        notification('error', Message.getCommonMessage('404').message)
                    }
                    break;
            }
        }
        const { refetch, result, loading
        } = useQuery(queries.getIncomeWageSalaryStatementViewUrl, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
        watch(result, (value) => {
            trigger.value = false;
            if (value) {
                window.open(value.getIncomeWageSalaryStatementViewUrl)
            }
        })

        const showHistory = () => {
            modalHistory.value = true;
            popupDataHistory.value = { ...processKey.value }
        }

        const showHistoryStatus = () => {
            modalHistoryStatus.value = true;
            popupDataHistoryStatus.value = { ...processKey.value }
        }
        const onSubmit = (e: any) => {
            store.state.common.pa110.actionSubmit++
        }

        const statusComfirmAdd = (val: any) => {
            if (val) { // action save form
                // store.state.common.pa110.checkClickYear = false;
                store.state.common.pa110.actionSubmit++
            } else {
                if (store.state.common.pa110.statusRowAdd) { // add row
                    store.state.common.pa110.addRow++ // add row
                    store.state.common.pa110.statusRowAdd = false;
                    store.state.common.pa110.statusFormAdd = true;
                } else { // reset form
                    store.state.common.pa110.actionResetForm++;
                }
            }
        }
        const statusComfirmChange = (res: any) => {
            store.state.common.pa110.statusClickEditItem = true
            if (res) {
                store.state.common.pa110.actionSubmit++
            } else {
                store.state.common.pa110.loadingFormData++
            }
        }
        watch(() => store.state.common.pa110.onEditItem, (value) => {
            store.state.common.pa110.statusClickEditItem = false
            editItem()
        })
        return {
            deleteItem,
            editItem,
            openTab,
            modalDelete,
            modalEdit,
            modalEmailSingle,
            modalEmailSinglePayrollRegister,
            modalEmailMulti,
            popupDataEmailSingle,
            popupDataEmailSinglePayrollRegister,
            popupDataEmailMulti,
            modalPrintPayrollRegister,
            modalHistory,
            modalHistoryStatus,
            onItemClick,
            arrDropDownPayrollRegister,
            arrDropDownSalaryStatement,
            popupDataHistory,
            popupDataHistoryStatus,
            popupDataDelete,
            onActionAddItem,
            popupDataEdit,
            showHistory,
            showHistoryStatus,
            onSubmit,
            // updateData,
            store,
            modalStatusAdd,
            statusComfirmAdd,
            Message,
            statusComfirmChange,
            modalChangeRow,
        };
    },
});
</script>
<style lang="scss" scoped>
.button-open-tab {
    color: white;
    background-color: blue;
    border: none;
    border-radius: 5px;
    padding: 9px 8px;
    cursor: pointer;
}

:deep .dx-button-content {
    padding: 6px 8px;
}

.icon_status_history-custom {
    width: 18px;
    height: 18px;
}
</style>
