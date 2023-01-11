<template>
    <a-spin :spinning="loading" size="large">
        <action-header title="" @actionSearch="searching" />
        <div id="pa-230">
            <div class="search-form">
                <a-row>
                    <a-col :span="12">
                        <a-row :gutter="[24, 8]">
                            <a-col>
                                <div class="dflex custom-flex">
                                    <label class="lable-item">구분 :</label>
                                    <radio-group :arrayValue="radioCheckDataSearch" v-model:valueRadioCheck="testValue1"
                                        :layoutCustom="'horizontal'" style="margin: 6px 20px 0px 0px" />
                                </div>
                            </a-col>
                            <a-col>
                                <div class="dflex custom-flex global-year">
                                    <label class="lable-item">귀속연도 :</label>
                                    <a-tag color="#a3a2a0">귀 {{ globalYear }}</a-tag>
                                </div>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="12">
                        <div class="d-flex-center" style="justify-content: flex-end;">
                            <img src="@/assets/images/email.svg" alt="" height="30" class="mail-230"
                                @click="sendMail('mail')" />
                            <img src="@/assets/images/print.svg" alt="" height="28" class="group-mail-230 ml-5"
                                @click="sendMail('groupMail')" />
                        </div>
                    </a-col>
                </a-row>
            </div>
            <div class="page-content">
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="휴대폰" class="red">
                            <div class="format-settings-text">
                                <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
                                <span class="style-note">본 설정으로 적용된 서식으로 출력 및
                                    메일발송 됩니다.</span>
                            </div>
                        </a-form-item>
                        <div class="tax-select">
                            <radio-group :arrayValue="radioCheckData" v-model:valueRadioCheck="testValue2" />
                        </div>
                    </a-col>
                    <a-col :span="12">
                        <div class="created-date">
                            <label class="lable-item">구분 :</label>
                            <date-time-box width="150px"></date-time-box>
                        </div>
                    </a-col>
                </a-row>

                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" key-expr="employeeId" @exporting="onExporting"
                    :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                    :column-auto-width="true">
                    <DxSelection mode="multiple" :fixed="true" />
                    <DxColumn caption="성명" cell-template="employee-info" width="300" />
                    <template #employee-info="{ data }">
                        <employee-info :idEmployee="data.data.employeeId" :name="data.data.employee.name"
                            :idCardNumber="data.data.employee.residentId" :status="data.data.employee.status"
                            :foreigner="data.data.employee.foreigner" :checkStatus="false"
                            :employeeId="data.data.employeeId" />
                    </template>
                    <DxColumn caption="주민등록번호" data-field="employee.residentId" />
                    <DxColumn caption="비고" cell-template="four-major-insurance" width="300" />
                    <template #four-major-insurance="{ data }">
                        <div>
                            <four-major-insurance v-if="data.data.employee.nationalPensionDeduction" :typeTag="1"
                                :typeValue="1" />
                            <four-major-insurance v-if="data.data.employee.healthInsuranceDeduction" :typeTag="2"
                                :typeValue="1" />
                            <four-major-insurance v-if="data.data.employee.employeementInsuranceDeduction" :typeTag="4"
                                :typeValue="1" />
                            <four-major-insurance v-if="data.data.employee.nationalPensionSupportPercent" :typeTag="6"
                                :ratio="data.data.nationalPensionSupportPercent" />
                            <four-major-insurance v-if="data.data.employee.employeementInsuranceSupportPercent"
                                :typeTag="7" :ratio="data.data.employeementInsuranceSupportPercent" />
                            <four-major-insurance v-if="data.data.employee.employeementReductionRatePercent"
                                :typeTag="8" :ratio="data.data.employee.employeementReductionRatePercent" />
                            <four-major-insurance v-if="data.data.employee.incomeTaxMagnification" :typeTag="10"
                                :ratio="data.data.employee.incomeTaxMagnification" />
                        </div>
                    </template>

                    <DxColumn caption="구분" cell-template="status" />
                    <template #status="{ data }">
                        <span class="status-red" v-if="data.data.status != 0">중도</span>
                        <span class="status-blue" v-else>중도</span>
                    </template>

                    <DxColumn caption="총급여계" data-field="totalPay" format="#,###" data-type="string" />

                    <DxColumn caption="" cell-template="pupop" width="100" />
                    <template #pupop="{ data }">
                        <div class="custom-action" style="text-align: center;">
                            <img src="@/assets/images/email.svg" alt=""
                                style="width: 25px; margin-right: 3px; cursor: pointer;" />
                            <img src="@/assets/images/print.svg" alt="" style="width: 25px;cursor: pointer" />
                        </div>
                    </template>
                </DxDataGrid>
            </div>
        </div>
    </a-spin>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue";
import { useStore } from "vuex";
import { useQuery } from "@vue/apollo-composable";
import { radioCheckDataSearch, radioCheckData } from "./utils/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxItem } from "devextreme-vue/data-grid";
import { companyId, onExportingCommon, } from "@/helpers/commonFunction";
import queries from "@/graphql/queries/PA/PA2/PA230/index";

export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSelection, DxExport, DxSearchPanel, DxToolbar, DxItem,
    },
    setup() {
        const testValue1 = ref(1);
        const testValue2 = ref(1);
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear);
        const trigger = ref<boolean>(true);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const dataSource = ref([]);
        const originData = ref({
            companyId: companyId,
            filter: {
                "imputedYear": globalYear,
                "leaved": true
            },
        });
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.searchIncomeWageWithholdingTaxByEmployees, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        const onExporting = (e: { component: any; cancel: boolean }) => {
            onExportingCommon(e.component, e.cancel, "계약정보관리&심사")
        };
        watch(result, (value) => {
            if (value) {
                console.log(value.searchIncomeWageWithholdingTaxByEmployees)

                dataSource.value = value.searchIncomeWageWithholdingTaxByEmployees
                trigger.value = false;
            }
        });

        const searching = () => {
            trigger.value = true;
            refetchData();
        };

        const sendMail = (sendType: string) => {
            alert(sendType);
        }
        return {
            loading, globalYear, dataSource, move_column, colomn_resize, radioCheckDataSearch, radioCheckData, testValue1, testValue2,
            searching, sendMail, onExporting,
        };
    },
});
</script>
<style lang="scss" scoped src="./style/style.scss" >

</style>
