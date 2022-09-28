import uploadRepository from "./uploadRepository";
import setupRepository from "./setupRepository";
const repositories = {
    'upload': uploadRepository,
    'setup': setupRepository
}
export default {
    get: name => repositories[name]
};