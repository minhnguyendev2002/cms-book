<template>
    <div class="flex flex-col items-center">
        <div slot="title" class="mt-4 mb-4 text-gray-80 text-4xl font-medium text-prim-900 text-center">
            {{ isLogin ? 'Đăng nhập' : 'Đăng ký' }}
        </div>
        <div v-if="isLogin" class="w-full">
            <a-alert
                v-if="error"
                class="!mt-3 w-full"
                :message="error"
                type="warning"
                show-icon
            />
            <LoginForm
                ref="formLogin"
                :loading="loading"
                class="!mt-3 min-w-[200px] max-w-md w-full"
                @submit="login"
            />
            <a-button
                :loading="loading"
                type="primary"
                class="w-full mt-10"
                @click="$refs.formLogin.submit()"
            >
                Đăng nhập
            </a-button>
        </div>

        <div v-else class="w-full">
            <a-alert
                v-if="error"
                class="!mt-3 w-full"
                :message="error"
                type="warning"
                show-icon
            />
            <RegisterForm
                ref="formRegister"
                :loading="loading"
                class="!mt-3 min-w-[200px] max-w-md w-full"
                @submit="register"
            />
            <a-button
                :loading="loading"
                type="primary"
                class="w-full mt-10"
                @click="$refs.formRegister.submit()"
            >
                Đăng ký
            </a-button>
        </div>

        <div class="mt-7">
            <div v-if="isLogin">
                Bạn chưa có tài khoản ? <span
                    class="font-bold cursor-pointer text-prim-900"
                    @click="changeForm"
                >Đăng ký</span>
            </div>
            <div v-else>
                Bạn đã có tài khoản ? <span
                    class="font-bold cursor-pointer text-prim-900"
                    @click="changeForm"
                >Đăng nhập</span>
            </div>
        </div>
    </div>
</template>

<script>
    import LoginForm from '@/components/auth/forms/Login.vue';
    import RegisterForm from '@/components/auth/forms/Register.vue';

    export default {
        layout: 'auth',
        auth: 'guest',

        components: {
            LoginForm,
            RegisterForm,
        },

        data() {
            return {
                loading: false,
                error: null,
                isLogin: true,
            };
        },

        methods: {
            async login(form) {
                try {
                    const params = new URLSearchParams();
                    params.append('username', form.username);
                    params.append('password', form.password);
                    this.loading = true;
                    await this.$auth.loginWith('local', { data: params });
                    this.$router.push('/');
                    this.$message.success('Đăng nhập thành công');
                } catch {
                    this.$message.error('Sai email hoặc mật khẩu');
                } finally {
                    this.loading = false;
                }
            },
            async register(form) {
                try {
                    this.loading = true;
                    await this.$api.auth.signUp(form);
                    this.isLogin = true;
                    this.$message.success('Đăng ký thành công');
                } catch {
                    this.$message.error('Thất bại');
                } finally {
                    this.loading = false;
                }
            },
            changeForm() {
                this.isLogin = !this.isLogin;
            },
        },

        head() {
            return {
                title: 'Login | LMS',
            };
        },
    };
</script>
