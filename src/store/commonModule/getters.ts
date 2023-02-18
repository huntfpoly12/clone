import screenGetterPA120 from "./screenGetters/screenPA120";
import screenGetterPA620 from "./screenGetters/screenGetterPA620";
import screenGetterPA720 from "./screenGetters/screenGetterPA720";
const getters = {
    ...screenGetterPA120,
    ...screenGetterPA620,
    ...screenGetterPA720,
};
export default getters;
