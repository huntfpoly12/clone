<template>
  <div>
    <a-row>
      <a-col :span="14">
        <DxDataGrid
            :show-row-lines="true"
            :hoverStateEnabled="true"
            :data-source="dataSource"
            :show-borders="true"
            :allow-column-resizing="true"
            column-auto-width
            noDataText="내역이 없습니다"
            style="height: calc(100vh - 210px);"
        >
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색"/>
          <DxExport :enabled="true"/>
          <DxToolbar>
            <DxItem location="before" template="search"/>
            <DxItem location="after" name="exportButton" css-class="cell-button-export"/>
            <DxItem location="after" name="searchPanel" cssClass="search-panel"/>
          </DxToolbar>
          <template #search>
            <div class="d-flex-center gap-20">
              <a-form-item label="문의">
                <checkbox-basic label="답글O" v-model:valueCheckbox="search.replyO"/>
                <checkbox-basic label="답글X" v-model:valueCheckbox="search.replyX"/>
              </a-form-item>
              <a-form-item label="작성기간 (최대 3월)">
                <range-date-time-box v-model:valueDate="rangeDate" width="250px" :multi-calendars="true"
                                     :max-range="90"/>
                <info-tool-tip>문의글 기준</info-tool-tip>
              </a-form-item>
              <div class="d-flex-center">
                <checkbox-basic label="삭제 포함"/>
              </div>
            </div>
          </template>
          <DxColumn caption="삭제 여부" data-field="delete" alignment="center"/>
          <DxColumn caption="구분" data-field="division" alignment="center"/>
          <DxColumn caption="사업자코드" data-field="active" alignment="center" cell-template="active"/>
          <DxColumn caption="상호" data-field="mutual" alignment="center"/>
          <DxColumn caption="주소" data-field="address" alignment="center"/>
          <DxColumn caption="분류" data-field="classification" alignment="center"/>
          <DxColumn caption="문의내용" data-field="contentOfInquiry" alignment="center"/>
          <DxColumn caption="작성자" data-field="writer" alignment="center"/>
          <DxColumn caption="작성일시" data-field="dateOfCreation" alignment="center"/>
          <DxColumn caption="답변내용" data-field="answerContent" alignment="center"/>
          <DxColumn caption="답변자" data-field="answerer" alignment="center"/>
          <DxColumn caption="답변일시" data-field="replyDateAndTime" alignment="center"/>

          <template #active="{data}">
            <div v-if="data.data.active">
              <a-tag color="red">해지</a-tag>
            </div>
          </template>
        </DxDataGrid>
      </a-col>
      <a-col :span="10" class="form-container pl-10">
        <div class="form-chat">
          <!--          <div v-if="loadinggetGetAccountingClosingMessages || loading" class="form-chat-loading">-->
          <!--            <a-spin size="large"/>-->
          <!--          </div>-->
          <div v-chat-scroll ref="formTimeline" class="form-chat-timeline">
            <div v-for="(item, index) in listChat" :key="index">
              <div v-if="index > 0" class="form-chat-timeline-line"/>
              <div v-if="index >= 0" class="form-chat-timeline-common">
                <div class="form-chat-timeline-content">
                  <div class="form-chat-timeline-content-info">
                    <div class="d-flex-center">
                      <div class="form-chat-timeline-content-info-user">
                        <div class="form-chat-timeline-content-info-user-status">
                          <StatusChat :valueSelect="item.expresstionType" :isSelect="false"/>
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
                        <EditOutlined/>
                      </DxButton>
                      <DxButton type="ghost" @click="handleDeleteQA(item)">
                        <DeleteOutlined/>
                      </DxButton>
                    </div>
                  </div>
                  <div class="form-chat-timeline-content-background">
                    <div class="form-chat-timeline-content-text">
                      <MarkdownCustom
                          :options="{ source: item.content || '', linkify: true, typographer: true, highlight: true }"/>
                    </div>
                    <div v-if="item?.files && item?.files?.length" class="form-chat-timeline-content-files">
                      <div class="form-chat-timeline-content-files-preview">
                        <div class="form-chat-timeline-content-files-preview-images">
                          <img v-for="(file, indexFile) in item.files.filter((file: any) => isImgLink(file.url))"
                               :key="indexFile" class="form-chat-timeline-content-files-preview-images-image"
                               :src="file.url"
                               alt=""
                               @click="previewImage(item.files.filter((file: any) => isImgLink(file.url)), indexFile)">
                        </div>
                        <div v-for="(file, indexFile) in item.files.filter((file: any) => !isImgLink(file.url))"
                             :key="indexFile" class="form-chat-timeline-content-files-preview-filetext"
                             @click="openLinkDownFile(file.url)">
                          <FileTextOutlined style="margin-right: 10px; font-size:30px"/>
                          <div class="form-chat-timeline-content-files-preview-filetext-info">
                            <p class="form-chat-timeline-content-files-preview-filetext-info-name">{{ file.name }}</p>
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
              <StatusChat with="150" disabled/>
              <span style="margin: 0 10px;">분류:</span>
              <span class="form-chat-bottom-category-text">회계-마감-( {{ dayjs().format('YYYY-MM') }})</span>
            </div>
            <InputChat ref="inputChatRef" v-model:content="rowEdit.content" v-model:files="filesUpload"
                       :placeholder="disabled ? '입력마감 상태에서는 이용할 수 없습니다.' : '댓글을 입력하세요…'"
                       :disabled="isLoadingUpload || disabled"
                       @submitChat="submitChat"
                       :isEdit="rowEdit.isEdit"
                       @cancel="cancelEdit"
            />
          </div>
          <ModalPreviewListImage :isModalPreview="isModalPreview" @cancel="isModalPreview = false"
                                 :listImage="listImagePreview"/>
        </div>
      </a-col>
    </a-row>

  </div>
