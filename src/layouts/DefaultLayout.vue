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
                        <a-input v-model:value="inputSearchText" placeholder="Search Menu" @change="onSearch"
                            :class="{ shown: state }" @click.prevent="toggleDropdown" />
                        <div class="test" v-if="inputSearchText.length > 0">
                            <div class="box-search search-height" v-if="filteredResult.length" v-show="state">
                                <div v-for="(result, resultIndex) in filteredResult" :key="resultIndex"
                                    class="item-search" @click.prevent="toggleDropdown">
                                    <router-link :to="result.url" @click.enter="addMenuTab(result)">
                                        {{ result.id + ' | ' + result.name }}
                                    </router-link>
                                </div>
                            </div>
                        </div>

                        <div class="test" v-if="inputSearchText.length === 0">
                            <div class="box-search search-height" v-show="state" @click.prevent="toggleDropdown">
                                <div v-for="(result) in menuData" class="item-search">
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
                            <li v-for="(item, index) in menuTab" :class="activeTab === item.id? 'active': ''"
                                :key="index" @click="changeActiveTab(item)"> {{item.name}}
                                <DxButton @click="removeItemTab(index)">
                                    <svg focusable="false" class="" data-icon="close" width="1em" height="1em"
                                        fill="currentColor" aria-hidden="true" viewBox="64 64 896 896">
                                        <path
                                            d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
                                        </path>
                                    </svg>
                                </DxButton>
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
                <a-layout style="padding: 0 24px 24px 24px">

                    <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                        <a-typography-title :level="2">{{activeTab.name}} </a-typography-title>
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
import Test from '../views/DefaultComponent.vue'
import _ from "lodash";
import menuTree from "./menuTree"
import menuData from "./menuData"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
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
        Test,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        PieChartOutlined,
        MailOutlined,
        DesktopOutlined,
        InboxOutlined,
        AppstoreOutlined,
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
            if (this.activeTab.id === 'bf-320') return BF320;
            return Test
        }

    },
    methods: {
        logout() {
            this.$router.push("/login");
            location.reload();
            this.$store.commit("auth/logout");
        },

        onSearch() {
            this.filteredResult = [];
            if (
                this.menuData?.length > 0 &&
                this.inputSearchText?.length >= 1
            ) {
                this.menuData.forEach((val) => {
                    const searchId = val.name.includes(this.inputSearchText) || val.id.includes(this.inputSearchText);
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
            collapsed
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

.header-content {
    display: flex;
    background: #91d5ff;
    align-items: center;

    .left {
        flex-basis: 300px;
        display: flex;
        align-items: center;
        padding-left: 15px;
        height: 58px
    }

    .right {
        padding-left: 24px;
        padding-top: 5px;
        flex-basis: calc(100% - 324px);
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
    padding-left: 15px;
    width: calc(100% - 65px);
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
    width: 204px;
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

::v-deep .ant-layout-header {
    background-color: #096dd9;
}

::v-deep h3.ant-typography {
    margin-bottom: 0;
}

.main-content {
    padding: 24px;
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

            svg {
                float: right;
                margin-top: 12px;
                margin-left: 10px;
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