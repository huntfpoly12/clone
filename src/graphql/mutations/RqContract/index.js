import gql from "graphql-tag";

const mutations = {

  creactContract: gql`
    mutation createSubscriptionRequest(
        $terms: Boolean!,
        $personalInfo: Boolean!,
        $accountingService: Boolean!,
        $withholdingService: Boolean!,
        $nameCompany:String!,
        $zipcode:String!,
        $roadAddress:String!,
        $jibunAddress:String!,
        $addressExtend:String!,
        $bcode: String!,
        $bname: String!,
        $buildingCode:String!,
        $buildingName:String!,
        $roadname: String!,
        $roadnameCode:String!,
        $sido: String!,
        $sigungu:String!,
        $sigunguCode:String!,
        $zonecode: String!,
        $capacityHolding : Int!
        $phone: String!,
        $fax: String!,
        $licenseFileStorageId: Int!,
        $bizNumber: String!,
        $residentId: String!,
        $namePresident : String!,
        $birthday : String!,
        $mobilePhone : String!,
        $email : String!,   
        $startYearMonthHolding : String! ,  
        $accountNumber : String! ,
        $ownerBizNumber : String! ,
        $ownerName : String!,
        $withdrawDay : String!,
        $salesRepresentativeId: Int! ,
        $comment: String!,    
        
        $bizType: BizTypeScalar!,
        $accountingServiceTypes: [AccountingAdditionalServiceTypeScalar!]!,
        $withholdingServiceTypes: [WithholdingAdditionalServiceTypeScalar!]!,
        $bankType: BankTypeScalar!,

        $facilityBusinesses: SubscriptionRequestFacilityBusinessInput!,

        ) {
        createSubscriptionRequest(content :{
            agreements: {
            terms: $terms
            personalInfo: $personalInfo
            accountingService: $accountingService
            withholdingService: $withholdingService
            }
            company: {
                name: $nameCompany
                zipcode: $zipcode
                roadAddress: $roadAddress
                jibunAddress: $jibunAddress
                addressExtend: $addressExtend
                addressDetail: {
                    bcode: $bcode
                    bname: $bname
                    buildingCode: $buildingCode
                    buildingName: $buildingName
                    roadname: $roadname
                    roadnameCode: $roadnameCode
                    sido: $sido
                    sigungu: $sigungu
                    sigunguCode: $sigunguCode
                    zonecode: $zonecode
                }
                phone: $phone
                fax: $fax
                licenseFileStorageId: $licenseFileStorageId
                bizNumber: $bizNumber
                bizType: $bizType
                residentId: $residentId
            }
            president: {
                name: $namePresident
                birthday: $birthday
                mobilePhone: $mobilePhone
                email: $email
            }
            accounting: {
                facilityBusinesses:  [$facilityBusinesses]
                accountingServiceTypes: $accountingServiceTypes
            }
            withholding: {
                startYearMonth: $startYearMonthHolding
                capacity: $capacityHolding
                withholdingServiceTypes: $withholdingServiceTypes
            }
            cmsBank: {
                bankType: $bankType
                accountNumber: $accountNumber
                ownerBizNumber: $ownerBizNumber
                ownerName: $ownerName
                withdrawDay: $withdrawDay
            }
            extra: {
                salesRepresentativeId: $salesRepresentativeId
                comment: $comment
            }
        },) {
                id
                status
                code
        }
    }
    `
  ,
};

export default mutations;