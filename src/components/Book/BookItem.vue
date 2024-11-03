<template>
    <div class="book-card">
        <img :src="`${BASE_URL}${book.image}`" alt="Book Image" class="book-image" @click.stop="showDetail">
        <div class="book-info" @click="showDetail">
            <p class="book-name lable">{{ shortText(book?.name, 24) }}</p>
            <p class="book-price text-size-12">Giá: {{ formatPrice(book?.price) }} đồng</p>
            <p class="book-quantity text-size-12">Số lượng còn lại: {{ book?.quantity }}</p>
        </div>

        <btn :nameBtn="'Thêm giỏ hàng'" @submit="addCart" :styleBtn="'btn-success btn-add'"></btn>
    </div>
</template>

<script>
import Btn from "@/components/Layouts/Btn.vue";

export default {
    emits: ['showDetail', 'addCart'],
    props: {
        book: {
            type: Object,
            required: true
        }
    },
    data() {
        console.log(import.meta.env.VITE_APP_BASE_URL);
        return {
            
            BASE_URL: import.meta.env.VITE_APP_BASE_URL // Truy cập biến môi trường
        }
    },
    components: {
        Btn
    },
    methods: {
        formatPrice(price) {
        if (!price) return "0";
        return price.toLocaleString('vi-VN');
        },
        shortText(text, maxLength) {
            if (!text)
                return ""
            if (!maxLength)
                maxLength = 1000
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        },
        showDetail() {
            this.$emit('showDetail', this.book);
        },
        addCart() {
            this.$emit('addCart', this.book);
        }
    },
};
</script>

<style scoped>
p {
    padding: 0;
    margin: 0;
}

.lable {
    font-size: 16px;
    font-weight: 500;
    color: blue;
}

.book-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    /* border: 1px solid blue; */
    border-radius: 5px;
    padding-top: 5px;
    padding-bottom: 10px;
    box-shadow: 3px 3px 10px #e0e0e0;
    background: white;
    transition: box-shadow 0.3s ease;
    box-shadow: 0px 2px 10px rgb(226, 224, 224);
}

.book-card:hover {
    box-shadow: 0px 2px 10px rgba(0, 0, 255, 0.373);
}

.book-image {
    width: 100%;
    height: auto;
    max-width: 150px;
    object-fit: cover; 
    border-radius: 5px;
}

.book-info {
    text-align: center;
    margin-top: 10px;
    flex-grow: 1;
}

.btn-add {
    margin-top: 10px;
    height: 36px;
    font-size: 14px;
    background-color: blue;
    border: none;
    color: white;
}


.btn-add:hover {
    background-color: darkblue;
}
</style>