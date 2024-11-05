<template>
    <div class="container">
        <register :isRegister="isRegister" :titleForm="titleForm" @submit="handleSubmit"></register>
        <div class="my-4 text-center">
            Bạn đã có tài khoản?
            <router-link :to="{name: 'login'}">Đăng nhập ngay</router-link>
        </div>
    </div>
</template>

<script>
import Register from "@/components/Auth/Auth.vue";
import authService from "@/services/auth.service";

export default {
    data() {
        return {
            isRegister: true,
            titleForm: 'Đăng ký',
        };
    },
    components: {
        Register,
    },
    methods: {
        async handleSubmit(user) {
            const res = await authService.register(user);
            alert(res.message)
            if (res.status == "success") {
                this.$router.push({ name: "login"})
            }
        }
    },
};
</script>

<style scoped>
.container {
    max-width: 600px;
}
</style>