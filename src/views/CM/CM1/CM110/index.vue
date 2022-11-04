<template>
    <a-spin :spinning="spinning || loadData || loadingSeal" size="large">
        <div id="cm-110" class="page-content">
            <a-tabs v-model:activeKey="activeKey" type="card">
                <a-tab-pane key="1" tab="사업자">
                    <div class="container">
                        <a-form :model="formState" :label-col="labelCol">
                            <h2 class="title-h2">사업자정보</h2>
                            <a-form-item label="상호">
                                <a-input v-model:value="formState.name" :disabled="true" style="width: 300px" />
                            </a-form-item>
                            <div class="dflex">
                                <div>
                                    <a-form-item label="사업자유형">
                                        <a-input v-model:value="formState.bizType" :disabled="true"
                                            style="width: 120px" />
                                    </a-form-item>
                                </div>
                                <div style="margin-left: 200px;">
                                    <a-form-item label="사업자번호">
                                        <a-input v-model:value="formState.bizNumber" :disabled="true"
                                            style="width: 176px" />
                                    </a-form-item>
                                </div>
                            </div>
                            <a-form-item label="주소">
                                <a-input v-model:value="formState.address" :disabled="true" style="width: 647px" />
                            </a-form-item>
                            <div class="dflex">
                                <div class="dflex">
                                    <a-form-item label="대표번호">
                                        <a-input v-model:value="formState.presidentMobilePhone"
                                            @change="validateNumber('presidentMobilePhone')"
                                            @keyup="validateNumber('presidentMobilePhone')" style="width: 150px;" />
                                    </a-form-item>
                                    <p class="validate-message" style="width: 121px;line-height: 29px;">‘-’없이 숫자만 입력</p>
                                </div>
                                <div style="display: flex">
                                    <a-form-item label="팩스번호">
                                        <a-input v-model:value="formState.extendInfo.detail.fax" style="width: 150px;"
                                            @keyup="validateNumber('fax')" @change="validateNumber('fax')" />
                                    </a-form-item>
                                    <p class="validate-message" style="width: 121px;line-height: 29px;">‘-’없이 숫자만 입력</p>
                                </div>
                            </div>
                            <h2 class="title-h2">직인등록</h2>
                            <a-row>
                                <a-col :span="24">
                                    <a-row>
                                        <a-col :span="6">
                                            <a-form-item label="직인(인감)" style="margin-bottom: 5px;">
                                                <a-image :width="100" :src="previewImage" :preview="true"
                                                    fallback="data:image/png;base64,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" />
                                            </a-form-item>
                                        </a-col>
                                        <a-col :span="14">
                                            <div class="preview-image">
                                                <a-row>
                                                    <a-col :span="5">
                                                        <a-button type="primary" @click="stampReview">직인자동생성</a-button>
                                                    </a-col>
                                                    <a-col :span="16">
                                                        <InfoCircleFilled />
                                                        <a-typography-text>
                                                            직인 이미지를 자동으로 생성하여 등록합니다.
                                                        </a-typography-text>
                                                    </a-col>
                                                </a-row>
                                            </div>
                                        </a-col>
                                    </a-row>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="24">
                                    <a-row>
                                        <a-col :span="6">
                                            <a-upload v-model:file-list="fileList" name="file" :headers="headers"
                                                @change="handleChange" :multiple="false" :showUploadList="false"
                                                accept=".png,.jpeg,.jpg">
                                                <a-button class="btn-upload-image">직인업로드</a-button>
                                            </a-upload>
                                        </a-col>
                                        <a-col :span="14" :xl="14">
                                            <InfoCircleFilled />
                                            <a-typography-text>
                                                이미지 사이즈 : 100 x 100 이하 / 파일크기 : 1M 이하 /
                                                종류 : GIF, JPG, PNG
                                            </a-typography-text>
                                        </a-col>
                                    </a-row>
                                </a-col>
                            </a-row>
                            <h2 class="title-h2">대표자정보</h2>
                            <div class="dflex">
                                <div>
                                    <a-form-item label="대표자명">
                                        <a-input v-model:value="formState.extendInfo.president.name" :disabled="true"
                                            style="width: 176px" />
                                    </a-form-item>
                                </div>
                                <div style="display: flex; margin-left: 150px;">
                                    <a-form-item label="휴대폰">
                                        <a-input v-model:value="formState.extendInfo.detail.phone" style="width: 150px;"
                                            @keyup="validateNumber('phone')" @change="validateNumber('phone')" />
                                    </a-form-item>
                                    <p class="validate-message" style="width: 121px;line-height: 29px;">‘-’없이 숫자만 입력</p>
                                </div>
                            </div>
                            <div class="dflex">
                                <a-form-item label="생년월일" style="width: 327px;">  
                                    <a-date-picker v-model:value="formState.extendInfo.president.birthday" value-format="YYYY-MM-DD"
                                        placeholder="" />
                                </a-form-item>
                                <p class="validate-message">
                                    ‘-’없이 8자리 숫자로 입력하세요. ( 자릿수 : 연4 월2 일2 )
                                </p>
                            </div>
                            <div class="dflex">
                                <a-form-item label="이메일">
                                    <a-input v-model:value="formState.extendInfo.president.email" style="width: 300px"
                                        @change="validateEmail"
                                        :style="!statusMailValidate ? { borderColor: 'red' } : ''" />
                                </a-form-item>
                                <p class="validate-message" v-if="!statusMailValidate">
                                    이메일 형식이 정확하지 않습니다.
                                </p>
                            </div>
                        </a-form>
                    </div>
                    <a-form-item class="btn-submit">
                        <a-button type="primary" @click="onSubmit">저장</a-button>
                    </a-form-item>
                    <ReviewStampImage :modalStatus="modalStampReviewStatus" @closePopup="modalStampReviewStatus = false"
                        :data="fileImage" :previewImageCall="previewImage" @urlSeal="changeSealUrl" />
                </a-tab-pane>
                <a-tab-pane key="2" tab="이용자">
                    <DxDataGrid :data-source="resultDataUsers.getMyCompanyUsers.datas" :show-borders="true"
                        key-expr="id" :allow-column-reordering="true" :allow-column-resizing="true"
                        :column-auto-width="true" style="width: 100%;">
                        <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                        <DxExport :enabled="true" :allow-export-selected-data="true" />
                        <DxToolbar>
                            <DxItem name="searchPanel" />
                            <DxItem name="exportButton" />
                            <DxItem location="after" template="button-template" css-class="cell-button-add" />
                            <DxItem name="groupPanel" />
                            <DxItem name="addRowButton" show-text="always" />
                            <DxItem name="columnChooserButton" />
                        </DxToolbar>
                        <template #button-template>
                            <DxButton icon="plus" @click="openAddNewModal" />
                        </template>
                        <DxColumn caption="이용자ID" data-field="username" :width="200" />
                        <DxColumn caption="상태" data-field="active" cell-template="tag-status" css-class="cell-center"
                            :width="150" />
                        <template #tag-status="{ data }">
                            <a-tag :color="getColorTag(data.value)">
                                {{ data.value == true ? "이용중" : "이용중지" }}
                            </a-tag>
                        </template>
                        <DxColumn caption="성명" data-field="name" :width="200" />
                        <DxColumn caption="회계권한(담당사업)" data-field="facilityBusinesses"
                            cell-template="checked-facility" />
                        <template #checked-facility="{ data }">
                            {{ changeValueRow(data.value) }}
                        </template>
                        <DxColumn data-field="withholdingRole" caption="원천권한" cell-template="checked-status" :width="80"
                            :allowEditing="true" />
                        <template #checked-status="{ data }">
                            <div style="width: 14px;height: 14px;background-color: black; margin: 0 auto; margin-top: 7px;"
                                v-if="data.value == true">
                            </div>
                            <div style="width: 14px;height: 14px;background-color: white; border: 1px solid black; margin: 0 auto; margin-top: 7px;"
                                v-else>
                            </div>
                        </template>
                        <DxColumn :width="80" cell-template="pupop" />
                        <template #pupop="{ data }" class="custom-action">
                            <div class="custom-action">
                                <a-space :size="10">
                                    <a-tooltip placement="top">
                                        <template #title>편집</template>
                                        <EditOutlined @click="openEditModal(data)" />
                                    </a-tooltip>
                                    <a-tooltip placement="top">
                                        <template #title>변경이력</template>
                                        <HistoryOutlined @click="modalHistory(data)" />
                                    </a-tooltip>
                                    <a-tooltip placement="top">
                                        <template #title>로그인이력</template>
                                        <login-outlined @click="modalLogin(data)" />
                                    </a-tooltip>
                                </a-space>
                            </div>
                        </template>
                    </DxDataGrid>
                    <div class="pagination-table" v-if="rowTable > dataGetListUsers.filter.rows">
                        <a-pagination v-model:current="dataGetListUsers.filter.page"
                            v-model:page-size="dataGetListUsers.filter.rows" :total="rowTable" show-less-items />
                    </div>
                    <a-form-item class="btn-submit-table">
                        <a-button type="primary" @click="onSubmit">저장</a-button>
                    </a-form-item>
                </a-tab-pane>
            </a-tabs>
            <AddNewCM110Poup :modalStatus="modalAddNewStatus" :data="popupData" @closePopup="closePopupAdd" />
            <EditCM110Popup :modalStatus="modalEditStatus" @closePopup="closePopupEdit" :data="popupData" />
            <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
                title="변경이력" :idRowEdit="idRowEdit" typeHistory="cm-110" :companyId="companyIdPopup" />
            <ListLoginPopup :modalStatus="modalLoginStatus" @closePopup="modalLoginStatus = false"
                :data="popupDataLogin" title="로그인이력" typeHistory="cm-110" :companyId="companyIdPopup" />
        </div>
    </a-spin>
