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
        <div class="wrap-search" >
          <a-input
            v-model:value="inputSearchText"
            placeholder="Search Menu"
            @change="onSearch"
            :class="{ shown: state }"
            @click.prevent="toggleDropdown"
          />
          <div class="test">
            <div class="box-search search-height" v-if="filteredResult.length" v-show="state">
              <div
                v-for="(result, resultIndex) in filteredResult"
                :key="resultIndex"
                class="item-search"
                @click.prevent="toggleDropdown"
              >
                <router-link :to="result.url" >
                   {{ result.name }}
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
        <SearchMenu />

        <a-menu mode="inline" theme="dark" :inline-collapsed="collapsed">
          <a-sub-menu v-for="menuItem in menuItems" :key="menuItem.id">
            <template #title>{{ menuItem.title }}</template>
            <a-sub-menu
              v-for="subMenu in menuItem.subMenus"
              :key="subMenu.id"
              :title="subMenu.title"
            >
              <a-menu-item v-for="item in subMenu.items" :key="item.id">
                <router-link :to="item.url">{{ item.name }}</router-link>
              </a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 24px">
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from "vue";
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
    };
  },
  computed: {
    username() {
      if (localStorage.getItem("username")) {
        return localStorage.getItem("username");
      } else {
        return "";
      }
    },
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
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  // beforeDestroy() {
  //   document.removeEventListener("click", this.close);
  // },
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

<style scoped>
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
  height: 150px;
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
</style>