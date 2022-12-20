export default (axios) => ({
    getAll: (params) => axios.get('/cart', { params }).then((_) => _.data),
    create: (payload) => axios.post('/cart', payload).then((_) => _.data),
    update: (id, payload) => axios.put(`/cart/${id}`, payload).then((_) => _.data),
    delete: (id) => axios.delete(`/cart/${id}`).then((_) => _.data),
});
