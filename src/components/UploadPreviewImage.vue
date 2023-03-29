<template>
  <div class="upload-pewview-image" :style=" !!width ? `max-width: ${width}px; width: 100%` : ''">
    <a-upload list-type="picture-card" :multiple="multiple" v-model:file-list="fileList" @preview="handlePreview"
      headers="dsadasdsad" @change="changeFile" :customRequest="customRequest" :before-upload="beforeUpload"
      accept="image/png, image/jpeg, image/jpg image/gif">
      <div v-if="fileList.length < limit">
        <div class="ant-btn-upload">
          <p class="ant-btn-upload-text">이미지 파일을 여기에 끌이다 놓으세요</p>
          <img src="@/assets/images/iconImage.png" class="ant-btn-upload-image" alt="">
          <p class="ant-btn-upload-text">또는</p>
          <button class="ant-btn-upload-button">파일 선택</button>
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%; margin-top: 20px" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import notification from '@/utils/notification';
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  percent?: number;
  url?: string;
  preview?: string;
  originFileObj?: any;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}
export default defineComponent({
  props: {
    limit: {
      type: Number,
      default: 8
    },
    listImageFile: {
      type: Array,
      default: []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit }) {
    let fileList = ref<any[]>([])
    let isFailUpload = ref(false)
    const previewImage = ref<string | undefined>('');
    const previewVisible = ref<boolean>(false);

    watch(() => props.listImageFile, (value) => {
      fileList.value = value
    })

    const getBase64 = (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
    const handlePreview = async (file: FileItem) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string;
      }
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
    };
    const handleCancel = () => {
      previewVisible.value = false;
    };

    const changeFile = ({ fileList: newFileList }: FileInfo) => {
    }

    const beforeUpload = (file: any) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg'
      if (!isImage) {
        notification('error', 'You can only upload png, jpg, jpeg, gif file!')
      }
      const isLt10M = file.size / 1024 / 1024 <= 10;
      if (!isLt10M) {
        notification('error', 'Image must smaller than 10MB!')
      }
      const isDuplicaseName = fileList.value.some((items: any) => file.name === items.name)
      if (isDuplicaseName) {
        notification('error', 'Duplicate image are not allowed!')
      }
      isFailUpload.value = isImage && isLt10M && !isDuplicaseName
    };

    const customRequest = (e: any) => {
      if (isFailUpload.value) {
        setTimeout(() => {
          e.onSuccess("ok");
          emit("update:listImageFile", fileList.value)
        }, 0);
      } else {
        fileList.value.splice(fileList.value.length - 1, 1)
        setTimeout(() => {
          e.onError("");
          emit("update:listImageFile", fileList.value)
        }, 0);
      }
    }

    return {
      handlePreview,
      beforeUpload,
      previewVisible,
      fileList,
      handleCancel,
      previewImage,
      changeFile,
      customRequest,
    }
  }
})

</script>
<style lang="scss">
.upload-pewview-image {
  .ant-upload-list-picture-card-container {
    width: 120px;
    height: 120px;
    margin: 8px 5px;
  }

  .ant-upload-list-item {
    border-radius: 15px;
  }

  .ant-upload.ant-upload-select-picture-card {
    width: 120px;
    height: 120px;
    border-radius: 15px;
    margin: 0;
  }

  .ant-btn-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    &-text {
      font-size: 11px;
    }

    &-image {
      width: 25px;
      margin: 5px 0;
    }

    &-button {
      font-size: 11px;
      background-color: #4472C4;
      border: none;
      outline: none;
      color: #fff;
      border-radius: 5px;
      padding: 0 15px;
    }
  }
}
</style>
