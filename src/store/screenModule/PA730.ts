

const state = {
  top: [],
  actionSave:0,
  keyActive: 1, 
};

const getters = {
    top: (state:any) => state.top,
    keyActive: (state: any) => state.keyActive,
};

const mutations = {
//   [SEARCH_FAVORITE.SEARCH_CONDITION](state, data) {
//     if (!data.error) {
//       state.conditions = data;
//     }
//   },
};

const actions = {
//   async searchCondition({ commit }) {
//     const res = await searchCondition();
//     commit(SEARCH_FAVORITE.SEARCH_CONDITION, res);
//     return res;
//   },

};
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true,
}
