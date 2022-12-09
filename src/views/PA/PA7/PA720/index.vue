<template>
  <action-header title="기타소득자등록" @actionSave="onSubmit($event)" />
  <div id="pa-720" class="page-content">
    <a-row>
      <a-spin :spinning="loading" size="large">
        <DxDataGrid
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="columnData"
          :show-borders="true"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
        >
          <DxColumn
            :caption="globalYear + '귀속월'"
            cell-template="imputed-year"
          />
          <template #imputed-year="{ data }">
            <span>지급연월 </span>
          </template>
          <DxColumn caption="01" width="100px" cell-template="imputed-month1" />
          <template #imputed-month1="{ data }">
            <colorful-badge
              v-if="data.data.month_1"
              :value="data.data.month_1?.status"
              :year="data.data.month_1?.paymentYear"
              :month="data.data.month_1?.paymentMonth"
              :isUnder="true"
              @click=""
            />
          </template>
          <DxColumn caption="02" width="100px" cell-template="imputed-month2" />
          <template #imputed-month2="{ data }">
            <colorful-badge
              v-if="data.data.month_2"
              :value="data.data.month_2?.status"
              :year="data.data.month_2?.paymentYear"
              :month="data.data.month_2?.paymentMonth"
              @click="onOpenTax"
              :isUnder="true"
            />
          </template>
          <DxColumn caption="03" width="100px" cell-template="imputed-month3" />
          <template #imputed-month3="{ data }">
            <colorful-badge
              v-if="data.data.month_3"
              :value="data.data.month_3?.status"
              :year="data.data.month_3?.paymentYear"
              :month="data.data.month_3?.paymentMonth"
              @click="onOpenTax"
              :isUnder="true"
            />
          </template>
          <DxColumn caption="04" width="100px" cell-template="imputed-month4" />
          <template #imputed-month4="{ data }">
            <colorful-badge
              v-if="data.data.month_4"
              :value="data.data.month_4?.status"
              :year="data.data.month_4?.paymentYear"
              :month="data.data.month_4?.paymentMonth"
              @click="onOpenTax"
              :isUnder="true"
            />
          </template>
          <DxColumn caption="05" width="100px" cell-template="imputed-month5" />
          <template #imputed-month5="{ data }">
            <colorful-badge
              v-if="data.data.month_5"
              :value="data.data.month_5?.status"
              :year="data.data.month_5?.paymentYear"
              :month="data.data.month_5?.paymentMonth"
              @click="onOpenTax"
              :isUnder="true"
            />
          </template>
          <DxColumn caption="06" width="100px" cell-template="imputed-month6" />
          <template #imputed-month6="{ data }">
            <colorful-badge
              v-if="data.data.month_6"
              :value="data.data.month_6?.status"
              :year="data.data.month_6?.paymentYear"
              :month="data.data.month_6?.paymentMonth"
              @click="onOpenTax"
              :isUnder="true"
            />
          </template>
          <DxColumn caption="07" width="100px" cell-template="imputed-month7" />
          <template #imputed-month7="{ data }">
            <colorful-badge
              v-if="data.data.month_7"
              :value="data.data.month_7?.status"
              :year="data.data.month_7?.paymentYear"
              :month="data.data.month_7?.paymentMonth"
              @click="onOpenTax"
              :isUnder="true"
            />
          </template>
          <DxColumn caption="08" width="100px" cell-template="imputed-month8" />
          <template #imputed-month8="{ data }">
            <colorful-badge
              v-if="data.data.month_8"
              :value="data.data.month_8?.status"
              :year="data.data.month_8?.paymentYear"
              :month="data.data.month_8?.paymentMonth"
              @click="onOpenTax"
              :isUnder="true"
            />
          </template>
          <DxColumn caption="09" width="100px" cell-template="imputed-month9" />
          <template #imputed-month9="{ data }">
            <colorful-badge
              v-if="data.data.month_9"
              :value="data.data.month_9?.status"
              :year="data.data.month_9?.paymentYear"
              :month="data.data.month_9?.paymentMonth"
              @click="onOpenTax"
              :isUnder="true"
            />
          </template>
          <DxColumn
            caption="10"
            width="100px"
            cell-template="imputed-month10"
          />
          <template #imputed-month10="{ data }">
            <colorful-badge
              v-if="data.data.month_10"
              :value="data.data.month_10?.status"
              :year="data.data.month_10?.paymentYear"
              :month="data.data.month_10?.paymentMonth"
              @click="onOpenTax"
              :isUnder="true"
            />
          </template>
          <DxColumn
            caption="11"
            width="100px"
            cell-template="imputed-month11"
          />
          <template #imputed-month11="{ data }">
            <colorful-badge
              v-if="data.data.month_11"
              :value="data.data.month_11?.status"
              :year="data.data.month_11?.paymentYear"
              :month="data.data.month_11?.paymentMonth"
              @click="onOpenTax"
              :isUnder="true"
            />
          </template>
          <DxColumn
            caption="12"
            width="100px"
            cell-template="imputed-month12"
          />
          <template #imputed-month12="{ data }">
            <colorful-badge
              v-if="data.data.month_12"
              :value="data.data.month_12?.status"
              :year="data.data.month_12?.paymentYear"
              :month="data.data.month_12?.paymentMonth"
              @click="onOpenTax"
              :isUnder="true"
            />
          </template>
          <DxColumn
            width="100px"
            cell-template="open-modal"
            v-if="Object.keys(columnData).length < 12"
          />
          <template #open-modal="{ data }">
            <div style="width: 100%; text-align: center">[+]</div>
          </template>
          <DxMasterDetail :enabled="true" template="row-detail" />
          <template #row-detail="{ data }">
            <div class="table-detail">
              <DxDataGrid
                key-expr="id"
                :data-source="IncomeProcessExtrasCustom"
                :show-borders="false"
                :column-auto-width="true"
                :allow-column-reordering="move_column"
                :show-column-headers="false"
                :allow-column-resizing="colomn_resize"
                :focused-row-enabled="true"
              >
                <DxColumn
                  :caption="globalYear + ' 귀속월'"
                  cell-template="col-first"
                  data-type="string"
                />
                <template #col-first="{ data }">
                  <b>{{ data.data.name }}</b
                  ><br />
                </template>
                <DxColumn caption="1" width="100px" cell-template="month-1" />
                <template #month-1="{ data }">
                  <div
                    class="hover-underlined"
                    @click="
                      showDetailSelected(
                        data.data.month1.imputedMonth,
                        data.data.month1.imputedYear,
                        data.data.month1.paymentYear,
                        data.data.month1.paymentMonth
                      )
                    "
                    v-if="data.data.month1"
                  >
                    {{ data.data.month1.value }}
                  </div>
                </template>
                <DxColumn caption="2" width="100px" cell-template="month-2" />
                <template #month-2="{ data }">
                  <div
                    class="hover-underlined"
                    @click="
                      showDetailSelected(
                        data.data.month2.imputedMonth,
                        data.data.month2.imputedYear,
                        data.data.month2.paymentYear,
                        data.data.month2.paymentMonth
                      )
                    "
                    v-if="data.data.month2"
                  >
                    {{ data.data.month2.value }}
                  </div>
                </template>
                <DxColumn caption="3" width="100px" cell-template="month-3" />
                <template #month-3="{ data }">
                  <div
                    class="hover-underlined"
                    @click="
                      showDetailSelected(
                        data.data.month3.imputedMonth,
                        data.data.month3.imputedYear,
                        data.data.month3.paymentYear,
                        data.data.month3.paymentMonth
                      )
                    "
                    v-if="data.data.month3"
                  >
                    {{ data.data.month3.value }}
                  </div>
                </template>
                <DxColumn caption="4" width="100px" cell-template="month-4" />
                <template #month-4="{ data }">
                  <div
                    class="hover-underlined"
                    @click="
                      showDetailSelected(
                        data.data.month4.imputedMonth,
                        data.data.month4.imputedYear,
                        data.data.month4.paymentYear,
                        data.data.month4.paymentMonth
                      )
                    "
                    v-if="data.data.month4"
                  >
                    {{ data.data.month4.value }}
                  </div>
                </template>
                <DxColumn caption="5" width="100px" cell-template="month-5" />
                <template #month-5="{ data }">
                  <div
                    class="hover-underlined"
                    @click="
                      showDetailSelected(
                        data.data.month5.imputedMonth,
                        data.data.month5.imputedYear,
                        data.data.month5.paymentYear,
                        data.data.month5.paymentMonth
                      )
                    "
                    v-if="data.data.month5"
                  >
                    {{ data.data.month5.value }}
                  </div>
                </template>
                <DxColumn caption="6" width="100px" cell-template="month-6" />
                <template #month-6="{ data }">
                  <div
                    class="hover-underlined"
                    @click="
                      showDetailSelected(
                        data.data.month6.imputedMonth,
                        data.data.month6.imputedYear,
                        data.data.month6.paymentYear,
                        data.data.month6.paymentMonth
                      )
                    "
                    v-if="data.data.month6"
                  >
                    {{ data.data.month6.value }}
                  </div>
                </template>
                <DxColumn caption="7" width="100px" cell-template="month-7" />
                <template #month-7="{ data }">
                  <div
                    class="hover-underlined"
                    @click="
                      showDetailSelected(
                        data.data.month7.imputedMonth,
                        data.data.month7.imputedYear,
                        data.data.month7.paymentYear,
                        data.data.month7.paymentMonth
                      )
                    "
                    v-if="data.data.month7"
                  >
                    {{ data.data.month7.value }}
                  </div>
                </template>
                <DxColumn caption="8" width="100px" cell-template="month-8" />
                <template #month-8="{ data }">
                  <div
                    class="hover-underlined"
                    @click="
                      showDetailSelected(
                        data.data.month8.imputedMonth,
                        data.data.month8.imputedYear,
                        data.data.month8.paymentYear,
                        data.data.month8.paymentMonth
                      )
                    "
                    v-if="data.data.month8"
                  >
                    {{ data.data.month8.value }}
                  </div>
                </template>
                <DxColumn caption="9" width="100px" cell-template="month-9" />
                <template #month-9="{ data }">
                  <div
                    class="hover-underlined"
                    @click="
                      showDetailSelected(
                        data.data.month9.imputedMonth,
                        data.data.month9.imputedYear,
                        data.data.month9.paymentYear,
                        data.data.month9.paymentMonth
                      )
                    "
                    v-if="data.data.month9"
                  >
                    {{ data.data.month9.value }}
                  </div>
                </template>
                <DxColumn caption="10" width="100px" cell-template="month-10" />
                <template #month-10="{ data }">
                  <div
                    class="hover-underlined"
                    @click="
                      showDetailSelected(
                        data.data.month10.imputedMonth,
                        data.data.month10.imputedYear,
                        data.data.month10.paymentYear,
                        data.data.month10.paymentMonth
                      )
                    "
                    v-if="data.data.month10"
                  >
                    {{ data.data.month10.value }}
                  </div>
                </template>
                <DxColumn caption="11" width="100px" cell-template="month-11" />
                <template #month-11="{ data }">
                  <div
                    class="hover-underlined"
                    @click="
                      showDetailSelected(
                        data.data.month11.imputedMonth,
                        data.data.month11.imputedYear,
                        data.data.month11.paymentYear,
                        data.data.month11.paymentMonth
                      )
                    "
                    v-if="data.data.month11"
                  >
                    {{ data.data.month11.value }}
                  </div>
                </template>
                <DxColumn caption="12" width="100px" cell-template="month-12" />
                <template #month-12="{ data }">
                  <div
                    class="hover-underlined"
                    @click="
                      showDetailSelected(
                        data.data.month12.imputedMonth,
                        data.data.month12.imputedYear,
                        data.data.month12.paymentYear,
                        data.data.month12.paymentMonth
                      )
                    "
                    v-if="data.data.month12"
                  >
                    {{ data.data.month12.value }}
                  </div>
                </template>
                <DxColumn
                  width="100px"
                  cell-template="open-modal"
                  v-if="Object.keys(columnData).length < 12"
                />
                <template #open-modal="{ data }"> </template>
              </DxDataGrid>
            </div>
          </template>
        </DxDataGrid>
      </a-spin>
    </a-row>
    <a-row
      style="
        border: 1px solid #d7d7d7;
        padding: 10px;
        margin-top: 10px;
        justify-content: space-between;
      "
    >
      <a-col>
        <DxButton
          :text="'귀' + imputedYear + imputedMonth"
          :style="{ color: 'white', backgroundColor: 'gray' }"
          :height="'33px'"
        />
        <DxButton
          :text="'지' + imputedYear + imputedMonth"
          :style="{ color: 'white', backgroundColor: 'black' }"
          :height="'33px'"
        />
        <ProcessStatus v-model:valueStatus="price" />
      </a-col>
      <a-col class="">
        <DxButton class="ml-3" @click="deleteItem">
          <img
            style="width: 17px"
            src="@/assets/images/icon_delete.png"
            alt=""
          />
        </DxButton>
        <DxButton class="ml-3" icon="plus" />
        <DxButton class="ml-3" icon="edit" @click="editItem" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="13" class="custom-layout">
        <a-spin :spinning="loading" size="large">
          <DxDataGrid
            :show-row-lines="true"
            :hoverStateEnabled="true"
            :data-source="getIncomeExtrasFake"
            :show-borders="true"
            :allow-column-reordering="move_column"
            :allow-column-resizing="colomn_resize"
            :column-auto-width="true"
            @selection-changed="selectionChanged"
            @row-click="onRowClick"
          >
            <DxSelection
              select-all-mode="allPages"
              show-check-boxes-mode="always"
              mode="multiple"
            />
            <DxColumn
              caption="기타소득자 [소득구분]"
              cell-template="tag"
              width="170"
            />
            <template #tag="{ data }" class="custom-action">
              <div>
                <button style="margin-right: 5px">
                  {{ data.data.incomeTypeCode }}
                </button>
                <a-tooltip placement="top">
                  <template
                    #title
                    v-if="data.data.employee.incomeTypeName.length > 10"
                  >
                    <span>{{ data.data.employee.incomeTypeName }}</span>
                  </template>

                  {{ checkLen(data.data.employee.incomeTypeName) }}
                </a-tooltip>
              </div>
            </template>
            <DxColumn caption="지급일" data-field="paymentDay" />
            <DxColumn caption="지급액" data-field="paymentAmount" />
            <DxColumn caption="필요경비" data-field="requiredExpenses" />
            <DxColumn caption="소득금액" data-field="incomePayment" />
            <DxColumn caption="세율" data-field="taxRate" />
            <DxColumn caption="공제" cell-template="incomLocalTax" />
            <template #incomLocalTax="{ data }">
              {{
                data.data.withholdingIncomeTax +
                data.data.withholdingLocalIncomeTax
              }}
            </template>
            <DxColumn caption="차인지급액" data-field="actualPayment" />
            <DxSummary>
              <!-- <DxTotalItem :customize-text="customizeTotal" show-in-column="성명 (상호)" />
                        <DxTotalItem :customize-text="customizeTotalTaxPay" show-in-column="과세소득" />
                        <DxTotalItem :customize-text="customizeTotalTaxfreePay" show-in-column="비과세소득" />
                        <DxTotalItem :customize-text="customizeIncomeTax" column="withholdingIncomeTax" />
                        <DxTotalItem :customize-text="customizeDateLocalIncomeTax" column="withholdingLocalIncomeTax" /> -->
            </DxSummary>
          </DxDataGrid>
        </a-spin>
      </a-col>
      <a-col :span="11" class="custom-layout" style="padding-right: 0px">
        <standard-form
          action=""
          name="add-page-210"
          style="border: 1px solid #d7d7d7; padding: 10px"
        >
          <a-row>
            <a-col :span="24">
              {{ incomeArr[0] }}
              {{ products }}
              <a-form-item label="기타소득자">
                <!-- <DxSelectBox
                  id="custom-templates"
                  :data-source="incomeArr"
                  :value="incomeArr[0].id"
                  display-expr="incomeTypeCode"
                  value-expr="id"
                  field-template="field"
                  item-template="item"
                >
                  <template #field="{ data }">
                    <Field :field-data="data" />
                  </template>
                  <template #item="{ data }">
                    <Item :item-data="data" />
                  </template>
                </DxSelectBox> -->
                <DxSelectBox
                  id="custom-templates"
                  :data-source="products"
                  :value="products[1].ID"
                  display-expr="Name"
                  value-expr="ID"
                  field-template="field"
                  item-template="item"
                  @value-changed="changeValueType"
                >
                  <template #field="{ data }">
                    <Field :field-data="data" />
                  </template>
                  <template #item="{ data }">
                    <div class="custom-item">
                      <img :src="data.ImageSrc" />
                      <div class="product-name">
                        {{ data.Name }}
                      </div>
                    </div>
                  </template>
                </DxSelectBox>
              </a-form-item>
            </a-col>
            <!-- <a-col :span="12">
              <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0"
                  >요약</a-typography-title
                >
              </div>
              <a-form-item label="근무일수">
                <text-number-box width="200px" :required="true" />
              </a-form-item>
              <a-form-item label="월급여">
                <default-text-box width="200px" :required="true" />
              </a-form-item>
              <a-form-item label="공제합계">
                <default-text-box width="200px" :required="true" />
              </a-form-item>
              <a-form-item label="차인지급액">
                <default-text-box width="200px" :required="true" />
                <img src="@/assets/images/iconInfo.png" style="width: 16px" />
                <span> 급여합계 - 공제합계 </span>
              </a-form-item>
            </a-col> -->
            <!-- <a-col :span="24">
              <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0"
                  >급여 / 공제</a-typography-title
                >
              </div>
            </a-col> -->
            <a-col span="24">
              <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0"
                  >소득내역</a-typography-title
                >
              </div>
            </a-col>
            <a-col :span="12" style="padding-right: 5px">
              <!-- <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0">
                  귀속/지급연월
                </a-typography-title>
              </div> -->
              <a-form-item label="귀속/지급연월" style="display: flex">
                <div class="input-text">
                  <button>monthpicker imputedYear-imputedMonth</button>
                  <button>monthpicker paymentYear-paymentMonth</button>
                </div>
              </a-form-item>
              <a-form-item label="지급일">
                <text-number-box
                  width="150px"
                  :required="true"
                  :min="1"
                  :max="30"
                  :spinButtons="true"
                  value="datepicker"
                ></text-number-box>
              </a-form-item>
              <a-form-item label="지급액">
                <text-number-box
                  width="150px"
                  :required="true"
                  :min="1"
                  :max="30"
                  :spinButtons="true"
                ></text-number-box>
              </a-form-item>
              <a-form-item label="필요경비">
                <text-number-box
                  width="150px"
                  :required="true"
                  :min="1"
                  :max="30"
                  :spinButtons="true"
                ></text-number-box>
              </a-form-item>
              <a-form-item label="세율">
                <DxSelectBox
                  width="200px"
                  :data-source="incomeArr"
                  placeholder="선택"
                  display-expr="label"
                  item-template="item-data"
                  :height="$config_styles.HeightInput"
                >
                  <template #item-data="{ data }">
                    <button style="margin-right: 5px">
                      {{ data.incomeTypeCode }}
                    </button>
                    <a-tooltip placement="top">
                      <template #title v-if="data.incomeTypeName.length > 10">
                        <span>{{ data.incomeTypeName }}</span>
                      </template>

                      {{ checkLen(data.incomeTypeName) }}
                    </a-tooltip>
                  </template>
                </DxSelectBox>
              </a-form-item>
            </a-col>
            <a-col :span="12" style="padding-left: 5px">
              <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0"
                  >공제합계 {{ price }}원</a-typography-title
                >
              </div>
              <div class="input-text">
                <a-form-item label="소득세(공제)">
                  <text-number-box
                    style="margin-left: 20px; width: 150px"
                    :required="true"
                  />
                  <span>원</span>
                </a-form-item>
              </div>
              <div class="input-text">
                <a-form-item label="지방소득세(공제)">
                  <text-number-box
                    style="margin-left: 20px; width: 150px"
                    :required="true"
                  />
                  <span>원</span>
                </a-form-item>
              </div>
              <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0"
                  >차인지급액 {{ price }}원
                  <img src="@/assets/images/iconInfo.png" style="width: 16px" />
                  <span
                    style="font-size: 10px; color: #7f7f7f; margin-left: 5px"
                    >지급액 - 필요경비 - 공제합계</span
                  >
                </a-typography-title>
              </div>
            </a-col>
          </a-row>
          <div class="text-align-center mt-50">
            <DxButton
              @click="modalDeductions = true"
              :text="'공제 재계산'"
              :style="{ color: 'white', backgroundColor: 'gray' }"
              :height="'33px'"
            />
            <DxButton
              @click="modalInsurance = true"
              :text="'4대보험 EDI 조회/적용'"
              :style="{ color: 'white', backgroundColor: 'gray' }"
              :height="'33px'"
            />
          </div>
        </standard-form>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from 'vue';
