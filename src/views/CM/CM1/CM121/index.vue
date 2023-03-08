<template>
  <div class="cm-121">
    <action-header title="통장 관리" :buttonDelete="false" />
    <a-row class="cm-121_row">
      <a-col span="12" class="cm-121_main">
        <div class="cm-121_main-content">
          <a-spin :spinning="false" size="large">
            <DxDataGrid id="gridContainer" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
              :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :show-borders="true"
              key-expr="a" :column-auto-width="true" :focused-row-enabled="true">
              <DxRowDragging :allow-reordering="true" :on-reorder="onReorder" :show-drag-icons="true" />
              <DxSorting mode="none" />
              <DxScrolling mode="standard" show-scrollbar="always" />
              <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
              <DxExport :enabled="true" />
              <DxToolbar>
                <DxItem name="searchPanel" />
                <DxItem name="exportButton" css-class="cell-button-export" />
                <DxItem location="after" template="button-history" css-class="cell-button-add" />
                <DxItem location="after" template="button-template" css-class="cell-button-add" />
              </DxToolbar>
              <template #button-template>
                <a-tooltip placement="top">
                  <template #title>신규</template>
                  <div>
                    <DxButton icon="plus" />
                  </div>
                </a-tooltip>
              </template>
              <template #button-history>
                <DxButton icon="plus">
                  <HistoryOutlined style="font-size: 18px;" />
                </DxButton>
              </template>


              <DxColumn caption="금융기관" data-field="a" />
              <DxColumn caption="통장번호" data-field="b" />
              <DxColumn caption="통장용도" data-field="c" />
              <DxColumn caption="통장별명" data-field="d" />
              <DxColumn caption="사업구분" data-field="e" />
              <DxColumn caption="스크래핑 이용 여부" data-field="f" />
              <DxColumn caption="최종 스크래핑 현황" width="130px" cell-template="action" />
              <template #action="{}">
                <div style="text-align: center">
                  <img src="@/assets/images/searchPlus.png" style="width: 20px; height: 20px; margin-top: 0px;" />
                </div>
              </template>
            </DxDataGrid>
          </a-spin>
        </div>
      </a-col>
      <a-col span="12" class="cm-121_detail">
        <div>
          <p class="cm-121_detail-infomation">통장정보</p>
          <a-row class="cm-121_detail-infomation-top">
            <a-col span="12">
              <a-form-item label="사업구분" class="form-item-top">
                <default-text-box :required="true" :width="150" />
              </a-form-item>
              <a-form-item label="금융기관" class="form-item-top">
                <default-text-box :required="true" :width="150" />
              </a-form-item>
              <a-form-item label="통장번호" class="form-item-top red">
                <div class="custom-note d-flex-center">
                  <number-box :required="true" :width="150" />
                  <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                  <span class="style-note">최초 저장된 이후 수정 불가</span>
                </div>
              </a-form-item>
              <a-form-item label="통장별명" class="form-item-top red">
                <div class="custom-note d-flex-center">
                  <default-text-box :required="true" :width="150" />
                  <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                  <span class="style-note">중복 등록 불가</span>
                </div>
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item label="통장구분" class="form-item-top">
                <div class="custom-note d-flex-center">
                  <switch-basic :textCheck="'포함'" :textUnCheck="'제외'" />
                  <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                  <span class="style-note">최초 저장된 이후 수정 불가</span>
                </div>
              </a-form-item>
              <a-form-item label="통장용도" class="form-item-top">
                <div class="custom-note d-flex-center">
                  <select-box-common :required="true" :width="150" />
                  <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                  <span class="style-note">관련 계정과목 적용 또는 <br />관련 서식에 기재됩니다.</span>
                </div>
              </a-form-item>
              <a-form-item label="예금주" class="form-item-top red">
                <default-text-box :required="true" :width="150" />
              </a-form-item>
              <a-form-item label="계정과목" class="form-item-top">
                <default-text-box :required="true" :width="150" />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <div>
          <div class="cm-121_detail-infomation cm-121_detail-infomation-bottom custom-note d-flex-center">
            <span>스크래핑 (통장내역 자동 조회) 정보</span>
            <div class="pl-5">
              <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
              <span class="style-note">(주의) 아래 데이터는 암호화되어 조회가 불가능합니다. 단, 업데이트는 가능합니다</span>
            </div>
          </div>
          <a-row class="cm-121_detail-infomation-bottom">
            <a-col span="12">
              <a-form-item label="스크래핑 이용 여부" class="form-item-bottom">
                <div class="custom-note d-flex-center">
                  <switch-basic :textCheck="'포함'" :textUnCheck="'제외'" />
                  <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                  <span class="style-note">이용하지 않는 경우 스크래<br />핑 중지가 되어 통장 불러<br />오기를 할 수 없습니다.</span>
                </div>
              </a-form-item>
              <a-form-item label="사업자등록번호 (법인통장)" class="form-item-bottom red">
                <number-box :required="true" :width="150" />
              </a-form-item>
              <a-form-item label="간편조회 ID" class="form-item-bottom red">
                <default-text-box :required="true" :width="150" />
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item label="통장 비밀번호 (숫자 4자리)" class="form-item-bottom red">
                <number-box :required="true" :width="150" />
              </a-form-item>
              <a-form-item label="생년월일 (개인통장)" class="form-item-bottom red">
                <number-box :required="true" :width="150" />
              </a-form-item>
              <a-form-item label="간편조회 PW" class="form-item-bottom red">
                <default-text-box :required="true" :width="150" />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <div class="cm-121_detail-btn">
          <button-basic text="저장" type="default" mode="contained" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useStore } from 'vuex';
