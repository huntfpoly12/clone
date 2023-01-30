<template>
    <div id="bf-630" style="padding: 10px;">
      <a-tabs v-model:activeKey="activeKey" type="card">
        <template #rightExtra>
              <div class="list-action">
                  <div v-if="activeKey == '1'">
                    <div class="btn-action">
                          <a-tooltip  color="black">
                              <template #title>삭제</template>
                              <a-button>
                                  <SearchOutlined />
                              </a-button>
                          </a-tooltip>
                      </div>
                  </div>
                  <div v-if="activeKey == '2'">
                      <div class="btn-action">
                          <a-tooltip  color="black">
                              <template #title>삭제</template>
                              <a-button>
                                  <SearchOutlined />
                              </a-button>
                          </a-tooltip>
                      </div>
                  </div>
                  <div v-if="activeKey == '3'">
                    <div class="btn-action">
                          <a-tooltip  color="black">
                              <template #title>삭제</template>
                              <a-button>
                                  <SearchOutlined />
                              </a-button>
                          </a-tooltip>
                      </div>
                  </div>
                  <div v-if="activeKey == '4'">
                    <div class="btn-action">
                          <a-tooltip  color="black">
                              <template #title>삭제</template>
                              <a-button>
                                  <SearchOutlined />
                              </a-button>
                          </a-tooltip>
                      </div>
                  </div>
                  <div v-if="activeKey == '5'">
                    <div class="btn-action">
                          <a-tooltip  color="black">
                              <template #title>삭제</template>
                              <a-button>
                                  <SearchOutlined />
                              </a-button>
                          </a-tooltip>
                      </div>
                  </div>
              </div>
          </template>
          <a-tab-pane key="1" tab="근로소득지급명세서(기부금, 의료비)">
            <tab-1></tab-1>
          </a-tab-pane>
          <a-tab-pane key="2" tab="퇴직소득지급명세서">
            <tab-2></tab-2>
          </a-tab-pane>
          <a-tab-pane key="3" tab="거주자사업소득지급명세서">
            <tab-3></tab-3>
          </a-tab-pane>
          <a-tab-pane key="4" tab="거주자기타소득지급명세서">
            <tab-4></tab-4>
          </a-tab-pane>
          <a-tab-pane key="5" tab="전자신고파일제작내역">
            <tab-5></tab-5>
          </a-tab-pane>
      </a-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
    SearchOutlined,
} from "@ant-design/icons-vue";
import Tab1 from "./Components/Tab1.vue";
import Tab2 from "./Components/Tab2.vue";
import Tab3 from "./Components/Tab3.vue";
import Tab4 from "./Components/Tab4.vue";
import Tab5 from "./Components/Tab5.vue";

export default defineComponent({
    components: {
      SearchOutlined,
      Tab1,
      Tab2,
      Tab3,
      Tab4,
      Tab5,
    },
    setup() {
      const activeKey = ref("1")
      return {
        activeKey
      }
    }
})
</script>
<style scoped lang="scss" src="./style/style.scss">

</style>
