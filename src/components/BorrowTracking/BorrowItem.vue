<template>
    <tr>
        <td class="text-center"> {{ formatDateTime(borrow.requestDate) }} </td>
        <td class="text-right"> {{ formatCurrency(borrow.price) }} đồng </td>
        <td class="text-center"> {{ formatDateTime(borrow.borrowDate) }} </td>
        <td class="text-center"> {{ formatDateTime(borrow.expectedReturnDate) }} </td>
        <td class="text-center"> {{ formatDateTime(borrow.actualReturnDate) }} </td>
        <td class="text-center"> {{ borrow.status }} </td>
        <td class="func">
            <div class="btn-container">
                <btn nameBtn="Xem" styleBtn="btn-primary" @click="handleShowDetail" class="btn-item"></btn>
                <btn v-if="borrow.status=='Đang xử lý'" nameBtn="Hủy đơn" styleBtn="btn-danger" @click="handleCancel" class="btn-item"></btn>
            </div>
            </td>
    </tr>
</template>

<script>
import Btn from "@/components/Layouts/Btn.vue"


export default {
    props: {
        borrow: {
            type: Object,
            required: true
        }
    },
    emits: ['showDetail', 'cancel'],
    components: {
        Btn,
       
    },
    data() {
        return {
            
            status: ''
        }
    },
    
    methods: {
        formatCurrency(amount) {
            return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        formatDateTime(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
    
        handleShowDetail() {
            this.$emit('showDetail', this.borrow)
        },
        handleCancel() {
            this.$emit('cancel', this.borrow)
        }
    }
};
</script>

<style scoped>
td .btn-container {
    display: flex;
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    gap: 4px;
}

.btn-item {
    min-width: 100px;

    margin-top: 4px;
    display: block;
}
</style>