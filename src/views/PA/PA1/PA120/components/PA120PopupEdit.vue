<template>
    <a-spin :spinning="false" size="large">
        <div id="pa-120" class="page-content">
            <a-tabs v-model:activeKey="resetTabPA120" @change="onChangeTab" type="card" :key="idRowEdit">
                <a-tab-pane key="1" tab="기본" class="tab1" >
                    <Tab1Component :idRowEdit="idRowEdit" :openPopup="openPopupValue" />
                </a-tab-pane>
                <a-tab-pane key="2" tab="급여">
                    <Tab2Component :idRowEdit="idRowEdit" />
                </a-tab-pane>
                <a-tab-pane key="3" tab="부양가족">
                    <Tab3Component :idRowEdit="idRowEdit" :openPopup="openPopupValue" />
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
    props: {
        modalStatus: {
            type: Boolean
        },
        idRowEdit: {
            type: Number
        },
        resetActiveKey: {
            type: String,
            default: '1',
        }
    },
    setup(props, { emit }) {
        const store = useStore();
        const resetTabPA120 = computed(()=>store.getters['common/resetTabPA120']);
        const activeKey = ref("2");
        watchEffect(() => activeKey.value = props.resetActiveKey);
        const isTabchange = ref(true);
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
        const onChangeTab = (e:any) => {
            store.commit('common/resetTabPA120', e)
        }
        return {
            isTabchange,
            editRow,
            setModalVisible,
            activeKey,
            openPopupValue,
            resetTabPA120,
            onChangeTab,
        };
    },
});
</script> 
<style lang="scss" scoped src="../style/popupEdit.scss" >

</style>
