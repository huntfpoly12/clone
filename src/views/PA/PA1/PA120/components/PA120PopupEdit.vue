<template>
    <div>
        <a-modal :visible="modalStatus" title="사원등록" centered @cancel="setModalVisible()" :mask-closable="false"
            :width="1028" :footer="null" :bodyStyle="{ padding: '0px', height: '750px' }">
            <a-spin :spinning="false" size="large">
                <div id="pa-120" class="page-content">
                    <a-tabs v-model:activeKey="activeKey" type="card">
                        <a-tab-pane key="1" tab="기본" class="tab1">
                            <Tab1Component :idRowEdit="idRowEdit" :openPopup="openPopupValue"
                                @closePopup="setModalVisible" />
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
        </a-modal>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import { InfoCircleFilled } from "@ant-design/icons-vue";
import { DxSelectBox } from 'devextreme-vue/select-box';
import Tab1Component from "./componentEdit/Tab1Component.vue";
import Tab2Component from "./componentEdit/Tab2Component.vue";
import Tab3Component from "./componentEdit/Tab3Component.vue";
import { radioCheckForeigner, radioCheckHouseholder } from "../utils/index";
import comfirmClosePopup from '../../../../../utils/comfirmClosePopup';

export default defineComponent({
    components: {
        InfoCircleFilled,
        DxSelectBox,
        Tab1Component,
        Tab2Component,
        Tab3Component
    },
    props: {
        modalStatus: Boolean,
        idRowEdit: {
            type: Number
        }
    },
    setup(props, { emit }) {
        const employeeId = ref('');
        const setModalVisible = () => {
            emit('closePopup', false);
        }
        const setEmployeeId = (val: any) => {
            console.log(val);
            employeeId.value = val;
        }
        const editRow = ref()
        const openPopupValue = ref(0)

        watch(() => props.modalStatus, (value) => {
            if (value) {
                editRow.value = props.idRowEdit
                openPopupValue.value++
            }
        })
        return {
            editRow,
            setModalVisible,
            setEmployeeId,
            openPopupValue,
            employeeId,
            radioCheckForeigner,
            radioCheckHouseholder,
            activeKey: ref("1"),

        };
    },
});
</script>












<style lang="scss" scoped src="../style/popupAddNew.scss" />
