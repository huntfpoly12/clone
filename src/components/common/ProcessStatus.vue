<template>
    <span v-if="disabled">
        <span v-for="item in arrayRadioManager" :key="item.id">
            <button-basic v-if="(currentBt == item.id as any)" :width="90" :height="heightBtn" :text="item.text" :class="item.class"
                class="buttonModal disabled-button-process">
            </button-basic>
        </span>
    </span>
    <a-popover v-else trigger="click" v-model:visible="showModal" color="#e6e6e6">
        <template #content>
            <div class="mytext">
                <radio-group :arrayValue="userType == 'm' ? arrayRadioManager : arrayRadioUser"
                    v-model:valueRadioCheck="value" :layoutCustom="'horizontal'" />
                <span>으로 변경하시겠습니까?</span>
                <div class="mt-20">
                    <button-basic class="button-form-modal" :text="'아니오'" :type="'normal'" :mode="'contained'"
                        @onClick="setModalVisible" />
                    <button-basic class="button-form-modal" :text="'네, 변경합니다'" :width="140" :type="'default'"
                        :mode="'contained'" @onClick="submit" />
                </div>
            </div>
        </template>
        <span v-for="item in arrayChoose" :key="item.id">
            <button-basic v-if="(currentBt == item.id)" :width="90" :height="heightBtn" :text="item.text" :class="item.class"
                class="buttonModal">
            </button-basic>
        </span>
    </a-popover>
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
        disabled: {
            type: Boolean,
            required: false
        },
        dataRow: {
            type: Object,
            required: false
        },
        heightBtn: {
          type: Number,
          default: 30
        },
        noOptionNoInput: {
            type: Boolean,
            default: true
        },
        arrayChoose: {
          type: Array<any>,
          default: [
            { id: 1, text: '미입력', class: 'noInput' },
            { id: 10, text: '입력중', class: 'entering' },
            { id: 20, text: '입력마감', class: 'input' },
            { id: 30, text: '조정중', class: 'adjusting' },
            { id: 40, text: '조정마감', class: 'adjusted' },
          ]
        }
    },
    setup(props, { emit }) {
        const value = ref(props.valueStatus);
        const currentBt: any = ref(props.valueStatus);
        const showModal = ref(false)
        const arrayRadioUser = ref([
            { id: 1, text: '미입력', class: 'noInput' },
            { id: 10, text: '입력중', class: 'entering' },
            { id: 20, text: '입력마감', class: 'input' },
        ])
        // const arrayRadioManager = ref([
        //     { id: 1, text: '미입력', class: 'noInput' },
        //     { id: 10, text: '입력중', class: 'entering' },
        //     { id: 20, text: '입력마감', class: 'input' },
        //     { id: 30, text: '조정중', class: 'adjusting' },
        //     { id: 40, text: '조정마감', class: 'adjusted' },
        // ])
        const arrayRadioManager: any = ref([])
        if (props.noOptionNoInput) {
            arrayRadioUser.value = arrayRadioUser.value.filter(item => item.id !== 1);
            arrayRadioManager.value = props.arrayChoose.filter(item => item.id !== 1);
        } else {
            arrayRadioManager.value = props.arrayChoose
        }
        const setModalVisible = () => {
            value.value = props.valueStatus
            showModal.value = false;
        };

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
            showModal,
            submit,
            userType,
        }
    },
});
</script>
<style lang="scss" scoped>
.noInput {
  background-color: #7F7F7F !important;
  box-shadow: rgba(0, 0, 0, 0.384) 0px 0px 10px 4px;
  border: 1px solid #7F7F7F;
}
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
    min-width: 300px;
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
.disabled-button-process {
    cursor: no-drop;
}

// :deep .dx-button-text {
//     line-height: inherit;
// }
</style>

