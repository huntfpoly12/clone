<template>
  <a v-if="dataReply && Object.keys(dataReply).length" class="preview-reply" :href="`#${dataReply.key}`">
    <div class="preview-reply-avatar">
      <a-avatar shape="circle" size="large"
        :style="`background-color: ${dataReply.userId === userId ? '#1890ff' : '#f56a00'}`">{{ dataReply.name
        }}</a-avatar>
    </div>
    <div class="preview-reply-content">
      <div class="preview-reply-content-info">
        <div class="preview-reply-content-info-user">
          <span class="preview-reply-content-info-user-status">{{ dataReply.status }}</span>
          <div class="preview-reply-content-info-user-name"
            :class="{ 'preview-reply-content-info-user-name-login': dataReply.userId === userId }">{{
              dataReply.name }}
          </div>
        </div>
        <div class="preview-reply-content-info-time">{{ formatDate(dataReply.createdAt) }}</div>
      </div>
      <div class="preview-reply-content-background">
        <div class="preview-reply-content-text">
          <MarkdownCustom :options="{ source: dataReply.text, linkify: true, typographer: true, highlight: true }" />
        </div>
        <div v-if="dataReply?.files && dataReply?.files.length" class="preview-reply-content-files">
          <div class="preview-reply-content-files-preview">
            <div class="preview-reply-content-files-preview-images">
              <img
                v-for="(file, indexFile) in dataReply.files.filter((item: any) => item?.contentType.includes('image/'))"
                :key="indexFile" class="preview-reply-content-files-preview-images-image" :src="file.url" alt="">
            </div>
            <div v-for="(file, indexFile) in dataReply.files.filter((item: any) => !item?.contentType.includes('image/'))"
              :key="indexFile" class="preview-reply-content-files-preview-filetext">
              <FileTextOutlined style="margin-right: 10px; font-size:30px" />
              <div class="preview-reply-content-files-preview-filetext-info">
                <p class="preview-reply-content-files-preview-filetext-info-name">{{ file.name }}</p>
                <p class="preview-reply-content-files-preview-filetext-info-size">({{
                  formatFileSize(file.size) }})</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import StatusChat from './StatusChat.vue'
import 'vue3-emoji-picker/css'
import MarkdownCustom from './MarkdownCustom.vue';
import { getJwtObject } from "@bankda/jangbuda-common";
export default defineComponent({
  props: {
    dataReply: {
      type: Object,
      default: () => { }
    }
  },
  components: {
    StatusChat,
    MarkdownCustom
  },
  setup(props, { emit }) {
    const token = ref(sessionStorage.getItem("token"))
    let jwtObject = getJwtObject(token.value!);
    const userId = jwtObject.userId

    const formatDate = (timestamp: number) => {
      const date = new Date(timestamp)
      const month = date.getMonth()
      const day = date.getDate()
      const minutes = date.getMinutes().toString()
      return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${date.getHours()}:${minutes.length === 2 ? minutes : '0' + minutes}`
    }

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1000
      const decimalPoint = 2
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)) + ' ' + sizes[i];
    }
    return {
      userId,
      formatDate,
      formatFileSize
    }
  },
})
</script>
  
<style lang="scss" scoped>
.preview-reply {
  display: flex;
  align-items: flex-start;
  position: relative;
  margin-top: 5px;
  border-left: 3px solid #e7e6e6;
  padding: 5px;
  height: 100px;
  overflow: hidden;
  background-color: rgba(2, 2, 2, 0.027);
  opacity: .5;

  .form-chat-timeline-avatar {
    pointer-events: none;
  }

  .form-chat-timeline-content {
    pointer-events: none;
    width: 100%;
    margin-right: 0 !important;
  }

  .form-chat-timeline-content-files {
    background-color: transparent;
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

    &-text {
      word-wrap: break-word;
      white-space: pre-wrap;
      font-size: 15px;
      color: #333333;
    }

    &-files {
      color: #333333;;
      background-color: transparent;
    }
  }

}
</style>