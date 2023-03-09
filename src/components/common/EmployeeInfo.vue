<template>
    <div class="main">
        <div :class="[{ 'display-none': !idEmployee }, 'style-Id']">
            {{ idEmployee }}
        </div>
        <div style="display: flex;align-items: flex-end;">
            <a-tooltip zIndex="9999" placement="top" :color="convertBirthDay(idCardNumber) ? 'black' : 'red'"
                v-if="idCardNumber && name && convertBirthDay(idCardNumber)">
                <template #title>
                    <div v-if="convertBirthDay(idCardNumber)" style="color: white;">{{ convertBirthDay(idCardNumber) }}</div>
                </template>
                <div class="text-center" style="padding-top: 4px; height: 25px;">
                    {{ name }}
                </div>
            </a-tooltip>
            <div  v-else @mouseover="onMouseover" @mouseout="onMouseOut" style="padding-top: 4px; height: 25px;">{{ name }}</div>
            <span class="tag-status" v-if="status == 0">퇴</span>
            <span class="tag-foreigner" v-if="foreigner == true">외</span>
            <span class="tag-forDailyUse" v-if="forDailyUse == true">일용</span>

        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import DxButton from 'devextreme-vue/button';

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
        forDailyUse: Boolean,
        employeeId: Number
    },
    components: {
        DxButton
    },

    setup(props, { emit }) {
        const convertBirthDay = (birthDay: any) => {
          if (birthDay.length == 14 && parseInt(birthDay.split('-')[0].slice(2, 4)) < 13 && parseInt(birthDay.split('-')[0].slice(4, 6)) < 32)
          {          
            let newBirthDay = birthDay.split("-")[0]
            let typeYear = birthDay.split("-")[1].charAt(0)
            if (typeYear == 1 || typeYear == 2 || typeYear == 5 || typeYear == 6)
                return '19' + newBirthDay.slice(0, 2) + '-' + newBirthDay.slice(2, 4) + '-' + newBirthDay.slice(4, 6)
            else if (typeYear == 3 || typeYear == 4 || typeYear == 7 || typeYear == 8)
                return '20' + newBirthDay.slice(0, 2) + '-' + newBirthDay.slice(2, 4) + '-' + newBirthDay.slice(4, 6)
          }

          if (birthDay.length == 13 && parseInt(birthDay.slice(0, 5).slice(2, 4)) < 13 && parseInt(birthDay.slice(0, 5).slice(4, 6)) < 32) {
            let newBirthDay = birthDay.slice(0, 5)
            let typeYear =birthDay.slice(6, 12).charAt(0)
            if (typeYear == 1 || typeYear == 2 || typeYear == 5 || typeYear == 6)
                return '19' + newBirthDay.slice(0, 2) + '-' + newBirthDay.slice(2, 4) + '-' + newBirthDay.slice(4, 6)
            else if (typeYear == 3 || typeYear == 4 || typeYear == 7 || typeYear == 8)
                return '20' + newBirthDay.slice(0, 2) + '-' + newBirthDay.slice(2, 4) + '-' + newBirthDay.slice(4, 6)
          }
       
          return null;
        }
        const employeeId = ref(props.employeeId);
        const onMouseover = () => {
            if (!convertBirthDay(props.idCardNumber)) {
                emit('toolTopErorr', { isError: true, id: employeeId.value })
            }
        }
        const onMouseOut = () => {
            if (!convertBirthDay(props.idCardNumber)) {
                emit('toolTopErorr', { isError: false, id: employeeId.value })
            }
        }
        return {
            convertBirthDay,
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
.tag-status {
    background-color: #C00000;
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

.tag-forDailyUse {
    border: 1px solid black;
    color: rgb(0, 0, 0);
    padding: 3px 10px;
    border-radius: 5px;
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

