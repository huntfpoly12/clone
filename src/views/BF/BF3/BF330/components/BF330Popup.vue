<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" footer="" :mask-closable="false" title="서비스관리 " centered okText="저장하고 나가기"
            cancelText="그냥 나가기" @cancel="setModalVisible()" width="1200px">
            <standard-form :wrapper-col="{ span: 14 }">
                <a-spin tip="Loading..." :spinning="loading || loadingUpdate">
                    <a-collapse v-model:activeKey="activeKey" accordion :bordered="false">
                        <a-collapse-panel key="1" header="이용서비스" class="-scrollpopup">
                            <div style="height: 500px;overflow-y: scroll;">
                                <a-row>
                                    <a-col :span="12">
                                        <a-form-item label="총이용료" style="font-weight: bold">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(formState.info.totalPrice =
        formState.info.accountingPrice + formState.info.withholdingPrice)
}}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="12"></a-col>
                                    <a-col :span="12">
                                        <a-form-item label="회계서비스 이용료" class="cusstom-label-padding">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(formState.info.accountingPrice) }}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="12"></a-col>
                                    <a-col :span="12">
                                        <a-form-item label="원천서비스 이용료" class="cusstom-label-padding">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(formState.info.withholdingPrice) }}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="14"></a-col>
                                </a-row>
                                <hr />
                                <a-row>
                                    <a-col :span="12">
                                        <a-form-item label="회계서비스" style="font-weight: bold">
                                            <checkbox-basic v-model:valueCheckbox="formState.info.usedAccounting"
                                                size="14" label="회계서비스 신청" />
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <div>
                                    <div>
                                        <a-card title="⁙ 운영사업" :bordered="false" style="width: 100%"
                                            :headStyle="{ padding: '5px', color: 'red' }" bodyStyle="padding: 0px 0px">
                                        </a-card>
                                    </div>
                                    <DxDataGrid v-if="formState.info.usedAccounting" id="gridContainer"
                                        :show-borders="true" ref="gridRefName" :data-source="dataSource"
                                        key-expr="rowIndex" :allow-column-reordering="move_column"
                                        :allow-column-resizing="colomn_resize" :column-auto-width="true"
                                        :show-row-lines="true" :focused-row-enabled="true" @row-removing="removingRow"
                                        @focused-row-changed="onFocusedRowChanged" :focused-row-key="focusedRowKey"
                                        @init-new-row="onInitRow">
                                        <DxEditing :use-icons="true" :allow-adding="true" template="button-template"
                                            new-row-position="pageBottom" :allow-deleting="true" mode="cell">
                                            <DxTexts confirmDeleteMessage="삭제하겠습니까?" />
                                        </DxEditing>
                                        <DxToolbar>
                                            <DxItem location="after" template="button-template"
                                                css-class="cell-button-add" />
                                        </DxToolbar>
                                        <template #button-template>
                                            <DxButton icon="plus" @click="addRow" />
                                        </template>
                                        <DxColumn data-field="No" :allow-editing="false" :width="50" caption="#"
                                            cell-template="indexCell" />
                                        <template #indexCell="{ data }">
                                            <div>{{ data.rowIndex + 1 }}</div>
                                        </template>
                                        <DxColumn data-field="name" caption="사업명 (중복불가)" />
                                        <DxColumn data-field="facilityBizType" caption="사업분류">
                                            <DxLookup :data-source="facilityBizType" value-expr="v" display-expr="n" />
                                        </DxColumn>
                                        <DxColumn data-field="startYearMonth" caption="서비스시작년월" data-type="date"
                                            :format="'yyyy-MM'" />
                                        <DxColumn data-field="capacity" caption="정원수 (명)" />
                                        <DxColumn caption="회계서비스이용료" cell-template="totalPrice" data-type="number" />
                                        <template #totalPrice="{ data }">
                                            {{ $filters.formatCurrency(getTotalAmount(data.data)) }}
                                        </template>
                                    </DxDataGrid>
                                    <DxDataGrid v-else id="gridContainer" :show-borders="true" ref="gridRefName"
                                        disabled="true">
                                        <DxEditing :use-icons="true" :allow-adding="true">
                                        </DxEditing>
                                        <DxColumn :allow-editing="false" :width="50" caption="#" />
                                        <DxColumn caption="사업명 (중복불가)" />
                                        <DxColumn caption="사업분류"></DxColumn>
                                        <DxColumn caption="서비스시작년월" />
                                        <DxColumn caption="정원수 (명)" />
                                        <DxColumn caption="회계서비스이용료" />
                                    </DxDataGrid>
                                    <a-row :gutter="24" class="data-row-accounting" v-if="dataSource.length" :key="resetFormNum">
                                        <a-col :span="6.5">
                                            <div class="custom-money">
                                                <a-form-item label="사업분류" class="red">
                                                    <select-box-common style="float:right" :arrSelect="facilityBizType"
                                                        :required="true" :width="120"
                                                        v-model:valueInput="dataActiveRow.facilityBizType"
                                                        :value-expr="'v'" :display-expr="'n'" />
                                                </a-form-item>
                                            </div>
                                            <div class="custom-money">
                                                <a-form-item label="사업명 (중복불가) " class="red">
                                                    <default-text-box style="float:right" :width="120" :required="true"
                                                        v-model:valueInput="dataActiveRow.name" />
                                                </a-form-item>
                                            </div>
                                            <div class="custom-money">
                                                <a-form-item label="서비스 시작년월" class="red">
                                                    <month-picker-box style="float:right" width="120px" :required="true"
                                                        v-model:valueDate="dataActiveRow.startYearMonth" />
                                                </a-form-item>
                                            </div>
                                            <div class="custom-money">
                                                <a-form-item label="정원수" class="red">
                                                    <number-box style="float:right" :width="120" :required="true"
                                                        v-model:valueInput="dataActiveRow.capacity" />
                                                </a-form-item>
                                            </div>
                                            <div class="custom-money">
                                                <a-form-item label="장기요양기관등록번호" class="red">
                                                    <default-text-box style="float:right" :width="120" :required="true"
                                                        v-model:valueInput="dataActiveRow.longTermCareInstitutionNumber" />
                                                </a-form-item>
                                            </div>
                                        </a-col>
                                        <a-col :span="6.5">
                                            <a-form-item label="회계서비스 이용료:" style=" font-weight: bold">
                                                <p class="input-disble" :id="'price-' + dataActiveRow.name">
                                                    {{
        $filters.formatCurrency(getTotalAmount(dataActiveRow))
}}
                                                </p>
                                            </a-form-item>
                                            <div class="custom-money">
                                                <a-form-item label="기본이용료">
                                                    <number-box-money style="float:right" :width="135"
                                                        v-model:valueInput="dataActiveRow.price" :spinButtons="false" />
                                                </a-form-item>
                                            </div>
                                            <div class="custom-money">
                                                <DxCheckBox :value="checkOption(dataActiveRow.options, 1)" text="입력대행"
                                                    class="custom-checkbox"
                                                    @value-changed="changeChecked($event.value, 1, dataActiveRow)" />
                                                <DxNumberBox :format="'#,###'" :min="0"
                                                    :value="getPriceOption(dataActiveRow.options, 1)"
                                                    :disabled="disableInput(dataActiveRow.options, 1)"
                                                    @keyDown="changeValueInput($event.component, 1, dataActiveRow)" />
                                            </div>
                                            <div class="custom-money">
                                                <DxCheckBox :value="checkOption(dataActiveRow.options, 2)" text="계좌통합"
                                                    class="custom-checkbox"
                                                    @value-changed="changeChecked($event.value, 2, dataActiveRow)" />
                                                <DxNumberBox :format="'#,###'" :min="0"
                                                    :value="getPriceOption(dataActiveRow.options, 2)"
                                                    :disabled="disableInput(dataActiveRow.options, 2)"
                                                    @keyDown="changeValueInput($event.component, 2, dataActiveRow)" />
                                            </div>
                                            <div class="custom-money">
                                                <DxCheckBox :value="checkOption(dataActiveRow.options, 3)" text="W4C"
                                                    class="custom-checkbox"
                                                    @value-changed="changeChecked($event.value, 3, dataActiveRow)" />
                                                <DxNumberBox :min="0" :format="'#,###'"
                                                    :value="getPriceOption(dataActiveRow.options, 3)"
                                                    :disabled="disableInput(dataActiveRow.options, 3)"
                                                    @keyDown="changeValueInput($event.component, 3, dataActiveRow)" />
                                            </div>
                                        </a-col>
                                        <a-col :span="11" style="padding-right: 0;">
                                            <div style="display: flex;">
                                                <imgUpload :title="'사업자등록증'" style="width: 100px;"
                                                    @update-img="getImgUrl($event, dataActiveRow)" :customrow="1" />
                                                <div>
                                                    <preview-image :height="'250px'" :activePreview="true"
                                                        :dataImage="dataActiveRow.registrationCard"
                                                        :name="dataActiveRow.name" @deleteImg="removeImg" />
                                                </div>
                                            </div>
                                        </a-col>
                                    </a-row>
                                </div>
                                <hr />
                                <a-row>
                                    <a-col :span="14">
                                        <a-form-item label="원천서비스" style="font-weight: bold"
                                            class="custom-label-select">
                                            <checkbox-basic v-model:valueCheckbox="formState.info.usedWithholding"
                                                :disabled="false" size="14" label="원천서비스 신청" />
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <a-row v-if="formState.info.usedWithholding">
                                    <a-col :span="14">
                                        <a-form-item label="서비스 시작년월" class="custom-label-select red">
                                            <month-picker-box width="150px" :required="true"
                                                v-model:valueDate="formState.info.withholding.startYearMonth" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="14">
                                        <a-form-item label="직 원 수 " class="custom-label-select red">
                                            <number-box-money width="150px" :min="0" :required="true"
                                                v-model:valueInput="formState.info.withholding.capacity"
                                                :spinButtons="false" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="14">
                                        <a-form-item label="원천서비스 이용료:" style="font-weight: bold;"
                                            class="custom-label-select">
                                            <p class="input-disble" style="width: 328px;">
                                                {{ $filters.formatCurrency(totalWithholdingService) }}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="14">
                                        <div style="display: flex; padding-left: 120px">
                                            <span style="width: 180px; line-height: 33px;">기본이용료</span>
                                            <number-box-money :min="0" width="180px"
                                                v-model:valueInput="formState.info.withholding.price"
                                                :spinButtons="false" />
                                        </div>
                                    </a-col>
                                    <a-coll :span="8"></a-coll>
                                    <a-col :span="14">
                                        <div class="custom-service" style="">
                                            <checkbox-basic style="width: 180px"
                                                v-model:valueCheckbox="withholdingServiceType" size="14" label="4대보험"
                                                @change="handleInputTexService" />
                                            <number-box-money :min="0"
                                                v-model:valueInput="formState.info.withholding.options[0].price"
                                                :disabled="!withholdingServiceType" width="180px"
                                                :spinButtons="false" />
                                        </div>
                                    </a-col>
                                </a-row>
                            </div>
                        </a-collapse-panel>
                        <a-collapse-panel key="2" header="담당매니저/ 영업자">
                            <a-form-item label="담당매니저" class="custom-label-select">
                                <div style="width: 200px">
                                    <list-manager-dropdown v-model:valueInput="formState.extra.manageUserId" />
                                </div>
                            </a-form-item>
                            <a-form-item label="영업자" class="custom-label-select">
                                <div style="width: 200px">
                                    <list-sales-dropdown v-model:valueInput="formState.extra.salesRepresentativeId" />
                                </div>
                            </a-form-item>
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
                                                {{ dayjs(text.updatedAt).format("YYYY/MM/DD") }} 게시
                                                {{ dayjs(text.createdAt).format("YYYY/MM/DD") }}
                                            </div>
                                            <div v-if="index == 0">
                                                <PlusSquareOutlined :style="{ fontSize: '25px' }" @click="handleAdd" />
                                            </div>
                                        </div>
                                        <div class="text-area-box-custom">
                                            <text-area-box placeholder="전달사항입력" v-model:valueInput="text.memo" />
                                        </div>
                                        <a-space :size="8" style="margin-top: 7px">
                                            <SaveOutlined :style="{ fontSize: '20px' }"
                                                @click="handleAddMemo(text.memo, text.memoId)" />
                                            <DeleteOutlined :style="{ fontSize: '20px' }"
                                                @click="handleDeleteMemo(text.memoId)" />
                                        </a-space>
                                    </div>
                                </template>
                            </a-table>
                        </a-collapse-panel>
                    </a-collapse>
                    <div class="footer">
                        <button-basic text="그냥 나가기" type="default" mode="outlined" @onClick="setModalVisible" />
                        <button-basic text="저장하고 나가기" type="default" mode="contained"
                            @onClick="actionUpdateServiceContract" />
                    </div>
                </a-spin>
            </standard-form>
        </a-modal>
    </div>
