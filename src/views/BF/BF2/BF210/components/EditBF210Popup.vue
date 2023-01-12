<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" footer="" :title="title" centered @cancel="setModalVisible" width="992px"
            :mask-closable="false">
            <standard-form formName="edit-bf-210">
                <h2 class="title_modal">회원정보</h2>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="회원ID" class="red" :label-col="labelCol">
                            <div class="dflex">
                                <default-text-box disabled v-model:valueInput="formState.username"
                                    style="width: 150px; margin-right: 10px" />
                                <button-basic :text="'중복체크'" :type="'default'" :mode="'contained'" :disabled="true" />
                            </div>
                        </a-form-item>
                        <a-form-item label="회원명" class="red" :label-col="labelCol">
                            <default-text-box v-if="formState.type != 'c'" v-model:valueInput="formState.name"
                                style="width: 150px; margin-right: 10px" :required="true" />
                            <default-text-box v-if="formState.type == 'c'" disabled v-model:valueInput="formState.name"
                                style="width: 150px; margin-right: 10px" />
                        </a-form-item>
                        <a-form-item label="소속" class="red" :label-col="labelCol">
                            <default-text-box v-model:valueInput="formState.groupCode"
                                style="width: 150px; margin-right: 10px" :disabled="true" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="상태" :label-col="labelCol">
                            <switch-basic v-if="formState.type == 'c'" v-model:valueSwitch="formState.active"
                                textCheck="이용중" textUnCheck="이용중지" disabled />
                            <switch-basic v-if="formState.type != 'c'" v-model:valueSwitch="formState.active"
                                textCheck="이용중" textUnCheck="이용중지" />
                        </a-form-item>
                        <a-form-item label="회원종류" class="red" :label-col="labelCol"> 
                            <DxSelectBox id="custom-templates" :data-source="products" display-expr="name"
                                value-expr="id" item-template="item" :height="$config_styles.HeightInput"
                                style="width:170px" field-template="field" :disabled="true" :value="typeSelect">
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
                        <a-form-item label="휴대폰" :span="4" class="red" :label-col="labelCol">
                            <tel-text-box v-if="formState.type !== 'c'" @keypress="onlyNumber" type="text"
                                v-model:valueInput="formState.mobilePhone" style="width: 150px; margin-right: 8px"
                                :required="true" />
                            <tel-text-box v-if="formState.type == 'c'" disabled @keypress="onlyNumber" type="text"
                                v-model:valueInput="formState.mobilePhone" style="width: 150px; margin-right: 8px"
                                :required="true" />
                        </a-form-item>
                        <a-form-item label="이메일" :span="8" class="red" :label-col="labelCol">
                            <mail-text-box v-if="formState.type !== 'c'" v-model:valueInput="formState.email"
                                style="width: 237px" :required="true" />
                            <mail-text-box v-else disabled :required="true" v-model:valueInput="formState.email"
                                style="width: 237px" />
                            <div style="margin-top: 3px;">
                                <button-basic :text="'비밀번호 변경'" v-if="formState.type !== 'c'" :type="'danger'"
                                    :mode="'outlined'" @onClick="showModal" :disabled="disabledBtn" />
                                <button-basic :text="'비밀번호 변경'" v-else :type="'danger'" :mode="'outlined'"
                                    :disabled="true" />
                            </div>
                        </a-form-item>
                        <div class="confirm-popup">
                            <a-modal footer="" v-model:visible="visible" :mask-closable="false">
                                <a-row>
                                    <a-col :span="4">
                                        <mail-outlined :style="{ fontSize: '70px' }" />
                                    </a-col>
                                    <a-col :span="20">
                                        <p><strong>비밀번호 설정 이메일</strong></p>
                                        <p>비밀번호 설정 링크가 이메일로 발송됩니다.</p>
                                        <p>계속 진행하시겠습니까?</p>
                                    </a-col>
                                    <a-col :span="4"></a-col>
                                    <a-col :span="20">
                                        <div class="custom-button-modal">
                                            <button-basic :width="120" text="아니오" :type="'default'" :mode="'outlined'"
                                                @onClick="closePopupEmail" style="margin-right: 10px;" />
                                            <button-basic text="네. 발송합니다" :type="'default'" :mode="'contained'"
                                                @onClick="sendMessToGmail" />
                                        </div>
                                    </a-col>
                                </a-row>
                            </a-modal>
                        </div>
                    </a-col>
                </a-row>
                <div style="margin-top: 50px">
                    <h2 class="title_modal">권한그룹설정 (복수선택 가능)</h2>
                    <div style="position: relative">
                        <div class="overlay" v-if="formState.type == 'c'"></div>
                        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="arrData" :show-bordes="true" :selected-row-keys="checkedNames"
                            :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                            :column-auto-width="true" class="table-scroll" key-expr="id"
                            @selection-changed="onSelectionChanged">
                            <DxSelection mode="multiple" />
                            <DxColumn data-field="id" caption="코드" :width="200" />
                            <DxColumn data-field="name" caption="권한그룹명" />
                            <DxColumn data-field="memo" caption="권한그룹설명" />
                        </DxDataGrid>
                    </div>
                </div>
                <a-row>
                    <a-col :offset="8" style="text-align: center; margin-top: 20px;">
                        <button-basic text="취소" :type="'default'" :mode="'outlined'" @onClick="setModalVisible"
                            style="margin-right: 10px;" />
                        <button-basic text="저장하고 나가기" :type="'default'" :mode="'contained'"
                            @onClick="confirmUpdate($event)" />
                    </a-col>
                </a-row>
            </standard-form>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from "vue";
