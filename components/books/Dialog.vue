<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :after-close="empty"
        :title="$t('exams.detail.pageHeader')"
        width="800px"
        :footer="false"
    >
        <a-spin :spinning="fetchLoading">
            <div class="block sm:flex items-start gap-4">
                <div class="flex flex-col items-center justify-center gap-4">
                    <div class="w-52 text-center">
                        <a-avatar
                            :size="180"
                            :src="user.avatar || '/images/default-avatar.png'"
                        />
                    </div>
                    <div class="text-center text-xl font-medium">
                        {{ user.fullName }}
                    </div>
                </div>
                <div class="space-y-4">
                    <div>
                        <h3>{{ $t('exams.detail.information') }}</h3>
                        <a-descriptions class="student-detail-description" :column="1">
                            <a-descriptions-item :label="$t('exams.detail.studentId')">
                                {{ user.code }}
                            </a-descriptions-item>
                            <a-descriptions-item :label="$t('exams.detail.email')">
                                <a :href="`mailto:${user.email}`">{{ user.email }}</a>
                            </a-descriptions-item>
                            <a-descriptions-item :label="$t('exams.detail.phoneNumber')">
                                <a :href="`tel:${user.phoneNumber}`">
                                    {{ user.phoneNumber | phoneFormat }}
                                </a>
                            </a-descriptions-item>
                            <a-descriptions-item :label="$t('exams.detail.gender')">
                                <!-- {{ $t(GENDER_LABELS[user.gender]) }} -->
                            </a-descriptions-item>
                            <a-descriptions-item :label="$t('exams.detail.dateOfBirth')">
                                {{ user.dateOfBirth | dateFormat }}
                            </a-descriptions-item>
                            <a-descriptions-item :label="$t('exams.detail.address')">
                                {{ user.address || '-' }}
                            </a-descriptions-item>
                        </a-descriptions>
                    </div>
                    <div>
                        <h3>{{ $t('exams.detail.academic') }}</h3>
                        <a-descriptions class="student-detail-description" :column="1">
                            <a-descriptions-item :label="$t('exams.detail.session')">
                                {{ _get(user, 'session.academicInformationTitle') || '-' }}
                            </a-descriptions-item>
                            <a-descriptions-item :label="$t('exams.detail.major')">
                                {{ _get(user, 'major.academicInformationTitle') || '-' }}
                            </a-descriptions-item>
                            <a-descriptions-item :label="$t('exams.detail.class')">
                                {{ _get(user, 'class.title') || '-' }}
                            </a-descriptions-item>
                        </a-descriptions>
                    </div>
                </div>
            </div>
        </a-spin>
    </a-modal>
</template>

<script>
    import _get from 'lodash/get';
    // import { mapDataFromOptions } from '@/utils/data';

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
        data() {
            return {
                visible: false,
                user: defaultUser,
                fetchLoading: false,
            };
        },

        methods: {
            _get,

            async open() {
                // await this.fetchData(user);
            },

            close() {
                this.visible = false;
            },

            empty() {
                this.user = {};
            },

            // async fetchData(params) {
            //     try {
            //         this.visible = true;
            //         this.fetchLoading = true;
            //         const { data: { user } } = await this.$api.account.users.getDetail(params.id);
            //         const { data: { academicInformations, class: _class } } = await this.$api.academic.informations.get(params.id);
            //         this.user = {
            //             ...user,
            //             class: _class,
            //             ...academicInformations.reduce((info, item) => ({ ...info, [item.type]: item }), {}),
            //         };
            //     } catch (error) {
            //         this.$handleError(error);
            //     } finally {
            //         this.fetchLoading = false;
            //     }
            // },
        },
    };
</script>
