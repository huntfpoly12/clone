<template>
    <div ref="root">
        <a-modal :visible="modalStatus" title="영업자관리" centered @cancel="setModalVisible()"
            :mask-closable="false" :width="1028" :footer="null">
            <a-spin :spinning="loading">
                <standard-form ref="formAddBF340" id="formEditBF340">
                    <a-row :gutter="24">
                        <a-col :span="9" :md="13" :lg="10">
                          <div class="input-left">
                            <a-form-item label="영업자코드"  >
                                <default-text-box width="200px" :disabled="true" />
                            </a-form-item>
                            <a-form-item label="영업자명" class="red"  >
                              <div  :class="isDuplicate ? 'company-name':''" :style="{ width: '202px' }">
                                <default-text-box v-model:valueInput="formState.name" width="200px"
                                    placeholder="중복불가(2~20자)" :maxCharacter="20" :minCharacter="2" :required="true"/>
                                <div v-if="isDuplicate" class="message-error">
                                  <span>이미 이용중입니다.</span>
                                </div>
                              </div>
                            </a-form-item>
                            <a-form-item label="사업자유형" class="red"  >
                                <biz-type-select-box v-model:valueInput="formState.bizType" width="200px"
                                    :required="true" />
                            </a-form-item>
                            <a-form-item label="이메일" class="red"  >
                                <mail-text-box v-model:valueInput="formState.email" width="200px" :required="true" />
                            </a-form-item>
                            <a-form-item label="연락처" class="red"  >
                                <tel-text-box v-model:valueInput="formState.phone" width="200px" placeholder="전화번호를 입력"
                                    :required="true" />
                            </a-form-item>
                            <a-form-item label="팩스"  >
                                <text-number-box v-model:valueInput="formState.fax" width="200px" />
                            </a-form-item>
                          </div>
                        </a-col>
                        <a-col :span="15" :md="11" :lg="14">
                          <div class="input-right">
                            <a-form-item label="상태"  >
                                <sale-status-select-box v-model:valueInput="formState.status" width="100px"
                                    :disabled="true" />
                            </a-form-item>
                            <a-form-item label="등급" class="red"  >
                                <sale-grade-select-box v-model:valueInput="formState.grade" width="100px"
                                    :required="true" />
                            </a-form-item>
                            <a-form-item label="법인(주민)등록번호" :wrapper-col="{ span: 14 }" 
                                >
                                <id-number-text-box v-model:valueInput="formState.residentId" width="150px" :isResidentId="isResidentId"/>
                            </a-form-item>
                            <a-form-item label="사업자등록번호"  >
                                <biz-number-text-box v-model:valueInput="formState.bizNumber" width="150px" />
                            </a-form-item>
                            <a-form-item label="휴대폰" class="red"  >
                                <tel-text-box v-model:valueInput="formState.mobilePhone" placeholder="전화번호를 입력"
                                    :required="true" width="150px" />
                            </a-form-item>
                          </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="24">
                          <div class="input-left">
                            <a-form-item label="주소" class="post-code red">
                                <div style="display:flex">
                                    <default-text-box v-model:valueInput="formState.zipcode" width="200px"
                                         :required="true" :readOnly="true"/>
                                    <div style="margin-left: 5px">
                                        <post-code-button @dataAddress="funcAddress" />
                                    </div>
                                </div>
                            </a-form-item>
                          </div>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="15" :md="13" :lg="12">
                            <a-form-item class="result-address" :wrapper-col="{ span: 24 }" 
                                >
                                <default-text-box v-model:valueInput="formState.roadAddress" width="100%"
                                    :disabled="true" :required="true" placeholder="우편번호" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="8" :md="13" :lg="11">
                            <a-form-item :wrapper-col="{ span: 24 }" class="detail-address" 
                                >
                                <default-text-box v-model:valueInput="formState.addressExtend" placeholder="상세주소" :required="true"
                                    width="438px" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="10">
                          <div class="input-mid-left">
                            <a-form-item label="세금계산서발행여부">
                                <switch-basic v-model:valueSwitch="formState.taxInvoice" textCheck="발행"
                                    textUnCheck="미발행" style="width: 80px" />
                            </a-form-item>
                          </div>
                        </a-col>
                        <a-col :span="14">
                            <div style="margin-left: 20px;">
                                <a-row>
                                    <a-col :span="6" :md="6" :lg="6">
                                        <label class="lable-item"> 전자세금계산서<br>수신이메일 : </label>
                                    </a-col>
                                    <a-col :span="16" :md="16" :lg="16">
                                        <mail-text-box v-model:valueInput="formState.emailTaxInvoice" width="100%"
                                            :required="receiptOrNot" />
                                    </a-col>
                                </a-row>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="12" :md="13" :lg="10">
                          <div class="input-left">
                            <a-form-item label="은행"  >
                                <bank-select-box v-model:valueInput="formState.bankType" width="200px" />
                            </a-form-item>
                          </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="10">
                          <div class="input-left">
                            <a-form-item label="계좌번호"  >
                                <text-number-box v-model:valueInput="formState.accountNumber" width="200px" />
                            </a-form-item>
                            <a-form-item label="가입일자" class="red"  >
                                <div style="width: 150px">
                                    <date-time-box v-model:valueDate="formState.registerDate"  ref="registerDate"/>
                                </div>
                            </a-form-item>
                          </div>
                        </a-col>
                        <a-col :span="14">
                          <div class="input-right">
                            <a-form-item label="예금주"  >
                                <default-text-box v-model:valueInput="formState.accountOwner" width="367px" />
                            </a-form-item>
                            <a-form-item label="해지일자"  >
                                <div style="width: 150px">
                                    <date-time-box v-model:valueDate="formState.cancelDate" disabled="true"/>
                                </div>
                            </a-form-item>
                          </div>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24" :md="24" :lg="24">
                          <div class="input-left">
                            <a-form-item label="비고"
                                class="textarea_340">
                                <text-area-box v-model:valueInput="formState.remark" placeholder="500자 이내"
                                    width="835px" />
                            </a-form-item>
                          </div>
                        </a-col>
                    </a-row>
                    <a-row style="margin-top: 20px;">
                        <a-col :span="16" :offset="8">
                            <button-basic text="취소" :type="'default'" mode="outlined" @onClick="setModalVisible()"
                                :width="70" style="margin-right: 10px;" />
                            <button-basic text="저장하고 나가기" :type="'default'" mode="'contained'"
                                @onClick="createSale($event)" :width="150" />
                        </a-col>
                    </a-row>
                </standard-form>
            </a-spin>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, reactive, computed } from 'vue'
