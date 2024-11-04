import { createWebHistory, createRouter } from "vue-router";
import useAuthStore from "@/stores/auth.store.js";

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Book from "@/views/Book.vue";
import BookDetail from "@/views/BookDetail.vue";
import Cart from "@/views/Cart.vue";
import BorrowTracking from "@/views/BorrowTracking.vue";
import BorrowDetail from "@/views/BorrowDetail.vue";
import User from "@/views/User.vue";

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
            {
                path: "books",
                children: [
                    {
                        path: "",
                        component: Book,
                        name: "books",
                    },
                    {
                        path: ":id",
                        component: BookDetail,
                        name: "bookDetail",
                    }
                ]
            },
            {
                path: "carts",
                component: Cart,
                name: "carts",
                meta : {
                    requiresAuth: true,
                    role: "user",
                },
            },
            {
                path: "borrowTrackings",
                meta : {
                    requiresAuth: true,
                    role: "user",
                },
                children: [
                    {
                        path: "",
                        component: BorrowTracking,
                        name: "borrowTrackings",
                    },
                    {
                        path: ":id",
                        component: BorrowDetail,
                        name: "borrowDetail",
                    }
                ]
            },
            {
                path: "user",
                component: User,
                name: "user",
                meta : {
                    requiresAuth: true,
                    role: "user",
                },
            }
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