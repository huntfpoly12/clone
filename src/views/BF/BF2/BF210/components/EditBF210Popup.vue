<template>
  <div id="components-modal-demo-position">
    <a-modal
      :visible="modalStatus"
      title="영업자관"
      centered
      okText="저장하고 나가기"
      cancelText="그냥 나가기"
      @cancel="setModalVisible()"
      width="50%"
    >
      <a-form
        v-bind="layout"
        name="nest-messages"
        :model="formState"
        :validate-messages="validateMessages"
        @finish="onFinish"
      >
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="팩스">
              <a-input v-model:value="bf310Detail.팩스" style="width: 150px" />
            </a-form-item>
            <a-form-item label="주소">
              <a-input-search
                v-model:value="bf310Detail.name"
                placeholder="우편번호검색..."
                style="width: 200px"
              >
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
            <a-form-item label="주소">
              <a-switch
                v-model:checked="bf310Detail.주소"
                checked-children="발행"
                un-checked-children="미발행"
                style="width: 25%"
              />
            </a-form-item>

            <a-form-item label="등급">
              <a-select
                ref="select"
                v-model:value="bf310Detail.등급"
                style="width: 100px"
              >
                <a-select-option value="본사">본사</a-select-option>
                <a-select-option value="지사">지사</a-select-option>
                <a-select-option value="대리점">대리점</a-select-option>
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
              :rules="[{ type: 'number' }]"
            >
              <a-input v-model:value="formState.user.number" />
            </a-form-item>
            <a-form-item
              :name="['user', 'email']"
              label="이메일"
              :rules="[{ type: 'email' }]"
            >
              <a-input v-model:value="formState.user.email" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-button
              @click="showModal"
              type="primary"
              class="btn_sendemail"
              danger
              ghost
            >
              회원정보</a-button
            >
          </a-col>
        </a-row>
        <a-row v-model="isShow" :close="closeModal">
          <div class="modal">
            <p>Hello</p>
            <button @click="closeModal">close</button>
          </div>
        </a-row>
      </a-form>
    </a-modal>

    <a-modal
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
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue";

import type { UnwrapRef } from "vue";
import { SearchOutlined, WarningOutlined } from "@ant-design/icons-vue";
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
  props: ["modalStatus", "data", "msg"],

  components: {
    SearchOutlined,
    WarningOutlined,
  },
  created() {},
  data() {
    return {
      isShow: ref<boolean>(false),
    };
  },
  setup(props) {
    const data = props.data;

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const formTailLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    const visible = ref<boolean>(false);
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
    const confirmPopup = (value: any) => {
      if (value == "해지") {
        visible.value = true;
      }
    };
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
      visible,
      confirmPopup,
      confirm,
      handleOkConfirm,
      formState,
      onFinish,
      validateMessages,
    };
  },
  methods: {
    setModalVisible() {
      this.$emit("closePopup", false);
    },
    getColorTag(data: string) {
      if (data === "정상") {
        return "#108ee9";
      } else if (data === "해지") {
        return "#cd201f";
      } else if (data === "전체") {
        return "grey";
      }
    },
    validateEmail(value: any) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "Invalid Email Address";
      }
    },
    showModal() {
      this.isShow = true;
    },
    closeModal() {
      this.isShow = false;
    },
  },
});
</script>
<style>
.modal {
  width: 300px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
}
.btn_sendemail {
  margin-top: 10px;
  padding: 5px 10px;
  color: red;
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
</style>
