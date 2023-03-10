<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="500">
        <standard-form action="" name="delete-510">
            <div class="custom-modal-delete">
                <img src="@/assets/images/icon_delete.png" alt="" style="width: 30px;">
                <span>선택된 내역({{ data.length }}건) 삭제합니다. 그래도 진행하시겠습니까?</span>
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
import { defineComponent, watch, ref, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import dayjs, { Dayjs } from 'dayjs';
import { companyId } from "@/helpers/commonFunction"
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA5/PA510/index"
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

        const store = useStore()
        const processKey = computed(() => store.state.common.processKeyPA510)
        const setModalVisible = () => {
            emit("closePopup", false)
        };

        const onSubmit = (e: any) => {
            let ids: any = [];
            props.data.forEach((val: any) => {
                ids.push(val.incomeId)
            });
            actionDelete({
                companyId: companyId,
                processKey: {...processKey.value},
                incomeIds: ids
            })
        };
        const {
            mutate: actionDelete,
            onError: errorDelete,
            onDone: successDelete,
        } = useMutation(mutations.deleteIncomeWageDailies)
        errorDelete(e => {
            notification('error', e.message)
        })
        successDelete(e => {
            notification('success', `업데이트 완료!`)
            emit("closePopup", false)
            // store.state.common.actionAddItem = true;
            store.state.common.loadingTableInfo++
        })

        return {
            setModalVisible,
            onSubmit,
        }
    },
})
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