<template>
    <div id="components-modal-demo-position" >
        <a-modal :visible="modalStatus" title="서비스관리 " centered okText="저장하고 나가기" cancelText="그냥 나가기"
            @cancel="setModalVisible()" width="50%">
            <a-collapse v-model:activeKey="activeKey" accordion>
                <a-collapse-panel key="1" header="이용서비스">
                    <a-form :label-col="labelCol" class="popup-scroll">
                        <a-row>
                            <a-col :span="10">
                                <a-form-item label="총일용료" style="font-weight: bold;">
                                    <a-input v-model:value="formState.totalService" disabled="True" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="8"></a-col>
                            <a-col :span="10">
                                <a-form-item label="회계서비스 이용료" style="padding-left: 50px;">
                                    <a-input v-model:value="formState.accFeeService" disabled="True" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="14"></a-col>
                            <a-col :span="10">
                                <a-form-item label="원천서비스 이용료" style="padding-left: 50px;">
                                    <a-input v-model:value="formState.taxFeeSevice" disabled="True" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="14"></a-col>
                        </a-row>
                        <hr>
                        <a-row>
                            <a-col :span="12">
                                <a-form-item label="회계서비스" style="font-weight: bold">
                                    <input type="checkbox" value="regist"> 회계서비스 신청
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <div>
                            <a-card title="⁙ 운영사업" :bordered="false" style="width: 100%"
                                :headStyle="{padding: '5px',color: 'red'}" bodyStyle="padding: 0px 0px">
                                <template #extra>
                                    <a-button type="text" @click="handleCopy()">
                                        <PlusOutlined :style="{fontSize: '20px', color: '#08c'}" />
                                    </a-button>
                                </template> 
                                <a-table :columns="columns" :data-source="dataTable" :pagination="false"
                                    :bordered="true" class="table-scroll">
                                    <template #headerCell="{ column }">
                                        <template v-if="column.key === '사업명'">
                                            <span> 사업명 (중복불가) </span>
                                        </template>
                                    </template>
                                    <template #bodyCell="{ column, record }">
                                        <template v-if="column.key === '사업명'">
                                            <a>
                                                {{ record.사업명 }}
                                            </a>
                                        </template>
                                        <template v-else-if="column.key === '사업분류'">
                                            <span>
                                                <a-select ref="select" value="주.야간보호" style="width: 200px">
                                                    <a-select-option value="방문요양">방문요양</a-select-option>
                                                    <a-select-option value="인지활동형 방문요양">인지활동형 방문요양</a-select-option>
                                                    <a-select-option value="방문간호">방문간호</a-select-option>
                                                    <a-select-option value="방문목욕">방문목욕</a-select-option>
                                                    <a-select-option value="단기보호">단기보호</a-select-option>
                                                    <a-select-option value="복지용구">복지용구</a-select-option>
                                                </a-select>
                                            </span>
                                        </template>
                                        <template v-else-if="column.key === '서비스시작년월'">
                                            <span>
                                                <CustomDatepicker :valueDate="record.서비스시작년월" />
                                            </span>
                                        </template>
                                        <template v-else-if="column.key === 'action'">
                                            <span>
                                                <a-popconfirm title="Are you sure delete this row?" ok-text="Yes"
                                                    cancel-text="No">
                                                    <a-button type="text" @click="deleteRow(record.key)">
                                                        <minus-circle-outlined />
                                                    </a-button>
                                                </a-popconfirm>
                                            </span>
                                        </template>
                                    </template>
                                </a-table>
                            </a-card>
                        </div>
                        <a-row>
                            <a-col :span="14">
                                <a-form-item label="회계서비스 이용료:" style="margin-top: 10px; font-weight: bold">
                                    <a-input v-model:value="formState.accFeeService" disabled="True" />
                                </a-form-item>
                            </a-col>
                            <a-coll :span="10"></a-coll>
                            <a-col :span="14">
                                <div style="display: flex;padding-left: 155px;">
                                    <span style="width:180px">
                                        <input type="checkbox" v-model="formState.checkBoxAccBasicFee">
                                        기본이용료</span>
                                    <a-input v-model:value="formState.accBasicFee" />
                                </div>
                            </a-col>
                            <a-col :sapn="10"></a-col>
                            <a-col :span="14">
                                <div style="display: flex; padding-left: 155px; margin-top: 5px;">
                                    <span style="width:180px">
                                        <input type="checkbox" v-model="formState.checkBoxAccInput"> 입력대형
                                    </span>
                                    <a-input v-model:value="formState.accInput" />
                                </div>
                            </a-col>
                            <a-col :span="14">
                                <div style="display: flex;padding-left: 155px; margin-top: 5px;">
                                    <span style="width:180px">
                                        <input type="checkbox" v-model="formState.checkBoxAccConso"> 계좌통합
                                    </span>
                                    <a-input v-model:value="formState.accConsolidation" />
                                </div>
                            </a-col>
                            <a-col :span="14">
                                <div style="display: flex;padding-left: 155px; margin-top: 5px;">
                                    <span style="width:180px">
                                        <input type="checkbox" v-model="formState.checkBoxAcc4wc"> W4C
                                    </span>
                                    <a-input v-model:value="formState.acc4wc" />
                                </div>
                            </a-col>
                        </a-row>


                        <imgUpload :title="titleModal" :imageUrl="imageUrl" />

                    </a-form>
                    <hr>                   
                    <a-row style="padding: 5px">
                        <a-col>
                            <a-form-item label="원천서비스" style="font-weight: bold">
                                <input type="checkbox" value="regist"> 원천서비스 신청
                            </a-form-item>
                        </a-col>
                    </a-row> 
                    
                    <div>
                        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                            <a-form-item label="서비스 시작년월" style="width: 300px">
                                <CustomDatepicker width="30%" valueDate="2022/08/25" />
                            </a-form-item>
                            <a-form-item label="직 원 수">
                                <a-input-number value="10" style="width: 100px" />
                            </a-form-item>
                            <a-form-item label="원천서비스 이용료:">
                                <a-input v-model:value="formState.taxFeeSevice" style="width: 367px" disabled="True" />
                            </a-form-item>
                        </a-form>
                    </div>
                    <a-row>
                        <a-col span="4"></a-col>
                    </a-row>
                    <a-row>
                        <a-coll :span="10"></a-coll>
                        <a-col :span="14">
                            <div style="display: flex;padding-left: 155px;">
                                <span style="width:180px">
                                    <input type="checkbox" v-model="formState.checkBoxBasicFee">
                                    기본이용료</span>
                                <a-input v-model:value="formState.basicFee" />
                            </div>
                        </a-col>
                        <a-coll :span="8"></a-coll>
                        <a-col :span="14">
                            <div style="display: flex;padding-left: 155px; margin-top: 5px;">
                                <span style="width:180px">
                                    <input type="checkbox" v-model="formState.checkBoxMajorInsurance">
                                    4대보험</span>
                                <a-input v-model:value="formState.majorInsurance" />
                            </div>
                        </a-col>
                    </a-row>
                </a-collapse-panel>
                <a-collapse-panel key="2" header="담당매니저/ 영업자">
                    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                        <a-form-item label="담당매니저">
                            <a-select ref="select" value="담당매니저선택" style="width: 200px">
                                <a-select-option value="김매니저 kim5604">김매니저 kim5604</a-select-option>
                                <a-select-option value="유하람 haram.interpreter">유하람 haram.interpreter</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="영업자">
                            <a-select ref="select" value="영업자선택" style="width: 200px">
                                <a-select-option value="장영업">장영업</a-select-option>
                                <a-select-option value="박혁서세">박혁서세</a-select-option>
                                <a-select-option value="강감찬">강감찬</a-select-option>
                                <a-select-option value="달나라 대리점">달나라 대리점</a-select-option>
                                <a-select-option value="타운소프트비나">타운소프트비나</a-select-option>
                                <a-select-option value="다우데이터스스템">다우데이터스스템</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-form>
                </a-collapse-panel>
                <a-collapse-panel key="3" header="메모" class="modal-note">
                    <a-table bordered :data-source="dataSource" :pagination="false">
                        <template #bodyCell="{  text, index }">
                            <div>
                                <div class="title-note">
                                    <div>
                                        Han Aram 수정 2022-09-05 게시 2022-09-05
                                    </div>
                                    <div v-if="index == 0">
                                        <PlusSquareOutlined :style="{ fontSize: '25px'}" @click="handleAdd" />
                                    </div>
                                </div>
                                <div>
                                    <a-textarea placeholder="전달사항입력" allow-clear v-model:value="text.note" />
                                </div>
                                <a-space :size="8" style="margin-top: 7px">
                                    <save-outlined :style="{ fontSize: '20px'}" @click="handleCopy()" />
                                    <DeleteOutlined :style="{ fontSize: '20px'}" @click="handleDelete(text.key)" />
                                </a-space>
                            </div>

                        </template>
                    </a-table>

                </a-collapse-panel>
            </a-collapse>
        </a-modal>

        <a-modal :visible="modalStatusHistory" footer='' @cancel="setModalVisibleHis()" width="1000px">
            <div>
                <DxDataGrid :data-source="dataTableShow" :show-borders="true" key-expr="key">
                    <DxColumn data-field="기록일시" width='150px' />
                    <DxColumn data-field="비고" />
                    <DxColumn data-field="생성일시" />
                    <DxColumn data-field="생성자ID" />
                    <DxColumn data-field="수정일시" />
                    <DxColumn data-field="수성자ID" />
                    <DxColumn data-field="삭제여부" />
                    <DxColumn data-field="IP주소" />
                    <DxColumn data-field="상세" cell-template="detail" />
                    <template>
                        <a-space :size="8">
                            <zoom-in-outlined :style="{ fontSize: '15px'}" />
                        </a-space>
                    </template>
                </DxDataGrid>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts">
