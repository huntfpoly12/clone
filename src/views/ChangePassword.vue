<template>
    <a-modal :visible="true" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
          :width="445" :height="500">
      <standard-form  formName="forget-password" ref="forgetPassword"  class="auth-form">
        <div class="dx-fieldset">
          <div class="dx-fieldset-header">비밀번호 변경</div>
          <div class="dx-field">
            <div class="dx-field-label">비밀번호</div>
            <div class="dx-field-value">
              <default-text-box width="100%" v-model:valueInput="form.password" :required="true"   name="password"   id="password"  placeholder="" mode="password"/>
            </div>
          </div>
          <div class="dx-field">
            <div class="dx-field-label">비밀번호 확인</div>
            <div class="dx-field-value">
              <default-text-box width="100%" v-model:valueInput="confirmPassword" :required="true"   name="password"   id="password"  placeholder="" mode="password"/>
              <p style="color: red;">{{ confirMessage }}</p>
            </div>
          </div>
        </div>
        <div class="dx-fieldset">
          <DxButton
            id="button"
            :use-submit-behavior="true"
            text="비밀번호 변경"
            type="success"
            :height="$config_styles.HeightInput" 
            @click="submitForm"
          />
        </div>
      </standard-form>
    </a-modal>
  </template>
  <script lang="ts">
  import DxButton from 'devextreme-vue/button';
  import { reactive, ref, watch } from "vue";
  import { useMutation } from "@vue/apollo-composable";
  import { useRouter } from "vue-router";
  import mutations from "../graphql/mutations/index";
  import notification from '@/utils/notification';
  export default {
    components: {
      DxButton,
    },
    setup(props,{emit}) {
      const router = useRouter();
      const form = reactive({
        password: "",
      });
      const errors = ref(null);
      const confirmPassword = ref('')
      const confirMessage = ref('')
      const setModalVisible = () => {
            emit("closePopup", false)
      };
      const submitForm = () => {
        changePassword();
      };
  
      // signin mutation
      const {
        mutate: changePassword,
        loading: resetLoading,
        onDone: resetDone,
        onError,
      } = useMutation(mutations.ChangePassword, () => ({
        variables: {
          password: form.password,
        },
      }));
      resetDone(() => {
        notification('success', '비밀번호를 성공적으로 변경했으며 로그인하여 관리 페이지로 이동하세요')
        setModalVisible()
      });
      onError((error) => {
        notification('error', error.message)
      });
      watch(confirmPassword, (newVal) => {
          if (form.password !== newVal) {
            confirMessage.value = 'Passwords are not matching, please try again' 
          } else {
            confirMessage.value=''
          }
      })
      return {
        form,
        submitForm,
        errors,
        setModalVisible,
        resetLoading,
        confirmPassword,
        confirMessage
      };
    },
  };
  </script>
<style scoped>
.auth-form {
    max-width: 400px;
    margin: 0 auto;
}
::v-deep .dx-field-value-static, ::v-deep .dx-field-value:not(.dx-switch):not(.dx-checkbox):not(.dx-button) {
  width: 100%;
}
::v-deep .dx-field-label {
  float: none;
  width: 100%;
}
.flex {
    display: flex;
    align-items: center;
    margin-left: -50px;
}
::v-deep .dx-button {
  background-color: #1890ff !important;
    color: #ffffff !important;
    border: none;
  
}
.flex label {
    width: 100px;
}
[required]::after {
  content: "*";
  color: red;
}
.request-contract {

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
