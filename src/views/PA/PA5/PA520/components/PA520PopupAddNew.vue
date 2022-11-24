<template>
    <div>
        <a-modal :visible="modalStatus" title="사원등록" centered @cancel="setModalVisible()"
            :mask-closable="false" :width="1028" :footer="null" :bodyStyle="{padding: '0px', height: '800px' }">
                <a-spin :spinning="false" size="large">
                    <div  id="pa-520" class="page-content">
                        <a-tabs v-model:activeKey="activeKey" type="card">
                            <a-tab-pane key="1" tab="기본">
                                <div class="tab1">
                                    <a-row>
                                        <a-col :span="12">
                                            <a-form-item label="사번(코드)" label-align="right">
                                                <text-number-box width="200px" :required="true" placeholder="숫자만 입력 가능"/>
                                            </a-form-item>
                                        </a-col>
                                        <a-col>
                                            <a-form-item label="영업자코드" label-align="right">
                                                <div class="input-text">
                                                    <switch-basic :valueSwitch="true" textCheck="O" textUnCheck="X" style="width:80px"></switch-basic>
                                                    <span>
                                                        <InfoCircleFilled /> 대표자인 경우 고용보험 제외됩니다.
                                                    </span>
                                                </div>
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                             
                                    <a-form-item label="성명" label-align="right">
                                        <text-number-box width="200px" :required="true" placeholder="한글,영문(대문자) 입력 가능"/>
                                    </a-form-item>
                                    <a-form-item label="입사년월일" label-align="right">
                                        <date-time-box width="150px"></date-time-box>
                                    </a-form-item>
                                    <a-form-item label="퇴사년월일" label-align="right">
                                        <div class="input-text">
                                            <date-time-box width="150px"></date-time-box>
                                            <span>
                                                <InfoCircleFilled /> 마지막 근무한 날
                                            </span>
                                        </div>
                                    
                                    </a-form-item>
                                    <a-row>
                                        <a-col :span="7">
                                            <a-form-item label="내/외국인" label-align="right">
                                                <radio-group :arrayValue="radioCheckForeigner" :valueRadioCheck="1" layoutCustom="horizontal"></radio-group>                                
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="9">
                                            <a-form-item label="외국인 국적" label-align="right">
                                                <country-code-select-box :disabled="isForeigner"/>                              
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="8">
                                            <a-form-item label="외국인 체류자격" label-align="right">
                                                <stay-qualification-select-box/>                               
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <a-form-item label="주민(외국인)번호" label-align="right">
                                            <id-number-text-box width="150px"></id-number-text-box>                               
                                    </a-form-item>
                                    <a-form-item label="세대주여부" label-align="right">
                                            <radio-group :arrayValue="radioCheckHouseholder" :valueRadioCheck="1" layoutCustom="horizontal"></radio-group>                                
                                    </a-form-item>
                                    <a-form-item label="주소" class="clr" label-align="left">
                                        <a-row :gutter="[0, 4]">
                                            <a-col :span="24">
                                                <a-row>
                                                    <a-col :span="6">
                                                        <default-text-box
                                                            
                                                            width="100%" :disabled="true" />
                                                    </a-col>
                                                    <a-col :span="18">
                                                        <div style="margin-left: 5px">
                                                            <post-code-button @dataAddress="funcAddress" />
                                                        </div>
                                                    </a-col>
                                                </a-row>
                                            </a-col>
                                            <a-col :span="24">
                                                <a-row>
                                                    <a-col :span="12">
                                                        <default-text-box
                                                            width="100%" :disabled="true" placeholder="주소1" />
                                                    </a-col>
                                                    <a-col :span="12" style="padding-left: 9px">
                                                        <default-text-box
                                                            width="100%" placeholder="주소2"/>
                                                    </a-col>
                                                </a-row>
                                            </a-col>
                                        </a-row>
                                    </a-form-item>
                                    <a-form-item label="이메일" label-align="right">
                                        <div class="input-text">
                                            <mail-text-box width="200px" placeholder="abc@example.com"></mail-text-box>    
                                            <span>
                                                <InfoCircleFilled /> 원천징수영수증 등 주요 서류를 메일로 전달 가능합니다.
                                            </span>
                                        </div>                                                               
                                    </a-form-item>
                                    <a-form-item label="부서" label-align="right">
                                        <DxSelectBox 
                                                :data-source="selectBoxData"
                                                :accept-custom-value="true"
                                                display-expr="firstName"
                                                value-expr="id"
                                                @custom-item-creating="customItemCreating"
                                                width="150px"
                                            />                                                        
                                    </a-form-item>
                                </div>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="급여">
                                <Tab2Component></Tab2Component>
                            </a-tab-pane>
                            <a-tab-pane key="3" tab="부양가족">
                            </a-tab-pane>
                        </a-tabs>
                
                    </div>
                </a-spin>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { InfoCircleFilled } from "@ant-design/icons-vue";
import { DxSelectBox } from 'devextreme-vue/select-box';
import comfirmClosePopup from '../../../../../utils/comfirmClosePopup';
import Tab2Component from "./Tab2Component.vue";
import { radioCheckForeigner , radioCheckHouseholder} from "../utils/index";
import DataSource from "devextreme/data/data_source";

export default defineComponent({
    components: {
        InfoCircleFilled,
        DxSelectBox,
        Tab2Component
    },
    props:{
        modalStatus: Boolean,
    },
    setup(props,{emit}) {
        let isForeigner = ref(false);
        const setModalVisible = () => {
            comfirmClosePopup(() => emit('closePopup', false))
        }

        const funcAddress = (data: any) => {}

        const selectBoxData = new DataSource({
            store: [
                { id: 1, firstName: "Andrew" },
                { id: 2, firstName: "Nancy" },
                { id: 3, firstName: "Steven" }
            ],
            key: "id"
        });
        const customItemCreating = (e:any)=>{
            // Generates a new 'id'
            // let nextId;
            // selectBoxData.store().totalCount().done(count => {nextId = count + 1});
            // // Creates a new entry
            // e.customItem = { id: nextId, firstName: e.text };
            // // Adds the entry to the data source
            // selectBoxData.store().insert(e.customItem);
            // // Reloads the data source
            // selectBoxData.reload();
        }
        return {
            isForeigner,
            funcAddress,
            setModalVisible,
            radioCheckForeigner,
            radioCheckHouseholder,
            activeKey: ref("1"),
            customItemCreating,
            selectBoxData
        };
    },
});
</script>
<style lang="scss" scoped src="../style/popupAddNew.scss" />