import { useStore } from 'vuex';
import { DxSelectBox } from "devextreme-vue/select-box";
import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "@/graphql/queries/BF/BF2/BF210/index";
import mutations from "@/graphql/mutations/BF/BF2/BF210/index";
import notification from '@/utils/notification';
import Field from '../components/Field.vue';
import comfirmClosePopup from '@/utils/comfirmClosePopup';
import {
    DxDataGrid,
    DxColumn,
    DxSelection,
} from "devextreme-vue/data-grid";
import {
    SearchOutlined,
    WarningOutlined,
    MailOutlined,
    MenuOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
    props: ["modalStatus", "data", "msg", "title", 'typeHistory', 'idRowEdit'],
    components: {
        MenuOutlined,
        SearchOutlined,
        WarningOutlined,
        MailOutlined,
        DxDataGrid,
        DxColumn,
        DxSelection,
        DxSelectBox,
        Field,
    },
    setup(props, { emit }) {
        // config grid
        const store = useStore();
        let objDataDefault = reactive({})
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const toggleActive = ref(false)
        const visible = ref<boolean>(false);
        const statusMailValidate = ref<boolean>(true);
        const checkedNames = ref([])
        const triggerSearchRoleGroup = ref<boolean>(false);
        const originData = ref({
            page: 1,
            rows: per_page,
            types: ["m"],
        });
        const arrData = ref()
        const dataQuery = ref();
        let trigger = ref<boolean>(false);
        const formState = ref({
            id: 1,
            type: "",
            username: "",
            name: "",
            mobilePhone: "",
            email: "",
            president: true,
            managerGrade: 1,
            accountingRole: true,
            withholdingRole: true,
            createdAt: 1,
            createdBy: "",
            updatedAt: 1,
            updatedBy: "",
            ip: "",
            active: true,
            groupId: "",
            groupCode: "",
            groupName: "",
            facilityBusinesses: [],
            screenRoleGroups: [{
                id: "",
                name: "",
                type: "",
                readAdminScreenRoles: [],
                writeAdminScreenRoles: [],
                readWorkScreenRoles: [],
                writeWorkScreenRoles: [],
                lock: true,
                memo: "",
                createdAt: "",
                createdBy: "",
                updatedAt: "",
                updatedBy: "",
                ip: "",
                active: true
            }]
            ,
        });
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
        const typeSelect = ref()
        // ===================FUNCTION==================================
        const showModal = () => {
            visible.value = true;
        };
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        let disabledBtn = ref(true);
        const {
            mutate: updateUser,
            onDone: onDoneUpdate,
            onError: onErrorUpdate
        } = useMutation(mutations.updateUser);
        onDoneUpdate((e) => { 
            emit("updateDone", true)
            notification('success', `업데이트 완료!`)
            emit("closePopup", false)
        })
        onErrorUpdate(e => {
            notification('error', e.message)
        })
        const confirmUpdate = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            }
            else {
                if (statusMailValidate.value == true) {
                    let dataUpdate = {
                        id: props.idRowEdit,
                        input: {
                            name: formState.value.name,
                            screenRoleGroupIds: checkedNames.value,
                            mobilePhone: formState.value.mobilePhone,
                            email: formState.value.email,
                            active: formState.value.active,
                        }
                    }
                    updateUser(dataUpdate);
                } else {
                    notification('error', `이메일형식이 정확하지 않습니다.`)
                    var Url = document.getElementById("email") as HTMLInputElement;
                    Url.select()
                }
            }
        }
        const {
            mutate: sendGmail,
            onDone: doneSendGmail,
            onError: errorSendGmail
        } = useMutation(mutations.sendEmailToResetUserPassword);
        errorSendGmail(e => {
            notification('error', e.message)
        })
        doneSendGmail((e) => {
            notification('success', `비밀번호 재설정을 위한 이메일을 확인해주세요!`)
            visible.value = false
        })
        const sendMessToGmail = () => {
            let dataCallSendEmail = {
                id: props.idRowEdit,
            }
            sendGmail(dataCallSendEmail);
        }
        const { result, refetch } = useQuery(
            queries.getUser,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
        const { result: resRoleGroup, refetch: reqRoleGroup } = useQuery(
            queries.searchScreenRoleGroups, originData,
            () => ({
                enabled: triggerSearchRoleGroup.value,
                fetchPolicy: "no-cache",
            })
        );
        const onSelectionChanged = (e: any) => {
            checkedNames.value = e.selectedRowKeys
        }
        const onlyNumber = (e: any) => {
            let keyCode = e.keyCode ? e.keyCode : e.which;
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
                e.preventDefault();
            }
        }
        const setModalVisible = (e: any) => {
            if (JSON.stringify(objDataDefault) === JSON.stringify(formState.value) == true)
                emit("closePopup", false)
            else
                comfirmClosePopup(() => emit("closePopup", false))

        }
        const getColorTag = (data: string) => {
            if (data === "고객사") {
                return "blue";
            } else if (data === "최고매니저") {
                return "#4a4848";
            } else if (data === "중간매니저") {
                return "#4a4848";
            } else if (data === "담당매니저") {
                return "#4a4848";
            } else if (data === "영업자") {
                return "grey";
            } else if (data === "파트너") {
                return "#efe70b";
            }
        }
        const closePopupEmail = () => {
            visible.value = false
        }
        const triggerToggleEvent = (value: any) => {
            toggleActive.value = value;
        }
        const changeValueType = (data: any) => {
        }
        // ===================WATCH==================================
        watch(() => props.modalStatus,
            (newValue, old) => {
                if (newValue) {
                    trigger.value = true;
                    if (dataQuery) {
                        dataQuery.value = { id: props.idRowEdit };
                        refetch();
                    }
                }
            }
        );
        watch(result, (value) => {
            if (value && value.getUser) {
                formState.value.id = value.getUser.id;
                formState.value.type = value.getUser.type != "m" ? value.getUser.type : value.getUser.managerGrade;
                formState.value.username = value.getUser.username;
                formState.value.name = value.getUser.name;
                formState.value.mobilePhone = value.getUser.mobilePhone;
                formState.value.email = value.getUser.email;
                formState.value.president = value.getUser.president;
                formState.value.managerGrade = value.getUser.managerGrade;
                formState.value.accountingRole = value.getUser.accountingRole;
                formState.value.createdAt = value.getUser.createdAt;
                formState.value.updatedAt = value.getUser.updatedAt;
                formState.value.updatedBy = value.getUser.updatedBy;
                formState.value.ip = value.getUser.ip;
                formState.value.active = value.getUser.active;
                formState.value.facilityBusinesses = value.getUser.facilityBusinesses;
                formState.value.screenRoleGroups = value.getUser.screenRoleGroups;
                formState.value.groupCode = value.getUser.groupCode + " " + value.getUser.groupName;
                originData.value.types = [value.getUser.type]  
                typeSelect.value = value.getUser.type == 'm' ? 1 : (value.getUser.type == 'r' ? 3 : (value.getUser.type == 'p' ? 4 : 2))
                let arrSelect: any = []
                formState.value.screenRoleGroups.map((e) => {
                    arrSelect.push(e.id)
                })
                objDataDefault = {
                    ...formState.value
                }
                checkedNames.value = arrSelect
            }
        });
        watch(resRoleGroup, (value: any) => {
            if (value && value.searchScreenRoleGroups) {
                arrData.value = value.searchScreenRoleGroups.datas
            }
        });
        watch(() => formState.value.email, (newValue, old) => {
            if (newValue) {
                let checkMail = newValue.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
                if (!checkMail) {
                    statusMailValidate.value = false;
                    disabledBtn.value = true;
                } else {
                    statusMailValidate.value = true;
                    disabledBtn.value = false;
                }
            }
            else {
                disabledBtn.value = true;
            }
        });
        return {
            typeSelect,
            labelCol: { style: { width: "100px" } },
            changeValueType,
            move_column,
            colomn_resize,
            products,
            toggleActive,
            onSelectionChanged,
            onlyNumber,
            setModalVisible,
            triggerToggleEvent,
            getColorTag,
            closePopupEmail,
            checkedNames,
            layout,
            formState,
            showModal,
            visible,
            sendGmail,
            sendMessToGmail,
            confirmUpdate,
            statusMailValidate,
            arrData,
            disabledBtn
        };
    },
});
</script> 



<style lang="scss" scoped src="../style/styleEdit.scss"/>
