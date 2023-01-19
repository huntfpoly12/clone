<template>
    <a-spin :spinning="loading || loadingPrint || loadingSendEmail" size="large">
        <action-header title="" @actionSearch="searching" />
        <div id="pa-230">
            <div class="search-form">
                <a-row>
                    <a-col :span="12">
                        <a-row :gutter="[24, 8]">
                            <a-col>
                                <div class="d-flex-center">
                                    <label class="lable-item">구분 :</label>
                                    <radio-group :arrayValue="radioCheckDataSearch"
                                        v-model:valueRadioCheck="checkBoxOption" layoutCustom="horizontal"
                                        class="mt-7" />
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
                    <a-col :span="12" style="text-align: right;">
                        <img src="@/assets/images/emailGroup.png" alt="" height="30" class="mail-230"
                            @click="sendMail" />
                        <img src="@/assets/images/printGroup.png" alt="" height="30" class="mail-230"
                            @click="printFunc" />
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
                            <radio-group :arrayValue="radioCheckData" v-model:valueRadioCheck="checkBoxOption2" />
                        </div>
                    </a-col>
                    <a-col :span="12">
                        <div class="created-date">
                            <label class="lable-item">구분 :</label>
                            <date-time-box v-model:valueDate="createDate" width="150px" />
                        </div>
                    </a-col>
                </a-row>
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" key-expr="employeeId" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true"
                    @selection-changed="selectionChanged">
                    <DxScrolling mode="standard" show-scrollbar="always"/>
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
                                style="width: 25px; margin-right: 3px; cursor: pointer;"
                                @click="sendMail(data.data.employee)" />
                            <img src="@/assets/images/printGroup.png" alt="" style="width: 25px;cursor: pointer"
                                @click="printFunc(data.data.employeeId)" />
                        </div>
                    </template>
                </DxDataGrid>
            </div>
        </div>
    </a-spin>
    <a-modal :visible="modalSendMail" @cancel="modalSendMail = false" width="562px" footer="" :mask-closable="false">
        <standard-form>
            <div class="d-flex-center mt-20" v-if="switchTypeSendMail == true">
                <img src="@/assets/images/email.svg" alt="" style="width: 50px;">
                <mail-text-box :required="true" width="200px" class="ml-5" v-model:valueInput="emailAddress"
                    placeholder="abc@example.com" />
                <span class="ml-5">로 메일을 발송하시겠습니까?</span>
            </div>
            <div v-else>
                <img src="@/assets/images/emailGroup.png" alt="" style="width: 50px;">
                <div class="ml-40 mt-10">개별 메일이 발송되며, 개별 메일이 등록되지 않은 경우에 한해서</div>
                <div class="ml-40 d-flex-center">
                    <mail-text-box :required="true" width="200px" class="ml-5" v-model:valueInput="emailAddress"
                        placeholder="abc@example.com" />
                    <span class="ml-5">로 메일을 발송하시겠습니까?</span>
                </div>
            </div>
            <a-row style="margin-top: 50px;">
                <a-col :span="16" :offset="8">
                    <button-basic text="아니요" type="default" mode="outlined" :width="100" style="margin-right: 10px;"
                        @onClick="modalSendMail = false" />
                    <button-basic text="네. 발송합니다" type="default" mode="contained" :width="150"
                        @onClick="confirmSendMail" />
                </a-col>
            </a-row>
        </standard-form>
    </a-modal>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue";
