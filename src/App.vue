<template>
    <router-view></router-view>
</template>

<script lang="ts">
// import { setNewUserToken } from './helpers/commonFunction';

export default {
  name: "App",
   data() {
    return {
      layout: `div`,
    };
  },
  // mounted() {
  //   setNewUserToken();
  // }

};
</script>

<style>
#app {
  min-width: 1640px;
  overflow-x: auto;
}
.page-content {
  padding: 24px;
}
.dx-select-checkbox {
    display: inline-block !important;
}
.search-form .col {
  display: flex;
  align-items: center;
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
.pagination-table {
  margin-top: 10px;
}
.ant-menu-item-selected-active {
  background: #1890ff;
}
.ant-menu-item-selected-active a {
  color: #fff;
}
.ant-select {
  width: auto;
  min-width: 135px;
}
.lable-item {
    margin-right: 10px;
  }
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: transparent !important;
  }
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected-active {
    background-color: #1890ff !important;
  }

  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected-active a {
    color: #fff !important;
  }
body {
  margin: 0;
  padding: 0;
}
</style>
