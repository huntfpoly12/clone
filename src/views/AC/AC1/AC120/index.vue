<template>
    <action-header :buttonDelete="false" :buttonSearch="false" :buttonSave="false" :buttonPrint="false" />
    <div class="ac-120">
        <div class="top">
            <div class="grid">
                <div 
                  v-for="(month, index) in 12" :key="index" 
                  class="items" 
                  :class="{ 'items-active': monthSelected === month }"
                  @click="selectedMonth(month)">
                  <colorful-badge 
                    :value="dataGetAccountingProcesses.find((item: any) => item.month === month)?.status || null" 
                    :year="globalYear" 
                    :month="month"/>
              </div>
            </div>
            <div class="flex">
                <ProcessStatus :valueStatus="statusAdjusting" :disabled="true" />
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
                    <DxButton class="ml-4 custom-button-checkbox custom-button" type="default"
                        :height="$config_styles.HeightInput" @click="actionPopupSlipCancellation">
                        <div class="d-flex-center">
                            <checkbox-basic :valueCheckbox="true" disabled="true" />
                            <span class="pl-5">전표취소</span>
                        </div>
                    </DxButton>
                    <HistoryOutlined style="font-size: 18px; margin-left: 5px;" />
                </div>
            </div>
        </div>
        <div class="main">
            <div class="data-grid" ref="refCssTable" :style="[statusShowFull ? {} : { height: heightTable }]">
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

                <DxDataGrid id="dataGridAc120" key-expr="id" :show-row-lines="true" :hoverStateEnabled="true"
                    :data-source="dataSource" :show-borders="true" :allow-column-reordering="move_column"
                    v-model:focused-row-key="focusedRowKey" :allow-column-resizing="colomn_resize" :column-auto-width="true"
                    @selection-changed="selectionChanged">
                    <DxRowDragging :allow-reordering="true" :show-drag-icons="true" :on-reorder="onReorder"
                        :on-drag-change="onDragChange" :allowDropInsideItem="true" :onRowDragging="onRowDragging" />
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxColumn caption="일자" data-field="transactionDetailDate" cell-template="transactionDetailDate" />
                    <template #transactionDetailDate="{ data }">
                        {{ $filters.formatDate(data.value) }}
                    </template>
                    <DxColumn caption="순번" data-field="documentOrderByDate" />
                    <DxColumn caption="결의번호" data-field="resolutionNumber" />
                    <DxColumn caption="통장" cell-template="bankbook" data-field="bankbook"/>
                    <template #bankbook="{ data }">
                        <a-tooltip placement="left" :title="data.bankbook.type + ' ' + data.bankbook.bankbookNumber ">
                            <div>{{ data.bankbook.bankbookNickname }}</div>
                        </a-tooltip>
                    </template>

                    <DxColumn caption="결의 구분" data-field="resolutionClassification" />
                    <DxColumn caption="수입액" data-field="income" />
                    <DxColumn caption="지출액" data-field="spending" format="fixedPoint"/>
                    <DxColumn caption="잔액" cell-template="balance" format="fixedPoint"/>
                    <template #balance="{ data }">
                        {{ $filters.formatCurrency(data.lastBalance + data.spending - data.balance) }}
                    </template>
                    <DxColumn caption="통장적요" data-field="summaryOfBankbookDetail" format="fixedPoint"/>
                    <DxColumn caption="적요" data-field="summary" format="fixedPoint"/>
                    <DxColumn caption="계정과목" data-field="accountCode" cell-template="accountCode"/>
                    <template #accountCode="{ data }">
                        <account-code-select v-model:valueInput="data.accountCode" :disabled="true" />
                    </template>
                    <DxColumn caption="상대계정" data-field="relationCode" cell-template="relationCode"/>
                    <template #relationCode="{ data }">
                        <account-code-select v-model:valueInput="data.relationCode" :disabled="true" />
                    </template>

                    <DxColumn caption="자금원천" data-field="fundingSource" />
                    <DxColumn caption="거래처" data-field="clientId" />
                    <DxColumn caption="증빙" data-field="proofCount" format="fixedPoint"/>

                    <DxColumn caption="물품 내역" cell-template="normality" />
                    <template #normality="{ data }">
                        <PlusOutlined style="font-size: 12px" @click="actionPopupItemDetail(data.goodsCount)" />
                    </template>
                    <DxColumn caption="수기 여부" cell-template="slipRegistration" />
                    <template #slipRegistration="{ data }">
                        <div class="slipRegistration">
                            <button-basic :text="data.handwriting ? 'O' : 'X'"
                                :type="data.handwriting ? 'success' : 'danger'" :mode="'contained'"
                                style="margin-right: 5px;" />
                        </div>
                    </template>
                    <DxColumn caption="정상 여부" cell-template="slipRegistration1" />
                    <template #slipRegistration1="{ data }">
                        <div class="slipRegistration">
                            <button-basic :text="data.resolutionNormalStatus ? 'O' : 'X'"
                                :type="data.resolutionNormalStatus ? 'success' : 'danger'" :mode="'contained'"
                                style="margin-right: 5px;" />
                        </div>
                    </template>
                    <DxSummary>
                        <DxTotalItem column="순번" summary-type="count" display-format="전표 건수: {0}" />
                        <DxTotalItem cssClass="custom-sumary" column="수입액" summary-type="sum" display-format="수입액 합계: {0}" />
                        <DxTotalItem cssClass="custom-sumary" column="지출액" summary-type="sum" display-format="지출액 합계: {0}" />
                        <DxTotalItem cssClass="custom-sumary" column="잔액" :customize-text="customBalance" />
                        <DxTotalItem cssClass="custom-sumary" column="정상 여부" :customize-text="countResolutionNormalStatus" />
                    </DxSummary>
                </DxDataGrid>
            </div>


            <a-row class="detail">
                <a-col class="detail1">
                    <div class="text-align-center button-arrow" :class="statusShowFull ? 'rotate' : ''">
                        <img @click="toggleTransition" src="@/assets/images/iconArrowUp.png" alt="">
                    </div>
                    <div class="column">
                        <a-spin :spinning="false">
                            <StandardForm formName="ac-120-form" ref="refFormAC120">
                                <a-row class="text-align-center">
                                    <a-col :span="8"></a-col>
                                    <a-col :span="8">
                                        <div style="display: flex; justify-content: center;">
                                            <h2>결의서</h2>
                                            <button-basic style="margin: 0 10px;" text="O" type="success"
                                                :mode="'contained'" />
                                            <button-basic text="X" type="danger" :mode="'contained'" />
                                        </div>
                                    </a-col>
                                    <a-col :span="8">
                                        <div style="display: flex; justify-content: flex-end;">
                                            <a-form-item label="결의번호">
                                                <button-basic text="수기" type="danger" :mode="'contained'" />
                                            </a-form-item>
                                        </div>
                                    </a-col>
                                </a-row>
                                <a-row class="mt-20">
                                    <a-col :span="6" class="col-1">
                                        <a-form-item label="결의구분">
                                            <default-text-box v-model:valueInput="formData.resolutionClassification" width="70px" placeholder="지출" disabled="true" />
                                        </a-form-item>
                                        <div class="input_info">
                                            <a-form-item label="결의서 종류">
                                                <default-text-box v-model:valueInput="formData.resolutionType" width="70px" placeholder="여입" disabled="true" />
                                            </a-form-item>
                                            <button-basic @onClick="actionPopupCopyData" style="margin: -5px 0px 0px 5px"
                                                mode="contained" type="default" text="{} 로 변경" />
                                        </div>
                                    </a-col>
                                    <a-col :span="6" class="col-2">
                                        <a-form-item label="결의일자" class="red">
                                            <date-time-box v-model:valueDate="formData.resolutionDate" width="150px" :required="true" disabled="true" />
                                        </a-form-item>

                                        <a-form-item label="통장" class="red">
                                            <div class="input_info">
                                                <default-text-box v-model:valueInput="formData.bankbookNickname" width="70px" style="margin-right: 10px;" :required="true"
                                                    disabled="true" />
                                                <default-text-box v-model:valueInput="formData.bankbookNumber" width="70px" :required="true" disabled="true" />
                                            </div>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="6" class="col-3">
                                        <a-form-item label="금액" class="red">
                                            <number-box-money v-model:valueInput="formData.amount" width="150px" :required="true" :spinButtons="false"
                                                disabled="true" />
                                        </a-form-item>

                                        <a-form-item label="적요" class="red">
                                            <default-text-box v-model:valueInput="formData.summary" width="150px" :required="true" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="6" class="col-4">
                                        <a-form-item label="계정과목" class="red">
                                            <account-code-select v-model:valueInput="formData.accountCode" width="240px" :required="true" />
                                        </a-form-item>
                                        <a-form-item label="자금원천" class="red">
                                            <account-code-select v-model:valueInput="formData.fundingSource" width="240px" :required="true" />
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <div class="hidden-show" ref="refCssForm"
                                    :style="[statusShowFull ? { height: heightForm } : {}]">
                                    <a-row>
                                        <a-col :span="6" class="col-1">
                                            <a-form-item label="원인행위일자" class="red">
                                                <date-time-box v-model:valueDate="formData.causeActionDate" width="150px" :required="true" />
                                            </a-form-item>
                                            <a-form-item label="결재일자">
                                                <date-time-box v-model:valueDate="formData.paymentDate" width="150px" />
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="6" class="col-2">
                                            <a-form-item label="발의일자">
                                                <date-time-box v-model:valueDate="formData.proposedDate" width="150px" />
                                            </a-form-item>
                                            <a-form-item label="출납일자">
                                                <date-time-box v-model:valueDate="formData.accountingDate" width="150px" />
                                            </a-form-item>
                                            <a-form-item label="등기일자">
                                                <date-time-box v-model:valueDate="formData.registrationDate" width="150px" />
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="6" class="col-3">
                                            <div class="input_info">
                                                <a-form-item label="거래처">
                                                    <customer-select v-model:valueInput="formData.clientId" width="150px" />
                                                </a-form-item>
                                                <a-tooltip placement="top" color="black" class="fz-10 ml-10 mb-5">
                                                    <template #title>기본값은 [회계설정 > 회계기타] 메뉴에서 입력된 결의서 ${수입원/지출원}을
                                                        참조합니다.</template>
                                                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                                        class="mr-5">
                                                </a-tooltip>
                                            </div>
                                            <a-form-item label="수입원/지출원">
                                                <default-text-box v-model:valueInput="formData.source" width="150px" />
                                            </a-form-item>
                                            <div class="input_info">
                                                <a-form-item label="작성자">
                                                    <default-text-box v-model:valueInput="formData.writer" width="150px" />
                                                </a-form-item>
                                                <a-tooltip placement="top" color="black" class="fz-10 ml-10 mb-5">
                                                    <template #title>기본값은 [회계설정 > 회계기타] 메뉴에서 입력된 결의서 작성자를 참조합니다.</template>
                                                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                                        class="mr-5">
                                                </a-tooltip>
                                            </div>
                                        </a-col>
                                        <a-col :span="6" class="col-4">
                                            <a-form-item label="상대계정">
                                                <account-code-select v-model:valueInput="formData.relationCode" width="240px" />
                                            </a-form-item>
                                            <a-form-item label="메모">
                                                <default-text-box v-model:valueInput="formData.memo" width="240px" />
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col :span="24">
                                            <div class="top-content">
                                                <a-typography-title :level="5" style="margin-bottom: 0;">품의서
                                                    <span class="fz-10 ml-10"
                                                        style="color: gray; font-weight: 300; width: 40%;">
                                                        <img src="@/assets/images/iconInfoGray.png" alt=""
                                                            style="width: 15px;" class="mr-5">
                                                        지출결의서 기재 사항
                                                    </span>
                                                </a-typography-title>
                                            </div>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col :span="12">
                                            <a-form-item class="red" label="품의종류">
                                                <radio-group v-model:valueRadioCheck="formData.letterOfApprovalType" :arrayValue="arrayRadioCheck" :layoutCustom="'horizontal'"
                                                    :required="true" />
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="12">
                                            <a-form-item label="물품내역수">
                                                <default-text-box v-model:valueInput="formData.goodsCount" width="150px" />
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <p style="width: 100%;">품의 원인 및 용도:</p>
                                        <text-area-box v-model:valueInput="formData.causeUsage" :width="'100%'" :height="100"/>
                                    </a-row>
                                    <div class="text-align-center mt-20">
                                        <DxButton class="ml-4 custom-button-checkbox custom-button" type="default"
                                            :height="$config_styles.HeightInput">
                                            <div class="d-flex-center">
                                                <checkbox-basic :valueCheckbox="true" disabled="true" />
                                                <span class="pl-5">전표취소</span>
                                            </div>
                                        </DxButton>
                                        <button-basic @onClick="onSubmit()" style="margin: 0px 5px" mode="contained" type="default" text="저장" />
                                    </div>
                                </div>
                            </StandardForm>
                        </a-spin>
                    </div>
                </a-col>
                <a-col class="detail2">
                    <div class="upload">
                        <UploadPreviewImage v-model:list-image-file="fileList" width="387"
                            :heightHidden="statusShowFull ? '' : '130px'" />
                    </div>
                </a-col>
            </a-row>
        </div>

    </div>
    <PopupMessage :modalStatus="isModalRetrieveStatements" @closePopup="isModalRetrieveStatements = false"
        :typeModal="'confirm'" :title="''" :content="contentPopupRetrieveStatements" :okText="'네. 불러옵니다'"
        :cancelText="'아니요'" @checkConfirm="handleConfirmChange" />

    <PopupSlipCancellation :modalStatus="statusModalSlipCancellation" @closePopup="statusModalSlipCancellation = false"
        @submit="statusModalSlipCancellation = false" />

    <PopupSlipRegistration :modalStatus="statusModalSlipRegistrantion" @closePopup="statusModalSlipRegistrantion = false"
        @submit="onFillDataAdd"/>

    <PopupCopyData :modalStatus="statusPopupCopyData" @closePopup="statusPopupCopyData = false"
        @submit="statusPopupCopyData = false" />
    <PopupItemDetails :modalStatus="statusModalItemDetail" @closePopup="statusModalItemDetail = false"
        @submit="statusModalItemDetail = false" />
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
import PopupCopyData from "./components/PopupCopyData.vue"
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
        PopupCopyData,
        EditOutlined,
        PlusOutlined,
        PopupItemDetails,
        DxButton,
        DxRowDragging,
    },
    setup() {
        const refFormAC120 = ref()

        const statusShowFull = ref(false)
        const heightForm: any = ref(0)
        const heightTable: any = ref(0)
        const refCssForm: any = ref(null);
        const refCssTable: any = ref(null);

        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const globalYear = computed(() => store.state.settings.globalYear)
        const globalFacilityBizId = computed(() => store.state.settings.globalFacilityBizId)

        let statusEntering = ref(10);
        let statusInput = ref(20);
        let statusAdjusting = ref(30);
        let statusAdjusted = ref(40);
        let focusedRowKey = ref()
        let fileList = ref<any[]>([])
        let isModalRetrieveStatements = ref(false);
        let statusModalSlipCancellation = ref(false);
        let statusModalSlipRegistrantion = ref(false);
        let statusPopupCopyData = ref(false);
        let statusModalItemDetail = ref(false);
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
        const arrayRadioCheck = [
            { id: 0, text: '구입' },
            { id: 1, text: '운반' },
            { id: 2, text: '수선' },
            { id: 3, text: '인쇄' },
            { id: 4, text: '지출' }
        ]
        const formData = reactive({...initialStateFormData})
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

        const monthSelected = ref(dayjs().month() + 1)
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

        // mutation createAccountingDocument
        const {
            mutate: mutateCreateAccountingDocument, onDone: doneCreateAccountingDocument, onError: errorCreateAccountingDocument,
        } = useMutation(mutations.createAccountingDocument);

        // ============== ON DONE MUTATION GRAPHQL ===============
        // reorderAccountingDocuments
        doneRorderAccountingDocuments((e) => {
            notification('success', Message.getMessage('COMMON', '106').message)
        })
        errorRorderAccountingDocuments(e => {
            notification('error', e.message)
        })

        // createAccountingDocument
        doneCreateAccountingDocument((e) => {
            notification('success', Message.getMessage('COMMON', '106').message)
        })
        errorCreateAccountingDocument(e => {
            notification('error', e.message)
        })


        // ================== WATCH ================
        // 1. getAccountingProcesses
        watch(resGetAccountingProcesses, (value) => {
            triggerGetAccountingProcesses.value = false
            console.log(value.getAccountingProcesses);
            dataGetAccountingProcesses.value = value.getAccountingProcesses
        })
        // 2. getAccountingDocuments
        watch(resGetAccountingDocuments, (value) => {
            triggerGetAccountingDocuments.value = false
            console.log(value.getAccountingDocuments);
            dataSource.value = value.getAccountingDocuments?.accountingDocuments
            lastBalance.value = value.getAccountingDocuments?.lastBalance
        })



        // ================ FUNCTION ============================================
        const toggleTransition = () => {
            statusShowFull.value = !statusShowFull.value
        }
        const initHeight = () => {
            refCssForm.value.style.height = 'auto';
            refCssForm.value.style.position = 'absolute';
            refCssForm.value.style.visibility = 'hidden';
            refCssForm.value.style.display = 'block';

            refCssTable.value.style.height = 'auto';
            refCssTable.value.style.position = 'absolute';
            refCssTable.value.style.visibility = 'hidden';
            refCssTable.value.style.display = 'block';

            const height = getComputedStyle(refCssForm.value).height;
            const height2 = getComputedStyle(refCssTable.value).height;

            // heightForm.value = height;
            heightForm.value = '352px';
            heightTable.value = height2;

            refCssForm.value.style.position = null;
            refCssForm.value.style.visibility = null;
            refCssForm.value.style.display = null;
            refCssForm.value.style.height = 0;

            refCssTable.value.style.position = null;
            refCssTable.value.style.visibility = null;
            refCssTable.value.style.display = null;
            refCssTable.value.style.height = 0;
        }
        
        onMounted(() => {
            setTimeout(() => {
                initHeight()
            }, 500);
        });

        const selectionChanged = () => { }

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
            statusModalSlipCancellation.value = true
        }

        const actionPopupSlipRegistration = (value: any) => {
            statusModalSlipRegistrantion.value = true
        }

        const actionPopupCopyData = () => {
            statusPopupCopyData.value = true
        }

        const actionPopupItemDetail = (data: any) => {
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
            statusModalSlipRegistrantion.value = false
            console.log(dataAdd);
            Object.assign(formData, dataAdd);
            
        }

        const onSubmit = () => {
            const res = refFormAC120.value?.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
            }
        }

        const selectedMonth = (month: number) => {
          monthSelected.value = month
        }

        return {
            dataGetAccountingProcesses,
            dataSource,
            onFillDataAdd,
            formData,
            onSubmit,
            refFormAC120,

            statusShowFull, toggleTransition, heightForm, refCssForm, refCssTable, heightTable,
            statusEntering,
            statusInput,
            statusAdjusting,
            statusAdjusted,
            move_column,
            colomn_resize,
            globalYear,
            focusedRowKey,
            selectionChanged,
            dataDemoMain,
            fileList,
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
            statusPopupCopyData,
            statusModalItemDetail,
            actionPopupCopyData,
            sumOfIncome,
            sumOfExpenses,
            arraySelectBox,

            actionPopupItemDetail,

            actionPopupSlipCancellation,
            actionPopupSlipRegistration,
            arrayRadioCheck,
            customBalance,
            dataDemoMain2,
            onReorder, onDragChange, onRowDragging,

            monthSelected,
            selectedMonth
        };
    },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
