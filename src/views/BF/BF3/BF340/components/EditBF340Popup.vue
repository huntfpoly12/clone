<template>
    <div ref="root">
        <a-modal :visible="modalStatus" title="영업자관리[bf-340 –pop]" centered @cancel="setModalVisible()"
            :mask-closable="false" :width="1028" :footer="null">
            <form  action="your-action" >
                <a-row :gutter="24">
                    <a-col :span="9" :md="13" :lg="10">
                        <a-form-item label="영업자코드" label-align="right" :label-col="labelCol">         
                            <default-text-box v-model:valueInput="code" width="200px" :disabled="true" />
                        </a-form-item>
                        <a-form-item label="영업자명" class="red" label-align="right" :label-col="labelCol">
                            <default-text-box  v-model:valueInput="formState.name" width="200px"  :disabled="!canChangeCompanyName" placeholder="중복불가(2~20자)" :maxCharacter="20" :minCharacter="2" :required="true"/>
                        </a-form-item>
                        <a-form-item label="사업자유형" class="red" label-align="right" :label-col="labelCol">
                            <biz-type-select-box  v-model:valueInput="formState.bizType" width="200px" :required="true"/> 
                        </a-form-item>
                        <a-form-item label="이메일" class="red" label-align="right" :label-col="labelCol">
                            <mail-text-box  v-model:valueInput="formState.email" width="250px" :required="true"/>
                        </a-form-item>
                        <a-form-item label="연락처" class="red" label-align="right" :label-col="labelCol">
                            <tel-text-box  v-model:valueInput="formState.phone" width="200px" placeholder="전화번호를 입력" :required="true"/>
                        </a-form-item>
                        <a-form-item label="팩스" label-align="right" :label-col="labelCol">
                            <text-number-box v-model:valueInput="formState.fax" width="200px"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="15" :md="11" :lg="14">
                        <a-form-item label="상태" label-align="right" :label-col="labelCol">
                            <sale-status-select-box v-model:valueInput="formState.status" width="100px" :confirmStatus="true" :disabled="code == 'S0001'"/>
                        </a-form-item>
                        <a-form-item label="등급" class="red" label-align="right" :label-col="labelCol">
                            <sale-grade-select-box  v-model:valueInput="formState.grade" width="100px" :required="true" />
                        </a-form-item>
                        <a-form-item label="법인(주민)등록번호" :wrapper-col="{ span: 14 }"  label-align="right" :label-col="labelCol">
                            <id-number-text-box  v-model:valueInput="formState.residentId" width="150px"/>
                        </a-form-item>
                        <a-form-item label="사업자등록번호" label-align="right" :label-col="labelCol">
                            <biz-number-text-box v-model:valueInput="formState.bizNumber" width="150px"/>
                        </a-form-item>
                        <a-form-item label="휴대폰" class="red" label-align="right" :label-col="labelCol">
                            <tel-text-box  v-model:valueInput="formState.mobilePhone" placeholder="전화번호를 입력" :required="true" width="150px"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row >
                    <a-col :lg="15">
                        <a-form-item label="주소" label-align="right" :label-col="{span: 3}" :wrapper-col="{ span: 21 }" class="post-code">
                          <div style="display:flex">
                            <default-text-box v-model:valueInput="formState.zipcode"  width="200px" :disabled="true" :required="true"/>
                             <div style="margin-left: 5px">        
                                <post-code-button @dataAddress="funcAddress"/>
                            </div>
                         </div>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="15" :md="13" :lg="12">
                        <a-form-item class="result-address" :wrapper-col="{ span: 24 }" label-align="right" :label-col="labelCol">
                            <default-text-box v-model:valueInput="formState.roadAddress"  width="100%" :disabled="true" :required="true" placeholder="주소"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8" :md="13" :lg="11">
                        <a-form-item :wrapper-col="{ span: 24}" class="detail-address" label-align="right" :label-col="labelCol">
                            <default-text-box v-model:valueInput="formState.addressExtend"  placeholder="상세주소" width="438px"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="10">
                        <a-form-item label="세금계산서발행여부" :label-col="{ span: 8 }" label-align="right" >
                            <a-switch v-model:checked="formState.taxInvoice" checked-children="발행"
                                un-checked-children="미발행" style="width: 80px" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="14">
                        <div style="margin-left: 30px;">
                            <a-row>
                                <a-col :span="6" :md="6" :lg="5">
                                    <label class="lable-item"> 전자세금계산서<br>수신이메일 : </label>
                                </a-col>
                                <a-col :span="16" :md="16" :lg="17">
                                    <mail-text-box v-model:valueInput="formState.emailTaxInvoice" width="100%" :required="receiptOrNot"/>
                                </a-col>
                            </a-row>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12" :md="13" :lg="10">
                        <a-form-item label="은행" label-align="right" :label-col="labelCol">
                            <bank-select-box v-model:valueInput="formState.bankType" width="200px" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12" :md="13" :lg="10">
                        <a-form-item label="계좌번호" label-align="right" :label-col="labelCol">
                            <text-number-box v-model:valueInput="formState.accountNumber" width="200px"/>
                        </a-form-item>
                        <a-form-item label="가입일자" class="red" label-align="right" :label-col="labelCol">
                            <div style="width: 150px">
                                <date-time-box v-model:valueDate="formState.registerDate"/>
                            </div>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="13" :lg="14">
                        <a-form-item label="예금주" label-align="right" :label-col="labelCol">
                            <default-text-box v-model:valueInput="formState.accountOwner" width="383px"/>
                        </a-form-item>
                        <a-form-item label="해지일자" label-align="right" :label-col="labelCol">
                            <div style="width: 150px">
                                <date-time-box v-model:valueDate="formState.cancelDate"/>
                            </div>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="24" :md="24" :lg="24">
                        <a-form-item label="비고" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }"
                            class="textarea_340">
                            <text-area-box v-model:valueInput="formState.remark" placeholder="500자 이내"  width="835px"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row style="margin-top: 20px;">
                    <a-col :span="16" :offset="8">
                        <button-basic text="취소" :type="'default'" mode="outlined" @onClick="setModalVisible()" :width="70" style="margin-right: 10px;" />
                        <button-basic text="저장하고 나가기" :type="'default'" mode="'contained'" @onClick="updateSale($event)" :width="150" />
                    </a-col>
                </a-row>
            </form>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, watch } from 'vue';
