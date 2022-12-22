<template>
    <div>
        <div class="space-y-4">
            <ct-page-header text="Giỏ hàng của tôi" />
        </div>

        <div class="mt-6">
            <transition name="translate-x-transition">
                <div class="my-4 bg-white shadow-light px-3 py-2 rounded-md w-96">
                    <div class="flex items-center justify-between">
                        <div class="font-medium">
                            Đơn hàng đã chọn: {{ bookSelected.length | numberFormat }}
                        </div>
                        <a-button
                            type="primary"
                            :disabled="!isEnabelOrder"
                            @click="$refs.ConfirmDialog.open()"
                        >
                            <i class="fas fa-check" /> Đồng ý đặt hàng
                        </a-button>
                    </div>
                </div>
            </transition>
            <CartTable :books="carts" @selected="selectedBook" />
        </div>

        <ConfirmDialog ref="ConfirmDialog">
            <section class="relative pt-10 pb-20">
                <div class="w-full">
                    <div class="mx-auto">
                        <img src="/images/update.jpg" alt="/" class="w-full h-auto mx-auto rounded-md"> <h4 class="mt-4 text-center text-xl">
                            Tính năng đang nghiên cứu phát triển
                        </h4>
                    </div>
                </div>
            </section>
        </ConfirmDialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import CartTable from '@/components/carts/Table.vue';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';

    export default {
        components: {
            CartTable,
            ConfirmDialog,
        },

        async fetch() {
            await this.fetchCart();
        },

        data() {
            return {
                bookSelected: [],
                books: [
                    {
                        id: '1',
                        thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
                        title: 'Sách rất vip 123',
                        author: 'Minh nguyễn',
                        price: '120000',
                        count: '2',
                        sumPrice: '240000',
                    },
                    {
                        id: '2',
                        thumbnail: 'https://images.unsplash.com/photo-1616414627817-42b4d91bcb5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eSUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80',
                        title: 'Bún bò huế',
                        author: 'Shin Nana',
                        price: '99000',
                        count: '1',
                        sumPrice: '99000',
                    },
                    {
                        id: '3',
                        thumbnail: 'https://euro-anime.id/wallpaper/wallpaper/20220223/anime-aesthetic-street-wallpapers-wallpaper-caveanimated-city-screet-wallpaper-preview.webp',
                        title: 'Sách cổ truyền Việt Nam',
                        author: 'Tu Porn',
                        price: '120000',
                        count: '3',
                        sumPrice: '360000',
                    },
                ],
            };
        },

        computed: {
            ...mapState('carts', ['carts']),
            isEnabelOrder() {
                return this.bookSelected.length > 0;
            },
        },

        methods: {
            async fetchCart() {
                try {
                    await this.$store.dispatch('carts/fetchAll');
                } catch (e) {
                    this.$handleError(e);
                }
            },

            selectedBook(selectedBookIds, selectedBooks) {
                this.bookSelected = selectedBooks;
            },
        },

        head() {
            return {
                title: 'Giỏ hàng | CMS Book',
            };
        },
    };
</script>
