<template>
  <div class="form-chat">
    <p class="form-chat-title">
      회계마감 관리사항
    </p>
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
                      @click="previewImage(items.files.filter((item: any) => item?.contentType.includes('image/')), indexFile)">
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
        <StatusChat with="150" />
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
import { EllipsisOutlined, EditOutlined, DeleteOutlined, CloseOutlined, FileAddOutlined, FileOutlined, SendOutlined, FileTextOutlined, RollbackOutlined } from '@ant-design/icons-vue';
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
    PreviewReply
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
      status: '일반',
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
    const isCreate = ref(false)


    watch(() => props.data, (value) => {
      if(value.length) {
        if(firstLoadData.value) {
          listChat.value = [...value]
        }else {
          const index = value.findIndex((item: any) => item.id === listChat.value[listChat.value.length].id)
          listChat.value = [...listChat.value, value.slice(index)]
        }
        if(isCreate.value || firstLoadData.value) {
          nextTick(() => {
            formTimeline.value.scrollTop = 10000000
          })
        }
        isCreate.value = false
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
    doneCreateAccountingClosingMessage((e) => {
      emit('updateData')
      isCreate.value = true
      inputChat.value.resetInputChat()
      isLoadingUpload.value = false
    })
    errorCreateAccountingClosingMessage(e => {
      isLoadingUpload.value = false
      console.log('errorCreateAccountingClosingMessage', e);
    })


    const date = new Date()
    const currentTime = date.getFullYear() + '-' + ((date.getMonth() + 1) < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))
    const getListContentChat = () => {
      // onValue(
      //   chatListRef.value,
      //   (snapshot) => {
      //     const objList = snapshot.val()
      //     if (!objList) {
      //       firstLoadData.value = false
      //     }
      //     let arr = []
      //     for (const key in objList) {
      //       if (!objList[key]?.isDelete) {
      //         arr.push({
      //           key: key,
      //           files: objList?.files || [],
      //           ...objList[key]
      //         })
      //       }
      //     }
      //     listChat.value = arr
      //     console.log('listChat.value', listChat.value)

      //     onChildAdded(query(chatListRef.value, limitToLast(1)), (data) => {
      //       if (!firstLoadData.value) {
      //         if (isLoadingUpload.value && objectChatUploadUpFile.value) {
      //           if (data.val().userId === userId && data.val().createdAt === objectChatUploadUpFile.value.createdAt) {
      //             objectChatUploadUpFile.value = null
      //             isLoadingUpload.value = false
      //           }
      //         }
      //         listChat.value.push({
      //           ...data.val(),
      //           key: data.key
      //         })
      //         nextTick(() => {
      //           formTimeline.value.scrollTop = 10000000
      //         })
      //       } else {
      //         nextTick(() => {
      //           formTimeline.value.scrollTo({
      //             top: 10000000,
      //             behavior: "instant",
      //           });
      //         })
      //       }
      //       firstLoadData.value = false
      //     });
      //     onChildChanged(chatListRef.value, (data) => {
      //       const indexUpdate = listChat.value.findIndex((chat: any) => chat.key === data.key)
      //       if (indexUpdate >= 0) {
      //         if (!!data.val()?.isDelete) {
      //           listChat.value.splice(indexUpdate, 1)
      //         } else {
      //           listChat.value[indexUpdate] = {
      //             ...listChat.value[indexUpdate],
      //             text: data.val().text,
      //             files: data.val().files,
      //             reply: data.val()?.reply ? data.val().reply : {},
      //           }
      //         }
      //       }
      //     });
      //   },
      //   {
      //     onlyOnce: true,
      //   }
      // );
    };

    const submitChat = () => {
      if (isLoadingUpload.value || isProcessingDeleteUpdate.value) return
      isLoadingUpload.value = true
      let fileStorageIds = null
      if(filesUpload.value.length) {
        fileStorageIds = filesUpload.value.map((file: any) => parseInt(file.id))
      }
      createAccountingClosingMessage({
        ...props.payload,
        input: {
          content: content.value,
          fileStorageIds
        }
      })
      // let contentInputed = content.value
      // let fileInputUploaded = [...filesUpload.value]
      // if (itemEditComment.value.key) {
      //   contentInputed = itemEditComment.value.text
      //   fileInputUploaded = [...itemEditComment.value.files]
      // }
      // if (!contentInputed.trim() && !fileInputUploaded.length) return
      // isLoadingUpload.value = true
      // payload.value = {
      //   ...payload.value,
      //   text: contentInputed,
      //   files: []
      // }
      // if (Object.keys(itemCommentReply.value).length) {
      //   payload.value.reply = { ...itemCommentReply.value }
      // }
      // if (fileInputUploaded.length) {
      //   listFileUploadHandleLoading.value = [...fileInputUploaded]
      //   if (itemEditComment.value.key === null) {
      //     objectChatUploadUpFile.value = {
      //       ...payload.value,
      //       text: contentInputed,
      //       files: [...listFileUploadHandleLoading.value],
      //     }
      //   } else {
      //     const indexEdit = listChat.value.findIndex((item: any) => item.key === itemEditComment.value.key)
      //     listChat.value[indexEdit] = {
      //       ...listChat.value[indexEdit],
      //       text: contentInputed,
      //       files: [...listFileUploadHandleLoading.value],
      //     }
      //   }
      //   nextTick(() => {
      //     formTimeline.value.scrollTop = 10000000
      //     inputChat.value.resetInputChat()
      //   })
      //   uploadFileServer()
      // } else {
      //   sendChat()
      // }
    };

    const sendChat = () => {
      if (listFileUploadHandleLoading.value.length) {
        payload.value = {
          ...payload.value,
          files: listImageUpload.value
        }
        content.value = "";
        listImageUpload.value = []
        listFileUploadHandleLoading.value = []
      }
      if (itemEditComment.value.key === null) {
        listChat.value.push({...payload.value, key: payload.value.createdAt.toString()})

        nextTick(() => {
            itemCommentReply.value = {}
            objectChatUploadUpFile.value = null
            isLoadingUpload.value = false
            formTimeline.value.scrollTop = 10000000
            inputChat.value.resetInputChat()
        })
        // const postListRef = reffb(databaseFirebase, channelChatSubrights());
        // const newPostRef = push(postListRef);
        // set(newPostRef, payload.value)
        //   .then(() => {
        //     nextTick(() => {
        //       formTimeline.value.scrollTop = 10000000
        //       inputChat.value.resetInputChat()
        //     })
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   }).finally(() => {
        //     itemCommentReply.value = {}
        //     objectChatUploadUpFile.value = null
        //     isLoadingUpload.value = false
        //     formTimeline.value.scrollTop = 10000000
        //   })
      } else {
        const updates: any = {};
        if (!Object.keys(itemEditComment.value?.reply || {}).length) {
          delete itemEditComment.value.reply
        }
        const payloadEdit = { ...itemEditComment.value, ...payload.value }
        const index = listChat.value.findIndex((chat: any) => chat.key === payloadEdit.key)
        listChat.value[index] = {...payloadEdit}
        nextTick(() => {
          itemEditComment.value = {
              key: null,
              text: '',
              files: [],
            }
            isLoadingUpload.value = false
        })




        // const updates: any = {};
        // if (!Object.keys(itemEditComment.value?.reply || {}).length) {
        //   delete itemEditComment.value.reply
        // }
        // const payloadEdit = { ...itemEditComment.value, ...payload.value }
        // delete payloadEdit.key
        // updates[`/${itemEditComment.value.key}`] = payloadEdit
        // update(chatListRef.value, updates).then(() => {
        // }).catch(() => {
        //   console.log('eeeeeeeee');
        // }).finally(() => {
        //   nextTick(() => {
        //     itemEditComment.value = {
        //       key: null,
        //       text: '',
        //       files: [],
        //     }
        //     isLoadingUpload.value = false
        //   })
        // })
      }
      nextTick(() => {
        filesUpload.value = []
        objectChatUploadUpFile.value = null
        listFileUploadHandleLoading.value = []
        inputChat.value.resetInputChat()
      })
    }

    watch(() => listImageUpload.value, (value) => {
      if (value.length && value.length === listFileUploadHandleLoading.value.length) {
        sendChat()
      }
    }, {
      deep: true,
    })

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
        // isProcessingDeleteUpdate.value = true
        // const updates: any = {};
        // updates[`/${itemDetele.value.key}`] = { ...itemDetele.value, isDelete: true }
        // update(chatListRef.value, updates).then(() => {
        // }).catch(() => {
        //   console.log('e');
        // }).finally(() => {
        //   itemDetele.value = null
        //   isProcessingDeleteUpdate.value = false
        // })

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
      // listImageUpload.value = []
      // listFileUploadHandleLoading.value.forEach((file: any) => {
      //   if (!!file?.file) {
      //     let url = ''
      //     if(file.contentType.includes('image/')) {
      //       url = 'https://firebasestorage.googleapis.com/v0/b/chat-jangbuda.appspot.com/o/cach-chup-anh-chan-dung-9.jpg?alt=media&token=246270e1-334f-4dce-b312-6642c7d1dc3c'
      //     }else {
      //       if(file.contentType.includes('video')){
      //         url = 'https://firebasestorage.googleapis.com/v0/b/chat-jangbuda.appspot.com/o/video-5-seconds.mp4?alt=media&token=f3a80d6f-d0a0-47aa-b6ac-bfff433b2109'
      //       }else{
      //         url = 'https://firebasestorage.googleapis.com/v0/b/chat-jangbuda.appspot.com/o/ac130-notice.pptx?alt=media&token=0d759619-e4b7-4b67-95e8-5651c6d858a0'
      //       }
      //     }
      //     listImageUpload.value = [...listImageUpload.value, { url: url, name: file.file.name, size: file.file.size, contentType: file.contentType }]
      //   } else {
      //     listImageUpload.value = [...listImageUpload.value, { url: file.url, name: file.name, size: file.size, contentType: file.contentType }]
      //   }
      // })
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
      itemCommentReply
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

  &-title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    padding: 4px 0;
    border-bottom: 1px solid rgba(17, 17, 26, 0.1);
  }

  &-timeline {
    flex-grow: 1;
    // height: calc(100% - 40px);
    padding-bottom: 10px;
    padding-top: 2px;
    // scroll-behavior: smooth;
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
          color: #333;
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