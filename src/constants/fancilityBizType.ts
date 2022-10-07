import { FacilityBizType } from "@bankda/jangbuda-common";
// export default FacilityBizType.all()
let states: any[] = []
FacilityBizType.all().map(item => states.push({
    item
}))
export default states