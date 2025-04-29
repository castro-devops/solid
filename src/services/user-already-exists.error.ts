export class UserAlreadyExistsError extends Error {
  constructor() {
    super("Já existe um usuário com o e-mail fornecido.");
  }
}
