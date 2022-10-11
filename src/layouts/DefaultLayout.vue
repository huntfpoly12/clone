<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="nav-logo"><img src="../assets/images/logo.png" /></div>
      <div class="user-info" v-if="username">
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            {{ username }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <router-link to="/change-password">비밀번호 변경</router-link>
              </a-menu-item>
              <a-menu-item>
                <p @click="logout">Logout</p>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout-content>
      <div class="header-content">
        <div class="left">
          <a-button type="primary" @click="() => (collapsed = !collapsed)">
            <menu-unfold-outlined v-if="collapsed" class="trigger" />
            <menu-fold-outlined v-else class="trigger" />
          </a-button>
          <div class="wrap-search">
            <a-input
              v-model:value="inputSearchText"
              placeholder="메뉴를 입력해보세요"
              @keyup="onSearch($event.target.value)"
              :class="{ shown: state }"
              @click.prevent="toggleDropdown"
            />
            <div>
              <div
                class="box-search search-height"
                v-if="filteredResult.length"
                v-show="state"
              >
                <div
                  v-for="(result, resultIndex) in filteredResult"
                  :key="resultIndex"
                  class="item-search"
                  @click.prevent="toggleDropdown"
                >
                  <router-link :to="result.url">
                    {{ result.name }}
                  </router-link>
                </div>
              </div>
            </div>
            <div v-if="inputSearchText.length > 0">
              <div
                class="box-search search-height"
                v-if="filteredResult.length"
                v-show="state"
              >
                <div
                  v-for="(result, resultIndex) in filteredResult"
                  :key="resultIndex"
                  class="item-search"
                  @click.prevent="toggleDropdown"
                >
                  <router-link
                    :to="result.url"
                    @click.enter="addMenuTab(result)"
                  >
                    {{ result.id + " | " + result.name }}
                  </router-link>
                </div>
              </div>
            </div>
            <div v-if="inputSearchText.length === 0">
              <div
                class="box-search search-height"
                v-show="state"
                @click.prevent="toggleDropdown"
              >
                <div
                  v-for="result in menuData"
                  :key="result.id"
                  class="item-search"
                >
                  <router-link
                    :to="result.url"
                    @click.enter="addMenuTab(result)"
                  >
                    {{ result.id + " | " + result.name }}
                  </router-link>
                </div>
              </div>
            </div>
            <div
              v-if="filteredResult.length === 0 && inputSearchText.length"
              v-show="state"
              class="box-search search-no-data"
              @click.prevent="toggleDropdown"
            >
              No Data
            </div>
          </div>
        </div>
        <div class="right">
          <nav class="nav-tabs" v-if="menuTab.length > 0">
            <ul class="list-menu-tab">
              <li
                v-for="(item, index) in menuTab"
                :class="activeTab.id === item.id ? 'active' : ''"
                :key="index"
                @click="changeActiveTab(item)"
              >
                {{ item.name }}
                <button @click="removeItemTab(index)">
                  <svg
                    focusable="false"
                    class=""
                    data-icon="close"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="64 64 896 896"
                  >
                    <path
                      d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <a-layout>
        <a-layout-sider
          width="300"
          v-model:collapsed="collapsed"
          :trigger="null"
          collapsible
        >
          <a-menu
            v-model:selectedKeys="selectedKeys"
            theme="dark"
            mode="inline"
            :open-keys="openKeys"
            @openChange="onOpenChange"
          >
            <a-sub-menu v-for="menuItem in menuItems" :key="menuItem.id">
              <template #icon>
                <MailOutlined />
              </template>
              <template #title>{{ menuItem.title }}</template>
              <a-sub-menu
                v-for="subMenu in menuItem.subMenus"
                :key="subMenu.id"
                :title="subMenu.title"
              >
                <a-menu-item
                  v-for="item in subMenu.items"
                  :key="item.id"
                  :class="
                    item.id === activeTab.id
                      ? 'ant-menu-item-selected-active'
                      : ''
                  "
                  @click.enter="addMenuTab(item)"
                >
                  <router-link :to="item.url">{{ item.name }}</router-link>
                </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout>
          <a-layout-content
            :style="{ background: '#fff', margin: 0, minHeight: '280px' }"
          >
            <div class="main-content">
              <template v-if="activeTab">
                <keep-alive>
                  <component v-bind:is="currentComponent" />
                </keep-alive>
              </template>
              <!-- <template v-else>
                                <keep-alive>
                                    <router-view></router-view>
                                </keep-alive>
                            </template> -->
            </div>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  defineAsyncComponent,
  onMounted,
} from "vue";
import menuTree from "./menuTree";
import menuData from "./menuData";
const BF310 = defineAsyncComponent(() =>
  import("../views/BF/BF3/BF310/index.vue")
);
const BF320 = defineAsyncComponent(() =>
  import("../views/BF/BF3/BF320/index.vue")
);
const BF330 = defineAsyncComponent(() =>
  import("../views/BF/BF3/BF330/index.vue")
);
const BF340 = defineAsyncComponent(() =>
  import("../views/BF/BF3/BF340/index.vue")
);
const BF210 = defineAsyncComponent(() =>
  import("../views/BF/BF2/BF210/index.vue")
);
const BF220 = defineAsyncComponent(() =>
  import("../views/BF/BF2/BF220/index.vue")
);
const CM110 = defineAsyncComponent(() =>
  import("../views/CM/CM1/CM110/index.vue")
);
const CM130 = defineAsyncComponent(() =>
  import("../views/CM/CM1/CM130/index.vue")
);
const Test = defineAsyncComponent(() =>
  import("../views/DefaultComponent.vue")
);
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  PrinterOutlined,
  DeleteOutlined,
  SearchOutlined,
  SaveOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  name: `LayoutDefault`,
  data() {
    return {
      user: null,
      inputSearchText: "",
      filteredResult: [],
      state: false,
      menuData: menuData,
      menuItems: menuTree,
      activeKey: 1,
      menuTab: [],
      activeTab: "",
      openKeys: ["bf-000"],
      rootSubmenuKeys: ["bf-000", "cm-000", "ac-000", "pa-000"],
      selectedKeys: [],
    };
  },
  components: {
    BF310,
    BF320,
    BF330,
    BF340,
    BF210,
    BF220,
    CM110,
    CM130,
    Test,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SearchOutlined,
    SaveOutlined,
  },
  created() {
    menuData.forEach((item) => {
      if (this.$route.fullPath.includes(item.id)) {
        this.activeTab = item;
      }
    });
  },
  watch: {
    activeTab: {
      handler(newValue) {
        if (newValue) {
          if (newValue.id.includes("bf-1")) {
            this.openKeys = ["bf-000", "bf-100"];
          }
          if (newValue.id.includes("bf-2")) {
            this.openKeys = ["bf-000", "bf-200"];
          }
          if (newValue.id.includes("bf-3")) {
            this.openKeys = ["bf-000", "bf-300"];
          }
          if (newValue.id.includes("bf-4")) {
            this.openKeys = ["bf-000", "bf-400"];
          }
          if (newValue.id.includes("cm-1")) {
            this.openKeys = ["cm-000", "cm-100"];
          }
          if (newValue.id.includes("ac-1")) {
            this.openKeys = ["ac-000", "ac-100"];
          }
          if (newValue.id.includes("ac-2")) {
            this.openKeys = ["ac-000", "ac-200"];
          }
          if (newValue.id.includes("ac-3")) {
            this.openKeys = ["ac-000", "ac-300"];
          }
          if (newValue.id.includes("ac-4")) {
            this.openKeys = ["ac-000", "ac-400"];
          }
          if (newValue.id.includes("ac-5")) {
            this.openKeys = ["ac-000", "ac-500"];
          }
          if (newValue.id.includes("pa-1")) {
            this.openKeys = ["pa-000", "pa-100"];
          }
          if (newValue.id.includes("pa-2")) {
            this.openKeys = ["pa-000", "pa-200"];
          }
          if (newValue.id.includes("pa-3")) {
            this.openKeys = ["pa-000", "pa-300"];
          }
          if (newValue.id.includes("pa-4")) {
            this.openKeys = ["pa-000", "pa-400"];
          }
          if (newValue.id.includes("pa-5")) {
            this.openKeys = ["pa-000", "pa-500"];
          }
        }
      },
      immediate: true,
    },
  },
  computed: {
    username() {
      if (sessionStorage.getItem("username")) {
        return sessionStorage.getItem("username");
      } else {
        return "";
      }
    },

    currentComponent() {
      if (this.activeTab.id === "") return;
      if (this.activeTab.id === "bf-310") return BF310;
      if (this.activeTab.id === "bf-320") return BF320;
      if (this.activeTab.id === "bf-330") return BF330;
      if (this.activeTab.id === "bf-340") return BF340;
      if (this.activeTab.id === "bf-210") return BF210;
      if (this.activeTab.id === "bf-220") return BF220;
      if (this.activeTab.id === "cm-110") return CM110;
      if (this.activeTab.id === "cm-130") return CM130;
      return Test;
    },
  },
  methods: {
    logout() {
      this.$router.push("/login");
      location.reload();
      this.$store.commit("auth/logout");
    },

    onSearch(key) {
      this.state = true;
      this.filteredResult = [];
      this.inputSearchText = key;
      if (this.menuData?.length > 0) {
        this.menuData.forEach((val) => {
          const searchId = val.name.includes(key) || val.id.includes(key);
          if (searchId) {
            this.filteredResult.push(val);
          }
        });
      }
    },
    toggleDropdown() {
      this.state = !this.state;
    },

    close(e) {
      if (!this.$el.contains(e.target)) {
        this.state = false;
      }
    },
    addMenuTab(item) {
      if (this.menuTab.length < 20) {
        this.menuTab.push(item);
      }
      const obj = {};
      for (let i = 0, len = this.menuTab.length; i < len; i++) {
        obj[this.menuTab[i]["id"]] = this.menuTab[i];
      }
      this.menuTab = new Array();
      for (const key in obj) {
        this.menuTab.push(obj[key]);
      }
      this.activeTab = item;
    },
    removeItemTab(item) {
      this.menuTab.splice(item, 1);
      if (this.menuTab.length === 0) {
        this.$router.push("/");
      }
    },
    changeActiveTab(item) {
      this.activeTab = item;
      if (this.menuTab.length === 0) {
        this.activeTab = "";
      }
    },
    focusInput() {
      this.state = false;
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        if (latestOpenKey && latestOpenKey.includes("bf")) {
          this.openKeys = ["bf-000", latestOpenKey];
        } else if (latestOpenKey && latestOpenKey.includes("cm")) {
          this.openKeys = ["cm-000", latestOpenKey];
        } else if (latestOpenKey && latestOpenKey.includes("ac")) {
          this.openKeys = ["ac-000", latestOpenKey];
        } else if (latestOpenKey && latestOpenKey.includes("pa")) {
          this.openKeys = ["pa-000", latestOpenKey];
        }
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  setup() {
    const collapsed = ref(false);
    return {
      collapsed,
    };
  },
});
</script>
<style lang="scss">
.ant-layout.ant-layout-has-sider {
  min-height: calc(100vh - 64px);
}
.components-grid-demo-flex .ant-col {
  display: flex;
  align-items: center;
}
.ant-layout-header {
  display: flex;
  justify-content: space-between;
  background: #7dbcea;
  color: #fff;
}

