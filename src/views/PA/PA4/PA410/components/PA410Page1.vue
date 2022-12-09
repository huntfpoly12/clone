<template>
 <div class="page-content">
    <div class="content-page1">
        <div class="select-employee">
            <div class="label">
                퇴직금 대상 사원
            </div>
            <div class="input-select">
                <employ-select :arrayValue="arrayEmploySelect" :required="true" width="300px"/>
            </div>
        </div>
        <div class="button-next">
            <button-basic text="다음" type="default" @onClick="nextPage"/> 
        </div>
    </div>
 </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex';
export default defineComponent({
    components: {
    },
    setup() {
        const store = useStore();
        const nextPage = () => {
            store.state.common.currentPagePA410 = 'PA410Page2';
        }

        const arrayEmploySelect = ref([
            { employeeId: 123, name: 'khiem', idCardNumber: '800101-1100123', status: 0, foreigner: true },
            { employeeId: 456, name: 'khiem 1', idCardNumber: '800101-1100123', status: 0, foreigner: false },
            { employeeId: 789, name: 'khiem 3', idCardNumber: '800101-1100123', status: 1, foreigner: true },
        ])
        return {
            nextPage,
            arrayEmploySelect
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
