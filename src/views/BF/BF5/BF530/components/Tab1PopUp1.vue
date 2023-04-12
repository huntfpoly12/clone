<template>
  <a-modal :visible="true" @cancel="setModalStatus" :mask-closable="false" class="confirm-md" footer="" :width="700">
    <section class="mt-20">
      <a-spin :spinning="false">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
          key-expr="code" class="mt-10" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
          :column-auto-width="true">
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxColumn caption="사업자코드" data-field="code" />
          <DxColumn caption="사업자번호" data-field="bizNumber" />
          <DxColumn caption="상호" data-field="name" />
          <DxColumn caption="대표자명" data-field="presidentName" />
        </DxDataGrid>
      </a-spin>
    </section>
  </a-modal>
</template>
<script lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { defineComponent, ref } from 'vue';
import mutations from '@/graphql/mutations/BF/BF6/BF620/index';
import notification from '@/utils/notification';
import { useStore } from 'vuex';
import DxDataGrid, { DxColumn, DxScrolling, DxSummary } from 'devextreme-vue/data-grid';

export default defineComponent({
  setup(props, { emit }) {
    console.log(`output-`,)
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const dataSource = ref([]);
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
    return {
      onSubmit,
      setModalStatus,
      per_page,
      move_column,
      colomn_resize,
      dataSource,
    };
  },
  components: { DxDataGrid, DxScrolling, DxColumn, DxSummary }
});
</script>
<style lang="scss" scoped>
.eamil-input {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  span {
    padding-right: 10px;
  }
}

.mt-50 {
  margin-top: 50px;
}

.text-align-center {
  text-align: center;
}

.button-form-modal {
  margin: 0px 5px;
}
</style>
