<template>
	<div class="detail">
		<a-row class="detail-body">
			<a-col class="detail1">
				<StandardForm formName="ac-120-form" ref="refFormAC120" :key="store.state.common.ac120.keyRefreshForm">
					<div class="ac120">
						<a-row class="mt-20">
							<a-col :span="7" class="col-1">
								<div class="input_info">
									<a-form-item label="결의서 종류">
										<default-text-box
											:valueInput="store.state.common.ac120.arrResolutionType.find((item: any) => formData.resolutionType == item.id)?.text"
											width="100px" placeholder="여입" disabled="true" />
									</a-form-item>
									<button-basic @onClick="actionOpenModalCopy" style="margin: -5px 0px 0px 5px"
										mode="contained" type="default" :text="textButton + '으로 변경'"
										:disabled="statusNoData || isDisabled" />
								</div>
								<a-form-item label="결의구분">
									<default-text-box
										:valueInput="store.state.common.ac120.arrResolutionClassification.find((item: any) => formData.resolutionClassification == item.id)?.text"
										width="100px" placeholder="지출" disabled="true" />
								</a-form-item>
							</a-col>
							<a-col :span="5" class="col-2">
								<a-form-item label="결의일자" class="red">
									<date-time-box :teleport="true" v-model:valueDate="formData.transactionDetailDate"
										width="130px" :required="true" disabled="true" />
								</a-form-item>
								<a-form-item label="통장" class="red">
									<default-text-box v-model:valueInput="bankbookNickname" width="130px"
										style="margin-right: 10px" :required="true" disabled="true" />
								</a-form-item>
							</a-col>
							<a-col :span="6" class="col-3">
								<a-form-item label="금액" class="red">
									<number-box-money v-model:valueInput="formData.amount" width="150px" :required="true"
										:spinButtons="false" disabled="true" />
								</a-form-item>
								<a-form-item label="적요" class="red">
									<default-text-box v-model:valueInput="formData.summary"
										:disabled="statusNoData || isDisabled " width="150px" :required="true" />
								</a-form-item>
							</a-col>
							<a-col :span="6" class="col-4 fl-r">
								<a-form-item label="자금원천" class="red">
									<FundingSourceSelect v-model:valueInput="formData.fundingSource"
										:disabled="statusNoData || isDisabled" width="230px" :required="true" />
								</a-form-item>
								<!-- <a-form-item label="계정과목" class="red">
                  <account-code-select :key="resetSelectAccount" :disabled="statusNoData || (userType !== 'm' && statusProcess != 10" || (userType === 'm' && statusProcess === 40 :classification="classificationAccountCode"
                    v-model:valueInput="formData.accountCode" width="230px" :required="true" />
                </a-form-item> -->
								<a-form-item label="계정과목">
									<account-code-select :key="resetSelectAccount"
										:disabled="statusNoData || isDisabled"
										:classification="classificationAccountCode"
										v-model:valueInput="formData.accountCode" width="230px" />
								</a-form-item>
							</a-col>
							<a-col :span="7" class="col-1">
								<a-form-item label="원인행위일자" class="red" :class="colorDate">
									<date-time-box :teleport="true" :disabled="statusNoData || isDisabled"
										v-model:valueDate="formData.causeActionDate" width="150px" :required="true"
										ref="requiredCauseActionDate" />
								</a-form-item>
								<a-form-item label="결재일자">
									<date-time-box :teleport="true" :disabled="statusNoData || isDisabled"
										v-model:valueDate="formData.paymentDate" width="150px" />
								</a-form-item>
								<a-form-item label="발의일자">
									<date-time-box :teleport="true" :disabled="statusNoData || isDisabled"
										v-model:valueDate="formData.proposedDate" width="150px" />
								</a-form-item>
							</a-col>
							<a-col :span="5" class="col-2">
								<a-form-item :label="null" style="margin-left: 75px">
									<default-text-box v-model:valueInput="bankbookNumber" width="130px" :required="true"
										disabled="true" />
								</a-form-item>

								<a-form-item label="출납일자">
									<date-time-box :teleport="true" :disabled="statusNoData || isDisabled"
										v-model:valueDate="formData.accountingDate" width="130px" />
								</a-form-item>
								<a-form-item label="등기일자">
									<date-time-box :teleport="true" :disabled="statusNoData || isDisabled"
										v-model:valueDate="formData.registrationDate" width="130px" />
								</a-form-item>
							</a-col>
							<a-col :span="6" class="col-3">
								<a-form-item label="거래처">
									<customer-select
										:disabled="formData.resolutionClassification == 1 || statusNoData || isDisabled"
										v-model:valueInput="formData.clientId" :search-enabled="true" width="150px" />
								</a-form-item>
								<div class="input_info">
									<a-form-item :label="textLabelInputSource">
										<default-text-box v-model:valueInput="formData.source" width="150px"
											:disabled="statusNoData || isDisabled" />
									</a-form-item>
									<a-tooltip placement="top" color="black" class="fz-10 ml-10 mb-5">
										<template #title>기본값은 [회계설정 > 회계기타] 메뉴에서 입력된 결의서
											{{ textLabelInputSource }} 을 참조합니다.</template>
										<img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px"
											class="mr-5" />
									</a-tooltip>
								</div>
								<div class="input_info">
									<a-form-item label="작성자">
										<default-text-box v-model:valueInput="formData.writer" width="150px"
											:disabled="statusNoData || isDisabled" />
									</a-form-item>
									<a-tooltip placement="top" color="black" class="fz-10 ml-10 mb-5">
										<template #title>기본값은 [회계설정 > 회계기타] 메뉴에서 입력된 결의서
											작성자를 참조합니다.</template>
										<img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px"
											class="mr-5" />
									</a-tooltip>
								</div>
							</a-col>
							<a-col :span="6" class="col-4 fl-r">
								<a-form-item label="상대계정">
									<account-code-select :key="resetSelectAccount"
										:disabled="formData.resolutionClassification == 1 || statusNoData || isDisabled"
										:classification="classificationRelationCode"
										v-model:valueInput="formData.relationCode" width="230px" />
								</a-form-item>
								<a-form-item label="메모">
									<!-- <default-text-box v-model:valueInput="formData.memo"
                                            width="150px" height="60px" /> -->
									<text-area-box width="230px" v-model:valueInput="formData.memo" :height="60"
										:disabled="statusNoData || isDisabled" />
								</a-form-item>
							</a-col>
						</a-row>
						<!-- <div v-if="!(formData.resolutionClassification == 1)"> -->
						<a-row>
							<a-col :span="24">
								<div class="top-content">
									<a-typography-title :level="5" style="margin-bottom: 0">품의서
										<a-tooltip color="black" placement="top">
											<template #title>지출결의서 기재 사항</template>
											<img src="@/assets/images/iconInfo.png" class="img-info" />
										</a-tooltip>
									</a-typography-title>
								</div>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-item class="red" label="품의종류">
									<radio-group
										:disabled="formData.resolutionClassification == 1 || statusNoData || isDisabled"
										v-model:valueRadioCheck="formData.letterOfApprovalType"
										:arrayValue="arrayRadioCheck" :layoutCustom="'horizontal'" :required="true" />
								</a-form-item>
							</a-col>
							<a-col :span="12">
								<a-form-item label="물품내역수">
									<default-text-box v-if="formData.resolutionClassification != 1" :disabled="true" v-model:valueInput="formData.goodsCount"
										width="150px" />
									<default-text-box v-else :disabled="true" :valueInput="0"
										width="150px" />
								</a-form-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="24">
								<a-form-item label="품의 원인 및 용도">
									<text-area-box
										:disabled="formData.resolutionClassification == 1 || statusNoData || isDisabled"
										v-model:valueInput="formData.causeUsage" :height="50" />
								</a-form-item>
							</a-col>
						</a-row>
						<!-- </div> -->
					</div>
				</StandardForm>
				<div class="text-align-center mt-20">
					<DxButton @click="onCancelDeleteRow" class="custom-button" type="default"
						:height="$config_styles.HeightInput" :disabled="statusNoData || isDisabled">
						<div class="d-flex-center">
							<checkbox-basic :valueCheckbox="true" disabled="true" />
							<span>전표취소</span>
						</div>
					</DxButton>
					<button-basic @onClick="onSubmit" :disabled="statusNoData || isDisabled"
						style="margin-left: 5px" mode="contained" type="default" text="저장" />
				</div>
			</a-col>
			<a-col class="upload detail2">
				<UploadPreviewImage v-model:list-image-file="fileList" :statusProcess="statusProcess" />
			</a-col>
		</a-row>
	</div>
	<PopupCopyData :modalStatus="statusPopupCopyData" @closePopup="statusPopupCopyData = false"
		@submit="statusPopupCopyData = false" :key="keyResetPopupCopy" />
	<ModalDelete :modalStatus="statusModalDelete" @closePopup="statusModalDelete = false" :dataRows="[formData]" />
	<PopupMessage :modalStatus="isModalChange" @closePopup="isModalChange = false" :typeModal="'confirm'" :title="''"
		:content="Message.getMessage('AC120', '001').message" :okText="Message.getMessage('AC120', '001').yes"
		:cancelText="Message.getMessage('AC120', '001').no" @checkConfirm="handleConfirmChange" />
</template>

<script lang="ts">
import { useStore } from "vuex";
import {
	defineComponent,
	ref,
	reactive,
	computed,
	onMounted,
	watch,
} from "vue";
import { initialStateFormData } from "../utils/index";
import PopupCopyData from "./PopupCopyData.vue";
import DxButton from "devextreme-vue/button";
import { useQuery, useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/AC/AC1/AC120";
import dayjs from "dayjs";
import {
	FullscreenOutlined,
	FullscreenExitOutlined,
} from "@ant-design/icons-vue";
import ModalDelete from "./ModalDelete.vue";
import queries from "@/graphql/queries/AC/AC1/AC120";
import notification from "@/utils/notification";
import { Message } from "@/configs/enum";
import { companyId, userType } from "@/helpers/commonFunction";
import filters from "@/helpers/filters";
import UploadPreviewImage from "./UploadPreviewImage.vue";
import { cloneDeep, isEqual } from "lodash";
export default defineComponent({
	components: {
		PopupCopyData,
		DxButton,
		UploadPreviewImage,
		ModalDelete,
		FullscreenOutlined,
		FullscreenExitOutlined,
	},
	props: {
		statusProcess: {
			type: Number,
			default: 0,
		},
	},
	setup(props, { emit }) {
		const store = useStore();
		const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? "0"));
		const globalFacilityBizId = ref<number>(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0"));
		const formData = computed(() => store.state.common.ac120.formData);
		const statusNoData = computed(() => store.state.common.ac120.statusNoData);
		const refFormAC120 = ref();
		let statusPopupCopyData = ref<boolean>(false);
		let fileList = ref<any[]>([]);
		const textButton = ref('여입');
		const textLabelInputSource = ref<string>("수입원");
		const requiredCauseActionDate = ref();
		const arrayRadioCheck = computed(() => store.state.common.ac120.arrLetterOfApprovalType);
		let colorDate = ref();
		let statusModalDelete = ref(false);
		let bankbookNickname = ref<string>("");
		let bankbookNumber = ref<string>("");
		const resetSelectAccount = ref<number>(0);
		const classificationAccountCode = ref<any>([4]);
		const classificationRelationCode = ref<any>([5]);
		const isModalChange = ref<boolean>(false);
		let dataAccountSubject = JSON.parse(sessionStorage.getItem("accountSubject") ?? "[]");
		const keyResetPopupCopy = ref<number>(0)
		const statusProcess = computed(() => props.statusProcess)
    const isDisabled = computed(() => (userType !== 'm' && statusProcess.value !== 10) || (userType === 'm' && statusProcess.value === 40))
		// =================== GRAPHQL ===================
		// mutation updateAccountingDocument
		const {
			mutate: mutateUpdateAccountingDocument,
			onDone: doneUpdateAccountingDocument,
			onError: errorUpdateAccountingDocument,
		} = useMutation(mutations.updateAccountingDocument);

		const { result: resultCompany } = useQuery(
			queries.getMyCompany,
			{ companyId: companyId },
			() => ({ fetchPolicy: "no-cache" })
		);

		// ============== ON DONE MUTATION GRAPHQL ===============
		// updateAccountingDocument
		doneUpdateAccountingDocument((e) => {
			store.state.common.ac120.statusKeppRow = true;
			notification("success", Message.getMessage("COMMON", "106").message);
			// store.state.common.ac120.onDoneAdd++
			store.state.common.ac120.resetDataTable++;
			store.state.common.ac120.resetDataAccountingProcesses++;
		});
		errorUpdateAccountingDocument((e) => {
			//notification('error', e.message)
		});

		// ================== WATCH ================
		watch(resultCompany, (value) => {
			if (value.getMyCompany) {
				initialStateFormData.source = value.getMyCompany.presidentName;
			}
		});

		// watch(() => classification.value, (newValue, oldValue) => {

		//     formData.value.accountCode = null
		//     formData.value.relationCode = null
		// })

		watch(
			() => [
				formData.value.resolutionType,
				store.state.common.ac120.arrResolutionType,
			],
			(newValue, oldValue) => {
				switch (formData.value.resolutionType) {
					case 11:
						classificationAccountCode.value = [4];
						classificationRelationCode.value = [5];
						formData.value.resolutionClassification = 1;
						formData.value.clientId = null
						textLabelInputSource.value = "수입원";
						textButton.value = store.state.common.ac120.arrResolutionType.find((element: any) => element.id == 22)?.text;
						formData.value.letterOfApprovalType = null;
						formData.value.causeUsage = null;
						break;
					case 22:
						classificationAccountCode.value = [5];
						classificationRelationCode.value = [4];
						formData.value.resolutionClassification = 2;
						textLabelInputSource.value = "지출원";
						textButton.value = store.state.common.ac120.arrResolutionType.find((element: any) => element.id == 11)?.text;
						formData.value.letterOfApprovalType = formData.value.letterOfApprovalType ?? 1;
						formData.value.causeUsage = formData.value.causeUsage ?? null;
						break;
					case 21:
						classificationAccountCode.value = [5];
						classificationRelationCode.value = [4];
						formData.value.resolutionClassification = 2;
						textLabelInputSource.value = "지출원";
						textButton.value = store.state.common.ac120.arrResolutionType.find((element: any) => element.id == 12)?.text;
						formData.value.letterOfApprovalType = formData.value.letterOfApprovalType ?? 1;
						formData.value.causeUsage = formData.value.causeUsage ?? null;
						break;
					case 12:
						classificationAccountCode.value = [4];
						classificationRelationCode.value = [5];
						formData.value.resolutionClassification = 1;
						formData.value.clientId = null
						textLabelInputSource.value = "수입원";
						textButton.value = store.state.common.ac120.arrResolutionType.find((element: any) => element.id == 21)?.text;
						formData.value.letterOfApprovalType = null;
						formData.value.causeUsage = null;
						break;
					default:
						formData.value.resolutionClassification = null;
						formData.value.clientId = null
						textLabelInputSource.value = "수입원";
						textButton.value = ''
						formData.value.letterOfApprovalType = null;
						formData.value.causeUsage = null;
				}
				resetSelectAccount.value++;
			}
		);

		watch(
			() => formData.value.causeActionDate,
			(newValue, oldValue) => {
				// if (store.state.common.ac120.statusFormAdd) {
				colorDate.value =
					newValue == formData.value.transactionDetailDate
						? "greenColor"
						: "redColor";
				// } else {
				//     colorDate.value = newValue == formData.value.transactionDetailDate ? 'greenColor' : 'redColor'
				// }
			}
		);
		watch(
			() => store.state.common.ac120.onSubmitFormUpdate,
			(newValue, oldValue) => {
				onSubmit();
			}
		);

		watch(
			() => [
				formData.value.bankbookId,
				store.state.common.ac120.arrayBankbooksForWork,
			],
			(newValue, oldValue) => {
				let data = store.state.common.ac120.arrayBankbooksForWork?.find(
					(item: any) => item.value == formData.value.bankbookId
				);
				bankbookNickname.value = data?.bankbookNickname;
				bankbookNumber.value = data?.bankbookNumber;
			},
			{ deep: true }
		);

		// ================ FUNCTION ============================================
		// const toggleTransition = () => {
		//     store.state.common.ac120.statusShowFull = !store.state.common.ac120.statusShowFull
		// }
		const actionOpenModalCopy = () => {
			if (formData.value.resolutionType == 11) {
				statusPopupCopyData.value = true;
				keyResetPopupCopy.value++
			} else {
				isModalChange.value = true;
			}
		};

		const onSubmit = () => {
			const res = refFormAC120.value?.validate();
			if (!res.isValid) {
				store.state.common.ac120.clearCheckCkick++;
				res.brokenRules[0].validator.focus();
				if (!formData.value.causeActionDate) {
					requiredCauseActionDate.value.validate(true);
				}
			} else {
				if (!formData.value.causeActionDate) {
					requiredCauseActionDate.value.validate(true);
					store.state.common.ac120.clearCheckCkick++;
					return;
				}
				let theOrder = ref(0);
				dataAccountSubject.map((row: any) => {
					if (row.useStartDate <= formData.value.transactionDetailDate <= row.useFinishDate) {
						theOrder.value = row.theOrder;
					}
				});
				let dataSubmit: any = {
					companyId: companyId,
					fiscalYear: acYear.value,
					facilityBusinessId: globalFacilityBizId.value,
					transactionDetailDate: formData.value.transactionDetailDate,
					accountingDocumentId: formData.value.accountingDocumentId,
					input: {
						...formData.value,
						theOrder: theOrder.value,
					},
				};
				if (dataSubmit.input.resolutionType == 11 || dataSubmit.input.resolutionType == 12) {
				    dataSubmit.input.statementOfGoodsItems = null;
				}
				// else if (dataSubmit.input.resolutionType == 12 || dataSubmit.input.resolutionType == 22) {
				//     dataSubmit.input.amount = -dataSubmit.input.amount
				// }
				dataSubmit.input.causeUsage = dataSubmit.input.causeUsage?.trim()
					?.length
					? dataSubmit.input.causeUsage
					: null;
				delete dataSubmit.input.resolutionClassification;
				// delete dataSubmit.input.resolutionDate
				delete dataSubmit.input.bankbook;
				delete dataSubmit.input.bankbookId;
				delete dataSubmit.input.accountingDocumentId;
				delete dataSubmit.input.transactionDetailDate;
				delete dataSubmit.input.documentOrderByDate;
				// delete dataSubmit.input.income
				// delete dataSubmit.input.spending
				// delete dataSubmit.input.clientId
				delete dataSubmit.input.goodsCount;
				delete dataSubmit.input.proofCount;
				delete dataSubmit.input.handwriting;
				delete dataSubmit.input.resolutionNormalStatus;
				delete dataSubmit.input.resolutionNumber;
				delete dataSubmit.input.summaryOfBankbookDetail;
				delete dataSubmit.input.bankbookDetailId;
				delete dataSubmit.input.balance;
				const cleanData = JSON.parse(
					JSON.stringify(dataSubmit, (name, val) => {
						if (name === "__typename") {
							delete val[name];
						} else {
							return val;
						}
					})
				);
				mutateUpdateAccountingDocument(cleanData);
				// }
			}
		};
		const onCancelDeleteRow = () => {
			// if (store.state.common.ac120.statusFormAdd) { // xóa row chưa lưu
			//     store.state.common.ac120.onDeleteRowAdd++
			// } else { // delete data
			statusModalDelete.value = true;
			// }
		};
		const handleConfirmChange = (status: boolean) => {
			if (status) {
				switch (formData.value.resolutionType) {
					case 11:
						formData.value.resolutionType = 22;
						break;
					case 22:
						formData.value.resolutionType = 11;
						break;
					case 21:
						formData.value.resolutionType = 12;
						break;
					case 12:
						formData.value.resolutionType = 21;
						break;
					default:
					// code block
				}
				formData.value.amount = -formData.value.amount;
			}
		};
		const openShowFull = () => {
			store.state.common.ac120.statusShowFull =
				!store.state.common.ac120.statusShowFull;
		};

		return {
			store,
			// toggleTransition,
			statusPopupCopyData, keyResetPopupCopy,
			arrayRadioCheck,
			onSubmit,
			fileList,
			refFormAC120,
			actionOpenModalCopy,
			textButton,
			textLabelInputSource,
			requiredCauseActionDate,
			onCancelDeleteRow,
			colorDate,
			bankbookNickname,
			bankbookNumber,
			statusModalDelete,
			openShowFull,
			resetSelectAccount,
			classificationAccountCode,
			classificationRelationCode,
			Message,
			isModalChange,
			handleConfirmChange,
			formData, statusNoData,
			statusProcess,
      userType,
      isDisabled
		};
	},
});
</script>

<style lang="scss" scoped src="../style/style.scss"></style>
