<template>
    <action-header title="일용직근로소득원천징수영수증" @actionSearch="onSearch" />
    <div id="pa-220">
        <div class="search-form">
            <a-row :gutter="[24, 8]">
                <a-col :span="3">
                    <label class="lable-item">귀속연도 :</label>
                    <a-tag color="#a3a2a0">귀 {{ globalYear }}</a-tag>
                </a-col>
                <a-col :span="21">
                    <div class="selectRatio">
                        <strong class="lable-item">구분 :</strong>
                        <radio-group :arrayValue="arrayRadioDivision"
                            v-model:valueRadioCheck="searchParam.filter.leaved" :layoutCustom="'horizontal'"
                            valueExpr="value" />
                    </div>
                </a-col>
            </a-row>
        </div>
        <div class="page-content">
            <div class="title-body" style="padding-top: 7px">
                <a-row>
                    <a-col :span="12">
                        <div class="title-body-left-1">
                            <div stlyle="font-size: 12px">
                                서식 설정 :
                            </div>
                            <div>
                                <img src="@/assets/images/iconInfo.png" alt="">
                            </div>
                            <span class="style-note">
                                본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다.
                            </span>
                        </div>
                        <div class="title-body-left-2">
                            <radio-group :arrayValue="arrayRadioType" v-model:valueRadioCheck="viewUrlParam.input.type"
                                :layoutCustom="'vetical'" valueExpr="id" />
                        </div>
                    </a-col>
                    <a-col :span="12">
                        {{  viewUrlParam.input.receiptDate  }}
                        <div class="title-body-right">
                            <date-time-box width="160px" v-model:valueDate="viewUrlParam.input.receiptDate"
                                dateFormat="YYYY-MM-DD" />
                        </div>
                    </a-col>
                </a-row>
            </div>
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                key-expr="employeeId" @exporting="onExporting" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" @selection-changed="selectionChanged" :column-auto-width="true">
                <DxScrolling column-rendering-mode="virtual" />
                <DxToolbar>
                    <DxItem template="pagination-send-group-mail" />
                    <DxItem template="send-group-print" />
                </DxToolbar>
                <template #pagination-send-group-mail>
                    <div class="custom-mail-group">
                        <DxButton><img src="@/assets/images/emailGroup.png" alt="" style="width: 33px;"
                                @click="sendMailGroup" />
                        </DxButton>
                    </div>
                </template>
                <template #send-group-print>
                        <div class="custom-mail-group">
                            <DxButton @click="onPrintGroup">
                                <img src="@/assets/images/printGroup.png" alt=""
                                    style="width: 35px; margin-right: 3px; cursor: pointer" />
                            </DxButton>
                        </div>
                    </template>
                <DxSelection mode="multiple" />
                <DxColumn caption="성명" cell-template="tag" width="300px" />
                <template #tag="{ data }" class="custom-action">
                    <div class="custom-action">
                        <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                            :idCardNumber="data.data.residentId" :status="data.data.status"
                            :foreigner="data.data.foreigner" :checkStatus="false" />
                    </div>
                </template>
                <DxColumn caption="주민등록번호" data-field="residentId" width="150px" />
                <DxColumn caption="비고" cell-template="four-major" />
                <template #four-major="{ data }" class="custom-action">
                    <div>
                        <four-major-insurance :typeTag="1" :typeValue="1" />
                    </div>
                </template>
                <DxColumn caption="구분" />
                <DxColumn caption="총급여액" />
                <DxColumn caption="비과세금액" />
                <DxColumn caption="결정세액" />
                <DxColumn caption="기납부세액 (현)" />
                <DxColumn caption="기납부세액 (전)" />
                <DxColumn caption="납부특례세액" />
                <DxColumn caption="차감징수세액" />
                <DxColumn :width="80" cell-template="pupop" />
                <template #pupop="{ data }" class="custom-action">
                    <div class="custom-action" style="text-align: center;">
                        <img @click="onOpenPopupEmailSingle(data.data)" src="@/assets/images/email.svg" alt=""
                            style="width: 25px; margin-right: 3px;" />
                        <img @click="actionPrint(data.data)" src="@/assets/images/print.svg" alt=""
                            style="width: 25px;" />
                    </div>
                </template>
            </DxDataGrid>
            <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="modalEmailSingle = false"
                :data="popupDataEmailSingle" />
            <EmailMultiPopup :modalStatus="modalEmailMulti" @closePopup="modalEmailMulti = false"
                :data="popupDataEmailMulti" :emailUserLogin="emailUserLogin" />
            <!-- <PopupMessage :modalStatus="popupMailGroup" @closePopup="popupMailGroup = false" :typeModal="'warning'"
                :title="'Warning'" :content="'항목을 1개 이상 선택해야합니다'" /> -->
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, reactive, watch } from "vue";
import { useStore } from 'vuex';
import notification from "@/utils/notification";
import dayjs, { Dayjs } from 'dayjs';
import { useQuery } from "@vue/apollo-composable";
import queriesGetUser from "@/graphql/queries/BF/BF2/BF210/index";
import { DxDataGrid, DxColumn, DxSelection, DxToolbar, DxScrolling, DxItem } from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { radioLeaved, radioType } from "./utils/index"
import {
    companyId,
    onExportingCommon,
    userId,
} from "@/helpers/commonFunction";
import queries from "@/graphql/queries/PA/PA2/PA220/index";
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxSelection, DxScrolling, DxToolbar, DxItem, DxButton,
    },
    setup() {
        const globalYear = computed(() => store.state.settings.globalYear);
        const arrayRadioDivision = ref([...radioLeaved])
        const arrayRadioType = ref([...radioType])
        const formSearch = ref({
            division: 1,
            type: 1,
            receiptDate: parseInt(dayjs().format('YYYYMMDD')),
        })

        const popupDataEmailSingle = ref({})
        const popupDataEmailMulti = ref({})

        const modalEmailSingle = ref(false)
        const modalEmailMulti = ref(false)

        const dataSource: any = ref([]);
        const dataSelect = ref<any>([]);
        const incomeIds = ref<any>([])
        const store = useStore();

        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);

        // QUERY NAME : getUser
        const emailUserLogin = ref()
        const {
            onResult: onResultUserInf
        } = useQuery(queriesGetUser.getUser, { id: userId }, () => ({
            fetchPolicy: "no-cache",
        }));
        onResultUserInf(e => {
            emailUserLogin.value = e.data.getUser.email
        })

        const onExporting = (e: any) => {
            onExportingCommon(e.component, e.cancel, '영업자관리')
        };

        // const onCloseEmailSingleModal = () => {
        //     modalEmailSingle.value = false
        // }
        // const onCloseEmailMultiModal = () => {
        //     modalEmailMulti.value = false
        // }

        // Search
        const searchData = ref([]);
        const searchParam = reactive({
            companyId: companyId,
            filter: { imputedYear: globalYear.value, leaved: null, name: null }
        })
        const searchTrigger = ref<boolean>(true)
        const {
            refetch: refetchSearch,
            result: resultSearch,
            loading: loadingSearch,
        } = useQuery(queries.searchIncomeWageWithholdingReceipts, searchParam, () => ({
            enabled: searchTrigger.value,
            fetchPolicy: "no-cache",
        }));

        watch(resultSearch, (newData) => {
            searchTrigger.value = false;
            searchData.value = newData.searchIncomeWageWithholdingReceipts;
            viewUrlParam.input.type = newData.searchIncomeWageWithholdingReceipts?.employee?.type ?? 1;
            searchParam.filter.leaved = newData.searchIncomeWageWithholdingReceipts?.leaved ?? null;
        })
        const onSearch = () => {
            searchTrigger.value = true;
            refetchSearch()
        }

        // PRINT VIEW URL
        const viewUrlParam: any = reactive({
            companyId: companyId,
            input: { imputedYear: globalYear.value, type: 1, receiptDate: parseInt(dayjs().format('YYYYMMDD')) },
            incomeIds: [],
        })
        const printTrigger = ref<boolean>(false);
        const {
            refetch: refetchPrint,
            result: resultPrint,
        } = useQuery(queries.getIncomeWageWithholdingReceiptReportViewUrl, viewUrlParam, () => ({
            enabled: printTrigger.value,
            fetchPolicy: "no-cache",
        }));
        watch(resultPrint, (value) => {
            if (value) {
                window.open(value.getIncomeBusinessWithholdingReceiptReportViewUrl)
            }
        });
        //SEND MAIL GROUP
        const sendMailGroupParam = reactive({
            companyId: companyId,
            input: { imputedYear: globalYear, type: viewUrlParam.input.type, receiptDate: viewUrlParam.input.receiptDate },
            incomeInputs: [
                {
                    receiverName: "",
                    receiverAddress: "",
                    senderName: "",
                    incomeId: NaN,
                },
            ]
        });
        const selectionChanged = (data: any) => {
            dataSelect.value = []
            incomeIds.value = []
            data.selectedRowKeys.forEach((data: any) => {
                dataSelect.value.push({
                    senderName: sessionStorage.getItem("username") ?? "",
                    receiverName: data.employee.name,
                    receiverAddress: data.employee.email,
                    incomeId: data.incomeId
                })
                incomeIds.value.push(data.incomeId)
            })
        }
        const actionPrint = (data: any) => {
            viewUrlParam.incomeIds = [data.incomeId]
            printTrigger.value = true
        }
        //SEND MAIL SINGLE
        const onOpenPopupEmailSingle = (data: any) => {
            popupDataEmailSingle.value = {
                companyId: companyId,
                input: {
                    imputedYear: globalYear,
                    type: viewUrlParam.input.type,
                    receiptDate: viewUrlParam.input.receiptDate,
                },
                employeeInputs: {
                    senderName: sessionStorage.getItem("username"),
                    receiverName: data.employee.name,
                    receiverAddress: data.employee.email,
                    employeeId: data.employee.employeeId,
                    incomeTypeCode: data.employee.incomeTypeCode
                }
            }
            modalEmailSingle.value = true
        }
        const sendMailGroup = () => {
            if (dataSelect.value.length) {
                popupDataEmailMulti.value = sendMailGroupParam;
                modalEmailMulti.value = true
            } else {
                notification('error', '항목을 최소 하나 이상 선택해야합니다')
            }
        }
        const onPrintGroup = () => {
            if (incomeIds.value.length) {
                viewUrlParam.incomeIds = incomeIds.value
                printTrigger.value = true;
            } else {
                notification('error', '항목을 최소 하나 이상 선택해야합니다')
            }
        };
        return {
            arrayRadioDivision,
            arrayRadioType,
            formSearch,
            dataSource,
            per_page, move_column, colomn_resize,
            globalYear,
            selectionChanged,
            popupDataEmailSingle,
            popupDataEmailMulti,
            modalEmailSingle,
            modalEmailMulti,
            // onCloseEmailSingleModal,
            // onCloseEmailMultiModal,
            onOpenPopupEmailSingle,
            sendMailGroup,
            emailUserLogin,
            onExporting,
            searchData,
            viewUrlParam,
            actionPrint,
            onPrintGroup,
            searchParam,
            onSearch,
        };
    },
});
</script>  
<style scoped lang="scss" src="./style/style.scss">

</style>
