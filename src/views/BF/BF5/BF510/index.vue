<template>
  <action-header title="4대보험업무관리" :buttonSearch="true" @actionSearch="searching()"/>
  <div class="filter-custom px-10 py-5">
    <a-space :size="16">
      <div>
        <div class="d-flex-center gap-10 mb-5">
          <div>회계연월:</div>
          <year-picker-box-custom v-model:valueDate="dataSearch.year" width="65px" class="mr-5" text=""/>
          <radio-group :arrayValue="checkBoxSearch" layoutCustom="horizontal"
                       v-model:valueRadioCheck="dataSearch.month"/>
        </div>
        <div class="d-flex-center gap-10" style="height: 40px">
          <div>마감상태:</div>
          <div class="d-flex-center gap-20">
            <checkbox-basic label="전체" class="mr-10" v-model:valueCheckbox="statuses.checkboxAll"/>
            <div class="d-flex">
              <checkbox-basic label="미입력" class=" custom-checkbox0" v-model:valueCheckbox="statuses.checkbox0"/>
              <info-tool-tip>입력된 내역이 없는 상태</info-tool-tip>
            </div>
            <checkbox-basic label="입력중" class="mr-10 custom-checkbox1" v-model:valueCheckbox="statuses.checkbox1"/>
            <checkbox-basic label="입력마감" class="mr-10 custom-checkbox2" v-model:valueCheckbox="statuses.checkbox2"/>
            <checkbox-basic label="조정중" class="mr-10 custom-checkbox3" v-model:valueCheckbox="statuses.checkbox3"/>
            <checkbox-basic label="조정마감" class="mr-10 custom-checkbox4" v-model:valueCheckbox="statuses.checkbox4"/>
          </div>
        </div>
      </div>
      <div class="search-company">
        <a-form-item label="매니저리스트" label-align="left" class="fix-width-label">
          <list-manager-dropdown v-model:valueInput="dataSearch.manageUserId" width="160px"/>
        </a-form-item>
        <a-form-item label="영업자리스트" label-align="left" class="fix-width-label">
          <list-sales-dropdown v-model:valueInput="dataSearch.salesRepresentativeId" width="160px"/>
        </a-form-item>
      </div>
      <div class="search-4">
        <switch-basic textCheck="해지제외" textUnCheck="해지포함" v-model:valueSwitch="dataSearch.excludeCancel"/>
      </div>
    </a-space>
  </div>

  <DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
              :allow-column-resizing="true" :show-borders="true" keyExpr="id" class="px-10"
              style="height: calc(100vh - 180px); margin-top: 40px">
    <DxExport :enabled="true"/>
    <DxSearchPanel :visible="true" placeholder="검색" :search-visible-columns="['facilityBusinessName']"/>
    <DxToolbar>
      <DxItem name="searchPanel"/>
      <DxItem name="exportButton" css-class="cell-button-export"/>
    </DxToolbar>
    <DxColumn data-field="code" caption="사업자코드"/>
    <DxColumn data-field="name" caption="상호" width="215px"/>
    <DxColumn data-field="address" caption="주소" width="215px"/>
    <DxColumn data-field="facilityBusinessName" caption="사업별 마감현황" cell-template="closingStatusByBusiness" width="250px"
              :calculateCellValue="calFacilityBusinessName"/>
    <DxColumn data-field="presidentName" caption="대표자"/>
    <DxColumn data-field="phone" caption="연락처"/>
    <DxColumn data-field="presidentMobilePhone" caption="휴태폰"/>
    <DxColumn caption="담당매니저" data-field="manageCompactUser.name"/>
    <DxColumn data-field="manageStartDate" caption="관리시작일" cell-template="productionRequestedAt" alignment="center"
              width="100px"/>
    <template #closingStatusByBusiness="{data}">
      <div class="d-flex flex-col gap-5">
        <div v-for="(company, index) in data.data.compactAccountingProcesses" class="d-flex-center justify-content-between gap-10">
          <div class="truncate" :title="company.facilityBusinessName" style="min-width: 50px">{{ company.facilityBusinessName }}</div>
          <div class="d-flex-center gap-5">
            <AccountingProcessStatusEdit
              :data="{
                status: company.status,
                companyId: data.data.companyId,
                facilityBusinessId: company.facilityBusinessId,
                year: dataSearch.year,
                month: dataSearch.month
              }"
              @closePopup="closePopup"
            />
            <a-tooltip :title="`${data.data.name} ${company.facilityBusinessName} 의 [통장내역]으로 이동`">
              <div @click="redirectAc110(data.data, index)">
                <RightCircleOutlined style="color: #2323da; font-size: 20px; border-radius: 10px"/>
              </div>
            </a-tooltip>
          </div>
        </div>
      </div>
    </template>
    <template #productionRequestedAt="{data}">
      {{ data.data.manageStartDate && $filters.formatDate(data.data.manageStartDate) }}
    </template>
  </DxDataGrid>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import {reactive, watch, watchEffect} from 'vue';
import {DxDataGrid, DxColumn, DxExport, DxSearchPanel, DxItem, DxToolbar} from 'devextreme-vue/data-grid';
import {ref} from 'vue';
import {searchCompanyAccountingDeadlines} from '@/graphql/queries/BF/BF5/BF510';
import {useMutation, useQuery} from '@vue/apollo-composable';
import DataSource from 'devextreme/data/data_source';
import AccountingProcessStatusEdit from "./components/AccountingProcessStatusEdit.vue";
import InfoToolTip from "@/components/common/InfoToolTip.vue";
import {RightCircleOutlined} from '@ant-design/icons-vue';
import mutations from "@/graphql/mutations/AddToken";
import {ISearchCompanyAccountingDeadlines} from "@/views/BF/BF5/BF510/types";

