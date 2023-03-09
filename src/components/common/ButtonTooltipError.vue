<template>
    <a-tooltip  :title="textError" color='red' :visible="showError">
      <div>
        <button-basic style="margin: 0px 5px" @onClick="clickButton($event)" mode="contained"
        :type="statusChange ? 'calculate' : 'default'" :text="text" />
      </div>
    </a-tooltip>       
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Message } from "@/configs/enum";
export default defineComponent({
    props: {
        statusChange: {
            type: Boolean,
            default: false
        },
        showError: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false
        },
        textError: {
            type: String,
            default: Message.getMessage('PA110', '001').message
        },
        text:{
            type: String,
            default: '공제 재계산'
        }
    },
    setup(props, { emit }) {
        const statusChange = ref(false)
        const showError = ref(false)
        const setModalVisible = () => {

        };

      const clickButton = (e: any) => {
            emit("onClick", e);
        }

        watch(() => props.statusChange, (valueNew) => {
            statusChange.value = valueNew;
        });

        watch(() => props.showError, (valueNew) => {
            showError.value = valueNew;
        });

        return {
            setModalVisible,
            clickButton,
            showError, statusChange,
        }
    },
});
</script>
<style lang="scss" scoped>
.mytooltip .mytext {
    display: none;
    background-color: #d9534f;
    color: white;
    z-index: 1;
    left: 5px;
    width: max-content;
    bottom: -62px;
    text-align: center;
    border-radius: 5px;
    padding: 7px;
    position: absolute;
}

.mytooltip {
    position: absolute;
}

.show {
    display: block !important;
}
</style>
