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
                            <switch-basic v-model:valueSwitch="formState.active" textCheck="이용중" textUnCheck="이용중지"
                                :disabled="formState.type == 'c' ? true : false" />
                        </a-form-item>
                        <a-form-item label="회원종류" class="red" :label-col="labelCol">
                            <DxSelectBox id="custom-templates" :data-source="products" display-expr="name"
                                value-expr="id" item-template="item" :height="$config_styles.HeightInput"
                                style="width:170px" field-template="field" :value="typeSelect" :disabled="true">
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
                                            <button-basic :width="120" text="아니오" type="default" mode="outlined"
                                                @onClick="closePopupEmail" class="mr-10" />
                                            <button-basic text="네. 발송합니다" type="default" mode="contained"
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
                        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="arrData"
                            :show-bordes="true" :selected-row-keys="checkedNames" :allow-column-reordering="move_column"
                            :allow-column-resizing="colomn_resize" :column-auto-width="true" class="table-scroll"
                            key-expr="id" @selection-changed="onSelectionChanged">
                            <DxScrolling mode="standard" show-scrollbar="always" />
                            <DxSelection mode="multiple" />
                            <DxColumn data-field="id" caption="코드" :width="200" />
                            <DxColumn data-field="name" caption="권한그룹명" />
                            <DxColumn data-field="memo" caption="권한그룹설명" />
                        </DxDataGrid>
                    </div>
                </div>
                <a-col style="text-align: center; margin-top: 20px;">
                    <button-basic text="취소" type="default" mode="outlined" @onClick="setModalVisible"
                        class="mr-10" :width="120"/>
                    <button-basic text="저장하고 나가기" type="default" mode="contained" @onClick="confirmUpdate($event)"
                        :disabled="formState.type == 'c' ? true : false" :width="150"/>
                </a-col>
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
import { formStatePopupEdit, productsPopupEdit } from '../utils/index';

import {
    DxDataGrid,
    DxColumn,
    DxSelection,
    DxScrolling
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
        MenuOutlined, SearchOutlined, WarningOutlined, MailOutlined, DxDataGrid, DxColumn, DxSelection, DxSelectBox, DxScrolling,
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
        const formState = ref({ ...formStatePopupEdit });
        let products = ref([...productsPopupEdit])
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
                        reqRoleGroup()
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
                if (value.getUser.type == 'm' && value.getUser.managerGrade == '2')
                    typeSelect.value = 1
                if (value.getUser.type == 'm' && value.getUser.managerGrade == '3')
                    typeSelect.value = 2
                if (value.getUser.type == 'r')
                    typeSelect.value = 3
                if (value.getUser.type == 'p')
                    typeSelect.value = 4
                if (value.getUser.type == 'c')
                    typeSelect.value = 5

                let arrSelect: any = []
                formState.value.screenRoleGroups.map((e) => {
                    arrSelect.push(e.id)
                })
                objDataDefault = {
                    ...formState.value
                }
                checkedNames.value = arrSelect
            }
            trigger.value = false;
            triggerSearchRoleGroup.value = true;
        });
        watch(resRoleGroup, (value: any) => {
            triggerSearchRoleGroup.value = false;
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
            typeSelect, labelCol: { style: { width: "100px" } }, move_column, colomn_resize, products, toggleActive, checkedNames, layout, formState, visible, statusMailValidate, arrData, disabledBtn,
            changeValueType, onSelectionChanged, onlyNumber, setModalVisible, triggerToggleEvent, getColorTag, closePopupEmail, showModal, sendGmail, sendMessToGmail, confirmUpdate,
        };
    },
});
</script>
<style lang="scss" scoped>
::v-deep .ant-form-item-control {
  display: flex;
  flex-direction: row;
}

::v-deep .red {
  label {
      color: red;
  }
}

::v-deep .ant-form-item-explain-error {
  width: 400px;
  margin-left: 5px;
  padding-top: 5px;
}

::v-deep .ant-form-item-label>label {
  width: 110px;
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

.container_email .ant-modal-body {
  padding: 0 24px;
  padding-top: 16px;
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

.select-search ::v-deep .ant-select-arrow .anticon>svg {
  width: 16px;
  height: 16px;
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
  align-items: center;
}

.btn_sendemail {
  margin-top: 10px;
  padding: 7px;
  color: red;
  border: 1px solid red
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

.warring-modal {
  font-size: 13px;
  line-height: 5px;
}

.ant-form-item-label {
  text-align: left;
}

.ant-popover-arrow {
  display: none;
}

.table-scroll {
  height: 300px;
  overflow-y: auto;
  padding: 5px;
}

::v-deep .dx-datagrid.dx-gridbase-container {
  border: 1px solid #ddd
}
</style>
  

















<style lang="scss" scoped src="../style/styleEdit.scss"/>
