import createApiClient from "./api.service.js"

class CartService {
    constructor(baseUrl = "/api/carts") {
        this.api = createApiClient(baseUrl)
    }

    async getCarts(userId) {
        try {
            const data = (await this.api.get(`/${userId}`)).data
            return {
                status: "success",
                message: data.message || "Giỏ hàng đã được tìm thấy",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getCart({ userId, bookId, cartId }) {
        try {
            if (cartId) {
                const data = (await this.api.get(`/cart/${cartId}`)).data
                return {
                    status: "success",
                    message: data.message || "Giỏ hàng đã được tìm thấy",
                    data: data.data,
                }
            } else {
                const data = (await this.api.get(`/${userId}/${bookId}`)).data
                return {
                    status: "success",
                    message: data.message || "Giỏ hàng đã được tìm thấy",
                    data: data.data,
                }
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async updateCart(userId, bookId, quantity) {
        try {
            const data = (await this.api.post(`/${userId}/${bookId}`, { quantity })).data
            return {
                status: "success",
                message: data.message || "Giỏ hàng đã được cập nhật thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async addToCart(userId, bookId, quantity) {
        try {
            const data = (await this.api.post(`/add-cart/${userId}/${bookId}`, { quantity })).data
            return {
                status: "success",
                message: data.message || "Sách đã được thêm vào giỏ hàng thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async deleteCart(userId, bookId) {
        try {
            const data = (await this.api.delete(`/${userId}/${bookId}`)).data
            return {
                status: "success",
                message: data.message || "Sách đã được xóa khỏi giỏ hàng thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
    
}



export default new CartService()
