<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" :mask-closable="false" title="서비스관리 " centered okText="저장하고 나가기"
            cancelText="그냥 나가기" @cancel="setModalVisible()" width="1200px">
            <template #footer>
                <a-button @click="setModalVisible">그냥 나가기</a-button>
                <a-button key="submit" type="primary" :loading="loading || loadingUpdate"
                    @click="updateServiceContract">
                    저장하고 나가기</a-button>
            </template>
            <a-spin tip="Loading..." :spinning="loading || loadingUpdate">
                <a-collapse v-model:activeKey="activeKey" accordion>
                    <a-collapse-panel key="1" header="이용서비스" class="-scrollpopup">
                        <a-form :label-col="labelCol" style="height: 500px;overflow-y: scroll;">
                            <div>
                                <a-row>
                                    <a-col :span="10">
                                        <a-form-item label="총이용료" style="font-weight: bold">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(totalPrice) }}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8"></a-col>
                                    <a-col :span="10">
                                        <a-form-item label="회계서비스 이용료" style="padding-left: 50px">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(totalPriceAccountingService) }}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="14"></a-col>
                                    <a-col :span="10">
                                        <a-form-item label="원천서비스 이용료" style="padding-left: 50px">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(totalWithholdingService) }}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="14"></a-col>
                                </a-row>
                                <hr />
                                <a-row>
                                    <a-col :span="12">
                                        <a-form-item label="회계서비스" style="font-weight: bold">
                                            <a-checkbox v-model:checked="formState.usedAccountingCount">회계서비스 신청
                                            </a-checkbox>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <div>
                                    <div>
                                        <a-card title="⁙ 운영사업" :bordered="false" style="width: 100%"
                                            :headStyle="{ padding: '5px', color: 'red' }" bodyStyle="padding: 0px 0px">
                                        </a-card>
                                    </div>
                                    <DxDataGrid id="grid-container" :show-borders="true"
                                        :data-source="formState.accountingfacilityBusinesses"
                                        key-expr="facilityBusinessId" :allow-column-reordering="true"
                                        :allow-column-resizing="true" :column-auto-width="true">
                                        <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true"
                                            mode="cell" />
                                        <DxSelection mode="single" />
                                        <DxPaging :enabled="false" />
                                        <DxColumn data-field="No" :allow-editing="false" caption="#"
                                            cell-template="indexCell" />
                                        <template #indexCell="{ data }">
                                            <div>{{ data.rowIndex }}</div>
                                        </template>
                                        <DxColumn data-field="name" caption="사업명 (중복불가)" />
                                        <DxColumn data-field="facilityBizType" caption="사업분류" />
                                        <DxColumn data-field="startYearMonth" caption="서비스시작년월" data-type="date"
                                            :format="'yyyy-MM-dd'" />
                                        <DxColumn data-field="capacity" caption="정원수 (명)" />
                                        <DxToolbar>
                                            <DxItem name="addRowButton" />
                                        </DxToolbar>
                                        <DxMasterDetail :enabled="true" template="detailTemplate" />
                                        <template #detailTemplate="{ data }">
                                            <a-row :gutter="24">
                                                <a-col :span="10">
                                                    <a-form-item label="회계서비스 이용료:" style=" font-weight: bold">
                                                        <p class="input-disble" :id="'price-' + data.data.name">
                                                            {{
                                                                    $filters.formatCurrency(getTotalAmount(data))
                                                            }}
                                                        </p>
                                                    </a-form-item>

                                                    <div class="custom-money">
                                                        <DxCheckBox :value="true" text="기본이용료" class="custom-checkbox"
                                                            :disabled="true" />
                                                        <DxNumberBox :format="'#,###'" :min="0" :value="data.data.price"
                                                            @keyDown="changeValueInput($event.component, 0, data.data)" />
                                                    </div>

                                                    <div class="custom-money">
                                                        <DxCheckBox :value="checkOption(data.data.options, 1)"
                                                            text="입력대행" class="custom-checkbox" />
                                                        <DxNumberBox :format="'#,###'" :min="0"
                                                            :value="getPriceOption(data.data.options, 1)"
                                                            @keyDown="changeValueInput($event.component, 1, data.data)" />
                                                    </div>

                                                    <div class="custom-money">
                                                        <DxCheckBox :value="checkOption(data.data.options, 2)"
                                                            text="계좌통합" class="custom-checkbox" />
                                                        <DxNumberBox :format="'#,###'" :min="0"
                                                            :value="getPriceOption(data.data.options, 2)"
                                                            @keyDown="changeValueInput($event.component, 2, data.data)" />
                                                    </div>

                                                    <div class="custom-money">
                                                        <DxCheckBox :value="checkOption(data.data.options, 3)"
                                                            text="W4C" class="custom-checkbox" /> 
                                                        <DxNumberBox :min="0" :format="'#,###'"
                                                            :value="getPriceOption(data.data.options, 3)"
                                                            @keyDown="changeValueInput($event.component, 3, data.data)" />

                                                    </div>


                                                </a-col>
                                                <a-col :span="14">
                                                    <div style="display: flex">
                                                        <div>
                                                            <imgUpload :title="titleModal" @update-img="getImgUrl"
                                                                :customrow="1" />
                                                        </div>
                                                        <a-col :span="7">
                                                            <div v-if="imageValue" class="img-preview">
                                                                <a-image :src="imageValue" style="height: 100px;" />
                                                            </div>
                                                            <div v-else class="img-preview">
                                                                <img src="../../../../../assets/images/imgdefault.jpg"
                                                                    style="height: 200px;" />
                                                            </div>
                                                            <div v-if="fileName">
                                                                <span style="padding-right: 10px">{{ fileName }}</span>
                                                                <delete-outlined @click="removeImg"
                                                                    style="color: red; cursor: pointer" />
                                                            </div>
                                                        </a-col>
                                                    </div>
                                                </a-col>
                                            </a-row>
                                        </template>
                                    </DxDataGrid>
                                </div>

                                <hr />
                                <a-row>
                                    <a-col>
                                        <a-form-item label="원천서비스" style="font-weight: bold">
                                            <a-checkbox v-model:checked="formState.usedWithholding">원천서비스</a-checkbox>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <div>
                                    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                                        <a-form-item label="서비스 시작년월" style="width: 300px">
                                            <CustomDatepicker :valueDate="formState.withholdingStartYearMonth"
                                                date-format="MM/DD/YYYY" />
                                        </a-form-item>
                                        <a-form-item label="직 원 수 ">
                                            <a-input-number type="number" min="0"
                                                v-model:value="formState.withholdingCapacity" style="width: 150px" />
                                        </a-form-item>
                                        <a-form-item label="원천서비스 이용료:" style="font-weight: bold; width: 565px">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(totalWithholdingService) }}
                                            </p>
                                        </a-form-item>
                                    </a-form>
                                </div>
                                <a-row>
                                    <a-col span="4"></a-col>
                                </a-row>
                                <a-row>
                                    <a-coll :span="10"></a-coll>
                                    <a-col :span="14">
                                        <div style="display: flex; padding-left: 155px">
                                            <a-checkbox v-model:checked="formState.checkBoxBasicFee"
                                                @change="handleInputTexService()" style="width: 180px">기본이용료
                                            </a-checkbox>
                                            <DxNumberBox v-model="formState.usedServiceInfoWithholdingPrice"
                                                :format="'#,##0'" :disabled="formState.disableNumber5" />
                                        </div>
                                    </a-col>
                                    <a-coll :span="8"></a-coll>
                                    <a-col :span="14">
                                        <div
                                            style="display: flex; padding-left: 155px; margin-top: 5px; margin-bottom: 10px;">
                                            <a-checkbox v-model:checked="formState.checkBoxMajorInsurance"
                                                @change="handleInputTexService()" style="width: 180px">4대보험</a-checkbox>
                                            <DxNumberBox v-model="formState.fourMajorInsurance" :format="'#,##0'"
                                                :disabled="formState.disableNumber6" />
                                        </div>
                                    </a-col>
                                </a-row>
                            </div>
                        </a-form>

                    </a-collapse-panel>
                    <a-collapse-panel key="2" header="담당매니저/ 영업자">
                        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                            <a-form-item label="담당매니저">
                                <div style="width: 200px">
                                    <ListManagerDropdown v-model:selected="formState.manageUserId" />
                                </div>
                            </a-form-item>
                            <a-form-item label="영업자">
                                <div style="width: 200px">
                                    <ListSalesDropdown v-model:selected="formState.compactSalesRepresentativeId" />
                                </div>
                            </a-form-item>
                        </a-form>
                    </a-collapse-panel>
                    <a-collapse-panel key="3" header="메모"
                        :extra="formStateMomes.length > 0 ? formStateMomes.length : ''"
                        :style="{ position: 'relative' }">
                        <a-table bordered="false" :data-source="formStateMomes" :pagination="false">
                            <template #bodyCell="{ text, index }">
                                <div>
                                    <div class="title-note">
                                        <div>
                                            {{ text.ownerName }} 수정
                                            {{ formarDate(text.updatedAt) }} 게시
                                            {{ formarDate(text.createdAt) }}
                                        </div>
                                        <div v-if="index == 0">
                                            <PlusSquareOutlined :style="{ fontSize: '25px' }" @click="handleAdd" />
                                        </div>
                                    </div>
                                    <div>
                                        <a-textarea placeholder="전달사항입력" allow-clear v-model:value="text.memo" />
                                    </div>
                                    <a-space :size="8" style="margin-top: 7px">
                                        <save-outlined :style="{ fontSize: '20px' }"
                                            @click="handleAddMemo(text.memo, text.memoId)" />
                                        <DeleteOutlined :style="{ fontSize: '20px' }"
                                            @click="handleDeleteMemo(text.memoId)" />
                                    </a-space>
                                </div>
                            </template>
                        </a-table>
                    </a-collapse-panel>
                </a-collapse>
            </a-spin>
        </a-modal>
    </div>
