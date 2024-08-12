export class CustomError extends Error {
  constructor(nameError: string, messageError: string) {
    super(messageError);
    this.name = nameError;
  }
}
