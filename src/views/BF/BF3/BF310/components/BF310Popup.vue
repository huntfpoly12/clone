<template>
    <div id="modal-detail-bf-310">
        <a-modal :mask-closable="false" v-model:visible="visible" title="계약정보관리&심사 " centered
            @cancel="setModalVisible()" width="1000px" :bodyStyle="{ height: '800px' }">
            <template #footer>
                <a-button @click="setModalVisible">그냥 나가기</a-button>
                <a-button key="submit" type="primary" :loading="loading || loadingUpdate"
                    @click.prevent="updateSubscriptionRequest">
                    저장하고 나가기</a-button>
            </template>
            <a-spin tip="Loading..." :spinning="loading || loadingUpdate">
                <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-collapse v-model:activeKey="activeKey" accordion>
                        <a-collapse-panel key="1" header="심사정보">
                            <a-form-item label="승인상태">
                                <a-dropdown :trigger="['hover']">
                                    <button class="custom-button">
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

                            <a-form-item label="사업자코드">
                                <a-typography-title :level="5">
                                    {{ formState.companyBizNumber }}
                                </a-typography-title>
                            </a-form-item>
                            <a-row>
                                <a-col :span="12">
                                    <a-form-item label="신청코드">
                                        <a-typography-title :level="5">{{ formState.code }}
                                        </a-typography-title>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item label="신청일자">
                                        <a-typography-title :level="5">
                                            {{ $filters.formatDate(formState.createdAt) }}
                                        </a-typography-title>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-form-item label="심사메모">
                                <a-input v-model:value="formState.memo" />
                            </a-form-item>
                            <a-form-item label="약관동의">
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
                            <div style="height: 400px; overflow-y: scroll">
                                <a-form-item label="상 호" class="clr">
                                    <default-text-box v-model:valueInput="formState.companyName" width="100%"
                                        :required="true" messRequired="이항목은 필수 입력사항입니다!" />
                                </a-form-item>
                                <a-form-item label="사업자등록번호" class="clr">
                                    <company-registration-number-text-box :disabled="!canChangeableBizNumber"
                                        v-model:valueInput="formState.companyBizNumber" width="300px" :required="true"
                                        messRequired="이항목은 필수 입력사항입니다!" />
                                </a-form-item>
                                <a-row>
                                    <a-col :span="12">
                                        <a-form-item label="사업자유형" class="clr">
                                            <a-radio-group v-model:value="formState.companyBizType">
                                                <a-radio :value="1" class="clb" checked>법인사업자</a-radio>
                                                <a-radio :value="2" class="clb">개인사업자</a-radio>
                                            </a-radio-group>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="12">
                                        <a-form-item :label="changeTypeCompany(formState.companyBizType)">
                                            <id-card-text-box :required="true"
                                                v-model:valueInput="formState.companyResidentId" width="224px"
                                                messRequired="이항목은 필수 입력사항입니다!" />
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <a-form-item label="주소" class="clr">
                                    <a-row :gutter="[0, 4]">
                                        <a-col :span="24">
                                            <a-row>
                                                <a-col :span="12">
                                                    <default-text-box v-model:valueInput="formState.companyZipcode"
                                                        width="100%" :disabled="true" />
                                                </a-col>
                                                <a-col :span="12">
                                                    <div style="margin-left: 5px">
                                                        <a-button type="primary" ghost>
                                                            <postCode @dataAddress="funcAddress" />
                                                        </a-button>
                                                    </div>
                                                </a-col>
                                            </a-row>
                                        </a-col>
                                        <a-col :span="24">
                                            <default-text-box v-model:valueInput="formState.companyRoadAddress"
                                                width="100%" :disabled="true" />
                                        </a-col>
                                        <a-col :span="24">
                                            <default-text-box v-model:valueInput="formState.companyAddressExtend"
                                                width="100%" placeholder="상세 주소 입력" />
                                        </a-col>
                                    </a-row>
                                    <a-row> </a-row>
                                </a-form-item>

                                <div style="display: flex">
                                    <div>
                                        <a-row :gutter="[16, 16]">
                                            <a-col :span="15">
                                                <a-form-item label="연락처" class="clr"> 
                                                    <tel-tex-box v-model:valueInput="formState.companyPhone"
                                                        :spinButtons="false" :required="true" :clearButton="false"
                                                        messRequired="이항목은 필수 입력사항입니다!" :width="200" />
                                                </a-form-item>
                                                <a-form-item label="팩 스">
                                                    <text-number-box v-model:valueInput="formState.companyFax"
                                                        :clearButton="false" :width="200" />
                                                </a-form-item>
                                            </a-col>
                                        </a-row>
                                        <imgUpload :title="titleModal" @update-img="getUrlLicenseFile"
                                            style="margin-top: 10px" />
                                    </div>
                                    <a-col :span="7">
                                        <div v-if="imageLicenseFile" class="img-preview">
                                            <a-image :src="imageLicenseFile" />
                                        </div>
                                        <div v-else class="img-preview">
                                            <img src="../../../../../assets/images/imgdefault.jpg" />
                                        </div>
                                        <div v-if="licenseFileName">
                                            <span style="padding-right: 10px">{{
                                                    licenseFileName
                                            }}</span>
                                            <delete-outlined @click="removeLicenseFile"
                                                style="color: red; cursor: pointer" />
                                        </div>
                                    </a-col>
                                </div>
                            </div>
                        </a-collapse-panel>
                        <a-collapse-panel key="3" header="대표자정보">
                            <a-form-item has-feedback label="대표자명" class="clr">
                                <default-text-box v-model:valueInput="formState.presidentContentName" width="300px"
                                    :required="true" messRequired="이항목은 필수 입력사항입니다!" />
                            </a-form-item>
                            <a-form-item has-feedback label="생년월일" class="clr">
                                <!-- <birth-day-box v-model:valueInput="formState.presidentBirthday" :required="true"
                                  width="300px" messRequired="이항목은 필수 입력사항입니다!" /> -->
                                <a-form :model="formState" name="nest-messages" :validate-messages="validateMessages">
                                    <a-form-item :name="['presidentBirthday']" :rules="[{ required: true }]">
                                        <a-date-picker v-model:value="formState.presidentBirthday"
                                            value-format="YYYY-MM-DD" placeholder="" class="custom-width-date" />
                                    </a-form-item>
                                </a-form>
                            </a-form-item>
                            <a-form-item has-feedback label="휴대폰번호" class="clr">
                                <text-number-box v-model:valueInput="formState.presidentPhone" :required="true"
                                    width="200px" placeholder="‘-’ 없이 슷자입력" messRequired="이항목은 필수 입력사항입니다!" />
                            </a-form-item>
                            <a-form-item has-feedback label="이메일" class="clr" :name="['user', 'email']"
                                :rules="[{ type: 'email' }]">
                                <mail-text-box v-model:valueInput="formState.presidentEmail" width="200px"
                                    :required="true" messRequired="이항목은 필수 입력사항입니다!" />
                            </a-form-item>
                        </a-collapse-panel>
                        <a-collapse-panel key="4" header="회계서비스신청" class="popup-scroll">
                            <div style="height: 400px; overflow-y: scroll">
                                <a-checkbox v-model:checked="checked">회계서비스 신청합니다.</a-checkbox>
                                <div>
                                    <a-card title="⁙ 운영사업" :bordered="false" style="width: 100%"
                                        :headStyle="{ padding: '5px', color: 'red' }" bodyStyle="padding: 0px 0px">
                                    </a-card>
                                    <div id="data-grid-demo">
                                        <DxDataGrid id="gridContainer"
                                            :data-source="formState.accountingfacilityBusinesses" :show-borders="true"
                                            :selected-row-keys="selectedItemKeys">
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
                                        <!-- <a-input placeholder="1234567898" style="width: 250px" v-model:value="formState.accountinglongTermCareInstitutionNumber" /> -->

                                        <default-text-box
                                            v-model:valueInput="formState.accountinglongTermCareInstitutionNumber"
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
                                                        <a-checkbox
                                                            v-model:checked="formState.accountingServiceTypes[0]">
                                                            회계입력대행서비스</a-checkbox>
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
                                <a-checkbox v-model:checked="checked">회계서비스 신청합니다.</a-checkbox>
                                <div style="margin-top: 20px">
                                    <a-form-item label="서비스 시작년월" class="clr">
                                        <div style="width: 200px">
                                            <month-picker-box v-model:value="formState.withholdingYearMonth"
                                                className="0" />
                                        </div>
                                    </a-form-item>
                                    <a-form-item label="직 원 수" class="clr">
                                        <number-box :required="true" width="100px" :min="0" :spinButtons="true"
                                            v-model:valueInput="formState.withholdingCapacity"
                                            messRequired="이항목은 필수 입력사항입니다!" />
                                    </a-form-item>
                                    <a-form-item label="부가서비스">
                                        <a-checkbox v-model:checked="formState.withholdingServiceTypes[0]">
                                            4대보험신고서비스</a-checkbox>
                                    </a-form-item>
                                </div>
                            </div>
                        </a-collapse-panel>
                        <a-collapse-panel key="6" header="CMS (자동이체출금) 계좌 정보 입력">
                            <a-form-item label="출금은행" class="clr">
                                <bank-select-box v-model:valueInput="formState.cmsBankType" width="150px" />
                            </a-form-item>
                            <a-form-item label="출금계좌번호" class="clr">
                                <a-input v-model:value="formState.accountNumber" style="width: 250px" />
                            </a-form-item>
                            <a-form-item label="예금주명" class="clr">
                                <a-input v-model:value="formState.ownerName" style="width: 250px" />
                            </a-form-item>
                            <a-form-item label="사업자(주민)등록번호:" class="d-flex align-items-start clr">
                                <a-input v-model:value="formState.ownerBizNumber" style="width: 250px" />
                                <div class="noteImage">
                                    <a-row>
                                        <a-col :span="1">
                                            <div>
                                                <InfoCircleFilled />
                                            </div>
                                        </a-col>
                                        <a-col :span="22">
                                            <div class="noteText">
                                                <p>예금주의 사업자등록번호 또는 주민등록번호입니다.</p>
                                            </div>
                                        </a-col>
                                    </a-row>
                                </div>
                            </a-form-item>
                            <a-form-item label="자동이체출금일자" class="clr">
                                <a-radio-group v-model:value="formState.withdrawDay">
                                    <a-radio class="clb" :style="radioStyle" value="매월 5일">매월 5일</a-radio>
                                    <a-radio class="clb" :style="radioStyle" value="매월 12일">매월 12일</a-radio>
                                    <a-radio class="clb" :style="radioStyle" value="매월 19일">매월 19일</a-radio>
                                </a-radio-group>
                            </a-form-item>
                        </a-collapse-panel>
                        <a-collapse-panel key="7" header="기타">
                            <a-form-item label="영업관리담당">
                                <ListSalesDropdown v-model:selected="formState.extraSalesRepresentativeId"
                                    width="200px" />
                            </a-form-item>
                            <a-form-item label="전달사항">
                                <a-textarea v-model:value="formState.extraComment" placeholder="전달사항입력" />
                            </a-form-item>
                        </a-collapse-panel>
                    </a-collapse>
                </a-form>
            </a-spin>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch } from "vue";
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
import ListSalesDropdown from "../../../../../components/ListSalesDropdown.vue";
import queries from "../../../../../graphql/queries/BF/BF3/BF310/index";
import mutations from "../../../../../graphql/mutations/BF/BF3/BF310/index";
import postCode from "../../../../../components/postCode.vue";
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
    data() {
        return {
            checked: true,
            labelCol: { style: { width: "150px" } },
            wrapperCol: { span: 18 },
            radioStyle: {
                display: "flex",
                height: "20px",
                lineHeight: "20px",
                checked: false,
            },
            selectedItemKeys: [],
            value: ref<number>(1),
            titleModal: "사업자등록증",
            titleModal2: "장기요양기관등록증",
        };
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
        ListSalesDropdown,
        InfoCircleFilled,
        PlusOutlined,
        imgUpload,
        DxEditing,
        DxLookup,
        DxToolbar,
        DxItem,
        DxTexts,
        postCode,
        BankSelectBox
    },
    setup(props, { emit }) {
        const formRef = ref();
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
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };

        /** Application (신청) - 10 */
        /** Under examination (심사중) - 20 */
        /** Approval (승인) - 30 */
        /** Application rejected (반려) - 99 */
        const dataStatus = reactive([
            { name: "승인", date: "2022-08-25", color: "green", value: 30 },
            { name: "신청", date: "2022-08-25", color: "red", value: 10 },
            { name: "심사중", date: "2022-08-25", color: "blue", value: 20 },
            { name: "반려", date: "2022-08-25", color: "grey", value: 99 },
        ]);

        let dataSelectStatus = reactive({
            name: "승인",
            date: "2022-08-25",
            color: "green",
        });

        const initialFormState = {
            id: null,
            status: 10,
            code: "",
            companyName: "",
            companyBizNumber: "",
            companyAddress: "",
            presidentName: "",
            simpleAccountingInfos: [],
            simpleWithholdingInfoName: "",
            simpleWithholdingInfoYearMonth: "",
            processedAt: "",
            approvedAt: "",
            rejectedAt: "",

            agreementsTerms: true,
            agreementsPersonalInfo: true,
            agreementsAccountingService: true,
            agreementsWithholdingService: true,

            companyZipcode: "",
            companyRoadAddress: "",
            companyJibunAddress: "",

            companyAddressExtend: "",
            companyAddressDetailBcode: "",
            companyAddressDetailBname: "",
            companyAddressDetailBuildingCode: "",
            companyAddressDetailBuildingName: "",
            companyAddressDetailRoadname: "",
            companyAddressDetailRoadnameCode: "",
            companyAddressDetailSido: "",
            companyAddressDetailSigungu: "",
            companyAddressDetailSigunguCode: "",
            companyAddressDetailZonecode: "",

            companyPhone: "",
            companyFax: "",
            companyLicenseFileStorageId: "",
            companyBizType: 0,
            companyResidentId: "",
            companyLicense: "",

            presidentContentName: "",
            presidentBirthday: "",
            presidentPhone: "",
            presidentEmail: "",
            accountingfacilityBusinesses: [],
            accountinglongTermCareInstitutionNumber: "",
            accountingServiceTypes: [],

            withholdingYearMonth: "",
            withholdingCapacity: 1234,
            withholdingServiceTypes: [],

            cmsBankType: "",
            accountNumber: "",
            ownerName: "",
            ownerBizNumber: "",
            withdrawDay: "",

            compactSalesRepresentativeID: "",
            compactSalesRepresentativeCode: "",
            compactSalesRepresentativeName: "",
            compactSalesRepresentativeActive: "",

            memo: "",
            createdAt: "",
            createdBy: "",
            updatedBy: "",
            ip: "",
            active: "",

            extraSalesRepresentativeId: 1,
            extraComment: "",
        };
        const formState = reactive({ ...initialFormState });

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
                console.log(faBusinesses);
                if (
                    faBusinesses.length > 0 &&
                    faBusinesses[0].registrationCard != null
                ) {
                    imageRegCardFile.value = faBusinesses[0].registrationCard.url;
                    regCardFileName.value = faBusinesses[0].registrationCard.name;
                }

                formState.id = value.getSubscriptionRequest.id;
                formState.status = value.getSubscriptionRequest.status;
                formState.code = value.getSubscriptionRequest.code;
                formState.companyName = value.getSubscriptionRequest.companyName;
                formState.companyBizNumber =
                    value.getSubscriptionRequest.companyBizNumber;
                formState.companyAddress = value.getSubscriptionRequest.companyAddress;
                formState.presidentName = value.getSubscriptionRequest.presidentName;

                formState.simpleWithholdingInfoName =
                    value.getSubscriptionRequest.simpleAccountingInfos.name;
                formState.simpleWithholdingInfoYearMonth =
                    value.getSubscriptionRequest.simpleAccountingInfos.startYearMonth;

                formState.processedAt = value.getSubscriptionRequest.processedAt;
                formState.approvedAt = value.getSubscriptionRequest.approvedAt;
                formState.rejectedAt = value.getSubscriptionRequest.rejectedAt;

                formState.agreementsTerms =
                    value.getSubscriptionRequest.content.agreements.terms;
                formState.agreementsPersonalInfo =
                    value.getSubscriptionRequest.content.agreements.personalInfo;
                formState.agreementsAccountingService =
                    value.getSubscriptionRequest.content.agreements.accountingService;
                formState.agreementsWithholdingService =
                    value.getSubscriptionRequest.content.agreements.withholdingService;

                formState.companyZipcode =
                    value.getSubscriptionRequest.content.company.zipcode;
                formState.companyRoadAddress =
                    value.getSubscriptionRequest.content.company.roadAddress;
                formState.companyJibunAddress =
                    value.getSubscriptionRequest.content.company.jibunAddress;

                formState.companyAddressExtend =
                    value.getSubscriptionRequest.content.company.addressExtend;
                formState.companyAddressDetailBcode =
                    value.getSubscriptionRequest.content.company.addressDetail.bcode;
                formState.companyAddressDetailBname =
                    value.getSubscriptionRequest.content.company.addressDetail.bname;
                formState.companyAddressDetailBuildingCode =
                    value.getSubscriptionRequest.content.company.addressDetail.buildingCode;
                formState.companyAddressDetailBuildingName =
                    value.getSubscriptionRequest.content.company.addressDetail.buildingName;
                formState.companyAddressDetailRoadname =
                    value.getSubscriptionRequest.content.company.addressDetail.roadname;
                formState.companyAddressDetailRoadnameCode =
                    value.getSubscriptionRequest.content.company.addressDetail.roadnameCode;
                formState.companyAddressDetailSido =
                    value.getSubscriptionRequest.content.company.addressDetail.sido;
                formState.companyAddressDetailSigungu =
                    value.getSubscriptionRequest.content.company.addressDetail.sigungu;
                formState.companyAddressDetailSigunguCode =
                    value.getSubscriptionRequest.content.company.addressDetail.sigunguCode;
                formState.companyAddressDetailZonecode =
                    value.getSubscriptionRequest.content.company.addressDetail.zonecode;

                formState.companyPhone =
                    value.getSubscriptionRequest.content.company.phone;
                formState.companyFax = value.getSubscriptionRequest.content.company.fax;
                formState.companyLicenseFileStorageId =
                    value.getSubscriptionRequest.content.company.licenseFileStorageId;
                formState.companyBizType =
                    value.getSubscriptionRequest.content.company.bizType;
                formState.companyResidentId =
                    value.getSubscriptionRequest.content.company.residentId;
                formState.companyLicense =
                    value.getSubscriptionRequest.content.company.license;

                formState.presidentContentName =
                    value.getSubscriptionRequest.content.president.name;
                formState.presidentBirthday =
                    value.getSubscriptionRequest.content.president.birthday;
                formState.presidentPhone =
                    value.getSubscriptionRequest.content.president.mobilePhone;
                formState.presidentEmail =
                    value.getSubscriptionRequest.content.president.email;

                formState.accountingfacilityBusinesses =
                    value.getSubscriptionRequest.content.accounting.facilityBusinesses;
                formState.accountingServiceTypes =
                    value.getSubscriptionRequest.content.accounting.accountingServiceTypes;
                formState.accountinglongTermCareInstitutionNumber =
                    value.getSubscriptionRequest.content.accounting.facilityBusinesses
                        .length > 0
                        ? value.getSubscriptionRequest.content.accounting
                            .facilityBusinesses[0].longTermCareInstitutionNumber
                        : "";

                formState.withholdingYearMonth =
                    value.getSubscriptionRequest.content.withholding.startYearMonth;
                formState.withholdingCapacity =
                    value.getSubscriptionRequest.content.withholding.capacity;
                formState.withholdingServiceTypes =
                    value.getSubscriptionRequest.content.withholding.withholdingServiceTypes;

                formState.cmsBankType =
                    value.getSubscriptionRequest.content.cmsBank.bankType;
                formState.accountNumber =
                    value.getSubscriptionRequest.content.cmsBank.accountNumber;
                formState.ownerName =
                    value.getSubscriptionRequest.content.cmsBank.ownerName;
                formState.ownerBizNumber =
                    value.getSubscriptionRequest.content.cmsBank.ownerBizNumber;
                formState.withdrawDay =
                    value.getSubscriptionRequest.content.cmsBank.withdrawDay;

                formState.extraSalesRepresentativeId =
                    value.getSubscriptionRequest.content.extra.salesRepresentativeId;
                formState.extraComment =
                    value.getSubscriptionRequest.content.extra.comment;

                formState.compactSalesRepresentativeID =
                    value.getSubscriptionRequest.compactSalesRepresentative.id;
                formState.compactSalesRepresentativeCode =
                    value.getSubscriptionRequest.compactSalesRepresentative.code;
                formState.compactSalesRepresentativeName =
                    value.getSubscriptionRequest.compactSalesRepresentative.name;
                formState.compactSalesRepresentativeActive =
                    value.getSubscriptionRequest.compactSalesRepresentative.active;

                formState.memo = value.getSubscriptionRequest.memo;
                formState.createdAt = value.getSubscriptionRequest.createdAt;
                formState.createdBy = value.getSubscriptionRequest.createdBy;
                formState.updatedBy = value.getSubscriptionRequest.updatedBy;
                formState.ip = value.getSubscriptionRequest.ip;
                formState.active = value.getSubscriptionRequest.active;

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
                    formState.status = record.value;
                },
            };
        };
        const funcAddress = (data: any) => {
            formState.companyZipcode = data.zonecode;
            formState.companyRoadAddress = data.roadAddress;
            formState.companyJibunAddress = data.jibunAddress;
            formState.companyAddressDetailBcode = data.bcode;
            formState.companyAddressDetailBname = data.bname;
            formState.companyAddressDetailBuildingCode = data.buildingCode;
            formState.companyAddressDetailBuildingName = data.buildingName;
            formState.companyAddressDetailRoadname = data.roadname;
            formState.companyAddressDetailRoadnameCode = data.roadnameCode;
            formState.companyAddressDetailSido = data.sido;
            formState.companyAddressDetailSigungu = data.sigungu;
            formState.companyAddressDetailSigunguCode = data.sigunguCode;
            formState.companyAddressDetailZonecode = data.zonecode;
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
            if (formState.accountingfacilityBusinesses) {
                customAccountingfacilityBusinesses =
                    formState.accountingfacilityBusinesses.map(
                        (facilityBusinesses: any) => ({
                            longTermCareInstitutionNumber:
                                formState.accountinglongTermCareInstitutionNumber,
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
            let contentData = {
                agreements: {
                    terms: formState.agreementsTerms,
                    personalInfo: formState.agreementsPersonalInfo,
                    accountingService: formState.agreementsAccountingService,
                    withholdingService: formState.agreementsWithholdingService,
                },

                company: {
                    name: formState.companyName,
                    zipcode: formState.companyZipcode,
                    roadAddress: formState.companyRoadAddress,
                    jibunAddress: formState.companyJibunAddress,
                    addressExtend: formState.companyAddressExtend,
                    addressDetail: {
                        bcode: formState.companyAddressDetailBcode,
                        bname: formState.companyAddressDetailBname,
                        buildingCode: formState.companyAddressDetailBuildingCode,
                        buildingName: formState.companyAddressDetailBuildingName,
                        roadname: formState.companyAddressDetailRoadname,
                        roadnameCode: formState.companyAddressDetailRoadnameCode,
                        sido: formState.companyAddressDetailSido,
                        sigungu: formState.companyAddressDetailSigungu,
                        sigunguCode: formState.companyAddressDetailSigunguCode,
                        zonecode: formState.companyAddressDetailZonecode,
                    },
                    phone: formState.companyPhone,
                    fax: formState.companyFax,
                    licenseFileStorageId: formState.companyLicenseFileStorageId,
                    bizNumber: formState.companyBizNumber,
                    bizType: formState.companyBizType,
                    residentId: formState.companyResidentId,
                },
                president: {
                    name: formState.presidentContentName,
                    birthday: formState.presidentBirthday,
                    mobilePhone: formState.presidentPhone,
                    email: formState.presidentEmail,
                },
                accounting: {
                    facilityBusinesses: customAccountingfacilityBusinesses,
                    accountingServiceTypes: formState.accountingServiceTypes,
                },
                withholding: {
                    startYearMonth: formState.withholdingYearMonth,
                    capacity: formState.withholdingCapacity,
                    withholdingServiceTypes: formState.withholdingServiceTypes,
                },
                cmsBank: {
                    bankType: formState.cmsBankType,
                    accountNumber: formState.accountNumber,
                    ownerBizNumber: formState.ownerBizNumber,
                    ownerName: formState.ownerName,
                    withdrawDay: formState.withdrawDay,
                },
                extra: {
                    salesRepresentativeId: formState.extraSalesRepresentativeId,
                    comment: formState.extraComment,
                },
            };

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
                id: formState.id,
                status: formState.status,
                memo: formState.memo,
                content: cleanData,
            };
            actionUpdate(variables);
        };

        // handle License File upload
        const getUrlLicenseFile = (img: any) => {
            formState.companyLicenseFileStorageId = img.id;
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
            formRef,
            visible,
            formState,
            layout,
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
        };
    },
});
</script> 

<style lang="scss" scoped>
@import "../style/popupStyle.scss";
</style>