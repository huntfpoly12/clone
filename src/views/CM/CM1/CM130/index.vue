<template>
    <div id="cm-130" class="cm-130" style="padding: 24px;">
        <a-spin tip="Loading..." :spinning="loading || loadingWithholdingConfig">
            <a-tabs v-model:activeKey="activeKey" type="card">
                <template #rightExtra>
                    <div class="list-action">
                        <div v-if="activeKey == '1'">
                            <a-tooltip>
                                <template #title>저장</template>
                                <a-button @click="onSubmitConfig">
                                    <SaveOutlined />
                                </a-button>
                            </a-tooltip>
                        </div>
                        <div v-if="activeKey == '2'">
                            <div class="btn-action">
                                <a-tooltip>
                                    <template #title>삭제</template>
                                    <a-button>
                                        <SearchOutlined />
                                    </a-button>
                                </a-tooltip>
                                <a-tooltip>
                                    <template #title>삭제</template>
                                    <a-button>
                                        <DeleteOutlined />
                                    </a-button>
                                </a-tooltip>
                                <a-tooltip>
                                    <template #title>출력</template>
                                    <a-button>
                                        <PrinterOutlined />
                                    </a-button>
                                </a-tooltip>
                            </div>
                        </div>
                    </div>
                </template>
                <a-tab-pane key="1" tab="기본">
                    <a-row>
                        <a-col :span="24">
                            <div class="container">
                                <a-form :model="formState" :label-col="labelCol">
                                    <h2 style="font-weight: 600; color: gray" class="title-h2">
                                        급여기본설정
                                    </h2>
                                    <a-row>
                                        <a-col :span="12">
                                            <a-form-item label="급여신고주기">
                                                <a-space direction="vertical">
                                                    <a-radio-group v-model:value="formState.reportType">
                                                        <a-radio :value="1">매월</a-radio>
                                                        <a-radio :value="6">반기</a-radio>
                                                    </a-radio-group>
                                                </a-space>
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col :span="12">
                                            <a-form-item label="급여지급형태">
                                                <a-space direction="vertical">
                                                    <a-radio-group v-model:value="formState.paymentType">
                                                        <a-radio :value="1">당월지급</a-radio>
                                                        <a-radio :value="2">익월지급</a-radio>
                                                    </a-radio-group>
                                                </a-space>
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col :span="16">
                                            <a-form-item label="급여지급일자">
                                                <div style="display: flex; align-items: center">
                                                    <DxNumberBox v-model:value="formState.paymentDay" :min="0" :max="30"
                                                        :show-spin-buttons="true" :width="150" />
                                                    <span style="margin-left: 5px">일, ( 말일은 ‘0’을 선택하세요)</span>
                                                </div>
                                                <div style=" display: flex; margin-top: 10px; align-items: center; ">
                                                    <info-circle-outlined />
                                                    <span style="margin-left: 5px">
                                                        급여지급일자는 선택사항으로 지정시 급여명세서 등에
                                                        해당 급여일자가 입력되며, 수정 가능합니다.
                                                    </span>
                                                </div>
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col :span="12">
                                            <a-form-item>
                                                <div style="margin-left: 50px">
                                                    <span>두루누리 적용 여부 (사업자):</span>
                                                    <a-switch v-model:checked="formState.insuranceSupport"
                                                        checked-children="적용" un-checked-children="미적용"
                                                        style="width: 80px; margin-left: 8px" />
                                                </div>
                                                <div style="margin-left: 150px; margin-top: 10px">
                                                    <info-circle-outlined />
                                                    <span style="margin-left: 5px">
                                                        사업자 두루누리 미적용시 해당 사원이 두루누리
                                                        적용이더라도 급여계산에 반영되지 않습니다.
                                                    </span>
                                                </div>
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <h2 style="font-weight: 600; color: gray" class="title-h2">
                                        관할세무서, 지방소득세 납세지 설정
                                    </h2>
                                    <a-row :gutter="24">
                                        <a-col>
                                            <a-form-item label="사업장주소">
                                                <a-input disabled style="width: 574px; margin-right: 10px"
                                                    v-model:value="formState.companyAddressInfoAddress" />
                                                <a-button @click="showModal" type="primary">자동선택
                                                </a-button>
                                                <a-modal class="container_email" v-model:visible="isShow"
                                                    okText="네. 적용합니다" cancelText="아니오" @ok="handleSuccsess"
                                                    :mask-closable="false">
                                                    <div id="modal">
                                                        <div style="display: flex">
                                                            <question-circle-outlined
                                                                style="padding-right: 10px; font-size: xxx-large" />
                                                            <div>
                                                                <p style="margin: 0; font-weight: 600">
                                                                    관할세무서 : 송파세무서
                                                                </p>
                                                                <p style="margin: 0; font-weight: 600">
                                                                    지방소득세 납세지 : 서울특별시 송파구
                                                                </p>
                                                                <p style="margin: 0">
                                                                    위 자동으로 선택된 결과로 적용하시겠습니까?
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a-modal>
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col>
                                            <a-row :gutter="24">
                                                <a-col>
                                                    <a-form-item label="관할세무서">
                                                        <a-input disabled style="width: 200px"
                                                            v-model:value="formState.competentTaxOfficeCode" />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col>
                                                    <a-form-item label="지방소득세 납세지 ">
                                                        <a-input disabled style="width: 200px"
                                                            v-model:value="formState.localIncomeTaxArea" />
                                                    </a-form-item>
                                                </a-col>
                                                <a-button type="primary" ghost @click="modalSetting">수동선택
                                                </a-button>
                                            </a-row>
                                        </a-col>
                                    </a-row>
                                </a-form>
                            </div>
                        </a-col>
                    </a-row>
                    <SettingPopup :modalStatus="modalSettingStatus" @closePopup="modalSettingStatus = false"
                        @dataEmit="changeValueAddress" title="원천설정 [ cm-130 –pop ]" />
                </a-tab-pane>
                <a-tab-pane key="2" tab="급여항목">
                    <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="itemCode"
                        :allow-column-reordering="true" :allow-column-resizing="true" :column-auto-width="true">
                        <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                        <DxExport :enabled="true" :allow-export-selected-data="true" />
                        <DxToolbar>
                            <DxItem name="searchPanel" />
                            <DxItem name="exportButton" />
                            <DxItem location="after" template="button-template" css-class="cell-button-add" />
                            <DxItem name="groupPanel" />
                            <DxItem name="addRowButton" show-text="always" />
                            <DxItem name="columnChooserButton" />
                        </DxToolbar>
                        <template #button-template>
                            <DxButton icon="plus" @click="openAddNewModal" />
                        </template>
                        <DxColumn data-field="itemCode" :width="80" css-class="cell-center" caption="코드" />
                        <DxColumn data-field="use" caption="이용여부" :width="100" cell-template="use"
                            css-class="cell-center" />
                        <template #use="{ data }">
                            <a-tag :color="getAbleDisable(data.value)">이용중지</a-tag>
                        </template>
                        <DxColumn data-field="taxPayItemName" caption="과세구분" />
                        <DxColumn data-field="name" caption="항목명" />
                        <DxColumn data-field="taxfreePayItemCode" caption="비과세코드" css-class="cell-center" />
                        <DxColumn data-field="taxFreeIncludeSubmission" caption="제출여부" css-class="cell-center"
                            cell-template="taxExemption" :width="100" />
                        <template #taxExemption="{ data }">
                            {{data.value == true ? 'O' : (data.value == false ? 'X' : '')}}
                        </template>
                        <DxColumn data-field="유형" />
                        <DxColumn data-field="formula" caption="산출방법" />
                        <DxColumn cell-template="pupop" css-class="cell-center" :width="100" />
                        <template #pupop="{ data }" class="custom-action">
                            <div class="custom-action">
                                <a-space :size="10">
                                    <a-tooltip placement="top">
                                        <template #title>편집</template>
                                        <EditOutlined @click="setModalEditVisible(data)" />
                                    </a-tooltip>
                                    <a-tooltip placement="top">
                                        <template #title>변경이력</template>
                                        <HistoryOutlined @click="modalHistory(data)" />
                                    </a-tooltip>
                                    <deleteOutlined @click="deleteConfig(data)" />
                                </a-space>
                            </div>
                        </template>
                    </DxDataGrid>
                    <AddCM130Popup :modalStatus="modalAddNewStatus" @closePopup="onCloseAddNewModal" title="원천설정" />
                    <EditCM130Popup :modalStatus="modalEditStatus" @closePopup="onCloseEditModal" :data="popupData"
                        title="원천설정" :idRowEdit="idRowEdit" />
                    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                        :data="popupData" title="변경이력" :idRowEdit="idRowEdit" typeHistory="cm-130" />
                </a-tab-pane>
            </a-tabs>
        </a-spin>
    </div>
