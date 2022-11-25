<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="nav-logo">
        <a :href="'/dashboard/'"><img src="../assets/images/logo.png" /></a>
      </div>

      <div class="user-info" v-if="username">
        <year-header />
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
                <p @click="logout">로그아웃</p>
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
            <a-select v-model:value="selectedItems" :options="
              menuData.map((item) => ({
                value: item.id + ' | ' + item.name,
              }))
            " show-search placeholder="메뉴를 입력해보세요" style="width: 180px" @change="addMenuTab" />
          </div>
        </div>
        <div class="right">
          <nav class="nav-tabs" v-if="menuTab.length > 0">
            <ul class="list-menu-tab">
              <li v-for="(item, index) in menuTab" :class="activeTab.id === item.id ? 'active' : ''" :key="index"
                @click="changeActiveTab(item)">
                {{ item.name }}
                <close-circle-filled @click="removeItemTab(index)" :style="{
                  marginLeft: '2px',
                  color: activeTab.id === item.id ? 'red' : '#888',
                }" />
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <a-layout>
        <a-layout-sider width="250" v-model:collapsed="collapsed" :trigger="null" collapsible>
          <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" :open-keys="openKeys"
            @openChange="onOpenChange">
            <a-sub-menu v-for="menuItem in menuItems" :key="menuItem.id">
              <template #icon>
                <MailOutlined />
              </template>
              <template #title>{{ menuItem.title }}</template>
              <a-sub-menu v-for="subMenu in menuItem.subMenus" :key="subMenu.id" :title="subMenu.title">
                <a-menu-item v-for="item in subMenu.items" :key="item.id" :class="
                  item.id === activeTab.id
                    ? 'ant-menu-item-selected-active'
                    : ''
                " @click.enter="addMenuTab(item.id + ' | ' + item.name)">
                  <router-link :to="item.url">{{ item.name }}</router-link>
                </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout>
          <a-layout-content :style="{ background: '#fff', margin: 0, minHeight: '280px' }">
            <div class="main-content">
              <template v-if="activeTab">
                <keep-alive>
                  <component v-bind:is="currentComponent" />
                </keep-alive>
              </template>
              <template v-else>
                <keep-alive>
                  <component v-bind:is="'Example'" />
                </keep-alive>
              </template>
            </div>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { defineComponent, ref, defineAsyncComponent, computed } from "vue";
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
const PA120 = defineAsyncComponent(() =>
  import("../views/PA/PA1/PA120/index.vue")
);
const PA230 = defineAsyncComponent(() =>
  import("../views/PA/PA2/PA230/index.vue")
);
const PA430 = defineAsyncComponent(() =>
  import("../views/PA/PA4/PA430/index.vue")
);
const PA610 = defineAsyncComponent(() =>
  import("../views/PA/PA6/PA610/index.vue")
);
const PA630 = defineAsyncComponent(() =>
  import("../views/PA/PA6/PA630/index.vue")
);
const PA530 = defineAsyncComponent(() =>
  import("../views/PA/PA5/PA530/index.vue")
);
const PA520 = defineAsyncComponent(() =>
	import("../views/PA/PA5/PA520/index.vue")
);
const PA710 = defineAsyncComponent(() =>
  import("../views/PA/PA7/PA710/index.vue")
);
const PA730 = defineAsyncComponent(() =>
  import("../views/PA/PA7/PA730/index.vue")
);
const PA220 = defineAsyncComponent(() =>
  import("../views/PA/PA2/PA220/index.vue")
);
const Test = defineAsyncComponent(() =>
  import("../views/DefaultComponent.vue")
);
const Example = defineAsyncComponent(() => import("../views/base/Example.vue"));
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  PrinterOutlined,
  DeleteOutlined,
  SearchOutlined,
  SaveOutlined,
  CloseCircleFilled,
} from "@ant-design/icons-vue";

