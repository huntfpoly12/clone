import { reactive, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import {Company} from "@/views/PA/PA8/PA810/utils";
import getCompany from "@/graphql/queries/common/getCompany";

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
  } = useQuery<{ getCompany: Company }>(
    getCompany,
    {id: companyId},
    () => ({
      fetchPolicy: "no-cache",
    })
  )

  watch(dataCompany, (value) => {
    if (value) {
      infoCompany.name = value.getCompany.name
      infoCompany.bizNumber = value.getCompany.bizNumber
      infoCompany.presidentName = value.getCompany.presidentName
      infoCompany.address = value.getCompany.address
    }
  })

  return {
    dataCompany,
    loading,
    infoCompany,
    refetch
  }
}
