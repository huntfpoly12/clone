<template>
  <div class="form-chat">
      <div v-if="loadinggetGetAccountingClosingMessages" class="form-chat-loading"><a-spin size="large"/></div>
      <div ref="formTimeline" class="form-chat-timeline">
        <div v-for="(items, index) in listChat" :key="index" :id="items.createdAt">
          <div v-if="index > 0" class="form-chat-timeline-line" />
          <div class="form-chat-timeline-common">
            <div class="form-chat-timeline-content">
              <div class="form-chat-timeline-content-info">
                <div class="form-chat-timeline-content-info-user">
                  <div class="form-chat-timeline-content-info-user-status">
                    <StatusChat :valueSelect="items.expresstionType" :isSelect="false" />
                  </div>
                  <div class="form-chat-timeline-content-info-user-name"
                    :class="{ 'form-chat-timeline-content-info-user-name-login': items.writerUser.id === userId }">{{
                      items.writerUser.name }}
                  </div>
                </div>
                <div class="form-chat-timeline-content-info-time">{{ formatDate(items.createdAt) }}</div>
                <div class="form-chat-timeline-content-info-classification">{{ items.classification }}</div>
              </div>
              <div class="form-chat-timeline-content-background">
                <div class="form-chat-timeline-content-text">
                  <MarkdownCustom
                    :options="{ source: items.content || '', linkify: true, typographer: true, highlight: true }" />
                </div>
                <div v-if="items?.files && items?.files.length" class="form-chat-timeline-content-files">
                  <div class="form-chat-timeline-content-files-preview">
                    <div class="form-chat-timeline-content-files-preview-images">
                      <img v-for="(file, indexFile) in items.files" :key="indexFile"
                        class="form-chat-timeline-content-files-preview-images-image" :src="file.url" alt=""
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-chat-bottom">
        <div class="form-chat-bottom-category">
          <StatusChat with="150" disabled/>
          <span style="margin: 0 10px;">분류:</span>
          <span class="form-chat-bottom-category-text">회계-마감-({{ currentTime }})</span>
        </div>
        <InputChat ref="inputChat" v-model:content="content" v-model:files="filesUpload" 
          :placeholder="disabled ? '입력마감 상태에서는 이용할 수 없습니다.' : '댓글을 입력하세요…'" :disabled="isLoadingUpload || disabled" 
          @submitChat="submitChat" />
      </div>
    <ModalPreviewListImage :isModalPreview="isModalPreview" @cancel="isModalPreview = false"
      :listImage="listImagePreview" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, watch, computed, onMounted } from 'vue'
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/AC/AC1/AC130";
import queries from "@/graphql/queries/AC/AC1/AC130";
import { EllipsisOutlined, EditOutlined, DeleteOutlined, CloseOutlined, FileAddOutlined, FileOutlined, SendOutlined, FileTextOutlined, RollbackOutlined } from '@ant-design/icons-vue';
import { getJwtObject } from "@bankda/jangbuda-common";
import ModalPreviewListImage from './ModalPreviewListImage.vue'
import StatusChat from './StatusChat.vue'
import InputChat from './InputChat.vue'
import MarkdownCustom from './MarkdownCustom.vue';
import notification from "@/utils/notification";
export default defineComponent({
  props: {
    payload: {
      type: Object,
      default: () => { }
    },
    disabled: {
      type: Boolean,
      default: false
    },
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
    StatusChat,
    InputChat,
    MarkdownCustom
  },
  setup(props, { emit }) {
    const token = ref(sessionStorage.getItem("token"))
    let jwtObject = getJwtObject(token.value!);
    const userName = ref(sessionStorage.getItem("name"));
    const userId = jwtObject.userId
    const inputFile = ref<any>()
    let content = ref('')
    let isModalPreview = ref(false)
    const formTimeline: any = ref()
    let filesUpload: any = ref([])
    let isLoadingUpload = ref(false)
    const inputChat: any = ref()
    const inputEditChat = ref()
    const listChat = ref<any>([])
    let listImagePreview: any = ref({
      index: 0,
      files: [],
    })
    const page = ref(1)
    const rows = ref(50)

    const triggerGetAccountingClosingMessages = ref(false)

    let filter: any = {}

    watch(() => props.payload, (value) => {
      if (Object.keys(value).length) {
        if(inputChat.value) {
          inputChat.value.resetInputChat()
        }
        filter.companyId = value.companyId,
        filter.fiscalYear = value.fiscalYear,
        filter.facilityBusinessId = value.facilityBusinessId,
        filter.year = value.year,
        filter.month = value.month,
        filter.page = page.value,
        filter.rows = rows.value,
        triggerGetAccountingClosingMessages.value = true
      }
    }, {
      deep: true,
      immediate: true,
    })

    ////Graphql
    //// get list message
    const {
      onResult: onResGetAccountingClosingMessages,
      loading: loadinggetGetAccountingClosingMessages,
    } = useQuery(queries.getAccountingClosingMessages, { filter: filter },
      () => ({
        enabled: triggerGetAccountingClosingMessages.value,
        fetchPolicy: "no-cache",
      }))
    onResGetAccountingClosingMessages((data) => {
      listChat.value = [...data.data.getAccountingClosingMessages.datas.reverse()]
      nextTick(() => {
        formTimeline.value.scroll({top: 10000000, behavior: "instant",})
      })
      triggerGetAccountingClosingMessages.value = false
    })

    /// 
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
      notification("error", e.message);
    })


    const date = new Date()
    const currentTime = date.getFullYear() + '-' + ((date.getMonth() + 1) < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))

    const refreshForm = () => {
      inputChat.value.resetInputChat()
      triggerGetAccountingClosingMessages.value = true
      emit('refresh')
    }

    const submitChat = () => {
      if (isLoadingUpload.value || (!content.value.trim() && !filesUpload.value.length)) return
      isLoadingUpload.value = true
      let fileStorageIds = null
      if (filesUpload.value.length) {
        fileStorageIds = filesUpload.value.map((file: any) => parseInt(file.id))
      }
      createAccountingClosingMessage({
        ...props.payload,
        input: {
          content: !!content.value.trim() ? content.value.trim() : null,
          fileStorageIds
        }
      })
    };

    const formatDate = (timestamp: number) => {
      const date = new Date(timestamp)
      const month = date.getMonth() + 1
      const day = date.getDate()
      const minutes = date.getMinutes().toString()
      return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${date.getHours()}:${minutes.length === 2 ? minutes : '0' + minutes}`
    }

    const previewImage = (files: any, index: number) => {
      listImagePreview.value.index = index
      listImagePreview.value.files = files.map((file: any) => file.url)
      isModalPreview.value = true
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
      formatDate,
      inputFile,
      filesUpload,
      isLoadingUpload,
      userId,
      isModalPreview,
      previewImage,
      listImagePreview,
      currentTime,
      inputChat,
      inputEditChat,
      formatFileSize,
      openLinkDownFile,
      refreshForm,
      loadinggetGetAccountingClosingMessages
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
  position: relative;
  &-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.568);
  }
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
      // margin-top: 20px;
      margin-bottom: 10px;
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
      padding: 0 12px 0 12px;
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
            font-size: 12px;
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
        margin-top: 5px;
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
      &-text {
        color: #bcbcc2ff;
      }
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