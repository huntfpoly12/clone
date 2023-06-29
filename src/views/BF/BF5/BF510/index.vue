<template>
  <action-header title="4대보험업무관리" :buttonSearch="true" @actionSearch="searching()"/>
  <div class="px-10 py-5">
    <div class="d-flex-center gap-10 mb-5">
      <div class="d-flex-center gap-10">
        <div>회계연월:</div>
        <year-picker-box-custom v-model:valueDate="dataSearch.year" width="65px" class="mr-5" text=""/>
      </div>
      <div class="month-container">
        <div v-for="(month) in checkBoxSearch" :key="month.id" class="month"
             :class="{ 'active': dataSearch.month === month.id }" @click="handleSelectMonth(month.id)">
          {{ `${dataSearch.year} - ${month.text}` }}
        </div>
      </div>
    </div>
    <a-space :size="16">
      <div>
        <div class="d-flex-center gap-10" style="height: 40px">
          <div>마감상태:</div>
          <div class="d-flex-center gap-10">
            <div @click="handleClickAll" class="checkbox-all">
              <DxCheckBox class="mr-10 " v-model:value="checkboxAll" icon-size="16" text="전체" />
            </div>
            <div class="d-flex">
              <checkbox-basic label="미입력" class="custom-checkbox0" v-model:valueCheckbox="statuses.checkbox0"/>
              <info-tool-tip>입력된 내역이 없는 상태</info-tool-tip>
            </div>
            <checkbox-basic label="입력중" class=" custom-checkbox1" v-model:valueCheckbox="statuses.checkbox1"/>
            <checkbox-basic label="입력마감" class=" custom-checkbox2" v-model:valueCheckbox="statuses.checkbox2"/>
            <checkbox-basic label="조정중" class=" custom-checkbox3" v-model:valueCheckbox="statuses.checkbox3"/>
            <checkbox-basic label="조정마감" class=" custom-checkbox4" v-model:valueCheckbox="statuses.checkbox4"/>
          </div>
        </div>
      </div>
      <div class="d-flex-center gap-10">
        <DxField label="매니저리스트"  class="field-custom-auto">
          <list-manager-dropdown v-model:valueInput="dataSearch.manageUserId" width="160px"/>
        </DxField>
        <DxField label="영업자리스트" class="field-custom-auto">
          <list-sales-dropdown v-model:valueInput="dataSearch.salesRepresentativeId" width="160px"/>
        </DxField>
        <div>
          <switch-basic textCheck="해지제외" textUnCheck="해지포함" v-model:valueSwitch="dataSearch.excludeCancel" width="100px"/>
        </div>
      </div>

    </a-space>
  </div>
  <a-spin :spinning="loading">
    <DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                :allow-column-resizing="true" :show-borders="true" keyExpr="id" class="px-10"
                style="height: calc(100vh - 240px)">
      <DxPaging :page-size="0"/>
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
              <ProcessStatus
                v-model:valueStatus="company.status"
                :dataRow="{
                  companyId: data.data.companyId,
                  fiscalYear: dataSearch.year,
                  facilityBusinessId: company.facilityBusinessId,
                  year: dataSearch.year,
                  month: dataSearch.month
                }"
                :noOptionNoInput="true"
                @checkConfirmRowTable="submitChangeStatus"
              />
              <a-tooltip :title="`${data.data.name} ${company.facilityBusinessName} 의 [통장내역]으로 이동`">
                <div @click="redirectAc110(data.data, index as number)">
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
  </a-spin>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import {reactive, ref, watchEffect} from 'vue';
import {DxColumn, DxDataGrid, DxExport, DxItem, DxPaging, DxSearchPanel, DxToolbar} from 'devextreme-vue/data-grid';
import {searchCompanyAccountingDeadlines} from '@/graphql/queries/BF/BF5/BF510';
import {useMutation, useQuery} from '@vue/apollo-composable';
import DataSource from 'devextreme/data/data_source';
import InfoToolTip from "@/components/common/InfoToolTip.vue";
import {RightCircleOutlined} from '@ant-design/icons-vue';
import mutations from "@/graphql/mutations/AddToken";
import {ISearchCompanyAccountingDeadlines} from "@/views/BF/BF5/BF510/types";
import DxCheckBox from "devextreme-vue/check-box";
import changeAccountingProcessStatus from "@/graphql/mutations/BF/BF5/BF510/changeAccountingProcessStatus";

