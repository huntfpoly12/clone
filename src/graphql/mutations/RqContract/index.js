import gql from "graphql-tag";

const mutations = {
  creactContract: gql`
    mutation createSubscriptionRequest(
      $terms: Boolean!,
      $personalInfo: Boolean!,
      $accountingService: Boolean!,
      $withholdingService: Boolean!,

      $name:String!,
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

      $phone: String!,
      $fax: String!,
      $licenseFileStorageId: Int!,
      $bizNumber: String!,
      $bizType: Int!,
      $residentId: String!,

      $presidentName : String!,
      $presidentBirthday : String!,
      $presidentMobilePhone : String!,
      $presidentEmail : String!,
      
      $longTermCareInstitutionNumber : String!,
      $facilityBizType:Int!,
      $facilityName : String! ,
      $facilitystartYearMonth : String!,
      $facilityCapacity : Int!,
      $registrationCardFileStorageId : Int!,
      
      $accountingServiceTypes : Int!,

      $holdingstartYearMonth : String! ,
      $holdingCapacity : Int! ,
      $withholdingServiceTypes :  Int! ,

      $bankType :  String!,
      $accountNumber : String! ,
      $ownerBizNumber : String! ,
      $ownerName : String!,
      $withdrawDay : String!,


      $salesRepresentativeId: Int! ,
      $comment: String! 
    ) {
      createSubscriptionRequest(content :{
        agreements: {
          terms: $terms
          personalInfo: $personalInfo
          accountingService: $accountingService
          withholdingService: $withholdingService
        }
        company: {
            name: $name
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
            name: $presidentName
            birthday: $presidentBirthday
            mobilePhone: $presidentMobilePhone
            email: $presidentEmail
        }
        accounting: {
            facilityBusinesses: {
                longTermCareInstitutionNumber: $longTermCareInstitutionNumber
                facilityBizType: $facilityBizType
                name: $facilityName
                startYearMonth: $facilitystartYearMonth
                capacity: $facilityCapacity
                registrationCardFileStorageId: $registrationCardFileStorageId
            }
            accountingServiceTypes: $accountingServiceTypes
        }
        withholding: {
            startYearMonth: $startYearMonthHolding
            capacity: $capacityHolding
            withholdingServiceTypes: $withholdingServiceTypes
        }
        cmsBank: {
            bankType: $ankType
            accountNumber: $accountNumber
            ownerBizNumber: $ownerBizNumber
            ownerName: $ownerName
            withdrawDay: $withdrawDay
        }
        extra: {
            salesRepresentativeId: $salesRepresentativeId
            comment: $comment
        }
      }
      ) {
        id
        status
        code
      }
    }
  `,
};

export default mutations;