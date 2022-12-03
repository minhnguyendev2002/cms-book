<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :after-close="empty"
        title="Thêm sách"
        width="800px"
        :footer="false"
    >
        <a-spin :spinning="fetchLoading">
            <div class="">
                <BookForm :book="book" :is-edit="isEdit" />
            </div>
        </a-spin>
        <div class="mt-10 flex items-center justify-end gap-3">
            <a-button class="!w-32">
                Hủy bỏ
            </a-button>
            <a-button type="primary" class="!w-32">
                Thêm
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
            };
        },

        methods: {
            _get,

            async open(book, type = true) {
                this.visible = true;
                this.isEdit = type;
                this.book = book;
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
