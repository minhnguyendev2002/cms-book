export default (axios) => ({
    getAll: (id) => axios.get(`/review/${id}`).then((_) => _.data),
    create: (payload) => axios.post('/review', payload).then((_) => _.data),
});
