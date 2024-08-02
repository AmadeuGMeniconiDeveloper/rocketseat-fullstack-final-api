class DataTransferError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, DataTransferError.prototype);

    this.status = status;
    this.message = message;
  }
}

export default DataTransferError;
