<template>
  <div class="wrapper">
    <a-spin :spinning="loading">
      <div v-if="dataSource" class="wrapper-content">
        <div v-for="data in dataSource" :key="data.id" class="question-container" @click="openRow && openRow(data)">
          <div class="d-flex-center gap-10">
            <div :class="`tag ${getTag(data.expressionType).class}`">{{ getTag(data.expressionType).text }}</div>
            <div class="font-bold">id_{{ data.id }}</div>
            <div class="time">{{ dayjs(data.date).format('YYYY-MM-DD hh:mm:ss') }}</div>
            <div class="classification">회계-마감-(2023-05)</div>
          </div>
          <div class="truncate" style=" width: 250px;">{{ data.content }}</div>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { getFakeData } from "@/views/CommunicationBoard/utils";
import { inject, InjectionKey, ref } from "vue";
import dayjs from "dayjs";
import { DataRow, OpenRowKey } from "@/views/CommunicationBoard/type";

const dataSource = ref<DataRow[]>()
const loading = ref(false)

// fake run api call to get data from server and set to dataSource in 2s

function getData() {
  loading.value = true
  setTimeout(() => {
    dataSource.value = getFakeData()
    loading.value = false
  }, 500)
}

getData()
const getTag = (expressionType: number) => {
  switch (expressionType) {
    case 1:
      return {
        text: '문의',
        class: 'tag-inquiry'
      }
    case 2:
      return {
        text: '문의',
        class: 'tag-reply'
      }
    case 3:
      return {
        text: '문의',
        class: 'tag-alarm'
      }
    default:
      return {
        text: '', class: ''
      }
  }
}
const openRow = inject(OpenRowKey)
</script>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - 180px);
  width: 100%;
  padding: 10px;
  text-align: center;
  overflow-y: auto;
  .wrapper-content {
    height: 100%;
    text-align: start
  }
}
.question-container {
  border-bottom: 1px solid #807b7b;
  padding: 10px;
  &:hover {
    background-color: #eeeeee;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

}
.tag {
  color: #FFF;
  border-radius: 5px;
  padding: 5px 30px;
  font-size: 12px;
  font-weight: 500;

}

.tag-inquiry {
  background-color: #BB3835;
}

.tag-reply {
  background-color: #337614;
}

.tag-alarm {
  background-color: #ffc13c;
}
.font-bold {
  font-weight: 700;
}
.time {
  color: #bcbcc2ff;
  text-align: end;
  font-size: 11px;
  margin-right: 10px;
}

.classification {
  color: #bcbcc2ff;
  text-align: end;
  font-size: 11px;
}
</style>
