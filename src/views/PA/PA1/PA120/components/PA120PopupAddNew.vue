<template>
    <div>
        <a-spin :spinning="false" size="large">
            <div id="pa-120">
                <a-tabs v-model:activeKey="activeKey" type="card">
                    <a-tab-pane key="1" tab="기본">
                        <Tab1Component :popupStatus="modalStatus" @employeeId="setEmployeeId" @setTabsStatus="setTabsStatus($event)"></Tab1Component>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="급여" :disabled="tabStatus">
                        <Tab2Component :employeeId="employeeId"></Tab2Component>
                    </a-tab-pane>
                    <a-tab-pane key="3" tab="부양가족" :disabled="tabStatus">
                        <Tab3Component :employeeId="employeeId"></Tab3Component>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-spin>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { DxSelectBox } from 'devextreme-vue/select-box';
import Tab1Component from "./componentAdd/Tab1Component.vue";
import Tab2Component from "./componentAdd/Tab2Component.vue";
import Tab3Component from "./componentAdd/Tab3Component.vue";
import { radioCheckForeigner, radioCheckHouseholder } from "../utils/index";
import comfirmClosePopup from '../../../../../utils/comfirmClosePopup';
export default defineComponent({
    components: {
        DxSelectBox,
        Tab1Component,
        Tab2Component,
        Tab3Component
    },
    props: {
        modalStatus: Boolean,
    },
    setup(props, { emit }) {
        const tabStatus = ref(true);
        const activeKey = ref("1");
        const employeeId = ref('');
        const setModalVisible = () => {
            emit('closePopup', false);
        }
        const setEmployeeId = (val: any) => {
            employeeId.value = val;
        }
        const setTabsStatus = (data : any) => {
            tabStatus.value = data;
        }
        return {
            setModalVisible,
            setEmployeeId,
            employeeId,
            radioCheckForeigner,
            radioCheckHouseholder,
            activeKey,
            tabStatus,
            setTabsStatus,
        };
    },
});
</script>




<style lang="scss" scoped src="../style/popupAddNew.scss" />