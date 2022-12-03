<template>
    <div>
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <ct-page-header text="Cửa hàng" />
                <a-button type="primary" @click="$refs.AddBookDialog.open()">
                    <i class="fas fa-plus" />
                    Thêm sách mới
                </a-button>
            </div>
        </div>

        <div class="grid grid-cols-12 gap-5 mt-6">
            <CardBook class="col-span-4" />
            <CardBook class="col-span-4" />
            <CardBook class="col-span-4" />
            <CardBook class="col-span-4" />
            <CardBook class="col-span-4" />
            <CardBook class="col-span-4" />
            <CardBook class="col-span-4" />
            <CardBook class="col-span-4" />
            <CardBook class="col-span-4" />
            <CardBook class="col-span-4" />
        </div>

        <AddBookDialog ref="AddBookDialog" />
    </div>
</template>

<script>
    import CardBook from '@/components/books/Card.vue';
    import AddBookDialog from '@/components/books/Dialog.vue';

    export default {
        auth: false,
        components: {
            CardBook,
            AddBookDialog,
        },
        head() {
            return {
                title: 'Cửa hàng | CMS Book',
            };
        },
    };
</script>
