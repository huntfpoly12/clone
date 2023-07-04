<template>
  <action-header title="기타소득자등록" @actionSave="false" :buttonSave="false" />
  <div class="page-content" id="announcement-user">
    <a-tabs v-model:activeKey="activeKey" type="card" class="tab-group mt-10">
      <a-tab-pane :key="1" tab="최신글" >
        <Tab1 @activeKey="actionActiveKey"/>
      </a-tab-pane>
      <a-tab-pane :key="2" tab="알림" >
        <Tab2 />
      </a-tab-pane>
      <a-tab-pane :key="3" tab="문의" >
        <Tab3 />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Tab1 from "./components/Tab1.vue"
import Tab2 from "./components/Tab2.vue";
import Tab3 from "./components/Tab3.vue";
export default defineComponent({
  components: {
    Tab1, Tab2, Tab3
  },
  setup() {
    const activeKey = ref<number>(1);
    const dataRow = ref(null)
    const actionActiveKey = (key: number) => {
      console.log(key);
      
      activeKey.value = key
    }
    return {
      actionActiveKey,
      activeKey, dataRow
    }
  }
});
</script>

<style scoped></style>
