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
                message: data.message || "BorrowTracking created successfully",
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
                message: data.message || "BorrowTracking retrieved successfully",
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
                message: data.message || "BorrowTracking updated successfully",
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
                message: data.message || "BorrowTrackings retrieved successfully",
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

export default new BorrowTrackingService()