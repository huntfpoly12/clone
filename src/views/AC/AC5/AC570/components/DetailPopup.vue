<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" footer="" :width="562">
        <standard-form action="" name="detail-ac570" :key="resetFormDetail">
            <a-spin :spinning="false" size="large">
                <StandardForm class="ac-570-form" formName="ac-570-form" ref="ac570FormRef">
                    <h2 class="text-align-center">과목전용조서</h2>
                    <a-row>
                        <a-col :span="11"></a-col>
                        <a-col :span="13">
                            <a-form-item label="전용일자" :label-col="{ span: 9 }" class="red">
                                <date-time-box width="145px" v-model:valueDate="formState.transitionDate"
                                    dateFormat="YYYY-MM-DD" disabled="true" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <div class="top-content gray">
                        <a-typography-title :level="5" style="margin-bottom: 0;">원천계정과목</a-typography-title>
                    </div>
                    <div class="custom-center">
                        <a-form-item label="원천계정과목" :label-col="labelCol" class="red">
                            <account-code-select v-model:valueInput="formState.sourceCode" width="150px" :required="true"
                                disabled="true" />
                        </a-form-item>
                        <a-form-item label="예산액" :label-col="labelCol">
                            <number-box-money width="150px" min="0" v-model:valueInput="formState.sourceBudgetAmount" />
                        </a-form-item>
                        <a-form-item label="전용액" :label-col="labelCol" class="red">
                            <number-box-money width="150px" v-model:valueInput="formState.transitionAmount" disabled="true"
                                :required="true" placeholder="" />
                        </a-form-item>
                        <a-form-item label="예산현액" :label-col="labelCol">
                            <number-box-money width="150px" disabled="true"
                                :valueInput="formState.sourceBudgetAmount + formState.transitionAmount" />
                        </a-form-item>
                        <a-form-item label="지출액" :label-col="labelCol">
                            <number-box-money width="150px" placeholder="" min="0"
                                v-model:valueInput="formState.sourceExpenditureAmount" />
                        </a-form-item>
                        <a-form-item label="불용액" :label-col="labelCol">
                            <number-box-money width="150px" placeholder="" disabled="true"
                                :valueInput="formState.sourceBudgetAmount + formState.transitionAmount - formState.sourceExpenditureAmount" />
                        </a-form-item>
                    </div>

                    <div class="top-content">
                        <a-typography-title :level="5" style="margin-bottom: 0;">전용계정과목</a-typography-title>
                    </div>
                    <div class="custom-center">
                        <a-form-item label="전용계정과목" :label-col="labelCol" class="red">
                            <account-code-select width="150px" :required="true" disabled="true"
                                v-model:valueInput="formState.transitionCode" />
                        </a-form-item>
                        <a-form-item label="예산액" :label-col="labelCol">
                            <number-box-money width="150px" min="0" v-model:valueInput="formState.transitionBudgetAmount" />
                        </a-form-item>
                        <a-form-item label="전용액" :label-col="labelCol" class="red">
                            <number-box-money width="150px" :required="true" placeholder="" disabled="true"
                                v-model:valueInput="formState.transitionAmount" />
                        </a-form-item>
                        <a-form-item label="예산현액" :label-col="labelCol">
                            <number-box-money width="150px" disabled="true"
                                :valueInput="formState.transitionBudgetAmount + formState.transitionAmount" />
                        </a-form-item>
                        <a-form-item label="지출액" :label-col="labelCol">
                            <number-box-money width="150px" placeholder="" min="0"
                                v-model:valueInput="formState.transitionExpenditureAmount" />
                        </a-form-item>
                        <a-form-item label="불용액" :label-col="labelCol">
                            <number-box-money width="150px" placeholder="" disabled="true"
                                :valueInput="formState.transitionBudgetAmount + formState.transitionAmount - formState.transitionExpenditureAmount" />
                        </a-form-item>
                        <a-form-item label="전용사유" :label-col="labelCol" class="red">
                            <default-text-box width="150px" :required="true" placeholder=""
                                v-model:valueInput="formState.transitionCause" />
                        </a-form-item>
                    </div>
                    <div class="text-align-center mt-20" style="display: flex; justify-content: center;">
                        <button-basic mode="contained" type="default" text="저장" @onClick="onSubmit" />
                    </div>
                </StandardForm>
            </a-spin>
        </standard-form>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import notification from "@/utils/notification";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { Message } from "@/configs/enum";
