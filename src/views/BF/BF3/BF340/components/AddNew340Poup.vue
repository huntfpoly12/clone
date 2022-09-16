<template>
    <div ref="root">
        <a-modal :visible="modalStatus" title="영업자관리[bf-340 –pop]" centered okText="저장하고 나가기" cancelText="그냥 나가기"
            @cancel="setModalVisible()" :width="withPopup()">
            <a-form v-bind="layout" name="nest-messages" label-align="right">
                <a-row :gutter="24">
                    <a-col :span="9" :md="13" :lg="10">
                        <a-form-item label="영업자코드">
                            <a-input v-model:value="bf340Detail.영업자코드" style="width: 200px" />
                        </a-form-item>
                        <a-form-item label="영업자명">
                            <a-input v-model:value="bf340Detail.영업자명" style="width: 200px" />
                        </a-form-item>
                        <a-form-item label="사업자유형" class="label-br">
                            <a-select ref="select" v-model:value="bf340Detail.사업자유형" style="width: 200px">
                                <a-select-option value="법인">법인</a-select-option>
                                <a-select-option value="개인사업자">개인사업자</a-select-option>
                                <a-select-option value="개인">개인</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="이메일">
                            <a-input v-model:value="bf340Detail.이메일" style="width: 250px" />
                        </a-form-item>
                        <a-form-item label="연락처">
                            <a-input v-model:value="bf340Detail.연락처" style="width: 200px" />
                        </a-form-item>
                        <a-form-item label="팩스">
                            <a-input v-model:value="bf340Detail.팩스" style="width: 200px" />
                        </a-form-item>
                        <a-form-item label="주소">
                            <a-input-search v-model:value="bf340Detail.주소" placeholder="우편번호검색..." style="width: 200px">
                                <template #prefix>
                                    <search-outlined />
                                </template>
                                <template #enterButton>
                                    <a-button>
                                        <search-outlined />
                                    </a-button>
                                </template>
                            </a-input-search>
                        </a-form-item>
                    </a-col>
                    <a-col :span="15" :md="11" :lg="14">
                        <a-form-item label="상태">
                            <a-select style="width: 100px" v-model:value="bf340Detail.상태" option-label-prop="children"
                                @select="confirmPopup">
                                <a-select-option value="정상" label="정상">
                                    <a-tag :color="getColorTag('정상')">정상</a-tag>
                                </a-select-option>
                                <a-select-option value="해지" label="해지">
                                    <a-tag :color="getColorTag('해지')">해지</a-tag>
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="등급">
                            <a-select ref="select" v-model:value="bf340Detail.등급" style="width: 100px">
                                <a-select-option value="본사">본사</a-select-option>
                                <a-select-option value="지사">지사</a-select-option>
                                <a-select-option value="대리점">대리점</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="법인(주민)등록번호" :wrapper-col="{ span: 14 }" class="label-br">
                            <a-input v-model:value="bf340Detail.법인주민등록번호" />
                        </a-form-item>
                        <a-form-item label="사업자등록번호" class="label-br">
                            <a-input v-model:value="bf340Detail.사업자등록번호" />
                        </a-form-item>
                        <a-form-item label="휴대폰">
                            <a-input v-model:value="bf340Detail.휴대폰" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="15" :md="13" :lg="12">
                        <a-form-item class="result-address" :wrapper-col="{ span: 24 }">
                            <a-input v-model:value="bf340Detail.result_address" style="width: 100%" :disabled="true" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8" :md="13" :lg="11">
                        <a-form-item :wrapper-col="{ span: 24}" class="detail-address">
                            <a-input v-model:value="bf340Detail.detail_address" placeholder="상세주소" :disabled="true" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="세금계산서발행여부" :label-col="{ span: 8 }" class="label-br">
                            <a-switch v-model:checked="bf340Detail.세금계산서발행여부" checked-children="발행"
                                un-checked-children="미발행" style="width: 80px" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-row>
                            <a-col :span="6" :md="6" :lg="5">
                                <label class="lable-item"> 전자세금계산서<br>수신이메일 : </label>
                            </a-col>
                            <a-col :span="16" :md="16" :lg="17">
                                <a-form-item class="email-input" :wrapper-col="{ span: 24 }">
                                    <a-input v-model:value="bf340Detail.전자세금계산서수신이메일" placeholder="상세주소"
                                        style="width: 100%" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12" :md="13" :lg="10">
                        <a-form-item label="은행">
                            <a-select ref="select" v-model:value="bf340Detail.은행" style="width: 200px">
                                <a-select-option value="농협">농협</a-select-option>
                                <a-select-option value="신한은행">신한은행</a-select-option>
                                <a-select-option value="국민은행">국민은행</a-select-option>
                                <a-select-option value="우리은행">우리은행</a-select-option>
                                <a-select-option value="기업은행">기업은행</a-select-option>
                                <a-select-option value="하나은행">하나은행</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12" :md="13" :lg="10">
                        <a-form-item label="계좌번호">
                            <a-input v-model:value="bf340Detail.계좌번호" style="width: 200px" />
                        </a-form-item>
                        <a-form-item label="가입일자">
                            <a-date-picker v-model:value="value1" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="13" :lg="14">
                        <a-form-item label="예금주">
                            <a-input v-model:value="bf340Detail.예금주" />
                        </a-form-item>
                        <a-form-item label="해지일자">
                            <a-date-picker v-model:value="value1" />
                        </a-form-item>
                    </a-col>

                </a-row>
                <a-row>
                    <a-col :span="24" :md="24" :lg="24" >
                        <a-form-item label="비고" :label-col="{ span: 2 }" :wrapper-col="{ span: 24 }" class="textarea_340">
                            <a-textarea v-model:value="bf340Detail.비고" placeholder="500자 이내" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>

        <a-modal v-model:visible="visible" title="해지 확인" ok-text="완료" :afterClose="afterConfirmClose()">
            <a-row>
                <a-col :span="4">
                    <warning-outlined :style="{fontSize: '70px', color: '#faad14'}" />
                </a-col>
                <a-col :span="20">
                    <p>해지하실 경우 본 영업자에 속한 사업자들은 본사로 귀속됩니다.</p>
                    <p>해지처리를 확정하시려면 “확인”을 입력하신 후 완료 버튼을 </p>
                    <p>누르세요</p>

                </a-col>
            </a-row>
            <template #footer>
                <a-input v-model:value="confirm" placeholder="확인" style="width: 200px" />
                <a-button type="primary" @click="handleOkConfirm" style="margin-left: 100px;">완료</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, onMounted } from 'vue'
