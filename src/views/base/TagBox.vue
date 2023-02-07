<template>
    <form ref="formTest" action="your-action">
        <table id="customers">
            <tr>
                <td>
                    <p><b> Production Statuses</b></p>
                    <production-statuses :typeTag="0" padding="1px 10px" />
                    <production-statuses :typeTag="1" padding="2px 10px" />
                    <production-statuses :typeTag="2" padding="2px 10px" />
                    <br><br>
                    <production-statuses :typeTag="3" padding="2px 10px" />
                    <production-statuses :typeTag="4" padding="2px 10px" />
                    <production-statuses :typeTag="5" padding="2px 10px" />
                </td>
                <td>
                    - <b>typeTag (number)</b> : 0(all), 1,2,3,4,5 Numbers corresponding to colors <br>
                    - <b>padding (String)</b> : Ex: "10px 10px 10px 10px" || "10px 10px" || "10px"
                </td>

                <td>
                    <pre class="mycode"> &lt;production-statuses :typeTag="1" /&gt;</pre>
                </td>
            </tr>
            <tr>
                <th style="width: 25%">Example</th>
                <th style="width: 40%">Props</th>
                <th style="width: 40%">Code Example</th>
            </tr>
            <tr>
                <td>
                    <p><b> Employee Info</b></p>
                    <employee-info idEmployee="JBD00001" name="계약정보관리&심사" idCardNumber="800101-1100123" :status="0"
                        :foreigner="true" :checkStatus="false" :midTermSettlement="false" />
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
    :checkStatus="false"
    
    /&gt;
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
            <tr>
                <td>
                    <p><b>Income Type</b></p>
                    <income-type :typeCode="'940904'" :typeName="'직업운동가'" />
                </td>
                <td>
                    <b>- typeCode (String):</b> Income TypeCode <br />
                    <b>- typeName (String):</b> Income TypeName <br />
                </td>
                <td>
                    <pre class="mycode"> &lt;income-type :typeCode="'940904'" :typeName="'직업운동가'"/&gt;
                    </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <p><b>Deduction Items</b></p>
                    <deduction-items name="940904" :type="1" subName="과세" />-
                    <deduction-items name="940904" :type="2" subName="과세" />-
                    <deduction-items name="940904" :type="3" subName="과세" />-
                    <deduction-items name="Show full name" :type="4" subName="과세" :width="'auto'" />
                </td>
                <td>
                    <b>- name (String):</b> Name <br />
                    <b>- type (Number):</b> Number : 1,2,3,4 <br />
                    <b>- subName (Number):</b> Text tooltip <br />
                    <b>- width (String):</b> Set width text <br />
                </td>
                <td>
                    <pre class="mycode"> &lt;deduction-items name="940904" :type="1" subName="과세" /&gt;
                    </pre>
                    <pre class="mycode"> &lt;deduction-items name="Show full name" :type="4" subName="과세" :width="'auto'" /&gt;
                    </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <p><b>Colorful Badge</b></p>
                    <colorful-badge :value="40" :year="2022" :month="12" />
                </td>
                <td>
                    <b>- value (Number):</b> value: 10, 20, 30, 40 <br />
                    <b>- year (Number):</b><br />
                    <b>- month (Number):</b><br />
                </td>
                <td>
                    <pre class="mycode"> &lt;colorful-badge :value="40" :year="2022" :month="12"/&gt;
                    </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <p><b>Process Status</b></p>
                    {{ status }}
                    <process-status v-model:valueStatus="status" style="margin-left: 150px;" />
                </td>
                <td>
                    <b>- value (Number):</b> value: 10, 20, 30, 40 <br />
                    <b>- Return :</b> checkConfirm: true <br />
                </td>
                <td>
                    <pre class="mycode"> &lt;process-status v-model:valueStatus="status"/&gt;
                    </pre>
                </td>
            </tr>

        </table>
    </form>
</template>

<script lang="ts">
import ProcessStatus from "@/components/common/ProcessStatus.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
    components: { ProcessStatus },
    data() {
        return {
            styles: {
                main: this.$config_styles.Main,
            },
            status: 10,
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