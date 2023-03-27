<template>
  <action-header title="통장 관리" :buttonDelete="false" />
  <div class="ac-560">
    <div class="ac-560-month">
      <span class="ac-560-month-period">기간</span>
      <OnlyMonthPickerBox class="mr-5" v-model:valueMonth="monthStart" />
      <button-basic mode="contained" type="danger" text="조정중" />
      <span class="mr-5 ml-5">~</span>
      <OnlyMonthPickerBox class="mr-5" v-model:valueMonth="monthEnd" />
      <button-basic mode="contained" type="default" text="입력중" />
      <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
      <span class="style-note style-note-cm121">조정마감된 월만 해당 (조정마감이 아닌 월은 제외).</span>
    </div>
    <div class="ac-560-formatting">
      <p class="ac-560-formatting-title">서식설정</p>
      <div class="ac-560-formatting-option">
        <span class="ac-560-formatting-option-label">산출명세:</span>
        <checkbox-basic class="mr-10" label="월별 합계 금액 및 건수" :disabled="false" :size="'20'" />
        <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
        <span class="style-note style-note-cm121">산출명세 컬럼에 월별 합계 금액 및 건수가 기재됩니다. 모두 해제시 공란으로 표시됩니다.</span>
      </div>
    </div>
    <div class="ac-560-table">
      <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :show-borders="true" :data-source="dataSource"
        :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true">
        <DxScrolling mode="standard" show-scrollbar="always" />
        <DxColumn caption="서식" data-field="fill"></DxColumn>
        <DxColumn caption="메일/출력" width="100px" cell-template="action" />
        <template #action="{}">
          <div class="custom-action" style="text-align: center;">
            <img src="@/assets/images/email.svg" alt="" style="width: 25px; margin-right: 3px; cursor: pointer;" />
            <a-tooltip>
              <template #title>출력 / 저장</template>
              <img src="@/assets/images/print.svg" alt="" style="width: 25px;cursor: pointer" />
            </a-tooltip>
          </div>
        </template>
      </DxDataGrid>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { DxDataGrid, DxColumn, DxScrolling } from "devextreme-vue/data-grid";
import OnlyMonthPickerBox from '../components/OnlyMonthPickerBox.vue'
export default defineComponent({
  components: {
    OnlyMonthPickerBox,
    DxDataGrid, DxColumn, DxScrolling
  },
  setup() {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    let monthStart = ref(5)
    let monthEnd = ref(9)
    const dataSource: any = ref([
      {
        id: 1,
        fill: '01'
      },
      {
        id: 2,
        fill: '02'
      },
      {
        id: 3,
        fill: '03'
      }
    ])
    return {
      move_column,
      colomn_resize,
      dataSource,
      monthStart,
      monthEnd
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
