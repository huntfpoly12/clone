<template>
    <action-header title="통장내역" :buttonDelete="false" />
    <div class="ac-120">
        <div class="ac-120__top">
            <div class="ac-120__top-grid">
                <div class="ac-120__top-grid-items">
                    <span class="ac-120__top-grid-items-text">01</span>
                    <ProcessStatus :disabled="true" :valueStatus="statusEntering" />
                </div>
                <div class="ac-120__top-grid-items">
                    <span class="ac-120__top-grid-items-text">02</span>
                    <ProcessStatus :disabled="true" :valueStatus="statusInput" />
                </div>
                <div class="ac-120__top-grid-items">
                    <span class="ac-120__top-grid-items-text">03</span>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="ac-120__top-grid-items">
                    <span class="ac-120__top-grid-items-text">04</span>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="ac-120__top-grid-items">
                    <span class="ac-120__top-grid-items-text">05</span>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="ac-120__top-grid-items">
                    <span class="ac-120__top-grid-items-text">06</span>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="ac-120__top-grid-items">
                    <span class="ac-120__top-grid-items-text">07</span>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="ac-120__top-grid-items">
                    <span class="ac-120__top-grid-items-text">08</span>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="ac-120__top-grid-items">
                    <span class="ac-120__top-grid-items-text">09</span>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="ac-120__top-grid-items">
                    <span class="ac-120__top-grid-items-text">10</span>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="ac-120__top-grid-items">
                    <span class="ac-120__top-grid-items-text">11</span>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="ac-120__top-grid-items">
                    <span class="ac-120__top-grid-items-text">12</span>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusted" />
                </div>
            </div>
            <div class="ac-120__top-flex">
                <ProcessStatus :valueStatus="statusAdjusting" :disabled="true" />
                <div class="ac-120__top-flex-action">
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
        <div class="ac-120__main">
            <div class="ac-120__main-main">
                <DxDataGrid key-expr="id" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataDemoMain"
                    :show-borders="true" :allow-column-reordering="move_column" v-model:focused-row-key="focusedRowKey"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true" @selection-changed="selectionChanged">
                    <DxRowDragging :allow-reordering="true" :show-drag-icons="true" />
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxColumn caption="결의번호" data-field="fill2" />
                    <DxColumn caption="통장" cell-template="fill1" />
                    <template #fill1="{ data }">
                        <a-tooltip placement="left" title="{은행명} {통장번호} ">
                            <div>{{ data.data.fill1 }}</div>
                        </a-tooltip>
                    </template>
                    <DxColumn caption="일자" data-field="fill2" />
                    <DxColumn caption="결의 구분" data-field="fill3" />
                    <DxColumn caption="수입액" data-field="fill4" />
                    <DxColumn caption="지출액" data-field="fill5" />
                    <DxColumn caption="잔액" data-field="fill6" format="fixedPoint" />
                    <DxColumn caption="통장적요" data-field="fill7" format="fixedPoint" />
                    <DxColumn caption="적요" data-field="fill8" format="fixedPoint" />
                    <DxColumn caption="계정과목" data-field="fill9" />
                    <DxColumn caption="상대계정" data-field="fill10" />
                    <DxColumn caption="자금원천" data-field="fill10" />
                    <DxColumn caption="거래처" data-field="fill10" />
                    <DxColumn caption="결제수단" data-field="fill10" />
                    <DxColumn caption="증빙" data-field="fill10" />

                    <DxColumn caption="물품 내역" cell-template="normality" />
                    <template #normality="{ data }">
                        <PlusOutlined style="font-size: 12px" @click="actionPopupItemDetail" />
                    </template>
                    <!-- <template #normality="{ data }">
                        <button-basic :text="data.data.normality ? 'O' : 'X'"
                            :type="data.data.normality ? 'success' : 'danger'" :mode="'contained'" />
                    </template> -->
                    <DxColumn caption="수기 여부 " cell-template="slipRegistration" />
                    <template #slipRegistration="{ data }">
                        <div class="ac-120__main-main-slipRegistration">
                            <button-basic :text="data.data.slipRegistration ? 'O' : 'X'"
                                :type="data.data.slipRegistration ? 'success' : 'danger'" :mode="'contained'"
                                style="margin-right: 5px;" />
                            <!-- <button-basic :text="data.data.slipRegistration ? '전표취소' : '전표등록'" :type="'default'"
                                :mode="'contained'" @onClick="openPopupRegistration(data.data.slipRegistration)" /> -->
                        </div>
                    </template>
                    <DxColumn caption="정상 여부" cell-template="slipRegistration1" />
                    <template #slipRegistration1="{ data }">
                        <div class="ac-120__main-main-slipRegistration">
                            <button-basic :text="data.data.slipRegistration ? 'O' : 'X'"
                                :type="data.data.slipRegistration ? 'success' : 'danger'" :mode="'contained'"
                                style="margin-right: 5px;" />
                            <!-- <button-basic :text="data.data.slipRegistration ? '전표취소' : '전표등록'" :type="'default'"
                                :mode="'contained'" @onClick="openPopupRegistration(data.data.slipRegistration)" /> -->
                        </div>
                    </template>

                    <DxSummary>
                        <DxTotalItem column="결의번호" summary-type="count" display-format="전표 건수: {0}" />
                        <DxTotalItem cssClass="custom-sumary" column="수입액" :customize-text="totalDeposits" />
                        <DxTotalItem cssClass="custom-sumary" column="지출액" :customize-text="totalWithdrawal" />
                        <DxTotalItem cssClass="custom-sumary" column="잔액" :customize-text="countSlipRegistration" />
                        <DxTotalItem cssClass="custom-sumary" column="정상 여부" :customize-text="countSlipRegistration" />
                    </DxSummary>
                </DxDataGrid>
            </div>
            <a-row class="ac-120__main-detail">
                <a-col span="17" class="ac-120__main-detail-detail1">
                    <div class="ac-120__main-detail-detail2-upload">
                        <a-spin :spinning="false">
                            <StandardForm formName="pa-510-form" ref="pa510FormRef">
                                <a-row class="text-align-center">
                                    <!-- <div class="top-content"> -->
                                    <a-col :span="24">
                                        결의서
                                        <four-major-insurance :typeTag="1" :typeValue="1" />
                                        <four-major-insurance :typeTag="1" :typeValue="1" />
                                    </a-col>
                                    <!-- </div> -->
                                </a-row>
                                <a-row class="text-align-center">
                                    <a-col :span="24">
                                        결의번호
                                        <four-major-insurance :typeTag="1" :typeValue="1" />
                                        <four-major-insurance :typeTag="1" :typeValue="1" />
                                    </a-col>
                                    <!-- <div class="top-content"> -->

                                    <!-- </div> -->
                                </a-row>
                                <a-row class="mt-20">
                                    <a-col :span="12" class="col">
                                        <a-form-item label="결의구분" class="red">
                                            <default-text-box width="150px" :required="true" />
                                        </a-form-item>

                                        <div class="input_info">
                                            <a-form-item label="결의서 종류" class="red">
                                                <default-text-box width="150px" :required="true" />
                                            </a-form-item>
                                            <button-basic @onClick="actionPopupCopyData" style="margin: 0px 5px"
                                                mode="contained" type="default" text="{변경할 결의서 종류} 로 변경" />
                                        </div>

                                        <a-form-item label="결의일자" class="red">
                                            <date-time-box width="150px" :required="true" />
                                        </a-form-item>

                                        <a-form-item label="원인행위일자" class="red">
                                            <date-time-box width="150px" :required="true" />
                                        </a-form-item>

                                        <a-form-item label="발의일자">
                                            <date-time-box width="150px" />
                                        </a-form-item>

                                        <a-form-item label="출납일자">
                                            <date-time-box width="150px" />
                                        </a-form-item>

                                        <a-form-item label="등기일자">
                                            <date-time-box width="150px" />
                                        </a-form-item>

                                        <a-form-item label="결재일자">
                                            <date-time-box width="150px" />
                                        </a-form-item>

                                        <a-form-item label="지급일" class="red">
                                            <button-basic :text="'단추'" :type="'success'" :mode="'contained'" />
                                            <button-basic :text="'단추'" :type="'success'" :mode="'contained'" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="12" class="col">
                                        <a-form-item label="금액" class="red">
                                            <number-box-money width="150px" :required="true" :spinButtons="false" />
                                        </a-form-item>

                                        <a-form-item label="적요" class="red">
                                            <default-text-box width="150px" :required="true" />
                                        </a-form-item>

                                        <a-form-item label="계정과목" class="red">
                                            <account-code-select width="150px" :required="true" />
                                        </a-form-item>

                                        <a-form-item label="상대계정">
                                            <account-code-select width="150px" />
                                        </a-form-item>

                                        <a-form-item label="자금원천" class="red">
                                            <account-code-select width="150px" />
                                        </a-form-item>

                                        <div class="input_info">
                                            <a-form-item label="거래처">
                                                <customer-select width="150px" />
                                            </a-form-item>
                                            <span class="fz-10 ml-10 mb-5"
                                                style="color: gray; font-weight: 300; width: 40%;">
                                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                                    class="mr-5">
                                                기본값은 [회계설정 > 회계기타] 메뉴에서 입력된 결의서 ${수입원/지출원}을 참조합니다.
                                            </span>
                                        </div>
                                        <a-form-item label="{수입원/지출원}">
                                            <default-text-box width="150px" />
                                        </a-form-item>
                                        <div class="input_info">
                                            <a-form-item label="작성자">
                                                <default-text-box width="150px" />
                                            </a-form-item>
                                            <span class="fz-10 ml-10 mb-5"
                                                style="color: gray; font-weight: 300; width: 40%;">
                                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                                    class="mr-5">
                                                기본값은 [회계설정 > 회계기타] 메뉴에서 입력된 결의서 작성자를 참조합니다.
                                            </span>
                                        </div>
                                        <a-form-item label="메모">
                                            <default-text-box width="150px" />
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <a-row>
                                    <a-col :span="24">
                                        <div class="top-content">
                                            <a-typography-title :level="5" style="margin-bottom: 0;">품의서
                                                <span class="fz-10 ml-10"
                                                    style="color: gray; font-weight: 300; width: 40%;">
                                                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                                        class="mr-5">
                                                        지출결의서 기재 사항
                                                </span>
                                            </a-typography-title>
                                        </div>
                                    </a-col>
                                </a-row>
                                <a-row>
                                    <a-col :span="12">
                                        <a-form-item class="red" label="품의종류">
                                            <radio-group :arrayValue="arrayRadioCheck" :layoutCustom="'horizontal'"
                                                :required="true" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="6">
                                        <a-form-item label="품의 원인 및 용도">
                                            <default-text-box width="150px" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="6">
                                        <a-form-item label="물품내역수">
                                            <default-text-box width="150px" />
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                            </StandardForm>
                            <div class="text-align-center mt-30">
                                <DxButton class="ml-4 custom-button-checkbox custom-button" type="default"
                                    :height="$config_styles.HeightInput">
                                    <div class="d-flex-center">
                                        <checkbox-basic :valueCheckbox="true" disabled="true" />
                                        <span class="pl-5">전표취소</span>
                                    </div>
                                </DxButton>
                                <button-basic style="margin: 0px 5px" mode="contained" type="default" text="저장" />
                            </div>
                        </a-spin>
                    </div>
                </a-col>
                <a-col span="7" class="ac-120__main-detail-detail2">
                    <div class="ac-120__main-detail-detail2-upload">
                      <UploadPreviewImage v-model:list-image-file="fileList"/>
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
        @submit="statusModalSlipRegistrantion = false" />

    <PopupCopyData :modalStatus="statusPopupCopyData" @closePopup="statusPopupCopyData = false"
        @submit="statusPopupCopyData = false" />
    <PopupItemDetails :modalStatus="statusModalItemDetail" @closePopup="statusModalItemDetail = false"
        @submit="statusModalItemDetail = false" />
