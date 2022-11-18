<template>
    <div class="top-content">
        <a-typography-title :level="3"> {{ title }}
        </a-typography-title>
        <div class="list-action">
            <a-tooltip>
                <template #title>조회</template>
                <a-button @click="actionHeader('Search')">
                    <SearchOutlined />
                </a-button>
            </a-tooltip>
            <a-tooltip>
                <template #title>저장</template>
                <a-button @click="actionHeader('Save')">
                    <SaveOutlined />
                </a-button>
            </a-tooltip>
            <a-tooltip>
                <template #title>삭제</template>
                <a-button @click="actionHeader('Delete')">
                    <DeleteOutlined />
                </a-button>
            </a-tooltip>
            <a-tooltip>
                <template #title>출력</template>
                <a-button @click="actionHeader('Print')">
                    <PrinterOutlined />
                </a-button>
            </a-tooltip>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { SearchOutlined, SaveOutlined, DeleteOutlined, PrinterOutlined } from "@ant-design/icons-vue";
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
        PrinterOutlined
    },

    setup(props, { emit }) {
        const actionHeader = (method: any) => {
            emit("action" + method, true)
        }
        return {
            actionHeader,
        }
    },
});
</script>
