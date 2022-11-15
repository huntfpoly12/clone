<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" centered okText="저장하고 나가기" cancelText="그냥 나가기" @cancel="setModalVisible"
            width="50%" :mask-closable="false">
            <h2 class="title_modal">회원정보</h2>
            <form action="" @submit.prevent="creactUserNew">
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="회원ID" class="red dflex">
                            <div class="dflex">
                                <default-text-box v-model:valueInput="formState.username"
                                    style="width: 190px; margin-right: 10px" required mess-required="이항목은 필수 입력사항입니다!">
                                </default-text-box>
                                <button-basic :text="'중복체크'" :type="'default'" :mode="'contained'"
                                    @onClick="checkDuplicateUsername" :disabled="disabledBtn" />
                            </div>
                        </a-form-item>
                        <a-form-item label="회원명" class="red">
                            <default-text-box v-model:valueInput="formState.name" :required="true" width="190px"
                                messRequired="이항목은 필수 입력사항입니다!" />
                        </a-form-item>
                        <a-form-item label="소속" class="red">
                            <DxSelectBox v-model:value="formState.groupCode" style="width: 190px" placeholder="선택"
                                :data-source="selectSearch" @value-changed="handleChange" display-expr="label"
                                value-expr="value" :height="$config_styles.HeightInput">
                            </DxSelectBox>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="상태">
                            <switch-basic v-model:valueSwitch="formState.active" :textCheck="'이용중'"
                                :textUnCheck="'이용중지'" />
                        </a-form-item>
                        <a-form-item label="회원종류2" class="red">
                            <DxSelectBox id="custom-templates" :data-source="products" display-expr="name"
                                value-expr="id" item-template="item" :height="$config_styles.HeightInput"
                                style="width:170px" field-template="field" @value-changed="changeValueType">
                                <template #field="{ data }">
                                    <Field :fieldData="data" />
                                </template>
                                <template #item="{ data }">
                                    <div style="width: 100%; padding: 3px;">
                                        <div
                                            :style="{ color: data.color, background: data.background, padding: '2px 12px', borderRadius: '5px', border: data.border }">
                                            {{ data.name }}
                                        </div>
                                    </div>
                                </template>
                            </DxSelectBox>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="휴대폰" class="red">
                            <tel-text-box @keypress="onlyNumber" type="text" v-model:valueInput="formState.mobilePhone"
                                style="width: 190px; margin-right: 8px" :required="true"
                                messRequired="이항목은 필수 입력사항입니다!" />
                        </a-form-item>
                        <a-form-item label="이메일" class="red">
                            <mail-text-box v-model:valueInput="formState.email" style="width: 270px" :required="true"
                                messRequired="이항목은 필수 입력사항입니다!" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <div class="page-content">
                    <h2 class="title_modal">권한그룹설정 (복수선택 가능)</h2>
                    <div style="position: relative">
                        <DxDataGrid :data-source="arrData" :show-borders="true"
                        :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true" class="table-scroll"
                            @selection-changed="onSelectionChanged">
                            <DxPaging :page-size="0" />
                            <DxSelection data-field="active" mode="multiple" />
                            <DxColumn data-field="id" caption="코드" :width="200" :fixed="true" />
                            <DxColumn data-field="name" caption="권한그룹명" />
                            <DxColumn data-field="memo" caption="권한그룹설명" />
                        </DxDataGrid>
                    </div>
                </div>
                <a-row>
                    <a-col :offset="8" style="text-align: center">
                        <DxButton :width="120" text="취소" type="default" styling-mode="outlined" @click="setModalVisible"
                            style="margin-right: 10px;" />
                        <DxButton id="button" :use-submit-behavior="true" text="저장하고 나가기" type="default" />
                    </a-col>
                </a-row>
            </form>
            <template #footer>
            </template>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import mutations from "../../../../../graphql/mutations/BF/BF2/BF210/index";
