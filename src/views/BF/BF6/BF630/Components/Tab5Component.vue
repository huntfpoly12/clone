<template>
	<div class="grid-view">
		<div class="content-grid">
			<a-spin :spinning="loadingElectronicFiling" size="large">
				<DxDataGrid id="DxDataGrid-bf-630-tab5" :show-row-lines="true" :hoverStateEnabled="true"
					:data-source="dataSource" :show-borders="true" :allow-column-reordering="move_column"
					:allow-column-resizing="colomn_resize" :column-auto-width="true" noDataText="내역이 없습니다">
					<DxPaging :enabled="false" />
					<DxScrolling mode="standard" show-scrollbar="always" />
					<DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
					<DxExport :enabled="true" />
					<DxToolbar class="search-form">
						<DxItem template="box-action-left" location="before" />
						<DxItem name="searchPanel" />
						<DxItem name="exportButton" css-class="cell-button-export" />
					</DxToolbar>
					<template #box-action-left>
						<div id="components-grid-demo-flex">
							<a-form-item label="신고구분 :">
								<electronic-filing-type v-model:valueInput="originData.type" width="200px"
									:disabledList="[1, 2, 7, 8, 9]"></electronic-filing-type>
							</a-form-item>
							<a-form-item label="제작요청일(기간)">
								<range-date-time-box v-model:valueDate="rangeDate" width="250px"
									:multi-calendars="true"></range-date-time-box>
							</a-form-item>
							<a-form-item label="제작상태">
								<DxRadioGroup :data-source="typeCheckbox" item-template="radio" v-model="productionStatuses"
									layout="horizontal" :icon-size="12">
									<template #radio="{ data }">
										<production-status :typeTag="0" v-if="data == 0" padding="0px 10px" />
										<production-status :typeTag="4" v-if="data == 2" padding="1px 10px" />
										<production-status :typeTag="5" v-if="data == -1" padding="1px 10px" />
									</template>
								</DxRadioGroup>
							</a-form-item>
							<a-form-item label="제작요청자">
								<list-manager-dropdown width="150px" v-model:valueInput="originData.manageUserId" filterData clearButton/>
							</a-form-item>
						</div>
					</template>
					<DxColumn caption="일련번호" data-field="electronicFilingId" width="100px" alignment="center" />
					<DxColumn caption="참고사항" data-field="referenceInformation" />
					<DxColumn caption="제작요청일시" data-field="productionRequestedAt" data-type="date"
						format="yyyy-MM-dd HH:mm" />
					<DxColumn caption="아이디" data-field="productionRequestUserId" width="100px" alignment="center" />
					<DxColumn caption="제작현황" cell-template="productionStatus" width="120px" alignment="center" />
					<template #productionStatus="{ data }">
						<a-tooltip placement="topLeft" color="red" v-if="data.data.productionStatus == -1">
							<template #title>{{ data.data.causeOfProductionFailure }}</template>
							<div>
								<production-status :typeTag="5" padding="1px 10px" />
							</div>
						</a-tooltip>
						<a-tooltip placement="topLeft" color="black" v-if="data.data.productionStatus == 2">
							<template #title>전자신고파일 다운로드</template>
							<div>
								<production-status :typeTag="4" padding="1px 10px" />
							</div>
						</a-tooltip>
						<production-status :typeTag="0" v-if="data.data.productionStatus == 0" padding="0px 10px" />
					</template>
					<DxColumn caption="상세보기" width="80px" cell-template="action" />
					<template #action="{ data }">
						<div style="text-align: center">
							<img src="@/assets/images/searchPlus.png" style="width: 20px; height: 20px; margin-top: 0px"
								@click="openPopupDetail(data.data)" />
						</div>
					</template>
					<!-- <DxSummary>
            <DxTotalItem cssClass="bf-630-sumary" column="일련번호" summary-type="count" display-format="전체: [{0}]" />
          </DxSummary> -->
				</DxDataGrid>
				<div class="DxDataGrid-bf-630-tab5-sumary">
					<div v-html="`전체: <span style='font-size: 16px'>[${dataSource.length}]</span>`
						"></div>
				</div>
			</a-spin>
		</div>
	</div>
	<companies-popup v-if="modalCompanies" :modalStatus="modalCompanies" @closePopup="modalCompanies = false"
		:data="dataPopup"></companies-popup>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
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
import { DxRadioGroup } from "devextreme-vue/radio-group";
import queries from "@/graphql/queries/BF/BF6/BF630/index";
import notification from "@/utils/notification";
import dayjs, { Dayjs } from "dayjs";
import filters from "@/helpers/filters";
import CompaniesPopup from "./CompaniesPopup.vue";

