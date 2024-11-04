<template>
    <div class="container">
        <div class="row my-3 justify-content-center">
            <greeting :title="title"></greeting>
        </div>
        <div class="row my-3 justify-content-center">
            
            <input-search @search="handleSearch" class="input-search" :searchBy="searchBy"></input-search>
        </div>

        <div class="row my-3 justify-content-center">
            <p style="color: red;">***Lưu ý: Hạn mượn sách là 30 ngày áp dụng cho tất cả sách***</p>
        </div>
        <div class="row">
            <table class="table table-bordered">
                <thead class="thead-light">
                    <tr>
                        <th scope="col" class="text-center align-middle">Sách</th>
                        <th scope="col" class="text-center align-middle">Giá</th>
                        <th scope="col" class="text-center align-middle">Số lượng</th>
                        <th scope="col" class="text-center align-middle">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    <cart-item v-for="cart in filterCarts" 
                        :key="cart._id" :cart="cart" 
                        @delete="handleDelete"
                        @showDetail="handleShowDetail"
                        @incrementQuantity="incrementQuantity"
                        @decrementQuantity="decrementQuantity"
                        
                        >
                    </cart-item>
                </tbody>
                <tfoot class="bg-tfoot">
                    <tr>
                        <td class="font-weight-bold text-center align-middle">Tổng:</td>
                        <td class="font-weight-bold text-right align-middle">{{ formatCurrency(calculateTotalPrice(totalPrice)) }} đồng</td>
                        <td class="font-weight-bold text-center align-middle">{{ calculateTotalQuantity() }}</td>
                        <td class="">
                            <btn class="btn-borrow-book" nameBtn="Mượn" @submit="borrowBook"></btn>
                        </td>

                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="row my-3 justify-content-center">
            
        </div>
    </div>
</template>

<script>
import Greeting from '@/components/Layouts/Greeting.vue';
import Btn from '@/components/Layouts/Btn.vue';
import InputSearch from '@/components/Layouts/InputSearch.vue';
import cartService from '@/services/cart.service';
import { mapStores } from 'pinia';
import authStore from '@/stores/auth.store';
import bookService from '@/services/book.service';
import CartItem from '@/components/Cart/CartItem.vue';
import borrowTrackingService from '@/services/borrowTracking.service';

export default {
    computed: {
        ...mapStores(authStore),
        
    },
    data() {
        return {
            title: 'Giỏ hàng',
            carts: [],
            filterCarts: [],
            searchTerm: "",
            searchBy: "Tìm kiếm theo sách",

        };
    },
    
    components: {
        Greeting,
        Btn,
        InputSearch,
        CartItem,
        
    },
    beforeMount: async function() {
        await this.getCarts()
    },
    
    methods: {
        formatCurrency(amount) {
            return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        calculateTotalPrice() {
            return this.filterCarts.reduce((total, cart) => {
                return total + (cart.bookId.price * cart.quantity);
            }, 0);
        },
        calculateTotalQuantity() {
            return this.filterCarts.reduce((total, cart) => total + cart.quantity, 0);
        },
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm
            this.filter()
        },
        filter() {
            if (!this.searchTerm || this.searchTerm == "")
                this.filterCarts = this.carts;
            else
                this.filterCarts = this.carts.filter(cart => {
                    return cart.bookId.name.toLowerCase().includes(this.searchTerm.toLowerCase())
                });
        },
        async getCarts() {
            if (!this.authStore.getUser) {
                console.warn("User is not authenticated.");
                return;
            }

            const res = await cartService.getCarts(this.authStore.getUser._id);
            if (res.status == "error") {
                alert(res.message);
                return
            }
            this.carts = res.data;
            this.filterCarts = this.carts;
        },
        
        async handleDelete(cart) {
            if (window.confirm("Bạn có chắc chắn muốn xóa sách này khỏi giỏ hàng?")) {
                const res = await cartService.deleteCart(cart.userId._id, cart.bookId._id)
                if (res.status == "error")
                    alert(res.message)
                
                await this.getCarts()
                this.filter()
            }
        },
        async handleShowDetail(cart) {
            const res = await bookService.getBookById(cart.bookId._id)
            if (res.status == "error") {
                alert(res.message)
                return
            }

            const book = res.data
            this.$router.push({
                name: 'bookDetail',
                params: {
                    id: book._id
                },
            });
        },
        async incrementQuantity({cart, count}) {
            const res = await cartService.updateCart(cart.userId._id, cart.bookId._id, count)
            if (res.status == "error") {
                alert(res.message)
                return
            }
            await this.getCarts()
            this.filter()
        },
        async decrementQuantity({cart, count}) {
            const res = await cartService.updateCart(cart.userId._id, cart.bookId._id, count)
            if (res.status == "error") {
                alert(res.message)
                return
            }
            await this.getCarts()
            this.filter()
        },
        
        async borrowBook() {
            
            const totalPrice = this.calculateTotalPrice();
            const cartIds = this.filterCarts.map(cart => cart._id);

            const resCreateBorrowTracking = await borrowTrackingService.createBorrowTracking(cartIds, totalPrice);
            
            if (resCreateBorrowTracking.status == "success") {
                await this.clearCart();
                alert("Yêu cầu mượn sách thành công");
                this.$router.push({ name: "users" });
            } else {
                alert("Yêu cầu mượn sách thất bại");
            }
        },

        async clearCart() {
        if (!this.authStore.getUser) {
            console.warn("User is not authenticated.");
            return;
        }

        // Gọi dịch vụ để xóa từng mục trong giỏ
        for (const item of this.filterCarts) {
            await cartService.deleteCart(this.authStore.getUser._id, item.bookId._id);
        }

        // Cập nhật lại giỏ hàng sau khi xóa
        await this.getCarts();
    }

    },
}
</script>

<style scoped>
.input-search {
    margin-bottom: 12px;
}
.bg-tfoot{
    background-color: #e9ecef;
}

.btn-borrow-book {
    margin: 0px auto;
    display: block;
}
</style>