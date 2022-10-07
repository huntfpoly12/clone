<<<<<<< HEAD
<template>
    <div id="components-modal-demo-position">
      <a-modal
        :visible="modalStatus"
        :mask-closable="false"
        title="서비스관리 "
        centered
        okText="저장하고 나가기"
        cancelText="그냥 나가기"
        @cancel="setModalVisible()"
        width="920px"
      >
        <a-collapse v-model:activeKey="activeKey" accordion>
          <a-collapse-panel key="1" header="이용서비스" class="popup-scroll">
            <a-form :label-col="labelCol" style="height: 500px">
              <a-row>
                <a-col :span="10">
                  <a-form-item label="총일용료" style="font-weight: bold">
                    <p class="input-disble">
                      {{ $filters.formatCurrency(totalPriceByDay) }}
                    </p>
                  </a-form-item>
                </a-col>
                <a-col :span="8"></a-col>
                <a-col :span="10">
                  <a-form-item
                    label="회계서비스 이용료"
                    style="padding-left: 50px"
                  >
                    <p class="input-disble">
                      {{ $filters.formatCurrency(formState.accountingPrice) }}
                    </p>
                  </a-form-item>
                </a-col>
                <a-col :span="14"></a-col>
                <a-col :span="10">
                  <a-form-item
                    label="원천서비스 이용료"
                    style="padding-left: 50px"
                  >
                    <p class="input-disble">
                      {{ $filters.formatCurrency(formState.withholdingPrice) }}
                    </p>
                  </a-form-item>
                </a-col>
                <a-col :span="14"></a-col>
              </a-row>
              <hr />
              <a-row>
                <a-col :span="12">
                  <a-form-item label="회계서비스" style="font-weight: bold">
                    <a-checkbox v-model:checked="formState.usedAccountingCount"
                      >회계서비스 신청</a-checkbox
                    >
                  </a-form-item>
                </a-col>
              </a-row>
              <div>
                <a-card
                  title="⁙ 운영사업"
                  :bordered="false"
                  style="width: 100%"
                  :headStyle="{ padding: '5px', color: 'red' }"
                  bodyStyle="padding: 0px 0px"
                >
                </a-card>
                <div id="data-grid-demo">
                  <DxDataGrid
                    id="gridContainer"
                    :data-source="formState.accountingfacilityBusinesses"
                    :show-borders="true"
                    :selected-row-keys="selectedItemKeys"
                  >
                    <DxEditing
                      :use-icons="true"
                      :allow-updating="true"
                      :allow-adding="true"
                      :allow-deleting="true"
                      template="button-template"
                      mode="cell"
                    >
                      <DxTexts confirmDeleteMessage="삭제하겠습니까?" />
                    </DxEditing>
                    <template #button-template>
                      <DxButton icon="plus" />
                    </template>
                    <DxPaging :enabled="false" />
                    <DxColumn
                      data-field="No"
                      :allow-editing="false"
                      :width="50"
                      caption="#"
                      cell-template="indexCell"
                    />
                    <template #indexCell="{ data }">
                      <div>{{ data.rowIndex + 1 }}</div>
                    </template>
  
                    <DxColumn data-field="name" caption="사업명 (중복불가)" />
  
                    <DxColumn
                      :width="225"
                      data-field="facilityBizType"
                      caption="사업분류"
                    >
                      <DxLookup
                        :data-source="facilityBizType"
                        value-expr="v"
                        display-expr="n"
                      />
                    </DxColumn>
                    <DxColumn
                      data-field="startYearMonth"
                      caption="서비스시작년월"
                      data-type="date"
                      :format="'yyyy-MM-dd'"
                    />
                    <DxColumn
                      :width="100"
                      data-field="capacity"
                      caption="정원수 (명)"
                    />
                    <DxToolbar>
                      <DxItem name="addRowButton" />
                    </DxToolbar>
                  </DxDataGrid>
                </div>
              </div>
  
              <a-row>
                <a-col :span="14">
                  <a-form-item
                    label="회계서비스 이용료:"
                    style="margin-top: 10px; font-weight: bold"
                  >
                    <p class="input-disble">
                      {{ $filters.formatCurrency(totalPriceAccountingService) }}
                    </p>
                  </a-form-item>
                </a-col>
                <a-coll :span="10"></a-coll>
                <a-col :span="14">
                  <div style="display: flex; padding-left: 155px">
                    <a-checkbox
                      v-model:checked="formState.checkBoxAccBasicFee"
                      @change="handleInputACCService()"
                      style="width: 180px"
                      >기본이용료</a-checkbox
                    >
                    <DxNumberBox
                      v-model="formState.usedServiceInfoAccountingPrice"
                      :format="'#,##0'"
                      :disabled="formState.disableNumber1"
                    />
                  </div>
                </a-col>
                <a-col :sapn="10"></a-col>
                <a-col :span="14">
                  <div
                    style="display: flex; padding-left: 155px; margin-top: 5px"
                  >
                    <a-checkbox
                      v-model:checked="formState.checkBoxAccInput"
                      @change="handleInputACCService()"
                      style="width: 180px"
                      >입력대행</a-checkbox
                    >
                    <DxNumberBox
                      v-model="formState.inputAgent"
                      :format="'#,##0'"
                      :disabled="formState.disableNumber2"
                    />
                  </div>
                </a-col>
                <a-col :span="14">
                  <div
                    style="display: flex; padding-left: 155px; margin-top: 5px"
                  >
                    <a-checkbox
                      v-model:checked="formState.checkBoxAccConso"
                      @change="handleInputACCService()"
                      style="width: 180px"
                      >계좌통합</a-checkbox
                    >
                    <DxNumberBox
                      v-model="formState.accountIntegration"
                      :format="'#,##0'"
                      :disabled="formState.disableNumber3"
                    />
                  </div>
                </a-col>
                <a-col :span="14">
                  <div
                    style="
                      display: flex;
                      padding-left: 155px;
                      margin-top: 5px;
                      margin-bottom: 10px;
                    "
                  >
                    <a-checkbox
                      v-model:checked="formState.checkBoxAcc4wc"
                      @change="handleInputACCService()"
                      style="width: 180px"
                      >W4C</a-checkbox
                    >
                    <DxNumberBox
                      v-model="formState.sSIS"
                      :format="'#,##0'"
                      :disabled="formState.disableNumber4"
                    />
                  </div>
                </a-col>
              </a-row>
              <!-- <imgUpload :title="titleModal" :imageUrl="imageUrl" /> -->
              <div style="display: flex">
                <div>
                  <imgUpload
                    :title="titleModal"
                    @update-img="getImgUrl"
                    style="margin-top: 10px"
                  />
                </div>
  
                <a-col :span="7">
                  <div v-if="imageValue" class="img-preview">
                    <img :src="imageValue" />
                  </div>
                  <div v-else class="img-preview">
                    <img src="../../../../../assets/images/imgdefault.jpg" />
                  </div>
                  <div v-if="fileName">
                    <span style="padding-right: 10px">{{ fileName }}</span>
                    <delete-outlined
                      @click="removeImg"
                      style="color: red; cursor: pointer"
                    />
                  </div>
                </a-col>
              </div>
              <hr />
              <a-row>
                <a-col>
                  <a-form-item label="원천서비스" style="font-weight: bold">
                    <a-checkbox>원천서비스</a-checkbox>
                  </a-form-item>
                </a-col>
              </a-row>
              <div>
                <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                  <a-form-item label="서비스 시작년월" style="width: 300px">
                    <CustomDatepicker valueDate="2022/08/25" />
                  </a-form-item>
                  <a-form-item label="직 원 수 ">
                    <a-input-number
                      type="number"
                      min="0"
                      v-model:value="직원수"
                      style="width: 150px"
                    />
                  </a-form-item>
                  <a-form-item
                    label="원천서비스 이용료:"
                    style="font-weight: bold; width: 605px"
                  >
                    <p class="input-disble">
                      {{ $filters.formatCurrency(total2) }}
                    </p>
                  </a-form-item>
                </a-form>
              </div>
              <a-row>
                <a-col span="4"></a-col>
              </a-row>
              <a-row>
                <a-coll :span="10"></a-coll>
                <a-col :span="14">
                  <div style="display: flex; padding-left: 155px">
                    <!-- <span style="width:180px"> -->
                    <!-- <input type="checkbox" v-model="formState.checkBoxBasicFee"
                                              @change=handleInputTexService() />
                                          기본이용료</span> -->
                    <a-checkbox
                      v-model:checked="formState.checkBoxBasicFee"
                      @change="handleInputTexService()"
                      style="width: 180px"
                      >기본이용료</a-checkbox
                    >
                    <DxNumberBox
                      v-model="formState.numberBox5"
                      :format="'#,##0'"
                      :disabled="formState.disableNumber5"
                    />
                  </div>
                </a-col>
                <a-coll :span="8"></a-coll>
                <a-col :span="14">
                  <div
                    style="
                      display: flex;
                      padding-left: 155px;
                      margin-top: 5px;
                      margin-bottom: 10px;
                    "
                  >
                    <!-- <span style="width:180px">
                                          <input type="checkbox" v-model="formState.checkBoxMajorInsurance"
                                              @change=handleInputTexService()>
                                          4대보험</span> -->
                    <a-checkbox
                      v-model:checked="formState.checkBoxMajorInsurance"
                      @change="handleInputTexService()"
                      style="width: 180px"
                      >4대보험</a-checkbox
                    >
                    <DxNumberBox
                      v-model="formState.numberBox6"
                      :format="'#,##0'"
                      :disabled="formState.disableNumber6"
                    />
                  </div>
                </a-col>
              </a-row>
            </a-form>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="담당매니저/ 영업자">
            <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-item label="담당매니저">
                <a-select
                  ref="select"
                  v-model:value="담당자선택"
                  style="width: 200px"
                >
                  <a-select-option value="김매니저 kim5604"
                    >김매니저 kim5604</a-select-option
                  >
                  <a-select-option value="유하람 haram.interpreter"
                    >유하람 haram.interpreter</a-select-option
                  >
                </a-select>
              </a-form-item>
              <a-form-item label="영업자">
                <a-select
                  ref="select"
                  v-model:value="영업자선택"
                  style="width: 200px"
                >
                  <a-select-option value="장영업">장영업</a-select-option>
                  <a-select-option value="박혁서세">박혁서세</a-select-option>
                  <a-select-option value="강감찬">강감찬</a-select-option>
                  <a-select-option value="달나라 대리점"
                    >달나라 대리점</a-select-option
                  >
                  <a-select-option value="타운소프트비나"
                    >타운소프트비나</a-select-option
                  >
                  <a-select-option value="다우데이터스스템"
                    >다우데이터스스템</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-form>
          </a-collapse-panel>
          <a-collapse-panel
            key="3"
            header="메모"
            :extra="dataSource.length > 0 ? dataSource.length : ''"
            :style="{ position: 'relative' }"
          >
            <a-table
              bordered
              :data-source="dataSource"
              :pagination="false"
              :showHeader="false"
            >
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
                      @click="handleCopy()"
                    />
                    <div v-if="dataSource.length > 1">
                      <DeleteOutlined
                        :style="{ fontSize: '20px' }"
                        @click="handleDelete(text.key)"
                      />
                    </div>
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
        :mask-closable="false"
        width="1000px"
      >
        <div>
          <DxDataGrid
            :data-source="dataSource"
            :show-borders="true"
            key-expr="key"
          >
            <DxColumn data-field="기록일시" width="150px" />
            <DxColumn data-field="비고" />
            <DxColumn data-field="생성일시" />
            <DxColumn data-field="생성자ID" />
            <DxColumn data-field="수정일시" />
            <DxColumn data-field="수성자ID" />
            <DxColumn data-field="삭제여부" />
            <DxColumn data-field="IP주소" />
            <DxColumn data-field="상세" cell-template="detail" />
            <template>
              <a-space :size="8">
                <zoom-in-outlined :style="{ fontSize: '15px' }" />
              </a-space>
            </template>
          </DxDataGrid>
          <DxEditing
            :allow-updating="true"
            :allow-adding="true"
            :allow-deleting="true"
            mode="cell"
          />
          <DxPaging :enabled="false" />
          <DxSelection mode="multiple" />
        </div>
      </a-modal>
    </div>
  </template>
  
  <script lang="ts">
  import { AccountingAdditionalServiceType } from "@bankda/jangbuda-common";
  import { FacilityBizType } from "@bankda/jangbuda-common";
  import CustomDatepicker from "../../../../../components/CustomDatepicker.vue";
  import { ref, defineComponent, watch, reactive } from "vue";
  import DxDropDownBox from "devextreme-vue/drop-down-box";
  import imgUpload from "../../../../../components/UploadImage.vue";
  import DxNumberBox from "devextreme-vue/number-box";
  import {
=======
<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <a-spin :spinning="spinning" size="large">
        <div class="top-content">
            <a-typography-title :level="3"> 계약정보관리&심사
            </a-typography-title>
            <div class="list-action">
                <a-tooltip>
                    <template #title>조회</template>
                    <a-button @click="searching">
                        <SearchOutlined />
                    </a-button>
                </a-tooltip>
                <a-tooltip>
                    <template #title>저장</template>
                    <a-button>
                        <SaveOutlined />
                    </a-button>
                </a-tooltip>
                <a-tooltip>
                    <template #title>삭제</template>
                    <a-button>
                        <DeleteOutlined />
                    </a-button>
                </a-tooltip>
                <a-tooltip>
                    <template #title>출력</template>
                    <a-button>
                        <PrinterOutlined />
                    </a-button>
                </a-tooltip>
            </div>
        </div>

        <div id="bf-310">
            <div class="search-form">
                <a-row :gutter="[8,8]">
                    <a-col>
                        <label class="lable-item">서비스종류 :</label>
                        <a-checkbox v-model:checked="originData.accounting">회계</a-checkbox>
                        <a-checkbox v-model:checked="originData.withholding">원천</a-checkbox>
                    </a-col>
                    <a-col>
                        <label class="lable-item">심사상태/결과 :</label>
                        <a-select mode="tags" ref="select" style="width: auto; min-width: 135px;"
                            v-model:value="statuses" placeholder="전체">
                            <a-select-option @click="chooseAll" value="전체">전체</a-select-option>
                            <a-select-option :value="10">신청</a-select-option>
                            <a-select-option :value="20">심사중</a-select-option>
                            <a-select-option :value="30">승인</a-select-option>
                            <a-select-option :value="99 ">반려</a-select-option>
                        </a-select>
                    </a-col>
                    <a-col>
                        <ListSalesDropdownVue :textLabel="'영업자'" />
                    </a-col>
                    <a-col>
                        <label class="lable-item">신청기간 :</label>
                        <a-range-picker v-model:value="dateSearch" width="50%" :placeholder="['Start', 'End']" />
                    </a-col>
                </a-row>
            </div>

            <div class="page-content">
                <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="id" @exporting="onExporting"
                    :column-auto-width="true">
                    <DxSelection mode="multiple" />
                    <DxPaging :page-size="rowTable" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                    <DxExport :enabled="true" :allow-export-selected-data="true" />
                    <DxColumn data-field="createdAt" caption="신청일자" cell-template="createdat-cell" data-type="date" />
                    <template #createdat-cell="{ data }">
                        {{ formarDate(data.value) }}
                    </template>
                    <DxColumn data-field="code" caption="신청코드" />
                    <DxColumn data-field="status" caption="심사상태" cell-template="grid-cell" css-class="cell-center" />
                    <template #grid-cell="{ data }">
                        <a-tag :color="getColorTag(data.value)?.name">{{ getColorTag(data.value)?.tag_name }}</a-tag>
                    </template>
                    <DxColumn :width="170" data-field="compactSalesRepresentative.code" caption="사업자코드"
                        css-class="cell-center" />
                    <DxColumn data-field="companyName" caption="상호" />
                    <DxColumn data-field="companyAddress" caption="주소" />
                    <DxColumn data-field="presidentName" caption="대표자" />
                    <DxColumn data-field="compactSalesRepresentative.name" caption="영업자" />
                    <DxColumn caption="신청서비스" cell-template="acc-service" />
                    <template #acc-service="{ data }">
                        <span>회계
                            <a-popover>
                                <template #content>
                                    <a-table :columns="[ {
                                      title: 'Name',
                                      dataIndex: 'name',
                                    },
                                    {
                                      title: 'Year Month',
                                      dataIndex: 'startYearMonth',
                                    }]" :data-source="data.data.simpleAccountingInfos" bordered :pagination="false">
                                    </a-table>
                                </template>
                                <a-tag v-if="data.data.simpleAccountingInfos">{{data.data.simpleAccountingInfos.length}}
                                </a-tag>
                            </a-popover>
                        </span>
                        <span>원천
                            <a-popover>
                                <template #content>
                                    <a-table :columns="[ {
                                      title: 'Name',
                                      dataIndex: 'name',
                                    },
                                    {
                                      title: 'Year Month',
                                      dataIndex: 'startYearMonth',
                                    }]" :data-source="[data.data.simpleWithholdingInfo]" bordered :pagination="false">
                                    </a-table>
                                </template>
                                <a-tag>1</a-tag>
                            </a-popover>
                        </span>
                    </template>
                    <DxColumn :width="50" cell-template="pupop" type="buttons" />
                    <template #pupop="{ data }" class="custom-action">
                        <div class="custom-action">
                            <a-tooltip placement="top">
                                <template #title>편집 {{data.data.id}}</template>
                                <EditOutlined @click="setModalVisible(data)" />
                            </a-tooltip>
                        </div>
                    </template>
                </DxDataGrid>

                <div class="pagination-table" v-if="rowTable > 20">
                    <a-pagination v-model:current="originDataCall.page" v-model:page-size="pageSize" :total="rowTable"
                        show-less-items @change="changePage" />
                </div>

                <BF310Popup :modalStatus="modalStatus" @closePopup="modalStatus = false " :data="idSubRequest" />
            </div>

        </div>
    </a-spin>