</template>
<script lang="ts">
import { useStore } from 'vuex';
import DxButton from "devextreme-vue/button"
import { defineComponent, ref, reactive, computed } from "vue";
import ProcessStatus from "@/components/common/ProcessStatus.vue"
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxRowDragging } from "devextreme-vue/data-grid";
import { HistoryOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { dataDemoMain, MAX_UP_LOAD, contentPopupRetrieveStatements } from "./utils/index"
import { Message } from "@/configs/enum"
import PopupSlipCancellation from "./components/PopupSlipCancellation.vue"
import PopupSlipRegistration from "./components/PopupSlipRegistration.vue"
import PopupCopyData from "./components/PopupCopyData.vue"
import PopupItemDetails from "./components/PopupItemDetails.vue"
import UploadPreviewImage from '@/components/UploadPreviewImage.vue'

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
        UploadPreviewImage
    },
    setup() {
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const globalYear = computed(() => store.state.settings.globalYear)
        let statusEntering = ref(10);
        let statusInput = ref(20);
        let statusAdjusting = ref(30);
        let statusAdjusted = ref(40);
        let focusedRowKey = ref()
        let dataSource = ref<any[]>([])
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
            { id: 0, text: '수입' },
            { id: 1, text: '지출' },
            { id: 2, text: '마이너스수입' },
            { id: 3, text: '여입' }
        ]

        // COMPUTED

        // METHODS

        const selectionChanged = () => { }

        const totalDeposits = () => {
            let total = 0;
            dataDemoMain.forEach((item) => {
                total += item.fill6;
            });
            return `입금액 합계: ${total}`
        };

        const totalWithdrawal = () => {
            let total = 0;
            dataDemoMain.forEach((item) => {
                total += item.fill7;
            });
            return `출금액 합계: ${total}`
        };

        const countSlipRegistration = () => {
            let totalRegistration = 0;
            let totalCancellation = 0;
            dataDemoMain.forEach((item) => {
                if (item.slipRegistration) {
                    totalRegistration++
                } else {
                    totalCancellation++
                }
            });
            return `전표등록 여부 (O: ${totalRegistration}, X: ${totalCancellation})`
        };


        const actionPopupSlipCancellation = (value: any) => {
            statusModalSlipCancellation.value = true
        }

        const actionPopupSlipRegistration = (value: any) => {
            statusModalSlipRegistrantion.value = true
        }

        const actionPopupCopyData = () => {
            statusPopupCopyData.value = true
        }

        const actionPopupItemDetail = () => {
            statusModalItemDetail.value = true
        }

        const handleConfirmChange = () => {

        }

        // const openPopupRetrieveStatements = (value: any) => {
        //     isModalRetrieveStatements.value = true
        // }



        const sumOfIncome = () => {
            let total = 0;
            dataDemoMain.forEach((item) => {
                total += item.fill6;
            });
            return `수입액 합계: ${total}`
        }

        const sumOfExpenses = () => {
            let total = 0;
            dataDemoMain.forEach((item) => {
                total += item.fill7;
            });
            return `지출액 합계: ${total}`
        }



        return {
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
            countSlipRegistration,
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
        };
    },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
