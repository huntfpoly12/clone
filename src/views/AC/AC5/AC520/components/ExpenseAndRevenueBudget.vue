<template>
  <div>
    <div class="title">임직원보수일람표</div>
    <a-row>
      <a-col span="16" class="table-left">
        <DxDataGrid
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :show-borders="true"
          :data-source="dataSource"
          key-expr="code"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
          :focused-row-enabled="true"
          :focusedRowIndex="0"
          @focused-row-changing="onFocusedRowChanging"
          @focused-row-changed="onFocusedRowChanged"
          noDataText="내역이 없습니다"
          style="max-height: 700px"
        >
          <DxPaging :page-size="0"/>

          <DxColumn caption="관" data-field="code1" cell-template="code1"/>
          <DxColumn caption="항" data-field="code2" cell-template="code2"/>
          <DxColumn caption="목" data-field="code3" cell-template="code3"/>
          <DxColumn caption="세목" data-field="codeName" />
          <DxColumn caption="세목코드" data-field="code" />
          <DxColumn :caption="dataBudget?.index ? `전년도` :`{해당차수}차 추경`" data-field="amount1"/>
          <DxColumn :caption="dataBudget?.index ? `당해년도` :`{해당차수}차 추경`" data-field="amount"/>
          <DxColumn caption="증감액" cell-template="calculateAmount"/>
          <template #calculateAmount="{data}">{{data.data.amount}}</template>

          <DxColumn caption="증감비율" data-field="Twelve"/>
          <DxColumn caption="자금원천" cell-template="sourceOfFunding" width="120px"/>
          <DxColumn caption="산출내역" data-field="details" cell-template="outputRecord"/>
          <DxColumn caption="비고" data-field="Five"/>

          <template #code1="{data}">
            <div>{{findCode('code1', data.data.code1).name1}}</div>
          </template>
          <template #code2="{data}">
            <div>{{findCode('code2', data.data.code2).name2}}</div>
          </template>
          <template #code3="{data}">
            <div>{{findCode('code3', data.data.code3).name3}}</div>
          </template>
          <template #sourceOfFunding="{data}">
            <tag-funding-source
              :fundingSource1="data.data.fundingSource1"
              :fundingSource2="data.data.fundingSource2"
              :fundingSource3="data.data.fundingSource3"
              :fundingSource4="data.data.fundingSource4"
            />
          </template>
          <template #outputRecord="{data}">
            <div v-if="data.data && data.data.details?.length > 0">
              <ul>
                <li v-for="(row, index) in data.data.details" :key="index">
                  <div class="d-flex">{{ row.detail }} - {{ row.calculationResult }}</div>
                </li>
              </ul>
            </div>
          </template>
        </DxDataGrid>
      </a-col>
      <a-col span="8">
        <standard-form ref="formRef">
          <DxField :label="dataBudget?.index ? `${dataBudget?.index - 1} 차 추경` : `전년도`">
            <default-text-box
              placeholder="${세목명} (${세목코드)}"
              :value="`${formState?.code}`"
              disabled
              width="120px"
            />
          </DxField>
          <DxField :label="dataBudget?.index ? `${dataBudget?.index - 1} 차 추경` : `당해년도`">
            <div class="d-flex">
              <div class="d-flex-center">
                <number-box-money
                  class="flex-1 mr-5"
                  :min="0"
                  width="120px"
                />
                <a-tag v-if="formState.code2 === '501010000'">임직원보수일람표 반영</a-tag>
              </div>
          </div>
          </DxField>
          <DxField :label="dataBudget?.index === 0 ? `전년도` : `${dataBudget?.index || 0 - 1}차 추경`">
            <div class="d-flex">
              <div class="d-flex-center">
                <number-box-money
                  class="flex-1 mr-5"
                  v-model:valueInput="formState.amount"
                  width="120px"
                  format="#0,###"
                  :disabled="formState.code2 === '501010000'"
                />
                <div class="mr-10" v-if="formState.code2 === '501010000'">
                  <a-tag color="black">인건비비율: {{ formState.amount ? filters.formatNumber(state.totalLaborCost * 100 / formState.amount) : 0 }}%</a-tag>
                  <span>(권장: {{ facilityBizTypeToNumber }}%)</span>
                </div>
                <a-tag v-if="formState.code2 === '501010000'">임직원보수일람표 반영</a-tag>
                <info-tool-tip v-if="formState.code2 === '501010000'">인건비 관련 예산액은 [임직원보수일람표]의 금액이 반영되며, 수정불가입니다.</info-tool-tip>
              </div>
            </div>

          </DxField>
          <DxField label="증감액">
            <number-box-money :value="formState.amount - state.amountPreYear" format="#0,###" disabled width="120px"/>
          </DxField>
          <DxField label="증감비율(%)">
            <number-box-money :value="state.amountPreYear ? (formState.amount - state.amountPreYear)/state.amountPreYear : 0" disabled width="120px" format="#0,###"/>
          </DxField>
          <DxField label="산출내역">
            <div class="d-flex">
              <div class="d-flex-center gap-10">
                <default-text-box :value="formState?.details?.length > 0 ? formState.details.map((i:any) => `${i.detail} ${i.amount}`).join('; ') : '' " disabled class="flex-1" width="120px"/>
                <DxButton type="ghost" @click="handleOpenCalPopup">
                  <EditOutlined/>
                </DxButton>
                <InfoToolTip>산출내역 입력시 계산된 금액이 ${현예산}에 자동 반영됩니다</InfoToolTip>
              </div>
            </div>
          </DxField>
          <div class="title d-flex-center" v-if="formState.code !== '0'">
            <div class="mr-10">자금원천 (계: {{ summaryFundingSource }}) </div>
            <DxButton :focusStateEnabled="false" :text="summaryFundingSource === formState.amount ? 'O' : 'X'"
                  :style="{
                    backgroundColor: summaryFundingSource === formState.amount
                      ? '#337614'
                      : '#BB3835',
                    color: 'white',
                    padding: '0px 5px',
                  }"/>
          </div>
          <DxField label="자부담">
            <div class="d-flex-center gap-10">
              <number-box-money placeholder="" v-model:valueInput="formState.fundingSource1"/>
              <DxButton icon="back" type="default" text="${현예산} 예산액 입력"

                @click="fillFundingSource('fundingSource1')"
              />
            </div>
          </DxField>
          <DxField label="수익사업">
            <div class="d-flex-center gap-10">
              <number-box-money placeholder="" v-model:valueInput="formState.fundingSource2"/>
              <DxButton icon="back" type="default" text="${현예산} 예산액 입력"

                @click="fillFundingSource('fundingSource2')"
              />
            </div>
          </DxField>
          <DxField label="보조금">
            <div class="d-flex-center gap-10">
              <number-box-money placeholder="" v-model:valueInput="formState.fundingSource3"/>
              <DxButton icon="back" type="default" text="${현예산} 예산액 입력"

                @click="fillFundingSource('fundingSource3')"
              />
            </div>
          </DxField>
          <DxField label="후원금">
            <div class="d-flex-center gap-10">
              <number-box-money placeholder="" v-model:valueInput="formState.fundingSource4"/>
              <DxButton icon="back" type="default" text="${현예산} 예산액 입력"
                @click="fillFundingSource('fundingSource4')"

              />
            </div>
          </DxField>
          <div class="wf-100 text-center mt-20" v-if="formState.code !== '0'">
            <DxButton type="default" :disabled="summaryFundingSource !== formState.amount" @click="handleSubmit" text="산출내역 저장"/>
          </div>
        </standard-form>

      </a-col>
    </a-row>
    <CalculationDetailsPopup
      :visible="state.isPopupCalculateVisible"
      :footer="null"
      @close-popup="handleCloseCalPopup"
      :handleOpenCalPopup="handleOpenCalPopup"
      @ok="handleCloseCalPopup"
      :data="formState?.details"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed, ComputedRef, reactive, ref, watch} from 'vue'
