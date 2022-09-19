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
                v-model:checked="bf310Detail.주소"
                checked-children="이용중"
                un-checked-children="이용중지"
                style="width: 30%"
              />
            </a-form-item>

            <a-form-item label="회원종류">
              <a-select
                style="width: 150px"
                v-model:value="dataMode.color"
                option-label-prop="children"
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

        <a-row>
          <a-col :span="12"> </a-col>
        </a-row>
        <a-row>
          <a-col :span="12"> </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              type="number"
              :name="['user', 'number']"
              label="휴대폰"
            >
              <div style="display: flex; align-items: flex-end">
                <a-input
                  @keypress="onlyNumber"
                  type="text"
                  v-model:value="formState.user.number"
                  style="width: 150px; margin-right: 8px"
                />
                <span style="color: #a19999">Numeric only!</span>
              </div>
            </a-form-item>
            <a-form-item
              :name="['user', 'email']"
              label="이메일"
              :rules="[{ type: 'email' }]"
            >
              <a-input
                v-model:value="formState.user.email"
                style="width: 250px"
              />
            </a-form-item>
            <a-form-item>
              <a-button class="btn_sendemail" @click="showModal"
                >비밀번호 변경
              </a-button>
              <a-modal
                class="container_email"
                v-model:visible="isShow"
                @ok="handleSuccsess"
              >
                <div id="modal_email" class="modal_email">
                  <mail-outlined style="padding-right: 10px" />
                  <div>
                    <p>비밀번호 설정 이메일</p>
                    <p>
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

        <DxDataGrid
          :data-source="dataSource"
          :show-borders="true"
          key-expr="ID"
          :allow-column-reordering="true"
          :allow-column-resizing="true"
          :column-auto-width="true"
          disable
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
    </a-modal>

    <!-- <a-modal
      v-model:visible="visible"
      title="해지 확인"
      ok-text="완료"
      class="confirm-modal"
    >
      <a-row>
        <a-col :span="4">
          <warning-outlined :style="{ fontSize: '70px', color: '#faad14' }" />
        </a-col>
        <a-col :span="20">
          <p>해지하실 경우 본 영업자에 속한 사업자들은 본사로 귀속됩니다.</p>
          <p>해지처리를 확정하시려면 “확인”을 입력하신 후 완료 버튼을</p>
          <p>누르세요</p>
        </a-col>
      </a-row>
      <template #footer>
        <a-input
          v-model:value="confirm"
          placeholder="확인"
          style="width: 150px"
        />
        <a-button type="primary" @click="handleOkConfirm" class="confirm-button"
          >완료</a-button
        >
      </template>
    </a-modal> -->
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue";
import { employees, states } from "../data.js";
import type { UnwrapRef } from "vue";
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

interface FormState {
  name: string;
  영업자코드: string;
  영업자명: string;
  사업자유형: string;
  상태: string;
  등급: string;
  주소: boolean;
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
    };
  },
  setup(props) {
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
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const formTailLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

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
      주소: false,
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
    validateEmail(value: any) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "Invalid Email Address";
      }
    },

    closeModal() {
      this.isShow = false;
    },
  },
});
</script>
<style>
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
#modal_email .anticon-mail svg {
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
  padding: 5px 10px;
  color: red;
  margin-left: 115px;
  border: 1px solid red;
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
