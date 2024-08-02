class AuthenticationError extends Error {
  status: number = 401;
  message: string;

  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AuthenticationError.prototype);

    this.message = message;
  }
}

export default AuthenticationError;
