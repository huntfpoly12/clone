<template>
    <span class="tag-status-0" :style="disabled ?  { padding: padding, opacity: '50%' } : { padding: padding }" v-if="typeTag == 0">전체</span>
    <span class="tag-status-1" :style="disabled ?  { padding: padding, opacity: '50%' } : { padding: padding }" v-if="typeTag == 1">제작대전</span>
    <span class="tag-status-2" :style="disabled ?  { padding: padding, opacity: '50%' } : { padding: padding }" v-if="typeTag == 2">제작대기</span>
    <span class="tag-status-3" :style="disabled ?  { padding: padding, opacity: '50%' } : { padding: padding }" v-if="typeTag == 3">제작중</span>

    <a-tooltip v-if="message != ''" color="red" :title="message">
      <span class="tag-status-4" :style="disabled ?  { padding: padding, opacity: '50%' } : { padding: padding }" v-if="typeTag == 4">제작성공</span> 
    </a-tooltip>
    <span v-else class="tag-status-4" :style="disabled ?  { padding: padding, opacity: '50%' } : { padding: padding }" v-if="typeTag == 4">제작성공</span>

    <a-tooltip v-if="message != ''" color="red" :title="message"> 
      <!-- the reason why was rejected -->
      <span class="tag-status-5" :style="disabled ?  { padding: padding, opacity: '50%' } : { padding: padding }" v-if="typeTag == 5">제작실패</span>
    </a-tooltip>
    <span v-else class="tag-status-5" :style="disabled ?  { padding: padding, opacity: '50%' } : { padding: padding }" v-if="typeTag == 5">제작실패</span>
  
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DxButton from 'devextreme-vue/button';
export default defineComponent({
    props: {
        typeTag: { //number : 0,1,2,3,4,5 
          type: Number
        },
        padding: {
          type: String
        },
        message: {
          type: String,
          default: ''
        },
        disabled: {
          type: Boolean,
          default: false
        }
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
    width: 80px;
    display: block;
}

.tag-status-1 {
    background-color: gray;
    color: white;
    text-align: center;
    border-radius: 5px;
    margin-right: 5px;
    width: 80px
}

.tag-status-2 {
    background-color: #93CDDD;
    color: white;
    text-align: center;
    border-radius: 5px;
    margin-right: 5px;
    width: 80px;
    display: block;
}

.tag-status-3 {
    background-color: #0070C0;
    color: white;
    text-align: center;
    border-radius: 5px;
    margin-right: 5px;
    width: 80px;
    display: block;
}


.tag-status-4 {
    background-color: #9BBB59;
    color: white;
    text-align: center;
    border-radius: 5px;
    margin-right: 5px;
    width: 80px;
    display: block;
}

.tag-status-5 {
    background-color: #C00000;
    color: white;
    text-align: center;
    border-radius: 5px;
    margin-right: 5px;
    width: 80px;
    display: block;
}
</style> 
