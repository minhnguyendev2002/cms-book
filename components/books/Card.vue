<template>
    <div class="bg-white rounded-[15px] p-5 ">
        <div class="grid grid-cols-2 gap-5">
            <div class="">
                <img
                    class="rounded"
                    :src="'data:image/jpeg;base64,' + thumbnail"
                    ratio="1"
                    alt="/"
                >
            </div>
            <div class="mt-auto mb-3">
                <h2>{{ book.title || 'Sách của Tú' }}</h2>
                <h4>Mô tả:</h4>
                <p>{{ book.description || 'Đây là sách vipro' }}</p>
            </div>
        </div>
        <div class="flex justify-between items-center mt-5">
            <div class="flex items-center gap-3">
                <img
                    class="w-[80px] h-[80px] rounded-full object-cover"
                    src="data:image/jpeg;base64,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"
                    alt="aa"
                >
                <div>
                    <h3 class="mb-0">
                        {{ book.author || 'Vũ Ngọc Tú' }}
                    </h3>
                    <p class="mb-0">
                        Tác giả
                    </p>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <a-button
                    v-if="$isAdmin()"
                    type="primary"
                    class="!rounded-full !h-12 !w-12"
                    @click="$refs.BookDialog.open(book, true, false, thumbnail)"
                >
                    <i class="fas fa-pen" />
                </a-button>
                <a-button type="primary" class="!rounded-full !h-12 !w-12" @click="$refs.BookDialog.open(book, false, false, thumbnail)">
                    <i class="fas fa-eye" />
                </a-button>
                <a-button type="primary" class="!rounded-full !h-12 !w-12" @click="$refs.AddCartDiaLog.open(book)">
                    <i class="fas fa-shopping-cart" />
                </a-button>
            </div>
        </div>
        <AddCartDiaLog ref="AddCartDiaLog" />
        <BookDialog ref="BookDialog" />
    </div>
</template>

<script>
    import AddCartDiaLog from '@/components/carts/AddCart.vue';
    import BookDialog from '@/components/books/Dialog.vue';

    export default {
        components: {
            BookDialog,
            AddCartDiaLog,
        },
        props: {
            book: {
                type: Object,
                default: () => {},
            },
        },

        async fetch() {
            await this.getImage();
        },

        data() {
            return {
                thumbnail: null,
            };
        },

        methods: {
            async getImage() {
                if (this.book?.imageId) {
                    try {
                        this.thumbnail = await this.$api.uploaders.getFiles(this.book?.imageId);
                    } catch (e) {
                        this.$handleError(e);
                    }
                }
            },
        },
    };
</script>
