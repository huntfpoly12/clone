<template>
    <div id="add-pa-210">
        <a-modal :visible="modalStatus" centered okText="네. 작성합니다" cancelText="아니요" @cancel="setModalVisible()"
            :mask-closable="false" width="1000px" footer="">
            <standard-form formName="add-pa-210" class="pt-20">
                <a-spin tip="Loading..." :spinning="loading">
                    <a-form-item label="지방소득세환급청구서/납부내역서">
                        <radio-group :arrayValue="arrayRadioCheck" v-model:valueRadioCheck="afterDeadline"
                            :layoutCustom="'horizontal'" />
                    </a-form-item>
                    <DxDataGrid class="pt-20" :show-row-lines="true" :hoverStateEnabled="true"
                        :data-source="dataReports" :show-borders="true" key-expr="reportId"
                        :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                        :column-auto-width="true" focused-row-enabled="true" v-model:focused-row-key="focusedRowKey"
                        :onRowClick="onSelectionChanged">
                        <DxScrolling mode="standard" show-scrollbar="always"/>
                        <DxColumn caption="선택" cell-template="radioCheck" />
                        <template #radioCheck="{ data }">
                            <div class="text-align-center pt-8">
                                <input type="radio" name="radioCheck" :checked="focusedRowKey == data.data.reportId ? true : false"/>
                            </div>
                        </template>
                        <DxColumn caption="귀속 연월" cell-template="imputed" />
                        <template #imputed="{ data }">
                            <a-tooltip>
                                <template #title>
                                    귀속기간{{ showTooltipYearMonth(data.data.reportType, data.data.imputedStartYearMonth, data.data.imputedFinishYearMonth) }}
                                </template>
                                <div class="text-align-center">
                                    <DxButton
                                        :text="'귀' + data.data.imputedYear + '-' + (data.data.imputedMonth > 9 ? data.data.imputedMonth : '0' + data.data.imputedMonth)"
                                        :style="{ color: 'white', backgroundColor: 'gray' }" :height="$config_styles.HeightInput" />
                                </div>
                            </a-tooltip>
                        </template>
                        <DxColumn caption="지급 연월" cell-template="payment" />
                        <template #payment="{ data }">
                            <a-tooltip>
                                <template #title>
                                    지급기간{{ showTooltipYearMonth(data.data.reportType, data.data.paymentStartYearMonth, data.data.paymentFinishYearMonth) }}
                                </template>
                                <div class="text-align-center">
                                    <DxButton
                                        :text="'지' + data.data.paymentYear + '-' + (data.data.paymentMonth > 9 ? data.data.paymentMonth : '0' + data.data.paymentMonth)"
                                        :style="{ color: 'white', backgroundColor: 'black' }" :height="$config_styles.HeightInput" />
                                </div>
                            </a-tooltip>
                        </template>
                        <DxColumn caption="신고 주기" cell-template="reportType" />
                        <template #reportType="{ data }">
                            <DxButton :text="getReportType(data.data.reportType)?.text"
                                :style="getReportType(data.data.reportType)?.style" :height="$config_styles.HeightInput" />
                        </template>
                        <DxColumn data-field="yearEndTaxAdjustment" caption="연말" css-class="cell-center"
                            cell-template="yearEndTaxAdjustment" />
                        <template #yearEndTaxAdjustment="{ data }">{{
                            data.data.yearEndTaxAdjustment ? 'O' : 'X'
                        }}</template>

                        <DxColumn data-field="refund" caption="환급" css-class="cell-center" cell-template="refund" />
                        <template #refund="{ data }">{{ data.data.refund ? 'O' : 'X' }}</template>
                    </DxDataGrid>
                </a-spin>
                <h3 class="text-align-center mt-20">선택한 원천징수이행상황신고서를 작성하시겠습니까?</h3>
                <div class="text-align-center mt-20">
                    <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
                        @onClick="setModalVisible()" />
                    <button-basic class="button-form-modal" :text="'네. 작성합니다'" :width="140" :type="'default'"
                        :mode="'contained'" @onClick="onSubmit($event)" />
                </div>
            </standard-form>
        </a-modal>
        <report-grid v-if="reportGridStatus" :modalStatus="reportGridStatus" @closePopup="closeAllPopupAdd" @isDoneReport="closeAllPopupAdd"
            :dataReport="dataReport" :key="resetComponent"></report-grid>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue";
