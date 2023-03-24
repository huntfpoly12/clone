<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    :width="500">
    <standard-form action="" name="edit-510">
      <div class="custom-modal-edit">
        <img src="@/assets/images/icon_edit.png" alt="" style="width: 30px;">
        <span>선택된 내역 지급일을</span>
        <number-box width="70px" :required="true" :min="1" :max="31" v-model:valueInput="dayValue" :spinButtons="true"
          :isFormat="true" />
        <span>일로 변경하시겠습니까?</span>
      </div>
      <div class="text-align-center mt-30">
        <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
          @onClick="setModalVisible" />
        <button-basic class="button-form-modal" :text="'네. 변경합니다'" :width="140" :type="'default'" :mode="'contained'"
          @onClick="onSubmit" />
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import notification from "@/utils/notification";
import { companyId } from '@/helpers/commonFunction';
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA6/PA620/index"
import { Message } from '@/configs/enum';
export default defineComponent({
  props: {
    modalStatus: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: []
    },
    processKey: {
      type: Object,
    },
    dataUpdate: {
      type: Object,
      required: true,
    }
  },
  components: {
  },
  setup(props, { emit }) {
    const dayValue = ref(1)
    const setModalVisible = () => {
      emit("closePopup", [])
    };
    const messageUpdate = Message.getMessage('COMMON', '106').message;
    const dataUpdateLen = ref(props?.data?.length);
    const incomeIdRender = ref<any>([]);
    const {
      mutate,
      onDone,
      onError,
    } = useMutation(mutations.changeIncomeBusinessPaymentDay);
    onDone((res: any) => {
      dataUpdateLen.value--;
      let resData = res.data.changeIncomeBusinessPaymentDay;
      notification('success', messageUpdate);
      let data = {
        employeeId: resData.employeeId,
        incomeTypeCode: resData.incomeTypeCode,
      }
      if (JSON.stringify(data) == JSON.stringify(props.dataUpdate)) {
        incomeIdRender.value.unshift(resData.incomeId);
      } else {
        let hasData = incomeIdRender.value.findIndex((item: any) => item == resData.incomeId);
        if (hasData == -1) {
          incomeIdRender.value.push(resData.incomeId);
        }
      }
      if (dataUpdateLen.value == 0) {
        emit("closePopup", incomeIdRender.value)
      }
    })
    onError((e: any) => {
      dataUpdateLen.value--;
      notification('error', e.message);
      if (dataUpdateLen.value == 0) {
        emit("closePopup", incomeIdRender.value)
      }
    })

    const onSubmit = () => {
      const reversedArr = props.data.reverse();
      reversedArr.forEach(async (val: any) => {
        await mutate({
          companyId: companyId,
          processKey: props.processKey,
          incomeId: val,
          day: dayValue.value
        })
      })
    };
    watch(() => props.modalStatus, (newVal: any) => {
      if (newVal) {
        dataUpdateLen.value = props?.data.length;
      }
    }, { deep: true })

    return {
      setModalVisible,
      onSubmit,
      dayValue,
      dataUpdateLen
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
