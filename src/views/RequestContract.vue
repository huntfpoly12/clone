
<template>
    <div class="contract-container">
        <h2>서비스가입신청</h2>
        <a-steps v-model:current="step" type="navigation" :style="stepStyle">
            <a-step :status="step===0? 'process' : 'finish'" title="약관동의" />
            <a-step :status="checkStepTwo" title="사업자대표자정보"/>
            <a-step :status="checkStepThree" title="서비스신청CMS정보" />
            <a-step :status="checkStepFour" title="신청완료!" />
        </a-steps>
        <div class="step-content">
            <template v-if="step ===0">
                <div class="form-group">
                    <label>1. 서비스약관 동의</label>
                    <a-textarea v-model:value="value2" placeholder="// 주석처리 ( 추후 내용제공 )" allow-clear />
                    <div class="radio-group">
                        <a-radio v-model:checked="checked">미동의</a-radio>
                        <a-radio v-model:checked="checked">동의함</a-radio>
                    </div>
                </div>
                <div class="form-group">
                    <label>2. 개인정보제공 및 활용동의</label>
                    <a-textarea v-model:value="value2" placeholder="// 주석처리 ( 추후 내용제공 )" allow-clear />
                    <div class="radio-group">
                        <a-radio v-model:checked="checked">미동의</a-radio>
                        <a-radio v-model:checked="checked">동의함</a-radio>
                    </div>
                </div>
                <div class="form-group">
                    <label>3. 회계서비스약관 동의</label>
                    <a-textarea v-model:value="value2" placeholder="// 주석처리 ( 추후 내용제공 )" allow-clear />
                    <div class="radio-group">
                        <a-radio v-model:checked="checked">미동의</a-radio>
                        <a-radio v-model:checked="checked">동의함</a-radio>
                    </div>
                </div>
                <div class="form-group">
                    <label>4. 원천서비스약관 동의</label>
                    <a-textarea v-model:value="value2" placeholder="// 주석처리 ( 추후 내용제공 )" allow-clear />
                    <div class="radio-group">
                        <a-radio v-model:checked="checked">미동의</a-radio>
                        <a-radio v-model:checked="checked">동의함</a-radio>
                    </div>
                </div>
            </template>
            <template v-if="step===1">
                <div class="form-group">
                    <label>1. 사업자정보</label>
                    <div class="info-box">
                        <div class="form-item">
                            <label class="red">상 호 :</label>
                            <a-input placeholder="가나다라마바사아자차카타파하 요양병원" />
                        </div>
                        <div class="form-item">
                            <label class="red">사업자등록번호 :</label>
                            <a-input placeholder="123-45-67890" />
                        </div>
                        <div class="form-item">
                            <label class="red">사업자유형 :</label>
                            <a-radio v-model:checked="checked">법인사업자</a-radio>
                            <a-radio v-model:checked="checked">개인사업자</a-radio>
                            <div class="group-label">
                                <p>{ $id no } :</p>
                                <a-input class="width-auto" placeholder="800123-1234567" />
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="red">주 소 :</label>
                            <div class="group-label">
                                <a-input class="width-auto" placeholder="" />
                                <a-button>우편번호 검색</a-button>
                            </div>
                        </div>
                        <div class="form-item">
                            <label ></label>
                            <a-input placeholder="ADDR1" />
                        </div>
                        <div class="form-item">
                            <label ></label>
                            <a-input placeholder="ADDR2" />
                        </div>
                        <div class="form-item">
                            <label class="red">상 호 :</label>
                            <a-input class="width-auto" placeholder="0298765432" />
                        </div>
                         <div class="form-item">
                            <label>팩 스 :</label>
                            <a-input class="width-auto" placeholder="0212345678" />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>2. 대표자정보</label>
                    <div class="info-box">
                        <div class="form-item">
                            <label class="red">대표자명:</label>
                            <a-input placeholder="홍길동" />
                        </div>
                        <div class="form-item">
                            <label class="red">생년월일 :</label>
                            <a-input placeholder="19620820" />
                        </div>
                        <div class="form-item">
                            <label class="red">휴대폰번호:</label>
                            <a-input placeholder="01098765432" />
                        </div>
                        <div class="form-item">
                            <label class="red">이메일 :</label>
                            <a-input placeholder="abc123@mailaddress.com" />
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="step===2">
                <div class="checkbox-item">
                    <a-checkbox> 회계서비스 신청 </a-checkbox>
                </div>
                <div class="checkbox-item">
                    <a-checkbox> 원천서비스 신청 </a-checkbox>
                </div>
                <p>CMS (자동이체출금) 계좌 정보 입력</p>
                <p>영업관리담당</p>
            </template>
            <div class="group-button">
                <a-button v-if="step > 0" type="secondary" @click="prevStep">이 전 </a-button>
                <a-button v-if="step < 3" type="primary" @click="nextStep">다음 </a-button>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            step: 0
        }
    },
    computed: {
        checkStepTwo() {
            if(this.step === 0) {
                return 'wait'
            } else if (this.step === 1) {
                return 'process'
            } else {
                return 'finish'
            }
        },
         checkStepThree() {
            if(this.step < 2) {
                return 'wait'
            } else if (this.step === 2) {
                return 'process'
            } else {
                return 'finish'
            }
        },
        checkStepFour() {
            if(this.step < 3) {
                return 'wait'
            } else if (this.step === 3) {
                return 'process'
            } else {
                return 'finish'
            }
        }
    },
    methods: {
        prevStep() {
            this.step--
        },
        nextStep() {
            this.step++
        }
    }
}
</script>

<style scoped>
    .contract-container {
        max-width: 960px;
        margin: 50px auto;
        text-align: left;
        padding-bottom: 50px;
    }
    .contract-container h2 {
        font-weight: bold;
    }
    .ant-steps-navigation {
        box-shadow: 0px -1px 0 0 #e8e8e8 inset;
    }
    .form-group {
        margin-top: 30px;
    }
     .form-group label {
        margin-bottom: 5px;
        display: block;
     }
    .radio-group {
        text-align: right;
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        margin-right: -15px;
    }
    ::v-deep textarea {
        height: 100px;
    }
    .group-button {
        display: flex;
        justify-content: center;
    }
    .group-button {
        margin-top: 20px;
    }
    .group-button ::v-deep button {
        margin: 0 10px;
    }
    .info-box {
        border: 1px solid #ccc;
        padding: 30px;
    }
    .form-item {
        display: flex;
        margin-top: 15px;
    }
    .form-item label {
        width: 150px;
    }
    .form-item label.red {
        color: red;
    }
    .width-auto {
        width: auto;
    }
    .form-item ::v-deep button {
        margin-left: 5px;
    }
    .form-item ::v-deep input {
        max-width: calc(100% - 150px);
    }
    .group-label {
        display: flex;
        align-items: center;
    }
    .group-label p {
        margin-right: 15px;
        margin-bottom: 0;
    }
    .checkbox-item {
        margin-top: 15px;
        margin-bottom: 15px;
    }
</style>