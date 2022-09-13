import { ref } from "vue";
import { message } from "ant-design-vue";
import type { UploadProps } from "ant-design-vue";

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
}
export default {
 methods:{

   setup() {
    
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
       return isJpgOrPng && isLt2M;
     };
     const handleChange = (info: any) => {
       if (info.file.status === "uploading") {
         loading.value = true;
         return;
       }
       if (info.file.status === "done") {
         getBase64(info.file.originFileObj, (base64Url: string) => {
           imageUrl.value = base64Url;
           loading.value = false;
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
     };
   },
 }
  // watch: {
  //   message() {
  //     console.log("message changed");
  //   },
  // },
};
