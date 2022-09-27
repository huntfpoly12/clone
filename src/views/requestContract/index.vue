<template>
    <div class="contract-container">
        <h2>서비스가입신청</h2>
        <a-steps v-model:current="step" type="navigation" :style="stepStyle">
            <a-step :status="step === 0 ? 'process' : 'finish'" title="약관동의" />
            <a-step :status="checkStepTwo" title="사업자대표자정보" />
            <a-step :status="checkStepThree" title="서비스신청CMS정보" />
            <a-step :status="checkStepFour" title="신청완료!" />
        </a-steps>
        <div class="step-content">
            <template v-if="step === 0">
                <div class="form-group">
                    <label>1. 서비스약관 동의</label>
                    <a-textarea placeholder="// 주석처리 ( 추후 내용제공 )" allow-clear />
                    <div class="radio-group">
                        <a-radio-group v-model:value="radio">
                            <a-radio :value="'미동의'">미동의</a-radio>
                            <a-radio :value="'동의함'">동의함</a-radio>
                        </a-radio-group>
                    </div>
                </div>
                <div class="form-group">
                    <label>2. 개인정보제공 및 활용동의</label>
                    <a-textarea placeholder="// 주석처리 ( 추후 내용제공 )" allow-clear />
                    <div class="radio-group">
                        <a-radio-group v-model:value="radio1">
                            <a-radio :value="'미동의'">미동의</a-radio>
                            <a-radio :value="'동의함'">동의함</a-radio>
                        </a-radio-group>
                    </div>
                </div>
                <div class="form-group">
                    <label>3. 회계서비스약관 동의</label>
                    <a-textarea placeholder="// 주석처리 ( 추후 내용제공 )" allow-clear />
                    <div class="radio-group">
                        <a-radio-group v-model:value="radio2">
                            <a-radio :value="'미동의'">미동의</a-radio>
                            <a-radio :value="'동의함'">동의함</a-radio>
                        </a-radio-group>
                    </div>
                </div>
                <div class="form-group">
                    <label>4. 원천서비스약관 동의</label>
                    <a-textarea placeholder="// 주석처리 ( 추후 내용제공 )" allow-clear />
                    <div class="radio-group">
                        <a-radio-group v-model:value="radio3">
                            <a-radio :value="'미동의'">미동의</a-radio>
                            <a-radio :value="'동의함'">동의함</a-radio>
                        </a-radio-group>
                    </div>
                </div>
            </template>
            <template v-if="step === 1">
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
                            <a-radio-group v-model:value="radio4">
                                <a-radio :value="'법인사업자'">법인사업자</a-radio>
                                <a-radio :value="'개인사업자'">개인사업자</a-radio>
                            </a-radio-group>
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
                            <label></label>
                            <a-input placeholder="ADDR1" />
                        </div>
                        <div class="form-item">
                            <label></label>
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
            <template v-if="step === 2">
                <div class="form-group">
                    <label>1. 회계서비스 신청</label>
                    <div class="list-checkbox">
                        <a-radio-group v-model:value="dataInputCallApi.dossier">
                            <a-radio :value="'신청합니다'">신청합니다</a-radio>
                            <a-radio :value="'신청하지 않습니다'">신청하지 않습니다</a-radio>
                        </a-radio-group>
                    </div>

                    <div class="group-title">
                        <p class="red">⁙ 운영사업</p>
                    </div>

                    <DxDataGrid id="gridContainer" :data-source="dataModal" :show-borders="true"
                        :selected-row-keys="selectedItemKeys">
                        <DxEditing :use-icons="true" :allow-updating="true" :allow-adding="true" :allow-deleting="true"
                            template="button-template" mode="cell">
                            <DxTexts confirmDeleteMessage="삭제하겠습니까?" />
                            <DxTexts addRow="추 가" />
                        </DxEditing>
                        <template #button-template>
                            <DxButton icon="plus" />
                        </template>
                        <DxPaging :enabled="false" />
                        <DxColumn data-field="No" :allow-editing="false" :width="50" caption="#"
                            cell-template="indexCell" />
                        <template #indexCell="{ data }">
                            <div>{{data.rowIndex + 1}}</div>
                        </template>

                        <DxColumn data-field="사업명" caption="사업명 (중복불가)" />
                        <DxColumn :width="225" data-field="StateID" caption="사업분류">
                            <DxLookup :data-source="states" value-expr="ID" display-expr="Name" />
                        </DxColumn>
                        <DxColumn data-field="서비스시작년월" data-type="date" :format="'yyyy-MM-dd'" />
                        <DxColumn :width="100" data-field="정원수" caption="정원수 (명)" />
                        <DxToolbar>
                            <DxItem name="addRowButton" />
                        </DxToolbar>
                    </DxDataGrid>
                    <div class="form-item">
                        <label class="red">장기요양기관등록번호 :</label>
                        <a-input placeholder="09xx-xxx-xxx" v-model:value="dataInputCallApi.numberPhone" />
                    </div>
                    <div class="form-item">
                        <label class="red">부가서비스</label>
                        <a-checkbox v-model:checked="dataInputCallApi.agentService">회계입력대행서비스</a-checkbox>
                    </div>
                </div>
                <div class="form-group">
                    <label>2. 원천서비스 신청</label>
                    <div class="list-checkbox">
                        <a-radio-group v-model:value="dataInputCallApi.applicationService">
                            <a-radio :value="'신청합니다'">신청합니다</a-radio>
                            <a-radio :value="'신청하지 않습니다'">신청하지 않습니다</a-radio>
                        </a-radio-group>
                    </div>

                    <div class="date-picker">
                        <label class="red">서비스 시작년월 :</label>
                        <a-date-picker placeholder="날짜 선택" v-model="dataInputCallApi.dateStartService"
                            @change="dataInputCallApi.dateStartService = moment($event.$d).format('YYYY-MM-DD')" />
                    </div>

                    <div class="form-item">
                        <label class="red">장기요양기관등록번호 :</label>
                        <a-input placeholder="장기요양기관등록번호" v-model:value="dataInputCallApi.registrationNumber" />
                    </div>
                    <div class="form-item">
                        <label>부가서비스</label>
                        <a-checkbox v-model:checked="dataInputCallApi.declarationService">4대보험신고서비스</a-checkbox>
                    </div>
                </div>
                <div class="form-group">
                    <label>3. CMS (자동이체출금) 계좌 정보 입력</label>
                    <div class="form-item">
                        <label class="red">서비스 시작년월 :</label>
                        <a-select v-model:value="dataInputCallApi.bankName">
                            <a-select-option value="은행선택">은행선택</a-select-option>
                            <a-select-option value="농협">농협</a-select-option>
                            <a-select-option value="신한은행">신한은행</a-select-option>
                            <a-select-option value="우리은행">우리은행</a-select-option>
                            <a-select-option value="기업은행">기업은행</a-select-option>
                            <a-select-option value="카카오뱅크">카카오뱅크</a-select-option>
                        </a-select>
                    </div>
                    <div class="form-item">
                        <label class="red">출금계좌번호 :</label>
                        <a-input placeholder="출금계좌번호" v-model:value="dataInputCallApi.numberAccount" />
                    </div>
                    <div class="form-item">
                        <label class="red">예금주명 :</label>
                        <a-input placeholder="주식회사 타운소프트비나" v-model:value="dataInputCallApi.accountHolder" />
                    </div>
                    <div class="form-item">
                        <label class="red">사업자(주민)등록번호:</label>
                        <a-input class="width-auto" placeholder="예금주의 사업자등록번호 또는 주민등록번호입니다"
                            v-model:value="dataInputCallApi.numberBusiness" />
                        <p>예금주의 사업자등록번호 또는 주민등록번호입니다</p>
                    </div>
                    <div class="form-item">
                        <label class="red">자동이체출금일자 :</label>
                        <a-radio-group v-model:value="dataInputCallApi.debtWithdrawalDate">
                            <a-radio :value="'매월 5일'">매월 5일</a-radio>
                            <a-radio :value="'매월 12일'">매월 12일</a-radio>
                            <a-radio :value="'매월 19일'">매월 19일</a-radio>
                        </a-radio-group>
                    </div>
                </div>
                <div class="form-group">
                    <label>4. 기타</label>
                    <div class="form-item">
                        <label>영업관리담당 :</label>
                        <a-select v-model:value="dataInputCallApi.salesAgent">
                            <a-select-option value="은행선택">A 대리점</a-select-option>
                            <a-select-option value="농협">농협</a-select-option>
                            <a-select-option value="신한은행">C 영업사원</a-select-option>
                            <a-select-option value="우리은행">D 영업사원</a-select-option>
                            <a-select-option value="E 본사영업사원">E 본사영업사원</a-select-option>
                        </a-select>
                    </div>
                    <div class="form-item">
                        <label>전달사항 :</label>
                        <a-textarea v-model:value="dataInputCallApi.note" placeholder="전달사항입력" allow-clear />
                    </div>
                </div>
            </template>
            <template v-if="step === 3">
                <p class="mt-3">
                    ⁙ 귀하의 신청내용을 확인하신 후 아래 신청 버튼을 누르시면 신청이 완료됩니다.<br>
                    ( 만약, 수정할 사항이 있는 경우 이전 버튼을 누르셔서 수정하시기 바랍니다. )

                </p>
            </template>
            <a-modal v-model:visible="visible" :mask-closable="false" ok-text="확인" cancel-text="">
                <template #footer>
                    <a-button key="submit" type="primary" @click="handleOk">확인</a-button>
                </template>
                <h4>신청완료!!!</h4>
                <p>서비스 가입신청이 완료되었습니다.</p>
            </a-modal>
            <div class="group-button">
                <a-button v-if="step > 0" type="secondary" @click="prevStep">이 전 </a-button>
                <a-button v-if="step < 3" type="primary" @click="nextStep">다음 </a-button>
                <a-button v-if="step === 3" type="primary" @click="openPopup()">신 청 </a-button>
            </div>
        </div>
    </div>
