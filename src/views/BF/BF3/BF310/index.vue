<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="bf-310">
    <a-typography-title :level="2">계약정보관리&심사 </a-typography-title>
    <div class="search-form">
      <div class="col">
        <div class="item">
          <label class="lable-item"> 서비스종류 : </label>
          <a-checkbox v-model:checked="checbox1">회계</a-checkbox>
          <a-checkbox v-model:checked="checbox2">원천</a-checkbox>
        </div>
        <div class="item">
          <label class="lable-item">심사상태/결과 :</label>
          <a-select
            ref="select"
            v-model:value="value1"
            style="width: 120px"
            @focus="focus"
            placeholder="전체"
            @change="handleChange"
          >
            <a-select-option value="신청">신청</a-select-option>
            <a-select-option value="심사중">심사중</a-select-option>
            <a-select-option value="승인">승인</a-select-option>
            <a-select-option value="반려 ">반려</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="col">
        <div class="item">
          <label class="lable-item">심사상태/결과 :</label>
          <a-select
            ref="select"
            v-model:value="value2"
            style="width: 120px"
            @focus="focus"
            placeholder="전체"
            @change="handleChange"
          >
            <a-select-option value="A 대리점">A 대리점</a-select-option>
            <a-select-option value="C 영업사원">C 영업사원</a-select-option>
            <a-select-option value="D 영업사원">D 영업사원</a-select-option>
            <a-select-option value="E 본사영업사원"
              >E 본사영업사원</a-select-option
            >
          </a-select>
        </div>
        <div class="item">
          <label class="lable-item" style="margin-right: 7px">신청기간 :</label>
          <a-range-picker v-model:value="value4" :format="dateFormat" />
        </div>
      </div>
      <a-button class="search" type="primary">검색</a-button>
    </div>
    <DxDataGrid
      :data-source="dataSource"
      :show-borders="true"
      key-expr="ID"
      @exporting="onExporting"
    >
      <DxSelection mode="multiple" />
      <DxPaging :page-size="5" />

      <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
      <DxExport :enabled="true" :allow-export-selected-data="true" />
      <DxColumn data-field="신청일자" />
      <DxColumn data-field="신청코드" />
      <DxColumn
        data-field="심사상태"
        data-type="date"
        cell-template="grid-cell"
      />
      <template #grid-cell="{ data }">
        <a-tag :color="getColorTag(data.value)">{{ data.value }}</a-tag>
      </template>
      <DxColumn :width="170" data-field="사업자코드" />
      <DxColumn data-field="상호" data-type="date" />
      <DxColumn data-field="주소" data-type="date" />
      <DxColumn data-field="대표자" />
      <DxColumn data-field="영업자" />
      <DxColumn data-field="신청서비스" />
      <DxColumn data-field="부가서비스" />
      <DxColumn :width="110" cell-template="pupop" />
      <template #pupop="{data}">
        <a-tag  @click="setModalVisible(data)" >편집</a-tag>
      </template>
    </DxDataGrid>
    <template>
      <div id="components-modal-demo-position">
        <a-modal
          v-model:visible="modalStatus"
          title="계약정보관리&심사 "
          centered
          okText="저장하고 나가기"
          cancelText="그냥 나가기"
          @ok="modalStatus = false"
          width="50%"
        >
          <a-collapse v-model:activeKey="activeKey" accordion>
            <a-collapse-panel key="1" header="심사정보">
              <a-form
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
              >
                <a-form-item label="승인상태">
                  <DxDropDownBox
                  v-model:value="popupSelected"
                  :defer-rendering="false"
                  :show-clear-button="true"
                  :data-source="popupData"
                  display-expr="CompanyName"
                  value-expr="ID"
                  placeholder="Select a value..."
                >
                  <template #content>
                    <DxDataGrid
                      :data-source="gridDataSource"
                      :columns="gridColumns"
                      :hover-state-enabled="true"
                      v-model:selected-row-keys="popupSelected"
                    >
                      <DxSelection mode="multiple" />
                      <DxPaging :enabled="true" :page-size="10" />
                      <DxFilterRow :visible="true" />
                      <DxScrolling mode="virtual" />
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
                  <a-button type="link" >서비스약관</a-button>
                  |
                  <a-button type="link" >개인정보제공활용동의</a-button>
                  |
                  <a-button type="link" >회계서비스약관동의</a-button>
                  |
                  <a-button type="link" >원천서비스약관동의</a-button>
                
                </a-form-item>
              </a-form>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="사업자정보">
              <a-form
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
              >
                <a-form-item label="상 호" >
                  <a-input v-model:value="formState.name" />
                </a-form-item>
                <a-form-item label="사업자등록번호"  >
                  <a-input v-model:value="formState.name"  style="width: 300px"/>
                </a-form-item>
              
                <a-row>
                  <a-col :span="12">
                    <a-form-item label="사업자유형" >
                      <a-radio-group v-model:value="formState.resource">
                        <a-radio value="1">Sponsor</a-radio>
                        <a-radio value="2">Venue</a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="{ $id no }" >
                      <a-input v-model:value="formState.name"  style="width: 300px"/>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-form-item label="주소" >
                  <a-row :gutter="[0,16]">
                    <a-col :span="24">
                      <a-row>
                          <a-col :span="12"><a-input v-model:value="formState.name"  style="width: 300px"/></a-col>
                          <a-col :span="12"><a-button type="primary">우편번호 검색</a-button></a-col>
                      </a-row>
                    </a-col>
                    <a-col :span="24">
                      <a-row>
                          <a-input v-model:value="formState.name"/>
                      </a-row>
                    </a-col>
                    <a-col :span="24">
                      <a-row>
                        <a-input v-model:value="formState.name"/>
                      </a-row>
                    </a-col>
                  </a-row>
                  <a-row>
                </a-row>
                </a-form-item>
                <a-row :gutter="[16,16]">
                  <a-col :span="12">
                    <a-form-item label="연락처" >
                      <a-input v-model:value="formState.desc" />
                    </a-form-item>
                    <a-form-item label="팩 스" >
                      <a-input v-model:value="formState.desc" />
                    </a-form-item>
                    <a-form-item label="사업자등록증" >
                      <a-upload
                        v-model:file-list="fileList"
                        name="file"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :headers="headers"
                        @change="handleChange"
                      >
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
                  <a-col :span="12" >
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
  </div>
