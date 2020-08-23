class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statuCode = 400) {
    this.message = message;
    this.statusCode = statuCode;
  }
}

export default AppError;
