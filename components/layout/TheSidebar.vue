<template>
    <div class="!w-[270px] h-screen bg-white flex flex-col p-3">
        <div class="flex justify-between items-center">
            <nuxt-link to="/" class="flex items-center gap-3">
                <img src="https://inkythuatso.com/uploads/images/2021/12/logo-pornhub-inkythuatso-21-15-41-06.jpg" width="66">
                <div class="font-medium text-second-900">
                    Web Porn VuNgocTu
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
            <template v-for="menuItem in menuItems">
                <a-menu-item v-if="!menuItem.childrens.length && !checkPermission(menuItem.permission)" :key="menuItem.key">
                    <i :class="`${menuItem.classIcon}`" />
                    <span class="ml-3"> {{ menuItem.label }} </span>
                </a-menu-item>
                <a-sub-menu v-if="menuItem.childrens.length > 0 && !checkPermission(menuItem.permission)" :key="menuItem.key">
                    <template #title>
                        <i :class="`${menuItem.classIcon}`" />
                        <span class="ml-3"> {{ menuItem.label }} </span>
                    </template>
                    <a-menu-item v-for="child in menuItem.childrens" :key="child.key">
                        <i :class="`${child.classIcon}`" />
                        <span class="ml-3"> {{ child.label }} </span>
                    </a-menu-item>
                </a-sub-menu>
            </template>
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
                        {{ authUser.fullName || 'Vũ Ngọc Tú' }}
                    </div>
                    <span>
                        {{ authUser.role || 'Admin' }}
                    </span>
                </div>
            </div>
            <a-button
                type="primary"
                class="mt-3 w-full"
                size="small"
                @click="confirm"
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
                // console.log(this.$route.path);
                return [this.$route.path];
            },

            authUser() {
                return this.$auth.user || {};
            },
            menuItems() {
                return [{
                    label: 'Dashboard',
                    key: '/',
                    permission: ['admin'],
                    classIcon: 'isax isax-graph',
                    childrens: [],
                }, {
                    label: 'Cửa hàng',
                    key: '/books',
                    permission: ['admin', 'user'],
                    classIcon: 'isax isax-user',
                    childrens: [],
                }, {
                    label: 'Giỏ hàng của tôi',
                    key: '/my-cart',
                    permission: ['user'],
                    classIcon: 'isax isax-shopping-cart',
                    childrens: [],
                }, {
                    label: 'Đơn hàng của tôi',
                    key: '/my-order',
                    permission: ['user'],
                    classIcon: 'isax isax-receipt-item',
                    childrens: [],
                }, {
                    label: 'Đơn hàng',
                    key: '/orders',
                    permission: ['admin'],
                    classIcon: 'isax isax-empty-wallet',
                    childrens: [],
                }];
            },
        },

        async mounted() {
            this.collapsed = localStorage.getItem('collapsed') || false;
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    // await this.$store.dispatch('notifications/fetchAll', this.$route.query);
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

            async confirm() {
                this.$refs.confirm.open();
            },

            checkPermission(keys) {
                return keys.includes(this.authUser.type || '');
            },

        },
    };
</script>
