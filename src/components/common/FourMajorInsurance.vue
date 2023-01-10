<template>
    <a-tooltip placement="top" v-if="typeTag == 1" title="국민연금" color="orange">
        <span class="tag-status-1">{{ typeValue == 1 ? '국' : '국민' }}</span>
    </a-tooltip>

    <a-tooltip placement="top" v-if="typeTag == 2" title="건강보험" color="red">
        <span class="tag-status-2">{{ typeValue == 1 ? '건' : '건강' }}</span>
    </a-tooltip>
    <a-tooltip placement="top" v-if="typeTag == 3" title="장기요양" color="red">
        <span class="tag-status-2">{{ typeValue == 1 ? '장' : '장기' }}</span>
    </a-tooltip>

    <a-tooltip placement="top" v-if="typeTag == 4" title="고용보험" color="rgb(75, 155, 247)">
        <span class="tag-status-3">{{ typeValue == 1 ? '고' : '고용' }}</span>
    </a-tooltip>
    <a-tooltip placement="top" v-if="typeTag == 5" title="산재보험" color="rgb(75, 155, 247)">
        <span class="tag-status-3">{{ typeValue == 1 ? '산' : '산재' }}</span>
    </a-tooltip>

    <a-tooltip placement="top" v-if="typeTag == 6" :title="'두루누리 국민연금 ' + ratio + '%'" color="black">
        <span class="tag-status-4">두 {{ ratio }}%</span>
    </a-tooltip>
    <a-tooltip placement="top" v-if="typeTag == 7" :title="'두루누리 고용보험 ' + ratio + '%'" color="black">
        <span class="tag-status-4">두(고) {{ ratio }}%</span>
    </a-tooltip>
    <a-tooltip placement="top" v-if="typeTag == 8" :title="'중소기업취업 ' + ratio + '%'" color="black">
        <span class="tag-status-4">중 {{ ratio }}%</span>
    </a-tooltip>
    <a-tooltip placement="top" v-if="typeTag == 9" :title="'중소기업취업 청년 ' + ratio + '%'" color="black">
        <span class="tag-status-4">중(청) {{ ratio }}%</span>
    </a-tooltip>
    <a-tooltip placement="top" v-if="typeTag == 10" :title="'소득세율 ' + ratio + '%'" color="black">
        <span class="tag-status-4">소 {{ ratio }}%</span>
    </a-tooltip>

</template>
<script lang="ts">
import { defineComponent } from "vue";
import DxButton from 'devextreme-vue/button';
export default defineComponent({
    props: {
        typeTag: {
            type: Number
        },
        ratio: {
            type: Number,
        },
        typeValue: {
            type: Number
        }
    },
    components: {
        DxButton
    },
});
</script>

<style scoped lang="scss">
.tag-status-1 {
    background-color: orange;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    margin-right: 5px;
}

.tag-status-2 {
    background-color: red;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    margin-right: 5px;
}

.tag-status-3 {
    background-color: rgb(75, 155, 247);
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    margin-right: 5px;
}

.tag-status-4 {
    background-color: black;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    margin-right: 5px;
}
</style>

<style>
.ant-tooltip-inner {
    color: black;
    background-color: rgb(232, 232, 232);
}
</style>