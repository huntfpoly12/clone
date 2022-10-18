<template>
	<div id="components-modal-demo-position">
		<a-modal :visible="modalStatus" :title="title" centered width="35%" :footer="null" @cancel="setModalVisible()"
			:mask-closable="false">
			<h2 style="font-weight: 600; color: gray">
				관할세무서, 지방소득세 납세지 검색
			</h2>
			<div style="text-align: center; margin-top: 32px">
				<search-outlined />
				주소 또는 소재지 ‘읍.면.동’ 이름을 입력하세요
			</div>
			<div style="text-align: center; margin-top: 10px">
				<a-input-search v-model:value="search" enter-button="검색" style="width: 400px" @search="onSearch" />
			</div>
			<div style="margin: 48px 0">
				<DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="bcode"
					:allow-column-reordering="true" :allow-column-resizing="true" :column-auto-width="true">
					<DxColumn data-field="" :width="30" cell-template="grid-cell" />
					<template #grid-cell="{ data }">
						<a-radio-group v-model:value="modalParam.checkBox">
							<a-radio :value="data.data.bcode" @click="changeOption(data)"
								:id="'data-' + data.data.bcode">
							</a-radio>
						</a-radio-group>
					</template>
					<DxColumn :width="150" data-field="taxOfficeName" caption="관할세무서" />
					<DxColumn :width="200" data-field="localIncomeTaxArea" caption="지방소득세납세지" />
					<DxColumn caption="주소" cell-template="address-cell" />
					<template #address-cell="{ data }">
						{{ data.data.address1 + " " + data.data.address2 + " " + data.data.address3 }}
					</template>
				</DxDataGrid>
			</div>
			<div class="btn_submit">
				<a-button type="primary" :disabled="!showEmployeeInfo" @click="onSubmit">확인</a-button>
			</div>
		</a-modal>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { employees } from "../data.js";
import { DxSelectBox } from "devextreme-vue/select-box";
import queries from "../../../../../graphql/queries/common/index";
import { useQuery } from "@vue/apollo-composable";
import {
	DxDataGrid,
	DxColumn,
	DxPaging,
	DxExport,
	DxSelection,
	DxSearchPanel,
} from "devextreme-vue/data-grid";
import {
	SearchOutlined,
	WarningOutlined,
	MailOutlined,
	MenuOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
	props: ["modalStatus", "data", "title"],

	components: {
		MenuOutlined,
		SearchOutlined,
		WarningOutlined,
		MailOutlined,
		DxDataGrid,
		DxColumn,
		DxPaging,
		DxSelection,
		DxExport,
		DxSearchPanel,
		DxSelectBox,
	},
	created() { },
	data() {
		return {
			modalParam: {
				checkBox: "",
			},
			employees,
		};
	},
	setup(props, { emit }) {
		let showEmployeeInfo = ref(false);
		let selectedRowNotes = ref('');
		let selectedRowPicture = ref('');
		let dataQuery = ref();
		let trigger = ref<boolean>(false);
		const dataSource = ref([]);
		const data = props.data;
		const visible = ref<boolean>(false);
		const search = ref<string>("");
		let dataEmit = ref()
		const onSearch = (searchValue: string) => {
			dataQuery.value = { keyword: searchValue };
			trigger.value = true;
			refetchSearch();
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
		const onSelectionChanged = ({ selectedRowsData }: any) => {
			const data = selectedRowsData[0];
			showEmployeeInfo.value = !!data;
		}

		const changeOption = (data: any) => {
			(document.getElementById("data-" + data.data.bcode) as HTMLInputElement).click();  
			dataEmit.value = data.data
			showEmployeeInfo.value = true

		}

		const onSubmit = () => {
			emit("dataEmit", dataEmit.value);
			setModalVisible()
		}


		return {
			data,
			visible,
			search,
			onSearch,
			setModalVisible,
			showEmployeeInfo,
			selectedRowNotes,
			selectedRowPicture,
			changeOption,
			onSelectionChanged,
			dataSource,
			onSubmit,
			dataEmit
		};
	},
});
</script>
<style scoped>
#components-modal-demo-position {
	position: relative;
}

.btn_submit {
	position: absolute;
	bottom: 0;
	margin-top: 48px;
	margin-bottom: 16px;
	left: 0;
	right: 0;
	text-align: center;
}
</style>