import { useStore } from "vuex";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { radioCheckDataSearch, radioCheckData } from "./utils/index";
import { DxDataGrid, DxColumn,DxScrolling, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxItem } from "devextreme-vue/data-grid";
import { companyId, userId } from "@/helpers/commonFunction";
import queries from "@/graphql/queries/PA/PA2/PA230/index";
import dayjs from "dayjs";
import filters from "@/helpers/filters";
import mutations from "@/graphql/mutations/PA/PA2/PA230/index";
import notification from "@/utils/notification";
import queriesGetUser from "@/graphql/queries/BF/BF2/BF210/index";
export default defineComponent({
    components: {
        DxDataGrid, DxColumn,DxScrolling, DxPaging, DxSelection, DxExport, DxSearchPanel, DxToolbar, DxItem,
    },
    setup() {
        const globalYear = computed(() => store.state.settings.globalYear);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const checkBoxOption = ref(1);
        const checkBoxOption2 = ref(1);
        const store = useStore();
        const trigger = ref<boolean>(true);
        const modalSendMail = ref<boolean>(false);
        const triggerPrint = ref<boolean>(false);
        const dataSource: any = ref([]);
        const originData: any = ref({
            companyId: companyId,
            filter: {
                "imputedYear": globalYear,
                "leaved": null
            },
        });

        let createDate = ref(filters.formatDateToInterger(dayjs().format("YYYYMMDD")))
        let emailAddress = ref()
        let dataSendEmail: any = ref({
            "companyId": companyId,
            "input": {
                "imputedYear": globalYear.value,
                "printOption": checkBoxOption2.value,
                "createDate": createDate.value
            },
            "employeeInputs": []
        })
        let selectedItemKeys: any = ref([])
        let dataPrint: any = ref({
            "companyId": companyId,
            "input": {
                "imputedYear": globalYear.value,
                "printOption": checkBoxOption2.value,
                "createDate": createDate.value
            },
            "employeeIds": []
        })
        // =========================== GRAPHQL =======================================
        const {
            refetch: refetchPrint,
            onResult: onResultPrint,
            loading: loadingPrint,
        } = useQuery(queries.getIncomeWageWithholdingTaxByEmployeeReportViewUrl, dataPrint, () => ({
            enabled: triggerPrint.value,
            fetchPolicy: "no-cache",
        }));
        onResultPrint((res) => {
            window.open(res.data?.getIncomeWageWithholdingTaxByEmployeeReportViewUrl)
        })
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.searchIncomeWageWithholdingTaxByEmployees, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        watch(result, (value) => {
            if (value) {
                dataSource.value = value.searchIncomeWageWithholdingTaxByEmployees
                trigger.value = false;
            }
        });
        // QUERY NAME : getUser
        const {
            onResult: onResultUserInf
        } = useQuery(queriesGetUser.getUser, { id: userId }, () => ({
            fetchPolicy: "no-cache",
        }));
        onResultUserInf(e => {
            emailAddress.value = e.data.getUser.email
        })
        const { mutate: callSendEmail, onDone, onError, loading: loadingSendEmail } = useMutation(
            mutations.sendIncomeWageWithholdingTaxByEmployeeReportEmail
        );
        onDone(() => {
            notification('success', `업데이트 완료!`)
        })
        onError(e => {
            notification('error', e.message)
        })
        // ============================== FUNCTION =====================================
        const searching = () => {
            trigger.value = true;
            if (checkBoxOption.value == 1)
                originData.value.filter.leaved = null
            if (checkBoxOption.value == 2)
                originData.value.filter.leaved = true
            if (checkBoxOption.value == 3)
                originData.value.filter.leaved = false

            if (originData.value.companyId)
                refetchData();
        };
        const switchTypeSendMail = ref(true) //If true:send one person. false: send many people.
        const sendMail = (e: any) => {
            // If the retention style is number, send an email to one person. If it's an object type, send a group. 
            dataSendEmail.value.companyId = companyId
            dataSendEmail.value.input = {
                "imputedYear": globalYear.value,
                "printOption": checkBoxOption2.value,
                "createDate": createDate.value
            }
            if (e.employeeId) {
                emailAddress.value = e.email
                dataSendEmail.value.employeeInputs = [
                    {
                        "receiverName": e.name,
                        "receiverAddress": e.email,
                        "senderName": sessionStorage.getItem("username"),
                        "employeeId": e.employeeId
                    }
                ]
                switchTypeSendMail.value = true
            } else {
                switchTypeSendMail.value = false
                if (selectedItemKeys.value.length == 0) {
                    notification('error', "항목을 1개 이상 선택해야합니다")
                    return;
                } else {
                    selectedItemKeys.value.map((val: any) => {
                        let dataChecked = dataSource.value.filter((data: any) => data.employeeId === val)[0]
                        dataSendEmail.value.employeeInputs = [
                            {
                                "receiverName": dataChecked.employee.name,
                                "receiverAddress": dataChecked.employee.email,
                                "senderName": sessionStorage.getItem("username"),
                                "employeeId": dataChecked.employeeId
                            }
                        ]
                    })
                }
            }
            modalSendMail.value = true
        }
        const printFunc = (val: any) => {
            triggerPrint.value = true
            dataPrint.value = {
                "input": {
                    "imputedYear": globalYear.value,
                    "printOption": checkBoxOption2.value,
                    "createDate": createDate.value
                },
                "employeeIds": []
            }

            // Print single row
            if (typeof val == "number") {
                dataPrint.value.employeeIds = [val]
                if (dataPrint.value)
                    refetchPrint()
            } else { // Print multi row
                if (selectedItemKeys.value.length == 0) {
                    notification('error', "항목을 1개 이상 선택해야합니다")
                    return;
                } else
                    dataPrint.value.employeeIds = selectedItemKeys.value

                if (dataPrint.value)
                    refetchPrint()
            }
        }
        const confirmSendMail = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                if (switchTypeSendMail.value == true) {
                    dataSendEmail.value.employeeInputs[0].receiverAddress = emailAddress.value
                } else {
                    dataSendEmail.value.employeeInputs.map((val: any) => {
                        if (!val.receiverAddress) {
                            val.receiverAddress = emailAddress.value
                        }
                    })
                }
                callSendEmail(dataSendEmail.value)
                modalSendMail.value = false
            }
        }
        const selectionChanged = (data: any) => {
            selectedItemKeys.value = data.selectedRowKeys
        }
        return {
            loadingSendEmail, switchTypeSendMail, emailAddress, modalSendMail, loadingPrint, createDate, loading, globalYear, dataSource, move_column, colomn_resize, radioCheckDataSearch, radioCheckData, checkBoxOption, checkBoxOption2,
            selectionChanged, confirmSendMail, searching, sendMail, printFunc
        };
    },
});
</script>
<style lang="scss" scoped src="./style/style.scss" >

</style>
