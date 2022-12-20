export default (axios) => ({
    signIn: (payload) => axios.post('/auth/signup', payload).then((_) => _.data),
    signUp: (payload) => axios.post('/login', payload).then((_) => _.data),
});
