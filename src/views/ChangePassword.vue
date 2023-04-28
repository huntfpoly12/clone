<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
          :width="445">
    <div class="dx-fieldset-header">비밀번호 변경</div>
    <a-spin :spinning="resetLoading" size="large">
      <standard-form  formName="change-password" ref="changePass"  class="auth-form">


        <div class="dx-fieldset">
          <div class="dx-field">
            <div class="dx-field-value">
              <a-form-item label="비밀번호" class="label-red" label-align="right">
                <default-text-box width="100%" v-model:valueInput="form.password" :required="true"   name="password"   id="password"  placeholder="" mode="password"/>
              </a-form-item>
            </div>
          </div>
          <div class="dx-field">
            <div class="dx-field-value">
              <a-form-item label="비밀번호 확인" class="label-red" label-align="right">
          <default-text-box width="100%" v-model:valueInput="confirmPassword" :required="true"   name="password"   id="password"  placeholder="" mode="password"/>
              <p style="color: red;">{{ confirmMessage }}</p>
        </a-form-item>
            </div>
          </div>
        </div>
        <div class="dx-fieldset">
          <DxButton
            id="button"
            text="비밀번호 변경"
            type="success"
            :height="$config_styles.HeightInput" 
            @click="submitForm"
          />
        </div>
      </standard-form>
    </a-spin>
    </a-modal>
  </template>
  <script lang="ts">
  import DxButton from 'devextreme-vue/button';
  import { reactive, ref, watch } from "vue";
  import { useMutation } from "@vue/apollo-composable";
  import mutations from "../graphql/mutations/index";
  import notification from '@/utils/notification';
  import { useStore } from 'vuex';
  export default {
    props: {
      modalStatus: {
          type: Boolean,
          default: false,
      },
    },
    components: {
      DxButton,
    },
    setup(props,{emit}) {
      const store = useStore();
      const form = reactive({
        password: "",
      });
      const changePass = ref();
      const errors = ref(null);
      const confirmPassword = ref('')
      const isConfirm = ref(true)
      const confirmMessage = ref('')
      const setModalVisible = () => {
            emit("closePopup", false)
      };
      const submitForm = () => {
        const res = changePass.value.validate();
        if (!res.isValid || !isConfirm.value) {
          res.brokenRules[0].validator.focus();
        } else {
          changePassword();
        }
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
        location.reload();
        store.commit("auth/logout");
      });
      onError((error) => {
        notification('error', error.message)
      });
      watch(confirmPassword, (newVal) => {
          if (form.password !== newVal) {
            confirmMessage.value = '비밀번호가 일치하지 않습니다.' 
            isConfirm.value = false
          } else {
              confirmMessage.value = ''
              isConfirm.value = true
          }
      })
      return {
        form,
        submitForm,
        errors,
        setModalVisible,
        resetLoading,
        confirmPassword,
        confirmMessage,
        changePass
      };
    },
  };
  </script>
<style scoped lang="scss">
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
:deep .ant-form-item-label {
    >label {
        width: 100px;
    }
}
.dx-fieldset {
    margin: 10px 20px;
    padding: 0;
    text-align: center;
}
:deep .ant-modal-body{
  padding: 20px;
}
</style>
