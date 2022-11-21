<template>
    <a-spin :spinning="loading" size="large">
        <action-header title="사업소득자등록" />
 
    </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue"; 
import { useQuery } from "@vue/apollo-composable"; 
import notification from "../../../../utils/notification";  
import queries from "../../../../graphql/queries/BF/BF3/BF340/index"; 
 
export default defineComponent({
    components: {
       
    },
    setup() {
        const  loading = ref(false)
        return {
            loading
        };
    },
});
</script> 
<style scoped lang="scss" src="./style/style.scss" />
