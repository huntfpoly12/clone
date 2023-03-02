<template>
    <div class="year-header">  
        <label for="" class="label-year-header">회계•원천 귀속연도</label>
        <caret-left-outlined class="arrow-plus"   @click="decrease"/><default-text-box width="90px" :disabled="true" :valueInput="globalYear.toString()"/><caret-right-outlined class="arrow-plus"  @click="increase"/>
    </div>
</template>
<script lang="ts">
import { defineComponent , ref, computed} from "vue";
import { useStore } from 'vuex';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        CaretLeftOutlined,
        CaretRightOutlined
    },
    setup() {
        const store = useStore();
        
        const globalYear = computed(()=>store.state.settings.globalYear);
        const increase = ()=>{
            store.state.settings.globalYear++;
        }

        const decrease = ()=>{
            store.state.settings.globalYear--;
        }

        return {
            increase,
            decrease,
            globalYear
        }
    },
});
</script>

<style lang="scss" scoped>
.year-header{
    width: 300px;
    display: flex;
    align-items: center;
}
::v-deep .dx-texteditor-input{
    min-height: 0px;
    text-align: center;
    font-weight: bold;
    color: purple;
    font-size: 20px;
}


.arrow-plus{
    font-size: 30px;
    color: gray;
}

.arrow-plus:hover{
    color:white !important;
}
.label-year-header{
    color: yellow;
}
</style>
