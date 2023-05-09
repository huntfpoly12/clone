<template>
  <div class="form-chat">
    <p class="form-chat-title">
      회계마감 관리사항
    </p>
    <div ref="formTimeline" class="form-chat-timeline">
      <div v-for="(items, index) in listChat" :key="index">
        <div class="form-chat-timeline-line"></div>
        <div class="form-chat-timeline-common">
          <div class="form-chat-timeline-avatar">
            <a-badge :dot="true" :offset="[-5, 33]" :status="items.userId === userId ? 'success' : 'error'"
              :class="{ 'hidden-avatar': index > 0 && listChat[index - 1].userId === items.userId }">
              <a-avatar shape="circle" size="large"
                :style="`background-color: ${items.userId === userId ? '#1890ff' : '#f56a00'}`">{{ items.name
                }}</a-avatar>
            </a-badge>
          </div>

          <div class="form-chat-timeline-content">
            <div class="form-chat-timeline-content-info">
              <div class="form-chat-timeline-content-info-user">
                <span class="form-chat-timeline-content-info-user-status">{{ items.status }}</span>
                <div class="form-chat-timeline-content-info-user-name"
                  :class="{ 'form-chat-timeline-content-info-user-name-login': items.userId === userId }">{{ items.name }}
                </div>
              </div>
              <div class="form-chat-timeline-content-info-time">{{ formatDate(items.createdAt) }}</div>
            </div>
            <div v-if="itemEditComment?.key !== items.key">
              <div class="form-chat-timeline-content-text">
                <MarkdownCustom :options="{ source: items.text, linkify: true, typographer: true, highlight: true }" />
              </div>
              <div class="form-chat-timeline-content-files">
                <a-spin v-for="(file, indexFile) in items.files" :spinning="isLoadingUpload && !!file?.isUploading"
                  size="small" :key="file.url">
                  <img class="form-chat-timeline-content-files-items" :src="file.url" alt=""
                    @click="previewImage(items.files, indexFile)">
                </a-spin>
              </div>
            </div>
            <InputChat v-else ref="inputEditChat" v-model:textChatProp="itemEditComment.text" v-model:filesUploadProps="itemEditComment.files"
              placeholder="댓글을 입력하세요…" @submitChat="submitChat" @cancel="cancelEdit"/>
          </div>

          <div v-if="items.userId === userId" class="form-chat-timeline-common-menu">
            <a-dropdown :placement="items.userId === userId ? 'bottomRight' : 'bottomLeft'" :trigger="['click']">
              <EllipsisOutlined :style="{ fontSize: '16px' }" />
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="editComment(items)">
                    <EditOutlined />
                    수정
                  </a-menu-item>
                  <a-menu-item @click="openComfirmDetele(items)">
                    <DeleteOutlined />
                    삭제
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </div>
      <!-- itemEditComment -->
      <div v-if="!!objectChatUpFile" class="form-chat-timeline-common form-chat-timeline-right mt-1"
        :class="{ 'mt-10': objectChatUpFile.cssTop }">
        <div class="form-chat-timeline-content form-chat-timeline-content-right">
          <div class="form-chat-timeline-content-info">
            <div class="form-chat-timeline-content-info-user">
              <span class="form-chat-timeline-content-info-user-status" :class="{ 'hidden-avatar': true }">{{
                objectChatUpFile.status
              }}</span>
              <div class="form-chat-timeline-content-info-user-name" :class="{ 'hidden-avatar': true }">{{
                objectChatUpFile.name }}
              </div>
            </div>
            <div class="form-chat-timeline-content-info-time">{{ formatDate(objectChatUpFile.createdAt) }}</div>
          </div>
          <div class="form-chat-timeline-content-files">
            <a-spin v-for="(file, indexFile) in objectChatUpFile.files" :spinning="isLoadingUpload && !!file?.isUploading"
              size="small" :key="file.url">
              <img class="form-chat-timeline-content-files-items" :src="file.url" alt="">
            </a-spin>
          </div>
          <div class="form-chat-timeline-content-text" v-html="objectChatUpFile.text"></div>
        </div>
      </div>
    </div>
    <div class="form-chat-bottom">
      <div class="form-chat-bottom-category">
        <StatusChat with="150" />
        <span style="margin: 0 10px;">분류:</span>
        <span>회계-마감-({{ currentTime }})</span>
      </div>
      <InputChat ref="inputChat" v-model:textChatProp="textChat" v-model:filesUploadProps="filesUpload"
        placeholder="댓글을 입력하세요…" @submitChat="submitChat" />
    </div>
    <ModalPreviewListImage :isModalPreview="isModalPreview" @cancel="isModalPreview = false"
      :listImage="listImagePreview" />
    <PopupMessage :modalStatus="isModalDeleteChat" @closePopup="isModalDeleteChat = false" :typeModal="'confirm'"
      title="Confirm detele" content="" :okText="'네. 삭제합니다'" :cancelText="'아니요'" @checkConfirm="handleConfirmDelete" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, watch, computed } from 'vue'
