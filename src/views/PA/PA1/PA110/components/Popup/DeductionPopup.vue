<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="600">
        <div class="custom-modal">
            <div class="text-center">
                <h3>공제 재계산 결과</h3>
                <DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true" :data-source="showData"
                    allow-column-resizing="false" :show-borders="true" :column-auto-width="true"
                    :onRowPrepared="changeColorRow">
                    <!-- <DxScrolling mode="standard" show-scrollbar="always"/> -->
                    <DxColumn caption="항목" data-field="name" width="200" />
                    <DxColumn caption="계산후" data-field="amountNew" width="180" format="fixedPoint" />
                    <DxColumn caption="원본" data-field="amount" width="180" format="fixedPoint" />
                </DxDataGrid>
            </div>
        </div>
        <div class="text-center mt-40">
            <button-basic :text="'적용'" :width="140" :type="'default'" :mode="'contained'"
                @onClick="onSubmit" />
        </div>
    </a-modal>
</template>

<script lang="ts">
import { DxDataGrid, DxScrolling, DxColumn } from "devextreme-vue/data-grid"
import { defineComponent, watch, ref } from 'vue'
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Array,
            default: []
        },

    },
    components: {
        DxDataGrid, DxScrolling,
        DxColumn
    },
    setup(props, { emit }) {
        const showData = ref<any>([])
        watch(() => props.modalStatus, (value) => {
            if (value) {
                showData.value = props.data?.filter((val: any) => {
                    if ([1001, 1002, 1003, 1004, 1011, 1012].includes(val.itemCode))
                        return true
                })
            } else {
                showData.value = []
            }
        })
        const setModalVisible = () => {
            emit("closePopup", false)
        };
        const onSubmit = (e: any) => {
            emit("updateData", true)
            emit("closePopup", false)
        };
        const changeColorRow = (e: any) => {
            if (e.data) {
                if (e.data.amount == e.data.amountNew) {
                    e.rowElement.style.color = 'black';
                } else {
                    e.rowElement.style.color = 'red';
                }
                e.cells[0].cellElement.style.color = 'black';
                e.cells[2].cellElement.style.color = 'black';
            }
        }

        return {
            setModalVisible,
            onSubmit,
            changeColorRow,
            showData
        }
    },
})
</script>

<style lang="scss" scoped>
.custom-modal {
    display: flex;
    // width: 100%;
    justify-content: center;
    margin-top: 20px;

    .title {
        background-color: #e6f7ff;
    }
}

.text-align-left {
    text-align: left;
}

.button-form-modal {
    margin: 0px 5px;
}
</style>