</template>
<script lang="ts">
import {
    SearchOutlined,
    EditOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SaveOutlined,
} from '@ant-design/icons-vue';
import DxDateBox from 'devextreme-vue/date-box';
import locale from 'ant-design-vue/es/date-picker/locale/ko_KR';
import { ref, defineComponent } from 'vue';
import BF310Popup from "./components/BF330Popup.vue";
import ListSalesDropdownVue from '../../../../components/ListSalesDropdown.vue';
import queries from "../../../../graphql/queries/BF/BF3/BF310/index"
import { useQuery } from "@vue/apollo-composable";
import DxButton from "devextreme-vue/button";
import {
>>>>>>> develop
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
<<<<<<< HEAD
    DxLookup,
    DxToolbar,
    DxItem,
    DxTexts,
  } from "devextreme-vue/data-grid";
  import { DxButton } from "devextreme-vue/button";
  import DataSource from "devextreme/data/data_source";
  import ArrayStore from "devextreme/data/array_store";
  import { employees, states } from "./data.js";
  import {
    UploadOutlined,
    MinusCircleOutlined,
    ZoomInOutlined,
    SaveOutlined,
    DeleteOutlined,
    PlusSquareOutlined,
    WarningFilled,
    PlusOutlined,
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import inputFormat from "../../../../../components/inputBoxFormat.vue";
  import type { UploadProps } from "ant-design-vue";
  import queries from "../../../../../graphql/queries/BF/BF3/BF330/index";
  // import mutations from "../../../../../graphql/mutations/BF/BF3/BF330/index";
  import { useQuery, useMutation } from "@vue/apollo-composable";
  function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  }
  
  export default defineComponent({
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
      PlusOutlined,
      CustomDatepicker,
      DxEditing,
      DxLookup,
      DxButton,
      DxToolbar,
      DxItem,
      inputFormat,
      DxNumberBox,
      DxTexts,
    },
    props: {
      modalStatus: Boolean,
      modalStatusHistory: Boolean,
      idRowEdit: {
        type: Number,
        default: null,
      },
=======
    DxSearchPanel,
    DxPager,
} from "devextreme-vue/data-grid";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";
import dayjs, { Dayjs } from 'dayjs';
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday);
dayjs.extend(localeData);
export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxButton,
        DxPaging,
        DxSelection,
        DxExport,
        DxSearchPanel,
        BF310Popup,
        locale,
        DxDateBox,
        SearchOutlined,
        EditOutlined,
        DxPager,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        MailOutlined,
        PrinterOutlined,
        DeleteOutlined,
        SaveOutlined,
        ListSalesDropdownVue