const checkBoxSearch = [
  {id: 1, text: '01'},
  {id: 2, text: '02'},
  {id: 3, text: '03'},
  {id: 4, text: '04'},
  {id: 5, text: '05'},
  {id: 6, text: '06'},
  {id: 7, text: '07'},
  {id: 8, text: '08'},
  {id: 9, text: '09'},
  {id: 10, text: '10'},
  {id: 11, text: '11'},
  {id: 12, text: '12'},
]
const checkboxAll = ref(true);
const statuses = reactive({
  checkbox0: true,
  checkbox1: true,
  checkbox2: true,
  checkbox3: true,
  checkbox4: true,
});
watchEffect(() => {
    checkboxAll.value = statuses.checkbox0 && statuses.checkbox1 && statuses.checkbox2 && statuses.checkbox3 && statuses.checkbox4;
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

const {onResult, onError, loading} = useQuery(searchCompanyAccountingDeadlines, {
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
  const stt = Object.values(statuses).reduce((acc: any, curr: any, index: number) => {
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
  dataSearch.fiscalYear = dataSearch.year;
  trigger.value = true;
}
const userToken = reactive({
  accessToken: '',
  refreshToken: ''
})
const companyInfo = reactive({
  code: NaN,
  companyName: '',
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
  companyInfo.companyId = data.companyId;
  companyInfo.code = data.code;
  companyInfo.companyName = data.name;
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
    const newTab = `${currentUrl}/ac-110?token=${userToken.accessToken}&refreshToken=${userToken.refreshToken}&companyId=${companyInfo.companyId}&companyName=${encodeURIComponent(companyInfo.companyName)}&facilityBizType=&globalFacilityBizId=${companyInfo.facilityBusinessId}&facilityBusinessName=${encodeURIComponent(companyInfo.facilityBusinessName)}&year=${dataSearch.year}&month=${dataSearch.month}&path=AC110&typeLogin=custom`
    window.open(newTab, '_blank', 'noopener=yes,noreferrer=yes,' + windowFeatures);
  }
}
const closePopup = (e: boolean) => {
  if (e) trigger.value = true;
}

const calFacilityBusinessName = (rowData: any) => {
  return rowData.compactAccountingProcesses ? rowData.compactAccountingProcesses.map((item: any) => item.facilityBusinessName).join(' ') : ''
}
const handleSelectMonth = (month: number) => {
  dataSearch.month = month
}
const handleClickAll = () => {
  statuses.checkbox0 = statuses.checkbox1 = statuses.checkbox2 = statuses.checkbox3 = statuses.checkbox4 = checkboxAll.value;
}
const { mutate: mutateChangeStatus, onDone: onDoneChangeStatus, onError: onErrorChangeStatus } = useMutation(changeAccountingProcessStatus)

onDoneChangeStatus(({ data }) => {
  trigger.value = true;
})
onErrorChangeStatus((error) => {
  console.log('error', error)
  trigger.value = true;
})
const submitChangeStatus = (value: any) => {
  console.log('e', value)
  mutateChangeStatus({
    ...value
  })
}

</script>

<style lang="scss" scoped>
:deep(.dx-widget .dx-collection) {
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
  justify-content: center;
}
.checkbox {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
.month-container {
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  .month {
    border: 1px solid #bfbfbf;
    border-left: none;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    &:first-child {
      border-left: 1px solid #bfbfbf;
    }
    &.active {
      background-color: #d1e1f8;
    }
  }
}
:deep(.dx-checkbox-text) {
  width: 70px;
  height: 24px;
}
:deep(.checkbox-all) {
  height: 24px;
  .dx-checkbox-text {
    width: auto;
    height: 100%;
  }
}
</style>
