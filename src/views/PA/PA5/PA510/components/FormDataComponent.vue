<template>
	<standard-form action="" name="add-page-210" class="formPA510">
		<a-spin :spinning="loading || loadingIncomeWageDaily">
			<StandardForm formName="pa-510-form" ref="pa510FormRef">
				<a-row :key="countKey">
					<a-col :span="14">
						<a-form-item label="일용직사원" :class="store.state.common.pa510.statusFormAdd ? 'red' : ''">
							<EmploySelect :arrayValue="arrayEmploySelect" :disabled="!store.state.common.pa510.statusFormAdd ||
								store.state.common.pa510.statusDisabledStatus
								" v-model:valueEmploy="dataIncomeWageDaily.employee.employeeId" :required="true" @onChange="onChange"
								:activeType20="false" width="270px" />
						</a-form-item>
						<a-form-item label="지급일" class="red">
							<date-time-box-custom ref="requiredPaymentDay" width="270px" :required="true"
								:startDate="startDate" :finishDate="finishDate"
								v-model:valueDate="dataIncomeWageDaily.paymentDay" :disabled="!store.state.common.pa510.statusFormAdd ||
									store.state.common.pa510.statusDisabledStatus
									" />
						</a-form-item>
					</a-col>
					<a-col :span="10">
						<div class="top-content">
							<a-typography-title :level="5" style="margin-bottom: 0">요약</a-typography-title>
						</div>
						<a-form-item label="근무일수">
							<number-box :disabled="true" v-model:valueInput="dataIncomeWageDaily.workingDays" width="160px"
								:required="true" min="1" :max="31" />
						</a-form-item>
						<a-form-item label="월급여">
							<number-box-money :disabled="true" v-model:valueInput="dataIncomeWageDaily.monthlyWage"
								width="160px" :required="true" />
						</a-form-item>
						<a-form-item label="공제합계">
							<number-box-money :disabled="true" v-model:valueInput="dataIncomeWageDaily.totalDeduction"
								width="160px" :required="true" />
						</a-form-item>
						<div style="display: -webkit-inline-box">
							<a-form-item label="차인지급액">
								<number-box-money :disabled="true" v-model:valueInput="dataIncomeWageDaily.actualPayment"
									width="160px" :required="true" />
							</a-form-item>
						</div>
						<a-tooltip color="black" placement="topLeft">
							<template #title>급여합계 - 공제합계</template>
							<img src="@/assets/images/iconInfo.png" class="img-info" />
						</a-tooltip>
					</a-col>
					<a-col :span="24">
						<div class="top-content">
							<a-typography-title :level="5" style="margin-bottom: 0">급여 / 공제</a-typography-title>
						</div>
					</a-col>
					<a-col :span="10" style="padding-right: 5px">
						<div class="top-content">
							<a-typography-title :level="5" style="margin-bottom: 0">
								월급여
								{{
									dataIncomeWageDaily.employee.monthlyPaycheck
									? $filters.formatCurrency(dataIncomeWageDaily.monthlyWage)
									: $filters.formatCurrency(
										dataIncomeWageDaily.dailyWage *
										dataIncomeWageDaily.workingDays
									)
								}}
								원</a-typography-title>
						</div>
						<div class="input-text red">
							<label>일급/월급:</label>
							<switch-basic :disabled="store.state.common.pa510.statusDisabledStatus" v-model:valueSwitch="dataIncomeWageDaily.employee.monthlyPaycheck
								" :textUnCheck="'월급'" :textCheck="'일급'" />
							<number-box-money :disabled="store.state.common.pa510.statusDisabledStatus"
								@changeInput="onChangePrice" v-if="dataIncomeWageDaily.employee.monthlyPaycheck"
								width="110px" :required="true" placeholder="일급여" :spinButtons="false"
								v-model:valueInput="dataIncomeWageDaily.dailyWage" />
							<number-box-money :disabled="store.state.common.pa510.statusDisabledStatus"
								@changeInput="onChangePrice" v-else width="105px" :required="true" placeholder="월급여"
								:spinButtons="false" v-model:valueInput="dataIncomeWageDaily.monthlyWage" />
							<a-tooltip color="black" placement="top">
								<template #title v-if="dataIncomeWageDaily.employee.monthlyPaycheck">일급 선택시, 월급 = 일급 x
									근무일수</template>
								<template #title v-else>월급 선택시, 일급 = 월급 / 근무일수</template>
								<img src="@/assets/images/iconInfo.png" class="img-info" />
							</a-tooltip>
						</div>
						<a-form-item label="근무일수" class="red">
							<number-box :disabled="store.state.common.pa510.statusDisabledStatus"
								@changeInput="onChangePrice" width="150px"
								v-model:valueInput="dataIncomeWageDaily.workingDays" min="1" :max="31" :required="true" />
						</a-form-item>
						<div style="font-weight: bold">
							<span v-if="!dataIncomeWageDaily.employee.monthlyPaycheck">일급여 {{ showDailyWage() }}원</span>

							<span v-else>일급여
								{{
									$filters.formatCurrency(dataIncomeWageDaily.dailyWage)
								}}원</span>
							<br />

							<span v-if="!dataIncomeWageDaily.employee.monthlyPaycheck">월급여
								{{
									$filters.formatCurrency(dataIncomeWageDaily.monthlyWage)
								}}원</span>

							<span v-else>월급여 {{ showMonthlyWage() }}원</span>
						</div>
					</a-col>
					<a-col :span="14" style="padding-leftt: 5px">
						<div class="top-content">
							<a-typography-title :level="5" style="margin-bottom: 0">공제 항목
								{{
									$filters.formatCurrency(dataIncomeWageDaily.totalDeduction)
								}}
								원</a-typography-title>
						</div>
						<a-spin :spinning="loadingDeductionItem" size="large">
							<div class="deduction-main">
								<div v-for="(item, index) in arrDeduction" :key="index" class="custom-deduction">
									<span>
										<deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2"
											:name="item.name" :type="1" subName="과세" :showTooltip="false" />
										<deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2"
											:name="item.name" :type="2" subName="상여(과세)" :showTooltip="false" />
										<deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
											:name="item.name" :type="3" :subName="item.taxfreePayItemCode +
												' ' +
												item.taxfreePayItemName +
												' ' +
												item.taxFreeIncludeSubmission
												" :showTooltip="false" />
										<deduction-items v-if="item.taxPayItemCode == null &&
											item.taxfreePayItemCode == null
											" :name="item.name" :width="'130px'" :type="4" subName="공제" :showTooltip="false" />
									</span>
									<div>
										<number-box-money min="0" width="130px" :spinButtons="false"
											@changeInput="onChangeInputDeduction" v-model:valueInput="item.price" :disabled="[1001, 1002, 1003].find(
												(element) => element == item.deductionItemCode
											) || store.state.common.pa510.statusDisabledStatus
												" />
										<span class="pl-5">원</span>
									</div>
								</div>
							</div>
						</a-spin>
					</a-col>
				</a-row>
			</StandardForm>
		</a-spin>
		<div class="text-align-center mt-50" style="display: flex; justify-content: center">
			<a-tooltip placement="top" :overlayStyle="{ maxWidth: '500px' }">
				<template #title>입력된 급여 금액으로 공제 재계산합니다.</template>
				<div>
					<button-tooltip-error :disabled="store.state.common.pa510.statusDisabledStatus"
						:statusChange="store.state.common.pa510.statusChangeFormPrice" @onClick="actionDedution" />
				</div>
			</a-tooltip>
			<a-tooltip placement="top">
				<template #title>4대보험 EDI 의 공제 금액이 있는 경우, 조회 후 적용합니다</template>
				<div>
					<button-basic :disabled="store.state.common.pa510.statusDisabledStatus || true" style="margin: 0px 5px"
						@onClick="actionInsurance" mode="contained" type="default" text="4대보험 EDI 조회/적용" />
				</div>
			</a-tooltip>
			<button-basic :disabled="store.state.common.pa510.statusDisabledStatus" style="margin: 0px 5px"
				@onClick="onSubmitForm" mode="contained" type="default" text="저장" />
		</div>
	</standard-form>

	<DeductionPopup :modalStatus="modalDeductions" @closePopup="modalDeductions = false" :data="arrDeduction"
		@updateDate="updateDataDeduction" />
	<InsurancePopup :modalStatus="modalInsurance" @closePopup="modalInsurance = false" />
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import DxButton from "devextreme-vue/button";
import notification from "@/utils/notification";
import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA5/PA510/index";
import query520 from "@/graphql/queries/PA/PA5/PA520/index";
import mutations from "@/graphql/mutations/PA/PA5/PA510/index";
import {
	companyId,
	calculateEmployeementInsuranceEmployee,
} from "@/helpers/commonFunction";
import { useStore } from "vuex";
import DeductionPopup from "./Popup/DeductionPopup.vue";
import InsurancePopup from "./Popup/InsurancePopup.vue";
import { sampleDataIncomeWageDaily } from "../utils/index";
import filters from "@/helpers/filters";
import { Message } from "@/configs/enum";
import { Formula } from "@bankda/jangbuda-common";
import ButtonTooltipError from "@/components/common/ButtonTooltipError.vue";
import dayjs from "dayjs";
export default defineComponent({
	components: {
		DxButton,
		DeductionPopup,
		InsurancePopup,
		ButtonTooltipError,
	},
	props: {
		isTaxhasData: Boolean,
	},
	setup(props, { emit }) {
		const messageUpdateSuccess = Message.getMessage("COMMON", "106").message;
		const messageAddSuccess = Message.getMessage("COMMON", "101").message;

		const store = useStore();
		const paYear = ref<number>(
			parseInt(sessionStorage.getItem("paYear") ?? "0")
		);
		const processKey = computed(() => store.state.common.pa510.processKeyPA510);
		const modalDeductions = ref<boolean>(false);
		const modalInsurance = ref<boolean>(false);
		const dataIncomeWageDaily: any = ref({ ...sampleDataIncomeWageDaily });
		const arrayEmploySelect: any = ref([]);
		const dataEmployeeWageDailies: any = ref([]);
		const arrDeduction: any = ref([]);
		const triggerWithholdingConfigDeductionItems = ref<boolean>(true);
		const triggerEmployeeWageDailies = ref<boolean>(true);
		const triggerIncomeWageDaily = ref<boolean>(false);
		const countKey: any = ref(0);
		const employeeWageDailyTrigger = ref<boolean>(false);
		const triggerWithholdingConfig = ref<boolean>(true);
		const dataQuery = ref({ companyId: companyId, imputedYear: paYear });
		const insuranceSupport = ref<boolean>(false);
		let employeeWageDailyParam = {
			companyId: companyId,
			imputedYear: paYear.value,
			employeeId: null,
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
		const employeementInsuranceDeduction = ref<boolean>(false);
		const employeementInsuranceSupportPercent = ref<number>(0);
		const originDataIncomeWageDaily = {
			companyId: companyId,
			incomeId: store.state.common.pa510.incomeId,
			processKey: processKey.value,
		};

		let requiredPaymentDay = ref();
		const startDate = computed(() => dayjs(`${paYear.value}-${processKey.value.paymentMonth}`).startOf("month").toDate());
		const finishDate = computed(() =>dayjs(`${paYear.value}-${processKey.value.paymentMonth}`).endOf("month").toDate());

		// ============ GRAPQL ===============================
		const {
			loading: loadingDeductionItem,
			onResult: resWithholdingConfigPayItems,
		} = useQuery(
			queries.getWithholdingConfigDeductionItems,
			originDataConfig,
			() => ({
				enabled: triggerWithholdingConfigDeductionItems.value,
				fetchPolicy: "no-cache",
			})
		);
		const { loading: loadingEmployeeWage, onResult: resEmployeeWage } =
			useQuery(queries.getEmployeeWageDailies, originData, () => ({
				fetchPolicy: "no-cache",
				enabled: triggerEmployeeWageDailies.value,
			}));
		const { loading: loadingIncomeWageDaily, onResult: resIncomeWageDaily } =
			useQuery(queries.getIncomeWageDaily, originDataIncomeWageDaily, () => ({
				enabled: triggerIncomeWageDaily.value,
				fetchPolicy: "no-cache",
			}));
		const {
			mutate: mutateAdd,
			onDone: onDoneAdd,
			onError: onerrorAdd,
		} = useMutation(mutations.createIncomeWageDaily);
		const {
			mutate: mutateUpdate,
			onDone: onDoneUpdate,
			onError: onerrorUpdate,
		} = useMutation(mutations.updateIncomeWageDaily);
		const {
			result: resultEmployeeWageDaily,
			refetch: refetchEmployeeWageDaily,
			loading,
		} = useQuery(query520.getEmployeeWageDaily, employeeWageDailyParam, () => ({
			enabled: employeeWageDailyTrigger.value,
			fetchPolicy: "no-cache",
		}));

		const { result: resultConfig } = useQuery(
			queries.getWithholdingConfig,
			dataQuery,
			() => ({
				enabled: triggerWithholdingConfig.value,
				fetchPolicy: "no-cache",
			})
		);

		// ===================DONE GRAPQL==================================
		onDoneAdd(async (data: any) => {
			notification("success", messageAddSuccess);
			await store.state.common.pa510.loadingTableInfo++;
			if (
				store.state.common.pa510.statusClickButtonAdd &&
				!store.state.common.pa510.statusClickButtonSave
			) {
				// nếu trước đó ấn button add
				return;
			}
			if (store.state.common.pa510.checkClickCopyMonth) {
				// nếu trước đó ấn button copy month
				store.state.common.pa510.checkClickCopyMonth = false;
				store.state.common.pa510.openModalCopyMonth++;
				// return
			}
			if (store.state.common.pa510.statusClickButtonSave) {
				// if click submit
				store.state.common.pa510.incomeId =
					data.data.createIncomeWageDaily?.incomeId;
			} else {
				// if click save modal
				store.state.common.pa510.incomeId =
					store.state.common.pa510.dataRowOnActive?.incomeId;
			}
			// await (triggerIncomeWageDaily.value = true);
			await (store.state.common.pa510.statusRowAdd = true);
			await (store.state.common.pa510.statusFormAdd = false);
		});
		onerrorAdd(async (e: any) => {
			//notification('error', e.message)
		});
		onDoneUpdate(async (data: any) => {
			notification("success", messageUpdateSuccess);
			await store.state.common.pa510.loadingTableInfo++;
			if (
				store.state.common.pa510.statusClickButtonAdd &&
				!store.state.common.pa510.statusClickButtonSave
			) {
				// nếu trước đó ấn button add
				return;
			}
			if (store.state.common.pa510.checkClickCopyMonth) {
				// nếu trước đó ấn button copy month
				store.state.common.pa510.checkClickCopyMonth = false;
				store.state.common.pa510.openModalCopyMonth++;
				// return
			}
			if (store.state.common.pa510.statusClickButtonSave) {
				// if click submit
				store.state.common.pa510.incomeId =
					data.data.updateIncomeWageDaily?.incomeId;
			} else {
				// if click save modal
				store.state.common.pa510.incomeId =
					store.state.common.pa510.dataRowOnActive?.incomeId;
			}

			// await (triggerIncomeWageDaily.value = true);
		});
		onerrorUpdate(async (e: any) => {
			//notification('error', e.message)
		});

		resEmployeeWage((value) => {
			triggerEmployeeWageDailies.value = false;
			dataEmployeeWageDailies.value = value.data.getEmployeeWageDailies;
			resetArrayEmploySelect()
		});
		resWithholdingConfigPayItems((res) => {
			arrDeduction.value = [];
			res.data.getWithholdingConfigDeductionItems?.map((val: any) => {
				if ([1001, 1002, 1003, 1004, 1011, 1012].includes(val.itemCode)) {
					let price = funcCheckPrice(val.itemCode);
					arrDeduction.value.push({
						...val,
						price: price,
					});
				}
			});
			triggerWithholdingConfigDeductionItems.value = false;
		});
		resIncomeWageDaily(async (value: any) => {
			// get data of one row
			triggerIncomeWageDaily.value = false;
			let data = value.data.getIncomeWageDaily;
			employeementInsuranceDeduction.value =
				data.employee.employeementInsuranceDeduction;
			employeementInsuranceSupportPercent.value =
				data.employee.employeementInsuranceSupportPercent;

			await (dataIncomeWageDaily.value = data);
			dataIncomeWageDaily.value.paymentDay = parseInt(
				`${paYear.value}${filters.formatMonth(
					processKey.value.paymentMonth
				)}${filters.formatMonth(data.paymentDay)}`
			);
			store.state.common.pa510.dataRowOld = { ...data };

			arrDeduction.value?.map((row: any) => {
				row.price = 0;
				dataIncomeWageDaily.value.deductionItems?.map((val: any) => {
					if (val.itemCode == row.itemCode) {
						row.price = val.amount;
					}
				});
			});
			store.state.common.pa510.focusedRowKey = data.incomeId;

			store.state.common.pa510.statusChangeFormAdd = false;
			store.state.common.pa510.statusChangeFormEdit = false;
			// Incrementing the value of onEditItem by 1.
			if (store.state.common.pa510.statusClickEditItem) {
				store.state.common.pa510.onEditItem++;
			}
			store.state.common.pa510.refreshDataGridRef++;
		});

		// ===================WATCH==================================
		watch(resultConfig, (value) => {
			triggerWithholdingConfig.value = false;
			if (value) {
				insuranceSupport.value = value.getWithholdingConfig.insuranceSupport;
			}
		});
		watch(
			() => store.state.common.pa510.loadingFormData,
			(value) => {
				originDataIncomeWageDaily.incomeId = store.state.common.pa510.incomeId;
				triggerIncomeWageDaily.value = true;
			}
		);
		watch(
			() => store.state.common.activeTab,
			(newVal) => {
				if (newVal.id == "pa-510") {
					triggerEmployeeWageDailies.value = true; //reset selected employee
					triggerWithholdingConfig.value = true; // reset insuranceSupport cm-130
				}
			}
		);
		// Watching the value of the store.state.common.pa510.statusFormAdd and if it is true, it will do
		// some stuff.
		watch(
			() => store.state.common.pa510.statusFormAdd,
			(value) => {
				if (value) {
					countKey.value++;
					employeeWageDailyParam.employeeId = null;
					arrDeduction.value?.map((data: any) => {
						data.price = 0;
					});
					store.state.common.pa510.statusChangeFormPrice = false;
				}
				resetArrayEmploySelect()
			}
		);
		watch(
			() => dataIncomeWageDaily.value,
			(value) => {
				if (!store.state.common.pa510.statusFormAdd) {
					if (
						JSON.stringify(store.state.common.pa510.dataRowOld) !==
						JSON.stringify(dataIncomeWageDaily.value) &&
						store.state.common.pa510.dataRowOld
					) {
						// store.state.common.pa510.statusChangeFormPrice = true;
						store.state.common.pa510.statusChangeFormEdit = true;
					} else {
						store.state.common.pa510.statusChangeFormEdit = false;
						store.state.common.pa510.statusChangeFormPrice = false;
					}
				} else {
					// Checking if the data in the form is different from the data in the database. [check trạng thái khi add]
					if (
						JSON.stringify({ ...sampleDataIncomeWageDaily }) !==
						JSON.stringify(dataIncomeWageDaily.value)
					) {
						store.state.common.pa510.statusChangeFormAdd = true;
					} else {
						store.state.common.pa510.statusChangeFormAdd = false;
						store.state.common.pa510.statusChangeFormPrice = false;
					}
				}
			},
			{ deep: true }
		);

		// Watching the value of actionSubmit and if it is true, it will execute the code inside the if
		// statement.
		watch(
			() => store.state.common.pa510.actionSubmit,
			(value) => {
				store.state.common.pa510.statusClickButtonSave = false;
				submitForm();
			}
		);

		// reset form data
		watch(
			() => store.state.common.pa510.actionResetForm,
			async (value) => {
				onResetForm();
			}
		);

		watch(
			() => dataIncomeWageDaily.value.totalDeduction,
			(res) => {
				dataIncomeWageDaily.value.actualPayment =
					dataIncomeWageDaily.value.monthlyWage - res;
			},
			{ deep: true }
		);

		// Watching the array arrDeduction and updating the totalDeduction.value whenever the array is
		// changed.
		watch(
			() => arrDeduction.value,
			(res) => {
				let total = 0;
				arrDeduction.value?.map((val: any) => {
					total += val.price;
				});
				dataIncomeWageDaily.value.totalDeduction = total;
			},
			{ deep: true }
		);

		// Watching the resultEmployeeWageDaily and when it changes, it will update the
		// dataIncomeWageDaily.value.
		watch(
			resultEmployeeWageDaily,
			async (res: any) => {
				employeeWageDailyTrigger.value = false;
				if (store.state.common.pa510.statusFormAdd) {
					let data = res.getEmployeeWageDaily;
					employeementInsuranceDeduction.value =
						data.employeementInsuranceDeduction;
					employeementInsuranceSupportPercent.value =
						data.employeementInsuranceSupportPercent;
					await (dataIncomeWageDaily.value.monthlyWage = data.monthlyWage);
					await (dataIncomeWageDaily.value.dailyWage = data.dailyWage);
					await (dataIncomeWageDaily.value.workingDays = data.workingDays);
					// await (totalDeduction.value = data.totalDeduction)

					await (dataIncomeWageDaily.value.totalDeduction =
						data.totalDeduction);
					await (dataIncomeWageDaily.value.actualPayment =
						data.monthlyWage - data.totalDeduction);

					await (dataIncomeWageDaily.value.employee.monthlyPaycheck =
						data.monthlyPaycheck);
					await (dataIncomeWageDaily.value.employee.employeeId =
						data.employeeId);
					await (dataIncomeWageDaily.value.employee.name = data.name);
					await (dataIncomeWageDaily.value.employee.status = data.status);
					await (dataIncomeWageDaily.value.employee.foreigner = data.foreigner);
					await arrDeduction.value?.map((dataRow: any) => {
						dataRow.price = 0;
						data.deductionItems?.map((val: any) => {
							if (val.itemCode == dataRow.itemCode) {
								dataRow.price = val.amount;
							}
						});
					});
				}
				// await (store.state.common.pa510.statusChangeFormPrice = false)
			},
			{ deep: true }
		);

		// Watching the state of the store and when it changes, it is adding a new row to the table.
		watch(
			() => store.state.common.pa510.addRow,
			(newVal) => {
				// add row table
				store.state.common.pa510.statusClickButtonAdd = false;
				store.state.common.pa510.dataTaxPayInfo =
					store.state.common.pa510.dataTaxPayInfo.concat(
						JSON.parse(JSON.stringify({ ...sampleDataIncomeWageDaily }))
					);
				dataIncomeWageDaily.value =
					store.state.common.pa510.dataTaxPayInfo[
					store.state.common.pa510.dataTaxPayInfo?.length - 1
					];
				dataIncomeWageDaily.value.paymentDay =
					sampleDataIncomeWageDaily.paymentDay
						? parseInt(
							`${paYear.value}${filters.formatMonth(
								processKey.value.paymentMonth
							)}${filters.formatMonth(sampleDataIncomeWageDaily.paymentDay)}`
						)
						: parseInt(
							`${paYear.value}${filters.formatMonth(
								processKey.value.paymentMonth
							)}${filters.formatMonth(
								dayjs(
									`${paYear.value}-${processKey.value.paymentMonth}`
								).daysInMonth()
							)}`
						);
				store.state.common.pa510.focusedRowKey = "PA510";
				store.state.common.pa510.statusRowAdd = false;
				onResetForm();
			}
		);

		// Watching the store.state.common.pa510.resetArrayEmploySelect and when it changes it will reset the
		// arrayEmploySelect.value to [] and then it will do some other stuff.
		watch(
			() => store.state.common.pa510.resetArrayEmploySelect,
			(newVal) => {
				resetArrayEmploySelect()
			}
		);

		// ===================FUNCTION==================================
		const resetArrayEmploySelect = () => {
			arrayEmploySelect.value = [];
			let data = dataEmployeeWageDailies.value?.filter((data: any) => {
				let statusJoinedAt = data.joinedAt ? parseInt(data.joinedAt.toString().slice(0, 6)) <= parseInt(processKey.value.imputedYear + '' + filters.formatMonth(processKey.value.imputedMonth)) : true
				let statusLeavedAt = data.leavedAt ? parseInt(data.leavedAt.toString().slice(0, 6)) >= parseInt(processKey.value.imputedYear + '' + filters.formatMonth(processKey.value.imputedMonth)) : true
				if (statusJoinedAt && statusLeavedAt) {
					return data
				}
			})
			if (store.state.common.pa510.statusFormAdd) {
				data?.map((dataEmployee: any) => {
					if (
						!store.state.common.pa510.dataTaxPayInfo.find(
							(dataTaxPay: any) =>
								dataTaxPay.employeeId == dataEmployee.employeeId
						)
					) {
						arrayEmploySelect.value.push(dataEmployee);
					}
				});
			} else {
				arrayEmploySelect.value = dataEmployeeWageDailies.value;
			}
		}
		// A function that is used in a Vue HTML template.
		const funcCheckPrice = (id: any) => {
			let price = 0;
			dataIncomeWageDaily.value.deductionItems?.map((e: any) => {
				if (e.itemCode == id) price = e.amount;
			});
			return price;
		};
		// Calculating the deduction of the employee.
		const actionDedution = () => {
			var res = pa510FormRef.value.validate();
			if (!res.isValid) {
				res.brokenRules[0].validator.focus();
			} else {
				let totalPrices = parseInt(
					dataIncomeWageDaily.value.employee.monthlyPaycheck
						? dataIncomeWageDaily.value.monthlyWage
						: dataIncomeWageDaily.value.dailyWage *
						dataIncomeWageDaily.value.workingDays
				);
				// let total1 = dataDefault.nationalPensionDeduction == true ? calculateNationalPensionEmployee(totalPrices, dataDefault.nationalPensionSupportPercent) : 0
				// let total2 = calculateHealthInsuranceEmployee(totalPrices)
				// let total3 = calculateLongTermCareInsurance(totalPrices)
				let total4 =
					employeementInsuranceDeduction.value == true && insuranceSupport.value
						? calculateEmployeementInsuranceEmployee(
							totalPrices,
							employeementInsuranceSupportPercent.value
						)
						: 0;

				let objectData = Formula.getDailyEmployeeTax(
					parseInt(
						`${processKey.value.paymentYear}${processKey.value.paymentMonth}`
					),
					dataIncomeWageDaily.value.workingDays,
					dataIncomeWageDaily.value.dailyWage,
					dataIncomeWageDaily.value.monthlyWage
				);
				arrDeduction.value?.map((val: any) => {
					val.priceNew = 0;
					// if (val.deductionItemCode == 1001)
					//     val.priceNew = total1
					// if (val.deductionItemCode == 1002)
					//     val.priceNew = total2
					// if (val.deductionItemCode == 1003)
					//     val.priceNew = total3
					if (val.deductionItemCode == 1004) val.priceNew = total4;
					if (
						val.deductionItemCode == 1011 &&
						Number.isInteger(objectData.incomeTax)
					)
						val.priceNew = objectData.incomeTax;
					if (
						val.deductionItemCode == 1012 &&
						Number.isInteger(objectData.localIncomeTax)
					)
						val.priceNew = objectData.localIncomeTax;
				});
				modalDeductions.value = true;
			}
		};
		const updateDataDeduction = () => {
			let total = 0;
			arrDeduction.value?.map((val: any) => {
				if (
					[1001, 1002, 1003, 1004, 1011, 1012].includes(val.deductionItemCode)
				)
					val.price = val.priceNew;
				total += val.priceNew;
			});
			dataIncomeWageDaily.value.totalDeduction = total;
			store.state.common.pa510.statusChangeFormPrice = false;
			// showErrorButton.value = false;
		};

		const actionInsurance = () => {
			modalInsurance.value = true;
		};
		// A function that is called when the employeeId is changed.
		const onChange = () => {
			if (
				employeeWageDailyParam.employeeId !=
				dataIncomeWageDaily.value.employee.employeeId
			) {
				employeeWageDailyParam.employeeId =
					dataIncomeWageDaily.value.employee.employeeId;
				employeeWageDailyTrigger.value = true;
			}
		};
		// A Vue HTML code.
		const onChangeInputDeduction = () => {
			if (store.state.common.pa510.statusFormAdd) {
				store.state.common.pa510.statusChangeFormAdd = true;
			} else {
				store.state.common.pa510.statusChangeFormEdit = true;
			}
		};
		const onChangePrice = () => {
			store.state.common.pa510.statusChangeFormPrice = true;
		};
		const pa510FormRef = ref();
		const onSubmitForm = () => {
			store.state.common.pa510.statusClickButtonSave = true;
			// store.state.common.pa510.checkClickYear = false;
			submitForm();
		};
		const submitForm = () => {
			var res = pa510FormRef.value.validate();
			if (!res.isValid) {
				res.brokenRules[0].validator.focus();
				if (!dataIncomeWageDaily.value.paymentDay) {
					requiredPaymentDay.value.validate(true);
				}
				store.state.common.pa510.refreshDataGridRef++;
				// store.state.common.pa510.checkClickYear
				// 	? (store.state.common.pa510.checkClickYear = false)
				// 	: "";
				store.state.common.pa510.statusClickEditItem
					? (store.state.common.pa510.statusClickEditItem = false)
					: "";
				store.state.common.pa510.checkClickCopyMonth
					? (store.state.common.pa510.checkClickCopyMonth = false)
					: "";
				store.state.common.pa510.checkClickMonth
					? (store.state.common.pa510.checkClickMonth = false)
					: "";
				store.state.common.pa510.dataRowOnActive = dataIncomeWageDaily.value;
			} else {
				if (!dataIncomeWageDaily.value.paymentDay) {
					requiredPaymentDay.value.validate(true);
					return;
				}
				let arrDeductionItems: any = [];
				arrDeduction.value.forEach((value: any) => {
					arrDeductionItems.push({
						itemCode: value.itemCode,
						amount: value.price ? value.price : 0,
					});
				});
				let input = {
					dailyWage: dataIncomeWageDaily.value.employee.monthlyPaycheck
						? Math.round(
							dataIncomeWageDaily.value.monthlyWage /
							dataIncomeWageDaily.value.workingDays
						)
						: dataIncomeWageDaily.value.dailyWage,
					monthlyWage: dataIncomeWageDaily.value.employee.monthlyPaycheck
						? dataIncomeWageDaily.value.monthlyWage
						: dataIncomeWageDaily.value.dailyWage *
						dataIncomeWageDaily.value.workingDays,
					workingDays: dataIncomeWageDaily.value.workingDays,
					deductionItems: arrDeductionItems,
				};
				if (store.state.common.pa510.statusFormAdd) {
					mutateAdd({
						companyId: companyId,
						processKey: { ...processKey.value },
						input: {
							paymentDay:
								parseInt(
									dataIncomeWageDaily.value.paymentDay?.toString().slice(6, 8)
								) ?? 1,
							employeeId: dataIncomeWageDaily.value.employee.employeeId,
							...input,
						},
					});
				} else {
					mutateUpdate({
						companyId: companyId,
						processKey: { ...processKey.value },
						incomeId: dataIncomeWageDaily.value.incomeId,
						input: input,
					});
				}
			}
		};
		// Resetting the form.
		const onResetForm = async () => {
			countKey.value++;
			await Object.assign(
				dataIncomeWageDaily.value,
				JSON.parse(JSON.stringify({ ...sampleDataIncomeWageDaily }))
			);
			dataIncomeWageDaily.value.paymentDay =
				sampleDataIncomeWageDaily.paymentDay
					? parseInt(
						`${paYear.value}${filters.formatMonth(
							processKey.value.paymentMonth
						)}${filters.formatMonth(sampleDataIncomeWageDaily.paymentDay)}`
					)
					: parseInt(
						`${paYear.value}${filters.formatMonth(
							processKey.value.paymentMonth
						)}${filters.formatMonth(
							dayjs(
								`${paYear.value}-${processKey.value.paymentMonth}`
							).daysInMonth()
						)}`
					);
			await arrDeduction.value?.map((data: any) => {
				data.price = 0;
			});
			employeeWageDailyParam.employeeId = null;
			await (store.state.common.pa510.statusChangeFormEdit = false);
			await (store.state.common.pa510.statusChangeFormAdd = false);
			await (store.state.common.pa510.statusFormAdd = true); // trạng thái form add
			await (store.state.common.pa510.statusChangeFormPrice = false);
		};

		// A function that is being called in the Vue HTML.
		const showDailyWage = () => {
			let price = Math.round(
				dataIncomeWageDaily.value.monthlyWage /
				dataIncomeWageDaily.value.workingDays
			);
			dataIncomeWageDaily.value.dailyWage = isFinite(price)
				? price
				: dataIncomeWageDaily.value.dailyWage;
			return filters.formatCurrency(dataIncomeWageDaily.value.dailyWage);
		};
		// A function that is being called in the HTML.
		const showMonthlyWage = () => {
			let price =
				dataIncomeWageDaily.value.dailyWage *
				dataIncomeWageDaily.value.workingDays;
			dataIncomeWageDaily.value.monthlyWage = isFinite(price)
				? price
				: dataIncomeWageDaily.value.monthlyWage;
			return filters.formatCurrency(dataIncomeWageDaily.value.monthlyWage);
		};
		return {
			pa510FormRef,
			dataIncomeWageDaily,
			arrDeduction,
			loadingDeductionItem,
			modalDeductions,
			modalInsurance,
			arrayEmploySelect,
			actionDedution,
			actionInsurance,
			updateDataDeduction,
			onChange,
			loading,
			loadingIncomeWageDaily,
			store,
			countKey,
			submitForm,
			onSubmitForm,
			showDailyWage,
			showMonthlyWage,
			onChangeInputDeduction,
			onChangePrice,
			startDate,
			finishDate,
			requiredPaymentDay,
		};
	},
});
</script>
<style lang="scss" scoped src="../style/style.scss"></style>
