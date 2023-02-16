<template>
  <div class="tab-group">
    <SearchAreaTab2 />
    <a-row class="top-table">
      <a-col class="d-flex-center">
        <span class="mr-10">파일 제작 설정</span>
        <switch-basic :textCheck="'세무대리인신고'" :textUnCheck="'납세자자진신고'" />
        <span style="font-size: 11px; color: #888888" class="ml-5">
          <img src="@/assets/images/iconInfo.png" style="width: 14px" /> 제작전은 제작요청되지 않은 상태입니다.
        </span>
      </a-col>
      <a-col style="display: flex">
        <div>
          <label class="lable-item ml-15">제출연월일:</label>
          <date-time-box width="150px" default="2022-12-12" dateFormat="YYYY-MM-DD" />
        </div>
        <a-tooltip placement="topLeft" color="black">
          <template #title>전자신고파일 제작 요청</template>
          <div class="btn-modal-save" @click="onRequestFile">
            <SaveOutlined class="fz-20 ml-5 action-save" />
            <span style="margin-left: 5px">파일제작요청</span>
          </div>
        </a-tooltip>
      </a-col>
    </a-row>
    <div class="content-grid">
      <a-spin :spinning="searchLocalIncomeLoading" size="large">
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
              <DxButton
                :text="'귀' + data.data.imputedYear + '-' + data.data.imputedMonth"
                :style="{ color: 'white', backgroundColor: 'gray' }"
                :height="'33px'"
              />
            </a-tooltip>
          </template>
          <DxColumn caption="귀속연월" cell-template="paymentYearMonth" />
          <template #paymentYearMonth="{ data }">
            <DxButton
              :text="'귀' + data.data.paymentYear + '-' + data.data.paymentMonth"
              :style="{ color: 'white', backgroundColor: 'black' }"
              :height="'33px'"
            />
          </template>
          <DxColumn caption="신고 주기" cell-template="reportType" />
          <template #reportType="{ data }">
            <div v-if="data.data.reportType == 1" class="px-3 py-4 report-tag-black">매월</div>
            <div v-if="data.data.reportType == 6" class="px-3 py-4 report-tag-gray">반기</div>
            <div v-else></div>
          </template>
          <DxColumn caption="신고 주기" cell-template="afterDeadline" />
          <template #afterDeadline="{ data }">
            <div v-if="!data.data.afterDeadline && data.data.index == 0" class="deadline-tag tag-white">정기</div>
            <div v-if="!data.data.afterDeadline && data.data.index > 0" class="deadline-tag tag-black">기한후</div>
            <div v-if="data.data.afterDeadline" class="deadline-tag tag-orange">수정 {{ data.data.index }}</div>
          </template>
          <DxColumn caption="지방소득세 납부세액" data-field="localIncomeTaxAmount" />
          <DxColumn caption="최종마감일시" data-field="refund" />
          <DxColumn caption="최종제작요청일시" data-field="wageIncomeSimplified" />
          <DxColumn caption="제작현황" cell-template="productionStatus" />
          <template #productionStatus="{ data }">
            {{ data.data.wageIncomeSimplified }}
          </template>
        </DxDataGrid>
      </a-spin>
    </div>
    <RequestFilePopup v-if="modalStatus" :modalStatus="modalStatus" :data="requestFileData" tab-name="tab2" @cancel="modalStatus = false" />
  </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import SearchAreaTab2 from './SearchAreaTab2.vue';
import RequestFilePopup from './RequestFilePopup.vue';
import queries from '@/graphql/queries/BF/BF6/BF620/index';
import { useQuery } from '@vue/apollo-composable';
import { useStore } from 'vuex';
import { DxButton } from 'devextreme-vue/select-box';
import { DxDataGrid, DxColumn, DxScrolling, DxSelection } from 'devextreme-vue/data-grid';
import { SaveOutlined } from '@ant-design/icons-vue';
import { companyId } from '@/helpers/commonFunction';
import notification from '@/utils/notification';

export default defineComponent({
  components: {
    SearchAreaTab2,
    RequestFilePopup,
    DxButton,
    DxDataGrid,
    DxScrolling,
    DxSelection,
    DxColumn,
    SaveOutlined,
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
    const eletroFillingTrigger = ref(true);
    const productionStatus = ref();
    // const {
    //   result: eletroFillingResult,
    //   refetch: eletroFillingRefetch,
    //   loading: eletroFillingLoading,
    //   onError: searchWithholdingError,
    // } = useQuery(queries.getElectronicFilingsByLocalIncomeTax, eletroFillingParam, () => ({
    //   enabled: eletroFillingTrigger.value,
    //   fetchPolicy: 'no-cache',
    // }));
    // watch(eletroFillingResult, (newVal) => {
    //   let data = newVal.getElectronicFilingsByLocalIncomeTax;
    //   productionStatus.value = data;
    // });

    //Search with holding and data source

    const dataSource = ref([]);
    const searchLocalIncomeTrigger = ref(true);
    const {
      result: searchLocalIncomeResult,
      loading: searchLocalIncomeLoading,
      refetch: searchLocalIncomeRefetch,
      onError: searchLocalIncomeError,
      variables,
    } = useQuery(queries.searchLocalIncomeTaxElectronicFilings, { filter: filterBF620.value }, () => ({
      enabled: searchLocalIncomeTrigger.value,
      fetchPolicy: 'no-cache',
    }));
    watch(searchLocalIncomeResult, (newVal) => {
      let data = newVal.searchLocalIncomeTaxElectronicFilings;
      searchLocalIncomeTrigger.value = false;
      dataSource.value = data;
    });
    searchLocalIncomeError((res: any) => {
      notification('error', res.message)
    })
    

    //on Search

    watch(
      () => props.search,
      () => {
        variables.value = { filter: filterBF620.value };
        searchLocalIncomeTrigger.value = true;
        searchLocalIncomeRefetch();
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
      searchLocalIncomeLoading,
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
.lable-item {
  display: inline-block;
}
</style>
