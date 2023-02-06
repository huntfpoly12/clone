<template>
    <action-header title="계약정보관리&심사" @actionSearch="searching" />
    <div id="bf-650">
        <div class="page-content">
            <a-tabs v-model:activeKey="activeKey" type="card">
                <a-tab-pane key="2" tab="일용근로소득지급명세서전자신고">
                    <Tab2 :searchStep="searchStep2" />
                </a-tab-pane>
                <a-tab-pane key="3" tab="전자신고파일제작내역">
                    <Tab3 :searchStep="searchStep3" />
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Tab2 from "./components/Tab2Component.vue";
import Tab3 from "./components/Tab3Component.vue";
import { useStore } from 'vuex'
export default defineComponent({
    components: {
        Tab2,
        Tab3,
    },
    setup() {
        const store = useStore();
        const token = computed(() => sessionStorage.getItem("token"))
        store.dispatch('auth/getUserInfor', token.value);
        let activeKey = ref('2')
        let searchStep2 = ref(0)
        let searchStep3 = ref(0)
        const searching = () => {
            if (activeKey.value == '2')
                searchStep2.value++
            else if (activeKey.value == '3')
                searchStep3.value++

        }
        return {
            activeKey,
            searchStep2, 
            searchStep3,
            searching,
        }
    }
})
</script>
<style scoped lang="scss" src="./style/style.scss">

</style>