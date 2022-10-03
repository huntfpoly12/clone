<template>
  <div class="contract-container">
    <h2>서비스가입신청</h2>
    <a-steps v-model:current="step" type="navigation" :style="stepStyle">
      <a-step :status="step === 0 ? 'process' : 'finish'" title="약관동의" />
      <a-step :status="checkStepTwo" title="사업자대표자정보" />
      <a-step :status="checkStepThree" title="서비스신청CMS정보" />
      <a-step :status="checkStepFour" title="신청완료!" />
    </a-steps>
    <div class="step-content">
      <template v-if="step === 0">
        <div class="form-group">
          <label>1. 서비스약관 동의</label>
          <a-textarea
            disabled
            placeholder="// 주석처리 ( 추후 내용제공 )"
            allow-clear
          />
          <div class="radio-group">
            <a-radio-group v-model:value="radio">
              <a-checkbox v-model:checked="contractCreacted.terms"
                >동의함</a-checkbox
              >
            </a-radio-group>
          </div>
        </div>
        <div class="form-group">
          <label>2. 개인정보제공 및 활용동의</label>
          <a-textarea
            disabled
            placeholder="// 주석처리 ( 추후 내용제공 )"
            allow-clear
          />
          <div class="radio-group">
            <a-radio-group v-model:value="radio">
              <a-checkbox v-model:checked="contractCreacted.personalInfo"
                >동의함</a-checkbox
              >
            </a-radio-group>
          </div>
        </div>
        <div class="form-group">
          <label>3. 회계서비스약관 동의</label>
          <a-textarea
            disabled
            placeholder="// 주석처리 ( 추후 내용제공 )"
            allow-clear
          />
          <div class="radio-group">
            <a-radio-group v-model:value="radio">
              <a-checkbox v-model:checked="contractCreacted.accountingService"
                >동의함</a-checkbox
              >
            </a-radio-group>
          </div>
        </div>
        <div class="form-group">
          <label>4. 원천서비스약관 동의</label>
          <a-textarea
            disabled
            placeholder="// 주석처리 ( 추후 내용제공 )"
            allow-clear
          />
          <div class="radio-group">
            <a-radio-group v-model:value="radio">
              <a-checkbox v-model:checked="contractCreacted.withholdingService"
                >동의함</a-checkbox
              >
            </a-radio-group>
          </div>
        </div>
      </template>
      <template v-if="step === 1">
        <div class="form-group">
          <label>1. 사업자정보</label>
          <div class="info-box">
            <div class="form-item">
              <label class="red">상 호 :</label>
              <a-input
                v-model:value="contractCreacted.nameCompany"
                placeholder="가나다라마바사아자차카타파하 요양병원"
              />
            </div>
            <div class="form-item">
              <label class="red">사업자등록번호 :</label>
              <a-input
                v-model:value="contractCreacted.bizNumber"
                placeholder="123-45-67890"
              />
            </div>
            <div class="form-item">
              <label class="red">사업자유형 :</label>
              <a-radio-group
                v-model:value="contractCreacted.bizType"
                @change="changeTypeCompany"
              >
                <a-radio :value="1">법인사업자</a-radio>
                <a-radio :value="2">개인사업자</a-radio>
              </a-radio-group>

              <div class="group-label">
                <p>{{ textIDNo }}:</p>
                <a-input
                  class="width-auto"
                  v-model:value="contractCreacted.residentId"
                  placeholder="800123-1234567"
                />
              </div>
            </div>

            <div class="form-item">
              <label class="red">주 소 :</label>
              <div class="group-label">
                <a-input
                  class="width-auto"
                  placeholder="검색어입력"
                  v-model:value="contractCreacted.zipcode"
                  disabled
                />
                <a-button>
                  <postCode @dataAddress="funcAddress" />
                </a-button>
              </div>
            </div>

            <div class="form-item">
              <label></label>
              <a-input
                placeholder="도로명 주소"
                v-model:value="contractCreacted.roadAddress"
                disabled
              />
            </div>
            <div class="form-item">
              <label></label>
              <a-input
                placeholder="확장 주소"
                v-model:value="contractCreacted.addressExtend"
              />
            </div>
            <div class="form-item">
              <label class="red">연락처 :</label>
              <a-input
                class="width-auto"
                v-model:value="contractCreacted.phone"
                placeholder="0298765432"
              />
            </div>
            <div class="form-item">
              <label>팩 스 :</label>
              <a-input
                class="width-auto"
                v-model:value="contractCreacted.fax"
                placeholder="0212345678"
              />
            </div>
            <div style="display: flex">
              <div>
                <imgUpload
                  :title="titleModal"
                  @update-img="getImgUrl"
                  style="margin-top: 10px"
                />
              </div>

              <a-col :span="7">
                <div v-if="this.imageValue" class="img-preview">
                  <img :src="this.imageValue" @click="handlePreview" />
                </div>
                <div v-else class="img-preview">
                  <img src="../../assets/images/imgdefault.jpg" />
                </div>
                <div v-if="this.fileName">
                  <span style="padding-right: 10px">{{ this.fileName }}</span>
                  <delete-outlined
                    @click="removeImg"
                    style="color: red; cursor: pointer"
                  />
                </div>
              </a-col>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>2. 대표자정보</label>
          <div class="info-box">
            <div class="form-item">
              <label class="red">대표자명:</label>
              <a-input
                placeholder="홍길동"
                style="width: 150px"
                v-model:value="contractCreacted.namePresident"
              />
            </div>
            <div class="form-item">
              <label class="red">생년월일 :</label>
              <div>
                <CustomDatepicker
                  v-if="contractCreacted.birthday == ''"
                  @valueDateChange="changeValueDate"
                />
                <CustomDatepicker
                  v-else
                  :valueDate="contractCreacted.birthday"
                  @valueDateChange="changeValueDate"
                />
              </div>
            </div>
            <div class="form-item">
              <label class="red">휴대폰번호:</label>
              <a-input
                placeholder="01098765432"
                style="width: 150px"
                v-model:value="contractCreacted.mobilePhone"
              />
            </div>
            <div class="form-item">
              <label class="red">이메일 :</label>
              <a-form
                :model="formState"
                v-bind="layout"
                name="nest-messages"
                :validate-messages="validateMessages"
                @finish="onFinish"
              >
                <a-form-item
                  :name="['user', 'email']"
                  :rules="[{ type: 'email' }]"
                >
                  <a-input v-model:value="formState.user.email" />
                </a-form-item>
              </a-form>
            </div>
          </div>
        </div>
      </template>
      <template v-if="step === 2">
        <div class="form-group">
          <label>1. 회계서비스 신청</label>
          <div class="list-checkbox">
            <a-radio-group v-model:value="dataInputCallApi.dossier">
              <a-radio :value="'신청합니다'">신청합니다</a-radio>
              <a-radio :value="'신청하지 않습니다'">신청하지 않습니다</a-radio>
            </a-radio-group>
          </div>

          <div class="group-title">
            <p class="red">⁙ 운영사업</p>
          </div>

          <DxDataGrid
            id="gridContainer"
            :data-source="valueFacilityBusinesses"
            :show-borders="true"
            :selected-row-keys="selectedItemKeys"
          >
            <DxEditing
              :use-icons="true"
              :allow-updating="true"
              :allow-adding="true"
              :allow-deleting="true"
              template="button-template"
              mode="cell"
            >
              <DxTexts confirmDeleteMessage="삭제하겠습니까?" />
              <DxTexts addRow="추 가" />
            </DxEditing>
            <template #button-template>
              <DxButton icon="plus" />
            </template>
            <DxPaging :enabled="false" />
            <DxColumn
              data-field="No"
              :allow-editing="false"
              :width="50"
              caption="#"
              cell-template="indexCell"
            />

            <template #indexCell="{ data }">
              <div>{{ data.rowIndex + 1 }}</div>
            </template>

            <DxColumn data-field="name" caption="사업명 (중복불가)" />
            <DxColumn
              :width="225"
              data-field="facilityBizType"
              caption="사업분류"
            >
              <DxLookup
                :data-source="states"
                value-expr="ID"
                display-expr="Name"
              />
            </DxColumn>

            <DxColumn
              data-field="startYearMonth"
              data-type="date"
              caption="서비스시작년월"
              :format="'yyyy-MM-dd'"
            />

            <DxColumn
              :width="100"
              data-field="capacity"
              caption="정원수 (명)"
            />
            <DxToolbar>
              <DxItem name="addRowButton" />
            </DxToolbar>
          </DxDataGrid>

          <div class="form-item">
            <label class="red">장기요양기관등록번호 :</label>
            <a-input
              placeholder="1234567898"
              v-model:value="contractCreacted.longTermCareInstitutionNumber"
            />
          </div>

          <div style="display: flex">
            <div></div>

            <div>
              <imgUpload
                :title="titleModal"
                @update-step="getImgUrlAccounting"
                style="margin-top: 10px"
              />
            </div>

            <a-col :span="7">
              <div v-if="this.imagestep" class="img-preview">
                <img :src="this.imagestep" @click="handlePreview" />
              </div>
              <div v-else class="img-preview">
                <img src="../../assets/images/imgdefault.jpg" />
              </div>
              <div v-if="this.fileNamestep">
                <span style="padding-right: 10px">{{ this.fileNamestep }}</span>
                <delete-outlined
                  @click="removeImg"
                  style="color: red; cursor: pointer"
                />
              </div>
            </a-col>
          </div>
          <div class="form-item">
            <label>부가서비스:</label>
            <a-checkbox
              v-model:checked="contractCreacted.accountingServiceTypes"
              >회계입력대행서비스</a-checkbox
            >
          </div>
        </div>

        <div class="form-group">
          <label>2. 원천서비스 신청</label>
          <div class="list-checkbox">
            <a-radio-group v-model:value="dataInputCallApi.applicationService">
              <a-radio :value="'신청합니다'">신청합니다</a-radio>
              <a-radio :value="'신청하지 않습니다'">신청하지 않습니다</a-radio>
            </a-radio-group>
          </div>

          <div class="form-item">
            <label>서비스 시작년월 :</label>
            <div style="position: relative">
              <CustomDatepicker
                v-if="contractCreacted.startYearMonthHolding == ''"
                @valueDateChange="changeValueDateHoding"
              />
              <CustomDatepicker
                v-else
                :valueDate="contractCreacted.startYearMonthHolding"
                @valueDateChange="changeValueDateHoding"
              />
            </div>
          </div>

          <div class="form-item">
            <label>직 원 수:</label>
            <a-input
              placeholder="장기요양기관등록번호"
              style="width: 150px"
              v-model:value="contractCreacted.capacityHolding"
            />
          </div>
          <div class="form-item">
            <label>부가서비스 :</label>
            <a-checkbox
              v-model:checked="contractCreacted.withholdingServiceTypes"
              >4대보험신고서비스</a-checkbox
            >
          </div>
        </div>

        <div class="form-group">
          <label>3. CMS (자동이체출금) 계좌 정보 입력</label>
          <div class="form-item">
            <label class="red">출금은행 :</label>
            <selectBank @bank="getIDBank" />
          </div>
          <div class="form-item">
            <label class="red">출금계좌번호 :</label>
            <a-input
              placeholder="출금계좌번호"
              v-model:value="contractCreacted.accountNumber"
            />
          </div>
          <div class="form-item">
            <label class="red">예금주명 :</label>
            <a-input
              placeholder="주식회사 타운소프트비나"
              v-model:value="contractCreacted.ownerName"
            />
          </div>
          <div class="form-item">
            <label class="red">사업자(주민)등록번호:</label>
            <a-input
              class="width-auto"
              placeholder="예금주의 사업자등록번호 또는 주민등록번호입니다"
              v-model:value="contractCreacted.ownerBizNumber"
            />
            <p>i: 예금주의 사업자등록번호 또는 주민등록번호입니다</p>
          </div>

          <div class="form-item">
            <label class="red">자동이체출금일자 :</label>
            <a-radio-group v-model:value="contractCreacted.withdrawDay">
              <a-radio value="매월 5일">매월 5일</a-radio>
              <a-radio value="매월 12일">매월 12일</a-radio>
              <a-radio value="매월 19일">매월 19일</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div class="form-group">
          <label>4. 기타</label>
          <div class="form-item">
            <label>영업관리담당 :</label>
            <a-select
              v-model:value="contractCreacted.salesRepresentativeId"
              placeholder="영업자선택"
            >
              <a-select-option :value="1">A 대리점</a-select-option>
              <a-select-option :value="2">농협</a-select-option>
              <a-select-option :value="3">C 영업사원</a-select-option>
              <a-select-option :value="4">D 영업사원</a-select-option>
              <a-select-option :value="5">E 본사영업사원</a-select-option>
            </a-select>
          </div>
          <div class="form-item">
            <label>전달사항 :</label>
            <a-textarea
              v-model:value="contractCreacted.comment"
              placeholder="전달사항입력"
              allow-clear
            />
          </div>
        </div>
      </template>
      <template v-if="step === 3">
        <p class="mt-3">
          ⁙ 귀하의 신청내용을 확인하신 후 아래 신청 버튼을 누르시면 신청이
          완료됩니다.<br />
          ( 만약, 수정할 사항이 있는 경우 이전 버튼을 누르셔서 수정하시기
          바랍니다. )
        </p>
      </template>
      <a-modal
        v-model:visible="visibleModal"
        :mask-closable="false"
        ok-text="확인"
        cancel-text=""
      >
        <template #footer>
          <a-button key="submit" type="primary" @click="handleOk"
            >확인</a-button
          >
        </template>
        <h4>신청완료!!!</h4>
        <p>서비스 가입신청이 완료되었습니다.</p>
      </a-modal>
      <div class="group-button">
        <a-button v-if="step > 0" type="secondary" @click="prevStep"
          >이 전
        </a-button>
        <a-button v-if="step < 3" type="primary" @click="nextStep"
          >다음
        </a-button>
        <a-button v-if="step === 3" type="primary" @click="openPopup()"
          >신 청
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref, onMounted } from "vue";
import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";

