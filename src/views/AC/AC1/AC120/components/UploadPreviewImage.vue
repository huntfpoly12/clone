<template>
    <a-spin :spinning="loadingGetAccountingDocumentProofs" size="large">
        <div style="margin-right: -10px; overflow-x: hidden" :style="[
            !store.state.common.ac120.statusShowFull ? { height: '125px', overflow: 'hidden', transition: '.5s' } : {},
            `max-width: 387px; width: 100%`,
        ]" :class="{ 'ac120-disable-form-upload': false }">
            <div ref="elementUpload" class="upload-pewview-img">
                <a-upload :disabled="statusDisabledImg" list-type="picture-card" :multiple="multiple"
                    v-model:file-list="fileList" @preview="handlePreview"
                    :customRequest="customRequest" :before-upload="beforeUpload" @remove="remove"
                    accept="image/png, image/jpeg, image/jpg image/gif">
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
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%; margin-top: 20px" :src="previewImage" />
                </a-modal>
            </div>
        </div>
    </a-spin>
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
            notification("success", Message.getMessage("COMMON", "106").message);
        });
        errorAddAccountingDocumentProof((e) => {
            notification("error", e.message);
        });

        // RemoveAccountingDocumentProof
        doneRemoveAccountingDocumentProof((e) => {
            fileList.value.splice(indexImg.value, 1);
            notification("success", Message.getMessage("COMMON", "106").message);
        });
        errorRemoveAccountingDocumentProof((e) => {
            notification("error", e.message);
        });

        // ================== WATCH ================
        watch(() => store.state.common.ac120.formData.accountingDocumentId, (value) => {
            if (value != 'AC120') {
                statusDisabledImg.value = false;
                dataGetAccountingDocumentProofs.value.transactionDetailDate = store.state.common.ac120.formData.transactionDetailDate
                dataGetAccountingDocumentProofs.value.accountingDocumentId = value
                triggerAccountingDocumentProofs.value = true;
            } else if (value == 'AC120') {
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

        watch(() => fileList.value, (value) => {
            nextTick(() => {
                if (value.length) {
                    value.forEach((items) => {
                        if (items.status === "error") {
                            items.response = "업로드 오류";
                        }
                    });
                    const elementsIconPreview = elementUpload.value.querySelectorAll(
                        "a[title='Preview file']"
                    );
                    const elementsIconDelete = elementUpload.value.querySelectorAll(
                        "button[title='Remove file']"
                    );
                    elementsIconPreview.forEach((el: any) => {
                        el.setAttribute("title", "원본 보기");
                    });
                    elementsIconDelete.forEach((el: any) => {
                        el.setAttribute("title", "삭제");
                    });
                }
            });
        }, { deep: true });


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

        const beforeUpload = (file: any) => {
            const isImage =
                file.type === "image/jpeg" ||
                file.type === "image/png" ||
                file.type === "image/gif" ||
                file.type === "image/jpg";
            if (!isImage) {
                notification("error", "You can only upload png, jpg, jpeg, gif file!");
            }
            const isLt10M = file.size / 1024 / 1024 <= 10;
            if (!isLt10M) {
                notification("error", "Image must smaller than 10MB!");
            }
            const isDuplicaseName = fileList.value.some(
                (items: any) => file.name === items.name
            );
            if (isDuplicaseName) {
                notification("error", "Duplicate image are not allowed!");
            }
            isFailUpload.value = isImage && isLt10M && !isDuplicaseName;
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
            removeAccountingDocumentProof({
                ...dataGetAccountingDocumentProofs.value,
                fileStorageId: fileList.value[indexImg.value].id,
            });
            return false

        };
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
        };
    },
});
</script>
<style lang="scss" >
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
            background-color: #4472c4;
            border: none;
            outline: none;
            color: #fff;
            border-radius: 5px;
            padding: 0 15px;
        }
    }
}

.ac110-disable-form-upload {
    pointer-events: none;
}
</style>
