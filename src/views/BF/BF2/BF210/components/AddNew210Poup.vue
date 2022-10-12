<template>
  <div id="components-modal-demo-position">
    <a-modal :visible="modalStatus" centered okText="저장하고 나가기" cancelText="그냥 나가기" @cancel="setModalVisible()"
      width="50%" :mask-closable="false">
      <h2 class="title_modal">회원정보</h2>
      <a-form v-bind="layout" name="nest-messages" v-model:value="formState" :validate-messages="validateMessages"
        @finish="onFinish">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="회원ID ">
              <a-input v-model:value="formState.username" style="width: 150px; margin-right: 10px" />
              <button style="border: 1px solid grey">중복체크</button>
            </a-form-item>
            <a-form-item label="회원명">
              <a-input v-model:value="formState.name" style="width: 150px; margin-right: 10px" />
            </a-form-item>
            <a-form-item label="소속">
              <a-select v-model:value="bf310Detail.name" show-search placeholder="Select a person" style="width: 300px"
                :options="selectSearch" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                @change="handleChange" class="select-search">
                <template #suffixIcon>
                  <search-outlined :size="14" class="ant-select-suffix" />
                </template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="상태">
              <a-switch v-model:checked="formState.active" checked-children="이용중" un-checked-children="이용중지"
                style="width: 100px" />
            </a-form-item>

            <a-form-item label="회원종류">
              <!-- <a-select v-model:value="dataMode.color" style="width: 150px"
                :field-names="{ label: 'name', value: 'id', options: 'children' }" @focus="focus"
                @change="handleChange"> -->
              <!-- </a-select> -->
              <a-select v-model:value="formState.type" style="width: 150px" @change="handleChange">
                <a-select-opt-group label="담당매니저">
                  <a-select-option value="m2" label="중간매니저">
                    <a-tag :color="getColorTag('중간매니저')">중간매니저</a-tag>
                  </a-select-option>
                  <a-select-option value="m3" label="담당매니저">
                    <a-tag :color="getColorTag('중간매니저')">담당매니저</a-tag>
                  </a-select-option>
                  <a-select-opt-group value="영업자" label="영업자">
                    <a-select-option value="r" label="영업자">
                      <a-tag :color="getColorTag('영업자')">영업자</a-tag>
                    </a-select-option>
                  </a-select-opt-group>

                  <a-select-option value="lucy">Lucy</a-select-option>
                </a-select-opt-group>

              </a-select>




              <!-- <a-select style="width: 150px" v-model:value="formState.type">
                <a-select-option value="m" label="담당매니저">
                  <a-tag :color="getColorTag('담당매니저')">담당매니저</a-tag>
                </a-select-option>
                <a-select-option value="r" label="영업자">
                  <a-tag :color="getColorTag('영업자')">영업자</a-tag>
                </a-select-option>
                <a-select-option value="p" label="파트너">
                  <a-tag style="color: black" :color="getColorTag('파트너')">파트너</a-tag>
                </a-select-option>
              </a-select> -->
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
              <a-input v-model:value="createUser.email" style="width: 250px" />

              <a-button :disabled="!validated" html-type="submit" class="btn_submitemail" danger @click="showModal">비밀번호
                변경
              </a-button>
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

      <div style="margin-top: 50px" class="page-content">
        <h2 class="title_modal">권한그룹설정 (복수선택 가능)</h2>

        <div style="position: relative">
          <div v-if="!bf310Detail.switch" class="overlay"></div>
          <DxDataGrid :data-source="dataSource" :show-borders="true" :allow-column-reordering="true"
            :allow-column-resizing="true" :column-auto-width="true">
            <DxPaging :page-size="5" />
            <DxSelection mode="multiple" />

            <DxColumn data-field="id" caption="코드" :width="200" :fixed="true" />

            <DxColumn data-field="name" caption="권한그룹명" />

            <DxColumn data-field="screenRoles" caption="권한그룹설명" />
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
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue";
import { employees, states } from "../data.js";
import type { UnwrapRef } from "vue";
import type { SelectProps } from "ant-design-vue";
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
import dayjs, { Dayjs } from "dayjs";
import { any } from "vue-types";
import queries from "../../../../../graphql/queries/BF/BF2/BF210/index";
import { useQuery, useMutation } from "@vue/apollo-composable";


