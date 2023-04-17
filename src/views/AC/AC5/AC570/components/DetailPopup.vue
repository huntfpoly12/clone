<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" footer="" :width="562">
        <standard-form action="" name="detail-ac570">
            <a-spin :spinning="false" size="large">
                <StandardForm class="ac-570-form" formName="ac-570-form" ref="ac570FormRef">
                    <h2 class="text-align-center">과목전용조서</h2>
                    <a-row>
                        <a-col :span="11"></a-col>
                        <a-col :span="13">
                            <a-form-item label="전용일자" :label-col="{ span: 9 }" class="red">
                                <date-time-box width="145px" dateFormat="YYYY-MM-DD" disabled="true" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <div class="top-content gray">
                        <a-typography-title :level="5" style="margin-bottom: 0;">원천계정과목</a-typography-title>
                    </div>
                    <div class="custom-center">
                        <a-form-item label="원천계정과목" :label-col="labelCol" class="red">
                            <select-box-common width="150px" :required="true" disabled="true" />
                        </a-form-item>
                        <a-form-item label="예산액" :label-col="labelCol">
                            <default-text-box width="150px" />
                        </a-form-item>
                        <a-form-item label="전용액" :label-col="labelCol" class="red">
                            <number-box-money width="150px" disabled="true" :required="true" placeholder="" />
                        </a-form-item>
                        <a-form-item label="예산현액" :label-col="labelCol">
                            <default-text-box width="150px" disabled="true" />
                        </a-form-item>
                        <a-form-item label="지출액" :label-col="labelCol">
                            <number-box width="150px" placeholder="" />
                        </a-form-item>
                        <a-form-item label="불용액" :label-col="labelCol">
                            <number-box width="150px" placeholder="" disabled="true" />
                        </a-form-item>
                    </div>

                    <div class="top-content">
                        <a-typography-title :level="5" style="margin-bottom: 0;">전용계정과목</a-typography-title>
                    </div>
                    <div class="custom-center">
                        <a-form-item label="전용계정과목" :label-col="labelCol" class="red">
                            <select-box-common width="150px" :required="true" disabled="true" />
                        </a-form-item>
                        <a-form-item label="예산액" :label-col="labelCol">
                            <default-text-box width="150px" />
                        </a-form-item>
                        <a-form-item label="전용액" :label-col="labelCol" class="red">
                            <number-box-money width="150px" :required="true" placeholder="" disabled="true" />
                        </a-form-item>
                        <a-form-item label="예산현액" :label-col="labelCol">
                            <default-text-box width="150px" disabled="true" />
                        </a-form-item>
                        <a-form-item label="지출액" :label-col="labelCol">
                            <number-box width="150px" placeholder="" />
                        </a-form-item>
                        <a-form-item label="불용액" :label-col="labelCol">
                            <number-box width="150px" placeholder="" disabled="true" />
                        </a-form-item>
                        <a-form-item label="전용사유" :label-col="labelCol">
                            <number-box width="150px" placeholder="" />
                        </a-form-item>
                    </div>
                    <div class="text-align-center mt-20" style="display: flex; justify-content: center;">
                        <button-basic mode="contained" type="default" text="저장" />
                    </div>

                </StandardForm>
            </a-spin>
        </standard-form>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import { Message } from "@/configs/enum";
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object,
            default: {}
        }
    },
    components: {
    },
    setup(props, { emit }) {


        const setModalVisible = () => {
            emit("closePopup", false)
        };

        const onSubmit = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {

            }
        };

        watch(() => props.modalStatus, (value) => {

        })

        return {
            setModalVisible,
            onSubmit,
            labelCol: { style: { width: "150px" } },
        }
    },
})
</script>

<style lang="scss" scoped>
.custom-modal {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
}

.custom-modal .ant-form-item-label>label {
    width: 130px;
    padding-left: 10px;
}

.text-align-center {
    text-align: center;
}

.button-form-modal {
    margin: 0px 5px;
}
.top-content {
    margin-bottom: 10px;
    padding: 2px 4px;
    background-color: #9cddfc;


}
.gray {
    background-color: #e5e5e5;
}
</style>
