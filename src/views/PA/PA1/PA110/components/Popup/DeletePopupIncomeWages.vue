<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    :width="500">
    <standard-form action="" name="delete-510">
      <div class="custom-modal-delete">
        <img src="@/assets/images/icon_delete.png" alt="" style="width: 30px" />
        <span>선택된 내역({{ data.length }}건) 삭제합니다. 그래도
          진행하시겠습니까?</span>
      </div>
      <div class="text-center mt-30">
        <button-basic class="mr-5" :text="'아니요'" :type="'default'" :mode="'outlined'"
          @onClick="setModalVisible" />
        <button-basic class="ml-5" :text="'네. 삭제합니다'" :width="140" :type="'default'" :mode="'contained'"
          @onClick="onSubmit" />
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { companyId } from "@/helpers/commonFunction";
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA1/PA110/index";
import { Message } from "@/configs/enum";
export default defineComponent({
  props: {
    modalStatus: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: [],
    },
  },
  components: {},
  setup(props, { emit }) {
    const store = useStore();
    const processKey = computed(() => store.state.common.pa110.processKeyPA110);
    const setModalVisible = () => {
      emit("closePopup", false);
    };

    const onSubmit = (e: any) => {
      let ids: any = [];
      props.data.forEach((val: any) => {
        if (val.midTermSettlement === true) {
          notification('error', '중도정산 반영된 내역이 있습니다. 중도정산 반영된 내역은 중도정산 삭제해야만 급여삭제가 가능합니다.')
        } else {
          ids.push(val.incomeId);
        }
      });
      if (ids.length) {
        actionDelete({
          companyId: companyId,
          processKey: { ...processKey.value },
          incomeIds: ids,
        });
      }

    };
    const {
      mutate: actionDelete,
      onError: errorDelete,
      onDone: successDelete,
    } = useMutation(mutations.deleteIncomeWages);
    errorDelete((e) => {
      //notification('error', e.message)
    });
    successDelete((e) => {
      notification("success", Message.getMessage("COMMON", "402").message);
      emit("closePopup", false);
      store.state.common.pa110.loadingTableInfo++;
    });

    return {
      setModalVisible,
      onSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.custom-modal-delete {
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
</style>
