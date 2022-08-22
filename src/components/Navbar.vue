<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar">
    <div class="brand">BankDa</div>
    <div class="profile"><a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      Profile
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;">Info</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">Edit Profile</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">Logout</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown></div>
  </nav>
</template>

<script>

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
