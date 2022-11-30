<template>
	<div id="tab2-pa520">
		<div class="header-text-1">공제</div>
		<a-row :gutter="16">
			<a-col :span="24">
				<a-form-item label="4대보험 공제 여부" label-align="right" class="ins-dedu">
					<div class="d-flex-center">
						<checkbox-basic size="14px" label="국민연금" class="check-box-tab1"
							v-model:valueCheckbox="originDataUpdate.input.nationalPensionDeduction" />
						<checkbox-basic size="14px" label="건강보험" class="check-box-tab1"
							v-model:valueCheckbox="originDataUpdate.input.healthInsuranceDeduction" />
						<checkbox-basic size="14px" label="고용보험" class="check-box-tab1"
							v-model:valueCheckbox="originDataUpdate.input.employeementInsuranceDeduction" />
						<div class="pr-5 pl-10">
							<img src="../../../../../../assets/images/iconInfo.png" style="width: 16px;">
						</div>
						<span class="fz-11">본 항목은 공제 계산을 위한 설정으로 실제 4대보험 <br> 신고 여부와는 무관합니다.
						</span>
					</div>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<div class="header-text-2">두루누리사회보험 공제</div>
				<a-form-item label="두루누리사회보험 공제 여부" label-align="right" class="durunuri-insurance">
					<switch-basic textCheck="Y" textUnCheck="N"
						v-model:valueSwitch="originDataUpdate.input.insuranceSupport" class="switch-insurance" />
				</a-form-item>
				<a-form-item label="국민연금 적용율" label-align="right" class="custom-style-label">
					<radio-group :arrayValue="radioCheckPersenPension"
						v-model:valueRadioCheck="originDataUpdate.input.nationalPensionSupportPercent"
						layoutCustom="horizontal" />
				</a-form-item>
				<a-form-item label="고용보험 적용율" label-align="right" class="custom-style-label">
					<radio-group :arrayValue="radioCheckPersenPension"
						v-model:valueRadioCheck="originDataUpdate.input.employeementInsuranceSupportPercent"
						layoutCustom="horizontal" />
				</a-form-item>
			</a-col>
		</a-row>

		<div class="header-text-3">급여 (기본값)
			<span>
				<img src="../../../../../../assets/images/iconInfoWrite.png" style="width: 16px;">
				<p>급여소득자료 입력시 본 급여 기본값을 불러옵니다</p>
			</span>
		</div>
		<a-row :gutter="16">
			<a-col :span="24"><b class="fz-20">차인지급액</b> <b>{ {{ totalPayDifferen }} }</b>원
			</a-col>
			<a-col :span="12">
				<div class="header-text-0">월급여
					<span class="fz-12">
						{ {{ formDifferencePayment.totalAmount }} }
					</span>
				</div>
				<div>
					<a-form-item label="일급/월급">
						<div class="d-flex-center">
							<switch-basic textCheck="일급" textUnCheck="월급" class="mr-10"
								v-model:valueSwitch="formDifferencePayment.status" />
							<number-box-money min="0" width="200px" class="mr-5"
								v-model:valueInput="formDifferencePayment.wage"
								:placeholder="formDifferencePayment.status == false ? '일급여' : '월급여'" />
						</div>
					</a-form-item>
					<div class="pl-10">
						<img src="../../../../../../assets/images/iconInfo.png" style="width: 16px;">
						<span class="pl-5 fz-11">
							{{ messageMonthlySalary }}
						</span>
					</div>
					<a-form-item label="근무일수">
						<div class="d-flex-center">
							<number-box-money width="200px" class="mr-5" min="0"
								v-model:valueInput="formDifferencePayment.working" />
							<span class="ml-10">일</span>
						</div>
					</a-form-item>
				</div>
			</a-col>
			<a-col :span="12">
				<div class="header-text-0">공제 항목 <span class="fz-12">{ {{ totalDeduction }} }원</span></div>
				<a-spin :spinning="loading" size="large">
					<div class="deduction-main">
						<div v-for="(item, index) in arrDeduction" class="custom-deduction">
							<span>
								<deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2"
									:name="item.name" :type="1" subName="과세" />
								<deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2"
									:name="item.name" :type="2" subName="상여(과세)" />
								<deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
									:name="item.name" :type="3"
									:subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + item.taxFreeIncludeSubmission" />
								<deduction-items v-if="item.taxPayItemCode == null && item.taxfreePayItemCode == null"
									:name="item.name" :type="4" subName="과세" />
							</span>
							<div>
								<number-box-money min="0" width="150px" :spinButtons="false"
									v-model:valueInput="item.price" :disabled="true">
								</number-box-money>
								<span class="pl-5">원</span>
							</div>
						</div>
					</div>
				</a-spin>
			</a-col>
		</a-row>
		<div class="button-action">
			<button-basic text="공제계산" type="default" mode="contained" />
			<button-basic text="저장" type="default" mode="contained" class="ml-5" @onClick="updateDeduction" />
		</div>
	</div>

