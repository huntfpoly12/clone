<template>
   <a-modal :visible="isError" :closable="false"  footer="" :width="500"  wrapClassName="logout-confirm" :maskStyle="{'z-index': 9999}">
      <div style="margin: 15px; font-size: 15px; font-weight: bold;"> 
        <close-circle-filled style="color: red;"/> <span>에러 ERROR</span>
      </div>
      <div style="margin: 15px;font-weight: bold;">
       <span >{{ errorData.message }}</span>
      </div>
      <pre class="error-content">
          {{ errorData }}
      </pre>
      <a-row>
          <a-col :span="9" :offset="10">
            <div style="display: flex;">
              <button-basic class="button-form-modal" text="OK" :width="60" :type="'default'" :mode="'contained'"  @onClick="closeErrorPopup"/>
            </div>         
          </a-col>
        </a-row>
    </a-modal>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { CloseCircleFilled } from "@ant-design/icons-vue";
import { useStore } from 'vuex';
export default defineComponent({
    components: {
      CloseCircleFilled
    },
  setup() {
    const store = useStore();
    const isError = computed(() => store.getters['common/getApiErrorStatus'])
    const errorData = computed(() => store.getters['common/getApiErrorData'])
    const closeErrorPopup = () => {
      store.commit('common/setApiErrorData', {})
      store.commit('common/setApiErrorStatus', false)
    }
    return {
      isError,
      errorData,
      closeErrorPopup
    }
  },
})
</script>

<style lang="scss" >
.error-content{
  margin: 15px;
  height: 200px;
  border: 1px solid;
 
}
.ant-modal-confirm-body svg {
    font-size: 50px;
}
.logout-confirm {
  z-index: 10000;
}
.noIcon {
    text-align: center;
}
</style>
