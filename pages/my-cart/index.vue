<template>
    <div>
        <div class="space-y-4">
            <ct-page-header text="Giỏ hàng" />
        </div>

        <div class="mt-6">
            <transition name="translate-x-transition">
                <div class="my-4 bg-white shadow-light px-3 py-2 rounded-md w-96">
                    <div class="flex items-center justify-between">
                        <div class="font-medium">
                            Đơn hàng đã chọn: 100
                        </div>
                        <a-button
                            type="primary"
                            @click="addStudentsToClass"
                        >
                            <i class="fas fa-check" /> Đồng ý đặt hàng
                        </a-button>
                    </div>
                </div>
            </transition>
            <CartTable />
        </div>
    </div>
</template>

<script>
    import CartTable from '@/components/carts/Table.vue';

    export default {
        components: {
            CartTable,
        },
        head() {
            return {
                title: 'Giỏ hàng | CMS Book',
            };
        },
    };
</script>
