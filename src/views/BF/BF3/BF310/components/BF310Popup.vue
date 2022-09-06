<template>
  {{gridBoxValue}}
  <div id="components-modal-demo-position">
    <a-modal :visible="modalStatus" title="계약정보관리&심사 " centered okText="저장하고 나가기" cancelText="그냥 나가기"
      @cancel="setModalVisible()" width="50%">
      <a-collapse v-model:activeKey="activeKey" accordion>
        <a-collapse-panel key="1" header="심사정보">
          <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="승인상태">
              <DxDropDownBox v-model:value="gridBoxValue" v-model:opened="isGridBoxOpened"  :defer-rendering="false"
                :display-expr="gridBoxDisplayExpr" :show-clear-button="true" :data-source="gridDataSource"
                value-expr="ID" placeholder="Select a value...">
                <template #content>
                  <DxDataGrid
                    height="100%"
                    :data-source="gridDataSource"
                    v-model:selected-row-keys="gridBoxValue"
                    @selection-changed="onGridSelectionChanged($event)"
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
                      <a-tag :color="getColorTag(data.value)">{{ data.value }}</a-tag>
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
                    <a-radio value="1">Sponsor</a-radio>
                    <a-radio value="2">Venue</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="{ $id no }">
                  <a-input v-model:value="formState.name" style="width: 300px" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item label="주소">
              <a-row :gutter="[0,16]">
                <a-col :span="24">
                  <a-row>
                    <a-col :span="12">
                      <a-input v-model:value="formState.name" style="width: 300px" />
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
              <a-row>
              </a-row>
            </a-form-item>
            <a-row :gutter="[16,16]">
              <a-col :span="12">
                <a-form-item label="연락처">
                  <a-input v-model:value="formState.desc" />
                </a-form-item>
                <a-form-item label="팩 스">
                  <a-input v-model:value="formState.desc" />
                </a-form-item>
                <a-form-item label="사업자등록증">
                  <a-upload v-model:file-list="fileList" name="file"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :headers="headers" @change="handleChange">
                    <a-button>
                      <upload-outlined></upload-outlined>
                      파일선택
                    </a-button>
                  </a-upload>
                </a-form-item>

                <div :style="{fontSize:'12px'}">
                  <div>

                  </div>
                  <div>
                    <p>아래 형식에 맞는 이미지파일을 선택한 후 업로드하십시요.</p>
                    <p>파일형식 : PDF, JPG(JPEG), TIF, GIF, PNG</p>
                    <p>파일용량 : 최대 5MB</p>
                  </div>

                </div>


              </a-col>
              <a-col :span="12">
                <a-image :preview="false" :width="200"
                  src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
              </a-col>
            </a-row>

          </a-form>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="대표자정보">
          <p>{{ text }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="4" header="회계서비스신청">
          <p>{{ text }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="5" header="원천서비스신청">
          <p>{{ text }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="6" header="CMS (자동이체출금) 계좌 정보 입력">
          <p>{{ text }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="7" header="기타">
          <p>{{ text }}</p>
        </a-collapse-panel>
      </a-collapse>
    </a-modal>
  </div>
</template>
<script>
import DxDropDownBox from "devextreme-vue/drop-down-box";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  
  DxSelection,
 
} from "devextreme-vue/data-grid";

import { employees } from "../data";

export default {
  props: [
    'modalStatus',
    'data'
  ],
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
      gridColumns: ["심사상태", "사업자코드", "상호"],
      isGridBoxOpened: false,
    }
  },
  components: {
    DxDropDownBox,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
  

  },
  methods: {
    setModalVisible() {

      this.$emit('closePopup', false);
    },
    getColorTag(data) {
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
      var item  =  JSON.parse(JSON.stringify(this.gridBoxValue))[0];
      return item && `${item.심사상태}  - ${item.상호} - ${item.사업자코드}`;
    },


  }
};
</script>
<style lang="">
</style>