<template>
    <a-modal :visible="modalStatus" title="사원등록" centered @cancel="setModalVisible()" :mask-closable="false"
        :width="1028" :footer="null" :bodyStyle="{ padding: '0 0 50px 0' }">
        <a-spin :spinning="false" size="large">
            <div id="pa-520" class="page-content">
                <a-tabs v-model:activeKey="activeKey" type="card">
                    <a-tab-pane key="1" tab="기본" class="tab1">
                        <Tab1Component :idRowEdit="idRowEdit" />
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="급여/공제">
                        <Tab2Component />
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-spin>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { InfoCircleFilled } from "@ant-design/icons-vue";
import { DxSelectBox } from 'devextreme-vue/select-box';
import Tab1Component from "./ComponentEdit/Tab1Component.vue";
import Tab2Component from "./ComponentEdit/Tab2Component.vue";
export default defineComponent({
    components: {
        InfoCircleFilled,
        DxSelectBox,
        Tab2Component,
        Tab1Component,
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

        const editRow = ref() 
        watch(() => props.modalStatus, (value) => {
            if (value) { 
                editRow.value = props.idRowEdit 
            }
        })
        return {
            editRow, 
            setModalVisible,
            activeKey: ref("1"),
        };
    },
});
</script> 
<style lang="scss" scoped src="../style/popupAddNew.scss" >

</style>
