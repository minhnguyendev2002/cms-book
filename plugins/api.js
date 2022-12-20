import Auth from '@/api/auth';
import Users from '@/api/users';
import Books from '@/api/books';
import Carts from '@/api/carts';
import Reviews from '@/api/reviews';
import Uploaders from '@/api/uploaders';

export default (context, inject) => {
    // Initialize API factories
    const factories = {
        auth: Auth(context.$axios),
        users: Users(context.$axios),
        books: Books(context.$axios),
        carts: Carts(context.$axios),
        reviews: Reviews(context.$axios),
        uploaders: Uploaders(context.$axios),
    };

    // Inject $api
    inject('api', factories);
};
