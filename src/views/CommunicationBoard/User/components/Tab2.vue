<template>
    <a-row>
        <a-col span="16" class="data-table">
            <a-spin :spinning="loadingTable" size="large">
                <DxDataGrid noDataText="내역이 없습니다" id="gridContainer" :show-row-lines="true" :hoverStateEnabled="true"
                    :data-source="dataSource" :show-borders="true" key-expr="messageId"
                    :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true"
                    ref="gridRef" :focused-row-enabled="true" @focused-row-changing="onFocusedRowChanging"
                    v-model:focused-row-key="focusedRowKey">
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
                    <DxPaging :enabled="false" />
                    <DxExport :enabled="true" />
                    <DxToolbar>
                        <DxItem template="search-template" location="after" />
                        <DxItem name="searchPanel" />
                        <DxItem name="exportButton" css-class="cell-button-export" />
                        <!-- <DxItem location="after" template="button-history" css-class="cell-button-add" /> -->
                        <!-- <DxItem location="after" template="button-template" css-class="cell-button-add" /> -->
                    </DxToolbar>
                    <template #search-template>
                        <div class="d-flex-center search-template">
                            <a-form-item label="작성기간 (최대 1년)" :label-col="labelCol">
                                <range-date-time-box v-model:valueDate="rangeDate" maxRange width="250px"
                                    :multi-calendars="true" />
                            </a-form-item>
                            <!-- <div class="d-flex-center">
                                <info-tool-tip>문의글 기준</info-tool-tip>
                            </div> -->
                        </div>
                    </template>
                    <DxColumn caption="구분" cell-template="expresstionType" css-class="cell-center"
                        data-field="expresstionType" width="90" />
                    <template #expresstionType="{ data }">
                        <ExpressionType :valueSelect="data.data.expresstionType" :isSelect="false" />
                    </template>

                    <DxColumn caption="분류" cell-template="" data-field="classification" />

                    <DxColumn caption="알림내용" cell-template="" data-field="content" />

                    <DxColumn caption="작성자" cell-template="" data-field="writerCompactUser.name" />

                    <DxColumn caption="작성일시" width="150" data-field="writedAt" format="yyyy-MM-dd HH:mm:ss"
                        data-type="date" />
                </DxDataGrid>
            </a-spin>
        </a-col>
        <a-col span="8" class="custom-layout">
            <div>
                <div style="text-align: end">
                    <DxButton @click="reloadData">
                        <ReloadOutlined style="font-size: 14px;" />
                    </DxButton>
                </div>
                <a-spin :spinning="loadingWorkNotificationMessage" size="large">
                    <div v-if="dataDetail" class="wrapper-content">
                        <div class="question-container">
                            <div class="d-flex-center" style="justify-content: space-between;">
                                <div class="d-flex-center gap-10">
                                    <ExpressionType :valueSelect="dataDetail.expresstionType" :isSelect="false" />
                                    <div class="font-bold"
                                        :class="dataDetail.writerCompactUser.type == 'm' ? 'blue' : 'black'">
                                        {{ dataDetail.writerCompactUser.name }}</div>
                                    <div class="time">
                                        {{ dayjs(dataDetail.writedAt > dataDetail.updatedAt ?
                                            dataDetail.writedAt : dataDetail.updatedAt).format('YYYY-MM-DD hh:mm:ss') }}
                                    </div>
                                    <div class="classification">{{ dataDetail.classification }}</div>
                                </div>
                                <div class="time" v-if="dataDetail.updatedAt > dataDetail.writedAt">
                                    Edited
                                </div>
                            </div>
                            <div>{{ dataDetail.content }}</div>
                            <div v-if="dataDetail?.fileStorages && dataDetail?.fileStorages.length" class="files">
                                <div class="images">
                                    <img v-for="(file, indexFile) in dataDetail?.fileStorages.filter((item: any) => isImgLink(item.url))"
                                        :key="indexFile" class="image" :src="file.url" alt=""
                                        @click="previewImage(dataDetail.fileStorages.filter((item: any) => isImgLink(item.url)), indexFile)">
                                </div>
                                <div v-for="(file, indexFile) in dataDetail?.fileStorages.filter((item: any) => !isImgLink(item.url))"
                                    :key="indexFile" class="d-flex-center mb-10 file-texts"
                                    @click="openLinkDownFile(file.url)">
                                    <FileTextOutlined class="mr-10 fz-20" />
                                    <div>{{ file.name }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a-spin>
            </div>
        </a-col>
    </a-row>
    <ModalPreviewListImage :isModalPreview="isModalPreview" @cancel="isModalPreview = false"
        :listImage="listImagePreview" />
</template>
<script lang="ts">
import {
    defineComponent,
    ref,
    watch,
    reactive,
    computed,
    watchEffect,
} from "vue";
import { useStore } from "vuex";
import {
    DxDataGrid,
    DxColumn,
    DxToolbar,
    DxItem,
    DxSearchPanel,
    DxExport,
    DxScrolling,
    DxPaging,
} from "devextreme-vue/data-grid";
import {
    EditOutlined,
    HistoryOutlined,
    DeleteOutlined,
    SaveOutlined,
    ReloadOutlined,
    FileTextOutlined,
} from "@ant-design/icons-vue";
import dayjs from 'dayjs';
import DxButton from "devextreme-vue/button";
import queries from "@/graphql/queries/CommunicationBoard/User/index";
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import { companyId } from "@/helpers/commonFunction";
import ModalPreviewListImage from "@/views/AC/AC1/AC130/components/ModalPreviewListImage.vue";
export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        EditOutlined,
        HistoryOutlined,
        DxToolbar,
        DxItem,
        DxExport,
        DxSearchPanel,
        DeleteOutlined,
        DxButton,
        SaveOutlined,
        DxScrolling,
        DxPaging,
        ReloadOutlined,
        ModalPreviewListImage,
        FileTextOutlined,
    },
    props: {
        onSearch: Number,
        messageId: {
            type: Number,
            default: null,
        },
    },
    setup(props, { emit }) {
        // config grid
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const dataSource = ref([])
        const dataDetail = ref<any>(null)

        // dataDetail.value = getFakeData()
        const isModalPreview = ref<boolean>(false)
        const listImagePreview = ref({
            index: 0,
            files: [],
        })
        const focusedRowKey = ref(null);
        const rangeDate = ref([parseInt(dayjs().subtract(1, 'year').format("YYYYMMDD")), parseInt(dayjs().format("YYYYMMDD"))])
        const trigger = ref<boolean>(true)
        const triggerWorkNotificationMessage = ref<boolean>(false)
        const originData = {
            companyId: companyId,
            filter: {
                startWriteDate: computed(() => rangeDate.value[0]),
                finishWriteDate: computed(() => rangeDate.value[1]),
            },
        }
        const originDataDetail = {
            companyId: companyId,
            messageId: 0,
        }
        // ================GRAPQL==============================================
        const { loading: loadingTable, onResult: resWorkNotificationMessages, onError
        } = useQuery(queries.searchWorkNotificationMessages, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        onError((error) => {
            trigger.value = false;
            dataSource.value = []
            dataDetail.value = null
            focusedRowKey.value = null
            //notification('error', error.message)
        });
        resWorkNotificationMessages((value) => {
            trigger.value = false;
            let data = value.data.searchWorkNotificationMessages
            if (data.length) {
                dataSource.value = data;
                if (props.messageId) {
                    originDataDetail.messageId = props.messageId
                    emit('resetMessageId', true);
                } else {
                    originDataDetail.messageId = data[0].messageId
                }
                triggerWorkNotificationMessage.value = true;
            } else {
                dataSource.value = []
                dataDetail.value = null
                focusedRowKey.value = null
            }
        });
        const { loading: loadingWorkNotificationMessage, onResult: resWorkNotificationMessage, onError: errorWorkNotificationMessage
        } = useQuery(queries.getWorkNotificationMessage, originDataDetail, () => ({
            enabled: triggerWorkNotificationMessage.value,
            fetchPolicy: "no-cache",
        }));
        errorWorkNotificationMessage((error) => {
            triggerWorkNotificationMessage.value = false;
            dataDetail.value = null
            //notification('error', error.message)
        });
        resWorkNotificationMessage((value) => {
            triggerWorkNotificationMessage.value = false;
            dataDetail.value = value.data.getWorkNotificationMessage;
            focusedRowKey.value = value.data.getWorkNotificationMessage.messageId
        });

        // ================FUNCTION============================================
        const onFocusedRowChanging = (e: any) => {
            originDataDetail.messageId = e.rows[e.newRowIndex]?.data.messageId
            triggerWorkNotificationMessage.value = true;
        };
        const reloadData = () => {
            triggerWorkNotificationMessage.value = true;
        }

        const previewImage = (files: any, index: number) => {
            listImagePreview.value.index = index
            listImagePreview.value.files = files.map((file: any) => file.url)
            isModalPreview.value = true
        }
        const isImgLink = (url: any) => {
            if (typeof url !== 'string') return false;
            return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|webp)(\?(.*))?$/gmi) !== null);
        }
        const openLinkDownFile = (link: string) => {
            window.open(link, '_blank')
        }

        // ================WATCHING============================================
        watch(() => props.onSearch, (newValue, old) => {
            trigger.value = true;
        });
        return {
            move_column,
            colomn_resize,
            labelCol: { style: { width: "150px" } },
            dataSource, dataDetail,
            loadingTable,
            focusedRowKey, onFocusedRowChanging,
            dayjs,
            reloadData,
            rangeDate,
            loadingWorkNotificationMessage,
            isModalPreview, listImagePreview,
            previewImage, isImgLink, openLinkDownFile,
        };
    },
});
</script>
<style scoped lang="scss" src="../style/style.scss"></style>
<style scoped>
:deep .dx-toolbar-after .dx-toolbar-item {
    padding: 0 5px 0 0;
}
</style>