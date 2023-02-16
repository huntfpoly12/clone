<template>
    <div class="main">
        <div :class="[{ 'display-none': !idEmployee }, 'style-Id']">
            {{ idEmployee }}
        </div>
        <div style="display: flex;align-items: flex-end;">
            <a-tooltip  color="black" placement="top"
                v-if="idCardNumber?.length == 14
                && parseInt(idCardNumber.split('-')[0].slice(2, 4)) < 13 && parseInt(idCardNumber.split('-')[0].slice(4, 6)) < 32"
                :title="convertBirthDay(idCardNumber)" key="black">
                {{ name }}
            </a-tooltip>
            <a-tooltip  color="black" placement="top" v-else>
                {{ name }}
            </a-tooltip>
            <span class="tag-status" v-if="status == 0">퇴</span>
            <span class="tag-foreigner" v-if="foreigner == true">외</span>
            <span class="tag-foreigner" v-if="forDailyUse == true">일용</span>
            <span class="tag-midTermSettlement2" v-if="midTermSettlement == false">중도정산O</span>
            <span class="tag-midTermSettlement1" v-if="midTermSettlement == true">중도정산O</span>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import DxButton from 'devextreme-vue/button';

export default defineComponent({
    props: {
        idEmployee: {
            type: String,
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
        midTermSettlement: {
            type: Boolean,
        },
        checkStatus: {
            type: Boolean,
        },
        forDailyUse: Boolean,

    },
    components: {
        DxButton
    },

    setup(props) {
        const convertBirthDay = (birthDay: any) => {
            let newBirthDay = birthDay.split("-")[0]
            let typeYear = birthDay.split("-")[1].charAt(0)
            if (typeYear == 1 || typeYear == 2 || typeYear == 5 || typeYear == 6)
                return '19' + newBirthDay.slice(0, 2) + '-' + newBirthDay.slice(2, 4) + '-' + newBirthDay.slice(4, 6)
            else if (typeYear == 3 || typeYear == 4 || typeYear == 7 || typeYear == 8)
                return '20' + newBirthDay.slice(0, 2) + '-' + newBirthDay.slice(2, 4) + '-' + newBirthDay.slice(4, 6)
        }
        return {
            convertBirthDay
        }
    },
});
</script>

<style scoped lang="scss">
.main {
    display: flex;
    align-items: flex-end;
}
.tag-status {
    background-color: red;
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

.tag-midTermSettlement2 {
    background-color: rgb(219, 14, 14);
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    margin: 0 5px;
}

.tag-midTermSettlement1 {
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
</style>

