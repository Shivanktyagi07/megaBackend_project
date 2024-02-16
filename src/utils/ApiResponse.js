class ApiResponse {
    constructor(ststusCode, data, message = "Success"){
        this.statusCode = ststusCode
        this.data = data
        this.message = message
        this.success = this.statusCode < 400
    }
}