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
          v-model:focused-row-key="focusedRowKey"
          @focused-row-changing="onFocusedRowChanging"
          @focused-row-changed="onFocusedRowChanged"
          noDataText="내역이 없습니다"
          style="max-height: 700px"
        >
          <DxPaging :page-size="0"/>

          <DxColumn caption="관" data-field="code1"/>
          <DxColumn caption="항" data-field="code2"/>
          <DxColumn caption="목" data-field="code3"/>
          <DxColumn caption="세목" data-field="code11"/>
          <DxColumn caption="세목코드" data-field="code"/>
          <DxColumn :caption="dataBudget?.index ? `전년도` :`{해당차수}차 추경`" data-field="amount1"/>
          <DxColumn :caption="dataBudget?.index ? `당해년도` :`{해당차수}차 추경`" data-field="amount"/>
          <DxColumn caption="증감액" cell-template="calculateAmount"/>
          <template #calculateAmount="{data}">{{data.data.amount}}</template>

          <DxColumn caption="증감비율" data-field="Twelve"/>
          <DxColumn caption="자금원천" cell-template="sourceOfFunding"/>
          <DxColumn caption="산출내역" data-field="details" cell-template="outputRecord"/>
          <DxColumn caption="비고" data-field="Five"/>

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
                <li v-for="(row, index) in data.data.Thirteen" :key="index">
                  <div class="d-flex">{{ row.detail }} - {{ row.amount }}</div>
                </li>
              </ul>
            </div>
          </template>
        </DxDataGrid>
      </a-col>
      <a-col span="8">
        {{ dataBudget }}
        <standard-form ref="formRef">
          <DxField :label="dataBudget?.index ? `${dataBudget?.index - 1} 차 추경` : `전년도`">
            <default-text-box
              placeholder="${세목명} (${세목코드)}"
              :value="`${formState?.code}`"
              disabled
            />
          </DxField>
          <DxField :label="dataBudget?.index ? `${dataBudget?.index - 1} 차 추경` : `당해년도`">
            <div class="d-flex-center">
              <number-box-money
                class="flex-1 mr-5"
              />
              <a-tag>임직원보수일람표 반영</a-tag>
            </div>
          </DxField>
          <DxField :label="dataBudget?.index === 0 ? `전년도` : `${dataBudget?.index || 0 - 1}차 추경`">
            <div class="d-flex-center">
              <number-box-money
                class="flex-1 mr-5"
              />
              <a-tag color="black">인건비비율: ${비율}%</a-tag>
              <a-tag>임직원보수일람표 반영</a-tag>
              <info-tool-tip>인건비 관련 예산액은 [임직원보수일람표]의 금액이 반영되며, 수정불가입니다.</info-tool-tip>
            </div>
          </DxField>
          <DxField :label="dataBudget?.index === 0 ? `당해년도` : `${dataBudget?.index}차 추경`">
            <default-text-box placeholder="${증감액}" disabled/>
          </DxField>
          <DxField label="증감비율(%)">
            <default-text-box placeholder="${증감비율}" disabled/>
          </DxField>
          <DxField label="산출내역">
            <div class="d-flex-center gap-10">
              <default-text-box :value="formState?.Thirteen?.length>0 ? '${산출내역 저장 내용}' : '' " disabled class="flex-1"/>
              <DxButton type="ghost" @click="handleOpenCalPopup">
                <EditOutlined/>
              </DxButton>
              <InfoToolTip>산출내역 입력시 계산된 금액이 ${현예산}에 자동 반영됩니다</InfoToolTip>
            </div>
          </DxField>
          <div class="title">
            자금원천 (계: ${자금원천 합계}) ${ 일치 여부}
          </div>
          <DxField label="자부담">
            <div class="d-flex-center gap-10">
              <number-box-money placeholder=""/>
              <DxButton icon="back" type="default" text="${현예산} 예산액 입력"/>
            </div>
          </DxField>
          <DxField label="수익사업">
            <div class="d-flex-center gap-10">
              <number-box-money placeholder=""/>
              <DxButton icon="back" type="default" text="${현예산} 예산액 입력"/>
            </div>
          </DxField>
          <DxField label="보조금">
            <div class="d-flex-center gap-10">
              <number-box-money placeholder=""/>
              <DxButton icon="back" type="default" text="${현예산} 예산액 입력"/>
            </div>
          </DxField>
          <DxField label="후원금">
            <div class="d-flex-center gap-10">
              <number-box-money placeholder=""/>
              <DxButton icon="back" type="default" text="${현예산} 예산액 입력"/>
            </div>
          </DxField>
          <div class="wf-100 text-center mt-20">
            <DxButton type="default" @click="handleSubmit" text="산출내역 저장"/>
          </div>
        </standard-form>

      </a-col>
    </a-row>
    <CalculationDetailsPopup
      :visible="isPopupCalculateVisible"
      :footer="null"
      @close-popup="handleCloseCalPopup"
      :handleOpenCalPopup="handleOpenCalPopup"
      @ok="handleCloseCalPopup"
      :data="formState?.Thirteen"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed, ComputedRef, defineComponent, ref, watch} from 'vue'
import {useStore} from "vuex";
import {DxDataGrid, DxColumn, DxPaging} from 'devextreme-vue/data-grid';
import {Budget} from "@/views/AC/AC5/AC520/type";
import InfoToolTip from "@/views/AC/AC5/components/InfoToolTip.vue";
import {EditOutlined} from '@ant-design/icons-vue';
import DxButton from "devextreme-vue/button";
import CalculationDetailsPopup from "@/views/AC/AC5/AC520/components/CalculationDetailsPopup.vue";
import {FocusedRowChangedEvent} from "devextreme/ui/data_grid";
import cloneDeep from "lodash/cloneDeep";
import {useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC5/AC520";
import {companyId} from "@/helpers/commonFunction";
import DataSource from "devextreme/data/data_source";
import dayjs from "dayjs";

const store = useStore();
const move_column = computed(() => store.state.settings.move_column);
const colomn_resize = computed(() => store.state.settings.colomn_resize);
const dataBudget: ComputedRef<Budget | null> = computed(() => store.getters["common/getDataBudget"]);
const typePopup: ComputedRef<boolean> = computed(() => store.getters['common/getTypeCreateBudget'])
const globalFacilityBizId = computed<number>(() => parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));

const isPopupCalculateVisible = ref(false)
const focusedRowKey = ref<number>(0); // focused row key
const formState = ref();
const previousRowData = ref();
// create array have 10 item data
store.dispatch('settings/getAccountSubject', { companyId: companyId, fiscalYear: Number(dayjs().year()), facilityBizType: globalFacilityBizId.value })
const accountSubject = computed(() =>  store.getters["settings/accountSubjects"])
const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
const dataSource = ref()
const codes = computed(() => accountSubject.value[0]?.codes || null)
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
        data: data.getBudget.records || []
      },
    })
  }
})

const handleOpenCalPopup = () => {
  isPopupCalculateVisible.value = true
}
const handleCloseCalPopup = (value: any) => {
  if (value) {
    formState.value.Thirteen = value
  }
  isPopupCalculateVisible.value = false
}
const onFocusedRowChanging = () => {
}
const onFocusedRowChanged = (e: FocusedRowChangedEvent) => {
  formState.value = e.row?.data;
  previousRowData.value = cloneDeep(e.row?.data);
}
const handleSubmit = () => {
  console.log(formState.value)
}
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 0px 10px;
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
