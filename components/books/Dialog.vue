<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :after-close="empty"
        :title="!isCreate ? 'Chi tiết sách': 'Thêm mới sách'"
        width="800px"
        :footer="false"
    >
        <a-spin :spinning="fetchLoading">
            <div class="">
                <BookForm :book="book" :is-edit="isEdit" />
            </div>
            <div v-if="!isCreate" class="mt-10">
                <h2 class="mb-5">
                    Bình luận
                </h2>
                <div>
                    <div class="flex items-center gap-5">
                        <img class="w-20 h-20 object-cover rounded-full" src="/images/default-avatar.jpg" alt="/">
                        <div class="flex-1">
                            <h3>Tú Porn</h3>
                            <p class="mb-0">
                                Đây là web porn
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </a-spin>
        <div class="mt-10 flex items-center justify-end gap-3">
            <a-button type="primary" class="!w-32">
                {{ isEdit && !isCreate ? 'Cập nhật' : !isCreate ? 'Chỉnh sửa': 'Thêm' }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import _get from 'lodash/get';
    import BookForm from '@/components/books/Form.vue';

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
            BookForm,
        },
        data() {
            return {
                visible: false,
                book: defaultUser,
                fetchLoading: false,
                isEdit: true,
                isCreate: false,
            };
        },

        methods: {
            _get,

            async open(book, type = true, isCreate = false) {
                this.visible = true;
                this.isEdit = type;
                this.book = book;
                this.isCreate = isCreate;
            },

            close() {
                this.visible = false;
            },

            empty() {
                this.book = {};
            },
        },
    };
</script>
