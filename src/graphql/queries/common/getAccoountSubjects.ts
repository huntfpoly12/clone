import gql from "graphql-tag";
export default gql`
  query getAccoountSubjects(
    $companyId: Int!,
    $fiscalYear: Float!,
    $facilityBizType: FacilityBizTypeScalar!,
    ) {
      getAccoountSubjects(
        companyId:$companyId
        fiscalYear:$fiscalYear
        facilityBizType: $facilityBizType) 
        {
          theOrder
          useStartDate
          useFinishDate
          codes{
            classification
            code1
            shortCode1
            name1
            code2
            shortCode2
            name2
            code3
            shortCode3
            name3
            code
            shortCode
            name
            defaultFundingSource
            standardCode
            standardCodeName
          }
        }
  }
`;
