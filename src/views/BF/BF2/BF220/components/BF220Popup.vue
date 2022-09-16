<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" title="권한그룹관리" centered okText="저장하고 나가기" cancelText="그냥 나가기"
            @cancel="setModalVisible()" width="1000px">
            <a-form v-bind="layout" name="nest-messages">
                <a-row :gutter="24">
                    <a-col :span="24" class="title-modal">
                        <span>권한그룹 기본정보</span>
                    </a-col>

                    <a-col :span="16">
                        <a-form-item label="그룹코드">
                            <div class="dflex">
                                <a-input v-model:value="bf220Detail.name" class="mr5" />
                                <a-button type="button">중복체크</a-button>
                            </div>
                        </a-form-item>
                    </a-col>
                    <a-col :span="16">
                        <a-form-item label="그룹명">
                            <a-input v-model:value="bf220Detail.name" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8"></a-col>
                    <a-col :span="16">
                        <a-form-item label="대상회원">
                            <a-checkbox>매니저</a-checkbox>
                            <a-checkbox>영업자</a-checkbox>
                            <a-checkbox>파트너</a-checkbox>
                        </a-form-item>
                    </a-col>
                    <a-col :span="16">
                        <a-form-item label="메모" style="align-items: flex-start;">
                            <a-textarea></a-textarea>
                        </a-form-item>
                    </a-col>


                    <a-col :span="24" class="title-modal" style="margin-top: 10px;">
                        <span>권한그룹메뉴별 권한</span>
                    </a-col>
                    <a-col :span="20">
                        <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="ID">
                            <DxPaging :page-size="5" />
                            <DxColumn data-field="메뉴" :fixed="true" />
                            <DxColumn cell-template="col1" :width="100" alignment="center" />
                            <template #col1="{}" class="custom-action">
                                <div class="custom-action">
                                    <a-checkbox></a-checkbox>
                                </div>
                            </template>
                            <DxColumn cell-template="col2" alignment="center" :width="100" />
                            <template #col2="{}" class="custom-action">
                                <div class="custom-action">
                                    <a-checkbox></a-checkbox>
                                </div>
                            </template>
                        </DxDataGrid>
                    </a-col>

                </a-row>
            </a-form>
        </a-modal>
        <a-modal :visible="modalEdit" title="권한그룹관리" centered okText="저장하고 나가기" cancelText="그냥 나가기"
            @cancel="closeModalEdit()" width="1000px">
            <a-form v-bind="layout" name="nest-messages">
                <a-row :gutter="24">
                    <a-col :span="24" class="title-modal">
                        <span>권한그룹 기본정보 </span>
                    </a-col>

                    <a-col :span="16">
                        <a-form-item label="그룹코드">
                            <div class="dflex">
                                <a-input v-model:value="dataEditDemo.name" class="mr5" disabled="" />
                                <a-button type="button" disabled>중복체크</a-button>
                            </div>
                        </a-form-item>
                    </a-col>
                    <a-col :span="16">
                        <a-form-item label="그룹명">
                            <a-input v-model:value="dataEditDemo.delivery" placeholder="최대 20자" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8"></a-col>
                    <a-col :span="16">
                        <a-form-item label="대상회원">
                            <a-checkbox v-model:checked="dataEditDemo.type">매니저</a-checkbox>
                            <a-checkbox v-model:checked="dataEditDemo.type1">영업자</a-checkbox>
                            <a-checkbox v-model:checked="dataEditDemo.type2">파트너</a-checkbox>
                        </a-form-item>
                    </a-col>
                    <a-col :span="16">
                        <a-form-item label="메모" style="align-items: flex-start;">
                            <a-textarea v-model:value="dataEditDemo.resource" placeholder="최대 30자"></a-textarea>
                        </a-form-item>
                    </a-col>

                    <a-col :span="24" class="title-modal" style="margin-top: 10px;">
                        <span>권한그룹메뉴별 권한</span>
                    </a-col>
                    <a-col :span="20">
                        <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="ID">
                            <DxPaging :page-size="5" />
                            <DxColumn data-field="메뉴" :fixed="true" />
                            <DxColumn cell-template="col1" :width="100" alignment="center" />
                            <template #col1="{}" class="custom-action">
                                <div class="custom-action">
                                    <a-checkbox></a-checkbox>
                                </div>
                            </template>
                            <DxColumn cell-template="col2" alignment="center" :width="100" />
                            <template #col2="{}" class="custom-action">
                                <div class="custom-action">
                                    <a-checkbox></a-checkbox>
                                </div>
                            </template>
                        </DxDataGrid>
                    </a-col>

                </a-row>
            </a-form>
        </a-modal>
        <a-modal v-model:visible="visible" title="해지 확인" ok-text="완료">
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
                <a-input v-model:value="confirm" placeholder="확인" />
                <a-button type="primary" @click="handleOkConfirm">완료</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import type { UnwrapRef } from 'vue';
import { SearchOutlined, WarningOutlined } from '@ant-design/icons-vue';
import { Dayjs } from 'dayjs';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
} from 'devextreme-vue/data-grid';
interface FormState {
    name: string;
    delivery: boolean;
    type: string[];
    resource: string;
    desc: string;
    사업자유형: string;
    상태: string;
    등급: string;
    주소: boolean;
    은행: string;
    계좌번호: string;
    예금주: string;
    가입일자: string;
    비고: string;
}

export default defineComponent({
    props: {
        modalStatus: Boolean,
        modalEdit: Boolean,
    },
    components: {
        SearchOutlined,
        WarningOutlined,
        DxDataGrid,
        DxPaging,
        DxColumn
    },
    data() {
        return {
            dataSource: [{
                ID: 1,
                메뉴: 'John',
                읽기: 'Heart',
                쓰기: '신청',
            }, {
                ID: 2,
                메뉴: 'John',
                읽기: 'Heart',
                쓰기: '신청',
            }]
        }
    },
    setup() {
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        const formTailLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16, },
        };
        const visible = ref<boolean>(false);

        const labelCol = { style: { width: "300px" } };
        const wrapperCol = { span: 14 };
        let confirm = ref<string>('');;
        const bf220Detail: UnwrapRef<FormState> = reactive({
            name: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
            사업자유형: '개인',
            상태: '정상',
            등급: '본사',
            주소: false,
            은행: '농협',
            계좌번호: '',
            예금주: '',
            가입일자: '',
            비고: ''
        });

        const dataEditDemo = {
            name: 'MMANAGER',
            delivery: '',
            type: true,
            type1: false,
            type2: false,
            resource: '',

        }

        const confirmPopup = (value: any) => {
            if (value == '해지') {
                visible.value = true;
            }
        }
        const handleOkConfirm = () => {
            if (confirm.value == '확인') {
                visible.value = false;
            } else {
                bf220Detail.상태 = '정상';
                visible.value = false;
            }
        }

        return {
            labelCol,
            wrapperCol,
            bf220Detail,
            layout,
            formTailLayout,
            value1: ref<Dayjs>(),
            visible,
            confirmPopup,
            confirm,
            handleOkConfirm,
            dataEditDemo
        }
    },
    methods: {
        setModalVisible() {
            this.$emit('closePopup', false)
        },
        closeModalEdit() {
            this.$emit('closePopupEdit', false)
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
<style lang="scss">
.ant-form-item {
    margin-bottom: 10px;
}

.warring-modal {
    font-size: 13px;
    line-height: 5px;
}

.ant-form-item-label {
    text-align: left;
}

.title-modal {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.ant-modal-body {
    padding: 10px;
}

.mr5 {
    margin-right: 5px;
}

.custom-action {
    text-align: center;
}
</style>