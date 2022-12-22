export default (context, inject) => {
    const isAdmin = () => !!this.$auth.user.authorities.find((item) => item.authority === 'ROLE_ADMIN');

    inject('isAdmin', isAdmin);
};
