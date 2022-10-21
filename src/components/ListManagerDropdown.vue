<template>
    <div v-if="title">
        <label class="lable-item">매니저명 :</label>
        <a-select ref="select" v-model:value="manager" placeholder="전체" @change="updateManager(manager)" show-search>
            <a-select-option v-for="item in result?.findManagerUsers" :key="item.id" :value="item.id">{{item.name}}
                {{hasUsername? item.username: ''}}
            </a-select-option>
        </a-select>
    </div>
    <div v-else>
        <a-select ref="select" v-model:value="manager" placeholder="전체" @change="updateManager(manager)" show-search>
            <a-select-option v-for="item in result?.findManagerUsers" :key="item.id" :value="item.id">{{item.name}}
                {{hasUsername? item.username: ''}}
            </a-select-option>
        </a-select>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import queries from "../graphql/queries/common/index";
import { useQuery } from "@vue/apollo-composable"; 
export default defineComponent({
    props: {
        selected: {
            type: Number,
            default: null,
            required: true
        },
        hasUsername: {
            type: Boolean,
            default: false
        },
        title: String
    },
    setup(props, { emit }) {
        const manager = ref(props.selected)
        const { result, loading, error, onResult, refetch } = useQuery(queries.getListManager);
        const updateManager = (value: any) => {
            emit('update:selected', value)
        }
        return {
            result,
            manager,
            updateManager
        }
    },
})
</script>