import { EllipsisOutlined, EditOutlined, DeleteOutlined, CloseOutlined, SmileOutlined, FileAddOutlined, FileOutlined, SendOutlined } from '@ant-design/icons-vue';
import { databaseFirebase, storage } from "@/firebaseConfig";
import {
  ref as reffb,
  push,
  set,
  query,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onValue,
  child,
  remove,
  update,
  limitToLast
} from "firebase/database";
import { ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { getJwtObject } from "@bankda/jangbuda-common";
import ModalPreviewListImage from './ModalPreviewListImage.vue'
import StatusChat from './StatusChat.vue'
// import picker compopnent
import EmojiPicker from 'vue3-emoji-picker'
// import css
import 'vue3-emoji-picker/css'
import InputChat from './InputChat.vue'
import MarkdownCustom from './MarkdownCustom.vue';
export default defineComponent({
  props: {
    // Message only 2 people
    idUserTo: {
      type: [String, Number],
      default: ''
    },
    // message to the group
    keyChatChannel: {
      type: [String, Number],
      default: ''
    },
  },
  components: {
    EllipsisOutlined,
    EditOutlined,
    DeleteOutlined,
    CloseOutlined,
    SmileOutlined,
    FileOutlined,
    FileAddOutlined,
    SendOutlined,
    ModalPreviewListImage,
    EmojiPicker,
    StatusChat,
    InputChat,
    MarkdownCustom
  },
  setup(props, { emit }) {
    const token = ref(sessionStorage.getItem("token"))
    let jwtObject = getJwtObject(token.value!);
    const userName = ref(sessionStorage.getItem("name"));
    const userId = jwtObject.userId
    let firstLoadChat = ref(true)
    const inputFile = ref<any>()
    let textChat = ref('')
    let isModalPreview = ref(false)
    let isModalDeleteChat = ref(false)
    const formTimeline: any = ref()
    let itemEditComment = ref<any>(null)
    let filesUpload: any = ref([])
    let listFileUploadHandleLoading: any = ref([])
    let listImageUpload: any = ref([])
    let isLoadingUpload = ref(false)
    let isProcessingDeleteUpdate = ref(false)
    let isVisibleEmojiForm = ref(false)
    const inputChat: any = ref()
    const inputEditChat = ref()
    let payload: any = ref({
      name: userName.value,
      avatar: '',
      text: '',
      files: [],
      createdAt: new Date().getTime(),
      status: '일반',
      userId: jwtObject.userId
    })
    const objectChatUpFile: any = ref(null)
    const listChat = ref<any>([])
    let listImagePreview: any = ref({
      index: 0,
      files: [],
    })
    let itemDetele: any = ref()
    const channelChatSubrights = () => {
      if (!!props.idUserTo) {
        const idUser = userName.value?.toString() || ''
        if (props.idUserTo > idUser) {
          return props.idUserTo + idUser;
        } else {
          return idUser + props.idUserTo;
        }
      } else {
        return props.keyChatChannel.toString()
      }
    };

    let chatListRef: any = computed(() => {
      return !!channelChatSubrights() ? reffb(databaseFirebase, channelChatSubrights()) : null
    });
    const date = new Date()
    const currentTime = date.getFullYear() + '-' + ((date.getMonth() + 1) < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))
    const getListContentChat = () => {
      onValue(
        chatListRef.value,
        (snapshot) => {
          const objList = snapshot.val()
          if (!objList) {
            firstLoadChat.value = false
          }
          let arr = []
          for (const key in objList) {
            if (!objList[key]?.isDelete) {
              arr.push({
                key: key,
                files: objList?.files || [],
                ...objList[key]
              })
            }
          }
          listChat.value = arr

          onChildAdded(query(chatListRef.value, limitToLast(1)), (data) => {
            if (!firstLoadChat.value) {
              if (isLoadingUpload.value) {
                if (data.val().userId === userId && data.val().createdAt === objectChatUpFile.value.createdAt) {
                  objectChatUpFile.value = null
                  isLoadingUpload.value = false
                }
              }
              listChat.value.push({
                ...data.val(),
                key: data.key
              })
              nextTick(() => {
                formTimeline.value.scrollTop = 10000000
              })
            }
            firstLoadChat.value = false
          });
          onChildChanged(chatListRef.value, (data) => {
            const indexUpdate = listChat.value.findIndex((chat: any) => chat.key === data.key)
            if (!!data.val()?.isDelete) {
              listChat.value.splice(indexUpdate, 1)
            } else {
              listChat.value[indexUpdate] = {
                ...listChat.value[indexUpdate],
                text: data.val().text
              }
            }
          });
          nextTick(() => {
            formTimeline.value.scrollTop = 10000000
          })
        },
        {
          onlyOnce: true,
        }
      );
    };

    const submitChat = () => {
      isVisibleEmojiForm.value = false
      if (isLoadingUpload.value || isProcessingDeleteUpdate.value) return
      if (!textChat.value.trim() && !filesUpload.value.length) return
      payload.value = {
        ...payload.value,
        text: textChat.value,
        files: []
      }
      if (filesUpload.value.length) {
        isLoadingUpload.value = true
        listFileUploadHandleLoading.value = [...filesUpload.value]
        if (itemEditComment.value === null) {
          objectChatUpFile.value = {
            ...payload.value,
            text: textChat.value,
            files: listFileUploadHandleLoading.value.map((file: any) => ({ ...file, isUploading: true })),
            cssTop: listChat.value[listChat.value.length - 1]?.userId === userId ? false : true,
          }
        } else {
          const index = listChat.value.findIndex((item: any) => item.key === itemEditComment.value.key)
          listChat.value[index] = {
            ...payload.value,
            text: textChat.value,
            files: listFileUploadHandleLoading.value.map((file: any) => ({ ...file, isUploading: true })),
          }
        }
        nextTick(() => {
          formTimeline.value.scrollTop = 10000000
          inputChat.value.resetInputChat()
        })
        uploadFileServer()
      } else {
        sendChat()
      }
    };

    const sendChat = () => {
      if (listFileUploadHandleLoading.value.length) {
        payload.value = {
          ...payload.value,
          files: listImageUpload.value
        }
        textChat.value = "";
        listImageUpload.value = []
        listFileUploadHandleLoading.value = []
      }
      if (itemEditComment.value === null) {
        const postListRef = reffb(databaseFirebase, channelChatSubrights());
        const newPostRef = push(postListRef);
        set(newPostRef, payload.value)
          .then(() => {
            nextTick(() => {
              formTimeline.value.scrollTop = 10000000
              inputChat.value.resetInputChat()
            })
          })
          .catch((err) => {
            console.log(err);
          }).finally(() => {
            objectChatUpFile.value = null
            isLoadingUpload.value = false
            formTimeline.value.scrollTop = 10000000
          })
      } else {
        isProcessingDeleteUpdate.value = true
        const updates: any = {};
        updates[`/${itemEditComment.value.key}`] = { ...itemEditComment.value, ...payload.value }
        update(chatListRef.value, updates).then(() => {
        }).catch(() => {
          console.log('eeeeeeeee');
        }).finally(() => {
          isLoadingUpload.value = false
          isProcessingDeleteUpdate.value = false
        })
      }
    }

    watch(() => [props.idUserTo, props.keyChatChannel], (value) => {
      if (!!value[0] || !!value[1]) {
        firstLoadChat.value = true
        chatListRef.value = reffb(databaseFirebase, channelChatSubrights());
        getListContentChat();
        nextTick(() => {
          formTimeline.value.scrollTop = 10000000
        })
      }
    }, {
      deep: true,
      immediate: true,
    })

    watch(() => listImageUpload.value, (value) => {
      if (value.length && value.length === listFileUploadHandleLoading.value.length) {
        sendChat()
      }
    }, {
      deep: true,
    })

    const editComment = (item: any) => {
      itemEditComment.value = { ...item }
      nextTick(() => {
        inputEditChat.value[0].resizeInput()
        inputEditChat.value[0].focus()
      })
    }

    const openComfirmDetele = (item: any) => {
      itemDetele.value = { ...item }
      isModalDeleteChat.value = true
    }

    const handleConfirmDelete = (status: boolean) => {
      if (status) {
        isProcessingDeleteUpdate.value = true
        const updates: any = {};
        updates[`/${itemDetele.value.key}`] = { ...itemDetele.value, isDelete: true }
        update(chatListRef.value, updates).then(() => {
        }).catch(() => {
          console.log('eeeeeeeee');
        }).finally(() => {
          itemDetele.value = null
          isProcessingDeleteUpdate.value = false
        })
      } else {
        isModalDeleteChat.value = false
      }
    }

    const formatDate = (timestamp: number) => {
      const date = new Date(timestamp)
      const month = date.getMonth()
      const day = date.getDate()
      const minutes = date.getMinutes().toString()
      return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${date.getHours()}:${minutes.length === 2 ? minutes : '0' + minutes}`
    }

    const uploadFileServer = () => {
      listImageUpload.value = []
      listFileUploadHandleLoading.value.forEach((file: any) => {
        if (!!file?.file) {
          const storageRef = refStorage(storage, file.file.name);
          uploadBytes(storageRef, file.file, file.metadata).then(async (res) => {
            const url = await getDownloadURL(res.ref)
            listImageUpload.value = [...listImageUpload.value, { url: url, name: file.file.name, size: file.file.size }]
          }).catch((err) => {
            isLoadingUpload.value = false
            console.log('error', err);
          })
        } else {
          listImageUpload.value = [...listImageUpload.value, { url: file.url, name: file.name, size: file.size }]
        }
      })
    }

    const previewImage = (files: any, index: number) => {
      listImagePreview.value.index = index
      listImagePreview.value.files = files.map((file: any) => file.url)
      isModalPreview.value = true
    }

    const cancelEdit = () => {
      nextTick(() => {
        itemEditComment.value = null
      })
    }

    return {
      userName,
      listChat,
      submitChat,
      textChat,
      formTimeline,
      editComment,
      handleConfirmDelete,
      itemEditComment,
      formatDate,
      inputFile,
      filesUpload,
      isLoadingUpload,
      objectChatUpFile,
      userId,
      isModalPreview,
      previewImage,
      listImagePreview,
      isModalDeleteChat,
      openComfirmDetele,
      isVisibleEmojiForm,
      currentTime,
      inputChat,
      inputEditChat,
      cancelEdit
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
    overflow-y: auto;

    &-line {
      margin: 10px 0;
      height: 1px;
      background-color: #e7e6e6;
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

      &-menu {
        margin: 0 5px;
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
      width: 80%;
      // background-color: #DCE6F2;
      padding: 5px 12px 8px 12px;

      &-files {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;

        &-items {
          width: 130px;
          height: 130px;
          object-fit: cover;
          display: block;
          padding: 5px;
          cursor: pointer;

          &:hover {
            opacity: .8;
          }
        }
      }

      &-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-user {
          display: flex;
          align-items: center;
          // margin-right: 30px;
          margin-right: 20px;

          &-status {
            display: inline;
            padding: 0 10px;
            border-radius: 5px;
            border: 1px solid #7f7f7f;
            background-color: #ffffff;
            color: #7f7f7f;
            font-size: 10px;
            margin-right: 5px;
          }

          &-name {
            font-size: 16px;
            font-weight: bold;

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

      &-text {
        word-wrap: break-word;
        white-space: pre-wrap;
        font-size: 15px;
        color: #333333;
      }
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