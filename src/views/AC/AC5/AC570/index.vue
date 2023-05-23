<template>
	<action-header :buttonDelete="false" :buttonSearch="false" :buttonSave="false" :buttonPrint="false" />
	<div id="ac-570">
		<div class="page-content">
			<a-row>
				<a-col span="24" class="data-table">
					<a-spin :spinning="loadingGetBudgetSubjectTransitions" size="large">
						<DxDataGrid noDataText="내역이 없습니다" id="gridContainer" :show-row-lines="true"
							:hoverStateEnabled="true" :data-source="dataSource" :show-borders="true" key-expr="transitionId"
							:allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
							@selection-changed="selectionChanged" v-model:selected-row-keys="selectedRowKeys"
							:column-auto-width="true" @focused-row-changing="onFocusedRowChanging" ref="dataGridRef"
							v-model:focused-row-key="focusedRowKey" :focused-row-enabled="true">
							<DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
							<DxScrolling mode="standard" show-scrollbar="always" />
							<DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
							<DxPaging :enabled="false" />
							<DxExport :enabled="true" />
							<DxToolbar>
								<DxItem name="searchPanel" />
								<DxItem name="exportButton" css-class="cell-button-export" />
								<DxItem location="after" template="print" css-class="cell-button-add" />
								<DxItem location="after" template="group_email" css-class="cell-button-add" />
								<DxItem location="after" template="button-history" css-class="cell-button-add" />
								<DxItem location="after" template="button-template" css-class="cell-button-add" />
							</DxToolbar>
							<template #print>
								<a-tooltip>
									<template #title>출력 / 저장</template>
									<img @click="actionPrint" src="@/assets/images/print.svg" alt="" style="width: 25px" />
								</a-tooltip>
							</template>
							<template #group_email>
								<img @click="actionSendEmailGroup" src="@/assets/images/group_email.png" alt=""
									style="width: auto; height: 25px; margin-left: 6px" />
							</template>
							<template #button-history>
								<DxButton icon="plus" @click="modalHistory">
									<HistoryOutlined style="font-size: 18px" />
								</DxButton>
							</template>
							<template #button-template>
								<a-tooltip placement="topLeft">
									<template #title>과목전용조서 등록</template>
									<div>
										<DxButton icon="plus" @click="actionCreate" />
									</div>
								</a-tooltip>
							</template>
							<DxColumn caption="전용일자" data-field="transitionDate" cell-template="transitionDate" />
							<template #transitionDate="{ data }">
								{{ $filters.formatDate(data.value) }}
							</template>
							<DxColumn caption="관" cell-template="customDxColumn2" data-field="sourceCode1" />
							<template #customDxColumn2="{ data }">
								<div>{{ data.data.sourceCode1 }}</div>
								<div class="bottomRow">{{ data.data.transitionCode1 }}</div>
							</template>

							<DxColumn caption="항" cell-template="customDxColumn3" data-field="sourceCode2" />
							<template #customDxColumn3="{ data }">
								<div>{{ data.data.sourceCode2 }}</div>
								<div class="bottomRow">{{ data.data.transitionCode2 }}</div>
							</template>

							<DxColumn caption="목" cell-template="customDxColumn4" data-field="sourceCode3" />
							<template #customDxColumn4="{ data }">
								<div>{{ data.data.sourceCode3 }}</div>
								<div class="bottomRow">{{ data.data.transitionCode3 }}</div>
							</template>

							<DxColumn caption="세목" cell-template="customDxColumn5" data-field="sourceCode" />
							<template #customDxColumn5="{ data }">
								<div>{{ data.data.sourceCode }}</div>
								<div class="bottomRow">{{ data.data.transitionCode }}</div>
							</template>

							<DxColumn caption="예산액" cell-template="customDxColumn6" data-field="sourceBudgetAmount" />
							<template #customDxColumn6="{ data }">
								<div>
									{{ $filters.formatCurrency(data.data.sourceBudgetAmount) }}
								</div>
								<div class="bottomRow">
									{{
										$filters.formatCurrency(data.data.transitionBudgetAmount)
									}}
								</div>
							</template>

							<DxColumn caption="전용액" data-field="transitionAmount" cell-template="customDxColumn7" />
							<template #customDxColumn7="{ data }">
								<div>
									{{ $filters.formatCurrency(-data.data.transitionAmount) }}
								</div>
								<div class="bottomRow">
									{{ $filters.formatCurrency(data.data.transitionAmount) }}
								</div>
							</template>

							<DxColumn caption="예산현액" css-class="cell-right" cell-template="customDxColumn8"
								data-field="customDxColumn8One" />
							<template #customDxColumn8="{ data }">
								<div>{{ data.data.customDxColumn8One }}</div>
								<div class="bottomRow">{{ data.data.customDxColumn8Two }}</div>
							</template>

							<DxColumn caption="지출액" cell-template="customDxColumn9" data-field="sourceExpenditureAmount" />
							<template #customDxColumn9="{ data }">
								<div>
									{{
										$filters.formatCurrency(data.data.sourceExpenditureAmount)
									}}
								</div>
								<div class="bottomRow">
									{{
										$filters.formatCurrency(
											data.data.transitionExpenditureAmount
										)
									}}
								</div>
							</template>

							<DxColumn caption="불용액" css-class="cell-right" cell-template="customDxColumn10"
								data-field="customDxColumn10One" />
							<template #customDxColumn10="{ data }">
								<div>{{ data.data.customDxColumn10One }}</div>
								<div class="bottomRow">{{ data.data.customDxColumn10Two }}</div>
							</template>

							<DxColumn caption="최종저장일시" data-field="savedAt" data-type="date" format="yyyy-MM-dd HH:mm" />
							<DxColumn caption="최종저장아이디" data-field="savedBy" />
							<DxColumn :width="100" cell-template="pupop" css-class="cell-center" />
							<template #pupop="{ data }">
								<div class="custom-action" style="font-size: 16px">
									<EditOutlined @click="onOpenPopupDetail(data.data)" />
									<a-tooltip placement="topLeft">
										<template #title>과목전용조서 삭제</template>
										<DeleteOutlined class="ml-15"
											@click="actonDeleteBudgetSubjectTransition(data.data)" />
									</a-tooltip>
								</div>
							</template>
						</DxDataGrid>
					</a-spin>
				</a-col>
			</a-row>
		</div>
		<HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" title="변경이력"
			typeHistory="ac-570" />
		<AddPopup :modalStatus="modalStatusAdd" @closePopup="modalStatusAdd = false" @callApi="trigger = true" />
		<DetailPopup :modalStatus="modalStatusDetail" @closePopup="modalStatusDetail = false" :dataDetail="popupData"
			@callApi="trigger = true" />
		<EmailGroupPopup :modalStatus="modalEmailGroupStatus" @closePopup="modalEmailGroupStatus = false"
			:selectedRowKeys="selectedRowKeys" />
		<ConfirmDeletePopup :modalStatus="modalRowDelete" @closePopup="modalRowDelete = false"
			:contentYes="Message.getMessage('AC570', '001').yes" :contentNo="Message.getMessage('AC570', '001').no"
			@confirmDelete="confirmDelete">{{ Message.getMessage('AC570', '001').message }}</ConfirmDeletePopup>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, createVNode } from "vue";
