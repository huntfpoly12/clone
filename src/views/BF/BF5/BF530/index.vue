<template>
  <action-header title="4대보험업무관리" @actionSearch="onSearch()" :buttonSearch="true" />
  <div id="bf-530" class="px-10">
    <a-tabs v-model:activeKey="activeKey" type="card" class="tab-group mt-10">
      <a-tab-pane key="1" tab="보험사무대행 신청현황 관리">
        <tab-1-component :search="search1" :onSearch="onSearch"></tab-1-component>
      </a-tab-pane>
      <a-tab-pane key="2" tab="사업장 신청현황 관리">
        <tab-2-component :search="search2" :onSearch="onSearch"></tab-2-component>
      </a-tab-pane>
      <a-tab-pane key="3" tab="사원 신청현환 관리">
        <tab-3-component :search="search3" :onSearch="onSearch"></tab-3-component>
      </a-tab-pane>
      <a-tab-pane key="4" tab="보수총액신고 신청현황 관리">
        <tab-4-component :search="search4" :onSearch="onSearch"></tab-4-component>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import Tab1Component from './components/tab1/Tab1Component.vue';
import Tab2Component from './components/tab2/Tab2Component.vue';
import Tab3Component from './components/tab3/Tab3Component.vue';
import Tab4Component from './components/Tab4Component.vue';
import { useStore } from 'vuex';
export default defineComponent({
  components: {
    Tab1Component,
    Tab2Component,
    Tab3Component,
    Tab4Component,
    SearchOutlined,
  },
  setup() {
    const activeKey = ref<string | number>('1');
    const store = useStore();
    const token = computed(() => sessionStorage.getItem('token'));
    store.dispatch('auth/getUserInfor', token.value);
    const search1 = ref<number>(1);
    const search2 = ref<number>(2);
    const search3 = ref<number>(3);
    const search4 = ref<number>(4);
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
      if (activeKey.value == 4) {
        search4.value++;
      }
    };
    onMounted(() => {
      // onSearch();
    })
    return {
      activeKey,
      onSearch,
      search1,
      search2,
      search3,
      search4,
    };
  },
});
</script>
<style scoped lang="scss" src="./style/style.scss"></style>
