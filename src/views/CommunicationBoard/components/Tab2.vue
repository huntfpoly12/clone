<template>
  <div>
    <div class="d-flex-center justify-content-end gap-10 mb-10">
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
    <a-row :gutter="12">
      <a-col :span="14">
        <DxDataGrid
            :show-row-lines="true"
            :hoverStateEnabled="true"
            :data-source="dataSource"
            :show-borders="true"
            :allow-column-resizing="true"
            column-auto-width
            noDataText="내역이 없습니다"
            style="height: calc(100vh - 210px);"
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
      <a-col :span="10" class="form-container">
        <div class="form-chat">
          <!--          <div v-if="loadinggetGetAccountingClosingMessages || loading" class="form-chat-loading">-->
          <!--            <a-spin size="large"/>-->
          <!--          </div>-->
          <div ref="formTimeline" class="form-chat-timeline">
            <div v-for="(item, index) in listChat" :key="index">
              <div v-if="index > 0" class="form-chat-timeline-line"/>
              <div v-if="index >= 0" class="form-chat-timeline-common">
                <div class="form-chat-timeline-content">
                  <div class="form-chat-timeline-content-info">
                    <div class="d-flex-center">
                      <div class="form-chat-timeline-content-info-user">
                        <div class="form-chat-timeline-content-info-user-status">
                          <StatusChat :valueSelect="item.expresstionType" :isSelect="false"/>
                        </div>
                        <div class="form-chat-timeline-content-info-user-name"
                             :class="{ 'form-chat-timeline-content-info-user-name-login': item.writerUser.id === userId }">
                          {{
                            item.writerUser.name
                          }}
                        </div>
                      </div>
                      <div class="form-chat-timeline-content-info-time">
                        {{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
                      </div>
                      <div class="form-chat-timeline-content-info-classification">{{ item.classification }}</div>
                    </div>
                    <div>
                      <DxButton type="ghost">
                        <EditOutlined/>
                      </DxButton>
                      <DxButton type="ghost" @click="handleDeleteQA(item)">
                        <DeleteOutlined/>
                      </DxButton>
                    </div>
                  </div>
                  <div class="form-chat-timeline-content-background">
                    <div class="form-chat-timeline-content-text">
                      <MarkdownCustom
                          :options="{ source: item.content || '', linkify: true, typographer: true, highlight: true }"/>
                    </div>
                    <div v-if="item?.files && item?.files?.length" class="form-chat-timeline-content-files">
                      <div class="form-chat-timeline-content-files-preview">
                        <div class="form-chat-timeline-content-files-preview-images">
                          <img v-for="(file, indexFile) in item.files.filter((file: any) => isImgLink(file.url))"
                               :key="indexFile" class="form-chat-timeline-content-files-preview-images-image"
                               :src="file.url"
                               alt=""
                               @click="previewImage(item.files.filter((file: any) => isImgLink(file.url)), indexFile)">
                        </div>
                        <div v-for="(file, indexFile) in item.files.filter((file: any) => !isImgLink(file.url))"
                             :key="indexFile" class="form-chat-timeline-content-files-preview-filetext"
                             @click="openLinkDownFile(file.url)">
                          <FileTextOutlined style="margin-right: 10px; font-size:30px"/>
                          <div class="form-chat-timeline-content-files-preview-filetext-info">
                            <p class="form-chat-timeline-content-files-preview-filetext-info-name">{{ file.name }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-chat-bottom">
            <div class="form-chat-bottom-category">
              <StatusChat with="150" disabled/>
              <span style="margin: 0 10px;">분류:</span>
              <span class="form-chat-bottom-category-text">회계-마감-( {{ dayjs().format('YYYY-MM') }})</span>
            </div>
            <InputChat ref="inputChatRef" v-model:content="content" v-model:files="filesUpload"
                       :placeholder="disabled ? '입력마감 상태에서는 이용할 수 없습니다.' : '댓글을 입력하세요…'"
                       :disabled="isLoadingUpload || disabled"
                       @submitChat="submitChat"/>
          </div>
          <ModalPreviewListImage :isModalPreview="isModalPreview" @cancel="isModalPreview = false"
                                 :listImage="listImagePreview"/>
        </div>
      </a-col>
    </a-row>

  </div>
</template>

<script setup lang="ts">
import { computed, inject, reactive, ref } from "vue";
import { DxColumn, DxDataGrid, DxExport, DxItem, DxSearchPanel, DxToolbar } from "devextreme-vue/data-grid";
import dayjs from "dayjs";
import InfoToolTip from "@/components/common/InfoToolTip.vue";
import DxButton from "devextreme-vue/button";
import {
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  PrinterOutlined,
  SaveOutlined,
  SearchOutlined
} from "@ant-design/icons-vue";
import { DataRowKey } from "@/views/CommunicationBoard/type";
import InputChat from "@/views/AC/AC1/AC130/components/InputChat.vue";
import MarkdownCustom from "@/views/AC/AC1/AC130/components/MarkdownCustom.vue";
import ModalPreviewListImage from "@/views/AC/AC1/AC130/components/ModalPreviewListImage.vue";
import StatusChat from "@/views/AC/AC1/AC130/components/StatusChat.vue";
import { getJwtObject } from "@bankda/jangbuda-common";
import { companyId } from "@/helpers/commonFunction";
import deletePopup from "@/utils/deletePopup";
import { Message } from "@/configs/enum";

const dataRow = inject(DataRowKey)
const token = ref(sessionStorage.getItem("token"))
let jwtObject = getJwtObject(token.value!);
const userName = ref(sessionStorage.getItem("name"));
const userId = jwtObject.userId
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
const content = ref('')
const filesUpload = ref([])
const disabled = ref(false)
const isLoadingUpload = ref(false)
const isModalPreview = ref(false)
const listImagePreview = ref({
  index: 0,
  files: [],
})
const inputChatRef = ref()
const globalFacilityBizId = computed(() => parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0"));
const acYear = computed(() => parseInt(sessionStorage.getItem("acYear") ?? '0'))
const listChat = ref(JSON.parse(localStorage.getItem("listChat") ?? '[]'))
console.log('%c listChat', 'color: red', listChat.value)
const submitChat = () => {
  if (isLoadingUpload.value || (!content.value.trim() && !filesUpload.value.length)) return
  isLoadingUpload.value = true
  let fileStorageIds = null
  if (filesUpload.value.length) {
    fileStorageIds = filesUpload.value.map((file: any) => parseInt(file.id))
  }
  const value = {
    id: listChat.value.length + 1,
    expresstionType: Math.floor(Math.random()*5) + 1,
    classification: "회계-마감-(2023-04)",
    content: !!content.value.trim() ? content.value.trim() : null,
    companyId: companyId,
    fiscalYear: 2023,
    facilityBusinessId: 1,
    year: 2023,
    month: dayjs().month(),
    writedAt: new Date().getTime(),
    createdAt: new Date().getTime(),
    createdBy: "C23040301",
    updatedAt: new Date().getTime(),
    updatedBy: "C23040301",
    ip: "42.118.154.26",
    active: true,
    writerUser: {
      id: 2,
      type: "c",
      username: "C23040301",
      name: "user test 1",
      active: true,
    },
    files: null,
  }
  // const result = {
  //   companyId: companyId,
  //   facilityBusinessId: globalFacilityBizId.value,
  //   fiscalYear: acYear.value,
  //   year: acYear.value,
  //   input: {
  //     content: !!content.value.trim() ? content.value.trim() : null,
  //     fileStorageIds
  //   }
  // }
  if (listChat.value.length === 0) {
    localStorage.setItem("listChat", JSON.stringify([value]))
    listChat.value = [value]
  } else {
    const result = [
      ...listChat.value,
      value
    ]
    localStorage.setItem("listChat", JSON.stringify(result))
    listChat.value = result
    console.log('%c result', 'color: red', result)
  }
  inputChatRef.value.resetInputChat()
  isLoadingUpload.value = false
}
const previewImage = (files: any, index: number) => {
  listImagePreview.value.index = index
  listImagePreview.value.files = files.map((file: any) => file.url)
  isModalPreview.value = true
}
const isImgLink = (url: any) => {
  if (typeof url !== 'string') return false;
  return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|webp)(\?(.*))?$/gmi) !== null);
}

const handleDeleteQA = (row: any) => {
  deletePopup({
    callback: () => {
      const result = listChat.value.filter((item: any) => item.id !== row.id)
      localStorage.setItem("listChat", JSON.stringify(result))
      console.log('%c result', 'color: red', result)
      listChat.value = result
    },
    message: Message.getCommonMessage("303").message,
    cancelText: Message.getCommonMessage("303").no,
    okText: Message.getCommonMessage("303").yes,
  })

}
const openLinkDownFile = (link: string) => {
  window.open(link, '_blank')
}
</script>

<style lang="scss" scoped>
.justify-content-end {
  justify-content: flex-end;
}

:deep(.ant-form-item-control-input-content) {
  display: flex;
  align-items: center;
}

.form-container {
  height: calc(100vh - 210px);

  .form-chat {
    height: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: relative;

    &-loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      background-color: rgba(255, 255, 255, 0.568);
    }

    &-header {
      text-align: center;
      border-bottom: 1px solid rgba(17, 17, 26, 0.1);
      padding: 4px 0;
      position: relative;

      &-title {
        font-size: 20px;
        font-weight: bold;
      }

      &-btnReload {
        position: absolute;
        right: 15px;
        top: 15px;
        cursor: pointer;
      }
    }

    &-timeline {
      flex-grow: 1;
      // height: calc(100% - 40px);
      padding-bottom: 10px;
      padding-top: 2px;
      scroll-behavior: smooth;
      overflow-y: auto;

      &-line {
        // margin-top: 20px;
        margin-bottom: 10px;
        height: 1px;
        background-color: #e7e6e6;

        &-short {
          margin-left: 52px;
        }
      }

      &-avatar {
        width: 40px;
        height: 40px;
        margin-right: 5px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
        }
      }

      &-common {
        margin-top: 1px;
        position: relative;

        &-menu {
          position: absolute;
          top: 0;
          right: 5px;
          display: none;

          &:hover {
            display: block;
          }
        }

        &:hover {
          .form-chat-timeline-common-menu {
            display: block;
          }
        }
      }

      &-content {
        width: 100%;
        // background-color: #DCE6F2;
        padding: 0 12px 0 12px;
        position: relative;

        &-files {
          width: 100%;
          background-color: #fff;

          &-preview {
            &-images {
              display: flex;
              flex-wrap: wrap;
              margin: 0 -3px 5px -3px;

              &-image {
                width: 250px;
                height: 250px;
                object-fit: cover;
                display: block;
                padding: 3px;
                cursor: pointer;

                &:hover {
                  opacity: .8;
                }
              }
            }

            &-filetext {
              display: flex;
              align-items: center;
              border: 1px solid #d8d7d7;
              width: 400px;
              cursor: pointer;
              overflow: hidden;
              padding: 10px;

              & + & {
                margin-top: 3px;
              }

              &:last-child {
                margin-bottom: 10px;
              }

              &:hover {
                background-color: #fafafa;
              }

              &-info {
                &-name {
                  white-space: nowrap;
                  margin: 0;
                  line-height: 15px;
                  font-size: 15px;
                }

                &-size {
                  margin: 0;
                  color: #A6A6A6;
                }
              }
            }
          }

          &-item {
            display: flex;
            align-items: center;

            &-info {
              p {
                margin: 0;
                line-height: 15px;
              }

              &-size {
                color: #A6A6A6;
              }
            }
          }
        }

        &-info {
          display: flex;
          align-items: center;
          justify-content: space-between;

          &-user {
            display: flex;
            align-items: center;
            // margin-right: 30px;
            margin-right: 20px;

            &-status {
              // display: inline;
              // padding: 0 10px;
              // border-radius: 5px;
              // border: 1px solid #7f7f7f;
              // background-color: #ffffff;
              // color: #7f7f7f;
              // font-size: 10px;
              margin-right: 5px;
            }

            &-name {
              font-size: 12px;
              white-space: nowrap;
              font-weight: bold;
              color: #333333;

              &-login {
                color: #1a73e8;
              }
            }
          }

          &-time {
            color: #bcbcc2ff;
            text-align: end;
            font-size: 11px;
            margin-right: 10px;
          }

          &-classification {
            color: #bcbcc2ff;
            text-align: end;
            font-size: 11px;
          }
        }

        &-background {
          margin-top: 5px;
          // &:hover {
          //   background-color: #fafafa;
          // }
        }

        &-text {
          word-wrap: break-word;
          white-space: pre-wrap;
          font-size: 15px;
          color: #333333;
        }
      }

      &-uploading {
        margin-left: 40px;
      }
    }

    &-bottom {
      &-category {
        display: flex;
        align-items: center;
        margin-bottom: 5px;

        &-text {
          color: #bcbcc2ff;
        }
      }
    }
  }
}

</style>
