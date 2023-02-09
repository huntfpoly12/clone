<template>
    <a-modal :visible="modalStatus" footer="" :mask-closable="false" title="" okText="네. 발송합니다" cancelText="아니요"
        width="950px" @cancel="setModalVisible">
        <div class="form-table">
            <a-spin :spinning="loading">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                key-expr="electronicFilingId" class="mt-10" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true">
                <DxColumn caption="코드명" data-field="fileStorageId" data-type="string" />
                <DxColumn caption="신고구분" data-field="reportType" data-type="string" />
                <DxColumn caption="제작요청일시" data-field="productionRequestedAt" data-type="date"
                    format="yyyy-MM-dd hh:mm" />
                <DxColumn caption="아이디" data-field="productionRequestUserId" data-type="string" />
                <DxColumn caption="다운로드" cell-template="actionDown" data-type="string" />
                <template #actionDown="{ data }">
                    <div style="text-align: center">
                        <img src="@/assets/images/searchPlus.png" style="width: 20px; height: 20px; margin-top: 0px;"
                            @click="openPopupDetail()" />

                    </div>
                </template>
                <DxColumn caption="제작현황" data-field="productionStatus" data-type="string" />
                <DxColumn caption="상세보기" width="80px" cell-template="actionDetail" />
                <template #action="{ data }">
                    <div style="text-align: center">
                        <img src="@/assets/images/searchPlus.png" style="width: 20px; height: 20px; margin-top: 0px;"
                            @click="openPopupDetail()" />
                    </div>
                </template>
            </DxDataGrid>
        </a-spin>
        </div>
        {{ data }}
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue"
import { useQuery } from "@vue/apollo-composable"
import queries from "@/graphql/queries/BF/BF6/BF650/index";
import notification from "@/utils/notification";
import { useStore } from 'vuex'
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
export default defineComponent({
    components: {
        DxDataGrid, DxColumn
    },
    props: {
        modalStatus: Boolean,
        data: Object
    },
    setup(props, { emit }) {
        const store = useStore()
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);

        const dataSource = ref([])
        let trigger = ref(false)
        let originData = ref({})
        const { result, loading, onError } = useQuery(queries.getCompaniesInElectronicFilingFile, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
        watch(result, (newVal: any) => {
            trigger.value = false
            dataSource.value = newVal.getCompaniesInElectronicFilingFile
        })
        watch(() => props.modalStatus, (newVal) => {
            if (newVal)
                originData.value = {
                    type: props.data?.reportType,
                    electronicFilingId: props.data?.electronicFilingId,
                }
                trigger.value = true
        })
        const setModalVisible = () => {
            emit("closePopup", true)
        }
        const openPopupDetail = () => {

        }

        return {
            setModalVisible, dataSource, openPopupDetail, loading,
            move_column, colomn_resize,
        }
    }
})
</script>  
<style scoped lang="scss">
.form-table {
    margin-top: 30px;
}
</style>