<template>
    <action-header title="기타소득자등록" @actionSave="false" :buttonSave="false" buttonSearch @actionSearch="actionSearch"/>
    <div id="announcement-user">
        <div class="page-content">
            <a-row>
                <a-col span="16" class="data-table">
                    <a-spin :spinning="loadingTable" size="large">
                        <DxDataGrid noDataText="내역이 없습니다" id="gridContainer" :show-row-lines="true"
                            :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true" key-expr="id"
                            :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                            :column-auto-width="true" ref="gridRef" :focused-row-enabled="true"
                            @focused-row-changing="onFocusedRowChanging" v-model:focused-row-key="focusedRowKey">
                            <DxScrolling mode="standard" show-scrollbar="always" />
                            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
                            <DxPaging :enabled="false" />
                            <DxExport :enabled="true" />
                            <DxToolbar>
                                <DxItem template="search-template" location="before" />
                                <DxItem name="searchPanel" />
                                <DxItem name="exportButton" css-class="cell-button-export" />
                                <!-- <DxItem location="after" template="button-history" css-class="cell-button-add" /> -->
                                <!-- <DxItem location="after" template="button-template" css-class="cell-button-add" /> -->
                            </DxToolbar>
                            <template #search-template>
                                <div class="d-flex-center">
                                    <a-form-item label="작성기간 (최대 3년)" :label-col="labelCol" class="red">
                                        <range-date-time-box v-model:valueDate="rangeDate" width="250px"
                                            :multi-calendars="true" :maxSelect="36" />
                                    </a-form-item>
                                </div>
                            </template>
                            <DxColumn caption="구분" cell-template="expresstionType" css-class="cell-center"
                                data-field="expresstionType" width="90" />
                            <template #expresstionType="{ data }">
                                <ExpressionType :valueSelect="data.data.expresstionType" :isSelect="false" />
                            </template>

                            <DxColumn caption="상단고정" cell-template="showO" data-field="" />
                            <template #showO>O</template>

                            <DxColumn caption="내용" data-field="content" />

                            <DxColumn caption="작성자" cell-template="abc" data-field="" />
                            <template #abc>장부다</template>

                            <DxColumn caption="작성일" data-field="writedAt" format="yyyy-MM-dd HH:mm:ss" data-type="date" />
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
                        <a-spin :spinning="loadingWorkNoticeMessage" size="large">
                            <div v-if="dataDetail" class="wrapper-content">
                                <div class="question-container">
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
                                            :key="indexFile" class="files-preview-filetext"
                                            @click="openLinkDownFile(file.url)">
                                            <FileTextOutlined style="margin-right: 10px; font-size:30px" />
                                            <div class="files-preview-filetext-info">
                                                <p class="files-preview-filetext-info-name">{{
                                                    file.name }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a-spin>
                    </div>
                </a-col>
            </a-row>
        </div>
        <ModalPreviewListImage :isModalPreview="isModalPreview" @cancel="isModalPreview = false"
            :listImage="listImagePreview" />
    </div>
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
import DataSource from "devextreme/data/data_source";
import queries from "@/graphql/queries/Announcement/User/index";
import { useQuery } from "@vue/apollo-composable";
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
        ModalPreviewListImage,
        ReloadOutlined,
        FileTextOutlined,
    },
    setup() {
        // config grid
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const dataSource = ref([])
        const dataDetail = ref<any>(null)
        const trigger = ref<boolean>(true)
        const triggerDetail = ref<boolean>(false)
        const rangeDate = ref([20210101, parseInt(dayjs().format("YYYYMMDD"))])
        const focusedRowKey = ref(null);
        const originData = {
            companyId: companyId,
            filter: {
                startWriteDate: computed(() => rangeDate.value[0]),
                finishWriteDate: computed(() => rangeDate.value[1]),
            },
        }
        const originDataDetail = {
            companyId: companyId,
            messageId: null,
        }
        const isModalPreview = ref<boolean>(false)
        const listImagePreview = ref({
            index: 0,
            files: [],
        })

        // ================GRAPQL==============================================
        const { loading: loadingTable, onResult: resWorkNoticeMessages, onError
        } = useQuery(queries.searchWorkNoticeMessages, originData, () => ({
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
        resWorkNoticeMessages((value) => {
            trigger.value = false;
            let data = value.data.searchWorkNoticeMessages
            if (data.length) {
                dataSource.value = data;
                focusedRowKey.value = data[0].id
                originDataDetail.messageId = data[0].id
                triggerDetail.value = true;
            } else {
                dataSource.value = []
                dataDetail.value = null
                focusedRowKey.value = null
            }
        });
        const { loading: loadingWorkNoticeMessage, onResult: resWorkNoticeMessage, onError: errorWorkNoticeMessage
        } = useQuery(queries.getWorkNoticeMessage, originDataDetail, () => ({
            enabled: triggerDetail.value,
            fetchPolicy: "no-cache",
        }));
        errorWorkNoticeMessage((error) => {
            triggerDetail.value = false;
            dataDetail.value = null
            //notification('error', error.message)
        });
        resWorkNoticeMessage((value) => {
            triggerDetail.value = false;
            dataDetail.value = value.data.getWorkNoticeMessage;
        });

        // ================FUNCTION============================================
        const onFocusedRowChanging = (e: any) => {
            originDataDetail.messageId = e.rows[e.newRowIndex]?.data.id
            triggerDetail.value = true;
        };
        const reloadData = () => {
            triggerDetail.value = true;
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
        const actionSearch = () => {
            trigger.value = true;
        }
        // ================WATCHING============================================


        return {
            loadingTable, loadingWorkNoticeMessage,
            move_column, dayjs,
            colomn_resize,
            labelCol: { style: { width: "150px" } },
            dataSource, dataDetail,
            rangeDate, reloadData,
            previewImage, isImgLink, openLinkDownFile,
            isModalPreview, listImagePreview,
            onFocusedRowChanging, focusedRowKey,
            actionSearch,
        };
    },
});
</script>
<style scoped lang="scss" src="./style/style.scss"></style>

<style>
.confirmDelete .anticon {
    color: black !important;
}
</style>
