<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" :title="title" centered width="50%" :footer="null" @cancel="setModalVisible()">
            <h2 style="font-weight: 600; color: gray">
                관할세무서, 지방소득세 납세지 검색
            </h2>
            <div style="text-align: center; margin-top: 32px">
                <search-outlined />
                주소 또는 소재지 ‘읍.면.동’ 이름을 입력하세요
            </div>
            <div style="text-align: center; margin-top: 10px">
                <a-input-search v-model:value="search" enter-button="검색" style="width: 400px" @search="onSearch" />
            </div>
            <div style="margin: 48px 0">
                <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="ID" :allow-column-reordering="true"
                    :allow-column-resizing="true" :column-auto-width="true" :selection="{ mode: 'single' }"
                    @selection-changed="onSelectionChanged">

                    <DxColumn data-field="" :width="40" cell-template="grid-cell" />
                    <template #grid-cell="{ data }">
                        <a-radio-group v-model:value="modalParam.checkBox">
                            <a-radio :value="data.data.ID" @click="changeOption(data.data.ID)"
                                :id="'data-'+data.data.ID "> </a-radio>
                        </a-radio-group>
                    </template>


                    <DxColumn data-field="관할세무서" />

                    <DxColumn data-field="지방소득세납세지" />

                    <DxColumn data-field="주소" />
                </DxDataGrid>
            </div>
            <div class="btn_submit">
                <a-button type="primary" :disabled="!showEmployeeInfo">확인</a-button>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { employees } from "../data.js";
import { DxSelectBox } from "devextreme-vue/select-box";

import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel,
} from "devextreme-vue/data-grid";
import {
    SearchOutlined,
    WarningOutlined,
    MailOutlined,
    MenuOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
    props: ["modalStatus", "data", "title"],

    components: {
        MenuOutlined,
        SearchOutlined,
        WarningOutlined,
        MailOutlined,
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxSelection,
        DxExport,
        DxSearchPanel,
        DxSelectBox,
    },
    created() { },
    data() {
        return {
            dataSource: employees,
            showEmployeeInfo: false,
            selectedRowNotes: "",
            selectedRowPicture: "",
            modalParam: {
                checkBox: ''
            },
            employees,
        };
    },
    computed: {},
    setup(props) {
        const data = props.data;
        const visible = ref<boolean>(false);
        const search = ref<string>("");
        const onSearch = (searchValue: string) => {
            console.log("use value", searchValue);
            console.log("or use this.value", search.value);
        };
        return { data, visible, search, onSearch };
    },
    methods: {
        setModalVisible() {
            this.$emit("closePopup", false);
        },
        onSelectionChanged({ selectedRowsData }: any) {
            const data = selectedRowsData[0];

            this.showEmployeeInfo = !!data;
            this.selectedRowNotes = data && data.관할세무서;
            this.selectedRowPicture = data && data.주소;
        },

        changeOption(data: any) {
            (document.getElementById("data-" + data) as HTMLInputElement).click();
        }
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

/* .btn_submit button {
  width: 100px;
  height: 32px;
  border: none;
  background-color: #1890ff;
  color: #fff;
  border-radius: 4px;
} */
</style>
