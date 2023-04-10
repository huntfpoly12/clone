<template>
    <a-spin :spinning="false" size="large">
        <div id="pa-520" class="page-content">
            <a-tabs v-model:activeKey="activeKey" type="card">
                <a-tab-pane key="1" tab="기본" class="tab1">
                    <Tab1Component @closePopup="setModalVisible" />
                </a-tab-pane>  
                <a-tab-pane key="2" tab="급여/공제" :disabled="true"> 
                </a-tab-pane>  
            </a-tabs>
        </div>
    </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { DxSelectBox } from 'devextreme-vue/select-box';
import Tab1Component from "./ComponentAdd/Tab1Component.vue"; 
export default defineComponent({
    components: {
        DxSelectBox, 
        Tab1Component,
    },
    setup(props, { emit }) {
        // ============ FUNCTION ============================= 
        const setModalVisible = (param: any) => {
            emit('closePopup', false)
        }
    
        return {
            setModalVisible,
            activeKey: ref("1"),
        };
    },
});
</script>  
<style lang="scss" scoped src="../style/popupAddNew.scss" />
