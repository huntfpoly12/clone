<template>
	<div id="components-modal-demo-position">
		<a-modal :visible="modalStatus" title="계약정보관리&심사 " centered okText="저장하고 나가기" cancelText="그냥 나가기"
			@cancel="setModalVisible()" width="1000px">
			<a-collapse v-model:activeKey="activeKey" accordion>
				<a-collapse-panel key="1" header="심사정보">
					<a-form :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-form-item label="승인상태">
							<a-dropdown>
								<div v-html="yourVariable"></div>
								<template #overlay>
									<DxDataGrid width="500px" :data-source="gridDataSource"
										v-model:selected-row-keys="gridBoxValue"
										@selection-changed="onGridSelectionChanged(gridBoxValue)" :show-borders="true"
										key-expr="ID" :columns="gridColumns">
										<DxSelection mode="single" />
										<DxPaging :page-size="5" />
										<DxColumn data-field="신청코드" />
										<DxColumn data-field="심사상태" data-type="date" cell-template="grid-cell" />
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
							<a-typography-title :level="5">C22020312</a-typography-title>
						</a-form-item>
						<a-row>
							<a-col :span="12">
								<a-form-item label="신청코드">
									<a-typography-title :level="5">R22012501</a-typography-title>
								</a-form-item>
							</a-col>
							<a-col :span="12">
								<a-form-item label="신청일자">
									<a-typography-title :level="5">2022-08-25</a-typography-title>
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
					</a-form>
				</a-collapse-panel>
				<a-collapse-panel key="2" header="사업자정보">
					<a-form :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-form-item label="상 호" class="clr">
							<a-input v-model:value="formState.name" />
						</a-form-item>
						<a-form-item label="사업자등록번호" class="clr">
							<a-input v-model:value="formState.name" style="width: 300px" />
						</a-form-item>

						<a-row>
							<a-col :span="12">
								<a-form-item label="사업자유형" class="clr">
									<a-radio-group v-model:value="formState.resource">
										<a-radio value="1" class="clb">법인사업자</a-radio>
										<a-radio value="2" class="clb">개인사업자</a-radio>
									</a-radio-group>
								</a-form-item>
							</a-col>
							<a-col :span="2">
								<a-form-item label="{ $id no }">
									<a-input value="800123-1234567" style="width: 300px" />
								</a-form-item>
							</a-col>
						</a-row>
						<a-form-item label="주소" class="clr">
							<a-row :gutter="[0, 4]">
								<a-col :span="24">
									<a-row>
										<a-col :span="12">
											<a-input v-model:value="formState.name" style="width: 300px" />
										</a-col>
										<a-col :span="12">
											<a-button type="primary">우편번호 검색</a-button>
										</a-col>
									</a-row>
								</a-col>
								<a-col :span="24">
									<a-row>
										<a-input v-model:value="formState.name" />
									</a-row>
								</a-col>
								<a-col :span="24">
									<a-row>
										<a-input v-model:value="formState.name" />
									</a-row>
								</a-col>
							</a-row>
							<a-row> </a-row>
						</a-form-item>
						<a-row :gutter="[16, 16]">
							<a-col :span="18">
								<a-form-item label="연락처" class="clr">
									<a-input v-model:value="formState.desc" />
								</a-form-item>
								<a-form-item label="팩 스">
									<a-input v-model:value="formState.desc" />
								</a-form-item>
							</a-col>
							<imgUpload :title="titleModal" @update-img="getImgUrl" />

						</a-row>
					</a-form>
				</a-collapse-panel>
				<a-collapse-panel key="3" header="대표자정보">
					<a-form :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-form-item has-feedback label="대표자명" class="clr">
							<a-input value="홍길동" autocomplete="off" style="width: 300px" />
						</a-form-item>
						<a-form-item has-feedback label="생년월일" class="clr">
							<a-input value="19620820" autocomplete="off" style="width: 300px" />
						</a-form-item>
						<a-form-item has-feedback label="휴대폰번호" class="clr">
							<a-input-number value="01098765432" style="width: 200px" />
						</a-form-item>
						<a-form-item has-feedback label="이메일" class="clr">
							<a-input value="abc123@mailaddress.com" style="width: 300px" />
						</a-form-item>
					</a-form>
				</a-collapse-panel>
				<a-collapse-panel key="4" header="회계서비스신청">
					<div>
						<a-checkbox v-model:checked="checked">회계서비스 신청합니다.</a-checkbox>
						<div>
							<a-card title="⁙ 운영사업" :style="{padding : '0px'}" :bordered="false" style="width: 100%"
								:headStyle="{ padding: '0px', color: 'red' }">
								<template #extra style="padding: 0px;">
									<a-button type="text" @click="handleCopy">
										<PlusOutlined :style="{ fontSize: '20px', color: '#08c' }" />
									</a-button>
								</template>
							</a-card>
							<a-table :columns="columns" :data-source="dataTable" :pagination="false" :bordered="true">
								<template #headerCell="{ column, index }">
									<template v-if="column.key === '사업명'">
										<span class="clr-text"> 사업명 (중복불가) </span>
									</template>
								</template>
								<template #bodyCell="{ column, record }">
									<template v-if="column.key === '사업명'">
										<a href="">
											{{ record.사업명 }}
										</a>
									</template>
									<template v-else-if="column.key === '사업분류'">
										<span>
											<a-select ref="select" v-model:value="record.사업분류" style="width: 200px">
												<a-select-option value="방문요양">방문요양</a-select-option>
												<a-select-option value="방문간호">방문간호</a-select-option>
												<a-select-option value="방문목욕">방문목욕</a-select-option>
												<a-select-option value="단기보호">단기보호</a-select-option>
												<a-select-option value="복지용구">복지용구</a-select-option>
											</a-select>
										</span>
									</template>
									<template v-else-if="column.key === '서비스시작년월'">
										<span>
											<CustomDatepicker :valueDate="record.서비스시작년월" :className='record.key' />
										</span>
									</template>
									<template v-else-if="column.key === 'action'">
										<span>
											<a-popconfirm title="Are you sure delete this row?" ok-text="Yes"
												cancel-text="No">
												<a-button type="text" @click="deleteRow(record.key)">
													<minus-circle-outlined />
												</a-button>
											</a-popconfirm>
										</span>
									</template>
								</template>
							</a-table>

							<a-form-item label="장기요양기관등록번호" class="title-number-modal clr">
								<a-input value="01234567898" style="width: 300px" />
							</a-form-item>
							<imgUpload :title="titleModal" @update-img="getImgUrl" />
							<div>
								<a-row>
									<a-col :span="12">
										<p>부가서비스</p>
									</a-col>
									<a-col :span="12">
										<a-checkbox v-model:checked="checked">회계입력대행서비스</a-checkbox>
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
							<a-form :label-col="labelCol" :wrapper-col="wrapperCol">
								<a-form-item label="서비스 시작년월" class="clr">
									<CustomDatepicker width="30%" valueDate="2022/08/25" className="0" />
								</a-form-item>
								<a-form-item label="직 원 수" class="clr">
									<a-input-number value="10" style="width: 100px" />
								</a-form-item>
								<a-form-item label="부가서비스">
									<a-checkbox v-model:checked="checked">4대보험신고서비스</a-checkbox>
								</a-form-item>
							</a-form>
						</div>
					</div>
				</a-collapse-panel>
				<a-collapse-panel key="6" header="CMS (자동이체출금) 계좌 정보 입력">
					<a-form :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-form-item label="출금은행" class="clr">
							<a-select ref="select" v-model:value="은행선택" style="width: 200px">
								<a-select-option value="은행선택">은행선택</a-select-option>
								<a-select-option value="국민은행">국민은행</a-select-option>
								<a-select-option value="신한은행">신한은행</a-select-option>
								<a-select-option value="우리은행">우리은행</a-select-option>
								<a-select-option value="기업은행">기업은행</a-select-option>
								<a-select-option value="카카오뱅크">카카오뱅크</a-select-option>
							</a-select>
						</a-form-item>
						<a-form-item label="출금계좌번호" class="clr">
							<a-input value="100100056489011" />
						</a-form-item>
						<a-form-item label="예금주명" class="clr">
							<a-input value="주식회사 타운소프트비나" />
						</a-form-item>
						<a-form-item label="사업자(주민)등록번호:" class="d-flex align-items-start clr">
							<a-input value="100100056489011" />
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
							<a-radio-group v-model:value="value">
								<a-radio class="clb" :style="radioStyle" :value="1">매월 5일</a-radio>
								<a-radio class="clb" :style="radioStyle" :value="2">매월 12일</a-radio>
								<a-radio class="clb" :style="radioStyle" :value="3">매월 19일</a-radio>
							</a-radio-group>
						</a-form-item>
					</a-form>
				</a-collapse-panel>
				<a-collapse-panel key="7" header="기타">
					<a-form :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-form-item label="영업관리담당">
							<a-select ref="select" v-model:value="은행선택" style="width: 200px">
								<a-select-option value="영업자선택">영업자선택</a-select-option>
								<a-select-option value="A_대리점">A 대리점</a-select-option>
								<a-select-option value="B_대리점">B 대리점</a-select-option>
								<a-select-option value="C 영업사원">C 영업사원</a-select-option>
								<a-select-option value="D 영업사원">D 영업사원</a-select-option>
								<a-select-option value="E 본사영업사원">E 본사영업사원</a-select-option>
							</a-select>
						</a-form-item>
						<a-form-item label="전달사항">
							<a-textarea v-model="value" placeholder="전달사항입력" />
						</a-form-item>
					</a-form>
				</a-collapse-panel>
			</a-collapse>
		</a-modal>
	</div>
