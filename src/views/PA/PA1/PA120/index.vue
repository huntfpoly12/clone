<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <action-header title="기타소득자등록" :buttonDelete="false" :buttonSave="false" :buttonSearch="false" :buttonPrint="false" />
  <div id="pa-120" class="page-content">
    <a-row>
      <a-col :span="3" style="padding-right: 10px">
        <div class="total-user">
          <div>
            <span>{{ dataSource.length }}</span>
            <span>전체</span>
          </div>
          <div>
            <img src="@/assets/images/user.svg" alt="" style="width: 39px" />
          </div>
        </div>
      </a-col>
      <a-col :span="3" style="padding-right: 10px">
        <div class="current-user">
          <div>
            <span>{{ totalUserOnl }}</span>
            <span>재직</span>
          </div>
          <div>
            <img src="@/assets/images/user.svg" alt="" style="width: 39px" />
          </div>
        </div>
      </a-col>
      <a-col :span="3" style="padding-right: 10px">
        <div class="leave-user">
          <div>
            <span>{{ totalUserOff }}</span>
            <span>퇴사</span>
          </div>
          <div>
            <img src="@/assets/images/user.svg" alt="" style="width: 39px" />
          </div>
        </div>
      </a-col>
    </a-row>
    {{ token }}asd
    <a-row style="flex-flow: row nowrap;">
      <a-col :span="11" style="max-width: 46.84%" class="custom-layout">
        <a-spin :spinning="loading" size="large">
          <DxDataGrid
            :show-row-lines="true"
            :hoverStateEnabled="true"
            :data-source="dataSource"
            :show-borders="true"
            key-expr="employeeId"
            :allow-column-reordering="move_column"
            :allow-column-resizing="colomn_resize"
            :column-auto-width="true"
            :onRowClick="actionEdit"
            :focused-row-enabled="true"
            id="pa-120-gridContainer"
            :auto-navigate-to-focused-row="true"
            v-model:focused-row-key="focusedRowKey"
          >
            <DxScrolling mode="standard" show-scrollbar="always" />
            <DxToolbar>
              <DxItem location="after" template="button-history" css-class="cell-button-add" />
              <DxItem location="after" template="button-template" css-class="cell-button-add" />
            </DxToolbar>
            <template #button-template>
              <DxButton icon="plus" @click="openAddNewModal" />
            </template>
            <template #button-history="{}" style="border-color: #ddd">
              <DxButton icon="plus">
                <HistoryOutlined style="font-size: 18px" @click="modalHistory" />
              </DxButton>
            </template>
            <DxColumn caption="성명" width="140" cell-template="company-name" />
            <template #company-name="{ data }">
              <employee-info
                :idEmployee="data.data.employeeId"
                :name="data.data.name"
                :idCardNumber="data.data.residentId"
                :status="data.data.status"
                :foreigner="data.data.foreigner"
                :checkStatus="false"
                @toolTopErorr="toolTopErorr"
                :employeeId="data.data.employeeId"
                @mouseenter="defaultVisible = true"
                @mouseleave="defaultVisible = false"
              />
            </template>
            <DxColumn caption="주민등록번호" cell-template="residentId" width="120" />
            <template #residentId="{ data }">
              <div :id="`residentId${data.data.residentId}`">{{ data.data.residentId }}</div>
              <DxTooltip
                v-if="isResidentIdError[`${data.data.employeeId}`]"
                position="top"
                v-model:visible="defaultVisible"
                :hide-on-outside-click="false"
                :target="`#residentId${data.data.residentId}`"
                >Error
              </DxTooltip>
            </template>
            <DxColumn caption="비고" cell-template="grade-cell" />
            <template #grade-cell="{ data }">
              <div>
                <four-major-insurance v-if="data.data.nationalPensionDeduction" :typeTag="1" :typeValue="1" />
                <four-major-insurance v-if="data.data.healthInsuranceDeduction" :typeTag="2" :typeValue="1" />
                <four-major-insurance v-if="data.data.employeementInsuranceDeduction" :typeTag="4" :typeValue="1" />
                <four-major-insurance v-if="data.data.nationalPensionSupportPercent" :typeTag="6" :ratio="data.data.nationalPensionSupportPercent" />
                <four-major-insurance v-if="data.data.employeementInsuranceSupportPercent" :typeTag="7" :ratio="data.data.employeementInsuranceSupportPercent" />
                <four-major-insurance v-if="data.data.employeementReductionRatePercent" :typeTag="8" :ratio="data.data.employeementReductionRatePercent" />
                <four-major-insurance v-if="data.data.incomeTaxMagnification" :typeTag="10" :ratio="data.data.incomeTaxMagnification" />
              </div>
            </template>
            <DxColumn cell-template="pupop" width="30" />
            <template #pupop="{ data }" class="custom-action">
              <div class="custom-action" style="text-align: center" v-if="data.data.deletable">
                <a-space :size="10">
                  <DeleteOutlined @click="actionDeleteFuc(data.data.employeeId)" />
                </a-space>
              </div>
            </template>
            <DxScrolling column-rendering-mode="virtual" />
          </DxDataGrid>
        </a-spin>
      </a-col>
      <a-col :span="13" class="custom-layout">
        <PA120PopupAddNewVue ref="addNew" :idRowEdit="idRowEdit" :modalStatus="modalAddNewStatus" v-if="actionChangeComponent == 1" :key="addComponentKey" />
        <PA120PopupEdit :idRowEdit="idRowEdit" :modalStatus="modalEditStatus" v-if="actionChangeComponent == 2" :arrRowEdit="arrRowEdit" :resetActiveKey="resetActiveKey" />
      </a-col>
    </a-row>
    <PopupMessage :modalStatus="delStatus" @closePopup="delStatus = false" typeModal="confirm" :content="contentDelete" okText="네" cancelText="아니요" @checkConfirm="statusComfirm" />
    <history-popup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" title="변경이력" :idRowEdit="idRowEdit" typeHistory="pa-120" />
    <!-- <PopupMessage
      :modalStatus="resetStatus"
      @closePopup="resetStatus = false"
      :typeModal="'confirm'"
      :title="'처음부터 다시 입력하겠습니까?'"
      :content="''"
      :keyAccept="'1234'"
      :okText="'확인'"
      @checkConfirm="onResetComfirm"
    /> -->
    <PopupMessage
      :modalStatus="rowChangeStatus"
      @closePopup="rowChangeStatus = false"
      :typeModal="'confirm'"
      :title="messageSave"
      :content="''"
      :keyAccept="'1234'"
      :okText="'확인'"
      @checkConfirm="onRowChangeComfirm"
    />
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from 'vue';
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxPaging, DxScrolling } from 'devextreme-vue/data-grid';
import DxButton from 'devextreme-vue/button';
import { useStore } from 'vuex';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { companyId } from '@/helpers/commonFunction';
import notification from '@/utils/notification';
import queries from '@/graphql/queries/PA/PA1/PA120/index';
import mutations from '@/graphql/mutations/PA/PA1/PA120/index';
import PA120PopupAddNewVue from './components/PA120PopupAddNew.vue';
import PA120PopupEdit from './components/PA120PopupEdit.vue';
import { Message } from '@/configs/enum';
import { DxTooltip } from 'devextreme-vue/tooltip';
import { initFormStateTab1 } from './utils/index';
import { EditOutlined, HistoryOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import ColumnGroup from 'ant-design-vue/lib/vc-table/sugar/ColumnGroup';

export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxToolbar,
    DxPaging,
    DxItem,
    DxButton,
    EditOutlined,
    HistoryOutlined,
    DeleteOutlined,
    PA120PopupAddNewVue,
    PA120PopupEdit,
    DxScrolling,
    DxTooltip,
  },
  setup() {
    const actionChangeComponent = ref(1);
    const addNew = ref();
    const contentDelete = Message.getMessage('PA120', '002').message;
    const delStatus = ref(false);
    const dataSource = ref<any[]>([]);
    const store = useStore();
    const totalUserOnl = ref(0);
    const totalUserOff = ref(0);
    const globalYear = computed(() => store.state.settings.globalYear);
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const arrRowEdit = computed(() => store.state.common.arrayRoweditedPA120);
    const initFormStateTabPA120 = computed(() => store.state.common.initFormStateTabPA120);
    const editRowPA120 = computed(() => store.state.common.editRowPA120);
    const isCompareEditPA120 = computed(() => store.state.common.isCompareEditPA120);
    const isNewRowPA120 = computed(() => store.state.common.isNewRowPA120);
    const trigger = ref<boolean>(true);
    const originData = ref({
      companyId: companyId,
      imputedYear: globalYear,
    });
    const idAction = ref();
    const modalAddNewStatus = ref<boolean>(false);
    const modalEditStatus = ref<boolean>(false);
    const modalHistoryStatus = ref<boolean>(false);
    const defaultVisible = ref<boolean>(false);
    const idRowEdit = ref();
    const rowChangeStatus = ref<Boolean>(false);
    const isRefreshDataEditPA120 = computed(() => store.state.common.isRefreshDataEditPA120);
    const idRow = ref();
    const messageSave = Message.getMessage('COMMON', '501').message;
    const messageDel = Message.getMessage('COMMON', '401').message;
    const isAddFormErrorPA120 = computed(() => store.state.common.isAddFormErrorPA120);
    const token = computed(() => store.state.auth.token);
    const {
      refetch: refetchData,
      result,
      loading,
    } = useQuery(queries.getEmployeeWages, originData, () => ({
      enabled: trigger.value,
      fetchPolicy: 'no-cache',
    }));
    const { mutate: actionDelete, onError: errorDelete, onDone: successDelete } = useMutation(mutations.deleteEmployeeWage);
    errorDelete((e) => {
      notification('error', e.message);
    });
    successDelete((e) => {
      notification('success', `업데이트 완료!`);
      trigger.value = true;
      refetchData();
      store.commit('common/initFormStateTabPA120', initFormStateTab1);
      addComponentKey.value++;
      focusedRowKey.value = null;
    });
    watch(result, (value) => {
      if (value) {
        dataSource.value = value.getEmployeeWages;
        trigger.value = false;
      }
    });
    // addcomponent
    const addComponentKey = ref(1);
    const resetStatus = ref(false);
    const onResetComfirm = (ok: Boolean) => {
      if (ok) {
        addComponentKey.value++;
        dataSource.value = dataSource.value.splice(0, dataSource.value.length - 1);
        addNewRow();
        resetStatus.value = false;
      } else {
        focusedRowKey.value = initFormStateTabPA120.value.employeeId;
      }
    };
    //delete row
    watch(
      () => store.state.common.reloadEmployeeList,
      () => {
        trigger.value = true;
        refetchData();
      }
    );
    const modalHistory = () => {
      modalHistoryStatus.value = true;
    };
    const actionDeleteFuc = (data: any) => {
      idAction.value = data;
      delStatus.value = true;
    };
    const statusComfirm = (res: any) => {
      if (res == true) {
        actionDelete({
          companyId: companyId,
          imputedYear: globalYear.value,
          employeeId: idAction.value,
        });
        actionChangeComponent.value = 1;
      }
    };
    //compare Data
    const compareType = ref(1); //0 is row change. 1 is add button;
    // Comparing the values of two objects.
    const compareType1 = () => {
      if (JSON.stringify(initFormStateTab1) == JSON.stringify(initFormStateTabPA120.value)) {
        return true;
      }
      return false;
    };
    const compareType2 = () => {
      if (JSON.stringify(editRowPA120.value) == JSON.stringify(initFormStateTabPA120.value)) {
        return true;
      }
      return false;
    };
    //on add row
    const isFirstWeb = ref(true);
    const openAddNewModal = async () => {
      actionChangeComponent.value = 1;
      if (isNewRowPA120.value) {
        if (compareType.value == 2) {
          dataSource.value = dataSource.value.splice(0, dataSource.value.length - 1);
          addNewRow();
          compareType.value = 1;
          // console.log(`output->type =2`);
          return;
        }
        if (!compareType1()) {
          // console.log(`output->type = 1 loi`);
          rowChangeStatus.value = true;
          isFirstWeb.value = false;
          return;
        }
        store.commit('common/initFormStateTabPA120', initFormStateTab1);
        // console.log(`output->type = 1 ko loi`, compareType1());
        if (!isFirstWeb.value) {
          dataSource.value = dataSource.value.splice(0, dataSource.value.length - 1);
        }
        dataSource.value = dataSource.value.concat([initFormStateTabPA120.value]);
        addComponentKey.value++;
        focusedRowKey.value = initFormStateTabPA120.value.employeeId;
        isFirstWeb.value = false;
        return;
      }
      isFirstWeb.value = false;
      initFormStateTabPA120.value.stayQualification = initFormStateTab1.stayQualification;
      setTimeout(() => {
        addNewRow();
      }, 50);
      return;
    };

    //row change confirm
    const onRowChangeComfirm = async (ok: boolean) => {
      if (ok) {
        let promise1 = new Promise<void>((resolve) => {
          if (isNewRowPA120.value) {
            let ele = document.getElementById('btn-save') as HTMLInputElement;
            ele.click();
            resolve();
          }
        });
        let promise2 = new Promise<void>((resolve) => {
          if (compareType.value == 2) {
            let ele = document.getElementById('btn-save-edit');
            ele?.click();
            idRowEdit.value = idRow.value;
            resolve();
          }
        });
        Promise.all([promise1, promise2]);
        if (isAddFormErrorPA120.value) {
          focusedRowKey.value = initFormStateTabPA120.value.employeeId;
        } else {
          focusedRowKey.value = idRow.value;
        }
        return;
      } else {
        if (isNewRowPA120.value) {
          if (!isFirstWeb.value) {
            dataSource.value = dataSource.value.splice(0, dataSource.value.length - 1);
          }
          if (compareType.value == 1) {
            // console.log(`output-> toi dang o so 1`);
            setTimeout(() => {
              addNewRow();
            }, 100);
            focusedRowKey.value = initFormStateTabPA120.value.employeeId;
          }
        }
        if (compareType.value == 2) {
          // console.log(`output-> toi dang o so 2 `);
          idRowEdit.value = idRow.value;
          store.state.common.isNewRowPA120 = false;
          actionChangeComponent.value = 2;
        }
      }
      if (!isNewRowPA120.value) {
        compareType.value = 2;
      } else {
        compareType.value = 1;
        focusedRowKey.value = initFormStateTabPA120.value.employeeId;
      }
    };
    watch(result, (value) => {
      if (value) {
        dataSource.value = value.getEmployeeWages;
        totalUserOnl.value = 0;
        totalUserOff.value = 0;
        dataSource.value.map((val: any) => {
          if (val.status != 0) {
            totalUserOnl.value++;
          } else {
            totalUserOff.value++;
          }
        });
        trigger.value = false;
      }
    });

    watch(
      () => modalEditStatus.value,
      (value) => {
        if (value == false) {
          trigger.value = true;
          refetchData();
        }
      }
    );
    //rest resetActiveKey
    const resetActiveKey = ref('1');

    //edit row

    const actionEdit = (data: any) => {
      compareType.value = 2;
      if (isNewRowPA120.value) {
        if (compareType1()) {
          console.log(`output->chuyen row bth`);
          delNewRow();
          focusedRowKey.value = data.data.employeeId;
          idRowEdit.value = data.data.employeeId;
          actionChangeComponent.value = 2;
          isFirstWeb.value = false;
          return;
        }
        console.log(`output->co new row, khac nhau`);
        rowChangeStatus.value = true;
        idRow.value = data.data.employeeId;
        isFirstWeb.value = false;
        return;
      }
      actionChangeComponent.value = 2;
      isFirstWeb.value = false;
      if (!compareType2()) {
        console.log(`output->row khac`);
        rowChangeStatus.value = true;
        idRow.value = data.data.employeeId;
        return;
      } else {
        console.log(`output->chuyen row bth. ko co newrow`);
        store.state.common.isCompareEditPA120 = true;
        idRowEdit.value = data.data.employeeId;
      }
    };
    // when submit form done
    const actionFormDonePA120 = computed(() => store.getters['common/actionFormDonePA120']);
    watch(actionFormDonePA120, () => {
      trigger.value = true;
      refetchData();
    });
    //tooltip residentId
    const isResidentIdError = reactive<any>({});
    const toolTopErorr = (val: any) => {
      isResidentIdError[val.id] = val.isError;
    };
    //focus Row
    const focusedRowKey = ref<String | Number | null>(0);
    const keyActivePA120 = computed(() => store.getters['common/keyActivePA120']);
    const resetTabPA120 = computed(() => store.getters['common/resetTabPA120']);
    watch(keyActivePA120, (newval: number) => {
      focusedRowKey.value = +newval;
    });
    // del row when add row
    const delNewRow = () => {
      if (!isFirstWeb.value) {
        dataSource.value = dataSource.value.splice(0, dataSource.value.length - 1);
      }
      store.commit('common/initFormStateTabPA120', initFormStateTab1);
      addComponentKey.value++;
      //   focusedRowKey.value = null;
      store.state.common.isNewRowPA120 = false;
      compareType.value = 2;
    };
    const addNewRow = () => {
      store.commit('common/initFormStateTabPA120', initFormStateTab1);
      dataSource.value = dataSource.value.concat([initFormStateTabPA120.value]);
      store.state.common.isNewRowPA120 = true;
      addComponentKey.value++;
      compareType.value = 1;
      focusedRowKey.value = initFormStateTabPA120.value.employeeId;
    };
    return {
      loading,
      idRowEdit,
      actionChangeComponent,
      modalEditStatus,
      delStatus,
      dataSource,
      actionEdit,
      actionDelete,
      actionDeleteFuc,
      modalHistory,
      contentDelete,
      totalUserOnl,
      totalUserOff,
      modalHistoryStatus,
      openAddNewModal,
      modalAddNewStatus,
      statusComfirm,
      per_page,
      move_column,
      colomn_resize,
      addComponentKey,
      onResetComfirm,
      resetStatus,
      addNew,
      arrRowEdit,
      toolTopErorr,
      isResidentIdError,
      focusedRowKey,
      resetActiveKey,
      resetTabPA120,
      keyActivePA120,
      defaultVisible,
      initFormStateTabPA120,
      isNewRowPA120,
      initFormStateTab1,
      rowChangeStatus,
      onRowChangeComfirm,
      editRowPA120,
      isRefreshDataEditPA120,
      compareType,
      messageSave,
      messageDel,
      token,
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss" >
</style>
