<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" title="서비스관리 " centered okText="저장하고 나가기" cancelText="그냥 나가기"
            @cancel="setModalVisible()" width="50%">
            <a-collapse v-model:activeKey="activeKey" accordion>
                <a-collapse-panel key="1" header="이용서비스" class="popup-scroll">
                    <a-form :label-col="labelCol" style="height: 500px">
                        <a-row>
                            <a-col :span="10">
                                <a-form-item label="총일용료" style="font-weight: bold;">
                                    <!-- <InpuNumber :typeInput="'2'" /> -->
                                    <a-input v-model:value="formState.totalService" disabled="True"
                                        :format="amountFormat" data-type="number" />
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

                            </a-card>
                            <div id="data-grid-demo">
                                <DxDataGrid id="gridContainer" :data-source="dataModal" :show-borders="true"
                                    :selected-row-keys="selectedItemKeys">
                                    <DxEditing :use-icons="true" :allow-updating="true" :allow-adding="true"
                                        :allow-deleting="true" template="button-template" mode="cell" />
                                    <template #button-template>
                                        <DxButton icon="plus" />
                                    </template>
                                    <DxPaging :enabled="false" />
                                    <DxColumn :width="35" data-field="No" caption="#" />
                                    <DxColumn data-field="사업명" caption="사업명 (중복불가)" />
                                    <DxColumn :width="225" data-field="StateID" caption="사업분류">
                                        <DxLookup :data-source="states" value-expr="ID" display-expr="Name" />
                                    </DxColumn>
                                    <DxColumn data-field="서비스시작년월" data-type="date" />
                                    <DxColumn :width="100" data-field="정원수" caption="정원수 (명)" />
                                    <DxToolbar>
                                        <DxItem name="addRowButton" />
                                    </DxToolbar>
                                </DxDataGrid>
                            </div>

                        </div>

                        <a-row>
                            <a-col :span="14">
                                <a-form-item label="회계서비스 이용료:" style="margin-top: 10px; font-weight: bold">
                                    <p>{{$filters.formatCurrency(total1)}}</p>
                                </a-form-item>
                            </a-col>
                            <a-coll :span="10"></a-coll>
                            <a-col :span="14">
                                <div style="display: flex;padding-left: 155px;">
                                    <span style="width:116px">


                                        <input type="checkbox" v-model="formState.checkBoxAccBasicFee"
                                            @change="handleInputACCService()">
                                        기본이용료
                                    </span>
                                    <DxNumberBox
                                    v-model="formState.numberBox1"
                                    :format="'#,##0'" />
                                    

                                    <!-- <a-input v-model:value="formState.accBasicFee" @change="handleInputACCService()" /> -->
                                </div>
                            </a-col>
                            <a-col :sapn="10"></a-col>
                            <a-col :span="14">
                                <div style="display: flex; padding-left: 155px; margin-top: 5px;">
                                    <span style="width:180px">
                                        <input type="checkbox" v-model="formState.checkBoxAccInput"
                                            @change="handleInputACCService()"> 입력대형
                                    </span>

                                    <DxNumberBox
                                    v-model="formState.numberBox2"
                                    :format="'#,##0'" />
                                    <!-- <a-input v-model:value="formState.accInput" @change="handleInputACCService()" /> -->
                                </div>
                            </a-col>
                            <a-col :span="14">
                                <div style="display: flex;padding-left: 155px; margin-top: 5px;">
                                    <span style="width:180px">
                                        <input type="checkbox" v-model="formState.checkBoxAccConso"
                                            @change="handleInputACCService()"> 계좌통합
                                    </span>

                                    <DxNumberBox
                                    v-model="formState.numberBox3"
                                    :format="'#,##0'" />
                                    <!-- <a-input v-model:value="formState.accConsolidation"
                                        @change="handleInputACCService()" /> -->
                                </div>
                            </a-col>
                            <a-col :span="14">
                                <div style="display: flex;padding-left: 155px; margin-top: 5px; margin-bottom: 10px;">
                                    <span style="width:180px">
                                        <input type="checkbox" v-model="formState.checkBoxAcc4wc"
                                            @change="handleInputACCService()"> W4C
                                    </span>
                                    <DxNumberBox
                                    v-model="formState.numberBox4"
                                    :format="'#,##0'" />
                                    <!-- <a-input v-model:value="formState.acc4wc" @change="handleInputACCService()" /> -->
                                </div>
                            </a-col>
                        </a-row>
                        <imgUpload :title="titleModal" :imageUrl="imageUrl" />
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
                                <a-form-item label="서비스 시작년월" style="width: 270px">
                                    <CustomDatepicker width="30%" valueDate="2022/08/25" />
                                </a-form-item>
                                <a-form-item label="직 원 수">
                                    <a-input-number type='number' v-model:value="직원수" style="width: 120px" />
                                </a-form-item>
                                <a-form-item label="원천서비스 이용료:">
                                    <a-input v-model:value="formState.taxFeeSevice" style="width: 353px"
                                        disabled="True" />
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
                                        <input type="checkbox" v-model="formState.checkBoxBasicFee" />
                                        기본이용료</span>
                                    <inputFormat @valueInput="changeValueInputEmit" :format="'#,##0'"
                                        :spinButtons="false" :clearButton="false" :nameService="'basicFee'"
                                        style="width: 360px;" />
                                    <!-- <a-input v-model:value="formState.basicFee" @change="handleInputTexService()" /> -->
                                </div>
                            </a-col>
                            <a-coll :span="8"></a-coll>
                            <a-col :span="14">
                                <div style="display: flex;padding-left: 155px; margin-top: 5px; margin-bottom: 10px;">
                                    <span style="width:180px">
                                        <input type="checkbox" v-model="formState.checkBoxMajorInsurance">
                                        4대보험</span>
                                    <inputFormat @valueInput="changeValueInputEmit" :format="'#,##0'"
                                        :spinButtons="false" :clearButton="false" :nameService="'majorInsurance'"
                                        style="width: 360px;" />
                                    <!-- <a-input v-model:value="formState.majorInsurance" -->
                                    <!-- @change="handleInputTexService()" /> -->
                                </div>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-collapse-panel>
                <a-collapse-panel key="2" header="담당매니저/ 영업자">
                    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                        <a-form-item label="담당매니저">
                            <a-select ref="select" v-model:value="담당자선택" style="width: 200px">
                                <a-select-option value="김매니저 kim5604">김매니저 kim5604</a-select-option>
                                <a-select-option value="유하람 haram.interpreter">유하람 haram.interpreter</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="영업자">
                            <a-select ref="select" v-model:value="영업자선택" style="width: 200px">
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
                <a-collapse-panel key="3" header="메모" :extra="dataSource.length > 0? dataSource.length: ''" :style="{position: 'relative'}">
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
                <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="key">
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
                <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="cell" />
                <DxPaging :enabled="false" />
                <DxSelection mode="multiple" />
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts">
import CustomDatepicker from "../../../../../components/CustomDatepicker.vue";
import { ref, defineComponent } from 'vue'
import DxDropDownBox from "devextreme-vue/drop-down-box"
import imgUpload from "../../../../../components/UploadImage.vue"
import DxNumberBox from 'devextreme-vue/number-box';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxEditing,
    DxSelection,
    DxLookup,
    DxToolbar,
    DxItem,

} from "devextreme-vue/data-grid"
import { DxButton } from 'devextreme-vue/button';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { employees, states } from './data.js';
import { UploadOutlined, MinusCircleOutlined, ZoomInOutlined, SaveOutlined, DeleteOutlined, PlusSquareOutlined, WarningFilled, PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import inputFormat from '../../../../../components/inputBoxFormat.vue'
import type { UploadProps } from 'ant-design-vue'


function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
}

