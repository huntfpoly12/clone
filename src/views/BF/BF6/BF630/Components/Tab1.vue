<template>
  <div class="search-form">
    <a-row>
      <a-col :span="12">
        <a-row>
          <a-col :span="8">
            <a-form-item  label="귀속연도">
              <year-picker-box-custom v-model:valueDate="date"></year-picker-box-custom>
            </a-form-item>
          </a-col>
          <a-col :span="16">
            <div class="custom-note">
              <a-form-item  label="최종제작상태">
                <switch-basic  :textCheck="'제작후'" :textUnCheck="'제작전'"/>
              </a-form-item>
              <span>
                <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 제작전은 제작요청되지 않은 상태입니다.
              </span>
            </div>
          </a-col>
        </a-row>
        <a-form-item  label="제출대상구분">
          <div class="checkbox-tab-1">
            <span>연간(1.1~12.31)지급분</span> 
              <div class="group-checkbox">
                <div class="checkbox-item">
                  <checkbox-basic :valueCheckbox="true" :disabled="false" :size="'20'"/><div class="check-box-tag-1">제작대기</div>
                </div>
                <div class="checkbox-item">
                  <checkbox-basic :valueCheckbox="true" :disabled="false" :size="'20'"/><div class="check-box-tag-2">제작중</div>
                </div>
                <div class="checkbox-item">
                  <checkbox-basic :valueCheckbox="true" :disabled="false" :size="'20'"/><div class="check-box-tag-3">제작성공</div>
                </div>
                <div class="checkbox-item">
                  <checkbox-basic :valueCheckbox="true" :disabled="false" :size="'20'"/><div class="check-box-tag-4">제작실패</div>
                </div>
              </div>
          </div>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item  label="사업자코드">
            <biz-number-text-box width="150px"/>
        </a-form-item>
        <a-form-item  label="상호">
          <default-text-box width="150px"></default-text-box >
        </a-form-item>
        <a-row>
            <a-col :span="12">
              <a-form-item  label="매니저리스트">
                <list-manager-dropdown width="150px" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <switch-basic  :textCheck="'해지제외'" :textUnCheck="'해지포함'"/>
            </a-col>
        </a-row>
        <a-form-item  label="영업자리스트">
          <list-sales-dropdown width="150px" :required="true"/>
        </a-form-item>
      </a-col>
    </a-row>
  </div>
  <div class="grid-view">
    <div class="header-grid-form">
      <a-row justify="start" :gutter="[16, 8]">
        <a-col class="custom-flex">
          <label class="lable-item">파일 제작 설정 :</label>
          <switch-basic  :textCheck="'세무대리인신고'" :textUnCheck="'납세자자진신고'"/>
          <span class="infor-icon">
                <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 본 설정으로 적용된 파일로 다운로드 및 메일발송 됩니다.
          </span>
        </a-col>
        <a-col class="custom-flex">
          <label class="lable-item">소속명:</label>
          <date-time-box width="150px" dateFormat="YYYY-MM-DD" />
        </a-col>
        <a-col class="custom-flex">
            <DxButton  size="large" class="ml-4">
                <SaveOutlined style="font-size: 17px" />
            </DxButton>
        </a-col>
      </a-row>
    </div>
    <div class="content-grid">
      <a-spin :spinning="false" size="large">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                :show-borders="true" key-expr="companyId" class="mt-10" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true">
                <DxScrolling mode="standard" show-scrollbar="always"/>
                <DxSelection mode="multiple" :fixed="true" />
                <DxColumn caption="사업자코드" cell-template="action" />
       
                <DxColumn caption="상호 주소" data-field="company.code" />
                <DxColumn caption="상호 주소" cell-template="company" width="100" />
                <template #company="{ data }">
          
                </template>
                <DxColumn caption="마감 현황" cell-template="status" width="140" />
                <template #status="{ data }">
            
                </template>
                <DxColumn caption="귀속연월" cell-template="imputed" />
                <template #imputed="{ data }">
                 
                </template>
                <DxColumn caption="지급연월" cell-template="payment" />
                <template #payment="{ data }">
                
                </template>
                <DxColumn caption="신고 주기" cell-template="reportType" />
                <template #reportType="{ data }">
              
                </template>
                <DxColumn caption="신고 종류" cell-template="afterDeadline" />
                <template #afterDeadline="{ data }">
            
                </template>
                <DxColumn caption="연말" cell-template="yearEndTaxAdjustment" />
                <template #yearEndTaxAdjustment="{ data }">
                   
                </template>
                
            </DxDataGrid>
        </a-spin>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import DxCheckBox from 'devextreme-vue/check-box';
import { useStore } from "vuex";
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling } from "devextreme-vue/data-grid";
import {SaveOutlined } from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
export default defineComponent({
  components: {
    DxCheckBox,SaveOutlined,DxButton,DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling
  },
  props: {
      modalStatus: Boolean,
      dataCall: {
          type: Object,
      },
  },
  setup(props, { emit }) {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear)
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const dataSource = ref([])
    const date = ref(2022)
    return {
      globalYear,move_column,colomn_resize,dataSource,date
    }
  }
})
</script>
<style  scoped lang="scss">
  
  .header-grid-form{
    .custom-flex {
        display: flex;
        align-items: center;
        margin-top: 10px;
        .infor-icon{
          margin-left: 10px;
        }
    }
  }  
  .text-box-1 {
        padding: 5px 10px;
        border-radius: 5px;
        color: white;
        background-color: gray;
        width: 80px;
    }
  .custom-note{
    display: flex;
    align-items: center;
    span{
      margin-left: 10px;
    }
  }
  .checkbox-tab-1{
    display: flex;
    margin-top: 5px;
    span{
      padding-right: 10px;
    }
    .group-checkbox{
      .checkbox-item{
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        .check-box-tag-1{
          margin-left: 10px;
          background-color: #93CDDD;
          border-radius: 5px;
          color: white;
          text-align: center;
          width: 90px;
        }
        .check-box-tag-2{
          margin-left: 10px;
          background-color: #0070C0;
          border-radius: 5px;
          color: white;
          text-align: center;
          width: 90px;
        }
        .check-box-tag-3{
          margin-left: 10px;
          background-color: #9BBB59;
          border-radius: 5px;
          color: white;
          text-align: center;
          width: 90px;
        }
        .check-box-tag-4{
          margin-left: 10px;
          background-color: #C00000;
          border-radius: 5px;
          color: white;
          text-align: center;
          width: 90px;
        }
      }
    }
  }
  ::v-deep .ant-form-item-label>label {
        width: 120px;
        padding-left: 10px;
  }
</style>

