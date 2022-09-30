<template>

	<div id="modal-detail-bf-310">
		<a-modal :mask-closable="false" :visible="modalStatus" title="계약정보관리&심사 " centered okText="저장하고 나가기"
			cancelText="그냥 나가기" @cancel="setModalVisible()" width="1000px">
			<div v-if="error">
				{{ error }}
			</div>
			<Suspense v-else-if="result && result.getSubscriptionRequest">
				<template #default>
					<a-form :data-source="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-collapse v-model:activeKey="activeKey" accordion>
							<a-collapse-panel key="1" header="심사정보">
								<a-form-item label="승인상태">
									<a-dropdown>
										<div v-html="yourVariable"></div>
										<template #overlay>
											<DxDataGrid width="500px" :data-source="gridDataSource"
												v-model:selected-row-keys="gridBoxValue"
												@selection-changed="onGridSelectionChanged(gridBoxValue)"
												:show-borders="true" key-expr="ID" :columns="gridColumns">
												<DxSelection mode="single" />
												<DxPaging :page-size="5" />
												<DxColumn data-field="신청코드" />
												<DxColumn data-field="심사상태" data-type="date"
													cell-template="grid-cell" />
												<template #grid-cell="{ data }">
													<a-tag :color="getColorTag(data.value)">{{
													data.value
													}}</a-tag>
												</template>
												<DxColumn data-field="상호" data-type="date" />
											</DxDataGrid>
										</template>
									</a-dropdown>
								</a-form-item>

								<a-form-item label="사업자코드">
									<a-typography-title :level="5">
										{{result.getSubscriptionRequest.companyBizNumber}}
									</a-typography-title>
								</a-form-item>
								<a-row>
									<a-col :span="12">
										<a-form-item label="신청코드">
											<a-typography-title :level="5">{{result.getSubscriptionRequest.code}}
											</a-typography-title>
										</a-form-item>
									</a-col>
									<a-col :span="12">
										<a-form-item label="신청일자">
											<a-typography-title :level="5">
												{{formarDate(result.getSubscriptionRequest.createdAt)}}
											</a-typography-title>
										</a-form-item>
									</a-col>
								</a-row>
								<a-form-item label="심사메모">
									<a-input v-model:value="value" placeholder="Basic usage" />
								</a-form-item>
								<a-form-item label="약관동의">
									<a-button type="link" style="padding: 0px">서비스약관</a-button>
									|
									<a-button type="link" style="padding: 0px">개인정보제공활용동의</a-button>
									|
									<a-button type="link" style="padding: 0px">회계서비스약관동의</a-button>
									|
									<a-button type="link" style="padding: 0px">원천서비스약관동의</a-button>
								</a-form-item>

							</a-collapse-panel>
							<a-collapse-panel key="2" header="사업자정보">
								<a-form-item label="상 호" class="clr">
									<a-input :value="result.getSubscriptionRequest.companyName" />
								</a-form-item>
								<a-form-item label="사업자등록번호" class="clr">
									<a-input style="width: 300px" :value="result.getSubscriptionRequest.bizNumber" />
								</a-form-item>

								<a-row>
									<a-col :span="12">
										<a-form-item label="사업자유형" class="clr">
											<a-radio-group
												:value="result.getSubscriptionRequest.content.company.bizType">
												<a-radio :value="1" class="clb" checked>법인사업자</a-radio>
												<a-radio :value="2" class="clb">개인사업자</a-radio>
											</a-radio-group>
										</a-form-item>
									</a-col>
									<a-col :span="2">
										<a-form-item
											:label="changeTypeCompany(result.getSubscriptionRequest.content.company.bizType)">
											<a-input placeholder="800123-1234567" style="width: 300px"
												:value="result.getSubscriptionRequest.content.company.residentId" />
										</a-form-item>
									</a-col>
								</a-row>
								<a-form-item label="주소" class="clr">
									<a-row :gutter="[0, 4]">
										<a-col :span="24">
											<a-row>
												<a-col :span="12">
													<a-input style="width: 300px"
														:value="result.getSubscriptionRequest.content.company.zipcode" />
												</a-col>
												<a-col :span="12">
													<a-button type="primary">우편번호 검색</a-button>
												</a-col>
											</a-row>
										</a-col>
										<a-col :span="24">
											<a-row>
												<a-input
													:value="result.getSubscriptionRequest.content.company.roadAddress" />
											</a-row>
										</a-col>
										<a-col :span="24">
											<a-row>
												<a-input
													:value="result.getSubscriptionRequest.content.company.addressExtend" />
											</a-row>
										</a-col>
									</a-row>
									<a-row> </a-row>
								</a-form-item>
								<a-row :gutter="[16, 16]">
									<a-col :span="18">
										<a-form-item label="연락처" class="clr">
											<a-input :value="result.getSubscriptionRequest.content.company.phone" />
										</a-form-item>
										<a-form-item label="팩 스">
											<a-input :value="result.getSubscriptionRequest.content.company.fax" />
										</a-form-item>
									</a-col>
									<imgUpload :title="titleModal" @update-img="getImgUrl" />

								</a-row>

							</a-collapse-panel>
							<a-collapse-panel key="3" header="대표자정보">
								<a-form-item has-feedback label="대표자명" class="clr">
									<a-input placeholder="홍길동" autocomplete="off" style="width: 300px"
										:value="result.getSubscriptionRequest.content.president.name" />
								</a-form-item>
								<a-form-item has-feedback label="생년월일" class="clr">
									<a-input placeholder="19620820" autocomplete="off" style="width: 300px"
										:value="result.getSubscriptionRequest.content.president.birthday" />
								</a-form-item>
								<a-form-item has-feedback label="휴대폰번호" class="clr">
									<a-input placeholder="01098765432" style="width: 200px"
										:value="result.getSubscriptionRequest.content.president.mobilePhone" />
								</a-form-item>

								<a-form-item has-feedback label="이메일" class="clr" :name="['user', 'email']"
									:rules="[{ type: 'email' }]">
									<a-input style="width: 200px"
										:value="result.getSubscriptionRequest.content.president.email" />
								</a-form-item>



							</a-collapse-panel>
							<a-collapse-panel key="4" header="회계서비스신청" class="popup-scroll">
								<div>
									<a-checkbox v-model:checked="checked">회계서비스 신청합니다.</a-checkbox>
									<div>
										<a-card title="⁙ 운영사업" :bordered="false" style="width: 100%"
											:headStyle="{padding: '5px',color: 'red'}" bodyStyle="padding: 0px 0px">
										</a-card>
										<div id="data-grid-demo">
											<DxDataGrid id="gridContainer"
												:data-source="result.getSubscriptionRequest.content.accounting.facilityBusinesses"
												:show-borders="true" :selected-row-keys="selectedItemKeys">
												<DxEditing :use-icons="true" :allow-updating="true" :allow-adding="true"
													:allow-deleting="true" template="button-template" mode="cell">
													<DxTexts confirmDeleteMessage="삭제하겠습니까?" />
												</DxEditing>
												<template #button-template>
													<DxButton icon="plus" />
												</template>
												<DxPaging :enabled="false" />
												<DxColumn data-field="No" :allow-editing="false" :width="50" caption="#"
													cell-template="indexCell" />
												<template #indexCell="{ data }">
													<div>{{data.rowIndex + 1}}</div>
												</template>

												<DxColumn data-field="registrationCard.name" caption="사업명 (중복불가)" />
												<DxColumn data-field="facilityBizType" caption="사업분류" />
												<DxColumn data-field="startYearMonth" caption="서비스시작년월" data-type="date"
													:format="'yyyy-MM-dd'" />
												<DxColumn :width="100" data-field="capacity" caption="정원수 (명)" />

												<DxToolbar>
													<DxItem name="addRowButton" />
												</DxToolbar>
											</DxDataGrid>
										</div>

										<imgUpload :title="titleModal2" @update-img="getImgUrl" />
										<div>
											<a-row>
												<a-col :span="12">
													<p>부가서비스</p>
												</a-col>
												<a-col :span="12">
													<a-checkbox
														v-model:checked="result.getSubscriptionRequest.content.accounting.accountingServiceTypes[0]">
														회계입력대행서비스</a-checkbox>
												</a-col>
											</a-row>
										</div>
									</div>
								</div>
							</a-collapse-panel>
							<a-collapse-panel key="5" header="원천서비스신청">
								<div>
									<a-checkbox v-model:checked="checked">회계서비스 신청합니다.</a-checkbox>
									<div style="margin-top: 20px">

										<a-form-item label="서비스 시작년월" class="clr">
											<div style="width: 200px;">
												<CustomDatepicker
													:valueDate="result.getSubscriptionRequest.content.withholding.startYearMonth"
													className="0" />
											</div>
										</a-form-item>
										<a-form-item label="직 원 수" class="clr">
											<a-input-number style="width: 100px" min="0"
												:value="result.getSubscriptionRequest.content.withholding.capacity" />
										</a-form-item>
										<a-form-item label="부가서비스">
											<a-checkbox
												v-model:checked="result.getSubscriptionRequest.content.withholding.withholdingServiceTypes[0]">
												4대보험신고서비스</a-checkbox>
										</a-form-item>

									</div>
								</div>
							</a-collapse-panel>
							<a-collapse-panel key="6" header="CMS (자동이체출금) 계좌 정보 입력">
								<a-form-item label="출금은행" class="clr">
									<selectBank :selectValue="result.getSubscriptionRequest.content.cmsBank.bankType" />
								</a-form-item>
								<a-form-item label="출금계좌번호" class="clr">
									<a-input placeholder="100100056489011"
										:value="result.getSubscriptionRequest.content.cmsBank.accountNumber" />
								</a-form-item>
								<a-form-item label="예금주명" class="clr">
									<a-input placeholder="주식회사 타운소프트비나"
										:value="result.getSubscriptionRequest.content.cmsBank.ownerName" />
								</a-form-item>
								<a-form-item label="사업자(주민)등록번호:" class="d-flex align-items-start clr">
									<a-input placeholder="100100056489011"
										:value="result.getSubscriptionRequest.content.cmsBank.ownerBizNumber" />
									<div class="noteImage">
										<a-row>
											<a-col :span="1">
												<div>
													<InfoCircleFilled />
												</div>
											</a-col>
											<a-col :span="22">
												<div class="noteText">
													<p>예금주의 사업자등록번호 또는 주민등록번호입니다.</p>
												</div>
											</a-col>
										</a-row>
									</div>
								</a-form-item>
								<a-form-item label="자동이체출금일자" class="clr">
									<a-radio-group :value="result.getSubscriptionRequest.content.cmsBank.withdrawDay">
										<a-radio class="clb" :style="radioStyle" value="매월 5일">매월 5일</a-radio>
										<a-radio class="clb" :style="radioStyle" value="매월 12일">매월 12일</a-radio>
										<a-radio class="clb" :style="radioStyle" value="매월 19일">매월 19일</a-radio>
									</a-radio-group>
								</a-form-item>

							</a-collapse-panel>
							<a-collapse-panel key="7" header="기타">
								<a-form-item label="영업관리담당">
									<a-select ref="select"
										:value="result.getSubscriptionRequest.content.extra.salesRepresentativeId"
										style="width: 200px">
										<a-select-option :value="1">A 대리점</a-select-option>
										<a-select-option :value="2">농협</a-select-option>
										<a-select-option :value="3">C 영업사원</a-select-option>
										<a-select-option :value="4">D 영업사원</a-select-option>
										<a-select-option :value="5">E 본사영업사원</a-select-option>
									</a-select>
								</a-form-item>
								<a-form-item label="전달사항">
									<a-textarea :value="result.getSubscriptionRequest.content.extra.comment"
										placeholder="전달사항입력" />
								</a-form-item>
							</a-collapse-panel>
						</a-collapse>
					</a-form>
				</template>
				<template #fallback>
					<div>Loading...</div>
				</template>
			</Suspense>
		</a-modal>

	</div>

