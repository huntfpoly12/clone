<template>
    <div id="step3">
        <a-row gutter="24" class="search-form-step-1 mt-10">
            <a-col>
                <a-form-item label="신고구분" label-align="left">
                    <list-manager-dropdown :required="true" />
                </a-form-item>
            </a-col>
            <a-col>
                <a-form-item label="신고구분" label-align="left">
                    <a-range-picker v-model:value="rangeDate" width="200px"
                        :placeholder="['Start', 'End']" /></a-form-item>
            </a-col>
            <a-col>
                <production-statuses :typeTag="1" />
            </a-col>
        </a-row>

        <div class="form-table">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                key-expr="companyId" class="mt-10" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true">
                <DxSelection mode="multiple" :fixed="true" />
                <DxColumn caption="사업자코드" />
                <DxColumn caption="상호 주소" />
                <DxColumn caption="사업자등록번호" />
                <DxColumn caption="최종제작요청일시" />
                <DxColumn caption="제작현황" />
            </DxDataGrid>
        </div>
    </div>
</template>
<script lang="ts">
import dayjs from "dayjs";
import { defineComponent, ref, computed } from "vue";
import { checkBoxSearchStep1, dataSearchUtils } from "../utils";
import {
    SaveOutlined
} from "@ant-design/icons-vue";
import { useStore } from 'vuex'
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling } from "devextreme-vue/data-grid";
export default defineComponent({
    components: {
        SaveOutlined, DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling,
    },
    setup() {
        let checkBoxSearch = [...checkBoxSearchStep1]
        let valueDefaultCheckbox = ref(1)
        let valueDefaultSwitch = ref(false)
        let dataSearch = ref({ ...dataSearchUtils })
        let typeCheckbox = ref({
            checkbox1: true,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
        })
        let dataSource: any = ref([])
        const store = useStore()
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);

        let modalConfirmMail = ref(false)
        const rangeDate = ref([dayjs().subtract(1, 'year'), dayjs()]);

        return {
            activeKey: ref("1"), valueDefaultCheckbox, valueDefaultSwitch, rangeDate,
            dayjs, checkBoxSearch, typeCheckbox, dataSearch, dataSource, colomn_resize, move_column, modalConfirmMail
        }
    }
})
</script> 
<style scoped lang="scss" src="../style/style.scss">

</style>