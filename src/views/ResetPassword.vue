<template>
    <form
      action="your-action"
      class="auth-form"
      @submit="submitForm"
    > 
      <div class="dx-fieldset">
        <div class="dx-fieldset-header">비밀번호 설정</div>
        <p v-if="errors" class="invalid">
          {{ errors }}
        </p>
        <div class="dx-field">
          <div class="dx-field-label">비밀번호</div>
          <div class="dx-field-value">
            <DxTextBox
              v-model:value="form.password"
              mode="password"
            >
              <DxValidator>
                <DxRequiredRule message="비밀번호는 필수 입렵항목 입니다"/>
              </DxValidator>
            </DxTextBox>
          </div>
        </div>
        <div class="dx-field">
          <div class="dx-field-label">비밀번호 확인</div>
          <div class="dx-field-value">
            <DxTextBox mode="password">
              <DxValidator>
                <DxRequiredRule message="비밀번호 확인은 필수 입렵항목 입니다"/>
                <DxCompareRule
                  :comparison-target="passwordComparison"
                  message="비밀번호가 일치하지 않습니다"
                />
              </DxValidator>
            </DxTextBox>
          </div>
        </div>
      </div>
      
    
  
      <div class="dx-fieldset">
        <DxValidationSummary id="summary"/>
        <DxButton
          id="button"
          :use-submit-behavior="true"
          text="비밀번호 리셋"
          type="success"
        />
      </div>
    </form>
  </template>
  <script>

  import DxTextBox from 'devextreme-vue/text-box';
  import DxButton from 'devextreme-vue/button';
  import {
    DxValidator,
    DxRequiredRule,
    DxCompareRule,
  } from 'devextreme-vue/validator';
  
  import { reactive, ref } from "vue";
  import { useMutation } from "@vue/apollo-composable";
  import { useRouter, useRoute } from "vue-router";
  import mutations from "../graphql/mutations/index";
  export default {
    components: {

      DxTextBox,

      DxButton,
      DxValidator,
      DxRequiredRule,
      DxCompareRule,
   
    },
    methods: {
      passwordComparison() {
        return this.password;
      },
    },
    setup() {
      const router = useRouter();
      const route = useRoute()
      const form = reactive({
        password: "",
      });
      const errors = ref(null);
  
      const submitForm = (e) => {
        e.preventDefault();
        resetData();
      };
  

      // signin mutation
      const {
        mutate: resetData,
        loading: resetLoading,
        onDone: resetDone,
        onError,
      } = useMutation(mutations.ResetPassword, () => ({
        variables: {
          key: route.params.key,
          password: form.password,
        },
      }));
      resetDone(() => {
        router.push("/login");
      });
      onError((error) => {
        errors.value = error.message;
      });
      const passwordComparison = () => {
        return form.password
      }
      return {
        form,
        submitForm,
        errors,
        passwordComparison,
        resetLoading
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