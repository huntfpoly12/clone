<template>
    <div class="main">
        <div class="style-Id">
            {{ idEmployee }}
        </div>
        <div style="display: flex;align-items: flex-end;">
            <a-tooltip placement="top"
                v-if="idCardNumber?.length == 14
                && parseInt(idCardNumber.split('-')[0].slice(2, 4)) < 13 && parseInt(idCardNumber.split('-')[0].slice(4, 6)) < 32"
                :title="convertBirthDay(idCardNumber)" key="black">
                {{ name }}
            </a-tooltip>
            <a-tooltip placement="top" v-else title="ERROR" color="red">
                {{ name }}
            </a-tooltip>
            <span class="tag-status" v-if="status == 0">퇴</span>
            <span class="tag-foreigner" v-if="foreigner == true">외</span>
            <span class="tag-checkStatus" v-if="checkStatus == false">신고X</span>
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
        checkStatus: {
            type: Boolean,
        },
    },
    components: {
        DxButton
    },

    setup() {
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

.style-Id {
    margin-right: 5px;
    text-align: center; 
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

