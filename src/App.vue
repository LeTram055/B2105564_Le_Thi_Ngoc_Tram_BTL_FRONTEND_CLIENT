<template>

    <header-app :role="role" @login="handleLogin" @logout="handleLogout"></header-app>
    
    <router-view @login="handleLogin"></router-view>
    

    
</template>

<script>
import HeaderApp from "@/components/Layouts/HeaderApp.vue"
import FooterApp from "@/components/Layouts/FooterApp.vue"
import useAuthStore from "@/stores/auth.store.js";
import { mapStores } from "pinia";

export default {
    computed: {
        ...mapStores(useAuthStore),
    },
    components: {
        HeaderApp,
        FooterApp,
    },
    data() {
        return {
            userRole: "user",
            guestRole: "guest",
            role: "guest"
        }
    },
    methods: {
        handleLogin() {
            const role = localStorage.getItem("role")
            if (role == this.userRole) {
                this.authStore.setRole(this.userRole)
                const user = JSON.parse(localStorage.getItem("user"))
                this.role = this.userRole
                this.authStore.setUser(user)
                this.$router.push({ name: "userHome" })
                return
            } 
            this.role = this.guestRole
            this.$router.push({ name: "login" })
        },
        handleLogout() {
            localStorage.removeItem("role")
            localStorage.removeItem("user")
            this.authStore.setRole(this.guestRole)
            this.role = this.guestRole
            if (this.$route?.meta?.requiresAuth) {
                this.$router.push({ name: "login" })
            }
        },
        // Hàm này sẽ được gọi trong mounted để khôi phục vai trò từ localStorage
        loadRoleFromLocalStorage() {
            const role = localStorage.getItem("role") || this.guestRole;
            const user = JSON.parse(localStorage.getItem("user") || null);

            if (role === this.userRole) {
                this.authStore.setRole(this.userRole);
                this.role = this.userRole;
                if (user) {
                    this.authStore.setUser(user);
                }
            } else {
                this.authStore.setRole(this.guestRole);
                this.role = this.guestRole;
            }
        }
    },
    mounted() {
        this.loadRoleFromLocalStorage();
    }
}
</script>

<style>
</style>