<template>
  <div id="components-modal-demo-position">
    <a-modal
      :visible="modalStatus"
      title="사업자관리 "
      okText="저장하고 나가기"
      cancelText="그냥 나가기"
      width="1000px"
      @cancel="setModalVisible()"
    >
      <a-collapse v-model:activeKey="activeKey" accordion>
        <a-collapse-panel key="1" header="사업자정보">
          <a-form :label-col="labelCol">
            <a-form-item label="상 호">
              <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="사업자등록번호">
              <a-input v-model:value="formState.name" style="width: 150px" />
            </a-form-item>
            <a-row>
              <a-col :span="12">
                <a-form-item label="사업자유형">
                  <a-radio-group v-model:value="formState.resource">
                    <a-radio value="1">법인사업자</a-radio>
                    <a-radio value="2">개인사업자</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="{ $id no }">
                  <a-input value="800123-1234567" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item label="주소">
              <a-row :gutter="[0, 4]">
                <a-col :span="24">
                  <a-row>
                    <a-col :span="12">
                      <a-input
                        v-model:value="formState.name"
                        style="width: 300px"
                      />
                    </a-col>
                    <a-col :span="12">
                      <a-button type="primary">우편번호 검색</a-button>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col :span="24">
                  <a-row>
                    <a-input v-model:value="formState.name" />
                  </a-row>
                </a-col>
                <a-col :span="24">
                  <a-row>
                    <a-input v-model:value="formState.name" />
                  </a-row>
                </a-col>
              </a-row>
              <a-row> </a-row>
            </a-form-item>
            <a-row>
              <a-col>
                <a-form-item label="연락처">
                  <a-input
                    v-model:value="formState.desc"
                    style="width: 150px"
                  />
                </a-form-item>
                <a-form-item label="팩 스">
                  <a-input
                    v-model:value="formState.desc"
                    style="width: 150px"
                  />
                </a-form-item>
              </a-col>
              <imgUpload
                :title="titleModal"
                @update-img="getImgUrl"
                :marginTop="marginTopModal"
              />
            </a-row>
          </a-form>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="대표자정보">
          <a-form :label-col="labelCol" ref="formRef" name="custom-validation">
            <a-form-item has-feedback label="대표자명">
              <a-input value="홍길동" autocomplete="off" style="width: 300px" />
            </a-form-item>
            <a-form-item has-feedback label="생년월일">
              <a-input
                value="19620820"
                autocomplete="off"
                style="width: 300px"
              />
            </a-form-item>
            <a-form-item has-feedback label="휴대폰번호">
              <a-input-number value="01098765432" style="width: 300px" />
            </a-form-item>
            <a-form-item has-feedback label="이메일">
              <a-input value="abc123@mailaddress.com" style="width: 300px" />
            </a-form-item>
          </a-form>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="CMS (자동이체출금) 계좌 정보 입력">
          <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="출금은행">
              <a-select ref="select" value="은행선택" style="width: 200px">
                <a-select-option value="은행선택">은행선택</a-select-option>
                <a-select-option value="국민은행">국민은행</a-select-option>
                <a-select-option value="신한은행">신한은행</a-select-option>
                <a-select-option value="우리은행">우리은행</a-select-option>
                <a-select-option value="기업은행">기업은행</a-select-option>
                <a-select-option value="카카오뱅크">카카오뱅크</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="출금계좌번호">
              <a-input value="100100056489011" />
            </a-form-item>
            <a-form-item label="예금주명">
              <a-input value="주식회사 타운소프트비나" />
            </a-form-item>
            <a-form-item label="사업자(주민)등록번호:">
              <a-input value="100100056489011" />
            </a-form-item>
            <a-form-item label="자동이체출금일자" align="start">
              <a-radio-group v-model:value="value">
                <a-radio :style="radioStyle" :value="1">매월 5일</a-radio>
                <a-radio :style="radioStyle" :value="2">매월 12일</a-radio>
                <a-radio :style="radioStyle" :value="3">매월 19일</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-form>
        </a-collapse-panel>
        <a-collapse-panel key="4" header="메모" class="modal-note">
          <a-table bordered :data-source="dataSource" :pagination="false">
            <template #bodyCell="{ text, index }">
              <div>
                <div class="title-note">
                  <div>Han Aram 수정 2022-09-05 게시 2022-09-05</div>
                  <div v-if="index == 0">
                    <PlusSquareOutlined
                      :style="{ fontSize: '25px' }"
                      @click="handleAdd"
                    />
                  </div>
                </div>
                <div>
                  <a-textarea
                    placeholder="전달사항입력"
                    allow-clear
                    v-model:value="text.note"
                  />
                </div>
                <a-space :size="8" style="margin-top: 7px">
                  <save-outlined
                    :style="{ fontSize: '20px' }"
                    @click="handleCopy(text.note)"
                  />
                  <DeleteOutlined
                    :style="{ fontSize: '20px' }"
                    @click="handleDelete(text.key)"
                  />
                </a-space>
              </div>
            </template>
          </a-table>
        </a-collapse-panel>
      </a-collapse>
    </a-modal>

    <a-modal
      :visible="modalStatusHistory"
      footer=""
      @cancel="setModalVisibleHis()"
      width="1000px"
    >
      <div style="margin-top: 20px">
        <DxDataGrid
          :data-source="dataTableShow"
          :show-borders="true"
          key-expr="key"
        >
          <DxColumn data-field="기록일시" />
          <DxColumn data-field="비고" />
          <DxColumn data-field="생성일시" />
          <DxColumn data-field="생성자ID" />
          <DxColumn data-field="삭제여부" />
          <DxColumn data-field="IP주소" />
          <DxColumn data-field="상세" cell-template="detail" />
          <template #detail="{}">
            <a-space :size="8">
              <zoom-in-outlined :style="{ fontSize: '15px' }" />
            </a-space>
          </template>
        </DxDataGrid>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import DxDropDownBox from "devextreme-vue/drop-down-box";
