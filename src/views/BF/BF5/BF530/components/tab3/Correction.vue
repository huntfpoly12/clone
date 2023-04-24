<template>
  <a-modal title="4대보험 관리지사정보" :visible="true" @cancel="setModalStatus" :mask-closable="false" class="confirm-md"
    footer="" :width="700">
    <section class="mt-20">
      <a-spin :spinning="false">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
          key-expr="code" class="mt-10" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
          :column-auto-width="true">
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxEditing :allow-updating="true" mode="cell" />
          <DxColumn caption="보험명" data-field="code" :allowEditing="false" />
          <DxColumn caption="지사명" data-field="bizNumber" />
          <DxColumn caption="팩스번호" data-field="name" />
        </DxDataGrid>
      </a-spin>
      <a-row class="mt-15">
        <a-col :span="8" :offset="8" style="text-align: center">
          <button-basic text="저장" type="default" mode="contained" :width="90" id="btn-save-edit" @onClick="onSubmit" />
        </a-col>
      </a-row>
    </section>
  </a-modal>
</template>
<script lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { defineComponent, ref } from 'vue';
import mutations from '@/graphql/mutations/BF/BF6/BF620/index';
import notification from '@/utils/notification';
import { useStore } from 'vuex';
import DxDataGrid, { DxColumn, DxEditing, DxScrolling, DxSummary } from 'devextreme-vue/data-grid';

export default defineComponent({
  setup(props, { emit }) {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const dataSource = ref([
      { code: '국민연금', bizNumber: '', name: '' },
      { code: '건강보험', bizNumber: '', name: '' },
      { code: '고용보험', bizNumber: '', name: '' },
      { code: '산재보험', bizNumber: '', name: '' },
    ]);
    //
    // const companiesInElectronicDataSource = ref([]);
    // const companiesInElectronicTrigger = ref(false);
    // const modalStatus = ref<boolean>(false);
    // const companiesInElectronic = ref({
    //   type: ElecFilingFileFilter.type,
    //   electronicFilingId: 1,
    // });
    // const {
    //   result: companiesInElectronicResult,
    //   loading: companiesInElectronicLoading,
    //   refetch: companiesInElectronicRefetch,
    //   //   variables: companiesVariable,
    // } = useQuery(queries.getCompaniesInElectronicFilingFile, companiesInElectronic, () => ({
    //   enabled: companiesInElectronicTrigger.value,
    //   fetchPolicy: 'no-cache',
    // }));
    // watch(companiesInElectronicResult, (newVal) => {
    //   let data = newVal.getCompaniesInElectronicFilingFile;
    //   companiesInElectronicDataSource.value = data;
    //   companiesInElectronicTrigger.value = false;
    // });
    //----------------- query send request file tab 1--------------------------------
    const { mutate: creationWithholdingTaxTab1, onDone: onDoneTab1, onError: onErrorTab1, } = useMutation(mutations.requestCreationWithholdingTaxElectronicFilingFile);
    // --------------query send request file tab 2--------------------------------
    const { mutate: creationLocalTab2, onDone: onDoneTab2, onError: onErrorTab2 } = useMutation(mutations.requestCreationLocalIncomeTaxElectronicFilingFile);
    //-------------------on Submit request --------------------------------
    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      }
      else {
        // switch (props.tabName) {
        //   case 'tab1':
        //     creationWithholdingTaxTab1(dataRequestFile.value);
        //     break;
        //   case 'tab2':
        //     creationLocalTab2(dataRequestFile.value);
        //     break;
        //   default:
        //     break;
        // }
      }
    };
    // onDone tab 1
    onDoneTab1(() => {
      notification("success", `업데이트 완료!`);
      emit("cancel", false);
    });
    onErrorTab1((e: any) => {
      notification("error", e.message);
    });
    // onDone tab 2
    onDoneTab2(() => {
      notification("success", `업데이트 완료!`);
      emit("closePopup", false);
    });
    onErrorTab2((e: any) => {
      notification("error", e.message);
    });
    const setModalStatus = () => {
      emit("closeModal", false)
    };
    const onAllowUpdate = (e: any) => {
      console.log(`output->e`, e)
    }
    return {
      onSubmit,
      setModalStatus,
      per_page,
      move_column,
      colomn_resize,
      dataSource,
      onAllowUpdate,
    };
  },
  components: { DxDataGrid, DxScrolling, DxColumn, DxSummary, DxEditing }
});
</script>
<style lang="scss" scoped>
:deep .dx-datagrid-content .dx-datagrid-table .dx-row>td {
  height: 20px;
}
</style>
