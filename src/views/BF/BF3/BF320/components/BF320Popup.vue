<template>
    <div id="components-modal-demo-position">
        <a-modal :mask-closable="false" v-model:visible="visible" title="사업자관리 " width="1000px"
            @cancel="setModalVisible()">
            <template #footer>
                <a-button @click="setModalVisible">그냥 나가기</a-button>
                <a-button key="submit" type="primary" :loading="loading || loadingUpdate" @click="updateCompany">
                    저장하고 나가기</a-button>
            </template>
            <a-spin tip="Loading..." :spinning="loading">
                <a-collapse v-model:activeKey="activeKey" accordion>
                    <a-collapse-panel key="1" header="사업자정보">
                        <a-form :label-col="labelCol">
                            <a-row>
                                <a-col :span="18">
                                    <a-form-item label="상 호" class="clr">
                                        <a-input v-model:value="formState.extendInfoDetailName" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6"></a-col>

                                <a-col :span="8">
                                    <a-form-item label="사업자등록번호" class="clr">
                                        <a-input v-model:value="formState.bizNumber" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="16"></a-col>

                                <a-col :span="12">
                                    <a-form-item label="사업자유형" class="clr">
                                        <a-radio-group v-model:value="formState.bizType">
                                            <a-radio :value="1" class="clb">법인사업자</a-radio>
                                            <a-radio :value="2" class="clb">개인사업자</a-radio>
                                        </a-radio-group>
                                    </a-form-item>
                                </a-col>

                                <a-col :span="12">
                                    <a-form-item :label="changeTypeCompany(formState.bizType)">
                                        <a-input placeholder="800123-1234567" style="width: 300px"
                                            v-model:value="formState.presidentMobilePhone" />
                                    </a-form-item>
                                </a-col>
                                <a-form-item label="주소" class="custom-flex clr">
                                    <a-row :gutter="[0, 4]">
                                        <a-col :span="24">
                                            <a-row>
                                                <a-col :span="12">
                                                    <a-input style="width: 100%"
                                                        v-model:value="formState.extendInfoDetailZipcode" disabled />
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
                                            <a-row>
                                                <a-input v-model:value="formState.extendInfoDetailRoadAddress"
                                                    disabled />
                                            </a-row>
                                        </a-col>
                                        <a-col :span="24">
                                            <a-row>
                                                <a-input v-model:value="formState.extendInfoDetailAddressExtend" />
                                            </a-row>
                                        </a-col>
                                    </a-row>
                                </a-form-item>
                                <a-col :span="8">
                                    <a-form-item label="연락처" class="clr">
                                        <a-input v-model:value="formState.extendInfoDetailPhone" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="16"></a-col>

                                <a-col :span="8">
                                    <a-form-item label="팩 스">
                                        <a-input v-model:value="formState.extendInfoDetailFax" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="16"></a-col>
                                <imgUpload :title="titleModal" @update-img="getImgUrl" :marginTop="marginTopModal" />
                            </a-row>
                        </a-form>
                    </a-collapse-panel>
                    <a-collapse-panel key="2" header="대표자정보">
                        <a-form :label-col="labelCol" ref="formRef" name="custom-validation">
                            <a-form-item has-feedback label="대표자명" class="clr">
                                <a-input placeholder="홍길동" autocomplete="off" style="width: 200px"
                                    v-model:value="formState.extendInfoPresidentName" />
                            </a-form-item>
                            <a-form-item has-feedback label="생년월일" class="clr">
                                <a-input placeholder="19620820" autocomplete="off" style="width: 200px"
                                    v-model:value="formState.extendInfoPresidentBirthday" />
                            </a-form-item>
                            <a-form-item has-feedback label="휴대폰번호" class="clr">
                                <a-input-number placeholder="1098765432" style="width: 200px"
                                    v-model:value="formState.extendInfoPresidentMobilePhone" />
                            </a-form-item>
                            <a-form-item has-feedback label="이메일" class="clr">
                                <a-input placeholder="abc123@mailaddress.com" style="width: 400px"
                                    v-model:value="formState.extendInfoPresidentEmail" />
                            </a-form-item>
                        </a-form>
                    </a-collapse-panel>
                    <a-collapse-panel key="3" header="CMS (자동이체출금) 계좌 정보 입력">
                        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                            <a-form-item label="출금은행" class="clr">
                                <selectBank :selectValue="formState.extendInfoCmsBankBankType" width="150px" />
                            </a-form-item>
                            <a-form-item label="출금계좌번호" class="clr">
                                <a-input placeholder="100100056489011" style="width: 300px"
                                    v-model:value="formState.extendInfoCmsBankAccountNumber" />
                            </a-form-item>
                            <a-form-item label="예금주명" class="clr">
                                <a-input placeholder="주식회사 타운소프트비나" style="width: 300px"
                                    v-model:value="formState.extendInfoCmsBankOwnerName" />
                            </a-form-item>
                            <a-form-item label="사업자(주민)등록번호:" class="custom-flex clr">
                                <a-input style="width: 250px"
                                    v-model:value="formState.extendInfoCmsBankOwnerBizNumber" />
                                <div class="warring-bank">
                                    <InfoCircleFilled />
                                    <span class="pl-5">예금주의 사업자등록번호 또는 주민등록번호입니다.</span>
                                </div>
                            </a-form-item>
                            <a-form-item label="자동이체출금일자" class="clr custom-flex">
                                <a-radio-group v-model:value="formState.extendInfoCmsBankWithdrawDay"
                                    class="custom-lineHeight">
                                    <a-radio class="clb" :style="radioStyle" value="매월 5일" style="height: 22px;">매월 5일
                                    </a-radio>
                                    <a-radio class="clb" :style="radioStyle" value="매월 12일" style="height: 22px;">매월 12일
                                    </a-radio>
                                    <a-radio class="clb" :style="radioStyle" value="매월 19일" style="height: 22px;">매월 19일
                                    </a-radio>
                                </a-radio-group>
                            </a-form-item>
                        </a-form>
                    </a-collapse-panel>
                    <a-collapse-panel key="4" header="메모" class="modal-note">
                        <a-table bordered="false" :data-source="formStateMomes" :pagination="false">
                            <template #bodyCell="{ text, index }">
                                <div>
                                    <div class="title-note">
                                        <div>{{text.ownerName}} 수정 {{formarDate(text.updatedAt)}} 게시
                                            {{formarDate(text.createdAt)}}</div>
                                        <div v-if="index == 0">
                                            <PlusSquareOutlined :style="{ fontSize: '25px' }" @click="handleAdd" />
                                        </div>
                                    </div>
                                    <div>
                                        <a-textarea placeholder="전달사항입력" allow-clear v-model:value="text.memo" />
                                    </div>
                                    <a-space :size="8" style="margin-top: 7px">
                                        <save-outlined :style="{ fontSize: '20px' }"
                                            @click="handleAddMemo(text.memo,text.memoId)" />
                                        <DeleteOutlined :style="{ fontSize: '20px' }"
                                            @click="handleDeleteMemo(text.memoId)" />
                                    </a-space>
                                </div>
                            </template>
                        </a-table>
                    </a-collapse-panel>
                </a-collapse>
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
import postCode from "../../../../../components/postCode.vue";
import selectBank from "../../../../../components/selectBank.vue";

