<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="500">
        <standard-form class="text-center mt-20">
            <div class="flex-center">
                <month-picker-box width="100px" class="mr-5" v-model:valueDate="yearMonth" />
                <span class="ml-5">전표를 w4c에 업로드하시겠습니까?</span>
            </div>
            <div class="text-center mt-30">
                <button-basic class="mr-5" :text="'아니요'" :type="'default'" :mode="'outlined'" @onClick="cancel" />
                <button-basic class="ml-5" :text="'네. 업로드하겠습니다'" :type="'default'" :mode="'contained'"
                    @onClick="actionOpenModalUploadTable" />
            </div>
        </standard-form>
    </a-modal>

    <a-modal :visible="modalStatusTable" @cancel="cancelTable" :mask-closable="false" class="confirm-md" footer=""
        :width="700">
        <div :key="countKey">
            <h1 class="text-center mb-0">전표 업로드</h1>
            <a-spin :spinning="loadingGetFacilityBusinessAccountingProcesses">
                <DxDataGrid noDataText="내역이 없습니다" id="dataGridAC210" key-expr="facilityBusinessId" :show-row-lines="true"
                    :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true" ref="gridRefDetailAC210"
                    :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
                    <DxPaging :enabled="false" />
                    <DxToolbar>
                        <DxItem name="searchPanel" />
                    </DxToolbar>
                    <DxColumn caption="회계연월" width="100" cell-template="year-month" />
                    <template #year-month="">
                        <b>{{ parseInt(yearMonth.toString().slice(0, 4)) }}-{{
                            $filters.formatMonth(parseInt(yearMonth.toString().slice(4, 6))) }}</b>
                    </template>

                    <!-- <DxColumn caption="결의서 내역수" data-field="" /> -->

                    <DxColumn caption="마감현황" data-field="facilityBusinessName"
                        cell-template="facilityBusinessName-status" />
                    <template #facilityBusinessName-status="{ data }">
                        <div class="d-flex-center">
                            <span>{{ data.data.facilityBusinessName }}</span>
                            <ProcessStatus class="ml-20 mr-10" :noOptionNoInput="false" :valueStatus="data.data.status"
                                disabled />
                            <spa v-if="data.data.status == 1">
                                <info-tool-tip>입력된 내역이 없는 상태</info-tool-tip>
                            </spa>
                        </div>
                    </template>

                    <DxColumn caption="업로드 가능 여부" width="150" css-class="cell-left" data-field="status"
                        cell-template="status" />
                    <template #status="{ data }">
                        <a-tag v-if="data.data.status == 40" color="#4F6228">업로드 가능</a-tag>
                        <a-tag v-else color="#C00000">업로드 불가</a-tag>
                    </template>
                </DxDataGrid>
            </a-spin>
            <div class="text-center mt-30">
                <button-basic :text="'업로드'" :type="'default'" :mode="'contained'" @onClick="actionSubmit"
                    :disabled="!statusButtonSubmit" />
            </div>
        </div>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/AC/AC2/AC210";
