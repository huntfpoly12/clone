<template>
    <a-spin :spinning="false" size="large"> 
        <div id="pa-520" class="page-content">
            <a-tabs v-model:activeKey="activeKey" type="card">
                <a-tab-pane key="1" tab="기본" class="tab1">
                    <Tab1Component :idRowEdit="idRowEdit" @closePopup="setModalVisible" @editRowKey="activeRowKey"
                        :actionSave="actionSave" />
                </a-tab-pane>
                <a-tab-pane key="2" tab="급여/공제">
                    <Tab2Component :idRowEdit="idRowEdit" @closePopup="setModalVisible" :actionSave="actionSave" />
                </a-tab-pane>
            </a-tabs>
        </div>
    </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { DxSelectBox } from 'devextreme-vue/select-box';
import Tab1Component from "./ComponentEdit/Tab1Component.vue";
import Tab2Component from "./ComponentEdit/Tab2Component.vue";
export default defineComponent({
    components: {
        DxSelectBox,
        Tab2Component,
        Tab1Component,
    },
    props: {
        modalStatus: Boolean,
        idRowEdit: Number,
        actionSave: Number

    },
    setup(props, { emit }) { 
        // ============ FUNCTION ============================= 
        const setModalVisible = () => {
            emit('closePopup', false)
        }
        const activeKey = ref()
        watch(() => props.idRowEdit, (value) => {
            if (value) {
                activeKey.value = '1'
            }
        })

        const activeRowKey = (id: any) => {
            emit("editRowKey", id)
        }

        return {
            activeRowKey,
            setModalVisible,
            activeKey,
        };
    },
});
</script> 
<style lang="scss" scoped src="../style/popupAddNew.scss" >

</style>
