<template>
    <div ref="root">
        <a-modal :visible="modalStatus" title="영업자관리" centered @cancel="setModalVisible()" :mask-closable="false"
            :width="1028" :afterClose="afterPopupClose">
            <template #footer>
                <a-button @click="setModalVisible">그냥 나가기</a-button>
                <a-button key="submit" type="primary" @click="creactedSaleSetValue">
                    저장하고 나가기</a-button>
            </template>
            <a-form :model="bf340Detail" v-bind="layout" label-align="right" name="nest-messages"
                :validate-messages="validateMessages" @finish="onFinish">
                <a-row :gutter="24">
                    <a-col :span="9" :md="13" :lg="10">
                        <a-form-item label="영업자코드">
                            <a-input disabled="true" style="width: 200px" />
                        </a-form-item>
                        <a-form-item label="영업자명">
                            <a-input v-model:value="bf340Detail.name" style="width: 200px" />
                        </a-form-item>
                        <a-form-item label="사업자유형" class="label-br">
                            <a-select ref="select" v-model:value="bf340Detail.bizType" style="width: 200px">
                                <a-select-option value="법인">법인</a-select-option>
                                <a-select-option value="개인사업자">개인사업자</a-select-option>
                                <a-select-option value="개인">개인</a-select-option>
                            </a-select>
                        </a-form-item>

                        <a-form-item label="이메일" :name="['이메일']" :rules="[{ type: 'email' }]">
                            <a-input v-model:value="bf340Detail.email" style="width: 250px" />
                        </a-form-item>
                        <a-form-item label="연락처">
                            <a-input v-model:value="bf340Detail.phone" style="width: 200px" />
                        </a-form-item>
                        <a-form-item label="팩스">
                            <a-input v-model:value="bf340Detail.fax" style="width: 200px" />
                        </a-form-item>
                        <a-form-item label="주소">
                            <a-input-search v-model:value="bf340Detail.zipcode" placeholder="우편번호검색..."
                                style="width: 200px">
                                <template #prefix>
                                    <postCode @dataAddress="funcAddress" />
                                </template>
                                <template #enterButton>
                                    <a-button>
                                        <postCode @dataAddress="funcAddress" />
                                    </a-button>
                                </template>
                            </a-input-search>
                        </a-form-item>
                    </a-col>
                    <a-col :span="15" :md="11" :lg="14">
                        <a-form-item label="상태">
                            <a-select style="width: 100px" v-model:value="bf340Detail.status"
                                option-label-prop="children" @select="confirmPopup">
                                <a-select-option value="정상" label="정상">
                                    <a-tag :color="getColorTag('정상')">정상</a-tag>
                                </a-select-option>
                                <a-select-option value="해지" label="해지">
                                    <a-tag :color="getColorTag('해지')">해지</a-tag>
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="등급">
                            <a-select ref="select" v-model:value="bf340Detail.grade" style="width: 100px">
                                <a-select-option :value="1">지사</a-select-option>
                                <a-select-option :value="2">대리점</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="법인(주민)등록번호" :wrapper-col="{ span: 14 }" class="label-br">
                            <a-input v-model:value="bf340Detail.residentId" />
                        </a-form-item>
                        <a-form-item label="사업자등록번호" class="label-br">
                            <a-input v-model:value="bf340Detail.bizNumber" />
                        </a-form-item>
                        <a-form-item label="휴대폰">
                            <a-input v-model:value="bf340Detail.mobilePhone" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="15" :md="13" :lg="12">
                        <a-form-item class="result-address" :wrapper-col="{ span: 24 }">
                            <a-input v-model:value="bf340Detail.roadAddress" style="width: 100%" :disabled="true" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8" :md="13" :lg="11">
                        <a-form-item :wrapper-col="{ span: 24}" class="detail-address">
                            <a-input v-model:value="bf340Detail.addressExtend" placeholder="상세주소" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="세금계산서발행여부" :label-col="{ span: 8 }" class="label-br">
                            <a-switch v-model:checked="bf340Detail.taxInvoice" checked-children="발행"
                                un-checked-children="미발행" style="width: 80px" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-row>
                            <a-col :span="6" :md="6" :lg="5">
                                <label class="lable-item"> 전자세금계산서<br>수신이메일 : </label>
                            </a-col>
                            <a-col :span="16" :md="16" :lg="17">
                                <a-form-item class="email-input" :wrapper-col="{ span: 24 }" :name="['전자세금계산서수신이메일']"
                                    :rules="[{ type: 'email' }]">
                                    <a-input v-model:value="bf340Detail.emailTaxInvoice" placeholder=""
                                        style="width: 100%" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12" :md="13" :lg="10">
                        <a-form-item label="은행">
                            <selectBank @bank="getIDBank" :width="'200px'" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12" :md="13" :lg="10">
                        <a-form-item label="계좌번호">
                            <a-input v-model:value="bf340Detail.accountNumber" style="width: 200px" />
                        </a-form-item>
                        <a-form-item label="가입일자">
                            <div style="width: 150px">
                                <CustomDatepicker :valueDate="bf340Detail.registerDate" />
                            </div>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="13" :lg="14">
                        <a-form-item label="예금주">
                            <a-input v-model:value="bf340Detail.accountOwner" />
                        </a-form-item>
                        <a-form-item label="해지일자">
                            <div style="width: 150px">
                                <CustomDatepicker :valueDate="bf340Detail.cancelDate" />
                            </div>
                        </a-form-item>
                    </a-col>

                </a-row>
                <a-row>
                    <a-col :span="24" :md="24" :lg="24">
                        <a-form-item label="비고" :label-col="{ span: 2 }" :wrapper-col="{ span: 24 }"
                            class="textarea_340">
                            <a-textarea v-model:value="bf340Detail.remark" placeholder="500자 이내" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>

        <a-modal v-model:visible="visible" :mask-closable="false" :afterClose="afterConfirmClose" :width="521">
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
import { ref, defineComponent, reactive, onMounted, computed } from 'vue'
import { SearchOutlined, WarningOutlined } from '@ant-design/icons-vue';
import dayjs, { Dayjs } from 'dayjs';
import selectBank from "../../../../../components/selectBank.vue";
import postCode from "./postCode.vue";
import { useMutation } from "@vue/apollo-composable";
import mutations from "../../../../../graphql/mutations/BF/BF3/BF340/index";
export default defineComponent({
    props: {
        modalStatus: Boolean,
    },
    components: {
        SearchOutlined,
        WarningOutlined,
        CustomDatepicker,
        selectBank,
        postCode
    },
    setup() {
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

        const bf340Detail = reactive({
            status: 1,
            name: "",
            grade: 1,
            bizType: 1,
            bizNumber: "",
            residentId: "",
            email: "",
            mobilePhone: "",
            phone: "",
            fax: "",
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
                zonecode: "",
            },
            taxInvoice: true,
            emailTaxInvoice: "",
            bankType: "39",
            accountNumber: "",
            accountOwner: "",
            registerDate: "",
            cancelDate: "",
            remark: "",
        });


        const confirmPopup = (value: any) => {
            if (value == '해지') {
                visible.value = true;
            }
        }
        const handleOkConfirm = () => {
            console.log('12314');

        }

        const afterConfirmClose = computed(() => {

        });

        const dateValue = (date: string | number | Date | dayjs.Dayjs | null | undefined) => {
            return dayjs(date, "YYYY-MM-DD");
        }

        const afterPopupClose = () => {

        };

        const onFinish = (values: any) => {
            console.log("Success:", values);
        };

        const {
            mutate: creactSale,
            loading: loadingUpdate,
            onDone: updateDone,
        } = useMutation(mutations.creactedSale);


        return {
            labelCol,
            wrapperCol,
            bf340Detail,
            layout, 
            visible,
            confirmPopup,
            confirm,
            handleOkConfirm,
            afterConfirmClose,
            afterPopupClose,
            dateValue,
            validateMessages,
            onFinish,
            creactSale
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

        getIDBank(data: any) {
            this.bf340Detail.bankType = data;
        },

        funcAddress(data: any) {
            this.bf340Detail.zipcode = data.zonecode;
            this.bf340Detail.roadAddress = data.roadAddress;
            this.bf340Detail.jibunAddress = data.jibunAddress;
            this.bf340Detail.addressDetail.bcode = data.bcode;
            this.bf340Detail.addressDetail.bname = data.bname;
            this.bf340Detail.addressDetail.buildingCode = data.buildingCode;
            this.bf340Detail.addressDetail.buildingName = data.buildingName;
            this.bf340Detail.addressDetail.roadname = data.roadname;
            this.bf340Detail.addressDetail.roadnameCode = data.roadnameCode;
            this.bf340Detail.addressDetail.sido = data.sido;
            this.bf340Detail.addressDetail.sigungu = data.sigungu;
            this.bf340Detail.addressDetail.sigunguCode = data.sigunguCode;
            this.bf340Detail.addressDetail.zonecode = data.zonecode;
        },

        creactedSaleSetValue() { 
            console.log(this.bf340Detail);
            
            this.creactSale(this.bf340Detail)
        }
    }
})
</script>
<style scoped>
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