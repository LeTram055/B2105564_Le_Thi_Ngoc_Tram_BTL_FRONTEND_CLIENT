import createApiClient from "./api.service.js"

class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl)
    }

    async getUserById(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getUsers() {
        try {
            const data = (await this.api.get("/")).data
            return {
                status: "success",
                message: data.message || "Người dùng đã được tìm thấy",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async createUser(publisher) {
        try {
            const data = (await this.api.post("/", publisher)).data
            return {
                status: "success",
                message: data.message || "Người dùng đã được tạo thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async updateUser(id, publisher) {
        try {
            const data = (await this.api.put(`/${id}`, publisher)).data
            return {
                status: "success",
                message: data.message || "Người dùng đã được cập nhật thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async deleteUser(id) {
        try {
            const data = (await this.api.delete(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Người dùng đã được xóa thành công",
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new UserService()
