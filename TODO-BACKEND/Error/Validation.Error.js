class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.code = 400;
    }
}

export default ValidationError;