</template>
  
<script lang="ts">
import {
    AccountingAdditionalServiceType,
    WithholdingAdditionalServiceType,
} from "@bankda/jangbuda-common";
import ListSalesDropdown from "../../../../../components/ListSalesDropdown.vue";
import ListManagerDropdown from "../../../../../components/ListManagerDropdown.vue";
import { FacilityBizType } from "@bankda/jangbuda-common";
import CustomDatepicker from "../../../../../components/CustomDatepicker.vue";
import { ref, defineComponent, watch, reactive, computed } from "vue";
import DxDropDownBox from "devextreme-vue/drop-down-box";
import imgUpload from "../../../../../components/UploadImage.vue";
import DxNumberBox from "devextreme-vue/number-box";
import { DxCheckBox } from 'devextreme-vue/check-box';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxEditing,
    DxSelection,
    DxLookup,
    DxToolbar,
    DxItem,
    DxTexts,
    DxMasterDetail,
} from "devextreme-vue/data-grid";
import { DxButton } from "devextreme-vue/button";
import {
    UploadOutlined,
    MinusCircleOutlined,
    ZoomInOutlined,
    SaveOutlined,
    DeleteOutlined,
    PlusSquareOutlined,
    WarningFilled,
    PlusOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import inputFormat from "../../../../../components/inputBoxFormat.vue";
import type { UploadProps } from "ant-design-vue";
import queries from "../../../../../graphql/queries/BF/BF3/BF330/index";
import mutations from "../../../../../graphql/mutations/BF/BF3/BF330/index";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday);
dayjs.extend(localeData);
import { useQuery, useMutation } from "@vue/apollo-composable";
function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
}

