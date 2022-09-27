import gql from "graphql-tag"; 

const mutations = {
  creactContract: gql`
    mutation createSubscriptionRequest(
      $terms: Boolean!
      $personalInfo: Boolean!
      $accountingService: Boolean!
      $withholdingService: Boolean!

      $name:String!
      $zipcode:String!
      $roadAddress:String!
      $jibunAddress:String!
      $addressExtend:String!

      $bcode: String!
      $bname: String!
      $buildingCode:String!
      $buildingName:String!
      $roadname: String!
      $roadnameCode:String!
      $sido: String!
      $sigungu:String!
      $sigunguCode:String!
      $zonecode: String!
      $bankType: String!

      $phone: String!
      $fax: String!
      $licenseFileStorageId: Int!
      $bizNumber: String! 
      $residentId: String!

      $presidentName : String!
      $birthday : String! 
      $mobilePhone : String! 
      $email : String! 
      
      $longTermCareInstitutionNumber : String!  
      $startYearMonth : String!
      $capacity : Int!
      $registrationCardFileStorageId : Int!
      
      $startYearMonthHolding : String! 
      $capacityHolding : Int! 
      $withholdingServiceTypes : Int! 
      
      $accountNumber : String! 
      $ownerBizNumber : String! 
      $ownerName : String!
      $withdrawDay : String!

      $salesRepresentativeId: Int! 
      $accountingServiceTypes: Int! 
      $bizType: Int! 
      $facilityBizType: Int! 
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
            bizType:  $bizType
            residentId: $residentId
        }
        president: {
            name: $presidentName
            birthday: $birthday
            mobilePhone: $mobilePhone
            email: $email
        }
        accounting: {
            facilityBusinesses: {
                longTermCareInstitutionNumber: $longTermCareInstitutionNumber
                facilityBizType: $facilityBizType
                name: $name
                startYearMonth: $startYearMonth
                capacity: $capacity
                registrationCardFileStorageId: $registrationCardFileStorageId
            }
            accountingServiceTypes: $accountingServiceTypes
        }
        withholding: {
            startYearMonth: $startYearMonthHolding
            capacity: $capacityHolding
            withholdingServiceTypes:  $withholdingServiceTypes
        }
        cmsBank: {
            bankType:  $bankType
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