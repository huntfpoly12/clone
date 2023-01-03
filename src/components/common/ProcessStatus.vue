<template>
    <a-tooltip placement="top" key="black" @visibleChange="visibleChange">
        <template #title>
            <radio-group :arrayValue="userType == 'm' ? arrayRadioManager : arrayRadioUser"
                v-model:valueRadioCheck="value" :layoutCustom="'horizontal'" />
            <span>으로 변경하시겠습니까?</span>
            <div class="mt-20 d-flex-center">
                <button-basic class="button-form-modal" :text="'아니오'" :type="'default'" :mode="'outlined'"
                    @onClick="setModalVisible" />
                <button-basic class="button-form-modal ml-5" :text="'네, 변경합니다.'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="submit" />
            </div>
        </template>
        <div v-for="item in arrayRadioManager" :key="item.id">
            <button-basic v-if="(currentBt == item.id)" :width="100" :text="item.text" :class="item.class"
                class="buttonModal" @onClick="clickButton"></button-basic>
        </div>
    </a-tooltip>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { userType } from "@/helpers/commonFunction";
export default defineComponent({
    props: {
        valueStatus: {
            type: Number,
            required: true
        },
        dataRow: {
            type: Object
        },
    },
    setup(props, { emit }) {
        const value = ref(props.valueStatus);
        const currentBt = ref(props.valueStatus);
        const showModal = ref(false)
        const arrayRadioUser = ref([
            { id: 10, text: '입력중', class: 'entering' },
            { id: 20, text: '입력마감', class: 'input' },
        ])
        const arrayRadioManager = ref([
            { id: 10, text: '입력중', class: 'entering' },
            { id: 20, text: '입력마감', class: 'input' },
            { id: 30, text: '조정중', class: 'adjusting' },
            { id: 40, text: '조정마감', class: 'adjusted' },
        ])
        const setModalVisible = () => {
            value.value = props.valueStatus
            showModal.value = false;
        };
        const clickButton = () => {
            showModal.value = true;
        }
        const submit = () => {
            showModal.value = false;
            currentBt.value = value.value
            emit("update:valueStatus", value.value);
            emit("checkConfirm", true)
            emit("dataRow", props.dataRow);
        }
        const visibleChange = (data: any) => {
            // tooltip open
            if (data == true)
                value.value = props.valueStatus
        }
        watch(
            () => props.valueStatus,
            (valueNew) => {
                value.value = valueNew
                currentBt.value = valueNew
            }
        );
        return {
            value,
            currentBt,
            arrayRadioUser,
            arrayRadioManager,
            setModalVisible,
            clickButton, visibleChange,
            showModal,
            submit,
            userType
        }
    },
});
</script>
<style lang="scss" scoped>
.entering {
    background-color: #346CB0;
    box-shadow: rgba(0, 0, 0, 0.384) 0px 0px 10px 0px;
    border: 1px solid #4A7EBB;
}

.input {
    background-color: #376092;
    border: 3px solid #558ED5 !important;
}

.adjusting {
    background-color: #BB3835;
    box-shadow: rgba(0, 0, 0, 0.384) 0px 0px 10px 4px;
    border: 1px solid #BE4B48 !important;
}

.adjusted {
    background-color: #C00000;
    border: 3px solid #953735 !important;
}

.show {
    display: block !important;
}

.buttonModal {
    color: white;
    border: none;
    border-radius: 6px;
}

::v-deep .dx-button-text {
    line-height: inherit;
}

::v-deep .dx-item-content,
::v-deep .dx-button-text {
    color: white;
}

::v-deep .dx-button-mode-outlined {
    border: 1px solid white !important;
}
</style> 
