<template>
 <div class="page-content">
    <a-spin :spinning="false" size="large">
        <div class="content-page1">
                <div class="select-employee">
                    <div class="label">
                        퇴직금 대상 사원
                    </div>
                    <div class="input-select">
                        <employ-select :arrayValue="arrayEmployeeSelect" :required="true" width="300px" v-model:valueEmploy="valueSelected"/>
                    </div>
                </div>
                <div class="button-next">
                    <button-basic text="다음" type="default" @onClick="nextPage" :disabled="isSelected"/> 
                </div>
        
        </div>
    </a-spin>
 </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'

import { companyId } from "@/helpers/commonFunction";
import { useStore } from 'vuex';
export default defineComponent({
    components: {
    },
    setup() {
        const store = useStore();
        store.dispatch('auth/getUserInfor')
        const valueSelected = ref(0);
        const isSelected = ref(true);
        const globalYear = computed(() => store.state.settings.globalYear);
        const nextPage = () => {
            store.state.common.currentPagePA410 = 'PA410Page2';
            store.state.common.employeeIdPA410 = valueSelected.value;
        }
        watch(valueSelected, (newValue) => {
            isSelected.value = newValue !== 0 ? false : true;
        })
        store.dispatch('common/getListEmployee', {
            companyId: companyId,
            imputedYear: globalYear,
        })
        const arrayEmployeeSelect = ref(store.state.common.arrayEmployeePA410)
        return {
            nextPage,
            arrayEmployeeSelect,
            valueSelected,
            isSelected
        }
    },
})
</script>

<style lang="scss" scoped>
    .content-page1{
        border: dashed;
        border-width: 2px;
        height: 400px;
        display: block;
        margin: 100px 50px;
        border-radius: 50px;
        border-color: #385D8A;
      
        .select-employee{
            display: flex;
            margin: 160px 480px;
            .label{
                font-size: 23px;
                font-weight: bold;
            }
            .input-select{
                padding-left: 10px;
            }
        }

        .button-next{
            margin: 0px 655px;
        }

    }

</style>
