<template>
    <a-config-provider :locale="locale">
        <a-spin :spinning="loadingGetAccountingDocumentProofs" size="large">
            <div class="form-upload-ac120" :class="{ 'ac120-disable-form-upload': false }">
                <div ref="elementUpload" class="upload-pewview-img-ac-120">
                    <a-upload :disabled="statusDisabledImg" list-type="picture-card" :multiple="multiple"
                        v-model:file-list="fileList" @preview="handlePreview" :customRequest="customRequest"
                        :before-upload="beforeUpload" @remove="remove" accept="image/png, image/jpeg, image/jpg image/gif">
                        <div v-if="fileList.length <= limit">
                            <div class="ant-btn-upload">
                                <p class="ant-btn-upload-text">
                                    이미지 파일을 여기에 끌이다 놓으세요
                                </p>
                                <img src="@/assets/images/iconImage.png" class="ant-btn-upload-image" alt="" />
                                <p class="ant-btn-upload-text">또는</p>
                                <button class="ant-btn-upload-button">파일 선택</button>
                            </div>
                        </div>
                    </a-upload>
                    <!-- <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                        <img alt="example" style="width: 100%; margin-top: 20px" :src="previewImage" />
                    </a-modal> -->
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
import { useStore } from 'vuex';
import { defineComponent, ref, watch, computed, nextTick } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC1/AC120";
import mutations from "@/graphql/mutations/AC/AC1/AC120";
import Repository from "@/repositories";
import notification from '@/utils/notification';
import { Message } from "@/configs/enum"
import { companyId } from "@/helpers/commonFunction"
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
    fileStorageId?: any;
}
export default defineComponent({
    props: {
        limit: {
            type: Number,
            default: 8,
        },
        listImageFile: {
            type: Array,
            default: [],
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        payLoadProofs: {
            type: Object,
            default: () => { },
        },
    },
    setup(props, { emit }) {
        const locale = koKR
        const store = useStore();
        const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
        const globalFacilityBizId = ref<number>(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));

        let fileList = ref<any[]>([]);
        let isFailUpload = ref(false);
        const previewImage = ref<string | undefined>("");
        const previewVisible = ref<boolean>(false);
        let triggerAccountingDocumentProofs = ref(false);
        const elementUpload = ref<any>();
        let statusDisabledImg = ref<boolean>(true);
        const indexImg = ref<number>(0)
        const dataGetAccountingDocumentProofs: any = ref({
            companyId: companyId,
            fiscalYear: acYear.value,
            facilityBusinessId: globalFacilityBizId.value,
            transactionDetailDate: null,
            accountingDocumentId: null,
        })
        let isModalDelete = ref(false)
        // =================== GRAPHQL ===================
        // queries getAccountingDocumentProofs
        const { result: resGetAccountingDocumentProofs, loading: loadingGetAccountingDocumentProofs
        } = useQuery(queries.getAccountingDocumentProofs, dataGetAccountingDocumentProofs.value, () => ({
            enabled: triggerAccountingDocumentProofs.value,
            fetchPolicy: "no-cache",
        }));

        // mutations addAccountingDocumentProof
        const { mutate: addAccountingDocumentProof, onDone: doneAddAccountingDocumentProof, onError: errorAddAccountingDocumentProof,
        } = useMutation(mutations.addAccountingDocumentProof);

        // mutations removeAccountingDocumentProof
        const { mutate: removeAccountingDocumentProof, onDone: doneRemoveAccountingDocumentProof, onError: errorRemoveAccountingDocumentProof,
        } = useMutation(mutations.removeAccountingDocumentProof);

        // ============== ON DONE MUTATION GRAPHQL ===============
        // AddAccountingDocumentProof
        doneAddAccountingDocumentProof((e) => {
            // triggerAccountingDocumentProofs.value = true;
            store.state.common.ac120.statusKeppRow = true;
            store.state.common.ac120.resetDataTable++
            notification("success", Message.getMessage("COMMON", "106").message);
        });
        errorAddAccountingDocumentProof((e) => {
            notification("error", e.message);
        });

        // RemoveAccountingDocumentProof
        doneRemoveAccountingDocumentProof((e) => {
            store.state.common.ac120.statusKeppRow = true;
            store.state.common.ac120.resetDataTable++
            fileList.value.splice(indexImg.value, 1);
            notification("success", Message.getMessage("COMMON", "106").message);
        });
        errorRemoveAccountingDocumentProof((e) => {
            notification("error", e.message);
        });

        // ================== WATCH ================
        watch(() => store.state.common.ac120.resetDataAccountingDocumentProofs, (value) => {
            if (store.state.common.ac120.formData.accountingDocumentId != 'AC120') {
                statusDisabledImg.value = false;
                dataGetAccountingDocumentProofs.value.transactionDetailDate = store.state.common.ac120.transactionDetailDate
                dataGetAccountingDocumentProofs.value.accountingDocumentId = store.state.common.ac120.formData.accountingDocumentId
                triggerAccountingDocumentProofs.value = true;
            } else if (store.state.common.ac120.formData.accountingDocumentId == 'AC120') {
                statusDisabledImg.value = true;
                fileList.value = []
            }
        }, { deep: true });

        watch(resGetAccountingDocumentProofs, (value) => {
            triggerAccountingDocumentProofs.value = false;
            if (value.getAccountingDocumentProofs) {
                fileList.value = value.getAccountingDocumentProofs.map((file: any) => {
                    return {
                        ...file,
                        fileStorageId: null,
                        thumbUrl: file.url,
                        response: "ok",
                        status: "done",
                    }
                });
            }
        });

        // watch(() => fileList.value, (value) => {
        //     nextTick(() => {
        //         if (value.length) {
        //             value.forEach((items) => {
        //                 if (items.status === "error") {
        //                     items.response = "업로드 오류";
        //                 }
        //             });
        //             const elementsIconPreview = elementUpload.value.querySelectorAll(
        //                 "a[title='Preview file']"
        //             );
        //             const elementsIconDelete = elementUpload.value.querySelectorAll(
        //                 "button[title='Remove file']"
        //             );
        //             elementsIconPreview.forEach((el: any) => {
        //                 el.setAttribute("title", "원본 보기");
        //             });
        //             elementsIconDelete.forEach((el: any) => {
        //                 el.setAttribute("title", "삭제");
        //             });
        //         }
        //     });
        // }, { deep: true });


        // ================ FUNCTION ============================================

        const getBase64 = (file: File) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        };
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

        const setVisible = (value: boolean) => {
            previewVisible.value = value;
        };

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
                fileList.value.splice(fileList.value.length - 1, 1);
                e.onError("");
                return;
            }
            const formData = new FormData();
            formData.append("file", e.file);
            formData.append("companyId", companyId);
            formData.append("fiscalYear", acYear.value.toString());
            formData.append("facilityBusinessId", globalFacilityBizId.value.toString());
            uploadRepository.accountingProof(formData)
                .then((res: any) => {
                    e.onSuccess("ok");
                    fileList.value[fileList.value.length - 1].id = res.data.id
                    addAccountingDocumentProof({
                        ...dataGetAccountingDocumentProofs.value,
                        fileStorageId: res.data.id,
                    });
                })
                .catch((error: any) => {
                    e.onError(error.message);
                    fileList.value.push({
                        ...fileList.value[fileList.value.length - 1],
                        fileStorageId: null,
                    });
                });
        };
        const remove = (e: any) => {
            indexImg.value = fileList.value.findIndex((item: any) => item.name === e.name);
            if (!fileList.value[indexImg.value].id) return false;
            isModalDelete.value = true
            return false
        };

        const handleDelete = (status: boolean) => {
            if (status) {
                if (!fileList.value[indexImg.value].id) {
                    isModalDelete.value = false
                    return
                }
                removeAccountingDocumentProof({
                    ...dataGetAccountingDocumentProofs.value,
                    fileStorageId: fileList.value[indexImg.value].id,
                });
            }
            isModalDelete.value = false
        }
        return {
            handlePreview,
            beforeUpload,
            previewVisible,
            fileList,
            handleCancel,
            previewImage,
            customRequest,
            remove,
            elementUpload,
            loadingGetAccountingDocumentProofs,
            store, statusDisabledImg,
            locale,
            setVisible,
            isModalDelete,
            Message,
            handleDelete
        };
    },
});
</script>
<style lang="scss" >
.form-upload-ac120 {
    overflow-x: hidden;
    height: calc(100vh - 765px);
    max-width: 387px; 
    width: 100%;
}
.upload-pewview-img-ac-120 {
    padding: 14px;
    .ant-upload-list  {
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
        // display: flex;
        // flex-direction: column;
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
            background-color: #4472c4;
            border: none;
            outline: none;
            color: #fff;
            border-radius: 5px;
            padding: 0 15px;
        }
    }
}
</style>
