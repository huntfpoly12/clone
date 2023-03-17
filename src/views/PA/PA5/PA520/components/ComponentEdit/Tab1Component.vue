<template>
    <a-spin :spinning="loading" size="large">
        <standard-form  formName="update-page-PA520" ref="formRefPa520Update">
            <a-form-item label="사번(코드)" class="label-red" label-align="right">
                <div class="d-flex-center">
                    <text-number-box width="200px" v-model:valueInput="dataEdited.employeeId" :required="true"
                        placeholder="숫자만 입력 가능" :disabled="true" />
                    <div class="pl-10">
                        <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                        <span class="style-note">
                            최초 저장된 이후 수정 불가
                        </span>
                    </div>
                </div>
            </a-form-item>
            <a-form-item label="성명" label-align="right" class="label-red">
                <default-text-box width="200px" v-model:valueInput="dataEdited.name" :required="true"
                    placeholder="한글,영문(대문자) 입력 가능" />
            </a-form-item>
            <a-form-item label="퇴직급여대상 여부" label-align="right">
                <a-radio-group v-model:value="dataEdited.retirementIncome">
                    <a-radio :value="true">
                        <div class="custom-checkbox-group" style="background-color: #77933C;">O</div>
                    </a-radio>
                    <a-radio :value="false">
                        <div class="custom-checkbox-group" style="background-color: red;">X</div>
                    </a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="입사년월일" label-align="right" class="joinedAt">
                <date-time-box width="150px" className="joinedAt" v-model:valueDate="dataEdited.joinedAt" />
            </a-form-item>
            <a-form-item label="퇴사년월일" label-align="right" class="leavedAt">
                <div class="input-text">
                    <date-time-box width="150px" className="leavedAt" v-model:valueDate="dataEdited.leavedAt" />
                    <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                    <span class="style-note">
                        마지막 근무한 날
                    </span>
                </div>
            </a-form-item>
            <a-form-item label="내/외국인" label-align="right" class="label-custom-width">
                <radio-group :arrayValue="radioCheckForeigner" v-model:valueRadioCheck="dataEdited.foreigner"
                    layoutCustom="horizontal" />
            </a-form-item>
            <div class="d-flex">
                <a-form-item label="외국인 국적" label-align="right"
                    :class="{ 'label-red': activeLabel, 'label-custom-width': true }">
                    <country-code-select-box v-model:valueCountry="dataEdited.nationalityCode"
                        :hiddenOptionKR="dataEdited.foreigner" width="180px" :disabled="disabledSelectBox" :required="!disabledSelectBox"/>
                </a-form-item>
                <a-form-item label="외국인 체류자격" label-align="right"
                    :class="{ 'label-red': activeLabel, 'label-custom-width': true, }" style="padding-left: 10px;">
                    <stay-qualification-select-box v-model:valueStayQualifiction="dataEdited.stayQualification"
                        :disabled="disabledSelectBox" width="180px"  :required="!disabledSelectBox"/>
                </a-form-item>
            </div>
            <a-form-item :label="labelResident" label-align="right" class="label-red">
                <id-number-text-box width="150px" v-model:valueInput="dataEdited.residentId" :required="true" />
            </a-form-item>
            <a-form-item label="주소정근무시간" class="label-red" label-align="right">
              <div class="input-text">
                <number-box :required="true" :spinButtons="true" v-model:valueInput="dataEdited.weeklyWorkingHours" width="150px" :min="1" :max="52"></number-box>
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
                        <default-text-box width="100%" :disabled="true" v-model:valueInput="dataEdited.zipcode" />
                    </a-col>
                    <a-col :span="14">
                        <div class="ml-5">
                            <post-code-button @dataAddress="funcAddress" />
                        </div>
                    </a-col>
                </a-row>
                <a-row class="d-flex-center pt-5">
                    <default-text-box :disabled="true" placeholder="도로명 주소" v-model:valueInput="dataEdited.roadAddress"
                        style="width: 50%;" />
                    <div style="width: 50%; padding-left: 10px;">
                        <default-text-box placeholder="상세 주소 입력" v-model:valueInput="dataEdited.addressExtend" />
                    </div>
                </a-row>
            </a-form-item>
            <a-form-item label="이메일" label-align="right">
                <div class="input-text">
                    <mail-text-box width="200px" v-model:valueInput="dataEdited.email" placeholder="abc@example.com">
                    </mail-text-box>
                    <img src="@/assets/images/iconInfo.png" style="width: 16px;">
                    <span class="style-note">
                        원천징수영수증 등 주요 서류를 메일로 전달 가능합니다.
                    </span>
                </div>
            </a-form-item>
            <a-form-item label="부서" label-align="right">
                <custom-item-select-box v-model:valueInput="dataEdited.department" :arrSelect="selectBoxData1"
                    width="200px" />
            </a-form-item>
            <a-form-item label="직위" label-align="right">
                <custom-item-select-box v-model:valueInput="dataEdited.responsibility" :arrSelect="selectBoxData2"
                    width="200px" />
            </a-form-item>
            <div class="wf-100 text-center mt-10">
                <button-basic text="저장" type="default" mode="contained" @onClick="actionUpdated()"
                    id="action-update" />
            </div>
        </standard-form>
    </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "vue";
