<template>
 <div class="page-content">
    <a-spin :spinning="loading" size="large">
        <div class="content-page1">
            
                <div class="select-employee">
                    <div class="label">
                        퇴직금 대상 사원
                    </div>
                    <div class="input-select">
                        <employ-select :arrayValue="arrayEmployeeSelect" :required="true" width="300px"/>
                    </div>
                </div>
                <div class="button-next">
                    <button-basic text="다음" type="default" @onClick="nextPage"/> 
                </div>
        
        </div>
    </a-spin>
 </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useQuery, useMutation } from "@vue/apollo-composable";
import { companyId } from "@/helpers/commonFunction";
import { useStore } from 'vuex';
import queries from "@/graphql/queries/PA/PA1/PA120/index";
import notification from "@/utils/notification";
export default defineComponent({
    components: {
    },
    setup() {
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear);
        const nextPage = () => {
            store.state.common.currentPagePA410 = 'PA410Page2';
        }
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear,
        });
        const {
            refetch: refetchData,
            onError: errorEmployeeWages,
            result,
            loading,
        } = useQuery(queries.getEmployeeWages, originData, () => ({
            fetchPolicy: "no-cache",
        }));
        errorEmployeeWages(e => {
            notification('error', e.message)
        })
 
        watch(result, (value) => {
            if (value) {
     
           
            }
        });
        const arrayEmployeeSelect = ref([
            { employeeId: 123, name: 'khiem', idCardNumber: '800101-1100123', status: 0, foreigner: true },
            { employeeId: 456, name: 'khiem 1', idCardNumber: '800101-1100123', status: 0, foreigner: false },
            { employeeId: 789, name: 'khiem 3', idCardNumber: '800101-1100123', status: 1, foreigner: true },
        ])
        return {
            nextPage,
            loading,
            arrayEmployeeSelect
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
