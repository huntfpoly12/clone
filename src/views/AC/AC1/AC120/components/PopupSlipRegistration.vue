<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="644">
        <div class="mt-20">
            <standard-form action="" class="text-align-center mt-20">
                <a-row class="row-1">
                    <a-col :span="8" class="col-1">
                        <a-form-item class="red" label="통장">
                            <select-box-common :arrSelect="arraySelectBox" :required="true" :width="100" />
                        </a-form-item>
                        <a-form-item class="red" label="금액">
                            <number-box :width="100" :required="true" />
                        </a-form-item>
                        <a-form-item class="red" label="적요">
                            <number-box :width="100" :required="true" />
                        </a-form-item>
                        <a-form-item class="red" label="자금원천">
                            <FundingSourceSelect :width="100" :required="true" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="16" class="col-2">
                        <a-form-item class="red" label="결의일자">
                            <date-time-box width="150px" :required="true"/>
                        </a-form-item>
                        <a-form-item class="red" label="결의서 종류">
                            <radio-group :arrayValue="arrayRadioCheck" :layoutCustom="'horizontal'" :required="true"/>
                        </a-form-item>
                        <a-form-item class="red" label="품의종류">
                            <radio-group :arrayValue="arrayRadioCheck1" :layoutCustom="'horizontal'" :required="true"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <div class="mt-10"><span>상기의 전표들을 취소하시겠습니까?</span></div>
                <div class="mt-20">
                    <button-basic class="button-form-modal" :text="'아니요'" :width="140" :type="'default'" :mode="'outlined'"
                        @onClick="cancel" />
                    <button-basic class="button-form-modal" :text="'네. 취소합니다'" :width="140" :type="'default'"
                        :mode="'contained'" @onClick="submit" />
                </div>
            </standard-form>
        </div>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import queries from "@/graphql/queries/CM/CM120";
import { useQuery } from "@vue/apollo-composable";
import { companyId } from "@/helpers/commonFunction";
import { useStore } from 'vuex';

export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },
    components: {
    },

    setup(props, { emit }) {
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear)
        const cancel = () => {
            emit("closePopup", false)
        };
        const submit = () => {
            emit("submit")
    }

        const arraySelectBox = ref([]);
        const triggerBankbooks = ref<boolean>(true);
        const { result: resBankbooks, loading: loadingGetBankbooks } = useQuery(queries.getBankbooks, {
            companyId: companyId,
            fiscalYear: globalYear,
        }, () => ({
            enabled: triggerBankbooks.value,
            fetchPolicy: "no-cache",
        }))
        watch(resBankbooks, (value) => {
            triggerBankbooks.value = false
            arraySelectBox.value = []
            if (value.getBankbooks) {
                arraySelectBox.value = value.getBankbooks.map((value: any) => {
                    return {
                        'label': value.bankbookNickname,
                        'value': value.bankbookId
                    }
                })
            }
        })
        const arrayRadioCheck = [
            { id: 0, text: '수입' },
            { id: 1, text: '지출' },
            { id: 2, text: '마이너스수입' },
            { id: 3, text: '여입' }
        ]
        const arrayRadioCheck1 = [
            { id: 0, text: '구입' },
            { id: 1, text: '운반' },
            { id: 2, text: '수선' },
            { id: 3, text: '인쇄' },
            { id: 3, text: '지출' },
        ]
        return {
            submit,
            cancel,
            arraySelectBox,
            arrayRadioCheck,
            arrayRadioCheck1
        }
    },
})
</script>

<style lang="scss" scoped>
.text-align-center {
    text-align: center;
}

.button-form-modal {
    margin: 0px 5px;
}

.mt-10 {
    margin-top: 10px;
}

.mt-20 {
    margin-top: 20px;
}

.input_number {
    display: flex;
    align-items: center;
}

:deep .col-1 .ant-form-item-label {
    >label {
        width: 80px;
    }
}

:deep .col-2 .ant-form-item-label {
    >label {
        width: 85px;
    }
}
</style>
