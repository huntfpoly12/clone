<template>
  <div>
    <div class="title">
      <span>{{ dataBudget?.budgetType === 4 ? `세입` : `세출` }} 예산서</span>
      <div class="d-flex-center">
        <a-tag :color="!dataBudget?.index ? `black` : `gray`">{{ !dataBudget?.index ? "본예산" : "추경" }}</a-tag>
        <span>{{ !dataBudget?.index ? '' : `${dataBudget?.index}차` }}</span>
      </div>
    </div>

    <a-row>
      <a-col span="17" class="table-left">
        <div class="d-flex-center justify-content-end mb-5">
          <DxButton type="default" @click="handleFillValuePreIndex" :disabled="dataBudget?.status !== 10" text="전예산액 불러오기" />
          </div>
        <a-spin :spinning="loading">
          <DxDataGrid :load-panel="false" :show-row-lines="true" :hoverStateEnabled="true" :show-borders="true" :data-source="dataSource"
            key-expr="code" :allow-column-reordering="move_column" :allow-column-resizing="column_resize"
            :column-auto-width="true" :focused-row-enabled="true" :focused-row-key="state.rowKey" :focusedRowIndex="state.rowIndex" @cell-prepared="onCellPrepared"
            @focused-row-changing="onFocusedRowChanging" @focused-row-changed="onFocusedRowChanged" noDataText="내역이 없습니다"
            style="max-height: 670px">
            <DxPaging :page-size="0" />

            <DxColumn :allow-sorting="false" caption="관" data-field="code1" cell-template="code1" width="100px" />
            <DxColumn :allow-sorting="false" caption="항" data-field="code2" cell-template="code2" width="100px"/>
            <DxColumn :allow-sorting="false" caption="목" data-field="code3" cell-template="code3" width="100px"/>
            <DxColumn :allow-sorting="false" caption="세목" data-field="codeName" width="100px"/>
            <DxColumn :allow-sorting="false" caption="세목코드" data-field="code" />
            <DxColumn :allow-sorting="false" :caption="Number(dataBudget?.index) > 0 ? `${Number(dataBudget?.index) - 1}차 추경` : `전년도`"
              cell-template="amountPreBudget" alignment="right" />
            <DxColumn :allow-sorting="false" :caption="Number(dataBudget?.index) > 0 ? `${Number(dataBudget?.index)}차 추경` : `당해년도`"
                      cell-template="amount"  alignment="right" />
            <DxColumn :allow-sorting="false" caption="증감액" cell-template="calculateAmount" alignment="right" />

            <DxColumn :allow-sorting="false" caption="증감비율(%)" cell-template="changeRate" alignment="right" />
            <DxColumn :allow-sorting="false" caption="자금원천" cell-template="sourceOfFunding" width="120px" />
            <DxColumn :allow-sorting="false" caption="산출내역" cell-template="outputRecord" />
            <DxColumn :allow-sorting="false" caption="비고" data-field="remark" cell-template="remark" width="50px"/>

            <template #code1="{ data }">
              <span :title="findCode('code1', data.data.code1)?.name1">{{ findCode('code1', data.data.code1)?.name1 }}</span>
            </template>
            <template #code2="{ data }">
              <span :title="findCode('code2', data.data.code2)?.name2">{{ findCode('code2', data.data.code2)?.name2 }}</span>
            </template>
            <template #code3="{ data }">
              <span :title="findCode('code3', data.data.code3)?.name3">{{ findCode('code3', data.data.code3)?.name3 }}</span>
            </template>
            <template #sourceOfFunding="{ data }">
              <tag-funding-source :fundingSource1="data.data.fundingSource1" :fundingSource2="data.data.fundingSource2"
                :fundingSource3="data.data.fundingSource3" :fundingSource4="data.data.fundingSource4" cssClass="d-flex-center justify-content-start gap-5" />
            </template>
            <template #amountPreBudget="{ data }">
              <div :class="data.data.previousAmount <= 0 && `text-red`">
              {{ filters.formatNumber(data.data.previousAmount) }}
              </div>
            </template>
            <template #amount="{data}">
              <div :class="data.data.amount <= 0 && `text-red`">
                {{filters.formatNumber(data.data.amount)}}
              </div>
            </template>
            <template #calculateAmount="{ data }">
              <div :class="( data.data.amount - data.data.previousAmount <= 0) && `text-red`">
                {{ filters.formatNumber( data.data.amount - data.data.previousAmount) }}
              </div>
            </template>

            <template #changeRate="{ data }">
              {{ filters.formatNumber(data.data.previousAmount ? (data.data.amount/data.data.previousAmount - 1)*100: 0, 2) }}
            </template>
            <template #outputRecord="{ data }">
              <a-tooltip>
                <template #title>
                  <div v-if="data.data && data.data.details?.length > 0">
                    <ul>
                      <li v-for="(row, index) in data.data.details" :key="index">
                        {{data.data.details.length > 1 ? `${index + 1}. ` : ''}}{{ row.detail }} {{ row.type === 1 ? '' : (row.calculationResult !== '' ? `= ${ filters.formatNumber(+row.calculationResult)}` : '') }}
                      </li>
                    </ul>
                  </div>
                </template>
                <div>
                  <div v-if="data.data && data.data.details?.length > 0">
                    <ul>
                      <li v-for="(row, index) in data.data.details" :key="index" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        {{data.data.details.length > 1 ? `${index + 1}. ` : ''}}{{ row.detail }} {{ row.type === 1 ? '' : (row.calculationResult !== '' ? `= ${ filters.formatNumber(+row.calculationResult)}` : '') }}
                      </li>
                    </ul>
                  </div>
                </div>
              </a-tooltip>
            </template>
            <template #remark="{data}">
              <span v-if="data.data.code1 === '501000000' && data.data.code2 === '501010000'" title="임직원보수일람표 반영">임직원보수일람표 반영</span>
            </template>
          </DxDataGrid>
        </a-spin>
      </a-col>
      <a-col span="7">
        <standard-form ref="formRef">
          <DxField label="계정과목">
            <default-text-box :value-input="`${formState.codeName} ${formState.code}`" disabled width="200px" />
          </DxField>
          <DxField :label="dataBudget?.index === 0 ? `전년도` : `${(dataBudget?.index || 0) - 1} 차 추경`">
            <div class="d-flex">
              <div class="d-flex-center">
                <number-box-money :disabled="dataBudget?.status === 20" class="flex-1 mr-5" :min="0" width="200px" format="#0,###"
                  v-model:valueInput="formState.previousAmount" />
                <a-tag v-if="formState.code2 === '501010000'">임직원보수일람표 반영</a-tag>
              </div>
            </div>
          </DxField>
          <DxField :label="dataBudget?.index === 0 ? `당해년도` : `${dataBudget?.index} 차 추경`">
            <div class="d-flex">
              <div class="d-flex-center">
                <number-box-money class="flex-1 mr-5" v-model:valueInput="formState.amount"
                  width="200px" format="#0,###"
                  :disabled="formState.code2 === '501010000'|| dataBudget?.status === 20" />
                <a-tag v-if="formState.code2 === '501010000'">임직원보수일람표 반영</a-tag>
                <info-tool-tip v-if="formState.code2 === '501010000'">인건비 관련 예산액은 [임직원보수일람표]의 금액이 반영되며, 수정불가입니다.
                </info-tool-tip>
              </div>
            </div>
          </DxField>
          <DxField v-if="formState.code2 === '501010000'">
            <div style="margin-left: 110px" >
              <a-tag color="black">인건비비율:
                {{ totalAmount ? filters.formatNumber( formState.amount * 100 / totalAmount, 1) : 0 }}%
              </a-tag>
              <span>(권장: {{ facilityBizTypeToNumber }}%)</span>
            </div>
          </DxField>
          <DxField label="증감액">
            <number-box-money :value="formState.amount - formState.previousAmount" format="#0,###" disabled
              width="200px" :textColor="formState.amount - formState.previousAmount < 0 ? 'red' : ''"/>
          </DxField>
          <DxField label="증감비율(%)">
            <number-box-money
              :value="formState.previousAmount ? Number(((formState.amount/formState.previousAmount) - 1)* 100).toFixed(2)  : Number(0).toFixed(2)"
              disabled width="200px" format="#0,###" :textColor="formState.amount - formState.previousAmount < 0 ? 'red' : ''" />
          </DxField>
          <DxField label="산출내역">
            <div class="d-flex">
              <div class="d-flex-center gap-10">
                <default-text-box
                  :value-input="formState?.details?.length > 0 ? formState.details.map((i: any) => (i.type === 1 ? `${i.detail}`: `${i.detail} ${i.calculationResult === '' ? '' : `= ${ filters.formatNumber(+i.calculationResult)}`} `)).join('; ') : ''"
                  disabled class="flex-1" width="200px" />
                <DxButton type="ghost" @click="handleOpenCalPopup">
                  <EditOutlined />
                </DxButton>
                <InfoToolTip>
                  <div v-if="formState.code2 === '501010000'">인건비 관련 예산액은 산출내역 입력시 계산된 금액과는 별개로, [임직원보수일람표] 의 금액이 반영됩니다.
                  </div>
                  <div v-else>산출내역 입력시 계산된 금액이 {{ dataBudget?.index === 0 ? `당해년도` : `${dataBudget?.index} 차 추경` }}에 자동 반영됩니다</div>
                </InfoToolTip>
              </div>
            </div>
          </DxField>

          <DxField>
            <div class="title d-flex-center">
              <div class="mr-10">자금원천 (계: {{ filters.formatNumber(summaryFundingSource) }})</div>
              <DxButton :focusStateEnabled="false" :text="summaryFundingSource === formState.amount ? 'O' : 'X'" :style="{
                backgroundColor: summaryFundingSource === formState.amount
                  ? '#337614'
                  : '#BB3835',
                color: 'white',
                padding: '0px 5px',
              }" />
            </div>
          </DxField>
          <DxField label="자부담">
            <div class="d-flex-center gap-10">
              <number-box-money :disabled="dataBudget?.status === 20" placeholder="" v-model:valueInput="formState.fundingSource1" width="200px" />
              <DxButton icon="back" type="default" :disabled="dataBudget?.status === 20"
                :text="`${dataBudget && dataBudget.index > 0 ? `${dataBudget.index} 차 추경` : `당해년도`} 예산액 입력`"
                @click="fillFundingSource('fundingSource1')" />
            </div>
          </DxField>
          <DxField label="수익사업">
            <div class="d-flex-center gap-10">
              <number-box-money :disabled="dataBudget?.status === 20" placeholder="" v-model:valueInput="formState.fundingSource2" width="200px" />
              <DxButton icon="back" type="default" :disabled="dataBudget?.status === 20"
                :text="`${dataBudget && dataBudget.index > 0 ? `${dataBudget.index} 차 추경` : `당해년도`} 예산액 입력`"
                @click="fillFundingSource('fundingSource2')" />
            </div>
          </DxField>
          <DxField label="보조금">
            <div class="d-flex-center gap-10">
              <number-box-money :disabled="dataBudget?.status === 20" placeholder="" v-model:valueInput="formState.fundingSource3" width="200px" />
              <DxButton icon="back" type="default" :disabled="dataBudget?.status === 20"
                :text="`${dataBudget && dataBudget.index > 0 ? `${dataBudget.index} 차 추경` : `당해년도`} 예산액 입력`"
                @click="fillFundingSource('fundingSource3')" />
            </div>
          </DxField>
          <DxField label="후원금">
            <div class="d-flex-center gap-10">
              <number-box-money :disabled="dataBudget?.status === 20" placeholder="" v-model:valueInput="formState.fundingSource4" width="200px" />
              <DxButton icon="back" type="default" :disabled="dataBudget?.status === 20"
                :text="`${dataBudget && dataBudget.index > 0 ? `${dataBudget.index} 차 추경` : `당해년도`} 예산액 입력`"
                @click="fillFundingSource('fundingSource4')" />
            </div>
          </DxField>
          <DxField>
            <div class="d-flex-center justify-content-center mt-20">
              <a-tooltip :trigger="summaryFundingSource === formState.amount ? '' : 'hover'" placement="bottom" color="white" overlay-class-name="text-tooltip" >
                <template #title>
                  {{ dataBudget?.index == 0 ? `당해년도` : `${dataBudget?.index}차 추경` }} 예산액 {{filters.formatNumber(formState.amount)}} 과 자금원천 합계 {{filters.formatNumber(summaryFundingSource)}} 는 일치해하지 않기에 저장불가합니다.
                </template>
                <div>
                  <DxButton type="default" :disabled="summaryFundingSource !== formState.amount || dataBudget?.status === 20" @click="handleSubmit"
                    text="저장" />
                </div>
              </a-tooltip>
            </div>
          </DxField>
        </standard-form>

      </a-col>
    </a-row>
    <CalculationDetailsPopup :visible="state.isPopupCalculateVisible" @close-popup="handleCloseCalPopup"
      @ok="handleCloseCalPopup" :data="formState?.details" />
    <a-modal :visible="state.modalFillDataPreIndex" :mask-closable="false" :footer="false" :closable="false" :width="500">
      <div>
        <div>최종차수(본예산인 경우 전년도 최종차수) 전임직원수일람표를 불러옵니다.</div><br />
        <div>이미 입력된 정보가 있더라도 새로 불러온 정보가 입력됩니다. </div><br />
        <div>그래도 불러오겠습니까?</div>
      </div>
      <div class="footer">
        <button-basic class="button-form-modal" text="아니요" :type="'default'" :mode="'outlined'"
          @onClick="closeModal" />
        <button-basic class="button-form-modal" text="네. 불러옵니다" :width="140" :type="'default'" :mode="'contained'"
          @onClick="filled" />
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { Message } from "@/configs/enum";
import mutations from '@/graphql/mutations/AC/AC5/AC520';
import queries from "@/graphql/queries/AC/AC5/AC520";
import { accountSubject, companyId } from "@/helpers/commonFunction";
import filters from '@/helpers/filters';
import notification from "@/utils/notification";
import CalculationDetailsPopup from "@/views/AC/AC5/AC520/components/CalculationDetailsPopup.vue";
import { ACTION, Budget, ComponentCreateBudget } from "@/views/AC/AC5/AC520/type";
import { EditOutlined } from '@ant-design/icons-vue';
import { useMutation, useQuery } from "@vue/apollo-composable";
import DxButton from "devextreme-vue/button";
import { DxColumn, DxDataGrid, DxPaging } from 'devextreme-vue/data-grid';
import DataSource from "devextreme/data/data_source";
import { FocusedRowChangedEvent } from "devextreme/ui/data_grid";
import { isEqual } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import { computed, reactive, ref, watch } from 'vue';
import { useStore } from "vuex";

