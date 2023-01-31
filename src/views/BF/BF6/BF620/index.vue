<template>
  <action-header title="계약정보관리&심사" />
  <div id="bf-620" class="px-10">
    <a-tabs v-model:activeKey="activeKey" type="card" class="tab-group mt-10">
      <template #rightExtra>
        <div class="btn-action">
          <a-tooltip color="black">
            <template #title>삭제</template>
            <a-button class="ml-4" @click="search('tab1')">
              <SearchOutlined />
            </a-button>
          </a-tooltip>
        </div>
      </template>
      <a-tab-pane key="1" tab="원천세">
        <tab-1-component></tab-1-component>
      </a-tab-pane>
      <a-tab-pane key="2" tab="지방소득세">
        <tab-2-component></tab-2-component>
      </a-tab-pane>
      <a-tab-pane key="3" tab="전자신고파일제작내역">
        <tab-3-component></tab-3-component>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import Tab1Component from './components/Tab1Component.vue';
import Tab2Component from './Components/Tab2Component.vue';
import Tab3Component from './Components/Tab3Component.vue';
export default defineComponent({
  components: {
    Tab1Component,
    Tab2Component,
    Tab3Component,
    SearchOutlined,
  },
  setup() {
    const activeKey = ref<String>('1');
    const search = (tabName: string) => { };

    return {
      activeKey,
      search,
    };
  },
});
</script>
<style scoped lang="scss" src="./style/style.scss">

</style>