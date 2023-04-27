
<template>
  <a-modal :visible="true" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="445" :height="500">
    <div class="auth-form">
        <div class="dx-fieldset-header text-a">아이디 찾기</div>
        <standard-form  formName="find-username" ref="findUsername"> 
          <div class="input-field">
             <a-form-item label="성명" label-align="right" class="text-a">
              <default-text-box width="150px" v-model:valueInput="form.name" :required="true"   name="name"   id="name"  placeholder="" />
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
            <button-basic text="아이디 찾기" type="default" mode="contained" @onClick="submitForm()"  width="300px"  class="btn-confirm"/>
          </div>
        </standard-form>
        <a-spin :spinning="loading" size="large">
          <div  class="result" >
            <div v-if="listUserMask.length > 0" class="has-result">
                <ul>
                  <li v-for="username in listUserMask" key="username">{{ username }}</li>
                </ul>
            </div>
            <div v-if="listUserMask.length == 0" class="empty-result">
            {{ messageRes }}
            </div>
          </div>
        </a-spin>
    </div>
  </a-modal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from "vue";
  import { useQuery } from "@vue/apollo-composable";
  import queries from "@/graphql/queries/common"
  export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
      const findUsername = ref()
      const messageRes = ref('')
      const trigger = ref(false)
      const modalConfirm = ref(false)
      const listUserMask = ref([])
      const form = reactive({
        name: "",
        email:""
      });
      const errors = ref(null);
      const setModalVisible = () => {
            emit("closePopup", false)
      };
      const submitForm = () => {
        var res = findUsername.value.validate();
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
      } = useQuery(queries.findUsername,form, () => ({
      enabled: trigger.value,
      fetchPolicy: "no-cache",
      }));
      onResult((res) => {
        if (res) {
          listUserMask.value = res.data.findUsername
        }
        trigger.value = false
      });
      onError((e) => {
        listUserMask.value = []
        messageRes.value = '입력하신 정보와 일치하는 아이디가 없습니다'
        trigger.value = false
      });
 
      return {
        form,
        findUsername,
        setModalVisible,
        submitForm,
        modalConfirm,
        errors,
        loading,
        listUserMask,
        messageRes
      };
    },

})
  </script>
<style scoped lang="scss">
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
:deep .ant-form-item-label>label{
    width: 55px;
    color: #1890ff;
  }
.result{
  padding-top: 15px;
  .has-result{
    font-weight: bold;
    margin-left: 30px;
  }
  .empty-result {
    text-align: center;
    font-weight: bold;
  }
}

</style>
