import createApiClient from "./api.service.js"

class BorrowTrackingService {
    constructor(baseUrl = "/api/borrowTrackings") {
        this.api = createApiClient(baseUrl)
    }

    async createBorrowTracking(cartIds, totalPrice) {
    
        try {
            const data = (await this.api.post("/", {
                cartIds,
                totalPrice
            
            })).data
            return {
                status: "success",
                message: data.message || "Yêu cầu mượn sách đã được tạo thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getBorrowTracking(borrowId) {
        try {
            
            const data = (await this.api.get(`/${borrowId}`)).data
            
            return {
                status: "success",
                message: data.message || "Theo dõi mượn sách đã được tìm thấy",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async updateBorrowTracking({borrowId, status}) {
        try {    
            const data = (await this.api.put(`/user/${borrowId}`, {status})).data
            return {
                status: "success",
                message: data.message || "Yêu cầu mượn sách đã được cập nhật thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getBorrowTrackingByUserId(userId) {
        try {
            const data = (await this.api.get(`/user/${userId}`)).data
            return {
                status: "success",
                message: data.message || "Theo dõi mượn sách đã được tìm thấy",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message || "Lỗi ",
            }
        }
    }
}

export default new BorrowTrackingService()