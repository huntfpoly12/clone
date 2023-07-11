<template>
  <div class="wrapper">
    <a-spin :spinning="loading">
      <div v-if="dataSource.length" class="wrapper-content">
        <div v-for="data in dataSource" :key="data.cursor" class="question-container" @click="openRow && openRow(data.node)">
          <div class="d-flex-center gap-10">
            <ExpressionType :is-select="false" :value-select="data.node.expresstionType"/>
            <div class="font-bold">{{ data.node.writerCompactUser.name }}</div>
            <div class="time">{{ dayjs(data.node.writedAt).format('YYYY-MM-DD hh:mm:ss') }}</div>
            <div class="classification">{{data.node.classification}}</div>
          </div>
          <div class="truncate" style=" width: 250px;">{{ data.node.content }}</div>
        </div>
      </div>
      <div v-else>내역이 없습니다</div>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import {OpenRowKey, RecentAdminCommunicationMessages} from "@/views/CommunicationBoard/type";
import {useQuery} from "@vue/apollo-composable";
import getRecentAdminCommunicationMessages
  from "@/graphql/queries/BF/Communication-board/getRecentAdminCommunicationMessages";
import {inject, ref} from "vue";
import ExpressionType from "@/components/common/ExpressionType.vue";

const dataSource: any = ref<RecentAdminCommunicationMessages[]>([])

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

const {onResult, onError, loading, refetch} = useQuery(getRecentAdminCommunicationMessages, {
  filter: {
    first: 1000,
  }
})
onResult((result) => {
  dataSource.value = result?.data.getRecentAdminCommunicationMessages.edges || []
})
onError((error) => {
  console.log(error)
})
</script>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - 210px);
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