import CustomDatepicker from "../../../../../components/CustomDatepicker.vue";
import { ref, defineComponent } from 'vue'
import DxDropDownBox from "devextreme-vue/drop-down-box"
import imgUpload from "../../../../../components/UploadImage.vue"
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection
} from "devextreme-vue/data-grid"

import { UploadOutlined, MinusCircleOutlined, ZoomInOutlined, SaveOutlined, DeleteOutlined, PlusSquareOutlined, WarningFilled, PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { UploadProps } from 'ant-design-vue'

function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
}

export default defineComponent({
    props: {
        modalStatus: Boolean,
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
        PlusOutlined,
        CustomDatepicker
    },
    setup() {
        const loading = ref<boolean>(false)
        const imageUrl = ref<string>('')
        const previewTitle = ref('')
        const fileList = ref<UploadProps['fileList']>([])
        const handleChange = (info: any) => {
            if (info.file.status === 'uploading') {
                loading.value = true
                return
            }
            if (info.file.status === 'done') {
                getBase64(info.file.originFileObj, (base64Url: string) => {
                    imageUrl.value = base64Url
                    loading.value = false
                })
            }
            if (info.file.status === 'error') {
                loading.value = false
                message.error('upload error')
            }
        }
        const beforeUpload = (file: any) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJpgOrPng) {
                message.error('You can only upload JPG file!')
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                message.error('Image must smaller than 2MB!')
            }
            return isJpgOrPng && isLt2M
        }
        const activeKey = ref([])
        const formState = ref({
            name: "",
            name2: "",
            name3: "",
            delivery: false,
            type: [],
            resource: "",
            desc: "",
            totalService: 0,
            accFeeService: 0,
            accBasicFee: "",
            accInput: "",
            accConsolidation: "",
            acc4wc: "",
            basicFee: '',
            majorInsurance: '',
            taxFeeSevice: 0,
            checkBox: true,
            checkBoxAccBasicFee: true,
            checkBoxAccInput: true,
            checkBoxAccConso: true,
            checkBoxAcc4wc: true,
            checkBoxMajorInsurance: true,
            checkBoxBasicFee: true,
        })
        const labelCol = ref({ style: { width: '150px' } })
        const wrapperCol = ref({ span: 14 })
        const radioStyle = ref({
            display: 'flex',
            height: '30px',
            lineHeight: '30px',
        })
        const value = ref<number>(1)
        const dataSource = ref([{
            key: 0,
            note: '',
        }])
        const dataTableShow = ref([{
            'key': 0,
            '기록일시': '2022-09-05 13:52:09',
            '비고': '승인>사업자등록번호 등록',
            '생성일시': '2022-09-05 13:52:09',
            '생성자ID': '@mdo',
            '삭제여부': '1',
            'IP주소': '123.451.342.1'
        }])
        const keyNumber = ref(5)
        const titleModal = "사업자등록증"
        const columns = [
            {
                title: "No",
                dataIndex: "No",
                key: "No",
            },
            {
                name: "사업명 (중복불가)",
                dataIndex: "사업명",
                key: "사업명",
            },
            {
                title: "사업분류",
                dataIndex: "사업분류",
                key: "사업분류",
            },
            {
                title: "서비스시작년월",
                dataIndex: "서비스시작년월",
                key: "서비스시작년월",
            },
            {
                title: "정원수(명)",
                key: "정원수",
                dataIndex: "정원수",
            },
            {
                title: "",
                key: "action",
            },
        ];
        const dataTable = ref([
            {
                key: "1",
                No: "1",
                사업명: "가나다라마바 사업",
                사업분류: "방문요양",
                서비스시작년월: "2015/01/01",
                정원수: 10,

            },
            {
                key: "2",
                No: "2",
                사업명: "가나다라마바 사업",
                사업분류: "방문간호",
                서비스시작년월: "2015/01/01",
                정원수: 10,
            },
            {
                key: "3",
                No: "3",
                사업명: "가나다라마바 사업",
                사업분류: "단기보호",
                서비스시작년월: "2015/01/13",
                정원수: 10,
            },
            {
                key: "4",
                No: "4",
                사업명: "가나다라마바 사업",
                사업분류: "단기보호",
                서비스시작년월: "2015/01/13",
                정원수: 10,
            },
        ]);
        return {
            fileList,
            loading,
            imageUrl,
            handleChange,
            beforeUpload,
            previewTitle,
            activeKey,
            formState,
            labelCol,
            wrapperCol,
            radioStyle,
            value,
            dataSource,
            dataTableShow,
            keyNumber,
            titleModal,
            columns,
            dataTable,
            PlusSquareOutlined,
            PlusOutlined,
        }
    },
    methods: {        
        setModalVisible() {
            this.$emit('closePopup', false)
        },
        setModalVisibleHis() {
            this.$emit('closePopupHis', false)
        },
        getColorTag(data: string) {
            if (data === "신청") {
                return "red"
            } else if (data === "심사중") {
                return "blue"
            } else if (data === "승인") {
                return "green"
            } else if (data === "반려") {
                return "grey"
            }
        },

        handleAdd() {
            this.keyNumber++
            let dataDef = {
                key: this.keyNumber,
                note: '',
            }
            this.dataSource.push(dataDef)
        },
        handleDelete(key: number) {
            if (this.dataSource.length > 1) {
                this.dataSource = this.dataSource.filter(function (obj) {
                    return obj.key != key
                })
            }
        },
        handleCopy() {
           
			this.keyNumber++;
			let dataDef = {
              
                key: this.keyNumber.toString(),
                No: this.keyNumber.toString(),
                사업명: "가나다라마바 사업",
                사업분류: "방문요양",
                서비스시작년월: "2015/01/01",
                정원수: 10,
			};
			this.dataTable.push(dataDef); 
		},
        deleteRow(key: string) {
			for (var i = 0; i < this.dataTable.length; i++) {
				if (this.dataTable[i].key == key) {
					this.dataTable.splice(i, 1);
					break;
				}
			}
		},

    },
    watch: {
        formState: {
            handler(value) {
                if (this.formState.accFeeService != 0 && this.formState.taxFeeSevice != 0) {
                    this.formState.totalService = this.formState.taxFeeSevice + this.formState.accFeeService
                };
                if (this.formState.checkBox == true && this.formState.accBasicFee != '' && this.formState.accConsolidation != '' && this.formState.accInput != '' && this.formState.acc4wc != '') {
                    this.formState.accFeeService = parseInt(this.formState.accBasicFee) + parseInt(this.formState.accConsolidation) + parseInt(this.formState.accInput) + parseInt(this.formState.acc4wc)
                };
                if (this.formState.checkBox == true && this.formState.basicFee != '' && this.formState.majorInsurance != '') {
                    this.formState.taxFeeSevice = parseInt(this.formState.basicFee) + parseInt(this.formState.majorInsurance)
                };
                if (this.formState.checkBoxAccBasicFee == false) {
                    this.formState.accBasicFee = '0'
                };
                if (this.formState.checkBoxAccInput == false) {
                    this.formState.accInput = '0'
                };
                if (this.formState.checkBoxAccConso == false) {
                    this.formState.accConsolidation = '0'
                };
                if (this.formState.checkBoxAcc4wc == false) {
                    this.formState.accConsolidation = '0'
                };
                if (this.formState.checkBoxMajorInsurance == false) {
                    this.formState.majorInsurance = '0'
                };
                if (this.formState.checkBoxBasicFee == false) {
                    this.formState.basicFee = '0'
                };
                if (this.formState.checkBoxAcc4wc == false) {
                    this.formState.acc4wc = '0'
                };
            },
            deep: true,
            immediate: true
        },
    }
})
</script>
<style>
.warring-modal {
    font-size: 13px;
    line-height: 5px;
}

.ant-form-item-label {
    text-align: left;
    /* padding: 10px; */
}

.ant-form-item {
    margin-bottom: 3px;
}

.ant-table-tbody>tr>td {
    padding: 2px 8px
}

.popup-scroll {
    height: 600px;
    border: 1px solid #333;
    overflow-y: auto;
    border: 0ch;  
   }

.table-scroll {
    height: 190px;
    border: 1px solid #333;
    overflow-y: auto;
    padding: 5px;
}
.ant-collapse-content > .ant-collapse-content-box {
    padding: 10px 0px 10px 16px;
}
.input-form {
    margin-top: 5px;
}
.ant-card-extra,.ant-card-head-title {
    padding: 0;
}
</style>
