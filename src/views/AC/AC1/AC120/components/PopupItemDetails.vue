<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="1000">
        <div class="mt-30">
            <div class="text-align-center">
                <h2><b>물품내역</b></h2>
            </div>
            {{ dataSource }}
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" @row-inserted="onRowInserted"
                ref="dataGridRef"
                :focused-row-key="focusedRowKey" :column-auto-width="true">
                <DxScrolling mode="standard" show-scrollbar="always" />
                <DxEditing :allow-adding="true" :allow-updating="true" new-row-position="pageBottom" mode="cell">
                    <DxTexts confirmDeleteMessage="삭제하겠습니까?" />
                </DxEditing>
                <!-- <DxEditing :allow-updating="true" :allow-adding="true" mode="cell" /> -->
                <!-- <DxToolbar>
                    <DxItem location="after" template="button-template" css-class="cell-button-add" />
                </DxToolbar> -->
                <!-- <template #button-template>
                    <DxButton icon="plus" @click="addRow" />
                </template> -->
                <DxColumn caption="품목" edit-cell-template="itemCustom" data-field="item">
                    <DxLookup :data-source="arraySelectBox" value-expr="value" display-expr="label" />
                    <DxRequiredRule />
                </DxColumn>
                <template #itemCustom="{ data }">
                    <select-box-common :arrSelect="arraySelectBox" v-model:valueInput="data.data.item" :required="true" />
                </template>
                <DxColumn caption="규격" data-field="standard" edit-cell-template="standard">
                    <DxLookup :data-source="arraySelectBox" value-expr="value" display-expr="label" />
                    <DxRequiredRule />
                </DxColumn>
                <template #standard="{ data }">
                    <select-box-common :arrSelect="arraySelectBox" v-model:valueInput="data.data.standard"
                        :required="true" />
                </template>
                <DxColumn caption="단위" data-field="unit" edit-cell-template="unit">
                    <DxLookup :data-source="arraySelectBox" value-expr="value" display-expr="label" />
                    <DxRequiredRule />
                </DxColumn>
                <template #unit="{ data }">
                    <select-box-common :arrSelect="arraySelectBox" v-model:valueInput="data.data.unit" :required="true" />
                </template>
                <DxColumn caption="수량" data-field="quantity" edit-cell-template="quantity">
                    <DxRequiredRule />
                </DxColumn>
                <template #quantity="{ data }">
                    <DxNumberBox v-model:value="data.data.quantity" min="0" />
                </template>

                <DxColumn caption="단가" data-field="unitPrice" edit-cell-template="unitPrice">
                    <DxRequiredRule />
                </DxColumn>
                <template #unitPrice="{ data }">
                    <DxNumberBox v-model:value="data.data.unitPrice" min="0" />
                </template>

                <DxColumn caption="금액" data-field="amount" edit-cell-template="amount">
                    <DxRequiredRule />
                </DxColumn>
                <template #amount="{ data }">
                    <DxNumberBox v-model:value="data.data.amount" min="0" />
                </template>
                <DxColumn caption="비고" data-field="remark" />
                <!-- <DxColumn caption="비고" data-field="remark" edit-cell-template="remark">
                    <DxRequiredRule />
                </DxColumn>
                <template #remark="{ data }">
                    <DxNumberBox v-model:value="data.data.remark" min="0" />
                </template> -->
                <DxColumn caption="삭제" cell-template="action" />
                <template #action="{ data }">
                    <DeleteOutlined style="font-size: 16px; width: 100%; height: 30px; line-height: 30px;"
                        @click="deleteItem(data.data)" />
                </template>

                <DxSummary>
                    <DxTotalItem column="품목" summary-type="count" display-format="전체: {0}건" />
                    <DxTotalItem column="금액" summary-type="sum" display-format="금액합계: {0}원" />
                </DxSummary>
            </DxDataGrid>

            <!-- <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="ID">
                <DxEditing :use-icons="true"
                    :select-text-on-edit-start="true" :start-edit-action="'click'" mode="batch" />
                <DxPaging :enabled="false" />
                <DxColumn caption="품목" cell-template="item" />
                <template #item="{ data }">
                    <select-box-common :arrSelect="arraySelectBox" :required="true" />
                </template>


                <DxColumn caption="규격" cell-template="standard" />
                <template #standard="{ data }">
                    <select-box-common :arrSelect="arraySelectBox" :required="true" />
                </template>
                <DxColumn caption="단위" cell-template="unit" />
                <template #unit="{ data }">
                    <select-box-common :arrSelect="arraySelectBox" :required="true" />
                </template>
                <DxColumn caption="수량" data-field="quantity"/>
                <DxColumn caption="단가" data-field="unitPrice"/>
                <DxColumn caption="금액" data-field="amount"/>
                <DxColumn caption="비고" data-field="remark"/>
                <DxColumn caption="삭제" cell-template="action" />
                <template #action="{ data }">
                    <DeleteOutlined style="font-size: 16px; width: 100%; height: 30px; line-height: 30px;"
                        @click="deleteItem(data.data)" />
                </template>
            </DxDataGrid> -->

        </div>
        <div class="btn_submit text-align-center mt-20">
            <button-basic @onClick="onSubmit" class="button-form-modal" :text="'저장'" :type="'default'"
                :mode="'contained'" />
        </div>
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
        const globalYear = computed(() => store.state.settings.globalYear)
        const globalFacilityBizId = computed(() => store.state.settings.globalFacilityBizId)
        // const gridRef = ref(); // ref of grid
        const dataGridRef: any = ref(); // ref of grid Instance
        const focusedRowKey = ref(0)
        let arraySelectBox = reactive([
            {
                value: '1',
                label: '수익사업'
            },
            {
                value: '2',
                label: '자부담'
            },
            {
                value: '3',
                label: '보조금'
            },
            {
                value: '4',
                label: '후원듬'
            }
        ])
        const dataSource = ref<any>([])
        const addRow = () => {
            // dataGridRef.value.instance.addRow();
            // dataGridRef.value.instance.deselectAll();
            dataGridRef.value.instance.addRow()
            dataGridRef.value.instance.closeEditCell()

            setTimeout(() => {
                let keyNew = dataGridRef.value.instance.getKeyByRowIndex(dataSource.value.length - 1);
                focusedRowKey.value = keyNew;
            }, 100);
        }
        const onInitRow = (e: any) => {
            // e.data = JSON.parse(JSON.stringify({ ... }));
            // dataActiveRow.value = e.data
        }

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
            notification('success', Message.getMessage('COMMON', '106').message)
        })
        errorDeleteStatementOfGoods(e => {
            notification('error', e.message)
        })

        // SaveStatementOfGoods
        doneSaveStatementOfGoods((e) => {
            notification('success', Message.getMessage('COMMON', '106').message)
        })
        errorSaveStatementOfGoods(e => {
            notification('error', e.message)
        })

        const cancel = () => {
            emit("closePopup", false)
        };
        const onRowInserted = (e: any) => {
            e.component.navigateToRow(e.key);
        }

        const deleteItem = (data: any) => {
            dataSource.value = dataSource.value.filter((item: any) => item.__KEY__ !== data.__KEY__)
            // console.log(data);
            // dataGridRef.value.instance.deleteRow(data.__KEY__)
            if (!store.state.common.ac120.formData && dataSource.length == 1) { // status update = true and 1 data left
                mutateDeleteStatementOfGoods({

                })
            }
        }
        const onSubmit = (e: any) => {
            if (!store.state.common.ac120.statusFormAdd) { // status update = true
                if (dataSource.value.length) {
                    let dataSave = {
                        companyId: companyId,
                        fiscalYear: globalYear.value,
                        facilityBusinessId: globalFacilityBizId.value,
                        transactionDetailDate: store.state.common.ac120.formData.transactionDetailDate,
                        accountingDocumentId: store.state.common.ac120.formData.accountingDocumentId,
                        items: JSON.parse(JSON.stringify(dataSource.value, (name, val) => {
                            if (
                                name === "__KEY__"
                            ) {
                                delete val[name];
                            } else {
                                return val;
                            }
                        }))
                    }
                    mutateSaveStatementOfGoods(dataSave)
                }
            }
        }
        return {
            move_column,
            colomn_resize,
            arraySelectBox,
            dataDemoMain,
            cancel,
            deleteItem,
            dataSource,
            onRowInserted,
            addRow, dataGridRef, onInitRow,
            focusedRowKey,
            onSubmit,
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
</style>
