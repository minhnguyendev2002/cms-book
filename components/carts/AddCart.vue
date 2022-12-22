<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :after-close="empty"
        :title="isUpdate ? 'Chi tiết đơn hàng' : 'Thêm giỏ hàng'"
        width="800px"
        :footer="false"
    >
        <div class="grid grid-cols-12 gap-6">
            <div class="col-span-3">
                <img
                    class="rounded"
                    :src="'data:image/jpeg;base64,' + thumbnail"
                    alt="sdasd"
                >
            </div>
            <div class="col-span-9 flex flex-col">
                <div>
                    <h2 class="text-3xl">
                        {{ book?.title || '' }}
                    </h2>
                    <p class="text-lg">
                        {{ book?.description || '' }}
                    </p>
                </div>
                <div class="flex justify-between items-center mt-auto">
                    <div class="flex flex-col gap-3">
                        <span class="text-lg"><strong>Đơn giá</strong>: {{ book?.cost | currencyFormat }}</span>
                        <span class="text-lg"><strong>Còn lại</strong>: {{ book?.total || '0' }}</span>
                    </div>
                    <div class="flex items-center justify-between w-[104px] sm:w-28">
                        <button
                            class="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700
                                        disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default"
                            type="button"
                            :disabled="amount <= 1"
                            @click="changeAmount(-1)"
                        >
                            <i class="text-3xl isax isax-minus" />
                        </button>
                        <span class="select-none block flex-1 text-center leading-none">{{ amount }}</span>
                        <button
                            class="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700
                                        disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default"
                            type="button"
                            :disabled="amount >= book?.total"
                            @click="changeAmount(1)"
                        >
                            <i class="text-3xl isax isax-add" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-10 flex items-center justify-end gap-3">
            <a-button
                v-if="!isUpdate"
                type="primary"
                class="!w-32"
                @click="createCart"
            >
                Thêm giỏ hàng
            </a-button>
            <a-button
                v-else
                type="primary"
                class="!w-32"
                @click="updateCart"
            >
                Cập nhật
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import _get from 'lodash/get';

    export default {
        data() {
            return {
                visible: false,
                book: null,
                thumbnail: null,
                amount: 1,
                fetchLoading: false,
                isUpdate: false,
                cart: null,
            };
        },

        methods: {
            _get,

            async open(book, isUpdate = false, cart = {}) {
                this.visible = true;
                this.isUpdate = isUpdate;
                this.cart = cart;
                await this.fetchBook(book);
                this.amount = cart?.amount || 1;
            },

            close() {
                this.visible = false;
            },

            empty() {
                this.user = {};
            },

            changeAmount(n) {
                this.amount += n;
            },

            async createCart() {
                try {
                    this.book = await this.$api.carts.create({ bookId: this.book?.id, amount: this.amount });
                    this.$message.success('Thành công');
                    this.close();
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },

            async updateCart() {
                try {
                    this.book = await this.$api.carts.update(this.cart.id, { amount: this.amount });
                    this.$message.success('Thành công');
                    this.close();
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },

            async fetchBook(book) {
                if (book) {
                    try {
                        this.book = await this.$api.books.getDetail(book?.id);
                        if (this.book.imageId) {
                            this.thumbnail = await this.$api.uploaders.getFiles(this.book.imageId);
                        }
                    } catch (e) {
                        this.$handleError(e);
                    }
                }
            },
        },
    };
</script>
