<template>
    <div id="step2">
        <a-row gutter="24" class="search-form-step-1 mt-10">
            <a-col>
                <a-form-item label="신고구분" label-align="left">
                    <electronic-filing-type :disabled="true" v-model:valueInput="dataSearch.type" />
                </a-form-item>
            </a-col>
            <a-col>
                <a-form-item label="제작요청일(기간)" label-align="left">
                    <range-date-time-box v-model:valueDate="rangeDate" width="250px" :maxRange="365"
                        :multi-calendars="true" />
                </a-form-item>
            </a-col>
            <a-col>
                <a-form-item label="제작상태" label-align="left">
                    <div class="mt-7">
                        <DxRadioGroup :data-source="typeCheckbox" item-template="radio" v-model:value="typeStatus"
                            layout="horizontal" :icon-size="12">
                            <template #radio="{ data }">
                                <production-status :typeTag="0" v-if="data == 0" padding="0px 10px" />
                                <production-status :typeTag="4" v-if="data == 2" padding="1px 10px" />
                                <production-status :typeTag="5" v-if="data == -1" padding="1px 10px" />
                            </template>
                        </DxRadioGroup>
                    </div>
                </a-form-item>
            </a-col>
            <a-col>
                <a-form-item label="매니저리스트" label-align="left" class="fix-width-label">
                    <list-manager-dropdown :required="true" v-model:valueInput="dataSearch.manageUserId" />
                </a-form-item>
            </a-col>
        </a-row>
        <div class="form-table">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                key-expr="electronicFilingId" class="mt-10" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true">
                <DxColumn caption="일련번호" data-field="electronicFilingId" data-type="string" />
                <DxColumn caption="신고유형/주기" data-field="reportType" data-type="string" />
                <DxColumn caption="제작요청일시" data-field="productionRequestedAt" data-type="date" format="yyyy-MM-dd hh:mm" />
                <DxColumn caption="아이디" data-field="productionRequestUserId" data-type="string" />
                <DxColumn caption="제작현황" data-field="productionStatus" cell-template="productionStatus"
                    data-type="string" />
                <template #productionStatus="{ data }">
                    <a-tooltip placement="top" color="black" v-if="data.value == 2">
                        <template #title>전자신고파일 다운로드</template>
                        <span><production-status :typeTag="4" padding="1px 10px" /></span>
                    </a-tooltip>
                    <a-tooltip placement="top" color="black" v-if="data.value == -1">
                        <template #title>{{ data.data.causeOfProductionFailure }}</template>
                        <span><production-status :typeTag="5" padding="1px 10px" /></span>
                    </a-tooltip>
                    <!-- <production-status :typeTag="4" v-if="data.value == 2" padding="1px 10px" />
                    <production-status :typeTag="5" v-if="data.value == -1" padding="1px 10px" /> -->
                </template>
                <DxColumn caption="상세보기" width="80px" cell-template="action" />
                <template #action="{ data }">
                    <div style="text-align: center">
                        <img src="@/assets/images/searchPlus.png" style="width: 20px; height: 20px; margin-top: 0px;"
                            @click="openPopupDetail(data.data)" />
                    </div>
                </template>
            </DxDataGrid>
        </div>
    </div>
    <ElectronicFilingFileProductions :modalStatus="modalDetail" @closePopup="modalDetail = false" :data="dataModalDetail" />
</template>
<script lang="ts">
import dayjs from "dayjs";
import { defineComponent, ref, computed, getCurrentInstance, watch } from "vue";
import { dataSearchStep2Utils } from "../utils";
import { SaveOutlined } from "@ant-design/icons-vue";
import { useStore } from 'vuex'
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling } from "devextreme-vue/data-grid";
import { DxRadioGroup } from 'devextreme-vue/radio-group';
import queries from "@/graphql/queries/BF/BF6/BF650/index";
import { useQuery } from "@vue/apollo-composable";
import notification from "@/utils/notification"
import ElectronicFilingFileProductions from "./ElectronicFilingFileProductions.vue";
export default defineComponent({
    components: {
        SaveOutlined, DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling, DxRadioGroup,
        ElectronicFilingFileProductions
    },
    props: {
        searchStep: Number,
    },
    setup(props) {
        let modalDetail = ref(false)
        let typeStatus = ref(0)
        const app: any = getCurrentInstance()
        const styleCheckBox = app.appContext.config.globalProperties.$config_styles
        let dataSearch = ref({ ...dataSearchStep2Utils })
        let typeCheckbox = ref([0, 2, -1])
        let dataSource: any = ref([])
        const store = useStore()
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rangeDate: any = ref([dayjs().subtract(7, 'day'), dayjs()]);
        let trigger = ref(true)
        let dataModalDetail: any = ref({})
        // ================== GRAPHQL=================
        //  QUERY : searchElectronicFilingFileProductions
        let {
            refetch: refetchTable,
            loading: loadingTable,
            onError: errorTable,
            onResult: resTable
        } = useQuery(queries.searchElectronicFilingFileProductions, { filter: dataSearch.value }, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache"
        }));
        resTable((val: any) => {
            dataSource.value = val.data.searchElectronicFilingFileProductions
            dataModalDetail.value.type = dataSearch.value.type
            trigger.value = false
        })
        errorTable((error: any) => {
            notification('error', error.message)
        })
        // ================= WATHCH ===================
        watch(() => props.searchStep, (val: any) => {
            if (typeStatus.value == 0)
                dataSearch.value.productionStatuses = [2, -1]
            else
                dataSearch.value.productionStatuses = [typeStatus.value]
            dataSearch.value.requesteStartDate = parseInt(dayjs(rangeDate.value[0].$d).format('YYYYMMDD'))
            dataSearch.value.requesteFinishDate = parseInt(dayjs(rangeDate.value[1].$d).format('YYYYMMDD'))
            if (dataSearch.value) {
                trigger.value = true
                refetchTable()
            }
        }, { deep: true })
        // ============== FUNCTION =====================
        const openPopupDetail = (data: any) => {
            dataModalDetail.value.electronicFilingId = data.electronicFilingId
            modalDetail.value = true
        }
        return {
            dataModalDetail, typeStatus,
            rangeDate, styleCheckBox,
            typeCheckbox, dataSearch, dataSource, colomn_resize, move_column, modalDetail,
            openPopupDetail,
        }
    }
})
</script> 
<style scoped lang="scss" src="../style/style.scss"></style>
<style lang="scss" scoped>
:deep .dx-radiobutton-icon-checked .dx-radiobutton-icon-dot {
    background: v-bind("styleCheckBox.ColorCheckBox");
    margin-top: -13px;
    margin-left: 3px;
}

:deep .dx-radiobutton-icon::before {
    border: 1px solid v-bind("styleCheckBox.ColorCheckBox");
    width: 14px;
    height: 14px;
}

:deep .dx-radio-value-container {
    padding-right: 0px
}

:deep .dx-radiobutton {
    line-height: 18px;
}

:deep .dx-radiogroup-horizontal .dx-radiobutton {
    margin-right: 0px;
}</style> 