import type { UnwrapRef } from 'vue';
import { SearchOutlined, WarningOutlined } from '@ant-design/icons-vue';
import dayjs, { Dayjs } from 'dayjs';
interface FormState {
    name: string;
    영업자코드: string;
    영업자명: string;
    사업자유형: string;
    상태: string;
    등급: string;
    주소: string;
    은행: string;
    계좌번호: string;
    등록번호: string;
    예금주: string;
    가입일자: string;
    사업자등록번호: string;
    휴대폰: string;
    비고: string;
    이메일: string;
    연락처: string;
    팩스: string;
    전자세금계산서수신이메일: string;
    세금계산서발행여부: string;
    법인주민등록번호: string;
    result_address: string;
    detail_address: string;
}

export default defineComponent({
    props: {
        modalStatus: Boolean,
    },
    components: {
        SearchOutlined,
        WarningOutlined
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

        let windowHeight = ref(window.innerWidth);
        // get window resize 
        onMounted(() => {
            window.onresize = () => {
                console.log(windowHeight.value = window.innerWidth);
            }
        });

        let withPopup = () => {
            var percent = 100 -  (window.innerWidth / (window.innerWidth + window.innerHeight))*100 + 30;
            if(windowHeight.value <= 1960){
                return percent+'%';
            }else{
                return '50%';
            }
        };
        const bf340Detail: UnwrapRef<FormState> = reactive({
            name: '',
            사업자유형: '',
            상태: '',
            등급: '',
            주소: '',
            은행: '',
            계좌번호: '',
            예금주: '',
            가입일자: '',
            비고: '',
            영업자코드: '',
            영업자명: '',
            등록번호: '',
            사업자등록번호: '',
            휴대폰: '',
            이메일: '',
            연락처: '',
            팩스: '',
            전자세금계산서수신이메일: '',
            세금계산서발행여부: '',
            법인주민등록번호: '',
            result_address: '',
            detail_address: ''

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
                bf340Detail.상태 = '정상';
                visible.value = false;
            }
        }

        const afterConfirmClose = () => {
            if (confirm.value == '확인') {
                bf340Detail.상태 = '해지';
            } else {
                bf340Detail.상태 = '정상';
            }
        }


        return {
            labelCol,
            wrapperCol,
            bf340Detail,
            layout,
            value1: ref<Dayjs>(),
            visible,
            confirmPopup,
            confirm,
            handleOkConfirm,
            afterConfirmClose,
            windowHeight,
            withPopup
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
<style>
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

.textarea_340{
    margin-right: 45px;
    margin-left: 25px;
}
</style>