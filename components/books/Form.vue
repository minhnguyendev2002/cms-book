<template>
    <a-form-model
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
    >
        <div class="grid grid-cols-2 gap-5">
            <div>
                <a-form-model-item label="Password" prop="pass">
                    <a-input
                        v-model="ruleForm.pass"
                        :disabled="!isEdit"
                        type="password"
                        autocomplete="off"
                    />
                </a-form-model-item>
                <a-form-model-item label="Confirm" prop="checkPass">
                    <a-input
                        v-model="ruleForm.checkPass"
                        :disabled="!isEdit"
                        type="password"
                        autocomplete="off"
                    />
                </a-form-model-item>
                <a-form-model-item label="Confirm" prop="checkPass" class="col-span-2">
                    <a-textarea
                        v-model="ruleForm.checkPass"
                        :disabled="!isEdit"
                        type="password"
                        autocomplete="off"
                    />
                </a-form-model-item>
            </div>
            <div class="flex items-center flex-col gap-x-8">
                <a-upload
                    :show-upload-list="false"
                    action=""
                    :transform-file="handlerAvatar"
                    :disabled="!isEdit"
                >
                    <div class="flex gap-x-2">
                        <img src="/images/upload.svg" alt="avatar">
                        Tải ảnh lên
                    </div>
                </a-upload>
                <img
                    v-if="ruleForm.avatar"
                    :src="ruleForm.avatar"
                    onerror="this.src='/images/default-avatar.png'"
                    alt=""
                    class="w-56 h-60 rounded"
                >
                <div v-else class="w-56 h-60 rounded border-dashed border border-gray-400 flex justify-center items-center">
                    <span><i class="fas fa-plus" /></span>
                </div>
            </div>
            <a-form-model-item label="Password" prop="pass">
                <a-input
                    v-model="ruleForm.pass"
                    :disabled="!isEdit"
                    type="password"
                    autocomplete="off"
                />
            </a-form-model-item>
            <a-form-model-item label="Confirm" prop="checkPass">
                <a-input
                    v-model="ruleForm.checkPass"
                    :disabled="!isEdit"
                    type="password"
                    autocomplete="off"
                />
            </a-form-model-item>
            <a-form-model-item label="Password" prop="pass">
                <a-input
                    v-model="ruleForm.pass"
                    :disabled="!isEdit"
                    type="password"
                    autocomplete="off"
                />
            </a-form-model-item>
            <a-form-model-item label="Confirm" prop="checkPass">
                <a-input
                    v-model="ruleForm.checkPass"
                    :disabled="!isEdit"
                    type="password"
                    autocomplete="off"
                />
            </a-form-model-item>
        </div>
    </a-form-model>
</template>
  <script>
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
            let checkPending;
            const checkAge = (rule, value, callback) => {
                clearTimeout(checkPending);
                if (!value) {
                    return callback(new Error('Please input the age'));
                }
                checkPending = setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('Please input digits'));
                    } else if (value < 18) {
                        callback(new Error('Age must be greater than 18'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password again'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error("Two inputs don't match!"));
                } else {
                    callback();
                }
            };
            return {
                fileAvatar: null,
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    age: '',
                },
                rules: {
                    pass: [{ validator: validatePass, trigger: 'change' }],
                    checkPass: [{ validator: validatePass2, trigger: 'change' }],
                    age: [{ validator: checkAge, trigger: 'change' }],
                },
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handlerAvatar(file) {
                this.fileAvatar = file;
                this.ruleForm.avatar = URL.createObjectURL(file);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
    };
  </script>
