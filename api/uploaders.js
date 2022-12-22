export default (axios) => ({
    getFiles: (id) => axios.get(`/book/image/${id}`).then((_) => _.data),
    uploadFiles: (idBook, payload) => axios.post(`/book/admin/image/${idBook}`, payload).then((_) => _.data),
});
