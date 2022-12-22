export default (axios) => ({
    getAll: (params) => axios.get('/auth/users', { params }).then((_) => _.data),
    getDetail: () => axios.get('/auth/me').then((_) => _.data),
    update: (data) => axios.post('/auth/add-role-to-user', data).then((_) => _.data),
});
