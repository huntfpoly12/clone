<template>
  <div id="components-modal-demo-position">
    <a-modal
      :visible="modalStatus"
      title="계약정보관리&심사 "
      centered
      okText="저장하고 나가기"
      cancelText="그냥 나가기"
      @cancel="setModalVisible()"
      width="50%"
    >
      <a-collapse v-model:activeKey="activeKey" accordion>
        <a-collapse-panel key="1" header="심사정보">
          <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="승인상태">
              <DxDropDownBox
                v-model:value="gridBoxValue"
                v-model:opened="isGridBoxOpened"
                :defer-rendering="false"
                :display-expr="gridBoxDisplayExpr"
                :show-clear-button="true"
                :data-source="gridDataSource"
                value-expr="ID"
                placeholder="Select a value..."
              >
                <template #content>
                  <DxDataGrid
                    height="100%"
                    :data-source="gridDataSource"
                    v-model:selected-row-keys="gridBoxValue"
                    @selection-changed="onGridSelectionChanged()"
                    :show-borders="true"
                  >
                    <DxSelection mode="single" />
                    <DxPaging :page-size="5" />
                    <DxColumn data-field="신청코드" />
                    <DxColumn
                      data-field="심사상태"
                      data-type="date"
                      cell-template="grid-cell"
                    />
                    <template #grid-cell="{ data }">
                      <a-tag :color="getColorTag(data.value)">{{
                        data.value
                      }}</a-tag>
                    </template>
                    <DxColumn data-field="상호" data-type="date" />
                  </DxDataGrid>
                </template>
              </DxDropDownBox>
            </a-form-item>
            <a-form-item label="사업자코드">
              <a-typography-title :level="5">C22020312</a-typography-title>
            </a-form-item>
            <a-row>
              <a-col :span="12">
                <a-form-item label="신청코드">
                  <a-typography-title :level="5">R22012501</a-typography-title>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="신청일자">
                  <a-typography-title :level="5">2022-08-25</a-typography-title>
                </a-form-item>
              </a-col>
            </a-row>

            <a-form-item label="심사메모">
              <a-input v-model:value="value" placeholder="Basic usage" />
            </a-form-item>
            <a-form-item label="약관동의">
              <a-button type="link">서비스약관</a-button>
              |
              <a-button type="link">개인정보제공활용동의</a-button>
              |
              <a-button type="link">회계서비스약관동의</a-button>
              |
              <a-button type="link">원천서비스약관동의</a-button>
            </a-form-item>
          </a-form>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="사업자정보">
          <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="상 호">
              <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="사업자등록번호">
              <a-input v-model:value="formState.name" style="width: 300px" />
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
                  <a-input value="800123-1234567" style="width: 300px" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item label="주소">
              <a-row :gutter="[0, 16]">
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
            <a-row :gutter="[16, 16]">
              <a-col :span="18">
                <a-form-item label="연락처">
                  <a-input v-model:value="formState.desc" />
                </a-form-item>
                <a-form-item label="팩 스">
                  <a-input v-model:value="formState.desc" />
                </a-form-item>
                <a-form-item label="사업자등록증">
                  <a-upload
                    v-model:file-list="fileList"
                    name="file"
                    :multiple="false"
                    @change="handleChange"
                  >
                    <a-button>
                      <upload-outlined></upload-outlined>
                      파일선택
                    </a-button>
                  </a-upload>
                </a-form-item>

                <div :style="{ fontSize: '12px' }">
                  <div></div>
                  <div>
                    <p>
                      아래 형식에 맞는 이미지파일을 선택한 후 업로드하십시요.
                    </p>
                    <p>파일형식 : PDF, JPG(JPEG), TIF, GIF, PNG</p>
                    <p>파일용량 : 최대 5MB</p>
                  </div>
                </div>
              </a-col>
              <a-col :span="6">
                <a-image
                  :preview="false"
                  :width="200"
                  src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                />
              </a-col>
            </a-row>
          </a-form>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="대표자정보">
          <a-form ref="formRef" name="custom-validation">
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
              <a-input-number value="01098765432" style="width: 200px" />
            </a-form-item>
            <a-form-item has-feedback label="이메일">
              <a-input value="abc123@mailaddress.com" />
            </a-form-item>
          </a-form>
        </a-collapse-panel>
        <a-collapse-panel key="4" header="회계서비스신청">
          <div>
            <a-checkbox v-model:checked="checked"
              >회계서비스 신청합니다.</a-checkbox
            >
            <div>
              <a-card
                title="⁙ 운영사업"
                :bordered="true"
                style="width: 100%"
                headStyle="padding: 0px"
                bodyStyle="padding: 24px 0px"
              >
                <a-table
                  :columns="columns"
                  :data-source="dataTable"
                  :pagination="false"
                  :bordered="true"
                >
                  <template #headerCell="{ column }">
                    <template v-if="column.key === '사업명'">
                      <span> 사업명 (중복불가) </span>
                    </template>
                  </template>
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.key === '사업명'">
                      <a>
                        {{ record.사업명 }}
                      </a>
                    </template>
                    <template v-else-if="column.key === '사업분류'">
                      <span>
                        <a-select
                          ref="select"
                          v-model:value="record.사업분류"
                          style="width: 200px"
                        >
                          <a-select-option value="방문요양"
                            >방문요양</a-select-option
                          >
                          <a-select-option value="방문간호"
                            >방문간호</a-select-option
                          >
                          <a-select-option value="방문목욕"
                            >방문목욕</a-select-option
                          >
                          <a-select-option value="단기보호"
                            >단기보호</a-select-option
                          >
                          <a-select-option value="복지용구"
                            >복지용구</a-select-option
                          >
                        </a-select>
                      </span>
                    </template>
                    <template v-else-if="column.key === '서비스시작년월'">
                      <span>
                        <CustomDatepicker :valueDate="record.서비스시작년월" />
                      </span>
                    </template>
                    <template v-else-if="column.key === 'action'">
                      <span>
                        <a-popconfirm
                          title="Are you sure delete this row?"
                          ok-text="Yes"
                          cancel-text="No"
                        >
                          <a-button type="text" @click="deleteRow(record.key)">
                            <minus-circle-outlined />
                          </a-button>
                        </a-popconfirm>
                      </span>
                    </template>
                  </template>
                </a-table>
              </a-card>
              <a-row :gutter="[0, 16]">
                <a-col :span="15">
                  <a-form-item label="장기요양기관등록번호">
                    <a-input value="01234567898" style="width: 300px" />
                  </a-form-item>
                  <a-form-item label="장기요양기관등록증">
                    <a-upload
                      v-model:file-list="fileList"
                      name="file"
                      :multiple="false"
                      @change="handleChange"
                    >
                      <a-button>
                        <upload-outlined></upload-outlined>
                        파일선택
                      </a-button>
                    </a-upload>
                  </a-form-item>
                  <div>
                    <p>
                      아래 형식에 맞는 이미지파일을 선택한 후 업로드하십시요.
                    </p>
                    <p>파일형식 : PDF, JPG(JPEG), TIF, GIF, PNG</p>
                    <p>파일용량 : 최대 5MB</p>
                  </div>
                  <div>
                    <a-row>
                      <a-col :span="12">
                        <p>부가서비스</p>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox v-model:checked="checked"
                          >회계입력대행서비스</a-checkbox
                        >
                      </a-col>
                    </a-row>
                  </div>
                </a-col>
                <a-col :span="9">
                  <a-image
                    :preview="false"
                    :width="250"
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                </a-col>
              </a-row>
            </div>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="5" header="원천서비스신청">
          <div>
            <a-checkbox v-model:checked="checked"
              >회계서비스 신청합니다.</a-checkbox
            >
            <div style="margin-top: 20px">
              <a-form-item label="서비스 시작년월">
                <CustomDatepicker width="30%" valueDate="2022/08/25" />
              </a-form-item>
              <a-form-item label="직 원 수">
                <a-input-number value="01234567898" style="width: 100px" />
              </a-form-item>
              <a-row :gutter="[0, 16]">
                <a-col :span="12">
                  <p>부가서비스</p>
                </a-col>
                <a-col :span="12">
                  <a-checkbox v-model:checked="checked"
                    >4대보험신고서비스</a-checkbox
                  >
                </a-col>
              </a-row>
            </div>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="6" header="CMS (자동이체출금) 계좌 정보 입력">
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
            <a-form-item label="자동이체출금일자">
              <a-radio-group v-model:value="value">
                <a-radio :style="radioStyle" :value="1">매월 5일</a-radio>
                <a-radio :style="radioStyle" :value="2">매월 12일</a-radio>
                <a-radio :style="radioStyle" :value="3">매월 19일</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-form>
        </a-collapse-panel>
        <a-collapse-panel key="7" header="기타">
          <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="영업관리담당">
              <a-select ref="select" value="영업자선택" style="width: 200px">
                <a-select-option value="영업자선택">영업자선택</a-select-option>
                <a-select-option value="A 대리점">A 대리점</a-select-option>
                <a-select-option value="방문목욕">방문목욕</a-select-option>
                <a-select-option value="C 영업사원">C 영업사원</a-select-option>
                <a-select-option value="D 영업사원">D 영업사원</a-select-option>
                <a-select-option value="E 본사영업사원"
                  >E 본사영업사원</a-select-option
                >
              </a-select>
            </a-form-item>
            <a-form-item label="전달사항">
              <a-textarea
                v-model="value"
                placeholder="전달사항입력"
                :auto-size="{ minRows: 3, maxRows: 5 }"
              />
            </a-form-item>
          </a-form>
        </a-collapse-panel>
      </a-collapse>
    </a-modal>
  </div>
