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
            <a-select
              v-model:value="selectedItems"
              :options=" menuDatas.map((item) => ({
                  value: item.id,
                  label: item.id + ' | ' + item.name,
                }))"
              show-search
              placeholder="메뉴를 입력해보세요"
              style="width: 180px"
              optionFilterProp="label"
              @change="addMenuTab"
            />
          </div>
        </div>
        <div class="right">
          <nav class="nav-tabs" v-if="menuTab.length > 0">
            <caret-left-outlined class="arrow-left"  v-if="isArrowScroll"    @click="tabLeft"/>
            <ul ref="scroll_container" class="list-menu-tab">
              <li
                v-for="(item, index) in menuTab"
                :class="activeTab.id === item.id ? 'active' : ''"
                :key="index"
                @click.self="changeActiveTab(item)"
              >
                {{ item.name }}
                <close-circle-filled
                  @click="removeItemTab(index)"
                  :style="{
                    marginLeft: '2px',
                    color: activeTab.id === item.id ? 'red' : '#888',
                  }"
                />
              </li>
            </ul>
            <caret-right-outlined v-if="isArrowScroll" class="arrow-right"  @click="tabRight" />
          </nav>
          
        </div>
      </div>
      <a-layout>
        <a-layout-sider
          width="250"
          v-model:collapsed="collapsed"
          :trigger="null"
          collapsible
        >
          <a-menu
            v-model:selectedKeys="selectedKeys"
            theme="dark"
            mode="inline"
            :inline-collapsed="false"
            :open-keys="openKeys"
            @openChange="onOpenChange"
          >
            <!-- list main menu lavel 0 -->
            <a-sub-menu v-for="menuItem in menuItems" :key="menuItem.id">
              <template #icon>
                <div id="icon-menu">
                  <i :class="iconClass(menuItem.id)" class="dx-icon"></i>
                </div>
              </template>
              <template #title>{{ menuItem.title }}</template>
              <!-- list sub menu level 1 -->
              <a-sub-menu
                v-for="subMenu in menuItem.subMenus"
                :key="subMenu.id"
                :title="subMenu.title"
              >
                <!-- list sub menu level 3 if have subMenus -->
                <template v-for="item in subMenu.items"  :key="'sub-'+item.id">
                  <a-menu-item
                      v-if="!item.hasOwnProperty('subMenus')"
                      :class="[
                      item.id === activeTab.id
                        ? 'ant-menu-item-selected-active'
                      : '',
                      item.url == '#' ? 'not-done' : ''
                        ]
                      "
                      @click.enter="addMenuTab(item.id)"
                    >
                    <router-link :to="item.url" >{{ item.name }}</router-link>
                  </a-menu-item>
                  <a-sub-menu v-else  :title="item.name">
                    <a-menu-item 
                      v-for="subMenu1 in item.subMenus"
                      :key="subMenu1.id"
                      :class="[
                        subMenu1.id === activeTab.id
                          ? 'ant-menu-item-selected-active'
                        : '',
                        subMenu1.url == '#' ? 'not-done' : ''
                          ]
                        "
                      @click.enter="addMenuTab(subMenu1.id)"
                    >
                      <router-link :to="subMenu1.url" >{{ subMenu1.name }}</router-link>
                    </a-menu-item>
                  </a-sub-menu>
                </template>
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
                <keep-alive :exclude="cachedTab">
             
                  <component :is="currentComponent" />
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
<script >
import { defineComponent, ref, watch, computed } from "vue";
import {  useRouter } from 'vue-router'
import { useStore } from 'vuex';
import menuTree from "./menuTree";
import menuData from "./menuData";
import {
  BF310,
  BF320,
  BF330,
  BF340,
  BF210,
  BF220,
  CM110,
  CM130,
  PA110,
  PA120,
  PA230,
  PA430,
  PA420,
  PA410,
  PA610,
  PA620,
  PA630,
  PA530,
  PA520,
  PA510,
  PA710,
  PA730,
  PA220,
  PA720,
  Test,
  Example,
} from "./screenComponents";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  PrinterOutlined,
  DeleteOutlined,
  SearchOutlined,
  SaveOutlined,
  CloseCircleFilled,
  CaretLeftOutlined, 
  CaretRightOutlined
} from "@ant-design/icons-vue";
export default defineComponent({
  name: `LayoutDefault`,
  data() {
    return {
      styles: {
        main: this.$config_styles.Main,
        sub: this.$config_styles.Sub,
      },
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
    PA110,
    PA120,
    PA220,
    PA230,
    PA430,
    PA420,
    PA410,
    PA610,
    PA620,
    PA630,
    PA530,
    PA520,
    PA510,
    PA710,
    PA720,
    PA730,
    Test,
    Example,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SearchOutlined,
    SaveOutlined,
    CloseCircleFilled,
    CaretLeftOutlined, 
    CaretRightOutlined
  },
  created() {
    menuData.forEach((item) => {
      if (this.$route.fullPath.includes(item.id)) {
        // clear vuex value cachedTab 
        this.$store.state.common.cachedTab.push(item.id.toUpperCase().replaceAll('-', ''))
        this.activeTab = item;
        this.$store.state.common.activeTab = item
        this.menuTab.push(item);
        return;
      } else if (
        this.$route.fullPath === "/dashboard/" ||
        this.$route.fullPath === "/dashboard"
      ) {
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
          if (newValue.id.includes("pa-7")) {
            this.openKeys = ["pa-000", "pa-700"];
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
      if (this.activeTab.id === "bf-310") return 'BF310';
      if (this.activeTab.id === "bf-320") return 'BF320';
      if (this.activeTab.id === "bf-330") return 'BF330';
      if (this.activeTab.id === "bf-340") return 'BF340';
      if (this.activeTab.id === "bf-210") return 'BF210';
      if (this.activeTab.id === "bf-220") return 'BF220';
      if (this.activeTab.id === "cm-110") return 'CM110';
      if (this.activeTab.id === "cm-130") return 'CM130';
      if (this.activeTab.id === "pa-110") return 'PA110';
      if (this.activeTab.id === "pa-120") return 'PA120';
      if (this.activeTab.id === "pa-220") return 'PA220';
      if (this.activeTab.id === "pa-230") return 'PA230';
      if (this.activeTab.id === "pa-410") return 'PA410';
      if (this.activeTab.id === "pa-420") return 'PA420';
      if (this.activeTab.id === "pa-430") return 'PA430';
      if (this.activeTab.id === "pa-610") return 'PA610';
      if (this.activeTab.id === "pa-620") return 'PA620';
      if (this.activeTab.id === "pa-630") return 'PA630';
      if (this.activeTab.id === "pa-530") return 'PA530';
      if (this.activeTab.id === "pa-520") return 'PA520';
      if (this.activeTab.id === "pa-510") return 'PA510';
      if (this.activeTab.id === "pa-710") return 'PA710';
      if (this.activeTab.id === "pa-720") return 'PA720';
      if (this.activeTab.id === "pa-730") return 'PA730';
      if (this.activeTab.id === "example" || this.activeTab.id === "") return 'Example';
      return Test;
    },
  },
  setup() {
    const inputSearchText = ref("");
    const filteredResult =ref([]);
    const openKeys = ref(["bf-000"]);
    const rootSubmenuKeys = ref(["bf-000", "cm-000", "ac-000", "pa-000"]);
    const selectedKeys = ref([]);
    const state = ref(false);
    let menuDatas = menuData;
    let menuItems = menuTree;
    const store = useStore();
    const router = useRouter()
    const collapsed = ref(false);
    const selectedItems = ref([]);
    const activeTab = ref();
    const cachedTab = ref([]);

    /**
    * Check scroll tab if overflow
    */
    const scroll_container = ref(null);
    const isArrowScroll= ref(false);
    const checkOverflow = ()=> {
          isArrowScroll.value =  scroll_container.value.offsetWidth   < scroll_container.value.scrollWidth
    }
    const tabLeft = (e)=>{
       if(scroll_container.value.offsetWidth   < scroll_container.value.scrollWidth){
              scroll_container.value.scrollTo({
                left: scroll_container.value.scrollLeft -= 200,
                    behavior: 'smooth',
          }) ;
       }
        
    }
    const tabRight = (e)=>{
       if(scroll_container.value.offsetWidth   < scroll_container.value.scrollWidth){
          scroll_container.value.scrollTo({
            left: scroll_container.value.scrollLeft += 200,
            behavior: 'smooth',
          }) ;
       }
    }

    /**
     * init menuTab from vuex
     */
    let menuTab = ref(store.state.common.menuTab);
    const filteredOptions = computed(() =>
      menuDatas.filter((o) => !selectedItems.value.includes(o))
    );

    const logout = ()=>{
      router.push("/login");
      location.reload();
      store.commit("auth/logout");
    }

    const onSearch  = (key)=>{
      state.value = true;
      filteredResult.value = [];
      inputSearchText.value = key;
      if (menuDatas?.length > 0) {
        menuDatas.forEach((val) => {
          const searchId = val.name.includes(key) || val.id.includes(key);
          if (searchId) {
            filteredResult.value.push(val);
          }
        });
      }
    }
    const toggleDropdown  = ()=>{
      state.value = !state.value;
    }

    const addMenuTab = (itemId) => {
  
      let itemNew = [];
      itemNew = menuDatas.find(item => item.id === itemId);
      activeTab.value = menuDatas.find(item => item.id === itemId);
      store.state.common.activeTab = itemNew
      store.state.common.cachedTab.push(itemNew.id.toUpperCase().replaceAll('-', ''))
      if (menuTab.value.length < 20 && !menuTab.value.includes(activeTab.value)) {
        menuTab.value.push(itemNew);
        selectedItems.value = [];
        checkOverflow()
      }

    }
    /**
     * event when click icon close one tab
     */
    const removeItemTab = (item) => {
      // clear vuex value cachedTab 
      let tabName = menuTab.value[item].id.toUpperCase().replaceAll('-', '')
      store.state.common.cachedTab = store.state.common.cachedTab.filter((item) => item != tabName )

      menuTab.value.splice(item, 1);
      activeTab.value = menuTab.value.slice(-1)[0];
      selectedItems.value = [];
      if (menuTab.value.length === 0) {
        activeTab.value = { name: "example", url: "/dashboard", id: "" };
        router.push("/dashboard");
        menuTab.value.push({ name: "Dashboard", url: "/dashboard", id: "" });
      }
      checkOverflow()
    }
    const changeActiveTab  = (item)=>{
      activeTab.value = item;
      if (menuTab.value.length === 0) {
        activeTab.value = { name: "Dashboard", url: "/dashboard", id: "" };
        menuTab.value.push({ name: "Dashboard", url: "/dashboard", id: "" });
      }
      store.state.common.activeTab =  activeTab.value
    }
    watch(()=>store.state.common.cachedTab, (newValue)=>{     
        cachedTab.value = newValue;
    }, { deep: true })
    const focusInput  = ()=>{
      state.value = false;
    }

    watch(()=>store.state.common.activeTab, (newValue)=>{     
        activeTab.value = newValue;
    }, { deep: true })
    
    const onOpenChange = (opKeys) => {
      const latestOpenKey = opKeys.find(
        (key) => openKeys.value.indexOf(key) === -1
      );
      if (rootSubmenuKeys.value.indexOf(latestOpenKey) === -1) {
        if (latestOpenKey && latestOpenKey.includes("bf")) {
          openKeys.value = ["bf-000", latestOpenKey];
        } else if (latestOpenKey && latestOpenKey.includes("cm")) {
          openKeys.value = ["cm-000", latestOpenKey];
        } else if (latestOpenKey && latestOpenKey.includes("ac")) {
          openKeys.value = ["ac-000", latestOpenKey];
        } else if (latestOpenKey && latestOpenKey.includes("pa")) {
          openKeys.value = ["pa-000", latestOpenKey];
        }
      } else {
        openKeys.value = latestOpenKey ? [latestOpenKey] : [];
      }
    }

    /**
     * List icon in sidebar menu
     * @param {*} id 
     */
    const iconClass = (id) => {
      let classIcon = ''
      switch (id) {
        case 'bf-000':
          classIcon = "dx-icon-card";
          break;
        case 'cm-000':
          classIcon = "dx-icon-inactivefolder";
          break;
        case 'ac-000':
          classIcon = "dx-icon-columnchooser";
          break;
        case 'pa-000':
          classIcon = "dx-icon-box";
          break;
        default:
          classIcon = "dx-icon-box";
          break;
      }
      return classIcon;
    }
    return {
      iconClass,
      logout,
      onSearch,
      toggleDropdown,
      addMenuTab,
      removeItemTab,
      changeActiveTab,
      focusInput,
      onOpenChange,
      menuItems,
      menuDatas,
      activeTab,
      menuTab,
      collapsed,
      selectedItems,
      filteredOptions,
      selectedKeys,
      openKeys,
      scrollX,
      scroll_container,
      isArrowScroll,
      tabLeft,tabRight,cachedTab
    }
  },
});
</script>
<style lang="scss" src="./style/style.scss">
.header-content {
  background: v-bind('styles.sub');
}

.ant-layout-header {
  background: v-bind('styles.main');
}

.not-done{
  color: red;
}
</style>
