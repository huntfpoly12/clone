<template>
  <a-row class="container_upload" :gutter="[16, 0]">
    <a-col v-if="imageUrl" :span="16">
      <a-form-item class="title" :label="title">
        <a-upload v-model:file-list="fileList" :show-upload-list="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :before-upload="beforeUpload"
          @change="handleChange">
          <a-button>
            <upload-outlined></upload-outlined>
            파일선택...
          </a-button>
        </a-upload>
      </a-form-item>
      <a-space :size="10" align="start" style="padding-left: 8px">
        <div>
          <warning-filled :style="{ fontSize: '15px' }" />
        </div>
        <div :span="22" class="warring-modal">
          <p>아래 형식에 맞는 이미지파일을 선택한 후 업로드하십시요.</p>
          <p>파일형식 : PDF, JPG(JPEG), TIF, GIF, PNG</p>
          <p>파일용량 : 최대 5MB</p>
        </div>
      </a-space>
    </a-col>
    <a-col v-else :span="16">
      <a-form-item class="title" :label="title">
        <a-upload v-model:file-list="fileList" :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :before-upload="beforeUpload"
          @change="handleChange">
          <a-button>
            <upload-outlined></upload-outlined>
            파일선택...
          </a-button>
        </a-upload>
      </a-form-item>
      <a-space :size="10" align="start" style="padding-left: 8px">
        <div>
          <warning-filled :style="{ fontSize: '15px' }" />
        </div>
        <div :span="22" class="warring-modal">
          <p>아래 형식에 맞는 이미지파일을 선택한 후 업로드하십시요.</p>
          <p>파일형식 : PDF, JPG(JPEG), TIF, GIF, PNG</p>
          <p>파일용량 : 최대 5MB</p>
        </div>
      </a-space>
    </a-col>
    <a-col :span="8" class="imgPreview">
      <div style="display: flex; flex-direction: column">
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" @click="handlePreview" />
        <img v-else src="https://taao.vn/placeholder.jpg" alt="avatar" />
        <a-button class="button_remove" v-if="imageUrl" type="primary" @click="handleRemove" :size="10">Remove
        </a-button>
      </div>
    </a-col>

    <a-modal :visible="previewVisible" :title="title" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="imageUrl" />
    </a-modal>
  </a-row>
</template>

<script lang="ts">
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
    imageUrl: {
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
  setup(props: any, { emit }) {
    const fileList = ref<UploadProps["fileList"]>([]);
    const loading = ref<boolean>(false);
    const imageUrl = ref<string>("");
    const previewVisible = ref(false);
    const beforeUpload = (file: any) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG or PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M && true;
    };
    const handleChange = (info: any, fileList: any) => {
      if (info.file.status === "uploading") {
        loading.value = true;
        return;
      }
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj, (base64Url: string) => {
          imageUrl.value = base64Url;
          loading.value = false;
          console.log("value img", imageUrl.value);

          emit("update-img", imageUrl.value);
        });
      }
      if (info.file.status === "error") {
        loading.value = false;
        message.error("upload error");
      }
    };

    const handleRemove = () => {
      imageUrl.value = "";
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
      handleRemove,
      fileList,
    };
  },
});
</script>

<style lang="scss" scoped>
.container_upload {
  width: 100%;
}

.imgPreview {
  cursor: pointer;
  width: 100%;
}

.imgPreview img {
  width: 100%;
}

.title {
  padding-left: 8px;
  padding-right: 8px;
}

.button_remove {
  width: 100px;
  margin: 0 auto;
}
</style>

