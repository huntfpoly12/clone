<template>
    <a-select v-model:value="value" :options="options" style="width: 250px" @change="handleChange" placeholder="선택"/>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup(props, { emit }) {
        let value = ref()
        let options = ref([
            {
                value: 1,
                label: '원천세(원천징수이행상황신고서)'
            },
            {
                value: 2,
                label: '지방소득세',
            },
            {
                label: '지급명세서(연말정산)',
                options: [
                    {
                        value: 3,
                        label: '근로소득지급명세서',
                    },
                    {
                        value: 4,
                        label: '퇴직소득지급명세서',
                    },
                    {
                        value: 5,
                        label: '거주자기타소득지급명세서',
                    },
                    {
                        value: 6,
                        label: '거주자사업소득지급명세서',
                    },
                ],
            },
            {
                label: '간이지급명세서',
                options: [
                    {
                        value: 7,
                        label: '근로소득간이지급명세서',
                    },
                    {
                        value: 8,
                        label: '거주자사업소득간이지급명세서',
                    },
                    {
                        value: 9,
                        label: '일용직근로소득지급명세서',
                    },
                ],
            },
        ])


        const handleChange = (val: any) => {

        }
        return {
            options,
            value, handleChange

        }
    }
})
</script>