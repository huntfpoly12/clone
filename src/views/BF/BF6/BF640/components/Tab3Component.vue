<template>
    <div id="step3">
        <a-row gutter="24" class="search-form-step-1 mt-10">
            <a-col>
                <a-form-item label="신고구분" label-align="left">
                    <electronic-filing-type-common />
                </a-form-item>
            </a-col>
            <a-col>
                <a-form-item label="신고구분" label-align="left">
                    <a-range-picker v-model:value="rangeDate" width="200px"
                        :placeholder="['Start', 'End']" /></a-form-item>
            </a-col>
            <a-col>
                <a-form-item label="신고구분" label-align="left">
                    <div class="mt-7">
                        <DxRadioGroup :data-source="typeCheckbox" item-template="radio" :value="valueType"
                            layout="horizontal" :icon-size="12">
                            <template #radio="{ data }">
                                <production-statuses :typeTag="0" v-if="data == 0" />
                                <production-statuses :typeTag="4" v-if="data == 4" />
                                <production-statuses :typeTag="5" v-if="data == 5" />
                            </template>
                        </DxRadioGroup>
                    </div>
                </a-form-item>
            </a-col>
            <a-col>
                <a-form-item label="매니저리스트" label-align="left" class="fix-width-label">
                    <list-manager-dropdown :required="true" />
                </a-form-item>
            </a-col>
        </a-row>

        <div class="form-table">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                key-expr="companyId" class="mt-10" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true">
                <DxColumn caption="코드명" />
                <DxColumn caption="신고구분" />
                <DxColumn caption="제작요청일시" />
                <DxColumn caption="아이디" />
                <DxColumn caption="제작현황" />
                <DxColumn caption="상세보기" width="80px" cell-template="action" />
                <template #action="{ data }">
                    <img src="@/assets/images/searchPlus.png" style="width: 20px; height: 20px; margin-top: 0px;" />
                </template>
            </DxDataGrid>
        </div>
    </div>
</template>
<script lang="ts">
import dayjs from "dayjs";
import { defineComponent, ref, computed, getCurrentInstance } from "vue";
import { checkBoxSearchStep1, dataSearchUtils } from "../utils";
import {
    SaveOutlined
} from "@ant-design/icons-vue";
import { useStore } from 'vuex'
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling } from "devextreme-vue/data-grid";
import { DxRadioGroup } from 'devextreme-vue/radio-group';
export default defineComponent({
    components: {
        SaveOutlined, DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling, DxRadioGroup
    },
    setup() {
        const app: any = getCurrentInstance()
        const styleCheckBox = app.appContext.config.globalProperties.$config_styles
        let checkBoxSearch = [...checkBoxSearchStep1]
        let valueDefaultCheckbox = ref(1)
        let valueDefaultSwitch = ref(false)
        let dataSearch = ref({ ...dataSearchUtils })
        let typeCheckbox = ref([0, 4, 5])
        let dataSource: any = ref([])
        let valueType = ref(0)
        const store = useStore()
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rangeDate = ref([dayjs().subtract(1, 'year'), dayjs()]);

        return {
            activeKey: ref("1"), valueDefaultCheckbox, valueDefaultSwitch, rangeDate, valueType, styleCheckBox,
            checkBoxSearch, typeCheckbox, dataSearch, dataSource, colomn_resize, move_column,
        }
    }
})
</script> 
<style scoped lang="scss" src="../style/style.scss">

</style>
    
<style lang="scss" scoped>
::v-deep .dx-radiobutton-icon-checked .dx-radiobutton-icon-dot {
    background: v-bind("styleCheckBox.ColorCheckBox");
    margin-top: -13px;
    margin-left: 3px;
}

::v-deep .dx-radiobutton-icon::before {
    border: 1px solid v-bind("styleCheckBox.ColorCheckBox");
    width: 14px;
    height: 14px;
}

::v-deep .dx-radio-value-container {
    padding-right: 0px
}

::v-deep .dx-radiobutton {
    line-height: 18px;
}

::v-deep .dx-radiogroup-horizontal .dx-radiobutton {
    margin-right: 0px;
}
</style>