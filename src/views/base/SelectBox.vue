<template>
    <form ref="formTest" action="your-action">
        <table id="customers">
            <tr>
                <th style="width: 550px">Example</th>
                <th style="width: 550px">Props</th>
                <th>Code Example</th>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">List tag select box</div>
                        <div class="dx-field-value">
                            <tag-select-box 
                                :arrayValue="arrayTagSelectBox" 
                                v-model:valueTagSelect="valueTagSelectBox"/>
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>arrayValue:</strong> {type: Array, required: true}</li>
                        <li><strong>valueTagSelect:</strong> {type: Array}</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt; tag-select-box 
                :arrayValue="arrayTagSelectBox"
                 v-model:valueTagSelect="valueTagSelectBox" /&gt;
              </pre>
                </td>
            </tr>
        </table>
    </form>
</template>
  
<script>
import { defineComponent, ref } from "vue";
// import TagSelectBoxVue from "../../components/common/TagSelectBox.vue";
export default defineComponent({
    components: {
        // TagSelectBoxVue
    },
    data() {
        return {
            styles: {
                main: this.$config_styles.Main,
            },
        };
    },
    setup() {
        const arrayTagSelectBox = ref([
            { id: 0, name: 'Low' },
            { id: 1, name: 'Normal' },
            { id: 2, name: 'Urgent' },
            { id: 3, name: 'High' }
        ])
        const valueTagSelectBox = ref([1,2])

        return {
            arrayTagSelectBox,
            valueTagSelectBox,
        };
    },
});
</script>
<style scoped lang="scss">
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
    display: block;
    padding: 3px 3px 2px;
    font-size: 14px;
    line-height: 20px;
    width: 100%;
    background-color: #333;
    font-family: arial;
    color: #f7f7f7;
    font-weight: bold;
}
</style>
  