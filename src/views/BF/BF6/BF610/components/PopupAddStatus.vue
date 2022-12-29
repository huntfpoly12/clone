<template>
    <a-modal :visible="modalStatus" footer="" :mask-closable="false" title="소득별 마감현황" okText="저장하고 나가기"
        cancelText="그냥 나가기" @cancel="setModalVisible()" width="1200px">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
            key-expr="companyId" class="wf-100" :column-auto-width="true">

        </DxDataGrid>

    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
    props: {
        modalStatus: Boolean,
        rowId: {
            type: Number,
        },
    },
    setup(props, { emit }) {
        const dataSource = ref()
        const setModalVisible = () => {
            emit("closePopup", true)
        }
        watch(() => props.modalStatus, (newVal: any) => {
            if (newVal == true) {
                // Call api get data modal
            }

        }, { deep: true })
        return {
            dataSource,
            setModalVisible,
        }
    }
})
</script>