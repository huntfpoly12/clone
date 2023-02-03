<template>
  <div class="tab-group">
    <SearchArea />
    <a-row class="top-table">
      <a-col class="d-flex-center">
        <span class="mr-10">파일 제작 설정</span>
        <switch-basic :textCheck="'세무대리인신고'" :textUnCheck="'납세자자진신고'" />
        <span style="font-size: 11px; color: #888888" class="ml-5"> <img src="@/assets/images/iconInfo.png" style="width: 14px" /> 제작전은 제작요청되지 않은 상태입니다. </span>
      </a-col>
      <a-col>
        <a-tooltip placement="topLeft" color="black">
          <template #title>전자신고파일 제작 요청</template>
          <SaveOutlined class="fz-24 ml-5 action-save" @click="onRequestFile" />
        </a-tooltip>
      </a-col>
    </a-row>
    <div class="content-grid">
      <a-spin :spinning="searchWithholdingLoading" size="large">
        <DxDataGrid
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="dataSource"
          :show-borders="true"
          key-expr="companyId"
          class="mt-10"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
        >
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxSelection mode="multiple" :fixed="true" />
          <DxColumn caption="사업자코드" data-field="company.code" />
          <DxColumn caption="상호 주소" cell-template="companyName" />
          <template #companyName="{ data }">
            {{ data.data.company.name }}
            {{ data.data.company.address }}
          </template>
          <DxColumn caption="귀속연월" cell-template="inputYearMonth" />
          <template #inputYearMonth="{ data }">
            <a-tooltip color="black">
              <template #title>삭제</template>
              <DxButton :text="'귀' + data.data.imputedYear + '-' + data.data.imputedMonth" :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
            </a-tooltip>
          </template>
          <DxColumn caption="귀속연월" cell-template="paymentYearMonth" />
          <template #paymentYearMonth="{ data }">
            <DxButton :text="'귀' + data.data.paymentYear + '-' + data.data.paymentMonth" :style="{ color: 'white', backgroundColor: 'black' }" :height="'33px'" />
          </template>
          <DxColumn caption="신고 주기" cell-template="reportType" />
          <template #reportType="{ data }">
            <div v-if="data.data.reportType == 1" class="px-10 py-4" style="color: #000000; background-color: black">매월</div>
            <div v-if="data.data.reportType == 6" class="px-10 py-4" style="color: #000000; background-color: #555555">반기</div>
            <div v-else></div>
          </template>
          <DxColumn caption="신고 주기" cell-template="afterDeadline" />
          <template #afterDeadline="{ data }">
            <div v-if="data.data.reportType == 1" class="px-10 py-4" style="color: #000000; background-color: black">매월</div>
            <div v-if="data.data.reportType == 6" class="px-10 py-4" style="color: #000000; background-color: #555555">반기</div>
            <div v-else></div>
          </template>
          <DxColumn caption="납부세액(A99)" data-field="yearEndTaxAdjustment" />
          <DxColumn caption="최종마감일시" data-field="statusUpdatedAt" />
          <DxColumn caption="최종제작요청일시" data-field="lastProductionRequestedAt" />
          <DxColumn caption="제작현황" cell-template="productionStatus" />
          <template #productionStatus="{ data }">
            {{ productionStatus }}
            <!-- <ProductionStatuses></ProductionStatuses> -->
          </template>
          <DxSummary>
            <DxTotalItem column="사업자코드" summary-type="count" display-format="전체: {0}" />
            <DxTotalItem class="custom-sumary" column="신고 주기" summary-type="count" display-format="지급액합계: {0}" value-format="#,###" />
            <DxTotalItem class="custom-sumary" column="필요경비" summary-type="sum" value-format="#,###" display-format="필요경비합계: {0}" />
            <DxTotalItem class="custom-sumary" column="소득금액" summary-type="sum" value-format="#,###" display-format="소득금액합계: {0}" />
            <!-- <DxTotalItem class="custom-sumary" column="공제" :customize-text="customTextSummary" /> -->
            <DxTotalItem class="custom-sumary" column="actualPayment" summary-type="sum" display-format="차인지급액합계: {0}" value-format="#,###" />
          </DxSummary>
        </DxDataGrid>
      </a-spin>
    </div>
    <RequestFilePopup v-if="modalStatus" :modalStatus="modalStatus" :data="requestFileData" tab-name="tab1" @cancel="modalStatus = false" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, watchEffect } from 'vue';
