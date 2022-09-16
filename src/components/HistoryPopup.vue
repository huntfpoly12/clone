<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" :title="title" centered
            @cancel="setModalVisible()" width="50%">
            <DxDataGrid :data-source="dataTableShow" :show-borders="true" key-expr="key">
                    <DxColumn data-field="기록일시" />
                    <DxColumn data-field="비고" />
                    <DxColumn data-field="생성일시" />
                    <DxColumn data-field="생성자ID" />
                    <DxColumn data-field="수정일시" />
                    <DxColumn data-field="수정자ID" />
                    <DxColumn data-field="삭제여부" />
                    <DxColumn data-field="IP주소" />
                    <DxColumn data-field="상세" cell-template="detail" css-class="cell-center" />
                    <template #detail="{}">
                        <a-space :size="8">
                            <a-tooltip placement="top">
                                <template #title>상세보기</template>
                                <zoom-in-outlined :style="{ fontSize: '20px' }" />
                            </a-tooltip>
                        </a-space>
                    </template>
                </DxDataGrid>
                <template #footer>
                </template>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
} from "devextreme-vue/data-grid";
import {ZoomInOutlined} from '@ant-design/icons-vue';

export default defineComponent({
    props:['modalStatus','data','title']
       ,
    components: {
        DxDataGrid,
        DxColumn,
        DxPaging,
        ZoomInOutlined
    },

    setup(props) {
        const dataTableShow = ref([
            {
                key: 0,
                기록일시: "2022-09-05 13:52:09",
                비고: "승인>사업자등록번호 등록",
                생성일시: "2022-09-05 13:52:09",
                생성자ID: "@mdo",
                수정일시: "2022-09-05 13:52:09",
                수정자ID: "@mdo",
                삭제여부: "1",
                IP주소: "123.451.342.1",
            },
        ]);

        return {
            dataTableShow
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