export default defineComponent({
	name: `LayoutDefault`,
	data() {
		return {
			styles: {
				main: this.$config_styles.Main,
				sub: this.$config_styles.Sub,
			},
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
		PA120,
		PA230,
		PA430,
		PA610,
		PA630,
		PA530,
		PA710,
		Test,
		Example,
		MenuFoldOutlined,
		MenuUnfoldOutlined,
		MailOutlined,
		PrinterOutlined,
		DeleteOutlined,
		SearchOutlined,
		SaveOutlined,
		CloseCircleFilled
	},
	created() {
		menuData.forEach((item) => {
			if (this.$route.fullPath.includes(item.id)) {
				this.activeTab = item;
				this.menuTab.push(item);
				return;
			} else if (this.$route.fullPath === '/dashboard/' || this.$route.fullPath === '/dashboard') {

				this.activeTab = { name: "dashboard", url: "/dashboard", id: "" };
			}
		});

    if (
      this.$route.fullPath === "/dashboard/" ||
      this.$route.fullPath === "/dashboard"
    ) {
      this.activeTab = { name: "Dashboard", url: "/dashboard", id: "" };
      this.menuTab.push({ name: "Dashboard", url: "/dashboard", id: "" });
    }
  },
  watch: {
    activeTab: {
      handler(newValue, oldVal) {
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
          if (newValue.id.includes("pa-6")) {
            this.openKeys = ["pa-000", "pa-600"];
          }
          if (newValue.id !== "#") {
            this.$router.push(`/dashboard/${newValue.id}`);
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
			if (this.activeTab.id === "") return Example;
			if (this.activeTab.id === "bf-310") return BF310;
			if (this.activeTab.id === "bf-320") return BF320;
			if (this.activeTab.id === "bf-330") return BF330;
			if (this.activeTab.id === "bf-340") return BF340;
			if (this.activeTab.id === "bf-210") return BF210;
			if (this.activeTab.id === "bf-220") return BF220;
			if (this.activeTab.id === "cm-110") return CM110;
			if (this.activeTab.id === "cm-130") return CM130;
			if (this.activeTab.id === "pa-120") return PA120;
			if (this.activeTab.id === "pa-230") return PA230;
			if (this.activeTab.id === "pa-430") return PA430;
			if (this.activeTab.id === "pa-610") return PA610;
			if (this.activeTab.id === "pa-630") return PA630;
			if (this.activeTab.id === "pa-530") return PA530;
			if (this.activeTab.id === "pa-710") return PA710;
			if (this.activeTab.id === "example") return Example;
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
      let itemNew = [];
      let id = item.split(" | ");
      let tabAc = {};
      this.menuData.map((e) => {
        if (e.id == id[0]) {
          tabAc = e;
          itemNew = e;
        }
      });
      if (this.menuTab.length < 20) {
        this.menuTab.push(itemNew);
      }
      const obj = {};
      for (let i = 0, len = this.menuTab.length; i < len; i++) {
        obj[this.menuTab[i]["id"]] = this.menuTab[i];
      }
      this.menuTab = new Array();
      for (const key in obj) {
        this.menuTab.push(obj[key]);
      }
      this.activeTab = tabAc;
    },
    removeItemTab(item) {
      this.menuTab.splice(item, 1);
      if (this.menuTab.length === 0) {
        this.activeTab = { name: "example", url: "/dashboard", id: "" };
        this.$router.push("/dashboard");
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
    const selectedItems = ref([]);

    const filteredOptions = computed(() =>
      menuData.filter((o) => !selectedItems.value.includes(o))
    );
    return {
      collapsed,
      selectedItems,
      filteredOptions,
    };
  },
});
</script>
<style lang="scss">
.list-menu-tab {
  margin-top: 0px;
  margin-bottom: 2px !important;
}

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
  background: v-bind("styles.main");
  color: #fff;
  height: 50px;
  line-height: 50px;
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
  background: v-bind("styles.sub");
  align-items: center;
  position: relative;
  height: 40px;

  .left {
    width: 250px;
    float: left;
    align-items: center;
    padding-left: 15px;
    height: 40px;
    display: flex;
  }

  .right {
    // padding-left: 24px;
    padding-top: 3px;
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
  padding: 2px 24px;
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

::v-deep .ant-menu-dark .ant-menu-item-selected>span>a {
  color: rgba(255, 255, 255, 0.65);
}

::v-deep h3.ant-typography {
  margin-bottom: 0;
}

::v-deep .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background: none;
}

.ant-menu-item-selected-active {
  background-color: #1890ff !important;
}

.ant-menu-item-selected-active a {
  color: #fff !important;
}

::v-deep .page-content {
  padding: 10px;
}

.nav-logo img {
  max-width: 100px;
}

.nav-tabs {
  display: block;
  box-shadow: inset 0 -1px 0 #888;
  height: 35px;
  // margin-bottom: 5px;

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
      height: 33px;
      line-height: 33px;
      padding: 0 5px 0 10px;
      background-color: #fafafa;
      border: 1px solid #888;
      margin: 0 2px;
      // border-radius: 8px 8px 0 0;

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

.user-info {
  display: flex;
}
</style>
