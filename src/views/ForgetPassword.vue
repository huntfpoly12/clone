
<template>
  <div class="auth-form">
    <a-spin :spinning="loading" size="large">
      <div class="dx-fieldset-header">Forgot Password</div>
      <standard-form  formName="forget-password" ref="forgetPassword"> 
        <p v-if="errors" class="invalid">
          {{ errors }}
        </p>
        <div class="input-field">
          <label for="username" required>ID</label>
          <default-text-box width="300px" v-model:valueInput="form.username" :required="true"   name="username"   id="username"  placeholder="" />
        </div>
        <div class="input-field">
          <label for="password" required>이메일</label>
          <mail-text-box width="300px" v-model:valueInput="form.email" :required="true" placeholder="abc@example.com">
                        </mail-text-box>
        </div>

        <div>
          <button-basic text="보내다 요구하다" type="default" mode="contained" @onClick="submitForm()" />
          <router-link to="/login"> Back to login!</router-link>
        </div>

      </standard-form>
    </a-spin>
  </div>
</template>
<script lang="ts">
  import DxButton from 'devextreme-vue/button';
  import { defineComponent, reactive, ref } from "vue";
  import { useQuery } from "@vue/apollo-composable";
  import { useRouter, useRoute } from "vue-router";
  import queries from "@/graphql/queries"
import notification from '@/utils/notification';
  export default defineComponent({
    setup() {
      const forgetPassword = ref()
      const trigger = ref(false)
      const router = useRouter();
      const route = useRoute()
      const form = reactive({
        username: "",
        email:""
      });
      const errors = ref(null);
  
      const submitForm = () => {
        var res = forgetPassword.value.validate();
        if (!res.isValid) {
          res.brokenRules[0].validator.focus();
          return
        } else {
          trigger.value = true
          refetchData();
        }
      };
  

      // signin mutation
      const {
        refetch: refetchData,
        onResult,
        loading,
        onError
      } = useQuery(queries.findPassword,form, () => ({
      enabled: trigger.value,
      fetchPolicy: "no-cache",
      }));
      onResult((res) => {
        if (res.data) {
          router.push("/login");
        }
      });
      onError((e) => {
        notification("error", e.message);
      });
 
      return {
        form,
        forgetPassword,
        submitForm,
        errors,
        loading
      };
    },

})
  </script>
<style scoped>
.auth-form {
    padding-top: 150px;
    max-width: 400px;
    margin: 0 auto;
}
.input-field{
  margin-bottom: 10px;
}

</style>
