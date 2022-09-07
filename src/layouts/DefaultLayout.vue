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
        <a-sub-menu v-for="menuItem in menuItems" :key="menuItem.id">
          <template #title>{{menuItem.title}}</template>
            <a-sub-menu v-for="subMenu in menuItem.subMenus" :key="subMenu.id" :title="subMenu.title">
              <a-menu-item v-for="item in subMenu.items" :key="item.id" @click.enter="addMenuTab(item)">
                <router-link :to="item.url">{{item.name}}</router-link>
              </a-menu-item>
              
            </a-sub-menu>
          
          </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 24px">
        <ul class="list-menu-tab" v-if="menuTab.length > 0">
          <li v-for="(item, index) in menuTab" :class="activeTab === item.id? 'active': ''" :key="index" @click="changeActiveTab(item)"> {{item.name}} <DxButton
        @click="removeItemTab(index)"><svg focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></DxButton></li>
        </ul>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, reactive, toRefs, watch} from 'vue';
import DxButton from 'devextreme-vue/button';
export default defineComponent({
  name: `LayoutDefault`,
  components: {
        DxButton
    },
  data() {
    return {
      user: null,
      menuItems: [{
        title: 'Back Office',
        id: 'bf-000',
        subMenus: [
          {
            title: '서비스가입',
            id: 'bf-100',
            items: [
              {name: '인증', url: '#', id: 'bf-110'},
              {name: '개인정보관리', url: '#', id: 'bf-120'}
             ]
          },
          {
            title: '회원관리',
            id: 'bf-200',
            items: [
              {name: '회원등록', url: '#',id: 'bf-210'}, 
              {name: '권한그룹', url: '#',id: 'bf-220'}, 
              {name: '기초정보설정', url: '#',id: 'bf-230'}
              ]
          },
          {
            title: '계약관리',
            id: 'bf-300',
            items: [
              {name: '계약정보관리,심사', url: '/dashboard/bf-310',id: 'bf-310'}, 
              {name: '사업자관리', url: '/dashboard/bf-320',id: 'bf-320'}, 
              {name: '서비스관리', url: '#',id: 'bf-330'},
              {name: '영업자관리', url: '#',id: 'bf-340'}
            ]
          },
          {
            title: '수납관리',
            id: 'bf-400',
            items: [
              {name: '요금청구,심사', url: '#',id: 'bf-410'}, 
              {name: '서비스해지', url: '#',id: 'bf-420'}, 
              {name: '미납관리', url: '#',id: 'bf-430'},
              {name: '수납관리', url: '#',id: 'bf-440'}
            ]
          },
          {
            title: '업무마감',
            id: 'bf-500',
            items: [
              {name: '회계업무마감관리', url: '#',id: 'bf-510'}, 
              {name: '원천업무마감관리', url: '#',id: 'bf-520'}, 
              {name: '4대보험업무관리', url: '#',id: 'bf-530'},
              {name: '제본/배송관리', url: '#',id: 'bf-540'}
            ]
          }
        ]
      },
      {
        title: '공통모듈',
        id: 'cm-000',
        subMenus: [
          {
            title: '사용자업무설정',
            id: 'cm-100',
            items: [
              {name: '기초정보설정', url: '#',id: 'cm-110'},
              {name: '회계설정', url: '#',id: 'cm-120'},
              {name: '원천설정', url: '#',id: 'cm-130'}
             ]
          },
        ]
      },
      {
        title: '회계모듈',
        id: 'ac-000',
        subMenus: [
          {
            title: '입력/마감',
            id: 'ac-100',
            items: [
              {name: '통장내역', url: '#',id: 'ac-110'},
              {name: '전표', url: '#',id: 'ac-120'},
              {name: '마감', url: '#',id: 'ac-130'}
             ]
          },
          {
            title: 'W4C',
            id: 'ac-200',
            items: [
              {name: '전표/결의', url: '#',id: 'ac-210'},
              {name: '예산서', url: '#',id: 'ac-220'},
              {name: '결산서', url: '#',id: 'ac-230'}
             ]
          },
          {
            title: '예산',
            id: 'ac-300',
            items: [
              {name: '세입예산서', url: '#',id: 'ac-310'},
              {name: '세출예산서', url: '#',id: 'ac-320'},
              {name: '예산총괄표', url: '#',id: 'ac-330'},
              {name: '임직원보수일람표', url: '#',id: 'ac-340'},
              {name: '과목전용조서', url: '#',id: 'ac-350'},
              {name: '추가경정 세입예산서', url: '#',id: 'ac-360'},
              {name: '추가경정 세출예산서', url: '#',id: 'ac-370'},
              {name: '예산서 자동작성', url: '#',id: 'ac-380'},
             ]
          },
           {
            title: '결산',
            id: 'ac-400',
            items: [
              {name: '세입결산서', url: '#',id: 'ac-400'},
              {name: '세출결산서', url: '#',id: 'ac-410'},
              {name: '예비비사용조서', url: '#',id: 'ac-420'},
              {name: '정부보조금명세서', url: '#',id: 'ac-430'},
              {name: '후원금수입및사용결고보고서', url: '#',id: 'ac-440'},
              {name: '후원금계좌거래내역', url: '#',id: 'ac-450'},
              {name: '사업비명세서', url: '#',id: 'ac-460'},
              {name: '사업비명세서', url: '#',id: 'ac-470'},               
              {name: '기타비용명세서', url: '#',id: 'ac-480'},
             ]
          },
          {
            title: '보고서',
            id:'ac-500',
            items: [
              {name: '장부', url: '#',id: 'ac-510'},
              {name: '필요경비대장', url: '#',id: 'ac-520'},
              {name: '정부보조금명세서', url: '#',id: 'ac-530'},
              {name: '보조금정산서', url: '#',id: 'ac-540'},
             ]
          },
        ]
      },
      {
        title: '원천모듈',
        id: 'pa-000',
        subMenus: [
          {
            title: '근로소득관리',
            id: 'pa-100',
            items: [
              {name: '근로소득자료입력', url: '#',id: 'pa-110'},
              {name: '사원등록', url: '#',id: 'pa-120'},
             ]
          },
          {
            title: '세무신고,연말정산',
            id: 'pa-200',
            items: [
              {name: '원천징수이행상황신고서', url: '#',id: 'pa-210'},
              {name: '근로소득원천징수영수증', url: '#',id: 'pa-220'},
              {name: '소득자별근로소득원천징수부', url: '#',id: 'pa-230'},
              {name: '연말정산간소화입력', url: '#',id: 'pa-240'},
              {name: '의료비지급명세서', url: '#',id: 'pa-250'},
              {name: '기부금명세서', url: '#',id: 'pa-260'},
              {name: '연말정산현황', url: '#',id: 'pa-270'}
             ]
          },
          {
            title: '전자신고',
            id: 'pa-300',
            items: [
              {name: '원천세,지방소득세신고', url: '#',id: 'pa-310'},
              {name: '지급명세서전자신고(연말정산)', url: '#',id: 'pa-320'},
              {name: '간이지급명세서전자신고', url: '#',id: 'pa-330'},
              {name: '일용직전자신고', url: '#',id: 'pa-340'},
             ]
          },
           {
            title: '퇴직소득관리',
            id: 'pa-400',
            items: [
              {name: '퇴직금시뮬레이션', url: '#',id: 'pa-410'},
              {name: '퇴직소득자료입력', url: '#',id: 'pa-420'},
              {name: '퇴직소득원천징수영수증', url: '#',id: 'pa-430'},
             ]
          },
          {
            title: '일용직근로소득관리',
            id: 'pa-500',
            items: [
              {name: '일용직근로소득자료입력', url: '#',id: 'pa-510'},
              {name: '일용직사원등록', url: '#',id: 'pa-520'},
              {name: '일용직근로소득원천징수영수증', url: '#',id: 'pa-530'},
             ]
          },
          {
            title: '사업소득관리',
            id: 'pa-600',
            items: [
              {name: '사업소득자등록', url: '#',id: 'pa-610'},
              {name: '사업소득자료입력', url: '#',id: 'pa-620'},
              {name: '사업소득원천징수영수증', url: '#',id: 'pa-630'},
             ]
          },
          {
            title: '기타소득관리',
            id: 'pa-700',
            items: [
              {name: '기타소득자등록', url: '#',id: 'pa-710'},
              {name: '기타소득자등록', url: '#',id: 'pa-720'},
              {name: '기타소득자료입력', url: '#',id: 'pa-730'},
              {name: '기타소득원천징수영수증', url: '#',id: 'pa-740'},
             ]
          },
          {
            title: '4대보험',
            id: 'pa-800',
            items: [
              {name: '취득신고', url: '#',id: 'pa-810'},
              {name: '상실신고', url: '#',id: 'pa-820'},
              {name: '급여변경신고', url: '#',id: 'pa-830'},
              {name: '휴직복직신고', url: '#',id: 'pa-840'},
              {name: '보수총액신고', url: '#',id: 'pa-850'},
              {name: '보험사무대행신고', url: '#',id: 'pa-860'},
              {name: '사업장가입신고', url: '#',id: 'pa-870'},
              {name: '사업장탈퇴신고', url: '#',id: 'pa-880'},
              {name: '통합업무조회', url: '#',id: 'pa-890'},
             ]
          },
          {
            title: '데이터연동',
            id: 'pa-900',
            items: [
              {name: '4대보험EDI 데이터연동', url: '#',id: 'pa-910'},
              {name: '파트너십 계좌통합 데이터연동', url: '#',id: 'pa-920'},
              {name: '뱅크다K 데이터연동', url: '#',id: 'pa-930'},
             ]
          },
        ]
      },
      ],
      menuTab: [],
      activeTab: ''
    };
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
    },
    addMenuTab(item) {
      if(this.menuTab.length < 20) {
        this.menuTab.push(item)
      }
      const obj = {};
        for (let i = 0, len =this.menuTab.length; i < len; i++) {
          obj[this.menuTab[i]['id']] =this.menuTab[i];
        }

        this.menuTab = new Array();

        for (const key in obj) { 
          this.menuTab.push(obj[key]);
        }
    },
    removeItemTab(item) {
      this.menuTab.splice(item, 1)
    },
    changeActiveTab(item) {
      this.activeTab = item.id
      this.$router.push(item.url)
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
::v-deep .ant-layout-content {
    text-align: left;
  }
.list-menu-tab {
  display: flex;
  list-style: none;
  padding-left: 0;
  flex-wrap: wrap;
}
::v-deep .dx-button-mode-contained {
  border: none;
  background: none;
}
</style>