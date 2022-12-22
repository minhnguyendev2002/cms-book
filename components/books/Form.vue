<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
    >
        <div class="grid grid-cols-2 gap-5">
            <div>
                <a-form-model-item label="Tiêu đề" prop="title">
                    <a-input
                        v-model="form.title"
                        :disabled="!isEdit"
                        autocomplete="off"
                    />
                </a-form-model-item>
                <a-form-model-item label="Tác giả" prop="author">
                    <a-input
                        v-model="form.author"
                        :disabled="!isEdit"
                        autocomplete="off"
                    />
                </a-form-model-item>
                <a-form-model-item label="Mô tả về sách" class="col-span-2">
                    <a-textarea
                        v-model="form.description"
                        :disabled="!isEdit"
                        autocomplete="off"
                        :auto-size="{ minRows: 5, maxRows: 5 }"
                    />
                </a-form-model-item>
            </div>
            <div v-if="!isCreate" class="flex items-center flex-col gap-x-8">
                <a-upload
                    :show-upload-list="false"
                    action=""
                    :transform-file="handlerThumbnail"
                    :disabled="!isEdit"
                    accept="image/png, image/jpeg"
                >
                    <div class="flex gap-x-2">
                        <img src="/images/upload.svg" alt="avatar">
                        Tải ảnh lên
                    </div>
                </a-upload>
                <img
                    v-if="imageThumbnail || form.thumbnail"
                    :src="imageThumbnail ? imageThumbnail: 'data:image/jpeg;base64,' + form.thumbnail"
                    onerror="this.src='/images/default-avatar.png'"
                    alt=""
                    class="w-56 h-72 rounded object-cover"
                >
                <div v-else class="w-56 h-72 rounded border-dashed border border-gray-400 flex justify-center items-center">
                    <span>Chưa có ảnh</span>
                </div>
            </div>
            <a-form-model-item label="Ngày phát hành" prop="releaseDate">
                <a-date-picker
                    v-model="form.releaseDate"
                    class="w-full"
                    :disabled="!isEdit"
                    format="DD/MM/YYYY"
                    value-format="YYYY-MM-DD"
                    placeholder="Ngày phát hành"
                />
            </a-form-model-item>
            <a-form-model-item label="Số trang" prop="countPage">
                <a-input
                    v-model.number="form.pageNumber"
                    :disabled="!isEdit"
                    autocomplete="off"
                />
            </a-form-model-item>
            <a-form-model-item label="Thể loại" prop="category">
                <a-select
                    v-model="form.category"
                    placeholder="Thể loại"
                >
                    <a-select-option v-for="item in BOOK_TYPE_OPTIONS" :key="item.value" :value="item.label">
                        {{ item.label }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="Giá tiền" prop="cost">
                <a-input
                    v-model="form.cost"
                    :disabled="!isEdit"
                />
            </a-form-model-item>
            <a-form-model-item label="Số lượng" prop="total">
                <a-input
                    v-model="form.total"
                    :disabled="!isEdit"
                />
            </a-form-model-item>
        </div>
    </a-form-model>
</template>
<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import { validNumberString } from '@/utils/form';
    import { BOOK_TYPE, BOOK_TYPE_OPTIONS } from '@/constants/typeBook';

    const defaultForm = {
        id: null,
        title: '',
        description: '',
        author: '',
        releaseDate: '',
        pageNumber: '',
        category: '',
        cost: '',
        total: '',
        thumbnail: '',
    };

    export default {
        props: {
            isEdit: {
                type: Boolean,
                default: true,
            },
            isCreate: {
                type: Boolean,
                default: true,
            },
            book: {
                type: Object,
                default: () => {},
            },
        },

        data() {
            return {
                BOOK_TYPE,
                BOOK_TYPE_OPTIONS,
                fileThumbnail: null,
                imageThumbnail: null,
                form: this.book ? _cloneDeep(this.book) : _cloneDeep(defaultForm),
                rules: {
                    title: [{ required: true, message: 'Không được để trống trường này.', trigger: 'change' }],
                    author: [{ required: true, message: 'Không được để trống trường này.', trigger: 'change' }],
                    releaseDate: [{ required: true, message: 'Không được để trống trường này.', trigger: 'change' }],
                    pageNumber: [{ required: true, message: 'Không được để trống trường này.', trigger: 'change' },
                                 { validator: validNumberString, message: 'Vui lòng nhập đúng định dạng là số', trigger: 'change' }],
                    category: [{ required: true, message: 'Không được để trống trường này.', trigger: 'change' }],
                    cost: [{ required: true, message: 'Không được để trống trường này.', trigger: 'change' },
                           { validator: validNumberString, message: 'Vui lòng nhập đúng định dạng là số', trigger: 'change' }],
                    total: [{ required: true, message: 'Không được để trống trường này.', trigger: 'change' },
                            { validator: validNumberString, message: 'Vui lòng nhập đúng định dạng là số', trigger: 'change' }],
                },
            };
        },

        watch: {
            imageThumbnail() {
                this.form.thumbnail = this.imageThumbnail;
            },
            book() {
                this.form = this.book ? _cloneDeep(this.book) : _cloneDeep(defaultForm);
                this.form.thumbnail = this.book.thumbnail;
            },
        },

        methods: {
            submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        this.$emit('submit', this.form, this.fileThumbnail);
                    }
                });
            },
            handlerThumbnail(file) {
                this.fileThumbnail = file;
                this.imageThumbnail = URL.createObjectURL(file);
            },
            resetForm() {
                this.$refs.form.resetFields();
            },
        },
    };
</script>
