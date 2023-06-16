<template>
    <action-header title="사업자관리" @actionSearch="searching" :buttonSearch="true"/>
    <div id="bf-320">
        <div class="page-content">
            <a-spin :spinning="loading" size="large">
                <DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true" :data-source="responApiSearchCompanies"
                    :show-borders="true" key-expr="id" @exporting="onExporting" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true" style="height: calc(100vh - 155px); margin-top: 5px;" >
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxPaging :page-size="0" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색"/>
                    <DxExport :enabled="true" />
                    <DxToolbar>
                        <DxItem location="after" name="exportButton" css-class="cell-button-export" />
                        <DxItem location="after" template="search" />
                        <DxItem location="after" name="searchPanel" cssClass="search-panel" />
                    </DxToolbar>
                    <template #search>
                        <div class="search">
                            <div class="d-flex-center gap-20 mr-15">
                                <div class="d-flex-center gap-10">
                                    <label class="">해지:</label>
                                    <switch-basic v-model:valueSwitch="originData.excludeCancel" :textCheck="'제외'"
                                        :textUnCheck="'포함'" />
                                </div>
                                <div class="d-flex-center gap-10">
                                    <label>매니저리스트:</label>
                                    <list-manager-dropdown v-model:valueInput="originData.manageUserId" clearButton width="200px" :height="30"/>
                                </div>
                                <div class="d-flex-center gap-10">
                                    <label>영업자리스트:</label>
                                    <list-sales-dropdown v-model:valueInput="originData.salesRepresentativeId" width="200px" :height="30"/>
                                </div>
                            </div>
                        </div>
                    </template>
                    <DxColumn data-field="code" caption="사업자코드" :fixed="true" />
                    <DxColumn data-field="name" caption="상호" />
                    <DxColumn data-field="presidentName" caption="대표자" />
                    <DxColumn data-field="address" caption="주소" />
                    <DxColumn data-field="phone" caption="연락처" :width="230" />
                    <DxColumn data-field="manageCompactUser.name" caption="매니저" />
                    <DxColumn data-field="manageStartDate" caption="관리시작일" cell-template="manageStartDate" />
                    <template #manageStartDate="{ data }">
                        {{
                            data.data.manageStartDate ?
                            dayjs(data.data.manageStartDate.toString()).format('YYYY-MM-DD') : ''
                        }}
                    </template>
                    <DxColumn data-field="compactSalesRepresentative.name" caption="영업자" />
                    <DxColumn data-field="canceledAt" caption="해지일자" />
                    <DxColumn data-field="servicePrice" caption="이용료" format="fixedPoint" data-type="number" />
                    <DxColumn :width="120" cell-template="pupop" />
                    <template #pupop="{ data }">
                        <div class="custom-action">
                            <a-space :size="10">
                                <a-tooltip color="black" placement="top">
                                    <template #title>편집</template>
                                    <EditOutlined @click="setModalVisible(data)" />
                                </a-tooltip>
                                <a-tooltip color="black" placement="top">
                                    <template #title>변경이력</template>
                                    <HistoryOutlined @click="modalHistory(data)" />
                                </a-tooltip>
                                <a-tooltip placement="top" color="black">
                                  <template #title>사용자권한</template>
                                  <div style="height: 17px; min-width: 17px;" @click="onEnterUser(data.data)" class="permission-img">
                                    <!-- <img v-if="data.data.isHover" class="permission-img" src="@/assets/images/add-permission.png"/>
                                    <img v-else class="permission-img permission-img-hover" src="@/assets/images/add-permission-hover.png"/> -->
                                  </div>
                                </a-tooltip>
                            </a-space>
                        </div>
                    </template>
                </DxDataGrid>
            </a-spin>
            <BF320Popup :modalStatus="modalStatus" @closePopup="handleClosePopup" :idRowEdit="idRowEdit"
                :data="popupData" />
            <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
                title="변경이력" :idRowEdit="idRowEdit" typeHistory="bf-320" />
            <EnterCusAccModal v-if="isCustomerModal" :companyInfo="companyInfo" @closeModal="onHandleCusAcc"/>
        </div>