</template>
  <script>
import DxDropDownBox from "devextreme-vue/drop-down-box";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSelection,
  DxSearchPanel,
} from "devextreme-vue/data-grid";
import { employees, states } from "./data.js";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";
import { UploadOutlined } from '@ant-design/icons-vue';
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(weekday);
dayjs.extend(localeData);
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxDropDownBox,
    UploadOutlined
  },
  data() {
    return {
      dataSource: employees,
      states,
      value1: "신청",
      value2: "A 대리점",
      dateFormat: "YYYY/MM/DD",
      checbox1: true,
      checbox2: true,
      value4: [dayjs(), dayjs().add(1, "year")],
      activeKey: [],
      gridColumns: ["심사상태", "사업자코드", "상호"],
      gridBoxValue: [],
      gridDataSource: employees,
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
      formState: {
        name: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      modalStatus: false,
      employee:[],
      popupSelected:[],
      popupData:employees,
      
    };
  },

  methods: {
    onExporting(e) {
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
    customClass(cellInfo) {
      return cellInfo.value;
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
    setModalVisible(data) {
      //console.log(data);
      this.employee = data;
      this.modalStatus = true;
    },

  },
};
</script>
  <style>
#data-grid-demo {
  min-height: 700px;
}

.dx-select-checkbox {
  display: inline-block !important;
}

.search-form .col {
  display: flex;
  align-items: center;
}

.search-form .col {
  margin-top: 20px;
}

.search-form .col .lable-item {
  width: 110px;
  display: inline-block;
}

.search-form .col .item:nth-child(2) {
  margin-left: 30px;
}

.search {
  margin-top: 20px;
}
</style>