import {useStore} from "vuex";
import {DxColumn, DxDataGrid, DxPaging} from 'devextreme-vue/data-grid';
import {Budget} from "@/views/AC/AC5/AC520/type";
import {EditOutlined} from '@ant-design/icons-vue';
import DxButton from "devextreme-vue/button";
import CalculationDetailsPopup from "@/views/AC/AC5/AC520/components/CalculationDetailsPopup.vue";
import {FocusedRowChangedEvent} from "devextreme/ui/data_grid";
import cloneDeep from "lodash/cloneDeep";
import {useMutation, useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC5/AC520";
import {accountSubject, companyId} from "@/helpers/commonFunction";
import DataSource from "devextreme/data/data_source";
import filters from '@/helpers/filters';
import updateBudget from "@/graphql/mutations/AC/AC5/AC520/updateBudget";
import {Message} from "@/configs/enum";
import notification from "@/utils/notification";

const store = useStore();
const move_column = computed(() => store.state.settings.move_column);
const colomn_resize = computed(() => store.state.settings.colomn_resize);
const dataBudget: ComputedRef<Budget | null> = computed(() => store.getters["common/getDataBudget"]);
const typePopup: ComputedRef<boolean> = computed(() => store.getters['common/getTypeCreateBudget'])
const acYear = computed<number>(() => (parseInt(sessionStorage.getItem("acYear") ?? '0')))
const globalFacilityBizId = computed<number>(() => parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));
const summaryFundingSource = computed(() => +formState.value?.fundingSource1 + +formState.value?.fundingSource2 + +formState.value?.fundingSource3 + +formState.value?.fundingSource4)
const dataBudgetPreYear = computed(() => store.getters["common/getDataBudgetPreYear"])
const facilityBizTypeToNumber = computed(() => {
  switch (globalFacilityBizId.value) {
    case 1:
      return '49.0'
    case 2:
      return '86.6'
    case 3:
      return '86.6'
    case 4:
      return '60.9'
    case 5:
      return '50.1'
    case 6:
      return '59.3'
    default:
      return '49.0'
  }
})
const formState = ref({
  code: '0',
  code1: '0',
  code2: '0',
  code3: '0',
  amount: 0,
  remark: null,
  fundingSource1: 0,
  fundingSource2: 0,
  fundingSource3: 0,
  fundingSource4: 0,
  details: [],
});
const previousRowData = ref();

