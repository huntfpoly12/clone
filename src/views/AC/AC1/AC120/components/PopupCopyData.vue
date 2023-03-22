<template>
    <a-modal :visible="modalStatus" width="60%" footer="" @cancel="setModalVisible()" :mask-closable="false">
        <div style="text-align: center; margin-top: 32px">
            <h2>
                여입 대상 지출결의서 검색
            </h2>
            <span>
                이전 원본 지출결의서를 복사하면 정확하고 빠르게 여입결의서 작성이 가능합니다.
            </span>
        </div>
        <a-row class="mt-10">
            <a-col :span="24">
                <div class="top-content">
                    <a-typography-title :level="5" style="margin-bottom: 0;">원본 지출결의서 검색</a-typography-title>
                </div>
            </a-col>
        </a-row>
        <a-row class="mt-10">
            <a-col :span="18">
                <a-form-item class="red" label="대상월">
                    <radio-group :arrayValue="arrayRadioCheck" :layoutCustom="'horizontal'" :required="true" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="결의번호">
                    <default-text-box width="150px" />
                </a-form-item>
            </a-col>
        </a-row>
        <div style="margin-top: 10px; display: flex; justify-content: center;">
            <button-basic class="button-form-modal" :text="'검색'" :type="'default'" :mode="'contained'"
                @onClick="onSearch" />
        </div>
        <a-spin tip="Loading..." :spinning="false">
            <div style="margin: 48px 0">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                    key-expr="bcode" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                    :column-auto-width="true">
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxColumn data-field="taxOfficeName" caption="선택" />
                    <DxColumn data-field="taxOfficeName" caption="결의번호" />
                    <DxColumn data-field="taxOfficeName" caption="통장" />
                    <DxColumn data-field="taxOfficeName" caption="일자" />
                    <DxColumn data-field="taxOfficeName" caption="결의 구분" />
                    <DxColumn data-field="taxOfficeName" caption="수입액" />
                    <DxColumn data-field="taxOfficeName" caption="지출액" />
                    <DxColumn data-field="taxOfficeName" caption="통장적요" />
                    <DxColumn data-field="taxOfficeName" caption="적요" />
                    <DxColumn data-field="taxOfficeName" caption="계정과목" />
                    <DxColumn data-field="localIncomeTaxArea" caption="상대계정" />
                    <DxColumn data-field="localIncomeTaxArea" caption="자금원천" />
                    <DxColumn data-field="localIncomeTaxArea" caption="거래처" />
                    
                </DxDataGrid>
            </div>
        </a-spin>
        <div class="btn_submit">
            <button-basic class="button-form-modal" :text="'여입결의서 반영'" :type="'default'"
                :mode="'contained'" @onClick="onSubmit" />
        </div>
    </a-modal>
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue";
import { useStore } from 'vuex';
import { DxSelectBox } from "devextreme-vue/select-box";
import queries from "@/graphql/queries/common/index";
import { useQuery } from "@vue/apollo-composable";
import {
    DxDataGrid,
    DxColumn, DxScrolling,
} from "devextreme-vue/data-grid";

export default defineComponent({
    props: ["modalStatus", "data", "title"],

    components: {
        DxDataGrid,
        DxColumn, DxScrolling,
        DxSelectBox,
    },
    setup(props, { emit }) {
        const arrayRadioCheck = [
            { id: 1, text: '01' },
            { id: 2, text: '02' },
            { id: 3, text: '03' },
            { id: 4, text: '04' },
            { id: 5, text: '05' },
            { id: 6, text: '06' },
            { id: 7, text: '07' },
            { id: 8, text: '08' },
            { id: 9, text: '09' },
            { id: 10, text: '10' },
            { id: 11, text: '11' },
            { id: 12, text: '12' },

        ]
        // config grid
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);

        // let showEmployeeInfo = ref(false);
        const dataSource = ref([]);
        const search = ref<string>("");
        let dataEmit = ref()
        const onSearch = () => {
            
        };

        

        const setModalVisible = () => {
            emit("closePopup", false);
        };


        const onSubmit = () => {
            emit("dataEmit", dataEmit.value);
            setModalVisible()
        }


        return {
            move_column,
            colomn_resize,
            search,
            onSearch,
            setModalVisible,
            // showEmployeeInfo,
            dataSource,
            onSubmit,

            arrayRadioCheck,
        };
    },
});
</script>
<style scoped>
#components-modal-demo-position {
    position: relative;
}

.btn_submit {
    position: absolute;
    bottom: 0;
    margin-top: 48px;
    margin-bottom: 16px;
    left: 0;
    right: 0;
    text-align: center;
}
</style>
