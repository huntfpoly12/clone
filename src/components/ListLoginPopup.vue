<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" :title="title" centered @cancel="setModalVisible()" :mask-closable="false"
            width="50%">
            <a-spin :spinning="loadingCM110">
                <DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataTableShow" :show-borders="true" key-expr="index"
                :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <DxScrolling mode="standard" show-scrollbar="always"/>
                    <DxColumn data-field="createdAt" caption="기록일시" cell-template="creactedAt" data-type="text"/>
                    <template #creactedAt="{ data }"> 
                        {{ formarDate(data.value) }}
                    </template>

                    <DxColumn data-field="success" caption="성공여부" cell-template="tag-login" css-class="cell-center" />
                    <template #tag-login="{ data }">
                        <a-tag :color="getColorTag(data.value)" style="width:65px">
                            {{ data.value == true? "성공" : "실패"}}
                        </a-tag>
                    </template>
                    <DxColumn data-field="status" caption="응답상태" />
                    <DxColumn data-field="cause" caption="오류메세지" />
                    <DxColumn data-field="message" caption="오류시스템메세지" />
                    <DxColumn data-field="ip" caption="IP주소" />
                </DxDataGrid>
            </a-spin>

            <template #footer>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed } from 'vue'
import { useStore } from "vuex";
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxScrolling
} from "devextreme-vue/data-grid";
import queries from "../../src/graphql/queries/common/index";
import { useQuery } from "@vue/apollo-composable";
import dayjs from 'dayjs';
import { companyId } from "@/helpers/commonFunction"
export default defineComponent({
    props: ['modalStatus', 'title', 'idRowEdit', 'typeHistory', 'companyId'],
    components: {
        DxDataGrid,
        DxColumn,
        DxPaging, 
        DxScrolling
    },

    setup(props) {
        let trigger110 = ref<boolean>(false);
        const dataTableShow = ref([]);
        const dataQuery = ref()

        // config grid
        const store = useStore();
        
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);

        watch(() => props.modalStatus, async (newValue, old) => {
            if (props.idRowEdit && newValue) {
                await (dataQuery.value = {
                    companyId: companyId,
                    userId: props.idRowEdit,
                    filter: {
                        page: 1,
                        rows: per_page
                    }
                })
                await (trigger110.value = true)
            }
        })

        // get getUserLogs  110
        const { result: resultCM110, loading: loadingCM110 } = useQuery(
            queries.getMyCompanyAuthentications,
            dataQuery,
            () => ({
                enabled: trigger110.value,
                fetchPolicy: "no-cache",
            })
        );

        watch(resultCM110, (value) => {
            trigger110.value = false;
            let data: any = []
            value.getMyCompanyAuthentications.datas.map((val: any, index: any) => {
                data.push({
                    ...val,
                    index: index
                })
            })
            dataTableShow.value = data;

        });

        const formarDate = (date: any) => {
            return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
        };



        return {
            dataTableShow,
            loadingCM110,
            move_column,
            colomn_resize,
            formarDate,
        }
    },
    methods: {
        setModalVisible() {
            this.$emit('closePopup', false)
        },
        getColorTag(data: boolean) {
            if (data === true) {
                return "rgb(16 142 236 / 62%)";
            } else if (data === false) {
                return "rgb(205 32 31 / 51%)";
            }
        },
    }
})
</script>
<style lang="css" scoped>
.cell-center {
    text-align: center !important
}

::v-deep .ant-tag {
    width: 65px;
}
</style>
