<template>
  <div class="input-edit-chat" :class="{'input-edit-chat-dragFile': isDragging}" @dragover="dragover" @dragleave="dragleave" @drop="drop">
    <div class="input-edit-chat-input">
      <textarea rows="1" ref="inputChat" :placeholder="placeholder" :value="contentBinding" @input="changeInput"
        @keypress.enter.exact.prevent="submitChat" :disabled="disabled"></textarea>
    </div>

    <div class="input-edit-chat-input-action">
      <div class="input-edit-chat-input-action-icon">
        <div class="input-edit-chat-input-action-icon-files" @click="openFile">
          <FileAddOutlined />
        </div>
      </div>
      <div class="input-edit-chat-input-action-btn">
        <button-basic class="mr-10" text="취소" type="default" mode="outlined" :width="80" @onClick="resetInputChat()"
          :disabled="disabled || (!contentBinding.trim() && !filesUpload.length)" />
        <button-basic text="저장" type="default" mode="contained" :width="80" @onClick="submitChat()"
          :disabled="disabled || (!contentBinding.trim() && !filesUpload.length)" />
      </div>
    </div>
    <div v-if="filesUpload.length" class="input-edit-chat-input-files">
      <div v-for="(file, index) in filesUpload" class="input-edit-chat-input-files-item" :key="index">
        <div class="input-edit-chat-input-files-item-file">
          <FileOutlined style="margin-right: 10px;" />
          <div class="input-edit-chat-input-files-item-file-info">
            <p class="input-edit-chat-input-files-item-file-info-name">{{ file?.file ? file.file.name : file.name }}</p>
          </div>
        </div>
        <DeleteOutlined class="input-edit-chat-input-files-item-delete" @click="removeFile(index)" />
      </div>
    </div>
  </div>
  <input v-show="false" ref="inputFile" type="file" multiple @change="uploadPreviewFile" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, nextTick } from 'vue'
import { EllipsisOutlined, EditOutlined, DeleteOutlined, CloseOutlined, SmileOutlined, FileAddOutlined, FileOutlined, FileTextOutlined } from '@ant-design/icons-vue';
import notification from '@/utils/notification';
import ModalPreviewListImage from './ModalPreviewListImage.vue'
import StatusChat from './StatusChat.vue'
import MarkdownCustom from './MarkdownCustom.vue';
import { companyId } from "@/helpers/commonFunction"

import Repository from "@/repositories";
import { Message } from "@/configs/enum";

