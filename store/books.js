export const state = () => ({
    books: [],
    pagination: {},
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
        const {
            content, number, totalElements, size,
        } = await this.$api.books.getAll(payload);
        commit('SET_STATE', { prop: 'books', data: content });
        commit('SET_STATE', {
            prop: 'pagination',
            data: {
                page: number + 1,
                total: totalElements,
                perPage: size,
            },
        });
    },
    async fetchDetail({ commit }, id) {
        const { data } = await this.$api.books.getDetail(id);
        commit('SET_STATE', { prop: 'book', data });
    },
};