const dataSource = ref()
const codes = accountSubject?.[0]?.codes

// create function find code in codes array
const findCode = (code: string, value: string) => {
  return codes?.find((item: any) => item[code] === value)
}
const state = reactive({
  totalLaborCost: 0,
  amountPreYear: 0,
  isPopupCalculateVisible: false
})
const query = {
  companyId,
  fiscalYear: acYear.value,
  facilityBusinessId: globalFacilityBizId.value,
  index: dataBudget.value?.index,
  type: dataBudget.value?.budgetType,
}
const {onResult, onError} = useQuery(queries.getBudget, query, () => ({
  fetchPolicy: "no-cache",
}))

onResult(({data}) => {
  if (data?.getBudget) {
    dataSource.value =  new DataSource({
      store: {
        type: "array",
        key: "code",
        data: data.getBudget.records?.map((item: any) => ({...item, codeName: findCode('code', item.code).name})) || []
      },
    })
  }
})
const triggerQueryBudgetPreYear = computed(() => !!dataBudgetPreYear.value?.index)
const {onResult: onResultPreYear, onError: onErrorPreYear} = useQuery(queries.getBudget, {
  ...query,
  fiscalYear: acYear.value - 1,
  index: dataBudgetPreYear.value?.index || 0
}, () => ({
  fetchPolicy: "no-cache",
  enabled: triggerQueryBudgetPreYear.value
}))
onResultPreYear(({data}) => {
  // console.log('data', data)
})

onErrorPreYear((error) => {
  if(error.message.includes('예산서가 존재하지 않습니다')) {
    console.log('error', error.message)
    state.amountPreYear = 0
  }
})

// query onResultEmployeePayTable
const {onResult: onResultEmployeePayTable ,  onError: onErrorEmployeePayTable} = useQuery(queries.getEmployeePayTable, {
  companyId,
  fiscalYear: acYear.value ,
  facilityBusinessId: globalFacilityBizId.value,
  index: dataBudget.value?.index
},  () => ({
  fetchPolicy: "no-cache"
}))
onResultEmployeePayTable(({data}) => {
  if (data) {
    // console.log('data?.getEmployeePayTable?.items', data?.getEmployeePayTable)
    state.totalLaborCost = data?.getEmployeePayTable?.totalLaborCost
  }
})
// mutation
const {mutate, onDone: onDoneUpdateBudget, onError: onErrorUpdateBudget} = useMutation(updateBudget)
onDoneUpdateBudget(({data}) => {
  if (data) {
    dataSource.value.reload()
    notification('success', Message.getCommonMessage('101').message)
  }
})
onErrorUpdateBudget((error) => {
  console.log('error', error)
})
// watch code2
watch(() => formState.value, (val: any) => {
  if(val.code2 !== '501010000') {
    formState.value.amount = 4
  }
})
const handleOpenCalPopup = () => {
  state.isPopupCalculateVisible = true
}
const handleCloseCalPopup = (value: any) => {
  if (value) {
    formState.value.details = value
  }
  state.isPopupCalculateVisible = false
}
const onFocusedRowChanging = () => {
}
const onFocusedRowChanged = (e: FocusedRowChangedEvent) => {
  formState.value = e.row?.data;
  previousRowData.value = cloneDeep(e.row?.data);
}
const handleSubmit = () => {
  console.log('dataSource.value', dataSource.value.items())
  mutate({
    companyId,
    fiscalYear: acYear.value,
    facilityBusinessId: globalFacilityBizId.value,
    index: dataBudget.value?.index,
    type: dataBudget.value?.budgetType,
    inputs: dataSource.value.items()
  })
}
const fillFundingSource  = (field: string) => {
  switch (field) {
    case 'fundingSource1':
      return formState.value.fundingSource1 = formState.value.amount
    case 'fundingSource2':
      return formState.value.fundingSource2 = formState.value.amount
    case 'fundingSource3':
      return formState.value.fundingSource3 = formState.value.amount
    case 'fundingSource4':
      return formState.value.fundingSource4 = formState.value.amount
  }
}
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px 10px;
  background-color: #97c0e1;

}

.table-left {
  padding: 10px;
  height: 700px;
}

.gap-10 {
  gap: 10px;
}

:deep(.dx-button-content) {
  padding: 4px;
}

ul, li {
  margin-bottom: 0;
  padding: 0;
}
</style>
