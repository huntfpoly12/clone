<template>
    <action-header title="기타소득자등록" @actionSave="onSubmit($event)" />
    <div id="pa-510" class="page-content">
        <a-row>
            <a-spin :spinning="loading" size="large">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" key-expr="employeeId" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <DxColumn caption="귀속월" cell-template="imputed-year" width="350px" />
                    <template #imputed-year="{ data }">
                        <span>지급연월 {{ data.data.paymentYear }}-{{ data.data.paymentMonth }}</span>
                    </template>
                    <DxColumn caption="{{ imputedMonth }}" cell-template="imputed-month" />
                    <template #imputed-month="{ data }">
                        <span>{{ data.data.paymentYear }}-{{ data.data.paymentMonth }}</span>
                    </template>
                </DxDataGrid>
            </a-spin>

            <!-- <div style="border: 1px solid #ddd; margin-top: 20px; padding: 10px;">
                <h2 style="font-weight: 600; color: gray" class="title_modal">
                    급여상세항목
                </h2>
            </div> -->
            <!-- </a-col>
            <a-col :span="12" class="custom-layout" style="padding-right: 0px;">
                <PA510PopupAddNew :modalStatus="modalAddNewStatus" @closePopup="closeAction"
                    v-if="actionChangeComponent == 1" />
                <PA510PopupEdit :idRowEdit="idRowEdit" :modalStatus="modalEditStatus" @closePopup="closeAction"
                    v-if="actionChangeComponent == 2" />
            </a-col> -->
        </a-row>
        <a-row>
            <a-col :span="11" class="">
                <DxButton :text="'귀'" :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
                <DxButton :text="'지'" :style="{ color: 'white', backgroundColor: 'black' }" :height="'33px'" />
                <DxButton :text="'귀'" :style="{ color: 'white', backgroundColor: 'blue' }" :height="'33px'" />
            </a-col>
            <a-col :span="13" class="">
                <DxButton @click="deleteItem">
                    <img style="width: 17px;" src="@/assets/images/icon_delete.png" alt="">
                </DxButton>
                <DxButton icon="plus" />
                <DxButton icon="edit" @click="editItem"/>

                <DxDropDownButton :items="arrDropDown" text="급여대장"
                    @item-click="onItemClick" item-template="item-field">
                    <template #item-field="{ data }">
                        <div style="text-align: center;"><img :src="'../../../../../src/assets/images/'+data.img" alt="" style="width: 25px; height: 25px;"/></div>
                    </template>
                </DxDropDownButton>

            </a-col>
        </a-row>
        <PrintPayrollRegisterPopup :modalStatus="modalPrintPayrollRegister" @closePopup="modalPrintPayrollRegister = false"
                    :data="popupDataPayrollRegister"/>
        <DeletePopup :modalStatus="modalDelete" @closePopup="modalDelete = false"
        :data="popupDataDelete"/>
        <EditPopup :modalStatus="modalEdit" @closePopup="modalEdit = false"
        :data="popupDataEdit" />
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue"
import DxButton from "devextreme-vue/button"
import { useStore } from 'vuex'
import { useQuery, useMutation } from "@vue/apollo-composable"
import { companyId } from "../../../../helpers/commonFunction"
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxSummary, DxTotalItem } from "devextreme-vue/data-grid"
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue"
import notification from "../../../../utils/notification"
import PrintPayrollRegisterPopup from "./components/Popup/PrintPayrollRegisterPopup.vue"
import queries from "../../../../graphql/queries/PA/PA5/PA510/index"
import mutations from "../../../../graphql/mutations/PA/PA5/PA510/index"
import { Message } from "../../../../configs/enum"
import DxDropDownButton from 'devextreme-vue/drop-down-button';
import DeletePopup from "./components/Popup/DeletePopup.vue"
import EditPopup from "./components/Popup/EditPopup.vue"
export default defineComponent({
    components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxScrolling,
    DxToolbar,
    DxEditing,
    DxGrouping,
    DxItem,
    DxButton,
    DxSummary,
    DxTotalItem,
    EditOutlined,
    HistoryOutlined,
    SearchOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SaveOutlined,
    DxDropDownButton,
    PrintPayrollRegisterPopup,
    DeletePopup,
    EditPopup
},
    setup() {
        const dataSource = ref([])
        const store = useStore()
        const globalYear = computed(() => store.state.settings.globalYear)
        const per_page = computed(() => store.state.settings.per_page)
        const move_column = computed(() => store.state.settings.move_column)
        const trigger = ref<boolean>(true)
        const colomn_resize = computed(() => store.state.settings.colomn_resize)
        const modalPrintPayrollRegister = ref<boolean>(false)
        const modalDelete = ref<boolean>(false)
        const modalEdit = ref<boolean>(false)
        const popupDataPayrollRegister = ref({})
        const popupDataDelete = ref({})
        const popupDataEdit = ref({})
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear,
            // imputedMonth: 10,
        })
        // ======================= GRAPQL ================================
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.getIncomeProcessWageDailies, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
        // ======================= WATCH ==================================
        watch(result, (value) => {
            if (value) {
                dataSource.value = value.getIncomeProcessWageDailies
                trigger.value = false
            }
            console.log(dataSource.value);

        })

        const deleteItem = (value: any) => {
            modalDelete.value = true;
            popupDataDelete.value = value
        };
        const editItem = (value: any) => {
            modalEdit.value = true;
            popupDataEdit.value = value
        };
        // ======================= FUNCTION ================================
        const onSubmit = (e: any) => {
        }

        const arrDropDown = [
            { id: 1, img: 'print.svg', api: '' },
            { id: 2, img: 'email.png', api: '' },
        ];
        const onItemClick = (value: any) => {
            modalPrintPayrollRegister.value = true;
            popupDataPayrollRegister.value = value
        }

        return {
            loading,
            dataSource,
            per_page, move_column, colomn_resize,
            refetchData,
            onSubmit,
            onItemClick,
            arrDropDown,
            modalPrintPayrollRegister,
            popupDataPayrollRegister,
            deleteItem,
            modalDelete,
            popupDataDelete,
            editItem,
            modalEdit,
            popupDataEdit,
        }

    },
})
</script> 
<style lang="scss" scoped src="./style/style.scss" >

</style>