const uploadRepository = Repository.get("upload");
export default defineComponent({
  props: {
    content: {
      type: String,
      default: ''
    },
    files: {
      type: Array,
      default: []
    },
    placeholder: {
      type: String,
      default: ''
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
    SmileOutlined,
    FileOutlined,
    FileAddOutlined,
    FileTextOutlined,
    ModalPreviewListImage,
    StatusChat,
    MarkdownCustom,
  },
  setup(props, { emit }) {
    const acYear: any = computed(() => parseInt(sessionStorage.getItem("acYear") ?? "0"))
    const globalFacilityBizId: any = ref(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0"))

    const inputFile = ref<any>()
    let contentBinding = ref(props.content || '')
    let filesUpload: any = ref(props.files || [])
    const inputChat: any = ref()
    const objectChatUpFile: any = ref(null)
    const listChat = ref<any>([])
    let listImagePreview: any = ref({
      index: 0,
      files: [],
    })

    const isDragging = ref(false)
    const date = new Date()
    const currentTime = date.getFullYear() + '-' + ((date.getMonth() + 1) < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))

    const submitChat = () => {
      emit('submitChat')
    };

    watch(() => filesUpload.value, (value) => {
      emit('update:files', value)
    })

    watch(() => contentBinding.value, (value) => {
      emit('update:content', value)
    })

    const changeInput = (event: any) => {
      const elment = event?.target ? event.target : event
      const style = getComputedStyle(elment, null);
      const verticalBorders = Math.round(parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth));
      const maxHeight = parseFloat(style.maxHeight) || 200;
      elment.style.height = "auto";
      const newHeight = elment.scrollHeight + verticalBorders;
      elment.style.overflowY = newHeight > maxHeight ? "auto" : "hidden";
      elment.style.height = Math.min(newHeight, maxHeight) + "px";
    }

    const resetInputChat = () => {
      contentBinding.value = ''
      filesUpload.value = []
      inputChat.value.style.overflowY = "hidden"
      inputChat.value.style.height = "40px"
      focus()
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
      if (props.disabled) return
      inputFile.value.click()
    }

    const uploadPreviewFile = async (e?: any, files?: any) => {
      let listFile: any = []
      if (!!files && files.length) {
        listFile = Array.from(files)
      } else {
        listFile = Array.from(e.target.files)
      }

      if ((listFile.length + filesUpload.value.length) > 10) {
        notification("error", Message.getMessage("COMMON", "1005").message);
        e.target.value = null
        return
      }

      listFile.forEach((file: any) => {
        const isLt10M = file.size / 1024 / 1024 <= 10;
        if (!isLt10M) {
          notification("error", Message.getMessage("COMMON", "1003").message);
        }
        const isDuplicaseName = filesUpload.value.some((items: any) => file.name === items?.file?.name)
        if (isDuplicaseName) {
          notification("error", Message.getMessage("COMMON", "1004").message);
        }
        if (!isLt10M || isDuplicaseName) {
          e.target.value = null
          return
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('companyId', companyId);
        formData.append('fiscalYear', acYear.value);
        formData.append('facilityBusinessId', globalFacilityBizId.value);
        uploadRepository.accountingFile(formData).then(async (res: any) => {
          filesUpload.value.push({
            id: res.data.id,
            contentType: file.type,
            name: file.name,
          })
        }).catch((error: any) => {
          notification('error', error.message)
        }).finally(() => {
          e.target.value = null
        })
      });
    }

    const removeFile = (index: number) => {
      if (props.disabled) return
      filesUpload.value.splice(index, 1)
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
      nextTick(() => {
        inputChat.value.focus()
      })
    }

    const dragover = (event: any) => {
      event.preventDefault();
      if (props.disabled) return
      isDragging.value = true;
    }

    const dragleave = (event: any) => {
      if (props.disabled) return
      isDragging.value = false;
    }

    const drop = (event: any) => {
      event.preventDefault();
      if (props.disabled) return
      uploadPreviewFile(null, event.dataTransfer.files)
      isDragging.value = false;
    }

    return {
      listChat,
      changeInput,
      submitChat,
      contentBinding,
      inputChat,
      formatDate,
      inputFile,
      openFile,
      uploadPreviewFile,
      filesUpload,
      removeFile,
      objectChatUpFile,
      listImagePreview,
      currentTime,
      formatFileSize,
      resetInputChat,
      resizeInput,
      focus,
      dragover,
      dragleave,
      drop,
      isDragging
    }
  },
})
</script>

<style lang="scss" scoped>
.input-edit-chat {
  &-dragFile {
    border: 1px dashed rgb(0, 217, 255);
  }
  &-input {
    flex-grow: 1;

    textarea {
      display: block;
      scrollbar-width: thin;
      outline: none;
      resize: none;
      width: 100%;
      min-height: 38px;
      max-height: 200px;
      padding: 7px 10px;
      font-size: 14px;
      border: 1px solid #b3b5b6;
      border-radius: 5px;

      &:placeholder-shown {
        font-style: italic;
        font-size: 13px;
        padding: 8px 10px;
      }
    }

    &-action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;

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
      }
    }

    &-files {
      width: 100%;

      &-item {
        background-color: #f7f7f7;
        margin-top: 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px;

        &:hover {
          background-color: #fafafa;
        }

        &-file {
          flex-grow: 1;
          display: flex;
          align-items: center;
          padding-right: 20px;
          overflow: hidden;

          &-info {
            p {
              margin: 0;
              white-space: nowrap;
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
