<template>
	<a-row>
		<a-col span="16" class="data-table">
			<a-spin :spinning="loadingTable" size="large">
				<DxDataGrid noDataText="내역이 없습니다" id="gridContainer" :show-row-lines="true" :hoverStateEnabled="true"
					:data-source="dataSource" :show-borders="true" key-expr="messageId"
					:allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true"
					ref="gridRef" :focused-row-enabled="true" @focused-row-changing="onFocusedRowChanging"
					v-model:focused-row-key="focusedRowKey">
					<DxScrolling mode="standard" show-scrollbar="always" />
					<DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
					<DxPaging :enabled="false" />
					<DxExport :enabled="true" />
					<DxToolbar>
						<DxItem template="search-template" location="before" />
						<DxItem name="searchPanel" />
						<DxItem name="exportButton" css-class="cell-button-export" />
						<!-- <DxItem location="after" template="button-history" css-class="cell-button-add" /> -->
						<DxItem location="after" template="button-template" css-class="cell-button-add" />
					</DxToolbar>
					<template #search-template>
						<div class="d-flex-center search-template">
							<a-form-item label="작성기간 (최대 1년)" :label-col="labelCol">
								<range-date-time-box v-model:valueDate="rangeDate" width="250px" maxRange
									:multi-calendars="true" />
							</a-form-item>
							<!-- <div class="d-flex-center"> -->
							<info-tool-tip>문의글 기준</info-tool-tip>
							<!-- </div> -->
						</div>
					</template>
					<template #button-template>
						<div class="d-flex-center">
							<!-- <DxButton>
								<HistoryOutlined style="font-size: 18px;" @click="openHistory" />
							</DxButton> -->
							<a-tooltip title="문의 신규 등록">
								<div class="mx-5">
									<DxButton icon="plus" :disabled="false" @click="addRow" />
								</div>
							</a-tooltip>
						</div>
					</template>

					<DxColumn caption="구분" cell-template="expresstionType" width="90" css-class="cell-center"
						data-field="expresstionType" />
					<template #expresstionType="{ data }">
						<ExpressionType :valueSelect="data.data.expresstionType" :isSelect="false" />
					</template>

					<DxColumn caption="분류" cell-template="" data-field="classification" />

					<DxColumn caption="문의내용" cell-template="" data-field="content" />

					<DxColumn caption="작성자" cell-template="" data-field="writerCompactUser.name" />

					<DxColumn caption="작성일시" cell-template="" width="140" data-field="writedAt" format="yyyy-MM-dd HH:mm:ss"
						data-type="date" />

					<DxColumn caption="답변내용" cell-template="" data-field="answer" />

					<DxColumn caption="답변일시" cell-template="" width="140" data-field="answeredAt"
						format="yyyy-MM-dd HH:mm:ss" data-type="date" />
				</DxDataGrid>
			</a-spin>
		</a-col>
		<a-col span="8" class="custom-layout">
			<div>
				<div style="text-align: end">
					<DxButton @click="reloadData">
						<ReloadOutlined style="font-size: 14px;" />
					</DxButton>
				</div>
				<a-spin :spinning="loadingWorkInquiryMessage" size="large">
					<div class="wrapper-content">
						<div v-if="dataDetail" class="question-container">
							<div v-if="dataDetail.expresstionType === 2">
								<div class="d-flex-center gap-10">
									<ExpressionType :valueSelect="dataDetail.expresstionType" :isSelect="false" />
									<div class="font-bold"
										:class="dataDetail.writerCompactUser.type == 'm' ? 'blue' : 'black'">
										{{ dataDetail.writerCompactUser.name }}</div>
									<div class="time">
										{{ dayjs(dataDetail.writedAt > dataDetail.updatedAt ?
											dataDetail.writedAt : dataDetail.updatedAt).format('YYYY-MM-DD hh:mm:ss') }}
									</div>
									<div class="classification">{{ dataDetail.classification }}</div>
									<div class="d-flex-center">
										<checkbox-basic :valueCheckbox="dataDetail.secret" disabled="true" />
										<span>비밀글</span>
										<info-tool-tip>선택시 작성글과 답글은 작성자만 조회할 수 있습니다</info-tool-tip>
									</div>
									<div class="time" v-if="dataDetail.updatedAt > dataDetail.writedAt">
										Edited
									</div>
								</div>
								<div>{{ dataDetail.content }}</div>
								<div v-if="dataDetail?.fileStorages && dataDetail?.fileStorages.length" class="files">
									<div class="images">
										<img v-for="(file, indexFile) in dataDetail?.fileStorages.filter((item: any) => isImgLink(item.url))"
											:key="indexFile" class="image" :src="file.url" alt=""
											@click="previewImage(dataDetail.fileStorages.filter((item: any) => isImgLink(item.url)), indexFile)">
									</div>
									<div v-for="(file, indexFile) in dataDetail?.fileStorages.filter((item: any) => !isImgLink(item.url))"
										:key="indexFile" class="d-flex-center mb-10 file-texts"
										@click="openLinkDownFile(file.url)">
										<FileTextOutlined class="mr-10 fz-20" />
										<div>{{ file.name }}</div>
									</div>
								</div>
							</div>
							<div v-else-if="dataDetail.expresstionType === 3">
								<div class="d-flex-center gap-10">
									<ExpressionType :valueSelect="dataDetail.expresstionType" :isSelect="false" />
									<div class="font-bold"
										:class="dataDetail.answerCompactUser.type == 'm' ? 'blue' : 'black'">
										{{ dataDetail.answerCompactUser.name }}</div>
									<div class="time">
										{{ dayjs(dataDetail.answeredAt > dataDetail.updatedAt ?
											dataDetail.answeredAt : dataDetail.updatedAt).format('YYYY-MM-DD hh:mm:ss') }}
									</div>
									<div class="time" v-if="dataDetail.updatedAt > dataDetail.answeredAt">
										Edited
									</div>
								</div>
								<div>{{ dataDetail.answer }}</div>
								<div v-if="dataDetail?.answerFileStorages && dataDetail?.answerFileStorages.length"
									class="files">
									<div class="images">
										<img v-for="(file, indexFile) in dataDetail?.answerFileStorages.filter((item: any) => isImgLink(item.url))"
											:key="indexFile" class="image" :src="file.url" alt=""
											@click="previewImage(dataDetail.answerFileStorages.filter((item: any) => isImgLink(item.url)), indexFile)">
									</div>
									<div v-for="(file, indexFile) in dataDetail?.answerFileStorages.filter((item: any) => !isImgLink(item.url))"
										:key="indexFile" class="d-flex-center mb-10 file-texts"
										@click="openLinkDownFile(file.url)">
										<FileTextOutlined class="mr-10 fz-20" />
										<div>{{ file.name }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</a-spin>
				<div class="form-create-bottom">
					<div class="d-flex-center mb-10">
						<ExpressionType :valueSelect="2" disabled />
						<span class="mx-10">분류: </span>
						<ClassificationSelect v-model:valueSelect="rowEdit.classification" :disabled="disabledFormAdd" />
						<div class="d-flex-center ml-10">
							<checkbox-basic v-model:valueCheckbox="rowEdit.secret" :disabled="disabledFormAdd" />
							<span>비밀글</span>
							<info-tool-tip>선택시 작성글과 답글은 작성자만 조회할 수 있습니다</info-tool-tip>
						</div>
					</div>
					<InputChat ref="inputChatRef" v-model:content="rowEdit.content" v-model:files="filesUpload"
						placeholder="안녕하세요? 테스트 입력입니다. 수고하세요" :disabled="isLoadingUpload || disabledFormAdd"
						@submitChat="submitChat" @cancel="cancelEdit" />
					<ModalPreviewListImage :isModalPreview="isModalPreview" @cancel="isModalPreview = false"
						:listImage="listImagePreview" />
				</div>
			</div>
		</a-col>
	</a-row>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import {
	DxDataGrid,
	DxColumn,
	DxToolbar,
	DxItem,
	DxSearchPanel,
	DxExport,
	DxScrolling,
	DxPaging,
} from "devextreme-vue/data-grid";
import {
	EditOutlined,
	DeleteOutlined,
	SaveOutlined,
	ReloadOutlined,
	FileTextOutlined,
} from "@ant-design/icons-vue";
import dayjs from 'dayjs';
import DxButton from "devextreme-vue/button";
import DataSource from "devextreme/data/data_source";
import { Message } from "@/configs/enum";
import InputChat from "./InputChat.vue";
import { getJwtObject } from "@bankda/jangbuda-common";
import StatusChat from "@/views/AC/AC1/AC130/components/StatusChat.vue";
import MarkdownCustom from "@/views/AC/AC1/AC130/components/MarkdownCustom.vue";
import queries from "@/graphql/queries/CommunicationBoard/User/index";
import mutations from "@/graphql/mutations/CommunicationBoard/User/index";
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import { companyId } from "@/helpers/commonFunction";
import ModalPreviewListImage from "@/views/AC/AC1/AC130/components/ModalPreviewListImage.vue";
export default defineComponent({
	components: {
		DxDataGrid,
		DxColumn,
		EditOutlined,
		DxToolbar,
		DxItem,
		DxExport,
		DxSearchPanel,
		DeleteOutlined,
		DxButton,
		SaveOutlined,
		DxScrolling,
		DxPaging,
		InputChat,
		StatusChat,
		MarkdownCustom,
		ReloadOutlined,
		ModalPreviewListImage,
		FileTextOutlined,
	},
	props: {
		onSearch: Number,
	},
	setup(props) {
		// config grid
		const store = useStore();
		const move_column = computed(() => store.state.settings.move_column);
		const colomn_resize = computed(() => store.state.settings.colomn_resize);
		const dataSource = ref([])
		const rangeDate = ref([parseInt(dayjs().subtract(1, 'year').format("YYYYMMDD")), parseInt(dayjs().format("YYYYMMDD"))])
		const dataDetail = ref<any>(null)
		const filesUpload = ref([])
		const disabledFormAdd = ref(true)
		const isLoadingUpload = ref(false)
		const isModalPreview = ref(false)
		const token = ref(sessionStorage.getItem("token"))
		let jwtObject = getJwtObject(token.value!);
		const userId = jwtObject.userId

		const listImagePreview = ref({
			index: 0,
			files: [],
		})
		const inputChatRef = ref()
		const rowEdit = reactive({
			id: 0,
			content: '',
			secret: false,
			classification: '일반',
		})
		const focusedRowKey = ref(null);
		// const listChat = ref(JSON.parse(localStorage.getItem("listChat") ?? '[]'))
		// dataDetail.value = getFakeData()
		const trigger = ref<boolean>(true)
		const triggerWorkInquiryMessage = ref<boolean>(false)
		const originData = {
			companyId: companyId,
			filter: {
				startWriteDate: computed(() => rangeDate.value[0]),
				finishWriteDate: computed(() => rangeDate.value[1]),
			},
			currentUserId: userId,
		}
		const originDataDetail = {
			companyId: companyId,
			messageId: null,
			currentUserId: userId,
		}
		// ================GRAPQL==============================================
		// api table
		const { loading: loadingTable, onResult: resWorkInquiryMessages, onError
		} = useQuery(queries.searchWorkInquiryMessages, originData, () => ({
			enabled: trigger.value,
			fetchPolicy: "no-cache",
		}));
		onError((error) => {
			trigger.value = false;
			focusedRowKey.value = null;
			dataSource.value = [];
			dataDetail.value = null
			//notification('error', error.message)
		});
		resWorkInquiryMessages((value) => {
			trigger.value = false;
			let data = value.data.searchWorkInquiryMessages;
			if (data.length) {
				dataSource.value = data;
				focusedRowKey.value = data[0].messageId;
				originDataDetail.messageId = data[0].messageId;
				triggerWorkInquiryMessage.value = true;
			} else {
				focusedRowKey.value = null;
				dataSource.value = [];
				dataDetail.value = null
			}
		});

		// api detail
		const { loading: loadingWorkInquiryMessage, onResult: resWorkInquiryMessage, onError: errorWorkInquiryMessage
		} = useQuery(queries.getWorkInquiryMessage, originDataDetail, () => ({
			enabled: triggerWorkInquiryMessage.value,
			fetchPolicy: "no-cache",
		}));
		errorWorkInquiryMessage((error) => {
			triggerWorkInquiryMessage.value = false;
			//notification('error', error.message)
		});
		resWorkInquiryMessage((value) => {
			triggerWorkInquiryMessage.value = false;
			dataDetail.value = value.data.getWorkInquiryMessage;
		});

		// api create
		const {
			mutate: actionCreate,
			onError: errorCreate,
			onDone: onDoneCreate,
		} = useMutation(mutations.createInquiryMessage);
		errorCreate((e) => {
			//notification('error', e.message)
		});
		onDoneCreate((res) => {
			console.log('123');
			
			resetForm()
			trigger.value = true;
			notification("success", Message.getMessage("COMMON", "106").message);
		});


		// ================FUNCTION============================================
		const addRow = () => {
			disabledFormAdd.value = false;
		}

		const onFocusedRowChanging = (e: any) => {
			originDataDetail.messageId = e.rows[e.newRowIndex]?.data.messageId
			triggerWorkInquiryMessage.value = true;
		};

		const submitChat = () => {
			actionCreate({
				companyId: companyId,
				input: {
					classification: rowEdit.classification,
					secret: rowEdit.secret,
					content: !!rowEdit.content.trim() ? rowEdit.content.trim() : null,
					fileStorageIds: filesUpload.value.map((file: any) => parseInt(file.id))
				}
			})
		}
		const cancelEdit = () => {
			resetForm()
		}
		const previewImage = (files: any, index: number) => {
			listImagePreview.value.index = index
			listImagePreview.value.files = files.map((file: any) => file.url)
			isModalPreview.value = true
		}
		const isImgLink = (url: any) => {
			if (typeof url !== 'string') return false;
			return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|webp)(\?(.*))?$/gmi) !== null);
		}
		const resetForm = () => {
			console.log('hihihihi');
			
			rowEdit.content = ''
			rowEdit.secret = false
			rowEdit.classification = '일반'
			disabledFormAdd.value = true;
			filesUpload.value = []
		}

		// const handleDeleteQA = (row: any) => {
		// 	deletePopup({
		// 		callback: () => {
		// 			const result = listChat.value.filter((item: any) => item.id !== row.id)
		// 			localStorage.setItem("listChat", JSON.stringify(result))
		// 			listChat.value = result
		// 		},
		// 		message: Message.getCommonMessage("303").message,
		// 		cancelText: Message.getCommonMessage("303").no,
		// 		okText: Message.getCommonMessage("303").yes,
		// 	})
		// }
		// const handleEditQA = (row: any) => {
		// 	rowEdit.content = row.content
		// 	rowEdit.isEdit = true
		// 	rowEdit.id = row.id
		// }

		const openLinkDownFile = (link: string) => {
			window.open(link, '_blank')
		}
		const reloadData = () => {
			triggerWorkInquiryMessage.value = true;
		}
		// ================WATCHING============================================
		watch(() => props.onSearch, (newValue, old) => {
			trigger.value = true;
		});

		return {
			move_column,
			colomn_resize,
			labelCol: { style: { width: "150px" } },
			dataSource, dataDetail,
			rangeDate,
			addRow,
			reloadData,
			onFocusedRowChanging, focusedRowKey,
			dayjs,
			rowEdit, loadingTable, loadingWorkInquiryMessage,
			filesUpload,
			listImagePreview,
			disabledFormAdd, isLoadingUpload, cancelEdit, submitChat, isModalPreview,
			previewImage, isImgLink,
			// userId,
			// listChat,
			//  handleDeleteQA,
			//  handleEditQA, 
			openLinkDownFile,
			inputChatRef,
		};
	},
});
</script>
<style scoped lang="scss" src="../style/style.scss"></style>
