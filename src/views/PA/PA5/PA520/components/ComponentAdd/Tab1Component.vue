<template>
    <a-spin :spinning="loadingCreated">
        <standard-form action="" name="add-page-210">
            <a-form-item label="사번(코드)" class="label-red" label-align="right">
              <div class="d-flex-center">
                <text-number-box width="200px" v-model:valueInput="dataCreated.employeeId" :required="true"
                    placeholder="숫자만 입력 가능" />
                <div class="pl-10">
                    <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                    <span class="style-note">
                        최초 저장된 이후 수정 불가
                    </span>
                </div>
              </div>
            </a-form-item>
            <a-form-item label="성명" label-align="right" class="label-red">
              
                <default-text-box width="200px" v-model:valueInput="dataCreated.name" :required="true"
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
            <a-form-item label="입사년월일" label-align="right" class="joinedAt">
                <date-time-box className="joinedAt" width="150px" v-model:valueDate="dataCreated.joinedAt" />
            </a-form-item>
            <a-form-item label="퇴사년월일" label-align="right" class="leavedAt">
                <div class="input-text">
                    <date-time-box width="150px" className="leavedAt" v-model:valueDate="dataCreated.leavedAt" />
                    <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                    <span style="font-size: 10px; color: #888888">
                        마지막 근무한 날
                    </span>
                </div>
            </a-form-item>
            <a-form-item label="내/외국인" label-align="right" class="label-custom-width">
                <radio-group :arrayValue="radioCheckForeigner" v-model:valueRadioCheck="dataCreated.foreigner"
                    layoutCustom="horizontal" />
            </a-form-item>
            <div class="d-flex">
                <a-form-item label="외국인 국적" label-align="right"
                    :class="{ 'label-red': activeLabel, 'label-custom-width': true }">
                    <country-code-select-box v-model:valueCountry="dataCreated.nationalityCode"
                        :hiddenOptionKR="dataCreated.foreigner"
                        @textCountry="(res: any) => { dataCreated.nationality = res }" :disabled="disabledSelectBox"
                        width="180px" />
                </a-form-item>
                <a-form-item label="외국인 체류자격" label-align="right"
                    :class="{ 'label-red': activeLabel, 'label-custom-width': true, 'pl-10': true }">
                    <stay-qualification-select-box v-model:valueStayQualifiction="dataCreated.stayQualification"
                        width="180px" :disabled="disabledSelectBox" />
                </a-form-item>
            </div>
            <a-form-item :label="labelResident" label-align="right" class="label-red">
                <id-number-text-box width="150px" v-model:valueInput="dataCreated.residentId" :required="true" />
            </a-form-item>
            <a-form-item label="주소정근무시간" label-align="right" class="label-red">
              <div class="input-text">
                <number-box :required="true" :spinButtons="true" v-model:valueInput="dataCreated.weeklyWorkingHours" width="150px" :min="1" :max="52"></number-box>
                <div class="pl-10">
                    <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                    <span class="style-note">
                      급여명세서 및 4대보험 취득신고시 이용됩니다.
                    </span>
                </div>
              </div>
            </a-form-item>
            <a-form-item label="주소" class="clr" label-align="left">
                <a-row>
                    <a-col :span="5">
                        <default-text-box width="100%" :disabled="true" v-model:valueInput="dataCreated.zipcode" />
                    </a-col>
                    <a-col :span="14">
                        <div style="margin-left: 5px">
                            <post-code-button @dataAddress="funcAddress" />
                        </div>
                    </a-col>
                </a-row>
                <a-row class="d-flex mt-5">
                    <default-text-box width="50%" :disabled="true" placeholder="도로명 주소"
                        v-model:valueInput="dataCreated.roadAddress" />
                    <div style="width: 50%;padding-left: 5px;">
                        <default-text-box placeholder="상세 주소 입력" v-model:valueInput="dataCreated.addressExtend" />
                    </div>
                </a-row>
            </a-form-item>
            <a-form-item label="이메일" label-align="right">
                <div class="input-text">
                    <mail-text-box width="200px" v-model:valueInput="dataCreated.email" placeholder="abc@example.com">
                    </mail-text-box>
                    <img src="@/assets/images/iconInfo.png" style="width: 16px;">
                    <span style="font-size: 10px; color: #888888">
                        원천징수영수증 등 주요 서류를 메일로 전달 가능합니다.
                    </span>
                </div>
            </a-form-item>
            <a-form-item label="부서" label-align="right">{{ dataCreated.department }}
                <custom-item-select-box v-model:valueInput="dataCreated.department" :arrSelect="selectBoxData1"
                    width="200px" />
            </a-form-item>
            <a-form-item label="직위" label-align="right">
                <custom-item-select-box v-model:valueInput="dataCreated.responsibility" :arrSelect="selectBoxData2"
                    width="200px" />
            </a-form-item>
            <div class="wf-100 text-center mt-10">
                <button-basic text="저장" type="default" mode="contained" @onClick="actionCreated($event)"
                    id="action-save" />
            </div>
        </standard-form>
    </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "vue";