import mutations from "@/graphql/mutations/AC/AC5/AC570";
import queries from "@/graphql/queries/AC/AC5/AC570";
import { initialStateDetail } from '../utils/index'
import { companyId } from "@/helpers/commonFunction";
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
        dataAddPopup: {
            type: Object,
            default: null
        },
        dataDetail: {
            type: Object,
            default: null
        }
    },
    components: {
    },
    setup(props, { emit }) {
        const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
        const globalFacilityBizId = ref<number>(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));

        const formState = ref<any>({ ...initialStateDetail })
        const ac570FormRef = ref()
        let resetFormDetail = ref(1);
        const theOrder = ref();

        // query getAccoountSubjects
        const {
            result: resGetAccoountSubjects, loading: loadingGetAccoountSubjects, onError: errorGetAccoountSubjects
        } = useQuery(queries.getAccoountSubjects, {
            companyId: companyId,
            fiscalYear: acYear.value,
            facilityBizType: parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0')
        }, () => ({
            fetchPolicy: "no-cache",
        }))

        // mutation updateBudgetSubjectTransition
        const {
            mutate: updateBudgetSubjectTransition, onDone: doneUpdateBudgetSubjectTransition, onError: errorUpdateBudgetSubjectTransition,
        } = useMutation(mutations.updateBudgetSubjectTransition);
        // updateBudgetSubjectTransition
        doneUpdateBudgetSubjectTransition((e) => {
            emit("closePopup", false)
            emit("callApi", true)
            notification('success', Message.getMessage('COMMON', '106').message)
        })
        errorUpdateBudgetSubjectTransition(e => {
            notification('error', e.message)
        })

        // mutation createBudgetSubjectTransition
        const {
            mutate: createBudgetSubjectTransition, onDone: doneCreateBudgetSubjectTransition, onError: errorCreateBudgetSubjectTransition,
        } = useMutation(mutations.createBudgetSubjectTransition);
        // createBudgetSubjectTransition
        doneCreateBudgetSubjectTransition((e) => {
            emit("closePopup", false)
            emit("callApi", true)
            notification('success', Message.getMessage('COMMON', '101').message)
        })
        errorCreateBudgetSubjectTransition(e => {
            notification('error', e.message)
        })


        const setModalVisible = () => {
            emit("closePopup", false)
        };

        const onSubmit = (e: any) => {
            var res = ac570FormRef.value.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                if (props.dataAddPopup) {
                    createBudgetSubjectTransition({
                        companyId: companyId,
                        fiscalYear: acYear.value,
                        facilityBusinessId: globalFacilityBizId.value,
                        input: {
                            accounSubjectOrder: theOrder.value,
                            ...formState.value
                        }
                    })
                } else if (props.dataDetail) {
                    updateBudgetSubjectTransition({
                        companyId: companyId,
                        fiscalYear: acYear.value,
                        facilityBusinessId: globalFacilityBizId.value,
                        transitionId: props.dataDetail.transitionId,
                        input: {
                            sourceBudgetAmount: formState.value.sourceBudgetAmount ,
                            sourceExpenditureAmount: formState.value.sourceExpenditureAmount ,
                            transitionBudgetAmount: formState.value.transitionBudgetAmount ,
                            transitionExpenditureAmount: formState.value.transitionExpenditureAmount ,
                            transitionCause: formState.value.transitionCause
                        }
                    })
                }
            }
        };

        watch(() => props.modalStatus, (value) => {
            Object.assign(formState.value, { ...initialStateDetail })
            if (value) {
                if (props.dataAddPopup) {
                    console.log(1);
                    Object.assign(formState.value, props.dataAddPopup)
                } else if (props.dataDetail) {
                    console.log(2);

                    Object.assign(formState.value, props.dataDetail)
                }
            }
            resetFormDetail.value++
        })

        watch(resGetAccoountSubjects, (value) => {
            theOrder.value = value.getAccoountSubjects[0].theOrder
        })

        return {
            setModalVisible,
            onSubmit,
            labelCol: { style: { width: "150px" } },
            formState,
            ac570FormRef,
            resetFormDetail,
        }
    },
})
</script>

<style lang="scss" scoped>
.custom-modal {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
}

.custom-modal .ant-form-item-label>label {
    width: 130px;
    padding-left: 10px;
}

.text-align-center {
    text-align: center;
}

.button-form-modal {
    margin: 0px 5px;
}

.top-content {
    margin-bottom: 10px;
    padding: 2px 4px;
    background-color: #9cddfc;


}

.gray {
    background-color: #e5e5e5;
}
</style>
