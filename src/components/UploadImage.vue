<template>
  <a-row class="container_upload custom-flex clr" :gutter="[16, 0]">
    <a-col>
      <a-form-item class="title" :label="title">
        <input class="custom-file-input" type="file" @change="onFileChange" />
        <p v-if="messageUpload">{{ messageUpload }}</p>
        <a-space :size="10" align="start" style="margin-top: 8px">
          <div :span="22" class="warring-modal">
            <p>아래 형식에 맞는 이미지파일을 선택한 후 업로드하십시요.</p>
            <p>파일형식 : JPG(JPEG), TIF, GIF, PNG</p>
            <p>파일용량 : 최대 5MB</p>
          </div>
        </a-space>
      </a-form-item>
    </a-col>

    <a-col :span="7">
      <div class="img-preview">
        <img
          v-if="imageUrl && showImg"
          :src="imageUrl"
          @click="handlePreview"
        />

        <!-- <img v-if="!imageUrl && srcimg" :src="srcimg" /> -->
        <img v-else src="../assets/images/imgdefault.jpg" />
      </div>
    </a-col>

    <a-modal
      :visible="previewVisible"
      :title="title"
      :footer="null"
      @cancel="handleCancel"
      :mask-closable="false"
    >
      <img style="width: 100%" :src="imageUrl" />
    </a-modal>
  </a-row>
</template>

<script src="" lang="ts">
import { ref, defineComponent } from "vue";
import { message, Upload } from "ant-design-vue";
import type { UploadProps } from "ant-design-vue";
import Repository from "../repositories/index";
const uploadRepository = Repository.get("upload");

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
    category: {
      type: String,
      default: "SubscriptionRequestCompanyLicense",
    },
    srcimg: {
      type: String,
      default: "../assets/images/imgdefault.jpg",
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
  created() {
    //@ts-ignore
    // this.$props.srcimg = "../assets/images/imgdefault.jpg";
    this.imageUrl = this.$props.srcimg;
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
    let messageUpload = ref<any>("");
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

      return isLt5M;
    };
    const onRemove = () => {
      showImg.value = false;
      imageUrl.value = "";
      //@ts-ignore
      props.srcimg = "";
    };
    let preview = ref<any>("");
    const onFileChange = async (e: {
      [x: string]: any;
      target: { files: any[] };
    }) => {
      const file = e.target.files[0];
      if (file.size > 1024 * 1024 * 5) {
        e.preventDefault();
        messageUpload = "File must smaller than 5MB!";
        return;
      }
      const formData = new FormData();
      formData.append("category", "SubscriptionRequestCompanyLicense");
      formData.append("file", file);
      try {
        const data = await uploadRepository.public(formData);
        getBase64(file, (base64Url: string) => {
          imageUrl.value = base64Url;
          loading.value = false;
          emit("update-img", data.data.id);
        });
      } catch (error) {
        console.log(error);
      }
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
      // handleChange,
      messageUpload,
      beforeUpload,
      fileList,
      onRemove,
      Upload,
      file,
      fileName,
      showImg,
      onFileChange,
      preview,
    };
  },
});
</script>

<style lang="scss">
.container_upload {
  width: 100%;
}
.ant-form input[type="file"] {
  display: block;
  width: 200px;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: "파일선택...";
  display: inline-block;
  width: 200px;
  text-align: left;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  line-height: 1.5715;
  padding: 5px 10px;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
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
