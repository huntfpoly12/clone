<template>
    <div id="components-modal-demo-position">
        <a-modal v-model:visible="visible" :title="title" centered @cancel="setModalVisible()" width="1024px"
            :mask-closable="false">
            <a-spin tip="Loading..." :spinning="loadingBf320 || loadingBf340">
                <DxDataGrid :data-source="dataTableShow" :show-borders="true" key-expr="ts">
                    <DxColumn caption="기록일시" data-field="loggedAt" />
                    <DxColumn caption="비고" data-field="remark" />
                    <DxColumn caption="생성일시" data-field="createdAt" cell-template="createdAtCell" />
                    <template #createdAtCell="{ data }">
                        {{ formarDate(data.value) }}
                    </template>
                    <DxColumn caption="생성자ID" data-field="createdBy" />
                    <DxColumn caption="수정일시" data-field="updatedAt" cell-template="updatedAtCell" />
                    <template #updatedAtCell="{ data }">
                        {{ formarDate(data.value) }}
                    </template>
                    <DxColumn caption="수정자ID" data-field="updatedBy" />
                    <DxColumn caption="삭제여부" data-field="active" :width="50" />
                    <DxColumn caption="IP주소" data-field="ip" />
                    <DxColumn caption="상세" cell-template="detail" css-class="cell-center" :width="50" />
                    <template #detail="{}">
                        <a-space :size="8">
                            <a-tooltip placement="top">
                                <template #title>상세보기</template>
                                <zoom-in-outlined :style="{ fontSize: '20px' }" />
                            </a-tooltip>
                        </a-space>
                    </template>
                </DxDataGrid>

            </a-spin>
            <template #footer>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue';
import queries from "../../src/graphql/queries/common/index";
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
} from "devextreme-vue/data-grid";
import { ZoomInOutlined } from '@ant-design/icons-vue';
import { useQuery } from "@vue/apollo-composable";
import dayjs, { Dayjs } from 'dayjs';
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday);
dayjs.extend(localeData);

export default defineComponent({
    props: ['modalStatus', 'data', 'title', 'typeHistory', 'idRowEdit']
    ,
    components: {
        DxDataGrid,
        DxColumn,
        DxPaging,
        ZoomInOutlined
    },

    setup(props) {
        let visible = ref(false);
        const dataQuery = ref();
        let trigger320 = ref<boolean>(false);
        let trigger340 = ref<boolean>(false);
        const dataTableShow = ref([]);

        watch(
            () => props.modalStatus,
            (newValue, old) => {
                if (newValue) {
                    console.log(props.idRowEdit);
                    visible.value = newValue;
                    dataQuery.value = { id: props.idRowEdit };
                    switch (props.typeHistory) {
                        case 'bf-320':
                            trigger320.value = true;
                            refetchBf320();
                            break;
                        case 'bf-340':
                            trigger340.value = true;
                            refetchBf340();
                            break;
                        default:
                            break;
                    }
                } else {
                    visible.value = newValue;
                    trigger320.value = false;
                    trigger340.value = false;
                }
            }
        );
        
        // get getCompanyLogs 320
        const { result: resultBf320, loading: loadingBf320, refetch: refetchBf320 } = useQuery(
            queries.getCompanyLogs,
            dataQuery,
            () => ({
                enabled: trigger320.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultBf320, (value) => {
            if (value && value.getCompanyLogs) {

                dataTableShow.value = value.getCompanyLogs;
            }
        });

        // get getSalesRepresentativeLogs  340
        const { result: resultBf340, loading: loadingBf340, refetch: refetchBf340 } = useQuery(
            queries.getSalesRepresentativeLogs,
            dataQuery,
            () => ({
                enabled: trigger340.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultBf340, (value) => {
            if (value && value.getSalesRepresentativeLogs) {
                dataTableShow.value = value.getSalesRepresentativeLogs;
            }
        });

        const formarDate = (date: any) => {
            return dayjs(date).format('YYYY/MM/DD')
        };

        return {
            dataTableShow,
            visible,
            loadingBf320,
            loadingBf340,
            formarDate
        }
    },
    methods: {
        setModalVisible() {
            this.$emit('closePopup', false)
        }
    }
})
</script>
<style>

</style>