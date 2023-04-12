<template>
  <action-header title="통장내역" :buttonDelete="false" />
  <div class="ac-110">
    <div class="ac-110__top">
      <div v-if="listAccountingProcesses.length" class="ac-110__top-grid">
        <div v-for="(item, index) in listAccountingProcesses" :key="index" class="ac-110__top-grid-items"
          :class="{ 'ac-110__top-grid-items-active': monthSelected === item.month }" @click="selectedMonth(item.month)">
          <div class="ac-110__top-grid-items-month">
            <span class="">{{ item.month }}</span>
            <span class="">월</span>
          </div>
          <ProcessStatus :disabled="true" :valueStatus="item.status" :heightBtn="36" />
        </div>
      </div>
      <div class="ac-110__top-flex">
        <div class="ac-110__top-flex-action">
          <ProcessStatus :valueStatus="statusAdjusting" :disabled="true" />
          <HistoryOutlined style="font-size: 18px; margin-left: 5px;" @click="modalHistoryAccountingProcessLogs" />
        </div>
        <div class="ac-110__top-flex-action">
          <button-basic :text="'통장내역 불러오기'" :type="'default'" :mode="'contained'"
            @onClick="openPopupRetrieveStatements" />
          <button-basic :text="'☑전표등록'" :type="'default'" :mode="'contained'" style="margin-left: 5px;"
            @onClick="openPopupSlipRegistrationSelected" :disabled="!selectedRowKeys.length" />
          <HistoryOutlined style="font-size: 18px; margin-left: 5px;" @click="modalHistory" />
        </div>
      </div>
    </div>
    <div class="ac-110__main">
      <div class="ac-110__main-main">
        <a-spin :spinning="loadingGetBankbookDetails" size="large">
          <DxDataGrid key-expr="bankbookId" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
            v-model:selected-row-keys="selectedRowKeys" :show-borders="true" :allow-column-reordering="move_column"
            v-model:focused-row-key="rowKeyfocused" :focused-row-enabled="true" :allow-column-resizing="colomn_resize"
            :column-auto-width="true" @selection-changed="selectionChanged" @focused-row-changing="onFocusedRowChanging">
            <DxScrolling mode="standard" show-scrollbar="always" />
            <DxSelection mode="multiple" :fixed="true" show-check-boxes-mode="onClick" :deferred="false" />
            <DxColumn caption="통장" cell-template="nickName" />
            <template #nickName="{ data }">
              <a-tooltip placement="left"
                :title="`${getNameBankType(data.data.bankbook.type)} ${data.data.bankbook.bankbookNumber}`">
                <div>{{ data.data.bankbook.bankbookNickname }}</div>
              </a-tooltip>
            </template>
            <DxColumn caption="통장용도" data-field="bankbook.useType">
              <DxLookup :data-source="bankbookUseType" value-expr="value" display-expr="label" />
            </DxColumn>
            <DxColumn caption="일자" data-field="bankbookDetailDate" />
            <DxColumn caption="통장적요" data-field="summary" />
            <DxColumn caption="내용|비고" cell-template="content" />
            <template #content="{ data }">
              <div>
                {{ data.data.content }} {{ data.data.note }}
              </div>
            </template>
            <DxColumn caption="입금액" data-field="deposit" format="fixedPoint" />
            <DxColumn caption="출금액" data-field="withdraw" format="fixedPoint" />
            <DxColumn caption="통장잔액" data-field="balance" format="fixedPoint" />
            <DxColumn caption="증빙" data-field="proofCount" />
            <DxColumn caption="거래내역" data-field="transactionDetailsCount" />
            <DxColumn caption="정상여부" cell-template="normalTransactionDetails" width="80" />
            <template #normalTransactionDetails="{ data }">
              <button-basic :text="data.data.normalTransactionDetails ? 'O' : 'X'"
                :type="data.data.normalTransactionDetails ? 'success' : 'danger'" :mode="'contained'" />
            </template>
            <DxColumn caption="전표등록" cell-template="documentRegistered" width="200" />
            <template #documentRegistered="{ data }">
              <div class="ac-110__main-main-slipRegistration">
                <button-basic :text="data.data.documentRegistered ? 'O' : 'X'"
                  :type="data.data.documentRegistered ? 'success' : 'danger'" :mode="'contained'"
                  style="margin-right: 5px;" />
                <button-basic :text="data.data.documentRegistered ? '전표취소' : '전표등록'" :type="'default'" :mode="'contained'"
                  @onClick="openPopupRegistration(data.data)" />
              </div>
            </template>

            <DxSummary>
              <DxTotalItem column="통장" summary-type="count" display-format="통장내역수: {0}" />
              <DxTotalItem cssClass="custom-sumary" column="입금액" :customize-text="totalDeposits" />
              <DxTotalItem cssClass="custom-sumary" column="출금액" :customize-text="totalWithdrawal" />
              <DxTotalItem cssClass="custom-sumary" column="전표등록" :customize-text="countSlipRegistration" />
            </DxSummary>
          </DxDataGrid>
        </a-spin>
      </div>
      <div class="ac-110__main-detail">
        <div class="ac-110__main-detail-detail1">
          <div class="ac-110__main-detail-detail1-title">
            <b>거래내역-</b><span v-if="!!bankbookSelected">{{ bankbookSelected.bankbook.bankbookNickname }} {{
              getNameBankBookUseType(bankbookSelected.bankbook.useType) }}</span>
            <b style="margin-right: 5px;">-정상여부: </b>
            <button-basic v-if="!!bankbookSelected" :text="bankbookSelected.normalTransactionDetails ? 'O' : 'X'"
              :type="bankbookSelected.normalTransactionDetails ? 'success' : 'danger'" :mode="'contained'" />
          </div>
          <a-spin :spinning="loadingGetTransactionDetails" size="large">
            <standard-form>
              <DxDataGrid key-expr="transactionDetails.theOrder" :show-row-lines="true" :hoverStateEnabled="true"
                :data-source="dataSourceTransactionDetails" :show-borders="true" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true">
                <DxScrolling mode="standard" show-scrollbar="always" />
                <DxExport :enabled="true" />
                <DxToolbar>
                  <DxItem template="summary-transaction-detail" css-class="cell-button-export" location="before" />
                  <DxItem template="button-reset" css-class="cell-button-export" />
                  <DxItem location="after" template="button-add" css-class="cell-button-add" />
                  <DxItem template="button-save" css-class="cell-button-export" />
                </DxToolbar>

                <template #summary-transaction-detail>
                  <div class="ac-110__main-detail-detail1-summary">
                    <div class="ac-110__main-detail-detail1-summary-quantity">
                      <p class="ac-110__main-detail-detail1-summary-label">거래내역수:</p>
                      <p class="ac-110__main-detail-detail1-summary-value">{{ totalTransactions() }}</p>
                    </div>
                    <div class="ac-110__main-detail-detail1-summary-income">
                      <p class="ac-110__main-detail-detail1-summary-label">수입액 합계:</p>
                      <p class="ac-110__main-detail-detail1-summary-value">{{ sumOfIncome() }}</p>
                    </div>
                    <div class="ac-110__main-detail-detail1-summary-expenses">
                      <p class="ac-110__main-detail-detail1-summary-label">지출액 합계:</p>
                      <p class="ac-110__main-detail-detail1-summary-value">{{ sumOfExpenses() }}</p>
                    </div>
                  </div>
                </template>
                <template #button-reset>
                  <button-basic text="초기화" type="default" :mode="'contained'"
                    @onClick="handleInitializeTransactionDetails" />
                </template>
                <template #button-add>
                  <a-tooltip placement="top">
                    <template #title>신규</template>
                    <div>
                      <DxButton :focusStateEnabled="false" icon="plus" @click="addNewRowTransactionDetails" />
                    </div>
                  </a-tooltip>
                </template>
                <template #button-save>
                  <a-tooltip placement="top">
                    <template #title>신규</template>
                    <DxButton :focusStateEnabled="false" @click="submitTransactionDetails($event)">
                      <SaveFilled style="font-size: 19px;" />
                    </DxButton>
                  </a-tooltip>
                </template>
                <DxColumn caption="결의구분" cell-template="resolutionClassification" />
                <template #resolutionClassification="{ data }">
                  {{ data.data.transactionDetails.bankbookId !== null ? resolutionClassification.find((item: any) =>
                    item.value ==
                    data.data.transactionDetails.resolutionClassification).label : '' }}
                </template>
                <DxColumn caption="수입액" data-field="transactionDetails.income" format="fixedPoint" alignment="end" />
                <DxColumn caption="지출액" data-field="transactionDetails.spending" format="fixedPoint" alignment="end" />
                <DxColumn caption="적요" data-field="transactionDetails.summary" />
                <DxColumn caption="계정과목" cell-template="accountCode" width="200" />
                <template #accountCode="{ data }">
                  <account-code-select v-model:valueInput="data.data.transactionDetails.accountCode"
                    :classification="data.data.transactionDetails.income !== 0 ? [4] : [5]" />
                </template>
                <DxColumn caption="상대계정" cell-template="relationCode" width="200" />
                <template #relationCode="{ data }">
                  <account-code-select v-model:valueInput="data.data.transactionDetails.relationCode"
                    :classification="data.data.transactionDetails.resolutionClassification === 2 ? [4] : [11111]"
                    :disabled="data.data.transactionDetails.resolutionClassification === 1" />
                </template>
                <DxColumn caption="자금원천" cell-template="fundingSource" width="120" />
                <template #fundingSource="{ data }">
                  <FundingSourceSelect v-model:valueInput="data.data.transactionDetails.fundingSource" :required="true" />
                </template>
                <DxColumn caption="거래처" data-field="transactionDetails.clientId" alignment="start" />
                <DxColumn caption="품의종류" cell-template="letterOfApprovalType" width="100" />
                <template #letterOfApprovalType="{ data }">
                  <LetterOfApprovalTypeSelect v-model:valueInput="data.data.transactionDetails.letterOfApprovalType"
                    :disabled="data.data.transactionDetails.resolutionClassification === 1"
                    :required="data.data.transactionDetails.resolutionClassification === 2" />
                </template>
                <DxColumn caption="원인/용도" cell-template="causeUsage" alignment="center" />
                <template #causeUsage="{ data }">
                  <div
                    :class="{ 'disable-button-edit-add': data.data.transactionDetails.resolutionClassification === 1 }">
                    <EditOutlined v-if="data.data.content.length" style="font-size: 12px"
                      @click="openPopupNoteItemDetail(data, 'causeUsage')" />
                    <PlusOutlined v-else style="font-size: 12px" @click="openPopupItemDetail(data.data)" />
                  </div>
                </template>
                <DxColumn caption="물품내역" cell-template="goodsCount" alignment="center" />
                <template #goodsCount="{ data }">
                  <PlusOutlined v-if="!data.data.content.length" style="font-size: 12px"
                    @click="openPopupItemDetail(data.data)" />
                  <div v-else>{{ data.data.transactionDetails.goodsCount }}</div>
                </template>
                <DxColumn caption="메모" cell-template="memo" alignment="center" />
                <template #memo="{ data }">
                  <div
                    :class="{ 'disable-button-edit-add': data.data.transactionDetails.resolutionClassification === 1 }">
                    <EditOutlined v-if="data.data.content.length" style="font-size: 12px"
                      @click="openPopupNoteItemDetail(data, 'memo')" />
                    <PlusOutlined v-else style="font-size: 12px" @click="openPopupItemDetail(data.data)" />
                  </div>
                </template>
              </DxDataGrid>
            </standard-form>
          </a-spin>
        </div>
        <div class="ac-110__main-detail-detail2">
          <div class="ac-110__main-detail-detail2-upload">
            <UploadPreviewImage v-model:list-image-file="fileList" width="385"
              :payLoadProofs="payloadGetTransactionDetails" />
          </div>
        </div>
      </div>
    </div>
    <PopupRetrieveStatements :isModalRetrieveStatements="isModalRetrieveStatements"
      @closePopup="isModalRetrieveStatements = false" :title="''" :content="contentPopupRetrieveStatements"
      :okText="'네. 불러옵니다'" :cancelText="'아니요'" @confirm="handleConfirmRetrieveStatements" />
    <PopupSlipRegistrationSelected :isModalSlipRegistrationSelected="isModalSlipRegistrationSelected"
      :propListSlipRegistrationSelected="propListSlipRegistrationSelected"
      @closePopup="isModalSlipRegistrationSelected = false" @submit="handleConfirmSlipRegistrationSelected" />
    <PopupSlipCancellation :isModalSlipCancellation="isModalSlipCancellation"
      :transactionDetailsCountSelected="transactionDetailsCountSelected" @closePopup="isModalSlipCancellation = false"
      @submit="handleConfirmSlipCancellation" />
    <PopupSlipRegistration :isModalSlipRegistrantion="isModalSlipRegistrantion"
      :transactionDetailsCountSelected="transactionDetailsCountSelected" @closePopup="isModalSlipRegistrantion = false"
      @submit="handleSlipRegistration" />
    <PopupItemDetails :isModalItemDetail="isModalItemDetail" :data="dataStatementOfGoodsItems"
      :payload="payloadGetTransactionDetails" @closePopup="isModalItemDetail = false"
      @submit="isModalItemDetail = false" />
    <PopupNoteItemDetail :isModalNoteItemDetail="isModalNoteItemDetail" :transactionSelected="transactionSelected"
      @closePopup="isModalNoteItemDetail = false" @submit="updateNoteValue" />
    <HistoryPopup :modalStatus="isModalHistory" @closePopup="isModalHistory = false" title="변경이력" :idRowEdit="idRowEdit"
      typeHistory="ac-110-bankbook" :data="payloadGetTransactionDetails" />
    <HistoryPopup :modalStatus="isModalHistoryAccountingProcessLogs"
      @closePopup="isModalHistoryAccountingProcessLogs = false" title="변경이력" :idRowEdit="idRowEdit"
      typeHistory="ac-110-accounting" :data="payloadGetAccountingProcessLogs" />
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, computed, watch, onMounted } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC1/AC110";
import mutations from "@/graphql/mutations/AC/AC1/AC110";
import { companyId, makeDataClean } from "@/helpers/commonFunction"
import ProcessStatus from "@/components/common/ProcessStatus.vue"
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxToolbar, DxExport, DxLookup } from "devextreme-vue/data-grid";
import { HistoryOutlined, EditOutlined, PlusOutlined, SaveFilled } from "@ant-design/icons-vue";
import { contentPopupRetrieveStatements, InitTransactionDetails } from "./utils/index"
import { Message } from "@/configs/enum"
import notification from '@/utils/notification';
import DxButton from "devextreme-vue/button";
import PopupSlipCancellation from "./components/PopupSlipCancellation.vue"
import PopupSlipRegistration from "./components/PopupSlipRegistration.vue"
import PopupSlipRegistrationSelected from "./components/PopupSlipRegistrationSelected.vue"
import PopupItemDetails from "./components/PopupItemDetails.vue"
import PopupNoteItemDetail from "./components/PopupNoteItemDetail.vue"
import PopupRetrieveStatements from "./components/PopupRetrieveStatements.vue"
import UploadPreviewImage from './components/UploadPreviewImage.vue'
import { BankType, enum2Entries, BankBookUseType, ResolutionClassification } from "@bankda/jangbuda-common";
import HistoryPopup from "@/components/HistoryPopup.vue";

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
    PopupSlipRegistrationSelected,
    EditOutlined,
    PlusOutlined,
    PopupItemDetails,
    DxButton,
    DxToolbar,
    DxExport,
    PopupNoteItemDetail,
    PopupRetrieveStatements,
    UploadPreviewImage,
    DxLookup,
    HistoryPopup,
    SaveFilled
  },
  setup() {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const globalYear = computed(() => store.state.settings.globalYear)
    const globalFacilityBizId = computed(() => store.state.settings.globalFacilityBizId)
    const bankType = BankType.all();
    const bankbookUseType: any = computed(() => {
      let bsDeduction: any = enum2Entries(BankBookUseType).map((value) => ({
        value: value[1],
        label: value[0],
      }));
      return bsDeduction;
    });
    const resolutionClassification: any = computed(() => {
      let bsDeduction: any = enum2Entries(ResolutionClassification).map((value) => ({
        value: value[1],
        label: value[0],
      }));
      return bsDeduction;
    });
    const propListSlipRegistrationSelected: any = ref({
      count: 0,
      selectedRowKeys: []
    })
    let transactionDetailsCountSelected = ref(0)
    // trigger
    let triggerAccountingProcesses = ref<boolean>(true)
    let triggerBankbookDetails = ref<boolean>(true)
    let triggerTransactionDetails = ref<boolean>(false)

    let listAccountingProcesses = ref<any>([])
    let statusEntering = ref(10);
    let statusInput = ref(20);
    let statusAdjusting = ref(30);
    let statusAdjusted = ref(40);
    let selectedRowKeys = ref<any>([])
    let rowKeyfocused = ref()
    let firstLoad = ref<boolean>(true)
    let dataSource = ref<any[]>([])
    let dataSourceTransactionDetails = ref<any[]>([])
    let fileList = ref<any[]>([])
    let isModalRetrieveStatements = ref(false);
    let isModalSlipCancellation = ref(false);
    let isModalSlipRegistrantion = ref(false);
    let isModalSlipRegistrationSelected = ref(false);
    let isModalItemDetail = ref(false);
    let isModalNoteItemDetail = ref(false);
    let transactionSelected: any = ref()
    let dataStatementOfGoodsItems: any = ref()
    let monthSelected: any = ref(3)
    watch(() => fileList.value, (value) => {
    }, {
      deep: true,
    })

    let valueAccountSubjectClassification = ref(null)
    let valueFundingSource = ref(null)
    const payloadGetTransactionDetails: any = reactive({
      companyId: companyId,
      fiscalYear: globalYear.value,
      facilityBusinessId: globalFacilityBizId.value,
      bankbookDetailDate: null,
      bankbookDetailId: null,
    })
    const payloadGetAccountingProcessLogs: any = reactive({
      companyId: companyId,
      fiscalYear: globalYear.value,
      facilityBusinessId: globalFacilityBizId.value,
      year: globalYear.value,
      month: monthSelected.value
    })
    const isModalHistory = ref<boolean>(false);
    const isModalHistoryAccountingProcessLogs = ref<boolean>(false);
    let idRowEdit = ref<number>(0);
    // COMPUTED
    const bankbookSelected = computed(() => dataSource.value.find(item => item.bankbookId === rowKeyfocused.value))
    // -------------- GRAPHQL --------------
    // queries
    const {
      result: resAccountingProcesses,
      // onResult: onResAccountingProcesses,
      loading: loadingGetAccountingProcesses,
      // refetch,
      // onError
    } = useQuery(queries.getAccountingProcesses, {
      companyId: companyId,
      fiscalYear: globalYear.value,
      facilityBusinessId: globalFacilityBizId.value
    },
      () => ({
        enabled: triggerAccountingProcesses.value,
        fetchPolicy: "no-cache",
      }))
    const {
      result: resBankbookDetails,
      // onResult: onResBankbookDetails,
      loading: loadingGetBankbookDetails,
      onError: errorGetBankbookDetails
    } = useQuery(queries.getBankbookDetails, {
      companyId: companyId,
      fiscalYear: globalYear.value,
      facilityBusinessId: globalFacilityBizId.value,
      year: globalYear.value,
      month: monthSelected.value
    },
      () => ({
        enabled: triggerBankbookDetails.value,
        fetchPolicy: "no-cache",
      }))
    errorGetBankbookDetails(e => {
      notification('error', e.message)
      triggerBankbookDetails.value = false
    })
    const {
      result: resTransactionDetails,
      // onResult: onResTransactionDetails,
      loading: loadingGetTransactionDetails,
      // refetch,
      onError: errorTransactionDetails
    } = useQuery(queries.getTransactionDetails, payloadGetTransactionDetails,
      () => ({
        enabled: triggerTransactionDetails.value,
        fetchPolicy: "no-cache",
      }))
    errorTransactionDetails(e => {
      notification('error', e.message)
    })
    // mutations
    const {
      mutate: syncBankbookDetails,
      onDone: doneSyncBankbookDetails,
      onError: errorSyncBankbookDetails,
      loading: loadingSyncBankbookDetails,
    } = useMutation(mutations.syncBankbookDetails);
    doneSyncBankbookDetails((e) => {
      notification('success', Message.getMessage('COMMON', '106').message)
    })
    errorSyncBankbookDetails(e => {
      notification('error', e.message)
    })
    const {
      mutate: registerTransactionDetailsToAccountingDocuments,
      onDone: doneRegisterTransactionDetailsToAccountingDocuments,
      onError: errorRegisterTransactionDetailsToAccountingDocuments,
      loading: loadingRegisterTransactionDetailsToAccountingDocuments,
    } = useMutation(mutations.registerTransactionDetailsToAccountingDocuments);
    doneRegisterTransactionDetailsToAccountingDocuments((e) => {
      notification('success', Message.getMessage('COMMON', '106').message)
    })
    errorRegisterTransactionDetailsToAccountingDocuments(e => {
      notification('error', e.message)
    })
    const {
      mutate: unregisterTransactionDetailsToAccountingDocuments,
      onDone: doneUnregisterTransactionDetailsToAccountingDocuments,
      onError: errorUnregisterTransactionDetailsToAccountingDocuments,
      loading: loadingUnregisterTransactionDetailsToAccountingDocuments,
    } = useMutation(mutations.unregisterTransactionDetailsToAccountingDocuments);
    doneUnregisterTransactionDetailsToAccountingDocuments((e) => {
      notification('success', Message.getMessage('COMMON', '106').message)
    })
    errorUnregisterTransactionDetailsToAccountingDocuments(e => {
      notification('error', e.message)
    })
    const {
      mutate: initializeTransactionDetails,
      onDone: doneInitializeTransactionDetails,
      onError: errorInitializeTransactionDetails,
      loading: loadingInitializeTransactionDetails,
    } = useMutation(mutations.initializeTransactionDetails);
    doneInitializeTransactionDetails((e) => {
      notification('success', Message.getMessage('COMMON', '106').message)
    })
    errorInitializeTransactionDetails(e => {
      notification('error', e.message)
    })
    const {
      mutate: saveTransactionDetails,
      onDone: doneSaveTransactionDetails,
      onError: errorSaveTransactionDetails,
      loading: loadingSaveTransactionDetails,
    } = useMutation(mutations.saveTransactionDetails);
    doneSaveTransactionDetails((e) => {
      notification('success', Message.getMessage('COMMON', '106').message)
    })
    errorSaveTransactionDetails(e => {
      notification('error', e.message)
    })
    // WATCH
    watch(resAccountingProcesses, (value) => {
      if (!!value.getAccountingProcesses && value.getAccountingProcesses.length) {
        listAccountingProcesses.value = value.getAccountingProcesses
      }
      triggerAccountingProcesses.value = false
    })

    watch(resBankbookDetails, (value) => {
      if (!!value.getBankbookDetails && value.getBankbookDetails.length) {
        dataSource.value = value.getBankbookDetails
        if (firstLoad.value) {
          rowKeyfocused.value = value.getBankbookDetails[0].bankbookId
          payloadGetTransactionDetails.bankbookDetailDate = value.getBankbookDetails[0].bankbookDetailDate
          payloadGetTransactionDetails.bankbookDetailId = value.getBankbookDetails[0].bankbookDetailId
          triggerTransactionDetails.value = true
        }
      }
      triggerBankbookDetails.value = false
    })

    watch(resTransactionDetails, (value) => {
      if (!!value.getTransactionDetails && value.getTransactionDetails.length) {
        dataSourceTransactionDetails.value = value.getTransactionDetails
      }
      triggerTransactionDetails.value = false
    })
    // MOUNTED
    // METHODS
    const getNameBankType = (value: any) => {
      const item: any = bankType.find((items: any) => items.c === value.toString())
      return item.n || ''
    }
    const getNameBankBookUseType = (value: any) => {
      const item: any = bankbookUseType.value.find((item: any) => item.value === value)
      return item.label || ''
    }
    const modalHistory = () => {
      isModalHistory.value = true
    }
    const modalHistoryAccountingProcessLogs = () => {
      isModalHistoryAccountingProcessLogs.value = true
    }
    const selectedMonth = (month: number) => {
      monthSelected.value = month
      triggerBankbookDetails.value = true
    }
    // Grid Main
    const selectionChanged = (event: any) => {
      // normalTransactionDetails
      // slipRegistration
      const listItemDisable: any = []
      dataSource.value.forEach((items: any) => {
        if (items.normalTransactionDetails && !items.documentRegistered) { }
        else { listItemDisable.push(items.bankbookId) }
      })
      const indexItemDisable = selectedRowKeys.value.findIndex((items: any) => listItemDisable.includes(items))
      if (indexItemDisable >= 0) {
        selectedRowKeys.value.splice(indexItemDisable, 1)
      }
    }
    const onFocusedRowChanging = (event: any) => {
      const item = event.rows[event.newRowIndex].data
      if (payloadGetTransactionDetails.bankbookDetailId === item.bankbookDetailId) return
      payloadGetTransactionDetails.bankbookDetailDate = item.bankbookDetailDate
      payloadGetTransactionDetails.bankbookDetailId = item.bankbookDetailId
      triggerTransactionDetails.value = true
    }

    const openPopupRetrieveStatements = (value: any) => {
      isModalRetrieveStatements.value = true
    }
    const openPopupSlipRegistrationSelected = () => {
      propListSlipRegistrationSelected.value.count = selectedRowKeys.value.length
      propListSlipRegistrationSelected.value.selectedRowKeys = dataSource.value.filter((items) => selectedRowKeys.value.includes(items.bankbookId)).map(e => e.transactionDetailsCount)
      isModalSlipRegistrationSelected.value = true
    }
    const openPopupRegistration = (value: any) => {
      transactionDetailsCountSelected.value = value.transactionDetailsCount
      if (value.documentRegistered) {
        isModalSlipCancellation.value = true
      } else {
        isModalSlipRegistrantion.value = true
      }
    }
    const totalDeposits = () => {
      let total = 0;
      dataSource.value.forEach((item) => {
        total += item.deposit;
      });
      return `입금액 합계: ${formatNumber(total)}`
    };
    const totalWithdrawal = () => {
      let total = 0;
      dataSource.value.forEach((item) => {
        total += item.withdraw;
      });
      return `출금액 합계: ${formatNumber(total)}`
    };
    const countSlipRegistration = () => {
      let totalRegistration = 0;
      let totalCancellation = 0;
      dataSource.value.forEach((item) => {
        if (item.documentRegistered) {
          totalRegistration++
        } else {
          totalCancellation++
        }
      });
      return `전표등록 여부 (O: ${totalRegistration}, X: ${totalCancellation})`
    };
    // ---------------Grid detail----------------
    const totalTransactions = () => {
      let total = 0;
      dataSourceTransactionDetails.value.forEach((item) => {
        if(item.bankbookDetailId !== null){
          total++
        }
      });
      return formatNumber(total)
    }

    const sumOfIncome = () => {
      let total = 0;
      dataSourceTransactionDetails.value.forEach((item) => {
        total += item.transactionDetails.income || 0
      });
      return formatNumber(total)
    }

    const sumOfExpenses = () => {
      let total = 0;
      dataSourceTransactionDetails.value.forEach((item) => {
        total += item.transactionDetails.spending || 0
      });
      return formatNumber(total)
    }
    // -----------------------Popup---------------------
    const handleConfirmRetrieveStatements = () => {
      isModalRetrieveStatements.value = false
      syncBankbookDetails({
        companyId: companyId,
        fiscalYear: globalYear.value,
        facilityBusinessId: globalFacilityBizId.value,
        year: globalYear.value,
        month: monthSelected.value
      })
    }
    const handleConfirmSlipRegistrationSelected = () => {
      let bankbookDetailDate: number = 0
      const bankbookDetailIds: number[] = []
      dataSource.value.forEach(items => {
        if (selectedRowKeys.value.includes(items.bankbookId)) {
          bankbookDetailDate = items.bankbookDetailDate
          bankbookDetailIds.push(items.bankbookDetailId)
        }
      })
      isModalSlipRegistrationSelected.value = false
      registerTransactionDetailsToAccountingDocuments({
        companyId: companyId,
        fiscalYear: globalYear.value,
        facilityBusinessId: globalFacilityBizId.value,
        bankbookDetailDate,
        bankbookDetailIds
      })
    }
    const handleSlipRegistration = () => {
      let bankbookDetailDate: number = 0
      const bankbookDetailIds: number[] = []
      dataSource.value.forEach(items => {
        if (transactionDetailsCountSelected.value === items.transactionDetailsCount) {
          bankbookDetailDate = items.bankbookDetailDate
          bankbookDetailIds.push(items.bankbookDetailId)
        }
      })
      isModalSlipRegistrantion.value = false
      registerTransactionDetailsToAccountingDocuments({
        companyId: companyId,
        fiscalYear: globalYear.value,
        facilityBusinessId: globalFacilityBizId.value,
        bankbookDetailDate,
        bankbookDetailIds
      })
    }
    const handleConfirmSlipCancellation = () => {
      let bankbookDetailDate: number = 0
      let bankbookDetailIds: number = 0
      dataSource.value.forEach(items => {
        if (transactionDetailsCountSelected.value === items.transactionDetailsCount) {
          bankbookDetailDate = items.bankbookDetailDate
          bankbookDetailIds = items.bankbookDetailId
        }
      })
      isModalSlipCancellation.value = false
      unregisterTransactionDetailsToAccountingDocuments({
        companyId: companyId,
        fiscalYear: globalYear.value,
        facilityBusinessId: globalFacilityBizId.value,
        bankbookDetailDate,
        bankbookDetailIds
      })
    }
    const handleInitializeTransactionDetails = () => {
      initializeTransactionDetails({
        ...payloadGetTransactionDetails,
        bankbookDetailDate: bankbookSelected.value.bankbookDetailDate,
        bankbookDetailIds: bankbookSelected.value.bankbookDetailIds,
      })
    }
    const openPopupItemDetail = (data: any) => {
      if (data.transactionDetails.resolutionClassification === 1) return
      dataStatementOfGoodsItems.value = data.transactionDetails
      isModalItemDetail.value = true
    }
    const openPopupNoteItemDetail = (data: any, key: string) => {
      if (data.data.resolutionClassification === 1) return
      transactionSelected.value = {
        index: data.rowIndex,
        key: key,
        noteValue: data.data.transactionDetails[key]
      }
      isModalNoteItemDetail.value = true
    }

    const updateNoteValue = (value: any) => {
      dataSourceTransactionDetails.value[value.index].transactionDetails[value.key] = value.noteValue
      isModalNoteItemDetail.value = false
    }
    const addNewRowTransactionDetails = () => {
      const initTransactionDetails: any = { ...InitTransactionDetails }
      const lengthData = dataSourceTransactionDetails.value.length
      if (lengthData > 0) {
        initTransactionDetails.transactionDetails.theOrder = dataSourceTransactionDetails.value[lengthData - 1].transactionDetails.theOrder + 1
      } else {
        initTransactionDetails.transactionDetails.theOrder = 0
      }
      dataSourceTransactionDetails.value = [...dataSourceTransactionDetails.value, initTransactionDetails]
    }
    const submitTransactionDetails = (event: any) => {
      const res = event.validationGroup.validate();
      if (!res.isValid) return
      let payloadCreate: any = {}
      const isCreate = !dataSourceTransactionDetails.value[dataSourceTransactionDetails.value.length - 1].transactionDetails.accountingDocumentId
      const payLoadUpdate = dataSourceTransactionDetails.value.map(item => {
        return {
          resolutionClassification: item.transactionDetails.resolutionClassification,
          income: item.transactionDetails.income,
          spending: item.transactionDetails.spending,
          summary: item.transactionDetails.summary,
          theOrder: item.transactionDetails.theOrder,
          accountCode: item.transactionDetails.accountCode,
          relationCode: item.transactionDetails.relationCode,
          fundingSource: item.transactionDetails.fundingSource,
          letterOfApprovalType: item.transactionDetails.letterOfApprovalType,
          causeUsage: item.transactionDetails.causeUsage,
          memo: item.transactionDetails.memo,
          clientId: item.transactionDetails.clientId,
          accountingDocumentId: item.transactionDetails.accountingDocumentId,
        }
      })
      if (isCreate) {
        payloadCreate = payLoadUpdate.splice(payLoadUpdate.length - 1, 1)
        delete payloadCreate.accountingDocumentId
        const payloadClear = makeDataClean({
          ...payloadGetTransactionDetails,
          updates: payLoadUpdate,
          creates: payloadCreate
        })
        saveTransactionDetails(payloadClear)
      } else {
        const payloadClear = makeDataClean({
          ...payloadGetTransactionDetails,
          updates: payLoadUpdate
        })
        saveTransactionDetails(payloadClear)
      }
    }

    // ------------------method common------------------
    const formatNumber = (value: number) => {
      if (Number.isInteger(value)) {
        return new Intl.NumberFormat().format(value)
      } else {
        return 0
      }
    }
    return {
      statusEntering,
      statusInput,
      statusAdjusting,
      statusAdjusted,
      move_column,
      colomn_resize,
      globalYear,
      selectedRowKeys,
      selectionChanged,
      onFocusedRowChanging,
      dataSource,
      totalDeposits,
      totalWithdrawal,
      countSlipRegistration,
      isModalRetrieveStatements,
      Message,
      handleConfirmRetrieveStatements,
      handleConfirmSlipRegistrationSelected,
      handleConfirmSlipCancellation,
      handleSlipRegistration,
      openPopupRegistration,
      openPopupRetrieveStatements,
      contentPopupRetrieveStatements,
      isModalSlipCancellation,
      isModalSlipRegistrantion,
      isModalSlipRegistrationSelected,
      isModalItemDetail,
      openPopupSlipRegistrationSelected,
      totalTransactions,
      sumOfIncome,
      sumOfExpenses,
      resolutionClassification,
      openPopupItemDetail,
      openPopupNoteItemDetail,
      isModalNoteItemDetail,
      valueAccountSubjectClassification,
      valueFundingSource,
      fileList,
      bankType,
      bankbookUseType,
      getNameBankType,
      getNameBankBookUseType,
      propListSlipRegistrationSelected,
      transactionDetailsCountSelected,
      rowKeyfocused,
      //loading
      loadingGetTransactionDetails,
      loadingGetBankbookDetails,
      dataSourceTransactionDetails,
      bankbookSelected,
      isModalHistory,
      idRowEdit,
      modalHistory,
      payloadGetTransactionDetails,
      handleInitializeTransactionDetails,
      submitTransactionDetails,
      transactionSelected,
      updateNoteValue,
      addNewRowTransactionDetails,
      dataStatementOfGoodsItems,
      monthSelected,
      selectedMonth,
      payloadGetAccountingProcessLogs,
      isModalHistoryAccountingProcessLogs,
      modalHistoryAccountingProcessLogs,
      listAccountingProcesses
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
