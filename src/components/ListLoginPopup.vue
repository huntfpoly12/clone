<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" :title="title" centered @cancel="setModalVisible()" :mask-closable="false"
            width="50%">
            <a-spin tip="Loading..."
                :spinning="loadingCM110">
                <DxDataGrid :data-source="dataTableShow" :show-borders="true" key-expr="index">
                    <DxColumn data-field="createdAt" caption="기록일시" />
                    <DxColumn data-field="success" caption="성공여부" cell-template="tag-login" css-class="cell-center" />
                    <template #tag-login="{ data }">
                        <a-tag :color="getColorTag(data.value)" style="width:65px">{{ data.value == true? "성공" : "실패"
                        }}
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
import { ref, defineComponent, watch } from 'vue'
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
} from "devextreme-vue/data-grid";
import queries from "../../src/graphql/queries/common/index";
import { useQuery } from "@vue/apollo-composable";

export default defineComponent({
    props: ['modalStatus', 'data', 'title', 'idRowEdit', 'typeHistory', 'companyId'],
    components: {
        DxDataGrid,
        DxColumn,
        DxPaging
    },

    setup(props) {
        let trigger110 = ref<boolean>(false);
        const dataTableShow = ref([]);
        const dataQuery = ref({
            companyId: 29,
            userId: 13,
            filter: {
                page: 1,
                rows: 100
            }
        })

        watch(() => props.modalStatus, (newValue, old) => {
            refetchCM110();
            trigger110.value = true
        })

        // get getUserLogs  110
        const { result: resultCM110, loading: loadingCM110, refetch: refetchCM110 } = useQuery(
            queries.getMyCompanyAuthentications,
            dataQuery,
            () => ({
                enabled: trigger110.value,
                fetchPolicy: "no-cache",
            })
        );

        watch(resultCM110, (value) => {
            let data: any = []
            value.getMyCompanyAuthentications.datas.map((val: any, index: any) => {
                data.push({
                    ...val,
                    index: index
                })
            })

            dataTableShow.value = data;

        });


        return {
            dataTableShow,
            loadingCM110
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