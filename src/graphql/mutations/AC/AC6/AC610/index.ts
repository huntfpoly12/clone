import createClient from './createClient';
import searchClients from './updateClient';
const mutations = {
    createClient: createClient,
    searchClients: searchClients,
};

export default mutations;