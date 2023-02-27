<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="500">
        <standard-form action="" name="edit-510">
            <div class="custom-modal-edit">
                <img src="@/assets/images/icon_edit.png" alt="" style="width: 30px;">
                <span>선택된 내역 지급일을</span>
                <number-box width="70px" :required="true" :min="1" :max="31" v-model:valueInput="dayValue"
                    :spinButtons="true" />
                <span>일로 변경하시겠습니까?</span>
            </div>
            <div class="text-align-center mt-30">
                <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
                    @onClick="setModalVisible" />
                <button-basic class="button-form-modal" :text="'네. 변경합니다'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="onSubmit" />
            </div>
        </standard-form>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from 'vue'
import notification from "@/utils/notification";
import { companyId } from '@/helpers/commonFunction';
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA5/PA510/index"
import { useStore } from 'vuex'
import { Message } from "@/configs/enum";

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
        const dayValue = ref(1)
        const setModalVisible = () => {
            emit("closePopup", false)
        };
        const {
            mutate,
            onDone,
            onError,
        } = useMutation(mutations.changeIncomeWageDailyPaymentDay);
        onDone(() => {
            notification('success', Message.getMessage('COMMON', '101').message)
            emit("closePopup", false)
            store.state.common.loadingTableInfo++
            store.state.common.loadingFormData++
        })
        onError((e: any) => {
            notification('error', e.message)
        })
        const onSubmit = (e: any) => {
            props.data.forEach((data: any) => {
                mutate({
                    companyId: companyId,
                    processKey: processKey.value,
                    incomeId: data.incomeId,
                    day: dayValue.value
                })
            })

        };

        return {
            setModalVisible,
            onSubmit,
            dayValue,
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