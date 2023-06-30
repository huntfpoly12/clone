<template>
	<action-header title="일용직근로소득자료입력" :buttonSave="false" :buttonDelete="false" />
	<div id="pa-510" class="page-content">
		<a-row :class="{ 'ele-opacity': checkChangeForm }">
			<a-spin :spinning="loading" size="large">
				<DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
					key-expr="companyId" :show-borders="true" :allow-column-reordering="move_column"
					:allow-column-resizing="colomn_resize" :column-auto-width="true">
					<DxScrolling mode="standard" show-scrollbar="always" />
					<DxColumn :caption="processKey.imputedYear + '귀속월'" cell-template="imputed-year" />
					<template #imputed-year="{}">
						<span>지급연월</span>
					</template>
					<DxColumn width="100px" caption="01" cell-template="imputed-month1" :cssClass="classObject(1)" />
					<template #imputed-month1="{ data }">
						<div v-if="data.data.month1">
							<colorful-badge class="hover-underlined" :value="data.data.month1.status"
								@click="showDetailSelected(data.data.month1)" :year="data.data.month1.paymentYear"
								:month="data.data.month1.paymentMonth" :isUnder="processKey.imputedMonth == 1
									" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(1)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="02" cell-template="imputed-month2" :cssClass="classObject(2)" />
					<template #imputed-month2="{ data }">
						<div v-if="data.data.month2">
							<colorful-badge class="hover-underlined" :value="data.data.month2.status"
								@click="showDetailSelected(data.data.month2)" :year="data.data.month2.paymentYear"
								:month="data.data.month2.paymentMonth" :isUnder="processKey.imputedMonth == 2
									" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(2)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="03" cell-template="imputed-month3" :cssClass="classObject(3)" />
					<template #imputed-month3="{ data }">
						<div v-if="data.data.month3">
							<colorful-badge class="hover-underlined" :value="data.data.month3.status"
								@click="showDetailSelected(data.data.month3)" :year="data.data.month3.paymentYear"
								:month="data.data.month3.paymentMonth" :isUnder="processKey.imputedMonth == 3
									" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(3)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="04" cell-template="imputed-month4" :cssClass="classObject(4)" />
					<template #imputed-month4="{ data }">
						<div v-if="data.data.month4">
							<colorful-badge class="hover-underlined" :value="data.data.month4.status"
								@click="showDetailSelected(data.data.month4)" :year="data.data.month4.paymentYear"
								:month="data.data.month4.paymentMonth" :isUnder="processKey.imputedMonth == 4
									" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(4)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="05" cell-template="imputed-month5" :cssClass="classObject(5)" />
					<template #imputed-month5="{ data }">
						<div v-if="data.data.month5">
							<colorful-badge class="hover-underlined" :value="data.data.month5.status"
								@click="showDetailSelected(data.data.month5)" :year="data.data.month5.paymentYear"
								:month="data.data.month5.paymentMonth" :isUnder="processKey.imputedMonth == 5
									" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(5)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="06" cell-template="imputed-month6" :cssClass="classObject(6)" />
					<template #imputed-month6="{ data }">
						<div v-if="data.data.month6">
							<colorful-badge class="hover-underlined" :value="data.data.month6.status"
								@click="showDetailSelected(data.data.month6)" :year="data.data.month6.paymentYear"
								:month="data.data.month6.paymentMonth" :isUnder="processKey.imputedMonth == 6
									" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(6)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="07" cell-template="imputed-month7" :cssClass="classObject(7)" />
					<template #imputed-month7="{ data }">
						<div v-if="data.data.month7">
							<colorful-badge class="hover-underlined" :value="data.data.month7.status"
								@click="showDetailSelected(data.data.month7)" :year="data.data.month7.paymentYear"
								:month="data.data.month7.paymentMonth" :isUnder="processKey.imputedMonth == 7
									" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(7)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="08" cell-template="imputed-month8" :cssClass="classObject(8)" />
					<template #imputed-month8="{ data }">
						<div v-if="data.data.month8">
							<colorful-badge class="hover-underlined" :value="data.data.month8.status"
								@click="showDetailSelected(data.data.month8)" :year="data.data.month8.paymentYear"
								:month="data.data.month8.paymentMonth" :isUnder="processKey.imputedMonth == 8
									" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(8)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="09" cell-template="imputed-month9" :cssClass="classObject(9)" />
					<template #imputed-month9="{ data }">
						<div v-if="data.data.month9">
							<colorful-badge class="hover-underlined" :value="data.data.month9.status"
								@click="showDetailSelected(data.data.month9)" :year="data.data.month9.paymentYear"
								:month="data.data.month9.paymentMonth" :isUnder="processKey.imputedMonth == 9
									" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(9)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="10" cell-template="imputed-month10" :cssClass="classObject(10)" />
					<template #imputed-month10="{ data }">
						<div v-if="data.data.month10">
							<colorful-badge class="hover-underlined" :value="data.data.month10.status"
								@click="showDetailSelected(data.data.month10)" :year="data.data.month10.paymentYear"
								:month="data.data.month10.paymentMonth" :isUnder="processKey.imputedMonth == 10
									" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(10)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="11" cell-template="imputed-month11" :cssClass="classObject(11)" />
					<template #imputed-month11="{ data }">
						<div v-if="data.data.month11">
							<colorful-badge class="hover-underlined" :value="data.data.month11.status"
								@click="showDetailSelected(data.data.month11)" :year="data.data.month11.paymentYear"
								:month="data.data.month11.paymentMonth" :isUnder="processKey.imputedMonth == 11
									" />
						</div>
						<div v-else style="width: 100%; text-align: center" @click="copyMonth(11)">
							[+]
						</div>
					</template>
					<DxColumn width="100px" caption="12" cell-template="imputed-month12" :cssClass="classObject(12)" />
					<template #imputed-month12="{ data }">
						<div v-if="data.data.month12">
							<colorful-badge class="hover-underlined" :value="data.data.month12.status"
								@click="showDetailSelected(data.data.month12)" :year="data.data.month12.paymentYear"
								:month="data.data.month12.paymentMonth" :isUnder="processKey.imputedMonth == 12
									" />
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
							<DxScrolling mode="standard" show-scrollbar="always" />
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
			style=" border: 1px solid #d7d7d7;  padding: 10px; margin-top: 10px; justify-content: space-between;">
			<a-col>
				<div v-if="!statusDisabledBlock">
					<DxButton :text="'귀 ' + processKey.imputedYear + '-' + $filters.formatMonth(processKey.imputedMonth)"
						:style="{ color: 'white', backgroundColor: 'gray' }" :height="$config_styles.HeightInput" />
					<DxButton :text="'지 ' + processKey.paymentYear + '-' + $filters.formatMonth(processKey.paymentMonth)"
						:style="{ color: 'white', backgroundColor: 'black' }" :height="$config_styles.HeightInput" />
					<ProcessStatus v-model:valueStatus="status" @checkConfirm="statusComfirm"
						:disabled="status == 30 || status == 40 || checkChangeForm"/>
				</div>
				<div v-else>
					<DxButton text="귀" :style="{ color: 'white', backgroundColor: 'gray' }"
						:height="$config_styles.HeightInput" />
					<DxButton text="지" :style="{ color: 'white', backgroundColor: 'black' }"
						:height="$config_styles.HeightInput" />
				</div>
			</a-col>
			<a-col class="">
				<SelectActionComponent :dataRows="dataRows" />
			</a-col>
		</a-row>
		<a-row :class="{ disabledBlock: statusDisabledBlock }">
			<a-col :span="14" class="custom-layout" :class="{ 'ele-opacity': checkChangeForm }">
				<a-spin :spinning="loadingTaxPayInfo" size="large">
					<DxDataGrid noDataText="내역이 없습니다" id="data-tax-pay-info" :show-row-lines="true"
						:hoverStateEnabled="true" :data-source="store.state.common.pa510.dataTaxPayInfo"
						:show-borders="true" :allow-column-reordering="move_column" :focused-row-enabled="true"
						:allow-column-resizing="colomn_resize" :column-auto-width="true" key-expr="incomeId"
						@selection-changed="selectionChanged" @focused-row-changing="onFocusedRowChanging"
						ref="gridRefPA510" v-model:selected-row-keys="store.state.common.pa510.selectedRowKeys"
						v-model:focused-row-key="store.state.common.pa510.focusedRowKey"
						:auto-navigate-to-focused-row="true">
						<DxSelection select-all-mode="allPages" show-check-boxes-mode="onClick" mode="multiple" />
						<DxPaging :enabled="false" />
						<DxColumn caption="일용직사원" css-class="cell-left" cell-template="tag" width="150"
							data-field="employee.employeeId" />
						<template #tag="{ data }">
							<div class="custom-action">
								<employee-info :idEmployee="data.data.employee.employeeId" :name="data.data.employee.name"
									:idCardNumber="data.data.employee.residentId"
									:status="checkShowTagStatus(data.data.employee)"
									:foreigner="data.data.employee.foreigner" />
							</div>
						</template>
						<DxColumn width="75" caption="근무일수" cell-template="workingDays" data-field="workingDays" />
						<template #workingDays="{ data }">
							{{ $filters.formatMonth(data.data.workingDays) }}
						</template>
						<DxColumn css-class="money-column" width="85" caption="일급여" cell-template="dailyWage"
							data-field="dailyWage" />
						<template #dailyWage="{ data }">
							{{ $filters.formatCurrency(data.data.dailyWage) }}
						</template>
						<DxColumn css-class="money-column" width="85" caption="월급여" cell-template="monthlyWage"
							data-field="monthlyWage" />
						<template #monthlyWage="{ data }">
							{{ $filters.formatCurrency(data.data.monthlyWage) }}
						</template>
						<DxColumn css-class="money-column" width="85" caption="공제" cell-template="total-deduction"
							data-field="totalDeduction" />
						<template #total-deduction="{ data }">
							<a-tooltip placement="top">
								<template #title>소득세
									{{ $filters.formatCurrency(data.data.withholdingIncomeTax) }}
									/ 지방소득세
									{{ $filters.formatCurrency(data.data.withholdingLocalIncomeTax) }}
								</template>
								<span>{{ $filters.formatCurrency(data.data.totalDeduction) }}</span>
							</a-tooltip>
						</template>
						<DxColumn css-class="money-column" width="85" caption="차인지급액" cell-template="actualPayment"
							data-field="actualPayment" />
						<template #actualPayment="{ data }">
							{{ $filters.formatCurrency(data.data.actualPayment) }}
						</template>
						<DxColumn caption="비고" cell-template="four-major-insurance" />
						<template #four-major-insurance="{ data }">
							<div class="custom-action custom-grade-cell">
								<four-major-insurance v-if="data.data.employee.nationalPensionDeduction" :typeTag="1"
									:typeValue="1" />
								<four-major-insurance v-if="data.data.employee.healthInsuranceDeduction" :typeTag="2"
									:typeValue="1" />
								<four-major-insurance v-if="data.data.employee.employeementInsuranceDeduction" :typeTag="4"
									:typeValue="1" />
								<four-major-insurance v-if="data.data.employee.nationalPensionSupportPercent" :typeTag="6"
									:ratio="data.data.employee.nationalPensionSupportPercent" />
								<four-major-insurance v-if="data.data.employee.employeementInsuranceSupportPercent"
									:typeTag="7" :ratio="data.data.employee.employeementInsuranceSupportPercent
										" />
								<four-major-insurance v-if="data.data.employee.employeementReductionRatePercent"
									:typeTag="8" :ratio="data.data.employee.employeementReductionRatePercent" />
								<four-major-insurance v-if="data.data.employee.incomeTaxMagnification" :typeTag="10"
									:ratio="data.data.employee.incomeTaxMagnification" />
							</div>
						</template>
						<DxColumn css-class="cell-center" caption="지급일" width="55" cell-template="paymentDay"
							data-field="paymentDay" />
						<template #paymentDay="{ data }">
							{{ $filters.formatMonth(data.data.paymentDay)?.toString().slice(-2) }}
						</template>
					</DxDataGrid>
					<div class="custom-smmary">
						<!-- <div style="margin-left: 70px"> -->
							<div class="dx-datagrid-summary-item dx-datagrid-text-content">
								<div>
									사원수<span>[{{ store.state.common.pa510.dataTaxPayInfo.length }}]</span>
								</div>
							</div>
						<!-- </div>
						<div style="margin-left: 50px"> -->
							<div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customMonthlyWage()">
							</div>
						<!-- </div>
						<div style="margin-left: 50px"> -->
							<div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customTotalDeduction()">
							</div>
						<!-- </div>
						<div style="margin-left: 50px"> -->
							<div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customActualPayment()">
							</div>
						<!-- </div> -->
					</div>
				</a-spin>
			</a-col>
			<a-col :span="10" class="custom-layout custom-form-data" style="padding-right: 0px"
				:class="{ disabledBlock: !store.state.common.pa510.dataTaxPayInfo.length }">
				<FormDataComponent />
			</a-col>
		</a-row>
		<PopupMessage :modalStatus="modalChangeRow" @closePopup="modalChangeRow = false" typeModal="confirm"
			:title="Message.getMessage('COMMON', '501').message" content=""
			:okText="Message.getMessage('COMMON', '501').yes" :cancelText="Message.getMessage('COMMON', '501').no"
			@checkConfirm="statusComfirmChange" />
		<!-- <PopupMessage :modalStatus="modalChangeRowPrice" @closePopup="modalChangeRowPrice = false" typeModal="confirm"
            :title="Message.getMessage('PA110', '001').message" content="" :okText="Message.getMessage('PA110', '001').yes" :cancelText="Message.getMessage('PA110', '001').no" @checkConfirm="statusComfirmChangePrice" /> -->
		<CopyMonth :modalStatus="modalCopy" :data="dataModalCopy" @closePopup="{ modalCopy = false; hoverColClick = 0; }"
			@dataAddIncomeProcess="dataAddIncomeProcess" />
	</div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue";
