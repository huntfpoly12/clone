<template>
    <action-header title="기타소득자등록" @actionSave="onSubmit($event)" />
    <div id="pa-510" class="page-content">
        <a-row>
            <a-spin :spinning="loading" size="large">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    key-expr="imputedYear" :focused-row-enabled="true" :show-borders="true"
                    :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                    :column-auto-width="true">
                    <DxColumn :caption="imputedYear + '귀속월'" cell-template="imputed-year" width="350px" />
                    <template #imputed-year="{ data }">
                        <span>지급연월</span>
                    </template>
                    <!-- <DxColumn :caption="imputedMonth" cell-template="imputed-month" />
                    <template #imputed-month="{ data }">
                        <span>{{ data.data.paymentYear }}-{{ data.data.paymentMonth }}</span>
                    </template> -->
                    <DxColumn caption="01" cell-template="imputed-month1" />
                    <template #imputed-month1="{ data }">
                        <div v-if="data.data.month1">
                            <colorful-badge @click="showDetailSelected(month)"
                                v-for="(month, index) in data.data.month1" :key="index" :value="month.status"
                                :year="month.paymentYear" :month="month.paymentMonth" />
                        </div>
                    </template>
                    <DxColumn caption="02" cell-template="imputed-month2" />
                    <template #imputed-month2="{ data }">
                        <div v-if="data.data.month2">
                            <colorful-badge @click="showDetailSelected(month)"
                                v-for="(month, index) in data.data.month2" :key="index" :value="month.status"
                                :year="month.paymentYear" :month="month.paymentMonth" />
                        </div>
                    </template>
                    <DxColumn caption="03" cell-template="imputed-month3" />
                    <template #imputed-month3="{ data }">
                        <div v-if="data.data.month3">
                            <colorful-badge @click="showDetailSelected(month)"
                                v-for="(month, index) in data.data.month3" :key="index" :value="month.status"
                                :year="month.paymentYear" :month="month.paymentMonth" />
                        </div>
                    </template>
                    <DxColumn caption="04" cell-template="imputed-month4" />
                    <template #imputed-month4="{ data }">
                        <div v-if="data.data.month4">
                            <colorful-badge @click="showDetailSelected(month)"
                                v-for="(month, index) in data.data.month4" :key="index" :value="month.status"
                                :year="month.paymentYear" :month="month.paymentMonth" />
                        </div>
                    </template>
                    <DxColumn caption="05" cell-template="imputed-month5" />
                    <template #imputed-month5="{ data }">
                        <div v-if="data.data.month5">
                            <colorful-badge @click="showDetailSelected(month)"
                                v-for="(month, index) in data.data.month5" :key="index" :value="month.status"
                                :year="month.paymentYear" :month="month.paymentMonth" />
                        </div>
                    </template>
                    <DxColumn caption="06" cell-template="imputed-month6" />
                    <template #imputed-month6="{ data }">
                        <div v-if="data.data.month6">
                            <colorful-badge @click="showDetailSelected(month)"
                                v-for="(month, index) in data.data.month6" :key="index" :value="month.status"
                                :year="month.paymentYear" :month="month.paymentMonth" />
                        </div>
                    </template>
                    <DxColumn caption="07" cell-template="imputed-month7" />
                    <template #imputed-month7="{ data }">
                        <div v-if="data.data.month7">
                            <colorful-badge @click="showDetailSelected(month)"
                                v-for="(month, index) in data.data.month7" :key="index" :value="month.status"
                                :year="month.paymentYear" :month="month.paymentMonth" />
                        </div>
                    </template>
                    <DxColumn caption="08" cell-template="imputed-month8" />
                    <template #imputed-month8="{ data }">
                        <div v-if="data.data.month8">
                            <colorful-badge @click="showDetailSelected(month)"
                                v-for="(month, index) in data.data.month8" :key="index" :value="month.status"
                                :year="month.paymentYear" :month="month.paymentMonth" />
                        </div>
                    </template>
                    <DxColumn caption="09" cell-template="imputed-month9" />
                    <template #imputed-month9="{ data }">
                        <div v-if="data.data.month9">
                            <colorful-badge @click="showDetailSelected(month)"
                                v-for="(month, index) in data.data.month9" :key="index" :value="month.status"
                                :year="month.paymentYear" :month="month.paymentMonth" />
                        </div>
                    </template>
                    <DxColumn caption="10" cell-template="imputed-month10" />
                    <template #imputed-month10="{ data }">
                        <div v-if="data.data.month10">
                            <colorful-badge @click="showDetailSelected(month)"
                                v-for="(month, index) in data.data.month10" :key="index" :value="month.status"
                                :year="month.paymentYear" :month="month.paymentMonth" />
                        </div>
                    </template>
                    <DxColumn caption="11" cell-template="imputed-month11" />
                    <template #imputed-month11="{ data }">
                        <div v-if="data.data.month11">
                            <colorful-badge @click="showDetailSelected(month)"
                                v-for="(month, index) in data.data.month11" :key="index" :value="month.status"
                                :year="month.paymentYear" :month="month.paymentMonth" />
                        </div>
                    </template>
                    <DxColumn caption="12" cell-template="imputed-month12" />
                    <template #imputed-month12="{ data }">
                        <div v-if="data.data.month12">
                            <colorful-badge @click="showDetailSelected(month)"
                                v-for="(month, index) in data.data.month12" :key="index" :value="month.status"
                                :year="month.paymentYear" :month="month.paymentMonth" />
                        </div>
                    </template>
                    <DxColumn cell-template="button-add" />
                    <template #button-add>
                        <DxButton class="ml-3" icon="plus" />
                    </template>
                    <DxMasterDetail :enabled="true" template="row-detail" />
                    <template #row-detail="{ data }">
                        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataCustomRes"
                            :show-borders="true" :column-auto-width="true" :show-column-headers="false">
                            <DxColumn cell-template="col-first" data-type="string" />
                            <template #col-first="{ data }">
                                <b>{{ data.data.name }}</b><br>
                            </template>
                            <DxColumn width="100px" cell-template="month-1" />
                            <template #month-1="{ data }">
                                <div v-if="(data.data.month1)">{{ data.data.month1.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-2" />
                            <template #month-2="{ data }">
                                <div v-if="(data.data.month2)">{{ data.data.month2.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-3" />
                            <template #month-3="{ data }">
                                <div v-if="(data.data.month3)">{{ data.data.month3.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-4" />
                            <template #month-4="{ data }">
                                <div v-if="(data.data.month4)">{{ data.data.month4.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-5" />
                            <template #month-5="{ data }">
                                <div v-if="(data.data.month5)">{{ data.data.month5.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-6" />
                            <template #month-6="{ data }">
                                <div v-if="(data.data.month6)">{{ data.data.month6.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-7" />
                            <template #month-7="{ data }">
                                <div v-if="(data.data.month7)">{{ data.data.month7.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-8" />
                            <template #month-8="{ data }">
                                <div v-if="(data.data.month8)">{{ data.data.month8.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-9" />
                            <template #month-9="{ data }">
                                <div v-if="(data.data.month9)">{{ data.data.month9.value }}</div>
                            </template>
                            <DxColumn width="100px" cell-template="month-10" />
                            <template #month-10="{ data }">
                                <div v-if="data.data.month10">{{ data.data.month10.value }}</div>
                            </template>
                            <DxColumnHeaderFilter width="100px" cell-template="month-11" />
                            <template #month-11="{ data }">
                                <div v-if="(data.data.month11)">{{ data.data.month11.value }}
                                </div>
                            </template>
                            <DxColumn width="100px" cell-template="month-12" />
                            <template #month-12="{ data }">
                                <div v-if="(data.data.month12)">{{ data.data.month12.value }}
                                </div>
                            </template>

                        </DxDataGrid>
                    </template>
                </DxDataGrid>
            </a-spin>
        </a-row>
        <a-row style="border: 1px solid #d7d7d7; padding: 10px; margin-top: 10px; justify-content: space-between;">
            <a-col>
                <DxButton :text="'귀' + imputedYear + '-' + imputedMonth"
                    :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
                <DxButton :text="'지' + imputedYear + '-' + imputedMonth"
                    :style="{ color: 'white', backgroundColor: 'black' }" :height="'33px'" />
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
                        <div style="text-align: center;"><img :src="'../../../../../src/assets/images/' + data.img"
                                alt="" style="width: 25px; height: 25px;" /></div>
                    </template>
                </DxDropDownButton>
                <DxDropDownButton class="ml-3" :items="arrDropDownSalaryStatement" text="급여명세서"
                    @item-click="onItemClick" item-template="item-field">
                    <template #item-field="{ data }">
                        <div style="text-align: center;"><img :src="'../../../../../src/assets/images/' + data.img"
                                alt="" style="width: 25px; height: 25px;" /></div>
                    </template>
                </DxDropDownButton>
                <DxDropDownButton class="ml-3" :items="arrDropDown" text="선택" style="width: 120px;"
                    @item-click="onItemClick" item-template="item-field">
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
            <a-col :span="14" class="custom-layout">
                <a-spin :spinning="loading" size="large">
                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataTaxPayInfo"
                        :show-borders="true" :allow-column-reordering="move_column" :focused-row-enabled="true"
                        :allow-column-resizing="colomn_resize" :column-auto-width="true" key-expr="employeeId"
                        :onRowClick="actionEditTaxPay" @selection-changed="selectionChanged">
                        <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
                        <DxColumn width="200" caption="일용직사원" cell-template="tag" />
                        <template #tag="{ data }" class="custom-action">
                            <div class="custom-action">
                                <employee-info :idEmployee="data.data.employee.employeeId"
                                    :name="data.data.employee.name" :idCardNumber="data.data.employee.residentId"
                                    :status="data.data.employee.status" :foreigner="data.data.employee.foreigner"
                                    :checkStatus="false" />
                            </div>
                        </template>
                        <DxColumn caption="근무일수" data-field="workingDays" />
                        <DxColumn caption="일급여" data-field="dailyWage" />
                        <DxColumn caption="공제" data-field="totalDeduction" />
                        <DxColumn caption="차인지급액" data-field="actualPayment" />
                        <DxColumn width="250" caption="비고" cell-template="four-major-insurance" />
                        <template #four-major-insurance="{ data }" class="custom-action">
                            <div class="custom-action">
                                <four-major-insurance v-if="data.data.employee.nationalPensionDeduction" :typeTag="1"
                                    :typeValue="1" />
                                <four-major-insurance v-if="data.data.employee.healthInsuranceDeduction" :typeTag="2"
                                    :typeValue="1" />
                                <four-major-insurance v-if="data.data.employee.employeementInsuranceDeduction"
                                    :typeTag="4" :typeValue="1" />
                                <four-major-insurance v-if="data.data.employee.nationalPensionSupportPercent"
                                    :typeTag="6" :ratio="data.data.employee.nationalPensionSupportPercent" />
                                <four-major-insurance v-if="data.data.employee.employeementInsuranceSupportPercent"
                                    :typeTag="7" :ratio="data.data.employee.employeementInsuranceSupportPercent" />
                                <four-major-insurance v-if="data.data.employee.employeementReductionRatePercent"
                                    :typeTag="8" :ratio="data.data.employee.employeementReductionRatePercent" />
                                <four-major-insurance v-if="data.data.employee.incomeTaxMagnification" :typeTag="10"
                                    :ratio="data.data.employee.incomeTaxMagnification" />
                            </div>
                        </template>
                        <DxColumn caption="지급일" data-field="paymentDay" />
                        <DxSummary>
                            <!-- <DxTotalItem show-in-column="일용직사원" :customize-text="dataTaxPayInfo.length" /> -->
                            <DxTotalItem column="totalDeduction" summary-type="sum" />
                            <DxTotalItem column="actualPayment" summary-type="sum" />
                        </DxSummary>
                    </DxDataGrid>
                </a-spin>
            </a-col>
            <a-col :span="10" class="custom-layout" style="padding-right: 0px;">
                <standard-form action="" name="add-page-210" style="border: 1px solid #d7d7d7; padding: 10px;">
                    <a-row>
                        <a-col :span="12">
                            <a-form-item label="근무일수">
                                <EmploySelect :arrayValue="arrayEmploySelect"
                                    v-model:valueEmploy="dataIncomeWageDaily.employee.employeeId" width="316px"
                                    :required="true" />
                            </a-form-item>
                            <a-form-item label="지급일">
                                <!-- <EmploySelect :arrayValue="arrayEmploySelect" v-model:valueEmploy="formIncomeWageDaily.input.employeeId"
                                    width="200px" :required="true" /> -->
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <div class="top-content">
                                <a-typography-title :level="5" style="margin-bottom: 0;">요약</a-typography-title>
                            </div>
                            <a-form-item label="근무일수">
                                <text-number-box :disabled="true"
                                    v-model:valueInput="dataIncomeWageDaily.employee.workingDays" width="200px"
                                    :required="true" />
                            </a-form-item>
                            <a-form-item label="월급여">
                                <text-number-box :disabled="true"
                                    v-model:valueInput="dataIncomeWageDaily.employee.monthlyWage" width="200px"
                                    :required="true" />
                            </a-form-item>
                            <a-form-item label="공제합계">
                                <text-number-box :disabled="true"
                                    v-model:valueInput="dataIncomeWageDaily.employee.totalDeduction" width="200px"
                                    :required="true" />
                            </a-form-item>
                            <a-form-item label="차인지급액">
                                <text-number-box :disabled="true" v-model:valueInput="dataIncomeWageDaily.actualPayment"
                                    width="200px" :required="true" />
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
                                    <switch-basic v-model:valueSwitch="dataIncomeWageDaily.employee.monthlyPaycheck"
                                        :textCheck="'일급'" :textUnCheck="'월급'" />
                                    <number-box-money v-if="dataIncomeWageDaily.employee.monthlyPaycheck" width="150px"
                                        :required="true" placeholder='월급여' :spinButtons="false"
                                        v-model:valueInput="dataIncomeWageDaily.monthlyWage" />
                                    <number-box-money v-else width="150px" :required="true" placeholder='일급여'
                                        :spinButtons="false" v-model:valueInput="dataIncomeWageDaily.dailyWage" />
                                </div>
                                <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                                <span v-if="dataIncomeWageDaily.employee.monthlyPaycheck">월급 선택시, 일급 = 월급 / 근무일수</span>
                                <span v-else>일급 선택시, 월급 = 일급 x 근무일수</span>
                            </a-form-item>
                            <a-form-item label="근무일수">
                                <text-number-box width="150px" :required="true"
                                    v-model:valueInput="dataIncomeWageDaily.workingDays" :min="1" :max="30"
                                    :spinButtons="true"></text-number-box>
                            </a-form-item>
                            <span v-if="dataIncomeWageDaily.employee.monthlyPaycheck">일급여 {{
                                    dataIncomeWageDaily.monthlyWage / dataIncomeWageDaily.workingDays
                            }}원</span>
                            <span v-else>일급여 {{ dataIncomeWageDaily.dailyWage }}원</span>
                            <br>
                            <span v-if="dataIncomeWageDaily.employee.monthlyPaycheck">일급여 {{
                                    dataIncomeWageDaily.monthlyWage
                            }}원</span>
                            <span v-else>일급여 {{ dataIncomeWageDaily.dailyWage * dataIncomeWageDaily.workingDays
                            }}원</span>
                        </a-col>
                        <a-col :span="12" style="padding-leftt: 5px;">
                            <div class="top-content">
                                <a-typography-title :level="5" style="margin-bottom: 0;">월급여 {{ price
                                }}원</a-typography-title>
                            </div>
                            <a-spin :spinning="loading" size="large">
                                <div class="deduction-main">
                                    <div v-for="(item, index) in arrDeduction" :key="index" class="custom-deduction">
                                        <span>
                                            <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2"
                                                :name="item.name" :type="1" subName="과세" />
                                            <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2"
                                                :name="item.name" :type="2" subName="상여(과세)" />
                                            <deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
                                                :name="item.name" :type="3"
                                                :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + item.taxFreeIncludeSubmission" />
                                            <deduction-items
                                                v-if="item.taxPayItemCode == null && item.taxfreePayItemCode == null"
                                                :name="item.name" :type="4" subName="과세" />
                                        </span>
                                        <div>
                                            <number-box-money min="0" width="150px" :spinButtons="false"
                                                v-model:valueInput="item.price" :disabled="true" />
                                            <span class="pl-5">원</span>
                                        </div>
                                    </div>
                                </div>
                            </a-spin>
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
        <PrintPayrollRegisterPopup :modalStatus="modalPrintPayrollRegister"
            @closePopup="modalPrintPayrollRegister = false" :data="popupDataPayrollRegister" />
        <PrintSalaryStatementPopup :modalStatus="modalPrintSalaryStatement"
            @closePopup="modalPrintSalaryStatement = false" :data="popupDataSalaryStatement" />
        <EmailMultiPopup :modalStatus="modalEmailMulti" @closePopup="modalEmailMulti = false"
            :data="popupDataEmailMulti" />
        <EmailSinglePayrollRegisterPopup :modalStatus="modalEmailSinglePayrollRegister"
            @closePopup="modalEmailSinglePayrollRegister = false" :data="popupDataEmailSinglePayrollRegister" />
        <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="modalEmailSingle = false"
            :data="popupDataEmailSingle" />
        <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
            title="변경이력" typeHistory="pa-510" />
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
import { companyId } from "../../../../helpers/commonFunction"
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxSummary, DxTotalItem, DxMasterDetail } from "devextreme-vue/data-grid"
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue"
import notification from "../../../../utils/notification"
import PrintPayrollRegisterPopup from "./components/Popup/PrintPayrollRegisterPopup.vue"
import queries from "../../../../graphql/queries/PA/PA5/PA510/index"
import mutations from "../../../../graphql/mutations/PA/PA5/PA510/index"
import { Message } from "../../../../configs/enum"
import { sampleDataIncomeWageDaily, sampleFormIncomeWageDaily } from "./utils/index"
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
        const triggerIncomeWageDaily = ref<boolean>(false)
        const triggerTaxPayInfo = ref<boolean>(true)

        let dataCustomRes: any = ref([])
        const dataIncomeWageDaily: any = ref({ ...sampleDataIncomeWageDaily })
        const dataSource: any = ref([])
        const dataTaxPayInfo: any = ref([])
        const formIncomeWageDaily = reactive({ ...sampleFormIncomeWageDaily })

        const modalEmailSingle = ref(false)
        const modalEmailSinglePayrollRegister = ref(false)
        const modalEmailMulti = ref(false)

        const popupDataEmailSingle = ref({})
        const popupDataEmailSinglePayrollRegister = ref({})
        const popupDataEmailMulti = ref({})

        const arrDeduction: any = ref([])

        const imputedYear = ref('')
        const imputedMonth = ref('')

        const modalPrintPayrollRegister = ref<boolean>(false)
        const modalPrintSalaryStatement = ref<boolean>(false)
        const modalDeductions = ref<boolean>(false)
        const modalInsurance = ref<boolean>(false)
        const modalDelete = ref<boolean>(false)
        const modalEdit = ref<boolean>(false)
        const modalHistoryStatus = ref<boolean>(false)

        const arrayEmploySelect: any = ref([])
        const popupDataPayrollRegister = ref({})
        const popupDataSalaryStatement = ref({})
        const popupDataDelete = ref({})
        const popupDataEdit = ref({})
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear,
            // imputedMonth: dayjs().month(),
        })
        const originDataIncomeWageDaily = ref({
            companyId: companyId,
            processKey: {
                imputedYear: 2022,
                imputedMonth: 12,
                paymentYear: 2022,
                paymentMonth: 12,
            },
            incomeId: 1,
        })
        const originDataTaxPayInfo = ref({
            companyId: companyId,
            processKey: {
                imputedYear: 2022,
                imputedMonth: 12,
                paymentYear: 2022,
                paymentMonth: 12,
            },
        })
        let popupData = ref([])
        // ======================= GRAPQL ================================
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.getIncomeProcessWageDailies, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
        const {
            refetch: refetchDataIncomeWageDaily,
            result: resultIncomeWageDaily,
            loading: loadingIncomeWageDaily,
        } = useQuery(queries.getIncomeWageDaily, originDataIncomeWageDaily, () => ({
            enabled: triggerIncomeWageDaily.value,
            fetchPolicy: "no-cache",
        }))
        const {
            refetch: refetchDataTaxPayInfo,
            result: resultTaxPayInfo,
            loading: loadingTaxPayInfo,
        } = useQuery(queries.getIncomeWageDailies, originDataTaxPayInfo, () => ({
            enabled: triggerTaxPayInfo.value,
            fetchPolicy: "no-cache",
        }))
        const {
            loading: loadingDeductionItem,
            onResult: resWithholdingConfigPayItems,
        } = useQuery(queries.getWithholdingConfigDeductionItems, originData, () => ({
            fetchPolicy: "no-cache",
        }))
        resWithholdingConfigPayItems(res => {
            // arrDeduction.value = []
            res.data.getWithholdingConfigDeductionItems.map((val: any) => {
                let price = funcCheckPrice(val.itemCode)
                arrDeduction.value.push({
                    ...val,
                    price: price
                })
            })
        })
        const funcCheckPrice = (id: any) => {
            let price = 0
            dataIncomeWageDaily.value.deductionItems.map((e: any) => {
                if (e.itemCode == id)
                    price = e.amount
            })
            return price
        }
        // ======================= WATCH ==================================
        watch(result, (value) => {
            if (value) {
                let respon = value.getIncomeProcessWageDailies

                imputedYear.value = respon[0].imputedYear
                imputedMonth.value = respon[0].imputedMonth
                dataSource.value = [{
                    companyId: respon[0].companyId,
                    imputedYear: respon[0].imputedYear,
                }]

                dataCustomRes.value = [
                    {
                        id: 1,
                        name: "인원",
                    },
                    {
                        id: 2,
                        name: "지급액",
                    },
                    {
                        id: 3,
                        name: "소득세",

                    },
                    {
                        id: 4,
                        name: "지방소득세",

                    },
                    {
                        id: 5,
                        name: "공제총액",

                    },
                    {
                        id: 6,
                        name: "차인지급액",
                    },
                ]
                respon.forEach((val: any, index: any) => {
                    let dataAdd = {
                        imputedMonth: val.imputedMonth,
                        paymentYear: val.paymentYear,
                        paymentMonth: val.paymentMonth,
                    }
                    if (!dataSource.value[0]['month' + val.imputedMonth]) {
                        dataSource.value[0]['month' + val.imputedMonth] = []
                    }
                    dataSource.value[0]['month' + val.imputedMonth][index] = val

                    // data table detail
                    dataCustomRes.value[0]['month' + val.imputedMonth] =
                    {
                        value: (val.employeeStat.employeeCount + val.employeeStat.retireEmployeeCount).toLocaleString('en-US', { currency: 'VND' }),
                        ...dataAdd
                    }
                    dataCustomRes.value[1]['month' + val.imputedMonth] =
                    {
                        value: val.incomeStat.incomePayment.toLocaleString('en-US', { currency: 'VND' }),
                        ...dataAdd
                    }
                    dataCustomRes.value[2]['month' + val.imputedMonth] = {
                        value: val.incomeStat.withholdingIncomeTax.toLocaleString('en-US', { currency: 'VND' }),
                        ...dataAdd
                    }
                    dataCustomRes.value[3]['month' + val.imputedMonth] = {
                        value: val.incomeStat.withholdingLocalIncomeTax.toLocaleString('en-US', { currency: 'VND' }),
                        ...dataAdd
                    }
                    dataCustomRes.value[4]['month' + val.imputedMonth] = {
                        value: val.incomeStat.totalDeduction.toLocaleString('en-US', { currency: 'VND' }),
                        ...dataAdd
                    }
                    dataCustomRes.value[5]['month' + val.imputedMonth] = {
                        value: val.incomeStat.actualPayment.toLocaleString('en-US', { currency: 'VND' }),
                        ...dataAdd
                    }
                })
                console.log(dataCustomRes.value);
                trigger.value = false
            }

        })
        watch(resultIncomeWageDaily, (value) => {

            dataIncomeWageDaily.value = value.getIncomeWageDaily
        })
        watch(resultTaxPayInfo, (value) => {
            dataTaxPayInfo.value = value.getIncomeWageDailies
            dataTaxPayInfo.value.map((value: any) => {
                arrayEmploySelect.value.push({
                        employeeId: value.employee.employeeId,
                        name: value.employee.name,
                        idCardNumber: value.employee.idCardNumber,
                        status: value.employee.status,
                        foreigner: value.employee.foreigner
                    }
                )
            })
        })
        const deleteItem = (value: any) => {
            modalDelete.value = true;
            popupDataDelete.value = value
        };
        const editItem = (value: any) => {
            modalEdit.value = true;
            popupDataEdit.value = value
        };
        // ======================= FUNCTION ================================
        const onSubmit = (e: any) => {
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

        const actionEditTaxPay = (data: any) => {
            dataIncomeWageDaily.value = data.data
            console.log(dataIncomeWageDaily.value);
        }

        const selectionChanged = (data: any) => {

        }
        const showDetailSelected = (data: any) => {
            console.log(data);
            // dataTaxPayInfo.value = data
        }





        return {
            price,
            loading,
            dataSource,
            per_page, move_column, colomn_resize,
            refetchData,
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
            formIncomeWageDaily,
            dataIncomeWageDaily,
            showDetailSelected,
            dataTaxPayInfo,
            actionEditTaxPay,
            arrDeduction,
        }

    },
})
</script> 
<style lang="scss" scoped src="./style/style.scss" >

</style>
