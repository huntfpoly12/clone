<template>
    <div id="components-modal-demo-position">
        <a-modal :mask-closable="false" :visible="modalStatus" title="권한그룹관리" centered width="1000px" @cancel="setModalVisible()">
            <template #footer>
                <a-button @click="setModalVisible">그냥 나가기</a-button>
                <a-button key="submit" type="primary" @click="createScrenRole">
                    저장하고 나가기</a-button>
            </template>
            <a-form v-bind="layout" name="nest-messages">
                <a-row :gutter="24">
                    <a-col :span="24" class="title-modal">
                        <span>권한그룹 기본정보</span>
                    </a-col>
                    <a-col :span="16">
                        <a-form-item label="그룹코드">
                            <div class="dflex">
                                <a-input v-model:value="dataRes.id" @change="changeID" class="mr5"
                                    placeholder="영문,숫자 5~10자 (중복불가)" />
                                <a-button type="button" @click="checkId">중복체크</a-button>
                            </div>
                        </a-form-item>
                    </a-col>
                    <a-col :span="16">
                        <a-form-item label="그룹명">
                            <a-input v-model:value="dataRes.name" placeholder="최대 20자" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="16">
                        <a-form-item label="대상회원">
                            <a-radio-group v-model:value="dataRes.type" @change="changeTypeGroup">
                                <a-radio value="m">
                                    <a-tag color="black">매니저</a-tag>
                                </a-radio>
                                <a-radio value="r">
                                    <a-tag color="gray" style="border: 1px solid black;">영업자</a-tag>
                                </a-radio>
                                <a-radio value="p">
                                    <a-tag color="#FFFF00" style="color: black;border: 1px solid black">파트너</a-tag>
                                </a-radio>
                            </a-radio-group>
                        </a-form-item>
                    </a-col>
                    <a-col :span="16">
                        <a-form-item label="메모" style="align-items: flex-start;">
                            <a-textarea placeholder="최대 30자" v-model:value="dataRes.memo" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24" class="title-modal" style="margin-top: 10px;">
                        <span>권한그룹메뉴별 권한</span>
                    </a-col>
                    <a-col :span="20">
                        <a-spin :spinning="spinning" size="large">
                            <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="id"
                                class="table-sevice">
                                <DxColumn data-field="id" caption="메뉴" :fixed="true" />
                                <DxColumn caption="읽기" cell-template="col1" :width="100" alignment="center" />
                                <template #col1="{}" class="custom-action">
                                    <div class="custom-action">
                                        <a-checkbox></a-checkbox>
                                    </div>
                                </template>
                                <DxColumn caption="쓰기" cell-template="col2" alignment="center" :width="100" />
                                <template #col2="{}" class="custom-action">
                                    <div class="custom-action">
                                        <a-checkbox></a-checkbox>
                                    </div>
                                </template>
                            </DxDataGrid>
                        </a-spin>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch } from 'vue'
