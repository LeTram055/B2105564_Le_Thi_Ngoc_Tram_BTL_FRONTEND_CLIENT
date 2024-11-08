<template>
        
    <div class="card">
        <div class="card-body px-4">
            <h5 class="card-title">{{ user.lastName }} {{ user.firstName }}</h5>
            <p class="card-text"><strong>Email:</strong> {{ user.email }}</p>
            <p class="card-text"><strong>Phone:</strong> {{ user.phone }}</p>
            <p class="card-text"><strong>Address:</strong> {{ user.address }}</p>
            <p class="card-text"><strong>Date of Birth:</strong> {{ formatDate(user.dateOfBirth) }}</p>
            <p class="card-text"><strong>Gender:</strong> {{ user.gender }}</p>
        </div>
    </div>
        
</template>

<script>

export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        }
    }
};
</script>

<style scoped>
.card {
    margin-top: 20px;
    min-width: 500px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Đổ bóng để tạo hiệu ứng nổi */
    transition: transform 0.3s, box-shadow 0.3s;
    background-color: #fff;
    overflow: hidden;
}

/* Hiệu ứng khi di chuột vào card */
.card:hover {
    
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3); 
}

.card-body {
    padding: 20px;
}

.card-title {
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    color: #4a90e2;
    margin-bottom: 15px;
}

.card-text {
    font-size: 16px;
    color: #555;
    margin: 8px 0;
}

/* Đổi màu chữ cho tiêu đề và nhãn mạnh mẽ hơn */
.card-text strong {
    color: #333;
}

</style>
