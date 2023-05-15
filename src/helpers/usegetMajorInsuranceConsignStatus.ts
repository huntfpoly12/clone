import { reactive, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { Company } from "@/views/PA/PA8/PA810/utils";
import getMajorInsuranceConsignStatus from "@/graphql/queries/common/getMajorInsuranceConsignStatus";

export default function useGetMajorInsuranceConsignStatus(companyId: number) {
  const infoMajorInsuranceConsignStatus = reactive({
    manageId: '',
  })

  const {
    result,
    loading,
    refetch,
  } = useQuery(
    getMajorInsuranceConsignStatus,
    { companyId: companyId },
    () => ({
      fetchPolicy: "no-cache",
    })
  )

  watch(result, (value) => {
    if (value) {
      infoMajorInsuranceConsignStatus.manageId = value.getMajorInsuranceConsignStatus.manageId
    }
  })

  return {
    loading,
    infoMajorInsuranceConsignStatus,
    refetch
  }
}