import queries from "@/graphql/queries/CM/CM121";
import dayjs, { Dayjs } from "dayjs";
import { companyId } from "@/helpers/commonFunction"
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxSearchPanel, DxExport, DxScrolling, DxRowDragging, DxSorting } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
export default defineComponent({
  components: {
    DxDataGrid, DxColumn, DxToolbar, DxItem, DxSearchPanel, DxExport, DxScrolling, DxButton, DxRowDragging, DxSorting, EditOutlined, HistoryOutlined, DeleteOutlined, SaveOutlined
  },
  setup() {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const globalYear = computed(() => store.state.settings.globalYear)
    const triggerMyCompanyFacilityBusinesses = ref<boolean>(true);
    const triggerBankbooks = ref<boolean>(false);
    const dataSource = ref<any>([
      {
        id: 1,
        a: 11111,
        b: '21312',
        c: 'dasdasd',
        d: 'rtretert',
        e: 'adsadsa',
        f: 'dsadas'
      },
      {
        id: 2,
        a: 22222,
        b: '21312',
        c: 'dasdasd',
        d: 'rtretert',
        e: 'adsadsa',
        f: 'dsadas'
      },
      {
        id: 3,
        a: 33333,
        b: '21312',
        c: 'dasdasd',
        d: 'rtretert',
        e: 'adsadsa',
        f: 'dsadas'
      }
    ])
    // ============ GRAPQL ===============================
    const facilityBusinessId = ref()
    const {
      result: resMyCompanyFacilityBusinesses,
      // onResult: onResMyCompanyFacilityBusinesses,
      // loading: loadingMyCompanyFacilityBusinesses,
      // refetch: refetchMyCompanyFacilityBusinesses,
      // onError: onErrorMyCompanyFacilityBusinesses
    } = useQuery(queries.getMyCompanyFacilityBusinesses, {
      companyId: companyId
    },
      {
        enabled: triggerMyCompanyFacilityBusinesses.value,
        fetchPolicy: "no-cache",
      })
    const arr = ref()
    watch(resMyCompanyFacilityBusinesses, (value) => {
      if (value) {
        // Promise.all(value.getMyCompanyFacilityBusinesses.map( async (items:any) => await getListBankbooks(items.facilityBusinessId))).then((resolvedValues) => {
        //   resolvedValues.forEach((value, index) => {
        //     console.log(value, index);
        //   });
        // });
        arr.value = value.getMyCompanyFacilityBusinesses
        triggerMyCompanyFacilityBusinesses.value = false
      }
    })
    const val = {
        companyId: companyId,
        fiscalYear: globalYear,
        facilityBusinessId: null
      }
    
    watch(()=>triggerMyCompanyFacilityBusinesses.value, (value) => {
      console.log('triggerMyCompanyFacilityBusinesses', value);
      if(!value) {
        // Promise.all(arr.value.map( async (items:any) => await getListBankbooks(items.facilityBusinessId))).then((resolvedValues) => {
        //   resolvedValues.forEach((value, index) => {
        //     console.log(value, index);
        //   });
        // });
        arr.value.map(async(item:any) => {
          val.facilityBusinessId = item.facilityBusinessId
          console.log(val.facilityBusinessId);
          
          triggerBankbooks.value = true
        })

      }
    })

    const {
        onResult: onResBankbooks,
        loading,
        refetch,
        onError
      } =  useQuery(queries.getBankbooks, val,
        () => ({
          enabled: triggerBankbooks.value,
          fetchPolicy: "no-cache",
        }))

    const getListBankbooks = async (facilityBusinessId: number) => {
      const {
        onResult: onResBankbooks,
        loading,
        refetch,
        onError
      } =  useQuery(queries.getBankbooks, {
        companyId: companyId,
        fiscalYear: globalYear,
        facilityBusinessId: facilityBusinessId
      },
        () => ({
          fetchPolicy: "no-cache",
        }))
      return 'ccccccc'
    }

    const onReorder = (e: any) => {
      const visibleRows = e.component.getVisibleRows();
      const toIndex = dataSource.value.findIndex((item: any) => item.id === visibleRows[e.toIndex].data.id);
      const fromIndex = dataSource.value.findIndex((item: any) => item.id === e.itemData.id);
      const newTasks = [...dataSource.value];
      newTasks.splice(fromIndex, 1);
      newTasks.splice(toIndex, 0, e.itemData);
      dataSource.value = newTasks;
    }




    return {
      move_column,
      colomn_resize,
      onReorder,
      dataSource,
    }
  }
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
