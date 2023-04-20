<template>
  <div class="form-chat">
    <p class="form-chat-title">
      회계마감 관리사항
    </p>
    <div ref="formTimeline" class="form-chat-timeline">
      <div v-for="(items, index) in listChat" :key="index">
        <div class="form-chat-timeline-common" :class="{
          'form-chat-timeline-right': items.name === userName,
          'form-chat-timeline-left': items.name !== userName,
          'mt-1': index > 0 && listChat[index - 1].name === items.name,
          'mt-10': index > 0 && listChat[index - 1].name !== items.name,
        }">
          <div class="form-chat-timeline-avatar" :class="{ 'hidden-avatar': items.name === userName }">
            <!-- <img :class="{ 'hidden-avatar': index > 0 && listChat[index - 1].name === items.name, }" :src="items.avatar"
              alt=""> -->
            <a-badge :dot="true" :offset="[-5, 33]" :status="items.name === userName ? 'success' : 'error'"
              :class="{ 'hidden-avatar': index > 0 && listChat[index - 1].name === items.name }">
              <a-avatar shape="circle" size="large"
                :style="`background-color: ${items.name === userName ? '#1890ff' : '#f56a00'}`">{{ items.name
                }}</a-avatar>
            </a-badge>
          </div>


          <div class="form-chat-timeline-content" :class="{
            'borderRadiusleft10': (index === 0 || listChat[index - 1]?.name !== items.name) && items.name !== userName,
            'borderRadiusRight10': (index === 0 || listChat[index - 1]?.name !== items.name) && items.name === userName,
            'form-chat-timeline-content-right': items.name === userName,
            'borderEdit': idEditComment === items.id
          }">
            <div class="form-chat-timeline-content-info">
              <div class="form-chat-timeline-content-info-user">
                <span class="form-chat-timeline-content-info-user-status"
                  :class="{ 'hidden-avatar': index > 0 && listChat[index - 1].name === items.name }">{{ items.status
                  }}</span>
                <div class="form-chat-timeline-content-info-user-name"
                  :class="{ 'hidden-avatar': index > 0 && listChat[index - 1].name === items.name }">{{ items.name }}
                </div>
              </div>
              <div class="form-chat-timeline-content-info-time">{{ formatDate(items.createdAt) }}</div>
            </div>
            <div class="form-chat-timeline-content-files">
              <img class="form-chat-timeline-content-files-items" v-for="(file, indexFile) in items.files" :src="file.url" alt="" :key="file.url"> 
            </div>
            <div class="form-chat-timeline-content-text" v-html="items.text"></div>
          </div>


          <div class="form-chat-timeline-common-menu">
            <a-dropdown :placement="items.name === userName ? 'bottomRight' : 'bottomLeft'" :trigger="['click']">
              <EllipsisOutlined :style="{ fontSize: '16px' }" />
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="editComment(items)">
                    <EditOutlined />
                    수정
                  </a-menu-item>
                  <a-menu-item @click="deleteComment(items, index)">
                    <DeleteOutlined />
                    삭제
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
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
          <SmileOutlined style="margin: 0 5px;" />
          <FileAddOutlined @click="openFile" />
        </div>
        <div v-if="listFileUpload.length" class="form-chat-bottom-input-files">
          <div v-for="(file, index) in listFileUpload" class="form-chat-bottom-input-files-item">
            <img :src="file.url" alt="" :key="index">
            <CloseOutlined class="form-chat-bottom-input-files-item-close" @click="removeFile(index)"/>
          </div>
        </div>
      </div>
      <div class="form-chat-bottom-send">
        <SendOutlined class="form-chat-bottom-send-icon" @click="submitChat" />
      </div>
    </div>
    <input v-show="false" ref="inputFile" type="file" accept="image/png, image/jpeg, image/jpg image/gif"
      @change="uploadPreviewFile" />
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, nextTick, onMounted, reactive, watch, computed } from 'vue'
import { EllipsisOutlined, EditOutlined, DeleteOutlined, CloseOutlined, SmileOutlined, FileAddOutlined, SendOutlined } from '@ant-design/icons-vue';
import { databaseFirebase, storage } from "@/firebaseConfig";
import {
  ref as reffb,
  push,
  set,
  onChildAdded,
  onValue,
} from "firebase/database";
import { ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import notification from '@/utils/notification';
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
      default: 'keyChatChannelCommon'
    },
  },
  components: {
    EllipsisOutlined,
    EditOutlined,
    DeleteOutlined,
    CloseOutlined,
    SmileOutlined,
    FileAddOutlined,
    SendOutlined
  },
  setup(props, { emit }) {
    const inputFile = ref<any>()
    const userName = ref(sessionStorage.getItem("username"));
    let textChat = ref('')
    const formTimeline: any = ref()
    const inputChat: any = ref()
    let idEditComment = ref<any>(null)
    let listFileUpload: any = ref([])
    let listImageUpload: any = ref([])
    let payload: any = ref({
      name: userName.value,
      avatar: '',
      text: '',
      files: [],
      createdAt: new Date().getTime(),
      status: '일반',
      uid: userName.value
    })
    const listChat = ref<any>([])

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

    let chatListRef = reffb(databaseFirebase, channelChatSubrights());

    const getListContentChat = () => {
      onValue(
        chatListRef,
        (snapshot) => {
          const objList = snapshot.val()
          let arr = []
          for (const key in objList) {
            arr.push({
              key: key,
              files: objList?.files || [],
              ...objList[key]
            })
          }
          listChat.value = arr
          nextTick(() => {
            formTimeline.value.scrollTop = 10000000
          })
        }
        // {
        //   onlyOnce: true,
        // }
      );
    };

    const submitChat = () => {
      if (!textChat.value.trim() && !listFileUpload.value.length) return
      payload.value = {
        ...payload.value,
        text: textChat.value,
        files: []
      }
      if(listFileUpload.value.length) {
        uploadFileServer()
      }else {
        sendChat()
      }
    };

    const sendChat = () => {
      if (idEditComment.value === null) {
        if(listImageUpload.value.length) {
          payload.value = {
            ...payload.value,
            files: listImageUpload.value
          }
          textChat.value = "";
          listFileUpload.value = []
          listImageUpload.value = []
          listChat.value = [...listChat.value, payload.value]
        }
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
            formTimeline.value.scrollTop = 10000000
          })
      } 
      else {
        textChat.value = "";
        nextTick(() => {
          formTimeline.value.scrollTop = 10000000
          resetInputChat()
        })
      }
    }

    watch(() => [props.idUserTo, props.keyChatChannel], (value) => {
      if (!!value) {
        chatListRef = reffb(databaseFirebase, channelChatSubrights());
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
      if(value.length && value.length === listFileUpload.value.length){
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
      // idEditComment.value = item.id
      // textChat.value = item.content
      // nextTick(() => {
      //   changeInput(inputChat.value)
      //   inputChat.value.focus()
      // })
    }
    const deleteComment = (items: any, index: number) => {
      // if (items.id === idEditComment.value) {
      //   textChat.value = ''
      //   idEditComment.value = null
      //   nextTick(() => {
      //     changeInput(inputChat.value)
      //     inputChat.value.focus()
      //   })
      // }
      // listChat.value.splice(index, 1)
    }
    const removeText = () => {
      // idEditComment.value = null
      // textChat.value = ''
      // nextTick(() => {
      //   resetInputChat()
      // })
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
      return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${date.getHours()}:${date.getMinutes()}`
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
      const isDuplicaseName = listFileUpload.value.some((items: any) => file.name === items.file.name)
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
      listFileUpload.value.forEach((file: any) =>  {
        const storageRef = refStorage(storage, file.file.name);
        uploadBytes(storageRef, file.file, file.metadata).then(async (res) => {
          const url = await getDownloadURL(res.ref)
          listImageUpload.value = [...listImageUpload.value, { url: url}]
        }).catch((err) => {
          console.log('error', err);
        })
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
    return {
      userName,
      listChat,
      changeInput,
      submitChat,
      textChat,
      formTimeline,
      inputChat,
      editComment,
      deleteComment,
      idEditComment,
      removeText,
      formatDate,
      inputFile,
      openFile,
      uploadPreviewFile,
      listFileUpload,
      removeFile
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
          width: 200px;
          height: 200px;
          object-fit: cover;
          display: block;
          padding: 5px;
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
        background-color: #EBF1DE;
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
            width: 50px;
            height: 50px;
            object-fit: cover;
          }

          &-close {
            position: absolute;
            top: 0;
            right: 0;
            background-color: red;
            border-radius: 10px;
            cursor: pointer;
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

