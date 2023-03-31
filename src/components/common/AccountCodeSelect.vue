<template>
    <DxSelectBox :width="width" :data-source="accountSubjects" placeholder="선택" value-expr="code" display-expr="name"
        :show-clear-button="clearButton" v-model:value="value" field-template="field" item-template="item" :key="resetSelect"
        :disabled="disabled" @value-changed="updateValue(value)" :height="$config_styles.HeightInput" :name="nameInput">
        <template #field="{ data }">
            <div v-if="data" style="padding: 5px;">
                <a-tooltip zIndex="9999" placement="top" color="black">
                    <template #title>{{ data.name1 }} > {{ data.name2 }}</template>
                    <span>
                        <div>
                            {{ data.name }} {{ data.shortCode }}
                        </div>
                    </span>
                </a-tooltip>
                <DxTextBox style="display: none;" />
            </div>
            <div v-else style="padding: 5px; height: 30px;">
                <div>
                    <span>선택</span>
                    <DxTextBox style="display: none;" />
                </div>
            </div>
        </template>
        <template #item="{ data }">
            <div class="custom-value">
                <a-tooltip zIndex="9999" placement="top" color="black">
                    <template #title>{{ data.name1 }} > {{ data.name2 }}</template>
                    <span>
                        <div>
                            {{ data.name }} {{ data.shortCode }}
                        </div>
                    </span>
                </a-tooltip>
            </div>
        </template>
        <DxValidator :name="nameInput">
            <DxRequiredRule v-if="required" :message="messageRequired" />
        </DxValidator>
    </DxSelectBox>
</template>
<script lang="ts">
import { ref, watch, getCurrentInstance, computed, onMounted } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import { useStore } from 'vuex';
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
            default: "",
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
        }
    },
    components: {
        DxSelectBox,
        DxValidator,
        DxRequiredRule,
        DxTextBox,
    },
    setup(props: any, { emit }: any) {
        const store = useStore();
        const app: any = getCurrentInstance();
        const messages = app.appContext.config.globalProperties.$messages;
        const messageRequired = ref(messages.getCommonMessage('102').message);
        if (props.messRequired != "") {
            messageRequired.value = props.messRequired;
        }
        const resetSelect = ref(0)
        const value = ref(props.valueInput);
        const arrAllCallApi = computed(() => store.getters['settings/accountSubjects'])
        let accountSubjects: any = ref([])
        onMounted(() => {
            fillData()
        });
        watch(arrAllCallApi, (newValue) => {
            fillData()
        });
        const fillData = () => {
            accountSubjects.value = []
            if (arrAllCallApi.value.length) {
                arrAllCallApi.value?.map((row: any) => {
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
            if (!accountSubjects.value.find((row: any) => row.code == value.value)) {
                emit("update:valueInput", '');
                resetSelect.value++
            }
        }
        const fillRow = (row: any) => {
            row.codes?.map((val: any) => {
                accountSubjects.value.push({
                    name: val.name,
                    name1: val.name1,
                    shortCode: val.shortCode,
                    name2: val.name2,
                    code: val.code,
                })
            })
        }
        watch(() => [props.useStartDate, props.useFinishDate], () => {
            fillData()
        });

        const updateValue = (code: any) => {
            emit("update:valueInput", code);
        };

        watch(() => props.valueInput, (newValue) => {
            value.value = newValue;
        });
        return {
            messageRequired, arrAllCallApi, resetSelect,
            accountSubjects,
            updateValue,
            value,
        };
    },
};
</script>
  
<style scoped>
.form-group {
    margin-top: 30px;
}
</style>
  