export default defineComponent({
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
        CustomDatepicker,
        DxEditing,
        DxLookup,
        DxButton,
        DxToolbar,
        DxItem,
        inputFormat,
        DxNumberBox
    },
    props: {
        modalStatus: Boolean,
        modalStatusHistory: Boolean,

    },

    data() {
        return {
            amountFormat: { currency: 'VND', useGrouping: true },
            담당자선택: "담당자선택",
            영업자선택: "영업자선택",
            직원수: '직원수',
            selectionChanged: (data: any) => {
                this.selectedItemKeys = data.selectedRowKeys;
            },
            dataModal: employees,
            dataTable: new DataSource({
                store: new ArrayStore({
                    data: employees,
                    key: 'ID',
                }),
            }),
            selectedItemKeys: [],
            states,
           
        }
    },
    computed: {
        total1() {
            return this.formState.numberBox1 + this.formState.numberBox2 + this.formState.numberBox3 + this.formState.numberBox4
        },
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
        addNew() {
            let add =
            {
                ID: 5,
                No: "5",
                사업명: "가나다라마바 사업",
                StateID: 4,
                서비스시작년월: "2015/01/13",
                정원수: 10,
            }
            this.dataModal.push(add)
            console.log(this.dataModal);


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
                this.dataSource = this.dataSource.filter(function (obj: { key: number; }) {
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
        },

        handleInputACCService() {
            let accBasicFee = this.formState.accBasicFee == '' ? 0 : parseInt(this.formState.accBasicFee);
            let accConsolidation = this.formState.accConsolidation == '' ? 0 : parseInt(this.formState.accConsolidation);
            let accInput = this.formState.accInput == '' ? 0 : parseInt(this.formState.accInput);
            let acc4wc = this.formState.acc4wc == '' ? 0 : parseInt(this.formState.acc4wc);

            this.formState.accFeeService = accBasicFee + accConsolidation + accInput + acc4wc;
        },
        handleInputTexService() {
            let basicFee = this.formState.basicFee == '' ? 0 : parseInt(this.formState.basicFee);
            let majorInsurance = this.formState.majorInsurance == '' ? 0 : parseInt(this.formState.majorInsurance);
            this.formState.taxFeeSevice = basicFee + majorInsurance;
        },
        changeValueInputEmit(data: any) {
            if (data.name === 'accBasicFee') {
                this.formState.accBasicFee = data.value
                this.handleInputACCService()
            }
            if (data.name === 'accInput') {
                this.formState.accInput = data.value
                this.handleInputACCService()
            }
            if (data.name === 'accConsolidation') {
                this.formState.accConsolidation = data.value
                this.handleInputACCService()
            }
            if (data.name === 'acc4wc') {
                this.formState.acc4wc = data.value
                this.handleInputACCService()
            }
            if (data.name === 'majorInsurance') {
                this.formState.majorInsurance = data.value
                this.handleInputACCService()
            }
            if (data.name === 'basicFee') {
                this.formState.basicFee = data.value
                this.handleInputACCService()
            }
        }


    },
    watch: {
        // formState: {
        //     handler() {
        //         if (this.formState.accFeeService != 0 && this.formState.taxFeeSevice != 0) {

        //             this.formState.totalService = this.formState.taxFeeSevice + this.formState.accFeeService
        //         };
        //         if (this.formState.checkBox == true && this.formState.accBasicFee != '' && this.formState.accConsolidation != '' && this.formState.accInput != '' && this.formState.acc4wc != '') {
        //             this.formState.accFeeService = parseInt(this.formState.accBasicFee) + parseInt(this.formState.accConsolidation) + parseInt(this.formState.accInput) + parseInt(this.formState.acc4wc)
        //         };
        //         if (this.formState.checkBox == true && this.formState.basicFee != '' && this.formState.majorInsurance != '') {
        //             this.formState.taxFeeSevice = parseInt(this.formState.basicFee) + parseInt(this.formState.majorInsurance)
        //         };

        //         if (this.formState.checkBoxAccBasicFee == false) {
        //             this.formState.accBasicFee = '0'
        //             let data = (document.querySelector(".accBasicFee div div input") as HTMLInputElement)
        //             data.value = '0'
        //             this.handleInputACCService()
        //         }
        //         if (this.formState.checkBoxAccInput == false) {
        //             this.formState.accInput = '0'
        //             let data = (document.querySelector(".accInput div div input") as HTMLInputElement)
        //             data.value = '0'
        //             this.handleInputACCService()
        //         }
        //         if (this.formState.checkBoxAcc4wc == false) {
        //             this.formState.acc4wc = '0'
        //             let data = (document.querySelector(".acc4wc div div input") as HTMLInputElement)
        //             data.value = '0'
        //             this.handleInputACCService()
        //         }
        //         if (this.formState.checkBoxAccConso == false) {
        //             this.formState.accConsolidation = '0'
        //             let data = (document.querySelector(".accConsolidation div div input") as HTMLInputElement)
        //             data.value = '0'
        //             this.handleInputACCService()
        //         }
        //         if (this.formState.checkBoxMajorInsurance == false) {
        //             this.formState.majorInsurance = '0'
        //             let data = (document.querySelector(".majorInsurance div div input") as HTMLInputElement)
        //             data.value = '0'
        //             this.handleInputACCService()
        //         }
        //         if (this.formState.checkBoxBasicFee == false) {
        //             this.formState.basicFee = '0'
        //             let data = (document.querySelector(".basicFee div div input") as HTMLInputElement)
        //             data.value = '0'
        //             this.handleInputACCService()
        //         }
        //     },
        //     deep: true,
        //     immediate: true
        // },
        'formState.checkBoxAccBasicFee'(newVal){
            if(newVal === false) {
                this.formState.numberBox1 = 0
            }
        },
        'formState.checkBoxAccInput'(newVal){
            if(newVal === false) {
                this.formState.numberBox2 = 0
            }
        },
        'formState.checkBoxAccConso'(newVal){
            if(newVal === false) {
                this.formState.numberBox3 = 0
            }
        },
        'formState.checkBoxAcc4wc'(newVal){
            if(newVal === false) {
                this.formState.numberBox4 = 0
            }
        }
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
        const activeKey = ref([1])
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
            numberBox1: 0,
            numberBox2: 0,
            numberBox3: 0,
            numberBox4: 0
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
                dataIndex: "정원수",
                key: "정원수",
            },
            {
                title: "",
                key: "action",
            },
        ];
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
            PlusSquareOutlined,
            PlusOutlined,
        }
    },
})
</script>
<style scoped>
.warring-modal {
    font-size: 13px;
    line-height: 5px;
}

::v-deep .dx-select-checkbox {
    display: inline-block !important;
}

::v-deep .ant-form-item-label {
    text-align: left;
}

.ant-form-item {
    margin-bottom: 3px;
}

.ant-table-tbody>tr>td {
    padding: 2px 8px
}

.popup-scroll {
    /* height: 600px; */
    /* border: 1px solid #333; */
    overflow-y: auto;
}

.table-scroll {
    height: 190px;
    border: 1px solid #333;
    overflow-y: auto;
    padding: 5px;
}

.ant-collapse-content>.ant-collapse-content-box {
    padding: 10px 0px 10px 16px;
}

.input-form {
    margin-top: 5px;
}

.ant-card-extra,
.ant-card-head-title {
    padding: 0;
}
::v-deep .ant-badge-not-a-wrapper {
    position: absolute;
    left: 77px;
    top: 12px;
    z-index: 5;
}
.data-grid-demo {
    min-height: 700px;
}

.gridDeleteSelected {
    position: absolute;
    z-index: 1;
    right: 0;
    margin: 1px;
    top: 0;
}

.gridDeleteSelected .dx-button-text {
    line-height: 0;
}
</style>
