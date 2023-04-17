
<script lang="ts">
import { defineComponent, ref } from "vue";
import queries from "@/graphql/queries/BF/BF6/BF640/index";
import { useQuery } from "@vue/apollo-composable";
import notification from "@/utils/notification";
export default defineComponent({
    props: {
        data: Object,
    },
    setup(props, { emit }) {
        let arrStatus = ref()
        let dataSearch = ref({
            input: {
                companyId: props.data?.companyId,
                paymentYear: props.data?.paymentYear,
                paymentHalfYear: props.data?.paymentHalfYear,
            }
        })
        let {
            onResult, loading,onError
        } = useQuery(queries.getElectronicFilingsByIncomeWageSimplifiedPaymentStatement, dataSearch, () => ({
            fetchPolicy: "no-cache"
        }));
      onError((error: any) => {
            notification('error', error.message)
            emit('productionStatusData',{})
        })
      onResult((res: any) => {
        if (res && res.data) {
          let data = res.data.getElectronicFilingsByIncomeWageSimplifiedPaymentStatement;
          arrStatus.value = Array(data.slice(-1).pop());
          if(data) {
              emit('productionStatusData',{ companyId : props.data?.companyId , productStatus : data.slice(-1).pop()})
          }
        }
      })
    
    }
})
</script>
