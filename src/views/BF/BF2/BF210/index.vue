<template>
  <div class="top-content">
    <a-typography-title :level="3"> 회원관리
    </a-typography-title>
    <div class="list-action">
      <a-tooltip>
        <template #title>조회</template>
        <a-button>
          <SearchOutlined />
        </a-button>
      </a-tooltip>
      <a-tooltip>
        <template #title>저장</template>
        <a-button>
          <SaveOutlined />
        </a-button>
      </a-tooltip>
      <a-tooltip>
        <template #title>삭제</template>
        <a-button>
          <DeleteOutlined />
        </a-button>
      </a-tooltip>
      <a-tooltip>
        <template #title>출력</template>
        <a-button>
          <PrinterOutlined />
        </a-button>
      </a-tooltip>
    </div>
  </div>
  <div id="bf-210">
    <div class="search-form">
      <div id="components-grid-demo-flex">
        <a-row justify="start" :gutter="[16, 8]">
          <a-col>
            <label class="lable-item">회원종류 :</label>
            <a-select style="width: 130px" v-model:value="dataSearch.nameSale" option-label-prop="children">
              <a-select-option value="고객사" label="고객사">
                <a-tag :color="getColorTag('고객사')">고객사</a-tag>
              </a-select-option>
              <a-select-option value="매니저" label="전체">
                <a-tag :color="getColorTag('매니저')">매니저</a-tag>
              </a-select-option>
              <a-select-option value="영업자" label="영업자">
                <a-tag :color="getColorTag('영업자')">영업자</a-tag>
              </a-select-option>
              <a-select-option value="파트너" label="파트너">
                <a-tag :color="getColorTag('파트너')">영업자</a-tag>
              </a-select-option>
            </a-select>
          </a-col>
          <a-col>
            <label class="lable-item">소속코드:</label>
            <a-input style="width: 150px" v-model:value="dataSearch.nameCompany" />
          </a-col>
          <a-col>
            <label class="lable-item">소속명:</label>
            <a-input style="width: 150px" v-model:value="dataSearch.surrogate" />
          </a-col>
          <a-col>
            <label class="lable-item">회원ID :</label>
            <a-input style="width: 150px" v-model:value="dataSearch.userid" />
          </a-col>
          <a-col>
            <label class="lable-item">회원명 :</label>
            <a-input style="width: 150px" v-model:value="dataSearch.username" />
          </a-col>
          <a-col style="display: flex; align-items: center">
            <a-checkbox v-model:checked="dataSearch.typeSevice1">
              <a-tag :color="getAbleDisable('이용중')">이용중</a-tag>
            </a-checkbox>
            <a-checkbox v-model:checked="dataSearch.typeSevice2">
              <a-tag :color="getAbleDisable('이용중지')">이용중지</a-tag>
            </a-checkbox>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="page-content">
      <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="id" @exporting="onExporting">
        <DxPaging :page-size="5" />
        <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
        <DxExport :enabled="true" :allow-export-selected-data="true" />
        <DxToolbar>
          <DxItem name="searchPanel" />
          <DxItem name="exportButton" />
          <DxItem location="after" template="button-template" css-class="cell-button-add" />
          <DxItem name="groupPanel" />
          <DxItem name="addRowButton" show-text="always" />
          <DxItem name="columnChooserButton" />
        </DxToolbar>
        <template #button-template>
          <DxButton icon="plus" @click="openAddNewModal" />
        </template>
        <DxColumn data-field="active" caption="상태" css-class="cell-center" cell-template="check-box" :width="100" />
        <template #check-box="{ data }">
          <a-tag :color="getAbleDisable(data.value)">{{ data.value }}</a-tag>
        </template>
        <DxColumn data-field="id" caption="회원ID" :width="80" css-class="cell-center" />
        <DxColumn data-field="username" caption="회원명" :width="100" />
        <DxColumn data-field="type" caption="회원종류" cell-template="grid-cell" css-class="cell-center" :width="150" />
        <template #grid-cell="{ data }">
          <a-tag :color="getColorTag(data.value)">{{ data.value }}</a-tag>
        </template>
        <DxColumn data-field="mobilePhone" caption="휴대폰" :width="200" />
        <DxColumn data-field="groupCode" caption="소속코드" :width="200" />
        <DxColumn data-field="groupName" caption="소속명" />
        <DxColumn cell-template="pupop" :width="100" />
        <template #pupop="{ data }" class="custom-action">
          <div class="custom-action">
            <a-space :size="10">
              <a-tooltip placement="top">
                <template #title>편집</template>
                <EditOutlined @click="setModalEditVisible(data)" />
              </a-tooltip>
              <a-tooltip placement="top">
                <template #title>변경이력</template>
                <HistoryOutlined @click="modalHistory(data)" />
              </a-tooltip>
              <a-tooltip placement="top">
                <template #title>로그인이력</template>
                <login-outlined @click="modalLogin(data)" />
              </a-tooltip>
            </a-space>
          </div>
        </template>
      </DxDataGrid>

      <AddNew210Poup :modalStatus="modalAddNewStatus" @closePopup="modalAddNewStatus = false" />
      <EditBF210Popup :modalStatus="modalEditStatus" @closePopup="modalEditStatus = false" :data="popupData"
        title="회원관리 [ bf-210 –pop ]" />
      <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
        title="변경이력[cm-000-pop]" />
      <PopLogin :modalStatus="modalLoginStatus" @closePopup="modalLoginStatus = false" :data="popupData"
        title="로그인이력 [ cm-000-popLogin ]" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSelection,
  DxSearchPanel,
  DxToolbar,
  DxEditing,
  DxGrouping,
  DxItem,
} from "devextreme-vue/data-grid";

