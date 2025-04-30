export class LateCheckInValidationError extends Error {
  constructor() {
    super("Não é possível validar um check-in após 20 minutos de quando foi gerado.");
  }
}
