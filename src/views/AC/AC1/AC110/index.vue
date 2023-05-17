<template>
  <action-header title="통장내역" :buttonDelete="false" />
  <div class="ac-110">
    <div class="ac-110__top">
      <div class="ac-110__top-grid">
        <div v-for="(month, index) in 12" :key="index" class="ac-110__top-grid-items"
          :class="{ 'ac-110__top-grid-items-active': monthSelected === month }" @click="selectedMonth(month)">
          <colorful-badge :value="listAccountingProcesses.find((item: any) => item.month === month)?.status || null"
            :year="acYear" :month="month" />
        </div>
      </div>
    </div>
    <div class="ac-110__main">
      <div class="ac-110__main-main">
        <a-spin
          :spinning="loadingGetBankbookDetails || loadingSyncBankbookDetails || loadingDeleteStatementOfGoods || loadingSaveStatementOfGoods"
          size="large">
          <DxDataGrid id="DxDataGridMainAc110" ref="refDxDataGridMainAc110" key-expr="bankbookDetailId"
            :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
            v-model:selected-row-keys="selectedRowKeys" :show-borders="true" :allow-column-reordering="move_column"
            v-model:focused-row-key="rowKeyfocused" :focused-row-enabled="true" :allow-column-resizing="colomn_resize"
            :column-auto-width="true" @selection-changed="selectionChanged" @focused-row-changing="onFocusedRowChanging"
            @row-click="onRowClick" noDataText="내역이 없습니다">
            <DxPaging :enabled="false" />
            <DxScrolling mode="standard" show-scrollbar="always" />
            <DxSelection mode="multiple" :fixed="true" show-check-boxes-mode="always" :deferred="false" />
            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
            <DxExport :enabled="true" />
            <DxToolbar>
              <DxItem template="status-grid-main" location="before" />
              <DxItem name="searchPanel" />
              <DxItem name="exportButton" css-class="cell-button-export" />
              <DxItem location="after" template="retrieve-statements" />
              <DxItem location="after" template="slip-registration-selected" />
            </DxToolbar>
            <template #status-grid-main>
              <div class="ac-110__top-buttons">
                <ProcessStatus
                  v-if="listAccountingProcesses.find((item: any) => item.month === monthSelected)?.status || 0"
                  :valueStatus="listAccountingProcesses.find((item: any) => item.month === monthSelected)?.status || 0"
                  :disabled="true" />
                <button-basic v-else mode="contained" style="width: 90px;" :disabled="true">
                </button-basic>
                <a-tooltip>
                  <template #title>마감상태 변경이력</template>
                  <HistoryOutlined style="font-size: 18px; margin-left: 5px;"
                    @click="modalHistoryAccountingProcessLogs" />
                </a-tooltip>
              </div>
            </template>
            <template #retrieve-statements>
              <div class="ac-110__top-buttons">
                <button-basic :text="'통장내역 불러오기'" :type="'default'" :mode="'contained'"
                  @onClick="openPopupRetrieveStatements" />
              </div>
            </template>
            <template #slip-registration-selected>
              <div class="ac-110__top-buttons">
                <button-basic :text="'☑전표등록'" :type="'default'" :mode="'contained'" style="margin-left: 5px;"
                  @onClick="openPopupSlipRegistrationSelected" :disabled="!selectedRowKeys.length" />
                <a-tooltip placement="topRight">
                  <template #title>통장내역 변경이력</template>
                  <HistoryOutlined style="font-size: 18px; margin-left: 5px;" @click="modalHistory" />
                </a-tooltip>
              </div>
            </template>
            <DxColumn caption="통장" cell-template="nickName" data-field="bankbook.bankbookNickname" />
            <template #nickName="{ data }">
              <a-tooltip placement="left"
                :title="`${getNameBankType(data.data.bankbook.type)} ${data.data.bankbook.bankbookNumber}`">
                <div>{{ data.data.bankbook.bankbookNickname }}</div>
              </a-tooltip>
            </template>
            <DxColumn caption="통장용도" data-field="bankbook.useType" cell-template="useType" alignment="center" width="120">
              <DxLookup :data-source="bankbookUseType" display-expr="label" value-expr="value" />
            </DxColumn>
            <template #useType="{ data }">
              <div class="ac-110__main-main-tabUserType">
                {{ bankbookUseType.find((item: any) => item.value === data.data.bankbook.useType).label }}
              </div>
            </template>
            <DxColumn caption="일자" data-field="bankbookDetailDateCustomField" alignment="center" />
            <DxColumn caption="통장적요" data-field="summary" />
            <DxColumn caption="내용|비고" data-field="contentNoteCustomField" />
            <DxColumn caption="입금액" data-field="deposit" format="fixedPoint" />
            <DxColumn caption="출금액" data-field="withdraw" format="fixedPoint" />
            <DxColumn caption="통장잔액" data-field="balance" format="fixedPoint" />
            <DxColumn caption="증빙" data-field="proofCount" cell-template="proofCount" width="80"/>
            <template #proofCount="{ data }">
              <div style="text-align: end;">
                {{ data.data.proofCount ? data.data.proofCount : '' }}
              </div>
            </template>
            <DxColumn caption="거래내역" data-field="transactionDetailsCount" />
            <DxColumn caption="정상여부" cell-template="normalTransactionDetails" width="80" alignment="center" />
            <template #normalTransactionDetails="{ data }">
              <DxButton :focusStateEnabled="false" :text="data.data.normalTransactionDetails ? 'O' : 'X'"
                :style="data.data.normalTransactionDetails ? 'background-color: #337614' : 'background-color: #BB3835'"
                :height="$config_styles.HeightInput" style="color:white; width: 42px" />
            </template>
            <DxColumn caption="전표등록" cell-template="documentRegistered" width="200" />
            <template #documentRegistered="{ data }">
              <div class="ac-110__main-main-slipRegistration">
                <DxButton :focusStateEnabled="false" :text="data.data.documentRegistered ? 'O' : 'X'"
                  :style="data.data.documentRegistered ? 'background-color: #337614' : 'background-color: #BB3835'"
                  :height="$config_styles.HeightInput" style="color:white; margin-right: 5px; width: 42px" />
                <button-basic :text="data.data.documentRegistered ? '전표취소' : '전표등록'" :type="'default'"
                  :mode="data.data.documentRegistered ? 'outlined' : 'contained'"
                  @onClick="openPopupRegistration(data.data)" :disabled="!data.data.normalTransactionDetails" />
              </div>
            </template>
          </DxDataGrid>
          <div class="DxDataGridMain-ac-110-sumary">
            <div v-html="`통장내역수: <span style='font-size: 16px !important'>[${dataSource.length}]</span>`"></div>
            <div v-html="totalDeposits()"></div>
            <div v-html="totalWithdrawal()"></div>
            <div v-html="countSlipRegistration()"></div>
          </div>
        </a-spin>
      </div>
      <div class="ac-110__main-detail">
        <div class="ac-110__main-detail-detail1">
          <div class="ac-110__main-detail-detail1-wrapper">
            <div class="ac-110__main-detail-detail1-title">
              <b>거래내역-</b><span v-if="!!bankbookSelected">{{ bankbookSelected.bankbook.bankbookNickname }} {{
                getNameBankBookUseType(bankbookSelected.bankbook.useType) }}</span>
              <b style="margin-right: 5px;">-정상여부: </b>
              <DxButton v-if="!!bankbookSelected" :focusStateEnabled="false"
                :text="bankbookSelected.normalTransactionDetails ? 'O' : 'X'"
                :style="bankbookSelected.normalTransactionDetails ? 'background-color: #337614' : 'background-color: #BB3835'"
                :height="$config_styles.HeightInput" style="color:white; width: 42px" />
            </div>
            <a-spin
              :spinning="loadingInitializeTransactionDetails || loadingGetBankbookDetails || loadingDeleteStatementOfGoods || loadingSaveStatementOfGoods"
              size="large">
              <standard-form ref="refFormDetailAc110">
                <DxDataGrid id="DxDataGridDetailAc110" key-expr="accountingDocumentId" ref="refGridDetailAc110"
                  v-model:focused-row-key="rowKeyfocusedGridDetail" :show-row-lines="true"
                  :data-source="dataSourceTransactionDetails.transactionDetails" :show-borders="true"
                  :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true"
                  noDataText="내역이 없습니다">
                  <DxPaging :enabled="false" />
                  <DxScrolling mode="standard" show-scrollbar="always" />
                  <DxToolbar>
                    <DxItem template="summary-transaction-detail" css-class="cell-button-export" location="before" />
                    <DxItem template="button-reset" css-class="cell-button-export" />
                    <DxItem location="after" template="button-add" css-class="cell-button-add" />
                    <DxItem template="button-save" css-class="cell-button-export" />
                  </DxToolbar>
                  <template #summary-transaction-detail>
                    <div class="ac-110__main-detail-detail1-summary">
                      <div class="ac-110__main-detail-detail1-summary-quantity">
                        <span class="ac-110__main-detail-detail1-summary-label">거래내역수:</span>
                        <span class="ac-110__main-detail-detail1-summary-value">{{ totalTransactions() }}</span>
                      </div>
                      <div class="ac-110__main-detail-detail1-summary-income">
                        <span class="ac-110__main-detail-detail1-summary-label">수입액 합계:</span>
                        <span class="ac-110__main-detail-detail1-summary-value">{{ sumOfIncome() }}</span>
                      </div>
                      <div class="ac-110__main-detail-detail1-summary-expenses">
                        <span class="ac-110__main-detail-detail1-summary-label">지출액 합계:</span>
                        <span class="ac-110__main-detail-detail1-summary-value">{{ sumOfExpenses() }}</span>
                      </div>
                    </div>
                  </template>
                  <template #button-reset>
                    <button-basic text="초기화" type="default" :mode="'contained'" :disabled="isRegistered || !rowKeyfocused"
                      @onClick="handleInitializeTransactionDetails" />
                  </template>
                  <template #button-add>
                    <a-tooltip placement="top">
                      <template #title>신규</template>
                      <div>
                        <DxButton :focusStateEnabled="false" @click="addNewRowTransactionDetails"
                          :disabled="isRegistered || !rowKeyfocused" size="large"
                          style="background: #337ab7; color: white">
                          <PlusOutlined :style="{ fontSize: '17px', color: 'white' }" /> 신규
                        </DxButton>
                      </div>
                    </a-tooltip>
                  </template>
                  <template #button-save>
                    <a-tooltip placement="top">
                      <template #title>신규</template>
                      <DxButton :focusStateEnabled="false" @click="submitTransactionDetails()" size="large"
                        :disabled="isRegistered || !rowKeyfocused" style="background: #337ab7; color: white">
                        <SaveOutlined :style="{ fontSize: '17px', color: 'white' }" /> 저장
                      </DxButton>
                    </a-tooltip>
                  </template>
                  <DxColumn caption="결의구분" data-field="resolutionClassification" alignment="center" :allowUpdating="true"
                    width="70">
                    <DxLookup :data-source="resolutionClassification" display-expr="label" value-expr="value" />
                  </DxColumn>
                  <DxColumn caption="수입액" cell-template="income" width="110" />
                  <template #income="{ data }">
                    <div :id="`ac110income${data.rowIndex}${data.columnIndex}`"
                      :class="{ 'disable-input-column': !!data.data.spending }">
                      <number-box-money v-if="data.rowIndex === 0" v-model:valueInput="data.data.income" :required="true"
                        :spinButtons="false" :disabled="!!data.data.spending" height="26"
                        :readOnly="isRegistered || data.rowIndex === 0"
                        @focusInput="focusInputIncomeSpending(data, 'income')" />
                      <number-box-money v-else v-model:valueInput="data.data.income" :required="true" :spinButtons="false"
                        :disabled="!!data.data.spending" height="26" :readOnly="isRegistered"
                        @focusInput="focusInputIncomeSpending(data, 'income')" @changeInput="changeInput()" />
                    </div>
                  </template>
                  <DxColumn caption="지출액" cell-template="spending" width="110" />
                  <template #spending="{ data }">
                    <div :id="`ac110spending${data.rowIndex}${data.columnIndex}`"
                      :class="{ 'disable-input-column': !!data.data.income }">
                      <number-box-money v-if="data.rowIndex === 0" v-model:valueInput="data.data.spending"
                        :required="true" :spinButtons="false" :disabled="!!data.data.income" height="26"
                        :readOnly="isRegistered || data.rowIndex === 0"
                        @focusInput="focusInputIncomeSpending(data, 'spending')" />
                      <number-box-money v-else v-model:valueInput="data.data.spending" :required="true"
                        :spinButtons="false" :disabled="!!data.data.income" height="26" :readOnly="isRegistered"
                        @focusInput="focusInputIncomeSpending(data, 'spending')" @changeInput="changeInput()" />
                    </div>
                  </template>
                  <DxColumn caption="적요" cell-template="summary" width="150" />
                  <template #summary="{ data }">
                    <a-tooltip placement="top" color="black">
                      <template #title>{{ data.data.summary }}</template>
                      <div>
                        <default-text-box v-model:valueInput="data.data.summary" :required="true"
                          :readOnly="isRegistered" />
                      </div>
                    </a-tooltip>
                  </template>
                  <DxColumn caption="계정과목" cell-template="accountCode" width="175" />
                  <template #accountCode="{ data }">
                    <div v-if="rowKeyfocused" :key="`accountCode${keyRefreshGridDetailAc}`">
                      <SelectAccountCode v-model:valueInput="data.data.accountCode"
                        :classification="!!data.data?.income ? [4] : [5]" :lengthText="10" :readOnly="isRegistered" />
                    </div>
                  </template>
                  <DxColumn caption="상대계정" cell-template="relationCode" width="175" />
                  <template #relationCode="{ data }">
                    <div v-if="rowKeyfocused" :key="`relationCode${keyRefreshGridDetailAc}`">
                      <SelectAccountCode v-model:valueInput="data.data.relationCode"
                        :classification="data.data.resolutionClassification === 2 ? [4] : [4, 5]"
                        :readOnly="isRegistered || data.data.resolutionClassification === 1" :lengthText="10" />
                    </div>
                  </template>
                  <DxColumn caption="자금원천" cell-template="fundingSource" width="120" />
                  <template #fundingSource="{ data }">
                    <FundingSourceSelect v-model:valueInput="data.data.fundingSource" :required="true"
                      :readOnly="isRegistered" :dropdownTop="true" :idSelect="`FundingSourceSelect${data.rowIndex}`" />
                  </template>
                  <DxColumn caption="거래처" cell-template="clientId" width="150px" />
                  <template #clientId="{ data }">
                    <div>
                      <customer-select v-model:valueInput="data.data.clientId" width="135px"
                        :readOnly="isRegistered || data.data.resolutionClassification === 1" :search-enabled="true"/>
                    </div>
                  </template>
                  <DxColumn caption="품의종류" cell-template="letterOfApprovalType" width="100" />
                  <template #letterOfApprovalType="{ data }">
                    <div>
                      <LetterOfApprovalTypeSelect v-model:valueInput="data.data.letterOfApprovalType"
                        :readOnly="isRegistered || data.data.resolutionClassification === 1"
                        :required="data.data.resolutionClassification === 2" />
                    </div>
                  </template>
                  <DxColumn caption="원인/용도" cell-template="causeUsage" alignment="center" />
                  <template #causeUsage="{ data }">
                    <div
                      :class="{ 'disable-icon-column': data.data.resolutionClassification === 1 || (isRegistered && !data.data.causeUsage) }">
                      <a-tooltip v-if="!!data.data.causeUsage && data.data.causeUsage.length" placement="top">
                        <template #title>
                          <div class="ac-110-tooltip-memocauseUsage">{{ data.data.causeUsage }}</div>
                        </template>
                        <div>
                          <EditOutlined style="font-size: 12px" @click="openPopupNoteItemDetail(data, 'causeUsage')" />
                        </div>
                      </a-tooltip>
                      <PlusOutlined v-else style="font-size: 12px" @click="openPopupNoteItemDetail(data, 'causeUsage')" />
                    </div>
                  </template>
                  <DxColumn caption="물품내역" cell-template="goodsCount" alignment="center" />
                  <template #goodsCount="{ data }">
                    <div
                      :class="{ 'disable-icon-column': data.data.resolutionClassification === 1 || (isRegistered && !data.data.goodsCount) }">
                      <span v-if="!!data.data.goodsCount && data.data.resolutionClassification !== 1"
                        style="cursor: pointer;" @click="openPopupItemDetail(data.data)">
                        {{ data.data.goodsCount || 0 }}
                      </span>
                      <PlusOutlined v-else style="font-size: 12px" @click="openPopupItemDetail(data.data)" />
                    </div>
                  </template>
                  <DxColumn caption="메모" cell-template="memo" alignment="center" />
                  <template #memo="{ data }">
                    <div
                      :class="{ 'disable-icon-column': data.data.resolutionClassification === 1 || (isRegistered && !data.data.memo) }">
                      <a-tooltip v-if="!!data.data.memo && data.data.memo.length" placement="top">
                        <template #title>
                          <div class="ac-110-tooltip-memocauseUsage">{{ data.data.memo }}</div>
                        </template>
                        <div>
                          <EditOutlined style="font-size: 12px" @click="openPopupNoteItemDetail(data, 'memo')" />
                        </div>
                      </a-tooltip>
                      <PlusOutlined v-else style="font-size: 12px" @click="openPopupNoteItemDetail(data, 'memo')" />
                    </div>
                  </template>
                </DxDataGrid>
              </standard-form>
            </a-spin>
          </div>
        </div>
        <div class="ac-110__main-detail-detail2">
          <div class="ac-110__main-detail-detail2-upload">
            <UploadPreviewImage width="295" :payLoadProofs="payloadGetTransactionDetails"
              @updateAddBankbookDetailProof="updateAddBankbookDetailProof"
              @updateremoveBankbookDetailProof="updateremoveBankbookDetailProof" :disabled="isRegistered" :limit="10" />
          </div>
        </div>
      </div>
    </div>
    <PopupRetrieveStatements :isModalRetrieveStatements="isModalRetrieveStatements"
      @closePopup="isModalRetrieveStatements = false" :title="''" :content="Message.getMessage('AC110', '001').message"
      :okText="Message.getMessage('AC110', '001').yes" :cancelText="Message.getMessage('AC110', '001').no"
      @confirm="handleConfirmRetrieveStatements" />
    <PopupSlipRegistrationSelected :isModalSlipRegistrationSelected="isModalSlipRegistrationSelected"
      :propListSlipRegistrationSelected="propListSlipRegistrationSelected"
      @closePopup="isModalSlipRegistrationSelected = false" @submit="handleConfirmSlipRegistrationSelected" />
    <PopupSlipCancellation :isModalSlipCancellation="isModalSlipCancellation"
      :transactionDetailsCountSelected="transactionDetailsCountSelected" @closePopup="isModalSlipCancellation = false"
      @submit="handleConfirmSlipCancellation" />
    <PopupSlipRegistration :isModalSlipRegistrantion="isModalSlipRegistrantion"
      :transactionDetailsCountSelected="transactionDetailsCountSelected" @closePopup="isModalSlipRegistrantion = false"
      @submit="handleSlipRegistration" />
    <PopupItemDetails :isModalItemDetail="isModalItemDetail" :data="dataStatementOfGoodsItems" :disabled="isRegistered"
      :payload="payloadGetTransactionDetails" @closePopup="isModalItemDetail = false, dataStatementOfGoodsItems = {}"
      @updateGoodsCount="updateGoodsCount" />
    <PopupNoteItemDetail :isModalNoteItemDetail="isModalNoteItemDetail" :transactionSelected="transactionSelected"
      @closePopup="isModalNoteItemDetail = false" @submit="updateNoteValue" :disabled="isRegistered"
      :placeholder="transactionSelected?.key === 'causeUsage' ? '원인/용도 입력 ...' : '메모 입력 ...'" />
    <HistoryPopup :modalStatus="isModalHistory" @closePopup="isModalHistory = false" title="변경이력" :idRowEdit="idRowEdit"
      typeHistory="ac-110-bankbook" :data="payloadGetTransactionDetails" />
    <HistoryPopup :modalStatus="isModalHistoryAccountingProcessLogs"
      @closePopup="isModalHistoryAccountingProcessLogs = false" title="변경이력" :idRowEdit="idRowEdit"
      typeHistory="ac-110-accounting" :data="payloadGetAccountingProcessLogs" />
    <PopupMessage :modalStatus="isModalConfirmChangeData" @closePopup="isModalConfirmChangeData = false"
      :typeModal="'confirm'" title="" content="변경 내용을 저장하시겠습니까?" okText="네" cancelText="아니요"
      @checkConfirm="handleConfirmChangeData" />
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, computed, watch, nextTick } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC1/AC110";
import mutations from "@/graphql/mutations/AC/AC1/AC110";
import { companyId, makeDataClean } from "@/helpers/commonFunction"
import ProcessStatus from "@/components/common/ProcessStatus.vue"
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxToolbar, DxExport, DxLookup, DxPaging, DxSearchPanel } from "devextreme-vue/data-grid";
import { HistoryOutlined, EditOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons-vue";
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
import SelectAccountCode from './components/SelectAccountCode.vue'
import { BankType, enum2Entries, BankBookUseType, ResolutionClassification, FundingSource, LetterOfApprovalType } from "@bankda/jangbuda-common";
import HistoryPopup from "@/components/HistoryPopup.vue";
import dayjs from "dayjs";
import { cloneDeep, isEqual } from "lodash"

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
    SaveOutlined,
    DxPaging,
    DxSearchPanel,
    SelectAccountCode
  },
  setup() {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);

    const acYear = computed(() => parseInt(sessionStorage.getItem("acYear") ?? "0"))
    const globalFacilityBizId = ref(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0"))
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

    // data select
    const arrAllCallApi = computed(() => store.getters['settings/accountSubjects'])
    let arrAccoountSubjects = ref([])
    watch(() => arrAllCallApi.value, (value) => {
      const arrAll: any = []
      if (value.length) {
        value.forEach((items: any) => {
          items.codes.forEach((x: any) => {
            arrAll.push(x)
          })
        })
      }
      arrAccoountSubjects.value = arrAll
    })
    const fundingSource: any = computed(() => {
      let bsDeduction: any = enum2Entries(FundingSource).map((value) => ({
        value: value[1],
        label: value[0],
      }));
      return bsDeduction;
    });
    const letterOfApprovalType: any = computed(() => {
      let bsDeduction: any = enum2Entries(LetterOfApprovalType).map((value) => ({
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

    const refDxDataGridMainAc110 = ref()
    let listAccountingProcesses = ref<any>([])
    let statusEntering = ref(10);
    let statusInput = ref(20);
    let statusAdjusting = ref(30);
    let statusAdjusted = ref(40);
    let selectedRowKeys = ref<any>([])
    let rowKeyfocused = ref()
    let firstLoad = ref<boolean>(true)
    let dataSource = ref<any[]>([])
    let dataSourceTransactionDetails = ref<any>({})
    let listTransactionDetailsOrigin = ref<any>([])
    let isModalRetrieveStatements = ref(false);
    let isModalSlipCancellation = ref(false);
    let isModalSlipRegistrantion = ref(false);
    let isModalSlipRegistrationSelected = ref(false);
    let isModalItemDetail = ref(false);
    let isModalNoteItemDetail = ref(false);
    let transactionSelected: any = ref()
    let dataStatementOfGoodsItems: any = ref()
    let monthSelected: any = ref(dayjs().month() + 1)
    let valueAccountSubjectClassification = ref(null)
    let valueFundingSource = ref(null)
    const refFormDetailAc110: any = ref()
    let isModalConfirmChangeData = ref(false)
    let itemChange: any = ref(null)
    const payloadGetTransactionDetails: any = reactive({
      companyId: companyId,
      fiscalYear: acYear.value,
      facilityBusinessId: globalFacilityBizId.value,
      bankbookDetailDate: null,
      bankbookDetailId: null,
    })
    const payloadGetAccountingProcessLogs: any = reactive({
      companyId: companyId,
      fiscalYear: acYear.value,
      facilityBusinessId: globalFacilityBizId.value,
      year: acYear.value,
      month: monthSelected.value
    })
    const isModalHistory = ref<boolean>(false);
    const isModalHistoryAccountingProcessLogs = ref<boolean>(false);
    let idRowEdit = ref<number>(0);
    const refGridDetailAc110: any = ref()
    let rowKeyfocusedGridDetail: any = ref(null)
    const keyRefreshGridDetailAc = ref(0)
    let rowElementFocus: any = ref(null)
    let isRegisterTransaction = ref(false);
    // COMPUTED
    const bankbookSelected = computed(() => dataSource.value.find(item => item.bankbookDetailId === rowKeyfocused.value))
    const isRegistered = computed(() => {
      return !!bankbookSelected.value?.normalTransactionDetails && !!bankbookSelected.value?.documentRegistered
    })
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
      fiscalYear: acYear.value,
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
    } = useQuery(queries.getBankbookDetails, payloadGetAccountingProcessLogs,
      () => ({
        enabled: triggerBankbookDetails.value,
        fetchPolicy: "no-cache",
      }))
    errorGetBankbookDetails(e => {
      notification('error', e.message)
      triggerBankbookDetails.value = false
    })
    // const {
    //   result: resTransactionDetails,
    //   // onResult: onResTransactionDetails,
    //   loading: loadingGetTransactionDetails,
    //   // refetch,
    //   onError: errorTransactionDetails
    // } = useQuery(queries.getTransactionDetails, payloadGetTransactionDetails,
    //   () => ({
    //     enabled: triggerTransactionDetails.value,
    //     fetchPolicy: "no-cache",
    //   }))
    // errorTransactionDetails(e => {
    //   notification('error', e.message)
    // })
    // mutations
    const {
      mutate: syncBankbookDetails,
      onDone: doneSyncBankbookDetails,
      onError: errorSyncBankbookDetails,
      loading: loadingSyncBankbookDetails,
    } = useMutation(mutations.syncBankbookDetails);
    doneSyncBankbookDetails((e) => {
      if (e.data.syncBankbookDetails.length) {
        dataSource.value = [
          ...dataSource.value,
          e.data.syncBankbookDetails.map((items: any) => (
            {
              ...items,
              contentNoteCustomField: `${items?.content || ''}${items?.note || ''}`,
              bankbookDetailDateCustomField: formatDate(items.bankbookDetailDate)
            }
          ))]
        rowKeyfocused.value = dataSource.value[0].bankbookDetailId
        payloadGetTransactionDetails.bankbookDetailDate = dataSource.value[0].bankbookDetailDate
        payloadGetTransactionDetails.bankbookDetailId = dataSource.value[0].bankbookDetailId
        triggerBankbookDetails.value = true
      }
      triggerAccountingProcesses.value = true
      notification('success', Message.getMessage('COMMON', '201').message)
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
      triggerBankbookDetails.value = true
      notification('success', Message.getMessage('COMMON', '106').message)
    })
    errorRegisterTransactionDetailsToAccountingDocuments(e => {
      isRegisterTransaction.value = false
      notification('error', e.message)
    })
    const {
      mutate: unregisterTransactionDetailsToAccountingDocuments,
      onDone: doneUnregisterTransactionDetailsToAccountingDocuments,
      onError: errorUnregisterTransactionDetailsToAccountingDocuments,
      loading: loadingUnregisterTransactionDetailsToAccountingDocuments,
    } = useMutation(mutations.unregisterTransactionDetailsToAccountingDocuments);
    doneUnregisterTransactionDetailsToAccountingDocuments((e) => {
      triggerBankbookDetails.value = true
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
      triggerBankbookDetails.value = true
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
      ///new logic saveStatementOfGoods
      if (liststatementOfGoodsItemsChange.length) {
        newDatatransactionDetails = e.data.saveTransactionDetails.transactionDetails
        handleStatementOfGoodsItems()
      } else {
        if (itemChange.value) {
          if (Number.isInteger(itemChange.value)) {
            dataSourceTransactionDetails.value.transactionDetails = []
            listTransactionDetailsOrigin.value = []
            rowKeyfocused.value = null
            firstLoad.value = true
            monthSelected.value = itemChange.value
            payloadGetAccountingProcessLogs.month = itemChange.value
          } else {
            rowKeyfocused.value = itemChange.value.bankbookDetailId
            payloadGetTransactionDetails.bankbookDetailDate = itemChange.value.bankbookDetailDate
            payloadGetTransactionDetails.bankbookDetailId = itemChange.value.bankbookDetailId
          }
          itemChange.value = null
        }
        if (rowElementFocus.value) {
          rowElementFocus.value.classList.remove("dx-state-hover-custom");
        }
        triggerBankbookDetails.value = true
        notification('success', Message.getMessage('COMMON', '106').message)
      }
    })
    errorSaveTransactionDetails(e => {
      if (rowElementFocus.value) {
        rowElementFocus.value.classList.remove("dx-state-hover-custom");
      }
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
        dataSource.value = value.getBankbookDetails.map((items: any) => (
          {
            ...items,
            contentNoteCustomField: `${items?.content || ''}${items?.note || ''}`,
            bankbookDetailDateCustomField: formatDate(items.bankbookDetailDate)
          }
        ))
        if (firstLoad.value) {
          rowKeyfocused.value = value.getBankbookDetails[0].bankbookDetailId
          payloadGetTransactionDetails.bankbookDetailDate = value.getBankbookDetails[0].bankbookDetailDate
          payloadGetTransactionDetails.bankbookDetailId = value.getBankbookDetails[0].bankbookDetailId
          getTransactionDetails(value.getBankbookDetails[0])
        } else {
          getTransactionDetails(value.getBankbookDetails.find((item: any) => item.bankbookDetailId === rowKeyfocused.value))
        }
      } else {
        dataSource.value = []
        dataSourceTransactionDetails.value = {}
        listTransactionDetailsOrigin.value = []
        rowKeyfocused.value = null
        payloadGetTransactionDetails.bankbookDetailDate = null
        payloadGetTransactionDetails.bankbookDetailId = null
      }
      firstLoad.value = false
      triggerBankbookDetails.value = false
    })

    const getTransactionDetails = (value: any) => {
      if (!!value && value) {
        
        ///new logic saveStatementOfGoods
        newDatatransactionDetails = []
        countIndexCallApiHandleStatementOfGoodsItems = 0
        liststatementOfGoodsItemsChange = []



        dataSourceTransactionDetails.value = cloneDeep(value)
        dataSourceTransactionDetails.value.transactionDetails = dataSourceTransactionDetails.value.transactionDetails.map((item: any) => (
          { ...item, summary: item.summary[item.summary.length - 1] === '중' ? item.summary : `${item.summary} 중` }
        ))
        listTransactionDetailsOrigin.value = cloneDeep(dataSourceTransactionDetails.value.transactionDetails)
      }
    }
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
      if (monthSelected.value === month) return
      if (isEqual(dataSourceTransactionDetails.value.transactionDetails, listTransactionDetailsOrigin.value) || !rowKeyfocused.value) {
        dataSourceTransactionDetails.value.transactionDetails = []
        listTransactionDetailsOrigin.value = []
        rowKeyfocused.value = null
        firstLoad.value = true
        monthSelected.value = month
        payloadGetAccountingProcessLogs.month = month
        triggerBankbookDetails.value = true
      } else {
        itemChange.value = month
        isModalConfirmChangeData.value = true
      }
    }

    watch(() => monthSelected.value, () => {
      refDxDataGridMainAc110.value.instance.clearFilter()
      refDxDataGridMainAc110.value.instance.clearSorting()
    })
    // Grid Main
    const selectionChanged = (event: any) => {
      // normalTransactionDetails
      // slipRegistration
      const listItemDisable: any = []
      dataSource.value.forEach((items: any) => {
        if (items.normalTransactionDetails && !items.documentRegistered) { }
        else { listItemDisable.push(items.bankbookDetailId) }
      })
      const indexItemDisable = selectedRowKeys.value.findIndex((items: any) => listItemDisable.includes(items))
      if (indexItemDisable >= 0) {
        selectedRowKeys.value.splice(indexItemDisable, 1)
      }
    }
    const onFocusedRowChanging = (event: any) => {
      if (isRegisterTransaction.value) {
        isRegisterTransaction.value = false
        selectedRowKeys.value = []
      }
      if (rowElementFocus.value) {
        rowElementFocus.value.classList.remove("dx-state-hover-custom");
      }
      if (rowKeyfocused.value !== event.rows[event.newRowIndex].data.bankbookDetailId) {
        if (!isEqual(dataSourceTransactionDetails.value.transactionDetails, listTransactionDetailsOrigin.value)) {
          rowElementFocus.value = event.rowElement[0]
          rowElementFocus.value?.classList.add("dx-state-hover-custom")
        }
      }
      event.cancel = true
    }
    const onRowClick = (event: any) => {
      if (!event?.data) return
      const item = event.data
      if (rowKeyfocused.value === item.bankbookDetailId) return
      if (isEqual(dataSourceTransactionDetails.value.transactionDetails, listTransactionDetailsOrigin.value)) {
        rowKeyfocused.value = item.bankbookDetailId
        payloadGetTransactionDetails.bankbookDetailDate = item.bankbookDetailDate
        payloadGetTransactionDetails.bankbookDetailId = item.bankbookDetailId
        getTransactionDetails(dataSource.value.find((item: any) => item.bankbookDetailId === rowKeyfocused.value))
      } else {
        itemChange.value = { ...item }
        isModalConfirmChangeData.value = true
      }
    }

    const openPopupRetrieveStatements = (value: any) => {
      isModalRetrieveStatements.value = true
    }
    const openPopupSlipRegistrationSelected = () => {
      propListSlipRegistrationSelected.value.count = selectedRowKeys.value.length
      propListSlipRegistrationSelected.value.selectedRowKeys = dataSource.value.filter((items) => selectedRowKeys.value.includes(items.bankbookDetailId)).map(e => e.transactionDetailsCount)
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
      return `입금액 합계: <span style='font-size: 16px !important'>[${formatNumber(total)}]</span>`
    };
    const totalWithdrawal = () => {
      let total = 0;
      dataSource.value.forEach((item) => {
        total += item.withdraw;
      });
      return `출금액 합계: <span style='font-size: 16px !important'>[${formatNumber(total)}]</span>`
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
      return `전표등록 여부 <span style='font-size: 16px !important'>[O: ${totalRegistration}, X: ${totalCancellation}]</span>`
    };
    // ---------------Grid detail----------------
    const totalTransactions = () => {
      let total = !!dataSourceTransactionDetails.value?.transactionDetails ? dataSourceTransactionDetails.value?.transactionDetails.length : 0
      return formatNumber(total)
    }

    const sumOfIncome = () => {
      let total = 0;
      if (Object.keys(dataSourceTransactionDetails.value).length) {
        dataSourceTransactionDetails.value.transactionDetails.forEach((item: any) => {
          total += item.income || 0
        });
      }
      return formatNumber(total)
    }

    const sumOfExpenses = () => {
      let total = 0;
      if (Object.keys(dataSourceTransactionDetails.value).length) {
        dataSourceTransactionDetails.value.transactionDetails.forEach((item: any) => {
          total += item.spending || 0
        })
      }
      return formatNumber(total)
    }
    // -----------------------Popup---------------------
    const handleConfirmRetrieveStatements = () => {
      isModalRetrieveStatements.value = false
      syncBankbookDetails({
        companyId: companyId,
        fiscalYear: acYear.value,
        facilityBusinessId: globalFacilityBizId.value,
        year: acYear.value,
        month: monthSelected.value
      })
    }
    const handleConfirmSlipRegistrationSelected = (status: any) => {
      isRegisterTransaction.value = true
      const keys: any = []
      dataSource.value.forEach(items => {
        if (selectedRowKeys.value.includes(items.bankbookDetailId)) {
          keys.push({
            bankbookDetailDate: items.bankbookDetailDate,
            bankbookDetailId: items.bankbookDetailId
          })
        }
      })
      isModalSlipRegistrationSelected.value = false
      registerTransactionDetailsToAccountingDocuments({
        companyId: companyId,
        fiscalYear: acYear.value,
        facilityBusinessId: globalFacilityBizId.value,
        keys: keys
      })
    }
    const handleSlipRegistration = () => {
      const keys: any = []
      dataSource.value.forEach(items => {
        if (rowKeyfocused.value === items.bankbookDetailId) {
          keys.push({
            bankbookDetailDate: items.bankbookDetailDate,
            bankbookDetailId: items.bankbookDetailId
          })
        }
      })
      isModalSlipRegistrantion.value = false
      registerTransactionDetailsToAccountingDocuments({
        companyId: companyId,
        fiscalYear: acYear.value,
        facilityBusinessId: globalFacilityBizId.value,
        keys: keys
      })
    }
    const handleConfirmSlipCancellation = () => {
      let bankbookDetailDate = null
      let bankbookDetailId = null
      dataSource.value.forEach(items => {
        if (rowKeyfocused.value === items.bankbookDetailId) {
          bankbookDetailDate = items.bankbookDetailDate
          bankbookDetailId = items.bankbookDetailId
        }
      })
      isModalSlipCancellation.value = false
      unregisterTransactionDetailsToAccountingDocuments({
        companyId: companyId,
        fiscalYear: acYear.value,
        facilityBusinessId: globalFacilityBizId.value,
        bankbookDetailDate,
        bankbookDetailId
      })
    }
    const handleInitializeTransactionDetails = () => {
      if (rowKeyfocused.value === null || isRegistered.value) return
      initializeTransactionDetails(
        payloadGetTransactionDetails
      )
    }
    const openPopupItemDetail = (data: any) => {
      if (data.resolutionClassification === 1) return
      dataStatementOfGoodsItems.value = data
      isModalItemDetail.value = true
    }
    const openPopupNoteItemDetail = (data: any, key: string) => {
      if (data.data.resolutionClassification === 1) return
      transactionSelected.value = {
        index: data.rowIndex,
        key: key,
        noteValue: data.data[key]
      }
      isModalNoteItemDetail.value = true
    }

    const updateNoteValue = (value: any) => {
      dataSourceTransactionDetails.value.transactionDetails[value.index][value.key] = value.noteValue
      isModalNoteItemDetail.value = false
    }
    const addNewRowTransactionDetails = () => {
      if (rowKeyfocused.value === null || isRegistered.value) return

      const initTransactionDetails: any = { ...InitTransactionDetails }
      const lengthData = dataSourceTransactionDetails.value.transactionDetails.length
      if (lengthData > 0) {
        const firstTransactionDetail = dataSourceTransactionDetails.value.transactionDetails[lengthData - 1]
        initTransactionDetails.summary = firstTransactionDetail.summary
        initTransactionDetails.theOrder = firstTransactionDetail.theOrder + 1 || 1
        initTransactionDetails.accountingDocumentId = firstTransactionDetail.accountingDocumentId + 1 + 'create' || 'create'
      } else {
        initTransactionDetails.theOrder = 0
        initTransactionDetails.accountingDocumentId = 'create'
      }
      dataSourceTransactionDetails.value.transactionDetails = [...dataSourceTransactionDetails.value.transactionDetails, initTransactionDetails]
      nextTick(() => {
        rowKeyfocusedGridDetail.value = initTransactionDetails.accountingDocumentId
      })
    }
    const submitTransactionDetails = async () => {
      if (rowKeyfocused.value === null || isRegistered.value) {
        if (rowElementFocus.value) {
          rowElementFocus.value.classList.remove("dx-state-hover-custom");
        }
        return
      }
      const res = refFormDetailAc110.value.validate()
      if (!res.isValid) {
        if (rowElementFocus.value) {
          rowElementFocus.value.classList.remove("dx-state-hover-custom");
        }
        return
      }
      dataSourceTransactionDetails.value.transactionDetails = dataSourceTransactionDetails.value.transactionDetails.map((item: any) => {
        if (Number.isInteger(item.accountingDocumentId)) {
          return item
        } else {
          return {
            ...InitTransactionDetails,
            ...item
          }
        }
      })
      const payLoadUpdate: any = []
      const payloadCreate: any = []
      dataSourceTransactionDetails.value.transactionDetails.forEach((item: any) => {
        const objPayload = {
          resolutionClassification: item.resolutionClassification,
          income: !!item.income ? item.income : 0,
          spending: !!item.spending ? item.spending : 0,
          summary: item.summary,
          theOrder: item.theOrder,
          accountCode: item.accountCode,
          relationCode: item.relationCode,
          fundingSource: item.fundingSource,
          letterOfApprovalType: item.letterOfApprovalType,
          causeUsage: item.causeUsage,
          memo: item.memo,
          clientId: item.clientId,
        }
        if (item.accountingDocumentId.toString().includes('create')) {
          payloadCreate.push(objPayload)
        } else {
          payLoadUpdate.push({
            ...objPayload,
            accountingDocumentId: item.accountingDocumentId
          })
        }
      })
      if (payloadCreate.length) {
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

    const updateAddBankbookDetailProof = () => {
      const indexSelected = dataSource.value.findIndex((item: any) => item.bankbookDetailId === rowKeyfocused.value)
      dataSource.value[indexSelected].proofCount++
    }

    const updateremoveBankbookDetailProof = () => {
      const indexSelected = dataSource.value.findIndex((item: any) => item.bankbookDetailId === rowKeyfocused.value)
      dataSource.value[indexSelected].proofCount--
    }
    const focusInputIncomeSpending = (data: any, key: string) => {
      if (key === 'income') {
        if (!data.data.income) {
          data.data.income = null
        }
        data.data.resolutionClassification = 1
        data.data.spending = 0
      }
      else {
        if (!data.data.spending) {
          data.data.spending = null
        }
        data.data.resolutionClassification = 2
        data.data.income = 0
      }
      nextTick(() => {
        const elInput: any = document.querySelector(`#ac110${key}${data.rowIndex}${data.columnIndex} .dx-texteditor-input`)
        if (!!elInput) {
          elInput.focus()
        }
      })
    }


    ///new logic saveStatementOfGoods
    /////////////////
    const {
      mutate: saveStatementOfGoods,
      onDone: doneSaveStatementOfGoods,
      onError: errorSaveStatementOfGoods,
      loading: loadingSaveStatementOfGoods,
    } = useMutation(mutations.saveStatementOfGoods);
    doneSaveStatementOfGoods((e) => {
      // emit("updateGoodsCount", props.data.accountingDocumentId, dataSource.value.statementOfGoodsItems)
      // emit("closePopup", false)
      // setData()
      // notification('success', Message.getMessage('COMMON', '106').message)
      countIndexCallApiHandleStatementOfGoodsItems++
      handleStatementOfGoodsItems()
    })
    errorSaveStatementOfGoods(e => {
      notification('error', e.message)
    })

    const {
      mutate: deleteStatementOfGoods,
      onDone: doneDeleteStatementOfGoods,
      onError: errorDeleteStatementOfGoods,
      loading: loadingDeleteStatementOfGoods,
    } = useMutation(mutations.deleteStatementOfGoods);
    doneDeleteStatementOfGoods((e) => {
      countIndexCallApiHandleStatementOfGoodsItems++
      handleStatementOfGoodsItems()
      // dataSource.value.statementOfGoodsItems = []
      // emit("updateGoodsCount", props.data.accountingDocumentId, dataSource.value.statementOfGoodsItems)
      // setData()
      // notification('success', Message.getMessage('COMMON', '106').message)
    })
    errorDeleteStatementOfGoods(e => {
      notification('error', e.message)
    })

    let newDatatransactionDetails: any = []
    let countIndexCallApiHandleStatementOfGoodsItems = 0
    let liststatementOfGoodsItemsChange: any = []

    const handleStatementOfGoodsItems = () => {
      if (liststatementOfGoodsItemsChange.findIndex((item: any) => item.index === liststatementOfGoodsItemsChange[countIndexCallApiHandleStatementOfGoodsItems]?.index) < 0) {
        if (itemChange.value) {
          if (Number.isInteger(itemChange.value)) {
            dataSourceTransactionDetails.value.transactionDetails = []
            listTransactionDetailsOrigin.value = []
            rowKeyfocused.value = null
            firstLoad.value = true
            monthSelected.value = itemChange.value
            payloadGetAccountingProcessLogs.month = itemChange.value
          } else {
            rowKeyfocused.value = itemChange.value.bankbookDetailId
            payloadGetTransactionDetails.bankbookDetailDate = itemChange.value.bankbookDetailDate
            payloadGetTransactionDetails.bankbookDetailId = itemChange.value.bankbookDetailId
          }
          itemChange.value = null
        }
        if (rowElementFocus.value) {
          rowElementFocus.value.classList.remove("dx-state-hover-custom");
        }
        newDatatransactionDetails = []
        countIndexCallApiHandleStatementOfGoodsItems = 0
        liststatementOfGoodsItemsChange = []
        triggerBankbookDetails.value = true
        notification('success', Message.getMessage('COMMON', '106').message)
      } else {
        const indexNewDatatransactionDetails = liststatementOfGoodsItemsChange[countIndexCallApiHandleStatementOfGoodsItems].index
        if (liststatementOfGoodsItemsChange[countIndexCallApiHandleStatementOfGoodsItems].statementOfGoodsItems.length) {
          saveStatementOfGoods({
            companyId: companyId,
            fiscalYear: acYear.value,
            facilityBusinessId: globalFacilityBizId.value,
            transactionDetailDate: newDatatransactionDetails[indexNewDatatransactionDetails].transactionDetailDate,
            accountingDocumentId: newDatatransactionDetails[indexNewDatatransactionDetails].accountingDocumentId,
            items: liststatementOfGoodsItemsChange[countIndexCallApiHandleStatementOfGoodsItems].statementOfGoodsItems
          })
        } else {
          deleteStatementOfGoods({
            companyId: companyId,
            fiscalYear: acYear.value,
            facilityBusinessId: globalFacilityBizId.value,
            transactionDetailDate: newDatatransactionDetails[indexNewDatatransactionDetails].transactionDetailDate,
            accountingDocumentId: newDatatransactionDetails[indexNewDatatransactionDetails].accountingDocumentId,
          })
        }
      }
    }
    const updateGoodsCount = (accountingDocumentId: any, value: any) => {
      const indexTransition = dataSourceTransactionDetails.value.transactionDetails.findIndex((item: any) => item.accountingDocumentId === accountingDocumentId)
      dataSourceTransactionDetails.value.transactionDetails[indexTransition].goodsCount = value.length
      dataSourceTransactionDetails.value.transactionDetails[indexTransition].statementOfGoodsItems = [...value]
      liststatementOfGoodsItemsChange = []
      dataSourceTransactionDetails.value.transactionDetails.forEach((item: any, index: number) => {
        if (index <= bankbookSelected.value.transactionDetails.length - 1) {
          if ((!bankbookSelected.value.transactionDetails[index]?.statementOfGoodsItems
            || !bankbookSelected.value.transactionDetails[index]?.statementOfGoodsItems.length)
            && (!item?.statementOfGoodsItems || !item?.statementOfGoodsItems.length)) {

          } else {
            if (!isEqual(item.statementOfGoodsItems || [], bankbookSelected.value.transactionDetails[index]?.statementOfGoodsItems || [])) {
              liststatementOfGoodsItemsChange.push({
                index: index,
                statementOfGoodsItems: dataSourceTransactionDetails.value.transactionDetails[index].statementOfGoodsItems || []
              })
            }
          }
        } else {
          if (item.statementOfGoodsItems.length) {
            liststatementOfGoodsItemsChange.push({
              index: index,
              statementOfGoodsItems: dataSourceTransactionDetails.value.transactionDetails[index].statementOfGoodsItems || []
            })
          }
        }
      })
    }

    const changeInput = () => {
      let totalInComeInput = 0
      let totalSpendingInput = 0
      dataSourceTransactionDetails.value.transactionDetails.forEach((item: any, i: number) => {
        if (i > 0) {
          if (!!item.income) {
            totalInComeInput += item.income
          }
          if (!!item.spending) {
            totalSpendingInput += item.spending
          }
        }
      })
      if (dataSourceTransactionDetails.value.deposit > 0) {
        dataSourceTransactionDetails.value.transactionDetails[0].income = dataSourceTransactionDetails.value.deposit - totalInComeInput + totalSpendingInput
      } else {
        dataSourceTransactionDetails.value.transactionDetails[0].spending = dataSourceTransactionDetails.value.withdraw - totalSpendingInput + totalInComeInput
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

    const handleConfirmChangeData = (status: boolean) => {
      if (status) {
        submitTransactionDetails()
      } else {
        if (rowElementFocus.value) {
          rowElementFocus.value.classList.remove("dx-state-hover-custom");
        }
        if (Number.isInteger(itemChange.value)) {
          dataSourceTransactionDetails.value.transactionDetails = []
          listTransactionDetailsOrigin.value = []
          rowKeyfocused.value = null
          firstLoad.value = true
          monthSelected.value = itemChange.value
          payloadGetAccountingProcessLogs.month = itemChange.value
          triggerBankbookDetails.value = true
        } else {
          rowKeyfocused.value = itemChange.value.bankbookDetailId
          payloadGetTransactionDetails.bankbookDetailDate = itemChange.value.bankbookDetailDate
          payloadGetTransactionDetails.bankbookDetailId = itemChange.value.bankbookDetailId
          getTransactionDetails(dataSource.value.find((item: any) => item.bankbookDetailId === rowKeyfocused.value))
        }
        itemChange.value = null
      }
      isModalConfirmChangeData.value = false
    }

    const formatDate = (date: any) => {
      date = date.toString()
      return dayjs(date).format('YYYY-MM-DD')
    }
    return {
      refDxDataGridMainAc110,
      statusEntering,
      statusInput,
      statusAdjusting,
      statusAdjusted,
      move_column,
      colomn_resize,
      acYear,
      selectedRowKeys,
      selectionChanged,
      onFocusedRowChanging,
      onRowClick,
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
      bankType,
      bankbookUseType,
      getNameBankType,
      getNameBankBookUseType,
      propListSlipRegistrationSelected,
      transactionDetailsCountSelected,
      rowKeyfocused,
      //loading
      // loadingGetTransactionDetails,
      loadingGetBankbookDetails,
      loadingInitializeTransactionDetails,
      loadingSyncBankbookDetails,
      loadingDeleteStatementOfGoods,
      loadingSaveStatementOfGoods,
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
      listAccountingProcesses,
      updateremoveBankbookDetailProof,
      updateAddBankbookDetailProof,
      refGridDetailAc110,
      arrAccoountSubjects,
      fundingSource,
      letterOfApprovalType,
      focusInputIncomeSpending,
      updateGoodsCount,
      isRegistered,
      rowKeyfocusedGridDetail,
      isModalConfirmChangeData,
      handleConfirmChangeData,
      refFormDetailAc110,
      keyRefreshGridDetailAc,
      changeInput
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
<style>
.ac-110-tooltip-memocauseUsage {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}</style>