</template>

<script setup lang="ts">
import { computed, inject, reactive, ref } from "vue";
import { DxColumn, DxDataGrid, DxExport, DxItem, DxSearchPanel, DxToolbar } from "devextreme-vue/data-grid";
import dayjs from "dayjs";
import DxButton from "devextreme-vue/button";
import {
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  PrinterOutlined,
  SaveOutlined,
  SearchOutlined
} from "@ant-design/icons-vue";
import { DataRowKey } from "@/views/CommunicationBoard/type";
import InputChat from "./InputChat.vue";
import MarkdownCustom from "@/views/AC/AC1/AC130/components/MarkdownCustom.vue";
import ModalPreviewListImage from "@/views/AC/AC1/AC130/components/ModalPreviewListImage.vue";
import StatusChat from "@/views/AC/AC1/AC130/components/StatusChat.vue";
import { getJwtObject } from "@bankda/jangbuda-common";
import { companyId } from "@/helpers/commonFunction";
import deletePopup from "@/utils/deletePopup";
import { Message } from "@/configs/enum";
import { dataFake } from "@/views/CommunicationBoard/utils";

const dataRow = inject(DataRowKey)
const token = ref(sessionStorage.getItem("token"))
let jwtObject = getJwtObject(token.value!);
const userName = ref(sessionStorage.getItem("name"));
const userId = jwtObject.userId
const search = reactive({
  replyX: true,
  replyO: true,
})
const rangeDate = ref([parseInt(dayjs().format("YYYYMMDD")), parseInt(dayjs().add(3, "month").format("YYYYMMDD"))])
const dataSource = ref(dataFake.filter((item: any) => item.expressionType < 3))
const filesUpload = ref([])
const disabled = ref(false)
const isLoadingUpload = ref(false)
const isModalPreview = ref(false)
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
const globalFacilityBizId = computed(() => parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0"));
const acYear = computed(() => parseInt(sessionStorage.getItem("acYear") ?? '0'))
const listChat = ref(JSON.parse(localStorage.getItem("listChat") ?? '[]'))
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
function addChat() {
  if (isLoadingUpload.value || (!rowEdit.content.trim() && !filesUpload.value.length)) return
  isLoadingUpload.value = true
  let fileStorageIds = null
  if (filesUpload.value.length) {
    fileStorageIds = filesUpload.value.map((file: any) => parseInt(file.id))
  }
  const value = {
    id: listChat.value.length + 1,
    expresstionType: Math.floor(Math.random()*5) + 1,
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
function editChat() {
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
</script>

<style lang="scss" scoped>
@import "./../styles";
</style>
