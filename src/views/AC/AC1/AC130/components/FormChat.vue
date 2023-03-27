<template>
  <div class="form-chat">
    <div ref="formTimeline" class="form-chat-timeline">
      <div v-for="(items, index) in listChat" :key="index">
        <div class="form-chat-timeline-common"
          :class="items.name === userName ? 'form-chat-timeline-right' : 'form-chat-timeline-left'">
          <img class="form-chat-timeline-avatar" :src="items.avatar" alt="">
          <div class="form-chat-timeline-content">
            <div class="form-chat-timeline-content-info">
              <div class="form-chat-timeline-content-info-user">
                <span class="form-chat-timeline-content-info-user-status">{{ items.status }}</span>
                <div class="form-chat-timeline-content-info-user-name">{{ items.name }}</div>
              </div>
              <div class="form-chat-timeline-content-info-time">{{ items.createdAt }}</div>
            </div>
            <div class="form-chat-timeline-content-text">
              {{ items.content }}
            </div>
          </div>
          <div class="form-chat-timeline-common-menu">
            <a-dropdown :placement="items.name === userName ? 'bottomRight' : 'bottomLeft'" :trigger="['click']">
              <EllipsisOutlined :style="{ fontSize: '16px' }" />
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <EditOutlined />
                    수정
                  </a-menu-item>
                  <a-menu-item>
                    <DeleteOutlined />
                    삭제
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="form-chat-bottom">
      <img class="form-chat-bottom-avatar"
        src="https://vtv1.mediacdn.vn/thumb_w/650/2022/12/9/photo-1-16705558997871835381431-crop-1670555912188795621879.jpg"
        alt="" />
      <div class="form-chat-bottom-input">
        <input type="text" ref="inputChat" placeholder="Message..." v-model="textChat" @input="changeInput" @keypress.enter="sendChat" />
        <div class="form-chat-bottom-input-tool">
          <CloseOutlined />
          <SmileOutlined style="margin: 0 5px;"/>
          <FileAddOutlined />
        </div>
      </div>
      <SendOutlined class="form-chat-bottom-send" @click="sendChat"/>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, nextTick, onMounted,reactive, watch, computed } from 'vue'
import { EllipsisOutlined, EditOutlined, DeleteOutlined, CloseOutlined, SmileOutlined, FileAddOutlined, SendOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    EllipsisOutlined,
    EditOutlined,
    DeleteOutlined,
    CloseOutlined,
    SmileOutlined,
    FileAddOutlined,
    SendOutlined
  },
  setup(props, { emit }) {
    const userName = ref(sessionStorage.getItem("username"));
    let textChat = ref('')
    const formTimeline:any = ref()
    const inputChat:any = ref()
    const payload = {
      id: userName.value,
        name: userName.value,
        avatar: 'https://vtv1.mediacdn.vn/thumb_w/650/2022/12/9/photo-1-16705558997871835381431-crop-1670555912188795621879.jpg',
        content: '',
        createdAt: '2023-03-08  03:00:00',
        status: '일반'
    }
    const listChat = ref([
      {
        id: '11111111',
        name: 'other users',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/220px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg',
        content: 'Hello Hello Hello Hello ...Hello Hello Hello Hello ...Hello Hello Hello Hello ...Hello Hello Hello Hello ...Hello Hello Hello Hello ...Hello Hello Hello Hello ',
        createdAt: '2023-03-08  03:00:00',
        status: '일반'
      },
      {
        id: '11111111',
        name: 'other users',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/220px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg',
        content: 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmHello Hello Hello Helloc',
        createdAt: '2023-03-08  03:00:00',
        status: '일반'
      },
      {
        id: userName.value,
        name: userName.value,
        avatar: 'https://vtv1.mediacdn.vn/thumb_w/650/2022/12/9/photo-1-16705558997871835381431-crop-1670555912188795621879.jpg',
        content: 'Hello Hello Hello Hello ...',
        createdAt: '2023-03-08  03:00:00',
        status: '일반'
      },
      {
        id: '11111111',
        name: 'other users',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/220px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg',
        content: 'Hello Hello Hello Hello ffffffff',
        createdAt: '2023-03-08  03:00:00',
        status: '일반'
      },
      {
        id: userName.value,
        name: userName.value,
        avatar: 'https://vtv1.mediacdn.vn/thumb_w/650/2022/12/9/photo-1-16705558997871835381431-crop-1670555912188795621879.jpg',
        content: 'Hello Hello Hello Hello ',
        createdAt: '2023-03-08  03:00:00',
        status: '일반'
      }, {
        id: '11111111',
        name: 'other users',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/220px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg',
        content: 'Hello Hello Hello Hello ...Hello Hello Hello Hello ...Hello Hello Hello Hello ...Hello Hello Hello Hello ...Hello Hello Hello Hello ...Hello Hello Hello Hello ...',
        createdAt: '2023-03-08  03:00:00',
        status: '일반'
      },
      {
        id: '11111111',
        name: 'other users',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/220px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg',
        content: 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmHello Hello Hello Hello ...c',
        createdAt: '2023-03-08  03:00:00',
        status: '일반'
      },
      {
        id: userName.value,
        name: userName.value,
        avatar: 'https://vtv1.mediacdn.vn/thumb_w/650/2022/12/9/photo-1-16705558997871835381431-crop-1670555912188795621879.jpg',
        content: 'Hello Hello Hello Hello :)))))))))))))))))))',
        createdAt: '2023-03-08  03:00:00',
        status: '일반'
      },
      {
        id: '11111111',
        name: 'other users',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/220px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg',
        content: 'Hello Hello Hello Hello +ggggggggggggggggggggg',
        createdAt: '2023-03-08  03:00:00',
        status: '일반'
      },
      {
        id: userName.value,
        name: userName.value,
        avatar: 'https://vtv1.mediacdn.vn/thumb_w/650/2022/12/9/photo-1-16705558997871835381431-crop-1670555912188795621879.jpg',
        content: 'Hello Hello Hello Hello ',
        createdAt: '2023-03-08  03:00:00',
        status: '일반'
      }
    ])

    onMounted(() => {
      nextTick(() => {
        formTimeline.value.scrollTop = 10000000
      })
    })
    const sendChat = () => {
      if(!textChat.value.trim()) return
      listChat.value.push({...payload, content: textChat.value})
      textChat.value = ''
      nextTick(() => {
        formTimeline.value.scrollTop = 10000000
      })
    }
    const changeInput = (event: any) => {
      // const style = getComputedStyle(event.target, null);
      // const verticalBorders = Math.round(parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth));
      // const maxHeight = parseFloat(style.maxHeight) || 100;
      // event.target.style.height = "auto";
      // const newHeight = event.target.scrollHeight + verticalBorders;
      // event.target.style.overflowY = newHeight > maxHeight ? "auto" : "hidden";
      // event.target.style.height = Math.min(newHeight, maxHeight) + "px";
    }
    return {
      userName,
      listChat,
      changeInput,
      sendChat,
      textChat,
      formTimeline,
      inputChat
    }
  },
})
</script>

