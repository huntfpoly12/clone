<template>
        <DxSelectBox :width="width" :data-source="arrayValue" placeholder="선택" display-expr="label" value-expr="value"
            item-template="item-data" @value-changed="updateValue(value)" :height="$config_styles.HeightInput"
            :disabled="disabled">
            <template #item-data="{ data }">
                <span :class="[{ 'display-none': !data.employeeId }, 'style-Id']">
                    {{ data.employeeId }}
                </span>
                <span>{{ data.name }}</span>
                <span v-if="data.idCardNumber?.length == 14
                    && parseInt(data.idCardNumber.split('-')[0].slice(2, 4)) < 13 && parseInt(data.idCardNumber.split('-')[0].slice(4, 6)) < 32">
                    {{ convertBirthDay(data.idCardNumber) }}
                </span>
                <span class="tag-status" v-if="data.status == 0">퇴</span>
                <span class="tag-foreigner" v-if="data.foreigner == true">외</span>
            </template>
        </DxSelectBox>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, getCurrentInstance } from "vue";
import DxSelectBox from "devextreme-vue/select-box";

export default defineComponent({
    props: {
        required: {
            type: Boolean,
            default: true,
        },
        messRequired: {
            type: String,
            default: "",
        },
        width: String,
        disabled: Boolean,
        valueInput: {
            type: Number,
            default: 0,
        },
        arrayValue: {
            type: Array,
            required: true
        },
    },
    components: {
        DxSelectBox,
    },
    setup(props, { emit }) {
        const value = ref(props.valueInput);

        const updateValue = (value: any) => {
            emit("update:valueInput", value);
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
            () => props.valueInput,
            (newValue) => {
                value.value = newValue;
            }
        );
        return {
            updateValue,
            value,
            convertBirthDay
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
  