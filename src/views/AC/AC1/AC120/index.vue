<template>
    <action-header :buttonDelete="false" :buttonSearch="false" :buttonSave="false" :buttonPrint="false"/>
    <div class="ac-120">
        <div class="top">
            <div class="grid">
                <div class="items">
                    <div class="text">
                        <span class="">01</span>
                        <span class="">월</span>
                    </div>
                    <ProcessStatus :disabled="true" :valueStatus="statusEntering" />
                </div>
                <div class="items">
                    <div class="text">
                        <span class="">02</span>
                        <span class="">월</span>
                    </div>
                    <ProcessStatus :disabled="true" :valueStatus="statusInput" />
                </div>
                <div class="items">
                    <div class="text">
                        <span class="">03</span>
                        <span class="">월</span>
                    </div>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="items">
                    <div class="text">
                        <span class="">04</span>
                        <span class="">월</span>
                    </div>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="items">
                    <div class="text">
                        <span class="">05</span>
                        <span class="">월</span>
                    </div>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="items">
                    <div class="text">
                        <span class="">06</span>
                        <span class="">월</span>
                    </div>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="items">
                    <div class="text">
                        <span class="">07</span>
                        <span class="">월</span>
                    </div>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="items">
                    <div class="text">
                        <span class="">08</span>
                        <span class="">월</span>
                    </div>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="items">
                    <div class="text">
                        <span class="">09</span>
                        <span class="">월</span>
                    </div>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="items">
                    <div class="text">
                        <span class="">10</span>
                        <span class="">월</span>
                    </div>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="items">
                    <div class="text">
                        <span class="">11</span>
                        <span class="">월</span>
                    </div>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
                </div>
                <div class="items">
                    <div class="text">
                        <span class="">12</span>
                        <span class="">월</span>
                    </div>
                    <ProcessStatus :disabled="true" :valueStatus="statusAdjusted" />
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
                <DxDataGrid key-expr="id" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataDemoMain"
                    :show-borders="true" :allow-column-reordering="move_column" v-model:focused-row-key="focusedRowKey"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true" @selection-changed="selectionChanged">
                    <DxRowDragging :allow-reordering="true" :show-drag-icons="true" />
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxColumn caption="일자" data-field="fill1" cell-template="fill1"/>
                    <template #fill1="{ data }">
                        {{ $filters.formatDate(data.value) }}
                    </template>
                    <DxColumn caption="순번" data-field="fill2" />
                    <DxColumn caption="결의번호" data-field="fill3" />
                    <DxColumn caption="통장" cell-template="fill4" />
                    <template #fill4="{ data }">
                        <a-tooltip placement="left" title="{은행명} {통장번호} ">
                            <div>{{ data.data.fill4 }}</div>
                        </a-tooltip>
                    </template>
                    
                    <DxColumn caption="결의 구분" data-field="fill5" />
                    <DxColumn caption="수입액" data-field="fill6" />
                    <DxColumn caption="지출액" data-field="fill7" />
                    <DxColumn caption="잔액" data-field="fill8" format="fixedPoint" />
                    <DxColumn caption="통장적요" data-field="fill9" format="fixedPoint" />
                    <DxColumn caption="적요" data-field="fill10" format="fixedPoint" />
                    <DxColumn caption="계정과목" data-field="fill11" />
                    <DxColumn caption="상대계정" data-field="fill12" />
                    <DxColumn caption="자금원천" data-field="fill13" />
                    <DxColumn caption="거래처" data-field="fill14" />
                    <DxColumn caption="증빙" data-field="fill15" />

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
                        <div class="slipRegistration">
                            <button-basic :text="data.data.slipRegistration ? 'O' : 'X'"
                                :type="data.data.slipRegistration ? 'success' : 'danger'" :mode="'contained'"
                                style="margin-right: 5px;" />
                            <!-- <button-basic :text="data.data.slipRegistration ? '전표취소' : '전표등록'" :type="'default'"
                                :mode="'contained'" @onClick="openPopupRegistration(data.data.slipRegistration)" /> -->
                        </div>
                    </template>
                    <DxColumn caption="정상 여부" cell-template="slipRegistration1" />
                    <template #slipRegistration1="{ data }">
                        <div class="slipRegistration">
                            <button-basic :text="data.data.slipRegistration ? 'O' : 'X'"
                                :type="data.data.slipRegistration ? 'success' : 'danger'" :mode="'contained'"
                                style="margin-right: 5px;" />
                            <!-- <button-basic :text="data.data.slipRegistration ? '전표취소' : '전표등록'" :type="'default'"
                                :mode="'contained'" @onClick="openPopupRegistration(data.data.slipRegistration)" /> -->
                        </div>
                    </template>

                    <DxSummary>
                        <DxTotalItem column="순번" summary-type="count" display-format="전표 건수: {0}" />
                        <DxTotalItem cssClass="custom-sumary" column="수입액" summary-type="sum" display-format="수입액 합계: {0}" />
                        <DxTotalItem cssClass="custom-sumary" column="지출액" summary-type="sum" display-format="지출액 합계: {0}" />
                        <DxTotalItem cssClass="custom-sumary" column="잔액" :customize-text="count8" />
                        <DxTotalItem cssClass="custom-sumary" column="정상 여부" :customize-text="countSlipRegistration" />
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
                            <StandardForm formName="pa-510-form" ref="pa510FormRef">
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
                                            <default-text-box width="70px" placeholder="지출" />
                                        </a-form-item>
                                        <div class="input_info">
                                            <a-form-item label="결의서 종류">
                                                <default-text-box width="70px" placeholder="여입" />
                                            </a-form-item>
                                            <button-basic @onClick="actionPopupCopyData" style="margin: -5px 0px 0px 5px"
                                                mode="contained" type="default" text="{} 로 변경" />
                                        </div>
                                    </a-col>
                                    <a-col :span="6" class="col-2">
                                        <a-form-item label="결의일자" class="red">
                                            <date-time-box width="150px" :required="true" />
                                        </a-form-item>

                                        <a-form-item label="통장" class="red">
                                            <div class="input_info">
                                                <default-text-box width="70px" style="margin-right: 10px;"
                                                    :required="true" />
                                                <default-text-box width="70px" :required="true" />
                                            </div>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="6" class="col-3">
                                        <a-form-item label="금액" class="red">
                                            <number-box-money width="150px" :required="true" :spinButtons="false" />
                                        </a-form-item>

                                        <a-form-item label="적요" class="red">
                                            <default-text-box width="150px" :required="true" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="6" class="col-4">
                                        <a-form-item label="계정과목" class="red">
                                            <account-code-select width="150px" :required="true" />
                                        </a-form-item>
                                        <a-form-item label="자금원천" class="red">
                                            <account-code-select width="150px" :required="true" />
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <div class="hidden-show" ref="refCssForm"
                                    :style="[statusShowFull ? { height: heightForm } : {}]">
                                    <a-row>
                                        <a-col :span="6" class="col-1">
                                            <a-form-item label="원인행위일자" class="red">
                                                <date-time-box width="150px" :required="true" />
                                            </a-form-item>
                                            <a-form-item label="결재일자">
                                                <date-time-box width="150px" />
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="6" class="col-2">
                                            <a-form-item label="발의일자">
                                                <date-time-box width="150px" />
                                            </a-form-item>
                                            <a-form-item label="출납일자">
                                                <date-time-box width="150px" />
                                            </a-form-item>
                                            <a-form-item label="등기일자">
                                                <date-time-box width="150px" />
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="6" class="col-3">
                                            <div class="input_info">
                                                <a-form-item label="거래처">
                                                    <customer-select width="150px" />
                                                </a-form-item>
                                                <a-tooltip placement="top" color="black" class="fz-10 ml-10 mb-5">
                                                    <template #title>기본값은 [회계설정 > 회계기타] 메뉴에서 입력된 결의서 ${수입원/지출원}을
                                                        참조합니다.</template>
                                                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                                        class="mr-5">
                                                </a-tooltip>
                                            </div>
                                            <a-form-item label="수입원">
                                                <default-text-box width="150px" />
                                            </a-form-item>
                                            <div class="input_info">
                                                <a-form-item label="작성자">
                                                    <default-text-box width="150px" />
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
                                                <account-code-select width="150px" />
                                            </a-form-item>
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
                                                <radio-group :arrayValue="arrayRadioCheck" :layoutCustom="'horizontal'"
                                                    :required="true" />
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="12">
                                            <a-form-item label="물품내역수">
                                                <default-text-box width="150px" />
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <p style="width: 100%;">품의 원인 및 용도:</p>
                                        <textarea class="text-area"></textarea>
                                    </a-row>
                                    <div class="text-align-center mt-20">
                                        <DxButton class="ml-4 custom-button-checkbox custom-button" type="default"
                                            :height="$config_styles.HeightInput">
                                            <div class="d-flex-center">
                                                <checkbox-basic :valueCheckbox="true" disabled="true" />
                                                <span class="pl-5">전표취소</span>
                                            </div>
                                        </DxButton>
                                        <button-basic style="margin: 0px 5px" mode="contained" type="default" text="저장" />
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
        @submit="statusModalSlipRegistrantion = false" />

    <PopupCopyData :modalStatus="statusPopupCopyData" @closePopup="statusPopupCopyData = false"
        @submit="statusPopupCopyData = false" />
    <PopupItemDetails :modalStatus="statusModalItemDetail" @closePopup="statusModalItemDetail = false"
        @submit="statusModalItemDetail = false" />
</template>
<script lang="ts">
import { useStore } from 'vuex';
import DxButton from "devextreme-vue/button"
import { defineComponent, ref, reactive, computed, onMounted } from "vue";
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
import filters from "@/helpers/filters";
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

        const statusShowFull = ref(false)
        const heightForm: any = ref(0)
        const heightTable: any = ref(0)
        const refCssForm: any = ref(null);
        const refCssTable: any = ref(null);

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
            return `전표등록 여부 (O: ${filters.formatCurrency(totalRegistration)}, X: ${filters.formatCurrency(totalCancellation)})`
        };
        const count8 = () => { 
            let total = 0;
            let totalfill8 = 0;
            let totalfill6 = 0;
            let totalfill7 = 0;
            dataDemoMain.forEach((item) => {
                totalfill6 += item.fill6
                totalfill7 += item.fill7
                totalfill8 += item.fill8
            });
            total = totalfill8 + totalfill6 - totalfill7
            return `전월 잔액: ${filters.formatCurrency(totalfill8)}, 예상 잔액: ${filters.formatCurrency(total)}`
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
            count8,
        };
    },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
