<template>
  <div id="components-modal-demo-position">
    <a-modal
      :mask-closable="false"
      footer=""
      centered
      :visible="visible"
      title="사업자관리 "
      width="1200px"
      @cancel="setModalVisible()"
    >
      <a-spin :spinning="loading">
        <standard-form action="your-action" name="edit-page-320">
          <a-collapse v-model:activeKey="activeKey" accordion>
            <a-collapse-panel key="1" header="사업자정보">
              <a-row style="overflow-y: scroll">
                <a-col span="9">
                  <a-form-item label="상 호" class="clr">
                    <default-text-box
                      v-model:valueInput="formState.name"
                      :required="true"
                      nameInput="formState-name"
                      width="220px"
                    />
                  </a-form-item>
                  <a-form-item label="사업자등록번호" class="clr">
                    <biz-number-text-box
                      v-model:valueInput="formState.bizNumber"
                      disabled
                      :required="true"
                      nameInput="formState-bizNumber"
                      width="220px"
                    />
                  </a-form-item>
                  <a-form-item label="사업자유형" class="clr">
                    <radio-group
                      :arrayValue="arrRadioType"
                      :disabled="true"
                      v-model:valueRadioCheck="formState.bizType"
                      :layoutCustom="'horizontal'"
                    />
                  </a-form-item>
                  <a-form-item
                    :label="changeTypeCompany(formState.bizType)"
                    class="clr"
                  >
                    <id-number-text-box
                      v-model:valueInput="formState.residentId"
                      :disabled="true"
                      width="220"
                    />
                  </a-form-item>
                  <a-form-item label="주소" class="custom-flex clr">
                    <div style="display: flex; margin-bottom: 5px">
                      <default-text-box
                        width="70"
                        v-model:valueInput="formState.extendInfoDetailZipcode"
                        autocomplete="off"
                        :required="true"
                        :disabled="true"
                        nameInput="formState-extendInfoDetailZipcode"
                      >
                      </default-text-box>
                      <post-code-button @dataAddress="funcAddress" />
                    </div>
                    <div style="margin-bottom: 5px">
                      <default-text-box
                        v-model:valueInput="
                          formState.extendInfoDetailRoadAddress
                        "
                        autocomplete="off"
                        :required="true"
                        nameInput="formState-extendInfoDetailRoadAddress"
                        :disabled="true"
                        width="220"
                      >
                      </default-text-box>
                    </div>
                    <default-text-box
                      v-model:valueInput="
                        formState.extendInfoDetailAddressExtend
                      "
                      autocomplete="off"
                      width="220"
                    >
                    </default-text-box>
                  </a-form-item>
                  <a-form-item label="연락처" class="clr">
                    <default-text-box
                      v-model:valueInput="formState.extendInfoDetailPhone"
                      nameInput="formState-extendInfoDetailPhone"
                      :required="true"
                      placeholder="‘-’없이 숫자만 입력"
                      width="220"
                    >
                    </default-text-box>
                  </a-form-item>
                  <a-form-item label="팩 스" class="label-custom">
                    <default-text-box
                      v-model:valueInput="formState.extendInfoDetailFax"
                      autocomplete="off"
                      width="220"
                      placeholder="‘-’없이 숫자만 입력"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <imgUpload
                    :title="titleModal"
                    @update-img="getImgUrl"
                    style="margin-top: 10px"
                    :required="false"
                  />
                </a-col>
                <a-col :span="9">
                  <preview-image :dataImage="dataImg" @deleteImg="removeImg" :activePreview="true" />
                </a-col>
              </a-row>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="대표자정보">
              <a-form
                :label-col="labelCol"
                ref="formRef"
                name="custom-validation"
              >
                <a-form-item has-feedback label="대표자명" class="clr">
                  <default-text-box
                    v-model:valueInput="formState.extendInfoPresidentName"
                    style="width: 200px"
                    autocomplete="off"
                    :required="true"
                    nameInput="formState-extendInfoPresidentName"
                  >
                  </default-text-box>
                </a-form-item>
                <a-form-item has-feedback label="생년월일" class="clr">
                  <date-time-box teleport width="200px" :required="true" v-model:valueDate="formState.extendInfoPresidentBirthday"/>
                </a-form-item>
                <a-form-item has-feedback label="휴대폰번호" class="clr">
                  <tel-text-box
                    width="200px"
                    v-model:valueInput="
                      formState.extendInfoPresidentMobilePhone
                    "
                    placeholder="‘-’없이 숫자만 입력"
                    :required="true"
                    nameInput="formState-extendInfoPresidentMobilePhone"
                  />
                </a-form-item>
                <a-form-item has-feedback label="이메일" class="clr">
                  <mail-text-box
                    style="width: 400px"
                    v-model:valueInput="formState.extendInfoPresidentEmail"
                    :required="true"
                    nameInput="formState-extendInfoPresidentEmail"
                  />
                </a-form-item>
              </a-form>
            </a-collapse-panel>
            <a-collapse-panel key="3" header="메모" class="modal-note">
              <a-table
                :bordered="false"
                :data-source="formStateMomes"
                :pagination="false"
              >
                <template #bodyCell="{ text, index }">
                  <div>
                    <div class="title-note">
                      <div>
                        <a-tooltip :title="text.ownerName">{{ text.ownerName }} 수정</a-tooltip>
                        {{ formarDate(text.updatedAt) }} 게시
                        {{ formarDate(text.createdAt) }}
                      </div>
                      <div v-if="index == 0" class="mb-5">
                        <DxButton @click="handleAdd" :disabled="isNewMemo">
                          <PlusSquareOutlined style="font-size: 18px"/>
                        </DxButton>

                      </div>
                    </div>
                    <div>
                      <text-area-box
                        placeholder="전달사항입력"
                        allow-clear
                        v-model:valueInput="text.memo"
                      >
                      </text-area-box>
                    </div>
                    <a-space :size="8" class="mt-5">
                      <DxButton @click="handleAddMemo(text.memo, text.memoId)">
                        <SaveOutlined />
                      </DxButton>
                      <DxButton @click="handleDeleteMemo(text, index)">
                        <DeleteOutlined />
                      </DxButton>
                    </a-space>
                  </div>
                </template>
              </a-table>
            </a-collapse-panel>
          </a-collapse>
          <div class="custom-footer-modal">
            <button-basic
              text="취소"
              type="info"
              mode="contained"
              @onClick="setModalVisible"
              style="margin-right: 10px"
            />
            <button-basic
              text="저장하고 나가기"
              type="default"
              mode="contained"
              @onClick="updateCompany"
            />
          </div>
        </standard-form>
      </a-spin>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch } from "vue";
