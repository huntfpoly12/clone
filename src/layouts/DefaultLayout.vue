<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="nav-logo" style="display: flex;">
        <div class="logo">
          <a @click="addMenuTab('')"><img src="../assets/images/logo.png" /></a>
        </div>
        <div class="company-info" style="display: flex; margin-left: 100px;">
          <company-infor />
        </div>
      </div>

      <div class="user-info">
        <FacilityBizTypeHeader />
        <!-- <year-header /> -->
        <div @click="openTabBoard" class="cursor-pointer">소통판</div>
        <account-infor></account-infor>
      </div>
    </a-layout-header>

    <a-layout-content>
      <a-layout>
        <a-layout-sider width="250" v-model:collapsed="collapsed" :trigger="null" collapsible>
          <div class="header-content header-content-left">
            <a-button type="primary" @click="() => (collapsed = !collapsed)">
              <menu-unfold-outlined v-if="collapsed" class="trigger" />
              <menu-fold-outlined v-else class="trigger" />
            </a-button>

            <div v-if="!collapsed" class="wrap-search">
              <a-select v-model:value="selectedItems" :options="menuData.map((item) => ({
                value: item.id,
                label: item.id + ' | ' + item.name
              }))" show-search placeholder="메뉴를 입력해보세요" style="width: 180px" optionFilterProp="label"
                :disabled="menuTab.length >= MAX_TAB" @change="addMenuTab" notFoundContent="내역이 없습니다"/>
            </div>
          </div>
          <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" :inline-collapsed="false"
            :open-keys="openKeys" @openChange="onOpenChange">
            <div v-for="menuItem in menuItems" :key="menuItem.id" v-check-permission:read="menuItem.roles">
              <a-sub-menu :key="menuItem.id">
                <!-- list main menu lavel 0 -->
                <template #icon v-if="menuItem.icon">
                  <div id="icon-menu">
                    <i :class="menuItem.icon" class="dx-icon"></i>
                  </div>
                </template>
                <template #title>{{ menuItem.title }}</template>
                <!-- list sub menu level 1 -->
                <template v-for="itemLevel1 in menuItem.subMenus" :key="'sub-level-1-'+itemLevel1.id">
                  <div v-check-permission:read="itemLevel1?.roles" class="menuuuuu">
                    <a-menu-item v-if="!itemLevel1?.subMenus" :class="[
                      itemLevel1.id === activeTab?.id
                        ? 'ant-menu-item-selected-active'
                        : '',
                      itemLevel1.url == '#' ? 'not-done' : ''
                    ]
                      " @click.enter="addMenuTab(itemLevel1.id)">
                      <router-link :to="itemLevel1.url">{{ itemLevel1.title }}</router-link>
                    </a-menu-item>
                    <a-sub-menu v-else :title="itemLevel1.title" :key="itemLevel1.id">
                      <!-- list sub menu level 2 if have subMenus -->
                      <template v-for="itemLevel2 in itemLevel1.subMenus" :key="'sub-'+itemLevel2.id">
                        <div v-check-permission:read="itemLevel2?.roles">
                          <a-menu-item v-if="!itemLevel2.hasOwnProperty('subMenus')" :class="[
                            itemLevel2.id === activeTab?.id
                              ? 'ant-menu-item-selected-active'
                              : '',
                            itemLevel2.url == '#' ? 'not-done' : ''
                          ]
                            " @click.enter="addMenuTab(itemLevel2.id)">
                            <router-link :to="itemLevel2.url">{{ itemLevel2.title }}</router-link>
                          </a-menu-item>
                          <a-sub-menu v-else :title="itemLevel2.title" :key="itemLevel2.id">
                            <a-menu-item v-for="subMenu1 in itemLevel2.subMenus" :key="subMenu1.id" :class="[
                              subMenu1.id === activeTab?.id
                                ? 'ant-menu-item-selected-active'
                                : '',
                              subMenu1.url == '#' ? 'not-done' : ''
                            ]
                              " @click.enter="addMenuTab(subMenu1.id)">
                              <router-link :to="subMenu1.url">{{ subMenu1.title }} {{ subMenu1.id }} </router-link>
                            </a-menu-item>
                          </a-sub-menu>
                        </div>
                      </template>
                    </a-sub-menu>
                  </div>
                </template>
              </a-sub-menu>
            </div>
          </a-menu>
        </a-layout-sider>
        <a-layout>
          <a-layout-content :style="{ background: '#fff', margin: 0, minHeight: '280px' }">
            <div class="tab-main">
              <div v-if="!menuTab.length && VITE_ENVIRONMENT !== 'DEVELOP' && false" class="tab-main-emtytab"></div>
              <DxSortable v-else filter=".dx-tab" v-model:data="menuTab" item-orientation="horizontal"
                drag-direction="horizontal" @drag-start="onTabDragStart($event)" @reorder="onTabDrop($event)">
                <DxTabs :data-source="menuTab" v-model:selected-index="tabIndex" itemTemplate="titleTab"
                  :scrollByContent="true">
                  <template #titleTab="{ data: itemTab }">
                    <div class="tab-main-title-tab" @click="changeActiveTab(itemTab)">
                      <span :class="{ 'color-active-tab': activeTab?.id === itemTab.id }">{{ itemTab.name }}</span>
                      <close-circle-filled @click.stop="removeItemTab(itemTab)" :style="{
                        marginLeft: '5px',
                        color: activeTab?.id === itemTab.id ? 'red' : '#888',
                      }" />
                    </div>
                  </template>
                </DxTabs>
              </DxSortable>
            </div>
            <div class="main-content">
              <template v-if="activeTab">
                <keep-alive :exclude="cachedTab" :key="count">
                  <component :is="currentComponent" />
                </keep-alive>
              </template>
              <template v-else>
                <keep-alive v-if="menuTab.length">
                  <component v-bind:is="'Example'" />
                </keep-alive>
              </template>
            </div>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout-content>
  </a-layout>
  <!-- modal show when login more than 8 hours -->
  <div>
    <a-modal :visible="statusLogin" :closable="false"  footer="" :width="400"  class="logout-confirm">
      <div style="text-align: center;margin: 15px;">
        <span >장시간 활동이 없어 접속을 종료합니다. 다시 로그인하십시요</span>
      </div>
      <a-row>
          <a-col :span="9" :offset="9">
            <div style="display: flex;">
              <button-basic class="button-form-modal" text="로그아웃" :width="90" :type="'default'" :mode="'contained'"  @onClick="logout"/>
            </div>
          </a-col>
        </a-row>
    </a-modal>
  </div>
  <!-- error popup when api error -->
  <error-popup></error-popup>
