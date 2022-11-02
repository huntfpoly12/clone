<template>
    <div ref="root">
        <a-modal :visible="modalStatus" title="영업자관리[bf-340 –pop]" centered @cancel="setModalVisible()"
            :mask-closable="false" :width="1028">
            <template #footer>
                <a-button @click="setModalVisible">그냥 나가기</a-button>
                <a-button key="submit" type="primary" :loading="loading || loadingUpdate" @click="updateSale">
                    저장하고 나가기</a-button>
            </template>
            <a-form :model="formState" v-bind="layout" label-align="right" name="nest-messages"
                :validate-messages="validateMessages">
                <a-row :gutter="24">
                    <a-col :span="9" :md="13" :lg="10">
                        <a-form-item label="영업자코드">
                            <default-text-box v-model:valueInput="formState.code" width="200px"/>
                        </a-form-item>
                        <a-form-item label="영업자명">
                            <default-text-box v-model:valueInput="formState.detailName" width="200px"  :disabled="!canChangeCompanyName"/>
                        </a-form-item>
                        <a-form-item label="사업자유형" class="label-br">
                            <biz-type-select-box   v-model:valueInput="formState.detailBizType" width="200px" /> 
                        </a-form-item>

                        <a-form-item label="이메일" :name="['이메일']" :rules="[{ type: 'email' }]">
                            <mail-text-box v-model:valueInput="formState.detailEmail" width="250px"/>
                        </a-form-item>
                        <a-form-item label="연락처">
                            <tel-tex-box v-model:valueInput="formState.detailPhone" width="200px" placeholder="전화번호를 입력"/>
                        </a-form-item>
                        <a-form-item label="팩스">
                            <text-number-box v-model:valueInput="formState.detailFax" width="200px"/>
                        </a-form-item>
                        <a-form-item label="주소">
                            <a-row>
                                <a-col :span="12">
                                    <default-text-box v-model:valueInput="formState.detailZipcode"  width="100%" :disabled="true"/>
                                </a-col>
                                <a-col :span="12">
                                    <div style="margin-left: 5px">
                                        <a-button type="primary" ghost>
                                            <post-code @dataAddress="funcAddress"/>
                                        </a-button>
                                    </div>
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-col>
                    <a-col :span="15" :md="11" :lg="14">
                        <a-form-item label="상태">
                            <sale-status-select-box v-model:valueInput="formState.status" width="100px"/>
                        </a-form-item>
                        <a-form-item label="등급">
                            <sale-grade-select-box v-model:valueInput="formState.detailGrade" width="100px"/>
                        </a-form-item>
                        <a-form-item label="법인(주민)등록번호" :wrapper-col="{ span: 14 }" class="label-br">
                            <id-card-text-box :required="true" v-model:valueInput="formState.detailResidentId" messRequired="이항목은 필수 입력사항입니다!" />
                        </a-form-item>
                        <a-form-item label="사업자등록번호" class="label-br">
                            <company-registration-number-text-box v-model:valueInput="formState.detailBizNumber"  :required="true" messRequired="이항목은 필수 입력사항입니다!" />
                        </a-form-item>
                        <a-form-item label="휴대폰">
                            <tel-tex-box v-model:valueInput="formState.detailMobilePhone" placeholder="전화번호를 입력"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="15" :md="13" :lg="12">
                        <a-form-item class="result-address" :wrapper-col="{ span: 24 }">
                            <default-text-box v-model:valueInput="formState.detailRoadAddress"  width="100%" :disabled="true"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8" :md="13" :lg="11">
                        <a-form-item :wrapper-col="{ span: 24}" class="detail-address">
                            <default-text-box v-model:valueInput="formState.detailAddressExtend"  placeholder="상세주소"/>
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
                                <mail-text-box v-model:valueInput="formState.detailEmailTaxInvoice" width="100%"/>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12" :md="13" :lg="10">
                        <a-form-item label="은행">
                            <select-bank :selectValue="formState.detailBankType" width="200px" />
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
                                <date-time-box v-model:valueDate="formState.detailRegisterDate"/>
                            </div>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="13" :lg="14">
                        <a-form-item label="예금주">
                            <a-input v-model:value="formState.detailAccountOwner" />
                        </a-form-item>
                        <a-form-item label="해지일자">
                            <div style="width: 150px">
                                <date-time-box v-model:valueDate="formState.detailCancelDate"/>
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
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, watch } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { useQuery, useMutation ,useLazyQuery } from "@vue/apollo-composable";
import dayjs, { Dayjs } from 'dayjs';
import { message } from "ant-design-vue";
import { formState340 } from '../utils'
import queries from "../../../../../graphql/queries/BF/BF3/BF340/index";
import mutations from "../../../../../graphql/mutations/BF/BF3/BF340/index";