const emit = defineEmits(['reload', 'closePopup']);
const store = useStore();
const move_column = computed(() => store.state.settings.move_column);
const column_resize = computed(() => store.state.settings.colomn_resize);
const dataBudget = computed<Budget | null>(() => store.getters["common/getDataBudget"]);

const typePopup = computed<ComponentCreateBudget>(() => store.getters['common/getTypeCreateBudget'])
const acYear = computed<number>(() => (parseInt(sessionStorage.getItem("acYear") ?? '0')))
const globalFacilityBizId = computed<number>(() => parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));
const facilityBizType = computed<number>(() => parseInt(sessionStorage.getItem("facilityBizType") ?? '0'));
const summaryFundingSource = computed(() => (+formState.value?.fundingSource1 || 0) + (+formState.value?.fundingSource2 || 0) + (+formState.value?.fundingSource3 || 0) + (+formState.value?.fundingSource4 || 0))
const dataPreIndexBudgets = computed(() => store.getters["common/getDataPreIndexBudget"])
const facilityBizTypeToNumber = computed(() => {
  switch (facilityBizType.value) {
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
const initialForm = {
  code: '0',
  code1: '0',
  code2: '0',
  code3: '0',
  amount: 0,
  previousAmount: 0,
  remark: null,
  fundingSource1: 0,
  fundingSource2: 0,
  fundingSource3: 0,
  fundingSource4: 0,
  details: [],
  codeName: ''
}
const formState = ref({...initialForm});
const previousRowData = ref();
const isChangedForm = computed(() => !isEqual(previousRowData.value, formState.value))
const dataSource = ref()
const codes = JSON.parse(sessionStorage.getItem("accountSubject") || '')?.[0]?.codes
const codesPreIndexBudget = ref()
const trigger = reactive({
  queryBudget: false,
  employeeTable: false,
  queryPreIndexBudget: false,
})
const arrCode1s = ref<any>([])
let dataCon = ref([])
const arrCode2s = ref<any>([])
const checkDataNewRow = computed(() => dataBudget.value?.action === ACTION.ADD && typePopup.value === ComponentCreateBudget.ExpenseAndRevenueBudget)
// create function find code in codes array
const findCode = (code: string, value: string) => {
  return codes?.find((item: any) => item[code] === value)
}
const state = reactive({
  isPopupCalculateVisible: false,
  modalFillDataPreIndex: false,
  rowKey: '',
  rowIndex: 0,
  rowKeyAction: '',

})
const totalAmount = ref(0)
const query = {
  companyId,
  fiscalYear: acYear.value,
  facilityBusinessId: globalFacilityBizId.value,
  index: dataBudget.value?.index,
  type: dataBudget.value?.budgetType,
}
const queryEmployeeTable = {
  companyId,
  fiscalYear: acYear.value,
  facilityBusinessId: globalFacilityBizId.value,
  index: dataBudget.value?.index,
}
const { onResult, onError, refetch, loading } = useQuery(queries.getBudget, query, () => ({
  fetchPolicy: "no-cache",
  enabled: trigger.queryBudget
}))

onResult(({ data }) => {
  if (data?.getBudget) {
    arrCode1s.value = []
    data.getBudget.records?.map((item: any) => {
      if (!arrCode1s.value.find((row: any) => row == item.code1))
        arrCode1s.value.push(item.code1)
    })
    console.log('data.getBudget,', dataBudget.value)
    dataSource.value = new DataSource({
      store: {
        type: "array",
        key: "code",
        data: data.getBudget.records?.map((item: any) => ({ ...item, codeName: findCode('code', item.code)?.name })) || []
      },
    })
    if(state.rowIndex === -1) {
      state.rowKey = state.rowKeyAction
      state.rowIndex = 0
    }
    trigger.queryBudget = false
  }
})
const { onResult: onResultPreIndexBudget, onError: onErrorPreIndexBudget } = useQuery(queries.getBudget, {
  ...query,
  fiscalYear: dataBudget.value?.index ? acYear.value : acYear.value - 1,
  index: dataBudget.value?.index ? dataBudget.value?.index - 1 : dataBudget.value?.index
}, () => ({
  fetchPolicy: "no-cache",
  enabled: trigger.queryPreIndexBudget
}))
onResultPreIndexBudget(({ data }) => {
  trigger.queryPreIndexBudget = false
  if (data?.getBudget?.records.length > 0) {
      // formState.value.amount = data?.getBudget?.records.find((item: any) => item.code === formState.value.code).amount
      if(dataBudget.value?.action === ACTION.ADD || dataBudget.value?.action === ACTION.EDIT && dataSource.value) {
        dataSource.value.items()?.map((item: any) => {
          const preIndexBudget =  data?.getBudget?.records.find((row: any) => row.code === item.code)
          if(preIndexBudget){
            if(item.code2 !== '501010000') {
              item.amount = preIndexBudget.amount
            }
            item.previousAmount = preIndexBudget.amount
          }
        })
      }
    codesPreIndexBudget.value = data?.getBudget?.records
  }
})

onErrorPreIndexBudget((error) => {
  if (error.message.includes('예산서가 존재하지 않습니다')) {
    console.log('error', error.message)
    formState.value.previousAmount = 0
    trigger.queryPreIndexBudget = false
  }
})

// create budget
const { mutate: createBudget, onDone: onDoneCreateBudget, onError: onErrorCreateBudget } = useMutation(mutations.createBudget)
onDoneCreateBudget(({ data }) => {
  if (data) {
    store.commit('common/setIsChangedFormAc520', false)
    notification('success', Message.getCommonMessage('101').message)
    emit('closePopup', false)
    loading.value = false
    emit('reload')
  }
})
onErrorCreateBudget((error) => {
  console.log('error', error)
  loading.value = false
})

// update budget
const { mutate: updateBudget, onDone: onDoneUpdateBudget, onError: onErrorUpdateBudget } = useMutation(mutations.updateBudget)
onDoneUpdateBudget(({ data }) => {
  if (data) {
    store.commit('common/setIsChangedFormAc520', false)
    notification('success', Message.getCommonMessage('101').message)
    emit('reload')
    loading.value = false
  }
})
onErrorUpdateBudget((error) => {
  console.log('error', error)
  loading.value = false
})

// watch
watch(() => formState.value.amount, (value) => {
  if(value) {
    totalAmount.value = dataSource.value.items().reduce((acc: any, cur: any) => {
      return acc + cur.amount
    }, 0)
  }
})

// watch code2
watch(() => [formState.value, codesPreIndexBudget.value], ([val, codesVal]) => {
  if (val.code2 === '501010000' && dataBudget.value?.action === ACTION.ADD) {
    formState.value.amount = 0

  } else if (val.code2 !== '501010000' && dataBudget.value?.action === ACTION.ADD) {
    // formState.value.amount = codesVal?.find((item: any) => item.code === val.code)?.amount || 0
    // formState.value.previousAmount = codesVal?.find((item: any) => item.code === val.code)?.amount || 0
  }
})
// watch triggerQueryBudget
watch(() => checkDataNewRow.value, (val: any) => {
  if (val) {
    if (dataPreIndexBudgets.value === null && dataBudget.value?.index === 0) {
      formState.value.previousAmount = 0
    }
    const budgets = codes?.filter((i: any) => i.classification === dataBudget.value?.budgetType)
    dataSource.value = new DataSource({
      store: {
        type: "array",
        key: "code",
        data: budgets?.map((item: any) => ({
          code: item.code,
          code1: item.code1,
          code2: item.code2,
          code3: item.code3,
          amount: 0,
          previousAmount: 0,
          remark: null,
          fundingSource1: null,
          fundingSource2: null,
          fundingSource3: null,
          details: null,
          codeName: item.name
        })) || []
      },
    })
    arrCode1s.value = []
    codes?.map((item: any) => {
      if (!arrCode1s.value.find((row: any) => row == item.code1))
        arrCode1s.value.push(item.code1)
    })
  } else {
    query.index = dataBudget.value?.index
    query.type = dataBudget.value?.budgetType
    queryEmployeeTable.index = dataBudget.value?.index
    trigger.queryBudget = true
    trigger.employeeTable = true
    if (dataBudget.value?.action === ACTION.EDIT) {
      if (dataBudget.value?.index === 0 && acYear.value <= 2023) return
      // trigger.queryPreIndexBudget = true
    }
  }
}, { deep: true, immediate: true })

watch(isChangedForm, (value) => {
  store.commit('common/setIsChangedFormAc520', value)
})
const handleOpenCalPopup = () => {
  state.isPopupCalculateVisible = true
}
const handleCloseCalPopup = (value: any) => {
  if (value) {
    formState.value.details = value
    if(formState.value.code2 !== '501010000')
    formState.value.amount = value.reduce((acc: any, cur: any) => {
      return acc + +cur.calculationResult || 0
    }, 0)
  }
  state.isPopupCalculateVisible = false
}
const onFocusedRowChanging = () => {
}
const onFocusedRowChanged = (e: FocusedRowChangedEvent) => {
  if(e.row?.data) {
    formState.value = e.row?.data;
    previousRowData.value = cloneDeep(e.row?.data);
  } else {
    // formState.value = {...initialForm}
  }
}
const handleSubmit = () => {
  const result = dataSource.value.items()?.map((item: any) => {
    const { codeName, ...rest } = item
    return rest
  })
  if (dataBudget.value?.action === ACTION.ADD && (dataBudget.value?.expenditureBudgetSum === null && dataBudget.value?.revenueBudgetSum === null)) {
    createBudget({
      companyId,
      fiscalYear: acYear.value,
      facilityBusinessId: globalFacilityBizId.value,
      index: dataBudget.value?.index,
      type: dataBudget.value?.budgetType,
      accounSubjectOrder: JSON.parse(sessionStorage.getItem("accountSubject") || '')[0].theOrder,
      inputs: result
    })
  } else {
    updateBudget({
      companyId,
      fiscalYear: acYear.value,
      facilityBusinessId: globalFacilityBizId.value,
      index: dataBudget.value?.index,
      type: dataBudget.value?.budgetType,
      inputs: result
    })
  }
  loading.value = true
}
const fillFundingSource = (field: string) => {
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
const onCellPrepared = (e: any) => {
  if (e.rowType === 'data') {
    if (e.columnIndex === 0) {
      if (arrCode1s.value.find((item: any) => item === e.value)) {
        arrCode1s.value = arrCode1s.value.filter((item: any) => item !== e.value);
        arrCode2s.value = dataSource.value.items()?.filter((item: any) => item.code1 === e.value)
        dataCon.value = dataSource.value.items()?.filter((item: any) => item.code1 === e.value)
        e.cellElement.rowSpan = dataCon.value?.length
        e.cellElement.style.borderBottom = '1px solid #ddd'
        e.cellElement.classList.add('dx-focused')
      } else {
        e.cellElement.style.display = 'none'
      }
    } else if (e.columnIndex === 1) {
      if (arrCode2s.value.find((item: any) => item.code2 === e.value)) {
        arrCode2s.value = arrCode2s.value.filter((item: any) => item.code2 !== e.value);
        e.cellElement.rowSpan = dataCon.value.filter((item: any) => item.code2 === e.value).length
        e.cellElement.style.borderBottom = '1px solid #ddd'
        e.cellElement.classList.add('dx-focused')
      } else {
        e.cellElement.style.display = 'none'
      }
    }
  }
}
const handleFillValuePreIndex = () => {
  state.modalFillDataPreIndex = true
}
const closeModal = () => {
  state.modalFillDataPreIndex = false
}
const filled = () => {
  trigger.queryPreIndexBudget = true
  state.modalFillDataPreIndex = false
}
</script>

<style scoped lang="scss">
.title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 5px 10px;
  background-color: #97c0e1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.table-left {
  padding: 10px;
  height: 700px;
}

.gap-5 {
  gap: 5px;
}
.gap-10 {
  gap: 10px;
}

:deep(.dx-button-content) {
  padding: 4px;
}

ul,
li {
  margin-bottom: 0;
  padding: 0;
}
.text-red {
  :deep(.dx-texteditor-input){
    color: red;
  }
    color: red;
}
</style>
<style lang="scss">
.text-tooltip {
  .ant-tooltip-inner {
    color: red;
  }
}
.footer {
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 10px;
  margin-top: 20px;
}
</style>
