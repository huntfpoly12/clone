<template>
  <div id="components-modal-demo-position">
    <a-modal :visible="modalStatus" centered okText="저장하고 나가기" cancelText="그냥 나가기" @cancel="setModalVisible()"
      width="50%" :mask-closable="false">
      <h2 class="title_modal">회원정보</h2>
      <a-form v-bind="layout" name="nest-messages" v-model:value="formState">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="회원ID">
              <a-input v-model:value="formState.username" style="width: 150px; margin-right: 10px"
                @change="changeValueID" />
              <a-button style="border: 1px solid grey" @click="checkDuplicateUsername">중복체크</a-button>
            </a-form-item>
            <a-form-item label="회원명">
              <a-input v-model:value="formState.name" style="width: 150px; margin-right: 10px" />
            </a-form-item>
            <a-form-item label="소속">
              <!-- <a-select v-model:value="formState.groupCode" style="width: 250px" placeholder="Select a person"
                :options="selectSearch" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                @change="handleChange" >
                <template #suffixIcon>
                  <search-outlined :size="14" class="ant-select-suffix" />
                </template>
              </a-select> -->
              <a-select v-model:value="formState.groupCode" style="width: 120px" :options="selectSearch"
                @change="handleChange"></a-select>

            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="상태">
              <a-switch v-model:checked="formState.active" checked-children="이용중" un-checked-children="이용중지"
                style="width: 100px" />
            </a-form-item>

            <a-form-item label="회원종류">
              <a-select style="width: 10px" v-model:value="formState.type" option-label-prop="children"
                class="select_disable" @change="changeValueType">
                <a-select-option value="2" label="중간매니저">
                  <a-tag :color="getColorTag('중간매니저')">중간매니저</a-tag>
                </a-select-option>
                <a-select-option value="3" label="담당매니저">
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
            <a-form-item type="number" :name="['user', 'number']" label="휴대폰">
              <div style="display: flex; align-items: flex-end">
                <a-input @keypress="onlyNumber" type="text" v-model:value="createUser.mobilePhone"
                  style="width: 150px; margin-right: 8px" />
              </div>
            </a-form-item>
            <a-form-item :name="['user', 'email']" label="이메일" :rules="[{ type: 'email' }]">
              <a-input v-model:value="createUser.email" style="width: 250px" @change="validateEmail"
                :style="!statusMailValidate ? { borderColor: 'red'}: ''" id="email" />
              <p class="validate-message" v-if="!statusMailValidate">이메일 형식이 정확하지 않습니다.</p>
              <!-- <a-button html-type="submit" class="btn_submitemail" danger @click="showModal">비밀번호
                변경
              </a-button> -->
            </a-form-item>
            <a-form-item>
              <a-modal class="container_email" v-model:visible="isShow" @ok="handleSuccsess">
                <div id="modal_email" class="modal_email">
                  <mail-outlined style="padding-right: 10px" />
                  <div>
                    <p style="margin-bottom: 2px; font-weight: 600">
                      비밀번호 설정 이메일
                    </p>
                    <p style="margin-bottom: 0">
                      비밀번호 설정 링크가 이메일로 발송됩니다. 계속
                      진행하시겠습니까?
                    </p>
                  </div>
                </div>
              </a-modal>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

      <div class="page-content">
        <h2 class="title_modal">권한그룹설정 (복수선택 가능)</h2>

        <div style="position: relative">
          <DxDataGrid :data-source="arrData" :show-borders="true" :allow-column-reordering="true"
            :allow-column-resizing="true" :column-auto-width="true" class="table-scroll"
            @selection-changed="onSelectionChanged">
            <DxPaging :page-size="0" />
            <DxSelection data-field="active" mode="multiple" />

            <DxColumn data-field="id" caption="코드" :width="200" :fixed="true" />

            <DxColumn data-field="name" caption="권한그룹명" />

            <DxColumn data-field="screenRoles" caption="권한그룹설명" />
            <DxColumn :width="50" cell-template="modal-table" />
            <template #modal-table="{}">
              <div class="action-menu">
                <menu-outlined />
              </div>
            </template>
          </DxDataGrid>
        </div>
      </div>
      <template #footer>
        <div style="text-align: center;">
          <a-button @click="setModalVisible()">그냥 나가기</a-button>
          <a-button type="primary" @click="creactUserNew">저장하고 나가기</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, watch } from "vue";
