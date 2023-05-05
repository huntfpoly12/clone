<template>
    <action-header :buttonDelete="false" :buttonSearch="false" :buttonSave="false" :buttonPrint="false" />
    <div class="ac-120">
        <div class="top">
            <a-spin tip="Loading..." :spinning="loadingGetAccountingProcesses">
                <div class="grid">
                    <div v-for="(month, index) in 12" :key="index" class="items"
                        :class="{ 'items-active': store.state.common.ac120.monthSelected === month }"
                        @click="selectedMonth(month)">
                        <colorful-badge
                            :value="dataGetAccountingProcesses.find((item: any) => item.month === month)?.status || null"
                            :year="acYear" :month="month" />
                    </div>
                </div>
            </a-spin>
            <div class="flex">
                <div class="action">
                    <ProcessStatus
                        v-if="dataGetAccountingProcesses.find((item: any) => item.month === store.state.common.ac120.monthSelected)?.status || 0"
                        :valueStatus="dataGetAccountingProcesses.find((item: any) => item.month === store.state.common.ac120.monthSelected)?.status || 0"
                        :disabled="true" />
                    <button-basic v-else mode="contained" style="width: 90px;" :disabled="true">
                    </button-basic>
                    <DxButton icon="plus" class="ml-4">
                        <a-tooltip placement="top" title="마감상태 변경이력">
                            <HistoryOutlined style="font-size: 18px" @click="modalHistoryAccountingProcess" />
                        </a-tooltip>
                    </DxButton>
                </div>
                <div class="action">
                    <div style="border: 1px solid #ddd; width: 100%; display: flex; padding: 5px 0;">
                        <div style="width: 90px; margin-left: 5px;">
                            <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customCountRow()">
                            </div>
                        </div>
                        <div style="width: 200px; margin-left: 30px;">
                            <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="sumOfIncome()"></div>
                        </div>
                        <div style="width: 200px;">
                            <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="sumOfExpenses()">
                            </div>
                        </div>
                        <div style="width: 300px;">
                            <div class="dx-datagrid-summary-item dx-datagrid-text-content">
                                <a-tooltip placement="top" title="조정마감되지 않는경우 전월이 0입니다">
                                    <div style="display: inline;">전월 잔액 <span>[{{ $filters.formatCurrency(lastBalance)
                                    }}]</span> </div>
                                </a-tooltip>
                                <div style="display: inline;" v-html="customBalance()"></div>
                            </div>
                        </div>
                        <div style=" width: 240px;">
                            <div class="dx-datagrid-summary-item dx-datagrid-text-content"
                                v-html="countResolutionNormalStatus()"></div>
                        </div>
                    </div>
                </div>
                <div class="action">
                    <a-tooltip placement="top" color="black">
                        <template #title>전표 신규 건별 등록</template>
                        <span>
                            <DxButton class="ml-4 custom-button" type="default" :height="$config_styles.HeightInput"
                                @click="actionOpenModalAdd" :disabled="store.state.common.ac120.statusFormAdd">
                                <div class="d-flex-center">
                                    <PlusOutlined style="font-size: 14px" />
                                    <span class="pl-5">전표 건별 등록</span>
                                </div>
                            </DxButton>
                        </span>
                    </a-tooltip>
                    <a-tooltip placement="top" color="black">
                        <template #title>결의서 신규 엑셀 등록</template>
                        <span>
                            <DxButton class="ml-4 custom-button" type="default" disabled="true"
                                :height="$config_styles.HeightInput">
                                <div class="d-flex-center">
                                    <PlusOutlined style="font-size: 14px" />
                                    <span class="pl-5">결의서 엑셀 등록</span>
                                </div>
                            </DxButton>
                        </span>
                    </a-tooltip>
                    <DxButton class="ml-4 mr-4 custom-button-checkbox custom-button" type="default"
                        :height="$config_styles.HeightInput" @click="actionModalDelete">
                        <div class="d-flex-center">
                            <checkbox-basic :valueCheckbox="true" disabled="true" />
                            <span class="pl-5">전표취소</span>
                        </div>
                    </DxButton>
                    <DxButton icon="plus">
                        <a-tooltip placement="topLeft" title="전표 변경이력">
                            <HistoryOutlined style="font-size: 18px" @click="modalHistoryAccountingDocuments" />
                        </a-tooltip>
                    </DxButton>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="data-grid">
                <a-spin tip="Loading..." :spinning="loadingGetAccountingDocuments">
                    <DxDataGrid noDataText="내역이 없습니다" id="dataGridAc120" key-expr="accountingDocumentId"
                        :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                        ref="gridRefAC120" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                        v-model:focused-row-key="store.state.common.ac120.focusedRowKey" :focused-row-enabled="true"
                        @focused-row-changing="onFocusedRowChanging" :column-auto-width="true"
                        v-model:selected-row-keys="store.state.common.ac120.selectedRowKeys"
                        @selection-changed="selectionChanged">
                        <DxRowDragging
                            v-if="dataGetAccountingProcesses.find((item: any) => item.month === store.state.common.ac120.monthSelected)?.status == 10"
                            :allow-reordering="true" :show-drag-icons="true" :on-reorder="onReorder"
                            :on-drag-change="onDragChange" />
                        <DxSelection select-all-mode="allPages" show-check-boxes-mode="onClick" mode="multiple" />
                        <DxScrolling mode="standard" show-scrollbar="always" />
                        <DxPaging :enabled="false" />
                        <DxColumn caption="일자" cell-template="transactionDetailDate" data-field="transactionDetailDate"
                            width="85" />
                        <template #transactionDetailDate="{ data }">
                            {{ $filters.formatDate(data.value) }}

                        </template>

                        <DxColumn caption="순번" data-field="documentOrderByDate" width="45" />

                        <DxColumn caption="결의번호" data-field="resolutionNumber" width="68" />

                        <DxColumn caption="통장" cell-template="bankbook" data-field="bankbook" width="80" />
                        <template #bankbook="{ data }">
                            <a-tooltip placement="top"
                                :title="data.data.bankbook?.type + ' ' + data.data.bankbook?.bankbookNumber">
                                <div>{{ data.data.bankbook?.bankbookNickname }}</div>
                            </a-tooltip>
                        </template>

                        <DxColumn caption="결의 구분" data-field="resolutionClassification"
                            cell-template="resolutionClassification" width="75" />
                        <template #resolutionClassification="{ data }">
                            {{ store.state.common.ac120.arrResolutionClassification.find((item: any) =>
                                data.data.resolutionClassification == item.id)?.text }}
                        </template>

                        <DxColumn caption="수입액" data-field="income" format="fixedPoint" width="75" />

                        <DxColumn caption="지출액" data-field="spending" format="fixedPoint" width="75" />

                        <DxColumn caption="잔액" data-field="balance" width="75" format="fixedPoint" />

                        <DxColumn caption="통장적요" data-field="summaryOfBankbookDetail" width="75" />

                        <DxColumn caption="적요" data-field="summary" width="75" />

                        <DxColumn caption="계정과목" data-field="accountCode" cell-template="accountCode" />
                        <template #accountCode="{ data }">
                            <account-code-select :valueInput="data.data.accountCode" :disabled="true" />
                        </template>

                        <DxColumn caption="상대계정" data-field="relationCode" cell-template="relationCode" width="170" />
                        <template #relationCode="{ data }">
                            <account-code-select :valueInput="data.data.relationCode" :disabled="true" />
                        </template>

                        <DxColumn caption="자금원천" data-field="fundingSource" css-class="cell-left"
                            cell-template="fundingSource" width="75" />
                        <template #fundingSource="{ data }">
                            {{ store.state.common.ac120.arrFundingSource.find((item: any) => data.data.fundingSource
                                == item.id)?.text }}
                        </template>

                        <DxColumn caption="거래처" data-field="clientId" cell-template="clientId" width="75" />
                        <template #clientId="{ data }">
                            {{ clients.find((item: any) => item.value == data.data.clientId)?.label }}
                        </template>

                        <DxColumn caption="증빙" data-field="proofCount" width="50" />

                        <DxColumn caption="물품 내역" cell-template="normality" css-class="cell-center" width="75" />
                        <template #normality="{ data }">
                            <div v-if="data.data.resolutionClassification != 1">
                                <PlusOutlined v-if="data.data.goodsCount == 0" class="icon-add"
                                    @click="actionPopupItemDetail(data.data)" />
                                <div v-else style="cursor: pointer;" @click="actionPopupItemDetail(data.data)">
                                    {{ data.data.goodsCount }}
                                </div>
                            </div>
                        </template>

                        <DxColumn caption="수기 여부" cell-template="handwriting" width="75" />
                        <template #handwriting="{ data }">
                            <div class="slipRegistration">
                                <DxButton v-if="data.data.handwriting == true" :focusStateEnabled="false" text="O"
                                    :style="{ backgroundColor: '#BB3835', color: 'white' }"
                                    :height="$config_styles.HeightInput" />
                            </div>
                        </template>

                        <DxColumn caption="정상 여부" cell-template="resolutionNormalStatus" width="75" />
                        <template #resolutionNormalStatus="{ data }">
                            <div class="slipRegistration">
                                <DxButton :focusStateEnabled="false" :text="data.data.resolutionNormalStatus ? 'O' : 'X'"
                                    :style="{ backgroundColor: data.data.resolutionNormalStatus ? '#337614' : '#BB3835', color: 'white' }"
                                    :height="$config_styles.HeightInput" />
                            </div>
                        </template>
                    </DxDataGrid>
                </a-spin>
            </div>
            {{ store.state.common.ac120.selectedRowKeys }}
            <!-- {{ store.state.common.ac120.dataRowFocus }} -->
            <DetailComponent />
        </div>

    </div>
    <PopupMessage :modalStatus="isModalRetrieveStatements" @closePopup="isModalRetrieveStatements = false"
        :typeModal="'confirm'" :title="''" :content="contentPopupRetrieveStatements" :okText="'네. 불러옵니다'"
        :cancelText="'아니요'" @checkConfirm="handleConfirmChange" />

    <ModalDelete :modalStatus="statusModalDelete" @closePopup="statusModalDelete = false" :dataRows='dataRows' />

    <ModalAdd :modalStatus="statusModalAdd" @closePopup="statusModalAdd = false" @submit="onFillDataAdd" />


    <PopupItemDetails :modalStatus="statusModalItemDetail" @closePopup="statusModalItemDetail = false" />

    <HistoryPopup :modalStatus="modalHistoryStatusAccountingProcess"
        @closePopup="modalHistoryStatusAccountingProcess = false" :data="popupData" title="변경이력"
        typeHistory="ac-120-accounting-process" />
    <HistoryPopup :modalStatus="modalHistoryStatuAccountingDocuments"
        @closePopup="modalHistoryStatuAccountingDocuments = false" :data="popupData" title="변경이력"
        typeHistory="ac-120-accounting-documents" />
