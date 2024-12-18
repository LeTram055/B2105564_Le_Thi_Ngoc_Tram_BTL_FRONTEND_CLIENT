<template>
    <div class="container">
        <div class="row my-3 justify-content-center">
            <greeting :title="title"></greeting>
        </div>

        <div class="row my-3 justify-content-center">
            <input-search @search="handleSearch" class="input-search" :searchBy="searchBy"></input-search>
        </div>

        <div class="row ">
            <table class="table table-bordered table-responsive-lg">
                <thead class="thead-light">
                    <tr>
                        <th scope="col" class="text-center align-middle">Ngày yêu cầu</th>
                        <th scope="col" class="text-center align-middle">Tổng thanh toán</th>
                        <th scope="col" class="text-center align-middle">Ngày mượn</th>
                        <th scope="col" class="text-center align-middle">Ngày trả dự kiến</th>
                        <th scope="col" class="text-center align-middle">Ngày trả thực tế</th>
                        <th scope="col" class="text-center align-middle">Trạng thái</th>
                        <th scope="col" class="text-center align-middle">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    <borrow-item v-for="borrow in filterBorrows" :key="borrow.__uniqueKey" :borrow="borrow" @showDetail="handleShowDetail"
                        @cancel="handleCancel">
                    </borrow-item>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Greeting from '@/components/Layouts/Greeting.vue';
import BorrowItem from "@/components/BorrowTracking/BorrowItem.vue";
import borrowService from '@/services/borrowTracking.service';
import useAuthStore from '@/stores/auth.store';
import { mapStores } from 'pinia';
import InputSearch from '@/components/Layouts/InputSearch.vue';

export default {
    computed: {
        ...mapStores(useAuthStore),
    },
    data() {
        return {
            borrows: [],
            filterBorrows: [],
            title: 'Đơn mượn sách',
            searchBy: "Tìm kiếm theo trạng thái đơn hàng, ngày mượn, ngày trả",
            searchTerm: "",
        };
    },
    components: {
        Greeting,
        BorrowItem,
        InputSearch,
    },
    beforeMount: async function() {
        await this.getBorrows();
    },
    methods: {
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm
            this.filter()
        },
        filter() {
            
            if (!this.searchTerm || this.searchTerm.trim === "")
                this.filterBorrows = this.borrows;
            else
                this.filterBorrows = this.borrows.filter(borrow => {
                    return borrow.status.toLowerCase().includes(this.searchTerm.toLowerCase())
                        || borrow.requestDate && borrow.requestDate.toLowerCase().includes(this.searchTerm.toLowerCase())
                        || borrow.borrowDate && borrow.borrowDate.toLowerCase().includes(this.searchTerm.toLowerCase())
                        || borrow.expextedReturnDate && borrow.expextedReturnDate.toLowerCase().includes(this.searchTerm.toLowerCase())
                        || borrow.actualReturnDate && borrow.actualReturnDate.toLowerCase().includes(this.searchTerm.toLowerCase())
            })
        },
        async getBorrows() {
            const userId = this.authStore.getUser._id;
            
            const res = await borrowService.getBorrowTrackingByUserId(userId);
            if (res.status == "success") {
                this.borrows = res.data;
                
                // sort borrows by the latest borrowStatuses
                this.borrows.sort((a, b) => {
                    const dateA = a.requestDate;
                    const dataB = b.requestDate;
                    // sort by descending borrow
                    return new Date(dataB) - new Date(dateA);
                });
                
                this.filterBorrows = this.borrows
            } else {
                alert(res.message);
            }
        },
        handleShowDetail(borrow) {
            this.$router.push({
                name: "borrowDetail",
                params: {
                    id: borrow._id,
                },
            });
        },
        async handleCancel(borrow) {
            if (window.confirm("Bạn có chắc chắn yêu cầu hủy mượn sách này")) {
                const res = await borrowService.updateBorrowTracking({
                    borrowId: borrow._id,
                    status: "Đã hủy",
                })
                if (res.status == "error")
                    alert(res.message)
                else {
                    await this.getBorrows()
                    this.filter()
                }
            }
        }
    },
}
</script>

<style scoped>
.input-search {
    margin-bottom: 12px;
}
</style>