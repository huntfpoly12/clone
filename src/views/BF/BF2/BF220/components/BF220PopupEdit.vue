<template>
    <div id="components-modal-demo-position">
        <a-modal :mask-closable="false" :visible="modalStatus" title="권한그룹관리" centered width="1000px"
            @cancel="setModalVisible()">
            <template #footer>
                <a-button @click="setModalVisible">그냥 나가기</a-button>
                <a-button key="submit" type="primary" @click="updateScreenRole">
                    저장하고 나가기</a-button>
            </template>
            <a-form v-bind="layout" name="nest-messages" >
                <a-row :gutter="24">
                    <a-col :span="24" class="title-modal">
                        <span>권한그룹 기본정보</span>
                    </a-col>
                    <a-col :span="16">
                        <a-form-item label="그룹코드" name="id" class="clr">
                            <div class="dflex">
                              <default-text-box
                                v-model:valueInput="dataRes.id"
                                class="mr5"
                                placeholder="영문,숫자 5~10자 (중복불가)"
                                disabled
                                :max-character="10"
                                :min-character="5"
                                required
                                style="width: 350px"
                              ></default-text-box>
                                <a-button type="button" disabled>중복체크</a-button>
                            </div>
                        </a-form-item>
                    </a-col>
                    <a-col :span="16">
                        <a-form-item label="그룹명" class="clr">
                          <default-text-box
                              v-model:valueInput="dataRes.name"
                              placeholder="최대 20자"
                              required
                              mess-required="이항목은 필수 입력사항입니다!"
                          ></default-text-box>
                        </a-form-item>
                    </a-col>
                    <a-col :span="16">
                        <a-form-item label="대상회원">
                            <a-radio-group v-model:value="dataRes.type" disabled>
                                <a-radio value="m">
                                    <a-tag color="black">매니저</a-tag>
                                </a-radio>
                                <a-radio value="r">
                                    <a-tag color="gray" style="border: 1px solid black;">영업자</a-tag>
                                </a-radio>
                                <a-radio value="p">
                                    <a-tag class="ant-tag-yellow"  >파트너</a-tag>
                                </a-radio>
                            </a-radio-group>
                        </a-form-item>
                    </a-col>
                    <a-col :span="16">
                        <a-form-item label="메모" style="align-items: flex-start;">
                            <a-textarea placeholder="최대 30자" v-model:value="dataRes.memo" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24" class="title-modal" style="margin-top: 10px;">
                        <span>권한그룹메뉴별 권한</span>
                    </a-col>
                    <a-col :span="24">
                        <a-spin :spinning="spinning" size="large">
                            <DxDataGrid :data-source="dataSource" :selected-row-keys="keyChecked" :show-borders="true"
                                key-expr="enumKey" class="table-sevice">
                                <DxColumn data-field="enumKey" caption="메뉴" :fixed="true" />
                                <DxColumn caption="읽기" cell-template="col1" :width="100" alignment="center" />
                                <template #col1="{ data }" class="custom-action">
                                    <div class="custom-action" @click="changeValRoles(data.data.enumKey, 'read')">
                                        <DxCheckBox :value="setReadWrite(data.data.enumKey, 'read')" />
                                    </div>
                                </template>
                                <DxColumn caption="쓰기" cell-template="col2" alignment="center" :width="100" />
                                <template #col2="{ data }" class="custom-action">
                                    <div class="custom-action" @click="changeValRoles(data.data.enumKey, 'write')">
                                        <DxCheckBox :value="setReadWrite(data.data.enumKey, 'write')" />
                                    </div>
                                </template>
                            </DxDataGrid>
                        </a-spin>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>
