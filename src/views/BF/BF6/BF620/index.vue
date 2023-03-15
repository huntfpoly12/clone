<template>
  <action-header title="계약정보관리&심사" @actionSearch="onSearch()" :buttonDelete="false" :buttonPrint="false" :buttonSave="activeKey == '5'" />
  <div id="bf-620" class="px-10">
    <a-tabs v-model:activeKey="activeKey" type="card" class="tab-group mt-10">
      <a-tab-pane key="1" tab="원천세">
        <tab-1-component :search="search1" :onSearch="onSearch"></tab-1-component>
      </a-tab-pane>
      <a-tab-pane key="2" tab="지방소득세">
        <tab-2-component :search="search2" :onSearch="onSearch"></tab-2-component>
      </a-tab-pane>
      <a-tab-pane key="3" tab="전자신고파일제작내역">
        <tab-3-component :search="search3" :onSearch="onSearch"></tab-3-component>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import Tab1Component from './components/Tab1Component.vue';
import Tab2Component from './components/Tab2Component.vue';
import Tab3Component from './components/Tab3Component.vue';
import { useStore } from 'vuex';
export default defineComponent({
  components: {
    Tab1Component,
    Tab2Component,
    Tab3Component,
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
    onMounted(()=>{
      onSearch();
    })
    return {
      activeKey,
      onSearch,
      search1,
      search2,
      search3,
    };
  },
});
</script>
<style scoped lang="scss" src="./style/style.scss">
</style>
