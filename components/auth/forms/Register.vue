<template>
    <div class="sign-up-form sm:w-full w-96 max-w-96 p-9 block bg-white">
        <div>
            <img class="max-w-3/5 w-3/5 mb-8" src="~/static/img/logo.png" alt="logo">
        </div>
        <a-form-model
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
        >
            <a-form-model-item has-feedback label="Email" prop="email">
                <a-input v-model="ruleForm.email" placeholder="Email" size="large" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Phone number" prop="username">
                <a-input v-model="ruleForm.username" placeholder="Phone number" size="large" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="Password" prop="password">
                <a-input-password
                    v-model="ruleForm.password"
                    placeholder="Password"
                    size="large"
                    type="password"
                    autocomplete="off"
                />
            </a-form-model-item>
            <a-form-model-item>
                <a-button class="w-32 mt-2" type="primary" @click="submitForm('ruleForm')">
                    Register
                </a-button>
            </a-form-model-item>
        </a-form-model>
        <div class="font-medium">
            <span>Already have account? </span>
            <nuxt-link class="text-prim-100 hover:text-prim-100 ml-1" to="/login">
                Login
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    import { passwordValidtor, validEmail } from '@/utils/form';

    export default {
        name: 'LoginForm',
        data() {
            return {
                ruleForm: {
                    email: '',
                    username: '',
                    password: '',
                },
                rules: {
                    email: [{ validator: validEmail, trigger: ['change', 'blur'] }],
                    password: [{ validator: passwordValidtor, trigger: ['change', 'blur'] }],
                    username: [{ trigger: ['change', 'blur'] }],
                },
            };
        },
        methods: {
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.$message.success('Thành công !');
                    } else {
                        return false;
                    }
                });
            },
        },
    };
</script>

<style lang="scss">
    .sign-up-form {
        input.ant-input {
            &:focus {
                @apply border-prim-100 shadow-sm shadow-prim-90/50
            }
            &:hover {
                @apply border-prim-100
            }
        }
        .ant-form-item-label {
            @apply leading-7
        }
        .ant-form-explain {
            @apply relative -bottom-1
        }
        .ant-btn-primary {
            @apply bg-prim-100 border-prim-100
        }
    }
</style>
