<template>
  <div class="search-form">
      <div id="components-grid-demo-flex">
          <a-row justify="start" :gutter="[16, 8]">
              <a-col>
                  <a-form-item  label="신고구분 :"> 
                    <electronic-filing-type v-model:valueInput="originData.type" width="200px"></electronic-filing-type> 
                  </a-form-item>
              </a-col>
              <a-col>
                  <a-form-item  label="제작요청일(기간)"> 
                    <range-date-time-box v-model:valueDate="rangeDate" width="250px" :multi-calendars="true"></range-date-time-box>
                  </a-form-item>
              </a-col>
              <a-autocomplete>
                <a-form-item  label="제작상태"> 
                    <DxRadioGroup :data-source="typeCheckbox" item-template="radio" v-model="productionStatuses"
                        layout="horizontal" :icon-size="12">
                        <template #radio="{ data }">
                            <production-statuses :typeTag="0" v-if="data == 0" padding="0px 10px"/>
                            <production-statuses :typeTag="4" v-if="data == 2" padding="1px 10px"/>
                            <production-statuses :typeTag="5" v-if="data == -1" padding="1px 10px"/>
                        </template>
                    </DxRadioGroup>
                </a-form-item>
              </a-autocomplete>
              <a-col>
                <a-form-item  label="매니저리스트"> 
                  <list-manager-dropdown width="150px" v-model:valueInput="originData.manageUserId"/>
                </a-form-item>
              </a-col>
          </a-row>
      </div>
  </div>
  <div class="grid-view">
    <div class="content-grid">
      <a-spin :spinning="loadingElectronicFiling" size="large">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                :show-borders="true" key-expr="companyId" class="mt-10" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true">
                <DxScrolling mode="standard" show-scrollbar="always"/>
                <DxColumn caption="코드명" data-field="fileStorageId" />
                <DxColumn caption="신고구분" data-field="reportType" />
                <DxColumn caption="제작요청일시" data-field="productionRequestedAt"/>
                <DxColumn caption="아이디" data-field="productionRequestUserId"/>
                <DxColumn caption="제작현황" data-field="productionStatus" />
                <DxColumn caption="상세보기" data-field="action" />
                <template #action="{ }"> 
                     <img src="@/assets/images/searchPlus.png" style="width: 14px;" />
                </template>
            </DxDataGrid>
        </a-spin>
    </div>
  </div>
  <companies-popup v-if="modalCompanies" :modalStatus="modalCompanies"  @closePopup="modalCompanies = false" :data="dataPopup"></companies-popup>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling } from "devextreme-vue/data-grid";
import { DxRadioGroup } from 'devextreme-vue/radio-group';
import queries from "@/graphql/queries/BF/BF6/BF630/index";
import {companyId} from "@/helpers/commonFunction"
import notification from "@/utils/notification";
import dayjs, { Dayjs } from "dayjs";
import filters from "@/helpers/filters";
import CompaniesPopup from "./CompaniesPopup.vue";

export default defineComponent({
  components: {
    DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling,DxRadioGroup,CompaniesPopup
  },
  props: {
    activeSearch: {
      type: Number,
      default: 0,
    },
    activeSave: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear)
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const trigger = ref<boolean>(true);
    const typeCheckbox = ref([0, 2, -1])
    const valueType = ref(0)
    const rangeDate =  ref([filters.formatDateToInterger(dayjs()), filters.formatDateToInterger(dayjs().add(7, 'day'))])
    const productionStatuses =  ref(0)
    const dataSource = ref([])
    let companyIds = Array();
    const dataPopup = ref()
    const modalCompanies = ref<boolean>(false)
    const originData = reactive({
        type:0,
        requesteStartDate: rangeDate.value[0],
        requesteFinishDate: rangeDate.value[1],
        productionStatuses: [2,-1],
        manageUserId: 0
      }
    )

    // watch range date time
    watch(productionStatuses, (newValue) => {
      if (newValue == 0) {
        originData.productionStatuses = [2,-1]
      } else {
        originData.productionStatuses =  [newValue]
      }
    })
    // watch range picker change
    watch(rangeDate, (newValue) => {
      originData.requesteStartDate = newValue[0]
      originData.requesteFinishDate = newValue[1]
    })
    

    // ============ GRAPQL ===============================
    const {
        result:  resElectronicFiling,
        onResult: onResElectronicFiling,
        loading: loadingElectronicFiling,
        refetch: refetchElectronicFiling,
        onError: onErrorElectronicFiling
    } = useQuery(queries.searchElectronicFilingFileProductions, {
      filter: originData
    }, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
    }))

    
    
    // ===================DONE GRAPQL==================================
    // watch result  api searchElectronicFilingFileProductions
    onResElectronicFiling(() => {
      trigger.value = false
    })
    watch(resElectronicFiling, (value) => {
      if (value) {
        dataSource.value = value.searchElectronicFilingFileProductions
        // create list company ID for request file
        dataSource.value.map((item : any) => {
          companyIds.push(item.companyId)
        })
      }
    })
    onErrorElectronicFiling(e => {
            notification('error', e.message)
    })

    // watch active searching
    watch(() => props.activeSearch, (value) => {
      trigger.value = true;
      refetchElectronicFiling()
    })
   
    return {
      globalYear,
      originData,
      move_column,
      colomn_resize,
      dataSource,typeCheckbox,valueType,modalCompanies,
      loadingElectronicFiling,
      trigger,
      rangeDate,
      dataPopup,
      productionStatuses
    }
  }
})
</script>
<style  scoped lang="scss" src="../style/styleTabs.scss">
</style>



