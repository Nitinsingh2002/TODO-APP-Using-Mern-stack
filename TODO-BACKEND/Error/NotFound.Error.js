class NotFoundError extends Error {
    constructor(message, code) {
        super(message)
        this.code = code;
    }
}

export default NotFoundError;