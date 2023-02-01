<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="500">
        <standard-form action="" name="delete-110">
            <div class="custom-modal-delete">
                <img src="@/assets/images/icon_delete.png" alt="" style="width: 30px;">
                <span>중도퇴사자 연말정산 반영분을 삭제하시겠습니까?</span>
            </div>
            <div class="text-align-center mt-30">
                <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
                    @onClick="setModalVisible" />
                <button-basic class="button-form-modal" :text="'네. 삭제합니다'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="onSubmit" />
            </div>
        </standard-form>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import notification from "@/utils/notification";
import { companyId } from '@/helpers/commonFunction';
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA1/PA110/index"
import { useStore } from 'vuex'
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object,
            default: {}
        }
    },
    components: {
    },
    setup(props, { emit }) {
        const store = useStore()
        const {
            mutate,
            onDone,
            onError,
        } = useMutation(mutations.deleteMidTermSettlement);
        onDone(() => {
            notification('success', `업데이트 완료!`)
            emit("closePopup", false)
        })
        onError((e: any) => {
            notification('error', e.message)
        })

        const setModalVisible = () => {
            emit("closePopup", false)
        };

        const onSubmit = (e: any) => {
            mutate({
                companyId: companyId,
                processKey: store.state.common.processKeyPA110,
                paymentDay: props.data.paymentDay,
                employeeId: props.data.employee.employeeId,
            })
        };

        return {
            setModalVisible,
            onSubmit,
        }
    },
})
</script>

<style lang="scss">
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