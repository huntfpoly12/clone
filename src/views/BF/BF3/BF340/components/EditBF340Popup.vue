<template>
  <div ref="root">
    <a-modal
      :visible="modalStatus"
      title="영업자관리"
      centered
      @cancel="setModalVisible()"
      :mask-closable="false"
      :width="1028"
      :footer="null"
    >
      <standard-form ref="formEditBF340" id="formEditBF340">
        <a-row :gutter="24">
          <a-col :span="9" :md="13" :lg="10">
            <div class="input-left">
              <a-form-item label="영업자코드">
                <default-text-box
                  v-model:valueInput="code"
                  width="200px"
                  :disabled="true"
                />
              </a-form-item>
              <a-form-item label="영업자명" class="red">
                <div  :class="isDuplicate ? 'company-name':''" :style="{ width: '202px' }">
                    <default-text-box 
                    v-model:valueInput="formState.name" 
                    width="200px"
                    :disabled="!canChangeCompanyName || formState.name === '본사'"
                    placeholder="중복불가(2~20자)" 
                    :maxCharacter="20" 
                    :minCharacter="2" 
                    :required="true"
                    />
                    <div v-if="isDuplicate" class="message-error">
                        <span>이미 이용중입니다.</span>
                    </div>
                </div>
              </a-form-item>
              <a-form-item label="사업자유형" class="red">
                <biz-type-select-box
                  v-model:valueInput="formState.bizType"
                  width="200px"
                  :required="true"
                />
              </a-form-item>
              <a-form-item label="이메일" class="red">
                <mail-text-box
                  v-model:valueInput="formState.email"
                  width="200px"
                  :required="true"
                />
              </a-form-item>
              <a-form-item label="연락처" class="red">
                <tel-text-box
                  v-model:valueInput="formState.phone"
                  width="200px"
                  placeholder="전화번호를 입력"
                  :required="true"
                />
              </a-form-item>
              <a-form-item label="팩스">
                <text-number-box
                  v-model:valueInput="formState.fax"
                  width="200px"
                />
              </a-form-item>
            </div>
          </a-col>
          <a-col :span="15" :md="11" :lg="14">
            <div class="input-right">
              <a-form-item label="상태">
                <sale-status-select-box
                  v-model:valueInput="formState.status"
                  width="100px"
                  :confirmStatus="true"
                  :disabled="code == 'S0001'"
                />
              </a-form-item>
              <a-form-item label="등급" class="red">
                <sale-grade-select-box
                  v-model:valueInput="formState.grade"
                  width="100px"
                  :required="true"
                />
              </a-form-item>
              <a-form-item
                label="법인(주민)등록번호"
                :wrapper-col="{ span: 14 }"
              >
                <id-number-text-box
                  v-model:valueInput="formState.residentId"
                  width="150px"
                  :isResidentId="isResidentId"
                />
              </a-form-item>
              <a-form-item label="사업자등록번호">
                <biz-number-text-box
                  v-model:valueInput="formState.bizNumber"
                  width="150px"
                />
              </a-form-item>
              <a-form-item label="휴대폰" class="red">
                <tel-text-box
                  v-model:valueInput="formState.mobilePhone"
                  placeholder="전화번호를 입력"
                  :required="true"
                  width="150px"
                />
              </a-form-item>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <div class="input-left">
              <a-form-item label="주소" class="post-code">
                <div style="display: flex">
                  <default-text-box
                    v-model:valueInput="formState.zipcode"
                    width="200px"
                    :required="true"
                    :readOnly="true"
                  />
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
            <a-form-item class="result-address" :wrapper-col="{ span: 24 }">
              <default-text-box
                v-model:valueInput="formState.roadAddress"
                width="100%"
                :disabled="true"
                :required="true"
                placeholder="주소"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8" :md="13" :lg="11">
            <a-form-item :wrapper-col="{ span: 24 }" class="detail-address">
              <default-text-box
                v-model:valueInput="formState.addressExtend"
                placeholder="상세주소"
                width="438px"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10">
            <div class="input-mid-left">
              <a-form-item label="세금계산서발행여부">
                <a-switch
                  v-model:checked="formState.taxInvoice"
                  checked-children="발행"
                  un-checked-children="미발행"
                  style="width: 80px"
                />
              </a-form-item>
            </div>
          </a-col>
          <a-col :span="14">
            <div style="margin-left: 20px">
              <a-row>
                <a-col :span="6" :md="6" :lg="6">
                  <label class="lable-item">
                    전자세금계산서<br />수신이메일 :
                  </label>
                </a-col>
                <a-col :span="16" :md="16" :lg="16">
                  <mail-text-box
                    v-model:valueInput="formState.emailTaxInvoice"
                    width="100%"
                    :required="receiptOrNot"
                  />
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" :md="13" :lg="10">
            <div class="input-left">
              <a-form-item label="은행">
                <bank-select-box
                  v-model:valueInput="formState.bankType"
                  width="200px"
                />
              </a-form-item>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="10">
            <div class="input-left">
              <a-form-item label="계좌번호">
                <text-number-box
                  v-model:valueInput="formState.accountNumber"
                  width="200px"
                />
              </a-form-item>
              <a-form-item label="가입일자" class="red">
                <div style="width: 150px">
                  <date-time-box
                    v-model:valueDate="formState.registerDate"
                    ref="registerDate"
                  />
                </div>
              </a-form-item>
            </div>
          </a-col>
          <a-col :span="14">
            <div class="input-right">
              <a-form-item label="예금주">
                <default-text-box
                  v-model:valueInput="formState.accountOwner"
                  width="367px"
                />
              </a-form-item>
              <a-form-item label="해지일자">
                <div style="width: 150px">
                  <date-time-box
                    v-model:valueDate="formState.cancelDate"
                    :disabled="formState.status == 1 ? true : false"
                  />
                </div>
              </a-form-item>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :md="24" :lg="24">
            <div class="input-left">
              <a-form-item label="비고" class="textarea_340">
                <text-area-box
                  v-model:valueInput="formState.remark"
                  placeholder="500자 이내"
                  width="835px"
                />
              </a-form-item>
            </div>
          </a-col>
        </a-row>
        <a-row style="margin-top: 20px">
          <a-col :span="16" :offset="8">
            <button-basic
              text="취소"
              :type="'default'"
              mode="outlined"
              @onClick="setModalVisible()"
              :width="70"
              style="margin-right: 10px"
            />
            <button-basic
              text="저장하고 나가기"
              :type="'default'"
              mode="'contained'"
              @onClick="updateSale($event)"
              :width="150"
            />
          </a-col>
        </a-row>
      </standard-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import dayjs from "dayjs";
