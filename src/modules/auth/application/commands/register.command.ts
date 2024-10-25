import { UserRole } from '../../domain/models/user.model';

export class RegisterCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole,
  ) {}
}
