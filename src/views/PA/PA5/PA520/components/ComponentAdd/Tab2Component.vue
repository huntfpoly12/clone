<template>
	<div id="tab2-pa520">
		<div class="header-text-1">공제</div>
		<a-row :gutter="16">
			<a-col :span="24">
				<a-form-item label="4대보험 공제 여부" label-align="right" class="ins-dedu">
					<div style="display: flex;align-items: center;">
						<checkbox-basic size="14px" label="국민연금" class="check-box-tab1"></checkbox-basic>
						<checkbox-basic size="14px" label="건강보험" class="check-box-tab1"></checkbox-basic>
						<checkbox-basic size="14px" label="고용보험" class="check-box-tab1"></checkbox-basic>
						<div style="padding: 0 5px 0 10px">
							<img src="../../../../../../assets/images/iconInfo.png" style="width: 16px;">
						</div>
						<span style="font-size: 11px;">본 항목은 공제 계산을 위한 설정으로 실제 4대보험 신고 여부와는 무관합니다.
						</span>

					</div>
				</a-form-item>
			</a-col>
			<a-col :span="12">
				<div class="header-text-2">두루누리사회보험 공제</div>
				<a-form-item label="두루누리사회보험 공제 여부" label-align="right" class="durunuri-insurance">
					<switch-basic switch-basic textCheck="Y" textUnCheck="N" class="switch-insurance"></switch-basic>
				</a-form-item>
				<a-form-item label="국민연금 적용율" label-align="right" class="custom-style-label">
					<radio-group :arrayValue="radioCheckPersenPension" :valueRadioCheck="1" layoutCustom="horizontal" />
				</a-form-item>
				<a-form-item label="고용보험 적용율" label-align="right" class="custom-style-label">
					<radio-group :arrayValue="radioCheckPersenPension" :valueRadioCheck="1" layoutCustom="horizontal" />
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
			<a-col :span="24"><b style="font-size: 20px;">차인지급액</b> <b>{50000}</b>원
			</a-col>
			<a-col :span="12">
				<div class="header-text-0">월급여</div>
				<div>
					<a-form-item label="일급/월급">
						<div style="display: flex; align-items: center;">
							<default-text-box width="200px" style="margin-right: 5px;" />
							<switch-basic switch-basic textCheck="일급" textUnCheck="N" style="margin-right: 10px;" />
						</div>
					</a-form-item>
					<a-form-item label="근무일수">
						<div style="display: flex; align-items: center;">
							<default-text-box width="200px" style="margin-right: 5px;" />
							<span class="ml-10">일</span>
						</div>
					</a-form-item>
				</div>
			</a-col>
			<a-col :span="12">
				<div class="header-text-0">공제 항목 <span style="font-size: 12px;">{50000}원</span></div>
				<div class="deduction-main">
					<div v-for="(item, index) in arrDeduction" class="custom-deduction">
						<span>
							{{ item.name }} - {{ item.itemCode }}
						</span>
						<div>
							<text-number-box width="150px" style="margin-right: 5px;" />
							<span>원</span>
						</div>
					</div>
				</div>
			</a-col>
		</a-row>
		<div style="width: 100%;text-align: center;margin-top: 30px;">
			<button-basic text="저장" type="default" mode="contained" />
		</div>
	</div>

</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { radioCheckPersenPension, radioCheckReductioRate, radioCheckReductionInput, IncomeTaxAppRate } from "../../utils/index";
import dayjs from 'dayjs';
import { useQuery } from "@vue/apollo-composable"
import { useStore } from 'vuex';
import queries from "../../../../../../graphql/queries/PA/PA5/PA520/index"
import { companyId } from "../../../../../../helpers/commonFunction"

export default defineComponent({
	props: {
		modalStatus: Boolean,
	},
	setup(props, { emit }) {
		const rangeDate = ref([dayjs().subtract(1, 'year'), dayjs()]);
		const store = useStore();
		const globalYear: any = computed(() => store.state.settings.globalYear);
		const originData = ref({
			companyId: companyId,
			imputedYear: globalYear.value,
		})
		const arrDeduction = ref()
		const {
			onResult: resGetDepartments,
		} = useQuery(queries.getWithholdingConfigPayItems, originData, () => ({
			fetchPolicy: "no-cache",
		}))
		resGetDepartments(res => {
			arrDeduction.value = res.data.getWithholdingConfigPayItems
		})
		return {
			arrDeduction,
			rangeDate,
			radioCheckPersenPension,
			radioCheckReductioRate,
			radioCheckReductionInput,
			IncomeTaxAppRate
		};
	},
});
</script>
<style lang="scss" scoped src="../../style/tab2.scss">

</style>
