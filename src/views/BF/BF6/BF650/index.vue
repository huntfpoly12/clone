<template>
    <action-header title="계약정보관리&심사" @actionSearch="searching" />
    <div id="bf-650">
        <div class="page-content">
            <a-tabs v-model:activeKey="activeKey" type="card">
                <a-tab-pane key="1" tab="일용근로소득지급명세서전자신고">
                    <Tab1 :searchStep="searchStep1" />
                </a-tab-pane>
                <a-tab-pane key="2" tab="전자신고파일제작내역">
                    <Tab2 :searchStep="searchStep2" />
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Tab1 from "./components/Tab1Component.vue";
import Tab2 from "./components/Tab2Component.vue";
import { useStore } from 'vuex'
export default defineComponent({
    components: {
        Tab1,
        Tab2,
    },
    setup() {
        const store = useStore();
        const token = computed(() => sessionStorage.getItem("token"))
        store.dispatch('auth/getUserInfor', token.value);
        let activeKey = ref('1')
        let searchStep1 = ref(0)
        let searchStep2 = ref(0)
        const searching = () => {
            if (activeKey.value == '1')
                searchStep1.value++
            else if (activeKey.value == '2')
                searchStep2.value++

        }
        return {
            activeKey,
            searchStep1, 
            searchStep2,
            searching,
        }
    }
})
</script>
<style scoped lang="scss" src="./style/style.scss">

</style>