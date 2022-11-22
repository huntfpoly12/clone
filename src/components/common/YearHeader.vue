<template>
    <div class="year-header">
        <label for="" class="label-year-header">회계•원천 귀속연도</label>
        <caret-left-outlined class="arrow-plus"   @click="decrease"/><default-text-box width="90px" :disabled="true" :valueInput="year"/><caret-right-outlined class="arrow-plus"  @click="increase"/>
    </div>
</template>
<script lang="ts">
import { defineComponent , ref, watch} from "vue";
import { useStore } from 'vuex';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons-vue';
import dayjs, { Dayjs } from 'dayjs';
export default defineComponent({
    props: {
        
    },
    components: {
        CaretLeftOutlined,
        CaretRightOutlined
    },
    setup(props, { emit }) {
        const store = useStore();
        
        const year = ref(dayjs().year());
        const increase = ()=>{
            year.value++;
            store.state.settings.globalYear = year.value;
        }

        const decrease = ()=>{
            year.value--;
            store.state.settings.globalYear = year.value;
        }

        return {
            year,
            increase,
            decrease,
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
