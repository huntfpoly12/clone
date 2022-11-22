<template>
    <div id="components-modal-demo-position">
        <a-modal v-model:visible="visible" :title="title" centered @cancel="setModalVisible()" width="1024px"
            :mask-closable="false">
            <a-spin tip="로딩 중..."
                :spinning="loadingBf320 || loadingBf330 || loadingBf210 || loadingBf340 || loadingBf210 || loadingCM110 || loadingCM130 || loadingBF220 || loadingPA710 || loadingPA610">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataTableShow"
                    :show-borders="true" key-expr="ts" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <DxColumn caption="기록일시" data-field="loggedAt" data-type="text" />
                    <DxColumn caption="비고" data-field="remark" />
                    <DxColumn caption="생성일시" data-field="createdAt" cell-template="createdAtCell" />
                    <template #createdAtCell="{ data }">
                        {{ formarDate(data.value) }}
                    </template>
                    <DxColumn caption="생성자ID" data-field="createdBy" />
                    <DxColumn caption="수정일시" data-field="updatedAt" cell-template="updatedAtCell" />
                    <template #updatedAtCell="{ data }">
                        {{ formarDate(data.value) }}
                    </template>
                    <DxColumn caption="수정자ID" data-field="updatedBy" />
                    <DxColumn caption="삭제여부" data-field="active" :width="80" />
                    <DxColumn caption="IP주소" data-field="ip" />
                    <DxColumn caption="상세" cell-template="detail" css-class="cell-center" :width="50" />
                    <template #detail="{}">
                        <a-space :size="8">
                            <a-tooltip placement="top">
                                <template #title>상세보기</template>
                                <zoom-in-outlined :style="{ fontSize: '20px' }" />
                            </a-tooltip>
                        </a-space>
                    </template>
                </DxDataGrid>
            </a-spin>
            <template #footer>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { companyId } from "../../src/helpers/commonFunction";
import { ref, defineComponent, watch, computed } from 'vue';
import { useStore } from "vuex";
import queries from "../../src/graphql/queries/common/index";
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
} from "devextreme-vue/data-grid";
import { ZoomInOutlined } from '@ant-design/icons-vue';
import { useQuery } from "@vue/apollo-composable";
import dayjs, { Dayjs } from 'dayjs';
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday);
dayjs.extend(localeData);

