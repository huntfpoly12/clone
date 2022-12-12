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
import { companyId,openTab } from "@/helpers/commonFunction";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
export default defineComponent({
    components: {
    },
    setup() {
        const store = useStore();
        const router = useRouter()
        const valueSelected = ref(0);
        const isSelected = ref(true);
 ;
        const nextPage = () => {
            // store.state.common.currentPagePA410 = 'PA410Page2';
            // store.state.common.employeeIdPA410 = valueSelected.value;
            openTab({ name: "일용직사원등록", url: "/dashboard/pa-520", id: "pa-520" })
            // store.state.common.activeTab = { name: "일용직사원등록", url: "/dashboard/pa-520", id: "pa-520" }
            // store.state.common.menuTab.push({ name: "일용직사원등록", url: "/dashboard/pa-520", id: "pa-520" })
            // router.push("/dashboard/pa-520");
        }
        watch(valueSelected, (newValue) => {
            isSelected.value = newValue !== 0 ? false : true;
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
