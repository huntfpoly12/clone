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
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
        >
          <DxColumn caption="관" data-field="Six"/>
          <DxColumn caption="항" data-field="Seven"/>
          <DxColumn caption="목" data-field="Eight"/>
          <DxColumn caption="세목" data-field="Nine"/>
          <DxColumn caption="세목코드" data-field="Ten"/>
          <DxColumn :caption="dataBudget?.budget ? `전년도` :`{해당차수}차 추경`" data-field="Two"/>
          <DxColumn :caption="dataBudget?.budget ? `당해년도` :`{해당차수}차 추경`" data-field="Three"/>
          <DxColumn caption="증감액" data-field="Eleven"/>
          <DxColumn caption="증감비율" data-field="Twelve"/>
          <DxColumn caption="자금원천" data-field="Four" cell-template="sourceOfFunding"/>
          <DxColumn caption="산출내역" data-field="Thirteen"/>
          <DxColumn caption="비고" data-field="Five"/>

          <template #sourceOfFunding="{data}">
            <tag-funding-source
              :selfFunding="Boolean(data.data.Four.selfFunding)"
              :revenueGeneratingBusiness="Boolean(data.data.Four.revenueGeneratingBusiness)"
              :subsidy="Boolean(data.data.Four.subsidy)"
              :donation="Boolean(data.data.Four.donation)"
            />
          </template>
        </DxDataGrid>
      </a-col>
      <a-col span="8">
        <standard-form ref="formRef">
          <DxField label="계정과목">
            <default-text-box
              placeholder="${세목명} (${세목코드)}"
              disabled
            />
          </DxField>
          <DxField label="계정과목">
            <div class="d-flex-center">
              <number-box-money
                class="flex-1 mr-5"
              />
              <a-tag>임직원보수일람표 반영</a-tag>
            </div>
          </DxField>
          <DxField label="${현예산}}">
            <div class="d-flex-center">
              <number-box-money
                class="flex-1 mr-5"
              />
              <a-tag color="black">인건비비율: ${비율}%</a-tag>
              <a-tag>임직원보수일람표 반영</a-tag>
              <info-tool-tip >인건비 관련 예산액은 [임직원보수일람표]의 금액이 반영되며, 수정불가입니다.</info-tool-tip>
            </div>
          </DxField>
          <DxField label="증감액">
           <default-text-box placeholder="${증감액}" disabled/>
          </DxField>
          <DxField label="증감비율(%)">
           <default-text-box placeholder="${증감비율}" disabled/>
          </DxField>
          <DxField label="산출내역">
            <div class="d-flex-center" style="gap: 10px">
              <default-text-box placeholder="" disabled class="flex-1"/>
              <DxButton type="ghost" @click="handleOpenCalPopup"><EditOutlined /></DxButton>
              <InfoToolTip>산출내역 입력시 계산된 금액이 ${현예산}에 자동 반영됩니다</InfoToolTip>
            </div>
          </DxField>
        </standard-form>

      </a-col>
    </a-row>
  <CalculationDetailsPopup
    :visible="isPopupCalculateVisible"
    :footer="null"
    @close-popup="handleCloseCalPopup"
    :handleOpenCalPopup="handleOpenCalPopup"
  />
  </div>
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, ref} from 'vue'
import {useStore} from "vuex";
import {DxDataGrid, DxColumn} from 'devextreme-vue/data-grid';
import {Budget} from "@/views/AC/AC5/AC520/type";
import TagFundingSource from "@/components/common/TagFundingSource.vue";
import DxField from "@/views/PA/PA8/components/DxField.vue"
import DefaultTextBox from "@/components/common/DefaultTextBox.vue";
import NumberBoxMoney from "@/components/common/NumberBoxMoney.vue";
import InfoToolTip from "@/views/AC/AC5/components/InfoToolTip.vue";
import {EditOutlined } from '@ant-design/icons-vue';
import DxButton from "devextreme-vue/button";
import CalculationDetailsPopup from "@/views/AC/AC5/AC520/components/CalculationDetailsPopup.vue";
export default defineComponent({
  components: {
    CalculationDetailsPopup,
    InfoToolTip,
    NumberBoxMoney,
    DefaultTextBox,
    TagFundingSource,
    DxDataGrid,
    DxColumn,
    DxField,
    EditOutlined,
    DxButton
  },
  setup() {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const dataBudget: ComputedRef<Budget | null> = computed(() => store.getters["ac520Module/getDataBudget"]);
    const typePopup: ComputedRef<boolean> = computed(() => store.getters['ac520Module/getTypeCreateBudget'])
    const isPopupCalculateVisible = ref(false)
    const data = [{
      Id: 1,
      Two: 2,
      Three: 3,
      Four: {selfFunding: 12, revenueGeneratingBusiness: null, subsidy: 1, donation: 2},
      Five: 5,
      Six: 6,
      Seven: 7,
      Eight: 8,
      Nine: 9,
      Ten: 10,
      Eleven: 11,
      Twelve: 12,
      Thirteen: 13
    }]
    const dataSource = ref(data)
    const handleOpenCalPopup = () => {
      isPopupCalculateVisible.value = true
    }
    const handleCloseCalPopup = () => {
      isPopupCalculateVisible.value = false
    }
    return {
      move_column,
      colomn_resize,
      dataSource,
      dataBudget,
      isPopupCalculateVisible,
      handleOpenCalPopup,
      handleCloseCalPopup
    }
  }
})
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
</style>
