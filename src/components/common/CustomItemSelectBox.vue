<template>
    <DxSelectBox :search-enabled="true" :width="width" :data-source="selectBoxData" :show-clear-button="clearButton"
        v-model:value="value" :read-only="readOnly" display-expr="value" value-expr="id" :disabled="disabled"  
        :accept-custom-value="true" @custom-item-creating="customItemCreating"
        @value-changed="updateValue(value)" :height="$config_styles.HeightInput" :name="nameInput">
        <DxValidator :name="nameInput">
            <DxRequiredRule v-if="required" :message="messageRequired" />
        </DxValidator>
    </DxSelectBox>
</template>
<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxSelectBox from "devextreme-vue/select-box";
import DataSource from "devextreme/data/data_source";
export default defineComponent({
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
            type: Number,
            default: "",
        },
        readOnly: Boolean,
        arrSelect: Array,
        nameInput: {
            type: String,
            default: '',
        },
    },
    components: {
        DxSelectBox,
        DxValidator,
        DxRequiredRule,
    },
    setup(props, { emit }) {
        const app: any = getCurrentInstance();
        const messages = app.appContext.config.globalProperties.$messages;
        const messageRequired = ref(messages.getCommonMessage('102').message);
        if (props.messRequired != "") {
            messageRequired.value = props.messRequired;
        }
        const value = ref(props.valueInput);

        watch(
            () => props.valueInput,
            (newValue) => {
                value.value = newValue;
            }
        );
        const updateValue = (value: any) => {
            emit("update:valueInput", value);
        };
        const selectBoxData = new DataSource({
            store: props.arrSelect,
            key: "id"
        });

        const customItemCreating = (e:any)=>{
            // Generates a new 'id'
            let nextId;
            console.log(selectBoxData.store().totalCount({}));
            
            selectBoxData.store().totalCount({}).then((count : any) => { nextId = count + 1});
            // Creates a new entry
            e.customItem = { id: nextId, value: e.text };
            // Adds the entry to the data source
            selectBoxData.store().insert(e.customItem);
            // Reloads the data source
            selectBoxData.reload();
        }
        return {
            value,
            updateValue,
            messageRequired,
            customItemCreating,
            selectBoxData
        };
    },
});
</script>
