<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    :width="500">
    <standard-form action="" name="edit-510">
      {{ changeDayDataPA720 }}
      {{ dataUpdateLen }} dataUpdateLen <br />
      <div class="custom-modal-edit" v-if="data.length">
        <img src="@/assets/images/icon_edit.png" alt="" style="width: 30px;">
        <span>선택된 내역 지급일을</span>
        <number-box width="70px" :required="true" :min="1" :max="31" v-model:valueInput="dayValue" :spinButtons="true"
          :isFormat="true" />
        <span>일로 변경하시겠습니까?</span>
      </div>
      <div v-else class="text-center">항목을 하나 선택해야합니다</div>
      <div class="text-align-center mt-30">
        <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
          @onClick="setModalVisible" />
        <button-basic class="button-form-modal" :text="'네. 변경합니다'" :width="140" :type="'default'" :mode="'contained'"
          @onClick="onSubmit" />
      </div>
    </standard-form>
  </a-modal>
  <a-modal v-model:visible="updateStatus" okText="확인" :closable="false" :footer="null">
    {{ dataUpdateLen }} dataUpdateLen <br />
    {{ succesState }} succesState <br />
    {{ data }} data <br />
    {{ dayValue }} dayValue <br />
    <p>요청건수: {{ data.length }}건</p>
    <p>처리건수: {{ incomeIdRender.length }}건</p>
    <p>미처리건수 및 내역:{{ errorState.length }} 건 </p>
    <ul>
      <li v-for="(item) in errorState">{{ item.errorInfo.employeeId }} {{ item.errorInfo.incomeTypeName }}1</li>
    </ul>
    <a-row justify="center">
      <button-basic class="button-form-modal" :text="'확인'" :width="60" :type="'default'" :mode="'contained'"
        @onClick="updateStatus = false" />
    </a-row>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA7/PA720/index"
import { Message } from '@/configs/enum';
import { useStore } from 'vuex';
export default defineComponent({
  props: {
    modalStatus: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: []
    }
  },
  components: {
  },
  setup(props, { emit }) {
    const dayValue = ref(1)
    const messageUpdate = Message.getMessage('COMMON', '106').message;
    const store = useStore();
    const changeDayDataPA720 = computed(() => store.state.common.changeDayDataPA720);;
    const updateStatus = ref(false);
    const setModalVisible = () => {
      emit("closePopup", '')
    };
    const {
      mutate,
      onDone,
      onError,
    } = useMutation(mutations.changeIncomeExtraPaymentDay);
    const dataUpdateLen = ref(props?.data?.length);
    const incomeIdRender = ref<any>([]);
    const succesState = ref<any>([]);
    const errorState = ref<any>([]);
    watch(() => props.modalStatus, (newVal: any) => {
      if (newVal) {
        dataUpdateLen.value = props?.data?.length;
        incomeIdRender.value = [];
        succesState.value = [];
        errorState.value = [];
      }
    }, { deep: true })
    // const checkAction = () => {
    //   let val = props.data.filter((item: any) => item.errorInfo.incomeTypeName ==  )
    //   const
    // }
    onDone((res: any) => {
      dataUpdateLen.value--;
      console.log(`output->res.data[0]`, res.data)
      let resData = res.data.changeIncomeExtraPaymentDay;
      let hasData = incomeIdRender.value.findIndex((item: any) => item == resData.incomeId);
      if (hasData == -1) {
        incomeIdRender.value.push(resData.incomeId);
        succesState.value.push({
          employeeId: resData.employeeId,
          incomeTypeCode: resData.incomeTypeCode,
          paymentDay: true,
        });
      }
      if (dataUpdateLen.value == 0) {
        errorState.value = props.data.filter((item1: any) => {
            console.log(`output->item2.paymentDay`, item1)
          return !succesState.value.some((item2: any) => {
            console.log(`output->item2.paymentDay`, item2.paymentDay, item1.errorInfo)
            return (
              item2.employeeId === item1.errorInfo.employeeId
              && item2.incomeTypeCode === item1.errorInfo.incomeTypeCode
              && item2.paymentDay === true
            )
          }
          );
        });
        notification('success', messageUpdate);
        console.log(`output->`, errorState.value)
        emit("closePopup", incomeIdRender.value);
        updateStatus.value = true;
      }
      console.log(`output->dataUpdateLen.value`, dataUpdateLen.value)
    })
    onError((e: any) => {
      console.log(`output->e.message`, e.message)
      dataUpdateLen.value--;
      if (dataUpdateLen.value == 0) {
        errorState.value = props.data.filter((item1: any) => {
            console.log(`output->item2.paymentDay`, item1)
          return !succesState.value.some((item2: any) => {
            console.log(`output->item2.paymentDay`, item2.paymentDay, item1.errorInfo)
            return (
              item2.employeeId === item1.errorInfo.employeeId
              && item2.incomeTypeCode === item1.errorInfo.incomeTypeCode
              && item2.paymentDay === true
            )
          }
          );
        });
        notification('error', e.message);
        emit("closePopup", incomeIdRender.value)
        console.log(`output->`, errorState.value, succesState.value)
        updateStatus.value = true;
      }
    })
    const onSubmit = (e: any) => {
      const reversedArr: any = props.data.reverse();
      reversedArr.forEach((item: any) => {
        mutate({
          processKey: item.param.processKey,
          incomeId: item.param.incomeId,
          companyId: item.param.companyId,
          day: dayValue.value,
        })
      })
    };

    return {
      setModalVisible,
      onSubmit,
      dayValue,
      changeDayDataPA720,
      updateStatus, incomeIdRender, errorState,
      dataUpdateLen, succesState,
    }
  },
})
</script>

<style lang="scss" scoped>
.custom-modal-edit {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: 20px;

  img {
    width: 40px;
    margin-right: 5px;
  }

  span {
    padding: 0px 5px;
  }
}

.mt-30 {
  margin-top: 30px;
}

.text-align-center {
  text-align: center;
}

.button-form-modal {
  margin: 0px 5px;
}
</style>