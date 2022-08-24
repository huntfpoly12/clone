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
      <a-layout-sider width="300" >
        <a-menu
      
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
      >
        <a-sub-menu v-for="(menuItem, i) in menuItems" :key="`sub${i}`">
          <template #title>{{menuItem.title}}</template>
            <a-sub-menu v-for="(subMenu, j) in menuItem.subMenus" :key="`submenu${j}`" :title="subMenu.title">
              <a-menu-item v-for="(item, k) in subMenu.items" :key="`${j}${k}`">
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
      {
        title: '회계모듈',
        subMenus: [
          {
            title: '입력/마감',
            items: [
              {name: '통장내역', url: '#'},
              {name: '전표', url: '#'},
              {name: '마감', url: '#'}
             ]
          },
          {
            title: 'W4C',
            items: [
              {name: '전표/결의', url: '#'},
              {name: '예산서', url: '#'},
              {name: '결산서', url: '#'}
             ]
          },
          {
            title: '예산',
            items: [
              {name: '세입예산서', url: '#'},
              {name: '세출예산서', url: '#'},
              {name: '예산총괄표', url: '#'},
              {name: '임직원보수일람표', url: '#'},
              {name: '과목전용조서', url: '#'},
              {name: '추가경정 세입예산서', url: '#'},
              {name: '추가경정 세출예산서', url: '#'},
              {name: '예산서 자동작성', url: '#'},
             ]
          },
           {
            title: '결산',
            items: [
              {name: '세입결산서', url: '#'},
              {name: '세출결산서', url: '#'},
              {name: '예비비사용조서', url: '#'},
              {name: '정부보조금명세서', url: '#'},
              {name: '후원금수입및사용결고보고서', url: '#'},
              {name: '후원금계좌거래내역', url: '#'},
              {name: '사업비명세서', url: '#'},
              {name: '기타비용명세서', url: '#'},
             ]
          },
          {
            title: '보고서',
            items: [
              {name: '장부', url: '#'},
              {name: '필요경비대장', url: '#'},
              {name: '정부보조금명세서', url: '#'},
              {name: '보조금정산서', url: '#'},
             ]
          },
        ]
      },
      {
        title: '원천모듈',
        subMenus: [
          {
            title: '근로소득관리',
            items: [
              {name: '근로소득자료입력', url: '#'},
              {name: '사원등록', url: '#'},
             ]
          },
          {
            title: '세무신고,연말정산',
            items: [
              {name: '원천징수이행상황신고서', url: '#'},
              {name: '근로소득원천징수영수증', url: '#'},
              {name: '소득자별근로소득원천징수부', url: '#'},
              {name: '연말정산간소화입력', url: '#'},
              {name: '의료비지급명세서', url: '#'},
              {name: '기부금명세서', url: '#'},
              {name: '연말정산현황', url: '#'}
             ]
          },
          {
            title: '전자신고',
            items: [
              {name: '원천세,지방소득세신고', url: '#'},
              {name: '지급명세서전자신고(연말정산)', url: '#'},
              {name: '간이지급명세서전자신고', url: '#'},
              {name: '일용직전자신고', url: '#'},
             ]
          },
           {
            title: '퇴직소득관리',
            items: [
              {name: '퇴직금시뮬레이션', url: '#'},
              {name: '퇴직소득자료입력', url: '#'},
              {name: '퇴직소득원천징수영수증', url: '#'},
             ]
          },
          {
            title: '일용직근로소득관리',
            items: [
              {name: '일용직근로소득자료입력', url: '#'},
              {name: '일용직사원등록', url: '#'},
              {name: '일용직근로소득원천징수영수증', url: '#'},
             ]
          },
          {
            title: '사업소득관리',
            items: [
              {name: '사업소득자등록', url: '#'},
              {name: '사업소득자료입력', url: '#'},
              {name: '사업소득원천징수영수증', url: '#'},
             ]
          },
          {
            title: '기타소득관리',
            items: [
              {name: '기타소득자등록', url: '#'},
              {name: '기타소득자등록', url: '#'},
              {name: '기타소득자료입력', url: '#'},
              {name: '기타소득원천징수영수증', url: '#'},
             ]
          },
          {
            title: '4대보험',
            items: [
              {name: '취득신고', url: '#'},
              {name: '상실신고', url: '#'},
              {name: '급여변경신고', url: '#'},
              {name: '휴직복직신고', url: '#'},
              {name: '보수총액신고', url: '#'},
              {name: '보험사무대행신고', url: '#'},
              {name: '사업장가입신고', url: '#'},
              {name: '사업장탈퇴신고', url: '#'},
              {name: '통합업무조회', url: '#'},
             ]
          },
          {
            title: '데이터연동',
            items: [
              {name: '4대보험EDI 데이터연동', url: '#'},
              {name: '파트너십 계좌통합 데이터연동', url: '#'},
              {name: '뱅크다K 데이터연동', url: '#'},
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