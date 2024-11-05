<template>
    <div class="container">
        <div class="row my-3 justify-content-center">
            <greeting :title="title"></greeting>
        </div>
        <div class="row my-3 justify-content-center">
            <input-search @search="handleSearch" class="input-search" :searchBy="searchBy"></input-search>
        </div>
        <div class="row my-2">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" 
                v-for="book in filterBooks" 
                :key="book._id">
                <book-item :book="book" 
                        @showDetail="handleShowDetail" 
                        @addCart="addCart">
                </book-item>
            </div>
        </div>
    </div>
</template>

<script>
import Greeting from '@/components/Layouts/Greeting.vue';
import bookService from '@/services/book.service';
import cartService from '@/services/cart.service';
import InputSearch from '@/components/Layouts/InputSearch.vue';
import BookItem from '@/components/Book/BookItem.vue';
import { mapStores } from 'pinia';
import authStore from '@/stores/auth.store';

export default {
    computed: {
        ...mapStores(authStore),
    },
    emits: ['login'],
    data() {
        return {
            title: 'Sản phẩm',
            books: [],
            filterBooks: [],
            searchTerm: "",
            searchBy: "Tìm kiếm theo sản phẩm, tác giả, nhà xuất bản"
        };
    },
    components: {
        Greeting,
        InputSearch,
        BookItem,
    },
    mounted() {
        this.getBooks();
    },
    methods: {
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm
            this.filter()
        },
        filter() {
            if (!this.searchTerm || this.searchTerm == "")
                this.filterBooks = this.books;
            else
                this.filterBooks = this.books.filter(book => {
                    return book.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        book.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        book.publisherId.name.toLowerCase().includes(this.searchTerm.toLowerCase())
                });
        },
        async getBooks() {
            const res = await bookService.getBooks();
            if (res.status == "error") {
                alert(res.message);
                return
            }
            this.books = res.data;
            this.filterBooks = this.books;
        },
        
        handleShowDetail(book) {
            this.$router.push({
                name: 'bookDetail',
                params: {
                    id: book._id
                },
            });
        },
        async addCart(book) {
            if (this.authStore.getRole == "guest") {
                alert("Vui lòng đăng nhập để thêm sách vào giỏ hàng")
                return
            }
            const response = await cartService.addToCart(this.authStore.getUser._id, book._id, 1);
            alert(response.message)
        }
    },
}
</script>

<style scoped>

.input-search {
    margin-bottom: 12px;
}


.btn-add-book {
    margin: 0 auto;
}
</style>