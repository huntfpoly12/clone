<template>
    <div id="modal-detail-bf-310">
        <a-modal :mask-closable="false" :visible="modalStatus" title="계약정보관리&심사 " centered @cancel="setModalVisible()"
            width="1000px" :bodyStyle="{ height: '800px' }" footer="">
            <a-spin tip="Loading..." :spinning="loading || loadingUpdate">
                <standard-form class="ant-form ant-form-horizontal" name="edit-page-310">
                    <div class="collapse-content">
                        <a-collapse v-model:activeKey="activeKey" accordion :bordered="false">
                            <a-collapse-panel key="1" header="심사정보">
                                <a-row>
                                    <a-col :span="24" style="display: flex;">
                                        <a-form-item label="승인상태" label-align="left" :label-col="labelCol">
                                            <subs-req-status-process-bar v-model:valueInput="formState.status" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="24" style="display: flex;">
                                        <a-form-item label="신청" label-align="left" :label-col="labelCol">
                                            <default-text-box
                                                :valueInput="isNumeric(formState.createdAt) ? $filters.formatDate(formState.createdAt) : ''"
                                                :disabled="true" width="200px" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="24" style="display: flex;">
                                        <a-form-item label="심사중" label-align="left" :label-col="labelCol">
                                            <default-text-box
                                                :valueInput="isNumeric(formState.processedAt) ? $filters.formatDate(formState.processedAt) : ''"
                                                :disabled="true" width="200px" />
                                        </a-form-item>
                                        <a-form-item label-align="left" style="padding-left: 10px;">
                                            <default-text-box v-model:valueInput="formState.processedBy"
                                                :disabled="true" width="200px" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="24" style="display: flex;">
                                        <a-form-item label="반려" label-align="left" :label-col="labelCol">
                                            <default-text-box
                                                :valueInput="isNumeric(formState.rejectedAt) ? $filters.formatDate(formState.rejectedAt) : ''"
                                                :disabled="true" width="200px" />
                                        </a-form-item>
                                        <a-form-item label-align="left" style="padding-left: 10px;">
                                            <default-text-box v-model:valueInput="formState.rejectedBy" :disabled="true"
                                                width="200px" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="24" style="display: flex;">
                                        <a-form-item label="승인" label-align="left" :label-col="labelCol">
                                            <default-text-box
                                                :valueInput="isNumeric(formState.approvedAt) ? $filters.formatDate(formState.approvedAt ?? '') : ''"
                                                :disabled="true" width="200px" />
                                        </a-form-item>
                                        <a-form-item label-align="left" style="padding-left: 10px;">
                                            <default-text-box v-model:valueInput="formState.approvedBy" :disabled="true"
                                                width="200px" />
                                        </a-form-item>
                                    </a-col>
                                    <a-form-item label="상 호" label-align="left" :label-col="labelCol">
                                        <default-text-box v-model:valueInput="formState.companyName" width="410px"
                                            :disabled="true" />
                                    </a-form-item>
                                    <a-col :span="24" style="display: flex;">
                                        <a-form-item label="신청코드" label-align="left" :label-col="labelCol">
                                            <default-text-box v-model:valueInput="formState.code" :disabled="true"
                                                width="200px" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="24">
                                        <a-form-item label="심사메모" label-align="left" :label-col="labelCol">
                                            <text-area-box v-model:valueInput="formState.memo" width="100%" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="24">
                                        <a-form-item label="약관동의" label-align="left" :label-col="labelCol">
                                            <a-button type="link" style="padding: 0px">
                                                서비스약관
                                            </a-button>
                                            |
                                            <a-button type="link" style="padding: 0px">개인정보제공활용동의</a-button>
                                            |
                                            <a-button type="link" style="padding: 0px">회계서비스약관동의</a-button>
                                            |
                                            <a-button type="link" style="padding: 0px">원천서비스약관동의</a-button>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                            </a-collapse-panel>
                            <a-collapse-panel key="2" header="사업자정보">
                                <div style="height: 350px; overflow-y: scroll">
                                    <a-form-item label="상 호" class="clr" label-align="left" :label-col="labelCol">
                                        <default-text-box v-model:valueInput="formState.companyName" width="70%"
                                            :required="true" messRequired="이항목은 필수 입력사항입니다!" nameInput="companyName" />
                                    </a-form-item>
                                    <a-form-item label="사업자등록번호" class="clr" label-align="left" :label-col="labelCol">
                                        <biz-number-text-box :disabled="!canChangeableBizNumber"
                                            v-model:valueInput="formState.companyBizNumber" width="120" :required="true"
                                            messRequired="이항목은 필수 입력사항입니다!" nameInput="companyBizNumber" />
                                    </a-form-item>
                                    <a-row>
                                        <a-col :span="12">
                                            <a-form-item label="사업자유형" class="clr" label-align="left"
                                                :label-col="labelCol">
                                                <radio-group :arrayValue="bizTypeItems"
                                                    v-model:valueRadioCheck="formState.content.company.bizType"
                                                    layoutCustom="horizontal"/>
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="12">
                                            <!-- {{  formState.content.company.residentId  }} -->
                                            <a-form-item :label="changeTypeCompany(formState.content.company.bizType)"
                                                label-align="left" :label-col="labelCol">
                                                <id-number-text-box :required="true"
                                                    v-model:valueInput="formState.content.company.residentId"
                                                    width="224px" messRequired="이항목은 필수 입력사항입니다!"
                                                    nameInput="residentId" />
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <a-form-item label="주소" class="clr" label-align="left" :label-col="labelCol">
                                        <a-row :gutter="[0, 4]">
                                            <a-col :span="24">
                                                <a-row>
                                                    <a-col :span="6">
                                                        <default-text-box
                                                            v-model:valueInput="formState.content.company.zipcode"
                                                            width="100%" :disabled="true" />
                                                    </a-col>
                                                    <a-col :span="18">
                                                        <div style="margin-left: 5px">
                                                            <post-code-button @dataAddress="funcAddress" />
                                                        </div>
                                                    </a-col>
                                                </a-row>
                                            </a-col>
                                            <a-col :span="24">
                                                <a-row>
                                                    <a-col :span="12">
                                                        <default-text-box
                                                            v-model:valueInput="formState.content.company.roadAddress"
                                                            width="100%" :disabled="true" />
                                                    </a-col>
                                                    <a-col :span="12" style="padding-left: 9px">
                                                        <default-text-box
                                                            v-model:valueInput="formState.content.company.addressExtend"
                                                            width="100%" placeholder="상세 주소 입력" />
                                                    </a-col>
                                                </a-row>
                                            </a-col>
                                        </a-row>
                                        <a-row> </a-row>
                                    </a-form-item>
                                    <a-row style="display: flex; color: black">
                                        <a-col>
                                            <a-row :gutter="[16, 16]">
                                                <a-col :span="15">
                                                    <a-form-item label="연락처" class="clr" label-align="left"
                                                        :label-col="labelCol">
                                                        <tel-text-box
                                                            v-model:valueInput="formState.content.company.phone"
                                                            :required="true" messRequired="이항목은 필수 입력사항입니다!"
                                                            nameInput="company-phone" />
                                                    </a-form-item>
                                                    <a-form-item label="팩 스" label-align="left" :label-col="labelCol">
                                                        <text-number-box
                                                            v-model:valueInput="formState.content.company.fax" />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <img-upload :title="titleModal" @update-img="getUrlLicenseFile" />
                                        </a-col>
                                        <a-col :span="7">
                                            <preview-image :dataImage="{ url: imageLicenseFile, name: licenseFileName }"
                                                @deleteImg="removeLicenseFile" :activePreview="true" />
                                        </a-col>
                                    </a-row>
                                </div>
                            </a-collapse-panel>
                            <a-collapse-panel key="3" header="대표자정보">
                                <a-form-item has-feedback label="대표자명" class="clr" label-align="left"
                                    :label-col="labelCol">
                                    <default-text-box v-model:valueInput="formState.content.president.name"
                                        width="200px" :required="true" messRequired="이항목은 필수 입력사항입니다!"
                                        nameInput="president-name" />
                                </a-form-item>
                                <a-form-item has-feedback label="생년월일" class="clr" label-align="left"
                                    :label-col="labelCol">
                                    <birth-day-box v-model:valueInput="formState.content.president.birthday" width="200px" /> 
                                </a-form-item>
                                <a-form-item has-feedback label="휴대폰번호" class="clr" label-align="left"
                                    :label-col="labelCol">
                                    <text-number-box v-model:valueInput="formState.content.president.mobilePhone"
                                        :required="true" width="200px" placeholder="‘-’ 없이 슷자입력"
                                        messRequired="이항목은 필수 입력사항입니다!" nameInput="president-mobilePhone" />
                                </a-form-item>
                                <a-form-item has-feedback label="이메일" class="clr" :name="['user', 'email']"
                                    :rules="[{ type: 'email' }]" label-align="left" :label-col="labelCol">
                                    <mail-text-box v-model:valueInput="formState.content.president.email" width="350px"
                                        :required="true" messRequired="이항목은 필수 입력사항입니다!" nameInput="president-email" />
                                </a-form-item>
                            </a-collapse-panel>
                            <a-collapse-panel key="4" header="회계서비스신청" class="popup-scroll">
                                <div style="height: 350px; overflow-y: scroll">
                                    <checkbox-basic v-model:valueCheckbox="checkedService" :disabled="false" size="15"
                                        label="회계서비스 신청합니다." />
                                    <div>
                                        <a-card title="⁙ 운영사업" :bordered="false" style="width: 100%"
                                            :headStyle="{ padding: '5px', color: 'red' }" bodyStyle="padding: 0px 0px">
                                        </a-card>
                                        <div class="option">
                                        </div>
                                        <div id="data-grid-demo">
                                            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true"
                                                :data-source="dataSource" :show-borders="true"
                                                :allow-column-reordering="move_column"
                                                :allow-column-resizing="colomn_resize" :column-auto-width="true"
                                                :repaint-changes-only="true" ref="gridRefName"
                                                :onRowClick="onSelectionClick" :focused-row-enabled="true"
                                                key-expr="rowIndex" @init-new-row="onInitRow"
                                                :auto-navigate-to-focused-row="true" :focused-row-key="focusedRowKey"
                                                @focused-row-changed="onFocusedRowChanged" id="bf-320-popup-datagrid">
                                                <DxPaging :enabled="false" />
                                                <DxColumn data-field="No" :allow-editing="false" :width="50" caption="#"
                                                    cell-template="indexCell" />
                                                <template #indexCell="{ data }">
                                                    <div>{{ data.rowIndex + 1 }}</div>
                                                </template>
                                                <DxColumn data-field="name" caption="사업명 (중복불가)" />
                                                <DxColumn data-field="facilityBizType" caption="사업분류"/>
                                                <DxColumn cell-template="startYearMonth" caption="서비스시작년월" data-type="date"/>
                                                <template #startYearMonth="{ data }">
                                                    {{ data.data.startYearMonth ? dayjs(data.data.startYearMonth.toString()).format('YYYY-MM') : '' }}
                                                </template>
                                                <DxColumn :width="100" data-field="capacity" caption="정원수 (명)" />
                                                <DxEditing :use-icons="true" :allow-adding="true" :allow-deleting="true"
                                                    template="button-template" mode="cell"
                                                    new-row-position="pageBottom">
                                                    <DxTexts confirmDeleteMessage="삭제하겠습니까?" />
                                                </DxEditing>
                                                <DxToolbar>
                                                    <DxItem location="after" template="button-template"
                                                        css-class="cell-button-add" />
                                                </DxToolbar>
                                                <template #button-template>
                                                    <DxButton icon="plus" @click="addRow" text="추가" />
                                                </template>
                                                <DxScrolling column-rendering-mode="virtual" />
                                            </DxDataGrid>
                                            <a-row :gutter="24" class="custom-label-master-detail" v-if="dataActiveRow" :key="dataActiveRow.rowIndex ?? 99">
                                                <a-col :span="12">
                                                    <a-form-item label="사업분류">
                                                        <select-box-common :arrSelect="facilityBizTypeCommon" :required="true"
                                                            v-model:valueInput="dataActiveRow.facilityBizType"
                                                            displayeExpr="n" valueExpr="v" width="200px" />
                                                    </a-form-item>
                                                    <a-form-item label="사업분류">
                                                        <default-text-box v-model:valueInput="dataActiveRow.name" :required="true"
                                                            width="200px" />
                                                    </a-form-item>
                                                    <a-form-item label="서비스 시작년월">
                                                        <month-picker-box :required="true"
                                                            v-model:valueDate="dataActiveRow.startYearMonth"
                                                            width="200px" />
                                                    </a-form-item>
                                                    <a-form-item label="정원수" style="display: inline-flex">
                                                        <text-number-box width="200px" :required="true"
                                                            v-model:valueInput="dataActiveRow.capacity" /> 명
                                                    </a-form-item>
                                                    <a-form-item label="장기요양기관등록번호">
                                                        <default-text-box width="200px" :required="true"
                                                            v-model:valueInput="dataActiveRow.longTermCareInstitutionNumber" />
                                                    </a-form-item>
                                                    <a-col class="pl-12 text-color">
                                                        <img-upload :title="'장기요양기관등록증'" @update-img="getUrlLicenseFile"/>
                                                    </a-col>
                                                </a-col>
                                                <a-col :span="12">
                                                    <div class="preview-img">
                                                        <preview-image :dataImage="dataActiveRow.registrationCard"
                                                            @deleteImg="removeLicenseFile" :activePreview="true" />
                                                    </div>
                                                </a-col>
                                            </a-row>
                                        </div>
                                        <div>
                                            <a-row>
                                                <a-col :span="3">
                                                    <p>부가서비스</p>
                                                </a-col>
                                                <a-col :span="12">
                                                    <checkbox-basic
                                                        v-model:valueCheckbox="formState.content.accounting.accountingServiceTypes[0]"
                                                        :disabled="false" size="15" label="회계입력대행서비스" />
                                                </a-col>
                                            </a-row>
                                        </div>
                                    </div>
                                </div>
                            </a-collapse-panel>
                            <a-collapse-panel key="5" header="원천서비스신청">
                                <div>
                                    <checkbox-basic label="원천서비스 신청합니다" v-model:valueCheckbox="checkedService"
                                        :disabled="false" :size="'16'" />
                                    <div style="margin-top: 20px">
                                        <a-form-item label="서비스 시작년월" class="clr" label-align="left"
                                            :label-col="labelCol">
                                            <div style="width: 200px">
                                                <month-picker-box :required="true"
                                                    v-model:valueDate="formState.content.withholding.startYearMonth"
                                                    className="0" />
                                            </div>
                                        </a-form-item>
                                        <a-form-item label="직 원 수" class="clr" label-align="left" :label-col="labelCol">
                                            <number-box :required="true" width="100px" :min="0" :spinButtons="true"
                                                v-model:valueInput="formState.content.withholding.capacity"
                                                messRequired="이항목은 필수 입력사항입니다!" nameInput="withholding-capacity" />
                                        </a-form-item>
                                        <a-form-item label="부가서비스" label-align="left" :label-col="labelCol">
                                            <checkbox-basic label="4대보험신고서비스"
                                                v-model:valueCheckbox="formState.content.withholding.withholdingServiceTypes[0]"
                                                :disabled="false" :size="'16'" />
                                        </a-form-item>
                                    </div>
                                </div>
                            </a-collapse-panel>
                            <a-collapse-panel key="6" header="CMS (자동이체출금) 계좌 정보 입력">
                                <a-form-item label="출금은행" class="clr" label-align="left" :label-col="labelCol">
                                    <bank-select-box v-model:valueInput="formState.content.cmsBank.bankType"
                                        width="150px" />
                                </a-form-item>
                                <a-form-item label="출금계좌번호" class="clr" label-align="left" :label-col="labelCol">
                                    <text-number-box width="250px" :required="true"
                                        v-model:valueInput="formState.content.cmsBank.accountNumber"
                                        nameInput="cmsBank-accountNumber" />
                                </a-form-item>
                                <a-form-item label="예금주명" class="clr" label-align="left" :label-col="labelCol">
                                    <default-text-box width="250px" :required="true"
                                        v-model:valueInput="formState.content.cmsBank.ownerName"
                                        nameInput="cmsBank-ownerName" />
                                </a-form-item>
                                <a-form-item label="사업자(주민)등록번호:" class="d-flex align-items-start clr"
                                    label-align="left" :label-col="labelCol">
                                    <text-number-box width="250px" :required="true"
                                        v-model:valueInput="formState.content.cmsBank.ownerBizNumber"
                                        nameInput="cmsBank-ownerBizNumber" />
                                    <div class="noteImage">
                                        <img src="@/assets/images/iconInfo.png"
                                            style="width: 14px; height: 14px; margin-top: 0px;" />
                                        <div class="noteText">
                                            <p>예금주의 사업자등록번호 또는 주민등록번호입니다.</p>
                                        </div>
                                    </div>
                                </a-form-item>
                                <a-form-item label="자동이체출금일자" class="clr" label-align="left" :label-col="labelCol">
                                    <radio-group :arrayValue="arrayRadioWithdrawDay"
                                        v-model:valueRadioCheck="formState.content.cmsBank.withdrawDay" />
                                </a-form-item>
                            </a-collapse-panel>
                            <a-collapse-panel key="7" header="기타">
                                {{  formState.content.extra.salesRepresentativeId }}
                                <a-form-item label="영업관리담당" label-align="left" :label-col="labelCol">
                                    <list-sales-dropdown
                                        v-model:valueInput="formState.content.extra.salesRepresentativeId"
                                        width="200px" />
                                </a-form-item>
                                <a-form-item label="전달사항" label-align="left" :label-col="labelCol">
                                    <text-area-box v-model:valueInput="formState.content.extra.comment" :width="750" :height="70"
                                        placeholder="전달사항입력" />
                                </a-form-item>
                            </a-collapse-panel>
                        </a-collapse>
                    </div>
                    <a-row style="margin-top: 20px;">
                        <a-col :span="24" :offset="8">
                            <button-basic text="그냥 나가기" type="default" mode="outlined" @onClick="setModalVisible()"
                                :width="120" style="margin-right: 10px;" />
                            <button-basic text="저장하고 나가기" type="default" mode="contained"
                                @onClick="updateSubscriptionRequest($event)" :width="150" />
                        </a-col>
                    </a-row>
                </standard-form>
            </a-spin>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { useStore } from 'vuex';
