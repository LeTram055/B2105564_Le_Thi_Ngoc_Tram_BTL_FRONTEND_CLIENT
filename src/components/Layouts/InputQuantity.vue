<template>
        <div class="input-group quantity-input">
            <div class="input-group-prepend">
                <span class="input-group-text">Số lượng</span>
            </div>
            <input type="number" class="form-control" value="1" min="1" id="inputQuantity" v-model="quantity">
        </div>
</template>

<script>
export default {
    data() {
        return {
            quantity: 1
        }
    },
    emits: ['changeQuantity'],
    watch: {
        quantity: function (value) {
            this.$emit('changeQuantity', value)
        }
    },
}
</script>

<style scoped>
    .quantity-input {
        max-width: 150px; 
    }
</style>
