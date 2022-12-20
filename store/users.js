export const state = () => ({
    users: [],
    user: {},
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
        const { data } = await this.$api.users.getAll(payload);
        commit('SET_STATE', { prop: 'users', data });
    },
    async fetchDetail({ commit }) {
        const { data } = await this.$api.books.getDetail();
        commit('SET_STATE', { prop: 'user', data });
    },
};
