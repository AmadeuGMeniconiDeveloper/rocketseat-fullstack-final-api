class BadRequestError extends Error {
  status: number = 400;
  message: string;

  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BadRequestError.prototype);

    this.message = message;
  }
}

export default BadRequestError;
