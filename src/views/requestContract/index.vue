<template>
    <div class="contract-container">
        <h2>서비스가입신청</h2>
        <a-steps :current="step" type="navigation" :style="stepStyle">
            <a-step :status="step === 0 ? 'process' : 'finish'" title="약관동의" @click="changeStep(1)" />
            <a-step :status="checkStepTwo" title="사업자대표자정보" @click="changeStep(2)" />
            <a-step :status="checkStepThree" title="서비스신청CMS정보" @click="changeStep(3)" />
            <a-step :status="checkStepFour" title="신청완료!" @click="changeStep(4)"/>
        </a-steps>
        <div class="step-content">
            <template v-if="step === 0">
                <div class="form-group">
                    <label>1. 서비스약관 동의</label>
                    <a-textarea disabled placeholder="// 주석처리 ( 추후 내용제공 )" allow-clear />
                    <div class="radio-group">
                        <a-radio-group v-model:value="radio">
                            <a-checkbox v-model:checked="contractCreacted.terms">동의함</a-checkbox>
                        </a-radio-group>
                    </div>
                </div>
                <div class="form-group">
                    <label>2. 개인정보제공 및 활용동의</label>
                    <a-textarea disabled placeholder="// 주석처리 ( 추후 내용제공 )" allow-clear />
                    <div class="radio-group">
                        <a-radio-group v-model:value="radio">
                            <a-checkbox v-model:checked="contractCreacted.personalInfo">동의함</a-checkbox>
                        </a-radio-group>
                    </div>
                </div>
                <div class="form-group">
                    <label>3. 회계서비스약관 동의</label>
                    <a-textarea disabled placeholder="// 주석처리 ( 추후 내용제공 )" allow-clear />
                    <div class="radio-group">
                        <a-radio-group v-model:value="radio">
                            <a-checkbox v-model:checked="contractCreacted.accountingService">동의함</a-checkbox>
                        </a-radio-group>
                    </div>
                </div>
                <div class="form-group">
                    <label>4. 원천서비스약관 동의</label>
                    <a-textarea disabled placeholder="// 주석처리 ( 추후 내용제공 )" allow-clear />
                    <div class="radio-group">
                        <a-radio-group v-model:value="radio">
                            <a-checkbox v-model:checked="contractCreacted.withholdingService">동의함</a-checkbox>
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
                            <div>
                                <a-form :model="contractCreacted" style="width: 100%;" name="nest-messages"
                                    :validate-messages="validateMessages" @finish="onFinish">
                                    <a-form-item :name="['nameCompany']" :rules="[{ required: true }]">
                                        <a-input style="width: 400px" v-model:value="contractCreacted.nameCompany" />
                                    </a-form-item>
                                </a-form>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="red">사업자등록번호 :</label>
                            <DxTextBox mask="000-00-00000" v-model:value="contractCreacted.bizNumber"
                                mask-invalid-message="입력한 정보가 충분하지 않습니다!">
                                <DxValidator>
                                    <DxPatternRule message="" />
                                </DxValidator>
                            </DxTextBox>
                        </div>
                        <div class="form-item">
                            <label class="red">사업자유형 :</label>
                            <a-radio-group v-model:value="contractCreacted.bizType">
                                <a-radio :value="1" @click="changeTypeCompany(1)">법인사업자</a-radio>
                                <a-radio :value="2" @click="changeTypeCompany(2)">개인사업자</a-radio>
                            </a-radio-group>
                            <div class="group-label">
                                <p>{{ textIDNo }}:</p>
                                <DxTextBox mask="000000-0000000" v-model:value="contractCreacted.residentId"
                                    mask-invalid-message="입력한 정보가 충분하지 않습니다!">
                                    <DxValidator>
                                        <DxPatternRule message="" />
                                    </DxValidator>
                                </DxTextBox>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="red">주 소 :</label>
                            <div class="group-label">
                                <a-input class="width-auto" placeholder="우편번호" v-model:value="contractCreacted.zipcode"
                                    disabled />
                                <a-button>
                                    <postCode @dataAddress="funcAddress" />
                                </a-button>
                            </div>
                        </div>
                        <div class="form-item">
                            <label></label>
                            <a-input placeholder="주소" v-model:value="contractCreacted.roadAddress" disabled />
                        </div>
                        <div class="form-item">
                            <label></label>
                            <a-form :model="contractCreacted" style="width: 100%;" name="nest-messages"
                                :validate-messages="validateMessages" @finish="onFinish">
                                <a-form-item :name="['addressExtend']" :rules="[{ required: true }]">
                                    <a-input placeholder="상세주소(입력)" v-model:value="contractCreacted.addressExtend" />
                                </a-form-item>
                            </a-form>
                        </div>
                        <!-- <div class="form-item">
                            <label class="red">연락처 :</label>
                            <a-input placeholder="'-'없이 슷자만 입력" @change="validateNumber('phone')"
                                v-model:value="contractCreacted.phone" style="width: 180px;">                                
                            </a-input>
                        </div> -->
                        <div class="form-item">
                            <label class="red">연락처 :</label>
                            <a-form :model="contractCreacted" name="nest-messages" :validate-messages="validateMessages"
                                @finish="onFinish">
                                <a-form-item :name="['phone']" :rules="[{ required: true }]">
                                    <a-input placeholder="'-' 앖이 숫자만 인력" @change="validateNumber('phone')"
                                        v-model:value="contractCreacted.phone" style="width: 180px" />
                                </a-form-item>
                            </a-form>
                        </div>
                        <div class="form-item">
                            <label>팩 스 :</label>
                            <a-input placeholder="'-' 앖이 숫자만 인력" v-model:value="contractCreacted.fax"
                                @change="validateNumber('fax')" @keyup="validateNumber('fax')" style="width: 180px;" />
                        </div>
                        <div style="display: flex">
                            <div>
                                <imgUpload :title="titleModal" v-model:imageId="imageId" @update-img="getImgUrl"
                                    style="margin-top: 10px" />
                            </div>
                            <a-col :span="7">
                                <div v-if="this.imageValue" class="img-preview">
                                    <a-image :src="this.imageValue" @click="handlePreview" />
                                </div>
                                <div v-else class="img-preview">
                                    <img src="../../assets/images/imgdefault.jpg" />
                                </div>
                                <div v-if="this.fileName">
                                    <span style="padding-right: 10px">{{ this.fileName }}</span>
                                    <delete-outlined @click="removeImg" style="color: red; cursor: pointer" />
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
                            <a-form :model="contractCreacted" name="nest-messages" :validate-messages="validateMessages"
                                @finish="onFinish">
                                <a-form-item :name="['namePresident']" :rules="[{ required: true }]">
                                    <a-input v-model:value="contractCreacted.namePresident" style="width: 150px" />
                                </a-form-item>
                            </a-form>
                        </div>
                        <div class="form-item">
                            <label class="red">생년월일 :</label>
                            <div style="width: 150px">
                                <a-form :model="contractCreacted" name="nest-messages"
                                    :validate-messages="validateMessages" @finish="onFinish">
                                    <a-form-item :name="['birthday']" :rules="[{ required: true }]">
                                        <a-date-picker v-model:value="contractCreacted.birthday"
                                            value-format="YYYY-MM-DD" placeholder="" />
                                    </a-form-item>
                                </a-form>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="red">휴대폰번호:</label>
                            <a-form :model="contractCreacted" name="nest-messages" :validate-messages="validateMessages"
                                @finish="onFinish">
                                <a-form-item :name="['mobilePhone']" :rules="[{ required: true }]">
                                    <a-input v-model:value="contractCreacted.mobilePhone" placeholder="'-' 앖이 숫자만 인력"
                                        @keyup="validateNumber('mobilePhone')" style="width: 150px" />
                                </a-form-item>
                            </a-form>
                        </div>
                        <div class="form-item">
                            <label class="red">이메일 :</label>
                            <a-form :model="contractCreacted" name="nest-messages" :validate-messages="validateMessages"
                                @finish="onFinish">
                                <a-form-item :name="['email']" :rules="[{ type: 'email', required: true }]">
                                    <a-input v-model:value="contractCreacted.email" style="width: 350px"
                                        @keyup="validateEmail" />
                                </a-form-item>
                            </a-form>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="step === 2">
                <a-form disabled>
                    <div class="form-group">
                        <label>1. 회계서비스 신청</label>
                        <div class="list-checkbox">
                            <a-radio-group v-model:value="dataInputCallApi.dossier" :options="plainOptions"
                                @change="disableForm1" />
                        </div>
                        <div class="group-title">
                            <p class="red">⁙ 운영사업</p>
                        </div>
                        <div style="position: relative;">
                            <div class="overlay" v-if="disableFormVal2 == true"></div>
                            <DxDataGrid disable="true" id="gridContainer" :data-source="valueFacilityBusinesses"
                                :show-borders="true" :selected-row-keys="selectedItemKeys"
                                :allow-column-reordering="true" :allow-column-resizing="true" :column-auto-width="true"
                                :repaint-changes-only="true">
                                <DxEditing :use-icons="true" :allow-updating="true" :allow-adding="true"
                                    :allow-deleting="true" template="button-template" mode="cell">
                                    <DxTexts confirmDeleteMessage="삭제하겠습니까?" />
                                    <DxTexts addRow="추 가" />
                                </DxEditing>
                                <template #button-template>
                                    <DxButton icon="plus" />
                                </template>
                                <DxPaging :enabled="false" />
                                <DxColumn data-field="No" :allow-editing="false" :width="50" caption="#"
                                    cell-template="indexCell" />
                                <template #indexCell="{ data }">
                                    <div>{{ data.rowIndex + 1 }}</div>
                                </template>
                                <DxColumn data-field="name" caption="사업명 (중복불가)">
                                    <DxRequiredRule />
                                </DxColumn>
                                <DxColumn :width="225" data-field="facilityBizType" caption="사업분류">
                                    <DxLookup :data-source="states" value-expr="ID" display-expr="Name" />
                                </DxColumn>
                                <DxColumn data-field="startYearMonth" data-type="date" caption="서비스시작년월"
                                    :format="'yyyy-MM-dd'" />
                                <DxColumn :width="100" data-field="capacity" data-type="number" caption="정원수 (명)" />
                                <DxToolbar>
                                    <DxItem name="addRowButton" />
                                </DxToolbar>
                            </DxDataGrid>
                        </div>
                        <div class="form-item">
                            <label class="red">장기요양기관등록번호 :</label>
                            <a-input :disabled="disableFormVal2" placeholder="1234567898"
                                @change="validateNumber('longTermCareInstitutionNumber')"
                                @keyup="validateNumber('longTermCareInstitutionNumber')"
                                v-model:value="contractCreacted.longTermCareInstitutionNumber" />
                        </div>
                        <div style="display: flex">
                            <div>
                                <imgUpload :disabledImg="disableFormVal2" :title="titleModal"
                                    @update-step="getImgUrlAccounting" style="margin-top: 10px; " />
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
                                    <delete-outlined @click="removeImgStep" style="color: red; cursor: pointer" />
                                </div>
                            </a-col>
                        </div>
                        <div class="form-item">
                            <label>부가서비스:</label>
                            <a-checkbox :disabled="disableFormVal2"
                                v-model:checked="contractCreacted.accountingServiceTypes">회계입력대행서비스</a-checkbox>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>2. 원천서비스 신청</label>
                        <div class="list-checkbox">
                            <a-radio-group v-model:value="dataInputCallApi.applicationService" :options="plainOptions"
                                @change="disableForm2" />
                        </div>
                        <div class="form-item">
                            <label>서비스 시작년월 :</label>
                            <a-date-picker :disabled="disableFormVal" style="width: 170px"
                                v-model:value="contractCreacted.startYearMonthHolding" :format="monthFormat"
                                placeholder="" picker="month" />
                        </div>
                        <div class="form-item">
                            <label>직 원 수:</label>
                            <a-input-number :disabled="disableFormVal" placeholder="장기요양기관등록번호" style="width: 170px"
                                min="0" v-model:value="contractCreacted.capacityHolding"
                                @change="validateNumber('capacityHolding')"
                                @keyup="validateNumber('capacityHolding')" />
                        </div>
                        <div class="form-item">
                            <label>부가서비스 :</label>
                            <a-checkbox :disabled="disableFormVal"
                                v-model:checked="contractCreacted.withholdingServiceTypes">4대보험신고서비스
                            </a-checkbox>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>3. CMS (자동이체출금) 계좌 정보 입력</label>
                        <div class="form-item">
                            <label class="red">출금은행 :</label>
                            <selectBank :disableFormVal="disableFormVal" @bank="getIDBank" :width="'178px'" />
                        </div>
                        <div class="form-item">
                            <label class="red">출금계좌번호 :</label>
                            <a-input placeholder="출금계좌번호" :disabled="disableFormVal"
                                v-model:value="contractCreacted.accountNumber" @change="validateNumber('accountNumber')"
                                @keyup="validateNumber('accountNumber')" />
                        </div>
                        <div class="form-item">
                            <label class="red">예금주명 :</label>
                            <a-input placeholder="주식회사 타운소프트비나" :disabled="disableFormVal"
                                v-model:value="contractCreacted.ownerName" />
                        </div>
                        <div class="form-item">
                            <label class="red">사업자(주민)등록번호:</label>
                            <a-input class="width-auto" placeholder="예금주의 사업자등록번호 또는 주민등록번호입니다"
                                v-model:value="contractCreacted.ownerBizNumber" :disabled="disableFormVal"
                                @change="validateNumber('ownerBizNumber')" @keyup="validateNumber('ownerBizNumber')" />
                            <p>i: 예금주의 사업자등록번호 또는 주민등록번호입니다</p>
                        </div>
                        <div class="form-item">
                            <label class="red">자동이체출금일자 :</label>
                            <a-radio-group v-model:value="contractCreacted.withdrawDay" :disabled="disableFormVal">
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
                            <a-select v-model:value="contractCreacted.salesRepresentativeId" placeholder="영업자선택"
                                :disabled="disableFormVal" :options="optionSale">
                            </a-select>
                        </div>
                        <div class="form-item">
                            <label>전달사항 :</label>
                            <a-textarea v-model:value="contractCreacted.comment" :disabled="disableFormVal"
                                placeholder="전달사항입력" allow-clear />
                        </div>
                    </div>
                </a-form>
            </template>
            <template v-if="step === 3">
                <p class="mt-3">
                    ⁙ 귀하의 신청내용을 확인하신 후 아래 신청 버튼을 누르시면 신청이
                    완료됩니다.<br />
                    ( 만약, 수정할 사항이 있는 경우 이전 버튼을 누르셔서 수정하시기
                    바랍니다. )
                </p>
            </template>
            <a-modal v-model:visible="visibleModal" :mask-closable="false" ok-text="확인" cancel-text="">
                <template #footer>
                    <a-button key="submit" type="primary" @click="handleOk">확인</a-button>
                </template>
                <h4>신청완료!!!</h4>
                <p>서비스 가입신청이 완료되었습니다.</p>
            </a-modal>
            <div class="group-button">
                <a-button v-if="step > 0" type="secondary" @click="prevStep">이 전
                </a-button>
                <a-button v-if="step < 3" type="primary" @click="nextStep">다음
                </a-button>
                <a-button v-if="step === 3" type="primary" @click="openPopup()">신 청
                </a-button>
            </div>
        </div>
    </div>
