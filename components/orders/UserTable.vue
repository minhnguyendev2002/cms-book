<template>
    <div>
        <a-table
            :loading="loading"
            :data-source="books"
            :scroll="{ x: 1000 }"
            :pagination="false"
            :row-key="row => row.id"
        >
            <a-table-column
                key="index"
                title="STT"
                :width="50"
                :custom-render="(text, record, index) => index + 1"
                align="center"
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
            <a-table-column
                key="status"
                title="Trạng thái"
                :width="80"
                data-index="status"
                align="center"
            >
                <template #default="status">
                    <a-tag class="!w-full py-2" :color="STATUS_COLOR[status]">
                        {{ STATUS_LABEL[status] }}
                    </a-tag>
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
                            <a-menu-item v-if="scope.status === STATUS.WATTING" class="!text-danger-900" @click="$refs.ConfirmDialog.open()">
                                <i class="w-4 mr-2 isax isax-trash" />
                                Hủy đơn hàng
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
    import { mapDataFromOptions } from '@/utils/data';
    import { STATUS, STATUS_OPTIONS } from '@/constants/order/user';
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
                required: true,
            },
            value: Array,
            loading: {
                type: Boolean,
                default: false,
            },
            pagination: Object,
        },

        data() {
            return {
                STATUS,
                STATUS_OPTIONS,
            };
        },

        computed: {
            STATUS_LABEL() {
                return this.mapDataFromOptions(STATUS_OPTIONS, 'value', 'label');
            },
            STATUS_COLOR() {
                return this.mapDataFromOptions(STATUS_OPTIONS, 'value', 'color');
            },
        },

        methods: {
            mapDataFromOptions,
        },
    };
</script>
