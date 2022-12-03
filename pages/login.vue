<template>
    <div class="flex flex-col items-center">
        <div slot="title" class="mt-4 mb-4 text-gray-80 text-xl font-medium text-prim-900 text-center">
            Đăng nhập
        </div>

        <a-alert
            v-if="error"
            class="!mt-3 w-full"
            :message="error"
            type="warning"
            show-icon
        />
        <LoginForm
            ref="form"
            :loading="loading"
            class="!mt-3 min-w-[200px] max-w-md w-full"
            @submit="login"
        />
        <div class="flex justify-between w-full my-4 mb-6">
            <a-checkbox v-model="passwordMemory">
                Ghi nhớ lần đăng nhập sau
            </a-checkbox>
            <nuxt-link to="/forgot-password">
                Reset Password
            </nuxt-link>
        </div>
        <a-button
            :loading="loading"
            type="primary"
            class="w-full"
            @click="$refs.form.submit()"
        >
            Đăng nhập
        </a-button>
    </div>
</template>

<script>
    import LoginForm from '@/components/auth/forms/Login.vue';

    export default {
        layout: 'auth',

        components: {
            LoginForm,
        },

        data() {
            const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
            return {
                passwordMemory: !!userInfo,
                encryptor: null,
                loading: false,
                error: null,
            };
        },

        mounted() {
            const { JSEncrypt } = require('jsencrypt');
            this.encryptor = (message) => {
                const encrypt = new JSEncrypt();
                encrypt.setPublicKey(process.env.RSA_PUBLIC_KEY);

                return encrypt.encrypt(message);
            };
        },

        methods: {
            login(form) {
                this.loading = true;
                this.$auth.loginWith('local', async () => {
                    try {
                        this.loading = true;
                        await this.$auth.loginWith('local', { data: form });
                        this.$router.push('/');
                        this.$message.success('Đăng nhập thành công');
                    } catch {
                        this.$message.error('Sai email hoặc mật khẩu');
                    } finally {
                        this.loading = false;
                    }
                });
            },

            async getTokenLiveClass() {
                await this.$store.dispatch('room/createUserLiveClass');
            },
            changeLocale({ key }) {
                this.$i18n.setLocale(key);
            },
        },

        head() {
            return {
                title: 'Login | LMS',
            };
        },
    };
</script>
