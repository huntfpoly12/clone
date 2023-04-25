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
                    <a-tooltip placement="top" color="black">
                        <template #title>전표 신규 건별 등록</template>
                        <span>
                            <DxButton class="ml-4 custom-button" type="default" :height="$config_styles.HeightInput"
                                @click="actionPopupSlipRegistration">
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
                        :height="$config_styles.HeightInput" @click="actionPopupSlipCancellation">
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
                    <!-- <HistoryOutlined style="font-size: 18px; margin-left: 5px;" /> -->
                </div>
            </div>
        </div>
        <div class="main">
            <!-- {{ dataSource }} -->
            <div class="data-grid" :style="[store.state.common.ac120.statusShowFull ? {} : { height: heightTable }]">
                <a-spin tip="Loading..." :spinning="loadingGetAccountingDocuments">
                    <!-- {{ dataSource }} -->
                    <!-- {{ store.state.common.ac120.selectedRowKeys }}
                    {{ focusedRowKey }} -->
                    <DxDataGrid id="dataGridAc120" key-expr="bankbookDetailId" :show-row-lines="true"
                        :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true" ref="gridRefAC120"
                        :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                        :column-auto-width="true" v-model:selected-row-keys="store.state.common.ac120.selectedRowKeys"
                        @selection-changed="selectionChanged">
                        <DxRowDragging :allow-reordering="true" :show-drag-icons="true" :on-reorder="onReorder"
                            :on-drag-change="onDragChange" />
                        <DxSelection :deferred="true" select-all-mode="allPages" show-check-boxes-mode="onClick"
                            mode="multiple" />
                        <DxScrolling mode="standard" show-scrollbar="always" />

                        <DxColumn caption="일자" cell-template="transactionDetailDate" width="85" />
                        <template #transactionDetailDate="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="transactionDetailDate" cell-template="transactionDetailDateDetail" />
                                <template #transactionDetailDateDetail="{ data: row }">
                                    {{ $filters.formatDate(row.value) }}
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="순번" data-field="documentOrderByDate" cell-template="documentOrderByDate"
                            width="45" />
                        <template #documentOrderByDate="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="documentOrderByDate" />
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="결의번호" data-field="resolutionNumber" cell-template="resolutionNumber"
                            width="68" />
                        <template #resolutionNumber="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="resolutionNumber" />
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="통장" cell-template="bankbook" data-field="bankbook" width="120" />
                        <template #bankbook="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="bankbook" cell-template="bankbookDetail" />
                                <template #bankbookDetail="{ data: row }">
                                    <a-tooltip placement="top"
                                        :title="row.data.bankbook?.type + ' ' + row.data.bankbook?.bankbookNumber">
                                        <div>{{ row.data.bankbook?.bankbookNickname }}</div>
                                    </a-tooltip>
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="결의 구분" cell-template="resolutionClassification" width="75" />
                        <template #resolutionClassification="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="resolutionClassification" cell-template="resolutionClassificationDetail"/>
                                <template #resolutionClassificationDetail="{ data: row }">
                                    {{ store.state.common.ac120.arrResolutionClassification.find((item: any) => row.data.resolutionClassification == item.id)?.text }}
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="수입액" cell-template="income" width="75" />
                        <template #income="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="income" format="fixedPoint" />
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="지출액" cell-template="spending" width="75" />
                        <template #spending="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="spending" format="fixedPoint" />
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="잔액" cell-template="balance" width="75" />
                        <template #balance="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="balance" cell-template="balanceDetail" cssClass="cell-right"/>
                                <template #balanceDetail="{ data: row }">
                                    {{ $filters.formatCurrency(lastBalance + row.data.income - row.data.spending) }}
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="통장적요" data-field="summaryOfBankbookDetail"
                            cell-template="summaryOfBankbookDetail" width="75" />
                        <template #summaryOfBankbookDetail="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="summaryOfBankbookDetail" />

                            </DxDataGrid>
                        </template>

                        <DxColumn caption="적요" data-field="summary" cell-template="summary1" width="75" />
                        <template #summary1="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="summary" />
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="계정과목" data-field="accountCode" cell-template="accountCode" width="200" />
                        <template #accountCode="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="accountCode" cell-template="accountCodeDetail" />
                                <template #accountCodeDetail="{ data: row }">
                                    <account-code-select :valueInput="row.data.accountCode" :disabled="true" />
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="상대계정" data-field="relationCode" cell-template="relationCode" width="150" />
                        <template #relationCode="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="relationCode" cell-template="relationCodeDetail" />
                                <template #relationCodeDetail="{ data: row }">
                                    <account-code-select :valueInput="row.data.relationCode" :disabled="true" />
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="자금원천" data-field="fundingSource" cell-template="fundingSource" width="75" />
                        <template #fundingSource="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="fundingSource" cell-template="fundingSourceDetail"/>
                                <template #fundingSourceDetail="{ data: row }">
                                    {{ store.state.common.ac120.arrFundingSource.find((item: any) => row.data.fundingSource == item.id)?.text }}
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="거래처" data-field="clientId" cell-template="clientId" width="75" />
                        <template #clientId="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="clientId" cell-template="clientIdDetail" />
                                <template #clientIdDetail="{ data: row }">
                                    {{ clients.find((item: any) => item.value == row.data.clientId)?.label }}
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="증빙" data-field="proofCount" format="fixedPoint" cell-template="proofCount"
                            width="50" />
                        <template #proofCount="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="proofCount" />
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="물품 내역" cell-template="normality" css-class="cell-center" width="75" />
                        <template #normality="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey"
                                class="data-grid-child icon-add" :showColumnHeaders="false" :show-row-lines="true"
                                :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="normality" cell-template="normalityDetail" css-class="cell-center" />
                                <template #normalityDetail="{ data: row }">
                                    <PlusOutlined v-if="row.data.resolutionClassification != 1" class="icon-add"
                                        @click="actionPopupItemDetail(row.data)" />
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="수기 여부" cell-template="handwriting" width="75" />
                        <template #handwriting="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="handwriting" cell-template="handwritingDetail" />
                                <template #handwritingDetail="{ data: row }">
                                    <div class="slipRegistration">
                                        <DxButton v-if="row.data.handwriting == true" :focusStateEnabled="false" text="O"
                                            :style="{ backgroundColor: '#BB3835', color: 'white' }"
                                            :height="$config_styles.HeightInput" />
                                    </div>
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="정상 여부" cell-template="resolutionNormalStatus" width="75" />
                        <template #resolutionNormalStatus="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId"
                                :onRowClick="actionEditTaxPay" @focused-row-changing="onFocusedRowChanging"
                                :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey" class="data-grid-child"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="resolutionNormalStatus"
                                    cell-template="resolutionNormalStatusDetail" />
                                <template #resolutionNormalStatusDetail="{ data: row }">
                                    <div class="slipRegistration">
                                        <DxButton :focusStateEnabled="false"
                                            :text="row.data.resolutionNormalStatus ? 'O' : 'X'"
                                            :style="{ backgroundColor: row.data.resolutionNormalStatus ? '#337614' : '#BB3835', color: 'white' }"
                                            :height="$config_styles.HeightInput" />
                                    </div>
                                </template>
                            </DxDataGrid>
                        </template>

                        <!-- <DxSummary>
                            <DxTotalItem column="순번" :customize-text="customCountRow" />
                            <DxTotalItem column="수입액" :customize-text="sumOfIncome" />
                            <DxTotalItem column="지출액" :customize-text="sumOfExpenses" />
                            <DxTotalItem column="잔액" :customize-text="customBalance" />
                            <DxTotalItem column="정상 여부" :customize-text="countResolutionNormalStatus" />
                        </DxSummary> -->

                    </DxDataGrid>
                    <div style="border: 1px solid #ddd; border-top: none; width: 100%; display: flex; padding: 5px 0;">
                            <div style="width: 250px; margin-left: 200px;">
                                <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-text="customCountRow()">
                                </div>
                            </div>
                            <div style="width: 150px;">
                                <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-text="sumOfIncome()"></div>
                            </div>
                            <div style="width: 150px;">
                                <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-text="sumOfExpenses()">
                                </div>
                            </div>
                            <div style="width: 670px;">
                                <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-text="customBalance()">
                                </div>
                            </div>
                            <div style=" width: 230px;">
                                <div class="dx-datagrid-summary-item dx-datagrid-text-content"
                                    v-text="countResolutionNormalStatus()"></div>
                            </div>
                    </div>
                </a-spin>
            </div>
            <!-- {{ store.state.common.ac120.dataRowFocus }} -->
            <DetailComponent />
        </div>

    </div>
    <PopupMessage :modalStatus="isModalRetrieveStatements" @closePopup="isModalRetrieveStatements = false"
        :typeModal="'confirm'" :title="''" :content="contentPopupRetrieveStatements" :okText="'네. 불러옵니다'"
        :cancelText="'아니요'" @checkConfirm="handleConfirmChange" />

    <PopupSlipCancellation :modalStatus="statusModalSlipCancellation" @closePopup="statusModalSlipCancellation = false"
        :dataRows='dataRows' />

    <PopupSlipRegistration :modalStatus="statusModalSlipRegistrantion" @closePopup="statusModalSlipRegistrantion = false"
        @submit="onFillDataAdd" />


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
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxRowDragging } from "devextreme-vue/data-grid";
import { HistoryOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { contentPopupRetrieveStatements, initialStateFormData } from "./utils/index"
import { Message } from "@/configs/enum"
import PopupSlipCancellation from "./components/PopupSlipCancellation.vue"
import PopupSlipRegistration from "./components/PopupSlipRegistration.vue"
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
        PopupSlipCancellation,
        PopupSlipRegistration,
        // PopupCopyData,
        EditOutlined,
        PlusOutlined,
        PopupItemDetails,
        DxButton,
        DxRowDragging,
        DetailComponent,
    },
    setup() {
        const heightTable: any = ref('calc(100vh - 445px)')

        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
        const globalFacilityBizId = ref<number>(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));
        const clients = computed(() => store.state.settings.clients)
        const dataApi = ref<any[]>([])
        // let statusAdjusting = ref(30);
        let focusedRowKey = ref()

        let isModalRetrieveStatements = ref(false);
        let statusModalSlipCancellation = ref(false);
        let statusModalSlipRegistrantion = ref(false);

        let statusModalItemDetail = ref(false);

        const gridRefAC120 = ref(); // ref of grid
        const gridRefAC120Detail = ref(); // ref of grid
        // const dataGridRef = computed(() => gridRefAC120.value?.instance as any); // ref of grid Instance

        const popupData = ref({});
        const modalHistoryStatusAccountingProcess = ref<boolean>(false);
        const modalHistoryStatuAccountingDocuments = ref<boolean>(false);

        const dataRows: any = ref([])

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

        // const monthSelected = ref(dayjs().month() + 1)
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
        watch(resGetAccountingDocuments, (value) => {
            triggerGetAccountingDocuments.value = false
            dataApi.value = value.getAccountingDocuments?.accountingDocuments
            let dataAll: any = []
            dataApi.value.map((item: any, index: number) => {
                if (item.bankbookDetailId) { // nếu có data bankbookDetailId
                    if (!dataAll.filter((row: any) => row.bankbookDetailId === item.bankbookDetailId).length) { // nếu không có thằng bankbookDetailId đó trong mảng
                        dataAll.push({
                            bankbookDetailId: item.bankbookDetailId,
                            data: dataApi.value.filter((row: any) => row.bankbookDetailId === item.bankbookDetailId)
                        })
                    }
                } else {
                    dataAll.push({
                        bankbookDetailId: index,
                        data: [item]
                    })
                }
            })

            dataSource.value = dataAll
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

        // ================ FUNCTION ============================================
        const getOneRowData = () => {
            if (dataSource.value[0]) { // if table has data source
                if (store.state.common.ac120.statusKeppRow) { // giữ nguyên row
                    store.state.common.ac120.statusKeppRow = false;
                    return
                    // Object.assign(store.state.common.ac120.formData, dataSource.value[0].data[0])
                } else { // lấy row đầu tiên
                    focusedRowKey.value = dataSource.value[0]?.data[0]?.accountingDocumentId
                    store.state.common.ac120.selectedRowKeys = [dataSource.value[0].bankbookDetailId]
                    Object.assign(store.state.common.ac120.formData, dataSource.value[0].data[0])
                }
                store.state.common.ac120.formData.amount = Math.abs(store.state.common.ac120.formData.amount)
                store.state.common.ac120.statusFormAdd = false
            } else {
                focusedRowKey.value = null
                store.state.common.ac120.statusFormAdd = true
                Object.assign(store.state.common.ac120.formData, initialStateFormData)
                store.state.common.ac120.keyRefreshForm++
            }
        }
        const selectionChanged = (data: any) => {
            // gridRefAC120.value?.instance.refresh();
            dataRows.value = []
            data.component.getSelectedRowsData().then((rowData: any) => {
                rowData.map((data: any) => {
                    dataRows.value = dataRows.value.concat(data.data)
                })
                // console.log(dataRows.value);
                // if (rowData.find((element: any) => element.incomeId == "PA510" ?? null)) {
                //     gridRefPA510.value?.instance.deselectAll()
                //     dataRows.value = []
                // }
            })
        }

        const onFocusedRowChanging = (e: any) => {
            // gridRefAC120Detail.value?.instance.refresh()
            if (!(e.event.currentTarget.outerHTML.search("dx-command-select") == -1)) {
                e.cancel = true;
            } else {

                Object.assign(store.state.common.ac120.formData, e.rows[e.newRowIndex]?.data)
                store.state.common.ac120.formData.amount = Math.abs(store.state.common.ac120.formData.amount)
                if (store.state.common.ac120.statusFormAdd && store.state.common.ac120.formData.accountingDocumentId != 'AC120') {
                    deleteRowAdd()
                }
            }
        };

        const deleteRowAdd = async () => {
            await (loadingGetAccountingDocuments.value = true)
            await dataSource.value.pop()
            await gridRefAC120.value?.instance.refresh()
            await (loadingGetAccountingDocuments.value = false)
            await getOneRowData()
        }

        const actionPopupSlipCancellation = (value: any) => {
            if (dataRows.value?.length) {
                statusModalSlipCancellation.value = true
            } else {
                notification('error', Message.getMessage('COMMON', '404').message)
            }
        }

        const actionPopupSlipRegistration = async (value: any) => {
            if (!store.state.common.ac120.statusFormAdd) {
                await addNewRow()
            }
            statusModalSlipRegistrantion.value = true
        }



        const actionPopupItemDetail = (data: any) => {
            statusModalItemDetail.value = true
        }

        const handleConfirmChange = () => {}

        const onReorder = (e: any) => {
            const visibleRows = e.component.getVisibleRows();
            const dataToIndex = dataSource.value.find((item: any) => item.bankbookDetailId === visibleRows[e.toIndex].data.bankbookDetailId);
            const dataFromIndex = dataSource.value.find((item: any) => item.bankbookDetailId === e.itemData.bankbookDetailId);
            if (dataToIndex.data[0].transactionDetailDate === dataFromIndex.data[0].transactionDetailDate) { // cùng date mới cho đổi
                const visibleRows = e.component.getVisibleRows();
                const toIndex = dataSource.value.findIndex((item: any) => item.bankbookDetailId === visibleRows[e.toIndex].data.bankbookDetailId);
                const fromIndex = dataSource.value.findIndex((item: any) => item.bankbookDetailId === e.itemData.bankbookDetailId);
                const newTasks = [...dataSource.value];
                newTasks.splice(fromIndex, 1);
                newTasks.splice(toIndex, 0, e.itemData);
                let indexDocumentOrderByDate = 1
                let dataInputs: any = []
                newTasks.map((item: any) => {
                    if (item.data[0]?.transactionDetailDate == dataToIndex.data[0].transactionDetailDate) { // nếu cùng ngày thì sắp xếp đổi
                        item.data?.map((data: any) => {
                            dataInputs.push({
                                accountingDocumentId: data.accountingDocumentId,
                                documentOrderByDate: indexDocumentOrderByDate
                            })
                            indexDocumentOrderByDate++
                        })
                    }
                })
                reorderAccountingDocuments({
                    companyId: companyId,
                    fiscalYear: acYear.value,
                    facilityBusinessId: globalFacilityBizId.value,
                    transactionDetailDate: dataToIndex.data[0].transactionDetailDate,
                    inputs: dataInputs
                })
            } else {
                notification('error', Message.getMessage('AC120', '003').message)
            }
        }

        const onDragChange = (e: any) => {}

        const onFillDataAdd = (dataAdd: any) => {
            statusModalSlipRegistrantion.value = false; // close popup
        }

        // handle add row
        const addNewRow = async () => {
            await (loadingGetAccountingDocuments.value = true)
            // gridRefAC120.value?.instance.addRow()
            // gridRefAC120.value?.instance.deselectAll()
            store.state.common.ac120.statusFormAdd = true

            await dataSource.value.push({ data: [{ ...initialStateFormData }], bankbookDetailId: 'AC120' })
            // gridRefAC120Detail.value?.instance.refresh()
            await gridRefAC120.value?.instance.refresh()
            // dataSource.value = JSON.parse(JSON.stringify(dataSource.value)).concat({ data: [initialStateFormData], bankbookDetailId: 'AC120' })
            store.state.common.ac120.formData = dataSource.value[dataSource.value.length - 1]?.data[0]

            focusedRowKey.value = 'AC120'

            store.state.common.ac120.keyRefreshForm++
            await (loadingGetAccountingDocuments.value = false)
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
            await (focusedRowKey.value = null)
            await (focusedRowKey.value = e.data.accountingDocumentId)
        }


        // ================ CUSTOM SUMMARY TABLE ============================================
        const customCountRow = () => {
            return `전표 건수: ` + dataApi.value.length
        }
        const sumOfIncome = () => {
            let total = 0;
            dataApi.value.forEach((item: any) => {
                total += item.income;
            });
            return `수입액 합계: ${filters.formatCurrency(total)}`
        }
        const sumOfExpenses = () => {
            let total = 0;
            dataApi.value.forEach((item: any) => {
                total += item.spending;
            });
            return `지출액 합계: ${filters.formatCurrency(total)}`
        }
        const customBalance = () => {
            let total = 0;
            let totalIncome = 0;
            let totalSpending = 0;
            dataApi.value.forEach((item: any) => {
                totalIncome += item.income
                totalSpending += item.spending
            });
            console.log(lastBalance.value);
            console.log(totalIncome);
            console.log(totalSpending);
            
            total = lastBalance.value + totalIncome - totalSpending
            return `전월 잔액: ${filters.formatCurrency(lastBalance.value)}, 예상 잔액: ${filters.formatCurrency(total)}`
        }
        const countResolutionNormalStatus = () => {
            let totalResolutionNormalStatuTrue = 0;
            let totalResolutionNormalStatuFalse = 0;
            dataApi.value.forEach((item: any) => {
                if (item.resolutionNormalStatus) {
                    totalResolutionNormalStatuTrue++
                } else {
                    totalResolutionNormalStatuFalse++
                }
            });
            return `정상 내역 건수: ${filters.formatCurrency(totalResolutionNormalStatuTrue)}, 비정상 내역 건: ${filters.formatCurrency(totalResolutionNormalStatuFalse)}`
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
            heightTable,
            move_column,
            colomn_resize,
            acYear,
            focusedRowKey,
            selectionChanged,

            isModalRetrieveStatements,
            handleConfirmChange,
            contentPopupRetrieveStatements,
            statusModalSlipCancellation,
            statusModalSlipRegistrantion,
            statusModalItemDetail,

            actionPopupItemDetail,
            actionPopupSlipCancellation,
            actionPopupSlipRegistration,

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
