<template>{{ tabName }} 
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="644">
        <standard-form action="" name="request-file-630">
            <div>
              <div class="eamil-input">
                <span>선택된 내역들의 전자신고파일 제작요청하고, 결과를</span>
                <mail-text-box width="250px" :required="true" v-model:valueInput="dataRequestFile.emailInput.receiverAddress" placeholder="abc@example.com"></mail-text-box>
              </div>
              <div>
                <span>로 메일을 발송하시겠습니까?</span>
              </div>
                    
            </div>
            <div class="text-align-center mt-10">
                <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
                    @onClick="setModalVisible()" />
                <button-basic class="button-form-modal" :text="'네. 발송합니다'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="onSubmit" />
            </div>
        </standard-form>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/BF/BF6/BF630/index"
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object,
            default: {}
        },
        tabName: {
            type: String,
            default: ''
        }
    },
    components: {
    },
    setup(props, { emit }) {
        let emailAddress = ref(props.data.emailInput.receiverAddress);
        const dataRequestFile = ref(props.data)
        const setModalVisible = () => {
            emit("closePopup", false)
        };
        // query send request file tab 1
        const {
            mutate: sendRequestFileTab1,
            onDone: onDoneTab1,
            onError: onErrorTab1,
        } = useMutation(mutations.requestCreationIncomeWagePaymentStatementElectronicFilingFile);
        // query send request file tab 2
        const {
            mutate: sendRequestFileTab2,
            onDone: onDoneTab2,
            onError: onErrorTab2,
        } = useMutation(mutations.requestCreationIncomeRetirementPaymentStatementElectronicFilingFile);
        // query send request file tab 3
        const {
            mutate: sendRequestFileTab3,
            onDone: onDoneTab3,
            onError: onErrorTab3,
        } = useMutation(mutations.requestCreationIncomeBusinessPaymentStatementElectronicFilingFile);
        // query send request file tab 4
        const {
            mutate: sendRequestFileTab4,
            onDone: onDoneTab4,
            onError: onErrorTab4,
        } = useMutation(mutations.requestCreationIncomeExtraPaymentStatementElectronicFilingFile);


        const onSubmit = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
              switch (props.tabName) {
                case 'tab1':
                  sendRequestFileTab1(dataRequestFile.value);
                  break;
                case 'tab2':
                  sendRequestFileTab2(dataRequestFile.value);
                  break;
                case 'tab3':
                  sendRequestFileTab3(dataRequestFile.value);
                  break;
                case 'tab4':
                  sendRequestFileTab4(dataRequestFile.value);
                  break;
                default:
                  break;
              }

            }
        };

        // onDone tab 1
        onDoneTab1(() => {
            notification('success', `업데이트 완료!`)
            emit("closePopup", false)
        })
        onErrorTab1((e: any) => {
            notification('error', e.message)
        })
        // onDone tab 2
        onDoneTab2(() => {
            notification('success', `업데이트 완료!`)
            emit("closePopup", false)
        })
        onErrorTab2((e: any) => {
            notification('error', e.message)
        })
        // onDone tab 3
        onDoneTab3(() => {
            notification('success', `업데이트 완료!`)
            emit("closePopup", false)
        })
        onErrorTab3((e: any) => {
            notification('error', e.message)
        }) 
        // onDone tab 4
        onDoneTab4(() => {
            notification('success', `업데이트 완료!`)
            emit("closePopup", false)
        })
        onErrorTab4((e: any) => {
            notification('error', e.message)
        })

        return {
            setModalVisible,
            onSubmit,
            emailAddress,
            dataRequestFile
        }
    },
})
</script>

<style lang="scss" scoped>
.eamil-input {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    span {
        padding-right: 10px;
    }
}
.mt-50 {
    margin-top: 50px;
}

.text-align-center {
    text-align: center;
}

.button-form-modal {
    margin: 0px 5px;
}
</style>
