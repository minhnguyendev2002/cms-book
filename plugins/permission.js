export default (context, inject) => {
    const isAdmin = () => context.$auth.user.authorities.filter((item) => item.authority === 'ROLE_ADMIN').length > 0;

    inject('isAdmin', isAdmin);
};
