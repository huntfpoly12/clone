<template>
	<action-header :buttonDelete="false" :buttonSearch="false" :buttonSave="false" :buttonPrint="false" />
	<div class="ac-120">
		<div class="top">
			<a-spin tip="Loading..." :spinning="loadingGetAccountingProcesses">
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
			<div class="flex">
				<div class="action">
					<ProcessStatus
						v-if="store.state.common.ac120.statusProcess"
						:valueStatus="store.state.common.ac120.statusProcess"
						:disabled="true" />
					<button-basic v-else mode="contained" style="width: 90px" :disabled="true">
					</button-basic>
					<DxButton icon="plus" class="ml-4" @click="modalHistoryAccountingProcess">
						<a-tooltip placement="top" title="마감상태 변경이력">
							<HistoryOutlined style="font-size: 18px" />
						</a-tooltip>
					</DxButton>
					<div class="ml-10">
						<span style="color: rgb(202, 131, 0);">(주의) 동일한 통장내역 전표는 함께 선택되며, 취소시 함께 취소됩니다.</span>
					</div>
				</div>
				<div class="action">
					<a-tooltip placement="top" color="black">
						<template #title>전표 신규 건별 등록</template>
						<span>
							<DxButton class="ml-4 custom-button" type="default" :disabled="store.state.common.ac120.statusProcess != 10" :height="$config_styles.HeightInput"
								@click="actionOpenModalAdd" :width="120">
								<div class="d-flex-center">
									<PlusOutlined style="font-size: 14px" />
									<span class="pl-5">전표 건별 등록</span>
								</div>
							</DxButton>
						</span>
					</a-tooltip>
					<a-tooltip placement="top" color="black">
						<template #title>결의서 신규 엑셀 등록</template>
						<span>
							<DxButton class="ml-4 custom-button" type="default" disabled="true" :width="130"
								:height="$config_styles.HeightInput">
								<div class="d-flex-center">
									<PlusOutlined style="font-size: 14px" />
									<span class="pl-5">결의서 엑셀 등록</span>
								</div>
							</DxButton>
						</span>
					</a-tooltip>
					<DxButton class="ml-4 mr-4 custom-button" type="default" :width="90"
						:disabled="store.state.common.ac120.statusProcess != 10"
						:height="$config_styles.HeightInput" @click="actionModalDelete">
						<div class="d-flex-center">
							<span><checkbox-basic :valueCheckbox="true" disabled="true" /></span>
							<span>전표취소</span>
						</div>
					</DxButton>
					<DxButton icon="plus" @click="modalHistoryAccountingDocuments">
						<a-tooltip placement="topLeft" title="전표 변경이력">
							<HistoryOutlined style="font-size: 18px" />
						</a-tooltip>
					</DxButton>
				</div>
			</div>
		</div>
		<DxDrawer :opened-state-mode="'shrink'" :position="'bottom'" :reveal-mode="'expand'"
			v-model:opened="store.state.common.ac120.statusShowFull" :height="'100%'" template="listMenu">
			<template #listMenu="{ data }">
				<DetailComponent @changeAmountDataGrid="changeAmountDataGrid" />
			</template>
			<div id="content" class="dx-theme-background-color">
				<a-spin tip="Loading..." :spinning="loadingGetAccountingDocuments">
					<DxDataGrid noDataText="내역이 없습니다" id="dataGridAc120"
						:class="store.state.common.ac120.statusShowFull ? 'hiddenTable' : ''"
						key-expr="accountingDocumentId" :show-row-lines="true" :hoverStateEnabled="true"
						:data-source="dataSource" :show-borders="true" ref="gridRefAC120"
						:allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
						v-model:focused-row-key="store.state.common.ac120.focusedRowKey" :focused-row-enabled="true"
						@focused-row-changing="onFocusedRowChanging" :column-auto-width="true"
						v-model:selected-row-keys="store.state.common.ac120.selectedRowKeys"
						@selection-changed="selectionChanged">
						<DxRowDragging
							v-if="store.state.common.ac120.statusProcess == 10"
							:allow-reordering="true" :show-drag-icons="true" :on-reorder="onReorder" />
						<DxSelection select-all-mode="allPages" show-check-boxes-mode="onClick" mode="multiple" />
						<DxScrolling mode="standard" show-scrollbar="always" />
						<DxPaging :enabled="false" />
						<DxColumn caption="일자" :allow-sorting="false" cell-template="transactionDetailDate"
							data-field="transactionDetailDate" width="85" />
						<template #transactionDetailDate="{ data }">
							{{ $filters.formatDate(data.value) }}
						</template>

						<DxColumn caption="순번" :allow-sorting="false" data-field="documentOrderByDate" width="45" />

						<DxColumn caption="결의번호" :allow-sorting="false" data-field="resolutionNumber" width="68" />

						<DxColumn caption="통장" :allow-sorting="false" cell-template="bankbook" data-field="bankbook"
							width="80" />
						<template #bankbook="{ data }">
							<a-tooltip placement="top" :title="data.data.bankbook?.type +
								' ' +
								data.data.bankbook?.bankbookNumber
								">
								<div>{{ data.data.bankbook?.bankbookNickname }}</div>
							</a-tooltip>
						</template>

						<DxColumn caption="결의 구분" :allow-sorting="false" data-field="resolutionClassification"
							cell-template="resolutionClassification" width="75" />
						<template #resolutionClassification="{ data }">
							{{
								store.state.common.ac120.arrResolutionClassification.find(
									(item: any) => data.data.resolutionClassification == item.id
								)?.text
							}}
						</template>

						<DxColumn caption="수입액" :allow-sorting="false" css-class="cell-right" cell-template="amountCustom1" width="80" />
						<template #amountCustom1="{ data }">
							{{
								data.data.resolutionClassification == 1
								? $filters.formatCurrency(data.data.amount)
								: 0
							}}
						</template>

						<DxColumn caption="지출액" :allow-sorting="false" css-class="cell-right" cell-template="amountCustom2" width="80" />
						<template #amountCustom2="{ data }">
							{{
								data.data.resolutionClassification == 2
								? $filters.formatCurrency(data.data.amount)
								: 0
							}}
						</template>

						<DxColumn caption="잔액" :allow-sorting="false" data-field="balance" width="90" format="fixedPoint" />

						<DxColumn caption="통장적요" :allow-sorting="false" data-field="summaryOfBankbookDetail" width="75" />

						<DxColumn caption="적요" :allow-sorting="false" data-field="summary" />

						<DxColumn caption="계정과목" :allow-sorting="false" data-field="accountCode" cell-template="accountCode"
							width="150" />
						<template #accountCode="{ data }">
							<account-code-select :valueInput="data.data.accountCode" :readOnly="true" />
						</template>

						<DxColumn caption="상대계정" :allow-sorting="false" data-field="relationCode"
							cell-template="relationCode" width="150" />
						<template #relationCode="{ data }">
							<account-code-select :valueInput="data.data.relationCode" :readOnly="true" />
						</template>

						<DxColumn caption="자금원천" :allow-sorting="false" data-field="fundingSource" css-class="cell-left"
							cell-template="fundingSource" width="75" />
						<template #fundingSource="{ data }">
							{{
								store.state.common.ac120.arrFundingSource.find(
									(item: any) => data.data.fundingSource == item.id
								)?.text
							}}
						</template>

						<DxColumn caption="거래처" :allow-sorting="false" data-field="clientId" cell-template="clientId"
							width="75" />
						<template #clientId="{ data }">
							{{
								clients.find((item: any) => item.value == data.data.clientId)
									?.label
							}}
						</template>

						<DxColumn caption="증빙" :allow-sorting="false" data-field="proofCount" width="50" />

						<DxColumn caption="물품 내역" :allow-sorting="false" cell-template="normality" css-class="cell-center"
							width="75" />
						<template #normality="{ data }">
							<div v-if="data.data.resolutionClassification != 1">
								<PlusOutlined v-if="data.data.goodsCount == 0" class="icon-add"
									@click="actionPopupItemDetail(data.data)" />
								<div v-else style="cursor: pointer" @click="actionPopupItemDetail(data.data)">
									{{ data.data.goodsCount }}
								</div>
							</div>
						</template>

						<DxColumn caption="수기 여부" :allow-sorting="false" css-class="cell-center" cell-template="handwriting" width="75" />
						<template #handwriting="{ data }">
							<div class="slipRegistration">
								<DxButton v-if="data.data.handwriting == true" :focusStateEnabled="false" text="O"
									:style="{ backgroundColor: '#BB3835', color: 'white' }"
									:height="$config_styles.HeightInput" />
							</div>
						</template>

						<DxColumn caption="정상 여부" :allow-sorting="false" css-class="cell-center" cell-template="resolutionNormalStatus"
							width="75" />
						<template #resolutionNormalStatus="{ data }">
							<div class="slipRegistration">
								<DxButton :focusStateEnabled="false" :text="data.data.resolutionNormalStatus ? 'O' : 'X'"
									:style="{
										backgroundColor: data.data.resolutionNormalStatus
											? '#337614'
											: '#BB3835',
										color: 'white',
									}" :height="$config_styles.HeightInput" />
							</div>
						</template>
					</DxDataGrid>
					<!-- <div class="action"> -->
					<div style="
              border: 1px solid #ddd;
              border-top: none;
              background-color: #f2f5f7;
              display: flex;
              padding: 5px;
              justify-content: space-around;
            ">
						<div>
							<div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customCountRow()"></div>
						</div>
						<div style="margin-left: 20px">
							<div class="dx-datagrid-summary-item dx-datagrid-text-content"
								v-html="sumOfResolutionClassification1()">
							</div>
						</div>
						<div style="margin-left: 20px">
							<div class="dx-datagrid-summary-item dx-datagrid-text-content"
								v-html="sumOfResolutionClassification2()">
							</div>
						</div>
						<div style="margin-left: 20px">
							<div class="dx-datagrid-summary-item dx-datagrid-text-content">
								<a-tooltip placement="top" title="조정마감되지 않는경우 전월이 0입니다">
									<div style="display: inline">
										전월 잔액
										<span>[{{ $filters.formatCurrency(lastBalance) }}]</span>
									</div>
								</a-tooltip>
								<div style="display: inline" v-html="customBalance()"></div>
							</div>
						</div>
						<div style="margin-left: 20px">
							<div class="dx-datagrid-summary-item dx-datagrid-text-content"
								v-html="countResolutionNormalStatus()"></div>
						</div>
						<!-- </div> -->
					</div>
				</a-spin>
				<div class="detail-header mt-10"
					@click="store.state.common.ac120.statusShowFull = !store.state.common.ac120.statusShowFull">
					<a-row class="text-align-center">
						<a-col class="detail1">
							<a-row style="align-items: center;">
								<a-col :span="11">
									<div class="info-left">파란색 아무곳이나 누르시면 결의서 상세내역을 펼치거나 숨기실 수 있습니다</div>
								</a-col>
								<a-col :span="2">
									<span style="font-weight: bold; font-size: 18px;">결 의 서</span>
								</a-col>
								<a-col :span="11">
									<div class="info-right">
										<a-form-item label="결의번호">
											{{
												store.state.common.ac120.formData.resolutionNumber
												? "[" + store.state.common.ac120.formData.resolutionNumber + "]"
												: "[]"
											}}
										</a-form-item>
									</div>
								</a-col>
							</a-row>
						</a-col>
						<a-col class="detail2">
							<DxButton v-if="store.state.common.ac120.formData.handwriting == true"
								:focusStateEnabled="false" text="수기" :style="{ backgroundColor: '#BB3835', color: 'white' }"
								:height="$config_styles.HeightInput" />
							<div class="ml-24">
								<a-tooltip v-if="store.state.common.ac120.formData.resolutionNormalStatus == true"
									placement="top" color="black" title="정상 여부">
									<DxButton :focusStateEnabled="false" text="O"
										:style="{ backgroundColor: '#337614', color: 'white' }"
										:height="$config_styles.HeightInput" />
								</a-tooltip>
								<DxButton v-else :focusStateEnabled="false" text="X"
									:style="{ backgroundColor: '#BB3835', color: 'white' }"
									:height="$config_styles.HeightInput" />
							</div>
						</a-col>
					</a-row>
				</div>
			</div>
		</DxDrawer>
	</div>
	<PopupMessage :modalStatus="isModalConfirmChangeData" @closePopup="isModalConfirmChangeData = false"
		:typeModal="'confirm'" title="" content="변경 내용을 저장하시겠습니까?" okText="네" cancelText="아니요"
		@checkConfirm="handleConfirmChange" />
	<ModalDelete :modalStatus="statusModalDelete" @closePopup="statusModalDelete = false" :dataRows="dataRows" />

	<ModalAdd :modalStatus="statusModalAdd" @closePopup="statusModalAdd = false" :monthSelected="monthSelected" />

	<PopupItemDetails :modalStatus="statusModalItemDetail" @closePopup="statusModalItemDetail = false" />

	<HistoryPopup :modalStatus="modalHistoryStatusAccountingProcess"
		@closePopup="modalHistoryStatusAccountingProcess = false" :data="popupData" title="변경이력"
		typeHistory="ac-120-accounting-process" />
	<HistoryPopup :modalStatus="modalHistoryStatuAccountingDocuments"
		@closePopup="modalHistoryStatuAccountingDocuments = false" :data="popupData" title="변경이력"
		typeHistory="ac-120-accounting-documents" />
