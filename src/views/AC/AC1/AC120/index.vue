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
                            :year="globalYear" :month="month" />
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
                        <HistoryOutlined style="font-size: 18px" @click="modalHistoryAccountingProcess" />
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
                        <HistoryOutlined style="font-size: 18px" @click="modalHistoryAccountingDocuments" />
                    </DxButton>
                    <!-- <HistoryOutlined style="font-size: 18px; margin-left: 5px;" /> -->
                </div>
            </div>
        </div>
        <div class="main">
            <!-- {{ dataSource }} -->
            <div class="data-grid" :style="[store.state.common.ac120.statusShowFull ? {} : { height: heightTable }]">
                <a-spin tip="Loading..." :spinning="loadingGetAccountingDocuments">
                    <!-- <DxDataGrid key-expr="fill1" :show-row-lines="true" :data-source="dataDemoMain"
                    :show-borders="true" :allow-column-reordering="move_column" v-model:focused-row-key="focusedRowKey"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true" @selection-changed="selectionChanged">
                    <DxRowDragging :allow-reordering="true" :show-drag-icons="true" />
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxColumn caption="일자" data-field="fill1" cell-template="fill1" />
                    <template #fill1="{ data }">
                        {{ $filters.formatDate(data.value) }}
                    </template>
                    <DxColumn caption="순번" cell-template="fill2" css-class="custom-column"/>
                    <template #fill2="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <a-tooltip placement="left" title="{은행명} {통장번호} ">
                                <div>{{ item.fill2 }}</div>
                            </a-tooltip>
                        </div>
                    </template>
                    <DxColumn caption="결의번호" cell-template="fill3" css-class="custom-column"/>
                    <template #fill3="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <div>{{ item.fill3 }}</div>
                        </div>
                    </template>
                    <DxColumn caption="통장" cell-template="fill4" css-class="custom-column"/>
                    <template #fill4="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <div>{{ item.fill4 }}</div>
                        </div>
                    </template>
                    <DxColumn caption="결의 구분" cell-template="fill5" css-class="custom-column" />
                    <template #fill5="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <div>{{ item.fill5 }}</div>
                        </div>
                    </template>
                    <DxColumn caption="수입액" cell-template="fill6" css-class="custom-column" />
                    <template #fill6="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <div>{{ item.fill6 }}</div>
                        </div>
                    </template>
                    <DxColumn caption="지출액" cell-template="fill7" css-class="custom-column" />
                    <template #fill7="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <div>{{ item.fill7 }}</div>
                        </div>
                    </template>
                    <DxColumn caption="잔액" cell-template="fill8" css-class="custom-column" />
                    <template #fill8="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <div>{{ item.fill8 }}</div>
                        </div>
                    </template>
                    <DxColumn caption="통장적요" cell-template="fill9" css-class="custom-column" />
                    <template #fill9="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <div>{{ item.fill9 }}</div>
                        </div>
                    </template>
                    <DxColumn caption="적요" cell-template="fill10" css-class="custom-column" />
                    <template #fill10="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <div>{{ item.fill10 }}</div>
                        </div>
                    </template>
                    <DxColumn caption="계정과목" cell-template="fill11" css-class="custom-column" />
                    <template #fill11="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <div>{{ item.fill11 }}</div>
                        </div>
                    </template>
                    <DxColumn caption="상대계정" cell-template="fill12" css-class="custom-column" />
                    <template #fill12="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <div>{{ item.fill12 }}</div>
                        </div>
                    </template>
                    <DxColumn caption="자금원천" cell-template="fill13" css-class="custom-column" />
                    <template #fill13="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <div>{{ item.fill13 }}</div>
                        </div>
                    </template>
                    <DxColumn caption="거래처" cell-template="fill14" css-class="custom-column" />
                    <template #fill14="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <div>{{ item.fill14 }}</div>
                        </div>
                    </template>                    
                    <DxColumn caption="증빙" cell-template="fill15" css-class="custom-column" />
                    <template #fill15="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <div>{{ item.fill15 }}</div>
                        </div>
                    </template>
                    <DxColumn caption="물품 내역" cell-template="normality" css-class="custom-column"/>
                    <template #normality="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <PlusOutlined style="font-size: 12px" @click="actionPopupItemDetail" />
                        </div>
                    </template>
                    <DxColumn caption="수기 여부 " cell-template="slipRegistration" css-class="custom-column"/>
                    <template #slipRegistration="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <div class="slipRegistration">
                                <button-basic :text="item.slipRegistration ? 'O' : 'X'"
                                    :type="item.slipRegistration ? 'success' : 'danger'" :mode="'contained'"
                                    style="margin-right: 5px;" />
                            </div>
                        </div>

                    </template>
                    <DxColumn caption="정상 여부" cell-template="slipRegistration1" css-class="custom-column"/>
                    <template #slipRegistration1="{ data }">
                        <div class="main-row" v-for="(item, index) in data.data.data" :key="index" :class="{ last: index === data.data.data.length - 1 }">
                            <div class="slipRegistration">
                                <button-basic :text="item.slipRegistration ? 'O' : 'X'"
                                    :type="item.slipRegistration ? 'success' : 'danger'" :mode="'contained'"
                                    style="margin-right: 5px;" />
                            </div>
                        </div>
                    </template>
                    <DxSummary>
                        <DxTotalItem column="순번" summary-type="count" display-format="전표 건수: {0}" />
                        <DxTotalItem cssClass="custom-sumary" column="수입액" summary-type="sum"
                            display-format="수입액 합계: {0}" />
                        <DxTotalItem cssClass="custom-sumary" column="지출액" summary-type="sum"
                            display-format="지출액 합계: {0}" />
                        <DxTotalItem cssClass="custom-sumary" column="잔액" :customize-text="count8" />
                        <DxTotalItem cssClass="custom-sumary" column="정상 여부" :customize-text="countSlipRegistration" />
                    </DxSummary>
                </DxDataGrid> -->
                    <!-- {{ dataSource }} -->
                    <DxDataGrid id="dataGridAc120" key-expr="accountingDocumentId" :show-row-lines="true"
                        :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true" :focused-row-enabled="true"
                        @focused-row-changing="onFocusedRowChanging" ref="gridRefAC120"
                        :allow-column-reordering="move_column" v-model:focused-row-key="focusedRowKey"
                        :allow-column-resizing="colomn_resize" :column-auto-width="true"
                        @selection-changed="selectionChanged">
                        <DxRowDragging :allow-reordering="true" :show-drag-icons="true" :on-reorder="onReorder"
                            :on-drag-change="onDragChange" :allowDropInsideItem="true" :onRowDragging="onRowDragging" />
                        <DxSelection :deferred="true" select-all-mode="allPages" show-check-boxes-mode="onClick"
                            mode="multiple" />
                        <DxScrolling mode="standard" show-scrollbar="always" />
                        <DxColumn caption="일자" data-field="transactionDetailDate" cell-template="transactionDetailDate" />
                        <template #transactionDetailDate="{ data }">
                            {{ $filters.formatDate(data.value) }}
                        </template>
                        <DxColumn caption="순번" data-field="documentOrderByDate" />
                        <DxColumn caption="결의번호" data-field="resolutionNumber" />
                        <DxColumn caption="통장" cell-template="bankbook" data-field="bankbook" />
                        <template #bankbook="{ data }">
                            <a-tooltip placement="left" :title="data.data.bankbook?.type + ' ' + data.data.bankbook?.bankbookNumber">
                                <div>{{ data.data.bankbook?.bankbookNickname }}</div>
                            </a-tooltip>
                        </template>

                        <DxColumn caption="결의 구분" data-field="resolutionClassification" />
                        <DxColumn caption="수입액" data-field="income" />
                        <DxColumn caption="지출액" data-field="spending" format="fixedPoint" />
                        <DxColumn caption="잔액" cell-template="balance" format="fixedPoint" />
                        <template #balance="{ data }">
                            {{ $filters.formatCurrency(data.data.lastBalance + data.data.spending - data.data.balance) }}
                        </template>
                        <DxColumn caption="통장적요" data-field="summaryOfBankbookDetail" format="fixedPoint" />
                        <DxColumn caption="적요" data-field="summary" format="fixedPoint" />
                        <DxColumn caption="계정과목" data-field="accountCode" cell-template="accountCode" width="200px"/>
                        <template #accountCode="{ data }">
                            <account-code-select :valueInput="data.data.accountCode" :disabled="true" />
                            <!-- <account-code-select :disabled="true" /> -->
                        </template>
                        <DxColumn caption="상대계정" data-field="relationCode" cell-template="relationCode" width="150px"/>
                        <template #relationCode="{ data }">
                            <account-code-select :valueInput="data.data.relationCode" :disabled="true" />
                            <!-- <account-code-select :disabled="true" /> -->
                        </template>

                        <DxColumn caption="자금원천" data-field="fundingSource" />
                        <DxColumn caption="거래처" data-field="clientId" cell-template="clientId"/>
                        <template #clientId="{ data }">
                            {{ clients.find((item: any) => item.value == data.data.clientId)?.label }}
                        </template>
                        <DxColumn caption="증빙" data-field="proofCount" format="fixedPoint" />

                        <DxColumn caption="물품 내역" cell-template="normality" css-class="cell-center" />
                        <template #normality="{ data }">
                            <PlusOutlined v-if="data.data.resolutionClassification != 1" class="icon-add"
                                @click="actionPopupItemDetail(data.data)" />
                        </template>
                        <DxColumn caption="수기 여부" cell-template="slipRegistration" />
                        <template #slipRegistration="{ data }">
                            <div class="slipRegistration">
                                <DxButton :focusStateEnabled="false" :text="data.data.handwriting ? 'O' : 'X'"
                                        :style="{ backgroundColor: data.data.handwriting ? '#337614' : '#BB3835', color: 'white' }"
                                        :height="$config_styles.HeightInput" />
                                <!-- <button-basic :text="data.data.handwriting ? 'O' : 'X'"
                                    :type="data.data.handwriting ? 'success' : 'danger'" :mode="'contained'"
                                    style="margin-right: 5px;" /> -->
                            </div>
                        </template>
                        <DxColumn caption="정상 여부" cell-template="slipRegistration1" />
                        <template #slipRegistration1="{ data }">
                            <div class="slipRegistration">
                                <DxButton :focusStateEnabled="false" :text="data.data.resolutionNormalStatus ? 'O' : 'X'"
                                        :style="{ backgroundColor: data.data.resolutionNormalStatus ? '#337614' : '#BB3835', color: 'white' }"
                                        :height="$config_styles.HeightInput" />
                                <!-- <button-basic :text="data.data.resolutionNormalStatus ? 'O' : 'X'"
                                    :type="data.data.resolutionNormalStatus ? 'success' : 'danger'" :mode="'contained'"
                                    style="margin-right: 5px;" /> -->
                            </div>
                        </template>
                        <DxSummary>
                            <DxTotalItem column="순번" summary-type="count" display-format="전표 건수: {0}" />
                            <DxTotalItem cssClass="custom-sumary" column="수입액" summary-type="sum"
                                display-format="수입액 합계: {0}" />
                            <DxTotalItem cssClass="custom-sumary" column="지출액" summary-type="sum"
                                display-format="지출액 합계: {0}" />
                            <DxTotalItem cssClass="custom-sumary" column="잔액" :customize-text="customBalance" />
                            <DxTotalItem cssClass="custom-sumary" column="정상 여부"
                                :customize-text="countResolutionNormalStatus" />
                        </DxSummary>
                    </DxDataGrid>
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
import { dataDemoMain, dataDemoMain2, contentPopupRetrieveStatements, initialStateFormData } from "./utils/index"
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
        const heightTable: any = ref('520px')

        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const globalYear = computed(() => store.state.settings.globalYear)
        const globalFacilityBizId = computed(() => store.state.settings.globalFacilityBizId)
        const clients = computed(() => store.state.settings.clients)

        // let statusAdjusting = ref(30);
        let focusedRowKey = ref()

        let isModalRetrieveStatements = ref(false);
        let statusModalSlipCancellation = ref(false);
        let statusModalSlipRegistrantion = ref(false);

        let statusModalItemDetail = ref(false);

        const popupData = ref({});
        const modalHistoryStatusAccountingProcess = ref<boolean>(false);
        const modalHistoryStatuAccountingDocuments = ref<boolean>(false);

        const dataRows: any = ref([])

        let arraySelectBox = reactive([
            {
                value: 1,
                label: '수익사업'
            },
            {
                value: 2,
                label: '자부담'
            },
            {
                value: 3,
                label: '보조금'
            },
            {
                value: 4,
                label: '후원듬'
            }
        ])

        store.state.common.ac120.formData = reactive({ ...initialStateFormData })
        const lastBalance = ref<number>(0)
        const dataGetAccountingProcesses = ref<any>([])
        const dataSource = ref<any>([])

        const triggerGetAccountingProcesses = ref<boolean>(true)
        const triggerGetAccountingDocuments = ref<boolean>(true)
        const dataQueryGetAccountingProcesses = ref({
            companyId: companyId,
            fiscalYear: globalYear.value,
            facilityBusinessId: globalFacilityBizId.value
        })
        const dataQueryGetAccountingDocuments = ref({
            companyId: companyId,
            fiscalYear: globalYear.value,
            facilityBusinessId: globalFacilityBizId.value,
            year: globalYear.value,
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
            mutate: rorderAccountingDocuments, onDone: doneRorderAccountingDocuments, onError: errorRorderAccountingDocuments,
        } = useMutation(mutations.reorderAccountingDocuments);

        // ============== ON DONE MUTATION GRAPHQL ===============
        // reorderAccountingDocuments
        doneRorderAccountingDocuments((e) => {
            notification('success', Message.getMessage('COMMON', '106').message)
        })
        errorRorderAccountingDocuments(e => {
            notification('error', e.message)
        })

        // ================== WATCH ================
        // 1. getAccountingProcesses
        watch(resGetAccountingProcesses, (value) => {
            console.log(dayjs().startOf('month').toDate());

            triggerGetAccountingProcesses.value = false
            dataGetAccountingProcesses.value = value.getAccountingProcesses
        })
        // 2. getAccountingDocuments
        watch(resGetAccountingDocuments, (value) => {
            triggerGetAccountingDocuments.value = false
            dataSource.value = value.getAccountingDocuments?.accountingDocuments
            lastBalance.value = value.getAccountingDocuments?.lastBalance
            if (dataSource.value[0]) { // if table has data source
                focusedRowKey.value = dataSource.value[0].accountingDocumentId
                Object.assign(store.state.common.ac120.formData, dataSource.value[0])
                store.state.common.ac120.statusFormAdd = false
            } else {
                focusedRowKey.value = null
                store.state.common.ac120.statusFormAdd = true
                Object.assign(store.state.common.ac120.formData, initialStateFormData)
                store.state.common.ac120.keyRefreshForm++
            }

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
        const selectionChanged = (data: any) => {
            data.component.getSelectedRowsData().then((rowData: any) => {
                dataRows.value = rowData
                // if (rowData.find((element: any) => element.incomeId == "PA510" ?? null)) {
                //     gridRefPA510.value?.instance.deselectAll()
                //     dataRows.value = []
                // }
            })
        }

        const onFocusedRowChanging = (e: any) => {
            if (!(e.event.currentTarget.outerHTML.search("dx-command-select") == -1)) {
                e.cancel = true;
            } else {
                // store.state.common.ac120.dataRowFocus = e.rows[e.newRowIndex]?.data
                Object.assign(store.state.common.ac120.formData, e.rows[e.newRowIndex]?.data)
                if (store.state.common.ac120.statusFormAdd && store.state.common.ac120.formData.accountingDocumentId != 'AC120') {
                    deleteRowAdd()
                }
                const rowElement = e.rowElement[0]
                // store.state.common.pa110.dataRowOnActive = e.rows[e.newRowIndex]?.data
                // if (store.state.common.pa110.dataRowOnActive.employeeId) { // if row data (not row add)
                //     if ((store.state.common.pa110.statusChangeFormEdit && !store.state.common.pa110.statusFormAdd) || (store.state.common.pa110.statusChangeFormAdd && store.state.common.pa110.statusFormAdd)) { // if change form data
                //         rowElement?.classList.add("dx-state-hover-custom")
                //         modalChangeRow.value = true;
                //         e.cancel = true;
                //     } else { // cho chọn raw mới
                //         if (store.state.common.pa110.dataTaxPayInfo[store.state.common.pa110.dataTaxPayInfo.length - 1]?.employee.employeeId == null) {
                //             store.state.common.pa110.dataTaxPayInfo = store.state.common.pa110.dataTaxPayInfo.splice(0, store.state.common.pa110.dataTaxPayInfo.length - 1)
                //             store.state.common.pa110.statusRowAdd = true
                //         }
                //         store.state.common.pa110.incomeId = e.rows[e.newRowIndex]?.data?.incomeId
                //         store.state.common.pa110.selectedRowKeys = [e.rows[e.newRowIndex]?.data.incomeId]
                //         dataGridRef.value?.refresh();
                //         store.state.common.pa110.loadingFormData++
                //         if (store.state.common.pa110.statusRowAdd) {
                //             store.state.common.pa110.statusFormAdd = false
                //         }
                //     }
                // }
            }
        };

        const deleteRowAdd = () => {
            store.state.common.ac120.statusFormAdd = false;
            dataSource.value = dataSource.value.splice(0, dataSource.value.length - 1)
        }

        const totalDeposits = () => {
            let total = 0;
            dataDemoMain.forEach((item: any) => {
                total += item.fill6;
            });
            return `입금액 합계: ${total}`
        };

        const totalWithdrawal = () => {
            let total = 0;
            dataDemoMain.forEach((item: any) => {
                total += item.fill7;
            });
            return `출금액 합계: ${total}`
        };

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
            return `정상 내역 건수: ${filters.formatCurrency(totalResolutionNormalStatuTrue)},
             비정상 내역 건: ${filters.formatCurrency(totalResolutionNormalStatuFalse)}`
        };
        const customBalance = () => {
            let total = 0;
            let totalIncome = 0;
            let totalSpending = 0;
            dataSource.value.forEach((item: any) => {
                totalIncome += item.income
                totalSpending += item.spending
            });
            total = lastBalance.value + totalIncome - totalSpending
            return `전월 잔액: ${filters.formatCurrency(lastBalance.value)}, 예상 잔액: ${filters.formatCurrency(total)}`
        }


        const actionPopupSlipCancellation = (value: any) => {
            if (dataRows.value?.length) {
                statusModalSlipCancellation.value = true
            } else {
                notification('error', Message.getMessage('COMMON', '404').message)
            }

        }

        const actionPopupSlipRegistration = (value: any) => {
            statusModalSlipRegistrantion.value = true
            if (!store.state.common.ac120.statusFormAdd) {
                addNewRow()
            }
        }



        const actionPopupItemDetail = (data: any) => {
            console.log(data);

            // store.state.common.ac120.dataRowFocus = data
            statusModalItemDetail.value = true
        }

        const handleConfirmChange = () => {

        }

        // const openPopupRetrieveStatements = (value: any) => {
        //     isModalRetrieveStatements.value = true
        // }



        const sumOfIncome = () => {
            let total = 0;
            dataDemoMain.forEach((item: any) => {
                total += item.fill6;
            });
            return `수입액 합계: ${total}`
        }

        const sumOfExpenses = () => {
            let total = 0;
            dataDemoMain.forEach((item: any) => {
                total += item.fill7;
            });
            return `지출액 합계: ${total}`
        }

        const onReorder = (e: any) => {
            console.log(e);
            if (e.toIndex >= dataDemoMain2.length) {
                e.toIndex = dataDemoMain2.length - 1;
            }
            if (e.fromIndex !== e.toIndex) {
                const item = dataDemoMain2[e.fromIndex];
                dataDemoMain2.splice(e.fromIndex, 1);
                dataDemoMain2.splice(e.toIndex, 0, item);
            }
        }

        const onDragChange = (e: any) => {
            // console.log(e);

        }

        const onRowDragging = (e: any) => {
            console.log(e);

            if (e.toIndex >= dataDemoMain2.length) {
                e.toIndex = dataDemoMain2.length - 1;
            }
            if (e.fromIndex !== e.toIndex) {
                const item = dataDemoMain2[e.fromIndex];
                dataDemoMain2.splice(e.fromIndex, 1);
                dataDemoMain2.splice(e.toIndex, 0, item);
            }
        }

        const onFillDataAdd = (dataAdd: any) => {
            statusModalSlipRegistrantion.value = false; // close popup

            // Object.assign(store.state.common.ac120.formData, initialStateFormData);

            // if (!store.state.common.ac120.statusFormAdd) {
            //     store.state.common.ac120.formData = reactive({ ...initialStateFormData })
            //     // Object.assign(store.state.common.ac120.formData, dataAdd);
            //     store.state.common.ac120.statusFormAdd = true;
            //     addNewRow(store.state.common.ac120.formData)
            // } else {
            //     // Object.assign(store.state.common.ac120.formData, dataAdd);
            // }
        }


        // handle add row
        const addRow = () => {

        };

        const addNewRow = () => {
            store.state.common.ac120.statusFormAdd = true
            dataSource.value = JSON.parse(JSON.stringify(dataSource.value)).concat({ ...initialStateFormData })
            store.state.common.ac120.formData = dataSource.value[dataSource.value.length - 1]
            focusedRowKey.value = 'AC120';
            store.state.common.ac120.keyRefreshForm++
        }



        const selectedMonth = (month: number) => {
            console.log(month);
            store.state.common.ac120.monthSelected = month
            dataQueryGetAccountingDocuments.value.month = month
            triggerGetAccountingDocuments.value = true;

        }

        const modalHistoryAccountingProcess = () => {
            popupData.value = { ...dataQueryGetAccountingDocuments.value }
            console.log(popupData.value);

            modalHistoryStatusAccountingProcess.value = true
        }

        const modalHistoryAccountingDocuments = () => {
            popupData.value = { ...dataQueryGetAccountingDocuments.value }
            modalHistoryStatuAccountingDocuments.value = true
        }

        return {
            dataGetAccountingProcesses,
            dataSource,
            onFillDataAdd,
            loadingGetAccountingProcesses,
            loadingGetAccountingDocuments,
            dataRows,
            onFocusedRowChanging,
            // onSubmit,
            // refFormAC120,

            store,
            // refCssForm,
            //  refCssTable,
            heightTable,
            // statusEntering,
            // statusInput,
            // statusAdjusting,
            // statusAdjusted,
            move_column,
            colomn_resize,
            globalYear,
            focusedRowKey,
            selectionChanged,
            dataDemoMain,
            // fileList,
            totalDeposits,
            totalWithdrawal,
            countResolutionNormalStatus,
            isModalRetrieveStatements,
            Message,
            handleConfirmChange,
            // openPopupRegistration,
            // openPopupRetrieveStatements,
            contentPopupRetrieveStatements,
            statusModalSlipCancellation,
            statusModalSlipRegistrantion,
            // statusPopupCopyData,
            statusModalItemDetail,
            // actionPopupCopyData,
            sumOfIncome,
            sumOfExpenses,
            arraySelectBox,

            actionPopupItemDetail,

            actionPopupSlipCancellation,
            actionPopupSlipRegistration,
            // arrayRadioCheck,
            customBalance,
            dataDemoMain2,
            onReorder, onDragChange, onRowDragging,

            // monthSelected,
            selectedMonth,
            modalHistoryAccountingProcess, modalHistoryAccountingDocuments,
            modalHistoryStatusAccountingProcess,
            modalHistoryStatuAccountingDocuments,
            popupData,
            clients,
        };
    },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
