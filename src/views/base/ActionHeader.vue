<template>
    <form ref="formTest" action="your-action">
        <table id="customers">
            <tr>
                <th style="width: 40%">Example</th>
                <th style="width: 20%">Emit</th>
                <th style="width: 40%">Code Example</th>
            </tr>
            <tr>
                <td>
                    <p><b> Action Header</b></p>
                    <action-header title="계약정보관리&심사" />
                </td>

                <td>
                    <b>@actionSearch</b> <br />
                    <b>@actionSave</b><br />
                    <b>@actionDelete</b><br />
                    <b>@actionPrint</b><br />
                </td>

                <td>
                    <pre class="mycode">
    &lt;action-header title="회원관리" 
        @actionSearch="searching"  @actionDelete="deleting" 
        @actionSave="saving"  @actionPrint="printing"/&gt;  
                    </pre>
                </td>
            </tr>

        </table>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
    data() {
        return {
            styles: {
                main: this.$config_styles.Main,
            },
        };
    },
});
</script> 
<style lang="scss" scoped>
#customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#customers td,
#customers th {
    border: 1px solid #ddd;
    padding: 8px;
}

#customers tr:nth-child(even) {
    background-color: #f2f2f2;
}

#customers tr:hover {
    background-color: #ddd;
}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: v-bind("styles.main");
    color: white;
}

.mycode {
    font-size: 14px;
    width: 100%;
    background-color: #333;
    color: #f7f7f7;
    font-weight: bold;
}
</style>