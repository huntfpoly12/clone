<template>
	<action-header title="기타소득자등록" :buttonSave="false" :buttonDelete="false" :buttonSearch="false" :buttonPrint="false" />
	<div id="pa-110" class="page-content mt-10">
		<a-row :class="{ 'ele-opacity': checkChangeForm }">
			<a-spin :spinning="loadingIncomeProcessWages" size="large">
				<DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
					key-expr="companyId" :show-borders="true" :allow-column-reordering="move_column"
					:allow-column-resizing="colomn_resize" :column-auto-width="true">
					<DxScrolling mode="standard" show-scrollbar="always" />
					<DxColumn :caption="paYear + '귀속월'" cell-template="imputed-year" />
					<template #imputed-year="{}">
						<span>지급연월</span>
					</template>
					<DxColumn width="100px" caption="01" cell-template="imputed-month1" :cssClass="classObject(1)" />
					<template #imputed-month1="{ data }">
						<div v-if="data.data.month1">
							<colorful-badge class="hover-underlined" :value="data.data.month1.status" :isUnder="processKey.imputedMonth == 1
								" @click="showDetailSelected(data.data.month1)" :year="data.data.month1.paymentYear"
								:month="data.data.month1.paymentMonth" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(1)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="02" cell-template="imputed-month2" :cssClass="classObject(2)" />
					<template #imputed-month2="{ data }">
						<div v-if="data.data.month2">
							<colorful-badge class="hover-underlined" :value="data.data.month2.status" :isUnder="processKey.imputedMonth == 2
								" @click="showDetailSelected(data.data.month2)" :year="data.data.month2.paymentYear"
								:month="data.data.month2.paymentMonth" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(2)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="03" cell-template="imputed-month3" :cssClass="classObject(3)" />
					<template #imputed-month3="{ data }">
						<div v-if="data.data.month3">
							<colorful-badge class="hover-underlined" :value="data.data.month3.status" :isUnder="processKey.imputedMonth == 3
								" @click="showDetailSelected(data.data.month3)" :year="data.data.month3.paymentYear"
								:month="data.data.month3.paymentMonth" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(3)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="04" cell-template="imputed-month4" :cssClass="classObject(4)" />
					<template #imputed-month4="{ data }">
						<div v-if="data.data.month4">
							<colorful-badge class="hover-underlined" :value="data.data.month4.status" :isUnder="processKey.imputedMonth == 4
								" @click="showDetailSelected(data.data.month4)" :year="data.data.month4.paymentYear"
								:month="data.data.month4.paymentMonth" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(4)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="05" cell-template="imputed-month5" :cssClass="classObject(5)" />
					<template #imputed-month5="{ data }">
						<div v-if="data.data.month5">
							<colorful-badge class="hover-underlined" :value="data.data.month5.status" :isUnder="processKey.imputedMonth == 5
								" @click="showDetailSelected(data.data.month5)" :year="data.data.month5.paymentYear"
								:month="data.data.month5.paymentMonth" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(5)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="06" cell-template="imputed-month6" :cssClass="classObject(6)" />
					<template #imputed-month6="{ data }">
						<div v-if="data.data.month6">
							<colorful-badge class="hover-underlined" :value="data.data.month6.status" :isUnder="processKey.imputedMonth == 6
								" @click="showDetailSelected(data.data.month6)" :year="data.data.month6.paymentYear"
								:month="data.data.month6.paymentMonth" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(6)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="07" cell-template="imputed-month7" :cssClass="classObject(7)" />
					<template #imputed-month7="{ data }">
						<div v-if="data.data.month7">
							<colorful-badge class="hover-underlined" :value="data.data.month7.status" :isUnder="processKey.imputedMonth == 7
								" @click="showDetailSelected(data.data.month7)" :year="data.data.month7.paymentYear"
								:month="data.data.month7.paymentMonth" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(7)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="08" cell-template="imputed-month8" :cssClass="classObject(8)" />
					<template #imputed-month8="{ data }">
						<div v-if="data.data.month8">
							<colorful-badge class="hover-underlined" :value="data.data.month8.status" :isUnder="processKey.imputedMonth == 8
								" @click="showDetailSelected(data.data.month8)" :year="data.data.month8.paymentYear"
								:month="data.data.month8.paymentMonth" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(8)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="09" cell-template="imputed-month9" :cssClass="classObject(9)" />
					<template #imputed-month9="{ data }">
						<div v-if="data.data.month9">
							<colorful-badge class="hover-underlined" :value="data.data.month9.status" :isUnder="processKey.imputedMonth == 9
								" @click="showDetailSelected(data.data.month9)" :year="data.data.month9.paymentYear"
								:month="data.data.month9.paymentMonth" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(9)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="10" cell-template="imputed-month10" :cssClass="classObject(10)" />
					<template #imputed-month10="{ data }">
						<div v-if="data.data.month10">
							<colorful-badge class="hover-underlined" :value="data.data.month10.status" :isUnder="processKey.imputedMonth == 10
								" @click="showDetailSelected(data.data.month10)" :year="data.data.month10.paymentYear"
								:month="data.data.month10.paymentMonth" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(10)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="11" cell-template="imputed-month11" :cssClass="classObject(11)" />
					<template #imputed-month11="{ data }">
						<div v-if="data.data.month11">
							<colorful-badge class="hover-underlined" :value="data.data.month11.status" :isUnder="processKey.imputedMonth == 11
								" @click="showDetailSelected(data.data.month11)" :year="data.data.month11.paymentYear"
								:month="data.data.month11.paymentMonth" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(11)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="12" cell-template="imputed-month12" :cssClass="classObject(12)" />
					<template #imputed-month12="{ data }">
						<div v-if="data.data.month12">
							<colorful-badge class="hover-underlined" :value="data.data.month12.status" :isUnder="processKey.imputedMonth == 12
								" @click="showDetailSelected(data.data.month12)" :year="data.data.month12.paymentYear"
								:month="data.data.month12.paymentMonth" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(12)">
							[+]
						</div>
					</template>
					<DxMasterDetail class="table-detail" :enabled="true" template="row-detail" />
					<template #row-detail="{}">
						<DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true"
							:data-source="dataCustomRes" :show-borders="true" :column-auto-width="true"
							:show-column-headers="false">
							<DxColumn cell-template="col-first" data-type="string" />
							<template #col-first="{ data }">
								<b>{{ data.data.name }}</b><br />
							</template>
							<DxColumn width="100px" cell-template="month-1" :cssClass="classObjectDetail(1)" />
							<template #month-1="{ data }">
								<div class="custom-detail" v-if="data.data.month1">
									{{ data.data.month1.value }}
								</div>
							</template>
							<DxColumn width="100px" cell-template="month-2" :cssClass="classObjectDetail(2)" />
							<template #month-2="{ data }">
								<div class="custom-detail" v-if="data.data.month2">
									{{ data.data.month2.value }}
								</div>
							</template>
							<DxColumn width="100px" cell-template="month-3" :cssClass="classObjectDetail(3)" />
							<template #month-3="{ data }">
								<div class="custom-detail" v-if="data.data.month3">
									{{ data.data.month3.value }}
								</div>
							</template>
							<DxColumn width="100px" cell-template="month-4" :cssClass="classObjectDetail(4)" />
							<template #month-4="{ data }">
								<div class="custom-detail" v-if="data.data.month4">
									{{ data.data.month4.value }}
								</div>
							</template>
							<DxColumn width="100px" cell-template="month-5" :cssClass="classObjectDetail(5)" />
							<template #month-5="{ data }">
								<div class="custom-detail" v-if="data.data.month5">
									{{ data.data.month5.value }}
								</div>
							</template>
							<DxColumn width="100px" cell-template="month-6" :cssClass="classObjectDetail(6)" />
							<template #month-6="{ data }">
								<div class="custom-detail" v-if="data.data.month6">
									{{ data.data.month6.value }}
								</div>
							</template>
							<DxColumn width="100px" cell-template="month-7" :cssClass="classObjectDetail(7)" />
							<template #month-7="{ data }">
								<div class="custom-detail" v-if="data.data.month7">
									{{ data.data.month7.value }}
								</div>
							</template>
							<DxColumn width="100px" cell-template="month-8" :cssClass="classObjectDetail(8)" />
							<template #month-8="{ data }">
								<div class="custom-detail" v-if="data.data.month8">
									{{ data.data.month8.value }}
								</div>
							</template>
							<DxColumn width="100px" cell-template="month-9" :cssClass="classObjectDetail(9)" />
							<template #month-9="{ data }">
								<div class="custom-detail" v-if="data.data.month9">
									{{ data.data.month9.value }}
								</div>
							</template>
							<DxColumn width="100px" cell-template="month-10" :cssClass="classObjectDetail(10)" />
							<template #month-10="{ data }">
								<div class="custom-detail" v-if="data.data.month10">
									{{ data.data.month10.value }}
								</div>
							</template>
							<DxColumn width="100px" cell-template="month-11" :cssClass="classObjectDetail(11)" />
							<template #month-11="{ data }">
								<div class="custom-detail" v-if="data.data.month11">
									{{ data.data.month11.value }}
								</div>
							</template>
							<DxColumn width="100px" cell-template="month-12" :cssClass="classObjectDetail(12)" />
							<template #month-12="{ data }">
								<div class="custom-detail" v-if="data.data.month12">
									{{ data.data.month12.value }}
								</div>
							</template>
						</DxDataGrid>
					</template>
				</DxDataGrid>
			</a-spin>
		</a-row>
		<a-row :class="{ disabledBlock: statusDisabledBlock, 'ele-opacity': checkChangeForm }"
			style="border: 1px solid #d7d7d7; padding: 10px; margin-top: 10px" justify="space-between">
			<a-col>
				<div v-if="!statusDisabledBlock">
					<DxButton :text="'귀 ' + processKey.imputedYear + '-' + $filters.formatMonth(processKey.imputedMonth)"
						:style="{ color: 'white', backgroundColor: 'gray' }" :height="$config_styles.HeightInput" />
					<DxButton :text="'지 ' + processKey.paymentYear + '-' + $filters.formatMonth(processKey.paymentMonth)"
						:style="{ color: 'white', backgroundColor: 'black' }" :height="$config_styles.HeightInput" />
					<ProcessStatus v-model:valueStatus="status" @checkConfirm="statusComfirm" :disabled="status == 30 ||
						status == 40 || checkChangeForm" />
				</div>
				<div v-else>
					<DxButton text="귀" :style="{ color: 'white', backgroundColor: 'gray' }"
						:height="$config_styles.HeightInput" />
					<DxButton text="지" :style="{ color: 'white', backgroundColor: 'black' }"
						:height="$config_styles.HeightInput" />
				</div>
			</a-col>
			<a-col>
				<div style="float: right; display: flex">
					<SelectActionComponent :dataRows="dataRows" />
				</div>
			</a-col>
		</a-row>
		<a-row :class="{ disabledBlock: statusDisabledBlock }">
			<a-col :span="12" class="custom-layout custom-layout-table" :class="{ 'ele-opacity': checkChangeForm }">
				<a-spin :spinning="loadingTaxPayInfo" size="large">
					<DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true"
						:data-source="store.state.common.pa110.dataTaxPayInfo" :show-borders="true"
						:allow-column-reordering="move_column" :focused-row-enabled="true"
						:allow-column-resizing="colomn_resize" :column-auto-width="true" key-expr="incomeId"
						id="pa-110-gridContainer" @focused-row-changing="onFocusedRowChanging" ref="gridRefPA110"
						@selection-changed="selectionChanged" v-model:selected-row-keys="store.state.common.pa110.selectedRowKeys
							" v-model:focused-row-key="store.state.common.pa110.focusedRowKey">
						<DxScrolling mode="standard" show-scrollbar="always" />
						<DxPaging :enabled="false" />
						<DxSelection select-all-mode="allPages" show-check-boxes-mode="onClick" mode="multiple"
							width="40" />
						<DxColumn width="200" css-class="cell-left" caption="사원" cell-template="tag"
							data-field="employee.employeeId" />
						<template #tag="{ data }">
							<div class="custom-action">
								<employee-info :idEmployee="data.data.employee.employeeId"
									:idCardNumber="data.data.employee.residentId" :name="data.data.employee.name"
									:status="checkShowTagStatus(data.data.employee)"
									:midTermSettlement="data.data.midTermSettlement" />
							</div>
						</template>
						<DxColumn css-class="money-column" width="75" caption="급여" data-field="totalPay"
							format="fixedPoint" />
						<DxColumn css-class="money-column" width="75" caption="공제" cell-template="total-deduction"
							data-field="totalDeduction" format="fixedPoint" />
						<template #total-deduction="{ data }">
							<a-tooltip placement="top">
								<template #title>소득세
									{{ $filters.formatCurrency(data.data.withholdingIncomeTax) }}/ 지방소득세
									{{ $filters.formatCurrency(data.data.withholdingLocalIncomeTax) }}
								</template>
								<span>
									{{ $filters.formatCurrency(data.data.totalDeduction) }}
								</span>
							</a-tooltip>
						</template>
						<DxColumn css-class="money-column" width="120" caption="차인지급액" data-field="actualPayment"
							format="fixedPoint" />
						<DxColumn class="min-w-240" caption="비고" cell-template="four-major-insurance" />
						<template #four-major-insurance="{ data }">
							<div class="custom-action">
								<four-major-insurance v-if="data.data.employee.nationalPensionDeduction" :typeTag="1"
									:typeValue="1" />
								<four-major-insurance v-if="data.data.employee.healthInsuranceDeduction" :typeTag="2"
									:typeValue="1" />
								<four-major-insurance v-if="data.data.employee.employeementInsuranceDeduction" :typeTag="4"
									:typeValue="1" />
								<four-major-insurance v-if="data.data.employee.nationalPensionSupportPercent" :typeTag="6"
									:ratio="data.data.employee.nationalPensionSupportPercent" />
								<four-major-insurance v-if="data.data.employee.employeementInsuranceSupportPercent"
									:typeTag="7" :ratio="data.data.employee.employeementInsuranceSupportPercent" />
								<four-major-insurance v-if="data.data.employee.employeementReductionRatePercent"
									:typeTag="8" :ratio="data.data.employee.employeementReductionRatePercent" />
								<four-major-insurance v-if="data.data.employee.incomeTaxMagnification" :typeTag="10"
									:ratio="data.data.employee.incomeTaxMagnification" />
							</div>
						</template>
						<DxColumn css-class="cell-center" width="52" caption="지급일" data-field="paymentDay"
							cell-template="paymentDay" />
						<template #paymentDay="{ data }">
							{{ $filters.formatMonth(data.data.paymentDay)?.toString().slice(-2) }}
						</template>
					</DxDataGrid>
					<!-- <div v-if="store.state.common.pa110.dataTaxPayInfo.length" -->
					<div style="border: 1px solid #ddd; border-top: none; width: 100%; display: flex; justify-content: space-between; padding: 5px 20px;"
						class="fs-14">
						<div style="margin-left: 70px">
							<div class="dx-datagrid-summary-item dx-datagrid-text-content">
								<div>
									사원수<span>[{{ store.state.common.pa110.dataTaxPayInfo.length }}]</span>
								</div>
							</div>
						</div>
						<div style="margin-left: 50px">
							<div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customTotalPay()">
							</div>
						</div>
						<div style="margin-left: 50px">
							<div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customTotalDeduction()">
							</div>
						</div>
						<div style="margin-left: 50px">
							<div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customActualPayment()">
							</div>
						</div>
					</div>
				</a-spin>
			</a-col>
			<a-col :span="12" class="custom-layout custom-form-data" style="padding-right: 0px"
				:class="{ disabledBlock: !store.state.common.pa110.dataTaxPayInfo.length }">
				<FormDataComponent />
			</a-col>
			<PopupMessage :modalStatus="modalChangeRow" @closePopup="modalChangeRow = false" typeModal="confirm"
				:title="Message.getMessage('COMMON', '501').message" content=""
				:okText="Message.getMessage('COMMON', '501').yes" :cancelText="Message.getMessage('COMMON', '501').no"
				@checkConfirm="statusComfirmChange" />
			<CopyMonth :modalStatus="modalCopy" :data="dataModalCopy" :arrDataPoint="arrDataPoint"
				@closePopup=" { modalCopy = false; hoverColClick = 0; }" @dataAddIncomeProcess="dataAddIncomeProcess" />
		</a-row>
	</div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from "vue";
