<template>
	<SearchArea :rerenderReport="activeSearch" />
	<div class="grid-view">
		<div class="content-grid">
			<a-spin :spinning="loadingTable" size="large">
				<DxDataGrid id="DxDataGrid-bf-630-tab4" :show-row-lines="true" :hoverStateEnabled="true"
					:data-source="dataSource" :show-borders="true" key-expr="companyId" class="mt-10"
					:allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true"
					@selection-changed="selectionChanged" v-model:selected-row-keys="selectedRowKeys" noDataText="내역이 없습니다">
					<DxPaging :enabled="false" />
					<DxScrolling mode="standard" show-scrollbar="always" />
					<DxSelection mode="multiple" :fixed="true" show-check-boxes-mode="onClick" :deferred="false" />
					<DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
					<DxExport :enabled="true" />
					<DxToolbar>
						<DxItem template="box-action-left" location="before" />
						<DxItem template="box-action-right" location="after" />
						<DxItem name="searchPanel" />
						<DxItem name="exportButton" css-class="cell-button-export" />
					</DxToolbar>
					<template #box-action-left>
						<a-form-item label="파일 제작 설정" label-align="left">
							<div class="custom-note d-flex-center">
								<switch-basic textCheck="세무대리인신고" textUnCheck="납세자자진신고" :disabled="true" />
								<info-tool-tip>본 설정으로 적용된 파일로 다운로드 및 메일발송 됩니다.</info-tool-tip>
							</div>
						</a-form-item>
					</template>
					<template #box-action-right>
						<div class="d-flex-center custom-date">
							<a-form-item label="제출연월일" label-align="left">
								<date-time-box width="150px" v-model:valueDate="dateSubmission" />
							</a-form-item>
							<a-tooltip title="전자신고파일 제작 요청">
								<div class="btn-modal-save" @click="requestIncomeFile">
									<SaveOutlined class="fz-20 ml-5 action-save" />
									<span style="margin-left: 5px">파일제작요청</span>
								</div>
							</a-tooltip>
						</div>
					</template>
					<DxColumn caption="사업자코드" cell-template="companyCode" data-field="company.code" />
					<template #companyCode="{ data }">
						{{
							data.data.companyServiceContract.active
							? data.data.company.code
							: "해지"
						}}
					</template>
					<DxColumn caption="상호 주소" cell-template="companyName" data-field="company.name" />
					<template #companyName="{ data }">
						{{ data.data.company.name }}
						{{ data.data.company.address }}
					</template>
					<DxColumn caption="사업자등록번호" cell-template="bizNumber" data-field="company.bizNumber" />
					<template #bizNumber="{ data }">
						{{ $filters.formatBizNumber(data.data.company.bizNumber) }}
					</template>
					<DxColumn caption="최종제작요청일시" data-field="lastProductionRequestedAt" data-type="date"
						format="yyyy-MM-dd HH:mm" />
					<DxColumn caption="제작현황" cell-template="imputed" width="430" />
					<template #imputed="{ data }">
						<GetStatusTable :data="data.data" :message="data.data.causeOfProductionFailure" />
						<span class="before-production-tag" v-if="!data.data.beforeProduction">제작요청전</span>
					</template>
				</DxDataGrid>
				<div class="custom-smmary">
					<div class="dx-datagrid-summary-item dx-datagrid-text-content"
						v-html="`전체 <span>[${dataSource.length}]</span>`"></div>
					<div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="productStatusSummary()"></div>
				</div>
			</a-spin>
		</div>
	</div>
	<request-file-popup v-if="modalRequestFile" :modalStatus="modalRequestFile" @closePopup="modalRequestFile = false"
		:data="dataRequestFile" tabName="tab4" @onDoneRequest="doneRequestFile"></request-file-popup>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import DxCheckBox from "devextreme-vue/check-box";
