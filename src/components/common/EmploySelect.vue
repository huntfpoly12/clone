<template>
    <DxSelectBox :width="width" :data-source="arrayValue" placeholder="선택" item-template="item-data"
        value-expr="employeeId" display-expr="employeeId"
        :value="valueEmploy"
        field-template="field-data" @value-changed="updateValue" @change="eventItemClick"
        :height="$config_styles.HeightInput" :disabled="disabled">
        <template #field-data="{ data }">
            <div v-if="data" style="padding: 4px">
                <span :class="[{ 'display-none': !data.employeeId }, 'style-Id']">
                    {{ data.employeeId }}
                </span>
                <span>{{ data.name }}</span>
                <span
                    v-if="data.idCardNumber?.length == 14
                    && parseInt(data.idCardNumber.split('-')[0].slice(2, 4)) < 13 && parseInt(data.idCardNumber.split('-')[0].slice(4, 6)) < 32">
                    {{ convertBirthDay(data.idCardNumber) }}
                </span>
                <span class="tag-status" v-if="data.status == 0">퇴</span>
                <span class="tag-foreigner" v-if="data.foreigner == true">외</span>
                <span class="tag-type-20" v-if="data.type == 20">일용</span>
                <DxTextBox style="display: none;" />
            </div>
            <div v-else style="padding: 4px">
                <span>선택</span>
                <DxTextBox style="display: none;" />
            </div>
        </template>
        <template #item-data="{ data }">
            <span :class="[{ 'display-none': !data.employeeId }, 'style-Id']">
                {{ data.employeeId }}
            </span>
            <span>{{ data.name }}</span>
            <span
                v-if="data.idCardNumber?.length == 14
                && parseInt(data.idCardNumber.split('-')[0].slice(2, 4)) < 13 && parseInt(data.idCardNumber.split('-')[0].slice(4, 6)) < 32">
                {{ convertBirthDay(data.idCardNumber) }}
            </span>
            <span class="tag-status" v-if="data.status == 0">퇴</span>
            <span class="tag-foreigner" v-if="data.foreigner == true">외</span>
            <span class="tag-type-20" v-if="data.type == 20">일용</span>
        </template>
    </DxSelectBox>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";

export default defineComponent({
    props: {
        width: String,
        disabled: Boolean,
        valueEmploy: {
            type: Number,
            default: "",
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
        const valueEmploy = ref(props.valueEmploy);

        const updateValue = (value: any) => {
            emit("update:valueEmploy", value.value);
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
                valueEmploy.value = newValue;
            }
        );

        const eventItemClick = () => {
            console.log('xxxxxxxx');
            
        }
        return {
            updateValue,
            valueEmploy,
            convertBirthDay,
            eventItemClick
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
</style>
  