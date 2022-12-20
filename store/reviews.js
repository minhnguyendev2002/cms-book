export const state = () => ({
    reviews: [],
});

export const getters = {
};

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },
};

export const actions = {
    async fetchAll({ commit }, payload) {
        const { data } = await this.$api.reviews.getAll(payload);
        commit('SET_STATE', { prop: 'reviews', data });
    },
};
