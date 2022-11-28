<template>

    <div>
        <a-spin :spinning="false" size="large">
            <div  id="pa-120">
                <a-tabs v-model:activeKey="activeKey" type="card">
                    <a-tab-pane key="1" tab="기본">
                        <Tab1Component :popupStatus="modalStatus" @employeeId="setEmployeeId"></Tab1Component>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="급여">
                        <Tab2Component :employeeId="employeeId"></Tab2Component>
                    </a-tab-pane>
                    <a-tab-pane key="3" tab="부양가족">
                        <Tab3Component></Tab3Component>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-spin>
    </div>

</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { InfoCircleFilled } from "@ant-design/icons-vue";
import { DxSelectBox } from 'devextreme-vue/select-box';
import Tab1Component from "./ComponentAdd/Tab1Component.vue";
import Tab2Component from "./ComponentAdd/Tab2Component.vue";
import Tab3Component from "./ComponentAdd/Tab3Component.vue";
export default defineComponent({
    components: {
        InfoCircleFilled,
        DxSelectBox,
        Tab2Component,
        Tab1Component,
        Tab3Component,
    },
    props: {
        modalStatus: {
            type: Boolean
        },

    },
    setup(props, { emit }) {
        // ============ FUNCTION ============================= 
        const setModalVisible = () => {
            emit('closePopup', false)
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
        };
    },
});
</script>  










<style lang="scss" scoped src="../style/popupAddNew.scss" />
