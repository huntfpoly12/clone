<template> 
    <DxSelectBox 
      :height="$config_styles.HeightInput" 
      :name="nameInput" 
      placeholder="선택 또는 직접입력"
      :search-enabled="false"
      :width="width" 
      :data-source="selectBoxData" 
      :show-clear-button="clearButton"
      v-model:value="value" 
      :read-only="readOnly" 
      display-expr="value" 
      value-expr="value" 
      :disabled="disabled"
      :accept-custom-value="customValue" 
      @custom-item-creating="customItemCreating" 
      @contentReady="onContentReady"
      @value-changed="updateValue($event ,value)" 
      >
        <DxValidator :name="nameInput">
            <DxRequiredRule v-if="required" :message="messageRequired" />
        </DxValidator>
    </DxSelectBox>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance, nextTick  } from "vue";
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
            type: [Number, String],
            default: 0,
        },
        readOnly: Boolean,
        arrSelect: Array,
        nameInput: {
            type: String,
            default: '',
        },
        id :{
            type: [Number, String],
            default: '',
        }
    },
    components: {
        DxSelectBox,
        DxValidator,
        DxRequiredRule,
    },
    setup(props, { emit }) {
        const isValidValue = ref<Boolean>(true);
        const selectBoxData = new DataSource({
            store: [
                { id: 1, value: "직접입력" },
            ],
            key: "id"
        });
        
        const app: any = getCurrentInstance();
        const messages = app.appContext.config.globalProperties.$messages;
        const messageRequired = ref(messages.getCommonMessage('102').message);
        if (props.messRequired != "") {
            messageRequired.value = props.messRequired;
        }

        const value = ref(props.valueInput);
        const customValue = ref(false);
        const newSelect = ref<any[]>([]);
    
        const updateValue = (e: any, val: any) => {
            if (val === '') {
                customValue.value = false;
            }
            if(val=="직접입력"){
                customValue.value = true;
                let ele = e.element.children[0].children[1].children[0].children[0];
                ele.focus();
                ele.select();
            } else {
              emit("update:valueInput", val);
            }
        };
        const arrSelectSource = ref<any[]>(props.arrSelect??[]);
        
        const customItemCreating = (e: any) => {
            let nextId;
          selectBoxData.store().totalCount({}).then((count: any) => { nextId = count + 1 });
            alert()
            if(e.text.trim() == "" && e.text == "직접입력"){
                customValue.value = false;
                return;
            }
            e.customItem = { id: nextId, value: e.text };
            const newItem = {
                id: nextId,
                value: e.text,
            };
            // Adds the entry to the data source
            selectBoxData.store().insert(e.customItem);
            // Reloads the data source
            selectBoxData.reload();
            newSelect.value.push(newItem)
            arrSelectSource.value.push(newItem)
            customValue.value = false;
        }
        watch(
            () => props.valueInput,
            (newValue) => {
                value.value = newValue;
            }
        );
        watch(
            () => props.arrSelect,
            (newValue) => {
                if (newValue)
                    newValue.map(v => {
                        selectBoxData.store().insert(v)
                    });
                    arrSelectSource.value = newValue ?? [];

            }
        );
        const isRunOnce = ref(true);
        const onContentReady = (e:any) => {
            if(e.component._changedValue=="직접입력" && isRunOnce.value){
                isRunOnce.value=false;
                let ele = e.element.children[0].children[1].children[0].children[0];
                ele.focus();
                ele.select();
            }
        };
        
        return {
            isValidValue,
            value,
            customValue,
            updateValue,
            messageRequired,
            customItemCreating,
            selectBoxData,
            onContentReady,
        
        };
    },
});
</script>

