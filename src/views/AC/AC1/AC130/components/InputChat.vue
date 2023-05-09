<template>
  <div class="input-edit-chat">
    <div class="input-edit-chat-input">
      <textarea rows="1" ref="inputChat" :placeholder="placeholder" v-model="textChat" @input="changeInput"
        @keypress.enter.exact.prevent="submitChat"></textarea>

      <!-- <div v-if="filesUpload.length" class="input-edit-chat-input-files">
            <div v-for="(file, index) in filesUpload" class="input-edit-chat-input-files-item">
              <img :src="file.url" alt="" :key="index">
              <CloseOutlined class="input-edit-chat-input-files-item-close" @click="removeFile(index)"/>
            </div>
          </div> -->
    </div>

    <div class="input-edit-chat-input-action">
      <div class="input-edit-chat-input-action-icon">
        <div class="input-edit-chat-input-action-icon-files" @click="openFile">
          <FileAddOutlined />
        </div>
        <a-dropdown :visible="isVisibleEmojiForm">
          <div class="input-edit-chat-input-action-icon-emoji" @click.stop="isVisibleEmojiForm = !isVisibleEmojiForm">
            <SmileOutlined style="margin: 0 5px;" />
          </div>
          <template #overlay>
            <EmojiPicker theme="dark" :native="true" :disable-skin-tones="true" :hide-group-names="true"
              :static-texts="{ placeholder: '그림 이모티콘 검색' }" @select="onSelectEmoji" v-click-outside="clickOutside" />
          </template>
        </a-dropdown>
      </div>
      <div class="input-edit-chat-input-action-btn">
        <button-basic class="mr-10" text="삭제" type="default" mode="outlined" :width="80" @onClick="resetInputChat()" />
        <button-basic text="저장" type="default" mode="contained" :width="80" @onClick="submitChat()" />
      </div>
    </div>
    <div v-if="filesUpload.length" class="input-edit-chat-input-files">
      <div v-for="(file, index) in filesUpload" class="input-edit-chat-input-files-item">
        <div class="input-edit-chat-input-files-item-file">
          <FileOutlined style="margin-right: 10px;" />
          <div class="input-edit-chat-input-files-item-file-info">
            <p class="input-edit-chat-input-files-item-file-info-name">{{ file?.file ? file.file.name : file.name }}</p>
            <p class="input-edit-chat-input-files-item-file-info-size">({{ formatFileSize(file?.file ? file.file.size : file.size) }})
            </p>
          </div>
        </div>
        <DeleteOutlined class="input-edit-chat-input-files-item-delete" @click="removeFile(index)" />
      </div>
    </div>
  </div>
  <input v-show="false" ref="inputFile" type="file" accept="image/png, image/jpeg, image/jpg image/gif"
    @change="uploadPreviewFile" />
</template>
  
<script lang="ts">
import { defineComponent, ref, nextTick, watch, computed } from 'vue'
import { EllipsisOutlined, EditOutlined, DeleteOutlined, CloseOutlined, SmileOutlined, FileAddOutlined, FileOutlined, } from '@ant-design/icons-vue';
import notification from '@/utils/notification';
import ModalPreviewListImage from './ModalPreviewListImage.vue'
import StatusChat from './StatusChat.vue'
// import picker compopnent
import EmojiPicker from 'vue3-emoji-picker'
// import css
import 'vue3-emoji-picker/css'
export default defineComponent({
  props: {
    textChatProp: {
      type: String,
      default: ''
    },
    filesUploadProps: {
      type: Array,
      default: []
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  components: {
    EllipsisOutlined,
    EditOutlined,
    DeleteOutlined,
    CloseOutlined,
    SmileOutlined,
    FileOutlined,
    FileAddOutlined,
    ModalPreviewListImage,
    EmojiPicker,
    StatusChat
  },
  setup(props, { emit }) {
    const inputFile = ref<any>()
    let textChat = ref(props.textChatProp)
    const inputChat: any = ref()
    let filesUpload: any = ref(props.filesUploadProps)
    let isVisibleEmojiForm = ref(false)
    const objectChatUpFile: any = ref(null)
    const listChat = ref<any>([])
    let listImagePreview: any = ref({
      index: 0,
      files: [],
    })
    const date = new Date()
    const currentTime = date.getFullYear() + '-' + ((date.getMonth() + 1) < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))

    const submitChat = () => {
      emit('submitChat')
    };

    watch(() => filesUpload.value, (value) => {
      emit('update:filesUpload', value)
    })

    watch(() => textChat.value, (value) => {
      emit('update:textChatProp', value)
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

    const resetInputChat = () => {
      textChat.value = ''
      filesUpload.value = []
      inputChat.value.style.overflowY = "hidden"
      inputChat.value.style.height = "40px"
      inputChat.value.focus()
      emit('cancel')
    }

    const formatDate = (timestamp: number) => {
      const date = new Date(timestamp)
      const month = date.getMonth()
      const day = date.getDate()
      const minutes = date.getMinutes().toString()
      return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${date.getHours()}:${minutes.length === 2 ? minutes : '0' + minutes}`
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
      const isDuplicaseName = filesUpload.value.some((items: any) => file.name === items?.file?.name)
      if (isDuplicaseName) {
        notification('error', 'Duplicate image are not allowed!')
      }
      if (!isImage || !isLt10M || isDuplicaseName) {
        e.target.value = null
        return
      }
      const metadata = {
        contentType: file.type
      }
      const url = await getBase64(file)
      filesUpload.value.push({
        file: file,
        metadata: metadata,
        url: url
      })
      e.target.value = null
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
      filesUpload.value.splice(index, 1)
    }

    const onSelectEmoji = (emoji: any) => {
      textChat.value += emoji.i
      changeInput(inputChat.value)
    }

    const clickOutside = () => {
      isVisibleEmojiForm.value = false
    }

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1000
      const decimalPoint = 2
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)) + ' ' + sizes[i];
    }

    const resizeInput = () => {
      changeInput(inputChat.value)
    }

    const focus = () => {
      inputChat.value.focus()
    }

    return {
      listChat,
      changeInput,
      submitChat,
      textChat,
      inputChat,
      formatDate,
      inputFile,
      openFile,
      uploadPreviewFile,
      filesUpload,
      removeFile,
      objectChatUpFile,
      listImagePreview,
      onSelectEmoji,
      clickOutside,
      isVisibleEmojiForm,
      currentTime,
      formatFileSize,
      resetInputChat,
      resizeInput,
      focus
    }
  },
})
</script>
  
<style lang="scss" scoped>
.input-edit-chat {
  padding-top: 5px;

  &-input {
    flex-grow: 1;

    textarea {
      scrollbar-width: thin;
      outline: none;
      resize: none;
      width: 100%;
      min-height: 40px;
      max-height: 100px;
      // border-radius: 20px;
      padding: 7px 75px 7px 10px;
      font-size: 15px;
      border: 1px solid #385D8A;
    }

    &-action {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-icon {
        display: flex;
        align-items: center;

        &-files {
          background-color: #cfd8dc;
          width: 26px;
          height: 26px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          margin-right: 5px;
        }

        &-emoji {
          background-color: #cfd8dc;
          width: 26px;
          height: 26px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      }
    }

    .active-input-file {
      border-radius: 0 0 20px 20px;
      border-top: none;
    }

    &-files {
      width: 100%;
      background-color: #fff;

      &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px;

        &-file {
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

        &-delete {
          cursor: pointer;
        }
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
</style>