import { useQuery, useMutation } from "@vue/apollo-composable";
import dayjs, { Dayjs } from 'dayjs';
import notification from '../../../../../utils/notification';
import { initialFormState } from '../utils';
import queries from "../../../../../graphql/queries/BF/BF3/BF340/index";
import mutations from "../../../../../graphql/mutations/BF/BF3/BF340/index";

export default defineComponent({
    props: ['modalStatus', 'data', 'idSaleEdit']
    ,
    setup(props, { emit }) {
        const code = ref();
        const id = ref();
        const dataQuery = ref();
        let trigger = ref<boolean>(false);
        let triggerCheckPer = ref<boolean>(false);
        const dataQueryCheckPer = ref({});
        let canChangeCompanyName =  ref<boolean>(false);
        const visible = ref<boolean>(false);
        const receiptOrNot = ref<boolean>(false);
        const labelCol = { span: 6 };

        // watch event modal popup
        watch(
            () => props.modalStatus,
            (newValue, old) => {
                if (newValue) {
                    visible.value = newValue;
                    dataQuery.value = { id: props.idSaleEdit };
                    trigger.value = true;
                    refetch();
                } else {
                    visible.value = newValue;
                    trigger.value = false;
                }
            }
        );

        let formState = reactive({...initialFormState});

        // query check if can be change name company 
        const { result: resCheckPerEdit, refetch: refetchCheckPer } = useQuery(
            queries.isSalesRepresentativeChangableName, dataQueryCheckPer,
            () => ({
                enabled: triggerCheckPer.value,
                fetchPolicy: "no-cache",
            })
        );

        // watch result resCheckPerEdit
        watch(resCheckPerEdit, (value) => {
            if(value){
                canChangeCompanyName.value = value.isSalesRepresentativeChangableName;
            }    
        });

        // get  sale representative
        const { result, loading ,refetch, onError } = useQuery(
            queries.getSalesRepresentative,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );

        onError((error) => {
            notification('error',error.message);
        })

        watch(result, (value) => {
            if (value && value.getSalesRepresentative) {
                code.value = value.getSalesRepresentative.code;
                id.value =  value.getSalesRepresentative.id;

                formState.status = value.getSalesRepresentative.status;
                formState.name = value.getSalesRepresentative.name;
                formState.grade = value.getSalesRepresentative.grade;
                formState.bizType = value.getSalesRepresentative.detail.bizType;
                formState.bizNumber = value.getSalesRepresentative.detail.bizNumber;
                formState.residentId = value.getSalesRepresentative.detail.residentId;
                formState.email = value.getSalesRepresentative.detail.email;
                formState.mobilePhone = value.getSalesRepresentative.detail.mobilePhone;
                formState.phone = value.getSalesRepresentative.detail.phone;
                formState.fax = value.getSalesRepresentative.detail.fax;
                formState.zipcode = value.getSalesRepresentative.detail.zipcode;
                formState.roadAddress = value.getSalesRepresentative.detail.roadAddress;
                formState.jibunAddress = value.getSalesRepresentative.detail.jibunAddress;
                formState.addressExtend = value.getSalesRepresentative.detail.addressExtend;
                formState.addressDetail.bcode = value.getSalesRepresentative.detail.addressDetail.bcode;
                formState.addressDetail.bname = value.getSalesRepresentative.detail.addressDetail.bname;
                formState.addressDetail.buildingCode = value.getSalesRepresentative.detail.addressDetail.buildingCode;
                formState.addressDetail.buildingName = value.getSalesRepresentative.detail.addressDetail.buildingName;
                formState.addressDetail.roadname = value.getSalesRepresentative.detail.addressDetail.roadname;
                formState.addressDetail.roadnameCode = value.getSalesRepresentative.detail.addressDetail.roadnameCode;
                formState.addressDetail.sido = value.getSalesRepresentative.detail.addressDetail.sido;
                formState.addressDetail.sigungu = value.getSalesRepresentative.detail.addressDetail.sigungu;
                formState.addressDetail.sigunguCode = value.getSalesRepresentative.detail.addressDetail.sigunguCode;
                formState.addressDetail.zonecode = value.getSalesRepresentative.detail.addressDetail.zonecode;
                formState.taxInvoice = value.getSalesRepresentative.detail.taxInvoice;
                formState.emailTaxInvoice = value.getSalesRepresentative.detail.emailTaxInvoice;
                formState.bankType = value.getSalesRepresentative.detail.bankType;
                formState.accountNumber = value.getSalesRepresentative.detail.accountNumber;
                formState.accountOwner = value.getSalesRepresentative.detail.accountOwner;
                formState.registerDate =  value.getSalesRepresentative.detail.registerDate;
                formState.cancelDate = value.getSalesRepresentative.detail.cancelDate;
                formState.remark = value.getSalesRepresentative.detail.remark;

                triggerCheckPer.value = true;
                dataQueryCheckPer.value = { id: value.getSalesRepresentative.id, name: value.getSalesRepresentative.name };
                // trigger query check if can be change business registration number 
                refetchCheckPer()
            }
        });

        // update sale representative
        const {
            mutate: actionUpdate,
            onError : onUpdateError,
            loading: loadingUpdate,
            onDone: updateDone,
        } = useMutation(mutations.updateSalesRepresentative);

        onUpdateError((error) => {
            notification('error',error.message);
        });

        const updateSale = (e : any) => {
            var res =   e.validationGroup.validate(); 
            console.log(res)
            if(!res.isValid){  
               res.brokenRules[0].validator.focus();  
            }else{
                let variables = {
                    id: id.value,
                    input: formState
                };
                actionUpdate(variables);
            }
        }

        updateDone((res) => {
            notification('success',`업데이트가 완료되었습니다!`);
            setModalVisible();
        });

        const funcAddress = (data: any) => {
            formState.zipcode = data.zonecode;
            formState.roadAddress = data.roadAddress;
            formState.jibunAddress = data.jibunAddress;
            formState.addressDetail.bcode = data.bcode;
            formState.addressDetail.bname = data.bname;
            formState.addressDetail.buildingCode = data.buildingCode;
            formState.addressDetail.buildingName = data.buildingName;
            formState.addressDetail.roadname = data.roadname;
            formState.addressDetail.roadnameCode = data.roadnameCode;
            formState.addressDetail.sido = data.sido;
            formState.addressDetail.sigungu = data.sigungu;
            formState.addressDetail.sigunguCode = data.sigunguCode;
            formState.addressDetail.zonecode = data.zonecode;
        };

        const setModalVisible = () => {
            emit('closePopup', false)
        }

         // watch result resCheckPerEdit
         watch(()=> formState.status, (value) => {
            if(value == 2){
                formState.cancelDate = dayjs().format('YYYY-MM-DD') ;
            }    
        });

        // if taxvoice = true then 전자세금계산서 수신이메일 require
        watch(()=> formState.taxInvoice,(newValue)=>{
            receiptOrNot.value = newValue;
        });
        return {
            code,
            labelCol,
            formState,
            visible,
            receiptOrNot,
            funcAddress,
            loading,
            updateSale,
            loadingUpdate,
            canChangeCompanyName,
            setModalVisible
        }
    }
})
</script>

<style lang="scss" scoped src="../style/editStyle.scss">

</style>