</template>
<script lang="ts">
import CustomDatepicker from "../../../../../components/CustomDatepicker.vue";
import { ref, defineComponent } from "vue";

import DxDropDownBox from "devextreme-vue/drop-down-box";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxSelection,
} from "devextreme-vue/data-grid";

import { employees } from "../data.js";
// for upload image
import { UploadOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import dayjs from "dayjs";
export default defineComponent({
  created(){
    console.log(this.gridBoxValue);
  },
  props: ["modalStatus", "data"],
  data() {
    return {
      activeKey: [],
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
      formState: {
        name: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      gridDataSource: employees,
      gridBoxValue: [],
      fileList: [],
      gridColumns: ["심사상태", "사업자코드", "상호"],
      isGridBoxOpened: false,
      checked: true,
      columns: [
        {
          name: "사업명 (중복불가)",
          dataIndex: "사업명",
          key: "사업명",
        },
        {
          title: "사업분류",
          dataIndex: "사업분류",
          key: "사업분류",
        },
        {
          title: "서비스시작년월",
          dataIndex: "서비스시작년월",
          key: "서비스시작년월",
        },
        {
          title: "정원수(명)",
          key: "정원수",
          dataIndex: "정원수",
        },
        {
          title: "",
          key: "action",
        },
      ],
      dataTable: [
        {
          key: "1",
          사업명: "가나다라마바 사업",
          사업분류: "방문요양",
          서비스시작년월: "2015/01/01",
          정원수: 10,
        },
        {
          key: "2",
          사업명: "가나다라마바 사업",
          사업분류: "방문간호",
          서비스시작년월: "2015/01/01",
          정원수: 10,
        },
        {
          key: "3",
          사업명: "가나다라마바 사업",
          사업분류: "단기보호",
          서비스시작년월: "2015/01/13",
          정원수: 10,
        },
      ],
      dateFormat: "YYYY-MM-DD",
      value1: dayjs("2015/01/01", "YYYY-MM-DD"),
      labelCol: { style: { width: "150px" } },
      wrapperCol: { span: 14 },
      radioStyle: {
        display: "flex",
        height: "30px",
        lineHeight: "30px",
        checked: false,
      },
      value: ref<number>(1),
    };
  },
  components: {
    DxDropDownBox,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    UploadOutlined,
    MinusCircleOutlined,
    CustomDatepicker,
  },
  methods: {
    setModalVisible() {
      this.$emit("closePopup", false);
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
    onGridSelectionChanged() {
      this.isGridBoxOpened = false;
    },
    gridBoxDisplayExpr() {
      var item = JSON.parse(JSON.stringify(this.gridBoxValue))[0];
      return item && `${item.심사상태}  - ${item.상호} - ${item.사업자코드}`;
    },

    // function

    handleChange(info: { file: { status: string; name: any }; fileList: any }) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    dateValue(date: string | number | Date | dayjs.Dayjs | null | undefined) {
      return dayjs(date, this.dateFormat);
    },
    deleteRow(key: string) {
      for (var i = 0; i < this.dataTable.length; i++) {
        if (this.dataTable[i].key == key) {
          this.dataTable.splice(i, 1);
          break;
        }
      }
    },
  },
});
</script>
<style lang="">
</style>