</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "vue";
import { radioCheckPersenPension } from "../../utils/index";
import dayjs from 'dayjs';
import { useQuery, useMutation } from "@vue/apollo-composable"
import { useStore } from 'vuex';
import queries from "../../../../../../graphql/queries/PA/PA5/PA520/index"
import { companyId } from "../../../../../../helpers/commonFunction"
import mutations from "../../../../../../graphql/mutations/PA/PA5/PA520/index";
import notification from "../../../../../../utils/notification";

export default defineComponent({
	props: {
		modalStatus: Boolean,
		idRowEdit: Number
	},
	setup(props, { emit }) {
		const messageMonthlySalary = ref('일급 선택시, 월급 = 일급 x 근무일수')
		const rangeDate = ref([dayjs().subtract(1, 'year'), dayjs()]);
		const store = useStore();
		const globalYear: any = computed(() => store.state.settings.globalYear);
		const totalDeduction = ref('0')
		const arrDeduction: any = ref()
		const totalPayDifferen = ref()

		const originData = ref({
			companyId: companyId,
			imputedYear: globalYear.value,
		})
		const originDataDetail = ref({
			companyId: companyId,
			imputedYear: globalYear.value,
			employeeId: props.idRowEdit
		})

		const formDifferencePayment: any = reactive({
			totalAmount: '0',
			status: true,
			wage: null,
			working: null
		})

		const originDataUpdate: any = ref({
			companyId: companyId,
			imputedYear: globalYear.value,
			employeeId: props.idRowEdit,
			input: {
				nationalPensionDeduction: false,
				healthInsuranceDeduction: false,
				longTermCareInsuranceDeduction: false,
				employeementInsuranceDeduction: false,
				insuranceSupport: false,
				nationalPensionSupportPercent: 0,
				employeementInsuranceSupportPercent: 0,
				monthlyPaycheck: false,
				workingDays: 0,
				dailyWage: 0,
				monthlyWage: 0,
				deductionItems: []
			}
		})

		// ================== GRAPQL ====================================
		const {
			refetch: refectchDetail,
			onResult: resApiGetEmployeeWageDaily,
		} = useQuery(queries.getEmployeeWageDaily, originDataDetail, () => ({
			fetchPolicy: "no-cache",
		}))
		resApiGetEmployeeWageDaily(e => {
			if (e.data) {
				let res = e.data.getEmployeeWageDaily
				originDataUpdate.value.input.nationalPensionDeduction = res.nationalPensionDeduction
				originDataUpdate.value.input.healthInsuranceDeduction = res.healthInsuranceDeduction
				originDataUpdate.value.input.longTermCareInsuranceDeduction = res.longTermCareInsuranceDeduction
				originDataUpdate.value.input.employeementInsuranceDeduction = res.employeementInsuranceDeduction
				originDataUpdate.value.input.insuranceSupport = res.insuranceSupport
				originDataUpdate.value.input.nationalPensionSupportPercent = res.nationalPensionSupportPercent ? res.nationalPensionSupportPercent : 0
				originDataUpdate.value.input.employeementInsuranceSupportPercent = res.employeementInsuranceSupportPercent ? res.employeementInsuranceSupportPercent : 0
				originDataUpdate.value.input.monthlyPaycheck = res.monthlyPaycheck
				originDataUpdate.value.input.workingDays = res.workingDays
				originDataUpdate.value.input.dailyWage = res.dailyWage
				originDataUpdate.value.input.monthlyWage = res.monthlyWage
				originDataUpdate.value.input.deductionItems = res.deductionItems

				formDifferencePayment.status = res.monthlyPaycheck
				formDifferencePayment.wage = res.monthlyPaycheck == false ? res.dailyWage : res.monthlyWage
				formDifferencePayment.working = res.workingDays
			}
		})
		const {
			loading: loading,
			onResult: resWithholdingConfigPayItems,
		} = useQuery(queries.getWithholdingConfigDeductionItems, originData, () => ({
			fetchPolicy: "no-cache",
		}))
		resWithholdingConfigPayItems(res => {
			arrDeduction.value = []
			// arrDeduction.value = res.data.getWithholdingConfigDeductionItems  
			res.data.getWithholdingConfigDeductionItems.map((val: any) => {
				arrDeduction.value.push({
					...val,
					price: null
				})
			})
		})

		const {
			mutate,
			onError,
			onDone,
		} = useMutation(mutations.saveEmployeeWageDailyPayDeduction);
		onError(e => {
			notification('error', e.message)
		})
		onDone(res => {
			emit('closePopup', false)
			notification('success', '업데이트 완료!')
		})

		// ================== WATCH ====================================
		watch(() => props.idRowEdit, (res) => { 
			originDataDetail.value.employeeId = res 
			originDataUpdate.value.employeeId = res  
			
			refectchDetail()
		}, { deep: true })
		watch(() => arrDeduction, (res) => {
			let total = 0
			res.value.map((val: any) => {
				total += val.price
			})
			totalPayDifferen.value = (total + parseInt(formDifferencePayment.totalAmount.replace(',', ''))).toLocaleString('en-US', { currency: 'VND' })
			totalDeduction.value = total.toLocaleString('en-US', { currency: 'VND' })
		}, { deep: true })

		watch(() => formDifferencePayment, (res) => {
			if (res.status == false) {
				res.totalAmount = res.wage * res.working
				messageMonthlySalary.value = "일급 선택시, 월급 = 일급 x 근무일수"
			}
			else {
				if (res.wage)
					res.totalAmount = res.wage
				else
					res.totalAmount = 0
				messageMonthlySalary.value = "월급 선택시, 일급 = 월급 / 근무일수"
			}
			totalPayDifferen.value = (res.totalAmount + parseInt(totalDeduction.value.replace(',', ''))).toLocaleString('en-US', { currency: 'VND' })
			formDifferencePayment.totalAmount = res.totalAmount.toLocaleString('en-US', { currency: 'VND' })
		}, { deep: true })

		// ================== FUNCTION ==================================
		const updateDeduction = () => {
			let dataUpdate = {
				...originDataUpdate.value,
				input: {
					...originDataUpdate.value.input,
					monthlyPaycheck: formDifferencePayment.status,
					dailyWage: formDifferencePayment.status == false ? formDifferencePayment.wage : 0,
					monthlyWage: formDifferencePayment.status == true ? formDifferencePayment.wage : 0,
					workingDays: formDifferencePayment.working,
					deductionItems: [
						{ itemCode: 1001, amount: 200000 },
						{ itemCode: 1002, amount: 200000 },
						{ itemCode: 1003, amount: 200000 },
						{ itemCode: 1004, amount: 200000 }
					]
				}
			}
			mutate(dataUpdate)
		}

		return {
			originDataUpdate,
			messageMonthlySalary,
			totalPayDifferen,
			formDifferencePayment,
			totalDeduction,
			arrDeduction,
			rangeDate,
			radioCheckPersenPension,
			loading,
			updateDeduction
		};
	},
});
</script>
<style lang="scss" scoped src="../../style/tab2.scss">

</style>
