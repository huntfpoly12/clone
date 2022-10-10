<template>
    <a-spin :spinning="spinning" size="large">
        <div id="cm-110" class="page-content">
            <a-tabs v-model:activeKey="activeKey" type="card">
                <a-tab-pane key="1" tab="사업자">
                    <div class="container">
                        <a-form :model="formState" :label-col="labelCol">
                            <h2 class="title-h2">사업자정보</h2>
                            <a-form-item label="상호">
                                <a-input v-model:value="formState.name" :disabled="true" style="width: 300px" />
                            </a-form-item>
                            <div style="display: flex;">
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
                            <div style="display: flex;">
                                <div style="display: flex;">
                                    <a-form-item label="대표번호">
                                        <a-input v-model:value="formState.presidentMobilePhone" />
                                    </a-form-item>
                                    <p class="validate-message" style="width: 121px;">‘-’없이 숫자만 입력</p>
                                </div>
                                <div style="display: flex; margin-left: 19px;">
                                    <a-form-item label="팩스번호">
                                        <a-input v-model:value="formState.extendInfo.detail.fax" />
                                    </a-form-item>
                                    <p class="validate-message" style="width: 121px;">‘-’없이 숫자만 입력</p>
                                </div>
                            </div>
                            <h2 class="title-h2">직인등록</h2>
                            <a-row>
                                <a-col :span="24">
                                    <a-row>
                                        <a-col :span="6">
                                            <a-form-item label="직인(인감)" style="margin-bottom: 5px;">
                                                <a-image :width="100" :src="previewImage" :preview="false"
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
                            <div style="display: flex;">
                                <div>
                                    <a-form-item label="대표자명">
                                        <a-input v-model:value="formState.extendInfo.president.name" :disabled="true"
                                            style="width: 176px" />
                                    </a-form-item>
                                </div>

                                <div style="display: flex; margin-left: 150px;">
                                    <a-form-item label="휴대폰">
                                        <a-input v-model:value="formState.extendInfo.president.mobilePhone" />
                                    </a-form-item>
                                    <p class="validate-message" style="width: 121px;">‘-’없이 숫자만 입력</p>
                                </div>
                            </div>
                            <div style="display: flex;">
                                <a-form-item label="생년월일">
                                    <a-input v-model:value="formState.extendInfo.president.birthday" />
                                </a-form-item>
                                <p class="validate-message">
                                    ‘-’없이 8자리 숫자로 입력하세요. ( 자릿수 : 연4 월2 일2 )
                                </p>
                            </div>
                            <div style="display: flex;">
                                <a-form-item label="이메일">
                                    <a-input v-model:value="formState.extendInfo.president.email" style="width: 300px"
                                        @change="validateEmail"
                                        :style="!statusMailValidate ? { borderColor: 'red'}: ''" />
                                </a-form-item>
                                <p class="validate-message" v-if="!statusMailValidate">
                                    이메일 형식이 정확하지 않습니다.
                                </p>
                            </div>
                        </a-form>
                    </div>
                    <a-form-item class="btn-submit">
                        <a-button type="primary" @click="onSubmit">그냥 나가기</a-button>
                        <a-button style="margin-left: 10px">저장하고 나가기</a-button>
                    </a-form-item>
                    <ReviewStampImage :modalStatus="modalStampReviewStatus" @closePopup="modalStampReviewStatus = false"
                        :data="fileImage" />
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

                        <!-- <DxColumn caption="성명" data-field="name" :width="200" cell-template="checked-facility" /> -->
                        <!-- <DxColumn data-field="name" caption="회계권한(담당사업)" cell-template="checked-facility" /> -->

                        <DxColumn caption="성명" data-field="facilityBusinesses" cell-template="checked-facility" />
                        <template #checked-facility="{ data }">
                            <!-- {{ changeValueRow(data.value[0].facilityBusinessId) }} -->
                            {{ changeValueRow(data.value) }}
                        </template>

                        <DxColumn data-field="withholdingRole" caption="원천권한" cell-template="checked-status" :width="80"
                            :allowEditing="true" />
                        <template #checked-status="{ data }">
                            <a-checkbox :checked="data" @change="checkedRow(data)" />
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

                    <a-form-item class="btn-submit-table">
                        <a-button type="primary" @click="onSubmit">그냥 나가기</a-button>
                        <a-button style="margin-left: 10px">저장하고 나가기</a-button>
                    </a-form-item>

                    <AddNewCM110Poup :modalStatus="modalAddNewStatus" @closePopup="modalAddNewStatus = false" />

                    <EditCM110Popup :modalStatus="modalEditStatus" @closePopup="closePopupEdit"
                        :data="popupData" />

                    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                        :data="popupData" title="변경이력[cm-000-pop]" />
                    <ListLoginPopup :modalStatus="modalLoginStatus" @closePopup="modalLoginStatus = false"
                        :data="popupData" title="로그인이력 [ cm-000-popLogin ]" />
                </a-tab-pane>
            </a-tabs>
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

