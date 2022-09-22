<template>
  <div id="components-modal-demo-position">
    <a-modal
      :visible="modalStatus"
      :title="title"
      centered
      okText="저장하고 나가기"
      cancelText="그냥 나가기"
      @cancel="setModalVisible()"
      width="50%"
    >
      <h2 class="title_modal">회원정보</h2>
      <a-form
        v-bind="layout"
        name="nest-messages"
        :model="formState"
        :validate-messages="validateMessages"
        @finish="onFinish"
      >
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="회원ID">
              <a-input
                disabled
                value="S0001"
                style="width: 150px; margin-right: 10px"
              />
              <button
                disabled
                style="
                  background-color: #00000040;
                  color: #918e8b;
                  border: none;
                  height: 32px;
                "
              >
                중복체크
              </button>
            </a-form-item>
            <a-form-item label="회원명">
              <a-input
                value="김회원명"
                style="width: 150px; margin-right: 10px"
              />
            </a-form-item>
            <a-form-item label="소속">
              <a-input-search v-model:value="bf310Detail.name" placeholder="">
                <template #prefix>
                  <search-outlined />
                </template>
                <template #enterButton>
                  <a-button>
                    <search-outlined />
                  </a-button>
                </template>
              </a-input-search>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="상태">
              <a-switch
                v-model:checked="bf310Detail.switch"
                checked-children="이용중"
                un-checked-children="이용중지"
                style="width: 100px"
              />
            </a-form-item>

            <a-form-item label="회원종류">
              <a-select
                style="width: 150px"
                v-model:value="dataMode.color"
                option-label-prop="children"
                class="select_disable"
                disabled
              >
                <a-select-option value="고객사" label="고객사">
                  <a-tag style="color: black" :color="getColorTag('고객사')"
                    >고객사</a-tag
                  >
                </a-select-option>
                <a-select-option value="최고매니저" label="최고매니저">
                  <a-tag :color="getColorTag('최고매니저')">최고매니저</a-tag>
                </a-select-option>
                <a-select-option value="중간매니저" label="중간매니저">
                  <a-tag :color="getColorTag('중간매니저')">중간매니저</a-tag>
                </a-select-option>
                <a-select-option value="담당매니저" label="담당매니저">
                  <a-tag :color="getColorTag('중간매니저')">담당매니저</a-tag>
                </a-select-option>
                <a-select-option value="영업자" label="영업자">
                  <a-tag :color="getColorTag('영업자')">영업자</a-tag>
                </a-select-option>
                <a-select-option value="파트너" label="파트너">
                  <a-tag style="color: black" :color="getColorTag('파트너')"
                    >파트너</a-tag
                  >
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-rowc :gutter="24">
          <a-col :span="12"> </a-col>
        </a-rowc>
        <a-row>
          <a-col :span="12"> </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              type="number"
              :name="['user', 'number']"
              label="휴대폰"
              :span="4"
            >
              <div style="display: flex; align-items: flex-end">
                <a-input
                  @keypress="onlyNumber"
                  type="text"
                  v-model:value="formState.user.number"
                  style="width: 150px; margin-right: 8px"
                />
              </div>
              <div :class="{ active: toggleActive }" class="toggle_container">
                <ToggleButton v-on:change="triggerToggleEvent" />
              </div>
            </a-form-item>
            <a-form-item
              :name="['user', 'email']"
              label="이메일"
              :rules="[{ type: 'email' }]"
              :span="8"
            >
              <a-input
                v-model:value="formState.user.email"
                style="width: 250px"
              />
              <a-button
                :disabled="!validated"
                html-type="submit"
                danger
                class="btn_sendemail"
                @click="showModal"
                >비밀번호 변경
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-modal
                :disabled="!formState.user.email"
                class="container_email"
                v-model:visible="isShow"
                @ok="handleSuccsess"
              >
                <div id="modal_email" class="modal_email">
                  <mail-outlined style="padding-right: 10px" />
                  <div>
                    <p
                      style="
                        margin-bottom: 2px;
                        font-weight: 600;
                        margin-top: 16px;
                      "
                    >
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

      <div style="margin-top: 50px" disabled class="page-content">
        <h2 class="title_modal">권한그룹설정 (복수선택 가능)</h2>
        <div style="position: relative">
          <div v-if="!bf310Detail.switch" class="overlay"></div>
          <DxDataGrid
            :data-source="dataSource"
            :show-borders="true"
            key-expr="ID"
            :allow-column-reordering="true"
            :allow-column-resizing="true"
            :column-auto-width="true"
          >
            <DxSelection mode="multiple" />

            <DxColumn data-field="코드" :width="80" :fixed="true" />

            <DxColumn data-field="권한그룹명" />

            <DxColumn data-field="권한그룹설명" />
            <DxColumn :width="50" cell-template="modal-table" />
            <template #modal-table="{}">
              <div class="action-menu"><menu-outlined /></div>
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
import { ref, defineComponent, reactive, computed } from "vue";
import { employees, states } from "../data.js";
import type { UnwrapRef } from "vue";
import { DxSelectBox } from "devextreme-vue/select-box";

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
import themes from "devextreme/ui/themes";
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
  props: ["modalStatus", "data", "msg", "title"],

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
  },
  created() {},
  data() {
    return {
      isShow: ref<boolean>(false),
      dataSource: employees,
      states,
      dataMode: {
        color: "고객사",
      },
      toggleActive: false,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },
  computed: {
    validated() {
      return this.validateEmail(this.formState.user.email);
    },
  },
  setup(props) {
    const data = props.data;
    const isShow = ref<boolean>(false);
    const visible = ref<boolean>(false);
    const validateError = ref<boolean>(false);
    const showModal = () => {
      isShow.value = true;
    };

    const onToggle = () => {
      bf310Detail.switch = !bf310Detail.switch;
    };

    const handleSuccsess = (e: MouseEvent) => {
      console.log(e);
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

    const labelCol = { style: { width: "300px" } };
    const wrapperCol = { span: 14 };
    let confirm = ref<string>("");

    const validateMessages = {
      required: true,
      types: {
        email: "이메일 형식이 정확하지 않습니다",
      },
    };

    const formState = reactive({
      user: {
        number: "",
        age: undefined,
        email: "",
        website: "",
        introduction: "",
      },
    });
    const onFinish = (values: any) => {
      console.log("Success:", values);
    };
    const bf310Detail: UnwrapRef<FormState> = reactive({
      name: "",
      사업자유형: "개인",
      상태: "정상",
      등급: "본사",
      switch: false,
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

    return {
      labelCol,
      wrapperCol,
      bf310Detail,
      layout,
      formTailLayout,
      value1: ref<Dayjs>(),
      confirm,
      handleOkConfirm,
      formState,
      onFinish,
      validateMessages,
      isShow,
      showModal,
      handleSuccsess,
      onToggle,
    };
  },
  methods: {
    onlyNumber(e: any) {
      //console.log($event.keyCode); //keyCodes value
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
    triggerToggleEvent(value: any) {
      this.toggleActive = value;
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
::v-deep .ant-form-item-control {
  display: flex;
  flex-direction: row;
}
::v-deep .ant-form-item-explain-error {
  width: 400px;
  margin-left: 5px;
  padding-top: 5px;
}
::v-deep .ant-form-item-label > label {
  width: 110px;
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
