<template>
  <div class="form-notification">
    <CloseOutlined v-if="!visible" class="form-notification-btnOpen" @click="openNoti" />
    <a-drawer placement="right" :closable="false" :visible="visible" :get-container="false" width="100%"
      :style="{ position: 'absolute' }">
      <div class="form-notification-wrapper">
        <div class="form-notification-wrapper-title">
          알림
        </div>
        <div class="form-notification-wrapper-list">
          <div class="form-notification-wrapper-list-items" v-for="(noti, index) in listNotification" :key="index"
            @click="goToChatByNoti">
            <a-badge :dot="true" :offset="[-5, 33]" :status="noti.online ? 'success' : 'error'" class="mr-5">
              <a-avatar shape="circle" size="large" style="backgroundColor: #1890ff">{{ noti.userName }}</a-avatar>
            </a-badge>
            <div class="form-notification-wrapper-list-items-info">
              <div class="form-notification-wrapper-list-items-info-content">
                <span class="form-notification-wrapper-list-items-info-content-status"> {{ noti.statusTab }}</span>
                <span class="form-notification-wrapper-list-items-info-content-username"> {{ noti.userName }}</span>
                <span>댓글을 남겼습니다: </span>
                <span class="form-notification-wrapper-list-items-info-content-content">"{{ noti.content }}"</span>
              </div>
              <div class="form-notification-wrapper-list-items-info-time">{{ formatDate(noti.createdAt) }}</div>
            </div>
          </div>
        </div>
        <CloseOutlined class="form-notification-wrapper-btnClose" @click="closeNoti" />
      </div>
    </a-drawer>
    <slot keyChatChannel="keyChatChannelCommon" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { CloseOutlined } from "@ant-design/icons-vue";
// import { databaseFirebase, storage } from "@/firebaseConfig";
// import {
//   ref as reffb,
//   push,
//   query,
//   onChildAdded,
//   onChildChanged,
//   onChildRemoved,
//   onValue,
//   child,
//   remove,
//   update,
//   limitToLast
// } from "firebase/database";
export default defineComponent({
  components: {
    CloseOutlined
  },
  setup(props, { emit }) {
    const keyChatChannel = 'keyChatChannelCommon';
    const visible = ref(false)
    const listNotification = ref([
      {
        userName: '유하람님이',
        statusTab: '일반',
        createdAt: new Date().getTime(),
        content: '확인하겠습니다',
        online: true
      },
      {
        userName: '김하나님이',
        statusTab: '일반',
        createdAt: new Date().getTime(),
        content: '“파일 업로드합니다',
        online: false
      },
      {
        userName: '김하나님이',
        statusTab: '일반',
        createdAt: new Date().getTime(),
        content: '안녕하세요',
        online: false
      }
    ])
    const firstLoadChat = ref(false)

    const goToChatByNoti = () => {
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

    // let chatListRef = reffb(databaseFirebase, keyChatChannel)

    const getListContentChat = () => {
      // onValue(
      //   chatListRef,
      //   (snapshot) => {
      //     const objList = snapshot.val()
      //     if(!objList){
      //       firstLoadChat.value = false
      //     }
      //     let arr = []
      //     for (const key in objList) {
      //       if(!objList[key]?.isDelete){
      //         arr.push({
      //           key: key,
      //           files: objList?.files || [],
      //           ...objList[key]
      //         })
      //       }
      //     }
      //     listNotification.value = arr
          
      //     nextTick(() => {
      //       formTimeline.value.scrollTop = 10000000
      //     })
          
      //     onChildAdded(query(chatListRef, limitToLast(1)), (data) => {
      //       if(!firstLoadChat.value) {
      //         listNotification.value.push({
      //           ...data.val(),
      //           key: data.key
      //         })
      //         // nextTick(() => {
      //         //   formTimeline.value.scrollTop = 10000000
      //         // })
      //       }
      //       firstLoadChat.value = false
      //     });
      //   },
      //   {
      //     onlyOnce: true,
      //   }
      // );
    };
    return {
      keyChatChannel,
      visible,
      listNotification,
      formatDate,
      closeNoti,
      openNoti,
      goToChatByNoti
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
        cursor: pointer;

        &:hover {
          background-color: #7e90a74f;
        }

        &-info {
          margin-left: 5px;

          &-content {
            display: flex;
            align-items: center;

            &-status {
              display: inline;
              padding: 0 10px;
              border-radius: 5px;
              font-size: 10px;
              margin-right: 5px;
              border: 1px solid rgba(17, 17, 26, 0.1);
            }

            &-username {
              font-size: 16px;
              line-height: 18px;
              font-weight: bold;
              color: #6989AF;
            }
          }

          &-time {
            font-size: 12px;
            color: #B7B7B7;
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
  }

  &-btnOpen {
    position: absolute;
    right: 15px;
    top: 15px;
  }
}</style>