</template>
<script >
import { computed, reactive, ref, onMounted } from 'vue';
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';
import moment from 'moment'
import { employees, states } from './data.js';
import { useMutation } from "@vue/apollo-composable";
import mutations from "../../graphql/mutations/RqContract/index";

import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxEditing,
    DxSelection,
    DxLookup,
    DxToolbar,
    DxItem,
    DxTexts

} from "devextreme-vue/data-grid"
import { DxButton } from 'devextreme-vue/button';
export default {
    components: {
        CheckOutlined,
        EditOutlined,
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxEditing,
        DxSelection,
        DxLookup,
        DxToolbar,
        DxItem,
        DxTexts,
        DxButton
    },
    data() {
        return {
            step: 0,
            visible: false,
            radio: '',
            radio1: '',
            radio2: '',
            radio3: '',
            radio4: '',
            dataInputCallApi: {
                dossier: '',
                businessActivities: [
                    {
                        key: '0',
                        name: '가나다라마바 사업',
                        select: "주•야간보호",
                        date: '2022-08-25',
                        number: '10'
                    }, {
                        key: '1',
                        name: '다라마 사업',
                        select: "방문요양",
                        date: '2022-08-25',
                        number: '10'
                    },
                    {
                        key: '2',
                        name: '사하자차카타파하 사업',
                        select: '방문간호',
                        date: '2022-08-25',
                        number: '10'
                    }
                ],
                numberPhone: "",
                agentService: false,
                applicationService: '',
                dateStartService: '2022-10-10',
                registrationNumber: '',
                declarationService: false,
                bankName: '은행선택',
                numberAccount: '',
                accountHolder: '',
                numberBusiness: '',
                debtWithdrawalDate: '매월 5일',
                salesAgent: 'A 대리점',
                note: '',

            },
            dataModal: employees,
            states,
            dataCallApi: {
                agreements: {
                    terms: true,
                    personalInfo: true,
                    accountingService: true,
                    withholdingService: true,
                },
                company: {
                    name: 'name',
                    zipcode: 'zipcode',
                    roadAddress: 'roadAddress',
                    jibunAddress: 'jibunAddress',
                    addressExtend: 'addressExtend',
                    addressDetail: {
                        bcode: 'bcode',
                        bname: 'bname',
                        buildingCode: 'buildingCode',
                        buildingName: 'buildingName',
                        roadname: 'roadname',
                        roadnameCode: 'roadnameCode',
                        sido: 'sido',
                        sigungu: 'sigungu',
                        sigunguCode: 'sigunguCode',
                        zonecode: 'zonecode',
                    },
                    phone: 'phone',
                    fax: 'fax',
                    licenseFileStorageId: 10,
                    bizNumber: 'bizNumber',
                    // bizType: 'bizType',
                    residentId: 'residentId',
                },
                president: {
                    name: 'name',
                    birthday: 'birthday',
                    mobilePhone: 'mobilePhone',
                    email: 'email@gmail.com',
                },
                accounting: {
                    facilityBusinesses: {
                        longTermCareInstitutionNumber: 'longTermCareInstitutionNumber',
                        facilityBizType: {
                            // 
                        },
                        name: 'name',
                        startYearMonth: 'startYearMonth',
                        capacity: 10,
                        registrationCardFileStorageId: 10,
                    },
                    accountingServiceTypes: {
                        // 
                    }
                },
                withholding: {
                    startYearMonthHolding: 'startYearMonth',
                    capacityHolding: 10,
                    withholdingServiceTypes: {
                        // 
                    }
                },
                cmsBank: {
                    bankType: {
                        // 
                    },
                    accountNumber: 'accountNumber',
                    ownerBizNumber: 'ownerBizNumber',
                    ownerName: 'ownerName',
                    withdrawDay: 'withdrawDay',
                },
                extra: {
                    salesRepresentativeId: 10,
                    comment: 'comment',
                }
            }
        }
    },
    mounted() {
        // useMutation(mutations.customerWorkLogin, () => ({
        //     variables: {
        //         companyId: 5,
        //     },
        // }))
    },
    computed: {
        checkStepTwo() {
            if (this.step === 0) {
                return 'wait'
            } else if (this.step === 1) {
                return 'process'
            } else {
                return 'finish'
            }
        },
        checkStepThree() {
            if (this.step < 2) {
                return 'wait'
            } else if (this.step === 2) {
                return 'process'
            } else {
                return 'finish'
            }
        },
        checkStepFour() {
            if (this.step < 3) {
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
        },
        openPopup() {
            this.visible = true
        },
        handleOk() {
            this.visible = false

            // this.$router.push('/login')
        },

    },

    setup() {
        const {
            mutate: createContract,
            loading,
            onDone: creatDone,
            onError,
        } = useMutation(mutations.creactContract, () => ({
            variables: {

                terms: true,
                personalInfo: true,
                accountingService: true,
                withholdingService: true,


                name: 'name',
                zipcode: 'zipcode',
                roadAddress: 'roadAddress',
                jibunAddress: 'jibunAddress',
                addressExtend: 'addressExtend',

                bcode: 'bcode',
                bname: 'bname',
                buildingCode: 'buildingCode',
                buildingName: 'buildingName',
                roadname: 'roadname',
                roadnameCode: 'roadnameCode',
                sido: 'sido',
                sigungu: 'sigungu',
                sigunguCode: 'sigunguCode',
                zonecode: 'zonecode',

                phone: 'phone',
                fax: 'fax',
                licenseFileStorageId: 10,
                bizNumber: 'bizNumber',
                bizType: 'test',
                residentId: 'residentId',


                name: 'name',
                birthday: 'birthday',
                mobilePhone: 'mobilePhone',
                email: 'email@gmail.com',
                longTermCareInstitutionNumber: 'longTermCareInstitutionNumber',
                name: 'name',
                startYearMonth: 'startYearMonth',
                capacity: 10,
                registrationCardFileStorageId: 10,
                startYearMonth: 'startYearMonth',
                capacity: 10,
                withholdingServiceTypes: [1,2,3],
                accountNumber: 'accountNumber',
                ownerBizNumber: 'ownerBizNumber',
                ownerName: 'ownerName',
                withdrawDay: 'withdrawDay',


                salesRepresentativeId: 10,
                comment: 'comment',

            },
        }));

        creatDone((res) => {
            console.log(res)
        });

        onMounted(() => {
            createContract()
        })

    },
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
    width: 165px;
}

.red {
    color: red;
}

.width-auto {
    width: auto;
}

.form-item ::v-deep button {
    margin-left: 5px;
}

.form-item ::v-deep input,
.form-item ::v-deep .ant-input-affix-wrapper {
    max-width: calc(100% - 165px);
}

.form-item p {
    margin-left: 30px;
    margin-top: 5px;
    margin-bottom: 0;
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

.editable-cell {
    position: relative;
}

.editable-cell .editable-cell-input-wrapper,
.editable-cell .editable-cell-text-wrapper {
    padding-right: 24px;
}

.editable-cell .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
}

.editable-cell .editable-cell-icon,
.editable-cell .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
}

.date-picker label {
    width: 165px;
    display: inline-block;
}

.editable-cell .editable-cell-icon {
    margin-top: 4px;
    display: none;
}

::v-deep .ant-radio-group {
    display: flex;
}

.editable-cell .editable-cell-icon-check {
    line-height: 28px;
}

.editable-cell .editable-cell-icon:hover,
.editable-cell .editable-cell-icon-check:hover {
    color: #108ee9;
}

.editable-cell .editable-add-btn {
    margin-bottom: 8px;
}

.editable-cell:hover .editable-cell-icon {
    display: inline-block;
}

::v-deep .ant-pagination {
    display: none;
}

.group-title {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    position: relative;
    z-index: 20;
}

#gridContainer {
    margin-top: -40px;
}

.mt-3 {
    margin-top: 30px;
}

::v-deep .ant-checkbox-wrapper {
    display: flex;
}

::v-deep .ant-select {
    width: 180px;
}

::v-deep .dx-toolbar-text-auto-hide .dx-button .dx-button-text {
    display: inline-block;
}

.list-checkbox {
    margin-top: 10px;
}
</style>