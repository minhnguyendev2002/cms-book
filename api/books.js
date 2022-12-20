export default (axios) => ({
    getAll: (params) => axios.get('/book', { params }).then((_) => _.data),
    getDetail: (id) => axios.get(`/book/${id}`).then((_) => _.data),
    create: (payload) => axios.post('/book/admin', payload).then((_) => _.data),
    update: (id, payload) => axios.put(`/book/admin/${id}`, payload).then((_) => _.data),
    delete: (id) => axios.delete(`/book/admin/${id}`).then((_) => _.data),
});