</template>
<script lang="ts">
import CustomDatepicker from "../../../../../components/CustomDatepicker.vue";
import selectBank from "../../../../../components/selectBank.vue";
import queries from "../../../../../graphql/queries/BF/BF3/BF310/index";
import { useQuery } from "@vue/apollo-composable";
import { ref, defineComponent, reactive, watch, onUpdated } from "vue";
import DxDropDownBox from "devextreme-vue/drop-down-box";
import {
	DxDataGrid,
	DxColumn,
	DxPaging,
	DxSelection,
	DxEditing,
	DxLookup,
	DxToolbar,
	DxItem,
	DxTexts

} from "devextreme-vue/data-grid";
import { employees, states } from "../data.js";
import {
	UploadOutlined,
	MinusCircleOutlined,
	InfoCircleFilled,
	PlusOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import dayjs from "dayjs";
import imgUpload from "../../../../../components/UploadImage.vue";
export default defineComponent({
	props: ["modalStatus", "data"],
	data() {
		return {
			activeKey: 1,

			formState: {
				status: "",
				code: "",
				companyName: "",
				companyBizNumber: "",
				companyAddress: "",
				presidentName: "",
				simpleAccountingInfos: [],
				simpleWithholdingInfoName: "",
				simpleWithholdingInfoYearMonth: "",
				processedAt: "",
				approvedAt: "",
				rejectedAt: "",

				agreementsTerms: true,
				agreementsPersonalInfo: true,
				agreementsAccountingService: true,
				agreementsWithholdingService: true,

				companyZipcode: "",
				companyRoadAddress: "",
				companyJibunAddress: "",

				companyAddressExtend: "",
				companyAddressDetailBcode: "",
				companyAddressDetailBname: "",
				companyAddressDetailBuildingCode: "",
				companyAddressDetailRoadname: "",
				companyAddressDetailRoadnameCode: "",
				companyAddressDetailSido: "",
				companyAddressDetailSigungu: "",
				companyAddressDetailSigunguCode: "",
				companyAddressDetailZonecode: "",

				companyPhone: "",
				companyFax: "",
				companyLicenseFileStorageId: "",
				companyBizType: 0,
				companyResidentId: "",
				companyLicense: "",

				presidentBirthday: "",
				presidentPhone: "",
				presidentEmail: "",
				accountingFblongTermCareInstitutionNumber: "",
				accountingFbfacilityBizType: 1,
				accountingFbName: "",
				accountingFbYearMonth: "",
				accountingFbcapacity: 23,
				accountingFbregistrationCardFileStorageId: 22,
				accountingFbregistrationCardName: "",
				accountingFbregistrationCardurl: "",
				accountingFbregistrationCardcreatedAt: 1664352972645,
				accountingFbregistrationCardcreatedBy: "",
				accountingFbregistrationCardupdatedAt: 1664352972645,
				accountingFbregistrationCardupdatedBy: "",
				accountingFbregistrationCardactive: true,
				accountingFbregistrationCardip: "",
				accountingServiceTypes: [],

				withholdingYearMonth: "",
				withholdingCapacity: 1234,
				withholdingServiceTypes: [],

				cmsBankType: "",
				accountNumber: "",
				ownerName: "",
				ownerBizNumber: "",
				withdrawDay: "",

				compactSalesRepresentativeID: "",
				compactSalesRepresentativeCode: "",
				compactSalesRepresentativeName: "",
				compactSalesRepresentativeActive: "",

				memo: "",
				createdAt: "",
				createdBy: "",
				updatedBy: "",
				ip: "",
				active: "",

				extraSalesRepresentativeId: 1,
				extraComment: '',
			},
			은행선택: '은행선택',
			영업관리담당: '은행선택',
			gridDataSource: employees,
			dataTableModal: [{
				ID: 1,
				신청일자: 'John',
				신청코드: 'Heart',
				심사상태: '신청',
				사업자코드: 'CEO',
				상호: '1964/03/16',
				주소: '1964/03/16',
				대표자: '1995/01/15',
				영업자: 'John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
				신청서비스: '351 S Hill St.',
				부가서비스: 5,
			}, {
				ID: 2,
				신청일자: 'Olivia',
				신청코드: 'Peyton',
				심사상태: '심사중',
				사업자코드: 'Sales Assistant',
				상호: '1964/03/16',
				주소: '1964/03/16',
				대표자: '2012/05/14',
				영업자: 'Olivia loves to sell. She has been selling DevAV products since 2012. \r\n\r\nOlivia was homecoming queen in high school. She is expecting her first child in 6 months. Good Luck Olivia.',
				신청서비스: '807 W Paseo Del Mar',
				부가서비스: 5,
			}, {
				ID: 3,
				신청일자: 'Robert',
				신청코드: 'Reagan',
				심사상태: '승인',
				사업자코드: 'CMO',
				상호: '1964/03/16',
				주소: '1964/03/16',
				대표자: '2002/11/08',
				영업자: 'Robert was recently voted the CMO of the year by CMO Magazine. He is a proud member of the DevAV Management Team.\r\n\r\nRobert is a championship BBQ chef, so when you get the chance ask him for his secret recipe.',
				신청서비스: '4 Westmoreland Pl.',
				부가서비스: 4,
			}, {
				ID: 4,
				신청일자: 'Greta',
				신청코드: 'Sims',
				심사상태: '반려',
				사업자코드: 'HR Manager',
				상호: '1964/03/16',
				주소: '1964/03/16',
				대표자: '1998/04/23',
				영업자: "Greta has been DevAV's HR Manager since 2003. She joined DevAV from Sonee Corp.\r\n\r\nGreta is currently training for the NYC marathon. Her best marathon time is 4 hours. Go Greta.",
				신청서비스: '1700 S Grandview Dr.',
				부가서비스: 11,
			},],
			gridBoxValue: [],
			fileList: [],
			gridColumns: ["심사상태", "사업자코드", "상호"],
			isGridBoxOpened: false,
			checked: true,
			columns: [
				{
					name: "사업명 (중복불가)",
					dataIndex: "사업명",
					key: "사업명",
				},
				{
					title: "사업분류",
					dataIndex: "사업분류",
					key: "사업분류",
				},
				{
					title: "서비스시작년월",
					dataIndex: "서비스시작년월",
					key: "서비스시작년월",
				},
				{
					title: "정원수(명)",
					key: "정원수",
					dataIndex: "정원수",
				},
				{
					title: "",
					key: "action",
				},
			],
			dataTable: [
				{
					key: "1",
					사업명: "가나다라마바 사업",
					사업분류: "방문요양",
					서비스시작년월: "2015/01/01",
					정원수: 10,
				},
				{
					key: "2",
					사업명: "가나다라마바 사업",
					사업분류: "방문간호",
					서비스시작년월: "2015/01/01",
					정원수: 10,
				},
				{
					key: "3",
					사업명: "가나다라마바 사업",
					사업분류: "단기보호",
					서비스시작년월: "2015/01/13",
					정원수: 10,
				},
			],
			keyNumber: 3,
			dateFormat: "YYYY-MM-DD",
			value1: dayjs("2015/01/01", "YYYY-MM-DD"),
			labelCol: { style: { width: "150px" } },
			wrapperCol: { span: 14 },
			radioStyle: {
				display: "flex",
				height: "20px",
				lineHeight: "20px",
				checked: false,
			},
			selectedItemKeys: [],
			value: ref<number>(1),
			titleModal: "사업자등록증",
			titleModal2: "장기요양기관등록증",
			states,
			dataSelectModal:
				'<button style="width:100%;height : 36px;text-align: left;background: white; border: 1px solid #d9d9d9; padding: 4px 6px; ">Select a value...</button>',
		};
	},
	apollo: {

	},
	components: {
		DxDropDownBox,
		DxDataGrid,
		DxColumn,
		DxPaging,
		DxSelection,
		UploadOutlined,
		MinusCircleOutlined,
		CustomDatepicker,
		InfoCircleFilled,
		PlusOutlined,
		imgUpload,
		DxEditing,
		DxLookup,
		DxToolbar,
		DxItem,
		DxTexts,
		selectBank
	},
	computed: {
		yourVariable() {
			return this.dataSelectModal;
		},
	},

	setup(props, { emit }) {
		const dataQuery = ref();
		const formDetail = ref();
		let trigger = ref<boolean>(false);
		const layout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
		};
		const formState = reactive({
			user: {
				name: '',
				age: undefined,
				email: '',
				website: '',
				introduction: '',
			},
		});
		const onFinish = (values: any) => {
			console.log('Success:', values);
		};

		const validateMessages = {
			required: "${label} is required!",
			types: {
				email: "이메일 형식이 정확하지 않습니다",
				number: "Numeric only!",
			},
			number: {
				range: "${label} must be between ${min} and ${max}",
			},
		};
		watch(() => props.modalStatus, (newUsername, old) => {
			if (newUsername) {
				dataQuery.value = { id: props.data }
				trigger.value = true;
				refetch()

			} else {
				trigger.value = false;
			}
		});

		const { result, loading, error, onResult, refetch } = useQuery(queries.getSubscriptionRequest, dataQuery, () => ({
			enabled: trigger.value,
		}));

		const setModalVisible = () => {
			trigger.value = false;
			emit("closePopup", false);

		};

		const changeTypeCompany = (bizType: number) => {
			if (bizType == 2) {
				return '주민등록번호'
			} else {
				return '법인등록번호'
			}
		}
		return {
			formState,
			onFinish,
			layout,
			validateMessages,
			setModalVisible,
			changeTypeCompany,
			result,
			error,
			loading
		};
	},
	methods: {

		getImgUrl(img: any) {
			// console.log("imgUrl", img);
		},

		getColorTag(data: string) {
			if (data === "신청") {
				return "red";
			} else if (data === "심사중") {
				return "blue";
			} else if (data === "승인") {
				return "green";
			} else if (data === "반려") {
				return "grey";
			}
		},
		onGridSelectionChanged(value: any) {
			let html = "";
			this.gridDataSource.map((element) => {
				if (element.ID == value) {
					console.log(element);
					html =
						'<div style="border: 1px solid #d9d9d9;padding: 6px;"><span style="border: 1px solid ' +
						this.getColorTag(element.심사상태) +
						";color :" +
						this.getColorTag(element.심사상태) +
						'; padding:4px; border-radius: 5px; padding: 1px 5px;margin-right: 5px;">' +
						element.심사상태 +
						"</span>" +
						" " +
						element.상호 +
						" " +
						" " +
						element.신청일자 +
						" " +
						element.신청코드 +
						"</div>";
				}
			});
			this.dataSelectModal = html;
			this.isGridBoxOpened = false;
		},
		gridBoxDisplayExpr() {
			var item = JSON.parse(JSON.stringify(this.gridBoxValue))[0];
			return item && `${item.심사상태} - ${item.상호} - ${item.사업자코드}`;
		},
		handleChange(info: { file: { status: string; name: any }; fileList: any }) {
			if (info.file.status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		dateValue(date: string | number | Date | dayjs.Dayjs | null | undefined) {
			return dayjs(date, this.dateFormat);
		},
		deleteRow(key: string) {
			for (var i = 0; i < this.dataTable.length; i++) {
				if (this.dataTable[i].key == key) {
					this.dataTable.splice(i, 1);
					break;
				}
			}
		},
		formarDate(date: any) {
			return dayjs(date).format('YYYY/MM/DD')
		}
	},
});
</script> 

<style lang="scss" scoped>
// ::v-deep #modal-detail-bf-310 {
.clr {
	label {
		color: red;
	}
}

.clr-text {
	color: red;
}

.clb {
	color: black !important;
}



.ant-select {
	width: 145px;
}


.dx-select-checkbox {
	display: inline-block !important;
}

.noteText p {
	margin-bottom: 1px;
}

.noteImage {
	font-size: 11px;
	width: 100%;
	padding-top: 2px;
}

.ant-card-head-title {
	padding: 0px;
}

.ant-form-item {
	margin-bottom: 4px;
}

.title-number-modal {
	margin-top: 7px;
}

.ant-collapse {
	.ant-collapse-item {
		.ant-collapse-header {
			padding: 7px;
		}
	}
}

.ant-form-item-label {
	text-align: left;
}

.ant-card-extra {
	padding: 0px;
}

.ant-card-head {
	min-height: 30px;
}

.ant-table-thead {
	tr {
		th {
			padding: 7px;
		}
	}
}

.ant-table-tbody {
	tr {
		td {
			padding: 7px;
		}
	}
}

::v-deep .ant-table-tbody>tr>td {
	padding: 5 10px !important
}

::v-deep .ant-table-cell {
	padding: 10px !important;
}

.ant-card {
	height: 45px;
}

::v-deep .dx-toolbar .dx-toolbar-after {
	margin-top: -35px !important;
}

::v-deep .dx-datagrid-headers.dx-datagrid-nowrap {
	margin-top: -35px;
}

::v-deep .dx-texteditor-input {
	text-align: right;
}

#data-grid-demo {
	margin-bottom: 10px
}
</style>