import type { UnwrapRef } from "vue";
import { message } from 'ant-design-vue';
import mutations from "../../../../../graphql/mutations/BF/BF2/BF210/index";

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
import queries from "../../../../../graphql/queries/BF/BF2/BF210/index";
import { useQuery, useMutation } from "@vue/apollo-composable";

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
  },

  data() {
    return {

      dataMode: {
        color: "",
      },
    };
  },


  setup(props, { emit }) {
    const dataGrid = {};
    const userCreated = reactive({
      type: "r",
      username: "",
      name: "",
      salesRepresentativeId: null,
      screenRoleGroupIds: ["CONFIG_ACCOUNTING", "CONFIG_ACCOUNTING_CODE"],
      mobilePhone: "",
      email: "",
    });
    const ScreenRoleGroup = reactive({
      id: "",
      name: "",
      type: "",
      screenRoles: "",
      lock: true,
      memo: "",
      createdAt: "",
      createdBy: "",
      updatedAt: "",
      updatedBy: "",
      ip: "",
      active: true
    });
    const selectSearch = ref([{}]);
    const filterOption = (input: string, option: any) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleChange = (value: any) => {

    };
    const handleBlur = () => {
    };
    const handleFocus = () => {
    };
    const data = props.data;
    const isShow = ref<boolean>(false);
    const visible = ref<boolean>(false);
    const showModal = () => {
      isShow.value = true;
    };
    const handleSuccsess = (e: MouseEvent) => {
      isShow.value = false;
    };

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const formTailLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const focus = () => {
    };

    const dateFormat = "YYYY-MM-DD";

    const labelCol = { style: { width: "300px" } };
    const wrapperCol = { span: 14 };
    let confirm = ref<string>("");



    const changeValueType = (data: any) => {
      triggerGroup.value = true;
      trigger.value = true
      setTimeout(() => {
        let value = data
        if (data == 1 || data == 2 || data == 3) {
          value = 'm'
        }
        let dataCall: any = {
          type: value
        }
        originData.value.types = value
        reqGroup(dataCall)

        reqRoleGroup()
      }, 100);

    }

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
      screenRoleGroups: {
        id: "",
        name: "",
        type: "",
        screenRoles: "",
        lock: true,
        memo: "",
        createdAt: "",
        createdBy: "",
        updatedAt: "",
        updatedBy: "",
        ip: "",
        active: true
      }
    });



    const findGroups = reactive({
      groupId: 1,
      groupCode: "",
      groupName: "",
      active: true
    });
    const statusMailValidate = ref<boolean>(true);
    const validateEmail = (e: any) => {
      let checkMail = e.target.value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (!checkMail) {
        statusMailValidate.value = false;
      } else {
        statusMailValidate.value = true;
      }
    }


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
      rows: 20,
      types: ["r", "m", "c", "p", "s"],
    });
    const dataQuery = ref();

    let trigger = ref<boolean>(false);
    let triggerDuplication = ref<boolean>(false);
    let triggerGroup = ref<boolean>(false);

    watch(
      () => props.modalStatus,
      (newValue, old) => {
        if (newValue) {
          visible.value = newValue;
          dataQuery.value = {};
          trigger.value = true;

          reqRoleGroup();
        } else {
          visible.value = newValue;
          trigger.value = false;
        }
      }
    );
    // querie searchScreenRoleGroups
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

    //query find group
    const { onResult: resGroup, refetch: reqGroup } = useQuery(
      queries.findGroups, {},
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
      selectSearch.value = option
    })
    watch(resGroup, (value: any) => {
      if (value && value.findGroups) {
        arrData.value = value.findGroups.datas
      }
    });

    //querie checkDuplicateUsername 
    let dataCallCheck = ref({})
    const { refetch: refetchUserName, onResult: onResultUsername } =
      useQuery(queries.isUserRegistableUsername, dataCallCheck, () => ({ enabled: triggerDuplication.value, fetchPolicy: "no-cache", }))

    const checkDuplicateUsername = () => {
      if (formState.value.username !== '') {
        triggerDuplication.value = true
        refetchUserName()
      } else {
        message.error(`사용자 이름을 입력헤주세요!`)
      }
    }
    onResultUsername(e => {
      if (e.data)
        if (e.data.isUserRegistableUsername == true) {
          message.success(`사용 가능한 아이디입니다`)
        } else {
          message.error(`이미 존재하는 아이디 입니다. 다른 아이디를 입력해주세요`)
        }
    })
    const changeValueID = () => {
      dataCallCheck.value = {
        username: formState.value.username
      }
    }

    //Creact user 
    const {
      mutate: creactUser,
      onDone: creactDone,
      onError: creactError
    } = useMutation(mutations.createUser);

    creactError(e => {
      message.error(e.message, 2)
    })
    creactDone(e => {
      emit("closePopup", false)
      message.success("신규 사용자등록이 완료되었습니다. 비밀번호 설정을 위한 이메일을 확인해주세요.!")
    })

    var idRoleGroup: any = [];
    const onSelectionChanged = (selectedRows: any) => {
      idRoleGroup = JSON.parse(JSON.stringify(selectedRows.selectedRowsData));
    };

    const creactUserNew = () => {

      var RoleGroup = idRoleGroup.map((row: any) => {
        return row.id;
      })
      if (statusMailValidate.value == true) {
        let dataCallApiCreate = { input : {
          type: (formState.value.type == '2' || formState.value.type == '3') ? 'm' : formState.value.type,
          name: formState.value.name,
          username: formState.value.username,
          screenRoleGroupIds: RoleGroup,
          mobilePhone: formState.value.mobilePhone,
          email: formState.value.email,
          groupId: formState.value.groupCode,
          managerGrade: (formState.value.type == '2' || formState.value.type == '3') ? parseInt(formState.value.type) : null,
        }
      }
        creactUser(dataCallApiCreate)
      } else {
        message.error(`이메일형식이 정확하지 않습니다.`)
        var Url = document.getElementById("email") as HTMLInputElement;
        Url.select()
      }
    }

    return {
      changeValueID,
      arrData,
      labelCol,
      focus,
      wrapperCol,
      layout,
      formTailLayout,
      confirm,
      formState,
      isShow,
      showModal,
      handleSuccsess,
      selectSearch,
      filterOption,
      handleFocus,
      handleBlur,
      handleChange,
      createUser,
      ScreenRoleGroup,
      changeValueType,
      checkDuplicateUsername,
      statusMailValidate,
      validateEmail,
      creactUserNew,
      onSelectionChanged
    };
  },

  methods: {
    onlyNumber(e: any) {
      let keyCode = e.keyCode ? e.keyCode : e.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        e.preventDefault();
      }
    },
    setModalVisible() {
      this.$emit("closePopup", false);
    },
    getColorTag(data: string) {
      if (data === "중간매니저") {
        return "#4a4848";
      } else if (data === "담당매니저") {
        return "#4a4848";
      } else if (data === "영업자") {
        return "grey";
      } else if (data === "파트너") {
        return "#efe70b";
      }
    },

    closeModal() {
      this.isShow = false;
    },
  },
});
</script>
<style scoped>
::v-deep .ant-modal-footer {
  padding-top: 0;
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
</style>


