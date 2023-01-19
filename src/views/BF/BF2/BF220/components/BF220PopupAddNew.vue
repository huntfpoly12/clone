<template>
    <div id="components-modal-demo-position">
        <a-modal :mask-closable="false" footer="" :visible="modalStatus" title="권한그룹관리" centered width="1000px"
            @cancel="setModalVisible()">
            <standard-form action="your-action">
                <a-spin :spinning="spinningAdd" size="large">
                    <a-row :gutter="24">
                        <a-col :span="24" class="title-modal">
                            <span>권한그룹 기본정보</span>
                        </a-col>
                        <a-col :span="16">
                            <a-form-item label="그룹코드" class="clr">
                                <div class="dflex">
                                    <default-text-box class="mr5" v-model:valueInput="dataRes.id"
                                        placeholder="영문,숫자 5~10자 (중복불가)" :max-character="10" :min-character="5"
                                        :required="true" width="250"></default-text-box>
                                    <button-basic type="default" text="중복체크" @onClick="checkId" mode="contained"
                                        :disabled="isDisable" :height="33"></button-basic>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :span="16">
                            <a-form-item label="그룹명" class="clr">
                                <default-text-box v-model:valueInput="dataRes.name" placeholder="최대 20자" width="250"
                                    :max-character="20" :required="true" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="16">
                            <a-form-item label="대상회원">
                                <a-radio-group v-model:value="dataRes.type">
                                    <a-radio value="m">
                                        <a-tag color="black">매니저</a-tag>
                                    </a-radio>
                                    <a-radio value="r">
                                        <a-tag color="gray" style="border: 1px solid black;">영업자</a-tag>
                                    </a-radio>
                                    <a-radio value="p">
                                        <a-tag class="ant-tag-yellow">파트너</a-tag>
                                    </a-radio>
                                </a-radio-group>
                            </a-form-item>
                        </a-col>
                        <a-col :span="16">
                            <a-form-item label="메모" style="align-items: flex-start;">
                                <text-area-box placeholder="최대 30자" v-model:valueInput="dataRes.memo"></text-area-box>
                            </a-form-item>
                        </a-col>
                        <a-col :span="24" class="title-modal" style="margin-top: 10px;">
                            <span>권한그룹메뉴별 권한</span>
                        </a-col>
                        <a-col :span="24">
                            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true" key-expr="enumKey"
                                class="table-sevice" :allow-column-reordering="move_column"
                                :allow-column-resizing="colomn_resize">
                                <DxScrolling mode="standard" show-scrollbar="always"/>
                                <DxColumn data-field="enumKey" caption="메뉴" :fixed="true" />
                                <DxColumn caption="읽기" cell-template="col1" :width="100" alignment="center" />
                                <template #col1="{ data }" class="custom-action">
                                    <div class="custom-action" @click="changeValRoles(data.data.enumKey, 'read')">
                                        <DxCheckBox />
                                    </div>
                                </template>
                                <DxColumn caption="쓰기" cell-template="col2" alignment="center" :width="100" />
                                <template #col2="{ data }" class="custom-action">
                                    <div class="custom-action" @click="changeValRoles(data.data.enumKey, 'write')">
                                        <DxCheckBox />
                                    </div>
                                </template>
                            </DxDataGrid>
                        </a-col>
                    </a-row>
                    <a-row class="footer">
                        <button-basic text="그냥 나가기" type="default" mode="outlined" @onClick="setModalVisible"
                            style="margin-right: 10px;" />
                        <button-basic text="저장하고 나가기" type="default" mode="contained" @onClick="createScrenRole" />
                    </a-row>
                </a-spin>
            </standard-form>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from 'vue'