export default defineComponent({
	components: {
		DxDataGrid,
		DxToolbar,
		DxSelection,
		DxColumn,
		DxItem,
		DxScrolling,
		DxRadioGroup,
		DxSummary,
		DxTotalItem,
		CompaniesPopup,
		DxPaging,
		DxSearchPanel,
		DxExport,
	},
	props: {
		activeSearch: {
			type: Number,
			default: 0,
		},
		activeSave: {
			type: Number,
			default: 0,
		},
	},
	setup(props, { emit }) {
		const store = useStore();
		const move_column = computed(() => store.state.settings.move_column);
		const colomn_resize = computed(() => store.state.settings.colomn_resize);
		const trigger = ref<boolean>(true);
		const typeCheckbox = ref([0, 2, -1]);
		const valueType = ref(0);
		const rangeDate = ref([
			filters.formatDateToInterger(dayjs().subtract(7, "day")),
			filters.formatDateToInterger(dayjs()),
		]);
		const productionStatuses = ref(0);
		const dataSource = ref<any>([]);
		const dataPopup = ref();
		const modalCompanies = ref<boolean>(false);
		const originData = reactive({
			type: 3,
			requesteStartDate: rangeDate.value[0],
			requesteFinishDate: rangeDate.value[1],
			productionStatuses: [2, -1],
			manageUserId: null,
		});

		// watch range date time
		watch(productionStatuses, (newValue) => {
			if (newValue == 0) {
				originData.productionStatuses = [2, -1];
			} else {
				originData.productionStatuses = [newValue];
			}
		});
		// watch range picker change
		watch(rangeDate, (newValue) => {
			originData.requesteStartDate = newValue[0];
			originData.requesteFinishDate = newValue[1];
		});

		// ============ GRAPQL ===============================
		const {
			result: resElectronicFiling,
			onResult: onResElectronicFiling,
			loading: loadingElectronicFiling,
			refetch: refetchElectronicFiling,
			onError: onErrorElectronicFiling,
		} = useQuery(
			queries.searchElectronicFilingFileProductions,
			{
				filter: originData,
			},
			() => ({
				enabled: trigger.value,
				fetchPolicy: "no-cache",
			})
		);

		// ===================DONE GRAPQL==================================
		// watch result  api searchElectronicFilingFileProductions
		onResElectronicFiling(() => {
			trigger.value = false;
		});
		watch(resElectronicFiling, (value) => {
			if (value) {
				let data = value.searchElectronicFilingFileProductions;
				let result = Object.values(
					data.reduce((acc: any, curr: any) => {
						if (
							!acc[curr.electronicFilingId] ||
							dayjs(curr.lastProductionRequestedAt).isBefore(
								dayjs(acc[curr.electronicFilingId].lastProductionRequestedAt)
							)
						) {
							acc[curr.electronicFilingId] = curr;
						}
						return acc;
					}, {})
				);
				dataSource.value = [...result];
			}
		});
		onErrorElectronicFiling((e) => {
			//notification('error', e.message)
		});

		// watch active searching
		watch(
			() => props.activeSearch,
			(value) => {
				trigger.value = true;
				refetchElectronicFiling();
			}
		);

		const openPopupDetail = (data: any) => {
			dataPopup.value = data;
			modalCompanies.value = true;
		};

		return {
			originData,
			move_column,
			colomn_resize,
			dataSource,
			typeCheckbox,
			valueType,
			modalCompanies,
			loadingElectronicFiling,
			trigger,
			rangeDate,
			dataPopup,
			productionStatuses,
			openPopupDetail,
		};
	},
});
</script>
<style scoped lang="scss" src="../style/styleTabs.scss"></style>

<style scoped lang="scss">
.DxDataGrid-bf-630-tab5-sumary {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: bold;
	border: 1px solid #ddd;
	border-top: none;
	padding: 7px 20px;
	color: rgba(51, 51, 51, 0.7);
}

#components-grid-demo-flex {
	display: flex;
	align-items: center;

	.ant-form-item {
		margin: 0 10px 0 0;
	}
}
</style>