import HistoryPopup from "@/components/HistoryPopup.vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useStore } from "vuex";
import {
	DxDataGrid,
	DxColumn,
	DxToolbar,
	DxSelection,
	DxItem,
	DxExport,
	DxScrolling,
	DxPaging,
	DxSearchPanel,
} from "devextreme-vue/data-grid";
import {
	EditOutlined,
	HistoryOutlined,
	DeleteOutlined,
	SaveOutlined,
} from "@ant-design/icons-vue";
import EmailGroupPopup from "./components/EmailGroupPopup.vue";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/AC/AC5/AC570";
import mutations from "@/graphql/mutations/AC/AC5/AC570";
import DxButton from "devextreme-vue/button";
import { companyId } from "@/helpers/commonFunction";
import AddPopup from "./components/AddPopup.vue";
import { Message } from "@/configs/enum";
import DetailPopup from "./components/DetailPopup.vue";
import filters from "@/helpers/filters";
// import { Modal } from 'ant-design-vue';
export default defineComponent({
	components: {
		AddPopup,
		DxSelection,
		DetailPopup,
		EmailGroupPopup,
		DxDataGrid,
		DxColumn,
		EditOutlined,
		HistoryOutlined,
		DxToolbar,
		DxItem,
		DxExport,
		DeleteOutlined,
		DxButton,
		HistoryPopup,
		SaveOutlined,
		DxScrolling,
		DxPaging,
		DxSearchPanel,
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
		const dataAccountSubject = ref(
			JSON.parse(sessionStorage.getItem("accountSubject") ?? "[]")
		);
		const modalHistoryStatus = ref<boolean>(false);
		const modalEmailGroupStatus = ref<boolean>(false);
		const modalRowDelete = ref<boolean>(false);
		let popupData = ref();
		const focusedRowKey = ref();
		const modalStatus = ref(false);
		const modalStatusAdd = ref(false);
		const modalStatusDelete = ref(false);
		let trigger = ref<boolean>(true);
		let triggerGetBudgetSubjectTransitionReportViewUrl = ref<boolean>(false);
		const dataSource: any = ref([]);
		const modalStatusDetail = ref<boolean>(false);
		const dataGridRef = ref(); // ref of grid
		const originData = {
			companyId: companyId,
			fiscalYear: acYear.value,
			facilityBusinessId: globalFacilityBizId.value,
		};
		const originDataGetBudgetSubjectTransitionReportViewUrl = {
			companyId: companyId,
			fiscalYear: acYear.value,
			facilityBusinessId: globalFacilityBizId.value,
			transitionIds: [],
		};
		const dataRows = ref([]);
		const selectedRowKeys = ref([]);
		const transitionId = ref();

		// ================GRAPQL==============================================
		// query getBudgetSubjectTransitions
		const {
			result: resGetBudgetSubjectTransitions,
			loading: loadingGetBudgetSubjectTransitions,
			onError: errorGetBudgetSubjectTransitions,
		} = useQuery(queries.getBudgetSubjectTransitions, originData, () => ({
			enabled: trigger.value,
			fetchPolicy: "no-cache",
		}));

		// query getBudgetSubjectTransitionReportViewUrl
		const {
			result: resGetBudgetSubjectTransitionReportViewUrl,
			loading: loadingGetBudgetSubjectTransitionReportViewUrl,
			onError: errorGetBudgetSubjectTransitionReportViewUrl,
		} = useQuery(
			queries.getBudgetSubjectTransitionReportViewUrl,
			originDataGetBudgetSubjectTransitionReportViewUrl,
			() => ({
				enabled: triggerGetBudgetSubjectTransitionReportViewUrl.value,
				fetchPolicy: "no-cache",
			})
		);

		// mutation deleteBudgetSubjectTransition
		const {
			mutate: deleteBudgetSubjectTransition,
			onDone: doneDeleteBudgetSubjectTransition,
			onError: errorDeleteBudgetSubjectTransition,
		} = useMutation(mutations.deleteBudgetSubjectTransition);

		// ============== ON DONE MUTATION GRAPHQL ===============
		// getBudgetSubjectTransitions
		errorGetBudgetSubjectTransitions((e) => {
			//notification('error', e.message)
		});

		// getBudgetSubjectTransitionReportViewUrl
		errorGetBudgetSubjectTransitionReportViewUrl((e) => {
			//notification('error', e.message)
		});

		// deleteBudgetSubjectTransition
		doneDeleteBudgetSubjectTransition((e) => {
			trigger.value = true;
			notification("success", Message.getMessage("COMMON", "402").message);
		});
		errorDeleteBudgetSubjectTransition((e) => {
			//notification('error', e.message)
		});

		// ================WATCHING============================================
		// 1. GetBudgetSubjectTransitions
		watch(resGetBudgetSubjectTransitions, (value) => {
			trigger.value = false;
			// dataSource.value = value.getBudgetSubjectTransitions
			selectedRowKeys.value = value.getBudgetSubjectTransitions?.map(
				(item: any) => {
					let row = dataAccountSubject.value.find(
						(data: any) =>
							data.useStartDate <= item.transitionDate <= data.useFinishDate
					);
					let sourceCode = item.sourceCode
					item.sourceCode =
						row.codes?.find((data: any) => data.code == sourceCode)
							?.name ?? sourceCode;
					item.sourceCode1 =
						row.codes?.find((data: any) => data.code == sourceCode)
							?.name1 ?? sourceCode;
					item.sourceCode2 =
						row.codes?.find((data: any) => data.code == sourceCode)
							?.name2 ?? sourceCode;
					item.sourceCode3 =
						row.codes?.find((data: any) => data.code == sourceCode)
							?.name3 ?? sourceCode;

					let transitionCode = item.transitionCode
					item.transitionCode =
						row.codes?.find((data: any) => data.code == transitionCode)
							?.name ?? transitionCode;
					item.transitionCode1 =
						row.codes?.find((data: any) => data.code == transitionCode)
							?.name1 ?? transitionCode;
					item.transitionCode2 =
						row.codes?.find((data: any) => data.code == transitionCode)
							?.name2 ?? transitionCode;
					item.transitionCode3 =
						row.codes?.find((data: any) => data.code == transitionCode)
							?.name3 ?? transitionCode;

					item.customDxColumn8One = filters.formatCurrency(
						item.sourceBudgetAmount + -item.transitionAmount
					);
					item.customDxColumn8Two = filters.formatCurrency(
						item.sourceBudgetAmount +
						-item.transitionAmount +
						item.transitionAmount
					);

					item.customDxColumn10One = filters.formatCurrency(
						item.sourceBudgetAmount +
						-item.transitionAmount -
						item.sourceExpenditureAmount
					);
					item.customDxColumn10Two = filters.formatCurrency(
						item.sourceBudgetAmount +
						-item.transitionAmount +
						item.transitionAmount -
						item.transitionExpenditureAmount
					);

					return item.transitionId;
				}
			);
			dataSource.value = value.getBudgetSubjectTransitions;
		});

		// 2. GetBudgetSubjectTransitionReportViewUrl
		watch(resGetBudgetSubjectTransitionReportViewUrl, (value) => {
			triggerGetBudgetSubjectTransitionReportViewUrl.value = false;
			if (value) {
				window.open(value.getBudgetSubjectTransitionReportViewUrl);
			}
		});

		// ================FUNCTION============================================

		const modalHistory = (data: any) => {
			modalHistoryStatus.value = true;
		};

		const onFocusedRowChanging = (e: any) => { };
		const actionCreate = (e: any) => {
			modalStatusAdd.value = true;
		};

		const onOpenPopupDetail = (data: any) => {
			popupData.value = data;
			modalStatusDetail.value = true;
		};
		const selectionChanged = (data: any) => {
			dataRows.value = data.selectedRowsData;
		};

		const actonDeleteBudgetSubjectTransition = (data: any) => {
			transitionId.value = data.transitionId;
			modalRowDelete.value = true;
		};
		const confirmDelete = () => {
			let variables = {
				companyId: companyId,
				fiscalYear: acYear.value,
				facilityBusinessId: globalFacilityBizId.value,
				transitionId: transitionId.value,
			};
			deleteBudgetSubjectTransition(variables);
		};

		const actionPrint = () => {
			if (dataRows.value.length) {
				originDataGetBudgetSubjectTransitionReportViewUrl.transitionIds =
					selectedRowKeys.value;
				triggerGetBudgetSubjectTransitionReportViewUrl.value = true;
			} else {
				notification("error", `항목을 최소 하나 이상 선택해야합니다`);
			}
		};

		const actionSendEmailGroup = () => {
			if (dataRows.value.length) {
				modalEmailGroupStatus.value = true;
			} else {
				notification("error", `항목을 최소 하나 이상 선택해야합니다`);
			}
		};

		return {
			trigger,
			selectionChanged,
			selectedRowKeys,
			loadingGetBudgetSubjectTransitions,
			move_column,
			colomn_resize,
			modalHistoryStatus,
			modalEmailGroupStatus,
			modalRowDelete,
			popupData,
			dataSource,
			modalStatus,
			focusedRowKey,
			modalStatusAdd,
			onFocusedRowChanging,
			onOpenPopupDetail,
			modalStatusDetail,
			actionCreate,
			modalHistory,
			modalStatusDelete,
			Message,
			dataGridRef,
			actonDeleteBudgetSubjectTransition,
			actionPrint,
			actionSendEmailGroup,
			confirmDelete,
		};
	},
});
</script>
<style scoped lang="scss" src="./style/style.scss"></style>

<style>
.confirmDelete .anticon {
	color: black !important;
}
</style>