import { useStore } from 'vuex';
import { SearchOutlined, WarningOutlined } from '@ant-design/icons-vue';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxScrolling
} from 'devextreme-vue/data-grid';
import notification from '@/utils/notification';
import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "@/graphql/queries/BF/BF2/BF220/index";
import mutations from "@/graphql/mutations/BF/BF2/BF220/index";
import { AdminScreenRole } from '@bankda/jangbuda-common';
import { DxCheckBox } from 'devextreme-vue/check-box';
import comfirmClosePopup from '@/utils/comfirmClosePopup';
export default defineComponent({
    props: ['modalStatus'],
    components: {
        SearchOutlined,
        WarningOutlined,
        DxDataGrid,
        DxScrolling,
        DxPaging,
        DxColumn,
        DxCheckBox
    },
    setup(props, { emit }) {
        // config grid
        const store = useStore();

        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const dataSource = ref(AdminScreenRole.all())
        const spinningAdd = ref<boolean>(false);
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        const visible = ref<boolean>(false);
        const triggers = ref(false)
        let isDisable = ref<boolean>(true);
        const wrapperCol = { span: 14 };
        const checkIDName = ref()
        const dataRes = ref({
            id: '',
            name: "",
            type: "m",
            memo: ""
        });
        let objDataDefault = ref({
            ...dataRes.value
        })
        let readAdminScreenRoles: any = ref([])
        let writeAdminScreenRoles: any = ref([])
        const checkId = () => {
            spinningAdd.value = true
            if (dataRes.value.id != '') {
                triggers.value = true
                refetchData
            }
            setTimeout(() => {
                triggers.value = false
            }, 1000);
        }
        const { refetch: refetchData, result: resList } = useQuery(queries.isScreenRoleGroupRegistableId, checkIDName, () => ({
            enabled: triggers.value,
            fetchPolicy: "no-cache",
        }))
        watch(() => dataRes.value.id, (value) => {
            if (value.length < 5) {
                isDisable.value = true
            } else {
                isDisable.value = false
                checkIDName.value = {
                    id: dataRes.value.id
                }
            }
        }, { deep: true })
        watch(resList, (value) => {
            if (value.isScreenRoleGroupRegistableId == true) {
                notification('success', "사용 가능한 그룹코드입니다")
            } else {
                notification('error', `이미 존재하는 그룹코드 입니다. 다른 코드를 입력해주세요`)
            }
            spinningAdd.value = false
        });
        //Creat new group roll
        const {
            mutate: createScreenRole,
            onDone: creactDone,
            onError: creactError
        } = useMutation(mutations.createScreenRoleGroup);
        creactDone(e => {
            notification('success', "그룹이 생성되었습니다.")
            emit("closePopupAdd", false)
        })
        creactError(e => {
            notification('error', e.message)
        })
        const createScrenRole = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                let dataCall = {
                    input: {
                        id: dataRes.value.id,
                        name: dataRes.value.name,
                        type: dataRes.value.type,
                        readAdminScreenRoles: readAdminScreenRoles.value,
                        writeAdminScreenRoles: writeAdminScreenRoles.value,
                        memo: dataRes.value.memo
                    }
                }
                createScreenRole(dataCall)
            }
        }
        const setModalVisible = () => { 
            if (JSON.stringify(objDataDefault.value) === JSON.stringify(dataRes.value) == true)
                emit("closePopupAdd", false)
            else
                comfirmClosePopup(() => emit("closePopupAdd", false))
        }
        const changeValRoles = (data: any, type: string) => {
            let count = 0
            if (type == 'read') {
                if (readAdminScreenRoles.value.length == 0) {
                    readAdminScreenRoles.value.push(data)
                } else {
                    readAdminScreenRoles.value.map((e: any) => {
                        if (e == data) {
                            count++
                        }
                    })
                    if (count > 0) {
                        readAdminScreenRoles.value = readAdminScreenRoles.value.filter((obj: any) => { return obj !== data });
                    }
                    else {
                        readAdminScreenRoles.value.push(data)
                    }
                }
            }
            if (type == 'write') {
                if (writeAdminScreenRoles.value.length == 0) {
                    writeAdminScreenRoles.value.push(data)
                } else {
                    writeAdminScreenRoles.value.map((e: any) => {
                        if (e == data) {
                            count++
                        }
                    })
                    if (count > 0) {
                        writeAdminScreenRoles.value = writeAdminScreenRoles.value.filter((obj: any) => { return obj !== data });
                    }
                    else {
                        writeAdminScreenRoles.value.push(data)
                    }
                }
            }
        }
        return {
            changeValRoles,
            move_column,
            colomn_resize,
            createScrenRole,
            spinningAdd,
            dataSource,
            checkId,
            wrapperCol,
            dataRes,
            layout,
            visible,
            setModalVisible,
            readAdminScreenRoles,
            writeAdminScreenRoles,
            isDisable
        }
    }
})
</script>
<style lang="scss" scoped src="../style/popupAdd/index.scss">

</style>
