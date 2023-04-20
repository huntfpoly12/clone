<template>
    <DxSelectBox :width="width" :data-source="dataSource" placeholder="선택"
        :show-clear-button="clearButton" v-model:value="value" :read-only="readOnly" display-expr="label" value-expr="value"
        :disabled="disabled" @value-changed="updateValue(value)" :height="$config_styles.HeightInput" :name="nameInput">
        <DxValidator :name="nameInput">
            <DxRequiredRule v-if="required" :message="messageRequired" />
        </DxValidator>
    </DxSelectBox>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { ref, watch, getCurrentInstance, computed } from "vue";
import queries from "@/graphql/queries/AC/AC6/AC610/index";
import { useQuery } from "@vue/apollo-composable";
import { companyId } from "@/helpers/commonFunction";
import DxSelectBox from "devextreme-vue/select-box";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
export default {
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
            default: "",
        },
        readOnly: Boolean,
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
    setup(props: any, { emit }: any) {
        const store = useStore();
        const app: any = getCurrentInstance();
        const messages = app.appContext.config.globalProperties.$messages;
        const messageRequired = ref(messages.getCommonMessage('102').message);
        if (props.messRequired != "") {
            messageRequired.value = props.messRequired;
        }
        const value = ref(props.valueInput);
        const dataFilter = ref({
            rows: 10000,
            includeNonUse: false,
        });
        const trigger = ref<boolean>(true); // trigger for call api
        const dataSource = ref([]); // data source of grid
        // get list client
        const {
            refetch: refetchData,
            loading,
            onResult: responseListClient,
        } = useQuery(
            queries.searchClients, {
            companyId: companyId,
            filter: dataFilter.value,
        }, () => ({
            fetchPolicy: "no-cache",
            enabled: trigger.value,
        })
        );

        responseListClient((res) => {
            trigger.value = false;
            dataSource.value = res.data.searchClients.datas.map((value: any) => {
                return {
                    value: value.clientId,
                    label: value.name,
                }
            })
            store.commit('settings/setClients', dataSource.value)
        });
        const updateValue = (value: any) => {
            emit("update:valueInput", value);
        };

        watch(
            () => props.valueInput,
            (newValue) => {
                value.value = newValue;
            }
        );
        return {
            messageRequired,
            dataSource,
            updateValue,
            value,
        };
    },
};
</script>
  
<style scoped>
.form-group {
    margin-top: 30px;
}
</style>
  