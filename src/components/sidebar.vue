<template>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        :open-keys="openKeys"
        @openChange="onOpenChange"
      >
      <a-sub-menu v-for="menuItem in menuItems" :key="menuItem.id">
          <template #icon>
              <MailOutlined />
            </template>
              <template #title>{{ menuItem.title }}</template>
              <a-sub-menu v-for="subMenu in menuItem.subMenus" :key="subMenu.id" :title="subMenu.title">
                <a-menu-item v-for="item in subMenu.items" :key="item.id" @click.enter="addMenuTab(item)">
  
                  <router-link :to="item.url">{{ item.name }}</router-link>
                </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
      </a-menu>
 
  </template>
  <script lang="ts">
  import menuTree from "../layouts/menuTree"
  import { defineComponent, reactive, toRefs, watch, ref } from 'vue';
  import {

    MailOutlined

  } from '@ant-design/icons-vue';
  export default defineComponent({
    components: {
      MailOutlined,
    },
    setup() {
      const state = reactive({
        collapsed: false,
        rootSubmenuKeys: ['bf-000', 'cm-000', 'ac-000', 'pa-000'],
        openKeys: ['sub1'],
        selectedKeys: [],
        preOpenKeys: ['sub1'],
      });
      const menuItems = ref(menuTree)
      watch(
        () => state.openKeys,
        (_val, oldVal) => {
          state.preOpenKeys = oldVal;
        },
      );
      const toggleCollapsed = () => {
        state.collapsed = !state.collapsed;
        state.openKeys = state.collapsed ? [] : state.preOpenKeys;
      };
      const onOpenChange = (openKeys: string[]) => {
        const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
        if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
          state.openKeys = openKeys;
        } else {
          state.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      };
      const addMenuTab = (item: any) => {
        $emit('update-cart', item)
      }
      return {
        ...toRefs(state),
        toggleCollapsed,
        onOpenChange,
        menuItems,
        addMenuTab
      };
    },
  });

function $emit(arg0: string, item: any) {
  throw new Error("Function not implemented.");
}
  </script>