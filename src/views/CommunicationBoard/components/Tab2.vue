<template>
  <a-row>
    <a-col :span="14">
      <a-spin :spinning="loading">
        <DxDataGrid ref="gridRef" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    key-expr="messageId" :show-borders="true" :allow-column-resizing="true" :focused-row-enabled="true"
                    :column-auto-width="true" :loadPanel="false" :focused-row-key="focusRowKey"
                    @focused-row-changing="onFocusedRowChanging" @focused-row-changed="onFocusedRowChanged"
                    :focused-row-index="focusRowIndex" noDataText="내역이 없습니다" style="height: calc(100vh - 210px);">
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
          <DxExport :enabled="true" />
          <DxToolbar>
            <DxItem location="after" template="search" />
            <DxItem location="after" name="searchPanel" cssClass="search-panel" />
            <DxItem location="after" name="exportButton" css-class="cell-button-export" />
          </DxToolbar>
          <template #search>
            <div class="d-flex-center gap-20">
              <a-form-item label="문의">
                <checkbox-basic label="답글O" v-model:valueCheckbox="expresstionTypes.expresstionType2"/>
                <checkbox-basic label="답글X" v-model:valueCheckbox="expresstionTypes.expresstionType3"/>
              </a-form-item>
              <a-form-item label="작성기간 (최대 3월)">
                <range-date-time-box v-model:valueDate="rangeDate" width="250px" :multi-calendars="true"
                                     :max-range="90" />
                <info-tool-tip>문의글 기준</info-tool-tip>
              </a-form-item>
              <div class="d-flex-center">
                <checkbox-basic label="삭제 포함" v-model:valueCheckbox="filterSearch.includeDeletion" />
              </div>
            </div>
          </template>
          <DxColumn caption="삭제 여부" data-field="active" alignment="center" cell-template="active"/>
          <DxColumn caption="구분" data-field="expresstionType" alignment="center" cell-template="expresstionType"/>
          <DxColumn caption="사업자코드" data-field="company.code" alignment="center" cell-template="companyCode"/>
          <DxColumn caption="상호" data-field="company.name" alignment="center"/>
          <DxColumn caption="주소" data-field="company.address" alignment="center" width="200px"/>
          <DxColumn caption="분류" data-field="classification" alignment="center"/>
          <DxColumn caption="문의내용" data-field="content" alignment="center" width="200px"/>
          <DxColumn caption="작성자" data-field="writerCompactUser.id" alignment="center"/>
          <DxColumn caption="작성일시" data-field="writedAt" data-type="date" format="yyyy-MM-dd HH:mm" alignment="center"/>
          <DxColumn caption="답변내용" data-field="answer" alignment="center" width="200px"/>
          <DxColumn caption="답변자" data-field="answerCompactUser.id" alignment="center"/>
          <DxColumn caption="답변일시" data-field="answeredAt" data-type="date" format="yyyy-MM-dd HH:mm" alignment="center"/>
          <DxColumn caption="" alignment="center" cell-template="action" />
          <template #active="{ data }">
            <div v-if="!data.data.active">
              <a-tag color="#DC5939">삭제</a-tag>
            </div>
          </template>
          <template #expresstionType="{ data }">
            <ExpressionType v-if="data.data.answeredAt" :is-select="false" :value-select="2" style="margin-bottom: 5px"/>
            <ExpressionType :is-select="false" :value-select="data.data.expresstionType" />
          </template>
          <template #companyCode="{ data }">
            <div class="d-flex-center justify-content-center gap-5">
              {{ data.data.company.code }}
              <a-tag v-if="!data.data.company.active" color="#DC5939">해지</a-tag>
            </div>
          </template>
          <template #action="{ data }">
            <a-tooltip>
              <template #title>마감상태 변경이력</template>
              <HistoryOutlined style="font-size: 18px; margin-left: 5px" @click="openLogs(data.data)" />
            </a-tooltip>
          </template>
        </DxDataGrid>
      </a-spin>
    </a-col>
    <a-col :span="10">
      <a-spin :spinning="loadingDetail || loadingUpdateAnswerToInquiryMessage || loadingUpdateInquiryMessage
        || loadingAddImageAnswerToInquiryMessage || loadingUpdateInquiryMessage || loadingCreate
        || loadingDelete || loadingDeleteImageInquiryMessage || loadingDeleteImageInquiryMessage">
        <div class="form-container pl-10 pt-8">
          <div class="form-chat">
            <div v-chat-scroll ref="formTimeline" class="form-chat-timeline">
              <div v-if="messageDetail" class="form-chat-timeline-common">
                <div class="form-chat-timeline-content">
                  <div class="form-chat-timeline-content-info">
                    <div class="d-flex-center">
                      <div class="form-chat-timeline-content-info-user">
                        <div class="form-chat-timeline-content-info-user-status">
                          <ExpressionType
                            :is-select="false"
                            :value-select="!messageDetail.answeredAt ? messageDetail.expresstionType : 2"
                          />
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
                    <div v-if="messageDetail.active && messageDetail?.messageId !== 0">
                      <DxButton type="ghost" @click="handleEditMessage(messageDetail, TypeEditMessage.QUESTION)" :disabled="rowEdit.isEdit">
                        <EditOutlined />
                      </DxButton>
                      <DxButton type="ghost" @click="handleDeleteMessage(messageDetail)">
                        <DeleteOutlined />
                      </DxButton>
                    </div>
                  </div>
                  <div class="form-chat-timeline-content-background">
                    <div class="form-chat-timeline-content-text">
                      <MarkdownCustom
                        :options="{ source: messageDetail.content || '', linkify: true, typographer: true, highlight: true }" />
                    </div>
                    <div v-if="messageDetail && messageDetail?.fileStorages && messageDetail?.fileStorages.length"
                         class="form-chat-timeline-content-files">
                      <div class="form-chat-timeline-content-files-preview">
                        <div class="form-chat-timeline-content-files-preview-images">
                          <img
                            v-for="(file, indexFile) in messageDetail?.fileStorages.filter((file: any) => isImgLink(file.url))"
                            :key="indexFile" class="form-chat-timeline-content-files-preview-images-image" :src="file.url"
                            alt=""
                            @click="messageDetail?.fileStorages && previewImage(messageDetail?.fileStorages.filter((file: any) => isImgLink(file.url)), indexFile)">
                        </div>
                        <div
                          v-for="(file, indexFile) in messageDetail?.fileStorages.filter((file: any) => !isImgLink(file.url))"
                          :key="indexFile" class="form-chat-timeline-content-files-preview-filetext"
                          @click="openLinkDownFile(file.url)">
                          <FileTextOutlined style="margin-right: 10px; font-size:30px" />
                          <div class="form-chat-timeline-content-files-preview-filetext-info">
                            <p class="form-chat-timeline-content-files-preview-filetext-info-name">{{ file.name }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="messageDetail.answeredAt">
                  <div class="form-chat-timeline-content">
                    <div class="form-chat-timeline-content-info">
                      <div class="d-flex-center">
                        <div class="form-chat-timeline-content-info-user">
                          <div class="form-chat-timeline-content-info-user-status">
                            <ExpressionType :is-select="false" :value-select="messageDetail.expresstionType" />
                          </div>
                          <div class="form-chat-timeline-content-info-user-name">
                            {{
                              messageDetail.answerCompactUser.name
                            }}
                          </div>
                        </div>
                        <div class="form-chat-timeline-content-info-time">
                          {{ dayjs(messageDetail.answeredAt).format('YYYY-MM-DD HH:mm:ss') }}
                        </div>
                        <div class="form-chat-timeline-content-info-classification">{{ messageDetail.classification }}</div>
                      </div>
                      <div v-if="messageDetail.active && messageDetail?.messageId !== 0">
                        <DxButton type="ghost" @click="handleEditMessage(messageDetail, TypeEditMessage.ANSWER)" :disabled="rowEdit.isEdit">
                          <EditOutlined />
                        </DxButton>
                        <DxButton type="ghost" @click="handleDeleteMessage(messageDetail)">
                          <DeleteOutlined />
                        </DxButton>
                      </div>
                    </div>
                    <div class="form-chat-timeline-content-background">
                      <div class="form-chat-timeline-content-text">
                        <MarkdownCustom
                          :options="{ source: messageDetail.answer || '', linkify: true, typographer: true, highlight: true }" />
                      </div>
                      <div v-if="messageDetail && messageDetail?.answerFileStorages && messageDetail?.answerFileStorages.length"
                           class="form-chat-timeline-content-files">
                        <div class="form-chat-timeline-content-files-preview">
                          <div class="form-chat-timeline-content-files-preview-images">
                            <img
                              v-for="(file, indexFile) in messageDetail?.answerFileStorages.filter((file: any) => isImgLink(file.url))"
                              :key="indexFile" class="form-chat-timeline-content-files-preview-images-image" :src="file.url"
                              alt=""
                              @click="messageDetail?.answerFileStorages && previewImage(messageDetail?.answerFileStorages.filter((file: any) => isImgLink(file.url)), indexFile)">
                          </div>
                          <div
                            v-for="(file, indexFile) in messageDetail?.answerFileStorages.filter((file: any) => !isImgLink(file.url))"
                            :key="indexFile" class="form-chat-timeline-content-files-preview-filetext"
                            @click="openLinkDownFile(file.url)">
                            <FileTextOutlined style="margin-right: 10px; font-size:30px" />
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
                <StatusChat with="150" :valueSelect="3" disabled />
                <div v-if="messageDetail">
                  <checkbox-basic label="비밀글" v-model:valueCheckbox="messageDetail.secret" :disabled="!rowEdit.isEdit"/>
                </div>
                <info-tool-tip>
                  선택시 작성글과 답글은 작성자만 조회할 수 있습니다
                </info-tool-tip>
                <span style="margin: 0 10px;">분류:</span>
                <span class="form-chat-bottom-category-text">
                  <Classification v-if="messageDetail && messageDetail?.expresstionType !== 3"
                                  v-model:value-select="messageDetail.classification"
                                  :disabled="!messageDetail?.active || !rowEdit.isEdit && !state.isNewRow" />
                </span>
              </div>
              <InputChat ref="inputChatRef" v-model:content="rowEdit.content" v-model:files="filesUpload"
                         :placeholder="'글작성 (최대 1,000자)'" :companyId="messageDetail?.companyId || 0"
                         :disabled="!!messageDetail?.answeredAt && !rowEdit.isEdit || !messageDetail?.active" @submitChat="submitChat"
                         :isEdit="true" @cancel="cancelEdit"
                         :isNewRow="!rowEdit.isEdit"
                         @update-image="updateImage" />
              <div v-if="rowEdit.isEdit" class="mt-10">
                <div v-for="file in messageDetail?.fileStorages" class="d-flex-center justify-content-between"
                     :key="file.id">
                  <div class="d-flex-center">
                    <FileOutlined style="margin-right: 10px;" />
                    <div class="">{{ file.name }}</div>
                  </div>
                  <DxButton type="ghost" @click="handleDeleteMessageImage(file.id)">
                    <DeleteOutlined class="cursor-pointer" />
                  </DxButton>
                </div>
              </div>
            </div>
            <ModalPreviewListImage :isModalPreview="state.isModalPreview" @cancel="state.isModalPreview = false"
                                   :listImage="listImagePreview" />
          </div>
        </div>

      </a-spin>
    </a-col>
  </a-row>
  <Tab3PlusModal :modal-status="state.isModalTab3Plus" @cancel="state.isModalTab3Plus = false"
                 @close-modal="closeModal" />
  <HistoryPopup :modalStatus="state.isModalHistory" @closePopup="state.isModalHistory = false" title="변경이력"
                :idRowEdit="null" typeHistory="communication-board" :data="dataHistory" />
</template>

<script setup lang="ts">
import {DeleteOutlined, EditOutlined, FileOutlined, FileTextOutlined, HistoryOutlined} from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import {DxColumn, DxDataGrid, DxExport, DxItem, DxSearchPanel, DxToolbar} from "devextreme-vue/data-grid";

import ExpressionType from "@/components/common/ExpressionType.vue";
import {Message} from "@/configs/enum";
import {
  addAttachedFileOfAnswerToInquiryMessage,
  addAttachedFileOfInquiryMessage,
  createAnswerToInquiryMessage, deleteAttachedFileOfAnswerToInquiryMessage, deleteAttachedFileOfInquiryMessage,
  deleteInquiryMessage,
  deleteNotificationMessage,
  updateAnswerToInquiryMessage,
  updateInquiryMessage
} from "@/graphql/mutations/BF/Communication-board";
import {getAdminInquiryMessage, searchAdminInquiryMessages} from "@/graphql/queries/BF/Communication-board";
import deletePopup from "@/utils/deletePopup";
import notification from "@/utils/notification";
import MarkdownCustom from "@/views/AC/AC1/AC130/components/MarkdownCustom.vue";
import ModalPreviewListImage from "@/views/AC/AC1/AC130/components/ModalPreviewListImage.vue";
import StatusChat from "@/views/AC/AC1/AC130/components/StatusChat.vue";
import InputChat from "@/views/CommunicationBoard/components/InputChat.vue";
import Tab3PlusModal from "@/views/CommunicationBoard/components/Tab3PlusModal.vue";
import {
  ClassificationEnum,
  DataCompanyTab3,
  DataRowKey,
  MessageDetailAnswer,
  OpenRowCompanyTab3,
  OpenRowKey,
  RowEditDefault,
  TypeEditMessage
} from "@/views/CommunicationBoard/type";
import {messageTab3, rowEditDefault} from "@/views/CommunicationBoard/utils";
import {useMutation, useQuery} from "@vue/apollo-composable";
import dayjs from "dayjs";
import DataSource from "devextreme/data/data_source";
import {FocusedRowChangedEvent, FocusedRowChangingEvent} from "devextreme/ui/data_grid";
import cloneDeep from "lodash/cloneDeep";
import {inject, provide, reactive, ref, watch} from "vue";
import Classification from "./Classification.vue";
import InfoToolTip from "@/components/common/InfoToolTip.vue";

const rangeDate = ref([parseInt(dayjs().subtract(1, "year").format("YYYYMMDD")), parseInt(dayjs().format("YYYYMMDD"))])
const dataRowCompany = ref<DataCompanyTab3 | null>(null)

const dataRow = inject(DataRowKey)
const openRow = inject(OpenRowKey)

const gridRef = ref()
const dataSource: any = ref([])
const filesUpload = ref([])
const state = reactive({
  isLoadingUpload: false,
  isModalPreview: false,
  isModalTab3Plus: false,
  isModalHistory: false,
  isNewRow: false,
  trigger: true,
  triggerDetail: false,
  classification: ClassificationEnum.MAJOR_INSURANCE
})
const expresstionTypes = reactive({
  expresstionType2: true,
  expresstionType3: true,
})
interface FilterSearch {
  includeDeletion: boolean,
  startWriteDate: number,
  finishWriteDate: number,
  expresstionTypes?: number[]
}
const filterSearch: FilterSearch = reactive({
  includeDeletion: false,
  startWriteDate: rangeDate.value[0],
  finishWriteDate: rangeDate.value[1],
  expresstionTypes: [2, 3]
})
const dataHistory = reactive({
  companyId: 0,
  messageId: 0
})
const listImagePreview = ref({
  index: 0,
  files: [],
})
const inputChatRef = ref()
const rowEdit: RowEditDefault = reactive(rowEditDefault)
const focusRowKey: any = ref(dataRow?.value?.messageId || null)
const focusRowIndex = ref(dataRow?.value?.messageId ? -1 : 0)
const selectRowKeyAction = ref(0)
const previousRowData = ref()
watch(() => dataRow?.value?.messageId, (value) => {
  focusRowKey.value = value
})

// get all admin notification messages
const { onResult, onError, loading, refetch } = useQuery(searchAdminInquiryMessages, {
  filter: filterSearch
}, () => ({
  fetchPolicy: "no-cache",
  enabled: state.trigger
}))
onResult((result) => {
  dataSource.value = new DataSource({
    store: {
      type: "array",
      data: result?.data?.searchAdminInquiryMessages || [],
      key: "messageId",
    },
  });
  state.isNewRow = false
  state.trigger = false
})
onError((error) => {
  console.log(error)
})
const queryDetail = reactive({
  messageId: 0,
  companyId: 0
})
const { onResult: onResultDetail, onError: onErrorDetail, loading: loadingDetail, refetch: refetchDetail } = useQuery(getAdminInquiryMessage,
  queryDetail, () => ({
    fetchPolicy: "no-cache",
    enabled: state.triggerDetail
  }))
onResultDetail((result) => {
  messageDetail.value = result?.data?.getAdminInquiryMessage
  previousRowData.value = cloneDeep(result?.data?.getAdminInquiryMessage)
  state.triggerDetail = false
})
onErrorDetail((error) => {
  console.log(error)
})

// get all admin notification messages logs
const openLogs = (data: any) => {
  state.isModalHistory = true
  dataHistory.companyId = data.company.id
  dataHistory.messageId = data.messageId
}
const messageDetail = ref<MessageDetailAnswer | null>(null)
const showAddModal = () => {
  if (rowEdit.isEdit) {
    deletePopup({
      message: Message.getCommonMessage('301').message,
      okText: '네',
      callback: () => {
        cancelEdit()
        state.isModalTab3Plus = true
      },
      cancelFn: () => { },
      icon: false
    })
  } else state.isModalTab3Plus = true
}
const closeModal = (e: boolean) => {
  if (e && dataRowCompany.value) {
    dataSource.value?.store().insert(cloneDeep({
      ...messageTab3,
      company: dataRowCompany.value,
      companyId: dataRowCompany.value.id,
    })).then((result: any) => {
      gridRef.value.instance?.refresh()
      focusRowKey.value = result?.messageId
      messageDetail.value = cloneDeep(result)
      state.isNewRow = true
    });
  }
  state.isModalTab3Plus = false
}
const onFocusedRowChanging = (e: FocusedRowChangingEvent) => {
  const rowElement = document.querySelector(`[aria-rowindex="${e.newRowIndex + 1}"]`)
  selectRowKeyAction.value = e.rows[e.newRowIndex].key;
  if (state.isNewRow) {
    rowElement?.classList.add("dx-state-hover-custom")
    deletePopup({
      message: Message.getCommonMessage('301').message,
      okText: '네',
      callback: () => {
        dataSource.value?.store().remove(0)
        state.isNewRow = false
        focusRowKey.value = selectRowKeyAction.value
        gridRef.value.instance?.refresh()
      },
      cancelFn: () => {
        rowElement?.classList.remove("dx-state-hover-custom")
      },
      icon: false
    })
    e.cancel = true
  } else {
    if (rowEdit.isEdit) {
      rowElement?.classList.add("dx-state-hover-custom")
      e.cancel = true
      deletePopup({
        message: Message.getCommonMessage('301').message,
        okText: '네',
        callback: () => {
          dataSource.value?.store().remove(0)
          state.isNewRow = false
          focusRowKey.value = selectRowKeyAction.value
          gridRef.value.instance?.refresh()
          cancelEdit()
        },
        cancelFn: () => {
          rowElement?.classList.remove("dx-state-hover-custom")
        },
        icon: false
      })
    }
  }
}
const onFocusedRowChanged = (e: FocusedRowChangedEvent) => {
  if (e.row?.data) {
    if (!state.isNewRow) {
      queryDetail.messageId = e.row.data.messageId
      queryDetail.companyId = e.row.data.companyId
      state.triggerDetail = true
    }
    // messageDetail.value = cloneDeep(e.row.data)
    // previousRowData.value = cloneDeep(e.row.data);
    if (openRow) openRow(e.row.data)
  }
}

const {
  mutate: mutateUpdateAnswerToInquiryMessage,
  onDone: onDoneUpdateAnswerToInquiryMessage,
  onError: onErrorUpdateAnswerToInquiryMessage,
  loading: loadingUpdateAnswerToInquiryMessage
} = useMutation(updateAnswerToInquiryMessage)
onDoneUpdateAnswerToInquiryMessage((result) => {
  if (result) {
    state.triggerDetail = true
    // messageDetail.value = result.data.updateNotificationMessage
    cancelEdit()
    notification("success", Message.getCommonMessage('106').message);
  }
})
onErrorUpdateAnswerToInquiryMessage((error) => {
  notification('error', error.message)
})

const {
  mutate: mutateUpdateInquiryMessage,
  onDone: onDoneUpdateInquiryMessage,
  onError: onErrorUpdateInquiryMessage,
  loading: loadingUpdateInquiryMessage
} = useMutation(updateInquiryMessage)
onDoneUpdateInquiryMessage((result) => {
  if (result) {
    state.triggerDetail = true
    // messageDetail.value = result.data.updateNotificationMessage
    cancelEdit()
    notification("success", Message.getCommonMessage('106').message);
  }
})
onErrorUpdateInquiryMessage((error) => {
  notification('error', error.message)
})

const {
  mutate: mutateCreate,
  onDone: onDoneCreate,
  onError: onErrorCreate,
  loading: loadingCreate
} = useMutation(createAnswerToInquiryMessage)
onDoneCreate((result) => {
  if (result) {
    focusRowKey.value = result.data.createAnswerToInquiryMessage.messageId
    state.isNewRow = false
    queryDetail.messageId = result.data.createAnswerToInquiryMessage.messageId
    queryDetail.companyId = result.data.createAnswerToInquiryMessage.companyId
    state.triggerDetail = true
    state.trigger = true
    cancelEdit()
    notification("success", Message.getCommonMessage('106').message);
  }
})
onErrorCreate((error) => {
  notification('error', error.message)
})
const {
  mutate: mutateDelete,
  onDone: onDoneDelete,
  onError: onErrorDelete,
  loading: loadingDelete
} = useMutation(deleteNotificationMessage)
onDoneDelete((result) => {
  if (result) {
    refetch()
    notification("success", Message.getCommonMessage('402').message);
  }
})
onErrorDelete((error) => {
  console.log('%c error', 'color: red', error)
  notification('error', error.message)
})

const {
  mutate: mutateDeleteImage,
  onDone: onDoneDeleteImage,
  onError: onErrorDeleteImage,
  loading: loadingDeleteImage
} = useMutation(deleteInquiryMessage)
onDoneDeleteImage((result) => {
  if (result) {
    state.triggerDetail = true
    notification("success", Message.getCommonMessage('402').message);
  }
})
onErrorDeleteImage((error) => {
  console.log('%c error', 'color: red', error)
  notification('error', error.message)
})

// add image addAttachedFileOfInquiryMessage
const {
  mutate: mutateAddImageInquiryMessage,
  onDone: onDoneAddImageInquiryMessage,
  onError: onErrorAddImageInquiryMessage,
  loading: loadingAddImageInquiryMessage
} = useMutation(addAttachedFileOfInquiryMessage)
onDoneAddImageInquiryMessage((result) => {
  if (result) {
    // notification("success", Message.getCommonMessage('402').message);
  }
})
onErrorAddImageInquiryMessage((error) => {
  console.log('%c error', 'color: red', error)
  notification('error', error.message)
})

// add image
const {
  mutate: mutateAddImageAnswerToInquiryMessage,
  onDone: onDoneAddImageAnswerToInquiryMessage,
  onError: onErrorAddImageAnswerToInquiryMessage,
  loading: loadingAddImageAnswerToInquiryMessage
} = useMutation(addAttachedFileOfAnswerToInquiryMessage)
onDoneAddImageAnswerToInquiryMessage((result) => {
  if (result) {
    // notification("success", Message.getCommonMessage('402').message);
  }
})
onErrorAddImageAnswerToInquiryMessage((error) => {
  console.log('%c error', 'color: red', error)
  notification('error', error.message)
})

// add image addAttachedFileOfInquiryMessage
const {
  mutate: mutateDeleteImageInquiryMessage,
  onDone: onDoneDeleteImageInquiryMessage,
  onError: onErrorDeleteImageInquiryMessage,
  loading: loadingDeleteImageInquiryMessage
} = useMutation(deleteAttachedFileOfInquiryMessage)
onDoneDeleteImageInquiryMessage((result) => {
  if (result) {
    state.triggerDetail = true
    notification("success", Message.getCommonMessage('402').message);
  }
})
onErrorDeleteImageInquiryMessage((error) => {
  console.log('%c error', 'color: red', error)
  notification('error', error.message)
})

// add image
const {
  mutate: mutateDeleteImageAnswerToInquiryMessage,
  onDone: onDoneDeleteImageAnswerToInquiryMessage,
  onError: onErrorDeleteImageAnswerToInquiryMessage,
  loading: loadingDeleteImageAnswerToInquiryMessage
} = useMutation(deleteAttachedFileOfAnswerToInquiryMessage)
onDoneDeleteImageAnswerToInquiryMessage((result) => {
  if (result) {
    state.triggerDetail = true
    notification("success", Message.getCommonMessage('402').message);
  }
})
onErrorDeleteImageAnswerToInquiryMessage((error) => {
  console.log('%c error', 'color: red', error)
  notification('error', error.message)
})
const submitChat = () => {
  console.log('%c syb', 'color: red', rowEdit.isEdit)
  if (rowEdit.isEdit) {
    editChat()
  } else {
    console.log('%c vao day ', 'color: red',)
    addChat()
  }
}

function addChat() {
  console.log('%c add chat', 'color: red',)
  if (state.isLoadingUpload || (!rowEdit.content.trim() && !filesUpload.value.length)) return
  let fileStorageIds = null
  if (filesUpload.value.length) {
    fileStorageIds = filesUpload.value.map((file: any) => parseInt(file.id))
  }
  mutateCreate({
    companyId: messageDetail.value!.companyId,
    messageId: messageDetail.value!.messageId,
    input: {
      answer: rowEdit.content.trim(),
      answerFileStorageIds: fileStorageIds
    }
  })
}

function editChat() {
  if (state.isLoadingUpload || (!rowEdit.content.trim() && !filesUpload.value.length)) return
  if (rowEdit.type === TypeEditMessage.QUESTION) {
    mutateUpdateInquiryMessage({
      companyId: messageDetail.value!.companyId,
      messageId: messageDetail.value!.messageId,
      input: {
        classification: messageDetail.value!.classification,
        secret: messageDetail.value!.secret,
        content: rowEdit.content.trim()
      }
    })
  } else {
    mutateUpdateAnswerToInquiryMessage({
      companyId: messageDetail.value!.companyId,
      messageId: messageDetail.value!.messageId,
      input: {
        answer: rowEdit.content.trim(),
      }
    })
  }
}
const updateImage = (files: any) => {
  if (filesUpload) {
    let response;
    if (rowEdit.type === TypeEditMessage.QUESTION) {
      response = files.map((file: any) => {
        return mutateAddImageInquiryMessage({
          companyId: messageDetail.value!.companyId,
          messageId: messageDetail.value!.messageId,
          fileStorageId: parseInt(file.id),
        })
      })
    } else {
      response = files.map((file: any) => {
        return mutateAddImageAnswerToInquiryMessage({
          companyId: messageDetail.value!.companyId,
          messageId: messageDetail.value!.messageId,
          answerFileStorageId: parseInt(file.id),
        })
      })
    }
    Promise.all(response).then((result) => {
      if (result) {
        state.triggerDetail = true
        cancelEdit()
        notification("success", Message.getCommonMessage('106').message);
      }
    })
  }
  // state.trigger = true
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
  state.isModalPreview = true
}
const isImgLink = (url: any) => {
  if (typeof url !== 'string') return false;
  return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|webp)(\?(.*))?$/gmi) !== null);
}