import { defineComponent, ref, toRaw, reactive } from "vue";
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
        getJwtObject
    },
    setup() {
        const spinning = ref<boolean>(true);
        let modalAddNewStatus = ref(false);
        let modalEditStatus = ref(false);
        let modalHistoryStatus = ref(false);
        let modalLoginStatus = ref(false);
        let popupData = ref();

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
            message.success(`Update successfully`);
        })

        onError: onErrorUpdate((res) => {
            spinning.value = !spinning.value;
            message.error(`Update false`);
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
        });

        let listDataMyCompanyUser = ref([])

        let previewImage: any = ref("");
        let fileImage: any = ref(null);
        let modalStampReviewStatus: any = ref();
        const fileList = ref<UploadProps['fileList']>([]);

        const handleChange = async (info: any) => {
            if (info.file.status !== "uploading") {
                if (info.file.originFileObj.size <= 1000000) {
                    previewImage.value = await getBase64(info.file.originFileObj);
                    fileImage.value = info;
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
            modalHistoryStatus.value = true;
            popupData.value = data;
        }
        const modalLogin = (data: any) => {
            modalLoginStatus.value = true;
            popupData.value = data;
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
            let dataUpdateCompany = {
                companyId: companyId,
                input: {
                    phone: formState.value.presidentMobilePhone,
                    fax: formState.value.extendInfo.detail.fax,
                    sealFileStorageId: 1,
                    presidentMobilePhone: formState.value.extendInfo.president.mobilePhone,
                    presidentEmail: formState.value.extendInfo.president.email,
                    presidentBirthday: formState.value.extendInfo.president.birthday
                }
            }
            spinning.value = !spinning.value;
            updateDataCompany(dataUpdateCompany)
        };

        const getColorTag = (data: boolean) => {
            if (data === true) {
                return "rgb(16 142 236 / 62%)";
            } else if (data === false) {
                return "rgb(205 32 31 / 51%)";
            }
        }

        const checkedRow = (data: any) => {
            // dataTableShow.value[data.key].원천권한 = !dataTableShow.value[data.key].원천권한;
        }

        const changeValueInputEmit = (data: { name: string; value: any; }) => {
            if (data.name == 'fax') {

            }

            switch (data.name) {
                case 'fax':
                    formState.value.fax = data.value;
                    break;
                case 'presidentMobilePhone':
                    formState.value.presidentMobilePhone = data.value;
                    break;
                default:
            }

        }
        const validateNumber = (e: any, name: string) => {
            let valNumberOnly = e.target.value.replace(/\D+/g, '');
            switch (name) {
                case 'presidentMobilePhone':
                    formState.value.presidentMobilePhone = valNumberOnly;
                    break;
                case 'fax':
                    formState.value.fax = valNumberOnly;
                    break;
                default:
                // code block
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
            formState.value = res.data.getMyCompany
        })

        const dataGetListUsers = {
            companyId: companyId,
            filter: {
                page: 1,
                rows: 10
            }
        }


        const { refetch: refetchDataUsers, onResult: resultUsers, result: resultDataUsers } = useQuery(queries.getListUserCompany, dataGetListUsers, () => ({ fetchPolicy: "no-cache", }))
        resultUsers((res) => {
            // console.log(resultDataUsers);
        })

        return {
            labelCol: { style: { width: "150px" } },
            formState,
            onSubmit,
            activeKey: ref("1"),
            fileList,
            headers: {
                authorization: "authorization-text",
            },
            resultUsers,
            refetchDataUsers,
            resultDataUsers,
            spinning,
            checkedRow,
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
            changeValueInputEmit,
            listDataMyCompanyUser,
            updateDataCompany,
            companyId,

        };

    },
    methods: {
        // Convert FacilityBizType
        changeValueRow(data: any) {
            let stringConvert = ''
            data.map((e: any) => {
                if (e.facilityBusinessId == 1)
                    stringConvert += '주·야간보호'
                else if (e.facilityBusinessId == 2)
                    stringConvert += '방문요양'
                else if (e.facilityBusinessId == 3)
                    stringConvert += '인지활동형 방문요양'
                else if (e.facilityBusinessId == 4)
                    stringConvert += '방문간호'
                else if (e.facilityBusinessId == 5)
                    stringConvert += '방문목욕'
                else if (e.facilityBusinessId == 6)
                    stringConvert += '단기보호'
                else if (e.facilityBusinessId == 7)
                    stringConvert += '복지용구'
            })
            return stringConvert
        },

        closePopupEdit(){
            this.modalEditStatus = false
            this.refetchDataUsers()
        }
    },


});
</script>
<style scoped>
.page-content>>>.cell-button-add {
    padding-left: 100px !important;
}

.page-content>>>.ant-tag {
    width: 65px;
    text-align: center;
}

.container {
    width: 1200px;
    padding-right: 10px;
    padding-left: 10px;
}

.title-h2 {
    margin-left: 1%;
}

.validate-message {
    margin-left: 2%;
    color: #c3baba;
}

.btn-upload-image {
    width: 100px;
    margin-left: 150px;

}

.btn-submit-table {
    margin-top: 20px;
    text-align: center;
}

.btn-submit {
    margin-top: 20px;
    margin-left: 280px;
}


.page-content>>>.cell-center {
    text-align: center !important
}

.ant-form-item {
    margin-bottom: 10px;
}
</style>
  