import { radioCheckForeigner, DataCreated } from "../../utils/index";
import queries from "@/graphql/queries/PA/PA5/PA520/index"
import mutations from "@/graphql/mutations/PA/PA5/PA520/index";
import { useQuery, useMutation } from "@vue/apollo-composable"
import { companyId } from "@/helpers/commonFunction"
import notification from "@/utils/notification";
import { useStore } from 'vuex';
export default defineComponent({
    setup(props, { emit }) {
        const labelResident = ref('주민등록번호')
        const activeLabel = ref(false)
        const disabledSelectBox = ref(true)
        const selectBoxData1 = ref([])
        const selectBoxData2 = ref([])
        let dataCreated: any = reactive({
            ...DataCreated
        })
        const originData = ref({
            companyId: companyId,
        })
        const store = useStore();
        const globalYear: any = computed(() => store.state.settings.globalYear);
        // ============ GRAPQL ===============================
        const {
            onResult: resGetDepartments,
        } = useQuery(queries.getDepartments, originData, () => ({
            fetchPolicy: "no-cache",
        }))
        resGetDepartments(res => {
            // selectBoxData.value = res.data.getDepartments 
            let valArr: any = []
            res.data.getDepartments.map((v: any) => {
              // filter empty value
              if (v.department != '') {
                valArr.push({
                    id: v.department,
                    value: v.department
                })
              }
            })
            selectBoxData1.value = valArr
        })
        const {
            onResult: resGetResponsibilities,
        } = useQuery(queries.getResponsibilities, originData, () => ({
            fetchPolicy: "no-cache",
        }))
        resGetResponsibilities(res => {
            let valArr: any = []
          res.data.getResponsibilities.map((v: any) => {
              // filter empty value
              if (v.responsibility != '') {
                valArr.push({
                    id: v.responsibility,
                    value: v.responsibility
                })
              }
            })
            selectBoxData2.value = valArr
        })
        const {
            mutate,
            onError,
            onDone,
            loading:loadingCreated,
        } = useMutation(mutations.createEmployeeWageDaily);
        onError(e => {
            notification('error', e.message)
        })
        onDone(res => {
            store.state.common.activeAddRowPA520 = false
            store.state.common.rowIdSaveDonePa520 = dataCreated.employeeId 
            store.state.common.checkChangeValueAddPA520 = false
            notification('success', '업데이트 완료!');
        })
        //============ WATCH =================================
        watch(() => dataCreated.foreigner, (value: any) => {
            if (value == true) {
                disabledSelectBox.value = false
                labelResident.value = '외국인번호 유효성'
                activeLabel.value = true
                dataCreated.stayQualification = 'C-4'
            } else {
                activeLabel.value = false
                labelResident.value = '주민등록번호'
                disabledSelectBox.value = true
                dataCreated.nationality = '대한민국'
                dataCreated.nationalityCode = 'KR'
                dataCreated.stayQualification = null
            }
        })
        watch(() => dataCreated, (value) => {
            if (store.state.common.activeAddRowPA520 == true) {
                let dataTable = store.state.common.dataSourcePA520[store.state.common.dataSourcePA520.length - 1]
                dataTable.employeeId = value.employeeId
                dataTable.name = value.name
                dataTable.foreigner = value.foreigner
                dataTable.status = value.retirementIncome
                dataTable.residentId = value.residentId
            }

            if (JSON.stringify(DataCreated) !== JSON.stringify(value))
                store.state.common.checkChangeValueAddPA520 = true
            else
                store.state.common.checkChangeValueAddPA520 = false


        }, { deep: true })
        watch(() => store.state.common.actionSaveAddPA520, (value) => {
            document.getElementById('action-save')?.click()
        }, { deep: true });

        // convert dataCreated.name to uppercase
        watch(()=> dataCreated.name,(newVal)=> {
          dataCreated.name = newVal.toUpperCase();
        },{deep: true})
        // ============ FUNCTION =============================
        const funcAddress = (data: any) => {
            dataCreated.zipcode = data.zonecode;
            dataCreated.roadAddress = data.roadAddress;
        }
        const actionCreated = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                let newValDataCreat = {
                    ...dataCreated,
                    employeeId: parseInt(dataCreated.employeeId),
                    weeklyWorkingHours: parseInt(dataCreated.weeklyWorkingHours),
                    joinedAt: dataCreated.joinedAt,
                    leavedAt: dataCreated.leavedAt,
                    residentId: dataCreated.residentId.slice(0, 6) + '-' + dataCreated.residentId.slice(6, 14)
                };

                delete newValDataCreat.zipcode;
                let dataCallCreat = {
                    companyId: companyId,
                    imputedYear: globalYear.value,
                    input: newValDataCreat
                }
                mutate(dataCallCreat)
            }
        }
        return {
            loadingCreated, activeLabel, labelResident, disabledSelectBox, dataCreated, radioCheckForeigner, selectBoxData1, selectBoxData2,
            actionCreated, funcAddress,
        };
    },
});
</script>
<style lang="scss" scoped src="../../style/popupAddNew.scss" >

</style>
