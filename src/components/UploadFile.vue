<template>
  <div class="fileuploader-container mt-20">
    <span>등본 등 증빙파일</span>
    <a-upload
      v-model:file-list="fileList"
      name="file"
      action="https://dev-jangbuda-api.bankda.com/api/upload/major-insurance"
      @change="onFileChange"
      :beforeUpload="beforeUpload"
      :headers="headers"
    >
      <div class="d-flex d-flex-center justify-content-center">
        <div class="btn-upload">
          <img src="@/assets/images/iconUpload.png" alt="" class="iconUpload" />
          <span>{{ label }}</span>
        </div>
      </div>
    </a-upload>

  </div>
</template>

<script src="" lang="ts">
import notification from "@/utils/notification";
import {
DeleteOutlined,
MinusCircleOutlined,
PlusSquareOutlined,
SaveOutlined,
UploadOutlined,
WarningFilled,
ZoomInOutlined,
} from "@ant-design/icons-vue";
import { Upload, UploadProps } from "ant-design-vue";
import { defineComponent, ref } from "vue";

function getBase64(file: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(file);
}

export default defineComponent({
  props: {
    category: {
      type: String,
      default: "SubscriptionRequestCompanyLicense",
    },
    imageId: {
      type: Number,
      default: null,
      require: true,
    },
    imageSource: {
      type: String,
      default: null,
      require: true,
    },
    label: {
      type: String,
      default: '파일 선택'
    }
  },
  components: {
    UploadOutlined,
    MinusCircleOutlined,
    ZoomInOutlined,
    SaveOutlined,
    DeleteOutlined,
    PlusSquareOutlined,
    WarningFilled,
  },
  setup(props: any, { emit }) {
    const fileList = ref<UploadProps["fileList"]>([]);
    const loading = ref<boolean>(false);
    let messageUpload = ref<any>("");
    const file = ref<any>("");
    const fileName = ref<any>("");
    const onFileChange = async (info: {
      [x: string]: any;
      target: { files: any[] };
    }) => {
      if (info.file.status === 'done') {
        emit("response-fileId", info.file.response);
      }
    };
    const beforeUpload = (file: File) => {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        notification('error', "Image must smaller than 2MB!");
        fileList.value = [];
        return false;
      }
      // Remove previously uploaded files
      fileList.value = [];
      return new Promise(resolve => {
          // add company id to payload
          const formData = new FormData();
          formData.append('file', file);
          formData.append('companyId', '2');
          console.log('resolve', resolve)
          resolve(formData);
      });
    }

    return {
      loading,
      messageUpload,
      fileList,
      Upload,
      file,
      fileName,
      onFileChange,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      beforeUpload
    };
  },
});
</script>

<style lang="scss" scoped>
.fileuploader-container {
  display: flex;
  align-items: center;

  padding: 10px;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  .iconUpload {
    width: 20px;
    height: 20px;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
  .btn-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #f5f5f5;
    border-radius: 10px;
    padding: 10px 20px;
    margin-left: 10px;
    cursor: pointer;
    &:hover {
      background: #e5e5e5;
      transition: all 0.3s ease;
    }
    span {
      font-size: 14px;
      font-weight: 500;
      color: #000;
    }

  }
}


</style>
