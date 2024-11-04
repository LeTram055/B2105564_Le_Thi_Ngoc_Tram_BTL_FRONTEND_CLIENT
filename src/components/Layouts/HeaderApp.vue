<template>
        
    <nav class="navbar navbar-expand-lg navbar-dark fixed-navbar" style="background-color: blue;">
        <router-link :to="{ name: 'userHome' }" class="navbar-brand">
            <img src="../../../src/assets/images/logo.png" width="30" height="30" class="navbar-logo" alt="Logo">
        </router-link>
        <nav-item :title="'Trang chủ'" :routerName="'userHome'" class="navbar-brand"></nav-item>
        <nav-item :title="'Sách'" :routerName="'books'" class="navbar-brand"></nav-item>
        <nav-item :title="'Giỏ hàng'" :routerName="'carts'" class="navbar-brand"></nav-item>
        <nav-item :title="'Mượn sách'" :routerName="'borrowTrackings'" class="navbar-brand"></nav-item>
        <nav-item :title="'Người dùng'" :routerName="'user'" class="navbar-brand"></nav-item>
        <div class="ml-auto">
            <button v-if="role === guestRole" class="btn btn-secondary login-btn" @click="login">
                Đăng nhập
            </button>
            <button v-else-if="role === userRole" class="btn btn-secondary logout-btn" @click="logout">
                Đăng xuất
            </button>
        </div>
    </nav>
</template>

<script>
import NavItem from "@/components/Layouts/NavItem.vue";

export default {
    components: {
        NavItem,
    },
    props: {
        role: {
            type: String,
            default: "guest"
        }
    },
    emits: ['login', 'logout'],
    data() {
        return {
            guestRole: "guest",
            userRole: "user",            
        }
        
    },
    methods: {
        login() {
            this.$emit('login');
        },
        logout() {
            this.$emit('logout');
        }
    }
}
</script>

<style scoped>
.fixed-navbar {
    height: 55px; /* Chọn chiều cao phù hợp */
    padding: 0 10px;
}

/* Tăng kích thước hình ảnh mà không làm tăng kích thước navbar */
.navbar-logo {
    width: 50px; /* Điều chỉnh kích thước phù hợp */
    height: auto;
}

.login-btn:hover, .logout-btn:hover {
    cursor: pointer;
}
</style>