import DxButton from "devextreme-vue/button";
import dayjs from "dayjs";
import { useStore } from "vuex";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { companyId } from "@/helpers/commonFunction";
import {
	DxDataGrid,
	DxColumn,
	DxPaging,
	DxSelection,
	DxScrolling,
	DxMasterDetail,
} from "devextreme-vue/data-grid";
import SelectActionComponent from "./components/SelectActionComponent.vue";
import FormDataComponent from "./components/FormDataComponent.vue";
import queries from "@/graphql/queries/PA/PA1/PA110/index";
import mutations from "@/graphql/mutations/PA/PA1/PA110/index";
import filters from "@/helpers/filters";
import notification from "@/utils/notification";
import ProcessStatus from "@/components/common/ProcessStatus.vue";
import CopyMonth from "./components/Popup/CopyMonth.vue";
import { initDataCustomRes } from "./utils/index";
import { userType } from "@/helpers/commonFunction";
import { Message } from "@/configs/enum";
import { getJwtObject } from "@bankda/jangbuda-common";
export default defineComponent({
	components: {
		DxMasterDetail,
		DxDataGrid,
		DxColumn,
		DxPaging,
		DxSelection,
		DxScrolling,
		DxButton,
		SelectActionComponent,
		ProcessStatus,
		FormDataComponent,
		CopyMonth,
	},
	setup() {
		const store = useStore();
		const paYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? "0"));
		const per_page = computed(() => store.state.settings.per_page);
		const move_column = computed(() => store.state.settings.move_column);
		const colomn_resize = computed(() => store.state.settings.colomn_resize);
		store.state.common.pa110.processKeyPA110 = {
			imputedYear: paYear.value,
			imputedMonth: dayjs().month() + 1,
			paymentYear: paYear.value,
			paymentMonth: dayjs().month() + 1,
		};
		const startYearMonth = getJwtObject(sessionStorage.getItem("token")!)?.withholding?.startYearMonth;
		const processKey = computed(() => store.state.common.pa110.processKeyPA110);
		const checkChangeForm = computed(() => ((store.state.common.pa110.statusChangeFormEdit && !store.state.common.pa110.statusFormAdd) ||
			(store.state.common.pa110.statusChangeFormAdd && store.state.common.pa110.statusFormAdd)))
		const dataSource = ref<any>([]);
		const dataCustomRes: any = ref<any>([]);
		const arrDataPoint = ref<any>([]);
		const dataModalCopy = ref();
		const modalCopy = ref<boolean>(false);
		const modalChangeRow = ref(false);
		const dataRows = ref([]);
		const actionSaveItem = ref<number>(0);
		const actionUpdateItem = ref<number>(0);
		const trigger = ref<boolean>(true);
		const triggerDataTaxPayInfo = ref<boolean>(true);
		let status = ref();
		const gridRefPA110 = ref(); // ref of grid
		const dataGridRef = computed(() => gridRefPA110.value?.instance as any); // ref of grid Instance
		const originData = ref({
			companyId: companyId,
			imputedYear: paYear.value,
		});
		const originDataTaxPayInfo = ref({
			companyId: companyId,
			processKey: processKey.value,
		});
		const hoverColClick = ref<number>(0);
		const dataMonthNew: any = ref();
		const isRunOnce = ref<boolean>(true);
		const statusDisabledBlock = ref<boolean>(true);
		// call api getIncomeProcessWages for first table
		const {
			result: resIncomeProcessWages,
			loading: loadingIncomeProcessWages,
			onError,
		} = useQuery(queries.getIncomeProcessWages, originData, () => ({
			enabled: trigger.value,
			fetchPolicy: "no-cache",
		}));
		onError((e) => {
			trigger.value = false;
			//notification('error', e.message)
			dataSource.value = [];
			dataCustomRes.value = [];
			status.value = null;
			statusDisabledBlock.value = true;
			triggerDataTaxPayInfo.value = true; //reset data table 2
		});
		// get data table detail getIncomeProcessWages
		watch(resIncomeProcessWages, (value) => {
			trigger.value = false;
			arrDataPoint.value = [];
			if (value) {
				// set first row in table Income Process Wages
				dataSource.value = [{ companyId: companyId }];
				dataCustomRes.value = JSON.parse(JSON.stringify(initDataCustomRes));
				value.getIncomeProcessWages.forEach((data: any) => {
					// create data to copy
					arrDataPoint.value.push({
						imputedYear: data.imputedYear,
						imputedMonth: data.imputedMonth,
						paymentYear: data.paymentYear,
						paymentMonth: data.paymentMonth,
					});
					arrDataPoint.value.sort(function (a: any, b: any) {
						return b.imputedMonth - a.imputedMonth;
					});

					let dataAdd = {
						imputedYear: data.imputedYear,
						imputedMonth: data.imputedMonth,
						paymentYear: data.paymentYear,
						paymentMonth: data.paymentMonth,
					};
					if (JSON.stringify(dataAdd) == JSON.stringify(processKey.value)) {
						status.value = data.status;
					}
					dataSource.value[0]["month" + data.imputedMonth] = data;
					// data table detail
					dataCustomRes.value[0]["month" + data.imputedMonth] = {
						value: `${filters.formatCurrency(
							data.employeeStat?.employeeCount
						)}(${filters.formatCurrency(
							data.employeeStat?.retireEmployeeCount
						)})`,
						...dataAdd,
					};
					dataCustomRes.value[1]["month" + data.imputedMonth] = {
						value: filters.formatCurrency(data.incomeStat?.totalTaxPay),
						...dataAdd,
					};
					dataCustomRes.value[2]["month" + data.imputedMonth] = {
						value: filters.formatCurrency(data.incomeStat?.totalTaxfreePay),
						...dataAdd,
					};
					dataCustomRes.value[3]["month" + data.imputedMonth] = {
						value: filters.formatCurrency(data.incomeStat?.totalPay),
						...dataAdd,
					};
					dataCustomRes.value[4]["month" + data.imputedMonth] = {
						value: filters.formatCurrency(data.incomeStat?.totalNationalPensionDeduction),
						...dataAdd,
					};
					dataCustomRes.value[5]["month" + data.imputedMonth] = {
						value: filters.formatCurrency(data.incomeStat?.totalHealthDeduction),
						...dataAdd,
					};
					dataCustomRes.value[6]["month" + data.imputedMonth] = {
						value: filters.formatCurrency(data.incomeStat?.totalLongtermCareDeduction),
						...dataAdd,
					};
					dataCustomRes.value[7]["month" + data.imputedMonth] = {
						value: filters.formatCurrency(data.incomeStat?.totalEmploymentDeduction),
						...dataAdd,
					};
					dataCustomRes.value[8]["month" + data.imputedMonth] = {
						value: filters.formatCurrency(data.incomeStat?.withholdingIncomeTax),
						...dataAdd,
					};
					dataCustomRes.value[9]["month" + data.imputedMonth] = {
						value: filters.formatCurrency(data.incomeStat?.withholdingLocalIncomeTax),
						...dataAdd,
					};
					dataCustomRes.value[10]["month" + data.imputedMonth] = {
						value: filters.formatCurrency(data.incomeStat?.totalDeduction),
						...dataAdd,
					};
					dataCustomRes.value[11]["month" + data.imputedMonth] = {
						value: filters.formatCurrency(data.incomeStat?.actualPayment),
						...dataAdd,
					};
				});
			}
			const obj = dataSource.value[0]["month" + processKey.value.imputedMonth];
			if (obj) {
				statusDisabledBlock.value = false;
				if (isRunOnce.value) {
					showDetailSelected(obj);
				} else {
					if (store.state.common.pa110.checkClickMonth)
						activeNewMonth(dataMonthNew.value);
					else activeNewMonth(obj);
				}
			} else {
				status.value = null;
				statusDisabledBlock.value = true;
				triggerDataTaxPayInfo.value = true; //reset data table 2
			}
		});

		// get getIncomeWages table
		const {
			result: resultTaxPayInfo,
			onError: errorTaxPayInfo,
			loading: loadingTaxPayInfo,
		} = useQuery(queries.getIncomeWages, originDataTaxPayInfo, () => ({
			enabled: triggerDataTaxPayInfo.value,
			fetchPolicy: "no-cache",
		}));
		errorTaxPayInfo((e) => {
			triggerDataTaxPayInfo.value = false;
			store.state.common.pa110.dataTaxPayInfo = [];
			store.state.common.pa110.statusFormAdd = true;
			// store.state.common.pa110.focusedRowKey = null;
			store.state.common.pa110.incomeId = null;
			store.state.common.pa110.actionResetForm++;
			//notification('error', e.message)
		});
		watch(resultTaxPayInfo, (value) => {
			triggerDataTaxPayInfo.value = false;
			if (value) {
				store.state.common.pa110.dataTaxPayInfo = value.getIncomeWages;
				if (value.getIncomeWages[0]) {// if have data
					store.state.common.pa110.statusFormAdd = false;
					if (store.state.common.pa110.onDoneEdit) {
						// sửa ngày thành công
						store.state.common.pa110.onDoneEdit = false;
						store.state.common.pa110.selectedRowKeys = dataRows.value.map(
							(value: any) => {
								return value.incomeId;
							}
						);
						store.state.common.pa110.loadingFormData++;
						return;
					}
					if (
						!store.state.common.pa110.dataIncomeIdBackend ||
						store.state.common.pa110.checkClickMonth
					) {
						store.state.common.pa110.checkClickMonth = false;
						store.state.common.pa110.incomeId = value.getIncomeWages[0].incomeId;
						store.state.common.pa110.dataRowOnActive = value.getIncomeWages[0];
					} else {
						if (store.state.common.pa110.statusClickButtonSave) { // if click submit
							store.state.common.pa110.incomeId = store.state.common.pa110.dataIncomeIdBackend;
						} else { // click save modal
							store.state.common.pa110.incomeId = store.state.common.pa110.dataRowOnActive?.incomeId;
						}
						store.state.common.pa110.dataIncomeIdBackend = null;
					}
				} else {
					store.state.common.pa110.statusFormAdd = true;
					store.state.common.pa110.incomeId = null;
					store.state.common.pa110.actionResetForm++;
				}
				gridRefPA110.value?.instance.deselectAll();
				store.state.common.pa110.selectedRowKeys = [store.state.common.pa110.incomeId];
			}
			store.state.common.pa110.focusedRowKey = store.state.common.pa110.incomeId;
			if (store.state.common.pa110.statusClickButtonAdd && !store.state.common.pa110.statusClickButtonSave) {
				// nếu trước đó ấn button add
				store.state.common.pa110.addRow++; // add row
				store.state.common.pa110.statusRowAdd = false;
			} else {
				// call api detail
				if (
					store.state.common.pa110.incomeId &&
					store.state.common.pa110.incomeId != "PA110"
				) {
					store.state.common.pa110.loadingFormData++;
				} else {
					if (!store.state.common.pa110.statusFormAdd) {
						store.state.common.pa110.actionResetForm++;
					}
				}
			}
			store.state.common.pa110.resetArrayEmploySelect++;
		});
		watch(() => store.state.common.pa110.loadingTableInfo, (newVal) => {
			originData.value.imputedYear = paYear.value;
			originDataTaxPayInfo.value.processKey.imputedYear = paYear.value;
			trigger.value = true; //reset data table 1
			dataGridRef.value?.refresh();
		}
		);

		watch(() => status.value, (newVal) => {
			if (userType != "m" && (newVal == 20 || newVal == 30 || newVal == 40)) {
				store.state.common.pa110.statusDisabledStatus = true;
			} else {
				store.state.common.pa110.statusDisabledStatus = false;
			}
		}
		);
		watch(() => store.state.common.pa110.addRow, (newVal) => {
			gridRefPA110.value?.instance.deselectAll();
			dataRows.value = [];
		}
		);
		watch(() => store.state.common.activeTab, (newVal) => {
			if (newVal.id == "pa-110") {
				if (store.state.common.pa110.statusFormAdd) {
					return;
				}
				if (!(store.state.common.pa110.statusChangeFormEdit && !store.state.common.pa110.statusFormAdd)) {
					triggerDataTaxPayInfo.value = true; //reset data table 2
					!store.state.common.pa110.statusRowAdd ? (store.state.common.pa110.statusRowAdd = true) : "";
				}
			}
		}
		);
		watch(() => store.state.common.pa110.openModalCopyMonth, (value) => {
			dataModalCopy.value = monthCopy.value;
			modalCopy.value = true;
		}
		);

		watch(() => store.state.common.pa110.refreshDataGridRef, (value) => {
			dataGridRef.value?.refresh();
		}
		);

		const selectionChanged = (data: any) => {
			dataRows.value = data.selectedRowsData;
			if (data.selectedRowsData.find((element: any) => element.incomeId == "PA110" ?? null)) {
				gridRefPA110.value?.instance.deselectAll();
				dataRows.value = [];
			}
		};

		// A function that is called when a user clicks on a month.
		const showDetailSelected = (month: any) => {
			if (
				processKey.value.imputedYear !=
				month.imputedYear ||
				processKey.value.paymentYear !=
				month.paymentYear ||
				processKey.value.paymentMonth !=
				month.paymentMonth ||
				processKey.value.imputedMonth !=
				month.imputedMonth
			) {
				store.state.common.pa110.actionCallGetMonthDetail++;
			}

			dataMonthNew.value = month;
			store.state.common.pa110.checkClickMonth = true;
			if (
				(store.state.common.pa110.statusChangeFormEdit &&
					!store.state.common.pa110.statusFormAdd) ||
				(store.state.common.pa110.statusChangeFormAdd &&
					store.state.common.pa110.statusFormAdd &&
					!isRunOnce.value)
			) {
				modalChangeRow.value = true;
				hoverColClick.value = month.imputedMonth;
			} else {
				isRunOnce.value = false;
				activeNewMonth(month);
			}
		};
		// A function that is called when a user clicks on a button.
		const activeNewMonth = (month: any) => {
			status.value = month.status;
			processKey.value.imputedYear = month.imputedYear;
			processKey.value.paymentYear = month.paymentYear;
			processKey.value.paymentMonth = month.paymentMonth;
			processKey.value.imputedMonth = month.imputedMonth;
			triggerDataTaxPayInfo.value = true; //reset data table 2
			statusDisabledBlock.value = false;
			store.state.common.pa110.statusRowAdd = true;
			hoverColClick.value = 0;
			// debugger
		};
		const monthCopy = ref<number>();
		/**
		 * copy data from other month
		 * @param month
		 */
		const copyMonth = (month: number) => {
			monthCopy.value = month;
			if (checkChangeForm.value) {
				modalChangeRow.value = true;
				store.state.common.pa110.checkClickCopyMonth = true;
				hoverColClick.value = month;
			} else {
				dataModalCopy.value = monthCopy.value;
				modalCopy.value = true;
			}
		};

		/**
		 * change income process wage status
		 */
		const {
			mutate: actionChangeIncomeProcess,
			onError: errorChangeIncomeProcess,
			onDone: successChangeIncomeProcess,
		} = useMutation(mutations.changeIncomeProcessWageStatus);
		errorChangeIncomeProcess((e) => {
			//notification('error', e.message)
		});
		successChangeIncomeProcess((e) => {
			dataMonthNew.value.status = status.value;
			notification("success", Message.getMessage("COMMON", "106").message);
			originData.value.imputedYear = paYear.value;
			trigger.value = true; //reset data table 1
		});

		/**
		 * change income process wage status
		 */
		const statusComfirm = () => {
			actionChangeIncomeProcess({
				companyId: companyId,
				processKey: processKey.value,
				status: status.value,
			});
		};

		const dataAddIncomeProcess = (data: any) => {
			dataSource.value[0]["month" + data.imputedMonth] = data;
			dataSource.value[0]["month" + data.imputedMonth].status = 10;
			status.value = 10;
			triggerDataTaxPayInfo.value = true; //reset data table 2
			statusDisabledBlock.value = false;
		};

		const statusComfirmChange = async (res: any) => {
			if (res) {
				// action save form
				store.state.common.pa110.actionSubmit++;
			} else {
				//  no save form
				store.state.common.pa110.statusChangeFormEdit = false;
				store.state.common.pa110.statusChangeFormAdd = false;
				if (!store.state.common.pa110.statusRowAdd) {
					// nếu đang có row thêm mới thì xóa row mới
					store.state.common.pa110.statusFormAdd = false;
					store.state.common.pa110.dataTaxPayInfo =
						store.state.common.pa110.dataTaxPayInfo.splice(
							0,
							store.state.common.pa110.dataTaxPayInfo.length - 1
						);
					store.state.common.pa110.statusRowAdd = true;
					store.state.common.pa110.focusedRowKey = store.state.common.pa110.incomeId;
				}
				if (store.state.common.pa110.checkClickMonth) {
					activeNewMonth(dataMonthNew.value);
					store.state.common.pa110.checkClickMonth = false;
					return;
				}
				if (store.state.common.pa110.checkClickCopyMonth) {
					store.state.common.pa110.checkClickCopyMonth = false;
					dataModalCopy.value = monthCopy.value;
					modalCopy.value = true;
				}
				store.state.common.pa110.incomeId = store.state.common.pa110.dataRowOnActive.incomeId;
				store.state.common.pa110.loadingFormData++;
			}
		};
		// Preventing the user from selecting a row by clicking on the select button.
		const onFocusedRowChanging = (e: any) => {
			if (!(e.event.currentTarget.outerHTML.search("dx-command-select") == -1)) {
				e.cancel = true;
			} else {
				// const rowElement = e.rowElement[0];
				store.state.common.pa110.dataRowOnActive = e.rows[e.newRowIndex]?.data;
				if (store.state.common.pa110.dataRowOnActive.employeeId) {
					// if row data (not row add)
					if (checkChangeForm.value) {
						// if change form data
						e.rowElement[0]?.classList.add("dx-state-hover-custom");
						modalChangeRow.value = true;
						e.cancel = true;
					} else {
						// cho chọn raw mới
						if (
							store.state.common.pa110.dataTaxPayInfo[
								store.state.common.pa110.dataTaxPayInfo.length - 1
							]?.employee.employeeId == null
						) {
							store.state.common.pa110.dataTaxPayInfo =
								store.state.common.pa110.dataTaxPayInfo.splice(
									0,
									store.state.common.pa110.dataTaxPayInfo.length - 1
								);
							store.state.common.pa110.statusRowAdd = true;
						}
						store.state.common.pa110.incomeId = e.rows[e.newRowIndex]?.data?.incomeId;
						store.state.common.pa110.selectedRowKeys = [e.rows[e.newRowIndex]?.data.incomeId];
						dataGridRef.value?.refresh();
						store.state.common.pa110.loadingFormData++;
						if (store.state.common.pa110.statusRowAdd) {
							store.state.common.pa110.statusFormAdd = false;
						}
					}
				}
			}
		};
		const checkStartYearMonth = (month: number) => {
			let startYear = ref<any>(startYearMonth?.toString().slice(0, 4));
			let startMonth = ref<any>(startYearMonth?.toString().slice(4, 6));
			if (parseInt(startYear.value) !== paYear.value) {
				return false;
			} else {
				if (month >= parseInt(startMonth.value)) {
					return false;
				}
				return true;
			}
		};

		const classObject = (month: number) => {
			let string = "cell-center";
			processKey.value.imputedMonth == month ? (string += " column-focus") : "";
			hoverColClick.value == month ? (string += " column-hover") : "";
			checkStartYearMonth(month) ? (string += " disabledBlock") : "";
			return string;
		};
		const classObjectDetail = (month: number) => {
			let string = "";
			processKey.value.imputedMonth == month ? (string += " column-focus") : "";
			hoverColClick.value == month ? (string += " column-hover") : "";
			checkStartYearMonth(month) ? (string += " disabledBlock") : "";
			return string;
		};
		const checkShowTagStatus = (data: any) => {
			if (data.status == 0) {
				if (data.leavedAt?.toString().slice(0, 6) == `${paYear.value}${filters.formatMonth(processKey.value.imputedMonth)}`) {
					return 0;
				}
				return 50;
			} else {
				return data.status;
			}
		};

		const customTotalPay = () => {
			let sum = 0;
			store.state.common.pa110.dataTaxPayInfo?.map((row: any) => {
				sum += row.totalPay;
			});
			return `급여합계 <span>[${filters.formatCurrency(sum)}]</span>`;
		};
		const customTotalDeduction = () => {
			let sum = 0;
			store.state.common.pa110.dataTaxPayInfo?.map((row: any) => {
				sum += row.totalDeduction;
			});
			return `공제합계 <span>[${filters.formatCurrency(sum)}]</span> `;
		};
		const customActualPayment = () => {
			let sum = 0;
			store.state.common.pa110.dataTaxPayInfo?.map((row: any) => {
				sum += row.actualPayment;
			});
			return `차인지급액합계 <span>[${filters.formatCurrency(sum)}]</span>`;
		};
		return {
			paYear,
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
			selectionChanged,
			dataRows,
			statusComfirm,
			actionSaveItem,
			actionUpdateItem,
			arrDataPoint,
			dataAddIncomeProcess,
			status,
			modalChangeRow,
			statusComfirmChange,
			customTotalPay,
			customTotalDeduction,
			customActualPayment,
			Message,
			gridRefPA110,
			statusDisabledBlock,
			onFocusedRowChanging,
			hoverColClick,
			checkStartYearMonth,
			checkShowTagStatus,
			classObject,
			classObjectDetail,
			checkChangeForm,
		};
	},
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
