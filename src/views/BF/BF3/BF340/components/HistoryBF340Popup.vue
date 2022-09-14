<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" title="영업자관리[bf-340]" centered okText="저장하고 나가기" cancelText="그냥 나가기"
            @cancel="setModalVisible()" width="50%">
        </a-modal>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import type { UnwrapRef } from 'vue';
import { SearchOutlined ,WarningOutlined} from '@ant-design/icons-vue';
import dayjs, { Dayjs } from 'dayjs';


export default defineComponent({
    props:['modalStatus','data']
       ,
    components: {
        SearchOutlined,
        WarningOutlined
    },

    setup(props) {
        return {
        }
    },
    methods: {
        setModalVisible() {
            this.$emit('closeHistoryPopup', false)
        }
    }
})
</script>
<style>
.email-input .ant-form-item-label {
    white-space: normal;

    display: inline-block;
    text-align: center;
    line-height: 16px;
}

.detail-address {
    margin-left: 7px;
}

.result-address {
    margin-left: 110px;
}

.ant-form-item {
    margin-bottom: 10px;
}

.warring-modal {
    font-size: 13px;
    line-height: 5px;
}

.ant-form-item-label {
    text-align: left;
}
</style>