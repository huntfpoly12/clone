<template>
  <action-header title="소통판" @actionSearch="searching" :buttonSearch="true" />
  <div class="px-10 mt-10">
    <a-tabs v-model:activeKey="activeKey" type="card" class="tab-group mt-10">
      <a-tab-pane key="1" tab="최신글">
        <Tab1/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="문의">
        <Tab2 ref="tab2"/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="알림" >
        <Tab3 ref="tab3"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import {
  DataRowKeyTab2,
  DataRowKeyTab3,
  MessageDetail,
  MessageDetailAnswer,
  OpenRowKey
} from "@/views/CommunicationBoard/type";
import {provide, ref} from "vue";
import Tab1 from "./components/Tab1.vue";
import Tab2 from "./components/Tab2.vue";
import Tab3 from "./components/Tab3.vue";

const activeKey = ref<string | number>('1');
const dataRowTab2 = ref<MessageDetail | null>(null)
const dataRowTab3 = ref<MessageDetailAnswer | null>(null)

const tab3 = ref<InstanceType<typeof Tab3> | null>(null)
const tab2 = ref<InstanceType<typeof Tab2> | null>(null)
const openRow = (data: MessageDetail | MessageDetailAnswer) => {
  if (data.expresstionType === 1) {
    window.open(`/ac-130`)
    return
  }
  if (data.expresstionType !== 4) {
    activeKey.value = '2'
    dataRowTab2.value = data as MessageDetail
  } else {
    activeKey.value = '3'
    dataRowTab3.value = data as MessageDetailAnswer
  }
}
const searching = () => {
  if (activeKey.value === '2') {
    tab2.value?.refetchDataTab2()
  } else if (activeKey.value === '3')  {
    tab3.value?.refetchDataTab3()
  }
}
provide(OpenRowKey, openRow)
provide(DataRowKeyTab2, dataRowTab2)
provide(DataRowKeyTab3, dataRowTab3)

// I want when actionSearch runs to perform an action in tab3

</script>

<style scoped>

</style>