export default defineComponent({
    components: {
        DxDropDownBox,
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxSelection,
        UploadOutlined,
        MinusCircleOutlined,
        ZoomInOutlined,
        SaveOutlined,
        DeleteOutlined,
        PlusSquareOutlined,
        WarningFilled,
        imgUpload,
        PlusOutlined,
        CustomDatepicker,
        ListSalesDropdown,
        ListManagerDropdown,
        DxEditing,
        DxLookup,
        DxButton,
        DxToolbar,
        DxItem,
        inputFormat,
        DxNumberBox,
        DxTexts,
        DxMasterDetail,
        DxCheckBox
    },
    props: {
        modalStatus: Boolean,
        modalStatusHistory: Boolean,
        idRowEdit: {
            type: Number,
            default: null,
        },
    },

    methods: {
        contentReady(e: any) {
            if (!e.component.getSelectedRowKeys().length) { e.component.selectRowsByIndexes(0); }
        },
        selectionChanged(e: any) {
            e.component.collapseAll(-1);
            e.component.expandRow(e.currentSelectedRowKeys[0]);
        },
        getImgUrl(img: any) {
            this.imageValue = img.url;
            this.fileName = img.fileName;
        },

        setModalVisibleHis() {
            this.$emit("closePopupHis", false);
        },
        getColorTag(data: string) {
            if (data === "신청") {
                return "red";
            } else if (data === "심사중") {
                return "blue";
            } else if (data === "승인") {
                return "green";
            } else if (data === "반려") {
                return "grey";
            }
        },
        handleInputACCService() {
            let accBasicFee =
                this.formState.accBasicFee == ""
                    ? 0
                    : parseInt(this.formState.accBasicFee);
            let accConsolidation =
                this.formState.accConsolidation == ""
                    ? 0
                    : parseInt(this.formState.accConsolidation);
            let accInput =
                this.formState.accInput == "" ? 0 : parseInt(this.formState.accInput);
            let acc4wc =
                this.formState.acc4wc == "" ? 0 : parseInt(this.formState.acc4wc);

            this.formState.accFeeService =
                accBasicFee + accConsolidation + accInput + acc4wc;
        },

        handleInputTexService() {
            let basicFee =
                this.formState.basicFee == "" ? 0 : parseInt(this.formState.basicFee);
            let majorInsurance =
                this.formState.majorInsurance == ""
                    ? 0
                    : parseInt(this.formState.majorInsurance);
            this.formState.taxFeeSevice = basicFee + majorInsurance;
        },

        handleChangeDataTable(event: any) {
            let pattern = /option/;
            if (pattern.test(event.id) == true) {
                console.log(event.id);
            }
        },

        checkOption(arr: any, value: number) {
            let count = 0
            arr.map((e: any) => {
                if (e.accountingServiceType == value) {
                    count = 1
                }
            })

            if (count == 0) {
                return false
            } else {
                return true
            }
        },

        getPriceOption(arr: any, value: number) {
            let price = 0
            arr.map((e: any) => {
                if (e.accountingServiceType == value) {
                    price = e.price
                }
            })

            return price
        }
    },
    watch: {
        "formState.checkBoxAccBasicFee"(newVal) {
            if (newVal === false) {
                this.formState.usedServiceInfoAccountingPrice = 0;
                this.formState.disableNumber1 = true;
            } else {
                this.formState.disableNumber1 = false;
            }
        },
        "formState.checkBoxAccInput"(newVal) {
            if (newVal === false) {
                this.formState.inputAgent = 0;
                this.formState.disableNumber2 = true;
            } else {
                this.formState.disableNumber2 = false;
            }
        },
        "formState.checkBoxAccConso"(newVal) {
            if (newVal === false) {
                this.formState.accountIntegration = 0;
                this.formState.disableNumber3 = true;
            } else {
                this.formState.disableNumber3 = false;
            }
        },
        "formState.checkBoxAcc4wc"(newVal) {
            if (newVal === false) {
                this.formState.sSIS = 0;
                this.formState.disableNumber4 = true;
            } else {
                this.formState.disableNumber4 = false;
            }
        },
        "formState.checkBoxBasicFee"(newVal) {
            if (newVal === false) {
                this.formState.usedServiceInfoWithholdingPrice = 0;
                this.formState.disableNumber5 = true;
            } else {
                this.formState.disableNumber5 = false;
            }
        },
        "formState.checkBoxMajorInsurance"(newVal) {
            if (newVal === false) {
                this.formState.fourMajorInsurance = 0;
                this.formState.disableNumber6 = true;
            } else {
                this.formState.disableNumber6 = false;
            }
        },
    },
    setup(props, { emit }) {
        const facilityBizType = FacilityBizType.all();
        const titleModal = "사업자등록증";
        const labelCol = ref({ style: { width: "150px" } });
        const wrapperCol = ref({ span: 14 });
        const radioStyle = ref({
            display: "flex",
            height: "30px",
            lineHeight: "30px",
        });
        const imageValue = ref("");
        const fileName = ref("");
        const dataQuery = ref();
        const dataQueryMemos = ref();
        const loading = ref<boolean>(false);
        const imageUrl = ref<string>("");
        let trigger = ref<boolean>(false);
        const previewTitle = ref("");
        const fileList = ref<UploadProps["fileList"]>([]);
        const formStateMomes = ref([
            {
                memoId: null,
                ownerUserId: 0,
                ownerName: "",
                ownerUsername: "",
                memo: "",
                createdAt: dayjs(new Date()).format("YYYY/MM/DD"),
                createdBy: "",
                updatedAt: dayjs(new Date()).format("YYYY/MM/DD"),
                updatedBy: "",
                ip: "",
                active: "",
            },
        ]);
        const setModalVisible = () => {
            emit("closePopup", false);
        };
        const removeImg = () => {
            imageValue.value = "";
            fileName.value = "";
        };

        const dataOption = ref()

        watch(
            () => props.modalStatus,
            (newValue) => {
                trigger.value = true;
                if (newValue) {
                    dataQuery.value = { id: props.idRowEdit };
                    dataQueryMemos.value = { companyId: props.idRowEdit };
                    refetchMemo();
                } else {
                    formStateMomes.value = [
                        {
                            memoId: null,
                            ownerUserId: 0,
                            ownerName: "",
                            ownerUsername: "",
                            memo: "",
                            createdAt: dayjs(new Date()).format("YYYY/MM/DD"),
                            createdBy: "",
                            updatedAt: dayjs(new Date()).format("YYYY/MM/DD"),
                            updatedBy: "",
                            ip: "",
                            active: "",
                        },
                    ];
                    Object.assign(formState, initialState);
                    trigger.value = false;
                }
            }
        );

        const handleChange = (info: any) => {
            if (info.file.status === "uploading") {
                loading.value = true;
                return;
            }
            if (info.file.status === "done") {
                getBase64(info.file.originFileObj, (base64Url: string) => {
                    imageUrl.value = base64Url;
                    loading.value = false;
                });
            }
            if (info.file.status === "error") {
                loading.value = false;
                message.error("upload error");
            }
        };
        const beforeUpload = (file: any) => {
            const isJpgOrPng =
                file.type === "image/jpeg" || file.type === "image/png";
            if (!isJpgOrPng) {
                message.error("You can only upload JPG file!");
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error("Image must smaller than 2MB!");
            }
            return isJpgOrPng && isLt2M;
        };

        const activeKey = ref([1]);
        const initialState = {
            id: null,
            totalFee: 0,
            accountingPrice: 0,
            withholdingPrice: 0,
            accountingfacilityBusinesses: [],
            usedAccountingCount: false,
            usedServiceInfoAccountingPrice: 0,
            inputAgent: 0,
            accountIntegration: 0,
            sSIS: 0,
            usedWithholding: false,
            withholdingStartYearMonth: "",
            withholdingCapacity: "",
            usedServiceInfoWithholdingPrice: 0,
            fourMajorInsurance: 0,
            compactSalesRepresentativeId: 0,
            manageUserId: 0,
            name: "",
            name2: "",
            name3: "",
            delivery: false,
            type: [],
            resource: "",
            desc: "",
            totalService: 0,
            accFeeService: 0,
            accBasicFee: "",
            accInput: "",
            accConsolidation: "",
            acc4wc: "",
            basicFee: "",
            majorInsurance: "",
            taxFeeSevice: 0,
            checkBox: false,
            checkBoxAccBasicFee: false,
            checkBoxAccInput: false,
            checkBoxAccConso: false,
            checkBoxAcc4wc: false,
            checkBoxMajorInsurance: false,
            checkBoxBasicFee: false,
            disableNumber1: false,
            disableNumber2: false,
            disableNumber3: false,
            disableNumber4: false,
            disableNumber5: false,
            disableNumber6: false,
        };
        const formState = reactive({ ...initialState });

        // get service contract
        const { result, error, refetch, onResult } = useQuery(
            queries.getServiceContract,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
        onResult((res) => { });

        // process data after call getServiceContract api
        watch(result, (value) => {
            if (value && value.getServiceContract) {
                formState.id = value.getServiceContract.id;
                formState.totalFee =
                    value.getServiceContract.usedServiceInfo.totalPrice;
                formState.accountingPrice =
                    value.getServiceContract.usedServiceInfo.accountingPrice;
                formState.withholdingPrice =
                    value.getServiceContract.usedServiceInfo.withholdingPrice;
                formState.accountingfacilityBusinesses =
                    value.getServiceContract.usedServiceInfo.accounting;
                formState.usedAccountingCount =
                    value.getServiceContract.usedAccountingCount > 0 ? true : false;
                formState.usedWithholding = value.getServiceContract.usedWithholding;
                formState.withholdingStartYearMonth =
                    value.getServiceContract.withholding.startYearMonth;
                formState.withholdingCapacity =
                    value.getServiceContract.withholding.capacity;
                formState.compactSalesRepresentativeId =
                    value.getServiceContract.salesRepresentativeId;
                formState.manageUserId = value.getServiceContract.manageUserId;
                // process price Company / Accounting facility business list
                if (value.getServiceContract.usedServiceInfo.accounting.length > 0) {
                    value.getServiceContract.usedServiceInfo.accounting.map((el: any) => {
                        formState.usedServiceInfoAccountingPrice += el.price;
                        formState.checkBoxAccBasicFee = true;
                        if (el.options.length > 0) {
                            el.options.map((value: any) => {
                                switch (value.accountingServiceType) {
                                    case 1:
                                        formState.checkBoxAccInput = true;
                                        formState.inputAgent += value.price;
                                        break;
                                    case 2:
                                        formState.checkBoxAccConso = true;
                                        formState.accountIntegration += value.price;
                                        break;
                                    case 3:
                                        formState.checkBoxAcc4wc = true;
                                        formState.sSIS += value.price;
                                        break;
                                    default:
                                        break;
                                }
                            });
                        }
                    });
                }

                // process price Company / Withholding information (사업자/원천정보)
                formState.usedServiceInfoWithholdingPrice =
                    value.getServiceContract.usedServiceInfo.withholding.price;
                formState.checkBoxBasicFee = true;
                if (
                    value.getServiceContract.usedServiceInfo.withholding.options.length >
                    0
                ) {
                    value.getServiceContract.usedServiceInfo.withholding.options.map(
                        (val: any) => {
                            switch (val.withholdingServiceType) {
                                case 1:
                                    formState.checkBoxMajorInsurance = true;
                                    formState.fourMajorInsurance += val.price;
                                    break;
                                default:
                                    break;
                            }
                        }
                    );
                }
            }
        });

        // get list memo of company
        const { result: resultMemo, refetch: refetchMemo } = useQuery(
            queries.getServiceContractManageMemos,
            dataQueryMemos,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultMemo, (value) => {
            if (value && value.getServiceContractManageMemos.length > 0) {
                formStateMomes.value = value.getServiceContractManageMemos;
            }
        });

        // mutation create memo
        const {
            mutate: actionCreateMemo,
            onError: onErrorMemo,
            onDone: onCreatedMemo,
        } = useMutation(mutations.createServiceContractManageMemo);

        onCreatedMemo((res) => {
            refetchMemo();
            message.success("매모 추가 완료", 4);
        });

        // mutation update memo
        const { mutate: actionUpdateMemo, onDone: onUpdatedMemo } = useMutation(
            mutations.updateServiceContractManageMemo
        );

        onUpdatedMemo(() => {
            refetchMemo();
        });

        // mutation delete memo
        const { mutate: actionDeleteMemo, onDone: onDeleteMemo } = useMutation(
            mutations.deleteServiceContractManageMemo
        );

        onDeleteMemo(() => {
            refetchMemo();
        });

        const handleDeleteMemo = (key: number) => {
            if (formStateMomes.value.length > 1) {
                actionDeleteMemo({ companyId: formState.id, memoId: key });
            }
        };

        const handleAdd = () => {
            const newMemo: any = {
                memoId: null,
                ownerUserId: 0,
                ownerName: "",
                ownerUsername: "",
                memo: "",
                createdAt: dayjs(new Date()).format("YYYY/MM/DD"),
                createdBy: "",
                updatedAt: dayjs(new Date()).format("YYYY/MM/DD"),
                updatedBy: "",
                ip: "",
                active: "",
            };
            formStateMomes.value.unshift(newMemo);
        };

        const handleAddMemo = (note: any, mmId: any = null) => {
            if (note !== "" && mmId == null) {
                actionCreateMemo({ companyId: formState.id, memo: note });
            } else {
                actionUpdateMemo({ companyId: formState.id, memo: note, memoId: mmId });
            }
        };

        // Update Service Contract
        const {
            mutate: actionUpdate,
            loading: loadingUpdate,
            onDone: updateDone,
        } = useMutation(mutations.updateServiceContract);

        const updateServiceContract = () => {
            let accountingInfor: any = [];
            let arrayAccountingOptions: any = [];

            if (formState.checkBoxAccInput) {
                arrayAccountingOptions.push({
                    accountingServiceType:
                        AccountingAdditionalServiceType.INPUT_AGENT.code,
                    price: formState.inputAgent,
                });
            }

            if (formState.checkBoxAccConso) {
                arrayAccountingOptions.push({
                    accountingServiceType:
                        AccountingAdditionalServiceType.ACCOUNT_INTEGRATION.code,
                    price: formState.accountIntegration,
                });
            }
            if (formState.checkBoxAcc4wc) {
                arrayAccountingOptions.push({
                    accountingServiceType: AccountingAdditionalServiceType.SSIS.code,
                    price: formState.sSIS,
                });
            }

            if (formState.accountingfacilityBusinesses.length > 0) {
                accountingInfor = formState.accountingfacilityBusinesses.map(
                    (facilityBusinesses: any) => ({
                        longTermCareInstitutionNumber: "",
                        facilityBizType: facilityBusinesses.facilityBizType,
                        name: facilityBusinesses.name,
                        startYearMonth: facilityBusinesses.startYearMonth,
                        capacity: facilityBusinesses.capacity,
                        registrationCardFileStorageId:
                            facilityBusinesses.registrationCardFileStorageId,
                        facilityBusinessId: facilityBusinesses.facilityBusinessId
                            ? facilityBusinesses.facilityBusinessId
                            : 0,
                        price: totalPriceAccountingService.value,
                        options: arrayAccountingOptions,
                    })
                );
            }

            let arrayWithholdingOptions: any = [];
            if (formState.checkBoxMajorInsurance) {
                arrayWithholdingOptions.push({
                    withholdingServiceType:
                        WithholdingAdditionalServiceType.MAJOR_INSURANCE.code,
                    price: formState.fourMajorInsurance,
                });
            }
            let withholdingInfor = {
                startYearMonth: formState.withholdingStartYearMonth,
                capacity: formState.withholdingCapacity,
                price: totalWithholdingService.value,
                options: arrayWithholdingOptions,
            };

            let infoData = {
                totalPrice: totalPrice.value,
                accountingPrice: totalPriceAccountingService.value,
                withholdingPrice: totalWithholdingService.value,
                accounting: accountingInfor,
                withholding: withholdingInfor,
            };

            let extraData = {
                salesRepresentativeId: formState.compactSalesRepresentativeId,
                manageUserId: formState.manageUserId,
            };

            let variables = {
                id: formState.id,
                info: infoData,
                extra: extraData,
            };
            actionUpdate(variables);
        };

        updateDone((res) => {
            message.success(`업데이트 완료!`, 4);
            setModalVisible();
        });

        // calculate price
        const totalPriceByDay = computed(() => {
            return formState.accountingPrice + formState.withholdingPrice;
        });
        const totalPriceAccountingService = computed(() => {
            return (
                formState.usedServiceInfoAccountingPrice +
                formState.inputAgent +
                formState.accountIntegration +
                formState.sSIS
            );
        });
        const totalWithholdingService = computed(() => {
            return (
                formState.usedServiceInfoWithholdingPrice + formState.fourMajorInsurance
            );
        });
        const totalPrice = computed(() => {
            let ttPrice =
                formState.usedServiceInfoAccountingPrice +
                formState.inputAgent +
                formState.accountIntegration +
                formState.sSIS +
                formState.usedServiceInfoWithholdingPrice +
                formState.fourMajorInsurance;

            return ttPrice;
        });

        const formarDate = (date: any) => {
            return dayjs(date).format("YYYY/MM/DD");
        };

        const getTotalAmount = (data: any) => {
            let totalAmount = 0
            data.data.options.map((e: any) => {
                totalAmount += e.price
            })
            totalAmount += data.data.price
            return totalAmount
        }

        const changeValueInput = (event: any, indexOP: any, val: any) => {
            setTimeout(() => {
                // Nếu thay đổi giá trị trong options
                if (indexOP != 0) {
                    let total = 0
                    val.options.map((e: any) => {
                        if (e.accountingServiceType != indexOP) {
                            total += e.price
                        }
                    })
                    total += event._parsedValue + val.price
                    formState.accountingfacilityBusinesses.map((e: any) => {
                        if (e.name == val.name) {

                            e.options.map((k: any) => {
                                if (indexOP == k.accountingServiceType) {
                                    k.price = event._parsedValue
                                }
                            })
                            
                        }
                    })
                }else {
                    formState.accountingfacilityBusinesses.map((e: any) => {
                        if (e.name == val.name) {
                            e.price = event._parsedValue
                        }
                    })
                }
            }, 100);
        }

        return {
            changeValueInput,
            getTotalAmount,
            fileList,
            setModalVisible,
            loading,
            imageUrl,
            handleChange,
            beforeUpload,
            previewTitle,
            activeKey,
            formState,
            labelCol,
            wrapperCol,
            radioStyle,
            titleModal,
            PlusSquareOutlined,
            PlusOutlined,
            fileName,
            removeImg,
            imageValue,
            dataQuery,
            result,
            trigger,
            facilityBizType,
            formStateMomes,
            formarDate,
            handleAdd,
            handleDeleteMemo,
            handleAddMemo,
            updateServiceContract,
            loadingUpdate,
            totalPriceByDay,
            totalPriceAccountingService,
            totalWithholdingService,
            totalPrice,
            dataOption,
        };
    },
});
</script>
<style src="../style/stylePopup.scss" scoped >

</style>