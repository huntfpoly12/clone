<template>
    <div class="page-content">
        <a-spin :spinning="false" size="large">
            <div class="content-page1">
                <div class="select-employee">
                    <div class="label">
                        퇴직금 대상 사원
                    </div>
                    <div class="input-select">
                        <!-- <employ-select :arrayValue="arrayEmployeeSelect" :required="true" width="300px"
                            v-model:valueEmploy="valueSelected" @dataAllSelect="onGetDataAllSelect" /> -->
                        <DxSelectBox :noDataText="Message.getMessage('COMMON', '901').message" :width="300"
                            :data-source="arrayEmployeeSelect" placeholder="선택" item-template="item-data"
                            value-expr="employeeId_Type" display-expr="employeeId" :value="valueSelected"
                            field-template="field-data" @value-changed="updateValue" class="custom-select"
                            :dropDownOptions="{ minHeight: '80px' }">
                            <template #field-data="{ data }: any">
                                <div v-if=" data " style="padding-left: 4px">
                                    <employee-info :idEmployee=" data.employeeId " :idCardNumber=" data.residentId "
                                        :name=" data.name " :status=" data.status " :foreigner=" data.foreigner "
                                        :checkStatus=" false " :forDailyUse=" data.type == 20 " />
                                    <DxTextBox style="display: none;" />
                                </div>
                                <div v-else style="padding: 4px; color: rgba(128,128,128,0.7)">
                                    <span>선택</span>
                                    <DxTextBox style="display: none;" />
                                </div>
                            </template>
                            <template #item-data=" { data }: any ">
                                <employee-info :idEmployee=" data.employeeId " :idCardNumber=" data.residentId "
                                    :name=" data.name " :status=" data.status " :foreigner=" data.foreigner "
                                    :checkStatus=" false " :forDailyUse=" data.type == 20 " />
                            </template>
                        </DxSelectBox>
                    </div>
                </div>
            </div>
        </a-spin>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex';
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import { Message } from "@/configs/enum"
export default defineComponent({
    components: {
        DxSelectBox, DxTextBox
    },
    setup() {
        const store = useStore();
        const valueSelected = ref(store.state.common.employeeIdPA410);
        // Getting the token from the session storage and then dispatching the action to get the user
        // information.
        const token = computed(() => sessionStorage.getItem("token"))
        store.dispatch('auth/getUserInfor', token.value);

        // take the employee array and add a null element to test the metric calculation
        const arrayEmployeeSelect = computed(() => {
            var hasItem = store.state.common.arrayEmployeePA410.findIndex((item: any) => item.employeeId == 0);
            if (hasItem == -1) store.state.common.arrayEmployeePA410.push({
                "type": null,
                "employeeId": 0,
                "name": "익명",
            })
            store.state.common.arrayEmployeePA410.map((employ: any) => {
                employ.employeeId_Type = parseInt(employ.employeeId + '' + employ.type)
            })
            return store.state.common.arrayEmployeePA410
        })
        const updateValue = (value: any) => {
            valueSelected.value = value.value
        };

        const nextPage = () => {
            store.commit('common/setEmployeeIdPA410', valueSelected.value)
        }
        return {
            store,
            nextPage,
            arrayEmployeeSelect,
            valueSelected,
            updateValue,
            Message,
        }
    },
})
</script>

<style lang="scss" scoped>
.content-page1 {
    min-height: 300px;
    margin: 0px 50px;

    .select-employee {
        display: flex;
        min-width: 490px;
        justify-content: center;
        align-items: center;
        padding-top: 135px;

        .label {
            font-size: 23px;
            font-weight: bold;
        }

        .input-select {
            padding-left: 10px;

        }
    }

    .button-next {
        margin: 0px 655px;
        width: 60px;
    }

}
</style>