import { useQuery, useApolloClient } from "@vue/apollo-composable";
import SearchArea from "./SearchArea.vue";
import { useStore } from "vuex";
import {
	DxDataGrid,
	DxToolbar,
	DxSelection,
	DxColumn,
	DxItem,
	DxScrolling,
	DxSummary,
	DxTotalItem,
	DxPaging,
	DxSearchPanel,
	DxExport,
} from "devextreme-vue/data-grid";
import { SaveOutlined } from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import queries from "@/graphql/queries/BF/BF6/BF630/index";
import notification from "@/utils/notification";
import dayjs, { Dayjs } from "dayjs";
import RequestFilePopup from "./RequestFilePopup.vue";
import GetStatusTable from "./GetStatusTable.vue";
import { Message } from "@/configs/enum";
export default defineComponent({
	components: {
		DxCheckBox,
		SaveOutlined,
		DxButton,
		DxDataGrid,
		DxToolbar,
		DxSelection,
		DxColumn,
		DxItem,
		DxScrolling,
		DxSummary,
		DxTotalItem,
		RequestFilePopup,
		GetStatusTable,
		DxPaging,
		DxSearchPanel,
		DxExport,
		SearchArea,
	},
	props: {
		activeSearch: {
			type: Number,
			default: 0,
		},
	},
	setup(props, { emit }) {
		const store = useStore();
		const userInfor = computed(() => store.state.auth.userInfor);
		const move_column = computed(() => store.state.settings.move_column);
		const colomn_resize = computed(() => store.state.settings.colomn_resize);
		const trigger = ref<boolean>(true);
		const dateSubmission = ref(new Date().getFullYear() + 1 + "0310");
		const filterBF630 = computed(() => store.state.common.filterBF630);
		let modalRequestFile = ref<boolean>(false);
		let companyIds = Array();
		const dataRequestFile = ref();
		const dataSource = ref<any>([]);
		const dataSourceOrigin = ref<any>([]);

		let payloadIncomeBusinessPayment = {
			imputedYear: filterBF630.value.imputedYear,
		};
		let selectedRowKeys = ref<any>([]);
		const { client } = useApolloClient();
		const productionCount = ref(0);
		const beforeCount = ref(0);
		const loadingTable = ref(true);
		// ============ GRAPQL ===============================
		const {
			result: resIncomeExtraPayment,
			loading: loadingIncomeExtraPayment,
			onError: onErrorIncomeExtraPayment,
		} = useQuery(
			queries.searchIncomeExtraPaymentStatementElectronicFilingsByYear,
			payloadIncomeBusinessPayment,
			() => ({
				enabled: trigger.value,
				fetchPolicy: "no-cache",
			})
		);

		const fetchDataStatus = async (companies: any) => {
			if (companies.length === 0) return;
			for (let i = 0; i < companies.length; i++) {
				if (companies[i]) {
					await client.query({
						query: queries.getElectronicFilingsByIncomeRetirementPaymentStatement,
						variables: {
							input: {
								companyId: companies[i].companyId,
								imputedYear: companies[i].imputedYear,
							}
						},
					}).then((res) => {
						let data = res.data.getElectronicFilingsByIncomeRetirementPaymentStatement
						let productionStatus = data[0].productionStatus;
						let causeOfProductionFailure = data[0]?.causeOfProductionFailure;
						productionCount.value--;
						dataSourceOrigin.value.forEach((item: any) => {
							if (item.companyId == companies[i].companyId) {
								item.productionStatus = productionStatus;
								if (productionStatus == -1) {
									item.causeOfProductionFailure = causeOfProductionFailure;
								}
								if (productionStatus == 2) {
									item.allowSelection = false;
								}
							}
						});
					}).catch((err: any) => err);
				}
			}
		};
		// ===================DONE GRAPQL==================================
		// watch result  api searchIncomeExtraPaymentStatementElectronicFilingsByYear
		watch(resIncomeExtraPayment, async (value) => {
			loadingTable.value = true;
			trigger.value = false;
			beforeCount.value = 0;
			if (value) {
				let data =value.searchIncomeExtraPaymentStatementElectronicFilingsByYear;
				let result = Object.values(
					data.reduce((acc: any, curr: any) => {
						if (!acc[curr.companyId] ||dayjs(curr.lastProductionRequestedAt).isBefore(dayjs(acc[curr.companyId].lastProductionRequestedAt))) {
							acc[curr.companyId] = curr;
						}
						return acc;
					}, {})
				);

				dataSourceOrigin.value = result.map((item: any) => {
					item.companyCode = item.company.code;
					item.companyName = item.company.name;
					item.manageUserId = item.companyServiceContract.manageUserId
					item.salesRepresentativeId = item.companyServiceContract.salesRepresentativeId;
					item.active = item.companyServiceContract.active
					if (item.lastProductionRequestedAt) {
						item.beforeProduction = true;
					} else {
						item.beforeProduction = false;
					}
					return item;
				});
				await fetchDataStatus(
					dataSourceOrigin.value.map((item: any) => {
						if (item.lastProductionRequestedAt) {
							productionCount.value = item.lastProductionRequestedAt
								? productionCount.value + 1
								: productionCount.value;
							return {
								companyId: item.companyId,
								imputedYear: item.imputedYear,
								// reportId: item.reportId,
							};
						}
						return;
					})
				);
			}
			if (productionCount.value == 0) {
				searchByFilter();
			}
		});
		onErrorIncomeExtraPayment((e) => {
			//notification('error', e.message)
		});

		// watch active searching
		watch(() => props.activeSearch, (value) => {
			loadingTable.value = true;
			searchByFilter();
		});
		watch(() => filterBF630.value.imputedYear, (value) => {
			payloadIncomeBusinessPayment.imputedYear = value;
			trigger.value = true;
			loadingTable.value = true;
		});
		// ----------------request file---------

		const selectionChanged = (event: any) => {
			const listItemStatus2: any = [];
			dataSource.value.forEach((items: any) => {
				if (items.productionStatus == 2) {
					listItemStatus2.push(items.companyId);
				}
			});
			const indexItemStatus2 = selectedRowKeys.value.findIndex((items: any) =>
				listItemStatus2.includes(items)
			);
			if (indexItemStatus2 >= 0) {
				selectedRowKeys.value.splice(indexItemStatus2, 1);
			}
			companyIds = selectedRowKeys.value;
		};
		// request file popup action
		const requestIncomeFile = () => {
			if (companyIds.length) {
				dataRequestFile.value = {
					companyIds: companyIds,
					filter: { imputedYear: filterBF630.value.imputedYear },
					emailInput: {
						receiverName: userInfor.value.name,
						receiverAddress: userInfor.value.email,
					},
				};
				modalRequestFile.value = true;
			} else {
				notification("warning", Message.getMessage("COMMON", "404").message);
			}
		};

		const countStatus = (arr: any[], type: number) => {
			if (Object.keys(arr).length === 0 || arr.length === 0) return 0;
			let count = arr.reduce((acc: any, crr: any) => {
				let item =
					typeof crr["productionStatus"] == "boolean"
						? 0
						: crr["productionStatus"];
				acc[item] = acc[item] ? acc[item] + 1 : 1;
				return acc;
			}, {});
			if (count[type]) {
				return count[type];
			}
			return 0;
		};
		const productStatusSummary = () => {
			let totalbeforeProduction = 0;
			dataSource.value.forEach((items: any) => {
				if (!items?.beforeProduction) {
					totalbeforeProduction++;
				}
			});
			return `제작요청전 <span>[${totalbeforeProduction}]</span> 
              제작대기 <span>[${countStatus(dataSource.value, 0)}]</span> 
              제작중 <span>[${countStatus(dataSource.value, 1)}]</span> 
			  제작성공 <span>[${countStatus(dataSource.value, 2)}]</span>
              제작실패 <span>[${countStatus(dataSource.value, -1)}]</span>`;
		};

		const searchByFilter = async () => {
			let {
				imputedYear,
				// afterDeadline,
				...compareObj
			} = filterBF630.value;
			let arr = dataSourceOrigin.value.filter((item: any) => {
				return Object.keys(compareObj).every((key: any) => {
					if (key === "productionStatuses") {
						if (!compareObj['beforeProduction']) return compareObj['beforeProduction'] == item['beforeProduction'];
						//error search main reason is
						return compareObj.productionStatuses.length > 0
							? compareObj.productionStatuses.findIndex(
								(status: any) => status === item.productionStatus
							) > -1
							: true;
					}
					if (compareObj[key]) {
						return compareObj[key] == item[key];
					}
					return true;
				});
			});
			dataSource.value = arr;
			beforeCount.value = 1;
			loadingTable.value = false;
		};

		const doneRequestFile = () => {
			modalRequestFile.value = false;
			trigger.value = true;
			loadingTable.value = true;
		};
		return {
			move_column,
			colomn_resize,
			dataSource,
			loadingTable,
			requestIncomeFile,
			modalRequestFile,
			dataRequestFile,
			dateSubmission,
			productStatusSummary,
			selectionChanged,
			selectedRowKeys,
			doneRequestFile,
		};
	},
});
</script>
<style scoped lang="scss" src="../style/styleTabs.scss"></style>
<style scoped lang="scss">
:deep(.ant-form-item-label > label) {
	width: 110px;
	// padding-left: 10px;
}
</style>
