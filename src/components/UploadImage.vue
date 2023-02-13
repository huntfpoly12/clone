<template>
    <a-row class="container_upload custom-flex clr" :gutter="[24]">
        <a-form-item :label="title" v-if="!customrow" style="position: relative;">
            <div v-if="disabledImg == false">
                <div class="d-flex">
                    <input class="custom-file-input" type="file" @change="onFileChange" width="100px" />
                    <a-spin style="padding-left: 10px;padding-top: 10px;" :spinning="loading" />
                </div>
                <p v-if="messageUpload">{{ messageUpload }}</p>
            </div>
            <div v-if="disabledImg == true" style="background-color: #f5f5f5; cursor: no-drop;">
                <div class="d-flex">
                    <input class="custom-file-input" type="file" disabled width="100px" />
                    <a-spin style="padding-left: 10px;padding-top: 10px;" :spinning="loading" />
                </div>
            </div>
            <img src="@/assets/images/iconUpload.png" alt="" class="iconUpload">
        </a-form-item>
        <a-form-item :label="title" v-if="customrow" style="position: relative;">
            <div v-if="disabledImg == false">
                <div class="d-flex">
                    <input class="custom-file-input" type="file" @change="onFileChange" />
                    <a-spin style="padding-left: 10px;padding-top: 10px;" :spinning="loading" />
                </div>
                <p v-if="messageUpload">{{ messageUpload }}</p>
            </div>
            <div v-if="disabledImg == true" style="background-color: #f5f5f5; cursor: no-drop;">
                <div class="d-flex">
                    <input class="custom-file-input" type="file" disabled />
                    <a-spin style="padding-left: 10px;padding-top: 10px;" :spinning="loading" />
                </div>
            </div>
            <img src="@/assets/images/iconUpload.png" alt="" class="iconUpload">
        </a-form-item>
        
        <a-space :size="10" style="margin-top: 8px">
            <div class="warring-modal">
                <span>아래 형식에 맞는 이미지파일을 선택한 후 업로드하십시요.</span><br>
                <span>파일형식 : JPG(JPEG), TIF, GIF, PNG</span><br>
                <span>파일용량 : 최대 5MB</span>
            </div>
        </a-space>

    </a-row>
    <a-modal :visible="previewVisible" :title="title" :footer="null" @cancel="handleCancel" :mask-closable="false">
        <img style="width: 100%" :src="imageUrl" />
    </a-modal>
</template>

<script src="" lang="ts">
import { ref, defineComponent } from "vue";
import { Upload, UploadProps } from "ant-design-vue";
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
import notification from "@/utils/notification";

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
        disabledImg: {
            default: false,
            type: Boolean,
        },
        category: {
            type: String,
            default: "SubscriptionRequestCompanyLicense",
        },
        srcimg: {
            type: String,
            default: "../assets/images/imgdefault.jpg",
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
        customrow: {
            type: Number
        },
        name: {
            type: String
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
    methods: {
        onFileChange(e: any) {
            const file = e.target.files[0];
            this.imageUrl = URL.createObjectURL(file);
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
            props.srcimg = "";
            fileName.value = "";
        };
        let preview = ref<any>("");
        const onFileChange = async (e: { [x: string]: any; target: { files: any[] } }) => { 
            const file = e.target.files[0];
            if (file.size > 1024 * 1024 * 5) {
                e.preventDefault();
                messageUpload = "File must smaller than 5MB!"; 
                return;
            }
            console.log(file,'fileName');
            const formData = new FormData();
            formData.append("category", "SubscriptionRequestCompanyLicense");
            formData.append("file", file);
          fileName.value = file.name; 
         // Display the key/value pairs

   console.log(formData.getAll('file')); 

                
            try { 
                loading.value = true;
              const data = await uploadRepository.public(formData); 

                getBase64(file, (base64Url: string) => {
                    imageUrl.value = base64Url;
                    loading.value = false;
                    emit('update:imageId', data.data.id)
                    emit('update:imageSource', imageUrl.value)
                    emit("update-img", {
                        url: imageUrl.value,
                        id: data.data.id,
                        fileName: fileName.value,
                        name: fileName.value
                    });
                    emit("update-step", {
                        url: imageUrl.value,
                        id: data.data.id,
                        fileNamestep: fileName.value,

                    });
                });
            } catch (error) { 
                notification('error', '이미지를 업로드하는 동안 오류가 발생했습니다!')
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
            loading,
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

<style lang="scss" scoped>
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
    padding-left: 40px;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
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
.custom-flex {
    margin-left: 0 !important;
}
.iconUpload {
    width: 20px; 
    height: 20px; 
    position: absolute;  
    top: 50%; 
    left: 10px;
    transform: translate(0, -50%);
}
.warring-modal span{
    font-size: 12px;
}
</style>
