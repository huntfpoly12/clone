<template>
	<action-header :buttonDelete="false" :buttonSearch="false" :buttonSave="false" :buttonPrint="false" />
	<div id="ac-510">
		<div class="top">
			<a-spin :spinning="loadingGetAccountingProcesses">
				<div class="grid">
					<div v-for="(month, index) in 12" :key="index" class="items"
						:class="{ 'items-active': monthSelected === month }" @click="selectedMonth(month)">
						<colorful-badge
							:value="dataGetAccountingProcesses.find((item: any) => item.month === month)?.status || null"
							:year="dataGetAccountingProcesses.find((item: any) => item.month === month)?.year || acYear"
							:month="dataGetAccountingProcesses.find((item: any) => item.month === month)?.month || month" />
					</div>
				</div>
			</a-spin>
			<!-- <div class="grid">
                    <div v-for="(status, index) in dataGetAccountingProcesses" :key="index" class="items">
                        <colorful-badge
                            :value="status"
                            :year="acYear" :month="month" />
                    </div>
                </div> -->
			<div class="flex">
				<a-form-item label="서식 설정">
					<div class="dflex custom-flex">
						<div style="margin-right: 10px">
							<a-tooltip :overlayStyle="{ maxWidth: '500px' }">
								<template #title>본 설정으로 적용된 서식으로 출력 및 메일발송
									됩니다.</template>
								<img src="@/assets/images/iconInfo.png" style="width: 14px" />
							</a-tooltip>
						</div>
						<checkbox-basic v-model:valueCheckbox="dataQueryGetAccountBookReportViewUrl.displayCode
							" :size="'20'" />
						<span>결산서 (세목까지 출력)</span>
						<div>
							<a-tooltip color="black" placement="top">
								<template #title>선택시 결산서 서식에 세목까지 출력됩니다</template>
								<img src="@/assets/images/iconInfo.png" class="img-info" />
							</a-tooltip>
						</div>
					</div>
				</a-form-item>
			</div>
		</div>
		<div class="main" v-if="dataGetAccountingProcesses.find((item: any) => item.month === monthSelected)?.status">
			<DxDataGrid noDataText="내역이 없습니다" key-expr="type" :show-row-lines="true" :hoverStateEnabled="true"
				:data-source="dataSourceAC510" :show-borders="true" :allow-column-reordering="move_column"
				:allow-column-resizing="colomn_resize" :column-auto-width="true">
				<DxColumn cell-template="col-first" caption="서식" />
				<template #col-first="{ data }"> {{ data.data.name }}<br /> </template>
				<DxColumn :width="80" cell-template="pupop" />
				<template #pupop="{ data }">
					<div class="custom-action" style="text-align: center">
						<img @click="actionOpenPopupEmailSingle(data.data)" src="@/assets/images/email.svg" alt=""
							style="width: 25px; margin-right: 3px" />
						<a-tooltip placement="topLeft" title="출력 / 저장">
							<img @click="actionPrint(data.data)" src="@/assets/images/print.svg" alt=""
								style="width: 25px" />
						</a-tooltip>
					</div>
				</template>
			</DxDataGrid>
		</div>
	</div>
	<EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="modalEmailSingle = false" :data="popupDataEmailSingle" />
