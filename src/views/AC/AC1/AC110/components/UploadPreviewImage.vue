<template>
  <a-config-provider :locale="locale">
    <a-spin :spinning="loadingGetBankbookDetailProofs" size="large">
      <div class="form-upload-ac110">
        <div ref="elementUpload" class="upload-pewview-img-ac-110">
          <a-upload list-type="picture-card"
            :disabled="!payload.bankbookDetailId || loadingRemoveBankbookDetailProof || disabled" :multiple="multiple"
            v-model:file-list="fileList" @preview="handlePreview" @change="changeFile" :customRequest="customRequest"
            :before-upload="beforeUpload" @remove="remove" accept="image/png, image/jpeg, image/jpg image/gif">
            <div v-if="fileList.length <= limit">
              <div class="ant-btn-upload">
                <p class="ant-btn-upload-text">이미지 파일을 여기에 끌이다 놓으세요</p>
                <img src="@/assets/images/iconImage.png" class="ant-btn-upload-image" alt="">
                <p class="ant-btn-upload-text">또는</p>
                <button class="ant-btn-upload-button">파일 선택</button>
              </div>
            </div>
          </a-upload>
        </div>
      </div>
    </a-spin>
  </a-config-provider>
  <PopupMessage :modalStatus="isModalDelete" @closePopup="isModalDelete = false" :typeModal="'confirm'"
    :title="Message.getMessage('COMMON', '401').message" content="" :okText="Message.getMessage('COMMON', '401').yes"
    :cancelText="Message.getMessage('COMMON', '401').no" @checkConfirm="handleDelete" />
  <a-image :preview="{ visible: previewVisible, onVisibleChange: setVisible }" style="width: 100%; display: none" :src="previewImage" />
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, nextTick } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC1/AC110";
import mutations from "@/graphql/mutations/AC/AC1/AC110";
import notification from '@/utils/notification';
import { Message } from "@/configs/enum"
import Repository from "@/repositories";
import { cloneDeep } from "lodash";
import koKR from 'ant-design-vue/es/locale/ko_KR';
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    bankbookDetailId: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const locale = koKR
    let fileList = ref<any[]>([])
    let listFileStorageId = ref<any[]>([])
    let isFailUpload = ref(false)
    const previewImage = ref<string | undefined>('');
    const previewVisible = ref<boolean>(false);
    let triggerBankbookDetailProofs = ref(false);
    const elementUpload = ref<any>()
    let indexImgRemove = ref<any>(null)
    let isModalDelete = ref(false)
    let bankbookDetailIdEditting = ref<any>('')
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
      emit("updateAddBankbookDetailProof", bankbookDetailIdEditting.value)
      notification('success', Message.getMessage('COMMON', '106').message)
    })
    errorAddBankbookDetailProof(e => {
      const index = listFileStorageId.value.length - 1
      listFileStorageId.value[index].status = 'error'
      listFileStorageId.value[index].error = e.message
      listFileStorageId.value[index].response = undefined
      fileList.value[index].status = 'error'
      fileList.value[index].error = e.message
      fileList.value[index].response = undefined
      notification('error', e.message)
    })

    const {
      mutate: removeBankbookDetailProof,
      onDone: doneRemoveBankbookDetailProof,
      onError: errorRemoveBankbookDetailProof,
      loading: loadingRemoveBankbookDetailProof,
    } = useMutation(mutations.removeBankbookDetailProof);
    doneRemoveBankbookDetailProof((e) => {
      fileList.value.splice(indexImgRemove.value, 1)
      listFileStorageId.value.splice(indexImgRemove.value, 1)
      emit("updateremoveBankbookDetailProof", bankbookDetailIdEditting.value)
      notification('success', Message.getMessage('COMMON', '402').message)
    })
    errorRemoveBankbookDetailProof(e => {
      notification('error', e.message)
    })
    // watch
    watch(() => payload.value, (value) => {
      if (value.bankbookDetailDate) {
        triggerBankbookDetailProofs.value = true
      }
    }, {
      deep: true,
    })

    watch(resGetBankbookDetailProofs, (value) => {
      if (value.getBankbookDetailProofs.length) {
        listFileStorageId.value = value.getBankbookDetailProofs.map((file: any) => ({
          ...file,
          fileStorageId: file.id,
          thumbUrl: file.url,
          response: "ok",
          status: "done"
        }))
      }
      fileList.value = [...listFileStorageId.value]
      triggerBankbookDetailProofs.value = false
    })

    watch(() => props.payLoadProofs, (value) => {
      fileList.value = []
      listFileStorageId.value = []
      if (!!value?.bankbookDetailId && !!value?.bankbookDetailDate) {
        triggerBankbookDetailProofs.value = true
      }
    }, {
      deep: true,
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

    const setVisible = (value: boolean) => {
      previewVisible.value = value;
    };

    const handleCancel = () => {
      previewVisible.value = false;
    };

    const changeFile = ({ file, fileList: newFileList }: FileInfo) => {
    }

    const beforeUpload = (file: any) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg'
      if (!isImage) {
        notification('error', Message.getMessage('AC110', '002').message)
      }
      const isLt10M = file.size / 1024 / 1024 <= 10;
      if (!isLt10M) {
        notification('error', Message.getMessage('AC110', '003').message)
      }
      const isDuplicaseName = fileList.value.some((items: any) => file.name === items.name)
      if (isDuplicaseName) {
        notification('error', Message.getMessage('AC110', '004').message)
      }
      isFailUpload.value = isImage && isLt10M && !isDuplicaseName
    };
    
    const customRequest = (e: any) => {
      if (!isFailUpload.value) {
        fileList.value.splice(fileList.value.length - 1, 1)
        e.onError("");
        return
      }
      const formData = new FormData();
      formData.append('file', e.file);
      formData.append('companyId', props.payLoadProofs.companyId);
      formData.append('fiscalYear', props.payLoadProofs.fiscalYear);
      formData.append('facilityBusinessId', props.payLoadProofs.facilityBusinessId);
      uploadRepository.accountingProof(formData).then((res: any) => {
        e.onSuccess("ok");
        listFileStorageId.value.push({
          ...fileList.value[fileList.value.length - 1], fileStorageId: res.data.id
        })
        bankbookDetailIdEditting.value = cloneDeep(props.bankbookDetailId)
        addBankbookDetailProof({
          ...payload.value,
          fileStorageId: res.data.id
        })
      }).catch((error: any) => {
        e.onError(error.message);
        listFileStorageId.value.push({
          ...fileList.value[fileList.value.length - 1], fileStorageId: null
        })
      })
    }
    const remove = (e: any) => {
      if (e.status === 'error') {
        const index = listFileStorageId.value.findIndex((img: any) => img.uid === e.uid)
        listFileStorageId.value.splice(index, 1)
        return true
      }
      indexImgRemove.value = listFileStorageId.value.findIndex((item: any) => item.name === e.name)
      isModalDelete.value = true
      return false
    }

    const handleDelete = (status: boolean) => {
      if (status) {
        if (!listFileStorageId.value[indexImgRemove.value].fileStorageId) {
          isModalDelete.value = false
          return
        }
        bankbookDetailIdEditting.value = cloneDeep(props.bankbookDetailId)
        removeBankbookDetailProof({
          ...props.payLoadProofs,
          fileStorageId: listFileStorageId.value[indexImgRemove.value].fileStorageId
        })
      }
      isModalDelete.value = false
    }

    return {
      locale,
      handlePreview,
      beforeUpload,
      previewVisible,
      setVisible,
      fileList,
      handleCancel,
      previewImage,
      changeFile,
      customRequest,
      remove,
      elementUpload,
      payload,
      loadingGetBankbookDetailProofs,
      loadingRemoveBankbookDetailProof,
      isModalDelete,
      handleDelete,
      Message,
    }
  }
})

</script>
<style lang="scss">
.upload-pewview-img-ac-110 {
  padding: 14px;

  .ant-upload-list {
    display: grid !important;
    grid-template-columns: auto auto !important;
    gap: 8px;

    &::before {
      display: none;
    }
  }

  .ant-upload-list-picture-card-container {
    width: 120px;
    height: 120px;
    margin: 0;
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

  .ant-upload.ant-upload-select-picture-card {
    grid-row-start: 1;
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

.ac110-disable-form-upload {
  opacity: .7;
  pointer-events: none;
}
</style>