</template>
<script lang="ts">
import { companyId } from "../../../../helpers/commonFunction";
import {
} from "@ant-design/icons-vue";
import {
    WarningFilled,
    EditOutlined,
    SearchOutlined,
    PrinterOutlined,
    DeleteOutlined, SaveOutlined,
    HistoryOutlined,
    LoginOutlined,
} from "@ant-design/icons-vue";
import HistoryPopup from "../../../../components/HistoryPopup.vue";
import queries from "../../../../graphql/queries/CM/CM130/index";
import mutations from "../../../../graphql/mutations/CM/CM130/index";
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, reactive, watch, createVNode } from "vue";
import { DxNumberBox } from "devextreme-vue/number-box";
import DxButton from "devextreme-vue/button";
import { Modal } from 'ant-design-vue';
import {
    DxDataGrid,
    DxColumn,
    DxExport,
    DxSearchPanel,
    DxToolbar,
    DxPaging,
    DxItem,
} from "devextreme-vue/data-grid";
import { message } from "ant-design-vue";
import EditCM130Popup from "../CM130/components/EditCM130Popup.vue";
import SettingPopup from "./components/SettingPopup.vue";
import { Workbook } from "exceljs";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import AddCM130Popup from "./components/AddCM130Popup.vue";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday);
dayjs.extend(localeData);
export default defineComponent({
    components: {
        DxNumberBox,
        WarningFilled,
        SettingPopup,
        DxDataGrid,
        DxColumn,
        DxExport,
        DxSearchPanel,
        DxButton,
        DxToolbar,
        DxItem,
        EditOutlined,
        HistoryOutlined,
        LoginOutlined,
        EditCM130Popup,
        HistoryPopup,
        AddCM130Popup,
        SearchOutlined,
        PrinterOutlined,
        DeleteOutlined,
        SaveOutlined,
        DxPaging
    },
    setup() {
        const popupData = ref([]);
        const modalSettingStatus = ref<boolean>(false);
        const modalEditStatus = ref<boolean>(false);
        const modalAddNewStatus = ref<boolean>(false);
        const modalHistoryStatus = ref<boolean>(false);
        const isSwitch = ref<boolean>(false);
        const isShow = ref<boolean>(false);
        const idRowEdit = ref(0);
        const formState = reactive({
            reportType: 1,
            paymentType: 1,
            paymentDay: 1,
            insuranceSupport: false,
            competentTaxOfficeCode: '',
            localIncomeTaxArea: '',
            companyAddressInfoAddress: '',
            collectivePayment: false,
            taxForEachBusiness: false,
            bcode: "",
            taxOfficeName: ""
        });
        const dataSource = ref([]);
        const dataQueryWithholding = ref({ companyId: companyId, imputedYear: parseInt(dayjs().format('YYYY')) });
        //================================================= FUNCTION============================================
        const showModal = () => {
            isShow.value = true;
        };
        const SwitchButton = () => {
            isSwitch.value = true;
        };
        let previewImage: any = ref("/public/images/demo-image.jpg");
        const handleSuccsess = (e: MouseEvent) => {
            isShow.value = false;
        };
        // reportType: 1 or 6
        // paymentType: 1 or 2
        // get config
        const dataQuery = ref({ companyId: companyId, imputedYear: parseInt(dayjs().format('YYYY')) });
        const { result: resultConfig, loading, refetch: refetchConfig } = useQuery(
            queries.getWithholdingConfig,
            dataQuery,
            () => ({
                fetchPolicy: "no-cache",
            })
        );
        watch(resultConfig, (value) => {
            if (value) {
                formState.reportType = value.getWithholdingConfig.reportType;
                formState.paymentType = value.getWithholdingConfig.paymentType;
                formState.paymentDay = value.getWithholdingConfig.paymentDay;
                formState.insuranceSupport = value.getWithholdingConfig.insuranceSupport;
                formState.competentTaxOfficeCode = value.getWithholdingConfig.competentTaxOfficeCode;
                formState.localIncomeTaxArea = value.getWithholdingConfig.localIncomeTaxArea;
                formState.companyAddressInfoAddress = value.getWithholdingConfig.companyAddressInfo.address;
                formState.collectivePayment = value.getWithholdingConfig.collectivePayment;
                formState.taxForEachBusiness = value.getWithholdingConfig.taxForEachBusiness;
            }
        });
        // update config 
        const { mutate: actionUpdateWithholdingConfig, onDone: onDoneUpdated, onError: errorEditConfig } = useMutation(
            mutations.updateWithholdingConfig
        );
        errorEditConfig((error) => {
            message.error(error.message, 5);
        })
        onDoneUpdated(() => {
            message.success(`Update was successful`, 4);
            refetchConfig();
        });
        const onSubmitConfig = () => {
            let variables = {
                companyId: companyId,
                imputedYear: parseInt(dayjs().format('YYYY')),
                input: {
                    reportType: formState.reportType,
                    paymentType: formState.paymentType,
                    paymentDay: formState.paymentDay,
                    insuranceSupport: formState.insuranceSupport,
                    competentTaxOfficeCode: formState.competentTaxOfficeCode,
                    localIncomeTaxArea: formState.localIncomeTaxArea,
                    collectivePayment: formState.collectivePayment,
                    taxForEachBusiness: formState.taxForEachBusiness
                }
            };
            actionUpdateWithholdingConfig(variables)
        };
        // get withholding config pay items  
        const { result: resultWithholdingConfig, refetch: refetchWithholdingConfig, loading: loadingWithholdingConfig } = useQuery(
            queries.getWithholdingConfigPayItems,
            dataQueryWithholding,
            () => ({
                fetchPolicy: "no-cache",
            })
        );
        watch(resultWithholdingConfig, (value) => {
            dataSource.value = value.getWithholdingConfigPayItems;
        });
        // delete withholding config pay item
        const { mutate: actionDelete, onDone: onDoneDelete } = useMutation(
            mutations.deleteWithholdingConfigPayItem
        );
        onDoneDelete(() => {
            message.success(`Update was successful`, 4);
            refetchWithholdingConfig()
        });
        const deleteConfig = (data: any) => {
            Modal.confirm({
                title: 'Do you want to delete this item?',
                icon: createVNode(ExclamationCircleOutlined),
                //content: createVNode('div', { style: 'color:red;' }, 'Some descriptions'),
                onOk() {
                    let variables = {
                        companyId: companyId,
                        imputedYear: parseInt(dayjs().format('YYYY')),
                        itemCode: data.data.itemCode
                    };
                    actionDelete(variables);
                },
                class: 'confirm',
            });
        }
        const onExporting = (e: any) => {
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet("employees");
            exportDataGrid({
                component: e.component,
                worksheet,
                autoFilterEnabled: true,
            }).then(() => {
                workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(
                        new Blob([buffer], { type: "application/octet-stream" }),
                        "DataGrid.xlsx"
                    );
                });
            });
            e.cancel = true;
        };
        const modalSetting = () => {
            modalSettingStatus.value = true;
        }
        const openAddNewModal = () => {
            if (dataSource.value.length <= 20) {
                modalAddNewStatus.value = true;
            } else {
                message.error(`이용 가능한 급여항목은 최대 20개입니다. 기존항목을 이용중지한 후 새로 추가하세요`)
            }
        }
        const onCloseAddNewModal = () => {
            modalAddNewStatus.value = false;
            refetchWithholdingConfig();
        };
        const setModalEditVisible = (data: any) => {
            idRowEdit.value = data.data.itemCode;
            modalEditStatus.value = true;
            popupData.value = data;
        };
        const onCloseEditModal = () => {
            modalEditStatus.value = false;
            refetchWithholdingConfig();
        };
        const modalHistory = (data: any) => {
            idRowEdit.value = data.data.itemCode;
            modalHistoryStatus.value = true;
            popupData.value = data;
        }
        const getAbleDisable = (data: any) => {
            if (data) {
                return "transparent";
            } else {
                return "red";
            }
        }
        const changeValueAddress = (data: any) => {
            formState.competentTaxOfficeCode = data.taxOfficeName
            formState.localIncomeTaxArea = data.localIncomeTaxArea
        }
        return {
            changeValueAddress,
            idRowEdit,
            labelCol: { style: { width: "150px" } },
            formState,
            activeKey: ref("1"),
            onSubmitConfig,
            previewImage,
            SwitchButton,
            isSwitch,
            isShow,
            showModal,
            handleSuccsess,
            dataSource,
            loading,
            loadingWithholdingConfig,
            deleteConfig,
            popupData,
            modalSettingStatus,
            modalEditStatus,
            modalAddNewStatus,
            modalHistoryStatus,
            modalSetting,
            openAddNewModal,
            onCloseAddNewModal,
            setModalEditVisible,
            onCloseEditModal,
            modalHistory,
            getAbleDisable,
            onExporting
        };
    },
});
</script>
<style lang="scss" scoped>
.btn-action>button {
    margin-left: 5px;
}

::v-deep .ant-tag-red {
    border: none;
}

::v-deep .cell-center {
    text-align: center !important;
}

::v-deep .ant-modal-body {
    padding: 0;
}

.container {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding-right: 10px;
    padding-left: 10px;
}

.title-h2 {
    margin-left: 1%;
}

.validate-message {
    margin-left: 2%;
    color: #c3baba;
}
</style>
