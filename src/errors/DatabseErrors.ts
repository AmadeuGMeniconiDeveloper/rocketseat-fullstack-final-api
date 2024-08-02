class DatabaseError extends Error {
  status: number = 500;
  message: string;

  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, DatabaseError.prototype);

    this.message = message;
  }
}

export default DatabaseError;
