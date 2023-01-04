

const state = {
    isErrorForm: false,
    keyActive: 1, 
    pending: false,
    actionSave:0,
};

const getters = {
    isErrorForm: (state: any) => state.isErrorForm,
    keyActive: (state: any) => state.keyActive,
};

const mutations = {
    //   [SEARCH_FAVORITE.SEARCH_CONDITION](state, data) {
    //     if (!data.error) {
    //       state.conditions = data;
    //     }
    //   },
    hasError(state: any, data: Boolean) {
        state.isErrorForm = data;
    },
    changeKeyActive(state: any,data: Number){
        state.keyActive = data;
    },
    pending(state:any) {
        state.pending = true;
    },
    actionSave(state:any) {
        state.pending++;
    }
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
