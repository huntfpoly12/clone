<template>
  <a-dropdown  :overlayStyle="{ 'border': '2px solid'}" :trigger="['click']">
      <a class="ant-dropdown-link" @click.prevent>
        <a-spin :spinning="!userInfor" size="small"></a-spin>{{ userInfor ? userInfor.name : ''}}
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <div class="user-infor">
              <p class="name-infor" ref="paragraph" >
                 <div> ID : {{userInfor.username}} <a-tag v-if="userInfor.type != 'c'" :color="getColorTag(userInfor.type)?.color">{{ getColorTag(userInfor.type)?.name }}</a-tag></div>
                 <!-- <div class="copy-success" :class="{ 'copy-success-show': showCopySuccess }">Copy...</div> -->
              </p>
              <p>{{userInfor.email}}</p>
              <p>{{ $filters.formatPhoneNumber(userInfor.mobilePhone)}}</p>
              <p v-if="userInfor.compactCompany">{{ userInfor.compactCompany.name}}</p>
            </div>
          </a-menu-item>
          <a-menu-item @click="openChangePassword">
            <p >비밀번호 변경</p>
          </a-menu-item>
          <a-menu-item @click="logout">
            <p >로그아웃</p>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <change-password v-if="showModalChangePass"  :modalStatus="showModalChangePass" @closePopup="showModalChangePass = false" ></change-password>
</template>
<script lang="ts">
import { computed, ref } from "vue";
import { DownOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
import ChangePassword from "@/views/ChangePassword.vue";
export default {
  props: {

  },
  components: {
    DownOutlined,
    ChangePassword
  },
  setup(props: any, { emit }: any) {
    const store = useStore();
    const router = useRouter()
    const paragraph = ref();
    const showCopySuccess = ref(false);
    const showModalChangePass = ref(false)
    store.dispatch('auth/getUserInfor');
    const userInfor = computed(() => store.state.auth.userInfor);
    const logout = ()=>{
      router.push("/login");
      location.reload();
      store.commit("auth/logout");
    }
    const getColorTag = ( data : any) => {
       if (data === "m") {
            return {"name":"매니저","color":"black"};
        } else if (data === "r") {
            return {"name":"영업자","color":"grey"};
        } else if (data === "p") {
            return {"name":"파트너","color":"goldenrod"};
        }
    }

    const openChangePassword = () => {
      showModalChangePass.value = true
    }

    const copyText = (id: string) => {
      const tempInput = document.createElement('input');
      tempInput.value = id;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      showCopySuccess.value = true;

      setTimeout(() => {
        showCopySuccess.value = false;
      }, 2000);
      
    };
    return {
      userInfor,
      getColorTag,
      openChangePassword,
      showModalChangePass,
      logout,
      paragraph,showCopySuccess,
      copyText
    };
  },
};
</script>

<style scoped lang="scss">
.user-infor {
  margin-bottom: 7px;
	p{
    margin-bottom: 0px !important;
  }
  .name-infor{
    font-weight: bold;
  }
}
:deep .ant-dropdown-menu-item{
  text-align: right;
  line-height: 18px;

}
.copy-success {
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.3s, transform 1s;
  color: red;
  font-size: 20px;
}

.copy-success-show {
  opacity: 1;
  transform: translateY(-80px);
}
</style>