</template>
<script >
import { reactive, ref, watch, computed } from "vue";
import {
    CheckOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons-vue";
import moment from "moment";
import { notification } from "ant-design-vue";
import bizTypeList from "../../constants/facilityBizType";
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
    DxRequiredRule,
    DxAsyncRule
} from "devextreme-vue/data-grid";
import { DxButton } from "devextreme-vue/button";
import imgUpload from "../../components/UploadImage.vue";
import CustomDatepicker from "../../components/CustomDatepicker.vue";
import selectBank from "../../components/selectBank.vue";
import postCode from "../../components/postCode.vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "../../graphql/mutations/RqContract/index";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import queries from "../../graphql/queries/common/index";
dayjs.extend(weekday);
dayjs.extend(localeData);
import { message } from 'ant-design-vue';
import DxTextBox from "devextreme-vue/text-box";
import {
    DxValidator,
    DxCompareRule,
    DxPatternRule,
    DxStringLengthRule,
} from "devextreme-vue/validator";
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
        DxRequiredRule,
        DxCompareRule,
        DxValidator,
        DxPatternRule,
        DxTextBox,
        DxStringLengthRule,
        DeleteOutlined,
        DxAsyncRule
    },
    data() {
        return {
            textIDNo: "법인등록번호",
            radio: "",
            states: bizTypeList,
            titleModal: "사업자등록증",
            plainOptions: [
                {
                    label: "신청합니다",
                    value: 1
                }, {
                    label: "신청하지않습니다",
                    value: 2
                }
            ],
            imageId: null
        };
    },
    computed: {
    },
    setup() {
        const step = ref(0);
        const monthFormat = 'YYYY/MM';
        const disableFormVal = ref(false)
        const disableFormVal2 = ref(false)
        const initialFormState = {
            terms: false,
            personalInfo: false,
            accountingService: false,
            withholdingService: false,
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
            capacityHolding: null,
            withholdingServiceTypes: 1,
            bankType: "",
            accountNumber: "",
            ownerBizNumber: "",
            withdrawDay: "매월 5일",
            salesRepresentativeId: 1,
            comment: "",
            ownerName: "",
        };
        const contractCreacted = reactive({
            ...initialFormState
        });
        const dataInputCallApi = reactive({
            dossier: 1,
            applicationService: 1,
        })
        var visibleModal = ref(false);
        const listDataConvert = ref(Array());
        const valueFacilityBusinesses = ref([]);
        const imagestep = ref("");
        const imageValue = ref("");
        const fileName = ref("");
        const fileNamestep = ref("");
        const removeImg = () => {
            imageValue.value = "";
            fileName.value = "";
        };
        const removeImgStep = () => {
            imagestep.value = "";
            fileNamestep.value = "";
        };
        const {
            mutate: Creat,
            loading: signinLoading,
            onDone: signinDone,
            onError: onError,
        } = useMutation(mutations.creactContract, () => ({
            variables: {
                ...contractCreacted,
                facilityBusinesses: listDataConvert.value,
            },
        }));
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
            required: "이항목은 필수 입력사항입니다!",
            types: {
                email: "이메일 형식이 정확하지 않습니다",
                mobilePhone: "이메일 형식이 정확하지 않습니다",
                number: "Numeric only!",
            },
            number: {
                range: "${label} must be between ${min} and ${max}",
            },
        };
        const onFinish = (values) => { 
        };
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const disableForm1 = () => {
            if (dataInputCallApi.dossier == 2) {
                disableFormVal2.value = true
            } else {
                disableFormVal2.value = false
            }
        }
        const disableForm2 = () => {
            if (dataInputCallApi.applicationService == 2) {
                disableFormVal.value = true
            } else {
                disableFormVal.value = false
            }
        }
        const { result: resultConfig, refetch: refetchConfig } = useQuery(
            queries.getSaleRequestContact,
            {},
            () => ({
                fetchPolicy: "no-cache",
            })
        );
        const optionSale = ref()
        watch(resultConfig, (value) => {
            let dataOption = []
            value.getSalesRepresentativesForPublicScreen.map((e) => {
                dataOption.push({
                    label: e.name,
                    value: e.id
                })
            })
            optionSale.value = dataOption
        });
        watch(valueFacilityBusinesses, (value) => { 
        });
        const statusMailValidate = ref(false)
        const validateEmail = () => {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(contractCreacted.email) == false)
                statusMailValidate.value = true;
            else
                statusMailValidate.value = false;
        }
        // all Computed 
        const checkStepTwo = computed(() => {
            if (step.value === 0) {
                return "wait";
            } else if (step.value === 1) {
                return "process";
            } else {
                return "finish";
            }
        });
        const checkStepThree = computed(() => {
            if (step.value < 2) {
                return "wait";
            } else if (step.value === 2) {
                return "process";
            } else {
                return "finish";
            }
        });
        const checkStepFour = computed(() => {
            if (step.value < 3) {
                return "wait";
            } else if (step.value === 3) {
                return "process";
            } else {
                return "finish";
            }
        });
        const changeValueInputEmit = computed((data) => {
            if (data.name == "nameCompany") {
                //dataSearch.nameCompany = data.value;
            }
        });
        const changeStep = (val) => {
            if (val == 1) {
                step.value = 0
            }
            if (val == 2
                && contractCreacted.terms == true
                && contractCreacted.personalInfo == true
                && contractCreacted.accountingService == true
                && contractCreacted.withholdingService == true) {
                step.value = 1
                window.scrollTo(0, 0);
            }
            if (val == 3
                && contractCreacted.terms == true
                && contractCreacted.personalInfo == true
                && contractCreacted.accountingService == true
                && contractCreacted.withholdingService == true
                && contractCreacted.nameCompany != ""
                && contractCreacted.bizNumber != ""
                && contractCreacted.zipcode != ""
                && contractCreacted.namePresident != ""
                && contractCreacted.birthday != ""
                && contractCreacted.mobilePhone != ""
                && contractCreacted.email != ""
                && contractCreacted.phone != ""
                && contractCreacted.bizNumber.length == 10
                && statusMailValidate.value == false
            ) {
                step.value = 2
                window.scrollTo(0, 0);
            }
            if (val == 4
                && contractCreacted.terms == true
                && contractCreacted.personalInfo == true
                && contractCreacted.accountingService == true
                && contractCreacted.withholdingService == true
                && contractCreacted.nameCompany != ""
                && contractCreacted.bizNumber != ""
                && contractCreacted.zipcode != ""
                && contractCreacted.namePresident != ""
                && contractCreacted.birthday != ""
                && contractCreacted.mobilePhone != ""
                && contractCreacted.email != ""
                && contractCreacted.phone != ""
                && contractCreacted.bizNumber.length == 10
                && statusMailValidate.value == false
            ) {
                if (dataInputCallApi.dossier == 2 && dataInputCallApi.applicationService == 2) { 
                } else {
                    let count = 0
                    if (dataInputCallApi.dossier == 1) {
                        if (valueFacilityBusinesses.length == 0
                            || contractCreacted.longTermCareInstitutionNumber == ''
                        ) {
                            count++
                        }
                    }
                    if (dataInputCallApi.applicationService == 1) {
                        if (contractCreacted.bankType == ''
                            || contractCreacted.accountNumber == ''
                            || contractCreacted.ownerName == ''
                            || contractCreacted.ownerBizNumber == ''
                        ) {
                            count++
                        }
                    }
                    if (count == 0) { 
                        step.value = 3
                        window.scrollTo(0, 0);
                    } 
                }
            }
        }
        const pagePass = reactive(0)
        return {
            pagePass,
            changeStep,
            statusMailValidate,
            validateEmail,
            optionSale,
            disableFormVal,
            disableFormVal2,
            disableForm2,
            dataInputCallApi,
            disableForm1,
            contractCreacted,
            Creat,
            valueFacilityBusinesses,
            openNotificationWithIcon,
            signinDone,
            onError,
            visibleModal,
            validateMessages,
            onFinish,
            layout,
            listDataConvert,
            step,
            imagestep,
            removeImg,
            imageValue,
            fileName,
            fileNamestep,
            removeImgStep,
            monthFormat,
            checkStepTwo,
            checkStepThree,
            checkStepFour,
            changeValueInputEmit
        };
    },
    watch: {
        "contractCreacted.longTermCareInstitutionNumber"(newVal) {
            if (this.listDataConvert.length > 0) {
                this.listDataConvert.forEach((item) => {
                    item.longTermCareInstitutionNumber = newVal;
                });
            }
        },
        "contractCreacted.registrationCardFileStorageId"(newVal) {
            if (this.listDataConvert.length > 0) {
                this.listDataConvert.forEach((item) => {
                    item.registrationCardFileStorageId = newVal;
                });
            }
        },
        registrationCardFileStorageId(newVal) {
            if (this.listDataConvert.length > 0) {
                this.listDataConvert.forEach((item) => {
                    item.registrationCardFileStorageId = newVal;
                });
            }
        },
        valueFacilityBusinesses: {
            handler(newVal) {
                this.listDataConvert = [];
                newVal.forEach((item) => {
                    this.listDataConvert.push({
                        longTermCareInstitutionNumber:
                            this.contractCreacted.longTermCareInstitutionNumber,
                        facilityBizType: item?.facilityBizType,
                        name: item?.name,
                        startYearMonth: dayjs(item?.startYearMonth).format("YYYY/MM/DD"),
                        capacity: parseInt(item?.capacity),
                        registrationCardFileStorageId:
                            this.contractCreacted.registrationCardFileStorageId,
                    });
                });
                var result = Object.values(newVal.reduce((c, v) => {
                    let k = v.name;
                    c[k] = c[k] || [];
                    c[k].push(v);
                    return c;
                }, {})).reduce((c, v) => v.length > 1 ? c.concat(v) : c, []);
                if (result.length > 0) {
                    message.error("중복되었습니다!")
                }
            },
            deep: true,
        },
    },
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
            if (this.contractCreacted.bizType == 1) {
                this.textIDNo = "주민등록번호";
            } else {
                this.textIDNo = "법인등록번호";
            }
        },
        prevStep() {
            this.step--;
        },
        nextStep() {
            if (this.step == 0) {
                if (this.contractCreacted.terms == true && this.contractCreacted.personalInfo == true && this.contractCreacted.accountingService == true && this.contractCreacted.withholdingService == true) {
                    this.step++;
                    window.scrollTo(0, 0);
                } else {
                    message.error("계속하려면 모든 조건을 수락하십시오!")
                }
            } else if (this.step == 1) {
                if (this.contractCreacted.nameCompany != ""
                    && this.contractCreacted.bizNumber != ""
                    && this.contractCreacted.zipcode != ""
                    && this.contractCreacted.namePresident != ""
                    && this.contractCreacted.birthday != ""
                    && this.contractCreacted.mobilePhone != ""
                    && this.contractCreacted.email != ""
                    && this.contractCreacted.phone != ""
                    && this.contractCreacted.bizNumber.length == 10
                    && this.statusMailValidate == false
                ) {
                    this.step++;
                    window.scrollTo(0, 0);
                } else {
                    message.error("계속하려면 모든 조건을 수락하십시오")
                }
            } else if (this.step == 2) {
                if (this.dataInputCallApi.dossier == 2 && this.dataInputCallApi.applicationService == 2) {
                    message.success('Vui lòng chọn sử dụng ít nhất 1 dịch vụ    ')
                } else {
                    let count = 0
                    if (this.dataInputCallApi.dossier == 1) {
                        if (this.valueFacilityBusinesses.length == 0
                            || this.contractCreacted.longTermCareInstitutionNumber == ''
                        ) {
                            count++
                        }
                    }
                    if (this.dataInputCallApi.applicationService == 1) {
                        if (this.contractCreacted.bankType == ''
                            || this.contractCreacted.accountNumber == ''
                            || this.contractCreacted.ownerName == ''
                            || this.contractCreacted.ownerBizNumber == ''
                        ) {
                            count++
                        }
                    }
                    if (count > 0) {
                        message.error('계속하려면 모든 조건을 수락하십시오!')
                    } else {
                        this.step++;
                        window.scrollTo(0, 0);
                    }
                }
            }
        },
        openPopup() {
            let countNull = 0;
            if (countNull > 0) {
                notification["error"]({
                    message: "필수 항목을 입력하십시오",
                });
            } else {
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
        },
        getImgUrlAccounting(img) {
            this.imagestep = img.url;
            this.fileNamestep = img.fileNamestep;
            this.contractCreacted.registrationCardFileStorageId = img;
        },
        getIDBank(data) {
            this.contractCreacted.bankType = data;
        },
        passwordComparison() {
            return this.password;
        },
        validateNumber(key) {
            if (key == 'longTermCareInstitutionNumber') {
                let e = this.contractCreacted.longTermCareInstitutionNumber
                this.contractCreacted.longTermCareInstitutionNumber = e.replace(/\D/g, '');
            }
            if (key == 'accountNumber') {
                let e = this.contractCreacted.accountNumber
                this.contractCreacted.accountNumber = e.replace(/\D/g, '');
            }
            if (key == 'accountNumber') {
                let e = this.contractCreacted.ownerBizNumber
                this.contractCreacted.ownerBizNumber = e.replace(/\D/g, '');
            }
            if (key == 'phone') {
                let e = this.contractCreacted.phone
                this.contractCreacted.phone = e.replace(/\D/g, '');
            }
            if (key == 'fax') {
                let e = this.contractCreacted.fax
                this.contractCreacted.fax = e.replace(/\D/g, '');
            }
            if (key == 'mobilePhone') {
                let e = this.contractCreacted.mobilePhone
                this.contractCreacted.mobilePhone = e.replace(/\D/g, '');
            }
        },
    },
};
</script>
<style lang="scss" scoped src="./style.scss">
</style>
