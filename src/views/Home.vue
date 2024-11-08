<template>
    <div class="container">
        <div class="row justify-content-center">
            <greeting :title="title"></greeting>
        </div>
        
        <div class="row justify-content-center text-center intro-section">
    
            <div class="info">
                <h2 class="welcome-text">Trang web quản lý mượn sách của chúng tôi</h2>
                <p>
                    Giúp bạn dễ dàng tìm kiếm, mượn sách từ thư viện một cách nhanh chóng và tiện lợi.
                </p>
                <p>Với trang web này, bạn có thể:</p>
            </div>
            <ul class="features-list">
                <li>
                    <i class="fa fa-book"></i> Duyệt qua danh sách sách phong phú với đầy đủ thông tin chi tiết.
                </li>
                <li>
                    <i class="fa fa-search"></i> Tìm kiếm sách theo tên sách, tác giả, nhà xuất bản.
                </li>
                <li>
                    <i class="fa fa-calendar-check"></i> Đăng ký mượn sách trực tuyến và theo dõi lịch sử mượn.
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Greeting from "@/components/Layouts/Greeting.vue";
export default {
    data() {
        return {
            title: "Chào mừng bạn đến với website mượn sách!",
        };
    },
    components: {
        Greeting,
    },
};
</script>

<style scoped>
.container {
    margin-top: 60px;
    max-width: 900px;
    padding: 20px;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

.intro-section {
    color: #333;
    padding: 20px;
    text-align: center;
}

.welcome-text {
    font-size: 24px;
    color: #4a90e2;
    margin-bottom: 10px;
}

.info p {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
    line-height: 1.6;
}

.features-list {
    list-style: none;
    padding: 0;
}

.features-list li {
    font-size: 16px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #555;
    transition: transform 0.2s ease-in-out;
}

.features-list li:hover {
    transform: scale(1.05);
    color: #007bff;
}

.features-list i {
    font-size: 20px;
    color: #4a90e2;
}
</style>