import moment from "moment";
import { employees, states } from "./data.js";
// import mutations from "../../graphql/mutations/RqContract/index";
import { notification } from "ant-design-vue";

import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxEditing,
  DxSelection,
  DxLookup,
  DxToolbar,
  DxItem,
  DxTexts,
} from "devextreme-vue/data-grid";
import { DxButton } from "devextreme-vue/button";
import imgUpload from "../../components/UploadImage.vue";
import CustomDatepicker from "../../components/CustomDatepicker.vue";
import selectBank from "../../components/selectBank.vue";
import postCode from "../../components/postCode.vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday);
dayjs.extend(localeData);
export default {
  components: {
    CheckOutlined,
    EditOutlined,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxEditing,
    DxSelection,
    DxLookup,
    DxToolbar,
    DxItem,
    DxTexts,
    DxButton,
    imgUpload,
    CustomDatepicker,
    moment,
    selectBank,
    postCode,
    DeleteOutlined,
  },
  data() {
    return {
      textIDNo: "법인등록번호",
      step: 0,
      radio: "",
      radio1: "",
      radio2: "",
      radio3: "",
      radio4: "",
      dataModal: [],
      states,
      marginTopModal: "margin-top : 10px",
      titleModal: "사업자등록증",
      dataInputCallApi: {
        dossier: "",
        applicationService: "",
      },

      messagePopup: "",
    };
  },

  computed: {
    checkStepTwo() {
      if (this.step === 0) {
        return "wait";
      } else if (this.step === 1) {
        return "process";
      } else {
        return "finish";
      }
    },
    checkStepThree() {
      if (this.step < 2) {
        return "wait";
      } else if (this.step === 2) {
        return "process";
      } else {
        return "finish";
      }
    },
    checkStepFour() {
      if (this.step < 3) {
        return "wait";
      } else if (this.step === 3) {
        return "process";
      } else {
        return "finish";
      }
    },
    changeValueInputEmit(data) {
      if (data.name == "nameCompany") {
        this.dataSearch.nameCompany = data.value;
      }
    },
  },

  setup() {
    const imagestep = ref("");
    const imageValue = ref("");
    const fileName = ref("");
    const fileNamestep = ref("");
    const contractCreacted = reactive({
      terms: true,
      personalInfo: true,
      accountingService: true,
      withholdingService: true,
      nameCompany: "",
      zipcode: "",
      roadAddress: "",
      jibunAddress: "",
      addressExtend: "",
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
      phone: "",
      fax: "",
      licenseFileStorageId: 10,
      bizNumber: "",
      bizType: 1,
      residentId: "",
      namePresident: "",
      birthday: "",
      mobilePhone: "",
      email: "",
      longTermCareInstitutionNumber: "",
      facilityBizType: 1,
      accountingServiceTypes: 1,
      facilityBusinesses: [],
      startYearMonthHolding: "",
      capacityHolding: 10,
      withholdingServiceTypes: 1,
      bankType: "39",
      accountNumber: "",
      ownerBizNumber: "",
      withdrawDay: "매월 5일",
      salesRepresentativeId: 1,
      comment: "",
      ownerName: "",
    });

    var visibleModal = ref(false);

    const valueFacilityBusinesses = ref([]);
    const formattedAttachments = ref(
      '{longTermCareInstitutionNumber: "", facilityBizType: 2, name: "12314124",startYearMonth: "2022/10/11", capacity: 123123, registrationCardFileStorageId: null,}{longTermCareInstitutionNumber: "", facilityBizType: 2, name: "4234523",startYearMonth: "2022/11/11", capacity: 123123, registrationCardFileStorageId: null,}'
    );

    const removeImg = () => {
      //   this.imagestep.value = "";
      //   this.imageValue.value = "";
      imageValue.value = "";
      imagestep.value = "";
      fileName.value = "";
      fileNamestep.value = "";
      console.log(fileNamestep);
    };
    const {
      mutate: Creat,
      loading: signinLoading,
      onDone: signinDone,
      onError: onError,
    } = useMutation(
      gql`
        mutation createSubscriptionRequest(
            $terms: Boolean!,
            $personalInfo: Boolean!,
            $accountingService: Boolean!,
            $withholdingService: Boolean!,
            $nameCompany:String!,
            $zipcode:String!,
            $roadAddress:String!,
            $jibunAddress:String!,
            $addressExtend:String!,
            $bcode: String!,
            $bname: String!,
            $buildingCode:String!,
            $buildingName:String!,
            $roadname: String!,
            $roadnameCode:String!,
            $sido: String!,
            $sigungu:String!,
            $sigunguCode:String!,
            $zonecode: String!,
            $capacityHolding : Int!
            $phone: String!,
            $fax: String!,
            $licenseFileStorageId: Int!,
            $bizNumber: String!,
            $residentId: String!,
            $namePresident : String!,
            $birthday : String!,
            $mobilePhone : String!,
            $email : String!,   
            $startYearMonthHolding : String! ,  
            $accountNumber : String! ,
            $ownerBizNumber : String! ,
            $ownerName : String!,
            $withdrawDay : String!,
            $salesRepresentativeId: Int! ,
            $comment: String!,    
            $bizType: BizTypeScalar!,
            $accountingServiceTypes: [AccountingAdditionalServiceTypeScalar!]!,
            $withholdingServiceTypes: [WithholdingAdditionalServiceTypeScalar!]!,
            $bankType: BankTypeScalar!, 

            ) {
        createSubscriptionRequest(
            content :{
                agreements: {
                terms: $terms
                personalInfo: $personalInfo
                accountingService: $accountingService
                withholdingService: $withholdingService
                }
                company: {
                    name: $nameCompany
                    zipcode: $zipcode
                    roadAddress: $roadAddress
                    jibunAddress: $jibunAddress
                    addressExtend: $addressExtend
                    addressDetail: {
                        bcode: $bcode
                        bname: $bname
                        buildingCode: $buildingCode
                        buildingName: $buildingName
                        roadname: $roadname
                        roadnameCode: $roadnameCode
                        sido: $sido
                        sigungu: $sigungu
                        sigunguCode: $sigunguCode
                        zonecode: $zonecode
                    }
                    phone: $phone
                    fax: $fax
                    licenseFileStorageId: $licenseFileStorageId
                    bizNumber: $bizNumber
                    bizType: $bizType
                    residentId: $residentId
                }
                president: {
                    name: $namePresident
                    birthday: $birthday
                    mobilePhone: $mobilePhone
                    email: $email
                }
                accounting: {
                    facilityBusinesses:  [${formattedAttachments.value}]
                    accountingServiceTypes: $accountingServiceTypes
                }
                withholding: {
                    startYearMonth: $startYearMonthHolding
                    capacity: $capacityHolding
                    withholdingServiceTypes: $withholdingServiceTypes
                }
                cmsBank: {
                    bankType: $bankType
                    accountNumber: $accountNumber
                    ownerBizNumber: $ownerBizNumber
                    ownerName: $ownerName
                    withdrawDay: $withdrawDay
                }
                extra: {
                    salesRepresentativeId: $salesRepresentativeId
                    comment: $comment
                }
            },) {
                    id
                    status
                    code
            }
        }
            `,
      () => ({
        variables: contractCreacted,
      })
    );

    signinDone((res) => {
      visibleModal.value = true;
    });

    onError((res) => {
      openNotificationWithIcon("error", res);
    });

    const openNotificationWithIcon = (type, mes) => {
      if (type == "error")
        notification[type]({
          message: { mes }.mes.message,
        });
      else {
        notification[type]({
          message: mes,
        });
      }
    };

    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "이메일 형식이 정확하지 않습니다",
        number: "Numeric only!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const formState = reactive({
      user: {
        name: "",
        age: undefined,
        email: "",
        website: "",
        introduction: "",
      },
    });

    return {
      contractCreacted,
      Creat,
      valueFacilityBusinesses,
      formattedAttachments,
      openNotificationWithIcon,
      signinDone,
      onError,
      visibleModal,
      validateMessages,
      onFinish,
      layout,
      formState,
      removeImg,
      imagestep,
      imageValue,
      fileName,
      fileNamestep,
    };
  },
  // watch: {
  //     'contractCreacted.longTermCareInstitutionNumber'(newVal) {
  //         let arrNew = [];
  //         let dataAdd = ''
  //         if (this.valueFacilityBusinesses.length > 0) {
  //             this.valueFacilityBusinesses.forEach(element => {
  //                 const obj = {
  //                     ...element,
  //                     longTermCareInstitutionNumber: newVal,
  //                     registrationCardFileStorageId: this.contractCreacted.registrationCardFileStorageId
  //                 }
  //                 arrNew.push(obj)
  //             });
  //         }
  //         arrNew.map(attachment => {
  //             console.log(attachment.registrationCardFileStorageId);
  //             dataAdd += `{longTermCareInstitutionNumber: "${attachment.longTermCareInstitutionNumber}", facilityBizType: ${attachment.facilityBizType}, name: "${attachment.name}",startYearMonth: "${dayjs(attachment.startYearMonth).format('YYYY/MM/DD')}", capacity: ${attachment.capacity}, registrationCardFileStorageId: ${typeof (attachment.registrationCardFileStorageId) != "undefined" ? attachment.registrationCardFileStorageId : null},}`;
  //         });

  //         // this.formattedAttachments = dataAdd
  //     },
  //     'contractCreacted.registrationCardFileStorageId'(newVal) {
  //         let arrNew = [];
  //         let dataAdd = ''
  //         if (this.valueFacilityBusinesses.length > 0) {
  //             this.valueFacilityBusinesses.forEach(element => {
  //                 const obj = {
  //                     ...element,
  //                     longTermCareInstitutionNumber: this.contractCreacted.longTermCareInstitutionNumber,
  //                     registrationCardFileStorageId: newVal
  //                 }
  //                 arrNew.push(obj)
  //             });
  //         }
  //         arrNew.map(attachment => {
  //             console.log(attachment.registrationCardFileStorageId);
  //             dataAdd += `{longTermCareInstitutionNumber: "${attachment.longTermCareInstitutionNumber}", facilityBizType: ${attachment.facilityBizType}, name: "${attachment.name}",startYearMonth: "${dayjs(attachment.startYearMonth).format('YYYY/MM/DD')}", capacity: ${attachment.capacity}, registrationCardFileStorageId: ${typeof (attachment.registrationCardFileStorageId) != "undefined" ? attachment.registrationCardFileStorageId : null},}`;
  //         });

  //         // this.formattedAttachments = dataAdd
  //     },
  //     'valueFacilityBusinesses': {
  //         handler() {

  //             // this.formattedAttachments = dataAdd
  //         },
  //         deep: true,
  //         immediate: true
  //     },

  // },
  methods: {
    changeValueDate(data) {
      this.contractCreacted.birthday = data;
    },
    changeValueDateHoding(data) {
      this.contractCreacted.startYearMonthHolding = data;
    },
    funcAddress(data) {
      this.contractCreacted.zipcode = data.zonecode;
      this.contractCreacted.roadAddress = data.roadAddress;
      this.contractCreacted.jibunAddress = data.jibunAddress;
      this.contractCreacted.bcode = data.bcode;
      this.contractCreacted.bname = data.bname;
      this.contractCreacted.buildingCode = data.buildingCode;
      this.contractCreacted.buildingName = data.buildingName;
      this.contractCreacted.roadname = data.roadname;
      this.contractCreacted.roadnameCode = data.roadnameCode;
      this.contractCreacted.sido = data.sido;
      this.contractCreacted.sigungu = data.sigungu;
      this.contractCreacted.sigunguCode = data.sigunguCode;
      this.contractCreacted.zonecode = data.zonecode;
    },
    changeTypeCompany() {
      if (this.contractCreacted.bizType == 2) {
        this.textIDNo = "주민등록번호";
      } else {
        this.textIDNo = "법인등록번호";
      }
    },
    prevStep() {
      this.step--;
    },

    nextStep() {
      this.step++;
    },
    openPopup() {
      //validate data call api
      var obj = this.contractCreacted;
      let countNull = 0;
      for (const [key, value] of Object.entries(obj)) {
      }
      if (countNull > 0) {
        notification["error"]({
          message: "Vui lòng nhập đầy đủ thông tin cần thiết",
        });
      } else {
        let arrNew = [];
        let dataAdd = "";
        if (this.valueFacilityBusinesses.length > 0) {
          this.valueFacilityBusinesses.forEach((element) => {
            const obj = {
              ...element,
              longTermCareInstitutionNumber:
                this.contractCreacted.longTermCareInstitutionNumber,
              registrationCardFileStorageId:
                this.contractCreacted.registrationCardFileStorageId,
            };
            arrNew.push(obj);
          });
        }
        arrNew.map((attachment) => {
          console.log(attachment.registrationCardFileStorageId);
          dataAdd += `{longTermCareInstitutionNumber: "${
            attachment.longTermCareInstitutionNumber
          }", facilityBizType: ${attachment.facilityBizType}, name: "${
            attachment.name
          }",startYearMonth: "${dayjs(attachment.startYearMonth).format(
            "YYYY/MM/DD"
          )}", capacity: ${
            attachment.capacity
          }, registrationCardFileStorageId: ${
            typeof attachment.registrationCardFileStorageId != "undefined"
              ? attachment.registrationCardFileStorageId
              : null
          },}`;
        });
        // this.formattedAttachments = dataAdd

        console.log(this.formattedAttachments);
        this.Creat();
      }
    },
    handleOk() {
      this.visibleModal = false;
      this.$router.push("/login");
    },
    getImgUrl(img) {
      this.contractCreacted.licenseFileStorageId = img;
      this.imageValue = img.url;
      this.fileName = img.fileName;
      console.log(img);
    },

    getImgUrlAccounting(img) {
      this.imagestep = img.url;
      this.fileNamestep = img.fileNamestep;
      console.log(img);
      this.contractCreacted.registrationCardFileStorageId = img;
    },

    getIDBank(data) {
      this.contractCreacted.bankType = data;
    },
  },
};
</script>