import { radioCheckForeigner, DataEdit } from "../../utils/index";
import queries from "@/graphql/queries/PA/PA5/PA520/index"
import mutations from "@/graphql/mutations/PA/PA5/PA520/index";
import { useQuery, useMutation } from "@vue/apollo-composable"
import { companyId } from "@/helpers/commonFunction"
import notification from "@/utils/notification";
import { useStore } from 'vuex';
import { Message } from "@/configs/enum";
export default defineComponent({
    props: {
        idRowEdit: Number,
        openPopup: Number,
    },
  setup(props, { emit }) {
        const formRefPa520Update = ref()
        const labelResident = ref('주민등록번호')
        const activeLabel = ref(false)
        const disabledSelectBox = ref(true)
        const selectBoxData1 = ref()
        const selectBoxData2 = ref()
        let dataEdited: any = reactive({
            ...DataEdit
        })
        const store = useStore();
        const globalYear: any = computed(() => store.state.settings.globalYear);
        
        const originData = ref({
            companyId: companyId,
        })
        const originDataDetail = ref({
            companyId: companyId,
            imputedYear: globalYear,
            employeeId: props.idRowEdit
        })
        let dataDefault = ref({})
        const trigger = ref(true)
        // ============ GRAPQL ===============================
        const {
            onResult: resGetDepartments,
        } = useQuery(queries.getDepartments, originData, () => ({
            fetchPolicy: "no-cache",
        }))
        resGetDepartments(res => {
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
            refetch: refetchValueDetail,
            onResult: getValueDefault,
            loading
        } = useQuery(queries.getEmployeeWageDaily, originDataDetail, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
        getValueDefault(res => {
          if (res.data) {
                dataEdited.name = res.data.getEmployeeWageDaily.name
                dataEdited.foreigner = res.data.getEmployeeWageDaily.foreigner
                dataEdited.nationality = res.data.getEmployeeWageDaily.nationality
                dataEdited.nationalityCode = res.data.getEmployeeWageDaily.nationalityCode
                dataEdited.stayQualification = res.data.getEmployeeWageDaily.stayQualification
                dataEdited.residentId = res.data.getEmployeeWageDaily.residentId.replace("-", "")
                dataEdited.zipcode = ''
                dataEdited.roadAddress = res.data.getEmployeeWageDaily.roadAddress
                dataEdited.addressExtend = res.data.getEmployeeWageDaily.addressExtend
                dataEdited.email = res.data.getEmployeeWageDaily.email
                dataEdited.employeeId = res.data.getEmployeeWageDaily.employeeId
                dataEdited.joinedAt = res.data.getEmployeeWageDaily.joinedAt
                dataEdited.leavedAt = res.data.getEmployeeWageDaily.leavedAt
                dataEdited.retirementIncome = res.data.getEmployeeWageDaily.retirementIncome
                dataEdited.weeklyWorkingHours = res.data.getEmployeeWageDaily.weeklyWorkingHours
                dataEdited.department = res.data.getEmployeeWageDaily.department
                dataEdited.responsibility = res.data.getEmployeeWageDaily.responsibility
                dataDefault.value = JSON.stringify(dataEdited)
                trigger.value = false
            }
        })
        const {
            mutate,
            onError,
            onDone,
        } = useMutation(mutations.updateEmployeeWageDaily);
        onError(e => {
            notification('error', e.message)
        })
        onDone(() => {
          store.state.common.rowIdSaveDonePa520 = dataEdited.employeeId 
          store.state.common.checkChangeValueEditTab1PA520 = false
          dataDefault.value = JSON.stringify(dataEdited)
          emit('closePopup', false)
          notification('success', '업데이트 완료!')
        })
        // ============ WATCH ================================ 
        watch(() => props.idRowEdit, (newVal) => {
            originDataDetail.value.employeeId = newVal
            trigger.value = true
            refetchValueDetail()
        })
        watch(() => dataEdited.foreigner, (value: any) => {
          if (value == true) {
                disabledSelectBox.value = false
                labelResident.value = '외국인번호 유효성'
                activeLabel.value = true
                dataEdited.nationalityCode = 'KR'
                // dataEdited.stayQualification = null
            } else {
                labelResident.value = '주민등록번호'
                disabledSelectBox.value = true
                activeLabel.value = false
                dataEdited.nationality = '대한민국'
                dataEdited.nationalityCode = 'KR'
            }
        })
 
        watch(dataEdited, (newvl, oldvl) => {
          // if (disabledSelectBox) {
          //   dataEdited.stayQualification = null
          // }
          // If the corrected data is different from the default data, change the check change status
          if (dataDefault.value !== JSON.stringify(dataEdited)) {
            store.state.common.checkChangeValueEditTab1PA520 = true
          } else {
            store.state.common.checkChangeValueEditTab1PA520 = false
          }
        }, { deep: true })

        // convert dataCreated.name to uppercase
        watch(()=> dataEdited.name,(newVal)=> {
          dataEdited.name = newVal.toUpperCase();
        },{deep: true})
        // ============ FUNCTION =============================
        const funcAddress = (data: any) => {
            dataEdited.zipcode = data.zonecode;
            dataEdited.roadAddress = data.roadAddress;
        }
        const actionUpdated = () => {
            var res = formRefPa520Update.value.validate();
            if (!res.isValid) {
              res.brokenRules[0].validator.focus();
              store.state.common.checkChangeValueEditTab1PA520 = true
            } else {
                let newValDataEdit = {
                    ...dataEdited,
                    joinedAt: dataEdited.joinedAt,
                    leavedAt: dataEdited.leavedAt,
                    residentId: dataEdited.residentId.slice(0, 6) + '-' + dataEdited.residentId.slice(6, 14)
                };
                delete newValDataEdit.employeeId;
                delete newValDataEdit.zipcode;
                let dataCallCreat = {
                    companyId: companyId,
                    imputedYear: globalYear.value,
                    employeeId: dataEdited.employeeId,
                    input: newValDataEdit
                };
                mutate(dataCallCreat)
            }
        }

        watch(() => store.state.common.actionUpdateTab1PA520, () => {
            actionUpdated()
            originDataDetail.value.employeeId = props.idRowEdit
            trigger.value = false
            refetchValueDetail()
        })

        return {
            activeLabel, labelResident, disabledSelectBox, loading, dataEdited, radioCheckForeigner, selectBoxData1, selectBoxData2,
            actionUpdated, funcAddress,Message,formRefPa520Update,dataDefault,globalYear
        };
    },
});
</script>
<style lang="scss" scoped src="../../style/popupAddNew.scss" >

</style>
