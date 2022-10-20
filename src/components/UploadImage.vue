<template>
    <a-row class="container_upload custom-flex clr" :gutter="[16, 0]">
        <a-col>
            <div>
                <a-form-item class="title" :label="title">
                    <a-row>
                        <div>
                            <input class="custom-file-input" type="file" @change="onFileChange" />
                            <p v-if="messageUpload">{{ messageUpload }}</p>
                            <div v-if="fileName" class="fileName">
                                <span style="padding-right: 10px">{{ fileName }}</span>
                                <delete-outlined @click="onRemove" style="color: red; cursor: pointer" />
                            </div>
                        </div>
                    </a-row>
                    <a-row>
                        <a-space :size="10" style="margin-top: 8px">
                            <div class="warring-modal">
                                <p>아래 형식에 맞는 이미지파일을 선택한 후 업로드하십시요.</p>
                                <p>파일형식 : JPG(JPEG), TIF, GIF, PNG</p>
                                <p>파일용량 : 최대 5MB</p>
                            </div>
                        </a-space>
                    </a-row>
                </a-form-item>
            </div>
        </a-col>
        <a-col> </a-col>
        <a-col :span="7">
            <!-- <div class="img-preview">
        <img :src="imageUrl" @click="handlePreview" />
      </div> -->
        </a-col>

        <a-modal :visible="previewVisible" :title="title" :footer="null" @cancel="handleCancel" :mask-closable="false">
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
            // default: "../assets/images/imgdefault.jpg",
        },
        imageId: {
            type: Number,
            default: null,
            require: true
        },
        imageSource: {
            type: String,
            default: null,
            require: true
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
    data() {
        return {
            uploadedFileName: null,
        };
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
        let imageUrl = ref<any>("../assets/images/imgdefault.jpg");
        let messageUpload = ref<any>("");
        const file = ref<any>("");
        const fileName = ref<any>("");
        const previewVisible = ref(false);
        var showImg = ref<boolean>(true);

        const onRemove = () => {
            showImg.value = false;
            imageUrl.value = "";
            //@ts-ignore
            props.srcimg = "";
            fileName.value = "";
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
            fileName.value = file.name;
            try {
                
                const data = await uploadRepository.public(formData);

                getBase64(file, (base64Url: string) => {
                    imageUrl.value = base64Url;
                    loading.value = false;
                    emit('update:imageId', 10)
                    emit('update:imageSource', imageUrl.value)
                    emit("update-img", {
                        url: imageUrl.value,
                        id: data.data.id,
                        fileName: fileName.value,
                    });
                    emit("update-step", {
                        url: imageUrl.value,
                        id: data.data.id,
                        fileNamestep: fileName.value,
                    });
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
.fileName {
    display: flex;
    align-items: center;
    padding-top: 4px;
}

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
    content: " 파일선택...";
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
    margin-top: 20px;
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