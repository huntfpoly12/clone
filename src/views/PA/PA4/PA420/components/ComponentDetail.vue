<template>
    <a-col :span="24">
        <div class="header-detail-main">
            <div class="table-detail-left d-flex-center">
                <div class="text-box-1">귀 {{ dataTableDetail.processKey.imputedYear }}-{{
                        dataTableDetail.processKey.imputedMonth
                }}</div>
                <div class="text-box-2">지 {{ dataTableDetail.processKey.paymentYear }}-{{
                        dataTableDetail.processKey.paymentMonth
                }}</div>
                <process-status v-model:valueStatus="statusButton" />
            </div>
            <div class="table-detail-right">
                <DxButton @click="deleteItem">
                    <DeleteOutlined style="font-size: 18px;" />
                </DxButton>
                <DxButton icon="plus" @click="addRow" />
                <DxButton @click="editPaymentDate">
                    <EditOutlined style="font-size: 18px;" />
                </DxButton>
                <template v-for="(placement, index) in placements" :key="placement">
                    <a-dropdown :placement="placement" class="ml-5">
                        <a-button class="button-open-tab">선택</a-button>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <div class="custom-select-tab">
                                        <a href="/dashboard/pa-610" style="color: white;">
                                            기타소득자등록
                                        </a>
                                    </div>
                                </a-menu-item>
                                <a-menu-item>
                                    <a-tooltip placement="left">
                                        <template #title>사업소득자료 변경이력</template>
                                        <div style="text-align: center;" @click="onItemClick('history')">
                                            <HistoryOutlined style="font-size: 20px" />
                                        </div>
                                    </a-tooltip>
                                </a-menu-item>
                                <a-menu-item>
                                    <a-tooltip placement="left">
                                        <template #title>사업소득 마감상태 변경이력</template>
                                        <div style="text-align: center;" @click="onItemClick('historyEdit')">
                                            <img src="@/assets/images/icon_status_history.png" alt=""
                                                style="width: 20px; height: 20px;" />
                                        </div>
                                    </a-tooltip>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
            </div>
        </div>
    </a-col>

    <a-spin :spinning="(loadingTableDetail)" size="large">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceDetail"
            :show-borders="true" key-expr="incomeId" :allow-column-reordering="move_column"
            :allow-column-resizing="colomn_resize" :column-auto-width="true" :onRowClick="actionEditFuc"
            :focused-row-enabled="true" @selection-changed="selectionChanged" class="mt-10">
            <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
            <DxScrolling column-rendering-mode="virtual" />
            <DxColumn caption="기타소득자 [소득구분]" cell-template="tag" />
            <template #tag="{ data }" class="custom-action">
                <income-type :typeCode="data.data.incomeTypeCode" :typeName="(data.data.employee.name)"
                    :incomeTypeName="data.data.employee.incomeTypeName" />
            </template>
            <DxColumn caption="지급일" data-field="paymentDay" data-type="string" :format="amountFormat" />
            <DxColumn caption="지급액" data-field="paymentAmount" data-type="string" :format="amountFormat" />
            <DxColumn caption="세율" data-field="taxRate" data-type="string" :format="amountFormat" />
            <DxColumn caption="공제" cell-template="income-tax" />
            <template #income-tax="{ data }" class="custom-action">
                {{ $filters.formatCurrency(data.data.withholdingIncomeTax + data.data.withholdingLocalIncomeTax)
                }}
            </template>
            <DxColumn caption="차인지급액" data-field="actualPayment" data-type="string" :format="amountFormat" />
            <DxSummary>
                <DxTotalItem column="기타소득자 [소득구분]" summary-type="count" display-format="사업소득자[소득구분]수: {0}" />
                <DxTotalItem class="custom-sumary" column="지급액" summary-type="sum" display-format="지급액합계: {0}"
                    value-format="#,###" />
                <DxTotalItem class="custom-sumary" column="공제" :customize-text="customTextSummary" />
                <DxTotalItem class="custom-sumary" column="actualPayment" summary-type="sum"
                    display-format="차인지급액합계: {0}" value-format="#,###" />
            </DxSummary>
        </DxDataGrid>
    </a-spin>

    <DeletePopup :modalStatus="modalDelete" @closePopup="actionDeleteSuccess" :data="popupDataDelete"
        :processKey="dataTableDetail.processKey" />

    <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="dataTableDetail.processKey"
        title="변경이력" typeHistory="pa-420" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="actionDeleteSuccess" :data="dataTableDetail.processKey"
        title="변경이력" typeHistory="pa-420-status" />
    <EditPopup :modalStatus="modalEdit" @closePopup="actionDeleteSuccess" :data="popupDataDelete"
        :processKey="dataTableDetail.processKey" />
    <AddPopup :modalStatus="modalAdd" @closePopup="actionDeleteSuccess" :data="popupDataDelete"
        :processKey="dataTableDetail.processKey" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxMasterDetail, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import { dataActionUtils } from "../utils/index";
