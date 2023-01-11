<template>
    <a-spin :spinning="signinLoading" size="large">
        <div class="contract-container">
            <h2>서비스가입신청</h2>
            <a-steps :current="step" type="navigation">
                <a-step :status="step === 0 ? 'process' : 'finish'" title="약관동의" @click="changeStep(1)" />
                <a-step :status="checkStepTwo" title="사업자대표자정보" @click="changeStep(2)" />
                <a-step :status="checkStepThree" title="서비스신청CMS정보" @click="changeStep(3)" />
                <a-step :status="checkStepFour" title="신청완료!" @click="changeStep(4)" />
            </a-steps>
            <div class="step-content">
                <form action="your-action">
                    <template v-if="step === 0">
                        <div class="mt-3">
                            <div class="custom-checkbox-step-1">
                                <label>1. 서비스약관 동의</label>
                                <div>
                                    <checkbox-basic label="전체 동의" v-model:valueCheckbox="checkAll"
                                        @change="checkAllFunc" :disabled="false" :size="16" />
                                </div>
                            </div>
                            <text-area-box placeholder="// 주석처리 ( 추후 내용제공 )" disabled></text-area-box>
                            <div class="radio-group">
                                <checkbox-basic v-model:valueCheckbox="contractCreacted.terms" label="동의함"
                                    :disabled="false" :size="16" />
                            </div>
                        </div>
                        <div>
                            <label>2. 개인정보제공 및 활용동의</label>
                            <text-area-box placeholder="// 주석처리 ( 추후 내용제공 )" disabled></text-area-box>
                            <div class="radio-group">
                                <checkbox-basic v-model:valueCheckbox="contractCreacted.personalInfo" label="동의함"
                                    :disabled="false" :size="16" />
                            </div>
                        </div>
                        <div>
                            <label>3. 회계서비스약관 동의</label>
                            <text-area-box placeholder="// 주석처리 ( 추후 내용제공 )" disabled></text-area-box>
                            <div class="radio-group">
                                <checkbox-basic v-model:valueCheckbox="contractCreacted.accountingService" label="동의함"
                                    :disabled="false" :size="16" />
                            </div>
                        </div>
                        <div>
                            <label>4. 원천서비스약관 동의</label>
                            <text-area-box placeholder="// 주석처리 ( 추후 내용제공 )" disabled></text-area-box>
                            <div class="radio-group">
                                <checkbox-basic v-model:valueCheckbox="contractCreacted.withholdingService" label="동의함"
                                    :disabled="false" :size="16" />
                            </div>
                        </div>
                    </template>
                    <template v-if="step === 1">
                        <div class="form-group">
                            <label>1. 사업자정보</label>
                            <div class="info-box">
                                <div class="form-item">
                                    <label class="red">상 호 :</label>
                                    <default-text-box width="400px" :required="true"
                                        v-model:valueInput="contractCreacted.nameCompany" />
                                </div>
                                <div class="form-item">
                                    <label class="red">사업자등록번호 :</label>
                                    <biz-number-text-box v-model:valueInput="contractCreacted.bizNumber"
                                        :required="true" />
                                </div>
                                <div class="form-item">
                                    <a-row style="width: 100%">
                                        <a-col :span="12" class="d-flex">
                                            <label class="red">사업자유형 :</label>
                                            <radio-group :arrayValue="arrayRadioCheck"
                                                v-model:valueRadioCheck="valueRadioBox" :layoutCustom="'horizontal'" />
                                        </a-col>
                                        <a-col :span="12" class="d-flex">
                                            <div style="margin-right: 10px">{{ textIDNo }} :</div>
                                            <id-number-text-box v-model:valueInput="contractCreacted.residentId" />
                                        </a-col>
                                    </a-row>
                                </div>
                                <div class="form-item">
                                    <label class="red">주 소 :</label>
                                    <div class="group-label">
                                        <default-text-box v-model:valueInput="contractCreacted.zipcode" :required="true"
                                            placeholder="우편번호" :disabled="true" />
                                        <post-code-button @dataAddress="funcAddress" />
                                    </div>
                                </div>
                                <div class="form-item">
                                    <label></label>
                                    <default-text-box v-model:valueInput="contractCreacted.roadAddress" :required="true"
                                        placeholder="주소" :disabled="true" width="100%" />
                                </div>
                                <div class="form-item">
                                    <label></label>
                                    <default-text-box v-model:valueInput="contractCreacted.addressExtend"
                                        :required="true" placeholder="상세주소(입력)" width="100%" />
                                </div>
                                <div class="form-item">
                                    <label class="red">연락처 :</label>
                                    <tel-text-box width="100%" placeholder="‘-’ 없이 슷자입력"
                                        v-model:value="contractCreacted.phone" :required="true" />
                                </div>
                                <div class="form-item">
                                    <label>팩 스 :</label>
                                    <tel-text-box width="180px" placeholder="‘-’ 없이 슷자입력"
                                        v-model:value="contractCreacted.fax" />
                                </div>
                                <div class="d-flex mt-10 pl-10">
                                    <div>
                                        <imgUpload :title="titleModal" @update-img="getImgUrl" class="mt-10" />
                                    </div>
                                    <div>
                                        <preview-image :dataImage="dataImg" @deleteImg="removeImg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>2. 대표자정보</label>
                            <div class="info-box">
                                <div class="form-item">
                                    <label class="red">대표자명:</label>
                                    <default-text-box v-model:valueInput="contractCreacted.namePresident"
                                        :required="true" width="200px" />
                                </div>
                                <div class="form-item">
                                    <label class="red">생년월일 :</label>
                                    <birth-day-box v-model:valueInput="contractCreacted.birthday" width="200px" />
                                </div>
                                <div class="form-item">
                                    <label class="red">휴대폰번호:</label>
                                    <tel-text-box width="200px" placeholder="‘-’ 없이 슷자입력" :required="true"
                                        v-model:value="contractCreacted.mobilePhone" />
                                </div>
                                <div class="form-item">
                                    <label class="red">이메일 :</label>
                                    <mail-text-box width="350px" v-model:valueInput="contractCreacted.email"
                                        :required="true" />
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-if="step === 2">
                        <div class="form-group">
                            <label class="d-flex-center">
                                <span>1. 회계서비스 신청</span>
                                <div class="list-checkbox ml-10">
                                    <radio-group :arrayValue="arrayRadioCheckStep3"
                                        v-model:valueRadioCheck="valueRadioBox" :layoutCustom="'horizontal'" />
                                </div>
                            </label>
                            <div class="group-title">
                                <p class="red" id="title-table-step3">⁙ 운영사업</p>
                            </div>
                            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" id="gridContainer"
                                :data-source="valueFacilityBusinesses" :show-borders="true"
                                :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                                :column-auto-width="true" :repaint-changes-only="true" ref="gridRefName"
                                @selection-changed="onSelectionChanged" :onRowClick="onSelectionClick"
                                :focused-row-enabled="true" key-expr="rowIndex" :focused-row-key="focusedRowKey"
                                :auto-navigate-to-focused-row="true">
                                <DxEditing :use-icons="true" :allow-adding="true" :allow-deleting="true"
                                    template="button-template" mode="cell" new-row-position="pageBottom">
                                    <DxTexts confirmDeleteMessage="삭제하겠습니까?" cancelRowChanges="123124" />
                                </DxEditing>
                                <DxToolbar>
                                    <DxItem location="after" template="button-template" css-class="cell-button-add" />
                                </DxToolbar>
                                <template #button-template>
                                    <DxButton icon="plus" @click="addRow" text="추가" />
                                </template>
                                <DxColumn data-field="No" :allow-editing="false" :width="50" caption="#"
                                    cell-template="indexCell" />
                                <template #indexCell="{ data }">
                                    <div>{{ data.rowIndex + 1 }}</div>
                                </template>
                                <DxColumn data-field="name" caption="사업명 (중복불가)" />
                                <DxColumn :width="225" data-field="facilityBizType" caption="사업분류">
                                    <DxLookup :data-source="facilityBizTypeCommon" value-expr="v" display-expr="n" />
                                </DxColumn>
                                <DxColumn cell-template="startYearMonth" caption="서비스시작년월" />
                                <template #startYearMonth="{ data }">
                                    {{ data.data.startYearMonth ? dayjs(data.data.startYearMonth?.toString()).format("YYYY-MM") : '' }}
                                </template>

                                <DxColumn :width="100" data-field="capacity" data-type="number" caption="정원수 (명)" />
                            </DxDataGrid>
                            <a-row :gutter="24" class="custom-label-master-detail" v-if="dataActiveRow"
                                :key="dataActiveRow.rowIndex">
                                <a-col :span="12">
                                    <a-form-item label="사업분류">
                                        <select-box-common :arrSelect="facilityBizTypeCommon"
                                            v-model:valueInput="dataActiveRow.facilityBizType" displayeExpr="n"
                                            valueExpr="v" width="200px" />
                                    </a-form-item>
                                    <a-form-item label="사업명 (중복불가)">
                                        <default-text-box v-model:valueInput="dataActiveRow.name" width="200px" />
                                    </a-form-item>
                                    <a-form-item label="서비스 시작년월">   
                                        <month-picker-box v-model:valueDate="dataActiveRow.startYearMonth"
                                            width="200px" />
                                    </a-form-item>
                                    <a-form-item label="정원수">
                                        <text-number-box width="200px" :required="true" :disabled="disableFormVal2"
                                            v-model:valueInput="dataActiveRow.capacity" />
                                    </a-form-item>
                                    <a-form-item label="장기요양기관등록번호">
                                        <text-number-box width="200px" :required="true" :disabled="disableFormVal2"
                                            v-model:valueInput="dataActiveRow.longTermCareInstitutionNumber" />
                                    </a-form-item>
                                    <div class="pl-12">
                                        <imgUpload :title="titleModal2" style="margin-top: 10px"
                                            v-model:imageId="dataActiveRow.registrationCardFileStorageId"
                                            @update-img="(res) => dataActiveRow.dataImg = res" />
                                    </div>
                                </a-col>
                                <a-col :span="12">
                                    <div class="preview-img">
                                        <preview-image :dataImage="dataActiveRow.dataImg"
                                            @deleteImgRqContract="removeImgStep" />
                                    </div>
                                </a-col>
                            </a-row>
                            <div class="custom-checkbox-location">
                                <a-form-item label="부가서비스">
                                    <checkbox-basic v-model:valueCheckbox="contractCreacted.accountingServiceTypes"
                                        label="회계입력대행서비스" :size="16" />
                                </a-form-item>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>2. 원천서비스 신청</label>
                            <div class="list-checkbox">
                                <radio-group :arrayValue="plainOptions" v-model:valueRadioCheck="valueSourceService"
                                    layoutCustom="horizontal" />
                            </div>
                            <div class="form-item" style="margin-bottom: 10px">
                                <label>서비스 시작년월 :</label>
                                <month-picker-box width="170px" :disabled="disableFormVal"
                                    v-model:valueDate="contractCreacted.startYearMonthHolding" />
                            </div>
                            <div class="form-item">
                                <label>직 원 수:</label>
                                <number-box width="170px" v-model:valueInput="contractCreacted.capacityHolding"
                                    :disabled="disableFormVal" :min="0" :spinButtons="true" />
                            </div>
                            <div class="form-item">
                                <label>부가서비스 :</label>
                                <checkbox-basic v-model:valueCheckbox="contractCreacted.withholdingServiceTypes"
                                    label="4대보험신고서비스" :disabled="disableFormVal" :size="16" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label>3. CMS (자동이체출금) 계좌 정보 입력</label>
                            <div class="form-item">
                                <label class="red">출금은행:</label>
                                <bank-select-box v-model:valueInput="contractCreacted.bankType" width="178px"
                                    :required="true" />
                            </div>
                            <div class="form-item">
                                <label class="red">출금계좌번호 :</label>
                                <text-number-box v-model:value="contractCreacted.accountNumber" width="100%"
                                    :required="true" />
                            </div>
                            <div class="form-item">
                                <label class="red">예금주명 :</label>
                                <default-text-box width="100%" :required="true"
                                    v-model:valueInput="contractCreacted.ownerName" />
                            </div>
                            <div class="form-item">
                                <label class="red">사업자(주민)등록번호:</label>
                                <default-text-box width="170px" :required="true"
                                    v-model:valueInput="contractCreacted.ownerBizNumber" />
                                <p>
                                    <img src="@/assets/images/iconInfo.png" style="width: 14px" /> :
                                    예금주의 사업자등록번호 또는 주민등록번호입니다
                                </p>
                            </div>
                            <div class="form-item">
                                <label class="red">자동이체출금일자 :</label>
                                <radio-group :arrayValue="arrayRadioWithdrawDay"
                                    v-model:valueRadioCheck="valueRadioWithdrawDay" layoutCustom="horizontal" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label>4. 기타</label>
                            <div class="form-item">
                                <label>영업관리담당 :</label>
                                <select-box-common :arrSelect="optionSale" :required="true"
                                    v-model:valueInput="contractCreacted.salesRepresentativeId" placeholder="영업자선택" />
                            </div>
                            <div class="form-item">
                                <label>전달사항 :</label>
                                <text-area-box width="100%" v-model:valueInput="contractCreacted.comment"
                                    placeholder="전달사항입력" />
                            </div>
                        </div>
                    </template>
                    <template v-if="step === 3">
                        <p class="mt-3">
                            ⁙ 귀하의 신청내용을 확인하신 후 아래 신청 버튼을 누르시면 신청이
                            완료됩니다.<br />
                            ( 만약, 수정할 사항이 있는 경우 이전 버튼을 누르셔서 수정하시기 바랍니다. )
                        </p>
                    </template>
                    <a-modal class="confirm-modal" v-model:visible="visibleModal" :mask-closable="false" ok-text="확인"
                        cancel-text="" footer="">
                        <a-result status="success" title="서비스 가입신청이 완료되었습니다! "
                            sub-title="가입심사가 진행중입니다. 신청일로부터 최대 3일 이내에 승인여부를 알려드릴 예정입니다. ">
                            <template #extra>
                                <button-basic text="확인" type="success" mode="contained" @onClick="handleOk" />
                            </template>
                        </a-result>
                    </a-modal>
                    <div class="group-button">
                        <button-basic v-if="step > 0" text="이 전" type="info" mode="contained" @onClick="prevStep"
                            style="margin-right: 10px" />
                        <button-basic v-if="step < 3" text="다음" type="default" mode="contained" @onClick="nextStep" />
                        <button-basic v-if="step === 3" text="신 청" type="default" mode="contained" @onClick="Creat" />
                    </div>
                </form>
            </div>
        </div>
    </a-spin>