export default defineComponent({
    props: ['modalStatus', 'data', 'title', 'typeHistory', 'idRowEdit', 'companyId'],
    components: {
        DxDataGrid,
        DxColumn,
        DxPaging,
        ZoomInOutlined
    },

    setup(props, { emit }) {
        let visible = ref(false);
        const dataQuery = ref();
        let trigger320 = ref<boolean>(false);
        let trigger330 = ref<boolean>(false);
        let trigger340 = ref<boolean>(false);
        let trigger210 = ref<boolean>(false);
        let trigger130 = ref<boolean>(false);
        let trigger110 = ref<boolean>(false);
        let trigger220 = ref<boolean>(false);
        let trigger610 = ref<boolean>(false);
        let trigger710 = ref<boolean>(false);
        const dataTableShow = ref([]);

        // config grid
        const store = useStore();

        // const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);

        watch(
            () => props.modalStatus,
            (newValue, old) => {
                if (newValue) {
                    visible.value = newValue;
                    if (companyId) {
                        dataQuery.value = {
                            userId: props.idRowEdit,
                            companyId: companyId
                        };
                    }
                    else {
                        dataQuery.value = { id: props.idRowEdit };
                    }
                    switch (props.typeHistory) {
                        case 'bf-320':
                            trigger320.value = true;
                            refetchBf320();
                            break;
                        case 'bf-330':
                            trigger330.value = true;
                            refetchBf330();
                            break;
                        case 'bf-340':
                            trigger340.value = true;
                            refetchBf340();
                            break;
                        case 'bf-210':
                            trigger210.value = true;
                            refetchBf210();
                            break;
                        case 'cm-110':
                            if (dataQuery.value) {
                                trigger110.value = true;
                                // refetchCM110();
                            }
                            break;
                        case 'cm-220':
                            trigger220.value = true;
                            refetchCM220();
                            break;
                        case 'pa-610':
                            dataQuery.value = {
                                imputedYear: parseInt(dayjs().format('YYYY')),
                                companyId: companyId
                            };
                            trigger610.value = true;
                            refetchPA610();
                            break;
                        case 'cm-130':
                            dataQuery.value = {
                                imputedYear: parseInt(dayjs().format('YYYY')),
                                companyId: companyId
                            };
                            trigger130.value = true;
                            refetchCM130();
                            break;
                        case 'pa-710':
                            dataQuery.value = {
                                imputedYear: parseInt(dayjs().format('YYYY')),
                                companyId: companyId
                            };
                            trigger710.value = true;
                            refetchPA710();
                            break;
                        default:
                            break;
                    }
                } else {
                    visible.value = newValue;
                    trigger320.value = false;
                    trigger340.value = false;
                    trigger210.value = false;
                    trigger130.value = false;
                    trigger110.value = false;
                    trigger220.value = false;

                    trigger610.value = false;

                    trigger710.value = false;

                }
            }
        );

        // get getCompanyLogs 320
        const { result: resultBf320, loading: loadingBf320, refetch: refetchBf320 } = useQuery(
            queries.getCompanyLogs,
            dataQuery,
            () => ({
                enabled: trigger320.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultBf320, (value) => {
            if (value && value.getCompanyLogs) {
                dataTableShow.value = value.getCompanyLogs;
            }
        });

        // get getSalesRepresentativeLogs  340
        const { result: resultBf330, loading: loadingBf330, refetch: refetchBf330 } = useQuery(
            queries.getServiceContractLogs,
            dataQuery,
            () => ({
                enabled: trigger330.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultBf330, (value) => {
            if (value && value.getServiceContractLogs) {
                dataTableShow.value = value.getServiceContractLogs;
            }
        });

        // get getSalesRepresentativeLogs  340
        const { result: resultBf340, loading: loadingBf340, refetch: refetchBf340 } = useQuery(
            queries.getSalesRepresentativeLogs,
            dataQuery,
            () => ({
                enabled: trigger340.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultBf340, (value) => {
            if (value && value.getSalesRepresentativeLogs) {
                dataTableShow.value = value.getSalesRepresentativeLogs;
            }
        });

        // get getUserLogs  210
        const { result: resultBf210, loading: loadingBf210, refetch: refetchBf210 } = useQuery(
            queries.getUserLogs,
            dataQuery,
            () => ({
                enabled: trigger210.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultBf210, (value) => {
            if (value && value.getUserLogs) {
                dataTableShow.value = value.getUserLogs;
            }
        });

        // get getUserLogs  110
        const { result: resultCM110, loading: loadingCM110, refetch: refetchCM110 } = useQuery(
            queries.getMyCompanyUserLogs,
            dataQuery,
            () => ({
                enabled: trigger110.value,
                fetchPolicy: "no-cache",
            })
        );

        watch(resultCM110, (value) => {
            if (value && value.getMyCompanyUserLogs) {
                dataTableShow.value = value.getMyCompanyUserLogs;
            }
        });

        // get getScreenRoleGroupLogs  220
        const { result: resultBF220, loading: loadingBF220, refetch: refetchCM220 } = useQuery(
            queries.getScreenRoleGroupLogs,
            dataQuery,
            () => ({
                enabled: trigger220.value,
                fetchPolicy: "no-cache",
            })
        );

        watch(resultBF220, (value) => {
            if (value && value.getScreenRoleGroupLogs) {
                dataTableShow.value = value.getScreenRoleGroupLogs;
            }
        });

        // get getScreenRoleGroupLogs  610
        const { result: resultPA610, loading: loadingPA610, refetch: refetchPA610 } = useQuery(
            queries.getEmployeeBusinessesLogs,
            dataQuery,
            () => ({
                enabled: trigger610.value,
                fetchPolicy: "no-cache",
            })
        );

        watch(resultPA610, (value) => {
            if (value && value.getEmployeeBusinessesLogs) {
                dataTableShow.value = value.getEmployeeBusinessesLogs;
            }
        });

        // get getWithholdingConfigPayItemsLogs cm-130
        const { result: resultCM130, loading: loadingCM130, refetch: refetchCM130 } = useQuery(
            queries.getWithholdingConfigPayItemsLogs,
            dataQuery,
            () => ({
                enabled: trigger130.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultCM130, (value) => {
            if (value && value.getWithholdingConfigPayItemsLogs) {
                dataTableShow.value = value.getWithholdingConfigPayItemsLogs;
            }
        });

        // get getEmployeeExtrasLogs pa-710
        const { result: resultPA710, loading: loadingPA710, refetch: refetchPA710 } = useQuery(
            queries.getEmployeeExtrasLogs,
            dataQuery,
            () => ({
                enabled: trigger710.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultPA710, (value) => {
            if (value && value.getEmployeeExtrasLogs) {
                dataTableShow.value = value.getEmployeeExtrasLogs;
            }
        });

        const formarDate = (date: any) => {
            return dayjs(date).format('YYYY/MM/DD')
        };
        const setModalVisible = () => {
            dataTableShow.value = [];
            emit('closePopup', false)
        }
        return {
            setModalVisible,
            dataTableShow,
            move_column,
            colomn_resize,
            visible,
            loadingBf320,
            loadingBf330,
            loadingBf340,
            loadingBf210,
            loadingCM110,
            loadingCM130,
            loadingBF220,
            loadingPA710,
            formarDate,
            dataQuery,
            loadingPA610
        }
    },

})
</script>