</template>
<script lang="ts">
import { useStore } from "vuex";
import DxButton from "devextreme-vue/button";
import {
	defineComponent,
	ref,
	reactive,
	computed,
	onMounted,
	watch,
} from "vue";
import ProcessStatus from "@/components/common/ProcessStatus.vue";
import {
	DxItem,
	DxDataGrid,
	DxColumn,
	DxScrolling,
	DxSelection,
	DxSummary,
	DxTotalItem,
	DxRowDragging,
	DxPaging,
} from "devextreme-vue/data-grid";
import DxDrawer from 'devextreme-vue/drawer';
import {
	HistoryOutlined,
	EditOutlined,
	PlusOutlined,
} from "@ant-design/icons-vue";
import { initialStateFormData } from "./utils/index";
import { Message } from "@/configs/enum";
import ModalDelete from "./components/ModalDelete.vue";
import ModalAdd from "./components/ModalAdd.vue";
import DetailComponent from "./components/DetailComponent.vue";
import PopupItemDetails from "./components/PopupItemDetails.vue";
import filters from "@/helpers/filters";
import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC1/AC120";
import mutations from "@/graphql/mutations/AC/AC1/AC120";
import { companyId } from "@/helpers/commonFunction";
import dayjs from "dayjs";
import notification from "@/utils/notification";
import DataSource from "devextreme/data/data_source";
import { Store } from "devextreme/data";
import { cloneDeep, isEqual } from "lodash";
// import {
// 	FullscreenOutlined,
// 	FullscreenExitOutlined,
// } from "@ant-design/icons-vue";
export default defineComponent({
	components: {
		ProcessStatus,
		DxItem,
		HistoryOutlined,
		DxDataGrid,
		DxColumn,
		DxScrolling,
		DxSelection,
		DxSummary,
		DxTotalItem,
		ModalDelete,
		ModalAdd,
		DxPaging,
		EditOutlined,
		PlusOutlined,
		PopupItemDetails,
		DxButton,
		DxRowDragging,
		DetailComponent,
		DxDrawer,
		// FullscreenOutlined,
		// FullscreenExitOutlined,
	},
	setup() {
		const store = useStore();
		const move_column = computed(() => store.state.settings.move_column);
		const colomn_resize = computed(() => store.state.settings.colomn_resize);
		const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? "0"));
		const globalFacilityBizId = ref<number>(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0"));
		const clients = computed(() => store.state.settings.clients);
		const dataApi = ref<any[]>([]);

		let isModalConfirmChangeData = ref(false);
		let statusModalDelete = ref(false);
		let statusModalAdd = ref(false);

		let statusModalItemDetail = ref(false);

		const gridRefAC120 = ref(); // ref of grid
		// const gridRefAC120Detail = ref(); // ref of grid

		const popupData = ref({});
		const modalHistoryStatusAccountingProcess = ref<boolean>(false);
		const modalHistoryStatuAccountingDocuments = ref<boolean>(false);

		const dataRows: any = ref([]);
		let keySelect = ref();
		store.state.common.ac120.formData = reactive({ ...initialStateFormData });
		const monthSelected = ref(dayjs().month() + 1);
		const lastBalance = ref<number>(0);
		const dataGetAccountingProcesses = ref<any>([]);
		const dataSource: any = ref<DataSource>();
		// get store data
		const storeDataSource: any = computed(() => dataSource.value?.store() as Store);
		const totalCount = computed(() => dataSource.value?.totalCount());
		const triggerGetAccountingProcesses = ref<boolean>(true);
		const triggerGetAccountingDocuments = ref<boolean>(true);
		const dataQueryGetAccountingProcesses = ref({
			companyId: companyId,
			fiscalYear: acYear.value,
			facilityBusinessId: globalFacilityBizId.value,
		});
		const dataQueryGetAccountingDocuments = ref({
			companyId: companyId,
			fiscalYear: acYear.value,
			facilityBusinessId: globalFacilityBizId.value,
			year: acYear.value,
			month: dayjs().month() + 1,
		});
		let formDataOld: any = reactive({ ...initialStateFormData });
		let idRowFocusedRowNew = ref();
		let statusClickAdd = ref<boolean>(false);
		// let statusClickMonth = ref<boolean>(false)
		let monthNewClick = ref<number>(0);
		store.state.common.ac120.statusProcess = computed(() => dataGetAccountingProcesses.value.find((item: any) => item.month === monthSelected.value)?.status || 0)

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
		errorGetAccountingProcesses((e) => {
			//notification('error', e.message)
		});
		// query getAccountingDocuments
		const {
			result: resGetAccountingDocuments,
			loading: loadingGetAccountingDocuments,
			onError: errorGetAccountingDocuments,
		} = useQuery(
			queries.getAccountingDocuments,
			dataQueryGetAccountingDocuments.value,
			() => ({
				enabled: triggerGetAccountingDocuments.value,
				fetchPolicy: "no-cache",
			})
		);
		errorGetAccountingDocuments((e) => {
			//notification('error', e.message)
		});

		// mutation reorderAccountingDocuments
		const {
			mutate: reorderAccountingDocuments,
			onDone: doneReorderAccountingDocuments,
			onError: errorReorderAccountingDocuments,
		} = useMutation(mutations.reorderAccountingDocuments);

		// ============== ON DONE MUTATION GRAPHQL ===============
		// reorderAccountingDocuments
		doneReorderAccountingDocuments((e) => {
			store.state.common.ac120.statusKeppRow = true;
			triggerGetAccountingDocuments.value = true;
			notification("success", Message.getMessage("COMMON", "106").message);
		});
		errorReorderAccountingDocuments((e) => {
			//notification('error', e.message)
		});

		// const dataSourceItems = ref([])

		// ================== WATCH ================
		// 1. getAccountingProcesses
		watch(resGetAccountingProcesses, (value) => {
			triggerGetAccountingProcesses.value = false;
			dataGetAccountingProcesses.value = value.getAccountingProcesses;
			// dataGetAccountingProcesses.value = value.getAccountingProcesses.map((value: any, index: number) => {
			// 	console.log(value);
			// 	value.status = index%2 == 0 ? 10 : 20
			// 	return value
				
			// });
			// console.log(dataGetAccountingProcesses.value);
			
		});
		// 2. getAccountingDocuments
		watch(resGetAccountingDocuments, async (value) => {
			triggerGetAccountingDocuments.value = false;
			dataApi.value = value.getAccountingDocuments?.accountingDocuments;
			if (dataApi.value.length) {
				store.state.common.ac120.statusNoData = false
			} else {
				store.state.common.ac120.statusNoData = true
			}
			await calculateAmount();
			dataSource.value = new DataSource({
				store: {
					type: "array",
					key: "accountingDocumentId",
					data: dataApi.value,
				},
				requireTotalCount: true,
			});
			lastBalance.value = value.getAccountingDocuments?.lastBalance;
			await getOneRowData();
		});

		// call api GetAccountingDocuments
		watch(
			() => store.state.common.ac120.resetDataTable,
			(value) => {
				if (monthNewClick.value) {
					// nếu trước đó ấn tháng mới
					monthSelected.value = monthNewClick.value;
					dataQueryGetAccountingDocuments.value.month = monthNewClick.value;
					triggerGetAccountingDocuments.value = true;
					store.state.common.ac120.statusKeppRow = false;
					monthNewClick.value = 0;
					return;
				}
				triggerGetAccountingDocuments.value = true;
			}
		);
		// call api GetAccountingProcesses
		watch(
			() => store.state.common.ac120.resetDataAccountingProcesses,
			(value) => {
				triggerGetAccountingProcesses.value = true;
			}
		);

		watch(
			() => store.state.common.ac120.clearCheckCkick,
			(value) => {
				monthNewClick.value = 0;
				idRowFocusedRowNew.value = null;
				statusClickAdd.value = false;
			}
		);

		// watch(() => store.state.common.ac120.formData.resolutionClassification, (newValue, oldValue) => {

		// })

		// ================ FUNCTION ============================================
		const getOneRowData = () => {
			// if (monthNewClick.value) { // nếu trước đó ấn tháng mới
			//     monthSelected.value = monthNewClick.value
			//     dataQueryGetAccountingDocuments.value.month = monthNewClick.value
			//     triggerGetAccountingDocuments.value = true;
			//     store.state.common.ac120.statusKeppRow = false;
			//     monthNewClick.value = 0
			//     return
			// }
			store.state.common.ac120.selectedRowKeys = null;
			if (dataApi.value.length > 0) {
				// if table has data source
				gridRefAC120.value?.instance.deselectAll();
				if (idRowFocusedRowNew.value) {
					// nếu trước đó click row mới
					store.state.common.ac120.formData = dataApi.value.find(
						(item: any) => item.accountingDocumentId == idRowFocusedRowNew.value
					);
					store.state.common.ac120.selectedRowKeys = [idRowFocusedRowNew.value];
					idRowFocusedRowNew.value = null;
					store.state.common.ac120.statusKeppRow = false;
				} else if (store.state.common.ac120.statusKeppRow) {
					// giữ nguyên row
					store.state.common.ac120.statusKeppRow = false;
					store.state.common.ac120.selectedRowKeys = [
						store.state.common.ac120.focusedRowKey,
					];
					// Object.assign(store.state.common.ac120.formData, dataApi.value.find((item: any) => item.accountingDocumentId == store.state.common.ac120.focusedRowKey))
					store.state.common.ac120.formData = dataApi.value.find(
						(item: any) =>
							item.accountingDocumentId ==
							store.state.common.ac120.focusedRowKey
					);
					// Object.assign(store.state.common.ac120.formData, dataSource.value[0].data[0])
				} else {
					// lấy row đầu tiên
					// store.state.common.ac120.focusedRowKey = dataApi.value[0]?.accountingDocumentId
					store.state.common.ac120.selectedRowKeys = [
						dataApi.value[0]?.accountingDocumentId,
					];
					// Object.assign(store.state.common.ac120.formData, dataApi.value[0])
					store.state.common.ac120.formData = dataApi.value[0];
				}
				// store.state.common.ac120.formData.amount = Math.abs(store.state.common.ac120.formData.amount)
			} else {
				dataRows.value = [];
				// store.state.common.ac120.focusedRowKey = null
				// store.state.common.ac120.statusFormAdd = true
				// Object.assign(store.state.common.ac120.formData, initialStateFormData)
				store.state.common.ac120.formData = { ...initialStateFormData };
				store.state.common.ac120.formData.fundingSource = null;
				store.state.common.ac120.formData.resolutionType = null;
				store.state.common.ac120.formData.resolutionClassification = null;
				store.state.common.ac120.formData.transactionDetailDate = null;
				store.state.common.ac120.formData.source = null;
				// store.state.common.ac120.formData = null;
				// store.state.common.ac120.formData = {};
				store.state.common.ac120.keyRefreshForm++;
			}
			// //console\.log(store.state.common.ac120.selectedRowKeys);

			store.state.common.ac120.focusedRowKey = store.state.common.ac120.formData.accountingDocumentId;
			formDataOld = { ...store.state.common.ac120.formData };
			// store.state.common.ac120.statusFormAdd = false;
			// store.state.common.ac120.transactionDetailDate = store.state.common.ac120.formData.transactionDetailDate
			store.state.common.ac120.resetDataAccountingDocumentProofs++;

			if (statusClickAdd.value) {
				// nếu trước đó ấn nút add
				statusClickAdd.value = false;
				statusModalAdd.value = true; // mở moldal add
			}
		};

		// check box selection row data source
		const selectionChanged = (data: any) => {
			if (
				dataRows.value.length > data.selectedRowsData.length &&
				keySelect.value
			) {
				dataRows.value = dataRows.value.filter((item: any) => {
					if (item.bankbookDetailId != keySelect.value) {
						return item;
					}
				});
			} else {
				dataRows.value = [];
				data.selectedRowsData.map((data: any) => {
					if (data.bankbookDetailId) {
						if (
							!dataRows.value.find(
								(item: any) => item.bankbookDetailId == data.bankbookDetailId
							)
						) {
							let dataSameBankbookDetailId =
								storeDataSource.value?._array.filter(
									(item: any) => item.bankbookDetailId == data.bankbookDetailId
								);
							dataRows.value = dataRows.value.concat(dataSameBankbookDetailId);
						}
					} else {
						dataRows.value = dataRows.value.concat(data);
					}
				});
			}
			if (
				JSON.stringify(
					dataRows.value.map((item: any) => item.accountingDocumentId)
				) != JSON.stringify(store.state.common.ac120.selectedRowKeys)
			) {
				store.state.common.ac120.selectedRowKeys = dataRows.value.map(
					(item: any) => item.accountingDocumentId
				);
			}
		};

		const onFocusedRowChanging = (e: any) => {
			// if clicked on the cell selection or cell dragging
			if (!(e.event.currentTarget.outerHTML.search("dx-command-select") == -1) || !(e.event.currentTarget.outerHTML.search("dx-command-drag") == -1)) {
				e.cancel = true;
				if (!(e.event.currentTarget.outerHTML.search("dx-command-select") == -1)) {
					keySelect.value = e.rows[e.newRowIndex]?.data.bankbookDetailId;
				}
			} else {
				if (
					e.rows[e.newRowIndex]?.data.accountingDocumentId ==
					store.state.common.ac120.focusedRowKey
				) {
					// nếu click row đang active
					return;
				}
				let formData = { ...store.state.common.ac120.formData };
				let formDataOldCheck: any = { ...formDataOld };
				delete formDataOldCheck.proofCount;
				delete formData.proofCount;
				if (!isEqual(formDataOldCheck, formData)) {
					isModalConfirmChangeData.value = true;
					e.cancel = true;
					idRowFocusedRowNew.value =
						e.rows[e.newRowIndex]?.data.accountingDocumentId;
				} else {
					dataRows.value = [];
					store.state.common.ac120.selectedRowKeys = null;
					console.log(store.state.common.ac120.selectedRowKeys);
					formDataOld = { ...e.rows[e.newRowIndex]?.data };
					store.state.common.ac120.formData = e.rows[e.newRowIndex]?.data;
					// Object.assign(store.state.common.ac120.formData, e.rows[e.newRowIndex]?.data)
					// store.state.common.ac120.transactionDetailDate = e.rows[e.newRowIndex]?.data.transactionDetailDate
					// store.state.common.ac120.formData.amount = Math.abs(store.state.common.ac120.formData.amount)	
					// //console\.log(store.state.common.ac120.selectedRowKeys);

					// store.state.common.ac120.keyRefreshForm++
					store.state.common.ac120.resetDataAccountingDocumentProofs++;
					// if (store.state.common.ac120.statusFormAdd && store.state.common.ac120.formData.accountingDocumentId != 'AC120') {
					//     deleteRowAdd()
					// }
				}
			}
		};

		const actionModalDelete = (value: any) => {
			if (dataRows.value?.length) {
				statusModalDelete.value = true;
			} else {
				notification("error", Message.getMessage("COMMON", "404").message);
			}
		};

		const actionOpenModalAdd = async (value: any) => {
			let formData = { ...store.state.common.ac120.formData };
			let formDataOldCheck: any = { ...formDataOld };
			delete formDataOldCheck.proofCount;
			delete formData.proofCount;
			if (!isEqual(formDataOldCheck, formData)) {
				isModalConfirmChangeData.value = true;
				statusClickAdd.value = true;
			} else {
				statusModalAdd.value = true;
			}
		};

		const actionPopupItemDetail = (data: any) => {
			statusModalItemDetail.value = true;
		};

		const handleConfirmChange = (status: boolean) => {
			if (status) {
				store.state.common.ac120.onSubmitFormUpdate++;
				// if (monthNewClick.value) { // nếu trước đó ấn tháng mới
				//     monthSelected.value = monthNewClick.value
				//     dataQueryGetAccountingDocuments.value.month = monthNewClick.value
				//     triggerGetAccountingDocuments.value = true;
				//     store.state.common.ac120.statusKeppRow = false;
				//     monthNewClick.value = 0
				// }
			} else {
				if (monthNewClick.value) {
					// nếu trước đó ấn tháng mới
					monthSelected.value = monthNewClick.value;
					dataQueryGetAccountingDocuments.value.month = monthNewClick.value;
					triggerGetAccountingDocuments.value = true;
					monthNewClick.value = 0;
					// return
				}
				if (statusClickAdd.value) {
					// nếu trước đó ấn nút add
					statusClickAdd.value = false;
					statusModalAdd.value = true; // mở moldal add
					// return
				}
				storeDataSource.value
					.update(formDataOld.accountingDocumentId, formDataOld)
					.then(() => {
						store.state.common.ac120.focusedRowKey =
							idRowFocusedRowNew.value || 0;
						storeDataSource.value
							.byKey(idRowFocusedRowNew.value)
							.then((value: any) => {
								// Object.assign(store.state.common.ac120.formData, value);
								store.state.common.ac120.formData = value;
								formDataOld = { ...value };
							});
						gridRefAC120.value?.instance.refresh();
					});
				store.state.common.ac120.selectedRowKeys = [idRowFocusedRowNew.value];
				// store.state.common.ac120.formData = dataApi.value.find((item: any) => item.accountingDocumentId == idRowFocusedRowNew.value)

				// store.state.common.ac120.focusedRowKey = idRowFocusedRowNew.value
				idRowFocusedRowNew.value = null;
				store.state.common.ac120.resetDataAccountingDocumentProofs++;
			}
		};

		const onReorder = (e: any) => {
			const visibleRows = e.component.getVisibleRows();
			const dataToIndex = storeDataSource.value?._array.find(
				(item: any) =>
					item.accountingDocumentId ===
					visibleRows[e.toIndex].data.accountingDocumentId
			);
			const dataFromIndex = storeDataSource.value?._array.find(
				(item: any) =>
					item.accountingDocumentId === e.itemData.accountingDocumentId
			);
			if (
				dataToIndex.transactionDetailDate ===
				dataFromIndex.transactionDetailDate
			) {
				// cùng date mới cho đổi
				const visibleRows = e.component.getVisibleRows();
				const toIndex = storeDataSource.value?._array.findIndex(
					(item: any) =>
						item.accountingDocumentId ===
						visibleRows[e.toIndex].data.accountingDocumentId
				);
				const fromIndex = storeDataSource.value?._array.findIndex(
					(item: any) =>
						item.accountingDocumentId === e.itemData.accountingDocumentId
				);
				const newTasks = [...storeDataSource.value?._array];
				newTasks.splice(fromIndex, 1);
				newTasks.splice(toIndex, 0, e.itemData);
				let indexDocumentOrderByDate = 1;
				let dataInputs: any = [];
				newTasks.map((item: any) => {
					if (item.transactionDetailDate == dataToIndex.transactionDetailDate) {
						// nếu cùng ngày thì sắp xếp đổi
						dataInputs.push({
							accountingDocumentId: item.accountingDocumentId,
							documentOrderByDate: indexDocumentOrderByDate,
						});
						indexDocumentOrderByDate++;
					}
				});
				if (dataInputs.length) {
					reorderAccountingDocuments({
						companyId: companyId,
						fiscalYear: acYear.value,
						facilityBusinessId: globalFacilityBizId.value,
						transactionDetailDate: dataToIndex.transactionDetailDate,
						inputs: dataInputs,
					});
				} else {
					notification("error", Message.getMessage("AC120", "003").message);
				}
			} else {
				notification("error", Message.getMessage("AC120", "003").message);
			}
		};

		const selectedMonth = (month: number) => {
			let formData = { ...store.state.common.ac120.formData };
			let formDataOldCheck: any = { ...formDataOld };
			delete formDataOldCheck.proofCount;
			delete formData.proofCount;
			console.log(formDataOldCheck);
			console.log(formData);
			if (!isEqual(formDataOldCheck, formData)) {
				//console\.log(formDataOldCheck, formData,'ẻtreterte');
				isModalConfirmChangeData.value = true;
				// statusClickMonth.value = true;
				monthNewClick.value = month;
			} else {
				monthSelected.value = month;
				dataQueryGetAccountingDocuments.value.month = month;
				triggerGetAccountingDocuments.value = true;
			}
		};

		const modalHistoryAccountingProcess = () => {
			popupData.value = { ...dataQueryGetAccountingDocuments.value };
			modalHistoryStatusAccountingProcess.value = true;
		};

		const modalHistoryAccountingDocuments = () => {
			popupData.value = { ...dataQueryGetAccountingDocuments.value };
			modalHistoryStatuAccountingDocuments.value = true;
		};

		const actionEditTaxPay = async (e: any) => {
			// await (focusedRowKey.value = null)
			// await (focusedRowKey.value = e.data.accountingDocumentId)
		};
		const changeAmountDataGrid = () => {
			// calculateAmount()
		};
		const calculateAmount = () => {
			dataApi.value.map((item: any, index: number) => {
				item.balance = 0;
				if (index == 0) {
					if (item.resolutionClassification == 1) {
						item.balance = lastBalance.value + item.amount;
					} else if (item.resolutionClassification == 2) {
						item.balance = lastBalance.value - item.amount;
					}
				} else {
					if (item.resolutionClassification == 1) {
						item.balance = item.amount;
					} else if (item.resolutionClassification == 2) {
						item.balance = -item.amount;
					}
				}

				const totalBefore: any = ref(0);
				const maxOrder: any = ref(1);
				dataApi.value.slice(0, index).forEach((data) => {
					totalBefore.value = data.balance;
					if (item.transactionDetailDate == data.transactionDetailDate) {
						maxOrder.value = data.documentOrderByDate + 1;
					}
				});
				item.documentOrderByDate = maxOrder.value;
				item.balance = totalBefore.value + item.balance;
			});
		};

		// ================ CUSTOM SUMMARY TABLE ============================================
		const customCountRow = () => {
			return `전표 건수 <span>[${totalCount.value ? totalCount.value : 0
				}]</span>`;
		};
		const sumOfResolutionClassification1 = () => {
			let total = 0;
			storeDataSource.value?._array.forEach((item: any) => {
				if (item.resolutionClassification == 1) {
					total += item.amount ? item.amount : 0;
				}
			});
			return `수입액 합계 <span>[${filters.formatCurrency(total)}]</span>`;
		};
		const sumOfResolutionClassification2 = () => {
			let total = 0;
			storeDataSource.value?._array.forEach((item: any) => {
				if (item.resolutionClassification == 2) {
					total += item.amount ? item.amount : 0;
				}
			});
			return `지출액 합계 <span>[${filters.formatCurrency(total)}]</span>`;
		};
		const customBalance = () => {
			let total = 0;
			storeDataSource.value?._array.forEach((item: any, index: number) => {
				if (index == 0) {
					if (item.resolutionClassification == 1) {
						total += lastBalance.value + (item.amount ? item.amount : 0);
					} else if (item.resolutionClassification == 2) {
						total += lastBalance.value - (item.amount ? item.amount : 0);
					}
				} else {
					if (item.resolutionClassification == 1) {
						total += item.amount ? item.amount : 0;
					} else if (item.resolutionClassification == 2) {
						total += -(item.amount ? item.amount : 0);
					}
				}
			});
			return ` 예상 잔액 <span>[${filters.formatCurrency(total)}]</span>`;
		};
		const countResolutionNormalStatus = () => {
			let totalResolutionNormalStatuTrue = 0;
			let totalResolutionNormalStatuFalse = 0;
			storeDataSource.value?._array.forEach((item: any) => {
				if (item.resolutionNormalStatus) {
					totalResolutionNormalStatuTrue++;
				} else {
					totalResolutionNormalStatuFalse++;
				}
			});
			return `정상 내역 건수 <span>[${filters.formatCurrency(
				totalResolutionNormalStatuTrue
			)}]</span> 비정상 내역 건 <span>[${filters.formatCurrency(
				totalResolutionNormalStatuFalse
			)}]</span>`;
		};

		const heightDrawer = ref('calc(100vh - 245px)')

		return {
			dataGetAccountingProcesses,
			dataSource,
			// totalCount,
			monthSelected,
			loadingGetAccountingProcesses,
			loadingGetAccountingDocuments,
			dataRows,
			onFocusedRowChanging,
			actionEditTaxPay,
			// gridRefAC120Detail,
			lastBalance,
			customCountRow,
			sumOfResolutionClassification1,
			sumOfResolutionClassification2,
			customBalance,
			countResolutionNormalStatus,

			store,
			move_column,
			colomn_resize,
			acYear,
			selectionChanged,

			isModalConfirmChangeData,
			handleConfirmChange,
			statusModalDelete,
			statusModalAdd,
			statusModalItemDetail,

			actionPopupItemDetail,
			actionModalDelete,
			actionOpenModalAdd,

			onReorder,
			selectedMonth,
			modalHistoryAccountingProcess,
			modalHistoryAccountingDocuments,
			modalHistoryStatusAccountingProcess,
			modalHistoryStatuAccountingDocuments,
			popupData,
			clients,
			gridRefAC120,
			changeAmountDataGrid,
			heightDrawer,
			// statusProcess,
		};
	},
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
