<template>
    <div>
        <a-table
            :loading="loading"
            :data-source="users"
            :scroll="{ x: 1000 }"
            :pagination="false"
            :row-key="row => row.id"
        >
            <a-table-column
                key="index"
                title="STT"
                :width="50"
                :custom-render="(text, record, index) => index"
            />
            <a-table-column
                key="thumbnail"
                data-index="thumbnail"
                title="Ảnh"
                :width="250"
                align="center"
            >
                <template #default="thumbnail">
                    <img
                        class="w-[100px] rounded aspect-video object-cover"
                        loading=";azy"
                        :src="thumbnail"
                        alt="/"
                    >
                </template>
            </a-table-column>
            <a-table-column
                key="fullName"
                title="Tiêu đề"
                :width="120"
                data-index="fullName"
            />
            <a-table-column
                key="fullName"
                title="Tác giả"
                :width="120"
                data-index="fullName"
            />
            <a-table-column
                key="gender"
                title="Đơn giá"
                :width="100"
                align="center"
                data-index="gender"
            >
                <template #default="gender">
                    {{ $t(GENDER_LABELS[gender]) || GENDERS.ORTHER }}
                </template>
            </a-table-column>
            <a-table-column
                key="email"
                title="Số lượng"
                :width="80"
                data-index="email"
            />
            <a-table-column
                key="phoneNumber"
                title="Thành tiền"
                :width="100"
                data-index="phoneNumber"
            >
                <template #default="phoneNumber">
                    {{ phoneNumber | phoneFormat }}
                </template>
            </a-table-column>
            <a-table-column
                key="phoneNumber"
                title="Trạng thái"
                :width="100"
                data-index="phoneNumber"
            >
                <template #default="phoneNumber">
                    {{ phoneNumber | phoneFormat }}
                </template>
            </a-table-column>
            <a-table-column :width="60" align="right" fixed="right">
                <template #default="scope">
                    <a-dropdown :trigger="['click']">
                        <a-button class="!mr-0" size="small">
                            <i class="fas fa-ellipsis-h" />
                        </a-button>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <nuxt-link :to="`/users/${scope.id}`">
                                    <i class="w-4 mr-2 isax isax-edit-2" />
                                    Xem chi tiết
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item class="!text-danger-900">
                                <i class="w-4 mr-2 isax isax-trash" />
                                Hủy đơn
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>
    </div>
</template>

<script>
    export default {
        components: {
        },

        model: {
            prop: 'value',
        },

        props: {
            users: {
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

            };
        },

    };
</script>