import DxDropDownButton from 'devextreme-vue/drop-down-button';
import type { DropdownProps } from "ant-design-vue";
import DeletePopup from "./DeletePopup.vue"
import EditPopup from "./EditPopup.vue"
import AddPopup from "./AddPopup.vue"
import filters from "@/helpers/filters";

export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSelection, DxExport, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxDropDownButton, DxGrouping, DxItem, DxButton, DxMasterDetail, DxSummary, DxTotalItem,
        EditOutlined, HistoryOutlined, SearchOutlined, DeleteOutlined, SaveOutlined,
        MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined,
        DeletePopup, EditPopup, AddPopup
    },
    props: {
        dataCallTableDetail: {
            type: Object
        },
        statusButton: {
            type: Number
        },
        actionSave: {
            type: Number
        }
    },
    setup(props, { emit }) {
        let statusButton = ref(props.statusButton)
        let dataSourceDetail = ref([]);
        let arrayEmploySelect: any = ref([])
        let placements = ["bottomRight"] as DropdownProps["placement"][];
        const modalEdit = ref<boolean>(false)
        const popupDataDelete: any = ref([])
        const modalDelete = ref<boolean>(false)
        const amountFormat = ref({ currency: 'VND', useGrouping: true })
        const triggerDetail = ref<boolean>(true);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rowTable = ref(0);
        const modalHistory = ref<boolean>(false)
        const modalAdd = ref(false)
        const modalHistoryStatus = ref<boolean>(false)
        let dataAction: any = reactive({
            ...dataActionUtils
        })
        let dataTableDetail: any = ref({
            ...props.dataCallTableDetail
        })

        // ================GRAPQL==============================================

        // API QUERY TABLE SMALL LEFT SIDE
        const { refetch: refetchTableDetail, loading: loadingTableDetail, onError: errorGetIncomeProcessBusinessesDetail, onResult: resIncomeProcessBusinessesDetail } = useQuery(queries.getIncomeBusinesses, dataTableDetail, () => ({
            enabled: triggerDetail.value,
            fetchPolicy: "no-cache",
        }));
        resIncomeProcessBusinessesDetail(res => {
            dataSourceDetail.value = res.data.getIncomeBusinesses
            triggerDetail.value = false
        })
        errorGetIncomeProcessBusinessesDetail(res => {
            notification('error', res.message)
        })


        // ================WATCHING============================================
        watch(() => props.dataCallTableDetail, (newValue) => {
            dataTableDetail.value = newValue
            triggerDetail.value = true
            refetchTableDetail()
        }, { deep: true })

        watch(() => dataTableDetail, (newValue) => {
        }, { deep: true })

        watch(() => props.statusButton, (newValue) => {
            statusButton.value = newValue
        })


        // ================FUNCTION============================================   
        const addRow = () => {
            modalAdd.value = true

        }

        const actionEditFuc = (data: any) => {

        }

        const changeIncomeTypeCode = (res: string) => {
            dataAction.input.incomeTypeCode = res
        }

        const selectionChanged = (event: any) => {
            popupDataDelete.value = event.selectedRowKeys
        }

        const deleteItem = () => {
            if (popupDataDelete.value.length > 0) {
                modalDelete.value = true;
            }
        };

        const actionDeleteSuccess = () => {
            // modalDelete.value = false
            // modalEdit.value = false
            // triggerDetail.value = true
            // refetchTableDetail()
            // emit('createdDone', true)
            modalAdd.value = false
        }

        const onItemClick = (key: String) => {
            if (key == 'history') {
                modalHistory.value = true
            } else {
                modalHistoryStatus.value = true
            }
        }

        const editPaymentDate = () => {
            if (popupDataDelete.value.length > 0) {
                modalEdit.value = true
            }
        }

        const customTextSummary = () => {
            let total = 0
            dataSourceDetail.value.map((val: any) => {
                total += val.withholdingIncomeTax + val.withholdingLocalIncomeTax
            })
            return '공제합계: ' + filters.formatCurrency(total)
        }


        return {
            modalAdd,
            arrayEmploySelect,
            statusButton,
            dataTableDetail,
            dataAction,
            rowTable, per_page, move_column, colomn_resize,
            loadingTableDetail,
            dataSourceDetail,
            placements,
            modalDelete,
            popupDataDelete,
            modalHistory,
            modalHistoryStatus,
            modalEdit,
            amountFormat,
            addRow,
            deleteItem,
            actionEditFuc,
            changeIncomeTypeCode,
            selectionChanged,
            actionDeleteSuccess,
            onItemClick,
            editPaymentDate,
            customTextSummary
        }
    }
});
</script>
<style scoped src="../style/style.scss" >

</style>