import { DxDataGrid, DxColumn, DxPaging, DxSelection, DxEditing, DxLookup, DxToolbar, DxItem, DxTexts, DxMasterDetail, DxScrolling } from "devextreme-vue/data-grid";
import { UploadOutlined, MinusCircleOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { FacilityBizType } from "@bankda/jangbuda-common";
import DxDropDownBox from "devextreme-vue/drop-down-box";
import { bizTypeItems, inputInCollapse } from "../utils";
import { initialFormState, initialDataStatus, initialArrayRadioWithdrawDay } from "../utils/index"
import queries from "@/graphql/queries/BF/BF3/BF310/index";
import mutations from "@/graphql/mutations/BF/BF3/BF310/index";
import imgUpload from "@/components/UploadImage.vue";
import notification from '@/utils/notification';
import comfirmClosePopup from '@/utils/comfirmClosePopup';
import dayjs from 'dayjs'
import { DxButton } from "devextreme-vue/button";
export default defineComponent({
    props: {
        modalStatus: {
            default: false,
            type: Boolean,
        },
        data: {
            type: Number,
            required: true
        },
    },
    components: {
        DxDropDownBox,
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxSelection,
        UploadOutlined,
        MinusCircleOutlined,
        DeleteOutlined,
        PlusOutlined,
        imgUpload,
        DxEditing,
        DxLookup,
        DxToolbar,
        DxItem,
        DxTexts,
        DxMasterDetail,
        DxButton,
        DxScrolling
    },
    setup(props, { emit }) {
        // config grid
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const labelCol = { style: { width: "150px" } };
        const facilityBizType = FacilityBizType.all();
        const facilityBizTypeCommon = FacilityBizType.all();
        const imageLicenseFile = ref("");
        const licenseFileName = ref("");
        let visible = ref(false);
        let activeKey = ref(1);
        const dataQuery = ref();
        const dataQueryCheckPer = ref({});
        let trigger = ref<boolean>(false);
        let triggerCheckPer = ref<boolean>(false);
        let canChangeableBizNumber = ref<boolean>(false);
        const checkedService = ref(true)
        const selectedItemKeys = reactive([])
        const titleModal = ref("장기요양기관등록증")
        var dataStatus = initialDataStatus
        let objDataDefault = ref({ ...initialFormState });
        const arrayRadioWithdrawDay = reactive([...initialArrayRadioWithdrawDay])
        var formState = ref<any>({ ...initialFormState });
        const dataSource = ref([]);
        // event close popup
        const setModalVisible = () => {
            if (JSON.stringify(objDataDefault.value) === JSON.stringify(formState.value) == true)
                emit("closePopup", false)
            else
                comfirmClosePopup(() => emit("closePopup", false))
            triggerCheckPer.value = false;
            trigger.value = false;
        };
        // watch event modal popup
        watch(() => props.modalStatus, (newValue, old) => {
            trigger.value = true;
            if (newValue) {
                visible.value = newValue;
                dataQuery.value = { id: props.data };
                refetch();
                Object.assign(formState, initialFormState);
            } else {
                Object.assign(formState, initialFormState);
                imageLicenseFile.value = "";
                licenseFileName.value = "";
                visible.value = newValue;
                trigger.value = false;
                activeKey.value = 1;
            }
        });
        const { result, loading, error, refetch } = useQuery(
            queries.getSubscriptionRequest,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
        // query check if can be change business registration number
        const { result: resCheckPerEdit, refetch: refetchCheckPer } = useQuery(
            queries.isSubscriptionRequestChangeableBizNumber,
            dataQueryCheckPer,
            () => ({
                enabled: triggerCheckPer.value,
                fetchPolicy: "no-cache",
            })
        );
        // watch result resCheckPerEdit
        watch(resCheckPerEdit, (value) => {
            canChangeableBizNumber.value =
                value.isSubscriptionRequestChangeableBizNumber;
        });
        watch(result, (value) => {
            if (value && value.getSubscriptionRequest) {
                // set value license 
                if (value.getSubscriptionRequest.content.company.license) {
                    imageLicenseFile.value =
                        value.getSubscriptionRequest.content.company.license.url ? value.getSubscriptionRequest.content.company.license.url : '';
                    licenseFileName.value =
                        value.getSubscriptionRequest.content.company.license.name;
                }
                delete value.getSubscriptionRequest.content.company.license
                formState.value = value.getSubscriptionRequest;
                formState.value.institutionNumber =
                    value.getSubscriptionRequest.content.accounting.facilityBusinesses.length > 0
                        ? value.getSubscriptionRequest.content.accounting.facilityBusinesses[0].longTermCareInstitutionNumber : "";
                // set date list status value
                dataStatus[0].date = value.getSubscriptionRequest.createdAt;
                dataStatus[1].date = value.getSubscriptionRequest.createdAt;
                dataStatus[2].date = value.getSubscriptionRequest.approvedAt
                    ? value.getSubscriptionRequest.approvedAt
                    : value.getSubscriptionRequest.createdAt;
                dataStatus[3].date = value.getSubscriptionRequest.approvedAt
                    ? value.getSubscriptionRequest.rejectedAt
                    : value.getSubscriptionRequest.createdAt;
                // set status subcription 
                triggerCheckPer.value = true;
                dataQueryCheckPer.value = {
                    id: value.getSubscriptionRequest.id,
                    bizNumber: value.getSubscriptionRequest.companyBizNumber,
                }
                objDataDefault.value = {
                    ...value.getSubscriptionRequest
                }
                objDataDefault.value.institutionNumber =
                    value.getSubscriptionRequest.content.accounting.facilityBusinesses.length > 0
                        ? value.getSubscriptionRequest.content.accounting.facilityBusinesses[0].longTermCareInstitutionNumber : "";
                dataSource.value = formState.value.content.accounting.facilityBusinesses.map((item: any, key: any) => {
                    return {
                        ...item, rowIndex: key
                    }
                })
                // trigger query check if can be change business registration number
                refetchCheckPer();
            }
        });
        const changeTypeCompany = (bizType: number) => {
            if (bizType == 2) {
                return "주민등록번호";
            } else {
                return "법인등록번호";
            }
        };
        const funcAddress = (data: any) => {
            formState.value.content.company.zipcode = data.zonecode;
            formState.value.content.company.roadAddress = data.roadAddress;
            formState.value.content.company.jibunAddress = data.jibunAddress;
            formState.value.content.company.addressDetail.bcode = data.bcode;
            formState.value.content.company.addressDetail.bname = data.bname;
            formState.value.content.company.addressDetail.buildingCode = data.buildingCode;
            formState.value.content.company.addressDetail.buildingName = data.buildingName;
            formState.value.content.company.addressDetail.roadname = data.roadname;
            formState.value.content.company.addressDetail.roadnameCode = data.roadnameCode;
            formState.value.content.company.addressDetail.sido = data.sido;
            formState.value.content.company.addressDetail.sigungu = data.sigungu;
            formState.value.content.company.addressDetail.sigunguCode = data.sigunguCode;
            formState.value.content.company.addressDetail.zonecode = data.zonecode;
        };
        // update subscription request
        const {
            mutate: actionUpdate,
            onError,
            loading: loadingUpdate,
            onDone: updateDone,
        } = useMutation(mutations.updateSubscriptionRequest);
        // query create company by subscription
        const { mutate: actionCreateCompany } = useMutation(
            mutations.createCompanyBySubscriptionRequest
        );
        updateDone((res) => {
            if (res.data.updateSubscriptionRequest.status == 30) {
                actionCreateCompany({ id: res.data.updateSubscriptionRequest.id });
            }
            notification('success', `업데이트 완료!`)
        });
        onError((error) => {
            notification('error', error.message)
        });
        const updateSubscriptionRequest = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                // open collapse 
                res.brokenRules[0].validator.focus();
                inputInCollapse.map((value: any) => {
                    if (value.input_name.indexOf(res.brokenRules[0].validator._validationInfo.result.name) != -1) {
                        activeKey.value = value.key;
                    }
                })
            } else {
                // process data befor handle update
                let contentData: any = formState.value.content;
                let newObj = JSON.parse(JSON.stringify(dataSource.value));
                newObj.map((item: any) => {
                    delete item.rowIndex;
                    delete item.dataImg;
                    if(item?.registrationCardFileStorageId?.length<1){
                        delete item.registrationCardFileStorageId;
                    }
                    item.startYearMonth.toString()
                    return {item}
                })
                contentData.accounting.facilityBusinesses = [...newObj];
                contentData.accounting.accountingServiceTypes.map((item: any) => {
                    item = item == true ? 1 : 0
                })
                const cleanData = JSON.parse(
                    JSON.stringify(contentData, (name, val) => {
                        if (val == null) {
                            //message.error(`${name} is null`, 4);
                            return;
                        }
                        if (
                            name === "__typename" ||
                            name === "registrationCard" ||
                            name === "__KEY__"
                        ) {
                            delete val[name];
                        } else {
                            return val;
                        }
                    })
                );
                let variables = {
                    id: formState.value.id,
                    status: formState.value.status,
                    memo: formState.value.memo,
                    content: cleanData,
                };
                actionUpdate(variables);
            }
        };
        // handle License File upload
        const getUrlLicenseFile = (img: any) => {
            formState.value.content.company.licenseFileStorageId = img.id;
            imageLicenseFile.value = img.url ? img.url : "";
            licenseFileName.value = img.fileName;
            dataActiveRow.value.registrationCardFileStorageId = img.id;
            dataActiveRow.value.registrationCard = img;
        };
        const removeLicenseFile = () => {
            dataActiveRow.value.dataImg = ""
            imageLicenseFile.value = "";
            licenseFileName.value = "";
            dataActiveRow.value.registrationCardFileStorageId="";
            dataActiveRow.value.registrationCard="";
        };
        // handle registration CardFile Storage upload
        const getregCardFile = (img: any) => {
            formState.value.content.accounting.facilityBusinesses.map((e: any) => {
                if (e.name === img.name) {
                    e.registrationCardFileStorageId = img.id
                    e.registrationCard = {
                        name: img.fileName,
                        url: img.url,
                    }
                }
            })
        };
        const removeRegCardFile = (name: any) => {
            formState.value.content.accounting.facilityBusinesses.map((e: any) => {
                if (e.name === name) {
                    e.registrationCardFileStorageId = null
                    e.registrationCard = null
                }
            })
        };
        const contentReady = (e: any) => {
            if (!e.component.getSelectedRowKeys().length) {
                e.component.selectRowsByIndexes(0)
            }
        }
        const selectionChanged = (e: any) => {
            e.component.collapseAll(0);
            e.component.expandRow(e.currentSelectedRowKeys[0]);
        }
        const isNumeric = (value: any) => {
            return /^-?\d+$/.test(value);
        }
        // change form 
        const gridRefName: any = ref("grid");
        const dataActiveRow = ref<any>(dataSource.value[0])
        const focusedRowKey = ref(0)
        const initRow = {
            // longTermCareInstitutionNumber: '',
            // capacity: "",
            // facilityBizType: null,
            // name: null,
            // startYearMonth: null,
            // registrationCardFileStorageId: null,
            rowIndex: null
        }
        const onSelectionClick = (value: any) => {
            dataActiveRow.value = value.data;
            licenseFileName.value = value.data.registrationCard?.name ?? "";
            imageLicenseFile.value = value.data.registrationCard?.url ?? "";
        }
        const addRow = async () => {
            await gridRefName.value.instance.addRow()
            gridRefName.value.instance.closeEditCell();
            setTimeout(() => {
                if (gridRefName.value.instance.totalCount() == 1) {
                    let a = document.body.querySelectorAll('[aria-rowindex]');
                    (a[gridRefName.value.instance.totalCount() - 1] as HTMLInputElement).click();
                }
                let keyNew = gridRefName.value.instance.getKeyByRowIndex(dataSource.value.length - 1);
                focusedRowKey.value = keyNew;
            }, 100);
        };
        const onInitRow = (e: any) => {
            e.data = initRow;
        }
        const onFocusedRowChanged = (e: any) => {
            const data = e.row && e.row.data;
            dataActiveRow.value = data;
        }
        return {
            selectionChanged,
            contentReady,
            move_column,
            colomn_resize,
            titleModal,
            selectedItemKeys,
            checkedService,
            labelCol,
            bizTypeItems,
            visible,
            formState,
            setModalVisible,
            changeTypeCompany,
            loading,
            loadingUpdate,
            activeKey,
            funcAddress,
            updateSubscriptionRequest,
            facilityBizType,
            canChangeableBizNumber,
            getregCardFile,
            removeRegCardFile,
            getUrlLicenseFile,
            licenseFileName,
            imageLicenseFile,
            removeLicenseFile,
            arrayRadioWithdrawDay,
            dayjs,
            isNumeric,
            onSelectionClick,
            dataActiveRow,
            addRow,
            gridRefName,
            facilityBizTypeCommon,
            dataSource,
            onInitRow,
            focusedRowKey,
            onFocusedRowChanged,
        };
    },
});
</script>   
<style lang="scss" scoped src="../style/popupStyle.scss" >

</style>