</template>
<script>
import { defineComponent, ref, watch, computed, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex';
import menuTree from "./menuTree";
import menuData from "./menuData";
import {
  BF310,
  BF320,
  BF330,
  BF340,
  BF210,
  BF510,
  BF530,
  BF610,
  BF620,
  BF640,
  BF650,
  BF630,
  BF220,
  CM110,
  CM121,
  CM130,
  PA110,
  PA120,
  PA210,
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
  PA730,
  PA720,
  PA810,
  PA820,
  PA830,
  PA840,
  PA860,
  PA870,
  PA880,
  AC110,
  AC120,
  AC130,
  AC210,
  AC510,
  AC530,
  AC540,
  AC550,
  AC560,
  AC570,
  AC590,
  AC580,
  AC610,
  AC620,
  AC630,
  AC520,
  Test,
  Example,
  CommunicationBoard
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
import { getJwtObject } from '@bankda/jangbuda-common';
import {companyId, openTab, setMenuTab} from "@/helpers/commonFunction";
import useCheckPermission from "@/helpers/useCheckPermission";
import DxSortable from "devextreme-vue/sortable";
import DxTabs from 'devextreme-vue/tabs';
import notification from '@/utils/notification';
import dayjs from "dayjs";
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
    BF510,
    BF530,
    BF610,
    BF620,
    BF640,
    BF650,
    BF630,
    BF220,
    CM110,
    CM121,
    CM130,
    PA110,
    PA120,
    PA210,
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
    PA810,
    PA820,
    PA830,
    PA840,
    PA860,
    PA870,
    PA880,
    AC110,
    AC120,
    AC130,
    AC210,
    AC510,
    AC530,
    AC540,
    AC550,
    AC560,
    AC570,
    AC590,
    AC580,
    AC610,
    AC620,
    AC630,
    AC520,
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
    CaretRightOutlined,
    DxSortable,
    DxTabs,
    CommunicationBoard
  },
  created() {
    const tabsCached = sessionStorage.getItem('tabsCached')
    if (tabsCached) {
      const arrTabsCached = tabsCached.split(',')
      if (arrTabsCached.length > 1) {
        return
      }
    }
    if (import.meta.env.VITE_ENVIRONMENT === 'DEVELOP' || true) {
      menuData.forEach((item) => {
        if (this.$route.fullPath.includes(item.id)) {
          // clear vuex value cachedTab
          // this.$store.state.common.cachedTab.push(item.id.toUpperCase().replaceAll('-', ''))
          this.activeTab = item;
          this.$store.state.common.activeTab = item
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
      }
    } else {
      menuData.forEach((item) => {
        if (this.$route.fullPath.includes(item.id)) {
          // clear vuex value cachedTab
          // this.$store.state.common.cachedTab.push(item.id.toUpperCase().replaceAll('-', ''))
          this.activeTab = item;
          this.$store.state.common.activeTab = item
        }
      });
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
          if (newValue.id.includes("bf-5")) {
            this.openKeys = ["bf-000", "bf-500"];
          }
          if (newValue.id.includes("bf-6")) {
            this.openKeys = ["bf-000", "bf-600"];
          }
          if (newValue.id.includes("cm-1")) {
            this.openKeys = ["cm-100", "cm-120"];
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
          if (newValue.id.includes("pa-8")) {
            this.openKeys = ["pa-000", "pa-800"];
          }
          if (newValue.id.includes("ac-6")) {
            this.openKeys = ["ac-000", "ac-600"];
          }
          if (newValue.id !== "#") {
            this.$router.push(`/${newValue.id}`);
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
      if (this.activeTab.id === "bf-510") return 'BF510';
      if (this.activeTab.id === "bf-530") return 'BF530';
      if (this.activeTab.id === "bf-610") return 'BF610';
      if (this.activeTab.id === "bf-620") return 'BF620';
      if (this.activeTab.id === "bf-640") return 'BF640';
      if (this.activeTab.id === "bf-650") return 'BF650';
      if (this.activeTab.id === "bf-630") return 'BF630';
      if (this.activeTab.id === "cm-110") return 'CM110';
      if (this.activeTab.id === "cm-121") return 'CM121';
      if (this.activeTab.id === "cm-130") return 'CM130';
      if (this.activeTab.id === "pa-110") return 'PA110';
      if (this.activeTab.id === "pa-120") return 'PA120';
      if (this.activeTab.id === "pa-210") return 'PA210';
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
      if (this.activeTab.id === "pa-810") return 'PA810';
      if (this.activeTab.id === "pa-820") return 'PA820';
      if (this.activeTab.id === "pa-830") return 'PA830';
      if (this.activeTab.id === "pa-840") return 'PA840';
      if (this.activeTab.id === "pa-860") return 'PA860';
      if (this.activeTab.id === "pa-880") return 'PA880';
      if (this.activeTab.id === "pa-870") return 'PA870';
      if (this.activeTab.id === "ac-110") return 'AC110';
      if (this.activeTab.id === "ac-120") return 'AC120';
      if (this.activeTab.id === "ac-130") return 'AC130';
      if (this.activeTab.id === "ac-210") return 'AC210';
      if (this.activeTab.id === "ac-510") return 'AC510';
      if (this.activeTab.id === "ac-530") return 'AC530';
      if (this.activeTab.id === "ac-520") return 'AC520';
      if (this.activeTab.id === "ac-540") return 'AC540';
      if (this.activeTab.id === "ac-550") return 'AC550';
      if (this.activeTab.id === "ac-560") return 'AC560';
      if (this.activeTab.id === "ac-570") return 'AC570';
      if (this.activeTab.id === "ac-590") return 'AC590';
      if (this.activeTab.id === "ac-580") return 'AC580';
      if (this.activeTab.id === "ac-610") return 'AC610';
      if (this.activeTab.id === "ac-620") return 'AC620';
      if (this.activeTab.id === "ac-630") return 'AC630';
      if (this.activeTab.id === "communication-board") return 'CommunicationBoard';
      if (this.activeTab.id === "example" || this.activeTab.id === "") return 'Example';
      return Test;
    },
  },
  setup() {
    const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT
    const MAX_TAB = 20
    const inputSearchText = ref("");
    const filteredResult = ref([]);
    const openKeys = ref([]);
    const rootSubmenuKeys = ref(["bf-000", "cm-100", "ac-000", "pa-000"]);
    const selectedKeys = ref([]);
    const state = ref(false);
    let menuItems = menuTree;
    const store = useStore();
    const count = computed(() => store.getters['settings/changeFacilityBusiness'])

    const route = useRoute();
    const router = useRouter();
    const collapsed = ref(false);
    const selectedItems = ref(null);
    const activeTab = ref();
    let menuTab = ref([]);
    const tabDashboard = { name: "Dashboard", url: "/dashboard", id: "" }
    const tabIndex = ref()
    let isRemoveTab = ref(false);
    let tabRemove = ref();
    let isClickArrowTab = ref(false)
    const token = sessionStorage.getItem("token");
    // this code process if refresh token expr then open popup
    const now = ref(dayjs().valueOf())
    const loginExprTime = ref(parseInt(sessionStorage.getItem("loginExpr")));
    const statusLogin = ref(false);
    const intervalId = setInterval(() => {
      now.value = dayjs().valueOf();
      loginExprTime.value = parseInt(sessionStorage.getItem("loginExpr"))
      const remainingLogout = now.value - loginExprTime.value;
      const diffInHours = remainingLogout / 3600000;
      if(diffInHours >= 8) statusLogin.value = true;
    }, 1000);
    const logout = ()=>{
      router.push("/login");
      location.reload();
      store.commit("auth/logout");
    }
    const jwtObject = getJwtObject(token);
    const isCheckfirstLoadTabsCached = ref(false)

    // cachedtab is used to handle exclude in the keep-alive tag
    const cachedTab = computed(() => {
      return menuTab.value.map((tab) => tab.id.toUpperCase().replaceAll('-', '') || 'Example')
    })

    watch(() => cachedTab.value, (value) => {
      sessionStorage.setItem('tabsCached', value.toString());
    })

    // const infosAccounting = jwtObject.accounting;
    // if(!!infosAccounting && infosAccounting.length) {
    //   store.commit('settings/setGlobalFacilityBizId', infosAccounting[0].id)
    // }

    onMounted(async () => {
      // set tabs cached
      const tabsCached = sessionStorage.getItem('tabsCached')
      if (tabsCached) {
        const arrTabsCached = tabsCached.split(',')
        if (arrTabsCached.length > 1) {
          isCheckfirstLoadTabsCached.value = true
          const currentTabsCached = []
          arrTabsCached.forEach((nameTabsCached) => {
            if (nameTabsCached === 'Example') {
              currentTabsCached.push({ name: "dashboard", url: "/dashboard", id: "" })
            } else {
              const tab = menuData.find(tab => tab.id.toUpperCase().replaceAll('-', '') === nameTabsCached)
              if (tab) {
                currentTabsCached.push(tab)
              }
            }
          })
          setMenuTab(currentTabsCached)
        }
      }

      store.commit('auth/setTokenInfo', jwtObject)

      // store.commit('auth/setTokenInfo',jwtObject)
      const codes = sessionStorage.getItem("accountSubject")
      const globalFacilityBizId = sessionStorage.getItem("globalFacilityBizId")
      const acYear = sessionStorage.getItem("acYear")
      if (!codes && acYear && globalFacilityBizId) {
        store.dispatch("settings/getAccountSubject", {companyId: jwtObject.companyId, fiscalYear: +acYear, facilityBizType: +globalFacilityBizId})
      }
      // open first menu route dashboard
      if (route.fullPath === "/dashboard/" || route.fullPath === "/dashboard") {
        if (ENVIRONMENT === 'DEVELOP' || true) {
          openTab(tabDashboard)
        }
        await nextTick(() => {
          let count = 0
          menuItems.forEach(item => {
            const { read } = useCheckPermission(item.roles)
            if (read && count === 0) {
              openKeys.value = [item.id]
              count++
            }
          })
        })
      }
      menuData.forEach(tab => {
        if (route.fullPath.includes(tab.id)) {
          openTab(tab)
        }
      })
    })

    const onSearch = (key) => {
      state.value = true;
      filteredResult.value = [];
      inputSearchText.value = key;
      if (menuData?.length > 0) {

        menuData.forEach((val) => {
          const searchId = val.name.includes(key) || val.id.includes(key);
          if (searchId) {
            filteredResult.value.push(val);
          }
        });
      }
    }

    const addMenuTab = (itemId) => {
      if (isClickArrowTab.value) {
        isClickArrowTab.value = false
        const itemNew = itemId === '' ? tabDashboard : menuData.find(item => item.id === itemId);
        if (itemNew.url == '#') {
          return
        }
        const indexActive = menuTab.value.findIndex(tab => tab.id === itemId)
        if (indexActive >= 0) {
          tabIndex.value = indexActive
        }
        activeTab.value = itemNew
        openTab(itemNew)
        return
      }
      if (ENVIRONMENT === 'DEVELOP' || true) {
        if (menuTab.value.length >= MAX_TAB && !menuTab.value.some((tab) => tab.id === itemId)) {
          notification('error', `이미 최대 개수의 탭을 열었기 때문에 새 탭을 열 수없습니다. (최대 ${MAX_TAB}탭)`)
          return
        }
        const itemNew = itemId === '' ? tabDashboard : menuData.find(item => item.id === itemId);
        if (itemNew.url == '#') {
          return
        }
        const indexActive = menuTab.value.findIndex(tab => tab.id === itemId)
        if (indexActive >= 0) {
          tabIndex.value = indexActive
        }
        activeTab.value = itemNew
        openTab(itemNew)
      } else {
        if (itemId === '') {
          // clear all tab
          // setMenuTab([])
          return
        } else {
          if (menuTab.value.length >= MAX_TAB && !menuTab.value.some((tab) => tab.id === itemId)) {
            notification('error', `이미 최대 개수의 탭을 열었기 때문에 새 탭을 열 수없습니다. (최대 ${MAX_TAB}탭)`)
            return
          }
          const itemNew = menuData.find(item => item.id === itemId);
          if (itemNew.url == '#') {
            return
          }
          const indexActive = menuTab.value.findIndex(tab => tab.id === itemId)
          if (indexActive >= 0) {
            tabIndex.value = indexActive
          }
          activeTab.value = itemNew
          openTab(itemNew)
        }
      }
    }


    /**
     * event when click icon close one tab
     */
    const removeItemTab = (item) => {
      if (menuTab.value.length === 1 && item.id === '') return
      tabRemove.value = item
      isRemoveTab.value = true
      if (menuTab.value.length === 1) {
        setMenuTab([])
      } else {
        const newMenuTab = menuTab.value.filter(item => item.id !== tabRemove.value.id)
        setMenuTab(newMenuTab)
      }
    }
    const changeActiveTab = (item) => {
      if (activeTab.value.id === item.id) return
      activeTab.value = {
        id: item.id,
        name: item.name,
        url: item.url,
        roles: item.roles,
      };
      store.state.common.activeTab = activeTab.value
    }

    const onTabDragStart = (e) => {
      changeActiveTab(menuTab.value[e.fromIndex])
      e.itemData = e.fromData[e.fromIndex];
    }

    const onTabDrop = (e) => {
      const newMenuTab = [...menuTab.value];
      newMenuTab.splice(e.fromIndex, 1);
      newMenuTab.splice(e.toIndex, 0, e.itemData);
      menuTab.value = newMenuTab;
    }

    /**
     * monitor activeTab variable on vuex to blow activeTab variable at component
     */
    watch(() => store.state.common.activeTab, (newValue) => {
      selectedItems.value = null
      activeTab.value = newValue;
      const indexTab = menuTab.value.findIndex(tab => tab.id === activeTab.value.id)
      if (indexTab >= 0) {
        tabIndex.value = indexTab
      }
    }, { deep: true })

    watch(() => store.state.common.menuTab, (value) => {
      if (isCheckfirstLoadTabsCached.value) {
        isCheckfirstLoadTabsCached.value = false
        menuTab.value = value.map(tab => ({ ...tab, text: tab.name }))
        const indexTab = menuTab.value.findIndex(tab => tab.id === activeTab.value?.id)
        if (indexTab >= 0) {
          tabIndex.value = indexTab
        } else {
          activeTab.value = menuTab.value[menuTab.value.length - 1]
          tabIndex.value = menuTab.value.length - 1
        }
        return
      }
      if (isRemoveTab.value) {
        if (value.length) {
          const indexTabRemove = menuTab.value.findIndex(tab => tab.id === tabRemove.value.id)
          menuTab.value = menuTab.value.filter(tab => tab.id !== tabRemove.value.id)
          const maxInexBeforeRemove = menuTab.value.length
          let indexActive = 0

          if (tabIndex.value === maxInexBeforeRemove && indexTabRemove === maxInexBeforeRemove) {
            indexActive = tabIndex.value - 1
          } else {
            if (indexTabRemove < tabIndex.value) {
              indexActive = tabIndex.value - 1
            } else {
              indexActive = tabIndex.value
            }
          }
          activeTab.value = {
            id: menuTab.value[indexActive].id,
            name: menuTab.value[indexActive].name,
            url: menuTab.value[indexActive].url,
            roles: menuTab.value[indexActive].roles,
          };
          store.state.common.activeTab = { ...activeTab.value }
          nextTick(() => {
            tabIndex.value = indexActive
          })
        } else {
          menuTab.value = []
          isRemoveTab.value = false
          activeTab.value = null
          if (ENVIRONMENT === 'DEVELOP' || true) {
            openTab(tabDashboard)
            return
          } else {
            router.push(`/dashboard`);
          }
        }
        isRemoveTab.value = false
        return
      }
      if (!value.length) {
        if (ENVIRONMENT === 'DEVELOP' || true) {
          menuTab.value = []
          openTab(tabDashboard)
        } else {
          activeTab.value = null
          menuTab.value = []
        }
      } else {
        const newItem = value[value.length - 1]
        menuTab.value = [...menuTab.value, { ...newItem, text: newItem.name }]
        nextTick(() => {
          tabIndex.value = menuTab.value.length - 1
        })
      }
    }, {
      deep: true,
    })
    watch(() => menuTab.value, () => {
      nextTick(() => {
        const btnArrowTab = document.querySelector('.tab-main')?.querySelectorAll('.dx-button-content')
        if (!!btnArrowTab && btnArrowTab.length) {
          btnArrowTab[0].addEventListener("click", (e) => {
            e.preventDefault();
            isClickArrowTab.value = true
            addMenuTab(menuTab.value[0].id)
          });
          btnArrowTab[1].addEventListener("click", (e) => {
            e.preventDefault();
            isClickArrowTab.value = true
            addMenuTab(menuTab.value[menuTab.value.length - 1].id)
          });
        }
      })
    })
    const onOpenChange = (opKeys) => {
      const latestOpenKey = opKeys.find(
        (key) => openKeys.value.indexOf(key) === -1
      );
      if (rootSubmenuKeys.value.indexOf(latestOpenKey) === -1) {
        if (latestOpenKey && latestOpenKey.includes("bf")) {
          openKeys.value = ["bf-000", latestOpenKey];
        } else if (latestOpenKey && latestOpenKey.includes("cm")) {
          openKeys.value = ["cm-100", latestOpenKey];
        } else if (latestOpenKey && latestOpenKey.includes("ac")) {
          openKeys.value = ["ac-000", latestOpenKey];
        } else if (latestOpenKey && latestOpenKey.includes("pa")) {
          openKeys.value = ["pa-000", latestOpenKey];
        }
      } else {
        openKeys.value = latestOpenKey ? [latestOpenKey] : [];
      }
    }
    const openTabBoard = () => {
      router.push('/communication-board')
      openTab({ id: 'communication-board', name: 'Communication Board', url: '/communication-board' })
    }
    return {
      onSearch,
      addMenuTab,
      removeItemTab,
      changeActiveTab,
      onOpenChange,
      statusLogin,
      menuItems,
      menuData,
      activeTab,
      menuTab,
      collapsed,
      selectedItems,
      selectedKeys,
      openKeys,
      store,
      cachedTab,
      tabIndex,
      onTabDragStart,
      onTabDrop,
      MAX_TAB,
      count,
      logout,
      ENVIRONMENT,
      openTabBoard
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

.not-done {
  color: red;
}

::v-deep .dx-datagrid .dx-row>td {
  padding: 5px;
}
</style>
<style>
.vue3-tabs-chrome {
  padding-top: 0 !important;
}
</style>
<style scoped lang="scss">
.color-active-tab {
  color: #1890ff;
}

.tab-main-emtytab {
  height: 40px;
  background-color: #337ab7;
  width: 100%;
}

:deep .tab-main .dx-tabs-wrapper {
  display: flex;
  align-items: end;
  background-color: #337ab7;
  padding-top: 4px;
}

:deep .tab-main .dx-tab {
  background-color: rgb(228, 228, 228);
  height: 36px;
  width: auto;
  margin: 0 1.5px;
  border-radius: 8px 8px 0 0;
  padding: 0;
}

:deep .tab-main .dx-tab-content {
  span:first-child {
    width: 150px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }

  span:last-child {
    margin-left: 0 !important;

    svg {
      margin-bottom: 3px;
    }
  }
}

:deep .tab-main .tab-main-title-tab {
  padding: 9px;
}

:deep .tab-main .dx-tab-selected {
  background-color: #ffffff !important;
  border-radius: 8px 8px 0 0 !important;
}

:deep .tab-main .dx-tabs {
  background-color: #337ab7;
  -webkit-box-shadow: none;
  border: none;
  outline: none;
}

:deep .dx-tabpanel.dx-state-focused>.dx-tabpanel-tabs .dx-tabs {
  -webkit-box-shadow: none;
  border: none;
  outline: none;
}

:deep .dx-tab-selected::after {
  border: none;
}

:deep .tab-main .dx-tabs-nav-button {
  top: 4px;
  height: 37px;
}

:deep .tab-main .dx-sortable {
  height: 40px;
}

:deep .tab-main .dx-tabs-scrollable .dx-tabs-wrapper {
  border-left: 0;
  border-right: 0;
}
</style>
