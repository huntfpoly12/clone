<template>
	<div id="pa-110">
		<a-spin :key="countKey" :spinning="loading || loadingGetEmployeeWage" size="large">
			<StandardForm formName="pa-110-form" ref="pa110FormRef">
				<a-row class="row-1">
					<a-col :span="12">
						<a-form-item label="사원" :class="statusFormAdd ? 'red' : ''">
							<EmploySelect :arrayValue="arrayEmploySelect" :disabled="!statusFormAdd ||
								store.state.common.pa110.statusDisabledStatus || statusMidTermSettlement2
								" :required="true" v-model:valueEmploy="dataIW.employee.employeeId" width="316px" @onChange="onUpdateValue" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="지급일" class="red">
							<date-time-box-custom ref="requiredPaymentDay" width="150px" :required="true"
								:startDate="startDate" :finishDate="finishDate" v-model:valueDate="dataIW.paymentDay"
								:disabled="!statusFormAdd || store.state.common.pa110.statusDisabledStatus || statusMidTermSettlement2" />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="16" :spinning="loadingGetEmployeeWage">
					<a-col :span="14">
						<div class="header-text-2">요약</div>
						<div class="summary">
							<div class="d-flex-center">
								<span class="w-120">소득수당합계</span>
								<number-box-money :disabled="true" width="100px" v-model:valueInput="totalPayItem" />
								<span class="pl-5">원</span>
								<a-tooltip color="black" placement="top">
									<template #title>수당 합계 = 수당 과세 + 수당 비과세</template>
									<img src="@/assets/images/iconInfo.png" class="img-info" />
								</a-tooltip>
							</div>
							<div class="text1 d-flex-center">
								<span class="w-110">수당 과세합계</span>
								<number-box-money :disabled="true" width="100px" v-model:valueInput="totalPayItemTaxFree" />
								<span class="pl-5">원</span>
							</div>
							<div class="text2 d-flex-center">
								<span class="w-110">수당 비과세 합계</span>
								<number-box-money :disabled="true" width="100px" v-model:valueInput="totalPayItemTax" />
								<span class="pl-5">원</span>
							</div>
							<div class="d-flex-center">
								<span class="w-120">공제 합계</span>
								<number-box-money :disabled="true" width="100px" v-model:valueInput="totalDeduction" />
								<span class="pl-5">원</span>
							</div>
							<div class="d-flex-center">
								<span class="w-120">차인지급액</span>
								<number-box-money :disabled="true" width="100px" v-model:valueInput="subPayment" />
								<span class="pl-5">원</span>
								<a-tooltip color="black" placement="top">
									<template #title>차인지급액 = 수당 합계 - 공제 합계</template>
									<img src="@/assets/images/iconInfo.png" class="img-info" />
								</a-tooltip>
							</div>
						</div>
					</a-col>
					<a-col :span="10" class="input-items">
						<div class="header-text-2">
							근로시간
							<a-tooltip color="black" placement="top">
								<template #title>사원별 급여명세서에 표시 됩니다.</template>
								<img src="@/assets/images/iconInfo.png" class="img-info" />
							</a-tooltip>
						</div>
						<a-form-item label="근무일수" label-align="right">
							<div style="display: flex; align-items: center">
								<number-box
									:disabled="store.state.common.pa110.statusDisabledStatus || statusMidTermSettlement2"
									:spinButtons="true" :min="0" :max="31" width="100px"
									v-model:valueInput="dataIW.workingDays" :required="true" />
								<span style="padding-left: 5px">일</span>
							</div>
						</a-form-item>
						<a-form-item label="총근로시간" label-align="right">
							<div style="display: flex; align-items: center">
								<number-box
									:disabled="store.state.common.pa110.statusDisabledStatus || statusMidTermSettlement2"
									:spinButtons="true" :min="0" width="100px" v-model:valueInput="dataIW.totalWorkingHours"
									:required="true" />
								<span style="padding-left: 5px">시간</span>
							</div>
						</a-form-item>
						<a-form-item label="연장근로시간" label-align="right">
							<div style="display: flex; align-items: center">
								<number-box
									:disabled="store.state.common.pa110.statusDisabledStatus || statusMidTermSettlement2"
									:spinButtons="true" :min="0" width="100px"
									v-model:valueInput="dataIW.overtimeWorkingHours" :required="true" />
								<span style="padding-left: 5px">시간</span>
							</div>
						</a-form-item>
						<a-form-item label="야간근로시간" label-align="right">
							<div style="display: flex; align-items: center">
								<number-box
									:disabled="store.state.common.pa110.statusDisabledStatus || statusMidTermSettlement2"
									:spinButtons="true" :min="0" width="100px"
									v-model:valueInput="dataIW.workingHoursAtNight" :required="true" />
								<span style="padding-left: 5px">시간</span>
							</div>
						</a-form-item>
						<a-form-item label="휴일근로시간" label-align="right">
							<div style="display: flex; align-items: center">
								<number-box
									:disabled="store.state.common.pa110.statusDisabledStatus || statusMidTermSettlement2"
									:spinButtons="true" :min="0" width="100px"
									v-model:valueInput="dataIW.workingHoursOnHolidays" :required="true" />
								<span style="padding-left: 5px">시간</span>
							</div>
						</a-form-item>
					</a-col>
				</a-row>
				<div class="header-text-3">급여 / 공제</div>
				<a-row :gutter="16">
					<a-col :span="13">
						<div class="header-text-2">
							급여 {{ $filters.formatCurrency(totalPayItem) }} 원 = 과세
							{{ $filters.formatCurrency(totalPayItemTaxFree) }} + 비과세
							{{ $filters.formatCurrency(totalPayItemTax) }}
						</div>
						<a-spin :spinning="loadingConfigPayItems" size="large">
							<div class="deduction-main">
								<div v-for="item in dataConfigPayItems" :key="item.name" class="custom-deduction">
									<span>
										<deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2"
											:name="item.name" :type="1" subName="과세" :showTooltip="false"
											:width="'130px'" />
										<deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2"
											:name="item.name" :type="2" subName="상여(과세)" :showTooltip="false"
											:width="'130px'" />
										<deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
											:name="item.name" :type="3" :showTooltip="false" :subName="item.taxfreePayItemCode +
												' ' +
												item.taxfreePayItemName +
												' ' +
												item.taxFreeIncludeSubmission
												" :width="'130px'" />
										<deduction-items v-if="item.taxPayItemCode == null &&
											item.taxfreePayItemCode == null
											" :name="item.name" :type="4" subName="공제" :showTooltip="false" :width="'130px'" />
									</span>
									<div>
										<number-box-money
											:disabled="store.state.common.pa110.statusDisabledStatus || statusMidTermSettlement2"
											width="130px" @changeInput="onChangeInputPayItem" :spinButtons="false"
											:rtlEnabled="false" v-model:valueInput="item.amount" :min="0">
										</number-box-money>
										<span class="pl-5">원</span>
									</div>
								</div>
							</div>
						</a-spin>
					</a-col>
					<a-col :span="11">
						<div class="header-text-2">
							공제 {{ $filters.formatCurrency(totalDeduction) }} 원
						</div>
						<a-spin :spinning="loadingConfigDeductions" size="large">
							<div class="deduction-main">
								<div v-for="(item, index) in dataConfigDeductions" :key="index" class="custom-deduction">
									<span>
										<deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2"
											:name="item.name" :type="1" :showTooltip="false" subName="과세" />
										<deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2"
											:name="item.name" :type="2" :showTooltip="false" subName="상여(과세)" />
										<deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
											:name="item.name" :type="3" :showTooltip="false" :subName="item.taxfreePayItemCode +
												' ' +
												item.taxfreePayItemName +
												' ' +
												item.taxFreeIncludeSubmission
												" />
										<deduction-items v-if="item.taxPayItemCode == null &&
											item.taxfreePayItemCode == null
											" :name="item.name" :width="'130px'" :type="4" :showTooltip="false" subName="공제" />
									</span>
									<div>
										<a-tooltip v-if="statusFormAdd" color="black" placement="top" zIndex="9999"
											:class="item.itemCode == 1012 && localIncomeBoo ? 'red' : ''"
											:title="item.itemCode == 1012 && localIncomeBoo ? '소액징수부면제 적용' + localReal : ''">
											<!-- <template #title>
                                            소액징수부면제 적용 {{ localReal }}
                                        </template> -->
											<span>
												<number-box-money width="130px" :spinButtons="false"
													v-model:valueInput="item.amount" @changeInput="onChangeInputDeduction"
													:disabled="store.state.common.pa110.statusDisabledStatus || statusMidTermSettlement2
														" format="#0,###" />
											</span>
										</a-tooltip>
										<number-box-money v-else
											:disabled="store.state.common.pa110.statusDisabledStatus || statusMidTermSettlement2"
											width="130px" @changeInput="onChangeInputDeduction" :spinButtons="false"
											v-model:valueInput="item.amount" format="#0,###">
										</number-box-money>
										<span class="pl-5">원</span>
									</div>
								</div>
							</div>
						</a-spin>
					</a-col>
				</a-row>
				<div class="text-align-center mt-20 mb-10" style="display: flex; justify-content: center">
					<a-tooltip placement="top" :overlayStyle="{ maxWidth: '500px' }">
						<template #title>입력된 급여 금액으로 공제 재계산합니다.</template>
						<div>
							<button-tooltip-error
								:disabled="store.state.common.pa110.statusDisabledStatus || statusMidTermSettlement2"
								:statusChange="store.state.common.pa110.statusChangeFormPrice
									" @onClick="actionDedution" />
						</div>
					</a-tooltip>
					<a-tooltip placement="top">
						<template #title>4대보험 EDI 의 공제 금액이 있는 경우, 조회 후
							적용합니다</template>
						<div>
							<button-basic :disabled="store.state.common.pa110.statusDisabledStatus || true
								" style="margin: 0px 5px" @onClick="modalInsurance = true" mode="contained" type="default"
								text="4대보험 EDI 조회/적용" />
						</div>
					</a-tooltip>
					<a-tooltip placement="top">
						<template #title>중도퇴사자 연말정산 반영</template>
						<div>
							<button-basic
								:disabled="store.state.common.pa110.statusDisabledStatus || !statusMidTermSettlement1"
								style="margin: 0px 5px" @onClick="actionCalculateMTS" mode="contained" type="default"
								text="중도정산 반영" />
						</div>
					</a-tooltip>
					<a-tooltip placement="top">
						<template #title>중도퇴사자 연말정산 반영분 삭제</template>
						<div>
							<button-basic
								:disabled="store.state.common.pa110.statusDisabledStatus || !statusMidTermSettlement2"
								style="margin: 0px 5px" @onClick="!statusFormAdd ? (modalDeteleMidTerm = true) : ''"
								mode="contained" type="default" text="중도정산 삭제" />
						</div>
					</a-tooltip>
					<button-basic :disabled="store.state.common.pa110.statusDisabledStatus || statusMidTermSettlement2"
						style="margin: 0px 5px" @onClick="onSubmitForm" mode="contained" type="default" text="저장" />
				</div>
			</StandardForm>
		</a-spin>
		<DeductionPopup :modalStatus="modalDeductions" @closePopup="modalDeductions = false" :data="dataConfigDeductions"
			@updateDate="updateDataDeduction" />
		<InsurancePopup :modalStatus="modalInsurance" @closePopup="modalInsurance = false" />
		<MidTermSettlementPopup :modalStatus="modalMidTermSettlement" @closePopup="modalMidTermSettlement = false"
			:data="dataMidTermSettlement" />
		<ConfirmDeletePopup :modalStatus="modalDeteleMidTerm" @closePopup="modalDeteleMidTerm = false"
			@confirmDelete="confirmDeleteMidTermSettlement">중도퇴사자 연말정산 반영분을 삭제하시겠습니까?</ConfirmDeletePopup>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch, computed } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
