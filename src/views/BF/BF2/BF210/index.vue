<template>
    <action-header title="회원관리" @actionSearch="searching" :buttonSearch="true"/>
    <div id="bf-210">
        <div class="page-content">
            <a-spin :spinning="loading" size="large">
                <DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" key-expr="id" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true" style="height: calc(100vh - 150px)">
                    <DxPaging :page-size="0" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색"/>
                    <DxExport :enabled="true" />
                    <DxToolbar>
                        <DxItem location="after" template="search" css-class="search-toolbar-custom" />
                        <DxItem location="after" template="button-template" css-class="cell-button-add" />
                        <DxItem name="searchPanel" />
                        <DxItem name="exportButton" css-class="cell-button-export"/>
                    </DxToolbar>
                    <template #search>
                        <div class="h-full d-flex-center gap-10" >
                            <div class="d-flex-center">
                                <label class="lable-item">회원종류 :</label>
                                <DxSelectBox id="custom-templates" :data-source="productsValue" display-expr="name" value-expr="id"
                                    item-template="item" :height="$config_styles.HeightInput" style="width:140px"
                                    field-template="field" @value-changed="changeValueType" :value="dataSearch.type">
                                    <template #field="{ data }">
                                        <Field :fieldData="data" />
                                    </template>
                                    <template #item="{ data }">
                                        <div style=" padding: 3px;">
                                            <div
                                                :style="{ color: data.color, background: data.background, padding: '2px 12px', borderRadius: '5px', border: data.border }">
                                                {{ data.name }}
                                            </div>
                                        </div>
                                    </template>
                                </DxSelectBox>
                            </div>

                            <div class="d-flex-center">
                                <checkbox-basic v-model:valueCheckbox="checkStatus.checkBox1" :size="'14'" />
                                <tag-color-use :valueUse="true" @click="changeValueCheckBox('checkBox1')"/>
                                <checkbox-basic v-model:valueCheckbox="checkStatus.checkBox2" :size="'14'" />
                                <tag-color-use :valueUse="false" @click="changeValueCheckBox('checkBox2')"/>
                            </div>
                        </div>
                    </template>
                    <template #button-template>
                        <a-tooltip placement="top" color="black">
                            <template #title>신규</template>
                            <div><DxButton icon="plus" @click="openAddNewModal" /></div>
                        </a-tooltip>

                    </template>
                    <DxColumn data-field="active" caption="상태" css-class="cell-center" cell-template="check-box" />
                    <template #check-box="{ data }">
                        <tag-color-use :valueUse="data.value"/>
                    </template>
                    <DxColumn data-field="username" caption="회원ID" css-class="cell-center" />
                    <DxColumn data-field="name" caption="회원명" />
                    <DxColumn data-field="type" caption="회원종류" cell-template="grid-cell" css-class="cell-center" />
                    <template #grid-cell="{ data }">
                        <a-tag :color="getColorTag(data.value)">
                            {{
                                data.value == "m" ? "매니저" : (data.value == "c" ? "고객사" : (data.value == "p" ? "파트너" :
                                    "영업자"))
                            }}
                        </a-tag>
                    </template>
                    <DxColumn data-field="mobilePhone" caption="휴대폰" />
                    <DxColumn data-field="groupCode" caption="소속코드" />
                    <DxColumn data-field="groupName" caption="소속명" />
                    <DxColumn cell-template="pupop" :width="100" css-class="cell-center" />
                    <template #pupop="{ data }">
                        <div class="custom-action">
                            <a-space :size="10">
                                <a-tooltip color="black" placement="top">
                                    <template #title>편집</template>
                                    <EditOutlined @click="setModalEditVisible(data)" />
                                </a-tooltip>
                                <a-tooltip color="black" placement="top">
                                    <template #title>변경이력</template>
                                    <HistoryOutlined @click="modalHistory(data)" />
                                </a-tooltip>
                                <a-tooltip color="black" placement="left">
                                    <template #title>로그인이력</template>
                                    <LoginOutlined @click="modalLogin(data)" />
                                </a-tooltip>
                            </a-space>
                        </div>
                    </template>
                </DxDataGrid>
            </a-spin>
        </div>
    </div>
    <AddNew210Poup :modalStatus="modalAddNewStatus" @closePopup="closePopupAdd" :key="count"
        @createDone="createSuccess" />
    <EditBF210Popup :modalStatus="modalEditStatus" @closePopup="modalEditStatus = false" :data="popupData"
        :idRowEdit="idRowEdit" typeHistory="bf-210-pop" title="회원관리" @updateDone="createSuccess" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
        title="변경이력" :idRowEdit="idRowEdit" typeHistory="bf-210" />
    <PopLogin :modalStatus="modalLoginStatus" @closePopup="modalLoginStatus = false" :data="popupData" title="로그인이력"
        :idRow="rowChoose" />
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSearchPanel, DxToolbar, DxItem } from "devextreme-vue/data-grid";
import EditBF210Popup from "./components/EditBF210Popup.vue";
import AddNew210Poup from "./components/AddNew210Poup.vue";
import HistoryPopup from "@/components/HistoryPopup.vue";
import PopLogin from "./components/PopLogin.vue";
import DxButton from "devextreme-vue/button";
import { EditOutlined, HistoryOutlined, LoginOutlined } from "@ant-design/icons-vue";
import DxSelectBox from 'devextreme-vue/select-box';
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/BF/BF2/BF210/index";
import Field from './components/Field.vue';
import { dataSearchIndex, productsValue } from "./utils/index";
import { onExportingCommon, makeDataClean } from "@/helpers/commonFunction"
import notification from '@/utils/notification';
import cloneDeep from "lodash/cloneDeep";
export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxButton,
        DxPaging,
        DxExport,
        DxSearchPanel,
        EditOutlined,
        HistoryOutlined,
        DxToolbar,
        DxItem,
        AddNew210Poup,
        EditBF210Popup,
        HistoryPopup,
        PopLogin,
        LoginOutlined,
        DxSelectBox,
        Field,
    },
    setup() {
        const popupData = ref([])
        const count = ref(0)
        const modalAddNewStatus = ref(false)
        const modalHistoryStatus = ref(false)
        const modalLoginStatus = ref(false)
        const modalEditStatus = ref<boolean>(false);
        const checkStatus = ref({
            checkBox1: true,
            checkBox2: false
        })
        const rowChoose = ref()
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const dataSearch:any = ref({
            ...dataSearchIndex,
            rows: 100000
        })
        const rowTable = ref()
        var idRowEdit = ref<number>(0)
        // const originData = ref()
        // let products = ref([...productsValue])
        const dataSource = ref([])
        const { refetch: refetchData, onResult, loading: loading, onError } = useQuery(queries.searchUsers, { filter: cloneDeep(dataSearch.value) }, () => ({
            fetchPolicy: "no-cache",
        }))
        onError((e) => {
            notification("error", e.message);
        });
        onResult((res) => {
            rowTable.value = res.data.searchUsers.totalCount
            dataSource.value = res.data.searchUsers.datas
        })
        const changePage = () => {
            makeDataClean(dataSearch.value)
            refetchData()
        }
        const searching = () => {
            if (checkStatus.value.checkBox1 == true && checkStatus.value.checkBox2 == false) {
                dataSearch.value.active = true
            } else if (checkStatus.value.checkBox2 == true && checkStatus.value.checkBox1 == false) {
                dataSearch.value.active = false
            } else {
                delete dataSearch.value.active
            }
            const search = {...dataSearch.value}
            if(!search.groupCode) delete search.groupCode
            if(!search.groupName) delete search.groupName
            if(!search.name) delete search.name
            if(!search.username) delete search.username
            refetchData({
                filter: search
            })
        }
        const changeValueCheckBox = (checkbox: any) => {
            if (checkbox == 'checkBox1')
                checkStatus.value.checkBox1 = !checkStatus.value.checkBox1
            else
                checkStatus.value.checkBox2 = !checkStatus.value.checkBox2
        }
        const openAddNewModal = () => {
            modalAddNewStatus.value = true;
        }
        const setModalEditVisible = (data: any) => {
            idRowEdit.value = data.data.id
            modalEditStatus.value = true;
            popupData.value = data;
        }
        const modalHistory = (data: any) => {
            idRowEdit.value = data.data.id
            modalHistoryStatus.value = true;
            popupData.value = data;
        }
        const modalLogin = (data: any) => {
            rowChoose.value = data.key
            modalLoginStatus.value = true;
            popupData.value = data;
        }
        const getColorTag = (data: any) => {
            if (data === "c") {
                return "#91d5ff";
            } else if (data === "m") {
                return "black";
            } else if (data === "r") {
                return "grey";
            } else if (data === "p") {
                return "goldenrod";
            }
        }
        const changeValueType = (e: any) => {
            dataSearch.value.type = e.value
        }

        const createSuccess = () => {
            makeDataClean(dataSearch.value)
            refetchData()
        }
        // Watch
        watch(() => modalEditStatus.value,
            () => {
                // refetchData()
            }
        );
        const closePopupAdd = () => {
            modalAddNewStatus.value = false;
            count.value++
        }
        return {
            createSuccess,
            changePage,
            rowTable,
            changeValueType,
            move_column,
            colomn_resize,
            openAddNewModal,
            setModalEditVisible,
            getColorTag,
            modalHistory,
            modalLogin,
            popupData,
            modalAddNewStatus,
            modalLoginStatus,
            modalHistoryStatus,
            changeValueCheckBox,
            modalEditStatus,
            dataSource,
            idRowEdit,
            searching,
            dataSearch,
            rowChoose,
            checkStatus,
            productsValue,
            count,
            loading, closePopupAdd,
        }
    },
});
</script>
<style scoped lang="scss" src="./style/style.scss"/>
