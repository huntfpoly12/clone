<template>
  <div class="px-10">
    <a-tabs v-model:activeKey="activeKey" type="card" class="tab-group mt-10">
      <a-tab-pane key="1" tab="보험사무대행 신청현황 관리">
        <Tab1/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="사업장 신청현황 관리" disabled>
        <Tab2/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="사원 신청현환 관리" disabled>
        <Tab3/>

      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { InjectionKey, provide, ref } from "vue";
import Tab1 from "./components/Tab1.vue";
import Tab2 from "./components/Tab2.vue";
import Tab3 from "./components/Tab3.vue";
import { DataRow, DataRowKey, OpenRowKey } from "@/views/CommunicationBoard/type";

const activeKey = ref<string | number>('1');
const dataRow = ref<DataRow | null>(null)
const openRow = (data: DataRow) => {
  if (data.expressionType !== 3) {
    activeKey.value = '2'
  } else {
    activeKey.value = '3'
  }
  dataRow.value = data
  // console.log('%c data', 'color: red', data)
}

provide(OpenRowKey, openRow)
provide(DataRowKey, dataRow)
</script>

<style scoped>

</style>
