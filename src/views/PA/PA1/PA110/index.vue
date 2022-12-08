<template>
  <action-header title="기타소득자등록" @actionSave="onSubmit($event)" />
  <div id="pa-110" class="page-content">
    <a-col :span="24" class="mt-10">
      <a-spin :spinning="loadingIncomeProcessWages" size="large">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
          key-expr="companyId" @exporting="onExporting" :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize" :column-auto-width="true" :focused-row-enabled="true">
          <DxScrolling column-rendering-mode="virtual" />
          <DxColumn :caption="globalYear + ' 귀속월'" cell-template="col-first" data-type="string" />
          <template #col-first="{ data }">
            <b>지급연월</b>
          </template>
          <DxColumn caption="1" width="100px" cell-template="month-1" />
          <template #month-1="{ data }">
            <div class="hover-underlined" v-if="data.data.month1"
              @click="showDetailSelected(data.data.month1.imputedMonth, data.data.month1.imputedYear, data.data.month1.paymentYear, data.data.month1.paymentMonth)">
              <colorful-badge :value="data.data.month1.status" :year="data.data.month1.imputedYear"
                :month="data.data.month1.imputedMonth" />
            </div>
          </template>
          <DxColumn caption="2" width="100px" cell-template="month-2" />
          <template #month-2="{ data }">
            <div class="hover-underlined" v-if="data.data.month2"
              @click="showDetailSelected(data.data.month2.imputedMonth, data.data.month2.imputedYear, data.data.month2.paymentYear, data.data.month2.paymentMonth)">
              <colorful-badge :value="data.data.month2.status" :year="data.data.month2.imputedYear"
                :month="data.data.month2.imputedMonth" />
            </div>
          </template>
          <DxColumn caption="3" width="100px" cell-template="month-3" />
          <template #month-3="{ data }">
            <div class="hover-underlined" v-if="data.data.month3"
              @click="showDetailSelected(data.data.month3.imputedMonth, data.data.month3.imputedYear, data.data.month3.paymentYear, data.data.month3.paymentMonth)">
              <colorful-badge :value="data.data.month3.status" :year="data.data.month3.imputedYear"
                :month="data.data.month3.imputedMonth" />
            </div>
          </template>
          <DxColumn caption="4" width="100px" cell-template="month-4" />
          <template #month-4="{ data }">
            <div class="hover-underlined" v-if="data.data.month4"
              @click="showDetailSelected(data.data.month4.imputedMonth, data.data.month4.imputedYear, data.data.month4.paymentYear, data.data.month4.paymentMonth)">
              <colorful-badge :value="data.data.month4.status" :year="data.data.month4.imputedYear"
                :month="data.data.month4.imputedMonth" />
            </div>
          </template>
          <DxColumn caption="5" width="100px" cell-template="month-5" />
          <template #month-5="{ data }">
            <div class="hover-underlined" v-if="data.data.month5"
              @click="showDetailSelected(data.data.month5.imputedMonth, data.data.month5.imputedYear, data.data.month5.paymentYear, data.data.month5.paymentMonth)">
              <colorful-badge :value="data.data.month5.status" :year="data.data.month5.imputedYear"
                :month="data.data.month5.imputedMonth" />
            </div>
          </template>
          <DxColumn caption="6" width="100px" cell-template="month-6" />
          <template #month-6="{ data }">
            <div class="hover-underlined" v-if="data.data.month6"
              @click="showDetailSelected(data.data.month6.imputedMonth, data.data.month6.imputedYear, data.data.month6.paymentYear, data.data.month6.paymentMonth)">
              <colorful-badge :value="data.data.month6.status" :year="data.data.month6.imputedYear"
                :month="data.data.month6.imputedMonth" />
            </div>
          </template>
          <DxColumn caption="7" width="100px" cell-template="month-7" />
          <template #month-7="{ data }">
            <div class="hover-underlined" v-if="data.data.month7"
              @click="showDetailSelected(data.data.month7.imputedMonth, data.data.month7.imputedYear, data.data.month7.paymentYear, data.data.month7.paymentMonth)">
              <colorful-badge :value="data.data.month7.status" :year="data.data.month7.imputedYear"
                :month="data.data.month7.imputedMonth" />
            </div>
          </template>
          <DxColumn caption="8" width="100px" cell-template="month-8" />
          <template #month-8="{ data }">
            <div class="hover-underlined" v-if="data.data.month8"
              @click="showDetailSelected(data.data.month8.imputedMonth, data.data.month8.imputedYear, data.data.month8.paymentYear, data.data.month8.paymentMonth)">
              <colorful-badge :value="data.data.month8.status" :year="data.data.month8.imputedYear"
                :month="data.data.month8.imputedMonth" />
            </div>
          </template>
          <DxColumn caption="9" width="100px" cell-template="month-9" />
          <template #month-9="{ data }">
            <div class="hover-underlined" v-if="data.data.month9"
              @click="showDetailSelected(data.data.month9.imputedMonth, data.data.month9.imputedYear, data.data.month9.paymentYear, data.data.month9.paymentMonth)">
              <colorful-badge :value="data.data.month9.status" :year="data.data.month9.imputedYear"
                :month="data.data.month9.imputedMonth" />
            </div>
          </template>
          <DxColumn caption="10" width="100px" cell-template="month-10" />
          <template #month-10="{ data }">
            <div class="hover-underlined" v-if="data.data.month10"
              @click="showDetailSelected(data.data.month10.imputedMonth, data.data.month10.imputedYear, data.data.month10.paymentYear, data.data.month10.paymentMonth)">
              <colorful-badge :value="data.data.month10.status" :year="data.data.month10.imputedYear"
                :month="data.data.month10.imputedMonth" />
            </div>
          </template>
          <DxColumn caption="11" width="100px" cell-template="month-11" />
          <template #month-11="{ data }">
            <div class="hover-underlined" v-if="data.data.month11"
              @click="showDetailSelected(data.data.month11.imputedMonth, data.data.month11.imputedYear, data.data.month11.paymentYear, data.data.month11.paymentMonth)">
              <colorful-badge :value="data.data.month11.status" :year="data.data.month11.imputedYear"
                :month="data.data.month11.imputedMonth" />
            </div>
          </template>
          <DxColumn caption="12" width="100px" cell-template="month-12" />
          <template #month-12="{ data }">
            <div class="hover-underlined" v-if="data.data.month12"
              @click="showDetailSelected(data.data.month12.imputedMonth, data.data.month12.imputedYear, data.data.month12.paymentYear, data.data.month12.paymentMonth)">
              <colorful-badge :value="data.data.month12.status" :year="data.data.month12.imputedYear"
                :month="data.data.month12.imputedMonth" />
            </div>
          </template>
          <DxMasterDetail class="table-detail" :enabled="true" template="detailRow" />
          <template #detailRow="{ data }">
            <div class="table-detail">
              <DxDataGrid key-expr="id" :data-source="dataCustomRes" :show-borders="false" :column-auto-width="true"
                :allow-column-reordering="move_column" :show-column-headers="false"
                :allow-column-resizing="colomn_resize" :focused-row-enabled="true">
                <DxColumn :caption="globalYear + ' 귀속월'" cell-template="col-first" data-type="string" />
                <template #col-first="{ data }">
                  <b>{{ data.data.name }}</b><br>
                </template>
                <DxColumn caption="1" width="100px" cell-template="month-1" />
                <template #month-1="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month1.imputedMonth, data.data.month1.imputedYear, data.data.month1.paymentYear, data.data.month1.paymentMonth)"
                    v-if="data.data.month1"> {{ data.data.month1.value }}</div>
                </template>
                <DxColumn caption="2" width="100px" cell-template="month-2" />
                <template #month-2="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month2.imputedMonth, data.data.month2.imputedYear, data.data.month2.paymentYear, data.data.month2.paymentMonth)"
                    v-if="(data.data.month2)"> {{ data.data.month2.value }}</div>
                </template>
                <DxColumn caption="3" width="100px" cell-template="month-3" />
                <template #month-3="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month3.imputedMonth, data.data.month3.imputedYear, data.data.month3.paymentYear, data.data.month3.paymentMonth)"
                    v-if="(data.data.month3)"> {{ data.data.month3.value }}</div>
                </template>
                <DxColumn caption="4" width="100px" cell-template="month-4" />
                <template #month-4="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month4.imputedMonth, data.data.month4.imputedYear, data.data.month4.paymentYear, data.data.month4.paymentMonth)"
                    v-if="(data.data.month4)"> {{ data.data.month4.value }}</div>
                </template>
                <DxColumn caption="5" width="100px" cell-template="month-5" />
                <template #month-5="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month5.imputedMonth, data.data.month5.imputedYear, data.data.month5.paymentYear, data.data.month5.paymentMonth)"
                    v-if="(data.data.month5)"> {{ data.data.month5.value }}</div>
                </template>
                <DxColumn caption="6" width="100px" cell-template="month-6" />
                <template #month-6="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month6.imputedMonth, data.data.month6.imputedYear, data.data.month6.paymentYear, data.data.month6.paymentMonth)"
                    v-if="(data.data.month6)"> {{ data.data.month6.value }}</div>
                </template>
                <DxColumn caption="7" width="100px" cell-template="month-7" />
                <template #month-7="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month7.imputedMonth, data.data.month7.imputedYear, data.data.month7.paymentYear, data.data.month7.paymentMonth)"
                    v-if="(data.data.month7)"> {{ data.data.month7.value }}</div>
                </template>
                <DxColumn caption="8" width="100px" cell-template="month-8" />
                <template #month-8="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month8.imputedMonth, data.data.month8.imputedYear, data.data.month8.paymentYear, data.data.month8.paymentMonth)"
                    v-if="(data.data.month8)"> {{ data.data.month8.value }}</div>
                </template>
                <DxColumn caption="9" width="100px" cell-template="month-9" />
                <template #month-9="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month9.imputedMonth, data.data.month9.imputedYear, data.data.month9.paymentYear, data.data.month9.paymentMonth)"
                    v-if="(data.data.month9)"> {{ data.data.month9.value }}</div>
                </template>
                <DxColumn caption="10" width="100px" cell-template="month-10" />
                <template #month-10="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month10.imputedMonth, data.data.month10.imputedYear, data.data.month10.paymentYear, data.data.month10.paymentMonth)"
                    v-if="data.data.month10">
                    {{ data.data.month10.value }}
                  </div>
                </template>
                <DxColumn caption="11" width="100px" cell-template="month-11" />
                <template #month-11="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month11.imputedMonth, data.data.month11.imputedYear, data.data.month11.paymentYear, data.data.month11.paymentMonth)"
                    v-if="(data.data.month11)">
                    {{ data.data.month11.value }}
                  </div>
                </template>
                <DxColumn caption="12" width="100px" cell-template="month-12" />
                <template #month-12="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month12.imputedMonth, data.data.month12.imputedYear, data.data.month12.paymentYear, data.data.month12.paymentMonth)"
                    v-if="(data.data.month12)">
                    {{ data.data.month12.value }}
                  </div>
                </template>
              </DxDataGrid>
            </div>
          </template>
        </DxDataGrid>
        <div class="pagination-table" v-if="rowTable > originData.rows">
          <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows" :total="rowTable"
            show-less-items style="margin-top: 10px" />
        </div>
      </a-spin>
    </a-col>
    <a-row style="border: 1px solid #d7d7d7; padding: 10px; margin-top: 10px; justify-content: space-between;">
      <a-col>
        <DxButton :text="'귀' + imputedYear + imputedMonth" :style="{ color: 'white', backgroundColor: 'gray' }"
          :height="'33px'" />
        <DxButton :text="'지' + imputedYear + imputedMonth" :style="{ color: 'white', backgroundColor: 'black' }"
          :height="'33px'" />
        <ProcessStatus v-model:valueStatus="price" />
      </a-col>
      <a-col class="">
        <DxButton class="ml-3" @click="deleteItem">
          <img style="width: 17px;" src="@/assets/images/icon_delete.png" alt="">
        </DxButton>
        <DxButton class="ml-3" icon="plus" />
        <DxButton class="ml-3" icon="edit" @click="editItem" />

        <DxDropDownButton class="ml-3" :items="arrDropDownPayrollRegister" text="급여대장" @item-click="onItemClick"
          item-template="item-field">
          <template #item-field="{ data }">
            <div style="text-align: center;"><img :src="'../../../../../src/assets/images/' + data.img" alt=""
                style="width: 25px; height: 25px;" /></div>
          </template>
        </DxDropDownButton>
        <DxDropDownButton class="ml-3" :items="arrDropDownSalaryStatement" text="급여명세서" @item-click="onItemClick"
          item-template="item-field">
          <template #item-field="{ data }">
            <div style="text-align: center;"><img :src="'../../../../../src/assets/images/' + data.img" alt=""
                style="width: 25px; height: 25px;" /></div>
          </template>
        </DxDropDownButton>
        <DxDropDownButton class="ml-3" :items="arrDropDown" text="선택" style="width: 120px;" @item-click="onItemClick"
          item-template="item-field">
          <template #item-field="{ data }">
            <div style="text-align: center;">
              <HistoryOutlined v-if="data.img" class="mr-5" style="font-size: 18px" />
              <button v-else-if="data.url" class="button-open-tab">일용직사원등록</button>
            </div>
          </template>
        </DxDropDownButton>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="13" class="custom-layout">
        <a-spin :spinning="loadingIncomeWage" size="large">
          <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceDetail"
            :show-borders="true" key-expr="employeeId" @exporting="onExporting" :allow-column-reordering="move_column"
            :allow-column-resizing="colomn_resize" :column-auto-width="true" :onRowClick="actionEdit"
            :focused-row-enabled="true">
            <DxScrolling column-rendering-mode="virtual" />
            <DxColumn caption="사원" cell-template="tag" />
            <template #tag="{ data }" class="custom-action">
              <income-type :typeCode="data.data.incomeTypeCode"
                :typeName="(data.data.employee.name + data.data.employee.name)" />
            </template>
            <DxColumn caption="급여" data-field="totalPay" />
            <DxColumn caption="공제" data-field="totalDeduction" />
            <DxColumn caption="차인지급액" data-field="actualPayment" />
            <DxColumn caption="비고" />

            <DxColumn caption="지급일" data-field="paymentDay" />

          </DxDataGrid>
          <div class="pagination-table" v-if="rowTable > originData.rows">
            <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows" :total="rowTable"
              show-less-items style="margin-top: 10px" />
          </div>
        </a-spin>
      </a-col>
      <a-col :span="11" class="custom-layout" style="padding-right: 0px;">
        <standard-form action="" name="add-page-210" style="border: 1px solid #d7d7d7; padding: 10px;">
          <a-row>
            <a-col :span="12">
              <a-form-item label="근무일수">
                <EmploySelect :arrayValue="arrayEmploySelect" v-model:valueEmploy="formIncomeWage.input.employeeId"
                  width="350px" :required="true" />
              </a-form-item>
              <a-form-item label="지급일">
                <!-- <EmploySelect :arrayValue="arrayEmploySelect" v-model:valueEmploy="formIncomeWage.input.employeeId"
                                  width="200px" :required="true" /> -->
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0;">요약</a-typography-title>
              </div>
              <a-form-item label="근무일수">
                <text-number-box :disabled="true" v-model:valueInput="formIncomeWage.input.workingDays" width="200px"
                  :required="true" />
              </a-form-item>
              <a-form-item label="월급여">
                <text-number-box :disabled="true" v-model:valueInput="formIncomeWage.input.monthlyWage" width="200px"
                  :required="true" />
              </a-form-item>
              <a-form-item label="공제합계">
                <text-number-box :disabled="true" v-model:valueInput="dataIncomeWage.employee.totalDeduction"
                  width="200px" :required="true" />
              </a-form-item>
              <a-form-item label="차인지급액">
                <text-number-box :disabled="true" v-model:valueInput="dataIncomeWage.actualPayment" width="200px"
                  :required="true" />
                <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                <span>
                  급여합계 - 공제합계
                </span>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0;">급여 / 공제</a-typography-title>
              </div>
            </a-col>
            <a-col :span="12" style="padding-right: 5px;">
              <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0;">월급여 {{ price
                }}원</a-typography-title>
              </div>
              <a-form-item label="근무일수" style="display: flex;">
                <div class="input-text">
                  <switch-basic v-model:valueSwitch="dataIncomeWage.employee.monthlyPaycheck" :textCheck="'일급'"
                    :textUnCheck="'월급'" />
                  <number-box-money v-if="dataIncomeWage.employee.monthlyPaycheck" width="150px" :required="true"
                    placeholder='월급여' :spinButtons="false" v-model:valueInput="dataIncomeWage.monthlyWage" />
                  <number-box-money v-else width="150px" :required="true" placeholder='일급여' :spinButtons="false"
                    v-model:valueInput="dataIncomeWage.dailyWage" />
                </div>
                <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                <span v-if="dataIncomeWage.employee.monthlyPaycheck">월급 선택시, 일급 = 월급 / 근무일수</span>
                <span v-else>일급 선택시, 월급 = 일급 x 근무일수</span>
              </a-form-item>
              <a-form-item label="근무일수">
                <text-number-box width="150px" :required="true" v-model:valueInput="dataIncomeWage.workingDays" :min="1"
                  :max="30" :spinButtons="true"></text-number-box>
              </a-form-item>
              <span v-if="dataIncomeWage.employee.monthlyPaycheck">일급여 {{
                  dataIncomeWage.monthlyWage / dataIncomeWage.workingDays
              }}원</span>
              <span v-else>일급여 {{ dataIncomeWage.dailyWage }}원</span>
              <br>
              <span v-if="dataIncomeWage.employee.monthlyPaycheck">일급여 {{ dataIncomeWage.monthlyWage
              }}원</span>
              <span v-else>일급여 {{ dataIncomeWage.dailyWage * dataIncomeWage.workingDays }}원</span>
            </a-col>
            <a-col :span="12" style="padding-left: 5px;">
              <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0;">월급여 {{
                    dataIncomeWage.employee.totalDeduction
                }}원</a-typography-title>
              </div>
              <div class="input-text">
                <deduction-items :name="dataIncomeWage.employee.name" :type="1" subName="과세" />
                <text-number-box style="margin-left: 20px;width: 150px " :required="true" />
                <span>원</span>
              </div>
              <div class="input-text">
                <deduction-items name="소득세" :type="1" subName="과세" />
                <text-number-box style="margin-left: 20px;width: 150px " :required="true" />
                <span>원</span>
              </div>
            </a-col>
          </a-row>
          <div class="text-align-center mt-50">
            <DxButton @click="modalDeductions = true" :text="'공제 재계산'"
              :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
            <DxButton @click="modalInsurance = true" :text="'4대보험 EDI 조회/적용'"
              :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
          </div>
        </standard-form>
      </a-col>
    </a-row>


    <DeletePopup :modalStatus="modalDelete" @closePopup="modalDelete = false" :data="popupDataDelete" />
    <EditPopup :modalStatus="modalEdit" @closePopup="modalEdit = false" :data="popupDataEdit" />
    <PrintPayrollRegisterPopup :modalStatus="modalPrintPayrollRegister" @closePopup="modalPrintPayrollRegister = false"
      :data="popupDataPayrollRegister" />
    <PrintSalaryStatementPopup :modalStatus="modalPrintSalaryStatement" @closePopup="modalPrintSalaryStatement = false"
      :data="popupDataSalaryStatement" />
    <EmailMultiPopup :modalStatus="modalEmailMulti" @closePopup="modalEmailMulti = false" :data="popupDataEmailMulti" />
    <EmailSinglePayrollRegisterPopup :modalStatus="modalEmailSinglePayrollRegister"
      @closePopup="modalEmailSinglePayrollRegister = false" :data="popupDataEmailSinglePayrollRegister" />
    <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="modalEmailSingle = false"
      :data="popupDataEmailSingle" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
      title="변경이력" typeHistory="pa-110" />
    <DeductionPopup :modalStatus="modalDeductions" @closePopup="modalDeductions = false" />
    <InsurancePopup :modalStatus="modalInsurance" @closePopup="modalInsurance = false" />
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from "vue"
import DxButton from "devextreme-vue/button"
import dayjs, { Dayjs } from 'dayjs';
import { useStore } from 'vuex'
import { useQuery, useMutation } from "@vue/apollo-composable"
import { companyId } from "@/helpers/commonFunction"
import { onExportingCommon } from "@/helpers/commonFunction"
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxSummary, DxTotalItem, DxMasterDetail } from "devextreme-vue/data-grid"
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue"
import notification from "@/utils/notification"
import PrintPayrollRegisterPopup from "./components/Popup/PrintPayrollRegisterPopup.vue"
import queries from "@/graphql/queries/PA/PA1/PA110/index"
import mutations from "@/graphql/mutations/PA/PA1/PA110/index"
import { Message } from "@/configs/enum"
import { sampleDataIncomeWage, sampleFormIncomeWage, origindata, ArrForeigner } from "./utils/index"
import DxDropDownButton from 'devextreme-vue/drop-down-button';
import DeletePopup from "./components/Popup/DeletePopup.vue"
import EditPopup from "./components/Popup/EditPopup.vue"
import EmailSinglePayrollRegisterPopup from "./components/Popup/EmailSinglePayrollRegisterPopup.vue"
import EmailMultiPopup from "./components/Popup/EmailMultiPopup.vue"
import EmailSinglePopup from "./components/Popup/EmailSinglePopup.vue"
import PrintSalaryStatementPopup from "./components/Popup/PrintSalaryStatementPopup.vue"
import EmploySelect from "@/components/common/EmploySelect.vue"
import ProcessStatus from "@/components/common/ProcessStatus.vue"
import DeductionPopup from "./components/Popup/DeductionPopup.vue"
import InsurancePopup from "./components/Popup/InsurancePopup.vue"
import filters from "@/helpers/filters";
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
    DxDropDownButton,
    PrintPayrollRegisterPopup,
    PrintSalaryStatementPopup,
    DeletePopup,
    EditPopup,
    EmailSinglePayrollRegisterPopup,
    EmailMultiPopup,
    EmailSinglePopup,
    EmploySelect,
    ProcessStatus,
    DeductionPopup,
    InsurancePopup,
  },
  setup() {
    const price = ref(40)

    const store = useStore()
    const globalYear = computed(() => store.state.settings.globalYear)
    const per_page = computed(() => store.state.settings.per_page)
    const move_column = computed(() => store.state.settings.move_column)
    const colomn_resize = computed(() => store.state.settings.colomn_resize)

    const trigger = ref<boolean>(true)
    const triggerIncomeWage = ref<boolean>(false)

    let dataCustomRes: any = reactive([])
    let dataIncomeWage: any = reactive({ ...sampleDataIncomeWage })
    const dataSource: any = ref([])
    const formIncomeWage = reactive({ ...sampleFormIncomeWage })

    const modalEmailSingle = ref(false)
    const modalEmailSinglePayrollRegister = ref(false)
    const modalEmailMulti = ref(false)

    const popupDataEmailSingle = ref({})
    const popupDataEmailSinglePayrollRegister = ref({})
    const popupDataEmailMulti = ref({})

    const imputedYear = ref('')
    const imputedMonth = ref('')
    const rowTable = ref(0);
    const originData = reactive({ ...origindata, rows: per_page });
    let dataSourceDetail = ref([]);
    const modalPrintPayrollRegister = ref<boolean>(false)
    const modalPrintSalaryStatement = ref<boolean>(false)
    const modalDeductions = ref<boolean>(false)
    const modalInsurance = ref<boolean>(false)
    const modalDelete = ref<boolean>(false)
    const modalEdit = ref<boolean>(false)
    const modalHistoryStatus = ref<boolean>(false)
    const popupDataPayrollRegister = ref({})
    const popupDataSalaryStatement = ref({})
    const popupDataDelete = ref({})
    const popupDataEdit = ref({})
    const originDataIncomProcessWages = reactive({
      companyId: companyId,
      imputedYear: globalYear,
      // imputedMonth: dayjs().month(),
    })
    const dataCallTableSmall = reactive({
      companyId: companyId,
      processKey: {
        imputedYear: null,
        imputedMonth: null,
        paymentYear: null,
        paymentMonth: null,
      }
    })
    let originDataIncomeWage = reactive({
      companyId: companyId,
      processKey: {
        imputedYear: 2022,
        imputedMonth: 10,
        paymentYear: 2022,
        paymentMonth: 1
      },
      incomeId: 1,
    })

    let popupData = ref([])
    let dataIncomeProcessWages = [
      {
        companyId: 29,
        type: 2,
        imputedYear: 2022,
        imputedMonth: 6,
        paymentYear: 123,
        paymentMonth: 3,
        status: 0,
        statusUserId: 321,
        statusUpdatedAt: "",
        createdAt: '',
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
        ip: '',
        active: true,
        statusUpdateUser: {
          id: 1,
          type: '',
          username: 'sda',
          name: 'asdf',
          active: true,
        },
        employeeStat: {
          type: '',
          imputedYear: 2022,
          imputedMonth: 4,
          paymentYear: 201,
          paymentMonth: 123,
          employeeCount: 47,
          retireEmployeeCount: 12,
        },
        incomeStat: {
          imputedYear: 2022,
          imputedMonth: 12,
          paymentYear: 12,
          paymentMonth: 3,
          incomePayment: 34,
          withholdingIncomeTax: 23,
          withholdingLocalIncomeTax: 12,
          withholdingRuralSpecialTax: 32,
          totalPay: 123,
          totalTaxPay: 12,
          totalTaxfreePay: 3,
          totalDeduction: 23,
          actualPayment: 100
        }
      },
      {
        companyId: 29,
        type: 2,
        imputedYear: 2022,
        imputedMonth: 7,
        paymentYear: 123,
        paymentMonth: 3,
        status: 0,
        statusUserId: 321,
        statusUpdatedAt: "",
        createdAt: '',
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
        ip: '',
        active: true,
        statusUpdateUser: {
          id: 1,
          type: '',
          username: 'sda',
          name: 'asdf',
          active: true,
        },
        employeeStat: {
          type: '',
          imputedYear: 2022,
          imputedMonth: 4,
          paymentYear: 201,
          paymentMonth: 123,
          employeeCount: 43,
          retireEmployeeCount: 12,
        },
        incomeStat: {
          imputedYear: 2022,
          imputedMonth: 12,
          paymentYear: 12,
          paymentMonth: 3,
          incomePayment: 34,
          withholdingIncomeTax: 23,
          withholdingLocalIncomeTax: 12,
          withholdingRuralSpecialTax: 32,
          totalPay: 123,
          totalTaxPay: 12,
          totalTaxfreePay: 3,
          totalDeduction: 23,
          actualPayment: 100
        }
      }
    ]

    // ======================= GRAPQL ================================
    // API QUERY Main TABLE 
    const { refetch: refetchDataProcessWages, loading: loadingIncomeProcessWages, onError: errorGetIncomeProcessWages, onResult: resIncomeProcessWages } = useQuery(queries.getIncomeProcessWages, originDataIncomProcessWages, () => ({
      enabled: trigger.value,
      fetchPolicy: "no-cache",
    }));
    resIncomeProcessWages(res => {

      // let respon = res.data.getIncomeProcessWages
      let respon = [...dataIncomeProcessWages]
      dataSource.value = [{
        companyId: companyId,
      }]

      dataCustomRes.value = [
        {
          id: 1,
          name: "재직(퇴사)",

        },
        {
          id: 2,
          name: "과세급여",

        },
        {
          id: 3,
          name: "비과세급여",

        },
        {
          id: 4,
          name: "급여총액",

        },
        {
          id: 5,
          name: "국민연금",

        },
        {
          id: 6,
          name: "건강보험",

        },
        {
          id: 7,
          name: "장기요양",

        },
        {
          id: 8,
          name: "고용보험",

        },
        {
          id: 9,
          name: "소득세",

        },
        {
          id: 10,
          name: "지방소득세",

        },
        {
          id: 11,
          name: "공제총액",

        },
        {
          id: 12,
          name: "차인지급액",

        },
      ]
      respon.map((val: any) => {
        // data table minify
        let dataAdd = {
          imputedMonth: val.imputedMonth,
          imputedYear: val.imputedYear,
          paymentYear: val.paymentYear,
          paymentMonth: val.paymentMonth,
        }
        dataSource.value[0]['month' + val.imputedMonth] = val

        // data table detail
        dataCustomRes.value[0]['month' + val.imputedMonth] =
        {
          value: filters.formatCurrency(val.employeeStat.employeeCount),
          ...dataAdd
        }
        dataCustomRes.value[1]['month' + val.imputedMonth] =
        {
          value: filters.formatCurrency(val.incomeStat.totalTaxPay),
          ...dataAdd
        }
        dataCustomRes.value[2]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val.incomeStat.totalTaxfreePay),
          ...dataAdd
        }
        dataCustomRes.value[3]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val.incomeStat.withholdingLocalIncomeTax),
          ...dataAdd
        }
        dataCustomRes.value[4]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val.incomeStat.withholdingLocalIncomeTax),
          ...dataAdd
        }
        dataCustomRes.value[5]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val.incomeStat.withholdingLocalIncomeTax),
          ...dataAdd
        }
        dataCustomRes.value[6]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val.incomeStat.withholdingLocalIncomeTax),
          ...dataAdd
        }
        dataCustomRes.value[7]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val.incomeStat.withholdingLocalIncomeTax),
          ...dataAdd
        }
        dataCustomRes.value[8]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val.incomeStat.withholdingIncomeTax),
          ...dataAdd
        }
        dataCustomRes.value[9]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val.incomeStat.withholdingLocalIncomeTax),
          ...dataAdd
        }
        dataCustomRes.value[10]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val.incomeStat.totalDeduction),
          ...dataAdd
        }
        dataCustomRes.value[11]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val.incomeStat.actualPayment),
          ...dataAdd
        }
        if (val.imputedMonth == dayjs().month()) {
          dataCallTableSmall.processKey.imputedMonth = val.imputedMonth
          dataCallTableSmall.processKey.imputedYear = val.imputedYear
          dataCallTableSmall.processKey.paymentMonth = val.paymentMonth
          dataCallTableSmall.processKey.paymentYear = val.paymentYear

          triggerIncomeWage.value = true
          refetchDataIncomeWage()
        }
        console.log('dataCustomRes', dataCustomRes.value)
      })
    })
    errorGetIncomeProcessWages(res => {
      notification('error', res.message)
    })


    //
    // API QUERY TABLE SMALL LEFT SIDE
    const { refetch: refetchDataIncomeWage, loading: loadingIncomeWage, onError: errorGetIncomeProcess, onResult: resultIncomeWage } = useQuery(queries.getIncomeWage, originDataIncomeWage, () => ({
      enabled: triggerIncomeWage.value,
      fetchPolicy: "no-cache",
    }));
    resultIncomeWage(res => {
      dataSourceDetail.value = res.data.getIncomeWage
      console.log(dataSourceDetail.value);

    })
    errorGetIncomeProcess(res => {
      notification('error', res.message)
    })
    // ======================= WATCH ==================================


    const deleteItem = (value: any) => {
      modalDelete.value = true;
      popupDataDelete.value = value
    };
    const editItem = (value: any) => {
      modalEdit.value = true;
      popupDataEdit.value = value
    };
    // ======================= FUNCTION ================================
    const showDetailSelected = (imputedMonth: any, imputedYear: any, paymentYear: any, paymentMonth: any) => {
      originDataIncomeWage.processKey.imputedMonth = imputedMonth
      originDataIncomeWage.processKey.imputedYear = imputedYear
      originDataIncomeWage.processKey.paymentYear = paymentYear
      originDataIncomeWage.processKey.paymentMonth = paymentMonth
    }
    const onSubmit = (e: any) => {
    }
    const onExporting = (e: any) => {
      onExportingCommon(e.component, e.cancel, '영업자관리')
    };
    const actionEdit = (data: any) => {

    }
    const arrDropDownPayrollRegister = [
      { id: 1, img: 'print.svg', event: 'PrintPayrollRegister' },
      { id: 2, img: 'email.png', event: 'EmailPayrollRegister' },
    ];
    const arrDropDownSalaryStatement = [
      { id: 1, img: 'print.svg', event: 'PrintSalaryStatement' },
      { id: 2, img: 'email.png', event: 'EmailSalaryStatement' },
      { id: 3, img: 'group_email.png', event: 'EmailMultiSalaryStatement' },
    ];
    const arrDropDown = [
      { id: 1, url: '520', event: '520' },
      { id: 2, img: 'email.png', event: 'History' },
    ]
    const onItemClick = (value: any) => {
      console.log(value);

      switch (value.itemData.event) {
        case 'PrintPayrollRegister':
          modalPrintPayrollRegister.value = true;
          // popupDataPayrollRegister.value = value
          break;
        case 'EmailPayrollRegister':
          modalEmailSinglePayrollRegister.value = true;
          // popupDataPayrollRegister.value = value
          break;
        case 'PrintSalaryStatement':
          modalPrintSalaryStatement.value = true;
          // popupDataPayrollRegister.value = value
          break;
        case 'EmailSalaryStatement':
          modalEmailSingle.value = true;
          // popupDataPayrollRegister.value = value
          break;
        case 'EmailMultiSalaryStatement':
          modalEmailMulti.value = true;
          // popupDataPayrollRegister.value = value
          break;
        case 'EmailPayrollRegister':
          modalPrintPayrollRegister.value = true;
          // popupDataPayrollRegister.value = value
          break;
        case 'History':
          modalHistoryStatus.value = true;
          // popupDataPayrollRegister.value = value
          break;
      }
    }

    const selectionChanged = (data: any) => {

    }

    const arrayEmploySelect = ref([
      { employeeId: 1234123, name: '123', idCardNumber: '800101-1100123', status: 0, foreigner: true },
      { employeeId: 567567, name: '51231', idCardNumber: '800101-1100123', status: 0, foreigner: false },
      { employeeId: 789789, name: '5123', idCardNumber: '800101-1100123', status: 1, foreigner: true },
    ])



    return {
      price, globalYear,
      loadingIncomeProcessWages, onExporting, loadingIncomeWage, actionEdit, rowTable, originData, dataSourceDetail,
      dataSource,
      per_page, move_column, colomn_resize,
      refetchDataProcessWages, refetchDataIncomeWage,
      onSubmit,
      onItemClick,
      arrDropDownPayrollRegister,
      arrDropDownSalaryStatement,
      arrDropDown,
      modalPrintPayrollRegister,
      modalPrintSalaryStatement,
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
      arrayEmploySelect,
      imputedYear,
      imputedMonth,
      dataCustomRes,
      formIncomeWage,
      dataIncomeWage, dataIncomeProcessWages, showDetailSelected
    }

  },
})
</script> 
<style lang="scss" scoped src="./style/style.scss" >

</style>