import { useMutation } from "@vue/apollo-composable";
import notification from '@/utils/notification';
import comfirmClosePopup from '@/utils/comfirmClosePopup';
import { initialFormState } from '../utils';
import mutations from "@/graphql/mutations/BF/BF3/BF340/index";
import { makeDataClean } from '@/helpers/commonFunction';
import { useStore } from 'vuex';
export default defineComponent({
    props: {
        modalStatus: Boolean,
    },
  setup(props, { emit }) {
        const store = useStore();
        const arrNameCompany = computed(() => store.getters['common/listNameCompanyBF340']);
        const formAddBF340 = ref()
        const registerDate = ref();
        const visible = ref<boolean>(false);
        const isDuplicate = ref<boolean>(false);
        const labelCol = { span: 6 };
        const wrapperCol = { span: 14 };
        let confirm = ref<string>("");
        const isResidentId = ref<boolean>(true);
        const formState = reactive<any>({ ...initialFormState });
        const receiptOrNot = ref<boolean>(false);
        // watch event modal popup
        watch(() => props.modalStatus, (newValue, old) => {
            if (newValue) {
                Object.assign(formState, initialFormState);
            }
        });
        watch(() => formState.bizType, (newVal) => {
            if (newVal == 1) {
                isResidentId.value = false;
            }
            else {
                isResidentId.value = true;
            }
        }, { deep: true });
        // create saler
        const { mutate: createSaleMutate, onDone: onDoneAdd, loading, onError } = useMutation(mutations.creactedSale);
        onDoneAdd((res) => {
            notification("success", `새러운 영업자 추가 완료!`);
            emit("closePopup", false);
            emit("createSuccess", true);
        });
        onError((error) => {
            notification("error", error.message);
        });
        const setModalVisible = () => {
            if (JSON.stringify(initialFormState) == JSON.stringify(formState)) {
                emit("closePopup", false);
            }
            else {
                comfirmClosePopup(() => emit("closePopup", false));
            }
        };
        const funcAddress = (data: any) => {
            formState.zipcode = data.zonecode;
            formState.roadAddress = data.roadAddress;
            formState.jibunAddress = data.jibunAddress;
            formState.addressDetail.bcode = data.bcode;
            formState.addressDetail.bname = data.bname;
            formState.addressDetail.buildingCode = data.buildingCode;
            formState.addressDetail.buildingName = data.buildingName ? data.buildingName : "";
            formState.addressDetail.roadname = data.roadname;
            formState.addressDetail.roadnameCode = data.roadnameCode;
            formState.addressDetail.sido = data.sido;
            formState.addressDetail.sigungu = data.sigungu;
            formState.addressDetail.sigunguCode = data.sigunguCode;
            formState.addressDetail.zonecode = data.zonecode;
        };
    const createSale = (e: any) => {
            if(isDuplicate.value) return
            if (!formState.registerDate) {
              registerDate.value.validate(true)
              return
            }
            var res = formAddBF340.value.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            }
            else if (formState.zipcode == "" || formState.roadAddress == "") {
                notification("error", "주소를 선택하지 않았습니다");
                return;
            }
            else {
                let dataNew = {
                    input: {
                        ...formState
                    }
                };
                dataNew = makeDataClean(dataNew, ["buildingName"]);
                createSaleMutate(dataNew);
            }
        };
        // if taxvoice = true then 전자세금계산서 수신이메일 require
        watch(() => formState.taxInvoice, (newValue) => {
            receiptOrNot.value = newValue;
        });
        
        watch(() => formState.name, (newValue) => {
          if (arrNameCompany.value.includes(newValue)) {
            isDuplicate.value = true
          } else {
            isDuplicate.value = false
          };
            
        });
        return {
            labelCol,
            formAddBF340,
            wrapperCol,
            formState,
            visible,
            confirm,
            receiptOrNot,
            loading,
            createSaleMutate,
            funcAddress,
            setModalVisible,
            createSale,
            isResidentId,
            registerDate,
            isDuplicate
        };
    }
})
</script>
<style scoped lang="scss" src="../style/addnewStyle.scss">
</style>