</div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import {
  DxDataGrid,
  DxColumn,
  DxExport,
  DxSearchPanel,
  DxToolbar,
  DxScrolling,
  DxItem,
  DxPaging
} from 'devextreme-vue/data-grid';
import HistoryPopup from '@/components/HistoryPopup.vue';
import BF320Popup from "./components/BF320Popup.vue";
import DxButton from "devextreme-vue/button";
import { EditOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import { useMutation, useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/BF/BF3/BF320/index"
import { dataSearchIndex } from "./utils/index";
import { onExportingCommon, makeDataClean } from "@/helpers/commonFunction"
import notification from '@/utils/notification';
import dayjs from "dayjs";
import { reactive } from 'vue';
import mutations from "@/graphql/mutations/AddToken/index";
export default defineComponent({
    components: {
        DxPaging,
        DxDataGrid, DxColumn, DxButton, DxExport, DxSearchPanel, DxToolbar, DxItem, DxScrolling,
        BF320Popup, HistoryPopup,
        EditOutlined, HistoryOutlined
    },
    setup() {
        // config grid
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rowTable = ref()
        let popupData = ref([])
        let modalHistoryStatus = ref<boolean>(false)
        var idRowEdit = ref<number>(0)
        let modalStatus = ref<boolean>(false)
        const trigger = ref<boolean>(true)
        var responApiSearchCompanies = ref([])
        const originData = ref({
            ...dataSearchIndex,
            rows: 10000,
        })
        const { refetch: refetchData, result, loading, onError } = useQuery(queries.searchCompanies, originData.value, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
        onError((e) => {
            notification("error", e.message);
        });
        const searching = () => {
            makeDataClean(originData.value)
            trigger.value = true;
        }
        const handleClosePopup = () => {
            modalStatus.value = false
            makeDataClean(originData.value)
            trigger.value = true;
        }
        const onExporting = (e: any) => {
            onExportingCommon(e.component, e.cancel, '사업자관리')
        }
        const setModalVisible = (data: any) => {
            idRowEdit.value = data.data.id;
            modalStatus.value = true;
            popupData.value = data;
        }
        const modalHistory = (data: any) => {
            idRowEdit.value = data.data.id;
            modalHistoryStatus.value = true;
            popupData.value = data;
        }
        watch(result, (value) => {
            trigger.value = false
            if (value) {
                rowTable.value = value.searchCompanies.totalCount
                responApiSearchCompanies.value = value.searchCompanies.datas
            }
        });


    
        const companyInfo = reactive({
          code: NaN,
          name: '',
          companyId: NaN,
        })
        const userToken = ref();
        const cloneWebsite = () => {
          const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
          const windowFeatures = `width=${width},height=${height},fullscreen=yes`;
          const currentUrl = window.location.origin.replace(/\/$/, '');
          if(userToken.value){
            window.open(`${currentUrl}/dashboard?token=${userToken.value.accessToken}&companyName=${companyInfo.name}`, '_blank', windowFeatures);
          }
        }
        const {mutate, onDone, onError: customerLoginError } = useMutation(mutations.customerWorkLogin);
        const isCustomerModal = ref(false);
        const onEnterUser = (data: any) => {
          companyInfo.code = data.code;
          companyInfo.name = data.name;
          companyInfo.companyId = data.id;
          isCustomerModal.value = true;
        }
        const onHandleCusAcc = (emitVal: boolean) => {
          isCustomerModal.value = false;
          if(emitVal){
            mutate({companyId:companyInfo.companyId})
          }else{

          }
        }
        onDone((result: any) => {
          userToken.value = result.data.customerWorkLogin;
          cloneWebsite();
        })
        return {
            trigger,
            move_column,
            colomn_resize,
            idRowEdit,
            loading,
            modalHistoryStatus,
            responApiSearchCompanies,
            originData,
            searching,
            onExporting,
            handleClosePopup,
            modalStatus,
            rowTable,
            popupData,
            setModalVisible,
            modalHistory,
            dayjs,
            onHandleCusAcc, isCustomerModal,companyInfo,onEnterUser,
        }
    },
});
</script>
<style lang="scss" scoped src="./style/index.scss"/>
