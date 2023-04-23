<template>
  <action-header title="계약정보관리&심사" @actionSearch="onSearch()" :buttonSearch="true" :buttonSave="activeKey == '5'" />
  <div id="bf-640">
    <div class="page-content">
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="근로소득">
          <Tab1 :search="search1" v-if="activeKey == 1" :onSearch="onSearch" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="거주자의사업소득">
          <Tab2 :search="search2" v-if="activeKey == 2" :onSearch="onSearch" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="전자신고파일제작내역">
          <Tab3 :search="search3" :onSearch="onSearch" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Tab1 from "./components/Tab1Component.vue";
import Tab2 from "./components/Tab2Component.vue";
import Tab3 from "./components/Tab3Component.vue";
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    Tab1,
    Tab2,
    Tab3,
  },
  setup() {
    const store = useStore();
    const token = computed(() => sessionStorage.getItem("token"))
    store.dispatch('auth/getUserInfor', token.value);
    let activeKey = ref<string | number>('1')
    const search1 = ref<number>(1);
    const search2 = ref<number>(2);
    const search3 = ref<number>(3);
    const onSearch = () => {
      if (activeKey.value == 1) {
        search1.value++;
      }
      if (activeKey.value == 2) {
        search2.value++;
      }
      if (activeKey.value == 3) {
        search3.value++;
      }
    };
    return {
      activeKey,
      onSearch,
      search1,
      search2,
      search3,
    }
  }
})
</script>
<style scoped lang="scss" src="./style/style.scss"></style>
