<template>
    <DxSelectBox :noDataText="Message.getMessage('COMMON', '901').message" :onOpened="onOpened" :width="width" :search-enabled="true" :searchExpr="['name', 'shortCode']"
        :data-source="accountSubjects" placeholder="선택" value-expr="code" display-expr="name"
        :show-clear-button="clearButton" v-model:value="value" field-template="field" item-template="item"
        :key="resetSelect" :disabled="disabled" :read-only="readOnly" @value-changed="updateValue(value)"
        :height="$config_styles.HeightInput" :name="nameInput">
        <template #field="{ data }">
            <div v-if="data">
                <a-tooltip v-if="!!lengthText" zIndex="9999999" placement="top" color="black">
                    <template #title>{{ data.name + ' ' + data.shortCode }}</template>
                    <div>
                        <DxTextBox :read-only="readOnly" :value="data.name + ' ' + data.shortCode" height="26"></DxTextBox>
                    </div>
                </a-tooltip>
                <DxTextBox v-else :read-only="readOnly" :value="data.name + ' ' + data.shortCode" height="26"></DxTextBox>
            </div>
            <DxTextBox :read-only="readOnly" v-else placeholder="선택" height="26" />
        </template>
        <template #item="{ data }">
            <div class="custom-value-account-code">
                <a-tooltip zIndex="9999" placement="top" color="black">
                    <template #title>{{ data.name1 }} > {{ data.name2 }}</template>
                    <div>
                        {{ data.name }} {{ data.shortCode }}
                    </div>
                </a-tooltip>
            </div>
        </template>
        <DxValidator :name="nameInput">
            <DxRequiredRule v-if="required" :message="messageRequired" />
            <DxCustomRule  :message="messageCheckCode" :validation-callback="validateCheckCode" />
        </DxValidator>
    </DxSelectBox>
</template>
<script lang="ts">
import { ref, watch, getCurrentInstance, computed, onMounted } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import { DxValidator, DxRequiredRule, DxCustomRule } from "devextreme-vue/validator";
import { useStore } from 'vuex';
import { Message } from "@/configs/enum"
export default {
    props: {
        required: {
            type: Boolean,
            default: false,
        },
        messRequired: {
            type: String,
            default: "",
        },
        width: String,
        clearButton: Boolean,
        disabled: Boolean,
        valueInput: {
            type: [Number, String],
            default: null,
        },
        code1Check: {
            type: [Number, String],
            default: null,
        },
        code2Check: {
            type: [Number, String],
            default: null,
        },
        code3Check: {
            type: [Number, String],
            default: null,
        },
        readOnly: Boolean,
        nameInput: {
            type: String,
            default: '',
        },
        useStartDate: {
            type: Number,
            default: null,
        },
        useFinishDate: {
            type: Number,
            default: null,
        },
        classification: {
            type: Array,
            default: null,
        },
        lengthText: {
            type: Number,
            default: null,
        }
    },
    components: {
        DxSelectBox,
        DxValidator,
        DxRequiredRule,
        DxTextBox,
        DxCustomRule,
    },
    setup(props: any, { emit }: any) {
        const store = useStore();
        const app: any = getCurrentInstance();
        const messages = app.appContext.config.globalProperties.$messages;
        const messageCheckCode = ref('원천/전용 계정과목의 목이 동일합니다.')
        const messageRequired = ref(messages.getCommonMessage('102').message);
        if (props.messRequired != "") {
            messageRequired.value = props.messRequired;
        }
        const dataAccountSubject = ref(JSON.parse(sessionStorage.getItem("accountSubject") ?? '[]'))
        const resetSelect = ref(0)
        let value: any = ref(null);
        let accountSubjects: any = ref([])
        onMounted(() => {
            fillData()
        });
        watch(dataAccountSubject.value, (newValue) => {
            fillData()
        });
        const fillData = () => {
            accountSubjects.value = []
            if (dataAccountSubject.value.length) {
                dataAccountSubject.value?.map((row: any) => {
                    if (props.useStartDate && !props.useFinishDate) {
                        if (row.useStartDate >= props.useStartDate) {
                            fillRow(row)
                        }
                    } else if (!props.useStartDate && props.useFinishDate) {
                        if (row.useFinishDate <= props.useFinishDate) {
                            fillRow(row)
                        }
                    } else if (props.useStartDate && props.useFinishDate) {
                        if (row.useStartDate >= props.useStartDate && row.useFinishDate <= props.useFinishDate) {
                            fillRow(row)
                        }
                    } else {
                        fillRow(row)
                    }
                })
            }
            // if (!accountSubjects.value.find((row: any) => row.code == value.value)) {
            //     emit("update:valueInput", '');
            //     resetSelect.value++
            // }
        }
        const fillRow = (row: any) => {
            const filteredArr = ref(row.codes)
            if (props.classification) {
                filteredArr.value = row.codes.filter((item: any) => props.classification.includes(item.classification));
            }
            filteredArr.value?.map((val: any) => {
                accountSubjects.value.push({
                    name: val.name,
                    name1: val.name1,
                    shortCode: val.shortCode,
                    name2: val.name2,
                    code: val.code,
                    valueEmit: {
                        code1: val.code1,
                        code2: val.code2,
                        code3: val.code3,
                    }
                })
            })
            if (!accountSubjects.value?.find((element: any) => element.code == props.valueInput)) {
                emit("update:valueInput", null);
            }
        }
        watch(() => [props.useStartDate, props.useFinishDate, props.classification], () => {
            fillData()
        });

        const updateValue = (code: any) => {
            emit("update:valueInput", code);
            emit("valueCode3", accountSubjects.value?.find((element: any) => element.code == code)?.valueEmit);
        };

        watch(() => props.valueInput, (newValue) => {
            value.value = !!newValue ? newValue : null;
        }, {
            deep: true,
            immediate: true,
        });
        watch(() => [props.code1Check, props.code2Check, props.code3Check], () => {
            resetSelect.value++
            validateCheckCode()
        });
        const onOpened = (e: any) => {
            e.component._popup.option('width', props.width);
        }
        const validateCheckCode = () => {
            if(!props.code3Check || !props.code1Check || !props.code2Check) {
                return true
            }
            if (props.code3Check == accountSubjects.value?.find((element: any) => element.code == value.value)?.valueEmit.code3) {
                messageCheckCode.value = '원천/전용 계정과목의 목이 동일합니다.'
                return false;
            }
            if (props.code1Check != accountSubjects.value?.find((element: any) => element.code == value.value)?.valueEmit.code1 
            || props.code2Check != accountSubjects.value?.find((element: any) => element.code == value.value)?.valueEmit.code2) {
                messageCheckCode.value = '원천/전용계정과목의 관/항코드는 동일해야 합니다.'
                return false;
            }
            return true
            
        } 
        return {
            messageRequired, resetSelect, onOpened,
            accountSubjects,
            updateValue,
            value,
            Message,
            messageCheckCode, 
            validateCheckCode,
        };
    },
};
</script>
  
<style scoped lang="scss">
.form-group {
    margin-top: 30px;
}

.custom-value-account-code {
    div {
        max-width: 100%;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
  