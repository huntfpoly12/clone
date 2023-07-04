<template>
	<a-row>
		<a-col span="16" class="data-table">
			<a-spin :spinning="false" size="large">
				<DxDataGrid noDataText="내역이 없습니다" id="gridContainer" :show-row-lines="true" :hoverStateEnabled="true"
					:data-source="dataSource" :show-borders="true" key-expr="residentIdHide"
					:allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true"
					ref="gridRef" :focused-row-enabled="true">
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

							<div class="d-flex-center">
								<info-tool-tip>문의글 기준</info-tool-tip>
							</div>
						</div>
					</template>
					<template #button-template>
						<div class="d-flex-center">
							<DxButton>
								<HistoryOutlined style="font-size: 18px;" @click="openHistory" />
							</DxButton>
							<a-tooltip title="문의 신규 등록">
								<div class="mx-5">
									<DxButton icon="plus" :disabled="false" @click="addRow" />
								</div>
							</a-tooltip>
						</div>
					</template>

					<DxColumn caption="구분" cell-template="" data-field="" />

					<DxColumn caption="분류" cell-template="" data-field="" />

					<DxColumn caption="문의내용" cell-template="" data-field="" />

					<DxColumn caption="작성자" cell-template="" data-field="" />

					<DxColumn caption="작성일시" cell-template="" data-field="" />

					<DxColumn caption="답변내용" cell-template="" data-field="" />

					<DxColumn caption="답변일시" cell-template="" data-field="" />
				</DxDataGrid>
			</a-spin>
		</a-col>
		<a-col span="8" class="custom-layout form-container">
			<div class="form-chat">
				<div v-chat-scroll ref="formTimeline" class="form-chat-timeline">
					<div v-for="(item, index) in listChat" :key="index">
						<div v-if="index > 0" class="form-chat-timeline-line"></div>
						<div v-if="index >= 0" class="form-chat-timeline-common">
							<div class="form-chat-timeline-content">
								<div class="form-chat-timeline-content-info">
									<div class="d-flex-center">
										<div class="form-chat-timeline-content-info-user">
											<div class="form-chat-timeline-content-info-user-status">
												<StatusChat :valueSelect="item.expresstionType" :isSelect="false" />
											</div>
											<div class="form-chat-timeline-content-info-user-name"
												:class="{ 'form-chat-timeline-content-info-user-name-login': item.writerUser.id === userId }">
												{{
													item.writerUser.name
												}}
											</div>
										</div>
										<div class="form-chat-timeline-content-info-time">
											{{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
										</div>
										<div class="form-chat-timeline-content-info-classification">{{ item.classification }}</div>
									</div>
									<div>
										<DxButton type="ghost" @click="handleEditQA(item)">
											<EditOutlined />
										</DxButton>
										<DxButton type="ghost" @click="handleDeleteQA(item)">
											<DeleteOutlined />
										</DxButton>
									</div>
								</div>
								<div class="form-chat-timeline-content-background">
									<div class="form-chat-timeline-content-text">
										<MarkdownCustom
											:options="{ source: item.content || '', linkify: true, typographer: true, highlight: true }" />
									</div>
									<div v-if="item?.files && item?.files?.length" class="form-chat-timeline-content-files">
										<div class="form-chat-timeline-content-files-preview">
											<div class="form-chat-timeline-content-files-preview-images">
												<img v-for="(file, indexFile) in item.files.filter((file: any) => isImgLink(file.url))"
													:key="indexFile"
													class="form-chat-timeline-content-files-preview-images-image"
													:src="file.url" alt=""
													@click="previewImage(item.files.filter((file: any) => isImgLink(file.url)), indexFile)">
											</div>
											<div v-for="(file, indexFile) in item.files.filter((file: any) => !isImgLink(file.url))"
												:key="indexFile" class="form-chat-timeline-content-files-preview-filetext"
												@click="openLinkDownFile(file.url)">
												<FileTextOutlined style="margin-right: 10px; font-size:30px" />
												<div class="form-chat-timeline-content-files-preview-filetext-info">
													<p class="form-chat-timeline-content-files-preview-filetext-info-name">
														{{ file.name }}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="form-chat-bottom">
					<div class="form-chat-bottom-category">
						<StatusChat with="150" disabled />
						<span style="margin: 0 10px;">분류:</span>
						<span class="form-chat-bottom-category-text">회계-마감-( {{ dayjs().format('YYYY-MM') }})</span>
					</div>
					<InputChat ref="inputChatRef" v-model:content="rowEdit.content" v-model:files="filesUpload"
						:placeholder="disabled ? '입력마감 상태에서는 이용할 수 없습니다.' : '댓글을 입력하세요…'"
						:disabled="isLoadingUpload || disabled" @submitChat="submitChat" :isEdit="rowEdit.isEdit"
						@cancel="cancelEdit" />
				</div>
				<ModalPreviewListImage :isModalPreview="isModalPreview" @cancel="isModalPreview = false"
					:listImage="listImagePreview" />
			</div>
		</a-col>
	</a-row>
</template>
<script lang="ts">
import {
	defineComponent,
	ref,
	watch,
	reactive,
	computed,
	watchEffect,
} from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
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
	HistoryOutlined,
	DeleteOutlined,
	SaveOutlined,
} from "@ant-design/icons-vue";
import dayjs from 'dayjs';
import DxButton from "devextreme-vue/button";
import { getFakeData } from "../utils/index";
import DataSource from "devextreme/data/data_source";
import { companyId } from "@/helpers/commonFunction";
import { Message } from "@/configs/enum";
import deletePopup from "@/utils/deletePopup";
import InputChat from "./InputChat.vue";
import { getJwtObject } from "@bankda/jangbuda-common";
import StatusChat from "@/views/AC/AC1/AC130/components/StatusChat.vue";
import MarkdownCustom from "@/views/AC/AC1/AC130/components/MarkdownCustom.vue";
export default defineComponent({
	components: {
		DxDataGrid,
		DxColumn,
		EditOutlined,
		HistoryOutlined,
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
	},
	setup() {
		// config grid
		const store = useStore();
		const move_column = computed(() => store.state.settings.move_column);
		const colomn_resize = computed(() => store.state.settings.colomn_resize);
		const dataSource = ref([])
		let trigger = ref(true);
		const rangeDate = ref([parseInt(dayjs().subtract(1, 'year').format("YYYYMMDD")), parseInt(dayjs().format("YYYYMMDD"))])
		const dataSourceDetail = ref<any>()
		const filesUpload = ref([])
		const disabled = ref(false)
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
			files: [],
			isEdit: false
		})
		const listChat = ref(JSON.parse(localStorage.getItem("listChat") ?? '[]'))
		dataSourceDetail.value = getFakeData()
		// ================GRAPQL==============================================

		// ================FUNCTION============================================
		const addRow = () => {

		}
		const openHistory = () => {

		}
		const getTag = (expressionType: number) => {
			switch (expressionType) {
				case 1:
					return {
						text: '문의',
						class: 'tag-inquiry'
					}
				case 2:
					return {
						text: '답글',
						class: 'tag-reply'
					}
				case 3:
					return {
						text: '알림',
						class: 'tag-alarm'
					}
				case 4:
					return {
						text: '일반',
						class: 'tag-white'
					}
				default:
					return {
						text: '', class: ''
					}
			}
		}

		const submitChat = () => {
			if (rowEdit.isEdit) {
				editChat()
			} else {
				addChat()
			}
			rowEdit.isEdit = false
			rowEdit.content = ''
			rowEdit.files = []
			filesUpload.value = []
		}
		const addChat = () => {
			if (isLoadingUpload.value || (!rowEdit.content.trim() && !filesUpload.value.length)) return
			isLoadingUpload.value = true
			let fileStorageIds = null
			if (filesUpload.value.length) {
				fileStorageIds = filesUpload.value.map((file: any) => parseInt(file.id))
			}
			console.log(!!rowEdit.content.trim() ? rowEdit.content.trim() : null);
			const value = {
				id: listChat.value.length + 1,
				expresstionType: Math.floor(Math.random() * 5) + 1,
				classification: "회계-마감-(2023-04)",
				content: !!rowEdit.content.trim() ? rowEdit.content.trim() : null,
				companyId: companyId,
				fiscalYear: 2023,
				facilityBusinessId: 1,
				year: 2023,
				month: dayjs().month(),
				writedAt: new Date().getTime(),
				createdAt: new Date().getTime(),
				createdBy: "C23040301",
				updatedAt: new Date().getTime(),
				updatedBy: "C23040301",
				ip: "42.118.154.26",
				active: true,
				writerUser: {
					id: 2,
					type: "c",
					username: "C23040301",
					name: "user test 1",
					active: true,
				},
				files: null,
			}
			if (listChat.value.length === 0) {
				localStorage.setItem("listChat", JSON.stringify([value]))
				listChat.value = [value]
			} else {
				const result = [
					...listChat.value,
					value
				]
				localStorage.setItem("listChat", JSON.stringify(result))
				listChat.value = result
			}
			isLoadingUpload.value = false
		}
		const editChat = () => {
			if (isLoadingUpload.value || (!rowEdit.content.trim() && !filesUpload.value.length)) return
			// find item edit in listChat
			const index = listChat.value.findIndex((item: any) => item.id === rowEdit.id)
			if (index === -1) return
			isLoadingUpload.value = true
			let fileStorageIds = null
			if (filesUpload.value.length) {
				fileStorageIds = filesUpload.value.map((file: any) => parseInt(file.id))
			}
			listChat.value[index].content = !!rowEdit.content.trim() ? rowEdit.content.trim() : null
			listChat.value[index].files = fileStorageIds
			isLoadingUpload.value = false
			localStorage.setItem("listChat", JSON.stringify(listChat.value))

		}
		const cancelEdit = () => {
			rowEdit.isEdit = false
			rowEdit.content = ''
			rowEdit.files = []
			filesUpload.value = []
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

		const handleDeleteQA = (row: any) => {
			deletePopup({
				callback: () => {
					const result = listChat.value.filter((item: any) => item.id !== row.id)
					localStorage.setItem("listChat", JSON.stringify(result))
					listChat.value = result
				},
				message: Message.getCommonMessage("303").message,
				cancelText: Message.getCommonMessage("303").no,
				okText: Message.getCommonMessage("303").yes,
			})
		}
		const handleEditQA = (row: any) => {
			rowEdit.content = row.content
			rowEdit.isEdit = true
			rowEdit.id = row.id
		}

		const openLinkDownFile = (link: string) => {
			window.open(link, '_blank')
		}
		// ================WATCHING============================================


		return {
			move_column,
			colomn_resize,
			labelCol: { style: { width: "150px" } },
			dataSource, dataSourceDetail,
			rangeDate,
			addRow, openHistory,
			getTag, dayjs,
			rowEdit,
			filesUpload,
			listImagePreview,
			disabled, isLoadingUpload, cancelEdit, submitChat, isModalPreview,
			previewImage, isImgLink, userId,
			listChat, handleDeleteQA, handleEditQA, openLinkDownFile,
		};
	},
});
</script>
<style scoped lang="scss" src="../style/style.scss"></style>
