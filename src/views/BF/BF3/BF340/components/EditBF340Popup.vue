<template>
    <div ref="root">
        <a-modal :visible="modalStatus" title="영업자관리[bf-340 –pop]" centered okText="저장하고 나가기" cancelText="그냥 나가기"
            @cancel="setModalVisible()" :mask-closable="false" :width="1028">
            <a-form :model="formState" v-bind="layout" label-align="right" name="nest-messages"
                :validate-messages="validateMessages" @finish="onFinish">
                <a-row :gutter="24">
                    <a-col :span="9" :md="13" :lg="10">
                        <a-form-item label="영업자코드">
                            <a-input v-model:value="formState.code" style="width: 200px" />
                        </a-form-item>
                        <a-form-item label="영업자명">
                            <a-input v-model:value="formState.detailName" style="width: 200px" />
                        </a-form-item>
                        <a-form-item label="사업자유형" class="label-br">
                            <a-select ref="select" v-model:value="formState.detailBizType" style="width: 200px">
                                <a-select-option :value="1">법인사업자</a-select-option>
                                <a-select-option :value="2">개인사업자</a-select-option>
                            </a-select>
                        </a-form-item>

                        <a-form-item label="이메일" :name="['이메일']" :rules="[{ type: 'email' }]">
                            <a-input v-model:value="formState.detailEmail" style="width: 250px" />
                        </a-form-item>
                        <a-form-item label="연락처">
                            <a-input v-model:value="formState.detailPhone" style="width: 200px" />
                        </a-form-item>
                        <a-form-item label="팩스">
                            <a-input v-model:value="formState.detailFax" style="width: 200px" />
                        </a-form-item>
                        <a-form-item label="주소">
                            <a-row>
                                <a-col :span="12">
                                    <a-input style="width: 100%" v-model:value="formState.detailZipcode" disabled />
                                </a-col>
                                <a-col :span="12">
                                    <div style="margin-left: 5px">
                                        <a-button type="primary" ghost>
                                            <postCode @dataAddress="funcAddress" />
                                        </a-button>
                                    </div>
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :span="15" :md="11" :lg="14">
                        <a-form-item label="상태">
                            <a-select style="width: 100px" v-model:value="formState.status" option-label-prop="children"
                                @select="confirmPopup">
                                <a-select-option :value="1" label="정상">
                                    <a-tag :color="getColorTag('정상')">정상</a-tag>
                                </a-select-option>
                                <a-select-option :value="2" label="해지">
                                    <a-tag :color="getColorTag('해지')">해지</a-tag>
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="등급">
                            <a-select ref="select" v-model:value="formState.detailGrade" style="width: 100px">
                                <a-select-option :value="0">본사</a-select-option>
                                <a-select-option :value="1">지사</a-select-option>
                                <a-select-option :value="2">대리점</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="법인(주민)등록번호" :wrapper-col="{ span: 14 }" class="label-br">
                            <a-input v-model:value="formState.detailResidentId" />
                        </a-form-item>
                        <a-form-item label="사업자등록번호" class="label-br">
                            <a-input v-model:value="formState.detailBizNumber" />
                        </a-form-item>
                        <a-form-item label="휴대폰">
                            <a-input v-model:value="formState.detailMobilePhone" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="15" :md="13" :lg="12">
                        <a-form-item class="result-address" :wrapper-col="{ span: 24 }">
                            <a-input v-model:value="formState.detailRoadAddress" style="width: 100%" :disabled="true" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8" :md="13" :lg="11">
                        <a-form-item :wrapper-col="{ span: 24}" class="detail-address">
                            <a-input v-model:value="formState.detailAddressExtend" placeholder="상세주소" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="세금계산서발행여부" :label-col="{ span: 8 }" class="label-br">
                            <a-switch v-model:checked="formState.detailTaxInvoice" checked-children="발행"
                                un-checked-children="미발행" style="width: 80px" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-row>
                            <a-col :span="6" :md="6" :lg="5">
                                <label class="lable-item"> 전자세금계산서<br>수신이메일 : </label>
                            </a-col>
                            <a-col :span="16" :md="16" :lg="17">
                                <a-form-item class="email-input" :wrapper-col="{ span: 24 }"
                                    :name="['detailEmailTaxInvoice']" :rules="[{ type: 'email' }]">
                                    <a-input v-model:value="formState.detailEmailTaxInvoice" placeholder=""
                                        style="width: 100%" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12" :md="13" :lg="10">
                        <a-form-item label="은행">
                            <selectBank :selectValue="formState.detailBankType" width="200px" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12" :md="13" :lg="10">
                        <a-form-item label="계좌번호">
                            <a-input v-model:value="formState.detailAccountNumber" style="width: 200px" />
                        </a-form-item>
                        <a-form-item label="가입일자">
                            <div style="width: 150px">
                                <CustomDatepicker :valueDate="formState.detailRegisterDate" />
                            </div>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="13" :lg="14">
                        <a-form-item label="예금주">
                            <a-input v-model:value="formState.detailAccountOwner" />
                        </a-form-item>
                        <a-form-item label="해지일자">
                            <div style="width: 150px">
                                <CustomDatepicker :valueDate="formState.detailCancelDate" />
                            </div>
                        </a-form-item>
                    </a-col>

                </a-row>
                <a-row>
                    <a-col :span="24" :md="24" :lg="24">
                        <a-form-item label="비고" :label-col="{ span: 2 }" :wrapper-col="{ span: 24 }"
                            class="textarea_340">
                            <a-textarea v-model:value="formState.detailRemark" placeholder="500자 이내" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>

        <a-modal v-model:visible="visible" :mask-closable="false" :afterClose="afterConfirmClose" class="confirm-md"
            :width="521">
            <a-row>
                <a-col :span="4">
                    <warning-outlined :style="{fontSize: '70px', color: '#faad14',paddingTop: '20px'}" />
                </a-col>
                <a-col :span="20">
                    <h3><b>해지 확인</b></h3>
                    <p>해지하실 경우 본 영업자에 속한 사업자들은 본사로 귀속됩니다.</p>
                    <p>해지처리를 확정하시려면 “확인”을 입력하신 후 완료 버튼을 </p>
                    <p>누르세요</p>

                </a-col>
                <div style="text-align: center;width: 100%;margin-left: 100px;">
                    <a-input v-model:value="confirm" placeholder="확인" style="width: 200px" />
                    <a-button type="primary" @click="handleOkConfirm" style="margin-left: 100px;">완료</a-button>
                </div>
            </a-row>
            <template #footer>
            </template>
        </a-modal>

    </div>