import queries from "@/graphql/queries/AC/AC2/AC210";
import { companyId } from "@/helpers/commonFunction";
import { useStore } from "vuex";
import dayjs from "dayjs";
import notification from "@/utils/notification";
import { Message } from "@/configs/enum";
import filters from "@/helpers/filters";
import DxButton from "devextreme-vue/button";
import {
    DxItem,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxPaging,
    DxSearchPanel,
    DxToolbar,
} from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";
export default defineComponent({

    components: {
        DxItem,
        DxDataGrid,
        DxColumn,
        DxScrolling,
        DxPaging,
        DxButton,
        DxSearchPanel,
        DxToolbar,
    },
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },

    setup(props, { emit }) {
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? "0"));
        const globalFacilityBizId = ref<number>(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0"));
        const countKey = ref<number>(0);
        const gridRefDetailAC210 = ref(); // ref of grid
        let statusButtonSubmit = ref<boolean>(false)
        const modalStatusTable = ref<boolean>(false)
        const yearMonth = ref(parseInt(dayjs().format("YYYYMM")))
        const dataSource: any = ref(new DataSource({
            store: {
                type: "array",
                key: "facilityBusinessId",
                data: [],
            },
            requireTotalCount: true,
        }));
        let triggerGetFacilityBusinessAccountingProcesses = ref<boolean>(false)
        const argumentGetFacilityBusinessAccountingProcesses = ref({
            companyId: companyId,
            fiscalYear: acYear.value,
            year: parseInt(yearMonth.value?.toString().slice(0, 4)),
            month: parseInt(yearMonth.value?.toString().slice(4, 6)),
        })

        // =================== GRAPHQL ===================
        // query getAccountingDocumentW4cUploadItems
        const {
            result: resGetFacilityBusinessAccountingProcesses,
            loading: loadingGetFacilityBusinessAccountingProcesses,
            onError: errorGetFacilityBusinessAccountingProcesses,
        } = useQuery(
            queries.getFacilityBusinessAccountingProcesses,
            argumentGetFacilityBusinessAccountingProcesses.value,
            () => ({
                enabled: triggerGetFacilityBusinessAccountingProcesses.value,
                fetchPolicy: "no-cache",
            })
        );
        errorGetFacilityBusinessAccountingProcesses((e) => {
            triggerGetFacilityBusinessAccountingProcesses.value = false;
            dataSource.value = new DataSource({
                store: {
                    type: "array",
                    key: "facilityBusinessId",
                    data: [],
                },
                requireTotalCount: true,
            });
            //notification('error', e.message)
        });

        // mutation registerAccountingDocumentW4cUpload
        const {
            mutate: mutateRegisterAccountingDocumentW4cUpload,
            onDone: doneRegisterAccountingDocumentW4cUpload,
            onError: errorRegisterAccountingDocumentW4cUpload,
        } = useMutation(mutations.registerAccountingDocumentW4cUpload);

        doneRegisterAccountingDocumentW4cUpload((e: any) => {
            notification("success", Message.getMessage("COMMON", "106").message);
            modalStatusTable.value = false;
            emit("closePopup", false);
            emit("resetTable", true);
        });
        errorRegisterAccountingDocumentW4cUpload((e) => {
            //notification('error', e.message)
        });

        // ================== WATCH ================
        watch(() => props.modalStatus, (newValue, old) => {
            if (newValue) {
                yearMonth.value = parseInt(dayjs().format("YYYYMM"))
            }
        });
        watch(resGetFacilityBusinessAccountingProcesses, (value) => {
            triggerGetFacilityBusinessAccountingProcesses.value = false;
            statusButtonSubmit.value = true;
            value.getFacilityBusinessAccountingProcesses.map((item: any) => {
                if (item.status != 40) {
                    statusButtonSubmit.value = false;
                }
            })
            dataSource.value = new DataSource({
                store: {
                    type: "array",
                    key: "facilityBusinessId",
                    data: value.getFacilityBusinessAccountingProcesses,
                },
                requireTotalCount: true,
            });
        });

        // ================ FUNCTION ============================================
        const cancel = () => {
            emit("closePopup", false);
        };

        const cancelTable = () => {
            modalStatusTable.value = false;
        }

        const actionOpenModalUploadTable = () => {
            argumentGetFacilityBusinessAccountingProcesses.value.year = parseInt(yearMonth.value?.toString().slice(0, 4))
            argumentGetFacilityBusinessAccountingProcesses.value.month = parseInt(yearMonth.value?.toString().slice(4, 6))
            triggerGetFacilityBusinessAccountingProcesses.value = true;
            modalStatusTable.value = true;
        }

        const actionSubmit = () => {
            mutateRegisterAccountingDocumentW4cUpload({
                companyId: companyId,
                fiscalYear: acYear.value,
                year: parseInt(yearMonth.value?.toString().slice(0, 4)),
                month: parseInt(yearMonth.value?.toString().slice(4, 6)),
            })
        }

        return {
            move_column,
            colomn_resize,
            cancel,
            countKey,
            store,
            dataSource, gridRefDetailAC210,
            modalStatusTable,
            cancelTable, actionOpenModalUploadTable,
            actionSubmit,
            yearMonth,
            loadingGetFacilityBusinessAccountingProcesses,
            statusButtonSubmit,
        };
    },
});
</script>

<style lang="scss" scoped>
.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
