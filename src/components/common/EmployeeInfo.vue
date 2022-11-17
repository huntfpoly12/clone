<template>
    <div class="main">
        <div class="style-Id">
            {{ idEmployee }}
        </div>
        <div>
            <a-tooltip placement="top" :title="birthDay" color="#E8E8E8" key="black">
                {{ name }}
            </a-tooltip>
            <span class="tag-status" v-if="status == 0">퇴</span>
            <span class="tag-foreigner" v-if="foreigner == true">외</span>
            <span class="tag-checkStatus" v-if="checkStatus == false">신고X</span>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DxButton from 'devextreme-vue/button';

export default defineComponent({
    props: {
        idEmployee: {
            type: String,
        },
        birthDay: {
            type: String,
        },
        name: {
            type: String,
        },
        status: {
            type: Number,
        },
        foreigner: {
            type: Boolean,
        },
        checkStatus: {
            type: Boolean,
        },
    },
    components: {
        DxButton
    },
});
</script>

<style scoped lang="scss">
.main {
    display: flex;
    align-items: flex-end;
}

.style-Id {
    margin-right: 5px;
    text-align: center;
    color: black;
    border: 1px solid rgb(164, 164, 164);
    border-radius: 5px;
    line-height: 23px;
    padding: 0 7px;
}

.tag-status {
    background-color: red;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    margin: 0 5px;
}

.tag-checkStatus {
    background-color: black;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    margin: 0 5px;
}

.tag-status {
    background-color: red;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    margin: 0 5px;
}

.tag-foreigner {
    background-color: orange;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    margin: 0 5px;
}
</style>

<style>
.ant-tooltip-inner {
    color: black;
}
</style>