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
}
.card-title {
    font-size: 24px;
    font-weight: 500;
    text-align: center;
}

</style>
