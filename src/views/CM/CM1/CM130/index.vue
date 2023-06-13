<template>
	<action-header title="통장 관리" @actionSave="onSubmitConfig" :buttonSave="true" />
	<div id="cm-130" class="cm-130" style="padding: 24px">
		<a-tabs v-model:activeKey="activeKey" type="card">
			<a-tab-pane key="1" tab="기본">
				<a-spin :spinning="loading">
					<standard-form formName="index-cm-310">
						<h2 style="font-weight: 600; color: gray" class="title-h2">
							급여기본설정
						</h2>
						<a-row>
							<a-col :span="24">
								<div style="display: -webkit-inline-box">
									<a-form-item label="급여신고주기" :label-col="labelCol">
										<radio-group style="padding-top: 5px" :disabled="formState.undeclaredIncomeStatus"
											:arrayValue="optionsRadioReportType"
											v-model:valueRadioCheck="formState.reportType" :layoutCustom="'horizontal'" />
									</a-form-item>
								</div>
								<a-tooltip color="black" placement="top">
									<template #title>신고가 안된 소득자료가 있으면 수정불가합니다. 입력된
										소득자료에 대해 신고하거나 삭제 후
										변경가능합니다.</template>
									<img src="@/assets/images/iconInfo.png" class="img-info" />
								</a-tooltip>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="24">
								<div style="display: -webkit-inline-box">
									<a-form-item label="급여지급형태" :label-col="labelCol">
										<radio-group style="padding-top: 5px" :disabled="formState.undeclaredIncomeStatus"
											:arrayValue="optionsRadioPaymentType"
											v-model:valueRadioCheck="formState.paymentType" :layoutCustom="'horizontal'" />
									</a-form-item>
								</div>
								<a-tooltip color="black" placement="top">
									<template #title>신고가 안된 소득자료가 있으면 수정불가합니다. 입력된
										소득자료에 대해 신고하거나 삭제 후
										변경가능합니다.</template>
									<img src="@/assets/images/iconInfo.png" class="img-info" />
								</a-tooltip>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="24">
								<div style="display: -webkit-inline-box">
									<a-form-item label="급여지급일자" :label-col="labelCol">
										<div style="display: flex; align-items: center">
											<number-box :width="150" :min="0" :max="30"
												v-model:valueInput="formState.paymentDay" :spinButtons="true">
											</number-box>
											<span style="margin-left: 5px">일, ( 말일은 ‘0’을 선택하세요)</span>
										</div>
									</a-form-item>
								</div>
								<a-tooltip color="black" placement="top">
									<template #title>급여지급일자는 선택사항으로 지정시 급여명세서 등에
										해당 급여일자가 입력되며, 수정 가능합니다.</template>
									<img src="@/assets/images/iconInfo.png" class="img-info" />
								</a-tooltip>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="24">
								<div style="display: -webkit-inline-box">
									<a-form-item>
										<div style="margin-left: 50px">
											<span>두루누리 적용 여부 (사업자):</span>
											<switch-basic style="width: 80px; margin-left: 8px"
												v-model:valueSwitch="formState.insuranceSupport" :textCheck="'적용'"
												:textUnCheck="'미적용'" />
										</div>
									</a-form-item>
								</div>

								<a-tooltip color="black" placement="top">
									<template #title>사업자 두루누리 미적용시 해당 사원이 두루누리
										적용이더라도 급여계산에 반영되지 않습니다.</template>
									<img src="@/assets/images/iconInfo.png" class="img-info" />
								</a-tooltip>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="6">
								<a-form-item label="일괄납부 여부" :label-col="labelCol">
									<switch-basic style="width: 80px" :disabled="true"
										v-model:valueSwitch="formState.collectivePayment" :textCheck="'적용'"
										:textUnCheck="'미적용'" />
								</a-form-item>
							</a-col>
							<a-col :span="12">
								<a-form-item label="사업자단위 과세여부" :label-col="labelCol">
									<switch-basic style="width: 80px" :disabled="true"
										v-model:valueSwitch="formState.taxForEachBusiness" :textCheck="'적용'"
										:textUnCheck="'미적용'" />
								</a-form-item>
							</a-col>
						</a-row>
						<h2 style="font-weight: 600; color: gray" class="title-h2">
							관할세무서, 지방소득세 납세지 설정
						</h2>
						<a-row :gutter="24">
							<a-col>
								<a-form-item label="사업장주소" :label-col="labelCol">
									<default-text-box style="width: 565px; margin-right: 10px; float: left" :disabled="true"
										v-model:valueInput="formState.companyAddressInfoAddress
											">
									</default-text-box>
									<button-basic class="button-form-modal" :text="'자동선택'" :type="'default'"
										:mode="'contained'" @onClick="showModal" />
									<a-modal class="container_email" v-model:visible="isShow" okText="네. 적용합니다"
										cancelText="아니오" @ok="handleSuccsess" :mask-closable="false" footer="">
										<div id="modal">
											<div style="display: flex">
												<question-circle-outlined style="
                                  padding-right: 10px;
                                  font-size: xxx-large;
                                " />
												<div>
													<p style="margin: 0; font-weight: 600">
														관할세무서 :
														{{ dataPublicInstitution.taxOfficeName }}
													</p>
													<p style="margin: 0; font-weight: 600">
														지방소득세 납세지 :
														{{ dataPublicInstitution.localIncomeTaxArea }}
													</p>
													<p style="margin: 0">
														위 자동으로 선택된 결과로 적용하시겠습니까?
													</p>
												</div>
											</div>
										</div>
										<div class="text-align-right mt-20">
											<button-basic class="button-form-modal" :text="'아니오'" :type="'default'"
												:mode="'outlined'" @onClick="setModalVisible()" />
											<button-basic class="button-form-modal" :text="'네. 적용합니다'" :width="140"
												:type="'default'" :mode="'contained'" @onClick="handleSuccsess" />
										</div>
									</a-modal>
								</a-form-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col>
								<a-row :gutter="24">
									<a-col>
										<a-form-item label="관할세무서" :label-col="labelCol">
											<default-text-box style="width: 200px" :disabled="true" v-model:valueInput="formState.competentTaxOfficeCode
												">
											</default-text-box>
										</a-form-item>
									</a-col>
									<a-col>
										<div style="margin-left: 20px; margin-right: 3px">
											<a-form-item label="지방소득세 납세지" :label-col="labelCol">
												<default-text-box width="170" :disabled="true" v-model:valueInput="formState.localIncomeTaxArea
													">
												</default-text-box>
											</a-form-item>
										</div>
									</a-col>
									<a-form-item>
										<button-basic :text="'수동선택'" :type="'default'" :mode="'contained'"
											@onClick="modalSetting" />
									</a-form-item>
								</a-row>
							</a-col>
						</a-row>
					</standard-form>
					<button-basic style="margin-left: 350px; margin-top: 20px" :text="'저장'" type="default"
						@onClick="onSubmitConfig()" />
					<SettingPopup :modalStatus="modalSettingStatus" @closePopup="modalSettingStatus = false"
						@dataEmit="changeValueAddress" title="원천설정" :key="countResetPopup" />
				</a-spin>
			</a-tab-pane>
			<a-tab-pane key="2" tab="급여항목">
				<Tab2Component></Tab2Component>
			</a-tab-pane>
			<a-tab-pane key="3" tab="공제항목">
				<a-spin :spinning="loadingDeduction">
					<DxDataGrid id="dataGridTab3" noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true"
						:data-source="dataSourceDeduction" :show-borders="true" key-expr="itemCode"
						:allow-column-reordering="move_column" :focused-row-enabled="true"
						:allow-column-resizing="colomn_resize" :column-auto-width="true"
						v-model:focused-row-key="focusedRowKeyTab3" ref="gridRefCM110Tab3"
						@focused-row-changing="onFocusedRowChangingTab3" :auto-navigate-to-focused-row="true">
						<DxScrolling mode="standard" show-scrollbar="always" />
						<DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
						<DxExport :enabled="true" />
						<DxToolbar>
							<DxItem name="searchPanel" />
							<DxItem name="exportButton" css-class="cell-button-export" />
							<DxItem location="after" template="button-history" css-class="cell-button-add" />
						</DxToolbar>
						<template #button-history>
							<a-tooltip title="변경이력">
								<span>
									<DxButton icon="plus" @click="modalHistoryDeduction">
										<HistoryOutlined style="font-size: 18px" />
									</DxButton>
								</span>
							</a-tooltip>
						</template>
						<DxColumn data-field="itemCode" :width="80" css-class="cell-center" caption="코드" />
						<DxColumn data-field="use" caption="이용여부" :width="100" cell-template="use"
							css-class="cell-center" />
						<template #use="{ data }">
							<tag-color-use :valueUse="data.value" />
						</template>
						<DxColumn caption="구분" cell-template="deduction" />
						<template #deduction> 공제 </template>
						<DxColumn data-field="name" caption="항목명" />
						<DxColumn data-field="formula" caption="산출방법" />
					</DxDataGrid>
				</a-spin>
				<standard-form formName="add-deduction-310" v-if="dataSourceDeduction.length" class="standard-form">
					<h2 class="title_modal">급여상세항목</h2>
					<a-row :gutter="24">
						<a-col :span="5">
							<a-form-item label="코드" :label-col="labelCol">
								<number-box :width="150" :min="0" v-model:valueInput="formStateDeduction.itemCode"
									:spinButtons="true" :disabled="true">
								</number-box>
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<switch-basic style="width: 80px" v-model:valueSwitch="formStateDeduction.use"
								:textCheck="'이용중'" :textUnCheck="'이용중지'" :disabled="true" />
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="14">
							<a-form-item label="항목명" :label-col="labelCol">
								<default-text-box style="width: 150px; margin-right: 10px"
									v-model:valueInput="formStateDeduction.name" :disabled="true">
								</default-text-box>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="24">
							<div style="display: -webkit-inline-box">
								<a-form-item label="산출방법" :label-col="labelCol">
									<default-text-box style="width: 320px" v-model:valueInput="formStateDeduction.formula">
									</default-text-box>
								</a-form-item>
							</div>
							<a-tooltip color="black" placement="top">
								<template #title>급여명세서 내 계산방법에 표시됩니다.</template>
								<img src="@/assets/images/iconInfo.png" class="img-info" />
							</a-tooltip>
						</a-col>
					</a-row>
					<button-basic style="margin-left: 250px" :text="'저장'" type="default"
						@onClick="onSubmitConfigDeduction" />
				</standard-form>
				<HistoryPopup :modalStatus="modalHistoryStatusDeduction" @closePopup="modalHistoryStatusDeduction = false"
					title="변경이력" typeHistory="cm-deduction-130" />
			</a-tab-pane>
		</a-tabs>
		<PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" :typeModal="'confirm'"
			:title="Message.getMessage('COMMON', '501').message" content=""
			:okText="Message.getMessage('COMMON', '501').yes" :cancelText="Message.getMessage('COMMON', '501').no"
			@checkConfirm="statusComfirm" />
	</div>
