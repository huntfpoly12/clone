<template>
  <a-row class="container_upload custom-flex clr" :gutter="[16, 0]">
    <a-col :span="16">
      <a-form-item class="clb-label title" :label="title">
        <a-upload
          single
          type="file"
          v-model:file-list="fileList"
          :show-upload-list="true"
          name="fileUpload"
          :before-upload="beforeUpload"
          :on-remove="onRemove"
          @change="handleChange"
          :max-count="1"
          accept=".tiff,.png,.jpeg,.jpg"
        >
          <a-button class="button-upload">
            <upload-outlined></upload-outlined>
            파일선택...
          </a-button>
        </a-upload>
      </a-form-item>
      <a-space :size="10" align="start" style="margin-top: 8px">
        <div>
          <warning-filled :style="{ fontSize: '15px' }" />
        </div>
        <div :span="22" class="warring-modal">
          <p>아래 형식에 맞는 이미지파일을 선택한 후 업로드하십시요.</p>
          <p>파일형식 : JPG(JPEG), TIF, GIF, PNG</p>
          <p>파일용량 : 최대 5MB</p>
        </div>
      </a-space>
    </a-col>

    <a-col :span="7">
      <div class="img-preview">
        <img
          v-if="imageUrl && showImg == true"
          :src="imageUrl"
          @click="handlePreview"
        />
        <img v-else src="../assets/images/imgdefault.jpg" />
      </div>
    </a-col>

    <a-modal
      :visible="previewVisible"
      :title="title"
      :footer="null"
      @cancel="handleCancel"
    >
      <img style="width: 100%" :src="imageUrl" />
    </a-modal>
  </a-row>
</template>

<script src="" lang="ts">
import { ref, defineComponent } from "vue";
import { message, Upload } from "ant-design-vue";
import type { UploadProps } from "ant-design-vue";
import {
  UploadOutlined,
  MinusCircleOutlined,
  ZoomInOutlined,
  SaveOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  WarningFilled,
} from "@ant-design/icons-vue";
import { title } from "process";

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

export default defineComponent({
  props: {
    title: {
      type: String,
    },
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
  methods: {
    onFileChange(e: any) {
      const file = e.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
    },
    typeFIle(file: any) {
      const isJpgOrPng =
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg";
      return isJpgOrPng;
    },
  },
  setup(props: any, { emit }) {
    const fileList = ref<UploadProps["fileList"]>([]);
    const loading = ref<boolean>(false);
    let imageUrl = ref<any>("");
    const file = ref<any>("");
    const previewVisible = ref(false);
    var fileName = ref<any>("");
    var showImg = ref<boolean>(true);
    const beforeUpload = (file: any) => {
      showImg.value = true;
      const isJpgOrPng =
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "application/pdf" ||
        file.type === "image/tiff";
      if (!isJpgOrPng) {
        message.error("You can not upload file!");
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        loading.value = false;
        message.error("Image must smaller than 5MB!");
      }
      fileName = file.name;
      return isLt5M && true;
    };
    const onRemove = () => {
      showImg.value = false;
    };

    const handleChange = (info: any, fileList: any) => {
      fileName = info.file.name;
      getBase64(info.file.originFileObj, (base64Url: string) => {
        imageUrl.value = base64Url;
        loading.value = false;
        emit("update-img", imageUrl.value);
      });
    };

    const handleCancel = () => {
      previewVisible.value = false;
    };
    const handlePreview = () => {
      previewVisible.value = true;
    };

    return {
      previewVisible,
      handleCancel,
      handlePreview,
      imageUrl,
      handleChange,
      beforeUpload,
      fileList,
      onRemove,
      Upload,
      file,
      fileName,
      showImg,
    };
  },
});
</script>

<style lang="scss">
.container_upload {
  width: 100%;
}

// .imgPreview {
//   cursor: pointer;
//   //   width: 100%;
//   width: 50px;
//   height: 350px;
// }
.img-preview {
  position: relative;
  width: 100%;
  padding-top: 142%;
  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
.imgPreview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title {
  padding-right: 8px;
}

.button_remove {
  width: 100px;
  margin: 0 auto;
  margin-top: 10px;
}

.ant-space-item {
  padding-top: 5px;
}

.ant-upload-list-item-error .ant-upload-text-icon {
  .anticon {
    color: rgba(0, 0, 0, 0.45);
  }
}

.ant-upload-list-text .ant-upload-list-item-name {
  color: rgba(0, 0, 0, 0.45);
}

.container_upload {
  .ant-tooltip {
    display: none;
  }
}

.button-upload {
  width: 200px;
  text-align: left;
  border-radius: 5px;
}
</style>