>>>>>>> develop
    },
  
    data() {
<<<<<<< HEAD
      return {
        amountFormat: { currency: "VND", useGrouping: true },
        담당자선택: "담당자선택",
        영업자선택: "영업자선택",
        직원수: "직원수",
        selectionChanged: (data: any) => {
          this.selectedItemKeys = data.selectedRowKeys;
        },
        dataModal: employees,
        dataTable: new DataSource({
          store: new ArrayStore({
            data: employees,
            key: "ID",
          }),
        }),
        selectedItemKeys: [],
        states,
      };
    },
    computed: {
      totalPriceByDay(){
        return this.formState.accountingPrice + this.formState.withholdingPrice;
      },
      totalPriceAccountingService() {
        return (
          this.formState.usedServiceInfoAccountingPrice +
          this.formState.inputAgent +
          this.formState.accountIntegration +
          this.formState.sSIS
        );
      },
      total2() {
        return this.formState.numberBox5 + this.formState.numberBox6;
      },
      total() {
        return (
          this.formState.usedServiceInfoAccountingPrice +
          this.formState.inputAgent +
          this.formState.accountIntegration +
          this.formState.sSIS +
          this.formState.numberBox5 +
          this.formState.numberBox6
        );
      },
    },
    methods: {
      getImgUrl(img: any) {
        this.imageValue = img.url;
        this.fileName = img.fileName;
        console.log(img);
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
      addNew() {
        let add = {
          ID: 5,
          No: "5",
          사업명: "가나다라마바 사업",
          StateID: 4,
          서비스시작년월: "2015/01/13",
          정원수: 10,
        };
        this.dataModal.push(add);
        console.log(this.dataModal);
      },
      handleAdd() {
        this.keyNumber++;
        let dataDef = {
          key: this.keyNumber,
          note: "",
        };
        this.dataSource.unshift(dataDef);
      },
      handleDelete(key: number) {
        if (this.dataSource.length > 1) {
          this.dataSource = this.dataSource.filter(function (obj: {
            key: number;
          }) {
            return obj.key != key;
          });
        }
      },
      handleCopy() {
        this.keyNumber++;
        let dataDef = {
          key: this.keyNumber.toString(),
          No: this.keyNumber.toString(),
          사업명: "가나다라마바 사업",
          사업분류: "방문요양",
          서비스시작년월: "2015/01/01",
          정원수: 10,
        };
      },
  
      handleInputACCService() {
        let accBasicFee =
          this.formState.accBasicFee == ""
            ? 0
            : parseInt(this.formState.accBasicFee);
        let accConsolidation =
          this.formState.accConsolidation == ""
            ? 0
            : parseInt(this.formState.accConsolidation);
        let accInput =
          this.formState.accInput == "" ? 0 : parseInt(this.formState.accInput);
        let acc4wc =
          this.formState.acc4wc == "" ? 0 : parseInt(this.formState.acc4wc);
  
        this.formState.accFeeService =
          accBasicFee + accConsolidation + accInput + acc4wc;
      },
      handleInputTexService() {
        let basicFee =
          this.formState.basicFee == "" ? 0 : parseInt(this.formState.basicFee);
        let majorInsurance =
          this.formState.majorInsurance == ""
            ? 0
            : parseInt(this.formState.majorInsurance);
        this.formState.taxFeeSevice = basicFee + majorInsurance;
      },
     
    },
    watch: {
      "formState.checkBoxAccBasicFee"(newVal) {
        if (newVal === false) {
          this.formState.usedServiceInfoAccountingPrice = 0;
          this.formState.disableNumber1 = true;
        } else {
          this.formState.disableNumber1 = false;
        }
      },
      "formState.checkBoxAccInput"(newVal) {
        if (newVal === false) {
          this.formState.inputAgent = 0;
          this.formState.disableNumber2 = true;
        } else {
          this.formState.disableNumber2 = false;
        }
      },
      "formState.checkBoxAccConso"(newVal) {
        if (newVal === false) {
          this.formState.accountIntegration = 0;
          this.formState.disableNumber3 = true;
        } else {
          this.formState.disableNumber3 = false;
        }
      },
      "formState.checkBoxAcc4wc"(newVal) {
        if (newVal === false) {
          this.formState.sSIS = 0;
          this.formState.disableNumber4 = true;
        } else {
          this.formState.disableNumber4 = false;
        }
      },
      "formState.checkBoxBasicFee"(newVal) {
        if (newVal === false) {
          this.formState.numberBox5 = 0;
          this.formState.disableNumber5 = true;
        } else {
          this.formState.disableNumber5 = false;
        }
      },
      "formState.checkBoxMajorInsurance"(newVal) {
        if (newVal === false) {
          this.formState.numberBox6 = 0;
          this.formState.disableNumber6 = true;
        } else {
          this.formState.disableNumber6 = false;
        }
      },
    },
    setup(props) {
      const facilityBizType = FacilityBizType.all();
  
      const imageValue = ref("");
      const fileName = ref("");
      const dataQuery = ref();
      const loading = ref<boolean>(false);
      const imageUrl = ref<string>("");
      let trigger = ref<boolean>(false);
      const previewTitle = ref("");
      const fileList = ref<UploadProps["fileList"]>([]);
      const removeImg = () => {
        imageValue.value = "";
        fileName.value = "";
      };
  
      watch(
        () => props.modalStatus,
        (newValue) => {
          if (newValue) {
            dataQuery.value = { id: props.idRowEdit };
            trigger.value = true;
          } else {
            trigger.value = false;
          }
        }
      );
  
      const handleChange = (info: any) => {
        if (info.file.status === "uploading") {
          loading.value = true;
          return;
        }
        if (info.file.status === "done") {
          getBase64(info.file.originFileObj, (base64Url: string) => {
            imageUrl.value = base64Url;
            loading.value = false;
          });
        }
        if (info.file.status === "error") {
          loading.value = false;
          message.error("upload error");
        }
      };
      const beforeUpload = (file: any) => {
        const isJpgOrPng =
          file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
          message.error("You can only upload JPG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
      };
  
      const activeKey = ref([1]);
      const formState = reactive({
        totalFee: 0,
        accountingPrice: 0,
        withholdingPrice: 0,
        accountingfacilityBusinesses: [],
        usedAccountingCount: false,
        usedServiceInfoAccountingPrice: 0,
        inputAgent:0,
        accountIntegration:0,
        sSIS:0,
        name: "",
        name2: "",
        name3: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        totalService: 0,
        accFeeService: 0,
        accBasicFee: "",
        accInput: "",
        accConsolidation: "",
        acc4wc: "",
        basicFee: "",
        majorInsurance: "",
        taxFeeSevice: 0,
        checkBox: true,
        checkBoxAccBasicFee: true,
        checkBoxAccInput: true,
        checkBoxAccConso: true,
        checkBoxAcc4wc: true,
        checkBoxMajorInsurance: true,
        checkBoxBasicFee: true,
        disableNumber1: false,
        disableNumber2: false,
        disableNumber3: false,
        disableNumber4: false,
        disableNumber5: false,
        disableNumber6: false,
        numberBox5: 0,
        numberBox6: 0,
      });
  
      // get service contract
      const { result, error, refetch, onResult } = useQuery(
        queries.getServiceContract,
        dataQuery,
        () => ({
          enabled: trigger.value,
          fetchPolicy: "no-cache",
        })
      );
      onResult((res) => {
        console.log(res);
      });
  
      watch(result, (value) => {
        if (value && value.getServiceContract) {
          formState.totalFee =
            value.getServiceContract.usedServiceInfo.totalPrice;
          formState.accountingPrice =
            value.getServiceContract.usedServiceInfo.accountingPrice;
          formState.withholdingPrice =
            value.getServiceContract.usedServiceInfo.withholdingPrice;
          formState.accountingfacilityBusinesses =
            value.getServiceContract.usedServiceInfo.accounting;
          formState.usedAccountingCount =
            value.getServiceContract.usedAccountingCount > 0 ? true : false;
  
          if(value.getServiceContract.usedServiceInfo.accounting.options.length > 0){
            value.getServiceContract.usedServiceInfo.accounting.options.map((el: any)=>{
              
            })
          }
          
          
        }
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
      const keyNumber = ref(5);
      const titleModal = "사업자등록증";
      const columns = [
        {
          title: "No",
          dataIndex: "No",
          key: "No",
        },
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
          dataIndex: "정원수",
          key: "정원수",
        },
        {
          title: "",
          key: "action",
        },
      ];
      return {
        fileList,
        loading,
        imageUrl,
        handleChange,
        beforeUpload,
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
        columns,
        PlusSquareOutlined,
        PlusOutlined,
        fileName,
        removeImg,
        imageValue,
        dataQuery,
        result,
        trigger,
        facilityBizType,
      };
    },
  });
  </script>
  <style lang="scss" scoped>
  .warring-modal {
    font-size: 13px;
    line-height: 5px;
  }
  
  ::v-deep .dx-select-checkbox {
    display: inline-block !important;
  }
  
  ::v-deep .ant-form-item-label {
    text-align: left;
  }
  
  .ant-form-item {
    margin-bottom: 3px;
  }
  
  .ant-table-tbody > tr > td {
    padding: 2px 8px;
  }
  
  .popup-scroll {
    overflow-y: auto;
  }
  
  .table-scroll {
    height: 190px;
    border: 1px solid #333;
    overflow-y: auto;
    padding: 5px;
  }
  
  .ant-collapse-content > .ant-collapse-content-box {
    padding: 10px 0px 10px 16px;
  }
  
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    background-color: #fafafa;
  }
  
  .ant-collapse-item.ant-collapse-item-active.popup-scroll {
    background-color: white;
  }
  
  .input-form {
    margin-top: 5px;
  }
  
  .ant-card-extra,
  .ant-card-head-title {
    padding: 0 !important;
  }
  
  ::v-deep .ant-badge-not-a-wrapper {
    position: absolute;
    left: 77px;
    top: 12px;
    z-index: 5;
  }
  
  .data-grid-demo {
    min-height: 700px;
  }
  
  .gridDeleteSelected {
    position: absolute;
    z-index: 1;
    right: 0;
    margin: 1px;
    top: 0;
  }
  
  .gridDeleteSelected .dx-button-text {
    line-height: 0;
  }
  
  .input-disble {
    background: rgb(240, 239, 239);
    padding: 5px 10px;
    border: 1px solid rgb(206, 198, 198);
    border-radius: 5px;
    margin: 1px;
    text-align: right;
  }
  
  .title-note {
    display: flex;
    justify-content: space-between;
  }
  
  ::v-deep .ant-collapse-header .ant-collapse-extra {
    margin-left: 8px !important;
    border-radius: 200px;
    background-color: hwb(120 84% 15%);
    background-size: 100px;
    padding: 4px 7px;
    line-height: 8px;
    border: 1px solid rgb(22, 6, 6);
  }
  
  .ant-card {
    height: 45px;
  }
  
  ::v-deep .dx-toolbar .dx-toolbar-after {
    margin-top: -35px !important;
  }
  
  ::v-deep .dx-datagrid-headers.dx-datagrid-nowrap {
    margin-top: -35px;
  }
  
  ::v-deep .dx-texteditor-input {
    text-align: right;
  }
  </style>
