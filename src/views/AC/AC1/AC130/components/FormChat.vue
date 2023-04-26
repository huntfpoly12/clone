<template>
  <div class="form-chat">
    <p class="form-chat-title">
      회계마감 관리사항
    </p>
    <div ref="formTimeline" class="form-chat-timeline">
      <div v-for="(items, index) in listChat" :key="index">
        <div class="form-chat-timeline-common" :class="{
          'form-chat-timeline-right': items.userId === userId,
          'form-chat-timeline-left': items.userId !== userId,
          'mt-1': index > 0 && listChat[index - 1].userId === items.userId,
          'mt-10': index > 0 && listChat[index - 1].userId !== items.userId,
        }">
          <div class="form-chat-timeline-avatar" :class="{ 'hidden-avatar': items.userId === userId }">
            <!-- <img :class="{ 'hidden-avatar': index > 0 && listChat[index - 1].name === items.userId, }" :src="items.avatar"
              alt=""> -->
            <a-badge :dot="true" :offset="[-5, 33]" :status="items.userId === userId ? 'success' : 'error'"
              :class="{ 'hidden-avatar': index > 0 && listChat[index - 1].userId === items.userId }">
              <a-avatar shape="circle" size="large"
                :style="`background-color: ${items.userId === userId ? '#1890ff' : '#f56a00'}`">{{ items.name
                }}</a-avatar>
            </a-badge>
          </div>


          <div class="form-chat-timeline-content" :class="{
            'borderRadiusleft10': (index === 0 || listChat[index - 1]?.userId !== items.userId) && items.userId !== userId,
            'borderRadiusRight10': (index === 0 || listChat[index - 1]?.userId !== items.userId) && items.userId === userId,
            'form-chat-timeline-content-right': items.userId === userId,
            'borderEdit': itemEditComment?.key === items.key
          }">
            <div class="form-chat-timeline-content-info">
              <div class="form-chat-timeline-content-info-user">
                <span class="form-chat-timeline-content-info-user-status"
                  :class="{ 'hidden-avatar': index > 0 && listChat[index - 1].userId === items.userId }">{{ items.status
                  }}</span>
                <div class="form-chat-timeline-content-info-user-name"
                  :class="{ 'hidden-avatar': index > 0 && listChat[index - 1].userId === items.userId }">{{ items.name }}
                </div>
              </div>
              <div class="form-chat-timeline-content-info-time">{{ formatDate(items.createdAt) }}</div>
            </div>
            <div class="form-chat-timeline-content-files">
              <a-spin v-for="(file, indexFile) in items.files" :spinning="isLoadingUpload && !!file?.isUploading" size="small" :key="file.url">
                <img class="form-chat-timeline-content-files-items" :src="file.url" alt="" @click="previewImage(items.files, indexFile)"> 
              </a-spin>
            </div>
            <div class="form-chat-timeline-content-text" v-html="items.text"></div>
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

      <div v-if="!!objectChatUpFile" class="form-chat-timeline-common form-chat-timeline-right mt-1" :class="{'mt-10': objectChatUpFile.cssTop}">
        <div class="form-chat-timeline-content form-chat-timeline-content-right">
        <div class="form-chat-timeline-content-info">
          <div class="form-chat-timeline-content-info-user">
            <span class="form-chat-timeline-content-info-user-status"
              :class="{ 'hidden-avatar': true }">{{ objectChatUpFile.status
              }}</span>
            <div class="form-chat-timeline-content-info-user-name"
              :class="{ 'hidden-avatar': true }">{{ objectChatUpFile.name }}
            </div>
          </div>
          <div class="form-chat-timeline-content-info-time">{{ formatDate(objectChatUpFile.createdAt) }}</div>
        </div>
        <div class="form-chat-timeline-content-files">
          <a-spin v-for="(file, indexFile) in objectChatUpFile.files" :spinning="isLoadingUpload && !!file?.isUploading" size="small" :key="file.url">
            <img class="form-chat-timeline-content-files-items" :src="file.url" alt=""> 
          </a-spin>
        </div>
        <div class="form-chat-timeline-content-text" v-html="objectChatUpFile.text"></div>
      </div>
      </div>
    </div>

    <div class="form-chat-bottom">
      <a-badge :dot="true" :offset="[-5, 33]" status="success" class="mr-5">
        <a-avatar shape="circle" size="large" style="backgroundColor: #1890ff">{{ userName }}</a-avatar>
      </a-badge>
      <div class="form-chat-bottom-input">
        <textarea rows="1" ref="inputChat" :class="{ 'active-input-file': listFileUpload.length }" placeholder="댓글을 입력하세요…"
          v-model="textChat" @input="changeInput" @keypress.enter.exact.prevent="submitChat"></textarea>
        <div class="form-chat-bottom-input-tool">
          <CloseOutlined @click="removeText()" />
          <a-dropdown :visible="isVisibleEmojiForm">
            <SmileOutlined style="margin: 0 5px;" @click.stop="isVisibleEmojiForm = !isVisibleEmojiForm"/>
            <template #overlay>
              <EmojiPicker 
              theme="dark" 
              :native="true"
              :disable-skin-tones="true" 
              :hide-group-names="true" 
              :static-texts="{ placeholder: '그림 이모티콘 검색'}"
              @select="onSelectEmoji" 
              v-click-outside="clickOutside"/>
            </template>
          </a-dropdown>
          <FileAddOutlined @click="openFile" />
        </div>
        <div v-if="listFileUpload.length" class="form-chat-bottom-input-files">
          <div v-for="(file, index) in listFileUpload" class="form-chat-bottom-input-files-item">
            <img :src="file.url" alt="" :key="index">
            <CloseOutlined class="form-chat-bottom-input-files-item-close" @click="removeFile(index)"/>
          </div>
        </div>
      </div>
      <div class="form-chat-bottom-send" @click.stop="submitChat">
        <SendOutlined class="form-chat-bottom-send-icon" />
      </div>
    </div>
    <input v-show="false" ref="inputFile" type="file" accept="image/png, image/jpeg, image/jpg image/gif"
      @change="uploadPreviewFile" />
    <ModalPreviewListImage :isModalPreview="isModalPreview" @cancel="isModalPreview = false" :listImage="listImagePreview" />
    <PopupMessage :modalStatus="isModalDeleteChat" @closePopup="isModalDeleteChat = false" :typeModal="'confirm'" 
      title="Confirm detele" content="" :okText="'네. 삭제합니다'" :cancelText="'아니요'" @checkConfirm="handleConfirmDelete" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, watch, computed } from 'vue'
