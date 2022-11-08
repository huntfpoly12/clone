<template>
  <div id="components-modal-demo-position">
    <a-modal :visible="modalStatus" :title="title" centered okText="저장하고 나가기" cancelText="그냥 나가기"
      @cancel="setModalVisible()" width="50%" :mask-closable="false">

      <template #footer>
        <!-- <div>
          <a-button @click="setModalVisible()">그냥 나가기</a-button>
          <a-button type="primary" @click="confirmUpdate">저장하고 나가기</a-button>
        </div> -->
      </template>
      <h2 class="title_modal">회원정보</h2>
      <a-form v-bind="layout" name="nest-messages" v-model:value="formState" @finish="onFinish">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="회원ID" class="red">
              <div class="dflex">
                <default-text-box disabled v-model:valueInput="formState.username"
                  style="width: 150px; margin-right: 10px" />
                <dx-button disabled=true type="default" style="border: 1px solid">
                  중복체크
                </dx-button>
              </div>
            </a-form-item>
            <a-form-item label="회원명" class="red">
              <default-text-box v-if="formState.type != 'c'" v-model:valueInput="formState.name"
                style="width: 150px; margin-right: 10px" />
              <default-text-box v-if="formState.type == 'c'" disabled v-model:valueInput="formState.name"
                style="width: 150px; margin-right: 10px" />
            </a-form-item>
            <!-- <a-form-item label="소속">
              <a-select v-model:value="formState.groupCode" class="select-search" disabled style="width: 150px;" />
            </a-form-item> -->
            <a-form-item label="소속" class="red">
              <default-text-box v-model:valueInput="formState.groupCode" style="width: 150px; margin-right: 10px"
                :disabled="true" />
              <!-- <DxSelectBox v-model:value="formState.groupCode" style="width: 190px" /> -->
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="상태">
              <a-switch v-if="formState.type != 'c'" v-model:checked="formState.active" checked-children="이용중"
                un-checked-children="이용중지" style="width: 100px" />
              <a-switch v-if="formState.type == 'c'" disabled v-model:checked="formState.active" checked-children="이용중"
                un-checked-children="이용중지" style="width: 100px" />
            </a-form-item>
            <a-form-item label="회원종류" class="red">
              <a-select style="width: 150px" v-model:value="formState.type" option-label-prop="children"
                class="select_disable" disabled>
                <a-select-option value="c" label="고객사">
                  <a-tag style="color: black" :color="getColorTag('고객사')">고객사</a-tag>
                </a-select-option>
                <a-select-option :value="1" label="최고매니저">
                  <a-tag :color="getColorTag('최고매니저')">최고매니저</a-tag>
                </a-select-option>
                <a-select-option :value="2" label="중간매니저">
                  <a-tag :color="getColorTag('중간매니저')">중간매니저</a-tag>
                </a-select-option>
                <a-select-option :value="3" label="담당매니저">
                  <a-tag :color="getColorTag('중간매니저')">담당매니저</a-tag>
                </a-select-option>
                <a-select-option value="r" label="영업자">
                  <a-tag :color="getColorTag('영업자')">영업자</a-tag>
                </a-select-option>
                <a-select-option value="p" label="파트너">
                  <a-tag style="color: black" :color="getColorTag('파트너')">파트너</a-tag>
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item type="number" :name="['user', 'number']" label="휴대폰" :span="4" class="red">
              <div style="display: flex; align-items: flex-end">
                <tel-text-box v-if="formState.type !== 'c'" @keypress="onlyNumber" type="text"
                  v-model:valueInput="formState.mobilePhone" style="width: 150px; margin-right: 8px" />
                <tel-text-box v-if="formState.type == 'c'" disabled @keypress="onlyNumber" type="text"
                  v-model:valueInput="formState.mobilePhone" style="width: 150px; margin-right: 8px" />
              </div>
              <div :class="{ active: toggleActive }" class="toggle_container">
                <ToggleButton v-on:change="triggerToggleEvent" />
              </div>
            </a-form-item>
            <a-form-item label="이메일" :span="8" class="red" >
              <mail-text-box v-if="formState.type !== 'c'" v-model:valueInput="formState.email" style="width: 237px" />
              <mail-text-box v-else disabled v-model:valueInput="formState.email" style="width: 237px"/>

              <DxButton v-if="formState.type !== 'c'" html-type="submit" danger class="btn_sendemail"
                @click="showModal" :disabled="disabledBtn">
                비밀번호 변경</DxButton>
              <DxButton v-if="formState.type == 'c'" disabled=true html-type="submit" danger class="btn_sendemail">비밀번호
                변경
              </DxButton>

            </a-form-item>
            <div class="confirm-popup">
              <a-modal v-model:visible="visible" :mask-closable="false">
                <a-row>
                  <a-col :span="4">
                    <mail-outlined :style="{ fontSize: '70px' }" />
                  </a-col>
                  <a-col :span="20">
                    <p><strong>비밀번호 설정 이메일</strong></p>
                    <p>비밀번호 설정 링크가 이메일로 발송됩니다.</p>
                    <p>계속 진행하시겠습니까?</p>
                  </a-col>
                </a-row>
                <template #footer>
                  <a-button @click="closePopupEmail">아니오</a-button>
                  <a-button type="primary" @click="sendMessToGmail">네. 발송합니다</a-button>
                </template>
              </a-modal>
            </div>
          </a-col>
        </a-row>
      </a-form>
      <div style="margin-top: 50px">
        <h2 class="title_modal">권한그룹설정 (복수선택 가능)</h2>
        <div style="position: relative">
          <div class="overlay" v-if="formState.type == 'c'"></div>
          <DxDataGrid :data-source="arrData" :show-bordes="true" :selected-row-keys="checkedNames"
            :allow-column-reordering="true" :allow-column-resizing="true" :column-auto-width="true" class="table-scroll"
            key-expr="id" @selection-changed="onSelectionChanged">
            <DxSelection mode="multiple" />

            <DxColumn data-field="id" caption="코드" :width="200" />
            <DxColumn data-field="name" caption="권한그룹명" />
            <DxColumn data-field="memo" caption="권한그룹설명" />
            <DxColumn :width="50" cell-template="modal-table" />
            <template #modal-table="{}">
              <div class="action-menu">
                <menu-outlined />
              </div>
            </template>
            <template class="custom-action">
              <div class="custom-action">
                <a-space :size="10">
                  <a-tooltip placement="top">
                    <template #title>편집</template>
                    <EditOutlined />
                  </a-tooltip>
                  <a-tooltip placement="top">
                    <template #title>변경이력</template>
                    <HistoryOutlined />
                  </a-tooltip>
                </a-space>
              </div>
            </template>
          </DxDataGrid>
        </div>
      </div>
      <a-row>
        <a-col :offset="8" style="text-align: center; margin-top: 20px;">
          <DxButton :width="120" text="취소" type="default" styling-mode="outlined" @click="setModalVisible"
            style="margin-right: 10px;" />
          <DxButton id="button" :use-submit-behavior="true" text="저장하고 나가기" type="default" @click="confirmUpdate" />
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { DxSelectBox } from "devextreme-vue/select-box";
import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "../../../../../graphql/queries/BF/BF2/BF210/index";
import mutations from "../../../../../graphql/mutations/BF/BF2/BF210/index";
import { message } from 'ant-design-vue';
import { DxCheckBox } from 'devextreme-vue/check-box';
import DxButton from 'devextreme-vue/button';
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSelection,
  DxSearchPanel,
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
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxSelectBox,
    DxCheckBox,
    DxButton
  },
  data() {
    return {
      toggleActive: false,
    };
  },
  setup(props, { emit }) {
    const visible = ref<boolean>(false);
    const statusMailValidate = ref<boolean>(true);
    const checkedNames = ref([])
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
    const showModal = () => {
      visible.value = true;
    };
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const labelCol = { style: { width: "300px" } };
    const wrapperCol = { span: 14 };
    let disabledBtn = ref(true);
    //Update info user
    const {
      mutate: updateUser,
      onDone: onDoneUpdate,
      onError: onErrorUpdate
    } = useMutation(mutations.updateUser);
    onDoneUpdate((e) => {
      message.success(`업데이트 완료!`);
      emit("closePopup", false)
    })
    onErrorUpdate(e => {
      message.error(e.message);
    })
    const confirmUpdate = () => {
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
        message.error(`이메일형식이 정확하지 않습니다.`)
        var Url = document.getElementById("email") as HTMLInputElement;
        Url.select()
      }
    }
    //Send mail 
    const {
      mutate: sendGmail,
      onDone: doneSendGmail,
      onError: errorSendGmail
    } = useMutation(mutations.sendEmailToResetUserPassword);
    errorSendGmail(e => {
      message.error(e.message)
    })
    doneSendGmail((e) => {
      message.success(`비밀번호 재설정을 위한 이메일을 확인해주세요!`);
      visible.value = false
    })
    const sendMessToGmail = () => {
      let dataCallSendEmail = {
        id: props.idRowEdit,
      }
      sendGmail(dataCallSendEmail);
    }
    const dataQuery = ref();
    let trigger = ref<boolean>(false);

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
    // const validateEmail = (e: any) => {
    //   let checkMail = e.target.value.match(
    //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //   );
    //   if (!checkMail) {
    //     statusMailValidate.value = false;
    //     disabledBtn.value = true;
    //   } else {
    //     statusMailValidate.value = true;
    //     disabledBtn.value = false;
    //   }
    // }
    const { result, refetch } = useQuery(
      queries.getUser,
      dataQuery,
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
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
        triggerSearchRoleGroup.value = true
        let arrSelect: any = []
        formState.value.screenRoleGroups.map((e) => {
          arrSelect.push(e.id)
        })
        checkedNames.value = arrSelect
      }
    });
    const onFinish = (values: any) => {
    };
    const triggerSearchRoleGroup = ref<boolean>(false);
    const originData = ref({
      page: 1,
      rows: 20,
      types: ["m"],
    });
    // querie searchScreenRoleGroups
    const { result: resRoleGroup, refetch: reqRoleGroup } = useQuery(
      queries.searchScreenRoleGroups, originData,
      () => ({
        enabled: triggerSearchRoleGroup.value,
        fetchPolicy: "no-cache",
      })
    );
    const arrData = ref()
    watch(resRoleGroup, (value: any) => {
      if (value && value.searchScreenRoleGroups) {
        arrData.value = value.searchScreenRoleGroups.datas
      }
    });
    
    watch(() => formState.value.email, (newValue, old) => {
      if (newValue) {
        console.log(newValue);
        
        let checkMail = newValue.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );console.log(checkMail);

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
      checkedNames,
      labelCol,
      wrapperCol,
      layout,
      formState,
      onFinish,
      // validateEmail,
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
  methods: {
    onSelectionChanged(e: any) {
      console.log(e.selectedRowKeys);
      this.checkedNames = e.selectedRowKeys
      // e.component.refresh(true);
    },
    onlyNumber(e: any) {
      let keyCode = e.keyCode ? e.keyCode : e.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        e.preventDefault();
      }
    },
    setModalVisible() {
      this.$emit("closePopup", false);
    },
    getColorTag(data: string) {
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
    },
    closePopupEmail() {
      this.visible = false
    },
    triggerToggleEvent(value: any) {
      this.toggleActive = value;
    },
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
