<template>
    <a-spin :spinning="loading" size="large">
        <action-header title="" @actionSearch="searching" />
        <div id="pa-230">
            <div class="search-form">
                <a-row>
                    <a-col :span="12">
                        <a-row :gutter="[24, 8]">
                            <a-col>
                                <div class="dflex custom-flex">
                                    <label class="lable-item">구분 :</label>
                                    <radio-group :arrayValue="radioCheckDataSearch" v-model:valueRadioCheck="testValue1"
                                        :layoutCustom="'horizontal'" style="margin: 6px 20px 0px 0px" />
                                </div>
                            </a-col>
                            <a-col>
                                <div class="dflex custom-flex global-year">
                                    <label class="lable-item">귀속연도 :</label>
                                    <a-tag color="#a3a2a0">귀 {{ globalYear }}</a-tag>
                                </div>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="12">
                        <div class="d-flex-center" style="justify-content: flex-end;">
                            <img src="@/assets/images/email.svg" alt="" height="30" class="mail-230"
                                @click="sendMail('mail')" />
                            <img src="@/assets/images/print.svg" alt="" height="28" class="group-mail-230 ml-5"
                                @click="sendMail('groupMail')" />
                        </div>
                    </a-col>
                </a-row>
            </div>
            <div class="page-content">
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="휴대폰" class="red">
                            <div class="format-settings-text">
                                <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
                                <span class="style-note">본 설정으로 적용된 서식으로 출력 및
                                    메일발송 됩니다.</span>
                            </div>
                        </a-form-item>
                        <div class="tax-select">
                            <radio-group :arrayValue="radioCheckData" v-model:valueRadioCheck="testValue2" />
                        </div>
                    </a-col>
                    <a-col :span="12">
                        <div class="created-date">
                            <label class="lable-item">구분 :</label>
                            <date-time-box width="150px"></date-time-box>
                        </div>
                    </a-col>
                </a-row>

                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" key-expr="employeeId" @exporting="onExporting"
                    :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                    :column-auto-width="true">
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                    <DxExport :enabled="true" :allow-export-selected-data="true" />
                    <DxToolbar>
                        <DxItem name="searchPanel" />
                        <DxItem name="exportButton" />
                        <DxItem name="groupPanel" />
                        <DxItem name="addRowButton" show-text="always" />
                        <DxItem name="columnChooserButton" />
                    </DxToolbar>
                    <DxColumn caption="성명" />
                    <DxColumn caption="주민등록번호" />
                    <DxColumn caption="비고" />
                    <DxColumn caption="구분" />
                    <DxColumn caption="총급여계" />
                    <DxColumn caption="징수세액계 (소득세/지방소득세)" />
                    <DxColumn caption="비과세소득계 (작성O)" />
                    <DxColumn caption="비과세소득계 (작성X)" />
                    <DxColumn caption="감면세액계" />
                    <DxColumn caption="납세조합공제세액계" />
                    <DxColumn caption="차감원천징수액계" />
                    <DxColumn caption="소득공제계" />
                    <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
                </DxDataGrid>
            </div>
        </div>
    </a-spin>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue";
import { useStore } from "vuex";
import { useQuery } from "@vue/apollo-composable";
import { radioCheckDataSearch, radioCheckData } from "./utils/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxItem } from "devextreme-vue/data-grid";
import { companyId, onExportingCommon, } from "@/helpers/commonFunction";
import queries from "@/graphql/queries/PA/PA2/PA230/index";

export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxSelection,
        DxExport,
        DxSearchPanel,
        DxToolbar,
        DxItem,
    },
    setup() {
        const testValue1 = ref(1);
        const testValue2 = ref(1);
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear);
        const trigger = ref<boolean>(true);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const dataSource = ref([]);
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear,
        });
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.getEmployeeWageDailies, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        const onExporting = (e: { component: any; cancel: boolean }) => {
            onExportingCommon(e.component, e.cancel, "계약정보관리&심사");
        };
        watch(result, (value) => {
            if (value) {
                dataSource.value = value.getEmployeeWageDailies;
                trigger.value = false;
            }
        });

        const searching = () => {
            trigger.value = true;
            refetchData();
        };

        const sendMail = (sendType: string) => {
            alert(sendType);
        }
        return {
            loading, globalYear, dataSource, move_column, colomn_resize, radioCheckDataSearch, radioCheckData, testValue1, testValue2,
            searching, sendMail, onExporting,
        };
    },
});
</script>
<style lang="scss" scoped src="./style/style.scss" >

</style>
