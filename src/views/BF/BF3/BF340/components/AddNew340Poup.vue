<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" title="영업자관리[bf-340]" centered okText="저장하고 나가기" cancelText="그냥 나가기"
            @cancel="setModalVisible()" width="50%">
            <a-form  v-bind="layout"    name="nest-messages"
 >
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="Activity name">
                            <a-input v-model:value="bf310Detail.name" />
                        </a-form-item>
                        <a-form-item label="Instant delivery">
                            <a-input v-model:value="bf310Detail.name" />
                        </a-form-item>
                        <a-form-item label="Activity type">
                            <a-input v-model:value="bf310Detail.name" />
                        </a-form-item>
                        <a-form-item label="Activity name">
                            <a-input v-model:value="bf310Detail.name" />
                        </a-form-item>
                        <a-form-item label="Instant delivery">
                            <a-input v-model:value="bf310Detail.name" />
                        </a-form-item>
                        <a-form-item label="Activity type">
                            <a-input v-model:value="bf310Detail.name" />
                        </a-form-item>
                        <a-form-item label="Activity type">
                            <a-input v-model:value="bf310Detail.name" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Activity name">
                            <a-input v-model:value="bf310Detail.name" />
                        </a-form-item>
                        <a-form-item label="Instant delivery">
                            <a-input v-model:value="bf310Detail.name" />
                        </a-form-item>
                        <a-form-item label="Activity type">
                            <a-input v-model:value="bf310Detail.name" />
                        </a-form-item>
                        <a-form-item label="Instant delivery">
                            <a-input v-model:value="bf310Detail.name" />
                        </a-form-item>
                        <a-form-item label="Activity type">
                            <a-input v-model:value="bf310Detail.name" />
                        </a-form-item>
                    </a-col>
                </a-row>

            </a-form>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import type { UnwrapRef } from 'vue';

interface FormState {
    name: string;
    delivery: boolean;
    type: string[];
    resource: string;
    desc: string;
}

export default defineComponent({
    props: {
        modalStatus: Boolean,
    },
    components: {
    },
    setup() {
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        const labelCol = { style: { width: "150px" } };
        const wrapperCol = { span: 14 };
        const bf310Detail: UnwrapRef<FormState> = reactive({
            name: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
        });

        return {
            labelCol,
            wrapperCol,
            bf310Detail,
            layout
        }
    },
    methods: {
        setModalVisible() {
            this.$emit('closePopup', false)
        },
    }
})
</script>
<style>
.warring-modal {
    font-size: 13px;
    line-height: 5px;
}

.ant-form-item-label {
    text-align: left;
}
</style>