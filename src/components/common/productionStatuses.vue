<template>
    <span class="tag-status-0" v-if="typeTag == 0">전체</span>
    <span class="tag-status-1" v-if="typeTag == 1">제작대전</span>
    <span class="tag-status-2" v-if="typeTag == 2">제작대기</span>
    <span class="tag-status-3" v-if="typeTag == 3">제작중</span>
    <span class="tag-status-4" v-if="typeTag == 4">제작성공</span>
    <span class="tag-status-5" v-if="typeTag == 5">제작실패</span>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DxButton from 'devextreme-vue/button';
export default defineComponent({
    props: {
        typeTag: { //number : 1,2,3,4,5 
            type: Number
        },
    },
    components: {
        DxButton
    },
});
</script>

<style scoped lang="scss">
.tag-status-0 {
    border: 1px solid gray;
    color: black;
    padding: 3px 20px;
    text-align: center;
    border-radius: 5px;
    margin-right: 5px;
    width: 100px;
}
.tag-status-1 {
    background-color: gray;
    color: white;
    padding: 4px 20px;
    text-align: center;
    border-radius: 5px;
    margin-right: 5px;
    width: 100px;
}

.tag-status-2 {
    background-color: #93CDDD;
    color: white;
    padding: 4px 20px;
    text-align: center;
    border-radius: 5px;
    margin-right: 5px;
    width: 100px;
}

.tag-status-3 {
    background-color: #0070C0;
    color: white;
    padding: 4px 20px;
    text-align: center;
    border-radius: 5px;
    margin-right: 5px;
    width: 100px;
}


.tag-status-4 {
    background-color: #9BBB59;
    color: white;
    padding: 4px 20px;
    text-align: center;
    border-radius: 5px;
    margin-right: 5px;
    width: 100px;
}

.tag-status-5 {
    background-color: #C00000;
    color: white;
    padding: 4px 20px;
    text-align: center;
    border-radius: 5px;
    margin-right: 5px;
    width: 100px;
}
</style> 