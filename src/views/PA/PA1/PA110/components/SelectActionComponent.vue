<template>
    <DxButton class="ml-3" @click="deleteItem" :disabled="store.state.common.statusDisabledStatus">
        <img style="width: 17px;" src="@/assets/images/icon_delete.png" alt="">
    </DxButton>
    <DxButton class="ml-3" icon="plus" @click="onActionAddItem" :disabled="store.state.common.statusDisabledStatus"/>
    <DxButton class="ml-3" icon="edit" @click="editItem" :disabled="store.state.common.statusDisabledStatus"/>
    <DxButton @click="onSubmit($event)" size="large"
        class="ml-4" :disabled="store.state.common.statusDisabledStatus">
        <SaveOutlined style="font-size: 17px" />
    </DxButton>
    <DxButton class="ml-4 d-flex" style="cursor: pointer" @click="showHistory">
        <a-tooltip color="black" placement="top">
            <template #title>근로소득자료 변경이력</template>
            <div class="text-center">
                <HistoryOutlined style="font-size: 16px" />
            </div>
        </a-tooltip>
    </DxButton>
    <DxButton class="ml-4" style="cursor: pointer" @click="showHistoryStatus">
        <a-tooltip color="black" placement="top">
            <template #title>근로소득 마감상태 변경이력</template>
            <div class="text-center">
                <img src="@/assets/images/icon_status_history.png" alt="" class="icon_status_history" />
            </div>
        </a-tooltip>
    </DxButton>
    <div class="custom-select-tab ml-4">
        <button class="button-open-tab"
            @click="openTab({ name: '사원등록', url: '/dashboard/pa-120', id: 'pa-120' })">일용직사원등록</button>
    </div>
    <DxDropDownButton class="ml-3" :items="arrDropDownPayrollRegister" text="급여대장" @item-click="onItemClick"
        item-template="item-field">
        <template #item-field="{ data }">
            <div style="text-align: center;"><img :src="$filters.useImage(data.img)" alt=""
                    style="width: 25px; height: 25px;" /></div>
        </template>
    </DxDropDownButton>
    <DxDropDownButton class="ml-3" :items="arrDropDownSalaryStatement" text="급여명세서" @item-click="onItemClick"
        item-template="item-field">
        <template #item-field="{ data }">
            <div style="text-align: center;"><img :src="$filters.useImage(data.img)" alt=""
                    style="width: 25px; height: 25px;" /></div>
        </template>
    </DxDropDownButton>

    <!-- <PopupMessage :modalStatus="modalStatusAdd" @closePopup="modalStatusAdd = false" :typeModal="'confirm'"
        title="처음부터 다시 입력하겠습니까?" content="" okText="네" cancelText="아니요" @checkConfirm="statusComfirmAdd" /> -->

    <DeletePopupIncomeWages :modalStatus="modalDelete" @closePopup="modalDelete = false" :data="popupDataDelete" />
    <EditPopup :modalStatus="modalEdit" @closePopup="modalEdit = false" :data="popupDataEdit" />
    <PrintPayrollRegisterPopup :modalStatus="modalPrintPayrollRegister"
        @closePopup="modalPrintPayrollRegister = false" />
    <EmailMultiPopup :modalStatus="modalEmailMulti" @closePopup="modalEmailMulti = false" :data="popupDataEmailMulti" />
    <EmailSinglePayrollRegisterPopup :modalStatus="modalEmailSinglePayrollRegister"
        @closePopup="modalEmailSinglePayrollRegister = false" :data="popupDataEmailSinglePayrollRegister" />
    <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="modalEmailSingle = false"
        :data="popupDataEmailSingle" />
    <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="popupDataHistory" title="변경이력"
        typeHistory="pa-110" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
        :data="popupDataHistoryStatus" title="업무상태 변경이력" typeHistory="pa-status-110" />
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
        const globalYear = computed(() => store.state.settings.globalYear)
        const processKey = computed(() => store.state.common.processKeyPA110)
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
        // watch(()=> props.actionAddItem,(newVal: Boolean)=> {
        //     actionAddItem1.value = newVal;
        // })
        const deleteItem = (value: any) => {
            if (props.dataRows.length) {
                modalDelete.value = true;

                popupDataDelete.value = props.dataRows
            } else {
                notification('error', `항목을 최소 하나 이상 선택해야합니다`)
            }
        };
        const onActionAddItem = (value: any) => {
            // store.state.common.actionAddItem = true;
            if (store.state.common.statusRowAdd) {
                if (store.state.common.statusChangeFormAdd && store.state.common.actionAddItem) {
                    modalStatusAdd.value = true
                } else {
                    store.state.common.statusRowAdd = false;
                    store.state.common.actionAddItem = true;
                    store.state.common.incomeId = null;
                    store.state.common.focusedRowKey = null;
                }
            } else {
                notification('error', "nhập vàooooo")
            }
        }
        const editItem = (value: any) => {
            if (props.dataRows.length) {
                modalEdit.value = true;
                popupDataEdit.value = props.dataRows

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
                        notification('error', `항목을 하나 이상 선택해야합니다`)
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
                        notification('error', `항목을 하나 이상 선택해야합니다`)
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
        // const loadingTableInfo = () => {
        //     emit("loadingTableInfo", true)
        // }

        const showHistory = () => {
            modalHistory.value = true;
            popupDataHistory.value = { ...processKey.value }
        }

        const showHistoryStatus = () => {
            modalHistoryStatus.value = true;
            popupDataHistoryStatus.value = { ...processKey.value }
        }
        const onSubmit = (e: any) => {
            store.state.common.actionSubmit++
            // var res = e.validationGroup.validate();
            // if (!res.isValid) {
            //     // res.brokenRules[0].validator.focus();
            //     // focusedRowKey.value = formState.employeeId
            // } else {
            //     emit('actionSave', actionSaveItem.value++);
            // }
        }
        /**
         *  Update value 
         */
        // const updateData = (e: any) => {
        //     store.state.common.actionSubmit++
        //     // emit('actionUpdate',actionUpdateItem.value++)
        // }
        // const statusComfirmAdd = (val: any) => {
        //     if (val) {
        //         store.state.common.actionAddItem = 1;
        //     }
        // }
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
            // statusComfirmAdd,
        };
    },
});
</script>
<style lang="scss" scoped  src="../style/style.scss" >

</style>
