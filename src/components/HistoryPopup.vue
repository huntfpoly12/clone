<template>
    <div id="components-modal-demo-position">
        <a-modal v-model:visible="visible" :title="title" centered @cancel="setModalVisible()" width="1024px"
            :mask-closable="false">
            <a-spin tip="로딩 중..."
                :spinning="loadingBf320 || loadingBf330 || loadingBf210 || loadingBf340 || loadingBf210 || loadingPA210 ||loadingPA810||
                loadingCM110 || loadingCM130 || loadingBF220 || loadingPA710 || loadingPA610 || loadingPA520 || loadingPA510 || loadingStatusPA510 || loadingPA620 || loadingStatusPA620 ||
                loadingPA120 || loadingPA110 || loadingStatusPA110 || loadingCMDeduction130 || loadingStatusPA420 || loadingStatusPA720 || loadingPA720 || loadingBf310 || loadingAC610">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataTableShow"
                    :show-borders="true" key-expr="ts" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <DxPaging page-size="15"/>
                    <DxScrolling mode="standard" show-scrollbar="always"/>
                    <DxColumn caption="기록일시" data-field="loggedAt" data-type="date"
                        format="yyyy-MM-dd hh:mm"  />
                    <DxColumn caption="비고" data-field="remark" />
                    <DxColumn caption="생성일시" data-field="createdAt" data-type="date"
                        format="yyyy-MM-dd hh:mm"/>
                    <DxColumn caption="생성자ID" data-field="createdBy" />
                    <DxColumn caption="수정일시" data-field="updatedAt" data-type="date"
                        format="yyyy-MM-dd hh:mm" />
                    <DxColumn caption="수정자ID" data-field="updatedBy" />
                    <DxColumn caption="삭제여부" data-field="active" :width="80" />
                    <DxColumn caption="IP주소" data-field="ip" />
                    <DxColumn caption="상세" cell-template="detail" css-class="cell-center" :width="50" />
                    <template #detail="{}">
                        <a-space :size="8">
                            <a-tooltip placement="top" color="black">
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
    DxScrolling
} from "devextreme-vue/data-grid";
import { ZoomInOutlined } from '@ant-design/icons-vue';
import { useQuery } from "@vue/apollo-composable";
import dayjs from 'dayjs'; 

