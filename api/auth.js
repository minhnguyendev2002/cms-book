export default (axios) => ({
    signUp: (payload) => axios.post('/auth/signup', payload).then((_) => _.data),
    signIn: (payload) => axios.post('/login', payload).then((_) => _.data),
});
