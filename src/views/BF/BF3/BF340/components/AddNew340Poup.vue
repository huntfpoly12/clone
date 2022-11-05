<template>
    <div ref="root">
        <a-modal :visible="modalStatus" title="영업자관리[bf-340 –pop]" centered @cancel="setModalVisible()"
            :mask-closable="false" :width="1028">
            <template #footer>
            </template>
            <form  action="your-action" @submit.prevent="createSale()" >
                <a-row :gutter="24">
                    <a-col :span="9" :md="13" :lg="10">
                        <a-form-item label="영업자코드" label-align="right" :label-col="labelCol">         
                            <default-text-box  width="200px" :disabled="true"/>
                        </a-form-item>
                        <a-form-item label="영업자명" label-align="right" :label-col="labelCol">
                            <default-text-box v-model:valueInput="formState.name" width="200px"/>
                        </a-form-item>
                        <a-form-item label="사업자유형" class="label-br" label-align="right" :label-col="labelCol">
                            <biz-type-select-box   v-model:valueInput="formState.bizType" width="200px" /> 
                        </a-form-item>
                        <a-form-item label="이메일" :name="['이메일']" :rules="[{ type: 'email' }]" label-align="right" :label-col="labelCol">
                            <mail-text-box v-model:valueInput="formState.email" width="250px"/>
                        </a-form-item>
                        <a-form-item label="연락처" label-align="right" :label-col="labelCol">
                            <tel-text-box v-model:valueInput="formState.phone" width="200px" placeholder="전화번호를 입력" />
                        </a-form-item>
                        <a-form-item label="팩스" label-align="right" :label-col="labelCol">
                            <text-number-box v-model:valueInput="formState.fax" width="200px"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="15" :md="11" :lg="14">
                        <a-form-item label="상태" label-align="right" :label-col="labelCol">
                            <sale-status-select-box v-model:valueInput="formState.status" width="100px"/>
                        </a-form-item>
                        <a-form-item label="등급" label-align="right" :label-col="labelCol">
                            <sale-grade-select-box v-model:valueInput="formState.grade" width="100px"/>
                        </a-form-item>
                        <a-form-item label="법인(주민)등록번호" :wrapper-col="{ span: 14 }" class="label-br" label-align="right" :label-col="labelCol">
                            <id-card-text-box :required="true" v-model:valueInput="formState.residentId" messRequired="이항목은 필수 입력사항입니다!" />
                        </a-form-item>
                        <a-form-item label="사업자등록번호" class="label-br" label-align="right" :label-col="labelCol">
                            <company-registration-number-text-box v-model:valueInput="formState.bizNumber"  :required="true" messRequired="이항목은 필수 입력사항입니다!" />
                        </a-form-item>
                        <a-form-item label="휴대폰" label-align="right" :label-col="labelCol">
                            <tel-text-box v-model:valueInput="formState.mobilePhone" placeholder="전화번호를 입력"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row >
                    <a-col :lg="15">
                        <a-form-item label="주소" label-align="right" :label-col="{span: 3}" :wrapper-col="{ span: 21 }" class="post-code">
                          <div style="display:flex">
                            <default-text-box v-model:valueInput="formState.zipcode"  width="200px" :disabled="true"/>
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
                            <default-text-box v-model:valueInput="formState.roadAddress"  width="100%" :disabled="true"/>
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
                        <a-form-item label="세금계산서발행여부" :label-col="{ span: 8 }" class="label-br" label-align="right" >
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
                        <a-form-item label="가입일자" label-align="right" :label-col="labelCol">
                            <div style="width: 150px">
                                <date-time-box v-model:valueDate="formState.registerDate"/>
                            </div>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="13" :lg="14">
                        <a-form-item label="예금주" label-align="right" :label-col="labelCol">
                            <default-text-box v-model:valueInput="formState.accountOwner" />
                        </a-form-item>
                        <a-form-item label="해지일자" label-align="right" :label-col="labelCol">{{formState.cancelDate}}
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
                        <DxButton
                            :width="120"
                            text="취소"
                            type="default"
                            styling-mode="outlined"
                            @click="setModalVisible"
                            style="margin-right: 10px;"
                            />
                        <DxButton
                            id="button"
                            :use-submit-behavior="true"
                            text="저장하고 나가기"
                            type="default"
                        />
                    </a-col>
                </a-row>
            </form>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue'
