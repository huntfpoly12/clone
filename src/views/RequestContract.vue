
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
                            <label class="red">연럭처 :</label>
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
                <label>1. 회계서비스 신청</label>
                <div class="list-checkbox">
                    <a-radio v-model:value="value1">신청합니다</a-radio>
                    <a-radio v-model:value="value2">신청하지 않습니다.</a-radio>
                </div>
                <div class="group-title">
                     <p class="red">⁙ 운영사업</p>
                    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">추 가</a-button>
                </div>
                <a-table bordered :data-source="dataSource" :columns="columns" pagination= false >
                    <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'name'">
                        <div class="editable-cell">
                        <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                            <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)" />
                            <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
                        </div>
                        <div v-else class="editable-cell-text-wrapper">
                            {{ text || ' ' }}
                            <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
                        </div>
                        </div>
                    </template>
                    <template v-else-if="column.dataIndex === 'select'">
                        <a-select
                            ref="select"
                            v-model:value="value1"
                            style="width: 120px"
                            >
                            <a-select-option value="주•야간보호">주•야간보호</a-select-option>
                            <a-select-option value="방문요양">방문요양</a-select-option>
                            <a-select-option value="인지활동형 방문요양">인지활동형 방문요양</a-select-option>
                            <a-select-option value="방문간호" >방문간호</a-select-option>
                            <a-select-option value="단기보호">단기보호</a-select-option>
                            <a-select-option value="복지용구">복지용구</a-select-option>
                        </a-select>
                    </template>
                    <template v-else-if="column.dataIndex === 'date'">
                        <a-date-picker />
                    </template>
                    <template v-if="column.dataIndex === 'number'">
                        <div class="editable-cell">
                        <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                            <a-input v-model:value="editableData[record.key].number" @pressEnter="save(record.key)" />
                            <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
                        </div>
                        <div v-else class="editable-cell-text-wrapper">
                            {{ text || ' ' }}
                            <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
                        </div>
                        </div>
                    </template>
                    <template v-else-if="column.dataIndex === 'operation'">
                        <a-popconfirm
                        v-if="dataSource.length"
                        title="정말 삭제 하시겠습니까?"
                        @confirm="onDelete(record.key)"
                        >
                        <a>삭 제</a>
                        </a-popconfirm>
                    </template>
                    </template>
                </a-table>
                <div class="form-item">
                    <label class="red">장기요양기관등록번호 :</label>
                    <a-input placeholder="0123456789" />
                </div>
                <div class="form-item">
                    <label class="red">부가서비스</label>
                    <a-checkbox v-model:checked="checked">회계입력대행서비스</a-checkbox>
                </div>
                <label>2. 원천서비스 신청</label>
                <div class="list-checkbox">
                    <a-radio v-model:checked="checked">신청합니다</a-radio>
                    <a-radio v-model:checked="checked">신청하지 않습니다</a-radio>
                </div>
                <div class="date-picker">
                    <label class="red">서비스 시작년월 :</label>
                    <a-date-picker />
                </div>
                
                <div class="form-item">
                    <label class="red">직원수 :</label>
                    <a-input placeholder="10" />
                </div>
                <div class="form-item">
                    <label>부가서비스</label>
                    <a-checkbox v-model:checked="checked">4대보험신고서비스</a-checkbox>
                </div>
                <label>3. CMS (자동이체출금) 계좌 정보 입력</label>
                <div class="form-item">
                    <label class="red">출금은행 :</label>
                    <a-select v-model:value="value1">
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
                    <a-input placeholder="100100056489011" />
                </div>
                <div class="form-item">
                    <label class="red">예금주명 :</label>
                    <a-input placeholder="주식회사 타운소프트비나" />
                </div>
                <div class="form-item">
                    <label class="red">사업자(주민)등록번호:</label>
                    <a-input class="width-auto" placeholder="예금주의 사업자등록번호 또는 주민등록번호입니다" />
                    <p>예금주의 사업자등록번호 또는 주민등록번호입니다</p>
                </div>
                 <div class="form-item">
                    <label class="red">자동이체출금일자 :</label>
                    <a-radio v-model:checked="checked">매월 5일</a-radio>
                    <a-radio v-model:checked="checked">매월 12일</a-radio>
                    <a-radio v-model:checked="checked">매월 19일</a-radio>
                </div>
                <label>4. 기타</label>
                 <div class="form-item">
                    <label>영업관리담당 :</label>
                    <a-select v-model:value="value1">
                        <a-select-option value="은행선택">A 대리점</a-select-option>
                        <a-select-option value="농협">농협</a-select-option>
                        <a-select-option value="신한은행">C 영업사원</a-select-option>
                        <a-select-option value="우리은행">D 영업사원</a-select-option>
                        <a-select-option value="E 본사영업사원">E 본사영업사원</a-select-option>
                    </a-select>
                </div>
                <div class="form-item">
                    <label>전달사항 :</label>
                     <a-textarea v-model:value="value2" placeholder="//전달사항입력" allow-clear />
                </div>
            </template>
            <template v-if="step===3">
                <p class="mt-3">
                    ⁙ 귀하의 신청내용을 확인하신 후 아래 신청 버튼을 누르시면 신청이 완료됩니다.<br>
                    ( 만약, 수정할 사항이 있는 경우 이전 버튼을 누르셔서 수정하시기 바랍니다. )

                </p>
            </template>
            <a-modal v-model:visible="visible" 
            ok-text="확인"
            cancel-text="" 
           >
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
import { computed, reactive, ref } from 'vue';
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';
export default {
    components: {
        CheckOutlined,
        EditOutlined,
    },
    data() {
        return {
            step: 0,
            value1: '주•야간보호',
            visible: false
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
        },
        openPopup() {
            this.visible = true
        },
        handleOk() {
            this.visible = false
            this.$router.push('/login')
        }
    },
      setup() {
    const columns = [{
      title: '#',
      dataIndex: 'key',
    }, 
    {
      title: '사업명 (중복불가)',
      dataIndex: 'name',
    },
     {
      title: '사업분류',
      dataIndex: 'select',
    },
    {
      title: '서비스시작년월',
      dataIndex: 'date',
    }, 
    {
      title: '정원수(명)',
      dataIndex: 'number',
    },
    {
      title: '',
      dataIndex: 'operation',
    }];
    const dataSource = ref([{
      key: '0',
      name: '가나다라마바 사업',
      select: 32,
      date: '2022-08-25',
      number: '10'
    }, {
      key: '1',
      name: '다라마 사업',
      select: 32,
      date: '2022-08-25',
      number: '10'
    },
    {
      key: '2',
      name: '사하자차카타파하 사업',
      select: 32,
      date: '2022-08-25',
      number: '10'
    }
    ]);
    const count = computed(() => dataSource.value.length + 1);
    const editableData = reactive({});

    const edit = key => {
      editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
    };

    const save = key => {
      Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
      delete editableData[key];
    };

    const onDelete = key => {
      dataSource.value = dataSource.value.filter(item => item.key !== key);
    };

    const handleAdd = () => {
      const newData = {
        key: `${count.value}`,
        name: `Edward King ${count.value}`,
        select: 32,
        date: `London, Park Lane no. ${count.value}`,
        number: '10',
      };
      dataSource.value.push(newData);
    };

    return {
      columns,
      onDelete,
      handleAdd,
      dataSource,
      editableData,
      count,
      edit,
      save,
    };
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
    .form-item ::v-deep input {
        max-width: calc(100% - 165px);
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
    .editable-cell .editable-cell-input-wrapper, .editable-cell .editable-cell-text-wrapper {
        padding-right: 24px;
    }
    .editable-cell .editable-cell-text-wrapper {
        padding: 5px 24px 5px 5px;
    }
    .editable-cell .editable-cell-icon, .editable-cell .editable-cell-icon-check {
        position: absolute;
        right: 0;
        width: 20px;
        cursor: pointer;
    }
    .date-picker label {
        width: 165px;
    }
    .editable-cell .editable-cell-icon {
        margin-top: 4px;
        display: none;
    }
    .editable-cell .editable-cell-icon-check {
        line-height: 28px;
    }
    .editable-cell .editable-cell-icon:hover, .editable-cell .editable-cell-icon-check:hover {
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
    }
    .mt-3 {
        margin-top: 30px;
    }
    :v-deep .ant-modal-footer .ant-btn {
        display: none;
    }
    :v-deep .ant-modal-footer .ant-btn.ant-btn-primary {
        display: block;
    }
    .list-checkbox {
        margin-top: 10px;
    }
</style>