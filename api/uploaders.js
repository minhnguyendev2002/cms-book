export default (axios) => ({
    getFiles: (id) => axios.get(`/book/image/${id}`).then((_) => _.data),
    uploadFiles: (idBook, payload) => axios.post(`/book/admin/image/${idBook}`, payload).then((_) => _.data),
    updateImage: (idImage, payload) => axios.put(`/book/admin/image/${idImage}`, payload).then((_) => _.data),
});