const handleDeleteMessage = (messageDetail: any) => {
  deletePopup({
    callback: () => {
      mutateDelete({
        companyId: messageDetail.companyId,
        messageId: messageDetail.messageId
      })
    },
    message: Message.getCommonMessage("303").message,
    cancelText: Message.getCommonMessage("303").no,
    okText: Message.getCommonMessage("303").yes,
  })
}
const handleDeleteMessageImage = (fileStorageId: number) => {
  deletePopup({
    callback: () => {
      if (rowEdit.type === TypeEditMessage.QUESTION) {
        mutateDeleteImageInquiryMessage({
          companyId: messageDetail.value!.companyId,
          messageId: messageDetail.value!.messageId,
          fileStorageId
        })
      } else {
        mutateDeleteImageAnswerToInquiryMessage({
          companyId: messageDetail.value!.companyId,
          messageId: messageDetail.value!.messageId,
          fileStorageId
        })
      }
    },
    message: Message.getCommonMessage("303").message,
    cancelText: Message.getCommonMessage("303").no,
    okText: Message.getCommonMessage("303").yes,
  })
}
const handleEditMessage = (row: any, type: TypeEditMessage) => {
  console.log('%c row', 'color: red',row)
  rowEdit.type = type
  if (type === TypeEditMessage.QUESTION) {
    rowEdit.content = row.content
    rowEdit.files = row.fileStorages
  } else {
    rowEdit.content = row.answer
    rowEdit.files = row.answerFileStorages
  }
  rowEdit.isEdit = true
}
const openLinkDownFile = (link: string) => {
  window.open(link, '_blank')
}

const chooseCompany = (data: DataCompanyTab3) => {
  dataRowCompany.value = data
}
provide(OpenRowCompanyTab3, chooseCompany)
provide(DataCompanyTab3, dataRowCompany)

const refetchDataTab2 = () => {
  filterSearch.startWriteDate = rangeDate.value[0]
  filterSearch.finishWriteDate = rangeDate.value[1]
  if (expresstionTypes.expresstionType2 || expresstionTypes.expresstionType3) {
    filterSearch.expresstionTypes = []
    if (expresstionTypes.expresstionType2) {
      filterSearch.expresstionTypes.push(2)
    }
    if (expresstionTypes.expresstionType3) {
      filterSearch.expresstionTypes.push(3)
    }
  } else {
    delete filterSearch.expresstionTypes
  }
  state.trigger = true
}
defineExpose({
  refetchDataTab2
})
</script>

<style lang="scss" scoped>
@import "./../styles";
</style>