import { SearchOutlined, WarningOutlined } from '@ant-design/icons-vue';
import { Dayjs } from 'dayjs';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
} from 'devextreme-vue/data-grid';
import { message } from 'ant-design-vue';
import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "../../../../../graphql/queries/BF/BF2/BF220/index";
import mutations from "../../../../../graphql/mutations/BF/BF2/BF220/index";
import { AdminScreenRole, ScreenRole, ScreenRoleInfo, ScreenRoleTool } from '@bankda/jangbuda-common';
export default defineComponent({
    props: ['modalStatus'],
    components: {
        SearchOutlined,
        WarningOutlined,
        DxDataGrid,
        DxPaging,
        DxColumn
    },
    setup(props, { emit }) {

       
       
        const info = new ScreenRoleInfo('00c00000-0000ffff-0000000');
        const tool = ScreenRoleTool.createByScreenRoleInfo(info);
        // Work screen role (업무 화면역할)
        const tool2 = ScreenRoleTool.createWorkScreenRoleTool();
        const valuex = tool.toString();
        const valuey = tool2.toString();
    
        console.log(valuex,valuey);
        const dataSource = ref([])
        const spinning = ref<boolean>(false);
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        const formTailLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16, },
        };
        const visible = ref<boolean>(false);
        const triggers = ref(false)
        const triggersTable = ref(false)
        const labelCol = { style: { width: "300px" } };
        const wrapperCol = { span: 14 };
        let confirm = ref<string>('');
        const checkIDName = ref()
        const dataRes: any = ref({
            id: '',
            name: "",
            type: "m",
            screenRoles: "",
            memo: ""
        });
        const changeID = (e: any) => {
            checkIDName.value = {
                id: dataRes.value.id
            }
            dataRes.value.id = e.target.value.replace(/[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/g, '')
        }
        const confirmPopup = (value: any) => {
            if (value == '해지') {
                visible.value = true;
            }
        }
        const handleOkConfirm = () => {
            // if (confirm.value == '확인') {
            //     visible.value = false;
            // } else {
            //     dataRes.value.상태 = '정상';
            //     visible.value = false;
            // }
        }
        const checkId = () => {
            if (dataRes.value.id != '') {
                triggers.value = true
                refetchData
            }
            setTimeout(() => {
                triggers.value = false
            }, 1000);
        }
        const { refetch: refetchData, result: resList } = useQuery(queries.isScreenRoleGroupRegistableId, checkIDName, () => ({
            enabled: triggers.value,
            fetchPolicy: "no-cache",
        }))
        watch(resList, (value) => {
            if (value.isScreenRoleGroupRegistableId == true) {
                message.success(`사용 가능한 그룹코드입니다`)
            } else {
                message.error(`이미 존재하는 그룹코드 입니다. 다른 코드를 입력해주세요`)
            }
        });
        const getDataTable = ref({
            page: 1,
            rows: 1000,
            types: ["m"]
        })
        const { refetch: refetchDataTable, result: resListTable } = useQuery(queries.searchScreenRoleGroups, getDataTable, () => ({
            enabled: triggersTable.value,
            fetchPolicy: "no-cache",
        }))
        watch(() => props.modalStatus, (value) => {
            if (value == true) {
                spinning.value = true
                triggersTable.value = true
            }
        })
        watch(resListTable, (value) => {
            dataSource.value = value.searchScreenRoleGroups.datas
            setTimeout(() => {
                spinning.value = false;
            }, 500);
        });
        const changeTypeGroup = () => {
            spinning.value = true
            getDataTable.value.types = [dataRes.value.type]
        }
        //Creat new group roll
        const {
            mutate: createScreenRole,
            onDone: creactDone,
            onError: creactError
        } = useMutation(mutations.createScreenRoleGroup);
        creactDone(e => {
            message.success('그룹이 생성되었습니다.')
            emit("closePopupAdd", false)
        })
        creactError(e => {
            message.error(e.message)
        })
        const createScrenRole = () => {
            let dataCall = {
                input: {
                    id: dataRes.value.id,
                    name: dataRes.value.name,
                    type: dataRes.value.type,
                    screenRoles: "0000000c",
                    memo: dataRes.value.memo
                }
            }
            createScreenRole(dataCall)
        }

        const setModalVisible = ()=>{
            emit('closePopupAdd', false)
        }

        const closeModalEdit = ()=>{
            emit('closePopupEdit', false)
        }

        const getColorTag = (data: string)=>{
            if (data === "정상") {
                return "#108ee9";
            } else if (data === "해지") {
                return "#cd201f";
            } else if (data === "전체") {
                return "grey";
            }
        }
        return {
            createScrenRole,
            spinning,
            dataSource,
            changeTypeGroup,
            changeID,
            checkId,
            labelCol,
            wrapperCol,
            dataRes,
            layout,
            formTailLayout,
            value1: ref<Dayjs>(),
            visible,
            confirmPopup,
            confirm,
            handleOkConfirm,
            setModalVisible,
            closeModalEdit,
            getColorTag
        }
    }
})
</script>
<style lang="scss" scoped>
.table-sevice {
    max-height: 300px;
}
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
#data-grid-demo {
    min-height: 700px;
}
.dx-select-checkbox {
    display: inline-block !important;
}
.modal-note {
    max-height: 500px;
    overflow: auto;
    .title-note {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    th {
        display: none;
    }
    .ant-collapse-content-box {
        padding: 0px;
    }
}
.anticon {
    cursor: pointer;
}
.custom-action {
    text-align: center;
}
.search-form {
    margin-bottom: 10px;
    background: #f1f3f4;
    padding: 10px 24px;
    >div {
        width: 100%;
        justify-content: flex-start !important;
        align-items: center;
        margin-right: 15px;
    }
    label {
        margin-right: 10px;
    }
    .lable-item {
        white-space: nowrap;
        margin-right: 10px;
        width: auto !important;
    }
    .col {
        align-items: center;
        display: flex;
        align-items: center;
        margin-top: 20px;
        .lable-item {
            width: 110px;
            display: inline-block;
        }
        .item:nth-child(2) {
            margin-left: 30px;
        }
    }
}
.ant-row {
    align-items: center;
}
.ant-form-item {
    margin-bottom: 4px;
}
.ant-collapse {
    .ant-collapse-item {
        .ant-collapse-header {
            padding: 7px;
        }
    }
}
.warring-modal {
    font-size: 12px;
    line-height: 0px;
}
.ant-form-item-label {
    text-align: left;
}
.clr {
    label {
        color: red;
    }
}
.clr-text {
    color: red;
}
.clb,
.clb-label label {
    color: black !important;
}
::v-deep.components-modal-demo-position {
    ::v-deep.test-local {
        background-color: pink !important;
        width: 1000px !important;
        height: 200px !important;
    }
    .imgPreview img {
        width: 1000px !important;
    }
    .ant-form-item-label {
        text-align: left;
    }
}
.dflex {
    display: flex;
}
.custom-flex {
    align-items: flex-start;
}
.warring-bank {
    display: flex;
    align-items: center;
}
.pl-5 {
    padding-left: 5px;
}
.custom-lineHeight {
    line-height: 3px;
}
</style>