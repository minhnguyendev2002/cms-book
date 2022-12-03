<template>
    <div class="sm:col-span-6 lg:col-span-4 xl:row-span-2 xl:col-span-3 flex flex-col gap-y-2 text-center bg-white px-3 py-5 rounded-md shadow-xl">
        <h2 class="">
            Tiện ích
        </h2>
        <div class="flex flex-col gap-y-4">
            <p class="text-xl">
                Tính năng đang trong quá trình phát triển <br>
                Vui lòng đợi
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                menu: [
                    {
                        label: 'Thêm thiết bị',
                        refModal: 'DeviceDialog',
                    },
                    {
                        label: 'Thêm đường liên kết',
                        refModal: 'ProfileDialog',
                    },
                    {
                        label: 'Chỉnh sửa giao diện',
                        path: '/management-information/theme?type=interface-theme',
                    },
                    {
                        label: 'Bán hàng Affiliate',
                        refModal: 'ComingSoonDialog',
                    },
                ],
            };
        },
    };
</script>
