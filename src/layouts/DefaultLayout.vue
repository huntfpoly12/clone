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
        <a-layout-content>
            <div class="header-content">
                <div class="left">
                    <a-button type="primary" @click="() => (collapsed = !collapsed)">
                        <menu-unfold-outlined v-if="collapsed" class="trigger" />
                        <menu-fold-outlined v-else class="trigger" />
                    </a-button>
                    <div class="wrap-search">
                        <a-input v-model:value="inputSearchText" placeholder="Search Menu"
                            @keyup="onSearch($event.target.value)" :class="{ shown: state }"
                            @click.prevent="toggleDropdown" @blur="focusInput" />
                        <div>
                            <div class="box-search search-height" v-if="filteredResult.length" v-show="state">
                                <div v-for="(result, resultIndex) in filteredResult" :key="resultIndex"
                                    class="item-search" @click.prevent="toggleDropdown">
                                    <router-link :to="result.url">
                                        {{ result.name }}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div v-if="inputSearchText.length > 0">
                            <div class="box-search search-height" v-if="filteredResult.length" v-show="state">
                                <div v-for="(result, resultIndex) in filteredResult" :key="resultIndex"
                                    class="item-search" @click.prevent="toggleDropdown">
                                    <router-link :to="result.url" @click.enter="addMenuTab(result)">
                                        {{ result.id + ' | ' + result.name }}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div v-if="inputSearchText.length === 0">
                            <div class="box-search search-height" v-show="state" @click.prevent="toggleDropdown">
                                <div v-for="result in menuData" :key="result.id" class="item-search">
                                    <router-link :to="result.url" @click.enter="addMenuTab(result)">
                                        {{ result.id + ' | ' + result.name }}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div v-if="filteredResult.length === 0 && inputSearchText.length" v-show="state"
                            class="box-search search-no-data" @click.prevent="toggleDropdown">
                            No Data
                        </div>
                    </div>
                </div>
                <div class="right">
                    <nav class="nav-tabs" v-if="menuTab.length > 0">
                        <ul class="list-menu-tab">
                            <li v-for="(item, index) in menuTab" :class="activeTab.id === item.id? 'active': ''"
                                :key="index" @click="changeActiveTab(item)"> {{item.name}} <DxButton
                                    @click="removeItemTab(index)"><svg focusable="false" class="" data-icon="close"
                                        width="1em" height="1em" fill="currentColor" aria-hidden="true"
                                        viewBox="64 64 896 896">
                                        <path
                                            d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
                                        </path>
                                    </svg></DxButton>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <a-layout>
                <a-layout-sider width="300" v-model:collapsed="collapsed" :trigger="null" collapsible>
                    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" :open-keys="openKeys"
                        @openChange="onOpenChange">
                        <a-sub-menu v-for="menuItem in menuItems" :key="menuItem.id">
                            <template #icon>
                                <MailOutlined />
                            </template>
                            <template #title>{{ menuItem.title }}</template>
                            <a-sub-menu v-for="subMenu in menuItem.subMenus" :key="subMenu.id" :title="subMenu.title">
                                <a-menu-item v-for="item in subMenu.items" :key="item.id"
                                    @click.enter="addMenuTab(item)">
                                    <router-link :to="item.url">{{ item.name }}</router-link>
                                </a-menu-item>
                            </a-sub-menu>
                        </a-sub-menu>
                    </a-menu>
                </a-layout-sider>
                <a-layout>

                    <a-layout-content :style="{ background: '#fff',  margin: 0, minHeight: '280px' }">
                        <div class="top-content">
                            <a-typography-title :level="3">{{activeTab.name}} </a-typography-title>
                            <div class="list-action">
                                <a-tooltip>
                                    <template #title>조회</template>
                                    <a-button>
                                        <SearchOutlined />
                                    </a-button>
                                </a-tooltip>
                                <a-tooltip>
                                    <template #title>저장</template>
                                    <a-button>
                                        <SaveOutlined />
                                    </a-button>
                                </a-tooltip>
                                <a-tooltip>
                                    <template #title>삭제</template>
                                    <a-button>
                                        <DeleteOutlined />
                                    </a-button>
                                </a-tooltip>
                                <a-tooltip>
                                    <template #title>출력</template>
                                    <a-button>
                                        <PrinterOutlined />
                                    </a-button>
                                </a-tooltip>
                            </div>
                        </div>
                        <div class="main-content">
                            <template v-if="activeTab">
                                <keep-alive>
                                    <component v-bind:is="currentComponent" />
                                </keep-alive>
                            </template>
                            <template v-else>
                                <keep-alive>
                                    <router-view></router-view>
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
import { defineComponent, reactive, toRefs, ref } from "vue";
import BF310 from '../views/BF/BF3/BF310/index.vue'
import BF320 from '../views/BF/BF3/BF320/index.vue'
import BF330 from '../views/BF/BF3/BF330/index.vue'
import Test from '../views/DefaultComponent.vue'
import Style from "./style/styleLayout.scss";
import _ from "lodash";
import menuTree from "./menuTree"
import menuData from "./menuData"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SearchOutlined,
    SaveOutlined,
} from '@ant-design/icons-vue';

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
        BF330,
        Test,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        MailOutlined,
        PrinterOutlined,
        DeleteOutlined,
        SearchOutlined,
        SaveOutlined,
        Style
    },
    created() {
        menuData.forEach(item => {
            if (this.$route.fullPath.includes(item.id)) {
                this.activeTab = item
            }
        })
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
            if (this.activeTab.id === '') return
            if (this.activeTab.id === 'bf-310') return BF310
            if (this.activeTab.id === 'bf-320') return BF320
            if (this.activeTab.id === 'bf-330') return BF330
            return Test
        }

    },
    methods: {
        logout() {
            this.$router.push("/login");
            location.reload();
            this.$store.commit("auth/logout");
        },

        onSearch(key) {
            this.state = true
            this.filteredResult = [];
            this.inputSearchText = key
            if (
                this.menuData?.length > 0
            ) {
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
            this.activeTab = item
        },
        removeItemTab(item) {
            this.menuTab.splice(item, 1)
        },
        changeActiveTab(item) {
            this.activeTab = item
        },
        focusInput() {
            this.state = false
        }
    },
    mounted() {
        document.addEventListener("click", this.close);
    },
    setup() {
        const state = reactive({
            rootSubmenuKeys: ['bf-000', 'cm-000', 'ac-000', 'pa-000'],
            openKeys: ['bf-000'],
            selectedKeys: [],
        });
        const collapsed = ref(false)
        const onOpenChange = openKeys => {
            const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);

            if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                state.openKeys = openKeys;
            } else {
                state.openKeys = latestOpenKey ? [latestOpenKey] : [];
            }
        };
        return {
            ...toRefs(state),
            onOpenChange,
            collapsed,
        };
    },

});
</script>