</template>
<script lang="ts">
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel,
    DxToolbar,
    DxEditing,
    DxGrouping,
    DxScrolling,
    DxItem
} from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import AddNewCM110Poup from "./components/AddNewCM110Poup.vue";
import EditCM110Popup from "./components/EditCM110Popup.vue"
import HistoryPopup from "../../../../components/HistoryPopup.vue";
import inputFormat from '../../../../components/inputBoxFormat.vue';
import { defineComponent, ref } from "vue";
import { InfoCircleFilled, EditOutlined, HistoryOutlined, LoginOutlined } from "@ant-design/icons-vue";
import ReviewStampImage from "./components/ReviewStampImage.vue";
import ListLoginPopup from "../../../../components/ListLoginPopup.vue";
import type { UploadProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import mutations from "../../../../graphql/mutations/CM/CM110/index";
import { useQuery } from "@vue/apollo-composable";
import queries from "../../../../graphql/queries/CM/CM110/index"
import { useMutation } from "@vue/apollo-composable";
import { getJwtObject } from "@bankda/jangbuda-common";
import { companyId } from "../../../../helpers/commonFunction"
function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
export default defineComponent({
    components: {
        InfoCircleFilled,
        LoginOutlined,
        EditOutlined,
        HistoryOutlined,
        ReviewStampImage,
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxExport,
        DxSelection,
        DxSearchPanel,
        DxToolbar,
        DxEditing,
        DxGrouping,
        DxScrolling,
        DxButton,
        DxItem,
        HistoryPopup,
        AddNewCM110Poup,
        EditCM110Popup,
        ListLoginPopup,
        inputFormat,
        getJwtObject,
        companyId
    },
    setup() {
        const spinning = ref<boolean>(true);
        let modalAddNewStatus = ref(false);
        let modalEditStatus = ref(false);
        let modalHistoryStatus = ref(false);
        let modalLoginStatus = ref(false);
        let popupData = ref();
        var idRowEdit = ref<number>(0)
        var companyIdPopup = ref<number>(0)
        const popupDataLogin = ref()
        setTimeout(() => {
            spinning.value = !spinning.value;
        }, 1000);
        const {
            mutate: updateDataCompany,
            loading: loadingUpdate,
            onDone: onDoneAdd,
            onError: onErrorUpdate
        } = useMutation(mutations.updateCompany);
        onDoneAdd((res) => {
            spinning.value = !spinning.value;
            message.success(`업데이트 완료되었습니다!`);
        })
        onErrorUpdate((res) => {
            spinning.value = !spinning.value;
            message.error(`업데이트 실패되었습니다!`);
        })
        const statusMailValidate = ref<boolean>(true);
        let formState = ref({
            name: "",
            bizType: "",
            bizNumber: "",
            address: "",
            presidentMobilePhone: "",
            fax: "",
            직인인감:
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            extendInfo: {
                president: {
                    name: "",
                    birthday: "",
                    mobilePhone: "",
                    email: "",
                },
                detail: {
                    name: "",
                    zipcode: "",
                    roadAddress: "",
                    jibunAddress: "",
                    addressExtend: "",
                    addressDetail: {},
                    phone: "",
                    fax: "",
                    licenseFileStorageId: 0
                }
            },
            sealFileStorageId: null
        });
        let listDataMyCompanyUser = ref([])
        let previewImage: any = ref("https://jangbuda-frs.bankda.com/uFH4PK0U2Ar9sTYIqp0AV.png");
        let fileImage: any = ref(null);
        let modalStampReviewStatus: any = ref();
        const fileList = ref<UploadProps['fileList']>([]);
        const handleChange = async (info: any) => {
            if (info.file.status !== "uploading") {
                if (info.file.originFileObj.size <= 1000000) {
                    previewImage.value = await getBase64(info.file.originFileObj);
                    fileImage.value = info;
                    changeSealUrl(previewImage.value.replace('data:image/png;base64,', ''))
                } else {
                    message.error(`이미지 사이즈 : 100 x 100 이하 / 파일크기 : 1M 이하 / 종류 : GIF, JPG, PNG`);
                }
            }
            // if (info.file.status === "done") {
            //   //message.success(`${info.file.name} file uploaded successfully`);
            // } else if (info.file.status === "error") {
            //   //console.log(info.file);
            //   //message.error(`${info.file.name} file upload failed.`);
            // }
        };
        const stampReview = () => {
            modalStampReviewStatus.value = true;
        };
        const openAddNewModal = () => {
            popupData.value = {
                companyId: companyId
            };
            modalAddNewStatus.value = true;
        }
        const openEditModal = (data: any) => {
            modalEditStatus.value = true;
            popupData.value = {
                userId: data.data.id,
                companyId: companyId
            };
        }
        const modalHistory = (data: any) => {
            // console.log(companyId);
            idRowEdit.value = data.data.id
            companyIdPopup.value = companyId
            modalHistoryStatus.value = true;
        }
        const modalLogin = (data: any) => {
            popupDataLogin.value = {
                companyId: companyId,
                userId: data.data.id
            }
            modalLoginStatus.value = true;
        }
        let companyId: any = null
        const token = sessionStorage.getItem("token");
        if (token) {
            const jwtObject = getJwtObject(token);
            if (jwtObject.userType === 'c') {
                companyId = jwtObject.companyId
            }
        }
        //Submit form detail company
        const onSubmit = () => {
            if (statusMailValidate.value == true) {
                let dataUpdateCompany = {
                    companyId: companyId,
                    input: {
                        phone: formState.value.extendInfo.detail.phone,
                        fax: formState.value.extendInfo.detail.fax,
                        sealFileStorageId: formState.value.sealFileStorageId,
                        presidentMobilePhone: formState.value.presidentMobilePhone,
                        presidentEmail: formState.value.extendInfo.president.email,
                        presidentBirthday: formState.value.extendInfo.president.birthday
                    }
                }
                spinning.value = !spinning.value;
                updateDataCompany(dataUpdateCompany)
            } else {
                message.error('이메일형식이 정확하지 않습니다.')
            }
        };
        const getColorTag = (data: boolean) => {
            if (data === true) {
                return "rgb(16 142 236 / 62%)";
            } else if (data === false) {
                return "rgb(205 32 31 / 51%)";
            }
        }
        const validateNumber = (name: String) => {
            if (name == 'presidentMobilePhone' && formState.value.presidentMobilePhone.length > 0) {
                let e = formState.value.presidentMobilePhone
                formState.value.presidentMobilePhone = e.replace(/\D/g, '');
            }
            if (name == 'fax' && formState.value.extendInfo.detail.fax.length > 0) {
                let e = formState.value.extendInfo.detail.fax
                formState.value.extendInfo.detail.fax = e.replace(/\D/g, '');
            }
            if (name == 'phone' && formState.value.extendInfo.detail.phone.length > 0) {
                let e = formState.value.extendInfo.detail.phone.replace(/\D/g, '');
                formState.value.extendInfo.detail.phone = e
            }
        }
        const validateEmail = (e: any) => {
            let checkMail = e.target.value.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
            if (!checkMail) {
                statusMailValidate.value = false;
            } else {
                statusMailValidate.value = true;
            }
        }
        const originData = {
            companyId: companyId
        }
        const { refetch: refetchData, loading, error, onResult } = useQuery(queries.getDataDetail, originData, () => ({ fetchPolicy: "no-cache", }))
        onResult((res) => {
            if (res.data.getMyCompany.seal) {
                previewImage.value = res.data.getMyCompany.seal.url
            }
            formState.value = {
                ...res.data.getMyCompany,
                bizType: res.data.getMyCompany.bizType == 1 ? "법인사업자" : "개인사업자"
            }
        })
        const dataGetListUsers = ref({
            companyId: companyId,
            filter: {
                page: 1,
                rows: 20
            }
        })
        const rowTable = ref(0)
        const { refetch: refetchDataUsers, onResult: resultUsers, result: resultDataUsers, loading: loadData } = useQuery(queries.getListUserCompany, dataGetListUsers.value, () => ({ fetchPolicy: "no-cache", }))
        resultUsers((res) => {
            rowTable.value = res.data.getMyCompanyUsers.totalCount
        })
        const {
            mutate: callSaveSeal,
            loading: loadingSeal,
            onDone: onDoneSeal,
            onError: onErrorSeal
        } = useMutation(mutations.createMyCompanyAutoGeneratedSeal);
        onDoneSeal(e => {
            formState.value.sealFileStorageId = e.data.createMyCompanyAutoGeneratedSeal
        })
        onErrorSeal(e => {
            message.error(`봉인을 만드는 동안 오류가 발생했습니다.`)
        })
        const changeSealUrl = (data: any) => {
            previewImage.value = 'data:image/png;base64,' + data
            let dataCallApi = {
                companyId: companyId,
                seal: data
            }
            callSaveSeal(dataCallApi)
        }
        const changeDate = (data: any) => {
            formState.value.extendInfo.president.birthday = data
        }
        return {
            labelCol: { style: { width: "150px" } },
            formState,
            onSubmit,
            activeKey: ref("1"),
            fileList,
            headers: {
                authorization: "authorization-text",
            },
            loadData,
            resultUsers,
            refetchDataUsers,
            resultDataUsers,
            spinning,
            handleChange,
            previewImage,
            stampReview,
            modalStampReviewStatus,
            fileImage,
            modalAddNewStatus,
            modalEditStatus,
            modalHistoryStatus,
            modalLoginStatus,
            openAddNewModal,
            openEditModal,
            modalHistory,
            modalLogin,
            popupData,
            getColorTag,
            validateNumber,
            validateEmail,
            statusMailValidate,
            listDataMyCompanyUser,
            updateDataCompany,
            companyId,
            idRowEdit,
            companyIdPopup,
            popupDataLogin,
            dataGetListUsers,
            rowTable,
            changeSealUrl,
            loadingSeal,
            changeDate
        };
    },
    methods: {
        // Convert FacilityBizType
        changeValueRow(data: any) {
            let stringConvert = ''
            data.map((e: any, index: any) => {
                if (index + 1 != data.length)
                    stringConvert += e.name + ' '
                else
                    stringConvert += e.name
            })
            return stringConvert
        },
        closePopupEdit() {
            this.modalEditStatus = false
            this.refetchDataUsers()
        },
        closePopupAdd() {
            this.modalAddNewStatus = false
            this.refetchDataUsers()
        },
    },
});
</script>
<style lang="scss" scoped src="./style.scss">

</style>