export default defineComponent({
    props: ['modalStatus', 'data', 'idSaleEdit']
    ,
    components: {
        SearchOutlined
    },

    setup(props, { emit }) {
        const dataQuery = ref();
        let trigger = ref<boolean>(false);
        let triggerCheckPer = ref<boolean>(false);
        const dataQueryCheckPer = ref({});
        let canChangeCompanyName =  ref<boolean>(false);
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        const visible = ref<boolean>(false);
        const labelCol = { style: { width: "300px" } };
        const wrapperCol = { span: 14 };
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

        let formState = reactive({...formState340});

        // query check if can be change name company 
        const { result: resCheckPerEdit, refetch: refetchCheckPer } = useLazyQuery(
            queries.isSalesRepresentativeChangableName, dataQueryCheckPer,
            () => ({
                enabled: triggerCheckPer.value,
                fetchPolicy: "no-cache",
            })
        );

        // watch result resCheckPerEdit
        watch(resCheckPerEdit, (value) => {
            canChangeCompanyName.value = value.isSalesRepresentativeChangableName;
        });

        // get  sale representative
        const { result, loading, error, refetch } = useQuery(
            queries.getSalesRepresentative,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );

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

                triggerCheckPer.value = true;
                dataQueryCheckPer.value = { id: value.getSalesRepresentative.id, name: value.getSalesRepresentative.name };
                // trigger query check if can be change business registration number 
                refetchCheckPer()
            }
        });


        // update sale representative
        const {
            mutate: actionUpdate,
            onError,
            loading: loadingUpdate,
            onDone: updateDone,
        } = useMutation(mutations.updateSalesRepresentative);


        const updateSale = () => {

            let salesRepresentativeDetailInput = {
                status: formState.status,
                name: formState.detailName,
                grade: formState.detailGrade,
                bizType: formState.detailBizType,
                bizNumber: formState.detailBizNumber,
                residentId: formState.detailResidentId,
                email: formState.detailEmail,
                mobilePhone: formState.mobilePhone,
                phone: formState.detailPhone,
                fax: formState.detailFax,
                zipcode: formState.detailZipcode,
                roadAddress: formState.detailRoadAddress,
                jibunAddress: formState.detailJibunAddress,
                addressExtend: formState.detailAddressExtend,
                addressDetail: {
                    bcode: formState.detailAddressDetailBcode,
                    bname: formState.detailAddressDetailBname,
                    buildingCode: formState.detailAddressDetailBuildingName,
                    buildingName: formState.detailAddressDetailBuildingName,
                    roadname: formState.detailAddressDetailRoadname,
                    roadnameCode: formState.detailAddressDetailRoadnameCode,
                    sido: formState.detailAddressDetailSido,
                    sigungu: formState.detailAddressDetailSigungu,
                    sigunguCode: formState.detailAddressDetailSigunguCode,
                    zonecode: formState.detailAddressDetailZonecode,
                },
                taxInvoice: formState.detailTaxInvoice,
                emailTaxInvoice: formState.detailEmailTaxInvoice,
                bankType: formState.detailBankType,
                accountNumber: formState.detailAccountNumber,
                accountOwner: formState.detailAccountOwner,
                registerDate: formState.detailRegisterDate,
                cancelDate: formState.detailCancelDate,
                remark: formState.detailRemark,
            };

            let variables = {
                id: formState.id,
                input: salesRepresentativeDetailInput
            };

            actionUpdate(variables);
        }

        updateDone((res) => {
            message.success(`Update was successful`, 4);
            setModalVisible();
        });

        const dateValue = (date: string | number | Date | dayjs.Dayjs | null | undefined) => {
            return dayjs(date, "YYYY-MM-DD");
        }

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

        const setModalVisible = () => {
            emit('closePopup', false)
        }

        return {
            labelCol,
            wrapperCol,
            formState,
            layout,
            value1: ref<Dayjs>(),
            visible,
            dateValue,
            validateMessages,
            funcAddress,
            loading,
            updateSale,
            loadingUpdate,
            canChangeCompanyName,
            setModalVisible
        }
    },
    methods: {
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

<style lang="scss" scoped src="../style/editStyle.scss">
</style>