</template>
<script lang="ts">
import { reactive, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { CheckOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { FacilityBizType } from "@bankda/jangbuda-common";
import { DxDataGrid, DxColumn, DxPaging, DxEditing, DxSelection, DxLookup, DxToolbar, DxItem, DxTexts, DxRequiredRule, DxAsyncRule, DxMasterDetail } from "devextreme-vue/data-grid";
import { DxButton } from "devextreme-vue/button";
import imgUpload from "../../components/UploadImage.vue";
import mutations from "../../graphql/mutations/RqContract/index";
import queries from "../../graphql/queries/common/index";
import notification from "../../utils/notification";
import { useRouter } from "vue-router";
import { dataDefaultsUtil, plainOptionsUtil, arrayRadioCheckUtil, arrayRadioWithdrawDayUtil, arrayRadioCheckUtilStep3 } from "./utils";
import dayjs from 'dayjs';
export default {
    components: { CheckOutlined, EditOutlined, DxDataGrid, DxColumn, DxPaging, DxMasterDetail, DxEditing, DxSelection, DxLookup, DxToolbar, DxItem, DxTexts, DxButton, imgUpload, DxRequiredRule, DeleteOutlined, DxAsyncRule, },
    setup() {
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const titleModal = ref("사업자등록증");
        const titleModal2 = ref("장기요양기관등록증");
        const router = useRouter();
        const facilityBizTypeCommon = FacilityBizType.all();
        const plainOptions = ref({ ...plainOptionsUtil });
        const textIDNo = ref("법인등록번호");
        const step = ref(0);
        const disableFormVal = ref(false);
        const disableFormVal2 = ref(false);
        const checkAll = ref(false);
        const optionSale = ref();
        const statusMailValidate = ref(false);
        const contractCreacted = reactive({ ...dataDefaultsUtil });
        const dataInputCallApi = reactive({
            dossier: 1,
            applicationService: 1,
        });
        var visibleModal = ref(false);
        const valueFacilityBusinesses: any = ref([]);
        const arrayRadioCheck = ref([...arrayRadioCheckUtil]);
        const arrayRadioCheckStep3 = ref([...arrayRadioCheckUtilStep3]);
        const arrayRadioWithdrawDay = ref([...arrayRadioWithdrawDayUtil]);
        const valueRadioBox = ref(1);
        const valueAccountingService = ref(1);
        const valueSourceService = ref(1);
        const focusedRowKey = ref(0)
        let dataImg = ref();
        let dataImgStep3 = ref();
        let valueRadioWithdrawDay = ref("매월 5일");
        const dataActiveRow: any = ref()
        // =================================== GRAPQL ============================================
        const {
            mutate: mutateCreated,
            loading: signinLoading,
            onDone: signinDone,
            onError: onError,
        } = useMutation(mutations.createSubscriptionRequest);
        signinDone((res) => {
            visibleModal.value = true;
        });
        onError((res) => {
            notification("error", res.message);
        });
        const { result: resultConfig } = useQuery(
            queries.getSaleRequestContact,
            {}, () => ({
                fetchPolicy: "no-cache",
            })
        );
        // =================================== FUNCTION ============================================
        const disableForm1 = () => {
            if (dataInputCallApi.dossier == 2) disableFormVal2.value = true;
            else disableFormVal2.value = false;
        };
        const disableForm2 = () => {
            if (dataInputCallApi.applicationService == 2) disableFormVal.value = true;
            else disableFormVal.value = false;
        };
        // all Computed
        const checkStepTwo = computed(() => {
            if (step.value === 0) return "wait";
            else if (step.value === 1) return "process";
            else return "finish";
        });
        const checkStepThree = computed(() => {
            if (step.value < 2) return "wait";
            else if (step.value === 2) return "process";
            else return "finish";
        });
        const checkStepFour = computed(() => {
            if (step.value < 3) return "wait";
            else if (step.value === 3) return "process";
            else return "finish";
        });
        const changeStep = (val: number) => {
            step.value = val - 1 // Debug
            if (val == 1) {
                step.value = 0
            }
            if (val == 2 && contractCreacted.terms == true && contractCreacted.personalInfo == true && contractCreacted.accountingService == true && contractCreacted.withholdingService == true) {
                step.value = 1
                window.scrollTo(0, 0);
            }
            if (val == 3 && contractCreacted.terms == true && contractCreacted.personalInfo == true && contractCreacted.accountingService == true && contractCreacted.withholdingService == true && contractCreacted.nameCompany != "" && contractCreacted.bizNumber != "" && contractCreacted.zipcode != "" && contractCreacted.namePresident != "" && contractCreacted.birthday != "" && contractCreacted.mobilePhone != "" && contractCreacted.email != "" && contractCreacted.phone != "" && contractCreacted.bizNumber.length == 10 && statusMailValidate.value == false
            ) {
                step.value = 2
                window.scrollTo(0, 0);
            }
            if (val == 4 && contractCreacted.terms == true && contractCreacted.personalInfo == true && contractCreacted.accountingService == true && contractCreacted.withholdingService == true && contractCreacted.nameCompany != "" && contractCreacted.bizNumber != "" && contractCreacted.zipcode != "" && contractCreacted.namePresident != "" && contractCreacted.birthday != "" && contractCreacted.mobilePhone != "" && contractCreacted.email != "" && contractCreacted.phone != "" && contractCreacted.bizNumber.length == 10 && statusMailValidate.value == false
            ) {
                if (dataInputCallApi.dossier != 2 && dataInputCallApi.applicationService != 2) {
                    let count = 0
                    if (dataInputCallApi.dossier == 1) {
                        if (valueFacilityBusinesses.value.length == 0) {
                            count++
                        }
                    }
                    if (dataInputCallApi.applicationService == 1) {
                        if (contractCreacted.bankType == ''
                            || contractCreacted.accountNumber == ''
                            || contractCreacted.ownerName == ''
                            || contractCreacted.ownerBizNumber == ''
                        ) {
                            count++
                        }
                    }
                    if (count == 0) {
                        step.value = 3
                        window.scrollTo(0, 0);
                    }
                }
            }
        };
        const changeTypeCompany = (val: number) => {
            if (val == 1) {
                textIDNo.value = "법인등록번호";
            } else if (val == 2) {
                textIDNo.value = "주민등록번호";
            }
        };
        const funcAddress = (data: any) => {
            contractCreacted.zipcode = data.zonecode;
            contractCreacted.roadAddress = data.roadAddress;
            contractCreacted.jibunAddress = data.jibunAddress;
            contractCreacted.bcode = data.bcode;
            contractCreacted.bname = data.bname;
            contractCreacted.buildingCode = data.buildingCode;
            contractCreacted.buildingName = data.buildingName;
            contractCreacted.roadname = data.roadname;
            contractCreacted.roadnameCode = data.roadnameCode;
            contractCreacted.sido = data.sido;
            contractCreacted.sigungu = data.sigungu;
            contractCreacted.sigunguCode = data.sigunguCode;
            contractCreacted.zonecode = data.zonecode;
        };
        const prevStep = () => {
            step.value--;
        };
        const nextStep = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                if (step.value == 0) {
                    if (
                        contractCreacted.terms == true &&
                        contractCreacted.personalInfo == true &&
                        contractCreacted.accountingService == true &&
                        contractCreacted.withholdingService == true
                    ) {
                        step.value++;
                        window.scrollTo(0, 0);
                    } else {
                        notification("error", "계속하려면 모든 조건을 수락하십시오!");
                    }
                } else if (step.value == 1) {
                    if (
                        contractCreacted.nameCompany != "" &&
                        contractCreacted.bizNumber != "" &&
                        contractCreacted.zipcode != "" &&
                        contractCreacted.namePresident != "" &&
                        contractCreacted.birthday != "" &&
                        contractCreacted.mobilePhone != "" &&
                        contractCreacted.email != "" &&
                        contractCreacted.phone != "" &&
                        contractCreacted.bizNumber.length == 10 &&
                        statusMailValidate.value == false
                    ) {
                        step.value++;
                        window.scrollTo(0, 0);
                    } else {
                        notification("error", "계속하려면 모든 조건을 수락하십시오!");
                    }
                } else if (step.value == 2) {
                    // if user not choose service
                    if (dataInputCallApi.dossier == 2 && dataInputCallApi.applicationService == 2) {
                        notification("error", "서비스를 최소 하나 이상 선택해야합니다!");
                    } else {
                        let count = 0;
                        if (dataInputCallApi.dossier == 1) {
                            if (valueFacilityBusinesses.value.length == 0) {
                                count++;
                            }
                        }
                        if (dataInputCallApi.applicationService == 1) {
                            if (
                                contractCreacted.bankType == "" ||
                                contractCreacted.accountNumber == "" ||
                                contractCreacted.ownerName == "" ||
                                contractCreacted.ownerBizNumber == ""
                            ) {
                                count++;
                            }
                        }
                        if (count > 0) {
                            notification("error", "계속하려면 모든 조건을 수락하십시오!");
                        } else {
                            step.value++;
                            window.scrollTo(0, 0);
                        }
                    }
                }
            }
        };
        const handleOk = () => {
            visibleModal.value = false;
            router.push("/login");
        };
        const getImgUrl = (img: any) => {
            let resImg = {
                ...img,
                name: img.fileName,
            };
            dataImg.value = resImg;
            contractCreacted.licenseFileStorageId = resImg.id;
        };
        const removeImg = () => {
            dataImg.value = "";
            contractCreacted.licenseFileStorageId = parseInt("");
        };
        const removeImgStep = (res: any) => {
            valueFacilityBusinesses.value.map((val: any) => {
                if (val.registrationCardFileStorageId == res.id) {
                    val.registrationCardFileStorageId = null
                    val.dataImg = {}
                }
            })
        };
        const getImgUrlAccounting = (img: any) => {
            let resImg = {
                ...img,
                name: img.fileName,
            };
            dataImgStep3.value = resImg;
            contractCreacted.registrationCardFileStorageId = img.id;
        };
        const checkAllFunc = (val: any) => {
            checkAll.value = val;
            contractCreacted.terms = val;
            contractCreacted.personalInfo = val;
            contractCreacted.accountingService = val;
            contractCreacted.withholdingService = val;
        };
        const contentReady = (e: any) => {
            if (!e.component.getSelectedRowKeys().length) {
                e.component.selectRowsByIndexes(0);
            }
        };

        const gridRefName: any = ref("grid");
        const Creat = () => {
            let dataFacility = JSON.parse(JSON.stringify(valueFacilityBusinesses.value))
            dataFacility.map((val: any) => {
                delete val.__KEY__
                delete val.rowIndex
                delete val.dataImg
                val.capacity = parseInt(val.capacity) 
                val.longTermCareInstitutionNumber = val.longTermCareInstitutionNumber.toString()
            })
  
            let dataCallCreated = {
                content: {
                    agreements: {
                        terms: contractCreacted.terms,
                        personalInfo: contractCreacted.personalInfo,
                        accountingService: contractCreacted.accountingService,
                        withholdingService: contractCreacted.withholdingService
                    },
                    company: {
                        name: contractCreacted.nameCompany,
                        zipcode: contractCreacted.zipcode,
                        roadAddress: contractCreacted.roadAddress,
                        jibunAddress: contractCreacted.jibunAddress,
                        addressExtend: contractCreacted.addressExtend,
                        addressDetail: {
                            bcode: contractCreacted.bcode,
                            bname: contractCreacted.bname,
                            buildingCode: contractCreacted.buildingCode,
                            buildingName: contractCreacted.buildingName,
                            roadname: contractCreacted.roadname,
                            roadnameCode: contractCreacted.roadnameCode,
                            sido: contractCreacted.sido,
                            sigungu: contractCreacted.sigungu,
                            sigunguCode: contractCreacted.sigunguCode,
                            zonecode: contractCreacted.zonecode,
                        },
                        phone: contractCreacted.phone,
                        fax: contractCreacted.fax,
                        licenseFileStorageId: contractCreacted.licenseFileStorageId,
                        bizNumber: contractCreacted.bizNumber,
                        bizType: contractCreacted.bizType,
                        residentId: contractCreacted.residentId,
                    },
                    president: {
                        name: contractCreacted.namePresident,
                        birthday: dayjs(contractCreacted.birthday).format('YYYY-MM-DD'),
                        mobilePhone: contractCreacted.mobilePhone,
                        email: contractCreacted.email,
                    },
                    accounting: {
                        facilityBusinesses: dataFacility,
                        accountingServiceTypes: contractCreacted.accountingServiceTypes,
                    },
                    withholding: {
                        startYearMonth: contractCreacted.startYearMonthHolding,
                        capacity: contractCreacted.capacityHolding,
                        withholdingServiceTypes: contractCreacted.withholdingServiceTypes,
                    },
                    cmsBank: {
                        bankType: contractCreacted.bankType,
                        accountNumber: contractCreacted.accountNumber,
                        ownerBizNumber: contractCreacted.ownerBizNumber,
                        ownerName: contractCreacted.ownerName,
                        withdrawDay: contractCreacted.withdrawDay,
                    },
                    extra: {
                        salesRepresentativeId: contractCreacted.salesRepresentativeId,
                        comment: contractCreacted.comment,
                    }
                }
            }
            if (dataCallCreated)
                mutateCreated(dataCallCreated)
        }
        const onSelectionChanged = (value: any) => {
            dataActiveRow.value = value.selectedRowsData[0]
        }
        const onSelectionClick = (value: any) => {
            dataActiveRow.value = value.data
        }
        const addRow = () => {
            gridRefName.value.instance.addRow()
            gridRefName.value.instance.deselectAll()
            gridRefName.value.instance.closeEditCell()
            setTimeout(() => {
                let a = document.body.querySelectorAll('[aria-rowindex]');
                (a[gridRefName.value.instance.totalCount() - 1] as HTMLInputElement).click();
                let keyNew = gridRefName.value.instance.getKeyByRowIndex(valueFacilityBusinesses.value.length - 1);
                focusedRowKey.value = keyNew;
            }, 100);
        };
        // ======================================= WATCH ==============================================================
        watch(() => valueRadioBox.value,
            (newVal) => {
                contractCreacted.bizType = newVal;
                changeTypeCompany(newVal);
            }
        );
        watch(() => valueAccountingService.value,
            (newVal) => {
                dataInputCallApi.dossier = newVal;
                disableForm1();
            }
        );
        watch(() => valueSourceService.value,
            (newVal) => {
                dataInputCallApi.applicationService = newVal;
                disableForm2();
            }
        );
        watch(() => valueRadioWithdrawDay.value, (newVal) => {
            contractCreacted.withdrawDay = newVal;
        }
        );
        watch(
            [() => contractCreacted.terms, () => contractCreacted.personalInfo, () => contractCreacted.accountingService, () => contractCreacted.withholdingService], (value) => {
                if (
                    contractCreacted.terms == true &&
                    contractCreacted.personalInfo == true &&
                    contractCreacted.accountingService == true &&
                    contractCreacted.withholdingService == true
                ) {
                    checkAll.value = true;
                } else {
                    checkAll.value = false;
                }
            }
        );
        watch(resultConfig, (value) => {
            let dataOption: any = [];
            value.getSalesRepresentativesForPublicScreen.map((e: any) => {
                dataOption.push({
                    label: e.name,
                    value: e.id,
                });
            });
            optionSale.value = dataOption;
        });
        return {
            dayjs, arrayRadioCheckStep3, focusedRowKey, dataActiveRow, gridRefName, facilityBizTypeCommon, move_column, colomn_resize, arrayRadioWithdrawDay, valueRadioWithdrawDay, valueSourceService, valueAccountingService, dataImg, dataImgStep3, valueRadioBox, arrayRadioCheck, checkAll, signinLoading, textIDNo, statusMailValidate, optionSale, disableFormVal, disableFormVal2, contractCreacted, valueFacilityBusinesses, visibleModal, step, checkStepTwo, checkStepThree, checkStepFour, titleModal, titleModal2, plainOptions,
            contentReady, onSelectionChanged, checkAllFunc, funcAddress, prevStep, nextStep, Creat, handleOk, getImgUrl, getImgUrlAccounting, changeStep, removeImg, removeImgStep, addRow, onSelectionClick
        };
    },
};
</script>  
<style lang="scss" scoped src="./style.scss">

</style>
