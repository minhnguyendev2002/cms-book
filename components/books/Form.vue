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
            <div class="flex items-center flex-col gap-x-8">
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
                    v-if="imageThumbnail"
                    :src="imageThumbnail"
                    onerror="this.src='/images/default-avatar.png'"
                    alt=""
                    class="w-56 h-72 rounded object-cover"
                >
                <div v-else class="w-56 h-72 rounded border-dashed border border-gray-400 flex justify-center items-center">
                    <span>Chưa có ảnh</span>
                </div>
            </div>
            <a-form-model-item label="Ngày phát hành" prop="dateCreate">
                <a-input
                    v-model="form.dateCreate"
                    :disabled="!isEdit"
                    autocomplete="off"
                />
            </a-form-model-item>
            <a-form-model-item label="Số trang" prop="countPage">
                <a-input
                    v-model.number="form.countPage"
                    :disabled="!isEdit"
                    autocomplete="off"
                />
            </a-form-model-item>
            <a-form-model-item label="Thể loại" prop="type">
                <a-input
                    v-model="form.type"
                    :disabled="!isEdit"
                    autocomplete="off"
                />
            </a-form-model-item>
            <a-form-model-item label="Giá tiền" prop="price">
                <a-input
                    v-model="form.price"
                    :disabled="!isEdit"
                    autocomplete="off"
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
        dateCreate: '',
        countPage: '',
        type: '',
        price: '',
        thumbnail: '',
    };

    export default {
        props: {
            isEdit: {
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
                    dateCreate: [{ required: true, message: 'Không được để trống trường này.', trigger: 'change' }],
                    countPage: [{ required: true, message: 'Không được để trống trường này.', trigger: 'change' },
                                { validator: validNumberString, message: 'Vui lòng nhập đúng định dạng là số', trigger: 'change' }],
                    type: [{ required: true, message: 'Không được để trống trường này.', trigger: 'change' }],
                    price: [{ required: true, message: 'Không được để trống trường này.', trigger: 'change' }],
                },
            };
        },

        watch: {
            imageThumbnail() {
                this.form.thumbnail = this.imageThumbnail;
            },
        },

        methods: {
            submitForm() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
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