</template>
<script lang="ts">
import { companyId, makeDataClean } from "@/helpers/commonFunction";
import {
	EditOutlined,
	SearchOutlined,
	PrinterOutlined,
	DeleteOutlined,
	SaveOutlined,
	HistoryOutlined,
} from "@ant-design/icons-vue";
import HistoryPopup from "@/components/HistoryPopup.vue";
import queries from "@/graphql/queries/CM/CM130/index";
import mutations from "@/graphql/mutations/CM/CM130/index";
import {
	defineComponent,
	ref,
	reactive,
	watch,
	computed,
} from "vue";
import { useStore } from "vuex";
import { DxNumberBox } from "devextreme-vue/number-box";
import DxButton from "devextreme-vue/button";
import {
	DxDataGrid,
	DxColumn,
	DxExport,
	DxSearchPanel,
	DxToolbar,
	DxItem,
	DxScrolling,
} from "devextreme-vue/data-grid";
import notification from "@/utils/notification";
import SettingPopup from "./components/SettingPopup.vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import Tab2Component from "./components/Tab2Component.vue";
import { optionsRadioReportType, optionsRadioPaymentType } from "./utils/data";
import {
	initialFormState,
	initialFormStateDeduction,
} from "./utils/data";
import { Message } from "@/configs/enum";
import dayjs from "dayjs";
export default defineComponent({
	components: {
		DxNumberBox,
		SettingPopup,
		DxDataGrid,
		DxColumn,
		DxExport,
		DxScrolling,
		DxSearchPanel,
		DxButton,
		DxToolbar,
		DxItem,
		EditOutlined,
		HistoryOutlined,
		HistoryPopup,
		Tab2Component,
		SearchOutlined,
		PrinterOutlined,
		DeleteOutlined,
		SaveOutlined,
	},
	setup() {
		// config grid
		const store = useStore();
		const globalYear = dayjs().year();
		const move_column = computed(() => store.state.settings.move_column);
		const colomn_resize = computed(() => store.state.settings.colomn_resize);
		const modalSettingStatus = ref<boolean>(false);
		const modalHistoryStatusDeduction = ref<boolean>(false);

		const isShow = ref<boolean>(false);
		const formState = reactive({ ...initialFormState });
		const formStateDeduction = reactive({ ...initialFormStateDeduction });
		const setModalVisible = () => {
			isShow.value = false;
		};
		const dataQueryInstitution = ref();
		const dataSource = ref([]);
		const dataSourceDeduction = ref([]);
		let itemCodeMax = ref(0);
		const resetFormNum = ref(1);
		const focusedRowKeyTab3 = ref<number>();
		const dataOldFormStateDeduction = reactive({
			...initialFormStateDeduction,
		});
		const countResetPopup = ref<number>(0);

		const modalStatus = ref<boolean>(false);
		const statusClickSaveModal = ref<boolean>(false);
		const gridRefCM110Tab3 = ref(); // ref of grid

		// get config
		const dataQuery = ref({ companyId: companyId, imputedYear: globalYear });
		const trigger = ref(false);
		const triggerWithholdingConfig = ref<boolean>(true);
		const triggerWithholdingConfigDeductionItems = ref<boolean>(true);
		let runOne = ref<boolean>(true);

		//================================================= FUNCTION============================================
		const showModal = () => {
			isShow.value = true;
		};
		const handleSuccsess = (e: MouseEvent) => {
			formState.competentTaxOfficeCode =
				dataPublicInstitution.value.taxOfficeName;
			formState.localIncomeTaxArea =
				dataPublicInstitution.value.localIncomeTaxArea;
			isShow.value = false;
		};

		const {
			result: resultConfig,
			loading,
			refetch: refetchConfig,
		} = useQuery(queries.getWithholdingConfig, dataQuery, () => ({
			enabled: triggerWithholdingConfig.value,
			fetchPolicy: "no-cache",
		}));
		watch(resultConfig, (value) => {
			triggerWithholdingConfig.value = false;
			if (value) {
				formState.reportType = value.getWithholdingConfig.reportType;
				formState.paymentType = value.getWithholdingConfig.paymentType;
				formState.paymentDay =
					value.getWithholdingConfig.paymentDay == null
						? 0
						: value.getWithholdingConfig.paymentDay;
				formState.insuranceSupport =
					value.getWithholdingConfig.insuranceSupport;
				formState.competentTaxOfficeCode =
					value.getWithholdingConfig.competentTaxOfficeCode;
				formState.localIncomeTaxArea =
					value.getWithholdingConfig.localIncomeTaxArea;
				formState.companyAddressInfoAddress =
					value.getWithholdingConfig.companyAddressInfo.address;
				formState.collectivePayment =
					value.getWithholdingConfig.collectivePayment;
				formState.taxForEachBusiness =
					value.getWithholdingConfig.taxForEachBusiness;
				formState.undeclaredIncomeStatus =
					value.getWithholdingConfig.undeclaredIncomeStatus;
				dataQueryInstitution.value = {
					bcode: value.getWithholdingConfig.companyAddressInfo.bcode,
				};
				if (dataQueryInstitution.value.bcode) {
					// refetchConfigInstitution()
					trigger.value = true;
				}
			}
		});
		const {
			result: resultConfigDeduction,
			loading: loadingDeduction,
		} = useQuery(
			queries.getWithholdingConfigDeductionItems,
			// dataQueryDeduction,
			dataQuery,
			() => ({
				enabled: triggerWithholdingConfigDeductionItems.value,
				fetchPolicy: "no-cache",
			})
		);
		watch(resultConfigDeduction, (value) => {
			triggerWithholdingConfigDeductionItems.value = false;
			if (value.getWithholdingConfigDeductionItems.length) {
				dataSourceDeduction.value = value.getWithholdingConfigDeductionItems;
				if (runOne.value) {
					runOne.value = false;
					let data = value.getWithholdingConfigDeductionItems[0];
					focusedRowKeyTab3.value = data.itemCode;
					formStateDeduction.itemCode = data.itemCode;
					formStateDeduction.taxPayCode =
						data.taxfreePayItemCode != null
							? ["비과세", data.taxfreePayItemCode]
							: ["과세", data.taxPayItemCode];
					formStateDeduction.name = data.name;
					formStateDeduction.use = data.use;
					formStateDeduction.formula = data.formula;
					Object.assign(dataOldFormStateDeduction, formStateDeduction);
				} else {
					if (statusClickSaveModal.value) {
						statusClickSaveModal.value = false;
						focusedRowKeyTab3.value = dataOldFormStateDeduction.itemCode;
						let dataNew = dataSourceDeduction.value.find(
							(value: any) =>
								value.itemCode == dataOldFormStateDeduction.itemCode
						);
						Object.assign(formStateDeduction, dataNew);
						Object.assign(dataOldFormStateDeduction, dataNew);
					} else {
						Object.assign(dataOldFormStateDeduction, formStateDeduction);
					}
				}
			} else {
				dataSourceDeduction.value = [];
				// clear data
				Object.assign(
					dataOldFormStateDeduction,
					JSON.parse(JSON.stringify({ ...initialFormStateDeduction }))
				);
				Object.assign(
					formStateDeduction,
					JSON.parse(JSON.stringify({ ...initialFormStateDeduction }))
				);
			}
		});

		const {
			result: resultConfigInstitution,
		} = useQuery(queries.getPublicInstitution, dataQueryInstitution, () => ({
			enabled: trigger.value,
			fetchPolicy: "no-cache",
		}));
		const dataPublicInstitution = ref<any>({});
		watch(resultConfigInstitution, (value) => {
			trigger.value = false;
			dataPublicInstitution.value = value.getPublicInstitution;
		});
		// update config
		const {
			mutate: actionUpdateWithholdingConfig,
			onDone: onDoneUpdated,
			onError: errorEditConfig,
		} = useMutation(mutations.updateWithholdingConfig);
		errorEditConfig((error) => {
			//notification('error', error.message)
		});
		onDoneUpdated(() => {
			notification("success", Message.getMessage("COMMON", "106").message);
			// refetchConfig();
			triggerWithholdingConfig.value = true;
			store.state.common.isDisableInsuranceSupport = formState.insuranceSupport;
		});
		const onSubmitConfig = () => {
			let variables = {
				companyId: companyId,
				imputedYear: globalYear,
				input: {
					reportType: formState.reportType,
					paymentType: formState.paymentType,
					paymentDay: formState.paymentDay,
					insuranceSupport: formState.insuranceSupport,
					competentTaxOfficeCode: formState.competentTaxOfficeCode,
					localIncomeTaxArea: formState.localIncomeTaxArea,
					collectivePayment: formState.collectivePayment,
					taxForEachBusiness: formState.taxForEachBusiness,
				},
			};
			actionUpdateWithholdingConfig(variables);
		};
		const {
			mutate: updateWithholdingConfigDeductionItem,
			onDone: onDoneUpdatedDeduction,
			onError: errorEditConfigDeduction,
		} = useMutation(mutations.updateWithholdingConfigDeductionItem);
		errorEditConfigDeduction((error) => {
			//notification('error', error.message)
		});
		onDoneUpdatedDeduction(() => {
			notification("success", Message.getMessage("COMMON", "106").message);
			triggerWithholdingConfigDeductionItems.value = true;
		});
		const onSubmitConfigDeduction = () => {
			let variables = {
				companyId: companyId,
				imputedYear: globalYear,
				itemCode: formStateDeduction.itemCode,
				input: {
					formula: formStateDeduction.formula,
				},
			};
			makeDataClean(variables);
			updateWithholdingConfigDeductionItem(variables);
		};
		const onFocusedRowChangingTab3 = (e: any) => {
			const rowElement = document.querySelector(
				`[aria-rowindex="${e.newRowIndex + 1}"]`
			);
			let data = e.rows[e.newRowIndex]?.data;
			if (
				JSON.stringify(dataOldFormStateDeduction) !==
				JSON.stringify(formStateDeduction)
			) {
				if (data) {
					dataOldFormStateDeduction.itemCode = data.itemCode;
					dataOldFormStateDeduction.taxPayCode =
						data.taxfreePayItemCode != null
							? ["비과세", data.taxfreePayItemCode]
							: ["과세", data.taxPayItemCode];
					dataOldFormStateDeduction.name = data.name;
					dataOldFormStateDeduction.use = data.use;
					dataOldFormStateDeduction.formula = data.formula;
				}
				modalStatus.value = true;
				rowElement?.classList.add("dx-state-hover-custom");
				e.cancel = true;
			} else {
				if (data) {
					dataOldFormStateDeduction.itemCode = data.itemCode;
					dataOldFormStateDeduction.taxPayCode =
						data.taxfreePayItemCode != null
							? ["비과세", data.taxfreePayItemCode]
							: ["과세", data.taxPayItemCode];
					dataOldFormStateDeduction.name = data.name;
					dataOldFormStateDeduction.use = data.use;
					dataOldFormStateDeduction.formula = data.formula;
				}
				Object.assign(formStateDeduction, dataOldFormStateDeduction);
			}
		};

		const modalSetting = () => {
			countResetPopup.value++
			modalSettingStatus.value = true;
		};

		const modalHistoryDeduction = () => {
			modalHistoryStatusDeduction.value = true;
		};

		const changeValueAddress = (data: any) => {
			formState.competentTaxOfficeCode = data.taxOfficeName;
			formState.localIncomeTaxArea = data.localIncomeTaxArea;
		};

		const statusComfirm = (val: any) => {
			if (val) {
				statusClickSaveModal.value = true;
				onSubmitConfigDeduction();
			} else {
				Object.assign(formStateDeduction, dataOldFormStateDeduction);
				focusedRowKeyTab3.value = formStateDeduction.itemCode;
			}
			gridRefCM110Tab3.value?.instance.refresh();
		};
		return {
			changeValueAddress,
			move_column,
			colomn_resize,
			optionsRadioReportType,
			optionsRadioPaymentType,
			labelCol: { style: { width: "150px" } },
			formState,
			formStateDeduction,
			activeKey: ref("1"),
			onSubmitConfig,
			onFocusedRowChangingTab3,
			isShow,
			setModalVisible,
			showModal,
			handleSuccsess,
			dataSource,
			dataSourceDeduction,
			loading,
			loadingDeduction,
			modalSettingStatus,
			modalHistoryStatusDeduction,
			onSubmitConfigDeduction,
			modalSetting,
			modalHistoryDeduction,
			dataPublicInstitution,
			itemCodeMax,
			resetFormNum,
			focusedRowKeyTab3,
			modalStatus,
			Message,
			statusComfirm,
			gridRefCM110Tab3,
			countResetPopup,
		};
	},
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
