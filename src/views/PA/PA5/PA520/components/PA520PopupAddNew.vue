<template>
    <a-modal :visible="modalStatus" title="사원등록" centered @cancel="setModalVisible()" :mask-closable="false"
        :width="1028" :footer="null" :bodyStyle="{ padding: '0px' }">
        <a-spin :spinning="false" size="large">
            <div id="pa-520" class="page-content">
                <a-tabs v-model:activeKey="activeKey" type="card">
                    <a-tab-pane key="1" tab="기본" class="tab1">
                        <a-form-item label="사번(코드)" class="label-red" label-align="right">
                            <text-number-box width="200px" v-model:default-text-box="dataCreated.employeeId"
                                :required="true" placeholder="숫자만 입력 가능" />
                        </a-form-item>
                        <a-form-item label="성명" label-align="right" class="label-red">
                            <text-number-box width="200px" v-model:default-text-box="dataCreated.name" :required="true"
                                placeholder="한글,영문(대문자) 입력 가능" />
                        </a-form-item>

                        <a-form-item label="퇴직급여대상 여부" label-align="right">
                            <a-radio-group v-model:value="dataCreated.retirementIncome">
                                <a-radio :value="true">
                                    <div class="custom-checkbox-group" style=" background-color: #77933C;">O</div>
                                </a-radio>
                                <a-radio :value="false">
                                    <div class="custom-checkbox-group" style=" background-color: red;">X</div>
                                </a-radio>
                            </a-radio-group>
                        </a-form-item>

                        <a-form-item label="입사년월일" label-align="right">
                            <date-time-box width="150px" v-model:valueDate="dataCreated.joinedAt" />
                        </a-form-item>
                        <a-form-item label="퇴사년월일" label-align="right">
                            <div class="input-text">
                                <date-time-box width="150px" v-model:valueDate="dataCreated.leavedAt" />
                                <img src="../../../../../assets/images/iconInfo.png" style="width: 16px;" />
                                <span>
                                    마지막 근무한 날
                                </span>
                            </div>
                        </a-form-item>
                        <a-row>
                            <a-col :span="8">
                                <a-form-item label="내/외국인" label-align="right" class="label-custom-width">
                                    <radio-group :arrayValue="radioCheckForeigner"
                                        v-model:valueRadioCheck="dataCreated.foreigner" layoutCustom="horizontal" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="외국인 국적" label-align="right" class="label-custom-width label-red">
                                    <country-code-select-box v-model:valueCountry="dataCreated.nationalityCode"
                                        @textCountry="(res: any) => { dataCreated.nationality = res }" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="외국인 체류자격" label-align="right" class="label-custom-width label-red">
                                    <stay-qualification-select-box
                                        v-model:valueStayQualifiction="dataCreated.stayQualification" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-form-item label="주민(외국인)번호" label-align="right" class="label-red">
                            <id-number-text-box width="200px" v-model:valueInput="dataCreated.residentId" />
                        </a-form-item>
                        <a-form-item label="주소" class="clr" label-align="left">
                            <a-row :gutter="[0, 4]">
                                <a-col :span="24">
                                    <a-row>
                                        <a-col :span="6">
                                            <default-text-box width="100%" :disabled="true"
                                                v-model:valueInput="dataCreated.zipcode" />
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
                                            <default-text-box width="100%" :disabled="true" placeholder="주소1"
                                                v-model:valueInput="dataCreated.roadAddress" />
                                        </a-col>
                                        <a-col :span="12" style="padding-left: 9px">
                                            <default-text-box width="100%" placeholder="주소2"
                                                v-model:valueInput="dataCreated.addressExtend" />
                                        </a-col>
                                    </a-row>
                                </a-col>
                            </a-row>
                        </a-form-item>
                        <a-form-item label="이메일" label-align="right">
                            <div class="input-text">
                                <mail-text-box width="200px" v-model:valueInput="dataCreated.email"
                                    placeholder="abc@example.com"></mail-text-box>
                                <img src="../../../../../assets/images/iconInfo.png" style="width: 16px;">
                                <span>
                                    원천징수영수증 등 주요 서류를 메일로 전달 가능합니다.
                                </span>
                            </div>
                        </a-form-item>
                        <a-form-item label="부서" label-align="right">
                            <!-- <DxSelectBox :data-source="selectBoxData" :accept-custom-value="true"
                                display-expr="firstName" value-expr="id" @custom-item-creating="customItemCreating"
                                width="200px" /> -->

                            <custom-item-select-box v-model:valueInput="dataCreated.department"
                                :arrSelect="selectBoxData" width="200px" />
                        </a-form-item>
                        <a-form-item label="부서" label-align="right">
                            <!-- <DxSelectBox :data-source="selectBoxData" :accept-custom-value="true"
                                display-expr="firstName" value-expr="id" @custom-item-creating="customItemCreating"
                                width="200px" /> -->

                            <custom-item-select-box v-model:valueInput="dataCreated.department"
                                :arrSelect="selectBoxData" width="200px" />
                        </a-form-item>

                        <div style="width: 100%;text-align: center;">
                            <button-basic text="저장" type="default" mode="contained" @onClick="funcAddress" />
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="급여">
                        <Tab1Component></Tab1Component>
                    </a-tab-pane>
                    <a-tab-pane key="3" tab="부양가족">
                        <Tab2Component></Tab2Component>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-spin>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { InfoCircleFilled } from "@ant-design/icons-vue";
import { DxSelectBox } from 'devextreme-vue/select-box';
import comfirmClosePopup from '../../../../../utils/comfirmClosePopup';
import Tab1Component from "./Tab1Component.vue";
import Tab2Component from "./Tab2Component.vue";
import { radioCheckForeigner, radioCheckHouseholder } from "../utils/index";
import DataSource from "devextreme/data/data_source";
import dayjs from 'dayjs';
export default defineComponent({
    components: {
        InfoCircleFilled,
        DxSelectBox,
        Tab2Component,
        Tab1Component,
    },
    props: {
        modalStatus: Boolean,
    },
    setup(props, { emit }) {
        const countryInfo = ref()
        const setModalVisible = () => {
            comfirmClosePopup(() => emit('closePopup', false))
        }
        const dataCreated = reactive({
            name: '',
            foreigner: false,
            nationality: '대한민국',
            nationalityCode: 'KR',
            stayQualification: 'C-4',
            residentId: '123456-1234562',
            zipcode: '',
            roadAddress: '',
            addressExtend: '',
            email: '',
            employeeId: null,
            joinedAt: dayjs().format('YYYY-MM-DD'),
            leavedAt: dayjs().format('YYYY-MM-DD'),
            retirementIncome: false,
            weeklyWorkingHours: null,
            department: '',
            responsibility: '',
        })

        const funcAddress = (data: any) => {
            dataCreated.zipcode = data.zonecode;
            dataCreated.roadAddress = data.roadAddress;
            // console.log(parseInt(dataCreated.joinedAt.replaceAll('-', '')));
            console.log(dataCreated);
        }

        const selectBoxData = new DataSource({
            store: [
                { id: 1, firstName: "Andrew" },
                { id: 2, firstName: "Nancy" },
                { id: 3, firstName: "Steven" }
            ],
            key: "id"
        });
        const customItemCreating = (e: any) => {

        }

        return {
            countryInfo,
            dataCreated,
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
 
<style lang="scss" scoped src="../style/popupAddNew.scss" >

</style>
