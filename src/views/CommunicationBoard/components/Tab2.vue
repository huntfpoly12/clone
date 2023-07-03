<template>
  <div>
    <div class="d-flex-center justify-content-end">
      <DxButton>
        <SearchOutlined :style="{fontSize: '17px', color: 'black'}"/>
        조회
      </DxButton>
      <DxButton>
        <SaveOutlined :style="{fontSize: '17px', color: 'black'}"/>
        저장
      </DxButton>
      <DxButton>
        <DeleteOutlined :style="{fontSize: '17px', color: 'black'}"/>
        삭제
      </DxButton>
      <DxButton>
        <PrinterOutlined :style="{fontSize: '17px', color: 'black'}"/>
        인쇄
      </DxButton>
    </div>
    <a-row>
      <a-col :span="14">
        <DxDataGrid
            :show-row-lines="true"
            :hoverStateEnabled="true"
            :data-source="dataSource"
            :show-borders="true"
            :allow-column-resizing="true"
            column-auto-width
            noDataText="내역이 없습니다"
            style="height: calc(100vh - 200px);"
        >
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색"/>
          <DxExport :enabled="true"/>
          <DxToolbar>
            <DxItem location="before" template="search"/>
            <DxItem location="after" name="exportButton" css-class="cell-button-export"/>
            <DxItem location="after" name="searchPanel" cssClass="search-panel"/>
          </DxToolbar>
          <template #search>
            <div class="d-flex-center gap-20">
              <a-form-item label="문의">
                <checkbox-basic label="답글O" v-model:valueCheckbox="search.replyO"/>
                <checkbox-basic label="답글X" v-model:valueCheckbox="search.replyX"/>
              </a-form-item>
              <a-form-item label="작성기간 (최대 3월)">
                <range-date-time-box v-model:valueDate="rangeDate" width="250px" :multi-calendars="true"
                                     :max-range="90"/>
                <info-tool-tip>문의글 기준</info-tool-tip>
              </a-form-item>
              <div class="d-flex-center">
                <checkbox-basic label="삭제 포함"/>
              </div>
            </div>
          </template>
          <DxColumn caption="삭제 여부" data-field="delete" alignment="end"/>
          <DxColumn caption="구분" data-field="division" alignment="end"/>
          <DxColumn caption="사업자코드" data-field="active" alignment="center" cell-template="active"/>
          <DxColumn caption="상호" data-field="mutual" alignment="center"/>
          <DxColumn caption="주소" data-field="address" alignment="center"/>
          <DxColumn caption="분류" data-field="classification" alignment="center"/>
          <DxColumn caption="문의내용" data-field="contentOfInquiry" alignment="center"/>
          <DxColumn caption="작성자" data-field="writer" alignment="center"/>
          <DxColumn caption="작성일시" data-field="dateOfCreation" alignment="center"/>
          <DxColumn caption="답변내용" data-field="answerContent" alignment="center"/>
          <DxColumn caption="답변자" data-field="answerer" alignment="center"/>
          <DxColumn caption="답변일시" data-field="replyDateAndTime" alignment="center"/>

          <template #active="{data}">
            <div v-if="data.data.active">
              <a-tag color="red">해지</a-tag>
            </div>
          </template>
        </DxDataGrid>
      </a-col>
      <a-col :span="10">

      </a-col>
    </a-row>

  </div>
</template>

<script setup lang="ts">
import { inject, reactive, ref } from "vue";
import {
  DxColumn,
  DxDataGrid,
  DxExport,
  DxItem,
  DxScrolling,
  DxSearchPanel,
  DxToolbar
} from "devextreme-vue/data-grid";
import dayjs from "dayjs";
import InfoToolTip from "@/components/common/InfoToolTip.vue";
import DxButton from "devextreme-vue/button";
import { DeleteOutlined, PrinterOutlined, SaveOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { DataRowKey } from "@/views/CommunicationBoard/type";

const dataRow = inject(DataRowKey)
console.log('%c dataRow', 'color: red', dataRow)
const search = reactive({
  replyX: true,
  replyO: true,
})
const rangeDate = ref([parseInt(dayjs().format("YYYYMMDD")), parseInt(dayjs().add(3, "month").format("YYYYMMDD"))])
const dataSource = ref([
  {
    delete: '',
    division: '',
    active: true,
    mutual: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur doloremque earum',
    address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur doloremque earum',
    classification: '',
    contentOfInquiry: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur doloremque earum',
    writer: '',
    dateOfCreation: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    answerContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur doloremque earum eum labore magnam possimus provident recusandae saepe totam?',
    answerer: '',
    replyDateAndTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  }
])
</script>

<style scoped>
.justify-content-end {
  justify-content: flex-end;
}

:deep(.ant-form-item-control-input-content) {
  display: flex;
  align-items: center;
}
</style>
