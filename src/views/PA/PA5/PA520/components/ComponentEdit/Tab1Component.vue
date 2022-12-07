<template>
    <a-spin :spinning="loading" size="large">
        <standard-form action="" name="add-page-210">
            <a-form-item label="사번(코드)" class="label-red" label-align="right">
                <text-number-box width="200px" v-model:valueInput="dataEdited.employeeId" :required="true"
                    placeholder="숫자만 입력 가능" :disabled="true" />
            </a-form-item>
            <a-form-item label="성명" label-align="right" class="label-red">
                <default-text-box width="200px" v-model:valueInput="dataEdited.name" :required="true"
                    placeholder="한글,영문(대문자) 입력 가능" />
            </a-form-item>
            <a-form-item label="퇴직급여대상 여부" label-align="right">
                <a-radio-group v-model:value="dataEdited.retirementIncome">
                    <a-radio :value="true">
                        <div class="custom-checkbox-group" style=" background-color: #77933C;">O</div>
                    </a-radio>
                    <a-radio :value="false">
                        <div class="custom-checkbox-group" style=" background-color: red;">X</div>
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
                    <span>
                        마지막 근무한 날
                    </span>
                </div>
            </a-form-item>
            <a-form-item label="내/외국인" label-align="right" class="label-custom-width">
                <radio-group :arrayValue="radioCheckForeigner" v-model:valueRadioCheck="dataEdited.foreigner"
                    layoutCustom="horizontal" />
            </a-form-item>
            <a-form-item label="외국인 국적" label-align="right"
                :class="{ 'label-red': activeLabel, 'label-custom-width': true }">
                <country-code-select-box v-model:valueCountry="dataEdited.nationalityCode"
                    @textCountry="(res: any) => { dataEdited.nationality = res }" :disabled="disabledSelectBox" />
            </a-form-item>
            <a-form-item label="외국인 체류자격" label-align="right"
                :class="{ 'label-red': activeLabel, 'label-custom-width': true }">
                <stay-qualification-select-box v-model:valueStayQualifiction="dataEdited.stayQualification"
                    :disabled="disabledSelectBox" />
            </a-form-item>
            <a-form-item :label="labelResident" label-align="right" class="label-red">
                <id-number-text-box width="150px" v-model:valueInput="dataEdited.residentId" :required="true" />
            </a-form-item>
            <a-form-item label="주소정근무시간" class="label-red" label-align="right">
                <text-number-box width="200px" v-model:valueInput="dataEdited.weeklyWorkingHours" :required="true"
                    placeholder="숫자만 입력 가능" />
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
                <a-row style="display: inherit;">
                    <default-text-box width="357px" :disabled="true" placeholder="주소1"
                        v-model:valueInput="dataEdited.roadAddress" class="mt-5 mb-5" />
                    <default-text-box width="357px" placeholder="주소2" v-model:valueInput="dataEdited.addressExtend" />
                </a-row>
            </a-form-item>
            <a-form-item label="이메일" label-align="right">
                <div class="input-text">
                    <mail-text-box width="200px" v-model:valueInput="dataEdited.email" placeholder="abc@example.com">
                    </mail-text-box>
                    <img src="@/assets/images/iconInfo.png" style="width: 16px;">
                    <span>
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
            <div style="width: 100%;text-align: center;margin-top: 30px;">
                <button-basic text="저장" type="default" mode="contained" @onClick="actionUpdated($event)" />
            </div>
        </standard-form>
    </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "vue";
