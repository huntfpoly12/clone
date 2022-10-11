<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="auth-form">
    <div class="dx-fieldset-header">비밀번호 설정</div>
    <form @submit="submitForm">
      <p v-if="errors" class="invalid">
        {{ errors }}
      </p>
      <div>
        <label for="username" required>ID</label>
        <input
          :class="[
            errors && errors.search('username') !== -1 ? 'error' : '',
            'form-control',
          ]"
          type="text"
          name="username"
          autofocus
          id="username"
          v-model="form.username"
        />
      </div>
      <div>
        <label for="password" required>Password</label>
        <input
          :class="[
            errors && errors.search('password') !== -1 ? 'error' : '',
            'form-control',
          ]"
          type="password"
          name="password"
          id="password"
          v-model="form.password"
        />
      </div>
      <p v-if="errors && errors.error" class="invalid">
        {{ isSignup ? errors.error : "Invalid credentials" }}
      </p>
      <button class="primary" type="submit">
        {{
           signinLoading
            ? "Login in.."
            : "Login"
        }}
      </button>
    </form>
    <div class="request-contract">
      <router-link to="/request-contract">
        신규고객 서비스가입신청!!!
      </router-link>
      
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import mutations from "../graphql/mutations/index";
import { getJwtObject } from "@bankda/jangbuda-common";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const form = reactive({
      username: "",
      password: "",
    });
    const errors = ref(null);

    const submitForm = (e) => {
      e.preventDefault();
      signinData();
      sessionStorage.setItem('username', form.username)
    };


    // signin mutation
    const {
      mutate: signinData,
      loading: signinLoading,
      onDone: signinDone,
      onError,
    } = useMutation(mutations.SIGN_IN, () => ({
      variables: {
        username: form.username,
        password: form.password,
      },
    }));
    signinDone((res) => {
      const jwtObject = getJwtObject(res.data.login.accessToken);
      if(!jwtObject.isExpired()) {
        store.commit("auth/setAuthData", res.data.login.accessToken);
      } else {
        store.commit("auth/setAuthData", res.data.login.refreshToken);
      }
      router.push("/dashboard");
    });
    onError((error) => {
      errors.value = error.message;
    });

    return {
      form,
      submitForm,
      errors,
      signinLoading,
    };
  },
};
</script>

<style scoped>
.auth-form {
    padding-top: 150px;
    max-width: 400px;
    margin: 0 auto;
}
.flex {
    display: flex;
    align-items: center;
    margin-left: -50px;
}
.flex label {
    width: 100px;
}
[required]::after {
  content: "*";
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
