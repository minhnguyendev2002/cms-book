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
                :custom-render="(text, record, index) => index + 1"
            />
            <a-table-column
                key="username"
                title="Tên đăng nhập"
                :width="150"
            >
                <template #default="record">
                    {{ record.username || '--' }}
                </template>
            </a-table-column>
            <a-table-column
                key="email"
                title="Email"
                :width="120"
            >
                <template #default="record">
                    {{ record.email || '--' }}
                </template>
            </a-table-column>
            <a-table-column
                key="role"
                title="Vai trò"
                :width="100"
                align="center"
            >
                <template #default="record">
                    {{ record.roles[0].name + ',  ' + (record.roles[1]?.name || '') }}
                </template>
            </a-table-column>

            <a-table-column :width="60" align="right" fixed="right">
                <template #default="scope">
                    <a-dropdown :trigger="['click']">
                        <a-button class="!mr-0" size="small">
                            <i class="fas fa-ellipsis-h" />
                        </a-button>
                        <a-menu slot="overlay">
                            <a-menu-item
                                @click="() => {
                                    $refs.ConfirmDialog.open(),
                                    selectUser(scope)
                                }"
                            >
                                <i class="w-4 mr-2 isax isax-edit-2" />
                                Chuyển vai trò thành: {{ scope .roles[0].name === 'ROLE_ADMIN' ? "USER":"ADMIN" }}
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>
        <ConfirmDialog
            ref="ConfirmDialog"
            title="Xác nhận xóa"
            content="Bạn chắc chắn thay đổi vai trò người dùng này chứ ?"
            @confirm="updateUser"
        />
    </div>
</template>

<script>
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';

    export default {
        components: {
            ConfirmDialog,
        },

        props: {
            users: {
                type: Array,
                required: false,
            },
            loading: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                user: null,
            };
        },

        methods: {
            selectUser(value) {
                this.user = value;
            },
            async updateUser() {
                try {
                    await this.$api.users.update({
                        username: this.user.username,
                        role: this.user.roles[0].name === 'ROLE_ADMIN' ? 'ROLE_USER' : 'ROLE_ADMIN',
                    });
                    this.$message.success('Thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },
    };
</script>
