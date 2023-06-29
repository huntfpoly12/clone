<template>
  <a-modal
    title="4대보험 관리지사정보"
    :visible="true"
    @cancel="onCancelModal"
    :mask-closable="false"
    class="confirm-md"
    footer=""
    :width="700"
  >
    <section class="mt-20">
      <a-spin :spinning="false">
        <DxDataGrid
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="dataSource"
          :show-borders="true"
          key-expr="code"
          class="mt-10"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
          :sorting="false"
          @key-down="onKeyDown"
          @row-updating="rowUpdating"
        >
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxEditing :allow-updating="true" mode="cell" />
          <DxColumn caption="보험명" data-field="code" :allowEditing="false" />
          <DxColumn caption="지사명" data-field="col1" />
          <DxColumn caption="팩스번호" data-field="col2" />
        </DxDataGrid>
      </a-spin>
      <a-row class="mt-15">
        <a-col :span="8" :offset="8" style="text-align: center">
          <button-basic
            text="저장"
            type="default"
            mode="contained"
            :width="90"
            id="btn-save-edit"
            @onClick="onSubmit"
            :disabled="!isChangeForm"
          />
        </a-col>
      </a-row>
    </section>
  </a-modal>
</template>
<script lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { computed, defineComponent, ref } from 'vue';
import mutations from '@/graphql/mutations/BF/BF5/BF530/index';
import notification from '@/utils/notification';
import { useStore } from 'vuex';
import DxDataGrid, { DxColumn, DxEditing, DxScrolling, DxSummary } from 'devextreme-vue/data-grid';
import { watch } from 'vue';
import { Message } from '@/configs/enum';
import { DxLoadPanel } from 'devextreme-vue';
import comfirmClosePopup from '@/utils/comfirmClosePopup';

export default defineComponent({
  props: {
    companyIdParam: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;

    // --------------------------GET DATASOURCE --------------------------

    const dataSource = ref([
      { code: '국민연금', col1: '', col2: '' },
      { code: '건강보험', col1: '', col2: '' },
      { code: '고용보험', col1: '', col2: '' },
      { code: '산재보험', col1: '', col2: '' },
    ]);
    const dataSourceToCompare: any = ref();
    const filterDsTab1Bf530 = computed(() => store.state.common.filterDsTab1Bf530);
    watch(() => props.companyIdParam, (newVal: any) => {
      if (newVal) {
        let data = filterDsTab1Bf530.value.filter((item: any) => item.companyId == newVal)[0];
        dataSource.value.forEach((item: any) => {
          if (item.code == '국민연금') {
            item.col1 = data.nationalPensionBranchName;
            item.col2 = data.nationalPensionFax;
            return;
          }
          if (item.code == '건강보험') {
            item.col1 = data.healthInsuranceBranchName;
            item.col2 = data.healthInsuranceFax;
            return;
          }
          if (item.code == '고용보험') {
            item.col1 = data.employeementInsuranceBranchName;
            item.col2 = data.employeementInsuranceFax;
            return;
          }
          if (item.code == '산재보험') {
            item.col1 = data.industrialAccidentInsuranceBranchName;
            item.col2 = data.industrialAccidentInsuranceFax;
            return;
          }
        });
        dataSourceToCompare.value = JSON.parse(JSON.stringify(dataSource.value))
      }
    }, { immediate: true })

    //----------------- UPDATE LOCAL OFFICCE INFO --------------------------------+

    const { mutate: creationLocalOfficeInfo, onDone: onDoneTab1, onError: onErrorTab1, } =
      useMutation(mutations.updateMajorInsuranceLocalOfficeInfo);
    onDoneTab1(() => {
      notification("success", Message.getCommonMessage('106').message);
      emit("closeModal", true)
    });
    onErrorTab1((e: any) => {
      notification("error", e.message);
    });
    const onSubmit = () => {
      let input: any = {};
      dataSource.value.forEach((item: any) => {
        if (item.code == '국민연금') {
          input.nationalPensionBranchName = item.col1;
          input.nationalPensionFax = item.col2;
          return;
        }
        if (item.code == '건강보험') {
          input.healthInsuranceBranchName = item.col1;
          input.healthInsuranceFax = item.col2;
          return;
        }
        if (item.code == '고용보험') {
          input.employeementInsuranceBranchName = item.col1;
          input.employeementInsuranceFax = item.col2;
          return;
        }
        if (item.code == '산재보험') {
          input.industrialAccidentInsuranceBranchName = item.col1;
          input.industrialAccidentInsuranceFax = item.col2;
          return;
        }
      })
      creationLocalOfficeInfo({
        companyId: props.companyIdParam,
        input
      })
    };

    // -------------------disabled BTN SAVE------------------------------

    const isChangeForm = ref(false);
    // const changeDataSCount = ref(0);
    // watch(() => dataSource, (newVal: any) => {
    //   changeDataSCount.value++;
    // }, { deep: true })
    const onKeyDown = (e: any) => {
      isChangeForm.value = true;
    }

    //--------------------------------CLOSE MODAL--------------------------------

    const compareForm = computed(()=> JSON.stringify(dataSource.value) === JSON.stringify(dataSourceToCompare.value))
    const onCancelModal = () => {
      if(!isChangeForm.value) {
        emit("closeModal", false);
      } else {
        comfirmClosePopup(() => {
          emit("closeModal", false)
        })
      }
    };

    const rowUpdating = (e: any) => {
    }
    return {
      onSubmit,
      onCancelModal,
      per_page,
      move_column,
      colomn_resize,
      dataSource,
      isChangeForm,
      onKeyDown,
      rowUpdating,
    };
  },
  components: { DxDataGrid, DxScrolling, DxColumn, DxSummary, DxEditing, DxLoadPanel }
});
</script>
<style lang="scss" scoped>
:deep .dx-datagrid-content .dx-datagrid-table .dx-row > td {
  height: 34px;
}

:deep .dx-overlay-wrapper.dx-datagrid-revert-tooltip {
  display: none;
}
</style>