const checkBoxSearch = [
  {id: 1, text: '1 월'},
  {id: 2, text: '2 월'},
  {id: 3, text: '3 월'},
  {id: 4, text: '4 월'},
  {id: 5, text: '5 월'},
  {id: 6, text: '6 월'},
  {id: 7, text: '7 월'},
  {id: 8, text: '8 월'},
  {id: 9, text: '9 월'},
  {id: 10, text: '10 월'},
  {id: 11, text: '11 월'},
  {id: 12, text: '12 월'},
]
const statuses = reactive({
  checkboxAll: true,
  checkbox0: true,
  checkbox1: true,
  checkbox2: true,
  checkbox3: true,
  checkbox4: true,
});
watchEffect(() => {
  if (statuses.checkboxAll) {
    statuses.checkbox0 = statuses.checkbox1 = statuses.checkbox2 = statuses.checkbox3 = statuses.checkbox4 = true;
  } else {
    statuses.checkbox0 = statuses.checkbox1 = statuses.checkbox2 = statuses.checkbox3 = statuses.checkbox4 = false;
  }
})
watchEffect(() => {
  if (statuses.checkbox0 && statuses.checkbox1 && statuses.checkbox2 && statuses.checkbox3 && statuses.checkbox4) {
    statuses.checkboxAll = true;
  }
  if (!(statuses.checkbox0 || statuses.checkbox1 || statuses.checkbox2 || statuses.checkbox3 || statuses.checkbox4)) {
    statuses.checkboxAll = false;
  }
})
const dataSource = ref<DataSource>()



const dataSearch = reactive<ISearchCompanyAccountingDeadlines>({
  fiscalYear: parseInt(dayjs().format('YYYY')),
  year: parseInt(dayjs().format('YYYY')),
  month: parseInt(dayjs().format('MM')),
  excludeCancel: true,
  salesRepresentativeId: null,
  manageUserId: null,
  statuses: [1, 10, 20, 30, 40]
})
const trigger = ref(true);

const {onResult, onError} = useQuery(searchCompanyAccountingDeadlines, {
  filter: dataSearch
}, () => ({
  fetchPolicy: "no-cache",
  enabled: trigger.value
}))

onResult((result) => {
  dataSource.value = new DataSource({
    store: {
      type: "array",
      key: "companyId",
      data: result.data.searchCompanyAccountingDeadlines || [],
    },
  })
  trigger.value = false
})
onError((error) => {
  trigger.value = false
  console.log(error)
})
const searching = () => {
  const stt = Object.values(statuses).slice(1).reduce((acc: any, curr: any, index: number) => {
    if (curr) {
      acc.push(index === 0 ? 1 : index * 10);
    }
    return acc;
  }, []);
  if (stt.length) {
    dataSearch.statuses = stt;
  } else {
    delete dataSearch.statuses;
  }
  trigger.value = true;
}
const userToken = reactive({
  accessToken: '',
  refreshToken: ''
})
const companyInfo = reactive({
  code: NaN,
  username: '',
  companyId: NaN,
  facilityBusinessId: 0,
  facilityBusinessName: ''
})
const {mutate, onDone, onError: customerLoginError} = useMutation(mutations.customerWorkLogin);

onDone((result: any) => {
  userToken.accessToken = result.data.customerWorkLogin.accessToken;
  userToken.refreshToken = result.data.customerWorkLogin.refreshToken;
  cloneWebsite();
})
const redirectAc110 = (data: any, index: number) => {
  console.log('data', data)
  companyInfo.companyId = data.companyId;
  companyInfo.code = data.code;
  companyInfo.username = data.name;
  companyInfo.facilityBusinessId = data.compactAccountingProcesses[index].facilityBusinessId;
  companyInfo.facilityBusinessName = data.compactAccountingProcesses[index].facilityBusinessName;
  mutate({companyId: data.companyId})
}

const cloneWebsite = () => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const windowFeatures = `width=${width},height=${height},fullscreen=yes`;
  const currentUrl = window.location.origin.replace(/\/$/, '');
  if (userToken.refreshToken && userToken.accessToken) {
    const newTab = `${currentUrl}/ac-110?token=${userToken.accessToken}&refreshToken=${userToken.refreshToken}&username=${companyInfo.username}&facilityBizType=&globalFacilityBizId=${companyInfo.facilityBusinessId}&facilityBusinessName=${companyInfo.facilityBusinessName}&year=${dataSearch.year}&path=AC110&onlyView=true`
    window.open(newTab, '_blank', 'noopener=yes,noreferrer=yes,');
  }
}
const closePopup = (e: boolean) => {
  if (e) trigger.value = true;
}

const calFacilityBusinessName = (rowData: any) => {
  return rowData.compactAccountingProcesses ? rowData.compactAccountingProcesses.map((item: any) => item.facilityBusinessName).join(' ') : ''
}
</script>

<style lang="scss" scoped>
:deep(.dx-widget .dx-collection) {
  //display: grid;
  //grid-template-columns: repeat(12, 1fr);
  .dx-radiobutton {
    display: flex;
    align-items: center;

    .dx-radiobutton-icon {
      display: flex;
      align-items: center;

      .dx-radiobutton-icon-dot {
        margin-top: 0;
        margin-left: -13px
      }
    }
  }
}
:deep(.dx-checkbox-container) {
  overflow: visible;
}
.checkbox {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
.filter-custom {
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 1;
}
</style>
