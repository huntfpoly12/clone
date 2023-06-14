<template>
	<!-- <div id="components-modal-demo-position"> -->
		<a-modal :visible="modalStatus" :title="title" centered width="35%" :footer="null" @cancel="setModalVisible()"
			:mask-closable="false">
			<h2 style="font-weight: 600; color: gray">
				관할세무서, 지방소득세 납세지 검색
			</h2>
			<div style="text-align: center; margin-top: 32px">
				<!-- <search-outlined /> -->
				주소 또는 소재지 ‘읍.면.동’ 이름을 입력하세요
			</div>
			<div style="margin-top: 10px; display: flex; justify-content: center;">
				<StandardForm formName="cm-130-search" ref="CM130Search">
					<default-text-box style="margin-right: 10px;" width="350" :required="true" v-model:valueInput="search">
					</default-text-box>
					<input type="text" style="display: none;">
				</StandardForm>
				<button-basic class="button-form-modal" :text="'검색'" :type="'default'" :mode="'contained'"
					@onClick="onSearch" />
			</div>
			<a-spin :spinning="loading">
				<div style="margin: 48px 0">
					<DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true"
						:data-source="dataSource" :show-borders="true" key-expr="bcode"
						:allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
						v-model:focused-row-key="focusedRowKey" focused-row-enabled="true" :onRowClick="onRowClick"
						:column-auto-width="true">
						<DxScrolling mode="standard" show-scrollbar="always" />
						<DxColumn data-field="" :width="30" cell-template="grid-cell" />
						<template #grid-cell="{ data }">
							<!-- <a-radio-group v-model:value="modalParam.checkBox">
								<a-radio :value="data.data.bcode" @click="changeOption(data)"
									:id="'data-' + data.data.bcode">
								</a-radio>
							</a-radio-group> -->
							<div class="text-center">
								<input type="radio" name="radioCheck" :checked="focusedRowKey == data.data.bcode ? true : false" />
							</div>
						</template>
						<DxColumn :width="150" data-field="taxOfficeName" caption="관할세무서" />
						<DxColumn :width="200" data-field="localIncomeTaxArea" caption="지방소득세납세지" />
						<DxColumn caption="주소" cell-template="address-cell" />
						<template #address-cell="{ data }">
							{{ data.data.address1 + " " + data.data.address2 + " " + data.data.address3 }}
						</template>
					</DxDataGrid>
				</div>
			</a-spin>
			<div class="text-center">
				<button-basic class="button-form-modal" :disabled="!showEmployeeInfo" :text="'확인'" :type="'default'"
					:mode="'contained'" @onClick="onSubmit" />
			</div>
		</a-modal>
	<!-- </div> -->
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue";
import { useStore } from 'vuex';
// import { employees } from "../utils/data";
import { DxSelectBox } from "devextreme-vue/select-box";
import queries from "@/graphql/queries/common/index";
import { useQuery } from "@vue/apollo-composable";
import {
	DxDataGrid,
	DxColumn, DxScrolling,
} from "devextreme-vue/data-grid";

export default defineComponent({
	props: ["modalStatus", "data", "title"],

	components: {
		DxDataGrid,
		DxColumn, DxScrolling,
		DxSelectBox,
	},
	// data() {
	// 	return {
	// 		modalParam: {
	// 			checkBox: "",
	// 		},
	// 		// employees,
	// 	};
	// },
	setup(props, { emit }) {
		// config grid
		const store = useStore();
		const move_column = computed(() => store.state.settings.move_column);
		const colomn_resize = computed(() => store.state.settings.colomn_resize);
		const focusedRowKey = ref(null);
		let showEmployeeInfo = ref(false);
		let dataQuery = ref();
		let trigger = ref<boolean>(false);
		const dataSource = ref([]);
		const search = ref<string>("");
		let dataEmit = ref()
		const CM130Search = ref()
		const onSearch = () => {
			var res = CM130Search.value.validate();
			if (!res.isValid) {
				res.brokenRules[0].validator.focus();
			} else {
				dataQuery.value = { keyword: search.value };
				trigger.value = true;
			}

			// refetchSearch();
		};

		// Search public institution information
		const { result: resultSearch, loading, refetch: refetchSearch } = useQuery(
			queries.searchPublicInstitutions,
			dataQuery,
			() => ({
				enabled: trigger.value,
				fetchPolicy: "no-cache",
			})
		);

		watch(resultSearch, (value) => {
			if (value) {
				dataSource.value = value.searchPublicInstitutions
			}
		});

		const setModalVisible = () => {
			emit("closePopup", false);
		};

		// const changeOption = (data: any) => {
		// 	(document.getElementById("data-" + data.data.bcode) as HTMLInputElement).click();
		// 	dataEmit.value = data.data
		// 	showEmployeeInfo.value = true

		// }

		const onSubmit = () => {
			emit("dataEmit", dataEmit.value);
			setModalVisible()
		}

		const onRowClick = (data: any) => {
			dataEmit.value = data.data;
			showEmployeeInfo.value = true
		};


		return {
			move_column,
			onRowClick,
			focusedRowKey,
			colomn_resize,
			search,
			loading,
			onSearch,
			setModalVisible,
			showEmployeeInfo,
			// changeOption,
			dataSource,
			onSubmit,
			CM130Search,
		};
	},
});
</script>
<style scoped>
/* #components-modal-demo-position {
	position: relative;
} */

/* .btn_submit {
	position: absolute;
	bottom: 0;
	margin-top: 48px;
	margin-bottom: 16px;
	left: 0;
	right: 0;
	text-align: center;
} */
</style>
