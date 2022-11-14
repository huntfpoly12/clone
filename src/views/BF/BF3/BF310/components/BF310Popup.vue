<template>
    <div id="modal-detail-bf-310">
        <a-modal :mask-closable="false" v-model:visible="visible" title="계약정보관리&심사 " centered
            @cancel="setModalVisible()" width="1000px" :bodyStyle="{ height: '800px' }" :footer="null">
            <a-spin tip="Loading..." :spinning="loading || loadingUpdate">
                <form class="ant-form ant-form-horizontal">
                    <div class="collapse-content">
                        <a-collapse v-model:activeKey="activeKey" accordion :bordered="false">
                            <a-collapse-panel key="1" header="심사정보">
                                <a-form-item label="승인상태" label-align="left" :label-col="labelCol">
                                    <a-dropdown :trigger="['hover']">
                                        <button type="button" class="custom-button">
                                            <div style="display: flex; width: 100%">
                                                <div style="padding-right: 6px; margin-right: 0px">
                                                    <span>
                                                        <a-tag v-model:color="dataSelectStatus.color">
                                                            {{ dataSelectStatus.name }}
                                                        </a-tag>
                                                    </span>
                                                </div>
                                                <span class="custiom-date">
                                                    {{ $filters.formatDate(dataSelectStatus.date) }}
                                                </span>
                                            </div>
                                        </button>
                                        <template #overlay>
                                            <a-table :columns="[
                                                { name: 'Name', dataIndex: 'name', key: 'name' },
                                                { title: 'date', dataIndex: 'date', key: 'date' },
                                            ]" :data-source="dataStatus" :pagination="false" :showHeader="false"
                                                :customRow="customRow">
                                                <template #bodyCell="{ column, record }">
                                                    <div :style="{ cursor: 'pointer' }">
                                                        <template v-if="column.key === 'name'">
                                                            <a-tag :color="record.color"
                                                                :style="{ width: '50px', textAlign: 'center' }">{{
                                                                        record.name
                                                                }}</a-tag>
                                                        </template>
                                                        <template v-if="column.key === 'date'">
                                                            {{ $filters.formatDate(record.date) }}
                                                        </template>
                                                    </div>
                                                </template>
                                            </a-table>
                                        </template>
                                    </a-dropdown>
                                </a-form-item>
                                <a-form-item label="사업자코드" label-align="left" :label-col="labelCol">
                                    <default-text-box v-model:valueInput="formState.companyBizNumber" :disabled="true"
                                        width="200px" />
                                </a-form-item>
                                <a-row>
                                    <a-col :span="24" style="display: flex;">
                                        <a-form-item label="신청코드" label-align="left" :label-col="labelCol">
                                            <default-text-box v-model:valueInput="formState.code" :disabled="true"
                                                width="200px" />
                                        </a-form-item>
                                        <a-form-item label="신청일자" label-align="left" style="padding-left: 20px;">
                                            <default-text-box v-model:valueInput="formState.createdAt" :disabled="true"
                                                width="200px" />
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <a-form-item label="심사메모" label-align="left" :label-col="labelCol">
                                    <default-text-box v-model:valueInput="formState.memo" />
                                </a-form-item>
                                <a-form-item label="약관동의" label-align="left" :label-col="labelCol">
                                    <a-button type="link" style="padding: 0px">서비스약관</a-button>
                                    |
                                    <a-button type="link" style="padding: 0px">개인정보제공활용동의</a-button>
                                    |
                                    <a-button type="link" style="padding: 0px">회계서비스약관동의</a-button>
                                    |
                                    <a-button type="link" style="padding: 0px">원천서비스약관동의</a-button>
                                </a-form-item>
                            </a-collapse-panel>
                            <a-collapse-panel key="2" header="사업자정보">
                                <div style="height: 350px; overflow-y: scroll">
                                    <a-form-item label="상 호" class="clr" label-align="left" :label-col="labelCol">
                                        <default-text-box v-model:valueInput="formState.companyName" width="70%"
                                            :required="true" messRequired="이항목은 필수 입력사항입니다!" />
                                    </a-form-item>
                                    <a-form-item label="사업자등록번호" class="clr" label-align="left" :label-col="labelCol">
                                        <biz-number-text-box :disabled="!canChangeableBizNumber"
                                            v-model:valueInput="formState.companyBizNumber" width="120" :required="true"
                                            messRequired="이항목은 필수 입력사항입니다!" />
                                    </a-form-item>
                                    <a-row>
                                        <a-col :span="12">
                                            <a-form-item label="사업자유형" class="clr" label-align="left"
                                                :label-col="labelCol">
                                                <radio-group :arrayValue="bizTypeItems"
                                                    v-model:valueRadioCheck="formState.content.company.bizType"
                                                    layoutCustom="horizontal"></radio-group>
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="12">
                                            <a-form-item :label="changeTypeCompany(formState.content.company.bizType)"
                                                label-align="left" :label-col="labelCol">
                                                <id-number-text-box :required="true"
                                                    v-model:valueInput="formState.content.company.residentId"
                                                    width="224px" messRequired="이항목은 필수 입력사항입니다!" />
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <a-form-item label="주소" class="clr" label-align="left" :label-col="labelCol">
                                        <a-row :gutter="[0, 4]">
                                            <a-col :span="24">
                                                <a-row>
                                                    <a-col :span="12">
                                                        <default-text-box
                                                            v-model:valueInput="formState.content.company.zipcode"
                                                            width="100%" :disabled="true" />
                                                    </a-col>
                                                    <a-col :span="12">
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
                                    <div style="display: flex">
                                        <div>
                                            <a-row :gutter="[16, 16]">
                                                <a-col :span="15">
                                                    <a-form-item label="연락처" class="clr" label-align="left"
                                                        :label-col="labelCol">
                                                        <text-number-box
                                                            v-model:valueInput="formState.content.company.phone"
                                                            :required="true" messRequired="이항목은 필수 입력사항입니다!" />
                                                    </a-form-item>
                                                    <a-form-item label="팩 스" label-align="left" :label-col="labelCol">
                                                        <text-number-box
                                                            v-model:valueInput="formState.content.company.fax" />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <img-upload :title="titleModal" @update-img="getUrlLicenseFile"
                                                style="margin-top: 10px" />
                                        </div>
                                        <a-col :span="7">
                                            <preview-image :dataImage="{ url: imageLicenseFile, name: licenseFileName }"
                                                @deleteImg="removeLicenseFile" />
                                        </a-col>
                                    </div>
                                </div>
                            </a-collapse-panel>
                            <a-collapse-panel key="3" header="대표자정보">
                                <a-form-item has-feedback label="대표자명" class="clr" label-align="left"
                                    :label-col="labelCol">
                                    <default-text-box v-model:valueInput="formState.content.president.name"
                                        width="200px" :required="true" messRequired="이항목은 필수 입력사항입니다!" />
                                </a-form-item>
                                <a-form-item has-feedback label="생년월일" class="clr" label-align="left"
                                    :label-col="labelCol">
                                    <a-form :model="formState" name="nest-messages"
                                        :validate-messages="validateMessages">
                                        <a-form-item :name="['content.president.birthday']"
                                            :rules="[{ required: true }]" label-align="left" :label-col="labelCol">
                                            <date-time-box width="200px"
                                                v-model:valueDate="formState.content.president.birthday"
                                                dateFormat="YYYY-MM-DD" />
                                        </a-form-item>
                                    </a-form>
                                </a-form-item>
                                <a-form-item has-feedback label="휴대폰번호" class="clr" label-align="left"
                                    :label-col="labelCol">
                                    <text-number-box v-model:valueInput="formState.content.president.mobilePhone"
                                        :required="true" width="200px" placeholder="‘-’ 없이 슷자입력"
                                        messRequired="이항목은 필수 입력사항입니다!" />
                                </a-form-item>
                                <a-form-item has-feedback label="이메일" class="clr" :name="['user', 'email']"
                                    :rules="[{ type: 'email' }]" label-align="left" :label-col="labelCol">
                                    <mail-text-box v-model:valueInput="formState.content.president.email" width="350px"
                                        :required="true" messRequired="이항목은 필수 입력사항입니다!" />
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
                                        <div id="data-grid-demo">
                                            <DxDataGrid id="gridContainer"
                                                :data-source="formState.content.accounting.facilityBusinesses"
                                                :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                                                :show-borders="true" :selected-row-keys="selectedItemKeys">
                                                <DxEditing :use-icons="true" :allow-updating="true" :allow-adding="true"
                                                    :allow-deleting="true" template="button-template" mode="cell">
                                                    <DxTexts confirmDeleteMessage="삭제하겠습니까?" />
                                                </DxEditing>
                                                <template #button-template>
                                                    <DxButton icon="plus" />
                                                </template>
                                                <DxPaging :enabled="false" />
                                                <DxColumn data-field="No" :allow-editing="false" :width="50" caption="#"
                                                    cell-template="indexCell" />
                                                <template #indexCell="{ data }">
                                                    <div>{{ data.rowIndex + 1 }}</div>
                                                </template>
                                                <DxColumn data-field="name" caption="사업명 (중복불가)" />
                                                <DxColumn data-field="facilityBizType" caption="사업분류">
                                                    <DxLookup :data-source="facilityBizType" value-expr="v"
                                                        display-expr="n" />
                                                </DxColumn>
                                                <DxColumn data-field="startYearMonth" caption="서비스시작년월" data-type="date"
                                                    :format="'yyyy-MM-dd'" />
                                                <DxColumn :width="100" data-field="capacity" caption="정원수 (명)" />
                                                <DxToolbar>
                                                    <DxItem name="addRowButton" />
                                                </DxToolbar>
                                            </DxDataGrid>
                                        </div>
                                        <a-form-item label="장기요양기관등록번호" class="clr">
                                            <default-text-box v-model:valueInput="formState.institutionNumber"
                                                :required="true" width="250px" messRequired="이항목은 필수 입력사항입니다!" />
                                        </a-form-item>
                                        <div style="display: flex">
                                            <div>
                                                <imgUpload :title="titleModal" @update-img="getregCardFile"
                                                    style="margin-top: 10px" />
                                                <div>
                                                    <a-row>
                                                        <a-col :span="12">
                                                            <p>부가서비스</p>
                                                        </a-col>
                                                        <a-col :span="12">
                                                            <checkbox-basic
                                                                v-model:valueCheckbox="formState.content.accounting.accountingServiceTypes[0]"
                                                                :disabled="false" size="15" label="회계서비스 신청합니다." />
                                                        </a-col>
                                                    </a-row>
                                                </div>
                                            </div>
                                            <a-col :span="7">
                                                <div v-if="imageRegCardFile" class="img-preview">
                                                    <a-image :src="imageRegCardFile" />
                                                </div>
                                                <div v-else class="img-preview">
                                                    <img src="../../../../../assets/images/imgdefault.jpg" />
                                                </div>
                                                <div v-if="regCardFileName">
                                                    <span style="padding-right: 10px">{{
                                                            regCardFileName
                                                    }}</span>
                                                    <delete-outlined @click="removeRegCardFile"
                                                        style="color: red; cursor: pointer" />
                                                </div>
                                            </a-col>
                                        </div>
                                    </div>
                                </div>
                            </a-collapse-panel>
                            <a-collapse-panel key="5" header="원천서비스신청">
                                <div>
                                    <checkbox-basic label="회계서비스 신청합니다." v-model:valueCheckbox="checkedService"
                                        :disabled="false" :size="'16'" />
                                    <div style="margin-top: 20px">
                                        <a-form-item label="서비스 시작년월" class="clr" label-align="left"
                                            :label-col="labelCol">
                                            <div style="width: 200px">
                                                <month-picker-box
                                                    v-model:value="formState.content.withholding.startYearMonth"
                                                    className="0" />
                                            </div>
                                        </a-form-item>
                                        <a-form-item label="직 원 수" class="clr" label-align="left" :label-col="labelCol">
                                            <number-box :required="true" width="100px" :min="0" :spinButtons="true"
                                                v-model:valueInput="formState.content.withholding.capacity"
                                                messRequired="이항목은 필수 입력사항입니다!" />
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
                                        v-model:valueInput="formState.content.cmsBank.accountNumber" />
                                </a-form-item>
                                <a-form-item label="예금주명" class="clr" label-align="left" :label-col="labelCol">
                                    <default-text-box width="250px" :required="true"
                                        v-model:valueInput="formState.content.cmsBank.ownerName" />
                                </a-form-item>
                                <a-form-item label="사업자(주민)등록번호:" class="d-flex align-items-start clr"
                                    label-align="left" :label-col="labelCol">
                                    <text-number-box width="250px" :required="true"
                                        v-model:valueInput="formState.content.cmsBank.ownerBizNumber" />
                                    <div class="noteImage">
                                        <InfoCircleFilled />
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
                                <a-form-item label="영업관리담당" label-align="left" :label-col="labelCol">
                                    <list-sales-dropdown
                                        v-model:selected="formState.content.extra.salesRepresentativeId"
                                        width="200px" />
                                </a-form-item>
                                <a-form-item label="전달사항" label-align="left" :label-col="labelCol">
                                    <text-area-box v-model:valueInput="formState.content.extra.comment"
                                        placeholder="전달사항입력" />
                                </a-form-item>
                            </a-collapse-panel>
                        </a-collapse>
                    </div>
                    <a-row style="margin-top: 20px;">
                        <a-col :span="16" :offset="8">
                            <button-basic text="그냥 나가기" :type="'default'" mode="outlined" @onClick="setModalVisible()"
                                :width="120" style="margin-right: 10px;" />
                            <button-basic text="저장하고 나가기" :type="'default'" mode="'contained'"
                                @onClick="updateSubscriptionRequest($event)" :width="150" />
                        </a-col>
                    </a-row>
                </form>
            </a-spin>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { useStore } from 'vuex';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxEditing,
    DxLookup,
    DxToolbar,
    DxItem,
    DxTexts,
} from "devextreme-vue/data-grid";
import {
    UploadOutlined,
    MinusCircleOutlined,
    InfoCircleFilled,
    PlusOutlined,
    DeleteOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { FacilityBizType } from "@bankda/jangbuda-common";
import DxDropDownBox from "devextreme-vue/drop-down-box";
import { bizTypeItems } from "../utils";
import { initialFormState, initialDataStatus } from "../utils/index"
import queries from "../../../../../graphql/queries/BF/BF3/BF310/index";
import mutations from "../../../../../graphql/mutations/BF/BF3/BF310/index";
import imgUpload from "../../../../../components/UploadImage.vue";
import BankSelectBox from "../../../../../components/BankSelectBox.vue";
export default defineComponent({
    props: {
        modalStatus: {
            default: false,
            type: Boolean,
        },
        data: {},
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
        InfoCircleFilled,
        PlusOutlined,
        imgUpload,
        DxEditing,
        DxLookup,
        DxToolbar,
        DxItem,
        DxTexts,
        BankSelectBox
    },
    setup(props, { emit }) {
        // config grid
        const store = useStore();
        
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const labelCol = { style: { width: "150px" } };
        const wrapperCol = { span: 16 };
        const facilityBizType = FacilityBizType.all();
        const imageRegCardFile = ref("");
        const regCardFileName = ref("");
        const regCardFileId = ref("");
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
        const radioStyle = reactive({
            display: "flex",
            height: "20px",
            lineHeight: "20px",
            checked: false,
        })
        const selectedItemKeys = reactive([])
        const titleModal = ref("사업자등록증")
        var dataStatus = initialDataStatus
        let dataSelectStatus = reactive({
            name: "승인",
            date: "2022-08-25",
            color: "green",
        });
        const arrayRadioWithdrawDay = reactive([
            { id: '매월 5일', text: '매월 5일' },
            { id: '매월 12일', text: '매월 12일' },
            { id: '매월 19일', text: '매월 19일' },
        ])
        var formState = ref({ ...initialFormState });
        // event close popup
        const setModalVisible = () => {
            triggerCheckPer.value = false;
            trigger.value = false;
            emit("closePopup", false);
        };
        const validateMessages = {
            required: "이항목은 필수 입력사항입니다!",
            types: {
                email: "이메일 형식이 정확하지 않습니다",
                number: "Numeric only!",
            },
            number: {
                range: "${label} must be between ${min} and ${max}",
            },
        };
        // watch event modal popup
        watch(
            () => props.modalStatus,
            (newValue, old) => {
                if (newValue) {
                    visible.value = newValue;
                    dataQuery.value = { id: props.data };
                    trigger.value = true;
                    refetch();
                    Object.assign(formState, initialFormState);
                } else {
                    Object.assign(formState, initialFormState);
                    // reset image if close popup
                    regCardFileId.value = "";
                    imageRegCardFile.value = "";
                    regCardFileName.value = "";
                    imageLicenseFile.value = "";
                    licenseFileName.value = "";
                    visible.value = newValue;
                    trigger.value = false;
                    activeKey.value = 1;
                }
            }
        );
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
                imageLicenseFile.value =
                    value.getSubscriptionRequest.content.company.license.url;
                licenseFileName.value =
                    value.getSubscriptionRequest.content.company.license.name;
                // set value Term Care Institution
                let faBusinesses =
                    value.getSubscriptionRequest.content.accounting.facilityBusinesses;
                // console.log(faBusinesses);
                if (
                    faBusinesses.length > 0 &&
                    faBusinesses[0].registrationCard != null
                ) {
                    imageRegCardFile.value = faBusinesses[0].registrationCard.url;
                    regCardFileName.value = faBusinesses[0].registrationCard.name;
                }
                delete value.getSubscriptionRequest.content.company.license
                formState.value = value.getSubscriptionRequest;
                formState.value.institutionNumber =
                    value.getSubscriptionRequest.content.accounting.facilityBusinesses
                        .length > 0
                        ? value.getSubscriptionRequest.content.accounting
                            .facilityBusinesses[0].longTermCareInstitutionNumber
                        : "";
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
                switch (value.getSubscriptionRequest.status) {
                    case 10:
                        dataSelectStatus.name = "신청";
                        dataSelectStatus.color = "red";
                        dataSelectStatus.date = value.getSubscriptionRequest.createdAt;
                        break;
                    case 20:
                        dataSelectStatus.name = "심사중";
                        dataSelectStatus.color = "blue";
                        dataSelectStatus.date = value.getSubscriptionRequest.createdAt;
                        break;
                    case 30:
                        dataSelectStatus.name = "승인";
                        dataSelectStatus.color = "green";
                        dataSelectStatus.date = value.getSubscriptionRequest.approvedAt;
                        break;
                    case 99:
                        dataSelectStatus.name = "반려";
                        dataSelectStatus.color = "grey";
                        dataSelectStatus.date = value.getSubscriptionRequest.rejectedAt;
                        break;
                    default:
                        break;
                }
                triggerCheckPer.value = true;
                dataQueryCheckPer.value = {
                    id: value.getSubscriptionRequest.id,
                    bizNumber: value.getSubscriptionRequest.companyBizNumber,
                };
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
        const customRow = (record: any) => {
            return {
                onClick: (event: any) => {
                    dataSelectStatus.name = record.name;
                    dataSelectStatus.color = record.color;
                    dataSelectStatus.date = record.date;
                    // set status subcription
                    formState.value.status = record.value;
                },
            };
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
            message.success(`업데이트 완료!`, 4);
            setModalVisible();
        });
        onError((error) => {
            message.error(error.message, 4);
        });
        const updateSubscriptionRequest = (e: any) => {
            let customAccountingfacilityBusinesses: any = [];
            if (formState.value.content.accounting.facilityBusinesses) {
                customAccountingfacilityBusinesses =
                    formState.value.content.accounting.facilityBusinesses.map(
                        (facilityBusinesses: any) => ({
                            longTermCareInstitutionNumber:
                                formState.value.institutionNumber,
                            capacity: facilityBusinesses.capacity,
                            facilityBizType: facilityBusinesses.facilityBizType,
                            name: facilityBusinesses.name,
                            registrationCard: facilityBusinesses.registrationCard,
                            registrationCardFileStorageId:
                                regCardFileId.value == ""
                                    ? facilityBusinesses.registrationCardFileStorageId
                                    : regCardFileId.value,
                            startYearMonth: facilityBusinesses.startYearMonth,
                        })
                    );
            }
            // process data befor handle update
            let contentData = formState.value.content;
            contentData.accounting.facilityBusinesses = customAccountingfacilityBusinesses;
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
        };
        // handle License File upload
        const getUrlLicenseFile = (img: any) => {
            formState.value.content.company.licenseFileStorageId = img.id;
            imageLicenseFile.value = img.url;
            licenseFileName.value = img.fileName;
        };
        const removeLicenseFile = () => {
            imageLicenseFile.value = "";
            licenseFileName.value = "";
        };
        // handle registration CardFile Storage upload
        const getregCardFile = (img: any) => {
            regCardFileId.value = img.id;
            imageRegCardFile.value = img.url;
            regCardFileName.value = img.fileName;
        };
        const removeRegCardFile = () => {
            regCardFileId.value = "";
            imageRegCardFile.value = "";
            regCardFileName.value = "";
        };
        return {
            titleModal,
            selectedItemKeys,
            move_column,
            colomn_resize,
            radioStyle,
            checkedService,
            labelCol,
            wrapperCol,
            bizTypeItems,
            visible,
            formState,
            validateMessages,
            setModalVisible,
            changeTypeCompany,
            result,
            error,
            loading,
            loadingUpdate,
            dataSelectStatus,
            customRow,
            dataStatus,
            activeKey,
            funcAddress,
            updateSubscriptionRequest,
            facilityBizType,
            canChangeableBizNumber,
            getregCardFile,
            imageRegCardFile,
            regCardFileName,
            removeRegCardFile,
            getUrlLicenseFile,
            licenseFileName,
            imageLicenseFile,
            removeLicenseFile,
            arrayRadioWithdrawDay
        };
    },
});
</script> 
<style lang="scss" scoped>
@import "../style/popupStyle.scss";
</style>