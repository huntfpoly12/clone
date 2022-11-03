<template>
    <div id="components-modal-demo-position">
        <a-modal :mask-closable="false" :visible="modalStatus" title="권한그룹관리" centered width="1000px"
            @cancel="setModalVisible()">
            <template #footer>
                <a-button @click="setModalVisible">그냥 나가기</a-button>
                <a-button key="submit" type="primary" @click="createScrenRole">
                    저장하고 나가기</a-button>
            </template>
            <a-form v-bind="layout" name="nest-messages">
                <a-row :gutter="24">
                    <a-col :span="24" class="title-modal">
                        <span>권한그룹 기본정보</span>
                    </a-col>
                    <a-col :span="16">
                        <a-form-item label="그룹코드" class="clr">
                            <div class="dflex">
                              <default-text-box
                                    class="mr5"
                                    v-model:valueInput="dataRes.id"
                                    placeholder="영문,숫자 5~10자 (중복불가)"
                                    :max-character="10"
                                    :min-character="5"
                                    required
                                    mess-required="이항목은 필수 입력사항입니다!"
                                    style="width: 350px"
                                ></default-text-box>
                                <a-button type="primary" @click="checkId" :disabled="isDisable">중복체크</a-button>
                            </div>
                        </a-form-item>
                    </a-col>
                    <a-col :span="16">
                        <a-form-item label="그룹명" class="clr">
                            <default-text-box
                                v-model:valueInput="dataRes.name"
                                placeholder="최대 20자"
                                :max-character="20"
                                required
                                mess-required="이항목은 필수 입력사항입니다!" />
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
                            <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="enumKey"
                                class="table-sevice">
                                <DxColumn data-field="enumKey" caption="메뉴" :fixed="true" />
                                <DxColumn caption="읽기" cell-template="col1" :width="100" alignment="center" />
                                <template #col1="{ data }" class="custom-action">
                                    <div class="custom-action">
                                        <div class="custom-action" @click="changeValRoles(data.data.enumKey, 'read')">
                                            <DxCheckBox />
                                        </div>
                                    </div>
                                </template>
                                <DxColumn caption="쓰기" cell-template="col2" alignment="center" :width="100" />
                                <template #col2="{ data }" class="custom-action">
                                    <div class="custom-action">
                                        <div class="custom-action" @click="changeValRoles(data.data.enumKey, 'read')">
                                            <DxCheckBox />
                                        </div>
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
import {ref, defineComponent, watch, computed, reactive} from 'vue'
import { SearchOutlined, WarningOutlined } from '@ant-design/icons-vue';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
} from 'devextreme-vue/data-grid';
import { message } from 'ant-design-vue';
import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "../../../../../graphql/queries/BF/BF2/BF220/index";
import mutations from "../../../../../graphql/mutations/BF/BF2/BF220/index";
import { AdminScreenRole } from '@bankda/jangbuda-common';
import { DxCheckBox } from 'devextreme-vue/check-box';
export default defineComponent({
    props: ['modalStatus'],
    components: {
        SearchOutlined,
        WarningOutlined,
        DxDataGrid,
        DxPaging,
        DxColumn,
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
        const triggers = ref(false)
        let isDisable = ref<boolean>(true);
        const labelCol = { style: { width: "300px" } };
        const wrapperCol = { span: 14 };
        const checkIDName = ref()
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
        const checkId = () => {
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
          if(value.length < 5) {
            isDisable.value = true
          } else {
            isDisable.value = false
          }
        }, {deep:true})
        watch(resList, (value) => {
            if (value.isScreenRoleGroupRegistableId == true) {
                message.success(`사용 가능한 그룹코드입니다`)
            } else {
                message.error(`이미 존재하는 그룹코드 입니다. 다른 코드를 입력해주세요`)
            }
        });
        //Creat new group roll
        const {
            mutate: createScreenRole,
            onDone: creactDone,
            onError: creactError
        } = useMutation(mutations.createScreenRoleGroup);
        creactDone(e => {
            message.success('그룹이 생성되었습니다.')
            emit("closePopupAdd", false)
        })
        creactError(e => {
            message.error(e.message)
        })
        const createScrenRole = () => {
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
        const setModalVisible = () => {
            emit('closePopupAdd', false)
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
            createScrenRole,
            spinning,
            dataSource,
            changeID,
            checkId,
            labelCol,
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