<template>
    <div class="!w-[270px] h-screen bg-white flex flex-col p-3">
        <div class="flex justify-center items-center py-3">
            <nuxt-link to="/" class="flex items-center justify-center gap-3">
                <div class="font-medium text-second-900 text-center text-xl">
                    Build with VuNgocTu
                </div>
            </nuxt-link>
        </div>
        <a-menu
            :open-keys="openKeys"
            :default-selected-keys="activeKeys"
            :inline-collapsed="collapsed"
            class="!mt-6 w-full flex-grow overflow-y-auto custom-scroll overflow-x-hidden !p-1"
            mode="inline"
            @click="handleClick"
            @openChange="handleOpenChange"
        >
            <a-menu-item key="/">
                <i class="isax isax-graph" />
                <span class="ml-3"> Cửa hàng </span>
            </a-menu-item>
            <a-menu-item key="/my-cart">
                <i class="isax isax-shopping-cart" />
                <span class="ml-3"> Giỏ hàng của tôi </span>
            </a-menu-item>
            <a-menu-item v-if="checkAdmin" key="/users">
                <i class="isax isax-user" />
                <span class="ml-3"> Quản lý Người dùng </span>
            </a-menu-item>
        </a-menu>

        <div class="border-t border-prim-300 pt-3">
            <div class="flex items-center gap-3">
                <div class="border border-gray-100 rounded-md overflow-hidden">
                    <img
                        :src="authUser.avatar || '/images/default-avatar.jpg'"
                        onerror="this.src='/images/default-avatar.jpg'"
                        class="w-12 aspect-square object-cover"
                    >
                </div>
                <div>
                    <div class="font-medium text-gray-900 hover:underline">
                        {{ authUser.username || 'Vũ Ngọc Tú' }}
                    </div>
                    <span>
                        {{ !checkAdmin ? 'User' : 'Admin' }}
                    </span>
                </div>
            </div>
            <a-button
                type="primary"
                class="mt-3 w-full"
                size="small"
                @click="logout"
            >
                <i class="fa-solid fa-right-from-bracket" />
                Đăng xuất
            </a-button>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
        },

        async fetch() {
            await this.fetchData();
        },

        data() {
            return {
                isOpen: true,
                openKeys: [],
                logoutVisible: false,
                collapsed: false,
                visible: false,
            };
        },

        computed: {
            activeKeys() {
                return [this.$route.path];
            },

            authUser() {
                return this.$auth.user || {};
            },

            checkAdmin() {
                return this.authUser.authorities.filter((item) => item.authority === 'ROLE_ADMIN').length > 0;
            },
        },

        async mounted() {
            this.collapsed = localStorage.getItem('collapsed') || false;
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            handleClick({ key }) {
                this.$router.push(key);
            },

            handleOpenChange(keys) {
                this.openKeys = keys?.length ? [keys?.pop()] : [];
            },

            toggleCollapsed() {
                this.collapsed = !this.collapsed;
                localStorage.setItem(this.localStorage);
            },

            handleHoverChange(visible) {
                this.visible = visible;
            },

            async logout() {
                await this.$auth.logout();
                window.location.replace('/login');
            },
        },
    };
</script>
