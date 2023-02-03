<template>
    <action-header title="계약정보관리&심사"  @actionSearch="searching(activeKey)" @actionSave="saving(activeKey)" :buttonDelete="false" :buttonPrint="false" :buttonSave="activeKey == '5'"/>
    <div id="bf-630" style="padding: 10px;">
      <a-tabs v-model:activeKey="activeKey" type="card">
          <a-tab-pane key="1" tab="근로소득지급명세서(기부금, 의료비)">
            <tab-1-component :activeSearch="activeSearch1"></tab-1-component>
          </a-tab-pane>
          <a-tab-pane key="2" tab="퇴직소득지급명세서">
            <tab-2-component :activeSearch="activeSearch2"></tab-2-component>
          </a-tab-pane>
          <a-tab-pane key="3" tab="거주자사업소득지급명세서">
            <tab-3-component :activeSearch="activeSearch3"></tab-3-component>
          </a-tab-pane>
          <a-tab-pane key="4" tab="거주자기타소득지급명세서">
            <tab-4-component :activeSearch="activeSearch4"></tab-4-component>
          </a-tab-pane>
          <a-tab-pane key="5" tab="전자신고파일제작내역">
            <tab-5-component :activeSearch="activeSearch5" :active-save="activeSavingTab5"></tab-5-component>
          </a-tab-pane>
      </a-tabs>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import {
    SearchOutlined,
} from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import Tab1Component from "./Components/Tab1Component.vue";
import Tab2Component from "./Components/Tab2Component.vue";
import Tab3Component from "./Components/Tab3Component.vue";
import Tab4Component from "./Components/Tab4Component.vue";
import Tab5Component from "./Components/Tab5Component.vue";
import { useStore } from "vuex";

export default defineComponent({
    components: {
      SearchOutlined,
      Tab1Component,
      Tab2Component,
      Tab3Component,
      Tab4Component,
      Tab5Component,
      DxButton
    },
  setup() {
      // set user infor to state vuex
      const store = useStore();
      const token = computed(()=>sessionStorage.getItem("token"))
      store.dispatch('auth/getUserInfor', token.value);
      
      const activeKey = ref("1")
      const activeSearch1 = ref(0)
      const activeSearch2 = ref(0)
      const activeSearch3 = ref(0)
      const activeSearch4 = ref(0)
      const activeSearch5 = ref(0)
      const activeSavingTab5 = ref(0)
      const searching = (tabNumber: any) => {
        switch (tabNumber) {
          case '1':
            activeSearch1.value++
            break;
          case '2':
            activeSearch2.value++
            break;
          case '3':
            activeSearch3.value++
            break;
          case '4':
            activeSearch4.value++
            break;
          case '5':
            activeSearch5.value++
            break;
          default:
            break;
        }
      }

      const saving = (tabNumber: any) => {
        activeSavingTab5.value++
      }
      return {
        activeKey,
        searching,
        saving,
        activeSearch1,
        activeSearch2,
        activeSearch3,
        activeSearch4,
        activeSearch5,
        activeSavingTab5
      }
    }
})
</script>
<style scoped lang="scss" src="./style/style.scss">

</style>