import DxButton from "devextreme-vue/button";
import dayjs from "dayjs";
import { useStore } from "vuex";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { companyId } from "@/helpers/commonFunction";
import {
	DxDataGrid,
	DxColumn,
	DxSelection,
	DxScrolling,
	DxMasterDetail,
	DxPaging,
} from "devextreme-vue/data-grid";
import notification from "@/utils/notification";
import SelectActionComponent from "./components/SelectActionComponent.vue";
import FormDataComponent from "./components/FormDataComponent.vue";
import queries from "@/graphql/queries/PA/PA5/PA510/index";
import mutations from "@/graphql/mutations/PA/PA5/PA510/index";
import CopyMonth from "./components/Popup/CopyMonth.vue";
import filters from "@/helpers/filters";
import { userType } from "@/helpers/commonFunction";
import { Message } from "@/configs/enum";
import { getJwtObject } from "@bankda/jangbuda-common";
export default defineComponent({
	components: {
		DxMasterDetail,
		DxDataGrid,
		DxColumn,
		DxPaging,
		DxScrolling,
		DxSelection,
		DxButton,
		SelectActionComponent,
		FormDataComponent,
		CopyMonth,
	},
	setup() {
		const store = useStore();
		const paYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? "0"));
		const per_page = computed(() => store.state.settings.per_page);
		const move_column = computed(() => store.state.settings.move_column);
		const colomn_resize = computed(() => store.state.settings.colomn_resize);
		store.state.common.pa510.processKeyPA510 = {
			imputedYear: paYear.value,
			imputedMonth: dayjs().month() + 1,
			paymentYear: paYear.value,
			paymentMonth: dayjs().month() + 1,
		};
		const startYearMonth = getJwtObject(sessionStorage.getItem("token")!)?.withholding?.startYearMonth;
		const processKey = computed(() => store.state.common.pa510.processKeyPA510);
		const checkChangeForm = computed(() => ((store.state.common.pa510.statusChangeFormEdit && !store.state.common.pa510.statusFormAdd) ||
			(store.state.common.pa510.statusChangeFormAdd && store.state.common.pa510.statusFormAdd)))
		const modalCopy = ref<boolean>(false);
		const modalChangeRow = ref(false);
		const monthCopy = ref<number>();
		let dataCustomRes: any = ref([]);
		const dataRows: any = ref([]);
		const dataSource: any = ref([]);
		let status: any = ref();
		const dataModalCopy: any = ref();
		const IncomeWageDailiesTrigger = ref<boolean>(false);
		const trigger = ref<boolean>(true);
		const originData = ref({
			companyId: companyId,
			imputedYear: paYear.value,
		});
		const originDataTaxPayInfo = ref({
			companyId: companyId,
			processKey: processKey.value,
		});
		const gridRefPA510 = ref(); // ref of grid
		const dataGridRef = computed(() => gridRefPA510.value?.instance as any); // ref of grid Instance
		const isRunOnce = ref<boolean>(true);
		const statusDisabledBlock = ref<boolean>(true);
		const hoverColClick = ref<number>(0);
		const dataMonthNew: any = ref();
		// ======================= GRAPQL ================================
		const { result, loading, onError } = useQuery(
			queries.getIncomeProcessWageDailies,
			originData,
			() => ({
				enabled: trigger.value,
				fetchPolicy: "no-cache",
			})
		);
		onError((e) => {
			trigger.value = false;
			//notification('error', e.message)
			dataSource.value = [];
			dataCustomRes.value = [];
			status.value = null;
			IncomeWageDailiesTrigger.value = true;
			statusDisabledBlock.value = true;
		});
		const {
			result: resultTaxPayInfo,
			onError: errorTaxPayInfo,
			loading: loadingTaxPayInfo,
		} = useQuery(queries.getIncomeWageDailies, originDataTaxPayInfo, () => ({
			enabled: IncomeWageDailiesTrigger.value,
			fetchPolicy: "no-cache",
		}));
		errorTaxPayInfo((e) => {
			IncomeWageDailiesTrigger.value = false;
			store.state.common.pa510.dataTaxPayInfo = [];
			store.state.common.pa510.resetArrayEmploySelect++;
			store.state.common.pa510.statusFormAdd = true;
			store.state.common.pa510.focusedRowKey = null;
			store.state.common.pa510.incomeId = null;
			store.state.common.pa510.actionResetForm++;
			//notification('error', e.message)
		});
		const {
			mutate: actionChangeIncomeProcess,
			onError: errorChangeIncomeProcess,
			onDone: successChangeIncomeProcess,
		} = useMutation(mutations.changeIncomeProcessWageDailyStatus);
		errorChangeIncomeProcess((e) => {
			//notification('error', e.message)
		});
		successChangeIncomeProcess((e) => {
			dataMonthNew.value.status = status.value;
			notification("success", Message.getMessage("COMMON", "106").message);
			originData.value.imputedYear = paYear.value;
			trigger.value = true; //reset data table 1
		});

		// ======================= WATCH ==================================
		watch(result, (value) => {
			trigger.value = false;
			if (value) {
				let respon = value.getIncomeProcessWageDailies;
				dataSource.value = [{ companyId: companyId }];
				dataCustomRes.value = [
					{ id: 1, name: "인원" },
					{ id: 2, name: "지급액" },
					{ id: 3, name: "소득세" },
					{ id: 4, name: "지방소득세" },
					{ id: 5, name: "공제총액" },
					{ id: 6, name: "차인지급액" },
				];
				respon.forEach((val: any, index: any) => {
					let dataAdd = {
						imputedYear: val.imputedYear,
						imputedMonth: val.imputedMonth,
						paymentYear: val.paymentYear,
						paymentMonth: val.paymentMonth,
					};
					if (JSON.stringify(dataAdd) == JSON.stringify(processKey.value)) {
						status.value = val.status;
					}

					dataSource.value[0]["month" + val.imputedMonth] = val;
					// data table detail
					dataCustomRes.value[0]["month" + val.imputedMonth] = {
						value: `${filters.formatCurrency(val.employeeStat?.employeeCount)}
                        (${filters.formatCurrency(
							val.employeeStat?.retireEmployeeCount
						)})`,
						...dataAdd,
					};

					dataCustomRes.value[1]["month" + val.imputedMonth] = {
						value: filters.formatCurrency(val.incomeStat?.incomePayment),
						...dataAdd,
					};
					dataCustomRes.value[2]["month" + val.imputedMonth] = {
						value: filters.formatCurrency(val.incomeStat?.withholdingIncomeTax),
						...dataAdd,
					};
					dataCustomRes.value[3]["month" + val.imputedMonth] = {
						value: filters.formatCurrency(
							val.incomeStat?.withholdingLocalIncomeTax
						),
						...dataAdd,
					};
					dataCustomRes.value[4]["month" + val.imputedMonth] = {
						value: filters.formatCurrency(val.incomeStat?.totalDeduction),
						...dataAdd,
					};
					dataCustomRes.value[5]["month" + val.imputedMonth] = {
						value: filters.formatCurrency(val.incomeStat?.actualPayment),
						...dataAdd,
					};
				});
			}
			const obj = dataSource.value[0]["month" + processKey.value.imputedMonth];
			if (obj) {
				// nếu có data source
				statusDisabledBlock.value = false;
				if (isRunOnce.value) {
					isRunOnce.value = false;
					showDetailSelected(obj);
				} else {
					if (store.state.common.pa510.checkClickMonth) {
						activeNewMonth(dataMonthNew.value);
					} else {
						activeNewMonth(obj);
					}
				}
			} else {
				status.value = null;
				IncomeWageDailiesTrigger.value = true;
				statusDisabledBlock.value = true;
			}
		});
		watch(resultTaxPayInfo, (value) => {
			IncomeWageDailiesTrigger.value = false;
			if (value.getIncomeWageDailies) {
				delete value.getIncomeWageDailies.deductionItems;
				store.state.common.pa510.dataTaxPayInfo = value.getIncomeWageDailies;
				store.state.common.pa510.resetArrayEmploySelect++;
				// if (value.getIncomeWageDailies[0] && !store.state.common.pa510.statusFormAdd) { // if have data
				if (
					store.state.common.pa510.statusClickButtonAdd &&
					!store.state.common.pa510.statusClickButtonSave
				) {
					// nếu trước đó ấn button add
					store.state.common.pa510.addRow++; // add row
					return;
				}
				if (value.getIncomeWageDailies[0]) {
					// if have data
					if (store.state.common.pa510.onDoneEdit) {
						// sửa ngày thành công
						store.state.common.pa510.onDoneEdit = false;
						store.state.common.pa510.selectedRowKeys = dataRows.value.map(
							(value: any) => {
								return value.incomeId;
							}
						);

						store.state.common.pa510.loadingFormData++;
						// debugger
						return;
					}
					if (
						store.state.common.pa510.incomeId &&
						value.getIncomeWageDailies.find(
							(element: any) =>
								element.incomeId == store.state.common.pa510.incomeId ?? null
						)
					) {
						// nếu trước đó click vào row khác
						store.state.common.pa510.focusedRowKey =
							store.state.common.pa510.incomeId;
					} else {
						store.state.common.pa510.focusedRowKey =
							value.getIncomeWageDailies[0].incomeId;
						store.state.common.pa510.incomeId =
							value.getIncomeWageDailies[0].incomeId;
						store.state.common.pa510.dataRowOnActive =
							value.getIncomeWageDailies[0];
					}
					store.state.common.pa510.loadingFormData++;
					store.state.common.pa510.statusFormAdd = false;
				} else {
					store.state.common.pa510.statusFormAdd = true;
					store.state.common.pa510.focusedRowKey = null;
					store.state.common.pa510.incomeId = null;
					store.state.common.pa510.actionResetForm++;
				}
				gridRefPA510.value?.instance.deselectAll();
				store.state.common.pa510.selectedRowKeys = [
					store.state.common.pa510.incomeId,
				];
			}
		});
		watch(() => store.state.common.pa510.loadingTableInfo, (newVal) => {
			originData.value.imputedYear = paYear.value;
			trigger.value = true; //reset data table 1
			dataGridRef.value?.refresh();
			// IncomeWageDailiesTrigger.value = true; //reset data table 2
		});
		watch(() => store.state.common.activeTab, (newVal) => {
			if (newVal.id == "pa-510") {
				if (store.state.common.pa510.statusFormAdd) {
					return;
				}
				if (!(store.state.common.pa510.statusChangeFormEdit && !store.state.common.pa510.statusFormAdd)) {
					IncomeWageDailiesTrigger.value = true; //reset data table 2
					!store.state.common.pa510.statusRowAdd ? (store.state.common.pa510.statusRowAdd = true) : "";
				}
			}
		});
		watch(() => status.value, (newVal) => {
			if (userType != "m" && (newVal == 30 || newVal == 40)) {
				store.state.common.pa510.statusDisabledStatus = true;
			} else {
				store.state.common.pa510.statusDisabledStatus = false;
			}
		});
		watch(() => store.state.common.pa510.addRow, (newVal) => {
			gridRefPA510.value?.instance.deselectAll();
			dataRows.value = [];
		});
		watch(() => store.state.common.pa510.openModalCopyMonth, (value) => {
			dataModalCopy.value = monthCopy.value;
			modalCopy.value = true;
		});
		watch(() => store.state.common.pa510.refreshDataGridRef, (value) => {
			dataGridRef.value?.refresh();
		});
		// ======================= FUNCTION ================================
		// Calling the actionChangeIncomeProcess function with the parameters companyId, processKey,
		// and status.
		const statusComfirm = () => {
			actionChangeIncomeProcess({
				companyId: companyId,
				processKey: { ...processKey.value },
				status: status.value,
			});
		};

		// A function that is called when the selection of the grid changes.
		const selectionChanged = (data: any) => {
			dataRows.value = data.selectedRowsData;
			if (data.selectedRowsData.find((element: any) => element.incomeId == "PA510" ?? null)) {
				gridRefPA510.value?.instance.deselectAll();
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
				store.state.common.pa510.actionCallGetMonthDetail++;
			}
			for (let i = 1; i <= 12; i++) { // xóa month vừa copy nhưng không thêm data
				if (!dataSource.value[0]["month" + i]?.companyId) {
					delete dataSource.value[0]["month" + i]
				}
			}
			dataMonthNew.value = month;
			if (checkChangeForm.value) {
				modalChangeRow.value = true;
				hoverColClick.value = month.imputedMonth;
				store.state.common.pa510.checkClickMonth = true;
			} else {
				activeNewMonth(month);
			}
		};

		// A function that is called when a user clicks on a button.
		const activeNewMonth = (month: any) => {
			status.value = month.status;
			processKey.value.imputedYear = month.imputedYear;
			processKey.value.imputedMonth = month.imputedMonth;
			processKey.value.paymentYear = month.paymentYear;
			processKey.value.paymentMonth = month.paymentMonth;
			IncomeWageDailiesTrigger.value = true;
			statusDisabledBlock.value = false;
			store.state.common.pa510.statusRowAdd = true;
			hoverColClick.value = 0;
		};

		const statusComfirmChange = async (res: any) => {
			if (res) {
				store.state.common.pa510.actionSubmit++;
			} else {
				store.state.common.pa510.statusChangeFormEdit = false;
				store.state.common.pa510.statusChangeFormAdd = false;
				if (!store.state.common.pa510.statusRowAdd) {
					store.state.common.pa510.statusFormAdd = false;
					store.state.common.pa510.dataTaxPayInfo = store.state.common.pa510.dataTaxPayInfo.splice(0, store.state.common.pa510.dataTaxPayInfo.length - 1);
					store.state.common.pa510.statusRowAdd = true;
				}
				if (store.state.common.pa510.checkClickMonth) {
					activeNewMonth(dataMonthNew.value);
					store.state.common.pa510.checkClickMonth = false;
					return;
				}
				if (store.state.common.pa510.checkClickCopyMonth) {
					store.state.common.pa510.checkClickCopyMonth = false;
					dataModalCopy.value = monthCopy.value;
					modalCopy.value = true;
				}
				store.state.common.pa510.incomeId = store.state.common.pa510.dataRowOnActive.incomeId;
				store.state.common.pa510.loadingFormData++;
			}
		};

		const copyMonth = (month: number) => {
			monthCopy.value = month;
			if (checkChangeForm.value) {
				modalChangeRow.value = true;
				store.state.common.pa510.checkClickCopyMonth = true;
				hoverColClick.value = month;
			} else {
				dataModalCopy.value = monthCopy.value;
				modalCopy.value = true;
			}
		};
		const dataAddIncomeProcess = (data: any) => {
			for (let i = 1; i <= 12; i++) { // xóa month vừa copy nhưng không thêm data
				if (!dataSource.value[0]["month" + i]?.companyId) {
					delete dataSource.value[0]["month" + i]
				}
			}
			dataSource.value[0]["month" + data.imputedMonth] = data;
			dataSource.value[0]["month" + data.imputedMonth].status = 10;
			status.value = 10;
			IncomeWageDailiesTrigger.value = true; //reset data table 2
			statusDisabledBlock.value = false;
		};
		const customMonthlyWage = () => {
			let sum = 0;
			store.state.common.pa510.dataTaxPayInfo?.map((row: any) => {
				sum += row.monthlyWage;
			});
			return `월급여합계 <span>[${filters.formatCurrency(sum)}]</span>`;
		};
		const customTotalDeduction = () => {
			let sum = 0;
			store.state.common.pa510.dataTaxPayInfo?.map((row: any) => {
				sum += row.totalDeduction;
			});
			return `공제합계 <span>[${filters.formatCurrency(sum)}]</span> `;
		};
		const customActualPayment = () => {
			let sum = 0;
			store.state.common.pa510.dataTaxPayInfo?.map((row: any) => {
				sum += row.actualPayment;
			});
			return `차인지급액합계 <span>[${filters.formatCurrency(sum)}]</span>`;
		};
		// Preventing the user from selecting a row by clicking on the select button.
		const onFocusedRowChanging = (e: any) => {
			if (
				!(e.event.currentTarget.outerHTML.search("dx-command-select") == -1)
			) {
				e.cancel = true;
			} else {
				const rowElement = e.rowElement[0];
				store.state.common.pa510.dataRowOnActive = e.rows[e.newRowIndex]?.data;
				if (e.rows[e.newRowIndex]?.data.employeeId) {
					// if row data (not row add)
					if (checkChangeForm.value) {
						rowElement?.classList.add("dx-state-hover-custom");
						modalChangeRow.value = true;
						e.cancel = true;
					} else {
						if (
							store.state.common.pa510.dataTaxPayInfo[
								store.state.common.pa510.dataTaxPayInfo.length - 1
							]?.employee.employeeId == null
						) {
							store.state.common.pa510.dataTaxPayInfo =
								store.state.common.pa510.dataTaxPayInfo.splice(
									0,
									store.state.common.pa510.dataTaxPayInfo.length - 1
								);
							store.state.common.pa510.statusRowAdd = true;
						}
						store.state.common.pa510.incomeId = e.rows[e.newRowIndex]?.data.incomeId;
						store.state.common.pa510.selectedRowKeys = [e.rows[e.newRowIndex]?.data.incomeId];
						dataGridRef.value?.refresh();
						store.state.common.pa510.loadingFormData++;
						if (store.state.common.pa510.statusRowAdd) {
							store.state.common.pa510.statusFormAdd = false;
						}
					}
				}
			}
		};
		const checkShowTagStatus = (data: any) => {
			if (data.status == 0) {
				if (data.leavedAt?.toString().slice(0, 6) == `${paYear.value}${filters.formatMonth(processKey.value.imputedMonth)}`
				) {
					return 0;
				}
				return 50;
			} else {
				return data.status;
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
		return {
			processKey,
			loading,
			status,
			dataSource,
			per_page,
			move_column,
			colomn_resize,
			selectionChanged,
			dataCustomRes,
			showDetailSelected,
			dataRows,
			loadingTaxPayInfo,
			copyMonth,
			modalCopy,
			dataModalCopy,
			dataAddIncomeProcess,
			statusComfirm,
			store,
			modalChangeRow,
			statusComfirmChange,
			gridRefPA510,
			statusDisabledBlock,
			Message,
			customMonthlyWage,
			customTotalDeduction,
			customActualPayment,
			onFocusedRowChanging,
			hoverColClick,
			checkStartYearMonth,
			classObject,
			classObjectDetail,
			checkShowTagStatus,
			checkChangeForm,
		};
	},
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
