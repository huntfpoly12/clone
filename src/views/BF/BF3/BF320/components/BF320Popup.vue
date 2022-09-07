<template>
    <div id="components-modal-demo-position">
        <a-modal v-model:visible="mStatus" title="계약정보관리&심사 " centered okText="저장하고 나가기" cancelText="그냥 나가기"
            @ok="mStatus = false" width="50%">
            <a-collapse v-model:activeKey="activeKey" accordion>
                <a-collapse-panel key="1" header="심사정보">
                    <DxForm id="form" :form-data="employee">
                        <DxGroupItem caption="System Information">
                            <DxSimpleItem data-field="승인상태">
                                <DxDropDownBox v-model:value="gridBoxValue" :defer-rendering="false"
                                    :show-clear-button="true" :data-source="gridDataSource" display-expr="CompanyName"
                                    value-expr="ID" placeholder="Select a value...">
                                    <template #content>
                                        <DxDataGrid :data-source="gridDataSource" :columns="gridColumns"
                                            :hover-state-enabled="true" v-model:selected-row-keys="gridBoxValue">
                                            <DxSelection mode="multiple" />
                                            <DxPaging :enabled="true" :page-size="10" />
                                            <DxFilterRow :visible="true" />
                                            <DxScrolling mode="virtual" />
                                        </DxDataGrid>
                                    </template>
                                </DxDropDownBox>
                            </DxSimpleItem>
                            <DxSimpleItem data-field="사업자코드" />
                            <DxSimpleItem data-field="신청코드" />
                            <DxSimpleItem data-field="심사메모" />
                            <DxSimpleItem data-field="약관동의" />
                        </DxGroupItem>
                    </DxForm>
                </a-collapse-panel>
                <a-collapse-panel key="2" header="사업자정보">
                    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <a-form-item label="Activity name">
                            <a-input v-model:value="formState.name" />
                        </a-form-item>
                        <a-form-item label="Instant delivery">
                            <a-switch v-model:checked="formState.delivery" />
                        </a-form-item>
                        <a-form-item label="Activity type">
                            <a-checkbox-group v-model:value="formState.type">
                                <a-checkbox value="1" name="type">Online</a-checkbox>
                                <a-checkbox value="2" name="type">Promotion</a-checkbox>
                                <a-checkbox value="3" name="type">Offline</a-checkbox>
                            </a-checkbox-group>
                        </a-form-item>
                        <a-form-item label="Resources">
                            <a-radio-group v-model:value="formState.resource">
                                <a-radio value="1">Sponsor</a-radio>
                                <a-radio value="2">Venue</a-radio>
                            </a-radio-group>
                        </a-form-item>
                        <a-form-item label="Activity form">
                            <a-input v-model:value="formState.desc" type="textarea" />
                        </a-form-item>
                        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                            <a-button type="primary" @click="onSubmit">Create</a-button>
                            <a-button style="margin-left: 10px">Cancel</a-button>
                        </a-form-item>
                    </a-form>
                </a-collapse-panel>
                <a-collapse-panel key="3" header="대표자정보">
                    <p>{{ text }}</p>
                </a-collapse-panel>
                <a-collapse-panel key="4" header="회계서비스신청">
                    <p>{{ text }}</p>
                </a-collapse-panel>
                <a-collapse-panel key="5" header="원천서비스신청">
                    <p>{{ text }}</p>
                </a-collapse-panel>
                <a-collapse-panel key="6" header="CMS (자동이체출금) 계좌 정보 입력">
                    <p>{{ text }}</p>
                </a-collapse-panel>
                <a-collapse-panel key="7" header="기타">
                    <p>{{ text }}</p>
                </a-collapse-panel>
            </a-collapse>
        </a-modal>
    </div>
</template>

<script>
import DxDropDownBox from "devextreme-vue/drop-down-box";
import { DxForm, DxSimpleItem, DxGroupItem } from "devextreme-vue/form";
export default {
    props: [
        'modalStatus'
    ],
    data() {
        return {
            mStatus: this.modalStatus
        }
    },
    components: {
        DxForm,
        DxSimpleItem,
        DxGroupItem,
        DxDropDownBox,
    },
};
</script>
