<template>
  <div id="modal-detail-bf-310">
    <a-modal :mask-closable="false" :visible="modalStatus" title="계약정보관리&심사 " centered @cancel="setModalVisible()"
      width="1200px" :bodyStyle="{ height: '800px' }" footer="">
      <a-spin :spinning="loading || loadingUpdate">
        <standard-form class="ant-form ant-form-horizontal" name="edit-page-310">
          <div class="collapse-content">
            <a-collapse v-model:activeKey="activeKey"  :bordered="false" >
              <a-collapse-panel key="1" header="심사정보">
                <a-row>
                  <a-col :span="24" style="display: flex">
                    <a-form-item label="승인상태" label-align="left" :label-col="labelCol">
                      <subs-req-status-process-bar v-model:valueInput="formState.status" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24" style="display: flex">
                    <a-form-item label="신청" label-align="left" :label-col="labelCol">
                      <default-text-box :valueInput="isNumeric(formState.createdAt)
                        ? dayjs(formState.createdAt).format('YYYY-MM-DD')
                        : ''
                        " :disabled="true" width="200px" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24" style="display: flex">
                    <a-form-item label="심사중" label-align="left" :label-col="labelCol">
                      <default-text-box :valueInput="isNumeric(formState.processedAt)
                        ? dayjs(formState.processedAt).format('YYYY-MM-DD')
                        : ''
                        " :disabled="true" width="200px" />
                    </a-form-item>
                    <a-form-item label-align="left" style="padding-left: 10px">
                      <default-text-box v-model:valueInput="formState.processedBy" :disabled="true" width="200px" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24" style="display: flex">
                    <a-form-item label="반려" label-align="left" :label-col="labelCol">
                      <default-text-box :valueInput="isNumeric(formState.rejectedAt)
                        ? dayjs(formState.rejectedAt).format('YYYY-MM-DD')
                        : ''
                        " :disabled="true" width="200px" />
                    </a-form-item>
                    <a-form-item label-align="left" style="padding-left: 10px">
                      <default-text-box v-model:valueInput="formState.rejectedBy" :disabled="true" width="200px" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24" style="display: flex">
                    <a-form-item label="승인" label-align="left" :label-col="labelCol">
                      <default-text-box :valueInput="isNumeric(formState.approvedAt)
                        ? dayjs(formState.approvedAt).format('YYYY-MM-DD')
                        : ''
                        " :disabled="true" width="200px" />
                    </a-form-item>
                    <a-form-item label-align="left" style="padding-left: 10px">
                      <default-text-box v-model:valueInput="formState.approvedBy" :disabled="true" width="200px" />
                    </a-form-item>
                  </a-col>
                  <a-form-item label="상 호" label-align="left" :label-col="labelCol">
                    <default-text-box v-model:valueInput="formState.companyName" width="410px" :disabled="true" />
                  </a-form-item>
                  <a-col :span="24" style="display: flex">
                    <a-form-item label="신청코드" label-align="left" :label-col="labelCol">
                      <default-text-box v-model:valueInput="formState.code" :disabled="true" width="200px" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24">
                    <a-form-item label="심사메모" label-align="left" :label-col="labelCol">
                      <text-area-box v-model:valueInput="formState.memo" width="100%" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24">
                    <a-form-item label="약관동의" label-align="left" :label-col="labelCol">
                      <a-button @click="onOpenPopupInfo(1)" type="link" style="padding: 0px">
                        서비스약관 동의
                      </a-button>
                      |
                      <a-button @click="onOpenPopupInfo(2)" type="link" style="padding: 0px">개인정보제공 및 활용동의</a-button>
                      |
                      <a-button @click="onOpenPopupInfo(3)" type="link" style="padding: 0px">회계서비스약관 동의</a-button>
                      |
                      <a-button @click="onOpenPopupInfo(4)" type="link" style="padding: 0px">원천서비스약관 동의</a-button>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-collapse-panel>
              <a-collapse-panel key="2" header="사업자정보" class="key-2">
                <a-row :gutter="24" style="height: 350px; overflow-y: scroll">
                  <a-col :span="9">
                    <a-form-item label="상 호" class="clr" label-align="left" :label-col="{ span: 9 }">
                      <default-text-box v-model:valueInput="formState.content.company.name" width="220" :required="true"
                        messRequired="이항목은 필수 입력사항입니다!" nameInput="companyName" />
                    </a-form-item>
                    <a-form-item label="사업자등록번호" class="clr" label-align="left" :label-col="{ span: 9 }">
                      <biz-number-text-box :disabled="!canChangeableBizNumber"
                        v-model:valueInput="formState.content.company.bizNumber" width="220" :required="true"
                        messRequired="이항목은 필수 입력사항입니다!" nameInput="companyBizNumber" />
                    </a-form-item>
                    <a-form-item label="사업자유형" class="clr" label-align="left" :label-col="{ span: 9 }">
                      <radio-group :arrayValue="bizTypeItems" v-model:valueRadioCheck="formState.content.company.bizType
                        " layoutCustom="horizontal" />
                    </a-form-item>
                    <a-form-item :label="changeTypeCompany(formState.content.company.bizType)
                      " label-align="left" :label-col="{ span: 9 }">
                      <id-number-text-box :required="true" :isResidentId="isResidentId" v-model:valueInput="formState.content.company.residentId
                        " width="220" />
                    </a-form-item>
                    <a-form-item label="주소" class="clr" label-align="left" :label-col="{ span: 9 }">
                      <a-row :gutter="[0, 4]">
                        <a-col :span="24" style="display: flex">
                          <default-text-box v-model:valueInput="formState.content.company.zipcode
                            " width="70px" :disabled="true" />
                          <post-code-button @dataAddress="funcAddress" />
                        </a-col>
                        <a-col :span="24">
                          <default-text-box v-model:valueInput="formState.content.company.roadAddress
                            " width="220" :disabled="true" />
                        </a-col>
                        <a-col :span="24">
                          <default-text-box v-model:valueInput="formState.content.company.addressExtend
                            " width="220" placeholder="상세 주소 입력" />
                        </a-col>
                      </a-row>
                    </a-form-item>
                    <a-form-item label="연락처" class="clr" label-align="left" :label-col="{ span: 9 }">
                      <tel-text-box v-model:valueInput="formState.content.company.phone" :required="true"
                        messRequired="이항목은 필수 입력사항입니다!" nameInput="company-phone" width="220" />
                    </a-form-item>
                    <a-form-item label="팩 스" label-align="left" :label-col="{ span: 9 }">
                      <text-number-box v-model:valueInput="formState.content.company.fax" width="220" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <img-upload :title="titleModal" @update-img="getUrlLicenseFile" />
                  </a-col>
                  <a-col :span="9">
                    <preview-image :dataImage="{
                      url: imageLicenseFile,
                      name: licenseFileName,
                    }" @deleteImg="removeLicenseFile" :activePreview="true" />
                  </a-col>
                </a-row>
              </a-collapse-panel>
              <a-collapse-panel key="3" header="대표자정보">
                <a-form-item has-feedback label="대표자명" class="clr" label-align="left" :label-col="labelCol">
                  <default-text-box v-model:valueInput="formState.content.president.name" width="200px" :required="true"
                    messRequired="이항목은 필수 입력사항입니다!" nameInput="president-name" />
                </a-form-item>
                <a-form-item has-feedback label="생년월일" class="clr" label-align="left" :label-col="labelCol">
                  <date-time-box width="200px" v-model:valueDate="formState.content.president.birthday" :required="true" :clearable="false"></date-time-box>
                </a-form-item>
                <a-form-item has-feedback label="휴대폰번호" class="clr" label-align="left" :label-col="labelCol">
                  <text-number-box v-model:valueInput="formState.content.president.mobilePhone" :required="true"
                    width="200px" placeholder="‘-’ 없이 슷자입력" messRequired="이항목은 필수 입력사항입니다!"
                    nameInput="president-mobilePhone" />
                </a-form-item>
                <a-form-item has-feedback label="이메일" class="clr" :name="['user', 'email']" :rules="[{ type: 'email' }]"
                  label-align="left" :label-col="labelCol">
                  <mail-text-box v-model:valueInput="formState.content.president.email" width="350px" :required="true"
                    messRequired="이항목은 필수 입력사항입니다!" nameInput="president-email" />
                </a-form-item>
              </a-collapse-panel>
              <a-collapse-panel key="4" header="회계서비스신청" class="popup-scroll key-4">
                <div style="height: 350px; overflow-y: scroll">
                  <radio-group :arrayValue="arrayRadioCheckSourceServices" v-model:valueRadioCheck="checkedAccounting"
                    :layoutCustom="'horizontal'" />
                  <div>
                    <a-card title="⁙ 운영사업" :bordered="false" style="width: 100%"
                      :headStyle="{ padding: '5px', color: checkedAccounting == 1 ? 'red' : '' }"
                      bodyStyle="padding: 0px 0px">
                    </a-card>
                    <div id="data-grid-demo">
                      <DxDataGrid noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true"
                        :data-source="dataSource" :show-borders="true" :allow-column-reordering="move_column"
                        :allow-column-resizing="colomn_resize" :column-auto-width="true" :repaint-changes-only="true"
                        ref="gridRefName" :onRowClick="onSelectionClick" :focused-row-enabled="true" key-expr="rowIndex"
                        @init-new-row="onInitRow" :auto-navigate-to-focused-row="true"
                        v-model:focused-row-key="focusedRowKey" @focused-row-changed="onFocusedRowChanged"
                        id="bf-320-popup-datagrid">
                        <DxScrolling mode="standard" show-scrollbar="always" />
                        <DxPaging :enabled="false" />
                        <DxColumn data-field="No" :allow-editing="false" :width="50" caption="#"
                          cell-template="indexCell" />
                        <template #indexCell="{ data }">
                          <div>{{ data.rowIndex + 1 }}</div>
                        </template>
                        <DxColumn data-field="name" caption="사업명 (중복불가)" />
                        <DxColumn data-field="facilityBizType" caption="사업분류">
                          <DxLookup :data-source="facilityBizTypeCommon" value-expr="v" display-expr="n" />
                        </DxColumn>
                        <DxColumn cell-template="startYearMonth" caption="서비스시작년월" data-type="date" />
                        <template #startYearMonth="{ data }">
                          {{
                            data.data.startYearMonth
                            ? dayjs(
                              data.data.startYearMonth.toString()
                            ).format("YYYY-MM")
                            : ""
                          }}
                        </template>
                        <DxColumn :width="100" data-field="capacity" caption="정원수 (명)" cell-template="capacity" />
                        <template #capacity="{ data }">
                          <div v-if="data.data.capacity > 0">{{ data.data.capacity }}</div>
                        </template>
                        <DxEditing :use-icons="true" :allow-adding="true" :confirmDelete="false"
                          template="button-template" mode="cell" new-row-position="pageBottom">
                        </DxEditing>
                        <DxToolbar>
                          <DxItem location="after" template="button-template" css-class="cell-button-add" />
                        </DxToolbar>
                        <template #button-template>
                          <button-basic icon="plus" @onClick="addRow" text="추가" :disabled="checkedAccounting == 2" />
                        </template>
                        <DxColumn cell-template="action" width="48" />
                        <template #action="{ data }: any">
                          <DxButton type="ghost" style="cursor: pointer" @click="onDelete(data)">
                            <a-tooltip zIndex="9999999" placement="top" color="black">
                              <template #title>
                                <div>삭제</div>
                              </template>
                              <DeleteOutlined style="font-size: 16px" />
                            </a-tooltip>
                          </DxButton>
                        </template>
                      </DxDataGrid>
                      <a-row :gutter=" 24 " class="custom-label-master-detail" v-if="
                        dataActiveRow &&
                          checkedAccounting == 1 &&
                          dataSource.length
                      " :key=" dataActiveRow?.rowIndex ?? 99 ">
                        <a-col :span=" 9 ">
                          <a-form-item label="사업분류" :label-col=" labelCol ">
                            <select-box-common :arrSelect=" facilityBizTypeCommon " :required=" true "
                              v-model:valueInput=" dataActiveRow.facilityBizType " displayeExpr="n" valueExpr="v"
                              width="160px" />
                          </a-form-item>
                          <a-form-item label="사업명 (중복불가)" :label-col=" labelCol ">
                            <default-text-box v-model:valueInput=" dataActiveRow.name " :required=" true "
                              width="160px" />
                          </a-form-item>
                          <a-form-item label="서비스 시작년월" :label-col=" labelCol ">
                            <month-picker-box :required=" true " v-model:valueDate=" dataActiveRow.startYearMonth "
                              width="160px" :teleport=" true " />
                          </a-form-item>
                          <a-form-item label="정원수 (명)" style="display: inline-flex" :label-col=" labelCol ">
                            <number-box width="160px" :required=" true " :min=" 1 " :spinButtons=" true "
                              v-model:valueInput=" dataActiveRow.capacity " />
                          </a-form-item>
                          <a-form-item label="장기요양기관등록번호" :label-col=" labelCol ">
                            <default-text-box width="160px" :required=" true " v-model:valueInput="
                              dataActiveRow.longTermCareInstitutionNumber
                            " />
                          </a-form-item>
                        </a-col>
                        <a-col :span=" 6 " class="pl-12 text-color">
                          <img-upload :title=" '장기요양기관등록증' " @update-img=" getregCardFile " />
                        </a-col>
                        <a-col :span=" 9 ">
                          <div class="preview-img">
                            <preview-image :dataImage=" dataActiveRow.registrationCard " @deleteImg=" removeRegCardFile "
                              :activePreview=" true " />
                          </div>
                        </a-col>
                      </a-row>
                    </div>
                    <div v-if=" checkedAccounting == 1 ">
                      <a-row>
                        <a-col :span=" 3 ">
                          <p>부가서비스</p>
                        </a-col>
                        <a-col :span=" 12 ">
                          <checkbox-basic v-model:valueCheckbox=" accountingServiceTypes " :disabled=" false " size="15"
                            label="회계입력대행서비스" />
                        </a-col>
                      </a-row>
                    </div>
                  </div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel key="5" header="원천서비스신청">
                <div>
                  <radio-group :arrayValue=" arrayRadioCheckSourceServices "
                    v-model:valueRadioCheck=" checkedSourceService " :layoutCustom=" 'horizontal' " />
                  <div style="margin-top: 20px">
                    <a-form-item label="서비스 시작년월" :class=" { 'clr': checkedSourceService == 1 } " label-align="left"
                      :label-col=" labelCol ">
                      <div style="width: 200px">
                        <month-picker-box :required=" true " width="120px" :disabled=" checkedSourceService == 2 "
                          v-model:valueDate="
                            formState.content.withholding.startYearMonth
                          " :teleport=" true " />
                      </div>
                    </a-form-item>
                    <a-form-item label="직 원 수" :class=" { 'clr': checkedSourceService == 1 } " label-align="left"
                      :label-col=" labelCol ">
                      <number-box :required=" true " width="120px" :min=" 1 " :spinButtons=" true "
                        v-model:valueInput=" formState.content.withholding.capacity "
                        :disabled=" checkedSourceService == 2 " messRequired="이항목은 필수 입력사항입니다!"
                        nameInput="withholding-capacity" />
                    </a-form-item>
                    <a-form-item label="부가서비스" label-align="left" :label-col=" labelCol ">
                      <checkbox-basic label="4대보험신고서비스" v-model:valueCheckbox=" withholdingServiceTypes "
                        :disabled=" checkedSourceService == 2 " :size=" '16' " />
                    </a-form-item>
                  </div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel key="6" header="CMS (자동이체출금) 계좌 정보 입력" >
                <a-form-item label="출금은행" class="clr" label-align="left" :label-col=" labelCol ">
                  <bank-select-box v-model:valueInput=" formState.content.cmsBank.bankType " width="150px" />
                </a-form-item>
                <a-form-item label="출금계좌번호" class="clr" label-align="left" :label-col=" labelCol ">
                  <text-number-box width="250px" :required=" true "
                    v-model:valueInput=" formState.content.cmsBank.accountNumber " nameInput="cmsBank-accountNumber" />
                </a-form-item>
                <a-form-item label="예금주명" class="clr" label-align="left" :label-col=" labelCol ">
                  <default-text-box width="250px" :required=" true "
                    v-model:valueInput=" formState.content.cmsBank.ownerName " nameInput="cmsBank-ownerName" />
                </a-form-item>
                <a-form-item label="사업자(주민)등록번호:" class="d-flex align-items-start clr" label-align="left"
                  :label-col=" labelCol ">
                  <text-number-box width="250px" :required=" true "
                    v-model:valueInput=" formState.content.cmsBank.ownerBizNumber " nameInput="cmsBank-accountNumber" :ruleCustom="() => checkBizNumberLen"
                      :messageRuleCustom="lenFixedMsg" :maxLength="13" />
                  <!-- <biz-number-text-box width="250px" v-model:valueInput="
                  " :required=" true " nameInput="cmsBank-ownerBizNumber" /> -->
                  <div class="noteImage">
                    <info-tool-tip>
                      예금주의 사업자등록번호 또는 주민등록번호입니다.
                    </info-tool-tip>
                  </div>
                </a-form-item>
                <a-form-item label="자동이체출금일자" class="clr" label-align="left" :label-col=" labelCol ">
                  <radio-group :arrayValue=" arrayRadioWithdrawDay " v-model:valueRadioCheck="
                    formState.content.cmsBank.withdrawDay
                  " />
                </a-form-item>
              </a-collapse-panel>
              <a-collapse-panel key="7" header="기타" forceRender>
                <a-form-item label="영업관리담당" label-align="left" :label-col=" labelCol ">
                  <list-sales-dropdown v-model:valueInput="
                    formState.content.extra.salesRepresentativeId
                  " width="200px" />
                </a-form-item>
                <a-form-item label="전달사항" label-align="left" :label-col=" labelCol ">
                  <text-area-box v-model:valueInput=" formState.content.extra.comment " :width=" 750 " :height=" 70 "
                    placeholder="전달사항입력" />
                </a-form-item>
              </a-collapse-panel>
            </a-collapse>
          </div>
          <a-row style="margin-top: 20px">
            <a-col :span=" 24 " :offset=" 8 ">
              <button-basic text="그냥 나가기" type="default" mode="outlined" @onClick="setModalVisible()" :width=" 120 "
                style="margin-right: 10px" />
              <button-basic text="저장하고 나가기" type="default" mode="contained" @onClick="updateSubscriptionRequest($event)"
                :width=" 150 " />
            </a-col>
          </a-row>
        </standard-form>
      </a-spin>
      <PopupInfo :statusPupopInfo=" statusPupopInfo " @closePopup="statusPupopInfo = false" :keyText=" keyInfo " />
    </a-modal>
    <a-modal :visible=" deleteModal " @cancel="deleteModal = false" :mask-closable=" false " class="confirm-md" footer=""
      :width=" 500 ">
      <standard-form action="" name="delete-510">
        <div class="custom-modal-delete">
          <img src="@/assets/images/icon_delete.png" alt="" style="width: 30px" />
          <span>{{ contentDelete }}</span>
        </div>
        <div class="text-align-center mt-30">
          <button-basic class="button-form-modal" :text=" '아니요' " :type=" 'default' " :mode=" 'outlined' "
            @onClick="deleteModal = false" />
          <button-basic class="button-form-modal" :text=" '네. 삭제합니다' " :width=" 140 " :type=" 'default' "
            :mode=" 'contained' " @onClick=" onDelConfirm " />
        </div>
      </standard-form>
    </a-modal>
    <PopupMessage
      :modalStatus="isStatusApproved"
      @closePopup="isStatusApproved = false"
      :typeModal="'confirm'"
      :title="''"
      :content=" `승인된 사업자등록번호(${formState.content.company.bizNumber})는 수정불가합니다. 그래도 승인하시겠습니까?`"
      :okText="'승인'"
      cancelText="아니오"
      @checkConfirm="onRowChangeComfirm"
    />
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { useStore } from "vuex";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxEditing,
  DxLookup,
  DxToolbar,
  DxItem,
  DxTexts,
  DxScrolling,
} from "devextreme-vue/data-grid";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { FacilityBizType } from "@bankda/jangbuda-common";
import { bizTypeItems, inputInCollapse } from "../utils";
import {
  initialFormState,
  initialDataStatus,
  initialArrayRadioWithdrawDay,
  arrayUtilRadioCheckSourceServices,
} from "../utils/index";
import queries from "@/graphql/queries/BF/BF3/BF310/index";
import mutations from "@/graphql/mutations/BF/BF3/BF310/index";
import imgUpload from "@/components/UploadImage.vue";
import notification from "@/utils/notification";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import dayjs from "dayjs";
import PopupInfo from "./PopupInfo.vue";
import { DxButton } from "devextreme-vue/button";
import { Message } from "@/configs/enum";
import { DeleteOutlined, PlusSquareOutlined, SaveOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  props: {
    modalStatus: {
      default: false,
      type: Boolean,
    },
    data: {
      type: Number,
      required: true,
    },
  },
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    imgUpload,
    DxEditing,
    DxLookup,
    DxToolbar,
    DxItem,
    DxTexts,
    DxButton,
    DxScrolling,
    PopupInfo,
    DeleteOutlined
  },
  setup(props, { emit }) {
    // config grid
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const labelCol = { style: { width: "150px" } };
    const facilityBizType = FacilityBizType.all();
    const facilityBizTypeCommon = FacilityBizType.all();
    const imageLicenseFile = ref("");
    const licenseFileName = ref("");
    let visible = ref(false);
    let activeKey = ref(1);
    const dataQuery = ref();
    const dataQueryCheckPer = ref({});
    let trigger = ref<boolean>(false);
    let triggerCheckPer = ref<boolean>(false);
    let canChangeableBizNumber = ref<boolean>(false);
    const checkedAccounting = ref(1);
    const checkedSourceService = ref(1);
    const selectedItemKeys = reactive([]);
    const titleModal = ref("장기요양기관등록증");
    var dataStatus = initialDataStatus;
    let objDataDefault = ref({ ...initialFormState });
    const arrayRadioWithdrawDay = reactive([...initialArrayRadioWithdrawDay]);
    var formState: any = ref({ ...initialFormState });
    const dataSource: any = ref([]);
    const dataSourceOld: any = ref([]);
    const isResidentId = ref(false);
    const statusPupopInfo = ref<boolean>(false);
    const keyInfo = ref<number>(0);
    const arrayRadioCheckSourceServices = ref([
      ...arrayUtilRadioCheckSourceServices,
    ]);
    const accountingServiceTypes = ref(false);
    const withholdingServiceTypes = ref(false);
    const isWatching = ref(false);
    const deleteModal = ref(false);
    const rowIndexDelete = ref(0);
    const contentDelete = Message.getCommonMessage("401").message;
    // event close popup
    const setModalVisible = () => {
      if (
        JSON.stringify(objDataDefault.value.content) !=
        JSON.stringify(formState.value.content) ||
        JSON.stringify(dataSource.value) != JSON.stringify(dataSourceOld.value)
      )
        comfirmClosePopup(() => emit("closePopup", false));
      else emit("closePopup", false);
    };
    // watch event modal popup
    watch(
      () => props.modalStatus,
      (newValue, old) => {
        if (newValue) {
          isWatching.value = false;
          trigger.value = true;
          visible.value = newValue;
          dataQuery.value = { id: props.data };
          Object.assign(formState, initialFormState);
        } else {
          Object.assign(formState, initialFormState);
          imageLicenseFile.value = "";
          licenseFileName.value = "";
          visible.value = newValue;
        }
      }
    );
    const { result, loading, error, refetch } = useQuery(
      queries.getSubscriptionRequest,
      dataQuery,
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );
    // query check if can be change business registration number
    const { result: resCheckPerEdit, refetch: refetchCheckPer } = useQuery(
      queries.isSubscriptionRequestChangeableBizNumber,
      dataQueryCheckPer,
      () => ({
        enabled: triggerCheckPer.value,
        fetchPolicy: "no-cache",
      })
    );
    // watch result resCheckPerEdit
    watch(resCheckPerEdit, (value) => {
      triggerCheckPer.value = false;
      canChangeableBizNumber.value =
        value.isSubscriptionRequestChangeableBizNumber;
    });
    watch(result, (value) => {
      if (value && value.getSubscriptionRequest) {
        let data = value.getSubscriptionRequest;
        // set value license
        if (data.content.company.license) {
          imageLicenseFile.value = data.content.company
            .license.url
            ? data.content.company.license.url
            : "";
          licenseFileName.value =
            data.content.company.license.name;
        }
        delete data.content.company.license;
        formState.value = data;
        formState.value.institutionNumber =
          data.content.accounting?.facilityBusinesses
            .length > 0
            ? data.content.accounting
              .facilityBusinesses[0].longTermCareInstitutionNumber
            : "";
        // set date list status value
        dataStatus[0].date = data.createdAt;
        dataStatus[1].date = data.createdAt;
        dataStatus[2].date = data.approvedAt
          ? data.approvedAt
          : data.createdAt;
        dataStatus[3].date = data.approvedAt
          ? data.rejectedAt
          : data.createdAt;
        // set status subcription
        dataQueryCheckPer.value = {
          id: data.id,
          bizNumber: data.companyBizNumber,
        };
        //set accounting
        dataSource.value =
          formState.value.content.accounting?.facilityBusinesses.map(
            (item: any, key: any) => {
              return {
                ...item,
                rowIndex: key,
              };
            }
          ) || [];
        // Setting the first row of the dataSource as the active row.
        if (dataSource.value.length) {
          dataActiveRow.value = dataSource.value[0];
          focusedRowKey.value = 0;
        }
        accountingServiceTypes.value = data.content?.accounting?.accountingServiceTypes.length > 0;

        if (data.usedAccounting) {
          checkedAccounting.value = 1;
        } else {
          checkedAccounting.value = 2;
        }
        //set withholding
        withholdingServiceTypes.value = data.content?.withholding?.withholdingServiceTypes.length > 0;
        if (data.usedWithholding) {
          checkedSourceService.value = 1;
        } else {
          checkedSourceService.value = 2;
          formState.value.content.withholding = {
            startYearMonth: NaN,
            capacity: NaN,
            withholdingServiceTypes: [],
          };
        }
        triggerCheckPer.value = true;
        dataSourceOld.value = JSON.parse(JSON.stringify(dataSource.value));
        objDataDefault.value = JSON.parse(JSON.stringify(formState.value));
      }
      setTimeout(() => {
        isWatching.value = true;
      }, 0);
      trigger.value = false;
    });
    watch(
      () => checkedAccounting.value,
      (value) => {
        if (isWatching.value) {
          if (value == 1) {
            if (dataSource.value.length) {
              dataActiveRow.value = dataSource.value[0];
              focusedRowKey.value = 0;
              accountingServiceTypes.value = true;
            }
            addRow();
          }
          if (value == 2) {
            dataSource.value = [];
            dataActiveRow.value = null;
            focusedRowKey.value = 0;
            formState.value.content.accounting = {};
            accountingServiceTypes.value = false;
          }
          if (value === checkedSourceService.value && checkedSourceService.value === 2) {
            notification("error", Message.getMessage('BF310', '001').message);
            activeKey.value = 4;
          }
        } else {
          objDataDefault.value = JSON.parse(JSON.stringify(formState.value));
        }
      }
    );
    watch(
      () => checkedSourceService.value,
      (value) => {
        if (isWatching.value) {
          if (value === 2) {
            formState.value.content.withholding = {
              startYearMonth: NaN,
              capacity: NaN,
            };
            withholdingServiceTypes.value = false;
          }
          if (value === 1) {
            formState.value.content.withholding = {
              startYearMonth: +dayjs().format("YYYYMM"),
              capacity: NaN,
            };
            withholdingServiceTypes.value = true;
          }
          if (checkedAccounting.value === value && value === 2) {
            notification("error", Message.getMessage('BF310', '001').message);
            activeKey.value = 4;
          }
        } else {
          objDataDefault.value = JSON.parse(JSON.stringify(formState.value));
        }
      }
    );
    // A function that returns a string based on the value of bizType.
    const changeTypeCompany = (bizType: number) => {
      if (bizType == 2) {
        isResidentId.value = true;
        return "주민등록번호";
      } else {
        isResidentId.value = false;
        return "법인등록번호";
      }
    };
    // A function that is being called by the Daum Postcode API.
    const funcAddress = (data: any) => {
      formState.value.content.company.zipcode = data.zonecode;
      formState.value.content.company.roadAddress = data.roadAddress;
      formState.value.content.company.jibunAddress = data.jibunAddress;
      formState.value.content.company.addressDetail.bcode = data.bcode;
      formState.value.content.company.addressDetail.bname = data.bname;
      formState.value.content.company.addressDetail.buildingCode =
        data.buildingCode;
      formState.value.content.company.addressDetail.buildingName =
        data.buildingName;
      formState.value.content.company.addressDetail.roadname = data.roadname;
      formState.value.content.company.addressDetail.roadnameCode =
        data.roadnameCode;
      formState.value.content.company.addressDetail.sido = data.sido;
      formState.value.content.company.addressDetail.sigungu = data.sigungu;
      formState.value.content.company.addressDetail.sigunguCode =
        data.sigunguCode;
      formState.value.content.company.addressDetail.zonecode = data.zonecode;
    };
    // update subscription request
    const {
      mutate: actionUpdate,
      onError,
      loading: loadingUpdate,
      onDone: updateDone,
    } = useMutation(mutations.updateSubscriptionRequest);
    // query create company by subscription
    const { mutate: actionCreateCompany } = useMutation(
      mutations.createCompanyBySubscriptionRequest
    );
    updateDone((res) => {
      if (res.data.updateSubscriptionRequest.status == 30) {
        actionCreateCompany({ id: res.data.updateSubscriptionRequest.id });
      }
      notification("success", Message.getCommonMessage("106").message);
      emit("closePopup", false);
      emit("onUpdate", true);
    });
    onError((error) => {
      //notification('error', error.message)
    });
    // A function that is called when a button is clicked.
    const isStatusApproved = ref(false);
    const onRowChangeComfirm = (e:any) => {
      if(e){
        onSave();
      }
      isStatusApproved.value = false;
    }
    const onSave = () => {
      // process data befor handle update
      let contentData: any = { ...formState.value.content };
      const deleteField = (obj: any): any => {
        if (obj === null || obj === undefined) {
          return obj;
        }

        if (Array.isArray(obj)) {
          return obj.map((item) => deleteField(item));
        }

        if (typeof obj === "object") {
          const newObj: any = {};
          Object.keys(obj).forEach((key) => {
            if (key !== "__typename") {
              newObj[key] = deleteField(obj[key]);
            }
          });
          return newObj;
        }

        return obj;
      };
      const newContent = deleteField(contentData);
      if (checkedAccounting.value === 2) {
        newContent.accounting = null;
      } else {
        newContent.accounting = {};
        let newObj = JSON.parse(JSON.stringify(dataSource.value));
        newObj.map((item: any) => {
          delete item.rowIndex;
          delete item.dataImg;
          delete item.__typename;
          delete item.registrationCard;
          if (item?.registrationCardFileStorageId?.length < 1) {
            delete item.registrationCardFileStorageId;
          }
          item.startYearMonth.toString();
          return { item };
        });
        newContent.accounting.facilityBusinesses = [...newObj];
        newContent.accounting.accountingServiceTypes = accountingServiceTypes.value ? [1] : [];
      }
      if (checkedSourceService.value === 2) {
        newContent.withholding = null;
      } else {
        newContent.withholding.withholdingServiceTypes = withholdingServiceTypes.value ? [1] : [];
      }
      let variables = {
        id: formState.value.id,
        status: formState.value.status,
        memo: formState.value.memo,
        content: newContent,
      };
      actionUpdate(variables);
    }
    const updateSubscriptionRequest = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid || res?.brokenRules.length > 0) {
        let nameInputError = res.brokenRules[0].validator._validationInfo.result.name;
        res.brokenRules[0].validator.focus();
        let keyCollapse = 0;
        inputInCollapse.forEach((value: any) => {
          if (value.input_name.filter((item: any) => item == nameInputError).length > 0) {
            keyCollapse = value.key;
            return;
          }
        });
        if (keyCollapse > 0) {
          activeKey.value = keyCollapse;
        } else {
          activeKey.value = 4;
        }
        return;
      }
      if ((checkedAccounting.value === checkedSourceService.value && checkedSourceService.value === 2)) {
        notification("error", Message.getMessage('BF310', '001').message);
        activeKey.value = 4;
        return;
      }
      if ((checkedAccounting.value === 1 && dataSource.value.length === 0)) {
        notification("error", Message.getMessage('COMMON', '102').message);
        activeKey.value = 4;
        return;
      }
      if(formState.value.status == 30){
        isStatusApproved.value = true;
        return;
      }
      onSave();
    };
    // handle License File upload
    const getUrlLicenseFile = (img: any) => {
      formState.value.content.company.licenseFileStorageId = img.id;
      imageLicenseFile.value = img.url ? img.url : "";
      licenseFileName.value = img.fileName;
    };
    const removeLicenseFile = () => {
      dataActiveRow.value.dataImg = "";
      imageLicenseFile.value = "";
      licenseFileName.value = "";
    };
    // handle registration CardFile Storage upload
    const getregCardFile = (img: any) => {
      dataActiveRow.value.registrationCardFileStorageId = img.id;
      dataActiveRow.value.registrationCard = img;
    };
    const removeRegCardFile = (name: any) => {
      dataActiveRow.value.registrationCardFileStorageId = "";
      dataActiveRow.value.registrationCard = "";
    };
    const contentReady = (e: any) => {
      if (!e.component.getSelectedRowKeys().length) {
        e.component.selectRowsByIndexes(0);
      }
    };
    const selectionChanged = (e: any) => {
      e.component.collapseAll(0);
      e.component.expandRow(e.currentSelectedRowKeys[0]);
    };
    const isNumeric = (value: any) => {
      return /^-?\d+$/.test(value);
    };
    // change form
    const gridRefName: any = ref("grid");
    const dataActiveRow: any = ref(dataSource.value[0]);
    const focusedRowKey = ref(0);
    const initRow = { rowIndex: null, capacity: NaN, startYearMonth: +dayjs().format('YYYYMM') };
    // A function that is called when a row is clicked.
    const onSelectionClick = (value: any) => {
      dataActiveRow.value = value.data;
      licenseFileName.value = value.data.registrationCard?.name ?? "";
      imageLicenseFile.value = value.data.registrationCard?.url ?? "";
    };
    // Adding a new row to the grid.
    const addRow = async () => {
      await gridRefName.value.instance.addRow();
      gridRefName.value.instance.closeEditCell();
      setTimeout(() => {
        if (gridRefName.value.instance.totalCount() == 1) {
          let a = document.body.querySelectorAll("[aria-rowindex]");
          (
            a[gridRefName.value.instance.totalCount() - 1] as HTMLInputElement
          ).click();
        }
        let keyNew = gridRefName.value.instance.getKeyByRowIndex(
          dataSource.value.length - 1
        );
        focusedRowKey.value = keyNew;
      }, 100);
    };
    const onInitRow = (e: any) => {
      e.data = initRow;
    };
    const onDelete = (data: any) => {
      deleteModal.value = true;
      rowIndexDelete.value = data.rowIndex;
    };
    const onDelConfirm = () => {
      gridRefName.value.instance.deleteRow(rowIndexDelete.value);
      deleteModal.value = false;
    };
    const onFocusedRowChanged = (e: any) => {
      const data = e.row && e.row.data;
      dataActiveRow.value = data;
    };
    const onOpenPopupInfo = (key: number) => {
      keyInfo.value = key;
      statusPupopInfo.value = true;
    };

    const lenFixedMsg = Message.getCommonMessage('105').message;
    const checkBizNumberLen = ref(false)
    watch(()=>formState.value.content.cmsBank.ownerBizNumber,(newVal: any)=>{
      if(newVal.length !== 10 && newVal.length !==13){
        checkBizNumberLen.value = false;
      }else{
        checkBizNumberLen.value = true;
      }
    },{deep : true});
    return {
      selectionChanged,
      contentReady,
      move_column,
      colomn_resize,
      titleModal,
      selectedItemKeys,
      checkedSourceService,
      labelCol,
      bizTypeItems,
      visible,
      formState,
      setModalVisible,
      changeTypeCompany,
      loading,
      loadingUpdate,
      activeKey,
      funcAddress,
      updateSubscriptionRequest,
      facilityBizType,
      canChangeableBizNumber,
      getregCardFile,
      removeRegCardFile,
      getUrlLicenseFile,
      licenseFileName,
      imageLicenseFile,
      removeLicenseFile,
      arrayRadioWithdrawDay,
      dayjs,
      isNumeric,
      onSelectionClick,
      dataActiveRow,
      addRow,
      gridRefName,
      facilityBizTypeCommon,
      dataSource,
      onInitRow,
      focusedRowKey,
      onFocusedRowChanged,
      isResidentId,
      statusPupopInfo,
      onOpenPopupInfo,
      keyInfo,
      arrayRadioCheckSourceServices,
      accountingServiceTypes,
      onDelConfirm,
      onDelete, deleteModal, contentDelete,
      checkedAccounting,
      withholdingServiceTypes,
      isStatusApproved,onRowChangeComfirm,
      checkBizNumberLen,lenFixedMsg,
    };
  },
});
</script>
<style lang="scss" scoped src="../style/popupStyle.scss"></style>
