interface AutheticationDTO {
  id: string;
  role_id: { role: number };
}

export class AuthenticationDTO {
  readonly id: string;
  readonly role: number;
  constructor({ id, role_id: { role } }: AutheticationDTO) {
    this.id = id;
    this.role = role;
  }
}