import imgUpload from "../../../../../components/UploadImage.vue";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxSelection,
} from "devextreme-vue/data-grid";

import {
  UploadOutlined,
  MinusCircleOutlined,
  ZoomInOutlined,
  SaveOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  WarningFilled,
} from "@ant-design/icons-vue";
import type { UploadProps } from "ant-design-vue";
export default defineComponent({
  props: {
    modalStatus: Boolean,
    modalStatusHistory: Boolean,
  },
  components: {
    DxDropDownBox,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    UploadOutlined,
    MinusCircleOutlined,
    ZoomInOutlined,
    SaveOutlined,
    DeleteOutlined,
    PlusSquareOutlined,
    WarningFilled,
    imgUpload,
  },
  data() {
    return {
      marginTopModal: "margin-top : -67px",
    };
  },
  setup() {
    const loading = ref<boolean>(false);
    const previewTitle = ref("");
    const fileList = ref<UploadProps["fileList"]>([]);
    const activeKey = ref([]);
    const formState = ref({
      name: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    });
    const labelCol = ref({ style: { width: "150px" } });
    const wrapperCol = ref({ span: 14 });
    const radioStyle = ref({
      display: "flex",
      height: "30px",
      lineHeight: "30px",
    });
    const value = ref<number>(1);
    const dataSource = ref([
      {
        key: 0,
        note: "",
      },
    ]);
    const dataTableShow = ref([
      {
        key: 0,
        기록일시: "2022-09-05 13:52:09",
        비고: "승인>사업자등록번호 등록",
        생성일시: "2022-09-05 13:52:09",
        생성자ID: "@mdo",
        삭제여부: "1",
        IP주소: "123.451.342.1",
      },
    ]);
    const keyNumber = ref(0);
    const titleModal = "사업자등록증";

    return {
      fileList,
      loading,
      previewTitle,
      activeKey,
      formState,
      labelCol,
      wrapperCol,
      radioStyle,
      value,
      dataSource,
      dataTableShow,
      keyNumber,
      titleModal,
    };
  },
  methods: {
    getImgUrl(img: any) {
      console.log("imgUrl", img);
    },
    setModalVisible() {
      this.$emit("closePopup", false);
    },
    setModalVisibleHis() {
      this.$emit("closePopupHis", false);
    },
    getColorTag(data: string) {
      if (data === "신청") {
        return "red";
      } else if (data === "심사중") {
        return "blue";
      } else if (data === "승인") {
        return "green";
      } else if (data === "반려") {
        return "grey";
      }
    },

    handleAdd() {
      this.keyNumber++;
      let dataDef = {
        key: this.keyNumber,
        note: "",
      };
      this.dataSource.push(dataDef);
    },
    handleDelete(key: number) {
      if (this.dataSource.length > 1) {
        this.dataSource = this.dataSource.filter(function (obj) {
          return obj.key != key;
        });
      }
    },
    handleCopy(note: any) {
      this.keyNumber++;
      let dataDef = {
        key: this.keyNumber,
        note: note,
      };
      this.dataSource.push(dataDef);
    },
  },
});
</script>
<style lang="scss" scoped>
::v-deep.components-modal-demo-position {
  ::v-deep.test-local {
    background-color: pink !important;
    width: 1000px !important;
    height: 200px !important;
  }
  .imgPreview img {
    width: 1000px !important;
  }

  .warring-modal {
    font-size: 13px;
    line-height: 5px;
  }

  .ant-form-item-label {
    text-align: left;
  }
}
</style>
