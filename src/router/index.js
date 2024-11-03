import { createWebHistory, createRouter } from "vue-router";
import useAuthStore from "@/stores/auth.store.js";

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

import NotFound from "@/views/NotFound.vue";

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/",
        redirect: "/user",
    },
    {
        path: "/user",
        props: true,
        children: [
            {
                path: "",
                component: Home,
                name: "userHome",
            },
            
        ],
    },
    
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (!to.meta.requiresAuth) {
        return next()
    }

    const authStore = useAuthStore()
    const role = authStore.getRole
    if (role != to.meta.role) {
        return next({ name: 'login' })
    }
    return next()
});

export default router;