</template>
<script lang="ts">
import {ref, defineComponent, watch, reactive} from 'vue'
import { SearchOutlined, WarningOutlined } from '@ant-design/icons-vue';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection
} from 'devextreme-vue/data-grid';
import { message } from 'ant-design-vue';
import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "../../../../../graphql/queries/BF/BF2/BF220/index";
import mutations from "../../../../../graphql/mutations/BF/BF2/BF220/index";
import { AdminScreenRole } from '@bankda/jangbuda-common';
import { DxCheckBox } from 'devextreme-vue/check-box';
import DefaultTextBox from "../../../../../components/common/DefaultTextBox.vue";
export default defineComponent({
    props: ['modalStatus', 'idRowIndex'],
    components: {
      DefaultTextBox,
        SearchOutlined,
        WarningOutlined,
        DxDataGrid,
        DxPaging,
        DxColumn,
        DxSelection,
        DxCheckBox
    },
    setup(props, { emit }) {
        const dataSource = ref(AdminScreenRole.all())
        const spinning = ref<boolean>(false);
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };

        const visible = ref<boolean>(false);
        const triggersGetData = ref(false)
        const labelCol = { style: { width: "300px" } };
        const wrapperCol = { span: 14 };
        let confirm = ref<string>('');
        const checkIDName = ref()
        const dataCallApiDetail = ref()
        const dataRes: any = ref({
            id: '',
            name: "",
            type: "m",
            screenRoles: "",
            memo: ""
        });
        let readAdminScreenRoles: any = ref([])
        let writeAdminScreenRoles: any = ref([])
        const changeID = (e: any) => {
            checkIDName.value = {
                id: dataRes.value.id
            }
            dataRes.value.id = e.target.value.replace(/[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/g, '')
        }
        const confirmPopup = (value: any) => {
            if (value == '해지') {
                visible.value = true;
            }
        }
        const keyChecked = ref([])
        watch(() => props.modalStatus, (value) => {
            if(value == true) {
              dataCallApiDetail.value = {
                id: props.idRowIndex
              }
              spinning.value = true
              triggersGetData.value = true
              if (dataCallApiDetail) {
                refetchDataEdit()
              }
            }
        })
        //Creat new group roll
        const {
            mutate: editScreenRole,
            onDone: editDone,
            onError: editError
        } = useMutation(mutations.updateScreenRoleGroup);
        editDone(e => {
            message.success('그룹이 생성되었습니다.')
            emit("closePopupEdit", false)
        })
        editError(e => {
            message.error(e.message)
        })
        const updateScreenRole = () => {
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
            editScreenRole(dataCall)
        }
        const { refetch: refetchDataEdit, result: resDataDetail} = useQuery(queries.getScreenRoleGroup, dataCallApiDetail, () => ({
            enabled: triggersGetData.value,
            fetchPolicy: "no-cache",
        }))

        watch(resDataDetail, (value) => {
            if(value) {
              dataRes.value = value.getScreenRoleGroup
              readAdminScreenRoles.value = value.getScreenRoleGroup.readAdminScreenRoles
              writeAdminScreenRoles.value = value.getScreenRoleGroup.writeAdminScreenRoles
              spinning.value = false
            }
        }, {deep: true});
        const setReadWrite = (data: any, type: string) => {
            let count = 0
            if (type == 'read') {
                readAdminScreenRoles.value.map((e: any) => {
                    if (e == data) {
                        count++
                    }
                })
            }
            if (type == 'write') {
                writeAdminScreenRoles.value.map((e: any) => {
                    if (e == data) {
                        count++
                    }
                })
            }
            if (count > 0)
                return true
            else
                return false
        }
        const changeValRoles = (data: any, type: string) => {
            let count = 0
            if (type == 'read') {
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
            if (type == 'write') {
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

        const setModalVisible = () => {
          emit("closePopupEdit", false)
        }
        const getColorTag = (data: string) => {
          if (data === "정상") {
            return "#108ee9";
          } else if (data === "해지") {
            return "#cd201f";
          } else if (data === "전체") {
            return "grey";
          }
        }
        return {
            changeValRoles,
            updateScreenRole,
            spinning,
            dataSource,
            changeID,
            labelCol,
            wrapperCol,
            dataRes,
            layout,
            visible,
            confirmPopup,
            setModalVisible,
            confirm,
            setReadWrite,
            keyChecked,
            readAdminScreenRoles,
            writeAdminScreenRoles
        }
    },
})
</script>
<style lang="scss" scoped src="../style/popupEdit/index.scss">

</style>