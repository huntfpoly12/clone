<template>
    <action-header title="거래처 관리" @actionSave="actionSave($event)"
        @actionSearch="actionSearch ? searching($event) : changePage($event)" :buttonDelete="false" />
    <div id="ac-610">
        <div class="search-form dflex">
            <div class="dflex">
                <label class="lable-item">거래처명 :</label>
                <default-text-box width="150px" v-model:valueInput="dataSearch.name" />
            </div>
            <div class="dflex">
                <label class="lable-item">대표자명 :</label>
                <default-text-box v-model:valueInput="dataSearch.presidentName" />
            </div>
            <div class="dflex">
                <label class="lable-item">연락처 :</label>
                <tel-text-box v-model:valueInput="dataSearch.phone" />
            </div>
            <div class="dflex">
                <checkbox-basic v-model:valueCheckbox="dataSearch.includeNonUse" :size="'20'" label="이용중지 포함" />
            </div>
        </div>
        <div class="page-content">
            <a-row gutter="24">
                <a-col span="16" class="custom-layout">
                    <a-spin :spinning="loading" size="large">
                        <DxDataGrid id="gridContainer" :show-row-lines="true" :hoverStateEnabled="true"
                            :data-source="listClient.datas" :show-borders="true" key-expr="clientId"
                            :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                            :column-auto-width="true" :onRowClick="onSelectionClick" v-model:focused-row-key="focusedRowKey"
                            :focused-row-enabled="true">
                            <DxScrolling mode="standard" show-scrollbar="always" />
                            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                            <DxExport :enabled="true" />
                            <DxToolbar>
                                <DxItem location="after" template="pagination-table" />
                                <DxItem name="searchPanel" />
                                <DxItem name="exportButton" css-class="cell-button-export" />
                                <DxItem location="after" template="button-template" css-class="cell-button-add" />
                            </DxToolbar>
                            <template #pagination-table>
                                <div v-if="listClient.totalCount > listClient.rows">
                                    <a-pagination v-model:current="listClient.page" v-model:page-size="listClient.rows"
                                        :total="listClient.totalCount" show-less-items @change="changePage" />
                                </div>
                            </template>
                            <template #button-template>
                                <a-tooltip placement="top">
                                    <template #title>거래처 등록</template>
                                    <div>
                                        <DxButton icon="plus" @click="formCreate" />
                                    </div>
                                </a-tooltip>
                            </template>
                            <DxColumn caption="거래처명" data-field="name" />
                            <DxColumn caption="사업자등록번호" cell-template="bizNumber" data-field="bizNumber" />
                            <template #bizNumber="{ data }">
                                <span v-if="data.data.bizNumber">
                                    {{
                                        data.data.bizNumber.toString().slice(0, 3)
                                    }}-{{
    data.data.bizNumber.toString().slice(3, 5)
}}-{{
    data.data.bizNumber.toString().slice(5, 10)
}}
                                </span>
                            </template>
                            <DxColumn caption="주민등록번호" cell-template="residentId" data-field="residentId" />
                            <template #residentId="{ data }">
                                <div v-if="data.data.residentId?.length == 14">
                                    <a-tooltip placement="top"
                                        v-if="parseInt(data.data.residentId.split('-')[0].slice(2, 4)) < 13 && parseInt(data.data.residentId.split('-')[0].slice(4, 6)) < 32"
                                        key="black">
                                        {{ data.data.residentId }}
                                    </a-tooltip>
                                    <a-tooltip placement="top" v-else title="ERROR" color="red">
                                        {{ data.data.residentId }}
                                    </a-tooltip>
                                </div>
                                <div v-else>
                                    <a-tooltip v-if="data.data.residentId" placement="top" key="black">
                                        {{ data.data.residentId.slice(0, 6) + '-' + data.data.residentId.slice(6, 13) }}
                                    </a-tooltip>
                                </div>
                            </template>

                            <DxColumn caption="대표자명" data-field="presidentName" />
                            <DxColumn caption="연락처" data-field="phone" />
                            <DxColumn caption="이용여부" cell-template="use" data-field="use" />
                            <template #use="{ data }">
                                <tag-color-use :valueUse="data.value" />
                            </template>
                            <DxColumn cell-template="historyClient" />
                            <template #historyClient="{ data }">
                                <div class="custom-action" style="text-align: center">
                                    <HistoryOutlined v-if="data.data.clientId" style="font-size: 18px;"
                                        @click="modalHistory(data.data)" />
                                </div>
                            </template>
                        </DxDataGrid>
                        <div class="pagination-table" v-if="listClient.totalCount > listClient.rows">
                            <a-pagination v-model:current="listClient.page" v-model:page-size="listClient.rows"
                                :total="listClient.totalCount" show-less-items @change="changePage" />
                        </div>
                    </a-spin>
                </a-col>
                <a-col span="8" class="custom-layout">
                    <a-spin :spinning="loadingDetail" size="large" :key="resetFormNum">
                        <a-form-item label="거래처명" :label-col="labelCol" class="red">
                            <default-text-box :required="true" :width="200" v-model:valueInput="formState.name" />
                        </a-form-item>

                        <a-form-item label="사업자등록번호" :label-col="labelCol">
                            <biz-number-text-box v-model:valueInput="formState.bizNumber" :width="200"
                                :disabled="disableInputBizNumber" />
                        </a-form-item>

                        <a-form-item label="주민등록번호" :label-col="labelCol">
                            <id-number-text-box :width="200" v-model:valueInput="formState.residentId"
                                :disabled="disableInputResidentId" />
                        </a-form-item>

                        <a-form-item label="대표자명" :label-col="labelCol">
                            <default-text-box :width="200" v-model:valueInput="formState.presidentName" />
                        </a-form-item>

                        <a-form-item label="연락처" :label-col="labelCol">
                            <tel-text-box type="text" :width="200" v-model:valueInput="formState.phone" />
                        </a-form-item>

                        <a-form-item label="이용/여부" :label-col="labelCol">
                            <switch-basic :width="50" v-model:valueSwitch="formState.use" :textCheck="'X'"
                                :textUnCheck="'O'" />
                            <div style="margin-left: 10px; display: inline-table;;">
                                <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
                                <span class="style-note">
                                    이용하지 않는 경우 삭제되지
                                    않으며,<br />
                                    거래처 리스트에서 조회되지 않습니다
                                </span>
                            </div>
                        </a-form-item>

                        <div class="text-align-center mt-20">
                            <button-basic :text="'저장'" type="default" :mode="'contained'" @onClick="actionSave($event)" />
                        </div>
                        <button-basic @onClick="actionToAddFromEdit" mode="outlined" type="default" text="취소"
                            id="active-save" />
                    </a-spin>
                </a-col>
            </a-row>
        </div>
        <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="originDataDetail"
            title="변경이력" typeHistory="ac-610" />
        <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" :typeModal="'confirm'"
        :title="Message.getMessage('COMMON', '501').message" content="" :okText="Message.getMessage('COMMON', '501').yes" :cancelText="Message.getMessage('COMMON', '501').no" @checkConfirm="statusComfirm" />
        <PopupMessage :modalStatus="modalStatusAdd" @closePopup="modalStatusAdd = false" :typeModal="'confirm'"
            title="처음부터 다시 입력하겠습니까?" content="" okText="네" cancelText="아니요" @checkConfirm="statusComfirmAdd" />
        <PopupMessage :modalStatus="confirmSave" @closePopup="confirmSave = false" :typeModal="'confirm'"
            title="입력한 내용을 저장하시겠습니까?" content="" okText="네" cancelText="아니요" @checkConfirm="confimSaveWhenChangeRow" />
