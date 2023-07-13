<template>
  <div class="wrapper">
    <a-spin :spinning="loading || loadingRedirect">
      <div v-if="dataSource.length" class="wrapper-content">
        <div v-for="data in dataSource" :key="data.cursor" class="question-container"
             @click="openNotification(data.node)">
          <div class="d-flex-center gap-10">
            <ExpressionType :is-select="false" :value-select="data.node.expresstionType"/>
            <div :class='`font-bold ${data.node.writerCompactUser.type === `m` ? `text-blue` : ``}`'>
              {{ data.node.writerCompactUser.name }}
            </div>
            <div class="time">{{ dayjs(data.node.writedAt).format('YYYY-MM-DD hh:mm:ss') }}</div>
            <div class="classification">{{ data.node.classification }}</div>
            <div v-if="data.node.secret !== null && data.node.expresstionType === 2">
              <checkbox-basic label="비밀글" :value-checkbox="data.node.secret" disabled/>
            </div>
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
import {
  MessageDetail,
  MessageDetailAnswer,
  NodeNotification,
  OpenRowKey,
  RecentAdminCommunicationMessages
} from "@/views/CommunicationBoard/type";
import {useMutation, useQuery} from "@vue/apollo-composable";
import getRecentAdminCommunicationMessages
  from "@/graphql/queries/BF/Communication-board/getRecentAdminCommunicationMessages";
import {inject, reactive, ref} from "vue";
import ExpressionType from "@/components/common/ExpressionType.vue";
import {ISearchCompanyAccountingDeadlines} from "@/views/BF/BF5/BF510/types";
import {searchCompanyAccountingDeadlines} from "@/graphql/queries/BF/BF5/BF510";
import mutations from "@/graphql/mutations/AddToken";
import {ReloadOutlined} from "@ant-design/icons-vue";

const dataSource: any = ref<RecentAdminCommunicationMessages[]>([])
const openRow = inject(OpenRowKey)

const {onResult, loading, refetch} = useQuery(getRecentAdminCommunicationMessages, {
  filter: {
    first: 1000,
  }
})
onResult((result) => {
  dataSource.value = result?.data?.getRecentAdminCommunicationMessages.edges || []
})

const companyInfo = reactive({
  code: NaN,
  companyName: '',
  companyId: NaN,
  facilityBusinessId: 0,
  facilityBusinessName: '',
  month: 0,
  year: 0
})
const dataSearch = reactive<ISearchCompanyAccountingDeadlines>({
  fiscalYear: parseInt(dayjs().format('YYYY')),
  year: parseInt(dayjs().format('YYYY')),
  month: parseInt(dayjs().format('MM')),
  excludeCancel: true,
  salesRepresentativeId: null,
  manageUserId: null,
  statuses: [1, 10, 20, 30, 40]
})
const {result, onError} = useQuery(searchCompanyAccountingDeadlines, {
  filter: dataSearch
}, () => ({
  fetchPolicy: "no-cache",
}))
onError((error) => {
  console.log('%c error', 'color: red', error)
})

const {
  mutate,
  onDone,
  onError: customerLoginError,
  loading: loadingRedirect
} = useMutation(mutations.customerWorkLogin);
customerLoginError((error) => {
  console.log('%c error', 'color: red', error)
})
onDone((result) => {
  if (result) {
    const accessToken = result.data.customerWorkLogin.accessToken;
    const refreshToken = result.data.customerWorkLogin.refreshToken;
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const windowFeatures = `width=${width},height=${height},fullscreen=yes`;
    const currentUrl = window.location.origin.replace(/\/$/, '');
    const newTab = `${currentUrl}/ac-130?token=${accessToken}&refreshToken=${refreshToken}&companyId=${companyInfo.companyId}&companyName=${encodeURIComponent(companyInfo.companyName)}&facilityBizType=&globalFacilityBizId=${companyInfo.facilityBusinessId}&facilityBusinessName=${encodeURIComponent(companyInfo.facilityBusinessName)}&year=${companyInfo.year}&month=${companyInfo.month}&path=AC130&typeLogin=custom`
    window.open(newTab, '_blank', 'noopener=yes,noreferrer=yes,' + windowFeatures);
  }
})
const openNotification = (data: MessageDetail | MessageDetailAnswer | NodeNotification) => {
  if (data.expresstionType === 1 && result.value) {
    const companyDetail = result.value.searchCompanyAccountingDeadlines.find((item: any) => item.companyId === data.companyId)
    companyInfo.companyId = companyDetail!.companyId
    companyInfo.code = companyDetail!.code
    companyInfo.companyName = companyDetail!.name
    companyInfo.facilityBusinessId = (data as NodeNotification).facilityBusinessId
    companyInfo.facilityBusinessName = companyDetail!.compactAccountingProcesses.find((i: any) => i.facilityBusinessId === (data as NodeNotification).facilityBusinessId)!.facilityBusinessName
    companyInfo.month = (data as NodeNotification).month
    companyInfo.year = (data as NodeNotification).fiscalYear
    mutate({companyId: data.companyId})
    return
  }
  openRow && openRow(data)
}
const reloadDetail = () => {
  refetch()
}
defineExpose({
  reloadDetail
})
</script>

<style lang="scss" scoped>
@import "./../styles.scss";
.wrapper {
  height: calc(100vh - 210px);
  width: 100%;
  padding: 10px;
  text-align: center;
  overflow-y: auto;
  position: relative;
  .wrapper-content {
    height: 100%;
    text-align: start
  }
  ::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
    }
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

.text-blue {
  color: #1890ff;
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