import notification from "@/utils/notification";
import { initialFormState } from "../utils";
import queries from "@/graphql/queries/BF/BF3/BF340/index";
import mutations from "@/graphql/mutations/BF/BF3/BF340/index";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import filters from "@/helpers/filters";
import { makeDataClean } from "@/helpers/commonFunction";
import { useStore } from "vuex";
export default defineComponent({
  props: ["modalStatus", "data", "idSaleEdit"],
  setup(props, { emit }) {
    const formEditBF340 = ref();
    const store = useStore();
    const arrNameCompany = computed(() => store.getters['common/listNameCompanyBF340']);
    const registerDate = ref();
    const code = ref();
    const id = ref();
    const dataQuery = ref({ id: props.idSaleEdit });
    let trigger = ref<boolean>(true);
    let triggerCheckPer = ref<boolean>(false);
    const isResidentId = ref<boolean>(true);
    const isDuplicate = ref<boolean>(false);
    const dataQueryCheckPer = ref({});
    let canChangeCompanyName = ref<boolean>(false);
    const visible = ref<boolean>(false);
    const receiptOrNot = ref<boolean>(false);
    let dataDefault = reactive({});
    const fistLoad = ref<boolean>(true);
    // watch event modal popup
    watch(
      () => props.modalStatus,
      (newValue) => {
        if (newValue) {
          visible.value = newValue;
        } else {
          visible.value = newValue;
        }
      }
    );
    let formState: any = reactive({ ...initialFormState });
    // query check if can be change name company
    const { result: resCheckPerEdit, refetch: refetchCheckPer } = useQuery(
      queries.isSalesRepresentativeChangableName,
      dataQueryCheckPer,
      () => ({
        enabled: triggerCheckPer.value,
        fetchPolicy: "no-cache",
      })
    );
    // watch result resCheckPerEdit
    watch(resCheckPerEdit, (value) => {
      if (value) {
        canChangeCompanyName.value = value.isSalesRepresentativeChangableName;
      }
    });
    // get  sale representative
    const { result, loading, refetch, onError } = useQuery(
      queries.getSalesRepresentative,
      dataQuery,
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );
    onError((error) => {
      //notification('error', error.message);
    });
    watch(result, (value) => {
      if (value && value.getSalesRepresentative) {
        code.value = value.getSalesRepresentative.code;
        id.value = value.getSalesRepresentative.id;
        formState.status = value.getSalesRepresentative.status;
        formState.name = value.getSalesRepresentative.name;
        formState.grade = value.getSalesRepresentative.grade;
        formState.bizType = value.getSalesRepresentative.detail.bizType;
        formState.bizType == 1
          ? (isResidentId.value = false)
          : (isResidentId.value = true);
        formState.bizNumber = value.getSalesRepresentative.detail.bizNumber;
        formState.residentId = value.getSalesRepresentative.detail.residentId;
        formState.email = value.getSalesRepresentative.detail.email;
        formState.mobilePhone = value.getSalesRepresentative.detail.mobilePhone;
        formState.phone = value.getSalesRepresentative.detail.phone;
        formState.fax = value.getSalesRepresentative.detail.fax;
        formState.zipcode = value.getSalesRepresentative.detail.zipcode;
        formState.roadAddress = value.getSalesRepresentative.detail.roadAddress;
        formState.jibunAddress =
          value.getSalesRepresentative.detail.jibunAddress;
        formState.addressExtend =
          value.getSalesRepresentative.detail.addressExtend;
        formState.addressDetail.bcode =
          value.getSalesRepresentative.detail.addressDetail.bcode;
        formState.addressDetail.bname =
          value.getSalesRepresentative.detail.addressDetail.bname;
        formState.addressDetail.buildingCode =
          value.getSalesRepresentative.detail.addressDetail.buildingCode;
        formState.addressDetail.buildingName =
          value.getSalesRepresentative.detail.addressDetail.buildingName;
        formState.addressDetail.roadname =
          value.getSalesRepresentative.detail.addressDetail.roadname;
        formState.addressDetail.roadnameCode =
          value.getSalesRepresentative.detail.addressDetail.roadnameCode;
        formState.addressDetail.sido =
          value.getSalesRepresentative.detail.addressDetail.sido;
        formState.addressDetail.sigungu =
          value.getSalesRepresentative.detail.addressDetail.sigungu;
        formState.addressDetail.sigunguCode =
          value.getSalesRepresentative.detail.addressDetail.sigunguCode;
        formState.addressDetail.zonecode =
          value.getSalesRepresentative.detail.addressDetail.zonecode;
        formState.taxInvoice = value.getSalesRepresentative.detail.taxInvoice;
        formState.emailTaxInvoice =
          value.getSalesRepresentative.detail.emailTaxInvoice;
        formState.bankType = value.getSalesRepresentative.detail.bankType;
        formState.accountNumber =
          value.getSalesRepresentative.detail.accountNumber;
        formState.accountOwner =
          value.getSalesRepresentative.detail.accountOwner;
        formState.registerDate =
          value.getSalesRepresentative.detail.registerDate;
        formState.cancelDate = value.getSalesRepresentative.detail.cancelDate;
        formState.remark = value.getSalesRepresentative.detail.remark;
        triggerCheckPer.value = true;
        dataQueryCheckPer.value = {
          id: value.getSalesRepresentative.id,
          name: value.getSalesRepresentative.name,
        };
        // trigger query check if can be change business registration number
        refetchCheckPer();
        dataDefault = JSON.stringify(formState);
        fistLoad.value = false;
        let newArrNameCompany = arrNameCompany.value.filter((name: string) => name !== formState.name)
        store.commit('common/setListNameCompanyBF340', newArrNameCompany)
      }
    });
    // update sale representative
    const {
      mutate: actionUpdate,
      onError: onUpdateError,
      loading: loadingUpdate,
      onDone: updateDone,
    } = useMutation(mutations.updateSalesRepresentative);
    onUpdateError((error) => {
      //notification('error', error.message);
    });
    updateDone(() => {
      notification("success", `업데이트가 완료되었습니다!`);
      emit("closePopup", false);
      emit("updateSuccess", true);
    });
    const updateSale = (e: any) => {
      if (!formState.registerDate) {
        registerDate.value.validate(true);
        return;
      }
      var res = formEditBF340.value.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        let variables = {
          id: id.value,
          input: formState,
        };
        variables = makeDataClean(variables, ["buildingName"]);
        actionUpdate(variables);
      }
    };
    const funcAddress = (data: any) => {
      formState.zipcode = data.zonecode;
      formState.roadAddress = data.roadAddress;
      formState.jibunAddress = data.jibunAddress;
      formState.addressDetail.bcode = data.bcode;
      formState.addressDetail.bname = data.bname;
      formState.addressDetail.buildingCode = data.buildingCode;
      formState.addressDetail.buildingName = data.buildingName
        ? data.buildingName
        : "";
      formState.addressDetail.roadname = data.roadname;
      formState.addressDetail.roadnameCode = data.roadnameCode;
      formState.addressDetail.sido = data.sido;
      formState.addressDetail.sigungu = data.sigungu;
      formState.addressDetail.sigunguCode = data.sigunguCode;
      formState.addressDetail.zonecode = data.zonecode;
    };
    const setModalVisible = () => {
      if (dataDefault == JSON.stringify(formState)) {
        emit("closePopup", false);
      } else {
        comfirmClosePopup(() => emit("closePopup", false));
      }
    };
    watch(
      () => formState.bizType,
      (newVal) => {
        if (newVal == 1) {
          isResidentId.value = false;
        } else {
          isResidentId.value = true;
        }
      },
      { deep: true }
    );
    // watch result resCheckPerEdit
    watch(
      () => formState.status,
      (value) => {
        if (!fistLoad.value) return;
        if (value == 1) {
          formState.cancelDate = null;
        } else {
          formState.cancelDate = filters.formatDateToInterger(
            dayjs().format("YYYYMMDD")
          );
        }
      }
    );
    // if taxvoice = true then 전자세금계산서 수신이메일 require
    watch(
      () => formState.taxInvoice,
      (newValue) => {
        receiptOrNot.value = newValue;
      }
    );

    watch(() => formState.name, (newValue) => { 
      if (arrNameCompany.value.includes(newValue)) {
        isDuplicate.value = true
      } else {
        isDuplicate.value = false
      };   
    });
    return {
      code,
      formEditBF340,
      formState,
      visible,
      receiptOrNot,
      loading,
      loadingUpdate,
      canChangeCompanyName,
      funcAddress,
      updateSale,
      setModalVisible,
      isResidentId,
      registerDate,
      isDuplicate
    };
  },
});
</script>
<style lang="scss" scoped src="../style/editStyle.scss"></style>
