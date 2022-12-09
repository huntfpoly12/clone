<template>
    <DxButton class="ml-3" @click="deleteItem">
        <img style="width: 17px;" src="@/assets/images/icon_delete.png" alt="">
    </DxButton>
    <DxButton class="ml-3" icon="plus" @click="actionAddItem"/>
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
    <DxDropDownButton class="ml-3" :items="arrDropDown" display-expr="title" text="선택" style="width: 120px;" @item-click="onItemClick"
        item-template="item-field">
        <template #item-field="{ data }">
            <div style="text-align: center;">
                <HistoryOutlined v-if="data.function == 'History'" class="mr-5" style="font-size: 18px" />
                <div v-if="data.function == 'HistoryStatus'" style="text-align: center;">
                        <img :src="'../../../../../../../src/assets/images/icon_status_history.png'" alt=""
                            style="width: 20px; height: 20px;" />
                </div>
                <button v-else-if="data.url" class="button-open-tab">일용직사원등록</button>
            </div>
        </template>
    </DxDropDownButton>

    <DeletePopup :modalStatus="modalDelete" @closePopup="modalDelete = false" @loadingTableInfo="loadingTableInfo" :data="popupDataDelete" />
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
import { HistoryOutlined } from "@ant-design/icons-vue"
import { companyId } from "@/helpers/commonFunction"
import { useStore } from 'vuex'
import dayjs from "dayjs";
import { useMutation, useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA5/PA510/index";
import notification from "@/utils/notification";
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
        HistoryOutlined
    },
    props: {
        modalStatus: {
            type: Boolean
        },
        dataRows: {
            type: Array,
            default: []
        },
    },
    setup(props, { emit }) {
        const store = useStore()
        const globalYear = computed(() => store.state.settings.globalYear)
        const popupDataHistory: any = ref({})
        const popupDataHistoryStatus: any = ref({})
        const modalPrintPayrollRegister = ref<boolean>(false)
        const trigger = ref<boolean>(false)
        const modalDelete = ref<boolean>(false)
        const modalEdit = ref<boolean>(false)
        const modalHistory = ref<boolean>(false)
        const modalHistoryStatus = ref<boolean>(false)
        const modalEmailSingle = ref(false)
        const modalEmailSinglePayrollRegister = ref(false)
        
        const modalEmailMulti = ref(false)
        const popupDataDelete: any = ref([])
        const popupDataEdit: any = ref({})
        // const dataPrintSalaryStatement = ref({})
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
            modalDelete.value = true;
            // popupDataDelete.value = value
        };
        const actionAddItem = (value: any) => {
            emit("actionAddItem", true)
        }
        const editItem = (value: any) => {
            if (props.dataRows.length == 1) {
                modalEdit.value = true;
                popupDataEdit.value = props.dataRows[0]
            } else {
                notification('error', `항목을 하나만 선택하십시오`)
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
            { id: 1, url: '520', event: '520', title: '' },
            { id: 2, function: 'History', event: 'History', title: '일용직근로소득자료 변경이력' },
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
                case 'EmailPayrollRegister':
                    modalPrintPayrollRegister.value = true;
                    break;
                case 'History':
                    modalHistory.value = true;
                    popupDataHistory.value = {
                        imputedYear: globalYear.value,
                        imputedMonth: dayjs().month() + 1,
                        paymentYear: globalYear.value,
                        paymentMonth: dayjs().month() + 1,
                    }
                    break;
                case 'HistoryStatus':
                    modalHistoryStatus.value = true;
                    popupDataHistoryStatus.value = {
                        imputedYear: globalYear.value,
                        imputedMonth: dayjs().month() + 1,
                        paymentYear: globalYear.value,
                        paymentMonth: dayjs().month() + 1,
                    }
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
        const loadingTableInfo = () => {
            emit("loadingTableInfo", true)
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
            loadingTableInfo,
        };
    },
});
</script>
<style lang="scss" scoped  src="../style/style.scss" >

</style>