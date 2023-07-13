<template>
  <div class="container">
    <div class="d-flex-center justify-content-between mb-20">
      <a-form-item label="결제예정연월">
        <month-picker-box v-model="month" width="100px"/>
      </a-form-item>
      <a-form-item label="결제예정일자">
        <date-time-box v-model:valueDate="date" width="150px"/>
      </a-form-item>
    </div>
    <div class="text-center mb-10">${결제예정연월(YYYY-MM)} 출금자료등록내역</div>
    <div class="table-container">
      <table>
        <thead>
        <tr>
          <th rowspan="1" style="min-width: 100px">결제예정일자</th>
          <th rowspan="1" style="min-width: 110px">출금자료내역수</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="data">
          <tr>
            <td>Yyyy-mm-dd</td>
            <td>asdasd</td>
          </tr>
          <tr>
            <td>450</td>
            <td>450</td>
          </tr>
        </template>
        <template v-else>
          <tr class="">
            <td colspan="2" style="height: 50px;color: #999; font-size: 14px;">내역이 없습니다</td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";
import DateTimeBox from "@/components/common/DateTimeBox.vue";

const month = ref<string>(dayjs().format("YYYYMM"));
const date = ref<string | null>(null);
const data = ref<any>('asdfadsf');
</script>

<style lang="scss" scoped>
.container {
  width: 500px;
  margin: 0 auto;

  .table-container {
    background-color: #5b80b9;

    table {
      width: 100%;
      border-collapse: collapse;
      border-bottom: none;
      border-left: none;
      border-right: none;
      border-top: none;
      table-layout: auto;

      th,
      tr,
      td {
        text-align: center !important;
      }

      th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        color: white;
      }

      td,
      th {
        border: 0.5px solid #ddd;
        height: 100%;
        white-space: normal;
      }

      tbody {
        background-color: rgb(233, 236, 243);
      }
    }
  }
}
</style>
