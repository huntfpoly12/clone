<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" :title="title" centered
            @cancel="setModalVisible()" :mask-closable="false" width="50%">
            <DxDataGrid :data-source="dataTableShow" :show-borders="true" key-expr="key">
                    <DxColumn data-field="기록일시" />
                    <DxColumn data-field="성공여부" cell-template="tag-login" css-class="cell-center"/>
                    <template #tag-login="{ data }">
                        <a-tag :color="getColorTag(data.value)" style="width:65px">{{ data.value }}</a-tag>
                    </template>
                    <DxColumn data-field="응답상태" />
                    <DxColumn data-field="오류메세지" />
                    <DxColumn data-field="오류시스템메세지" />
                    <DxColumn data-field="IP주소" />
                </DxDataGrid>
                <template #footer>
                </template>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
} from "devextreme-vue/data-grid";
export default defineComponent({
    props:['modalStatus','data','title']
       ,
    components: {
        DxDataGrid,
        DxColumn,
        DxPaging
    },

    setup(props) {
        const dataTableShow = ref([
            {
                key: 0,
                기록일시: "2022-09-05 13:52:09",
                성공여부: "성공",
                응답상태: "200",
                오류메세지: "",
                오류시스템메세지: "",
                IP주소: "123.451.342.1",
            },
            {
                key: 2,
                기록일시: "2022-09-04 13:52:09",
                성공여부: "실패",
                응답상태: "401",
                오류메세지: "아이디 또는 비밀번호가 일치하지 않습…",
                오류시스템메세지: "비밀번호 불일치",
                IP주소: "123.451.342.1",
            },
        ]); 
        console.log(props);
        
        return {
            dataTableShow
        }
    },
    methods: {
        setModalVisible() {
            this.$emit('closePopup', false)
        },
        getColorTag(data: string) {
            if (data === "성공") {
                return "rgb(16 142 236 / 62%)";
            } else if (data === "실패") {
                return "rgb(205 32 31 / 51%)";
            }
        },
    }
})
</script>
<style lang="css" scoped>    
.cell-center{
    text-align: center!important  
}
::v-deep .ant-tag{
    width:65px;
}
</style>