import { message } from "ant-design-vue";
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
        InfoCircleFilled,
        postCode,
        selectBank
    },
    data() {
        return {
            marginTopModal: "margin-top : -67px",
        };
    },
    setup(props, { emit }) {
        let visible = ref(false);
        const dataQuery = ref();
        const dataQueryMemos = ref();
        const dataQueryCheckPer = ref({});
        let trigger = ref<boolean>(false);
        let triggerCheckPer = ref<boolean>(false);

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

        watch(
            () => props.modalStatus,
            (newValue, old) => {
                if (newValue) {
                    visible.value = newValue;
                    dataQuery.value = { id: props.idRowEdit };
                    dataQueryMemos.value = { companyId: props.idRowEdit };
                    trigger.value = true;
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
            onError: onErrorMemo,
            onDone: onCreatedMemo
        } = useMutation(mutations.createCompanyManageMemo);

        onCreatedMemo((res) => {
            refetchMemo();
            message.success('Created memo successfully', 4);
        });

        // mutation update memo 
        const {
            mutate: actionUpdateMemo,
            onDone: onUpdatedMemo
        } = useMutation(mutations.updateCompanyManageMemo);

        onUpdatedMemo(() => {
            refetchMemo();
        });


        // mutation delete memo 
        const {
            mutate: actionDeleteMemo,
            onDone: onDeleteMemo
        } = useMutation(mutations.deleteCompanyManageMemo);

        onDeleteMemo(() => {
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
                formState.code = value.getCompany.code;
                formState.name = value.getCompany.name;
                formState.bizNumber = value.getCompany.bizNumber;
                formState.bizType = value.getCompany.bizType;
                formState.address = value.getCompany.address;
                formState.phone = value.getCompany.phone;
                formState.presidentName = value.getCompany.presidentName;
                formState.presidentMobilePhone = value.getCompany.presidentMobilePhone;

                formState.extendInfoDetailName = value.getCompany.extendInfo.detail.name;
                formState.extendInfoDetailZipcode = value.getCompany.extendInfo.detail.name;
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

        const updateCompany = () => {

            let extendInfoDetail = {
                name: formState.extendInfoDetailName,
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

        updateDone((res) => {
            message.success(`Update was successful`, 4);
            setModalVisible();
        });
        const formarDate = (date: any) => {
            return dayjs(date).format('YYYY/MM/DD')
        };

        const setModalVisible = () => {
            emit("closePopup", false);
        }
        return {
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
            updateCompany
        };
    },
    methods: {
        getImgUrl(img: any) {
        },
        setModalVisible() {
            this.$emit("closePopup", false);
        },
        setModalVisibleHis() {
            this.$emit("closePopupHis", false);
        },
        getColorTag(data: string) {
            if (data === "신청") {
                return "red";
            } else if (data === "심사중") {
                return "blue";
            } else if (data === "승인") {
                return "green";
            } else if (data === "반려") {
                return "grey";
            }
        },


    },
});
</script>
<style lang="scss" scoped>
#data-grid-demo {
    min-height: 700px;
}

.modal-note {
    max-height: 500px;
    overflow: auto;

    .title-note {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    th {
        display: none;
    }

    .ant-collapse-content-box {
        padding: 0px;
    }
}

.anticon {
    cursor: pointer;
}

.custom-action {
    text-align: center;
}

.ant-row {
    align-items: center;
}

.ant-form-item {
    margin-bottom: 4px;
}

.ant-collapse {
    .ant-collapse-item {
        .ant-collapse-header {
            padding: 7px;
        }
    }
}

.warring-modal {
    font-size: 12px;
    line-height: 0px;
}

.ant-form-item-label {
    text-align: left;
}

.clr {
    label {
        color: red;
    }
}

.clr-text {
    color: red;
}

.clb,
.clb-label label {
    color: black !important;
}

.dflex {
    display: flex;
}

.custom-flex {
    align-items: flex-start;
}

.warring-bank {
    display: flex;
    align-items: center;
}

.pl-5 {
    padding-left: 5px;
}

.custom-lineHeight {
    line-height: 3px;
}
</style> 
