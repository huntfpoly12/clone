<template>
    <div class="top-content">
        <a-typography-title :level="3" style="margin-bottom: 0;"> {{ title }}
        </a-typography-title>
        <div class="list-action">
            <a-tooltip>
                <template #title>조회</template>
                <DxButton @click="actionHeader($event, 'Search')">
                    <SearchOutlined />
                </DxButton> 
            </a-tooltip>
            <a-tooltip>
                <template #title>저장</template>
                <DxButton @click="actionHeader($event, 'Save')" size="large">
                    <SaveOutlined />
                </DxButton>
            </a-tooltip>
            <a-tooltip>
                <template #title>삭제</template>
                <DxButton @click="actionHeader($event, 'Delete')" size="large">
                    <DeleteOutlined />
                </DxButton>
            </a-tooltip>
            <a-tooltip>
                <template #title>출력</template>
                <DxButton @click="actionHeader($event, 'Print')" size="large">
                    <PrinterOutlined />
                </DxButton>
            </a-tooltip>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { SearchOutlined, SaveOutlined, DeleteOutlined, PrinterOutlined } from "@ant-design/icons-vue";
import DxButton from 'devextreme-vue/button';
export default defineComponent({
    props: {
        title: {
            type: String,
        },
    },
    components: {
        SearchOutlined,
        SaveOutlined,
        DeleteOutlined,
        PrinterOutlined,
        DxButton
    },

    setup(props, { emit }) {
        const actionHeader = (event: any, method: any) => {
            emit("action" + method, event)
        }
        return {
            actionHeader,
        }
    },
});
</script>
<style lang="scss" scoped>
.dx-button-mode-contained{
    font-size: 19px;
    margin-left: 3px;
}

.top-content{
    padding: 2px 10px
}
</style>