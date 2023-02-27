<template>
    <DxSelectBox :width="width" :data-source="arrayValue" item-template="item-data" value-expr="employeeId"
        display-expr="employeeId" :value="valueEmployRes" field-template="field-data" @value-changed="updateValue"
        :height="$config_styles.HeightInput" :disabled="disabled">
        <template #field-data="{ data }">
            <div v-if="data" style="padding: 2px">
                <income-type :typeCode="data?.employeeId" :typeName="(data?.name)"
                    :incomeTypeName="data?.incomeTypeName" />
                <DxTextBox style="display: none;" />
                {{ data }}
            </div>
            <div v-else class="pt-5 pl-5">
                <span>선택</span>
                <DxTextBox style="display: none;" />
            </div>

        </template>
        <template #item-data="{ data }">
          <!-- <div>
                <income-type :typeCode="data?.incomeTypeCode" :typeName="data?.name"
                    :incomeTypeName="data?.incomeTypeName" />
            </div> -->
          <div class="employee-group">
            <button style="margin-right: 5px">
              {{ data.employeeId }}
            </button>
            {{ data?.name }}
            <a-tooltip placement="top" zIndex="999999" v-if="data?.incomeTypeName">
              <template #title>
                {{ data.incomeTypeCode }}
                <span v-if="data?.incomeTypeName?.length > 10">{{ data?.incomeTypeName
                }}</span>
              </template>
              {{ checkLen(data?.incomeTypeName) }}
            </a-tooltip>
          </div>
        </template>
        <DxValidator :name="nameInput">
            <DxRequiredRule v-if="required" :message="messageRequired" />
        </DxValidator>
    </DxSelectBox>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, getCurrentInstance } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";

export default defineComponent({
    props: {
        required: {
            type: Boolean,
            default: true,
        },
        width: String,
        disabled: Boolean,
        valueEmploy: {
            type: Number,
        },
        arrayValue: {
            type: Array,
            required: true
        },
        nameInput: {
            type: String,
            default: '',
        },
    },
    components: {
        DxSelectBox,
        DxTextBox,
        DxValidator,
        DxRequiredRule,
    },
    setup(props, { emit }) {
        let valueEmployRes: any = ref(props.valueEmploy);
        let arrayValueRes: any = ref(props.arrayValue);

        const updateValue = (value: any) => {
            emit("update:valueEmploy", value.value);  
            props.arrayValue.forEach((val:any)=>{
                if(val.employeeId == value.value){
                    emit("incomeTypeCode", val.incomeTypeCode, val.employeeId);
                }
            })

        };

        // watch(
        //     () => props.arrayValue,
        //     (newValue) => {
        //         arrayValueRes.value = newValue;
        //     }
        // ), { deep: true };
        watch(
            () => props.valueEmploy,
            (newValue) => {
                valueEmployRes.value = newValue;
            }
        );
        const app: any = getCurrentInstance();
        const messages = app.appContext.config.globalProperties.$messages;
        const messageRequired = ref(messages.getCommonMessage('102').message);
        const checkLen = (text: String) => {
          if (text.length > 10) {
            return text.substring(0, 7) + '...';
          }
          return text;
        };
        return {
            updateValue,
            valueEmployRes,
            messageRequired,
            checkLen,
            // arrayValueRes,
        };
    },
});
</script>
<style scoped>
.main {
    display: flex;
    align-items: flex-end;
}


.tag-status {
    background-color: red;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    margin: 0 5px;
}


.tag-status {
    background-color: red;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    margin: 0 5px;
}

.tag-foreigner {
    background-color: orange;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    margin: 0 5px;
}

.display-none {
    display: none;
}

.jtf-center {
    justify-content: center;
}
.employee-group {
  padding: 0 10px;
}
</style>
  