import { initialFormState } from '../utils';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel,
} from "devextreme-vue/data-grid";
import {
    DxValidator,
    DxRequiredRule,
} from "devextreme-vue/validator";
import {
    SearchOutlined,
    WarningOutlined,
    MailOutlined,
    MenuOutlined,
} from "@ant-design/icons-vue";
import queries from "../../../../../graphql/queries/BF/BF2/BF210/index";
import { useQuery, useMutation } from "@vue/apollo-composable";
import DxSelectBox from 'devextreme-vue/select-box';
import DxButton from 'devextreme-vue/button';
import Field from './Field.vue';
export default defineComponent({
    props: ["modalStatus", "data"],
    components: {
        MenuOutlined,
        SearchOutlined,
        WarningOutlined,
        MailOutlined,
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxSelection,
        DxExport,
        DxSearchPanel,
        DxSelectBox,
        DxButton,
        DxRequiredRule,
        DxValidator,
        Field,
    },
    setup(props, { emit }) {
        const selectSearch = ref([{}]);
        const handleChange = (value: any) => {
        };
        const isShow = ref<boolean>(false);
        const visible = ref<boolean>(false);
        const showModal = () => {
            isShow.value = true;
        };
        const handleSuccsess = (e: MouseEvent) => {
            isShow.value = false;
        };
        let disabledBtn = ref(true);
        let confirm = ref<string>("");

        // config grid
        const store = useStore();
        
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const changeValueType = (data: any) => {
            triggerGroup.value = true;
            trigger.value = true
            setTimeout(() => {
                let value = data.value
                if (data.value == 1 || data.value == 2)
                    value = 'm'
                else if (data.value == 3)
                    value = 'r'
                else if (data.value == 4)
                    value = 'p'
                let dataCall: any = {
                    type: value.toString()
                }
                originData.value.types = [value.toString()]
                dataCallGroup.value = dataCall
            }, 100);
        }
        const formState = reactive<any>({ ...initialFormState });
        const createUser = reactive({
            type: "",
            username: "",
            name: "",
            screenRoleGroupIds: ["r", "m", "c", "p", "s"],
            mobilePhone: "",
            email: "",
        });
        const originData = ref({
            page: 1,
            rows: per_page,
            types: ["r"],
        });
        let trigger = ref<boolean>(false);
        let triggerDuplication = ref<boolean>(false);
        let triggerGroup = ref<boolean>(false);
        watch(
            () => props.modalStatus,
            (newValue, old) => {
                triggerGroup.value = true
                trigger.value = true;
                if (newValue) {
                    visible.value = newValue;
                    reqGroup();
                    reqRoleGroup();
                    Object.assign(formState, initialFormState);
                } else {
                    visible.value = newValue;
                    trigger.value = false;
                }
            }
        );
        const { result: resRoleGroup, refetch: reqRoleGroup } = useQuery(
            queries.searchScreenRoleGroups, originData,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
        const arrData = ref()
        watch(resRoleGroup, (value: any) => {
            if (value && value.searchScreenRoleGroups) {
                arrData.value = value.searchScreenRoleGroups.datas
            }
        });
        let dataCallGroup = ref({
            type: "r"
        })
        const { onResult: resGroup, refetch: reqGroup } = useQuery(
            queries.findGroups, dataCallGroup,
            () => ({
                enabled: triggerGroup.value,
                fetchPolicy: "no-cache",
            })
        );
        resGroup(e => {
            let option: any = []
            e.data.findGroups.map((val: any) => {
                option.push({
                    label: val.groupCode + '  ' + val.groupName,
                    value: val.groupId
                })
            })
            if (e.data.findGroups) {
                formState.groupCode = e.data.findGroups[0].groupId
            }
            selectSearch.value = option
        })
        watch(resGroup, (value: any) => {
            if (value && value.findGroups) {
                arrData.value = value.findGroups.datas
            }
        });
        let dataCallCheck = ref({})
        const { refetch: refetchUserName, onResult: onResultUsername } =
            useQuery(queries.isUserRegistableUsername, dataCallCheck, () => ({ enabled: triggerDuplication.value, fetchPolicy: "no-cache", }))
        const checkDuplicateUsername = () => {
            disabledBtn.value = true;
            if (formState.username !== '') {
                triggerDuplication.value = true
                refetchUserName()
            } else {
                message.error(`사용자 이름을 입력헤주세요!`)
            }
        }
        onResultUsername(e => {
            triggerDuplication.value = false
            if (e.data)
                if (e.data.isUserRegistableUsername == true) {
                    message.success(`사용 가능한 아이디입니다`)
                } else {
                    message.error(`이미 존재하는 아이디 입니다. 다른 아이디를 입력해주세요`)
                }
        })
        watch(() => formState.username, (value: any) => {
            if (value !== '') {
                disabledBtn.value = false
                dataCallCheck.value = {
                    username: formState.username
                }
            }
            else {
                disabledBtn.value = true;
            }
        });
        const {
            mutate: creactUser,
            onDone: creactDone,
            onError: creactError
        } = useMutation(mutations.createUser);
        creactError(e => {
            message.error(e.message, 2)
        })
        creactDone(e => {
            message.success("신규 사용자등록이 완료되었습니다. 비밀번호 설정을 위한 이메일을 확인해주세요.!")
            emit("closePopup", false)
        })
        var idRoleGroup: any = [];
        const onSelectionChanged = (selectedRows: any) => {
            idRoleGroup = JSON.parse(JSON.stringify(selectedRows.selectedRowsData));
        };
        const creactUserNew = () => {
            var RoleGroup = idRoleGroup.map((row: any) => {
                return row.id;
            })
            let dataCallApiCreate = {
                input: {
                    type: (formState.type == '2' || formState.type == '3') ? 'm' : formState.type,
                    name: formState.name,
                    username: formState.username,
                    screenRoleGroupIds: RoleGroup,
                    mobilePhone: formState.mobilePhone,
                    email: formState.email,
                    groupId: formState.groupCode,
                    managerGrade: (formState.type == '2' || formState.type == '3') ? parseInt(formState.type) : null,
                }
            }
            creactUser(dataCallApiCreate)
        }
        const onlyNumber = (e: any) => {
            let keyCode = e.keyCode ? e.keyCode : e.which;
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
                e.preventDefault();
            }
        }
        const setModalVisible = () => {
            emit("closePopup", false);
        }
        const getColorTag = (data: string) => {
            if (data === "중간매니저") {
                return "#4a4848";
            } else if (data === "담당매니저") {
                return "#4a4848";
            } else if (data === "영업자") {
                return "grey";
            } else if (data === "파트너") {
                return "#efe70b";
            }
        }
        const closeModal = () => {
            isShow.value = false;
        }
        let products = ref([
            {
                id: 1,
                color: 'white',
                name: "중간메니저",
                type: "m",
                grade: "2",
                background: 'black',
                border: "1px solid black",
            },
            {
                id: 2,
                color: 'white',
                name: "당당메니저",
                type: "m",
                grade: "3",
                background: 'black',
                border: "1px solid black",
            },
            {
                id: 3,
                color: 'white',
                name: "영업자회원",
                type: "r",
                grade: "",
                background: 'grey',
                border: "1px solid grey",
            },
            {
                id: 4,
                color: 'white',
                name: "파트너회원",
                type: "p",
                grade: "",
                background: 'goldenrod',
                border: "1px solid goldenrod",
            }
        ])
        return {
            products,
            move_column,
            colomn_resize,
            onlyNumber,
            setModalVisible,
            getColorTag,
            closeModal,
            arrData,
            confirm,
            formState,
            isShow,
            showModal,
            handleSuccsess,
            selectSearch,
            handleChange,
            createUser,
            changeValueType,
            checkDuplicateUsername,
            creactUserNew,
            onSelectionChanged,
            disabledBtn,
        };
    },
    methods: {
    },
});
</script>
<style lang="scss" scoped>
::v-deep .red {
    label {
        color: red;
    }
}
::v-deep .element.style {
    max-width: none;
    width: 200px;
    height: auto;
    left: 0px;
    top: 0px;
    transform: none;
    z-index: 1504;
    transition: all 0s ease 0s;
}
::v-deep .ant-modal-footer {
    padding-top: 0;
    border: node;
}
::v-deep .ant-form-item-control {
    display: flex;
    flex-direction: row;
}
::v-deep .ant-modal-content {
    height: 900px
}
::v-deep .ant-form-item-label>label {
    width: 110px;
}
.select-search ::v-deep .ant-select-arrow .anticon>svg {
    width: 16px;
    height: 16px;
}
::v-deep .ant-form-item-explain-error {
    width: 400px;
    margin-left: 5px;
    padding-top: 5px;
}
.dflex {
    display: flex;
}
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.3);
}
.action-menu {
    text-align: center;
}
.title_modal {
    font-weight: 700;
    color: gray;
}
.modal_email ::v-deep .anticon svg {
    width: 50px;
    height: 50px;
}
.modal {
    width: 300px;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 20px;
    text-align: center;
}
.modal_email {
    display: flex;
}
.btn_submitemail {
    margin-top: 10px;
}
.confirm-button {
    margin-left: 100px;
}
.confirm-modal p {
    white-space: normal;
    font-size: 13px;
    line-height: 16px;
}
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
    margin-left: 110px;
}
.ant-form-item {
    margin-bottom: 10px;
}
.warring-modal {
    font-size: 13px;
    line-height: 5px;
}
.table-scroll {
    height: 300px;
    overflow-y: auto;
    padding: 5px;
}
.ant-form-item-label {
    text-align: left;
}
.ant-popover-arrow {
    display: none;
}
// ::v-deep .dx-invalid-message.dx-overlay-wrapper {
//   width: 100% !important;
// }
// ::v-deep .dx-invalid-message>.dx-overlay-content {
//   transform: unset!important;
// }
</style>