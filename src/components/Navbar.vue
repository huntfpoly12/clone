<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <a-layout-header class="header">
      <div class="nav-logo">BankDa</div>
      <div class="user-info" v-if="username">
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
           {{username}}
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
</template>

<script>
  export default {
    computed: {
      username() {
        if(localStorage.getItem('username')) {
          return localStorage.getItem('username')
        } else {
          return ''
        }
      }
    },
  }
</script>

<style scoped>
.navbar {
  align-items: center;
  height: 60px;
  width: 100%;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  background: #ccc;
}
</style>
