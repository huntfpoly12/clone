<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" centered okText="저장하고 나가기" cancelText="그냥 나가기" @cancel="setModalVisible"
            width="50%" :mask-closable="false" footer="">
            <h2 class="title_modal">회원정보</h2>
            <standard-form action="" name="add-page-210">
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="회원ID" class="red dflex">
                            <div class="dflex">
                                <default-text-box v-model:valueInput="formState.username"
                                    style="width: 190px; margin-right: 10px" :required="true"
                                    mess-required="이항목은 필수 입력사항입니다!">
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
                                :data-source="selectSearch" display-expr="label" value-expr="value"
                                :height="$config_styles.HeightInput">
                            </DxSelectBox>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="상태">
                            <switch-basic v-model:valueSwitch="formState.active" :textCheck="'이용중'"
                                :textUnCheck="'이용중지'" />
                        </a-form-item>
                        <a-form-item label="회원종류" class="red">
                            <DxSelectBox id="custom-templates" :data-source="products" display-expr="name"
                                value-expr="id" item-template="item" :height="$config_styles.HeightInput" width="140px"
                                field-template="field" @value-changed="changeValueType">
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

                    <a-col :span="24">
                        <h2 class="title_modal">권한그룹설정 (복수선택 가능)</h2>
                        <div style="position: relative">
                            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="arrData"
                                :show-borders="true" :allow-column-reordering="move_column"
                                :allow-column-resizing="colomn_resize" :column-auto-width="true" class="table-scroll"
                                @selection-changed="onSelectionChanged">
                                <DxPaging :page-size="0" />
                                <DxSelection data-field="active" mode="multiple" />
                                <DxColumn data-field="id" caption="코드" :width="200" :fixed="true" />
                                <DxColumn data-field="name" caption="권한그룹명" />
                                <DxColumn data-field="memo" caption="권한그룹설명" />
                            </DxDataGrid>
                        </div>
                    </a-col>

                    <a-col :offset="8" style="text-align: center">
                        <button-basic text="취소" type="default" mode="outlined" @onClick="setModalVisible" :width="120"
                            style="margin-right: 10px;" />
                        <button-basic text="저장하고 나가기" type="default" mode="contained" @onClick="creactUserNew($event)"
                            :width="150" />
                    </a-col>
                </a-row>
            </standard-form>

        </a-modal>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { useStore } from 'vuex';
import mutations from "@/graphql/mutations/BF/BF2/BF210/index";
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
import queries from "@/graphql/queries/BF/BF2/BF210/index";
import { useQuery, useMutation } from "@vue/apollo-composable";
import DxSelectBox from 'devextreme-vue/select-box';
import DxButton from 'devextreme-vue/button';
import Field from './Field.vue';
import notification from '@/utils/notification';
import comfirmClosePopup from '@/utils/comfirmClosePopup';
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
        let products = ref([
            {
                id: 1,
                color: 'white',
                name: "중간매니저",
                type: "m",
                grade: "2",
                background: 'black',
                border: "1px solid black",
            },
            {
                id: 2,
                color: 'white',
                name: "담당매니저",
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
        const isShow = ref<boolean>(false);
        const visible = ref<boolean>(false);
        let disabledBtn = ref(true);

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

                formState.managerGrade = parseInt(products.value.filter((val: any) => val.id === data.value)[0].grade)
                formState.type = value
                originData.value.types = [value.toString()]
                dataCallGroup.value = dataCall
            }, 100);
        }
        const formState = reactive({ ...initialFormState });
        let objDataDefault = reactive({ ...initialFormState });
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
        let trigger = ref<boolean>(true);
        let triggerDuplication = ref<boolean>(true);
        let triggerGroup = ref<boolean>(true);
       
              
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
                objDataDefault = {
                    ...objDataDefault,
                    groupCode: e.data.findGroups[0].groupId
                }
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
                notification('error', '사용자 이름을 입력헤주세요!');
            }
        }
        onResultUsername(e => {
            triggerDuplication.value = false
            if (e.data)
                if (e.data.isUserRegistableUsername == true) {
                    notification('success', `사용 가능한 아이디입니다!`)
                } else {
                    notification('error', '이미 존재하는 아이디 입니다. 다른 아이디를 입력해주세요');
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
            notification('error', e.message)
        })
        creactDone(e => {
            emit("createDone", true)
            notification('success', `신규 사용자등록이 완료되었습니다. 비밀번호 설정을 위한 이메일을 확인해주세요.!`)
            emit("closePopup", false)
        })
        var idRoleGroup: any = [];
        const onSelectionChanged = (selectedRows: any) => {
            idRoleGroup = JSON.parse(JSON.stringify(selectedRows.selectedRowsData));
        };

        const creactUserNew = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
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
                        managerGrade: formState.managerGrade,
                    }
                }
                creactUser(dataCallApiCreate)
            }

        }
        const onlyNumber = (e: any) => {
            let keyCode = e.keyCode ? e.keyCode : e.which;
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
                e.preventDefault();
            }
        }
        const setModalVisible = () => {
            if (JSON.stringify(objDataDefault) === JSON.stringify(formState) == true)
                emit("closePopup", false)
            else
                comfirmClosePopup(() => emit("closePopup", false))
        }
        return {
            creactUserNew,
            products,
            move_column,
            colomn_resize,
            onlyNumber,
            setModalVisible,
            arrData,
            formState,
            isShow,
            selectSearch,
            createUser,
            changeValueType,
            checkDuplicateUsername,
            onSelectionChanged,
            disabledBtn,
        };
    },
    methods: {
    },
});
</script>  














<style lang="scss" scoped src="../style/styleAdd.scss" />
