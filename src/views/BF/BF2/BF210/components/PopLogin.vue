<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" :title="title" centered @cancel="setModalVisible()" width="50%"
            :mask-closable="false">
            <DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true" :data-source="arrayLog" :show-borders="true"
            :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize">
                <DxSearchPanel :visible="true" placeholder="검색" />
                <DxToolbar>
                  <DxItem name="searchPanel" />
                </DxToolbar>
                <DxPaging :page-size="15" />
                <DxColumn data-field="createdAt" caption="기록일시" data-type="date"
                        format="yyyy-MM-dd HH:mm"/>
                <DxColumn data-field="success" caption="성공여부" cell-template="modal-table" />
                <template #modal-table="{ data }">
                    <a-tag :color="getColorTag(data.value)">{{ data.value == true ? '성공' : "실패"}}</a-tag>
                </template>
                <DxColumn data-field="status" caption="응답상태" />
                <DxColumn data-field="message" caption="오류메세지" />
                <DxColumn data-field="cause" caption="오류시스템메세지" />
                <DxColumn data-field="ip" caption="IP주소" />
            </DxDataGrid>
            <template #footer> </template>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue";
import { useStore } from 'vuex';
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxScrolling,
  DxItem,
  DxToolbar,
  DxSearchPanel
} from "devextreme-vue/data-grid";
import { ZoomInOutlined } from "@ant-design/icons-vue";
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/BF/BF2/BF210/index";
export default defineComponent({
    props: ['modalStatus', 'data', 'title', 'idRow'],
    components: {
      DxSearchPanel,
      DxToolbar, DxItem,
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxScrolling,
        ZoomInOutlined,
    },
    setup(props) {
        // config grid
        const store = useStore();

        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        let trigger = ref<boolean>(false);

        const rowTable = ref(10)
        const dataTableShow = ref({
            status: 1,
            message: "",
            cause: "",
            createdAt: "",
            ip: "",
            success: "",
        });
        const originData = ref({
            userId: 1,
            rows: 10000,
            page: 1,
        })

        let arrayLog = ref([])
        watch(() => props.modalStatus, (newVal) => {
            if (newVal) {
                originData.value.userId = props.idRow
                trigger.value = true
            }
        })

        watch(() => originData.value.page, (newVal) => {
            originData.value.userId = props.idRow
            trigger.value = true
        })
        //CHỉ viết trong setup
        const { result, refetch: refetchData, loading, error, onResult } = useQuery(queries.getAuthentications, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        onResult((res) => {
            trigger.value = false;
            rowTable.value = res.data.getAuthentications.totalCount
            arrayLog.value = res.data.getAuthentications.datas
        })

        return {
            dataTableShow,
            move_column,
            colomn_resize,
            refetchData,
            result,
            arrayLog,
            trigger,
            rowTable,
            originData
        };

    },
    methods: {
        setModalVisible() {
            this.$emit("closePopup", false);
        },
        getColorTag(data: any) {
            if (data === true) {
                return "blue";
            } else if (data === false) {
                return "#d5a7a7";
            }
        },
        changePage() {

        },
    },
});
</script>

<style scoped>
::v-deep .ant-pagination-options {
    display: none;
}
</style>