import SearchArea from './SearchArea.vue';
import RequestFilePopup from './RequestFilePopup.vue';
import queries from '@/graphql/queries/BF/BF6/BF620/index';
import { useQuery } from '@vue/apollo-composable';
import { useStore } from 'vuex';
import { DxButton } from 'devextreme-vue/select-box';
import DxDataGrid, { DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem } from 'devextreme-vue/data-grid';
import { SaveOutlined } from '@ant-design/icons-vue';
import { companyId } from '@/helpers/commonFunction';
export default defineComponent({
  components: {
    SearchArea,
    RequestFilePopup,
    DxButton,
    DxDataGrid,
    DxScrolling,
    DxSelection,
    DxColumn,
    SaveOutlined,
    DxSummary,
    DxTotalItem
},
  props: {
    search: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const filterBF620 = computed(() => store.state.common.filterBF620);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const userInfor = computed(() => store.state.auth.userInfor);

    //produtionStatus

    const eletroFillingParam = reactive({
      input: {
        companyId: companyId,
        imputedYear: globalYear.value,
        reportId: 2,
      },
    });
    const eletroFillingTrigger = ref(false);
    const productionStatus = ref();
    const {
      result: eletroFillingResult,
      refetch: eletroFillingRefetch,
      loading: eletroFillingLoading,
    } = useQuery(queries.getElectronicFilingsByWithholdingTax, eletroFillingParam, () => ({
      enabled: eletroFillingTrigger.value,
      fetchPolicy: 'no-cache',
    }));
    watch(eletroFillingResult, (newVal) => {
      console.log(`output->newVal`, newVal);
      let data = newVal.getElectronicFilingsByWithholdingTax;
      productionStatus.value = data;
    });

    //Search with holding and data source

    const dataSource = ref([]);
    const searchWithholdingTrigger = ref(false);
    const {
      result: searchWithholdingResult,
      loading: searchWithholdingLoading,
      refetch: searchWithholdingRefetch,
      onError: searchWithholdingError,
      variables,
    } = useQuery(queries.searchWithholdingTaxElectronicFilings, { filter: filterBF620.value }, () => ({
      enabled: searchWithholdingTrigger.value,
      fetchPolicy: 'no-cache',
    }));
    watch(searchWithholdingResult, (newVal) => {
      console.log(`output->newVal`, newVal);
      let data = newVal.searchWithholdingTaxElectronicFilings;
      searchWithholdingTrigger.value = false;
      dataSource.value = data;
      if (data.lastProductionRequestedAt) {
        eletroFillingParam.input.reportId = data.reportId;
        eletroFillingTrigger.value = true;
        eletroFillingRefetch();
      }
    });

    //on Search

    watch(
      () => props.search,
      () => {
        console.log(`output->props.search`, props.search);
        variables.value = { filter: filterBF620.value };
        searchWithholdingTrigger.value = true;
        searchWithholdingRefetch();
      },
      { deep: true }
    );

    // watchEffect(()=>{

    // })

    // request file withholding

    const requestFileData = ref();
    const modalStatus = ref<boolean>(false);
    const onRequestFile = () => {
      requestFileData.value = {
        reportKeyInputs: eletroFillingParam.input,
        filter: filterBF620.value,
        emailInput: {
          receiverName: userInfor.value.name,
          receiverAddress: userInfor.value.email,
        },
      };
      modalStatus.value = true;
    };
    return {
      filterBF620,
      variables,
      searchWithholdingLoading,
      move_column,
      colomn_resize,
      dataSource,
      productionStatus,
      onRequestFile,
      modalStatus,
      requestFileData,
      userInfor,
    };
  },
});
</script>
<style scoped lang="scss">
@import '../style/style.scss';
</style>