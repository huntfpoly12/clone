<template>
  <a-layout>
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
    <a-layout>
      <a-layout-sider width="250" >
        <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
      >
        <a-sub-menu key="sub2">
          <template #title>Back Office</template>
          <a-sub-menu key="sub3" title="서비스가입">
            <a-menu-item key="11">인증</a-menu-item>
            <a-menu-item key="12">개인정보관리</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4" title="회원관리">
            <a-menu-item key="11">회원등록</a-menu-item>
            <a-menu-item key="12">권한그룹</a-menu-item>
            <a-menu-item key="12">기초정보설정</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          Content
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, reactive, toRefs, watch} from 'vue';
export default defineComponent({
  name: `LayoutDefault`,
  data() {
    return {
      user: null,
    };
  },
  created() {
    // Simulate fetching user data.
    setTimeout(() => {
      this.user = { name: `John Doe` };
    }, 2000);
  },
  computed: {
    username() {
      if(localStorage.getItem('username')) {
        return localStorage.getItem('username')
      } else {
        return ''
      }
    }
  },
  methods: {
    logout() {
      this.$router.push("/login")
      location.reload()
      this.$store.commit("auth/logout");
    }
  },
   setup() {
    const state = reactive({
      collapsed: false,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1'],
    });

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

    return {
      ...toRefs(state),
      toggleCollapsed,
    };
   }
});
</script>

<style scoped>
.ant-layout.ant-layout-has-sider {
  height: calc(100vh - 64px);
}
.ant-layout-header {
  display: flex;
  justify-content: space-between;
  background: none;
}
</style>