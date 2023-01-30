<template>
    <action-header title="계약정보관리&심사" />
    <div id="bf-640">
        <div class="page-content">
            <a-tabs v-model:activeKey="activeKey" type="card">
                <a-tab-pane key="1" tab="근로소득">
                    <Tab1 />
                </a-tab-pane>
                <a-tab-pane key="2" tab="거주자의사업소득">
                    <Tab2 />
                </a-tab-pane>
                <a-tab-pane key="3" tab="전자신고파일제작내역">
                    <Tab3 />
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Tab1 from "./components/Tab1Component.vue";
import Tab2 from "./components/Tab2Component.vue";
import Tab3 from "./components/Tab3Component.vue";
export default defineComponent({
    components: {
        Tab1,
        Tab2,
        Tab3,
    },
    setup() {
        return {
            activeKey: ref("1"),
        }
    }
})
</script>
<style scoped lang="scss" src="./style/style.scss">

</style>