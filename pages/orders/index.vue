<template>
    <div>
        <div class="space-y-4">
            <ct-page-header text="Quản lý đơn hàng" />
        </div>

        <div class="mt-6">
            <div class="mb-5 flex gap-20">
                <span class="text-lg font-semibold">Số đơn đã giao: 2</span>
                <span class="text-lg font-semibold">Tổng tiền: 120.000đ</span>
            </div>
            <OrderTable :books="books" />
        </div>
    </div>
</template>

<script>
    import OrderTable from '@/components/orders/AdminTable.vue';

    export default {
        components: {
            OrderTable,
        },

        data() {
            return {
                books: [
                    {
                        id: '1',
                        thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
                        title: 'Sách rất vip 123',
                        author: 'Minh nguyễn',
                        price: '120000',
                        count: '2',
                        sumPrice: '240000',
                        status: 'delivered',
                    },
                    {
                        id: '2',
                        thumbnail: 'https://images.unsplash.com/photo-1616414627817-42b4d91bcb5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eSUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80',
                        title: 'Bún bò huế',
                        author: 'Shin Nana',
                        price: '99000',
                        count: '1',
                        sumPrice: '99000',
                        status: 'denied',
                    },
                    {
                        id: '3',
                        thumbnail: 'https://euro-anime.id/wallpaper/wallpaper/20220223/anime-aesthetic-street-wallpapers-wallpaper-caveanimated-city-screet-wallpaper-preview.webp',
                        title: 'Sách cổ truyền Việt Nam',
                        author: 'Tu Porn',
                        price: '120000',
                        count: '3',
                        sumPrice: '360000',
                        status: 'delivery',
                    },
                    {
                        id: '4',
                        thumbnail: 'https://cdn.dribbble.com/users/2925801/screenshots/14267264/urban_city_-_background_for_video_conferencing_1_4x.jpg',
                        title: 'Sách Vip pro Việt Nam',
                        author: 'Tu Porn',
                        price: '120000',
                        count: '3',
                        sumPrice: '360000',
                        status: 'cancelled',
                    },
                    {
                        id: '5',
                        thumbnail: 'https://euro-anime.id/wallpaper/wallpaper/20220223/anime-aesthetic-street-wallpapers-wallpaper-caveanimated-city-screet-wallpaper-preview.webp',
                        title: 'Sách cổ truyền Việt Nam',
                        author: 'Tu Porn',
                        price: '120000',
                        count: '3',
                        sumPrice: '360000',
                        status: 'watting',
                    },
                    {
                        id: '2',
                        thumbnail: 'https://images.unsplash.com/photo-1616414627817-42b4d91bcb5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eSUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80',
                        title: 'Bún bò huế',
                        author: 'Shin Nana',
                        price: '99000',
                        count: '1',
                        sumPrice: '99000',
                        status: 'cancelled',
                    },
                ],
            };
        },

        head() {
            return {
                title: 'Đơn hàng | CMS Book',
            };
        },
    };
</script>
