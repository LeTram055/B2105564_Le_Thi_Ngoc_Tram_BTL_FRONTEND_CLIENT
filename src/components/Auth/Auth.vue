<template>
    <title-form class="title" :title="titleForm"></title-form>
    <form class="border border-primary rounded p-3">
        <div v-if="isRegister" class="form-group">
            <label for="last-name">Last Name</label>
            <input type="text" class="form-control" id="last-name" placeholder="Nhập họ và chữ lót" v-model="lastName">
        </div>

        <div v-if="isRegister" class="form-group">
            <label for="first-name">First Name</label>
            <input type="text" class="form-control" id="first-name" placeholder="Nhập tên" v-model="firstName">
        </div>

        <div v-if="isRegister" class="form-group">
            <label for="data-of-birth">Date of Birth</label>
            <input type="date" class="form-control" id="data-of-birth" placeholder="Nhập ngày sinh" v-model="dateOfBirth">
        </div>

        <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="Nhập email" v-model="email">
        </div>

        <div v-if="isRegister" class="form-group">
            <label for="address">Address</label>
            <input type="text" class="form-control" id="address" placeholder="Nhập địa chỉ" v-model="address">
        </div>

        <div v-if="isRegister" class="form-group">
            <label for="phone">Phone</label>
            <input type="text" class="form-control" id="phone" placeholder="Nhập số điện thoại" v-model="phone">
        </div>

        <!-- Trường Mật khẩu, luôn được hiển thị -->
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Nhập mật khẩu" v-model="password" required>
        </div>

        <div v-if="isRegister" class="from-check form-check-inline">
            <input class="form-check-input" type="radio" v-model="gender" value="Nam" name="gender" id="gender-male">
            <label class="form-check-label mr-5" for="gender-male"> Nam </label>
            
            <input class="form-check-input" type="radio" v-model="gender" value="Nữ" name="gender" id="gender-female">
            <label class="form-check-label" for="gender-female"> Nữ </label>
        </div>

        <div class="submit-form">
            <btn @submit="handleSubmit" :contentComponent="'<p>Submit</p>'"></btn>
        </div>
    </form>
</template>

<script>
import TitleForm from "@/components/Layouts/TitleForm.vue";
import Btn from "@/components/Layouts/Btn.vue";

export default {
    props: {
        isRegister: {
            type: Boolean,
            default: true
        },
        titleForm: {
            type: String,
            default: 'Login'
        }
    },
    emits: ['submit'],
    data() {
        return {
            lastName: '',
            firstName: '',
            dateOfBirth: '',
            email: '',
            address: '',
            phone: '',
            password: '',
            gender: ''
        }
    },
    components: {
        TitleForm,
        Btn,
    },
    methods: {
        getData() {
            if (!this.isRegister) {
                return {
                    email: this.email,
                    password: this.password,
                }
            }
            return {
                lastName: this.lastName,
                firstName: this.firstName,
                dateOfBirth: this.dateOfBirth,
                email: this.email,
                address: this.address,
                phone: this.phone,
                password: this.password,
                gender: this.gender,
            }
        },
        handleSubmit(event) {
            event.preventDefault();
            this.$emit('submit', this.getData());
        }
    },
};
</script>

<style scoped>

form {
    margin-top: 24px;
}

.submit-form {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>