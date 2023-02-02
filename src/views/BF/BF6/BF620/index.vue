<template>
  <action-header title="계약정보관리&심사" />
  <div id="bf-620" class="px-10">
    <a-tabs v-model:activeKey="activeKey" type="card" class="tab-group mt-10">
      <template #rightExtra>
        <div class="btn-action">
          <a-tooltip color="black">
            <template #title>삭제</template>
            <a-button class="ml-4" @click="onSearch()">
              <SearchOutlined />
            </a-button>
          </a-tooltip>
        </div>
      </template>
      <!-- <a-tab-pane key="1" tab="원천세">
        <tab-1-component :search="search1"></tab-1-component>
      </a-tab-pane> -->
      <!-- <a-tab-pane key="2" tab="지방소득세">
        <tab-2-component :search="search2"></tab-2-component>
      </a-tab-pane> -->
      <!-- <a-tab-pane key="3" tab="전자신고파일제작내역">
        <tab-3-component :search="search3"></tab-3-component>
      </a-tab-pane> -->
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
// import Tab1Component from './components/Tab1Component.vue';
// import Tab2Component from './Components/Tab2Component.vue';
// import Tab3Component from './Components/Tab3Component.vue';
export default defineComponent({
  components: {
    // Tab1Component,
    // Tab2Component,
    // Tab3Component,
    SearchOutlined,
  },
  setup() {
    const activeKey = ref<string|number>('1');
    const search1 = ref<number>(1);
    const search2 = ref<number>(1);
    const search3 = ref<number>(1);
    const onSearch = () => {
        if(activeKey.value == 1) {
            search1.value ++;
        }
        if(activeKey.value == 1) {
            search2.value ++;
        }
        if(activeKey.value == 1) {
            search3.value ++;
        }
    };

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