=======
        return {
            dateSearch: [dayjs().subtract(1, 'year'), dayjs()],
            status: ref([]),
            startDate: '',
            finishDate: '',
            displayMode: 'full',
            showPageSizeSelector: true,
            showNavButtons: true,

        };
    },
    setup() {
        const dataSource = ref([]);
        const modalStatus = ref(false);
        const idSubRequest = ref();
        const spinning = ref<boolean>(true);
        const arraySale = ref([])
        const statuses: any = ref([])
        const requestDataSale = ref({
            page: 1,
            rows: 1000,
            statuses: [1, 2, 3],
            grade: 1,
            name: "",
            code: ""
        })
        const rowTable = ref(10)
        const originData = ref({
            page: 1,
            rows: 20,
            salesRepresentativeId: null,
            startDate: '',
            finishDate: '',
            accounting: true,
            withholding: true,
            statuses: [10, 20, 30, 99]
        })
        const originDataCall = ref({
            page: 1,
            rows: 20,
            salesRepresentativeId: null,
            startDate: '',
            finishDate: '',
            accounting: true,
            withholding: true,
            statuses: [10, 20, 30, 99]
        })
        const setModalVisible = (data: any,) => {
            idSubRequest.value = data.data.id;
            modalStatus.value = true;
        }
        const pageSize = ref(20)
        const { onResult: resultSale } = useQuery(queries.getSale, requestDataSale)
        resultSale((res) => {
            var dataRes = res.data.searchSalesRepresentatives.datas
            let arrayAdd: any = []
            if (dataRes && dataRes.length > 0) {
                dataRes.map((x: any, index: any) => {
                    arrayAdd.push({
                        value: x.id,
                        label: x.name,
                    })
                })
            }
            arraySale.value = arrayAdd
        })

        const { refetch: refetchData, loading, error, onResult } = useQuery(queries.searchSubscriptionRequests, originDataCall.value)


        onResult((res) => {
            if (res.loading) {
            } else {
                rowTable.value = res.data.searchSubscriptionRequests.totalCount
                dataSource.value = res.data.searchSubscriptionRequests.datas
            }
        })

        setTimeout(() => {
            spinning.value = !spinning.value;
        }, 1000);

        return {
            idSubRequest,
            dataSource,
            modalStatus,
            rowTable,
            setModalVisible,
            spinning,
            arraySale,
            originData,
            requestDataSale,
            refetchData,
            pageSize,
            originDataCall,
            statuses
        }
    },

    watch: {
        'dateSearch'(newVal) {
            if (newVal != null) {
                this.originData.startDate = this.formarDate(newVal[0].$d)
                this.originData.finishDate = this.formarDate(newVal[1].$d)
            }
        },

        modalStatus() {
            this.searching()
        }
    },

    methods: {
        onExporting(e: { component: any; cancel: boolean; }) {
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
                        "계약정보관리&심사.xlsx"
                    );
                });
            });
            e.cancel = true;
        },
        customClass(cellInfo: { value: any; }) {
            return cellInfo.value;
        },
        getColorTag(data: any) {
            if (data == 10) {
                return { "name": "red", "tag_name": "신청" };
            } else if (data == 20) {
                return { "name": "blue", "tag_name": "심사중" };
            } else if (data == 30) {
                return { "name": "green", "tag_name": "승인" };
            } else if (data == 99) {
                return { "name": "grey", "tag_name": "반려" };
            }
        },
        formarDate(date: any) {
            return dayjs(date).format('YYYY/MM/DD')
        },

        searching() {
            if (!this.originData.startDate && !this.originData.finishDate) {
                this.originData.finishDate = this.formarDate(new Date())
                var date = this.formarDate(dayjs().subtract(1, 'year'))
                this.originData.startDate = date
            }
            this.spinning = true
            let arrayNew = {
                ...this.originData,
                page: 1,
                statuses: this.statuses.length > 0 ? this.statuses : [10, 20, 30, 99]
            }
            this.refetchData(arrayNew)
            setTimeout(() => {
                this.spinning = false
            }, 1000);
        },

        changePage() {
            this.spinning = !this.spinning;
            setTimeout(() => {
                this.spinning = !this.spinning;
            }, 1000);
        },

        chooseAll() {
            this.statuses = [10, 20, 30, 99]
        }
    },

});
</script>

