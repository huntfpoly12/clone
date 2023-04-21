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
            {{ dataSource }}
            <div class="data-grid" :style="[store.state.common.ac120.statusShowFull ? {} : { height: heightTable }]">
                <a-spin tip="Loading..." :spinning="loadingGetAccountingDocuments">
                    <!-- <DxDataGrid key-expr="fill1" :show-row-lines="true" :data-source="dataSource" :show-borders="true"
                        :allow-column-reordering="move_column" v-model:focused-row-key="focusedRowKey"
                        :allow-column-resizing="colomn_resize" :column-auto-width="true"
                        @selection-changed="selectionChanged">
                        <DxRowDragging :allow-reordering="true" :show-drag-icons="true" />
                        <DxScrolling mode="standard" show-scrollbar="always" />
                        <DxColumn caption="일자" data-field="fill1" cell-template="fill1" />
                        <template #fill1="{ data }">
                            {{ $filters.formatDate(data.value) }}
                        </template>
                        <DxColumn caption="순번" cell-template="fill2" css-class="custom-column" />
                        <template #fill2="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <a-tooltip placement="left" title="{은행명} {통장번호} ">
                                    <div>{{ item.fill2 }}</div>
                                </a-tooltip>
                            </div>
                        </template>
                        <DxColumn caption="결의번호" cell-template="fill3" css-class="custom-column" />
                        <template #fill3="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <div>{{ item.fill3 }}</div>
                            </div>
                        </template>
                        <DxColumn caption="통장" cell-template="fill4" css-class="custom-column" />
                        <template #fill4="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <div>{{ item.fill4 }}</div>
                            </div>
                        </template>
                        <DxColumn caption="결의 구분" cell-template="fill5" css-class="custom-column" />
                        <template #fill5="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <div>{{ item.fill5 }}</div>
                            </div>
                        </template>
                        <DxColumn caption="수입액" cell-template="fill6" css-class="custom-column" />
                        <template #fill6="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <div>{{ item.fill6 }}</div>
                            </div>
                        </template>
                        <DxColumn caption="지출액" cell-template="fill7" css-class="custom-column" />
                        <template #fill7="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <div>{{ item.fill7 }}</div>
                            </div>
                        </template>
                        <DxColumn caption="잔액" cell-template="fill8" css-class="custom-column" />
                        <template #fill8="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <div>{{ item.fill8 }}</div>
                            </div>
                        </template>
                        <DxColumn caption="통장적요" cell-template="fill9" css-class="custom-column" />
                        <template #fill9="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <div>{{ item.fill9 }}</div>
                            </div>
                        </template>
                        <DxColumn caption="적요" cell-template="fill10" css-class="custom-column" />
                        <template #fill10="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <div>{{ item.fill10 }}</div>
                            </div>
                        </template>
                        <DxColumn caption="계정과목" cell-template="fill11" css-class="custom-column" />
                        <template #fill11="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <div>{{ item.fill11 }}</div>
                            </div>
                        </template>
                        <DxColumn caption="상대계정" cell-template="fill12" css-class="custom-column" />
                        <template #fill12="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <div>{{ item.fill12 }}</div>
                            </div>
                        </template>
                        <DxColumn caption="자금원천" cell-template="fill13" css-class="custom-column" />
                        <template #fill13="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <div>{{ item.fill13 }}</div>
                            </div>
                        </template>
                        <DxColumn caption="거래처" cell-template="fill14" css-class="custom-column" />
                        <template #fill14="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <div>{{ item.fill14 }}</div>
                            </div>
                        </template>
                        <DxColumn caption="증빙" cell-template="fill15" css-class="custom-column" />
                        <template #fill15="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <div>{{ item.fill15 }}</div>
                            </div>
                        </template>
                        <DxColumn caption="물품 내역" cell-template="normality" css-class="custom-column" />
                        <template #normality="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <PlusOutlined style="font-size: 12px" @click="actionPopupItemDetail" />
                            </div>
                        </template>
                        <DxColumn caption="수기 여부 " cell-template="slipRegistration" css-class="custom-column" />
                        <template #slipRegistration="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
                                <div class="slipRegistration">
                                    <button-basic :text="item.slipRegistration ? 'O' : 'X'"
                                        :type="item.slipRegistration ? 'success' : 'danger'" :mode="'contained'"
                                        style="margin-right: 5px;" />
                                </div>
                            </div>

                        </template>
                        <DxColumn caption="정상 여부" cell-template="slipRegistration1" css-class="custom-column" />
                        <template #slipRegistration1="{ data }">
                            <div class="main-row" v-for="(item, index) in data.data.data" :key="index"
                                :class="{ last: index === data.data.data.length - 1 }">
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
                    {{ store.state.common.ac120.selectedRowKeys }}
                    {{ focusedRowKey }}
                    <DxDataGrid id="dataGridAc120" key-expr="bankbookDetailId" :show-row-lines="true"
                        :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true" ref="gridRefAC120"
                        :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                        :column-auto-width="true" :onRowPrepared="onCellPrepared"
                        v-model:selected-row-keys="store.state.common.ac120.selectedRowKeys"
                        @selection-changed="selectionChanged">
                        <DxRowDragging :allow-reordering="true" :show-drag-icons="true" :on-reorder="onReorder"
                            :on-drag-change="onDragChange" :onRowDragging="onRowDragging" />
                        <DxSelection :deferred="true" select-all-mode="allPages" show-check-boxes-mode="onClick"
                            mode="multiple" />
                        <DxScrolling mode="standard" show-scrollbar="always" />

                        <DxColumn caption="일자" cell-template="transactionDetailDate" />
                        <template #transactionDetailDate="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="transactionDetailDate" cell-template="transactionDetailDateDetail" />
                                <template #transactionDetailDateDetail="{ data }">
                                    {{ $filters.formatDate(data.value) }}
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="순번" data-field="documentOrderByDate" cell-template="documentOrderByDate" />
                        <template #documentOrderByDate="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="documentOrderByDate" />
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="결의번호" data-field="resolutionClassification" cell-template="resolutionNumber" />
                        <template #resolutionNumber="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="resolutionNumber" />
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="통장" cell-template="bankbook" data-field="bankbook" />
                        <template #bankbook="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="bankbook" cell-template="bankbookDetail" />
                                <template #bankbookDetail="{ data }">
                                    <a-tooltip placement="top"
                                        :title="data.data.bankbook?.type + ' ' + data.data.bankbook?.bankbookNumber">
                                        <div>{{ data.data.bankbook?.bankbookNickname }}</div>
                                    </a-tooltip>
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="결의 구분" cell-template="resolutionClassification" />
                        <template #resolutionClassification="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="resolutionClassification" />
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="수입액" cell-template="income" />
                        <template #income="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="income" />
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="지출액" cell-template="spending" />
                        <template #spending="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="spending" />
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="잔액" cell-template="balance" />
                        <template #balance="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="balance" cell-template="balanceDetail" />
                                <template #balanceDetail="{ data }">
                                    {{ $filters.formatCurrency(data.data.lastBalance + data.data.spending -
                                        data.data.balance) }}
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="통장적요" data-field="summaryOfBankbookDetail"
                            cell-template="summaryOfBankbookDetail" />
                        <template #summaryOfBankbookDetail="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="summaryOfBankbookDetail" />

                            </DxDataGrid>
                        </template>

                        <DxColumn caption="적요" data-field="summary" cell-template="summary1" />
                        <template #summary1="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="summary" />
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="계정과목" data-field="accountCode" cell-template="accountCode" width="200px" />
                        <template #accountCode="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="accountCode" cell-template="accountCodeDetail" />
                                <template #accountCodeDetail="{ data }">
                                    <account-code-select :valueInput="data.data.accountCode" :disabled="true" />
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="상대계정" data-field="relationCode" cell-template="relationCode" width="150px" />
                        <template #relationCode="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="relationCode" cell-template="relationCodeDetail" />
                                <template #relationCodeDetail="{ data }">
                                    <account-code-select :valueInput="data.data.relationCode" :disabled="true" />
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="자금원천" data-field="fundingSource" cell-template="fundingSource" />
                        <template #fundingSource="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="fundingSource" cell-template="fundingSourceDetail" />
                                <template #fundingSourceDetail="{ data }">
                                    {{ data.value }}
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="거래처" data-field="clientId" cell-template="clientId" />
                        <template #clientId="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="clientId" cell-template="clientIdDetail" />
                                <template #clientIdDetail="{ data }">
                                    {{ clients.find((item: any) => item.value == data.data.clientId)?.label }}
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="증빙" data-field="proofCount" format="fixedPoint" cell-template="proofCount" />
                        <template #proofCount="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="proofCount" cell-template="proofCountDetail" />
                                <template #proofCountDetail="{ data }">
                                    {{ data.value }}
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="물품 내역" cell-template="normality" css-class="cell-center" />
                        <template #normality="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child icon-add"
                                :showColumnHeaders="false" :show-row-lines="true" :hoverStateEnabled="true"
                                :data-source="data.data.data">
                                <DxColumn data-field="normality" cell-template="normalityDetail" css-class="cell-center" />
                                <template #normalityDetail="{ data }">
                                    <PlusOutlined v-if="data.data.resolutionClassification != 1" class="icon-add"
                                        @click="actionPopupItemDetail(data.data)" />
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="수기 여부" cell-template="slipRegistration" />
                        <template #slipRegistration="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="slipRegistration" cell-template="slipRegistrationDetail" />
                                <template #slipRegistrationDetail="{ data }">
                                    <div class="slipRegistration">
                                        <DxButton :focusStateEnabled="false" :text="data.data.handwriting ? 'O' : 'X'"
                                            :style="{ backgroundColor: data.data.handwriting ? '#337614' : '#BB3835', color: 'white' }"
                                            :height="$config_styles.HeightInput" />
                                    </div>
                                </template>
                            </DxDataGrid>
                        </template>

                        <DxColumn caption="정상 여부" cell-template="resolutionNormalStatus" />
                        <template #resolutionNormalStatus="{ data }">
                            <DxDataGrid ref="gridRefAC120Detail" key-expr="accountingDocumentId" :onRowClick="actionEditTaxPay"
                                @focused-row-changing="onFocusedRowChanging" :focused-row-enabled="true"
                                v-model:focused-row-key="focusedRowKey" class="data-grid-child" :showColumnHeaders="false"
                                :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data.data">
                                <DxColumn data-field="resolutionNormalStatus"
                                    cell-template="resolutionNormalStatusDetail" />
                                <template #resolutionNormalStatusDetail="{ data }">
                                    <div class="slipRegistration">
                                        <DxButton :focusStateEnabled="false"
                                            :text="data.data.resolutionNormalStatus ? 'O' : 'X'"
                                            :style="{ backgroundColor: data.data.resolutionNormalStatus ? '#337614' : '#BB3835', color: 'white' }"
                                            :height="$config_styles.HeightInput" />
                                    </div>
                                </template>
                            </DxDataGrid>
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

        const gridRefAC120 = ref(); // ref of grid
        const gridRefAC120Detail = ref(); // ref of grid
        // const dataGridRef = computed(() => gridRefAC120.value?.instance as any); // ref of grid Instance

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
            mutate: reorderAccountingDocuments, onDone: doneReorderAccountingDocuments, onError: errorReorderAccountingDocuments,
        } = useMutation(mutations.reorderAccountingDocuments);

        // ============== ON DONE MUTATION GRAPHQL ===============
        // reorderAccountingDocuments
        doneReorderAccountingDocuments((e) => {
            notification('success', Message.getMessage('COMMON', '106').message)
        })
        errorReorderAccountingDocuments(e => {
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

            // dataSource.value = value.getAccountingDocuments?.accountingDocuments
            let dataApi = value.getAccountingDocuments?.accountingDocuments
            let dataAll: any = []
            dataApi.map((item: any, index: number) => {
                if (item.bankbookDetailId) { // nếu có data bankbookDetailId
                    if (!dataAll.filter((row: any) => row.bankbookDetailId === item.bankbookDetailId).length) { // nếu không có thằng bankbookDetailId đó trong mảng
                        dataAll.push({
                            bankbookDetailId: item.bankbookDetailId,
                            data: dataApi.filter((row: any) => row.bankbookDetailId === item.bankbookDetailId)
                        })
                    }
                } else {
                    dataAll.push({
                        bankbookDetailId: index,
                        data: [item]
                    })
                }
            })
            console.log(dataAll);

            dataSource.value = dataAll
            lastBalance.value = value.getAccountingDocuments?.lastBalance

            if (dataSource.value[0]) { // if table has data source
                focusedRowKey.value = dataSource.value[0]?.data[0]?.accountingDocumentId
                store.state.common.ac120.selectedRowKeys = [dataSource.value[0].bankbookDetailId]
                Object.assign(store.state.common.ac120.formData, dataSource.value[0].data[0])
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
            // gridRefAC120.value?.instance.refresh();
            data.component.getSelectedRowsData().then((rowData: any) => {
                dataRows.value = rowData
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
                // focusedRowKey.value = e.rows[e.newRowIndex]?.data.accountingDocumentId
                // store.state.common.ac120.dataRowFocus = e.rows[e.newRowIndex]?.data
                console.log(e.rows[e.newRowIndex]?.data);

                Object.assign(store.state.common.ac120.formData, e.rows[e.newRowIndex]?.data)
                if (store.state.common.ac120.statusFormAdd && store.state.common.ac120.formData.accountingDocumentId != 'AC120') {
                    deleteRowAdd()
                }
                // store.state.common.ac120.selectedRowKeys = [e.rows[e.newRowIndex]?.data.accountingDocumentId]
                // gridRefAC120.value?.instance.refresh();
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
            console.log(e.toIndex);
            console.log(e.component.getVisibleRows());
            const visibleRows = e.component.getVisibleRows();
            console.log(visibleRows[e.toIndex].data);
            console.log(e.itemData);

            // const toIndex = dataSource.value.findIndex((item: any) => item.bankbookId === visibleRows[e.toIndex].data.bankbookId);
            // const fromIndex = dataSource.value.findIndex((item: any) => item.bankbookId === e.itemData.bankbookId);

            // console.log(e);
            // if (e.toIndex >= dataDemoMain2.length) {
            //     e.toIndex = dataDemoMain2.length - 1;
            // }
            // if (e.fromIndex !== e.toIndex) {
            //     const item = dataDemoMain2[e.fromIndex];
            //     dataDemoMain2.splice(e.fromIndex, 1);
            //     dataDemoMain2.splice(e.toIndex, 0, item);
            // }
            // reorderAccountingDocuments({
            //     companyId: companyId,
            //     fiscalYear: globalYear.value,
            //     facilityBusinessId: globalFacilityBizId.value,
            //     // transactionDetailDate: Int!
            // })
        }

        const onDragChange = (e: any) => {
            // console.log(e);

        }
        const onDragStart = (e: any) => {

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
            dataSource.value = JSON.parse(JSON.stringify(dataSource.value)).concat({ data: [initialStateFormData], bankbookDetailId: 'AC120' })
            store.state.common.ac120.formData = dataSource.value[dataSource.value.length - 1]?.data[0]
            focusedRowKey.value = 'AC120';
            gridRefAC120Detail.value?.instance.refresh()
            gridRefAC120.value?.instance.refresh()
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

        const actionEditTaxPay = async (e: any) => {
            console.log(e);
            
            await (focusedRowKey.value = null)
        // setTimeout(() => {
            await (focusedRowKey.value = e.data.accountingDocumentId)
        // }, 100);
            // focusedRowKey.value = e.data.accountingDocumentId
            // formState.value = e.row?.data;
            // previousRowData.value = cloneDeep(e.row?.data);
        }

        const onCellPrepared = (e: any) => {
            // if (e.data) {
            //     if (e.data.amount == e.data.amountNew) {
            //         e.rowElement.style.color = 'black';
            //     } else {
            //         e.rowElement.style.color = 'red';
            //     }
            //     e.cells[0].cellElement.style.color = 'black';
            //     e.cells[2].cellElement.style.color = 'black';
            // }

            // console.log();
            // console.log();
            // console.log();

            if (e.rowType !== "data") {
                return;
            }
            console.log(e.rowType, e.data, e.rowIndex, e.rowElement, e.cells);
            // e.cells[0].cellElement.rowSpan = 2
            // if (e.cellElement) {
            //     e.cellElement.rowSpan = 2;
            //     console.log(e.cellElement?.rowSpan);

            //     e.cellElement.innerHTML = "<div>My Text</div>";
            // } else {
            //     // e.cellElement.style.display = "none";
            // }
        }

        return {
            dataGetAccountingProcesses,
            dataSource,
            onFillDataAdd,
            loadingGetAccountingProcesses,
            loadingGetAccountingDocuments,
            dataRows,
            onFocusedRowChanging,
            onCellPrepared,
            actionEditTaxPay,
            gridRefAC120Detail,
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
            onDragStart,

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
            gridRefAC120,
        };
    },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
