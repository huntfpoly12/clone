<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" title="계약정보관리&심사 " centered okText="저장하고 나가기" cancelText="그냥 나가기"
            @cancel="setModalVisible()" width="50%">
            <a-collapse v-model:activeKey="activeKey" accordion>
                <a-collapse-panel key="1" header="사업자정보">
                    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                        <a-form-item label="상 호">
                            <a-input v-model:value="formState.name" />
                        </a-form-item>
                        <a-form-item label="사업자등록번호">
                            <a-input v-model:value="formState.name" style="width: 300px" />
                        </a-form-item>

                        <a-row>
                            <a-col :span="12">
                                <a-form-item label="사업자유형">
                                    <a-radio-group v-model:value="formState.resource">
                                        <a-radio value="1">법인사업자</a-radio>
                                        <a-radio value="2">개인사업자</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="{ $id no }">
                                    <a-input value="800123-1234567" style="width: 300px" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-form-item label="주소">
                            <a-row :gutter="[0,16]">
                                <a-col :span="24">
                                    <a-row>
                                        <a-col :span="12">
                                            <a-input v-model:value="formState.name" style="width: 300px" />
                                        </a-col>
                                        <a-col :span="12">
                                            <a-button type="primary">우편번호 검색</a-button>
                                        </a-col>
                                    </a-row>
                                </a-col>
                                <a-col :span="24">
                                    <a-row>
                                        <a-input v-model:value="formState.name" />
                                    </a-row>
                                </a-col>
                                <a-col :span="24">
                                    <a-row>
                                        <a-input v-model:value="formState.name" />
                                    </a-row>
                                </a-col>
                            </a-row>
                            <a-row>
                            </a-row>
                        </a-form-item>
                        <a-row :gutter="[16,16]">
                            <a-col :span="18">
                                <a-form-item label="연락처">
                                    <a-input v-model:value="formState.desc" />
                                </a-form-item>
                                <a-form-item label="팩 스">
                                    <a-input v-model:value="formState.desc" />
                                </a-form-item>
                                <a-form-item label="사업자등록증">
                                    <a-upload v-model:file-list="fileList" name="file" :multiple="false"
                                        :headers="headers" @change="handleChange">
                                        <a-button>
                                            <upload-outlined></upload-outlined>
                                            파일선택...
                                        </a-button>
                                    </a-upload>
                                </a-form-item>

                                <div :style="{fontSize:'12px'}">
                                    <a-row>
                                        <div>
                                            icon
                                        </div>
                                        <div>
                                            <p>아래 형식에 맞는 이미지파일을 선택한 후 업로드하십시요.</p>
                                            <p>파일형식 : PDF, JPG(JPEG), TIF, GIF, PNG</p>
                                            <p>파일용량 : 최대 5MB</p>
                                        </div>
                                    </a-row>

                                </div>


                            </a-col>
                            <a-col :span="6">
                                <a-image :preview="false" :width="200"
                                    src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
                            </a-col>
                        </a-row>

                    </a-form>
                </a-collapse-panel>
                <a-collapse-panel key="2" header="대표자정보">
                    <a-form :label-col="labelCol" ref="formRef" name="custom-validation" :rules="rules" v-bind="layout">
                        <a-form-item has-feedback label="대표자명">
                            <a-input value="홍길동" autocomplete="off" style="width: 300px" />
                        </a-form-item>
                        <a-form-item has-feedback label="생년월일">
                            <a-input value="19620820" autocomplete="off" style="width: 300px" />
                        </a-form-item>
                        <a-form-item has-feedback label="휴대폰번호">
                            <a-input-number value="01098765432" style="width: 200px" />
                        </a-form-item>
                        <a-form-item has-feedback label="이메일">
                            <a-input value="abc123@mailaddress.com" />
                        </a-form-item>
                    </a-form>
                </a-collapse-panel>
                <a-collapse-panel key="3" header="CMS (자동이체출금) 계좌 정보 입력">
                    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                        <a-form-item label="출금은행">
                            <a-select ref="select" value="은행선택" style="width: 200px">
                                <a-select-option value="은행선택">은행선택</a-select-option>
                                <a-select-option value="국민은행">국민은행</a-select-option>
                                <a-select-option value="신한은행">신한은행</a-select-option>
                                <a-select-option value="우리은행">우리은행</a-select-option>
                                <a-select-option value="기업은행">기업은행</a-select-option>
                                <a-select-option value="카카오뱅크">카카오뱅크</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="출금계좌번호">
                            <a-input value="100100056489011" />
                        </a-form-item>
                        <a-form-item label="예금주명">
                            <a-input value="주식회사 타운소프트비나" />
                        </a-form-item>
                        <a-form-item label="사업자(주민)등록번호:">
                            <a-input value="100100056489011" />
                        </a-form-item>
                        <a-form-item label="자동이체출금일자">
                            <a-radio-group v-model:value="value">
                                <a-radio :style="radioStyle" :value="1">매월 5일</a-radio>
                                <a-radio :style="radioStyle" :value="2">매월 12일</a-radio>
                                <a-radio :style="radioStyle" :value="3">매월 19일</a-radio>
                            </a-radio-group>
                        </a-form-item>
                    </a-form>
                </a-collapse-panel>
                <a-collapse-panel key="4" header="메모" class="modal-note">

                    <a-table bordered :data-source="dataSource" pagination=false>
                        <template #bodyCell="{ column, text, record }">
                            <div>
                                <div class="title-note">
                                    <div>
                                        Han Aram 수정 2022-09-05 게시 2022-09-05
                                    </div>
                                    <div v-if="text.key == '0'">
                                        <PlusSquareOutlined :style="{ fontSize: '25px'}" @click="handleAdd" />
                                    </div>
                                </div>
                                <div>
                                    <a-textarea placeholder="전달사항입력" allow-clear />
                                </div>
                                <a-space :size="8" style="margin-top: 7px;">
                                    <save-outlined :style="{ fontSize: '20px'}" />
                                    <DeleteOutlined :style="{ fontSize: '20px'}" @click="handleDelete(text.key)" />
                                </a-space>
                            </div>

                        </template>
                    </a-table>

                </a-collapse-panel>

            </a-collapse>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import DxDropDownBox from "devextreme-vue/drop-down-box";
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
} from "devextreme-vue/data-grid";