interface FormState {
  name: string;
  영업자코드: string;
  영업자명: string;
  사업자유형: string;
  상태: string;
  등급: string;
  switch: boolean;
  은행: string;
  계좌번호: string;
  등록번호: string;
  예금주: string;
  가입일자: string;
  사업자등록번호: string;
  휴대폰: string;
  비고: string;
  이메일: string;
  연락처: string;
  팩스: string;
  전자세금계산서수신이메일: string;
}

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
  created() {
    // console.log("createUser", this.createUser);
  },
  data() {
    return {
      isShow: ref<boolean>(false),

      states,
      dataMode: {
        color: "",
      },
    };
  },
  computed: {
    validated() {
      return this.validateEmail(this.createUser.email);
    },
  },

  setup(props) {
    const userCreated = reactive({
      type: "r",
      username: "",
      name: "",
      salesRepresentativeId: null,
      screenRoleGroupIds: ["CONFIG_ACCOUNTING", "CONFIG_ACCOUNTING_CODE"],
      mobilePhone: "",
      email: "",
    });
    const dataSource = ref([]);
    const selectSearch = ref<SelectProps["options"]>([
      { value: "C20225301", label: "C20225301     효사랑노인요양전문병원" },
      { value: "C20235301", label: "C20225301     효사랑노인요양전문병원" },
      { value: "D20223838", label: "D20223838     테크노프로그램우리컴퍼니" },
    ]);
    const filterOption = (input: string, option: any) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleChange = (value: any) => {
      console.log(`selected ${value}`);
    };
    const handleBlur = () => {
      console.log("blur");
    };
    const handleFocus = () => {
      console.log("focus");
    };
    const data = props.data;
    const isShow = ref<boolean>(false);
    const visible = ref<boolean>(false);
    const showModal = () => {
      isShow.value = true;
    };
    const handleSuccsess = (e: MouseEvent) => {
      console.log(e);
      isShow.value = false;
    };
    const onToggle = () => {
      bf310Detail.switch = !bf310Detail.switch;
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
      console.log('focus');
    };
    // const options = ref<SelectProps['options']>([
    //   {
    //     id: 'jack',
    //     name: 'Jack',
    //     children: [
    //       {
    //         id: 'small jack',
    //         name: 'samll Jack',
    //       },
    //     ],
    //   },
    //   {
    //     id: 'jack',
    //     name: 'Jack',
    //     children: [
    //       {
    //         id: 'small jack',
    //         name: 'samll Jack',
    //       },
    //     ],
    //   },
    // ]);

    const dateFormat = "YYYY-MM-DD";

    const labelCol = { style: { width: "300px" } };
    const wrapperCol = { span: 14 };
    let confirm = ref<string>("");

    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "이메일 형식이 정확하지 않습니다",
        number: "Numeric only!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };

    const formState = reactive({
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
    const onFinish = (values: any) => {
      console.log("Success:", values);
    };
    const bf310Detail: UnwrapRef<FormState> = reactive({
      name: "",
      사업자유형: "개인",
      상태: "정상",
      등급: "본사",
      switch: true,
      은행: "농협",
      계좌번호: "",
      예금주: "",
      가입일자: "",
      비고: "",
      영업자코드: "",
      영업자명: "",
      등록번호: "",
      사업자등록번호: "",
      휴대폰: "",
      이메일: "",
      연락처: "",
      팩스: "",
      전자세금계산서수신이메일: "",
    });

    const handleOkConfirm = () => {
      console.log(data, "fffffff");
      if (confirm.value == "확인") {
        visible.value = false;
      } else {
        bf310Detail.상태 = "정상";
        visible.value = false;
      }
    };
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
    const { onResult } = useQuery(
      queries.searchScreenRoleGroups,
      originData.value
    );
    // const {
    //   mutate: Creat,
    //   loading: signinLoading,
    //   onDone: signinDone,
    //   onError: onError,
    // } = useMutation(mutations.createUser.createUser, () => ({
    //   variables: {
    //     ...userCreated,
    //   },
    // }));

    onResult((res) => {
      // if (res.loading) {
      //   console.log(originData.value);
      // } else {
      // }
      dataSource.value = res.data.searchScreenRoleGroups.datas;
    });
    return {
      labelCol,
      focus,
      wrapperCol,
      bf310Detail,
      layout,
      formTailLayout,
      value1: ref<Dayjs>(),
      onToggle,
      confirm,
      handleOkConfirm,
      formState,
      onFinish,
      validateMessages,
      isShow,
      showModal,
      handleSuccsess,
      selectSearch,
      filterOption,
      handleFocus,
      handleBlur,
      handleChange,
      createUser,
      dataSource,
      userCreated,
      // options,
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
    validateEmail(email: any): any {
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
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

.ant-form-item-label {
  text-align: left;
}

.ant-popover-arrow {
  display: none;
}
</style>
