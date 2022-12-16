<template>
    <div style="padding: 10px; display: flex;">
        <div>
            <imgUpload :title="titleModal" :customrow="1" @update-img="getImgUrl" />
        </div>
        <a-col>
            <preview-image :height="'250px'" :activePreview="true" @deleteImg="removeImg" :dataImage="urlImage" />
        </a-col>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DxValidationSummary from "devextreme-vue/validation-summary";
import DxButton from "devextreme-vue/button";
import imgUpload from "../../components/UploadImage.vue";
export default defineComponent({
    components: {
        DxButton,
        DxValidationSummary,
        imgUpload
    },
    setup() {
        const removeImg = () => {
            urlImage.value = ''
        }

        const getImgUrl = (data: any) => {
            let dataImg = {
                ...data,
                name: data.fileName
            }
            urlImage.value = dataImg
        }

        const urlImage = ref()

        return {
            titleModal: '사업자등록증',
            removeImg,
            getImgUrl,
            urlImage
        };
    },
});
</script> 
