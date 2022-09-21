<template>
  <div id="cm-130" class="cm-130">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="기본">
        <a-row>
          <a-col :span="24">
            <div class="container">
              <a-form :model="formState" :label-col="labelCol">
                <h2 style="font-weight: 600; color: gray" class="title-h2">
                  급여기본설정
                </h2>

                <a-row>
                  <a-col :span="12">
                    <a-form-item label="급여신고주기">
                      <a-space direction="vertical">
                        <a-radio-group
                          v-model:value="value1"
                          :options="plainOptions"
                        />
                      </a-space>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item label="급여지급형태">
                      <a-space direction="vertical">
                        <a-radio-group
                          v-model:value="value2"
                          :options="payOptions"
                        />
                      </a-space>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="16">
                    <a-form-item label="급여지급형태">
                      <div style="display: flex; align-items: center">
                        <DxNumberBox
                          :value="0"
                          :min="0"
                          :max="30"
                          :show-spin-buttons="true"
                          :width="150"
                        />
                        <span style="margin-left: 5px"
                          >일, ( 말일은 ‘0’을 선택하세요)</span
                        >
                      </div>
                      <div
                        style="
                          display: flex;
                          margin-top: 10px;
                          align-items: center;
                        "
                      >
                        <warning-filled />
                        <span style="margin-left: 5px">
                          급여지급일자는 선택사항으로 지정시 급여명세서 등에
                          해당 급여일자가 입력되며, 수정 가능합니다.
                        </span>
                      </div>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item>
                      <div style="margin-left: 50px">
                        <span>두루누리 적용 여부 (사업자):</span>
                        <a-switch
                          v-model:checked="bf130Detail.switch"
                          checked-children="이용중"
                          un-checked-children="이용중지"
                          style="width: 10%; margin-left: 8px"
                        />
                      </div>
                      <div style="margin-left: 150px; margin-top: 10px">
                        <warning-filled />
                        <span style="margin-left: 5px">
                          사업자 두루누리 미적용시 해당 사원이 두루누리
                          적용이더라도 급여계산에 반영되지 않습니다.
                        </span>
                      </div>
                    </a-form-item>
                  </a-col>
                </a-row>

                <h2 style="font-weight: 600; color: gray" class="title-h2">
                  관할세무서, 지방소득세 납세지 설정
                </h2>
                <a-row :gutter="24">
                  <a-col>
                    <a-form-item label="사업장주소">
                      <a-input
                        disabled
                        style="width: 574px; margin-right: 10px"
                        v-model:value="formState.사업장주소"
                      />
                      <a-button @click="showModal" type="primary"
                        >자동선택
                      </a-button>
                      <a-modal
                        class="container_email"
                        v-model:visible="isShow"
                        @ok="handleSuccsess"
                      >
                        <div id="modal">
                          <div style="display: flex">
                            <question-circle-outlined
                              style="padding-right: 10px; font-size: xxx-large"
                            />
                            <span>
                              관할세무서 : 송파세무서 지방소득세 납세지 :
                              서울특별시 송파구 위 자동으로 선택된 결과로
                              적용하시겠습니까?
                            </span>
                          </div>
                        </div>
                      </a-modal>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-row :gutter="24">
                      <a-col>
                        <a-form-item label="관할세무서">
                          <a-input
                            disabled
                            style="width: 200px"
                            v-model:value="formState.관할세무서"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col>
                        <a-form-item label="지방소득세 납세지 ">
                          <a-input
                            disabled
                            style="width: 200px"
                            v-model:value="formState.tax"
                          />
                        </a-form-item>
                      </a-col>
                      <a-button type="primary" ghost @click="modalSetting"
                        >수동선택
                      </a-button>
                    </a-row>
                  </a-col>
                </a-row>
                <a-form-item :wrapper-col="{ span: 14, offset: 9 }">
                  <a-button type="primary" @click="onSubmit"
                    >그냥 나가기</a-button
                  >
                  <a-button style="margin-left: 10px">저장하고 나가기</a-button>
                </a-form-item>
              </a-form>
            </div>
          </a-col>
        </a-row>
        <SettingPopup
          :modalStatus="modalSettingStatus"
          @closePopup="modalSettingStatus = false"
          title="원천설정 [ cm-130 –pop ]"
        />
      </a-tab-pane>
      <a-tab-pane key="2" tab="급여항목">
        <div class="page-content">
          <DxDataGrid
            :data-source="dataSource"
            :show-borders="true"
            key-expr="ID"
            @exporting="onExporting"
          >
            <DxPaging :page-size="5" />
            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
            <DxExport :enabled="true" :allow-export-selected-data="true" />
            <DxToolbar>
              <DxItem name="searchPanel" />
              <DxItem name="exportButton" />
              <DxItem
                location="after"
                template="button-template"
                css-class="cell-button-add"
              />
              <DxItem name="groupPanel" />
              <DxItem name="addRowButton" show-text="always" />
              <DxItem name="columnChooserButton" />
            </DxToolbar>
            <template #button-template>
              <DxButton icon="plus" @click="openAddNewModal" />
            </template>
            <DxColumn data-field="코드" :width="50" css-class="cell-center" />

            <DxColumn
              data-field="이용여부"
              :width="80"
              css-class="cell-center"
            />
            <DxColumn data-field="과세구분" />

            <DxColumn data-field="항목명" />
            <DxColumn
              data-field="비과세코드"
              css-class="cell-center"
              :width="100"
            />
            <DxColumn data-field="제출여부" css-class="cell-center" />
            <DxColumn data-field="유형" />
            <DxColumn data-field="산출방법" />
            <DxColumn
              cell-template="pupop"
              css-class="cell-center"
              :width="60"
            />
            <template #pupop="{ data }" class="custom-action">
              <div class="custom-action">
                <a-space :size="10">
                  <a-tooltip placement="top">
                    <template #title>편집</template>
                    <EditOutlined @click="setModalEditVisible(data)" />
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
        <AddCM130Popup
          :modalStatus="modalAddNewStatus"
          @closePopup="modalAddNewStatus = false"
        />
        <EditCM130Popup
          :modalStatus="modalEditStatus"
          @closePopup="modalEditStatus = false"
          :data="popupData"
          title="원천설정 [ cm-130 –pop] "
        />
        <!-- <HistoryPopup
          :modalStatus="modalHistoryStatus"
          @closePopup="modalHistoryStatus = false"
          :data="popupData"
          title="변경이력[cm-000-pop]"
        /> -->
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import {
  UploadOutlined,
  WarningFilled,
  QuestionCircleOutlined,
} from "@ant-design/icons-vue";
import { message, RadioGroupProps } from "ant-design-vue";
import HistoryPopup from "../../../../components/HistoryPopup.vue";
import { employees } from "./data";
import { defineComponent, ref, toRaw, reactive } from "vue";
import { DxNumberBox } from "devextreme-vue/number-box";
import DxButton from "devextreme-vue/button";
import {
  EditOutlined,
  HistoryOutlined,
  LoginOutlined,
} from "@ant-design/icons-vue";
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
  DxItem,
} from "devextreme-vue/data-grid";
import EditCM130Popup from "../CM130/components/EditCM130Popup.vue";
import SettingPopup from "./components/SettingPopup.vue";
import { Workbook } from "exceljs";
import type { UnwrapRef } from "vue";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import AddCM130Popup from "./components/AddCM130Popup.vue";
const plainOptions = ["매월", "반기"];
const options = [
  { label: "매월", value: "매월" },
  { label: "반기", value: "반기" },
];
const pay = [
  { label: "당월지급", value: "당월지급" },
  { label: "익월지급", value: "익월지급" },
];
const payOptions = ["당월지급", "익월지급"];
interface FormState {
  상호: string;
  사업자유형: string;
  사업자번호: string;
  주소: string;
  대표번호: string;
  팩스번호: string;
  직인인감: string;
  사업장주소: string;
  관할세무서: string;
  tax: string;
  생년월일: string;
  이메일: string;
  switch: boolean;
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
    UploadOutlined,
    DxNumberBox,
    WarningFilled,
    QuestionCircleOutlined,
    SettingPopup,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxButton,
    DxToolbar,
    DxEditing,
    DxGrouping,
    DxItem,
    EditOutlined,
    HistoryOutlined,
    LoginOutlined,
    EditCM130Popup,
    HistoryPopup,
    AddCM130Popup,
  },
  data() {
    const value1 = ref<string>("매월");
    const value2 = ref<string>("당월지급");

    return {
      popupData: [],
      dataSource: employees,
      isShow: ref<boolean>(false),
      plainOptions,
      options,
      value1,
      value2,
      pay,
      payOptions,
      modalSettingStatus: false,
      employees,
      modalEditStatus: false,
      modalAddNewStatus: false,
    };
  },
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      상호: "효사랑노인요양전문병원",
      사업자유형: "고객",
      사업자번호: "215-87-15485",
      주소: "효사랑노인요양전문병원",
      대표번호: "0428753658",
      팩스번호: "0428743651",
      직인인감:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      사업장주소: "서울특별시 송파구 거마로9길 23, (거여동, 힐하우스) 301호",
      관할세무서: "송파세무서",
      tax: "서울특별시 송파구",
      생년월일: "예) 19801231",
      이메일: "bankda.jangbuda@gmail.com",
      switch: false,
    });
    const bf130Detail: UnwrapRef<FormState> = reactive({
      switch: false,
    });
    const isShow = ref<boolean>(false);
    const showModal = () => {
      isShow.value = true;
    };
    let previewImage: any = ref("/public/images/demo-image.jpg");

    const handleSuccsess = (e: MouseEvent) => {
      console.log(e);
      isShow.value = false;
    };
    const fileList = ref([]);
    const onSubmit = () => {
      console.log("submit!", toRaw(formState));
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

      previewImage,
      bf130Detail,
      isShow,
      showModal,
      handleSuccsess,
    };
  },
  methods: {
    onExporting(e: any) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("employees");
      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "DataGrid.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    modalSetting() {
      this.modalSettingStatus = true;
    },
    openAddNewModal() {
      this.modalAddNewStatus = true;
    },
    setModalEditVisible(data: any) {
      this.modalEditStatus = true;
      this.popupData = data;
    },
  },
});
</script>
<style lang="scss">
.cell-center {
  text-align: center !important;
}

.container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
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
.cell-center {
  text-align: center !important;
}
</style>
