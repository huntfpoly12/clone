<template>
  <div class="form-chat">
    <div class="form-chat-header">
      <span class="form-chat-header-title">회계마감 관리사항</span>
      <ReloadOutlined class="form-chat-header-btnReload" @click="refreshForm"/>
    </div>
    <div ref="formTimeline" class="form-chat-timeline">
      <div v-for="(items, index) in listChat" :key="index" :id="items.createdAt">
        <div class="form-chat-timeline-line mb-10"
          :class="{ 'form-chat-timeline-line-short': index > 0 && listChat[index - 1].writerUser.id === items.writerUser.id }">
        </div>
        <div class="form-chat-timeline-common">
          <div class="form-chat-timeline-avatar">
            <a-badge :dot="true" :offset="[-5, 33]" :status="items.writerUser.id === userId ? 'success' : 'error'"
              :class="{ 'hidden-avatar': index > 0 && listChat[index - 1].writerUser.id === items.writerUser.id }">
              <a-avatar shape="circle" size="large"
                :style="`background-color: ${items.writerUser.id === userId ? '#1890ff' : '#f56a00'}`">{{ items.writerUser.name
                }}</a-avatar>
            </a-badge>
          </div>
          <div class="form-chat-timeline-content">
            <div class="form-chat-timeline-content-info">
              <div class="form-chat-timeline-content-info-user">
                <div class="form-chat-timeline-content-info-user-status">
                  <StatusChat :valueSelect="items.expresstionType" :isSelect="false" />
                </div>
                <!-- <span class="form-chat-timeline-content-info-user-status">{{ items.status }}</span> -->
                <div class="form-chat-timeline-content-info-user-name"
                  :class="{ 'form-chat-timeline-content-info-user-name-login': items.writerUser.id === userId }">{{ items.writerUser.name }}
                </div>
              </div>
              <div class="form-chat-timeline-content-info-time">{{ formatDate(items.createdAt) }}</div>
              <div class="form-chat-timeline-content-info-classification">{{ items.classification }}</div>
            </div>
            <div v-if="itemEditComment?.key !== items.key" class="form-chat-timeline-content-background">
              <div class="form-chat-timeline-content-text">
                <MarkdownCustom :options="{ source: items.content, linkify: true, typographer: true, highlight: true }" />
              </div>
              <div v-if="items?.files && items?.files.length" class="form-chat-timeline-content-files">
                <div class="form-chat-timeline-content-files-preview">
                  <div class="form-chat-timeline-content-files-preview-images">
                    <img
                      v-for="(file, indexFile) in items.files"
                      :key="indexFile" class="form-chat-timeline-content-files-preview-images-image" :src="file.url"
                      alt=""
                      @click="previewImage(items.files, indexFile)">
                    <!-- <img
                      v-for="(file, indexFile) in items.files"
                      :key="indexFile" class="form-chat-timeline-content-files-preview-images-image" :src="file.url"
                      alt=""
                      @click="previewImage(items.files.filter((item: any) => item?.contentType.includes('image/')), indexFile)"> -->
                  </div>
                  <!-- <div class="form-chat-timeline-content-files-preview-images">
                    <img
                      v-for="(file, indexFile) in items.files.filter((item: any) => item?.contentType.includes('image/'))"
                      :key="indexFile" class="form-chat-timeline-content-files-preview-images-image" :src="file.url"
                      alt=""
                      @click="previewImage(items.files.filter((item: any) => item?.contentType.includes('image/')), indexFile)">
                  </div>
                  <div
                    v-for="(file, indexFile) in items.files.filter((item: any) => !item?.contentType.includes('image/'))"
                    :key="indexFile" class="form-chat-timeline-content-files-preview-filetext"
                    @click="openLinkDownFile(file.url)">
                    <FileTextOutlined style="margin-right: 10px; font-size:30px" />
                    <div class="form-chat-timeline-content-files-preview-filetext-info">
                      <p class="form-chat-timeline-content-files-preview-filetext-info-name">{{ file.name }}</p>
                      <p class="form-chat-timeline-content-files-preview-filetext-info-size">({{ formatFileSize(file.size) }})</p>
                    </div>
                  </div> -->
                </div>
              </div>
              <!-- pewview reply -->
              <PreviewReply v-if="Object.keys(!!items?.reply ? items.reply : {}).length" :dataReply="items?.reply || { }"  />
            </div>

            <InputChat v-else ref="inputEditChat" v-model:content="itemEditComment.text"
              :dataReply="itemEditComment?.reply" @removeReply="itemEditComment.reply = {}"
              v-model:files="itemEditComment.files" placeholder="댓글을 입력하세요…" :disabled="isLoadingUpload"
              @submitChat="submitChat" @cancel="cancelEdit(index)" />
          </div>

          <div class="form-chat-timeline-common-menu">
            <a-dropdown :placement="items.writerUser.id === userId ? 'bottomRight' : 'bottomLeft'" :trigger="['click']">
              <EllipsisOutlined :style="{ fontSize: '16px' }" />
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="replyComment(items)" :disabled="itemEditComment?.key || isLoadingUpload || true">
                    <RollbackOutlined />
                    회신하다
                  </a-menu-item>
                  <a-menu-item v-if="items.writerUser.id === userId" @click="editComment(items)"
                    :disabled="itemEditComment?.key || true">
                    <EditOutlined />
                    수정
                  </a-menu-item>
                  <a-menu-item v-if="items.writerUser.id === userId" @click="openComfirmDetele(items)" :disabled="true">
                    <DeleteOutlined />
                    삭제
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </div>
      <div v-if="!!objectChatUploadUpFile && !itemEditComment.key" class="form-chat-timeline-line"></div>
      <div v-if="!!objectChatUploadUpFile && !itemEditComment.key"
        class="form-chat-timeline-common form-chat-timeline-uploading mt-1">
        <div class="form-chat-timeline-content">
          <div class="form-chat-timeline-content-info">
            <div class="form-chat-timeline-content-info-user">
              <span class="form-chat-timeline-content-info-user-status">{{
                objectChatUploadUpFile.status
              }}</span>
              <div class="form-chat-timeline-content-info-user-name form-chat-timeline-content-info-user-name-login">{{
                objectChatUploadUpFile.name }}
              </div>
            </div>
            <div class="form-chat-timeline-content-info-time">{{ formatDate(objectChatUploadUpFile.createdAt) }}</div>
          </div>
          <div class="form-chat-timeline-content-text" v-html="objectChatUploadUpFile.text"></div>
          <div class="form-chat-timeline-content-files">
            <div v-for="(file, index) in objectChatUploadUpFile.files" class="form-chat-timeline-content-files-item"
              :key="index">
              <FileOutlined style="margin-right: 10px;" />
              <div class="form-chat-timeline-content-files-item-info">
                <p class="form-chat-timeline-content-files-item-info-name">{{ file?.file ? file.file.name : file.name }}
                </p>
                <p class="form-chat-timeline-content-files-item-info-size">({{ formatFileSize(file?.file ? file.file.size
                  : file.size) }})
                </p>
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
        <span>회계-마감-({{ currentTime }})</span>
      </div>
      <InputChat ref="inputChat" v-model:content="content" v-model:files="filesUpload"
        :dataReply="itemCommentReply" placeholder="댓글을 입력하세요…" :disabled="isLoadingUpload"
        @removeReply="itemCommentReply = {}" @submitChat="submitChat" />
    </div>
    <ModalPreviewListImage :isModalPreview="isModalPreview" @cancel="isModalPreview = false"
      :listImage="listImagePreview" />
    <PopupMessage :modalStatus="isModalDeleteChat" @closePopup="isModalDeleteChat = false" :typeModal="'confirm'"
      title="Confirm detele" content="" :okText="'네. 삭제합니다'" :cancelText="'아니요'" @checkConfirm="handleConfirmDelete" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, watch, computed, onMounted } from 'vue'
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/AC/AC1/AC130";
import { EllipsisOutlined, EditOutlined, DeleteOutlined, CloseOutlined, FileAddOutlined, FileOutlined, SendOutlined, FileTextOutlined, RollbackOutlined, ReloadOutlined } from '@ant-design/icons-vue';
import { getJwtObject } from "@bankda/jangbuda-common";
import ModalPreviewListImage from './ModalPreviewListImage.vue'
import StatusChat from './StatusChat.vue'
// import picker compopnent
import EmojiPicker from 'vue3-emoji-picker'
// import css
import 'vue3-emoji-picker/css'
import InputChat from './InputChat.vue'
import MarkdownCustom from './MarkdownCustom.vue';
import PreviewReply from './PreviewReply.vue';
import { cloneDeep } from "lodash"
import { dataChat } from '../utils'
export default defineComponent({
  props: {
    payload: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    EllipsisOutlined,
    EditOutlined,
    DeleteOutlined,
    CloseOutlined,
    FileOutlined,
    FileAddOutlined,
    FileTextOutlined,
    RollbackOutlined,
    SendOutlined,
    ModalPreviewListImage,
    EmojiPicker,
    StatusChat,
    InputChat,
    MarkdownCustom,
    PreviewReply,
    ReloadOutlined
  },
  setup(props, { emit }) {
    const token = ref(sessionStorage.getItem("token"))
    let jwtObject = getJwtObject(token.value!);
    const userName = ref(sessionStorage.getItem("name"));
    const userId = jwtObject.userId
    let firstLoadData = ref(true)
    const inputFile = ref<any>()
    let content = ref('')
    let isModalPreview = ref(false)
    let isModalDeleteChat = ref(false)
    const formTimeline: any = ref()
    let itemEditComment = ref<any>({
      key: null,
      text: '',
      files: [],
    })
    let itemCommentReply = ref<any>({})
    let filesUpload: any = ref([])
    let listFileUploadHandleLoading: any = ref([])
    let listImageUpload: any = ref([])
    let isLoadingUpload = ref(false)
    let isProcessingDeleteUpdate = ref(false)
    const inputChat: any = ref()
    const inputEditChat = ref()
    let payload: any = ref({
      name: userName.value,
      avatar: '',
      text: '',
      files: [],
      createdAt: new Date().getTime(),
      userId: jwtObject.userId,
      reply: {}
    })
    const objectChatUploadUpFile: any = ref(null)
    const listChat = ref<any>([])
    let listImagePreview: any = ref({
      index: 0,
      files: [],
    })
    let itemDetele: any = ref()
    let itemOriginEdit: any = ref()


    watch(() => props.data, (value) => {
      if(value.length) {
        listChat.value = [...value]
        nextTick(() => {
          formTimeline.value.scrollTop = 10000000
        })
      }
    }, { 
      deep: true,
      immediate: true
    })

    const {
      mutate: createAccountingClosingMessage,
      onDone: doneCreateAccountingClosingMessage,
      onError: errorCreateAccountingClosingMessage,
      loading: loadingcreateAccountingClosingMessage,
    } = useMutation(mutations.createAccountingClosingMessage);
    doneCreateAccountingClosingMessage((newMessage) => {
      inputChat.value.resetInputChat()
      isLoadingUpload.value = false
      listChat.value.push(newMessage.data.createAccountingClosingMessage)
      nextTick(() => {
        formTimeline.value.scrollTop = 10000000
      })
    })
    errorCreateAccountingClosingMessage(e => {
      isLoadingUpload.value = false
      console.log('errorCreateAccountingClosingMessage', e);
    })


    const date = new Date()
    const currentTime = date.getFullYear() + '-' + ((date.getMonth() + 1) < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))

    const submitChat = () => {
      if (isLoadingUpload.value || isProcessingDeleteUpdate.value || !content.value.trim()) return
      isLoadingUpload.value = true
      let fileStorageIds = null
      if(filesUpload.value.length) {
        fileStorageIds = filesUpload.value.map((file: any) => parseInt(file.id))
      }
      createAccountingClosingMessage({
        ...props.payload,
        input: {
          content: content.value.trim(),
          fileStorageIds
        }
      })
    };

    // const sendChat = () => {
    //   if (listFileUploadHandleLoading.value.length) {
    //     payload.value = {
    //       ...payload.value,
    //       files: listImageUpload.value
    //     }
    //     content.value = "";
    //     listImageUpload.value = []
    //     listFileUploadHandleLoading.value = []
    //   }
    //   if (itemEditComment.value.key === null) {
    //     listChat.value.push({...payload.value, key: payload.value.createdAt.toString()})

    //     nextTick(() => {
    //         itemCommentReply.value = {}
    //         objectChatUploadUpFile.value = null
    //         isLoadingUpload.value = false
    //         formTimeline.value.scrollTop = 10000000
    //         inputChat.value.resetInputChat()
    //     })
    //   } else {
    //     const updates: any = {};
    //     if (!Object.keys(itemEditComment.value?.reply || {}).length) {
    //       delete itemEditComment.value.reply
    //     }
    //     const payloadEdit = { ...itemEditComment.value, ...payload.value }
    //     const index = listChat.value.findIndex((chat: any) => chat.key === payloadEdit.key)
    //     listChat.value[index] = {...payloadEdit}
    //     nextTick(() => {
    //       itemEditComment.value = {
    //           key: null,
    //           text: '',
    //           files: [],
    //         }
    //         isLoadingUpload.value = false
    //     })
    //   }
    //   nextTick(() => {
    //     filesUpload.value = []
    //     objectChatUploadUpFile.value = null
    //     listFileUploadHandleLoading.value = []
    //     inputChat.value.resetInputChat()
    //   })
    // }

    // watch(() => listImageUpload.value, (value) => {
    //   if (value.length && value.length === listFileUploadHandleLoading.value.length) {
    //     sendChat()
    //   }
    // }, {
    //   deep: true,
    // })

    const editComment = (item: any) => {
      itemEditComment.value = { ...item, files: !!item.files ? item.files : [] }
      itemOriginEdit.value = cloneDeep(itemEditComment.value)
      nextTick(() => {
        inputEditChat.value[0].resizeInput()
        inputEditChat.value[0].focus()
      })
    }

    const replyComment = (item: any) => {
      itemCommentReply.value = { ...item }
    }

    const openComfirmDetele = (item: any) => {
      itemDetele.value = { ...item }
      isModalDeleteChat.value = true
    }

    const handleConfirmDelete = (status: boolean) => {
      if (status) {
        const index = listChat.value.findIndex((chat: any) => chat.key === itemDetele.value.key)
        listChat.value.splice(index, 1)

        nextTick(() => {
          itemDetele.value = null
          isProcessingDeleteUpdate.value = false
        })

      } else {
        isModalDeleteChat.value = false
      }
    }

    const formatDate = (timestamp: number) => {
      const date = new Date(timestamp)
      const month = date.getMonth() + 1
      const day = date.getDate()
      const minutes = date.getMinutes().toString()
      return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${date.getHours()}:${minutes.length === 2 ? minutes : '0' + minutes}`
    }

    const uploadFileServer = () => {
      if(filesUpload.value.length) {
        filesUpload.value.forEach((file: any) => {
          if(file?.id) {

          }else {

          }
        })
      }
    }

    const refreshForm = () => {
      inputChat.value.resetInputChat()
      emit('refresh')
    }

    const previewImage = (files: any, index: number) => {
      listImagePreview.value.index = index
      listImagePreview.value.files = files.map((file: any) => file.url)
      isModalPreview.value = true
    }

    const cancelEdit = (indexEdit: number) => {
      listChat.value[indexEdit] = { ...itemOriginEdit.value }
      nextTick(() => {
        itemEditComment.value = {
          key: null,
          text: '',
          files: [],
        }
      })
    }

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1000
      const decimalPoint = 2
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)) + ' ' + sizes[i];
    }

    const openLinkDownFile = (link: string) => {
      window.open(link, '_blank')
    }
    return {
      userName,
      listChat,
      submitChat,
      content,
      formTimeline,
      editComment,
      handleConfirmDelete,
      itemEditComment,
      formatDate,
      inputFile,
      filesUpload,
      isLoadingUpload,
      objectChatUploadUpFile,
      userId,
      isModalPreview,
      previewImage,
      listImagePreview,
      isModalDeleteChat,
      openComfirmDetele,
      currentTime,
      inputChat,
      inputEditChat,
      cancelEdit,
      formatFileSize,
      openLinkDownFile,
      replyComment,
      itemCommentReply,
      refreshForm
    }
  },
})
</script>

<style lang="scss" scoped>
.form-chat {
  height: 100%;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  &-header {
    text-align: center;
    border-bottom: 1px solid rgba(17, 17, 26, 0.1);
    padding: 4px 0;
    position: relative;
    &-title {
      font-size: 20px;
      font-weight: bold;
    }
    &-btnReload {
      position: absolute;
      right: 15px;
      top: 15px;
      cursor: pointer;
    }
  }

  &-timeline {
    flex-grow: 1;
    // height: calc(100% - 40px);
    padding-bottom: 10px;
    padding-top: 2px;
    scroll-behavior: smooth;
    overflow-y: auto;

    &-line {
      margin-top: 20px;
      height: 1px;
      background-color: #e7e6e6;

      &-short {
        margin-left: 52px;
      }
    }

    &-avatar {
      width: 40px;
      height: 40px;
      margin-right: 5px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
      }
    }

    &-common {
      display: flex;
      align-items: flex-start;
      margin-top: 1px;
      position: relative;

      &-menu {
        position: absolute;
        top: 0;
        right: 5px;
        display: none;

        &:hover {
          display: block;
        }
      }

      &:hover {
        .form-chat-timeline-common-menu {
          display: block;
        }
      }
    }

    &-content {
      width: calc(100% - 40px);
      // background-color: #DCE6F2;
      padding: 0 12px 8px 12px;
      position: relative;
      &-files {
        width: 100%;
        background-color: #fff;

        &-preview {
          &-images {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -3px 5px -3px;

            &-image {
              width: 250px;
              height: 250px;
              object-fit: cover;
              display: block;
              padding: 3px;
              cursor: pointer;

              &:hover {
                opacity: .8;
              }
            }
          }

          &-filetext {
            display: flex;
            align-items: center;
            border: 1px solid #d8d7d7;
            width: 400px;
            cursor: pointer;
            overflow: hidden;
            padding: 10px;

            &+& {
              margin-top: 3px;
            }

            &:hover {
              background-color: #fafafa;
            }

            &-info {
              &-name {
                white-space: nowrap;
                margin: 0;
                line-height: 15px;
                font-size: 15px;
              }

              &-size {
                margin: 0;
                color: #A6A6A6;
              }
            }
          }
        }

        &-item {
          display: flex;
          align-items: center;

          &-info {
            p {
              margin: 0;
              line-height: 15px;
            }

            &-size {
              color: #A6A6A6;
            }
          }
        }
      }

      &-info {
        display: flex;
        align-items: center;

        &-user {
          display: flex;
          align-items: center;
          // margin-right: 30px;
          margin-right: 20px;

          &-status {
            // display: inline;
            // padding: 0 10px;
            // border-radius: 5px;
            // border: 1px solid #7f7f7f;
            // background-color: #ffffff;
            // color: #7f7f7f;
            // font-size: 10px;
            margin-right: 5px;
          }

          &-name {
            font-size: 16px;
            white-space: nowrap;
            font-weight: bold;
            color: #333333;
            
            &-login {
              color: #1a73e8;
            }
          }
        }

        &-time {
          color: #bcbcc2ff;
          text-align: end;
          font-size: 11px;
          margin-right: 10px;
        }
        &-classification {
          color: #bcbcc2ff;
          text-align: end;
          font-size: 11px;
        }
      }

      &-background {
        // &:hover {
        //   background-color: #fafafa;
        // }
      }

      &-text {
        word-wrap: break-word;
        white-space: pre-wrap;
        font-size: 15px;
        color: #333333;
      }
    }

    &-uploading {
      margin-left: 40px;
    }
  }

  &-bottom {
    &-category {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
    }
  }
}

.mt-1 {
  margin-top: 1px;
}

.mt-10 {
  margin-top: 10px;
}

.mr-10 {
  margin-right: 10px;
}

.mb-0 {
  margin-bottom: 0 !important;
}

.mb-10 {
  margin-bottom: 10px;
}

.hidden-avatar {
  display: none;
}

.borderRadiusleft10 {
  border-radius: 10px 2px 2px 2px;
}

.borderRadiusRight10 {
  border-radius: 2px 10px 2px 2px;
}

.borderEdit {
  border: 1px solid red;
}
</style>