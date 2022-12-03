<template>
    <div>
        <div class="space-y-4">
            <ct-page-header text="Dashbroad" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start mt-6">
            <div class="sm:col-span-6 sm:grid-cols-1 lg:col-span-8 xl:col-span-9 xl:grid-cols-3 grid items-center gap-5">
                <a-spin v-for="item in items" :key="item.title" :spinning="loading">
                    <div class="duration-150 relative overflow-hidden flex items-center p-6 shadow-md hover:shadow-xl rounded-md bg-gradient-to-r" :class="[`from-${item.bgFrom}`, `to-${item.bgTo}`]">
                        <i :class="[item.icon]" class="text-4xl text-white" />
                        <span class="ml-5 text-white">
                            <h3 class="text-white uppercase">{{ item.title }}</h3>
                            <span class="text-4xl mr-1">{{ item.amount }}</span> {{ item.label }}
                        </span>
                        <span class="absolute rounded-full -right-28 -top-16 w-44 h-44 bg-white opacity-30" />
                        <span class="absolute rounded-full -right-6 top-14 w-44 h-44 bg-white opacity-40" />
                    </div>
                </a-spin>
            </div>

            <DashboardMenu />

            <div class="sm:col-span-12 grid grid-cols-12 items-stretch gap-5 xl:col-span-9 ">
                <DashboardChart
                    title="Thống kê truy cập"
                    tooltip="Lượng người truy cập thông qua các trang mạng xã hội."
                    :labels="['Facebook', 'Instagram', 'Tiktok']"
                />
                <DashboardChart
                    title="Thống kê lượt tương tác"
                    tooltip="Lượt tương tác đến từ những lần quẹt thẻ của bạn."
                    :labels="['Follow', 'View', 'Match']"
                />
                <DashboardChart
                    title="Thống kê thiết bị"
                    tooltip="Thống kê thiết bị bạn đang sử dụng"
                    :labels="['GenDoor', 'GenLight', 'SmartKey']"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import DashboardMenu from '@/components/dashboard/Menu.vue';
    import DashboardChart from '@/components/dashboard/Chart.vue';

    export default {
        layout: 'admin',

        components: {
            DashboardChart,
            DashboardMenu,
        },

        // async fetch() {
        //     await this.fetchData();
        // },

        data() {
            return {
                loading: false,
            };
        },

        computed: {
            items() {
                return [{
                    title: 'Lượt Xem',
                    amount: 1,
                    icon: 'fas fa-cart-arrow-down',
                    bgFrom: 'prim-800',
                    bgTo: 'prim-900',
                    label: 'lượt',
                }, {
                    title: 'Đã lưu',
                    amount: 2,
                    icon: 'far fa-chart-bar',
                    bgFrom: 'second-500',
                    bgTo: 'second-600',
                    label: 'liên hệ',
                }, {
                    title: 'Liên kết',
                    amount: 3,
                    icon: 'fas fa-microchip',
                    bgFrom: 'yellow-900',
                    bgTo: 'warning-900',
                    label: 'thiết bị',
                }];
            },
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    // await this.$store.dispatch('dashboards/fetchDashboards');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Dashboard | CMS Book',
            };
        },

    };
</script>
