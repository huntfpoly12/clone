<template>
    <div id="components-modal-demo-position">
        <a-modal :mask-closable="false" footer="" v-model:visible="visible" title="사업자관리 " width="1000px"
            @cancel="setModalVisible()">
            <a-spin tip="Loading..." :spinning="loading">
                <form action="your-action">
                    <a-collapse v-model:activeKey="activeKey" accordion>
                        <a-collapse-panel key="1" header="사업자정보">
                            <a-form :label-col="labelCol">
                                <a-row>
                                    <a-col :span="18">
                                        <a-form-item label="상 호" class="clr">
                                            <default-text-box v-model:valueInput="formState.name" :required="true">
                                            </default-text-box>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="6"></a-col>
                                    <a-col :span="8">
                                        <a-form-item label="사업자등록번호" class="clr">
                                            <default-text-box v-model:valueInput="formState.bizNumber" :required="true">
                                            </default-text-box>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="16"></a-col>
                                    <a-col :span="14">
                                        <a-form-item label="사업자유형" class="clr">
                                            <radio-group :arrayValue="arrRadioType" :disabled="true"
                                                v-model:valueRadioCheck="formState.bizType"
                                                :layoutCustom="'horizontal'" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="10">
                                        <a-form-item :label="changeTypeCompany(formState.bizType)">
                                            <id-number-text-box v-model:valueInput="formState.decryptedResidentId"
                                                :disabled="true" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="24">
                                        <a-form-item label="주소" class="custom-flex clr">
                                            <a-row>
                                                <a-col :span="17" style="display: flex; margin-bottom: 5px;">
                                                    <default-text-box style="width: 100%;"
                                                        v-model:valueInput="formState.extendInfoDetailZipcode"
                                                        autocomplete="off" :required="true" :disabled="true">
                                                    </default-text-box>
                                                    <post-code-button @dataAddress="funcAddress" />
                                                </a-col>
                                                <a-col :span="24" style="margin-bottom: 5px">
                                                    <a-row>
                                                        <a-col :span="12" style="padding-right: 5px;">
                                                            <default-text-box
                                                                v-model:valueInput="formState.extendInfoDetailRoadAddress"
                                                                autocomplete="off" width="100%" :required="true"
                                                                :disabled="true">
                                                            </default-text-box>
                                                        </a-col>
                                                        <a-col :span="12">
                                                            <default-text-box
                                                                v-model:valueInput="formState.extendInfoDetailAddressExtend"
                                                                autocomplete="off" width="100%">
                                                            </default-text-box>
                                                        </a-col>
                                                    </a-row>
                                                </a-col>
                                            </a-row>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-form-item label="연락처" class="clr">
                                            <default-text-box v-model:valueInput="formState.extendInfoDetailPhone"
                                                :required="true" placeholder="‘-’없이 숫자만 입력">
                                            </default-text-box>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="16"></a-col>
                                    <a-col :span="8">
                                        <a-form-item label="팩 스">
                                            <default-text-box v-model:valueInput="formState.extendInfoDetailFax"
                                                autocomplete="off" width="100%" placeholder="‘-’없이 숫자만 입력">
                                            </default-text-box>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="16"></a-col>
                                    <a-col :span="24">
                                        <div style="display: flex">
                                            <div>
                                                <imgUpload :title="titleModal" @update-img="getImgUrl"
                                                    style="margin-top: 10px" />
                                            </div>
                                            <div>
                                                <preview-image :dataImage="dataImg" @deleteImg="removeImg" />
                                            </div>
                                        </div>
                                    </a-col>
                                </a-row>
                            </a-form>
                        </a-collapse-panel>
                        <a-collapse-panel key="2" header="대표자정보">
                            <a-form :label-col="labelCol" ref="formRef" name="custom-validation">
                                <a-form-item has-feedback label="대표자명" class="clr">
                                    <default-text-box v-model:valueInput="formState.extendInfoPresidentName"
                                        style="width: 200px" autocomplete="off" required>
                                    </default-text-box>
                                </a-form-item>
                                <a-form-item has-feedback label="생년월일" class="clr">
                                    <date-time-box v-model:valueDate="formState.extendInfoPresidentBirthday"
                                        style="width: 200px" :required="true" dateFormat="YYYY-MM-DD">
                                    </date-time-box>
                                </a-form-item>
                                <a-form-item has-feedback label="휴대폰번호" class="clr">
                                    <tel-text-box width="200px"
                                        v-model:valueInput="formState.extendInfoPresidentMobilePhone"
                                        placeholder="‘-’없이 숫자만 입력" :required="true" />
                                </a-form-item>
                                <a-form-item has-feedback label="이메일" class="clr">
                                    <mail-text-box style="width: 400px"
                                        v-model:valueInput="formState.extendInfoPresidentEmail" :required="true">
                                    </mail-text-box>
                                </a-form-item>
                            </a-form>
                        </a-collapse-panel>
                        <a-collapse-panel key="3" header="CMS (자동이체출금) 계좌 정보 입력">
                            <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                                <a-form-item label="출금은행" class="clr">
                                    <bank-select-box v-model:valueInput="formState.extendInfoCmsBankBankType"
                                        width="250px" />
                                </a-form-item>
                                <a-form-item label="출금계좌번호" class="clr">
                                    <text-number-box text-number-box
                                        v-model:valueInput="formState.extendInfoCmsBankAccountNumber"
                                        placeholder="‘-’없이 숫자만 입력" width="250px" :required="true">
                                    </text-number-box>
                                </a-form-item>
                                <a-form-item label="예금주명" class="clr">
                                    <default-text-box width="250px"
                                        v-model:valueInput="formState.extendInfoCmsBankOwnerName" :required="true">
                                    </default-text-box>
                                </a-form-item>
                                <a-form-item label="사업자(주민)등록번호:" class="custom-flex clr">
                                    <default-text-box width="250px"
                                        v-model:valueInput="formState.extendInfoCmsBankOwnerBizNumber" :required="true">
                                    </default-text-box>
                                    <div class="warring-bank">
                                        <InfoCircleFilled />
                                        <span class="pl-5">예금주의 사업자등록번호 또는 주민등록번호입니다.</span>
                                    </div>
                                </a-form-item>
                                <a-form-item label="자동이체출금일자" class="clr custom-flex">
                                    <radio-group :arrayValue="arrayRadioWithdrawDay"
                                        v-model:valueRadioCheck="formState.extendInfoCmsBankWithdrawDay" />
                                </a-form-item>
                            </a-form>
                        </a-collapse-panel>
                        <a-collapse-panel key="4" header="메모" class="modal-note">
                            <a-table bordered="false" :data-source="formStateMomes" :pagination="false">
                                <template #bodyCell="{ text, index }">
                                    <div>
                                        <div class="title-note">
                                            <div>{{ text.ownerName }} 수정 {{ formarDate(text.updatedAt) }} 게시
                                                {{ formarDate(text.createdAt) }}</div>
                                            <div v-if="index == 0">
                                                <PlusSquareOutlined :style="{ fontSize: '25px' }" @click="handleAdd" />
                                            </div>
                                        </div>
                                        <div>
                                            <text-area-box placeholder="전달사항입력" allow-clear
                                                v-model:valueInput="text.memo">
                                            </text-area-box>
                                        </div>
                                        <a-space :size="8" style="margin-top: 7px">
                                            <save-outlined :style="{ fontSize: '20px' }"
                                                @click="handleAddMemo(text.memo, text.memoId)" />
                                            <DeleteOutlined :style="{ fontSize: '20px' }"
                                                @click="handleDeleteMemo(text.memoId)" />
                                        </a-space>
                                    </div>
                                </template>
                            </a-table>
                        </a-collapse-panel>
                    </a-collapse>
                    <div class="custom-footer-modal">
                        <button-basic :text="'저장하고 나가기'" :type="'info'" :mode="'contained'" @onClick="setModalVisible"
                            style="margin-right: 10px;" />
                        <button-basic :text="'저장하고 나가기'" :type="'default'" :mode="'contained'"
                            @onClick="updateCompany" />
                    </div>
                </form>
            </a-spin>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch } from "vue";
