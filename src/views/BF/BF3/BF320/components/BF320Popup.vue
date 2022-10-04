<template>
    <div id="components-modal-demo-position">

        <a-modal :mask-closable="false" v-model:visible="visible" title="사업자관리 " okText="저장하고 나가기" cancelText="그냥 나가기"
            width="1000px" @cancel="setModalVisible()">
            <a-spin tip="Loading..." :spinning="loading">
                <a-collapse v-model:activeKey="activeKey" accordion>
                    <a-collapse-panel key="1" header="사업자정보">
                        <a-form :label-col="labelCol">
                            <a-row>
                                <a-col :span="18">
                                    <a-form-item label="상 호" class="clr">
                                        <a-input v-model:value="formState.name" />
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
                                                        v-model:value="formState.extendInfo.detail.zipcode" disabled />
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
                                                <a-input v-model:value="formState.extendInfo.detail.roadAddress"
                                                    disabled />
                                            </a-row>
                                        </a-col>
                                        <a-col :span="24">
                                            <a-row>
                                                <a-input v-model:value="formState.extendInfo.detail.addressExtend" />
                                            </a-row>
                                        </a-col>
                                    </a-row>
                                </a-form-item>
                                <a-col :span="8">
                                    <a-form-item label="연락처" class="clr">
                                        <a-input v-model:value="formState.extendInfo.detail.phone" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="16"></a-col>

                                <a-col :span="8">
                                    <a-form-item label="팩 스">
                                        <a-input v-model:value="formState.extendInfo.detail.fax" />
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
                                    v-model:value="formState.extendInfo.president.name" />
                            </a-form-item>
                            <a-form-item has-feedback label="생년월일" class="clr">
                                <a-input placeholder="19620820" autocomplete="off" style="width: 200px"
                                    v-model:value="formState.extendInfo.president.birthday" />
                            </a-form-item>
                            <a-form-item has-feedback label="휴대폰번호" class="clr">
                                <a-input-number placeholder="1098765432" style="width: 200px"
                                    v-model:value="formState.extendInfo.president.mobilePhone" />
                            </a-form-item>
                            <a-form-item has-feedback label="이메일" class="clr">
                                <a-input placeholder="abc123@mailaddress.com" style="width: 400px"
                                    v-model:value="formState.extendInfo.president.email" />
                            </a-form-item>
                        </a-form>
                    </a-collapse-panel>
                    <a-collapse-panel key="3" header="CMS (자동이체출금) 계좌 정보 입력">
                        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                            <a-form-item label="출금은행" class="clr">
                                <selectBank :selectValue="formState.extendInfo.cmsBank.bankType" width="150px" />
                            </a-form-item>
                            <a-form-item label="출금계좌번호" class="clr">
                                <a-input placeholder="100100056489011" style="width: 300px"
                                    v-model:value="formState.extendInfo.cmsBank.accountNumber" />
                            </a-form-item>
                            <a-form-item label="예금주명" class="clr">
                                <a-input placeholder="주식회사 타운소프트비나" style="width: 300px"
                                    v-model:value="formState.extendInfo.cmsBank.ownerName" />
                            </a-form-item>
                            <a-form-item label="사업자(주민)등록번호:" class="custom-flex clr">
                                <a-input style="width: 250px"
                                    v-model:value="formState.extendInfo.cmsBank.ownerBizNumber" />
                                <div class="warring-bank">
                                    <InfoCircleFilled />
                                    <span class="pl-5">예금주의 사업자등록번호 또는 주민등록번호입니다.</span>
                                </div>
                            </a-form-item>
                            <a-form-item label="자동이체출금일자" class="clr custom-flex">
                                <a-radio-group v-model:value="formState.extendInfo.cmsBank.withdrawDay"
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

        <a-modal :mask-closable="false" :visible="modalStatusHistory" footer="" @cancel="setModalVisibleHis()"
            width="1000px">
            <div style="margin-top: 20px">
                <DxDataGrid :data-source="dataTableShow" :show-borders="true" key-expr="key">
                    <DxColumn data-field="기록일시" />
                    <DxColumn data-field="비고" />
                    <DxColumn data-field="생성일시" />
                    <DxColumn data-field="생성자ID" />
                    <DxColumn data-field="삭제여부" />
                    <DxColumn data-field="IP주소" />
                    <DxColumn data-field="상세" cell-template="detail" />
                    <template #detail="{}">
                        <a-space :size="8">
                            <zoom-in-outlined :style="{ fontSize: '15px' }" />
                        </a-space>
                    </template>
                </DxDataGrid>
            </div>
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
            은행선택: "은행선택"
        };
    },
    setup(props) {
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
            extendInfo: {
                detail: {
                    name: "",
                    zipcode: "",
                    roadAddress: "",
                    jibunAddress: "",
                    addressExtend: "",
                    addressDetail: {
                        bcode: "",
                        bname: "",
                        buildingCode: "",
                        buildingName: "",
                        roadname: "",
                        roadnameCode: "",
                        sido: "",
                        sigungu: "",
                        sigunguCode: "",
                        zonecode: ""
                    },
                    phone: "",
                    fax: "",
                    licenseFileStorageId: 10
                },
                president: {
                    name: "",
                    birthday: "",
                    mobilePhone: "",
                    email: ""
                },
                cmsBank: {
                    bankType: "39",
                    accountNumber: "",
                    ownerBizNumber: "",
                    ownerName: "",
                    withdrawDay: "매월 5일"
                }
            },
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
        const formStateMomes = ref([]);
        const labelCol = ref({ style: { width: "150px" } });
        const wrapperCol = ref({ span: 14 });
        const radioStyle = ref({
            display: "flex",
            height: "30px",
            lineHeight: "30px",
        });
        const value = ref<number>(1);
        const dataTableShow = ref([
            {
                key: 0,
                기록일시: "2022-09-05 13:52:09",
                비고: "승인>사업자등록번호 등록",
                생성일시: "2022-09-05 13:52:09",
                생성자ID: "@mdo",
                삭제여부: "1",
                IP주소: "123.451.342.1",
            },
        ]);
        const keyNumber = ref(0);
        const titleModal = "사업자등록증";

        watch(
            () => props.modalStatus,
            (newValue, old) => {
                if (newValue) {
                    visible.value = newValue;
                    dataQuery.value = { id: 1 };
                    dataQueryMemos.value = { companyId: 1 };
                    trigger.value = true;
                    refetchMemo();
                    refetch();
                } else {
                    visible.value = newValue;
                    trigger.value = false;
                }
            }
        );

        //get detail company
        const { result: resultMemo, refetch: refetchMemo } = useQuery(
            queries.getCompanyManageMemos,
            dataQueryMemos,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultMemo, (value) => {
            if (value && value.getCompanyManageMemos) {
                formStateMomes.value = value.getCompanyManageMemos;
            }
        });

        // get list memo of company
        const { result, loading, error, refetch } = useQuery(
            queries.getCompany,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );

        // mutation create memo 
        const {
            mutate: actionCreateMemo,
            onDone: onCreatedMemo
        } = useMutation(mutations.createCompanyManageMemo);

        onCreatedMemo(() => {
            refetchMemo();
        });

        // mutation create memo 
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
            formStateMomes.value.unshift({});
        }

        const handleAddMemo = (note: any, mmId: any = null) => {

            if (note !== '' && mmId == null) {
                console.log(note,mmId,'tao comment');
                actionCreateMemo({ companyId: formState.id, memo: note });
            } else {
                console.log(note,mmId,'updated comment');
                actionUpdateMemo({ companyId: formState.id, memo: note,memoId: mmId });
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

                formState.extendInfo.detail.name = value.getCompany.extendInfo.detail.name;
                formState.extendInfo.detail.zipcode = value.getCompany.extendInfo.detail.name;
                formState.extendInfo.detail.roadAddress = value.getCompany.extendInfo.detail.roadAddress;
                formState.extendInfo.detail.jibunAddress = value.getCompany.extendInfo.detail.jibunAddress;
                formState.extendInfo.detail.addressExtend = value.getCompany.extendInfo.detail.addressExtend;

                formState.extendInfo.detail.addressDetail.bcode = value.getCompany.extendInfo.detail.addressDetail.bcode;
                formState.extendInfo.detail.addressDetail.bname = value.getCompany.extendInfo.detail.addressDetail.bname;
                formState.extendInfo.detail.addressDetail.buildingCode = value.getCompany.extendInfo.detail.addressDetail.buildingCode;
                formState.extendInfo.detail.addressDetail.buildingName = value.getCompany.extendInfo.detail.addressDetail.buildingName;
                formState.extendInfo.detail.addressDetail.roadname = value.getCompany.extendInfo.detail.addressDetail.roadname;
                formState.extendInfo.detail.addressDetail.roadnameCode = value.getCompany.extendInfo.detail.addressDetail.roadnameCode;
                formState.extendInfo.detail.addressDetail.sido = value.getCompany.extendInfo.detail.addressDetail.sido;
                formState.extendInfo.detail.addressDetail.sigungu = value.getCompany.extendInfo.detail.addressDetail.sigungu;
                formState.extendInfo.detail.addressDetail.sigunguCode = value.getCompany.extendInfo.detail.addressDetail.sigunguCode;
                formState.extendInfo.detail.addressDetail.zonecode = value.getCompany.extendInfo.detail.addressDetail.zonecode;

                formState.extendInfo.detail.phone = value.getCompany.extendInfo.detail.phone;
                formState.extendInfo.detail.fax = value.getCompany.extendInfo.detail.fax;
                formState.extendInfo.detail.licenseFileStorageId = value.getCompany.extendInfo.detail.licenseFileStorageId;

                formState.extendInfo.president.name = value.getCompany.extendInfo.president.name;
                formState.extendInfo.president.birthday = value.getCompany.extendInfo.president.birthday;
                formState.extendInfo.president.mobilePhone = value.getCompany.extendInfo.president.mobilePhone;
                formState.extendInfo.president.email = value.getCompany.extendInfo.president.email;

                formState.extendInfo.cmsBank.bankType = value.getCompany.extendInfo.cmsBank.bankType;
                formState.extendInfo.cmsBank.accountNumber = value.getCompany.extendInfo.cmsBank.accountNumber;
                formState.extendInfo.cmsBank.ownerBizNumber = value.getCompany.extendInfo.cmsBank.ownerBizNumber;
                formState.extendInfo.cmsBank.ownerName = value.getCompany.extendInfo.cmsBank.ownerName;
                formState.extendInfo.cmsBank.withdrawDay = value.getCompany.extendInfo.cmsBank.withdrawDay;

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
            formState.extendInfo.detail.zipcode = data.zonecode;
            formState.extendInfo.detail.roadAddress = data.roadAddress;
            formState.extendInfo.detail.jibunAddress = data.jibunAddress;
            formState.extendInfo.detail.addressDetail.bcode = data.bcode;
            formState.extendInfo.detail.addressDetail.bname = data.bname;
            formState.extendInfo.detail.addressDetail.buildingCode = data.buildingCode;
            formState.extendInfo.detail.addressDetail.buildingName = data.buildingName;
            formState.extendInfo.detail.addressDetail.roadname = data.roadname;
            formState.extendInfo.detail.addressDetail.roadnameCode = data.roadnameCode;
            formState.extendInfo.detail.addressDetail.sido = data.sido;
            formState.extendInfo.detail.addressDetail.sigungu = data.sigungu;
            formState.extendInfo.detail.addressDetail.sigunguCode = data.sigunguCode;
            formState.extendInfo.detail.addressDetail.zonecode = data.zonecode;
        };

        const formarDate = (date: any) => {
            return dayjs(date).format('YYYY/MM/DD')
        };

        return {
            fileList,
            loading,
            previewTitle,
            activeKey,
            formState,
            labelCol,
            wrapperCol,
            radioStyle,
            value,
            dataTableShow,
            keyNumber,
            titleModal,
            visible,
            changeTypeCompany,
            funcAddress,
            formStateMomes,
            formarDate,
            handleAdd,
            handleDeleteMemo,
            handleAddMemo
        };
    },
    methods: {
        getImgUrl(img: any) {
            // console.log("imgUrl", img);
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