</template>
<script lang="ts">
import { useStore } from 'vuex';
import DxButton from "devextreme-vue/button"
import { defineComponent, ref, reactive, computed, onMounted, watch } from "vue";
import ProcessStatus from "@/components/common/ProcessStatus.vue"
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxRowDragging, DxPaging } from "devextreme-vue/data-grid";
import { HistoryOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { contentPopupRetrieveStatements, initialStateFormData } from "./utils/index"
import { Message } from "@/configs/enum"
import ModalDelete from "./components/ModalDelete.vue"
import ModalAdd from "./components/ModalAdd.vue"
import DetailComponent from "./components/DetailComponent.vue"
import PopupItemDetails from "./components/PopupItemDetails.vue"
import filters from "@/helpers/filters";
import { useQuery, useMutation } from '@vue/apollo-composable';
import queries from "@/graphql/queries/AC/AC1/AC120";
import mutations from "@/graphql/mutations/AC/AC1/AC120";
import { companyId } from "@/helpers/commonFunction"
import dayjs from "dayjs";
import notification from '@/utils/notification';
export default defineComponent({
    components: {
        ProcessStatus,
        DxItem,
        HistoryOutlined,
        DxDataGrid,
        DxColumn,
        DxScrolling,
        DxSelection,
        DxSummary,
        DxTotalItem,
        ModalDelete,
        ModalAdd,
        DxPaging,
        EditOutlined,
        PlusOutlined,
        PopupItemDetails,
        DxButton,
        DxRowDragging,
        DetailComponent,
    },
    setup() {
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
        const globalFacilityBizId = ref<number>(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));
        const clients = computed(() => store.state.settings.clients)
        const dataApi = ref<any[]>([])

        let isModalRetrieveStatements = ref(false);
        let statusModalDelete = ref(false);
        let statusModalAdd = ref(false);

        let statusModalItemDetail = ref(false);

        const gridRefAC120 = ref(); // ref of grid
        const gridRefAC120Detail = ref(); // ref of grid

        const popupData = ref({});
        const modalHistoryStatusAccountingProcess = ref<boolean>(false);
        const modalHistoryStatuAccountingDocuments = ref<boolean>(false);

        const dataRows: any = ref([])
        let keySelect = ref()
        store.state.common.ac120.formData = reactive({ ...initialStateFormData })
        const lastBalance = ref<number>(0)
        const dataGetAccountingProcesses = ref<any>([])
        const dataSource = ref<any>([])
        const triggerGetAccountingProcesses = ref<boolean>(true)
        const triggerGetAccountingDocuments = ref<boolean>(true)
        const dataQueryGetAccountingProcesses = ref({
            companyId: companyId,
            fiscalYear: acYear.value,
            facilityBusinessId: globalFacilityBizId.value
        })
        const dataQueryGetAccountingDocuments = ref({
            companyId: companyId,
            fiscalYear: acYear.value,
            facilityBusinessId: globalFacilityBizId.value,
            year: acYear.value,
            month: dayjs().month() + 1
        })

        // =================== GRAPHQL ===================
        // query getAccountingProcesses
        const {
            result: resGetAccountingProcesses, loading: loadingGetAccountingProcesses, onError: errorGetAccountingProcesses
        } = useQuery(queries.getAccountingProcesses, dataQueryGetAccountingProcesses.value, () => ({
            enabled: triggerGetAccountingProcesses.value,
            fetchPolicy: "no-cache",
        }))
        errorGetAccountingProcesses(e => {
            notification('error', e.message)
        })
        // query getAccountingDocuments
        const {
            result: resGetAccountingDocuments, loading: loadingGetAccountingDocuments, onError: errorGetAccountingDocuments
        } = useQuery(queries.getAccountingDocuments, dataQueryGetAccountingDocuments.value, () => ({
            enabled: triggerGetAccountingDocuments.value,
            fetchPolicy: "no-cache",
        }))
        errorGetAccountingDocuments(e => {
            notification('error', e.message)
        })

        // mutation reorderAccountingDocuments
        const {
            mutate: reorderAccountingDocuments, onDone: doneReorderAccountingDocuments, onError: errorReorderAccountingDocuments,
        } = useMutation(mutations.reorderAccountingDocuments);

        // ============== ON DONE MUTATION GRAPHQL ===============
        // reorderAccountingDocuments
        doneReorderAccountingDocuments((e) => {
            triggerGetAccountingDocuments.value = true
            notification('success', Message.getMessage('COMMON', '106').message)
        })
        errorReorderAccountingDocuments(e => {
            notification('error', e.message)
        })

        // ================== WATCH ================
        // 1. getAccountingProcesses
        watch(resGetAccountingProcesses, (value) => {
            triggerGetAccountingProcesses.value = false
            dataGetAccountingProcesses.value = value.getAccountingProcesses
        })
        // 2. getAccountingDocuments
        watch(resGetAccountingDocuments, async (value) => {
            triggerGetAccountingDocuments.value = false
            dataApi.value = value.getAccountingDocuments?.accountingDocuments
            await dataApi.value.map((item: any, index: number) => {
                if (index == 0) {
                    item.balance = lastBalance.value + item.income - item.spending
                } else {
                    item.balance = item.income - item.spending
                }

                const totalBefore: any = ref(0)
                const maxOrder: any = ref(1)
                dataApi.value.slice(0, index).forEach((data) => {
                    totalBefore.value = data.balance
                    if (item.transactionDetailDate == data.transactionDetailDate) {
                        maxOrder.value = data.documentOrderByDate + 1
                    }
                });
                item.documentOrderByDate = maxOrder.value
                item.balance = totalBefore.value + item.balance
            })

            await (dataSource.value = dataApi.value)
            lastBalance.value = value.getAccountingDocuments?.lastBalance
            getOneRowData()
        })

        // call api GetAccountingDocuments
        watch(() => store.state.common.ac120.resetDataTable, (value) => {
            triggerGetAccountingDocuments.value = true
        })
        // call api GetAccountingProcesses
        watch(() => store.state.common.ac120.resetDataAccountingProcesses, (value) => {
            triggerGetAccountingProcesses.value = true
        })

        watch(() => store.state.common.ac120.onDeleteRowAdd, (value) => {
            deleteRowAdd()
        })

        watch(() => store.state.common.ac120.formData.resolutionClassification, (newValue, oldValue) => {

        })

        // ================ FUNCTION ============================================
        const getOneRowData = () => {
            if (dataSource.value.length) { // if table has data source
                gridRefAC120.value?.instance.deselectAll()
                if (store.state.common.ac120.statusKeppRow) { // giữ nguyên row
                    store.state.common.ac120.statusKeppRow = false;
                    store.state.common.ac120.selectedRowKeys = [store.state.common.ac120.focusedRowKey]
                    Object.assign(store.state.common.ac120.formData, dataSource.value.find((item: any) => item.accountingDocumentId == store.state.common.ac120.focusedRowKey))
                    // Object.assign(store.state.common.ac120.formData, dataSource.value[0].data[0])
                } else { // lấy row đầu tiên
                    store.state.common.ac120.focusedRowKey = dataSource.value[0].accountingDocumentId
                    store.state.common.ac120.selectedRowKeys = [dataSource.value[0].accountingDocumentId]
                    Object.assign(store.state.common.ac120.formData, dataSource.value[0])
                }
                store.state.common.ac120.formData.amount = Math.abs(store.state.common.ac120.formData.amount)
            } else {
                dataRows.value = []
                store.state.common.ac120.focusedRowKey = null
                // store.state.common.ac120.statusFormAdd = true
                Object.assign(store.state.common.ac120.formData, initialStateFormData)
                store.state.common.ac120.keyRefreshForm++
            }
            store.state.common.ac120.statusFormAdd = false
            store.state.common.ac120.transactionDetailDate = store.state.common.ac120.formData.transactionDetailDate
            store.state.common.ac120.resetDataAccountingDocumentProofs++
        }
        
        // check box selection row data source
        const selectionChanged = (data: any) => {
            if (dataRows.value.length > data.selectedRowsData.length && keySelect.value) {
                dataRows.value = dataRows.value.filter((item: any) => {
                    if (item.bankbookDetailId != keySelect.value) {
                        return item
                    }
                })
            } else {
                dataRows.value = []
                data.selectedRowsData.map((data: any) => {
                    if (data.bankbookDetailId) {
                        if (!dataRows.value.find((item: any) => item.bankbookDetailId == data.bankbookDetailId)) {
                            let dataSameBankbookDetailId = dataSource.value.filter((item: any) => item.bankbookDetailId == data.bankbookDetailId)
                            dataRows.value = dataRows.value.concat(dataSameBankbookDetailId)
                        }
                    } else {
                        dataRows.value = dataRows.value.concat(data)
                    }
                })
            }
            if (JSON.stringify(dataRows.value.map((item: any) => item.accountingDocumentId)) != JSON.stringify(store.state.common.ac120.selectedRowKeys)) {
                store.state.common.ac120.selectedRowKeys = dataRows.value.map((item: any) => item.accountingDocumentId)
            }
        }

        const onFocusedRowChanging = (e: any) => {
            // if clicked on the cell selection or cell dragging
            if (!(e.event.currentTarget.outerHTML.search("dx-command-select") == -1) || !(e.event.currentTarget.outerHTML.search("dx-command-drag") == -1)) {
                e.cancel = true;
                if (!(e.event.currentTarget.outerHTML.search("dx-command-select") == -1)) {
                    keySelect.value = e.rows[e.newRowIndex]?.data.bankbookDetailId
                }
            } else {
                Object.assign(store.state.common.ac120.formData, e.rows[e.newRowIndex]?.data)
                store.state.common.ac120.transactionDetailDate = e.rows[e.newRowIndex]?.data.transactionDetailDate
                store.state.common.ac120.formData.amount = Math.abs(store.state.common.ac120.formData.amount)
                store.state.common.ac120.selectedRowKeys = [e.rows[e.newRowIndex]?.data.accountingDocumentId]
                store.state.common.ac120.keyRefreshForm++
                store.state.common.ac120.resetDataAccountingDocumentProofs++
                if (store.state.common.ac120.statusFormAdd && store.state.common.ac120.formData.accountingDocumentId != 'AC120') {
                    deleteRowAdd()
                }
            }
        };

        // remove row add
        const deleteRowAdd = async () => {
            await dataSource.value.pop()
            await gridRefAC120.value?.instance.refresh()
            await getOneRowData()
        }

        const actionModalDelete = (value: any) => {
            if (dataRows.value?.length) {
                statusModalDelete.value = true
            } else {
                notification('error', Message.getMessage('COMMON', '404').message)
            }
        }

        const actionOpenModalAdd = async (value: any) => {
            statusModalAdd.value = true
        }

        const actionPopupItemDetail = (data: any) => {
            statusModalItemDetail.value = true
        }

        const handleConfirmChange = () => { }

        const onReorder = (e: any) => {
            const visibleRows = e.component.getVisibleRows();
            const dataToIndex = dataSource.value.find((item: any) => item.accountingDocumentId === visibleRows[e.toIndex].data.accountingDocumentId);
            const dataFromIndex = dataSource.value.find((item: any) => item.accountingDocumentId === e.itemData.accountingDocumentId);
            if (dataToIndex.transactionDetailDate === dataFromIndex.transactionDetailDate) { // cùng date mới cho đổi
                const visibleRows = e.component.getVisibleRows();
                const toIndex = dataSource.value.findIndex((item: any) => item.accountingDocumentId === visibleRows[e.toIndex].data.accountingDocumentId);
                const fromIndex = dataSource.value.findIndex((item: any) => item.accountingDocumentId === e.itemData.accountingDocumentId);
                const newTasks = [...dataSource.value];
                newTasks.splice(fromIndex, 1);
                newTasks.splice(toIndex, 0, e.itemData);
                let indexDocumentOrderByDate = 1
                let dataInputs: any = []
                newTasks.map((item: any) => {
                    if (item.transactionDetailDate == dataToIndex.transactionDetailDate) { // nếu cùng ngày thì sắp xếp đổi
                        dataInputs.push({
                            accountingDocumentId: item.accountingDocumentId,
                            documentOrderByDate: indexDocumentOrderByDate
                        })
                        indexDocumentOrderByDate++
                    }
                })
                if (dataInputs.length) {
                    reorderAccountingDocuments({
                        companyId: companyId,
                        fiscalYear: acYear.value,
                        facilityBusinessId: globalFacilityBizId.value,
                        transactionDetailDate: dataToIndex.transactionDetailDate,
                        inputs: dataInputs
                    })
                } else {
                    notification('error', Message.getMessage('AC120', '003').message)
                }
            } else {
                notification('error', Message.getMessage('AC120', '003').message)
            }
        }

        const onDragChange = (e: any) => { }

        const onFillDataAdd = (dataAdd: any) => {
            addNewRow(dataAdd)
            statusModalAdd.value = false; // close popup
        }

        // handle add row
        const addNewRow = async (dataAdd: any) => {
            store.state.common.ac120.statusFormAdd = true
            let dataInitial: any = { ...initialStateFormData }

            Object.assign(dataInitial, dataAdd)
            dataSource.value = JSON.parse(JSON.stringify(dataSource.value)).concat({ ...dataInitial })
            store.state.common.ac120.formData = dataSource.value[dataSource.value.length - 1]
            store.state.common.ac120.focusedRowKey = 'AC120'
            store.state.common.ac120.keyRefreshForm++
            store.state.common.ac120.resetDataAccountingDocumentProofs++
            setTimeout(() => {
                store.state.common.ac120.statusShowFull = true
            }, 300);
        }

        const selectedMonth = (month: number) => {
            store.state.common.ac120.monthSelected = month
            dataQueryGetAccountingDocuments.value.month = month
            triggerGetAccountingDocuments.value = true;
        }

        const modalHistoryAccountingProcess = () => {
            popupData.value = { ...dataQueryGetAccountingDocuments.value }
            modalHistoryStatusAccountingProcess.value = true
        }

        const modalHistoryAccountingDocuments = () => {
            popupData.value = { ...dataQueryGetAccountingDocuments.value }
            modalHistoryStatuAccountingDocuments.value = true
        }

        const actionEditTaxPay = async (e: any) => {
            // await (focusedRowKey.value = null)
            // await (focusedRowKey.value = e.data.accountingDocumentId)
        }


        // ================ CUSTOM SUMMARY TABLE ============================================
        const customCountRow = () => {
            return `전표 건수 <span>[${dataSource.value.length}]</span>`
        }
        const sumOfIncome = () => {
            let total = 0;
            dataSource.value.forEach((item: any) => {
                total += item.income ? item.income : 0;
            });
            return `수입액 합계 <span>[${filters.formatCurrency(total)}]</span>`
        }
        const sumOfExpenses = () => {
            let total = 0;
            dataSource.value.forEach((item: any) => {
                total += item.spending ? item.spending : 0;
            });
            return `지출액 합계 <span>[${filters.formatCurrency(total)}]</span>`
        }
        const customBalance = () => {
            let total = 0;
            dataSource.value.forEach((item: any, index: number) => {
                if (index == 0) {
                    total += lastBalance.value + (item.income ? item.income : 0) - (item.spending ? item.spending : 0)
                } else {
                    total += (item.income ? item.income : 0) - (item.spending ? item.spending : 0)
                }
            });
            return ` 예상 잔액 <span>[${filters.formatCurrency(total)}]</span>`
        }
        const countResolutionNormalStatus = () => {
            let totalResolutionNormalStatuTrue = 0;
            let totalResolutionNormalStatuFalse = 0;
            dataSource.value.forEach((item: any) => {
                if (item.resolutionNormalStatus) {
                    totalResolutionNormalStatuTrue++
                } else {
                    totalResolutionNormalStatuFalse++
                }
            });
            return `정상 내역 건수 <span>[${filters.formatCurrency(totalResolutionNormalStatuTrue)}]</span> 비정상 내역 건 <span>[${filters.formatCurrency(totalResolutionNormalStatuFalse)}]</span>`
        };

        return {
            dataGetAccountingProcesses,
            dataSource,
            onFillDataAdd,
            loadingGetAccountingProcesses,
            loadingGetAccountingDocuments,
            dataRows,
            onFocusedRowChanging,
            actionEditTaxPay,
            gridRefAC120Detail,
            lastBalance,
            customCountRow, sumOfIncome, sumOfExpenses, customBalance, countResolutionNormalStatus,

            store,
            move_column,
            colomn_resize,
            acYear,
            selectionChanged,

            isModalRetrieveStatements,
            handleConfirmChange,
            contentPopupRetrieveStatements,
            statusModalDelete,
            statusModalAdd,
            statusModalItemDetail,

            actionPopupItemDetail,
            actionModalDelete,
            actionOpenModalAdd,

            onReorder, onDragChange,
            selectedMonth,
            modalHistoryAccountingProcess, modalHistoryAccountingDocuments,
            modalHistoryStatusAccountingProcess,
            modalHistoryStatuAccountingDocuments,
            popupData,
            clients,
            gridRefAC120,
        };
    },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
