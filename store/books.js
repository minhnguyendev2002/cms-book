export const state = () => ({
    books: [],
    book: {},
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
        const { data: { content } } = await this.$api.books.getAll(payload);
        commit('SET_STATE', { prop: 'books', data: content });
    },
    async fetchDetail({ commit }, id) {
        const { data } = await this.$api.books.getDetail(id);
        commit('SET_STATE', { prop: 'book', data });
    },
};