import DxDropDownBox from "devextreme-vue/drop-down-box";
import DxButton from "devextreme-vue/button";
import imgUpload from "@/components/UploadImage.vue";
import queries from "@/graphql/queries/BF/BF3/BF320/index";
import mutations from "@/graphql/mutations/BF/BF3/BF320/index";
import notification from "@/utils/notification";
import dayjs from "dayjs";
import {
  SaveOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons-vue";
import type { UploadProps } from "ant-design-vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import {
  dataformStatePopup,
  formStateMomesUtils,
  inputInCollapseUtils,
  arrRadioTypeUtils,
  arrayRadioWithdrawDayUtils,
} from "../utils";
import { isEqual } from "lodash";
import deletePopup from "@/utils/deletePopup";
export default defineComponent({
  props: {
    modalStatus: {
      default: false,
      type: Boolean,
    },
    modalStatusHistory: Boolean,
    idRowEdit: Number,
  },
  components: {
    DxDropDownBox,
    SaveOutlined,
    DeleteOutlined,
    PlusSquareOutlined,
    imgUpload,
    DxButton
  },
  setup(props, { emit }) {
    const inputInCollapse = [...inputInCollapseUtils];
    const arrRadioType = reactive([...arrRadioTypeUtils]);
    const arrayRadioWithdrawDay = reactive([...arrayRadioWithdrawDayUtils]);
    let visible = ref(false);
    const dataQuery = ref();
    const dataQueryMemos = ref();
    let trigger = ref<boolean>(false);
    const imageValue = ref("");
    const fileName = ref("");
    const previewTitle = ref("");
    const fileList = ref<UploadProps["fileList"]>([]);
    const activeKey = ref([1]);
    const formState = reactive({
      ...dataformStatePopup,
    });
    const isNewMemo = ref(false)
    let dataImg = ref();
    let objDataDefault = reactive({});
    const formStateMomes: any = ref([]);
    const labelCol = ref({ style: { width: "150px" } });
    const titleModal = "사업자등록증";
    const removeImg = () => {
      dataImg.value = "";
      formState.extendInfoDetailLicenseFileStorageId = "";
    };
    watch(
      () => props.modalStatus,
      (newValue, old) => {
        trigger.value = true;
        if (newValue) {
          visible.value = newValue;
          dataQuery.value = { id: props.idRowEdit };
          dataQueryMemos.value = { companyId: props.idRowEdit };
          refetchMemo();
          refetch();
        } else {
          formStateMomes.value = [{...formStateMomesUtils}];
          visible.value = newValue;
          trigger.value = false;
        }
      }
    );
    // get company
    const { result, loading, refetch } = useQuery(
      queries.getCompany,
      dataQuery,
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );
    // get list memo of company
    const { result: resultMemo, refetch: refetchMemo } = useQuery(
      queries.getCompanyManageMemos,
      dataQueryMemos,
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );
    watch(resultMemo, (value) => {
      if (value && value.getCompanyManageMemos.length > 0) {
        formStateMomes.value = value.getCompanyManageMemos;
      } else {
        formStateMomes.value =  [{...formStateMomesUtils}];
      }
    });
    // mutation create memo
    const {
      mutate: actionCreateMemo,
      onError: creactMemoErr,
      onDone: onCreatedMemo,
    } = useMutation(mutations.createCompanyManageMemo);
    onCreatedMemo((res) => {
      notification("success", "메모 추가 완료!");
      isNewMemo.value = false
      refetchMemo();
    });
    creactMemoErr((res) => {
      notification("error", res.message);
      refetchMemo();
    });
    // mutation update memo
    const {
      mutate: actionUpdateMemo,
      onDone: onUpdatedMemo,
      onError: updateMemoErr,
    } = useMutation(mutations.updateCompanyManageMemo);
    onUpdatedMemo(() => {
      notification("success", "메모 추가 완료!");
      isNewMemo.value = false
      refetchMemo();
      activeKey.value = [1]
    });
    updateMemoErr((e) => {
      //notification('error', e.message)
      refetchMemo();
    });
    // mutation delete memo
    const {
      mutate: actionDeleteMemo,
      onDone: onDeleteMemo,
      onError: deleteMemoErr,
    } = useMutation(mutations.deleteCompanyManageMemo);
    onDeleteMemo(() => {
      notification("success", "메모가 삭제되었습니다.");
      refetchMemo();
    });
    deleteMemoErr((e) => {
      //notification('error', e.message)
      refetchMemo();
    });
    const handleDeleteMemo = (text: any, index: number) => {
      if (text.active) {
        deletePopup({
          callback: () => {
            actionDeleteMemo({ companyId: formState.id, memoId: text.memoId });
            isNewMemo.value = false
          },
        });
      } else {
        formStateMomes.value.splice(index, 1);
        isNewMemo.value = false
      }
    };
    const handleAdd = () => {
      const newMemo: any = {...formStateMomesUtils}
      formStateMomes.value.push(newMemo);
      isNewMemo.value = true
    };
    const handleAddMemo = (note: any, mmId: any = null) => {
      if (note !== "" && mmId == null) {
        actionCreateMemo({ companyId: formState.id, memo: note });
      } else {
        actionUpdateMemo({ companyId: formState.id, memo: note, memoId: mmId });
      }
    };
    watch(result, (value) => {
      if (value && value.getCompany) {
        formState.id = value.getCompany.id;
        formState.residentId = value.getCompany.residentId;
        formState.code = value.getCompany.code;
        formState.name = value.getCompany.name;
        formState.bizNumber = value.getCompany.bizNumber;
        formState.bizType = value.getCompany.bizType;
        formState.address = value.getCompany.address;
        formState.phone = value.getCompany.phone;
        formState.presidentName = value.getCompany.presidentName;
        formState.presidentMobilePhone = value.getCompany.presidentMobilePhone;
        formState.extendInfoDetailName = value.getCompany.name;
        formState.extendInfoDetailZipcode =
          value.getCompany.extendInfo.detail.zipcode;
        formState.extendInfoDetailRoadAddress =
          value.getCompany.extendInfo.detail.roadAddress;
        formState.extendInfoDetailJibunAddress =
          value.getCompany.extendInfo.detail.jibunAddress;
        formState.extendInfoDetailAddressExtend =
          value.getCompany.extendInfo.detail.addressExtend;
        formState.extendInfoDetailAddressDetailBcode =
          value.getCompany.extendInfo.detail.addressDetail.bcode;
        formState.extendInfoDetailAddressDetailBname =
          value.getCompany.extendInfo.detail.addressDetail.bname;
        formState.extendInfoDetailAddressDetailBuildingCode =
          value.getCompany.extendInfo.detail.addressDetail.buildingCode;
        formState.extendInfoDetailAddressDetailBuildingName =
          value.getCompany.extendInfo.detail.addressDetail.buildingName;
        formState.extendInfoDetailAddressDetailRoadname =
          value.getCompany.extendInfo.detail.addressDetail.roadname;
        formState.extendInfoDetailAddressDetailRoadnameCode =
          value.getCompany.extendInfo.detail.addressDetail.roadnameCode;
        formState.extendInfoDetailAddressDetailSido =
          value.getCompany.extendInfo.detail.addressDetail.sido;
        formState.extendInfoDetailAddressDetailSigungu =
          value.getCompany.extendInfo.detail.addressDetail.sigungu;
        formState.extendInfoDetailAddressDetailSigunguCode =
          value.getCompany.extendInfo.detail.addressDetail.sigunguCode;
        formState.extendInfoDetailAddressDetailZonecode =
          value.getCompany.extendInfo.detail.addressDetail.zonecode;
        formState.extendInfoDetailPhone =
          value.getCompany.extendInfo.detail.phone;
        formState.extendInfoDetailFax = value.getCompany.extendInfo.detail.fax;
        formState.extendInfoDetailLicenseFileStorageId =
          value.getCompany.extendInfo.detail.licenseFileStorageId;
        dataImg.value = {
          name: value.getCompany.extendInfo.detail.license?.name,
          url: value.getCompany.extendInfo.detail.license?.url,
        };
        formState.extendInfoPresidentName =
          value.getCompany.extendInfo.president.name;
        formState.extendInfoPresidentBirthday =
          value.getCompany.extendInfo.president.birthday;
        formState.extendInfoPresidentMobilePhone =
          value.getCompany.extendInfo.president.mobilePhone;
        formState.extendInfoPresidentEmail =
          value.getCompany.extendInfo.president.email;
        // formState.extendInfoCmsBankBankType =
        //   value.getCompany.extendInfo.cmsBank.bankType;
        // formState.extendInfoCmsBankAccountNumber =
        //   value.getCompany.extendInfo.cmsBank.accountNumber;
        // formState.extendInfoCmsBankOwnerBizNumber =
        //   value.getCompany.extendInfo.cmsBank.ownerBizNumber || value.getCompany.extendInfo.cmsBank.ownerResidentId;
        // formState.extendInfoCmsBankOwnerName =
        //   value.getCompany.extendInfo.cmsBank.ownerName;
        // formState.extendInfoCmsBankWithdrawDay =
        //   value.getCompany.extendInfo.cmsBank.withdrawDay;
        formState.sealFileStorageId = value.getCompany.sealFileStorageId;
        formState.createdAt = value.getCompany.createdAt;
        formState.createdBy = value.getCompany.createdBy;
        formState.updatedAt = value.getCompany.updatedAt;
        formState.updatedBy = value.getCompany.updatedBy;
        formState.ip = value.getCompany.ip;
        formState.active = value.getCompany.active;
        formState.seal = value.getCompany.seal;
        formState.canceledAt = value.getCompany.canceledAt;
        formState.unpaidMonths = value.getCompany.unpaidMonths;
        objDataDefault = {
          ...formState,
        };
      }
    });
    const changeTypeCompany = (bizType: number) => {
      if (bizType == 2) {
        return "주민등록번호";
      } else {
        return "법인등록번호";
      }
    };
    const funcAddress = (data: any) => {
      formState.extendInfoDetailZipcode = data.zonecode;
      formState.extendInfoDetailRoadAddress = data.roadAddress;
      formState.extendInfoDetailJibunAddress = data.jibunAddress;
      formState.extendInfoDetailAddressDetailBcode = data.bcode;
      formState.extendInfoDetailAddressDetailBname = data.bname;
      formState.extendInfoDetailAddressDetailBuildingCode = data.buildingCode;
      formState.extendInfoDetailAddressDetailBuildingName = data.buildingName;
      formState.extendInfoDetailAddressDetailRoadname = data.roadname;
      formState.extendInfoDetailAddressDetailRoadnameCode = data.roadnameCode;
      formState.extendInfoDetailAddressDetailSido = data.sido;
      formState.extendInfoDetailAddressDetailSigungu = data.sigungu;
      formState.extendInfoDetailAddressDetailSigunguCode = data.sigunguCode;
      formState.extendInfoDetailAddressDetailZonecode = data.zonecode;
    };
    // Update Company
    const {
      mutate: actionUpdate,
      loading: loadingUpdate,
      onDone: updateDone,
    } = useMutation(mutations.updateCompany);
    const updateCompany = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        notification("error", "필수 항목 다 입력해주세요");
        res.brokenRules[0].validator.focus();
        inputInCollapse.map((value: any) => {
          if (
            value.input_name.indexOf(
              res.brokenRules[0].validator._validationInfo.result.name
            ) != -1
          )
            activeKey.value = value.key;
        });
      } else {
        let extendInfoDetail = {
          name: formState.name,
          zipcode: formState.extendInfoDetailZipcode,
          roadAddress: formState.extendInfoDetailRoadAddress,
          jibunAddress: formState.extendInfoDetailJibunAddress,
          addressExtend: formState.extendInfoDetailAddressExtend,
          addressDetail: {
            bcode: formState.extendInfoDetailAddressDetailBcode,
            bname: formState.extendInfoDetailAddressDetailBname,
            buildingCode: formState.extendInfoDetailAddressDetailBuildingCode,
            buildingName: formState.extendInfoDetailAddressDetailBuildingName,
            roadname: formState.extendInfoDetailAddressDetailRoadname,
            roadnameCode: formState.extendInfoDetailAddressDetailRoadnameCode,
            sido: formState.extendInfoDetailAddressDetailSido,
            sigungu: formState.extendInfoDetailAddressDetailSigungu,
            sigunguCode: formState.extendInfoDetailAddressDetailSigunguCode,
            zonecode: formState.extendInfoDetailAddressDetailZonecode,
          },
          phone: formState.extendInfoDetailPhone,
          fax: formState.extendInfoDetailFax,
          licenseFileStorageId: formState.extendInfoDetailLicenseFileStorageId,
        };
        let extendInfoPresident = {
          name: formState.extendInfoPresidentName,
          birthday: formState.extendInfoPresidentBirthday,
          mobilePhone: formState.extendInfoPresidentMobilePhone,
          email: formState.extendInfoPresidentEmail,
        };
        // let extendInfoCmsBank: any = {
        //   bankType: formState.extendInfoCmsBankBankType,
        //   accountNumber: formState.extendInfoCmsBankAccountNumber.toString(),
        //   ownerName: formState.extendInfoCmsBankOwnerName,
        //   withdrawDay: formState.extendInfoCmsBankWithdrawDay,
        // };
        // if(formState.extendInfoCmsBankOwnerBizNumber.length === 10) {
        //   extendInfoCmsBank.ownerBizNumber = formState.extendInfoCmsBankOwnerBizNumber
        // } else {
        //   extendInfoCmsBank.ownerResidentId = formState.extendInfoCmsBankOwnerBizNumber
        // }
        let variables = {
          id: formState.id,
          detail: extendInfoDetail,
          president: extendInfoPresident,
          // cmsBank: extendInfoCmsBank,
        };
        actionUpdate(variables);
      }
    };
    updateDone((res) => {
      notification("success", "업데이트 완료!");
      emit("closePopup", false);
      activeKey.value = [1]
    });
    const formarDate = (date: any) => {
      return dayjs(date).format("YYYY/MM/DD");
    };

    const isChangedForm = ref(false);
    // watch changed formState
    watch(
      formState,
      (value: any) => {
        if (!isEqual(value, objDataDefault)) {
          isChangedForm.value = true;
        } else {
          isChangedForm.value = false;
        }
      },
      { immediate: false }
    );
    const setModalVisible = () => {
      if (isChangedForm.value)
        comfirmClosePopup(() => {
          emit("closePopup", false)
          activeKey.value = [1]
        }, {
          okText: '네',
          cancelText: '취소',
        });
      else {
        emit("closePopup", false);
        activeKey.value = [1]
      }

    };
    const getImgUrl = (img: any) => {
      let resImg = {
        ...img,
        name: img.fileName,
      };
      dataImg.value = resImg;
      formState.extendInfoDetailLicenseFileStorageId = resImg.id;
    };
    const ruleCustomOwnerBizNumber = (e: any) => {
      return e.value?.length === 10 || e.value?.length === 13
    }
    return {
      arrayRadioWithdrawDay,
      fileList,
      loading,
      previewTitle,
      activeKey,
      formState,
      labelCol,
      titleModal,
      visible,
      formStateMomes,
      loadingUpdate,
      fileName,
      imageValue,
      dataImg,
      arrRadioType,
      removeImg,
      setModalVisible,
      changeTypeCompany,
      funcAddress,
      formarDate,
      handleAdd,
      handleDeleteMemo,
      handleAddMemo,
      updateCompany,
      getImgUrl,
      isNewMemo,
      ruleCustomOwnerBizNumber
    };
  },
});
</script>

<style lang="scss" scoped src="../style/popup/index.scss"></style>
