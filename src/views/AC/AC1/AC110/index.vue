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
        <a-spin :spinning="loadingGetBankbookDetails || loadingSyncBankbookDetails" size="large">
          <DxDataGrid id="DxDataGridMainAc110" ref="refDxDataGridMainAc110" key-expr="bankbookDetailId"
            :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
            :allow-column-reordering="move_column" v-model:focused-row-key="rowKeyfocused" :focused-row-enabled="true"
            :allow-column-resizing="colomn_resize" :column-auto-width="true" @focused-row-changing="onFocusedRowChanging"
            @row-click="onRowClick" @content-ready="onContentReady"
            :noDataText="loadingGetBankbookDetails || loadingSyncBankbookDetails ? '' : '내역이 없습니다'">
            <DxPaging :enabled="false" />
            <DxScrolling mode="standard" show-scrollbar="always" />
            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
            <DxExport :enabled="true" />
            <DxToolbar>
              <DxItem template="status-grid-main" location="before" />
              <DxItem location="after" template="retrieve-statements" />
              <DxItem location="after" template="slip-registration-selected" />
              <DxItem name="searchPanel" />
              <DxItem name="exportButton" css-class="cell-button-export" />
            </DxToolbar>
            <template #status-grid-main>
              <div class="ac-110__top-buttons">
                <ProcessStatus
                :noOptionNoInput="false"
                  v-if="listAccountingProcesses.find((item: any) => item.month === monthSelected)?.status || 0"
                  :valueStatus="listAccountingProcesses.find((item: any) => item.month === monthSelected)?.status || 0"
                  :disabled="true" />
                <button-basic v-else mode="contained" style="width: 90px" :disabled="true">
                </button-basic>
                <a-tooltip>
                  <template #title>마감상태 변경이력</template>
                  <HistoryOutlined style="font-size: 18px; margin-left: 5px" @click="modalHistoryAccountingProcessLogs" />
                </a-tooltip>
              </div>
            </template>
            <template #retrieve-statements>
              <div class="ac-110__top-buttons">
                <button-basic :text="'통장내역 불러오기'" :type="'default'" :mode="'contained'"
                  @onClick="openPopupRetrieveStatements" :disabled="isReadonlyByAccountingProcessesStatus" />
              </div>
            </template>
            <template #slip-registration-selected>
              <div class="ac-110__top-buttons">
                <button-basic :text="'☑전표등록'" :type="'default'" :mode="'contained'" style="margin-left: 5px"
                  @onClick="openPopupSlipRegistrationSelected"
                  :disabled="!selectedRowKeys.length || isReadonlyByAccountingProcessesStatus" />
                <a-tooltip placement="topRight">
                  <template #title>통장내역 변경이력</template>
                  <HistoryOutlined style="font-size: 18px; margin-left: 5px" @click="modalHistory" />
                </a-tooltip>
              </div>
            </template>
            <DxColumn header-cell-template="title-header-checkbox" cell-template="checkbox" width="70"
              alignment="center" />
            <template #title-header-checkbox="{ data }">
              <div class="ac-110-checkboxAll" :class="{ 'ac-110-checkboxAll-disable': !listItemAllowedChoose.length }"
                @mousedown="selectionChanged(null)">
                <DxCheckBox :value="isSelectAll" iconSize="18" :readOnly="true" />
              </div>
            </template>
            <template #checkbox="{ data }">
              <div class="ac-110-checkbox"
                :class="{ 'ac-110-checkbox-disable': !listItemAllowedChoose.includes(data.data.bankbookDetailId) }"
                @mousedown="selectionChanged(data.data.bankbookDetailId)">
                <DxCheckBox :value="selectedRowKeys.includes(data.data.bankbookDetailId)" iconSize="18"
                  :readOnly="true" />
              </div>
            </template>
            <DxColumn caption="통장" cell-template="nickName" data-field="bankbook.bankbookNickname" />
            <template #nickName="{ data }">
              <a-tooltip placement="left" :title="`${getNameBankType(data.data.bankbook.type)} ${data.data.bankbook.bankbookNumber
                }`">
                <div>{{ data.data.bankbook.bankbookNickname }}</div>
              </a-tooltip>
            </template>
            <DxColumn caption="통장용도" data-field="bankbook.useType" cell-template="useType" alignment="center" width="120">
              <DxLookup :data-source="bankbookUseType" display-expr="label" value-expr="value" />
            </DxColumn>
            <template #useType="{ data }">
              <div class="ac-110__main-main-tabUserType">
                {{
                  bankbookUseType.find(
                    (item: any) => item.value === data.data.bankbook.useType
                  ).label
                }}
              </div>
            </template>
            <DxColumn caption="일자" data-field="bankbookDetailDateCustomField" alignment="center" />
            <DxColumn caption="통장적요" data-field="summary" />
            <DxColumn caption="내용|비고" data-field="contentNoteCustomField" />
            <DxColumn caption="입금액" data-field="deposit" format="fixedPoint" />
            <DxColumn caption="출금액" data-field="withdraw" format="fixedPoint" />
            <DxColumn caption="통장잔액" data-field="balance" format="fixedPoint" />
            <DxColumn caption="증빙" data-field="proofCount" cell-template="proofCount" width="80" />
            <template #proofCount="{ data }">
              <div style="text-align: end">
                {{ data.data.proofCount ? data.data.proofCount : "" }}
              </div>
            </template>
            <DxColumn caption="거래내역" data-field="transactionDetailsCount" />
            <DxColumn caption="정상여부" cell-template="normalTransactionDetails" width="80" alignment="center" />
            <template #normalTransactionDetails="{ data }">
              <div style="display: flex; justify-content: center;">
                <div :class="data.data.normalTransactionDetails ? 'tag-green-ac110' : 'tag-red-ac110'">{{
                  data.data.normalTransactionDetails ? 'O' : 'X' }}</div>
              </div>
            </template>
            <DxColumn caption="전표등록" cell-template="documentRegistered" width="150" />
            <template #documentRegistered="{ data }">
              <div class="ac-110__main-main-slipRegistration">
                <div class="mr-5" :class="data.data.documentRegistered ? 'tag-green-ac110' : 'tag-red-ac110'">{{
                  data.data.documentRegistered ? 'O' : 'X' }}</div>
                <button-basic :text="data.data.documentRegistered ? '전표취소' : '전표등록'" :type="'default'" :mode="data.data.documentRegistered ? 'outlined' : 'contained'
                  " @onClick="openPopupRegistration(data.data)"
                  :disabled="!data.data.normalTransactionDetails || isReadonlyByAccountingProcessesStatus"
                  :style="!data.data.documentRegistered ? 'border: 1px solid #fff;' : ''" />
              </div>
            </template>
          </DxDataGrid>
          <div class="DxDataGridMain-ac-110-sumary">
            <div v-html="`<span style='font-size: 13px !important'>통장내역수:</span> <span style='font-size: 15px !important'>[${dataSource.length}]</span>`
              "></div>
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
              <b>거래내역-</b><span v-if="!!bankbookSelected">{{ bankbookSelected.bankbook.bankbookNickname }}
                {{
                  getNameBankBookUseType(bankbookSelected.bankbook.useType)
                }}</span>
              <b style="margin-right: 5px">-정상여부: </b>
              <div v-if="!!bankbookSelected"
                :class="bankbookSelected.normalTransactionDetails ? 'tag-green-ac110' : 'tag-red-ac110'">{{
                  bankbookSelected.normalTransactionDetails ? 'O' : 'X' }}</div>
            </div>
            <a-spin :spinning="loadingInitializeTransactionDetails || loadingGetBankbookDetails
              " size="large">
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
                    <DxButton :disabled="isRegistered || !rowKeyfocused || isReadonlyByAccountingProcessesStatus"
                      type="default" height="29" :focusStateEnabled="false"
                      style="background: #337ab7; color: white; padding: 9px 0;"
                      @click="handleInitializeTransactionDetails">초기화</DxButton>
                  </template>
                  <template #button-add>
                    <a-tooltip placement="top">
                      <template #title>신규</template>
                      <div>
                        <DxButton :focusStateEnabled="false" @click="addNewRowTransactionDetails"
                          :disabled="isRegistered || !rowKeyfocused || isReadonlyByAccountingProcessesStatus" size="large"
                          style="background: #337ab7; color: white">
                          <PlusOutlined :style="{ fontSize: '17px', color: 'white' }" />
                          신규
                        </DxButton>
                      </div>
                    </a-tooltip>
                  </template>
                  <template #button-save>
                    <a-tooltip placement="top">
                      <template #title>신규</template>
                      <DxButton :focusStateEnabled="false" @click="submitTransactionDetails()" size="large"
                        :disabled="isRegistered || !rowKeyfocused || isReadonlyByAccountingProcessesStatus"
                        style="background: #337ab7; color: white">
                        <SaveOutlined :style="{ fontSize: '17px', color: 'white' }" />
                        저장
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
                        :readOnly="isRegistered || data.rowIndex === 0 || isReadonlyByAccountingProcessesStatus"
                        @focusInput="focusInputIncomeSpending(data, 'income')" />
                      <number-box-money v-else v-model:valueInput="data.data.income" :required="true" :spinButtons="false"
                        :disabled="!!data.data.spending" height="26"
                        :readOnly="isRegistered || isReadonlyByAccountingProcessesStatus"
                        @focusInput="focusInputIncomeSpending(data, 'income')" @changeInput="changeInput()" />
                    </div>
                  </template>
                  <DxColumn caption="지출액" cell-template="spending" width="110" />
                  <template #spending="{ data }">
                    <div :id="`ac110spending${data.rowIndex}${data.columnIndex}`"
                      :class="{ 'disable-input-column': !!data.data.income }">
                      <number-box-money v-if="data.rowIndex === 0" v-model:valueInput="data.data.spending"
                        :required="true" :spinButtons="false" :disabled="!!data.data.income" height="26"
                        :readOnly="isRegistered || data.rowIndex === 0 || isReadonlyByAccountingProcessesStatus"
                        @focusInput="focusInputIncomeSpending(data, 'spending')" />
                      <number-box-money v-else v-model:valueInput="data.data.spending" :required="true"
                        :spinButtons="false" :disabled="!!data.data.income" height="26"
                        :readOnly="isRegistered || isReadonlyByAccountingProcessesStatus"
                        @focusInput="focusInputIncomeSpending(data, 'spending')" @changeInput="changeInput()" />
                    </div>
                  </template>
                  <DxColumn caption="적요" cell-template="summary" width="150" />
                  <template #summary="{ data }">
                    <a-tooltip placement="top" color="black">
                      <template #title>{{ data.data.summary }}</template>
                      <div>
                        <default-text-box v-model:valueInput="data.data.summary" :required="true"
                          :readOnly="isRegistered || isReadonlyByAccountingProcessesStatus" />
                      </div>
                    </a-tooltip>
                  </template>
                  <DxColumn caption="계정과목" cell-template="accountCode" width="175" />
                  <template #accountCode="{ data }">
                    <div v-if="rowKeyfocused" :key="`accountCode${keyRefreshGridDetailAc}`">
                      <SelectAccountCode v-model:valueInput="data.data.accountCode"
                        :classification="!!data.data?.income ? [4] : [5]" :lengthText="10"
                        :readOnly="isRegistered || isReadonlyByAccountingProcessesStatus" />
                    </div>
                  </template>
                  <DxColumn caption="상대계정" cell-template="relationCode" width="175" />
                  <template #relationCode="{ data }">
                    <div v-if="rowKeyfocused" :key="`relationCode${keyRefreshGridDetailAc}`">
                      <SelectAccountCode v-model:valueInput="data.data.relationCode"
                        :classification="data.data.resolutionClassification === 2 ? [4] : [4, 5]"
                        :readOnly="isRegistered || data.data.resolutionClassification === 1 || isReadonlyByAccountingProcessesStatus"
                        :lengthText="10" />
                    </div>
                  </template>
                  <DxColumn caption="자금원천" cell-template="fundingSource" width="120" />
                  <template #fundingSource="{ data }">
                    <FundingSourceSelect v-model:valueInput="data.data.fundingSource" :required="true"
                      :readOnly="isRegistered || isReadonlyByAccountingProcessesStatus" :dropdownTop="true"
                      :idSelect="`FundingSourceSelect${data.rowIndex}`" />
                  </template>
                  <DxColumn caption="거래처" cell-template="clientId" width="150px" />
                  <template #clientId="{ data }">
                    <div>
                      <customer-select v-model:valueInput="data.data.clientId" width="135px" :readOnly="isRegistered ||
                        data.data.resolutionClassification === 1 || isReadonlyByAccountingProcessesStatus
                        " :search-enabled="true" />
                    </div>
                  </template>
                  <DxColumn caption="품의종류" cell-template="letterOfApprovalType" width="100" />
                  <template #letterOfApprovalType="{ data }">
                    <div>
                      <LetterOfApprovalTypeSelect v-model:valueInput="data.data.letterOfApprovalType" :readOnly="isRegistered ||
                        data.data.resolutionClassification === 1 || isReadonlyByAccountingProcessesStatus
                        " :required="data.data.resolutionClassification === 2" />
                    </div>
                  </template>
                  <DxColumn caption="원인/용도" cell-template="causeUsage" alignment="center" />
                  <template #causeUsage="{ data }">
                    <div :class="{
                      'disable-icon-column':
                        data.data.resolutionClassification === 1 ||
                        (isRegistered && !data.data.causeUsage),
                    }">
                      <a-tooltip v-if="!!data.data.causeUsage && data.data.causeUsage.length
                        " placement="top">
                        <template #title>
                          <div class="ac-110-tooltip-memocauseUsage">
                            {{ data.data.causeUsage }}
                          </div>
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
                    <div :class="{
                      'disable-icon-column':
                        data.data.resolutionClassification === 1 ||
                        (isRegistered && !data.data.goodsCount),
                    }">
                      <span v-if="!!data.data.goodsCount &&
                        data.data.resolutionClassification !== 1
                        " style="cursor: pointer" @click="openPopupItemDetail(data.data)">
                        {{ data.data.goodsCount || 0 }}
                      </span>
                      <PlusOutlined v-else style="font-size: 12px" @click="openPopupItemDetail(data.data)" />
                    </div>
                  </template>
                  <DxColumn caption="메모" cell-template="memo" alignment="center" />
                  <template #memo="{ data }">
                    <div :class="{
                      'disable-icon-column':
                        data.data.resolutionClassification === 1 ||
                        (isRegistered && !data.data.memo),
                    }">
                      <a-tooltip v-if="!!data.data.memo && data.data.memo.length" placement="top">
                        <template #title>
                          <div class="ac-110-tooltip-memocauseUsage">
                            {{ data.data.memo }}
                          </div>
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
              @updateAddBankbookDetailProof="updateAddBankbookDetailProof" :bankbookDetailId="rowKeyfocused"
              @updateremoveBankbookDetailProof="updateremoveBankbookDetailProof" @progressingFiles="progressingFiles"
              :disabled="isRegistered || isReadonlyByAccountingProcessesStatus" :limit="10" />
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
    <PopupItemDetails :isModalItemDetail="isModalItemDetail" :data="dataStatementOfGoodsItems"
      :disabled="isRegistered || isReadonlyByAccountingProcessesStatus" :payload="payloadGetTransactionDetails"
      @closePopup="
        (isModalItemDetail = false), (dataStatementOfGoodsItems = {})
        " @updateGoodsCount="updateGoodsCount" />
    <PopupNoteItemDetail :isModalNoteItemDetail="isModalNoteItemDetail" :transactionSelected="transactionSelected"
      @closePopup="isModalNoteItemDetail = false" @submit="updateNoteValue"
      :disabled="isRegistered || isReadonlyByAccountingProcessesStatus" :placeholder="transactionSelected?.key === 'causeUsage'
        ? '원인/용도 입력 ...'
        : '메모 입력 ...'
        " />
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
import { useStore } from "vuex";
import {defineComponent, ref, reactive, computed, watch, nextTick, watchEffect} from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC1/AC110";
import mutations from "@/graphql/mutations/AC/AC1/AC110";
import {makeDataClean } from "@/helpers/commonFunction";
import ProcessStatus from "@/components/common/ProcessStatus.vue";
import {
  DxItem,
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxSummary,
  DxTotalItem,
  DxToolbar,
  DxExport,
  DxLookup,
  DxPaging,
  DxSearchPanel,
} from "devextreme-vue/data-grid";
import {
  HistoryOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons-vue";
import {
  contentPopupRetrieveStatements,
  InitTransactionDetails,
} from "./utils/index";
import { Message } from "@/configs/enum";
import notification from "@/utils/notification";
import DxButton from "devextreme-vue/button";
import PopupSlipCancellation from "./components/PopupSlipCancellation.vue";
import PopupSlipRegistration from "./components/PopupSlipRegistration.vue";
import PopupSlipRegistrationSelected from "./components/PopupSlipRegistrationSelected.vue";
import PopupItemDetails from "./components/PopupItemDetails.vue";
import PopupNoteItemDetail from "./components/PopupNoteItemDetail.vue";
import PopupRetrieveStatements from "./components/PopupRetrieveStatements.vue";
import UploadPreviewImage from "./components/UploadPreviewImage.vue";
import SelectAccountCode from "./components/SelectAccountCode.vue";
import {
  BankType,
  enum2Entries,
  BankBookUseType,
  ResolutionClassification,
  FundingSource,
  LetterOfApprovalType, getJwtObject,
  FacilityBizType
} from "@bankda/jangbuda-common";
import HistoryPopup from "@/components/HistoryPopup.vue";
import dayjs from "dayjs";
import { cloneDeep, isEqual } from "lodash";
import DxCheckBox from 'devextreme-vue/check-box';
import getMyCompanyFacilityBusinesses from "@/graphql/queries/CM/CM110/getMyCompanyFacilityBusinesses";

export default defineComponent({
  components: {
    ProcessStatus,
    DxItem,
    HistoryOutlined,
    DxDataGrid,
    DxColumn,
    DxScrolling,
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
    SelectAccountCode,
    DxCheckBox
  },
  setup() {
    // window.location.reload();
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const companyId = computed(() => sessionStorage.getItem("token") ? getJwtObject(sessionStorage.getItem("token") as string).companyId : null)
    const acYear = computed(() =>
      parseInt(sessionStorage.getItem("acYear") ?? "0")
    );
    const globalFacilityBizId = ref(
      parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0")
    );
    const bankType = BankType.all();
    const bankbookUseType: any = computed(() => {
      let bsDeduction: any = enum2Entries(BankBookUseType).map((value) => ({
        value: value[1],
        label: value[0],
      }));
      return bsDeduction;
    });
    const resolutionClassification: any = computed(() => {
      let bsDeduction: any = enum2Entries(ResolutionClassification).map(
        (value) => ({
          value: value[1],
          label: value[0],
        })
      );
      return bsDeduction;
    });

    const fundingSource: any = computed(() => {
      let bsDeduction: any = enum2Entries(FundingSource).map((value) => ({
        value: value[1],
        label: value[0],
      }));
      return bsDeduction;
    });
    const letterOfApprovalType: any = computed(() => {
      let bsDeduction: any = enum2Entries(LetterOfApprovalType).map(
        (value) => ({
          value: value[1],
          label: value[0],
        })
      );
      return bsDeduction;
    });
    const propListSlipRegistrationSelected: any = ref({
      count: 0,
      selectedRowKeys: [],
    });
    let transactionDetailsCountSelected = ref(0);
    // trigger
    let triggerAccountingProcesses = ref<boolean>(true);
    let triggerBankbookDetails = ref<boolean>(true);

    const refDxDataGridMainAc110 = ref();
    let listAccountingProcesses = ref<any>([]);
    let statusEntering = ref(10);
    let statusInput = ref(20);
    let statusAdjusting = ref(30);
    let statusAdjusted = ref(40);
    let selectedRowKeys = ref<any>([]);
    let rowKeyfocused = ref();
    let firstLoad = ref<boolean>(true);
    let dataSource = ref<any[]>([]);
    let dataSourceTransactionDetails = ref<any>({});
    let listTransactionDetailsOrigin = ref<any>([]);
    let isModalRetrieveStatements = ref(false);
    let isModalSlipCancellation = ref(false);
    let isModalSlipRegistrantion = ref(false);
    let isModalSlipRegistrationSelected = ref(false);
    let isModalItemDetail = ref(false);
    let isModalNoteItemDetail = ref(false);
    let transactionSelected: any = ref();
    let dataStatementOfGoodsItems: any = ref();
    const month = sessionStorage.getItem('month') && Math.abs(Number(sessionStorage.getItem('month'))) < 13 ? Number(sessionStorage.getItem('month')) : dayjs().month() + 1;
    let monthSelected: any = ref(month);
    let valueAccountSubjectClassification = ref(null);
    let valueFundingSource = ref(null);
    const refFormDetailAc110: any = ref();
    let isModalConfirmChangeData = ref(false);
    let itemChange: any = ref(null);
    const payloadGetTransactionDetails: any = reactive({
      companyId: companyId.value,
      fiscalYear: acYear.value,
      facilityBusinessId: globalFacilityBizId.value,
      bankbookDetailDate: null,
      bankbookDetailId: null,
    });
    const payloadGetAccountingProcessLogs: any = reactive({
      companyId: companyId.value,
      fiscalYear: acYear.value,
      facilityBusinessId: globalFacilityBizId.value,
      year: acYear.value,
      month: monthSelected.value,
    });
    const isModalHistory = ref<boolean>(false);
    const isModalHistoryAccountingProcessLogs = ref<boolean>(false);
    let idRowEdit = ref<number>(0);
    const refGridDetailAc110: any = ref();
    let rowKeyfocusedGridDetail: any = ref(null);
    const keyRefreshGridDetailAc = ref(0);
    let rowElementFocus: any = ref(null);
    let isRegisterTransaction = ref(false);
    // COMPUTED
    const bankbookSelected = computed(() =>
      dataSource.value.find(
        (item) => item.bankbookDetailId === rowKeyfocused.value
      )
    );
    const isRegistered = computed(() => {
      return (
        !!bankbookSelected.value?.normalTransactionDetails &&
        !!bankbookSelected.value?.documentRegistered
      );
    });
    const isReadonlyByAccountingProcessesStatus = computed(() => {
      const status = listAccountingProcesses.value.find((item: any) => item.month === monthSelected.value)?.status || 0
      if (status === 20 || status === 30 || status === 40) {
        return true
      } else {
        return false
      }
    })
    let isSelectAll = computed(() => {
      const valueSelect = selectedRowKeys.value.length
      const valueDataSource = dataSource.value.length
      if (valueSelect === valueDataSource && !!valueSelect) {
        return true
      } else if (valueSelect === 0) {
        return false
      } else {
        return null
      }
    })
    const listItemAllowedChoose = computed(() => {
      return dataSource.value.filter((items: any) => items.normalTransactionDetails && !items.documentRegistered).map((items: any) => items.bankbookDetailId) || []
    })

    const isProgressingFiles = ref(false)
    const triggerGetMyCompanyFacilityBusinesses = ref(false)
    // -------------- GRAPHQL --------------
    // queries
    const {onResult} = useQuery(getMyCompanyFacilityBusinesses, {companyId: companyId.value},
      () => ({
        fetchPolicy: "no-cache",
        enabled: triggerGetMyCompanyFacilityBusinesses.value
      }))
    onResult((result) => {
      const companyFacilityBiz = result?.data?.getMyCompanyFacilityBusinesses?.find((item: any) => item.facilityBusinessId === globalFacilityBizId.value)
      console.log('companyFacilityBiz', companyFacilityBiz)
      if (companyFacilityBiz) {
        if(!sessionStorage.getItem('facilityBizType')) {
          // window.location.reload()
        }
        sessionStorage.setItem('facilityBizType', companyFacilityBiz.facilityBizType)
      }
    })
    watchEffect(() => {
      if(!sessionStorage.getItem('facilityBizType')) {
        triggerGetMyCompanyFacilityBusinesses.value = true
      }
    })
    const {
      result: resAccountingProcesses,
      // onResult: onResAccountingProcesses,
      loading: loadingGetAccountingProcesses,
      // refetch,
      // onError
    } = useQuery(
      queries.getAccountingProcesses,
      {
        companyId: companyId.value,
        fiscalYear: acYear.value,
        facilityBusinessId: globalFacilityBizId.value,
      },
      () => ({
        enabled: triggerAccountingProcesses.value,
        fetchPolicy: "no-cache",
      })
    );
    const {
      result: resBankbookDetails,
      // onResult: onResBankbookDetails,
      loading: loadingGetBankbookDetails,
      onError: errorGetBankbookDetails,
    } = useQuery(
      queries.getBankbookDetails,
      payloadGetAccountingProcessLogs,
      () => ({
        enabled: triggerBankbookDetails.value,
        fetchPolicy: "no-cache",
      })
    );
    errorGetBankbookDetails((e) => {
      //notification('error', e.message)
      triggerBankbookDetails.value = false;
    });
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
          ...e.data.syncBankbookDetails.map((items: any) => ({
            ...items,
            contentNoteCustomField: `${items?.content || ""}${items?.note || ""
              }`,
            bankbookDetailDateCustomField: formatDate(items.bankbookDetailDate),
          })),
        ];
        rowKeyfocused.value = dataSource.value[0].bankbookDetailId;
        payloadGetTransactionDetails.bankbookDetailDate =
          dataSource.value[0].bankbookDetailDate;
        payloadGetTransactionDetails.bankbookDetailId =
          dataSource.value[0].bankbookDetailId;
        triggerBankbookDetails.value = true;
      }
      triggerAccountingProcesses.value = true;
      notification("success", Message.getMessage("COMMON", "201").message);
    });
    errorSyncBankbookDetails((e) => {
      //notification('error', e.message)
    });
    const {
      mutate: registerTransactionDetailsToAccountingDocuments,
      onDone: doneRegisterTransactionDetailsToAccountingDocuments,
      onError: errorRegisterTransactionDetailsToAccountingDocuments,
      loading: loadingRegisterTransactionDetailsToAccountingDocuments,
    } = useMutation(mutations.registerTransactionDetailsToAccountingDocuments);
    doneRegisterTransactionDetailsToAccountingDocuments((e) => {
      selectedRowKeys.value = []
      triggerBankbookDetails.value = true;
      notification("success", Message.getMessage("COMMON", "106").message);
    });
    errorRegisterTransactionDetailsToAccountingDocuments((e) => {
      isRegisterTransaction.value = false;
      //notification('error', e.message)
    });
    const {
      mutate: unregisterTransactionDetailsToAccountingDocuments,
      onDone: doneUnregisterTransactionDetailsToAccountingDocuments,
      onError: errorUnregisterTransactionDetailsToAccountingDocuments,
      loading: loadingUnregisterTransactionDetailsToAccountingDocuments,
    } = useMutation(
      mutations.unregisterTransactionDetailsToAccountingDocuments
    );
    doneUnregisterTransactionDetailsToAccountingDocuments((e) => {
      triggerBankbookDetails.value = true;
      notification("success", Message.getMessage("COMMON", "106").message);
    });
    errorUnregisterTransactionDetailsToAccountingDocuments((e) => {
      //notification('error', e.message)
    });
    const {
      mutate: initializeTransactionDetails,
      onDone: doneInitializeTransactionDetails,
      onError: errorInitializeTransactionDetails,
      loading: loadingInitializeTransactionDetails,
    } = useMutation(mutations.initializeTransactionDetails);
    doneInitializeTransactionDetails((e) => {
      triggerBankbookDetails.value = true;
      notification("success", Message.getMessage("COMMON", "106").message);
    });
    errorInitializeTransactionDetails((e) => {
      //notification('error', e.message)
    });
    const {
      mutate: saveTransactionDetails,
      onDone: doneSaveTransactionDetails,
      onError: errorSaveTransactionDetails,
      loading: loadingSaveTransactionDetails,
    } = useMutation(mutations.saveTransactionDetails);
    doneSaveTransactionDetails((e) => {
      if (itemChange.value) {
        if (Number.isInteger(itemChange.value)) {
          dataSourceTransactionDetails.value.transactionDetails = [];
          listTransactionDetailsOrigin.value = [];
          rowKeyfocused.value = null;
          firstLoad.value = true;
          monthSelected.value = itemChange.value;
          payloadGetAccountingProcessLogs.month = itemChange.value;
        } else {
          rowKeyfocused.value = itemChange.value.bankbookDetailId;
          payloadGetTransactionDetails.bankbookDetailDate =
            itemChange.value.bankbookDetailDate;
          payloadGetTransactionDetails.bankbookDetailId =
            itemChange.value.bankbookDetailId;
        }
        itemChange.value = null;
      }
      if (rowElementFocus.value) {
        rowElementFocus.value.classList.remove("dx-state-hover-custom");
      }
      triggerBankbookDetails.value = true;
      notification("success", Message.getMessage("COMMON", "106").message);
    });
    errorSaveTransactionDetails((e) => {
      if (rowElementFocus.value) {
        rowElementFocus.value.classList.remove("dx-state-hover-custom");
      }
      //notification('error', e.message)
    });

    // WATCH
    watch(resAccountingProcesses, (value) => {
      if (
        !!value.getAccountingProcesses &&
        value.getAccountingProcesses.length
      ) {
        listAccountingProcesses.value = value.getAccountingProcesses;
      }
      triggerAccountingProcesses.value = false;
    });

    watch(resBankbookDetails, (value) => {
      if (!!value.getBankbookDetails && value.getBankbookDetails.length) {
        dataSource.value = value.getBankbookDetails.map((items: any) => ({
          ...items,
          contentNoteCustomField: `${items?.content || ""}${items?.note || ""}`,
          bankbookDetailDateCustomField: formatDate(items.bankbookDetailDate),
        }));
        if (firstLoad.value) {
          rowKeyfocused.value = value.getBankbookDetails[0].bankbookDetailId;
          payloadGetTransactionDetails.bankbookDetailDate =
            value.getBankbookDetails[0].bankbookDetailDate;
          payloadGetTransactionDetails.bankbookDetailId =
            value.getBankbookDetails[0].bankbookDetailId;
          getTransactionDetails(value.getBankbookDetails[0]);
        } else {
          getTransactionDetails(
            value.getBankbookDetails.find(
              (item: any) => item.bankbookDetailId === rowKeyfocused.value
            )
          );
        }
      } else {
        dataSource.value = [];
        dataSourceTransactionDetails.value = {};
        listTransactionDetailsOrigin.value = [];
        rowKeyfocused.value = null;
        payloadGetTransactionDetails.bankbookDetailDate = null;
        payloadGetTransactionDetails.bankbookDetailId = null;
      }
      firstLoad.value = false;
      triggerBankbookDetails.value = false;
    });

    const getTransactionDetails = (value: any) => {
      if (!!value && value) {
        dataSourceTransactionDetails.value = cloneDeep(value);
        dataSourceTransactionDetails.value.transactionDetails =
          dataSourceTransactionDetails.value.transactionDetails.map(
            (item: any) => ({
              ...item,
              summary:
                item.summary[item.summary.length - 1] === "중"
                  ? item.summary
                  : `${item.summary} 중`,
            })
          );
        listTransactionDetailsOrigin.value = cloneDeep(
          dataSourceTransactionDetails.value.transactionDetails
        );
      }
    };
    // MOUNTED
    // METHODS
    const getNameBankType = (value: any) => {
      const item: any = bankType.find(
        (items: any) => items.c === value.toString()
      );
      return item.n || "";
    };
    const getNameBankBookUseType = (value: any) => {
      const item: any = bankbookUseType.value.find(
        (item: any) => item.value === value
      );
      return item.label || "";
    };
    const modalHistory = () => {
      isModalHistory.value = true;
    };
    const modalHistoryAccountingProcessLogs = () => {
      isModalHistoryAccountingProcessLogs.value = true;
    };
    const selectedMonth = (month: number) => {
      if (monthSelected.value === month) return;
      if (
        isEqual(
          dataSourceTransactionDetails.value.transactionDetails,
          listTransactionDetailsOrigin.value
        ) ||
        !rowKeyfocused.value
      ) {
        selectedRowKeys.value = []
        dataSourceTransactionDetails.value.transactionDetails = [];
        listTransactionDetailsOrigin.value = [];
        rowKeyfocused.value = null;
        firstLoad.value = true;
        monthSelected.value = month;
        payloadGetAccountingProcessLogs.month = month;
        triggerBankbookDetails.value = true;
      } else {
        itemChange.value = month;
        isModalConfirmChangeData.value = true;
      }
    };

    watch(
      () => monthSelected.value,
      () => {
        refDxDataGridMainAc110.value.instance.clearFilter();
        refDxDataGridMainAc110.value.instance.clearSorting();
      }
    );
    // Grid Main
    let isClickColunmSelect = false
    const onContentReady = (event: any) => {
      nextTick(() => {
        const elCheckBoxAll = event.element.querySelector('.dx-datagrid-headers [aria-colindex="1"]')
        const elCheckBoxs = event.element.querySelectorAll('.dx-datagrid-rowsview [aria-colindex="1"]')
        if (elCheckBoxAll) {
          elCheckBoxAll.style = `
              padding: 0;
            `
        }
        if (elCheckBoxs && elCheckBoxs.length) {
          elCheckBoxs.forEach((el: any) => {
            el.style = `
              padding: 0;
              box-sizing: border-box;
              pointer-events: none;
            `
          })
        }
      })
    }

    const selectionChanged = (value: any) => {
      if (!!value) {
        isClickColunmSelect = true
        if (listItemAllowedChoose.value.includes(value)) {
          if (selectedRowKeys.value.includes(value)) {
            const index = selectedRowKeys.value.findIndex((items: any) => items === value)
            selectedRowKeys.value.splice(index, 1);
          } else {
            selectedRowKeys.value.push(value)
          }
        }
      } else {
        if (selectedRowKeys.value.length) {
          selectedRowKeys.value = []
        } else {
          selectedRowKeys.value = [...listItemAllowedChoose.value]
        }
      }
    };
    const onFocusedRowChanging = (event: any) => {
      if (isClickColunmSelect || isProgressingFiles.value) {
        event.cancel = true;
        return
      }
      if (isRegisterTransaction.value) {
        isRegisterTransaction.value = false;
        selectedRowKeys.value = [];
      }
      if (rowElementFocus.value) {
        rowElementFocus.value.classList.remove("dx-state-hover-custom");
      }
      if (
        rowKeyfocused.value !==
        event.rows[event.newRowIndex].data.bankbookDetailId
      ) {
        if (
          !isEqual(
            dataSourceTransactionDetails.value.transactionDetails,
            listTransactionDetailsOrigin.value
          )
        ) {
          rowElementFocus.value = event.rowElement[0];
          rowElementFocus.value?.classList.add("dx-state-hover-custom");
        }
      }
      event.cancel = true;
    };
    const onRowClick = (event: any) => {
      if (isClickColunmSelect || isProgressingFiles.value) {
        isClickColunmSelect = false
        return
      }
      if (!event?.data) return;
      const item = event.data;
      if (rowKeyfocused.value === item.bankbookDetailId) return;
      if (
        isEqual(
          dataSourceTransactionDetails.value.transactionDetails,
          listTransactionDetailsOrigin.value
        )
      ) {
        rowKeyfocused.value = item.bankbookDetailId;
        payloadGetTransactionDetails.bankbookDetailDate =
          item.bankbookDetailDate;
        payloadGetTransactionDetails.bankbookDetailId = item.bankbookDetailId;
        getTransactionDetails(
          dataSource.value.find(
            (item: any) => item.bankbookDetailId === rowKeyfocused.value
          )
        );
      } else {
        itemChange.value = { ...item };
        isModalConfirmChangeData.value = true;
      }
    };

    const openPopupRetrieveStatements = (value: any) => {
      isModalRetrieveStatements.value = true;
    };
    const openPopupSlipRegistrationSelected = () => {
      propListSlipRegistrationSelected.value.count =
        selectedRowKeys.value.length;
      propListSlipRegistrationSelected.value.selectedRowKeys = dataSource.value
        .filter((items) =>
          selectedRowKeys.value.includes(items.bankbookDetailId)
        )
        .map((e) => e.transactionDetailsCount);
      isModalSlipRegistrationSelected.value = true;
    };
    const openPopupRegistration = (value: any) => {
      transactionDetailsCountSelected.value = value.transactionDetailsCount;
      if (value.documentRegistered) {
        isModalSlipCancellation.value = true;
      } else {
        isModalSlipRegistrantion.value = true;
      }
    };
    const totalDeposits = () => {
      let total = 0;
      dataSource.value.forEach((item) => {
        total += item.deposit;
      });
      return `<span style='font-size: 13px !important'>입금액 합계:</span> <span style='font-size: 15px !important'>[${formatNumber(
        total
      )}]</span>`;
    };
    const totalWithdrawal = () => {
      let total = 0;
      dataSource.value.forEach((item) => {
        total += item.withdraw;
      });
      return `<span style='font-size: 13px !important'>출금액 합계:</span> <span style='font-size: 15px !important'>[${formatNumber(
        total
      )}]</span>`;
    };
    const countSlipRegistration = () => {
      let totalRegistration = 0;
      let totalCancellation = 0;
      dataSource.value.forEach((item) => {
        if (item.documentRegistered) {
          totalRegistration++;
        } else {
          totalCancellation++;
        }
      });
      return `<span style='font-size: 13px !important'>전표등록 여부:</span> <span style='font-size: 15px !important'>[O: ${totalRegistration}, X: ${totalCancellation}]</span>`;
    };
    // ---------------Grid detail----------------
    const totalTransactions = () => {
      let total = !!dataSourceTransactionDetails.value?.transactionDetails
        ? dataSourceTransactionDetails.value?.transactionDetails.length
        : 0;
      return formatNumber(total);
    };

    const sumOfIncome = () => {
      let total = 0;
      if (Object.keys(dataSourceTransactionDetails.value).length) {
        dataSourceTransactionDetails.value.transactionDetails.forEach(
          (item: any) => {
            total += item.income || 0;
          }
        );
      }
      return formatNumber(total);
    };

    const sumOfExpenses = () => {
      let total = 0;
      if (Object.keys(dataSourceTransactionDetails.value).length) {
        dataSourceTransactionDetails.value.transactionDetails.forEach(
          (item: any) => {
            total += item.spending || 0;
          }
        );
      }
      return formatNumber(total);
    };
    // -----------------------Popup---------------------
    const handleConfirmRetrieveStatements = () => {
      isModalRetrieveStatements.value = false;
      syncBankbookDetails({
        companyId: companyId.value,
        fiscalYear: acYear.value,
        facilityBusinessId: globalFacilityBizId.value,
        year: acYear.value,
        month: monthSelected.value,
      });
    };
    const handleConfirmSlipRegistrationSelected = (status: any) => {
      isRegisterTransaction.value = true;
      const keys: any = [];
      dataSource.value.forEach((items) => {
        if (selectedRowKeys.value.includes(items.bankbookDetailId)) {
          keys.push({
            bankbookDetailDate: items.bankbookDetailDate,
            bankbookDetailId: items.bankbookDetailId,
          });
        }
      });
      isModalSlipRegistrationSelected.value = false;
      registerTransactionDetailsToAccountingDocuments({
        companyId: companyId.value,
        fiscalYear: acYear.value,
        facilityBusinessId: globalFacilityBizId.value,
        keys: keys,
      });
    };
    const handleSlipRegistration = () => {
      const keys: any = [];
      dataSource.value.forEach((items) => {
        if (rowKeyfocused.value === items.bankbookDetailId) {
          keys.push({
            bankbookDetailDate: items.bankbookDetailDate,
            bankbookDetailId: items.bankbookDetailId,
          });
        }
      });
      isModalSlipRegistrantion.value = false;
      registerTransactionDetailsToAccountingDocuments({
        companyId: companyId.value,
        fiscalYear: acYear.value,
        facilityBusinessId: globalFacilityBizId.value,
        keys: keys,
      });
    };
    const handleConfirmSlipCancellation = () => {
      let bankbookDetailDate = null;
      let bankbookDetailId = null;
      dataSource.value.forEach((items) => {
        if (rowKeyfocused.value === items.bankbookDetailId) {
          bankbookDetailDate = items.bankbookDetailDate;
          bankbookDetailId = items.bankbookDetailId;
        }
      });
      isModalSlipCancellation.value = false;
      unregisterTransactionDetailsToAccountingDocuments({
        companyId: companyId.value,
        fiscalYear: acYear.value,
        facilityBusinessId: globalFacilityBizId.value,
        bankbookDetailDate,
        bankbookDetailId,
      });
    };
    const handleInitializeTransactionDetails = () => {
      if (rowKeyfocused.value === null || isRegistered.value) return;
      initializeTransactionDetails(payloadGetTransactionDetails);
    };
    const openPopupItemDetail = (data: any) => {
      if (data.resolutionClassification === 1) return;
      dataStatementOfGoodsItems.value = data;
      isModalItemDetail.value = true;
    };
    const openPopupNoteItemDetail = (data: any, key: string) => {
      if (data.data.resolutionClassification === 1) return;
      transactionSelected.value = {
        index: data.rowIndex,
        key: key,
        noteValue: data.data[key],
      };
      isModalNoteItemDetail.value = true;
    };

    const updateNoteValue = (value: any) => {
      dataSourceTransactionDetails.value.transactionDetails[value.index][
        value.key
      ] = value.noteValue;
      isModalNoteItemDetail.value = false;
    };
    const addNewRowTransactionDetails = () => {
      if (rowKeyfocused.value === null || isRegistered.value) return;

      const initTransactionDetails: any = { ...InitTransactionDetails };
      const lengthData =
        dataSourceTransactionDetails.value.transactionDetails.length;
      if (lengthData > 0) {
        const firstTransactionDetail = dataSourceTransactionDetails.value.transactionDetails[0];
        if (lengthData === 1) {
          initTransactionDetails.theOrder = firstTransactionDetail.theOrder + 1 || 1;
          initTransactionDetails.accountingDocumentId = firstTransactionDetail.accountingDocumentId + 1 + "create" || "create";
        } else {
          const beforTransactionDetail = dataSourceTransactionDetails.value.transactionDetails[lengthData - 1];
          initTransactionDetails.theOrder = beforTransactionDetail.theOrder + 1 || 1;
          initTransactionDetails.accountingDocumentId = beforTransactionDetail.accountingDocumentId + 1 + "create" || "create";
        }
        initTransactionDetails.summary = firstTransactionDetail.summary;
        initTransactionDetails.letterOfApprovalType = firstTransactionDetail.letterOfApprovalType
      } else {
        initTransactionDetails.theOrder = 0;
        initTransactionDetails.accountingDocumentId = "create";
      }
      dataSourceTransactionDetails.value.transactionDetails = [
        ...dataSourceTransactionDetails.value.transactionDetails,
        initTransactionDetails,
      ];
      console.log(dataSourceTransactionDetails.value.transactionDetails);

      nextTick(() => {
        rowKeyfocusedGridDetail.value =
          initTransactionDetails.accountingDocumentId;
      });
    };
    const submitTransactionDetails = async () => {
      if (rowKeyfocused.value === null || isRegistered.value) {
        if (rowElementFocus.value) {
          rowElementFocus.value.classList.remove("dx-state-hover-custom");
        }
        return;
      }
      const res = refFormDetailAc110.value.validate();
      if (!res.isValid) {
        if (rowElementFocus.value) {
          rowElementFocus.value.classList.remove("dx-state-hover-custom");
        }
        return;
      }
      dataSourceTransactionDetails.value.transactionDetails =
        dataSourceTransactionDetails.value.transactionDetails.map(
          (item: any) => {
            if (Number.isInteger(item.accountingDocumentId)) {
              return item;
            } else {
              return {
                ...InitTransactionDetails,
                ...item,
              };
            }
          }
        );
      const payLoadUpdate: any = [];
      const payloadCreate: any = [];
      dataSourceTransactionDetails.value.transactionDetails.forEach(
        (item: any) => {
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
            statementOfGoodsItems: item.statementOfGoodsItems,
          };
          if (item.accountingDocumentId.toString().includes("create")) {
            payloadCreate.push(objPayload);
          } else {
            payLoadUpdate.push({
              ...objPayload,
              accountingDocumentId: item.accountingDocumentId,
            });
          }
        }
      );
      if (payloadCreate.length) {
        const payloadClear = makeDataClean({
          ...payloadGetTransactionDetails,
          updates: payLoadUpdate,
          creates: payloadCreate,
        });
        saveTransactionDetails(payloadClear);
      } else {
        const payloadClear = makeDataClean({
          ...payloadGetTransactionDetails,
          updates: payLoadUpdate,
        });
        saveTransactionDetails(payloadClear);
      }
    };

    const updateAddBankbookDetailProof = (bankbookDetailIdEdited: any) => {
      const indexSelected = dataSource.value.findIndex(
        (item: any) => item.bankbookDetailId === bankbookDetailIdEdited
      );
      dataSource.value[indexSelected].proofCount++;
    };

    const updateremoveBankbookDetailProof = (bankbookDetailIdEdited: any) => {
      const indexSelected = dataSource.value.findIndex(
        (item: any) => item.bankbookDetailId === bankbookDetailIdEdited
      );
      dataSource.value[indexSelected].proofCount--;
    };

    const progressingFiles = (value: boolean) => {
      isProgressingFiles.value = value
    }

    const focusInputIncomeSpending = (data: any, key: string) => {
      if (key === "income") {
        if (!data.data.income) {
          data.data.income = null;
        }
        data.data.resolutionClassification = 1;
        data.data.spending = 0;
      } else {
        if (!data.data.spending) {
          data.data.spending = null;
        }
        data.data.resolutionClassification = 2;
        data.data.income = 0;
      }
      nextTick(() => {
        const elInput: any = document.querySelector(
          `#ac110${key}${data.rowIndex}${data.columnIndex} .dx-texteditor-input`
        );
        if (!!elInput) {
          elInput.focus();
        }
      });
    };

    const updateGoodsCount = (accountingDocumentId: any, value: any) => {
      const indexTransition =
        dataSourceTransactionDetails.value.transactionDetails.findIndex(
          (item: any) => item.accountingDocumentId === accountingDocumentId
        );
      dataSourceTransactionDetails.value.transactionDetails[
        indexTransition
      ].goodsCount = value.length;
      dataSourceTransactionDetails.value.transactionDetails[
        indexTransition
      ].statementOfGoodsItems = [...value];
    };

    const changeInput = () => {
      let totalInComeInput = 0;
      let totalSpendingInput = 0;
      dataSourceTransactionDetails.value.transactionDetails.forEach(
        (item: any, i: number) => {
          if (i > 0) {
            if (!!item.income) {
              totalInComeInput += item.income;
            }
            if (!!item.spending) {
              totalSpendingInput += item.spending;
            }
          }
        }
      );
      if (dataSourceTransactionDetails.value.deposit > 0) {
        dataSourceTransactionDetails.value.transactionDetails[0].income =
          dataSourceTransactionDetails.value.deposit -
          totalInComeInput +
          totalSpendingInput;
      } else {
        dataSourceTransactionDetails.value.transactionDetails[0].spending =
          dataSourceTransactionDetails.value.withdraw -
          totalSpendingInput +
          totalInComeInput;
      }
    };
    // ------------------method common------------------
    const formatNumber = (value: number) => {
      if (Number.isInteger(value)) {
        return new Intl.NumberFormat().format(value);
      } else {
        return 0;
      }
    };

    const handleConfirmChangeData = (status: boolean) => {
      if (status) {
        submitTransactionDetails();
      } else {
        if (rowElementFocus.value) {
          rowElementFocus.value.classList.remove("dx-state-hover-custom");
        }
        if (Number.isInteger(itemChange.value)) {
          dataSourceTransactionDetails.value.transactionDetails = [];
          listTransactionDetailsOrigin.value = [];
          rowKeyfocused.value = null;
          firstLoad.value = true;
          monthSelected.value = itemChange.value;
          payloadGetAccountingProcessLogs.month = itemChange.value;
          triggerBankbookDetails.value = true;
        } else {
          rowKeyfocused.value = itemChange.value.bankbookDetailId;
          payloadGetTransactionDetails.bankbookDetailDate =
            itemChange.value.bankbookDetailDate;
          payloadGetTransactionDetails.bankbookDetailId =
            itemChange.value.bankbookDetailId;
          getTransactionDetails(
            dataSource.value.find(
              (item: any) => item.bankbookDetailId === rowKeyfocused.value
            )
          );
        }
        itemChange.value = null;
      }
      isModalConfirmChangeData.value = false;
    };

    const formatDate = (date: any) => {
      date = date.toString();
      return dayjs(date).format("YYYY-MM-DD");
    };
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
      listItemAllowedChoose,
      isSelectAll,
      onContentReady,
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
      progressingFiles,
      refGridDetailAc110,
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
      changeInput,
      isReadonlyByAccountingProcessesStatus
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
}
</style>
<style lang="scss" scoped>
#DxDataGridMainAc110 {
  height: calc(100vh - 540px);

  :deep .dx-freespace-row {
    display: none !important;
  }

  // :deep #dx-col-1 {
  //   padding: 0;
  // }

  // :deep td[aria-describedby="dx-col-1"] {
  //   padding: 0;
  //   box-sizing: border-box;
  //   pointer-events: none;
  // }

  .ac-110-checkboxAll {
    cursor: pointer;
    width: 70px;
    text-align: center;
    justify-content: center;
    height: 26px;
    padding-top: 2px;

    :deep .dx-checkbox.dx-state-readonly .dx-checkbox-icon {
      border-color: #c7c7c7;
      cursor: pointer;
    }

    &-disable {
      pointer-events: none;
      opacity: 0.2;
    }
  }

  .ac-110-checkbox {
    cursor: pointer;
    width: 70px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: auto;

    :deep .dx-checkbox.dx-state-readonly .dx-checkbox-icon {
      border-color: #c7c7c7;
      cursor: pointer;
    }

    &-disable {
      pointer-events: none;
      opacity: 0.2;
    }
  }
}
</style>