<style scoped>
.contract-container {
  max-width: 960px;
  margin: 50px auto;
  text-align: left;
  padding-bottom: 50px;
}

.contract-container h2 {
  font-weight: bold;
}

.ant-steps-navigation {
  box-shadow: 0px -1px 0 0 #e8e8e8 inset;
}

.form-group {
  margin-top: 30px;
}

.form-group label {
  margin-bottom: 5px;
}

.radio-group {
  text-align: right;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: -15px;
}

::v-deep textarea {
  height: 100px;
}

.group-button {
  display: flex;
  justify-content: center;
}

.group-button {
  margin-top: 20px;
}

.group-button ::v-deep button {
  margin: 0 10px;
}

.info-box {
  border: 1px solid #ccc;
  padding: 30px;
}

.form-item {
  display: flex;
  margin-top: 15px;
}

.form-item label {
  width: 165px;
}

.red {
  color: red;
}

.width-auto {
  width: auto;
}

.form-item ::v-deep button {
  margin-left: 5px;
}

.form-item ::v-deep input,
.form-item .ant-input-affix-wrapper ::v-deep {
  max-width: calc(100% - 165px);
}

::v-deep input.dp__input.dp__input_icon_pad {
  width: 150px;
  max-width: 200px !important;
}

::v-deep #nest-messages_user_email {
  min-width: 350px !important;
}

