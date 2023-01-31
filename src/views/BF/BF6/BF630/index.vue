<template>
    <div id="bf-630" style="padding: 10px;">
      <a-tabs v-model:activeKey="activeKey" type="card">
        <template #rightExtra>
              <div class="list-action">
                  <div v-if="activeKey == '1'">
                    <div class="btn-action">
                          <a-tooltip  color="black">
                              <template #title>삭제</template>
                              <a-button class="ml-4" @click="search('tab1')">
                                  <SearchOutlined />
                              </a-button>
                          </a-tooltip>
                      </div>
                  </div>
                  <div v-if="activeKey == '2'">
                      <div class="btn-action">
                          <a-tooltip  color="black">
                              <template #title>삭제</template>
                              <a-button class="ml-4" @click="search('tab2')">
                                  <SearchOutlined />
                              </a-button>
                          </a-tooltip>
                      </div>
                  </div>
                  <div v-if="activeKey == '3'">
                    <div class="btn-action">
                          <a-tooltip  color="black">
                              <template #title>삭제</template>
                              <a-button class="ml-4" @click="search('tab3')">
                                  <SearchOutlined />
                              </a-button>
                          </a-tooltip>
                      </div>
                  </div>
                  <div v-if="activeKey == '4'">
                    <div class="btn-action">
                          <a-tooltip  color="black">
                              <template #title>삭제</template>
                              <DxButton @click="search('tab4')">
                                  <SearchOutlined />
                              </DxButton>
                          </a-tooltip>
                      </div>
                  </div>
                  <div v-if="activeKey == '5'">
                    <div class="btn-action">
                          <a-tooltip  color="black">
                              <template #title>삭제</template>
                              <a-button class="ml-4" @click="search('tab5')">
                                  <SearchOutlined />
                              </a-button>
                          </a-tooltip>
                      </div>
                  </div>
              </div>
          </template>
          <a-tab-pane key="1" tab="근로소득지급명세서(기부금, 의료비)">
            <tab-1-component :activeSearch="activeSearch1"></tab-1-component>
          </a-tab-pane>
          <a-tab-pane key="2" tab="퇴직소득지급명세서">
            <tab-2-component :activeSearch="activeSearch2"></tab-2-component>
          </a-tab-pane>
          <a-tab-pane key="3" tab="거주자사업소득지급명세서">
            <tab-3-component :activeSearch="activeSearch3"></tab-3-component>
          </a-tab-pane>
          <a-tab-pane key="4" tab="거주자기타소득지급명세서">
            <tab-4-component :activeSearch="activeSearch4"></tab-4-component>
          </a-tab-pane>
          <a-tab-pane key="5" tab="전자신고파일제작내역">
            <tab-5-component :activeSearch="activeSearch5"></tab-5-component>
          </a-tab-pane>
      </a-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
    SearchOutlined,
} from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import Tab1Component from "./Components/Tab1Component.vue";
import Tab2Component from "./Components/Tab2Component.vue";
import Tab3Component from "./Components/Tab3Component.vue";
import Tab4Component from "./Components/Tab4Component.vue";
import Tab5Component from "./Components/Tab5Component.vue";

export default defineComponent({
    components: {
      SearchOutlined,
      Tab1Component,
      Tab2Component,
      Tab3Component,
      Tab4Component,
      Tab5Component,
      DxButton
    },
    setup() {
      const activeKey = ref("1")
      const activeSearch1 = ref(0)
      const activeSearch2 = ref(0)
      const activeSearch3 = ref(0)
      const activeSearch4 = ref(0)
      const activeSearch5 = ref(0)

      const search = (tabName: string) => {
        switch (tabName) {
          case 'tab1':
            activeSearch1.value++
            break;
          case 'tab2':
            activeSearch2.value++
            break;
          case 'tab3':
            activeSearch3.value++
            break;
          case 'tab4':
            activeSearch4.value++
            break;
          case 'tab5':
            activeSearch5.value++
            break;
          default:
            break;
        }
      }
      return {
        activeKey,
        search,
        activeSearch1,
        activeSearch2,
        activeSearch3,
        activeSearch4,
        activeSearch5,
      }
    }
})
</script>
<style scoped lang="scss" src="./style/style.scss">

</style>
