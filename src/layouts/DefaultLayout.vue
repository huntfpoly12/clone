<template >
  <a-layout>
    <a-layout-header class="header">
      <div class="nav-logo">BankDa</div>
      <div class="user-info" v-if="username">
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            {{ username }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <p @click="logout">Logout</p>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="300">
        <div class="wrap-search">
          <a-input v-model:value="inputSearchText" placeholder="Search Menu" @change="onSearch"
            :class="{ shown: state }" @click.prevent="toggleDropdown" />
          <div class="test">
            <div class="box-search search-height" v-if="filteredResult.length" v-show="state">
              <div v-for="(result, resultIndex) in filteredResult" :key="resultIndex" class="item-search"
                @click.prevent="toggleDropdown">
                <router-link :to="result.url">
                  {{ result.name }}
                </router-link>
              </div>
            </div>
          </div>

          <div v-if="filteredResult.length === 0 && inputSearchText.length" v-show="state"
            class="box-search search-no-data" @click.prevent="toggleDropdown">
            No Data
          </div>
        </div>
        <SearchMenu />

        <a-menu mode="inline" theme="dark" :inline-collapsed="collapsed">
          <a-sub-menu v-for="menuItem in menuItems" :key="menuItem.id">
            <template #title>{{ menuItem.title }}</template>
            <a-sub-menu v-for="subMenu in menuItem.subMenus" :key="subMenu.id" :title="subMenu.title">
              <a-menu-item v-for="item in subMenu.items" :key="item.id" @click.enter="addMenuTab(item)">

                <router-link :to="item.url">{{ item.name }}</router-link>
              </a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 24px">
        <ul class="list-menu-tab" v-if="menuTab.length > 0">
          <li v-for="(item, index) in menuTab" :class="activeTab === item.id? 'active': ''" :key="index"
            @click="changeActiveTab(item)"> {{item.name}} <DxButton @click="removeItemTab(index)"><svg focusable="false"
                class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"
                viewBox="64 64 896 896">
                <path
                  d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
                </path>
              </svg></DxButton>
          </li>
        </ul>
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
          <template v-if="activeTab">
            <keep-alive>
              <component v-bind:is="currentComponent" />
            </keep-alive>
          </template>
          <router-view v-else></router-view>

        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from "vue";
import BF310 from '../views/BF/BF3/BF310/index.vue'
import BF320 from '../views/BF/BF3/BF320/index.vue'
import Test from '../views/DefaultComponent.vue'
import _ from "lodash";
import menuTree from "./menuTree"
import menuData from "./menuData"
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
      activeTab: ''
    };
  },
  components: {
    BF310,
    BF320,
    Test
  },
  computed: {
    username() {
      if (localStorage.getItem("username")) {
        return localStorage.getItem("username");
      } else {
        return "";
      }
    },

    currentComponent() {
    if(this.activeTab === '') return
    if (this.activeTab === 'bf-310') return BF310
    if (this.activeTab === 'bf-320') return BF320;
    return Test
  }


  },
  methods: {
    logout() {
      this.$router.push("/login");
      location.reload();
      this.$store.commit("auth/logout");
    },

    onSearch: _.debounce(function () {
      this.filteredResult = [];
      if (
        this.menuData?.length > 0 &&
        this.inputSearchText?.length >= 1
      ) {
        this.menuData.forEach((val) => {
          const searchId = val.name.includes(this.inputSearchText);
          if (searchId) {
            this.filteredResult.push(val);
          }
        });
      }
    }, 300),
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
        this.menuTab.push(item)
      }
      const obj = {};
      for (let i = 0, len = this.menuTab.length; i < len; i++) {
        obj[this.menuTab[i]['id']] = this.menuTab[i];
      }

      this.menuTab = new Array();

      for (const key in obj) {
        this.menuTab.push(obj[key]);
      }
    },
    removeItemTab(item) {
      this.menuTab.splice(item, 1)
    },
    changeActiveTab(item) {
      this.activeTab = item.id
    }
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  setup() {
    const state = reactive({
      collapsed: false,
      selectedKeys: ["sub0"],
      openKeys: ["sub1"],
      preOpenKeys: ["sub1"],
    });

    watch(
      () => state.openKeys,
      (_val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );
    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };

    return {
      ...toRefs(state),
      toggleCollapsed,
    };
  },
});
</script>

<style scoped lang="scss">
.ant-layout.ant-layout-has-sider {
  min-height: calc(100vh - 64px);
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

::v-deep .ant-layout-content {
  text-align: left;
}

.wrap-search {
  padding: 20px 20px 5px 20px;
}

.search-no-data {
  padding: 10px;
}

.search-height {
  max-height: 150px;
}

.box-search {
  overflow: auto;
  position: absolute;
  z-index: 9;
  width: 86.5%;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.item-search {
  padding: 5px 10px;
  display: flex;
}

.item-search a {
  color: #000;
}

::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}

.list-menu-tab {
  list-style: none;
  display: flex;
  padding-left: 0;
  position: relative;
  width: 100%;
  &::before {
    position: absolute;
    right: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    border-bottom: 1px solid #ccc;
    content: "";
  }

  li {
    margin: 0 1px;
    padding: 8px 16px;
    background: #fafafa;
    border: 1px solid #ccc;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    cursor: pointer;

    &.active {
      color: #1890ff;
      background: #fff;
      border-bottom-color: transparent;
    }
  }

}
</style>