<style lang="scss" scoped>
.form-chat {
  height: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;

  &-timeline {
    flex-grow: 1;
    height: calc(100% - 40px);
    padding-bottom: 10px;
    overflow-y: auto;

    &-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    }

    &-common {
      margin-top: 5px;
      display: flex;
      align-items: flex-start;

      &-menu {
        margin: 0 5px;
      }
    }

    &-left {
      display: flex;

      .form-chat-timeline-avatar {
        margin-right: 10px;
      }
    }

    &-right {
      display: flex;
      justify-content: end;
      flex-direction: row-reverse;

      .form-chat-timeline-avatar {
        margin-left: 10px;
      }
    }

    &-content {
      max-width: 70%;
      background-color: #DCE6F2;
      border-radius: 10px;
      padding: 5px 12px 8px 12px;

      &-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-user {
          display: flex;
          align-items: center;
          margin-right: 30px;

          &-status {
            display: inline;
            padding: 0 10px;
            border-radius: 5px;
            background-color: #ffffff;
            font-size: 10px;
            margin-right: 5px;
          }

          &-name {
            font-size: 16px;
            font-weight: bold;
          }
        }

        &-time {
          color: #333;
          text-align: end;
          font-size: 11px;
        }
      }

      &-text {
        word-wrap: break-word;
        font-size: 15px;
        color: #333333;
      }
    }
  }

  &-bottom {
    display: flex;
    align-items: flex-start;

    &-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
      margin-right: 5px;
    }

    &-input {
      flex-grow: 1;
      position: relative;
      input {
        scrollbar-width: thin;
        outline: none;
        resize: none;
        border: 1px solid rgb(105, 98, 98);
        width: 100%;
        height: 36px;
        min-height: 36px;
        max-height: 200px;
        border-radius: 15px;
        padding: 5px 75px 5px 10px;
        width: 100%;
        font-size: 15px;
      }
      &-tool {
        position: absolute;
        right: 5px;
        top: 7px;
        .anticon  {
          font-size: 18px;
          cursor: pointer;
        }
      }
    }

    &-send {
      padding-top: 7px;
      font-size: 20px;
      margin-left: 8px;
      cursor: pointer;
      color: rgb(22, 90, 238);
    }
  }
}

.mt-10 {
  margin-top: 10px;
}
</style>

