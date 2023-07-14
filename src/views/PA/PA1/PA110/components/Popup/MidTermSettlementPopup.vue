<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="600">
        <div class="custom-modal">
            <div class="text-center">
                <h3>중도퇴사자정산 결과</h3>
                <!-- <div>
                    <table class="table text-align-left">
                        <tr class="title">
                            <th>항목 </th>
                            <th>중도퇴사자정산 결과 </th>
                            <th>원본</th>
                        </tr>
                        <tr>
                            <td>중도정산 소득세</td>
                            <td>{new-intermidiate}</td>
                            <td>old-intermidiate</td>
                        </tr>
                        <tr>
                            <td>중도정산 지방소득세</td>
                            <td>{new-intermidiateLocal}</td>
                            <td>{old-intermidiateLocal}</td>
                        </tr>
                    </table>
                </div> -->
                <DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true" :data-source="data.data"
                    allow-column-resizing="false" :show-borders="true" :column-auto-width="true"
                    :onRowPrepared="changeColorRow">
                    <!-- <DxScrolling mode="standard" show-scrollbar="always"/> -->
                    <DxColumn caption="항목" data-field="name" width="200" />
                    <DxColumn caption="중도퇴사자정산 결과" data-field="amountNew" format="fixedPoint" />
                    <!-- <DxColumn caption="원본" data-field="amount" width="180" format="fixedPoint" /> -->
                </DxDataGrid>
            </div>
        </div>
        <div class="text-center mt-40">
            <button-basic :text="'반영'" :width="140" :type="'default'" :mode="'contained'"
                @onClick="onSubmit" />
        </div>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { useStore } from "vuex";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid"
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA1/PA110/index";
import { Message } from "@/configs/enum";
import notification from "@/utils/notification";
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object,
            default: {}
        },
        emailUserLogin: {
            type: String,
            default: ""
        }
    },
    components: {
        DxDataGrid,
        DxColumn
    },
    setup(props, { emit }) {
        const store = useStore();
        const {
            mutate: actionSaveMidTermSettlement,
            onError: errorSaveMidTermSettlement,
            onDone: successSaveMidTermSettlement,
        } = useMutation(mutations.saveMidTermSettlement);
        errorSaveMidTermSettlement((e) => {
            //notification('error', e.message)
        });
        successSaveMidTermSettlement((e) => {
            notification("success", Message.getMessage("COMMON", "106").message);
            emit("closePopup", false);
            store.state.common.pa110.dataIncomeIdBackend = store.state.common.pa110.incomeId
			store.state.common.pa110.statusClickButtonSave = true;
            store.state.common.pa110.loadingTableInfo++;
        });

        const setModalVisible = () => {
            emit("closePopup", false)
        };
        const onSubmit = (e: any) => {
            let dataSaveMidTermSettlement = { ...props.data }
            delete dataSaveMidTermSettlement.data
            actionSaveMidTermSettlement(dataSaveMidTermSettlement)
        };
        const changeColorRow = (e: any) => {
            // if (e.data) {
            //     if (e.data.amount == e.data.amountNew) {
            //         e.rowElement.style.color = 'black';
            //     } else {
            //         e.rowElement.style.color = 'red';
            //     }
            //     e.cells[0].cellElement.style.color = 'black';
            //     e.cells[2].cellElement.style.color = 'black';
            // }
        }


        return {
            setModalVisible,
            onSubmit,
            changeColorRow,
        }
    },
})
</script>

<style lang="scss">
.custom-modal {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 20px;

    .table,
    th,
    td {
        border: 1px solid gray;
        padding: 5px 10px;
        width: 500px;
    }

    .title {
        background-color: #e6f7ff;
    }
}

.text-align-left {
    text-align: left;
}
</style>