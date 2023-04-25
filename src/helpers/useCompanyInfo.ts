import { reactive, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import {Company} from "@/views/PA/PA8/PA810/utils";
import getMyCompany from "@/graphql/queries/common/getMycompany";

export function useCompanyInfo(companyId: number) {
  const infoCompany = reactive({
    name: '',
    bizNumber: '',
    presidentName: '',
    address: ''
  })

  const {
    result: dataCompany,
    loading,
    refetch,
  } = useQuery(
    getMyCompany,
    {companyId: companyId},
    () => ({
      fetchPolicy: "no-cache",
    })
  )

  watch(dataCompany, (value) => {
    if (value) {
      infoCompany.name = value.getMyCompany.name
      infoCompany.bizNumber = value.getMyCompany.bizNumber
      infoCompany.presidentName = value.getMyCompany.presidentName
      infoCompany.address = value.getMyCompany.address
    }
  })

  return {
    dataCompany,
    loading,
    infoCompany,
    refetch
  }
}
