<template>
    <div class="year-header">
        <label for="" class="label-year-header">회계•원천 귀속연도</label>
        <caret-left-outlined class="arrow-plus" :class="{ active: decreaseAct}"  @click="decrease"/><default-text-box width="90px" :disabled="true" :valueInput="year"/><caret-right-outlined class="arrow-plus" :class="{ active: increaseAct}" @click="increase"/>
    </div>
</template>
<script lang="ts">
import { defineComponent , ref, watch} from "vue";
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
        const year = ref(dayjs().year());
        const increaseAct = ref(false);
        const decreaseAct = ref(false);
        const increase = ()=>{
            year.value++;
            increaseAct.value= true;
            decreaseAct.value = false;
        }

        const decrease = ()=>{
            year.value--;
            increaseAct.value= false;
            decreaseAct.value = true;
        }

        watch(year,(newValue)=>{
            if(newValue == dayjs().year()){
                increaseAct.value= false;
                decreaseAct.value = false;
            }
        });
        return {
            year,
            increase,
            decrease,
            increaseAct,
            decreaseAct
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

.active{
    color:white !important;
}

.arrow-plus{
    font-size: 30px;
    color: gray;
}
.label-year-header{
    color: yellow;
}
</style>
