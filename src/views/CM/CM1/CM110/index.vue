<template>
  <div id="cm-110" class="page-content">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="사업자">
        <div class="container">
          <a-form :model="formState" :label-col="labelCol">
            <h2 class="title-h2">사업자정보</h2>
            <a-form-item label="상호">
              <a-input v-model:value="formState.상호" :disabled="true" style="width: 300px" />
            </a-form-item>
            <div style="display: flex;">
              <div>
                <a-form-item label="사업자유형">
                  <a-input v-model:value="formState.사업자유형" :disabled="true" style="width: 120px" />
                </a-form-item>
              </div>
              <div style="margin-left: 200px;">
                <a-form-item label="사업자번호">
                  <a-input v-model:value="formState.사업자번호" :disabled="true" style="width: 176px" />
                </a-form-item>
              </div>
            </div>
            <a-form-item label="주소">
              <a-input v-model:value="formState.주소" :disabled="true" style="width: 647px" />
            </a-form-item>
            <div style="display: flex;">
              <div style="display: flex;">
                <a-form-item label="대표번호">
                  <inputFormat @valueInput="changeValueInputEmit" :format="'#,##0'" :min="''" :max="''"
                    :spinButtons="false" :clearButton="false" :nameService="'대표번호'" style="width: 182px;"
                    :valueInput="formState.대표번호" />
                </a-form-item>
                <p class="validate-message" style="width: 121px;">‘-’없이 숫자만 입력</p>
              </div>
              <div style="display: flex; margin-left: 19px;">
                <a-form-item label="팩스번호">
                  <inputFormat @valueInput="changeValueInputEmit" :format="'#,##0'" :min="''" :max="''"
                    :spinButtons="false" :clearButton="false" :nameService="'팩스번호'" style="width: 175px;"
                    :valueInput="formState.팩스번호" />
                </a-form-item>
                <p class="validate-message" style="width: 121px;">‘-’없이 숫자만 입력</p>
              </div>
            </div>
            <h2 class="title-h2">직인등록</h2>
            <a-row>
              <a-col :span="24">
                <a-row>
                  <a-col :span="6">
                    <a-form-item label="직인(인감)" style="margin-bottom: 5px;">
                      <a-image :width="100" :src="previewImage" :preview="false"
                        fallback="data:image/png;base64,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" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="14">
                    <div class="preview-image">
                      <a-row>
                        <a-col :span="5">
                          <a-button type="primary" @click="stampReview">직인자동생성</a-button>
                        </a-col>
                        <a-col :span="16">
                          <InfoCircleFilled />
                          <a-typography-text>
                            직인 이미지를 자동으로 생성하여 등록합니다.
                          </a-typography-text>
                        </a-col>
                      </a-row>
                    </div>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-row>
                  <a-col :span="6">
                    <a-upload v-model:file-list="fileList" :headers="headers" @change="handleChange"
                      :multiple="false" :showUploadList="false" accept=".png,.jpeg,.jpg">
                      <a-button class="btn-upload-image">직인업로드</a-button>
                    </a-upload>

                  </a-col>
                  <a-col :span="14" :xl="14">
                    <InfoCircleFilled />
                    <a-typography-text>
                      이미지 사이즈 : 100 x 100 이하 / 파일크기 : 1M 이하 /
                      종류 : GIF, JPG, PNG
                    </a-typography-text>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
            <h2 class="title-h2">대표자정보</h2>
            <div style="display: flex;">
              <div>
                <a-form-item label="대표자명">
                  <a-input v-model:value="formState.대표자명" :disabled="true" style="width: 176px" />
                </a-form-item>
              </div>

              <div style="display: flex; margin-left: 150px;">
                <a-form-item label="휴대폰">
                  <inputFormat @valueInput="changeValueInputEmit" :format="'#,##0'" :min="''" :max="''"
                    :spinButtons="false" :clearButton="false" :nameService="'휴대폰'" style="width: 175px;"
                    :valueInput="formState.휴대폰" />
                </a-form-item>
                <p class="validate-message" style="width: 121px;">‘-’없이 숫자만 입력</p>
              </div>
            </div>
            <div style="display: flex;">
              <a-form-item label="생년월일">
                <inputFormat @valueInput="changeValueInputEmit" :format="'#,##0'" :min="''" :max="''"
                  :spinButtons="false" :clearButton="false" :nameService="'생년월일'" style="width: 175px;"
                  :valueInput="formState.생년월일" />
              </a-form-item>
              <p class="validate-message">
                ‘-’없이 8자리 숫자로 입력하세요. ( 자릿수 : 연4 월2 일2 )
              </p>
            </div>
            <div style="display: flex;">
              <a-form-item label="이메일">
                <a-input v-model:value="formState.이메일" style="width: 300px" @change="validateEmail" :before-upload="beforeUpload"
                  :style="!statusMailValidate ? { borderColor: 'red'}: ''" />
              </a-form-item>
              <p class="validate-message" v-if="!statusMailValidate">
                이메일 형식이 정확하지 않습니다.
              </p>
            </div>
          </a-form>
        </div>
        <a-form-item class="btn-submit">
          <a-button type="primary" @click="onSubmit">그냥 나가기</a-button>
          <a-button style="margin-left: 10px">저장하고 나가기</a-button>
        </a-form-item>
        <ReviewStampImage :modalStatus="modalStampReviewStatus" @closePopup="modalStampReviewStatus = false"
          :data="fileImage" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="이용자">
        <DxDataGrid :data-source="dataTableShow" :show-borders="true" key-expr="key">
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
          <DxExport :enabled="true" :allow-export-selected-data="true" />

          <DxToolbar>
            <DxItem name="searchPanel" />
            <DxItem name="exportButton" />
            <DxItem location="after" template="button-template" css-class="cell-button-add" />
            <DxItem name="groupPanel" />
            <DxItem name="addRowButton" show-text="always" />
            <DxItem name="columnChooserButton" />
          </DxToolbar>
          <template #button-template>
            <DxButton icon="plus" @click="openAddNewModal" />
          </template>
          <DxColumn data-field="이용자ID" :width="200" />
          <DxColumn data-field="상태" cell-template="tag-status" css-class="cell-center" :width="150" />
          <template #tag-status="{ data }">
            <a-tag :color="getColorTag(data.value)">{{ data.value }}</a-tag>
          </template>
          <DxColumn data-field="성명" :width="200" />
          <DxColumn data-field="회계권한(담당사업)" />
          <DxColumn data-field="원천권한" cell-template="checked-status" :width="80" :allowEditing="true" />
          <template #checked-status="{ data }">
            <a-checkbox :checked="data.value" @change="checkedRow(data)" />
          </template>
          <DxColumn :width="80" cell-template="pupop" />
          <template #pupop="{ data }" class="custom-action">
            <div class="custom-action">
              <a-space :size="10">
                <a-tooltip placement="top">
                  <template #title>편집</template>
                  <EditOutlined @click="openEditModal(data)" />
                </a-tooltip>
                <a-tooltip placement="top">
                  <template #title>변경이력</template>
                  <HistoryOutlined @click="modalHistory(data)" />
                </a-tooltip>
                <a-tooltip placement="top">
                  <template #title>로그인이력</template>
                  <login-outlined @click="modalLogin(data)" />
                </a-tooltip>
              </a-space>
            </div>
          </template>
        </DxDataGrid>
        <a-form-item class="btn-submit-table">
          <a-button type="primary" @click="onSubmit">그냥 나가기</a-button>
          <a-button style="margin-left: 10px">저장하고 나가기</a-button>
        </a-form-item>
        <AddNewCM110Poup :modalStatus="modalAddNewStatus" @closePopup="modalAddNewStatus = false" />
        <EditCM110Popup :modalStatus="modalEditStatus" @closePopup="modalEditStatus = false" :data="popupData" />
        <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
          title="변경이력[cm-000-pop]" />
        <ListLoginPopup :modalStatus="modalLoginStatus" @closePopup="modalLoginStatus = false" :data="popupData"
          title="로그인이력 [ cm-000-popLogin ]" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSelection,
  DxSearchPanel,
  DxToolbar,
  DxEditing,
  DxGrouping,
  DxScrolling,
  DxItem
} from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import AddNewCM110Poup from "./components/AddNewCM110Poup.vue";
import EditCM110Popup from "./components/EditCM110Popup.vue"
import HistoryPopup from "../../../../components/HistoryPopup.vue";
import inputFormat from '../../../../components/inputBoxFormat.vue';

