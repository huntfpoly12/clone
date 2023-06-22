<template>
	<div class="search-form">
		<a-row>
			<a-col :span="4">
				<a-form-item label="귀속연도">
					<year-picker-box-custom v-model:valueDate="filterBF630.imputedYear" :minYear="2022" color="#a6a6a6" />
				</a-form-item>
				<a-form-item label="제출대상구분" class="no-bottom">
					<span>연간(1.1~12.31)지급분</span>
				</a-form-item>
			</a-col>
			<a-col :span="6.5">
				<div class="custom-note">
					<a-form-item label="제작요청상태">
						<switch-basic v-model:valueSwitch="setBefore" :textCheck="'제작요청후'" :textUnCheck="'제작요청전'" />
					</a-form-item>
					<info-tool-tip>제작전은 제작요청되지 않은 상태입니다.</info-tool-tip>
				</div>
				<div class="group-checkbox">
					<a-row :style="!filterBF630.beforeProduction ? 'opacity: 0.6' : ''">
						<CheckboxGroup :disabled="!filterBF630.beforeProduction" :options="productionStatusesCheckbox"
							v-model:valueCheckbox="filterBF630.productionStatuses" size="18"> </CheckboxGroup>
					</a-row>
				</div>
			</a-col>
			<a-col style="display: flex;">
				<a-form-item label="매니저리스트">
					<list-manager-dropdown width="150px" v-model:valueInput="filterBF630.manageUserId" clearButton />
				</a-form-item>
				<a-form-item label="영업자리스트" class="ml-20">
					<list-sales-dropdown width="150px" v-model:valueInput="filterBF630.salesRepresentativeId" clearButton />
				</a-form-item>
				<div class="ml-20">
					<switch-basic :textCheck="'해지제외'" :textUnCheck="'해지포함'" v-model:valueSwitch="filterBF630.active" />
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, watchEffect } from 'vue';
import DxButton from 'devextreme-vue/button';
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import DxCheckBox from 'devextreme-vue/check-box';
import CheckboxGroup from './CheckboxGroup.vue';
import { productionStatusesCheckbox } from '../utils/index';
export default defineComponent({
	components: { DxButton, DxCheckBox, CheckboxGroup },
	props: {
		rerenderReport: {
			type: Number,
			default: 0,
		},
	},
	setup(props) {
		const store = useStore();
		const filterBF630 = computed(() => store.state.common.filterBF630);
		const radioCheckForeigner = ref([]);
		const foreigner = ref();
		// const onValueChanged = (e: any, id: Number) => {
		// 	let valueCheck: any = [];
		// 	valueCheck = valueCheck.concat(filterBF630.value.productionStatuses.filter((item: any) => valueCheck.indexOf(item) < 0));
		// 	if (e.value) {
		// 		if (valueCheck.indexOf(id) > -1) {
		// 			return;
		// 		}
		// 		valueCheck.push(id);
		// 	} else {
		// 		valueCheck.splice(valueCheck.indexOf(id), 1);
		// 	}
		// 	console.log(valueCheck);

		// 	filterBF630.value.productionStatuses = valueCheck
		// };

		watch(() => filterBF630.value.beforeProduction, (newVal: any) => {
			if (!newVal) {
				console.log(11);
				filterBF630.value.productionStatuses = [];
			} else {
				console.log(12);
				filterBF630.value.productionStatuses = [0, 1, 2, -1];
			}
		}, { deep: true })
		watch(() => filterBF630.value.productionStatuses, (newVal: any) => {
			if (newVal.length) {
				console.log(21);
				
				filterBF630.value.beforeProduction = true;
			} else {
				console.log(22);
				filterBF630.value.beforeProduction = false;
			}
		}, { deep: true })

		// ----------------convert companyCode to upper case------------

		// const onChange = () => {
		// 	filterBF630.value.companyCode = filterBF630.value.companyCode.toUpperCase();
		// }
		// const onChangeSwitch = (e: any) => {
		//   filterBF630.value.beforeProduction = !e;
		// }
		let setBefore = computed(({
			get() {
				return filterBF630.value.beforeProduction;
			},
			set(val) {
				filterBF630.value.beforeProduction = val;
				// console.log(2222);
				
				// if (!val) {
				// 	filterBF630.value.productionStatuses = [];
				// } else {
				// 	filterBF630.value.productionStatuses = [0, 1, 2, -1];
				// }
			}
		}))

		return {
			radioCheckForeigner,
			foreigner,
			productionStatusesCheckbox,
			setBefore,
			filterBF630,
			dayjs,
		};
	},
});
</script>
<style scoped lang="scss" src="../style/styleTabs.scss">
// :deep .dx-checkbox-text {
//   margin-left: 10px;
//   background-color: #93cddd;
//   border-radius: 5px;
//   color: white;
//   text-align: center;
//   width: 90px;
// }
// .check-box-group {
//   :deep .dx-checkbox-container {
//     margin-left: 10px;
//     .dx-checkbox-text {
//       margin-left: 10px;
//       background-color: #93cddd;
//       border-radius: 5px;
//       color: white;
//       text-align: center;
//       width: 90px;
//     }
//   }
// }
</style>
