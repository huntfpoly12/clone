<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="1000">
        <div class="mt-30">
            <div class="text-align-center">
                <h2><b>물품내역</b></h2>
            </div>
            <standard-form ref="refFormItemAC120">
                <DxDataGrid noDataText="내역이 없습니다" class="mt-20" ref="dataGridRef" :show-row-lines="true" :data-source="dataSource"
                    :show-borders="true" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                    :column-auto-width="true">
                    <DxToolbar>
                        <DxItem location="after" template="button-add" css-class="cell-button-add" />
                    </DxToolbar>
                    <template #button-add>
                        <a-tooltip placement="top">
                            <template #title>신규</template>
                            <div>
                                <DxButton icon="plus" @click="addNewRow" />
                            </div>
                        </a-tooltip>
                    </template>
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxColumn caption="품목" cell-template="item" width="140" />
                    <template #item="{ data }">
                        <custom-item-select-box v-model:valueInput="data.data.item" :arrSelect="arrSelectItem"
                            :required="true" />
                    </template>
                    <DxColumn caption="규격" cell-template="standard" width="140" />
                    <template #standard="{ data }">
                        <custom-item-select-box v-model:valueInput="data.data.standard" :arrSelect="arrSelectStandard"
                            :required="true" />
                    </template>
                    <DxColumn caption="단위" cell-template="unit" width="140" />
                    <template #unit="{ data }">
                        <custom-item-select-box v-model:valueInput="data.data.unit" :arrSelect="arrSelectUnit"
                            :required="true" />
                    </template>
                    <DxColumn caption="수량" cell-template="quantity" width="90" />
                    <template #quantity="{ data }">
                        <number-box-money v-model:valueInput="data.data.quantity"
                            @changeInput="changeInput('quantity', data.rowIndex)" :required="true" height="26" />
                    </template>
                    <DxColumn caption="단가" cell-template="unitPrice" width="90" />
                    <template #unitPrice="{ data }">
                        <number-box-money v-model:valueInput="data.data.unitPrice"
                            @changeInput="changeInput('unitPrice', data.rowIndex)" :required="true" height="26" />
                    </template>
                    <DxColumn caption="금액" cell-template="amount" />
                    <template #amount="{ data }">
                        <number-box-money v-model:valueInput="data.data.amount"
                            @changeInput="changeInput('amount', data.rowIndex)" :required="true" height="26" />
                    </template>
                    <DxColumn caption="비고" cell-template="remark" width="100" />
                    <template #remark="{ data }">
                        <default-text-box v-model:valueInput="data.data.remark" />
                    </template>
                    <DxColumn caption="삭제" cell-template="action" alignment="center" width="50" />
                    <template #action="{ data }">
                        <DeleteOutlined style="font-size: 12px" @click="deleteItem(data.data)" />
                    </template>
                    <DxSummary :recalculate-while-editing="true">
                        <DxTotalItem column="품목" summary-type="count" display-format="전체: {0}건" />
                        <!-- <DxTotalItem column="금액" summary-type="sum" display-format="금액합계: {0}원" value-format="#,###"/> -->
                        <DxTotalItem column="금액" cssClass="refTotalValue" :customize-text="customSumAmount" />
                        <DxTotalItem cssClass="custom-sumary refTotalDifference" column="비고" :customize-text="checkAlone" />
                    </DxSummary>
                </DxDataGrid>
            </standard-form>
        </div>
        <div class="btn_submit text-align-center mt-20">
            <button-basic :disabled="disabledSubmit" @onClick="onSubmit" class="button-form-modal" :text="'저장'"
                :type="'default'" :mode="'contained'" />
        </div>
        <PopupMessage :modalStatus="isModalDelete" @closePopup="isModalDelete = false" :typeModal="'confirm'"
            :title="Message.getMessage('AC110', '005').message" content="" :okText="Message.getMessage('AC110', '005').yes"
            :cancelText="Message.getMessage('AC110', '005').no" @checkConfirm="handleDelete" />
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import { useStore } from 'vuex';
import { dataDemoMain } from '../utils/index'
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxToolbar, DxEditing, DxPaging, DxTexts, DxLookup } from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { EditOutlined, HistoryOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import { useMutation } from '@vue/apollo-composable';
import mutations from "@/graphql/mutations/AC/AC1/AC120";
import DxNumberBox from "devextreme-vue/number-box";
import { companyId } from "@/helpers/commonFunction";
import notification from '@/utils/notification';
import { Message } from "@/configs/enum"
import { initStatementOfGoods } from '../utils/index'
import filters from "@/helpers/filters";
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        DxRequiredRule, DxNumberBox,
        DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DeleteOutlined, DxButton, DxToolbar, DxEditing, DxPaging, DxTexts, DxLookup,
    },

    setup(props, { emit }) {
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
        const globalFacilityBizId = ref<number>(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));
        // const gridRef = ref(); // ref of grid
        const dataGridRef: any = ref(); // ref of grid Instance
        const focusedRowKey = ref(0)
        let arrSelectItem: any = ref([])
        let arrSelectStandard: any = ref([])
        let arrSelectUnit: any = ref([])
        const dataSource = ref<any>([])
        let dataDelete: any = ref({})
        const refFormItemAC120 = ref()
        let isModalDelete = ref(false)
        const disabledSubmit = ref(false)
        // =================== GRAPHQL ===================
        // mutation deleteStatementOfGoods    
        const {
            mutate: mutateDeleteStatementOfGoods, onDone: doneDeleteStatementOfGoods, onError: errorDeleteStatementOfGoods,
        } = useMutation(mutations.deleteStatementOfGoods);
        // mutation deleteStatementOfGoods    
        const {
            mutate: mutateSaveStatementOfGoods, onDone: doneSaveStatementOfGoods, onError: errorSaveStatementOfGoods,
        } = useMutation(mutations.saveStatementOfGoods);

        // ============== ON DONE MUTATION GRAPHQL ===============
        // DeleteStatementOfGoods
        doneDeleteStatementOfGoods((e) => {
            store.state.common.ac120.statusKeppRow = true;
            store.state.common.ac120.resetDataTable++
            emit("closePopup", false)
            notification('success', Message.getMessage('COMMON', '106').message)
        })
        errorDeleteStatementOfGoods(e => {
            notification('error', e.message)
        })

        // SaveStatementOfGoods
        doneSaveStatementOfGoods((e) => {
            store.state.common.ac120.statusKeppRow = true;
            notification('success', Message.getMessage('COMMON', '106').message)
            store.state.common.ac120.resetDataTable++
            emit("closePopup", false)
        })
        errorSaveStatementOfGoods(e => {
            notification('error', e.message)
        })

        // ================== WATCH ================
        watch(() => props.modalStatus, async (newValue, old) => {
            if (newValue) {
                dataSource.value = store.state.common.ac120.formData?.statementOfGoodsItems?.map((item: any, index: number) => {
                    return {
                        ...item,
                        id: index
                    }
                })
                await setDataSelect()
            }
        })

        // ================ FUNCTION ============================================
        const setDataSelect = () => {
            dataSource.value?.forEach((item: any, index: number) => {
                if (!!item.item && !arrSelectItem.value.some((option: any) => option.value === item.item.toString().trim())) {
                    arrSelectItem.value = [...arrSelectItem.value, { id: index, value: item.item.toString().trim() }]
                }
                if (!!item.standard && !arrSelectStandard.value.some((option: any) => option.value === item.standard.toString().trim())) {
                    arrSelectStandard.value = [...arrSelectStandard.value, { id: index, value: item.standard.toString().trim() }]
                }
                if (!!item.unit && !arrSelectUnit.value.some((option: any) => option.value === item.unit.toString().trim())) {
                    arrSelectUnit.value = [...arrSelectUnit.value, { id: index, value: item.unit.toString().trim() }]
                }
            })
        }
        const cancel = () => {
            emit("closePopup", false)
        };
        const addNewRow = async () => {
            if (dataSource.value?.length) {
                dataSource.value = [...dataSource.value, { ...initStatementOfGoods, id: dataSource.value[dataSource.value.length - 1].id + 'create' }]
            } else {
                dataSource.value = [{ ...initStatementOfGoods, id: 'create' }]
            }
            await setDataSelect()
        }

        const deleteItem = (data: any) => {
            isModalDelete.value = true
            dataDelete.value = data
        }
        const handleDelete = (status: Boolean) => {
            if (status) {
                dataSource.value = dataSource.value.filter((item: any) => item.id !== dataDelete.value.id)
                if (!store.state.common.ac120.statusFormAdd && dataSource.value.length == 0) { // status update = true and 1 data left
                    isModalDelete.value
                    mutateDeleteStatementOfGoods({
                        companyId: companyId,
                        fiscalYear: acYear.value,
                        facilityBusinessId: globalFacilityBizId.value,
                        transactionDetailDate: store.state.common.ac120.transactionDetailDate,
                        accountingDocumentId: store.state.common.ac120.formData.accountingDocumentId,
                    })
                }
            }
            
        }
        const onSubmit = (e: any) => {
            const res = refFormItemAC120.value?.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                let dataItem = dataSource.value
                dataItem.map((value: any) => {
                    if (!value.remark) {
                        delete value.remark;
                    }
                    delete value.id;
                    delete value.__typename;
                    return value;
                })
                if (!store.state.common.ac120.statusFormAdd) { // status update = true
                    if (dataSource.value.length) {
                        let dataSave = {
                            companyId: companyId,
                            fiscalYear: acYear.value,
                            facilityBusinessId: globalFacilityBizId.value,
                            transactionDetailDate: store.state.common.ac120.transactionDetailDate,
                            accountingDocumentId: store.state.common.ac120.formData.accountingDocumentId,
                            items: dataItem
                        }
                        mutateSaveStatementOfGoods(dataSave)
                    }
                } else {
                    store.state.common.ac120.formData.statementOfGoodsItems = dataItem
                    emit("closePopup", false)
                }
            }
        }
        const changeInput = (key: string, index: number) => {
            if (key != 'amount') {
                const dataTotalValue = dataSource.value[index].quantity
                const dataTotalDifference = dataSource.value[index].unitPrice
                dataSource.value[index].amount = dataTotalValue * dataTotalDifference
            }
            const elTotalValue: any = document.querySelector('.refTotalValue')
            const elTotalDifference: any = document.querySelector('.refTotalDifference')

            elTotalValue.textContent = customSumAmount()
            elTotalDifference.textContent = checkAlone()

        }

        const customSumAmount = () => {
            let total = 0
            dataSource.value?.map((item: any) => {
                total += item.amount
            })
            return `금액합계: ${filters.formatCurrency(total)} 원`
        }
        const checkAlone = () => {
            let total = 0
            dataSource.value?.map((item: any) => {
                total += item.amount
            })
            let totalShow = store.state.common.ac120.formData?.spending - total
            if (totalShow === 0) {
                disabledSubmit.value = true
            } else {
                disabledSubmit.value = false
            }
            return `차액: ` + filters.formatCurrency(totalShow)
        }
        return {
            move_column,
            colomn_resize,
            dataDemoMain,
            cancel,
            deleteItem,
            dataSource,
            changeInput,
            customSumAmount,
            addNewRow, dataGridRef,
            // onInitRow,
            focusedRowKey,
            onSubmit,
            arrSelectItem,
            arrSelectStandard,
            arrSelectUnit,
            refFormItemAC120,
            isModalDelete, checkAlone,
            Message,
            handleDelete,
            disabledSubmit,
        }
    },
})
</script>

<style lang="scss" scoped>
.ac-120-popup-registrantion-selected {
    &-form {
        &-input {
            display: flex;
            align-items: center;

            span {
                margin-left: 5px;
            }
        }
    }
}

.text-align-center {
    text-align: center;
}

.button-form-modal {
    margin: 0px 5px;
}

.mr-10 {
    margin-right: 10px;
}

.mt-10 {
    margin-top: 10px;
}

:deep .dx-datagrid-rowsview .dx-row>td,
.dx-datagrid-rowsview .dx-row>tr>td {
    overflow: unset;
}</style>