import { SearchOutlined, WarningOutlined } from '@ant-design/icons-vue';
import { useMutation } from "@vue/apollo-composable";
import DxButton from 'devextreme-vue/button';
import mutations from "../../../../../graphql/mutations/BF/BF3/BF340/index";
import { message } from "ant-design-vue";

export default defineComponent({
    props: {
        modalStatus: Boolean,
    },
    components: {
        SearchOutlined,
        WarningOutlined,
        DxButton
    },
    setup(props, { emit }) {
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        const visible = ref<boolean>(false);
        const labelCol = { span: 6 };
        const wrapperCol = { span: 14 };
        let confirm = ref<string>('');
        const validateMessages = {
            required: true,
            types: {
                email: "이메일 형식이 정확하지 않습니다",
            },
        };
        const initialFormState = {
            status: 1,
            name: "",
            grade: 1,
            bizType: 1,
            bizNumber: "",
            residentId: "",
            email: "",
            mobilePhone: "",
            phone: "",
            fax: "",
            zipcode: "",
            roadAddress: "",
            jibunAddress: "",
            addressExtend: "",
            addressDetail: {
                bcode: "",
                bname: "",
                buildingCode: "",
                buildingName: "",
                roadname: "",
                roadnameCode: "",
                sido: "",
                sigungu: "",
                sigunguCode: "",
                zonecode: "",
            },
            taxInvoice: true,
            emailTaxInvoice: "",
            bankType: "39",
            accountNumber: "",
            accountOwner: "",
            registerDate: "",
            cancelDate: "",
            remark: "",
        };
        const formState = ref<any>({...initialFormState});

      // watch event modal popup
      watch(
          () => props.modalStatus,
          (newValue, old) => {
              if (newValue) {
                  Object.assign(formState, initialFormState);
              }
          }
      );
        const afterPopupClose = () => {

        };

        const onFinish = (values: any) => {
        };
        // create saler
        const {
            mutate: creactSale,
            loading: loadingUpdate,
            onDone: onDoneAdd,
        } = useMutation(mutations.creactedSale);


        onDoneAdd((res) => {
            message.success(`새러운 영업자 추가 완료!`, 5);
            emit("closePopup", false);
            emit("addNewDone", false);
        })

        const setModalVisible = ()=>{
            emit('closePopup', false)
        }
  

        const funcAddress = (data: any)=>{
            formState.value.zipcode = data.zonecode;
            formState.value.roadAddress = data.roadAddress;
            formState.value.jibunAddress = data.jibunAddress;
            formState.value.addressDetail.bcode = data.bcode;
            formState.value.addressDetail.bname = data.bname;
            formState.value.addressDetail.buildingCode = data.buildingCode;
            formState.value.addressDetail.buildingName = data.buildingName;
            formState.value.addressDetail.roadname = data.roadname;
            formState.value.addressDetail.roadnameCode = data.roadnameCode;
            formState.value.addressDetail.sido = data.sido;
            formState.value.addressDetail.sigungu = data.sigungu;
            formState.value.addressDetail.sigunguCode = data.sigunguCode;
            formState.value.addressDetail.zonecode = data.zonecode;
        }

        const createSale = () => {
          
            let dataNew = {
                input: {
                    ...formState.value
                }
            }
            creactSale(dataNew)
        }
        return {
            labelCol,
            wrapperCol,
            formState,
            layout,
            visible,
            confirm,
            afterPopupClose,
            validateMessages,
            onFinish,
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