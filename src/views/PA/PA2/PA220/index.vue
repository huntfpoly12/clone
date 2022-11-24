<template>
    <action-header title="일용직근로소득원천징수영수증" @actionSearch="searching" />
    <div id="pa-220">
        <div class="search-form">
            <a-row :gutter="[24, 8]">
                <a-col :span="3">
                    <label class="lable-item">귀속연도 :</label>
                    <a-tag color="#a3a2a0">귀 {{ globalYear }}</a-tag>
                </a-col>
                <a-col :span="21">
                    <div class="custom-flex">
                        <label class="lable-item">구분:</label>
                        <radio-group style="height: 20px" :arrayValue="arrayRadioDivision" v-model:valueRadioCheck="formSearch.division"
                            :layoutCustom="'horizontal'" />
                    </div>
                </a-col>
            </a-row>
        </div>
        <div class="page-content">
            <div class="title-body">
                <a-row>
                    <a-col :span="12">
                        <div class="title-body-left-1">
                            <div>
                                서식 설정 :
                            </div>
                            <div>
                                <img src="../../../../assets/images/iconInfo.png" alt="">
                            </div>
                            <span>
                                본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다.
                            </span>
                        </div>
                        <div class="title-body-left-2">
                            <radio-group :arrayValue="arrayRadioKeeping" v-model:valueRadioCheck="formSearch.keeping"
                                :layoutCustom="'horizontal'" />
                        </div>
                    </a-col>
                    <a-col :span="12">
                        <div class="title-body-right">
                            <date-time-box width="160px" v-model:valueDate="formSearch.receiptDate"
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
                </DxToolbar>
                <template #pagination-send-group-mail>
                    <div class="custom-mail-group">
                        <DxButton><img src="../../../../assets/images/emailGroup.png" alt="" style="width: 33px;"
                                @click="sendMailGroup" />
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
                        <img @click="actionOpenPopupEmailSingle(data.data)" src="../../../../assets/images/email.svg"
                            alt="" style="width: 25px; margin-right: 3px;" />
                        <img src="../../../../assets/images/print.svg" alt="" style="width: 25px;" />
                    </div>
                </template>
            </DxDataGrid>
            <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="onCloseEmailSingleModal"
                :data="popupDataEmailSingle" />
            <EmailMultiPopup :modalStatus="modalEmailMulti" @closePopup="onCloseEmailMultiModal"
                :data="popupDataEmailMulti" :emailUserLogin="emailUserLogin" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery } from "@vue/apollo-composable";
import notification from "../../../../utils/notification";
import queriesGetUser from "../../../../graphql/queries/BF/BF2/BF210/index";
import { DxDataGrid, DxColumn, DxSelection, DxToolbar, DxScrolling, DxItem } from "devextreme-vue/data-grid";
import { onExportingCommon } from "../../../../helpers/commonFunction"
import DxButton from "devextreme-vue/button";
import { companyId, userId } from "../../../../../src/helpers/commonFunction";
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxSelection, DxScrolling, DxToolbar, DxItem, DxButton,
    },
    setup() {
        const arrayRadioDivision = ref([
            { id: 1, text: "전체" },
            { id: 2, text: "계속" },
            { id: 3, text: "중도" },
        ])
        const arrayRadioKeeping = ref([
            { id: 1, text: "소득자보관용" },
            { id: 2, text: "소득자보관용" },
            { id: 3, text: "발행자보관용" },
            { id: 4, text: "발행자보고용" },
        ])
        const formSearch = ref({
            division: 1,
            keeping: 1,
            receiptDate: new Date().toJSON().slice(0, 10),
        })

        const emailUserLogin = ref()

        const popupDataEmailSingle = ref({})
        const popupDataEmailMulti = ref({})

        const modalEmailSingle = ref(false)
        const modalEmailMulti = ref(false)

        const actionOpenPopupEmailSingle = (data: any) => {
            // popupDataEmailSingle.value = {
            //     companyId: companyId,
            //     input: {
            //         imputedYear: globalYear,
            //         type: valueDefaultIncomeBusiness.value.input.type,
            //         receiptDate: valueDefaultIncomeBusiness.value.input.receiptDate,
            //     },
            //     employeeInputs: {
            //         senderName: sessionStorage.getItem("username"),
            //         receiverName: data.employee.name,
            //         receiverAddress: data.employee.email,
            //         employeeId: data.employee.employeeId,
            //         incomeTypeCode: data.employee.incomeTypeCode
            //     }
            // }
            // modalEmailSingle.value = true
        }


        const valueSwitchChange = ref(true)
        const dataSource: any = ref([]);
        const store = useStore();

        const globalYear: any = computed(() => store.state.settings.globalYear);
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);

        // QUERY NAME : getUser
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

        const onCloseEmailSingleModal = () => {
            modalEmailSingle.value = false
        }
        const onCloseEmailMultiModal = () => {
            modalEmailMulti.value = false
        }

        const searching = () => {
            // dataApiSearch.filter.paymentYearMonths = getArrPaymentYearMonth()
            // refetchData()
        };
        
        const sendMailGroup = () => {
            // if (selectedItemKeys.value.length > 0) {
            //     actionSendEmailGroup.value = true
            //     let dataCall: any = []
            //     dataDemoUltil.employee.map((val: any) => {
            //         if (check(val) == 1) {
            //             dataCall.push({
            //                 senderName: sessionStorage.getItem("username"),
            //                 receiverName: val.name,
            //                 receiverAddress: val.email,
            //                 employeeId: val.employeeId,
            //             })
            //         }
            //     })
            //     dataCallModal.value = dataCall
            //     paymentYearMonthsModal.value = getArrPaymentYearMonth()
            //     modalStatus.value = true
            // } else {
            //     notification('error', "일용직근로자들을 선택하세요!")
            // }
        }

        const selectionChanged = (data: any) => {
            // selectedItemKeys.value = data.selectedRowKeys
        }

        return {
            arrayRadioDivision,
            arrayRadioKeeping,
            formSearch,
            valueSwitchChange,
            dataSource,
            per_page, move_column, colomn_resize,
            globalYear,
            selectionChanged,
            popupDataEmailSingle,
            popupDataEmailMulti,
            modalEmailSingle,
            modalEmailMulti,
            onCloseEmailSingleModal,
            onCloseEmailMultiModal,
            actionOpenPopupEmailSingle,
            sendMailGroup,
            emailUserLogin,
            onExporting,
            searching,
        };
    },
});
</script>  
<style scoped lang="scss" src="./style/style.scss">

</style>