import dayjs from "dayjs";
import ReportGrid from "./ReportGrid/ReportGrid.vue";
import DxButton from "devextreme-vue/button";
import { DxDataGrid, DxColumn,DxScrolling, DxSelection } from "devextreme-vue/data-grid"
import { useStore } from "vuex";
import { getReportType, showTooltipYearMonth } from "../utils/index"
export default defineComponent({
    props: {
        modalStatus: Boolean,
        dataPopupAdd: {
            type: Object,
        }
    },
    components: {
        DxDataGrid, DxColumn, DxButton, DxSelection,DxScrolling,
        ReportGrid
    },

    setup(props, { emit }) {
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);

        const loading = ref<Boolean>(false)
        const dataReports: any = ref([])
        const dataReport: any = ref([])
        const reportGridStatus = ref(false)
        const resetComponent = ref(0)
        const arrayRadioCheck = ref([
            { id: false, text: "정기신고" },
            { id: true, text: "기한후신고" },
        ]);
        const arrayPaymentType1 = [
            {
                imputedMonth: 1,
                paymentMonth: 2,
                imputedFinishYearMonth: parseInt(globalYear.value + '2'),
                imputedStartYearMonth: parseInt(globalYear.value + '1'),
                paymentFinishYearMonth: parseInt(globalYear.value + '2'),
                paymentStartYearMonth: parseInt(globalYear.value + '1'),
                yearEndTaxAdjustment: true,
                refund: true,
            },
            {
                imputedMonth: 1,
                paymentMonth: 6,
                imputedFinishYearMonth: parseInt(globalYear.value + '6'),
                imputedStartYearMonth: parseInt(globalYear.value + '1'),
                paymentFinishYearMonth: parseInt(globalYear.value + '6'),
                paymentStartYearMonth: parseInt(globalYear.value + '1'),
                yearEndTaxAdjustment: true,
                refund: false,
            },
            {
                imputedMonth: 1,
                paymentMonth: 6,
                imputedFinishYearMonth: parseInt(globalYear.value + '6'),
                imputedStartYearMonth: parseInt(globalYear.value + '3'),
                paymentFinishYearMonth: parseInt(globalYear.value + '6'),
                paymentStartYearMonth: parseInt(globalYear.value + '3'),
                yearEndTaxAdjustment: false,
                refund: false,
            },
            {
                imputedMonth: 7,
                paymentMonth: 12,
                imputedFinishYearMonth: parseInt(globalYear.value + '12'),
                imputedStartYearMonth: parseInt(globalYear.value + '7'),
                paymentFinishYearMonth: parseInt(globalYear.value + '12'),
                paymentStartYearMonth: parseInt(globalYear.value + '7'),
                yearEndTaxAdjustment: false,
                refund: false,
            },
        ];
        const arrayPaymentType2 = [
            {
                imputedMonth: 1,
                paymentMonth: 2,
                imputedFinishYearMonth: null,
                imputedStartYearMonth: parseInt(globalYear.value + '1'),
                paymentFinishYearMonth: null,
                paymentStartYearMonth: parseInt(globalYear.value + '2'),
                yearEndTaxAdjustment: true,
                refund: true,
            },
            {
                imputedMonth: 1,
                paymentMonth: 6,
                imputedFinishYearMonth: parseInt(globalYear.value + '5'),
                imputedStartYearMonth: parseInt(globalYear.value + '1'),
                paymentFinishYearMonth: parseInt(globalYear.value + '6'),
                paymentStartYearMonth: parseInt(globalYear.value + '2'),
                yearEndTaxAdjustment: true,
                refund: false,
            },
            {
                imputedMonth: 1,
                paymentMonth: 6,
                imputedFinishYearMonth: parseInt(globalYear.value + '5'),
                imputedStartYearMonth: parseInt(globalYear.value + '2'),
                paymentFinishYearMonth: parseInt(globalYear.value + '6'),
                paymentStartYearMonth: parseInt(globalYear.value + '3'),
                yearEndTaxAdjustment: false,
                refund: false,
            },
            {
                imputedMonth: 7,
                paymentMonth: 12,
                imputedFinishYearMonth: parseInt(globalYear.value + '12'),
                imputedStartYearMonth: parseInt(globalYear.value + '6'),
                paymentFinishYearMonth: parseInt(globalYear.value + 1 + '1'),
                paymentStartYearMonth: parseInt(globalYear.value + '7'),
                yearEndTaxAdjustment: false,
                refund: false,
            },
        ];
        const afterDeadline = ref(false)
        const focusedRowKey = ref<Number>(1);
        // ===================WATCH==================================
        watch(() => props.dataPopupAdd, (value: any) => {
            loading.value = true;
            dataReports.value = []
            if (value.reportType == 1) {
                let year = globalYear.value
                if (value.paymentType == 1) {
                    for (let i = 1; i <= 12; i++) {
                      if (!value.reportClassCodes.find((item: any) => item == "매당" + i)) {
                            // string concatenation 10th next month of paymentday
                            const subDate = parseInt(
                                                  year.toString() + // year
                                                  ((i + 1) < 10 ? '0' + (i + 1).toString() : (i + 1).toString()) + // month
                                                  '10' // day
                                                ) 
                            dataReports.value.push({
                                reportId: i,
                                imputedYear: year,
                                imputedMonth: i,
                                paymentYear: year,
                                paymentMonth: i,
                                reportClassCode: "매당" + i,
                                ...value,
                                index: 0,
                                status: 10,
                                refund: i == 2 ? true : false,
                                submissionDate: subDate,
                                yearEndTaxAdjustment: i == 2 ? true : false,
                                imputedFinishYearMonth: parseInt(year + `${i}`),
                                imputedStartYearMonth: parseInt(year + `${i}`),
                                paymentFinishYearMonth: parseInt(year + `${i}`),
                                paymentStartYearMonth: parseInt(year + `${i}`),
                            })
                        }
                    }
                } else {
                    for (let i = 0; i <= 12; i++) {
                        if (!value.reportClassCodes.find((item: any) => item == "매익" + i)) {
                            let imputedMonth = i == 0 ? 2 : i
                            let paymentMonth = i == 0 ? 2 : i + 1
                            paymentMonth = paymentMonth == 13 ? 2 : paymentMonth +1
                            // string concatenation 10th next month of paymentday
                            const yearSub = (paymentMonth == 13 ? year + 1 : year).toString();
                            const monthSub = (paymentMonth < 10 ? '0' + (paymentMonth + 1).toString() : (paymentMonth + 1).toString()) 
                            const subDate = parseInt(yearSub+monthSub +'10') 
                          
                            dataReports.value.push({
                                reportId: i,
                                imputedYear: year,
                                imputedMonth: imputedMonth,
                                paymentYear: paymentMonth == 13 ? year + 1 : year,
                                paymentMonth: paymentMonth,
                                reportClassCode: "매익" + i,
                                ...value,
                                index: 0,
                                status: 10,
                                refund: i == 1 ? true : false,
                                submissionDate: subDate, // 10th next month of paymentday
                                yearEndTaxAdjustment: i == 0 ? true : false,
                                imputedFinishYearMonth: i ? parseInt(year + `${i}`) : null,
                                paymentFinishYearMonth: i ? parseInt((paymentMonth == 13 ? year + 1 : year) + `${paymentMonth == 13 ? 1 : paymentMonth}`) : null,
                            })
                        }
                    }
                }
            } else {
                let array = value.paymentType == 1 ? arrayPaymentType1 : arrayPaymentType2
                array.map((data: any, index) => {
                  if (!value.reportClassCodes.find((item: any) => item == (value.paymentType == 1 ? "반당" : "반익") + index)) {
                        // string concatenation 10th next month of paymentday
                        const subDate = parseInt(
                                                  globalYear.value.toString() + // year
                                                  (data.paymentMonth +1).toString() + // month
                                                  '10' // day
                                                ) 
                        dataReports.value.push({
                            reportId: index,
                            imputedYear: globalYear.value,
                            imputedMonth: data.imputedMonth,
                            paymentYear: globalYear.value,
                            paymentMonth: data.paymentMonth,
                            reportClassCode: (value.paymentType == 1 ? "반당" : "반익") + index,
                            ...value,
                            index: 0,
                            status: 10,
                            refund: data.refund,
                            submissionDate: subDate, // 10th next month of paymentday),
                            yearEndTaxAdjustment: data.yearEndTaxAdjustment,
                            imputedFinishYearMonth: data.imputedFinishYearMonth,
                            imputedStartYearMonth: data.imputedStartYearMonth,
                            paymentFinishYearMonth: data.paymentFinishYearMonth,
                            paymentStartYearMonth: data.paymentStartYearMonth,
                        })
                    }
                })
            }
            dataReport.value = dataReports.value.length ? [dataReports.value[0]] : []
            focusedRowKey.value = dataReports.value.length ? dataReports.value[0].reportId : null
            loading.value = false;
        }, { deep: true })

        // ===================FUNCTION===============================
        const onSubmit = (e: any) => {
            resetComponent.value++;
            dataReport.value[0].afterDeadline = afterDeadline.value
            reportGridStatus.value = true
        };
        const setModalVisible = () => {
            emit("closePopup", false)
        };

        const closeAllPopupAdd = () => {
          reportGridStatus.value = false
          setModalVisible()
        }
        const onSelectionChanged = (data: any) => {
            dataReport.value = [data.data]
        };
        return {
            globalYear, move_column, colomn_resize, dayjs,
            onSelectionChanged,
            getReportType,
            dataReports, dataReport,
            loading,
            onSubmit,
            setModalVisible,
            reportGridStatus,
            arrayRadioCheck, afterDeadline,
            focusedRowKey,resetComponent, showTooltipYearMonth,closeAllPopupAdd
        };
    },
});
</script>
<style lang="scss" scoped src="../style/stylePopup.scss">
::v-deep ul.ant-cascader-menu {
    height: auto;
    max-height: 180px;
}

::v-deep .ant-form-item-control-input {
    align-items: flex-end !important;
}
</style>
