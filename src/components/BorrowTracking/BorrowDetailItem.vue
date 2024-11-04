<template>
    <tr>
        <td>
            <div class="item">
                <img :src="`${BASE_URL}${borrowDetail.bookId.image}`" alt="Sản phẩm" width="70" height="100" class="item-img">
                <p class="item-name text-justify align-content-center">
                    {{ borrowDetail.bookId.name }}
                    
                </p>
            </div>
        </td>
        <td class="text-right">
            {{ formatCurrency(borrowDetail.bookId.price) }} đồng
        </td>
        <td>
            {{ borrowDetail.quantity }}
        </td>

        <td class="text-right">
            {{ formatCurrency(borrowDetail.price) }} đồng
        </td>
        <td>
            <div class="btn-container">
                <btn nameBtn="Xem" styleBtn="btn-primary" @click="handleShowDetail" class="btn-item"></btn>
            </div>
        </td>
    </tr>
</template>

<script>
import Btn from "@/components/Layouts/Btn.vue"
import CountBtn from '../Layouts/QuantityBtn.vue';

export default {
    props: {
        borrowDetail: {
            type: Object,
            required: true
        }
    },
    components: {
        Btn,
        CountBtn,
        
    },
    data() {
        console.log(import.meta.env.VITE_APP_BASE_URL);
        return {
            
            BASE_URL: import.meta.env.VITE_APP_BASE_URL // Truy cập biến môi trường
        }
    },
    emits: ['showDetail'],
    methods: {
        formatCurrency(amount) {
            return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        
        handleShowDetail() {
            this.$emit('showDetail', this.borrowDetail.bookId);
        },

    }
};
</script>

<style scoped>
.item {
    display: flex;
}

.item .item-name {
    margin-left: 10px;
    padding: 0;
    font-size: 16px;
}

.item .item-img {
    object-fit: cover;
    object-position: center;
    margin: 0;
    padding: 0;
}

td {
    vertical-align: middle; /* Căn giữa nội dung ô theo chiều dọc */
}

td .btn-container {
    display: flex;
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    gap: 4px;
}

.btn-item {
    width: 60px;
    margin-top: 4px;
    display: block;
}
</style>