import { radioCheckForeigner, DataEdit } from "../../utils/index";
import dayjs from 'dayjs';
import queries from "@/graphql/queries/PA/PA5/PA520/index"
import mutations from "@/graphql/mutations/PA/PA5/PA520/index";
import { useQuery, useMutation } from "@vue/apollo-composable"
import { companyId } from "@/helpers/commonFunction"
import notification from "@/utils/notification";
import { useStore } from 'vuex';
export default defineComponent({
    props: {
        idRowEdit: {
            type: Number
        },
        openPopup: {
            type: Number
        }
    },
    setup(props, { emit }) {
        let arrEdit: any = []
        const labelResident = ref('외국인번호 유효성')
        const activeLabel = ref(true)
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
            imputedYear: globalYear.value,
            employeeId: props.idRowEdit
        })
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
                valArr.push({
                    id: v.department,
                    value: v.department
                })
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
                valArr.push({
                    id: v.responsibility,
                    value: v.responsibility
                })
            })
            selectBoxData2.value = valArr
        })
        const {
            refetch: refetchValueDetail,
            onResult: getValueDefault,
            loading
        } = useQuery(queries.getEmployeeWageDaily, originDataDetail, () => ({
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
                dataEdited.joinedAt = res.data.getEmployeeWageDaily.joinedAt ? dayjs(res.data.getEmployeeWageDaily.joinedAt.toString()).format('YYYY-MM-DD') : ''
                dataEdited.leavedAt = res.data.getEmployeeWageDaily.leavedAt ? dayjs(res.data.getEmployeeWageDaily.leavedAt.toString()).format('YYYY-MM-DD') : ''
                dataEdited.retirementIncome = res.data.getEmployeeWageDaily.retirementIncome
                dataEdited.weeklyWorkingHours = res.data.getEmployeeWageDaily.weeklyWorkingHours
                dataEdited.department = res.data.getEmployeeWageDaily.department
                dataEdited.responsibility = res.data.getEmployeeWageDaily.responsibility
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
        onDone(res => {
            emit('closePopup', false)
            notification('success', '업데이트 완료!')
        })
        // ============ WATCH ================================
        watch(() => props.idRowEdit, (value) => {
            let checked = 0
            let arr: any = []
            arrEdit.map((val: any) => {
                if (val.employeeId == value) {
                    checked++
                    arr = val
                }
            })
            if (checked == 0) {
                originDataDetail.value.employeeId = value
                refetchValueDetail()
            } else {
                dataEdited.name = arr.name
                dataEdited.foreigner = arr.foreigner
                dataEdited.nationality = arr.nationality
                dataEdited.nationalityCode = arr.nationalityCode
                dataEdited.stayQualification = arr.stayQualification
                dataEdited.residentId = arr.residentId.replace("-", "")
                dataEdited.zipcode = ''
                dataEdited.roadAddress = arr.roadAddress
                dataEdited.addressExtend = arr.addressExtend
                dataEdited.email = arr.email
                dataEdited.employeeId = arr.employeeId
                dataEdited.joinedAt = arr.joinedAt ? dayjs(arr.joinedAt.toString()).format('YYYY-MM-DD') : ''
                dataEdited.leavedAt = arr.leavedAt ? dayjs(arr.leavedAt.toString()).format('YYYY-MM-DD') : ''
                dataEdited.retirementIncome = arr.retirementIncome
                dataEdited.weeklyWorkingHours = arr.weeklyWorkingHours
                dataEdited.department = arr.department
                dataEdited.responsibility = arr.responsibility
            }
        })
        watch(() => JSON.parse(JSON.stringify(dataEdited)), (newVal, oldVal) => {
            arrEdit.map((val: any, index: any) => {
                if (val.employeeId == newVal.employeeId) {
                    arrEdit.splice(index, 1);
                }
            })

            if (newVal.employeeId == oldVal.employeeId) { 
                emit("editRowKey", newVal.employeeId)
            }


            arrEdit.push(newVal)
        }, { deep: true })
        watch(() => dataEdited.foreigner, (value: any) => {
            if (value == true) {
                disabledSelectBox.value = false
                labelResident.value = '주민등록번호'
                activeLabel.value = true
            } else {
                labelResident.value = '외국인번호 유효성'
                disabledSelectBox.value = true
                activeLabel.value = false
                dataEdited.nationality = '대한민국'
                dataEdited.nationalityCode = 'KR'
                dataEdited.stayQualification = 'C-4'
            }
        })
        // ============ FUNCTION =============================
        const funcAddress = (data: any) => {
            dataEdited.zipcode = data.zonecode;
            dataEdited.roadAddress = data.roadAddress;
        }
        const actionUpdated = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                arrEdit.map((val: any) => {
                    let newValDataEdit = {
                        ...val,
                        joinedAt: typeof e.joinedAt == "string" ? parseInt(e.joinedAt.replaceAll('-', '')) : e.joinedAt,
                        leavedAt: typeof e.leavedAt == "string" ? parseInt(e.leavedAt.replaceAll('-', '')) : e.leavedAt,
                        residentId: e.residentId.slice(0, 6) + '-' + e.residentId.slice(6, 14)
                    };
                    delete newValDataEdit.employeeId;
                    delete newValDataEdit.zipcode;
                    let dataCallCreat = {
                        companyId: companyId,
                        imputedYear: globalYear.value,
                        employeeId: e.employeeId,
                        input: newValDataEdit
                    };
                    mutate(dataCallCreat)
                })
            }
        }
        return {
            activeLabel,
            labelResident,
            disabledSelectBox,
            loading,
            actionUpdated,
            dataEdited,
            funcAddress,
            radioCheckForeigner,
            activeKey: 1,
            selectBoxData1,
            selectBoxData2
        };
    },
});
</script>
<style lang="scss" scoped src="../../style/popupAddNew.scss" >

</style>