</template>
<script lang="ts">
import CustomDatepicker from "../../../../../components/CustomDatepicker.vue";
import { ref, defineComponent } from "vue";
import DxDropDownBox from "devextreme-vue/drop-down-box";
import {
	DxDataGrid,
	DxColumn,
	DxPaging,
	DxSelection,
} from "devextreme-vue/data-grid";
import { employees } from "../data.js";
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
	created() {
		console.log(this.gridBoxValue);
	},
	props: ["modalStatus", "data"],
	data() {
		return {
			activeKey: 1,
			text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
			formState: {
				name: "",
				delivery: false,
				type: [],
				resource: "",
				desc: "",
			},
			은행선택: '은행선택',
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
			value: ref<number>(1),
			titleModal: "사업자등록증",
			dataSelectModal:
				'<button style="width:100%;height : 36px;text-align: left;background: white; border: 1px solid #d9d9d9; padding: 4px 6px; ">Select a value...</button>',
		};
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
		imgUpload
	},
	computed: {
		yourVariable() {
			return this.dataSelectModal;
		},
	},
	methods: {
		handleCopy() {
			this.keyNumber++;
			let dataDef = {
				key: this.keyNumber.toString(),
				사업명: "가나다라마바 사업",
				사업분류: "방문간호",
				서비스시작년월: "2015/01/01",
				정원수: 10,
			};
			this.dataTable.push(dataDef);
		},
		setModalVisible() {
			this.$emit("closePopup", false);
		},
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
	},
});
</script> 

<style lang="scss">
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
</style>