import { defineComponent, ref, toRaw, reactive } from "vue";
import type { UnwrapRef } from "vue";
import { InfoCircleFilled, EditOutlined, HistoryOutlined, LoginOutlined } from "@ant-design/icons-vue";
import ReviewStampImage from "./components/ReviewStampImage.vue";
import ListLoginPopup from "../../../../components/ListLoginPopup.vue";
import type { UploadProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';
interface FormState {
  상호: string;
  사업자유형: string;
  사업자번호: string;
  주소: string;
  대표번호: string;
  팩스번호: string;
  직인인감: string;
  대표자명: string;
  휴대폰: string;
  생년월일: string;
  이메일: string;
}

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default defineComponent({
  components: {
    InfoCircleFilled,
    LoginOutlined,
    EditOutlined,
    HistoryOutlined,
    ReviewStampImage,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel,
    DxToolbar,
    DxEditing,
    DxGrouping,
    DxScrolling,
    DxButton,
    DxItem,
    HistoryPopup,
    AddNewCM110Poup,
    EditCM110Popup,
    ListLoginPopup,
    inputFormat
  },
  setup() {
    let modalAddNewStatus = ref(false);
    let modalEditStatus = ref(false);
    let modalHistoryStatus = ref(false);
    let modalLoginStatus = ref(false);
    let popupData = ref();
    const statusMailValidate = ref<boolean>(true);
    const dataTableShow = ref([
      {
        key: 0,
        이용자ID: "tsv-estaram",
        상태: "이용중",
        성명: "이목룡",
        "회계권한(담당사업)": "방문요양, 주야간보호, 방문목욕, 단기보호",
        원천권한: true,
      },
      {
        key: 1,
        이용자ID: "tsv-tungtv",
        상태: "이용중",
        성명: "도비엣뚱",
        "회계권한(담당사업)": "주야간보호, 방문목욕, 단기보호",
        원천권한: false,
      },
      {
        key: 2,
        이용자ID: "bankda-ceo",
        상태: "이용중지",
        성명: "홍길동",
        "회계권한(담당사업)": "단기보호",
        원천권한: false,
      },
      {
        key: 3,
        이용자ID: "bankda-techleader",
        상태: "이용중",
        성명: "이병헌",
        "회계권한(담당사업)": "방문목욕, 단기보호",
        원천권한: false,
      },
    ]);

    const formState: UnwrapRef<FormState> = reactive({
      상호: "효사랑노인요양전문병원",
      사업자유형: "고객",
      사업자번호: "215-87-15485",
      주소: "효사랑노인요양전문병원",
      대표번호: "0428753658",
      팩스번호: "0428743651",
      직인인감:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      대표자명: "홍길동",
      휴대폰: "01056898845",
      생년월일: "19801231",
      이메일: "bankda.jangbuda@gmail.com",
    });

    let previewImage: any = ref("");
    let fileImage: any = ref(null);
    let modalStampReviewStatus: any = ref();
    const fileList = ref<UploadProps['fileList']>([]);
    const handleChange = async (info: any) => {
      if (info.file.status !== "uploading") {
        console.log(info.file.originFileObj.size, 'dfgdfdfg');
        if (info.file.originFileObj.size <= 1000000) {
          previewImage.value = await getBase64(info.file.originFileObj);
          fileImage.value = info;
        } else {
          message.error(`이미지 사이즈 : 100 x 100 이하 / 파일크기 : 1M 이하 / 종류 : GIF, JPG, PNG`);
        }
      }
      // if (info.file.status === "done") {
      //   //message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === "error") {
      //   //console.log(info.file);
      //   //message.error(`${info.file.name} file upload failed.`);
      // }
    };

    const stampReview = () => {
      modalStampReviewStatus.value = true;
    };
    const openAddNewModal = () => {
      modalAddNewStatus.value = true;
    }
    const openEditModal = (data: any) => {
      modalEditStatus.value = true;
      popupData.value = data;
    }
    const modalHistory = (data: any) => {
      modalHistoryStatus.value = true;
      popupData.value = data;
    }

    const modalLogin = (data: any) => {
      modalLoginStatus.value = true;
      popupData.value = data;
    }

    const onSubmit = () => {
      console.log("submit!", toRaw(formState));
    };

    const getColorTag = (data: string) => {
      if (data === "이용중") {
        return "rgb(16 142 236 / 62%)";
      } else if (data === "이용중지") {
        return "rgb(205 32 31 / 51%)";
      }
    }

    const checkedRow = (data: any) => {
      dataTableShow.value[data.key].원천권한 = !dataTableShow.value[data.key].원천권한;
    }
    const changeValueInputEmit = (data: { name: string; value: any; }) => {
      if (data.name == '팩스번호') {

      }

      switch (data.name) {
        case '팩스번호':
          formState.팩스번호 = data.value;
          break;
        case '대표번호':
          formState.대표번호 = data.value;
          break;
        case '휴대폰':
          formState.휴대폰 = data.value;
          break;
        case '생년월일':
          formState.생년월일 = data.value;
          break;
        default:
        // code block
      }

    }
    const validateNumber = (e: any, name: string) => {
      let valNumberOnly = e.target.value.replace(/\D+/g, '');
      switch (name) {
        case '대표번호':
          formState.대표번호 = valNumberOnly;
          break;
        case '팩스번호':
          formState.팩스번호 = valNumberOnly;
          break;
        case '휴대폰':
          formState.휴대폰 = valNumberOnly;
          break;
        case '생년월일':
          formState.생년월일 = valNumberOnly;
          break;
        default:
        // code block
      }
    }
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
    const beforeUpload: UploadProps['beforeUpload'] = file => {
      
      return false;
    };
    return {
      labelCol: { style: { width: "150px" } },
      formState,
      onSubmit,
      activeKey: ref("1"),
      fileList,
      headers: {
        authorization: "authorization-text",
      },
      checkedRow,
      handleChange,
      previewImage,
      stampReview,
      modalStampReviewStatus,
      fileImage,
      dataTableShow,
      modalAddNewStatus,
      modalEditStatus,
      modalHistoryStatus,
      modalLoginStatus,
      openAddNewModal,
      openEditModal,
      modalHistory,
      modalLogin,
      popupData,
      getColorTag,
      validateNumber,
      validateEmail,
      statusMailValidate,
      changeValueInputEmit,
      beforeUpload
    };
  },
});
</script>
<style scoped>
.page-content>>>.cell-button-add {
  padding-left: 100px !important;
}

.page-content>>>.ant-tag {
  width: 65px;
  text-align: center;
}

.container {
  width: 1200px;
  padding-right: 10px;
  padding-left: 10px;
}

.title-h2 {
  margin-left: 1%;
}

.validate-message {
  margin-left: 2%;
  color: #c3baba;
}

.btn-upload-image {
  width: 100px;
  margin-left: 150px;

}

.btn-submit-table {
  margin-top: 20px;
  text-align: center;
}

.btn-submit {
  margin-top: 20px;
  margin-left: 280px;
}


.page-content>>>.cell-center {
  text-align: center !important
}

.ant-form-item {
  margin-bottom: 10px;
}
</style>
  