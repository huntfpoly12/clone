<template>
  <action-header title="소통판" @actionSearch="onSearch" :buttonSearch="true" />
  <div class="px-10 mt-10">
    <a-tabs v-model:activeKey="activeKey" type="card" class="tab-group mt-10">
      <a-tab-pane key="1" tab="최신글">
        <Tab1/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="문의">
        <Tab2/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="알림">
        <Tab3/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import {provide, ref} from "vue";
import Tab1 from "./components/Tab1.vue";
import Tab2 from "./components/Tab2.vue";
import Tab3 from "./components/Tab3.vue";
import {DataRowKey, MessageDetail, OpenRowKey} from "@/views/CommunicationBoard/type";

const activeKey = ref<string | number>('3');
const dataRow = ref<MessageDetail | null>(null)
const openRow = (data: MessageDetail) => {
  if (data.expresstionType === 1) {
    window.open(`/ac-130`)
    return
  }
  if (data.expresstionType !== 4) {
    activeKey.value = '2'
  } else {
    activeKey.value = '3'
  }
  dataRow.value = data
  // console.log('%c data', 'color: red', data)
}
const onSearch = () => {
  console.log('%c onSearch', 'color: red')
}
provide(OpenRowKey, openRow)
provide(DataRowKey, dataRow)

</script>

<style scoped>

</style>
