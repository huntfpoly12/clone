<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="500">
        <standard-form action="" name="print-payroll-register-510">
            <div class="custom-modal-print-payroll-register">
                <img src="@/assets/images/print.svg" alt="" style="width: 30px;">
                <span>급여대장을 출력하시겠습니까? </span>
                <DxSelectBox :data-source="dataSelect" :style="{ width: '100px', display: 'inline-block' }"
                    v-model:value="valueSelect" value-expr="value" display-expr="name" :required="true">
                </DxSelectBox>
            </div>
            <div class="text-center mt-30">
                <button-basic class="mr-5" :text="'아니요'" :type="'default'" :mode="'outlined'"
                    @onClick="setModalVisible" />
                <button-basic class="ml-5" :text="'네. 출력합니다'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="onSubmitPrint" />
            </div>
        </standard-form>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from 'vue'
import { useStore } from 'vuex'
import DxSelectBox from "devextreme-vue/select-box";
import notification from "@/utils/notification";
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA5/PA510/index";
import { companyId } from '@/helpers/commonFunction';
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        DxSelectBox,
    },
    setup(props, { emit }) {
        const store = useStore()
        const processKey = computed(() => store.state.common.pa510.processKeyPA510)
        const trigger = ref<boolean>(false)
        const setModalVisible = () => {
            emit("closePopup", false)
        };

        const dataSelect = ref([
            { name: '사번순', value: '사번' },
            { name: '부서순', value: '부서' },
            { name: '직위순', value: '직위' },
        ])
        const valueSelect = ref('사번')
        watch(() => props.modalStatus, (val) => {
            valueSelect.value = '사번'
        });
        const originData: any = ref({})
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.getIncomeWageDailyPayrollRegisterViewUrl, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
        watch(result, (value) => {
            trigger.value = false;
            if (value) {
                emit("closePopup", false)
                window.open(value.getIncomeWageDailyPayrollRegisterViewUrl)
            }
        })
        const onSubmitPrint = (e: any) => {
            originData.value = {
                companyId: companyId,
                input: { ...processKey.value }
            }
            originData.value.input.sortType = valueSelect.value
            trigger.value = true
        };


        return {
            setModalVisible,
            onSubmitPrint,
            dataSelect,
            valueSelect,
        }
    },
})
</script>

<style lang="scss" scoped>
.custom-modal-print-payroll-register {
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