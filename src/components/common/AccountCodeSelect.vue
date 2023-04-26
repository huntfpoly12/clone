<template>
    <DxSelectBox :onOpened="onOpened" :width="width" :search-enabled="false" :searchExpr="['name', 'shortCode']" :data-source="accountSubjects"
        placeholder="선택" value-expr="code" display-expr="name" :show-clear-button="clearButton" v-model:value="value"
        field-template="field" item-template="item" :key="resetSelect" :disabled="disabled" :read-only="readOnly"
        @value-changed="updateValue(value)" :height="$config_styles.HeightInput" :name="nameInput">
        <template #field="{ data }">
            <template v-if="data">
              <a-tooltip v-if="!!lengthText" zIndex="9999999" placement="top" color="black">
                  <template #title>{{ data.name + ' ' + data.shortCode }}</template>
                  <div>
                    <DxTextBox :read-only="readOnly" :value="data.name + ' ' + data.shortCode" height="26"></DxTextBox>
                  </div>
                </a-tooltip>
              <DxTextBox v-else :read-only="readOnly" :value="data.name + ' ' + data.shortCode" height="26"></DxTextBox>
            </template>
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
        </DxValidator>
    </DxSelectBox>
</template>
<script lang="ts">
import { ref, watch, getCurrentInstance, computed, onMounted } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import { useStore } from 'vuex';
import { accountSubject } from "@/helpers/commonFunction"
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
        let value: any = ref(null);
        // const arrAllCallApi = accountSubject
        let accountSubjects: any = ref([])
        onMounted(() => {
            fillData()
        });
        watch(accountSubject, (newValue) => {
            fillData()
        });
        const fillData = () => {
            accountSubjects.value = []
            if (accountSubject.length) {
                accountSubject?.map((row: any) => {
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
                })
            })
        }
        watch(() => [props.useStartDate, props.useFinishDate, props.classification], () => {
            fillData()
        });

        const updateValue = (code: any) => {
            emit("update:valueInput", code);
        };

        watch(() => props.valueInput, (newValue) => {
            value.value = !!newValue ? newValue : null;
        },{
          deep: true,
          immediate: true,
        });
        const onOpened = (e: any) => {
            e.component._popup.option('width', props.width);
        }
        return {
            messageRequired, resetSelect, onOpened,
            accountSubjects,
            updateValue,
            value,
        };
    },
};
</script>
  
<style scoped lang="scss">
.form-group {
    margin-top: 30px;
}
.custom-value-account-code {
  div{
    max-width: 100%;
    display:inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
  