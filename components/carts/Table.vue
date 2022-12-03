<template>
    <div>
        <a-table
            :loading="loading"
            :data-source="books"
            :row-selection="{
                onChange: onSelectChange,
                columnWidth: 50,
                selectedRowKeys: selectedBookIds,
            }"
            :scroll="{ x: 1000 }"
            :pagination="false"
            :row-key="row => row.id"
        >
            <a-table-column
                key="index"
                title="STT"
                :width="50"
                :custom-render="(text, record, index) => index + 1"
            />
            <a-table-column
                key="thumbnail"
                data-index="thumbnail"
                title="Ảnh"
                :width="140"
                align="center"
            >
                <template #default="thumbnail">
                    <img
                        class="w-full h-[150px] rounded aspect-video object-cover"
                        loading="lazy"
                        :src="thumbnail"
                        alt="/"
                    >
                </template>
            </a-table-column>
            <a-table-column
                key="title"
                title="Tiêu đề"
                :width="150"
                data-index="title"
            />
            <a-table-column
                key="author"
                title="Tác giả"
                :width="120"
                data-index="author"
            />
            <a-table-column
                key="price"
                title="Đơn giá"
                :width="100"
                align="center"
                data-index="price"
            >
                <template #default="price">
                    {{ price | currencyFormat }}
                </template>
            </a-table-column>
            <a-table-column
                key="count"
                title="Số lượng"
                :width="80"
                data-index="count"
                align="center"
            />
            <a-table-column
                key="sumPrice"
                title="Thành tiền"
                :width="100"
                data-index="sumPrice"
                align="center"
            >
                <template #default="sumPrice">
                    {{ sumPrice | currencyFormat }}
                </template>
            </a-table-column>
            <a-table-column :width="60" align="right" fixed="right">
                <template #default="scope">
                    <a-dropdown :trigger="['click']">
                        <a-button class="!mr-0" size="small">
                            <i class="fas fa-ellipsis-h" />
                        </a-button>
                        <a-menu slot="overlay">
                            <a-menu-item @click="$refs.BookDialog.open(scope, true)">
                                <i class="w-4 mr-2 isax isax-edit-2" />
                                Xem chi tiết
                            </a-menu-item>
                            <a-menu-item class="!text-danger-900" @click="$refs.ConfirmDialog.open()">
                                <i class="w-4 mr-2 isax isax-trash" />
                                Xóa khỏi giỏ hàng
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>
        <BookDialog ref="BookDialog" />
        <ConfirmDialog
            ref="ConfirmDialog"
            title="Xác nhận xóa"
            content="Bạn chắc chắn muốn xóa quyển sách này trong giỏ hàng chứ"
        />
    </div>
</template>

<script>
    import BookDialog from '@/components/books/Dialog.vue';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';

    export default {
        components: {
            BookDialog,
            ConfirmDialog,
        },

        model: {
            prop: 'value',
        },

        props: {
            books: {
                type: Array,
                required: false,
            },
            value: Array,
            loading: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                selectedBookIds: [],
                selectedBooks: [],
            };
        },

        watch: {
            value() {
                this.selectedBookIds = this.value;
            },
        },

        methods: {
            onSelectChange(selectedBookIds, selectedBooks) {
                this.selectedBookIds = selectedBookIds;
                this.selectedBooks = selectedBooks;
                this.$emit('selected', selectedBookIds, selectedBooks);
                this.$emit('input', selectedBooks);
            },
        },
    };
</script>
