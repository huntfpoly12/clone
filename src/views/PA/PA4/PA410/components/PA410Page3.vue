<template>
 <div class="page-content">
    <div class="content-page3">
      <div class="retirement-benefit">
        <div class="send-mail-action">
          <div class="input-benefit">
              <a-form-item label="퇴직급여(예상)" label-align="right" >
                  <number-box-money  width="150px" :spinButtons="false" :rtlEnabled="true" :readOnly="true" v-model:valueInput="caculateValue" format="0,###"> </number-box-money>
              </a-form-item>
              <span class="pl-5 pt-4">원</span>
          </div>
          <div class="text-benefit">
              <span>
                <img src="@/assets/images/email.svg" alt="" style="width: 40px;" class="img-email" @click="openMailPopup"/>
              </span>
          </div>
        </div>
        <div class="infor-text">
          <p> 상기 급여(수당)으로 계산된 퇴직금으로 실제 지급된 퇴직금과는 상이할 수 있습니다.</p>
        </div>
     
      </div>
    </div>
    <email-single-popup :modalStatus="modalMailStatus" @closePopup="modalMailStatus = false" :data="formStateStep2"></email-single-popup>
 </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex';
import EmailSinglePopup from './EmailSinglePopup.vue';
import dayjs from 'dayjs';
export default defineComponent({
    components: {
        EmailSinglePopup
    },
    setup(props, { emit }) {
        const formPA410 =  ref()
        const store = useStore();
        const caculateValue = computed(() => store.state.common.caculateValuePA410)
        const formStateStep2 = computed(() => store.getters['common/stateStep2PA410'])
        const modalMailStatus = ref<boolean>(false)
        const openMailPopup = () => {
          modalMailStatus.value = true
        }
        const onCloseEmailPopup = () => {
          modalMailStatus.value = false
          store.dispatch('common/setResetStep')
        }
      return {
        store,
        formPA410,
        formStateStep2,
        dayjs,
        caculateValue,
        openMailPopup,
        onCloseEmailPopup,
        modalMailStatus,
      }
    },
})
</script>

<style lang="scss" scoped>
    .content-page3{
        margin: 10px 20px;
        min-height: 300px;
        .retirement-benefit{
          margin-top: 100px;
          .send-mail-action{
            display: flex;
            justify-content: center;
            align-items: center;
            .text-benefit{
                span {
                    display: flex;
                    align-items: center; 
                    p{
                        margin-top: 0;
                        margin-bottom: 0;
                        margin-left: 5px;
                        color: #A6A6A6;
                    }
                    .img-note{
                        width: 17px !important;
                        height: 17px !important;
                    }
                    .img-email{
                        margin-left: 10px;
                        cursor: pointer;
                    }
                }
                align-items: center; 
            }

            .input-benefit{
                display: flex;
            }
          }
        }
        .infor-text{
          margin-top: 100px;
          align-items: center;
          text-align: center;
          color: gray;
        }
    }
</style>
