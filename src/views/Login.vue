<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="auth-form">
    <div class="dx-fieldset-header" style="font-weight: bold;">로그인</div>
    <form @submit="submitForm">
      <p v-if="errors" class="invalid">
        {{ errors }}
      </p>
      <div>
        <label for="username" required>ID</label>
        <input
          :class="[errors && errors.search('username') !== -1 ? 'error' : '', 'form-control']"
          type="text"
          name="username"
          autofocus
          id="username"
          v-model="form.username"
        />
      </div>
      <div>
        <label for="password" required>비밀번호</label>
        <input
          :class="[errors && errors.search('password') !== -1 ? 'error' : '', 'form-control']"
          type="password"
          name="password"
          id="password"
          v-model="form.password"
        />
      </div>
      <p v-if="errors && errors.error" class="invalid">
        {{ isSignup ? errors.error : 'Invalid credentials' }}
      </p>
      <a-row>
          <a-col :span="5">
            <button class="primary" type="submit">
              로그인
            </button>
          </a-col>
          <a-col :span="19">
            <div style="float: right;padding: 6px 0px 6px 0px;">
              <router-link to="/request-contract"> 신규고객 서비스가입신청</router-link> / <a @click="openFindUsername">  아이디 찾기 </a>/<a @click="openForgotPassword"> 비밀번호 찾기</a>
            </div>
          </a-col>
        </a-row>

    </form>
    <forget-password v-if="modalForgotPassword" :modalStatus="modalForgotPassword" @closePopup="modalForgotPassword = false"></forget-password>
    <find-username v-if="modalFindUsername" :modalStatus="modalFindUsername" @closePopup="modalFindUsername = false"></find-username>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import mutations from '../graphql/mutations/index';
import ForgetPassword from './ForgetPassword.vue';
import FindUsername from './FindUsername.vue';
export default {
    components: { ForgetPassword,FindUsername },
    setup() {
        const store = useStore();
        const router = useRouter();
        const modalForgotPassword = ref(false)
        const modalFindUsername = ref(false)
        const form = reactive({
            username: "",
            password: "",
        });
        const errors = ref(null);
        const submitForm = (e) => {
          e.preventDefault();  
          signinData();
          sessionStorage.setItem("username", form.username);
        };
        // signin mutation
        const { mutate: signinData, loading: signinLoading, onDone: signinDone, onError, } = useMutation(mutations.SIGN_IN, () => ({
            variables: {
                username: form.username,
                password: form.password,
            },
        }));
        signinDone((res) => {
          store.commit("auth/setAuthData", res.data.login);
          const url = new URL("/dashboard", window.location.origin);
          window.location.href = url.toString();
        });
        onError((error) => {
            errors.value = error.message;
        });
        const openForgotPassword = () => {
          modalForgotPassword.value = true;
        };
        const openFindUsername = () => {
          modalFindUsername.value = true;
        };
        return {
            form,
            submitForm,
            openFindUsername,
            modalFindUsername,
            openForgotPassword,
            modalForgotPassword,
            errors,
            signinLoading,
        };
    },
    
};
</script>

<style scoped>
.auth-form {
  padding-top: 150px;
  max-width: 410px;
  margin: 0 auto;
}
.flex {
  display: flex;
  align-items: center;
  margin-left: -50px;
}
.activate{
  display: flex;
}
.flex label {
  width: 100px;
}
[required]::after {
  content: '*';
  color: red;
}
.request-contract {
  margin-top: 40px;
}
.form-control {
  margin: 8px 0;
}

.invalid:focus {
  background-color: salmon;
}
.error {
  background-color: salmon;
}
label {
  display: block;
  text-align: left;
}
input {
  width: 100%;
  border: 1px solid #d9d9d9;
  padding: 4px 11px;
}
.secondary {
  background-color: #ff0000;
  color: #ffffff;
}
.secondary:not(:disabled):hover {
  background: rgba(233, 12, 0, 0.75);
  color: #ffffff;
}
.invalid {
  color: red;
}
.primary {
  background-color: #1890ff;
  color: #ffffff;
  border: none;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  cursor: pointer;
}
.primary:hover {
  background-color: #40a9ff;
  color: #ffffff;
}
button:disabled {
  cursor: no-drop;
  background-color: silver;
  color: #000000;
}
</style>
