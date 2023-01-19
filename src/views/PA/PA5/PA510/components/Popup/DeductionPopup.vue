<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="600">
        <div class="custom-modal">
            <div class="text-align-center">
                <h3>공제 재계산 결과</h3>
                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="data"
                        :show-borders="true" :column-auto-width="true" :onRowPrepared="changeColorRow">
                        <DxScrolling mode="standard" show-scrollbar="always"/>
                        <DxColumn caption="항목" data-field="name" />
                        <DxColumn caption="계산후" data-field="priceNew" />
                        <DxColumn caption="원본" data-field="price" />
                    </DxDataGrid>
            </div>
        </div>
        <div class="text-align-center mt-40">
            <button-basic class="button-form-modal" :text="'적용'" :width="140" :type="'default'" :mode="'contained'"
                @onClick="onSubmit" />
        </div>
    </a-modal>
</template>

<script lang="ts">
import { DxDataGrid,DxScrolling, DxColumn } from "devextreme-vue/data-grid"
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
        DxDataGrid,DxScrolling,
        DxColumn
    },
    setup(props, { emit }) {
        const setModalVisible = () => {
            emit("closePopup", false)
        };
        const onSubmit = (e: any) => {
            emit("updateDate", true)
            emit("closePopup", false)
        };
        const changeColorRow = (e: any) => {
            if (e.data) {
                if (e.data.price == e.data.priceNew) {
                    e.rowElement.style.color = 'black';
                } else {
                    e.rowElement.style.color = 'red';
                }
            }
        }

        return {
            setModalVisible,
            onSubmit,
            changeColorRow,
        }
    },
})
</script>

<style lang="scss" scoped>
.custom-modal {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 20px;
    .title {
        background-color: #e6f7ff;
    }
}

.mt-40 {
    margin-top: 40px;
}

.text-align-center {
    text-align: center;
}

.text-align-left {
    text-align: left;
}

.button-form-modal {
    margin: 0px 5px;
}
</style>
