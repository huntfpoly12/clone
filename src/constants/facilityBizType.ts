import { FacilityBizType } from "@bankda/jangbuda-common";
// export default FacilityBizType.all()
let states: any[] = []
FacilityBizType.all().map(item => states.push({
    ID: item.enumOrdinal,
    Name:item.name
}))
console.log(states);

export default states