import { employees } from '../data.js';
// for upload image
import { UploadOutlined, MinusCircleOutlined, ZoomInOutlined, SaveOutlined, DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import dayjs from "dayjs";
export default {
    props: [
        'modalStatus',
        'data'
    ],
    data() {
        return {
            activeKey: [],
            text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
            formState: {
                name: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
            },
            gridDataSource: employees,
            gridBoxValue: [],
            gridColumns: ["심사상태", "사업자코드", "상호"],
            isGridBoxOpened: false,
            columns: [
                {
                    name: '사업명 (중복불가)',
                    dataIndex: '사업명',
                    key: '사업명',
                },
                {
                    title: '사업분류',
                    dataIndex: '사업분류',
                    key: '사업분류',
                },
                {
                    title: '서비스시작년월',
                    dataIndex: '서비스시작년월',
                    key: '서비스시작년월',
                },
                {
                    title: '정원수(명)',
                    key: '정원수',
                    dataIndex: '정원수',
                },
                {
                    title: '',
                    key: 'action',
                },
            ],
            dataTable: [
                {
                    key: '1',
                    사업명: '가나다라마바 사업',
                    사업분류: '방문요양',
                    서비스시작년월: '2015/01/01',
                    정원수: 10,
                },
                {
                    key: '2',
                    사업명: '가나다라마바 사업',
                    사업분류: '방문간호',
                    서비스시작년월: '2015/01/01',
                    정원수: 10,
                },
                {
                    key: '3',
                    사업명: '가나다라마바 사업',
                    사업분류: '단기보호',
                    서비스시작년월: '2015/01/01',
                    정원수: 10,
                },
            ],
            dateFormat: 'YYYY-MM-DD',
            value1: dayjs('2015/01/01', 'YYYY-MM-DD'),
            labelCol: { style: { width: '150px' } },
            wrapperCol: { span: 14 },
            radioStyle: {
                display: 'flex',
                height: '30px',
                lineHeight: '30px',
            },
            value: ref<number>(1),
            dataSource: ref([{
                key: 0,
                note: '',
            },
            ]),
            keyNumber: 0
        }
    },
    computed: {

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
        PlusSquareOutlined
    },
    methods: {
        setModalVisible() {
            this.$emit('closePopup', false);
        },
        getColorTag(data) {
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
        onGridSelectionChanged() {
            this.isGridBoxOpened = false;
        },
        handleChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
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
        handleDelete(key) {
            if (this.dataSource.length > 1) {
                this.dataSource = this.dataSource.filter(function (obj) {
                    return obj.key != key;
                });
            }
        }
    }
};
</script>

<style>
.modal-note {
    max-height: 500px;
    overflow: auto;
}

.title-note {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.anticon {
    cursor: pointer;
}

th {
    display: none;
}
</style>