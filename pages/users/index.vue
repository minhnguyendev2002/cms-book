<template>
    <div>
        <div class="space-y-4">
            <ct-page-header text="Giỏ hàng của tôi" />
        </div>

        <div class="mt-6">
            <UsersTable :users="users" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import UsersTable from '@/components/users/Table.vue';

    export default {
        components: {
            UsersTable,
        },

        async fetch() {
            await this.fetchData();
        },

        data() {
            return {};
        },

        computed: {
            ...mapState('users', ['users']),
        },

        methods: {
            async fetchData() {
                try {
                    await this.$store.dispatch('users/fetchAll');
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },

        head() {
            return {
                title: 'Quản lý người dùng | CMS Book',
            };
        },
    };
</script>