</div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, reactive } from "vue";
import HistoryPopup from "@/components/HistoryPopup.vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useStore } from 'vuex';
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxSearchPanel, DxExport, DxScrolling } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SaveOutlined } from "@ant-design/icons-vue";
import notification from "@/utils/notification";
import { initialState } from "./utils/index"
import mutations from "@/graphql/mutations/AC/AC6/AC610/index";
import queries from "@/graphql/queries/AC/AC6/AC610/index";
import DxButton from "devextreme-vue/button";
import { companyId } from "@/helpers/commonFunction";
import { Message } from '@/configs/enum';
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, EditOutlined, HistoryOutlined, DxToolbar, DxItem, DxExport, DxSearchPanel, DxButton, HistoryPopup, SaveOutlined, DxScrolling,
    },
    setup() {
        // config grid
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const per_page = computed(() => store.state.settings.per_page);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);

        let statusFormUpdate = ref(false)
        const modalHistoryStatus = ref<boolean>(false);
        const focusedRowKey: any = ref(null)
        const modalStatus = ref(false)
        const modalStatusAdd = ref(false);
        let dataRowOld = reactive({ ...initialState })
        let trigger = ref(true);
        let triggerDetail = ref(false);
        const listClient: any = ref([])
        let formState: any = ref({ ...initialState });
        let dataRow = reactive({ ...initialState });

        const actionSearch: any = ref<boolean>(true);
        const resetFormNum = ref(1);
        const statusRemoveRow = ref(true);
        const dataSearch = ref({
            page: 1,
            rows: per_page,
            name: null,
            presidentName: null,
            phone: null,
            includeNonUse: false,
        });
        const originDataDetail: any = ref({
            companyId: companyId,
            clientId: null,
        });
        let confirmSave = ref(false)

        // ================GRAPQL==============================================
        const { mutate: createClient, onDone: onDoneAdd, onError: onErrorAdd } = useMutation(
            mutations.createClient
        );
        const { mutate: updateClient, onDone: onDoneUpdate, onError: onErrorUpdate } = useMutation(
            mutations.updateClient
        );
        const { refetch: refetchData, loading, result } = useQuery(queries.searchClients, {
            companyId: companyId,
            filter: dataSearch.value
        }, () => ({
            fetchPolicy: "no-cache",
            enabled: trigger.value,
        }));
        const { refetch: refetchDataDetail, loading: loadingDetail, onResult: resultDetail } = useQuery(queries.getClient, originDataDetail, () => ({
            fetchPolicy: "no-cache",
            enabled: triggerDetail.value,
        }));
        resultDetail(res => {
            var data = res.data.getClient;
            if (data) {
                formState.value.name = data.name
                formState.value.bizNumber = data.bizNumber ? data.bizNumber : null
                formState.value.residentId = data.residentId ? data.residentId : null
                formState.value.presidentName = data.presidentName
                formState.value.phone = data.phone
                formState.value.use = data.use
                formState.value.clientId = data.clientId
                dataRowOld = { ...formState.value }
            }
            triggerDetail.value = false;
        })
        onDoneAdd(() => {
            trigger.value = true;
            dataRowOld = { ...formState.value }
            statusFormUpdate.value = true;
            statusRemoveRow.value = true;
            notification('success', `업데이트 완료되었습니다!`)
        });
        onErrorAdd((e) => {
            notification('error', e.message)
        });
        onDoneUpdate(() => {
            trigger.value = true;
            if (formState.value.clientId == focusedRowKey.value) {
                originDataDetail.value.clientId = formState.value.clientId
                dataRowOld = { ...formState.value }
            } else {
                originDataDetail.value.clientId = dataRow.clientId
            }
            triggerDetail.value = true;
            notification('success', `업데이트 완료되었습니다!`)
        });
        onErrorUpdate((e) => {
            triggerDetail.value = true;
            notification('error', e.message)
        });

        // ================FUNCTION============================================
        const actionSave = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                let input = {
                    name: formState.value.name,
                    bizNumber: formState.value.bizNumber,
                    residentId: formState.value.residentId?.replace('-', ''),
                    presidentName: formState.value.presidentName,
                    phone: formState.value.phone,
                    use: formState.value.use,
                }
                if (statusFormUpdate.value) {
                    let dataUpdate = {
                        companyId: companyId,
                        clientId: formState.value.clientId,
                        input: { ...input }
                    };
                    updateClient(dataUpdate);
                } else {
                    let dataCreate = {
                        companyId: companyId,
                        input: { ...input }
                    };
                    createClient(dataCreate);
                }
            }
        };

        const modalHistory = (data: any) => {
            originDataDetail.value.clientId = data.clientId
            modalHistoryStatus.value = true
        }


        // When changing the value in the input form then moving to another row, check the valid form and display the popup
        const actionToAddFromEdit = (e: any) => {
            var res = e.validationGroup.validate();
            //remove active row edit
            const element = document.querySelector('.dx-row-focused');
            if (element)
                (element as HTMLInputElement).classList.remove("dx-row-focused");
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else
                confirmSave.value = true
        }
        const onSelectionClick = (data: any) => {
            dataRow = data.data
            if (dataRow.clientId) { // if click row already in database
                originDataDetail.value.clientId = data.data.clientId
                if (statusFormUpdate.value == false && JSON.stringify(initialState) !== JSON.stringify(formState.value)) { // if data has been changed and form add
                    modalStatus.value = true;
                } else {
                    if (JSON.stringify(dataRowOld) !== JSON.stringify(formState.value) && statusFormUpdate.value == true) { // if data has been changed and form update
                        modalStatus.value = true;
                    } else {
                        if (!statusRemoveRow.value && listClient.value.datas[listClient.value.datas.length - 1]?.clientId == null) { // if creating
                            listClient.value.datas = listClient.value.datas.splice(0, listClient.value.datas.length - 1)
                            statusRemoveRow.value = true
                        }
                        triggerDetail.value = true;
                    }
                    statusFormUpdate.value = true;
                }
            }
        }
        const formCreate = (e: any) => {
            if (statusRemoveRow.value) {
                if (JSON.stringify({ ...initialState }) !== JSON.stringify(formState.value) && statusFormUpdate.value == false) { // if status form add and form not null
                    modalStatusAdd.value = true
                } else {
                    statusRemoveRow.value = false;
                    listClient.value.datas = JSON.parse(JSON.stringify(listClient.value.datas)).concat({ ...initialState })
                    formState.value = listClient.value.datas[listClient.value.datas.length - 1]
                    setTimeout(() => {
                        let a = document.body.querySelectorAll('[aria-rowindex]');
                        (a[a.length - 1] as HTMLInputElement).classList.add("dx-row-focused");
                    }, 100);
                    formState.value.clientId = 'RANDOM';
                    resetFormNum.value++;
                    focusedRowKey.value = formState.value.clientId;
                    statusFormUpdate.value = false;
                }
            } else {
                notification('error', "nhập vàooooo")
            }
        }

        const statusComfirm = (val: any) => {
            if (val) {
                (document.getElementsByClassName("anticon-save")[0] as HTMLInputElement).click();
            } else {
                if (!statusRemoveRow.value) {
                    listClient.value.datas = listClient.value.datas.splice(0, listClient.value.datas.length - 1)
                    statusRemoveRow.value = true
                }
                statusFormUpdate.value = true
                triggerDetail.value = true;
            }
        }
        const statusComfirmAdd = (val: any) => {
            if (val) {
                resetFormNum.value++;
                Object.assign(formState.value, initialState);
            }
        }

        const confimSaveWhenChangeRow = (status: any) => {
            if (status == true) {
                let dataCreate = {
                    companyId: companyId,
                    input: {
                        name: formState.value.name,
                        bizNumber: formState.value.bizNumber,
                        residentId: formState.value.residentId?.replace('-', ''),
                        presidentName: formState.value.presidentName,
                        phone: formState.value.phone,
                        use: formState.value.use,
                    },
                };
                createClient(dataCreate);
            }
            triggerDetail.value = true;
        }
        const searching = (e: any) => {
            trigger.value = true;
            dataSearch.value.page = listClient.value.page
            actionSearch.value = false
        }
        const changePage = (e: any) => {
            dataSearch.value.page = listClient.value.page
            actionSearch.value = true
            trigger.value = true;
        }

        // ================WATCHING============================================
        watch(result, (value) => {
            trigger.value = false;
            if (value.searchClients) {
                listClient.value = value.searchClients
                // focusedRowKey.value = value.searchClients.datas.find((val: any) => val.residentId == formState.value.residentId)?.clientId
                // formState.value.clientId = value.searchClients.datas.find((val: any) => val.residentId == formState.value.residentId)?.clientId
            }
        });
        const disableInputBizNumber = ref(false)
        const disableInputResidentId = ref(false)
        watch(() => [
            formState.value.bizNumber,
            formState.value.residentId
        ], ([newA, newB]) => {
            if (newA?.length) {
                formState.value.residentId = null;
                disableInputResidentId.value = true;
            } else {
                disableInputResidentId.value = false;;
            }
            if (newB?.length) {
                formState.value.bizNumber = null;
                disableInputBizNumber.value = true;
            } else {
                disableInputBizNumber.value = false;
            }
        });

        return {
            confirmSave, move_column, colomn_resize, loading, loadingDetail, modalHistoryStatus, labelCol: { style: { width: "150px" } }, formState,
            statusFormUpdate,
            originDataDetail,
            listClient, modalStatus, focusedRowKey, resetFormNum, modalStatusAdd,
            confimSaveWhenChangeRow, actionToAddFromEdit, formCreate, onSelectionClick, actionSave, modalHistory, statusComfirm, statusComfirmAdd,
            dataSearch, searching, changePage, actionSearch,
            disableInputBizNumber, disableInputResidentId, Message,
        };
    },
});
</script> 
<style lang="scss" scoped src="./style/style.scss" ></style>
