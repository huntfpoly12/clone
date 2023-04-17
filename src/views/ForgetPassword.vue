
<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="445" :height="500">
    <div class="auth-form">
      <a-spin :spinning="loading" size="large">
        <div class="dx-fieldset-header text-a">비밀번호 찾기</div>
        <standard-form  formName="forget-password" ref="forgetPassword"> 
          <div class="input-field">
             <a-form-item label="아이디" label-align="right" class="text-a">
              <default-text-box width="150px" v-model:valueInput="form.username" :required="true"   name="username"   id="username"  placeholder="" />
            </a-form-item>  
          </div>
          <div class="input-field">
            <a-form-item label="이메일" label-align="right" class="text-a">
              <mail-text-box width="300px" v-model:valueInput="form.email" :required="true" placeholder="abc@example.com"></mail-text-box>
            </a-form-item>  
          </div>
          <div style="margin-left: 50px;">
            <span class="style-note">
              <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px;margin-right: 5px;" class="img-note"/>
              <p>당사에 등록된 이메일을 입력하여 주십시요.</p>
            </span>
          </div>
 
          <div class="text-align-center">
            <button-basic text="비밀번호 재설정 (이메일 발송)" type="default" mode="contained" @onClick="submitForm()"  width="300px"  class="btn-confirm"/>
          </div>
        </standard-form>
      </a-spin>
    </div>
  </a-modal>
  <a-modal :visible="modalConfirm" @cancel="setModalConfirm" :mask-closable="false" class="confirm-md" >
      <div class="confirm-success">
        <h2>비밀번호 재설정 이메일 발송 성공</h2>
        <span >등록된 이메일로 비밀번호를 재설정 할 수 있는 정보가 정상 발송되었습니다.</span>
      </div>
      <template #footer>
        <button-basic text="OK" type="default" mode="contained" @onClick="setModalConfirm()" width="100px" class="btn-confirm"/>
      </template>
  </a-modal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from "vue";
  import { useQuery } from "@vue/apollo-composable";
  import queries from "@/graphql/queries"
  import notification from '@/utils/notification';
  export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
      const forgetPassword = ref()
      const trigger = ref(false)
      const modalConfirm = ref(false)
      const form = reactive({
        username: "",
        email:""
      });
      const errors = ref(null);
      const setModalVisible = () => {
            emit("closePopup", false)
      };
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
      const setModalConfirm = () => {
        modalConfirm.value = false
        setModalVisible()
      }

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
          modalConfirm.value = true
        }
      });
      onError((e) => {
        notification("error", e.message);
      });
 
      return {
        form,
        forgetPassword,
        setModalVisible,
        setModalConfirm,
        submitForm,
        modalConfirm,
        errors,
        loading
      };
    },

})
  </script>
<style scoped>
.auth-form {
    max-width: 400px;
}
.input-field{
  margin-bottom: 10px;
}
.text-align-center {
    text-align: center;
    margin-left: 14px;

}
.style-note{
  display: flex;
}
:deep .ant-modal-footer{
  border-top: none !important;
}

.btn-confirm{
  background-color: #1890ff;
}
:deep .text-a {
    color: #1890ff;
  }
</style>
