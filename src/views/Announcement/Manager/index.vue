<template>
  <action-header title="기타소득자등록" @actionSave="false" buttonSearch @actionSearch="searching" />
  <a-row>
    <a-col :span="14">
      <a-spin :spinning="loading">
        <standard-form ref="formRef">
          <DxDataGrid ref="gridRef" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                      key-expr="id" :show-borders="true" :allow-column-resizing="true" :focused-row-enabled="true"
                      :column-auto-width="true" :loadPanel="false" :focused-row-key="focusRowKey"
                      @focused-row-changing="onFocusedRowChanging" @focused-row-changed="onFocusedRowChanged"
                      :focused-row-index="focusRowIndex" noDataText="내역이 없습니다" style="height: calc(100vh - 140px);">
            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
            <DxExport :enabled="true" />
            <DxToolbar>
              <DxItem location="after" template="search" />
              <DxItem location="after" template="button-template" css-class="cell-button-add" />
              <DxItem location="after" name="searchPanel" cssClass="search-panel" />
              <DxItem location="after" name="exportButton" css-class="cell-button-export" />
            </DxToolbar>
            <template #search>
              <div class="d-flex-center gap-20">
                <a-form-item label="작성기간 (최대 3년)">
                  <range-date-time-box v-model:valueDate="rangeDate" width="250px" :multi-calendars="true"
                                       :max-range="90" :required="true" />
                </a-form-item>
                <div class="d-flex-center">
                  <checkbox-basic label="삭제 포함" v-model:valueCheckbox="filterSearch.includeDeletion" />
                </div>
              </div>
            </template>
            <template #button-template>
              <a-tooltip placement="top" title="공지 신규 등록">
                <div>
                  <DxButton icon="plus" @click="addRow" :disabled="state.isNewRow" />
                </div>
              </a-tooltip>
            </template>
            <DxColumn caption="삭제 여부" data-field="active" alignment="center" cell-template="active" width="80px" />
            <DxColumn caption="구분" data-field="expresstionType" alignment="center" cell-template="expresstionType" />
            <DxColumn caption="상단고정" data-field="sticky" alignment="center" cell-template="sticky" width="80px" />
            <DxColumn caption="내용" data-field="content" alignment="left" />
            <DxColumn caption="작성자" data-field="writerCompactUser.name" alignment="center" />
            <DxColumn caption="작성일시" data-field="writedAt" data-type="date" format="yyyy-MM-dd HH:mm:ss" alignment="center" width="140px" />
            <DxColumn caption="" alignment="center" cell-template="action" />
            <template #active="{ data }">
              <div v-if="!data.data.active">
                <a-tag color="#DC5939">삭제</a-tag>
              </div>
            </template>
            <template #expresstionType="{ data }">
              <ExpressionType :is-select="false" :value-select="data.data.expresstionType" />
            </template>
            <template #sticky="{ data }">
              <PushpinOutlined v-if="data.data.sticky" />
            </template>
            <template #action="{ data }">
              <a-tooltip>
                <template #title>변경이력</template>
                <HistoryOutlined style="font-size: 18px; margin-left: 5px" @click="openLogs(data.data)" />
              </a-tooltip>
            </template>
          </DxDataGrid>
        </standard-form>

      </a-spin>
    </a-col>
    <a-col :span="10">
      <a-spin :spinning="loadingDetail || loadingUpdate || loadingAddImage || loadingCreate || loadingDeleteImage || loadingDeleteNoticeMessage">
        <div class="form-container pl-10 pt-8">
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
                          <ExpressionType :is-select="false" :value-select="messageDetail.expresstionType" />
                        </div>
                        <div class="form-chat-timeline-content-info-user-name">
                          {{
                            messageDetail.writerCompactUser.name || userInfo.name
                          }}
                        </div>
                      </div>
                      <div class="form-chat-timeline-content-info-time">
                        {{ dayjs(messageDetail.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
                      </div>
                      <div v-if="messageDetail.active && messageDetail?.id !== 0" class="ml-10">
                        <DxButton type="ghost" @click="handleEditMessage(messageDetail)" :disabled="rowEdit.isEdit">
                          <EditOutlined />
                        </DxButton>
                        <DxButton type="ghost" @click="handleDeleteMessage(messageDetail)">
                          <DeleteOutlined />
                        </DxButton>
                      </div>
                    </div>
                    <div v-if="messageDetail.createdAt < messageDetail.updatedAt" class="edited">Edited</div>
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
              </div>
              <div v-else class="no-data">내역이 없습니다</div>
            </div>
            <div class="form-chat-bottom" v-if="rowEdit.isEdit || state.isNewRow">
              <div class="form-chat-bottom-category">
                <StatusChat with="150" :valueSelect="5" disabled />
                <span class="form-chat-bottom-category-text">
                  <checkbox-basic label="삭제 포함" v-model:valueCheckbox="state.sticky" />
                </span>
                <info-tool-tip>선택시 소통판에서 최우선하여 정렬됩니다</info-tool-tip>
              </div>
              <InputChat v-model:content="rowEdit.content" v-model:files="filesUpload"
                         :placeholder="'글작성 (최대 1,000자)'"
                         :disabled="state.isLoadingUpload || dataSource.length === 0" @submitChat="submitChat"
                         :isNewRow="state.isNewRow" :isEdit="rowEdit.isEdit || messageDetail?.id === 0" @cancel="cancelEdit"
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
  <HistoryPopup :modalStatus="state.isModalHistory" @closePopup="state.isModalHistory = false" title="변경이력"
                :idRowEdit="null" typeHistory="getNoticeMessageLogs" :data="dataHistory" />
</template>

<script setup lang="ts">
import {
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  FileTextOutlined,
  HistoryOutlined,
  PushpinOutlined
} from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import {DxColumn, DxDataGrid, DxExport, DxItem, DxSearchPanel, DxToolbar} from "devextreme-vue/data-grid";

import ExpressionType from "@/components/common/ExpressionType.vue";
import {Message} from "@/configs/enum";
import {
  addAttachedFileOfNoticeMessage,
  createNoticeMessage,
  deleteAttachedFileOfNoticeMessage,
  deleteNoticeMessage,
  updateNoticeMessage
} from "@/graphql/mutations/BF/Announcement-manager";
import {getAdminNoticeMessage, searchAdminNoticeMessages} from "@/graphql/queries/BF/Announcement-manager";
import deletePopup from "@/utils/deletePopup";
import notification from "@/utils/notification";
import MarkdownCustom from "@/views/AC/AC1/AC130/components/MarkdownCustom.vue";
import ModalPreviewListImage from "@/views/AC/AC1/AC130/components/ModalPreviewListImage.vue";
import StatusChat from "@/views/AC/AC1/AC130/components/StatusChat.vue";
import InputChat from "@/views/CommunicationBoard/components/InputChat.vue";
import {rowEditDefault} from "@/views/CommunicationBoard/utils";
import {useMutation, useQuery} from "@vue/apollo-composable";
import dayjs from "dayjs";
import DataSource from "devextreme/data/data_source";
import {FocusedRowChangedEvent, FocusedRowChangingEvent} from "devextreme/ui/data_grid";
import cloneDeep from "lodash/cloneDeep";
import {computed, reactive, ref} from "vue";
import {useStore} from "vuex";
import {NoticeMessage} from "@/views/Announcement/Manager/type";
import {noticeDefault} from "@/views/Announcement/Manager/utils";
import InfoToolTip from "@/components/common/InfoToolTip.vue";

const store = useStore()
const userInfo = computed(() => store.state.auth.userInfor);

const rangeDate = ref([parseInt(dayjs().subtract(1, "year").add(1, "day").format("YYYYMMDD")), parseInt(dayjs().add(1, "day").format("YYYYMMDD"))])

const formRef = ref()
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
  sticky: false,
})
const filterSearch = reactive({
  includeDeletion: false,
  startWriteDate: rangeDate.value[0],
  finishWriteDate: rangeDate.value[1],
})
const dataHistory = reactive({
  messageId: 0
})
const listImagePreview = ref({
  index: 0,
  files: [],
})
const rowEdit = reactive(cloneDeep(rowEditDefault))
const focusRowKey: any = ref(null)
const focusRowIndex = ref(0)
const selectRowKeyAction = ref(0)
const previousRowData = ref()

// get all admin notification messages
const { onResult, onError, loading, refetch } = useQuery(searchAdminNoticeMessages, {
  filter: filterSearch
}, () => ({
  fetchPolicy: "no-cache",
  enabled: state.trigger
}))
onResult((result) => {
  dataSource.value = new DataSource({
    store: {
      type: "array",
      data: result?.data?.searchAdminNoticeMessages || [],
      key: "id",
    },
  });
  state.isNewRow = false
  state.trigger = false
  if (result?.data?.searchAdminNoticeMessages.length === 0) {
    messageDetail.value = null
  }
})
onError((error) => {
  console.log(error)
})
const queryDetail = reactive({
  messageId: 0
})
const { onResult: onResultDetail, onError: onErrorDetail, loading: loadingDetail } = useQuery(getAdminNoticeMessage,
  queryDetail, () => ({
    fetchPolicy: "no-cache",
    enabled: state.triggerDetail
  }))
onResultDetail((result) => {
  messageDetail.value = result?.data?.getAdminNoticeMessage
  previousRowData.value = cloneDeep(result?.data?.getAdminNoticeMessage)
  state.sticky = result?.data?.getAdminNoticeMessage?.sticky
  state.triggerDetail = false
})
onErrorDetail((error) => {
  console.log(error)
})

// get all admin notification messages logs
const openLogs = (data: any) => {
  state.isModalHistory = true
  dataHistory.messageId = data.id
}
const messageDetail = ref<NoticeMessage | null>(null)
const addNewRow = () => {
  dataSource.value?.store().insert(cloneDeep(noticeDefault)).then((result: any) => {
    gridRef.value.instance?.refresh()
    focusRowKey.value = result?.id
    messageDetail.value = cloneDeep(result)
    state.sticky = result.sticky
    state.isNewRow = true
  });
}
const addRow = () => {
  if (rowEdit.isEdit) {
    deletePopup({
      message: Message.getCommonMessage('301').message,
      okText: '네',
      callback: () => {
        cancelEdit()
        addNewRow()
      },
      cancelFn: () => { },
      icon: false
    })
  } else {
    addNewRow()
  }
}
const onFocusedRowChanging = (e: FocusedRowChangingEvent) => {
  const rowElement = document.querySelector(`[aria-rowindex="${e.newRowIndex + 1}"]`)
  selectRowKeyAction.value = e.rows[e.newRowIndex].key;
  if (focusRowKey.value !== e.rows[e.newRowIndex].key) {
    if (state.isNewRow || filesUpload.value.length > 0) {
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
}
const onFocusedRowChanged = (e: FocusedRowChangedEvent) => {
  if (e.row?.data) {
    if (!state.isNewRow) {
      focusRowKey.value = e.row.data.id
      queryDetail.messageId = e.row.data.id
      state.triggerDetail = true
    }
  }
}

const {
  mutate: mutateUpdate,
  onDone: onDoneUpdate,
  onError: onErrorUpdate,
  loading: loadingUpdate
} = useMutation(updateNoticeMessage)
onDoneUpdate((result) => {
  if (result) {
    state.trigger = true
    state.triggerDetail = true
    // messageDetail.value = result.data.updateNoticeMessage
    cancelEdit()
    notification("success", Message.getCommonMessage('106').message);
  }
})
onErrorUpdate((error) => {
  notification('error', error.message)
})

const {
  mutate: mutateCreate,
  onDone: onDoneCreate,
  onError: onErrorCreate,
  loading: loadingCreate
} = useMutation(createNoticeMessage)
onDoneCreate((result) => {
  if (result) {
    focusRowKey.value = result.data.createNoticeMessage.id
    state.isNewRow = false
    queryDetail.messageId = result.data.createNoticeMessage.id
    state.trigger = true
    state.triggerDetail = true
    cancelEdit()
    notification("success", Message.getCommonMessage('106').message);
  }
})
onErrorCreate((error) => {
  notification('error', error.message)
})
const {
  mutate: mutateDeleteNoticeMessage,
  onDone: onDoneDeleteNoticeMessage,
  onError: onErrorDeleteNoticeMessage,
  loading: loadingDeleteNoticeMessage
} = useMutation(deleteNoticeMessage)
onDoneDeleteNoticeMessage((result) => {
  if (result) {
    state.trigger = true
    notification("success", Message.getCommonMessage('402').message);
  }
})
onErrorDeleteNoticeMessage((error) => {
  console.log('%c error', 'color: red', error)
  notification('error', error.message)
})

const {
  mutate: mutateDeleteImage,
  onDone: onDoneDeleteImage,
  onError: onErrorDeleteImage,
  loading: loadingDeleteImage
} = useMutation(deleteAttachedFileOfNoticeMessage)
onDoneDeleteImage((result) => {
  if (result) {
    state.triggerDetail = true
    rowEdit.files = result.data.deleteAttachedFileOfNoticeMessage.fileStorages
    notification("success", Message.getCommonMessage('402').message);
  }
})
onErrorDeleteImage((error) => {
  console.log('%c error', 'color: red', error)
  notification('error', error.message)
})

// add image
const {
  mutate: mutateAddImage,
  onDone: onDoneAddImage,
  onError: onErrorAddImage,
  loading: loadingAddImage
} = useMutation(addAttachedFileOfNoticeMessage)
onDoneAddImage((result) => {
  if (result) {
    rowEdit.files = result.data.addAttachedFileOfNoticeMessage.fileStorages
    // notification("success", Message.getCommonMessage('402').message);
  }
})
onErrorAddImage((error) => {
  console.log('%c error', 'color: red', error)
  notification('error', error.message)
})
const submitChat = () => {
  if (rowEdit.isEdit) {
    editChat()
  } else {
    addChat()
  }
}

function addChat() {
  if (state.isLoadingUpload || (!rowEdit.content.trim() && !filesUpload.value.length)) return
  let fileStorageIds = null
  if (filesUpload.value.length) {
    fileStorageIds = filesUpload.value.map((file: any) => parseInt(file.id))
  }
  mutateCreate({
    input: {
      content: rowEdit.content.trim(),
      sticky: state.sticky,
      fileStorageIds
    }
  })
}

function editChat() {
  if (state.isLoadingUpload || (!rowEdit.content.trim() && !filesUpload.value.length)) return
  mutateUpdate({
    messageId: messageDetail.value!.id,
    input: {
      content: rowEdit.content.trim(),
      sticky: state.sticky,
    }
  })
}
const updateImage = (files: any) => {
  if (filesUpload) {
    const response = files.map((file: any) => {
      return mutateAddImage({
        messageId: messageDetail.value!.id,
        fileStorageId: parseInt(file.id),
      })
    })
    Promise.all(response).then((result) => {
      if (result) {
        state.triggerDetail = true
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
      mutateDeleteNoticeMessage({
        messageId: messageDetail.id
      })
    },
    message: `본 글을 삭제하시겠습니까?`,
    cancelText: `아니오`,
    okText: `네. 삭제합니다`,
  })
}
const handleDeleteMessageImage = (fileStorageId: number) => {
  deletePopup({
    callback: () => {
      mutateDeleteImage({
        messageId: messageDetail.value!.id,
        fileStorageId
      })
    },
    message: Message.getCommonMessage("303").message,
    cancelText: Message.getCommonMessage("303").no,
    okText: Message.getCommonMessage("303").yes,
  })
}
const handleEditMessage = (row: any) => {
  rowEdit.content = row.content
  rowEdit.isEdit = true
  rowEdit.id = row.id
  rowEdit.files = row.fileStorages
}
const openLinkDownFile = (link: string) => {
  window.open(link, '_blank')
}
const searching = () => {
  if (rangeDate){
    filterSearch.startWriteDate = rangeDate.value[0]
    filterSearch.finishWriteDate = rangeDate.value[1]
  }
  state.trigger = true
}
</script>

<style lang="scss" scoped>
@import "./styles.scss";
</style>