.form-item p {
  margin-left: 30px;
  margin-top: 5px;
  margin-bottom: 0;
}

.group-label {
  display: flex;
  align-items: center;
}

.group-label p {
  margin-right: 15px;
  margin-bottom: 0;
}

.checkbox-item {
  margin-top: 15px;
  margin-bottom: 15px;
}

.editable-cell {
  position: relative;
}

.editable-cell .editable-cell-input-wrapper,
.editable-cell .editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell .editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell .editable-cell-icon,
.editable-cell .editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.date-picker label {
  width: 165px;
  display: inline-block;
}

.editable-cell .editable-cell-icon {
  margin-top: 4px;
  display: none;
}

::v-deep .ant-radio-group {
  display: flex;
}

.editable-cell .editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell .editable-cell-icon:hover,
.editable-cell .editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-cell .editable-add-btn {
  margin-bottom: 8px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

::v-deep .ant-pagination {
  display: none;
}

.group-title {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  position: relative;
  z-index: 20;
  width: 200px;
}

#gridContainer {
  margin-top: -40px;
}

.mt-3 {
  margin-top: 30px;
}

::v-deep .ant-checkbox-wrapper {
  display: flex;
}

::v-deep .ant-select {
  width: 180px;
}

::v-deep .dx-toolbar-text-auto-hide .dx-button .dx-button-text {
  display: inline-block;
}

.list-checkbox {
  margin-top: 10px;
}
</style>
