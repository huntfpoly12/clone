<template>
  <a-row>
    <a-col :span="14">
      <a-spin :spinning="loading || loadingUpdate">
        <DxDataGrid
          ref="gridRef"
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="dataSource"
          key-expr="messageId"
          :show-borders="true"
          :allow-column-resizing="true"
          :focused-row-enabled="true"
          :column-auto-width="true"
          :loadPanel="false"
          :focused-row-key="focusRowKey"
          @focused-row-changing="onFocusedRowChanging"
          @focused-row-changed="onFocusedRowChanged"
          :focused-row-index="focusRowIndex"
          noDataText="내역이 없습니다"
          style="height: calc(100vh - 210px);"
        >
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색"/>
          <DxExport :enabled="true"/>
          <DxToolbar>
            <DxItem location="after" template="search"/>
            <DxItem location="after" template="button-template" css-class="cell-button-add"/>
            <DxItem location="after" name="searchPanel" cssClass="search-panel"/>
            <DxItem location="after" name="exportButton" css-class="cell-button-export"/>
          </DxToolbar>
          <template #search>
            <div class="d-flex-center gap-20">
              <a-form-item label="작성기간 (최대 1년)">
                <range-date-time-box v-model:valueDate="rangeDate" width="250px" :multi-calendars="true"
                                     :max-range="90"/>
              </a-form-item>
              <div class="d-flex-center">
                <checkbox-basic label="삭제 포함"/>
              </div>
            </div>
          </template>
          <template #button-template>
            <a-tooltip placement="top">
              <template #title>알림 신규 등록</template>
              <div>
                <DxButton icon="plus" @click="showAddModal"/>
              </div>
            </a-tooltip>
          </template>
          <DxColumn caption="삭제 여부" data-field="active" alignment="center" cell-template="active" width="80px"/>
          <DxColumn caption="구분" data-field="expresstionType" alignment="center" cell-template="expresstionType"/>
          <DxColumn caption="사업자코드" data-field="company.code" alignment="center" cell-template="companyCode"
                    width="80px"/>
          <DxColumn caption="상호" data-field="company.name" alignment="center"/>
          <DxColumn caption="주소" data-field="company.address" alignment="center"/>
          <DxColumn caption="분류" data-field="classification" alignment="center"/>
          <DxColumn caption="알림내용" data-field="content" alignment="center" width="200px"/>
          <DxColumn caption="작성자" data-field="writerCompactUser.id" alignment="center"/>
          <DxColumn caption="작성일시" data-field="writedAt" data-type="date" format="yyyy-MM-dd HH:mm" alignment="center"
                    width="120px"/>
          <DxColumn caption="" alignment="center" cell-template="action"/>

          <template #active="{data}">
            <div v-if="!data.data.active">
              <a-tag color="#DC5939">삭제</a-tag>
            </div>
          </template>
          <template #expresstionType="{data}">
            <ExpressionType :is-select="false" :value-select="data.data.expresstionType"/>
          </template>
          <template #companyCode="{data}">
            <div class="d-flex-center justify-content-center gap-5">
              {{ data.data.company.code }}
              <a-tag v-if="!data.data.company.active" color="#DC5939">해지</a-tag>
            </div>
          </template>
          <template #action="{data}">
            <a-tooltip>
              <template #title>마감상태 변경이력</template>
              <HistoryOutlined style="font-size: 18px; margin-left: 5px" @click="openLogs(data.data)"/>
            </a-tooltip>
          </template>
        </DxDataGrid>
      </a-spin>
    </a-col>
    <a-col :span="10" class="form-container pl-10 pt-8">
      <div class="form-chat">
        <!--          <div v-if="loadinggetGetAccountingClosingMessages || loading" class="form-chat-loading">-->
        <!--            <a-spin size="large"/>-->
        <!--          </div>-->
        <div v-chat-scroll ref="formTimeline" class="form-chat-timeline">
          <div v-if="messageDetail" class="form-chat-timeline-common">
            <div class="form-chat-timeline-content">
              <div class="form-chat-timeline-content-info">
                <div class="d-flex-center">
                  <div class="form-chat-timeline-content-info-user">
                    <div class="form-chat-timeline-content-info-user-status">
                      <ExpressionType :is-select="false" :value-select="messageDetail.expresstionType"/>
                    </div>
                    <div class="form-chat-timeline-content-info-user-name">
                      {{
                        messageDetail.writerCompactUser.name
                      }}
                    </div>
                  </div>
                  <div class="form-chat-timeline-content-info-time">
                    {{ dayjs(messageDetail.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
                  </div>
                  <div class="form-chat-timeline-content-info-classification">{{ messageDetail.classification }}</div>
                </div>
                <div>
                  <DxButton type="ghost" @click="handleEditQA(messageDetail)">
                    <EditOutlined/>
                  </DxButton>
                  <DxButton type="ghost" @click="handleDeleteQA(messageDetail)">
                    <DeleteOutlined/>
                  </DxButton>
                </div>
              </div>
              <div class="form-chat-timeline-content-background">
                <div class="form-chat-timeline-content-text">
                  <MarkdownCustom
                    :options="{ source: messageDetail.content || '', linkify: true, typographer: true, highlight: true }"/>
                </div>
                <div v-if="messageDetail?.fileStorages && messageDetail?.fileStorages.length"
                     class="form-chat-timeline-content-files">
                  <div class="form-chat-timeline-content-files-preview">
                    <div class="form-chat-timeline-content-files-preview-images">
                      <img
                        v-for="(file, indexFile) in messageDetail?.fileStorages.filter((file: any) => isImgLink(file.url))"
                        :key="indexFile" class="form-chat-timeline-content-files-preview-images-image"
                        :src="file.url"
                        alt=""
                        @click="previewImage(messageDetail!.fileStorages.filter((file: any) => isImgLink(file.url)), indexFile)">
                    </div>
                    <div
                      v-for="(file, indexFile) in messageDetail?.fileStorages.filter((file: any) => !isImgLink(file.url))"
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
        <div class="form-chat-bottom">
          <div class="form-chat-bottom-category">
            <StatusChat with="150" disabled/>
            <span style="margin: 0 10px;">분류:</span>
            <span class="form-chat-bottom-category-text">회계-마감-( {{ dayjs().format('YYYY-MM') }})</span>
          </div>
          <InputChat ref="inputChatRef" v-model:content="rowEdit.content" v-model:files="filesUpload"
                     :placeholder="disabled ? '글작성 (최대 1,000자)' : '글작성 (최대 1,000자)'"
                     :companyId="messageDetail?.companyId || 0"
                     :disabled="isLoadingUpload || dataSource.length === 0"
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
  <Tab3PlusModal :modal-status="isModalTab3Plus" @cancel="isModalTab3Plus = false" @close-modal="closeModal"/>
  <HistoryPopup :modalStatus="isModalHistory" @closePopup="isModalHistory = false" title="변경이력"
                :idRowEdit="null"
                typeHistory="communication-board" :data="dataHistory"/>
</template>

<script setup lang="ts">
import DxButton from "devextreme-vue/button";
import {DeleteOutlined, EditOutlined, FileTextOutlined, HistoryOutlined} from "@ant-design/icons-vue";
import {DxColumn, DxDataGrid, DxExport, DxItem, DxSearchPanel, DxToolbar} from "devextreme-vue/data-grid";

import {computed, inject, provide, reactive, ref, watch} from "vue";
import dayjs from "dayjs";
import MarkdownCustom from "@/views/AC/AC1/AC130/components/MarkdownCustom.vue";
import ModalPreviewListImage from "@/views/AC/AC1/AC130/components/ModalPreviewListImage.vue";
import StatusChat from "@/views/AC/AC1/AC130/components/StatusChat.vue";
import InputChat from "@/views/CommunicationBoard/components/InputChat.vue";
import deletePopup from "@/utils/deletePopup";
import {Message} from "@/configs/enum";
import {
  DataCompanyTab3,
  DataRowKey,
  MessageDetail,
  OpenRowCompanyTab3,
  OpenRowKey
} from "@/views/CommunicationBoard/type";
import Tab3PlusModal from "@/views/CommunicationBoard/components/Tab3PlusModal.vue";
import {useMutation, useQuery} from "@vue/apollo-composable";
import {searchAdminNotificationMessages} from "@/graphql/queries/BF/Communication-board";
import ExpressionType from "@/components/common/ExpressionType.vue";
import {FocusedRowChangedEvent} from "devextreme/ui/data_grid";
import {updateNotificationMessage} from "@/graphql/mutations/BF/Communication-board";
import cloneDeep from "lodash/cloneDeep";
import DataSource from "devextreme/data/data_source";
import {messageTab3} from "@/views/CommunicationBoard/utils";


const search = reactive({
  replyX: true,
  replyO: true,
})
const rangeDate = ref([parseInt(dayjs().subtract(1, "year").format("YYYYMMDD")), parseInt(dayjs().format("YYYYMMDD"))])

const dataRow = inject(DataRowKey)
const openRow = inject(OpenRowKey)

const gridRef = ref()
const dataSource: any = ref([])
const filesUpload = ref([])
const disabled = ref(false)
const isLoadingUpload = ref(false)
const isModalPreview = ref(false)
const isModalTab3Plus = ref(false)
const isModalHistory = ref<boolean>(false);
const dataHistory = reactive({
  companyId: 0,
  messageId: 0
})
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
const focusRowKey: any = ref(dataRow?.value?.messageId || null)
const focusRowIndex = ref(dataRow?.value?.messageId ? -1 : 0)

watch(() => dataRow?.value?.messageId, (value) => {
  focusRowKey.value = value
})

const {onResult, onError, loading, refetch} = useQuery(searchAdminNotificationMessages, {
  filter: {
    startWriteDate: 20220101,
    finishWriteDate: 20230801,
    includeDeletion: false,
  }
})
onResult((result) => {
  console.log('%c oij', 'color: red',)
  // get 4 items of result.data
  const [...data] = result?.data?.searchAdminNotificationMessages
  dataSource.value = new DataSource({
    store: {
      type: "array",
      data: data as Array<any> || [],
      key: "messageId",
    },
  });
})
onError((error) => {
  console.log(error)
})

const openLogs = (data: any) => {
  isModalHistory.value = true
  dataHistory.companyId = data.company.id
  dataHistory.messageId = data.messageId
}
const messageDetail = ref<MessageDetail | null>(null)

const onFocusedRowChanging = () => {
  console.log('%c focus changing', 'color: red',)
}
const onFocusedRowChanged = (e: FocusedRowChangedEvent) => {
  if (e.row?.data) {
    messageDetail.value = e.row.data
    if (openRow) openRow(e.row.data)
  }
}

const {
  mutate,
  onDone: onDoneUpdate,
  onError: onErrorUpdate,
  loading: loadingUpdate
} = useMutation(updateNotificationMessage)

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

}

function editChat() {
  if (isLoadingUpload.value || (!rowEdit.content.trim() && !filesUpload.value.length)) return
  // find item edit in messageDetail
  isLoadingUpload.value = true
  let fileStorageIds = null
  if (filesUpload.value.length) {
    fileStorageIds = filesUpload.value.map((file: any) => parseInt(file.id))
  }
  mutate({
    companyId: messageDetail.value!.companyId,
    messageId: messageDetail.value!.messageId,
    input: {
      content: rowEdit.content.trim(),
      fileStorageIds: fileStorageIds
    }
  })
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
const showAddModal = () => {
  isModalTab3Plus.value = true
}
const closeModal = (e: boolean) => {
  if (e) {
    dataSource.value?.store().insert(cloneDeep(messageTab3)).then((result: any) => {
      gridRef.value.instance?.refresh()
      focusRowKey.value = result?.messageId
    });
  }
  isModalTab3Plus.value = false
}

const dataRowCompany = ref<DataCompanyTab3 | null>(null)
const chooseCompany = (data: DataCompanyTab3) => {
  dataRowCompany.value = data
  console.log('%c data chooseCompany', 'color: red', data)

}
provide(OpenRowCompanyTab3, chooseCompany)
provide(DataCompanyTab3, dataRowCompany)
</script>

<style lang="scss" scoped>
@import "./../styles";
</style>
