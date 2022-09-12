<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" title="사업자관리 " centered okText="저장하고 나가기" cancelText="그냥 나가기"
            @cancel="setModalVisible()" width="50%">
            <a-collapse v-model:activeKey="activeKey" accordion>
                <a-collapse-panel key="1" header="사업자정보">
                    <a-form :label-col="labelCol">
                        <a-form-item label="상 호">
                            <a-input v-model:value="formState.name" />
                        </a-form-item>
                        <a-form-item label="사업자등록번호">
                            <a-input v-model:value="formState.name" style="width: 150px" />
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
                                    <a-input value="800123-1234567" />
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
                                    <a-input v-model:value="formState.desc" style="width: 150px" />
                                </a-form-item>
                                <a-form-item label="팩 스">
                                    <a-input v-model:value="formState.desc" style="width: 150px" />
                                </a-form-item>
                                <a-form-item label="사업자등록증">
                                    <a-upload v-model:file-list="fileList" :show-upload-list="false"
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        :before-upload="beforeUpload" @change="handleChange">
                                        <a-button>
                                            <upload-outlined></upload-outlined>
                                            파일선택...
                                        </a-button>
                                    </a-upload>
                                </a-form-item>
                                <a-space :size="10" align="start">
                                    <div>
                                        <warning-filled :style="{ fontSize: '15px'}" />
                                    </div>
                                    <div class="warring-modal">
                                        <p>아래 형식에 맞는 이미지파일을 선택한 후 업로드하십시요.</p>
                                        <p>파일형식 : PDF, JPG(JPEG), TIF, GIF, PNG</p>
                                        <p>파일용량 : 최대 5MB</p>
                                    </div>
                                </a-space>
                            </a-col>
                            <imgUpload :title="titleModal" :imageUrl="imageUrl" />
                        </a-row>
                    </a-form>
                </a-collapse-panel>
                <a-collapse-panel key="2" header="대표자정보">
                    <a-form :label-col="labelCol" ref="formRef" name="custom-validation">
                        <a-form-item has-feedback label="대표자명">
                            <a-input value="홍길동" autocomplete="off" style="width: 300px" />
                        </a-form-item>
                        <a-form-item has-feedback label="생년월일">
                            <a-input value="19620820" autocomplete="off" style="width: 300px" />
                        </a-form-item>
                        <a-form-item has-feedback label="휴대폰번호">
                            <a-input-number value="01098765432" style="width: 300px" />
                        </a-form-item>
                        <a-form-item has-feedback label="이메일">
                            <a-input value="abc123@mailaddress.com" style="width: 300px" />
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
                                    <save-outlined :style="{ fontSize: '20px'}" @click="handleCopy(text.note)" />
                                    <DeleteOutlined :style="{ fontSize: '20px'}" @click="handleDelete(text.key)" />
                                </a-space>
                            </div>

                        </template>
                    </a-table>

                </a-collapse-panel>
            </a-collapse>
        </a-modal>

        <a-modal :visible="modalStatusHistory" footer='' @cancel="setModalVisibleHis()" width="50%">
            <div style="margin-top: 20px">
                <DxDataGrid :data-source="dataTableShow" :show-borders="true" key-expr="key">
                    <DxColumn data-field="기록일시" />
                    <DxColumn data-field="비고" />
                    <DxColumn data-field="생성일시" />
                    <DxColumn data-field="생성자ID" />
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
import { ref, defineComponent } from 'vue'
import DxDropDownBox from "devextreme-vue/drop-down-box"
import imgUpload from "../../../../../components/UploadImage.vue"
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection
} from "devextreme-vue/data-grid"

import { UploadOutlined, MinusCircleOutlined, ZoomInOutlined, SaveOutlined, DeleteOutlined, PlusSquareOutlined, WarningFilled } from '@ant-design/icons-vue'
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
        imgUpload
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
            delivery: false,
            type: [],
            resource: "",
            desc: "",
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
        const keyNumber = ref(0)
        const titleModal = "사업자등록증"

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
            titleModal
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
        handleCopy(note: any) {
            this.keyNumber++
            let dataDef = {
                key: this.keyNumber,
                note: note,
            }
            this.dataSource.push(dataDef)
        },

    }
})
</script>
<style>
.warring-modal {
    font-size: 13px;
    line-height: 5px;
}

.ant-form-item-label{
    text-align: left;
}
</style>