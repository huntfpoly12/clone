<template>
    <a-spin :spinning="false" size="large">
        <div id="pa-120" class="page-content">
            <a-tabs v-model:activeKey="activeTabEditKeyPA120" @change="onChangeTab" type="card">
                <a-tab-pane key="1" tab="기본" class="tab1" forceRender>
                    <Tab1Component  />
                </a-tab-pane>
                <a-tab-pane key="2" tab="급여" forceRender>
                    <Tab2Component  />
                </a-tab-pane>
                <a-tab-pane key="3" tab="부양가족" >
                    <Tab3Component  />
                </a-tab-pane>
            </a-tabs>
        </div>
    </a-spin>

</template>
<script lang="ts">
import { computed, defineComponent, ref, watch, watchEffect } from "vue";
import { DxSelectBox } from 'devextreme-vue/select-box';
import Tab1Component from "./componentEdit/Tab1Component.vue";
import Tab2Component from "./componentEdit/Tab2Component.vue";
import Tab3Component from "./componentEdit/Tab3Component.vue";
import {useStore} from "vuex";
export default defineComponent({
    components: {
        DxSelectBox,
        Tab2Component,
        Tab1Component,
        Tab3Component,
    },
    setup(props, { emit }) {
        const store = useStore();
        store.commit("common/activeTabEditKeyPA120", "1");
        const activeTabEditKeyPA120 = computed(()=>store.state.common.activeTabEditKeyPA120);
        const setModalVisible = () => {
            emit('closePopup', false)
        }
        const onChangeTab = (e:any) => {
            store.commit('common/activeTabEditKeyPA120', e)
        }
        return {
            setModalVisible,
            activeTabEditKeyPA120,
            onChangeTab,
        };
    },
});
</script> 
<style lang="scss" scoped src="../style/popupEdit.scss" >

</style>
