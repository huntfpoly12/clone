import { reactive, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { Company } from "@/views/PA/PA8/PA810/utils";
import getMyCompany from "@/graphql/queries/common/getMycompany";

export function useCompanyInfo(companyId: number) {
  const infoCompany = reactive({
    name: '',
    bizNumber: '',
    presidentName: '',
    address: '',
    phone: '',
    extendInfo: {
      detail: {
        fax: ''
      }
    }
  })

  const {
    result: dataCompany,
    loading,
    refetch,
  } = useQuery(
    getMyCompany,
    { companyId: companyId },
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
      infoCompany.phone = value.getMyCompany.phone
      infoCompany.extendInfo.detail.fax = value.getMyCompany.extendInfo.detail.fax
    }
  })

  return {
    dataCompany,
    loading,
    infoCompany,
    refetch
  }
}
