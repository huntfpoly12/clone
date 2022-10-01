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
									<a-dropdown :trigger="['click']">
										<div v-html="dataSelectModal" style="width: 200px"></div>
										<template #overlay>
											<a-table :columns="[{name: 'Name',dataIndex: 'name',key: 'name',},{title: 'date',dataIndex: 'date',key: 'date'},]" :data-source="[{ name: 'John Brown',date: '32'},{ name: 'John Brown',date: '32'}]" :pagination="false" bordered :showHeader="false">
												<template #bodyCell="{ column, record }">
													<template v-if="column.key === 'name'">
														<a>
														{{ record.name }}
														</a>
													</template>
													<template v-if="column.key === 'date'">
														<a>
														{{ record.date }}
														</a>
													</template>
												</template>
											</a-table>
											<!-- <a-menu @click="onClick">
												<a-menu-item key="1">
													<div style="display: flex;padding: 6px;">
														<div
															style="width: 60px; padding-right: 6px; margin-right: 0px;">
															<span>
																<a-tag color="green">승인</a-tag>
															</span>
														</div>
														<span
															style="border: 1px solid  padding:4px; border-radius: 5px; padding: 1px 5px;margin-right: 5px;">2022-08-25</span>
													</div>
												</a-menu-item>
												<a-menu-item key="2">
													<div style="display: flex;padding: 6px;">
														<div
															style="width: 60px; padding-right: 6px; margin-right: 0px;">
															<span>
																<a-tag color="red">신청</a-tag>
															</span>
														</div>

														<span
															style="border: 1px solid  padding:4px; border-radius: 5px; padding: 1px 5px;margin-right: 5px;">2022-08-25</span>
													</div>
												</a-menu-item>
												<a-menu-item key="3">
													<div style="display: flex;padding: 6px;">
														<div
															style="width: 60px; padding-right: 6px; margin-right: 0px;">
															<span>
																<a-tag color="blue">심사중</a-tag>
															</span>
														</div>

														<span
															style="border: 1px solid  padding:4px; border-radius: 5px; padding: 1px 5px;margin-right: 5px;">2022-08-25</span>
													</div>
												</a-menu-item>
												<a-menu-item key="3">
													<div style="display: flex;padding: 6px;">
														<div
															style="width: 60px; padding-right: 6px; margin-right: 0px;">
															<span>
																<a-tag color="grey">반려</a-tag>
															</span>
														</div>
														<span
															style="border: 1px solid  padding:4px; border-radius: 5px; padding: 1px 5px;margin-right: 5px;">2022-08-25</span>
													</div>
												</a-menu-item>
											</a-menu> -->
										</template>
									</a-dropdown>
								</a-form-item>

								<a-form-item label="사업자코드">
									<a-typography-title :level="5">
										{{formState.companyBizNumber}}
									</a-typography-title>
								</a-form-item>
								<a-row>
									<a-col :span="12">
										<a-form-item label="신청코드">
											<a-typography-title :level="5">{{formState.code}}
											</a-typography-title>
										</a-form-item>
									</a-col>
									<a-col :span="12">
										<a-form-item label="신청일자">
											<a-typography-title :level="5">
												{{formarDate(formState.createdAt)}}
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
									<a-input v-model:value="formState.companyName" />
								</a-form-item>
								<a-form-item label="사업자등록번호" class="clr">
									<a-input style="width: 300px" :value="formState.companyBizNumber" />
								</a-form-item>

								<a-row>
									<a-col :span="12">
										<a-form-item label="사업자유형" class="clr">
											<a-radio-group v-model:value="formState.companyBizType">
												<a-radio :value="1" class="clb" checked>법인사업자</a-radio>
												<a-radio :value="2" class="clb">개인사업자</a-radio>
											</a-radio-group>
										</a-form-item>
									</a-col>
									<a-col :span="2">
										<a-form-item :label="changeTypeCompany(formState.companyBizType)">
											<a-input placeholder="800123-1234567" style="width: 300px"
												v-model:value="formState.companyResidentId" />
										</a-form-item>
									</a-col>
								</a-row>
								<a-form-item label="주소" class="clr">
									<a-row :gutter="[0, 4]">
										<a-col :span="24">
											<a-row>
												<a-col :span="12">
													<a-input style="width: 300px"
														v-model:value="formState.companyZipcode" />
												</a-col>
												<a-col :span="12">
													<a-button type="primary">우편번호 검색</a-button>
												</a-col>
											</a-row>
										</a-col>
										<a-col :span="24">
											<a-row>
												<a-input v-model:value="formState.companyRoadAddress" />
											</a-row>
										</a-col>
										<a-col :span="24">
											<a-row>
												<a-input v-model:value="formState.companyAddressExtend" />
											</a-row>
										</a-col>
									</a-row>
									<a-row> </a-row>
								</a-form-item>
								<a-row :gutter="[16, 16]">
									<a-col :span="18">
										<a-form-item label="연락처" class="clr">
											<a-input v-model:value="formState.companyPhone" />
										</a-form-item>
										<a-form-item label="팩 스">
											<a-input v-model:value="formState.companyFax" />
										</a-form-item>
									</a-col>
									<imgUpload :title="titleModal" @update-img="getImgUrl" />
								</a-row>

							</a-collapse-panel>
							<a-collapse-panel key="3" header="대표자정보">
								<a-form-item has-feedback label="대표자명" class="clr">
									<a-input placeholder="홍길동" autocomplete="off" style="width: 300px"
										v-model:value="formState.presidentContentName" />
								</a-form-item>
								<a-form-item has-feedback label="생년월일" class="clr">
									<a-input placeholder="19620820" autocomplete="off" style="width: 300px"
										v-model:value="formState.presidentBirthday" />
								</a-form-item>
								<a-form-item has-feedback label="휴대폰번호" class="clr">
									<a-input placeholder="01098765432" style="width: 200px"
										v-model:value="formState.presidentPhone" />
								</a-form-item>

								<a-form-item has-feedback label="이메일" class="clr" :name="['user', 'email']"
									:rules="[{ type: 'email' }]">
									<a-input style="width: 200px" v-model:value="formState.presidentEmail" />
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
												:data-source="formState.accountingfacilityBusinesses"
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
													<a-checkbox v-model:checked="formState.accountingServiceTypes[0]">
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
												<CustomDatepicker :valueDate="formState.withholdingYearMonth"
													className="0" />
											</div>
										</a-form-item>
										<a-form-item label="직 원 수" class="clr">
											<a-input-number style="width: 100px" min="0"
												v-model:value="formState.withholdingCapacity" />
										</a-form-item>
										<a-form-item label="부가서비스">
											<a-checkbox v-model:checked="formState.withholdingServiceTypes[0]">
												4대보험신고서비스</a-checkbox>
										</a-form-item>

									</div>
								</div>
							</a-collapse-panel>
							<a-collapse-panel key="6" header="CMS (자동이체출금) 계좌 정보 입력">
								<a-form-item label="출금은행" class="clr">
									<selectBank :selectValue="formState.cmsBankType" />
								</a-form-item>
								<a-form-item label="출금계좌번호" class="clr">
									<a-input placeholder="100100056489011" v-model:value="formState.accountNumber" />
								</a-form-item>
								<a-form-item label="예금주명" class="clr">
									<a-input placeholder="주식회사 타운소프트비나" v-model:value="formState.ownerName" />
								</a-form-item>
								<a-form-item label="사업자(주민)등록번호:" class="d-flex align-items-start clr">
									<a-input placeholder="100100056489011" v-model:value="formState.ownerBizNumber" />
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
									<a-radio-group v-model:value="formState.withdrawDay">
										<a-radio class="clb" :style="radioStyle" value="매월 5일">매월 5일</a-radio>
										<a-radio class="clb" :style="radioStyle" value="매월 12일">매월 12일</a-radio>
										<a-radio class="clb" :style="radioStyle" value="매월 19일">매월 19일</a-radio>
									</a-radio-group>
								</a-form-item>

							</a-collapse-panel>
							<a-collapse-panel key="7" header="기타">
								<a-form-item label="영업관리담당">
									<a-select ref="select" v-model:value="formState.extraSalesRepresentativeId"
										style="width: 200px">
										<a-select-option :value="1">A 대리점</a-select-option>
										<a-select-option :value="2">농협</a-select-option>
										<a-select-option :value="3">C 영업사원</a-select-option>
										<a-select-option :value="4">D 영업사원</a-select-option>
										<a-select-option :value="5">E 본사영업사원</a-select-option>
									</a-select>
								</a-form-item>
								<a-form-item label="전달사항">
									<a-textarea v-model:value="formState.extraComment" placeholder="전달사항입력" />
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
import type { MenuProps } from 'ant-design-vue';
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

			은행선택: '은행선택',
			영업관리담당: '은행선택',
			gridDataSource: employees,

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

		const dataSelectModal = ref('<button style="width:100%;height : 36px;text-align: left;background: white; border: 1px solid #d9d9d9; padding: 4px 6px; ">Select a value...x</button>');
		const formState = reactive({
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
			companyAddressDetailBuildingName: "",
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

			presidentContentName: "",
			presidentBirthday: "",
			presidentPhone: "",
			presidentEmail: "",
			accountingfacilityBusinesses: [],
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

		watch(result, value => {
			if (value && value.getSubscriptionRequest) {

				formState.status = value.getSubscriptionRequest.companyBizNumber;
				formState.code = value.getSubscriptionRequest.code;
				formState.companyName = value.getSubscriptionRequest.companyBizNumber;
				formState.companyBizNumber = value.getSubscriptionRequest.companyBizNumber;
				formState.companyAddress = value.getSubscriptionRequest.companyAddress;
				formState.presidentName = value.getSubscriptionRequest.presidentName;

				formState.simpleWithholdingInfoName = value.getSubscriptionRequest.simpleAccountingInfos.name;
				formState.simpleWithholdingInfoYearMonth = value.getSubscriptionRequest.simpleAccountingInfos.startYearMonth;

				formState.processedAt = value.getSubscriptionRequest.processedAt;
				formState.approvedAt = value.getSubscriptionRequest.approvedAt;
				formState.rejectedAt = value.getSubscriptionRequest.rejectedAt;

				formState.agreementsTerms = value.getSubscriptionRequest.content.agreements.terms;
				formState.agreementsPersonalInfo = value.getSubscriptionRequest.content.agreements.personalInfo;
				formState.agreementsAccountingService = value.getSubscriptionRequest.content.agreements.accountingService;
				formState.agreementsWithholdingService = value.getSubscriptionRequest.content.agreements.withholdingService;

				formState.companyZipcode = value.getSubscriptionRequest.content.company.zipcode;
				formState.companyRoadAddress = value.getSubscriptionRequest.content.company.roadAddress;
				formState.companyJibunAddress = value.getSubscriptionRequest.content.company.jibunAddress;

				formState.companyAddressExtend = value.getSubscriptionRequest.content.company.addressExtend;
				formState.companyAddressDetailBcode = value.getSubscriptionRequest.content.company.addressDetail.bcode;
				formState.companyAddressDetailBname = value.getSubscriptionRequest.content.company.addressDetail.bname;
				formState.companyAddressDetailBuildingCode = value.getSubscriptionRequest.content.company.addressDetail.buildingCode;
				formState.companyAddressDetailBuildingName = value.getSubscriptionRequest.content.company.addressDetail.buildingName;
				formState.companyAddressDetailRoadname = value.getSubscriptionRequest.content.company.addressDetail.roadname;
				formState.companyAddressDetailRoadnameCode = value.getSubscriptionRequest.content.company.addressDetail.roadnameCode;
				formState.companyAddressDetailSido = value.getSubscriptionRequest.content.company.addressDetail.sido;
				formState.companyAddressDetailSigungu = value.getSubscriptionRequest.content.company.addressDetail.sigungu;
				formState.companyAddressDetailSigunguCode = value.getSubscriptionRequest.content.company.addressDetail.sigunguCode;
				formState.companyAddressDetailZonecode = value.getSubscriptionRequest.content.company.addressDetail.zonecode;

				formState.companyPhone = value.getSubscriptionRequest.content.company.phone;
				formState.companyFax = value.getSubscriptionRequest.content.company.fax;
				formState.companyLicenseFileStorageId = value.getSubscriptionRequest.content.company.licenseFileStorageId;
				formState.companyBizType = value.getSubscriptionRequest.content.company.bizType;
				formState.companyResidentId = value.getSubscriptionRequest.content.company.residentId;
				formState.companyLicense = value.getSubscriptionRequest.content.company.license;

				formState.presidentContentName = value.getSubscriptionRequest.content.president.name;
				formState.presidentBirthday = value.getSubscriptionRequest.content.president.birthday;
				formState.presidentPhone = value.getSubscriptionRequest.content.president.mobilePhone;
				formState.presidentEmail = value.getSubscriptionRequest.content.president.email;

				formState.accountingfacilityBusinesses = value.getSubscriptionRequest.content.accounting.facilityBusinesses;
				formState.accountingServiceTypes = value.getSubscriptionRequest.content.accounting.accountingServiceTypes;

				formState.withholdingYearMonth = value.getSubscriptionRequest.content.withholding.startYearMonth;
				formState.withholdingCapacity = value.getSubscriptionRequest.content.withholding.capacity;
				formState.withholdingServiceTypes = value.getSubscriptionRequest.content.withholding.withholdingServiceTypes;

				formState.cmsBankType = value.getSubscriptionRequest.content.cmsBank.bankType;
				formState.accountNumber = value.getSubscriptionRequest.content.cmsBank.accountNumber;
				formState.ownerName = value.getSubscriptionRequest.content.cmsBank.ownerName;
				formState.ownerBizNumber = value.getSubscriptionRequest.content.cmsBank.ownerBizNumber;
				formState.withdrawDay = value.getSubscriptionRequest.content.cmsBank.withdrawDay;

				formState.extraSalesRepresentativeId = value.getSubscriptionRequest.content.extra.salesRepresentativeId;
				formState.extraComment = value.getSubscriptionRequest.content.extra.comment;

				formState.compactSalesRepresentativeID = value.getSubscriptionRequest.compactSalesRepresentative.id;
				formState.compactSalesRepresentativeCode = value.getSubscriptionRequest.compactSalesRepresentative.code;
				formState.compactSalesRepresentativeName = value.getSubscriptionRequest.compactSalesRepresentative.name;
				formState.compactSalesRepresentativeActive = value.getSubscriptionRequest.compactSalesRepresentative.active;

				formState.memo = value.getSubscriptionRequest.memo;
				formState.createdAt = value.getSubscriptionRequest.createdAt;
				formState.createdBy = value.getSubscriptionRequest.createdBy;
				formState.updatedBy = value.getSubscriptionRequest.updatedBy;
				formState.ip = value.getSubscriptionRequest.ip;
				formState.active = value.getSubscriptionRequest.active;

			}
			console.log(value, 'gjgjhgj')
		})

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

		const onClick: MenuProps['onClick'] = ({  key }) => {
			console.log( key);
			switch (key) {
				case '1':
					dataSelectModal.value = 	'<div style="display: flex;padding: 6px;"><divstyle="width: 60px; padding-right: 6px; margin-right: 0px;"><span><a-tag color="green">승인</a-tag></span></div><span style="border: 1px solid  padding:4px; border-radius: 5px; padding: 1px 5px;margin-right: 5px;">2022-08-25</span></div>';
					break;
				case '2':
					dataSelectModal.value = 	'<div style="display: flex;padding: 6px;"><divstyle="width: 60px; padding-right: 6px; margin-right: 0px;"><span><a-tag color="green">승인</a-tag></span></div><span style="border: 1px solid  padding:4px; border-radius: 5px; padding: 1px 5px;margin-right: 5px;">2022-08-25</span></div>';
					break;
				case '3':
					dataSelectModal.value = 	'<div style="display: flex;padding: 6px;"><divstyle="width: 60px; padding-right: 6px; margin-right: 0px;"><span><a-tag color="green">승인</a-tag></span></div><span style="border: 1px solid  padding:4px; border-radius: 5px; padding: 1px 5px;margin-right: 5px;">2022-08-25</span></div>';
					break;
				case '4':
					dataSelectModal.value = 	'<div style="display: flex;padding: 6px;"><divstyle="width: 60px; padding-right: 6px; margin-right: 0px;"><span><a-tag color="green">승인</a-tag></span></div><span style="border: 1px solid  padding:4px; border-radius: 5px; padding: 1px 5px;margin-right: 5px;">2022-08-25</span></div>';
					break;
				default:
					break;
			}

		};
		return {
			formState,
			onFinish,
			layout,
			validateMessages,
			setModalVisible,
			changeTypeCompany,
			result,
			error,
			loading,
			onClick,
			dataSelectModal
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
			let html = value.getSubscriptionRequest.companyBizNumber;
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