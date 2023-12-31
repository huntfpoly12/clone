<template>
<!--  <div class="fileuploader-container mt-20">-->
<!--    <span>등본 등 증빙파일</span>-->
    <a-upload
      v-model:file-list="fileList"
      name="file"
      :beforeUpload="beforeUpload"
      :headers="headers"
      :disabled="disabled"
    >
      <div class="d-flex d-flex-center justify-content-center">
        <div :class="`btn-upload ${disabled && 'disable'}`">
          <img src="@/assets/images/iconUpload.png" alt="" class="iconUpload" />
          <span>{{ label }}</span>
        </div>
      </div>
      <template #removeIcon>
        <a-tooltip placement="bottom" title="삭제">
          <div>
            <DeleteOutlined />
          </div>
        </a-tooltip>
      </template>

    </a-upload>

<!--  </div>-->
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
import {defineComponent, ref, watch, watchEffect} from "vue";
import Repository from "@/repositories";
import { Message } from "@/configs/enum";

const uploadRepository = Repository.get("upload");

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
    },
    isFileList: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
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
    const beforeUpload = async (file: File) => {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        notification('error', "Image must smaller than 2MB!");
        fileList.value = [];
        return false;
      }
      // Remove previously uploaded files
      fileList.value = [];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('companyId', '2');
      try {
        const data = await uploadRepository.majorInsurance(formData)
        const status = data.status;
        if (status === 201) {
          emit("response-fileId", data.data);
          // show success message
          notification('success', '업데이트 완료')
        } else if (status === 'error') {
          // show error message
          notification('error', Message.getCommonMessage('109').message)
        }
      } catch (error) {
        console.log('error', error)
      }

      return false;
    }
    watchEffect(() => {
      if (props.isFileList) fileList.value = []
    })
    return {
      loading,
      messageUpload,
      fileList,
      Upload,
      file,
      fileName,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      beforeUpload
    };
  },
});
</script>

<style lang="scss" scoped>
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
  background: #c0c0c0;
  border-radius: 5px;
  padding: 5px 20px;
  cursor: pointer;
  &:hover {
    background: #e5e5e5;
    transition: all 0.3s ease;
  }
  &.disable {
    background: #e5e5e5;
    cursor: not-allowed;
  }
  span {
    font-size: 14px;
    font-weight: 500;
    color: #000;
  }
}
</style>
