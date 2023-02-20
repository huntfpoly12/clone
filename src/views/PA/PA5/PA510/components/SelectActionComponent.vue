<template>
    <DxButton class="ml-3" @click="deleteItem" :disabled="store.state.common.statusDisabledStatus">
        <img style="width: 17px;" src="@/assets/images/icon_delete.png" alt="">
    </DxButton>
    <DxButton class="ml-4" icon="plus" @click="actionAddItem" :disabled="store.state.common.statusDisabledStatus"/>
    <DxButton @click="onSubmit($event)" size="large" class="ml-4" :disabled="store.state.common.statusDisabledStatus">
        <SaveOutlined style="font-size: 17px" />
    </DxButton>
    <DxButton class="ml-4" style="cursor: pointer; display: inline-flex;"
        @click="onItemClick({ itemData: { event: 'History' } })">
        <a-tooltip placement="top">
            <template #title>근로소득자료 변경이력</template>
            <div class="text-center">
                <HistoryOutlined style="font-size: 16px" />
            </div>
        </a-tooltip>
    </DxButton>
    <DxButton class="ml-4" style="cursor: pointer" @click="onItemClick({ itemData: { event: 'HistoryStatus' } })">
        <a-tooltip placement="top">
            <template #title>근로소득 마감상태 변경이력</template>
            <div class="text-center">
                <img src="@/assets/images/icon_status_history.png" alt="" class="icon_status_history" />
            </div>
        </a-tooltip>
    </DxButton>
    <DxButton @click="editItem" class="ml-4 custom-button-checkbox" :disabled="store.state.common.statusDisabledStatus">
        <div class="d-flex-center">
            <checkbox-basic  :valueCheckbox="true" disabled="true" />
            <span class="fz-12 pl-5">지급일변경</span>
        </div>
    </DxButton>
    <button class="button-open-tab"
        @click="openTab({ url: '/dashboard/pa-520', name: '일용직사원등록', id: 'pa-520' })">일용직사원등록</button>

    <DxDropDownButton class="ml-3 action-select-1" :items="arrDropDownPayrollRegister" text="급여대장" @item-click="onItemClick"
        item-template="item-field">
        <template #item-field="{ data }">
            <div style="text-align: center;">
                <img v-if="data.id == 1" src="@/assets/images/print.svg" alt="" style="width: 25px; height: 25px;" />
                <img v-if="data.id == 2" src="@/assets/images/email.png" alt="" style="width: 25px; height: 25px;" />
            </div>
        </template>
    </DxDropDownButton>

    <DxDropDownButton class="ml-3  action-select-2" :items="arrDropDownSalaryStatement" text="급여명세서" @item-click="onItemClick"
        item-template="item-field">
        <template #item-field="{ data }">
            <div style="text-align: center;">
                <img v-if="data.id == 1" src="@/assets/images/print.svg" alt="" style="width: 25px; height: 25px;" />
                <img v-if="data.id == 2" src="@/assets/images/email.png" alt="" style="width: 25px; height: 25px;" />
                <img v-if="data.id == 3" src="@/assets/images/group_email.png" alt=""
                    style="width: auto; height: 25px; margin-left: 6px;" />
            </div>
        </template>
    </DxDropDownButton>
    <PopupMessage :modalStatus="modalStatusAdd" @closePopup="modalStatusAdd = false" :typeModal="'confirm'"
        title="처음부터 다시 입력하겠습니까?" content="" okText="네" cancelText="아니요" @checkConfirm="statusComfirmAdd" />

    <DeletePopup :modalStatus="modalDelete" @closePopup="modalDelete = false" :data="popupDataDelete" />
    <EditPopup :modalStatus="modalEdit" @closePopup="modalEdit = false" :data="popupDataEdit" />
    <PrintPayrollRegisterPopup :modalStatus="modalPrintPayrollRegister"
        @closePopup="modalPrintPayrollRegister = false" />
    <EmailMultiPopup :modalStatus="modalEmailMulti" @closePopup="modalEmailMulti = false" :data="popupDataEmailMulti" />
    <EmailSinglePayrollRegisterPopup :modalStatus="modalEmailSinglePayrollRegister"
        @closePopup="modalEmailSinglePayrollRegister = false" :data="popupDataEmailSinglePayrollRegister" />
    <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="modalEmailSingle = false"
        :data="popupDataEmailSingle" />
    <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="popupDataHistory" title="변경이력"
        typeHistory="pa-510" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
        :data="popupDataHistoryStatus" title="업무상태 변경이력" typeHistory="pa-status-510" />
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
import { HistoryOutlined, SaveOutlined } from "@ant-design/icons-vue"
import { companyId, openTab } from "@/helpers/commonFunction"
import { useStore } from 'vuex'
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA5/PA510/index";
import notification from "@/utils/notification";
import { Message } from "@/configs/enum";
export default defineComponent({
    components: {
        DxButton,
        DxDropDownButton,
        PrintPayrollRegisterPopup,
        DeletePopup,
        EditPopup,
        EmailSinglePayrollRegisterPopup,
        EmailMultiPopup,
        EmailSinglePopup,
        HistoryOutlined,
        SaveOutlined,
    },
    props: {
        dataRows: {
            type: Array,
            default: []
        },
    },
    setup(props, { emit }) {
        const messageSelectItem = Message.getMessage('COMMON', '404').message
        const store = useStore()
        const globalYear = computed(() => store.state.settings.globalYear)
        const processKey = computed(() => store.state.common.processKeyPA510)
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
        const modalStatusAdd = ref(false)

        const originData: any = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
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
                notification('error', messageSelectItem)
            }
        };
        const actionAddItem = () => {
            if (store.state.common.statusRowAdd) {
                // if (store.state.common.statusChangeFormAdd && store.state.common.actionAddItem) {
                //     modalStatusAdd.value = true
                // } else {
                    store.state.common.statusRowAdd = false;
                    store.state.common.actionAddItem = true;
                    store.state.common.incomeId = null;
                    store.state.common.focusedRowKey = null;
                    store.state.common.actionResetForm++;
                // }
            } else {
                modalStatusAdd.value = true
                // notification('error', "nhập vàooooo")
            }
        }
        const editItem = (value: any) => {
            if (props.dataRows.length) {
                modalEdit.value = true;
                popupDataEdit.value = props.dataRows
            } else {
                notification('error', messageSelectItem)
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
        const arrDropDown = [
            { id: 1, function: 'History', event: 'History', title: '일용직근로소득자료 변경이력' },
            { id: 2, function: 'HistoryStatus', event: 'HistoryStatus', title: '일용직근로소득 마감상태 변경이력' },
        ]
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
                        notification('error', `항목을 하나만 선택하십시오`)
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
                        notification('error', `항목을 최소 하나 이상 선택해야합니다`)
                    }
                    break;
                case 'EmailSalaryStatement':
                    if (props.dataRows.length == 1) {
                        popupDataEmailSingle.value = props.dataRows[0]
                        modalEmailSingle.value = true;
                    } else {
                        notification('error', `항목을 하나만 선택하십시오`)
                    }
                    break;
                case 'EmailMultiSalaryStatement':
                    if (props.dataRows.length) {
                        popupDataEmailMulti.value = props.dataRows
                        modalEmailMulti.value = true;
                    } else {
                        notification('error', `항목을 최소 하나 이상 선택해야합니다`)
                    }
                    break;
                case 'History':
                    modalHistory.value = true;
                    popupDataHistory.value = { ...processKey.value };
                    break;
                case 'HistoryStatus':
                    modalHistoryStatus.value = true;
                    popupDataHistoryStatus.value = { ...processKey.value }
                    break;
                case 'open-tab-520':
                    openTab({ name: "일용직사원등록", url: "/dashboard/pa-520", id: "pa-520" })
                    break;
            }
        }
        const { refetch, result, loading
        } = useQuery(queries.getIncomeWageDailySalaryStatementViewUrl, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
        watch(result, (value) => {
            trigger.value = false;
            if (value) {
                window.open(value.getIncomeWageDailySalaryStatementViewUrl)
            }
        })
        const statusComfirmAdd = (val: any) => {
            if (val) { // action save form
                store.state.common.actionSubmit++
            } else { // reset form
                store.state.common.actionResetForm++;
            }
        }
        const onSubmit = (e: any) => {
            store.state.common.actionSubmit++
        };

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
            modalHistory,
            modalHistoryStatus,
            onItemClick,
            arrDropDownPayrollRegister,
            arrDropDownSalaryStatement,
            arrDropDown,
            popupDataHistory,
            popupDataHistoryStatus,
            popupDataDelete,
            actionAddItem,
            popupDataEdit,
            modalStatusAdd, statusComfirmAdd,
            openTab,
            onSubmit,
            store,
        };
    },
});
</script>
<style lang="scss" scoped  src="../style/style.scss" >

</style>
