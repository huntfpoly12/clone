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
      
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
      >
        <a-sub-menu v-for="(menuItem, index) in menuItems" :key="`sub${index}`">
          <template #title>{{menuItem.title}}</template>
            <a-sub-menu v-for="(subMenu, index) in menuItem.subMenus" :key="`submenu${index}`" :title="subMenu.title">
              <a-menu-item v-for="(item, index) in subMenu.items" :key="index">
                <router-link :to="item.url">{{item.name}}</router-link>
              </a-menu-item>
              
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
      menuItems: [{
        title: 'Back Office',
        subMenus: [
          {
            title: '서비스가입',
            items: [
              {name: '인증', url: '#'},
              {name: '개인정보관리', url: '#'}
             ]
          },
          {
            title: '회원관리',
            items: [
              {name: '회원등록', url: '#'}, 
              {name: '권한그룹', url: '#'}, 
              {name: '기초정보설정', url: '#'}
              ]
          },
          {
            title: '계약관리',
            items: [
              {name: '계약정보관리,심사', url: '#'}, 
              {name: '사업자관리', url: '#'}, 
              {name: '서비스관리', url: '#'},
              {name: '영업자관리', url: '#'}
            ]
          },
          {
            title: '수납관리',
            items: [
              {name: '요금청구,심사', url: '#'}, 
              {name: '서비스해지', url: '#'}, 
              {name: '미납관리', url: '#'},
              {name: '수납관리', url: '#'}
            ]
          },
          {
            title: '업무마감',
            items: [
              {name: '회계업무마감관리', url: '#'}, 
              {name: '원천업무마감관리', url: '#'}, 
              {name: '4대보험업무관리', url: '#'},
              {name: '제본/배송관리', url: '#'}
            ]
          }
        ]
      },
      {
        title: '공통모듈',
        subMenus: [
          {
            title: '사용자업무설정',
            items: [
              {name: '기초정보설정', url: '#'},
              {name: '회계설정', url: '#'},
              {name: '원천설정', url: '#'}
             ]
          },
        ]
      },
      ]
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
      selectedKeys: ['sub0'],
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