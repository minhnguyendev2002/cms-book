<template>
    <div>
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <ct-page-header text="Cửa hàng" />
                <a-button type="primary" @click="$refs.AddBookDialog.open({}, true, true)">
                    <i class="fas fa-plus" />
                    Thêm sách mới
                </a-button>
            </div>
        </div>

        <div class="grid grid-cols-12 gap-5 mt-6">
            <CardBook v-for="book in books" :key="book.id" class="col-span-4" />
        </div>

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
            ...mapState('books', ['books']),
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
