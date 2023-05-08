<template>
 <div class="page-content">
    <a-spin :spinning="false" size="large">
        <div class="content-page1">
              <div class="select-employee">
                  <div class="label">
                      퇴직금 대상 사원
                  </div>
                  <div class="input-select">
                      <employ-select :arrayValue="arrayEmployeeSelect" :required="true" width="300px" v-model:valueEmploy="valueSelected"/>
                  </div>
              </div>
        </div>
    </a-spin>
 </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex';
export default defineComponent({
    components: {
    },
    setup() {
        const store = useStore();
        const valueSelected = ref(store.state.common.employeeIdPA410);
        // Getting the token from the session storage and then dispatching the action to get the user
        // information.
        const token = computed(()=>sessionStorage.getItem("token"))
        store.dispatch('auth/getUserInfor', token.value);

        // take the employee array and add a null element to test the metric calculation
        const arrayEmployeeSelect = computed(() => {
          var hasItem = store.state.common.arrayEmployeePA410.findIndex((item :  any) => item.employeeId== 0);
          if(hasItem == -1) store.state.common.arrayEmployeePA410.push({
                                                      "type": null,
                                                      "employeeId": 0,
                                                      "name": "익명",
                                                    })
          return store.state.common.arrayEmployeePA410
        })
        const nextPage = () => {
          store.commit('common/setEmployeeIdPA410',valueSelected)
        }
      return {
        store,
            nextPage,
            arrayEmployeeSelect,
            valueSelected,
        }
    },
})
</script>

<style lang="scss" scoped>
    .content-page1{
        min-height: 300px;
        margin: 0px 50px;
        .select-employee{
            display: flex;
            min-width: 490px;
            justify-content: center;
            align-items: center;
            padding-top: 135px;
            .label{
                font-size: 23px;
                font-weight: bold;
            }
            .input-select{
                padding-left: 10px;
              
            }
        }

        .button-next{
            margin: 0px 655px;
            width: 60px;
        }

    }

</style>
