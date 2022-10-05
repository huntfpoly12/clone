import uploadRepository from "./uploadRepository";
import setupRepository from "./setupRepository";
const repositories: any = {
    'upload': uploadRepository,
    'setup': setupRepository
}
export default {
    get: (name: any) => repositories[name]
};