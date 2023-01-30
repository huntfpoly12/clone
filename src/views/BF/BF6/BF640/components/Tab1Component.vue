<template>
    <div id="step1">
        <div class="search-form">
            <a-row gutter="24">
                <a-col span="12">
                    <a-form-item label="귀속연도" label-align="left" class="clr mb-0 label-select">
                        <year-picker-box-custom v-model:valueDate="month1" width="65px" class="mr-5 ml-5" />
                    </a-form-item>

                    <a-form-item label="제출대상구분" label-align="left" class="clr mb-0 label-select">
                        <radio-group :arrayValue="checkBoxSearch" />
                    </a-form-item>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { defineComponent, ref } from "vue";
export default defineComponent({
    components: {},
    setup() {
        let month1 = ref(dayjs().format('YYYY'))
        let checkBoxSearch = [{ id: 0, text: 'Low' },
        { id: 1, text: 'Normal' },
        { id: 2, text: 'Urgent' },
        { id: 3, text: 'High' }]
        return {
            activeKey: ref("1"),
            month1, dayjs, checkBoxSearch
        }
    }
})
</script> 
<style scoped lang="scss" src="../style/style.scss">

</style>