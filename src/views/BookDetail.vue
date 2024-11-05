<template>
    <div class="container">
        <div class="row my-3 justify-content-center">
            <greeting :title="title"></greeting>
        </div>

        <div class="row my-3 justify-content-center">
            <book-detail :book="book"></book-detail>
        </div>

            <div class="row my-3 d-flex align-items-center">
                <div class="col-6 d-flex justify-content-end">
                    <input-quantity @changeQuantity="handleQuantityChange"></input-quantity>
                    
                </div>
                <div class="col-6 d-flex justify-content-start">
                    <btn :nameBtn="'Thêm vào giỏ'" @submit="addCart"></btn>
                </div>
            </div>
        
    </div>
</template>

<script>
import Greeting from '@/components/Layouts/Greeting.vue';
import BookDetail from '@/components/Book/BookDetail.vue';
import Btn from "@/components/Layouts/Btn.vue";
import InputQuantity from '@/components/Layouts/InputQuantity.vue';
import { mapStores } from 'pinia';
import authStore from '@/stores/auth.store';
import cartService from '@/services/cart.service';
import bookService from '@/services/book.service';

export default {
    computed: {
        ...mapStores(authStore),
    },
    components: {
        Greeting,
        BookDetail,
        Btn,
        InputQuantity,
    },
    beforeMount: async function() {
        const res = await bookService.getBookById(this.$route.params.id);
        if (res.status == "success")
            this.book = res.data;
        else {
            alert(res.message)
        }
    },
    data() {
        return {
            title: 'Chi tiết sách',
            book: {},
            quantity: 1
        }
    },
    methods: {
        async addCart() {
            if (this.authStore.getRole == "guest") {
                alert("Vui lòng đăng nhập để thêm sách vào giỏ hàng")
                return
            }
            
            const response = await cartService.addToCart(this.authStore.getUser._id, this.book._id, this.quantity);
            alert(response.message)
        },
        handleQuantityChange(value) {
            this.quantity = value
        },
    },
};
</script>

<style scoped>
</style>