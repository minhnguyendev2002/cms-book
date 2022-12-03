<template>
    <div>
        <div class="space-y-4">
            <ct-page-header text="Giỏ hàng" />
        </div>

        <div class="mt-6">
            <div class="mb-5 flex gap-20">
                <span class="text-lg font-semibold">Số đơn đã đặt: 2</span>
                <span class="text-lg font-semibold">Tổng tiền: 120.000đ</span>
            </div>
            <OrderTable />
        </div>
    </div>
</template>

<script>
    import OrderTable from '@/components/orders/UserTable.vue';

    export default {
        components: {
            OrderTable,
        },
        head() {
            return {
                title: 'Đơn hàng | CMS Book',
            };
        },
    };
</script>
