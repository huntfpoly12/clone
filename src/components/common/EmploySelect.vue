<template>
    <DxSelectBox :noDataText="Message.getMessage('COMMON', '901').message" :width="width" :data-source="arrayValue" placeholder="선택" item-template="item-data"
        value-expr="employeeId" display-expr="employeeId"
        :value="valueEmployee" :name="nameInput"
        field-template="field-data" @value-changed="updateValue" @item-click="eventItemClick"
        :disabled="disabled" class="custom-select" :dropDownOptions="{ minHeight: '80px' }">
        <template #field-data="{ data }: any">
            <div v-if="data" style="padding-left: 4px">
                <employee-info :idEmployee="data.employeeId" :idCardNumber="data.residentId"
                                        :name="data.name" :status="data.status"
                                        :foreigner="data.foreigner" :checkStatus="false" :forDailyUse="activeType20 == true && data.type == 20"/>
                <DxTextBox style="display: none;" />
            </div>
            <div v-else style="padding: 4px; color: rgba(128,128,128,0.7)">
                <span>선택</span>
                <DxTextBox style="display: none;" />
            </div>
        </template>
        <template #item-data="{ data }: any">
            <employee-info :idEmployee="data.employeeId" :idCardNumber="data.residentId"
                                        :name="data.name" :status="data.status"
                                        :foreigner="data.foreigner" :checkStatus="false" :forDailyUse="activeType20 == true && data.type == 20"/>
        </template>

        <DxValidator :name="nameInput">
            <DxRequiredRule v-if="required" :message="messageRequired" />
        </DxValidator>
    </DxSelectBox>
</template>
<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import { Message } from "@/configs/enum"
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
export default defineComponent({
    props: {
        width: String,
        disabled: Boolean,
        valueEmploy: {
            type: Object as () => string | number | null,
        },
        arrayValue: {
            type: Array,
            required: true
        },
        required: {
            type: Boolean,
            default: false,
        },
        nameInput: {
            type: String,
            default: '',
        },
        messRequired: {
            type: String,
            default: "",
        },
        activeType20: {
            type: Boolean,
            default: true
        }
    },
    components: {
        DxSelectBox,
        DxTextBox,
        DxValidator,
        DxRequiredRule
    },
    setup(props, { emit }) {
        const app: any = getCurrentInstance();
        const messages = app.appContext.config.globalProperties.$messages;
        const messageRequired = ref(messages.getCommonMessage('102').message);
        if (props.messRequired != "") {
            messageRequired.value = props.messRequired;
        }
        const valueEmployee = ref(props.valueEmploy);

        const updateValue = (value: any) => {
            emit("update:valueEmploy", value.value);
            emit("onUpdateValue", value.value)
        };
        const convertBirthDay = (birthDay: any) => {
            let newBirthDay = birthDay.split("-")[0]
            let typeYear = birthDay.split("-")[1].charAt(0)
            if (typeYear == 1 || typeYear == 2 || typeYear == 5 || typeYear == 6)
                return '19' + newBirthDay.slice(0, 2) + '-' + newBirthDay.slice(2, 4) + '-' + newBirthDay.slice(4, 6)
            else if (typeYear == 3 || typeYear == 4 || typeYear == 7 || typeYear == 8)
                return '20' + newBirthDay.slice(0, 2) + '-' + newBirthDay.slice(2, 4) + '-' + newBirthDay.slice(4, 6)
        }
        watch(
            () => props.valueEmploy,
            (newValue) => {
              valueEmployee.value = newValue;
            }
        );

        const eventItemClick = (e: any) => {
            emit('onChange', e.itemData.employeeId)
        }
        return {
            updateValue,
            valueEmployee,
            convertBirthDay,
            eventItemClick,
            messageRequired,
            Message,
        };
    },
});
</script>
<style scoped>
.main {
    display: flex;
    align-items: flex-end;
    /* padding: 2px 9px !important; */
}


.tag-status {
    background-color: red;
    color: white;
    padding: 2px 10px;
    border-radius: 5px;
    margin: 0 5px;
}
.tag-type-20 {
    background-color: rgb(255, 255, 255);
    color: black;
    padding: 2px 10px;
    border-radius: 5px;
    margin: 0 5px;
    border: solid 1px;
}

.tag-foreigner {
    background-color: orange;
    color: white;
    padding: 2px 10px;
    border-radius: 5px;
    margin: 0 5px;
}

.display-none {
    display: none;
}

.jtf-center {
    justify-content: center;
}
:deep .dx-overlay-content{
  min-height: 100px;
}
</style>
