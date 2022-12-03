<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :after-close="empty"
        title="Thêm vào giỏ hàng"
        width="800px"
        :footer="false"
    >
        <div class="grid grid-cols-12 gap-6">
            <div class="col-span-3">
                <img class="rounded" src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80" alt="sdasd">
            </div>
            <div class="col-span-9 flex flex-col">
                <div>
                    <h2 class="text-3xl">
                        Đây là sách vip
                    </h2>
                    <p class="text-lg">
                        sách cực vip dành cho giới trẻ
                    </p>
                </div>
                <div class="flex justify-between items-center mt-auto">
                    <div class="flex flex-col gap-3">
                        <span class="text-lg"><strong>Còn lại</strong>: 20</span>
                        <span class="text-lg"><strong>Đơn giá</strong>: 1500.000đ</span>
                    </div>
                    <div>
                        <a-form-model
                            ref="ruleForm"
                            :model="ruleForm"
                            :rules="rules"
                        >
                            <a-form-model-item label="Số lượng" prop="checkPass">
                                <a-input type="password" autocomplete="off" />
                            </a-form-model-item>
                            <a-form-model />
                        </a-form-model>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-10 flex items-center justify-end gap-3">
            <a-button class="!w-32">
                Hủy bỏ
            </a-button>
            <a-button type="primary" class="!w-32">
                Thêm giỏ hàng
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import _get from 'lodash/get';

    const defaultUser = {
        address: 'VietNam',
        avatar: null,
        code: '0000090',
        dateOfBirth: '2022-08-10T00:00:00.000Z',
        email: 'tester@gmail.com',
        fullName: 'Tester huong',
        gender: 'female',
        id: 90,
        phoneNumber: '0987654321',
    };
    export default {
        components: {
        },
        data() {
            return {
                visible: false,
                user: defaultUser,
                fetchLoading: false,
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    age: '',
                },
                rules: {
                    pass: [{ trigger: 'change' }],
                    checkPass: [{ trigger: 'change' }],
                    age: [{ trigger: 'change' }],
                },
            };
        },

        methods: {
            _get,

            async open() {
                this.visible = true;
                // await this.fetchData(user);
            },

            close() {
                this.visible = false;
            },

            empty() {
                this.user = {};
            },
        },
    };
</script>
