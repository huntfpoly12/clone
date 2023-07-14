<template>
  <action-header title="소통판" @actionSearch="searching" :buttonSearch="true" />
  <div class="px-10 mt-10 wrap-tab">
    <a-tabs v-model:activeKey="activeKey" type="card" class="tab-group mt-10">
      <a-tab-pane key="1" tab="최신글">
        <Tab1 ref="tab1"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="문의">
        <Tab2 ref="tab2"/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="알림" >
        <Tab3 ref="tab3"/>
      </a-tab-pane>

    </a-tabs>
    <div>
      <DxButton class="custom-button" type="normal" @click="reload">
        <ReloadOutlined />
      </DxButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import {DataRowKeyTab2, DataRowKeyTab3, MessageDetail, MessageDetailAnswer, NodeNotification, OpenRowKey} from "./type";
import {provide, ref} from "vue";
import Tab1 from "./components/Tab1.vue";
import Tab2 from "./components/Tab2.vue";
import Tab3 from "./components/Tab3.vue";
import {ReloadOutlined} from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import { computed } from "vue";

const activeKey = ref<string | number>('1');
const dataRowTab2 = ref<MessageDetail | null>(null)
const dataRowTab3 = ref<MessageDetailAnswer | null>(null)

const tab3 = ref<InstanceType<typeof Tab3> | null>(null)
const tab2 = ref<InstanceType<typeof Tab2> | null>(null)
const tab1 = ref<InstanceType<typeof Tab1> | null>(null)

const openRow = (data: MessageDetail | MessageDetailAnswer | NodeNotification) => {
  if (data.expresstionType !== 4) {
    activeKey.value = '2'
    dataRowTab2.value = data as MessageDetail
  } else {
    activeKey.value = '3'
    dataRowTab3.value = data as MessageDetailAnswer
  }
}
const topCss = computed(() => activeKey.value === '1' ? '46px' : '70px')
const searching = () => {
  if (activeKey.value === '2') {
    tab2.value?.refetchDataTab2()
  } else if (activeKey.value === '3') {
    tab3.value?.refetchDataTab3()
  }
}
const reload = () => {
  switch (activeKey.value) {
    case '1':
      tab1.value?.reloadDetail()
      break
    case '2':
      tab2.value?.reloadDetail()
      break
    case '3':
      tab3.value?.reloadDetail()
      break
  }
}
provide(OpenRowKey, openRow)
provide(DataRowKeyTab2, dataRowTab2)
provide(DataRowKeyTab3, dataRowTab3)
</script>

<style lang="scss" scoped>
.wrap-tab {
  position: relative;
  .custom-button {
    position: absolute;
    top: v-bind(topCss);
    right: 25px;
    z-index: 10;
  }
}
</style>