</template>
<script lang="ts">
import { useStore } from "vuex";
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { companyId } from "@/helpers/commonFunction";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import EmailSinglePopup from "./components/EmailSinglePopup.vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC5/AC510";
import mutations from "@/graphql/mutations/AC/AC5/AC510";
import notification from "@/utils/notification";
import dayjs from "dayjs";
export default defineComponent({
	components: {
		DxDataGrid,
		DxColumn,
		EmailSinglePopup,
	},
	setup() {
		const store = useStore();
		const move_column = computed(() => store.state.settings.move_column);
		const colomn_resize = computed(() => store.state.settings.colomn_resize);
		const acYear = ref<number>(
			parseInt(sessionStorage.getItem("acYear") ?? "0")
		);
		const globalFacilityBizId = ref<number>(
			parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0")
		);
		const dataSourceAC510 = ref<any>([
			{ type: 1, name: "세입결산서" },
			{ type: 2, name: "세출결산서" },
			{ type: 3, name: "총계정원장" },
			{ type: 4, name: "현금출납부" },
			{ type: 5, name: "수입결의서" },
			{ type: 6, name: "지출(여입)결의서" },
			{ type: 7, name: "구입과지출(여입)결의서" },
		]);
		const userInfor = computed(() => store.state.auth.userInfor);
		const dataGetAccountingProcesses = ref<any>([]);
		const monthSelected = ref(dayjs().month() + 1);
		// const valueCheckBox = ref<boolean>(false)
		const modalEmailSingle = ref(false);
		const popupDataEmailSingle = ref({});
		const triggerGetAccountingProcesses = ref<boolean>(true);
		const triggerGetAccountBookReportViewUrl = ref<boolean>(false);
		const dataQueryGetAccountingProcesses = ref({
			companyId: companyId,
			fiscalYear: acYear.value,
			facilityBusinessId: globalFacilityBizId.value,
		});
		const dataQueryGetAccountBookReportViewUrl = ref({
			companyId: companyId,
			fiscalYear: acYear.value,
			facilityBusinessId: globalFacilityBizId.value,
			year: acYear.value,
			month: monthSelected.value,
			type: null,
			displayCode: false,
		});
		// =================== GRAPHQL ===================
		// query getAccountingProcesses
		const {
			result: resGetAccountingProcesses,
			loading: loadingGetAccountingProcesses,
			onError: errorGetAccountingProcesses,
		} = useQuery(
			queries.getAccountingProcesses,
			dataQueryGetAccountingProcesses.value,
			() => ({
				enabled: triggerGetAccountingProcesses.value,
				fetchPolicy: "no-cache",
			})
		);

		// query getAccountBookReportViewUrl
		const {
			onResult: resGetAccountBookReportViewUrl,
			loading: loadingGetAccountBookReportViewUrl,
			onError: errorGetAccountBookReportViewUrl,
		} = useQuery(
			queries.getAccountBookReportViewUrl,
			dataQueryGetAccountBookReportViewUrl.value,
			() => ({
				enabled: triggerGetAccountBookReportViewUrl.value,
				fetchPolicy: "no-cache",
			})
		);

		resGetAccountBookReportViewUrl((e) => {
			triggerGetAccountBookReportViewUrl.value = false;
			window.open(e.data.getAccountBookReportViewUrl);
		});
		errorGetAccountBookReportViewUrl((e) => {
			triggerGetAccountBookReportViewUrl.value = false;
			//notification('error', e.message)
		});
		errorGetAccountingProcesses((e) => {
			triggerGetAccountingProcesses.value = false;
			//notification('error', e.message)
		});

		// ================== WATCH ================
		// 1. getAccountingProcesses
		watch(resGetAccountingProcesses, (value) => {
			triggerGetAccountingProcesses.value = false;
			dataGetAccountingProcesses.value = value.getAccountingProcesses;
		});

		const actionOpenPopupEmailSingle = (data: any) => {
			// gridRef.value?.instance.deselectAll()
			popupDataEmailSingle.value = {
				companyId: companyId,
				fiscalYear: acYear.value,
				facilityBusinessId: globalFacilityBizId.value,
				year: dataGetAccountingProcesses.value?.find(
					(item: any) => item.month === monthSelected.value
				)?.year,
				month: monthSelected.value,
				type: data.type,
				displayCode: dataQueryGetAccountBookReportViewUrl.value.displayCode,
				emailInput: {
					senderName: sessionStorage.getItem("username"),
					receiverName: userInfor.value?.name,
					receiverAddress: userInfor.value?.email,
				},
			};
			modalEmailSingle.value = true;
		};
		const selectedMonth = (month: number) => {
			monthSelected.value = month;
		};

		const actionPrint = (data: any) => {
			// gridRef.value?.instance.deselectAll()
			dataQueryGetAccountBookReportViewUrl.value.year =
				dataGetAccountingProcesses.value?.find(
					(item: any) => item.month === monthSelected.value
				)?.year;
			dataQueryGetAccountBookReportViewUrl.value.type = data.type;
			triggerGetAccountBookReportViewUrl.value = true;
		};
		return {
			acYear,
			monthSelected,
			selectedMonth,
			dataQueryGetAccountBookReportViewUrl,
			move_column,
			colomn_resize,
			dataGetAccountingProcesses,
			loadingGetAccountingProcesses,
			// valueCheckBox,
			dataSourceAC510,
			actionPrint,
			modalEmailSingle,
			actionOpenPopupEmailSingle,
			popupDataEmailSingle,
		};
	},
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
