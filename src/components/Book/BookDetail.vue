<template>
    <div class="row book-detail">
        <div class="col-12 col-md-3">
            <img :src="`${BASE_URL}${book.image}`" alt="book.name" class="book-image" />
        </div>
        <div class="col-12 col-md-9">
            <h4 class="book-name text-justify">{{ book?.name }}</h4>
            <p>Giá: <span class="font-weight-bold">{{ book?.price }}đ</span>
            </p>
            <p class="text-justify">Số lượng: {{ book?.quantity }}</p>
            <p>Tác giả: {{ book?.author }}</p>
            <p class="text-justify">Nhà xuất bản: {{ book?.publisherId?.name }}</p>
            <p>Năm xuất bản: {{ book?.publishYear }}</p>
            <p class="text-justify">Mô tả: {{ book?.description }}</p>
            
        </div>
        
    </div>
</template>

<script>
export default {
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
    methods: {
    }
};
</script>

<style scoped>
.book-detail {
    padding: 20px;
    border: none;
    border-radius: 5px;
    transition: box-shadow 0.3s ease;
    box-shadow: 0px 2px 10px rgb(226, 224, 224);
}

.book-image {
    width: 200px;
    min-height: 200px;
    object-fit: cover;
    padding-bottom: 10px;
}

.book-name {
    font-size: 20px;
}


</style>