</template>

<script lang="ts">
import CustomDatepicker from "../../../../../components/CustomDatepicker.vue";
import queries from "../../../../../graphql/queries/BF/BF3/BF340/index";
import selectBank from "../../../../../components/selectBank.vue";
import postCode from "../../../../../components/postCode.vue";
import { ref, defineComponent, reactive, watch } from 'vue';
import { SearchOutlined, WarningOutlined, } from '@ant-design/icons-vue';
import dayjs, { Dayjs } from 'dayjs';

import { useQuery, useMutation } from "@vue/apollo-composable";
export default defineComponent({
    props: ['modalStatus', 'data', 'idSaleEdit']
    ,
    components: {
        SearchOutlined,
        WarningOutlined,
        CustomDatepicker,
        selectBank,
        postCode
    },

    setup(props) {
        const dataQuery = ref();
        let trigger = ref<boolean>(false);
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        const visible = ref<boolean>(false);

        const labelCol = { style: { width: "300px" } };
        const wrapperCol = { span: 14 };
        let confirm = ref<string>('');
        const validateMessages = {
            required: true,
            types: {
                email: "이메일 형식이 정확하지 않습니다",
            },
        };


        // watch event modal popup
        watch(
            () => props.modalStatus,
            (newValue, old) => {
                if (newValue) {
                    visible.value = newValue;
                    dataQuery.value = { id: props.idSaleEdit };
                    trigger.value = true;
                    refetch();
                } else {
                    visible.value = newValue;
                    trigger.value = false;
                }
            }
        );

        let formState = reactive({
            id: '',
            code: '',
            status: 0,
            name: '',
            address: '',
            grade: 0,
            phone: '',
            mobilePhone: '',
            registerDate: '',
            cancelDate: null,

            detailStatus: 0,
            detailName: '',
            detailGrade: 0,
            detailBizType: 0,
            detailBizNumber: '',
            detailResidentId: null,
            detailEmail: '',
            detailMobilePhone: '',
            detailPhone: '',
            detailFax: '',
            detailZipcode: '',
            detailRoadAddress: '',
            detailJibunAddress: '',
            detailAddressExtend: '',

            detailAddressDetailBcode: '',
            detailAddressDetailBname: '',
            detailAddressDetailBuildingCode: '',
            detailAddressDetailBuildingName: '',
            detailAddressDetailRoadname: '',
            detailAddressDetailRoadnameCode: '',
            detailAddressDetailSido: '',
            detailAddressDetailSigungu: '',
            detailAddressDetailSigunguCode: '',
            detailAddressDetailZonecode: '',

            detailTaxInvoice: false,
            detailEmailTaxInvoice: '',
            detailBankType: '',
            detailAccountNumber: '',
            detailAccountOwner: '',
            detailRegisterDate: '',
            detailCancelDate: '',
            detailRemark: '',

            createdAt: 0,
            createdBy: '',
            updatedAt: 0,
            updatedBy: '',
            ip: '',
            active: false,
        });

        const { result, loading, error, refetch } = useQuery(
            queries.getSalesRepresentative,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );

        const funcAddress = (data: any) => {
            formState.detailZipcode = data.zonecode;
            formState.detailRoadAddress = data.roadAddress;
            formState.detailJibunAddress = data.jibunAddress;
            formState.detailAddressDetailBcode = data.bcode;
            formState.detailAddressDetailBname = data.bname;
            formState.detailAddressDetailBuildingName = data.buildingName;
            formState.detailAddressDetailRoadname = data.roadname;
            formState.detailAddressDetailRoadnameCode = data.roadnameCode;
            formState.detailAddressDetailSido = data.sido;
            formState.detailAddressDetailSigungu = data.sigungu;
            formState.detailAddressDetailSigunguCode = data.sigunguCode;
            formState.detailAddressDetailZonecode = data.zonecode;
        };

        watch(result, (value) => {
            if (value && value.getSalesRepresentative) {
                formState.id = value.getSalesRepresentative.id;
                formState.code = value.getSalesRepresentative.code;
                formState.status = value.getSalesRepresentative.status;
                formState.name = value.getSalesRepresentative.name;
                formState.address = value.getSalesRepresentative.address;
                formState.grade = value.getSalesRepresentative.grade;
                formState.phone = value.getSalesRepresentative.phone;
                formState.mobilePhone = value.getSalesRepresentative.mobilePhone;
                formState.registerDate = value.getSalesRepresentative.registerDate;
                formState.cancelDate = value.getSalesRepresentative.cancelDate;

                formState.detailStatus = value.getSalesRepresentative.detail.status;
                formState.detailName = value.getSalesRepresentative.detail.name;
                formState.detailGrade = value.getSalesRepresentative.detail.grade;
                formState.detailBizType = value.getSalesRepresentative.detail.bizType;
                formState.detailBizNumber = value.getSalesRepresentative.detail.bizNumber;
                formState.detailResidentId = value.getSalesRepresentative.detail.residentId;
                formState.detailEmail = value.getSalesRepresentative.detail.email;
                formState.detailMobilePhone = value.getSalesRepresentative.detail.mobilePhone;
                formState.detailPhone = value.getSalesRepresentative.detail.phone;
                formState.detailFax = value.getSalesRepresentative.detail.fax;
                formState.detailZipcode = value.getSalesRepresentative.detail.zipcode;
                formState.detailRoadAddress = value.getSalesRepresentative.detail.roadAddress;
                formState.detailJibunAddress = value.getSalesRepresentative.detail.jibunAddress;
                formState.detailAddressExtend = value.getSalesRepresentative.detail.addressExtend;

                formState.detailAddressDetailBcode = value.getSalesRepresentative.detail.addressDetail.bcode;
                formState.detailAddressDetailBname = value.getSalesRepresentative.detail.addressDetail.bname;
                formState.detailAddressDetailBuildingCode = value.getSalesRepresentative.detail.addressDetail.buildingCode;
                formState.detailAddressDetailBuildingName = value.getSalesRepresentative.detail.addressDetail.buildingName;
                formState.detailAddressDetailRoadname = value.getSalesRepresentative.detail.addressDetail.roadname;
                formState.detailAddressDetailRoadnameCode = value.getSalesRepresentative.detail.addressDetail.roadnameCode;
                formState.detailAddressDetailSido = value.getSalesRepresentative.detail.addressDetail.sido;
                formState.detailAddressDetailSigungu = value.getSalesRepresentative.detail.addressDetail.sigungu;
                formState.detailAddressDetailSigunguCode = value.getSalesRepresentative.detail.addressDetail.sigunguCode;
                formState.detailAddressDetailZonecode = value.getSalesRepresentative.detail.addressDetail.zonecode;

                formState.detailTaxInvoice = value.getSalesRepresentative.detail.taxInvoice;
                formState.detailEmailTaxInvoice = value.getSalesRepresentative.detail.emailTaxInvoice;
                formState.detailBankType = value.getSalesRepresentative.detail.bankType;
                formState.detailAccountNumber = value.getSalesRepresentative.detail.accountNumber;
                formState.detailAccountOwner = value.getSalesRepresentative.detail.accountOwner;
                formState.detailRegisterDate = value.getSalesRepresentative.detail.registerDate;
                formState.detailCancelDate = value.getSalesRepresentative.detail.cancelDate;
                formState.detailRemark = value.getSalesRepresentative.detail.remark;

                formState.createdAt = value.getSalesRepresentative.createdAt;
                formState.createdBy = value.getSalesRepresentative.createdBy;
                formState.updatedAt = value.getSalesRepresentative.updatedAt;
                formState.updatedBy = value.getSalesRepresentative.updatedBy;
                formState.ip = value.getSalesRepresentative.ip;
                formState.active = value.getSalesRepresentative.active;
            }
        });
        const confirmPopup = (value: any) => {
            if (value == '해지') {
                visible.value = true;
            }
        }

        const handleOkConfirm = () => {
            if (confirm.value == '확인') {
                visible.value = false;
            } else {
                formState.status = 1;
                visible.value = false;
            }
        }

        const afterConfirmClose = () => {
            if (confirm.value == '확인') {
                formState.status = 1;
            } else {
                formState.status = 1;
            }
        }

        const dateValue = (date: string | number | Date | dayjs.Dayjs | null | undefined) => {
            return dayjs(date, "YYYY-MM-DD");
        }

        const onFinish = (values: any) => {
            console.log("Success:", values);
        };
        return {
            labelCol,
            wrapperCol,
            formState,
            layout,
            value1: ref<Dayjs>(),
            visible,
            confirmPopup,
            confirm,
            handleOkConfirm,
            afterConfirmClose,
            dateValue,
            onFinish,
            validateMessages,
            funcAddress
        }
    },
    methods: {
        setModalVisible() {
            this.$emit('closePopup', false)
        },
        getColorTag(data: string) {
            if (data === "정상") {
                return "#108ee9";
            } else if (data === "해지") {
                return "#cd201f";
            } else if (data === "전체") {
                return "grey";
            }
        },

    }
})
</script>

<style scoped>
.confirm-md>>>.ant-modal-body {
    padding: 10px !important;
}

.confirm-button {
    margin-left: 100px;
}

.confirm-modal p {
    white-space: normal;
    font-size: 13px;
    line-height: 16px;
}

.email-input .ant-form-item-label {
    white-space: normal;

    display: inline-block;
    text-align: center;
    line-height: 16px;
}

.detail-address {
    margin-left: 7px;
}

.result-address {
    margin-left: 20%;
}

.ant-form-item {
    margin-bottom: 10px;
}

.warring-modal {
    font-size: 13px;
    line-height: 5px;
}

.label-br label {
    white-space: normal;
}

.textarea_340 {
    margin-right: 45px;
    margin-left: 25px;
}
</style>