<template>
    <div class="main">
        <div :class="[{ 'display-none': !idEmployee }, 'style-Id']">
            {{ idEmployee }}
        </div>
        <div class="employee-info">
            <a-tooltip zIndex="9999" placement="top" :color="convertBirthDayKorea(idCardNumber) ? 'black' : 'red'"
                v-if="idCardNumber && name && convertBirthDayKorea(idCardNumber)">
                <template #title>
                    <div v-if="convertBirthDayKorea(idCardNumber)" style="color: white;">{{ convertBirthDayKorea(idCardNumber) }}</div>
                </template>
                <div class="text-center">
                    {{ name }}
                </div>
            </a-tooltip>
            <div  v-else @mouseover="onMouseover" @mouseout="onMouseOut" style="padding-top: 4px; height: 25px;">{{ name }}</div>
            <span class="tag-status" v-if="status == 0">퇴</span>
            <span class="tag-foreigner" v-if="foreigner">외</span>
            <span class="tag-forDailyUse" v-if="forDailyUse">일용</span>
            <span v-if="midTermSettlement != null">
                <span class="tag-midTermSettlementTrue" v-if="midTermSettlement == true">중도정산O</span>
                <span class="tag-midTermSettlementFalse" v-if="midTermSettlement == false">중도정산X</span>
            </span>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import DxButton from 'devextreme-vue/button';
import {convertBirthDayKorea} from "@/helpers/commonFunction";

export default defineComponent({
    props: {
        idEmployee: {
            type: Number,
        },
        idCardNumber: {
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
        midTermSettlement: {
            type: Boolean,
            default: null,
        },
        forDailyUse: Boolean,
        employeeId: String
    },
    components: {
        DxButton
    },

    setup(props, { emit }) {

        const employeeId = ref(props.employeeId);
        const onMouseover = () => {
            if (!convertBirthDayKorea(props?.idCardNumber || '')) {
                emit('toolTopErorr', { isError: true, id: employeeId.value })
            }
        }
        const onMouseOut = () => {
            if (!convertBirthDayKorea(props?.idCardNumber || '')) {
                emit('toolTopErorr', { isError: false, id: employeeId.value })
            }
        }
        return {
          convertBirthDayKorea,
            onMouseover,
            onMouseOut
        }
    },
});
</script>

<style scoped lang="scss">
.main {
    display: flex;
    align-items: flex-end;
}
.employee-info {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 26px;
}
.tag-status {
    background-color: #C00000;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    height: 26px;
}

.tag-foreigner {
    background-color: orange;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    height: 26px;

}

.tag-forDailyUse {
    margin-right: 5px;
    text-align: center;
    border: 1px solid rgb(164, 164, 164);
    border-radius: 5px;
    padding: 3px 4px;
    height: 26px;
}
.tag-midTermSettlementFalse {
    background-color: rgb(219, 14, 14);
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    margin: 0 5px;
}

.tag-midTermSettlementTrue {
    background-color: rgb(85, 155, 45);
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    margin: 0 5px;
}

.display-none {
    display: none;
}

.jtf-center {
    justify-content: center;
}

.error {
    color: #ffffff;
    background: red;
}
</style>