.ant-layout-header a {
  color: #fff;
}

.list-action ::v-deep .ant-btn svg {
  width: 20px;
  height: 20px;
}

.header-content {
  display: block;
  background: #91d5ff;
  align-items: center;
  position: relative;
  .left {
    width: 300px;
    float: left;
    align-items: center;
    padding-left: 15px;
    height: 58px;
    display: flex;
  }

  .right {
    padding-left: 24px;
    padding-top: 5px;
    float: left;
    width: calc(100% - 324px);
  }
  &::after {
    content: "";
    clear: both;
    display: table;
  }
}

.top-content {
  background: #e6f7ff;
  padding: 10px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .list-action {
    button {
      margin: 0 2px;
    }
  }
}

::v-deep .ant-layout-content {
  text-align: left;
}

.wrap-search {
  padding-left: 5px;
  width: calc(100% - 35px);
}

.search-no-data {
  padding: 10px;
}

.search-height {
  max-height: 150px;
}
.ant-layout {
  overflow-x: hidden;
}
.box-search {
  overflow-y: auto;
  position: absolute;
  z-index: 9;
  width: 233px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.item-search {
  padding: 5px 10px;
  display: flex;
  text-align: left;
}

.item-search a {
  color: #000;
  display: block;
  overflow: hidden;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
}

::v-deep .ant-layout-header {
  background-color: #096dd9;
}
::v-deep .ant-menu-dark .ant-menu-item-selected > span > a {
  color: rgba(255, 255, 255, 0.65);
}
::v-deep h3.ant-typography {
  margin-bottom: 0;
}
::v-deep
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
  .ant-menu-item-selected {
  background: none;
}

::v-deep
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
  .ant-menu-item-selected-active
  a {
  color: #fff;
}
::v-deep .page-content {
  padding: 10px;
}
.nav-logo img {
  max-width: 150px;
}
.nav-tabs {
  display: block;
  box-shadow: inset 0 -1px 0 #888;
  height: 40px;
  margin-bottom: 5px;

  ul {
    display: block;
    text-align: left;
    padding-left: 0;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    max-width: 100%;
    li {
      display: inline-block;
      width: auto;
      text-align: center;
      height: 40px;
      line-height: 40px;
      padding: 0 5px 0 10px;
      background-color: #fafafa;
      border: 1px solid #888;
      margin: 0 2px;
      border-radius: 8px 8px 0 0;
      button {
        background: none;
        border: none;
        height: 100%;
        float: right;
        cursor: pointer;
      }
      cursor: pointer;

      &:first-of-type {
        margin-left: 0;
      }

      &.active {
        background-color: #fff;
        border-bottom: 1px solid #fff;
        color: #1890ff;
      }
    }
  }
}
</style>
