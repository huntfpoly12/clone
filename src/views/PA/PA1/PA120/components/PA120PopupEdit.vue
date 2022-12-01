<template>

    <a-spin :spinning="false" size="large">
        <div id="pa-120" class="page-content">
            <a-tabs v-model:activeKey="activeKey" type="card">
                <a-tab-pane key="1" tab="기본" class="tab1">
                    <Tab1Component :idRowEdit="idRowEdit" :openPopup="openPopupValue" @closePopup="setModalVisible" />
                </a-tab-pane>
                <a-tab-pane key="2" tab="급여">
                    <Tab2Component />
                </a-tab-pane>
                <a-tab-pane key="3" tab="부양가족">
                    <Tab3Component :idRowEdit="idRowEdit" :openPopup="openPopupValue" />
                </a-tab-pane>
            </a-tabs>
        </div>
    </a-spin>

</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { DxSelectBox } from 'devextreme-vue/select-box';
import Tab1Component from "./componentEdit/Tab1Component.vue";
import Tab2Component from "./componentEdit/Tab2Component.vue";
import Tab3Component from "./componentEdit/Tab3Component.vue";
export default defineComponent({
    components: {
        DxSelectBox,
        Tab2Component,
        Tab1Component,
        Tab3Component,
    },
    props: {
        modalStatus: {
            type: Boolean
        },
        idRowEdit: {
            type: Number
        }
    },
    setup(props, { emit }) {
        // ============ FUNCTION ============================= 
        const setModalVisible = () => {
            emit('closePopup', false)
        }
        const openPopupValue = ref(0)
        const editRow = ref()
        watch(() => props.modalStatus, (value) => {
            if (value) {
                editRow.value = props.idRowEdit
                openPopupValue.value++
            }
        })
        return {
            editRow,
            setModalVisible,
            activeKey: ref("1"),
            openPopupValue,
        };
    },
});
</script> 
<style lang="scss" scoped src="../style/popupEdit.scss" >

</style>
