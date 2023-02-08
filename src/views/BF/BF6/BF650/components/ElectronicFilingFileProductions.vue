<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="700">
        <div class="pt-10">
            <a-spin :spinning="loading" size="large">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                class="mt-10" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true">
                <DxScrolling mode="standard" show-scrollbar="always" />
                <DxColumn caption="사업자코드" data-field="code" />
                <DxColumn caption="사업자번호" data-field="bizNumber" />
                <DxColumn caption="상호" data-field="name" />
                <DxColumn caption="대표자명" data-field="presidentName" />
            </DxDataGrid>
            </a-spin>
        </div>
    </a-modal>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue"
import { useQuery } from "@vue/apollo-composable"
import { useStore } from 'vuex';
import queries from "@/graphql/queries/BF/BF6/BF650/index";
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling } from "devextreme-vue/data-grid";
export default defineComponent({
    props: {
        modalStatus: Boolean,
        data: {
            type: Object,
            required: true,
        },
        step: Number
    },
    components: {
        DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling
    },
    setup(props, { emit }) {
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear)
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        let originData = ref({
            type: props.data.type,
            electronicFilingId: props.data.electronicFilingId,
        })
        let trigger = ref(false)
        const dataSource = ref([])

        // ============ GRAPQL ===============================
        // query send request file tab 1
        const { result, loading, onError } = useQuery(queries.getCompaniesInElectronicFilingFile, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
        watch( result, (newVal: any) => {
            trigger.value = false
            
            dataSource.value = newVal.getCompaniesInElectronicFilingFile
        })

        watch(() => props.modalStatus, (newVal) => {
            if (newVal) {
                originData.value.electronicFilingId = props.data.electronicFilingId
                originData.value.type = props.data.type
                trigger.value = true
            }
        })

        const setModalVisible = () => {
            emit("closePopup", true)
        }

        return {
            globalYear,
            move_column,
            colomn_resize,
            dataSource,
            loading,
            setModalVisible
        }
    }
})
</script>   