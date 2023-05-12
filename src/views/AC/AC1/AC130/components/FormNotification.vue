<template>
  <div class="form-notification">
    <CloseOutlined v-if="!visible" class="form-notification-btnOpen" @click="openNoti" />
    <a-drawer placement="left" :closable="false" :visible="visible" :get-container="false" width="100%"
      :style="{ position: 'absolute' }">
      <a-spin :spinning="firstLoadChat">
        <div class="form-notification-wrapper">
          <div class="form-notification-wrapper-title">
            알림
          </div>
          <div v-if="listNotification.length" ref="refTimelineNoti" class="form-notification-wrapper-list">
            <a v-for="(noti, index) in listNotification" :key="index" :href="`#${noti.key}`"
              class="form-notification-wrapper-list-items"
              :class="{ 'form-notification-wrapper-list-items-notseen': noti?.seen ? !noti.seen.includes(userId) : true }"
              @click="goToChatByNoti(noti)">
              <a-badge :dot="true" :offset="[-5, 33]" :status="noti?.online ? 'success' : 'error'" class="mr-5">
                <a-avatar shape="circle" size="large" style="backgroundColor: #1890ff">{{ noti.name }}</a-avatar>
              </a-badge>
              <div class="form-notification-wrapper-list-items-item">
                <div class="form-notification-wrapper-list-items-item-infor">
                  <div class="form-notification-wrapper-list-items-item-infor-status">
                    <StatusChat :valueSelect="index" :isSelect="false" />
                  </div>
                  <span class="form-notification-wrapper-list-items-item-infor-username"> {{ noti.name }}</span>
                  <span class="form-notification-wrapper-list-items-item-infor-textConcat">댓글을 남겼습니다: </span>
                  <span class="form-notification-wrapper-list-items-item-infor-content">"{{ noti.text }}</span>"
                </div>
                <div class="form-notification-wrapper-list-items-item-time">{{ formatDate(noti.createdAt) }}</div>
              </div>
            </a>
          </div>
          <div v-else class="form-notification-wrapper-noData">
            통지 없음
          </div>
          <CloseOutlined class="form-notification-wrapper-btnClose" @click="closeNoti" />
        </div>
      </a-spin>
    </a-drawer>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import { getJwtObject } from "@bankda/jangbuda-common";
import { CloseOutlined } from "@ant-design/icons-vue";
import { databaseFirebase, storage } from "@/firebaseConfig";
import {
  ref as reffb,
  push,
  set,
  query,
  update,
  onChildAdded,
  onChildChanged,
  onValue,
  limitToLast
} from "firebase/database";
import StatusChat from './StatusChat.vue'
export default defineComponent({
  components: {
    CloseOutlined,
    StatusChat
  },
  setup(props, { emit }) {
    const token = ref(sessionStorage.getItem("token"))
    let jwtObject = getJwtObject(token.value!);
    const userId = jwtObject.userId


    const keyChatChannel = 'keyChatChannelCommon';
    const visible = ref(true)
    const listNotification = ref<any>([])
    const refTimelineNoti: any = ref()
    const firstLoadChat = ref(true)

    const chatListRef = reffb(databaseFirebase, keyChatChannel)
    onMounted(() => {
      getListContentChat()
    })

    const getListContentChat = () => {
      onValue(
        chatListRef,
        (snapshot) => {
          const objList = snapshot.val()
          if (!objList) {
            firstLoadChat.value = false
          }
          let arr = []
          for (const key in objList) {
            if (!objList[key]?.isDelete && objList[key].userId !== userId) {
              arr.push({
                key: key,
                files: objList?.files || [],
                ...objList[key]
              })
            }
          }
          listNotification.value = arr

          onChildAdded(query(chatListRef, limitToLast(1)), (data) => {
            if (!firstLoadChat.value && data.val().userId !== userId) {
              listNotification.value.push({
                ...data.val(),
                key: data.key
              })
              nextTick(() => {
                refTimelineNoti.value.scrollTop = 10000000
              })
            } else {
              nextTick(() => {
                refTimelineNoti.value.scrollTo({
                  top: 10000000,
                  behavior: "instant",
                });
              })
            }
            firstLoadChat.value = false
          });
          onChildChanged(chatListRef, (data) => {
            const indexUpdate = listNotification.value.findIndex((chat: any) => chat.key === data.key)
            if (indexUpdate >= 0) {
              listNotification.value[indexUpdate] = {
                ...listNotification.value[indexUpdate],
                text: data.val().text,
                files: data.val().files,
                reply: data.val()?.reply ? data.val().reply : {},
                seen: data.val()?.seen ? data.val().seen : [],
              }
            }
          });
        },
        {
          onlyOnce: true,
        }
      );
    };


    const goToChatByNoti = (noti: any) => {
      visible.value = false
      if (noti?.seen && noti.seen.includes(userId)) return
      const updates: any = {};
      const payloadEdit = { ...noti, seen: noti?.seen ? [...noti.seen, userId] : [userId] }
      delete payloadEdit.key
      updates[`/${noti.key}`] = payloadEdit
      update(chatListRef, updates).then(() => {
      }).catch(() => {
        console.log('eeeeeeeee');
      }).finally(() => {
      })
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
      firstLoadChat
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

    &-btnClose {
      position: absolute;
      top: 6px;
      left: 10px;
      cursor: pointer;
    }

    &-noData {
      text-align: center;
      margin-top: 100px;
      color: #B7B7B7;
    }
  }

  &-btnOpen {
    position: absolute;
    right: 15px;
    top: 15px;
  }
}</style>

