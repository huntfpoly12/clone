<template>
    <div ref="root">
        <a-modal :visible="modalStatus" title="영업자관리[bf-340 –pop]" centered @cancel="setModalVisible()"
            :mask-closable="false" :width="1028" :footer="null">
            <form  action="your-action"  >
                <a-row :gutter="24">
                    <a-col :span="9" :md="13" :lg="10">
                        <a-form-item label="영업자코드" label-align="right" :label-col="labelCol">         
                            <default-text-box label="영업자코드" width="200px" :disabled="true"/>
                        </a-form-item>
                        <a-form-item label="영업자명" class="red" label-align="right" :label-col="labelCol">
                            <default-text-box label="영업자명" v-model:valueInput="formState.name" width="200px" placeholder="중복불가(2~20자)" :maxCharacter="20" :minCharacter="2" :required="true"/>
                        </a-form-item>
                        <a-form-item label="사업자유형" class="red" label-align="right" :label-col="labelCol">
                            <biz-type-select-box label="사업자유형"  v-model:valueInput="formState.bizType" width="200px" :required="true" /> 
                        </a-form-item>
                        <a-form-item label="이메일" class="red" label-align="right" :label-col="labelCol">
                            <mail-text-box label="이메일" v-model:valueInput="formState.email" width="250px" :required="true"/>
                        </a-form-item>
                        <a-form-item label="연락처" class="red" label-align="right" :label-col="labelCol">
                            <tel-text-box label="연락처" v-model:valueInput="formState.phone" width="200px" placeholder="전화번호를 입력"  :required="true" />
                        </a-form-item>
                        <a-form-item label="팩스" label-align="right" :label-col="labelCol">
                            <text-number-box v-model:valueInput="formState.fax" width="200px"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="15" :md="11" :lg="14">
                        <a-form-item label="상태" label-align="right" :label-col="labelCol">
                            <sale-status-select-box v-model:valueInput="formState.status" width="100px"  :disabled="true"/>
                        </a-form-item>
                        <a-form-item label="등급" class="red" label-align="right" :label-col="labelCol">
                            <sale-grade-select-box label="등급" v-model:valueInput="formState.grade" width="100px" :required="true"/>
                        </a-form-item>
                        <a-form-item label="법인(주민)등록번호" :wrapper-col="{ span: 14 }" label-align="right" :label-col="labelCol">
                            <id-card-text-box v-model:valueInput="formState.residentId" />
                        </a-form-item>
                        <a-form-item label="사업자등록번호" label-align="right" :label-col="labelCol">
                            <company-registration-number-text-box v-model:valueInput="formState.bizNumber" />
                        </a-form-item>
                        <a-form-item label="휴대폰"  class="red" label-align="right" :label-col="labelCol">
                            <tel-text-box label="휴대폰" v-model:valueInput="formState.mobilePhone" placeholder="전화번호를 입력" :required="true"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row >
                    <a-col :lg="15">
                        <a-form-item label="주소" label-align="right" :label-col="{span: 3}" :wrapper-col="{ span: 21 }" class="post-code red">
                          <div style="display:flex">
                            <default-text-box label="주소" v-model:valueInput="formState.zipcode"  width="200px" :disabled="true" :required="true"/>
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
                            <default-text-box v-model:valueInput="formState.roadAddress"  width="100%" :disabled="true" :required="true" placeholder="우편번호"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8" :md="13" :lg="11">
                        <a-form-item :wrapper-col="{ span: 24}" class="detail-address" label-align="right" :label-col="labelCol">
                            <default-text-box v-model:valueInput="formState.addressExtend"  placeholder="상세주소"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="세금계산서발행여부" :label-col="{ span: 8 }"  label-align="right" >
                            <a-switch v-model:checked="formState.taxInvoice" checked-children="발행"
                                un-checked-children="미발행" style="width: 80px" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-row>
                            <a-col :span="6" :md="6" :lg="5">
                                <label class="lable-item"> 전자세금계산서<br>수신이메일 : </label>
                            </a-col>
                            <a-col :span="16" :md="16" :lg="17">
                                <mail-text-box v-model:valueInput="formState.emailTaxInvoice" width="100%"/>
                            </a-col>
                        </a-row>
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
                        <a-form-item label="가입일자"  class="red" label-align="right" :label-col="labelCol">
                            <div style="width: 150px">
                                <date-time-box v-model:valueDate="formState.registerDate" />
                            </div>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="13" :lg="14">
                        <a-form-item label="예금주" label-align="right" :label-col="labelCol">
                            <default-text-box v-model:valueInput="formState.accountOwner" />
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
                            <text-area-box v-model:valueInput="formState.remark" placeholder="500자 이내"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row style="margin-top: 20px;">
                    <a-col :span="16" :offset="8">
                        <button-basic text="취소" :type="'default'" mode="outlined" @onClick="setModalVisible()" :width="70" style="margin-right: 10px;" />
                        <button-basic text="저장하고 나가기" :type="'default'" mode="'contained'" @onClick="createSale($event)" :width="150" />
                    </a-col>
                </a-row>
            </form>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch ,reactive} from 'vue'
import { useMutation } from "@vue/apollo-composable";
import notification from '../../../../../utils/notification';
import { initialFormState } from '../utils';
import mutations from "../../../../../graphql/mutations/BF/BF3/BF340/index";

export default defineComponent({
    props: {
        modalStatus: Boolean,
    },
    setup(props, { emit }) {
        const visible = ref<boolean>(false);
        const labelCol = { span: 6 };
        const wrapperCol = { span: 14 };
        let confirm = ref<string>('');
        const formState = reactive<any>({...initialFormState});

      // watch event modal popup
      watch(
          () => props.modalStatus,
          (newValue, old) => {
              if (newValue) {
                  Object.assign(formState, initialFormState);
              }else{
                Object.assign(formState, initialFormState);
              }
          }
      );
        // create saler
        const {
            mutate: creactSale,
            loading: loadingUpdate,
            onDone: onDoneAdd,
            onError
        } = useMutation(mutations.creactedSale);

        onDoneAdd((res) => {
            notification('success',`새러운 영업자 추가 완료!`)
            emit("closePopup", false);
        })

        onError((error) => {
            notification('error',error.message)
        });

        const setModalVisible = ()=>{
            emit('closePopup', false)
        }
  
        const funcAddress = (data: any)=>{
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
        }

        const createSale = (e:any) => { 
            var res =   e.validationGroup.validate(); 
            console.log(res);
            if(!res.isValid){  
               res.brokenRules[0].validator.focus();  
            }else{
                let dataNew = {
                            input: {
                                ...formState
                            }
                        }
                creactSale(dataNew)
            }
        }
        return {
            labelCol,
            wrapperCol,
            formState,
            visible,
            confirm,
            creactSale,
            funcAddress,
            setModalVisible,
            createSale
        }
    }, methods: {
      
    }
    
})
</script>
<style scoped lang="scss" src="../style/addnewStyle.scss">

</style>