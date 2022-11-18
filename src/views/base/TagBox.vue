<template>
    <form ref="formTest" action="your-action">
        <table id="customers">
            <tr>
                <th style="width: 25%">Example</th>
                <th style="width: 40%">Props</th>
                <th style="width: 40%">Code Example</th>
            </tr>
            <tr>
                <td>
                    <p><b> Employee Info</b></p>
                    <employee-info idEmployee="JBD00001" name="계약정보관리&심사" idCardNumber="800101-1100123" :status="0"
                        :foreigner="true" :checkStatus="false" />
                </td>
                <td>
                    <b>- idEmployee (String):</b> ID employee <br />
                    <b>- idCardNumber (String):</b> Card id employee <br />
                    <b>- name (String):</b> Name employee <br />
                    <b>- status (Boolean):</b> Box status employee<br />
                    <b>- foreigner (Boolean):</b> Box foreigner employee <br />
                    <b>- *checkStatus (Boolean):</b> Box checkStatus employee <br />
                </td>

                <td>
                    <pre class="mycode"> &lt;employee-info 
    idEmployee="JBD00001" 
    name="계약정보관리&심사" 
    idCardNumber="800101-1100123" 
    :status="0"
    :foreigner="true" 
    :checkStatus="false"/&gt;
                    </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <four-major-insurance :typeTag="1" :typeValue="1" />
                    <four-major-insurance :typeTag="2" :typeValue="1" />
                    <four-major-insurance :typeTag="3" :typeValue="1" />
                    <four-major-insurance :typeTag="4" :typeValue="1" />
                    <four-major-insurance :typeTag="5" :typeValue="1" />
                    <four-major-insurance :typeTag="6" :ratio="80" />
                    <br>
                    <br>
                    <four-major-insurance :typeTag="7" :ratio="80" />
                    <four-major-insurance :typeTag="8" :ratio="80" />
                    <four-major-insurance :typeTag="9" :ratio="80" />
                    <four-major-insurance :typeTag="10" :ratio="80" />
                </td>
                <td>
                    <b>- typeTag (Number):</b> 1->10 (1: 국, 2: 건, 3:장, 4:고, 5:산, 6:두, 7:두(고), 8:중, 9:중(청), 10:소)
                    <br />
                    <b>- typeValue (Number):</b> Apply to typeTag from 1->5 (1: 1 letters, 2: 2 letters)
                    <br />
                    <b>- ratio (Number):</b> Apply to typeTag from 6->10
                </td> 
                <td>
                    <pre class="mycode">&lt;four-major-insurance :typeTag="1" :typeValue="1" /&gt; </pre>
                    <pre class="mycode">&lt;four-major-insurance :typeTag="6" :ratio="80" /&gt; </pre>
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