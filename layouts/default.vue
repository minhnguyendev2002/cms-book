<template>
    <div class="flex justify-between bg-background min-h-screen">
        <div class="hidden md:block">
            <TheSidebar />
        </div>
        <div id="scrollBar" class="flex-grow flex flex-col h-screen overflow-x-hidden overflow-y-auto custom-scroll">
            <div class="p-4 lg:p-6 flex-grow flex flex-col">
                <nuxt v-if="!$slots.default" class="mt-2 flex-grow overflow-hidden" />
                <slot class="mt-2 flex-grow overflow-hidden" />
            </div>
        </div>
    </div>
</template>

<script>
    // import Scrollbar from 'smooth-scrollbar';
    // import TheHeader from '@/components/layout/TheHeader.vue';
    import TheSidebar from '@/components/layout/TheSidebar.vue';

    export default {
        components: {
            // TheHeader,
            TheSidebar,
        },

        data() {
            return {
                scrollListener: undefined,
            };
        },

        watch: {
            '$route.query': {
                handler() {
                    const scroll = document.getElementById('scrollBar');
                    scroll.scrollTop = 0;
                },
            },
        },

        async mounted() {
            if (this.$auth.user.isFirstLogin) {
                this.$refs.changePassword.open();
            }

            const ele = document.getElementById('scrollBar');

            this.scrollListener = ele.addEventListener('scroll', () => {
                const dropdowns = document.querySelectorAll('.ant-select-dropdown');

                dropdowns.forEach((dropdown) => {
                    dropdown.style.display = 'none';
                });
            }, true);

            // Scrollbar.init(document.getElementById('scrollBar'), {
            //     damping: 0.1,
        },

        beforeDestroy() {
            window.removeEventListener('scroll', this.scrollListener);
        },
    };
</script>
