<template>
  <div style="margin-right: -10px;
      overflow-x: hidden;" 
      :style="[
        heightHidden ? { height: heightHidden, overflow: 'hidden' } : {},
        !!width ? `min-width: ${width}px; width: 100%` : ''
      ]">
    <div ref="elementUpload" class="upload-pewview-img">
      <a-upload list-type="picture-card" :multiple="multiple" v-model:file-list="fileList" @preview="handlePreview"
        @change="changeFile" :customRequest="customRequest" :before-upload="beforeUpload" :remove="remove"
        accept="image/png, image/jpeg, image/jpg image/gif">
        <div v-if="fileList.length <= limit">
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
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, nextTick } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC1/AC110";
import mutations from "@/graphql/mutations/AC/AC1/AC110";
import notification from '@/utils/notification';
import { Message } from "@/configs/enum"
import Repository from "@/repositories";
const uploadRepository = Repository.get("upload");
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  percent?: number;
  url?: string;
  preview?: string;
  originFileObj?: any;
  fileStorageId?: any
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
    },
    heightHidden: {
      type: String,
      default: ""
    },
    payLoadProofs: {
      type: Object,
      default: () => { }
    }
  },
  setup(props, { emit }) {
    let fileList = ref<any[]>([])
    let listFileStorageId = ref<any[]>([])
    let isFailUpload = ref(false)
    const previewImage = ref<string | undefined>('');
    const previewVisible = ref<boolean>(false);
    let triggerBankbookDetailProofs = ref(false);
    const elementUpload = ref<any>()
    // computed
    const payload = computed(() => props.payLoadProofs)
    // graphQL
    // queries
    const {
      result: resGetBankbookDetailProofs,
      // onResult: onResGetBankbookDetailProofs,
      loading: loadingGetBankbookDetailProofs,
      // refetch,
      // onError
    } = useQuery(queries.getBankbookDetailProofs, payload.value,
      () => ({
        enabled: triggerBankbookDetailProofs.value,
        fetchPolicy: "no-cache",
      }))

    // mutations
    const {
      mutate: addBankbookDetailProof,
      onDone: doneAddBankbookDetailProof,
      onError: errorAddBankbookDetailProof,
      loading: loadingAddBankbookDetailProof,
    } = useMutation(mutations.addBankbookDetailProof);
    doneAddBankbookDetailProof((e) => {
      notification('success', Message.getMessage('COMMON', '106').message)
    })
    errorAddBankbookDetailProof(e => {
      notification('error', e.message)
    })

    const {
      mutate: removeBankbookDetailProof,
      onDone: doneRemoveBankbookDetailProof,
      onError: errorRemoveBankbookDetailProof,
      loading: loadingRemoveBankbookDetailProof,
    } = useMutation(mutations.removeBankbookDetailProof);
    doneRemoveBankbookDetailProof((e) => {
      notification('success', Message.getMessage('COMMON', '106').message)
    })
    errorRemoveBankbookDetailProof(e => {
      notification('error', e.message)
    })
    // watch
    watch(() => props.listImageFile, (value) => {
      fileList.value = value
    })

    watch(() => resGetBankbookDetailProofs, (value) => {

    })

    watch(() => props.payLoadProofs, (value) => {
      if (!!value?.bankbookDetailId && !!value?.bankbookDetailDate) {
        triggerBankbookDetailProofs.value = true
      }
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

    const changeFile = ({ file, fileList: newFileList }: FileInfo) => {
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
    
    watch(() => listFileStorageId.value, (value) => {
      emit("update:listImageFile", value)
    }, { deep: true });

    watch(() => fileList.value, (value) => {
      nextTick(() => {
        if(value.length){
          value.forEach(items => {
            if(items.status === 'error') {
              items.response = '업로드 오류'
            }
          })
          const elementsIconPreview = elementUpload.value.querySelectorAll("a[title='Preview file']")
          const elementsIconDelete = elementUpload.value.querySelectorAll("button[title='Remove file']")
          elementsIconPreview.forEach((el:any) => {
            el.setAttribute("title", "원본 보기");
          })
          elementsIconDelete.forEach((el:any) => {
            el.setAttribute("title", "삭제");
          })
        }
      })
    }, { deep: true });

    const customRequest = (e: any) => {
      if (!isFailUpload.value) {
        fileList.value.splice(fileList.value.length - 1, 1)
        e.onError("");
        emit("update:listImageFile", listFileStorageId.value)
        return
      }
      const formData = new FormData();
      formData.append('file', e.file);
      formData.append('companyId', props.payLoadProofs.companyId);
      formData.append('fiscalYear ', props.payLoadProofs.fiscalYear);
      formData.append('facilityBusinessId ', props.payLoadProofs.facilityBusinessId);
      uploadRepository.accountingProof(formData).then((res:any) => {
        e.onSuccess("ok");
        listFileStorageId.value.push({
          ...fileList.value[fileList.value.length - 1], fileStorageId: res.data.id
        })
      }).catch((error:any) => {
        e.onError(error.message);
        listFileStorageId.value.push({
          ...fileList.value[fileList.value.length - 1], fileStorageId: null
        })
      })
    }
    const remove = (e: any) => {
      const index = listFileStorageId.value.findIndex((item: any) => item.name === e.name)
      if(!!listFileStorageId.value[index].fileStorageId && Number.isInteger(listFileStorageId.value[index].fileStorageId)) {
        removeBankbookDetailProof({
        ...props.payLoadProofs,
        fileStorageId: listFileStorageId.value[index].fileStorageId
      })
      }
      listFileStorageId.value.splice(index, 1)
      emit("update:listImageFile", listFileStorageId.value)
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
      remove,
      elementUpload
    }
  }
})

</script>
<style lang="scss">
.upload-pewview-img {
  .ant-upload-list-picture-card-container {
    width: 120px;
    height: 120px;
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
