<template>
    <a-spin :spinning="false" size="large">
        <div id="pa-520" class="page-content">
            <a-tabs v-model:activeKey="activeKey" type="card">
                <a-tab-pane key="1" tab="기본" class="tab1">
                    <Tab1Component @closePopup="setModalVisible" />
                </a-tab-pane>  
                <a-tab-pane key="2" tab="급여/공제" :disabled="isEnabledTab2"> 
                    <Tab2Component  :idRowEdit="idRowEdit" @closePopup="setModalVisible" />
                </a-tab-pane>  
            </a-tabs>
        </div>
    </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { DxSelectBox } from 'devextreme-vue/select-box';
import Tab1Component from "./ComponentAdd/Tab1Component.vue"; 
import Tab2Component from "./ComponentEdit/Tab2Component.vue"; 
export default defineComponent({
    components: {
        DxSelectBox, 
        Tab1Component,
        Tab2Component
    },
    props: {
        modalStatus: {
            type: Boolean
        },
    },
    setup(props, { emit }) {
        // ============ FUNCTION ============================= 
        const isEnabledTab2 = ref<boolean>(true);
        const idRowEdit = ref(1)
        const setModalVisible = (param: any) => {
            emit('closePopup', false)
            console.log(`output->emit`,param)
            idRowEdit.value = param;
            isEnabledTab2.value=false;
        }
        const activeComponent = ref(false)
        watch(() => props.modalStatus, (value) => {
            if (value)
                activeComponent.value = true
        })
        return {
            activeComponent,
            setModalVisible,
            activeKey: ref("1"),
            isEnabledTab2,
            idRowEdit
        };
    },
});
</script>  
<style lang="scss" scoped src="../style/popupAddNew.scss" />
