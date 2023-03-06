<template>
    <div>
        <action-header title="기타소득자등록" :buttonSave="false" :buttonDelete="false" :buttonSearch="false"
            :buttonPrint="false" />
        <div id="pa-110" class="page-content">
            <a-row :class="{'ele-opacity':(store.state.common.statusChangeFormEdit&&!store.state.common.actionAddItem) || (store.state.common.statusChangeFormAdd&&store.state.common.actionAddItem)}">
                <a-spin :spinning="loadingIncomeProcessWages" size="large">
                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                        key-expr="companyId" :show-borders="true"
                        :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                        :column-auto-width="true">
                        <DxScrolling mode="standard" show-scrollbar="always" />
                        <DxColumn :caption="globalYear + '귀속월'" cell-template="imputed-year" />
                        <template #imputed-year="{}">
                            <span>지급연월</span>
                        </template>
                        <DxColumn width="100px" caption="01" cell-template="imputed-month1" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 1 &&'column-focus'"/>
                        <template #imputed-month1="{ data }">
                            <div v-if="data.data.month1">
                                <colorful-badge class="hover-underlined" :value="data.data.month1.status"
                                    :isUnder="store.state.common.processKeyPA110.imputedMonth == 1"
                                    @click="showDetailSelected(data.data.month1)" :year="data.data.month1.paymentYear"
                                    :month="data.data.month1.paymentMonth" />
                            </div>
                            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(1)">[+]</div>
                        </template>
                        <DxColumn width="100px" caption="02" cell-template="imputed-month2" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 2 &&'column-focus'"/>
                        <template #imputed-month2="{ data }">
                            <div v-if="data.data.month2">
                                <colorful-badge class="hover-underlined" :value="data.data.month2.status"
                                    :isUnder="store.state.common.processKeyPA110.imputedMonth == 2"
                                    @click="showDetailSelected(data.data.month2)" :year="data.data.month2.paymentYear"
                                    :month="data.data.month2.paymentMonth" />
                            </div>
                            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(2)">[+]</div>
                        </template>
                        <DxColumn width="100px" caption="03" cell-template="imputed-month3" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 3 &&'column-focus'"/>
                        <template #imputed-month3="{ data }">
                            <div v-if="data.data.month3">
                                <colorful-badge class="hover-underlined" :value="data.data.month3.status"
                                    :isUnder="store.state.common.processKeyPA110.imputedMonth == 3"
                                    @click="showDetailSelected(data.data.month3)" :year="data.data.month3.paymentYear"
                                    :month="data.data.month3.paymentMonth" />
                            </div>
                            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(3)">[+]</div>
                        </template>
                        <DxColumn width="100px" caption="04" cell-template="imputed-month4" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 4 &&'column-focus'"/>
                        <template #imputed-month4="{ data }">
                            <div v-if="data.data.month4">
                                <colorful-badge class="hover-underlined" :value="data.data.month4.status"
                                    :isUnder="store.state.common.processKeyPA110.imputedMonth == 4"
                                    @click="showDetailSelected(data.data.month4)" :year="data.data.month4.paymentYear"
                                    :month="data.data.month4.paymentMonth" />
                            </div>
                            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(4)">[+]</div>
                        </template>
                        <DxColumn width="100px" caption="05" cell-template="imputed-month5" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 5 &&'column-focus'"/>
                        <template #imputed-month5="{ data }">
                            <div v-if="data.data.month5">
                                <colorful-badge class="hover-underlined" :value="data.data.month5.status"
                                    :isUnder="store.state.common.processKeyPA110.imputedMonth == 5"
                                    @click="showDetailSelected(data.data.month5)" :year="data.data.month5.paymentYear"
                                    :month="data.data.month5.paymentMonth" />
                            </div>
                            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(5)">[+]</div>
                        </template>
                        <DxColumn width="100px" caption="06" cell-template="imputed-month6" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 6 &&'column-focus'"/>
                        <template #imputed-month6="{ data }">
                            <div v-if="data.data.month6">
                                <colorful-badge class="hover-underlined" :value="data.data.month6.status"
                                    :isUnder="store.state.common.processKeyPA110.imputedMonth == 6"
                                    @click="showDetailSelected(data.data.month6)" :year="data.data.month6.paymentYear"
                                    :month="data.data.month6.paymentMonth" />
                            </div>
                            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(6)">[+]</div>
                        </template>
                        <DxColumn width="100px" caption="07" cell-template="imputed-month7" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 7 &&'column-focus'"/>
                        <template #imputed-month7="{ data }">
                            <div v-if="data.data.month7">
                                <colorful-badge class="hover-underlined" :value="data.data.month7.status"
                                    :isUnder="store.state.common.processKeyPA110.imputedMonth == 7"
                                    @click="showDetailSelected(data.data.month7)" :year="data.data.month7.paymentYear"
                                    :month="data.data.month7.paymentMonth" />
                            </div>
                            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(7)">[+]</div>
                        </template>
                        <DxColumn width="100px" caption="08" cell-template="imputed-month8" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 8 &&'column-focus'"/>
                        <template #imputed-month8="{ data }">
                            <div v-if="data.data.month8">
                                <colorful-badge class="hover-underlined" :value="data.data.month8.status"
                                    :isUnder="store.state.common.processKeyPA110.imputedMonth == 8"
                                    @click="showDetailSelected(data.data.month8)" :year="data.data.month8.paymentYear"
                                    :month="data.data.month8.paymentMonth" />
                            </div>
                            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(8)">[+]</div>
                        </template>
                        <DxColumn width="100px" caption="09" cell-template="imputed-month9" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 9 &&'column-focus'"/>
                        <template #imputed-month9="{ data }">
                            <div v-if="data.data.month9">
                                <colorful-badge class="hover-underlined" :value="data.data.month9.status"
                                    :isUnder="store.state.common.processKeyPA110.imputedMonth == 9"
                                    @click="showDetailSelected(data.data.month9)" :year="data.data.month9.paymentYear"
                                    :month="data.data.month9.paymentMonth" />
                            </div>
                            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(9)">[+]</div>
                        </template>
                        <DxColumn width="100px" caption="10" cell-template="imputed-month10" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 10 &&'column-focus'"/>
                        <template #imputed-month10="{ data }">
                            <div v-if="data.data.month10">
                                <colorful-badge class="hover-underlined" :value="data.data.month10.status"
                                    :isUnder="store.state.common.processKeyPA110.imputedMonth == 10"
                                    @click="showDetailSelected(data.data.month10)" :year="data.data.month10.paymentYear"
                                    :month="data.data.month10.paymentMonth" />
                            </div>
                            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(10)">[+]</div>
                        </template>
                        <DxColumn width="100px" caption="11" cell-template="imputed-month11" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 11 &&'column-focus'"/>
                        <template #imputed-month11="{ data }">
                            <div v-if="data.data.month11">
                                <colorful-badge class="hover-underlined" :value="data.data.month11.status"
                                    :isUnder="store.state.common.processKeyPA110.imputedMonth == 11"
                                    @click="showDetailSelected(data.data.month11)" :year="data.data.month11.paymentYear"
                                    :month="data.data.month11.paymentMonth" />
                            </div>
                            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(11)">[+]</div>
                        </template>
                        <DxColumn width="100px" caption="12" cell-template="imputed-month12" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 12 &&'column-focus'"/>
                        <template #imputed-month12="{ data }">
                            <div v-if="data.data.month12">
                                <colorful-badge class="hover-underlined" :value="data.data.month12.status"
                                    :isUnder="store.state.common.processKeyPA110.imputedMonth == 12"
                                    @click="showDetailSelected(data.data.month12)" :year="data.data.month12.paymentYear"
                                    :month="data.data.month12.paymentMonth" />
                            </div>
                            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(12)">[+]</div>
                        </template>
                        <DxMasterDetail class="table-detail" :enabled="true" template="row-detail" />
                        <template #row-detail="{}">
                            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataCustomRes"
                                :show-borders="true" :column-auto-width="true" :show-column-headers="false">
                                <DxColumn cell-template="col-first" data-type="string" />
                                <template #col-first="{ data }">
                                    <b>{{ data.data.name }}</b><br>
                                </template>
                                <DxColumn width="100px" cell-template="month-1" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 1 &&'column-focus'"/>
                                <template #month-1="{ data }">
                                    <div class="custom-detail" v-if="(data.data.month1)">{{ data.data.month1.value }}</div>
                                </template>
                                <DxColumn width="100px" cell-template="month-2" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 2 &&'column-focus'"/>
                                <template #month-2="{ data }">
                                    <div class="custom-detail" v-if="(data.data.month2)">{{ data.data.month2.value }}</div>
                                </template>
                                <DxColumn width="100px" cell-template="month-3" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 3 &&'column-focus'"/>
                                <template #month-3="{ data }">
                                    <div class="custom-detail" v-if="(data.data.month3)">{{ data.data.month3.value }}</div>
                                </template>
                                <DxColumn width="100px" cell-template="month-4" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 4 &&'column-focus'"/>
                                <template #month-4="{ data }">
                                    <div class="custom-detail" v-if="(data.data.month4)">{{ data.data.month4.value }}</div>
                                </template>
                                <DxColumn width="100px" cell-template="month-5" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 5 &&'column-focus'"/>
                                <template #month-5="{ data }">
                                    <div class="custom-detail" v-if="(data.data.month5)">{{ data.data.month5.value }}</div>
                                </template>
                                <DxColumn width="100px" cell-template="month-6" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 6 &&'column-focus'"/>
                                <template #month-6="{ data }">
                                    <div class="custom-detail" v-if="(data.data.month6)">{{ data.data.month6.value }}</div>
                                </template>
                                <DxColumn width="100px" cell-template="month-7" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 7 &&'column-focus'"/>
                                <template #month-7="{ data }">
                                    <div class="custom-detail" v-if="(data.data.month7)">{{ data.data.month7.value }}</div>
                                </template>
                                <DxColumn width="100px" cell-template="month-8" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 8 &&'column-focus'"/>
                                <template #month-8="{ data }">
                                    <div class="custom-detail" v-if="(data.data.month8)">{{ data.data.month8.value }}</div>
                                </template>
                                <DxColumn width="100px" cell-template="month-9" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 9 &&'column-focus'"/>
                                <template #month-9="{ data }">
                                    <div class="custom-detail" v-if="(data.data.month9)">{{ data.data.month9.value }}</div>
                                </template>
                                <DxColumn width="100px" cell-template="month-10" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 10 &&'column-focus'"/>
                                <template #month-10="{ data }">
                                    <div class="custom-detail" v-if="data.data.month10">{{ data.data.month10.value }}</div>
                                </template>
                                <DxColumn width="100px" cell-template="month-11" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 11 &&'column-focus'"/>
                                <template #month-11="{ data }">
                                    <div class="custom-detail" v-if="(data.data.month11)">{{ data.data.month11.value }}
                                    </div>
                                </template>
                                <DxColumn width="100px" cell-template="month-12" :cssClass=" store.state.common.processKeyPA110.imputedMonth == 12 &&'column-focus'"/>
                                <template #month-12="{ data }">
                                    <div class="custom-detail" v-if="(data.data.month12)">{{ data.data.month12.value }}
                                    </div>
                                </template>

                            </DxDataGrid>
                        </template>
                    </DxDataGrid>
                </a-spin>
            </a-row>
            <a-row :class="{
            'disabledBlock': statusDisabledBlock,
            'ele-opacity':(store.state.common.statusChangeFormEdit&&!store.state.common.actionAddItem) || (store.state.common.statusChangeFormAdd&&store.state.common.actionAddItem)}"
                style="border: 1px solid #d7d7d7; padding: 10px; margin-top: 10px;" justify="space-between">
                <a-col>
                    <div v-if="!statusDisabledBlock">
                        <DxButton
                            :text="'귀 ' + processKey.imputedYear + '-' + $filters.formatMonth(processKey.imputedMonth)"
                            :style="{ color: 'white', backgroundColor: 'gray' }" :height="$config_styles.HeightInput" />
                        <DxButton
                            :text="'지 ' + processKey.paymentYear + '-' + $filters.formatMonth(processKey.paymentMonth)"
                            :style="{ color: 'white', backgroundColor: 'black' }" :height="$config_styles.HeightInput" />
                        <ProcessStatus v-model:valueStatus="status" @checkConfirm="statusComfirm"
                            :disabled="status == 30 || status == 40" />
                    </div>
                    <div v-else>
                        <DxButton text='귀' :style="{ color: 'white', backgroundColor: 'gray' }" :height="$config_styles.HeightInput" />
                        <DxButton text='지' :style="{ color: 'white', backgroundColor: 'black' }" :height="$config_styles.HeightInput" />
                    </div>
                </a-col>
                <a-col>
                    <div style="float: right;display: flex;">
                        <SelectActionComponent :dataRows="dataRows" />
                    </div>
                </a-col>
            </a-row>
            <a-row :class="{'disabledBlock': statusDisabledBlock}">
                <a-col :span="12" class="custom-layout" :class="{'ele-opacity':(store.state.common.statusChangeFormEdit&&!store.state.common.actionAddItem) || (store.state.common.statusChangeFormAdd&&store.state.common.actionAddItem)}">
                    <a-spin :spinning="loadingTaxPayInfo" size="large">
                        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true"
                            :data-source="store.state.common.dataTaxPayInfo" :show-borders="true"
                            :allow-column-reordering="move_column" :focused-row-enabled="true"
                            :allow-column-resizing="colomn_resize" :column-auto-width="true"
                            key-expr="incomeId" id="pa-110-gridContainer" :onRowClick="actionEditTaxPay"
                            @focused-row-changing="onFocusedRowChanging"
                            @selection-changed="selectionChanged" :selection-filter="store.state.common.selectionFilter"
                            v-model:focused-row-key="store.state.common.focusedRowKey">
                            <DxScrolling mode="standard" show-scrollbar="always" />
                            <DxSelection :deferred="true" select-all-mode="allPages" show-check-boxes-mode="onClick" mode="multiple"
                                width="40" />
                            <DxColumn alignment="left" width="200" caption="사원" cell-template="tag" />
                            <template #tag="{ data }">
                                <div class="custom-action">
                                    <employee-info :idEmployee="data.data.employee.employeeId" :idCardNumber="data.data.employee.residentId"
                                        :name="data.data.employee.name" :status="data.data.employee.status"
                                        :foreigner="data.data.employee.foreigner" :checkStatus="false" />
                                </div>
                            </template>
                            <DxColumn alignment="left" width="75" caption="급여" data-field="totalPay"
                                format="fixedPoint" />
                            <DxColumn alignment="left" width="75" caption="공제" cell-template="total-deduction" data-field="totalDeduction"
                                format="fixedPoint" />
                            <template #total-deduction="{ data }">
                                <a-tooltip placement="top">
                                    <template #title>소득세 {{ $filters.formatCurrency(data.data.incomePayment) }} / 지방소득세
                                        {{ $filters.formatCurrency(data.data.withholdingLocalIncomeTax) }}
                                    </template>
                                    <span>
                                        {{ $filters.formatCurrency(data.data.totalDeduction) }}
                                    </span>
                                </a-tooltip>
                            </template>
                            <DxColumn alignment="left" width="120" caption="차인지급액" data-field="actualPayment"
                                format="fixedPoint" />
                            <DxColumn alignment="left" class="min-w-240" caption="비고"
                                cell-template="four-major-insurance" />
                            <template #four-major-insurance="{ data }">
                                <div class="custom-action">
                                    <four-major-insurance v-if="data.data.employee.nationalPensionDeduction"
                                        :typeTag="1" :typeValue="1" />
                                    <four-major-insurance v-if="data.data.employee.healthInsuranceDeduction"
                                        :typeTag="2" :typeValue="1" />
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
                            <DxColumn alignment="left" width="30" caption="지급일" data-field="paymentDay"
                                cell-template="paymentDay" />
                            <template #paymentDay="{ data }">
                                <div class="text-center">{{  $filters.formatMonth(data.data.paymentDay) }}</div>
                            </template>
                            <DxSummary>
                                <DxTotalItem column="사원" summary-type="count" display-format="사원수: {0}" />
                                <DxTotalItem column="totalPay" summary-type="sum" display-format="급여합계: {0}"
                                    value-format="#,###" />
                                <DxTotalItem column="totalDeduction" summary-type="sum" display-format="공제합계: {0}"
                                    value-format="#,###" />
                                <DxTotalItem column="actualPayment" summary-type="sum" display-format="차인지급액합계: {0}"
                                    value-format="#,###" />
                            </DxSummary>
                        </DxDataGrid>
                    </a-spin>
                </a-col>
                <a-col :span="12" class="custom-layout" style="padding-right: 0px;">
                    <FormDataComponent />
                </a-col>
                <PopupMessage :modalStatus="modalChangeRow" @closePopup="modalChangeRow = false" typeModal="confirm"
                :title="Message.getMessage('COMMON', '501').message" content="" :okText="Message.getMessage('COMMON', '501').yes" :cancelText="Message.getMessage('COMMON', '501').no"
                    @checkConfirm="statusComfirmChange" />
                <!-- <PopupMessage :modalStatus="modalChangeRowPrice" @closePopup="modalChangeRowPrice = false"
                    typeModal="confirm" :title="Message.getMessage('PA110', '001').message" content=""
                    :okText="Message.getMessage('PA110', '001').yes" :cancelText="Message.getMessage('PA110', '001').no"
                    @checkConfirm="statusComfirmChangePrice" /> -->
                <CopyMonth :modalStatus="modalCopy" :data="dataModalCopy" :arrDataPoint="arrDataPoint"
                    @closePopup="modalCopy = false" @dataAddIncomeProcess="dataAddIncomeProcess" />
            </a-row>
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from "vue"
import DxButton from "devextreme-vue/button"
import dayjs from 'dayjs';
import { useStore } from 'vuex'
import { useQuery, useMutation } from "@vue/apollo-composable"
import { companyId } from "@/helpers/commonFunction"
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxSummary, DxTotalItem, DxMasterDetail } from "devextreme-vue/data-grid"
import SelectActionComponent from "./components/SelectActionComponent.vue"
import FormDataComponent from "./components/FormDataComponent.vue"
import queries from "@/graphql/queries/PA/PA1/PA110/index"
import mutations from "@/graphql/mutations/PA/PA1/PA110/index"
import filters from "@/helpers/filters";
import notification from "@/utils/notification"
import ProcessStatus from "@/components/common/ProcessStatus.vue"
import CopyMonth from "./components/Popup/CopyMonth.vue";
import { initDataCustomRes } from "./utils/index"
import { userType } from "@/helpers/commonFunction";
import { Message } from '@/configs/enum';
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
        SelectActionComponent,
        ProcessStatus,
        FormDataComponent,
        CopyMonth,
    },
    setup() {
        const store = useStore()
        const globalYear = computed(() => store.state.settings.globalYear)
        const per_page = computed(() => store.state.settings.per_page)
        const move_column = computed(() => store.state.settings.move_column)
        const colomn_resize = computed(() => store.state.settings.colomn_resize)
        store.state.common.processKeyPA110 = {
            imputedYear: globalYear.value,
            imputedMonth: dayjs().month() + 1,
            paymentYear: globalYear.value,
            paymentMonth: dayjs().month() + 1,
        }
        const processKey = computed(() => store.state.common.processKeyPA110)
        const monthClicked = computed(() => store.state.common.processKeyPA110.imputedMonth);
        const dataSource = ref<any>([])
        const dataCustomRes: any = ref<any>([])
        const arrDataPoint = ref<any>([])
        const dataModalCopy = ref()
        const modalCopy = ref<boolean>(false);
        const modalChangeRow = ref(false)
        const dataRows = ref([])
        const actionSaveItem = ref<number>(0)
        const actionUpdateItem = ref<number>(0)
        let status = ref();
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
        })
        const originDataTaxPayInfo = ref({
            companyId: companyId,
            processKey: processKey.value,
        })
        // const modalChangeRowPrice = ref(false)
        const isRunOnce = ref<boolean>(true);
        const statusDisabledBlock = ref<boolean>(true);
        // call api getIncomeProcessWages for first table 
        const {
            refetch: refetchDataProcessIncomeWages,
            result: resIncomeProcessWages,
            loading: loadingIncomeProcessWages
        } = useQuery(queries.getIncomeProcessWages, originData, () => ({
            fetchPolicy: "no-cache",
        }))
        // get data table detail getIncomeProcessWages
        watch(resIncomeProcessWages, (value) => {
            arrDataPoint.value = [];
            if (value) {
                // set first row in table Income Process Wages
                dataSource.value = [{
                    companyId: companyId,
                }]
                dataCustomRes.value = JSON.parse(JSON.stringify(initDataCustomRes))
                value.getIncomeProcessWages.forEach((data: any) => {
                    // create data to copy
                    arrDataPoint.value.push({
                        imputedYear: data.imputedYear,
                        imputedMonth: data.imputedMonth,
                        paymentYear: data.paymentYear,
                        paymentMonth: data.paymentMonth,
                    })

                    let dataAdd = {
                        imputedYear: data.imputedYear,
                        imputedMonth: data.imputedMonth,
                        paymentYear: data.paymentYear,
                        paymentMonth: data.paymentMonth,
                    }
                    if (JSON.stringify(dataAdd) == JSON.stringify(processKey.value)) {
                        status.value = data.status
                    }
                    dataSource.value[0]['month' + data.imputedMonth] = data
                    // data table detail
                    dataCustomRes.value[0]['month' + data.imputedMonth] = {
                        value: `${filters.formatCurrency(data.employeeStat?.employeeCount)}(${filters.formatCurrency(data.employeeStat?.retireEmployeeCount)})`,
                        ...dataAdd
                    }
                    dataCustomRes.value[1]['month' + data.imputedMonth] = {
                        value: filters.formatCurrency(data.incomeStat?.totalTaxPay),
                        ...dataAdd
                    }
                    dataCustomRes.value[2]['month' + data.imputedMonth] = {
                        value: filters.formatCurrency(data.incomeStat?.totalTaxfreePay),
                        ...dataAdd
                    }
                    dataCustomRes.value[3]['month' + data.imputedMonth] = {
                        value: filters.formatCurrency(data.incomeStat?.totalPay),
                        ...dataAdd
                    }
                    dataCustomRes.value[4]['month' + data.imputedMonth] = {
                        value: filters.formatCurrency(data.incomeStat?.totalNationalPensionDeduction),
                        ...dataAdd
                    }
                    dataCustomRes.value[5]['month' + data.imputedMonth] = {
                        value: filters.formatCurrency(data.incomeStat?.totalHealthDeduction),
                        ...dataAdd
                    }
                    dataCustomRes.value[6]['month' + data.imputedMonth] = {
                        value: filters.formatCurrency(data.incomeStat?.totalLongtermCareDeduction),
                        ...dataAdd
                    }
                    dataCustomRes.value[7]['month' + data.imputedMonth] = {
                        value: filters.formatCurrency(data.incomeStat?.totalEmploymentDeduction),
                        ...dataAdd
                    }
                    dataCustomRes.value[8]['month' + data.imputedMonth] = {
                        value: filters.formatCurrency(data.incomeStat?.withholdingIncomeTax),
                        ...dataAdd
                    }
                    dataCustomRes.value[9]['month' + data.imputedMonth] = {
                        value: filters.formatCurrency(data.incomeStat?.withholdingLocalIncomeTax),
                        ...dataAdd
                    }
                    dataCustomRes.value[10]['month' + data.imputedMonth] = {
                        value: filters.formatCurrency(data.incomeStat?.totalDeduction),
                        ...dataAdd
                    }
                    dataCustomRes.value[11]['month' + data.imputedMonth] = {
                        value: filters.formatCurrency(data.incomeStat?.actualPayment),
                        ...dataAdd
                    }
                });
            }
            const obj = dataSource.value[0]['month' + store.state.common.processKeyPA510.imputedMonth]
            if (obj) {
                statusDisabledBlock.value = false;
            } else {
                status.value = null
                statusDisabledBlock.value = true;
            }
            if (isRunOnce.value) {
                isRunOnce.value = false;
                if (obj) {
                    showDetailSelected(obj)
                }
            } else {
                activeNewMonth(dataMonthNew.value)
            }
        })

        // get getIncomeWages table
        const {
            refetch: refetchDataTaxPayInfo,
            result: resultTaxPayInfo,
            loading: loadingTaxPayInfo,
        } = useQuery(queries.getIncomeWages, originDataTaxPayInfo, () => ({
            fetchPolicy: "no-cache",
        }))
        watch(resultTaxPayInfo, (value) => {
            store.state.common.dataTaxPayInfo = value.getIncomeWages;
            // if (value.getIncomeWages[0] && !store.state.common.actionAddItem) { // if have data
            if (value.getIncomeWages[0]) { // if have data
                if (store.state.common.incomeId && value.getIncomeWages.find((element: any) => element.incomeId == store.state.common.incomeId ?? null)) {
                    store.state.common.focusedRowKey = store.state.common.incomeId
                    // store.state.common.incomeId = value.getIncomeWages.find((element: any) => element.employeeId == store.state.common.employeeId).incomeId
                } else {
                    store.state.common.focusedRowKey = value.getIncomeWages[0].incomeId
                    store.state.common.incomeId = value.getIncomeWages[0].incomeId
                    // store.state.common.employeeId = value.getIncomeWages[0].employeeId
                }
                store.state.common.actionAddItem = false
            } else {
                store.state.common.actionAddItem = true
                store.state.common.focusedRowKey = null;
                store.state.common.incomeId = null;
                // store.state.common.employeeId = null;
                store.state.common.actionResetForm++;
            }
            store.state.common.resetArrayEmploySelect++
        })
        watch(() => store.state.common.loadingTableInfo, (newVal) => {
            originData.value.imputedYear = globalYear.value
            originDataTaxPayInfo.value.processKey.imputedYear = globalYear.value
            refetchDataProcessIncomeWages() //reset data table 1
            refetchDataTaxPayInfo() //reset data table 2
        })

        watch(() => status.value, (newVal) => {
            if (userType != 'm' && (newVal == 20 || newVal == 30 || newVal == 40)) {
                store.state.common.statusDisabledStatus = true;
            } else {
                store.state.common.statusDisabledStatus = false;
            }
        })
        /**
         * action edit employ tax pay
         */
        // let rowEdit = ref()
        const actionEditTaxPay = (data: any) => {
            store.state.common.dataRowOnActive = data.data
            if (store.state.common.dataRowOnActive.employeeId) { // if row data (not row add)
                if (store.state.common.statusChangeFormEdit) {
                    // if (store.state.common.statusChangeFormPrice) {
                    //     modalChangeRowPrice.value = true;
                    // } else {
                        modalChangeRow.value = true;
                    // }
                } else {
                    if (!store.state.common.statusRowAdd && store.state.common.dataTaxPayInfo[store.state.common.dataTaxPayInfo.length - 1]?.employee.employeeId == null) {
                        store.state.common.dataTaxPayInfo = store.state.common.dataTaxPayInfo.splice(0, store.state.common.dataTaxPayInfo.length - 1)
                        store.state.common.statusRowAdd = true
                    }
                    store.state.common.incomeId = data.data.incomeId
                    // store.state.common.employeeId = data.data.employeeId
                }
                if (store.state.common.statusRowAdd) {
                    store.state.common.actionAddItem = false
                }
            }
        }
        const selectionChanged = (data: any) => {
            data.component.getSelectedRowsData().then((rowData: any) => {
                dataRows.value = rowData
                // if ( rowData.length > 1 ) {
                //     // store.state.common.incomeId = rowData[0].
                //     store.state.common.focusedRowKey = store.state.common.incomeId
                // }
            })
        }
        const dataMonthNew: any = ref()
        const checkClickMonth = ref<Boolean>(false)
        // A function that is called when a user clicks on a month.
        const showDetailSelected = (month: any) => {
            dataMonthNew.value = month
            if (store.state.common.statusChangeFormEdit || store.state.common.statusChangeFormEdit) {
                modalChangeRow.value = true
                checkClickMonth.value = true
            } else {
                activeNewMonth(month)
            }
        }
        // A function that is called when a user clicks on a button.
        const activeNewMonth = (month: any) => {
            status.value = month.status
            store.state.common.processKeyPA110.paymentYear = month.paymentYear
            store.state.common.processKeyPA110.paymentMonth = month.paymentMonth
            store.state.common.processKeyPA110.imputedMonth = month.imputedMonth
            store.state.common.processKeyPA110.imputedYear = globalYear.value;
            statusDisabledBlock.value = false;
            store.state.common.statusRowAdd = true;
        }
        /**
         * copy data from other month
         * @param month 
         */
        const copyMonth = (month: number) => {
            dataModalCopy.value = month;
            modalCopy.value = true;
        }

        /**
         * change income process wage status
         */
        const {
            mutate: actionChangeIncomeProcess,
            onError: errorChangeIncomeProcess,
            onDone: successChangeIncomeProcess,
        } = useMutation(mutations.changeIncomeProcessWageStatus)
        errorChangeIncomeProcess(e => {
            notification('error', e.message)
        })
        successChangeIncomeProcess(e => {
            notification('success', `업데이트 완료!`)
            originData.value.imputedYear = globalYear.value
            refetchDataProcessIncomeWages()
        })

        /**
         * change income process wage status
         */
        const statusComfirm = () => {
            actionChangeIncomeProcess({
                companyId: companyId,
                processKey: store.state.common.processKeyPA110,
                status: status.value
            })
        }

        const dataAddIncomeProcess = (data: any) => {
            dataSource.value[0]['month' + data.imputedMonth] = data
            dataSource.value[0]['month' + data.imputedMonth].status = 10
            status.value = 10
            statusDisabledBlock.value = false;
        }
        /**
         * underlined set of selected month
         * @param monthInputed 
         */
        const setUnderline = (monthInputed: any) => {
            return monthClicked.value == monthInputed;
        }
        const statusComfirmChange = (res: any) => {
            if (res) { // action save form
                // (document.getElementsByClassName("anticon-save")[0] as HTMLInputElement).click();
                store.state.common.actionSubmit++
            } else {
                if (checkClickMonth.value) {
                    activeNewMonth(dataMonthNew.value)
                    checkClickMonth.value = false;
                    return;
                }
                if (checkClickYear.value) {
                    store.state.common.processKeyPA110.imputedYear = globalYear.value
                    store.state.common.processKeyPA110.paymentYear = globalYear.value
                    originData.value.imputedYear = globalYear.value
                    originDataTaxPayInfo.value.processKey.imputedYear = globalYear.value
                    refetchDataProcessIncomeWages() //reset data table 1
                    refetchDataTaxPayInfo() //reset data table 2
                    checkClickYear.value = false;
                    return;
                }
                if (!store.state.common.statusRowAdd) {
                    store.state.common.actionAddItem = false
                    store.state.common.dataTaxPayInfo = store.state.common.dataTaxPayInfo.splice(0, store.state.common.dataTaxPayInfo.length - 1)
                    store.state.common.statusRowAdd = true
                }
                store.state.common.incomeId = store.state.common.dataRowOnActive.incomeId
            }
        }
        // Preventing the user from selecting a row by clicking on the select button.
        const onFocusedRowChanging = (e: any) => {
            if (!(e.event.currentTarget.outerHTML.search("dx-command-select") == -1)) {
                e.cancel = true;
            }
        };
        const checkClickYear = ref<Boolean>(false)
        watch(globalYear, (newVal) => {
            if (store.state.common.statusChangeFormEdit || store.state.common.statusChangeFormEdit) {
                modalChangeRow.value = true
                checkClickYear.value = true
            } else {
                store.state.common.processKeyPA110.imputedYear = newVal
                store.state.common.processKeyPA110.paymentYear = newVal
                originData.value.imputedYear = newVal
                originDataTaxPayInfo.value.processKey.imputedYear = newVal
                refetchDataProcessIncomeWages() //reset data table 1
                refetchDataTaxPayInfo() //reset data table 2
            }
        })
        return {
            globalYear,
            per_page,
            move_column,
            colomn_resize,
            processKey,
            store,
            dataSource,
            dataCustomRes,
            showDetailSelected,
            loadingIncomeProcessWages,
            copyMonth,
            loadingTaxPayInfo,
            dataModalCopy,
            modalCopy,
            actionEditTaxPay,
            selectionChanged,
            dataRows,
            statusComfirm,
            actionSaveItem,
            actionUpdateItem,
            arrDataPoint,
            dataAddIncomeProcess,
            status,
            setUnderline,
            modalChangeRow, statusComfirmChange,
            // modalChangeRowPrice, statusComfirmChangePrice,
            Message,
            statusDisabledBlock, onFocusedRowChanging,
        }

    },
})
</script> 
<style lang="scss" scoped src="./style/style.scss" >

</style>
