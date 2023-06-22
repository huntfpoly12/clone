<template>
  <a-spin :spinning="false" size="large">
    <div id="pa-520" class="page-content">
      <a-tabs v-model:activeKey="currentTabKey" type="card" @change="handleChangeTab">
        <a-tab-pane key="1" tab="기본" class="tab1">
          <Tab1Component :idRowEdit="idRowEdit" @closePopup="setModalVisible" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="급여/공제">
          <Tab2Component :idRowEdit="idRowEdit" @closePopup="setModalVisible" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-spin>

  <!--  xử lý popup riêng cho trường hợp chuyển tab -->
  <PopupMessage
    :modalStatus="modalConfirmChangeTab"
    typeModal="confirm"
    :content="Message.getCommonMessage('501').message"
    okText="네"
    cancelText="아니오"
    @checkConfirm="confirmSaveEdit($event,currentTabKey)"
    @closePopup="closePopupConfirmChangeTab($event,currentTabKey)"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { DxSelectBox } from 'devextreme-vue/select-box';
import Tab1Component from "./ComponentEdit/Tab1Component.vue";
import Tab2Component from "./ComponentEdit/Tab2Component.vue";
import { Message } from "@/configs/enum";
import { useStore } from 'vuex';
export default defineComponent({
  components: {
    DxSelectBox,
    Tab2Component,
    Tab1Component,
  },
  props: {
    idRowEdit: Number,
  },
  setup(props, { emit }) {
    const store = useStore();
    const tab1IsChange = computed(() => store.getters['common/checkChangeValueEditTab1PA520']);
    const tab2IsChange = computed(() => store.getters['common/checkChangeValueEditTab2PA520']);
    const modalConfirmChangeTab = ref(false);
    const currentTabKey = ref('1');

    watch(() => store.state.common.setTabActivePA520, (newVal) => {
      currentTabKey.value = newVal;
    });

    const setModalVisible = () => {
      emit('closePopup', false);
    };

    const handleChangeTab = (key : string) => {
      if (isTabChangeAllowed()) {
        currentTabKey.value = key;
      }
    };

    const isTabChangeAllowed = () => {
      if (tab1IsChange.value || tab2IsChange.value) {
        modalConfirmChangeTab.value = true;
        return false;
      }
      return true;
    };

    
    const confirmSaveEdit = async (confirmed : boolean, currentTab: string) => {
      if (confirmed) {
        if (tab1IsChange.value) {
          store.state.common.actionUpdateTab1PA520++;
        } else {
          store.state.common.actionUpdateTab2PA520++;
        }
        modalConfirmChangeTab.value = false;
        currentTabKey.value = currentTab == '1' ? '2' : '1';
      }
    };
    const closePopupConfirmChangeTab = (event: boolean, currentTab: string) => {
      currentTabKey.value = currentTab == '1' ? '2' : '1';
      modalConfirmChangeTab.value = false;
    }
    return {
      setModalVisible,
      handleChangeTab,
      Message,
      store,
      currentTabKey,
      confirmSaveEdit,
      modalConfirmChangeTab,
      closePopupConfirmChangeTab
    };
  },
});
</script>

<style lang="scss" scoped src="../style/popupAddNew.scss">

</style>