<style lang="scss" scoped>
.page-content {
    padding-top: 10px;
}

.pagination-table {
    margin-top: 10px;
}

.dx-button-has-text .dx-button-content {
    padding: 0px 15px !important;
}

::v-deep .dx-toolbar-after {
    display: flex;

    .dx-toolbar-item {
        &:first-child {
            order: 2;
            margin-left: 15px;
        }
    }
}

.search-form {
    background: #f1f3f4;
    padding: 10px 24px;

    >div {
        justify-content: flex-start !important;
        align-items: center;
        margin-right: 15px;
    }

    label {
        margin-right: 10px;
    }
}

.ant-select {
    width: 145px;
}

::v-deep .dx-button-text {
    line-height: 0.5;
}

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

.noteText p {
    margin-bottom: 1px;
}

.noteImage {
    font-size: 11px;
    width: 100%;
    padding-top: 2px;
}

.ant-card-head-title {
    padding: 0px;
}

.ant-form-item {
    margin-bottom: 4px;
}

.title-number-modal {
    margin-top: 7px;
}

.ant-collapse {
    .ant-collapse-item {
        .ant-collapse-header {
            padding: 7px;
        }
    }
}

.ant-form-item-label {
    text-align: left;
}

.ant-card-extra {
    padding: 0px;
}

.ant-card-head {
    min-height: 30px;
}

.ant-table-thead {
    tr {
        th {
            padding: 7px;
        }
    }
}

.ant-table-tbody {
    tr {
        td {
            padding: 7px;
        }
    }
}

::v-deep .cell-center {
    text-align: center !important
}


::v-deep .ant-pagination-options {
    display: none;
}
</style>
>>>>>>> develop
