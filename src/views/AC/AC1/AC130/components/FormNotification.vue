<template>
  <div class="form-notification">
    <BellOutlined style="font-size: 20px" v-if="!visible" class="form-notification-btnOpenNoti" @click="openNoti" />
    <a-drawer placement="left" :closable="false" :visible="visible" :get-container="false" width="100%"
      :style="{ position: 'absolute' }">
      <a-spin :spinning="firstLoadData">
        <div class="form-notification-wrapper">
          <div class="form-notification-wrapper-title">
            알림
          </div>
          <div v-if="listNotification.length" class="form-notification-wrapper-list" ref="refTimelineNoti">
            <a v-for="(noti, index) in listNotification" :key="index" :href="`#${noti.createdAt}`"
              class="form-notification-wrapper-list-items"
              :class="{ 'form-notification-wrapper-list-items-notseen': !noti.active }"
              @click="goToChatByNoti(noti)">
              <a-badge :dot="true" :offset="[-5, 33]" :status="noti?.online ? 'success' : 'error'" class="mr-5">
                <a-avatar shape="circle" size="large" style="backgroundColor: #1890ff">{{ noti.writerUser.name }}</a-avatar>
              </a-badge>
              <div class="form-notification-wrapper-list-items-item">
                <div class="form-notification-wrapper-list-items-item-infor">
                  <div class="form-notification-wrapper-list-items-item-infor-status">
                    <StatusChat :valueSelect="noti.expresstionType" :isSelect="false" />
                  </div>
                  <span class="form-notification-wrapper-list-items-item-infor-username"> {{ noti.writerUser.name }}</span>
                  <span class="form-notification-wrapper-list-items-item-infor-textConcat">댓글을 남겼습니다: </span>
                  <span class="form-notification-wrapper-list-items-item-infor-content">"{{ noti.content }}</span>"
                </div>
                <div class="form-notification-wrapper-list-items-item-time">{{ formatDate(noti.createdAt) }}</div>
              </div>
            </a>
          </div>
          <div v-else class="form-notification-wrapper-noData">
            통지 없음
          </div>
          <CommentOutlined style="font-size: 20px" class="form-notification-wrapper-btnOpenMessages" @click="closeNoti" />
        </div>
      </a-spin>
    </a-drawer>
    <FormChat :payload="payload" :data="listData" @refresh="refresh"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, nextTick } from 'vue'
import { getJwtObject } from "@bankda/jangbuda-common"
import { useMutation, useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC1/AC130";
import { CommentOutlined, BellOutlined } from "@ant-design/icons-vue";
import StatusChat from './StatusChat.vue'
import FormChat from "./FormChat.vue"
import { cloneDeep } from 'lodash';
export default defineComponent({
  props: {
    listNoti: {
      type: Array,
      default: []
    },
    payload: {
      type: Object,
      default: () => {}
    },
  },
  components: {
    CommentOutlined,
    BellOutlined,
    StatusChat,
    FormChat
  },
  setup(props, { emit }) {
    const token = ref(sessionStorage.getItem("token"))
    let jwtObject = getJwtObject(token.value!);
    const userId = jwtObject.userId

    const keyChatChannel = 'keyChatChannelCommon';
    const visible = ref(true)
    const listNotification = ref<any>([])
    const listData = ref<any>([])
    const refTimelineNoti: any = ref()
    const firstLoadData = ref(true)
    const page = ref(1)
    const rows = ref(50)

    const triggerGetAccountingClosingMessages = ref(false)

    watch(() => props.payload, (value) => {
      if(Object.keys(value).length) {
        triggerGetAccountingClosingMessages.value = true
      }
    },{
      deep: true,
      immediate: true,
    })

    const {
      onResult: onResGetAccountingClosingMessages,
      loading: loadinggetGetAccountingClosingMessages,
    } = useQuery(queries.getAccountingClosingMessages, {
      filter: {
        ...props.payload,
        page: page.value,
        rows: rows.value,
      }
    },
      () => ({
        enabled: triggerGetAccountingClosingMessages.value,
        fetchPolicy: "no-cache",
      }))
    onResGetAccountingClosingMessages((data) => {
      listNotification.value = data.data.getAccountingClosingMessages.datas.reverse()
      listData.value = cloneDeep(listNotification.value)
      triggerGetAccountingClosingMessages.value = false
      firstLoadData.value = false
      nextTick(() => {
        if(refTimelineNoti.value) {
          refTimelineNoti.value.scrollTop = 10000000
        }
      })
    })


    const goToChatByNoti = (noti: any) => {
      visible.value = false
    }

    const closeNoti = () => {
      visible.value = false
    }

    const openNoti = () => {
      visible.value = true
    }

    const formatDate = (timestamp: number) => {
      const date = new Date(timestamp)
      const month = date.getMonth()
      const day = date.getDate()
      return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${date.getHours()}:${date.getMinutes()}`
    }
    const refresh = () => {
      visible.value = true
      firstLoadData.value = true
      triggerGetAccountingClosingMessages.value = true
    }

    return {
      userId,
      refTimelineNoti,
      keyChatChannel,
      visible,
      listNotification,
      formatDate,
      closeNoti,
      openNoti,
      goToChatByNoti,
      firstLoadData,
      listData,
      loadinggetGetAccountingClosingMessages,
      refresh
    }
  },
})
</script>

<style lang="scss" scoped>
.form-notification {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  :deep .ant-drawer-body {
    padding: 10px;
  }

  &-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    &-title {
      text-align: center;
      font-size: 20px;
      padding-bottom: 5px;
    }

    &-list {
      flex-grow: 1;
      overflow-y: auto;

      &-items {
        display: flex;
        padding: 5px 10px;
        border-radius: 10px;
        border: 1px solid rgba(17, 17, 26, 0.1);
        margin: 2px 0;
        color: #333;
        cursor: pointer;
        overflow-x: hidden;

        &:hover {
          background-color: #6988af1a;
        }

        &-notseen {
          background-color: #6988af48;
        }

        &-item {
          margin-left: 5px;

          &-infor {
            display: flex;
            align-items: center;

            &-status {
              margin-right: 5px;
            }

            &-username {
              white-space: nowrap;
              font-size: 16px;
              line-height: 18px;
              font-weight: bold;
              color: #6989AF;
              margin-right: 10px;
            }

            &-textConcat {
              white-space: nowrap;
              margin-right: 10px;
            }

            &-content {
              flex-grow: 1;
              -webkit-box-orient: vertical;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: normal;
            }
          }

          &-time {
            font-size: 12px;
            color: #B7B7B7 !important;
          }
        }
      }
    }

    &-btnOpenMessages {
      position: absolute;
      top: 6px;
      right: 10px;
      cursor: pointer;
    }

    &-noData {
      text-align: center;
      margin-top: 100px;
      color: #B7B7B7;
    }
  }

  &-btnOpenNoti {
    position: absolute;
    left: 20px;
    top: 15px;
    z-index: 1;
  }
}
</style>