export default defineComponent({
    props: ['modalStatus', 'data', 'title', 'typeHistory', 'idRowEdit', 'companyId', 'historyData'],
    components: {
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxScrolling,
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
        let triggerDeduction130 = ref<boolean>(false);
        let trigger110 = ref<boolean>(false);
        let triggerStatus110 = ref<boolean>(false);
        let triggerPA110 = ref<boolean>(false);
        let trigger220 = ref<boolean>(false);
        let trigger610 = ref<boolean>(false);
        let triggerPA710 = ref<boolean>(false);
        let trigger520 = ref<boolean>(false);
        let trigger510 = ref<boolean>(false);
        let triggerStatus510 = ref<boolean>(false);
        let triggerStatus420 = ref<boolean>(false);
        let trigger420 = ref<boolean>(false);
        let trigger620 = ref<boolean>(false);
        let triggerStatus620 = ref<boolean>(false);
        let trigger120 = ref<boolean>(false);
        let trigger720 = ref<boolean>(false);
        let triggerStatus720 = ref<boolean>(false);
        let triggerBf310 = ref<boolean>(false);
        let triggerPA210 = ref<boolean>(false);
        let triggerPA810 = ref<boolean>(false);
        let triggerAC610 = ref<boolean>(false);
        let triggerAC620 = ref<boolean>(false);
        const dataTableShow = ref([]);

        // config grid
        const store = useStore();

        // const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const globalYear = computed(() => store.state.settings.globalYear);
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
                            dataQuery.value = {
                                id: props.idRowEdit,
                            };
                            trigger320.value = true;
                            refetchBf320();
                            break;
                        case 'bf-310':
                            dataQuery.value = {
                                id: props.idRowEdit,
                            };
                            triggerBf310.value = true;
                            refetchBf310();
                            break;
                        case 'bf-330':
                            dataQuery.value = {
                                id: props.idRowEdit,
                            };
                            trigger330.value = true;
                            refetchBf330();
                            break;
                        case 'bf-340':
                            dataQuery.value = {
                                id: props.idRowEdit,
                            };
                            trigger340.value = true;
                            refetchBf340();
                            break;
                        case 'bf-210':
                            dataQuery.value = {
                                id: props.idRowEdit,
                            };
                            trigger210.value = true;
                            refetchBf210();
                            break;
                        case 'bf-220':
                            dataQuery.value = {
                                id: props.idRowEdit,
                            };
                            trigger220.value = true;
                            refetchCM220();
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
                                imputedYear: globalYear,
                                companyId: companyId
                            };
                            trigger610.value = true;
                            refetchPA610();
                            break;
                        case 'cm-130':
                            dataQuery.value = {
                                imputedYear: globalYear,
                                companyId: companyId
                            };
                            trigger130.value = true;
                            refetchCM130();
                            break;
                        case 'cm-deduction-130':
                            dataQuery.value = {
                                imputedYear: globalYear,
                                companyId: companyId
                            };
                            triggerDeduction130.value = true;
                            refetchCMDeduction130();
                            break;
                        case 'pa-710':
                            dataQuery.value = {
                                imputedYear: globalYear,
                                companyId: companyId
                            };
                            triggerPA710.value = true;
                            // refetchPA710();
                            break;
                        case 'pa-120':
                            dataQuery.value = {
                                imputedYear: globalYear,
                                companyId: companyId
                            };
                            trigger120.value = true;
                            refetchPA120();
                            break;
                        case 'pa-110':
                            dataQuery.value = {
                                companyId: companyId,
                                processKey: {
                                    imputedYear: props.data.imputedYear,
                                    imputedMonth: props.data.imputedMonth,
                                    paymentYear: props.data.paymentYear,
                                    paymentMonth: props.data.paymentMonth,
                                },
                            };
                            triggerPA110.value = true;
                            refetchPA110();
                            break;
                        case 'pa-status-110':
                            dataQuery.value = {
                                companyId: companyId,
                                processKey: {
                                    imputedYear: props.data.imputedYear,
                                    imputedMonth: props.data.imputedMonth,
                                    paymentYear: props.data.paymentYear,
                                    paymentMonth: props.data.paymentMonth,
                                },
                            };
                            triggerStatus110.value = true;
                            refetchStatusPA110();
                            break;
                        case 'pa-520':
                            dataQuery.value = {
                                imputedYear: globalYear,
                                companyId: companyId
                            };
                            trigger520.value = true;
                            refetchPA520();
                            break;
                        case 'pa-510':
                            dataQuery.value = {
                                companyId: companyId,
                                processKey: {
                                    imputedYear: props.data.imputedYear,
                                    imputedMonth: props.data.imputedMonth,
                                    paymentYear: props.data.paymentYear,
                                    paymentMonth: props.data.paymentMonth,
                                },
                            };
                            trigger510.value = true;
                            refetchPA510();
                            break;
                        case 'pa-status-510':
                            dataQuery.value = {
                                companyId: companyId,
                                processKey: {
                                    imputedYear: props.data.imputedYear,
                                    imputedMonth: props.data.imputedMonth,
                                    paymentYear: props.data.paymentYear,
                                    paymentMonth: props.data.paymentMonth,
                                },
                            };
                            triggerStatus510.value = true;
                            refetchStatusPA510();
                            break;
                        case 'pa-status-420':
                            dataQuery.value = {
                                companyId: companyId,
                                processKey: {
                                    imputedYear: props.data.imputedYear,
                                    imputedMonth: props.data.imputedMonth,
                                    paymentYear: props.data.paymentYear,
                                    paymentMonth: props.data.paymentMonth,
                                },
                            };
                            triggerStatus420.value = true;
                            refetchStatusPA420();
                            break;
                        case 'pa-420':
                            dataQuery.value = {
                                companyId: companyId,
                                processKey: {
                                    imputedYear: props.data.imputedYear,
                                    imputedMonth: props.data.imputedMonth,
                                    paymentYear: props.data.paymentYear,
                                    paymentMonth: props.data.paymentMonth,
                                },
                            };
                            trigger420.value = true;
                            refetchPA420();
                            break;

                        case 'pa-620':
                            trigger620.value = true;
                            dataQuery.value = {
                                companyId: companyId,
                                processKey: {
                                    imputedYear: props.data.imputedYear,
                                    imputedMonth: props.data.imputedMonth,
                                    paymentYear: props.data.paymentYear,
                                    paymentMonth: props.data.paymentMonth,
                                },
                            };
                            if (dataQuery.value.companyId)
                                refetchPA620();
                            break;
                        case 'pa-620-status':
                            triggerStatus620.value = true;
                            dataQuery.value = {
                                companyId: companyId,
                                processKey: {
                                    imputedYear: props.data.imputedYear,
                                    imputedMonth: props.data.imputedMonth,
                                    paymentYear: props.data.paymentYear,
                                    paymentMonth: props.data.paymentMonth,
                                },
                            };
                            if (dataQuery.value.companyId)
                                refetchStatusPA620();
                            break;
                        case 'pa-720':
                            trigger720.value = true;
                            dataQuery.value = {
                                companyId: companyId,
                                processKey: {
                                    imputedYear: props.data.imputedYear,
                                    imputedMonth: props.data.imputedMonth,
                                    paymentYear: props.data.paymentYear,
                                    paymentMonth: props.data.paymentMonth,
                                },
                            };
                            if (dataQuery.value.companyId)
                                refetchPA720();
                            break;
                        case 'pa-720-status':
                            triggerStatus720.value = true;
                            dataQuery.value = {
                                companyId: companyId,
                                processKey: {
                                    imputedYear: props.data.imputedYear,
                                    imputedMonth: props.data.imputedMonth,
                                    paymentYear: props.data.paymentYear,
                                    paymentMonth: props.data.paymentMonth,
                                },
                            };
                            if (dataQuery.value.companyId)
                                refetchStatusPA720();
                            break;
                        case 'pa-210':
                            dataQuery.value = {
                                imputedYear: globalYear,
                                companyId: companyId
                            };
                            triggerPA210.value = true;
                            refetchPA210();
                            break;
                        case 'pa-810':
                            dataQuery.value = props.data;
                            triggerPA810.value = true;
                            refetchPA810();
                            break;
                        case 'ac-610':
                            dataQuery.value = props.data;
                            triggerAC610.value = true;
                            break;
                        case 'ac-620':
                            dataQuery.value = props.data;
                            triggerAC620.value = true;
                            refetchPA620();
                            break;
                        default:
                            break;
                    }
                } else {
                    visible.value = newValue;
                    trigger320.value = false;
                    triggerBf310.value = false;
                    trigger340.value = false;
                    trigger210.value = false;
                    trigger130.value = false;
                    triggerDeduction130.value = false;
                    trigger110.value = false;
                    triggerStatus110.value = false;
                    triggerPA110.value = false;
                    trigger220.value = false;
                    trigger610.value = false;
                    trigger620.value = false;
                    triggerPA710.value = false;
                    trigger520.value = false;
                    trigger120.value = false;
                    trigger510.value = false;
                    triggerStatus510.value = false;
                    triggerStatus420.value = false;
                    trigger420.value = false;
                    trigger620.value = false;
                    triggerStatus620.value = false;
                    triggerStatus720.value = false;
                    triggerPA210.value = false;
                    triggerPA810.value = false;
                    triggerAC610.value = false;
                    triggerAC620.value = false;
                }
            }
        );

        // get getCompanyLogs Bf310
        const { result: resultBf310, loading: loadingBf310, refetch: refetchBf310 } = useQuery(
            queries.getSubscriptionRequestLogs,
            dataQuery,
            () => ({
                enabled: triggerBf310.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultBf310, (value) => {
            if (value && value.getSubscriptionRequestLogs) {
                dataTableShow.value = value.getSubscriptionRequestLogs;
            }
        });
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
        const { result: resultCM130, loading: loadingCM130, refetch: refetchCMDeduction130 } = useQuery(
            queries.getWithholdingConfigPayItemsLogs,
            dataQuery,
            () => ({
                enabled: triggerDeduction130.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultCM130, (value) => {
            if (value && value.getWithholdingConfigPayItemsLogs) {
                dataTableShow.value = value.getWithholdingConfigPayItemsLogs;
            }
        });

        // get getWithholdingConfigDeductionItemsLogs cm-130
        const { result: resultCMDeduction130, loading: loadingCMDeduction130, refetch: refetchCM130 } = useQuery(
            queries.getWithholdingConfigDeductionItemsLogs,
            dataQuery,
            () => ({
                enabled: trigger130.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultCMDeduction130, (value) => {
            if (value && value.getWithholdingConfigDeductionItemsLogs) {
                dataTableShow.value = value.getWithholdingConfigDeductionItemsLogs;
            }
        });

        // get getEmployeeExtrasLogs pa-710
        const { result: resultPA710, loading: loadingPA710, refetch: refetchPA710 } = useQuery(
            queries.getEmployeeExtrasLogs,
            dataQuery,
            () => ({
                enabled: triggerPA710.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultPA710, (value) => {
            triggerPA710.value = false;
            if (value && value.getEmployeeExtrasLogs) {
                dataTableShow.value = value.getEmployeeExtrasLogs;
            }
        });

        // get getEmployeeWageDailiesLogs pa-520
        const { result: resultPA520, loading: loadingPA520, refetch: refetchPA520 } = useQuery(
            queries.getEmployeeWageDailiesLogs,
            dataQuery,
            () => ({
                enabled: trigger520.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultPA520, (value) => {
            if (value && value.getEmployeeWageDailiesLogs) {
                dataTableShow.value = value.getEmployeeWageDailiesLogs;
            }
        });


        // get getIncomeWageDailiesLogs pa-510
        const { result: resultPA510, loading: loadingPA510, refetch: refetchPA510 } = useQuery(
            queries.getIncomeWageDailiesLogs,
            dataQuery,
            () => ({
                enabled: trigger510.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultPA510, (value) => {
            if (value && value.getIncomeWageDailiesLogs) {
                dataTableShow.value = value.getIncomeWageDailiesLogs;
            }
        });
        // get getIncomeProcessWageDailyLogs pa-510
        const { result: resultStatusPA510, loading: loadingStatusPA510, refetch: refetchStatusPA510 } = useQuery(
            queries.getIncomeProcessWageDailyLogs,
            dataQuery,
            () => ({
                enabled: triggerStatus510.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultStatusPA510, (value) => {
            if (value && value.getIncomeProcessWageDailyLogs) {
                dataTableShow.value = value.getIncomeProcessWageDailyLogs;
            }
        });

        // get getIncomeProcessRetirementLogs pa-420
        const { result: resultStatusPA420, loading: loadingStatusPA420, refetch: refetchStatusPA420 } = useQuery(
            queries.getIncomeProcessRetirementLogs,
            dataQuery,
            () => ({
                enabled: triggerStatus420.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultStatusPA420, (value) => {
            if (value && value.getIncomeProcessRetirementLogs) {
                dataTableShow.value = value.getIncomeProcessRetirementLogs;
            }
        });

        // get getIncomeRetirementsLogs pa-420
        const { result: resultPA420, loading: loadingPA420, refetch: refetchPA420 } = useQuery(
            queries.getIncomeRetirementsLogs,
            dataQuery,
            () => ({
                enabled: trigger420.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultPA420, (value) => {
            if (value && value.getIncomeRetirementsLogs) {
                dataTableShow.value = value.getIncomeRetirementsLogs;
            }
        });


        // get getIncomeWageDailiesLogs pa-620
        const { result: resultPA620, loading: loadingPA620, refetch: refetchPA620 } = useQuery(
            queries.getIncomeBusinessesLogs,
            dataQuery,
            () => ({
                enabled: trigger620.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultPA620, (value) => {
            if (value && value.getIncomeBusinessesLogs) {
                dataTableShow.value = value.getIncomeBusinessesLogs;
            }
        });
        // get getIncomeProcessBusinessLogs pa-620
        const { result: resultStatusPA620, loading: loadingStatusPA620, refetch: refetchStatusPA620 } = useQuery(
            queries.getIncomeProcessBusinessLogs,
            dataQuery,
            () => ({
                enabled: triggerStatus620.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultStatusPA620, (value) => {
            if (value && value.getIncomeProcessBusinessLogs) {
                dataTableShow.value = value.getIncomeProcessBusinessLogs;
            }
        });


        // get getEmployeeWagesLogs pa-120
        const { result: resultPA120, loading: loadingPA120, refetch: refetchPA120 } = useQuery(
            queries.getEmployeeWagesLogs,
            dataQuery,
            () => ({
                enabled: trigger120.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultPA120, (value) => {
            if (value && value.getEmployeeWagesLogs) {
                dataTableShow.value = value.getEmployeeWagesLogs;
            }
        });
        // get getIncomeWageLogs pa-110
        const { result: resultPA110, loading: loadingPA110, refetch: refetchPA110 } = useQuery(
            queries.getIncomeWagesLogs,
            dataQuery,
            () => ({
                enabled: triggerPA110.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultPA110, (value) => {
            if (value && value.getIncomeWagesLogs) {
                dataTableShow.value = value.getIncomeWagesLogs;
            }
        });
        // get getIncomeProcessWagesLogs pa-110
        const { result: resultStatusPA110, loading: loadingStatusPA110, refetch: refetchStatusPA110 } = useQuery(
            queries.getIncomeProcessWageLogs,
            dataQuery,
            () => ({
                enabled: triggerStatus110.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultStatusPA110, (value) => {
            if (value && value.getIncomeProcessWageLogs) {
                dataTableShow.value = value.getIncomeProcessWageLogs;
            }
        });
        // get getIncomeWageDailiesLogs pa-720
        const { result: resultPA720, loading: loadingPA720, refetch: refetchPA720 } = useQuery(
            queries.getIncomeExtrasLogs,
            dataQuery,
            () => ({
                enabled: trigger720.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultPA720, (value) => {
            if (value && value.getIncomeExtrasLogs) {
                dataTableShow.value = value.getIncomeExtrasLogs;
            }
        });
        // get incomeProcessExtra pa-720
        const { result: resultStatusPA720, loading: loadingStatusPA720, refetch: refetchStatusPA720 } = useQuery(
            queries.getIncomeProcessExtraLogs,
            dataQuery,
            () => ({
                enabled: triggerStatus720.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultStatusPA720, (value) => {
            if (value && value.getIncomeProcessExtraLogs) {
                dataTableShow.value = value.getIncomeProcessExtraLogs;
            }
        });

        // get getTaxWithholdingStatusReportsLogs pa-210
        const { result: resultPA210, loading: loadingPA210, refetch: refetchPA210 } = useQuery(
            queries.getTaxWithholdingStatusReportsLogs,
            dataQuery,
            () => ({
                enabled: triggerPA210.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultPA210, (value) => {
            if (value && value.getTaxWithholdingStatusReportsLogs) {
                dataTableShow.value = value.getTaxWithholdingStatusReportsLogs;
            }
        });

        // get getMajorInsuranceCompanyEmployeeAcquisitionLogs pa-810
        const { result: resultPA810, loading: loadingPA810, refetch: refetchPA810 } = useQuery(
            queries.getMajorInsuranceCompanyEmployeeAcquisitionLogs,
            dataQuery,
            () => ({
                enabled: triggerPA810.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultPA810, (value) => {
            if (value) {
                dataTableShow.value = value.getMajorInsuranceCompanyEmployeeAcquisitionLogs;
            }
        });
        // get getClientLogs ac-610
        const { result: resultAC610, loading: loadingAC610, refetch: refetchAC610 } = useQuery(
            queries.getClientLogs,
            dataQuery,
            () => ({
                enabled: triggerAC610.value,
                fetchPolicy: "no-cache",
            })
        );
        
        watch(resultAC610, (value) => {
            if (value) {
                dataTableShow.value = value.getClientLogs;
            }
            triggerAC610.value = false;
        });

        // get getClientLogs ac620
        const { result: resultAC620, loading: loadingAC620, refetch: refetchAC620 } = useQuery(
            queries.getBackerLogs,
            dataQuery,
            () => ({
                enabled: triggerAC610.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultAC620, (value) => {
            if (value) {
                dataTableShow.value = value.getClientLogs;
            }
            triggerAC620.value = false;
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
            loadingBf310,
            loadingBf320,
            loadingBf330,
            loadingBf340,
            loadingBf210,
            loadingCM110,
            loadingCM130,
            loadingCMDeduction130,
            loadingBF220,
            loadingPA710,
            loadingPA520,
            loadingPA510,
            loadingStatusPA510,
            loadingPA620,
            loadingStatusPA620,
            loadingPA110,
            loadingStatusPA110,
            loadingPA120,
            formarDate,
            dataQuery,
            loadingPA610,
            loadingStatusPA420,
            loadingPA420,
            loadingPA720,
            loadingStatusPA720,
            loadingPA210,
            loadingPA810,
            loadingAC610,
            loadingAC620,
        }
    },

})
</script>