import {
	companyId,
	calculateNationalPensionEmployee,
	calculateHealthInsuranceEmployee,
	calculateLongTermCareInsurance,
	calculateEmployeementInsuranceEmployee,
} from "@/helpers/commonFunction";
import mutations from "@/graphql/mutations/PA/PA1/PA110/index";
import queries from "@/graphql/queries/PA/PA1/PA110/index";
import notification from "@/utils/notification";
import DxButton from "devextreme-vue/button";
import DeductionPopup from "./Popup/DeductionPopup.vue";
import InsurancePopup from "./Popup/InsurancePopup.vue";
import MidTermSettlementPopup from "./Popup/MidTermSettlementPopup.vue";
import queries120 from "@/graphql/queries/PA/PA1/PA120/index";
import { sampleDataIncomeWage } from "../utils/index";
import { Message } from "@/configs/enum";
import dayjs from "dayjs";
import filters from "@/helpers/filters";
export default defineComponent({
	components: {
		DxButton,
		DeductionPopup,
		InsurancePopup,
		MidTermSettlementPopup,
	},
	props: {
		modalStatus: Boolean,
	},
	setup(props, { emit }) {
		const store = useStore();
		const processKey = computed(() => store.state.common.pa110.processKeyPA110);
		const statusFormAdd = computed(() => store.state.common.pa110.statusFormAdd);
		const paYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? "0"));
		const arrayEmploySelect: any = ref([]);
		let modalDeductions = ref<boolean>(false);
		const modalInsurance = ref<boolean>(false);
		const modalMidTermSettlement = ref<boolean>(false);
		const modalDeteleMidTerm = ref<boolean>(false);
		const triggerDetail = ref<boolean>(false);
		const triggerEmployeeWages = ref<boolean>(true);
		const triggerCalcIncome = ref<boolean>(false);
		const triggerEmployeeWage = ref<boolean>(false);
		const triggerCalculateMidTermSettlement = ref<boolean>(false);
		// const showErrorButton = ref(false)
		const triggerConfigPayItems = ref<boolean>(true);
		const triggerConfigDeductions = ref<boolean>(true);
		const dataIW: any = ref(JSON.parse(JSON.stringify({ ...sampleDataIncomeWage })));
		const originCalculateMidTermSettlement = ref({
			companyId: companyId,
			processKey: computed(() => processKey.value),
			paymentDay: 1,
			employeeId: null,
		})
		const dataMidTermSettlement = ref({
			companyId: companyId,
			processKey: computed(() => processKey.value),
			paymentDay: 1,
			employeeId: null,
			data: [{}],
		});
		const dataConfigPayItems: any = ref([]);
		const dataConfigDeductions: any = ref([]);
		const dataEmployeeWageDailies: any = ref([]);

		const countKey: any = ref(0);
		const localIncomeBoo = ref(false);
		const localReal = ref(0);
		const originDataEmployeeWage = {
			companyId: companyId,
			imputedYear: paYear.value,
			employeeId: null,
		};
		const calculateVariables = {
			companyId: companyId,
			imputedYear: paYear.value,
			totalTaxPay: 0,
			dependentCount: 1,
		};
		const originData = {
			companyId: companyId,
			imputedYear: paYear.value,
		};
		const originDataConfig = {
			companyId: companyId,
			imputedYear: paYear.value,
			useOnly: true,
		};
		const incomeWageParams = {
			companyId: companyId,
			processKey: computed(() => processKey.value),
			incomeId: 0,
		};

		const totalPayItem = ref<number>(0);
		const totalPayItemTax = ref<number>(0);
		const totalPayItemTaxFree = ref<number>(0);
		const totalDeduction = ref<number>(0);
		const subPayment = ref<number>(0);

		let statusMidTermSettlement1 = ref<boolean>(true);
		const statusMidTermSettlement2 = computed(() => store.state.common.pa110.statusMidTermSettlement2);
		// let statusMidTermSettlement2 = ref<boolean>(true);
		let requiredPaymentDay = ref();
		const startDate = computed(() => dayjs(`${paYear.value}-${processKey.value.paymentMonth}`).startOf("month").toDate());
		const finishDate = computed(() => dayjs(`${paYear.value}-${processKey.value.paymentMonth}`).endOf("month").toDate());
		// ============ GRAPQL ===============================
		// get employeewage
		const { loading: loadingEmployeeWage, onResult: resEmployeeWage
		} = useQuery(queries.getEmployeeWages, originData, () => ({
			enabled: triggerEmployeeWages.value,
			fetchPolicy: "no-cache",
		}));
		const { onResult: resConfigPayItems, loading: loadingConfigPayItems,
		} = useQuery(queries.getWithholdingConfigPayItems, originDataConfig, () => ({
			enabled: triggerConfigPayItems.value,
			fetchPolicy: "no-cache",
		}));
		const { onResult: resConfigDeductions, loading: loadingConfigDeductions
		} = useQuery(queries.getWithholdingConfigDeductionItems, originDataConfig, () => ({
			enabled: triggerConfigDeductions.value,
			fetchPolicy: "no-cache",
		}));
		const { result, loading } = useQuery(queries.getIncomeWage, incomeWageParams, () => ({
			fetchPolicy: "no-cache",
			enabled: triggerDetail.value,
		}));
		const { result: resCalcIncomeWageTax, onError: onIncomeWageTaxError
		} = useQuery(queries.calculateIncomeWageTax, calculateVariables, () => ({
			enabled: triggerCalcIncome.value,
			fetchPolicy: "no-cache",
		}));
		const { result: resultEmployeeWage, loading: loadingGetEmployeeWage
		} = useQuery(queries120.getEmployeeWage, originDataEmployeeWage, () => ({
			fetchPolicy: "no-cache",
			enabled: triggerEmployeeWage.value,
		}));
		const { result: resultCalculateMidTermSettlement, onError: onErrorCalculateMidTermSettlement
		} = useQuery(queries.calculateMidTermSettlement, originCalculateMidTermSettlement, () => ({
			fetchPolicy: "no-cache",
			enabled: triggerCalculateMidTermSettlement.value,
		}));

		// API EDIT
		const {
			mutate: actionUpdate,
			onError: errorUpdate,
			onDone: actionUpdateDone,
		} = useMutation(mutations.updateIncomeWage);
		const {
			mutate: actionCreated,
			onError: errorCreated,
			onDone: doneCreated,
		} = useMutation(mutations.createIncomeWage);
		const {
			mutate: actionMidTermSettlement,
			onDone: doneMidTermSettlement,
			onError: errorMidTermSettlement,
		} = useMutation(
			mutations.deleteMidTermSettlement
		);

		// ===================DONE GRAPQL==================================
		doneMidTermSettlement(() => {
			notification("success", Message.getMessage("COMMON", "402").message);
			store.state.common.pa110.dataIncomeIdBackend = dataIW.value.incomeId
			store.state.common.pa110.statusClickButtonSave = true;
			store.state.common.pa110.loadingTableInfo++;
		});
		errorMidTermSettlement((e: any) => {
			//notification('error', e.message)
		});
		resEmployeeWage((value) => {
			triggerEmployeeWages.value = false;
			dataEmployeeWageDailies.value = value.data.getEmployeeWages;
			resetArrayEmploySelect();
		});
		resConfigPayItems((value) => {
			triggerConfigPayItems.value = false;
			if (value) {
				dataConfigPayItems.value = [];
				value.data.getWithholdingConfigPayItems.map((item: any) => {
					dataConfigPayItems.value.push({
						itemCode: item.itemCode,
						name: item.name,
						amount: 0,
						taxPayItemCode: item.taxPayItemCode,
						taxfreePayItemCode: item.taxfreePayItemCode,
						taxfreePayItemName: item.taxfreePayItemName,
						taxFreeIncludeSubmission: item.taxFreeIncludeSubmission,
					});
				});
			}
		});
		resConfigDeductions((value) => {
			triggerConfigDeductions.value = false;
			if (value) {
				dataConfigDeductions.value = [];
				value.data.getWithholdingConfigDeductionItems.map((item: any) => {
					if ([1001, 1002, 1003, 1004, 1011, 1012, 1031, 1032].includes(item.itemCode)) {
						let amount = 0;
						dataConfigDeductions.value.push({
							itemCode: item.itemCode,
							name: item.name,
							amount: amount,
						});
					}
				});
			}
		});
		onIncomeWageTaxError((e) => {
			//notification('error', e.message)
		});
		onErrorCalculateMidTermSettlement((e) => {
			//notification('error', e.message)
		})
		errorUpdate(async (e) => {
			//notification('error', e.message)
		});
		actionUpdateDone(async (res) => {
			notification("success", Message.getMessage("COMMON", "106").message);
			store.state.common.pa110.dataIncomeIdBackend = res.data.updateIncomeWage?.incomeId;
			if (store.state.common.pa110.checkClickCopyMonth) {
				// nếu trước đó ấn button copy month
				store.state.common.pa110.checkClickCopyMonth = false;
				store.state.common.pa110.openModalCopyMonth++;
				// return
			}
			await store.state.common.pa110.loadingTableInfo++;
		});
		doneCreated(async (res) => {
			notification("success", Message.getMessage("COMMON", "101").message);
			store.state.common.pa110.dataIncomeIdBackend = res.data.createIncomeWage?.incomeId;
			if (store.state.common.pa110.checkClickCopyMonth) {
				// nếu trước đó ấn button copy month
				store.state.common.pa110.checkClickCopyMonth = false;
				store.state.common.pa110.openModalCopyMonth++;
				// return
			}
			await store.state.common.pa110.loadingTableInfo++;
		});

		errorCreated(async (res) => {
			// notification("error", res.message);
		});

		// ===================WATCH==================================
		watch(() => store.state.common.pa110.loadingFormData, (value) => {
			if (
				store.state.common.pa110.incomeId &&
				store.state.common.pa110.incomeId != "PA110"
			) {
				incomeWageParams.incomeId = store.state.common.pa110.incomeId;
				triggerDetail.value = true;
			} else {
				if (!statusFormAdd.value) {
					onResetForm();
				}
			}
		});

		watch(() => dataConfigDeductions.value, (value) => {
			if (statusFormAdd.value) {
				localIncomeBoo.value = value.find((item: any) => item.itemCode == 1012).amount < 1000;
				localReal.value = value.find((item: any) => item.itemCode == 1012).amount ? value.find((item: any) => item.itemCode == 1012).amount : localReal.value;
				value.find((item: any) => item.itemCode == 1012).amount = value.find((item: any) => item.itemCode == 1012).amount < 1000 ? 0 : value.find((item: any) => item.itemCode == 1012).amount;
			}

			calculateTax();
		}, { deep: true });

		watch(() => dataConfigPayItems.value, (value) => {
			// store.state.common.pa110.statusChangeFormEdit = true;
			// store.state.common.pa110.statusChangeFormPrice = true;
			calculateTax();
		}, { deep: true });

		watch(() => store.state.common.activeTab, (newVal) => {
			if (newVal.id == "pa-110") {
				triggerEmployeeWages.value = true; //reset data table 2
			}
		});

		// reset form data
		watch(() => store.state.common.pa110.actionResetForm, (value) => {
			onResetForm();
		});

		watch(() => store.state.common.pa110.addRow, (newVal) => {
			localReal.value = 0
			store.state.common.pa110.statusClickButtonAdd = false;
			store.state.common.pa110.dataTaxPayInfo =
				store.state.common.pa110.dataTaxPayInfo.concat(
					JSON.parse(JSON.stringify({ ...sampleDataIncomeWage }))
				);
			dataIW.value = store.state.common.pa110.dataTaxPayInfo[store.state.common.pa110.dataTaxPayInfo.length - 1];
			dataIW.value.paymentDay = sampleDataIncomeWage.paymentDay ?
				parseInt(`${paYear.value}${filters.formatMonth(processKey.value.paymentMonth)}${filters.formatMonth(sampleDataIncomeWage.paymentDay)}`)
				: parseInt(`${paYear.value}${filters.formatMonth(processKey.value.paymentMonth)}${filters.formatMonth(
					dayjs(`${paYear.value}-${processKey.value.paymentMonth}`).daysInMonth())}`
				);
			store.state.common.pa110.focusedRowKey = "PA110";
			onResetForm();
		});

		watch(() => statusFormAdd.value, (value) => {
			if (value) {
				countKey.value++;
				dataConfigDeductions.value.map((data: any) => {
					data.amount = 0;
				});
				dataConfigPayItems.value.map((data: any) => {
					data.amount = 0;
				});
				setTimeout(() => {
					store.state.common.pa110.statusChangeFormPrice = false;
					store.state.common.pa110.statusChangeFormAdd = false;
				}, 500);
				statusMidTermSettlement1.value = false;
				store.state.common.pa110.statusMidTermSettlement2 = false;
			} else {
				// arrayEmploySelect.value = dataEmployeeWageDailies.value
			}
			resetArrayEmploySelect();
		});
		watch(() => dataIW.value, (value, oldVal) => {
			if (statusFormAdd.value) {
				if (
					JSON.stringify({ ...sampleDataIncomeWage }) !==
					JSON.stringify(dataIW.value)
				) {
					store.state.common.pa110.statusChangeFormAdd = true;
					// if (!store.state.common.pa110.statusRowAdd) {
					//     store.state.common.pa110.statusChangeFormEdit = true
					// }
				} else {
					store.state.common.pa110.statusChangeFormAdd = false;
				}
			} else {
				if (
					JSON.stringify(store.state.common.pa110.dataRowOld) !==
					JSON.stringify(dataIW.value) &&
					store.state.common.pa110.dataRowOld
				) {
					store.state.common.pa110.statusChangeFormEdit = true;
				} else {
					store.state.common.pa110.statusChangeFormEdit = false;
				}
			}
		}, { deep: true });
		watch(() => store.state.common.pa110.resetArrayEmploySelect, (newVal) => {
			resetArrayEmploySelect();
		});

		watch(() => store.state.common.pa110.actionSubmit, () => {
			store.state.common.pa110.statusClickButtonSave = false;
			submitForm();
		});

		watch(result, async (value) => {
			triggerDetail.value = false;
			let data = value.getIncomeWage;
			if (data) {
				await dataConfigPayItems.value?.map((row: any) => {
					row.amount = 0;
					data.payItems?.map((item: any) => {
						if (row.itemCode == item.itemCode) {
							row.amount = item.amount;
						}
					});
				});

				await dataConfigDeductions.value?.map((row: any) => {
					row.amount = 0;
					data.deductionItems?.map((item: any) => {
						if (row.itemCode == item.itemCode) {
							row.amount = item.amount;
						}
					});
				});
				if (data.midTermSettlement != null) {
					statusMidTermSettlement1.value = data.midTermSettlement ? false : true;
					store.state.common.pa110.statusMidTermSettlement2 = data.midTermSettlement ? true : false;
				} else {
					statusMidTermSettlement1.value = false;
					store.state.common.pa110.statusMidTermSettlement2 = false;
				}

				dataIW.value.employee.employeeId = data.employee.employeeId;
				dataIW.value.paymentDay = parseInt(
					`${paYear.value}${filters.formatMonth(
						processKey.value.paymentMonth
					)}${filters.formatMonth(data.paymentDay)}`
				);

				dataIW.value.workingDays = data.workingDays;
				dataIW.value.incomeId = data.incomeId;

				dataIW.value.totalWorkingHours = data.totalWorkingHours;
				dataIW.value.overtimeWorkingHours = data.overtimeWorkingHours;
				dataIW.value.workingHoursAtNight = data.workingHoursAtNight;
				dataIW.value.workingHoursOnHolidays = data.workingHoursOnHolidays;

				dataIW.value.employee.nationalPensionDeduction =
					data.employee.nationalPensionDeduction;
				dataIW.value.employee.healthInsuranceDeduction =
					data.employee.healthInsuranceDeduction;
				dataIW.value.employee.employeementInsuranceDeduction =
					data.employee.employeementInsuranceDeduction;
				dataIW.value.employee.nationalPensionSupportPercent =
					data.employee.nationalPensionSupportPercent;
				dataIW.value.employee.employeementInsuranceSupportPercent =
					data.employee.employeementInsuranceSupportPercent;

				store.state.common.pa110.dataRowOld = { ...dataIW.value };
				store.state.common.pa110.focusedRowKey = data.incomeId;
			}
			// localIncomeBoo.value = false;
			store.state.common.pa110.statusChangeFormAdd = false;
			store.state.common.pa110.statusChangeFormEdit = false;
			// store.state.common.pa110.statusChangeFormPrice = false;
			if (store.state.common.pa110.statusClickEditItem) {
				store.state.common.pa110.onEditItem++;
			}
			store.state.common.pa110.refreshDataGridRef++;
		});
		watch(resCalcIncomeWageTax, (value) => {
			triggerCalcIncome.value = false;
			if (value) {
				dataConfigDeductions.value.find(
					(item: any) => item.itemCode == 1011
				).amountNew = value.calculateIncomeWageTax;
				dataConfigDeductions.value.find(
					(item: any) => item.itemCode == 1012
				).amountNew = Math.floor(value.calculateIncomeWageTax / 100) * 10;
			}
		});

		watch(resultEmployeeWage, async (newVal: any) => {
			triggerEmployeeWage.value = false;
			if (statusFormAdd.value) {
				await (dataIW.value.employee.name = newVal.getEmployeeWage.name);
				await (dataIW.value.employee.status = newVal.getEmployeeWage.status);
				await (dataIW.value.employee.foreigner =
					newVal.getEmployeeWage.foreigner);

				await (dataIW.value.totalPay = newVal.getEmployeeWage.totalPay);

				await (dataIW.value.employee.nationalPensionDeduction =
					newVal.getEmployeeWage.nationalPensionDeduction);
				await (dataIW.value.employee.healthInsuranceDeduction =
					newVal.getEmployeeWage.healthInsuranceDeduction);
				await (dataIW.value.employee.employeementInsuranceDeduction =
					newVal.getEmployeeWage.employeementInsuranceDeduction);
				await (dataIW.value.employee.nationalPensionSupportPercent =
					newVal.getEmployeeWage.nationalPensionSupportPercent);
				await (dataIW.value.employee.employeementInsuranceSupportPercent =
					newVal.getEmployeeWage.employeementInsuranceSupportPercent);
				await (dataIW.value.employee.employeementReductionRatePercent =
					newVal.getEmployeeWage.employeementReductionRatePercent);
				await (dataIW.value.employee.incomeTaxMagnification =
					newVal.getEmployeeWage.incomeTaxMagnification);
				dataConfigPayItems.value?.map((row: any) => {
					row.amount = 0;
					newVal.getEmployeeWage.payItems?.map((item: any) => {
						if (row.itemCode == item.itemCode) {
							row.amount = item.amount;
						}
					});
				});
				dataConfigDeductions.value?.map((row: any) => {
					row.amount = 0;
					newVal.getEmployeeWage.deductionItems?.map((item: any) => {
						if (row.itemCode == item.itemCode) {
							row.amount = item.amount;
						}
					});
				});
				await calculateTax();
			}
			calculateVariables.dependentCount = newVal.getEmployeeWage.deductionDependentCount;
			// await (store.state.common.pa110.statusChangeFormPrice = false)
		});

		watch(resultCalculateMidTermSettlement, (data: any) => {
			triggerCalculateMidTermSettlement.value = false;
			dataMidTermSettlement.value.data = []
			dataConfigDeductions.value.map((item: any) => {
				if ([1031, 1032].includes(item.itemCode)) {
					dataMidTermSettlement.value.data.push({
						// itemCode: item.itemCode,
						name: item.name,
						amount: item.amount,
						amountNew: item.itemCode == 1031 ? data.calculateMidTermSettlement : 0
					});
				}
			});
			dataMidTermSettlement.value.employeeId = dataIW.value.employee.employeeId
			dataMidTermSettlement.value.paymentDay = parseInt(dataIW.value.paymentDay?.toString().slice(6, 8)) ?? 1,
				modalMidTermSettlement.value = true

		})
		// ======================= FUNCTION ================================
		const resetArrayEmploySelect = () => {
			arrayEmploySelect.value = [];
			let data = dataEmployeeWageDailies.value?.filter((data: any) => {
				let statusJoinedAt = data.joinedAt ? parseInt(data.joinedAt.toString().slice(0, 6)) <= parseInt(processKey.value.imputedYear + '' + filters.formatMonth(processKey.value.imputedMonth)) : true
				let statusLeavedAt = data.leavedAt ? parseInt(data.leavedAt.toString().slice(0, 6)) >= parseInt(processKey.value.imputedYear + '' + filters.formatMonth(processKey.value.imputedMonth)) : true
				if (statusJoinedAt && statusLeavedAt) {
					return data
				}
			})
			if (statusFormAdd.value) {
				data.map((dataEmployee: any) => {
					if (!store.state.common.pa110.dataTaxPayInfo.find((dataTaxPay: any) => dataTaxPay.employeeId == dataEmployee.employeeId)) {
						arrayEmploySelect.value.push(dataEmployee);
					}
				});
			} else {
				arrayEmploySelect.value = dataEmployeeWageDailies.value;
			}
		};

		const onChangeInputDeduction = () => {
			if (statusFormAdd.value) {
				store.state.common.pa110.statusChangeFormAdd = true;
			} else {
				store.state.common.pa110.statusChangeFormEdit = true;
			}
		};
		const onChangeInputPayItem = () => {
			store.state.common.pa110.statusChangeFormPrice = true;
			if (statusFormAdd.value) {
				store.state.common.pa110.statusChangeFormAdd = true;
			} else {
				store.state.common.pa110.statusChangeFormEdit = true;
			}
		};
		const pa110FormRef = ref();
		const onSubmitForm = () => {
			store.state.common.pa110.statusClickButtonSave = true;
			submitForm();
		};
		const submitForm = () => {
			var res = pa110FormRef.value.validate();
			if (!res.isValid) {
				res.brokenRules[0].validator.focus();
				if (!dataIW.value.paymentDay) {
					requiredPaymentDay.value.validate(true);
				}
				store.state.common.pa110.refreshDataGridRef++;
				store.state.common.pa110.statusClickEditItem
					? (store.state.common.pa110.statusClickEditItem = false)
					: "";
				store.state.common.pa110.checkClickCopyMonth
					? (store.state.common.pa110.checkClickCopyMonth = false)
					: "";
				store.state.common.pa110.checkClickMonth
					? (store.state.common.pa110.checkClickMonth = false)
					: "";
				store.state.common.pa110.dataRowOnActive = dataIW.value;
			} else {
				if (!dataIW.value.paymentDay) {
					requiredPaymentDay.value.validate(true);
					return;
				}
				let payItems = dataConfigPayItems.value?.map((item: any) => {
					return {
						itemCode: item.itemCode,
						amount: item.amount ? item.amount : 0,
					};
				});
				let deductionItems = dataConfigDeductions.value?.map((item: any) => {
					return {
						itemCode: item.itemCode,
						amount: item.amount ? item.amount : 0,
					};
				});
				const variables: any = {
					companyId: companyId,
					processKey: { ...processKey.value },
					incomeId: store.state.common.pa110.incomeId,
					input: {
						workingDays: dataIW.value.workingDays,
						totalWorkingHours: dataIW.value.totalWorkingHours,
						overtimeWorkingHours: dataIW.value.overtimeWorkingHours,
						workingHoursAtNight: dataIW.value.workingHoursAtNight,
						workingHoursOnHolidays: dataIW.value.workingHoursOnHolidays,
						payItems: payItems,
						deductionItems: deductionItems,
					},
				};
				if (statusFormAdd.value) {
					variables.input.employeeId = dataIW.value.employee.employeeId,
						variables.input.paymentDay = parseInt(dataIW.value.paymentDay?.toString().slice(6, 8)) ?? 1,
						actionCreated(variables);
				} else {
					actionUpdate(variables);
				}
				// }
			}
		};

		//  Calculate Pension Employee
		const calculateTax = async () => {
			await (totalPayItem.value = dataConfigPayItems.value?.reduce((accumulator: any, object: any) => {
				return accumulator + object.amount;
			}, 0));
			await (totalPayItemTax.value = dataConfigPayItems.value?.reduce((accumulator: any, object: any) => {
				if (object.taxfreePayItemCode) {
					accumulator += object.amount;
				}
				return accumulator;
			}, 0));
			await (totalPayItemTaxFree.value = dataConfigPayItems.value?.reduce((accumulator: any, object: any) => {
				if (!object.taxfreePayItemCode) {
					accumulator += object.amount;
				}
				return accumulator;
			}, 0));
			await (totalDeduction.value = dataConfigDeductions.value?.reduce((accumulator: any, object: any) => {
				return accumulator + object.amount;
			}, 0));
			await (subPayment.value = totalPayItem.value - totalDeduction.value);
			if (statusFormAdd.value) {
				await (dataIW.value.totalPay = totalPayItem.value);
				await (dataIW.value.totalDeduction = totalDeduction.value);
				await (dataIW.value.actualPayment = subPayment.value);
			}
		};

		// open popup deduction
		const actionDedution = () => {
			dataConfigDeductions.value?.map((item: any) => {
				if (item.itemCode == 1001) {
					let total1 = dataIW.value.employee.nationalPensionDeduction
						? calculateNationalPensionEmployee(
							totalPayItemTaxFree.value,
							dataIW.value.employee.nationalPensionSupportPercent)
						: 0;
					item.amountNew = total1;
				}
				if (item.itemCode == 1002) {
					let total2 = dataIW.value.employee.healthInsuranceDeduction
						? calculateHealthInsuranceEmployee(totalPayItemTaxFree.value)
						: 0;
					item.amountNew = total2;
				}
				if (item.itemCode == 1003) {
					let total3 = dataIW.value.employee.healthInsuranceDeduction
						? calculateLongTermCareInsurance(totalPayItemTaxFree.value)
						: 0;
					item.amountNew = total3;
				}
				if (item.itemCode == 1004) {
					let total4 = dataIW.value.employee.employeementInsuranceDeduction
						? calculateEmployeementInsuranceEmployee(
							totalPayItemTaxFree.value,
							dataIW.value.employee.employeementInsuranceSupportPercent)
						: 0;
					item.amountNew = total4;
				}
				calculateVariables.totalTaxPay = totalPayItemTaxFree.value;
				triggerCalcIncome.value = true;
			});
			modalDeductions.value = true;
		};
		const actionCalculateMTS = () => {
			originCalculateMidTermSettlement.value.paymentDay = parseInt(dataIW.value.paymentDay?.toString().slice(6, 8)) ?? 1
			originCalculateMidTermSettlement.value.employeeId = dataIW.value.employee.employeeId
			triggerCalculateMidTermSettlement.value = true;
		}
		const updateDataDeduction = async () => {
			await dataConfigDeductions.value?.forEach((val: any, index: number) => {
				if ([1001, 1002, 1003, 1004, 1011, 1012].includes(val.itemCode))
					val.amount = val.amountNew;
			});
			store.state.common.pa110.statusChangeFormPrice = false;
		};

		const onUpdateValue = (employeeId: any) => {
			originDataEmployeeWage.employeeId = employeeId;
			triggerEmployeeWage.value = true;
		};
		const onResetForm = async () => {
			countKey.value++;
			await Object.assign(
				dataIW.value,
				JSON.parse(JSON.stringify({ ...sampleDataIncomeWage }))
			);
			dataIW.value.paymentDay = sampleDataIncomeWage.paymentDay
				? parseInt(
					`${paYear.value}${filters.formatMonth(
						processKey.value.paymentMonth
					)}${filters.formatMonth(sampleDataIncomeWage.paymentDay)}`)
				: parseInt(
					`${paYear.value}${filters.formatMonth(
						processKey.value.paymentMonth
					)}${filters.formatMonth(
						dayjs(
							`${paYear.value}-${processKey.value.paymentMonth}`
						).daysInMonth()
					)}`
				);
			await dataConfigDeductions.value.map((data: any) => {
				data.amount = 0;
			});
			await dataConfigPayItems.value.map((data: any) => {
				data.amount = 0;
			});
			await (store.state.common.pa110.statusChangeFormEdit = false);
			await (store.state.common.pa110.statusChangeFormAdd = false);
			await (store.state.common.pa110.statusFormAdd = true); // trạng thái form add
			await (store.state.common.pa110.statusChangeFormPrice = false);
		};

		const confirmDeleteMidTermSettlement = () => {
			actionMidTermSettlement({
				companyId: companyId,
				processKey: processKey.value,
				paymentDay: parseInt(dataIW.value.paymentDay?.toString().slice(6, 8)) ?? 1,
				employeeId: dataIW.value.employee.employeeId,
			});
		}

		return {
			pa110FormRef,
			loadingConfigPayItems,
			loadingConfigDeductions,
			loading,
			modalDeductions,
			paYear,
			modalInsurance,
			modalMidTermSettlement,
			modalDeteleMidTerm,
			dataIW,
			arrayEmploySelect,
			calculateTax,
			loadingEmployeeWage,
			actionUpdate,
			actionDedution,
			onUpdateValue,
			companyId,
			dataConfigPayItems,
			dataConfigDeductions,
			store,
			countKey,
			loadingGetEmployeeWage,
			updateDataDeduction,
			submitForm,
			onSubmitForm,
			totalPayItem,
			totalPayItemTax,
			totalPayItemTaxFree,
			totalDeduction,
			subPayment,
			onChangeInputDeduction,
			onChangeInputPayItem,
			statusMidTermSettlement1,
			statusMidTermSettlement2,
			startDate,
			finishDate,
			requiredPaymentDay,
			localIncomeBoo,
			localReal, actionCalculateMTS,
			confirmDeleteMidTermSettlement,
			dataMidTermSettlement,
			statusFormAdd,
		};
	},
});
</script>
<style lang="scss" scoped src="../style/styleForm.scss"></style>