import EditBF210Popup from "./components/EditBF210Popup.vue";
import AddNew210Poup from "./components/AddNew210Poup.vue";
import HistoryPopup from "../../../../components/HistoryPopup.vue";
import PopLogin from "./components/PopLogin.vue";
import DxButton from "devextreme-vue/button";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";
import {
  EditOutlined,
  HistoryOutlined,
  LoginOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  PrinterOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons-vue";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useQuery } from "@vue/apollo-composable";
import queries from "../../../../graphql/queries/BF/BF2/BF210/index";

dayjs.extend(weekday);
dayjs.extend(localeData);
export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxButton,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    EditOutlined,
    HistoryOutlined,
    LoginOutlined,
    DxToolbar,
    DxEditing,
    DxGrouping,
    DxItem,
    AddNew210Poup,
    EditBF210Popup,
    HistoryPopup,
    PopLogin,
    SearchOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SaveOutlined,
  },
  data() {
    return {
      dataSource: {
        id: 1,
        type: "",
        username: "",
        name: "",
        mobilePhone: "",
        groupCode: "",
        groupName: "",
        managerGrade: 1,
        active: true,
        facilityBusinesses: []
      },

      popupData: [],
      modalAddNewStatus: false,
      modalEditStatus: false,
      modalHistoryStatus: false,
      modalLoginStatus: false,

      dataSearch: {
        typeSevice: "이용중",
        status: "전체",
        nameSale: "고객사",
        typeSevice1: "이용중",
        userid: "",
        username: "",
        nameCompany: "",
        surrogate: "",
        typeSevice2: ""
      },
    };
  },

  setup() {
    const spinning = ref<boolean>(true);
    var idRowEdit = ref<number>(0)
    const originData = { page: 1, rows: 10, type: "m", active: true }

    setTimeout(() => {
      spinning.value = !spinning.value;
    }, 1000);
    const dataSource = ref([])
    const { refetch: refetchData, loading, error, onResult } = useQuery(queries.searchUsers, originData)


    onResult((res) => {
      console.log(res);
      dataSource.value = res.data.searchUsers.datas
    })

    return {
      spinning,
      dataSource,
      idRowEdit,
      refetchData
    }
  },

  methods: {
    onExporting(e: any) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("employees");
      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "DataGrid.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    openAddNewModal() {
      this.modalAddNewStatus = true;
    },
    setModalEditVisible(data: any) {
      this.modalEditStatus = true;
      this.popupData = data;
    },
    modalHistory(data: any) {
      this.modalHistoryStatus = true;
      this.popupData = data;
    },
    modalLogin(data: any) {
      this.modalLoginStatus = true;
      this.popupData = data;
    },
    getColorTag(data: any) {
      if (data === "고객사") {
        return "blue";
      } else if (data === "매니저") {
        return "black";
      } else if (data === "영업자") {
        return "grey";
      } else if (data === "파트너") {
        return "#cdc71c";
      }
    },
    getAbleDisable(data: any) {
      if (data === "이용중") {
        return "blue";
      } else if (data === "이용중지") {
        return "#d5a7a7";
      }
    },
    searchUsers(filter: any) {
      const { loading, error, onResult } = useQuery(
        queries.searchUsers,
        filter
      );
      onResult((res) => {
        this.dataSource = res.data.searchUsers.datas;
      });
    },
    // getUsers() {
    //   const { loading, error, onResult } = useQuery(queries.getUsers);
    //   onResult((res) => {
    //     return res;
    //   });
    // },
  },
});
</script>
<style scoped>
  .page-content {
      padding: 10px 10px;
  }
  
  .cell-button-add {
      padding-left: 100px !important;
  }
  
  .cell-center {
      text-align: center !important
  }
  
  .dx-button-has-text .dx-button-content {
      padding: 0px 15px !important;
  }
  
  .search-form {
      background: #f1f3f4;
      padding: 10px 24px;
  }
  
  .dx-select-checkbox {
      display: inline-block !important;
  }
  
  #data-grid-demo {
      min-height: 700px;
  }
  
  .search-form .col {
      display: flex;
      align-items: center;
  }
  
  .search-form .col {
      margin-top: 20px;
  }
  
  .search-form .col .lable-item {
      width: 110px;
      display: inline-block;
  }
  
  .search-form .col .item:nth-child(2) {
      margin-left: 30px;
  }
  </style>