import DxDropDownBox from "devextreme-vue/drop-down-box";
import imgUpload from "../../../../../components/UploadImage.vue";
import queries from "../../../../../graphql/queries/BF/BF3/BF320/index";
import mutations from "../../../../../graphql/mutations/BF/BF3/BF320/index";
import notification from '../../../../../utils/notification';
import dayjs, { Dayjs } from 'dayjs';
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday);
dayjs.extend(localeData);
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
} from "devextreme-vue/data-grid";
import {
    UploadOutlined,
    MinusCircleOutlined,
    ZoomInOutlined,
    SaveOutlined,
    DeleteOutlined,
    PlusSquareOutlined,
    WarningFilled,
    InfoCircleFilled
} from "@ant-design/icons-vue";
import type { UploadProps } from "ant-design-vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
export default defineComponent({
    props: {
        modalStatus: {
            default: false,
            type: Boolean,
        },
        modalStatusHistory: Boolean,
        idRowEdit: Number
    },
    components: {
        DxDropDownBox,
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxSelection,
        UploadOutlined,
        MinusCircleOutlined,
        ZoomInOutlined,
        SaveOutlined,
        DeleteOutlined,
        PlusSquareOutlined,
        WarningFilled,
        imgUpload,
        InfoCircleFilled
    },
    setup(props, { emit }) {
        const arrRadioType = reactive([
            { id: 1, text: '법인사업자' },
            { id: 2, text: '개인사업자' }
        ]) 
        const arrayRadioWithdrawDay = reactive([
            { id: '매월 5일', text: '매월 5일' },
            { id: '매월 12일', text: '매월 12일' },
            { id: '매월 19일', text: '매월 19일' },
        ])
        let visible = ref(false);
        const dataQuery = ref();
        const dataQueryMemos = ref();
        let trigger = ref<boolean>(false);
        const imageValue = ref("");
        const fileName = ref("");
        const previewTitle = ref("");
        const fileList = ref<UploadProps["fileList"]>([]);
        const activeKey = ref([1]);
        const formState = reactive({
            id: 0,
            code: "",
            name: "",
            bizNumber: "",
            bizType: 1,
            address: "",
            phone: "",
            decryptedResidentId: '',
            presidentName: "",
            presidentMobilePhone: "",
            extendInfoDetailName: "",
            extendInfoDetailZipcode: "",
            extendInfoDetailRoadAddress: "",
            extendInfoDetailJibunAddress: "",
            extendInfoDetailAddressExtend: "",
            extendInfoDetailAddressDetailBcode: "",
            extendInfoDetailAddressDetailBname: "",
            extendInfoDetailAddressDetailBuildingCode: "",
            extendInfoDetailAddressDetailBuildingName: "",
            extendInfoDetailAddressDetailRoadname: "",
            extendInfoDetailAddressDetailRoadnameCode: "",
            extendInfoDetailAddressDetailSido: "",
            extendInfoDetailAddressDetailSigungu: "",
            extendInfoDetailAddressDetailSigunguCode: "",
            extendInfoDetailAddressDetailZonecode: "",
            extendInfoDetailPhone: "",
            extendInfoDetailFax: "",
            extendInfoDetailLicenseFileStorageId: "",
            extendInfoPresidentName: "",
            extendInfoPresidentBirthday: "",
            extendInfoPresidentMobilePhone: "",
            extendInfoPresidentEmail: "",
            extendInfoCmsBankBankType: "",
            extendInfoCmsBankAccountNumber: "",
            extendInfoCmsBankOwnerBizNumber: "",
            extendInfoCmsBankOwnerName: "",
            extendInfoCmsBankWithdrawDay: "",
            sealFileStorageId: null,
            createdAt: 0,
            createdBy: "",
            updatedAt: 0,
            updatedBy: "",
            ip: "",
            active: true,
            seal: null,
            canceledAt: null,
            unpaidMonths: 0
        }); 
        let dataImg = ref()
        const formStateMomes = ref([
            {
                memoId: null,
                ownerUserId: 0,
                ownerName: "",
                ownerUsername: "",
                memo: "",
                createdAt: dayjs(new Date()).format('YYYY/MM/DD'),
                createdBy: "",
                updatedAt: dayjs(new Date()).format('YYYY/MM/DD'),
                updatedBy: "",
                ip: "",
                active: "",
            }
        ]);
        const labelCol = ref({ style: { width: "150px" } });
        const wrapperCol = ref({ span: 14 });
        const radioStyle = ref({
            display: "flex",
            height: "30px",
            lineHeight: "30px",
        });
        const titleModal = "사업자등록증";
        const removeImg = () => {
            dataImg.value = ''
            formState.extendInfoDetailLicenseFileStorageId = ''
        };
        watch(
            () => props.modalStatus,
            (newValue, old) => {
                trigger.value = true;
                if (newValue) {
                    visible.value = newValue;
                    dataQuery.value = { id: props.idRowEdit };
                    dataQueryMemos.value = { companyId: props.idRowEdit };
                    refetchMemo();
                    refetch();
                } else {
                    formStateMomes.value = [{
                        memoId: null,
                        ownerUserId: 0,
                        ownerName: "",
                        ownerUsername: "",
                        memo: "",
                        createdAt: dayjs(new Date()).format('YYYY/MM/DD'),
                        createdBy: "",
                        updatedAt: dayjs(new Date()).format('YYYY/MM/DD'),
                        updatedBy: "",
                        ip: "",
                        active: "",
                    }];
                    visible.value = newValue;
                    trigger.value = false;
                }
            }
        );
        // get company
        const { result, loading, refetch } = useQuery(
            queries.getCompany,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
        // get list memo of company
        const { result: resultMemo, refetch: refetchMemo } = useQuery(
            queries.getCompanyManageMemos,
            dataQueryMemos,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultMemo, (value) => {
            if (value && value.getCompanyManageMemos.length > 0) {
                formStateMomes.value = value.getCompanyManageMemos;
            }
        });
        // mutation create memo 
        const {
            mutate: actionCreateMemo,
            onError: creactMemoErr,
            onDone: onCreatedMemo
        } = useMutation(mutations.createCompanyManageMemo);
        onCreatedMemo((res) => {
            notification('success', "메모 추가 완료!")
            refetchMemo();
        });
        creactMemoErr((res) => {
            notification('error', res.message)
            refetchMemo();
        });
        // mutation update memo 
        const {
            mutate: actionUpdateMemo,
            onDone: onUpdatedMemo,
            onError: updateMemoErr
        } = useMutation(mutations.updateCompanyManageMemo);
        onUpdatedMemo(() => {
            notification('success', "메모 추가 완료!")
            refetchMemo();
        });
        updateMemoErr((e) => {
            notification('error', e.message)
            refetchMemo();
        });
        // mutation delete memo 
        const {
            mutate: actionDeleteMemo,
            onDone: onDeleteMemo,
            onError: deleteMemoErr
        } = useMutation(mutations.deleteCompanyManageMemo);
        onDeleteMemo(() => {
            notification('success', "메모 추가 완료!")
            refetchMemo();
        });
        deleteMemoErr((e) => {
            notification('error', e.message)
            refetchMemo();
        });
        const handleDeleteMemo = (key: number) => {
            if (formStateMomes.value.length > 1) {
                actionDeleteMemo({ companyId: formState.id, memoId: key })
            }
        }
        const handleAdd = () => {
            const newMemo: any = {
                memoId: null,
                ownerUserId: 0,
                ownerName: "",
                ownerUsername: "",
                memo: "",
                createdAt: dayjs(new Date()).format('YYYY/MM/DD'),
                createdBy: "",
                updatedAt: dayjs(new Date()).format('YYYY/MM/DD'),
                updatedBy: "",
                ip: "",
                active: "",
            };
            formStateMomes.value.unshift(newMemo);
        }
        const handleAddMemo = (note: any, mmId: any = null) => {
            if (note !== '' && mmId == null) {
                actionCreateMemo({ companyId: formState.id, memo: note });
            } else {
                actionUpdateMemo({ companyId: formState.id, memo: note, memoId: mmId });
            }
        }
        watch(result, (value) => {
            if (value && value.getCompany) {
                formState.id = value.getCompany.id;
                formState.decryptedResidentId = value.getCompany.decryptedResidentId;
                formState.code = value.getCompany.code;
                formState.name = value.getCompany.name;
                formState.bizNumber = value.getCompany.bizNumber;
                formState.bizType = value.getCompany.bizType;
                formState.address = value.getCompany.address;
                formState.phone = value.getCompany.phone;
                formState.presidentName = value.getCompany.presidentName;
                formState.presidentMobilePhone = value.getCompany.presidentMobilePhone;
                formState.extendInfoDetailName = value.getCompany.name;
                formState.extendInfoDetailZipcode = value.getCompany.extendInfo.detail.zipcode;
                formState.extendInfoDetailRoadAddress = value.getCompany.extendInfo.detail.roadAddress;
                formState.extendInfoDetailJibunAddress = value.getCompany.extendInfo.detail.jibunAddress;
                formState.extendInfoDetailAddressExtend = value.getCompany.extendInfo.detail.addressExtend;
                formState.extendInfoDetailAddressDetailBcode = value.getCompany.extendInfo.detail.addressDetail.bcode;
                formState.extendInfoDetailAddressDetailBname = value.getCompany.extendInfo.detail.addressDetail.bname;
                formState.extendInfoDetailAddressDetailBuildingCode = value.getCompany.extendInfo.detail.addressDetail.buildingCode;
                formState.extendInfoDetailAddressDetailBuildingName = value.getCompany.extendInfo.detail.addressDetail.buildingName;
                formState.extendInfoDetailAddressDetailRoadname = value.getCompany.extendInfo.detail.addressDetail.roadname;
                formState.extendInfoDetailAddressDetailRoadnameCode = value.getCompany.extendInfo.detail.addressDetail.roadnameCode;
                formState.extendInfoDetailAddressDetailSido = value.getCompany.extendInfo.detail.addressDetail.sido;
                formState.extendInfoDetailAddressDetailSigungu = value.getCompany.extendInfo.detail.addressDetail.sigungu;
                formState.extendInfoDetailAddressDetailSigunguCode = value.getCompany.extendInfo.detail.addressDetail.sigunguCode;
                formState.extendInfoDetailAddressDetailZonecode = value.getCompany.extendInfo.detail.addressDetail.zonecode;
                formState.extendInfoDetailPhone = value.getCompany.extendInfo.detail.phone;
                formState.extendInfoDetailFax = value.getCompany.extendInfo.detail.fax;
                formState.extendInfoDetailLicenseFileStorageId = value.getCompany.extendInfo.detail.licenseFileStorageId;
                dataImg.value = {
                    name: value.getCompany.extendInfo.detail.license.name,
                    url: value.getCompany.extendInfo.detail.license.url,
                }
                formState.extendInfoPresidentName = value.getCompany.extendInfo.president.name;
                formState.extendInfoPresidentBirthday = value.getCompany.extendInfo.president.birthday;
                formState.extendInfoPresidentMobilePhone = value.getCompany.extendInfo.president.mobilePhone;
                formState.extendInfoPresidentEmail = value.getCompany.extendInfo.president.email;
                formState.extendInfoCmsBankBankType = value.getCompany.extendInfo.cmsBank.bankType;
                formState.extendInfoCmsBankAccountNumber = value.getCompany.extendInfo.cmsBank.accountNumber;
                formState.extendInfoCmsBankOwnerBizNumber = value.getCompany.extendInfo.cmsBank.ownerBizNumber;
                formState.extendInfoCmsBankOwnerName = value.getCompany.extendInfo.cmsBank.ownerName;
                formState.extendInfoCmsBankWithdrawDay = value.getCompany.extendInfo.cmsBank.withdrawDay;
                formState.sealFileStorageId = value.getCompany.sealFileStorageId;
                formState.createdAt = value.getCompany.createdAt;
                formState.createdBy = value.getCompany.createdBy;
                formState.updatedAt = value.getCompany.updatedAt;
                formState.updatedBy = value.getCompany.updatedBy;
                formState.ip = value.getCompany.ip;
                formState.active = value.getCompany.active;
                formState.seal = value.getCompany.seal;
                formState.canceledAt = value.getCompany.canceledAt;
                formState.unpaidMonths = value.getCompany.unpaidMonths;
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
            formState.extendInfoDetailZipcode = data.zonecode;
            formState.extendInfoDetailRoadAddress = data.roadAddress;
            formState.extendInfoDetailJibunAddress = data.jibunAddress;
            formState.extendInfoDetailAddressDetailBcode = data.bcode;
            formState.extendInfoDetailAddressDetailBname = data.bname;
            formState.extendInfoDetailAddressDetailBuildingCode = data.buildingCode;
            formState.extendInfoDetailAddressDetailBuildingName = data.buildingName;
            formState.extendInfoDetailAddressDetailRoadname = data.roadname;
            formState.extendInfoDetailAddressDetailRoadnameCode = data.roadnameCode;
            formState.extendInfoDetailAddressDetailSido = data.sido;
            formState.extendInfoDetailAddressDetailSigungu = data.sigungu;
            formState.extendInfoDetailAddressDetailSigunguCode = data.sigunguCode;
            formState.extendInfoDetailAddressDetailZonecode = data.zonecode;
        };
        // Update Company 
        const {
            mutate: actionUpdate,
            loading: loadingUpdate,
            onDone: updateDone,
        } = useMutation(mutations.updateCompany);
        const updateCompany = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                notification('error', "필수 항목 다 입력해주세요")
                res.brokenRules[0].validator.focus();
            }
            else {
                let extendInfoDetail = {
                    name: formState.name,
                    zipcode: formState.extendInfoDetailZipcode,
                    roadAddress: formState.extendInfoDetailRoadAddress,
                    jibunAddress: formState.extendInfoDetailJibunAddress,
                    addressExtend: formState.extendInfoDetailAddressExtend,
                    addressDetail: {
                        bcode: formState.extendInfoDetailAddressDetailBcode,
                        bname: formState.extendInfoDetailAddressDetailBname,
                        buildingCode: formState.extendInfoDetailAddressDetailBuildingCode,
                        buildingName: formState.extendInfoDetailAddressDetailBuildingName,
                        roadname: formState.extendInfoDetailAddressDetailRoadname,
                        roadnameCode: formState.extendInfoDetailAddressDetailRoadnameCode,
                        sido: formState.extendInfoDetailAddressDetailSido,
                        sigungu: formState.extendInfoDetailAddressDetailSigungu,
                        sigunguCode: formState.extendInfoDetailAddressDetailSigunguCode,
                        zonecode: formState.extendInfoDetailAddressDetailZonecode
                    },
                    phone: formState.extendInfoDetailPhone,
                    fax: formState.extendInfoDetailFax,
                    licenseFileStorageId: formState.extendInfoDetailLicenseFileStorageId
                };
                let extendInfoPresident = {
                    name: formState.extendInfoPresidentName,
                    birthday: formState.extendInfoPresidentBirthday,
                    mobilePhone: formState.extendInfoPresidentMobilePhone,
                    email: formState.extendInfoPresidentEmail
                };
                let extendInfoCmsBank = {
                    bankType: formState.extendInfoCmsBankBankType,
                    accountNumber: formState.extendInfoCmsBankAccountNumber,
                    ownerBizNumber: formState.extendInfoCmsBankOwnerBizNumber,
                    ownerName: formState.extendInfoCmsBankOwnerName,
                    withdrawDay: formState.extendInfoCmsBankWithdrawDay
                };
                let variables = {
                    id: formState.id,
                    detail: extendInfoDetail,
                    president: extendInfoPresident,
                    cmsBank: extendInfoCmsBank,
                };
                actionUpdate(variables);
            }
        }
        updateDone((res) => {
            notification('success', "업데이트 완료!")
            setModalVisible();
        });
        const formarDate = (date: any) => {
            return dayjs(date).format('YYYY/MM/DD')
        };
        const setModalVisible = () => {
            emit("closePopup", false);
        }
        const getImgUrl = (img: any) => {
            let resImg = {
                ...img,
                name: img.fileName
            }
            dataImg.value = resImg
            formState.extendInfoDetailLicenseFileStorageId = resImg.id
        }
        return {
            arrayRadioWithdrawDay,
            removeImg,
            setModalVisible,
            fileList,
            loading,
            previewTitle,
            activeKey,
            formState,
            labelCol,
            wrapperCol,
            radioStyle,
            titleModal,
            visible,
            changeTypeCompany,
            funcAddress,
            formStateMomes,
            formarDate,
            handleAdd,
            handleDeleteMemo,
            handleAddMemo,
            loadingUpdate,
            updateCompany,
            fileName,
            imageValue,
            dataImg,
            getImgUrl,
            arrRadioType
        };
    },
});
</script>
<style lang="scss" scoped src="../style/popup/index.scss">
</style> 
