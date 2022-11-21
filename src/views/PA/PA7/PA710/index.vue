<template>
    <a-spin :spinning="loading" size="large">
        <action-header title="기타소득자등록" />
        <!-- <div id="pa-710" class="page-content">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true"
                :data-source="resultDataUsers.getMyCompanyUsers.datas" :show-borders="true" key-expr="id"
                :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true"
                style="width: 100%;">
                <DxPager :visible="false" />
                <DxColumn caption="성명 (상호)" data-field="username" :width="200" />
                <DxColumn caption="주민등록번호" data-field="username" :width="200" />
                <DxColumn caption="소득부분" data-field="username" :width="200" />
                
                <DxColumn :width="80" cell-template="pupop" />
                <template #pupop="{ data }" class="custom-action">
                    <div class="custom-action">
                        <a-space :size="10">
                            <a-tooltip placement="top">
                                <template #title>편집</template>
                                <EditOutlined @click="openEditModal(data)" />
                            </a-tooltip>
                            <a-tooltip placement="top">
                                <template #title>변경이력</template>
                                <HistoryOutlined @click="modalHistory(data)" />
                            </a-tooltip>
                            <a-tooltip placement="top">
                                <template #title>로그인이력</template>
                                <login-outlined @click="modalLogin(data)" />
                            </a-tooltip>
                        </a-space>
                    </div>
                </template>
            </DxDataGrid>
            <div class="pagination-table" v-if="rowTable > dataGetListUsers.filter.rows">
                <a-pagination v-model:current="dataGetListUsers.filter.page"
                    v-model:page-size="dataGetListUsers.filter.rows" :total="rowTable" show-less-items />
            </div>
        </div> -->
    </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import notification from "../../../../utils/notification";
import queries from "../../../../graphql/queries/BF/BF3/BF340/index";

export default defineComponent({
    components: {

    },
    setup() {
        const loading = ref(false)
        return {
            loading
        };
    },
});
</script> 
<!-- <style scoped lang="scss" src="./style/style.scss" /> -->
