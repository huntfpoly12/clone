<template>
    <Datepicker v-model="date" :class="classNameProps" textInput autoApply :format="format" @focus="focusDatetime"
        v-on:blur="alertDate" @keyup="getdata" @update:modelValue="closeDateTime">
    </Datepicker>
</template>
<script lang="ts">
import { CalendarOutlined } from '@ant-design/icons-vue';
import DxDateBox from "devextreme-vue/date-box";
import { defineComponent, ref } from "vue";
import { Dayjs } from 'dayjs';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
export default defineComponent({
    props: {
        dateFormat: {
            default: "YYYY-MM-DD",
            type: String,
        },
        width: {
            default: "100%",
            type: String,
        },
        valueDate: {
            type: String,
            default: "",
        },
        id: {
            type: String,
            default: "",
        },
        className: {
            type: String,
        }
    },
    components: {
        DxDateBox,
        CalendarOutlined,
        Datepicker
    },
    setup(props, { emit }) {
        let className: string = props.id ? `date_${props.id}` : '';
        let value = ref<Dayjs>();
        let dataInput: any = ''
        let classNameProps = "datepicker" + props.className
        var date = ref();

        const format = (date: any) => {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${year}/${month}/${day}`;
        }

        const alertDate = () => {
            if (date.value == null) {
                let dateInput = ''
                if (dataInput.length == 8) {
                    dateInput = dataInput.slice(0, 4) + '-' + dataInput.slice(4, 6) + '-' + dataInput.slice(6, 8)
                } else if (dataInput.length == 10) {
                    const [year, month, day] = dataInput.split('/')
                    dateInput = year + '/' + month + '/' + day
                }
                let dat = new Date(dateInput);
                date.value = dat
            }
        }

        const closeDateTime = () => {
            setTimeout(() => {
                let classDate = '.' + classNameProps + ' .dp__input'
                var Url = document.querySelector(classDate) as HTMLInputElement;
                Url.select()
            }, 200);
        }

        const getdata = () => {
            let classDate = '.' + classNameProps + ' .dp__input'
            var Url = document.querySelector(classDate) as HTMLInputElement;
            dataInput = Url.value
            console.log(dataInput);

        }

        const focusDatetime = () => {
            let classDate = '.' + classNameProps + ' .dp__input'
            var Url = document.querySelector(classDate) as HTMLInputElement;
            Url.select()
        }

        return {
            classNameProps,
            closeDateTime,
            dataInput,
            focusDatetime,
            getdata,
            alertDate,
            date,
            className,
            value,
            format
        };
    },
});
</script> 