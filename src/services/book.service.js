import createApiClient from "./api.service.js"

class BookService {
    constructor(baseUrl = "/api/books") {
        this.api = createApiClient(baseUrl)
    }

    async getBooks() {
        try {
            const data = (await this.api.get("/")).data
            return {
                status: "success",
                message: data.message || "Books retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getBookById(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Book retrieved successfully",
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

export default new BookService()
