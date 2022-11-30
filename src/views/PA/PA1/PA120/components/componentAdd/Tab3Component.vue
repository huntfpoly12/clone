<!-- eslint-disable vue/multi-word-component-names -->
<template>
  {{employeeId}} {{dataSource}}
     <div id="tab23-pa120">
             <a-row>
               <a-col :span="24">
                   <a-spin :spinning="false" size="large">
                     <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                                   :show-borders="true" 
                                   :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                                   :column-auto-width="true">
                           <DxToolbar>
                               <DxItem location="after" template="button-template" css-class="cell-button-add" />
                           </DxToolbar>
                           <template #button-template>
                               <DxButton icon="plus" @click="openAddDependent" />
                           </template>
                           <DxColumn caption="연말 관계" data-field="relation" />
                          <DxColumn caption="성명" data-field="name" />
                          <DxColumn caption="내/외국인 " data-field="age" cell-template="foreigner" />
                          <template #foreigner="{ data }">
                              <employee-info :foreigner="data.foreigner" :checkStatus="false" />
                          </template>
                          <DxColumn caption="주민등록번호" data-field="residentId" />
                          <DxColumn caption="나이" data-field="Age" />
                          <DxColumn caption="기본공제" data-field="basicDeduction" />
                          <DxColumn caption="부녀자" data-field="women" />
                       </DxDataGrid>    
                   </a-spin>
               </a-col>
           </a-row>
           <popup-add-new-dependent :modalStatus="modalAddNewDependent" @closePopup="modalAddNewDependent = false" :employeeId="employeeId"></popup-add-new-dependent>
       </div>
   </template>
   <script lang="ts">
   import { ref, defineComponent, reactive, watch, computed } from "vue";
   import { DxDataGrid, DxColumn, DxToolbar, DxItem } from "devextreme-vue/data-grid";
   import DxButton from "devextreme-vue/button";
   import { useStore } from 'vuex';
   import PopupAddNewDependent from '../tab3Dependent/PopupAddNewDependent.vue'
   import { useMutation, useQuery } from "@vue/apollo-composable";
   import queries from "../../../../../../graphql/queries/PA/PA1/PA120/index";
import { companyId } from "../../../../../../helpers/commonFunction";
   export default defineComponent({
     components: {
            PopupAddNewDependent,
           DxDataGrid,
           DxColumn,
           DxToolbar,
           DxItem,
           DxButton,
     },
     props: {
        employeeId:{
            type:String,
            default:0,
            },
    },
     setup(props, context) {
        const dataSource = ref([]);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const trigger = ref<boolean>(true);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const modalAddNewDependent = ref<boolean>(false);
        const modalEditStatus = ref<boolean>(false);
        const modalHistoryStatus = ref<boolean>(false);
        const globalYear = computed(() => store.state.settings.globalYear);
        const originDataDetail = reactive({
          companyId: companyId,
          imputedYear: globalYear.value,
          employeeId: ref(props.employeeId).value,
        });
        const {
          result,
        } = useQuery(queries.getEmployeeWage, originDataDetail, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        watch(result, (value) => {
            if (value) {
                dataSource.value = value.getEmployeeWage.dependents;
                console.log(value.getEmployeeWage.dependents);
                trigger.value = false;
            }
        });
        const openAddDependent = () => {
                modalAddNewDependent.value = true;
        };
        const actionEdit = (data : any) => {

        }
        const modalHistory = (data: any) => {
        
        }

        const actionDelete = (data: any)=>{

        }
        const onSubmit = (e: any) => {
        };
       return {

         dataSource,
         modalEditStatus,
         modalAddNewDependent,
         openAddDependent,
         actionEdit,
         modalHistory,
         actionDelete,
         onSubmit,
         per_page, move_column, colomn_resize,
         originDataDetail,
       }
     },
   });
   </script>

   