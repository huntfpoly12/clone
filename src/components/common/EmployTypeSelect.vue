<template>
    <DxSelectBox :width="width" :data-source="arrayValueRes" item-template="item-data" value-expr="employeeId"
        display-expr="employeeId" :value="valueEmployRes" field-template="field-data" @value-changed="updateValue"
        :height="$config_styles.HeightInput" :disabled="disabled">
        <template #field-data="{ data }">
            <div v-if="data" style="padding: 2px">
                <income-type :typeCode="data?.incomeTypeCode" :typeName="(data?.name)"
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
            <div>
                <income-type :typeCode="data?.incomeTypeCode" :typeName="data?.name"
                    :incomeTypeName="data?.incomeTypeName" />
            </div>
        </template>
    </DxSelectBox>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, getCurrentInstance } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";

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
    },
    components: {
        DxSelectBox,
        DxTextBox
    },
    setup(props, { emit }) {
        let valueEmployRes: any = ref(props.valueEmploy);
        let arrayValueRes: any = ref(props.arrayValue);

        const updateValue = (value: any) => {
            emit("update:valueEmploy", value.value);  
            arrayValueRes.value.map((val:any)=>{
                if(val.employeeId == value.value){
                    emit("incomeTypeCode", val.incomeTypeCode);
                }
            })

        };

        watch(
            () => props.arrayValue,
            (newValue) => {
                arrayValueRes.value = newValue;
            }
        ), { deep: true };
        watch(
            () => props.valueEmploy,
            (newValue) => {
                valueEmployRes.value = newValue
            }
        );
        return {
            updateValue,
            valueEmployRes,
            arrayValueRes,
        };
    },
});
</script>
<style scoped>
.main {
    display: flex;
    align-items: flex-end;
}

.style-Id {
    margin-right: 5px;
    text-align: center;
    border: 1px solid rgb(164, 164, 164);
    border-radius: 5px;
    line-height: 23px;
    padding: 0 7px;
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
</style>
  