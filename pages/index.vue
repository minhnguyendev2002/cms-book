<template>
    <div>
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <ct-page-header text="Cửa hàng" />
                <a-button v-if="$isAdmin()" type="primary" @click="$refs.AddBookDialog.open({}, true, true)">
                    <i class="fas fa-plus" />
                    Thêm sách mới
                </a-button>
            </div>
        </div>

        <div class="grid grid-cols-12 gap-5 mt-6 mb-8">
            <CardBook
                v-for="book in books"
                :key="book.id"
                :book="book"
                class="col-span-12 lg:col-span-6 2xl:col-span-4"
            />
        </div>
        <ct-pagination :data="pagination" />

        <AddBookDialog ref="AddBookDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import CardBook from '@/components/books/Card.vue';
    import AddBookDialog from '@/components/books/Dialog.vue';

    export default {
        components: {
            CardBook,
            AddBookDialog,
        },

        async fetch() {
            await this.fetchData();
        },

        computed: {
            ...mapState('books', ['books', 'pagination']),
        },

        methods: {
            async fetchData() {
                try {
                    await this.$store.dispatch('books/fetchAll', this.$route.query);
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },

        head() {
            return {
                title: 'Cửa hàng | CMS Book',
            };
        },
    };
</script>
