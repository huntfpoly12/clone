import { FacilityBizType } from "@bankda/jangbuda-common";
// export default FacilityBizType.all()
let states: any[] = []
FacilityBizType.all().map((item: any) =>
    states.push({
        ID: item.code,
        Name: item.name
    })

)



export default states