import { EllipsisOutlined, EditOutlined, DeleteOutlined, CloseOutlined, SmileOutlined, FileAddOutlined, SendOutlined } from '@ant-design/icons-vue';
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
import notification from '@/utils/notification';
import { getJwtObject  } from "@bankda/jangbuda-common";
import ModalPreviewListImage from './ModalPreviewListImage.vue'
// import picker compopnent
import EmojiPicker from 'vue3-emoji-picker'
// import css
import 'vue3-emoji-picker/css'
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
    FileAddOutlined,
    SendOutlined,
    ModalPreviewListImage,
    EmojiPicker
  },
  setup(props, { emit }) {
    const token  = ref(sessionStorage.getItem("token"))
    let jwtObject = getJwtObject(token.value!);
    const userName = ref(sessionStorage.getItem("name"));
    const userId = jwtObject.userId
    let firstLoadChat = ref(true)
    const inputFile = ref<any>()
    let textChat = ref('')
    let isModalPreview = ref(false)
    let isModalDeleteChat = ref(false)
    const formTimeline: any = ref()
    const inputChat: any = ref()
    let itemEditComment = ref<any>(null)
    let listFileUpload: any = ref([])
    let listFileUploadHandleLoading: any = ref([])
    let listImageUpload: any = ref([])
    let isLoadingUpload = ref(false)
    let isProcessingDeleteUpdate = ref(false)
    let isVisibleEmojiForm = ref(false)
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

    const getListContentChat = () => {
      onValue(
        chatListRef.value,
        (snapshot) => {
          const objList = snapshot.val()
          if(!objList){
            firstLoadChat.value = false
          }
          let arr = []
          for (const key in objList) {
            if(!objList[key]?.isDelete){
              arr.push({
                key: key,
                files: objList?.files || [],
                ...objList[key]
              })
            }
          }
          listChat.value = arr
          
          onChildAdded(query(chatListRef.value, limitToLast(1)), (data) => {
            if(!firstLoadChat.value) {
              if(isLoadingUpload.value){
                if(data.val().userId === userId && data.val().createdAt === objectChatUpFile.value.createdAt){
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
            if(!!data.val()?.isDelete) {
              listChat.value.splice(indexUpdate, 1)
            }else {
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
      if(isLoadingUpload.value || isProcessingDeleteUpdate.value) return
      if (!textChat.value.trim() && !listFileUpload.value.length) return
      payload.value = {
        ...payload.value,
        text: textChat.value,
        files: []
      }
      if(listFileUpload.value.length) {
        isLoadingUpload.value = true
        listFileUploadHandleLoading.value = [...listFileUpload.value]
        // listChat.value = [...listChat.value, {
        //   ...payload.value,
        //   text: textChat.value,
        //   files: listFileUploadHandleLoading.value.map((file:any) => ({...file, isUploading: true}))
        // }]
        if(itemEditComment.value === null) {
            objectChatUpFile.value = {
            ...payload.value,
            text: textChat.value,
            files: listFileUploadHandleLoading.value.map((file:any) => ({...file, isUploading: true})),
            cssTop: listChat.value[listChat.value.length-1]?.userId === userId ? false : true,
          }
        }else {
          const index = listChat.value.findIndex((item: any) => item.key === itemEditComment.value.key)
          listChat.value[index] = {
            ...payload.value,
            text: textChat.value,
            files: listFileUploadHandleLoading.value.map((file:any) => ({...file, isUploading: true})),
          }
        }
        textChat.value = ""
        listFileUpload.value = []
        nextTick(() => {
          formTimeline.value.scrollTop = 10000000
          resetInputChat()
        })
        uploadFileServer()
      }else {
        sendChat()
      }
    };

    const sendChat = () => {
      if(listFileUploadHandleLoading.value.length) {
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
            textChat.value = "";
            nextTick(() => {
              formTimeline.value.scrollTop = 10000000
              resetInputChat()
            })
          })
          .catch((err) => {
            console.log(err);
          }).finally(() => {
            objectChatUpFile.value = null
            isLoadingUpload.value = false
            formTimeline.value.scrollTop = 10000000
          })
      }else {
        isProcessingDeleteUpdate.value = true
        const updates: any = {};
        updates[`/${itemEditComment.value.key}`] = {...itemEditComment.value, ...payload.value }
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
      if(value.length && value.length === listFileUploadHandleLoading.value.length){
        sendChat()
      }
    }, {
      deep: true,
    })

    const changeInput = (event: any) => {
      const elment = event?.target ? event.target : event
      const style = getComputedStyle(elment, null);
      const verticalBorders = Math.round(parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth));
      const maxHeight = parseFloat(style.maxHeight) || 100;
      elment.style.height = "auto";
      const newHeight = elment.scrollHeight + verticalBorders;
      elment.style.overflowY = newHeight > maxHeight ? "auto" : "hidden";
      elment.style.height = Math.min(newHeight, maxHeight) + "px";
    }

    const editComment = (item: any) => {
      itemEditComment.value = item
      listFileUpload.value = [...item.files]
      textChat.value = item.text
      nextTick(() => {
        changeInput(inputChat.value)
        inputChat.value.focus()
      })
    }

    const openComfirmDetele = (item: any) => {
      itemDetele.value = {...item}
      isModalDeleteChat.value = true
    }

    const handleConfirmDelete = (status: boolean) => {
      if(status) {
        isProcessingDeleteUpdate.value = true
        const updates: any = {};
        updates[`/${itemDetele.value.key}`] = {...itemDetele.value, isDelete: true}
        update(chatListRef.value, updates).then(() => {
        }).catch(() => {
          console.log('eeeeeeeee');
        }).finally(() => {
          itemDetele.value = null
          isProcessingDeleteUpdate.value = false
        })
      }else{
        isModalDeleteChat.value = false
      }
    }
    const removeText = () => {
      itemEditComment.value = null
      textChat.value = ''
      listFileUpload.value = []
      nextTick(() => {
        resetInputChat()
      })
    }

    const resetInputChat = () => {
      inputChat.value.style.overflowY = "hidden"
      inputChat.value.style.height = "40px"
      inputChat.value.focus()
    }

    const formatDate = (timestamp: number) => {
      const date = new Date(timestamp)
      const month = date.getMonth()
      const day = date.getDate()
      const minutes = date.getMinutes().toString()
      return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${date.getHours()}:${minutes.length === 2 ? minutes : '0'+minutes}`
    }

    const openFile = () => {
      inputFile.value.click()
    }

    const uploadPreviewFile = async (e: any) => {
      const file = e.target.files[0]
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg'
      if (!isImage) {
        notification('error', 'You can only upload png, jpg, jpeg, gif file!')
      }
      const isLt10M = file.size / 1024 / 1024 <= 10;
      if (!isLt10M) {
        notification('error', 'Image must smaller than 10MB!')
      }
      const isDuplicaseName = listFileUpload.value.some((items: any) => file.name === items?.file?.name)
      if (isDuplicaseName) {
        notification('error', 'Duplicate image are not allowed!')
      }
      if(!isImage || !isLt10M || isDuplicaseName) {
        e.target.value = null
        return
      }
      const metadata = {
        contentType: file.type
      }
      const url = await getBase64(file)
      listFileUpload.value.push({
        file: file,
        metadata: metadata,
        url: url
      })
      e.target.value = null
    }

    const uploadFileServer = () => {
      listImageUpload.value = []
      listFileUploadHandleLoading.value.forEach((file: any) =>  {
        if(!!file?.file) {
          const storageRef = refStorage(storage, file.file.name);
          uploadBytes(storageRef, file.file, file.metadata).then(async (res) => {
            const url = await getDownloadURL(res.ref)
            listImageUpload.value = [...listImageUpload.value, { url: url}]
          }).catch((err) => {
            isLoadingUpload.value = false
            console.log('error', err);
          })
        }else{
          listImageUpload.value = [...listImageUpload.value, { url: file.url}]
        }
      })
    }

    const getBase64 = (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }

    const removeFile = (index: number) => {
      listFileUpload.value.splice(index, 1)
    }

    const previewImage = (files: any, index: number) => {
      listImagePreview.value.index = index
      listImagePreview.value.files = files.map((file: any) => file.url)
      isModalPreview.value = true
    }

    const onSelectEmoji = (emoji: any) => {
      textChat.value += emoji.i
    }

    const clickOutside = () => {
      isVisibleEmojiForm.value = false
    }

    return {
      userName,
      listChat,
      changeInput,
      submitChat,
      textChat,
      formTimeline,
      inputChat,
      editComment,
      handleConfirmDelete,
      itemEditComment,
      removeText,
      formatDate,
      inputFile,
      openFile,
      uploadPreviewFile,
      listFileUpload,
      removeFile,
      isLoadingUpload,
      objectChatUpFile,
      userId,
      isModalPreview,
      previewImage,
      listImagePreview,
      isModalDeleteChat,
      openComfirmDetele,
      onSelectEmoji,
      clickOutside,
      isVisibleEmojiForm
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

    &-avatar {
      width: 40px;
      height: 40px;

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

    &-left {
      display: flex;

      .form-chat-timeline-avatar {
        margin-right: 10px;
      }
    }

    &-right {
      display: flex;
      justify-content: end;
      flex-direction: row-reverse;

      .form-chat-timeline-avatar {
        margin-left: 10px;
      }

      .form-chat-timeline-content-info {
        display: flex;
        flex-direction: row-reverse;

        &-user {
          margin: 0;
          margin-left: 30px;
          display: flex;
          flex-direction: row-reverse;

          &-status {
            margin-left: 5px;
            margin-right: 0;
          }
        }

        &-time {
          margin: 0;
        }
      }
    }

    &-content {
      max-width: 70%;
      background-color: #DCE6F2;
      padding: 5px 12px 8px 12px;
      &-right {
        background-color: #EBF1DE;
      }
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
          &:hover{
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
          margin-right: 30px;

          &-status {
            display: inline;
            padding: 0 10px;
            border-radius: 5px;
            background-color: #ffffff;
            font-size: 10px;
            margin-right: 5px;
          }

          &-name {
            font-size: 16px;
            font-weight: bold;
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
    display: flex;
    align-items: flex-start;

    &-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
      margin-right: 5px;
    }

    &-input {
      flex-grow: 1;
      position: relative;

      textarea {
        scrollbar-width: thin;
        outline: none;
        resize: none;
        width: 100%;
        min-height: 40px;
        max-height: 100px;
        border-radius: 20px;
        padding: 7px 75px 7px 10px;
        font-size: 15px;
        border: 1px solid #385D8A;
      }

      .active-input-file {
        border-radius: 0 0 20px 20px;
        border-top: none;
      }

      &-tool {
        position: absolute;
        right: 8px;
        top: 10px;

        .anticon {
          font-size: 18px;
          cursor: pointer;
        }
      }

      &-files {
        position: absolute;
        width: 100%;
        top: 0;
        transform: translateY(-100%);
        background-color: #fff;
        padding: 5px;
        border-radius: 5px 5px 0 0;
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #385D8A;
        border-bottom: none;
        &-item {
          position: relative;
          padding: 4px;

          img {
            width: 80px;
            height: 80px;
            object-fit: cover;
          }

          &-close {
            position: absolute;
            top: 0;
            right: 0;
            border-radius: 10px;
            padding: 3px;
            background-color: #70707042;;
            cursor: pointer;
            &:hover{
              background-color: #33333373;
            }
          }
        }
      }
    }

    &-send {
      box-sizing: border-box;
      margin-left: 4px;
      height: 40px;
      width: 40px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;

      &:hover {
        background-color: rgba(22, 90, 238, 0.075);
      }

      &-icon {
        font-size: 20px;
        color: rgb(22, 90, 238);
      }
    }
  }
}

.mt-1 {
  margin-top: 1px;
}

.mt-10 {
  margin-top: 5px;
}

.mt-10 {
  margin-top: 10px;
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
}</style>