import DxButton from 'devextreme-vue/button';
import dayjs, { Dayjs } from 'dayjs';
import { useStore } from 'vuex';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { companyId } from '../../../../helpers/commonFunction';
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
  DxItem,
  DxSummary,
  DxTotalItem,
  DxMasterDetail,
} from 'devextreme-vue/data-grid';
import DxSelectBox from 'devextreme-vue/select-box';
import {
  EditOutlined,
  HistoryOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  PrinterOutlined,
  DeleteOutlined,
  SaveOutlined,
} from '@ant-design/icons-vue';
import notification from '../../../../utils/notification';
import {
  getIncomeProcessExtrasFake,
  getIncomeExtrasFake,
  monthNums,
} from './utils/index';
import queries from '../../../../graphql/queries/PA/PA7/PA720/index';
import mutations from '../../../../graphql/mutations/PA/PA7/PA720/index';
import { Message } from '../../../../configs/enum';
import DxDropDownButton from 'devextreme-vue/drop-down-button';
import DeletePopup from './components/Popup/DeletePopup.vue';
import EditPopup from './components/Popup/EditPopup.vue';
import EmailSinglePayrollRegisterPopup from './components/Popup/EmailSinglePayrollRegisterPopup.vue';
import EmailMultiPopup from './components/Popup/EmailMultiPopup.vue';
import EmailSinglePopup from './components/Popup/EmailSinglePopup.vue';
import PrintSalaryStatementPopup from './components/Popup/PrintSalaryStatementPopup.vue';
import EmploySelect from '@/components/common/EmploySelect.vue';
import ProcessStatus from '@/components/common/ProcessStatus.vue';
import Field from './components/Field.vue';
import Item from './components/Item.vue';
import filters from '@/helpers/filters';
export default defineComponent({
  components: {
    DxMasterDetail,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxScrolling,
    DxToolbar,
    DxEditing,
    DxGrouping,
    DxItem,
    DxButton,
    DxSummary,
    DxTotalItem,
    EditOutlined,
    HistoryOutlined,
    SearchOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SaveOutlined,
    PrintSalaryStatementPopup,
    DeletePopup,
    EditPopup,
    EmailSinglePayrollRegisterPopup,
    EmailMultiPopup,
    EmailSinglePopup,
    EmploySelect,
    ProcessStatus,
    DxSelectBox,
    Field,
    Item,
  },
  setup() {
    const price = ref(40);
    const dataSource = ref<[]>([]);
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const trigger = ref<boolean>(true);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);

    const modalEmailSingle = ref(false);
    const modalEmailSinglePayrollRegister = ref(false);
    const modalEmailMulti = ref(false);

    const popupDataEmailSingle = ref({});
    const popupDataEmailSinglePayrollRegister = ref({});
    const popupDataEmailMulti = ref({});

    const imputedYear = ref('');
    const imputedMonth = ref('');

    // const modalPrintSalaryStatement = ref<boolean>(false);
    const modalDeductions = ref<boolean>(false);
    const modalInsurance = ref<boolean>(false);
    const modalDelete = ref<boolean>(false);
    const modalEdit = ref<boolean>(false);
    const modalHistoryStatus = ref<boolean>(false);
    const popupDataPayrollRegister = ref({});
    const popupDataSalaryStatement = ref({});
    const popupDataDelete = ref({});
    const popupDataEdit = ref({});
    const originData = ref({
      companyId: companyId,
      imputedYear: globalYear,
      imputedMonth: null,
    });
    let popupData = ref([]);

    // ======================= GRAPQL ================================

    const {
      refetch: refetchIncomeProcessExtras,
      result: resultIncomeProcessExtras,
      loading: loadingIncomeProcessExtras,
      onResult: onResultIncomeProcessExtras,
    } = useQuery(queries.getIncomeProcessExtras, originData, () => ({
      enabled: trigger.value,
      fetchPolicy: 'no-cache',
    }));
    const {
      refetch: refetchData,
      //   refetchIncomeExtra
      result: resultIncomeExtra,
      loading,
      //   loadingIncomeExtra
    } = useQuery(queries.getIncomeExtra, originData, () => ({
      enabled: trigger.value,
      fetchPolicy: 'no-cache',
    }));
    const {
      refetch: refetchIncomeProcessExtraStatViews,
      result: resultIncomeProcessExtraStatViews,
      loading: loadingIncomeProcessExtraStatViews,
    } = useQuery(queries.findIncomeProcessExtraStatViews, originData, () => ({
      enabled: trigger.value,
      fetchPolicy: 'no-cache',
    }));
    const {
      refetch: refetchIncomeExtrasLogs,
      result: resultIncomeExtrasLogs,
      loading: loadingIncomeExtrasLogs,
    } = useQuery(queries.getIncomeExtrasLogs, originData, () => ({
      enabled: trigger.value,
      fetchPolicy: 'no-cache',
    }));
    const {
      refetch: refetchIncomeExtras,
      result: resultIncomeExtras,
      loading: loadingIncomeExtras,
    } = useQuery(queries.getIncomeExtras, originData, () => ({
      enabled: trigger.value,
      fetchPolicy: 'no-cache',
    }));

    //mutations

    const {
      mutate: createIncomeExtra,
      onDone: createIncomeExtraDone,
      onError: createIncomeExtraError,
    } = useMutation(mutations.createIncomeExtra);
    const {
      mutate: updateIncomeExtra,
      onDone: updateIncomeExtraDone,
      onError: updateIncomeExtraError,
    } = useMutation(mutations.updateIncomeExtra);
    const {
      mutate: updatechangeIncomeProcessExtraStatus,
      onDone: updatechangeIncomeProcessExtraStatusDone,
      onError: updatechangeIncomeProcessExtraStatusError,
    } = useMutation(mutations.changeIncomeProcessExtraStatus);
    const {
      mutate: createCopyIncomeExtras,
      onDone: createCopyIncomeExtrasDone,
      onError: createCopyIncomeExtrasError,
    } = useMutation(mutations.copyIncomeExtras);

    // ======================= WATCH ==================================
    watch(resultIncomeProcessExtras, (value) => {
      if (value) {
        console.log(value, 'sdf');
        dataSource.value = value.getIncomeProcessExtras;
        trigger.value = false;
      }
      console.log(dataSource.value);
    });

    const deleteItem = (value: any) => {
      modalDelete.value = true;
      popupDataDelete.value = value;
    };
    const editItem = (value: any) => {
      modalEdit.value = true;
      popupDataEdit.value = value;
    };
    // ======================= form ================================
    const editBoxValue = ref();
    const onSubmit = (e: any) => {
      console.log(e);
      createIncomeExtra({
        companyId: 29,
        processKey: {
          imputedYear: 2022,
          imputedMonth: 12,
          paymentYear: 2022,
          paymentMonth: 200,
        },
        input: {
          paymentDay: 16,
          employeeId: 15,
          incomeTypeCode: 'tr',
          paymentAmount: 12,
          requiredExpenses: 1,
          taxRate: 21312,
          withholdingLocalIncomeTax: 112,
          withholdingIncomeTax: 12,
        },
      });
    };

    // const onItemClick = (value: any) => {
    //   console.log(value);

    //   switch (value.itemData.event) {
    //     case 'PrintPayrollRegister':
    //       modalPrintPayrollRegister.value = true;
    //       // popupDataPayrollRegister.value = value
    //       break;
    //     case 'EmailPayrollRegister':
    //       modalEmailSinglePayrollRegister.value = true;
    //       // popupDataPayrollRegister.value = value
    //       break;
    //     case 'PrintSalaryStatement':
    //       modalPrintSalaryStatement.value = true;
    //       // popupDataPayrollRegister.value = value
    //       break;
    //     case 'EmailSalaryStatement':
    //       modalEmailSingle.value = true;
    //       // popupDataPayrollRegister.value = value
    //       break;
    //     case 'EmailMultiSalaryStatement':
    //       modalEmailMulti.value = true;
    //       // popupDataPayrollRegister.value = value
    //       break;
    //     case 'EmailPayrollRegister':
    //       modalPrintPayrollRegister.value = true;
    //       // popupDataPayrollRegister.value = value
    //       break;
    //     case 'History':
    //       modalHistoryStatus.value = true;
    //       // popupDataPayrollRegister.value = value
    //       break;
    //   }
    // };

    const selectionChanged = (data: any) => {};

    const onOpenTax = () => {
      console.log('dsf');
    };
    const checkLen = (text: String) => {
      if (text.length > 10) {
        return text.substring(0, 10) + '...';
      }
      return text;
    };
    const onRowClick = (e: any) => {
      console.log(e.data);
    };
    const incomeArr = getIncomeExtrasFake.map((item: any) => {
      return {
        incomeTypeCode: item.incomeTypeCode,
        incomeTypeName: item.employee.incomeTypeName,
        id: 1,
      };
    });
    const changeValueType = (data: any) => {
      // triggerGroup.value = true;
      // trigger.value = true
      // setTimeout(() => {
      //     let value = data.value
      //     if (data.value == 1 || data.value == 2)
      //         value = 'm'
      //     else if (data.value == 3)
      //         value = 'r'
      //     else if (data.value == 4)
      //         value = 'p'
      //     let dataCall: any = {
      //         type: value.toString()
      //     }
      //     originData.value.types = [value.toString()]
      //     dataCallGroup.value = dataCall
      // }, 100);
    };
    const products = [
      {
        ID: 1,
        Name: 'HD Video Player',
        Price: 330,
        Current_Inventory: 225,
        Backorder: 0,
        Manufacturing: 10,
        Category: 'Video Players',
        ImageSrc: 'images/products/1-small.png',
      },
      {
        ID: 2,
        Name: 'SuperHD Player',
        Price: 400,
        Current_Inventory: 150,
        Backorder: 0,
        Manufacturing: 25,
        Category: 'Video Players',
        ImageSrc: 'images/products/2-small.png',
      },
    ];
    let valueCallApiGetEmployeeBusiness = reactive({
      companyId: companyId,
      processKey: {
        imputedYear: 2022,
        imputedMonth: 10,
        paymentYear: 2022,
        paymentMonth: 1,
      },
    });
    const showDetailSelected = (
      imputedMonth: any,
      imputedYear: any,
      paymentYear: any,
      paymentMonth: any
    ) => {
      valueCallApiGetEmployeeBusiness.processKey.imputedMonth = imputedMonth;
      valueCallApiGetEmployeeBusiness.processKey.imputedYear = imputedYear;
      valueCallApiGetEmployeeBusiness.processKey.paymentYear = paymentYear;
      valueCallApiGetEmployeeBusiness.processKey.paymentMonth = paymentMonth;
    };
    const IncomeProcessExtrasCustom = ref<any>([]);
    let columnData = reactive<any>([{}]);
    onResultIncomeProcessExtras((res: any) => {
      let responeData = res.data.getIncomeProcessExtras;
      //   dataSource.value = [
      //     {
      //       companyId: companyId,
      //     },
      //   ];
      resultIncomeProcessExtras;
      IncomeProcessExtrasCustom.value = [
        {
          id: 1,
          name: '인원',
        },
        {
          id: 2,
          name: '지급액',
        },
        {
          id: 3,
          name: '소득세',
        },
        {
          id: 4,
          name: '지방소득세',
        },
        {
          id: 5,
          name: '공제총액',
        },
        {
          id: 6,
          name: '차인지급액',
        },
      ];

      responeData.forEach((val: any) => {
        console.log(val);
        if (val.imputedMonth == 1) {
          columnData[0].month_1 = {
            paymentYear: val.paymentYear,
            status: val.status,
            paymentMonth: val.paymentMonth,
          };
          return;
        }
        if (val.imputedMonth == 2) {
          columnData[0].month_2 = {
            paymentYear: val.paymentYear,
            status: val.status,
            paymentMount: val.paymentMonth,
          };
          return;
        }
        if (val.imputedMonth == 3) {
          columnData[0].month_3 = {
            paymentYear: val.paymentYear,
            status: val.status,
            paymentMount: val.paymentMonth,
          };
          return;
        }
        if (val.imputedMonth == 4) {
          columnData[0].month_4 = {
            paymentYear: val.paymentYear,
            status: val.status,
            paymentMount: val.paymentMonth,
          };
          return;
        }
        if (val.imputedMonth == 5) {
          columnData[0].month_5 = {
            paymentYear: val.paymentYear,
            status: val.status,
            paymentMount: val.paymentMonth,
          };
          return;
        }
        if (val.imputedMonth == 6) {
          columnData[0].month_6 = {
            paymentYear: val.paymentYear,
            status: val.status,
            paymentMount: val.paymentMonth,
          };
          return;
        }
        if (val.imputedMonth == 7) {
          columnData[0].month_7 = {
            paymentYear: val.paymentYear,
            status: val.status,
            paymentMount: val.paymentMonth,
          };
          return;
        }
        if (val.imputedMonth == 8) {
          columnData[0].month_8 = {
            paymentYear: val.paymentYear,
            status: val.status,
            paymentMount: val.paymentMonth,
          };
          return;
        }
        if (val.imputedMonth == 9) {
          columnData[0].month_9 = {
            paymentYear: val.paymentYear,
            status: val.status,
            paymentMonth: val.paymentMonth,
          };
          return;
        }
        if (val.imputedMonth == 10) {
          columnData[0].month_10 = {
            paymentYear: val.paymentYear,
            status: val.status,
            paymentMonth: val.paymentMonth,
          };
          return;
        }
        if (val.imputedMonth == 11) {
          columnData[0].month_11 = {
            paymentYear: val.paymentYear,
            status: val.status,
            paymentMonth: val.paymentMonth,
          };
          return;
        }
        if (val.imputedMonth == 12) {
          columnData[0].month_12 = {
            paymentYear: val.paymentYear,
            status: val.status,
            paymentMonth: val.paymentMonth,
          };
          return;
        }
        //   let dataAdd = {
        //     imputedMonth: val.imputedMonth,
        //     imputedYear: val.imputedYear,
        //     paymentYear: val.paymentYear,
        //     paymentMonth: val.paymentMonth,
        //   };
        //   dataSource.value[0]['month' + val.imputedMonth] = val;

        //   IncomeProcessExtrasCustom.value[0]['month' + val.imputedMonth] = {
        //     value: filters.formatCurrency(val.employeeStat.employeeCount),
        //     ...dataAdd,
        //   };
        //   IncomeProcessExtrasCustom.value[1]['month' + val.imputedMonth] = {
        //     value: filters.formatCurrency(val.incomeStat.incomePayment),
        //     ...dataAdd,
        //   };
        //   IncomeProcessExtrasCustom.value[2]['month' + val.imputedMonth] = {
        //     value: filters.formatCurrency(val.incomeStat.withholdingIncomeTax),
        //     ...dataAdd,
        //   };
        //   IncomeProcessExtrasCustom.value[3]['month' + val.imputedMonth] = {
        //     value: filters.formatCurrency(
        //       val.incomeStat.withholdingLocalIncomeTax
        //     ),
        //     ...dataAdd,
        //   };
        //   IncomeProcessExtrasCustom.value[4]['month' + val.imputedMonth] = {
        //     value: filters.formatCurrency(
        //       val.incomeStat.withholdingIncomeTax +
        //         val.incomeStat.withholdingLocalIncomeTax
        //     ),
        //     ...dataAdd,
        //   };
        //   IncomeProcessExtrasCustom.value[5]['month' + val.imputedMonth] = {
        //     value: filters.formatCurrency(val.incomeStat.actualPayment),
        //     ...dataAdd,
        //   };

        //   if (val.imputedMonth == dayjs().month()) {
        //     dataCallTableSmall.processKey.imputedMonth = val.imputedMonth;
        //     dataCallTableSmall.processKey.imputedYear = val.imputedYear;
        columnData = { ...val };
        //     dataCallTableSmall.processKey.paymentMonth = val.paymentMonth;
        //     dataCallTableSmall.processKey.paymentYear = val.paymentYear;
        //   }
      });
    });
    return {
      price,
      loading,
      dataSource,
      per_page,
      move_column,
      colomn_resize,
      refetchData,
      onSubmit,
      //   modalPrintSalaryStatement,
      modalHistoryStatus,
      popupDataPayrollRegister,
      popupDataSalaryStatement,
      deleteItem,
      modalDelete,
      popupDataDelete,
      editItem,
      modalEdit,
      popupDataEdit,
      popupData,
      selectionChanged,
      modalDeductions,
      modalInsurance,
      modalEmailSingle,
      modalEmailSinglePayrollRegister,
      modalEmailMulti,
      popupDataEmailSingle,
      popupDataEmailSinglePayrollRegister,
      popupDataEmailMulti,
      imputedYear,
      imputedMonth,
      getIncomeProcessExtrasFake,
      getIncomeExtrasFake,
      onOpenTax,
      checkLen,
      onRowClick,
      incomeArr,
      editBoxValue,
      products,
      changeValueType,
      globalYear,
      showDetailSelected,
      IncomeProcessExtrasCustom,
      columnData,
    };
  },
});
</script> 
<style lang="scss" scoped src="./style/style.scss" >
</style>
