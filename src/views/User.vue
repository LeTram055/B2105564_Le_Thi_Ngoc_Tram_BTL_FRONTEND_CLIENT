<template>
    <div class="container">
        <div class="row my-3 justify-content-center">
            <greeting :title="title"></greeting>
        </div>
        <div class="row my-3 justify-content-center">
            <user-detail :user="user"></user-detail>
        </div>
        
        
    </div>
</template>

<script>
import Greeting from '@/components/Layouts/Greeting.vue';
import UserDetail from '@/components/User/UserDetail.vue';
import userService from '@/services/user.service.js';
import { mapStores } from 'pinia';
import authStore from '@/stores/auth.store';

export default {
    computed: {
        ...mapStores(authStore),
    },
    data() {
        return {
            title: 'Thông tin người dùng',
            user: null,
        };
    },
    components: {
        Greeting,
        UserDetail,
    },
    beforeMount() {
        this.getUser();
    },
    methods: {
        async getUser() {
            if (!this.authStore.getUser) {
                console.warn("Người dùng chưa đăng nhập.");
                return;
            }

            const userId = this.authStore.getUser._id;
            const response = await userService.getUserById(userId);
            if (response.status === 'success') {
                this.user = response.data;
            } else {
                alert(response.message);
                this.$router.push({ name: 'userHome' }); 
            }
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString(); // Định dạng ngày tháng
        }
    }
};
</script>

<style scoped>
.card {
    margin-top: 20px;
}
</style>
