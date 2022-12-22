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
                <BookForm
                    ref="BookForm"
                    :book="{...book, thumbnail}"
                    :is-edit="isEdit"
                    :is-create="isCreate"
                    @submit="submitBook"
                />
            </div>
            <div v-if="!isCreate && !isEdit" class="mt-10">
                <h2 class="mb-5">
                    Bình luận
                </h2>
                <div class="mb-5">
                    <a-form-model-item label="Bình luận" prop="comment">
                        <a-textarea
                            v-model="comment"
                            autocomplete="off"
                            :auto-size="{ minRows: 5, maxRows: 5 }"
                        />
                    </a-form-model-item>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <span class="block mr-3">Đánh giá: </span>
                            <a-rate v-model="rate" />
                        </div>
                        <a-button
                            v-if="comment !== ''"
                            type="primary"
                            class="!w-32"
                            @click="createComment"
                        >
                            Bình luận
                        </a-button>
                    </div>
                </div>
                <div v-if="comments">
                    <div v-for="_comment in comments" :key="_comment.id" class="flex items-center gap-5">
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
            <a-button type="primary" class="!w-32" @click="$refs.BookForm.submit()">
                {{ isCreate ? 'Thêm': 'Cập nhật' }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import _get from 'lodash/get';
    import _isEmpty from 'lodash/isEmpty';
    import BookForm from '@/components/books/Form.vue';
    import { convertToFormData } from '@/utils/form';

    export default {
        components: {
            BookForm,
        },
        data() {
            return {
                visible: false,
                book: null,
                fetchLoading: false,
                isEdit: true,
                isCreate: false,
                comment: '',
                rate: 5,
                comments: [],
                thumbnail: '',
            };
        },

        methods: {
            _get,

            async open(book, type = true, isCreate = false) {
                this.visible = true;
                this.isEdit = type;
                if (!_isEmpty(book)) {
                    await this.fetchBook(book);
                }
                this.isCreate = isCreate;
            },

            close() {
                this.visible = false;
            },

            empty() {
                this.book = {};
            },

            async submitBook(book, thumbnail) {
                try {
                    if (!_isEmpty(this.book)) {
                        await this.$api.uploaders.uploadFiles(book?.id, convertToFormData({
                            file: thumbnail,
                        }));
                        await this.updateBook(book);
                    } else {
                        await this.createBook(book);
                    }
                    this.$message.success('Thành Công');
                    this.close();
                    this.$nextTick(() => {
                        this.$nuxt.refresh();
                    });
                } catch (e) {
                    this.$message.error('Thất bại');
                    this.$handleError(e);
                }
            },

            async updateBook(book) {
                try {
                    await this.$api.books.update(book?.id, book);
                } catch (e) {
                    this.$handleError(e);
                }
            },

            async createBook(book) {
                try {
                    await this.$api.books.create(book);
                } catch (e) {
                    this.$handleError(e);
                }
            },

            async createComment() {
                try {
                    await this.$api.reviews.create({
                        bookId: this.book?.id,
                        content: this.comment,
                        rate: this.rate,
                    });
                    this.$nextTick(() => {
                        this.$nuxt.refresh();
                    });
                } catch (e) {
                    this.$handleError(e);
                }
            },

            async fetchBook(book) {
                if (book) {
                    try {
                        this.book = await this.$api.books.getDetail(book?.id);
                        this.comments = await this.$api.reviews.getAll(book?.id);
                        if (book?.imageId) {
                            this.thumbnail = await this.$api.uploaders.getFiles(this.book?.imageId);
                        }
                    } catch (e) {
                        this.$handleError(e);
                    }
                }
            },
        },
    };
</script>
