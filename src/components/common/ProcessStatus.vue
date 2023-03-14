<template>
    <!-- <div style="display: inline-block;" v-click-outside="setModalVisible">
        <div class="mytooltip">
            <div class="mytext" :class="showModal ? 'show' : ''">
                <radio-group :arrayValue="userType == 'm' ? arrayRadioManager : arrayRadioUser"
                    v-model:valueRadioCheck="value" :layoutCustom="'horizontal'" />
                <span>으로 변경하시겠습니까?</span>
                <div class="mt-20">
                    <button-basic class="button-form-modal" :text="'아니오'" :type="'normal'" :mode="'contained'"
                        @onClick="setModalVisible" />
                    <button-basic class="button-form-modal" :text="'네, 변경합니다.'" :width="140" :type="'default'"
                        :mode="'contained'" @onClick="submit" />
                </div>
            </div>
        </div>
        <div v-for="item in arrayRadioManager" :key="item.id">
            <button-basic v-if="(currentBt == item.id)" :width="100" :text="item.text" :class="item.class"
                class="buttonModal" @onClick="(disabled || managerGrade == 3) ? '' : clickButton()">
            </button-basic>
        </div>
    </div> -->
    <a-popover trigger="click" v-model:visible="showModal">
        <template #content>
            <div class="mytext">
                <radio-group :arrayValue="userType == 'm' ? arrayRadioManager : arrayRadioUser"
                    v-model:valueRadioCheck="value" :layoutCustom="'horizontal'" />
                <span>으로 변경하시겠습니까?</span>
                <div class="mt-20">
                    <button-basic class="button-form-modal" :text="'아니오'" :type="'normal'" :mode="'contained'"
                        @onClick="setModalVisible" />
                    <button-basic class="button-form-modal" :text="'네, 변경합니다.'" :width="140" :type="'default'"
                        :mode="'contained'" @onClick="submit" />
                </div>
            </div>
        </template>
        <div v-for="item in arrayRadioManager" :key="item.id" style="display: inline-block;">
            <button-basic v-if="(currentBt == item.id)" :width="100" :text="item.text" :class="item.class"
                class="buttonModal" @onClick="(disabled || managerGrade == 3) ? '' : clickButton()">
            </button-basic>
        </div>
    </a-popover>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { managerGrade, userType } from "@/helpers/commonFunction";
export default defineComponent({
    props: {
        valueStatus: {
            type: Number,
            required: true
        },
        disabled: {
            type: Boolean,
            required: false
        },
        dataRow: {
            type: Array,
            required: false
        }
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
            // if(props.valueStatus && props.valueStatus <= 20) {
            showModal.value = true;
            // }
        }

        const submit = () => {
            showModal.value = false;
            currentBt.value = value.value
            emit("update:valueStatus", value.value);
            emit("checkConfirmRowTable", {
                ...props.dataRow,
                'status': value.value
            });
            emit("checkConfirm", true)

        }
        watch(() => props.valueStatus, (valueNew) => {
            value.value = valueNew
            currentBt.value = valueNew
        }
        );
        watch(() => showModal.value, (valueNew) => {
            value.value = props.valueStatus
        }
        );
        return {
            value,
            currentBt,
            arrayRadioUser,
            arrayRadioManager,
            setModalVisible,
            clickButton,
            showModal,
            submit,
            userType,
            managerGrade,
        }
    },
});
</script>
<style lang="scss" scoped>
.entering {
    background-color: #346CB0 !important;
    box-shadow: rgba(0, 0, 0, 0.384) 0px 0px 10px 4px;
    border: 1px solid #4A7EBB;
}

.input {
    background-color: #376092 !important;
    border: 3px solid #558ED5 !important;
}

.adjusting {
    background-color: #BB3835 !important;
    box-shadow: rgba(0, 0, 0, 0.384) 0px 0px 10px 4px;
    border: 1px solid #BE4B48 !important;
}

.adjusted {
    background-color: #C00000 !important;
    border: 3px solid #953735 !important;
}

.mytext {
    width: 300px;
    text-align: center;
    padding: 5px;
}

.button-form-modal {
    margin: 0px 5px;
}

:deep .dx-widget.dx-collection {
    justify-content: center;
}

.buttonModal {
    color: white;
    border: none;
    border-radius: 6px;
}

:deep .dx-button-text {
    line-height: inherit;
}
</style>
    
    