</template>
<script lang="ts">
import {
    AccountingAdditionalServiceType,
    WithholdingAdditionalServiceType,
} from "@bankda/jangbuda-common";
import { FacilityBizType } from "@bankda/jangbuda-common";
import { ref, defineComponent, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import imgUpload from "@/components/UploadImage.vue";
import DxNumberBox from "devextreme-vue/number-box";
import { DxCheckBox } from 'devextreme-vue/check-box';
import comfirmClosePopup from '@/utils/comfirmClosePopup';
import { DxDataGrid, DxColumn, DxEditing, DxLookup, DxToolbar, DxItem, DxTexts } from "devextreme-vue/data-grid";
import { DxButton } from "devextreme-vue/button";
import { DeleteOutlined, PlusSquareOutlined, SaveOutlined } from "@ant-design/icons-vue";
import queries from "@/graphql/queries/BF/BF3/BF330/index";
import mutations from "@/graphql/mutations/BF/BF3/BF330/index";
import dayjs from "dayjs";
import { initialState, initialFormStateMomes } from "../utils/index"
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from '@/utils/notification';
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxEditing, DxLookup, DxButton, DxToolbar, DxItem, DxNumberBox, DxTexts, DxCheckBox, DeleteOutlined, PlusSquareOutlined, imgUpload, SaveOutlined
    },
    props: {
        modalStatus: Boolean,
        idRowEdit: {
            type: Number,
            default: null,
        },
    },
    setup(props, { emit }) {
        // config grid
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const facilityBizType = FacilityBizType.all();
        const activeKey = ref([1]);
        const dataQuery = ref();
        const dataQueryMemos = ref();
        const gridRefName: any = ref("grid");

        const loading = ref<boolean>(false);
        let trigger = ref<boolean>(false);
        let objDataDefault = reactive({ ...initialState });

        const formStateMomes = ref([{ ...initialFormStateMomes }]);
        const formState: any = reactive({ ...initialState });
        const resetFormNum = ref(1);
        const dataSource = ref([]);
        const dataActiveRow = ref<any>( JSON.parse(JSON.stringify({...initialState.info.accounting[0]})) )
        const withholdingServiceType = ref(false)
        const rowIndex = ref<number>(0);
        const focusedRowKey = ref(0)
        // ============ GRAPQL ===============================
        // get service contract
        const { result } = useQuery(
            queries.getServiceContract,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
        // get list memo of company
        const { result: resultMemo, refetch: refetchMemo } = useQuery(
            queries.getServiceContractManageMemos,
            dataQueryMemos,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
        // mutation create memo
        const {
            mutate: actionCreateMemo,
            onError: onErrorMemo,
            onDone: onCreatedMemo,
        } = useMutation(mutations.createServiceContractManageMemo);
        onCreatedMemo((res) => {
            refetchMemo();
            notification('success', "매모 추가 완료")
        });
        onErrorMemo((res: any) => {
            notification('error', res.message)
        })
        // mutation update memo
        const { mutate: actionUpdateMemo, onError: errUpdateMemo, onDone: onUpdatedMemo } = useMutation(
            mutations.updateServiceContractManageMemo
        );
        errUpdateMemo((res: any) => {
            notification('error', res.message)
        })
        onUpdatedMemo(() => {
            refetchMemo();
        });
        // mutation delete memo
        const { mutate: actionDeleteMemo, onError: errDeleteMemo, onDone: onDeleteMemo } = useMutation(
            mutations.deleteServiceContractManageMemo
        );
        errDeleteMemo((res: any) => {
            notification('error', res.message)
        })
        onDeleteMemo(() => {
            refetchMemo();
        });
        // Update Service Contract
        const {
            mutate: actionUpdate,
            loading: loadingUpdate,
            onDone: updateDone,
            onError: errUpdateContract
        } = useMutation(mutations.updateServiceContract);
        errUpdateContract((res) => {
            notification('error', res.message)
        })
        updateDone((res) => {
            notification('success', "업데이트 완료!")
            emit("closePopup", false)
        });

        // ========== WATCH ============================
        // process data after call getServiceContract api
        watch(result, (value) => {
            if (value.getServiceContract) {
                let data = JSON.parse(
                    JSON.stringify(value.getServiceContract, (name, val) => {
                        if (
                            name === "__typename"
                        ) {
                            delete val[name];
                        } else {
                            return val;
                        }
                    })
                );
                formState.id = data.id;
                formState.info = data.usedServiceInfo;
                formState.info.usedAccounting = data.usedAccounting;
                formState.info.usedWithholding = data.usedWithholding;
                formState.extra.salesRepresentativeId = data.salesRepresentativeId;
                formState.extra.manageUserId = data.manageUserId;
                if (formState.info.withholding.options[0]?.withholdingServiceType) {
                    withholdingServiceType.value = true
                }
                dataSource.value = formState.info.accounting?.map((item: any, key: any) => {
                    return {
                        ...item, rowIndex: key
                    }
                })
                dataActiveRow.value = dataSource.value[0]
            }
            setTimeout(() => {
                objDataDefault = JSON.parse(JSON.stringify({ ...formState }))
            }, 1000);
        });

        watch(() => formState.info.usedAccounting, (value) => {
            if (value) {
                getTotalAccounting()
            } else {
                dataSource.value = []
                formState.info.accountingPrice = 0
            }
        })
        watch(() => formState.info.usedWithholding, (value) => {
            if (value) {
                if (formState.id) {
                    formState.info.withholdingPrice = formState.info.withholding.price + formState.info.withholding.options[0]?.price
                }
            } else {
                formState.info.withholdingPrice = 0
            }
        })
        watch(resultMemo, (value) => {
            if (value && value.getServiceContractManageMemos.length > 0) {
                formStateMomes.value = value.getServiceContractManageMemos;
            }
        });
        watch(() => props.modalStatus, (newValue) => {
            trigger.value = true;
            if (newValue) {
                dataQuery.value = { id: props.idRowEdit };
                dataQueryMemos.value = { companyId: props.idRowEdit };
                refetchMemo();
            } else {
                formStateMomes.value = [{ ...initialFormStateMomes }];
                Object.assign(formState, initialState);
                trigger.value = false;
            }
        });

        // ============= FUNCTION ==============================
        const setModalVisible = () => {
            if (JSON.stringify(objDataDefault) === JSON.stringify(formState) == false)
                comfirmClosePopup(() => emit("closePopup", false))
            else
                emit("closePopup", false)
        };

        const handleAdd = () => {
            formStateMomes.value.unshift({ ...initialFormStateMomes });
        };
        const handleAddMemo = (note: any, mmId: any = null) => {
            if (note !== "" && mmId == null) {
                actionCreateMemo({ companyId: formState.id, memo: note });
            } else {
                actionUpdateMemo({ companyId: formState.id, memo: note, memoId: mmId });
            }
        };
        const handleDeleteMemo = (key: number) => {
            if (formStateMomes.value.length > 1) {
                actionDeleteMemo({ companyId: formState.id, memoId: key });
            }
        };

        const actionUpdateServiceContract = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                var variables = JSON.parse(JSON.stringify({ ...formState }));
                if (variables.info.usedAccounting) {
                    variables.info.accounting = [...dataSource.value]
                    variables.info.accounting.map((value: any, key: any) => {
                        value.facilityBusinessId = key + 1
                        delete value.registrationCard
                        delete value.rowIndex
                    })
                } else {
                    delete variables.info.accounting
                }
                if (!variables.info.usedWithholding) {
                    delete variables.info.withholding
                }
                actionUpdate(variables);
            }
        };

        const totalWithholdingService = computed(() => {
            let ttwithholdingPrice = 0
            if (formState.id) {
                ttwithholdingPrice = formState.info.withholding.price + formState.info.withholding.options[0]?.price
            }
            formState.info.withholdingPrice = ttwithholdingPrice
            return ttwithholdingPrice
        });
        const getTotalAmount = (data: any) => {
            let totalAmount = 0
            if (data.options) {
                data.options?.map((e: any) => {
                    totalAmount += parseInt(e.price)
                })
                totalAmount += parseInt(data.price)
            }
            getTotalAccounting()
            return totalAmount
        }
        const getTotalAccounting = () => {
            let price = 0
            dataSource.value.map((value: any) => {
                value.options?.map((data: any) => {
                    price += data.price
                })
                price += value.price ? value.price : 0
            })
            formState.info.accountingPrice = price
        }
        // Thay đổi giá trị option 
        const changeValueInput = (event: any, indexOP: any, val: any) => {
            setTimeout(() => {
                // Tìm options đang thay đổi để update dữ liệu mới
                dataActiveRow.value.options?.map((k: any) => {
                    if (indexOP == k.accountingServiceType) {
                        k.price = event._parsedValue
                    }
                })
            }, 100);
        }
        // Thay đổi trạng thái ô checkbox của  options
        const changeChecked = (valChange: any, optionChange: number, valOJ: any) => {
            // nếu checked thì thêm dòng mới trong mảng options để lưu giá trị
            if (valChange == true) {
                if (dataActiveRow.value.facilityBusinessId == valOJ.facilityBusinessId) {
                    if (!dataActiveRow.value.options?.find((val: any) => val.accountingServiceType === optionChange)) {
                        dataActiveRow.value.options.push({
                            accountingServiceType: optionChange,
                            price: 0
                        })
                    }
                }
            }
            // nếu unchecked thì xóa dòng đó trong options
            else {
                setTimeout(() => {
                    let arr: any = reactive({})
                    dataActiveRow.value.options = dataActiveRow.value.options?.filter((k: any) => {
                        return k.accountingServiceType !== optionChange;
                    });
                    arr = dataActiveRow.value
                    getPriceOption(arr.options, optionChange)
                }, 100);
            }
        }
        // Lấy số tiền trong option đang thay đổi
        const getPriceOption = (arr: any, value: number) => {
            let price = 0
            if (arr) {
                arr.map((e: any) => {
                    if (e.accountingServiceType == value) {
                        price = e.price
                    }
                })
            }
            return price
        }
        // disable input khi unchecked
        const disableInput = (arr: any, value: number) => {
            let checked = ref(true)
            if (arr) {
                arr.map((e: any) => {
                    if (e.accountingServiceType == value) {
                        checked.value = false
                    }
                })
            }
            return checked.value
        }
        // Kiểm tra checked của option ban đầu
        const checkOption = (arr: any, value: number) => {
            let count = 0
            if (arr) {
                arr.map((e: any) => {
                    if (e.accountingServiceType == value) {
                        count = 1
                    }
                })
            }
            if (count == 0) {
                return false
            } else {
                return true
            }
        }
        // lấy img sau khi upload
        const getImgUrl = (img: any, data: any) => {
            data.registrationCardFileStorageId = img.id
            data.registrationCard = {
                url: img.url,
                name: img.fileName
            }
        }
        const handleInputTexService = () => {
            if (!withholdingServiceType.value) {
                formState.info.withholding.options[0].price = 0
            }
        }
        const removeImg = () => {
            dataActiveRow.value.registrationCard = null
            dataActiveRow.value.registrationCardFileStorageId = null
        };

        const addRow = () => {
            gridRefName.value.instance.addRow()
            gridRefName.value.instance.closeEditCell()
            setTimeout(() => {
                let keyNew = gridRefName.value.instance.getKeyByRowIndex(dataSource.value.length - 1);
                focusedRowKey.value = keyNew;
            }, 100);
        };
        const removingRow = (data: any) => {
            if (data.data.rowIndex == rowIndex.value) {
                rowIndex.value = 0
            }
        }
        const onFocusedRowChanged = (e: any) => {
            resetFormNum.value++;
            const data = e.row && e.row.data;
            dataActiveRow.value = data
        }
        const onInitRow = (e: any) => {
            e.data = JSON.parse(JSON.stringify({...initialState.info.accounting[0]}));
            dataActiveRow.value = e.data
        }

        return {
            handleInputTexService,
            move_column,
            colomn_resize,
            getImgUrl,
            checkOption,
            disableInput,
            getPriceOption,
            changeChecked,
            changeValueInput,
            getTotalAmount,
            setModalVisible,
            loading,
            activeKey,
            formState,
            removeImg,
            facilityBizType,
            formStateMomes,
            handleAdd,
            handleDeleteMemo,
            handleAddMemo,
            actionUpdateServiceContract,
            loadingUpdate,
            totalWithholdingService,
            addRow,
            gridRefName,
            rowIndex,
            withholdingServiceType,
            dayjs,
            focusedRowKey,
            removingRow,
            onFocusedRowChanged,
            dataSource,
            dataActiveRow,
            onInitRow,
            resetFormNum,
        };
    },
});
</script>  





<style src="../style/stylePopup.scss" scoped />
